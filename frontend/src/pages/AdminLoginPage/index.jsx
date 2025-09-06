import React, { useState } from 'react';
import './AdminLoginPage.css'; // MUDANÇA 1: Import do CSS normal
import { useNavigate, Link } from 'react-router-dom'; // MUDANÇA 2: Import do Link

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tentativa de login com:', { email, password });
    
    if (email === 'admin@tecnobits.com' && password === 'admin123') {
      navigate('/admin/dashboard');
    } else {
      setError('Email ou senha inválidos.');
    }
  };

  // MUDANÇA 3: Todas as 'className' agora usam strings
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
        
        {/* MUDANÇA 4: Adicionado o link de 'voltar' */}
        <div className="backLinkContainer">
            <Link to="/" className="backLink">&larr; Voltar ao site</Link>
        </div>

      </div>
    </div>
  );
};

export default AdminLoginPage;