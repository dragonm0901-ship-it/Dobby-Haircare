import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CircleArrowButtonProps {
  onClick?: () => void
  className?: string
  size?: number
}

export default function CircleArrowButton({
  onClick,
  className,
  size = 50,
}: CircleArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-purple text-white transition-all duration-300 hover:scale-110 hover:shadow-purple-md',
        className
      )}
      style={{ width: size, height: size }}
    >
      <ArrowUpRight size={20} strokeWidth={2.5} />
    </button>
  )
}
