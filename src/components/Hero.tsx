import { motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [muted, setMuted] = useState(true);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-charcoal">
      {/* Background Image simulating a slow-pan video for reliability and quality */}
      <motion.img
        src="https://images.unsplash.com/photo-1605980776566-0486c3ac7617?q=80&w=2000&auto=format&fit=crop"
        alt="Woman with beautiful natural hair"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        animate={{ scale: [1, 1.08] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-brand-beige/90" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 max-w-4xl mx-auto pt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl font-light text-white tracking-tight mb-6"
        >
          Healthy hair that <br className="hidden md:block" /> feels like you.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl text-white/90 font-light mb-10 max-w-xl"
        >
          Premium 100% virgin hair, extensions, and gentle formulas crafted for every style.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <a 
            href="#hair-quiz"
            className="inline-block bg-white text-brand-charcoal px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-brand-rose hover:text-brand-charcoal transition-colors duration-300 shadow-lg shadow-black/10"
          >
            Discover Your Routine
          </a>
        </motion.div>
      </div>

      {/* Sound Toggle (Decorative/Functional if video is added later) */}
      <button 
        onClick={() => setMuted(!muted)}
        className="absolute bottom-8 right-8 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Toggle sound"
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </section>
  );
}
