export interface BlogPost {
  id: number
  image: string
  title: string
  excerpt: string
  date: string
  category: string
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    image: '/assets/blog-1.png',
    title: 'The Science Behind Scalp Health',
    excerpt: 'Understanding why a healthy scalp is the foundation for beautiful hair and how our formulas target the root cause.',
    date: 'Jan 15, 2026',
    category: 'Science',
    featured: true,
  },
  {
    id: 2,
    image: '/assets/blog-2.png',
    title: 'How to Build the Perfect Hair Routine',
    excerpt: 'A step-by-step guide to creating a personalized haircare regimen that actually works for your specific needs.',
    date: 'Jan 10, 2026',
    category: 'Guide',
  },
  {
    id: 3,
    image: '/assets/blog-3.png',
    title: 'Clean Ingredients That Actually Work',
    excerpt: 'Breaking down the key ingredients in our formulas and the science that makes them so effective.',
    date: 'Jan 5, 2026',
    category: 'Ingredients',
  },
]
