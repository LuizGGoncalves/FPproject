module.exports = {
    database: 'fpproject',
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    username:'root',
    password: '',
    storage: './session.mysql',
    define: {
        timestamps:true,
        underscored:true,
    }
};
