module.exports = (sequelize, DataTypes) => {
  const OrderMenu = sequelize.define('OrderMenu', {
    orderId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    menuId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    menuPrice: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    subtotal: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'OrdersMenus'
  });
  
  OrderMenu.removeAttribute('id');

  return OrderMenu;
};
