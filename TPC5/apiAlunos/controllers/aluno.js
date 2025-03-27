var Aluno = require('../models/aluno')

module.exports.list = () => {
    return Aluno
        .find()
        .exec()
}

module.exports.findById = id => {
    return Aluno
        .findById(id)
        .exec()
}

module.exports.insert = aluno => {
    var newAluno = new Aluno(aluno)
    return newAluno.save()
}

module.exports.update = (id, aluno) => {
    return Aluno
        .findByIdAndUpdate(id, aluno, {new : true})
        .exec()
}

module.exports.delete = id => {
    return Aluno
        .findByIdAndDelete(id)
        .exec()

    // Aluno.findById(id).deleteOne().exec()
}

module.exports.inverteTpc = (idAluno, idTpc) => {
    return Aluno
        .findOne({_id : idAluno})
        .exec()
        .then( aluno => {
            var tpc = 'tpc' + idTpc
            if(aluno[tpc] != null){
                aluno[tpc] = !aluno[tpc]
            }else{
                aluno[tpc] = true
            }

            return Aluno
                .findByIdAndUpdate(idAluno, aluno, {new : true})
                .exec()
        })
}