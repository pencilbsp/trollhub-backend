import jsdom from "jsdom";
import { ContentType } from "@prisma/client";

import prisma from "../utils/prisma";
import getCountryCode from "../utils/country-code";
import { extractFuhuContent, extractFuhuCreator } from "../utils/fuhu/dom-extract";

const { JSDOM } = jsdom;
const { TARGET_URL } = process.env;
const categories = require("./categories.json");

type Content = {
  url: string;
  title: string;
  type: ContentType;
};

async function loadDiscoverContent(categoryPath: string, idx: number) {
  const contents: Content[] = [];

  const genre = categoryPath.split("_")[1].split(".")[0];
  const url = TARGET_URL + "/content/LoadDiscoverContents?";
  const params = new URLSearchParams({
    idx: idx.toString(),
    genre,
    nsfw: "false",
  });

  const response = await fetch(url + params.toString());
  const data = await response.json();
  if (!data.result) {
    console.log(categoryPath, "Đã lấy hết tất cả nội dung.");
    return contents;
  }

  const dom = new JSDOM(data.result);

  // @ts-ignore
  const discoverItemElms: HTMLAllCollection = dom.window.document.querySelectorAll(".discover-item");
  if (discoverItemElms.length === 0) {
    console.log(categoryPath, "Không tìm thấy nội dung nào.");
    return contents;
  }

  for (const item of Array.from(discoverItemElms)) {
    const typeClass = item.querySelector(".item-type>i")?.classList;
    const linkElm: HTMLLinkElement | null = item.querySelector(".discover-item__title>a");
    const url = linkElm?.href || "";
    const title = linkElm?.textContent || "";
    const type = typeClass?.contains("fa-book-open")
      ? ContentType.novel
      : typeClass?.contains("fa-images")
      ? ContentType.comic
      : ContentType.movie;

    await insertContent(url, type);
    contents.push({ title, url, type });
  }

  return contents;
}

async function loadDiscoverContents(categoryPath: string) {
  let index = 0;
  let latestCount = 10;

  while (latestCount !== 0) {
    const result = await loadDiscoverContent(categoryPath, index);
    latestCount = result.length;
    index += 10;
  }
}

async function insertContent(url: string, type: ContentType) {
  try {
    const fid = url.split("_")[1].split(".")[0];
    const isExistsContent = await prisma.content.findFirst({ where: { fid } });
    if (isExistsContent) return;

    const content = await extractFuhuContent(url, type);
    const creator = await extractFuhuCreator(content.creator.url!);
    const country = getCountryCode(content.country);

    console.log("[+] Đang tạo nội dung:", content.title);

    const newContent = await prisma.content.create({
      data: {
        fid: content.mid,
        type: content.type,
        title: content.title!,
        author: content.author,
        status: content.status,
        thumbUrl: content.poster,
        createdAt: content.releaseDate,
        description: content.description,
        totalChap: content.totalChap || 0,
        akaTitle: content.akaTitle ? [content.akaTitle] : undefined,
        categories: {
          connectOrCreate: content.categories.map((category) => {
            const create = category;
            const where = { slug: category.slug };
            return { create, where };
          }),
        },
        creator: {
          connectOrCreate: {
            where: { email: creator.email },
            create: {
              bio: creator.bio,
              cover: creator.cover,
              email: creator.email,
              avatar: creator.avatar,
              userName: creator.cname!,
              fid: content.creator.fid,
              name: content.creator.name!,
            },
          },
        },
        countries: country
          ? {
              connectOrCreate: {
                where: { code: country[3] },
                create: {
                  name: country[1],
                  code: country[3],
                },
              },
            }
          : undefined,
      },
    });

    if (Array.isArray(content.chapters) && content.chapters.length > 0) {
      await prisma.content.update({
        where: {
          id: newContent.id,
        },
        data: {
          chapter: {
            createMany: {
              data: content.chapters.map((c) => ({ ...c, creatorId: newContent.creatorId })),
            },
          },
        },
      });
    }
  } catch (error) {
    console.log(url, error);
  }
}

try {
  for (const categoryPath of categories) {
    await loadDiscoverContents(categoryPath);
  }

  // const content = await extractFuhuContent(
  //   "https://fuhuzz.com/comic/nhan-vat-phan-dien-nay-co-chut-luong-tam-nhung-khong-nhieu_DrWgPwIB.html",
  //   ContentType.comic
  // );

  // console.log(content.chapters);
} catch (error) {
  console.log(error);
}
