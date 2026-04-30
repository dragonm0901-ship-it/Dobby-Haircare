import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import GeometricLines from '@/components/GeometricLines'
import FloatingProduct from '@/components/FloatingProduct'
import PillButton from '@/components/PillButton'
import CircleArrowButton from '@/components/CircleArrowButton'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const productRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const mm = gsap.matchMedia()
    
    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)"
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean; isDesktop: boolean }
      
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // A. Tagline fade
      tl.from(taglineRef.current, { y: 20, opacity: 0, duration: 0.6 }, 0)

      // B. Headline lines
      const lines = headlineRef.current?.querySelectorAll('.headline-line')
      if (lines) {
        tl.from(lines, {
          yPercent: 120, rotation: 2, opacity: 0,
          duration: 1.2, stagger: 0.1, ease: 'power4.out',
        }, 0.3)
      }

      // C. Product entrance
      tl.fromTo(productRef.current,
        { scale: 1.4, y: 50, opacity: 0, filter: 'blur(10px)' },
        { 
          scale: 1, 
          y: isMobile ? 0 : 0, 
          x: isMobile ? 0 : 0,
          opacity: 1, 
          filter: 'blur(0px)', 
          duration: 1.8, 
          ease: 'expo.out' 
        },
        0.2
      )

      // D. Glow behind product
      tl.fromTo(glowRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' },
        0.6
      )

      // E. CTA elements
      if (ctaRef.current?.children) {
        tl.from(ctaRef.current.children, {
          y: 30, opacity: 0, duration: 0.8, stagger: 0.1,
        }, 1.5)
      }

      return () => {
        // cleanup for this match
      }
    }, sectionRef)

    return () => {
      mm.revert()
    }
  }, [])

  const scrollToShop = () => {
    const el = document.querySelector('#shop')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col overflow-hidden bg-bg"
    >
      {/* Geometric Lines Background */}
      <GeometricLines />

      {/* Content */}
      <div className="relative z-10 w-full px-5 sm:px-6 lg:px-10 flex flex-col flex-1 pt-20 sm:pt-10 pb-4">

        {/* Mobile: Product stacked above text */}
        <div className="flex flex-col flex-1 sm:relative">

          {/* Product — on mobile it's in-flow, on desktop it's absolutely positioned */}
          <div className="sm:absolute sm:inset-0 flex items-center justify-center sm:pointer-events-none order-1 sm:order-none py-4 sm:py-0">
            {/* Purple Glow */}
            <div
              ref={glowRef}
              className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[550px] lg:h-[550px] rounded-full opacity-0"
              style={{
                background: 'radial-gradient(circle, rgba(107,78,255,0.3) 0%, rgba(194,182,255,0.15) 40%, transparent 70%)',
              }}
            />

            {/* Light beam effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] sm:w-[280px] h-[300px] sm:h-[450px] opacity-20"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(194,182,255,0.3) 50%, transparent 100%)',
                clipPath: 'polygon(35% 0%, 65% 0%, 80% 100%, 20% 100%)',
              }}
            />

            <div ref={productRef} className="relative z-10 w-full max-w-[320px] sm:max-w-[560px] lg:max-w-[728px] sm:pointer-events-auto">
              <FloatingProduct
                src="/assets/product-hero.png"
                alt="dobby Clarify Shampoo"
                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(107,78,255,0.2)]"
                animate={true}
                fetchPriority="high"
              />
            </div>
          </div>

          {/* Spacer — desktop only */}
          <div className="hidden sm:block flex-1" />

          {/* Bottom bar — Headline left, CTA right */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-3 sm:gap-4 lg:gap-16 shrink-0 order-2 sm:order-none">

            {/* Left — Tagline + Headline */}
            <div>
              <div ref={taglineRef} className="flex items-center gap-2 mb-1 sm:mb-2">
                <span className="text-base sm:text-xl font-bold uppercase tracking-wider text-black">
                  From Root
                </span>
                <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-purple text-white text-base sm:text-xl font-bold uppercase tracking-wider rounded-full">
                  To Shine
                </span>
              </div>

              <h1
                ref={headlineRef}
                className="text-[13vw] sm:text-[12vw] lg:text-[7.6vw] font-black uppercase leading-[0.85] tracking-tight text-black"
              >
                <span className="headline-line block overflow-hidden">
                  <span className="block">Knock</span>
                </span>
                <span className="headline-line block overflow-hidden">
                  <span className="block">Out</span>
                </span>
                <span className="headline-line block overflow-hidden">
                  <span className="block">Flakes</span>
                </span>
              </h1>
            </div>

            {/* Right — Copy + CTA */}
            <div ref={ctaRef} className="space-y-3 sm:space-y-5 lg:text-right lg:max-w-xs shrink-0">
              <p className="text-lg sm:text-2xl font-semibold text-black leading-relaxed">
                Journey in to the{' '}
                <span className="italic font-serif font-bold">wonderful</span>{' '}
                world of shampoo
              </p>
              <div className="flex items-center gap-3 lg:justify-end">
                <PillButton onClick={scrollToShop} className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base">
                  Explore More
                </PillButton>
                <CircleArrowButton onClick={scrollToShop} size={48} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
