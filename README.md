# Projeto Alunos e Cursos

Este é um projeto desenvolvido com Node.js e Express para gerenciar cursos e alunos, incluindo funcionalidades de CRUD (Create, Read, Update, Delete) para cursos e alunos, além da capacidade de matricular alunos em cursos.

## Requisitos

Antes de executar o projeto, você precisa ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

Você pode verificar se tem o Node.js e npm instalados com os seguintes comandos:

```bash
node -v
npm -v
Se não estiverem instalados, você pode baixar o Node.js aqui e o npm será instalado automaticamente.

Instalação
Clone o repositório do projeto:

bash
Copiar
Editar
git clone https://github.com/SEU-USUARIO/alunoEcursos.git
Navegue até a pasta do projeto:

bash
Copiar
Editar
cd alunoEcursos
Instale as dependências do projeto:

bash
Copiar
Editar
npm install
Execução do Servidor
Após a instalação das dependências, você pode iniciar o servidor com o seguinte comando:

bash
Copiar
Editar
npm start
Isso iniciará o servidor na porta 3001 por padrão. Se a porta 3001 já estiver sendo usada, o servidor tentará usar a porta 3002. O servidor ficará disponível em http://localhost:3001.

API
Cursos
1. GET /cursos
Lista todos os cursos cadastrados.

Resposta: Um array com todos os cursos cadastrados.

2. POST /cursos
Cria um novo curso.

Corpo da Requisição:

json
Copiar
Editar
{
  "nome": "Nome do Curso",
  "cargaHoraria": 40
}
Resposta: O novo curso criado com o ID atribuído.

3. PUT /cursos/:id
Atualiza um curso pelo ID.

Corpo da Requisição:

json
Copiar
Editar
{
  "nome": "Novo Nome",
  "cargaHoraria": 60
}
Resposta: O curso atualizado.

4. DELETE /cursos/:id
Exclui um curso pelo ID.

Resposta: Mensagem confirmando a exclusão.

Alunos
1. GET /alunos
Lista todos os alunos cadastrados.

Resposta: Um array com todos os alunos cadastrados.

2. POST /alunos
Cria um novo aluno.

Corpo da Requisição:

json
Copiar
Editar
{
  "nome": "Nome do Aluno",
  "idade": 20
}
Resposta: O novo aluno criado com o ID atribuído.

3. PUT /alunos/:id
Atualiza os dados de um aluno pelo ID.

Corpo da Requisição:

json
Copiar
Editar
{
  "nome": "Novo Nome",
  "idade": 21
}
Resposta: O aluno atualizado.

4. DELETE /alunos/:id
Exclui um aluno pelo ID.

Resposta: Mensagem confirmando a exclusão.

5. POST /alunos/:id/matricular
Matricula um aluno em um curso.

Corpo da Requisição:

json
Copiar
Editar
{
  "cursoId": 1
}
Resposta: Mensagem confirmando a matrícula do aluno no curso.

Erros Comuns
400 - Bad Request: Caso o corpo da requisição não esteja correto (ex: campos obrigatórios faltando ou tipo de dado incorreto).

404 - Not Found: Caso o recurso solicitado não exista (ex: curso ou aluno com o ID não encontrado).

409 - Conflict: Caso um aluno já esteja matriculado no curso.

Testes
O projeto utiliza o framework de testes Jest para testar as APIs. Para rodar os testes, siga os seguintes passos:

Instale as dependências de testes:

bash
Copiar
Editar
npm install --save-dev jest supertest
Para rodar os testes, use o comando:

bash
Copiar
Editar
npm test
Executando os testes com o Jest
Jest executará automaticamente os testes definidos no arquivo app.test.js. O servidor será iniciado e os testes serão executados para testar o CRUD de cursos, alunos e a matrícula de alunos nos cursos.

Observação: Certifique-se de que não há nenhuma instância do servidor rodando na porta 3001 antes de iniciar os testes. Caso a porta esteja em uso, será gerado o erro EADDRINUSE. Para resolver, feche a instância existente ou altere a porta usada no código de teste (no arquivo app.test.js).

Contribuição
Se você deseja contribuir para o projeto, fique à vontade! Para isso, siga os seguintes passos:

Faça um fork do repositório.

Crie uma branch para sua modificação.

Faça suas mudanças e comite-as.

Abra um pull request descrevendo suas mudanças.

markdown
Copiar
Editar

### Explicação das seções:

1. **Requisitos**: Instruções para garantir que o ambiente esteja pronto para executar o projeto.
2. **Instalação**: Passos para clonar o repositório e instalar as dependências.
3. **Execução do Servidor**: Como iniciar o servidor para rodar a API.
4. **API**: Descrição detalhada de cada endpoint da API.
5. **Testes**: Como executar os testes do projeto usando o Jest e Supertest.
6. **Contribuição**: Como colaborar com o projeto.
7. **Licença**: Informações sobre a licença do projeto.

Com esse `README.md`, seu projeto ficará bem documentado, facilitando a instalação, execução e colaboração.
