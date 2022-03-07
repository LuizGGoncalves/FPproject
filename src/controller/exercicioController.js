const Exercicio = require("../models/Exercicio")

exports.create = async (req,res) => {
    try{
    const novoExercicio = await Exercicio.create({
        treino_id: req.params.id,
        grupo: req.body.grupo,
        nome: req.body.nome,
        desc: req.body.desc,
        serie: req.body.serie,
        repeticao: req.body.repeticao,
    });
    res.redirect(`/treino/show/${req.params.id}`);
    }catch(e){
        console.log(e);
    } 
}

exports.editIndex = async (req,res) => {
    try{
        const exercicio = await Exercicio.findOne({where:{id:req.params.id}})
        res.render('editExercicio',{exercicio})
    }catch(e){
        console.log(e);
    }
}

exports.edit = async(req,res) => {
    try{
        const exercicioAntigo = await Exercicio.findOne({where:{id:req.params.id}})
        await exercicioAntigo.set({
            grupo: req.body.grupo,
            nome: req.body.nome,
            desc: req.body.desc,
            serie: req.body.serie,
            repeticao: req.body.repeticao,
        });
        await exercicioAntigo.save();
        res.redirect(`/treino/show/${exercicioAntigo.treino_id}`)
    }catch(e){
        console.log(e);
    }
}