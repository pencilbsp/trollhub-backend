import Elysia, { t } from "elysia";
import { join, extname } from "path";
import { exists, mkdir } from "fs/promises";
import { STATIC_DIR, FUHU_IMAGE_HOST } from "@/configs";

const IMAGES_DIR = join(STATIC_DIR, "images");

const proxyRoutes = new Elysia({ prefix: "/proxy" });

proxyRoutes.get(
  "/:fid/:tagName/:slug",
  async ({ params: { fid, slug, tagName }, set, query: { s } }) => {
    try {
      const chapterDir = join(IMAGES_DIR, fid);
      const filePath = join(chapterDir, s + extname(slug));

      if (!(await exists(filePath))) {
        const imageUrl = `${FUHU_IMAGE_HOST}/${tagName}/${slug}?s=${s}`;

        const response = await fetch(imageUrl, {
          headers: { Referer: "https://idoitmyself.xyz/" },
        });

        if (!response.ok || response.status !== 200) throw new Error();

        if (!(await exists(chapterDir))) {
          await mkdir(chapterDir, { recursive: true });
        }

        await Bun.write(filePath, response);
      }

      set.headers["Cache-Control"] = "public, max-age=2592000";
      return Bun.file(filePath);
    } catch (error) {
      set.status = 404;
      set.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
      return "Image Not Found";
    }
  },
  {
    params: t.Object({
      fid: t.String(),
      slug: t.String(),
      tagName: t.String(),
    }),
    query: t.Object({
      s: t.String(),
    }),
  }
);

export default proxyRoutes;
