export interface QuizQuestion {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export interface OpenTDBQuestion {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface QuizSession {
  id: string
  difficulty: Difficulty
  questions: QuizQuestion[]
  currentIndex: number
  answers: (string | null)[]
  timeRemaining: number
  isFinished: boolean
}

export interface CompletedQuiz {
  id: string
  difficulty: Difficulty
  score: number
  correctCount: number
  totalQuestions: number
  date: string
}
