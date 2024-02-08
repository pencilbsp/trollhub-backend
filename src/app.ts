import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import { html } from "@elysiajs/html"
import { staticPlugin } from "@elysiajs/static"

import apiRoutes from "./routes/api"
import hlsRoutes from "./routes/hls"
import imageRoutes from "./routes/image"
import uploadRoutes from "./routes/upload"
import webSocket from "./routes/web-socket"
import redirectRoute from "./routes/redirect"

console.log("Start server on port: 3001")

new Elysia()
  .use(cors())
  .use(html())
  .use(staticPlugin({ alwaysStatic: false }))
  .use(apiRoutes)
  .use(hlsRoutes)
  .use(imageRoutes)
  .use(uploadRoutes)
  .use(redirectRoute)
  .use(webSocket)
  .get("/", () => {
    return "Hello Fuhu"
  })
  .listen(3001)
