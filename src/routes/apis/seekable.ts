import { join } from "path";
import Elysia, { t } from "elysia";

import { STATIC_DIR } from "@/configs";

const isAvailable = (content: string) =>
  content.includes("/sile/") ||
  content.includes("redirector") ||
  content.includes("tsredirector") ||
  content.includes("storage.googleapis.com");

// /seekable
export default new Elysia({ prefix: "/seekable" }).get(
  "/",
  async ({ query }) => {
    try {
      const videoDir = join(STATIC_DIR, "m3u8", query.fid);
      const m3u8Path = join(videoDir, "index.m3u8");

      const f = Bun.file(m3u8Path);
      const m3u8Content = await f.text();
      const segments = m3u8Content.match(/#EXTINF:\d+(?:.\d+|),\n.*?$/gm);
      if (!segments) throw new Error("Không thể phân tích tệp tin m3u8");

      let time = 0;
      let index = 0;
      const tos = [];
      let latest = false;
      while (true) {
        const segment = segments[index];
        if (!segment) break;

        const segmentTime = segment.match(/#EXTINF:(\d+(?:.\d+|)),\n/)![1];
        time += parseFloat(segmentTime);

        if (isAvailable(segment)) {
          if (!latest) {
            tos.push(time - 10);
          }

          latest = true;
        } else {
          latest = false;
        }

        index++;
      }

      return { tos };
    } catch (error: any) {
      return {
        tos: [],
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
