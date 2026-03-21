import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { user, setIsAuthModalOpen } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Hair Quiz', path: '/quiz' },
    { name: 'About', path: '/about' },
    { name: 'Journal', path: '/journal' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-theme-bg/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-brand-charcoal"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6 text-brand-charcoal" />
        </button>

        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-semibold tracking-tight text-brand-charcoal transition-colors duration-500"
        >
          Aura
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium tracking-wide text-brand-charcoal transition-colors duration-300 hover:opacity-70"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Auth Icon */}
          <button 
            onClick={() => user ? navigate('/profile') : setIsAuthModalOpen(true)}
            className="text-brand-charcoal transition-colors duration-500 hover:opacity-70 group flex items-center gap-2"
          >
            <div className="relative">
              <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              {user && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white" />
              )}
            </div>
            {user ? (
              <span className="hidden md:block text-xs font-medium text-brand-charcoal/60 truncate max-w-[100px]">
                {user.displayName || user.email?.split('@')[0]}
              </span>
            ) : (
              <span className="hidden md:block text-xs font-bold uppercase tracking-widest">Login</span>
            )}
          </button>

          {/* Cart Icon */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative text-brand-charcoal transition-colors duration-500 hover:opacity-70 group"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [1.2, 0.9, 1], opacity: 1 }}
                transition={{ duration: 0.4, times: [0, 0.5, 1], ease: "easeInOut" }}
                className="absolute -top-2 -right-2 bg-brand-taupe text-brand-charcoal text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 bg-theme-bg theme-transition z-50 flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <Link to="/" className="text-2xl font-semibold text-brand-charcoal" onClick={() => setMobileMenuOpen(false)}>
                Aura
              </Link>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-brand-charcoal" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium text-brand-charcoal"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
