'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, CartSession}) {
      // define association here
      this.belongsTo(Product, {foreignKey: 'product_id'})
      this.belongsTo(CartSession, {foreignKey: 'session_id'})
    }
  };
  CartItem.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cart_items',
    underscored: true,
    modelName: 'CartItem',
  });
  return CartItem;
};