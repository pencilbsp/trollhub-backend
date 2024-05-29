try {
  const response = await fetch(
    "https://usercontents.fuhuzz.rip/videos/hls/bcjLXgNQ/0.html"
  );

  const arrBuf = await response.arrayBuffer();
  const buffer = Buffer.from(arrBuf);

  const file = Bun.file("test.html");
  const fileArrayBuffer = await file.arrayBuffer();
  const arrayBuffer = Buffer.from(fileArrayBuffer);

  //   await Bun.write("test.html", response);

  console.log(buffer, arrayBuffer);
} catch (error) {
  console.log(error);
}
