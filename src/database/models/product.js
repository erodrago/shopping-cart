'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category, Discount, OrderItem, CartItem}) {
      // define association here
      this.belongsTo(Category, {foreignKey: 'category_id', as: 'category'})
      this.belongsTo(Discount, {foreignKey: 'discount_id', as: 'discount'})
      this.hasMany(OrderItem, {foreignKey: 'product_id'})
      this.hasMany(CartItem, {foreignKey: 'product_id'})
    }

    toJSON(){
      return {
        ...this.get(), 
        category_id: undefined, 
        discount_id: undefined
      }
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'products',
    underscored: true,
    modelName: 'Product',
  });
  return Product;
};