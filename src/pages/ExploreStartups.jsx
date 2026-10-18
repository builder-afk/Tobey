import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Rocket, Search, Filter, Globe, Sparkles, Star, Bookmark, BookmarkCheck,
  ArrowRight, X, Check, Copy, ExternalLink, Zap, ShieldAlert, AlertTriangle,
  Flame, Scale, TrendingUp, DollarSign, Target, ChevronRight, Layers, Users,
  Building2, Terminal, Compass, Plus, Dice5, Eye, RefreshCw, Send, CheckCircle2
} from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';
import { startupProblems, niches, regions, urgencyLevels } from '../data/startupProblemsData';

export default function ExploreStartups() {
  const navigate = useNavigate();

  // Filter States
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedUrgency, setSelectedUrgency] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('num-asc');
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Modals & Active Thesis
  const [activeModalProblem, setActiveModalProblem] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [copiedColdEmail, setCopiedColdEmail] = useState(false);

  // Persistence for saved bookmarks and user-submitted problems
  const [savedProblemIds, setSavedProblemIds] = useState(() => {
    try {
      const saved = localStorage.getItem('hypers_saved_problems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customProblems, setCustomProblems] = useState(() => {
    try {
      const saved = localStorage.getItem('hypers_custom_problems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Submit Modal Form State
  const [newProblemForm, setNewProblemForm] = useState({
    title: '',
    niche: 'ai-infra',
    region: 'global',
    urgency: 'bleeding-neck',
    tagline: '',
    targetBuyer: '',
    tam: '$5.0B',
    wtp: '$2,000 - $8,000 / mo',
    pain1: '',
    pain2: '',
    incumbentFlaw: '',
    suggestedWedge: ''
  });

  // Combine default dataset with user-submitted problems
  const allProblems = useMemo(() => {
    return [...customProblems, ...startupProblems];
  }, [customProblems]);

  // Handle Bookmarks
  const toggleBookmark = (problemId, e) => {
    e?.stopPropagation();
    setSavedProblemIds((prev) => {
      const exists = prev.includes(problemId);
      const updated = exists ? prev.filter((id) => id !== problemId) : [...prev, problemId];
      localStorage.setItem('hypers_saved_problems', JSON.stringify(updated));
      return updated;
    });
  };

  // Filter & Sort Logic
  const filteredProblems = useMemo(() => {
    return allProblems.filter((p) => {
      // Niche filter
      if (selectedNiche !== 'all' && p.niche !== selectedNiche) return false;
      // Region filter
      if (selectedRegion !== 'all' && p.region !== selectedRegion) return false;
      // Urgency filter
      if (selectedUrgency !== 'all' && p.urgency !== selectedUrgency) return false;
      // Saved only filter
      if (showSavedOnly && !savedProblemIds.includes(p.id)) return false;
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesTagline = p.tagline.toLowerCase().includes(query);
        const matchesBuyer = p.targetBuyer.toLowerCase().includes(query);
        const matchesIncumbent = p.incumbentFlaw.toLowerCase().includes(query);
        const matchesPains = p.painPoints?.some((pt) => pt.toLowerCase().includes(query));
        const matchesAnalogy = p.analogy?.toLowerCase().includes(query);
        const matchesNiche = p.nicheLabel?.toLowerCase().includes(query);
        const queryNum = query.replace('#', '');
        const matchesNumber = p.number && String(p.number) === queryNum;
        if (!matchesTitle && !matchesTagline && !matchesBuyer && !matchesIncumbent && !matchesPains && !matchesAnalogy && !matchesNiche && !matchesNumber) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'num-asc') {
        return (a.number || 999) - (b.number || 999);
      }
      if (sortBy === 'tam-desc') {
        const parseTam = (s) => parseFloat(s.replace(/[^0-9.]/g, '') || 0);
        return parseTam(b.tam) - parseTam(a.tam);
      }
      if (sortBy === 'moat-desc') {
        return (b.moatScore || 0) - (a.moatScore || 0);
      }
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [allProblems, selectedNiche, selectedRegion, selectedUrgency, showSavedOnly, savedProblemIds, searchQuery, sortBy]);

  // Random Problem Surprise Me (Russian Roulette)
  const handleRussianRoulette = () => {
    if (allProblems.length === 0) return;
    const randomIndex = Math.floor(Math.random() * allProblems.length);
    const chosen = allProblems[randomIndex];
    setActiveModalProblem(chosen);
  };

  // Send problem into Founder Workspace Cockpit
  const handleSendToCockpit = (problem, e) => {
    e?.stopPropagation();
    try {
      localStorage.setItem('hypers_current_company_thesis', JSON.stringify({
        name: `${problem.title.split(' ').slice(0, 3).join('')} Systems`,
        tagline: problem.suggestedWedge || problem.tagline,
        targetRaise: '$2.0M',
        stage: 'Pre-Seed',
        targetBuyer: problem.targetBuyer,
        tam: problem.tam,
        problemId: problem.id
      }));
    } catch (err) {
      console.error(err);
    }
    navigate('/pitch?tab=startup-eval');
  };

  // Handle Form Submission of New Problem
  const handleCreateProblem = (e) => {
    e.preventDefault();
    if (!newProblemForm.title || !newProblemForm.tagline) return;

    const newProblem = {
      id: `custom-${Date.now()}`,
      title: newProblemForm.title,
      niche: newProblemForm.niche,
      nicheLabel: niches.find(n => n.id === newProblemForm.niche)?.label || 'Emerging Tech',
      region: newProblemForm.region,
      regionLabel: regions.find(r => r.id === newProblemForm.region)?.label || 'Global / Remote',
      urgency: newProblemForm.urgency,
      urgencyLabel: urgencyLevels.find(u => u.id === newProblemForm.urgency)?.label || '🔥 Bleeding Neck',
      badgeColor: 'bg-[#FF0033] text-white',
      accentColor: '#FFDE59',
      tagline: newProblemForm.tagline,
      tam: newProblemForm.tam,
      sam: '$1.5B',
      wtp: newProblemForm.wtp,
      targetBuyer: newProblemForm.targetBuyer || 'Enterprise VP / Tech Lead',
      difficulty: 'Medium',
      moatScore: 90,
      executionVelocity: 'High (Founder submitted)',
      painPoints: [
        newProblemForm.pain1 || 'Significant manual overhead causing daily revenue or efficiency loss.',
        newProblemForm.pain2 || 'Legacy incumbent software requires weeks of custom configuration.',
        'High willingness to pay verified by active customer interview signals.'
      ],
      incumbentFlaw: newProblemForm.incumbentFlaw || 'Incumbents are locked into legacy monolithic stacks and lack modern AI workflows.',
      suggestedWedge: newProblemForm.suggestedWedge || 'Lightweight API or drop-in browser workflow that solves the single most painful bottleneck.',
      firstCustomersPlaybook: {
        idealTitles: [newProblemForm.targetBuyer || 'VP of Engineering'],
        searchQuery: `site:linkedin.com/in "${newProblemForm.targetBuyer || 'VP'}"`,
        coldAngle: `"Noticed your team is tackling this operational workflow. Are you currently running custom scripts to solve ${newProblemForm.title}?"`
      },
      techBlueprint: {
        stack: ['TypeScript / Node.js', 'PostgreSQL', 'Python AI harness', 'Tailwind & React'],
        difficultyNote: 'Self-submitted founder opportunity.'
      }
    };

    const updated = [newProblem, ...customProblems];
    setCustomProblems(updated);
    localStorage.setItem('hypers_custom_problems', JSON.stringify(updated));
    setShowSubmitModal(false);
    setActiveModalProblem(newProblem);
  };

  // Copy cold email script
  const copyColdEmail = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedColdEmail(true);
    setTimeout(() => setCopiedColdEmail(false), 2000);
  };

  return (
    <div
      className="min-h-screen bg-[#F0EDE6] text-black font-mono selection:bg-[#FFDE59] selection:text-black flex flex-col"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* ── Top Warning / Telemetry Marquee ── */}
      <div className="h-9 shrink-0 bg-[#FFDE59] border-b-4 border-black py-1 px-4 overflow-hidden whitespace-nowrap z-20 flex items-center shadow-[0_4px_0px_#000] select-none">
        <div className="flex items-center gap-8 animate-marquee font-mono text-[11px] font-black uppercase tracking-widest text-black">
          <span className="flex items-center gap-1.5"><span className="text-[#FF5722]">⚡</span> [ HYPERS RADAR // STARTUP PROBLEM DIRECTORY ]</span>
          <span>//</span>
          <span>DATABASE: {allProblems.length} VALIDATED B2B & DEEPTECH THESES</span>
          <span>//</span>
          <span>STATUS: ALL REGIONAL INTELLIGENCE HUBS ONLINE</span>
          <span>//</span>
          <span>AVG TAM: $17.8B</span>
          <span>//</span>
          <span>HIGH WTP RATIO: 92%</span>
          <span>//</span>
          <span className="bg-black text-[#00F0FF] px-2 py-0.5 border border-black font-black">ZERO TOY IDEAS ALLOWED</span>
          <span>//</span>
          <span className="flex items-center gap-1.5"><span className="text-[#FF5722]">⚡</span> [ HYPERS RADAR // STARTUP PROBLEM DIRECTORY ]</span>
        </div>
      </div>

      {/* ── Main Container ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 py-8 sm:py-12">

        {/* ═══ 1. HERO COMMAND HEADER ═══ */}
        <section className="mb-10 text-center md:text-left border-4 border-black bg-white shadow-[8px_8px_0px_#000] p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF8811] text-white border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] mb-4">
                <Compass size={14} className="stroke-[3]" />
                <span>[ FOUNDER PROBLEM RADAR // STOP BUILDING TOYS ]</span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-black leading-none mb-4">
                EXPLORE REAL PROBLEMS. <br />
                <span className="bg-[#FFDE59] px-2 py-0.5 inline-block mt-1 border-2 border-black shadow-[3px_3px_0px_#000]">
                  BUILD HIGH-MOAT STARTUPS.
                </span>
              </h1>
              <p className="text-xs sm:text-sm font-bold text-gray-700 uppercase max-w-2xl leading-relaxed mb-6">
                // ELITE FOUNDERS DON'T INVENT SOLUTIONS IN SEARCH OF A PROBLEM. EXPLORE VERIFIED B2B, INFRASTRUCTURE & REGULATORY PAIN POINTS FILTERED BY YOUR NICHE AND GEOGRAPHY. DIRECTLY EXPORT ANY PROBLEM THESIS INTO THE FOUNDER'S COCKPIT.
              </p>
            </div>

            {/* Quick Action Station */}
            <div className="flex flex-col gap-3 shrink-0 md:min-w-[260px]">
              <button
                onClick={handleRussianRoulette}
                className="w-full px-4 py-3 bg-[#CCFF00] hover:bg-[#FFDE59] text-black font-black text-xs uppercase border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Dice5 size={16} className="stroke-[2.5]" />
                <span>[ 🎲 SURPRISE ME (ROULETTE) ]</span>
              </button>

              <button
                onClick={() => setShowSubmitModal(true)}
                className="w-full px-4 py-3 bg-white hover:bg-[#00F0FF] text-black font-black text-xs uppercase border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus size={16} className="stroke-[3]" />
                <span>[ ➕ SUBMIT A PROBLEM ]</span>
              </button>

              <Link
                to="/pitch"
                className="w-full px-4 py-3 bg-black hover:bg-neutral-800 text-[#FFDE59] font-black text-xs uppercase border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 text-center"
              >
                <Rocket size={16} className="stroke-[2.5] text-[#FF52D9]" />
                <span>[ 🚀 FOUNDER'S COCKPIT ]</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 mt-6 border-t-4 border-black">
            <div className="p-3 bg-[#FAF8F5] border-2 border-black">
              <span className="text-[10px] font-black uppercase text-gray-500 block">TOTAL VERIFIED PROBLEMS</span>
              <span className="text-xl font-black text-black">{allProblems.length} VALIDATED</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] border-2 border-black">
              <span className="text-[10px] font-black uppercase text-gray-500 block">AVG ADDRESSABLE TAM</span>
              <span className="text-xl font-black text-blue-700">$18.2B</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] border-2 border-black">
              <span className="text-[10px] font-black uppercase text-gray-500 block">AVG VALIDATED ACV</span>
              <span className="text-xl font-black text-emerald-700">$45,000 / YR</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] border-2 border-black">
              <span className="text-[10px] font-black uppercase text-gray-500 block">ACTIVE GEOGRAPHIES</span>
              <span className="text-xl font-black text-purple-700">7 GLOBAL HUBS</span>
            </div>
          </div>
        </section>

        {/* ═══ 2. FILTER & SELECTION CONSOLE ═══ */}
        <section className="mb-8 border-4 border-black bg-white shadow-[6px_6px_0px_#000] p-4 sm:p-6 space-y-5">

          {/* Search Bar & Primary Actions */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 stroke-[2.5]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH PROBLEMS BY KEYWORD, TARGET BUYER, TECH TAG, OR PAIN POINT..."
                className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase text-black placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[2px_2px_0px_#000] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-black text-white flex items-center justify-center text-xs font-black"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Saved Problems Filter Toggle */}
              <button
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`px-3.5 py-3 border-2 border-black text-xs font-black uppercase flex items-center gap-1.5 transition-all cursor-pointer ${showSavedOnly
                    ? 'bg-[#FF0033] text-white shadow-[3px_3px_0px_#000]'
                    : 'bg-[#FAF8F5] text-black hover:bg-neutral-100'
                  }`}
              >
                <Bookmark size={14} className={showSavedOnly ? 'fill-white stroke-white' : ''} />
                <span>SAVED ({savedProblemIds.length})</span>
              </button>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase text-black focus:outline-none cursor-pointer"
              >
                <option value="num-asc">SORT: THESIS # (01 - 100)</option>
                <option value="tam-desc">SORT: LARGEST TAM ($)</option>
                <option value="moat-desc">SORT: HIGHEST MOAT SCORE</option>
                <option value="title-asc">SORT: ALPHABETICAL (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Niche Pills Selector */}
          <div>
            <div className="text-[10px] font-black uppercase text-gray-500 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#FFDE59] border border-black inline-block" />
              <span>STEP 1 // SELECT VERTICAL NICHE:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {niches.map((niche) => {
                const isSelected = selectedNiche === niche.id;
                return (
                  <button
                    key={niche.id}
                    onClick={() => setSelectedNiche(niche.id)}
                    className={`px-3 py-1.5 border-2 border-black text-xs font-black uppercase transition-all cursor-pointer ${isSelected
                        ? 'bg-[#FFDE59] text-black shadow-[3px_3px_0px_#000] translate-x-0.5'
                        : 'bg-white text-gray-700 hover:bg-[#FAF8F5] hover:border-black'
                      }`}
                  >
                    <span>{niche.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Region Pills Selector */}
          <div>
            <div className="text-[10px] font-black uppercase text-gray-500 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#00F0FF] border border-black inline-block" />
              <span>STEP 2 // SELECT TARGET REGION:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => {
                const isSelected = selectedRegion === region.id;
                return (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    className={`px-3 py-1.5 border-2 border-black text-xs font-black uppercase transition-all cursor-pointer ${isSelected
                        ? 'bg-[#00F0FF] text-black shadow-[3px_3px_0px_#000] translate-x-0.5'
                        : 'bg-white text-gray-700 hover:bg-[#FAF8F5]'
                      }`}
                  >
                    <span>{region.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Urgency Severity Pills */}
          <div>
            <div className="text-[10px] font-black uppercase text-gray-500 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#FF0033] border border-black inline-block" />
              <span>STEP 3 // FILTER BY PROBLEM SEVERITY:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {urgencyLevels.map((urgency) => {
                const isSelected = selectedUrgency === urgency.id;
                return (
                  <button
                    key={urgency.id}
                    onClick={() => setSelectedUrgency(urgency.id)}
                    className={`px-3 py-1.5 border-2 border-black text-xs font-black uppercase transition-all cursor-pointer ${isSelected
                        ? 'bg-[#CCFF00] text-black shadow-[3px_3px_0px_#000] translate-x-0.5'
                        : 'bg-white text-gray-700 hover:bg-[#FAF8F5]'
                      }`}
                  >
                    <span>{urgency.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filter Indicators & Reset */}
          <div className="pt-3 border-t-2 border-black flex flex-wrap items-center justify-between gap-3 text-xs font-bold uppercase text-gray-600">
            <div>
              SHOWING <span className="font-black text-black">{filteredProblems.length}</span> OF <span className="font-black text-black">{allProblems.length}</span> VALIDATED PROBLEMS
            </div>

            {(selectedNiche !== 'all' || selectedRegion !== 'all' || selectedUrgency !== 'all' || searchQuery || showSavedOnly) && (
              <button
                onClick={() => {
                  setSelectedNiche('all');
                  setSelectedRegion('all');
                  setSelectedUrgency('all');
                  setSearchQuery('');
                  setShowSavedOnly(false);
                }}
                className="text-xs font-black uppercase text-[#FF0033] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw size={12} />
                <span>[ RESET ALL FILTERS ]</span>
              </button>
            )}
          </div>

        </section>

        {/* ═══ 3. DIRECTORY GRID OF STARTUP PROBLEMS ═══ */}
        {filteredProblems.length === 0 ? (
          <div className="border-4 border-black bg-white shadow-[8px_8px_0px_#000] p-12 text-center my-12">
            <AlertTriangle size={48} className="mx-auto text-[#FF0033] mb-4" />
            <h3 className="text-2xl font-black uppercase text-black mb-2">NO PROBLEMS MATCHING CRITERIA</h3>
            <p className="text-xs font-bold text-gray-600 uppercase max-w-md mx-auto mb-6">
              Try relaxing your niche or region filters, or submit a custom problem you've discovered in the field.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedNiche('all');
                  setSelectedRegion('all');
                  setSelectedUrgency('all');
                  setSearchQuery('');
                  setShowSavedOnly(false);
                }}
                className="px-5 py-3 bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000]"
              >
                [ RESET ALL FILTERS ]
              </button>
              <button
                onClick={() => setShowSubmitModal(true)}
                className="px-5 py-3 bg-[#CCFF00] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000]"
              >
                [ ➕ SUBMIT NEW PROBLEM ]
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {filteredProblems.map((problem) => {
              const isSaved = savedProblemIds.includes(problem.id);

              return (
                <div
                  key={problem.id}
                  className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] hover:-translate-y-1 transition-all flex flex-col justify-between overflow-hidden"
                >
                  {/* Card Titlebar with Window Controls */}
                  <div>
                    <div className="bg-[#FAF8F5] border-b-4 border-black px-4 py-2.5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 bg-[#FF0033] border border-black" />
                        <div className="w-3 h-3 bg-[#FFDE59] border border-black" />
                        <div className="w-3 h-3 bg-[#CCFF00] border border-black" />
                        <span className="ml-2 text-[10px] font-black uppercase text-black flex items-center gap-1.5">
                          {problem.number && (
                            <span className="bg-black text-[#FFDE59] px-1.5 py-0.2 border border-black font-black">
                              #{String(problem.number).padStart(2, '0')}
                            </span>
                          )}
                          <span>ID: {problem.id.slice(0, 16)}...</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#FAF8F5] border border-black text-[9px] font-black uppercase">
                          {problem.regionLabel}
                        </span>
                        <button
                          onClick={(e) => toggleBookmark(problem.id, e)}
                          className="w-7 h-7 bg-white border border-black flex items-center justify-center hover:bg-[#FFDE59] transition-colors cursor-pointer"
                          title={isSaved ? 'Remove from saved' : 'Save problem'}
                        >
                          <Bookmark size={13} className={isSaved ? 'fill-red-600 text-red-600' : 'text-black'} />
                        </button>
                      </div>
                    </div>

                    {/* Card Content Area */}
                    <div className="p-5 sm:p-6">

                      {/* Badges Bar */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-[#FFDE59] border border-black text-[10px] font-black uppercase text-black shadow-[1px_1px_0px_#000]">
                          {problem.nicheLabel}
                        </span>
                        <span className={`px-2 py-0.5 border border-black text-[10px] font-black uppercase shadow-[1px_1px_0px_#000] ${problem.badgeColor}`}>
                          {problem.urgencyLabel}
                        </span>
                        <span className="px-2 py-0.5 bg-black text-[#00F0FF] border border-black text-[10px] font-black uppercase ml-auto">
                          MOAT: {problem.moatScore}/100
                        </span>
                      </div>

                      {/* Problem Title & Hook */}
                      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black leading-tight mb-2">
                        {problem.title}
                      </h3>
                      <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed mb-4">
                        {problem.tagline}
                      </p>

                      {/* Analogy Callout Box */}
                      {problem.analogy && (
                        <div className="mb-4 p-2.5 bg-[#FFDE59]/20 border-2 border-dashed border-black flex items-center gap-2.5">
                          <span className="text-[10px] font-black text-black bg-[#FFDE59] px-2 py-0.5 border border-black uppercase shadow-[1.5px_1.5px_0px_#000] shrink-0">
                            ⚡ ANALOGY
                          </span>
                          <span className="text-xs font-black text-black uppercase tracking-wide">
                            {problem.analogy}
                          </span>
                        </div>
                      )}

                      {/* 3 Visceral Pain Points */}
                      <div className="space-y-2 mb-6 bg-[#FAF8F5] p-3.5 border-2 border-black">
                        <div className="text-[10px] font-black uppercase text-gray-500 mb-1 flex items-center gap-1">
                          <AlertTriangle size={12} className="text-[#FF0033]" />
                          <span>DOCUMENTED INDUSTRY PAIN SIGNALS:</span>
                        </div>
                        {problem.painPoints?.map((pt, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs font-bold text-gray-800 uppercase leading-snug">
                            <span className="text-[#FF0033] font-black select-none shrink-0">[!]</span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>

                      {/* Market Economics Matrix */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-3 border-y-2 border-black mb-5 text-[11px] font-bold uppercase">
                        <div>
                          <span className="text-gray-500 block text-[9px] font-black">TARGET BUYER</span>
                          <span className="text-black font-black truncate block" title={problem.targetBuyer}>
                            {problem.targetBuyer.split(',')[0]}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 block text-[9px] font-black">VALIDATED WTP</span>
                          <span className="text-emerald-700 font-black truncate block">
                            {problem.wtp}
                          </span>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <span className="text-gray-500 block text-[9px] font-black">MARKET TAM</span>
                          <span className="text-blue-700 font-black block">
                            {problem.tam}
                          </span>
                        </div>
                      </div>

                      {/* Incumbent Blindspot Box */}
                      <div className="mb-4 p-3 bg-red-50 border-2 border-black">
                        <span className="text-[10px] font-black uppercase text-[#FF0033] block mb-1">
                          // WHY INCUMBENTS CAN'T / WON'T SOLVE IT:
                        </span>
                        <p className="text-xs font-bold text-gray-800 uppercase leading-snug">
                          {problem.incumbentFlaw}
                        </p>
                      </div>

                      {/* Suggested MVP Wedge */}
                      <div className="p-3 bg-[#CCFF00]/20 border-2 border-black">
                        <span className="text-[10px] font-black uppercase text-black block mb-1">
                          // SUGGESTED MVP ATTACK WEDGE:
                        </span>
                        <p className="text-xs font-bold text-gray-800 uppercase leading-snug">
                          {problem.suggestedWedge}
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className="p-4 sm:p-5 bg-[#FAF8F5] border-t-4 border-black flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveModalProblem(problem)}
                      className="px-4 py-2.5 bg-white hover:bg-neutral-100 text-black font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye size={14} className="stroke-[2.5]" />
                      <span>[ 🔍 INSPECT THESIS ]</span>
                    </button>

                    <button
                      onClick={(e) => handleSendToCockpit(problem, e)}
                      className="px-4 py-2.5 bg-[#FFDE59] hover:bg-[#CCFF00] text-black font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
                    >
                      <Rocket size={14} className="stroke-[3]" />
                      <span>[ 🚀 SEND TO COCKPIT ]</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* ═══ 4. IN-DEPTH PROBLEM DOSSIER MODAL ═══ */}
      <AnimatePresence>
        {activeModalProblem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProblem(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white border-4 border-black shadow-[12px_12px_0px_#000] max-w-3xl w-full max-h-[90vh] overflow-y-auto relative z-10 font-mono my-auto"
            >
              {/* Modal Window Titlebar */}
              <div className="bg-[#FAF8F5] border-b-4 border-black p-4 flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-[#FF0033] border border-black" />
                  <div className="w-3.5 h-3.5 bg-[#FFDE59] border border-black" />
                  <div className="w-3.5 h-3.5 bg-[#CCFF00] border border-black" />
                  <span className="ml-2 text-xs font-black uppercase text-black flex items-center gap-1.5">
                    {activeModalProblem.number && (
                      <span className="bg-black text-[#FFDE59] px-1.5 py-0.2 border border-black font-black">
                        #{String(activeModalProblem.number).padStart(2, '0')}
                      </span>
                    )}
                    <span>[ STARTUP THESIS DOSSIER // {activeModalProblem.id} ]</span>
                  </span>
                </div>
                <button
                  onClick={() => setActiveModalProblem(null)}
                  className="w-7 h-7 bg-black text-white flex items-center justify-center hover:bg-[#FF0033] transition-colors font-black text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">

                {/* Header Section */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-[#FFDE59] border border-black text-[10px] font-black uppercase text-black">
                      {activeModalProblem.nicheLabel}
                    </span>
                    <span className="px-2 py-0.5 bg-[#00F0FF] border border-black text-[10px] font-black uppercase text-black">
                      {activeModalProblem.regionLabel}
                    </span>
                    <span className={`px-2 py-0.5 border border-black text-[10px] font-black uppercase ${activeModalProblem.badgeColor}`}>
                      {activeModalProblem.urgencyLabel}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase text-black leading-tight mb-2">
                    {activeModalProblem.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-gray-700 uppercase leading-relaxed mb-4">
                    {activeModalProblem.tagline}
                  </p>

                  {/* Analogy Callout in Modal */}
                  {activeModalProblem.analogy && (
                    <div className="p-3 bg-[#FFDE59]/25 border-2 border-black flex items-center gap-2.5 shadow-[2px_2px_0px_#000]">
                      <span className="text-[10px] font-black text-black bg-[#FFDE59] px-2 py-0.5 border border-black uppercase shadow-[1.5px_1.5px_0px_#000] shrink-0">
                        ⚡ ANALOGY
                      </span>
                      <span className="text-xs sm:text-sm font-black text-black uppercase tracking-wide">
                        {activeModalProblem.analogy}
                      </span>
                    </div>
                  )}
                </div>

                {/* Economics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#FAF8F5] border-2 border-black">
                  <div>
                    <span className="text-[10px] font-black text-gray-500 uppercase block">MARKET TAM</span>
                    <span className="text-base font-black text-blue-700">{activeModalProblem.tam}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-gray-500 uppercase block">ESTIMATED SAM</span>
                    <span className="text-base font-black text-black">{activeModalProblem.sam}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-gray-500 uppercase block">TARGET WTP</span>
                    <span className="text-base font-black text-emerald-700">{activeModalProblem.wtp}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-gray-500 uppercase block">DEFENSIBILITY</span>
                    <span className="text-base font-black text-purple-700">{activeModalProblem.moatScore}/100</span>
                  </div>
                </div>

                {/* Root Cause & Pain Points */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#FF0033] border border-black inline-block" />
                    <span>ROOT CAUSE & INDUSTRY PAIN SIGNALS</span>
                  </h4>
                  <div className="space-y-2 bg-[#FAF8F5] p-4 border-2 border-black">
                    {activeModalProblem.painPoints?.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-bold text-gray-800 uppercase leading-relaxed">
                        <span className="text-[#FF0033] font-black select-none shrink-0">[!]</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Incumbent Blindspot & Defense */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#FF8811] border border-black inline-block" />
                    <span>WHY INCUMBENTS WON'T / CAN'T BUILD THIS</span>
                  </h4>
                  <div className="p-4 bg-red-50 border-2 border-black text-xs font-bold text-gray-800 uppercase leading-relaxed">
                    {activeModalProblem.incumbentFlaw}
                  </div>
                </div>

                {/* First 10 Customers Acquisition Playbook */}
                {activeModalProblem.firstCustomersPlaybook && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-[#00F0FF] border border-black inline-block" />
                      <span>FIRST 10 CUSTOMERS ACQUISITION PLAYBOOK</span>
                    </h4>
                    <div className="p-4 bg-blue-50 border-2 border-black space-y-3 text-xs">
                      <div>
                        <span className="text-[10px] font-black uppercase text-blue-900 block mb-1">
                          TARGET TITLES TO PROSPECT:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeModalProblem.firstCustomersPlaybook.idealTitles.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-white border border-black font-black uppercase text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-black uppercase text-blue-900 block mb-1">
                          PROSPECTING LINKEDIN SEARCH QUERY:
                        </span>
                        <code className="p-2 bg-white border border-black block text-[11px] font-mono select-all">
                          {activeModalProblem.firstCustomersPlaybook.searchQuery}
                        </code>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black uppercase text-blue-900">
                            HIGH-CONVERSION COLD OUTREACH ANGLE:
                          </span>
                          <button
                            onClick={() => copyColdEmail(activeModalProblem.firstCustomersPlaybook.coldAngle)}
                            className="text-[10px] font-black uppercase flex items-center gap-1 text-black hover:text-blue-700 cursor-pointer"
                          >
                            {copiedColdEmail ? <Check size={12} /> : <Copy size={12} />}
                            <span>{copiedColdEmail ? 'COPIED!' : 'COPY ANGLE'}</span>
                          </button>
                        </div>
                        <div className="p-3 bg-white border border-black font-bold uppercase text-[11px] leading-relaxed">
                          {activeModalProblem.firstCustomersPlaybook.coldAngle}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tech Blueprint */}
                {activeModalProblem.techBlueprint && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-[#CCFF00] border border-black inline-block" />
                      <span>RECOMMENDED MVP TECH STACK BLUEPRINT</span>
                    </h4>
                    <div className="p-4 bg-[#CCFF00]/15 border-2 border-black space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {activeModalProblem.techBlueprint.stack.map((stk, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-white border-2 border-black font-black uppercase text-[11px] shadow-[2px_2px_0px_#000]">
                            {stk}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] font-bold text-gray-700 uppercase mt-2">
                        // NOTE: {activeModalProblem.techBlueprint.difficultyNote}
                      </p>
                    </div>
                  </div>
                )}

                {/* Launch CTA in Founder Cockpit */}
                <div className="pt-4 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveModalProblem(null)}
                    className="w-full sm:w-auto px-5 py-3 bg-white border-2 border-black font-black text-xs uppercase hover:bg-neutral-100 cursor-pointer"
                  >
                    [ CLOSE DOSSIER ]
                  </button>

                  <button
                    onClick={(e) => handleSendToCockpit(activeModalProblem, e)}
                    className="w-full sm:w-auto px-6 py-3 bg-[#FFDE59] hover:bg-[#CCFF00] text-black font-black text-xs uppercase border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Rocket size={16} className="stroke-[3]" />
                    <span>[ 🚀 LAUNCH IN FOUNDER'S COCKPIT ]</span>
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══ 5. SUBMIT A VALIDATED PROBLEM MODAL ═══ */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSubmitModal(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white border-4 border-black shadow-[12px_12px_0px_#000] max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10 font-mono my-auto"
            >
              {/* Modal Window Titlebar */}
              <div className="bg-[#FFDE59] border-b-4 border-black p-4 flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-black" />
                  <span className="text-xs font-black uppercase text-black">
                    [ SUBMIT A VALIDATED INDUSTRY PROBLEM ]
                  </span>
                </div>
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="w-7 h-7 bg-black text-white flex items-center justify-center hover:bg-[#FF0033] transition-colors font-black text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleCreateProblem} className="p-6 sm:p-8 space-y-4">
                <div>
                  <label className="text-xs font-black uppercase text-black block mb-1">
                    PROBLEM TITLE / HOOK *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProblemForm.title}
                    onChange={(e) => setNewProblemForm({ ...newProblemForm, title: e.target.value })}
                    placeholder="e.g. Distributed Consensus Deadlock in Heterogeneous Edge Nodes"
                    className="w-full p-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-black uppercase text-black block mb-1">NICHE</label>
                    <select
                      value={newProblemForm.niche}
                      onChange={(e) => setNewProblemForm({ ...newProblemForm, niche: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase"
                    >
                      {niches.filter(n => n.id !== 'all').map(n => (
                        <option key={n.id} value={n.id}>{n.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-black block mb-1">REGION</label>
                    <select
                      value={newProblemForm.region}
                      onChange={(e) => setNewProblemForm({ ...newProblemForm, region: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase"
                    >
                      {regions.filter(r => r.id !== 'all').map(r => (
                        <option key={r.id} value={r.id}>{r.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-black block mb-1">SEVERITY</label>
                    <select
                      value={newProblemForm.urgency}
                      onChange={(e) => setNewProblemForm({ ...newProblemForm, urgency: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase"
                    >
                      {urgencyLevels.filter(u => u.id !== 'all').map(u => (
                        <option key={u.id} value={u.id}>{u.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase text-black block mb-1">
                    VISCERAL PROBLEM SUMMARY (1-2 SENTENCES) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={newProblemForm.tagline}
                    onChange={(e) => setNewProblemForm({ ...newProblemForm, tagline: e.target.value })}
                    placeholder="Describe the exact friction point and who is suffering from it..."
                    className="w-full p-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase focus:outline-none focus:bg-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black uppercase text-black block mb-1">TARGET BUYER (TITLE)</label>
                    <input
                      type="text"
                      value={newProblemForm.targetBuyer}
                      onChange={(e) => setNewProblemForm({ ...newProblemForm, targetBuyer: e.target.value })}
                      placeholder="e.g. VP Infrastructure / CISO"
                      className="w-full p-2.5 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-black block mb-1">WILLINGNESS TO PAY</label>
                    <input
                      type="text"
                      value={newProblemForm.wtp}
                      onChange={(e) => setNewProblemForm({ ...newProblemForm, wtp: e.target.value })}
                      placeholder="e.g. $4,000 / mo or $50k ACV"
                      className="w-full p-2.5 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-black block mb-1">WHY CAN'T INCUMBENTS FIX THIS?</label>
                  <input
                    type="text"
                    value={newProblemForm.incumbentFlaw}
                    onChange={(e) => setNewProblemForm({ ...newProblemForm, incumbentFlaw: e.target.value })}
                    placeholder="e.g. Legacy vendors have architectural lock-in with high cloud fees"
                    className="w-full p-2.5 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-black block mb-1">SUGGESTED MVP ATTACK WEDGE</label>
                  <input
                    type="text"
                    value={newProblemForm.suggestedWedge}
                    onChange={(e) => setNewProblemForm({ ...newProblemForm, suggestedWedge: e.target.value })}
                    placeholder="e.g. A zero-config proxy that patches the bug in under 5 minutes"
                    className="w-full p-2.5 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase"
                  />
                </div>

                <div className="pt-4 border-t-2 border-black flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2.5 bg-white border-2 border-black font-black text-xs uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#CCFF00] hover:bg-[#FFDE59] text-black font-black text-xs uppercase border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                  >
                    [ PUBLISH PROBLEM ]
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══ 6. BRUTALIST FOOTER ═══ */}
      <footer className="bg-black text-white border-t-4 border-black pt-12 pb-8 px-6 md:px-12 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-black uppercase">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFDE59] border border-black flex items-center justify-center font-black text-black text-base shadow-[2px_2px_0px_#fff]">
              H
            </div>
            <div>
              <span className="text-[#FFDE59] block">HYPERS STARTUP PROBLEM RADAR</span>
              <span className="text-neutral-500 text-[10px]">MISSION-CRITICAL B2B PAIN DIRECTORY</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-neutral-400">
            <Link to="/pitch" className="hover:text-[#FFDE59] transition-colors">[ FOUNDER COCKPIT ]</Link>
            <Link to="/courses" className="hover:text-white transition-colors">[ CURRICULA ]</Link>
            <Link to="/ide" className="text-[#CCFF00] hover:underline">[ WORKSPACE ]</Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[#FFDE59] hover:underline cursor-pointer"
            >
              [ ↑ TOP ]
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
