require('dotenv').config();

const express = require('express');
const jwtAuthenticate = require('./middleware/jwt');

const authRouter = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
//app.use('/menus', jwtdecode, menusRouter);
//app.use('/orders', jwtdecode, ordersRouter);

app.get('/', jwtAuthenticate, (req, res) => {
  res.send(req.decoded);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
