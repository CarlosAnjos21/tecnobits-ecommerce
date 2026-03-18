# Tecnobits E-commerce – Projeto Final

Bem-vindo ao repositório do projeto de e-commerce da equipe Hardware (Capacita Brasil). Este monorepo contém o frontend (React + Vite) e o backend (Node.js + Express + Prisma) de uma loja de componentes de hardware com autenticação de usuários, gestão de produtos, carrinho, pedidos e fluxo de vendedores.

- **Repositório:** [CarlosAnjos21/tecnobits-ecommerce](https://github.com/CarlosAnjos21/tecnobits-ecommerce)
- **Branch:** `main`
- **Data:** 17/03/2026

---

## Sumário

1. [Visão Geral](#visão-geral)
2. [Arquitetura e Tech Stack](#arquitetura-e-tech-stack)
3. [Requisitos de Ambiente](#requisitos-de-ambiente)
4. [Configuração Rápida (monorepo)](#configuração-rápida-monorepo)
5. [Backend (API)](#backend-api)
   - [Variáveis de Ambiente](#variáveis-de-ambiente)
   - [Banco de Dados, Prisma e Migrations](#banco-de-dados-prisma-e-migrations)
   - [Rodando o servidor](#rodando-o-servidor)
   - [Seeds de dados](#seeds-de-dados)
   - [Estrutura de rotas principais](#estrutura-de-rotas-principais)
6. [Frontend (Web)](#frontend-web)
   - [Variáveis de Ambiente](#variáveis-de-ambiente-1)
   - [Rodando em desenvolvimento](#rodando-em-desenvolvimento)
   - [Build de produção](#build-de-produção)
7. [Fluxos de Usuário](#fluxos-de-usuário)
8. [Convenções, Scripts e Estrutura de Pastas](#convenções-scripts-e-estrutura-de-pastas)
9. [Troubleshooting](#troubleshooting)
10. [Deploy do Frontend (Vercel)](#-deploy-do-frontend-vercel)
11. [Deploy do Backend (Railway)](#-deploy-do-backend-railway)
12. [Licença](#licença)

---

## Visão Geral

Aplicação de e-commerce completa:

- Catálogo de produtos, categorias, carrinho, checkout e pedidos.
- Autenticação com JWT e perfis: cliente, vendedor e admin.
- Vendedor cadastra-se e aguarda aprovação do admin (bloqueio de login até status `active`).
- Upload de imagens de produtos via API servidas estaticamente.
- Frontend em React com Context API, React Router e Vite.

---

## Arquitetura e Tech Stack

- **Frontend:** React 19, Vite 7, React Router, Axios.
- **Backend:** Node 18+, Express 4, Prisma 5/6, PostgreSQL, JWT, bcrypt, multer, helmet, rate-limit.
- **Monorepo** com workspaces npm: `frontend` e `backend`.

---

## Requisitos de Ambiente

- Node.js LTS (18+) e npm.
- PostgreSQL (local ou gerenciado).
- Windows/macOS/Linux. Em dev, frontend usa `http://localhost:5173` e backend `http://localhost:3001`.

---

## Configuração Rápida (monorepo)

Na raiz do repositório:

```bash
# Instalar dependências de frontend e backend
npm run install:all

# Rodar ambos (frontend + backend) em dev
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

Se preferir, rode cada parte separadamente usando os scripts em cada pacote.

---

## Backend (API)

Pasta: `backend/`

### Variáveis de Ambiente

Crie `backend/.env` com as variáveis abaixo (vide `backend/src/config/env.js`):

```env
PORT=3001
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public
JWT_SECRET=sua_chave_super_secreta
JWT_EXPIRES_IN=7d
```

### Banco de Dados, Prisma e Migrations

Esquema Prisma: `backend/prisma/schema.prisma` (PostgreSQL).

Aplique as migrations existentes (a pasta `backend/prisma/migrations` já inclui histórico):

```bash
# dentro de backend/
npx prisma migrate deploy
# ou (para desenvolvimento)
npx prisma migrate dev

# gerar cliente prisma (se necessário)
npx prisma generate
```

### Rodando o servidor

Na pasta `backend/`:

```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start
```

O servidor sobe em `http://localhost:${PORT}` (padrão 3001). CORS já permite `http://localhost:5173`.

### Seeds de dados

Scripts de seed em `backend/seeds/`:

```bash
# Rodar todos (admin, vendedor, cliente, produtos e pedidos de teste)
npm run seed:all

# Ou individualmente
npm run seed:admin
npm run seed:vendor
npm run seed:client
npm run seed:products
npm run seed:test-orders
```

> Há também `clearDatabase.js` e `create_multiple_users.js` para cenários de reset/população.

### Estrutura de rotas principais

Prefixo base: `/api`

| Rota | Descrição |
|------|-----------|
| `/api/auth` | Register, login, profile |
| `/api/users` | Gestão de usuários (admin) |
| `/api/products` | Produtos |
| `/api/categories` | Categorias |
| `/api/cart` | Carrinho |
| `/api/orders` | Pedidos |
| `/api/upload` | Upload de imagens |
| `/api/seller` | Área do vendedor |

Uploads estáticos servidos em `/uploads` (ex.: `/uploads/products/<arquivo>`).

**Regras de autenticação relevantes:**

- JWT no header: `Authorization: Bearer <token>` (frontend injeta automaticamente).
- Login de vendedor bloqueado se `status !== 'active'`. O backend retorna `403` com a mensagem: _"Seu cadastro ainda não foi aprovado. Aguarde a aprovação para acessar a plataforma."_

---

## Frontend (Web)

Pasta: `frontend/`

### Variáveis de Ambiente

Crie `frontend/.env` (opcional). A base da API é definida por `VITE_API_URL`:

```env
VITE_API_URL=http://localhost:3001
```

O Axios é configurado em `frontend/src/services/api.js` com `baseURL: ${VITE_API_URL}/api` e adiciona automaticamente o token JWT do localStorage.

### Rodando em desenvolvimento

Na pasta `frontend/`:

```bash
npm run dev
```

Aplicação em http://localhost:5173.

### Build de produção

```bash
npm run build
npm run preview  # opcional para servir o build localmente
```

---

## Fluxos de Usuário

### Cliente
- Registro e login.
- Navegar por categorias e produtos, gerenciar carrinho, realizar checkout e ver status de pedidos.

### Vendedor (com aprovação)
- Registro exige CNPJ.
- Ao registrar, `status = 'pending'`. Somente após aprovação (admin) o vendedor consegue efetuar login e criar produtos.
- Se tentar logar pendente, recebe `403` com mensagem de aguarde (frontend exibe a mensagem).

### Administrador
- Crie um admin com `npm run seed:admin`.
- Acesso a rotas administrativas (gestão de usuários, aprovação de vendedores, etc.).

---

## Convenções, Scripts e Estrutura de Pastas

Na raiz (`package.json`):

| Script | Descrição |
|--------|-----------|
| `install:all` | Instala dependências de frontend e backend |
| `dev` | Roda frontend e backend juntos (usa `concurrently`) |
| `dev:frontend` / `dev:backend` | Rodam partes isoladas |
| `build:*` | Builds individuais |

**Estruturas:**

- **Backend:** `backend/src/` com `controllers`, `routes`, `middleware`, `services`, `validators`, `utils`.
- **Frontend:** `frontend/src/` com `pages`, `components`, `contexts`, `services`, `utils`.

---

## Troubleshooting

**500 no login:**
- Verifique `.env` no backend (`JWT_SECRET`, `DATABASE_URL`, `JWT_EXPIRES_IN`).
- Conferir logs do servidor. Se vendedor pendente, o correto é `403` com mensagem de aguarde.

**CORS:** Frontend deve apontar para `VITE_API_URL` do backend; backend já libera `http://localhost:5173`.

**Prisma:** Se migrations antigas, rode `npx prisma migrate deploy` ou `dev`. Gere o client se necessário.

**Uploads:** Verifique permissões da pasta `backend/src/uploads/`.

---

## 🚀 Deploy do Frontend (Vercel)

Este projeto (frontend em Vite) está pronto para deploy na Vercel usando `@vercel/static-build`.

**Arquivos/Configs adicionados:**

- `vercel.json` (build estática do diretório `frontend/`, rewrite SPA para `/index.html`, Node 20, workaround para Rollup).
- `.npmrc` na raiz desativando optional deps (evita bug do Rollup nativo em ambientes Linux).
- `frontend/package.json` com `postinstall` neutro para não acionar rebuild do Rollup nativo.

**Como publicar:**

1. No dashboard da Vercel, importe este repositório.
2. Configure o projeto para usar o caminho `frontend/` como base de build.
3. Adicione a variável de ambiente:
   - `VITE_API_URL` → URL pública do backend (ex.: `https://innovative-cat-production.up.railway.app`).
4. Deploy.

**Rotas SPA:** O `vercel.json` inclui rewrite para que todas as rotas caiam em `/index.html` (React Router).

**Node/Build:** Node 20 (`.nvmrc` já aponta 20) e `ROLLUP_SKIP_NODEJS_NATIVE` forçado na build.

---

## 🚀 Deploy do Backend (Railway)

O backend está hospedado no **Railway**: [https://innovative-cat-production.up.railway.app](https://innovative-cat-production.up.railway.app)

### Railway (configuração atual)

1. Crie um projeto no Railway e adicione um serviço Node apontando para este repositório.
2. Configure a pasta de trabalho (**Working directory**) para `backend/`.
3. **Build command:**
   ```bash
   npm install && npx prisma generate && npx prisma migrate deploy
   ```
4. **Start command:**
   ```bash
   node server.js
   ```
5. Adicione um banco **PostgreSQL** no Railway e copie a connection string para `DATABASE_URL`.
6. Configure as variáveis de ambiente:

| Variável | Valor |
|----------|-------|
| `PORT` | `3001` |
| `DATABASE_URL` | Connection string do Postgres (Railway injeta automaticamente) |
| `JWT_SECRET` | Sua chave secreta |
| `JWT_EXPIRES_IN` | `7d` |
| `FRONTEND_URL` | URL do seu frontend (ex.: `https://seu-frontend.vercel.app`) |

### Render.com (alternativa)

O repositório também inclui um `render.yaml` (Blueprint) para deploy no Render:

- Cria um serviço web Node e um banco Postgres free.
- Defina `FRONTEND_URL` com a URL do seu frontend em produção.
- **Build command:** `npm install && cd backend && npm install && npx prisma generate && npx prisma migrate deploy`
- **Start command:** `cd backend && node server.js`

---

## Licença

MIT – ver arquivo `LICENSE` se aplicável.