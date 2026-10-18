import { useState, useMemo } from 'react';
import { Search, Star, Users, Briefcase, Filter, ChevronDown, ChevronUp, Building2, DollarSign, MapPin, Code2, TrendingUp, Sparkles } from 'lucide-react';
import companyDatabaseData from '../data/companyDatabaseData';

const TYPES = ['All', 'Big Tech', 'Product', 'Startup', 'IT Services', 'Finance', 'MNC'];
const TIERS = ['All', 'Tier 1', 'Tier 2', 'Tier 3'];
const ITEMS_PER_PAGE = 18;

const tierStyle = {
  'Tier 1': { text: 'text-black', bg: 'bg-[#FFDE59]', border: 'border-black' },
  'Tier 2': { text: 'text-black', bg: 'bg-[#00F0FF]', border: 'border-black' },
  'Tier 3': { text: 'text-black', bg: 'bg-[#E2E8F0]', border: 'border-black' },
};

const typeColor = {
  'Big Tech': 'bg-[#FFDE59] text-black',
  'Product': 'bg-[#00F0FF] text-black',
  'Startup': 'bg-[#FF52D9] text-black',
  'IT Services': 'bg-[#CCFF00] text-black',
  'Finance': 'bg-[#FFD166] text-black',
  'MNC': 'bg-[#A78BFA] text-black',
};

