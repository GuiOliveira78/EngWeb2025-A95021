var Livro = require('../models/livro')

module.exports.List = () => {
    return Livro
        .find()
        .exec()
}

module.exports.FindById = (id) => {
    return Livro
        .findById(id)
        .exec()
}

module.exports.FindByCharacter = (character) => {
    return Livro
        .find({ characters: { $in: [character] } }) // Insensitive case
        .exec()
}

module.exports.FindByGenre = (genre) => {
    return Livro
        .find({ genres: { $in: [genre] } })
        .exec()
}

module.exports.ListGenres = () => {
    return Livro
        .distinct('genres')
        .exec()
}

module.exports.ListCharacters = () => {
    return Livro
        .distinct('characters')
        .exec()
}

module.exports.Insert = (livro) => {
    var newLivro = new Livro(livro)
    return newLivro.save()
}

module.exports.Delete = (id) => {
    return Livro
        .findByIdAndDelete(id)
        .exec()
}

module.exports.Update = (id, livro) => {
    return Livro
        .findByIdAndUpdate(id, livro, { new: true })
        .exec()
}

module.exports.FindByAuthor = (author) => {
    return Livro
        .find({ author: { $regex: new RegExp('^' + author + '$', 'i') } }) // Pesquisa case-insensitive e exata
        .exec()
}