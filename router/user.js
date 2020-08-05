const Router = require("express").Router();
const userController = require("../controller/user.js");
const authentication = require("../middleware/authentication.js");
const UserController = require("../controller/user.js");

Router.post("/register", userController.register);
Router.post("/Login", userController.Login);
Router.use(authentication)
Router.post('/topUp', UserController.updateUser)

module.exports = Router;
