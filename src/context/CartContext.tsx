import React, { createContext, useContext, useState, useEffect } from 'react';

// Define cart item interface
export interface CartItem {
  id: string;
  type: 'window' | 'door';
  name: string;
  profile: string;
  windowType?: string;
  openingDirection?: string;
  glazing: string;
  colors: {
    base: string;
    outside: string;
    inside: string;
    rubber: string;
  };
  dimensions: {
    width: number;
    height: number;
  };
  quantity: number;
  price: number;
  imageUrl: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Try to load cart from localStorage or start with empty array
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Calculate cart total and count
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  // Add item to cart
  const addToCart = (newItem: CartItem) => {
    setItems(currentItems => {
      // Check if item already exists (same type, profile, dimensions, colors, etc.)
      const existingItemIndex = currentItems.findIndex(item => 
        item.type === newItem.type && 
        item.profile === newItem.profile && 
        item.glazing === newItem.glazing && 
        item.dimensions.width === newItem.dimensions.width && 
        item.dimensions.height === newItem.dimensions.height && 
        item.colors.base === newItem.colors.base &&
        item.colors.outside === newItem.colors.outside &&
        item.colors.inside === newItem.colors.inside &&
        item.colors.rubber === newItem.colors.rubber &&
        item.windowType === newItem.windowType &&
        item.openingDirection === newItem.openingDirection
      );
      
      // If item exists, increase quantity
      if (existingItemIndex !== -1) {
        return currentItems.map((item, idx) =>
          idx === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } 
      
      // Otherwise add new item
      return [...currentItems, newItem];
    });
  };
  
  // Update quantity of an item
  const updateQuantity = (id: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  // Remove item from cart
  const removeFromCart = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };
  
  // Clear cart
  const clearCart = () => {
    setItems([]);
  };
  
  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartCount,
      cartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
