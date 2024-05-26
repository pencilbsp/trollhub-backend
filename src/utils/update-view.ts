import prisma from "./prisma";
import getRedisClient, { RedisClient } from "./redis";

async function getViewKeys(redisClient: RedisClient, match = "view_*") {
  let cursor = 0;
  const keys = [];

  do {
    const data = await redisClient.scan(cursor, {
      COUNT: 1000,
      MATCH: match,
    });

    cursor = data.cursor;
    keys.push(...data.keys);
  } while (cursor !== 0);

  return keys;
}

async function updateContentView(redisClient: RedisClient, key: string) {
  const id = key.split("_")[2];
  const type = key.split("_")[1];

  const count = await redisClient.get(key);

  if (count && id) {
    // @ts-ignore
    let content = await prisma[type].findUnique({
      where: {
        id,
      },
      select: {
        view: true,
        updatedAt: true,
      },
    });

    if (content) {
      // @ts-ignore
      content = await prisma[type].update({
        where: {
          id,
        },
        data: {
          view: {
            increment: Number(count),
          },
          updatedAt: content.updatedAt,
        },
        select: {
          fid: true,
          view: true,
          title: true,
          updatedAt: true,
        },
      });
    }
  }
}

export default async function updateView() {
  const redisClient = await getRedisClient();
  const keys = await getViewKeys(redisClient);

  do {
    try {
      await updateContentView(redisClient, keys[0]);
      await redisClient.del(keys[0]);
    } catch (error) {
      console.warn(keys[0], error);
    }

    keys.shift();
  } while (keys.length !== 0);
}

export async function getContentMostViews(limit = 10) {
  const redisClient = await getRedisClient();
  const keys = await getViewKeys(redisClient, "view_content_*");

  const views: { id: string; view: number }[] = [];

  do {
    try {
      const view = await redisClient.get(keys[0]);
      views.push({ id: keys[0].split("_")[2], view: Number(view) });
    } catch (error) {}

    keys.shift();
  } while (keys.length !== 0);

  return views.sort((a, b) => b.view - a.view).slice(0, 10);
}
