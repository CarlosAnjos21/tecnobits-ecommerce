import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './DetalhesPedidoClientePage.module.css'; 
import { FaBox, FaCreditCard, FaMapPin, FaRegCalendarAlt } from 'react-icons/fa';

// --- DADOS FALSOS  ---
const mockOrdersDatabase = {
    'ef789': {
        id: 'ef789', date: '15/07/2025', total: 89.90, status: 'Entregue',
        shippingAddress: 'Rua das Flores, 123, São Paulo, SP, 01000-100',
        paymentMethod: 'Cartão de Crédito final 4321',
        items: [
            { id: 'p03', name: 'Mousepad Gamer HyperX', quantity: 1, price: 89.90, image: 'https://placehold.co/100x100/E5E7EB/374151?text=Mousepad' }
        ]
    },
    'ab123': {
        id: 'ab123', date: '01/09/2025', total: 250.50, status: 'Enviado',
        shippingAddress: 'Avenida Principal, 456, Rio de Janeiro, RJ, 20000-200',
        paymentMethod: 'PIX',
        trackingCode: 'BR123456789CD',
        items: [
            { id: 'p04', name: 'Headset Gamer Redragon', quantity: 1, price: 250.50, image: 'https://placehold.co/100x100/E5E7EB/374151?text=Headset' }
        ]
    },
    'cd456': {
        id: 'cd456', date: '28/08/2025', total: 1999.99, status: 'Processando',
        shippingAddress: 'Praça da Sé, 789, São Paulo, SP, 01001-000',
        paymentMethod: 'Boleto Bancário',
        items: [
            { id: 'p05', name: 'Monitor Gamer Samsung 27"', quantity: 1, price: 1850.00, image: 'https://placehold.co/100x100/E5E7EB/374151?text=Monitor' },
            { id: 'p06', name: 'Cabo HDMI 2.1', quantity: 1, price: 149.99, image: 'https://placehold.co/100x100/E5E7EB/374151?text=Cabo' }
        ]
    },
};


const DetalhesPedidoClientePage = () => {
    const { id } = useParams();
    const order = mockOrdersDatabase[id];

    if (!order) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Pedido não encontrado</h1>
                <Link to="/cliente/dashboard" className={styles.backLink}>&larr; Voltar para seus pedidos</Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Link to="/cliente/dashboard" className={styles.backLink}>&larr; Voltar para a lista</Link>
            <h1 className={styles.title}>Detalhes do Pedido #{order.id}</h1>

            {/*Resumo do Pedido */}
            <div className={styles.summaryGrid}>
                <div className={styles.summaryCard}>
                    <FaRegCalendarAlt className={styles.icon} />
                    <strong>Data do Pedido</strong>
                    <span>{order.date}</span>
                </div>
                <div className={styles.summaryCard}>
                    <FaMapPin className={styles.icon} />
                    <strong>Endereço de Entrega</strong>
                    <span>{order.shippingAddress}</span>
                </div>
                <div className={styles.summaryCard}>
                    <FaCreditCard className={styles.icon} />
                    <strong>Forma de Pagamento</strong>
                    <span>{order.paymentMethod}</span>
                </div>
                <div className={styles.summaryCard}>
                    <FaBox className={styles.icon} />
                    <strong>Status do Pedido</strong>
                    <span className={styles.status}>{order.status}</span>
                </div>
            </div>

            {/* Itens do Pedido */}
            <div className={styles.itemsSection}>
                <h2 className={styles.sectionTitle}>Itens do Pedido</h2>
                <div className={styles.itemsList}>
                    {order.items.map(item => (
                        <div key={item.id} className={styles.itemCard}>
                            <img src={item.image} alt={item.name} className={styles.itemImage} />
                            <div className={styles.itemDetails}>
                                <span className={styles.itemName}>{item.name}</span>
                                <span className={styles.itemQuantity}>Quantidade: {item.quantity}</span>
                            </div>
                            <span className={styles.itemPrice}>R$ {item.price.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.totalSection}>
                    <span>Total do Pedido:</span>
                    <span className={styles.totalPrice}>R$ {order.total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};


export default DetalhesPedidoClientePage;