const  url = new URL(process.env.JAWSDB_URL)

module.exports = {
    database: url.pathname.slice(1),
    host: url.hostname,
    port: url.port,
    dialect: "mysql",
    username: url.username,
    password: url.password,
    storage: './session.mysql',
    define: {
        timestamps:true,
        underscored:true,
    }
};