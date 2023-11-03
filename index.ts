import { forEachLimit } from "async";
import { join, basename } from "path";
import { existsSync, mkdirSync, rmSync } from "fs";

import prisma from "./utils/prisma";
import downloadWithFetch from "./utils/download-file";
import { comicParser, createComicURL } from "./utils/fuhu/client";
import { ChapterStatus, ContentType } from "@prisma/client";

const FUHU_COOKIE = process.env.FUHU_COOKIE;
const IMAGE_DIR = process.env.IMAGE_DIR || "/";
const MAX_DOWNLOAD_PROCESS = Number(process.env.MAX_DOWNLOAD_PROCESS || 5);

const headers = new Headers({
  Cookie: FUHU_COOKIE!,
});

function downloadComicImages(comicId: string, chapterDir: string) {
  return new Promise<string[]>(function (resolve, reject) {
    const comicUrl = createComicURL(comicId);
    comicParser(comicUrl)
      .then((imageUrls) =>
        forEachLimit(
          imageUrls,
          10,
          function (imageUrl, cb) {
            let imageName = basename(imageUrl);
            if (imageName.includes("?v=")) imageName = imageName.split("?")[0];
            const imagePath = join(chapterDir, imageName);
            downloadWithFetch(imageUrl, imagePath)
              .then(() => cb())
              .catch((error) => cb(error));
          },
          function (err) {
            console.log(err);
            if (err) return reject(err);
            return resolve(imageUrls);
          }
        )
      )
      .catch((err) => reject(err));
  });
}

const processIds = new Map();
setInterval(async () => {
  let currentId = null;

  try {
    if (processIds.size >= MAX_DOWNLOAD_PROCESS) return;

    const chapter = await prisma.chapter.findFirst({
      where: {
        mobileOnly: false,
        type: ContentType.comic,
        images: {
          isEmpty: true,
        },
        status: {
          notIn: [ChapterStatus.error, ChapterStatus.ready],
        },
      },
      orderBy: {
        updatedAt: "asc",
      },
    });

    if (!chapter) return;
    if (!chapter.fid) return;
    if (processIds.has(chapter.id)) return;
    if (chapter && chapter.images && chapter.images.length > 0) return;

    currentId = chapter.id;
    processIds.set(currentId, chapter.fid);

    console.log("[+] Bắt đầu tải xuống", currentId, chapter.fid);

    const comicUrl = createComicURL(chapter.fid);
    const images = await comicParser(comicUrl);
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
    });

    processIds.delete(currentId);
    currentId = null;
  } catch (error) {
    if (currentId) {
      console.log("[x]", currentId, error);

      if (processIds.has(currentId)) {
        const chapterId = processIds.get(currentId);
        const chapterDir = join(IMAGE_DIR, chapterId);
        if (existsSync(chapterDir)) rmSync(chapterDir, { force: true });
        processIds.delete(currentId);
      }

      await prisma.chapter.update({
        where: {
          id: currentId,
        },
        data: {
          status: ChapterStatus.error,
        },
      });

      currentId = null;
    }
  }
}, 5000);
