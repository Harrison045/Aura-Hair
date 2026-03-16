import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product, PRODUCTS } from '../constants/products';
import { Link } from 'react-router-dom';

interface ProductsProps {
  items?: Product[];
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
}

export default function Products({ 
  items = PRODUCTS.slice(0, 8), 
  title = "Premium Hair & Care Essentials",
  subtitle = "Everything you need for a flawless look. From 100% virgin hair bundles to nourishing, sulfate-free formulas.",
  showViewAll = true
}: ProductsProps) {
  const { addItem } = useCart();

  return (
    <section id="shop" className="py-24 px-6 md:px-12 bg-theme-bg theme-transition">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium mb-4 text-theme-text">{title}</h2>
            <p className="text-theme-text opacity-70 max-w-md">
              {subtitle}
            </p>
          </div>
          {showViewAll && (
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity text-theme-text">
              Shop All <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-theme-text opacity-50 text-xl font-light italic">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4 bg-theme-text/5">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.tag && (
                    <div className="absolute top-4 left-4 bg-theme-bg/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-theme-text border border-theme-text/10">
                      {product.tag}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 p-4">
                    <button 
                      onClick={() => addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image
                      })}
                      className="w-full bg-white text-brand-charcoal py-3 rounded-full text-sm font-medium shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Bag
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg text-theme-text">{product.name}</h3>
                    <p className="text-theme-text opacity-50 text-sm italic">{product.category}</p>
                  </div>
                  <span className="font-medium text-theme-text">{product.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {showViewAll && (
          <div className="mt-12 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium border border-theme-text/20 text-theme-text px-8 py-3 rounded-full">
              Shop All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
