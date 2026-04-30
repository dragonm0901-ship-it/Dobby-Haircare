import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import Navbar from '@/components/Navbar'
import Footer from '@/sections/Footer'
import GrainOverlay from '@/components/GrainOverlay'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function ShopPage() {
  const { addToCart } = useCart()
  const headerRef = useRef<HTMLDivElement>(null)

  useSmoothScroll()
  usePageMeta({
    title: 'Shop All Products — dobby Haircare',
    description: 'Explore the complete dobby haircare collection. From clarifying shampoos to nourishing serums, every formula is engineered for clinical performance.',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      })

      gsap.from('.shop-card', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.4,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="relative bg-bg min-h-screen">
      <GrainOverlay />
      <Navbar />

      {/* Header Area */}
      <div className="pt-24 sm:pt-32 lg:pt-48 pb-12 sm:pb-20">
        <div className="section-container">
          <div ref={headerRef} className="max-w-4xl">
            <span className="section-label mb-4 sm:mb-6">Discovery</span>
            <h1 className="text-[2.5rem] sm:text-8xl lg:text-[10vw] font-black uppercase leading-[0.85] tracking-tighter mb-5 sm:mb-8">
              The Full
              <br />
              <span className="text-purple">Collection</span>
            </h1>
            <p className="text-base sm:text-xl text-grey-400 max-w-xl leading-relaxed">
              Explore the complete dobby ecosystem. From root to tip, every formula is engineered for clinical performance.
            </p>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="section-container pb-20 sm:pb-32">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-6 sm:gap-x-8 sm:gap-y-12">
          {products.map((product) => (
            <div key={product.id} className="shop-card">
              <Link to={`/product/${product.id}`}>
                <ProductCard
                  image={product.image}
                  title={product.name}
                  price={product.price}
                  description={product.description}
                  badge={product.badge}
                  onAddToCart={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
