export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  longDescription: string;
  image: string;
  badge?: string;
  benefits: string[];
  usage: string;
}

export const products: Product[] = [
  {
    id: 'shampoo-01',
    name: 'Clarifying Shampoo',
    category: 'Cleanse',
    price: '$32.00',
    description: 'Deeply cleanses without stripping natural oils.',
    longDescription: 'Our signature clarifying formula utilizes micellar technology and fermented rice water to gently lift impurities while maintaining the delicate balance of your scalp microbiome. Perfect for removing product buildup and hard water minerals.',
    image: '/assets/product-hero.png',
    badge: 'Best Seller',
    benefits: ['Scalp Balancing', 'Pollution Protection', 'Color Safe'],
    usage: 'Massage into wet hair, focusing on the scalp. Rinse thoroughly with cool water.',
  },
  {
    id: 'conditioner-01',
    name: 'Silk Conditioner',
    category: 'Condition',
    price: '$34.00',
    description: 'Weightless hydration for ultimate shine.',
    longDescription: 'A revolutionary weightless formula that mimics the natural lipids of your hair. Infused with vegan silk proteins and cold-pressed argan oil, it detangles instantly and provides a glass-like finish without the use of silicones.',
    image: '/assets/product-conditioner.png',
    benefits: ['Frizz Control', 'UV Protection', 'Deep Hydration'],
    usage: 'Apply from mid-lengths to ends. Leave for 3 minutes before rinsing.',
  },
  {
    id: 'mask-01',
    name: 'Repair Mask',
    category: 'Treat',
    price: '$48.00',
    description: 'Intensive bond-building treatment.',
    longDescription: 'A high-potency treatment designed to reconstruct broken keratin bonds from within. Utilizing our patented peptide complex, it reverses damage from heat, color, and chemical processing in a single use.',
    image: '/assets/product-mask.png',
    badge: 'New Arrival',
    benefits: ['Bond Building', 'Heat Protection', 'Breakage Control'],
    usage: 'Use once weekly on damp hair. Leave for 10-15 minutes for maximum results.',
  },
  {
    id: 'serum-01',
    name: 'Glow Serum',
    category: 'Finish',
    price: '$38.00',
    description: 'Finishing oil for mirror-like shine.',
    longDescription: 'A lightweight, non-greasy finishing serum that seals the cuticle and eliminates flyaways. Formulated with rare desert botanical oils that absorb instantly to provide long-lasting radiance.',
    image: '/assets/product-serum.png',
    benefits: ['Gloss Finish', 'Split End Sealing', 'Humidity Resistance'],
    usage: 'Apply 1-2 drops to dry hair to tame frizz and add shine.',
  },
  {
    id: 'scrub-01',
    name: 'Scalp Scrub',
    category: 'Exfoliate',
    price: '$42.00',
    description: 'Detoxifying salt-to-foam scrub.',
    longDescription: 'A stimulating treatment that combines physical sea salt exfoliation with chemical AHA/BHA acids to remove dead skin cells and promote healthy hair growth at the root.',
    image: '/assets/product-scrub.png',
    benefits: ['Deep Detox', 'Root Stimulation', 'Zero Residue'],
    usage: 'Use in place of shampoo once a week. Massage into scalp and rinse.',
  },
  {
    id: 'oil-01',
    name: 'Nourishing Oil',
    category: 'Treat',
    price: '$54.00',
    description: 'Ancient oils meet modern science.',
    longDescription: 'A 100% natural blend of 12 ancient botanical oils including Marula, Camellia, and Baobab. Designed for pre-wash treatments or deep overnight nourishment.',
    image: '/assets/product-oil.png',
    benefits: ['Elasticity Boost', 'Scalp Nutrition', 'Vitamin Rich'],
    usage: 'Apply generously to dry hair before washing, or use as an overnight treatment.',
  },
  {
    id: 'spray-01',
    name: 'Volume Spray',
    category: 'Style',
    price: '$28.00',
    description: 'Incredible lift that lasts all day.',
    longDescription: 'A polymer-free volumizing mist that uses plant-based starches to provide structural lift at the roots without any stiffness or sticky residue.',
    image: '/assets/product-spray.png',
    benefits: ['Root Lift', 'Texture Building', 'Zero Weight'],
    usage: 'Spray onto damp roots before blow-drying for maximum volume.',
  },
  {
    id: 'serum-night-01',
    name: 'Night Serum',
    category: 'Treat',
    price: '$62.00',
    description: 'Wake up to transformed hair.',
    longDescription: 'An overnight restorative treatment that utilizes the body\'s natural circadian rhythm to repair damage. It infuses the hair with hyaluronic acid while you sleep.',
    image: '/assets/product-night-serum.png',
    badge: 'Limited Edition',
    benefits: ['Overnight Repair', 'Intense Moisture', 'Anti-Breakage'],
    usage: 'Apply to dry hair before bed. No need to rinse in the morning.',
  },
  {
    id: 'kit-01',
    name: 'Discovery Kit',
    category: 'Kits',
    price: '$45.00',
    description: 'The complete dobby experience.',
    longDescription: 'A curated collection of our best-selling formulas in travel-ready sizes. Perfect for trialing the dobby system or taking your routine on the go.',
    image: '/assets/product-travel-kit.png',
    benefits: ['Travel Friendly', 'The Full Routine', 'Value Set'],
    usage: 'Refer to individual product instructions included in the kit.',
  },
];
