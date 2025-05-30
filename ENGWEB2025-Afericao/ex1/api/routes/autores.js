var express = require('express');
var router = express.Router();
var Autor = require('../controllers/autor');

/* GET /authors */
router.get('/', function (req, res, next) {
    Autor.List()
            .then(data => res.jsonp(data))
            .catch(error => res.jsonp(error));
    
});

/* GET /authors/many?ids=id1,id2,id3 */
router.get('/many', function (req, res, next) {
    const ids = req.query.ids?.split(',');
    if (!ids || ids.length === 0) {
        return res.status(400).jsonp({ error: 'Missing or empty ids parameter' });
    }

    Autor.FindManyByIds(ids)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error));
});

/* GET /:id */
router.get('/:id', function (req, res, next) {
    Autor.FindById(req.params.id)
            .then(data => res.jsonp(data))
            .catch(error => res.jsonp(error));
});

module.exports = router;