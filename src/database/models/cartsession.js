'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, CartItem}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'user_id', as: 'user'})
      this.hasMany(CartItem, {foreignKey: 'session_id'})
    }
  };
  CartSession.init({
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cart_sessions',
    underscored: true,
    modelName: 'CartSession',
  });
  return CartSession;
};