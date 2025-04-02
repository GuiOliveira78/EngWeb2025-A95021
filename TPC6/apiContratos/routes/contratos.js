var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contrato')

/* GET contratos */
router.get('/', function(req, res, next) {
  Contrato.list()
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error))
});

/* POST contratos */
router.post('/', function(req, res, next) {
  Contrato.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(error => res.jsonp(error))
});

/* GET contrato */
router.get('/:id', function(req, res, next) {
  Contrato.findById(req.params.id)
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error))
});

/* PUT contrato */
router.put('/:id', function(req, res, next) {
  Contrato.update(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error))
});

/* DELETE contrato */
router.delete('/:id', function(req, res, next) {
  Contrato.delete(req.params.id)
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error))
});

module.exports = router;
