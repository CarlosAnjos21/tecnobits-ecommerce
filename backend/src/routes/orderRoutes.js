import express from "express";
import {
  criarPedido,
  atualizarStatusPedido,
  listarMeusPedidos,
  listarTodosPedidos,
  listarPedidosDoVendedor,
  cancelarPedido
} from "../controllers/orderController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import { createOrderSchema } from "../validators/orderSchemas.js";
import { listOrdersQuery, listSellerOrdersQuery } from "../validators/orderQuerySchemas.js";

const router = express.Router();

router.use(protect);  // todas rotas exigem usuário autenticado

// Todas as rotas exigem login
router.use(protect);

// Usuário vê seus pedidos
router.get("/", listarMeusPedidos);

// Criar pedido

router.post("/", criarPedido);
router.patch("/:id/cancel", cancelarPedido); // <-- cancela pedido </vini>
// Admin vê todos pedidos
router.get("/", authorize("admin"), listarTodosPedidos); // mesma rota GET /, middleware controla acesso

// Admin atualiza pedido parcialmente (status)
router.patch("/:id", authorize("admin"), atualizarStatusPedido); // PATCH indica atualização parcial

// Vendedor vê pedidos que contenham seus produtos (com paginação e filtros)
router.get("/seller-orders", authorize("vendedor", "admin"), validate(listSellerOrdersQuery), listarPedidosDoVendedor);

// Cancelar pedido (cliente proprietário ou admin)
router.delete("/:id/cancel", cancelarPedido);

export default router;
