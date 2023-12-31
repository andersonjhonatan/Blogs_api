const express = require('express');
const userRouter = require('./routes/User.routes');
const categoriesRouter = require('./routes/Category.routes');
const BlogPostRouter = require('./routes/BloPost.routes');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(userRouter);
app.use(categoriesRouter);
app.use(BlogPostRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
