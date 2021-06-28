'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('order_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      order_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('order_details');
 }
};