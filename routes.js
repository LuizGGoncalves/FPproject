const express = require('express');
const route = express.Router();

const homeController = require('./src/controller/homeController')

route.get('/',homeController.index);

module.exports = route;