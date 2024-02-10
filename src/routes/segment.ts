import { join } from "path"
import Elysia, { t } from "elysia"
import { STATIC_DIR } from "@/configs"

const M3U8_DIR = join(STATIC_DIR, "m3u8")

const segmentRoutes = new Elysia({ prefix: "/hls" })

segmentRoutes.get(
  "/:fid/:name",
  async ({ params, set }) => {
    try {
      const { fid, name } = params
      const segmentPath = join(M3U8_DIR, fid, name)
      const segment = Bun.file(segmentPath)

      const exists = await segment.exists()
      if (!exists) throw new Error()

      set.headers["Cache-Control"] = "public, max-age=2592000"

      return segment
    } catch (error) {
      set.status = 404
      return "Not Found"
    }
  },
  {
    params: t.Object({
      fid: t.String(),
      name: t.String(),
    }),
  }
)

export default segmentRoutes
