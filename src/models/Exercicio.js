const { Model, DataTypes } = require('sequelize');

class Exercicio extends Model {
  static init(sequelize) {
    super.init({
      grupo: DataTypes.STRING,
      nome: DataTypes.STRING,
      desc: DataTypes.STRING,
      serie: DataTypes.INTEGER,
      repeticao: DataTypes.INTEGER
    }, { sequelize, })
  }
  static associate(models) {
    this.belongsTo(models.Treino,{foreignKey: 'treino_id',
      as: 'aluno'
      });
  }
}

module.exports = Exercicio;