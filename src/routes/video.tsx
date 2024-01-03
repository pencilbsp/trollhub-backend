import Elysia from "elysia"

const videoRoutes = new Elysia({ prefix: "/video" }).get("/:videoId", ({ params }) => {
  return (
    <html lang="vi">
      <head>
        <title>Hello World</title>
      </head>
      <body>
        <h1>{params.videoId}</h1>
      </body>
    </html>
  )
})

export default videoRoutes
