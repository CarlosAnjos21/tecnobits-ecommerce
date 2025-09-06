//Página de Login do Administrador

import React, { useState } from 'react';
import './AdminLoginPage.css'; 
import { useNavigate, Link } from 'react-router-dom';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // No futuro, aqui entrará a lógica de chamada à API de login do backend
    console.log('Tentativa de login com:', { email, password });
    
    // Simulação de login bem-sucedido para teste
    if (email === 'admin@tecnobits.com' && password === 'admin123') {
      navigate('/admin/dashboard');
    } else {
      setError('Email ou senha inválidos.');
    }
  };

  // MUDANÇA 2: Todas as 'className' agora usam strings de texto normais
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