if (!window.inject1) {
  window.inject1 = setInterval(() => {
    if (typeof ComicViewer !== "undefined") {
      clearInterval(window.inject1)
      const loadImages = ComicViewer.prototype.loadImages
      ComicViewer.prototype.loadImages = function () {
        loadImages.apply(this, arguments)
        uploadImages(window.keys, arguments[0])
      }
    }
  }, 100)
}

if (!window.inject2) {
  window.inject2 = setInterval(() => {
    if (typeof CryptoJS !== "undefined") {
      clearInterval(window.inject2)
      window.keys = {}
      const decrypt = CryptoJS.AES.decrypt

      CryptoJS.AES.decrypt = function () {
        const keyWordArray = CryptoJS.lib.WordArray.create(arguments[1].words)
        const key = keyWordArray.toString(CryptoJS.enc.Utf8)

        const ivWordArray = CryptoJS.lib.WordArray.create(arguments[2].iv.words)
        const iv = ivWordArray.toString(CryptoJS.enc.Utf8)

        window.keys[key] = iv
        return decrypt.apply(this, arguments)
      }
    }
  }, 100)
}

async function logger(data) {
  await fetch("https://usercontents.fuhuzz.rip/api/logger", {
    method: "POST",
    body: JSON.stringify({
      data: data,
      url: window.location.href,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

async function uploadImages(keys, data) {
  const response = await fetch("https://usercontents.fuhuzz.rip/upload/images", {
    method: "POST",
    body: JSON.stringify({
      keys: keys,
      data: data,
      url: window.location.href,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const result = await response.json()
  alert(result.message)
}
