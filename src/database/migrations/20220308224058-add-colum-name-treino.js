'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Treinos','nome',{
      type: Sequelize.STRING,
    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('Treinos', 'nome')
  }
};
