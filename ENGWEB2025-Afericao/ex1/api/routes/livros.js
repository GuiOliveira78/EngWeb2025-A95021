var express = require('express');
var router = express.Router();
var Livro = require('../controllers/livro')

/* GET livros */
router.get('/', function(req, res, next) {
  Livro.list()
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error))
});

/* POST livros */
router.post('/', function(req, res, next) {
  Livro.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(error => res.jsonp(error))
});

/* GET livro */
router.get('/:id', function(req, res, next) {
  Livro.findById(req.params.id)
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error))
});

/* PUT livro */
router.put('/:id', function(req, res, next) {
  Livro.update(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error))
}); 

/* DELETE livro */
router.delete('/:id', function(req, res, next) {
  Livro.delete(req.params.id)
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error))
});


module.exports = router;
