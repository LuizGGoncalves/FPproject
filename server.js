const express = require('express');
const session = require('express-session');
const {dbConnection,connection} = require('./src/database/index');
const MySqlStore = require("express-mysql-session")(session);
const flash = require('connect-flash');
const path = require('path')
const app = express();
const csrf = require('csurf');
const routes = require('./routes');
const { csrfMiddleware } = require('./src/middlewares/middleware');

/*Banco de dados*/
const sessionStore = new MySqlStore({
    host:'localhost',
    port: 3306,
    user:'root',
    password: '',
    database:'fpproject',
})
const sessionOptions = session({
    key: 'session_cookie_name',
    secret: 'asdasdasdasd',
    store: sessionStore,
    resave: false,
    saveUninitialized:false,
});

/*Configurando Express */
app.use(express.json());
app.use(sessionOptions);
app.use(flash());
app.use(express.urlencoded({extended: true}));
app.set(express.static(path.resolve(__dirname,'public')));
app.set('views', path.resolve(__dirname,'src','views'));
app.set('view engine','ejs');

/*CRSF */
app.use(csrf());
app.use(csrfMiddleware);

/* Inicio Servidor */
dbConnection(connection,app);
app.on('DbReady',()=>{
    app.use(routes);
    app.listen(3000,() =>{
        console.log('Acessar http://localhost:3000/')
    })
});