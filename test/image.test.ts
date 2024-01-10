// import axios from "axios"

import { decrypt } from "@/utils/fuhu/client"

// axios({
//   method: "GET",
//   url: "https://static.theshalola.xyz/images/aY4D2A27/HJwiVAJf/J5HLkgcv/bc861de9274a357a18fd9355fb1a8759-f2.webp",
//   params: {
//     v: "1703225976",
//   },
//   headers: {
//     Referer: "https://idoitmyself.xyz/",
//   },
// })
//   .then((res) => console.log(res.status))
//   .catch((error) => console.log(error))

let str =
  "03NIk6LeDGxnLmd5LNJ0FFXYCQjfQztsqaVc-WmksvRNF8xlPDJsP0MNWzGbK3FNmrsXNWTdJ9ZaU-I6nepBbQ"
str = str.replaceAll("_", "/").replaceAll("-", "+") + "=="

// 479a5b259d4f041d
// b63e541bc9ece19a
// 855376816e8fae9aaf66b1a86da8b094
console.log(str)
console.log(decrypt(str, "--KpQG3w0km3imY", "b63e541bc9ece19a"))
