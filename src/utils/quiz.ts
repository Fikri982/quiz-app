import type { Difficulty, OpenTDBQuestion, QuizQuestion, QuizSession, CompletedQuiz } from '../types/quiz'

const OPENTDB_BASE_URL = 'https://opentdb.com/api.php'
const MATH_CATEGORY_ID = 19
const QUESTIONS_PER_QUIZ = 10

export const DIFFICULTY_TIMES: Record<Difficulty, number> = {
  easy: 60,
  medium: 180,
  hard: 300,
}

const decodeHTML = (html: string): string => {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export const getSessionKey = (username: string): string =>
  `quiz_session_${username}`

export const getQuizSession = (username: string): QuizSession | null => {
  const raw = localStorage.getItem(getSessionKey(username))
  if (!raw) return null
  try {
    return JSON.parse(raw) as QuizSession
  } catch {
    return null
  }
}

export const saveQuizSession = (username: string, session: QuizSession): void => {
  localStorage.setItem(getSessionKey(username), JSON.stringify(session))
}

export const clearQuizSession = (username: string): void => {
  localStorage.removeItem(getSessionKey(username))
}

export const hasActiveSession = (username: string): boolean => {
  const session = getQuizSession(username)
  return session !== null && !session.isFinished
}

export const fetchQuizQuestions = async (
  difficulty: Difficulty
): Promise<QuizQuestion[]> => {
  const url = `${OPENTDB_BASE_URL}?amount=${QUESTIONS_PER_QUIZ}&category=${MATH_CATEGORY_ID}&difficulty=${difficulty}&type=multiple`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Gagal mengambil data kuis. Silakan coba lagi.')
  }

  const data = await response.json()
  if (data.response_code !== 0 || !data.results || data.results.length === 0) {
    throw new Error('Gagal memuat soal dari OpenTDB. Silakan coba lagi beberapa saat lagi.')
  }

  return data.results.map((q: OpenTDBQuestion) => ({
    category: decodeHTML(q.category),
    type: q.type,
    difficulty: q.difficulty,
    question: decodeHTML(q.question),
    correct_answer: decodeHTML(q.correct_answer),
    incorrect_answers: q.incorrect_answers.map(decodeHTML),
  }))
}

export const createNewSession = (
  difficulty: Difficulty,
  questions: QuizQuestion[]
): QuizSession => ({
  id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  difficulty,
  questions,
  currentIndex: 0,
  answers: Array(questions.length).fill(null),
  timeRemaining: DIFFICULTY_TIMES[difficulty],
  isFinished: false,
})

export const getQuizHistory = (username: string): CompletedQuiz[] => {
  const raw = localStorage.getItem(`quiz_history_${username}`)
  if (!raw) return []
  try {
    return JSON.parse(raw) as CompletedQuiz[]
  } catch {
    return []
  }
}

export const addQuizToHistory = (username: string, session: QuizSession): void => {
  const history = getQuizHistory(username)

  if (history.some((q) => q.id === session.id)) {
    return
  }

  const correctCount = session.answers.filter(
    (ans, idx) => ans === session.questions[idx].correct_answer
  ).length
  const score = Math.round((correctCount / session.questions.length) * 100)

  const completed: CompletedQuiz = {
    id: session.id,
    difficulty: session.difficulty,
    score,
    correctCount,
    totalQuestions: session.questions.length,
    date: new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  }

  history.unshift(completed)
  localStorage.setItem(`quiz_history_${username}`, JSON.stringify(history))
}
