const { Model, DataTypes } = require('sequelize');
const Treinador = require('../models/Treinador');
const bcrypt = require('bcryptjs');

class Aluno extends Model{
    
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
                defaultValue:''
            },
            password: {
                type: DataTypes.VIRTUAL,
                defaultValue: '',
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
}

module.exports = Aluno