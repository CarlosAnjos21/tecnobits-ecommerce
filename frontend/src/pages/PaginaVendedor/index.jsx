import React, { useState } from 'react';
import styles from './PaginaVendedor.module.css';
import { useNavigate } from 'react-router-dom';

// --- DADOS FALSOS (MOCK DATA) ATUALIZADOS ---
const mockSales = [
    { id: 'v101', productName: 'SSD Kingston NV2 500GB', date: '02/09/2025', amount: 345.99, status: 'Entregue' },
    { id: 'v102', productName: 'iPhone 15 Pro Max', date: '01/09/2025', amount: 7999.99, status: 'Enviado' },
    { id: 'v103', productName: 'Monitor Gamer LG 27"', date: '30/08/2025', amount: 1250.00, status: 'Cancelado' },
];

const mockProducts = [
    { id: 'p01', name: 'SSD Kingston NV2 500GB', stock: 48, price: 345.99 },
    { id: 'p02', name: 'iPhone 15 Pro Max', stock: 15, price: 7999.99 },
];

const mockSellerData = {
    storeName: 'TecnoBits Store',
    ownerName: 'Carlos Pereira',
    email: 'vendedor@tecnobits.com',
    cnpj: '12.345.678/0001-99',
    phone: '(11) 98765-4321',
    address: 'Avenida Principal, 456, Centro, São Paulo - SP'
};

// --- FUNÇÃO AUXILIAR PARA PEGAR A CLASSE DO STATUS ---
const getStatusClass = (status) => {
    switch (status) {
        case 'Entregue':
            return styles.statusEntregue;
        case 'Enviado':
            return styles.statusEnviado;
        case 'Cancelado':
            return styles.statusCancelado;
        default:
            return '';
    }
};

// --- COMPONENTE DO MODAL DE EDIÇÃO ---
const EditSellerDataModal = ({ isOpen, onClose, data, onChange, onSave }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Editar Dados da Loja</h2>
                    <button onClick={onClose} className={styles.closeButton}>&times;</button>
                </div>
                <form onSubmit={onSave} className={styles.modalForm}>
                    <div className={styles.formGroup}><label htmlFor="storeName">Nome da Loja</label><input type="text" id="storeName" name="storeName" value={data.storeName} onChange={onChange} /></div>
                    <div className={styles.formGroup}><label htmlFor="ownerName">Responsável</label><input type="text" id="ownerName" name="ownerName" value={data.ownerName} onChange={onChange} /></div>
                    <div className={styles.formGroup}><label htmlFor="email">Email de Contato</label><input type="email" id="email" name="email" value={data.email} onChange={onChange} /></div>
                    <div className={styles.formGroup}><label htmlFor="cnpj">CNPJ</label><input type="text" id="cnpj" name="cnpj" value={data.cnpj} onChange={onChange} /></div>
                    <div className={styles.formGroup}><label htmlFor="phone">Celular</label><input type="text" id="phone" name="phone" value={data.phone} onChange={onChange} /></div>
                    <div className={styles.formGroup}><label htmlFor="address">Endereço</label><input type="text" id="address" name="address" value={data.address} onChange={onChange} /></div>
                    <div className={styles.modalActions}>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>Cancelar</button>
                        <button type="submit" className={styles.saveButton}>Salvar Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const PaginaVendedor = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sellerData, setSellerData] = useState(mockSellerData);
    const [editingData, setEditingData] = useState(null);

    const handleAddNewProduct = () => {
        navigate('/vendedor/cadastrar-produto');
    };

    const handleEditData = () => {
        setEditingData({ ...sellerData });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleModalFormChange = (e) => {
        const { name, value } = e.target;
        setEditingData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        console.log("Salvando novos dados:", editingData);
        setSellerData(editingData);
        handleCloseModal();
    };

    return (
        <>
            <div className={styles.dashboardContainer}>
                <h1 className={styles.title}>Painel do Vendedor</h1>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Dados da Minha Loja</h2>
                        <button onClick={handleEditData} className={styles.actionButton}>
                            Editar Dados
                        </button>
                    </div>
                    <div className={styles.dataList}>
                        <div className={styles.dataField}><strong>Nome da Loja:</strong><span>{sellerData.storeName}</span></div>
                        <div className={styles.dataField}><strong>Responsável:</strong><span>{sellerData.ownerName}</span></div>
                        <div className={styles.dataField}><strong>Email de Contato:</strong><span>{sellerData.email}</span></div>
                        <div className={styles.dataField}><strong>CNPJ:</strong><span>{sellerData.cnpj}</span></div>
                        <div className={styles.dataField}><strong>Celular:</strong><span>{sellerData.phone}</span></div>
                        <div className={styles.dataField}><strong>Endereço:</strong><span>{sellerData.address}</span></div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Minhas Vendas Recentes</h2>
                    <div className={styles.salesList}>
                        {mockSales.map(sale => (
                            <div key={sale.id} className={styles.saleItem}>
                                <span>{sale.productName}</span>
                                <span>{sale.date}</span>
                                <span>R$ {sale.amount.toFixed(2)}</span>
                                <span className={`${styles.status} ${getStatusClass(sale.status)}`}>{sale.status}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Meus Produtos</h2>
                        <button onClick={handleAddNewProduct} className={styles.addProductButton}>
                            + Cadastrar Novo Produto
                        </button>
                    </div>
                    <div className={styles.productsList}>
                        <div className={styles.productsHeader}>
                            <span>Produto</span><span>Estoque</span><span>Preço</span><span>Ações</span>
                        </div>
                        {mockProducts.map(product => (
                            <div key={product.id} className={styles.productItem}>
                                <span>{product.name}</span><span>{product.stock}</span><span>R$ {product.price.toFixed(2)}</span>
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
            </div>
            <EditSellerDataModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                data={editingData}
                onChange={handleModalFormChange}
                onSave={handleSaveChanges}
            />
        </>
    );
};

export default PaginaVendedor;

