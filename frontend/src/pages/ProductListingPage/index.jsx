import { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';
import { CiFilter } from 'react-icons/ci';
import ProductListing from '../../components/ProductListing';
import CustomSelect from '../../components/CustomSelect';
import './ProductListingPage.css';
import Section from '../../components/Section';
// import products from '../../data/products.json'; // Removido para usar dados do backend

const ProductListingPage = () => {
  const [products, setProducts] = useState([]); // Estado para produtos do backend
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro
  const [selectedFilters, setSelectedFilters] = useState({ categoriaMarca: {}, emEstoque: false });
  const [categoriasExpandida, setCategoriasExpandida] = useState({});
  const [sortBy, setSortBy] = useState('mais-relevantes');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 460);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sortOptions = [
    { value: 'mais-relevantes', label: 'mais relevantes' },
    { value: 'menor-preco', label: 'menor preço' },
    { value: 'maior-preco', label: 'maior preço' },
    { value: 'mais-vendidos', label: 'mais vendidos' }
  ];

  // Função para buscar produtos do backend usando service
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      // Adaptar os dados do backend para o formato esperado pelo frontend
      const adaptedProducts = data.map(product => {
        return {
          id: product.id,
          name: product.title, // title -> name
          description: product.description,
          price: product.price,
          priceDiscount: product.priceDiscount || 0, // Usar o campo priceDiscount do banco
          category: product.category?.name || 'Sem categoria', // Nome da categoria do relacionamento
          brand: product.brand || 'Marca', // Usar o campo brand do banco
          image: product.images?.[0] || '/images/404.png', // Primeira imagem
          rating: product.rating || 4.0, // Usar o campo rating do banco
          inStock: product.stock > 0,
          tagValue: product.tagValue || (product.stock > 0 ? null : 'Fora de estoque') // Usar tagValue do banco
        };
      });
      
      setProducts(adaptedProducts);
      setError(null);
    } catch (err) {
      console.error('❌ Erro ao buscar produtos:', err);
      setError('Erro ao carregar produtos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleCategoriaExpandida = categoria => {
    setCategoriasExpandida(prev => ({ ...prev, [categoria]: !prev[categoria] }));
  };

  const categoriasDesejadas = [
'SMARTPHONE',
    'NOTEBOOK',
    'HEADPHONE',
    'TABLET',
    'SMART-TV',
    'ACESSÓRIOS',
    'CONSOLES',
    'PROCESSADOR',
    'PLACA DE VÍDEO',
    'PLACA-MÃE',
    'MEMÓRIA RAM',
    'ARMAZENAMENTO',
    'FONTE DE ENERGIA',
    'RESFRIAMENTO',
    'GABINETE',
    'PC PORTÁTIL',
    'MINI-PC',
    'CONSOLE PORTÁTIL'
  ];

  const categoriasDisponiveis = Array.from(new Set(products.map(p => p.category)))
    .filter(cat => categoriasDesejadas.includes(cat));

  const marcasDesejadas = [
    'AMD',
    'Aigo',
    'Acer',
    'ASRock',
    'ASUS',
    'Anbernic',
    'Apple',
    'Audio-Technica',
    'AYA',
    'Beelink',
    'Bose',
    'Corsair',
    'Cooler Master',
    'EVGA',
    'Fractal Design',
    'GIGABYTE',
    'GPD',
    'G.Skill',
    'Google',
    'Honor',
    'Hisense',
    'Huawei',
    'Intel',
    'JBL',
    'Kingston',
    'LG',
    'Lenovo',
    'MINISFORUM',
    'MSI',
    'Microsoft',
    'Motorola',
    'NZXT',
    'Nintendo',
    'Noctua',
    'Nothing',
    'NVIDIA',
    'OnePlus',
    'OneXPlayer',
    'OPPO',
    'Philips',
    'Realme',
    'Samsung',
    'Seagate',
    'Seasonic',
    'Sennheiser',
    'Sony',
    'SteelSeries',
    'TCL',
    'Thermaltake',
    'Valve',
    'Vivo',
    'Western Digital',
    'Xiaomi',
    'be quiet!',
  ];

  const applyFiltersAndSort = () => {
  let result = [...products];

  // 🔹 Filtra pelas categorias desejadas (REABILITADO)
  const beforeCategoryFilter = result.length;
  result = result.filter(prod => categoriasDesejadas.includes(prod.category));
  
  console.log('⚠️ Filtro de categoria desabilitado temporariamente - mostrando todos os produtos');

  // 🔹 Se houver filtro de marca aplicado
  const filtroCategoriaMarca = Object.entries(selectedFilters.categoriaMarca)
    .filter(([, marcas]) => marcas.length > 0);

  if (filtroCategoriaMarca.length > 0) {
    result = result.filter(prod =>
      filtroCategoriaMarca.some(
        ([categoria, marcas]) =>
          prod.category === categoria && marcas.includes(prod.brand)
      )
    );
  }

  // 🔹 Filtro "Em Estoque"
  if (selectedFilters.emEstoque) {
    result = result.filter(prod => prod.inStock);
  }

    switch (sortBy) {
      case 'menor-preco': result.sort((a, b) => a.price - b.price); break;
      case 'maior-preco': result.sort((a, b) => b.price - a.price); break;
      case 'mais-vendidos': result.sort((a, b) => (b.sales || 0) - (a.sales || 0)); break;
    }

    return result;
  };

  const filteredProducts = applyFiltersAndSort();

  const filtrosPorCategoria = categoriasDisponiveis.reduce((acc, categoria) => {
    const produtosDaCategoria = products.filter(
      p => p.category === categoria && marcasDesejadas.includes(p.brand) && (!selectedFilters.emEstoque || p.inStock)
    );
    const marcas = Array.from(new Set(produtosDaCategoria.map(p => p.brand)));
    if (produtosDaCategoria.length > 0 && marcas.length > 0) {
      acc[categoria] = marcas.map(marca => {
        const quantidade = produtosDaCategoria.filter(p => p.brand === marca).length;
        return { nome: marca, quantidade };
      });
    }
    return acc;
  }, {});

  return (
    <div>
      {isMobile && isSidebarOpen && <div className='sidebar-overlay' onClick={toggleSidebar}></div>}

      <div className='listing-header'>
        <div className='results-info'>
          <h2>Resultados para "Hardware" - {filteredProducts.length} produtos</h2>
        </div>
        <div className='sort-container'>
          <CustomSelect value={sortBy} onChange={setSortBy} options={sortOptions} />
        </div>
        {isMobile && <div className='filter-icon-wrapper' onClick={toggleSidebar}><CiFilter size={24} color='white' /></div>}
      </div>

      <Section>
        <div className='content-container'>
          <aside className={`filters-sidebar ${isMobile && isSidebarOpen ? 'open' : ''} ${!isMobile ? 'desktop-visible' : ''}`}>
            <h3>Filtrar Categoria/ Marca</h3>
            <div className='filter-group'>
              <div className='filter-options'>
                {Object.entries(filtrosPorCategoria).map(([categoria, marcas]) => (
                  <div key={categoria} className='categoria-filtro'>
                    <h5 onClick={() => toggleCategoriaExpandida(categoria)} style={{ cursor: 'pointer', marginTop: '10px' }}>
                      {categoria} {categoriasExpandida[categoria] ? '▲' : '▼'}
                    </h5>
                    {categoriasExpandida[categoria] && (
                      <div className="marcas-scroll">
                        {marcas.map(({ nome: marca, quantidade }) => {
                          const checked = selectedFilters.categoriaMarca[categoria]?.includes(marca) || false;
                          return (
                            <label key={marca} className='filter-option'>
                              <input
                                type='checkbox'
                                checked={checked}
                                onChange={e => {
                                  const isChecked = e.target.checked;
                                  setSelectedFilters(prev => {
                                    const atual = { ...prev.categoriaMarca };
                                    const listaAtual = atual[categoria] || [];
                                    const novaCategoriaMarca = {
                                      ...atual,
                                      [categoria]: isChecked
                                        ? [...listaAtual, marca]
                                        : listaAtual.filter(m => m !== marca)
                                    };
                                    if (novaCategoriaMarca[categoria].length === 0) delete novaCategoriaMarca[categoria];
                                    return { ...prev, categoriaMarca: novaCategoriaMarca };
                                  });
                                }}
                              />
                              <span>{marca} ({quantidade})</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className='filter-group'>
              <h4>Em Estoque</h4>
              <div className='filter-options'>
                <label className='filter-option'>
                  <input
                    type='checkbox'
                    checked={selectedFilters.emEstoque}
                    onChange={e => setSelectedFilters(prev => ({ ...prev, emEstoque: e.target.checked }))}
                  />
                  <span>Disponível</span>
                </label>
              </div>
            </div>
          </aside>

          <main className='products-grid'>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Carregando produtos...</p>
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                <p>{error}</p>
                <button onClick={fetchProducts}>Tentar novamente</button>
              </div>
            ) : (
              <ProductListing $isPageProducts products={filteredProducts} />
            )}
          </main>
        </div>
      </Section>
    </div>
  );
};

export default ProductListingPage;
