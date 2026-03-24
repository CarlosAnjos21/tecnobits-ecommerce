import { PrismaClient } from "@prisma/client";
import { supabase } from "../lib/supabaseClient.js";
import { ConflictError, NotFoundError, ForbiddenError } from "../utils/AppError.js";

const prisma = new PrismaClient();
const isProd = process.env.NODE_ENV === "production";

class ProductService {
  async createProduct({ title, description, price, stock, images, categoryId, sellerId }) {
    if (isProd) {
      const { data, error } = await supabase.from("products").insert([{
        id: crypto.randomUUID(),
        title, description,
        price: parseFloat(price),
        stock: parseInt(stock),
        images,
        categoryId,
        sellerId,
        updatedAt: new Date().toISOString()
      }]).select().single();
      if (error) throw new Error(error.message);
      return data;
    }
    return prisma.product.create({
      data: {
        title, description,
        price: parseFloat(price),
        stock: parseInt(stock),
        images,
        seller: { connect: { id: sellerId } },
        category: { connect: { id: String(categoryId) } }
      }
    });
  }

  async listAll(query) {
    if (isProd) {
      let q = supabase
        .from("products")
        .select("*, category:categories(*), seller:users(id, name, email)");
      if (query) {
        q = q.or(`title.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%`);
      }
      const { data, error } = await q;
      if (error) throw new Error(error.message);
      return data;
    }
    const where = query ? {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { brand: { contains: query, mode: "insensitive" } },
        { category: { name: { contains: query, mode: "insensitive" } } },
      ],
    } : undefined;
    return prisma.product.findMany({
      where,
      include: {
        category: true,
        seller: { select: { id: true, name: true, email: true } }
      }
    });
  }

  async getById(id) {
    if (isProd) {
      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(*), seller:users(id, name)")
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    }
    return prisma.product.findUnique({
      where: { id: String(id) },
      include: { category: true, seller: { select: { id: true, name: true } } }
    });
  }

  async listBySeller(sellerId) {
    if (isProd) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("sellerId", sellerId);
      if (error) throw new Error(error.message);
      return data;
    }
    return prisma.product.findMany({ where: { sellerId: String(sellerId) } });
  }

  async updateProduct(id, data, currentUser) {
    if (isProd) {
      const { data: product, error: findError } = await supabase
        .from("products").select("*").eq("id", id).single();
      if (findError || !product) throw new NotFoundError("Produto não encontrado");
      if (currentUser.role === "vendedor" && product.sellerId !== currentUser.id) {
        throw new ForbiddenError("Sem permissão para editar este produto");
      }
      const { title, description, price, stock, images, categoryId } = data;
      const { data: updated, error } = await supabase
        .from("products")
        .update({
          ...(title && { title }),
          ...(description && { description }),
          ...(price !== undefined && { price: parseFloat(price) }),
          ...(stock !== undefined && { stock: parseInt(stock) }),
          ...(images && { images }),
          ...(categoryId && { categoryId }),
          updatedAt: new Date().toISOString()
        })
        .eq("id", id)
        .select().single();
      if (error) throw new Error(error.message);
      return updated;
    }
    const product = await prisma.product.findUnique({ where: { id: String(id) } });
    if (!product) throw new NotFoundError("Produto não encontrado");
    if (currentUser.role === "vendedor" && product.sellerId !== currentUser.id) {
      throw new ForbiddenError("Sem permissão para editar este produto");
    }
    const { title, description, price, stock, images, categoryId } = data;
    return prisma.product.update({
      where: { id: String(id) },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(stock !== undefined && { stock: parseInt(stock) }),
        ...(images && { images }),
        ...(categoryId && { category: { connect: { id: String(categoryId) } } })
      }
    });
  }

  async deleteProduct(id, currentUser) {
    if (isProd) {
      const { data: product, error: findError } = await supabase
        .from("products").select("*").eq("id", id).single();
      if (findError || !product) throw new NotFoundError("Produto não encontrado");
      if (currentUser.role === "vendedor" && product.sellerId !== currentUser.id) {
        throw new ForbiddenError("Sem permissão para deletar este produto");
      }
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw new Error(error.message);
      return;
    }
    const product = await prisma.product.findUnique({ where: { id: String(id) } });
    if (!product) throw new NotFoundError("Produto não encontrado");
    if (currentUser.role === "vendedor" && product.sellerId !== currentUser.id) {
      throw new ForbiddenError("Sem permissão para deletar este produto");
    }
    return prisma.product.delete({ where: { id: String(id) } });
  }

  async ensureStock(productId, quantity) {
    if (isProd) {
      const { data: product, error } = await supabase
        .from("products")
        .select("id, stock, title")
        .eq("id", productId)
        .single();
      if (error || !product) throw new NotFoundError("Produto não encontrado");
      if (product.stock < quantity) throw new ConflictError(`Estoque insuficiente para ${product.title}`);
      return product;
    }
    const product = await prisma.product.findUnique({
      where: { id: String(productId) },
      select: { id: true, stock: true, title: true }
    });
    if (!product) throw new NotFoundError("Produto não encontrado");
    if (product.stock < quantity) throw new ConflictError(`Estoque insuficiente para ${product.title}`);
    return product;
  }

  async decrementStock(tx, items) {
    if (isProd) {
      for (const item of items) {
        const { data: product } = await supabase
          .from("products").select("stock").eq("id", item.productId).single();
        await supabase.from("products")
          .update({ stock: product.stock - item.quantity })
          .eq("id", item.productId);
      }
      return;
    }
    for (const item of items) {
      await tx.product.update({
        where: { id: String(item.productId) },
        data: { stock: { decrement: item.quantity } }
      });
    }
  }

  async incrementStock(tx, items) {
    if (isProd) {
      for (const item of items) {
        const { data: product } = await supabase
          .from("products").select("stock").eq("id", item.productId).single();
        await supabase.from("products")
          .update({ stock: product.stock + item.quantity })
          .eq("id", item.productId);
      }
      return;
    }
    for (const item of items) {
      await tx.product.update({
        where: { id: String(item.productId) },
        data: { stock: { increment: item.quantity } }
      });
    }
  }
}

export default new ProductService();