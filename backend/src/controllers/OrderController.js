import { prisma } from '../config/prisma.js';

//lista pedidos

export const listOrders = async (req, res) => {

    const { role, id} = req.user;

    try {

        let orders;
        if( role === "admin") {
            return orders = await prisma.order.findMany( { include: { items: true, buyer: true} });
        } else if ( role === "vendedor") {
            orders await prisma.order.findMany( { 

                where: { items: { some: { product: {sellerId: id } } } },
                include: { items: true, buyer: true}
            });
        }
    } 

};