import { Link } from 'react-router'
import ScrollReveal from '@/components/ScrollReveal'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'
import { useCart } from '@/context/CartContext'

export default function Shop() {
  const { addToCart } = useCart()
  const featuredProducts = products.slice(0, 3)

  return (
    <section id="shop" className="relative section-padding bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <ScrollReveal direction="up" className="max-w-2xl">
            <span className="section-label mb-6 inline-block">The Essentials</span>
            <h2 className="section-heading mb-6">
              Shop The
              <br />
              Lineup
            </h2>
            <p className="text-lg text-grey-400">
              Our core essentials, engineered to work together for transformative results.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            <Link 
              to="/shop"
              className="inline-block px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-purple transition-all duration-300"
            >
              View Full Collection
            </Link>
          </ScrollReveal>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, i) => (
            <ScrollReveal key={product.id} direction="up" delay={i * 0.1}>
              <Link to={`/product/${product.id}`} className="block">
                <ProductCard
                  image={product.image}
                  title={product.name}
                  price={product.price}
                  description={product.description}
                  badge={product.badge}
                  onAddToCart={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
