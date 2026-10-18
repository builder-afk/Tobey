import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { leetcodeData } from '../data/leetcodeData';
import { Swords, Star, Trophy, Target, Zap, Clock, Code2, Lock, ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function LeetcodeArena() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const filterProblems = () => {
    if (activeTab === 'all') return leetcodeData;
    return leetcodeData.filter(p => p.difficulty.toLowerCase() === activeTab);
  };

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Easy': return 'bg-[#CCFF00] text-black border-2 border-black shadow-[1px_1px_0px_#000]';
      case 'Medium': return 'bg-[#FFDE59] text-black border-2 border-black shadow-[1px_1px_0px_#000]';
      case 'Hard': return 'bg-[#FF0033] text-white border-2 border-black shadow-[1px_1px_0px_#000]';
      default: return 'bg-[#00F0FF] text-black border-2 border-black shadow-[1px_1px_0px_#000]';
    }
  };

  return (
    <div className="flex h-full flex-col font-mono pb-20 overflow-y-auto custom-scrollbar">
      {/* Header Banner */}
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Navigation & Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <button 
              onClick={() => navigate('/royale')}
              className="p-2 bg-white hover:bg-[#FFDE59] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center text-black"
            >
              <ArrowLeft size={16} className="stroke-[3]" />
            </button>
            <span className="px-3 py-1 bg-[#00F0FF] border-2 border-black text-black font-black uppercase text-xs shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
              <Swords size={14} className="stroke-[2.5]" /> [ COMBAT MODE ]
            </span>
            <span className="px-3 py-1 bg-[#FFDE59] border-2 border-black text-black font-black uppercase text-xs shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
              <Star size={14} className="stroke-[2.5]" fill="currentColor" /> [ PREMIUM ARENA ]
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight mb-4 flex items-center flex-wrap gap-3">
                LEETCODE
                <span className="bg-[#FF52D9] text-black px-3 py-1 border-4 border-black shadow-[5px_5px_0px_#000]">
                  GAUNTLET
                </span>
              </h1>
              <p className="text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide leading-relaxed bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000] max-w-2xl">
                // CONQUER THE TOP 50 CLASSIC INTERVIEW PROBLEMS. EARN XP, UNLOCK BADGES, AND MASTER DATA STRUCTURES & ALGORITHMS IN A HIGH-STAKES GAMIFIED ARENA.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000] min-w-[110px] text-center">
                <div className="text-2xl font-black text-black leading-none mb-1">50</div>
                <div className="text-[10px] font-black text-gray-600 uppercase">CHALLENGES</div>
              </div>
              <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000] min-w-[110px] text-center">
                <div className="text-2xl font-black text-emerald-600 leading-none mb-1">0</div>
                <div className="text-[10px] font-black text-gray-600 uppercase">COMPLETED</div>
              </div>
              <div className="bg-[#FFDE59] border-3 border-black p-4 shadow-[4px_4px_0px_#000] min-w-[110px] text-center">
                <div className="text-2xl font-black text-black leading-none mb-1 flex items-center justify-center gap-1">
                  0 <Zap size={18} fill="currentColor" />
                </div>
                <div className="text-[10px] font-black text-black uppercase">TOTAL XP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 bg-white p-2 border-3 border-black shadow-[4px_4px_0px_#000] w-fit flex-wrap">
          {['all', 'easy', 'medium', 'hard'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 border-2 border-black text-xs font-black uppercase transition-all shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
                activeTab === tab 
                  ? 'bg-[#CCFF00] text-black' 
                  : 'bg-[#FAF8F5] hover:bg-white text-gray-800'
              }`}
            >
              [ {tab} ]
            </button>
          ))}
        </div>

        {/* Problems List */}
        <div className="space-y-4">
          {filterProblems().map((problem) => (
            <div 
              key={problem.id}
              className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
              onClick={() => navigate(`/royale/leetcode/solve/${problem.id}`)}
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 border-2 border-black bg-[#FAF8F5] flex items-center justify-center font-mono font-black text-black text-base shadow-[2px_2px_0px_#000] flex-shrink-0">
                  {problem.id}
                </div>
                <div>
                  <h3 className="text-lg font-black text-black uppercase tracking-tight mb-1 group-hover:text-blue-600 transition-colors">
                    {problem.title}
                  </h3>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                    <span className="px-2 py-0.5 bg-[#FAF8F5] border border-black text-[10px] font-bold text-gray-700 uppercase">
                      {problem.tag}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-5 border-t-2 sm:border-t-0 pt-3 sm:pt-0 border-black">
                <div className="px-3 py-1 bg-[#FFDE59] border-2 border-black font-black text-xs text-black uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1">
                  <Zap size={14} fill="currentColor" /> +{problem.xp} XP
                </div>
                <button 
                  className="w-10 h-10 border-2 border-black bg-[#00F0FF] group-hover:bg-[#CCFF00] flex items-center justify-center text-black font-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  <ChevronRight size={18} className="stroke-[3]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
