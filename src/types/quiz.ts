export interface QuizQuestion {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export interface QuizSession {
  questions: QuizQuestion[]
  currentIndex: number
  answers: (string | null)[]
  timeRemaining: number
  isFinished: boolean
}

