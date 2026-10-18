import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Building, Sparkles, Target, CheckCircle2, ChevronRight, Layers, ChevronDown, Briefcase, Clock, BookOpen, Code, Brain, Users, ArrowRight, Zap, TrendingUp, AlertCircle, Star, Search, X } from 'lucide-react';
import { roleRoadmaps } from '../data/roleRoadmaps';
import RoadmapFlow from '../components/RoadmapFlow';
import { generateCustomPlan, companySuggestions, roleSuggestions, companyProfiles, roleConfigs } from '../data/customPlanGenerator';

export default function StudyPlanner() {
  const [activeTab, setActiveTab] = useState('roles');
  const [selectedRole, setSelectedRole] = useState('Frontend');

  // Custom plan state
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
  const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);
  const [companySearch, setCompanySearch] = useState('');
  const [roleSearch, setRoleSearch] = useState('');

  const companyRef = useRef(null);
  const roleRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (companyRef.current && !companyRef.current.contains(e.target)) setShowCompanySuggestions(false);
      if (roleRef.current && !roleRef.current.contains(e.target)) setShowRoleSuggestions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredCompanies = companySuggestions.filter(c => c.toLowerCase().includes(companySearch.toLowerCase()));
  const filteredRoles = roleSuggestions.filter(r => r.toLowerCase().includes(roleSearch.toLowerCase()));

  const handleGenerate = () => {
    if (!company || !role || !interviewDate) return;
    setIsGenerating(true);
    setGeneratedPlan(null);
    setTimeout(() => {
      const plan = generateCustomPlan(company, role, interviewDate);
      setGeneratedPlan(plan);
      setExpandedPhase(0);
      setCompletedTasks({});
      setIsGenerating(false);
    }, 1200);
  };

  const toggleTask = (phaseIdx, taskIdx, itemIdx) => {
    const key = `${phaseIdx}-${taskIdx}-${itemIdx}`;
    setCompletedTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getPhaseProgress = (phaseIdx) => {
    if (!generatedPlan) return 0;
    const phase = generatedPlan.phases[phaseIdx];
    let total = 0;
    let completed = 0;
    phase.tasks.forEach((task, tIdx) => {
      task.items.forEach((_, iIdx) => {
        total++;
        if (completedTasks[`${phaseIdx}-${tIdx}-${iIdx}`]) completed++;
      });
    });
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const getTotalProgress = () => {
    if (!generatedPlan) return 0;
    let total = 0;
    let completed = 0;
    generatedPlan.phases.forEach((phase, pIdx) => {
      phase.tasks.forEach((task, tIdx) => {
        task.items.forEach((_, iIdx) => {
          total++;
          if (completedTasks[`${pIdx}-${tIdx}-${iIdx}`]) completed++;
        });
      });
    });
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const getPhaseTypeBadge = (type) => {
    switch (type) {
      case 'study': return 'bg-[#00F0FF] text-black';
      case 'practice': return 'bg-[#CCFF00] text-black';
      case 'prepare': return 'bg-[#FFDE59] text-black';
      default: return 'bg-[#FF52D9] text-black';
    }
  };

  const selectedCompanyProfile = companyProfiles[company];

  return (
    <div className="flex flex-col md:flex-row h-full font-mono bg-[#FAF8F5]">
      {/* Configuration Sidebar Pane */}
      <div className="w-full md:w-[380px] border-r-4 border-black bg-white overflow-y-auto p-6 flex flex-col shrink-0">
        
        {/* Planner Header Box */}
        <div className="border-3 border-black bg-[#FFDE59] p-4 shadow-[4px_4px_0px_#000] mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={18} className="text-black stroke-[2.5]" />
            <span className="text-[11px] font-black uppercase tracking-wider text-black">Curriculum Engine</span>
          </div>
          <h2 className="text-2xl font-black text-black uppercase tracking-tight">Study Planner</h2>
        </div>
        
        {/* Tab Selection Switcher */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <button 
            onClick={() => setActiveTab('roles')}
            className={`py-2.5 text-xs font-black uppercase border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${
              activeTab === 'roles' 
                ? 'bg-black text-white' 
                : 'bg-white text-black hover:bg-[#FFDE59]'
            }`}
          >
            Role Roadmaps
          </button>
          <button 
            onClick={() => setActiveTab('custom')}
            className={`py-2.5 text-xs font-black uppercase border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${
              activeTab === 'custom' 
                ? 'bg-black text-white' 
                : 'bg-white text-black hover:bg-[#00F0FF]'
            }`}
          >
            AI Custom Path
          </button>
        </div>

        {activeTab === 'custom' ? (
          <div>
            <div className="border-2 border-black bg-[#CCFF00] p-3 shadow-[3px_3px_0px_#000] mb-5">
              <p className="text-black text-xs font-black uppercase flex items-center gap-1.5">
                <Target size={14} className="stroke-[2.5]" /> Personalized Syllabus
              </p>
              <p className="text-black text-[11px] font-bold mt-1">
                Select your company, role, and timeline to generate an intensive study roadmap.
              </p>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}>
              {/* Target Company */}
              <div ref={companyRef} className="relative">
                <label className="block text-xs font-black text-black uppercase mb-1.5 flex items-center gap-1.5">
                  <Building size={14} className="stroke-[2.5]" /> Target Company
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={companySearch || company}
                    onChange={(e) => { setCompanySearch(e.target.value); setCompany(''); setShowCompanySuggestions(true); }}
                    onFocus={() => setShowCompanySuggestions(true)}
                    className="w-full border-3 border-black bg-[#F8F6F0] py-2.5 pl-3 pr-8 text-black font-mono font-bold text-xs uppercase focus:outline-none focus:bg-white shadow-[3px_3px_0px_#000]"
                    placeholder="SEARCH (E.G. GOOGLE, META)..."
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {company ? (
                      <button type="button" onClick={() => { setCompany(''); setCompanySearch(''); }} className="text-black font-black">
                        <X size={14} className="stroke-[3]" />
                      </button>
                    ) : (
                      <ChevronDown size={14} className="text-black stroke-[3]" />
                    )}
                  </div>
                </div>

                {showCompanySuggestions && (
                  <div className="absolute z-50 w-full mt-2 bg-white border-3 border-black shadow-[4px_4px_0px_#000] max-h-[220px] overflow-y-auto">
                    {filteredCompanies.length === 0 ? (
                      <div className="p-3 text-neutral-600 text-xs font-bold">NO COMPANIES FOUND</div>
                    ) : (
                      filteredCompanies.map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => { setCompany(c); setCompanySearch(''); setShowCompanySuggestions(false); }}
                          className={`w-full text-left p-2.5 flex items-center gap-2 border-b border-neutral-200 hover:bg-[#FFDE59] transition-colors text-xs font-bold ${company === c ? 'bg-[#00F0FF] text-black font-black' : 'text-black'}`}
                        >
                          <span className="text-base">{companyProfiles[c]?.logo}</span>
                          <span className="font-black uppercase flex-1">{c}</span>
                          <span className="text-[10px] px-1.5 py-0.5 border border-black bg-white uppercase font-black">{companyProfiles[c]?.difficulty}</span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Selected Company Profile Badge */}
              {selectedCompanyProfile && (
                <div className="border-2 border-black bg-[#FFFEF0] p-2.5 shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">{selectedCompanyProfile.logo}</span>
                    <span className="text-black font-black text-xs uppercase">{company}</span>
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 border border-black bg-[#FFDE59] font-black uppercase">
                      {selectedCompanyProfile.difficulty}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedCompanyProfile.focusAreas.map(area => (
                      <span key={area} className="text-[9px] px-1.5 py-0.5 border border-black bg-white font-bold uppercase">{area}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Target Role */}
              <div ref={roleRef} className="relative">
                <label className="block text-xs font-black text-black uppercase mb-1.5 flex items-center gap-1.5">
                  <Briefcase size={14} className="stroke-[2.5]" /> Target Role
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={roleSearch || role}
                    onChange={(e) => { setRoleSearch(e.target.value); setRole(''); setShowRoleSuggestions(true); }}
                    onFocus={() => setShowRoleSuggestions(true)}
                    className="w-full border-3 border-black bg-[#F8F6F0] py-2.5 pl-3 pr-8 text-black font-mono font-bold text-xs uppercase focus:outline-none focus:bg-white shadow-[3px_3px_0px_#000]"
                    placeholder="SEARCH (E.G. FRONTEND, DEVOPS)..."
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {role ? (
                      <button type="button" onClick={() => { setRole(''); setRoleSearch(''); }} className="text-black font-black">
                        <X size={14} className="stroke-[3]" />
                      </button>
                    ) : (
                      <ChevronDown size={14} className="text-black stroke-[3]" />
                    )}
                  </div>
                </div>

                {showRoleSuggestions && (
                  <div className="absolute z-50 w-full mt-2 bg-white border-3 border-black shadow-[4px_4px_0px_#000] max-h-[220px] overflow-y-auto">
                    {filteredRoles.length === 0 ? (
                      <div className="p-3 text-neutral-600 text-xs font-bold">NO ROLES FOUND</div>
                    ) : (
                      filteredRoles.map(r => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => { setRole(r); setRoleSearch(''); setShowRoleSuggestions(false); }}
                          className={`w-full text-left p-2.5 flex items-center gap-2 border-b border-neutral-200 hover:bg-[#00F0FF] transition-colors text-xs font-bold ${role === r ? 'bg-[#FFDE59] text-black font-black' : 'text-black'}`}
                        >
                          <Briefcase size={12} className="stroke-[2.5]" />
                          <span className="font-black uppercase flex-1">{r}</span>
                          <span className="text-[10px] text-neutral-600">{roleConfigs[r]?.alias}</span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Interview Date */}
              <div>
                <label className="block text-xs font-black text-black uppercase mb-1.5 flex items-center gap-1.5">
                  <Calendar size={14} className="stroke-[2.5]" /> Target Interview Date
                </label>
                <input
                  type="date"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border-3 border-black bg-[#F8F6F0] py-2.5 px-3 text-black font-mono font-bold text-xs uppercase focus:outline-none focus:bg-white shadow-[3px_3px_0px_#000]"
                />
                {interviewDate && (
                  <p className="text-[11px] text-neutral-700 font-bold mt-1.5 flex items-center gap-1">
                    <Clock size={12} className="stroke-[2.5]" />
                    {Math.max(0, Math.ceil((new Date(interviewDate) - new Date()) / (1000 * 60 * 60 * 24)))} DAYS REMAINING
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!company || !role || !interviewDate || isGenerating}
                className="w-full mt-2 border-3 border-black bg-[#CCFF00] hover:bg-[#b8e600] disabled:bg-neutral-200 disabled:text-neutral-500 disabled:border-neutral-400 disabled:shadow-none text-black font-mono font-black text-xs uppercase py-3.5 shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    GENERATING SYLLABUS...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} className="stroke-[2.5]" />
                    GENERATE AI PLAN
                    <ArrowRight size={14} className="stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>

            {/* Plan Stats Summary */}
            {generatedPlan && (
              <div className="mt-6 border-t-3 border-black pt-4 space-y-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-black uppercase text-black">OVERALL COMPLETION</span>
                  <span className="text-xs font-black bg-[#00F0FF] px-2 py-0.5 border border-black">{getTotalProgress()}%</span>
                </div>
                <div className="w-full h-3 border-2 border-black bg-white overflow-hidden shadow-[2px_2px_0px_#000]">
                  <div 
                    className="h-full bg-[#CCFF00] transition-all duration-300"
                    style={{ width: `${getTotalProgress()}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="border-2 border-black bg-white p-2.5 shadow-[2px_2px_0px_#000]">
                    <div className="text-xl font-black text-black">{generatedPlan.totalWeeks}</div>
                    <div className="text-[9px] text-neutral-600 uppercase font-black">Weeks</div>
                  </div>
                  <div className="border-2 border-black bg-white p-2.5 shadow-[2px_2px_0px_#000]">
                    <div className="text-xl font-black text-black">{generatedPlan.phases.length}</div>
                    <div className="text-[9px] text-neutral-600 uppercase font-black">Phases</div>
                  </div>
                </div>

                {/* Phase Navigator */}
                <div className="pt-2">
                  <h4 className="text-xs font-black text-black uppercase mb-2">Phase Index</h4>
                  <div className="space-y-1.5">
                    {generatedPlan.phases.map((phase, idx) => (
                      <button
                        key={idx}
                        onClick={() => setExpandedPhase(idx)}
                        className={`w-full text-left px-3 py-2 border-2 border-black font-mono font-bold text-xs uppercase flex items-center justify-between shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${
                          expandedPhase === idx 
                            ? 'bg-[#FFDE59] text-black font-black' 
                            : 'bg-white text-black hover:bg-neutral-100'
                        }`}
                      >
                        <span className="truncate flex-1">{phase.title}</span>
                        <span className="text-[10px] ml-2 font-black bg-black text-white px-1.5 py-0.2">{getPhaseProgress(idx)}%</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Role Based Roadmaps Selector */
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="text-black stroke-[2.5]" size={16} />
              <h3 className="text-xs font-black uppercase text-black">Select Career Track</h3>
            </div>
            <p className="text-neutral-600 text-xs font-bold mb-4">Choose a role track to render the interactive syllabus flowchart.</p>
            
            <div className="space-y-5">
              {['Role Based', 'Skill Based', 'Beginner'].map(category => {
                const categoryRoadmaps = Object.entries(roleRoadmaps).filter(
                  ([_, data]) => data.category === category
                );
                
                if (categoryRoadmaps.length === 0) return null;

                return (
                  <div key={category}>
                    <h4 className="text-[11px] font-black uppercase text-black tracking-wider mb-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-black"></span> {category} Tracks
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {categoryRoadmaps.map(([roleName]) => (
                        <button
                          key={roleName}
                          onClick={() => setSelectedRole(roleName)}
                          className={`px-3 py-1.5 border-2 border-black font-mono font-bold text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${
                            selectedRole === roleName 
                            ? 'bg-[#00F0FF] text-black font-black' 
                            : 'bg-white text-black hover:bg-[#FFDE59]'
                          }`}
                        >
                          {roleName}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Roadmap Display Area */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        {activeTab === 'custom' ? (
          <div>
            {isGenerating && (
              <div className="flex flex-col items-center justify-center h-[50vh] border-4 border-black bg-white shadow-[6px_6px_0px_#000] p-8 text-center">
                <div className="w-16 h-16 border-4 border-black border-t-[#CCFF00] rounded-full animate-spin mb-4"></div>
                <h3 className="text-2xl font-black uppercase text-black">COMPUTING CUSTOM SYLLABUS...</h3>
                <p className="text-neutral-600 font-bold text-xs mt-2">CALIBRATING COMPANY HIRING TRENDS & TIMELINE...</p>
              </div>
            )}

            {!generatedPlan && !isGenerating && (
              <div className="flex flex-col items-center justify-center h-[60vh] border-4 border-black bg-white shadow-[6px_6px_0px_#000] p-8 text-center">
                <div className="w-20 h-20 border-3 border-black bg-[#FFDE59] flex items-center justify-center mb-6 shadow-[4px_4px_0px_#000]">
                  <Brain size={40} className="text-black stroke-[2.5]" />
                </div>
                <h3 className="text-3xl font-black text-black uppercase mb-2">CUSTOM INTERVIEW BLUEPRINT</h3>
                <p className="text-neutral-700 text-xs md:text-sm font-bold max-w-md leading-relaxed">
                  Configure your target company, role, and target interview date in the left configuration panel to generate an optimized week-by-week schedule.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 w-full max-w-lg">
                  {[
                    { icon: <Building size={16} className="stroke-[2.5]" />, label: "30+ COMPANIES" },
                    { icon: <Briefcase size={16} className="stroke-[2.5]" />, label: "12+ TECH ROLES" },
                    { icon: <TrendingUp size={16} className="stroke-[2.5]" />, label: "DAILY TARGETS" }
                  ].map((item, i) => (
                    <div key={i} className="border-2 border-black bg-[#F8F6F0] p-3 text-center shadow-[2px_2px_0px_#000]">
                      <div className="flex justify-center mb-1 text-black">{item.icon}</div>
                      <span className="text-[10px] font-black uppercase text-black">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {generatedPlan && !isGenerating && (
              <div className="space-y-6">
                {/* Plan Header */}
                <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_#000]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F0FF] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] mb-2">
                        <span className="text-base">{generatedPlan.companyProfile.logo}</span>
                        {generatedPlan.company} RECRUITMENT PATH
                      </div>
                      <h1 className="text-3xl md:text-4xl font-black uppercase text-black">
                        {generatedPlan.role}
                      </h1>
                      <p className="text-neutral-700 text-xs font-bold mt-1">
                        {generatedPlan.totalWeeks}-WEEK PERSONALIZED STUDY SPRINT • TARGET DATE: {generatedPlan.interviewDate}
                      </p>
                    </div>
                    <div className="border-3 border-black bg-[#FFDE59] p-4 text-center shadow-[4px_4px_0px_#000] shrink-0">
                      <div className="text-3xl font-black text-black">{getTotalProgress()}%</div>
                      <div className="text-[10px] font-black uppercase text-black">SPRINT PROGRESS</div>
                    </div>
                  </div>
                </div>

                {/* Interview Rounds */}
                <div className="border-3 border-black bg-[#F8F6F0] p-5 shadow-[4px_4px_0px_#000]">
                  <h3 className="text-xs font-black uppercase text-black mb-3 flex items-center gap-2">
                    <Zap size={14} className="stroke-[2.5]" /> INTERVIEW ROUND SEQUENCE AT {generatedPlan.company}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {generatedPlan.interviewRounds.map((round, i) => (
                      <div key={i} className="flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 shadow-[2px_2px_0px_#000]">
                        <span className="w-5 h-5 bg-black text-white font-black text-xs flex items-center justify-center">{i + 1}</span>
                        <span className="text-black font-bold text-xs uppercase">{round}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phases Timeline */}
                <div className="space-y-4">
                  {generatedPlan.phases.map((phase, phaseIdx) => {
                    const isExpanded = expandedPhase === phaseIdx;
                    const progress = getPhaseProgress(phaseIdx);

                    return (
                      <div
                        key={phaseIdx}
                        className={`border-3 border-black bg-white shadow-[4px_4px_0px_#000] transition-all ${
                          isExpanded ? 'border-4 shadow-[6px_6px_0px_#000]' : ''
                        }`}
                      >
                        <button
                          onClick={() => setExpandedPhase(isExpanded ? null : phaseIdx)}
                          className="w-full text-left p-4 md:p-5 flex items-center gap-4 cursor-pointer select-none hover:bg-[#FFFEF0] transition-colors"
                        >
                          <div className={`w-12 h-12 border-2 border-black ${getPhaseTypeBadge(phase.type)} shadow-[2px_2px_0px_#000] flex items-center justify-center shrink-0 font-black text-xl`}>
                            {phase.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.2">{phase.weekLabel}</span>
                              <span className={`text-[10px] font-black uppercase border border-black px-1.5 py-0.2 ${getPhaseTypeBadge(phase.type)}`}>
                                {phase.type}
                              </span>
                            </div>
                            <h3 className="text-lg font-black text-black uppercase truncate">{phase.title}</h3>
                            <p className="text-neutral-600 text-xs font-bold truncate mt-0.5">{phase.description}</p>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-xs font-black border-2 border-black bg-white px-2 py-1 shadow-[2px_2px_0px_#000]">
                              {progress}%
                            </span>
                            <div className="p-1 border-2 border-black bg-white shadow-[2px_2px_0px_#000]">
                              <ChevronDown size={16} className={`text-black stroke-[3] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                          </div>
                        </button>

                        {/* Expanded Tasks Checklist */}
                        {isExpanded && (
                          <div className="p-5 border-t-3 border-black bg-[#FAF8F5] space-y-4">
                            {phase.tasks.map((task, taskIdx) => (
                              <div key={taskIdx} className="border-2 border-black bg-white p-4 shadow-[3px_3px_0px_#000]">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[10px] font-black uppercase text-neutral-600">{task.category}</span>
                                  <span className="text-[10px] px-2 py-0.5 border border-black bg-[#CCFF00] font-black uppercase">
                                    {task.difficulty}
                                  </span>
                                </div>
                                <h4 className="text-black font-black text-sm uppercase mb-3">{task.title}</h4>
                                <div className="space-y-2">
                                  {task.items.map((item, itemIdx) => {
                                    const isCompleted = completedTasks[`${phaseIdx}-${taskIdx}-${itemIdx}`];
                                    return (
                                      <button
                                        key={itemIdx}
                                        onClick={() => toggleTask(phaseIdx, taskIdx, itemIdx)}
                                        className={`w-full text-left flex items-center gap-3 p-2.5 border-2 border-black transition-all ${
                                          isCompleted 
                                            ? 'bg-[#CCFF00] shadow-[2px_2px_0px_#000]' 
                                            : 'bg-white hover:bg-neutral-100 shadow-[1px_1px_0px_#000]'
                                        }`}
                                      >
                                        <div className={`w-4 h-4 border-2 border-black flex items-center justify-center shrink-0 ${isCompleted ? 'bg-black' : 'bg-white'}`}>
                                          {isCompleted && <CheckCircle2 size={12} className="text-[#CCFF00] stroke-[3]" />}
                                        </div>
                                        <span className={`text-xs font-bold uppercase ${isCompleted ? 'line-through text-neutral-600' : 'text-black'}`}>
                                          {item}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pro Tips Box */}
                <div className="border-4 border-black bg-[#FFDE59] p-6 shadow-[6px_6px_0px_#000]">
                  <h3 className="text-sm font-black text-black uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Star size={16} className="text-black fill-black" /> INSIDER PRO TIPS FOR {generatedPlan.company}
                  </h3>
                  <div className="space-y-2.5">
                    {generatedPlan.tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                        <span className="w-5 h-5 bg-black text-[#FFDE59] font-black text-xs flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-black font-bold text-xs uppercase leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Role Roadmaps View */
          <div>
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_#000] mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F0FF] border-2 border-black text-black font-mono font-black text-xs uppercase shadow-[2px_2px_0px_#000] mb-2">
                <Sparkles size={14} className="stroke-[2.5]" /> Career Track Curriculum
              </div>
              <h1 className="text-3xl md:text-5xl font-black uppercase text-black">
                {roleRoadmaps[selectedRole]?.title}
              </h1>
              <p className="text-neutral-700 font-bold text-xs md:text-sm mt-2 max-w-3xl">
                {roleRoadmaps[selectedRole]?.description}
              </p>
            </div>

            {/* Interactive Timeline Roadmap matching roadmap.sh in Neo-Brutalist styling */}
            <RoadmapFlow roadmapData={roleRoadmaps[selectedRole]} />
          </div>
        )}
      </div>
    </div>
  );
}