const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || "anderu";

const generateToken = (payload) => (jwt.sign(payload, secret));

module.exports = { generateToken };