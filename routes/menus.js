const express = require('express');
const { getAllAvailableMenusHandler, addMenuHandler } = require('../services/menus');

const router = express.Router();

/**
 * USER FUNCTIONALITY
 */
// Get all available menus
router.get('/', getAllAvailableMenusHandler);

/**
 * ADMIN FUNCTIONALITY
 */
// Add a menu
router.post('/add', addMenuHandler);

module.exports = router;
