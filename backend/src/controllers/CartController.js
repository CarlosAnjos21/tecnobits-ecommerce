import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Buscar carrinho do usuário logado
 */
export const buscarCarrinho = async (req, res) => {
  try {
    const carrinho = await prisma.cart.findUnique({
      where: { userId: req.user.id },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!carrinho) {
      return res.json({ items: [] });
    }

    res.json(carrinho);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar carrinho", details: error.message });
  }
};

/**
 * Adicionar item ao carrinho
 */
export const adicionarItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let carrinho = await prisma.cart.findUnique({ where: { userId: req.user.id } });

    if (!carrinho) {
      carrinho = await prisma.cart.create({
        data: { userId: req.user.id }
      });
    }

    // Se item já existe no carrinho → soma quantidade
    const itemExiste = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId }
    });

    let item;
    if (itemExiste) {
      item = await prisma.cartItem.update({
        where: { id: itemExiste.id },
        data: { quantity: itemExiste.quantity + quantity }
      });
    } else {
      item = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity
        }
      });
    }

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar item", details: error.message });
  }
};

/**
 * Atualizar quantidade de um item
 */
export const atualizarItem = async (req, res) => {
  try {
    const { id } = req.params; // id do CartItem
    const { quantity } = req.body;

    const item = await prisma.cartItem.update({
      where: { id },
      data: { quantity }
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar item", details: error.message });
  }
};

/**
 * Remover item do carrinho
 */
export const removerItem = async (req, res) => {
  try {
    const { id } = req.params; // id do CartItem

    await prisma.cartItem.delete({ where: { id } });

    res.json({ message: "Item removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover item", details: error.message });
  }
};
