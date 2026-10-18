import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search, Filter, MapPin, Briefcase, Code, GitPullRequest,
  Star, ChevronRight, Zap, CheckCircle2, SlidersHorizontal, Brain
} from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';
import { mockCandidates, getScoreColor } from '../data/recruitingData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function TalentSearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minRating: 0,
    minGithub: 0,
    startupExp: false,
    availability: '',
  });

  const [expandedCandidateId, setExpandedCandidateId] = useState(null);

  const filteredCandidates = mockCandidates.filter(c => {
    if (searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !c.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    if (filters.minRating > 0 && c.contestRating < filters.minRating) return false;
    if (filters.minGithub > 0 && c.github.commits < filters.minGithub) return false;
    if (filters.startupExp && !c.hasStartupExp) return false;
    if (filters.availability && c.availability !== filters.availability) return false;
    return true;
  });

  const toggleFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: prev[key] === value ? (typeof value === 'boolean' ? false : '') : value }));
  };

  return (
    <div className="min-h-screen bg-[#FCFCFD] font-sans selection:bg-purple-200 selection:text-purple-900 pb-20">
      
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by role, skill, or name (e.g. 'Backend Python', 'Arjun')..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 font-medium focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all outline-none" 
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                <span className="text-[10px] font-bold text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-sm">⌘</span>
                <span className="text-[10px] font-bold text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-sm">K</span>
              </div>
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold border transition-all ${
                showFilters ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal size={18} /> Filters
            </button>
            <button className="flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10">
              <Zap size={18} /> Auto-Match
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="py-6 grid grid-cols-1 md:grid-cols-4 gap-6 border-t border-gray-100 mt-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">Min Coding Rating</label>
                    <div className="flex flex-wrap gap-2">
                      {[1200, 1500, 1800, 2000].map(val => (
                        <button key={val} onClick={() => toggleFilter('minRating', val)} className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-all ${filters.minRating === val ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                          {val}+
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">Experience</label>
                    <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <input type="checkbox" checked={filters.startupExp} onChange={() => toggleFilter('startupExp', !filters.startupExp)} className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                      <span className="text-sm font-bold text-gray-700">Startup Experience Required</span>
                    </label>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">Availability</label>
                    <select 
                      value={filters.availability} onChange={(e) => toggleFilter('availability', e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800"
                    >
                      <option value="">Any Timing</option>
                      <option value="Immediately Available">Immediately Available</option>
                      <option value="30 Days">Within 30 Days</option>
                      <option value="60 Days">Within 60 Days</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button onClick={() => setFilters({ minRating: 0, minGithub: 0, startupExp: false, availability: '' })} className="text-sm font-bold text-gray-500 hover:text-gray-900 underline underline-offset-2">
                      Clear all filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {filteredCandidates.length} Candidates Found
          </h2>
          <div className="text-sm font-bold text-gray-500">
            Sorted by <span className="text-purple-600">AI Match Score</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCandidates.map(candidate => {
            const sc = getScoreColor(candidate.scores.overall);
            const isExpanded = expandedCandidateId === candidate.id;
            
            return (
              <motion.div 
                layout
                key={candidate.id} 
                className={`bg-white border border-gray-200 rounded-3xl overflow-hidden transition-all duration-300 ${isExpanded ? 'col-span-1 md:col-span-2 xl:col-span-3 shadow-xl border-purple-200' : 'hover:shadow-lg hover:border-purple-200 cursor-pointer'}`}
                onClick={() => !isExpanded && setExpandedCandidateId(candidate.id)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-200">
                        {candidate.avatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight flex items-center gap-2">
                          {candidate.name} 
                          {candidate.scores.overall >= 90 && <span className="flex items-center justify-center w-5 h-5 bg-amber-100 text-amber-500 rounded-full" title="Top 10% Match"><Star size={12} fill="currentColor"/></span>}
                        </h3>
                        <p className="text-sm font-bold text-gray-500 mt-0.5 flex items-center gap-1.5">
                          {candidate.title} <span className="text-gray-300">•</span> <MapPin size={12} className="text-gray-400"/> {candidate.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className={`flex items-center justify-center px-3 py-1.5 rounded-xl ${sc.bg} ${sc.text} ${sc.border} border mb-1`}>
                        <span className="text-sm font-black mr-1">{candidate.scores.overall}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Match</span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400">{candidate.availability}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                        <Code size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rating</div>
                        <div className="text-sm font-black text-gray-900">{candidate.contestRating || 'N/A'}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                        <GitPullRequest size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Commits/Yr</div>
                        <div className="text-sm font-black text-gray-900">{candidate.github.commits}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.slice(0, 5).map(s => (
                        <span key={s} className="px-2.5 py-1 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold shadow-sm">{s}</span>
                      ))}
                      {candidate.skills.length > 5 && !isExpanded && (
                        <span className="px-2.5 py-1 bg-gray-50 text-gray-500 rounded-lg text-xs font-bold">+{candidate.skills.length - 5}</span>
                      )}
                    </div>
                  </div>

                  {!isExpanded && (
                    <div className="mt-5 pt-5 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {candidate.projects.slice(0,3).map((p, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 shadow-sm z-10" style={{ zIndex: 3 - i }}>
                            {p.tech[0]?.charAt(0)}
                          </div>
                        ))}
                        {candidate.projects.length > 0 && <span className="ml-4 text-xs font-bold text-gray-500 self-center">{candidate.projects.length} shipped projects</span>}
                      </div>
                      <ChevronRight size={18} className="text-gray-300" />
                    </div>
                  )}
                </div>

                {/* EXPANDED VIEW */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-100 bg-gray-50/50"
                    >
                      <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          
                          {/* AI Summary */}
                          <div className="md:col-span-2">
                            <div className="bg-purple-50/50 rounded-2xl p-6 border border-purple-100 mb-6">
                              <h4 className="text-sm font-bold text-purple-900 mb-4 flex items-center gap-2">
                                <Brain size={16} className="text-purple-500" /> Why this match?
                              </h4>
                              <ul className="space-y-3">
                                {candidate.matchReasons.map((reason, i) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span className="text-sm font-medium text-purple-900/80 leading-relaxed">{reason}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Core Strengths</h4>
                                <div className="flex flex-wrap gap-2">
                                  {candidate.strengths.map(s => <span key={s} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold">{s}</span>)}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Development Areas</h4>
                                <div className="flex flex-wrap gap-2">
                                  {candidate.weaknesses.map(s => <span key={s} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold">{s}</span>)}
                                </div>
                              </div>
                            </div>
                            
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">All Skills</h4>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {candidate.skills.map(s => (
                                <span key={s} className="px-2.5 py-1 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold shadow-sm">{s}</span>
                              ))}
                            </div>
                          </div>

                          {/* Skill Radar */}
                          <div>
                            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm h-[280px]">
                              <h4 className="text-xs font-bold text-gray-900 text-center mb-2">Engineering Radar</h4>
                              <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={candidate.skillRadar}>
                                  <PolarGrid stroke="#f1f5f9" />
                                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                                  <Radar name="Candidate" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                                </RadarChart>
                              </ResponsiveContainer>
                            </div>

                            <div className="mt-6 flex flex-col gap-3">
                              <button onClick={() => navigate(`/candidate/${candidate.id}`)} className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
                                View Full Analysis
                              </button>
                              <button onClick={() => setExpandedCandidateId(null)} className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
                                Close Preview
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
