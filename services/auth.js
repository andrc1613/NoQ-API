const Validator = require('fastest-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'noq-capstone';
const expiresIn = process.env.JWT_EXPIRE || '1h';
const { User } = require('../models');

const generateToken = (payload) => (jwt.sign(payload, secret, { expiresIn }));

const v = new Validator();

const registerHandler = async (req, res) => {
  const resp = {};
  const schema = {
    name: 'string',
    email: 'email',
    password: 'string|min:8',
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res
      .status(400)
      .json(validate);
  }

  const userWithEmail = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (userWithEmail) {
    resp.message = 'User is already registered.';
    return res
      .status(400)
      .json(resp);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  const insert = {
    name: req.body.name,
    email: req.body.email,
    password: hash,
  };

  await User.create(insert);

  resp.message = 'User created.';
  res
    .status(201)
    .json(resp);
};

const loginHandler = async (req, res) => {
  const resp = {};
  const schema = {
    email: 'email',
    password: 'string',
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res
      .status(400)
      .json(validate);
  }

  const userWithEmail = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!userWithEmail) {
    resp.message = 'Username or password is incorrect.';
    return res
      .status(400)
      .json(resp);
  }

  const check = await bcrypt.compare(req.body.password, userWithEmail.password);
  if (!check) {
    resp.message = 'Username or password is incorrect.';
    return res
      .status(400)
      .json(resp);
  }

  const token = generateToken({
    id: userWithEmail.id,
    email: userWithEmail.email,
    name: userWithEmail.name,
  });

  resp.message = 'Login successful.';
  resp.loginResult = {
    id: userWithEmail.id,
    name: userWithEmail.name,
    email: userWithEmail.email,
    token,
  };

  res
    .status(200)
    .json(resp);
};

module.exports = { registerHandler, loginHandler };
