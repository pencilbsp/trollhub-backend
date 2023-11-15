import { novelParser, createComicURL } from "./utils/fuhu/client";

const TEST_NOVEL_URL = "https://fuhuzz.com/novel-chapter/chuong-1_uzkjjAPe.html";

try {
  const url = createComicURL("uzkjjAPe");
  const text = await novelParser(url);
} catch (error) {
  console.log(error);
}
