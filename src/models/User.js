const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    
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
            }
        }, { sequelize });
        this.addHook('beforeSave', async (user) => {
            if(user.password) {
                user.hashPassword = await bcrypt.hash(user.password, 8);
            }
        })
        return this;
    }

    async userExist(){
        
    }
}



module.exports =  User
