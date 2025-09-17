import { error } from 'console';
import { prisma } from '../config/prisma.js';

//lista pedidos

export const listarOrders = async (req, res) => {

    const { role, id} = req.user;

    try {

        let orders;
        if( role === "admin") {
            return orders = await prisma.order.findMany( { include: { items: true, buyer: true} });
        } 
        else if ( role === "vendedor") {
            orders = await prisma.order.findMany( { 

                where: { items: { some: { product: {sellerId: id } } } },
                include: { items: true, buyer: true}
            });
        }  
        else {
            orders = await prisma.order.findMany( { 
                
                where: { buyerId: id},
                include: { items: true, buyer: true}
            }); 
        }
        res.json(orders);

    } catch (e) { 
        res.status(500).json({ message: "erro ao listar os pedidos.", error: e.message });
    }

};

//cria pedido

export const criarOrder = async (req, res) => {

    const { buyerId, enderecoEntrega, cep, cidade, estado, complemento, metodoPagamento, items } = req.body;

    try {

        const total = items.reduce( (sum, item) => sum + item.price * item.quantity, 0);

        let order = await prisma.order.create( {

            data: {

                buyerId,
                enderecoEntrega,
                cep,
                cidade,
                estado,
                complemento,
                metodoPagamento,
                total,
                items: {
                    create: items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                })) 
            }
        },
            include: { items: true }
        });
        res.status(201).json(order);
    } catch (e) { 
        res.status(500).json({ message: "ocorreu um erro ao criar pedido.", error: e.message });
    }
};

//atualizar status do pedido.
export const updOrderStatus = async (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    try {

        let order = await prisma.order.update({

            where: { id },
            data: { status }
        });
        res.json(order);
    } catch (e) { 
        res.status(500).json({ message: "ocorreu um erro ao atualizar pedido.", error: e.message});
    }
};