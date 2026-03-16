import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "The Ultimate Guide to Porosity",
    excerpt: "Understanding how your hair absorbs and retains moisture is the key to unlocking your perfect routine.",
    category: "Education",
    date: "Oct 12, 2023",
    image: "https://images.unsplash.com/photo-1527736947477-2790ca3cb392?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Protective Styling 101",
    excerpt: "How to prep your natural hair before installing braids, twists, or our premium wigs to ensure maximum growth.",
    category: "Styling",
    date: "Nov 05, 2023",
    image: "https://images.unsplash.com/photo-1595426998912-308112224097?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Ingredient Spotlight: Baobab Oil",
    excerpt: "Discover why this 'Tree of Life' extract is the secret weapon in our Deep Moisture Mask.",
    category: "Ingredients",
    date: "Dec 18, 2023",
    image: "https://images.unsplash.com/photo-1615397323754-06788a100523?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Wash Day Rituals for Coily Hair",
    excerpt: "Turn your wash day from a chore into a luxurious self-care experience with these 5 simple steps.",
    category: "Routines",
    date: "Jan 22, 2024",
    image: "https://images.unsplash.com/photo-1584297092960-5d6664214b6c?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Journal() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl md:text-6xl font-light mb-6">The Journal</h1>
        <p className="text-lg text-brand-charcoal/70 max-w-2xl mx-auto">
          Expert advice, styling tutorials, and stories from the Aura community.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {articles.map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group cursor-pointer flex flex-col"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                {article.category}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-brand-charcoal/50 mb-3">
              <span>{article.date}</span>
            </div>
            
            <h2 className="text-2xl font-medium mb-3 group-hover:text-brand-taupe transition-colors duration-300">
              {article.title}
            </h2>
            
            <p className="text-brand-charcoal/70 mb-6 flex-grow">
              {article.excerpt}
            </p>
            
            <div className="flex items-center gap-2 text-sm font-medium mt-auto">
              Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
