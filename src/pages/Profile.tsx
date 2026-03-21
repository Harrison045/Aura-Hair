import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Package, LogOut, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-12"
      >
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-brand-charcoal/5">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-brand-taupe/10 rounded-full flex items-center justify-center mb-6">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-brand-taupe" />
                )}
              </div>
              <h1 className="text-2xl font-medium text-brand-charcoal mb-1">
                {user.displayName || 'Aura Guest'}
              </h1>
              <p className="text-brand-charcoal/50 text-sm font-light mb-6 flex items-center justify-center gap-2">
                <Mail className="w-3 h-3" />
                {user.email}
              </p>
              
              <div className="w-full pt-6 border-t border-brand-charcoal/5 flex flex-col gap-3">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 h-12 rounded-full border border-brand-charcoal/10 text-brand-charcoal hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          <div className="bg-brand-charcoal rounded-3xl p-8 text-white">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-taupe" />
              Member Benefits
            </h3>
            <ul className="space-y-4 text-sm font-light text-white/70">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-taupe mt-1.5 shrink-0" />
                Exclusive access to hair care guides
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-taupe mt-1.5 shrink-0" />
                Early notifications for product drops
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-taupe mt-1.5 shrink-0" />
                Personalized product recommendations
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-12">
          {/* Recent Orders */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-medium text-brand-charcoal flex items-center gap-3">
                <Package className="w-7 h-7 text-brand-taupe" />
                Your Orders
              </h2>
            </div>

            <div className="bg-white rounded-3xl p-10 border border-brand-charcoal/5 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-theme-bg/5 rounded-full flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-brand-charcoal/20" />
              </div>
              <h3 className="text-xl font-medium text-brand-charcoal mb-2">No orders yet</h3>
              <p className="text-brand-charcoal/50 font-light max-w-xs mb-8">
                Your future hair rituals will appear here. Start your journey in our shop.
              </p>
              <button 
                onClick={() => navigate('/shop')}
                className="bg-brand-charcoal text-white px-8 h-12 rounded-full font-medium hover:bg-brand-charcoal/90 transition-all active:scale-[0.98]"
              >
                Go to Shop
              </button>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
