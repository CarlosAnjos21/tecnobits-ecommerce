import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js'
import { protect, authorize } from './src/middleware/authMiddleware.js';


const app = express();

app.use(cors());
app.use(express.json());

//publicas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

//protegidas
app.get('/api/profile', protect, (req, res) => {
    res.status(200).json({ user: req.user });
});

//rota com autorização = vendedores
app.post('/api/products', protect, authorize('vendedor'), (req, res) => {
    res.status(201).json({ message: `Produto criado pelo vendedor ${req.user.name}` });
});

export default app;