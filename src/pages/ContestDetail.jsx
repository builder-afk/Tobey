import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Target, Trophy, Filter, Search, 
  ArrowRight, CheckCircle2, XCircle, Folder, Swords, Sparkles, Check
} from 'lucide-react';
import contestsTracksData from '../data/contestsTracksData';

const mockLeaderboard = [
  { rank: 1, name: 'Prince Daniel', score: 410, badge: 'MASTER' },
  { rank: 2, name: 'Karthika Rajesh', score: 210, badge: 'ELITE' },
  { rank: 3, name: 'Sonu Kumar', score: 170, badge: 'PRO' },
  { rank: 4, name: 'Md Adnan Khan', score: 160, badge: 'PRO' },
  { rank: 5, name: 'Lavkush Jaiswal', score: 150, badge: 'CHALLENGER' },
];

export default function ContestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);

  // Lookup track in contestsTracksData
  const track = contestsTracksData.find(t => t.id === parseInt(id)) || contestsTracksData[0];
  const isDp = track.id === 3;
  const isIde = track.isIde;
  const [activeFolder, setActiveFolder] = useState(isDp ? null : 'root');

  const problems = track.problems || [];
  const contestTitle = track.title;
  const contestTopics = track.topics;

  const toggleDifficulty = (d) => {
    setDifficultyFilter(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  };
  const toggleStatus = (s) => {
    setStatusFilter(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const filteredProblems = problems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = difficultyFilter.length === 0 || difficultyFilter.includes(p.difficulty);
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(p.status);
    const matchesFolder = (isDp && activeFolder !== null) ? p.topic === activeFolder : true;
    return matchesSearch && matchesDifficulty && matchesStatus && matchesFolder;
  });

  const uniqueTopics = isDp ? Array.from(new Set(problems.map(p => p.topic).filter(Boolean))) : [];

  const easyCount = problems.filter(p => p.difficulty === 'Easy').length;
  const medCount = problems.filter(p => p.difficulty === 'Medium').length;
  const hardCount = problems.filter(p => p.difficulty === 'Hard').length;

  return (
    <div className="flex h-full flex-col overflow-y-auto custom-scrollbar font-mono pb-20">
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link 
            to="/contests" 
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] hover:bg-[#FFDE59] transition-colors"
          >
            <ChevronLeft size={16} /> [ BACK TO ARENAS ]
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
            <Swords size={14} className="stroke-[2.5]" />
            <span>TRACK #{id}</span>
          </div>
        </div>

        {/* Hero Header Plate */}
        <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000] mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight mb-2">
              {contestTitle}
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-700 uppercase flex items-center gap-2 mb-5">
              <Target size={16} className="text-black" /> // {contestTopics}
            </p>

            {/* Difficulty summary */}
            <div className="flex flex-wrap gap-3">
              <span className="text-xs font-black px-3 py-1 bg-[#CCFF00] border-2 border-black text-black shadow-[2px_2px_0px_#000] uppercase">
                {easyCount} EASY
              </span>
              <span className="text-xs font-black px-3 py-1 bg-[#FFDE59] border-2 border-black text-black shadow-[2px_2px_0px_#000] uppercase">
                {medCount} MEDIUM
              </span>
              <span className="text-xs font-black px-3 py-1 bg-[#FF0033] border-2 border-black text-white shadow-[2px_2px_0px_#000] uppercase">
                {hardCount} HARD
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#00F0FF] border-3 border-black p-5 shadow-[4px_4px_0px_#000] shrink-0 text-center flex-col justify-center">
            <span className="text-4xl font-black text-black">{problems.length}</span>
            <span className="text-[11px] text-black font-black uppercase tracking-wider">
              ACTIVE PROBLEMS
            </span>
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Problem List or Folders */}
          <div className="flex-1 w-full flex flex-col gap-4">
            
            {/* Search Bar */}
            <div className="bg-white border-4 border-black p-3 shadow-[5px_5px_0px_#000] flex items-center gap-3">
              <Search className="text-black shrink-0" size={18} />
              <input 
                type="text" 
                placeholder="SEARCH PROBLEMS BY TITLE..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent font-bold text-xs md:text-sm text-black uppercase placeholder-gray-500 focus:outline-none"
              />
            </div>

            {/* Folder breadcrumb if active */}
            {activeFolder !== null && (
              <div className="flex items-center justify-between text-xs font-black uppercase text-black bg-[#FAF8F5] border-2 border-black px-4 py-2 shadow-[2px_2px_0px_#000]">
                <span>SHOWING {filteredProblems.length} OF {problems.length} PROBLEMS</span>
                {isDp && (
                  <button 
                    onClick={() => setActiveFolder(null)}
                    className="text-xs font-black uppercase bg-[#FFDE59] border border-black px-2 py-0.5 hover:underline"
                  >
                    [ ← ALL FOLDERS ]
                  </button>
                )}
              </div>
            )}

            {/* Folder View or Problem List */}
            {activeFolder === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {uniqueTopics.map((topic, index) => {
                  const topicProblems = problems.filter(p => p.topic === topic);
                  const topicColors = ['bg-[#FFDE59]', 'bg-[#00F0FF]', 'bg-[#CCFF00]', 'bg-[#FF52D9]', 'bg-[#FF8811]'];
                  const color = topicColors[index % topicColors.length];

                  return (
                    <div 
                      key={topic}
                      onClick={() => setActiveFolder(topic)}
                      className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_#000] hover:shadow-[9px_9px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-14 h-14 border-3 border-black ${color} flex items-center justify-center shadow-[3px_3px_0px_#000] group-hover:rotate-3 transition-transform`}>
                            <Folder size={26} className="text-black stroke-[2.5]" />
                          </div>
                          <span className="px-3 py-1 bg-black text-white text-xs font-black uppercase border border-black shadow-[2px_2px_0px_#000]">
                            {topicProblems.length} PROBLEMS
                          </span>
                        </div>

                        <h3 className="text-xl font-black text-black uppercase mb-1 tracking-tight group-hover:text-blue-600 transition-colors">
                          {topic}
                        </h3>
                        <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed mb-6">
                          MASTER ALL {topicProblems.length} CHALLENGES IN THIS CATEGORY.
                        </p>
                      </div>

                      <div className="pt-4 border-t-2 border-black flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-black">START SOLVING</span>
                        <div className="p-2 bg-[#CCFF00] group-hover:bg-[#FFDE59] border-2 border-black shadow-[2px_2px_0px_#000]">
                          <ChevronRight size={16} className="text-black stroke-[3]" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredProblems.map((problem) => (
                  <div 
                    key={problem.id}
                    className="bg-white border-4 border-black p-5 shadow-[5px_5px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-0.5 bg-black text-white font-black text-xs uppercase border border-black">
                          #{problem.id}
                        </span>
                        <h3 className="text-base md:text-lg font-black text-black uppercase group-hover:text-blue-600 transition-colors flex items-center gap-2">
                          {problem.title}
                          {problem.status === 'solved' && <CheckCircle2 size={18} className="text-emerald-600" />}
                          {problem.status === 'wrong' && <XCircle size={18} className="text-rose-600" />}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className={`px-2 py-0.5 border border-black text-xs font-black uppercase ${
                          problem.difficulty === 'Easy' ? 'bg-[#CCFF00] text-black' :
                          problem.difficulty === 'Medium' ? 'bg-[#FFDE59] text-black' : 'bg-[#FF0033] text-white'
                        }`}>
                          {problem.difficulty}
                        </span>

                        <span className="px-2 py-0.5 bg-[#FAF8F5] border border-black text-xs font-bold text-black uppercase">
                          {problem.questions ? problem.questions.length : 0} Qs
                        </span>

                        <span className="px-2 py-0.5 bg-[#FAF8F5] border border-black text-xs font-bold text-black uppercase">
                          {problem.submissions || 0} SUBMISSIONS
                        </span>

                        <span className="px-2 py-0.5 bg-[#00F0FF] border border-black text-xs font-black text-black uppercase">
                          +{problem.maxPoints} PTS
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 pt-2 md:pt-0">
                      <button 
                        onClick={() => navigate(`/contests/${id}/${isIde ? 'ide' : 'solve'}/${problem.id}`)}
                        className="w-full md:w-auto px-5 py-2.5 bg-[#CCFF00] hover:bg-[#FFDE59] border-2 border-black font-black text-xs uppercase text-black flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                      >
                        <span>[ SOLVE CHALLENGE ]</span>
                        <ArrowRight size={14} className="stroke-[3]" />
                      </button>
                    </div>
                  </div>
                ))}

                {filteredProblems.length === 0 && (
                  <div className="bg-white border-4 border-black p-8 text-center shadow-[4px_4px_0px_#000]">
                    <span className="text-sm font-black uppercase">NO PROBLEMS MATCH CURRENT FILTERS</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Filters & Leaderboard */}
          <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
            
            {/* Filter Module */}
            <div className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_#000]">
              <h3 className="text-sm font-black text-black uppercase flex items-center gap-2 mb-4 pb-2 border-b-2 border-black">
                <Filter size={16} className="stroke-[2.5]" />
                <span>[ FILTER MATRIX ]</span>
              </h3>

              <div className="space-y-5">
                <div>
                  <h4 className="text-[11px] font-black uppercase text-gray-500 mb-2">STATUS</h4>
                  <div className="flex flex-col gap-2">
                    {['solved', 'unsolved', 'wrong'].map(s => {
                      const isChecked = statusFilter.includes(s);
                      return (
                        <button 
                          key={s} 
                          onClick={() => toggleStatus(s)} 
                          className="flex items-center gap-3 text-left p-1.5 hover:bg-[#FAF8F5] transition-colors"
                        >
                          <div className={`w-5 h-5 border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#000] ${
                            isChecked ? 'bg-[#00F0FF]' : 'bg-white'
                          }`}>
                            {isChecked && <Check size={14} className="stroke-[3] text-black" />}
                          </div>
                          <span className="text-xs font-black text-black uppercase">{s}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-black">
                  <h4 className="text-[11px] font-black uppercase text-gray-500 mb-2">DIFFICULTY</h4>
                  <div className="flex flex-col gap-2">
                    {['Easy', 'Medium', 'Hard'].map(d => {
                      const isChecked = difficultyFilter.includes(d);
                      return (
                        <button 
                          key={d} 
                          onClick={() => toggleDifficulty(d)} 
                          className="flex items-center gap-3 text-left p-1.5 hover:bg-[#FAF8F5] transition-colors"
                        >
                          <div className={`w-5 h-5 border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#000] ${
                            isChecked ? 'bg-[#CCFF00]' : 'bg-white'
                          }`}>
                            {isChecked && <Check size={14} className="stroke-[3] text-black" />}
                          </div>
                          <span className={`text-xs font-black uppercase ${
                            d === 'Easy' ? 'text-emerald-700' :
                            d === 'Medium' ? 'text-amber-700' : 'text-rose-700'
                          }`}>{d}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Leaderboard Module */}
            <div className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_#000]">
              <h3 className="text-sm font-black text-black uppercase flex items-center gap-2 mb-4 pb-2 border-b-2 border-black">
                <Trophy size={16} className="stroke-[2.5] text-amber-500" />
                <span>[ LEADERBOARD ]</span>
              </h3>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-wider pb-1">
                  <span className="w-8">POS</span>
                  <span className="flex-1">OPERATOR</span>
                  <span className="text-right">PTS</span>
                </div>
                {mockLeaderboard.map((user) => (
                  <div key={user.rank} className="flex justify-between items-center p-2 bg-[#FAF8F5] border-2 border-black shadow-[2px_2px_0px_#000]">
                    <span className={`w-8 font-black text-xs ${
                      user.rank === 1 ? 'text-[#FF8811]' :
                      user.rank === 2 ? 'text-gray-700' :
                      user.rank === 3 ? 'text-amber-800' : 'text-black'
                    }`}>
                      #{user.rank}
                    </span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="w-6 h-6 border border-black bg-[#FFDE59] flex items-center justify-center text-[10px] font-black">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-xs font-black text-black uppercase truncate">{user.name}</span>
                    </div>
                    <span className="text-xs font-black text-black px-1.5 py-0.5 bg-[#00F0FF] border border-black">
                      {user.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
