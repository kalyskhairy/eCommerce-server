"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User);
      Product.belongsTo(models.Category)
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          message: "Name is already exists"
        },
        validate: {
          notNull: {
            args: true,
            message: "Product name must fill",
          },
          notEmpty: {
            args: true,
            message: "Product name cannot be empty",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: {
            args: true,
            message: "must be integer",
          },
          min: {
            args: -1,
            message: "stock cannot be minus",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            args: true,
            message: "must be URL",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: {
            args: true,
            message: "must be integer",
          },
          min: {
            args: -1,
            message: "stock cannot be minus",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      }
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
