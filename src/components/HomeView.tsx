import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { User, ChevronRight, Lock, UserPlus, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '../hooks/useAuth'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import { InputField } from './ui/InputField'

export const HomeView: React.FC = () => {
  const { isLoggedIn, login, register } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [inputName, setInputName] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [error, setError] = useState('')

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (mode === 'register') {
      const err = await register(inputName, inputPassword)
      if (err) {
        setError(err)
      } else {
        toast.success('Akun berhasil dibuat! Silakan masuk.')
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
    setInputPassword('')
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-4">
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Aplikasi Kuis Matematika</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 md:mb-0 bg-linear-to-b from-slate-900 to-slate-700 bg-clip-text text-transparent leading-none md:leading-tight">
          Uji Wawasan Matematika Anda
        </h1>
      </div>

      <Card className="max-w-md w-full p-8 shadow-xl">
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

          <InputField
            id="username"
            label="Nama Pengguna"
            icon={<User className="h-4 w-4" />}
            type="text"
            required
            placeholder="Masukkan nama Anda..."
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />

          <InputField
            id="password"
            label="Kata Sandi"
            icon={<Lock className="h-4 w-4" />}
            type="password"
            required
            minLength={4}
            placeholder={mode === 'register' ? 'Minimal 4 karakter...' : 'Masukkan kata sandi...'}
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant={mode === 'login' ? 'primary' : 'secondary'}
            className="w-full mt-2 py-3.5"
          >
            <span>{mode === 'login' ? 'Masuk' : 'Daftar'}</span>
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>

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
      </Card>
    </div>
  )
}
