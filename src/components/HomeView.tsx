import React, { useState } from 'react'
import { Sparkles, User, Play, ChevronRight, Lock, UserPlus, LogIn } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export const HomeView: React.FC = () => {
  const { isLoggedIn, username, login, register } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [inputName, setInputName] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')

    if (mode === 'register') {
      const err = await register(inputName, inputPassword)
      if (err) {
        setError(err)
      } else {
        setSuccessMsg('Akun berhasil dibuat! Silakan masuk.')
        setMode('login')
        setInputPassword('')
      }
    } else {
      const err = await login(inputName, inputPassword)
      if (err) {
        setError(err)
      }
    }
  }

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    setError('')
    setSuccessMsg('')
    setInputPassword('')
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-4">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Aplikasi Kuis Minimalis</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-linear-to-b from-slate-900 to-slate-700 bg-clip-text text-transparent leading-none">
          Uji Wawasan Anda Sekarang
        </h1>
        <p className="text-base text-slate-500">
          Uji kemampuan logika, pemrograman, dan pengetahuan umum secara interaktif dan cepat.
        </p>
      </div>

      <div className="max-w-md w-full bg-white border border-slate-200 p-8 rounded-3xl shadow-xl shadow-slate-100">
        {!isLoggedIn ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${mode === 'login' ? 'bg-blue-50 border-blue-100' : 'bg-violet-50 border-violet-100'}`}>
                {mode === 'login' ? (
                  <LogIn className="w-6 h-6 text-blue-600" />
                ) : (
                  <UserPlus className="w-6 h-6 text-violet-600" />
                )}
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                {mode === 'login' ? 'Masuk ke Akun Anda' : 'Buat Akun Baru'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {mode === 'login'
                  ? 'Masukkan Nama Pengguna dan Kata Sandi Anda untuk melanjutkan.'
                  : 'Daftarkan Nama Pengguna dan Kata Sandi Anda.'}
              </p>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-medium px-4 py-3 rounded-xl">
                {successMsg}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="username" className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Nama Pengguna
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  id="username"
                  type="text"
                  required
                  placeholder="Masukkan nama Anda..."
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-hidden transition-all bg-slate-50/50 text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  required
                  minLength={4}
                  placeholder={mode === 'register' ? 'Minimal 4 karakter...' : 'Masukkan kata sandi...'}
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-hidden transition-all bg-slate-50/50 text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full mt-2 flex items-center justify-center space-x-2 text-white py-3.5 rounded-xl font-semibold shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-sm ${
                mode === 'login'
                  ? 'bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-500/10'
                  : 'bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 shadow-violet-500/10'
              }`}
            >
              <span>{mode === 'login' ? 'Masuk' : 'Daftar'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <p className="text-center text-xs text-slate-400 pt-2">
              {mode === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
              <button
                type="button"
                onClick={switchMode}
                className="text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                {mode === 'login' ? 'Daftar sekarang' : 'Masuk di sini'}
              </button>
            </p>
          </form>
        ) : (
          <div className="text-center space-y-6 py-2">
            <div>
              <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <Play className="w-6 h-6 text-emerald-600 fill-emerald-600/10" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Halo, {username}! 👋</h2>
              <p className="text-xs text-slate-400 mt-1">Anda sudah masuk dan siap untuk menguji kemampuan Anda.</p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left text-xs text-slate-500 space-y-2">
              <div className="flex justify-between">
                <span>Status Akun:</span>
                <span className="font-semibold text-emerald-600">Aktif</span>
              </div>
              <div className="flex justify-between">
                <span>Tipe Permainan:</span>
                <span className="font-semibold text-slate-700">Pilihan Ganda (OpenTDB API)</span>
              </div>
            </div>

            <button
              className="w-full flex items-center justify-center space-x-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3.5 rounded-xl font-semibold shadow-md shadow-blue-500/10 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Mulai Kuis Baru</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
