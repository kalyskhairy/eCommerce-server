const { Category } = require("../models");
const { Product } = require("../models");

class CategoryController {
  static async findAll(req, res, next) {
    try {
      let dataProduct = await Category.findAll({ include: { model: Product } });
      if (dataProduct) {
        res.status(200).json({ dataProduct });
      } else {
        throw {
          message: "Something went wrong",
          code: 500,
        };
      }
    } catch (error) {
      return next(error);
    }
  }

  static async createCategory(req, res, next) {
    const { type } = req.body;
    try {
      let dataCategory = await Category.findOne({
        where: { type },
      });
      if (dataCategory) {
        throw {
          code: 400,
          message: "Category type is already Exists",
        };
      } else {
        let createCategory = await Category.create({ type });
        res.status(201).json({
          Category: createCategory,
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  static async updateCategory(req, res, next) {
    const { type } = req.body;
    const { id } = req.params;

    try {
      let updatedCategory = await Category.update(
        { type },
        {
          where: { id },
          returning: true,
        }
      );
      if ( updatedCategory ) {
          res.status(201).json({
              Category : updatedCategory
          })
      } else {
          throw {
              code: 404,
              message: "Category not found"
          }
      }
    } catch (error) {
        return next(error)
    }
  }

  static deleteCategory (req, res, next) {
    let { id } = req.params;
    let deleted;

    Category.findOne({
      where: { id },
    })
      .then((data) => {
        deleted = data;
        return Category.destroy({
          where: { id },
        });
      })
      .then((data2) => {
        if (deleted) {
          res.status(200).json({
            Category: deleted,
            message: "Category is success deleted!",
          });
        } else {
          return next({
            code: 404,
            message: "Category not Found",
          });
        }
      })
      .catch((err) => {
        return next(err);
      });
  }

}

module.exports = CategoryController;
