import Elysia, { t } from "elysia"

import prisma from "@/utils/prisma"
import { decrypt, filterStringsStartingWithSamePrefix, reversImageUrl } from "@/utils/fuhu/client"

const uploadRoutes = new Elysia({ prefix: "/upload" })

uploadRoutes.post(
  "/images",
  async ({ body }) => {
    try {
      if (!body.data) throw new Error("Không có gì để upload")

      const { pathname } = new URL(body.url)
      const slug = pathname.split("/")[2].replaceAll("_", "/").replaceAll("-", "+") + "=="
      const payload = decrypt(slug, "--KpQG3w0km3imY", "b63e541bc9ece19a").split("|")
      const fid = payload[0]

      const chapter = await prisma.chapter.findFirst({ where: { fid } })
      if (!chapter) throw new Error("Nội dung này không tồn tại")

      const hashs = body.data.sv1.webp
      const imageUrls = []
        .concat(...hashs)
        .map((hash) => reversImageUrl(decrypt(hash, "f9a0364a9df71b0", "fb047231a480949f")))

      const [images] = filterStringsStartingWithSamePrefix(imageUrls)

      await prisma.chapter.update({
        where: {
          id: chapter.id,
        },
        data: {
          status: "ready",
          images: images,
        },
      })

      const message = `Đã đăng thành công ${images.length} cho chương ${chapter.fid}`
      console.log(message)
      return { message }
    } catch (error: any) {
      console.log(error)
      return { message: error.message }
    }
  },
  {
    body: t.Object({
      url: t.String(),
      fid: t.String(),
      data: t.Object({
        sv1: t.Object({
          webp: t.Array(t.Any()),
          jpeg: t.Array(t.Any()),
        }),
      }),
    }),
  }
)

uploadRoutes.post(
  "/image",
  async ({ body }) => {
    try {
      const fileName = body.image.name
      const buffer = await body.image.arrayBuffer()
      await Bun.write(`public/images/test/${fileName}`, buffer)
    } catch (error: any) {
      console.log(error)
      return { message: error.message }
    }
  },
  {
    body: t.Object({
      image: t.File(),
    }),
  }
)

uploadRoutes.post(
  "/image2",
  async ({ body }) => {
    try {
      console.log(body.url, body.data)
    } catch (error: any) {
      console.log(error)
      return { message: error.message }
    }
  },
  {
    body: t.Object({
      data: t.String(),
      url: t.String(),
    }),
  }
)

export default uploadRoutes
