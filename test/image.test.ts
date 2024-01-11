import CryptoJS from "crypto-js"

// // import axios from "axios"

import { decrypt } from "@/utils/fuhu/client"

// // axios({
// //   method: "GET",
// //   url: "https://static.theshalola.xyz/images/aY4D2A27/HJwiVAJf/J5HLkgcv/bc861de9274a357a18fd9355fb1a8759-f2.webp",
// //   params: {
// //     v: "1703225976",
// //   },
// //   headers: {
// //     Referer: "https://idoitmyself.xyz/",
// //   },
// // })
// //   .then((res) => console.log(res.status))
// //   .catch((error) => console.log(error))

let str = "xHpEkdzDY2C_FyFd5Oe5ZM-Iopybt_5ByBxoTClf8JI"
str = str.replaceAll("_", "/").replaceAll("-", "+") + "=="

// // 479a5b259d4f041d
// // b63e541bc9ece19a
// // 4c624d631106e1ca655908d251ea11eb
console.log(decrypt(str, "--KpQG3w0km3imY", "b63e541bc9ece19a"))

// const key = CryptoJS.lib.WordArray.create([1715036464, 859190369, 962881079, 828518400, 0, 0, 0, 0, 0])
// console.log(key.toString(CryptoJS.enc.Utf8))
