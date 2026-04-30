import { useState, useRef, useEffect } from 'react'
import { Plus, Minus } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { faqs } from '@/data/faq'

gsap.registerPlugin(ScrollTrigger)

// Split text into individual characters wrapped in spans
function SplitChars({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="split-char inline-block"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

// Split text into individual words wrapped in spans
function SplitWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="split-word inline-block overflow-hidden mr-[0.3em]">
          <span className="inline-block">{word}</span>
        </span>
      ))}
    </span>
  )
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)
  const questionRef = useRef<HTMLButtonElement>(null)
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-button-${index}`

  useEffect(() => {
    if (!questionRef.current) return

    const words = questionRef.current.querySelectorAll('.split-word > span')

    const ctx = gsap.context(() => {
      gsap.from(words, {
        y: '100%',
        opacity: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 85%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen(!isOpen)
    }
  }

  return (
    <div
      ref={itemRef}
      className={`border-b transition-colors duration-300 ${isOpen ? 'border-purple/20' : 'border-black/[0.06]'}`}
    >
      <button
        ref={questionRef}
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className={`text-base lg:text-lg font-bold pr-8 transition-colors duration-300 ${isOpen ? 'text-purple' : 'text-black group-hover:text-purple'}`}>
          <SplitWords text={question} />
        </span>
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
          isOpen ? 'border-purple/30 bg-purple/10 rotate-0' : 'border-black/10 group-hover:border-purple/20'
        }`}>
          {isOpen
            ? <Minus size={14} className="text-purple" aria-hidden="true" />
            : <Plus size={14} className="text-grey-400 group-hover:text-purple transition-colors" aria-hidden="true" />
          }
        </div>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[300px] pb-6' : 'max-h-0'}`}
      >
        <p className="text-grey-400 text-sm leading-relaxed max-w-2xl">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const headingRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!headingRef.current) return

    const ctx = gsap.context(() => {
      // Label pop-in
      gsap.from(labelRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(3)',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        },
      })

      // Heading — character-by-character reveal
      const chars = headingRef.current!.querySelectorAll('.split-char')
      gsap.from(chars, {
        y: 80,
        opacity: 0,
        rotateX: -90,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        },
      })

      // Description — word slide up
      const descWords = descRef.current!.querySelectorAll('.split-word > span')
      gsap.from(descWords, {
        y: '100%',
        duration: 0.5,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: descRef.current,
          start: 'top 85%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="faq" className="relative section-padding bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Header */}
          <div className="lg:col-span-4">
            <div ref={headingRef} className="lg:sticky lg:top-32">
              <span ref={labelRef} className="section-label mb-6 inline-block">FAQ</span>
              <h2 className="section-heading" style={{ perspective: '600px' }}>
                <SplitChars text="Common" className="block" />
                <SplitChars text="Questions" className="block" />
              </h2>
              <p ref={descRef} className="text-grey-400 text-sm leading-relaxed mt-6">
                <SplitWords text="Everything you need to know about dobby." />
                {' '}Can't find your answer?{' '}
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-purple font-bold hover:underline"
                >
                  Contact us
                </button>
              </p>
            </div>
          </div>

          {/* Right Accordion */}
          <div className="lg:col-span-8">
            <div role="list">
              {faqs.map((faq, i) => (
                <FAQItem key={i} index={i} {...faq} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
