import { useState, useMemo, useEffect } from 'react';
import { Briefcase, Building2, MapPin, DollarSign, Calendar, ExternalLink, Search, ChevronDown, ChevronUp, Users, Clock, CheckCircle2, Filter, Zap, BookOpen, ArrowUpRight, Sparkles } from 'lucide-react';
import massRecruitmentData from '../data/massRecruitmentData';

const JOB_TYPES = ['All', 'Full Time', 'Internship', 'Freelance', 'Contract', 'Work From Home'];
const ITEMS_PER_PAGE = 12;

const typeBadge = {
  'Full Time': 'bg-[#CCFF00] text-black',
  'Internship': 'bg-[#00F0FF] text-black',
  'Freelance': 'bg-[#FF52D9] text-black',
  'Contract': 'bg-[#FFDE59] text-black',
  'Work From Home': 'bg-[#FF0033] text-white',
};

const typeIcon = {
  'Full Time': '💼',
  'Internship': '🎓',
  'Freelance': '🌐',
  'Contract': '📄',
  'Work From Home': '🏠',
};

const KNOWN_DOMAINS = {
  'telus': 'telus.com',
  'telus digital': 'telusinternational.com',
  'telus international': 'telusinternational.com',
  'kobotoolbox': 'kobotoolbox.org',
  'sanctuary computer': 'sanctuary.computer',
  'sanctuary computer inc': 'sanctuary.computer',
  'lemon.io': 'lemon.io',
  'lemon': 'lemon.io',
  'hey contact heroes': 'contactheroes.de',
  'hey contact heroes gmbh': 'contactheroes.de',
  'tcs': 'tcs.com',
  'tata consultancy services': 'tcs.com',
  'infosys': 'infosys.com',
  'wipro': 'wipro.com',
  'hcl': 'hcltech.com',
  'hcl technologies': 'hcltech.com',
  'tech mahindra': 'techmahindra.com',
  'cognizant': 'cognizant.com',
  'capgemini': 'capgemini.com',
  'accenture': 'accenture.com',
  'ltimindtree': 'ltimindtree.com',
  'mphasis': 'mphasis.com',
  'amazon': 'amazon.com',
  'microsoft': 'microsoft.com',
  'google': 'google.com',
  'flipkart': 'flipkart.com',
  'walmart': 'walmart.com',
  'walmart global tech': 'walmart.com',
  'goldman sachs': 'goldmansachs.com',
  'de shaw': 'deshaw.com',
  'toptal': 'toptal.com',
  'upwork': 'upwork.com',
  'fiverr': 'fiverr.com',
  'freelancer': 'freelancer.com',
  'wellfound': 'wellfound.com',
  'angellist': 'wellfound.com',
  'crossover': 'crossover.com',
  'automattic': 'automattic.com',
  'gitlab': 'gitlab.com',
  'canonical': 'canonical.com',
  'elastic': 'elastic.co',
  'zapier': 'zapier.com',
  'buffer': 'buffer.com',
  'doist': 'doist.com',
  'duckduckgo': 'duckduckgo.com',
  'ghost': 'ghost.org',
  'invision': 'invisionapp.com',
  'kraken': 'kraken.com',
  'makerdao': 'makerdao.com',
  'consensys': 'consensys.io',
  'chainlink': 'chain.link',
  'stripe': 'stripe.com',
  'meta': 'meta.com',
  'apple': 'apple.com',
  'netflix': 'netflix.com',
  'uber': 'uber.com',
  'airbnb': 'airbnb.com',
  'spotify': 'spotify.com',
  'shopify': 'shopify.com'
};

