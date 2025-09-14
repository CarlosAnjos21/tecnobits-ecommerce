import React, { useState } from 'react';
import styles from './PaginaVendedor.module.css'; // Reutilizando os estilos principais

// Este componente cuida apenas da seção "Dados da Minha Loja" e do modal
const DadosLoja = () => {
    const mockInitialData = {
        storeName: 'TecnoBits Store',
        ownerName: 'Carlos Pereira',
        email: 'vendedor@tecnobits.com',
        cnpj: '12.345.678/0001-99',
        phone: '(11) 98765-4321',
        address: 'Rua da Tecnologia, 456, São Paulo, SP'
    };
    
    const [sellerData, setSellerData] = useState(mockInitialData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editableData, setEditableData] = useState({});

    const handleEditData = () => {
        setEditableData(sellerData);
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
        setSellerData(editableData);
        console.log("Dados da loja salvos:", editableData);
        setIsModalOpen(false);
    };

    return (
        <>
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Dados da Minha Loja</h2>
                    <button onClick={handleEditData} className={styles.actionButton}>
                        Editar Dados
                    </button>
                </div>
                <div className={styles.dataList}>
                    <div className={styles.dataField}>
                        <strong>Nome da Loja:</strong> <span>{sellerData.storeName}</span>
                    </div>
                    <div className={styles.dataField}>
                        <strong>Responsável:</strong> <span>{sellerData.ownerName}</span>
                    </div>
                    <div className={styles.dataField}>
                        <strong>Email:</strong> <span>{sellerData.email}</span>
                    </div>
                    <div className={styles.dataField}>
                        <strong>CNPJ:</strong> <span>{sellerData.cnpj}</span>
                    </div>
                    <div className={styles.dataField}>
                        <strong>Celular:</strong> <span>{sellerData.phone}</span>
                    </div>
                    <div className={styles.dataField}>
                        <strong>Endereço:</strong> <span>{sellerData.address}</span>
                    </div>
                </div>
            </section>

            {isModalOpen && (
                 <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>Editar Dados da Loja</h2>
                            <button onClick={handleCloseModal} className={styles.closeButton}>&times;</button>
                        </div>
                        <form onSubmit={handleSaveChanges} className={styles.modalForm}>
                            <div className={styles.formGroup}>
                                <label>Nome da Loja</label>
                                <input type="text" name="storeName" value={editableData.storeName} onChange={handleModalChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Responsável</label>
                                <input type="text" name="ownerName" value={editableData.ownerName} onChange={handleModalChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input type="email" name="email" value={editableData.email} onChange={handleModalChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>CNPJ</label>
                                <input type="text" name="cnpj" value={editableData.cnpj} onChange={handleModalChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Celular</label>
                                <input type="text" name="phone" value={editableData.phone} onChange={handleModalChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Endereço</label>
                                <input type="text" name="address" value={editableData.address} onChange={handleModalChange} />
                            </div>
                            <div className={styles.modalActions}>
                                <button type="button" onClick={handleCloseModal} className={styles.cancelButton}>Cancelar</button>
                                <button type="submit" className={styles.saveButton}>Salvar Alterações</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default DadosLoja;