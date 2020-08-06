const Router = require('express').Router()
const TransactionController = require('../controller/transaction.js')
const authentication = require('../middleware/authentication.js')


Router.use(authentication)
Router.get('/', TransactionController.getAll)
Router.get('/history', TransactionController.getHistory)
Router.post('/', TransactionController.addTransaction)
Router.delete('/:id', TransactionController.deleteCart)
Router.put('/:id', TransactionController.updateTransaction)


module.exports = Router;