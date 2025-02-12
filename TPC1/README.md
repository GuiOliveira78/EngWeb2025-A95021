# TPC1

**Data:** 12/02/2025

## Aluno

**Nome:** Guilherme Oliveira

**ID:** a95021

**Fotografia:**

<img src=https://i.imgur.com/ag9VyrP.jpg alt="Fotografia" style="width:20%;">

### Resumo
O programa desenvolvido processa um ficheiro JSON com dados de reparações automóveis e disponibiliza uma interface web para consulta dos mesmos.

##### Processamento de Dados

Comecei por criar um programa em python ([_editReparacoes.py_](editReparacoes.py))que, através da função [__editReparacoes_](editReparacoes.py#L3), carrega os dados do ficheiro [_dataset_reparacoes.json_](dataset_reparacoes.json) e reorganiza a informação em três categorias principais:
	•	**[Reparações:](reparacoes_reorganizadas.json#L2)** Cada reparação é identificada por um ID único e inclui informações sobre o cliente, a viatura e as intervenções realizadas.
	•	**[Intervenções:](reparacoes_reorganizadas.json#L90042)** São extraídos e organizados os códigos, nomes e descrições das intervenções efetuadas.
	•	**[Viaturas:](reparacoes_reorganizadas.json#L90169)** São registadas as viaturas reparadas, evitando duplicação e acumulando o número de intervenções associadas e os respetivos códigos.

O resultado é guardado no ficheiro [_reparacoes_reorganizadas.json_](reparacoes_reorganizadas.json), que será utilizado como fonte de dados para o JSON Server.

##### Servidor Web

Através do servidor construído em [_server.js_](server.js), é disponibilizada uma API em Node.js que permite consultar as listas de reparações, intervenções e viaturas. O servidor escuta na porta 1234 e responde a diferentes pedidos:
	•	**[/](server.js#L12)** → Página principal com links para as listas de reparações, intervenções e viaturas.
	•	**[/reparacoes](server.js#L23)** → Lista todas as reparações registadas.
	•	**[/reparacoes/{id}](server.js#L48)** → Exibe detalhes sobre uma reparação específica.
	•	**[/intervencoes](server.js#L78)** → Lista todas as intervenções registadas.
	•	**[/intervencoes/{codigo}](server.js#L99)** → Apresenta detalhes de uma intervenção específica.
	•	**[/viaturas](server.js#L120)** → Lista todas as viaturas registadas.
	•	**[/viaturas/{matricula}](server.js#L141)** → Exibe informações sobre uma viatura específica.

O servidor obtém os dados do JSON server criado anteriormente que se encontra na porta 3000, utilizando Axios para fazer as requisições HTTP. Caso ocorra um erro, são retornadas mensagens apropriadas com os códigos de estado correspondentes.

##### Extras

Criei ainda um pequeno programa em python ([_checkMatriculas.py_](checkMatriculas.py)) que verifica quais as matrículas que têm mais do que uma reparação associada no ficheiro [_dataset_reparacoes.json_](dataset_reparacoes.json). Isto serviu apenas para efetuar algumas verificações.

### Resultados (lista com apontadores para os ficheiros)
Ficheiros:
	•	[_dataset_reparacoes.json_](dataset_reparacoes.json) (Dataset Original)
    •   [_checkMatriculas.py_](checkMatriculas.py)
    •	[_editReparacoes.py_](editReparacoes.py)
    •   [_reparacoes_reorganizadas.json_](reparacoes_reorganizadas.json) (Dataset Reorganizado)
    •	[_server.js_](server.js)