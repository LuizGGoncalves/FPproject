const req = require("express/lib/request");
const res = require("express/lib/response");

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