import { useState } from 'react'
import { Brain, User, LogOut } from 'lucide-react'
import { HomeView } from './components/HomeView'
import { LeaderboardView } from './components/LeaderboardView'
import { useAuth } from './hooks/useAuth'
import type { LeaderboardItem } from './components/LeaderboardView'

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'leaderboard'>('home')
  const { username, isLoggedIn, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setActiveTab('home')
  }

  // Mock Leaderboard Data
  const leaderboardData: LeaderboardItem[] = [
    { rank: 1, name: "Ahmad Fauzi", score: 950, date: "9 Juni 2026", medal: "🥇" },
    { rank: 2, name: "Siti Rahma", score: 900, date: "9 Juni 2026", medal: "🥈" },
    { rank: 3, name: "Budi Santoso", score: 850, date: "8 Juni 2026", medal: "🥉" },
    { rank: 4, name: "Diana Putri", score: 800, date: "8 Juni 2026", medal: "" },
    { rank: 5, name: "Rian Hidayat", score: 750, date: "7 Juni 2026", medal: "" }
  ]

  return (
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.08),rgba(255,255,255,0))] text-slate-800 flex flex-col font-sans">
      {/* Navbar */}
      <header className="border-b border-slate-200/80 backdrop-blur-md sticky top-0 z-50 bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-linear-to-tr from-blue-600 to-blue-500 p-2 rounded-xl shadow-md shadow-blue-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Quiz App
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === 'home' ? 'bg-slate-100 text-slate-900 shadow-xs border border-slate-200/30' : 'text-slate-500 hover:text-slate-950'}`}
            >
              Beranda
            </button>
            <button 
              onClick={() => setActiveTab('leaderboard')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === 'leaderboard' ? 'bg-slate-100 text-slate-900 shadow-xs border border-slate-200/30' : 'text-slate-500 hover:text-slate-950'}`}
            >
              Papan Skor
            </button>
          </nav>

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

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center">
        {activeTab === 'home' ? (
          <HomeView />
        ) : (
          <LeaderboardView data={leaderboardData} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400 mt-20">
        <p>© 2026 Quiz App. Dibuat untuk kesenangan belajar.</p>
      </footer>
    </div>
  )
}

export default App
