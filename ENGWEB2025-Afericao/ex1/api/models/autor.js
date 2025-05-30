var mongoose = require('mongoose');

var autorSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: String,
}, { versionKey: false });

module.exports = mongoose.model('Autor', autorSchema, 'autores');