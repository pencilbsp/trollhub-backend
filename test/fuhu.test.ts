import { expect, test } from "bun:test"
import { createEmbedUrl, comicParser, COMIC_VERSION } from "../src/utils/fuhu/client"
import { extractFuhuContent, extractFuhuCreator } from "../src/utils/fuhu/dom-extract"
import extractVideo from "../src/utils/fuhu/video"

// https://fuhuzz.com/comic-chapter/nhan-vat-phan-dien-nay-co-chut-luong-tam-nhung-khong-nhieu-chapter-183_A0MmlQgV.html
const TEST_COMIC_ID = "H9GoGgK5"
const TEST_VIDEO_ID = "opD7YQ0e"
const TEST_CHANNEL_URL = "https://fuhuzz.net/channel/truyen30s"
const TEST_NOVEL_URL = "https://fuhuzz.net/novel-chapter/chuong-1_uzkjjAPe.html"
const TEST_URL = "https://fuhuzz.net/movie/nang-hau-an-danh-2023-sao-chai-delivery_gywN6grP.html"

// test("Extract Fuhu Content", async () => {
//   const content = await extractFuhuContent(TEST_URL, "movie")
//   expect(content.title).toBeString()
//   expect(content.poster).toBeString()
//   expect(content.status).toBeString()
//   expect(content.creator).toHaveProperty("name")
//   expect(content.chapters).toBeArray()
// })

// test("Extract Fuhu Video", async () => {
//   const m3u8 = await extractVideo("vwWKAQjj")
//   console.log(m3u8)
//   expect(m3u8).toBeString()
// }, { timeout: 60000 })

// test("Extract Fuhu Creator", async () => {
//   const creator = await extractFuhuCreator(TEST_CHANNEL_URL)
//   expect(creator.cname).toBeString()
//   expect(creator.cover).toBeString()
// })

test("Decrypt Fuhu Comic", async () => {
  const comicUrl = createEmbedUrl(TEST_COMIC_ID, COMIC_VERSION)
  expect(comicUrl).toBeString()
  const imageUrls = await comicParser(comicUrl)
  expect(imageUrls).toBeArray()
})
