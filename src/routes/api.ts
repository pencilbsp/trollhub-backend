import slug from "slug";
import Elysia, { t } from "elysia";
import { readdir } from "fs/promises";
import { ContentType } from "@prisma/client";
import { differenceInMinutes } from "date-fns";
import { join, basename, extname } from "path";

import uploadRoutes from "./upload";

import prisma from "@/utils/prisma";
import { hexToString } from "@/utils/base64";
import getCountryCode from "@/utils/country-code";
import upsertContents from "@/utils/upsert-contents";
import { getChannelContents } from "@/utils/fuhu/crawl";
import decryptImages from "@/utils/fuhu/decrypt-images";
import decryptHls, { hlsLogger } from "@/utils/fuhu/decrypt-hls";
import {
  STATIC_DIR,
  STATIC_HOST,
  FUHURIP_SERVER,
  B2_BUCKET_NAME,
} from "@/configs";
import {
  extractFuhuContent,
  extractFuhuCreator,
} from "@/utils/fuhu/dom-extract";

const SUPPORTED_FUHU_TYPES = ["comic", "novel", "movie", "channel"];
const VALID_FUHU_URL =
  /^\/(?<type>(?:movie|comic|novel|channel))\/(?:.*?_|)(?<fid>\w+)(?:\.html|)$/;

const apiRoutes = new Elysia({ prefix: "/api" });

const isAvailable = (content: string) =>
  content.includes("/sile/") ||
  content.includes("redirector") ||
  content.includes("tsredirector") ||
  content.includes("storage.googleapis.com");

