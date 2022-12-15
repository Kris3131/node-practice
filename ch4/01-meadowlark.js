const express = require('express')

const app = express()

const port = process.env.PORT || 3000
// app.METHOD -> METHOD -> HTTP Verb -> path , function
// node.js vs. express.js
// res.writeHead -> res.status
// res.end -> res.send
app.get('/', (req, res) => {
  res.type('text/plain')
  res.send('Meadowlark Travel')
})

app.get('/about', (req, res) => {
  res.type('text/plain')
  res.send('About Meadowlark Travel')
})
// app.use -> 統包任何不符合路由的路徑 -> 路由順序
// 404 page
app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404 - Not Found')
})

// 500 page
app.use((err, req, res, next) => {
  console.log(err.message)
  res.type('text/plain')
  res.status(500)
  res.send('500 - Server Error')
})

app.listen(port, () => {
  console.log(`Express started on : http://localhost:${port}`)
})
