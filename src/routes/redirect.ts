import Elysia from "elysia"

import myEmitter from "@/utils/emiter"

const redirectRoute = new Elysia({ prefix: "/redirect" })

const receiveSegmentData = (url: string, headers?: Record<string, string>): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      myEmitter.off(url, receiveSegmentData)
      return reject(new Error("Time out"))
    }, 30000)

    myEmitter.on(url, (data) => {
      clearTimeout(timeout)
      return resolve(data)
    })

    myEmitter.emit("load_segment", { url, headers })
  })
}

redirectRoute.get("/", async ({ query, headers }) => {
  try {
    if (!query.url) return

    // const realUrl = atob(query.url)
    const realUrl = query.url

    console.log("[redirect]", realUrl)
    const data = await receiveSegmentData(realUrl)

    return new Response(data, {
      headers: {
        "Content-Type": "text/html",
        "Content-Length": data.length.toString(),
      },
      status: 200,
      statusText: "OK",
    })
  } catch (error: any) {
    console.log(error.message)
  }
})

export default redirectRoute
