### Dataset e Queries

Manter dataset apenas **[uma lista]** pra importar da seguinte forma 

Abrir Docker Desktop
Iniciar o container

**Copiar ficheiro para o container do docker**
```docker cp books.json mongoEW:/tmp```

**Importar json para o mongo**
```docker exec mongoEW mongoimport -d livros -c livros /tmp/books.json --jsonArray```
```docker exec mongoEW mongoimport -d livros -c autores /tmp/authors.json --jsonArray```

**Abrir shell do docker**
```docker exec -it mongoEW sh```

**Entrar na shell do mongo dentro da shell do docker**
```mongosh```


### API de Dados

**Preencher para inicializar projeto**
```npm init```

**Criar projeto express com a view a pug**
```npx express-generator --view=pug```

**Install todas as dependências**
```npm i```