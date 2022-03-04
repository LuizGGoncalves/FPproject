const { Model, DataTypes } = require('sequelize');
const Aluno = require('../models/Aluno')
const bcrypt = require('bcryptjs');

class Treinador extends Model {
    
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hashPassword: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ''
            },
            password: {
                type: DataTypes.VIRTUAL,
                defaultValue: '',
            },           
        }, { sequelize, tableName:"treinadores"});
        this.addHook('beforeSave', async (treinador) => {
            if (treinador.password) {
                treinador.hashPassword = await bcrypt.hash(treinador.password, 8);
            }
        })
        return this;
    }
    static associate(models){
        this.hasMany(models.Aluno,{foreignKey: 'treinador_id', as: 'alunos'});
    }
}


module.exports = Treinador