import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Simulação de banco de dados de usuários
const mockUsers = {
    'cliente@tecnobits.com': { name: 'Nome Cliente', role: 'cliente', password: 'cliente123' },
    'vendedor@tecnobits.com': { name: 'Nome Vendedor', role: 'vendedor', password: 'vendedor123' },
    'admin@tecnobits.com': { name: 'Admin', role: 'admin', password: 'admin123' },
};

// Componente "Provedor" que irá compartilhar os dados de login
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Função de login que atualiza o estado global
    const login = (email, password) => {
        const foundUser = mockUsers[email];
        if (foundUser && foundUser.password === password) {
            const userData = { name: foundUser.name, role: foundUser.role };
            setUser(userData);
            return userData; // Retorna os dados do usuário em caso de sucesso
        }
        return null; // Retorna nulo em caso de falha
    };

    // Função de logout que limpa o estado global
    const logout = () => {
        setUser(null);
    };

    // Os valores que serão compartilhados com toda a aplicação
    const value = {
        user,
        login,
        logout,
        isAdmin: user?.role === 'admin', // Variável para a rota de admin
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

