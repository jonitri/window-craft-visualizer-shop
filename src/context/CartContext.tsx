
import { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

// Define the cart item type
export interface CartItem {
  id: string;
  type: 'window' | 'door';
  name: string;
  profile: string;
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
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    // Check if item already exists in cart
    const existingItem = cart.find((cartItem) => 
      cartItem.id === item.id ||
      (cartItem.type === item.type && 
       cartItem.profile === item.profile && 
       cartItem.glazing === item.glazing && 
       cartItem.colors.base === item.colors.base &&
       cartItem.colors.outside === item.colors.outside &&
       cartItem.colors.inside === item.colors.inside &&
       cartItem.colors.rubber === item.colors.rubber &&
       cartItem.dimensions.width === item.dimensions.width &&
       cartItem.dimensions.height === item.dimensions.height)
    );

    if (existingItem) {
      // If item exists, update quantity
      updateQuantity(existingItem.id, existingItem.quantity + item.quantity);
      toast({
        title: "Item quantity updated",
        description: `${item.name} quantity has been updated in your cart.`,
      });
    } else {
      // If item doesn't exist, add it
      setCart([...cart, { ...item, id: item.id || Date.now().toString() }]);
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`,
      });
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  // Update item quantity
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Get total price
  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Get total items
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
