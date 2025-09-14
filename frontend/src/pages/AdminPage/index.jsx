import React from 'react';
import styles from './AdminPage.module.css'; // Ou .css, conforme seu projeto
import { useNavigate } from 'react-router-dom'; // 1. IMPORTAR O useNavigate

// Nossos dados falsos (mock data) para construir o layout
const mockPendingSellers = [
  { id: 1, name: 'João da Silva LTDA', registrationDate: '04/09/2025' },
  { id: 2, name: 'Maria Eletrônicos', registrationDate: '03/09/2025' },
  { id: 3, name: 'Importados do Zé', registrationDate: '02/09/2025' },
];

const AdminPage = () => {
  const navigate = useNavigate(); // 2. INICIALIZAR O useNavigate

  // 3. FUNÇÃO PARA NAVEGAR PARA A PÁGINA DE DETALHES
  const handleViewDetails = (sellerId) => {
    navigate(`/admin/seller/${sellerId}`);
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Painel do Administrador</h1>
      <h2 className={styles.subtitle}>Vendedores com Cadastro Pendente</h2>

      <div className={styles.pendingList}>
        {mockPendingSellers.map(seller => (
          <div key={seller.id} className={styles.sellerCard}>
            <div className={styles.sellerInfo}>
              <span className={styles.sellerName}>{seller.name}</span>
              <span className={styles.sellerDate}>Data do cadastro: {seller.registrationDate}</span>
            </div>
            <div className={styles.sellerActions}>
              {/* 4. ADICIONADO O onClick NO BOTÃO */}
              <button 
                  className={styles.detailsButton} 
                  onClick={() => handleViewDetails(seller.id)}
              >
                Ver Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;