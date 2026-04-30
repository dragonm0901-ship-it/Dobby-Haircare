import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  className?: string
  stagger?: number
  once?: boolean
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className,
  stagger = 0,
  once = true,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const directionMap = {
      up: { y: 40, x: 0 },
      down: { y: -40, x: 0 },
      left: { y: 0, x: 40 },
      right: { y: 0, x: -40 },
    }

    const { x, y } = directionMap[direction]

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current!.children, {
        x,
        y,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      })
    })

    return () => ctx.revert()
  }, [direction, delay, duration, stagger, once])

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  )
}
