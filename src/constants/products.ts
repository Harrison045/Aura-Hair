export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  details: string[];
  tag?: string;
  isNew?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Raw Straight Bundle',
    category: 'Bundles',
    price: '$120',
    description: 'Our signature raw straight hair is sourced from a single donor, ensuring total cuticle alignment and a natural, high-shine finish that lasts for years.',
    details: ['100% Virgin Raw Hair', 'Can be bleached to #613', 'Minimum shedding & tangling', 'Each bundle is ~100g'],
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop',
    tag: 'Best Seller'
  },
  {
    id: 2,
    name: 'Nourishing Cleanser',
    category: 'Care',
    price: '$28',
    description: 'A gentle, sulfate-free cleanser infused with botanical extracts to remove buildup without stripping moisture from your extensions or natural crown.',
    details: ['Sulfate & Paraben Free', 'Infused with Aloe Vera', 'PH Balanced', 'Safe for color-treated hair'],
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Curly Lace Front Wig',
    category: 'Wigs',
    price: '$250',
    description: 'Expertly crafted with a transparent HD lace, this curly wig offers a flawless, undetectable hairline and bounce that moves with you.',
    details: ['HD Transparent Lace', '180% Density', 'Pre-plucked Hairline', 'Glueless option available'],
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=800&auto=format&fit=crop',
    tag: 'New',
    isNew: true
  },
  {
    id: 4,
    name: 'Deep Moisture Mask',
    category: 'Care',
    price: '$34',
    description: 'An intensive conditioning treatment that penetrates deep into the hair shaft to repair damage and restore elasticity to tired strands.',
    details: ['Deeply Hydrating', 'Argan Oil enriched', '20-minute treatment', 'Helps prevent split ends'],
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Body Wave Clip-ins',
    category: 'Extensions',
    price: '$145',
    description: 'The ultimate solution for instant volume and length. Our 7-piece clip-in set blends seamlessly with your natural hair for a glam look in minutes.',
    details: ['7-Piece Set', 'Secure rubber-backed clips', 'Premium Remy Hair', 'Heat-friendly styling'],
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Botanical Hair Oil',
    category: 'Care',
    price: '$42',
    description: 'A lightweight blend of Jojoba, Sweet Almond, and Rosemary oils designed to seal in moisture and add a glass-like shine without the weight.',
    details: ['Non-greasy formula', 'Promotes scalp health', 'Locks in hydration', 'Natural citrus scent'],
    image: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'Afro Kinky Bulk Hair',
    category: 'Bundles',
    price: '$85',
    description: 'Perfect for braids, twists, or creating custom extensions. This 100% human hair matches Type 4 textures perfectly for an effortless, natural look.',
    details: ['100% Human Hair', 'Perfect for Type 4C', 'Can be dyed/lifted', 'Tangle-free braiding'],
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 8,
    name: 'Leave-In Conditioner',
    category: 'Care',
    price: '$30',
    description: 'A daily moisture milk that detangles on contact and provides a protective barrier against heat styling and environmental stressors.',
    details: ['Lightweight formula', 'Heat protectant', 'UV Filters', 'Detangles instantly'],
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 9,
    name: 'Pre-Stretched Braiding Hair',
    category: 'Extensions',
    price: '$24',
    description: 'Ultra-lightweight and itch-free braiding hair that comes pre-stretched for a faster, easier braiding experience and a natural tapered look.',
    details: ['Itch-Free Fiber', 'Hot water set compatible', 'Pre-stretched for natural ends', '3 bundles per pack'],
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 10,
    name: 'Coily Drawstring Ponytail',
    category: 'Extensions',
    price: '$65',
    description: 'Transform your look in seconds with our high-density coily ponytail. Features a secure drawstring and combs for a reliable fit all day.',
    details: ['Secure Drawstring & Combs', 'Matches Type 4A-4B', 'Heat-friendly synthetic blend', 'Instant volume and length'],
    image: 'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?q=80&w=800&auto=format&fit=crop',
  }
];

export interface LookbookItem {
  id: string;
  src: string;
  alt: string;
  aspect: string;
  caption: string;
  product: string;
  price: string;
  category: string;
}

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  { id: 'look1', src: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=800&auto=format&fit=crop', alt: 'Afro hair', aspect: 'aspect-[3/4]', caption: '@sarah_styles • Type 4C', product: 'Afro Kinky Bulk Hair', price: '$85', category: 'Bundles' },
  { id: 'look2', src: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop', alt: 'Braids', aspect: 'aspect-square', caption: '@braidmagic • Protective Style', product: 'Pre-Stretched Braiding Hair', price: '$24', category: 'Extensions' },
  { id: 'look3', src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop', alt: 'Curls', aspect: 'aspect-[4/5]', caption: '@curly.j • Type 3B', product: 'Curly Lace Front Wig', price: '$250', category: 'Wigs' },
  { id: 'look4', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop', alt: 'Wavy hair', aspect: 'aspect-square', caption: '@wavy_days • Type 2A', product: 'Body Wave Clip-ins', price: '$145', category: 'Extensions' },
  { id: 'look5', src: 'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?q=80&w=800&auto=format&fit=crop', alt: 'Coily hair', aspect: 'aspect-[3/4]', caption: '@natural.crown • Type 4A', product: 'Coily Drawstring Ponytail', price: '$65', category: 'Extensions' },
  { id: 'look6', src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop', alt: 'Straight hair', aspect: 'aspect-[4/5]', caption: '@sleek_looks • Type 1', product: 'Raw Straight Bundle', price: '$120', category: 'Bundles' },
];
