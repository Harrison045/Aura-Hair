import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CalmModeContext } from '../App';

export default function Hero() {
  const { calmMode } = useContext(CalmModeContext);

  return (
    <section className="relative min-h-screen w-full bg-theme-bg theme-transition pt-32 pb-16 px-6 md:px-12 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Content */}
        <div className="order-2 lg:order-1 flex flex-col justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight text-theme-text mb-6">
              Your crown, <br />
              <span className="text-brand-taupe italic font-light">uncompromised.</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-theme-text opacity-70 font-light mb-10 max-w-lg leading-relaxed"
          >
            Premium 100% virgin hair, extensions, and gentle formulas crafted to celebrate every texture and style.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              to="/shop"
              className="inline-flex items-center justify-center gap-2 bg-theme-text text-theme-bg px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-brand-taupe hover:text-theme-text transition-all duration-300"
            >
              Shop Collection <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/quiz"
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-theme-text/20 text-theme-text px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:border-theme-text transition-all duration-300"
            >
              Take the Hair Quiz
            </Link>
          </motion.div>

          {/* Mini Stats/Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 pt-8 border-t border-theme-text/10 grid grid-cols-3 gap-6"
          >
            <div>
              <p className="text-2xl font-medium text-theme-text transition-colors">100%</p>
              <p className="text-xs text-theme-text opacity-60 uppercase tracking-wider mt-1 transition-colors">Virgin Hair</p>
            </div>
            <div>
              <p className="text-2xl font-medium text-theme-text transition-colors">0%</p>
              <p className="text-xs text-theme-text opacity-60 uppercase tracking-wider mt-1 transition-colors">Sulfates</p>
            </div>
            <div>
              <p className="text-2xl font-medium text-theme-text transition-colors">4A-4C</p>
              <p className="text-xs text-theme-text opacity-60 uppercase tracking-wider mt-1 transition-colors">Specialists</p>
            </div>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="order-1 lg:order-2 relative z-10"
        >
          <div className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-theme-text/10">
            <img
              src="https://images.unsplash.com/photo-1605980776566-0486c3ac7617?q=80&w=1200&auto=format&fit=crop"
              alt="Woman with beautiful natural hair"
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-theme-text opacity-40 to-transparent transition-opacity duration-1000 ${calmMode ? 'opacity-20' : 'opacity-60'}`} />
          </div>
          
          {/* Floating Badge */}
          <motion.div 
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={`absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-[var(--bg-secondary)] theme-transition p-6 rounded-2xl shadow-xl max-w-[200px] z-20 hidden sm:block`}
          >
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-4 h-4 text-brand-taupe" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm font-medium text-theme-text leading-tight transition-colors">
              "The best bundles I've ever installed."
            </p>
            <p className="text-xs text-theme-text opacity-50 mt-2 transition-colors">— Sarah M.</p>
          </motion.div>
        </motion.div>

      </div>
      
      {/* Decorative Background Element */}
      <div className={`absolute top-0 right-0 w-[800px] h-[800px] bg-brand-rose/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 transition-opacity duration-1000 pointer-events-none ${calmMode ? 'opacity-0' : 'opacity-50'}`} />
    </section>
  );
}
