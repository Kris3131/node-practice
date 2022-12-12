const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 3000

function serverStaticFile(res, path, contentType, responseCode = 200) {
  fs.readFile(__dirname + path, (err, date) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      return res.end('500 - Internal Error')
    }
    res.writeHead(responseCode, { 'Content-Type': contentType })
    res.end(date)
  })
}

const server = http.createServer((req, res) => {
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
  switch (path) {
    case '':
      serverStaticFile(res, '/public/home.html', 'text/html')
      break
    case '/about':
      serverStaticFile(res, '/public/about.html', 'text/html')
      break
    case '/img/logo.png':
      serverStaticFile(res, '/public/img/logo.png', 'image/png')
    default:
      serverStaticFile(res, '/public/404.html', 'text/html', 404)
      break
  }
})
server.listen(port, () => console.log(`Server started on port ${port}`))
