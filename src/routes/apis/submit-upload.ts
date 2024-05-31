import { join } from "path";
import Elysia, { t } from "elysia";
import { readdir, unlink } from "fs/promises";

import prisma from "@/utils/prisma";
import { STATIC_DIR } from "@/configs";
import { ChapterStatus } from "@prisma/client";

// /submit-upload
export default new Elysia({ prefix: "/submit-upload" }).post(
  "/",
  async ({ body, set }) => {
    try {
      const { fid, type, segments } = body;

      if (type === "images") {
        segments.push("data.json");
      }

      const workDir = join(STATIC_DIR, type, fid);
      const files = await readdir(workDir);

      const needDelete = files.filter(
        (fileName) => !segments.includes(fileName)
      );

      if (needDelete.length > 0) {
        for (const fileName of needDelete) {
          await unlink(join(workDir, fileName));
        }
      }

      await prisma.chapter.update({
        where: {
          fid,
        },
        data: {
          status: ChapterStatus.ready,
        },
      });

      return { status: "ready" };
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
      fid: t.String(),
      segments: t.Array(t.String()),
      type: t.Union([t.Literal("images")]),
    }),
  }
);
