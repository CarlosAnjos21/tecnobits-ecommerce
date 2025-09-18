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

// Todas as rotas exigem login
router.use(protect);

// Usuário vê seus pedidos
router.get("/", listarMeusPedidos);

// Criar pedido
router.post("/", criarPedido);

// Admin vê todos pedidos
router.get("/", authorize("admin"), listarTodosPedidos); // mesma rota GET /, middleware controla acesso

// Admin atualiza pedido parcialmente (status)
router.patch("/:id", authorize("admin"), atualizarStatusPedido); // PATCH indica atualização parcial

export default router;
