import Elysia, { t } from "elysia";

import { hlsLogger } from "@/utils/fuhu/decrypt-hls";
import decryptImages from "@/utils/fuhu/decrypt-images";

// /ajax-logger
export default new Elysia({ prefix: "/ajax-logger" }).post(
  "/",
  async ({ body }) => {
    try {
      console.log(
        "=========================AJAX LOGGER========================="
      );
      console.log("Ajax url:", body.url);

      if (body.type === "comic") {
        await decryptImages(body.fid, body.response);
      }

      if (body.type === "movie" && body.url === "/content/parseUrl") {
        await hlsLogger(body.fid, body.response);
      }

      return { success: true };
      // return { success: true, message: "Logged ajax response successfully" }
    } catch (error: any) {
      // console.log(error)
      return { message: error.message };
    }
  },
  {
    body: t.Object({
      url: t.String(),
      fid: t.String(),
      type: t.String(),
      response: t.Any(),
      contentType: t.String(),
      payload: t.Optional(t.Any()),
    }),
  }
);
