import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, subtotal, totalItems, cartLoading } = useCart();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-brand-charcoal/40 backdrop-blur-sm z-[100]"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-theme-bg shadow-2xl z-[101] flex flex-col theme-transition"
          >
            {/* Header */}
            <div className="p-6 border-b border-theme-text/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-taupe" />
                <h2 className="text-xl font-medium text-theme-text">Your Bag ({totalItems})</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-theme-text/5 rounded-full transition-colors text-theme-text"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartLoading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-brand-taupe border-t-transparent rounded-full"
                  />
                  <p className="text-sm text-theme-text opacity-40">Syncing with Aura...</p>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-brand-rose/10 rounded-full flex items-center justify-center text-brand-rose">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <p className="text-theme-text opacity-60">Your bag is empty.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-theme-text text-theme-bg px-8 py-3 rounded-full text-sm font-medium hover:bg-brand-taupe transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-theme-text/5 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-theme-text leading-tight">{item.name}</h3>
                          <p className="text-sm text-theme-text opacity-50 mt-1">{item.price}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-theme-text opacity-30 hover:text-red-500 hover:opacity-100 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-theme-text/10 rounded-full px-2 py-1 gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-theme-text/5 rounded-full text-theme-text disabled:opacity-20"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium text-theme-text w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-theme-text/5 rounded-full text-theme-text"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-medium text-theme-text">
                          ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-theme-text/10 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-theme-text opacity-60 font-light">Subtotal</span>
                  <span className="text-2xl font-medium text-theme-text">${subtotal.toFixed(0)}</span>
                </div>
                <p className="text-xs text-theme-text opacity-40 leading-relaxed">
                  Shipping and taxes calculated at checkout. Free shipping on orders over $150.
                </p>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-theme-text text-theme-bg py-4 rounded-full text-sm font-medium hover:bg-brand-taupe hover:text-theme-text transition-all duration-300 shadow-xl shadow-theme-text/10"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
