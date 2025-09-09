// Caminho: src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Por enquanto, vamos simular o estado de login. 
  // 'null' significa não logado. No futuro, guardaremos os dados do admin aqui.
  const [adminUser, setAdminUser] = useState(null);

  // Simulação de uma função de login
  const loginAdmin = (email, password) => {
    // Lógica de API virá aqui. Por agora, usamos dados fixos para teste.
    if (email === 'admin@tecnobits.com' && password === 'admin123') {
      const userData = { email, role: 'admin' };
      setAdminUser(userData); // "Loga" o usuário
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser(null); // "Desloga" o usuário
  };

  const value = {
    isAdmin: !!adminUser, // Converte o usuário para um booleano (true se logado, false se não)
    loginAdmin,
    logoutAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
  return useContext(AuthContext);
};