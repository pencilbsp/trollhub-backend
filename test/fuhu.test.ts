import { expect, test } from "bun:test";
import {
  createEmbedUrl,
  comicParser,
  COMIC_VERSION,
  decrypt,
} from "../src/utils/fuhu/client";
import {
  extractFuhuContent,
  extractFuhuCreator,
} from "../src/utils/fuhu/dom-extract";
import extractVideo from "../src/utils/fuhu/video";
import prisma from "@/utils/prisma";
import { ChapterStatus } from "@prisma/client";
import { FUHURIP_SERVER } from "@/configs";

// https://fuhuzz.com/comic-chapter/nhan-vat-phan-dien-nay-co-chut-luong-tam-nhung-khong-nhieu-chapter-183_A0MmlQgV.html
const TEST_COMIC_ID = "HR7rCwyg";
const TEST_VIDEO_ID = "opD7YQ0e";
const TEST_CHANNEL_URL = "https://fuhuzz.net/channel/truyen30s";
const TEST_NOVEL_URL =
  "https://fuhuzz.net/novel-chapter/chuong-1_uzkjjAPe.html";
const TEST_URL =
  "https://fuhuzz.net/movie/nang-hau-an-danh-2023-sao-chai-delivery_gywN6grP.html";
const TEST_EMBED_URL =
  "https://idoitmyself.xyz/embed/TgBQCKyeIryDaFsHAJJmfCLKKscuXlsJFPqkcVyLoJnPuZYOwTf0kfFE0wIdzMC8wLtam5BwLvX_4VBaYN5AxQ";

// test("Extract Embed Data", () => {
//   const path = TEST_EMBED_URL.split("/embed/")[1]
//   const payload = path.replaceAll("_", "/").replaceAll("-", "+") + "="
//   const data = decrypt(payload, "--KpQG3w0km3imY", "b63e541bc9ece19a")
//   console.log(data)
// })

// test("Extract Fuhu Content", async () => {
//   const content = await extractFuhuContent(TEST_URL, "movie")
//   expect(content.title).toBeString()
//   expect(content.poster).toBeString()
//   expect(content.status).toBeString()
//   expect(content.creator).toHaveProperty("name")
//   expect(content.chapters).toBeArray()
// })

test(
  "Extract Fuhu Video",
  async () => {
    const fid = "K2BTOAWw";
    const m3u8Content = await extractVideo(fid);

    const chapter = await prisma.chapter.update({
      where: {
        fid: fid,
      },
      data: { status: ChapterStatus.ready },
    });

    await fetch(`${FUHURIP_SERVER}/upload/m3u8`, {
      method: "POST",
      body: JSON.stringify({
        id: chapter.id,
        content: m3u8Content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(m3u8Content).toBeString();
  },
  { timeout: 60000 }
);

// test("Extract Fuhu Creator", async () => {
//   const creator = await extractFuhuCreator(TEST_CHANNEL_URL)
//   expect(creator.cname).toBeString()
//   expect(creator.cover).toBeString()
// })

// test("Decrypt Fuhu Comic", async () => {
//   const comicUrl = createEmbedUrl(TEST_COMIC_ID, COMIC_VERSION)
//   expect(comicUrl).toBeString()
//   const imageUrls = await comicParser(comicUrl)
//   expect(imageUrls).toBeArray()
// })
