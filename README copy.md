# 🚀 Tecnobits E-commerce: Seu Setup, Nosso Poder!

Bem-vindo ao repositório oficial da **Tecnobits E-commerce**, sua loja virtual de hardware completa, desenvolvida em **React** e **Node.js** pela talentosa equipe do programa Capacita Brasil. Nosso objetivo é oferecer a melhor experiência para gamers e profissionais de TI que buscam componentes de alta performance.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748.svg)](https://prisma.io/)

---

## 📋 Sumário

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Principais Funcionalidades](#-principais-funcionalidades)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [📊 Modelo de Dados](#-modelo-de-dados)
- [👥 Contribuições Detalhadas da Equipe](#-contribuições-detalhadas-da-equipe)
- [🏗️ Estrutura do Projeto](#️-estrutura-do-projeto)
- [🚀 Como Executar o Projeto Localmente](#-como-executar-o-projeto-localmente)
- [📋 API Endpoints](#-api-endpoints)
- [🔄 Estratégia de Branches e Desenvolvimento](#-estratégia-de-branches-e-desenvolvimento)
- [📊 Resultados e Conquistas](#-resultados-e-conquistas)
- [🤝 Como Contribuir](#-como-contribuir)
- [📝 Licença](#-licença)

---

A Tecnobits é um e-commerce moderno e responsivo, focado em otimizar a jornada do usuário, desde a busca por produtos até a finalização da compra. O projeto foi desenvolvido como parte do programa Capacita Brasil - FullStack, demonstrando habilidades em desenvolvimento fullstack com tecnologias modernas.




### ✨ Principais Funcionalidades

- **🏠 Página Inicial Intuitiva:** Destaque para produtos campeões de venda e novidades, com uma navegação que convida à exploração.
- **📦 Catálogo Robusto:** Explore mais de **100 produtos** detalhados, com informações completas para cada item.
- **🛒 Carrinho Inteligente:** Adicione, remova e gerencie seus itens facilmente, com cálculo automático de valores.
- **💳 Checkout Simplificado:** Processo de finalização de compra ágil e seguro para uma experiência sem complicações.
- **🔐 Sistema de Autenticação:** Login e cadastro de usuários para uma experiência personalizada.
- **📱 Design Totalmente Responsivo:** Acesso perfeito em qualquer dispositivo, do desktop ao mobile.
- **👤 Perfis de Usuário:** Sistema de roles (Cliente, Vendedor, Admin) com permissões específicas.
- **📊 Dashboard Administrativo:** Gerenciamento completo de usuários, produtos e pedidos.
- **📈 Controle de Estoque:** Sistema de gerenciamento de inventário para vendedores.
- **📋 Histórico de Pedidos:** Acompanhamento completo de compras e vendas.

### 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias, garantindo performance e modularidade:

#### Frontend:
- **React 19.1.0:** Biblioteca JavaScript líder para construção de interfaces de usuário interativas.
- **Vite 7.0.0:** Ferramenta de build rápida para um desenvolvimento ágil.
- **React Router DOM 7.6.3:** Navegação otimizada entre as páginas.
- **FontAwesome Icons:** Ícones vetoriais para uma interface rica.
- **CSS Modular:** Estilização organizada e de fácil manutenção.
- **Context API:** Gerenciamento de estado global eficiente.
- **Mobile-First Design:** Priorização da experiência móvel no desenvolvimento do layout.

#### Backend:
- **Node.js 18+:** Ambiente de execução JavaScript para o servidor.
- **Express.js 4.21.2:** Framework para construção de APIs robustas e escaláveis.
- **Prisma ORM 5.22.0:** Gerenciamento de banco de dados relacional com migrações e consultas eficientes.
- **PostgreSQL:** Banco de dados relacional robusto para produção.
- **SQLite:** Banco de dados leve e eficiente para desenvolvimento local.
- **JWT (JSON Web Token) 9.0.2:** Autenticação segura para usuários.
- **Bcrypt.js 2.4.3:** Criptografia de senhas para maior segurança.
- **Zod 3.22.2:** Validação de dados com schemas TypeScript-first.
- **CORS:** Configuração de políticas de compartilhamento de recursos.

#### DevOps & Ferramentas:
- **Vercel:** Plataforma de deploy para o frontend.
- **Railway/PostgreSQL:** Hospedagem do banco de dados em produção.
- **ESLint:** Linting para manter a qualidade do código.
- **Jest:** Framework de testes para o backend.
- **Concurrently:** Execução simultânea de scripts de desenvolvimento.
- **Nodemon:** Reinicialização automática do servidor em desenvolvimento.

---

## 📊 Modelo de Dados

O sistema utiliza um banco de dados relacional com as seguintes entidades principais:

### Usuários (`User`)
- **ID único**, email, nome, senha criptografada
- **Roles:** cliente, vendedor, admin
- **Status:** active, pending, rejected
- Campos opcionais: endereço, telefone, CNPJ (para vendedores)

### Produtos (`Product`)
- **ID único**, título, descrição, preço, estoque
- **Imagens:** Array de URLs de imagens
- **Relacionamentos:** Categoria e Vendedor

### Categorias (`Category`)
- **ID único**, nome único
- Relacionamento com múltiplos produtos

### Pedidos (`Order`)
- **ID único**, data de criação, total
- **Dados de entrega:** CEP, cidade, estado, endereço, complemento
- **Datas:** Entrega prevista e realizada
- **Status:** Aguardando Pagamento, Confirmado, Em Preparação, Enviado, Entregue, Cancelado, Devolvido
- **Método de Pagamento:** PIX, Cartão de Crédito, Boleto
- Relacionamento com comprador e itens do pedido

### Itens do Pedido (`OrderItem`)
- **ID único**, quantidade, preço unitário
- Relacionamentos com Pedido e Produto

---

## 👥 Contribuições Detalhadas da Equipe

Este projeto é fruto da colaboração e dedicação de uma equipe multidisciplinar. Cada membro contribuiu significativamente para a construção da Tecnobits:

### **Daniely Mélo - Líder Fullstack**
- Arquitetura geral do sistema (frontend + backend).
- Coordenação entre front e back.
- Revisão de código e garantia de padrões de qualidade.
- Implementação do sistema de autenticação e autorização (JWT).
- Desenvolvimento dos modelos do Prisma ORM (User, Role, Product, Category, Order, OrderItem).
- APIs de usuários e segurança (CRUD Admin & Perfil).
- Refatoração do backend para ESM.
- Criação de scripts de seed para o banco de dados.
- Integração e depuração do frontend (Login & Perfil).
- Configuração inicial do backend (Express, Prisma, PostgreSQL).
- Implementação e controle de perfis (cliente/vendedor).
- Desenvolvimento de APIs de administração para gerenciamento de vendedores.
- Sistema de aprovação de vendedores (Admin Dashboard).
- Validação de permissões para gerenciamento de produtos.

### **Kaio Vinícius - Líder Backend**
- Implementação do cancelamento de vendas (cliente e vendedor).
- Controle de estoque e restrição de adicionar ao carrinho sem estoque.
- Desenvolvimento de APIs de pedidos e histórico.
- Coordenação do time backend.
- Planejamento semanal das sprints e relatórios de progresso.

### **Antônio Gabriel - Desenvolvedor Backend**
- Desenvolvimento de APIs de produtos e categorias (CRUD).
- Implementação do sistema de carrinho de compras.
- Cadastro de produtos com fotos, preço, descrição e título.
- Gravação e listagem de vendas no banco de dados.
- APIs de vendas e pedidos.

### **Carlos Otacílio - Líder Frontend**
- Arquitetura do frontend e definição de padrões.
- Sistema de roteamento e navegação.
- Gerenciamento de estado com Context/Redux.
- Integração com APIs do backend.
- Garantia de responsividade total do site.
- Coordenação do time frontend.
- Planejamento semanal das sprints.

### **Maycon Andrade - Desenvolvedor Frontend**
- Implementação do carrinho de compras (armazenamento de produtos e cálculo de preços).
- Desenvolvimento do checkout e finalização de compra.
- Criação das páginas principais (Home, Produtos, Carrinho).
- Cadastro de produtos com upload de fotos.
- Implementação do cancelamento de vendas (cliente e vendedor).
- Garantia de responsividade total do site.

### **Anderson Guimarães - Desenvolvedor Frontend**
- Desenvolvimento das páginas de produto individual.
- Implementação do sistema de autenticação no frontend.
- Criação de páginas de cadastro de vendedor, cliente e produto.
- Página de redirecionamento após cadastro do vendedor.
- Listagem de compras do cliente e vendas do vendedor.
- Otimizações e responsividade total do site.

---

## 🏗️ Estrutura do Projeto

A organização do projeto segue uma estrutura modular e intuitiva, facilitando a manutenção e expansão:

```
projeto-inter-capacita/
├── frontend/                          # Aplicação React
│   ├── public/                        # Assets estáticos
│   │   └── images/                    # Imagens dos produtos
│   ├── src/
│   │   ├── components/                # Componentes reutilizáveis
│   │   │   ├── BestSellers/          # Seção de produtos mais vendidos
│   │   │   ├── Buttons/              # Componentes de botões
│   │   │   ├── ProductCard/          # Cards de produtos
│   │   │   ├── Header/               # Cabeçalho da aplicação
│   │   │   └── ...                   # Outros componentes
│   │   ├── contexts/                 # Contextos React
│   │   │   └── CartContext.jsx       # Contexto do carrinho
│   │   ├── data/                     # Dados estáticos
│   │   │   ├── products.json         # Dados dos produtos
│   │   │   └── ...                   # Outros dados
│   │   ├── pages/                    # Páginas da aplicação
│   │   │   ├── HomePage/             # Página inicial
│   │   │   ├── LoginPage/            # Página de login
│   │   │   ├── ShoppingCartPage/     # Página do carrinho
│   │   │   └── ...                   # Outras páginas
│   │   ├── style/                    # Estilos globais
│   │   └── utils/                    # Utilitários
│   ├── package.json                   # Dependências do frontend
│   └── vite.config.js                 # Configuração do Vite
├── backend/                           # API Node.js
│   ├── prisma/
│   │   ├── schema.prisma             # Schema do banco de dados
│   │   └── migrations/               # Migrações do banco
│   ├── seeds/                        # Scripts de seed
│   │   ├── createAdmin.js            # Cria usuário admin
│   │   ├── createCliente.js          # Cria clientes de teste
│   │   ├── createVendedor.js         # Cria vendedores de teste
│   │   └── createProductsAndCategories.js # Cria produtos e categorias
│   ├── src/
│   │   ├── config/                   # Configurações
│   │   ├── controllers/              # Controladores da API
│   │   │   ├── AuthController.js     # Autenticação
│   │   │   ├── ProductController.js  # Produtos
│   │   │   ├── UserController.js     # Usuários
│   │   │   └── AdminController.js    # Administração
│   │   ├── middleware/               # Middlewares
│   │   │   └── authMiddleware.js     # Autenticação JWT
│   │   ├── models/                   # Modelos (Prisma)
│   │   ├── routes/                   # Rotas da API
│   │   │   ├── authRoutes.js         # Rotas de auth
│   │   │   ├── productRoutes.js      # Rotas de produtos
│   │   │   ├── userRoutes.js         # Rotas de usuários
│   │   │   ├── sellerRoutes.js       # Rotas de vendedores
│   │   │   └── adminRoutes.js        # Rotas admin
│   │   └── utils/                    # Utilitários
│   ├── package.json                   # Dependências do backend
│   ├── server.js                     # Servidor principal
│   └── app.js                        # Configuração do Express
├── docs/                             # Documentação
│   ├── CRONOGRAMA.md                 # Cronograma do projeto
│   ├── BRANCHES.md                   # Estratégia de branches
│   ├── PULL_REQUEST_PROCESS.md       # Processo de PRs
│   └── README.md                     # Documentação adicional
├── package.json                      # Configuração do monorepo
├── vercel.json                       # Configuração de deploy
└── README.md                         # Este arquivo
```

---

## 🚀 Como Executar o Projeto Localmente

Siga estes passos simples para configurar e rodar o projeto em sua máquina:

### Pré-requisitos
- **Node.js 18+** instalado
- **PostgreSQL** (para produção) ou **SQLite** (para desenvolvimento)
- **Git** para clonar o repositório

### 1. Clone o Repositório
```bash
git clone https://github.com/daniolivem/projeto-inter-capacita.git
cd projeto-inter-capacita
```

### 2. Instale as Dependências
```bash
# Instalar dependências de todos os workspaces
npm run install:all
```

### 3. Configure o Banco de Dados

#### Para Desenvolvimento (SQLite):
- O projeto já está configurado para usar SQLite por padrão.
- Execute as migrações:
```bash
cd backend
npx prisma migrate dev
```

#### Para Produção (PostgreSQL):
- Crie um banco PostgreSQL
- Configure a variável `DATABASE_URL` no arquivo `.env`:
```
DATABASE_URL="postgresql://username:password@localhost:5432/tecnobits_db"
```
- Execute as migrações:
```bash
cd backend
npx prisma migrate deploy
```

### 4. Popule o Banco de Dados
```bash
cd backend
npm run seed:all
```
Este comando criará:
- 1 usuário admin para teste (admin@tecnobits.com / admin123)
- Vários usuários de teste (clientes e vendedores)
- Categorias e produtos de exemplo

### 5. Execute o Projeto
```bash
# Na raiz do projeto
npm run dev
```
Isso iniciará tanto o frontend (porta 5173) quanto o backend (porta 3000).

### 6. Acesse a Aplicação
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000

### Scripts Úteis
```bash
# Apenas frontend
npm run dev:frontend

# Apenas backend
npm run dev:backend

# Build para produção
npm run build:frontend

# Executar testes
npm test

# Seeds individuais
npm run seed:admin      # Criar admin
npm run seed:vendor     # Criar vendedores
npm run seed:client     # Criar clientes
npm run seed:products   # Criar produtos
```

---

## 📋 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de novo usuário
- `GET /api/auth/profile` - Perfil do usuário autenticado

### Produtos
- `GET /api/products` - Listar produtos (com filtros)
- `GET /api/products/:id` - Detalhes de um produto
- `POST /api/products` - Criar produto (vendedor)
- `PUT /api/products/:id` - Atualizar produto (vendedor)
- `DELETE /api/products/:id` - Deletar produto (vendedor)

### Usuários
- `GET /api/users/profile` - Perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil
- `GET /api/users/orders` - Pedidos do usuário

### Administração
- `GET /api/admin/users` - Listar todos os usuários
- `PUT /api/admin/users/:id/approve` - Aprovar vendedor
- `PUT /api/admin/users/:id/reject` - Rejeitar vendedor
- `GET /api/admin/orders` - Todos os pedidos

### Vendedores
- `GET /api/seller/products` - Produtos do vendedor
- `GET /api/seller/orders` - Vendas do vendedor
- `PUT /api/products/:id/stock` - Atualizar estoque

---

## 🔄 Estratégia de Branches e Desenvolvimento

### Branches Principais
- **`main`**: Código em produção, sempre estável
- **`develop`**: Branch de integração e staging

### Branches por Desenvolvedor
- **Kaio:** `feature/kaio/*`
- **Antônio:** `feature/antonio/*`
- **Carlos:** `feature/carlos/*`
- **Maycon:** `feature/maycon/*`
- **Anderson:** `feature/anderson/*`

### Processo de Pull Requests
1. Criar PR da branch pessoal para `develop`
2. Mínimo 2 aprovações necessárias (Daniely + líder da área)
3. Testes automatizados e manuais
4. Merge para `develop` → staging
5. Após validação, merge `develop` → `main` → produção

---

## 📊 Resultados e Conquistas

- ✅ **Sistema Responsivo Completo:** Experiência impecável em qualquer dispositivo
- ✅ **Catálogo Abrangente:** Mais de 100 produtos catalogados
- ✅ **Carrinho Totalmente Funcional:** Gestão completa de compras
- ✅ **Sistema de Roles:** Controle de permissões para diferentes tipos de usuário
- ✅ **Dashboard Administrativo:** Gerenciamento completo do sistema
- ✅ **Controle de Estoque:** Sistema robusto de inventário
- ✅ **APIs RESTful:** Backend escalável e bem estruturado
- ✅ **Autenticação JWT:** Segurança implementada corretamente
- ✅ **Design Profissional:** Interface limpa e intuitiva
- ✅ **Deploy Automatizado:** CI/CD com Vercel

---

## 🤝 Como Contribuir

1. **Fork** o projeto
2. Crie sua **feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request** seguindo o template em `docs/PULL_REQUEST_PROCESS.md`

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---



**Este projeto foi orgulhosamente desenvolvido como parte do programa Capacita Brasil - FullStack.** 🚀