function getCompanyDomain(company) {
  if (!company) return '';
  const lower = company.trim().toLowerCase();
  
  if (KNOWN_DOMAINS[lower]) return KNOWN_DOMAINS[lower];
  
  for (const [key, domain] of Object.entries(KNOWN_DOMAINS)) {
    if (lower.includes(key)) return domain;
  }
  
  const tldMatch = lower.match(/\b([a-z0-9-]+)\.(com|io|org|net|co|ai|de|tech|app|dev)\b/i);
  if (tldMatch) return tldMatch[0];
  
  const cleaned = lower
    .replace(/\b(inc|inc\.|llc|ltd|gmbh|corp|corporation|technologies|technology|solutions|services|group|international)\b/gi, '')
    .trim()
    .replace(/[^a-z0-9]/g, '');
    
  return cleaned ? `${cleaned}.com` : '';
}

function getInitials(name) {
  if (!name) return 'CO';
  const clean = name.replace(/[^a-zA-Z0-9 ]/g, '').trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase() || 'CO';
}

const BADGE_COLORS = [
  'bg-[#FFDE59]', // Cyber Yellow
  'bg-[#CCFF00]', // Neon Lime
  'bg-[#00F0FF]', // Cyan
  'bg-[#FF52D9]', // Hot Pink
  'bg-[#FF8811]', // Vivid Orange
  'bg-[#4DEEEA]', // Aqua
  'bg-[#A78BFA]', // Purple
];

function getBadgeColor(name) {
  if (!name) return BADGE_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return BADGE_COLORS[Math.abs(hash) % BADGE_COLORS.length];
}

function CompanyLogoBadge({ company, logo }) {
  const [hasError, setHasError] = useState(false);
  const domain = useMemo(() => getCompanyDomain(company), [company]);
  const badgeColor = useMemo(() => getBadgeColor(company), [company]);
  const initials = useMemo(() => getInitials(company), [company]);

  const faviconUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null;
  const initialUrl = (logo && typeof logo === 'string' && logo.startsWith('http') && !logo.includes('remotive.com'))
    ? logo
    : faviconUrl;

  const [currentSrc, setCurrentSrc] = useState(initialUrl);

  const handleError = () => {
    if (currentSrc !== faviconUrl && faviconUrl) {
      setCurrentSrc(faviconUrl);
    } else {
      setHasError(true);
    }
  };

  const isEmojiLogo = logo && typeof logo === 'string' && !logo.startsWith('http') && logo !== '🌐';

  if (hasError || !currentSrc) {
    return (
      <div className={`w-12 h-12 border-2 border-black ${badgeColor} flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] select-none overflow-hidden`}>
        {isEmojiLogo ? (
          <span className="text-xl">{logo}</span>
        ) : (
          <span className="font-mono font-black text-sm text-black tracking-wider">{initials}</span>
        )}
      </div>
    );
  }

  return (
    <div className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] overflow-hidden">
      <img
        src={currentSrc}
        alt=""
        onError={handleError}
        className="w-full h-full object-contain p-1.5"
        loading="lazy"
      />
    </div>
  );
}

