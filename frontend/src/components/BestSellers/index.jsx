import React from 'react';
import BestSellerCard from './BestSellerCard';
import { bestSellersConfig } from '../../data/bestSellersConfig';
import './BestSellers.css';

const BestSellers = () => {
  const products = bestSellersConfig.products;

  return (
    <div className="best-sellers-container">
      <div className="best-sellers-grid">
        {products.map((product, index) => (
          <BestSellerCard 
            key={product.id} 
            product={product} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
