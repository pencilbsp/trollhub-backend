import Elysia from "elysia"
import { Stream } from "@elysiajs/stream"

const imageRoutes = new Elysia({ prefix: "/images" }).get("/*", async ({ params, query, set }) => {
  try {
    const imageUrl = `https://static.theshalola.xyz/images/${params["*"]}`
    console.log(imageUrl)
    // https://static.theshalola.xyz/images/aY4D2A27/HJwiVAJf/J5HLkgcv/bc861de9274a357a18fd9355fb1a8759-f2.webp?v=1703225976
    // https://static.theshalola.xyz/images/Oo6lGQJP/S1PExAcU/qFq5pgbK/83b5009e040969ee7b60362ad7426573-f10.webp?v=1684386360

    fetch("https://static.theshalola.xyz/images/aY4D2A27/HJwiVAJf/J5HLkgcv/bc861de9274a357a18fd9355fb1a8759-f2.webp")
      .then((res) => console.log(res.status))
      .catch((error) => console.log(error))

    console.log("response.status")
    // const stream = new Stream(response)

    // set.headers["Content-Type"] = "video/MP2T"

    // const cacheControl = response.headers.get("Cache-Control")
    // if (cacheControl) set.headers["Cache-Control"] = cacheControl

    // const contentLenght = response.headers.get("Content-Lenght")
    // if (contentLenght) set.headers["Content-Lenght"] = contentLenght

    // return stream
  } catch (error) {
    console.log(error)
    set.status = 404
    return
  }
})

export default imageRoutes
