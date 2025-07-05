import './BestSellers.css';
import BestSellerCard from './BestSellerCard';
import products from '../../data/products.json';
import { bestSellersConfig } from '../../data/bestSellersConfig';

const BestSellers = ({ 
  maxProducts = bestSellersConfig.maxProducts,
  filterCriteria = bestSellersConfig.filterCriteria,
  className = '' 
}) => {
  // Função para filtrar produtos mais vendidos com diversidade garantida
  const getBestSellingProducts = () => {
    let filteredProducts = products;
    
    // Aplicar critério de filtro das configurações
    if (filterCriteria) {
      filteredProducts = products.filter(filterCriteria);
    }
    
    // Agrupar produtos por categoria
    const productsByCategory = filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});
    
    // Ordenar produtos dentro de cada categoria por qualidade
    Object.keys(productsByCategory).forEach(category => {
      productsByCategory[category].sort((a, b) => {
        // Primeiro por rating (maior rating primeiro)
        if (a.rating !== b.rating) {
          return (b.rating || 0) - (a.rating || 0);
        }
        // Depois por desconto (maior desconto primeiro)
        const discountA = a.priceDiscount ? ((a.price - a.priceDiscount) / a.price) * 100 : 0;
        const discountB = b.priceDiscount ? ((b.price - b.priceDiscount) / b.price) * 100 : 0;
        return discountB - discountA;
      });
    });
    
    const selectedProducts = [];
    
    // Estratégia 1: Selecionar pelo menos 1 produto de cada categoria prioritária
    bestSellersConfig.priorityCategories.forEach(category => {
      if (productsByCategory[category] && productsByCategory[category].length > 0 && selectedProducts.length < maxProducts) {
        selectedProducts.push(productsByCategory[category].shift());
      }
    });
    
    // Estratégia 2: Preencher o restante de forma equilibrada
    const allCategories = Object.keys(productsByCategory).filter(cat => productsByCategory[cat].length > 0);
    let rounds = 0;
    const maxRounds = 10; // Evitar loop infinito
    
    while (selectedProducts.length < maxProducts && rounds < maxRounds && allCategories.length > 0) {
      for (let i = 0; i < allCategories.length && selectedProducts.length < maxProducts; i++) {
        const category = allCategories[i];
        if (productsByCategory[category] && productsByCategory[category].length > 0) {
          selectedProducts.push(productsByCategory[category].shift());
        }
        
        // Remove categoria se não tem mais produtos
        if (!productsByCategory[category] || productsByCategory[category].length === 0) {
          allCategories.splice(i, 1);
          i--; // Ajusta o índice após remoção
        }
      }
      rounds++;
    }
    
    return selectedProducts.slice(0, maxProducts);
  };

  const bestSellingProducts = getBestSellingProducts();

  return (
    <section className={`best-sellers ${className}`}>
      <div className="best-sellers-grid">
        {bestSellingProducts.map((product, index) => (
          <BestSellerCard 
            key={product.id} 
            product={product} 
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
