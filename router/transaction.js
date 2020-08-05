const Router = require('express').Router()
const TransactionController = require('../controller/transaction.js')
const authentication = require('../middleware/authentication.js')


Router.use(authentication)
Router.get('/', TransactionController.getAll)
Router.post('/', TransactionController.addTransaction)


module.exports = Router;