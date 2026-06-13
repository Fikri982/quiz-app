import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { CheckCircle2, XCircle, AlertCircle, BarChart2, Home, HelpCircle } from 'lucide-react'
import { useQuiz } from '../hooks/useQuiz'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import { DifficultyBadge } from './ui/DifficultyBadge'

export const QuizResult: React.FC = () => {
  const navigate = useNavigate()
  const { getLastResult, resetQuiz } = useQuiz()

  const result = getLastResult()

  if (!result) {
    return <Navigate to="/dashboard" replace />
  }

  const { questions, answers, difficulty } = result

  const totalQuestions = questions.length
  const correctCount = answers.filter((ans, idx) => ans === questions[idx].correct_answer).length
  const skippedCount = answers.filter((ans) => ans === null).length
  const wrongCount = totalQuestions - correctCount - skippedCount
  const score = Math.round((correctCount / totalQuestions) * 100)
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / (totalQuestions - skippedCount || 1)) * 100) : 0

  let feedbackMessage = 'Ayo coba lagi!'
  let feedbackColor = 'text-rose-600'
  let feedbackBg = 'bg-rose-50 border-rose-100'

  if (score >= 80) {
    feedbackMessage = 'Luar Biasa! Kompetensi Hebat!'
    feedbackColor = 'text-emerald-600'
    feedbackBg = 'bg-emerald-50 border-emerald-100'
  } else if (score >= 60) {
    feedbackMessage = 'Kerja Bagus! Terus Tingkatkan!'
    feedbackColor = 'text-amber-600'
    feedbackBg = 'bg-amber-50 border-amber-100'
  }

  const handleBackToDashboard = () => {
    resetQuiz()
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-3">
          <BarChart2 className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Hasil Analisis Kuis</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
          Ringkasan Performa Anda
        </h1>
        <div className="mt-1 flex items-center justify-center space-x-1.5 text-xs text-slate-400 uppercase tracking-wide">
          <span>Tingkat Kesulitan:</span>
          <DifficultyBadge difficulty={difficulty} />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card className="p-8 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Skor Akhir</span>
          
          <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/20 mb-6">
            <div className="text-center">
              <span className="text-5xl font-black">{score}</span>
              <span className="block text-[10px] text-blue-100 font-medium mt-1">Skala 100</span>
            </div>
          </div>

          <div className={`w-full px-4 py-3 rounded-2xl border font-bold text-sm ${feedbackBg} ${feedbackColor} mb-6`}>
            {feedbackMessage}
          </div>

          <Button
            type="button"
            onClick={handleBackToDashboard}
            variant="dark"
            className="w-full py-3 text-xs"
            icon={<Home className="w-4 h-4" />}
          >
            Kembali ke Dashboard
          </Button>
        </Card>

        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <Card className="p-6 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Akurasi</span>
            <div className="mt-4">
              <span className="text-3xl font-extrabold text-slate-800">{accuracy}%</span>
              <p className="text-[10px] text-slate-400 mt-1">Rasio benar vs terjawab</p>
            </div>
          </Card>

          <Card className="p-6 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Benar</span>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-emerald-600">{correctCount}</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Soal terjawab dengan benar</p>
          </Card>

          <Card className="p-6 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Salah</span>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-rose-600">{wrongCount}</span>
              <XCircle className="w-5 h-5 text-rose-500" />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Soal dijawab tidak tepat</p>
          </Card>

          <Card className="p-6 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tidak Terjawab</span>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-amber-600">{skippedCount}</span>
              <AlertCircle className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Tidak sempat dijawab (waktu habis)</p>
          </Card>
        </div>
      </div>

      <Card className="w-full p-6 sm:p-8">
        <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-4 mb-6 flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <span>Tinjauan Detail Jawaban</span>
        </h3>

        <div className="space-y-6">
          {questions.map((q, idx) => {
            const userAnswer = answers[idx]
            const isCorrect = userAnswer === q.correct_answer
            const isSkipped = userAnswer === null

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'border-emerald-100 bg-emerald-50/10'
                    : isSkipped
                    ? 'border-amber-100 bg-amber-50/10'
                    : 'border-rose-100 bg-rose-50/10'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Pertanyaan {idx + 1}
                    </span>
                    <h4 className="font-semibold text-slate-800 mt-1 text-sm sm:text-base leading-relaxed">
                      {q.question}
                    </h4>
                  </div>
                  
                  <div className="shrink-0 mt-1">
                    {isCorrect ? (
                      <span className="inline-flex items-center space-x-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Benar</span>
                      </span>
                    ) : isSkipped ? (
                      <span className="inline-flex items-center space-x-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Waktu Habis</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                        <XCircle className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Salah</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Jawaban Anda</span>
                    <div className="mt-1 flex items-center space-x-1.5 font-medium">
                      {isSkipped ? (
                        <span className="text-amber-600 font-semibold italic">Tidak Terjawab (Kehabisan Waktu)</span>
                      ) : isCorrect ? (
                        <span className="text-emerald-600 font-semibold">{userAnswer}</span>
                      ) : (
                        <span className="text-rose-600 font-semibold">{userAnswer}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Kunci Jawaban</span>
                    <div className="mt-1 flex items-center space-x-1.5 font-semibold text-emerald-600">
                      <span>{q.correct_answer}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
