# Tecnobits E-commerce – Projeto Final

Bem-vindo ao repositório final do projeto de e-commerce da equipe Hardware (Capacita Brasil). Este monorepo contém o frontend (React + Vite) e o backend (Node.js + Express + Prisma) de uma loja de componentes de hardware com autenticação de usuários, gestão de produtos, carrinho, pedidos e fluxo de vendedores.

- Repositório: daniolivem/projeto-inter-capacita
- Branch: main
- Data: 22/09/2025

## Sumário
- Visão Geral
- Arquitetura e Tech Stack
- Requisitos de Ambiente
- Configuração Rápida (monorepo)
- Backend (API)
  - Variáveis de Ambiente
  - Banco de Dados, Prisma e Migrations
  - Rodando o servidor
  - Seeds de dados
  - Estrutura de rotas principais
  - Uploads
- Frontend (Web)
  - Variáveis de Ambiente
  - Rodando em desenvolvimento
  - Build de produção
- Fluxos de Usuário
  - Cliente
  - Vendedor (com aprovação)
  - Administrador
- Convenções, Scripts e Estrutura de Pastas
- Troubleshooting
- Licença

---

## Visão Geral
Aplicação de e-commerce completa:
- Catálogo de produtos, categorias, carrinho, checkout e pedidos.
- Autenticação com JWT e perfis: cliente, vendedor e admin.
- Vendedor cadastra-se e aguarda aprovação do admin (bloqueio de login até status "active").
- Upload de imagens de produtos via API servidas estaticamente.
- Frontend em React com Context API, React Router e Vite.

## Arquitetura e Tech Stack
- Frontend: React 19, Vite 7, React Router, Axios.
- Backend: Node 18+, Express 4, Prisma 5/6, PostgreSQL, JWT, bcrypt, multer, helmet, rate-limit.
- Monorepo com workspaces npm: `frontend` e `backend`.

## Requisitos de Ambiente
- Node.js LTS (18+) e npm.
- PostgreSQL (local ou gerenciado). 
- Windows/macOS/Linux. Em dev, frontend usa http://localhost:5173 e backend http://localhost:3001.

## Configuração Rápida (monorepo)
Na raiz do repositório:

```powershell
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

```
PORT=3001
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public
JWT_SECRET=sua_chave_super_secreta
JWT_EXPIRES_IN=7d
```

### Banco de Dados, Prisma e Migrations
- Esquema Prisma: `backend/prisma/schema.prisma` (PostgreSQL).
- Aplique as migrations existentes (a pasta `backend/prisma/migrations` já inclui histórico). Com o Prisma instalado globalmente ou via npx:

```powershell
# dentro de backend/
npx prisma migrate deploy
# ou (para desenvolvimento)
npx prisma migrate dev

# gerar cliente prisma (se necessário)
npx prisma generate
```

### Rodando o servidor
Na pasta `backend/`:

```powershell
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start
```

- O servidor sobe em `http://localhost:${PORT}` (padrão 3001). 
- CORS já permite `http://localhost:5173`.

### Seeds de dados
Scripts de seed em `backend/seeds/`.

```powershell
# Rodar todos (admin, vendedor, cliente, produtos e pedidos de teste)
npm run seed:all

# Ou individualmente
npm run seed:admin
npm run seed:vendor
npm run seed:client
npm run seed:products
npm run seed:test-orders
```

Obs.: Há também `clearDatabase.js` e `create_multiple_users.js` para cenários de reset/população.

### Estrutura de rotas principais
Prefixo base: `/api`
- Autenticação e Perfil: `/api/auth` (register, login, profile)
- Usuários (admin): `/api/users`
- Produtos: `/api/products`
- Categorias: `/api/categories`
- Carrinho: `/api/cart`
- Pedidos: `/api/orders`
- Uploads: `/api/upload`
- Área do vendedor: `/api/seller`

Uploads estáticos servidos em `/uploads` (ex.: `/uploads/products/<arquivo>`).

### Regras de autenticação relevantes
- JWT no header: `Authorization: Bearer <token>` (frontend injeta automaticamente).
- Login de vendedor bloqueado se `status !== 'active'`. O backend retorna `403` com a mensagem:
  "Seu cadastro ainda não foi aprovado. Aguarde a aprovação para acessar a plataforma."

---

## Frontend (Web)
Pasta: `frontend/`

### Variáveis de Ambiente
Crie `frontend/.env` (opcional). A base da API é definida por `VITE_API_URL`:

```
VITE_API_URL=http://localhost:3001
```

