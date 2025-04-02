var express = require('express');
var router = express.Router();
var axios = require('axios');
var bodyParser = require('body-parser');
const { title } = require('process');
const { parse } = require('querystring');

router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
    { 
      title: 'Engenharia Web 2025!', 
      docente: 'GO', 
      instituicao: 'DI-UM'
    });
});

/* GET contratos */
router.get('/contratos', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/')
    .then(resp => {
      console.log("Dados: " + resp.data[0]);
      res.render('lista_contratos', { lcontratos: resp.data, title: 'Lista de Contratos', d: d });
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});

/* GET contrato */
router.get('/contratos/:id(\\d+)', function (req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/' + req.params.id)
    .then(resp => {
      res.render('contrato', { contrato: resp.data, title: 'Contrato: ', d: d });
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});

/* GET editar contrato */
router.get('/contratos/edit/:id', function (req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/' + req.params.id)
    .then(resp => {
      res.render('edit_contrato', { contrato: resp.data, title: 'Editar Contrato', d: d });
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});

/* POST editar contrato */
router.post('/contratos/edit/:id', function (req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.put('http://localhost:3000/' + req.params.id, req.body)
    .then(resp => {
      res.render('contrato', { contrato: resp.data, title: 'Contrato', d: d });
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});

/* DELETE contrato */
router.get('/contratos/delete/:id', function (req, res) {
  axios.delete('http://localhost:3000/' + req.params.id)
    .then(resp => {
      res.redirect('/contratos');
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});

/* GET adicionar contrato */
router.get('/contratos/add', function (req, res) {
  var d = new Date().toISOString().substring(0, 10)
  res.render('add_contrato', { title: "Adicionar Contrato", data: d });
});

/* POST novo contrato */
router.post('/contratos/add', function (req, res) {
  var d = new Date().toISOString().substring(0, 16)
  req.body._id = new Date().getTime(); // Gera um ID único com timestamp
  axios.post('http://localhost:3000/', req.body)
    .then(resp => {
      //res.render('contrato', { contrato: resp.data, title: 'Contrato', d: d });
      console.log("Dados: ", JSON.stringify(req.body, null, 2));
      return res.redirect('/contratos');
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
})

module.exports = router;
