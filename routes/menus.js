const express = require('express');
const jwtAuthenticate = require('../middleware/jwt');
const { getAllMenusHandler, addMenuHandler } = require('../services/menus');

const router = express.Router();

/**
 * USER FUNCTIONALITY
 */
// Get all menus
router.get('/', jwtAuthenticate(false), getAllMenusHandler);

/**
 * ROOT FUNCTIONALITY
 */
// Add a menu
router.post('/add', jwtAuthenticate(true), addMenuHandler);

module.exports = router;
