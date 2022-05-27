const validator = require('fastest-validator');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const user = require('../models/user');
const { generateToken } = require('./jwt');

const v = new validator();

const registerHandler = async (req, res) => {
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
    const resp = {
      message: 'User is already registered.',
    };
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

  const data = await User.create(insert);
  res
    .status(201)
    .json(data);
}

const loginHandler = async (req, res) => {
  const schema = {
    email: 'email',
    password: 'string'
  }
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res
      .status(400)
      .json(validate);
  }

  const userWithEmail = await User.findOne({
    where: {
      email: req.body.email
    }
  })
  if (!userWithEmail) {
    const resp = {
      message: "Username or password is incorrect."
    }
    return res
      .status(400)
      .json(resp)
  }

  const check = await bcrypt.compare(req.body.password, userWithEmail.password);
  if (!check) {
    const resp = {
      message: "Username or password is incorrect."
    }
    return res
      .status(400)
      .json()
  }

  const token = generateToken({
    id: userWithEmail.id,
    email: userWithEmail.email,
    name: userWithEmail.name,
  });

  res
    .status(200)
    .json({
      message: token
    })
}

module.exports = { registerHandler, loginHandler }