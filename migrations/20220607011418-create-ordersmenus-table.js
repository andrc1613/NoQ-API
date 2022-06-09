module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrdersMenus', {
      orderId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      menuId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      menuName: {
        allowNull: false,
        type: Sequelize.STRING,
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
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrdersMenus');
  },
};
