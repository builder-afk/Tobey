import { useState, useMemo } from 'react';
import { Sparkles, Zap, Briefcase, Search, ChevronDown, ChevronUp, Building2, MapPin, Users, DollarSign, BookOpen, Target, Clock, Lightbulb, Filter, ArrowRight, Globe, Compass, Cpu, TrendingUp, Layers } from 'lucide-react';
import magicCompaniesData from '../data/magicCompaniesData';

const ROLE_CATEGORIES = [
  {
    name: 'All',
    roles: [
      'Forward Deployed Engineer',
      'Quantitative Researcher',
      'Equity Analyst',
      'AI Agent Architect',
      'GTM Engineer',
      'SRE',
      'Applied AI Engineer',
      'Product Engineer',
      'Design Engineer',
      'Business Development',
      'Deployment Strategist',
      'Research Engineer',
      'Full Stack',
      'Backend',
      'Frontend',
      'Mobile',
      'Data Science',
      'DevOps',
      'ML Engineer'
    ]
  },
  {
    name: 'Frontier AI & Research',
    icon: '🤖',
    roles: [
      'Applied AI Engineer',
      'AI Agent Architect',
      'Research Engineer',
      'ML Engineer',
      'Data Science'
    ]
  },
  {
    name: 'Quant & Finance',
    icon: '📈',
    roles: [
      'Quantitative Researcher',
      'Equity Analyst'
    ]
  },
  {
    name: 'Deployment & GTM',
    icon: '🚀',
    roles: [
      'Forward Deployed Engineer',
      'Deployment Strategist',
      'GTM Engineer',
      'Business Development'
    ]
  },
  {
    name: 'Core & Product',
    icon: '⚡',
    roles: [
      'Product Engineer',
      'Design Engineer',
      'Full Stack',
      'Backend',
      'Frontend',
      'Mobile',
      'SRE',
      'DevOps'
    ]
  }
];

const ALL_ROLES_LIST = ['All Roles', ...ROLE_CATEGORIES[0].roles];

const EXPERIENCE_LEVELS = ['All Experience', 'Fresher', '1-3 Years', '3-5 Years', '5-10 Years', '10+ Years'];
const COMPANY_TYPES = ['All Types', 'Big Tech', 'Product Company', 'IT Services', 'Finance', 'Startup', 'Startup (Unicorn)', 'Startup (Profitable)', 'MNC'];
const REGIONS = ['All Regions', 'India', 'US', 'Europe', 'Asia-Pacific', 'Middle East', 'Remote'];

const difficultyStyle = {
  'Easy': 'bg-[#CCFF00] text-black border-2 border-black font-black',
  'Medium': 'bg-[#FFDE59] text-black border-2 border-black font-black',
  'Medium-Hard': 'bg-[#FF9900] text-black border-2 border-black font-black',
  'Hard': 'bg-[#FF0033] text-white border-2 border-black font-black',
  'Very Hard': 'bg-black text-white border-2 border-black font-black',
};

const typeStyle = {
  'Big Tech': 'bg-[#FFDE59] text-black border-2 border-black font-black',
  'Product Company': 'bg-[#00F0FF] text-black border-2 border-black font-black',
  'IT Services': 'bg-[#CCFF00] text-black border-2 border-black font-black',
  'Finance': 'bg-[#FFD166] text-black border-2 border-black font-black',
  'Startup': 'bg-[#FF52D9] text-black border-2 border-black font-black',
  'Startup (Unicorn)': 'bg-[#A78BFA] text-black border-2 border-black font-black',
  'Startup (Profitable)': 'bg-[#4ADE80] text-black border-2 border-black font-black',
  'MNC': 'bg-[#E2E8F0] text-black border-2 border-black font-black',
};

