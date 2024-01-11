import Elysia, { t } from "elysia"

import prisma from "@/utils/prisma"
import upsertContents from "@/utils/upsert-contents"
import { getChannelContents } from "@/utils/fuhu/crawl"
import { extractFuhuCreator } from "@/utils/fuhu/dom-extract"

const SUPPORTED_FUHU_TYPES = ["comic", "novel", "movie", "channel"]
const VALID_FUHU_URL = /^\/(?<type>(?:movie|comic|novel|channel))\/(?:.*?_|)(?<fid>\w+)(?:\.html|)$/

const apiRoutes = new Elysia({ prefix: "/api" })

apiRoutes.post(
  "/request-content",
  async ({ body, set }) => {
    try {
      const fuhuUrl = new URL(body.url)
      const { type, fid } = VALID_FUHU_URL.exec(fuhuUrl.pathname)?.groups || {}
      if (!type || !fid) throw new Error("Url không không hợp lệ")

      if (!SUPPORTED_FUHU_TYPES.includes(type)) throw new Error("Nội dung không được hỗ trợ")

      if (type === "channel") {
        const userName = "@" + fid
        let channel = await prisma.creator.findUnique({ where: { userName } })
        const channelMetatdata = await extractFuhuCreator(body.url)

        if (!channel) {
          channel = await prisma.creator.create({
            data: {
              bio: channelMetatdata.bio,
              fid: channelMetatdata.fid,
              name: channelMetatdata.name,
              email: channelMetatdata.email,
              cover: channelMetatdata.cover,
              avatar: channelMetatdata.avatar,
              userName: channelMetatdata.userName,
            },
          })
        } else {
          await prisma.creator.update({
            where: {
              userName,
            },
            data: {
              bio: channelMetatdata.bio,
              name: channelMetatdata.name,
              cover: channelMetatdata.cover,
              avatar: channelMetatdata.avatar,
            },
          })
        }

        const channelContents = await getChannelContents(body.url, channel)

        await upsertContents(channelContents)
        return { message: `${channelContents.length} nội dung đã được cập nhật` }
      } else {
        // const content = await prisma.content.findFirst({ where: { fid } })
        return { message: "Tính năng này đang được phát triển" }
      }
    } catch (error: any) {
      set.status = 500
      return {
        error: {
          message: error.message,
        },
      }
    }
  },
  {
    body: t.Object({
      url: t.String(),
    }),
  }
)

apiRoutes.post(
  "/logger",
  ({ body }) => {
    console.log(body.url, body.data)
  },
  {
    body: t.Object({
      data: t.Any(),
      url: t.String(),
    }),
  }
)

export default apiRoutes
