import React, { useState } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../contexts/AuthContext'; // 1. Importar o hook do contexto

// Componentes e Ícones
import Logo from '../Logo';
import { InputDefault } from '../Input';
import { useCart } from '../../contexts/CartContext';
import products from '../../data/products.json';
import { FaRegCircleUser, FaCartShopping, FaRegHeart, FaAngleDown } from 'react-icons/fa6';
import { IoSunny } from 'react-icons/io5';

const Header = () => {
    // 2. Pegar os dados do usuário e a função de logout do contexto global
    const { user, logout } = useAuth();
    
    // Estados do componente (sem a simulação de login)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchHistory, setSearchHistory] = useState(() => {
        return JSON.parse(localStorage.getItem('searchHistory')) || [];
    });
    
    const navigate = useNavigate();
    const { getCartItemCount } = useCart();
    const cartItemCount = getCartItemCount();
    
    // Função de logout agora usa a função global do contexto
    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
        navigate('/');
    };

    // Gera o link do painel correto com base no usuário do contexto
    const getDashboardLink = () => {
        if (!user) return "/login"; // Se não há usuário, o link leva para o login
        switch (user.role) {
            case 'cliente': return "/cliente/dashboard";
            case 'vendedor': return "/vendedor/dashboard";
            case 'admin': return "/admin/dashboard";
            default: return "/login";
        }
    };

    // Lógica de busca e responsividade (sem alterações)
    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
      
        if (value.trim().length > 1) {
          const filtered = products.filter((product) => {
            const term = value.toLowerCase();
            return (
              product.name.toLowerCase().includes(term) ||
              product.brand?.toLowerCase().includes(term) ||
              product.category?.toLowerCase().includes(term)
            );
          });
      
          setSuggestions(filtered);
        } else {
          setSuggestions([]);
        }
    };

    const handleSearch = () => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return;
      
        const matchedProduct = products.find((product) =>
          product.name.toLowerCase().includes(term) ||
          product.brand?.toLowerCase().includes(term) ||
          product.category?.toLowerCase().includes(term)
        );
      
        if (matchedProduct) {
          const updatedHistory = [term, ...searchHistory.filter((t) => t !== term)].slice(0, 5);
          setSearchHistory(updatedHistory);
          localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      
          navigate(`/produtos/${matchedProduct.id}`);
        } else {
          alert('Produto não encontrado.');
        }
      
        setSuggestions([]);
    };
    
    const handleKeyPress = event => {
        if (event.key === 'Enter') handleSearch();
    };

    return (
        <header className="header-container">
            <div className="header-dropshadow">
                <div className='header-main'>
                    <button className='hamburger-menu' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6L18 18" stroke="#2D2D36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12H21M3 6H21M3 18H21" stroke="#2D2D36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        )}
                    </button>

                    <div className='content-logo'>
                        <Link to="/"><Logo /></Link>
                    </div>

                    <div className='search-input'>
                        <InputDefault
                            type='text'
                            placeholder='Pesquisar produtos...'
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyUp={handleKeyPress}
                        />
                         {(suggestions.length > 0 || searchHistory.length > 0) && (
                            <div className="search-suggestions">
                                {suggestions.map((product) => (
                                    <div key={product.id} className="suggestion-item-visual" onClick={() => { navigate(`/produtos/${product.id}`); setSearchTerm(''); setSuggestions([]); }}>
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
                                            <div key={i} className="suggestion-item" onClick={() => { setSearchTerm(term); handleSearch(); }}>
                                                🕘 {term}
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        )}
                        <div className='search-icon' onClick={handleSearch}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19ZM21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                    </div>

                    <div className='user-actions'>
                        {user ? (
                            <div className="user-logged-in" onMouseLeave={() => setIsUserMenuOpen(false)}>
                                <div className="user-info" onMouseEnter={() => setIsUserMenuOpen(true)}>
                                    <FaRegCircleUser className='user-icons'/>
                                    <div className="user-text">
                                        <span className='user-line'>Olá, <strong>{user.name}</strong></span>
                                        <span className='user-line subtle'>Minha Conta <FaAngleDown /></span>
                                    </div>
                                </div>
                                {isUserMenuOpen && (
                                    <div className="user-dropdown-menu">
                                        <Link to={getDashboardLink()} onClick={() => setIsUserMenuOpen(false)}>Meu Painel</Link>
                                        <button onClick={handleLogout}>Sair</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="user">
                                <Link to='/login' className='user-link'><FaRegCircleUser className='user-icons'/></Link>
                                <div className="user-text">
                                    <span className='user-line'>Olá, <Link to='/login' className='user-link'>Entre </Link>ou</span>
                                    <span className='user-line'><Link to='/create-account' className='user-link'>Cadastre-se</Link></span>
                                </div>
                            </div>
                        )}
                        
                        <div className="functions">
                            <Link to="/*" className="icon-link"><IoSunny /></Link>
                            <Link to="/*" className="icon-link"><FaRegHeart /></Link>
                            <Link to="/shopping-cart" className="icon-link">
                                <FaCartShopping />
                                {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
                            </Link>
                        </div>
                    </div>
                </div>

                <nav className={`header-nav ${isMenuOpen ? 'mobile-open' : ''}`}>
                    <ul className="nav-list">
                        <li><NavLink to='/' end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink></li>
                        <li><NavLink to='/produtos' className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Produtos</NavLink></li>
                        <li><NavLink to='/categorias' className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Categorias</NavLink></li>
                        <li><NavLink to={getDashboardLink()} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Meu Painel</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

