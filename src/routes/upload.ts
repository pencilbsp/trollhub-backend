import Elysia, { t } from "elysia";
import { join, basename } from "path";
import { file, CryptoHasher } from "bun";

import { STATIC_DIR } from "@/configs";

const uploadRoutes = new Elysia({ prefix: "/upload" });

async function saveSegment(segmentPath: string, data: File, tryCount = 1) {
  try {
    const hasher = new CryptoHasher("md5");
    const reader = data.stream().getReader();

    while (true) {
      const { done, value } = await reader.read();

      if (value) {
        hasher.update(value);
      }

      if (done) {
        break;
      }
    }

    await Bun.write(segmentPath, data);

    return {
      fileName: basename(segmentPath),
      md5Checksum: hasher.digest("hex"),
    };
  } catch (error) {
    tryCount++;

    if (tryCount <= 3) {
      return saveSegment(segmentPath, data, tryCount);
    }

    throw error;
  }
}

uploadRoutes.post(
  "/segment",
  async ({ query, body }) => {
    try {
      console.log(body.segmentUrl, "->", body.redirectUrl);
      const videoDir = join(STATIC_DIR, "m3u8", query.fid);
      const m3u8Path = join(videoDir, "index.m3u8");

      const f = file(m3u8Path);
      const m3u8Content = await f.text();
      const segments = m3u8Content.match(/#EXTINF:\d+(?:.\d+|),\n.*?$/gm);
      if (!segments) throw new Error("Không thể phân tích tệp tin m3u8");

      const segment = segments[Number(body.fragIndex)];
      const currentUrl = segment.split("\n")[1].trim();

      const segmentPath = join(videoDir, body.fragIndex + ".ts");

      let newUri = body.redirectUrl;

      if (body.segment) {
        try {
          const segmentFile = await saveSegment(segmentPath, body.segment);
          newUri = segmentFile.fileName;
        } catch (error) {
          console.log(error);
        }
      }

      await Bun.write(m3u8Path, m3u8Content.replace(currentUrl, newUri));

      return { success: true };
    } catch (error: any) {
      console.log(error);
      return {
        error: {
          message: error.message,
        },
      };
    }
  },
  {
    query: t.Object({
      fid: t.String(),
    }),
    body: t.Object({
      url: t.String(),
      fragIndex: t.String(),
      segmentUrl: t.String(),
      redirectUrl: t.String(),
      segment: t.Optional(t.File()),
    }),
  }
);

uploadRoutes.post(
  "/m3u8",
  async ({ body }) => {
    try {
      const { fileName, fid, content: m3u8Content } = body;
      // if (!m3u8Content.startsWith("#EXTM3U"))
      //   throw new Error("M3U8 content is invalid");

      const videoDir = join(STATIC_DIR, "m3u8", fid);
      await Bun.$`mkdir -p ${videoDir}`;

      const m3u8Path = join(videoDir, fileName);

      await Bun.write(m3u8Path, m3u8Content);

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message,
        },
      };
    }
  },
  {
    body: t.Object({
      fid: t.String(),
      content: t.String(),
      fileName: t.String(),
    }),
  }
);

export default uploadRoutes;
