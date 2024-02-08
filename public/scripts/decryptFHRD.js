import { decrypt, encrypt } from "@/utils/fuhu/client"
import { readFileSync, writeFileSync } from "fs"

// const FHResourceData = readFileSync("player.sc.v2.min.txt", "utf8")
// const FHScript = decrypt(FHResourceData, "6b63828caba6249d", "531faf48837bc310")

const f = Bun.file("./player.sc.v2.min.js")
const scriptContent = await f.text()

const encryptedScript = encrypt(scriptContent, "6b63828caba6249d", "531faf48837bc310")
// console.log(encryptedScript)

await Bun.write("./player.sc.v2.min_modified.js", `window.FHResourceData="${encryptedScript}";`)
