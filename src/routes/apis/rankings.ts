import Elysia, { t } from "elysia";

import prisma from "@/utils/prisma";
import { getContentMostViews } from "@/utils/update-view";

export default new Elysia({ prefix: "/rankings" }).get(
  "/",
  async function name({ query, set }) {
    try {
      const keys = await getContentMostViews(query.type, query.limit);
      // @ts-ignore
      const result = await prisma[query.type].findMany({
        where: {
          id: {
            in: keys.map(({ id }) => id),
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
        data: result.map((content: any, index: number) => {
          return { ...content, ...keys[index] };
        }),
      };
    } catch (error) {
      set.status = 500;
      return { error: { message: "Đã có lỗi xảy ra, vui lòng thử lại sau." } };
    }
  },
  {
    query: t.Object({
      limit: t.Optional(t.Numeric()),
      type: t.Union([t.Literal("content"), t.Literal("chapter")]),
    }),
  }
);
