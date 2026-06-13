import React from 'react'

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: React.ReactNode
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  id,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3.5 h-4 w-4 flex items-center justify-center text-slate-400">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`w-full ${
            icon ? 'pl-10' : 'pl-4'
          } pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-hidden transition-all bg-slate-50/50 text-slate-800 ${className}`}
          {...props}
        />
      </div>
    </div>
  )
}
