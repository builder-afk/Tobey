import { Trophy, Flame, Target, Star, Award, Zap, TrendingUp, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuizDashboard() {
  const quizzes = [
    { topic: 'Dynamic Programming II', score: '19/20', pc: 95, date: 'Today', status: 'Excellent', badgeBg: 'bg-[#CCFF00]' },
    { topic: 'System Design: Consistency', score: '15/20', pc: 75, date: 'Yesterday', status: 'Good', badgeBg: 'bg-[#00F0FF]' },
    { topic: 'Graph Traversal (Hard)', score: '12/20', pc: 60, date: '3 days ago', status: 'Average', badgeBg: 'bg-[#FFDE59]' },
    { topic: 'Bit Manipulation Mastery', score: '18/20', pc: 90, date: '5 days ago', status: 'Excellent', badgeBg: 'bg-[#CCFF00]' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
      {/* Top Banner: Profile & Streaks */}
      <div className="flex flex-col md:flex-row gap-8 mb-10 items-center md:items-start bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000]">
        {/* Avatar */}
        <div className="w-28 h-28 bg-[#FAF8F5] border-4 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center text-5xl relative shrink-0">
          🧑‍💻
          <div className="absolute -bottom-3 -right-2 bg-[#CCFF00] text-black font-mono font-black text-[11px] px-2.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] uppercase tracking-wider">
            LVL 14
          </div>
        </div>

        {/* Profile Details */}
        <div className="text-center md:text-left flex-1 min-w-0">
          <div className="inline-block bg-[#FFDE59] border-2 border-black font-mono font-black text-xs px-3 py-1 text-black shadow-[2px_2px_0px_#000] mb-2 uppercase">
            🏆 RANK #342 • TOP 2% IN GLOBAL CONTESTS
          </div>
          <h1 className="text-3xl md:text-4xl font-mono font-black uppercase tracking-tight text-black mb-3">
            Alex Developer
          </h1>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="px-3 py-1 bg-[#FAF8F5] border-2 border-black font-mono text-xs font-black text-black shadow-[2px_2px_0px_#000] uppercase">
              Software Engineer II
            </span>
            <span className="px-3 py-1 bg-[#FAF8F5] border-2 border-black font-mono text-xs font-black text-black shadow-[2px_2px_0px_#000] uppercase">
              Targeting FAANG
            </span>
            <span className="px-3 py-1 bg-[#00F0FF] border-2 border-black font-mono text-xs font-black text-black shadow-[2px_2px_0px_#000] uppercase">
              Active Solver
            </span>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="flex gap-4 shrink-0">
          <div className="flex flex-col items-center justify-center bg-[#FFDE59] border-3 border-black w-24 sm:w-28 h-24 sm:h-28 shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-transform">
            <Flame size={26} strokeWidth={2.5} className="text-black mb-1" />
            <span className="font-mono font-black text-2xl text-black">45</span>
            <span className="font-mono text-[9px] font-black text-black uppercase tracking-widest">Day Streak</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#00F0FF] border-3 border-black w-24 sm:w-28 h-24 sm:h-28 shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-transform">
            <Trophy size={26} strokeWidth={2.5} className="text-black mb-1" />
            <span className="font-mono font-black text-2xl text-black">4.2k</span>
            <span className="font-mono text-[9px] font-black text-black uppercase tracking-widest">Total Pts</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Quiz Performance & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Recent Quiz Performance */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b-3 border-black pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-black text-[#CCFF00] flex items-center justify-center font-mono font-black text-sm border-2 border-black shadow-[2px_2px_0px_#000]">
                ⚡
              </div>
              <h2 className="text-2xl font-mono font-black uppercase tracking-tight text-black">
                Recent Quiz Performance
              </h2>
            </div>
            <Link 
              to="/quizzes" 
              className="text-xs font-mono font-black uppercase bg-[#FAF8F5] hover:bg-[#FFDE59] text-black border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1"
            >
              <span>Take New Quiz</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {quizzes.map((q, i) => (
              <div 
                key={i} 
                className="bg-white border-3 border-black shadow-[4px_4px_0px_#000] p-5 hover:translate-x-1 transition-transform"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] font-black uppercase bg-black text-white px-2 py-0.5">
                        QUIZ #{String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-mono text-xs font-bold text-neutral-500 uppercase">{q.date}</span>
                    </div>
                    <h4 className="font-mono font-black text-base text-black uppercase tracking-tight">
                      {q.topic}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 ${q.badgeBg} border-2 border-black font-mono font-black text-xs uppercase shadow-[2px_2px_0px_#000]`}>
                      {q.status}
                    </span>
                    <div className="bg-[#FAF8F5] border-2 border-black px-3 py-1 text-right shadow-[2px_2px_0px_#000]">
                      <span className="font-mono font-black text-lg text-black">{q.score}</span>
                      <span className="font-mono text-[10px] font-bold text-neutral-500 ml-1">({q.pc}%)</span>
                    </div>
                  </div>
                </div>

                {/* Accuracy Bar */}
                <div className="h-3 w-full bg-[#FAF8F5] border-2 border-black overflow-hidden shadow-[1px_1px_0px_#000]">
                  <div 
                    className={`h-full ${q.badgeBg} border-r-2 border-black transition-all duration-500`}
                    style={{ width: `${q.pc}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Badges & Achievements */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 border-b-3 border-black pb-3">
            <div className="w-8 h-8 bg-[#FF52D9] text-black flex items-center justify-center font-mono font-black text-sm border-2 border-black shadow-[2px_2px_0px_#000]">
              🎖️
            </div>
            <h2 className="text-2xl font-mono font-black uppercase tracking-tight text-black">
              Badges & Medals
            </h2>
          </div>

          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_#000] p-6 grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-4 bg-[#FFDE59] border-3 border-black shadow-[3px_3px_0px_#000] text-center hover:-translate-y-0.5 transition-transform">
              <Award size={32} strokeWidth={2.5} className="text-black mb-2" />
              <span className="font-mono text-xs font-black uppercase text-black">DP Master</span>
              <span className="font-mono text-[9px] font-bold text-neutral-700 mt-1 uppercase">Tier 1 Unlocked</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-[#00F0FF] border-3 border-black shadow-[3px_3px_0px_#000] text-center hover:-translate-y-0.5 transition-transform">
              <Zap size={32} strokeWidth={2.5} className="text-black mb-2" />
              <span className="font-mono text-xs font-black uppercase text-black">Speed Coder</span>
              <span className="font-mono text-[9px] font-bold text-neutral-700 mt-1 uppercase">Top 5% Submissions</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-[#CCFF00] border-3 border-black shadow-[3px_3px_0px_#000] text-center hover:-translate-y-0.5 transition-transform">
              <Target size={32} strokeWidth={2.5} className="text-black mb-2" />
              <span className="font-mono text-xs font-black uppercase text-black">100% Accuracy</span>
              <span className="font-mono text-[9px] font-bold text-neutral-700 mt-1 uppercase">3 In A Row</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-[#FF52D9] border-3 border-black shadow-[3px_3px_0px_#000] text-center hover:-translate-y-0.5 transition-transform">
              <Star size={32} strokeWidth={2.5} className="text-black mb-2" />
              <span className="font-mono text-xs font-black uppercase text-black">Top 1% Club</span>
              <span className="font-mono text-[9px] font-bold text-neutral-800 mt-1 uppercase">FAANG Ready</span>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="bg-[#FAF8F5] border-3 border-black p-4 shadow-[4px_4px_0px_#000] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} strokeWidth={2.5} className="text-black" />
              <span className="font-mono text-xs font-black uppercase text-black">Curriculum Completion</span>
            </div>
            <span className="bg-[#CCFF00] border-2 border-black font-mono font-black text-xs px-2.5 py-0.5 shadow-[2px_2px_0px_#000]">
              78%
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}