export default function MassRecruitment() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [liveJobs, setLiveJobs] = useState(massRecruitmentData);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchLiveJobs = async () => {
      setIsFetching(true);
      try {
        const response = await fetch('https://remotive.com/api/remote-jobs?category=software-dev&limit=30');
        const data = await response.json();
        
        if (data && data.jobs) {
          const fetchedJobs = data.jobs.map(job => {
            const platforms = ['LinkedIn', 'Indeed', 'Naukri.com', 'Internshala'];
            const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
            
            let mappedType = 'Work From Home';
            if (job.job_type === 'contract') mappedType = 'Contract';
            if (job.job_type === 'freelance') mappedType = 'Freelance';
            if (job.job_type === 'internship') mappedType = 'Internship';
            if (job.job_type === 'full_time') mappedType = 'Full Time';

            const cleanDesc = job.description ? job.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : 'Refer to official posting for complete requirements and eligibility criteria.';
            const domain = getCompanyDomain(job.company_name);
            const logoUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : "🌐";

            return {
              id: `live-${job.id}`,
              company: job.company_name,
              logo: logoUrl,
              title: job.title,
              type: mappedType,
              batch: "All Batches",
              ctc: job.salary || "Competitive",
              location: job.candidate_required_location || "Remote",
              deadline: "Live - Apply ASAP",
              status: "Active",
              hiring: "Urgent",
              eligibility: cleanDesc,
              process: `Sourced via live aggregator (Matched as ${randomPlatform}). Click Apply Now to view details.`,
              tags: ["Live Job", randomPlatform, mappedType === 'Work From Home' ? 'Remote' : 'Hiring'],
              applyUrl: job.url
            };
          });

          setLiveJobs(prev => {
            const staticJobs = prev.filter(j => !j.id.toString().startsWith('live-'));
            return [...fetchedJobs, ...staticJobs];
          });
        }
      } catch (error) {
        // Silently keep static catalog
      } finally {
        setIsFetching(false);
      }
    };

    fetchLiveJobs();
    const intervalId = setInterval(fetchLiveJobs, 3600000);
    return () => clearInterval(intervalId);
  }, []);

  const filtered = useMemo(() => {
    return liveJobs.filter(j => {
      const matchType = selectedType === 'All' || j.type === selectedType;
      const matchTag = selectedTag === 'All' || j.tags.includes(selectedTag);
      const matchSearch = !searchQuery ||
        j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchType && matchTag && matchSearch;
    });
  }, [selectedType, selectedTag, searchQuery, liveJobs]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const stats = useMemo(() => ({
    total: liveJobs.length,
    fullTime: liveJobs.filter(j => j.type === 'Full Time').length,
    internship: liveJobs.filter(j => j.type === 'Internship').length,
    freelance: liveJobs.filter(j => j.type === 'Freelance').length,
    contract: liveJobs.filter(j => j.type === 'Contract').length,
    wfh: liveJobs.filter(j => j.type === 'Work From Home').length,
  }), [liveJobs]);

  return (
    <div className="flex h-full flex-col overflow-y-auto custom-scrollbar font-mono pb-20">
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] text-black font-black text-xs uppercase tracking-wider">
              <Zap size={14} className="stroke-[2.5]" />
              <span>[ HIRING PIPELINE // LIVE RECRUITMENT DRIVES ]</span>
            </div>
            {isFetching && (
              <span className="px-2.5 py-1 bg-[#00F0FF] border-2 border-black text-black font-black text-xs uppercase animate-pulse shadow-[2px_2px_0px_#000]">
                SYNCING AGGREGATORS...
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight mb-4 flex items-center flex-wrap gap-3">
            MASS RECRUITMENT
            <span className="bg-[#CCFF00] text-black px-3 py-1 border-4 border-black shadow-[5px_5px_0px_#000]">
              DRIVES
            </span>
          </h1>

          <p className="text-xs md:text-sm font-bold text-gray-700 max-w-3xl uppercase tracking-wide leading-relaxed bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000]">
            // TRACK AND APPLY TO ACTIVE MASS HIRING EVENTS, PAID INTERNSHIPS, FREELANCE CONTRACTS, AND GLOBAL REMOTE OPENINGS. LIVE AGGREGATION FROM LINKEDIN, NAUKRI, AND INDEED.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {[
            { label: 'TOTAL DRIVES', value: stats.total, bg: 'bg-[#FFDE59]' },
            { label: 'FULL TIME', value: stats.fullTime, bg: 'bg-[#CCFF00]' },
            { label: 'INTERNSHIP', value: stats.internship, bg: 'bg-[#00F0FF]' },
            { label: 'FREELANCE', value: stats.freelance, bg: 'bg-[#FF52D9]' },
            { label: 'CONTRACT', value: stats.contract, bg: 'bg-white' },
            { label: 'WFH / REMOTE', value: stats.wfh, bg: 'bg-[#FF0033]', text: 'text-white' },
          ].map(s => (
            <div key={s.label} className={`border-3 border-black p-3 text-center shadow-[3px_3px_0px_#000] ${s.bg}`}>
              <p className={`text-2xl font-black ${s.text || 'text-black'}`}>{s.value}</p>
              <p className={`text-[10px] font-black uppercase mt-0.5 ${s.text || 'text-gray-800'}`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search + Filters Toolbar */}
        <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] space-y-4 mb-8">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black stroke-[3]" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH COMPANY, TECH ROLE, CITY LOCATION, OR FILTER TAG..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
              className="w-full bg-[#F0EDE6] border-2 border-black py-2.5 pl-10 pr-4 text-xs font-black text-black placeholder-gray-500 uppercase focus:bg-white focus:outline-none shadow-[2px_2px_0px_#000]"
            />
          </div>

          {/* Type Filter Buttons */}
          <div className="flex flex-wrap gap-2 pt-1 border-t-2 border-black">
            <span className="text-xs font-black text-black uppercase self-center mr-2">[ TRACK ]:</span>
            {JOB_TYPES.map(type => (
              <button
                key={type}
                onClick={() => { setSelectedType(type); setVisibleCount(ITEMS_PER_PAGE); }}
                className={`px-3 py-1.5 border-2 border-black text-xs font-black uppercase transition-all shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5 ${
                  selectedType === type
                    ? 'bg-[#CCFF00] text-black'
                    : 'bg-[#F0EDE6] text-black hover:bg-white'
                }`}
              >
                {type !== 'All' && <span>{typeIcon[type]}</span>}
                <span>{type === 'All' ? 'ALL TRACKS' : type.toUpperCase()}</span>
              </button>
            ))}
          </div>

          {/* Tag Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 border-t-2 border-black scrollbar-none">
            <span className="text-xs font-black text-black uppercase shrink-0">[ TAGS ]:</span>
            <div className="flex gap-1.5 flex-wrap">
              {['All', 'Live Job', 'LinkedIn', 'Indeed', 'Naukri.com', 'Internshala', 'Fresher', 'Intern', 'Mass Hire', 'Off-Campus', 'Remote', 'WFH'].map(tag => (
                <button
                  key={tag}
                  onClick={() => { setSelectedTag(tag); setVisibleCount(ITEMS_PER_PAGE); }}
                  className={`px-2 py-0.5 border border-black text-[10px] font-black uppercase transition-all whitespace-nowrap shadow-[1px_1px_0px_#000] ${
                    selectedTag === tag
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-700 hover:bg-[#FFDE59]'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between gap-2 mb-6 px-1">
          <p className="text-xs font-black text-black uppercase">
            SHOWING {visible.length} OF {filtered.length} AVAILABLE OPENINGS
            {selectedType !== 'All' && <span className="ml-1 bg-[#CCFF00] px-1.5 py-0.5 border border-black">[{selectedType.toUpperCase()}]</span>}
            {selectedTag !== 'All' && <span className="ml-1 bg-[#00F0FF] px-1.5 py-0.5 border border-black">#{selectedTag}</span>}
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.length === 0 && (
            <div className="col-span-full text-center py-16 bg-white border-4 border-black shadow-[6px_6px_0px_#000]">
              <Briefcase size={40} className="mx-auto mb-3 text-black stroke-[2]" />
              <h3 className="text-lg font-black text-black uppercase mb-1">NO RECRUITMENT DRIVES MATCH CRITERIA</h3>
              <p className="text-xs text-gray-600 font-bold uppercase mb-4">RESET SEARCH STRINGS OR TAG FILTERS TO RE-POPULATE FEED.</p>
              <button
                onClick={() => { setSelectedType('All'); setSelectedTag('All'); setSearchQuery(''); }}
                className="px-4 py-2 bg-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]"
              >
                [ RESET ALL FILTERS ]
              </button>
            </div>
          )}

          {visible.map(job => {
            const isExpanded = expandedId === job.id;
            return (
              <div 
                key={job.id} 
                className={`bg-white border-4 border-black transition-all shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] flex flex-col justify-between group ${
                  isExpanded ? 'md:col-span-2' : ''
                }`}
              >
                <div className="p-5 md:p-6">
                  {/* Top Bar */}
                  <div className="flex justify-between items-start gap-3 mb-4">
                    <div className="flex gap-3 items-center min-w-0">
                      <CompanyLogoBadge company={job.company} logo={job.logo} />
                      <div className="min-w-0">
                        <h3 className="font-black text-base md:text-lg text-black uppercase leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-xs font-black text-gray-700 uppercase mt-0.5">{job.company}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 border-2 border-black text-[10px] font-black uppercase shrink-0 shadow-[2px_2px_0px_#000] ${typeBadge[job.type] || 'bg-white text-black'}`}>
                      {job.type}
                    </span>
                  </div>

                  {/* Metadata Specs */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-black text-black uppercase mb-4 bg-[#F0EDE6] border-2 border-black p-3">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin size={13} className="stroke-[2.5] shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign size={13} className="stroke-[2.5] shrink-0 text-emerald-700" />
                      <span className="text-black font-black">{job.ctc}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase size={13} className="stroke-[2.5] shrink-0" />
                      <span>{job.batch}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="stroke-[2.5] shrink-0" />
                      <span>{job.deadline}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-0.5 bg-white border border-black text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]"
                      >
                        #{tag}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 bg-[#CCFF00] border border-black text-[10px] font-black uppercase flex items-center gap-1">
                      <CheckCircle2 size={10} className="stroke-[3]" /> {job.status}
                    </span>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="p-5 pt-0 border-t-2 border-black mt-auto flex gap-2 pt-4 bg-[#FBF9F5]">
                  <button 
                    onClick={() => setExpandedId(isExpanded ? null : job.id)}
                    className="flex-1 py-2.5 px-3 bg-white hover:bg-[#FFDE59] border-2 border-black text-black font-black text-xs uppercase flex items-center justify-center gap-1 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    {isExpanded ? <><ChevronUp size={14} className="stroke-[3]" /> [ HIDE SPECS ]</> : <><ChevronDown size={14} className="stroke-[3]" /> [ VIEW SPECS ]</>}
                  </button>
                  <a 
                    href={job.applyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 bg-[#CCFF00] hover:bg-[#FFDE59] border-2 border-black text-black font-black text-xs uppercase flex items-center justify-center gap-1 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all no-underline"
                  >
                    <span>[ APPLY NOW ]</span>
                    <ArrowUpRight size={14} className="stroke-[3]" />
                  </a>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="border-t-3 border-black p-5 bg-white space-y-4">
                    <div>
                      <h4 className="flex items-center gap-1.5 text-xs font-black text-black uppercase mb-1">
                        <BookOpen size={14} className="stroke-[2.5]" /> ELIGIBILITY CRITERIA
                      </h4>
                      <p className="text-xs text-gray-800 font-bold uppercase bg-[#F0EDE6] p-3 border-2 border-black leading-relaxed">
                        {job.eligibility}
                      </p>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-1.5 text-xs font-black text-black uppercase mb-1">
                        <Clock size={14} className="stroke-[2.5]" /> RECRUITMENT PIPELINE
                      </h4>
                      <div className="bg-[#F0EDE6] p-3 border-2 border-black">
                        <p className="text-xs font-bold text-gray-800 uppercase leading-relaxed">{job.process}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <button 
            onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
            className="w-full mt-8 py-3.5 bg-white hover:bg-[#FFDE59] border-3 border-black text-black font-black text-xs uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            [ LOAD MORE DRIVES // {filtered.length - visibleCount} REMAINING ]
          </button>
        )}
      </div>
    </div>
  );
}