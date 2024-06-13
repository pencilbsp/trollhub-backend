import { file } from "bun";
import Elysia, { t } from "elysia";
import { join, basename } from "path";

import { STATIC_DIR } from "@/configs";

const uploadRoutes = new Elysia({ prefix: "/upload" });

uploadRoutes.post(
  "/segment",
  async ({ query, body }) => {
    let message = "";
    let success = true;
    try {
      const videoDir = join(STATIC_DIR, "m3u8", query.fid);
      const m3u8Path = join(videoDir, "index.m3u8");

      const m3u8File = file(m3u8Path);
      const m3u8Content = await m3u8File.text();
      const segments = m3u8Content.match(/#EXTINF:\d+(?:.\d+|),\n.*?$/gm);

      if (!segments) throw new Error("Không thể phân tích tệp tin m3u8");

      const segment = segments[Number(body.fragIndex)];
      const currentUrl = segment.split("\n")[1].trim();

      const segmentPath = join(videoDir, body.fragIndex + ".ts");

      let newUri = body.redirectUrl;

      if (body.segment) {
        try {
          await Bun.write(segmentPath, body.segment);
          newUri = basename(segmentPath);
        } catch (error: any) {
          success = false;
          message = error.message;
        }
      }

      await Bun.write(m3u8Path, m3u8Content.replace(currentUrl, newUri));
      console.log(`[${body.fragIndex}]`, "->", body.redirectUrl, success);

      return { success, error: message ? { message } : undefined };
    } catch (error: any) {
      return {
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
    body: t.Object({
      url: t.String(),
      fragIndex: t.String(),
      segmentUrl: t.String(),
      redirectUrl: t.String(),
      segment: t.Optional(t.File()),
    }),
  }
);

uploadRoutes.post(
  "/m3u8",
  async ({ body }) => {
    try {
      const { fileName, fid, content: m3u8Content } = body;
      // if (!m3u8Content.startsWith("#EXTM3U"))
      //   throw new Error("M3U8 content is invalid");

      const videoDir = join(STATIC_DIR, "m3u8", fid);
      await Bun.$`mkdir -p ${videoDir}`;

      const m3u8Path = join(videoDir, fileName);

      await Bun.write(m3u8Path, m3u8Content);

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message,
        },
      };
    }
  },
  {
    body: t.Object({
      fid: t.String(),
      content: t.String(),
      fileName: t.String(),
    }),
  }
);

export default uploadRoutes;
