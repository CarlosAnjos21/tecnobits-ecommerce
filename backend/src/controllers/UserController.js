import { PrismaClient } from "@prisma/client";  
const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        res.status(200).json(users);
    }catch (error) {
        console.error("erro ao buscar usuários:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor ao buscar usuários"});
    }
};

export const getUserById= async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }

        res.status(200).json(user);
    }catch (error) {
        console.error("erro ao buscar usuário:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor ao buscar usuários"});
    }
};