export default function MagicCompanies() {
  const [selectedRoleCategory, setSelectedRoleCategory] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedExp, setSelectedExp] = useState('All Experience');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [showResults, setShowResults] = useState(false);
  const [activeView, setActiveView] = useState('discover'); // 'discover' or 'results'

  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return magicCompaniesData.filter(c => {
      const matchRole = selectedRole === 'All Roles' || c.roles.includes(selectedRole);
      const matchExp = selectedExp === 'All Experience' || c.experience.includes(selectedExp);
      const matchType = selectedType === 'All Types' || c.type.includes(selectedType.replace('All Types', ''));
      const matchRegion = selectedRegion === 'All Regions' || (c.regions && c.regions[selectedRegion]);
      const matchSearch = !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.prepTopics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchRole && matchExp && matchType && matchRegion && matchSearch;
    });
  }, [selectedRole, selectedExp, selectedType, selectedRegion, searchQuery]);

  const handleDiscover = () => {
    setActiveView('results');
    setShowResults(true);
    setExpandedIds(new Set());
  };

  const handleBack = () => {
    setActiveView('discover');
    setShowResults(false);
  };

  const currentCategoryRoles = useMemo(() => {
    const found = ROLE_CATEGORIES.find(c => c.name === selectedRoleCategory);
    return found ? found.roles : ROLE_CATEGORIES[0].roles;
  }, [selectedRoleCategory]);

  return (
    <div className="flex h-full font-mono bg-[#FAF8F5] overflow-y-auto">
      <div className="flex-1 flex flex-col w-full max-w-6xl mx-auto p-6 md:p-10">
        
        {/* Header */}
        <div className="border-4 border-black bg-white shadow-[6px_6px_0px_#000] p-6 md:p-8 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00] border-2 border-black text-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] mb-3">
            <Sparkles size={14} className="stroke-[2.5]" /> Precision Company Matching
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight">
            Magic Companies <span className="bg-[#FFDE59] px-2 border-2 border-black shadow-[3px_3px_0px_#000]">Discovery</span>
          </h1>
          <p className="text-neutral-700 font-bold text-xs md:text-sm mt-3 max-w-2xl mx-auto">
            Discover tech giants, quant hedge funds, and frontier AI labs actively hiring for specialized engineering, research, and deployment tracks.
          </p>
        </div>

        {/* Discovery Form Card */}
        <div className={`border-4 border-black bg-white shadow-[8px_8px_0px_#000] p-6 md:p-8 mb-8 transition-all duration-300 ${activeView === 'results' ? 'w-full' : 'max-w-4xl mx-auto w-full'}`}>
          
          <div className="flex items-center justify-between border-b-3 border-black pb-4 mb-6">
            <h3 className="text-lg md:text-xl font-black text-black uppercase flex items-center gap-2">
              <Target size={20} className="stroke-[2.5]" /> 
              {activeView === 'discover' ? "MATCH CRITERIA SELECTION" : 'REFINE MATCHING FILTERS'}
            </h3>
            {activeView === 'results' && (
              <button 
                onClick={handleBack} 
                className="text-xs font-black uppercase text-black border-2 border-black bg-white hover:bg-[#FFDE59] px-3 py-1 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                ← BACK TO DISCOVERY
              </button>
            )}
          </div>
          
          <div className="space-y-6">
            {/* Role Selection */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <label className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                  <Briefcase size={14} className="stroke-[2.5]" /> What role are you targeting?
                </label>
                {selectedRole !== 'All Roles' && (
                  <button
                    onClick={() => setSelectedRole('All Roles')}
                    className="text-[11px] font-black uppercase text-blue-600 hover:underline"
                  >
                    RESET TO ALL ROLES (SELECTED: {selectedRole})
                  </button>
                )}
              </div>

              {/* Discipline Category Switcher Tabs */}
              <div className="flex flex-wrap gap-1.5 mb-3 bg-[#F8F6F0] p-1.5 border-2 border-black">
                {ROLE_CATEGORIES.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedRoleCategory(cat.name)}
                    className={`px-3 py-1.5 font-mono text-xs font-black uppercase transition-all ${
                      selectedRoleCategory === cat.name
                        ? 'bg-black text-white shadow-[2px_2px_0px_#000]'
                        : 'bg-white text-black border border-black hover:bg-[#FFDE59]'
                    }`}
                  >
                    {cat.icon && <span className="mr-1">{cat.icon}</span>}
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Roles Chips Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                <button
                  onClick={() => setSelectedRole('All Roles')}
                  className={`border-2 border-black py-2 px-2.5 font-mono font-bold text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${
                    selectedRole === 'All Roles'
                      ? 'bg-black text-white font-black'
                      : 'bg-white text-black hover:bg-neutral-100'
                  }`}
                >
                  ⚡ All Roles
                </button>
                {currentCategoryRoles.map(role => (
                  <button 
                    key={role}
                    onClick={() => setSelectedRole(selectedRole === role ? 'All Roles' : role)}
                    className={`border-2 border-black py-2 px-2.5 font-mono font-bold text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all truncate text-left ${
                      selectedRole === role 
                        ? 'bg-[#00F0FF] text-black font-black' 
                        : 'bg-white text-black hover:bg-[#FFDE59]'
                    }`}
                    title={role}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-xs font-black uppercase text-black mb-2 flex items-center gap-1.5">
                <Clock size={14} className="stroke-[2.5]" /> Years of Experience
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                {EXPERIENCE_LEVELS.map(exp => (
                  <button 
                    key={exp}
                    onClick={() => setSelectedExp(selectedExp === exp ? 'All Experience' : exp)}
                    className={`border-2 border-black py-2 px-2 font-mono font-bold text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${
                      selectedExp === exp 
                        ? 'bg-[#FFDE59] text-black font-black' 
                        : 'bg-white text-black hover:bg-neutral-100'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Filters (visible in results view) */}
            {activeView === 'results' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t-2 border-dashed border-neutral-300">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black stroke-[2.5]" size={16} />
                  <input 
                    type="text"
                    placeholder="SEARCH KEYWORD..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border-3 border-black bg-[#F8F6F0] py-2 pl-9 pr-3 text-black font-mono font-bold text-xs uppercase focus:outline-none focus:bg-white shadow-[3px_3px_0px_#000]"
                  />
                </div>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border-3 border-black bg-white px-3 py-2 text-black font-mono font-bold text-xs uppercase shadow-[3px_3px_0px_#000] outline-none cursor-pointer"
                >
                  {COMPANY_TYPES.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                </select>
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="border-3 border-black bg-white px-3 py-2 text-black font-mono font-bold text-xs uppercase shadow-[3px_3px_0px_#000] outline-none cursor-pointer"
                >
                  {REGIONS.map(r => <option key={r} value={r}>{r === 'All Regions' ? '🌍 ALL REGIONS' : `📍 ${r.toUpperCase()}`}</option>)}
                </select>
              </div>
            )}

            <button 
              onClick={handleDiscover}
              className="w-full border-3 border-black bg-[#CCFF00] hover:bg-[#b8e600] text-black font-mono font-black text-sm md:text-base py-4 shadow-[5px_5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <Zap size={18} className="stroke-[3]" /> 
              {activeView === 'discover' ? 'DISCOVER MY MAGIC MATCHES' : `REFRESH MATCHES (${filtered.length})`}
            </button>
          </div>
        </div>

        {/* Results List */}
        {showResults && (
          <div className="space-y-4 pb-12">
            {/* Results Counter Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-3 border-black bg-white p-4 shadow-[4px_4px_0px_#000]">
              <p className="text-black font-black text-xs uppercase">
                FOUND <span className="bg-[#FFDE59] px-2 py-0.5 border border-black">{filtered.length}</span> TARGET MATCHES
                {selectedRole !== 'All Roles' && <span> FOR <span className="bg-[#00F0FF] px-1.5 py-0.5 border border-black text-black">{selectedRole}</span></span>}
              </p>
              <div className="flex gap-2 flex-wrap">
                {selectedRole !== 'All Roles' && (
                  <span className="px-2 py-0.5 bg-[#00F0FF] border-2 border-black text-xs font-black text-black flex items-center gap-1 shadow-[2px_2px_0px_#000] uppercase">
                    {selectedRole} 
                    <button onClick={() => setSelectedRole('All Roles')} className="ml-1 font-black text-base leading-none">×</button>
                  </span>
                )}
                {selectedExp !== 'All Experience' && (
                  <span className="px-2 py-0.5 bg-[#FFDE59] border-2 border-black text-xs font-black text-black flex items-center gap-1 shadow-[2px_2px_0px_#000] uppercase">
                    {selectedExp} 
                    <button onClick={() => setSelectedExp('All Experience')} className="ml-1 font-black text-base leading-none">×</button>
                  </span>
                )}
                {selectedRegion !== 'All Regions' && (
                  <span className="px-2 py-0.5 bg-[#CCFF00] border-2 border-black text-xs font-black text-black flex items-center gap-1 shadow-[2px_2px_0px_#000] uppercase">
                    📍 {selectedRegion} 
                    <button onClick={() => setSelectedRegion('All Regions')} className="ml-1 font-black text-base leading-none">×</button>
                  </span>
                )}
              </div>
            </div>

            {filtered.length === 0 && (
              <div className="border-4 border-black bg-white p-12 text-center shadow-[6px_6px_0px_#000]">
                <Building2 size={40} className="mx-auto mb-4 text-black stroke-[2.5]" />
                <p className="text-xl font-black uppercase text-black mb-1">NO MATCHES FOUND FOR THESE FILTERS</p>
                <p className="text-xs font-bold text-neutral-600">TRY SWITCHING THE TARGET ROLE OR EXPANDING THE REGION FILTER.</p>
              </div>
            )}

            {filtered.map(company => {
              const isExpanded = expandedIds.has(company.id);
              return (
                <div 
                  key={company.id}
                  className={`border-3 border-black bg-white shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all ${
                    isExpanded ? 'border-4 shadow-[6px_6px_0px_#000] bg-[#FFFEF0]' : ''
                  }`}
                >
                  {/* Company Card Header */}
                  <div 
                    className="p-5 cursor-pointer select-none group"
                    onClick={() => toggleExpand(company.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-12 h-12 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center font-black text-xl text-black shrink-0 overflow-hidden">
                          <img 
                            src={`https://www.google.com/s2/favicons?domain=${company.name.split(' (')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}.com&sz=128`} 
                            alt={company.name} 
                            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                            className="w-full h-full object-contain p-1"
                          />
                          <span className="hidden w-full h-full items-center justify-center text-sm font-black">{company.logo}</span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg md:text-xl font-black uppercase text-black group-hover:text-blue-600 transition-colors">
                            {company.name}
                          </h3>
                          <p className="text-neutral-600 font-bold text-xs uppercase mt-0.5">{company.industry}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-2 py-0.5 text-xs shadow-[2px_2px_0px_#000] uppercase ${difficultyStyle[company.difficulty] || 'bg-white text-black border-2 border-black'}`}>
                          {company.difficulty}
                        </span>
                        <span className={`px-2 py-0.5 text-xs shadow-[2px_2px_0px_#000] uppercase hidden sm:inline ${typeStyle[company.type] || 'bg-white text-black border-2 border-black'}`}>
                          {company.type}
                        </span>
                        <div className="p-1 border-2 border-black bg-white shadow-[2px_2px_0px_#000]">
                          {isExpanded ? <ChevronUp size={16} className="text-black stroke-[3]" /> : <ChevronDown size={16} className="text-black stroke-[3]" />}
                        </div>
                      </div>
                    </div>

                    {/* Quick Metrics */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 pt-2 border-t border-neutral-200 text-xs font-bold text-neutral-800">
                      <span className="flex items-center gap-1"><MapPin size={12} className="stroke-[2.5]" /> {company.location}</span>
                      <span className="flex items-center gap-1"><Users size={12} className="stroke-[2.5]" /> {company.size}</span>
                      <span className="px-2 py-0.5 bg-[#CCFF00] border border-black font-black text-black shadow-[1px_1px_0px_#000] flex items-center gap-0.5">
                        <DollarSign size={12} className="stroke-[3]" /> {company.avgSalary}
                      </span>
                    </div>

                    {/* Roles Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {company.roles.map(role => (
                        <span 
                          key={role} 
                          className={`px-2 py-0.5 border text-xs font-bold uppercase ${
                            selectedRole === role 
                              ? 'bg-[#00F0FF] border-black text-black font-black shadow-[1px_1px_0px_#000]' 
                              : 'bg-neutral-100 border-neutral-300 text-neutral-800'
                          }`}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expanded Company Preparation Details */}
                  {isExpanded && (
                    <div className="border-t-3 border-black p-5 bg-white space-y-4">
                      {/* Prep Topics */}
                      <div>
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase text-black mb-2">
                          <BookOpen size={14} className="stroke-[2.5]" /> Focus Topics For Interview
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {company.prepTopics.map((topic, i) => (
                            <span key={i} className="px-2.5 py-1 bg-[#00F0FF] border-2 border-black text-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Interview Rounds & Hiring Process */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="border-2 border-black bg-[#FFFEF0] p-3 shadow-[2px_2px_0px_#000]">
                          <h4 className="flex items-center gap-1.5 text-xs font-black uppercase text-black mb-1.5">
                            <Clock size={13} className="stroke-[2.5]" /> Interview Rounds
                          </h4>
                          <p className="text-neutral-800 text-xs font-bold leading-relaxed">{company.interviewRounds}</p>
                        </div>

                        <div className="border-2 border-black bg-[#F8F6F0] p-3 shadow-[2px_2px_0px_#000]">
                          <h4 className="flex items-center gap-1.5 text-xs font-black uppercase text-black mb-1.5">
                            <Briefcase size={13} className="stroke-[2.5]" /> Hiring Evaluation Mode
                          </h4>
                          <p className="text-neutral-800 text-xs font-bold leading-relaxed">{company.hiringProcess}</p>
                        </div>
                      </div>

                      {/* Office Locations */}
                      {company.regions && Object.keys(company.regions).length > 0 && (
                        <div>
                          <h4 className="flex items-center gap-1.5 text-xs font-black uppercase text-black mb-2">
                            <Globe size={13} className="stroke-[2.5]" /> Office Hub Locations
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {Object.entries(company.regions).map(([region, cities]) => (
                              <div key={region} className="border-2 border-black bg-white p-2.5 shadow-[2px_2px_0px_#000]">
                                <p className="text-xs font-black uppercase text-black mb-1 flex items-center gap-1">
                                  <MapPin size={11} className="stroke-[2.5]" /> {region}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {cities.map((city, i) => (
                                    <span key={i} className="text-[11px] font-bold text-neutral-800 bg-neutral-100 px-1.5 py-0.5 border border-black">
                                      {city}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pro Tips Box */}
                      <div className="border-3 border-black bg-[#FFDE59] p-4 shadow-[4px_4px_0px_#000]">
                        <h4 className="flex items-center gap-1.5 text-xs font-black uppercase text-black mb-1">
                          <Lightbulb size={14} className="stroke-[2.5]" /> Insider Interview Tips
                        </h4>
                        <p className="text-black font-bold text-xs uppercase leading-relaxed">{company.tips}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}