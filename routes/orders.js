const express = require('express');
const jwtAuthenticate = require('../middleware/jwt');
const { addOrderHandler, getAllOrdersHandler, getOrderDetailHandler, updateOrderStatusHandler } = require('../services/orders');

const router = express.Router();

/**
 * USER FUNCTIONALITY
 */
// Post an order
router.post('/new', jwtAuthenticate(false), addOrderHandler);

/**
 * ADMIN FUNCTIONALITY
 */
// Get all orders
router.get('/',jwtAuthenticate(true) , getAllOrdersHandler);

// Get order details
router.get('/:id', jwtAuthenticate(true), getOrderDetailHandler);

// Update order status
router.patch('/:id', jwtAuthenticate(true), updateOrderStatusHandler);

module.exports = router;
