'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({OrderDetail}) {
      // define association here
      this.hasOne(OrderDetail, {foreignKey: 'payment_id', as: 'orderDetail'})
    }
  };
  PaymentDetail.init({
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
      allowNull:false
  },
    params: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payment_details',
    underscored: true,
    modelName: 'PaymentDetail',
    timestamps: false,
  });
  return PaymentDetail;
};