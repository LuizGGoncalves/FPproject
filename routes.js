const express = require('express');
const route = express.Router();

const {findTreinadores} = require('./src/middlewares/middleware')
const loginController = require('./src/controller/loginController')
const homeController = require('./src/controller/homeController')
const userPageController = require('./src/controller/userPageController')

route.get('/',homeController.index);
route.get('/login',loginController.index)
route.post('/login/login',loginController.login)
route.get('/register',findTreinadores,loginController.registerIndex)
route.post('/register/register',loginController.register)
route.get('/login/logout',loginController.logout)
route.get('/userpage',userPageController.index)

module.exports = route;