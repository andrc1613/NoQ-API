require('dotenv').config();

const { expressjwt } = require('express-jwt');

const secret = process.env.JWT_SECRET || 'noq-capstone';

const jwtdecode = expressjwt({ secret, algorithms: ['HS256'] });

const jwtcheck = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res
      .status(403)
      .json({ message: 'Forbidden access.' });
  }
  next(err);
};

module.exports = { jwtdecode, jwtcheck };
