# VidaPlus

VidaPlus é uma plataforma web simples para organizar consultas médicas, medicamentos e informações de saúde.

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
