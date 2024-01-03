import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import { html } from "@elysiajs/html"
import { staticPlugin } from "@elysiajs/static"

import hlsRoutes from "./routes/hls"
import videoRoutes from "./routes/video"

new Elysia()
  .use(cors())
  .use(html())
  .use(staticPlugin())
  .use(hlsRoutes)
  .use(videoRoutes)
  .get("/", () => "Hello Elysia")
  .listen(3001)
