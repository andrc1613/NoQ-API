module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrdersMenus', {
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      menuId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      menuPrice: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      subtotal: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      notes: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrdersMenus');
  },
};
