import { join } from "path"

import prisma from "@/utils/prisma"
import { STATIC_DIR } from "@/configs"
import { decrypt, filterStringsStartingWithSamePrefix, reversImageUrl } from "./client"

type Image = string[]

type AjaxComicResponse = {
  state: string
  data: {
    data: {
      sv1: {
        webp: Image[]
        jpeg: Image[]
      }
    }
    total: number
    error: number
    error_msg?: string
  }
}

export default async function decryptImages(fid: string, { data }: AjaxComicResponse) {
  if (data.error !== 0) throw new Error(data.error_msg)

  const chapter = await prisma.chapter.findFirst({ where: { fid } })

  const hashs = data.data.sv1.webp
  const imageUrls = ([] as Image)
    .concat(...hashs)
    .map((hash) => reversImageUrl(decrypt(hash, "f9a0364a9df71b0", "fb047231a480949f")))

  const [images] = filterStringsStartingWithSamePrefix(imageUrls)
  if (!images.length) throw new Error("Không có hình ảnh nào")

  if (chapter) {
    await prisma.chapter.update({
      where: {
        id: chapter.id,
      },
      data: {
        status: "ready",
        images: images,
      },
    })

    console.log(`[+] ${fid} -> Đã upload thành công ${images.length} hình ảnh`)
  } else {
    const filePath = join(STATIC_DIR, "images", fid + ".json")
    await Bun.write(filePath, JSON.stringify(images))
    console.log(`[+] ${fid} -> Đã lưu thành công ${images.length} hình ảnh`)
  }
}
