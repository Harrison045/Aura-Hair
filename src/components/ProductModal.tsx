import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { Product } from '../constants/products';
import AddToCartButton from './AddToCartButton';
import { cn } from '../utils/cn';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-brand-charcoal hover:bg-white transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 relative bg-theme-bg/5 aspect-square md:aspect-auto">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.tag && (
                <div className="absolute top-6 left-6 bg-brand-charcoal text-white px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold">
                  {product.tag}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="mb-8">
                <span className="text-brand-taupe font-medium text-sm tracking-wider uppercase mb-2 block">
                  {product.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-medium text-brand-charcoal mb-4">
                  {product.name}
                </h2>
                <span className="text-2xl font-light text-brand-charcoal">
                  {product.price}
                </span>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-brand-charcoal/40 mb-3">
                    Description
                  </h3>
                  <p className="text-brand-charcoal/70 leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-brand-charcoal/40 mb-4">
                    Key Details
                  </h3>
                  <ul className="grid grid-cols-1 gap-3">
                    {product.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-brand-charcoal/80">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-taupe/10 flex items-center justify-center">
                          <Check className="w-3 h-3 text-brand-taupe stroke-[3px]" />
                        </div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <AddToCartButton 
                    product={product}
                    className="w-full h-14 text-base"
                    showIcon={true}
                  />
                  <p className="text-center text-[10px] text-brand-charcoal/40 mt-4 uppercase tracking-tighter">
                    Free shipping on orders over $150 • Secure Checkout
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
