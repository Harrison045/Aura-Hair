import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag } from 'lucide-react';

const images = [
  { src: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=800&auto=format&fit=crop', alt: 'Afro hair', aspect: 'aspect-[3/4]', caption: '@sarah_styles • Type 4C', product: 'Afro Kinky Bulk Hair', price: '$85' },
  { src: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop', alt: 'Braids', aspect: 'aspect-square', caption: '@braidmagic • Protective Style', product: 'Pre-Stretched Braiding Hair', price: '$24' },
  { src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop', alt: 'Curls', aspect: 'aspect-[4/5]', caption: '@curly.j • Type 3B', product: 'Curly Lace Front Wig', price: '$250' },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop', alt: 'Wavy hair', aspect: 'aspect-square', caption: '@wavy_days • Type 2A', product: 'Body Wave Clip-ins', price: '$145' },
  { src: 'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?q=80&w=800&auto=format&fit=crop', alt: 'Coily hair', aspect: 'aspect-[3/4]', caption: '@natural.crown • Type 4A', product: 'Coily Drawstring Ponytail', price: '$65' },
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop', alt: 'Straight hair', aspect: 'aspect-[4/5]', caption: '@sleek_looks • Type 1', product: 'Raw Straight Bundle', price: '$120' },
];

export default function Lookbook() {
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  const handleAddToCart = (e: React.MouseEvent, product: string) => {
    e.stopPropagation();
    alert(`Added ${product} to cart!`);
  };

  return (
    <section id="lookbook" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Shop The Look</h2>
          <p className="text-brand-charcoal/70 max-w-lg mx-auto">
            See it, love it, wear it. Shop the exact premium hair extensions and wigs worn by the Aura community.
          </p>
        </div>

        <div className="columns-2 md:columns-3 gap-4 md:gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: "easeOut" }}
              className={`relative overflow-hidden rounded-2xl break-inside-avoid mb-4 md:mb-6 group cursor-pointer ${img.aspect}`}
              onClick={() => setSelectedImage(img)}
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
                <button 
                  className="mt-3 bg-white text-brand-charcoal px-5 py-2.5 rounded-full text-xs font-semibold w-fit translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 hover:bg-brand-taupe flex items-center gap-2"
                  onClick={(e) => handleAddToCart(e, img.product)}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Shop {img.product} • {img.price}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-charcoal/95 backdrop-blur-md p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Shoppable Lightbox Footer */}
              <div className="w-full max-w-3xl mt-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/10 p-6 rounded-2xl backdrop-blur-lg border border-white/10">
                <div>
                  <h3 className="text-white text-xl md:text-2xl font-medium">{selectedImage.product}</h3>
                  <p className="text-white/70 mt-1">{selectedImage.caption}</p>
                </div>
                <button 
                  className="bg-brand-taupe text-brand-charcoal px-8 py-4 rounded-full text-sm font-bold hover:bg-white transition-colors duration-300 flex items-center gap-2 whitespace-nowrap"
                  onClick={(e) => handleAddToCart(e, selectedImage.product)}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart — {selectedImage.price}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
