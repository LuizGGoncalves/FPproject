const Aluno = require('../models/Aluno')

exports.index = async (req,res) => {
    const alunos = await Aluno.findAll({where:{treinador_id: res.locals.user.id}})
    
    res.render('alunos',{alunos});
}