import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './style/global.css';
import { CartProvider } from './contexts/CartContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx'; // <-- PASSO 1: IMPORTAR

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* <-- PASSO 2: ENVOLVER */}
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider> {/* <-- PASSO 2: FECHAR */}
    </BrowserRouter>
  </StrictMode>
);