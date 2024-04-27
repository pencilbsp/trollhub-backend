import { join } from "path";
import Elysia, { t } from "elysia";
import { STATIC_DIR } from "@/configs";

const M3U8_DIR = join(STATIC_DIR, "m3u8");

const videoRoutes = new Elysia({ prefix: "/videos" });

videoRoutes.get(
  "/hls/:fid/:name",
  async ({ params, set }) => {
    try {
      const { fid, name } = params;
      const filePath = join(M3U8_DIR, fid, name);
      const file = Bun.file(filePath);

      const exists = await file.exists();
      if (!exists) throw new Error();

      set.headers["Cache-Control"] = "public, max-age=2592000";

      return file;
    } catch (error) {
      set.status = 404;
      set.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
      return "Video Not Found";
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
