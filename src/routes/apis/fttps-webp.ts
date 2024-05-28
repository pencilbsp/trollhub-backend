import Elysia, { t } from "elysia";
import { readdir } from "fs/promises";
import { basename, join } from "path";

import { STATIC_DIR } from "@/configs";

// /fttps:webp/:fid
export default new Elysia({ prefix: "/fttps:webp" }).get(
  "/:fid",
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
