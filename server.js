const express = require('express');
const session = require('express-session');
const {dbConnection,connection} = require('./src/database/index');
const MySqlStore = require("express-mysql-session")(session);
const flash = require('connect-flash');
const path = require('path')
const app = express();
const csrf = require('csurf');
const routes = require('./routes');
const { csrfMiddleware,middlewareVariaveis } = require('./src/middlewares/middleware');
const  url = new URL(process.env.JAWSDB_URL)
/*Banco de dados*/
const sessionStore = new MySqlStore({
    host:url.hostname,
    port: url.port,
    user:url.username,
    password: url.password,
    database: url.pathname.slice(1),
})
const sessionOptions = session({
    key: 'session_cookie_name',
    secret: 'asdasdasdasd',
    store: sessionStore,
    resave: false,
    saveUninitialized:false,
    cookie: {
        maxAge: 1000*60*60,
        httpOnly: true
    }
});

/*Configurando Express */
app.use(express.json());
app.use(sessionOptions);
app.use(flash());
app.use(express.urlencoded({extended: true}));
//app.set(express.static(path.join(__dirname, "/public")));
app.use(express.static("public"));
app.set('views', path.resolve(__dirname,'src','views'));
app.set('view engine','ejs');

/*CRSF */
app.use(csrf());
app.use(csrfMiddleware);

/*middleware*/
app.use(middlewareVariaveis);

/* Inicio Servidor */
const port = process.env.PORT || 3000

dbConnection(connection,app);
app.on('DbReady',()=>{
    app.use(routes);
    app.listen(port,() =>{
        console.log('Acessar http://localhost:3000/')
    })
});