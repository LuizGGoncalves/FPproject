const express = require('express');
const route = express.Router();

const {findTreinadores , checkLogin, checkTreinador} = require('./src/middlewares/middleware')
const loginController = require('./src/controller/loginController')
const homeController = require('./src/controller/homeController')
const treinoController = require('./src/controller/treinoController')
const alunoController = require('./src/controller/alunoController')
const exercicioController = require('./src/controller/exercicioController')

route.get('/',homeController.index);
route.get('/login',loginController.index);
route.post('/login/login',loginController.login);
route.get('/register',findTreinadores,loginController.registerIndex);
route.post('/register/register',loginController.register);
route.get('/login/logout',loginController.logout);

route.post('/exercicio/create/:id',exercicioController.create);
route.get('/exercicio/edit/:id', exercicioController.editIndex);
route.post('/exercicio/edit/:id',exercicioController.edit)

route.get('/alunos',checkTreinador,alunoController.index);

route.get('/treino/index/:id',checkLogin,treinoController.index);
route.post('/treino/create/:id',checkTreinador ,treinoController.create);
route.get('/treino/show/:id',checkLogin, treinoController.showTreino);
route.get('/treino/delet/:id',checkTreinador,treinoController.delet);
route.get('/treino/set/:alunoId/:treinoId',checkTreinador,alunoController.defineTreino)

module.exports = route;