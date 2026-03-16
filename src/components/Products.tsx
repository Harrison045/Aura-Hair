import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Raw Straight Bundle',
    category: 'Premium Hair',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop',
    tag: 'Best Seller'
  },
  {
    id: 2,
    name: 'Nourishing Cleanser',
    category: 'Hair Care',
    price: '$28',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Curly Lace Front Wig',
    category: 'Wigs',
    price: '$250',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=800&auto=format&fit=crop',
    tag: 'New'
  },
  {
    id: 4,
    name: 'Deep Moisture Mask',
    category: 'Hair Care',
    price: '$34',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Body Wave Clip-ins',
    category: 'Extensions',
    price: '$145',
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Botanical Hair Oil',
    category: 'Hair Care',
    price: '$42',
    image: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'Afro Kinky Bulk Hair',
    category: 'Premium Hair',
    price: '$85',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 8,
    name: 'Leave-In Conditioner',
    category: 'Hair Care',
    price: '$30',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop',
  }
];

export default function Products() {
  return (
    <section id="shop" className="py-24 px-6 md:px-12 bg-brand-beige">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">Premium Hair & Care Essentials</h2>
            <p className="text-brand-charcoal/70 max-w-md">
              Everything you need for a flawless look. From 100% virgin hair bundles to nourishing, sulfate-free formulas.
            </p>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity">
            Shop All <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4 bg-brand-rose/20">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.tag && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    {product.tag}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                  <button className="bg-white text-brand-charcoal px-6 py-3 rounded-full text-sm font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Quick Add
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-brand-charcoal/60 text-sm">{product.category}</p>
                </div>
                <span className="font-medium">{product.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <a href="#" className="inline-flex items-center gap-2 text-sm font-medium border border-brand-charcoal px-6 py-3 rounded-full">
            Shop All <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
