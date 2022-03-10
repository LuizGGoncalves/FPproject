const req = require('express/lib/request');
const Aluno = require('../models/Aluno');
const Treino = require('../models/Treino');

exports.index = async (req, res) => {
    try {
        const alunos = await Aluno.findAll({ where: { treinador_id: res.locals.user.id } })
        for(const aluno of alunos){
            const treino = await Treino.findOne({ where: { id: aluno.activeTraining } })
            if (treino !== null) aluno.treinoName = treino.nome           
        };
        return res.render('alunos', { alunos });
    } catch (e) {
        console.log(e);
    }
}

exports.defineTreino = async (req, res) => {
    try {
        console.log(req.params);
        const alunoUpDate = await Aluno.update({ activeTraining: req.params.treinoId }, {
            where: {
                id: req.params.alunoId
            }
        })
        res.redirect('/alunos')
    } catch (e) {
        console.log(e)
    }
}