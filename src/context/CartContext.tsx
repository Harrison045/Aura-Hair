import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: number | string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  subtotal: number;
  cartLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);

  // Sync with Firestore
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setItems([]);
      setCartLoading(false);
      return;
    }

    console.log('CartContext: Setting up live sync for:', user.email);
    const cartRef = doc(db, 'carts', user.uid);
    
    const unsubscribe = onSnapshot(cartRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setItems(data.items || []);
      } else {
        setItems([]);
      }
      setCartLoading(false);
    }, (error) => {
      console.error('CartContext: sync error:', error);
      setCartLoading(false);
    });

    return () => unsubscribe();
  }, [user, authLoading]);

  const updateFirestore = async (newItems: CartItem[]) => {
    if (!user) return;
    try {
      const cartRef = doc(db, 'carts', user.uid);
      await setDoc(cartRef, { 
        items: newItems,
        userEmail: user.email,
        userName: user.displayName,
        lastUpdated: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      console.error('CartContext: update error:', error);
    }
  };

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      let updatedItems: CartItem[];
      
      if (existingItem) {
        updatedItems = prevItems.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedItems = [...prevItems, { ...newItem, quantity: 1 }];
      }
      
      if (user) updateFirestore(updatedItems);
      return updatedItems;
    });
  };

  const removeItem = (id: number | string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      if (user) updateFirestore(updatedItems);
      return updatedItems;
    });
  };

  const updateQuantity = (id: number | string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => (item.id === id ? { ...item, quantity } : item));
      if (user) updateFirestore(updatedItems);
      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    if (user) updateFirestore([]);
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return total + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        cartLoading,
      }}
    >
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

