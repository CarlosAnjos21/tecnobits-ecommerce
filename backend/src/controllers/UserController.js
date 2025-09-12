import { PrismaClient } from "@prisma/client";  


const prisma = new PrismaClient();

const userSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
    createdAt: true,
    updatedAt: true,
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: userSelect,
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
            select: userSelect,
        });

        if (!user) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }

        res.status(200).json(user);
    }catch (error) {
        console.error("erro ao buscar usuários:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor ao buscar usuários"});
    }
};

export const updateUser= async (req, res) => {
    try {
        const { id } = req.params;
        const { email, name, role } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                email: email,
                name: name,
                role: role,
            },
            select: userSelect,
        });

        res.status(200).json(updatedUser);

    }catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Usuário não encontrado."})
        }
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor ao buscar usuários"});
    }
};