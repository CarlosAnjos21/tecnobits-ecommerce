# 🚀 Tecnobits E-commerce: Seu Setup, Nosso Poder\!

Bem-vindo ao repositório oficial da **Tecnobits E-commerce**, sua loja virtual de hardware completa, desenvolvida em **React** pela talentosa equipe do programa Capacita Brasil. Nosso objetivo é oferecer a melhor experiência para gamers e profissionais de TI que buscam componentes de alta performance.

-----

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
- [📞 Contato](#-contato)

---

A Tecnobits é um e-commerce moderno e responsivo, focado em otimizar a jornada do usuário, desde a busca por produtos até a finalização da compra.

### ✨ Principais Funcionalidades

  * **Página Inicial Intuitiva:** Destaque para produtos campeões de venda e novidades, com uma navegação que convida à exploração.
  * **Catálogo Robusto:** Explore mais de **100 produtos** detalhados, com informações completas para cada item.
  * **Carrinho Inteligente:** Adicione, remova e gerencie seus itens facilmente, com cálculo automático de valores.
  * **Checkout Simplificado:** Processo de finalização de compra ágil e seguro para uma experiência sem complicações.
  * **Sistema de Autenticação:** Login e cadastro de usuários para uma experiência personalizada.
  * **Design Totalmente Responsivo:** Acesso perfeito em qualquer dispositivo, do desktop ao mobile.
  * **Carrossel Dinâmico de Ofertas:** Fique por dentro das melhores promoções do dia com um carrossel interativo.

### 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias, garantindo performance e modularidade:

  * **React 19.1.0:** A biblioteca JavaScript líder para construção de interfaces de usuário interativas.
  * **Vite 7.0.0:** Ferramenta de build rápida para um desenvolvimento ágil.
  * **CSS Modular:** Estilização organizada e de fácil manutenção (através de `style/global.css` e CSS por componente).
  * **Context API:** Gerenciamento de estado global eficiente (`contexts/CartContext.jsx`).
  * **React Router DOM:** Navegação otimizada entre as páginas.
  * **Mobile-First Design:** Priorização da experiência móvel no desenvolvimento do layout.

-----

## 👥 Contribuições da Equipe

Este projeto é fruto da colaboração e dedicação de uma equipe multidisciplinar. Cada membro contribuiu significativamente para a construção da Tecnobits:

> 📋 **Nota:** Todas as contribuições detalhadas podem ser acompanhadas através dos commits e pull requests no repositório GitHub.

  * **🎨 Dani** (Design System & Responsividade)

      * Criação da **HomePage**, `BestSellers` (cards), `FeaturedProducts` e `Gallery`.
      * Estruturação dos dados de `products.json`, `bestSellersConfig.js` e `featuredProducts.js`.
      * Página de erro **404** personalizada.
      * Otimização e organização do CSS e do código em geral.
      * Padronização do componente `Buttons`.

  * **🛒 May** (Carrinho & Estado Global)

      * Implementação completa do **`CartContext`** e da `ShoppingCartPage` (Carrinho).
      * Funcionalidades de adicionar/remover produtos do carrinho.
      * Desenvolvimento da `FinalizarCompraPage` (Checkout) e formulários de compra.
      * Lógica de cálculos automáticos e persistência dos dados do carrinho.

  * **🎯 Gaabe** (Navegação & Roteamento)

      * Criação do `Header` principal e do `Menu Mobile`.
      * Desenvolvimento da `ProductViewPage` (Detalhes do Produto).
      * Configuração e ajuste do **React Router** e das rotas de navegação.
      * Implementação do sistema de busca de produtos (se aplicável, com `ProductListing` componente).

  * **💳 Carlos** (Listagem & Formulários)

      * Construção da `ProductListingPage` com funcionalidades de filtros.
      * Desenvolvimento da interface de listagem de produtos.
      * Tratamento de formulários (como `FormCreatePage`).

  * **📦 Vini** (Produtos & Layout)

      * Criação do componente `ProductCard`.
      * Desenvolvimento do `Footer` responsivo com layout de 4 colunas.
      * Design dos cards de produtos individuais.
      * Estrutura do `Layout` geral da aplicação.

  * **🔐 Anderson** (Autenticação & Segurança)

      * Implementação completa da `LoginPage`.
      * Desenvolvimento da `CreateAccountInitialPage` e `FormCreatePage` (páginas de registro de usuários).
      * Componente `UserDashboard` para gerenciamento de perfil/pedidos.

-----

## 🏗️ Estrutura do Projeto

A organização do projeto segue uma estrutura modular e intuitiva, facilitando a manutenção e expansão:

```
src/
├── components/
│   ├── BestSellers/          # Seção de produtos mais vendidos
│   ├── Buttons/              # Componente de botões reutilizáveis
│   ├── CustomSelect/         # Componente para seletores customizados
│   ├── FeaturedProducts/     # Seção de produtos em destaque
│   ├── Footer/               # Rodapé da aplicação
│   ├── Gallery/              # Componente de galeria de imagens
│   ├── Header/               # Cabeçalho e navegação principal
│   ├── Input/                # Componente para campos de entrada de texto
│   ├── Logo/                 # Componente do logo da marca
│   ├── ProductCard/          # Cards individuais de produtos
│   ├── ProductListing/       # Componente de listagem de produtos (se for um componente separado da página)
│   ├── ResetScroll/          # Componente para resetar o scroll (como ResetScroll.jsx)
│   ├── Section/              # Componente genérico de seção
│   ├── StarRating/           # Componente de avaliação por estrelas
│   └── UserDashboard/        # Componente do painel do usuário
├── contexts/
│   └── CartContext.jsx       # Contexto global para o carrinho de compras
├── data/
│   ├── bestSellersConfig.js  # Configurações para produtos mais vendidos
│   ├── featuredProducts.js   # Configurações para produtos em destaque
│   └── products.json         # Arquivo JSON com os dados de todos os produtos
├── pages/
│   ├── 404/                  # Página de erro (não encontrada)
│   ├── BuySuccess/           # Página de sucesso de compra
│   ├── CreateAccountInitialPage/ # Página inicial para criação de conta
│   ├── FinalizarCompraPage/  # Página de finalização da compra (checkout)
│   ├── FormCreatePage/       # Página de formulário de criação de conta
│   ├── HomePage/             # Página inicial da loja
│   ├── Layout/               # Componente de layout principal da aplicação
│   ├── LoginPage/            # Página de login de usuários
│   ├── ProductListingPage/   # Página de listagem de todos os produtos
│   ├── ProductViewPage/      # Página de detalhes de um produto
│   └── ShoppingCartPage/     # Página do carrinho de compras
├── style/
│   └── global.css            # Estilos CSS globais da aplicação
└── utils/
    └── priceUtils.js         # Utilitários para formatação e manipulação de preços
```

-----

## 🚀 Como Executar o Projeto Localmente

Siga estes passos simples para configurar e rodar o projeto em sua máquina:

```bash
# 1. Clone o repositório para sua máquina
git clone https://github.com/daniolivem/projeto-inter-capacita.git

# 2. Navegue até o diretório do projeto
cd projeto-inter-capacita

# 3. Instale todas as dependências necessárias
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev

# 5. Acesse o projeto em seu navegador
# Geralmente, ele estará disponível em: http://localhost:5173
```

### 🧪 Setup do Postman para Testes da API

Para testar todas as funcionalidades da API de forma automatizada, utilizamos uma coleção completa do Postman:

#### 🚀 **Método Automático (Recomendado)**
```bash
# Execute o script de setup automático
node setup-postman.js

# Ou abra a interface visual
start postman-setup.html
```

#### 📋 **Método Manual**
1. **Importe os arquivos no Postman:**
   - `tecnobits-postman-collection.json` (coleção)
   - `tecnobits-postman-environment.json` (ambiente)

2. **Configure o ambiente:**
   - Selecione "Tecnobits E-commerce - Desenvolvimento"
   - Verifique as variáveis: `base_url`, `jwt_token`, etc.

3. **Teste a autenticação:**
   - Execute: `🔐 Autenticação → 🔑 Login Admin`
   - Teste rotas protegidas: `👥 Administração de Usuários → 📋 Listar Todos os Usuários`

#### 📚 **Sobre a Coleção**
- **40+ requests** organizadas por categoria
- Autenticação JWT automática
- Scripts de teste integrados
- Variáveis de ambiente dinâmicas
- Exemplos para todas as operações CRUD

**Pré-requisito:** Backend rodando na porta 3001

-----

## 📊 Resultados e Conquistas

  * ✅ **Sistema Responsivo Completo:** Uma experiência de usuário impecável em qualquer tamanho de tela.
  * ✅ **Catálogo Abrangente:** Mais de 100 produtos catalogados e prontos para serem explorados.
  * ✅ **Carrinho Totalmente Funcional:** Adicione, remova e finalize suas compras com facilidade.
  * ✅ **Design Profissional e Intuitivo:** Uma interface limpa e agradável, pensada para o usuário.

-----

**Este projeto foi orgulhosamente desenvolvido como parte do programa Capacita Brasil - FullStack.** 🚀

---

## 🧩 Backend: Ambiente, Migrations e Seeds

1) Crie o arquivo `.env` em `backend/` a partir do exemplo:

  - `backend/.env.example` → copie para `.env` e ajuste `DATABASE_URL`, `JWT_SECRET` e `PORT` (opcional).

