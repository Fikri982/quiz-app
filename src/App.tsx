import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { Brain, User, LogOut } from 'lucide-react'
import { Toaster } from 'sonner'
import { HomeView } from './components/HomeView'
import { DashboardView } from './components/DashboardView'
import { QuizPlay } from './components/QuizPlay'
import { QuizResult } from './components/QuizResult'
import { useAuth } from './hooks/useAuth'

interface ProtectedRouteProps {
  isLoggedIn: boolean
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}

function App() {
  const { username, isLoggedIn, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const homePath = isLoggedIn ? '/dashboard' : '/'

  return (
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.08),rgba(255,255,255,0))] text-slate-800 flex flex-col font-sans">
      <Toaster position="bottom-right" richColors />
      <header className="border-b border-slate-200/80 backdrop-blur-md sticky top-0 z-50 bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to={homePath} className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="bg-linear-to-tr from-blue-600 to-blue-500 p-2 rounded-xl shadow-md shadow-blue-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Quiz App
            </span>
          </Link>

          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">{username}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-rose-50 hover:text-rose-600 rounded-lg text-slate-400 transition-colors cursor-pointer"
                  title="Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-400 bg-slate-100/50 border border-slate-200/60 px-3 py-1.5 rounded-xl">
                <User className="w-3.5 h-3.5" />
                <span>Belum Masuk</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <DashboardView />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/quiz" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <QuizPlay />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/result" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <QuizResult />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to={homePath} replace />} />
        </Routes>
      </main>
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400 mt-20">
        <p>© 2026 Quiz App. Dibuat oleh @mfikrihidayat.</p>
      </footer>
    </div>
  )
}

export default App
