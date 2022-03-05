const Aluno = require('../models/Aluno');
const Treinador = require('../models/Treinador');
const User = require('../models/User')
const bcrypt = require('bcryptjs');

exports.index = (req,res) => {
    res.render('login');
}
exports.login = async (req,res) => {
    try{
        const treinador = await Treinador.findOne({where: { email: req.body.email}});
        const aluno = await Aluno.findOne({where:{ email : req.body.email}});

        if(!treinador && !aluno){
            req.flash('errors','Usuario Nao encontrado');
            req.session.save(()=>{
                return res.redirect('/login')
            })
            return
        }
        if(!bcrypt.compareSync(req.body.password,aluno.hashPassword) || !bcrypt.compareSync(req.body.password,treinador.hashPassword) ){
            req.flash('errors','Usuario ou senha incorretos')
            req.session.save(()=>{
                return res.redirect('/login')
            })
            return;
        }
        req.session.user = usuario;
        req.session.save(()=>{
            req.flash('sucess',`Seja Bem vindo ${usuario.name}`)
            req.session.save(()=>{
              return  res.redirect('/');
            })
            return;
        })

    }catch(e){
        console.log(e)
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
        if(await (await Treinador.findAll({where:{email: req.body.email}})).length > 0 || await Aluno.findAll({where:{email:req.body.email}}) > 0){
            req.flash('errors',['Email Já Utilizado'])
            req.session.save(function(){
                return res.redirect('/register')
            });
            return;
        }

        if(req.body.userType === 'on'){
            const novoTreinador = await Treinador.create(req.body);
            req.flash('sucess',['Treinador Cadastado com sucesso'])
            req.session.save(()=>{
               return res.redirect('/');
            })
            return;
        }
        if(req.body.userType === undefined){
            const novoAluno = await Aluno.create(req.body);
            req.flash('sucess',['Aluno Cadastado com sucesso'])
            req.session.save(()=>{
               return res.redirect('/');
            })
            return;
        }
    }catch(e){
        e.errors.forEach(erro => {
            req.flash('errors',erro.message)
        });
        req.session.save(()=>{
            return res.redirect('/register');
         })
    }
}