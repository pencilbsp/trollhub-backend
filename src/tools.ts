import { join } from "path"
import { existsSync, rmSync } from "fs"
import { writeFile } from "fs/promises"

import prisma from "./utils/prisma"
import extractVideo from "./utils/fuhu/video"
import { ChapterStatus, ContentType } from "@prisma/client"
import { COMIC_VERSION, comicParser, createEmbedUrl, novelParser } from "./utils/fuhu/client"

const M3U8_DIR = "public/m3u8"
const IMAGE_DIR = process.env.IMAGE_DIR || "/"
const MAX_DOWNLOAD_PROCESS = Number(process.env.MAX_DOWNLOAD_PROCESS || 5)

const processIds = new Map()
setInterval(async () => {
  let currentId = null

  try {
    if (processIds.size >= MAX_DOWNLOAD_PROCESS) return

    const chapter = await prisma.chapter.findFirst({
      where: {
        // mobileOnly: false,
        // type: "movie",
        // type: {
        //   not: ContentType.movie,
        // },
        // images: {
        //   isEmpty: true,
        // },
        status: {
          notIn: [ChapterStatus.error, ChapterStatus.ready],
        },
      },
      skip: processIds.size,
      orderBy: {
        updatedAt: "desc",
      },
    })

    // console.log(chapter)

    if (!chapter) return
    if (!chapter.fid) return
    if (processIds.has(chapter.id)) return
    if (chapter.images && chapter.images.length && chapter.images[0].includes("/simages/")) return

    currentId = chapter.id
    processIds.set(currentId, chapter.fid)

    console.log("[+] Bắt đầu tải xuống", currentId, chapter.fid, chapter.type)

    const comicUrl = createEmbedUrl(chapter.fid, COMIC_VERSION)

    if (chapter.type === ContentType.comic) {
      const images = await comicParser(comicUrl)
      // const chapterDir = join(IMAGE_DIR, chapter.fid);
      // if (!existsSync(chapterDir)) mkdirSync(chapterDir);
      // const images = await downloadComicImages(chapter.fid, chapterDir);
      await prisma.chapter.update({
        where: {
          id: currentId,
        },
        data: {
          images,
          status: ChapterStatus.ready,
        },
      })
    }

    if (chapter.type === ContentType.novel) {
      const text = await novelParser(comicUrl)
      await prisma.chapter.update({
        where: {
          id: currentId,
        },
        data: {
          text,
          status: ChapterStatus.ready,
        },
      })
    }

    if (chapter.type === ContentType.movie) {
      if (chapter.mobileOnly) throw new Error("Mobile only")
      const m3u8Content = await extractVideo(chapter.fid)
      const m3u8Path = join(M3U8_DIR, chapter.id + ".m3u8")
      await writeFile(m3u8Path, m3u8Content)
      await prisma.chapter.update({
        where: {
          id: currentId,
        },
        data: { status: ChapterStatus.ready },
      })
    }

    processIds.delete(currentId)
    currentId = null
  } catch (error) {
    if (currentId) {
      console.log("[x]", currentId, error)

      if (processIds.has(currentId)) {
        const chapterId = processIds.get(currentId)
        const chapterDir = join(IMAGE_DIR, chapterId)
        if (existsSync(chapterDir)) rmSync(chapterDir, { force: true })
        processIds.delete(currentId)
      }

      await prisma.chapter.update({
        where: {
          id: currentId,
        },
        data: {
          status: ChapterStatus.error,
        },
      })

      currentId = null
    }
  }
}, 5000)
