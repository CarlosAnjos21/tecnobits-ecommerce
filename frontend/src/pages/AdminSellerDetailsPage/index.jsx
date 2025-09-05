import React from 'react';
import { Link } from 'react-router-dom'; // Para o botão de voltar
import styles from './AdminSellerDetailsPage.module.css';

// Nossos dados falsos de um único vendedor para construir o layout
const mockSellerDetails = {
  id: 1,
  name: 'João da Silva',
  lastName: 'LTDA',
  cpf: '123.456.789-00',
  email: 'joao.silva@email.com',
  registrationDate: '04/09/2025',
};

const AdminSellerDetailsPage = () => {
  // No futuro, você pegará os dados do vendedor da API usando o ID da URL
  const seller = mockSellerDetails;

  const handleApprove = () => {
    alert(`Vendedor ${seller.name} APROVADO!`);
    // Aqui virá a lógica para chamar a API de aprovação
  };

  const handleReject = () => {
    alert(`Vendedor ${seller.name} REJEITADO!`);
    // Aqui virá a lógica para chamar a API de rejeição
  };

  return (
    <div className={styles.detailsContainer}>
      <Link to="/admin/dashboard" className={styles.backLink}>&larr; Voltar para a lista</Link>
      
      <h1 className={styles.title}>Detalhes do Vendedor</h1>
      
      <div className={styles.detailsCard}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Nome Completo:</span>
          <span className={styles.detailValue}>{`${seller.name} ${seller.lastName}`}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>CPF:</span>
          <span className={styles.detailValue}>{seller.cpf}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Email:</span>
          <span className={styles.detailValue}>{seller.email}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Data do Cadastro:</span>
          <span className={styles.detailValue}>{seller.registrationDate}</span>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button onClick={handleApprove} className={`${styles.btn} ${styles.btnApprove}`}>
          Aprovar Cadastro
        </button>
        <button onClick={handleReject} className={`${styles.btn} ${styles.btnReject}`}>
          Rejeitar Cadastro
        </button>
      </div>
    </div>
  );
};

export default AdminSellerDetailsPage;