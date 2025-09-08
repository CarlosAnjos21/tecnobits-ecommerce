//Página de Login do Administrador 

import React, { useState } from 'react';
import './AdminLoginPage.css'; 
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // 1. IMPORTAR O useAuth

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginAdmin } = useAuth(); // 2. PEGAR A FUNÇÃO DE LOGIN DO CONTEXTO

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 3. USAR A FUNÇÃO DO CONTEXTO PARA FAZER O LOGIN
    const success = loginAdmin(email, password);

    if (success) {
      navigate('/admin/dashboard'); // Se o login do contexto deu certo, navegue
    } else {
      setError('Email ou senha inválidos.'); // Se não, mostre o erro
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h1 className="title">Login do Administrador</h1>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="errorMessage">{error}</p>}
          <button type="submit" className="loginButton">Entrar</button>
        </form>
        
        <div className="backLinkContainer">
            <Link to="/" className="backLink">&larr; Voltar ao site</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;