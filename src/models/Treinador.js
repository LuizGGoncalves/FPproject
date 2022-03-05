const { Model, DataTypes } = require('sequelize');
const Aluno = require('../models/Aluno')
const bcrypt = require('bcryptjs');

class Treinador extends Model {
    
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len:{
                        args: [3, 255],
                        msg: 'O Campo Nome Nao Pode Ser Vazio'
                    }
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: {
                        msg: 'Email nao Valido'
                    }
                }
            },
            hashPassword: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ''
            },
            password: {
                type: DataTypes.VIRTUAL,
                defaultValue: '',
                validate: {
                    len: {
                        args: [6, 25],
                        msg: 'A senha deve conter entre 6 a 25 caracteres',
                    }
                }
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