var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET / */
router.get('/', async function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  try {
    const [livrosResp, autoresResp] = await Promise.all([
      axios.get('http://localhost:17000/books'),
      axios.get('http://localhost:17000/authors')
    ]);

    const livros = livrosResp.data;
    const autores = autoresResp.data;

    // Mapa de autores por ID
    const autoresMap = new Map(autores.map(a => [a._id, a]));

    // Substituir os IDs de autores em cada livro pelos objetos autor
    const livrosComAutores = livros.map(livro => {
      livro.author = (livro.author || []).map(id => autoresMap.get(id)).filter(a => a !== undefined);
      return livro;
    });

    res.render('books', { lbooks: livrosComAutores, title: 'Livros', d: d });
  } catch (error) {
    console.log(error);
    res.render('error', { error: error });
  }
});

/* GET /books/:id */
router.get('/:id', async function(req, res, next) {
  const d = new Date().toISOString().substring(0, 16);
  try {
    const livroResp = await axios.get('http://localhost:17000/books/' + req.params.id);
    const livro = livroResp.data;

    const autoresResp = await Promise.all(
      livro.author.map(id => axios.get('http://localhost:17000/authors/' + id))
    );
    const autores = autoresResp.map(resp => resp.data);

    res.render('book', {
      book: livro,
      authors: autores,
      title: 'Detalhes do Livro',
      d: d
    });
  } catch (error) {
    console.log(error);
    res.render('error', { error: error });
  }
});

/* GET /entidades/:idAutor */
router.get('/entidades/:idAutor', async function(req, res, next) {
  try {
    const [autorResp, livrosResp] = await Promise.all([
      axios.get('http://localhost:17000/authors/' + req.params.idAutor),
      axios.get('http://localhost:17000/books/author/' + req.params.idAutor)
    ]);

    const d = new Date().toISOString().substring(0, 16);
    res.render('author', {
      author: autorResp.data,
      books: livrosResp.data,
      d: d,
      title: 'Detalhes do Autor'
    });
  } catch (error) {
    console.log(error);
    res.render('error', { error: error });
  }
});

module.exports = router;
