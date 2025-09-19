import { PrismaClient, OrderStatus } from "@prisma/client";
const prisma = new PrismaClient();

// Criar produto reaproveitando o codigo do gaabe

export const criarProdutoVendedor = async (req, res) => {
  try {
    const { title, description, price, stock, images, categoryId } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const produto = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        images,
        seller: { connect: { id: req.user.id } },
        category: { connect: { id: categoryId } }
      }
    });

    res.status(201).json(produto);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({
      error: "Erro ao criar produto",
      details: error.message
    });
  }
};

//  Listar produtos do vendedor
 
export const listarMeusProdutos = async (req, res) => {
  try {
    const vendedorId = req.user.id;

    const produtos = await prisma.product.findMany({
      where: { sellerId: vendedorId },
      include: { category: true },
      orderBy: { createdAt: "desc" }
    });

    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar produtos", details: error.message });
  }
};

//  Atualizar produto/estoque do vendedor
 
export const atualizarProduto = async (req, res) => {
  try {
    const vendedorId = req.user.id;
    const { id } = req.params;

    const produto = await prisma.product.findUnique({ where: { id } });
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    if (produto.sellerId !== vendedorId) return res.status(403).json({ error: "Acesso negado" });

    const atualizado = await prisma.product.update({
      where: { id },
      data: req.body
    });

    res.json(atualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar produto", details: error.message });
  }
};


//  Histórico de pedidos dos produtos do vendedor
 
export const listarPedidosDoVendedor = async (req, res) => {
  try {
    const vendedorId = req.user.id;

    const pedidos = await prisma.order.findMany({
      where: {
        items: { some: { product: { sellerId: vendedorId } } }
      },
      include: {
        items: { include: { product: true } },
        buyer: true
      },
      orderBy: { createdAt: "desc" }
    });

    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar pedidos", details: error.message });
  }
};