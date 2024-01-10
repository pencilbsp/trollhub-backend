import slug from "slug"

import prisma from "./prisma"
import getCountryCode from "./country-code"
import { extractFuhuContent, extractFuhuCreator, extractFuhuFirstContent } from "./fuhu/dom-extract"

type FirstContents = Awaited<ReturnType<typeof extractFuhuFirstContent>>[]

export default async function upsertContents(contents: FirstContents) {
  for (const { url, type, status, channel } of contents) {
    const fid = url.split("_")[1].split(".")[0]
    let newContent = await prisma.content.findFirst({ where: { fid } })

    const content = await extractFuhuContent(url, type)
    const creator = channel ?? (await extractFuhuCreator(content.creator.url!))
    const country = getCountryCode(content.country)

    const keywords = slug(content.title!, { replacement: " " })

    if (newContent) {
      console.log(" [+] Đang cập nhật nội dung:", content.title)
      await prisma.content.update({
        where: {
          id: newContent.id,
        },
        data: {
          status,
          keywords,
          title: content.title,
          thumbUrl: content.poster,
        },
      })

      console.log(" [+] Đang tìm các chapter mới:", fid, content.title)

      if (Array.isArray(content.chapters) && content.chapters.length > 0) {
        const chaperIds = (
          await prisma.chapter.findMany({
            where: {
              contentId: newContent.id,
            },
            select: { fid: true },
          })
        ).map((e) => e.fid)

        content.chapters = content.chapters.filter(({ fid }) => !chaperIds.includes(fid!))
      }
    } else {
      console.log(" [+] Đang tạo nội dung:", fid, content.title)

      newContent = await prisma.content.create({
        data: {
          fid: content.mid,
          type: content.type,
          keywords: keywords,
          title: content.title!,
          author: content.author,
          thumbUrl: content.poster,
          createdAt: content.releaseDate,
          status: status || content.status,
          description: content.description,
          totalChap: content.totalChap || 0,
          akaTitle: content.akaTitle ? [content.akaTitle] : undefined,
          categories: {
            connectOrCreate: content.categories.map((category) => {
              const create = category
              const where = { slug: category.slug }
              return { create, where }
            }),
          },
          creator: {
            connectOrCreate: {
              where: { userName: creator.userName },
              create: {
                bio: creator.bio,
                fid: creator.fid,
                name: creator.name,
                email: creator.email,
                cover: creator.cover,
                avatar: creator.avatar,
                userName: creator.userName,
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
      })
    }

    if (Array.isArray(content.chapters) && content.chapters.length > 0) {
      console.log(" [+] Đang tạo chapter mới:", fid, content.chapters.length)
      await prisma.content.update({
        where: {
          id: newContent.id,
        },
        data: {
          chapter: {
            createMany: {
              data: content.chapters.map((c) => ({ ...c, creatorId: newContent!.creatorId })),
            },
          },
          updatedAt: new Date(),
        },
      })
    }
  }
}
