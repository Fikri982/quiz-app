import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Play, RefreshCw, LogOut, Calculator, HelpCircle, CheckCircle2, Trophy, History, Star, Percent } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '../hooks/useAuth'
import { DIFFICULTY_TIMES, getQuizHistory } from '../utils/quiz'
import { useQuiz } from '../hooks/useQuiz'
import type { Difficulty } from '../types/quiz'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import { DifficultyBadge } from './ui/DifficultyBadge'

export const DashboardView: React.FC = () => {
  const { isLoggedIn, username, logout } = useAuth()
  const navigate = useNavigate()
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const { startNewQuiz, isLoading, error: apiError, hasActiveSession: hasSavedSession } = useQuiz()

  const history = React.useMemo(() => {
    return username ? getQuizHistory(username) : []
  }, [username])

  const totalQuizzes = history.length
  const highestScore = totalQuizzes > 0 ? Math.max(...history.map((q) => q.score)) : 0
  
  const averageAccuracy = React.useMemo(() => {
    if (totalQuizzes === 0) return 0
    const totalCorrect = history.reduce((acc, q) => acc + q.correctCount, 0)
    const totalQuestionsCount = history.reduce((acc, q) => acc + q.totalQuestions, 0)
    return totalQuestionsCount > 0 ? Math.round((totalCorrect / totalQuestionsCount) * 100) : 0
  }, [history, totalQuizzes])

  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }

  const handleStartNewQuiz = async () => {
    if (hasSavedSession) {
      const confirmStart = window.confirm(
        'Anda memiliki kuis yang sedang berjalan. Mulai kuis baru akan menghapus progres sebelumnya. Lanjutkan?'
      )
      if (!confirmStart) return
    }

    try {
      await startNewQuiz(difficulty)
      navigate('/quiz')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat kuis.'
      toast.error(msg)
    }
  }

  const handleResumeQuiz = () => {
    navigate('/quiz')
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <div className="w-full bg-linear-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/10 mb-8 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10">
          <Calculator className="w-64 h-64" />
        </div>
        <div className="relative z-10">
          <span className="text-blue-100 text-xs font-semibold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
            Dashboard Utama
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-1">
            Halo, {username}! 👋
          </h1>
          <p className="text-blue-100 text-sm max-w-xl">
            Siap untuk menguji pengetahuan matematika anda? Pilih tingkat kesulitan kuis Matematika di bawah ini untuk memulai.
          </p>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-50 border border-blue-100 p-2.5 rounded-2xl">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Kuis Matematika</h2>
                <p className="text-xs text-slate-400">Pilih tingkat kesulitan untuk memuat soal.</p>
              </div>
            </div>

            {apiError && (
              <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium px-4 py-3 rounded-xl">
                {apiError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <button
                type="button"
                onClick={() => setDifficulty('easy')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  difficulty === 'easy'
                    ? 'border-emerald-500 bg-emerald-50/40 shadow-xs ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs mb-3 ${
                  difficulty === 'easy' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  A
                </div>
                <h3 className="font-bold text-slate-800 text-sm">Mudah</h3>
                <p className="text-[11px] text-slate-400 mt-1">Sangat cocok untuk pemanasan otak.</p>
              </button>

              <button
                type="button"
                onClick={() => setDifficulty('medium')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  difficulty === 'medium'
                    ? 'border-amber-500 bg-amber-50/40 shadow-xs ring-2 ring-amber-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs mb-3 ${
                  difficulty === 'medium' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  B
                </div>
                <h3 className="font-bold text-slate-800 text-sm">Sedang</h3>
                <p className="text-[11px] text-slate-400 mt-1">Menguji pengetahuan matematika dasar.</p>
              </button>

              <button
                type="button"
                onClick={() => setDifficulty('hard')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  difficulty === 'hard'
                    ? 'border-rose-500 bg-rose-50/40 shadow-xs ring-2 ring-rose-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs mb-3 ${
                  difficulty === 'hard' ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  C
                </div>
                <h3 className="font-bold text-slate-800 text-sm">Sulit</h3>
                <p className="text-[11px] text-slate-400 mt-1">Pemahaman matematika tingkat tinggi.</p>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {hasSavedSession && (
              <Button
                type="button"
                onClick={handleResumeQuiz}
                disabled={isLoading}
                variant="dark"
                className="flex-1 py-3.5"
                icon={<RefreshCw className="w-4 h-4 animate-spin-slow" />}
              >
                Lanjutkan Kuis
              </Button>
            )}
            <Button
              type="button"
              onClick={handleStartNewQuiz}
              isLoading={isLoading}
              variant="primary"
              className="flex-1 py-3.5"
              icon={<Play className="w-4 h-4 fill-current" />}
            >
              {isLoading ? 'Memuat Soal...' : 'Mulai Kuis Baru'}
            </Button>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3">
              Informasi Kuis
            </h3>

            <ul className="space-y-3.5 text-xs text-slate-500">
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Kategori: <strong>Science: Mathematics</strong></span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Jumlah Soal: <strong>10 Pilihan Ganda</strong></span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Waktu Pengerjaan: <strong>{DIFFICULTY_TIMES[difficulty] >= 60 ? `${DIFFICULTY_TIMES[difficulty] / 60} menit` : `${DIFFICULTY_TIMES[difficulty]} detik`}</strong> ({DIFFICULTY_TIMES[difficulty]} detik)</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Sesi disimpan otomatis jika browser tidak sengaja tertutup.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <Button
              type="button"
              onClick={logout}
              variant="danger"
              className="w-full py-3 text-xs"
              icon={<LogOut className="w-4 h-4" />}
            >
              Keluar dari Akun
            </Button>
          </div>
        </Card>
      </div>

      <div className="w-full mt-10">
        <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Statistik Pencapaian</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 rounded-2xl shadow-md flex items-center space-x-4">
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Kuis</span>
              <span className="text-2xl font-extrabold text-slate-800">{totalQuizzes}</span>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl shadow-md flex items-center space-x-4">
            <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl">
              <Trophy className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Skor Tertinggi</span>
              <span className="text-2xl font-extrabold text-slate-800">{highestScore}</span>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl shadow-md flex items-center space-x-4">
            <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl">
              <Percent className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rata-rata Akurasi</span>
              <span className="text-2xl font-extrabold text-slate-800">{averageAccuracy}%</span>
            </div>
          </Card>
        </div>
      </div>

      <div className="w-full">
        <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center space-x-2">
          <History className="w-5 h-5 text-indigo-500" />
          <span>Riwayat Aktivitas Kuis</span>
        </h3>

        {history.length === 0 ? (
          <Card className="p-8 text-center text-slate-400 text-xs sm:text-sm">
            Anda belum menyelesaikan kuis apa pun. Mulai kuis pertama Anda sekarang!
          </Card>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Tingkat Kesulitan</th>
                    <th className="px-6 py-4">Skor / Akurasi</th>
                    <th className="px-6 py-4 text-right">Tanggal Pengerjaan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 text-xs sm:text-sm">
                  {history.slice(0, 5).map((q) => {
                    return (
                      <tr key={q.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <DifficultyBadge difficulty={q.difficulty} />
                        </td>
                        <td className="px-6 py-4 font-semibold">
                          <span className={q.score >= 80 ? 'text-emerald-600' : q.score >= 60 ? 'text-amber-600' : 'text-rose-600'}>
                            {q.score}
                          </span>
                          <span className="text-slate-400 font-normal ml-1.5">
                            ({q.correctCount} / {q.totalQuestions} Benar)
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-slate-400 text-xs">
                          {q.date}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
