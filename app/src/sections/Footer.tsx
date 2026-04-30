import { ArrowUpRight, ArrowUp } from 'lucide-react'
import { useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import gsap from 'gsap'
import ScrollReveal from '@/components/ScrollReveal'

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()
  const watermarkLettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const watermarkContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const letters = watermarkLettersRef.current.filter(Boolean) as HTMLSpanElement[]
    if (letters.length === 0) return

    const scatterX = [-60, -30, 0, 30, 60]
    const scatterY = [-15, 10, -20, 15, -10]
    const scatterRotate = [-12, 6, -5, 8, -10]

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.5,
        defaults: { ease: 'power3.out' },
      })

      // Phase 1: Drift apart
      tl.to(letters, {
        x: (i) => scatterX[i],
        y: (i) => scatterY[i],
        rotation: (i) => scatterRotate[i],
        duration: 1,
        stagger: 0.06,
        ease: 'power2.out',
      })

      // Phase 2: Hold
      tl.to({}, { duration: 0.4 })

      // Phase 3: Snap back
      tl.to(letters, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: 'back.out(2.5)',
      })

      // Phase 4: Squeeze on reassemble
      tl.to(watermarkContainerRef.current, {
        scaleX: 0.97,
        duration: 0.12,
        ease: 'power2.in',
      })
      tl.to(watermarkContainerRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.4)',
      })
    })

    return () => ctx.revert()
  }, [])

  const scrollToSection = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
      return
    }

    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative py-14 sm:py-20 lg:py-24 bg-bg overflow-hidden">
      {/* Animated Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div ref={watermarkContainerRef} className="flex items-baseline select-none will-change-transform px-4">
          {'dobby'.split('').map((char, i) => (
            <span
              key={i}
              ref={(el) => { watermarkLettersRef.current[i] = el }}
              className="inline-block text-[18vw] sm:text-[20vw] font-black italic text-black/[0.03] will-change-transform pr-[0.5vw]"
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 section-container">
        {/* Newsletter */}
        <ScrollReveal direction="up" className="mb-10 sm:mb-16">
          <div className="text-center max-w-md mx-auto">
            <h3 className="text-xl sm:text-2xl font-black uppercase text-black mb-1.5 sm:mb-2">Stay Updated</h3>
            <p className="text-grey-400 text-xs sm:text-sm mb-4 sm:mb-6">Get exclusive offers and haircare tips.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 bg-white rounded-full text-xs sm:text-sm text-black focus:outline-none focus:ring-2 focus:ring-purple"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-purple text-white rounded-full flex items-center justify-center hover:bg-black transition-colors flex-shrink-0"
              >
                <ArrowUpRight size={14} />
              </button>
            </form>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-8 mb-10 sm:mb-16">
          <div className="col-span-2 lg:col-span-1">
            <button onClick={() => scrollToSection('#')} className="text-2xl sm:text-3xl font-black italic text-black pr-2">dobby</button>
            <p className="mt-3 sm:mt-4 text-grey-400 leading-relaxed text-xs sm:text-sm">
              Science-backed haircare that targets the root, not just the symptom.
            </p>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black mb-3 sm:mb-4">Navigate</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: 'Shop', href: '#shop' },
                { name: 'About', href: '#about' },
                { name: 'Blog', href: '#blog' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <button onClick={() => scrollToSection(link.href)} className="text-grey-400 hover:text-purple transition-colors text-xs sm:text-sm">
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Shipping & Returns'].map((link) => (
                <li key={link}>
                  <span className="text-grey-400 hover:text-purple transition-colors cursor-pointer text-xs sm:text-sm">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black mb-3 sm:mb-4">Follow Us</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['Instagram', 'Twitter', 'TikTok'].map((social) => (
                <li key={social}>
                  <span className="text-grey-400 hover:text-purple transition-colors cursor-pointer text-xs sm:text-sm">{social}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-grey-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-grey-400">&copy; 2026 dobby. All rights reserved.</p>
          <button
            onClick={() => scrollToSection('#')}
            aria-label="Back to top"
            className="flex items-center gap-2 text-xs sm:text-sm text-grey-400 hover:text-purple transition-colors group"
          >
            Back to top
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-grey-200 flex items-center justify-center group-hover:border-purple transition-colors">
              <ArrowUp size={10} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}
