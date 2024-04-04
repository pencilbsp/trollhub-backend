import jsdom from "jsdom"
import { parse } from "date-fns"
import { ContentStatus, ContentType, Creator } from "@prisma/client"
import { TARGET_URL } from "@/configs"

const { JSDOM } = jsdom

type Chapter = {
  fid?: string
  title?: string
  createdAt: Date
  type: ContentType
  mobileOnly: boolean
}

const BASE_FUHU_URL = TARGET_URL
const DEFAULT_STATUS = ["Đang cập nhật", "Đang xuất bản"]
const INFO_SELECTOR = "body > div.detail-container.container.mt60 > div > div.col-sm-8 > div.row.mt10"

export function findByTextContent(root: Element | null, texts: string[]) {
  return Array.from(root?.children || []).find(
    (elm) => texts.filter((text) => elm.textContent?.includes(text)).length > 0
  )
}

function decodeEmail(href: string) {
  try {
    let o = ""
    const l = "/cdn-cgi/l/email-protection#"
    const c = href.indexOf(l) + l.length
    const r = (e: string, t: number) => parseInt(e.substr(t, 2), 16)

    for (let a = r(href, c), i = c + 2; i < href.length; i += 2) {
      const l = r(href, i) ^ a
      o += String.fromCharCode(l)
    }

    o = decodeURIComponent(escape(o))
    return o
  } catch (u) {
    return ""
  }
}

export const extractFuhuCreator = async (url: string, headers?: Headers) => {
  if (!url.startsWith("http")) url = BASE_FUHU_URL + url

  const response = await fetch(url, { headers })
  const bodyString = await response.text()
  const dom = new JSDOM(bodyString)

  const profileElm = dom.window.document.querySelector(".channel-profile__header")
  if (!profileElm) throw new Error("")

  const contactElm = findByTextContent(profileElm, ["Liên hệ"])
  const email = decodeEmail(BASE_FUHU_URL + contactElm?.querySelector("a")?.href)

  const bio = profileElm.querySelector(".channel-profile__bio")?.textContent
  const cname = profileElm.querySelector(".channel-profile__meta>span")?.textContent as string
  const coverElm = dom.window.document.querySelector(".channel-profile__cover")
  const thumbElm = dom.window.document.querySelector(".channel-profile__thumb>div")
  const name = profileElm.querySelector("h1.channel-profile__title")?.textContent as string

  let fid
  const subscribeBtn = profileElm.querySelector(".channel-profile__action-btn.subscribe-btn")
  if (subscribeBtn) fid = subscribeBtn.getAttribute("data-id")

  const cover = coverElm?.getAttribute("data-original")
  const avatar = thumbElm?.getAttribute("data-original")

  return { bio: bio?.trim(), userName: cname, email: email || cname.substring(1) + "@fuhuzz.rip", name, cover, avatar, fid }
}

export function extractFuhuFirstContent(contentElm: Element, channel?: Creator, gird?: boolean) {
  const typeClass = contentElm.querySelector(".item-type>i")?.classList
  const linkElm: HTMLLinkElement | null = contentElm.querySelector(
    gird ? "h3.grid-item__title>a" : ".discover-item__title>a"
  )

  const statusElm = contentElm.querySelector(
    gird ? ".grid-item__badge-item.status" : ".discover-item__badge-item.status"
  )

  const url = linkElm?.href || ""
  const title = linkElm?.textContent || ""
  const type = typeClass?.contains("fa-book-open")
    ? ContentType.novel
    : typeClass?.contains("fa-images")
      ? ContentType.comic
      : ContentType.movie

  const status = statusElm?.classList.contains("complete") ? ContentStatus.complete : ContentStatus.updating

  return { url, title, type, status, channel }
}

export const extractFuhuContent = async (url: string, type: ContentType, headers?: Headers) => {
  const mid = url.split("_")[1].split(".")[0]
  let response = await fetch(url, { headers })

  const bodyString = await response.text()
  const dom = new JSDOM(bodyString)
  const infoElm = dom.window.document.querySelector(INFO_SELECTOR)
  if (!infoElm) throw new Error("Có lỗi xảy ra khi phân tích cũ pháp HTML")

  const title = infoElm.querySelector("h1")?.textContent?.trim()
  const akaTitle = infoElm.querySelector("h2")?.textContent?.trim()
  const poster = (
    infoElm.querySelector("img.img-responsive") ?? infoElm.querySelector("div.detail-item-thumb")
  )?.getAttribute("data-original")
  const status = infoElm.querySelector("span.text-success")?.textContent?.trim() || DEFAULT_STATUS[0]

  const description = dom.window.document
    .querySelector(".item-description")
    ?.textContent?.replace(/(?:\\n|\\t|\s\s+)+/g, "")
  const authorElm = findByTextContent(infoElm.querySelector(".item-meta"), ["Tác giả", "Author"])
  const categoryElm = findByTextContent(infoElm.querySelector(".item-meta"), ["Thể loại", "Genre"])
  const chapterLengthElm = findByTextContent(infoElm.querySelector(".item-meta"), ["Số chương", "Số tập"])
  const countryElm = findByTextContent(infoElm.querySelector(".item-meta"), ["Nước sản xuất"])
  const releaseDateElm = findByTextContent(infoElm.querySelector(".item-meta"), ["Ngày phát hành"])
  const chapterDurationElm = findByTextContent(infoElm.querySelector(".item-meta"), ["Độ dài tập phim"])

  const author = authorElm?.children[1].textContent?.trim()
  const country = countryElm?.children[1].textContent?.trim()

  const chapterDuration = chapterDurationElm?.children[1].textContent?.trim()
  const totalChap = Number(chapterLengthElm?.children[1].textContent?.trim() || 0)

  let releaseDate = new Date()
  const releaseDateString = releaseDateElm?.children[1].textContent?.trim()
  if (releaseDateString) releaseDate = parse(releaseDateString, "dd/MM/yyyy", releaseDate)

  const categories = Array.from(categoryElm?.querySelectorAll("a") || []).map((a) => {
    const slug = a.href.split("_")[1].split(".")[0]
    const title = a.textContent?.trim()!
    return { slug, title }
  })

  const creatorElm = dom.window.document.querySelector(".creator-item__name")
  const creatorUrl = creatorElm?.querySelector("a")?.href
  const creatorName = creatorElm?.querySelector("b")?.textContent
  const creatorIdElm = dom.window.document.querySelector(".creator-item__follow-btn")

  const cid = creatorIdElm?.getAttribute("data-id")
  const creator = { fid: cid, url: creatorUrl, name: creatorName }

  // https://fuhuzz.com/content/subitems?mid=Jmc5FwEM&type=all_json&host=fuhuzz.com
  response = await fetch(
    BASE_FUHU_URL +
    "/content/subitems?" +
    new URLSearchParams({
      mid: mid,
      type: "all_json",
      host: new URL(BASE_FUHU_URL).hostname,
    }),
    {
      headers,
    }
  )

  const subitems = await response.json()
  const chapters: Chapter[] = subitems.data?.e.map((e: any) => ({
    fid: e[0],
    title: e[2],
    type: type,
    createdAt: parse(e[4], "dd/MM/yyyy HH:mm", new Date()),
    mobileOnly: e[6] === 1,
  }))
  return {
    mid,
    type,
    title,
    poster,
    status: DEFAULT_STATUS.includes(status) ? ContentStatus.updating : ContentStatus.complete,
    author,
    creator,
    country,
    akaTitle,
    chapters,
    totalChap,
    categories,
    description,
    releaseDate,
    chapterDuration,
  }
}
