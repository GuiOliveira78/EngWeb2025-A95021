module.exports.FindManyByIds = async (ids) => {
    return Autor
        .find({ _id: { $in: ids } })
        .exec();
}
var Autor = require('../models/autor');

module.exports.List = async () => {
    return Autor
        .find()
        .exec();
}

module.exports.FindById = async (id) => {
    return Autor
        .findById(id)
        .exec();
}