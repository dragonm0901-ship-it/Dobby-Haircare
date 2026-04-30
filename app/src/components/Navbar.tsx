import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { ShoppingCart, Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { useCart } from '@/context/CartContext'
import AnimatedLogo from '@/components/AnimatedLogo'

export default function Navbar() {
  const { cartCount, toggleCart } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileLinksRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLButtonElement | null)[]>([])
  const navWrapperRef = useRef<HTMLDivElement>(null)
  const cartBtnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileMenuRef.current || !mobileLinksRef.current) return
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.to(mobileMenuRef.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power4.inOut' })
      gsap.from(mobileLinksRef.current.children, { y: 40, opacity: 0, duration: 0.5, stagger: 0.08, delay: 0.25, ease: 'power3.out' })
    } else {
      document.body.style.overflow = ''
      gsap.to(mobileMenuRef.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.4, ease: 'power4.inOut' })
    }
  }, [isMobileMenuOpen])

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen || !mobileMenuRef.current) return

    const menu = mobileMenuRef.current
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
        return
      }
      if (e.key !== 'Tab') return

      const focusable = menu.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    // Focus first item when menu opens
    const focusable = menu.querySelectorAll<HTMLElement>('button')
    if (focusable.length > 0) focusable[0].focus()

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  // Liquid Slider: glide to hovered link
  useEffect(() => {
    const slider = sliderRef.current
    const wrapper = navWrapperRef.current
    if (!slider || !wrapper) return

    if (hoveredIndex !== null) {
      const link = linkRefs.current[hoveredIndex]
      if (!link) return
      const wrapperRect = wrapper.getBoundingClientRect()
      const linkRect = link.getBoundingClientRect()

      gsap.to(slider, {
        x: linkRect.left - wrapperRect.left,
        width: linkRect.width,
        opacity: 1,
        duration: 1.5,
        ease: 'elastic.out(0.1, 1.7)',
      })
    } else {
      gsap.to(slider, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
    }
  }, [hoveredIndex])

  const navigate = useNavigate()

  const navLinks = [
    { name: 'Shop +', href: '/shop', type: 'link' },
    { name: 'About', href: '#about', type: 'anchor' },
    { name: 'Blog', href: '#blog', type: 'anchor' },
    { name: 'Contact', href: '#contact', type: 'anchor' },
  ]

  const handleNavClick = useCallback((link: { name: string; href: string; type: string }) => {
    setIsMobileMenuOpen(false)
    if (link.type === 'link') {
      navigate(link.href)
    } else {
      if (window.location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          const el = document.querySelector(link.href)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        const el = document.querySelector(link.href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [navigate])

  return (
    <>
      <nav className={`fixed top-0 left-0 w-screen max-w-[100vw] z-[9999] transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}>
        <div className={`absolute inset-0 transition-all duration-500 ${
          isScrolled ? 'bg-bg/80 backdrop-blur-xl shadow-soft' : 'bg-transparent'
        }`} />

        <div className="relative z-10 px-6 lg:px-10 flex items-center justify-between flex-nowrap w-full">
          {/* Logo */}
          <div className="flex-shrink-0 max-w-[120px] sm:max-w-none">
            <AnimatedLogo
              onClick={() => {
                if (window.location.pathname !== '/') navigate('/')
                else window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className={`transition-colors duration-300 ${
                isMobileMenuOpen ? 'text-white' : 'text-black'
              }`}
            />
          </div>

          {/* Desktop Nav — Liquid Slider Capsule */}
          <div className="hidden md:flex items-center">
            <div
              ref={navWrapperRef}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative bg-black/90 backdrop-blur-md rounded-full px-1.5 py-1.5 flex items-center gap-0.5"
            >
              {/* The liquid slider pill */}
              <div
                ref={sliderRef}
                className="absolute top-1.5 bottom-1.5 bg-purple rounded-full opacity-0 pointer-events-none will-change-transform"
                style={{ width: 0, left: 0 }}
              />

              {navLinks.map((link, i) => (
                <button
                  key={link.name}
                  ref={(el) => { linkRefs.current[i] = el }}
                  onClick={() => handleNavClick(link)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative z-10 text-sm font-medium px-5 py-2 rounded-full transition-colors duration-300 ${
                    hoveredIndex === i ? 'text-white' : 'text-white/60'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right — Cart + Mobile */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 relative">
            <button
              onClick={toggleCart}
              aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
              className="relative flex items-center gap-2 group flex-shrink-0"
            >
              <div
                ref={cartBtnRef}
                className="relative w-10 h-10 bg-lime rounded-full flex items-center justify-center will-change-transform"
                onMouseEnter={() => {
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
                }}
                onMouseLeave={() => {
                  gsap.to(cartBtnRef.current, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.4,
                    ease: 'power3.out',
                  })
                }}
              >
                <ShoppingCart size={18} strokeWidth={2.5} className="text-black" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen
                ? <X size={24} strokeWidth={2.5} className="text-white" />
                : <Menu size={24} strokeWidth={2.5} className="text-black" />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className="fixed inset-0 z-[55] bg-black md:hidden"
        style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div ref={mobileLinksRef} className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className="text-4xl font-black uppercase text-white hover:text-purple transition-colors duration-300"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
