export default function loopLimit<T>(data: any, limit: number, callback: (value: any) => Promise<T>): Promise<T[]> {
  if (!Array.isArray(data)) throw new Error("")

  let index = 0
  const results: any[] = []
  const loopCount = new Map()
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      if (loopCount.size >= limit) return
      if (!data[index]) {
        clearInterval(interval)
        return
      }

      loopCount.set(index, index)
      const current = data[index]

      try {
        const result = await callback(current)
        results.push(result ?? index)
        loopCount.delete(index)
        index++

        if (results.length === data.length) {
          clearInterval(interval)
          return resolve(results)
        }
      } catch (error) {
        clearInterval(interval)
        return reject(error)
      }
    }, 100)
  })
}
