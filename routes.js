const express = require('express');
const route = express.Router();

const loginController = require('./src/controller/loginController')
const homeController = require('./src/controller/homeController')

route.get('/',homeController.index);
route.get('/login',loginController.index)
route.post('/login/login',loginController.register)
route.get('/register',loginController.registerIndex)
route.post('/register/register',loginController.register)

module.exports = route;