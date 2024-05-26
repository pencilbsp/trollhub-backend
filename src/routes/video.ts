import Elysia, { t } from "elysia";
import { join, extname } from "path";

import { STATIC_DIR, VALID_SEGMENT } from "@/configs";

const M3U8_DIR = join(STATIC_DIR, "m3u8");

const videoRoutes = new Elysia({ prefix: "/videos" });

videoRoutes.get(
  "/hls/:fid/:name",
  async ({ params, set }) => {
    try {
      const { fid, name } = params;
      let filePath = join(M3U8_DIR, fid, name);

      let contentType = "";

      if (extname(name) === ".html") {
        contentType = "text/html";
        filePath = filePath.replace(".html", ".ts");
      }

      const file = Bun.file(filePath);

      const exists = await file.exists();
      if (!exists) throw new Error("File not found.");

      if (name.endsWith(".m3u8")) {
        let m3u8Content = await file.text();

        if (VALID_SEGMENT.test(m3u8Content)) {
          const segments = m3u8Content
            .match(new RegExp(VALID_SEGMENT, "g"))
            ?.map((segment) => segment.match(VALID_SEGMENT)![1]);

          segments?.forEach((uri) => {
            const slug = btoa(uri).replaceAll("/", "-");
            m3u8Content = m3u8Content.replace(uri, `/hls/segment/${slug}`);
          });
        } else {
          m3u8Content = m3u8Content.replaceAll(".ts", ".html");
        }

        set.headers["Content-Type"] = "application/x-mpegURL";
        return m3u8Content;
      }

      set.headers["Cache-Control"] = "public, max-age=2592000";

      if (contentType !== "") {
        set.headers["Content-Type"] = contentType;
      }

      return file;
    } catch (error: any) {
      set.status = 404;
      set.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
      return error.message;
    }
  },
  {
    params: t.Object({
      fid: t.String(),
      name: t.String(),
    }),
    query: t.Object({
      t: t.Optional(t.String()),
    }),
  }
);

export default videoRoutes;
