let headers = $response.headers

let url = headers["Location"]

body = `
  <button id="load1" style="width: 200px; height: 50px">Load Real Page</button>

  <script>
    const url = new URL(\`${url}\`).searchParams.get("l")
    const button1 = document.getElementById("load1")
    button1.addEventListener("click", () => {
      window.location.href = url
    })
  </script>
`

$done({
  body,
  status: 200,
  headers: {
    "Content-Type": "text/html; charset=UTF-8",
  },
})
