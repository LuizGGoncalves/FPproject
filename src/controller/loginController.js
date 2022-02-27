const User = require('../models/User')

exports.registerIndex = (req,res) => {
    res.render('register');
}
exports.index = (req,res) => {
    res.render('login');
}
exports.login = (req,res) => {
    console.log(req.body);
    res.send(req.body)
}

exports.register = async (req,res) => {
    try{
        const novoUser = await User.create(req.body);
        return res.send(novoUser);
    }catch(e){
        console.log(e);
        res.send('deu ruim mano',e)
    }
}