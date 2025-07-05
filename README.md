# 🔧 Projeto E-commerce - Tecnobits
### _"Poder para o seu setup."_

Este projeto faz parte do módulo intermediário do Capacita Brasil e será desenvolvido em equipe por 6 membros. O objetivo é criar um **Frontend React completo** para uma loja virtual de componentes de hardware.

---

## 📊 Visão Geral do Projeto

### 🎯 Objetivo
Desenvolver uma loja virtual completa e moderna especializada em componentes de hardware para computadores, proporcionando uma experiência de compra intuitiva e profissional.

### 🎮 Conceito da Loja
A **Tecnobits** é uma loja especializada em hardware para gamers, entusiastas e profissionais de TI. Oferecemos desde componentes básicos até configurações high-end para quem busca **"Poder para o seu setup"**.

### 🎯 Requisitos Mínimos Obrigatórios
- ✅ **Frontend em React** para página de E-commerce
- 📦 **Mínimo 100 produtos** com descrição, preço e fotos
- 🛒 **Carrinho de compras** que calcula preço total com quantidades
- 🔄 **Finalização de compra** completa
- 🌐 **Mínimo 3 páginas dinâmicas** com rotas específicas:
  - 🏠 Página Inicial
  - 📄 Detalhes do Produto  
  - 🛒 Carrinho de Compras

### ✨ Funcionalidades Extras Implementadas
- 📑 **Listagem de Produtos** com filtros avançados
- 🔐 **Sistema de Login/Cadastro** completo
- 💳 **Checkout e Finalização** profissional
- ✅ **Confirmação de Compra** detalhada
- 🚫 **Página 404** para rotas inexistentes

### 🛠️ Tecnologias Utilizadas
- **Frontend:** React 19.1.0 + Vite 7.0.0
- **Estilização:** CSS puro (CSS tradicional)
- **Roteamento:** React Router DOM
- **Estado Global:** Context API (carrinho, autenticação)
- **Controle de Qualidade:** ESLint + Prettier
- **Versionamento:** Git & GitHub
- **Deploy:** (A definir - Vercel/Netlify)

### 🎯 Arquitetura do Projeto
- **Component-Based:** Componentes reutilizáveis e modulares
- **State Management:** Context API para estado global
- **Responsive Design:** Mobile-first approach
- **Performance:** Lazy loading e otimizações
- **Acessibilidade:** Semântica HTML e ARIA labels

---

## 🗺️ Mapa de Rotas da Aplicação

| Rota | Componente | Responsável | Descrição |
|------|------------|-------------|-----------|
| `/` | HomePage | **Dani** | Página inicial com produtos em destaque |
| `/products` | ProductListingPage | **Carlos** | Listagem completa com filtros |
| `/product/:id` | ProductViewPage | **Gaabe** | Detalhes específicos do produto |
| `/cart` | ShoppingCartPage | **Carlos** | Carrinho de compras com cálculos |
| `/checkout` | PageFinalizarCompra | **May** | Processo de finalização |
| `/success` | BuySuccess | **May** | Confirmação de compra realizada |
| `/login` | LoginPage | **Gaabe** | Autenticação de usuário |
| `/register` |  CreateAccountInitialPage| **Vini** | Cadastro de novo usuário |
| `/account` | FormCreatePage | **Anderson** | Perfil e dados do usuário |
| `/*` | CategoriaPage (404) | **Dani** | Página de erro para rotas inválidas |

### 🎯 **Fluxo Principal do Usuário:**
1. **Início** → HomePage (`/`)
2. **Navegação** → ProductListingPage (`/products`) 
3. **Seleção** → ProductViewPage (`/product/:id`)
4. **Carrinho** → ShoppingCartPage (`/cart`)
5. **Checkout** → PageFinalizarCompra (`/checkout`)
6. **Confirmação** → BuySuccess (`/success`)

---

## 👥 Equipe e Responsabilidades

Este projeto faz parte do curso de Front-End e será desenvolvido em equipe por 6 membros. A aplicação é uma loja virtual de componentes de hardware feita em **React** com **Vite**, seguindo os requisitos da escola.

