import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import { html } from "@elysiajs/html"
import { staticPlugin } from "@elysiajs/static"

import apiRoutes from "./routes/api"
import hlsRoutes from "./routes/hls"
import videoRoutes from "./routes/video"
import imageRoutes from "./routes/image"
import uploadRoutes from "./routes/upload"

console.log("Start server on port: 3001")

new Elysia()
  .use(cors())
  .use(html())
  .use(staticPlugin())
  .use(apiRoutes)
  .use(hlsRoutes)
  .use(videoRoutes)
  .use(imageRoutes)
  .use(uploadRoutes)
  .get("/", () => {
    return "Hello Elysia"
  })
  .listen(3001)
