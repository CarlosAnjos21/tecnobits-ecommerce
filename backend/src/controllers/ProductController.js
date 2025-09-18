import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Criar produto
export const criarProduto = async (req, res) => {
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
        category: { connect: { id: String(categoryId) } }
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



// Listar todos os produtos
export const listarProduto = async (req, res) => {
  try {
    const produtos = await prisma.product.findMany({
      include: {
        category: true,  // Incluir dados da categoria
        seller: {        // Incluir dados do vendedor (opcional)
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: "desc" }, // opcional: ordena por data
    });
    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Buscar produto por ID
export const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await prisma.product.findUnique({ 
      where: { id },
      include: {
        category: true,  // Incluir dados da categoria
        seller: {        // Incluir dados do vendedor (opcional)
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Atualizar produto
export const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, stock, images } = req.body;

    const produto = await prisma.product.update({
      where: { id },
      data: { title, description, price, stock, images },
    });

    res.json(produto);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Produto não encontrado ou dados inválidos" });
  }
};

// Deletar produto
export const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({ where: { id } });

    res.json({ message: "Produto removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Produto não encontrado" });
  }
};

// Buscar produtos por vendedor
export const buscarProdutosPorVendedor = async (req, res) => {
  try {
    const { sellerId } = req.params;
    
    const produtos = await prisma.product.findMany({
      where: { sellerId },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
