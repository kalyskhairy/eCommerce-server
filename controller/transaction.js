const { Transaction } = require("../models");
const { Product } = require("../models");
const { User } = require("../models");

class TransactionController {
  static addTransaction(req, res, next) {
    let UserId = req.UserId;
    const { ProductId } = req.body;
    // console.log(ProductId, "++++++++++============");
    Transaction.create({ ProductId, UserId })
      .then((data) => {
        // console.log(data, "ini dari addCrat");
        res.status(200).json({ whistlist: data });
      })
      .catch((err) => {
        return next(err);
      });
  }

  static getAll(req, res, next) {
    let UserId = req.UserId;
    Transaction.findAll({
      where: { UserId, status: "pending" },
      include: {
        model: Product,
      },
    })
      .then((data) => {
        // console.log(data, "ini data Cart");
        res.status(200).json({ Cart: data });
      })
      .catch((err) => {
        return next(err);
      });
  }

  static deleteCart(req, res, next) {
    let { id } = req.params;
    Transaction.destroy({
      where: { id },
    })
      .then((data) => {
        if (data) {
          res
            .status(200)
            .json({ message: "successfully remove from whistlist" });
        } else {
          throw {
            message: "Product not found",
            code: 404,
          };
        }
      })
      .catch((err) => {
        return next(err);
      });
  }

  static updateTransaction(req, res, next) {
    let { status } = req.body;
    let { id } = req.params;
    let ProductId;
    let CustomerId;

    Transaction.update(
      { status },
      {
        where: { id },
        returning: true,
      }
    )
      .then((result) => {
        // console.log(result[1][0], "++++=======");
        ProductId = result[1][0].ProductId;
        CustomerId = result[1][0].UserId;
        return Product.decrement("stock", { by: 1, where: { id: ProductId } });
      })
      .then((result2) => {
        // console.log(result2[0][0][0], "=====");
        return User.decrement("money", {
          by: result2[0][0][0].price,
          where: { id: CustomerId },
        });
      })
      .then((data) => {
        // console.log(data[0][0][0], "ini setelah di kurangin");
        res.status(201).json({
          updated: data[0][0][0],
        });
      })
      .catch((err) => {
        return next(err);
      });
  }

  static getHistory(req, res, next) {
    let UserId = req.UserId;
    Transaction.findAll({
        where: {UserId, status: "success"}, include: {
            model: Product
        }
    })
    .then(data => {
        console.log(data, 'ini gethistory')
        res.status(200).json({
            whistlist: data
        })
    })
    .catch(err => {
        return next(err)
    })
  }
}

module.exports = TransactionController;
