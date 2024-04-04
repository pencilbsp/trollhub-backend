let body = $response.body
body = body.replace('devtoolsDetector.launch();', "")

$done({ body })


