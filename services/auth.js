const Validator = require('fastest-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'noq-capstone';
const expiresIn = process.env.JWT_EXPIRE || '1h';
const { User } = require('../models');

const success = require('../responses/success');
const fail = require('../responses/fail');

const generateToken = (payload) => (jwt.sign(payload, secret, { expiresIn }));

const v = new Validator();

// Register
const registerHandler = async (req, res) => {
  const schema = {
    name: 'string',
    email: 'email',
    password: 'string|min:8',
  };
  const validate = v.validate(req.body, schema);

  if (validate.length) return res.status(400).json(validate);

  const userWithEmail = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (userWithEmail) return res.status(400).json(fail.userAlreadyRegistered);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  const insert = {
    name: req.body.name,
    email: req.body.email,
    password: hash,
  };

  await User.create(insert);

  res.status(201).json(success.userCreated);
};

// Login
const loginHandler = async (req, res) => {
  const schema = {
    email: 'email',
    password: 'string',
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) return res.status(400).json(validate);

  const userWithEmail = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!userWithEmail) return res.status(400).json(fail.incorrectLogin);

  const check = await bcrypt.compare(req.body.password, userWithEmail.password);
  if (!check) return res.status(400).json(fail.incorrectLogin);

  const token = generateToken({
    userId: userWithEmail.id,
    email: userWithEmail.email,
    name: userWithEmail.name,
    role: userWithEmail.role,
    isAdmin: userWithEmail.isAdmin,
  });

  const resp = {};
  resp.message = 'Login successful.';
  resp.loginResult = {
    userId: userWithEmail.id,
    name: userWithEmail.name,
    email: userWithEmail.email,
    role: userWithEmail.role,
    isAdmin: userWithEmail.isAdmin,
    token,
  };

  res.status(200).json(resp);
};

module.exports = { registerHandler, loginHandler };
