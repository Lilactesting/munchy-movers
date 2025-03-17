
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem } from '@/data/types';
import { toast } from 'sonner';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (menuItem: MenuItem, quantity?: number, selectedChoices?: { [optionId: string]: string[] }, specialInstructions?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartRestaurantId: string | null;
  cartCount: number;
  cartTotal: number;
  updateSpecialInstructions: (cartItemId: string, instructions: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartRestaurantId, setCartRestaurantId] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart.items || []);
        setCartRestaurantId(parsedCart.restaurantId || null);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({
      items: cartItems,
      restaurantId: cartRestaurantId
    }));
    
    // Update cart count and total
    setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
    setCartTotal(cartItems.reduce((total, item) => {
      const itemTotal = item.menuItem.price * item.quantity;
      // Add any selected choices price
      let choicesTotal = 0;
      if (item.selectedChoices) {
        Object.entries(item.selectedChoices).forEach(([optionId, choiceIds]) => {
          const option = item.menuItem.options?.find(opt => opt.id === optionId);
          if (option) {
            choiceIds.forEach(choiceId => {
              const choice = option.choices.find(c => c.id === choiceId);
              if (choice) {
                choicesTotal += choice.price;
              }
            });
          }
        });
      }
      return total + itemTotal + (choicesTotal * item.quantity);
    }, 0));
  }, [cartItems, cartRestaurantId]);

  const addToCart = (
    menuItem: MenuItem, 
    quantity: number = 1, 
    selectedChoices?: { [optionId: string]: string[] },
    specialInstructions?: string
  ) => {
    // Check if we're adding from a different restaurant
    if (cartRestaurantId && cartRestaurantId !== menuItem.restaurantId && cartItems.length > 0) {
      if (!confirm('Adding items from a different restaurant will clear your current cart. Continue?')) {
        return;
      }
      setCartItems([]);
    }

    setCartRestaurantId(menuItem.restaurantId);
    
    // Generate a unique cart item ID
    const cartItemId = `${menuItem.id}-${Date.now()}`;
    
    setCartItems(prevItems => [
      ...prevItems,
      {
        id: cartItemId,
        menuItem,
        quantity,
        selectedChoices,
        specialInstructions
      }
    ]);
    
    toast('Item added to cart', {
      description: `${quantity} × ${menuItem.name}`,
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== cartItemId);
      // If cart is now empty, reset restaurant ID
      if (newItems.length === 0) {
        setCartRestaurantId(null);
      }
      return newItems;
    });
    
    toast('Item removed from cart');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const updateSpecialInstructions = (cartItemId: string, instructions: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === cartItemId ? { ...item, specialInstructions: instructions } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCartRestaurantId(null);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartRestaurantId,
        cartCount,
        cartTotal,
        updateSpecialInstructions,
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
