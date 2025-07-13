import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink, Link } from 'react-router-dom';
import './Header.css'; // A usar CSS normal

// Componentes que o seu Header precisa
import Logo from '../Logo';
import { PrimaryBtn } from '../Buttons/ButtonComponents';
import { InputDefault } from '../Input';
import { useCart } from '../../contexts/CartContext';
// 1. Caminho da imagem corrigido para 'icons'
import logoIcon from '../../assets/icons/logo.png';
import products from '../../data/products.json'; // Importando os produtos para o filtro

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearch, setShowSearch] = useState(window.innerWidth > 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const navigate = useNavigate();
    const location = useLocation();
    const [suggestions, setSuggestions] = useState([]);
    const [searchHistory, setSearchHistory] = useState(() => {
  return JSON.parse(localStorage.getItem('searchHistory')) || [];
});

    // Contexto do Carrinho
    const cartContext = useCart();
    const cartItemCount = cartContext ? cartContext.getCartItemCount() : 0;

    // Verifica se é uma página de autenticação
    const isAuthPage = ['/login', '/register', '/create-account'].includes(location.pathname);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (!mobile) {
                setShowSearch(true); // Mostra sempre a busca em ecrãs maiores
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);
    
    
// Função para lidar com a mudança no input de pesquisa
const handleInputChange = (event) => {
const value = event.target.value;
setSearchTerm(value);

// Sugestões de produtos por nome
if (value.trim().length > 1) {
    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5)); // no máximo 5 sugestões
  } else {
    setSuggestions([]);
  }
};


    const toggleSearch = () => isMobile && setShowSearch(!showSearch);

    // Função para lidar com a pesquisa
    const handleSearch = () => {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return;

  const matchedProduct = products.find((p) =>
    p.name.toLowerCase().includes(term)
  );

  if (matchedProduct) {
    // Atualiza histórico local
    const updatedHistory = [term, ...searchHistory.filter((t) => t !== term)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

    navigate(`/produtos/${matchedProduct.id}`);
  } else {
    alert('Produto não encontrado.');
  }

  if (isMobile) {
    setShowSearch(false);
  }
  setSuggestions([]);
};

    const handleKeyPress = event => {
        if (event.key === 'Enter') handleSearch();
    };

    const headerClasses = `header-container ${isAuthPage ? 'auth-page' : ''}`;
    const dropshadowClasses = `header-dropshadow ${isAuthPage ? 'auth-page' : ''}`;
    const navClasses = `header-nav ${isMenuOpen ? 'mobile-open' : ''}`;

    return (
        <header className={headerClasses}>
            <div className={dropshadowClasses}>
                {isAuthPage ? (
                    // Cabeçalho simplificado para páginas de autenticação
                    <div className='header-main-auth'>
                        <Link to="/" className="back-icon" aria-label="Voltar para a página principal">
                             {/* 2. Use a imagem importada aqui */}
                             <img src={logoIcon} alt="Logotipo Tecnobits" className="auth-logo-icon" />
                        </Link>
                    </div>
                ) : (
                    // Cabeçalho completo para as outras páginas
                    <>
                        <div className='header-main'>
                            <button className='hamburger-menu' onClick={handleMenuClick}>
                                {isMenuOpen ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6L18 18" stroke="#2D2D36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12H21M3 6H21M3 18H21" stroke="#2D2D36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                )}
                            </button>

                            <div className='content-logo'>
                                <Link to="/" className="back-icon" aria-label="Voltar para a página principal">
                                <Logo /></Link>
                            </div>

                            <div className='search-input'>
                                {(showSearch || !isMobile) && (
                                    <InputDefault
                                        type='text'
                                        placeholder='Pesquisar produtos...'
                                        value={searchTerm}
                                        onChange={handleInputChange}
                                        onKeyUp={handleKeyPress}
                                        
                                    />
                                )}
                                {(suggestions.length > 0 || searchHistory.length > 0) && (
  <div className="search-suggestions">
    {suggestions.map((product) => (
      <div
        key={product.id}
        className="suggestion-item-visual"
        onClick={() => {
          navigate(`/produtos/${product.id}`);
          setSearchTerm('');
          setSuggestions([]);
        }}
      >
        <img src={product.image} alt={product.name} className="suggestion-image" />
        <div className="suggestion-info">
          <span className="suggestion-name">{product.name}</span>
          <span className="suggestion-price">R$ {product.price.toFixed(2)}</span>
        </div>
      </div>
    ))}

    {suggestions.length === 0 && (
      <>
        <div className="history-title">Buscas recentes:</div>
        {searchHistory.map((term, i) => (
          <div
            key={i}
            className="suggestion-item"
            onClick={() => {
              setSearchTerm(term);
              handleSearch();
            }}
          >
            🕘 {term}
          </div>
        ))}
      </>
    )}
  </div>
)}

                                <div className='search-icon' onClick={isMobile ? toggleSearch : handleSearch}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19ZM21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </div>
                                <NavLink to='/create-account' className='nav-link'>Cadastre-se</NavLink>
                            </div>

                            <div className='user-actions'>
                                <PrimaryBtn>
                                    <Link to='/login' className='btn-nav-link'>Entrar</Link>
                                </PrimaryBtn>
                                <Link to="/shopping-cart" className="icon-link">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22ZM20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22ZM1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    {cartItemCount > 0 && (
                                        <span className="cart-badge">{cartItemCount}</span>
                                    )}
                                </Link>
                            </div>
                        </div>
                        <nav className={navClasses}>
                            <ul className="nav-list">
                                <li><NavLink to='/' end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink></li>
                                <li><NavLink to='/produtos' className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Produtos</NavLink></li>
                                <li><NavLink to='/categorias' className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Categorias</NavLink></li>
                                <li><NavLink to='/orders' className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Meus Pedidos</NavLink></li>
                            </ul>
                        </nav>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
