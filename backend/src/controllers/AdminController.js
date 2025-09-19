import { getPendingSellersService, getSellerByIdService, updateSellerStatusService } from '../services/adminService.js';

// Busca todos os vendedores pendentes de aprovação
export const getPendingSellers = async (req, res) => {
    try {
        const pendingSellers = await getPendingSellersService();
        res.json(pendingSellers);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar vendedores pendentes', error: error.message });
    }
};

// Busca detalhes de um vendedor específico pelo ID
export const getSellerById = async (req, res) => {
    const { id } = req.params;
    try {
        const seller = await getSellerByIdService(id);
        if (!seller) {
            return res.status(404).json({ message: 'Vendedor não encontrado' });
        }
        if (seller.role !== 'vendedor') {
            return res.status(400).json({ message: 'Usuário não é um vendedor' });
        }
        res.json(seller);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar detalhes do vendedor', error: error.message });
    }
};

// Aprovar ou rejeitar um vendedor
export const updateSellerStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Status inválido. Use approved ou rejected' });
    }
    try {
        const updatedSeller = await updateSellerStatusService(id, status);
        res.json({
            message: `Vendedor ${status === 'approved' ? 'aprovado' : 'rejeitado'} com sucesso`,
            seller: updatedSeller
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar status do vendedor', error: error.message });
    }
};