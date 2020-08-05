'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User)
      Transaction.belongsTo(models.Product)
    }
  };
  Transaction.init({
    totalPrice: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          message: "payment method required"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Products",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};