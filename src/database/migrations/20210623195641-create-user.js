'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: 'User must have atleast one name'},
          notEmpty: {msg: 'First name should not be empty'},
          len: [0, 20]
        }
      },
      last_name: {
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
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: 'User must have a password'},
          notEmpty: {msg: 'Password should not be empty'},
          len: [0, 20]
        }
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('users');
  }
};