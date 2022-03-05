const { Model, DataTypes } = require('sequelize');
const Treinador = require('../models/Treinador');
const bcrypt = require('bcryptjs');

class Aluno extends Model{
    
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
                defaultValue:''
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
            alunoActive:{
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false
            },
            peso:{
                type: DataTypes.FLOAT,
                defaultValue: 0,
                allowNull: false
            },
            altura:{
                type: DataTypes.FLOAT,
                defaultValue: 0,
                allowNull: false
            },
            imc:{
                type: DataTypes.FLOAT,
                defaultValue: 0,
                allowNull: true
            },
            activeTraining: {
                type: DataTypes.STRING,
                defaultValue: '',
                allowNull: true
            }
        }, { sequelize });
        this.addHook('beforeSave', async (user) => {
            if(user.password) {
                user.hashPassword = await bcrypt.hash(user.password, 8);
            }
        })
    }
    static associate(models){
        this.belongsTo(models.Treinador, { foreignKey: 'treinador_id', as: 'treinador'});
    }

    static validAluno(body){
         body.email
    }
}

module.exports = Aluno