---

## 👥 Equipe


| Membro | Nome         | Responsabilidade Principal                                      |
| ------ | ------------ | --------------------------------------------------------------- |
| 👤 1   | **Dani**     | ProductListing + Section + HomePage + Categorias (404) + Carrossel         |
| 👤 2   | **May**      | ProductOptions + Input + PageFinalizarCompra + BuySuccess      |
| 👤 3   | **Gaabe**    | Header + Logo + ProductViewPage + LoginPage                    |
| 👤 4   | **Carlos**   | FilterGroup + Buttons + ProductListingPage + ShoppingCartPage  |
| 👤 5   | **Vini**     | Footer + ProductCard + FormCreatePage                          |
| 👤 6   | **Anderson** | CustomSelect + Gallery + CreateAccountInitialPage              |

> Observação: todos podem revisar e ajudar nas tarefas uns dos outros via Pull Request!

### 🔄 Detalhamento das Responsabilidades

#### 👤 **Dani** - HomePage + Componentes de Listagem
📁 Diretório: `src/pages/HomePage` + `src/components/`
- Componente `<ProductListing />` (listagem de produtos)
- Componente `<Section />` (seções reutilizáveis)
- Componente `<BestSellers />` (seção de campeões de vendas)
- Componente `<BestSellerCard />` (cards específicos para campeões de vendas)
- Componente `<FeaturedProducts />` (produtos em destaque)
- Página `HomePage` (página inicial)
- Página de Categorias + 404 (página não encontrada)
- 📊 Configurações `bestSellersConfig.js` (configuração dos campeões de vendas)
- 📊 Dados `featuredProducts.js` (produtos em destaque)

#### 👤 **May** - Finalização de Compra + Inputs
📁 Diretório: `src/pages/` + `src/components/`
- Componente `<ProductOptions />` (opções de produto)
- Componente `<Input />` (campos de entrada)
- Página `PageFinalizarCompra` (checkout)
- Página `BuySuccess` (confirmação de compra)

#### 👤 **Gaabe** - Header + Visualização de Produto
📁 Diretório: `src/components/Header` + `src/pages/`
- Componente `<Header />` (cabeçalho principal)
- Componente `<Logo />` (logotipo da Tecnobits)
- Página `ProductViewPage` (detalhes do produto)
- Página `LoginPage` (autenticação)

#### 👤 **Carlos** - Filtros + Carrinho
📁 Diretório: `src/components/` + `src/pages/`
- Componente `<FilterGroup />` (grupo de filtros)
- Componente `<Buttons />` (botões reutilizáveis)
- Página `ProductListingPage` (listagem com filtros)
- Página `ShoppingCartPage` (carrinho de compras)

#### 👤 **Vini** - Footer + Cards
📁 Diretório: `src/components/` + `src/pages/`
- Componente `<Footer />` (rodapé)
- Componente `<ProductCard />` (card de produto)
- Página `FormCreatePage` (formulário de criação)

#### 👤 **Anderson** - Seleção + Galeria
📁 Diretório: `src/components/` + `src/pages/`
- Componente `<CustomSelect />` (select personalizado)
- Componente `<Gallery />` (galeria de imagens)
- Página `CreateAccountInitialPage` (criação de conta)

---

## 🗂 Estrutura de Pastas

