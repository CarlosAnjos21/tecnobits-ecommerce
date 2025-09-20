import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './PedidosClientePage.module.css'; 
import { getOrdersByUser } from '../../services/orderService';

// Adicionei mais status para demonstrar as cores
const PedidosClientePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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


const PedidosClientePage = () => {
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrdersByUser();
        setOrders(data);
      } catch (err) {
        setError('Erro ao carregar pedidos.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Meus Pedidos</h1>
      {loading ? (
        <p>Carregando pedidos...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : orders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <ul className={styles.orderList}>
          {orders.map(order => (
            <li key={order.id} className={styles.orderItem}>
              <Link to={`/orders/${order.id}`} className={styles.orderLink}>
                <span className={styles.orderId}>#{order.id}</span>
                <span className={styles.orderDate}>{order.date || order.createdAt?.slice(0,10)}</span>
                <span className={styles.orderTotal}>R$ {order.total?.toFixed(2) || order.totalAmount?.toFixed(2)}</span>
                <span className={`${styles.orderStatus} ${getStatusClass(order.status)}`}>{order.status}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/cliente/dashboard" className={styles.backLink}>&larr; Voltar para o painel</Link>
    </div>
  );
};

}
export default PedidosClientePage;
