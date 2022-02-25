const express = require('express');
const session = require('express-session');
const Sequelize = require('sequelize');
const SessionStore = require('connect-session-sequelize')(session.Store);
const flash = require('connect-flash');
const path = require('path')
const app = express();
const csurf = require('csurf');
const routes = require('./routes')

/*Banco de dados*/
const sequelize = new Sequelize('jgproject', 'root', null, {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
});
dbconnection = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully')
        app.emit('DbReady');
    } catch (e) {
        console.log(e)
        console.log('Connection fail whit DB');
    }
}
/*Configurando a session */
const sequelizeSessionStore = new SessionStore({db: sequelize});
const sessionOptions = session({
    secret:'asdasdasdasd',
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized:false,
    cookie:{
        maxAge: 1000*60*15,
        httOnly: true
    }
})
/*Configurando Express */
app.use(express.json());
app.use(sessionOptions);
app.use(flash());
app.use(express.urlencoded({extended: true}));
app.set(express.static(path.resolve(__dirname,'public')));
app.set('views', path.resolve(__dirname,'src','views'));
app.set('view engine','ejs');

/* Inicio Servidor */
dbconnection();
app.on('DbReady',()=>{
    app.use(routes);
    app.listen(3000,() =>{
        console.log('Acessar http://localhost:3000/')
    })
});