```bash
src/
├── assets/               # Imagens de produtos e ícones
│   ├── images/
│   │   ├── motherboards/
│   │   ├── processors/
│   │   ├── graphics-cards/
│   │   ├── memory/
│   │   ├── mobile-devices/
│   │   ├── mobile-pc/
│   │   └── storage/
│   └── icons/
├── components/           # Componentes reutilizáveis
│   ├── Header/           # Gaabe
│   ├── Footer/           # Vini
│   ├── Logo/             # Gaabe
│   ├── ProductListing/   # Dani
│   ├── ProductCard/      # Vini
│   ├── ProductOptions/   # May
│   ├── BestSellers/      # Dani
│   │   ├── index.jsx     # Componente principal
│   │   ├── BestSellerCard.jsx  # Card específico para campeões
│   │   ├── BestSellers.css     # Estilos do container
│   │   └── BestSellerCard.css  # Estilos do card
│   ├── FeaturedProducts/ # Dani
│   ├── BuyBox/
│   ├── Section/          # Dani
│   ├── FilterGroup/      # Carlos
│   ├── CategoryFilter/
│   ├── Gallery/          # Anderson
│   ├── CustomSelect/     # Anderson
│   ├── Input/            # May
│   └── Buttons/          # Carlos
├── pages/                # Páginas
│   ├── HomePage/         # Dani
│   ├── ProductListingPage/  # Carlos
│   ├── ProductViewPage/  # Gaabe
│   ├── ShoppingCartPage/ # Carlos
│   ├── LoginPage/        # Gaabe
│   ├── FormCreatePage/   # Vini
│   ├── CreateAccountInitialPage/  # Anderson
│   ├── PageFinalizarCompra/       # May
│   ├── BuySuccess/       # May
│   └── CategoriaPage/    # Dani (404)
├── data/                 # Dados mockados
│   ├── products.json     # Produtos de hardware (100+ produtos)
│   ├── featuredProducts.js    # Produtos em destaque (Dani)
│   └── bestSellersConfig.js   # Configuração campeões de vendas (Dani)
├── contexts/             # Gerenciamento de estado
│   └── CartContext.jsx
├── App.jsx
└── main.jsx
```

---

## 💾 Catálogo de Produtos (100+ Itens)

### 🔧 **Processadores (25 produtos)**
- Intel Core i3-12100F, i5-12400F, i5-13600K, i7-13700K, i9-13900K
- AMD Ryzen 5 5600X, Ryzen 7 5700X, Ryzen 7 7700X, Ryzen 9 7900X, Ryzen 9 7950X

### 🎮 **Placas de Vídeo (20 produtos)**
- NVIDIA GeForce RTX 4060, RTX 4060 Ti, RTX 4070, RTX 4070 Ti, RTX 4080, RTX 4090
- AMD Radeon RX 7600, RX 7700 XT, RX 7800 XT, RX 7900 GRE, RX 7900 XT, RX 7900 XTX

### 🔌 **Motherboards (15 produtos)**
- Intel Z790, B760, H610 | AMD X670E, X670, B650E, B650, A620

### 💾 **Memória RAM (15 produtos)**
- DDR4: 8GB, 16GB, 32GB (3200MHz, 3600MHz)
- DDR5: 16GB, 32GB, 64GB (5600MHz, 6000MHz, 6400MHz)

### 💿 **Armazenamento (10 produtos)**
- SSD NVMe: 500GB, 1TB, 2TB (PCIe 3.0/4.0)
- SSD SATA: 240GB, 480GB, 1TB
- HDD: 1TB, 2TB, 4TB

### ⚡ **Fontes (8 produtos)**
- 500W, 650W, 750W, 850W, 1000W - Certificação 80+ Gold/Platinum

### ❄️ **Refrigeração (5 produtos)**
- Air Cooler: Básico, Médio, High-End
- Water Cooler AIO: 240mm, 280mm, 360mm

### 📦 **Gabinetes (2 produtos)**
- Mid Tower ATX, Full Tower E-ATX

### 📱 **Mobile Devices (12 produtos)**
- **Smartphones:** iPhone 15 Pro Max, Samsung Galaxy S24 Ultra, Google Pixel 8 Pro, Xiaomi 13 Pro
- **Tablets:** iPad Air 5ª Geração, Samsung Galaxy Tab S9 Ultra, Microsoft Surface Pro 9, Lenovo Tab P11 Plus
- **Smartwatches:** Apple Watch Series 9, Samsung Galaxy Watch 6, Garmin Forerunner 965
- **Fones Bluetooth:** AirPods Pro 2ª Geração, Sony WH-1000XM5, JBL Tune 760NC

