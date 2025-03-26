var express = require('express');
var router = express.Router();
var axios = require('axios');
var bodyParser = require('body-parser');
const { title } = require('process');
const { parse } = require('querystring');

router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index',
    { title: 'Engenharia Web 2025!',
      docente: 'GO',
      instituicao: 'DI-UM'
    });
});

router.get('/filmes', function (req, res) {
  axios.get('http://localhost:3000/filmes')
    .then(resp => {
      res.render('filmes', {lfilmes: resp.data, title: 'Lista de Filmes'});
    })
    .catch(error => {
      console.log(error);
      res.render('error', {error: error});
    });
});

// todos os filmes de um certo ator
router.get('/filmes/:ator', function (req, res) {
  axios.get('http://localhost:3000/filmes')
    .then(resp => {
      let filmes = resp.data.filter(f => f.cast.includes(req.params.ator));
      res.render('filmes', {lfilmes: filmes, title: 'Lista de Filmes de ' + req.params.ator});
    })
    .catch(error => {
      console.log(error);
      res.render('error', {error: error});
    });
});

// editar filme
router.get('/filmes/edit/:id', function (req, res) {
  axios.get('http://localhost:3000/filmes/' + req.params.id)
    .then(resp => {
      res.render('edit', {filme: resp.data, title: 'Editar Filme'});
    })
    .catch(error => {
      console.log(error);
      res.render('error', {error: error});
    });
});

router.post('/filmes/edit/:id', function (req, res) {
  // Remover elementos do cast que sejam ""
  req.body.cast = req.body.cast.filter(c => c != "");
  // Remover elementos do genres que sejam ""
  req.body.genres = req.body.genres.filter(g => g != "");
  axios.put('http://localhost:3000/filmes/' + req.params.id, req.body)
    .then(resp => {
      res.redirect('/filmes');
    })
    .catch(error => {
      console.log(error);
      res.render('error', {error: error});
    });
});

router.get('/filmes/delete/:id', function (req, res) {
  axios.delete('http://localhost:3000/filmes/' + req.params.id)
    .then(resp => {
      res.redirect('/filmes');
    })
    .catch(error => {
      console.log(error);
      res.render('error', {error: error});
    });
});

module.exports = router;
