import { file } from "bun";
// import { existsSync } from "fs";
import { createHash } from "crypto";
import { unlink } from "fs/promises";
import { basename, extname } from "path";

export function calculateSha1(value: Buffer) {
  return createHash("sha1").update(value).digest("hex");
}

type B2Options = {
  keyId: string;
  bucketId?: string;
  apiVersion?: string;
  applicationKey: string;
};

type Authorize = {
  accountId: string;
  apiInfo: {
    storageApi: {
      bucketId: string;
      bucketName: string;
      namePrefix: string | null;
      capabilities:
        | "listKeys"
        | "writeKeys"
        | "deleteKeys"
        | "listBuckets"
        | "writeBuckets"
        | "deleteBuckets"
        | "listFiles"
        | "readFiles"
        | "shareFiles"
        | "writeFiles"
        | "deleteFiles";
      apiUrl: string;
      downloadUrl: string;
      recommendedPartSize: number;
      absoluteMinimumPartSize: number;
      s3ApiUrl: string;
      infoType: string;
    };
  };
  applicationKeyExpirationTimestamp: number | null;
  authorizationToken: string;
};

type UploadUrl = {
  bucketId: string;
  uploadUrl: string;
  authorizationToken: string;
};

type B2File = {
  accountId: string;
  action: string;
  bucketId: string;
  contentLength: number;
  contentMd5: string;
  contentSha1: string;
  contentType: string;
  fileId: string;
  fileInfo: any;
  fileName: string;
  fileRetention: {
    isClientAuthorizedToRead: boolean;
    value: any;
  };
  legalHold: {
    isClientAuthorizedToRead: boolean;
    value: any;
  };
  serverSideEncryption: {
    algorithm: string | null;
    mode: string | null;
  };
  uploadTimestamp: number;
};

export type B2UploadOptions = {
  path?: string;
  bucketId?: string;
  fileName?: string;
  maxTryCount?: number;
  contentType?: string;
  fileExtension?: string;
  deleteAffterUpload?: boolean;
};

export default class B2 {
  apiUrl = "";
  #keyId: string;
  #bucketId?: string;
  #apiVersion: string;
  #apiBaseUrl: string;
  #applicationKey: string;
  #authorizationToken?: string;
  constructor(options: B2Options) {
    this.#keyId = options.keyId;
    this.#bucketId = options.bucketId;
    this.#apiVersion = options.apiVersion || "3";
    this.#applicationKey = options.applicationKey;
    this.#apiBaseUrl = `https://api.backblaze.com/b2api/v${this.#apiVersion}`;
  }

  getToken() {
    return this.#authorizationToken;
  }

  async #isSuccess<T>(response: Response) {
    const data = await response.json();
    if (response.status !== 200) throw new Error(data.message);

    return data as T;
  }

  async authorize() {
    const response = await fetch(this.#apiBaseUrl + "/b2_authorize_account", {
      headers: {
        Authorization: `Basic ${btoa(
          `${this.#keyId}:${this.#applicationKey}`
        )}`,
      },
    });

    const data = await this.#isSuccess<Authorize>(response);

    this.apiUrl = data.apiInfo.storageApi.apiUrl;
    this.#bucketId = data.apiInfo.storageApi.bucketId;
    this.#authorizationToken = data.authorizationToken;

    return data;
  }

  async getUploadUrl(bucketId: string) {
    const response = await fetch(
      this.apiUrl +
        `/b2api/v${this.#apiVersion}/b2_get_upload_url?bucketId=${bucketId}`,
      {
        headers: {
          Authorization: this.#authorizationToken!,
        },
      }
    );

    const data = await this.#isSuccess<UploadUrl>(response);
    return data;
  }

  async uploadFile(
    filePath: string | Buffer,
    options: B2UploadOptions = {},
    tryCount = 0
  ): Promise<B2File> {
    let {
      path,
      fileName,
      contentType,
      fileExtension,
      maxTryCount = 3,
      deleteAffterUpload,
      bucketId = this.#bucketId,
    } = options;

    if (!bucketId) throw new Error("Bucket id is not declared.");

    try {
      let fileSize = 0;
      let buf: Buffer | null = null;
      const isBuffer = Buffer.isBuffer(filePath);

      if (!isBuffer) {
        const f = file(filePath);
        if (!(await f.exists())) {
          throw new Error("File does not exist.");
        }

        const arrBuf = await f.arrayBuffer();
        buf = Buffer.from(arrBuf);
        fileSize = f.size;
        contentType = f.type;
      } else {
        buf = filePath;
        fileSize = buf.byteLength;
      }

      const upload = await this.getUploadUrl(bucketId);

      const oName = isBuffer ? "" : basename(filePath);

      const name = fileName
        ? `${fileName}${fileExtension || extname(oName)}`
        : fileExtension
        ? oName.replace(extname(oName), fileExtension)
        : oName;

      const response = await fetch(upload.uploadUrl, {
        body: buf,
        method: "POST",
        headers: {
          "Content-Type": contentType!,
          "Content-Length": fileSize.toString(),
          "X-Bz-Content-Sha1": calculateSha1(buf),
          Authorization: upload.authorizationToken,
          "X-Bz-File-Name": path ? `${path}/${name!}` : name,
        },
      });

      const data = await this.#isSuccess<B2File>(response);

      if (deleteAffterUpload) {
        try {
          await unlink(filePath);
        } catch (error) {}
      }

      return { ...data, fileName: name };
    } catch (error) {
      tryCount = tryCount + 1;

      if (tryCount <= maxTryCount) {
        return this.uploadFile(filePath, options, tryCount);
      }

      throw error;
    }
  }
}
