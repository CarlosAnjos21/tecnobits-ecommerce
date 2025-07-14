# 🚀 Tecnobits E-commerce: Seu Setup, Nosso Poder\!

Bem-vindo ao repositório oficial da **Tecnobits E-commerce**, sua loja virtual de hardware completa, desenvolvida em **React** pela talentosa equipe do programa Capacita Brasil. Nosso objetivo é oferecer a melhor experiência para gamers e profissionais de TI que buscam componentes de alta performance.

-----

## 🎯 Sobre o Projeto

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

-----

## 📊 Resultados e Conquistas

  * ✅ **Sistema Responsivo Completo:** Uma experiência de usuário impecável em qualquer tamanho de tela.
  * ✅ **Catálogo Abrangente:** Mais de 100 produtos catalogados e prontos para serem explorados.
  * ✅ **Carrinho Totalmente Funcional:** Adicione, remova e finalize suas compras com facilidade.
  * ✅ **Design Profissional e Intuitivo:** Uma interface limpa e agradável, pensada para o usuário.

-----

**Este projeto foi orgulhosamente desenvolvido como parte do programa Capacita Brasil - FullStack.** 🚀