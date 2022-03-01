module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('alunos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      hash_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alunoActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      peso: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false
      },
      altura: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false
      },
      imc: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: true
      },
      activeTraining: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: true
      },
      treinadorId:{
        type: Sequelize.INTEGER,
        references: {
          model: "treinadores",
          key: "id"
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })

  },

  down: async (queryInterface, Sequelize) => {
  }
};
