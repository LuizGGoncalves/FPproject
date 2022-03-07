'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exercicios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      treino_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "exercicios",
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      grupo: {
        type: Sequelize.STRING
      },
      nome: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      serie: {
        type: Sequelize.INTEGER
      },
      repeticao: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Exercicios');
  }
};