import React, { useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import { Clock, HelpCircle } from 'lucide-react'
import { useQuiz } from '../hooks/useQuiz'
import { DIFFICULTY_TIMES } from '../utils/quiz'
import { Card } from './ui/Card'
import { ProgressBar } from './ui/ProgressBar'

export const QuizPlay: React.FC = () => {
  const { session, answerQuestion } = useQuiz()

  const currentIndex = session?.currentIndex
  const questions = session?.questions

  const options = useMemo(() => {
    if (!questions || currentIndex === undefined) return []
    const currentQuestion = questions[currentIndex]
    if (!currentQuestion) return []

    const list = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers]

    let seed = 0
    const qText = currentQuestion.question
    for (let i = 0; i < qText.length; i++) {
      seed = (seed << 5) - seed + qText.charCodeAt(i)
      seed |= 0
    }
    seed = Math.abs(seed)

    const shuffled = [...list]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const x = Math.sin(seed++) * 10000
      const pseudoRandom = x - Math.floor(x)
      const j = Math.floor(pseudoRandom * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [currentIndex, questions])

  if (!session || !questions || currentIndex === undefined) {
    return <Navigate to="/dashboard" replace />
  }
  if (session.isFinished) {
    return <Navigate to="/result" replace />
  }

  const { timeRemaining, difficulty } = session
  const currentQuestion = questions[currentIndex]

  const handleAnswer = (answer: string) => {
    answerQuestion(answer)
  }
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const totalTime = DIFFICULTY_TIMES[difficulty] || 60
  const timePercent = (timeRemaining / totalTime) * 100
  const isTimeCritical = timeRemaining <= 15 || timePercent < 20

  const timerColorClass = isTimeCritical
    ? 'text-rose-600 bg-rose-50 border-rose-200 animate-pulse'
    : timePercent < 50
    ? 'text-amber-600 bg-amber-50 border-amber-200'
    : 'text-emerald-600 bg-emerald-50 border-emerald-200'

  const progressBarColorClass = isTimeCritical
    ? 'bg-rose-500'
    : timePercent < 50
    ? 'bg-amber-500'
    : 'bg-blue-600'

  const progressPercent = ((currentIndex + 1) / questions.length) * 100

  const optionLabels = ['A', 'B', 'C', 'D']

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <Card className="w-full p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="bg-blue-50 border border-blue-100 p-2.5 rounded-2xl text-blue-600 font-bold text-sm shrink-0">
            {currentIndex + 1} / {questions.length}
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">Kuis Matematika</h2>
            <p className="text-[11px] text-slate-400 capitalize">
              Tingkat Kesulitan: <strong>{difficulty}</strong>
            </p>
          </div>
        </div>

        <div className={`flex items-center space-x-2 border px-4 py-2 rounded-2xl font-mono text-sm font-bold transition-all shrink-0 ${timerColorClass}`}>
          <Clock className="w-4 h-4" />
          <span>{formatTime(timeRemaining)}</span>
        </div>
      </Card>

      <ProgressBar value={progressPercent} className="mb-8" />

      <ProgressBar
        value={timePercent}
        colorClass={progressBarColorClass}
        heightClass="h-1"
        bgClass="bg-slate-100"
        transitionClass="duration-1000 ease-linear"
        className="mb-8 -mt-6"
      />

      <Card className="w-full p-8 sm:p-10 mb-6 relative">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-5">
          <HelpCircle className="w-40 h-40" />
        </div>

        <div className="relative z-10">
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
            Pertanyaan ke-{currentIndex + 1}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mt-4 leading-relaxed">
            {currentQuestion.question}
          </h1>
        </div>
      </Card>

      <div className="w-full grid grid-cols-1 gap-4 mb-8">
        {options.map((option, idx) => (
          <Card
            key={idx}
            hoverable={true}
            onClick={() => handleAnswer(option)}
            role="button"
            className="w-full flex items-center space-x-4 p-5 rounded-2xl text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center font-bold text-sm text-slate-600 shrink-0 transition-colors">
              {optionLabels[idx] || '?'}
            </div>
            <span className="text-slate-700 font-medium text-sm sm:text-base leading-snug">
              {option}
            </span>
          </Card>
        ))}
      </div>
    </div>
  )
}
