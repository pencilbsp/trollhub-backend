import { existsSync } from "fs";
import Elysia, { t } from "elysia";
import { join, basename } from "path";
import { Stream } from "@elysiajs/stream";
import { exists, mkdir } from "fs/promises";

import getRedisClient from "../utils/redis";

const MAX_AGE = 7 * 24 * 60 * 60; // 7 days
const VALID_SEGMENT = /#EXTINF:[\d.]+,\n(http.*?)\n/;
const M3U8_DIR = join(process.cwd(), "public", "m3u8");
const base64Encode = (data: string) => Buffer.from(data).toString("base64");
const base64Decode = (data: string) => Buffer.from(data, "base64").toString();

const hlsRoutes = new Elysia({ prefix: "/hls" })
  .post(
    "/manifest/:fileId",
    async ({ params, body, set, headers }) => {
      try {
        let filePath = join(M3U8_DIR, params.fileId);
        if (!filePath.endsWith(".m3u8")) filePath += ".m3u8";

        body = body.trim();
        if (!body.startsWith("#EXTM3U") || !body.endsWith("#EXT-X-ENDLIST"))
          throw new Error("Content type is not supported");

        await Bun.write(filePath, body);

        const redisClient = await getRedisClient();
        await redisClient.del(params.fileId.replace(".m3u8", ""));

        return { message: "Upload successfully" };
      } catch (error) {
        set.status = 500;
        if (error instanceof Error) {
          return { error: { message: error.message } };
        }
      }
    },
    {
      body: t.String(),
    }
  )
  .get("/manifest/:fileId", async ({ params, set }) => {
    try {
      const filePath = join(M3U8_DIR, params.fileId);
      if (!existsSync(filePath)) throw new Error("notFound");

      const f = Bun.file(filePath);
      let m3u8Content = await f.text();

      const segments = m3u8Content
        .match(new RegExp(VALID_SEGMENT, "g"))
        ?.map((segment) => segment.match(VALID_SEGMENT)![1]);

      segments?.forEach((uri) => {
        const slug = base64Encode(uri).replaceAll("/", "-");
        m3u8Content = m3u8Content.replace(uri, `/hls/segment/${slug}`);
      });

      // set.headers["Content-Type"] = "application/x-mpegURL"
      set.headers["Content-Type"] = "application/vnd.apple.mpegurl";
      set.headers["Cache-Control"] = `public, max-age=${MAX_AGE}`;
      return m3u8Content;
    } catch (error: any) {
      console.log(error);
      set.status = 404;
      return error.message;
    }
  })
  .get("/segment/:slug", async ({ params, set }) => {
    try {
      const uri = base64Decode(params.slug.replaceAll("-", "/"));

      try {
        const { pathname } = new URL(uri);
        const fileName = basename(pathname);
        const fid = pathname.split("/")[3].split("-")[1];

        const videoDir = join(M3U8_DIR, fid);
        const filePath = join(videoDir, fileName);

        if (!(await exists(filePath))) {
          const response = await fetch(uri, {
            headers: {
              "Accept-Encoding": "identity",
            },
          });

          if (!response.ok || response.status !== 200) throw new Error();

          if (!(await exists(videoDir))) {
            await mkdir(videoDir, { recursive: true });
          }

          set.headers["X-FRIP"] = "MISS";
          await Bun.write(filePath, response);
        } else {
          set.headers["X-FRIP"] = "HIT";
        }

        set.headers["Cache-Control"] = "public, max-age=2592000";
        return Bun.file(filePath);
      } catch (error) {
        const response = await fetch(uri, {
          headers: {
            "Accept-Encoding": "identity",
            Referer: "https://idoitmyself.xyz/",
          },
        });

        set.headers["Cache-Control"] = "public, max-age=2592000";

        return new Stream(response);
      }
    } catch (error: any) {
      console.log(error);
      set.status = 404;
      return error.message;
    }
  });

export default hlsRoutes;
