export default function Marquee() {
  const words = ['HAIRCARE', 'SCIENCE', 'NATURAL', 'PREMIUM', 'BOTANICAL', 'CLEAN', 'EFFECTIVE', 'SCALP HEALTH']

  const content = words.map((word, i) => (
    <span key={i} className="flex items-center flex-shrink-0">
      <span className="text-2xl sm:text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black/[0.06] whitespace-nowrap hover:text-purple/20 transition-colors duration-500 cursor-default">
        {word}
      </span>
      <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple/20 mx-4 sm:mx-8 flex-shrink-0" />
    </span>
  ))

  return (
    <section className="relative py-6 sm:py-10 lg:py-14 overflow-hidden bg-bg border-y border-black/[0.04]" aria-hidden="true">
      <div className="flex items-center animate-marquee" style={{ width: 'max-content' }}>
        <div className="flex items-center">{content}</div>
        <div className="flex items-center">{content}</div>
      </div>
    </section>
  )
}
