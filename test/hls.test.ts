// @ts-ignore
import m3u8Parser from "m3u8-parser"

try {
  const file = Bun.file("/Users/pencil/Developer/trollhub-backend/public/m3u8/CtRkCADC.m3u8")
  const m3u8Content = await file.text()

  const parser = new m3u8Parser.Parser()

  parser.push(m3u8Content)
  parser.end()

  const segments = parser.manifest.segments
  const tsList = segments.filter((seg: any) => {
    // console.log(seg)
    return seg.uri.includes("tsredirector") || seg.uri.includes("/sile/")
  })
  console.log(tsList)
} catch (error) {}
