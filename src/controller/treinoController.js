const Treino = require('../models/Treino')
const Aluno = require('../models/Aluno')
const Exercicio = require('../models/Exercicio')
const sequelize = require('sequelize')

exports.index = async (req, res) => {
    const treinos = await Treino.findAll({
        where: { aluno_id: req.params.id },
        attributes: ['duracao','nome', 'id', [sequelize.fn('date_format', sequelize.col('created_at'), '%Y-%m-%d'), 'createdAt'], [sequelize.fn('date_format', sequelize.col('updated_at'), '%Y-%m-%d'), 'updatedAt']]
    })
    const aluno = await Aluno.findOne({ where: { id: req.params.id } })
    res.render('treino', { treinos, aluno })
}

exports.showTreino = async (req, res) => {
    try {
        const listaExercicio = await Exercicio.findAll({ where: { treino_id: req.params.id }, order: [['grupo', 'ASC']] })
        const treino = await Treino.findOne({ where: { id: req.params.id } })
        const aluno = await Aluno.findOne({where:{id: treino.aluno_id},attributes:['name']})
        res.render('exercicios', { listaExercicio, treino, aluno })
    } catch (e) {
        console.log(e);
    }
}

exports.create = async (req, res) => {
    try {
        console.log(req.body)
        const novoTreino = await Treino.create({
            aluno_id: req.params.id,
            nome: req.body.nome,
            duracao: req.body.duracao,
        })
       return res.redirect(`/treino/show/${novoTreino.id}`);
    } catch (e) {
        console.log(e);
    }
}

exports.delet = async (req, res) => {
    try {
            const treino = await Treino.findOne({where: {id: req.params.id}})
            await Treino.destroy({where: {id: req.params.id}})
       return res.redirect(`/treino/index/${treino.aluno_id}`)
    } catch(e) {
        console.log(e)
    }
}

exports.upDate = async (req,res) => {
    try{
        const treino = await Treino.findOne({where:{id:req.params.id},attributes:['aluno_id']});
        await Treino.update({nome: req.body.nome, duracao: req.body.duracao},
            {where:{
                id: req.params.id
        }})
        res.redirect(`/treino/index/${treino.aluno_id}`)
    }catch(e){
        console.log(e)
    }
}

exports.editIndex = async (req,res) => {
    try{
    const treino = await Treino.findOne({where:{id:req.params.id}})
    res.render('editTreino',{treino})
    }catch(e){
        console.log(e)
    }
}