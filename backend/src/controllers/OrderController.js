
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { OrderStatus } from "@prisma/client";

/**
 * Criar um novo pedido a partir do carrinho do usuário
 */
export const criarPedido = async (req, res) => {
  try {

    const userId = req.user.id;

    // Buscar os itens do carrinho do usuário
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Carrinho vazio" });
    }

    // Calcular total
    let total = 0;
    const orderItemsData = cart.items.map(item => {
      total += item.product.price * item.quantity;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price
      };
    });

    // Criar pedido
    const order = await prisma.order.create({
      data: {
        buyerId: userId,
        total,
        // dados de entrega/você pode relacionar ou pegar do corpo
        cep: req.body.cep,
        cidade: req.body.cidade,
        enderecoEntrega: req.body.enderecoEntrega,
        complemento: req.body.complemento,
        dataEntregaPrevista: req.body.dataEntregaPrevista,
        estado: req.body.estado,
        metodoPagamento: req.body.metodoPagamento,
        items: {
          create: orderItemsData
        }
      },
      include: {
        items: {
          include: { product: true }
        },
        buyer: true
      }
    });

     // 🔹 Atualizar estoque dos produtos vini - inicio - é so empurrar essas mod um pouco pra baixo. 
    for (const item of order.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    } // vini - fim

    // Opcional: limpar carrinho depois de criar pedido
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });


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
