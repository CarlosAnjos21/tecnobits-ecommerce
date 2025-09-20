import express from "express";
import {
  criarPedido,
  atualizarStatusPedido,
  listarMeusPedidos,
  listarTodosPedidos,
  listarPedidosDoVendedor,
  cancelarPedido,
  obterPedidoPorId
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

// Vendedor vê pedidos que contenham seus produtos (com paginação e filtros)
router.get("/seller-orders", authorize("vendedor", "admin"), validate(listSellerOrdersQuery), listarPedidosDoVendedor);

// Admin vê todos pedidos (rota distinta para não conflitar com listarMeusPedidos)
router.get("/all", authorize("admin"), listarTodosPedidos);

// Criar pedido
router.post("/", criarPedido);

// Cancelar pedido (cliente proprietário ou admin)
router.patch("/:id/cancel", cancelarPedido); // vini
router.delete("/:id/cancel", cancelarPedido);

// Admin atualiza pedido parcialmente (status)
router.patch("/:id", authorize("admin"), atualizarStatusPedido); // PATCH indica atualização parcial

// Usuário (ou admin) vê um pedido específico (deve vir por último para não capturar rotas específicas)
router.get("/:id", obterPedidoPorId);

export default router;
