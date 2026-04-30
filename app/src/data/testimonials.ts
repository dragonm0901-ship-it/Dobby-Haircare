export interface Testimonial {
  id: number
  name: string
  role: string
  quote: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sophia Chen',
    role: 'Beauty Editor',
    quote: 'dobby has completely transformed my hair routine. The Clarify Shampoo is unlike anything I\'ve used — my scalp has never felt this healthy.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Rivera',
    role: 'Creative Director',
    quote: 'I was skeptical about premium haircare, but dobby delivered. The difference after just two weeks was remarkable. Worth every penny.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Amara Johnson',
    role: 'Model',
    quote: 'The Repair Hair Mask is my secret weapon before every shoot. My hair has never looked this glossy and full of life.',
    rating: 5,
  },
  {
    id: 4,
    name: 'James Whitfield',
    role: 'Entrepreneur',
    quote: 'Finally, a haircare brand that understands science AND results. The Scalp Serum has been a game-changer for my thinning hair.',
    rating: 5,
  },
]
