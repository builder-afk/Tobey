import { useState, useMemo } from 'react';
import { Box, Layers, Play, CheckCircle, ChevronDown, ChevronRight, Search, Filter, Clock, Building2, Tag, X, Code2, FileText, Sparkles, BookOpen, ArrowRight, Star, Zap, ArrowUpRight } from 'lucide-react';
import { lldProblems, lldCategories, lldDifficulties, allLldTags, allLldCompanies } from '../data/lldProblems';

export default function LLDQuestions() {
  const [selectedProblem, setSelectedProblem] = useState(lldProblems[0]);
  const [activeTab, setActiveTab] = useState('uml'); // uml | code
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [solvedSet] = useState(new Set([1, 11, 13])); // demo solved state
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);

  const filteredProblems = useMemo(() => {
    return lldProblems.filter(p => {
      const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
      const matchesCompany = selectedCompany === 'All' || p.companies.includes(selectedCompany);
      const matchesTag = selectedTag === 'All' || p.tags.includes(selectedTag);
      return matchesSearch && matchesCategory && matchesDifficulty && matchesCompany && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedCompany, selectedTag]);

  const stats = useMemo(() => ({
    total: lldProblems.length,
    solved: solvedSet.size,
    complexSystems: lldProblems.filter(p => p.category === 'Complex System').length,
    classicOOD: lldProblems.filter(p => p.category === 'Classic OOD').length,
  }), [solvedSet]);

  const difficultyBadge = (d) => {
    if (d === 'Easy') return 'bg-[#CCFF00] text-black';
    if (d === 'Medium') return 'bg-[#FFDE59] text-black';
    return 'bg-[#FF0033] text-white';
  };

  const activeFiltersCount = [selectedCategory, selectedDifficulty, selectedCompany, selectedTag].filter(v => v !== 'All').length;

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedCompany('All');
    setSelectedTag('All');
    setSearchQuery('');
  };

  return (
    <div className="flex h-full overflow-hidden font-mono">
      {/* ─── Left Sidebar: Problem List ─── */}
      <div className={`${mobilePanelOpen ? 'hidden' : 'flex'} lg:flex w-full lg:w-[380px] border-r-4 border-black flex-col h-full bg-white shrink-0`}>
        {/* Header & Stats */}
        <div className="p-4 border-b-3 border-black bg-[#FBF9F5]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="inline-block px-2 py-0.5 bg-[#FFDE59] border border-black text-[9px] font-black uppercase mb-1">
                [ SYSTEM DESIGN // LLD ]
              </div>
              <h2 className="font-black text-lg text-black uppercase tracking-tight">
                LLD PROBLEMS
              </h2>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-1.5 mt-3">
            <div className="bg-white border-2 border-black p-1.5 text-center shadow-[1px_1px_0px_#000]">
              <div className="text-[9px] text-gray-600 font-black uppercase">TOTAL</div>
              <div className="text-base font-black text-black">{stats.total}</div>
            </div>
            <div className="bg-[#CCFF00] border-2 border-black p-1.5 text-center shadow-[1px_1px_0px_#000]">
              <div className="text-[9px] text-black font-black uppercase">SOLVED</div>
              <div className="text-base font-black text-black">{stats.solved}</div>
            </div>
            <div className="bg-[#FFDE59] border-2 border-black p-1.5 text-center shadow-[1px_1px_0px_#000]">
              <div className="text-[9px] text-black font-black uppercase">SYSTEMS</div>
              <div className="text-base font-black text-black">{stats.complexSystems}</div>
            </div>
            <div className="bg-[#00F0FF] border-2 border-black p-1.5 text-center shadow-[1px_1px_0px_#000]">
              <div className="text-[9px] text-black font-black uppercase">CLASSIC</div>
              <div className="text-base font-black text-black">{stats.classicOOD}</div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-3">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black stroke-[3]" />
            <input
              type="text"
              placeholder="SEARCH PROBLEMS..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-black pl-8 pr-3 py-1.5 text-xs font-black text-black placeholder-gray-500 uppercase focus:bg-yellow-50 focus:outline-none shadow-[2px_2px_0px_#000]"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`mt-2.5 w-full flex items-center justify-between px-3 py-1.5 text-xs font-black uppercase border-2 border-black transition-all ${
              showFilters ? 'bg-[#FFDE59] text-black shadow-[2px_2px_0px_#000]' : 'bg-white text-black hover:bg-[#F0EDE6]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Filter size={12} className="stroke-[2.5]" />
              FILTERS
              {activeFiltersCount > 0 && (
                <span className="bg-black text-white text-[9px] px-1 py-0.2">{activeFiltersCount}</span>
              )}
            </span>
            {showFilters ? <ChevronDown size={14} className="stroke-[3]" /> : <ChevronRight size={14} className="stroke-[3]" />}
          </button>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-2.5 space-y-2 p-2 bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
              <div>
                <label className="text-[9px] text-gray-600 uppercase font-black mb-0.5 block">CATEGORY</label>
                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#F0EDE6] border border-black p-1 text-xs font-bold text-black uppercase">
                  <option value="All">ALL CATEGORIES</option>
                  {lldCategories.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[9px] text-gray-600 uppercase font-black mb-0.5 block">DIFFICULTY</label>
                <select value={selectedDifficulty} onChange={e => setSelectedDifficulty(e.target.value)}
                  className="w-full bg-[#F0EDE6] border border-black p-1 text-xs font-bold text-black uppercase">
                  <option value="All">ALL DIFFICULTIES</option>
                  {lldDifficulties.map(d => <option key={d} value={d}>{d.toUpperCase()}</option>)}
                </select>
              </div>
              {activeFiltersCount > 0 && (
                <button onClick={clearFilters} className="w-full text-center text-xs text-red-600 font-black py-1 hover:underline uppercase">
                  [ CLEAR FILTERS ]
                </button>
              )}
            </div>
          )}
        </div>

        {/* Problem List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredProblems.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-black font-black text-xs uppercase">NO PROBLEMS MATCH FILTERS.</div>
              <button onClick={clearFilters} className="mt-2 text-xs font-black uppercase underline">[ RESET ]</button>
            </div>
          )}
          {filteredProblems.map((p) => {
            const isActive = selectedProblem?.id === p.id;
            const isSolved = solvedSet.has(p.id);
            return (
              <div
                key={p.id}
                onClick={() => { setSelectedProblem(p); setActiveTab('uml'); setMobilePanelOpen(true); }}
                className={`px-4 py-3.5 border-b-2 border-black cursor-pointer transition-all flex flex-col justify-between
                  ${isActive ? 'bg-black text-white' : 'bg-white hover:bg-yellow-50 text-black'}`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <span className={`text-[10px] font-black shrink-0 ${isActive ? 'text-gray-400' : 'text-gray-600'}`}>
                      #{p.id.toString().padStart(2, '0')}
                    </span>
                    <span className="font-black text-xs uppercase leading-snug line-clamp-1">
                      {p.title}
                    </span>
                  </div>
                  {isSolved && (
                    <span className="w-2.5 h-2.5 bg-[#CCFF00] border border-black shrink-0 ml-2" title="Solved" />
                  )}
                </div>

                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className={`text-[9px] font-black px-1.5 py-0.2 border border-black ${difficultyBadge(p.difficulty)}`}>
                    {p.difficulty}
                  </span>
                  <span className={`text-[9px] font-black uppercase ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>
                    {p.category}
                  </span>
                  <span className={`text-[9px] font-black uppercase ml-auto ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>
                    {p.estimatedTime}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Right Panel: Problem Detail ─── */}
      <div className={`flex-1 flex-col h-full overflow-y-auto custom-scrollbar bg-[#F0EDE6] ${mobilePanelOpen ? 'flex' : 'hidden'} lg:flex`}>
        {selectedProblem ? (
          <div className="p-6 md:p-10 max-w-5xl mx-auto w-full">
            {/* Mobile back */}
            <button
              onClick={() => setMobilePanelOpen(false)}
              className="lg:hidden mb-4 px-3 py-1.5 bg-white border-2 border-black text-xs font-black uppercase flex items-center gap-2"
            >
              [ ← BACK TO PROBLEMS ]
            </button>

            {/* Badges Row */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className={`px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] ${difficultyBadge(selectedProblem.difficulty)}`}>
                {selectedProblem.difficulty}
              </span>
              <span className="px-3 py-1 bg-[#00F0FF] text-black text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000]">
                {selectedProblem.category}
              </span>
              <span className="px-3 py-1 bg-[#FFDE59] text-black text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
                <Clock size={12} className="stroke-[2.5]" />
                {selectedProblem.estimatedTime}
              </span>
              {solvedSet.has(selectedProblem.id) && (
                <span className="px-3 py-1 bg-[#CCFF00] text-black text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000]">
                  ✓ SOLVED
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight mb-4">
              {selectedProblem.title}
            </h1>

            {/* Description Banner */}
            <div className="bg-white border-3 border-black p-4 mb-6 shadow-[4px_4px_0px_#000]">
              <p className="text-xs md:text-sm font-bold text-gray-800 uppercase leading-relaxed">
                {selectedProblem.description}
              </p>
            </div>

            {/* Companies */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-xs font-black text-black uppercase flex items-center gap-1">
                <Building2 size={14} className="stroke-[2.5]" /> COMPANIES:
              </span>
              {selectedProblem.companies.map(c => (
                <span key={c} className="px-2.5 py-0.5 bg-white border-2 border-black text-black text-xs font-black uppercase shadow-[1px_1px_0px_#000]">
                  {c}
                </span>
              ))}
            </div>

            {/* Design Patterns Used */}
            <div className="mb-8 bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000]">
              <h3 className="text-xs font-black text-black uppercase mb-3 flex items-center gap-2">
                <Sparkles size={14} className="stroke-[2.5]" />
                DESIGN PATTERNS APPLIED
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProblem.designPatterns.map((dp, i) => (
                  <span key={i} className="px-3 py-1 bg-[#FFDE59] text-black text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000]">
                    {dp}
                  </span>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-8 bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000]">
              <h3 className="text-xs font-black text-black uppercase mb-4 flex items-center gap-2">
                <FileText size={14} className="stroke-[2.5]" />
                FUNCTIONAL REQUIREMENTS & CONSTRAINTS
              </h3>
              <div className="space-y-2.5">
                {selectedProblem.requirements.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-black text-white text-xs font-black flex items-center justify-center shrink-0 border border-black">
                      {i + 1}
                    </span>
                    <p className="text-xs md:text-sm font-bold text-gray-800 uppercase leading-snug pt-0.5">{r}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabbed Content: UML | Scaffold Code */}
            <div className="border-4 border-black bg-white shadow-[6px_6px_0px_#000] mb-8 overflow-hidden">
              <div className="border-b-3 border-black bg-[#F0EDE6] p-2 flex gap-2">
                <button
                  onClick={() => setActiveTab('uml')}
                  className={`flex-1 py-2.5 px-4 border-2 border-black text-xs font-black uppercase transition-all shadow-[2px_2px_0px_#000] flex items-center justify-center gap-2 ${
                    activeTab === 'uml' ? 'bg-[#CCFF00] text-black' : 'bg-white text-gray-700 hover:bg-[#FFDE59]'
                  }`}
                >
                  <Layers size={14} className="stroke-[2.5]" /> [ CLASS DIAGRAM ]
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex-1 py-2.5 px-4 border-2 border-black text-xs font-black uppercase transition-all shadow-[2px_2px_0px_#000] flex items-center justify-center gap-2 ${
                    activeTab === 'code' ? 'bg-[#00F0FF] text-black' : 'bg-white text-gray-700 hover:bg-[#FFDE59]'
                  }`}
                >
                  <Code2 size={14} className="stroke-[2.5]" /> [ SCAFFOLD CODE ]
                </button>
              </div>

              <div className="p-6 bg-[#0a0a0a] overflow-x-auto text-white">
                {activeTab === 'uml' && (
                  <pre className="font-mono text-xs text-[#00FF66] leading-[18px] whitespace-pre font-bold">
                    {selectedProblem.uml}
                  </pre>
                )}
                {activeTab === 'code' && (
                  <pre className="font-mono text-xs text-[#00F0FF] leading-[18px] whitespace-pre font-bold">
                    {selectedProblem.scaffold}
                  </pre>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pb-8">
              <button 
                onClick={() => alert(`Opening comprehensive solution blueprint for ${selectedProblem.title}`)}
                className="py-3 px-6 bg-white hover:bg-[#FFDE59] border-3 border-black text-black font-black text-xs uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
              >
                <BookOpen size={16} className="stroke-[2.5]" /> [ VIEW FULL SOLUTION ]
              </button>
              <button 
                onClick={() => alert(`Launching interactive IDE sandbox for ${selectedProblem.title}`)}
                className="py-3 px-6 bg-[#CCFF00] hover:bg-black hover:text-white border-3 border-black text-black font-black text-xs uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Play size={16} className="stroke-[3]" /> [ CODE IMPLEMENTATION → ]
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center bg-white border-4 border-black p-8 shadow-[6px_6px_0px_#000]">
              <Layers size={32} className="mx-auto text-black stroke-[2.5] mb-2" />
              <h3 className="text-lg font-black text-black uppercase">SELECT AN ARCHITECTURAL PROBLEM</h3>
              <p className="text-xs text-gray-600 font-bold uppercase mt-1">CHOOSE A PROBLEM FROM THE DIRECTORY TO REVIEW SPECS AND UML SCHEMATICS.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}