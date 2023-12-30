import { WebSocket } from "ws"
import { WEB_SECRET_IV, WEB_SECRET_KEY, decrypt } from "./client"

export const createMessage = (marker: string) => {
  const buffer = new ArrayBuffer(marker.length * 2)
  const uint16Array = new Uint16Array(buffer)

  for (let index = 0; index < marker.length; index++) {
    uint16Array[index] = marker.charCodeAt(index)
  }

  return uint16Array
}

export const bufferToString = (buffer: Buffer) => {
  // @ts-ignore
  const str = String.fromCharCode.apply(null, new Uint16Array(buffer))
  return str.replace(/\0/g, "")
}

type WsKey = {
  key: string
  iv: string
}

export default function wsMessageKey(url: string, marker: string): Promise<WsKey> {
  return new Promise((resolve, reject) => {
    let timeout: NodeJS.Timeout
    const keys: WsKey[] = []

    const socket = new WebSocket(url, {
      // @ts-ignore
      perMessageDeflate: false, // Tắt việc sử dụng perMessageDeflate (nếu có)
      handshakeTimeout: 5000, // Thời gian timeout cho quá trình handshake là 5 giây
      maxRetries: 3, // Số lần thử nghiệm kết nối tối đa là 3
    })

    socket.onmessage = (message) => {
      try {
        const messageString = bufferToString(message.data)
        const keyString = decrypt(messageString, WEB_SECRET_KEY, WEB_SECRET_IV)
        const [key, iv] = keyString.split("|")
        keys.push({ key, iv })
        socket.close()
      } catch (error: any) {
        socket.close(1002, error.message)
      }
    }

    socket.onclose = (event) => {
      if (timeout) clearTimeout(timeout)

      if (event.wasClean && keys.length > 0) {
        return resolve(keys[0])
      } else {
        return reject(event.reason ?? "Connection abruptly closed")
      }
    }

    socket.onerror = (error) => reject(error)

    socket.onopen = () => {
      socket.send(createMessage(marker))

      timeout = setTimeout(() => {
        socket.close(1006, "Connection closed due to timeout")
      }, 10 * 1000)
    }
  })
}
