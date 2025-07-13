import { useEffect, useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import ProductListing from '../../components/ProductListing';
import CustomSelect from '../../components/CustomSelect';
import './ProductListingPage.css';
import Section from '../../components/Section';
import products from '../../data/products.json';

const ProductListingPage = () => {
  // 🧠 Estado dos filtros
  const [mostrarTodasMarcas, setMostrarTodasMarcas] = useState(false);
  const [mostrarTodasCategorias, setMostrarTodasCategorias] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    marca: [],
    categoria: [],
    emEstoque: false,
  });

  // 🧠 Estado de ordenação
  const [sortBy, setSortBy] = useState('mais-relevantes');
  const sortOptions = [
    { value: 'mais-relevantes', label: 'mais relevantes' },
    { value: 'menor-preco', label: 'menor preço' },
    { value: 'maior-preco', label: 'maior preço' },
    { value: 'mais-vendidos', label: 'mais vendidos' },
  ];

  // 📱 Responsividade
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 460);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 460;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(false);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 🔍 Categorias filtráveis
  const categoriasDesejadas = [
    'SMARTPHONE',
    'NOTEBOOK',
    'HEADPHONE',
    'TABLET',
    'SMART-TV',
    'GADGET',
    'PROCESSOR',
    'PLACA GRÁFICA',
    'PLACA-MÃE',
    'MEMÓRIA RAM',
    'ARMAZENAMENTO',
    'FONTE DE ENERGIA',
    'RESFRIAMENTO',
    'GABINETE',
    'MOBILE-PC',
  ];
  // 🔍 Categorias disponíveis no products.json, limitadas às desejadas
  const categoriasDisponiveis = Array.from(
    new Set(products.map(p => p.category))
  ).filter(cat => categoriasDesejadas.includes(cat));

  // 🔍 Marcas desejadas
  const marcasDesejadas = [
    'Apple',
    'Samsung',
    'Dell',
    'Sony',
    'LG',
    'Nintendo',
    'Xiaomi',
    'Google',
    'Lenovo',
    'ASUS',
    'Bose',
    'JBL',
    'Microsoft',
    'Intel',
    'AMD',
    'NVIDIA',
    'MSI',
    'GIGABYTE',
    'ASRock',
    'Corsair',
    'G.Skill',
    'Kingston',
    'Western Digital',
    'Seagate',
    'Seasonic',
    'EVGA',
    'Cooler Master',
    'Thermaltake',
    'Noctua',
    'NZXT',
    'be quiet!',
    'Fractal Design',
    'OnePlus',
    'Nothing',
    'Motorola',
    'Huawei',
    'Realme',
    'Vivo',
    'Honor',
    'OPPO',
    'Framework',
    'GPD',
    'Valve',
    'AYA',
    'OneXPlayer',
    'Anbernic',
    'MINISFORUM',
    'Beelink',
    'TCL',
    'Hisense',
    'Philips',
    'Audio-Technica',
    'SteelSeries',
    'Sennheiser',
  ];

  // 🔍 Marcas disponíveis no products.json, limitadas às desejadas
  const marcasDisponiveis = Array.from(
    new Set(products.map(p => p.brand))
  ).filter(marca => marcasDesejadas.includes(marca));

  // 🧠 Aplicar Filtros e Ordenação
  const applyFiltersAndSort = () => {
    let result = [...products];

    // Filtro por marca
    if (selectedFilters.marca.length > 0) {
      result = result.filter(prod =>
        selectedFilters.marca.includes(prod.brand)
      );
    }

    // Filtro por categoria
    if (selectedFilters.categoria.length > 0) {
      result = result.filter(prod =>
        selectedFilters.categoria.includes(prod.category)
      );
    }

    // Filtro por estoque
    if (selectedFilters.emEstoque) {
      result = result.filter(prod => prod.inStock === true);
    }

    // Ordenação
    switch (sortBy) {
      case 'menor-preco':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'maior-preco':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'mais-vendidos':
        result.sort((a, b) => (b.sales || 0) - (a.sales || 0));
        break;
      default:
        break;
    }

    return result;
  };

  const filteredProducts = applyFiltersAndSort();

  return (
    <div>
      {isMobile && isSidebarOpen && (
        <div className='sidebar-overlay' onClick={toggleSidebar}></div>
      )}

      {/* 🔹 Cabeçalho */}
      <div className='listing-header'>
        <div className='results-info'>
          <h2>Resultados para "Hardware" - 106 produtos</h2>

        <div className='sort-container'>
          <CustomSelect
            value={sortBy}
            onChange={setSortBy}
            options={sortOptions}
          />
        </div>

        <div
          className='filter-icon-wrapper'
          onClick={isMobile ? toggleSidebar : null}
        >
          {isMobile && <CiFilter size={24} color='white' />}
        </div>
      </div>

      <Section>
        <div className='content-container'>
          {/* 🔸 Filtros */}
          <aside
            className={`filters-sidebar ${
              isMobile && isSidebarOpen ? 'open' : ''
            } ${!isMobile ? 'desktop-visible' : ''}`}
          >
            <h3>Filtrar por</h3>

            {/* 🔘 Marca */}
            <div className='filter-group'>
              <h4
                onClick={() => setMostrarTodasMarcas(prev => !prev)}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                Marca {mostrarTodasMarcas ? '▲' : '▼'}
              </h4>
              <div className='filter-options'>
                {(mostrarTodasMarcas
                  ? marcasDisponiveis
                  : marcasDisponiveis.slice(0, 0)
                ).map(marca => (
                  <label key={marca} className='filter-option'>
                    <input
                      type='checkbox'
                      checked={selectedFilters.marca.includes(marca)}
                      onChange={e => {
                        const checked = e.target.checked;
                        setSelectedFilters(prev => ({
                          ...prev,
                          marca: checked
                            ? [...prev.marca, marca]
                            : prev.marca.filter(m => m !== marca),
                        }));
                      }}
                    />
                    <span>{marca}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 🔘 Categoria */}
            <div className='filter-group'>
              <h4
                onClick={() => setMostrarTodasCategorias(prev => !prev)}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                Categoria {mostrarTodasCategorias ? '▲' : '▼'}
              </h4>
              <div className='filter-options'>
                {(mostrarTodasCategorias
                  ? categoriasDisponiveis
                  : categoriasDisponiveis.slice(0, 3)
                ).map(categoria => (
                  <label key={categoria} className='filter-option'>
                    <input
                      type='checkbox'
                      checked={selectedFilters.categoria.includes(categoria)}
                      onChange={e => {
                        const checked = e.target.checked;
                        setSelectedFilters(prev => ({
                          ...prev,
                          categoria: checked
                            ? [...prev.categoria, categoria]
                            : prev.categoria.filter(c => c !== categoria),
                        }));
                      }}
                    />
                    <span>{categoria}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 🔘 Em estoque */}
            <div className='filter-group'>
              <h4>Em Estoque</h4>
              <div className='filter-options'>
                <label className='filter-option'>
                  <input
                    type='checkbox'
                    checked={selectedFilters.emEstoque}
                    onChange={e =>
                      setSelectedFilters(prev => ({
                        ...prev,
                        emEstoque: e.target.checked,
                      }))
                    }
                  />
                  <span>Disponível</span>
                </label>
              </div>
            </div>
          </aside>

          {/* 🛒 Lista de Produtos */}
          <main className='products-grid'>
            <ProductListing $isPageProducts products={filteredProducts} />
          </main>
        </div>
      </Section>
    </div>
    </div>
  );
};

export default ProductListingPage;
