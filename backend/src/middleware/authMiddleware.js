const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { PrismaClient } = require('@prisma/client');
const { JWT_SECRET } = require('../config/env');

const prisma = new PrismaClient();

//middleware para proteção de rotas (ver se user está logado)
exports.protect = async (req, res, next) => {
    try {
        let token;

        //pega o token do header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Você não está logado. Por favor, faça login para obter acesso.'});
        }
        //verifica o token
        const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
        //verifica se o user ainda existe
        const currentUser = await prisma.user.findUnique({ where: { id: decoded.id }});
        if (!currentUser) {
            return res.status(401).json({ message: 'O usuário dono deste token não existe mais.' });
        }
        //concede acesso a rota
        req.user = currentUser; //add o usuario ao obj da req
        next();
    }catch(error) {
        return res.status(401).json({ message: 'Token inválido ou expirado.'});
    }
};

//midlleware para autorizar com basse na role
exports.authorize = (...roles) => {
    return (req, res, next) => {
        //roles sera um arrray
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Você não tem permissão para executar essa ação.' });
        }
        next();
    };

};