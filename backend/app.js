const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const { protect, authorize } = require('./src/middleware/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

//publicas
app.use('/api/auth', authRoutes);

//protegidas
app.get('/api/profile', protect, (req, res) => {
    res.status(200).json({ user: req.user });
});

//rota com autorização = vendedores
app.post('/api/products', protect, authorize('vendedor'), (req, res) => {
    res.status(201).json({ message: `Produto criado pelo vendedor ${req.user.name}` });
});

module.exports = app;