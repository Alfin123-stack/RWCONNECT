import { cn } from '@/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray'
  className?: string
}

const variants = {
  default: 'bg-slate-100 text-slate-700 border-slate-200',
  blue:    'bg-blue-100 text-blue-700 border-blue-200',
  green:   'bg-green-100 text-green-700 border-green-200',
  red:     'bg-red-100 text-red-700 border-red-200',
  yellow:  'bg-yellow-100 text-yellow-700 border-yellow-200',
  purple:  'bg-purple-100 text-purple-700 border-purple-200',
  gray:    'bg-gray-100 text-gray-600 border-gray-200',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('badge', variants[variant], className)}>
      {children}
    </span>
  )
}
