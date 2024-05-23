import { randomUUID } from "crypto";
import { Parser } from "m3u8-parser";
import { join, basename } from "path";
import { ChapterProviders } from "@prisma/client";

import B2 from "./utils/b2";
import prisma from "./utils/prisma";

import {
  B2_KEY_ID,
  STATIC_DIR,
  B2_BUCKET_ID,
  B2_APPLICATION_KEY,
} from "./configs";

async function listVideo() {
  const dirs = await Bun.$`ls -d ${join(STATIC_DIR, "m3u8/*/")}`.quiet().text();
  return dirs.trim().split("\n");
}

async function uploadToB2(videoDir: string) {
  const videoId = basename(videoDir);
  const m3u8Path = join(videoDir, "index.m3u8");
  const m3u8File = Bun.file(m3u8Path);

  const m3u8Exist = await m3u8File.exists();
  if (!m3u8Exist) return console.warn(videoId, "Tệp tin m3u8 không tồn tại.");

  let m3u8Content = await m3u8File.text();

  if (m3u8Content.includes("storage.googleapis.com"))
    return console.warn(videoId, "Video này chưa hoàn thành.");

  const parser = new Parser();

  parser.push(m3u8Content);
  parser.end();

  const { segments } = parser.manifest;

  const b2 = new B2({
    keyId: B2_KEY_ID,
    bucketId: B2_BUCKET_ID,
    applicationKey: B2_APPLICATION_KEY,
  });

  await b2.authorize();

  console.log(videoId, "Đang bắt đầu tải lên...");

  let uploadLog: Record<string, string> = {};
  const logPath = join(videoDir, "upload.log");

  const logFile = Bun.file(logPath);
  const logFileExist = await logFile.exists();
  if (logFileExist) uploadLog = await logFile.json();

  do {
    const segment = segments[0];
    if (/^\d+.ts$/.test(segment.uri)) {
      let uploaded = uploadLog[segment.uri];

      if (!uploaded) {
        const fileName = randomUUID();
        const filePath = join(videoDir, segment.uri);

        const b2File = await b2.uploadFile(filePath, {
          fileName,
          path: videoId,
          fileExtension: ".html",
          bucketId: B2_BUCKET_ID,
          contentType: "text/html",
          deleteAffterUpload: false,
        });

        uploaded = b2File.fileName;
        uploadLog[segment.uri] = b2File.fileName;
        await Bun.write(logPath, JSON.stringify(uploadLog));
      }

      console.log(`${segment.uri}->${uploaded}`);
      m3u8Content = m3u8Content.replace(
        `,\n${segment.uri}\n#`,
        `,\n${uploaded}\n#`
      );
    }

    segments.shift();
  } while (segments.length);

  const video = await prisma.chapter.update({
    where: { fid: videoId },
    data: {
      status: "ready",
      providers: [ChapterProviders.local, ChapterProviders.b2],
    },
  });

  const newM3u8Path = join(STATIC_DIR, "m3u8", video.id + ".m3u8");
  await Bun.write(newM3u8Path, m3u8Content);

  await b2.uploadFile(newM3u8Path, {
    path: videoId,
    fileName: video.id,
    bucketId: B2_BUCKET_ID,
    deleteAffterUpload: false,
  });

  console.log(videoId, "Đã tải lên thành công.");
}

try {
  const videoDirs = await listVideo();

  do {
    await uploadToB2(videoDirs[0]);

    videoDirs.shift();
    await Bun.sleep(5000);
  } while (videoDirs.length);
} catch (error) {
  console.log(error);
}
