const Treino = require('../models/Treino')
const Aluno = require('../models/Aluno')
const Exercicio = require('../models/Exercicio')
const sequelize = require('sequelize')

exports.index =  async (req,res) => {
    const treinos = await Treino.findAll({where: {aluno_id: req.params.id},
    attributes:[ 'id',[sequelize.fn('date_format', sequelize.col('created_at'), '%Y-%m-%d'), 'createdAt'],[sequelize.fn('date_format', sequelize.col('updated_at'), '%Y-%m-%d'), 'updatedAt']]
    })
    const aluno = await Aluno.findOne({where: {id: req.params.id}})
    res.render('treino',{treinos,aluno})
}

exports.showTreino = async (req,res) => {
    try{
        const listaExercicio = await Exercicio.findAll({where:{treino_id: req.params.id},order:[ ['grupo','ASC']]})
        const treino = await Treino.findOne({where:{id: req.params.id}})
        res.render('exercicios',{listaExercicio,treino})
    }catch(e){
        console.log(e);
    }
}

exports.create =  async (req,res) => {
    try{
    const novoTreino =  await Treino.create({aluno_id:req.params.id})
    res.send(novoTreino);
    }catch(e){
        console.log(e);
    }
}