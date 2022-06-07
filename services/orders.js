const { Menu, Order, OrderMenu, sequelize } = require('../models');
const status = require("../responses/status");

// Post an order (user)
const addOrderHandler = async (req, res) => {  
  
  
  const userId = req.decoded.userId;
  const tableId = req.body.tableId;
  const orderItems = req.body.orderItems;

  const itemIds = orderItems.map(({ menuId: id }) => (id));

  const menusData = await Menu.findAll({
    where: {
      id: itemIds,
    }
  });

  let totalPrice = 0;
  orderItems.forEach(item => {
    const menuData = menusData.find((data) => (data.id === item.menuId));
    totalPrice = totalPrice + menuData.price * item.amount;
  });

  try {
    let t = await sequelize.transaction();
    
    let orderId;
    const order = await Order.create({
      userId: userId,
      tableId: tableId,
      totalPrice: totalPrice,
    }, {transaction: t});

    orderId = order.id;

    
    for (item of orderItems) {
      const menuData = menusData.find((data) => (data.id === item.menuId));
      await OrderMenu.create({
        orderId: orderId,
        menuId: item.menuId,
        menuPrice: menuData.price,
        amount: item.amount,
        subtotal: item.amount * menuData.price,
      }, {transaction: t});
    }

    await t.commit();

    const resp = {
      userId: userId,
      orderId: orderId,
      tableId: tableId,
      totalPrice: totalPrice,
      status: 'PENDING',
    }
  
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
