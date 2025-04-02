var mongoose = require('mongoose')

var livrosSchema = new mongoose.Schema({
    _id : {type : String, require : true},
    title :  String,
    series : String,
    author : String,
    rating : String,
    description : String,
    language : String,
    isbn : String,
    genres : [String],
    characters : [String],
    bookFormat : String,
    edition : String,
    pages : String,
    publisher : String,
    publishDate : String,
    firstPublishDate : String,
    awards : [String],
    numRatings : String,
    ratingsByStars : [String],
    likedPercent : String,
    setting : [String],
    coverImg : String,
    bbeScore : String,
    bbeVotes : String,
    price : String,
}, {versionKey : false})

module.exports = mongoose.model('livro', livrosSchema)