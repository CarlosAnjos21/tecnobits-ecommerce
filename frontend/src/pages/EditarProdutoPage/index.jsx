import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EditarProdutoPage.module.css';

// Em uma aplicação real, estes dados viriam de uma API ou de um estado global (Context, Redux).
// Por agora, vamos replicá-los aqui para que o componente funcione de forma independente.
const mockProducts = [
    { id: 'p01', name: 'SSD Kingston NV2 500GB', stock: 48, price: 345.99 },
    { id: 'p02', name: 'iPhone 15 Pro Max', stock: 15, price: 7999.99 },
];

const EditarProdutoPage = () => {
    const { id } = useParams(); // Pega o ID do produto da URL
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Encontra o produto correspondente ao ID na nossa lista de mock data
        const productToEdit = mockProducts.find(p => p.id === id);
        if (productToEdit) {
            setProduct(productToEdit);
        } else {
            // Opcional: redirecionar se o produto não for encontrado
            console.error("Produto não encontrado!");
            navigate('/vendedor/dashboard');
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para salvar o produto (aqui apenas simulamos no console)
        console.log("Salvando alterações no produto:", product);
        alert("Produto salvo com sucesso!");
        navigate('/vendedor/dashboard'); // Volta para o painel
    };
    
    // Mostra um loading enquanto o produto é "buscado"
    if (!product) {
        return <div className={styles.loading}>Carregando produto...</div>;
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>Editar Produto</h1>
                <p className={styles.subtitle}>Altere os detalhes do produto abaixo.</p>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nome do Produto *</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={product.name}
                            onChange={handleChange}
                            placeholder="Nome do produto"
                        />
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="stock">Estoque *</label>
                            <input
                                id="stock"
                                name="stock"
                                type="number"
                                value={product.stock}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="price">Preço (R$) *</label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                value={product.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button type="button" className={styles.cancelButton} onClick={() => navigate('/vendedor/dashboard')}>
                            Cancelar
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarProdutoPage;