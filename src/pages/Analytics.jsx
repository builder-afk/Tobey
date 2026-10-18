import React, { useState } from 'react';
import { 
  Target, TrendingUp, Clock, AlertTriangle, Sparkles, Zap, 
  Trophy, Medal, Crown, ChevronDown, ChevronUp, User, Flame, 
  Star, Award, Search, ArrowUpRight, BarChart3, Eye, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { leaderboardData } from '../data/mockLeaderboard';

export default function Analytics() {
  const navigate = useNavigate();
  const [leaderboardSearch, setLeaderboardSearch] = useState('');

  const filteredLeaderboard = leaderboardData.filter(p => 
    p.name.toLowerCase().includes(leaderboardSearch.toLowerCase()) || 
    p.username.toLowerCase().includes(leaderboardSearch.toLowerCase())
  );

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <div className="w-8 h-8 bg-[#FFDE59] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
          <Crown size={16} className="text-black" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-8 h-8 bg-[#00F0FF] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
          <Medal size={16} className="text-black" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-8 h-8 bg-[#FF52D9] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
          <Medal size={16} className="text-black" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 bg-[#F0EDE6] border-2 border-black flex items-center justify-center font-black text-xs text-black shadow-[1px_1px_0px_#000]">
        #{rank}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-transparent font-mono text-black select-none">
      <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">

        {/* ═══════════════════════════════════════════
            LEADERBOARD SECTION
            ═══════════════════════════════════════════ */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] overflow-hidden">
          
          {/* Leaderboard Header */}
          <div className="p-6 border-b-4 border-black bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#FFDE59] border-3 border-black flex items-center justify-center shadow-[3px_3px_0px_#000]">
                <Trophy size={24} className="text-black" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight">
                    Global Leaderboard
                  </h3>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#CCFF00] border border-black shadow-[1px_1px_0px_#000]">
                    LIVE
                  </span>
                </div>
                <p className="text-xs text-gray-700 font-bold uppercase tracking-wider mt-0.5">
                  {leaderboardData.length} PLAYERS RANKED // REAL-TIME COHORT TELEMETRY
                </p>
              </div>
            </div>

            <div className="relative w-full sm:w-72">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" />
              <input
                type="text"
                placeholder="SEARCH PLAYERS..."
                value={leaderboardSearch}
                onChange={e => setLeaderboardSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#FBF9F5] border-3 border-black text-black text-xs font-black uppercase placeholder-gray-500 shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDE8] transition-all"
              />
            </div>
          </div>

          {/* Top 3 Podium Cards */}
          <div className="p-6 pb-2 bg-[#F0EDE6] border-b-4 border-black">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {leaderboardData.slice(0, 3).map((player, i) => {
                const order = [1, 0, 2]; // 2nd, 1st, 3rd
                const p = leaderboardData[order[i]];
                const isFirst = order[i] === 0;
                const isSecond = order[i] === 1;

                const cardBg = isFirst ? 'bg-[#FFDE59]' : isSecond ? 'bg-[#00F0FF]' : 'bg-[#FF52D9]';
                const cardShadow = isFirst ? 'shadow-[6px_6px_0px_#000]' : 'shadow-[4px_4px_0px_#000]';

                return (
                  <motion.div
                    key={p.rank}
                    whileHover={{ y: -3 }}
                    onClick={() => navigate(`/profile/${p.username.replace('@', '')}`)}
                    className={`relative cursor-pointer p-5 text-center border-4 border-black ${cardBg} ${cardShadow} transition-all flex flex-col justify-between`}
                  >
                    {isFirst && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-black text-[#FFDE59] border-2 border-black text-[10px] font-black uppercase flex items-center gap-1 shadow-[2px_2px_0px_#000]">
                        <Crown size={12} /> GRANDMASTER #1
                      </div>
                    )}
                    <div>
                      <div className="text-4xl mb-2 mt-1">{p.avatar}</div>
                      <div className="text-base font-black text-black uppercase truncate">{p.name}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-black text-white inline-block mt-1">
                        {p.tier}
                      </div>
                      <div className="text-3xl font-black text-black mt-3 leading-none">{p.score.toLocaleString()}</div>
                      <div className="text-[10px] text-black font-black uppercase tracking-widest mt-0.5">SCORE</div>
                    </div>
                    
                    <div className="mt-3 pt-2 border-t-2 border-black/40 flex items-center justify-center gap-1 text-[11px] font-black uppercase text-black">
                      <Flame size={14} className="fill-black" /> {p.streak}D STREAK
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Full Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black text-white border-b-4 border-black">
                  <th className="px-4 py-3.5 text-[10px] font-black uppercase tracking-widest w-16 text-center">RANK</th>
                  <th className="px-4 py-3.5 text-[10px] font-black uppercase tracking-widest">PLAYER</th>
                  <th className="px-4 py-3.5 text-[10px] font-black uppercase tracking-widest text-right hidden sm:table-cell">SCORE</th>
                  <th className="px-4 py-3.5 text-[10px] font-black uppercase tracking-widest text-right hidden md:table-cell">POINTS</th>
                  <th className="px-4 py-3.5 text-[10px] font-black uppercase tracking-widest text-right hidden md:table-cell">SOLVED</th>
                  <th className="px-4 py-3.5 text-[10px] font-black uppercase tracking-widest text-right hidden lg:table-cell">STREAK</th>
                  <th className="px-4 py-3.5 text-[10px] font-black uppercase tracking-widest text-right w-24">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaderboard.map((player) => (
                  <tr
                    key={player.rank}
                    className="hover:bg-[#FFFDE8] transition-colors border-b-2 border-black cursor-pointer group"
                    onClick={() => navigate(`/profile/${player.username.replace('@', '')}`)}
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center">
                        {getRankBadge(player.rank)}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center text-xl shadow-[2px_2px_0px_#000]">
                          {player.avatar}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-black text-black group-hover:underline uppercase truncate leading-tight">
                            {player.name}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-700 font-bold uppercase">{player.username}</span>
                            <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-[#FFDE59] border border-black text-black">
                              {player.tier}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right hidden sm:table-cell">
                      <span className="text-base font-black text-black">{player.score.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3.5 text-right hidden md:table-cell">
                      <span className="text-xs font-bold text-gray-700 uppercase">{player.points.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3.5 text-right hidden md:table-cell">
                      <span className="text-xs font-black text-black px-2 py-0.5 bg-[#CCFF00] border border-black">
                        {player.solved}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right hidden lg:table-cell">
                      <div className="flex items-center justify-end gap-1 text-xs font-black uppercase text-black">
                        <Flame size={14} className="fill-[#FF5722] text-[#FF5722]" />
                        <span>{player.streak}D</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/profile/${player.username.replace('@', '')}`); }}
                        className="px-2.5 py-1 bg-white border-2 border-black text-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] hover:bg-[#FFDE59] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                      >
                        [ VIEW → ]
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}