import api from './api';

export const getPendingSellers = async () => {
  const response = await api.get('/admin/pending-sellers');
  return response.data;
};

export const getSellerDetails = async (sellerId) => {
  const response = await api.get(`/admin/sellers/${sellerId}`);
  return response.data;
};

export const updateSellerStatus = async (sellerId, status) => {
  const response = await api.put(`/admin/sellers/${sellerId}/status`, { status });
  return response.data;
};

// Adicione outros métodos conforme necessário