export default function CompanyDatabase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered = useMemo(() => {
    return companyDatabaseData.filter(c => {
      const matchSearch = !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.hq.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchType = selectedType === 'All' || c.type === selectedType;
      const matchTier = selectedTier === 'All' || c.tier === selectedTier;
      return matchSearch && matchType && matchTier;
    });
  }, [searchQuery, selectedType, selectedTier]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const stats = useMemo(() => ({
    total: companyDatabaseData.length,
    tier1: companyDatabaseData.filter(c => c.tier === 'Tier 1').length,
    tier2: companyDatabaseData.filter(c => c.tier === 'Tier 2').length,
    tier3: companyDatabaseData.filter(c => c.tier === 'Tier 3').length,
  }), []);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full font-mono">
      {/* Header Container */}
      <div className="border-4 border-black bg-white shadow-[6px_6px_0px_#000] p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-black pb-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00] border-2 border-black text-black font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_#000] mb-3">
              <Building2 size={14} className="stroke-[2.5]" /> Verified Corporate Directory
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight">
              Company <span className="bg-[#FFDE59] px-2 border-2 border-black shadow-[3px_3px_0px_#000]">Database</span>
            </h1>
            <p className="text-neutral-700 font-bold text-xs md:text-sm mt-3 max-w-2xl">
              100 top tech companies with verified role-wise Indian CTC breakdown, tech stack dependencies, and hiring tiers.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
            {[
              { label: 'COMPANIES', value: stats.total, bg: 'bg-[#FFDE59]' },
              { label: 'TIER 1', value: stats.tier1, bg: 'bg-[#00F0FF]' },
              { label: 'TIER 2', value: stats.tier2, bg: 'bg-[#CCFF00]' },
              { label: 'TIER 3', value: stats.tier3, bg: 'bg-white' },
            ].map(s => (
              <div key={s.label} className={`border-3 border-black ${s.bg} p-3 text-center shadow-[3px_3px_0px_#000]`}>
                <p className="text-2xl font-black text-black">{s.value}</p>
                <p className="text-black text-[10px] uppercase font-black tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black stroke-[2.5]" size={20} />
            <input 
              type="text" 
              placeholder="SEARCH COMPANY, INDUSTRY, TECH STACK (E.G. PYTHON, GO), OR LOCATION..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
              className="w-full border-3 border-black bg-[#F8F6F0] py-3.5 pl-12 pr-4 text-black font-mono font-bold text-sm placeholder:text-neutral-500 placeholder:font-normal focus:outline-none focus:bg-white shadow-[4px_4px_0px_#000] transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-black uppercase text-black mr-1 flex items-center gap-1">
              <Filter size={14} className="stroke-[2.5]" /> Type:
            </span>
            {TYPES.map(type => (
              <button
                key={type}
                onClick={() => { setSelectedType(type); setVisibleCount(ITEMS_PER_PAGE); }}
                className={`px-3 py-1.5 border-2 border-black font-mono font-bold text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${
                  selectedType === type
                    ? 'bg-black text-white font-black'
                    : 'bg-white text-black hover:bg-[#FFDE59]'
                }`}
              >
                {type === 'All' ? 'All Types' : type}
              </button>
            ))}

            <div className="w-full sm:w-auto h-0 sm:h-5 border-l-2 border-black my-1 sm:my-0 mx-1 hidden sm:block"></div>

            <span className="text-xs font-black uppercase text-black mr-1 ml-0 sm:ml-2">
              Tier:
            </span>
            {TIERS.map(tier => (
              <button
                key={tier}
                onClick={() => { setSelectedTier(tier); setVisibleCount(ITEMS_PER_PAGE); }}
                className={`px-3 py-1.5 border-2 border-black font-mono font-bold text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${
                  selectedTier === tier
                    ? 'bg-[#00F0FF] text-black font-black'
                    : 'bg-white text-black hover:bg-neutral-100'
                }`}
              >
                {tier === 'All' ? 'All Tiers' : tier}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-5 px-1">
        <p className="text-black font-mono font-black text-xs uppercase tracking-wider">
          SHOWING <span className="bg-[#FFDE59] px-1.5 py-0.5 border border-black">{visible.length}</span> OF <span className="bg-black text-white px-1.5 py-0.5">{filtered.length}</span> COMPANIES
        </p>
      </div>

      {/* Company Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map(comp => {
          const isExpanded = expandedId === comp.id;
          const salaryEntries = Object.entries(comp.salaries);
          const tier = tierStyle[comp.tier] || tierStyle['Tier 3'];

          return (
            <div 
              key={comp.id} 
              className={`border-3 border-black bg-white shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] transition-all flex flex-col ${
                isExpanded ? 'md:col-span-2 lg:col-span-3 border-4 bg-[#FFFEF0]' : ''
              }`}
            >
              {/* Card Header */}
              <div 
                className="p-5 cursor-pointer select-none group" 
                onClick={() => setExpandedId(isExpanded ? null : comp.id)}
              >
                <div className="flex justify-between items-start mb-3 gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center font-black text-xl text-black shrink-0 overflow-hidden">
                      <img 
                        src={`https://www.google.com/s2/favicons?domain=${comp.name.split(' (')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}.com&sz=128`} 
                        alt={comp.name} 
                        onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                        className="w-full h-full object-contain p-1.5"
                      />
                      <span className="hidden w-full h-full items-center justify-center text-sm font-black">{comp.logo}</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-lg text-black uppercase tracking-tight truncate group-hover:text-blue-600 transition-colors">
                        {comp.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs mt-0.5">
                        <span className={`px-1.5 py-0.2 border border-black font-black uppercase text-[10px] ${typeColor[comp.type] || 'bg-neutral-100 text-black'}`}>
                          {comp.type}
                        </span>
                        <span className="text-black font-bold">•</span>
                        <span className="text-neutral-600 font-bold truncate text-[11px]">{comp.industry}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2.5 py-0.5 border-2 border-black font-mono font-black text-xs uppercase shadow-[2px_2px_0px_#000] ${tier.bg} ${tier.text}`}>
                      {comp.tier}
                    </span>
                    <div className="p-1 border-2 border-black bg-white shadow-[2px_2px_0px_#000]">
                      {isExpanded ? <ChevronUp size={16} className="text-black stroke-[3]" /> : <ChevronDown size={16} className="text-black stroke-[3]" />}
                    </div>
                  </div>
                </div>

                {/* Quick Info Bar */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mb-3 font-mono font-bold text-neutral-800 bg-[#F8F6F0] p-2 border-2 border-black">
                  <span className="flex items-center gap-1"><Star size={13} className="text-black fill-black" /> {comp.rating} ({comp.reviews})</span>
                  <span className="flex items-center gap-1"><MapPin size={13} className="stroke-[2.5]" /> {comp.hq}</span>
                  <span className="flex items-center gap-1"><Users size={13} className="stroke-[2.5]" /> {comp.size}</span>
                </div>

                {/* Salary Preview */}
                {!isExpanded && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {salaryEntries.slice(0, 2).map(([role, data]) => (
                      <span key={role} className="px-2 py-1 bg-[#CCFF00] border-2 border-black text-black text-xs font-black shadow-[2px_2px_0px_#000]">
                        {role}: {data.avg}
                      </span>
                    ))}
                    {salaryEntries.length > 2 && (
                      <span className="px-2 py-1 bg-white border-2 border-black text-black text-xs font-black shadow-[2px_2px_0px_#000]">
                        +{salaryEntries.length - 2} MORE
                      </span>
                    )}
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {comp.techStack.map(ts => (
                    <span key={ts} className="px-2 py-0.5 bg-white border border-black font-mono font-bold text-[11px] text-black hover:bg-[#FFDE59] transition-colors">
                      {ts}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expanded Salary Breakdown */}
              {isExpanded && (
                <div className="p-5 border-t-3 border-black bg-white">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="p-1.5 bg-[#CCFF00] border-2 border-black shadow-[2px_2px_0px_#000]">
                      <DollarSign size={16} className="text-black stroke-[3]" />
                    </span>
                    <h4 className="text-sm font-black text-black uppercase tracking-wider">
                      Role-wise Salary Breakdown (Indian CTC)
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {salaryEntries.map(([role, data]) => (
                      <div key={role} className="border-2 border-black bg-[#FFFEF0] p-4 shadow-[3px_3px_0px_#000]">
                        <p className="text-xs font-black uppercase text-neutral-600 mb-1">{role}</p>
                        <p className="text-xl font-black text-black mb-1">{data.avg}</p>
                        <p className="text-xs font-bold text-neutral-700">RANGE: <span className="text-black font-black">{data.range}</span></p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="border-4 border-black bg-white p-12 text-center shadow-[6px_6px_0px_#000] mt-6">
          <div className="w-16 h-16 border-3 border-black bg-[#FFDE59] flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_#000]">
            <Building2 size={32} className="text-black stroke-[2.5]" />
          </div>
          <p className="text-xl font-black uppercase text-black mb-1">NO COMPANIES MATCH YOUR SEARCH</p>
          <p className="text-sm font-bold text-neutral-600">TRY CLEARING YOUR FILTERS OR SEARCHING FOR A DIFFERENT TERM.</p>
        </div>
      )}

      {hasMore && (
        <button 
          onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
          className="w-full mt-8 py-4 border-3 border-black bg-[#FFDE59] hover:bg-[#ffe57a] text-black font-mono font-black text-sm uppercase shadow-[5px_5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2"
        >
          <Sparkles size={16} className="stroke-[2.5]" />
          LOAD MORE COMPANIES ({filtered.length - visibleCount} REMAINING)
        </button>
      )}
    </div>
  );
}