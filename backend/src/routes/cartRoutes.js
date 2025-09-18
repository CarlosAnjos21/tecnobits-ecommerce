import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import * as CartController from "../controllers/CartController.js";

const router = express.Router();

router.use(protect); // todas rotas precisam de login

router.get("/", CartController.buscarCarrinho);
router.post("/items", CartController.adicionarItem);
router.put("/items/:id", CartController.atualizarItem);
router.delete("/items/:id", CartController.removerItem);

export default router;
