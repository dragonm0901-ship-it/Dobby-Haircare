import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PillButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  icon?: boolean
}

export default function PillButton({
  children,
  onClick,
  variant = 'primary',
  className,
  icon = false,
}: PillButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg',
        variant === 'primary'
          ? 'bg-lime text-black hover:bg-lime hover:shadow-lime-sm hover:text-black'
          : 'bg-white text-black border border-black/10 hover:border-purple hover:text-purple',
        className
      )}
    >
      {children}
      {icon && <ArrowUpRight size={16} strokeWidth={2.5} />}
    </button>
  )
}
