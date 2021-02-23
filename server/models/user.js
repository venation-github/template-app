'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : "you must enter email format!"
        },
        notEmpty : {
          args : true,
          msg : "email cannot be empty!"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : "password cannot be empty!"
        }
      }
    },
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : "Name cannot be empty!"
        }
      }
    },
    isAdmin: {
      type : DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
        if (!user.isAdmin) {
           user.isAdmin = false
        }
      }
    }
  });
  return User;
};