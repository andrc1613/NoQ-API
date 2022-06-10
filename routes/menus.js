const express = require('express');
const jwtAuthenticate = require('../middleware/jwt');
const { getAllMenusHandler, getMenuRecommendationHandler, addMenuHandler } = require('../services/menus');

const router = express.Router();

// Get all menus (CUSTOMER)
router.get('/', jwtAuthenticate(['CUSTOMER']), getAllMenusHandler);

// Get menu recommendation (CUSTOMER)
router.get('/recommendation', jwtAuthenticate(['CUSTOMER']), getMenuRecommendationHandler);

// Add a menu (ADMIN)
router.post('/add', jwtAuthenticate(['ADMIN']), addMenuHandler);

module.exports = router;
