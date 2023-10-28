export default async function downloadWithFetch(url: string, filePath: string, options?: FetchRequestInit) {
  const response = await fetch(url, options);
  await Bun.write(filePath, response);
  return filePath;
}
