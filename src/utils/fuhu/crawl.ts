import { JSDOM } from "jsdom"
import { TARGET_URL } from "@/configs"
import { Creator } from "@prisma/client"
import { extractFuhuFirstContent } from "./dom-extract"

export async function getChannelContents(url: string, channel?: Creator, options?: FetchRequestInit) {
  const response = await fetch(url, options)
  if (!response.ok) throw new Error(`Failed to fetch with status ${response.statusText}`)

  const bodyString = await response.text()
  const {
    window: { document },
  } = new JSDOM(bodyString)

  let idx = document.getElementById("loadContent")?.dataset.idx
  const id = document.querySelector("div.channel-profile__action-btn.subscribe-btn")?.getAttribute("data-id")

  if (!idx || !id) throw new Error("Không tìm thấy dữ liệu các nội dung")

  let hasMore = true
  const results: string[] = []

  const fetchContents = async (idx: string, id: string): Promise<string> => {
    const query = new URLSearchParams({
      type: "latest",
      idx: idx,
      id: id,
      num: "6",
      grid: "true",
    })

    const response = await fetch(`${TARGET_URL}/content/loadChannelContent?${query.toString()}`)
    if (!response.ok) throw new Error(`Failed to fetch with status ${response.statusText}`)

    const data = await response.json()
    if (data.error !== 0) throw new Error(data.error_msg)

    if (!data.result) hasMore = false
    else results.push(data.result)

    return data.idx?.toString() ?? ""
  }

  while (hasMore) idx = await fetchContents(idx, id)

  document.body.innerHTML = results.join("")

  return Array.from(document.body.children).map((elm) => extractFuhuFirstContent(elm, channel, true))
}
