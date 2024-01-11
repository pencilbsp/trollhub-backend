import { join } from "path"

export async function rtfdImagesExtreact(rtfdPath: string) {
  const rtfFile = join(rtfdPath, "TXT.rtf")
  const f = Bun.file(rtfFile)

  const content = await f.text()
  console.log(content)
}
