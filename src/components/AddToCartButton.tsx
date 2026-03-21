import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart, CartItem } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn'; 

interface AddToCartButtonProps {
  product: Omit<CartItem, 'quantity'>;
  className?: string;
  defaultText?: string;
  addedText?: string;
  showIcon?: boolean;
}

export default function AddToCartButton({
  product,
  className,
  defaultText = "Add to Bag",
  addedText = "Added!",
  showIcon = true
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { user, setIsAuthModalOpen, setPendingAction } = useAuth();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isAdded) {
      timeout = setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [isAdded]);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      setPendingAction(() => {
        addItem(product);
        setIsAdded(true);
      });
      setIsAuthModalOpen(true);
      return;
    }

    addItem(product);
    setIsAdded(true);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isAdded}
      className={cn(
        "relative flex items-center justify-center overflow-hidden transition-all duration-700 active:scale-[0.98] h-12 rounded-full font-medium text-sm w-full",
        isAdded 
          ? "bg-brand-taupe text-brand-charcoal cursor-default" 
          : cn("bg-white text-brand-charcoal shadow-md hover:shadow-lg", className)
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {!isAdded ? (
          <motion.div
            key="add"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="flex items-center justify-center gap-2 w-full h-full"
          >
            {showIcon && <ShoppingBag className="w-4 h-4" />}
            <span>{defaultText}</span>
          </motion.div>
        ) : (
          <motion.div
            key="added"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="flex items-center justify-center gap-2 w-full h-full"
          >
            <span className="font-bold tracking-tight">{addedText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
