export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  tag?: string;
  isNew?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Raw Straight Bundle',
    category: 'Bundles',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop',
    tag: 'Best Seller'
  },
  {
    id: 2,
    name: 'Nourishing Cleanser',
    category: 'Care',
    price: '$28',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Curly Lace Front Wig',
    category: 'Wigs',
    price: '$250',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=800&auto=format&fit=crop',
    tag: 'New',
    isNew: true
  },
  {
    id: 4,
    name: 'Deep Moisture Mask',
    category: 'Care',
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
    category: 'Care',
    price: '$42',
    image: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'Afro Kinky Bulk Hair',
    category: 'Bundles',
    price: '$85',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 8,
    name: 'Leave-In Conditioner',
    category: 'Care',
    price: '$30',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop',
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
