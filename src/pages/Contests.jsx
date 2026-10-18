import React, { useState } from 'react';
import { 
  Trophy, Search, ArrowRight, Zap, Users, Flame, 
  Swords, Sparkles, Filter, CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import contestsTracksData from '../data/contestsTracksData';

export default function Contests() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const totalContests = contestsTracksData.reduce((a, c) => a + c.contests, 0);
  const totalActive = contestsTracksData.reduce((a, c) => a + c.active, 0);

  const categories = [
    { id: 'ALL', label: 'ALL ARENAS' },
    { id: 'algorithms', label: 'ALGORITHMS & DSA' },
    { id: 'systems', label: 'SYSTEMS & LOW-LEVEL' },
    { id: 'ai_ml', label: 'AI, ML & DATA' },
    { id: 'languages', label: 'LANGUAGES & STACKS' },
    { id: 'infra_sec', label: 'INFRA & SECURITY' },
    { id: 'career', label: 'CAREER & QUANT' },
  ];

  const filteredContests = contestsTracksData.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.topics.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'ALL' || c.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex h-full flex-col overflow-y-auto custom-scrollbar font-mono pb-20">
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* Protocol Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] text-black font-black text-xs uppercase tracking-wider mb-4">
          <Trophy size={14} className="stroke-[2.5]" />
          <span>[ 🏆 CONTEST PROTOCOL // REAL-TIME GLOBAL COMPETITION ARENA ]</span>
        </div>

        {/* Hero Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-black tracking-tight uppercase flex flex-wrap items-center gap-3">
              <span>CONTEST</span>
              <span className="bg-[#CCFF00] px-3 border-3 border-black text-black shadow-[4px_4px_0px_#000]">
                ARENA
              </span>
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-700 uppercase mt-2 max-w-2xl leading-relaxed">
              // SELECT YOUR ARENA TRACK. COMPETE IN REAL-TIME TIMED BATTLES ACROSS DSA, SYSTEMS, AI/ML, INFRA & HIGH-STAKES INTERVIEWS.
            </p>
          </div>

          {/* Counters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white border-3 border-black px-4 py-2.5 shadow-[4px_4px_0px_#000] flex flex-col">
              <span className="text-[10px] font-black uppercase text-gray-500">TOTAL TRACKS</span>
              <span className="text-xl font-black text-black">{contestsTracksData.length} ARENAS</span>
            </div>
            <div className="bg-white border-3 border-black px-4 py-2.5 shadow-[4px_4px_0px_#000] flex flex-col">
              <span className="text-[10px] font-black uppercase text-gray-500">CONTEST POOL</span>
              <span className="text-xl font-black text-black">{totalContests.toLocaleString()}</span>
            </div>
            <div className="bg-[#CCFF00] border-3 border-black px-4 py-2.5 shadow-[4px_4px_0px_#000] flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                <span className="text-[10px] font-black uppercase text-black">LIVE COMBAT</span>
              </div>
              <span className="text-xl font-black text-black">{totalActive} ACTIVE</span>
            </div>
            <div className="bg-[#00F0FF] border-3 border-black px-4 py-2.5 shadow-[4px_4px_0px_#000] flex flex-col">
              <span className="text-[10px] font-black uppercase text-black">OPERATORS</span>
              <span className="text-xl font-black text-black">24,850+</span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000] mb-8 flex flex-col gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" size={18} />
            <input 
              type="text"
              placeholder="SEARCH ARENA TRACKS (E.G. RUST, PYTHON, KUBERNETES, GRAPH THEORY, DP, SQL)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#FAF8F5] border-2 border-black pl-11 pr-4 py-2 text-xs md:text-sm font-bold text-black uppercase placeholder-gray-500 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_#000] transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t-2 border-black">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${
                  activeCategory === cat.id
                    ? 'bg-black text-white'
                    : 'bg-[#FAF8F5] text-black hover:bg-[#FFDE59]'
                }`}
              >
                [ {cat.label} ]
              </button>
            ))}
          </div>
        </div>

        {/* Grid Section - 24 Arena Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContests.map((contest) => {
            const ContestIcon = contest.icon;
            return (
              <div
                key={contest.id}
                onClick={() => navigate(`/contests/${contest.id}`)}
                className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Top Row: Icon + Live Pill */}
                  <div className="flex justify-between items-start mb-5">
                    <div className={`w-14 h-14 border-3 border-black ${contest.bgAccent} flex items-center justify-center shadow-[3px_3px_0px_#000] group-hover:rotate-3 transition-transform`}>
                      <ContestIcon size={28} className="text-black stroke-[2.5]" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-[#CCFF00] border-2 border-black shadow-[2px_2px_0px_#000]">
                      <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                      <span className="text-[11px] font-black text-black uppercase tracking-wider">
                        {contest.active} LIVE
                      </span>
                    </div>
                  </div>

                  {/* Title & Category Badge */}
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="text-xl font-black text-black uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                      {contest.title}
                    </h3>
                  </div>

                  {/* Topics Pill */}
                  <p className="text-[11px] font-bold text-gray-600 uppercase mb-4 leading-relaxed line-clamp-2">
                    // {contest.topics}
                  </p>

                  <div className="flex items-center gap-2 mb-6">
                    <span className="px-2.5 py-1 bg-[#FAF8F5] border border-black font-bold text-[11px] uppercase text-gray-700">
                      {contest.contests} TOTAL CONTESTS
                    </span>
                    <span className="px-2 py-0.5 bg-[#FFDE59] border border-black font-black text-[10px] uppercase text-black">
                      {contest.isIde ? 'CODE IDE' : 'EXAM QUIZ'}
                    </span>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-auto pt-4 border-t-2 border-black flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-black group-hover:underline">
                    [ ENTER ARENA TRACK ]
                  </span>
                  <div className="p-2 bg-[#FFDE59] group-hover:bg-[#CCFF00] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center transition-colors">
                    <ArrowRight size={16} className="text-black stroke-[3]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredContests.length === 0 && (
          <div className="bg-white border-4 border-black p-12 text-center shadow-[6px_6px_0px_#000] my-8">
            <h3 className="text-xl font-black uppercase mb-2">NO ARENAS FOUND</h3>
            <p className="text-sm font-bold text-gray-600 uppercase">Try refining your search keyword or reset the category filters.</p>
          </div>
        )}

      </div>
    </div>
  );
}
