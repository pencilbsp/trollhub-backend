if (window.socket)
  _0x46f4e5.toBlob(
    async function (blob) {
      try {
        const urlArray = new TextEncoder().encode(_0x22fceb.src)
        const combinedData = new Uint8Array(4 + urlArray.length + blob.size)

        combinedData.set(new Uint8Array(new Uint32Array([urlArray.length]).buffer), 0)
        combinedData.set(urlArray, 4)
        const imageBuffer = await blobToUint8Array(blob)
        combinedData.set(imageBuffer, 4 + urlArray.length)
        window.socket.send(combinedData)
      } catch (error) {
        alert(error.message)
      }
    },
    "image/webp",
    1
  )

if (typeof WebSocket !== "undefined") {
  window.socket = new WebSocket(`wss://eel-moral-ape.ngrok-free.app/ws`, window.location.href)

  window.socket.addEventListener("message", (event) => {
    const { action, payload } = JSON.parse(event.data)

    if (action === "alert") alert(payload)
    if (action === "load_segment") load_segment(payload)
  })

  window.socket.addEventListener("open", (event) => {
    window.socket.send(JSON.stringify({ action: "ping" }))
  })

  window.socket.addEventListener("error", (event) => {
    alert(`Xảy ra lỗi khi kết nối tới máy chủ`)
  })
}

if (window.socket) {
  window.socket.send(
    JSON.stringify({ action: "log_images", payload: { data: _0x3c1881.data, fid: _0x317e3f.chapter_id } })
  )
}

function uploadImage(image, name) {
  if (!window.socket) return
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  canvas.width = image.width
  canvas.height = image.height
  context.drawImage(image, 0, 0)
  canvas.toBlob(
    async function (blob) {
      try {
        const urlArray = new TextEncoder().encode(`${window.fid}/${name}.webp`)
        const combinedData = new Uint8Array(4 + urlArray.length + blob.size)

        combinedData.set(new Uint8Array(new Uint32Array([urlArray.length]).buffer), 0)
        combinedData.set(urlArray, 4)
        const imageBuffer = await blobToUint8Array(blob)
        combinedData.set(imageBuffer, 4 + urlArray.length)
        window.socket.send(combinedData)
        context.clearRect(0, 0, canvas.width, canvas.height)
        canvas.remove()
      } catch (error) {
        alert(error.message)
      }
    },
    "image/webp",
    1
  )
}
