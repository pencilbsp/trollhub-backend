import { novelParser, createEmbedUrl, COMIC_VERSION } from "./utils/fuhu/client"

const TEST_NOVEL_URL = "https://fuhuzz.com/novel-chapter/chuong-1_uzkjjAPe.html"

try {
  const url = createEmbedUrl("uzkjjAPe", COMIC_VERSION)
  const text = await novelParser(url)
} catch (error) {
  console.log(error)
}
