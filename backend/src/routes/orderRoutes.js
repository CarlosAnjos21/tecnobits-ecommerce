import express, { Router } from 'express';
import * as OrderController from '../controllers/OrderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { canUpdateStatus } from '../middleware/orderStatusMiddleware.js';

const routes = express.Router();

//listar pedidos
routes.get('/', protect, authorize('cliente', 'vendedor', 'admin'), OrderController.listarOrders);

//fazer pedido( so o cliente faz)
routes.post('/', protect, authorize('cliente'), OrderController.criarOrder);

//atualizar status de pedido
routes.patch('/:id/status', protect, authorize('cliente', 'vendedor', 'admin'), canUpdateStatus, OrderController.updOrderStatus);

export default routes;