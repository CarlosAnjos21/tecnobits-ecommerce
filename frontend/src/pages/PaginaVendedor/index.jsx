import React from 'react';
import styles from './PaginaVendedor.module.css';
import { useNavigate } from 'react-router-dom';

// --- DADOS FALSOS (MOCK DATA) PARA CONSTRUIR O LAYOUT ---
const mockSales = [
  { id: 'v101', productName: 'SSD Kingston NV2 500GB', date: '02/09/2025', amount: 345.99, status: 'Entregue' },
  { id: 'v102', productName: 'iPhone 15 Pro Max', date: '01/09/2025', amount: 7999.99, status: 'Enviado' },
];

const mockProducts = [
    { id: 'p01', name: 'SSD Kingston NV2 500GB', stock: 48, price: 345.99 },
    { id: 'p02', name: 'iPhone 15 Pro Max', stock: 15, price: 7999.99 },
];

const PaginaVendedor = () => {
  const navigate = useNavigate();

  const handleAddNewProduct = () => {
    navigate('/vendedor/cadastrar-produto');
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Painel do Vendedor</h1>

      {/* Seção de Vendas Recentes */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Minhas Vendas Recentes</h2>
        <div className={styles.salesList}>
          {mockSales.map(sale => (
            <div key={sale.id} className={styles.saleItem}>
              <span>{sale.productName}</span>
              <span>{sale.date}</span>
              <span>R$ {sale.amount.toFixed(2)}</span>
              <span className={styles.status}>{sale.status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Produtos */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Meus Produtos</h2>
            <button onClick={handleAddNewProduct} className={styles.addProductButton}>
                + Cadastrar Novo Produto
            </button>
        </div>
        <div className={styles.productsList}>
            <div className={styles.productsHeader}>
                <span>Produto</span>
                <span>Estoque</span>
                <span>Preço</span>
                <span>Ações</span>
            </div>
            {mockProducts.map(product => (
                <div key={product.id} className={styles.productItem}>
                    <span>{product.name}</span>
                    <span>{product.stock}</span>
                    <span>R$ {product.price.toFixed(2)}</span>
                    <button className={styles.editButton}>Editar</button>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default PaginaVendedor;