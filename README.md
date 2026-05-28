# VidaPlus

VidaPlus é uma plataforma web simples para organizar consultas médicas, medicamentos e informações de saúde.

## Sobre o projeto

VidaPlus é um sistema acadêmico fullstack para gerenciamento pessoal de saúde. O backend oferece autenticação de usuário, persistência de dados em PostgreSQL, e APIs protegidas para gerenciamento de consultas e medicamentos. O frontend é uma interface em React que consome essa API e apresenta as principais telas de uma aplicação de saúde pessoal.

### Objetivos

- Permitir cadastro e login seguro com JWT.
- Registrar e gerenciar consultas médicas por usuário.
- Registrar e gerenciar medicamentos por usuário.
- Buscar endereço automaticamente a partir do CEP usando a API do ViaCEP.
- Fornecer rotas protegidas e experiência de uso consistente em React.
- Documentar e testar o backend com Jest e Supertest.

## Sprints e entregas

- **Sprint 1 — Entrega 15/05**
  - definição clara do escopo, tema e justificativa da stack
  - modelagem do banco de dados
  - estrutura inicial do repositório no GitHub
  - README com instruções de instalação
  - protótipo navegável ou esqueleto funcional de front-end e back-end
  - identificação e justificativa da API externa (ViaCEP)

- **Sprint 2 — Entrega 22/05**
  - implementação funcional de telas CRUD (mínimo de 2 telas)
  - backend com lógica de negócio operante
  - persistência de dados funcionando
  - integração com ViaCEP implementada
  - início da suíte de testes com unitários e integração
  - documentação de casos de teste em andamento

- **Sprint 3 — Entrega 29/05**
  - sistema completo com todas as 5 telas
  - 15 casos de uso implementados
  - testes unitários, de integração e end-to-end
  - relatório de cobertura de código (meta 70–80%)
  - relatório de análise estática de qualidade

## Documentação de casos de uso

1. Cadastro de usuário
   - O usuário informa nome, email, senha e CEP.
   - O sistema valida os dados, cadastra o usuário e armazena a senha criptografada.

2. Login de usuário
   - O usuário informa email e senha.
   - O sistema autentica e retorna token JWT para acessar as funcionalidades privadas.

3. Autenticação JWT para rotas privadas
   - Todas as rotas de consultas e medicamentos exigem token válido.
   - O backend valida o token e identifica o usuário logado.

4. Logout do usuário
   - O frontend remove o token JWT do `localStorage`.
   - O usuário é redirecionado para a tela de login.

5. Busca de endereço por CEP
   - O usuário informa o CEP no cadastro.
   - O sistema consulta a API externa ViaCEP e pré-preenche rua, bairro, cidade e estado.

6. Visualização de dashboard com consultas e medicamentos
   - O usuário acessa o painel principal.
   - O dashboard apresenta total de consultas, total de medicamentos e próxima consulta.

7. Cadastro de nova consulta
   - O usuário preenche médico, especialidade, data e notas.
   - O sistema salva a consulta vinculada ao usuário logado.

8. Listagem de consultas
   - O usuário visualiza todas as consultas cadastradas no painel.
   - O sistema busca apenas consultas do usuário autenticado.

9. Edição de consulta
   - O usuário seleciona uma consulta existente.
   - Pode alterar campos como data, médico, especialidade e notas.

10. Exclusão de consulta
    - O usuário remove uma consulta cadastrada.
    - A exclusão é feita apenas se a consulta pertencer ao usuário autenticado.

11. Cadastro de novo medicamento
    - O usuário informa nome, dosagem e horário.
    - O sistema salva o medicamento vinculado ao usuário.

12. Listagem de medicamentos
    - O usuário visualiza os medicamentos cadastrados.
    - O sistema retorna apenas itens associados ao usuário logado.

13. Edição de medicamento
    - O usuário altera os dados de um medicamento existente.
    - Campos como dosagem e horário podem ser atualizados.

14. Exclusão de medicamento
    - O usuário remove um medicamento do seu histórico.
    - Apenas o medicamento do usuário autenticado é deletado.

15. Proteção de rotas do painel pelo token
    - O frontend impede acesso ao painel sem token.
    - Usuários não autenticados são redirecionados para o login.

## Stack

- Backend: Node.js, Express, TypeORM, PostgreSQL, JWT, bcryptjs
- Frontend: React, Vite, Axios, React Router DOM
- Tests: Jest, Supertest
- Docker: Dockerfiles e docker-compose

## Pastas

- `back/` - backend Node.js com Express e TypeORM
- `vidaplus-front/` - frontend React com Vite
- `docker-compose.yml` - orquestra frontend e backend

## Backend

1. Acesse a pasta do backend:

```bash
cd back
```

2. Instale dependências:

```bash
npm install
```

3. Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

4. Ajuste `DATABASE_URL` para seu banco PostgreSQL (Neon DB) e `JWT_SECRET`.

5. Inicie em modo de desenvolvimento:

```bash
npm run dev
```

6. Execute os testes:

```bash
npm test
```

## Frontend

1. Acesse a pasta do frontend:

```bash
cd vidaplus-front
```

2. Instale dependências:

```bash
npm install
```

3. Crie o arquivo de ambiente local:

```bash
cp .env.example .env
```

4. Inicie o frontend:

```bash
npm run dev
```

## Docker

A aplicação pode rodar em containers com o seguinte comando:

```bash
docker-compose up --build
```

O frontend ficará disponível em `http://localhost:5173` e o backend em `http://localhost:3001`.

> Garanta que `back/.env` exista e aponte para um banco PostgreSQL válido.

## Rotas principais

- `POST /api/auth/register` - cadastro de usuário
- `POST /api/auth/login` - login e geração de token JWT
- `GET /api/users/address/:cep` - busca de endereço pelo CEP
- `GET/POST/PUT/DELETE /api/appointments` - CRUD de consultas
- `GET/POST/PUT/DELETE /api/medications` - CRUD de medicamentos
- `GET /api/docs` - documentação Swagger UI da API

## Observações

- O frontend usa `localStorage` para salvar o token JWT.
- O backend utiliza middleware de autenticação para rotas de consultas e medicamentos.
- O cadastro faz pré-preenchimento de endereço a partir do CEP com a API ViaCEP.
