import { randomUUID } from "crypto";
import { forEachLimit } from "async";
import { Parser } from "m3u8-parser";
import { join, basename } from "path";

import B2 from "./b2-sdk";
import {
  STATIC_DIR,
  B2_BUCKET_ID,
  STATIC_HOST,
  B2_BUCKET_NAME,
} from "@/configs";

export default async function b2Upload(
  b2: B2,
  m3u8Path: string,
  fid: string,
  vid: string
) {
  let m3u8Content = "";
  const videoDir = join(STATIC_DIR, "m3u8", fid);

  if (m3u8Path.startsWith("#EXTM3U")) {
    m3u8Content = m3u8Path;
  } else {
    const m3u8File = Bun.file(m3u8Path);
    const m3u8Exist = await m3u8File.exists();

    if (!m3u8Exist) throw new Error("Tệp tin m3u8 không tồn tại.");

    m3u8Content = await m3u8File.text();
  }

  if (m3u8Content.includes("storage.googleapis.com")) {
    throw new Error("Video này chưa hoàn thành.");
  }

  const parser = new Parser();

  parser.push(m3u8Content);
  parser.end();

  const { segments } = parser.manifest;

  let uploadLog: Record<string, string> = {};
  const logPath = join(videoDir, "upload.log");

  const logFile = Bun.file(logPath);
  const logFileExist = await logFile.exists();
  if (logFileExist) uploadLog = await logFile.json();

  let count = 0;
  let uploadCount = 0;
  await forEachLimit(segments, 5, async (segment) => {
    let uploaded = null;
    let segmentName = null;
    let filePath: string | Buffer | null = null;

    if (segment.uri.startsWith("https")) {
      segmentName = basename(new URL(segment.uri).pathname);
      uploaded = uploadLog[segmentName];
    } else if (/^\d+.ts$/.test(segment.uri)) {
      uploaded = uploadLog[segment.uri];
      filePath = join(videoDir, segment.uri);
    } else {
      uploaded = segment.uri;
    }

    if (!uploaded) {
      const fileName = randomUUID();

      if (!filePath) {
        const response = await fetch(segment.uri, {
          headers: {
            "Accept-Encoding": "identity",
          },
        });

        const arrBuf = await response.arrayBuffer();
        filePath = Buffer.from(arrBuf);
      }

      const b2File = await b2.uploadFile(filePath!, {
        fileName,
        path: fid,
        fileExtension: ".html",
        bucketId: B2_BUCKET_ID,
        contentType: "text/html",
        deleteAffterUpload: false,
      });

      uploadCount++;
      uploaded = b2File.fileName;
      uploadLog[segmentName || segment.uri] = b2File.fileName;
      await Bun.write(logPath, JSON.stringify(uploadLog));
    }

    count++;
    console.log(
      `[${count}/${segments.length}] ${segmentName || segment.uri}->${uploaded}`
    );
    m3u8Content = m3u8Content.replace(
      `,\n${segment.uri}\n#`,
      `,\n${uploaded}\n#`
    );
  });

  const newM3u8Path = join(STATIC_DIR, "m3u8", fid, vid + ".m3u8");
  await Bun.write(newM3u8Path, m3u8Content);

  const response = await fetch(
    `${STATIC_HOST}/${B2_BUCKET_NAME}/${fid}/${vid}.m3u8`
  );

  if (uploadCount > 0 || response.status !== 200) {
    await b2.uploadFile(newM3u8Path, {
      path: fid,
      fileName: vid,
      bucketId: B2_BUCKET_ID,
      fileExtension: ".m3u8",
      deleteAffterUpload: false,
    });
  }

  return { m3u8Content, uploadCount, uploadLog };
}
