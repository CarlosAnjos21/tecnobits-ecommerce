//Página de Login do Administrador 

import React, { useState } from 'react';
import './AdminLoginPage.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const loggedInUser = login(email, password);

    if (loggedInUser && loggedInUser.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      setError('Credenciais de administrador inválidas.');
    }
  };

  return (
    <div className="loginContainer">
        <div className="loginBox">
            <h1 className="title">Login do Administrador</h1>
            <form onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="formGroup">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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