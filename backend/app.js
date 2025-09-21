import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import categoryRoutes from "./src/routes/categoryRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import { protect, authorize } from './src/middleware/authMiddleware.js';

import sellerProductRoutes from "./src/routes/sellerProductRoutes.js";


const app = express();

// Hardening básico
app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // permitir servir imagens a partir de /uploads
}));

// Rate limit focado em endpoints sensíveis
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // até 100 req/15min por IP
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Static uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

// Rotas de Autenticação e Perfil (públicas e privadas)
app.use('/api/auth', authLimiter, authRoutes);

// Rotas de Gerenciamento de Usuários (apenas admin)
app.use('/api/users', userRoutes);

// Rotas de Gerenciamento de Produtos
app.use("/api/products", productRoutes);

// Rotas do Admin
app.use('/api/admin', adminRoutes);

// rota protegida para vendedores
app.post('/api/products', protect, authorize('vendedor'), (req, res) => {
    res.status(201).json({ message: `Produto criado pelo vendedor ${req.user.name}` });
});

// Rotas de Gerenciamento de Categorias
app.use("/api/categories", categoryRoutes);

// Rotas do Carrinho de Compras
app.use("/api/cart", cartRoutes);

// Rotas de Pedidos
app.use("/api/orders", orderRoutes);


// Rotas do vendedor monitorar os produtos
app.use("/api/seller", sellerProductRoutes);


export default app;