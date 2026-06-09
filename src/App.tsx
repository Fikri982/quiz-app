import { useState } from 'react'
import { 
  Brain, 
  Play, 
  Plus, 
  Trophy, 
  Settings, 
  History, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  User, 
  ArrowUpRight 
} from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'create' | 'leaderboard'>('home')

  // Mock quizzes
  const featuredQuizzes = [
    {
      id: 1,
      title: "Logika & Algoritma Dasar",
      description: "Uji kemampuan berpikir komputasional dan konsep algoritma fundamental Anda.",
      questionsCount: 15,
      duration: "20 Menit",
      difficulty: "Sedang",
      category: "Teknologi",
      color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400"
    },
    {
      id: 2,
      title: "Web Development Modern",
      description: "Pertanyaan seputar React, TypeScript, Tailwind CSS, dan ekosistem frontend terbaru.",
      questionsCount: 10,
      duration: "15 Menit",
      difficulty: "Sulit",
      category: "Web Dev",
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400"
    },
    {
      id: 3,
      title: "Pengetahuan Umum & Sains",
      description: "Eksplorasi fakta menarik seputar sains, fisika, sejarah, dan geografi dunia.",
      questionsCount: 20,
      duration: "25 Menit",
      difficulty: "Mudah",
      category: "Sains",
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400"
    }
  ]

  return (
    <div className="min-h-screen bg-[#070b19] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))] text-slate-100 flex flex-col font-sans">
      {/* Navbar */}
      <header className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-[#070b19]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-linear-to-tr from-violet-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              KuisKu
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'home' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Beranda
            </button>
            <button 
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'create' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Buat Kuis
            </button>
            <button 
              onClick={() => setActiveTab('leaderboard')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'leaderboard' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Papan Skor
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-slate-800/80 rounded-lg text-slate-400 hover:text-slate-200 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="h-8 w-px bg-slate-800"></div>
            <button className="flex items-center space-x-2 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 transition-all">
              <User className="w-4 h-4" />
              <span>Masuk</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Platform Kuis Modern</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-linear-to-b from-white to-slate-400 bg-clip-text text-transparent leading-none">
            Asah Otakmu dengan Kuis Interaktif
          </h1>
          
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            Uji wawasan Anda dalam berbagai kategori pemrograman, logika, dan ilmu pengetahuan dasar. Serta buat kuis kustom Anda sendiri untuk dibagikan dengan teman.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setActiveTab('home')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 py-3.5 rounded-xl font-semibold shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Mulai Bermain</span>
            </button>
            <button 
              onClick={() => setActiveTab('create')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 px-8 py-3.5 rounded-xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Buat Kuis Baru</span>
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full mb-20">
          {[
            { label: "Kuis Aktif", value: "24", icon: BookOpen, color: "text-blue-400" },
            { label: "Total Pemain", value: "1,240+", icon: User, color: "text-purple-400" },
            { label: "Kuis Diselesaikan", value: "5,800+", icon: Trophy, color: "text-amber-400" },
            { label: "Waktu Rata-rata", value: "12m", icon: History, color: "text-emerald-400" },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl flex flex-col items-center text-center backdrop-blur-sm">
              <div className={`p-3 rounded-xl bg-slate-800/60 mb-3 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white mb-1">{stat.value}</span>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </section>

        {/* Features / Main Sections */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Daftar Kuis Unggulan</h2>
              <p className="text-sm text-slate-400">Pilih kuis di bawah ini dan uji seberapa jauh pengetahuanmu!</p>
            </div>
            <button className="flex items-center space-x-1 text-sm text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              <span>Lihat Semua</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredQuizzes.map((quiz) => (
              <div 
                key={quiz.id}
                className={`group relative bg-linear-to-b ${quiz.color.split(' ').slice(0, 2).join(' ')} border ${quiz.color.split(' ').slice(2, 3).join('')} p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-950/20 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/60 border border-slate-800 text-slate-300">
                      {quiz.category}
                    </span>
                    <span className={`text-xs font-medium uppercase tracking-wide px-2 py-0.5 rounded ${quiz.difficulty === 'Mudah' ? 'text-emerald-400 bg-emerald-500/10' : quiz.difficulty === 'Sedang' ? 'text-amber-400 bg-amber-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {quiz.description}
                  </p>
                </div>

                <div className="border-t border-slate-800/60 pt-4 flex items-center justify-between">
                  <div className="text-xs text-slate-400 space-y-0.5">
                    <div>{quiz.questionsCount} Pertanyaan</div>
                    <div>Durasi: {quiz.duration}</div>
                  </div>
                  <button className="p-3 bg-white hover:bg-indigo-100 text-slate-950 rounded-2xl font-bold shadow transition-all hover:scale-105 active:scale-95 flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#040813] py-8 text-center text-xs text-slate-500 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 KuisKu. Dibuat untuk kesenangan belajar.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Tentang Kami</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Bantuan</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
