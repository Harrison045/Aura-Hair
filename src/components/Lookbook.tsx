import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag } from 'lucide-react';
import AddToCartButton from './AddToCartButton';
import ProductModal from './ProductModal';
import { PRODUCTS, Product, LOOKBOOK_ITEMS } from '../constants/products';
import { useCart } from '../context/CartContext';

export default function Lookbook() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useCart();

  const handleProductClick = (e: React.MouseEvent, productName: string) => {
    e.stopPropagation();
    const product = PRODUCTS.find(p => p.name === productName);
    if (product) {
      setSelectedProduct(product);
    }
  };

  return (
    <section id="lookbook" className="py-24 px-6 md:px-12 bg-theme-bg theme-transition">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Shop The Look</h2>
          <p className="text-brand-charcoal/70 max-w-lg mx-auto">
            See it, love it, wear it. Shop the exact premium hair extensions and wigs worn by the Aura community.
          </p>
        </div>

        <div className="columns-2 md:columns-3 gap-4 md:gap-6">
          {LOOKBOOK_ITEMS.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: "easeOut" }}
              className={`relative overflow-hidden rounded-2xl break-inside-avoid mb-4 md:mb-6 group cursor-pointer ${img.aspect}`}
              onClick={() => handleProductClick(new MouseEvent('click') as any, img.product)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <p className="text-white/90 font-medium text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {img.caption}
                </p>
                <div className="mt-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <AddToCartButton 
                    product={{
                      id: img.id,
                      name: img.product,
                      price: img.price,
                      image: img.src
                    }}
                    defaultText={`Shop ${img.product} • ${img.price}`}
                    className="bg-white text-brand-charcoal px-5 py-2.5 rounded-full text-[10px] font-semibold w-fit hover:bg-brand-taupe"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


      <ProductModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
