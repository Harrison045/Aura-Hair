import { motion } from 'motion/react';
import { ArrowRight, Leaf, Droplets, Sparkles, Globe, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-theme-bg theme-transition">
      {/* Immersive Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="file:///C:/Users/odame/.gemini/antigravity/brain/3348e1b4-50d9-41e6-a58f-9014e19fe584/about_hero_v3_1773671848998.png" 
            alt="Premium portrait" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-charcoal/30 backdrop-blur-[2px]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-white/80 uppercase tracking-[0.3em] text-xs mb-4 block">Established 2023</span>
            <h1 className="text-5xl md:text-8xl font-light text-white mb-8 tracking-tight">
              Our <span className="italic font-serif">Story</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              Born from a desire to celebrate every texture, Aura is more than hair care. 
              It's a return to your roots and a celebration of your crown.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-32">
        {/* Heritage Section - Staggered Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl">
              <img 
                src="file:///C:/Users/odame/.gemini/antigravity/brain/3348e1b4-50d9-41e6-a58f-9014e19fe584/sourcing_v2_1773672083619.png" 
                alt="Sustainable sourcing" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-rose/20 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-brand-sage/20 rounded-full blur-3xl opacity-50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 text-brand-taupe uppercase tracking-widest text-xs font-semibold">
              <Globe className="w-4 h-4" />
              West African Heritage
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-theme-text leading-tight">
              Honoring the <br />
              <span className="italic font-serif">Original</span> Source
            </h2>
            <div className="space-y-6 text-theme-text opacity-80 leading-relaxed text-lg font-light">
              <p>
                The secret to truly healthy hair lies in the ingredients provided by the earth. At Aura, we go direct to the source, working with ethical cooperatives in West Africa.
              </p>
              <p>
                From the hand-pressed shea butter of Ghana to the nutrient-rich baobab oil of Senegal, every ingredient in our formulas is chosen for its ancient healing properties and modern effectiveness.
              </p>
              <p className="border-l-2 border-brand-rose pl-6 italic">
                "We don't just make products; we preserve traditions that have been passed down for generations."
              </p>
            </div>
          </motion.div>
        </div>

        {/* The Process Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:order-2 relative"
          >
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl">
              <img 
                src="file:///C:/Users/odame/.gemini/antigravity/brain/3348e1b4-50d9-41e6-a58f-9014e19fe584/process_v3_1773672481768.png" 
                alt="Artisanal process" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:order-1 space-y-8"
          >
            <div className="inline-flex items-center gap-2 text-brand-taupe uppercase tracking-widest text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              Artisanal Science
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-theme-text leading-tight">
              Crafted with <br />
              <span className="italic font-serif">Intention</span>
            </h2>
            <div className="space-y-6 text-theme-text opacity-80 leading-relaxed text-lg font-light">
              <p>
                Every Aura formula is developed in small batches to ensure the highest concentration of active nutrients. We bridge the gap between traditional wisdom and modern hair science.
              </p>
              <p>
                Our testing phase involves real women with every texture type—from 1 to 4C. If it doesn't nourish the tightest coils, it doesn't make the cut.
              </p>
              <div className="flex gap-4 pt-4">
                <Link 
                  to="/quiz"
                  className="inline-flex items-center gap-2 bg-theme-text text-theme-bg px-8 py-4 rounded-full text-sm font-medium hover:bg-brand-taupe hover:text-theme-text transition-all duration-300"
                >
                  Find Your Formula <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* The Aura Promise - Redesigned Cards */}
        <div className="bg-theme-text text-theme-bg rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-rose opacity-10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-sage opacity-10 rounded-full blur-[100px]" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-medium mb-6">The Aura Promise</h2>
              <p className="text-theme-bg/70 max-w-xl mx-auto font-light">
                Our commitment to you, your hair, and the planet. No compromises, just results.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: Leaf, title: 'Vegan & Ethical', desc: '100% plant-powered, cruelty-free, and fairly traded ingredients.' },
                { icon: Droplets, title: 'Clean Beauty', desc: 'Formulated without sulfates, parabens, silicones, or synthetic dyes.' },
                { icon: Heart, title: 'Community Led', desc: 'Profit-sharing initiatives that support our sourcing partners in Africa.' }
              ].map((promise, idx) => (
                <motion.div
                  key={promise.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-2">
                    <promise.icon className="w-8 h-8 text-brand-rose" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium">{promise.title}</h3>
                  <p className="text-theme-bg/60 font-light leading-relaxed">
                    {promise.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
