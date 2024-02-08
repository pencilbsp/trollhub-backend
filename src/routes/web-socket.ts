import sharp from "sharp"
import { join } from "path"
import { $, file } from "bun"
import { existsSync } from "fs"
import { Elysia } from "elysia"

import { STATIC_DIR } from "@/configs"
import { decode } from "@/utils/base64"
import myEmitter from "@/utils/emiter"
import { decrypt } from "@/utils/fuhu/client"
import decryptImages from "@/utils/fuhu/decrypt-images"

function getFid(urlBase64?: string) {
  if (!urlBase64) return null
  try {
    const pathname = new URL(decode(urlBase64)).pathname
    const slug = pathname.split("/")[2].replaceAll("_", "/").replaceAll("-", "+") + "=="
    const payload = decrypt(slug, "--KpQG3w0km3imY", "b63e541bc9ece19a").split("|")
    return payload[0]
  } catch (error) {
    return null
  }
}

const loadSegment = (ws: any, payload: { url: string; headers?: Record<string, string> }) => {
  ws.send(
    JSON.stringify({
      action: "load_segment",
      payload: {
        url: payload.url,
        init: {
          headers: payload.headers,
        },
      },
    })
  )
}

const webSocket = new Elysia().ws("/ws", {
  async message(_, message: any) {
    try {
      if (Buffer.isBuffer(message)) {
        const payloadLengthArray = new Uint8Array(message.slice(0, 4))
        const payloadLength = new Uint32Array(payloadLengthArray.buffer)[0]

        // Extract the URL data based on the length
        const playloadArray = new Uint8Array(message.slice(4, 4 + payloadLength))
        const payload = JSON.parse(new TextDecoder().decode(playloadArray))
        const blobData = message.slice(4 + payloadLength)

        if (payload.type === "image") {
          const image = sharp(blobData)
          const metadata = await image.metadata()

          if (metadata.width === 450 && metadata.height === 450) {
            console.log("Skip QR code image")
          } else {
            console.log(payload.url)
            const imagePath = join(STATIC_DIR, "images", payload.url)
            await image.toFile(imagePath)
          }

          image.destroy()
        }

        if (payload.type === "segment") {
          myEmitter.emit(payload.url, blobData)
        }
      } else {
        const { action, payload } = message

        /**
         * Lưu m3u8 file
         */
        if (action === "m3u8_content") {
          const videoDir = join(STATIC_DIR, "m3u8", payload.fid)
          const m3u8Path = join(videoDir, "index.m3u8")

          if (!existsSync(m3u8Path)) {
            await $`mkdir -p ${videoDir}`
            await Bun.write(m3u8Path, payload.data)
          }
        }

        /**
         * Lưu hls key
         */
        if (action === "hls_key") {
          const m3u8Path = join(STATIC_DIR, "m3u8", payload.fid, "index.m3u8")
          const f = file(m3u8Path)
          const m3u8Content = await f.text()

          const base64Key = Buffer.from(payload.keyHex, "hex").toString("base64")
          await Bun.write(m3u8Path, m3u8Content.replaceAll(payload.keyUrl, `data:text/plain;base64,${base64Key}`))
        }

        if (action === "parse_url") {
          // const seg = payload.data.formats.enc.seg.length
          // console.log("[parse_url]", payload.data.formats.enc.seg.length)
        }

        if (action === "log_images") {
          await decryptImages(payload.fid, { data: payload.data })
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  close(ws, code, message) {
    console.log("A client disconnected!")
    // myEmitter.off("load_segment", (data) => loadSegment(ws, data))
  },
  async open(ws) {
    const fid = getFid(ws.data.query.url)
    // myEmitter.on("load_segment", (data) => loadSegment(ws, data))

    if (fid !== null) {
      const imageDir = join(STATIC_DIR, "images", fid)
      if (!existsSync(imageDir)) await $`mkdir -p ${imageDir}`
    }

    console.log("A client connected!")
  },
})

export default webSocket
