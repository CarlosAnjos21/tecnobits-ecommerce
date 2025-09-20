import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:3001/api',
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
