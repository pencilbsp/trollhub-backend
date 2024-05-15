import { join } from "path";

export const PORT = Number(process.env.PORT || 3001);

export const TARGET_URL = process.env.TARGET_URL!;
export const FUHURIP_SERVER = process.env.FUHURIP_SERVER!;
export const FUHU_IMAGE_HOST = process.env.FUHU_IMAGE_HOST!;

export const REDIS_URL = process.env.REDIS_URL;
export const REDIS_PASS = process.env.REDIS_PASS;
export const REDIS_USER = process.env.REDIS_USER || "default";
export const REDIS_NAMESPACE = process.env.REDIS_NAMESPACE || "";

export const STATIC_DIR = join(process.cwd(), "public");

export const UPDATE_VIEW_CRON = process.env.UPDATE_VIEW_CRON;
