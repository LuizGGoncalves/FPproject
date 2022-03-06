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
      aluno_active: {
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
      active_training: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: true
      },
      treinador_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "treinadores",
          key: "id"
        },
        onUpdate: 'CASCADE',
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
    return queryInterface.dropTable('alunos');
  }
};