O Axios é configurado em `frontend/src/services/api.js` com `baseURL: ${VITE_API_URL}/api` e adiciona automaticamente o token JWT do localStorage.

### Rodando em desenvolvimento
Na pasta `frontend/`:

```powershell
npm run dev
```

Aplicação em `http://localhost:5173`.

### Build de produção

```powershell
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
- Se tentar logar pendente, recebe 403 com mensagem de aguarde (frontend exibe a mensagem).

### Administrador
- Crie um admin com `npm run seed:admin`.
- Acesso a rotas administrativas (gestão de usuários, aprovação de vendedores, etc.).

---

## Convenções, Scripts e Estrutura de Pastas
Na raiz (`package.json`):
- `install:all` – instala dependências de frontend e backend.
- `dev` – roda frontend e backend juntos (usa `concurrently`).
- `dev:frontend`, `dev:backend` – rodam partes isoladas.
- `build:*` – builds individuais.

Estruturas:
- Backend: `backend/src/` com `controllers`, `routes`, `middleware`, `services`, `validators`, `utils`.
- Frontend: `frontend/src/` com `pages`, `components`, `contexts`, `services`, `utils`.

---

## Troubleshooting
- 500 no login:
  - Verifique `.env` no backend (`JWT_SECRET`, `DATABASE_URL`, `JWT_EXPIRES_IN`).
  - Conferir logs do servidor. Se vendedor pendente, o correto é 403 com mensagem de aguarde.
- CORS: Frontend deve apontar para `VITE_API_URL` do backend; backend já libera `http://localhost:5173`.
- Prisma: se migrations antigas, rode `npx prisma migrate deploy` ou `dev`. Gere o client se necessário.
- Uploads: verifique permissões da pasta `backend/src/uploads/`.

---

## Licença
MIT – ver arquivo LICENSE se aplicável.

---

## 📦 Deploy na Netlify (Frontend)

Este projeto está preparado para hospedagem do frontend como SPA na Netlify.

Arquivos adicionados/ajustados:
- `netlify.toml` na raiz (build em `frontend/`, publish `frontend/dist`).
- `frontend/public/_redirects` com `/* /index.html 200` (SPA fallback).

Build settings (Netlify → Site settings → Build & deploy):
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/dist`

Environment variables (Netlify → Site settings → Environment):
- `VITE_API_URL`: URL pública do backend (ex.: `https://api.seu-dominio.com` ou `https://seu-backend.onrender.com`).
- (Opcional) `NODE_VERSION`: `20`.

No backend, o CORS aceita um domínio configurável via `.env`:
- `FRONTEND_URL=https://seu-site-na-netlify.netlify.app` (ou seu domínio customizado)

Checklist de Deploy:
1. Faça o deploy do backend e obtenha a URL pública.
2. Configure `FRONTEND_URL` no `.env` do backend e reinicie o servidor.
3. Na Netlify, defina `VITE_API_URL` com a URL pública do backend.
4. Conecte o repositório GitHub na Netlify e dispare o build.
5. Teste login, navegação (rotas SPA) e chamadas à API.

---

## 🚀 Deploy do Backend (Render/Railway)

Este repositório inclui um exemplo de configuração para Render (`render.yaml`). Alternativas como Railway ou VPS também funcionam.

### Render.com (Blueprint)
- Arquivo: `render.yaml`
- Cria um serviço web Node e um banco Postgres free.
- Ajustes necessários após criação do site na Netlify:
  - Defina `FRONTEND_URL` com a URL do seu site (Netlify/domínio próprio).

Comandos de build/start (já no arquivo):
- build: `npm install && cd backend && npm install && npx prisma generate && npx prisma migrate deploy`
- start: `cd backend && node server.js`

Variáveis de ambiente no backend:
- `PORT` (3001)
- `DATABASE_URL` (Render injeta se usar o Postgres criado pelo blueprint)
- `JWT_SECRET`, `JWT_EXPIRES_IN`
- `FRONTEND_URL` (ex.: `https://seu-site.netlify.app`)

### Railway.app (alternativa)
1. Crie um projeto e adicione um serviço Node apontando para o repo.
2. Configure a pasta de trabalho (Working directory) para `backend/`.
3. Configure build command: `npm install && npx prisma generate && npx prisma migrate deploy`.
4. Start command: `node server.js`.
5. Adicione as variáveis de ambiente (`DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `FRONTEND_URL`).
6. Crie um Postgres no Railway e copie a connection string para `DATABASE_URL`.
