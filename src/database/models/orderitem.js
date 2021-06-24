'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({OrderDetail, Product}) {
      // define association here
      this.belongsTo(OrderDetail, {foreignKey: 'order_id'})
      this.belongsTo(Product, {foreignKey: 'product_id'})
    }
  };
  OrderItem.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'order_items',
    underscored: true,
    modelName: 'OrderItem',
  });
  return OrderItem;
};