import api from './api';

export const getOrdersByUser = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Cria um novo pedido a partir do carrinho do usuário autenticado
// payload esperado pelo backend (orderService.createOrderFromCart):
// { cep, cidade, enderecoEntrega, complemento?, dataEntregaPrevista?, estado, metodoPagamento }
export const createOrder = async (payload) => {
  const response = await api.post('/orders', payload);
  return response.data;
};

// Cancela um pedido do usuário autenticado (ou admin)
export const cancelOrder = async (id) => {
  const response = await api.patch(`/orders/${id}/cancel`);
  return response.data;
};