2) Execute as migrations do Prisma e popular dados:

  - Scripts de seed estão em `backend/seeds/`.
  - Ordem recomendada:
    - `node seeds/clearDatabase.js`
    - `node seeds/create_multiple_users.js` (ou `createAdmin.js`/`createCliente.js`/`createVendedor.js`)
    - `node seeds/createProductsAndCategories.js`
    - Opcional: `node seeds/createTestOrders.js` (gera pedidos de teste; ajuste `BUYER_ID`/`SELLER_ID` no arquivo conforme sua base)

> Observação: os uploads de produtos são servidos via rota estática `/uploads/products`. Ao subir imagem pela API, o backend retorna um `path` utilizável direto no frontend.

## 🧪 Testes do Backend

Há testes focados em pedidos e cancelamento em `backend/src.__tests__/`.

- Para executar: dentro de `backend/`, rode `npm test`.
- Garanta que o banco de dados de teste esteja configurado, se aplicável.

## 📤 Upload e Cadastro de Produto (Fluxo Frontend)

1) Vendedor/Admin realiza upload da foto: `POST /upload/products` (multipart/form-data, campo `image`).
2) Em seguida cria o produto: `POST /products` com `{ title, description, price, stock, images: ["/uploads/products/<arquivo>"], categoryId }`.
3) No frontend, isso já está integrado na página `CadastroProdutosPage` via `uploadService` e `productService`.
