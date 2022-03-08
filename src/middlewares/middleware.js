const Treinador = require('../models/Treinador')

exports.csrfMiddleware = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.middlewareVariaveis = (req,res,next) => {
    res.locals.errors = req.flash('errors');
     if(req.session.user){
         res.locals.user = req.session.user
         res.locals.userIsTreinador = req.session.userIsTreinador
     }else{
         res.locals.user = null
         res.locals.userIsTreinador = null
     }
     next();
}

exports.checkLogin = (req,res,next) => {
    if(res.locals.user === null){
        res.redirect('/login')
    }
    next();
}

exports.checkTreinador = (req,res,next) => {
    if(res.locals.user === null){
        res.redirect('/login')
    }
    if(!res.locals.userIsTreinador ){
        res.redirect('/')
    }
    next();
}

exports.findTreinadores = async (req,res,next) => {
    res.locals.treinadoresList = await Treinador.findAll();
    next();
}
