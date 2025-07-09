import { useEffect, useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import ProductListing from '../../components/ProductListing';
import CustomSelect from '../../components/CustomSelect'; // Importe o novo componente
import './ProductListingPage.css';
import Section from '../../components/Section';
import products from '../../data/products.json';



const ProductListingPage = () => {
  const [sortBy, setSortBy] = useState('mais-relevantes');

  // Estado para verificar o tamanho da tela
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 460);

  // Estado para controlar a visibilidde do sidebar (filtro de produtos)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Opções do select de ordenação (apenas visual, sem funcionalidade)
  const sortOptions = [
    { value: 'mais-relevantes', label: 'mais relevantes' },
    { value: 'menor-preco', label: 'menor preço' },
    { value: 'maior-preco', label: 'maior preço' },
    { value: 'mais-vendidos', label: 'mais vendidos' },
  ];

  // Usar todos os produtos sem filtro
  const filteredProducts = products;

  // Marcas fixas para exibição visual dos filtros
  const uniqueBrands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour', 'New Balance', 'Converse', 'Vans', 'Fila', 'Asics'];

  // Verificar o tamanho da tela quando o componente montar e quando a janela for redimensionada
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 460;
      setIsMobile(mobile);
      // Se a tela não for mais mobile, garantir que o sidebar feche
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    // Adicionar o evento de redimensionamento
    window.addEventListener('resize', handleResize);
    // Chamar handleResize uma vez para definir o estado inicial corretamente
    handleResize();

    // Remover o evento de redimensionamento quando o componente desmontar
    // para evitar problemas de memória
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Array de dependências vazio para executar apenas na montagem e desmontagem

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {isMobile && isSidebarOpen && (
        <div className='sidebar-overlay' onClick={toggleSidebar}></div>
      )}
      {/* Header com resultados e ordenação */}
      <div className='listing-header'>
        <div className='results-info'>
          <h2>Resultados para "Nike" - 389 produtos</h2>
        </div>

        {/* Substituição do select nativo pelo customizado */}
        <div className='sort-container'>
          <CustomSelect
            value={sortBy}
            onChange={setSortBy}
            options={sortOptions}
          />
        </div>

        {/* Wrapper para o ícone de filtro, visível apenas em mobile */}
        <div
          className='filter-icon-wrapper'
          onClick={isMobile ? toggleSidebar : null}
        >
          {isMobile && <CiFilter size={24} color='white' />}
        </div>
      </div>

      <Section>
        <div className='content-container'>
          {/* Sidebar com filtros - apenas visual, sem funcionalidade */}
          <aside
            className={`filters-sidebar ${isMobile && isSidebarOpen ? 'open' : ''} ${!isMobile ? 'desktop-visible' : ''}`}
          >
            <h3>Filtrar por</h3>

            {/* Filtro por Marca - apenas visual */}
            <div className='filter-group'>
              <h4>Marca</h4>
              <div className='filter-options'>
                {uniqueBrands.slice(0, 10).map(marca => (
                  <label key={marca} className='filter-option'>
                    <input
                      type='checkbox'
                      disabled
                    />
                    <span>{marca}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtro por Categoria - apenas visual */}
            <div className='filter-group'>
              <h4>Categoria</h4>
              <div className='filter-options'>
                {['Esporte e lazer', 'Casual', 'Utilitário', 'Corrida'].map(
                  categoria => (
                    <label key={categoria} className='filter-option'>
                      <input
                        type='checkbox'
                        disabled
                      />
                      <span>{categoria}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Filtro por Gênero - apenas visual */}
            <div className='filter-group'>
              <h4>Gênero</h4>
              <div className='filter-options'>
                {['Masculino', 'Feminino', 'Unissex'].map(genero => (
                  <label key={genero} className='filter-option'>
                    <input
                      type='checkbox'
                      disabled
                    />
                    <span>{genero}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtro por Estado - apenas visual */}
            <div className='filter-group'>
              <h4>Estado</h4>
              <div className='filter-options'>
                {['Novo', 'Usado'].map(estado => (
                  <label key={estado} className='filter-option'>
                    <input
                      type='checkbox'
                      disabled
                    />
                    <span>{estado}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid de produtos */}
          <main className='products-grid'>
            <ProductListing $isPageProducts products={filteredProducts} />
          </main>
        </div>
      </Section>
    </div>
  );
};

export default ProductListingPage;
