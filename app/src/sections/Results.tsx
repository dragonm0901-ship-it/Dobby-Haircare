import ScrollReveal from '@/components/ScrollReveal'
import AnimatedCounter from '@/components/AnimatedCounter'
import { Microscope, PackageCheck, Feather, Dna } from 'lucide-react'

const results = [
  { label: 'Less Hair Breakage', value: 89, suffix: '%' },
  { label: 'Improved Scalp Health', value: 94, suffix: '%' },
  { label: 'More Shine & Softness', value: 91, suffix: '%' },
  { label: 'Would Recommend', value: 97, suffix: '%' },
]

const badges = [
  { icon: Microscope, label: 'Dermatologist Tested' },
  { icon: PackageCheck, label: 'Sustainably Sourced' },
  { icon: Feather, label: 'Cruelty Free' },
  { icon: Dna, label: '100% Vegan' },
]

export default function Results() {
  return (
    <section id="results" className="relative section-padding bg-bg overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <span className="section-label mb-6 inline-block">Clinical Results</span>
          <h2 className="section-heading mb-4">
            Results That
            <br />
            Speak
          </h2>
          <p className="text-lg text-grey-400 max-w-lg mx-auto">
            Based on an independent clinical study of 200 participants over 8 weeks.
          </p>
        </ScrollReveal>

        {/* Bars */}
        <ScrollReveal direction="up" stagger={0.1}>
          <div className="max-w-2xl mx-auto space-y-8 mb-20">
            {results.map((r, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-grey-600">{r.label}</span>
                  <AnimatedCounter target={r.value} suffix={r.suffix} className="text-lg font-black text-purple" />
                </div>
                <div className="w-full h-2 bg-black/[0.04] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-light to-purple rounded-full"
                    style={{ width: `${r.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Modern Trust Badges */}
        <ScrollReveal direction="up" stagger={0.08}>
          <div className="max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 text-center border border-black/[0.02]">
                <div className="w-12 h-12 flex items-center justify-center mb-3 text-purple">
                  <badge.icon size={24} strokeWidth={2.5} fill="none" />
                </div>
                <span className="text-[10px] font-black text-black/60 uppercase tracking-[0.15em] leading-tight">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
