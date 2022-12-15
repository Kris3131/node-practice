const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

app.engine(
  'hbs',
  expressHandlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main',
  })
)
app.set('view engine', 'hbs')

const port = process.env.PORT || 3000

// app.METHOD -> METHOD -> HTTP Verb -> path , function
// node.js vs. express.js
// res.writeHead -> res.status
// res.end -> res.send
app.use(express.static(__dirname + '/public'))

const fortunes = [
  'Conquer your fears or they will conquer you.',
  'Rivers need springs.',
  "Do not fear what you don't know.",
  'You will have a pleasant surprise.',
  'Whenever possible, keep it simple.',
]

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/about', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  res.render('about', { fortune: randomFortune })
})
// app.use -> 統包任何不符合路由的路徑 -> 路由順序
// 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// 500 page
app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => {
  console.log(`Express started on : http://localhost:${port}`)
})
