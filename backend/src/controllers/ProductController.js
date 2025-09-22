import productService from "../services/productService.js";

// Criar produto
export const criarProduto = async (req, res) => {
  try {
    const { title, description, price, stock, images, categoryId } = req.body;
    if (!req.user || !req.user.id) return res.status(401).json({ error: "Usuário não autenticado" });

    const produto = await productService.createProduct({
      title,
      description,
      price,
      stock,
      images,
      categoryId,
      sellerId: req.user.id,
    });

    res.status(201).json(produto);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(400).json({ error: error.message });
  }
};

// Listar todos os produtos
export const listarProduto = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    const produtos = await productService.listAll(q || undefined);
    res.json(produtos);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
};

// Buscar produto por ID
export const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await productService.getById(id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(produto);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ error: error.message });
  }
};

// Atualizar produto
export const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await productService.updateProduct(id, req.body, req.user);
    res.json(produto);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(400).json({ error: error.message });
  }
};

// Deletar produto
export const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id, req.user);
    res.json({ message: "Produto removido com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(400).json({ error: error.message });
  }
};

// Buscar produtos por vendedor
export const buscarProdutosPorVendedor = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const produtos = await productService.listBySeller(sellerId);
    res.json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos do vendedor:", error);
    res.status(500).json({ error: error.message });
  }
};
