import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedCounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export default function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!counterRef.current || hasAnimated.current) return

    const el = counterRef.current

    const ctx = gsap.context(() => {
      const counter = { value: 0 }

      gsap.to(counter, {
        value: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (el) {
            const val = Math.round(counter.value * 10) / 10
            el.textContent = prefix + (Number.isInteger(target) ? Math.round(val).toString() : val.toFixed(1)) + suffix
          }
        },
      })
    })

    hasAnimated.current = true
    return () => ctx.revert()
  }, [target, suffix, prefix, duration])

  return (
    <span ref={counterRef} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
