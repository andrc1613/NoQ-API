const Validator = require('fastest-validator');
const {
  Menu, Order, OrderMenu, sequelize,
} = require('../models');

const fail = require('../responses/fail');
const status = require('../responses/status');
const success = require('../responses/success');

const v = new Validator();

// Post an order (user)
const addOrderHandler = async (req, res) => {
  const { userId } = req.decoded;
  const { tableId } = req.body;
  const { orderItems } = req.body;

  const itemIds = orderItems.map(({ menuId: id }) => (id));

  const menusData = await Menu.findAll({
    where: {
      id: itemIds,
    },
  });

  let totalPrice = 0;
  orderItems.forEach((item) => {
    const menuData = menusData.find((data) => (data.id === item.menuId));
    totalPrice += menuData.price * item.amount;
  });

  const t = await sequelize.transaction();
  try {
    const order = await Order.create({
      userId,
      tableId,
      totalPrice,
    }, { transaction: t });

    const orderId = order.id;

    for (const item of orderItems) {
      const menuData = menusData.find((data) => (data.id === item.menuId));
      await OrderMenu.create({
        orderId,
        menuId: item.menuId,
        menuPrice: menuData.price,
        amount: item.amount,
        subtotal: item.amount * menuData.price,
      }, { transaction: t });
    }

    await t.commit();

    const resp = {
      userId,
      orderId,
      tableId,
      totalPrice,
      status: 'PENDING',
    };

    res.status(201).json(resp);
  } catch (err) {
    await t.rollback();
    return res.status(500).json(status[500]);
  }
};

// Get all orders (admin)
const getAllOrdersHandler = async (req, res) => {
  const orders = await Order.findAndCountAll();
  const datas = (orders.rows).map(({
    id: orderId, userId, tableId, totalPrice, status,
  }) => ({
    orderId, userId, tableId, totalPrice, status,
  }));

  const message = {
    total: orders.count,
    data: datas,
  };
  res.status(200).json(message);
};

// Get order details (admin)
const getOrderDetailHandler = async (req, res) => {
  const orderId = req.params.id;

  const order = await Order.findOne({
    where: {
      id: orderId,
    },
  });

  if (!order) return res.status(400).json(fail.notAValidOrderId);

  const orderDetail = await OrderMenu.findAll({
    where: {
      orderId,
    },
  });

  const orderItems = orderDetail.map(({
    menuId, menuPrice, amount, subtotal,
  }) => ({
    menuId, menuPrice, amount, subtotal,
  }));

  const resp = {
    orderId,
    userId: order.userId,
    tableId: order.tableId,
    totalPrice: order.totalPrice,
    status: order.status,
    orderItems,
  };

  res.status(200).json(resp);
};

// Update order status (admin)
const updateOrderStatusHandler = async (req, res) => {
  const schema = {
    status: {
      type: 'string',
      enum: ['CANCELED', 'PENDING', 'DONE'],
    },
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) return res.status(400).json(validate);

  const orderId = req.params.id;
  const order = await Order.findOne({
    where: {
      id: orderId,
    },
  });

  if (!order) return res.status(400).json(fail.notAValidOrderId);

  await Order.update({
    status: req.body.status,
  }, {
    where: {
      id: orderId,
    },
  });

  res.status(200).json(success.statusUpdated);
};

module.exports = {
  addOrderHandler, getAllOrdersHandler, getOrderDetailHandler, updateOrderStatusHandler,
};
