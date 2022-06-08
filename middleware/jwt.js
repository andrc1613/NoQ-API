require('dotenv').config();

const jwt = require('jsonwebtoken');
const status = require('../responses/status');

const secret = process.env.JWT_SECRET || 'noq-capstone';

const jwtAuthenticate = (isAdmin) => (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json(status[401]);
  const authString = req.headers.authorization.split(' ');
  const jwtAuth = authString[0];
  const jwtToken = authString[1];

  if (jwtAuth !== 'Bearer' || !jwtToken) return res.status(401).json(status[401]);

  jwt.verify(jwtToken, secret, (err, decoded) => {
    if (err) return res.status(403).json(status[403]);
    req.decoded = decoded;
  });

  if (req.decoded.isAdmin !== isAdmin) return res.status(403).json(status[403]);
  next();
};

module.exports = jwtAuthenticate;
