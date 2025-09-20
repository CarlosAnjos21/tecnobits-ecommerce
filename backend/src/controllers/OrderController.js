/**
 * Listar pedidos que contenham produtos do vendedor logado
 */
export const listarPedidosDoVendedor = async (req, res) => {
  try {
    const vendedorId = req.user.id;
    // Busca pedidos que tenham pelo menos um item de produto do vendedor
    const pedidos = await orderService.listOrdersBySeller(vendedorId, req.query);
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar pedidos do vendedor", details: error.message });
  }
};


import orderService from "../services/orderService.js";

/**
 * Criar um novo pedido a partir do carrinho do usuário
 */
export const criarPedido = async (req, res) => {
  try {
    const userId = req.user.id;
    const payload = req.body;
    const order = await orderService.createOrderFromCart(userId, payload);
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


  // Cancelar pedido (usuário) - vini - inicio
export const cancelarPedido = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Buscar pedido
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!order) return res.status(404).json({ error: "Pedido não encontrado" });

    // Verificar se pertence ao usuário
    if (order.buyerId !== userId) return res.status(403).json({ error: "Acesso negado" });

    // Verificar se pode ser cancelado
    if ([OrderStatus.ENVIADO, OrderStatus.ENTREGUE].includes(order.status)) {
      return res.status(400).json({ error: "Pedido não pode ser cancelado" });
    }

    // Repor estoque
    for (const item of order.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } }
      });
    }

    // Atualizar status do pedido
    const pedidoAtualizado = await prisma.order.update({
      where: { id },
      data: { status: OrderStatus.CANCELADO }
    });

    res.json({ message: "Pedido cancelado com sucesso", pedido: pedidoAtualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cancelar pedido", details: error.message });
  }
};// vini - fim
