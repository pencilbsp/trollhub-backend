import { join } from "path"
import { existsSync } from "fs"
import Elysia, { t } from "elysia"
import { Stream } from "@elysiajs/stream"

const MAX_AGE = 7 * 24 * 60 * 60 // 7 days
const VALID_SEGMENT = /#EXTINF:[\d.]+,\n(http.*?)\n/
const M3U8_DIR = join(process.cwd(), "public", "m3u8")
const base64Encode = (data: string) => Buffer.from(data).toString("base64")
const base64Decode = (data: string) => Buffer.from(data, "base64").toString()

const hlsRoutes = new Elysia({ prefix: "/hls" })
  .post(
    "/manifest/:fileId",
    async ({ params, body, set, headers }) => {
      try {
        let filePath = join(M3U8_DIR, params.fileId)
        if (!filePath.endsWith(".m3u8")) filePath += ".m3u8"

        body = body.trim()
        if (!body.startsWith("#EXTM3U") || !body.endsWith("#EXT-X-ENDLIST"))
          throw new Error("Content type is not supported")

        await Bun.write(filePath, body)
        return { message: "Upload successfully" }
      } catch (error) {
        set.status = 500
        if (error instanceof Error) {
          return { error: { message: error.message } }
        }
      }
    },
    {
      body: t.String(),
    }
  )
  .get("/manifest/:fileId", async ({ params, set }) => {
    try {
      const filePath = join(M3U8_DIR, params.fileId)
      if (!existsSync(filePath)) throw new Error("notFound")

      const f = Bun.file(filePath)
      let m3u8Content = await f.text()

      const segments = m3u8Content
        .match(new RegExp(VALID_SEGMENT, "g"))
        ?.map((segment) => segment.match(VALID_SEGMENT)![1])

      segments?.forEach((uri) => {
        const slug = base64Encode(uri).replaceAll("/", "-")
        m3u8Content = m3u8Content.replace(uri, `/hls/segment/${slug}`)
      })

      // set.headers["Content-Type"] = "application/x-mpegURL"
      set.headers["Content-Type"] = "application/vnd.apple.mpegurl"
      set.headers["Cache-Control"] = `public, max-age=${MAX_AGE}`
      return m3u8Content
    } catch (error) {
      console.log(error)
      set.status = 404
      return
    }
  })
  .get("/segment/:slug", async ({ params, set }) => {
    try {
      const uri = base64Decode(params.slug.replaceAll("-", "/"))
      const response = await fetch(uri)

      const stream = new Stream(response)

      set.headers["Content-Type"] = "video/MP2T"

      const cacheControl = response.headers.get("Cache-Control")
      if (cacheControl) set.headers["Cache-Control"] = cacheControl

      const contentLenght = response.headers.get("Content-Lenght")
      if (contentLenght) set.headers["Content-Lenght"] = contentLenght

      return stream
    } catch (error) {
      console.log(error)
      set.status = 404
      return
    }
  })

export default hlsRoutes
