import { file } from "bun"
import Elysia, { t } from "elysia"
import { join, basename } from "path"
import { STATIC_DIR } from "@/configs"

const uploadRoutes = new Elysia({ prefix: "/upload" })

async function saveSegment(segmentPath: string, data?: File) {
  if (data) {
    await Bun.write(segmentPath, data)
    return basename(segmentPath)
  }
}

uploadRoutes.post(
  "/segment",
  async ({ query, body }) => {
    try {
      const videoDir = join(STATIC_DIR, "m3u8", query.fid)
      const m3u8Path = join(videoDir, "index.m3u8")

      const f = file(m3u8Path)
      const m3u8Content = await f.text()
      const segments = m3u8Content.match(/#EXTINF:\d+(?:.\d+|),\n.*?$/gm)
      if (!segments) throw new Error("Không thể phân tích tệp tin m3u8")

      const segment = segments[Number(body.fragIndex)]
      const currentUrl = segment.split("\n")[1].trim()

      const segmentPath = join(videoDir, body.fragIndex + ".ts")
      const segmentFile = await saveSegment(segmentPath, body.segment)

      await Bun.write(m3u8Path, m3u8Content.replace(currentUrl, segmentFile || body.redirectUrl))

      // const segmentIndex = m3u8Content.indexOf(body.segmentUrl)

      // if (segmentIndex > -1) {
      //   const segmentPath = join(videoDir, segmentIndex + ".ts")
      //   const segmentFile = await saveSegment(segmentPath, body.segment)
      //   await Bun.write(m3u8Path, m3u8Content.replace(body.segmentUrl, segmentFile || body.redirectUrl))
      // }
    } catch (error: any) {
      return {
        error: {
          message: error.message,
        },
      }
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
)

uploadRoutes.post(
  "/m3u8",
  async ({ body }) => {
    try {
      const { id, content: m3u8Content } = body
      if (!m3u8Content.startsWith("#EXTM3U")) throw new Error("M3U8 content is invalid")

      const m3u8Path = join(STATIC_DIR, "m3u8", id + ".m3u8")

      await Bun.write(m3u8Path, m3u8Content)

      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message,
        },
      }
    }
  },
  {
    body: t.Object({
      id: t.String(),
      content: t.String(),
    }),
  }
)

export default uploadRoutes
