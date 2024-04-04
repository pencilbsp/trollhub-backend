// let body = $response.body

// let url = body.match(/location\.href = "(.*?)"/)[1]
// let data = $httpClient.get(`https://localhost/api/rip?url=${url}`)
// body = `
//   <iframe id="myIframe" src="${url}"></iframe>
//   <script src="https://localhost/public/scripts/rip.js"></script>
// `

// $done({ body })

// Trong mục Scripting của Surge, thêm một rule với đoạn mã sau:

const url = $request.url;

// Rewrite URL nếu domain là example.com
if (url.includes("fuhu.app")) {
    const newUrl = url.replace("fuhu.app", "fuhuzz.rip");
    $request.url = newUrl;
}

$done({});

