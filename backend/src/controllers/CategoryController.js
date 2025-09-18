import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Criar categoria
export const criarCategoria = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "O campo 'name' é obrigatório" });
    }

    const categoria = await prisma.category.create({
      data: { name },
    });

    res.status(201).json(categoria);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Listar todas as categorias
export const listarCategorias = async (req, res) => {
  try {
    const categorias = await prisma.category.findMany({
      include: { products: true }, // opcional: traz produtos da categoria
    });
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar categorias" });
  }
};

// Buscar categoria por ID
export const buscarCategoriaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    res.json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar categoria" });
  }
};

// Atualizar categoria
export const atualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const categoria = await prisma.category.update({
      where: { id },
      data: { name },
    });

    res.json(categoria);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Deletar categoria
export const deletarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id },
    });

    res.json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Listar todos os produtos de uma categoria
export const listarProdutosDaCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    res.json(categoria.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar produtos da categoria" });
  }
};