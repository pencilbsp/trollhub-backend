import { Elysia } from "elysia"

import replaceRedirectUrl from "@/utils/replace-redirect-url"

const webSocket = new Elysia().ws("/ws", {
  message(ws, message: any) {
    const { action, payload } = message
    console.log(`Client ${ws.id} send action: ${action}, payload: ${payload}`)

    if (action === "ping") ws.send(JSON.stringify({ action: "alert", payload: "pong" }))
    if (action === "start" && payload) replaceRedirectUrl(ws, payload)
  },
  close(ws, code, message) {
    console.log("A client disconnected!")
  },
  open(ws) {
    console.log("A client connected!")
    // @ts-ignore
    globalThis.ws = ws
  },
})

export default webSocket
