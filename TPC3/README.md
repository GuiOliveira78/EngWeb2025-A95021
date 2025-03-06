# TPC3

**Data:** 06/03/2025

## Aluno

**Nome:** Guilherme Oliveira

**ID:** a95021

**Fotografia:**

<img src=https://i.imgur.com/ag9VyrP.jpg alt="Fotografia" style="width:20%;">

### Resumo
Este TPC consistiu em terminar o trabalho desenvolvido na aula prática 4 (25/02/2025), no qual construímos um serviço web para a gestão de alunos utilizando Node.js e json-server como backend de dados.

O servidor [alunos_server_skeleton.js](./alunos_server_skeleton.js), implementado em _JavaScript_ (_Node.js_), responde a diferentes tipos de pedidos HTTP e interage com o json-server para manipulação dos dados dos alunos.

Funcionalidades implementadas:
- **Listagem de alunos** (_/alunos_) – Obtém e exibe a lista de alunos armazenados no json-server;
- **Consulta de um aluno específico** (_/alunos/:id_) – Apresenta os detalhes de um aluno com base no seu ID;
- **Registo de um novo aluno** (_/alunos/registo_) – Exibe um formulário e permite inserir novos alunos na base de dados;
- **Edição de um aluno** (_/alunos/edit/:id_) – Permite alterar os dados de um aluno existente através de um formulário de edição;
- **Remoção de um aluno** (_/alunos/delete/:id_) – Encaminha o pedido ao servidor para eliminar um aluno.

Estratégia de Implementação:
- Para a geração das páginas HTML de resposta, foi desenvolvido o ficheiro [templates.js](./templates.js) que contém funções responsáveis por construir dinamicamente o conteúdo a ser exibido;
- O servidor faz uso da biblioteca Axios para comunicação com o json-server;
- A função auxiliar collectRequestBodyData() foi utilizada para processar dados de formulários enviados no formato application/x-www-form-urlencoded;
- Como os navegadores não suportam diretamente PUT e DELETE em formulários HTML, utilizei a abordagem de encapsular essas operações dentro de pedidos POST e GET, respetivamente.

### Resultados (lista com apontadores para os ficheiros)
- [templates.js](./templates.js)
- [alunos_server_skeleton.js](./alunos_server_skeleton.js)