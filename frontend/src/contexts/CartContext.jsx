import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Função auxiliar para fazer chamadas API
const apiCall = async (url, options = {}) => {
  const token = localStorage.getItem('authToken'); // Corrigido: era 'token', deve ser 'authToken'

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  };

  const response = await fetch(`http://localhost:3001/api${url}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carregar carrinho do servidor
  const loadCartFromServer = async () => {
    try {
      setIsLoading(true);
      const data = await apiCall('/cart');

      // Transformar dados do servidor para formato local
      const transformedItems = data.items.map(cartItem => ({
        id: cartItem.productId,
        cartItemId: cartItem.id, // ID do item no carrinho
        name: cartItem.product.title,
        price: cartItem.product.price,
        imageUrl: cartItem.product.images[0] || '',
        quantity: cartItem.quantity,
      }));

      setCartItems(transformedItems);
    } catch (error) {
      console.error('❌ Erro ao carregar carrinho:', error);
      // Fallback para localStorage se falhar
      const localData = localStorage.getItem('cartItems');
      if (localData) {
        setCartItems(JSON.parse(localData));
      }
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  };

  // Sincronizar carrinho local com servidor
  const syncCartWithServer = async () => {
    if (!isInitialized) return;

    try {
      // Buscar carrinho atual do servidor
      const serverCart = await apiCall('/cart');

      // Comparar e sincronizar diferenças
      const serverItems = serverCart.items || [];

      // Para cada item local, verificar se existe no servidor
      for (const localItem of cartItems) {
        const serverItem = serverItems.find(item => item.productId === localItem.id);

        if (!serverItem) {
          // Item não existe no servidor, adicionar
          await apiCall('/cart', {
            method: 'POST',
            body: JSON.stringify({
              productId: localItem.id,
              quantity: localItem.quantity,
            }),
          });
        } else if (serverItem.quantity !== localItem.quantity) {
          // Quantidade diferente, atualizar
          await apiCall(`/cart/${serverItem.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              quantity: localItem.quantity,
            }),
          });
        }
      }

      // Recarregar carrinho após sincronização
      await loadCartFromServer();
    } catch (error) {
      console.error('Erro ao sincronizar carrinho:', error);
    }
  };

  // Adicionar item ao carrinho (servidor primeiro, depois local)
  const addToCart = async (product) => {
    // Verificar se usuário está logado
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('❌ Usuário não está logado!');
      alert('Você precisa estar logado para adicionar itens ao carrinho.');
      return;
    }

    try {
      // Primeiro sincronizar com servidor
      await apiCall('/cart', {
        method: 'POST',
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      // Depois recarregar tudo do servidor para ter dados consistentes
      await loadCartFromServer();
    } catch (error) {
      console.error('❌ Erro ao adicionar item ao carrinho:', error);

      // Mostrar mensagem de erro específica para o usuário
      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        alert('Erro de autenticação. Faça login novamente.');
      } else if (error.message?.includes('404')) {
        alert('Produto não encontrado.');
      } else if (error.message?.includes('400')) {
        alert('Dados inválidos. Verifique o produto.');
      } else {
        alert('Erro ao adicionar produto ao carrinho. Tente novamente.');
      }

      // Não adicionar localmente se falhar no servidor
      throw error;
    }
  };

  // Remover item do carrinho (servidor primeiro, depois local)
  const removeFromCart = async (productId) => {
    // Encontrar o item para obter o cartItemId
    const itemToRemove = cartItems.find(item => item.id === productId);

    if (!itemToRemove?.cartItemId) {
      console.warn('Item não tem cartItemId, não pode remover do servidor');
      return;
    }

    try {
      // Primeiro remover do servidor
      await apiCall(`/cart/${itemToRemove.cartItemId}`, {
        method: 'DELETE',
      });

      // Depois recarregar tudo do servidor
      await loadCartFromServer();
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error);
      // Não remover localmente se falhar no servidor
      throw error;
    }
  };

  // Atualizar quantidade (local + servidor)
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    const itemToUpdate = cartItems.find(item => item.id === productId);
    const oldQuantity = itemToUpdate?.quantity || 0;

    console.log('🔄 Tentando atualizar quantidade:', {
      productId,
      quantity,
      itemToUpdate,
      cartItemId: itemToUpdate?.cartItemId,
      allCartItems: cartItems
    });

    // Se não tem cartItemId, não pode atualizar no servidor
    if (!itemToUpdate?.cartItemId) {
      console.warn('⚠️ Item não tem cartItemId, pulando sincronização com servidor');
      // Apenas atualização local
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        )
      );
      return;
    }

    // Atualização otimista local
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );

    // Sincronizar com servidor
    try {
      console.log('📡 Fazendo chamada PATCH para:', `/cart/${itemToUpdate.cartItemId}`);
      const response = await apiCall(`/cart/${itemToUpdate.cartItemId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          quantity: Math.max(1, quantity),
        }),
      });
      console.log('✅ Resposta do servidor:', response);
    } catch (error) {
      console.error('❌ Erro ao atualizar quantidade:', error);
      // Reverter mudança local em caso de erro
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: oldQuantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Carregar carrinho quando o usuário estiver autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCartFromServer();
    } else if (!isAuthenticated) {
      // Limpar carrinho quando usuário não estiver autenticado
      setCartItems([]);
      setIsInitialized(true);
    }
  }, [isAuthenticated, user]);

  // Salvar no localStorage como backup
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount,
      loadCartFromServer,
      syncCartWithServer,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
};