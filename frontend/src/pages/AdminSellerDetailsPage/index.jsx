import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminSellerDetailsPage.module.css';

// Dados falsos atualizados com as novas informações
const mockSellerDetails = {
  id: 1,
  name: 'João da Silva LTDA',
  cnpj: '12.345.678/0001-99',
  email: 'joao.silva@email.com',
  phone: '(11) 98765-4321',
  address: 'Rua das Indústrias, 789, São Paulo, SP',
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
          <span className={styles.detailLabel}>Nome da Empresa:</span>
          <span className={styles.detailValue}>{seller.name}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>CNPJ:</span>
          <span className={styles.detailValue}>{seller.cnpj}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Email:</span>
          <span className={styles.detailValue}>{seller.email}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Telefone:</span>
          <span className={styles.detailValue}>{seller.phone}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Endereço:</span>
          <span className={styles.detailValue}>{seller.address}</span>
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
