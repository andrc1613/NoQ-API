require('dotenv').config();

const jwt = require('jsonwebtoken');
const response = require('../responses/status');

const secret = process.env.JWT_SECRET || 'noq-capstone';

const jwtAuthenticate = (req, res, next) => {
  const authString = req.headers.authorization.split(' ');
  const jwtAuth = authString[0];
  const jwtToken = authString[1];

  if (jwtAuth !== 'Bearer' || !jwtToken) return res.status(401).json(response[401]);

  jwt.verify(jwtToken, secret, (err, decoded) => {
    if (err) return res.status(403).json(response[403]);
    req.decoded = decoded;
    next();
  });
};

module.exports = jwtAuthenticate;
