import { join } from "path"
// @ts-ignore
import m3u8Parser from "m3u8-parser"

import { STATIC_DIR } from "@/configs"

export default async function replaceRedirectUrl(ws: any, fid: string) {
  try {
    const m3u8Path = join(STATIC_DIR, "m3u8", fid + ".m3u8")
    const file = Bun.file(m3u8Path)

    const m3u8Content = await file.text()
    const parser = new m3u8Parser.Parser()

    parser.push(m3u8Content)
    parser.end()

    const segments = parser.manifest.segments
    const tsList = segments.filter((seg: any) => {
      return seg.uri.includes("tsredirector")
    })
    console.log(tsList)
    ws.send(JSON.stringify({ action: "load_segment", payload: tsList[tsList.length - 1].uri }))
  } catch (error) {
    console.log(error)
  }
}
