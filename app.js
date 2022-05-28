require('dotenv').config();

const express = require('express');

const { jwtdecode, jwtcheck } = require('./middleware/jwt');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/menus', jwtdecode, menusRouter);
app.use('/orders', jwtdecode, ordersRouter);

app.use(jwtcheck);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
