import orderService from "../services/orderService.js";

/**
 * Criar um novo pedido a partir do carrinho do usuário
 */
export const criarPedido = async (req, res) => {
  try {
    const order = await orderService.createOrderFromCart(req.user.id, req.body);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar pedido", details: error.message });
  }
};

/**
 * Listar pedidos do usuário logado
 */
export const listarMeusPedidos = async (req, res) => {
  try {
    const orders = await orderService.listMyOrders(req.user.id);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar seus pedidos", details: error.message });
  }
};

/**
 * Listar todos os pedidos (admin)
 */
export const listarTodosPedidos = async (req, res) => {
  try {
    const { page, pageSize, status, from, to, buyerId } = req.query;
    const result = await orderService.listAllOrdersPaginated({ page, pageSize, status, from, to, buyerId });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar todos os pedidos", details: error.message });
  }
};

/**
 * Atualizar status de um pedido (apenas admin)
 */
export const atualizarStatusPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;  // verificar se valor de status é um dos OrderStatus
    const order = await orderService.updateOrderStatus(id, status);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar status do pedido", details: error.message });
  }
};

/**
 * Cancelar pedido (cliente proprietário ou admin)
 */
export const cancelarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await orderService.cancelOrder(id, req.user);
    res.json(updated);
  } catch (error) {
    console.error(error);
    const status = error.statusCode || 500;
    res.status(status).json({ error: "Erro ao cancelar pedido", details: error.message });
  }
};

/**
 * Listar pedidos que tenham itens do vendedor logado
 */
export const listarPedidosDoVendedor = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { page, pageSize, status, from, to, buyerId } = req.query;
    const result = await orderService.listSellerOrdersPaginated(sellerId, { page, pageSize, status, from, to, buyerId });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar pedidos do vendedor", details: error.message });
  }
};
