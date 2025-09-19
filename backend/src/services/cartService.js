import { PrismaClient } from "@prisma/client";
import productService from "./productService.js";
const prisma = new PrismaClient();

class CartService {
  async getUserCart(userId) {
    return prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } }
    });
  }

  async addItem(userId, { productId, quantity }) {
    if (!productId) throw new Error("productId é obrigatório");
    if (!Number.isInteger(quantity) || quantity <= 0) throw new Error("quantity inválido");

    // Verificar produto
    await productService.ensureStock(productId, quantity);

    // Criar ou obter carrinho
    let cart = await prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId }
    });

    // Verificar se item já existe
    const existingItem = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId: String(productId) } });

    if (existingItem) {
      return prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
    }

    return prisma.cartItem.create({ data: { cartId: cart.id, productId: String(productId), quantity } });
  }

  async updateItem(userId, itemId, quantity) {
    if (!Number.isInteger(quantity) || quantity <= 0) throw new Error("quantity inválido");
    // garantir que item pertence ao carrinho do user
    const item = await prisma.cartItem.findUnique({ where: { id: String(itemId) }, include: { cart: true } });
    if (!item || item.cart.userId !== userId) throw new Error("Item não encontrado no seu carrinho");

    // validar estoque atualizado
    await productService.ensureStock(item.productId, quantity);

    return prisma.cartItem.update({ where: { id: String(itemId) }, data: { quantity } });
  }

  async removeItem(userId, itemId) {
    const item = await prisma.cartItem.findUnique({ where: { id: String(itemId) }, include: { cart: true } });
    if (!item || item.cart.userId !== userId) throw new Error("Item não encontrado no seu carrinho");

    await prisma.cartItem.delete({ where: { id: String(itemId) } });
    return { success: true };
  }

  async clearCart(userId) {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) return;
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    await prisma.cart.delete({ where: { id: cart.id } });
  }
}

export default new CartService();
