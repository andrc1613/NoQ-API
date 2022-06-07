module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    tableId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    totalPrice: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
    status: {
      allowNull: false,
      defaultValue: 'PENDING',
      type: DataTypes.STRING,
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
    tableName: 'Orders',
  });

  return Order;
};
