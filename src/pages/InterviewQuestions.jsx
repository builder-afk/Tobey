import { useState, useMemo } from 'react';
import { MessageSquare, ThumbsUp, Eye, Search, ChevronDown, ChevronUp, Building2, Filter, Sparkles, BookOpen } from 'lucide-react';
import interviewQuestionsData from '../data/interviewQuestionsData';

const CATEGORIES = ['All', 'Data Structures', 'Algorithms', 'System Design', 'Operating Systems', 'DBMS', 'Networking', 'OOP', 'Web Development', 'Behavioral'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];
const ROUNDS = ['All', 'Technical', 'System Design', 'HR/Behavioral'];
const COMPANIES = ['All Companies', 'Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Snapchat', 'Netflix', 'TCS', 'Infosys', 'Wipro', 'Startups'];

const ITEMS_PER_PAGE = 15;

const difficultyBadge = {
  Easy: 'bg-[#CCFF00] text-black border-2 border-black font-black',
  Medium: 'bg-[#FFDE59] text-black border-2 border-black font-black',
  Hard: 'bg-[#FF0033] text-white border-2 border-black font-black',
};

export default function InterviewQuestions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All Companies');
  const [selectedRound, setSelectedRound] = useState('All');
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return interviewQuestionsData.filter(q => {
      const matchSearch = !searchQuery || 
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.companies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCategory = selectedCategory === 'All' || q.category === selectedCategory;
      const matchDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const matchCompany = selectedCompany === 'All Companies' || q.companies.some(c => c.toLowerCase().includes(selectedCompany.toLowerCase()));
      const matchRound = selectedRound === 'All' || q.round === selectedRound;
      return matchSearch && matchCategory && matchDifficulty && matchCompany && matchRound;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedCompany, selectedRound]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const stats = useMemo(() => ({
    total: interviewQuestionsData.length,
    easy: interviewQuestionsData.filter(q => q.difficulty === 'Easy').length,
    medium: interviewQuestionsData.filter(q => q.difficulty === 'Medium').length,
    hard: interviewQuestionsData.filter(q => q.difficulty === 'Hard').length,
    categories: new Set(interviewQuestionsData.map(q => q.category)).size,
    companies: new Set(interviewQuestionsData.flatMap(q => q.companies)).size,
  }), []);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto w-full font-mono">
      {/* Top Banner Box */}
      <div className="border-4 border-black bg-white shadow-[6px_6px_0px_#000] p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-black pb-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00] border-2 border-black text-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] mb-3">
              <Sparkles size={14} className="stroke-[2.5]" /> Verified Interview Bank
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight">
              Interview <span className="bg-[#FFDE59] px-2 border-2 border-black shadow-[3px_3px_0px_#000]">Questions</span>
            </h1>
            <p className="text-neutral-700 font-bold text-xs md:text-sm mt-3 max-w-2xl">
              100 hand-curated, real interview questions asked at top tech companies — with complete technical solutions and concept deep-dives.
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          {[
            { label: 'TOTAL', value: stats.total, bg: 'bg-white', text: 'text-black' },
            { label: 'EASY', value: stats.easy, bg: 'bg-[#CCFF00]', text: 'text-black' },
            { label: 'MEDIUM', value: stats.medium, bg: 'bg-[#FFDE59]', text: 'text-black' },
            { label: 'HARD', value: stats.hard, bg: 'bg-[#FF0033]', text: 'text-white' },
            { label: 'TOPICS', value: stats.categories, bg: 'bg-[#00F0FF]', text: 'text-black' },
            { label: 'COMPANIES', value: `${stats.companies}+`, bg: 'bg-[#FF52D9]', text: 'text-black' },
          ].map(s => (
            <div key={s.label} className={`border-3 border-black ${s.bg} p-3 text-center shadow-[3px_3px_0px_#000]`}>
              <p className={`text-2xl font-black ${s.text}`}>{s.value}</p>
              <p className={`text-[10px] uppercase font-black tracking-wider ${s.text}`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black stroke-[2.5]" size={20} />
            <input 
              type="text" 
              placeholder="SEARCH BY TOPIC, QUESTION, COMPANY (E.G. GOOGLE), OR KEYWORD..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
              className="w-full border-3 border-black bg-[#F8F6F0] py-3.5 pl-12 pr-4 text-black font-mono font-bold text-sm placeholder:text-neutral-500 placeholder:font-normal focus:outline-none focus:bg-white shadow-[4px_4px_0px_#000] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            <select 
              value={selectedCategory} 
              onChange={(e) => { setSelectedCategory(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
              className="border-3 border-black bg-white px-3 py-2.5 text-black font-mono font-bold text-xs uppercase shadow-[3px_3px_0px_#000] outline-none cursor-pointer"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c === 'All' ? '📚 ALL TOPICS' : c.toUpperCase()}</option>)}
            </select>
            <select 
              value={selectedDifficulty} 
              onChange={(e) => { setSelectedDifficulty(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
              className="border-3 border-black bg-white px-3 py-2.5 text-black font-mono font-bold text-xs uppercase shadow-[3px_3px_0px_#000] outline-none cursor-pointer"
            >
              {DIFFICULTIES.map(d => <option key={d} value={d}>{d === 'All' ? '🎯 ANY DIFFICULTY' : d.toUpperCase()}</option>)}
            </select>
            <select 
              value={selectedCompany} 
              onChange={(e) => { setSelectedCompany(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
              className="border-3 border-black bg-white px-3 py-2.5 text-black font-mono font-bold text-xs uppercase shadow-[3px_3px_0px_#000] outline-none cursor-pointer"
            >
              {COMPANIES.map(c => <option key={c} value={c}>{c === 'All Companies' ? '🏢 ALL COMPANIES' : c.toUpperCase()}</option>)}
            </select>
            <select 
              value={selectedRound} 
              onChange={(e) => { setSelectedRound(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
              className="border-3 border-black bg-white px-3 py-2.5 text-black font-mono font-bold text-xs uppercase shadow-[3px_3px_0px_#000] outline-none cursor-pointer"
            >
              {ROUNDS.map(r => <option key={r} value={r}>{r === 'All' ? '🧑‍💻 ANY ROUND' : r.toUpperCase()}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Result Metrics */}
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-black font-mono font-black text-xs uppercase tracking-wider">
          SHOWING <span className="bg-[#FFDE59] px-1.5 py-0.5 border border-black">{visible.length}</span> OF <span className="bg-black text-white px-1.5 py-0.5">{filtered.length}</span> QUESTIONS
          {searchQuery && <span className="ml-2">FOR "{searchQuery.toUpperCase()}"</span>}
        </p>
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-4">
        {visible.length === 0 && (
          <div className="border-4 border-black bg-white p-12 text-center shadow-[6px_6px_0px_#000]">
            <BookOpen size={40} className="mx-auto mb-4 text-black stroke-[2.5]" />
            <p className="text-xl font-black uppercase text-black mb-1">NO QUESTIONS MATCH YOUR FILTERS</p>
            <p className="text-xs font-bold text-neutral-600">TRY ADJUSTING YOUR KEYWORD OR CHANGING THE TOPIC FILTERS.</p>
          </div>
        )}

        {visible.map((q) => {
          const isExpanded = expandedIds.has(q.id);
          return (
            <div 
              key={q.id} 
              className={`border-3 border-black bg-white shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all ${
                isExpanded ? 'border-4 shadow-[6px_6px_0px_#000] bg-[#FFFEF0]' : ''
              }`}
            >
              {/* Question Header */}
              <div 
                className="p-5 cursor-pointer select-none group" 
                onClick={() => toggleExpand(q.id)}
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="bg-black text-white font-mono font-black text-xs px-2 py-0.5 border border-black shrink-0 mt-0.5">
                      #{q.id}
                    </span>
                    <h3 className="font-black text-base md:text-lg text-black uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                      {q.title}
                    </h3>
                  </div>
                  <div className="shrink-0 p-1 border-2 border-black bg-white shadow-[2px_2px_0px_#000]">
                    {isExpanded ? (
                      <ChevronUp size={16} className="text-black stroke-[3]" />
                    ) : (
                      <ChevronDown size={16} className="text-black stroke-[3]" />
                    )}
                  </div>
                </div>
                
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 text-xs shadow-[2px_2px_0px_#000] uppercase ${difficultyBadge[q.difficulty] || 'bg-white text-black border-2 border-black'}`}>
                    {q.difficulty}
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#00F0FF] border-2 border-black text-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                    {q.category}
                  </span>
                  <span className="px-2 py-0.5 bg-[#F8F6F0] border-2 border-black text-black text-xs font-bold uppercase shadow-[1px_1px_0px_#000]">
                    {q.round}
                  </span>
                  <div className="flex flex-wrap gap-1 ml-1">
                    {q.companies.slice(0, 3).map(c => (
                      <span key={c} className="px-2 py-0.5 bg-white border border-black text-black font-bold text-[11px] uppercase">
                        {c}
                      </span>
                    ))}
                    {q.companies.length > 3 && (
                      <span className="px-2 py-0.5 bg-neutral-200 border border-black text-black font-bold text-[11px] uppercase">
                        +{q.companies.length - 3} MORE
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Expandable Detailed Answer Section */}
              {isExpanded && (
                <div className="border-t-3 border-black p-5 bg-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] border-2 border-black text-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] mb-3">
                    <Sparkles size={14} className="stroke-[2.5]" /> Verified Solution Breakdown
                  </div>
                  <div className="border-2 border-black bg-[#FFFEF0] p-4 text-black text-xs md:text-sm font-mono leading-relaxed whitespace-pre-line shadow-[3px_3px_0px_#000]">
                    {q.answer}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t-2 border-dashed border-neutral-300">
                    <span className="text-black text-xs font-black uppercase">Asked at:</span>
                    {q.companies.map(c => (
                      <span key={c} className="px-2 py-0.5 bg-[#CCFF00] border border-black text-black font-bold text-xs uppercase shadow-[1px_1px_0px_#000]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
        {hasMore && (
          <button 
            onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
            className="w-full mt-6 py-4 border-3 border-black bg-[#FFDE59] hover:bg-[#ffe57a] text-black font-mono font-black text-sm uppercase shadow-[5px_5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2"
          >
            <Sparkles size={16} className="stroke-[2.5]" />
            LOAD MORE QUESTIONS ({filtered.length - visibleCount} REMAINING)
          </button>
        )}
      </div>
    </div>
  );
}