/*Página de cadastro dos produtos*/
import React, { useState } from 'react';
import styles from './CadastroProdutosPage.module.css';
import { useNavigate } from 'react-router-dom';

const CadastroProdutosPage = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    category: '', 
  });
  const [productImage, setProductImage] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProductImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productData.title || !productData.price || !productImage) {
      setError('Por favor, preencha todos os campos obrigatórios e adicione uma imagem.');
      return;
    }
    setError('');
    
    console.log('Dados do produto para enviar:', { ...productData, image: productImage.name });
    alert('Produto cadastrado com sucesso! (Simulação)');
    navigate('/vendedor/dashboard'); // Volta para o painel após salvar
  };

  return (
    <div className={styles.uploadContainer}>
      <h1 className={styles.title}>Cadastrar Novo Produto</h1>
      <form className={styles.uploadForm} onSubmit={handleSubmit}>
        
        <div className={styles.formGroup}>
          <label htmlFor="title">Título do Produto *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={productData.title}
            onChange={handleChange}
            placeholder="Ex: Monitor Gamer UltraWide 29''"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Descrição *</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows="6"
            placeholder="Descreva os detalhes e especificações do produto"
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="price">Preço (R$) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              placeholder="Ex: 1299.99"
              step="0.01"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="stock">Quantidade em Estoque *</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              placeholder="Ex: 50"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Foto do Produto *</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        {/* --- ÁREA DOS BOTÕES ATUALIZADA --- */}
        <div className={styles.actions}>
            <button 
                type="button" 
                className={styles.backButton} 
                onClick={() => navigate('/vendedor/dashboard')}
            >
                Voltar
            </button>
            <button type="submit" className={styles.submitButton}>
                Cadastrar Produto
            </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroProdutosPage;

