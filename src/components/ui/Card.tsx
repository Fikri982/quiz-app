import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hoverable?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-100 overflow-hidden'
  const hoverStyles = hoverable
    ? 'hover:border-blue-500 hover:bg-blue-50/10 active:bg-blue-50/20 transition-all cursor-pointer shadow-xs hover:shadow-md hover:scale-[1.005]'
    : ''

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
