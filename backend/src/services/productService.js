import { PrismaClient } from "@prisma/client";
import { ConflictError, NotFoundError, ForbiddenError } from "../utils/AppError.js";

const prisma = new PrismaClient();

class ProductService {
  async createProduct({ title, description, price, stock, images, categoryId, sellerId }) {
    return prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        images,
        seller: { connect: { id: sellerId } },
        category: { connect: { id: String(categoryId) } },
      },
      include: { category: true, seller: { select: { id: true, name: true, email: true } } }
    });
  }

  async listAll(query) {
    const where = query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            { brand: { contains: query, mode: "insensitive" } },
            { category: { name: { contains: query, mode: "insensitive" } } },
          ],
        }
      : undefined;

    return prisma.product.findMany({
      where,
      include: { category: true, seller: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  async getById(id) {
    const product = await prisma.product.findUnique({
      where: { id: String(id) },
      include: { category: true, seller: { select: { id: true, name: true } } }
    });
    if (!product) throw new NotFoundError("Produto não encontrado");
    return product;
  }

  async listBySeller(sellerId) {
    return prisma.product.findMany({
      where: { sellerId: String(sellerId) },
      include: { category: true }
    });
  }

  async updateProduct(id, data, currentUser) {
    const product = await prisma.product.findUnique({ where: { id: String(id) } });
    if (!product) throw new NotFoundError("Produto não encontrado");
    if (currentUser.role === "vendedor" && product.sellerId !== currentUser.id)
      throw new ForbiddenError("Sem permissão para editar este produto");

    const { title, description, price, stock, images, categoryId } = data;

    return prisma.product.update({
      where: { id: String(id) },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(stock !== undefined && { stock: parseInt(stock) }),
        ...(images && { images }),
        ...(categoryId && { category: { connect: { id: String(categoryId) } } }),
      },
      include: { category: true, seller: { select: { id: true, name: true } } }
    });
  }

  async deleteProduct(id, currentUser) {
    const product = await prisma.product.findUnique({ where: { id: String(id) } });
    if (!product) throw new NotFoundError("Produto não encontrado");
    if (currentUser.role === "vendedor" && product.sellerId !== currentUser.id)
      throw new ForbiddenError("Sem permissão para deletar este produto");

    await prisma.product.delete({ where: { id: String(id) } });
    return { message: "Produto removido com sucesso" };
  }

  async ensureStock(productId, quantity) {
    const product = await prisma.product.findUnique({
      where: { id: String(productId) },
      select: { id: true, stock: true, title: true }
    });
    if (!product) throw new NotFoundError("Produto não encontrado");
    if (product.stock < quantity)
      throw new ConflictError(`Estoque insuficiente para ${product.title}`);
    return product;
  }

  async decrementStock(tx, items) {
    for (const item of items) {
      await tx.product.update({
        where: { id: String(item.productId) },
        data: { stock: { decrement: item.quantity } }
      });
    }
  }

  async incrementStock(tx, items) {
    for (const item of items) {
      await tx.product.update({
        where: { id: String(item.productId) },
        data: { stock: { increment: item.quantity } }
      });
    }
  }
}

export default new ProductService();