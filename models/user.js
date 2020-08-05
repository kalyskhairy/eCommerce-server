"use strict";
const { Model } = require("sequelize");
const { generatePassword } = require("../helpers/bcrypt.js");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product);
      User.hasMany(models.Transaction);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            message: "Username must be fill",
          },
          notEmpty: {
            args: true,
            message: "Username must be fill",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          message: "email is already exists",
        },
        allowNull: false,
        validate: {
          isEmail: {
            args: false,
            message: "Invalid Email format",
          },
          notEmpty: {
            args: true,
            message: "Email must be fill",
          },
          notNull: {
            args: true,
            message: "Email must be fill",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6, 16],
            message: "password must be have 6 between 16 characters",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "member",
      },
      money: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: {
            args: true,
            message: "must be integer",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.password = generatePassword(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
