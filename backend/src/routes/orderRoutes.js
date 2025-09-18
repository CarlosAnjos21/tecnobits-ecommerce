import express from "express";
import {
  criarPedido,
  listarPedidosUsuarios,
  listarPedidosAdmin,
  atualizarStatusPedido
} from "../controllers/OrderController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);  // todas rotas exigem usuário autenticado

// Usuário vê seus pedidos
router.get("/", listarPedidosUsuarios);

// Criar pedido
router.post("/", criarPedido);

// Admin vê todos pedidos
router.get("/all", authorize("admin"), listarPedidosAdmin);

// Admin atualiza status
router.put("/:id/status", authorize("admin"), atualizarStatusPedido);

export default router;
