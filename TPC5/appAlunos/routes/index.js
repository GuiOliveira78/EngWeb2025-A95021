var express = require('express');
var router = express.Router();
var axios = require('axios');
var bodyParser = require('body-parser');
const { title } = require('process');
const { parse } = require('querystring');

router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index',
    {
      title: 'Engenharia Web 2025!',
      docente: 'GO',
      instituicao: 'DI-UM'
    });
});

/* GET alunos */
router.get('/alunos', function (req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/alunos')
    .then(resp => {
      res.render('lista_alunos', { lalunos: resp.data, title: 'Lista de Alunos', d: d });
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});

/* GET aluno */
router.get('/alunos/:id([AP]\\d+)', function (req, res) {

  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/alunos/' + req.params.id)
    .then(resp => {
      res.render('aluno', { aluno: resp.data, title: 'Aluno', d: d });
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });

});

/* GET editar aluno */
router.get('/alunos/edit/:id', function (req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/alunos/' + req.params.id)
    .then(resp => {
      res.render('edit_aluno', { aluno: resp.data, title: 'Editar Aluno', d: d });
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});

/* POST editar aluno */
router.post('/alunos/edit/:id', function (req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.put('http://localhost:3000/alunos/' + req.params.id, req.body)
    .then(resp => {
      res.render('aluno', { aluno: resp.data, title: 'Aluno', d: d });
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});

/* DELETE aluno */
router.get('/alunos/delete/:id', function (req, res) {
  axios.delete('http://localhost:3000/alunos/' + req.params.id)
    .then(resp => {
      res.redirect('/alunos');
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});

router.get('/alunos/add', function (req, res) {
  var d = new Date().toISOString().substring(0, 10)
  res.render('addAluno', { title: "Adicionar Aluno", data: d });
});

/* POST novo aluno */
router.post('/alunos/add', function (req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.post('http://localhost:3000/alunos', req.body)
    .then(resp => {
      res.render('aluno', { aluno: resp.data, title: 'Aluno', d: d });
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
})

module.exports = router;
