const express = require('express');
const jwtAuthenticate = require('../middleware/jwt');
const { getAllMenusHandler, addMenuHandler } = require('../services/menus');

const router = express.Router();

/**
 * CUSTOMER FUNCTIONALITY
 */
// Get all menus
router.get('/', jwtAuthenticate('CUSTOMER'), getAllMenusHandler);

/**
 * ADMIN FUNCTIONALITY
 */
// Add a menu
router.post('/add', jwtAuthenticate('ADMIN'), addMenuHandler);

module.exports = router;
