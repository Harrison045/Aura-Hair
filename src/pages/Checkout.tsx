import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ChevronRight, 
  ShoppingBag,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const shipping = subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2500);
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-20 h-20 bg-brand-rose/10 rounded-full flex items-center justify-center text-brand-rose">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-medium text-theme-text">Your bag is empty</h1>
        <p className="text-theme-text opacity-60 max-w-md">
          Add some premium hair care products to your bag before checking out.
        </p>
        <Link 
          to="/shop" 
          className="bg-theme-text text-theme-bg px-8 py-3 rounded-full text-sm font-medium hover:bg-brand-taupe transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-8"
        >
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-medium text-theme-text">Order Confirmed</h1>
            <p className="text-theme-text opacity-60 max-w-md mx-auto">
              Thank you for your purchase. We've sent a confirmation email to 
              <span className="font-medium text-theme-text"> {user?.email || 'your email'}</span>.
            </p>
          </div>
          <div className="pt-4">
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-theme-text text-theme-bg px-8 py-4 rounded-full text-sm font-medium hover:bg-brand-taupe transition-all duration-300"
            >
              Continue Shopping
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg pt-24 pb-12 theme-transition">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-theme-text opacity-60 hover:opacity-100 transition-opacity mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to bag
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form */}
          <div className="lg:col-span-7 space-y-12">
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-theme-text text-theme-bg flex items-center justify-center text-sm font-medium">1</div>
                <h2 className="text-2xl font-medium text-theme-text">Shipping Information</h2>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-wider font-semibold opacity-40 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue={user?.email || ''}
                    placeholder="aura@hair.com"
                    className="w-full bg-theme-text/5 border border-theme-text/10 rounded-xl px-4 py-3 text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-text/20 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold opacity-40 ml-1">First Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane"
                    className="w-full bg-theme-text/5 border border-theme-text/10 rounded-xl px-4 py-3 text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-text/20 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold opacity-40 ml-1">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Doe"
                    className="w-full bg-theme-text/5 border border-theme-text/10 rounded-xl px-4 py-3 text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-text/20 transition-all"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-wider font-semibold opacity-40 ml-1">Address</label>
                  <input 
                    type="text" 
                    placeholder="123 Aura Lane"
                    className="w-full bg-theme-text/5 border border-theme-text/10 rounded-xl px-4 py-3 text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-text/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold opacity-40 ml-1">City</label>
                  <input 
                    type="text" 
                    placeholder="Los Angeles"
                    className="w-full bg-theme-text/5 border border-theme-text/10 rounded-xl px-4 py-3 text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-text/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold opacity-40 ml-1">Postal Code</label>
                  <input 
                    type="text" 
                    placeholder="90001"
                    className="w-full bg-theme-text/5 border border-theme-text/10 rounded-xl px-4 py-3 text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-text/20 transition-all"
                  />
                </div>
              </form>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-theme-text text-theme-bg flex items-center justify-center text-sm font-medium">2</div>
                <h2 className="text-2xl font-medium text-theme-text">Payment Method</h2>
              </div>
              
              <div className="p-6 border border-theme-text/10 rounded-2xl space-y-4 bg-theme-text/[0.02]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-brand-taupe" />
                    <span className="font-medium text-theme-text">Credit or Debit Card</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-theme-text/10 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                    <div className="w-8 h-5 bg-theme-text/10 rounded flex items-center justify-center text-[8px] font-bold">MC</div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-semibold opacity-40 ml-1">Card Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="•••• •••• •••• ••••"
                        className="w-full bg-theme-text/5 border border-theme-text/10 rounded-xl px-4 py-3 text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-text/20 transition-all"
                      />
                      <Lock className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 opacity-20" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-semibold opacity-40 ml-1">Expiry Date</label>
                      <input 
                        type="text" 
                        placeholder="MM / YY"
                        className="w-full bg-theme-text/5 border border-theme-text/10 rounded-xl px-4 py-3 text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-text/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-semibold opacity-40 ml-1">CVC</label>
                      <input 
                        type="text" 
                        placeholder="•••"
                        className="w-full bg-theme-text/5 border border-theme-text/10 rounded-xl px-4 py-3 text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-text/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="pt-6">
              <button 
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-theme-text text-theme-bg py-5 rounded-full text-sm font-medium hover:bg-brand-taupe hover:text-theme-text transition-all duration-300 shadow-xl shadow-theme-text/10 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isProcessing ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-theme-bg border-t-transparent rounded-full"
                    />
                    Processing Order...
                  </>
                ) : (
                  <>
                    Place Secure Order
                    <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-theme-text opacity-40 mt-4 flex items-center justify-center gap-2">
                <Lock className="w-3 h-3" />
                All transactions are secure and encrypted.
              </p>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-theme-text/[0.02] border border-theme-text/10 rounded-3xl p-8 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-theme-text">Order Summary</h2>
                <span className="px-3 py-1 bg-brand-rose/10 text-brand-rose rounded-full text-xs font-semibold">
                  {items.length} {items.length === 1 ? 'Item' : 'Items'}
                </span>
              </div>

              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-theme-text/5 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium text-theme-text text-sm leading-tight">{item.name}</h3>
                      <p className="text-xs text-theme-text opacity-50">Quantity: {item.quantity}</p>
                      <p className="text-sm font-medium text-theme-text">${parseFloat(item.price.replace('$', '')).toFixed(0)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-theme-text/10">
                <div className="flex justify-between text-sm">
                  <span className="text-theme-text opacity-60">Subtotal</span>
                  <span className="text-theme-text font-medium">${subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-theme-text opacity-60">Shipping</span>
                  <span className="text-theme-text font-medium">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(0)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-theme-text opacity-60">Estimated Tax</span>
                  <span className="text-theme-text font-medium">${tax.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-4 border-t border-theme-text/10">
                  <span className="text-theme-text">Total</span>
                  <span className="text-theme-text">${total.toFixed(0)}</span>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 p-4 bg-brand-charcoal/5 rounded-2xl">
                  <Truck className="w-5 h-5 text-brand-taupe" />
                  <div>
                    <p className="text-xs font-medium text-theme-text">Express Delivery</p>
                    <p className="text-[10px] text-theme-text opacity-40">Expected arrival: 2-3 business days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-brand-charcoal/5 rounded-2xl">
                  <ShieldCheck className="w-5 h-5 text-brand-taupe" />
                  <div>
                    <p className="text-xs font-medium text-theme-text">Premium Protection</p>
                    <p className="text-[10px] text-theme-text opacity-40">Insured shipping and easy returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
