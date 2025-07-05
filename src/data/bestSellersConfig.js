import { priceUtils } from '../utils/priceUtils';

// Configurações para produtos campeões de vendas
export const bestSellersConfig = {
  // Quantidade máxima de produtos a exibir
  maxProducts: 3,
  
  // Categorias priorizadas para campeões de vendas (ordem de prioridade)
  priorityCategories: [
    'smartphone',
    'notebook', 
    'headphone',
    'processor',
    'tablet',
    'smart-tv',
    'graphics-card'
  ],
  
  // Critério de filtro para produtos em destaque
  filterCriteria: (product) => {
    // Validação de segurança
    if (!product || !priceUtils.isValidPrice(product.price)) {
      return false;
    }
    
    // Produtos em estoque
    if (!product.inStock) {
      return false;
    }
    
    // Produtos com rating mínimo ou com desconto
    const hasGoodRating = product.rating && product.rating >= 4.0;
    const hasDiscount = product.priceDiscount && product.priceDiscount < product.price;
    
    return hasGoodRating || hasDiscount;
  },
  
  // Configurações de exibição
  displayConfig: {
    showDiscount: true,
    showRating: true,
    showStock: false,
    highlightBestSeller: true
  }
};
