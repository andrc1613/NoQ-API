const express = require('express');
const jwtAuthenticate = require('../middleware/jwt');
const {
  addOrderHandler, getOrderHistoryHandler, getAllOrdersHandler, getOrderDetailHandler, updateOrderStatusHandler,
} = require('../services/orders');

const router = express.Router();

// Post an order (CUSTOMER)
router.post('/new', jwtAuthenticate(['CUSTOMER']), addOrderHandler);

// Get order history (CUSTOMER)
router.get('/history', jwtAuthenticate(['CUSTOMER']), getOrderHistoryHandler);

// Get all orders (WAITER)
router.get('/', jwtAuthenticate(['WAITER']), getAllOrdersHandler);

// Get order details (CUSTOMER ,WAITER)
router.get('/:id', jwtAuthenticate(['CUSTOMER', 'WAITER']), getOrderDetailHandler);

// Update order status (WAITER)
router.patch('/:id', jwtAuthenticate(['WAITER']), updateOrderStatusHandler);

module.exports = router;
