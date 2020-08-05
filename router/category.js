const Router = require('express').Router()
const CategoryController = require('../controller/cateogry.js');
const authentication = require('../middleware/authentication.js')
const authorization = require('../middleware/authorization.js')


Router.get('/', CategoryController.findAll)
Router.use(authentication)
Router.post('/', authorization, CategoryController.createCategory)
Router.put('/:id', authorization, CategoryController.updateCategory)
Router.delete('/:id', authorization, CategoryController.deleteCategory)


module.exports = Router;