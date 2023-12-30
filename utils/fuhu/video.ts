import wsMessageKey from "./ws-key"
import {
  hlsKey,
  decrypt,
  encrypt,
  USER_AGENT,
  WEB_SECRET_IV,
  WEB_SECRET_KEY,
  createEmbedUrl,
  makeHlsPlaylist,
} from "./client"

const VALID_PLAYER_INIT = /new\sClassicPlayer.*?({[\s\w\n!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+})\)\).run\(\)/

const base64Decode = (value: string) => Buffer.from(value, "base64").toString()

async function tracking(type: string, payload: any) {
  const origin = new URL(payload.src).origin
  const query = new URLSearchParams({ type, ...payload })
  await fetch(origin + "/detail/tracking?" + query.toString(), {
    headers: {
      Referer: payload.src,
      "User-Agent": USER_AGENT,
      "Sec-Fetch-Dest": "image",
    },
  })
}

export default async function extractVideo(fid: string) {
  const url = createEmbedUrl(fid)
  let response = await fetch(url, { headers: { "User-Agent": USER_AGENT } })
  if (!response.ok) throw new Error("Faild to fetch")

  const body = await response.text()
  const playerInit = body.match(VALID_PLAYER_INIT)?.[1]
  const playerData = eval(`(${playerInit})`)

  const payload = new URLSearchParams({
    url: playerData.urls[0].url,
    bk_url: playerData.urls[0].burl,
    pr_url: playerData.urls[0].purl,
  })

  payload.append("ex_hls[]", playerData.urls[0].exhls[0])
  payload.append("ex_hls[]", playerData.urls[0].exhls[1])
  payload.append("v", "2")
  payload.append("len", "0")
  payload.append("prefer", "")
  payload.append("ts", Date.now().toString())
  payload.append("item_id", playerData.item.id)
  payload.append("username", playerData.item.uname)
  payload.append("test_mode", "false")
  payload.append("restrict", "true")
  payload.append("support", "true")
  payload.append("sig", playerData.urls[0].sig)

  const origin = new URL(url).origin

  response = await fetch(origin + "/content/parseUrl", {
    method: "POST",
    body: payload.toString(),
    headers: {
      Referer: url,
      Origin: origin,
      "User-Agent": USER_AGENT,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  })

  const parseData = await response.json()

  const { marker, s, seg } = parseData.formats.enc
  const wsUrl = decrypt(s, WEB_SECRET_KEY, WEB_SECRET_IV)
  const keyZero = await wsMessageKey(wsUrl, marker)
  const keys = [keyZero]

  const segments = []
  let currentTime = 0
  /**
   * Xử lý segment list (seg)
   * - Mỗi segment là một mảng có 3 giá trị
   * + segment[0] là thời lượng (duration) được mã hoá bằng keyZero
   * + segment[1] là uri của segment được mã hoá 2 lần:
   *   Lần thứ nhất được mã hoá bằng private key (1)
   *   Lần thứ hai được mã hoá bằng public key (2)
   * + segment[2] thứ tự private key được sử dụng
   */
  for (const line of seg) {
    // End
    if (line[0] === "raw") continue

    // Key
    const isKey = line[0] === "key"

    if (isKey) {
      const hlsKeyBase64 = base64Decode(line[1])
      const execResult = /URI="(?<hlsKey>.*?)",IV=(?<hlsIv>.*?)$/.exec(hlsKeyBase64)
      if (!execResult?.groups || !execResult.groups.hlsIv || !execResult.groups.hlsKey) throw new Error("")

      const hlsIv = decrypt(execResult.groups.hlsIv, keys[0].key, keys[0].iv)
      const hlsKeyMessage = decrypt(execResult.groups.hlsKey, keys[0].key, keys[0].iv).split("#")[1]
      const result = await wsMessageKey(wsUrl, hlsKeyMessage)
      const uri = hlsKey(result.key)

      segments.push({ uri, iv: hlsIv, isKey })
      continue
    }

    let key = keys[line[2] - 1]
    if (!key) {
      const to = currentTime + 10
      await tracking("player_seek", {
        id: playerData.item.id,
        m: marker,
        src: url,
        to: encrypt(encrypt(to.toString(), keys[0].key, keys[0].iv), WEB_SECRET_KEY, WEB_SECRET_IV),
      })

      const message = `p|${line[2]}|${to}`
      const newKey = await wsMessageKey(wsUrl, message)
      key = newKey
      keys.push(newKey)
    }

    const duration = decrypt(line[0], keys[0].key, keys[0].iv)
    const uri = decrypt(decrypt(line[1], key.key, key.iv), WEB_SECRET_KEY, WEB_SECRET_IV)

    segments.push({ duration, uri, isKey })
    currentTime += parseInt(duration)
  }

  return makeHlsPlaylist(segments as any)
}
