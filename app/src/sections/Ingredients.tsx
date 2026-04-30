import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ingredients = [
  {
    name: 'Argan Oil',
    origin: 'Morocco',
    description: 'Rich in vitamin E and fatty acids, deeply nourishes and restores shine to damaged hair.',
    percentage: '15%',
  },
  {
    name: 'Tea Tree',
    origin: 'Australia',
    description: 'Natural antiseptic that soothes scalp irritation and promotes healthy follicle function.',
    percentage: '12%',
  },
  {
    name: 'Keratin Complex',
    origin: 'Switzerland',
    description: 'Advanced protein blend that reconstructs broken bonds and strengthens each strand.',
    percentage: '20%',
  },
  {
    name: 'Jojoba Seed',
    origin: 'Arizona',
    description: 'Mimics natural scalp oils to balance moisture without weighing hair down.',
    percentage: '10%',
  },
]

export default function Ingredients() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        // Each card scales down slightly when the NEXT card arrives
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9 + i * 0.01,
            filter: `brightness(${0.1 + i * 0.05})`,
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top 55%',
              end: 'top 40%',
              scrub: true,
            },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="ingredients" className="relative bg-black">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple/[0.06] blur-[200px] pointer-events-none" />

      {/* Big Text Block */}
      <div className="section-container pt-16 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-4xl">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-purple/20 text-purple-light text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full mb-6 sm:mb-8">
            The Formula
          </span>
          <h2 className="text-[9.5vw] sm:text-[8vw] lg:text-[6vw] font-black uppercase leading-[0.85] tracking-tight text-white mb-4 sm:mb-6">
            Powered By
            <br />
            <span className="text-purple">Nature</span>
          </h2>
          <p className="text-base sm:text-xl sm:text-2xl text-white/40 max-w-2xl leading-relaxed">
            Every ingredient is carefully sourced and rigorously tested for efficacy.
          </p>
        </div>
      </div>

      {/* Stacked Cards */}
      <div className="section-container pb-16 sm:pb-20">
        {ingredients.map((item, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el }}
            className="sticky top-[8vh] mb-4 sm:mb-6"
          >
            <div
              className="w-full max-w-3xl mx-auto bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col justify-between p-5 sm:p-8 lg:p-10">
                {/* Top — Number & Origin */}
                <div className="flex items-start justify-between">
                  <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-purple/60">
                    0{i + 1} / 04
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-purple/60">
                    Sourced from {item.origin}
                  </span>
                </div>

                {/* Center — Big percentage */}
                <div className="py-4 sm:py-8 flex items-center justify-center">
                  <span className="text-[16vw] sm:text-[14vw] lg:text-[120px] font-black leading-none tracking-tighter text-purple/30">
                    {item.percentage}
                  </span>
                </div>

                {/* Bottom — Name & Description */}
                <div>
                  <h3 className="text-xl sm:text-3xl lg:text-4xl font-black text-black mb-1 sm:mb-2">
                    {item.name}
                  </h3>
                  <p className="text-black/40 text-sm sm:text-lg leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="section-container pb-16 sm:pb-20">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-14">
          {['Dermatologist Tested', 'Cruelty Free', 'Vegan', 'Sulfate Free', 'Paraben Free'].map((badge) => (
            <span key={badge} className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/20 hover:text-purple/50 transition-colors duration-300">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
