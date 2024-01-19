import { join } from "path"

import { decode } from "../base64"
import { STATIC_DIR } from "@/configs"
import { decrypt, makeHlsPlaylist } from "./client"

type HlsFormat = {
  enc: {
    meta: string
    v: number
    marker: string
    s: string
    seg: string[][]
  }
}

type AjaxVideoResponse = {
  state: string
  data: {
    hls: boolean
    cb: string
    formats: HlsFormat
    method: string
    type: string
    self_stream: boolean
    ended: any[]
    sig: string
    cdn: string
    error: number
    error_msg?: string
  }
}

type Key = { key: string; iv: string }

export default async function decryptHls(fid: string, keys: Key[]) {
  const file = Bun.file(join(STATIC_DIR, "hls-logger", fid + ".json"))
  const formats: HlsFormat = await file.json()

  const segments = []
  for (const line of formats.enc.seg) {
    // End
    if (line[0] === "raw") continue

    // Key
    const isKey = line[0] === "key"

    if (isKey) {
      const hlsKeyBase64 = decode(line[1])
      const execResult = /URI="(?<hlsKey>.*?)",IV=(?<hlsIv>.*?)$/.exec(hlsKeyBase64)
      if (!execResult?.groups || !execResult.groups.hlsIv || !execResult.groups.hlsKey) throw new Error("")

      const hlsIv = decrypt(execResult.groups.hlsIv, keys[2].key, keys[2].iv)
      const hlsKeyMessage = decrypt(execResult.groups.hlsKey, keys[2].key, keys[2].iv).split("#")[1]

      segments.push({ uri: hlsKeyMessage, iv: hlsIv, isKey: true })
      continue
    }

    const duration = decrypt(line[0], keys[1].key, keys[1].iv)
    const uri = decrypt(decrypt(line[1], keys[1].key, keys[1].iv), keys[2].key, keys[2].iv)

    segments.push({ duration, uri, isKey: false })
  }

  const filePath = join(STATIC_DIR, "m3u8", fid + ".m3u8")
  await Bun.write(filePath, makeHlsPlaylist(segments as any))
}

export async function hlsLogger(fid: string, { data }: AjaxVideoResponse) {
  if (data.error !== 0) throw new Error(data.error_msg)

  const filePath = join(STATIC_DIR, "hls-logger", fid + ".json")
  await Bun.write(filePath, JSON.stringify(data.formats))
  console.log(`[+] ${fid} -> Đã lưu thành công dữ liệu video`)
}
