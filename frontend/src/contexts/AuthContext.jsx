import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService } from '../services/authService';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // 1. Adicionar estado de loading

    // Ao carregar a aplicação, verifica se há um usuário salvo no localStorage
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Falha ao carregar dados do usuário do localStorage", error);
            // Limpa o estado se os dados estiverem corrompidos
            setUser(null);
            localStorage.clear();
        } finally {
            setLoading(false); // 2. Finaliza o loading, com ou sem usuário
        }
    }, []);

    // Função de login que chama o backend
    const login = async (email, password) => {
        setLoading(true);
        try {
            const data = await loginService(email, password);
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('authToken', data.token);
            return data.user;
        } catch (error) {
            // Garante que o estado esteja limpo em caso de erro
            logout();
            throw error; // Lança o erro para ser tratado na página de login
        } finally {
            setLoading(false); // Finaliza o loading após a tentativa de login
        }
    };

    // Função de logout que limpa o estado e o localStorage
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
    };

    const value = {
        user,
        loading, // 3. Expor o estado de loading
        login,
        logout,
        isAuthenticated: !loading && !!user, // A autenticação só é real quando não está carregando e existe usuário
        isAdmin: !loading && user?.role === 'admin',
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

