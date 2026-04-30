import { useRef } from 'react'
import { ShoppingCart } from 'lucide-react'
import gsap from 'gsap'

interface ProductCardProps {
  image: string
  title: string
  price: string
  description: string
  badge?: string
  onAddToCart?: () => void
}

export default function ProductCard({
  image,
  title,
  price,
  description,
  badge,
  onAddToCart,
}: ProductCardProps) {
  const cartBtnRef = useRef<HTMLButtonElement>(null)

  const handleCartHoverEnter = () => {
    if (!cartBtnRef.current) return
    gsap.to(cartBtnRef.current, {
      scale: 1.2,
      rotation: -12,
      duration: 0.3,
      ease: 'back.out(3)',
    })
    gsap.to(cartBtnRef.current, {
      rotation: 0,
      duration: 0.6,
      delay: 0.3,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  const handleCartHoverLeave = () => {
    if (!cartBtnRef.current) return
    gsap.to(cartBtnRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.4,
      ease: 'power3.out',
    })
  }

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-heavy border border-black/[0.04]">
      {/* Image */}
      <div className="relative aspect-square sm:aspect-[3/4] bg-grey-100 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-contain p-3 sm:p-6 transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <div className="absolute top-1.5 left-1.5 sm:top-4 sm:left-4">
            <span className="px-1.5 py-0.5 sm:px-3 sm:py-1 bg-purple text-white text-[7px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full">
              {badge}
            </span>
          </div>
        )}
        <button
          ref={cartBtnRef}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddToCart?.() }}
          onMouseEnter={handleCartHoverEnter}
          onMouseLeave={handleCartHoverLeave}
          className="absolute bottom-1.5 right-1.5 sm:bottom-4 sm:right-4 w-7 h-7 sm:w-10 sm:h-10 bg-purple hover:bg-lime rounded-full flex items-center justify-center opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 max-sm:opacity-100 max-sm:translate-y-0 will-change-transform [&:hover_.cart-icon]:text-black"
        >
          <ShoppingCart className="cart-icon w-3 h-3 sm:w-[18px] sm:h-[18px] text-white transition-colors duration-300" />
        </button>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-5">
        <h3 className="text-[10px] sm:text-lg font-bold text-black mb-0 sm:mb-1 leading-tight truncate">{title}</h3>
        <p className="text-[8px] sm:text-sm text-grey-400 mb-1 sm:mb-3 line-clamp-1 sm:line-clamp-2 hidden sm:block">{description}</p>
        <span className="text-xs sm:text-xl font-black text-purple">{price}</span>
      </div>
    </div>
  )
}
