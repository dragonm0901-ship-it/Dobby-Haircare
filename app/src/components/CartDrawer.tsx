import { useEffect, useRef } from 'react'
import { X, Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import gsap from 'gsap'

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()
  const drawerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return

    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3 })
      gsap.to(drawerRef.current, { x: 0, duration: 0.4, ease: 'power3.out' })
      // Stagger items
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          x: 30, opacity: 0, duration: 0.3, stagger: 0.05, delay: 0.2, ease: 'power2.out',
        })
      }
    } else {
      document.body.style.overflow = ''
      gsap.to(overlayRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.3 })
      gsap.to(drawerRef.current, { x: '100%', duration: 0.3, ease: 'power3.in' })
    }
  }, [isCartOpen, items.length])

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={closeCart}
        aria-hidden="true"
        className="fixed inset-0 z-[10000] bg-black/50 opacity-0 pointer-events-none"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className="fixed top-0 right-0 z-[10001] w-full max-w-md h-full bg-white shadow-heavy flex flex-col"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.06]">
          <div>
            <h2 className="text-lg font-black uppercase">Your Cart</h2>
            <p className="text-xs text-grey-400 mt-0.5">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:border-purple/30 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div ref={contentRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-grey-100 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-grey-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-black">Your cart is empty</p>
              <p className="text-xs text-grey-400 mt-1">Add some products to get started</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-grey-100 group">
                {/* Image */}
                <div className="w-20 h-20 rounded-lg bg-white flex-shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.name} loading="lazy" width={80} height={80} className="w-full h-full object-contain p-2" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-black truncate">{item.name}</h4>
                  <p className="text-sm font-black text-purple mt-0.5">{item.price}</p>

                  {/* Quantity + Remove */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center hover:border-purple/30 transition-colors"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-xs font-bold w-5 text-center" aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center hover:border-purple/30 transition-colors"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="text-grey-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-black/[0.06] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-grey-600">Subtotal</span>
              <span className="text-lg font-black text-black">{cartTotal}</span>
            </div>
            <button className="w-full py-3.5 bg-purple text-white text-sm font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors">
              Checkout
            </button>
            <button
              onClick={closeCart}
              className="w-full py-3 text-sm font-medium text-grey-400 hover:text-purple transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
