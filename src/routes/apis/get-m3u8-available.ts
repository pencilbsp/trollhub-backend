import Elysia, { t } from "elysia";
import { extname, join } from "path";
import { readdir } from "fs/promises";

import {
  STATIC_DIR,
  STATIC_HOST,
  FUHURIP_SERVER,
  B2_BUCKET_NAME,
} from "@/configs";

const isAvailable = (content: string) =>
  content.includes("/sile/") ||
  content.includes("redirector") ||
  content.includes("tsredirector") ||
  content.includes("storage.googleapis.com");

// /get-m3u8-available
export default new Elysia({ prefix: "/get-m3u8-available" }).get(
  "/",
  async ({ set, query }) => {
    try {
      const videoDir = join(STATIC_DIR, "m3u8", query.fid);
      const result = await readdir(videoDir);
      const m3u8s = result.filter((f) => extname(f) === ".m3u8");

      const providers: any[] = [];

      for (const m3u8Name of m3u8s) {
        if (m3u8Name === "index.m3u8") {
          const m3u8File = Bun.file(join(videoDir, m3u8Name));
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
            src: `${STATIC_HOST}/${B2_BUCKET_NAME}/${query.fid}/${m3u8Name}`,
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
