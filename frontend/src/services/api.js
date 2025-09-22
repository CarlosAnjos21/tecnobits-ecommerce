import axios from 'axios';

// Base do backend configurável via .env (Vite)
// Ex.: VITE_API_URL=http://localhost:3001
const API_BASE = (import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:3001');

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true,
});

// Interceptor para adicionar o token JWT em todas as requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
