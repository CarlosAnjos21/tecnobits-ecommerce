import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

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
        }
    }, []);

    // Função de login que chama o backend
    const login = async (email, password) => {
        try {
            const backendUrl = 'http://localhost:3001';
            const response = await fetch(`${backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Falha no login. Verifique suas credenciais.');
            }

            // Atualiza o estado e salva no localStorage
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('authToken', data.token);

            return data.user; // Retorna os dados do usuário para a página de login

        } catch (error) {
            // Garante que o estado esteja limpo em caso de erro
            logout();
            throw error; // Lança o erro para ser tratado na página de login
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
        login,
        logout,
        isAuthenticated: !!user, // Um booleano para saber se está autenticado
        isAdmin: user?.role === 'admin',
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

