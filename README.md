# 🔧 Tecnobits E-commerce
### _"Poder para o seu setup."_

Loja virtual de hardware desenvolvida em React pela equipe do Capacita Brasil.

## 🎯 Sobre o Projeto

E-commerce completo especializado em componentes de hardware para gamers e profissionais de TI.

### ✅ Funcionalidades
- 🏠 Homepage com produtos em destaque
- 📦 100+ produtos com detalhes completos
- 🛒 Carrinho com cálculo automático
- 💳 Checkout e finalização de compra
- 🔐 Sistema de login/cadastro
- 📱 Design totalmente responsivo
- 🎪 Carrossel dinâmico de ofertas

### 🛠️ Tecnologias
- React 19.1.0 + Vite 7.0.0
- CSS modular + Context API
- React Router DOM
- Mobile-first design

---

## 👥 Contribuições da Equipe

> 📋 **Nota:** Todas as contribuições podem ser acompanhadas através dos commits e pull requests no repositório GitHub.

### 🎨 **Dani** - Design System & Responsividade
- Sistema de Design completo com 7 breakpoints
- HomePage + BestSellerCard + FeaturedProducts + Gallery
- Estrutura de dados (products.json)
- Página 404 personalizada
- Code cleanup e organização CSS
- Componente Buttons padronizado

### 🛒 **May** - Carrinho & Estado Global
- CartContext + CartPage completos
- Funcionalidades do carrinho (adicionar/remover)
- CheckoutPage + formulários de compra
- Cálculos automáticos e persistência

### 🎯 **Gaabe** - Navegação & Roteamento
- Header principal + Menu mobile + ProductDetailPage
- Configuração do React Router
- Correção de rotas de navegação
- Sistema de busca de produtos

### 💳 **Carlos** - Listagem & Formulários
- ProductListingPage com filtros
- Interface de listagem de produtos

### 📦 **Vini** - Produtos & Layout
- ProductCard
- Footer responsivo 4-colunas
- Design de cards individuais

### 🔐 **Anderson** - Autenticação & Segurança
- LoginPage completa
- Pagina de registro


---

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── BestSellerCard/     # Cards best sellers (Dani)
│   ├── Buttons/            # Botões padronizados (Dani)
│   ├── FeaturedProducts/   # Produtos destaque (Dani)
│   ├── Footer/             # Rodapé responsivo (Vini)
│   ├── Gallery/            # Galeria responsiva (Dani)
│   ├── Header/             # Navegação (Gaabe)
│   └── ProductCard/        # Cards produtos (Vini)
├── pages/
│   ├── CartPage/           # Carrinho (May)
│   ├── CheckoutPage/       # Checkout (May)
│   ├── HomePage/           # Página inicial (Dani)
│   ├── LoginPage/          # Login (Anderson)
│   ├── NotFoundPage/       # Página 404 (Dani)
│   ├── ProductDetailPage/  # Detalhes (Vini)
│   └── ProductListingPage/ # Listagem (Carlos)
├── context/
│   └── CartContext.js      # Carrinho (May)
└── data/
    └── products.json       # Produtos (Dani)
```

## 🚀 Como Executar

```bash
# Clone o repositório
git clone https://github.com/daniolivem/projeto-inter-capacita.git

# Instale dependências
npm install

# Execute o projeto
npm run dev

# Acesse: http://localhost:5173
```

## 📊 Resultados

- ✅ 9 páginas funcionais
- ✅ Sistema responsivo completo
- ✅ 100+ produtos catalogados
- ✅ Carrinho funcional
- ✅ Autenticação implementada
- ✅ Design profissional

**Projeto desenvolvido como parte do Capacita Brasil - Frontend** 🚀