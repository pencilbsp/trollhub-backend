import { join, basename } from "path";
import { ChapterProviders } from "@prisma/client";

import B2 from "./utils/b2-sdk";
import prisma from "./utils/prisma";

import {
  B2_KEY_ID,
  STATIC_DIR,
  B2_BUCKET_ID,
  B2_APPLICATION_KEY,
} from "./configs";
import b2Upload from "./utils/b2-upload";

async function listVideo() {
  const dirs = await Bun.$`ls -dt ${join(STATIC_DIR, "m3u8/*/")}`
    .quiet()
    .text();
  return dirs.trim().split("\n");
}

async function uploadToB2(videoDir: string) {
  const videoId = basename(videoDir);

  const chapter = await prisma.chapter.findUnique({
    where: { fid: videoId },
  });

  if (!chapter) {
    return console.warn(videoId, "Video không tồn tại.");
  }

  let m3u8Content = "";

  const m3u8Path = join(videoDir, "index.m3u8");
  const m3u8File = Bun.file(m3u8Path);

  const m3u8Exist = await m3u8File.exists();

  if (!m3u8Exist) {
    const localPath = join(STATIC_DIR, "m3u8", chapter.id + ".m3u8");
    const localFile = Bun.file(localPath);

    const localExist = await localFile.exists();

    if (!localExist) {
      return console.warn(videoId, "Tệp tin m3u8 không tồn tại.");
    }

    m3u8Content = await localFile.text();
  } else {
    m3u8Content = await m3u8File.text();
  }

  const b2 = new B2({
    keyId: B2_KEY_ID,
    bucketId: B2_BUCKET_ID,
    applicationKey: B2_APPLICATION_KEY,
  });

  await b2.authorize();

  await b2Upload(b2, m3u8Content, videoId, chapter.id);

  await prisma.chapter.update({
    where: { fid: videoId },
    data: {
      status: "ready",
      providers: [ChapterProviders.local, ChapterProviders.b2],
    },
  });

  console.log(videoId, "Đã tải lên thành công.");
}

try {
  const videoDirs = await listVideo();

  do {
    await uploadToB2(videoDirs[0]);

    videoDirs.shift();

    await Bun.sleep(5000);

    console.log(videoDirs.length);
  } while (videoDirs.length);
} catch (error) {
  console.log(error);
}
