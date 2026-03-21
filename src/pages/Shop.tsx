import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, X } from 'lucide-react';
import AddToCartButton from '../components/AddToCartButton';
import ProductModal from '../components/ProductModal';
import { PRODUCTS, LOOKBOOK_ITEMS, Product, LookbookItem } from '../constants/products';
import { useCart } from '../context/CartContext';

type SortOption = 'newest' | 'price-low' | 'price-high';
type Category = 'All' | 'Bundles' | 'Care' | 'Wigs' | 'Extensions';

type GridItem = 
  | ({ gridType: 'product' } & Product)
  | ({ gridType: 'lifestyle' } & LookbookItem);

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedLook, setSelectedLook] = useState<LookbookItem | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useCart();

  const categories: Category[] = ['All', 'Bundles', 'Care', 'Wigs', 'Extensions'];

  const unifiedItems = useMemo(() => {
    // 1. Filter Products
    let filteredProducts = [...PRODUCTS].map(p => ({ ...p, gridType: 'product' as const }));
    if (activeCategory !== 'All') {
      filteredProducts = filteredProducts.filter(p => p.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    // 2. Filter Lookbook
    let filteredLooks = [...LOOKBOOK_ITEMS].map(l => ({ ...l, gridType: 'lifestyle' as const }));
    if (activeCategory !== 'All') {
      filteredLooks = filteredLooks.filter(l => l.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filteredLooks = filteredLooks.filter(l => 
        l.product.toLowerCase().includes(q) || l.category.toLowerCase().includes(q) || l.caption.toLowerCase().includes(q)
      );
    }

    // 3. Sort (mainly products, but intermix)
    if (sortBy === 'price-low') {
      filteredProducts.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
    } else if (sortBy === 'price-high') {
      filteredProducts.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
    } else if (sortBy === 'newest') {
      filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    // 4. Intermix (e.g., 2 products, then 1 look)
    const result: GridItem[] = [];
    const prodCount = filteredProducts.length;
    const lookCount = filteredLooks.length;
    let pIdx = 0, lIdx = 0;

    while (pIdx < prodCount || lIdx < lookCount) {
      // Add up to 2 products
      for (let i = 0; i < 2 && pIdx < prodCount; i++) {
        result.push(filteredProducts[pIdx++]);
      }
      // Add 1 look
      if (lIdx < lookCount) {
        result.push(filteredLooks[lIdx++]);
      }
    }

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  const handleItemClick = (item: GridItem) => {
    if (item.gridType === 'lifestyle') {
      setSelectedLook(item);
    } else {
      setSelectedProduct(item);
    }
  };

  return (
    <div className="pt-32 min-h-screen bg-theme-bg theme-transition">
      {/* Header & Controls */}
      <section className="px-6 md:px-12 mb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-light text-theme-text mb-4 tracking-tight">The Archive</h1>
            <p className="text-theme-text opacity-60 max-w-xl text-lg font-light leading-relaxed">
              Explore our curation of premium bundles and botanical care, interspersed with the soul of our community.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-y border-theme-text/10 py-8">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text opacity-40" />
              <input
                type="text"
                placeholder="Search the archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-theme-text/5 border-none rounded-full py-3 pl-12 pr-6 text-sm focus:ring-1 focus:ring-brand-taupe transition-all text-theme-text placeholder:text-theme-text/30"
              />
            </div>

            <div className="hidden lg:flex items-center gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${
                    activeCategory === cat 
                      ? 'bg-theme-text text-theme-bg' 
                      : 'bg-transparent text-theme-text opacity-40 hover:opacity-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-auto">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent border-none text-xs font-bold uppercase tracking-widest focus:ring-0 cursor-pointer text-theme-text pr-8"
              >
                <option value="newest">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          <div className="lg:hidden flex overflow-x-auto gap-2 py-4 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${
                  activeCategory === cat 
                    ? 'bg-theme-text text-theme-bg' 
                    : 'bg-theme-text/5 text-theme-text opacity-60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Mixed Media Grid */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          {unifiedItems.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-theme-text opacity-40 text-2xl font-light italic">The archive is empty for this criteria.</p>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {unifiedItems.map((item, index) => (
                <motion.div
                  key={`${item.gridType}-${item.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: (index % 4) * 0.1, ease: 'easeOut' }}
                  className="break-inside-avoid"
                >
                  <div 
                    onClick={() => handleItemClick(item)}
                    className={`relative group cursor-pointer overflow-hidden rounded-2xl ${item.gridType === 'product' ? 'aspect-[4/5]' : item.aspect} bg-theme-text/5 transition-all duration-700 shadow-sm hover:shadow-xl hover:shadow-brand-charcoal/5`}
                  >
                    {/* Image */}
                    <img 
                      src={item.gridType === 'product' ? item.image : item.src} 
                      alt={item.gridType === 'product' ? item.name : item.alt} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                    />

                    {/* Badge */}
                    {item.gridType === 'product' && item.tag && (
                      <div className="absolute top-4 left-4 bg-brand-taupe text-brand-charcoal px-3 py-1 rounded-full text-[10px] uppercase tracking-tighter font-bold shadow-lg">
                        {item.tag}
                      </div>
                    )}
                    
                    {/* Lifestyle Indicator */}
                    {item.gridType === 'lifestyle' && (
                      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-tighter font-bold shadow-lg">
                        Community Look
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <div className="flex flex-col gap-1 mb-4">
                        <span className="text-[10px] text-white/60 uppercase tracking-widest font-bold">
                          {item.category}
                        </span>
                        <h3 className="text-white text-lg font-medium leading-tight">
                          {item.gridType === 'product' ? item.name : item.caption}
                        </h3>
                        <span className="text-white text-sm font-light">
                          {item.price}
                        </span>
                      </div>

                      <div onClick={(e) => e.stopPropagation()}>
                        <AddToCartButton 
                          product={item.gridType === 'product' ? {
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image
                          } : {
                            id: item.id,
                            name: item.product,
                            price: item.price,
                            image: item.src
                          }}
                          defaultText={item.gridType === 'product' ? 'Quick Add' : 'Shop This Look'}
                          className="w-full bg-white text-brand-charcoal py-3.5 rounded-full text-xs font-bold tracking-tight hover:bg-brand-taupe transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Lightbox for Lifestyle Images */}
      <AnimatePresence>
        {selectedLook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-charcoal/95 backdrop-blur-md p-4 md:p-12"
            onClick={() => setSelectedLook(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10">
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedLook.src} alt={selectedLook.alt} className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl" />
              <div className="w-full max-w-3xl mt-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/10 p-6 rounded-2xl backdrop-blur-lg border border-white/10">
                <div>
                  <h3 className="text-white text-xl md:text-2xl font-medium">{selectedLook.product}</h3>
                  <p className="text-white/70 mt-1">{selectedLook.caption}</p>
                </div>
                <AddToCartButton 
                  product={{
                    id: selectedLook.id,
                    name: selectedLook.product,
                    price: selectedLook.price,
                    image: selectedLook.src
                  }}
                  defaultText={`Add to Bag — ${selectedLook.price}`}
                  className="bg-brand-taupe text-brand-charcoal px-8 py-4 rounded-full text-sm font-bold hover:bg-white transition-colors duration-300"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
