import Elysia, { t } from "elysia";

import { hexToString } from "@/utils/base64";
import decryptHls from "@/utils/fuhu/decrypt-hls";

// /key-logger
const keyLogger = new Elysia({ prefix: "/key-logger" }).post(
  "/",
  ({ body }) => {
    console.log(
      "=========================CRYPTOJS KEY LOGGER========================="
    );
    console.log("Crypto ciphertext ->", body.ciphertext);
    console.log("Crypto key:iv ->", `${body.key}:${body.iv}`);
    console.log("\n");

    return { success: true };
  },
  {
    body: t.Object({
      iv: t.String(),
      key: t.String(),
      fid: t.String(),
      type: t.String(),
      ciphertext: t.String(),
    }),
  }
);

// /keys-logger
const keysLogger = new Elysia({ prefix: "/keys-logger" }).post(
  "/",
  async ({ body }) => {
    try {
      console.log(
        "=========================CRYPTOJS KEYS LOGGER========================="
      );
      console.log("Crypto keys ->", body.fid, body.keys);

      const keys = Object.keys(body.keys).map((key) => ({
        key: hexToString(key),
        iv: hexToString(body.keys[key]),
      }));

      await decryptHls(body.fid, keys);

      return { success: true, message: "Logged crypto keys successfully" };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },
  {
    body: t.Object({
      fid: t.String(),
      keys: t.Record(t.String(), t.String()),
    }),
  }
);

export { keyLogger, keysLogger };
