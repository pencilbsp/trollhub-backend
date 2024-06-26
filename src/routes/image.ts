import { join } from "path";
import Elysia, { t } from "elysia";
import { STATIC_DIR } from "@/configs";

const IMAGES_DIR = join(STATIC_DIR, "images");

const imageRoutes = new Elysia({ prefix: "/images" });

imageRoutes.get(
  "/:fid/:name",
  async ({ params, set }) => {
    try {
      const { fid, name } = params;
      const imagePath = join(IMAGES_DIR, fid, name);
      const image = Bun.file(imagePath);

      const exists = await image.exists();
      if (!exists) throw new Error();

      set.headers["Cache-Control"] = "public, max-age=2592000";

      return image;
    } catch (error) {
      set.status = 404;
      set.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
      return "Image Not Found";
    }
  },
  {
    params: t.Object({
      fid: t.String(),
      name: t.String(),
    }),
  }
);

export default imageRoutes;
