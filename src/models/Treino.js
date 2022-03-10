const { Model, DataTypes } = require('sequelize');
  class Treino extends Model {

    static init(sequelize){
      super.init({
        nome:{
          type: DataTypes.STRING,
          allowNull:false,
        }
      },{sequelize})
    }
    static associate(models) {
      this.belongsTo(models.Aluno,{foreignKey: 'aluno_id',
      as: 'aluno'
      });

      this.hasMany(models.Exercicio,
        {foreignKey: 'treino_id',
      as: 'exercicio'})
    }
  }

  module.exports = Treino;