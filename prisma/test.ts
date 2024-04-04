// import jsdom from "jsdom";
// import { ContentStatus, ContentType } from "@prisma/client";

import prisma from "@/utils/prisma";
import { insertContent } from "./seed";

// const { JSDOM } = jsdom;
// const { TARGET_URL, FUHU_COOKIE } = process.env;
// const categories = require("./categories.json");

// const headers = new Headers({
//   Cookie: FUHU_COOKIE!,
// });

// type Content = {
//   url: string;
//   title: string;
//   type: ContentType;
//   status: ContentStatus;
// };

// async function loadDiscoverContent(categoryPath: string, idx: number) {
//   const contents: Content[] = [];

//   const genre = categoryPath.split("_")[1].split(".")[0];
//   const url = TARGET_URL + "/content/LoadDiscoverContents?";
//   const params = new URLSearchParams({
//     idx: idx.toString(),
//     genre,
//     nsfw: "true",
//   });

//   const response = await fetch(url + params.toString(), { headers });
//   const data = await response.json();
//   if (!data.result) {
//     console.log(categoryPath, "Đã lấy hết tất cả nội dung.");
//     return contents;
//   }

//   const dom = new JSDOM(data.result);

//   // @ts-ignore
//   const discoverItemElms: HTMLAllCollection = dom.window.document.querySelectorAll(".discover-item");
//   if (discoverItemElms.length === 0) {
//     console.log(categoryPath, "Không tìm thấy nội dung nào.");
//     return contents;
//   }

//   for (const item of Array.from(discoverItemElms)) {
//     const typeClass = item.querySelector(".item-type>i")?.classList;
//     const linkElm: HTMLLinkElement | null = item.querySelector(".discover-item__title>a");
//     const statusElm = item.querySelector(".discover-item__badge-item.status");
//     const url = linkElm?.href || "";
//     const title = linkElm?.textContent || "";
//     const type = typeClass?.contains("fa-book-open")
//       ? ContentType.novel
//       : typeClass?.contains("fa-images")
//       ? ContentType.comic
//       : ContentType.movie;

//     const status = statusElm?.classList.contains("complete") ? ContentStatus.complete : ContentStatus.updating;
//     console.log({ title, url, type, status });

//     contents.push({ title, url, type, status });
//   }

//   return contents;
// }

// try {
//   await loadDiscoverContent("https://fuhuzz.com/the-loai/doujinshi_fh-doujinshi.html", 0);
// } catch (error) {
//   console.log(error);
// }


// const categories = await prisma.category.count({ select: { title: true } })
// console.log(categories)


await insertContent("https://fuhuvv.net/novel/xin-chao-doi-tac-chien-huu-nguoi-yeu_HqhSYwO7.html", 'novel', 'updating')
