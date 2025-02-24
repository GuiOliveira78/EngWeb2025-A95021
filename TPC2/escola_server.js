import { createServer } from 'http'
import axios from 'axios';
import { genMainPage, genAlunosPage, genCursosPage, genInstrumentosPage, genAlunoPage, genCursoPage, genInstrumentoPage } from './mypages.js'
import { readFile } from 'fs'

createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(req.url == '/'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write(genMainPage(d))
        res.end()  
    }
    else if(req.url == '/alunos'){
        axios.get('http://localhost:3000/alunos')
            .then(function(resp){
                var lalunos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genAlunosPage(lalunos, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url == '/cursos'){
        axios.get('http://localhost:3000/cursos')
            .then(function(resp){
                var lcursos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genCursosPage(lcursos, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url == '/instrumentos'){
        axios.get('http://localhost:3000/instrumentos')
            .then(function(resp){
                var linstrumentos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genInstrumentosPage(linstrumentos, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url.match(/\/alunos\/[\w-]+$/)){
        var aluno = req.url.split("/")[2]
        axios.get('http://localhost:3000/alunos/' + aluno)
            .then(function(resp){
                var aluno = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genAlunoPage(aluno, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url.match(/\/cursos\/[\w]+$/)){
        var curso = req.url.split("/")[2]
        axios.get('http://localhost:3000/cursos/' + curso)
            .then(function(resp){
                var curso = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genCursoPage(curso, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url.match(/\/instrumentos\/[\w]+$/)){
        var instrumento = req.url.split("/")[2]
        axios.get('http://localhost:3000/instrumentos/' + instrumento)
            .then(function (resp) {
                var instrumento = resp.data

                axios.get('http://localhost:3000/alunos')
                    .then(function (resp) {
                        var lalunos = resp.data
                        var alunosInstrumento = lalunos.filter(a => a.instrumento == instrumento['#text'])
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write(genInstrumentoPage(instrumento, alunosInstrumento, d))
                        res.end()
                    })
                    .catch(erro => {
                        console.log("Erro: " + erro)
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.end('<p>Erro na obtenção dos alunos: ' + erro + '</p>')
                    })
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url.match(/\/w3\.css$/)){
        readFile("w3.css", function(erro, dados){
            if(erro){
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>')
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.end(dados)
            }
        })
    }
    else if(req.url.match(/favicon\.ico$/)){
        readFile("car.png", function(erro, dados){
            if(erro){
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>')
            }
            else{
                res.writeHead(200, {'Content-Type': 'image/png'})
                res.end(dados)
            }
        })
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end('<p>Operação não suportada: ' + req.url + '</p>')
    }
}).listen(3024)

console.log('Servidor à escuta na porta 3024...')

