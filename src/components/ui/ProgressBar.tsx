import React from 'react'

export interface ProgressBarProps {
  value: number // 0 to 100
  colorClass?: string
  heightClass?: string
  bgClass?: string
  transitionClass?: string
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  colorClass = 'bg-blue-600',
  heightClass = 'h-1.5',
  bgClass = 'bg-slate-200',
  transitionClass = 'duration-300 ease-out',
  className = '',
}) => {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className={`w-full rounded-full overflow-hidden ${bgClass} ${heightClass} ${className}`}>
      <div
        className={`h-full transition-all ${transitionClass} ${colorClass}`}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  )
}
