const express = require('express');

const router = express.Router();

const { registerHandler, loginHandler } = require('../services/auth');

// Register
router.post('/register', registerHandler);

// Login
router.post('/login', loginHandler);

module.exports = router;
