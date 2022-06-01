const express = require('express');
const { addOrderHandler, getAllOrdersHandler, getOrderDetailHandler } = require('../services/orders');

const router = express.Router();

/**
 * USER FUNCTIONALITY
 */
// Post an order
router.post('/', addOrderHandler);

/**
 * ADMIN FUNCTIONALITY
 */
// Get all orders
router.get('/', getAllOrdersHandler);

// Get order details
router.get('/:id', getOrderDetailHandler);

module.exports = router;
