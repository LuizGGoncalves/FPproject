const req = require('express/lib/request');
const Aluno = require('../models/Aluno')

exports.index = async (req, res) => {
    const alunos = await Aluno.findAll({ where: { treinador_id: res.locals.user.id } })

    res.render('alunos', { alunos });
}

exports.defineTreino = async (req, res) => {
    try {
        console.log(req.params);
        const alunoUpDate = await Aluno.update({activeTraining: req.params.treinoId }, {
            where: {
                id: req.params.alunoId
            }
        })
        res.redirect('/alunos')
    } catch (e) {
        console.log(e)
    }
}