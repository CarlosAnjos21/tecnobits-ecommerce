import React from 'react';
import styles from './PaginaCliente.module.css';
// Supondo que a importação de ListaPedidos está correta
import { ListaPedidos } from '../PedidosClientePage'; 

// Dados do cliente atualizados com o endereço
const mockCustomerData = {
    name: 'João da Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-8888',
    memberSince: '12/01/2024',
    address: 'Rua das Flores, 123, Bairro Jardim, São Paulo - SP, 01234-567' // <-- Endereço adicionado
};

const PaginaCliente = () => {

  const handleEditData = () => {
    console.log('Navegar para a página de edição de dados do cliente.');
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Painel do Cliente</h1>

      {/* Seção de Pedidos Recentes */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Meus Pedidos Recentes</h2>
        <ListaPedidos />
      </section>

      {/* Seção de Dados Pessoais (com a alteração) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Meus Dados</h2>
            <button onClick={handleEditData} className={styles.actionButton}>
                Editar Meus Dados
            </button>
        </div>
        <div className={styles.dataList}>
            <div className={styles.dataField}>
                <strong>Nome:</strong>
                <span>{mockCustomerData.name}</span>
            </div>
            <div className={styles.dataField}>
                <strong>Email:</strong>
                <span>{mockCustomerData.email}</span>
            </div>
            <div className={styles.dataField}>
                <strong>Telefone:</strong>
                <span>{mockCustomerData.phone}</span>
            </div>
            {/* --- CAMPO DE ENDEREÇO ADICIONADO --- */}
            <div className={styles.dataField}>
                <strong>Endereço:</strong>
                <span>{mockCustomerData.address}</span>
            </div>
            <div className={styles.dataField}>
                <strong>Cliente desde:</strong>
                <span>{mockCustomerData.memberSince}</span>
            </div>
        </div>
      </section>
    </div>
  );
};

export default PaginaCliente;
