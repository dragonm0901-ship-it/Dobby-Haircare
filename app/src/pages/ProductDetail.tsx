import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import gsap from 'gsap'
import Navbar from '@/components/Navbar'
import Footer from '@/sections/Footer'
import GrainOverlay from '@/components/GrainOverlay'
import { products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const product = products.find(p => p.id === id)
  
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useSmoothScroll()
  usePageMeta({
    title: product ? `${product.name} — dobby Haircare` : 'Product Not Found — dobby Haircare',
    description: product?.description ?? 'The product you are looking for could not be found.',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    
    if (!product) return

    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
      })

      gsap.from('.reveal-text', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3,
      })

      gsap.from('.benefit-item', {
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.8,
      })
    })

    return () => ctx.revert()
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <Navbar />
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">Product Not Found</h2>
          <Link to="/shop" className="text-purple font-bold hover:underline">Return to Shop</Link>
        </div>
      </div>
    )
  }

  return (
    <main className="relative bg-bg min-h-screen">
      <GrainOverlay />
      <Navbar />

      <div className="pt-24 sm:pt-32 lg:pt-48 pb-20 sm:pb-32">
        <div className="section-container">
          {/* Back Button */}
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-purple transition-colors mb-8 sm:mb-12"
          >
            <ArrowLeft size={14} />
            Back to Collection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-start">
            {/* Image Gallery */}
            <div ref={imageRef} className="relative aspect-[4/5] bg-grey-100 rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center p-6 sm:p-12">
              <img 
                src={product.image} 
                alt={product.name}
                loading="lazy"
                width={600}
                height={750}
                className="w-full h-full object-contain"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
                  <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-purple text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-full">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div ref={contentRef}>
              <div className="reveal-text">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-purple mb-3 sm:mb-4 block">
                  {product.category}
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-4 sm:mb-6">
                  {product.name}
                </h1>
                <div className="text-2xl sm:text-3xl font-black text-purple mb-6 sm:mb-8">
                  {product.price}
                </div>
              </div>

              <div className="reveal-text space-y-6 sm:space-y-8 mb-8 sm:mb-12">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-black/20">The Formula</h3>
                  <p className="text-base sm:text-xl text-black/70 leading-relaxed italic">
                    {product.longDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-black/20">Ritual</h3>
                    <p className="text-xs sm:text-sm text-grey-400 leading-relaxed">
                      {product.usage}
                    </p>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-black/20">Clinical Benefits</h3>
                    <div className="space-y-1.5 sm:space-y-2">
                      {product.benefits.map((benefit) => (
                        <div key={benefit} className="benefit-item flex items-center gap-2 text-xs sm:text-sm font-bold text-black/60">
                          <CheckCircle2 size={14} className="text-purple flex-shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="reveal-text">
                <button 
                  onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                  className="w-full py-4 sm:py-6 bg-black text-white text-xs sm:text-sm font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] rounded-full hover:bg-purple transition-all duration-500 active:scale-95 shadow-xl shadow-black/10"
                >
                  Add to Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Section could go here */}

      <Footer />
    </main>
  )
}
