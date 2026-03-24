import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-charcoal overflow-hidden"
        >
          {/* Background Gradient Orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-taupe/20 blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-brand-rose/10 blur-[100px]"
          />

          <div className="relative flex flex-col items-center">
            {/* Logo/Icon Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-brand-taupe to-brand-rose flex items-center justify-center shadow-2xl shadow-brand-taupe/20">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              
              {/* Outer Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-15px] border-2 border-dashed border-brand-taupe/30 rounded-full"
              />
            </motion.div>

            {/* Branding */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-12 text-center"
            >
              <h1 className="text-3xl font-light tracking-[0.2em] text-white uppercase">
                Aura <span className="text-brand-taupe font-medium">Hair</span>
              </h1>
              
              {/* Progress Bar Container */}
              <div className="mt-8 h-[2px] w-48 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-taupe to-transparent w-full h-full"
                />
              </div>
              
              <p className="mt-4 text-[10px] font-medium tracking-[0.3em] text-white/30 uppercase">
                Curating Elegance
              </p>
            </motion.div>
          </div>

          {/* Bottom Branding */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 flex items-center gap-3"
          >
            <div className="h-[1px] w-8 bg-white/10" />
            <span className="text-[10px] tracking-[0.4em] text-white/20 uppercase">Est. 2024</span>
            <div className="h-[1px] w-8 bg-white/10" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
