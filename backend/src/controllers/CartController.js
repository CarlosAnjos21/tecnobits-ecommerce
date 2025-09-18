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
      return res.json({ items: [] }); // carrinho vazio
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
    const { productId, quantity = 1 } = req.body;

    // Validações
    if (!productId) {
      return res.status(400).json({ error: "productId é obrigatório" });
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ error: "quantity deve ser um número inteiro positivo" });
    }

    // Verificar se produto existe
    const produto = await prisma.product.findUnique({
      where: { id: String(productId) },
      select: { id: true, title: true }
    });

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    // Buscar ou criar carrinho
    let carrinho = await prisma.cart.findUnique({
      where: { userId: req.user.id },
    });

    if (!carrinho) {
      carrinho = await prisma.cart.create({
        data: { userId: req.user.id }
      });
    }

    // Verificar se item já existe no carrinho
    const itemExistente = await prisma.cartItem.findFirst({
      where: {
        cartId: carrinho.id,
        productId: String(productId)
      }
    });

    let item;
    if (itemExistente) {
      // Atualiza quantidade
      item = await prisma.cartItem.update({
        where: { id: itemExistente.id },
        data: { quantity: itemExistente.quantity + quantity }
      });
    } else {
      // Cria novo item
      item = await prisma.cartItem.create({
        data: {
          cartId: carrinho.id,
          productId: String(productId),
          quantity
        }
      });
    }

    // Retorna carrinho atualizado
    const carrinhoAtualizado = await prisma.cart.findUnique({
      where: { id: carrinho.id },
      include: { items: { include: { product: true } } }
    });

    res.status(201).json(carrinhoAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar item", details: error.message });
  }
};

/**
 * Atualizar quantidade de um item
 */
export const atualizarItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    // Validação da quantidade
    if (quantity == null || !Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({ error: "Quantidade inválida. Deve ser um número inteiro maior ou igual a 0." });
    }

    const carrinho = await prisma.cart.findUnique({
      where: { userId: req.user.id },
    });

    const itemToUpdate = await prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    // Verifica se o item pertence ao carrinho do usuário
    if (!carrinho || !itemToUpdate || itemToUpdate.cartId !== carrinho.id) {
      return res.status(403).json({ error: "Operação não autorizada." });
    }

    // Se a quantidade for 0, remove o item
    if (quantity === 0) {
      await prisma.cartItem.delete({ where: { id: itemId } });
      return res.json({ message: "Item removido do carrinho com sucesso." });
    }

    // Atualiza a quantidade
    const itemAtualizado = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    res.json(itemAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar item", details: error.message });
  }
};


/**
 * Remover item do carrinho
 */
export const removerItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const carrinho = await prisma.cart.findUnique({
      where: { userId: req.user.id },
    });

    const itemToRemove = await prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    // Verifica se o item pertence ao carrinho do usuário
    if (!carrinho || !itemToRemove || itemToRemove.cartId !== carrinho.id) {
      return res.status(403).json({ error: "Operação não autorizada." });
    }

    await prisma.cartItem.delete({ where: { id: itemId } });

    res.json({ message: "Item removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover item", details: error.message });
  }
};
