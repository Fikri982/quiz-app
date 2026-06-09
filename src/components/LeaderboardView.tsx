import React from 'react'
import { Trophy } from 'lucide-react'

export interface LeaderboardItem {
  rank: number
  name: string
  score: number
  date: string
  medal: string
}

interface LeaderboardViewProps {
  data: LeaderboardItem[]
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ data }) => {
  return (
    <div className="max-w-2xl w-full mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-amber-50 border border-amber-100 p-2 rounded-xl">
          <Trophy className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Papan Skor Tertinggi</h2>
          <p className="text-xs text-slate-400">Daftar peringkat pemain terbaik di Quiz App.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <th className="pb-3 w-16">Peringkat</th>
              <th className="pb-3">Nama Pemain</th>
              <th className="pb-3 text-right">Skor</th>
              <th className="pb-3 text-right hidden sm:table-cell">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {data.map((player) => (
              <tr key={player.rank} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 font-bold text-slate-600">
                  {player.medal ? player.medal : `#${player.rank}`}
                </td>
                <td className="py-3.5 font-semibold text-slate-800">{player.name}</td>
                <td className="py-3.5 text-right font-bold text-blue-600">{player.score}</td>
                <td className="py-3.5 text-right text-slate-400 text-xs hidden sm:table-cell">{player.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
