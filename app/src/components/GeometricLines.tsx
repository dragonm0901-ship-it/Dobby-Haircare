import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface GeometricLinesProps {
  className?: string
}

export default function GeometricLines({ className }: GeometricLinesProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const lines = svgRef.current.querySelectorAll('.hero-line')
    
    lines.forEach((line) => {
      const path = line as SVGPathElement
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    })

    const ctx = gsap.context(() => {
      gsap.to(lines, {
        strokeDashoffset: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 0.3,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      preserveAspectRatio="none"
    >
      <path
        className="hero-line"
        d="M-100,200 L1600,700"
        stroke="#C2B6FF"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
      />
      <path
        className="hero-line"
        d="M1700,100 L-100,700"
        stroke="#C2B6FF"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />
      <path
        className="hero-line"
        d="M200,-100 L800,900"
        stroke="#C2B6FF"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />

      <path
        className="hero-line"
        d="M500,-500 L100,900"
        stroke="#C2B6FF"
        strokeWidth="1.2"
        fill="none"
        opacity="0.3"
      />
    </svg>
  )
}
