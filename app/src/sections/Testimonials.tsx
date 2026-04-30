import ScrollReveal from '@/components/ScrollReveal'
import { testimonials } from '@/data/testimonials'

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < count ? 'text-lime' : 'text-grey-200'}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative section-padding bg-white overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <span className="section-label mb-6 inline-block">Testimonials</span>
          <h2 className="section-heading mb-4">
            What People
            <br />
            Are Saying
          </h2>
        </ScrollReveal>

        {/* Grid */}
        <ScrollReveal direction="up" stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="p-8 lg:p-10 rounded-2xl bg-bg border border-black/[0.04] hover:border-purple/20 hover:shadow-soft transition-all duration-300">
                <Stars count={t.rating} />
                <p className="text-grey-600 text-base leading-relaxed mt-6 mb-8">
                  "{t.quote}"
                </p>
                <div>
                  <p className="text-sm font-bold text-black">{t.name}</p>
                  <p className="text-xs text-grey-400 mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
