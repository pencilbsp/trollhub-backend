import Elysia, { t } from "elysia";

import prisma from "@/utils/prisma";
import { getContentMostViews } from "@/utils/update-view";

export default new Elysia({ prefix: "/rankings" }).get(
  "/",
  async function name({ query, set }) {
    try {
      const keys = await getContentMostViews(query.type);
      const resultKeys = keys.slice(query.start, query.end);
      // @ts-ignore
      const contents = await prisma[query.type].findMany({
        where: {
          id: {
            in: resultKeys.map(({ id }) => id),
          },
        },
        select:
          query.type === "content"
            ? {
                id: true,
                fid: true,
                type: true,
                title: true,
                akaTitle: true,
                thumbUrl: true,
                updatedAt: true,
                creator: {
                  select: {
                    name: true,
                    avatar: true,
                    userName: true,
                  },
                },
              }
            : {
                id: true,
                fid: true,
                type: true,
                title: true,
                updatedAt: true,
              },
      });

      return {
        data: resultKeys.map((key) => {
          return {
            ...key,
            ...resultKeys.find(({ id }) => id === key.id),
          };
        }),
        total: keys.length,
      };
    } catch (error) {
      set.status = 500;
      return { error: { message: "Đã có lỗi xảy ra, vui lòng thử lại sau." } };
    }
  },
  {
    query: t.Object({
      end: t.Numeric(),
      start: t.Numeric(),
      type: t.Union([t.Literal("content"), t.Literal("chapter")]),
    }),
  }
);
