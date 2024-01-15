import Elysia, { t } from "elysia"

import prisma from "@/utils/prisma"
import { decrypt, filterStringsStartingWithSamePrefix, reversImageUrl } from "@/utils/fuhu/client"

const uploadRoutes = new Elysia({ prefix: "/upload" })

uploadRoutes.post(
  "/images",
  async ({ body }) => {
    try {
      if (!body.data) throw new Error("Không có gì để upload")

      // const keys = Object.keys(body.keys)
      // if (!keys.length) throw new Error("Không có key để giải mã")

      // const key = keys[0]
      // const iv = body.keys[key]

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
      // fid: t.String(),
      data: t.Object({
        sv1: t.Object({
          webp: t.Array(t.Any()),
          jpeg: t.Array(t.Any()),
        }),
      }),
    }),
  }
)

export default uploadRoutes
