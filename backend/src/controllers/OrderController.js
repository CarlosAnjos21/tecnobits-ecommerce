import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
export const listarPedidosUsuarios = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await prisma.order.findMany({
      where: { buyerId: userId },
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar seus pedidos", details: error.message });
  }
};

/**
 * Listar todos os pedidos (admin)
 */
export const listarPedidosAdmin = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: { include: { product: true } },
        buyer: true
      },
      orderBy: { createdAt: "desc" }
    });
    res.json(orders);
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

    // Opcional: validação
    // if (!Object.values(OrderStatus).includes(status)) return res.status(400).json(...)

    const order = await prisma.order.update({
      where: { id },
      data: { status }
    });

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar status do pedido", details: error.message });
  }
};
