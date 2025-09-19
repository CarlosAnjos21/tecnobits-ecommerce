import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getPendingSellersService = async () => {
    return prisma.user.findMany({
        where: { role: 'vendedor', status: 'pending' },
        select: {
            id: true,
            name: true,
            email: true,
            cnpj: true,
            phone: true,
            address: true,
            createdAt: true
        }
    });
};

export const getSellerByIdService = async (id) => {
    return prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            cnpj: true,
            phone: true,
            address: true,
            status: true,
            role: true,
            createdAt: true,
            updatedAt: true
        }
    });
};

export const updateSellerStatusService = async (id, status) => {
    return prisma.user.update({
        where: { id },
        data: { status: status === 'approved' ? 'active' : 'rejected' },
        select: {
            id: true,
            name: true,
            email: true,
            status: true
        }
    });
};
