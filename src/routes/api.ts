import Elysia from "elysia";

import uploadRoutes from "./upload";

import seekable from "./apis/seekable";
import rankings from "./apis/rankings";
import fttpsWebp from "./apis/fttps-webp";
import ajaxLogger from "./apis/ajax-logger";
import requestContent from "./apis/request-content";
import getM3u8Available from "./apis/get-m3u8-available";
import { keyLogger, keysLogger } from "./apis/keys-logger";

const apiRoutes = new Elysia({ prefix: "/api" });

// /seekable
apiRoutes.use(seekable);

// /request-content
apiRoutes.use(requestContent);

// /ajax-logger
apiRoutes.use(ajaxLogger);

// /key-logger
apiRoutes.use(keyLogger);

// /keys-logger
apiRoutes.use(keysLogger);

// d1e715a28fc71e5034c24b3869186d05
// /fttps:webp/:fid
apiRoutes.use(fttpsWebp);

// /get-m3u8-available
apiRoutes.use(getM3u8Available);

apiRoutes.use(rankings);

apiRoutes.use(uploadRoutes);

export default apiRoutes;
