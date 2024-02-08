window.host = "eel-moral-ape.ngrok-free.app"
window.socket = new WebSocket(`wss://${window.host}/ws`)
window.socket.onopen = () => alert("Đã kết nối đến máy chủ")

class FuckFuhu {
  hlsKeys = []
  segments = []
  host = window.host
  socket = window.socket
  embedUrl = window.location.href
  constructor(fid) {
    this.fid = fid
  }

  setSegments(response = {}) {
    const formats = response.formats

    if (!formats) return
    if (!formats.enc) return
    if (!formats.enc.seg) return
    if (Array.isArray(formats.enc.seg)) {
      this.segments = formats.enc.seg.filter((s) => !["raw", "key"].includes(s[0]))
    }

    this.socket.send(
      JSON.stringify({
        action: "parse_url",
        payload: {
          fid: this.fid,
          data: response,
        },
      })
    )
  }

  ready() {
    return this.socket.readyState === this.socket.OPEN
  }

  log(action, data) {
    this.socket.send(JSON.stringify({ action, payload: { data, fid: this.fid } }))
  }

  uploadHlsKey(key, keyUrl) {
    const keyHex = Array.from(key)
      .map((i) => ("0" + i.toString(16)).slice(-2))
      .join("")

    if (!this.hlsKeys.includes(keyHex)) {
      this.hlsKeys.push(keyHex)
      this.socket.send(
        JSON.stringify({
          action: "hls_key",
          payload: {
            fid: this.fid,
            keyHex: keyHex,
            keyUrl: keyUrl,
            keyIndex: this.hlsKeys.length,
          },
        })
      )
    }
  }

  uploadImage(image, name) {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    canvas.width = image.width
    canvas.height = image.height
    context.drawImage(image, 0, 0)
    canvas.toBlob(
      async (blob) => {
        try {
          const imageName = `${this.fid}/${name}.webp`
          const payload = new TextEncoder().encode(JSON.stringify({ type: "image", url: imageName }))
          const data = new Uint8Array(4 + payload.length + blob.size)

          data.set(new Uint8Array(new Uint32Array([payload.length]).buffer), 0)
          data.set(payload, 4)

          const image = await blob.arrayBuffer()
          data.set(new Uint8Array(image), 4 + payload.length)

          this.socket.send(data)
          context.clearRect(0, 0, canvas.width, canvas.height)
          canvas.remove()
        } catch (error) {
          console.log(error)
          alert(error.message)
        }
      },
      "image/webp",
      1
    )
  }

  async uploadSegment(url, segmentUrl, redirectUrl, arrayBuffer) {
    try {
      const frag = new URL(segmentUrl).searchParams.get("f")
      const fragIndex = this.segments.findIndex((s) => s[1] === frag)

      const formData = new FormData()
      formData.append("url", url)
      formData.append("fragIndex", fragIndex)
      formData.append("segmentUrl", segmentUrl)
      formData.append("redirectUrl", redirectUrl)
      if (arrayBuffer) {
        formData.append("segment", new Blob([arrayBuffer], { type: "video/mp2t" }))
      }

      const response = await fetch(`https://${this.host}/api/upload/segment?fid=${this.fid}`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const result = await response.json()
        alert(result.message || result.error.message)
      }
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }
}

if ("arraybuffer" === a.responseType) {
  o = t.response
  l = o.byteLength
  const isSile = u.url.includes("/sile/")
  fuckFuhu.uploadSegment(a.url, u.url, a.frag._url, isSile ? o : null)
} else {
  o = t.responseText
  l = o.length
}
