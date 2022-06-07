const express = require('express');
const { getAllMenusHandler, addMenuHandler } = require('../services/menus');

const router = express.Router();

/**
 * USER FUNCTIONALITY
 */
// Get all menus
router.get('/', getAllMenusHandler);

/**
 * ROOT FUNCTIONALITY
 */
// Add a menu
router.post('/add', addMenuHandler);

module.exports = router;
