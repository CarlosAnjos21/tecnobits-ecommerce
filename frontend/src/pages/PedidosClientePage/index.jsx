import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PedidosClientePage.module.css'; 

// Adicionei mais status para demonstrar as cores
const mockOrders = [
  { id: 'ef789', date: '15/07/2025', total: 89.90, status: 'Entregue' },
  { id: 'ab123', date: '01/09/2025', total: 250.50, status: 'Enviado' },
  { id: 'gh012', date: '02/09/2025', total: 75.00, status: 'Cancelado' },
  { id: 'cd456', date: '28/08/2025', total: 1999.99, status: 'Processando' },
];

// Função para obter a classe de estilo do status
const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
        case 'entregue':
            return styles.statusEntregue;
        case 'enviado':
            return styles.statusEnviado;
        case 'cancelado':
            return styles.statusCancelado;
        default:
            return ''; // Estilo padrão
    }
};

// Componente que lista os pedidos (agora com layout de grade)
const ListaPedidos = () => {
    return (
        <div className={styles.ordersList}>
            <div className={styles.orderHeader}>
                <span>Pedido</span>
                <span>Data</span>
                <span>Total</span>
                <span>Status</span>
                <span>Ações</span>
            </div>
        {mockOrders.length > 0 ? (
          mockOrders.map(order => (
            <div key={order.id} className={styles.orderItem}>
              <span className={styles.orderId}>#{order.id}</span>
              <span>{order.date}</span>
              <span>R$ {order.total.toFixed(2)}</span>
              <span className={`${styles.status} ${getStatusClass(order.status)}`}>
                {order.status}
              </span>
              <Link to={`/orders/${order.id}`} className={styles.detailsLink}>
                Ver detalhes
              </Link>
            </div>
          ))
        ) : (
          <p>Você ainda não fez nenhum pedido.</p>
        )}
      </div>
    );
}

// A página completa (se for usada de forma independente)
const PedidosClientePage = () => {
  return (
    <div className={styles.ordersContainer}>
      <h1 className={styles.title}>Meus Pedidos</h1>
      <ListaPedidos />
    </div>
  );
};

export { ListaPedidos };
export default PedidosClientePage;