### 💻 **Mobile PC (8 produtos)**
- **Notebooks Ultra-portáteis:** MacBook Air M3 13", Dell XPS 13 Plus, Lenovo ThinkPad X1 Carbon Gen 11
- **Notebooks Gamer:** ASUS ROG Zephyrus G14, MSI Stealth 15M, Acer Predator Helios 300
- **2-em-1:** Microsoft Surface Pro 9, Lenovo Yoga 9i 14"

**Total: 120+ produtos** com descrição completa, preços e especificações técnicas

---

## 🎨 Design System e Paleta de Cores

### 💅 Paleta de Cores Tecnobits

- **Base:** `#2D2D36` (Cinza Escuro/Quase Preto) - Solidez e base
- **Profissional:** `#23395B` (Azul Escuro/Marinho) - Confiança
- **Destaque:** `#4B5B9D` (Azul Médio/Azul-violeta Suave) - Ação e CTA
- **Neutro:** `#A9B3B3` (Cinza Claro/Prata) - Versatilidade
- **Fundo:** `#D9D9D9` (Cinza Muito Claro/Off-White) - Limpeza
- **Success:** `#00C851` (Verde confirmação)
- **Warning:** `#FFB000` (Amarelo alerta)
- **Error:** `#FF3547` (Vermelho erro)
- **Text:** `#2D2D36` / `#23395B` (Textos principais)

### ✒️ Tipografia

Utilizar a fonte `Roboto` (ideal para tech):
- `Roboto-700` para títulos e preços
- `Roboto-500` para especificações e labels
- `Roboto-400` para textos descritivos
- `Roboto Mono` para códigos de produto

### 🎯 Princípios de Design
- **Contraste:** Texto sempre legível sobre fundos
- **Hierarquia Visual:** Cores guiam para elementos importantes
- **Consistência:** Padrão uniforme em toda aplicação
- **Minimalismo:** Evitar sobrecarga visual

### 🖌️ Aplicação da Paleta por Componente

#### 🏗️ **Layout Principal**
- **Header/Footer:** `#2D2D36` (base sólida)
- **Fundo Geral:** `#D9D9D9` (limpeza)
- **Seções de Destaque:** `#23395B` (confiança)

#### 🛒 **Produtos e Carrinho**
- **Cards de Produto:** Fundo `#A9B3B3`, bordas `#D9D9D9`
- **Preços Normais:** `#2D2D36`
- **Preços Promocionais:** `#4B5B9D`
- **Botão "Adicionar Carrinho":** Fundo `#4B5B9D`, texto `#FFFFFF` (branco)
- **Botão Secundário:** Outline `#23395B`, texto `#FFFFFF` (branco)

#### 🎯 **Interações e Estados**
- **Hover em Links:** `#23395B`
- **Estados Ativos:** `#4B5B9D`
- **Texto Secundário:** `#A9B3B3`
- **Bordas de Input:** `#A9B3B3`

#### 📊 **Feedback do Sistema**
- **Sucesso:** `#00C851` (confirmações)
- **Alerta:** `#FFB000` (avisos)
- **Erro:** `#FF3547` (problemas)

---

## 🧠 Dicas Técnicas para Hardware E-commerce

- Usar `react-router-dom` para navegação entre páginas
- Implementar `Context API` para carrinho e autenticação
- Usar `props.children` nos componentes de layout
- Preferência por componentes funcionais com hooks
- **Específico para hardware:**
  - Filtros por especificações (socket, memória, compatibilidade)
  - Sistema de recomendação de componentes compatíveis
  - Comparador de produtos lado a lado
  - Calculadora de consumo de energia (PSU)

---

## 📋 Regras de Colaboração

### 🌿 Workflow Git
- Criar sempre uma **branch por funcionalidade**:
  - Ex: `feat/homepage-slide`, `feat/header-nav`, `feat/product-card`
- Após concluir, **criar um Pull Request** e marcar a equipe para revisão
- Nunca trabalhar direto na branch `main`
- Usar commits descritivos seguindo padrão Conventional Commits

### 📝 Convenções de Código
- **Componentes:** `PascalCase` (ex: `ProductCard`, `HomePage`)
- **Arquivos:** `camelCase` (ex: `productService.js`, `useCart.js`)
- **Pastas:** `PascalCase` para componentes, `camelCase` para utilitários
- **Variáveis/Funções:** `camelCase`
- **Constantes:** `UPPER_SNAKE_CASE`

