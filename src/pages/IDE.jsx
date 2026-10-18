import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Terminal, 
  CheckCircle2, 
  Circle, 
  Play,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Building,
  Code2,
  BookOpen,
  Sparkles,
  Zap,
  TrendingUp,
  Flame,
  Award,
  ArrowRight,
  X,
  Hash,
  Clock,
  BarChart3,
  Target
} from 'lucide-react';
import { ideQuestionsList } from '../data/ideProblems';

const ITEMS_PER_PAGE = 50;

export default function IDE() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Derive filter options from imported data
  const languages = ['All', ...Array.from(new Set(ideQuestionsList.flatMap(q => q.languages))).sort()];
  const topics = ['All', ...Array.from(new Set(ideQuestionsList.map(q => q.topic))).sort()];
  const companies = ['All', ...Array.from(new Set(ideQuestionsList.flatMap(q => q.companies))).sort()];

  const filteredQuestions = useMemo(() => {
    const filtered = ideQuestionsList.filter(q => {
      const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLanguage = selectedLanguage === 'All' || q.languages.includes(selectedLanguage);
      const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
      const matchesCompany = selectedCompany === 'All' || q.companies.includes(selectedCompany);
      const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;

      return matchesSearch && matchesLanguage && matchesTopic && matchesCompany && matchesDifficulty;
    });
    return filtered;
  }, [searchQuery, selectedLanguage, selectedTopic, selectedCompany, selectedDifficulty]);

  // Pagination
  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);
  const paginatedQuestions = filteredQuestions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  useMemo(() => { setCurrentPage(1); }, [searchQuery, selectedLanguage, selectedTopic, selectedCompany, selectedDifficulty]);

  // Stats
  const totalCount = ideQuestionsList.length;
  const easyCount = filteredQuestions.filter(q => q.difficulty === 'Easy').length;
  const mediumCount = filteredQuestions.filter(q => q.difficulty === 'Medium').length;
  const hardCount = filteredQuestions.filter(q => q.difficulty === 'Hard').length;

  const hasActiveFilters = searchQuery || selectedLanguage !== 'All' || selectedTopic !== 'All' || selectedCompany !== 'All' || selectedDifficulty !== 'All';

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedLanguage('All');
    setSelectedTopic('All');
    setSelectedCompany('All');
    setSelectedDifficulty('All');
  };

  const getDifficultyBadge = (diff) => {
    switch(diff) {
      case 'Easy': 
        return 'bg-[#CCFF00] text-black border-2 border-black shadow-[2px_2px_0px_#000]';
      case 'Medium': 
        return 'bg-[#FFDE59] text-black border-2 border-black shadow-[2px_2px_0px_#000]';
      case 'Hard': 
        return 'bg-[#FF0033] text-white border-2 border-black shadow-[2px_2px_0px_#000]';
      default: 
        return 'bg-white text-black border-2 border-black shadow-[2px_2px_0px_#000]';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Solved': return <CheckCircle2 size={16} className="text-black fill-[#CCFF00]" />;
      case 'Attempted': return <Circle size={16} className="text-black fill-[#FFDE59]" />;
      default: return <Circle size={16} className="text-gray-400 stroke-2" />;
    }
  };

  return (
    <div className="flex h-full flex-col font-mono text-black overflow-y-auto pb-16 select-none">
      <div className="p-6 md:p-8 max-w-[1400px] mx-auto w-full">
        
        {/* ────────── Header ────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] border-2 border-black text-black text-xs font-black uppercase mb-3 shadow-[2px_2px_0px_#000]">
                <Terminal size={14} />
                <span>{`[ >. INTERACTIVE CODING ENVIRONMENT // ${totalCount} PROBLEMS ]`}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black uppercase text-black mb-2 tracking-tight">
                hypers <span className="bg-[#00F0FF] px-2 py-0.5 border-2 border-black shadow-[3px_3px_0px_#000] text-black inline-block">Workspace</span>
              </h1>
              <p className="text-gray-700 text-xs font-bold uppercase tracking-wider max-w-2xl leading-relaxed">
                Solve real-world coding problems with an in-browser IDE. Filter by language, company, or algorithm topic to streamline your interview prep.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="flex items-center gap-3">
              {[
                { label: 'Total', count: totalCount, icon: BarChart3, bg: 'bg-white', text: 'text-black' },
                { label: 'Easy', count: easyCount, icon: Zap, bg: 'bg-[#CCFF00]', text: 'text-black' },
                { label: 'Medium', count: mediumCount, icon: Flame, bg: 'bg-[#FFDE59]', text: 'text-black' },
                { label: 'Hard', count: hardCount, icon: Target, bg: 'bg-[#FF0033]', text: 'text-white' },
              ].map(stat => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={stat.label} 
                    className={`flex flex-col items-center justify-center w-20 h-20 ${stat.bg} ${stat.text} border-3 border-black shadow-[4px_4px_0px_#000] transition-transform hover:-translate-y-0.5`}
                  >
                    <Icon size={14} className="mb-0.5 stroke-[2.5]" />
                    <div className="text-xl font-black leading-none">{stat.count}</div>
                    <div className="text-[9px] font-black uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ────────── Bite-Sized Codebase Promo Banner ────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.03 }}
          className="p-5 mb-6 bg-black text-white border-4 border-black shadow-[6px_6px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono relative overflow-hidden"
        >
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#CCFF00] text-black border border-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_#fff]">
                NEW WORKSPACE MODULE
              </span>
              <span className="bg-[#00F0FF] text-black border border-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                BITE-SIZED CODEBASE
              </span>
              <span className="bg-[#FF52D9] text-black border border-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                SENIOR-DEV REVIEWS
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              Practice real-world coding in bite-sized codebases
            </h2>
            <p className="text-neutral-300 text-xs font-bold leading-relaxed">
              Sharpen engineering judgement, fix tickets, and get reviewed like a junior developer. Work inside a small React / TypeScript codebase with tests, submit your solution, and receive senior-dev style feedback.
            </p>
          </div>

          <button
            onClick={() => navigate('/bite-sized-codebase')}
            className="self-start md:self-center px-5 py-3 bg-[#CCFF00] text-black hover:bg-[#FFDE59] border-3 border-white shadow-[4px_4px_0px_#fff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>ENTER BITE-SIZED CODEBASE</span>
            <ArrowRight size={15} strokeWidth={2.5} />
          </button>
        </motion.div>

        {/* ────────── Filters ────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}
          className="p-5 mb-6 bg-white border-4 border-black shadow-[6px_6px_0px_#000]"
        >
          <div className="flex flex-col lg:flex-row gap-3">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search size={15} className="text-black" />
              </div>
              <input 
                type="text" 
                placeholder="SEARCH BY PROBLEM NAME..." 
                className="w-full pl-10 pr-4 py-2.5 bg-[#FBF9F5] border-3 border-black text-black text-xs font-black uppercase placeholder-gray-500 shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDE8] transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-black hover:text-[#FF0033]">
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Language Filter */}
            <div className="relative min-w-[150px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Code2 size={13} className="text-black" />
              </div>
              <select 
                className="w-full pl-8 pr-8 py-2.5 bg-[#FBF9F5] border-3 border-black text-black text-xs font-black uppercase appearance-none shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDE8] cursor-pointer"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang === 'All' ? 'All Languages' : lang}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                <ChevronDown size={14} className="text-black" />
              </div>
            </div>

            {/* Topic Filter */}
            <div className="relative min-w-[150px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen size={13} className="text-black" />
              </div>
              <select 
                className="w-full pl-8 pr-8 py-2.5 bg-[#FBF9F5] border-3 border-black text-black text-xs font-black uppercase appearance-none shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDE8] cursor-pointer"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
              >
                {topics.map(topic => (
                  <option key={topic} value={topic}>{topic === 'All' ? 'All Topics' : topic}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                <ChevronDown size={14} className="text-black" />
              </div>
            </div>

            {/* Company Filter */}
            <div className="relative min-w-[150px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building size={13} className="text-black" />
              </div>
              <select 
                className="w-full pl-8 pr-8 py-2.5 bg-[#FBF9F5] border-3 border-black text-black text-xs font-black uppercase appearance-none shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDE8] cursor-pointer"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                {companies.map(company => (
                  <option key={company} value={company}>{company === 'All' ? 'All Companies' : company}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                <ChevronDown size={14} className="text-black" />
              </div>
            </div>

            {/* Difficulty Pill Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F0EDE6] border-2 border-black">
              {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                <button 
                  key={d} 
                  onClick={() => setSelectedDifficulty(d)}
                  className={`px-3 py-1.5 text-xs font-black uppercase transition-all ${
                    selectedDifficulty === d 
                      ? 'bg-black text-[#FFDE59] border-2 border-black shadow-[2px_2px_0px_#000]' 
                      : 'bg-white text-black border-2 border-black hover:bg-[#FFDE59]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

          </div>

          {/* Active Filters Bar */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-4 pt-3 border-t-2 border-black">
              <span className="text-xs font-bold text-gray-700 uppercase">SHOWING</span>
              <span className="text-xs font-black text-black px-2 py-0.5 bg-[#CCFF00] border border-black">{filteredQuestions.length}</span>
              <span className="text-xs font-bold text-gray-700 uppercase">OF {totalCount} PROBLEMS</span>
              <button 
                onClick={clearAllFilters}
                className="ml-auto text-xs font-black text-[#FF0033] hover:text-black uppercase flex items-center gap-1 transition-colors"
              >
                <X size={13} /> [ CLEAR FILTERS ]
              </button>
            </div>
          )}
        </motion.div>

        {/* ────────── Problems Table ────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black text-white border-b-4 border-black">
                  <th className="px-5 py-3.5 text-[10px] font-black uppercase tracking-widest w-12 text-center">
                    STATUS
                  </th>
                  <th className="px-4 py-3.5 text-[10px] font-black uppercase tracking-widest w-20">
                    # ID
                  </th>
                  <th className="px-4 py-3.5 text-[10px] font-black uppercase tracking-widest">TITLE</th>
                  <th className="px-4 py-3.5 text-[10px] font-black uppercase tracking-widest w-32">DIFFICULTY</th>
                  <th className="px-4 py-3.5 text-[10px] font-black uppercase tracking-widest hidden lg:table-cell">COMPANIES</th>
                  <th className="px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-right w-28">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {paginatedQuestions.length > 0 ? (
                  paginatedQuestions.map((q) => (
                    <tr 
                      key={q.id} 
                      className="group cursor-pointer hover:bg-[#FFFDE8] transition-colors border-b-2 border-black"
                      onClick={() => navigate(`/ide/solve/${q.id}`)}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex justify-center" title={q.status}>
                          {getStatusIcon(q.status)}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-black font-black text-xs">
                          {q.id.toString().padStart(3, '0')}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-black text-black group-hover:underline text-sm mb-1.5 uppercase">
                          {q.title}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-black text-black bg-[#00F0FF] px-2 py-0.5 border border-black uppercase">
                            {q.topic}
                          </span>
                          <span className="hidden sm:inline-flex text-[10px] text-gray-700 font-bold uppercase">
                            {q.languages.slice(0, 3).join(' // ')}
                            {q.languages.length > 3 && ` +${q.languages.length - 3}`}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-block px-2.5 py-0.5 text-xs font-black uppercase ${getDifficultyBadge(q.difficulty)}`}>
                          {q.difficulty}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1.5">
                          {q.companies.slice(0, 2).map(company => (
                            <span key={company} className="text-[10px] font-black text-black bg-[#F0EDE6] px-2 py-0.5 border border-black uppercase">
                              {company}
                            </span>
                          ))}
                          {q.companies.length > 2 && (
                            <span className="text-[10px] font-black text-black px-1 uppercase">
                              +{q.companies.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button 
                          onClick={(e) => { e.stopPropagation(); navigate(`/ide/solve/${q.id}`); }}
                          className="px-3 py-1 bg-[#CCFF00] border-2 border-black text-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] hover:bg-black hover:text-[#CCFF00] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                        >
                          [ SOLVE → ]
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-[#FFDE59] border-3 border-black shadow-[3px_3px_0px_#000] mb-4">
                        <Filter size={24} className="text-black" />
                      </div>
                      <h3 className="text-lg font-black uppercase text-black mb-1">[ NO PROBLEMS FOUND ]</h3>
                      <p className="text-xs font-bold text-gray-700 uppercase mb-4">Try adjusting your filters or search query.</p>
                      <button 
                        onClick={clearAllFilters}
                        className="px-4 py-2 bg-black text-[#FFDE59] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]"
                      >
                        [ CLEAR ALL FILTERS ]
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-4 bg-[#F0EDE6] border-t-4 border-black gap-3">
              <span className="text-xs font-black uppercase text-black">
                SHOWING <span className="bg-white px-2 py-0.5 border border-black">{(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredQuestions.length)}</span> OF {filteredQuestions.length} PROBLEMS
              </span>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-white border-2 border-black text-black disabled:opacity-30 disabled:cursor-not-allowed shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let page;
                  if (totalPages <= 7) page = i + 1;
                  else if (currentPage <= 4) page = i + 1;
                  else if (currentPage >= totalPages - 3) page = totalPages - 6 + i;
                  else page = currentPage - 3 + i;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 text-xs font-black uppercase transition-all ${
                        page === currentPage 
                          ? 'bg-black text-[#CCFF00] border-2 border-black shadow-[2px_2px_0px_#000]' 
                          : 'bg-white border-2 border-black text-black hover:bg-[#FFDE59] shadow-[2px_2px_0px_#000]'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-white border-2 border-black text-black disabled:opacity-30 disabled:cursor-not-allowed shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
