import prisma from "./prisma";
import getRedisClient, { RedisClient } from "./redis";

type View = { type: "content" | "chapter"; view: number };

async function getViewKeys(redisClient: RedisClient) {
  let cursor = 0;
  const keys = [];

  do {
    const data = await redisClient.scan(cursor, {
      COUNT: 1000,
      MATCH: "view_*",
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

  if (count) {
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

      // console.log(content);
    }
  }

  await redisClient.del(key);
}

export default async function updateView() {
  const redisClient = await getRedisClient();
  const keys = await getViewKeys(redisClient);

  do {
    try {
      await updateContentView(redisClient, keys[0]);
    } catch (error) {
      console.log(error);
    }

    keys.shift();
  } while (keys.length !== 0);
}
