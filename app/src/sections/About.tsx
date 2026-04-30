import ScrollReveal from '@/components/ScrollReveal'
import FloatingProduct from '@/components/FloatingProduct'
import AnimatedCounter from '@/components/AnimatedCounter'

export default function About() {
  return (
    <section id="about" className="relative section-padding bg-bg overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Text */}
          <ScrollReveal direction="up" stagger={0.1}>
            <div className="space-y-8">
              <span className="section-label">Our Story</span>

              <h2 className="section-heading">
                Rooted
                <br />
                In Science
              </h2>

              <div className="space-y-4 text-grey-600 text-lg leading-relaxed">
                <p>
                  We believe in powerful, clean ingredients that target the root of the
                  problem, not just the symptoms. Our formulas are dermatologically
                  tested and designed for the modern individual.
                </p>
                <p>
                  Born from a frustration with harsh chemical treatments, dobby was
                  created to offer a gentler, more effective approach to scalp health.
                  Every ingredient is carefully selected for its proven benefits.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div>
                  <AnimatedCounter
                    target={98}
                    suffix="%"
                    className="text-3xl lg:text-4xl font-black text-purple"
                  />
                  <p className="text-sm text-grey-400 mt-1">Natural Ingredients</p>
                </div>
                <div>
                  <AnimatedCounter
                    target={50}
                    suffix="K+"
                    className="text-3xl lg:text-4xl font-black text-purple"
                  />
                  <p className="text-sm text-grey-400 mt-1">Happy Customers</p>
                </div>
                <div>
                  <AnimatedCounter
                    target={4.9}
                    className="text-3xl lg:text-4xl font-black text-purple"
                  />
                  <p className="text-sm text-grey-400 mt-1">Average Rating</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Product Image */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-purple/5 rounded-full blur-3xl" />
              <FloatingProduct
                src="/assets/product-serum.png"
                alt="dobby Hair Serum"
                className="absolute z-10 w-full max-w-[650px] h-auto"
                animate={true}
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
