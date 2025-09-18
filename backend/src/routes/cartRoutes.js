import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  buscarCarrinho,
  adicionarItem,
  atualizarItem,
  removerItem,
} from "../controllers/cartController.js";

const router = express.Router();

// Todas as rotas exigem login
router.use(protect);

// Buscar carrinho do usuário logado
router.get("/", buscarCarrinho);

// Adicionar item ao carrinho
router.post("/add", adicionarItem);

// Atualizar quantidade de um item
router.put("/update/:id", atualizarItem);

// Remover item do carrinho
router.delete("/remove/:id", removerItem);

export default router;
