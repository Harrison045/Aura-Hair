import { motion } from 'motion/react';
import { Leaf, Droplets, Sparkles } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: 'Rooted in Nature',
    description: 'Plant-based ingredients sourced responsibly from West Africa and beyond.',
  },
  {
    icon: Droplets,
    title: 'Deeply Nourishing',
    description: 'Formulas designed to hydrate, protect, and restore your natural moisture barrier.',
  },
  {
    icon: Sparkles,
    title: 'For Every Texture',
    description: 'Whether coily, curly, wavy, or straight—we celebrate your unique crown.',
  },
];

export default function Values() {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-beige">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-brand-rose/50 flex items-center justify-center mb-6 text-brand-charcoal group-hover:bg-brand-taupe transition-colors duration-500">
                <value.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium mb-3">{value.title}</h3>
              <p className="text-brand-charcoal/70 leading-relaxed max-w-sm">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
