var express = require('express');
var router = express.Router();
var Livro = require('../controllers/livro');

/* GET / redirect para /books. */
router.get('/', function(req, res, next) {
  res.redirect('/books');
});

/* GET /books: */
router.get('/books', function(req, res, next) {
  if (req.query.character) {
    Livro.FindByCharacter(req.query.character)
      .then(data => res.jsonp(data))
      .catch(error => res.jsonp(error));
  }
  else if (req.query.genre) {
    Livro.FindByGenre(req.query.genre)
      .then(data => res.jsonp(data))
      .catch(error => res.jsonp(error));
  }
  else { Livro.List()
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error));
  }
});

/* GET /books/genres */
router.get('/books/genres', function(req, res, next) {
  Livro.ListGenres()
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error));
});

/* GET /books/characters */
router.get('/books/characters', function(req, res, next) {
  Livro.ListCharacters()
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error));
});

/* GET /books/:author */
router.get('/books/author/:author', function(req, res, next) {
  Livro.FindByAuthor(req.params.author)
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error));
});

/* GET /books/:id */
router.get('/books/:id', function(req, res, next) {
  Livro.FindById(req.params.id)
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error));
});

/* POST /books */
router.post('/books', function(req, res, next) {
  Livro.Insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(error => res.jsonp(error));
});

/* DELETE /books/:id */
router.delete('/books/:id', function(req, res, next) {
  Livro.Delete(req.params.id)
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error));
});

/* PUT /books/:id */
router.put('/books/:id', function(req, res, next) {
  Livro.Update(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error));
});

module.exports = router;