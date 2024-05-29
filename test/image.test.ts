import CryptoJS from "crypto-js"

// // import axios from "axios"

import { decrypt, reversImageUrl } from "@/utils/fuhu/client"

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

let str = "fhU2MNkVJjn1PUkHn4f5lfP7vg22VrKHdJE7gf1ehTmyNbKAUKijvHArIlr3fU2kJlpmGL7O7Y3t-ckeDCuDt3Pa2LmKMyOj9NfE0ESgKRo"
str = str.replaceAll("_", "/").replaceAll("-", "+") + "=="

console.log(str)

// // 479a5b259d4f041d
// // b63e541bc9ece19a
// // 156d31e5152bd2301d976972caa4fcf3
console.log(decrypt(str, "--KpQG3w0km3imY", "00000000000000"))

// const key = CryptoJS.lib.WordArray.create([1715036464, 859190369, 962881079, 828518400, 0, 0, 0, 0, 0])
// console.log(key.toString(CryptoJS.enc.Utf8))

// function filterStringsStartingWithSamePrefix(arr: string[]) {
//   // Sắp xếp mảng để các chuỗi giống nhau nằm cạnh nhau
//   const data = [...arr].map((i) => i.split("/")[4])
//   const data2 = [...data]
//   data2.sort()
//   const startsWiths = [data2[0].slice(0, 10), data2[1].slice(0, 10), data2[data2.length - 1].slice(0, 10)]
//   let ignorePrefix = ""
//   if (startsWiths[0] === startsWiths[1] && startsWiths[0] !== startsWiths[2]) {
//     ignorePrefix = startsWiths[2]
//   } else if (startsWiths[1] === startsWiths[2] && startsWiths[0] !== startsWiths[2]) {
//     ignorePrefix = startsWiths[0]
//   }

//   if (ignorePrefix) {
//     const ignoreUrlIndex = data.findIndex((i) => i.startsWith(ignorePrefix))
//     arr.splice(ignoreUrlIndex, 1)
//   }

//   return arr
// }

