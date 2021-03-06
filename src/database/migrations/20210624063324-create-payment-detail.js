'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('payment_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      payment_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      payment_provider: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      params: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('payment_details');
  }
};