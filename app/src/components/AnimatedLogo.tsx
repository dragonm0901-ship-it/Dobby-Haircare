import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

interface AnimatedLogoProps {
  className?: string
  onClick?: () => void
}

export default function AnimatedLogo({ className, onClick }: AnimatedLogoProps) {
  const containerRef = useRef<HTMLButtonElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[]
    if (letters.length === 0) return

    // Offsets: letters scatter outward from center
    const scatterX = [-12, -6, 0, 6, 12]
    const scatterY = [-3, 2, -4, 3, -2]
    const scatterRotate = [-8, 4, -3, 5, -6]

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.5,
        defaults: { ease: 'power3.out' },
      })

      // Phase 1: Drift apart (scatter)
      tl.to(letters, {
        x: (i) => scatterX[i],
        y: (i) => scatterY[i],
        rotation: (i) => scatterRotate[i],
        opacity: 0.5,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power2.out',
      })

      // Phase 2: Hold scattered briefly
      tl.to({}, { duration: 0.3 })

      // Phase 3: Snap back together (magnetic pull)
      tl.to(letters, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.02,
        ease: 'back.out(2.5)',
      })

      // Phase 4: Subtle overshoot squeeze on reassemble
      tl.to(containerRef.current, {
        scaleX: 0.96,
        duration: 0.1,
        ease: 'power2.in',
      })
      tl.to(containerRef.current, {
        scaleX: 1,
        duration: 0.3,
        ease: 'elastic.out(1, 0.4)',
      })
    })

    return () => ctx.revert()
  }, [])

  const text = 'dobby'

  return (
    <button
      ref={containerRef}
      onClick={onClick}
      className={cn(
        'relative flex items-baseline select-none will-change-transform',
        className
      )}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          ref={(el) => { lettersRef.current[i] = el }}
          className="inline-block text-[28px] font-black italic tracking-tight will-change-transform"
        >
          {char}
        </span>
      ))}
    </button>
  )
}
