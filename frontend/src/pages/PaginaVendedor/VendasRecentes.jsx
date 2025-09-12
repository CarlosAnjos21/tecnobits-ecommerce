import React from 'react';
import styles from './PaginaVendedor.module.css';

// Este componente cuida apenas da seção "Minhas Vendas Recentes"
const VendasRecentes = () => {
    const mockSales = [
        { id: 'v101', productName: 'SSD Kingston NV2 500GB', date: '02/09/2025', amount: 345.99, status: 'Entregue' },
        { id: 'v102', productName: 'iPhone 15 Pro Max', date: '01/09/2025', amount: 7999.99, status: 'Enviado' },
        { id: 'v103', productName: 'Teclado Mecânico', date: '30/08/2025', amount: 350.00, status: 'Cancelado' },
    ];
    
    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'entregue': return styles.statusEntregue;
            case 'enviado': return styles.statusEnviado;
            case 'cancelado': return styles.statusCancelado;
            default: return '';
        }
    };

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Minhas Vendas Recentes</h2>
            <div className={styles.salesList}>
                <div className={styles.salesHeader}>
                    <span>Produto</span>
                    <span>Data</span>
                    <span>Valor</span>
                    <span>Status</span>
                </div>
                {mockSales.map(sale => (
                    <div key={sale.id} className={styles.saleItem}>
                        <span>{sale.productName}</span>
                        <span>{sale.date}</span>
                        <span>R$ {sale.amount.toFixed(2)}</span>
                        <span className={`${styles.status} ${getStatusClass(sale.status)}`}>
                            {sale.status}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default VendasRecentes;