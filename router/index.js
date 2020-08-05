const Router = require("express").Router();
const UserRouter = require('./user')
const ProductRouter = require('./product.js')
const CategoryRouter = require('./category.js')
const TransactionRouter = require('./transaction.js')


Router.use('/users', UserRouter)
Router.use('/products', ProductRouter)
Router.use('/categories', CategoryRouter)
Router.use('/transaction', TransactionRouter)

module.exports = Router;
