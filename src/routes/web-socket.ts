import { $ } from "bun"
import sharp from "sharp"
import { join } from "path"
import { existsSync } from "fs"
import { Elysia } from "elysia"

import { STATIC_DIR } from "@/configs"
import { decode } from "@/utils/base64"
import { decrypt } from "@/utils/fuhu/client"
import decryptImages from "@/utils/fuhu/decrypt-images"
import replaceRedirectUrl from "@/utils/replace-redirect-url"

function getFid(urlBase64?: string) {
  if (urlBase64) {
    const pathname = new URL(decode(urlBase64)).pathname
    const slug = pathname.split("/")[2].replaceAll("_", "/").replaceAll("-", "+") + "=="
    const payload = decrypt(slug, "--KpQG3w0km3imY", "b63e541bc9ece19a").split("|")
    return payload[0]
  }
}

const webSocket = new Elysia().ws("/ws", {
  async message(ws, message: any) {
    try {
      // const fid = getFid(ws.data.query.url)

      if (Buffer.isBuffer(message)) {
        const urlLengthArray = new Uint8Array(message.slice(0, 4))
        const urlLength = new Uint32Array(urlLengthArray.buffer)[0]

        // // Extract the URL data based on the length
        const urlArray = new Uint8Array(message.slice(4, 4 + urlLength))
        const imageUrl = new TextDecoder().decode(urlArray)

        // const [fid, name] = imageUrl.split("/")

        // // Extract the Blob data after the URL data
        const blobData = message.slice(4 + urlLength)

        const image = sharp(blobData)
        const metadata = await image.metadata()
        if (metadata.width === 450 && metadata.height === 450) {
          console.log("Skip QR code image")
        } else {
          console.log(imageUrl)
          const imagePath = join(STATIC_DIR, "images", imageUrl)
          await image.toFile(imagePath)
        }

        image.destroy()
        // Process the Blob data here
        // console.log("Received image blob:", blobData)
      } else {
        const { action, payload } = message
        // console.log(`Client ${ws.id} send action: ${action}, payload:`, payload)
        // if (action === "ping") ws.send(JSON.stringify({ action: "alert", payload: "pong" }))
        if (action === "start" && payload) replaceRedirectUrl(ws, payload)
        if (action === "log_images") await decryptImages(payload.fid, { data: payload.data })
      }
    } catch (error) {
      console.log(error)
    }
  },
  close(ws, code, message) {
    console.log("A client disconnected!")
  },
  async open(ws) {
    const fid = getFid(ws.data.query.url)
    if (fid) {
      const imageDir = join(STATIC_DIR, "images", fid)
      if (!existsSync(imageDir)) await $`mkdir ${imageDir}`
    }

    console.log("A client connected!")
  },
})

export default webSocket