// const imageUrls = [
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqqQJIE8lDyu1eo8jDlgfyBOp1AYWqAIGcMvITjYJm59Kggx9mqR7mz8DmKA--XExhFfpZV51IXFgSWL1-5Qa98Y.webp?s=eaa435eeb594b95257ddc50324d07ebe",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5mlxEHDGN7R8SbMKP755-6Zn1cRKfQAUWxV5tUDIp5VPvVPShVYAm6jvTy5PgnPYy6.webp?s=19c91cb107dddb297d543e7b626aa159",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5mWjPANOX-6-5RRvszDPJhX3DlItJj22J2ow83ebWzH6dsbK_KLx4dNczDRFu4zSf3.webp?s=6b7c05c54e04e07aefcdf8b929dfff80",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5mgjihqDoesQ30wbmUTjhA5FnK3IYIb-Hs_QDMk5LbMxA2Wqd5EZQsGOl7BsR-Zk8y.webp?s=9af2f811933471f4afafcb84b1413fa1",
//   "https://static.theshalola.xyz/simages/buy-mlc1lM76SDieQ9bsXXeiO45PQ_aRDSZOUCo9ZqNBPJTF50pVTyqQ_tNpokbUrxg_yJNDCqPeKDy4QkGv6ZB25akfjAIi_MzRpmhG_Dc.webp?s=6fc1480a373682e86780229ae533a8cb",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5m4BZY7KraLJDNzu7Wd4ZYPhI9PYYueaHIObk5e3VZoUJyA7b1ooC2Uc6CQ5gB5P8s.webp?s=b4352bb3199703713d6279b98948d3a2",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5m7XsECQYaAC2hRuNGccMxsm6lgLTEFvFCBJyDnVWnEJersGLazBZnqq81DJ0cDbFT.webp?s=223b0e8c16a37552cbab43d69793b5e0",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5mhgG5fjqR8T3o9TTK5vqSfDm44NFzCUF9uCNUosh-Z0wiHpMlkSg2ex1p5x6z99f4.webp?s=0ef8570e2cd801e82a1df741056cb387",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5mx41OlRlTrKY-R9sDbJrZjoKS1HqzNX2b0tB_gpM0ACiBZO6_8CeNU1EdIpmxeO6s.webp?s=70124f108ba18b60aaa9a491f82cf884",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5mhw-hbQXCgM1-vKKZfxp5HFknXDES6DxhbckkPvfH1kx-qXPA_GExAt3574b-95n8.webp?s=fcda96c76930d9ef6ad9207855f4a28f",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5mZYvTeDT_C0ndr8e4dT1A1kKL8qbG-Z10gGnu6SzGdI-Uk0QUyZchqyNv2YZy2dL0.webp?s=1f12046cac472ba142e38fb4feb80fce",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5mdDeRm_kSsnmXfYKv75Y9WaS8hnpukw5xSJBY8IuwH2TdFP32wUKtC_WtPgdYXRtC.webp?s=aeb03c342f43e69d308f8c95cdb802f2",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5mIW1L4_ej0gii__i314w3N8cisTNuhif8BUa8xqOkQzO0g3rscWGeWTKGQ7nKexeC.webp?s=ae0d2cc6be9468fade9ab0d9d1643cb5",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5m9WOLN2St18P2w-rfKPn5gRbI5sCIN24d9F1WqZqFmdqWcV1fCMHPD1yzPfGhB1eD.webp?s=1c532d527b37f84e77d7de230b8003dc",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5mq0pAaH9yRs8Y6uSeUxcoiPHug5UbNTVLheG-MQpwf6-NpYt95D85mYeRszRIwY0J.webp?s=ba7ef82167b49cd18652caddc6457c0f",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5m-RS7-m4kVMWbNRK22lzkBTDNaB6XMsV8qpz0WP3eXbuitw0lVTuJscoc9SemqaOm.webp?s=8727039f16f748552ecadcfbbad1d3b4",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5m3y3ZcfmkLvr-0oi_Fg_u9O4Tmd5uZvVb9nlt5_kXBlsk93v_1ZUzKRPlsT_1vTdE.webp?s=d82d61188c47420e7b4e0ed380b94932",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5mlb1qZcmKcqW20BjUa8tLgEYUG2K9-PV73siKIHMWZaZOT_ma0wx7jo8fCn5_v6sM.webp?s=dd9ca847422b29b368190316270e4d5b",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5mwi_SLeBzdKUmV6w6Kb_CnI1H1nfXxqldytYI9O1u5Mgk5eN-YyzP7_27Et-8xkt6.webp?s=3522a3efcfaeba1ef51928507c8794c9",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5mR4s6McaeXcNSjPmUmilweatkTucpEq0xdDyErNkEQpmu9RgdFtEjbO9VnwdiF4hf.webp?s=34881f5d8a5c2c587381d5a3677f42a3",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqlGCHZODJefhg9-mwddyyj3tV4DqfAXZ7RFlFKxMBA5mrzfYsdourcZpYcRYn6KUhPBttS4dek8oF41mGAzR8Kbc6Kca09BABcF4V7PvNz26.webp?s=c9c9f53b52c3c45c7cb673d7fcfc7592",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqjZKC-AfdCLrp6RGikOnYCj-_LpdIgHUq6GsGzGvMKV6BbDQVnDmGFRjSZxIVXEq-rttgyCO0aVsLNQWiRHI4-uP4Hq6GLy6xvZrlQxFzKRG.webp?s=8178c175a121825009f0b7dab9558e0f",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqjZKC-AfdCLrp6RGikOnYCj-_LpdIgHUq6GsGzGvMKV6MqCLnQeNiAe4JwjXjxbRXkMAlT4VhdmEn1hLJGdy3XlbhcDKwxZgQn_c2kTlsGqh.webp?s=2e00c15e1ba2a3e29ebff63ca98af3c7",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqjZKC-AfdCLrp6RGikOnYCj-_LpdIgHUq6GsGzGvMKV6XfLLzVGGBwaLCetubvyusQFimfWNL6AgxmvGxGvNjKGdg2fx7jJSJUHdI-1t_-OM.webp?s=995052f263e637074eca2d7570300a31",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqjZKC-AfdCLrp6RGikOnYCj-_LpdIgHUq6GsGzGvMKV6aWZhAPjSUAaFaCXZmjtOqLAAXXqKDdx2lDFsR-38xcIajKhCJvwLhjEwltmt1eXd.webp?s=083e0458a021f6c4ae1979a7af632e1c",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqjZKC-AfdCLrp6RGikOnYCj-_LpdIgHUq6GsGzGvMKV6aeWuHi5IonjKDTzsKwydOQ27JL9MuJoFSGo9XVJi-_ZYwol5cSOxkfSQMznqs-qi.webp?s=9c488a943ce720e4f6334e2c3310cdb4",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqjZKC-AfdCLrp6RGikOnYCj-_LpdIgHUq6GsGzGvMKV6Kk0klEhiLqw59G7RoAckJ3XJ5bhRqVDo_yg2A8Yb6uXbnOpXdLN82ipbhdjSdBhV.webp?s=9325c6d6065b4d6af23021f7a9a9344f",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqjZKC-AfdCLrp6RGikOnYCj-_LpdIgHUq6GsGzGvMKV6xtkrtAoh2oumObmrbyS4XvrXkarY2Zs2rKK8wko3s5sVK-rK_SlODaS2YIjn6rz2.webp?s=18e6e89e3b8c6e6201b33b5d98aee352",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqjZKC-AfdCLrp6RGikOnYCj-_LpdIgHUq6GsGzGvMKV6LeZSScyYe_F7zTpw5VmY7d9iAPVV4oAUy2oKBCn1kb8B3tHRlxoV0RQKP3_-Aag5.webp?s=ebb0c5882e15a001f7691356f2844bf3",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqjZKC-AfdCLrp6RGikOnYCj-_LpdIgHUq6GsGzGvMKV6SgFq1vgWttbBmZXphdi1yZq4I5xhsuLTfHameTTAgecUGPP6JHui7ReCefzxop8X.webp?s=f0b0beaf552825582dd0cadb49ee142d",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqjZKC-AfdCLrp6RGikOnYCj-_LpdIgHUq6GsGzGvMKV6kv2da_1d4KPPILo1IIxLhp1E65phGzfjX6KmPx2ce8DFt7jkbDueieKy14DGx_Vf.webp?s=a43b21d34c0b1a55e93b50695484ef17",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqjZKC-AfdCLrp6RGikOnYCj-_LpdIgHUq6GsGzGvMKV6cL30xUNBh81s3BTrZTJ5nBTz0LAMAL47dxJ6H0qXOLAunEKlnf8O8ucWWeUN8b0_.webp?s=2d4daff26740b32590c7c8f97ee151f9",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqjZKC-AfdCLrp6RGikOnYCj-_LpdIgHUq6GsGzGvMKV6aDgkkxOKGalDnhLCBy-xbe4y97xlk1_vwiSXd2aNU45gWF72sbgbvDoMO_C_Y0yF.webp?s=483a5e931b001da16e4082ef9e02b954",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqjZKC-AfdCLrp6RGikOnYCj-_LpdIgHUq6GsGzGvMKV6gw5y2_7PhzDEu2ZxE6zEJDp4EQgAm_x6Kr7JYKwsGIzNlovYRqZc4dIkTbjAmHGy.webp?s=d3573bf7f5961c9162bfc6829a91ca49",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqjZKC-AfdCLrp6RGikOnYCj-_LpdIgHUq6GsGzGvMKV6ZETDAQ5yQlvJvYu6S3Hcqtj661j_hUqOvMcwlx3qVfLh5gYWYukHO2CAl6fjX73u.webp?s=99ea23c24d51f5be6c7aebc154c4fa43",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqjZKC-AfdCLrp6RGikOnYCj-_LpdIgHUq6GsGzGvMKV67y8yB6dFMdKzk4xq1LcP8XhjxZ-fOizPb4QXqAi19wGyl_V1SydfJJzkSvEE4bCO.webp?s=4c5566877db7e5a33049412fe39389de",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqjZKC-AfdCLrp6RGikOnYCj-_LpdIgHUq6GsGzGvMKV6Sn6kTHhjfgw1EqTvxC6p6aWlzr_EAkefRM4lK2djwrY8SIVqvx5k3Xg11pohX18A.webp?s=298da523140f1002cf752e7b3e789cf4",
//   "https://static.theshalola.xyz/simages/_nQ2N0d1K8S8VDNOt8mQqsZB9w7i8f9RHouOdn05udD-gKpcCKSfikdp_sVvDQeah71kG3WshHWufMsFfiKeq_MshSnF_JjMuVdhbDq3t9Ci5IzkektjlG8Akd0JCcugkIwMZq-sL_cn3GE95lNoKV53RQ4-pDqVnVxz9IEISfA.webp?s=16eded5e8efe3dd180592be0709863ef",
// ]

// console.log(filterStringsStartingWithSamePrefix(imageUrls))
