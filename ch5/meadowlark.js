const express = require('express');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const handlers = require('./lib/handlers');

const app = express();

app.engine(
  'hbs',
  expressHandlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main',
  })
);
app.set('view engine', 'hbs');

const port = process.env.PORT || 3000;

// app.METHOD -> METHOD -> HTTP Verb -> path , function
// node.js vs. express.js
// res.writeHead -> res.status
// res.end -> res.send
const staticFile = path.join(__dirname, 'public');
app.use(express.static(staticFile));

app.get('/', handlers.home);

app.get('/about', handlers.about);
// app.use -> 統包任何不符合路由的路徑 -> 路由順序
// 404 page
app.use(handlers.notFound);

// 500 page
app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Express started on : http://localhost:${port}`);
  });
} else {
  module.exports = app;
}
