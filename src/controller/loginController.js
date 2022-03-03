const bcrypt = require('bcryptjs/dist/bcrypt');
const flash = require('connect-flash/lib/flash');
const Aluno = require('../models/Aluno');
const Treinador = require('../models/Treinador');
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
        if(req.body.userType === 'on'){
            const novoTreinador = await Treinador.create(req.body);
            res.send('Treinador Criado');
        }
        if(req.body.userType === undefined){
            const novoAluno = await Aluno.create(req.body);
            res.send('Aluno criado');
        }
    }catch(e){
        console.log(e);
        res.send('deu ruim mano',e)
    }
}