import { expect, test } from "bun:test";
import { createComicURL, comicParser } from "../utils/fuhu/client";
import { extractFuhuContent, extractFuhuCreator } from "../utils/fuhu/dom-extract";

// https://fuhuzz.com/comic-chapter/nhan-vat-phan-dien-nay-co-chut-luong-tam-nhung-khong-nhieu-chapter-183_A0MmlQgV.html
const TEST_COMIC_ID = "A0MmlQgV";
const TEST_CHANNEL_URL = "https://fuhuzz.com/channel/truyen30s";
const TEST_URL = "https://fuhuzz.com/movie/nang-hau-an-danh-2023-sao-chai-delivery_gywN6grP.html";

test("Extract Fuhu Content", async () => {
  const content = await extractFuhuContent(TEST_URL);
  expect(content.title).toBeString();
  expect(content.poster).toBeString();
  expect(content.status).toBeString();
  expect(content.creator).toHaveProperty("name");
  expect(content.chapters).toBeArray();
});

test("Extract Fuhu Creator", async () => {
  const creator = await extractFuhuCreator(TEST_CHANNEL_URL);
  expect(creator.cname).toBeString();
  expect(creator.cover).toBeString();
});

test("Decrypt Fuhu Comic", async () => {
  const comicUrl = createComicURL(TEST_COMIC_ID);
  expect(comicUrl).toBeString();
  const imageUrls = await comicParser(comicUrl);
  expect(imageUrls).toBeArray();
});
