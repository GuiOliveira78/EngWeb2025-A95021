var Livro = require('../models/livro')

module.exports.list = () => {
    console.log("Fetching all books from the database...");
    return Livro
        .find()
        .exec()
        .then(data => {
            console.log("Books retrieved:", data);
            return data;
        })
        .catch(error => {
            console.error("Error fetching books:", error);
            throw error;
        });
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