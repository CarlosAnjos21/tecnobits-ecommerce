export const getUserByEmailService = async (email) => {
    return prisma.user.findUnique({ where: { email } });
};

export const createUserService = async (data) => {
    return prisma.user.create({ data });
};
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const userSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
    address: true,
    phone: true,
    cnpj: true,
    status: true,
    createdAt: true,
    updatedAt: true,
};

export const getAllUsersService = async () => {
    return prisma.user.findMany({ select: userSelect });
};

export const getUserByIdService = async (id) => {
    return prisma.user.findUnique({ where: { id }, select: userSelect });
};

export const updateUserService = async (id, data) => {
    return prisma.user.update({ where: { id }, data, select: userSelect });
};

export const deleteUserService = async (id) => {
    return prisma.user.delete({ where: { id } });
};
