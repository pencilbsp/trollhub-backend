let body = $response.body
let url = body.match(/location\.href = "(.*?)"/)[1]

body = `
  <button id="load1" style="width: 200px; height: 50px">Load Scripts</button>
  <button id="load2" style="width: 200px; height: 50px">Load Real Page</button>
  <div id="iframe" style="width: 100%; height: 300px; border: 1px solid black;"></div>

  <script>
    var url = "https://secure.pheclip.xyz/embed/1KOi-fRUhfjVRHfgIgnHpf4KgXD5Cq22WMjooCT0xYoc4Xs7Eeqht4DjOjt_gX5SP5Tlq52xEkM5WOBcIAGovJ68X78vRuUSTk7LdEEGVD8?s=kIAuMVC9MPEiGMG9_pr1SbSAz6J0hC1meFtplabJ6_1TTvujJqHuHrjORDlaHPc9E2n6K8xvErjsVvWv15eM2iIHxNrPzuMyeOvYfG0lx759baCKHXkTZrAlVDHTX_mU&s=kIAuMVC9MPEiGMG9_pr1SbSAz6J0hC1meFtplabJ6_1TTvujJqHuHrjORDlaHPc9E2n6K8xvErjsVvWv15eM2iIHxNrPzuMyeOvYfG0lx759baCKHXkTZrAlVDHTX_mU&sig=af8faa2dfb464e7b0c897a48b4dce167"
	// var url = \`${url}\`

    const button1 = document.getElementById("load1")
    const button2 = document.getElementById("load2")

    button1.addEventListener("click", () => {
      const iframe = document.createElement("iframe")
      iframe.src = "https://comic.pheclip.xyz/"
      iframe.style.width = "100%"
      iframe.style.height = "100%"
      document.getElementById("iframe").append(iframe)
    })

    button2.addEventListener("click", () => {
      window.location.href = url
    })
  </script>
`

$done({ body })
