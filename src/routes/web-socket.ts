import sharp from "sharp";
import { join } from "path";
import { $, file } from "bun";
import { existsSync } from "fs";
import { Elysia } from "elysia";
import { randomUUID } from "crypto";

import { STATIC_DIR } from "@/configs";
import { decode } from "@/utils/base64";
import { decrypt } from "@/utils/fuhu/client";
import decryptImages from "@/utils/fuhu/decrypt-images";

function getFid(urlBase64?: string) {
  if (!urlBase64) return null;
  try {
    const pathname = new URL(decode(urlBase64)).pathname;
    const slug =
      pathname.split("/")[2].replaceAll("_", "/").replaceAll("-", "+") + "==";
    const payload = decrypt(slug, "--KpQG3w0km3imY", "b63e541bc9ece19a").split(
      "|"
    );
    return payload[0];
  } catch (error) {
    return null;
  }
}

// const loadSegment = (ws: any, payload: { url: string; headers?: Record<string, string> }) => {
//   ws.send(
//     JSON.stringify({
//       action: "load_segment",
//       payload: {
//         url: payload.url,
//         init: {
//           headers: payload.headers,
//         },
//       },
//     })
//   )
// }

const sourceLogger = async (url: string, source: string) => {
  try {
    const sourceDir = join(STATIC_DIR, "source");
    if (!existsSync(sourceDir)) await $`mkdir -p ${sourceDir}`;

    const htmlPath = join(sourceDir, randomUUID());

    await Bun.write(
      htmlPath,
      `<!-- ${Date.now()} -->\n<!-- ${url} -->\n${source}`
    );
  } catch (error) {}
};

const webSocket = new Elysia().ws("/ws", {
  async message(ws, message: any) {
    try {
      if (Buffer.isBuffer(message)) {
        const payloadLengthArray = new Uint8Array(message.slice(0, 4));
        const payloadLength = new Uint32Array(payloadLengthArray.buffer)[0];

        // Extract the URL data based on the length
        const playloadArray = new Uint8Array(
          message.slice(4, 4 + payloadLength)
        );
        const payload = JSON.parse(new TextDecoder().decode(playloadArray));
        const blobData = message.slice(4 + payloadLength);

        if (payload.type === "images") {
          const image = sharp(blobData);
          const metadata = await image.metadata();

          if (metadata.width === 300 && metadata.height === 300) {
            // console.log("Skip QR code image");
            ws.send({ type: payload.type, status: "ok", fileName: "qr.code" });
          } else if (metadata.width === 450 && metadata.height === 450) {
            // console.log("Skip QR code image");
            ws.send({ type: payload.type, status: "ok", fileName: "qr.code" });
          } else {
            const imageDir = join(STATIC_DIR, payload.type, payload.fid);
            const imagePath = join(imageDir, payload.url);

            await $`mkdir -p ${imageDir}`;

            await image.toFile(imagePath);

            ws.send({
              status: "ok",
              type: payload.type,
              fileName: payload.url,
            });
          }

          image.destroy();
        }
      } else {
        const { action, payload } = message;

        /**
         * Lưu m3u8 file
         */
        if (action === "m3u8_content") {
          const videoDir = join(STATIC_DIR, "m3u8", payload.fid);
          const m3u8Path = join(videoDir, "index.m3u8");

          if (!existsSync(m3u8Path)) {
            await $`mkdir -p ${videoDir}`;
            await Bun.write(m3u8Path, payload.data);
          }
        }

        /**
         * Lưu hls key
         */
        if (action === "hls_key") {
          const m3u8Path = join(STATIC_DIR, "m3u8", payload.fid, "index.m3u8");
          const m3u8File = file(m3u8Path);
          const m3u8Content = await m3u8File.text();

          const base64Key = Buffer.from(payload.keyHex, "hex");

          const keyUrl = m3u8Content.match(
            /#EXT-X-KEY:METHOD=AES-128,URI="(.*?)",IV=/
          );

          if (keyUrl && keyUrl[1]) {
            await Bun.write(
              m3u8Path,
              m3u8Content.replaceAll(
                keyUrl[1],
                `data:text/plain;base64,${base64Key.toString("base64")}`
              )
            );
          }
        }

        if (action === "log_source") {
          await sourceLogger(payload.url, payload.source);
          // console.log("===========[Log source]===========")
          // console.log("[+] URL:", payload.url)
          // console.log("[+] SOURCE:", payload.source)
          // console.log("===========[Log source end]===========\n")
        }

        if (action === "log_images") {
          await decryptImages(payload.fid, { data: payload.data });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  close(ws, code, message) {
    console.log("A client disconnected!");
    // myEmitter.off("load_segment", (data) => loadSegment(ws, data))
  },
  async open(ws) {
    const fid = getFid(ws.data.query.url);
    // myEmitter.on("load_segment", (data) => loadSegment(ws, data))

    if (fid !== null) {
      const imageDir = join(STATIC_DIR, "images", fid);
      if (!existsSync(imageDir)) await $`mkdir -p ${imageDir}`;
    }

    console.log("A client connected!");
  },
});

export default webSocket;
