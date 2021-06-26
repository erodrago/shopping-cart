'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, PaymentDetail, OrderItem}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'user_id', as: 'user'})
      this.hasOne(PaymentDetail, {foreignKey: 'order_id'})
      this.hasMany(OrderItem, {foreignKey: 'order_id'})
    }
  };
  OrderDetail.init({
    totalAmount: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    orderTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'order_details',
    underscored: true,
    modelName: 'OrderDetail',
    timestamps: false
  });
  return OrderDetail;
};