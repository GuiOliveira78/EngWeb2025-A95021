var Contrato = require('../models/contrato')

module.exports.list = () => {
    return Contrato
        .find()
        .exec()
}

module.exports.findById = id => {
    return Contrato
        .findById(id)
        .exec()
}

module.exports.insert = aluno => {
    var newContrato = new Contrato(aluno)
    return newContrato.save()
}

module.exports.update = (id, aluno) => {
    return Contrato
        .findByIdAndUpdate(id, aluno, {new : true})
        .exec()
}

module.exports.delete = id => {
    return Contrato
        .findByIdAndDelete(id)
        .exec()
}