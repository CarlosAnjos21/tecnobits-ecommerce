import React, { useEffect, useMemo, useState } from 'react';
import styles from './PaginaVendedor.module.css';
import StatusTag from '../../components/StatusTag';
import { getSellerOrders } from '../../services/orderService';
import { useAuth } from '../../contexts/AuthContext';

// Este componente cuida apenas da seção "Minhas Vendas Recentes"
const VendasRecentes = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filtros
    const [status, setStatus] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [buyerId, setBuyerId] = useState(''); // opcional (útil para admin visualizar seller)

    // Paginação: 10 itens por página (client-side fallback caso API não pagine)
    const PAGE_SIZE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [serverPagination, setServerPagination] = useState(null);

    // Busca dados reais do backend
    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.id) return;
            setLoading(true);
            setError(null);
            try {
                // Tenta usar paginação do servidor
                const params = { page: currentPage, pageSize: PAGE_SIZE };
                if (status) params.status = status;
                if (from) params.from = from;
                if (to) params.to = to;
                if (buyerId) params.buyerId = buyerId;
                const resp = await getSellerOrders(params);
                if (Array.isArray(resp)) {
                    // Backend sem paginação: recebe array completo
                    setOrders(resp);
                    setServerPagination(null);
                } else if (resp && Array.isArray(resp.data) && resp.pagination) {
                    setOrders(resp.data);
                    setServerPagination(resp.pagination);
                } else {
                    // Formato inesperado, tenta normalizar
                    const arr = resp?.data || resp || [];
                    setOrders(Array.isArray(arr) ? arr : []);
                    setServerPagination(resp?.pagination || null);
                }
            } catch (err) {
                console.error('Erro ao carregar vendas do vendedor:', err);
                setError(err?.response?.data?.message || err.message || 'Erro ao carregar vendas');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id, currentPage, status, from, to, buyerId]);

    // Resetar para página 1 quando filtros mudarem
    useEffect(() => {
        setCurrentPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, from, to, buyerId]);

    const totalPages = useMemo(() => {
        if (serverPagination?.totalPages) return serverPagination.totalPages;
        return Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
    }, [orders.length, serverPagination]);

    useEffect(() => {
        // Garante que a página atual não ultrapasse o total quando os dados mudarem
        if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [currentPage, totalPages]);

    const pageItems = useMemo(() => {
        if (serverPagination) {
            // Quando o servidor já retorna a página corrente
            return orders;
        }
        const start = (currentPage - 1) * PAGE_SIZE;
        return orders.slice(start, start + PAGE_SIZE);
    }, [currentPage, orders, serverPagination]);
    
    // StatusTag padroniza as cores/labels

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Minhas Vendas</h2>

            {/* Filtros */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
                <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: 6 }}>
                    <option value=''>Todos os status</option>
                    <option value='AGUARDANDO_PAGAMENTO'>Aguardando pagamento</option>
                    <option value='PAGAMENTO_CONFIRMADO'>Pagamento confirmado</option>
                    <option value='EM_PREPARACAO'>Em preparação</option>
                    <option value='ENVIADO'>Enviado</option>
                    <option value='ENTREGUE'>Entregue</option>
                    <option value='CANCELADO'>Cancelado</option>
                    <option value='DEVOLVIDO'>Devolvido</option>
                </select>
                <div>
                    <label style={{ fontSize: 12, color: '#666' }}>De</label>
                    <input type='date' value={from} onChange={(e) => setFrom(e.target.value)} style={{ padding: 6, display: 'block' }} />
                </div>
                <div>
                    <label style={{ fontSize: 12, color: '#666' }}>Até</label>
                    <input type='date' value={to} onChange={(e) => setTo(e.target.value)} style={{ padding: 6, display: 'block' }} />
                </div>
                <input
                    type='text'
                    placeholder='ID do cliente (opcional)'
                    value={buyerId}
                    onChange={(e) => setBuyerId(e.target.value)}
                    style={{ padding: 6, minWidth: 220 }}
                />
            </div>
            <div className={styles.salesList}>
                <div className={styles.salesHeader}>
                    <span>Produto</span>
                    <span>Data</span>
                    <span>Valor</span>
                    <span>Status</span>
                </div>
                {loading ? (
                    <div className={styles.loading}>Carregando vendas...</div>
                ) : error ? (
                    <div className={styles.error}>{error}</div>
                ) : pageItems.length === 0 ? (
                    <div className={styles.noProducts}>Nenhuma venda encontrada</div>
                ) : (
                    pageItems.map(order => (
                        <div key={order.id} className={styles.saleItem}>
                            <span>{order.items?.[0]?.product?.title || '—'}</span>
                            <span>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</span>
                            <span>R$ {(order.totalVendedor ?? order.items?.reduce((acc, it) => acc + Number(it.price) * it.quantity, 0)).toFixed(2)}</span>
                            <StatusTag status={order.status} />
                        </div>
                    ))
                )}
            </div>

            {/* Paginação numérica */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            disabled={currentPage === page}
                            style={{
                                padding: '6px 10px',
                                borderRadius: 6,
                                border: '1px solid #ddd',
                                background: currentPage === page ? '#333' : '#fff',
                                color: currentPage === page ? '#fff' : '#333',
                                cursor: currentPage === page ? 'default' : 'pointer'
                            }}
                            aria-current={currentPage === page ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
};

export default VendasRecentes;