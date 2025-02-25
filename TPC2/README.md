# TPC2

**Data:** 24/02/2025

## Aluno

**Nome:** Guilherme Oliveira

**ID:** a95021

**Fotografia:**

<img src=https://i.imgur.com/ag9VyrP.jpg alt="Fotografia" style="width:20%;">

### Resumo
Este TPC teve como objetivo construir um serviço em nodejs que consumisse a API de dados servida pelo json-server da escola de música ([db.json](./db.json)) e servir um website.
Para isto criei o ficheiro [escola_server.js](./escola_server.js) onde é criado o servidor que responde aos seguintes pedidos:
- **[/](./escola_server.js#L10#L14)** -> listas disponíveis
- **[/alunos](./escola_server.js#L15#L28)** -> lista de alunos
- **[/cursos](./escola_server.js#L29#L42)** -> lista de cursos
- **[/instrumentos](./escola_server.js#L43#56)** -> lista de instrumentos
- **[/alunos/{id}](./escola_server.js#L57#L71)** -> informação do aluno com Id igual a {id}
- **[/cursos/{id}](./escola_server.js#L72#L86)** -> informação do curso com Id igual a {id}
- **[/instrumentos/{id}](./escola_server.js#L87#L112)** -> informação do instrumento com Id igual a {id}
- **[/w3.css](./escola_server.js#L113#L124)** -> stylesheet
- **[/favicon.ico](./escola_server.js#L125#L136)** -> favicon

Todos os pedidos (exceto **/w3.css** e **/favicon.ico**) têm uma página _html_ pré definida em [mypages.js](./mypages.js) que será usada pelo servidor para gerar a página do respetivo pedido com as informações pretendidas. Em algumas das páginas podemos encontrar referências (_href_) que nos redirecionam para outras páginas referidas acima.

### Resultados (lista com apontadores para os ficheiros)
- [db.json](./db.json)
- [escola_server.js](./escola_server.js)
- [mypages.js](./mypages.js)