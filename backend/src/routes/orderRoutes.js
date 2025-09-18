import express from "express";
import {
  criarPedido,
  atualizarStatusPedido,
  listarMeusPedidos,
  listarTodosPedidos
} from "../controllers/OrderController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);  // todas rotas exigem usuário autenticado

// Usuário vê seus pedidos
router.get("/", listarMeusPedidos);

// Criar pedido
router.post("/", criarPedido);

// Admin vê todos pedidos
router.get("/all", authorize("admin"), listarTodosPedidos);

// Admin atualiza status
router.put("/:id/status", authorize("admin"), atualizarStatusPedido);

export default router;
