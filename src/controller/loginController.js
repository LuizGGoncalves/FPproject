const bcrypt = require('bcryptjs/dist/bcrypt');
const flash = require('connect-flash/lib/flash');
const User = require('../models/User')

exports.index = (req,res) => {
    res.render('login');
}
exports.login = async (req,res) => {
    try{
        const usuario = await User.findOne({where: { email: req.body.email}});
        if(!usuario){
            console.log('Usuario nao encontrado')
            flash()
            return;}
        if(!bcrypt.compareSync(req.body.password,usuario.hashPassword)){
            console.log('Erro ao logar');
            return;
        }
        req.session.user = usuario;
        req.session.save(()=>{
            console.log('Funcionou')
            console.log(req.session.user);
            return res.redirect('/')
        })

    }catch(e){
        res.send(req.body)
    }
}
exports.logout = async (req,res) => {
    try{
        req.session.destroy();
        res.redirect('/')
    }catch(e){
        console.log('Erro ao deletar o Usuario');
    }
}
exports.registerIndex = (req,res) => {
    res.render('register');
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