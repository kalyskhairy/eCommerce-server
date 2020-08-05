const { Transaction } = require("../models");
const { Product } = require("../models");

class TransactionController {
  static addTransaction(req, res, next) {
    let UserId = req.UserId;
    const { ProductId } = req.body;

    Transaction.findOne({
        where: { ProductId , status: "pending"}
    })
    .then(data => {
        if(data) {
            return next({
                code: 400,
                message: "Whistlist already exists"
            })
        } else {
            return Transaction.create({
                UserId,
                ProductId
            })
        }
    })
    .then(data2 => {
        return Transaction.findByPk(data2.id, {include: Product})
    })
    .then(transaction => {
        res.status(201).json({
            Whistlist: transaction
        })
    })
    .catch(err => {
        return next(err)
    })
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
        res.status(200).json({ Cart: data });
      })
      .catch((err) => {
        return next(err);
      });
  }
}

module.exports = TransactionController;