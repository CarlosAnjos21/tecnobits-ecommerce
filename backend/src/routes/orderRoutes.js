import express from 'express';
import * as OrderController from '../src/controllers/OrderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const routes = express.Router();

//criar pedido
routes.post("/", protect, authorize('cliente'), OrderController.fazerPedido);