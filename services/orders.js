const {
  Menu, Order, OrderMenu, sequelize,
} = require('../models');
const status = require('../responses/status');

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
const getAllOrdersHandler = (req, res) => {

};

// Get order details (admin)
const getOrderDetailHandler = (req, res) => {

};

module.exports = { addOrderHandler, getAllOrdersHandler, getOrderDetailHandler };
