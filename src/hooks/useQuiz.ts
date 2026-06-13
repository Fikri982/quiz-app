import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import {
  fetchQuizQuestions,
  createNewSession,
  saveQuizSession,
  clearQuizSession,
  getQuizSession,
  addQuizToHistory,
} from '../utils/quiz'
import type { Difficulty, QuizSession } from '../types/quiz'

export const useQuiz = () => {
  const { username } = useAuth()
  const [prevUsername, setPrevUsername] = useState(username)
  const [session, setSession] = useState<QuizSession | null>(() => {
    return username ? getQuizSession(username) : null
  })

  if (username !== prevUsername) {
    setPrevUsername(username)
    setSession(username ? getQuizSession(username) : null)
  }

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isPlaying = session !== null && !session.isFinished

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setSession((prev) => {
        if (!prev || prev.isFinished) return prev
        const nextTime = prev.timeRemaining - 1

        if (nextTime <= 0) {
          const finishedSession = {
            ...prev,
            timeRemaining: 0,
            isFinished: true,
          }
          if (username) {
            clearQuizSession(username)
            localStorage.setItem(`quiz_result_${username}`, JSON.stringify(finishedSession))
            addQuizToHistory(username, finishedSession)
          }
          return finishedSession
        }

        const updated = {
          ...prev,
          timeRemaining: nextTime,
        }
        if (username) {
          saveQuizSession(username, updated)
        }
        return updated
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying, username])

  const startNewQuiz = async (difficulty: Difficulty): Promise<void> => {
    setIsLoading(true)
    setError(null)
    try {
      const questions = await fetchQuizQuestions(difficulty)
      const newSession = createNewSession(difficulty, questions)
      setSession(newSession)
      if (username) {
        saveQuizSession(username, newSession)
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat kuis.'
      setError(msg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const answerQuestion = (answer: string): void => {
    setSession((prev) => {
      if (!prev || prev.isFinished) return prev

      const newAnswers = [...prev.answers]
      newAnswers[prev.currentIndex] = answer

      const nextIndex = prev.currentIndex + 1
      const isFinished = nextIndex >= prev.questions.length

      const updated: QuizSession = {
        ...prev,
        currentIndex: isFinished ? prev.currentIndex : nextIndex,
        answers: newAnswers,
        isFinished,
      }

      if (username) {
        if (isFinished) {
          clearQuizSession(username)
          localStorage.setItem(`quiz_result_${username}`, JSON.stringify(updated))
          addQuizToHistory(username, updated)
        } else {
          saveQuizSession(username, updated)
        }
      }

      return updated
    })
  }

  const finishQuiz = (): void => {
    setSession((prev) => {
      if (!prev || prev.isFinished) return prev

      const updated: QuizSession = {
        ...prev,
        isFinished: true,
      }

      if (username) {
        clearQuizSession(username)
        localStorage.setItem(`quiz_result_${username}`, JSON.stringify(updated))
        addQuizToHistory(username, updated)
      }

      return updated
    })
  }

  const resetQuiz = (): void => {
    setSession(null)
    if (username) {
      clearQuizSession(username)
    }
  }

  const getLastResult = (): QuizSession | null => {
    if (!username) return null
    const raw = localStorage.getItem(`quiz_result_${username}`)
    if (!raw) return null
    try {
      return JSON.parse(raw) as QuizSession
    } catch {
      return null
    }
  }

  return {
    session,
    isLoading,
    error,
    startNewQuiz,
    answerQuestion,
    finishQuiz,
    resetQuiz,
    getLastResult,
    hasActiveSession: session !== null && !session.isFinished,
  }
}
