import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [pendingProduct, setPendingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://project-tpfa.onrender.com/cart";

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (productData) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');

      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: productData.name,
          price: productData.price,
          quantity: productData.quantity || 1,
          category: productData.category || "Smartphones",
          image: productData.image || "https://cdn.mos.cms.futurecdn.net/N8HvTtX5JAwd6C5Y2WLZZC.jpg"
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add product");

      setCartItems(prev => {
        const existingItem = prev.find(item => item.name === productData.name);
        if (existingItem) {
          return prev.map(item =>
            item.name === productData.name
              ? { ...item, quantity: item.quantity + (productData.quantity || 1) }
              : item
          );
        }
        
        const itemIdentifier = data.data?._id || data.data?.id || Date.now();
        return [...prev, { id: itemIdentifier, ...productData, quantity: productData.quantity || 1 }];
      });
    } catch (err) {
      setError(err.message);
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };

  const setDeferredProduct = (product) => {
    setPendingProduct(product);
  };

  const processDeferredProduct = async () => {
    if (pendingProduct) {
      await addToCart(pendingProduct);
      setPendingProduct(null);
    }
  };

  // UPDATED: Removed alerts so Cart.js can show Toasts instead
  const removeItem = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/removeproduct/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id && item._id !== id));
        // Removed: alert("Product removed from cart successfully!");
      } else {
        const data = await response.json();
        setError(data.message || "Could not delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Error connecting to the server");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id || item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      addToCart,
      removeItem,
      updateQuantity,
      setDeferredProduct,
      processDeferredProduct,
      pendingProduct,
      loading,
      error
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);