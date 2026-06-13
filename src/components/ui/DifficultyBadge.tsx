import React from 'react'
import type { Difficulty } from '../../types/quiz'

export interface DifficultyBadgeProps {
  difficulty: Difficulty
  className?: string
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, className = '' }) => {
  const styles = {
    easy: 'border-emerald-200 bg-emerald-50/40 text-emerald-700',
    medium: 'border-amber-200 bg-amber-50/40 text-amber-700',
    hard: 'border-rose-200 bg-rose-50/40 text-rose-700',
  }

  const label = {
    easy: 'Mudah',
    medium: 'Sedang',
    hard: 'Sulit',
  }

  return (
    <span
      className={`inline-flex border px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[difficulty] || styles.easy} ${className}`}
    >
      {label[difficulty] || difficulty}
    </span>
  )
}
