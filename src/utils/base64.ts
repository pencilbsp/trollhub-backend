export const hexToString = (hex: string) => Buffer.from(hex, "hex").toString()
export const decode = (value: string) => Buffer.from(value, "base64").toString()
