const express = require('express');
const jwtAuthenticate = require('../middleware/jwt');
const {
  addOrderHandler, getOrderHistoryHandler, getAllOrdersHandler, getOrderDetailHandler, updateOrderStatusHandler,
} = require('../services/orders');

const router = express.Router();

/**
 * CUSTOMER FUNCTIONALITY
 */
// Post an order
router.post('/new', jwtAuthenticate('CUSTOMER'), addOrderHandler);

// Get order history
router.get('/history', jwtAuthenticate('CUSTOMER'), getOrderHistoryHandler);

/**
 * WAITER FUNCTIONALITY
 */
// Get all orders
router.get('/', jwtAuthenticate('WAITER'), getAllOrdersHandler);

// Get order details
router.get('/:id', jwtAuthenticate('WAITER'), getOrderDetailHandler);

// Update order status
router.patch('/:id', jwtAuthenticate('WAITER'), updateOrderStatusHandler);

module.exports = router;
