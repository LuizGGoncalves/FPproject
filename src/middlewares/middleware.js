const Treinador = require('../models/Treinador')


exports.csrfMiddleware = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.middlewareVariaveis = (req,res,next) => {
     if(req.session.user){
         res.locals.user = req.session.user
     }else{
         res.locals.user = null
     }
     next();
}

exports.findTreinadores = async (req,res,next) => {
    res.locals.treinadoresList = await Treinador.findAll();
    next();
}
