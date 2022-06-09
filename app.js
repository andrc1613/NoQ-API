require('dotenv').config();

const express = require('express');

const authRouter = require('./routes/auth');
const menusRouter = require('./routes/menus');
const ordersRouter = require('./routes/orders');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/menus', menusRouter);
app.use('/orders', ordersRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
