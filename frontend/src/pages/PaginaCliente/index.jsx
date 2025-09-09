import React, { useState } from 'react';
import styles from './PaginaCliente.module.css';
import { ListaPedidos } from '../PedidosClientePage'; 

// --- DADOS FALSOS (MOCK DATA) ---
const mockCustomerData = {
    name: 'João da Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-8888',
    memberSince: '12/01/2024',
    address: 'Rua das Flores, 123, São Paulo, SP'
};

const PaginaCliente = () => {
  const [customerData, setCustomerData] = useState(mockCustomerData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableData, setEditableData] = useState({});

  const handleEditData = () => {
    setEditableData(customerData); // Carrega os dados atuais no modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditableData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setCustomerData(editableData); // Salva os dados editados
    console.log("Dados do cliente salvos:", editableData);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Painel do Cliente</h1>

      {/* Seção de Dados Pessoais */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Meus Dados</h2>
            <button onClick={handleEditData} className={styles.actionButton}>
                Editar Meus Dados
            </button>
        </div>
        <div className={styles.dataList}>
            <div className={styles.dataField}>
                <strong>Nome:</strong> <span>{customerData.name}</span>
            </div>
            <div className={styles.dataField}>
                <strong>Email:</strong> <span>{customerData.email}</span>
            </div>
            <div className={styles.dataField}>
                <strong>Telefone:</strong> <span>{customerData.phone}</span>
            </div>
            <div className={styles.dataField}>
                <strong>Endereço:</strong> <span>{customerData.address}</span>
            </div>
        </div>
      </section>

      {/* Seção de Pedidos Recentes */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Meus Pedidos Recentes</h2>
        <ListaPedidos />
      </section>

      {/* --- MODAL DE EDIÇÃO --- */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Editar Meus Dados</h2>
              <button onClick={handleCloseModal} className={styles.closeButton}>&times;</button>
            </div>
            <form onSubmit={handleSaveChanges} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nome Completo</label>
                <input type="text" id="name" name="name" value={editableData.name} onChange={handleModalChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={editableData.email} onChange={handleModalChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Celular</label>
                <input type="text" id="phone" name="phone" value={editableData.phone} onChange={handleModalChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address">Endereço</label>
                <input type="text" id="address" name="address" value={editableData.address} onChange={handleModalChange} />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={handleCloseModal} className={styles.cancelButton}>Cancelar</button>
                <button type="submit" className={styles.saveButton}>Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginaCliente;

