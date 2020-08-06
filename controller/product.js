const { Product } = require("../models");
const { User } = require("../models");
const { Category } = require("../models");

class ProductController {
  static async findAll(req, res, next) {
    try {
      let Products = await Product.findAll({ include: { model: Category } });
    //   console.log(Products);
      if (Product) {
        res.status(200).json({
          Products,
        });
      }else {
          throw {
              message: "something went wrong",
              code: 500
          }
      }
    } catch (error) {
      return next(error);
    }
  }

  static async findById(req, res, next) {
    let { id } = req.params;
    try {
      let OneProduct = await Product.findOne({ where: { id } });
      if (OneProduct) {
        res.status(200).json({
          Product: OneProduct,
        });
      } else {
        throw {
          message: "Product not Found",
          code: 404,
        };
      }
    } catch (error) {
      return next(error);
    }
  }

  static async updateProduct(req, res, next) {
    let { name, price, stock, imageUrl, CategoryId } = req.body;
    let { id } = req.params;
    let updated = {
      name,
      price,
      stock,
      imageUrl,
      CategoryId,
    };

    try {
      let updatedProduct = await Product.update(updated, {
        where: { id },
        returning: true,
      });
    //   console.log(updatedProduct, "ini update product");
      if (updatedProduct) {
        res.status(201).json({ product: updatedProduct });
      } else {
        throw {
          message: "Product not Found!",
          code: 404,
        };
      }
    } catch (error) {
      return next(error);
    }
  }

  static async createProduct(req, res, next) {
    let UserId = req.UserId;
    const { name, price, stock, imageUrl, CategoryId } = req.body;

    try {
      let ProductName = await Product.findOne({
        where: { name },
      });
      if (ProductName) {
        // console.log(ProductSame, "namanya udah ada");
        throw {
          code: 400,
          message: "Name is already exists",
        };
      } else {
        let NewProduct = await Product.create({
          name,
          stock,
          price,
          imageUrl,
          CategoryId,
          UserId,
        });
        if (NewProduct) {
          res.status(201).json({
            Product: NewProduct,
          });
        } else {
          throw {
            code: 500,
            message: "something went wrong",
          };
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    let { id } = req.params;
    let deleted;

    Product.findOne({
      where: { id },
    })
      .then((data) => {
        deleted = data;
        return Product.destroy({
          where: { id },
        });
      })
      .then((data2) => {
        if (deleted) {
          res.status(200).json({
            Product: deleted,
            message: "Product is success deleted!",
          });
        } else {
          return next({
            code: 404,
            message: "Product not Found",
          });
        }
      })
      .catch((err) => {
        return next(err);
      });
  }
}

module.exports = ProductController;
