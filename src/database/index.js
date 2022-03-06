const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User')
const Aluno = require('../models/Aluno')
const Treinador = require('../models/Treinador')
const Treino = require('../models/Treino')
const Exercicio = require('../models/Exercicio')

const connection = new Sequelize(dbConfig);

User.init(connection);
Aluno.init(connection);
Treinador.init(connection);
Treino.init(connection);
Exercicio.init(connection);

Aluno.associate(connection.models);
Treinador.associate(connection.models)
Treino.associate(connection.models);
Exercicio.associate(connection.models);;

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