### 🚀 Padrão de Commits
Seguir [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` alterações na documentação
- `style:` formatação, sem mudança de código
- `refactor:` refatoração de código
- `test:` adição/modificação de testes

---

## ✅ Status do Projeto

| Parte                          | Responsável | Status                                    |
| ------------------------------ | ----------- | ----------------------------------------- |
| Header + Logo                  | **Gaabe**   | ⬜️ Pendente                              |
| Footer + ProductCard           | **Vini**    | ⬜️ Pendente                              |
| HomePage + ProductListing      | **Dani**    | ⬜️ Pendente                              |
| ProductViewPage + LoginPage    | **Gaabe**   | ⬜️ Pendente                              |
| FilterGroup + Buttons          | **Carlos**  | ⬜️ Pendente                              |
| ProductListingPage + Cart      | **Carlos**  | ⬜️ Pendente                              |
| ProductOptions + Input         | **May**     | ⬜️ Pendente                              |
| Finalizar Compra + BuySuccess  | **May**     | ⬜️ Pendente                              |
| CustomSelect + Gallery         | **Anderson**| ⬜️ Pendente                              |
| CreateAccountInitialPage       | **Anderson**| ⬜️ Pendente                              |
| FormCreatePage                 | **Vini**    | ⬜️ Pendente                              |
| Section + Categorias (404)     | **Dani**    | ⬜️ Pendente                              |

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Git

### Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/daniolivem/projeto-inter-capacita.git
   cd projeto-inter-capacita
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```

4. **Acesse a aplicação:**
   - Abra o navegador em `http://localhost:5173`

### Scripts Disponíveis
- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run lint` - Executa o linting do código
- `npm run preview` - Visualiza o build de produção

---

## 🎯 Roadmap de Desenvolvimento

### 📅 Sprint 1 - Fundação (Semana 1-2)
- [x] ✅ Setup inicial do projeto com Vite + React
- [x] ✅ Configuração do ESLint e Prettier
- [x] ✅ Estrutura de pastas e organização
- [x] ✅ Documentação completa (README)
- [ ] 🔄 Implementação dos componentes base (Header, Footer, Layout)

### 📅 Sprint 2 - Componentes Core (Semana 3-4)
- [ ] 🔄 ProductCard e ProductListing
- [ ] 🔄 Sistema de navegação e roteamento
- [ ] 🔄 HomePage com seções principais
- [ ] 🔄 Context API para carrinho
- [ ] 🔄 Componentes de UI (Buttons, Input, CustomSelect)

### 📅 Sprint 3 - Páginas e Funcionalidades (Semana 5-6)
- [ ] ⏳ ProductViewPage com galeria
- [ ] ⏳ ProductListingPage com filtros
- [ ] ⏳ ShoppingCartPage
- [ ] ⏳ Sistema de autenticação (Login/Register)
- [ ] ⏳ Páginas de checkout e confirmação

### 📅 Sprint 4 - Polimento e Deploy (Semana 7-8)
- [ ] ⏳ Responsividade completa
- [ ] ⏳ Otimizações de performance
- [ ] ⏳ Testes e correções de bugs
- [ ] ⏳ Deploy e documentação final

**Legenda:** ✅ Concluído | 🔄 Em Progresso | ⏳ Pendente

---

## 📚 Recursos Úteis

### 🔗 Links Importantes
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Styled Components](https://styled-components.com/)
- [React Router](https://reactrouter.com/)

### 🤝 Contribuição

1. **Fork** o projeto
2. Crie sua **feature branch** (`git checkout -b feature/MinhaFeature`)
3. **Commit** suas mudanças (`git commit -m 'feat: adiciona MinhaFeature'`)
4. **Push** para a branch (`git push origin feature/MinhaFeature`)
5. Abra um **Pull Request**

---

## 📄 Licença

Este projeto é desenvolvido para fins educacionais como parte do curso de FullStack do Capacita Brasil.

---
