import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

interface FloatingProductProps {
  src: string
  alt: string
  className?: string
  animate?: boolean
  fetchPriority?: 'high' | 'low' | 'auto'
}

export default function FloatingProduct({
  src,
  alt,
  className,
  animate = true,
  fetchPriority,
}: FloatingProductProps) {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!animate || !imgRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        y: '-=15',
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
    })

    return () => ctx.revert()
  }, [animate])

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      fetchPriority={fetchPriority}
      className={cn(
        'object-contain drop-shadow-2xl will-change-transform',
        className
      )}
    />
  )
}
