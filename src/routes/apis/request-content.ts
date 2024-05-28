import slug from "slug";
import Elysia, { t } from "elysia";
import { ContentType } from "@prisma/client";
import { differenceInMinutes } from "date-fns";

import getCountryCode from "@/utils/country-code";
import { getChannelContents } from "@/utils/fuhu/crawl";
import {
  extractFuhuContent,
  extractFuhuCreator,
} from "@/utils/fuhu/dom-extract";
import prisma from "@/utils/prisma";
import upsertContents from "@/utils/upsert-contents";

const SUPPORTED_FUHU_TYPES = ["comic", "novel", "movie", "channel"];
const VALID_FUHU_URL =
  /^\/(?<type>(?:movie|comic|novel|channel))\/(?:.*?_|)(?<fid>\w+)(?:\.html|)$/;

// /request-content
export default new Elysia({ prefix: "/request-content" }).post(
  "/",
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
