import { join } from "path";
import { existsSync, rmSync } from "fs";
import { writeFile } from "fs/promises";

import {
  B2_KEY_ID,
  B2_BUCKET_ID,
  FUHURIP_SERVER,
  B2_APPLICATION_KEY,
} from "./configs";
import prisma from "./utils/prisma";
import extractVideo from "./utils/fuhu/video";
import { ChapterStatus, ContentType, ChapterProviders } from "@prisma/client";
import {
  comicParser,
  novelParser,
  COMIC_VERSION,
  createEmbedUrl,
} from "./utils/fuhu/client";
import B2 from "./utils/b2-sdk";
import b2Upload from "./utils/b2-upload";

const M3U8_DIR = "public/m3u8";
const IMAGE_DIR = process.env.IMAGE_DIR || "/";
const MAX_DOWNLOAD_PROCESS = Number(process.env.MAX_DOWNLOAD_PROCESS || 5);

const processIds = new Map();
setInterval(async () => {
  let currentId = null;

  try {
    if (processIds.size >= MAX_DOWNLOAD_PROCESS) return;

    const chapter = await prisma.chapter.findFirst({
      where: {
        // mobileOnly: false,
        type: "movie",
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
    });

    if (!chapter) return;
    if (!chapter.fid) return;
    if (processIds.has(chapter.id)) return;
    if (
      chapter.images &&
      chapter.images.length &&
      chapter.images[0].includes("/simages/")
    )
      return;

    currentId = chapter.id;
    processIds.set(currentId, chapter.fid);

    console.log(
      "[+] Bắt đầu tải xuống",
      currentId,
      chapter.fid,
      chapter.type,
      chapter.mobileOnly
    );

    const comicUrl = createEmbedUrl(chapter.fid, COMIC_VERSION);

    if (chapter.type === ContentType.comic) {
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
    }

    if (chapter.type === ContentType.novel) {
      const text = await novelParser(comicUrl);
      await prisma.chapter.update({
        where: {
          id: currentId,
        },
        data: {
          text,
          status: ChapterStatus.ready,
        },
      });
    }

    if (chapter.type === ContentType.movie) {
      // if (chapter.mobileOnly) throw new Error("Mobile only")
      const m3u8Content = await extractVideo(chapter.fid);

      // return console.log(m3u8Content);

      const videoDir = join(M3U8_DIR, chapter.fid);
      await Bun.$`mkdir -p ${videoDir}`;

      const m3u8Path = join(videoDir, "index.m3u8");
      await writeFile(m3u8Path, m3u8Content);

      await fetch(`${FUHURIP_SERVER}/upload/m3u8`, {
        method: "POST",
        body: JSON.stringify({
          fid: chapter.fid,
          content: m3u8Content,
          fileName: "index.m3u8",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const video = await prisma.chapter.update({
        where: {
          id: currentId,
        },
        data: {
          status: ChapterStatus.ready,
          providers: [ChapterProviders.local],
        },
      });

      if (!video.providers.includes(ChapterProviders.b2)) {
        const b2 = new B2({
          keyId: B2_KEY_ID,
          bucketId: B2_BUCKET_ID,
          applicationKey: B2_APPLICATION_KEY,
        });

        await b2.authorize();

        const result = await b2Upload(b2, m3u8Content, chapter.fid, chapter.id);

        await fetch(`${FUHURIP_SERVER}/upload/m3u8`, {
          method: "POST",
          body: JSON.stringify({
            fid: chapter.fid,
            content: result.m3u8Content,
            fileName: `${chapter.id}.m3u8`,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        await prisma.chapter.update({
          where: {
            id: currentId,
          },
          data: {
            status: ChapterStatus.ready,
            providers: {
              push: ChapterProviders.b2,
            },
          },
        });
      }
    }

    processIds.delete(currentId);
    currentId = null;
  } catch (error: any) {
    console.log(error);
    if (currentId) {
      console.log("[x]", currentId, error.message);

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
