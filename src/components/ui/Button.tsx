import React from 'react'
import { RefreshCw } from 'lucide-react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'danger'
  isLoading?: boolean
  icon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'flex items-center justify-center py-3 px-4 rounded-xl font-semibold transition-all cursor-pointer text-sm shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:scale-100 disabled:pointer-events-none'

  const variantStyles = {
    primary:
      'bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-blue-400 disabled:to-blue-300 text-white shadow-blue-500/10',
    secondary:
      'bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 disabled:from-violet-400 disabled:to-violet-300 text-white shadow-violet-500/10',
    dark:
      'bg-slate-800 hover:bg-slate-900 disabled:bg-slate-700 text-white shadow-slate-900/10',
    outline:
      'border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-xs',
    danger:
      'border border-rose-200 text-rose-600 hover:bg-rose-50/50 disabled:border-rose-100 disabled:text-rose-400 shadow-xs',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <RefreshCw className="w-4 h-4 animate-spin shrink-0 mr-2" />
      ) : (
        icon && <span className="shrink-0 mr-2">{icon}</span>
      )}
      {children}
    </button>
  )
}
