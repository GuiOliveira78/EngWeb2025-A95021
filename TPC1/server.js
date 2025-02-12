const http = require('http')
const axios = require('axios')
const { stringify } = require('querystring')

http.createServer((req, res) => {
    console.log("METHOD: " + req.method)
    console.log("URL: " + req.url)
    
    switch (req.method) {
        case "GET":

            if (req.url == "/") {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }) // 200 OK
                res.write("<h1>Listas:</h1>")
                res.write("<ul>")
                res.write(`<li><a href='/reparacoes'>Lista de reparações</a></li>`)
                res.write(`<li><a href='/intervencoes'>Lista de intervenções</a></li>`)
                res.write(`<li><a href='/viaturas'>Lista de viaturas</a></li>`)
                res.write("</ul>")
                res.end()
            }

            else if (req.url == "/reparacoes") {
                axios.get('http://localhost:3000/reparacoes')
                    .then(resp => {
                        var reparacoes = resp.data
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<h1>Reparações:</h1>")
                        res.write("<ul>")
                        reparacoes.forEach(element => {
                            res.write(`<li><a href='/reparacoes/${element.id}'>
                                <p>Id: ${element.id}</p>
                                <p>Matrícula: ${element.matricula}</p>
                                <p>Data: (${element.data})</p>
                                </a></li>`)
                        });
                        res.write("</ul>")
                        res.write("<h6><a href='/'>Voltar</a></h6>") // Botão de voltar
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                        console.log(err)
                        res.end()
                    })
            }

            else if (req.url.match(/\/reparacoes\/.+/)) {
                var id = req.url.split("/")[2]
                axios.get(`http://localhost:3000/reparacoes/${id}`)
                    .then(resp => {
                        var reparacao = resp.data
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write(`<h1>Reparação: ${reparacao.id}</h1>`)
                        res.write(`<p>Id: ${reparacao.id}</p>`)
                        res.write(`<p>Nome do Cliente: ${reparacao.nome}</p>`)
                        res.write(`<p>NIF do Cliente: ${reparacao.nif}</p>`)
                        res.write(`<p>Data: ${reparacao.data}</p>`)
                        res.write(`<p>Matrícula: ${reparacao.matricula}</p>`)
                        res.write(`<p>Número de intervenções: ${reparacao.nr_intervencoes}</p>`)
                        res.write(`<p>Códigos das intervenções realizadas:</p>`)
                        res.write("<ul>")
                        reparacao.codigos_intervencoes.forEach(element => {
                            res.write(`<li>${element}</li>`)
                        })
                        res.write("</ul>")
                        res.write("<h6><a href='/reparacoes'>Voltar</a></h6>") // Botão de voltar
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                        console.log(err)
                        res.end()
                    })

            }

            else if (req.url == "/intervencoes") {
                axios.get('http://localhost:3000/intervencoes')
                    .then(resp => {
                        var intervencoes = resp.data
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<h1>Intervenções:</h1>")
                        res.write("<ul>")
                        intervencoes.forEach(element => {
                            res.write(`<li><a href='/intervencoes/${element.codigo}'><p>${element.nome}</p></a></li>`)
                        });
                        res.write("</ul>")
                        res.write("<h6><a href='/'>Voltar</a></h6>") // Botão de voltar
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                        console.log(err)
                        res.end()
                    })
            }

            else if (req.url.match(/\/intervencoes\/.+/)) {
                var codigo = req.url.split("/")[2]
                axios.get(`http://localhost:3000/intervencoes?codigo=${codigo}`)
                    .then(resp => {
                        var intervencao = resp.data[0]
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write(`<h1>Intervenção: ${intervencao.nome}</h1>`)
                        res.write(`<p>Código: ${intervencao.codigo}</p>`)
                        res.write(`<p>Nome: ${intervencao.nome}</p>`)
                        res.write(`<p>Descrição: ${intervencao.descricao}</p>`)
                        res.write("<h6><a href='/intervencoes'>Voltar</a></h6>") // Botão de voltar
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' }) // 500 Internal Server Error
                        console.log(err)
                        res.end()
                    })

            }

            else if (req.url == "/viaturas") {
                axios.get('http://localhost:3000/viaturas')
                    .then(resp => {
                        var viaturas = resp.data
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<h1>Viaturas:</h1>")
                        res.write("<ul>")
                        viaturas.forEach(element => {
                            res.write(`<li><a href='/viaturas/${element.matricula}'><p>${element.matricula}</p></a></li>`)
                        });
                        res.write("</ul>")
                        res.write("<h6><a href='/'>Voltar</a></h6>") // Botão de voltar
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                        console.log(err)
                        res.end()
                    })
            }

            else if (req.url.match(/\/viaturas\/.+/)) {
                var matricula = req.url.split("/")[2]
                axios.get(`http://localhost:3000/viaturas?matricula=${matricula}`)
                    .then(resp => {
                        var viatura = resp.data[0]
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write(`<h1>Viatura: ${viatura.matricula}</h1>`)
                        res.write(`<p>Matrícula: ${viatura.matricula}</p>`)
                        res.write(`<p>Marca: ${viatura.marca}</p>`)
                        res.write(`<p>Modelo: ${viatura.modelo}</p>`)
                        res.write(`<p>Número de intervenções: ${viatura.nr_intervencoes}</p>`)
                        res.write("<ul>")
                        viatura.codigos_intervencoes.forEach(element => {
                            res.write(`<li>${element}</li>`)
                        })
                        res.write("</ul>")
                        res.write("<h6><a href='/viaturas'>Voltar</a></h6>") // Botão de voltar
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' }) // 500 Internal Server Error
                        console.log(err)
                        res.end()
                    })

            }

            else{
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }) // 404 Not Found
                res.end()
            }
            
            break;
        default:
            res.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8' }) // 405 Method Not Allowed
            res.end()
            break;
    }
}).listen(1234)

console.log('Servidor à escuta na porta 1234...')