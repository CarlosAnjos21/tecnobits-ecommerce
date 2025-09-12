import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PaginaVendedor.module.css';

// Este componente cuida apenas da seção "Meus Produtos"
const MeusProdutos = () => {
    const navigate = useNavigate();
    const mockProducts = [
        { id: 'p01', name: 'SSD Kingston NV2 500GB', stock: 48, price: 345.99 },
        { id: 'p02', name: 'iPhone 15 Pro Max', stock: 15, price: 7999.99 },
    ];

    const handleAddNewProduct = () => {
        navigate('/vendedor/cadastrar-produto');
    };

    return (
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
                        <button 
                            className={styles.editButton} 
                            onClick={() => navigate(`/vendedor/produtos/editar/${product.id}`)}
                        >
                            Editar
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MeusProdutos;