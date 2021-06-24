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
    static associate(models) {
      // define association here
      this.belongsTo(User, {foreignKey: 'user_id', as: 'user'})
      this.hasOne(PaymentDetail, {foreignKey: 'order_id'})
      this.hasMany(OrderItem, {foreignKey: 'order_id'})
    }
  };
  OrderDetail.init({
    total_amount: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    order_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'order_details',
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};