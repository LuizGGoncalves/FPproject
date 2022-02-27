const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User')

const connection = new Sequelize(dbConfig);

User.init(connection);

 dbConnection = async (connection,app) => {
    try {
        await connection.authenticate();
        app.emit('DbReady')
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:');
      }
}

module.exports = {dbConnection, connection};