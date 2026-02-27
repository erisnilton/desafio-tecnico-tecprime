# Desafio Técnico – Desenvolvedor(a) Full Stack - Tecprime

Este repositório contém um projeto full stack desenvolvido como parte de um desafio técnico para a vaga de Desenvolvedor(a) Full Stack na Tecprime.

## 📁 Estrutura do Projeto

O projeto está organizado em dois módulos principais:

```
desafio-tecnico/
├── backend/     # API REST (NestJS + PostgreSQL)
└── frontend/    # Interface Web (React + Vite)
```

## 🚀 Início Rápido

Para executar o projeto completo localmente, você precisará rodar **backend e frontend simultaneamente** em terminais separados.

### Pré-requisitos

- Node.js 22+
- pnpm
- Docker e Docker Compose
- Git

### Executando o projeto

#### 0. Clone o repositório

```bash
git clone https://github.com/erisnilton/desafio-tecnico-tecprime
cd desafio-tecnico-tecprime
```

#### 1. Backend (API)

Consulte a documentação completa em: **[backend/README.md](backend/README.md)**

```bash
cd backend
pnpm install
docker compose up -d
pnpm run migrate:up
pnpm run seed
pnpm run start:dev
```

A API estará rodando em: http://localhost:3000

#### 2. Frontend (Interface Web)

Consulte a documentação completa em: **[frontend/README.md](frontend/README.md)**

```bash
cd frontend
pnpm install
pnpm dev
```

A aplicação estará disponível em: http://localhost:5173

### Credenciais de Teste

Após executar o seed do backend, use as seguintes credenciais para login:

- **Usuário:** `admin`
- **Senha:** `admin`

## 📚 Documentação Detalhada

- **[Backend](backend/README.md)** — Documentação da API, arquitetura, endpoints e tecnologias
- **[Frontend](frontend/README.md)** — Documentação da interface, rotas, integrações e componentes

## 🛠️ Tecnologias Principais

### Backend
- NestJS 11
- PostgreSQL
- Knex.js + Objection.js
- JWT + bcrypt
- Zod
- Docker

### Frontend
- React 19
- TypeScript
- Vite
- React Router DOM
- React Hook Form + Zod
- Axios
- UnoCSS

## 📋 Funcionalidades

- ✅ Autenticação JWT
- ✅ Catálogo de produtos (integração com API externa)
- ✅ Carrinho de compras com persistência local
- ✅ Checkout e criação de pedidos
- ✅ Histórico e detalhes de pedidos
- ✅ Validação de dados com Zod
- ✅ Interface responsiva

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular com separação clara de responsabilidades:

- **Backend:** Clean Architecture adaptada, com camadas de Entity, Repository, Service e Controller
- **Frontend:** Arquitetura baseada em componentes, com contextos globais para estado compartilhado

Para mais detalhes sobre as decisões arquiteturais, consulte o [backend/ARCHITECTURE.md](backend/ARCHITECTURE.md).

## 📝 Licença

Este projeto foi desenvolvido como desafio técnico.
