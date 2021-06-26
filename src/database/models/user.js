'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({CartSession, OrderDetail}) {
      // define association here
      this.hasOne(CartSession, {foreignKey: 'user_id', as: 'cart_session'});
      this.hasMany(OrderDetail, {foreignKey: 'user_id'})
    }

    toJSON() {
      return {...this.get(), id:undefined}
    }
  };
  User.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'User must have atleast one name'},
        notEmpty: {msg: 'First name should not be empty'},
        len: [0, 20]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 20]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'User must have a username'},
        notEmpty: {msg: 'Username should not be empty'},
        len: [0, 20]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'User must have a password'},
        notEmpty: {msg: 'Password should not be empty'}
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'User must have a password'},
        notEmpty: {msg: 'Password should not be empty'},
        len: [0, 20]
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    underscored: true,
    modelName: 'User',
  });
  return User;
};