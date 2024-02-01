import { join } from "path"
import Elysia, { t } from "elysia"
import { readdir } from "fs/promises"

import prisma from "@/utils/prisma"
import { STATIC_DIR } from "@/configs"
import { hexToString } from "@/utils/base64"
import upsertContents from "@/utils/upsert-contents"
import { getChannelContents } from "@/utils/fuhu/crawl"
import decryptImages from "@/utils/fuhu/decrypt-images"
import { extractFuhuCreator } from "@/utils/fuhu/dom-extract"
import decryptHls, { hlsLogger } from "@/utils/fuhu/decrypt-hls"

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
  "/ajax-logger",
  async ({ body }) => {
    try {
      console.log("=========================AJAX LOGGER=========================")
      console.log("Ajax url:", body.url)

      if (body.type === "comic") {
        await decryptImages(body.fid, body.response)
      }

      if (body.type === "movie" && body.url === "/content/parseUrl") {
        await hlsLogger(body.fid, body.response)
      }

      return { success: true }
      // return { success: true, message: "Logged ajax response successfully" }
    } catch (error: any) {
      // console.log(error)
      return { message: error.message }
    }
  },
  {
    body: t.Object({
      url: t.String(),
      fid: t.String(),
      type: t.String(),
      response: t.Any(),
      contentType: t.String(),
      payload: t.Optional(t.Any()),
    }),
  }
)

apiRoutes.post(
  "/key-logger",
  ({ body }) => {
    console.log("=========================CRYPTOJS KEY LOGGER=========================")
    console.log("Crypto ciphertext ->", body.ciphertext)
    console.log("Crypto key:iv ->", `${body.key}:${body.iv}`)
    console.log("\n")

    return { success: true }
  },
  {
    body: t.Object({
      iv: t.String(),
      key: t.String(),
      fid: t.String(),
      type: t.String(),
      ciphertext: t.String(),
    }),
  }
)

apiRoutes.post(
  "/keys-logger",
  async ({ body }) => {
    try {
      console.log("=========================CRYPTOJS KEYS LOGGER=========================")
      console.log("Crypto keys ->", body.fid, body.keys)

      const keys = Object.keys(body.keys).map((key) => ({
        key: hexToString(key),
        iv: hexToString(body.keys[key]),
      }))

      await decryptHls(body.fid, keys)

      return { success: true, message: "Logged crypto keys successfully" }
    } catch (error: any) {
      return { success: false, message: error.message }
    }
  },
  {
    body: t.Object({
      fid: t.String(),
      keys: t.Object(t.Any()),
    }),
  }
)

apiRoutes.get(
  "/fttps:webp/:fid",
  async ({ params }) => {
    try {
      const fid = params.fid
      const imageDir = join(STATIC_DIR, "images", fid)
      const files = await readdir(imageDir)
      const images = files
        .filter((file) => file.endsWith(".webp"))
        .sort((a, b) => {
          let [aPrefix, aSuffix] = a.replace(".webp", "").split("_")
          let [bPrefix, bSuffix] = b.replace(".webp", "").split("_")

          // So sánh theo prefix, nếu giống nhau thì so sánh theo suffix
          if (aPrefix !== bPrefix) {
            return parseInt(aPrefix, 10) - parseInt(bPrefix, 10)
          } else {
            return parseInt(aSuffix, 10) - parseInt(bSuffix, 10)
          }
        })
      return { images }
    } catch (error) {
      console.log(error)
      return { images: [] }
    }
  },
  {
    params: t.Object({
      fid: t.String(),
      webp: t.Optional(t.String()),
    }),
  }
)

export default apiRoutes