// /seekable
apiRoutes.get(
  "/seekable",
  async ({ query }) => {
    try {
      const videoDir = join(STATIC_DIR, "m3u8", query.fid);
      const m3u8Path = join(videoDir, "index.m3u8");

      const f = Bun.file(m3u8Path);
      const m3u8Content = await f.text();
      const segments = m3u8Content.match(/#EXTINF:\d+(?:.\d+|),\n.*?$/gm);
      if (!segments) throw new Error("Không thể phân tích tệp tin m3u8");

      let to = 0;
      let index = 0;
      while (true) {
        const segment = segments[index];
        if (!segment) break;

        const time = segment.match(/#EXTINF:(\d+(?:.\d+|)),\n/)![1];
        to += parseFloat(time);
        index++;

        if (isAvailable(segment)) {
          break;
        }
      }

      return { to: Math.floor(to) - 10 };
    } catch (error: any) {
      return {
        to: 0,
        error: {
          message: error.message,
        },
      };
    }
  },
  {
    query: t.Object({
      fid: t.String(),
    }),
  }
);

// /request-content
apiRoutes.post(
  "/request-content",
  async ({ body, set }) => {
    try {
      const fuhuUrl = new URL(body.url);
      const { type, fid } = VALID_FUHU_URL.exec(fuhuUrl.pathname)?.groups || {};
      if (!type || !fid) throw new Error("Url không không hợp lệ");

      if (!SUPPORTED_FUHU_TYPES.includes(type))
        throw new Error("Nội dung không được hỗ trợ");

      if (type === "channel") {
        const userName = "@" + fid;
        let channel = await prisma.creator.findUnique({ where: { userName } });
        const channelMetatdata = await extractFuhuCreator(body.url);

        if (!channel) {
          channel = await prisma.creator.create({
            data: {
              bio: channelMetatdata.bio,
              fid: channelMetatdata.fid,
              name: channelMetatdata.name,
              email: channelMetatdata.email,
              cover: channelMetatdata.cover,
              avatar: channelMetatdata.avatar,
              userName: channelMetatdata.userName,
            },
          });
        } else {
          await prisma.creator.update({
            where: {
              userName,
            },
            data: {
              bio: channelMetatdata.bio,
              name: channelMetatdata.name,
              cover: channelMetatdata.cover,
              avatar: channelMetatdata.avatar,
            },
          });
        }

        const channelContents = await getChannelContents(body.url, channel);

        await upsertContents(channelContents);
        return {
          message: `${channelContents.length} nội dung đã được cập nhật`,
        };
      } else {
        const type = body.url.split("/")[3];
        if (Object.values(ContentType).includes(type as any)) {
          let newContent = await prisma.content.findFirst({ where: { fid } });

          if (
            newContent &&
            newContent.updatedAt &&
            differenceInMinutes(newContent!.updatedAt, new Date()) >= -10
          ) {
            return {
              message:
                "Nội dung đã được cập nhật gần đây, vui lòng thử lại sau!",
            };
          }

          const content = await extractFuhuContent(
            body.url,
            type as ContentType
          );

          const keywords = slug(content.title!, { replacement: " " });

          if (!newContent) {
            console.log(`[${fid}] Đang tạo mội dung mới...`);

            const creator = await extractFuhuCreator(content.creator.url!);
            const country = getCountryCode(content.country);

            newContent = await prisma.content.create({
              data: {
                fid: content.mid,
                type: content.type,
                keywords: keywords,
                title: content.title!,
                status: content.status,
                author: content.author,
                thumbUrl: content.poster,
                createdAt: content.releaseDate,
                description: content.description,
                totalChap: content.totalChap || 0,
                akaTitle: content.akaTitle ? [content.akaTitle] : undefined,
                categories: {
                  connectOrCreate: content.categories.map((category) => {
                    const create = category;
                    const where = { slug: category.slug };
                    return { create, where };
                  }),
                },
                creator: {
                  connectOrCreate: {
                    where: { userName: creator.userName },
                    create: {
                      bio: creator.bio,
                      fid: creator.fid,
                      name: creator.name,
                      cover: creator.cover,
                      email: creator.email,
                      avatar: creator.avatar,
                      userName: creator.userName,
                    },
                  },
                },
                countries: country
                  ? {
                      connectOrCreate: {
                        where: { code: country[3] },
                        create: {
                          name: country[1],
                          code: country[3],
                        },
                      },
                    }
                  : undefined,
              },
            });
          } else {
            console.log(`[${fid}] Đang cập nhật nội dung...`);
            await prisma.content.update({
              where: {
                id: newContent.id,
              },
              data: {
                type: content.type,
                keywords: keywords,
                title: content.title!,
                status: content.status,
                author: content.author,
                thumbUrl: content.poster,
                createdAt: content.releaseDate,
                description: content.description,
                totalChap: content.totalChap || 0,
                akaTitle: content.akaTitle ? [content.akaTitle] : undefined,
                categories: {
                  connectOrCreate: content.categories.map((category) => {
                    const create = category;
                    const where = { slug: category.slug };
                    return { create, where };
                  }),
                },
              },
            });
          }

          if (Array.isArray(content.chapters) && content.chapters.length > 0) {
            console.log(`[${fid}] Đang cập nhật chapter cho nội dung...`);

            for (const chapter of content.chapters) {
              await prisma.chapter.upsert({
                where: {
                  fid: chapter.fid,
                },
                create: {
                  ...chapter,
                  contentId: newContent.id,
                  creatorId: newContent!.creatorId,
                },
                update: {
                  title: chapter.title,
                  mobileOnly: chapter.mobileOnly,
                },
              });
            }
          }
        }
      }

      return { message: "Nội dung đã được cập nhật thành công!" };
    } catch (error: any) {
      set.status = 500;
      return {
        error: {
          message: error.message,
        },
      };
    }
  },
  {
    body: t.Object({
      url: t.String(),
    }),
  }
);

// /ajax-logger
apiRoutes.post(
  "/ajax-logger",
  async ({ body }) => {
    try {
      console.log(
        "=========================AJAX LOGGER========================="
      );
      console.log("Ajax url:", body.url);

      if (body.type === "comic") {
        await decryptImages(body.fid, body.response);
      }

      if (body.type === "movie" && body.url === "/content/parseUrl") {
        await hlsLogger(body.fid, body.response);
      }

      return { success: true };
      // return { success: true, message: "Logged ajax response successfully" }
    } catch (error: any) {
      // console.log(error)
      return { message: error.message };
    }
  },
  {
    body: t.Object({
      url: t.String(),
      fid: t.String(),
      type: t.String(),
      response: t.Any(),
      contentType: t.String(),
      payload: t.Optional(t.Any()),
    }),
  }
);

// /key-logger
apiRoutes.post(
  "/key-logger",
  ({ body }) => {
    console.log(
      "=========================CRYPTOJS KEY LOGGER========================="
    );
    console.log("Crypto ciphertext ->", body.ciphertext);
    console.log("Crypto key:iv ->", `${body.key}:${body.iv}`);
    console.log("\n");

    return { success: true };
  },
  {
    body: t.Object({
      iv: t.String(),
      key: t.String(),
      fid: t.String(),
      type: t.String(),
      ciphertext: t.String(),
    }),
  }
);

// /keys-logger
apiRoutes.post(
  "/keys-logger",
  async ({ body }) => {
    try {
      console.log(
        "=========================CRYPTOJS KEYS LOGGER========================="
      );
      console.log("Crypto keys ->", body.fid, body.keys);

      const keys = Object.keys(body.keys).map((key) => ({
        key: hexToString(key),
        iv: hexToString(body.keys[key]),
      }));

      await decryptHls(body.fid, keys);

      return { success: true, message: "Logged crypto keys successfully" };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },
  {
    body: t.Object({
      fid: t.String(),
      keys: t.Object(t.Any()),
    }),
  }
);

// d1e715a28fc71e5034c24b3869186d05
// /fttps:webp/:fid
apiRoutes.get(
  "/fttps:webp/:fid",
  async ({ params }) => {
    try {
      const fid = params.fid;
      const imageDir = join(STATIC_DIR, "images", fid);
      const files = await readdir(imageDir);

      if (basename(files[0]).length >= 32) throw new Error();

      const images = files
        .filter((file) => file.endsWith(".webp"))
        .sort((a, b) => {
          let [aPrefix, aSuffix] = a.replace(".webp", "").split("_");
          let [bPrefix, bSuffix] = b.replace(".webp", "").split("_");

          // So sánh theo prefix, nếu giống nhau thì so sánh theo suffix
          if (aPrefix !== bPrefix) {
            return parseInt(aPrefix, 10) - parseInt(bPrefix, 10);
          } else {
            return parseInt(aSuffix, 10) - parseInt(bSuffix, 10);
          }
        });
      return { images, error: false };
    } catch (error) {
      return { images: [], error: true };
    }
  },
  {
    params: t.Object({
      fid: t.String(),
      webp: t.Optional(t.String()),
    }),
  }
);

// /get-m3u8-available
apiRoutes.get(
  "/get-m3u8-available",
  async ({ set, query }) => {
    try {
      const videoDir = join(STATIC_DIR, "m3u8", query.fid);
      // const result = await Bun.$`ls ${videoDir} | egrep '\.m3u8$'`.quiet();
      // console.log(query.fid, result);
      // const m3u8s = result.text().trim().split("\n");
      const result = await readdir(videoDir);
      const m3u8s = result.filter((f) => extname(f) === ".m3u8");

      const providers: any[] = [];

      for (const m3u8Path of m3u8s) {
        if (m3u8Path.endsWith("index.m3u8")) {
          const m3u8File = Bun.file(m3u8Path);
          const m3u8Content = await m3u8File.text();

          if (!isAvailable(m3u8Content)) {
            providers.push({
              key: "local",
              label: "Phần Lan",
              type: "application/x-mpegurl",
              src: `${FUHURIP_SERVER}/videos/hls/${query.fid}/index.m3u8`,
            });
          }
        } else {
          providers.push({
            key: "b2",
            label: "Việt Nam",
            type: "application/x-mpegurl",
            src: `${STATIC_HOST}/${B2_BUCKET_NAME}/${query.fid}/${basename(
              m3u8Path
            )}`,
          });
        }
      }

      return { providers, default: "b2" };
    } catch (error) {
      // console.log(error);
      set.status = 404;
      return { error: { message: "Video is not available" } };
    }
  },
  {
    query: t.Object({
      fid: t.String(),
      vid: t.Optional(t.String()),
    }),
  }
);

apiRoutes.use(uploadRoutes);

export default apiRoutes;
