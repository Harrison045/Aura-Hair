import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CalmModeContext } from '../App';
import { Moon, Sun } from 'lucide-react';

export default function Footer() {
  const { calmMode, toggleCalmMode } = useContext(CalmModeContext);

  const handleToggle = () => {
    console.log('Footer: Toggling Calm Mode...');
    toggleCalmMode();
  };

  return (
    <footer className={`bg-brand-charcoal text-brand-beige pt-20 pb-10 px-6 md:px-12 theme-transition ${calmMode ? 'brightness-110' : ''}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Aura</h2>
            <p className="text-brand-beige/70 max-w-sm mb-8">
              Premium, natural hair-care designed to nourish every texture. Find your calm, find your routine.
            </p>
            
            <form className="flex gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Join our newsletter" 
                className="flex-1 bg-transparent border-b border-brand-beige/30 py-2 px-0 text-brand-beige placeholder:text-brand-beige/50 focus:outline-none focus:border-brand-beige transition-colors"
              />
              <button type="submit" className="text-sm font-medium uppercase tracking-wider hover:text-brand-taupe transition-colors">
                Subscribe
              </button>
            </form>
          </div>
          
          <div>
            <h3 className="font-medium mb-6 text-brand-taupe">Shop</h3>
            <ul className="space-y-4 text-brand-beige/70">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shampoos & Cleansers</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Conditioners & Masks</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Oils & Serums</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-6 text-brand-taupe">About</h3>
            <ul className="space-y-4 text-brand-beige/70">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Ingredients</Link></li>
              <li><Link to="/journal" className="hover:text-white transition-colors">Journal</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-brand-beige/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-brand-beige/50 text-sm">
            © {new Date().getFullYear()} Aura Haircare. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={handleToggle}
              className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full border transition-all duration-500 ${
                calmMode 
                  ? 'bg-brand-taupe text-brand-charcoal border-brand-taupe' 
                  : 'text-brand-beige/70 hover:text-white border-brand-beige/20 hover:border-brand-beige'
              }`}
              title="Toggle Calm Mode (Reduces motion and contrast)"
            >
              {calmMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>{calmMode ? 'Standard Mode' : 'Calm Mode'}</span>
            </button>
            <div className="flex gap-4 text-brand-beige/50 text-sm">
              <Link to="/" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
