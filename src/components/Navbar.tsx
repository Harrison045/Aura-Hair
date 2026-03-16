import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isHome = location.pathname === '/';
  // Use dark text if we've scrolled OR if we are not on the home page (where the background is light)
  const useDarkText = scrolled || !isHome;

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
        scrolled || !isHome ? 'bg-brand-beige/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-brand-charcoal"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className={`w-6 h-6 ${useDarkText ? 'text-brand-charcoal' : 'text-white'}`} />
        </button>

        {/* Logo */}
        <Link 
          to="/" 
          className={`text-2xl font-semibold tracking-tight transition-colors duration-500 ${
            useDarkText ? 'text-brand-charcoal' : 'text-white'
          }`}
        >
          Aura
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                useDarkText ? 'text-brand-charcoal' : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Cart Icon */}
        <button className={`transition-colors duration-500 ${useDarkText ? 'text-brand-charcoal' : 'text-white'}`}>
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 bg-brand-beige z-50 flex flex-col p-6"
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
