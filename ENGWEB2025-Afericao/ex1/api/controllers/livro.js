var Livro = require('../models/livro')

module.exports.list = () => {
    return Livro
        .find()
        .exec()
}

module.exports.findByCharacter = (character) => {
    return Livro
        .find({ characters: { $in: [character]} }) // Insensitive case
        .exec()
}

module.exports.findByGenre = (genre) => {
    return Livro
        .find({ genres: { $in: [genre] } })
        .exec()
}

module.exports.listGenres = () => {
    return Livro
        .distinct('genres')
        .exec()
}

module.exports.listCharacters = () => {
    return Livro
        .distinct('characters')
        .exec()
}

module.exports.findById = id => {
    return Livro
        .findById(id)
        .exec()
}

module.exports.insert = livro => {
    var newLivro = new Livro(livro)
    return newLivro.save()
}

module.exports.update = (id, livro) => {
    return Livro
        .findByIdAndUpdate(id, livro, {new : true})
        .exec()
}

module.exports.delete = id => {
    return Livro
        .findByIdAndDelete(id)
        .exec()
}