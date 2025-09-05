import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PedidosClientePage.css';

// Dados falsos (mock data) para o histórico de pedidos
const mockOrders = [
  { id: 'ab123', date: '01/09/2025', total: 250.50, status: 'Enviado' },
  { id: 'cd456', date: '28/08/2025', total: 1999.99, status: 'Processando' },
  { id: 'ef789', date: '15/07/2025', total: 89.90, status: 'Entregue' },
];

const PedidosClientePage = () => {
  return (
    <div className={styles.ordersContainer}>
      <h1 className={styles.title}>Meus Pedidos</h1>

      <div className={styles.ordersList}>
        {mockOrders.length > 0 ? (
          mockOrders.map(order => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <span className={styles.orderId}>Pedido #{order.id}</span>
                <span className={styles.orderStatus}>{order.status}</span>
              </div>
              <div className={styles.orderDetails}>
                <span>Data: {order.date}</span>
                <span>Total: R$ {order.total.toFixed(2)}</span>
              </div>
              <Link to={`/orders/${order.id}`} className={styles.detailsLink}>
                Ver detalhes do pedido
              </Link>
            </div>
          ))
        ) : (
          <p>Você ainda não fez nenhum pedido.</p>
        )}
      </div>
    </div>
  );
};

export default PedidosClientePage;