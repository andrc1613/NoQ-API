const { Menu, Order, OrderMenu, sequelize } = require('../models');
const status = require("../responses/status");

// Post an order
const addOrderHandler = async (req, res) => {  
  //validasi
  
  const userId = req.decoded.id;
  
  const orderItems = req.body.orderItems;

  const itemIds = orderItems.map(({id}) => (id));

  const menusData = await Menu.findAll({
    where: {
      id: itemIds,
    }
  });

  let totalPrice = 0;
  orderItems.forEach(item => {
    const menuData = menusData.find((data) => (data.id === item.id));
    totalPrice = totalPrice + menuData.price * item.amount;
  });

  try {
    let orderId;
    await sequelize.transaction(async (t) => {
      const order = await Order.create({
        userId: userId,
        totalPrice: totalPrice,
      }, {transaction: t});

      orderId = order.id;

      orderItems.forEach(async (item) => {
        const menuData = menusData.find((data) => (data.id === item.id));
        await OrderMenu.create({
          orderId: orderId,
          menuId: item.id,
          menuPrice: menuData.price,
          amount: item.amount,
          subtotal: item.amount * menuData.price,
          notes: item.notes,
        })
      }, {transaction: t});
    });

    const resp = {
      userId: userId,
      orderId: orderId,
      totalPrice: totalPrice,
      status: 'PENDING',
    }
  
    res.status(201).json(resp);
  } catch (err) {
    console.log(err)
    return res.status(500).json(status[500]);
  }

  

};

// Get all orders
const getAllOrdersHandler = (req, res) => {

};

// Get order details
const getOrderDetailHandler = (req, res) => {

};

module.exports = { addOrderHandler, getAllOrdersHandler, getOrderDetailHandler };
