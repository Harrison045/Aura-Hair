import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl md:text-6xl font-light mb-6">Our Story</h1>
        <p className="text-lg text-brand-charcoal/70 max-w-2xl mx-auto">
          Born from a desire to celebrate every texture, Aura is more than hair care. It's a return to your roots.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="aspect-[4/5] rounded-2xl overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1554744512-d6c603f27c54?q=80&w=1000&auto=format&fit=crop" 
            alt="Founder mixing ingredients" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-medium">The Aura Philosophy</h2>
          <p className="text-brand-charcoal/80 leading-relaxed">
            For too long, the beauty industry has treated textured hair as a problem to be solved. At Aura, we believe your natural texture is a canvas to be celebrated.
          </p>
          <p className="text-brand-charcoal/80 leading-relaxed">
            We source our core ingredients—like raw shea, baobab oil, and aloe—directly from sustainable cooperatives in West Africa. Every formula is meticulously crafted to hydrate, protect, and enhance, without the use of harsh sulfates, parabens, or silicones.
          </p>
          <p className="text-brand-charcoal/80 leading-relaxed">
            Whether you wear your hair in a protective style, a wash-and-go, or sleek and straight, our premium extensions and nourishing care products are designed to seamlessly integrate into your lifestyle.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-brand-sage/20 rounded-3xl p-12 text-center"
      >
        <h2 className="text-3xl font-medium mb-8">The Aura Promise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-2">100% Vegan</h3>
            <p className="text-brand-charcoal/70">Cruelty-free and plant-powered formulas.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Ethically Sourced</h3>
            <p className="text-brand-charcoal/70">Fair-trade ingredients and premium virgin hair.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Texture Inclusive</h3>
            <p className="text-brand-charcoal/70">Tested on and formulated for Types 1 through 4C.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
