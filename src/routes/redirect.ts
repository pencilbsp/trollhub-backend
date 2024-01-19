import Elysia from "elysia"

const redirectRoute = new Elysia({ prefix: "/redirector" })

redirectRoute.get("/", ({ query, set }) => {
  const uri = query.uri
  // @ts-ignore
  if (globalThis.ws) {
    // @ts-ignore
    console.log(globalThis.ws)
    // @ts-ignore
    globalThis.ws.send(uri)
  }
  set.redirect = uri
})

export default redirectRoute
