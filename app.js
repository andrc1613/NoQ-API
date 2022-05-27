require('dotenv').config();

const express = require('express');
const { expressjwt: jwt } = require("express-jwt");

const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');

const secret = process.env.JWT_SECRET || "anderu";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/api', jwt({ secret: secret, algorithms: ["HS256"] }), apiRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
