const express = require('express');
const route = express.Router();

const {findTreinadores , checkLogin, checkTreinador} = require('./src/middlewares/middleware')
const loginController = require('./src/controller/loginController')
const homeController = require('./src/controller/homeController')
const treinoController = require('./src/controller/treinoController')
const alunoController = require('./src/controller/alunoController')

route.get('/',homeController.index);
route.get('/login',loginController.index);
route.post('/login/login',loginController.login);
route.get('/register',findTreinadores,loginController.registerIndex);
route.post('/register/register',loginController.register);
route.get('/login/logout',loginController.logout);
route.get('/treino',checkLogin,treinoController.index);
route.get('/treino/create',checkTreinador ,treinoController.create);
route.get('/alunos',checkTreinador,alunoController.index);
module.exports = route;