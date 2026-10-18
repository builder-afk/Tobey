import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users, Briefcase, Zap, Star, MessageSquare, Brain, 
  Search, Rocket, Target, LayoutDashboard, UserCheck,
  Video, GitPullRequest, Code, TrendingUp, Filter,
  ChevronRight, Calendar, ExternalLink, Settings, CheckCircle2,
  Activity, ArrowRight, DollarSign, Clock, Award, Shield,
  BarChart2, ArrowUpRight, Copy, Check, Sparkles, AlertTriangle,
  Flame, RefreshCw, Layers, CheckSquare, Compass, Sliders, ChevronDown,
  FileText, PieChart as PieChartIcon, CheckCheck, Send, PhoneCall
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, 
  ResponsiveContainer, CartesianGrid, AreaChart, Area, Cell, LineChart, Line, Legend
} from 'recharts';
import { 
  mockCampaigns, mockCandidates, mockApplications, 
  mockInterviews, pipelineStages 
} from '../data/recruitingData';

// ─── Neo-Brutalist Score Badge Helper ────────────────────────────
const getBrutalistScoreBadge = (score) => {
  if (score >= 90) return 'bg-[#CCFF00] text-black border-2 border-black shadow-[2px_2px_0px_#000]';
  if (score >= 80) return 'bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_#000]';
  if (score >= 70) return 'bg-[#FFDE59] text-black border-2 border-black shadow-[2px_2px_0px_#000]';
  return 'bg-[#FF0033] text-white border-2 border-black shadow-[2px_2px_0px_#000]';
};

// ─── AI Copilot Engine ──────────────────────────────────────────
const SKILL_KEYWORDS = [
  'python','javascript','typescript','react','next.js','vue.js','angular',
  'node.js','fastapi','django','express','go','rust','java','c++',
  'postgresql','mongodb','redis','kafka','rabbitmq',
  'docker','kubernetes','aws','gcp','azure','terraform',
  'tensorflow','pytorch','llms','rag','computer vision','nlp',
  'graphql','rest api','grpc','websockets',
  'figma','ui/ux','tailwind css','css architecture',
  'system design','distributed systems','microservices',
  'ci/cd','github actions','linux','security','cryptography',
];

function parseQuery(query) {
  const q = query.toLowerCase();
  const filters = {};

  const ratingMatch = q.match(/(?:>|above|over|minimum|min|at least|rating\s*[>:]?\s*|rating\s+over\s+)(\d{3,4})/i)
    || q.match(/(\d{3,4})\s*\+/);
  if (ratingMatch) filters.minRating = parseInt(ratingMatch[1]);

  const expMatch = q.match(/(\d+)\+?\s*(?:years?|yrs?)\s*(?:of\s+)?(?:experience|exp)?/i)
    || q.match(/(?:at least|minimum|min|over|above|>)\s*(\d+)\s*(?:years?|yrs?)/i);
  if (expMatch) filters.minExperience = parseInt(expMatch[1]);

  const topMatch = q.match(/(?:top|best|first)\s*[-]?\s*(\d+)/i);
  if (topMatch) filters.topN = parseInt(topMatch[1]);

  if (/startup\s*(?:experience|exp|background)/i.test(q) || /has\s*startup/i.test(q)
      || /worked\s+(?:at|in)\s+(?:a\s+)?startup/i.test(q) || /from\s+startup/i.test(q)) {
    filters.startupExp = true;
  }

  if (/open[\s-]*source/i.test(q)) filters.openSourceExp = true;

  if (/immediately?\s*available/i.test(q) || /available\s*now/i.test(q) || /can\s*start\s*(?:now|immediately)/i.test(q)) {
    filters.availability = 'Immediately Available';
  }

  const locationPatterns = [
    { pattern: /(?:in|from|based\s+in|located\s+in)\s+(san francisco|sf|bay area)/i, value: 'San Francisco' },
    { pattern: /(?:in|from|based\s+in|located\s+in)\s+(new york|nyc|ny)/i, value: 'New York' },
    { pattern: /(?:in|from|based\s+in|located\s+in)\s+(remote)/i, value: 'Remote' },
    { pattern: /(?:in|from|based\s+in|located\s+in)\s+(india|bengaluru|bangalore)/i, value: 'India' },
    { pattern: /(?:in|from|based\s+in|located\s+in)\s+(london|uk)/i, value: 'London' },
    { pattern: /(?:in|from|based\s+in|located\s+in)\s+(berlin|germany)/i, value: 'Berlin' },
    { pattern: /(?:in|from|based\s+in|located\s+in)\s+(toronto|canada)/i, value: 'Toronto' },
    { pattern: /(?:in|from|based\s+in|located\s+in)\s+(austin|texas|tx)/i, value: 'Austin' },
    { pattern: /(?:in|from|based\s+in|located\s+in)\s+(seattle|wa)/i, value: 'Seattle' },
    { pattern: /(?:in|from|based\s+in|located\s+in)\s+(boston|ma)/i, value: 'Boston' },
  ];
  for (const lp of locationPatterns) {
    if (lp.pattern.test(q)) { filters.location = lp.value; break; }
  }

  if (/system\s*design/i.test(q)) filters.sortBy = 'systemDesign';
  else if (/culture\s*fit/i.test(q)) filters.sortBy = 'cultureFit';
  else if (/technical/i.test(q) && !/interview/i.test(q)) filters.sortBy = 'technical';
  else if (/experience/i.test(q) && !expMatch) filters.sortBy = 'experience';
  else if (/github|commits?|stars?|open.?source/i.test(q)) filters.sortBy = 'github';
  else if (/skill\s*match/i.test(q)) filters.sortBy = 'skillMatch';

  if (/backend/i.test(q)) filters.role = 'backend';
  else if (/frontend/i.test(q)) filters.role = 'frontend';
  else if (/full[\s-]*stack/i.test(q)) filters.role = 'fullstack';
  else if (/ml|machine\s*learning|ai\s*engineer|ai\/ml/i.test(q)) filters.role = 'ml';
  else if (/devops|infrastructure|sre/i.test(q)) filters.role = 'devops';
  else if (/designer|design/i.test(q) && !/system/i.test(q)) filters.role = 'designer';
  else if (/product\s*manager|pm\b/i.test(q)) filters.role = 'pm';
  else if (/founding\s*engineer/i.test(q)) filters.role = 'founding';

  const matchedSkills = SKILL_KEYWORDS.filter(skill => {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('\\b' + escaped + '\\b', 'i').test(q);
  });
  if (matchedSkills.length > 0) filters.skills = matchedSkills;

  if (/interview/i.test(q)) filters.intent = 'interview';
  if (/compare/i.test(q)) filters.intent = 'compare';

  return filters;
}

function searchCandidates(filters) {
  let pool = [...mockCandidates];

  if (filters.role) {
    const titleMap = {
      backend: /backend|server|api/i,
      frontend: /frontend|ui|react/i,
      fullstack: /full[\s-]*stack/i,
      ml: /ml|ai|machine learning|data scientist/i,
      devops: /devops|infrastructure|sre|platform/i,
      designer: /design/i,
      pm: /product manager|pm/i,
      founding: /founding/i,
    };
    const regex = titleMap[filters.role];
    if (regex) pool = pool.filter(c => regex.test(c.title));
  }

  if (filters.skills && filters.skills.length > 0) {
    pool = pool.filter(c => {
      const cSkills = c.skills.map(s => s.toLowerCase());
      return filters.skills.some(s => cSkills.includes(s));
    });
  }

  if (filters.minRating) pool = pool.filter(c => c.contestRating >= filters.minRating);
  if (filters.minExperience) pool = pool.filter(c => c.experienceYears >= filters.minExperience);
  if (filters.startupExp) pool = pool.filter(c => c.hasStartupExp);
  if (filters.openSourceExp) pool = pool.filter(c => c.hasOpenSourceExp);
  if (filters.availability) pool = pool.filter(c => c.availability === filters.availability);
  if (filters.location) pool = pool.filter(c => c.location.toLowerCase().includes(filters.location.toLowerCase()));

  if (filters.sortBy === 'systemDesign') {
    pool.sort((a, b) => {
      const aSD = a.skillRadar.find(r => r.subject === 'System Design')?.score || 0;
      const bSD = b.skillRadar.find(r => r.subject === 'System Design')?.score || 0;
      return bSD - aSD;
    });
  } else if (filters.sortBy === 'cultureFit') {
    pool.sort((a, b) => b.scores.cultureFit - a.scores.cultureFit);
  } else if (filters.sortBy === 'technical') {
    pool.sort((a, b) => b.scores.technical - a.scores.technical);
  } else if (filters.sortBy === 'experience') {
    pool.sort((a, b) => b.experienceYears - a.experienceYears);
  } else if (filters.sortBy === 'github') {
    pool.sort((a, b) => b.github.engineeringScore - a.github.engineeringScore);
  } else if (filters.sortBy === 'skillMatch') {
    pool.sort((a, b) => b.scores.skillMatch - a.scores.skillMatch);
  } else {
    pool.sort((a, b) => b.scores.overall - a.scores.overall);
  }

  if (filters.topN) pool = pool.slice(0, filters.topN);

  return pool;
}

function generateSummary(query, filters, results, campaign) {
  if (results.length === 0) {
    return `I searched through all ${mockCandidates.length} candidates in your talent pool but couldn't find anyone matching "${query}". Try broadening your search — for example, lower the rating threshold or remove the location constraint.`;
  }

  const parts = [];
  let opening = `I analyzed ${mockCandidates.length} candidates`;
  if (campaign) opening += ` for the **${campaign.title}** campaign`;
  opening += ` and found **${results.length} match${results.length > 1 ? 'es' : ''}**.`;
  parts.push(opening);

  const appliedFilters = [];
  if (filters.minRating) appliedFilters.push(`contest rating ≥ ${filters.minRating}`);
  if (filters.minExperience) appliedFilters.push(`${filters.minExperience}+ years experience`);
  if (filters.startupExp) appliedFilters.push(`startup experience`);
  if (filters.openSourceExp) appliedFilters.push(`open-source contributions`);
  if (filters.availability) appliedFilters.push(filters.availability.toLowerCase());
  if (filters.location) appliedFilters.push(`located in ${filters.location}`);
  if (filters.skills && filters.skills.length > 0) appliedFilters.push(`skills: ${filters.skills.join(', ')}`);
  if (filters.role) appliedFilters.push(`role: ${filters.role}`);
  if (appliedFilters.length > 0) parts.push(`Filters applied: ${appliedFilters.join(' · ')}.`);

  const top = results[0];
  if (top) {
    let highlight = `**${top.name}** leads with an overall match score of **${top.scores.overall}/100**`;
    if (filters.sortBy === 'systemDesign') {
      const sd = top.skillRadar.find(r => r.subject === 'System Design')?.score || 0;
      highlight = `**${top.name}** leads with a system design score of **${sd}/100**`;
    } else if (filters.sortBy === 'cultureFit') {
      highlight = `**${top.name}** leads with a culture fit score of **${top.scores.cultureFit}/100**`;
    } else if (filters.sortBy === 'github') {
      highlight = `**${top.name}** leads with a GitHub engineering score of **${top.github.engineeringScore}/100** (${top.github.commits} commits, ${top.github.stars} stars)`;
    }
    highlight += ` — ${top.experience}, ${top.location}.`;
    parts.push(highlight);

    if (results.length >= 2) {
      const second = results[1];
      parts.push(`Runner-up: **${second.name}** (${second.scores.overall}/100) — ${second.experience}, ${second.title}.`);
    }
  }

  if (results.length > 3) {
    parts.push(`Showing all ${results.length} results below. You can refine further by asking about specific skills, experience levels, or availability.`);
  }

  return parts.join('\n\n');
}

// ─── Sub-Component: AI Copilot Tab ──────────────────────────────
function CopilotTab({ activeCampaign, navigate }) {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const handleQuery = (queryText) => {
    const q = queryText.trim();
    if (!q) return;

    setChatHistory(prev => [...prev, { role: 'user', content: q }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const filters = parseQuery(q);
      const results = searchCandidates(filters);
      const summary = generateSummary(q, filters, results, activeCampaign);

      setChatHistory(prev => [...prev, {
        role: 'ai',
        content: summary,
        results,
        filters,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
      setIsTyping(false);
    }, 500);
  };

  const suggestions = [
    "Top 3 candidates for tech interview",
    "Backend engineers with startup experience and >1500 rating",
    "Who has the best system design score?",
    "Find immediately available Python engineers",
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-[650px] space-y-4">
      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 pb-2">
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleQuery(s)}
            className="px-2.5 py-1 bg-white hover:bg-[#FFDE59] border-2 border-black text-[11px] font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            + {s}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-[#F0EDE6] border-3 border-black shadow-[4px_4px_0px_#000]">
        {chatHistory.length === 0 && (
          <div className="text-center py-12 space-y-3">
            <div className="w-14 h-14 bg-[#CCFF00] border-3 border-black flex items-center justify-center mx-auto shadow-[3px_3px_0px_#000]">
              <Brain size={28} />
            </div>
            <h4 className="text-base font-black uppercase text-black">AI SOURCING COPILOT READY</h4>
            <p className="text-xs text-neutral-600 max-w-md mx-auto font-sans font-medium">
              Ask natural language queries across your applicant pool. Filter by coding contest rating, system design depth, startup experience, or tech stack.
            </p>
          </div>
        )}

        {chatHistory.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-4 border-3 border-black shadow-[3px_3px_0px_#000] ${
              msg.role === 'user' ? 'bg-[#CCFF00] text-black font-black' : 'bg-white text-black'
            }`}>
              <div className="text-[10px] uppercase font-black tracking-wider opacity-60 mb-1">
                {msg.role === 'user' ? '// YOU' : '// HYPERS RECRUITING AI'}
              </div>
              <p className="text-xs whitespace-pre-wrap font-sans font-medium leading-relaxed">{msg.content}</p>

              {msg.results && msg.results.length > 0 && (
                <div className="mt-3 pt-3 border-t-2 border-black space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                    MATCHING CANDIDATES ({msg.results.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {msg.results.slice(0, 4).map(c => (
                      <div 
                        key={c.id} 
                        onClick={() => navigate(`/candidate/${c.id}`)}
                        className="p-2.5 bg-[#FAF8F5] hover:bg-[#FFDE59] border-2 border-black cursor-pointer transition-all flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-black uppercase">{c.name}</div>
                          <div className="text-[10px] text-neutral-600 uppercase font-bold">{c.title} • {c.experience}</div>
                        </div>
                        <span className={`text-[10px] font-black px-1.5 py-0.5 ${getBrutalistScoreBadge(c.scores.overall)}`}>
                          {c.scores.overall}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs font-black uppercase bg-white border-2 border-black p-3 w-fit shadow-[2px_2px_0px_#000]">
            <Activity size={14} className="animate-spin text-black" />
            <span>AI SCANNING TALENT REPOSITORY...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Query Input */}
      <form onSubmit={(e) => { e.preventDefault(); handleQuery(inputValue); }} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="QUERY TALENT POOL (E.G. 'Top 3 backend engineers with startup experience')..."
          className="flex-1 bg-white border-3 border-black px-4 py-3 text-xs font-black uppercase text-black placeholder:text-neutral-400 focus:outline-none focus:bg-[#FFFDE8] shadow-[3px_3px_0px_#000]"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="px-6 py-3 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] text-black border-3 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Search size={14} />
          <span>[ SEARCH ]</span>
        </button>
      </form>
    </motion.div>
  );
}

// ─── Sub-Component: Interviews Protocol Tab ─────────────────────
function InterviewsTab({ activeCampaign, navigate }) {
  const [filterType, setFilterType] = useState('all');

  const interviewsList = useMemo(() => {
    return [
      {
        id: 'int_1',
        candidateName: 'Wei Zhang',
        candidateTitle: 'Staff Backend / Systems Engineer',
        time: 'Today, 3:00 PM',
        type: 'Live Technical Architecture',
        status: 'upcoming',
        stage: 'Stage 04: Technical Deep-Dive',
        evaluator: 'Founder (You)',
        focus: 'Distributed Lock Manager, Kafka Partitioning, FastAPI Under Load',
        roomLink: '/ide/solve/101',
        score: null,
      },
      {
        id: 'int_2',
        candidateName: 'Elena Rostova',
        candidateTitle: 'Lead AI/ML Systems Engineer',
        time: 'Tomorrow, 11:00 AM',
        type: 'Model Tuning & Ingestion Sim',
        status: 'upcoming',
        stage: 'Stage 04: Domain Architecture',
        evaluator: 'Priya K. (ML Lead)',
        focus: 'Transformer Fine-tuning, Token Latency Optimization',
        roomLink: '/ide/solve/102',
        score: null,
      },
      {
        id: 'int_3',
        candidateName: 'Marcus Vance',
        candidateTitle: 'Distributed Systems Architect',
        time: 'Completed Yesterday',
        type: 'Technical & System Design',
        status: 'completed',
        stage: 'Stage 04: Passed',
        evaluator: 'Founder (You)',
        focus: 'Event-driven ledgers, multi-region sync',
        roomLink: null,
        score: 96,
        notes: 'Exceptional system design breakdown. Clearly identified replication bottlenecks. Highly recommended for immediate offer.'
      },
      {
        id: 'int_4',
        candidateName: 'Arjun Mehta',
        candidateTitle: 'Senior Full-Stack Engineer',
        time: 'Completed Oct 24',
        type: 'AI Screening & Live Code',
        status: 'completed',
        stage: 'Stage 02: Screened',
        evaluator: 'AI Evaluator Engine',
        focus: 'FastAPI CRUD, Postgres CTE indexing, React Hooks',
        roomLink: null,
        score: 92,
        notes: 'High execution speed (98th percentile). Clean test coverage and pragmatic tradeoffs.'
      }
    ];
  }, []);

  const filteredInterviews = interviewsList.filter(intItem => {
    if (filterType === 'upcoming') return intItem.status === 'upcoming';
    if (filterType === 'completed') return intItem.status === 'completed';
    return true;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-4 border-black pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#FF52D9] text-black border border-black px-2 py-0.5 text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]">
              INTERVIEW PROTOCOL
            </span>
            <span className="text-[10px] font-black uppercase text-neutral-500">
              {activeCampaign.title}
            </span>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-black flex items-center gap-2">
            <Video size={24} className="stroke-[2.5]" />
            <span>Technical Interviews & Assessment Queue</span>
          </h2>
          <p className="text-xs font-bold text-neutral-600">
            Track upcoming live coding interviews, review past scorecard rubrics, and launch technical pairing rooms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['all', 'upcoming', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-3 py-1.5 text-xs font-black uppercase border-2 border-black transition-all cursor-pointer ${
                filterType === f
                  ? 'bg-black text-[#CCFF00] shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-black hover:bg-[#FAF8F5]'
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Interview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredInterviews.map((item) => (
          <div key={item.id} className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-start gap-2 mb-3 border-b-2 border-black pb-2.5">
                <div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 border border-black inline-block mb-1 ${
                    item.status === 'upcoming' ? 'bg-[#CCFF00] text-black' : 'bg-black text-[#00F0FF]'
                  }`}>
                    {item.status === 'upcoming' ? '⚡ UPCOMING SESSION' : '✓ EVALUATION COMPLETE'}
                  </span>
                  <h3 className="text-base font-black uppercase text-black">{item.candidateName}</h3>
                  <p className="text-[11px] font-bold text-neutral-600 uppercase">{item.candidateTitle}</p>
                </div>
                {item.score ? (
                  <div className={`px-2.5 py-1 text-sm font-black ${getBrutalistScoreBadge(item.score)}`}>
                    {item.score}/100
                  </div>
                ) : (
                  <span className="text-xs font-black text-black bg-[#FFDE59] border border-black px-2 py-1 uppercase shadow-[1px_1px_0px_#000]">
                    {item.time}
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs font-sans">
                <div className="bg-[#FAF8F5] border-2 border-black p-2.5 font-mono text-[11px] space-y-1">
                  <div><strong>Focus:</strong> {item.focus}</div>
                  <div><strong>Evaluator:</strong> {item.evaluator} • <strong>Stage:</strong> {item.stage}</div>
                </div>

                {item.notes && (
                  <div className="bg-[#F0FFF0] border-2 border-black p-2.5 text-xs text-neutral-800 font-medium">
                    <strong className="font-mono uppercase text-emerald-800 block text-[10px] mb-0.5">// EVALUATOR RUBRIC VERDICT:</strong>
                    "{item.notes}"
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t-2 border-black">
              {item.roomLink ? (
                <button
                  onClick={() => navigate(item.roomLink)}
                  className="flex-1 py-2.5 bg-[#00F0FF] hover:bg-black hover:text-[#00F0FF] text-black border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Code size={14} />
                  <span>[ LAUNCH CODING ROOM ➔ ]</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/candidate/cand_12`)}
                  className="flex-1 py-2.5 bg-[#FFDE59] hover:bg-black hover:text-[#FFDE59] text-black border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText size={14} />
                  <span>[ VIEW FULL DOSSIER ]</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Sub-Component: Analytics Protocol Tab (NEW COMPREHENSIVE ENGINE) ───
function AnalyticsTab({ activeCampaign }) {
  const [timeframe, setTimeframe] = useState('30d'); // '7d' | '30d' | 'all'
  const [copiedReport, setCopiedReport] = useState(false);

  // Inflow velocity data over 6 weeks
  const inflowVelocityData = useMemo(() => [
    { week: 'W1 (May 01)', inbound: 38, qualified: 7, interviews: 1 },
    { week: 'W2 (May 08)', inbound: 52, qualified: 9, interviews: 2 },
    { week: 'W3 (May 15)', inbound: 64, qualified: 11, interviews: 2 },
    { week: 'W4 (May 22)', inbound: 45, qualified: 8, interviews: 1 },
    { week: 'W5 (May 29)', inbound: 31, qualified: 5, interviews: 1 },
    { week: 'W6 (Jun 05)', inbound: 15, qualified: 2, interviews: 1 },
  ], []);

  // Channel attribution & signal yield
  const channelAttributionData = useMemo(() => [
    { channel: 'Hypers Arena & Royale', volume: 93, qualifiedYield: 82, color: '#CCFF00' },
    { channel: 'GitHub Open Source', volume: 59, qualifiedYield: 71, color: '#00F0FF' },
    { channel: 'YC & Founder Network', volume: 39, qualifiedYield: 88, color: '#FFDE59' },
    { channel: 'Direct Inbound Organic', volume: 54, qualifiedYield: 14, color: '#FF52D9' },
  ], []);

  // Candidate competency scores
  const competencyRadarData = useMemo(() => [
    { skill: 'System Design', score: 92, benchmark: 80 },
    { skill: 'Distributed Backend', score: 88, benchmark: 75 },
    { skill: 'Database Optimization', score: 85, benchmark: 70 },
    { skill: 'Algorithmic DSA', score: 89, benchmark: 78 },
    { skill: 'DevOps / AWS Cloud', score: 82, benchmark: 65 },
    { skill: 'Startup Ownership', score: 90, benchmark: 80 },
  ], []);

  // Export report
  const exportRecruitingReport = () => {
    let md = `# HYPERS TALENT SOURCING CAMPAIGN REPORT\n`;
    md += `ROLE: ${activeCampaign.title.toUpperCase()}\n`;
    md += `STARTUP: ${activeCampaign.startupName.toUpperCase()}\n`;
    md += `STATUS: ACTIVE // TIMEFRAME: ${timeframe.toUpperCase()}\n\n`;
    md += `## 1. EXECUTIVE VENTURE SOURCING METRICS\n`;
    md += `- Total Inbound Applications: ${activeCampaign.applicationsCount}\n`;
    md += `- AI Qualified Candidates: ${activeCampaign.qualifiedCount} (17.1% pass rate)\n`;
    md += `- Strong Matches (90+ score): ${activeCampaign.strongMatchCount}\n`;
    md += `- Interview Ready: ${activeCampaign.interviewReadyCount}\n`;
    md += `- Estimated Cost Per Hire: $2,450 (vs $18,500 agency avg - $16,050 saved)\n`;
    md += `- Average Sourcing Velocity: 14.2 days\n\n`;
    md += `## 2. TOP SOURCING CHANNELS\n`;
    channelAttributionData.forEach(c => {
      md += `- ${c.channel}: ${c.volume} applicants, ${c.qualifiedYield}% qualified yield\n`;
    });
    
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(md);
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2500);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      
      {/* Top Header & Timeframe Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b-4 border-black pb-4 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#CCFF00] text-black border border-black px-2 py-0.5 text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]">
              SOURCING ANALYTICS PROTOCOL
            </span>
            <span className="bg-black text-[#00F0FF] border border-black px-2 py-0.5 text-[10px] font-black uppercase">
              LIVE TELEMETRY
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black flex items-center gap-2">
            <TrendingUp size={28} className="stroke-[2.5]" />
            <span>Talent Sourcing Analytics & Velocity Protocol</span>
          </h2>
          <p className="text-xs font-bold text-neutral-600">
            Algorithmic conversion intelligence, channel attribution, candidate skill radar, and cost-per-hire telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-[#F0EDE6] border-2 border-black p-1 flex items-center shadow-[2px_2px_0px_#000]">
            {['7d', '30d', 'all'].map(t => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 text-[11px] font-black uppercase transition-all cursor-pointer ${
                  timeframe === t ? 'bg-black text-[#CCFF00]' : 'text-black hover:bg-white'
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={exportRecruitingReport}
            className="px-3.5 py-2 bg-white hover:bg-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copiedReport ? <Check size={14} className="text-emerald-700 stroke-[3]" /> : <Copy size={14} />}
            <span>{copiedReport ? 'REPORT COPIED!' : 'EXPORT REPORT'}</span>
          </button>
        </div>
      </div>

      {/* 4 Executive Venture Sourcing KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Cost per Hire */}
        <div className="bg-white border-4 border-black p-5 shadow-[5px_5px_0px_#000] relative">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black uppercase text-neutral-500">CAPITAL EFFICIENCY</span>
            <div className="w-7 h-7 bg-[#CCFF00] border-2 border-black flex items-center justify-center text-black shadow-[1px_1px_0px_#000]">
              <DollarSign size={15} strokeWidth={3} />
            </div>
          </div>
          <div className="text-3xl font-black text-black tracking-tight mb-1">$2,450</div>
          <div className="text-xs font-black text-emerald-800 uppercase flex items-center gap-1">
            <span>SAVING $16,050</span>
            <span className="text-[10px] font-bold text-neutral-500 normal-case font-sans">(vs $18.5k agency fee)</span>
          </div>
        </div>

        {/* Metric 2: Sourcing Velocity */}
        <div className="bg-white border-4 border-black p-5 shadow-[5px_5px_0px_#000] relative">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black uppercase text-neutral-500">TIME TO HIRE</span>
            <div className="w-7 h-7 bg-[#00F0FF] border-2 border-black flex items-center justify-center text-black shadow-[1px_1px_0px_#000]">
              <Clock size={15} strokeWidth={3} />
            </div>
          </div>
          <div className="text-3xl font-black text-black tracking-tight mb-1">14.2 Days</div>
          <div className="text-xs font-black text-[#007aff] uppercase flex items-center gap-1">
            <span>TOP 8% OF BATCH</span>
            <span className="text-[10px] font-bold text-neutral-500 normal-case font-sans">(benchmark: 35 days)</span>
          </div>
        </div>

        {/* Metric 3: AI Screen Accuracy */}
        <div className="bg-white border-4 border-black p-5 shadow-[5px_5px_0px_#000] relative">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black uppercase text-neutral-500">AI SCREEN ACCURACY</span>
            <div className="w-7 h-7 bg-[#FFDE59] border-2 border-black flex items-center justify-center text-black shadow-[1px_1px_0px_#000]">
              <Brain size={15} strokeWidth={3} />
            </div>
          </div>
          <div className="text-3xl font-black text-black tracking-tight mb-1">94.2%</div>
          <div className="text-xs font-black text-neutral-800 uppercase flex items-center gap-1">
            <span>TECHNICAL CORRELATION</span>
            <span className="text-[10px] font-bold text-neutral-500 normal-case font-sans">(42 interviews)</span>
          </div>
        </div>

        {/* Metric 4: Offer Acceptance Rate */}
        <div className="bg-white border-4 border-black p-5 shadow-[5px_5px_0px_#000] relative">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black uppercase text-neutral-500">OFFER ACCEPTANCE</span>
            <div className="w-7 h-7 bg-[#FF52D9] border-2 border-black flex items-center justify-center text-black shadow-[1px_1px_0px_#000]">
              <Award size={15} strokeWidth={3} />
            </div>
          </div>
          <div className="text-3xl font-black text-black tracking-tight mb-1">88.5%</div>
          <div className="text-xs font-black text-[#FF0033] uppercase flex items-center gap-1">
            <span>HIGH CONVICTION</span>
            <span className="text-[10px] font-bold text-neutral-500 normal-case font-sans">(3 of 3 active)</span>
          </div>
        </div>

      </div>

      {/* Row 2: Inflow Velocity Over Time + Channel Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Sourcing Inflow Velocity (7 cols) */}
        <div className="lg:col-span-7 bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] space-y-4">
          <div className="flex justify-between items-center border-b-2 border-black pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#CCFF00] border border-black inline-block" />
              <h3 className="text-xs font-black uppercase text-black">
                [ APPLICANT INFLOW & AI-QUALIFIED YIELD OVER TIME ]
              </h3>
            </div>
            <span className="text-[10px] font-black uppercase text-neutral-500">6 WEEKS TELEMETRY</span>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={inflowVelocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorQualified" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#CCFF00" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: '#000', fontSize: 10, fontWeight: 800, fontFamily: 'monospace' }} />
                <YAxis tick={{ fill: '#000', fontSize: 10, fontWeight: 800, fontFamily: 'monospace' }} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#000', color: '#CCFF00', border: '2px solid #000', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '11px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="inbound" stroke="#000" strokeWidth={2} fillOpacity={1} fill="url(#colorInbound)" name="Total Inbound" />
                <Area type="monotone" dataKey="qualified" stroke="#000" strokeWidth={2} fillOpacity={1} fill="url(#colorQualified)" name="AI Qualified" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-[11px] font-bold text-neutral-700 pt-2 border-t border-black/10">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#00F0FF] border border-black inline-block" /> Total Inbound</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#CCFF00] border border-black inline-block" /> AI Qualified</span>
            </div>
            <span className="text-[10px] font-mono uppercase text-neutral-500">// PEAK CONVERSION IN WEEK 3 POST-HACKATHON</span>
          </div>
        </div>

        {/* Chart 2: Channel Attribution & Yield (5 cols) */}
        <div className="lg:col-span-5 bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b-2 border-black pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#FFDE59] border border-black inline-block" />
                <h3 className="text-xs font-black uppercase text-black">
                  [ SOURCING CHANNELS & SIGNAL YIELD ]
                </h3>
              </div>
              <span className="text-[10px] font-black uppercase text-emerald-800">HIGH SIGNAL</span>
            </div>

            <div className="space-y-3">
              {channelAttributionData.map((item, idx) => (
                <div key={idx} className="space-y-1.5 bg-[#FAF8F5] border-2 border-black p-2.5">
                  <div className="flex justify-between items-center text-xs font-black uppercase">
                    <span>{item.channel}</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-black text-[#CCFF00] border border-black">
                      {item.qualifiedYield}% YIELD
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-zinc-200 border border-black overflow-hidden flex">
                    <div 
                      className="h-full border-r border-black" 
                      style={{ width: `${item.qualifiedYield}%`, backgroundColor: item.color }} 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-neutral-600 font-bold uppercase">
                    <span>{item.volume} Candidates</span>
                    <span>High Signal Conversion</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FFFDE8] border-2 border-black p-2.5 text-[10px] font-bold text-neutral-800 uppercase flex items-center gap-1.5">
            <Sparkles size={12} className="text-[#FF5722] shrink-0" />
            <span>Hypers Arena participants yield 5.8x more qualified offers than organic inbound.</span>
          </div>
        </div>

      </div>

      {/* Row 3: Skill Competency Breakdown + Funnel Drop-Off Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Competency Distribution (6 cols) */}
        <div className="lg:col-span-6 bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] space-y-4">
          <div className="flex justify-between items-center border-b-2 border-black pb-2.5">
            <h3 className="text-xs font-black uppercase text-black flex items-center gap-2">
              <Code size={14} />
              <span>[ QUALIFIED CANDIDATE SKILL COMPETENCY RADAR ]</span>
            </h3>
            <span className="text-[10px] font-black uppercase text-[#007aff]">BENCHMARK 80+</span>
          </div>

          <div className="space-y-2.5">
            {competencyRadarData.map((comp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-black uppercase">
                  <span>{comp.skill}</span>
                  <span className="font-mono font-black text-black">{comp.score} / 100</span>
                </div>
                <div className="h-3 w-full bg-[#FAF8F5] border-2 border-black overflow-hidden relative">
                  <div 
                    className="h-full bg-[#CCFF00] border-r-2 border-black transition-all" 
                    style={{ width: `${comp.score}%` }} 
                  />
                  {/* Benchmark line */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-[#FF0033] z-10" 
                    style={{ left: `${comp.benchmark}%` }} 
                    title={`Benchmark: ${comp.benchmark}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-black/10 flex justify-between text-[10px] font-mono text-neutral-600 uppercase">
            <span>Red line indicates minimum Tier-1 pre-seed benchmark</span>
            <span className="font-black text-emerald-800">ALL 6 CRITERIA SURPASSED</span>
          </div>
        </div>

        {/* Funnel Drop-off Telemetry Table (6 cols) */}
        <div className="lg:col-span-6 bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b-2 border-black pb-2.5 mb-3">
              <h3 className="text-xs font-black uppercase text-black flex items-center gap-2">
                <Filter size={14} />
                <span>[ PIPELINE STAGE PASS-THROUGH TELEMETRY ]</span>
              </h3>
              <span className="text-[10px] font-black uppercase text-neutral-500">6 STAGES</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs uppercase font-mono border-2 border-black">
                <thead>
                  <tr className="bg-black text-white border-b-2 border-black">
                    <th className="p-2 border-r border-white/20">Stage</th>
                    <th className="p-2 border-r border-white/20">Volume</th>
                    <th className="p-2 border-r border-white/20 text-[#CCFF00]">Pass Rate</th>
                    <th className="p-2 text-right">Avg Velocity</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { stage: '1. Inbound Ingest', count: 245, passRate: '100%', time: '0.2 Days' },
                    { stage: '2. AI Code & GitHub Screen', count: 42, passRate: '17.1%', time: '0.8 Days' },
                    { stage: '3. Technical Match Review', count: 12, passRate: '28.5%', time: '1.4 Days' },
                    { stage: '4. Live Technical Pairing', count: 8, passRate: '66.7%', time: '2.1 Days' },
                    { stage: '5. Founder Culture Interview', count: 5, passRate: '62.5%', time: '1.8 Days' },
                    { stage: '6. Formal Offer Extended', count: 3, passRate: '60.0%', time: '4.1 Days' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-black hover:bg-[#FAF8F5]">
                      <td className="p-2 font-black border-r border-black">{row.stage}</td>
                      <td className="p-2 font-bold border-r border-black">{row.count}</td>
                      <td className="p-2 font-black text-emerald-800 border-r border-black">{row.passRate}</td>
                      <td className="p-2 text-right font-bold text-neutral-700">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#FAF8F5] border-2 border-black p-3 space-y-1">
            <span className="text-[10px] font-black uppercase text-black block">// RECRUITING AI ACTIONABLE INSIGHT:</span>
            <p className="text-xs text-neutral-800 font-sans font-medium">
              Stage 3 (Technical Match Review) is your primary conversion bottleneck. Automating technical code verification reduces time-to-hire by 3.2 days.
            </p>
          </div>
        </div>

      </div>

    </motion.div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────
export default function CampaignDashboard({ companyData }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeCampaign, setActiveCampaign] = useState(mockCampaigns[0]);
  const [isBoosting, setIsBoosting] = useState(false);
  
  // Pipeline state
  const [pipelineFilters] = useState({
    rating: 0,
    github: 0,
    startup: false
  });

  const startupName = companyData?.name || activeCampaign.startupName || 'NexaFlow';

  const getCampaignCandidates = () => {
    const appIds = mockApplications.filter(a => a.campaignId === activeCampaign.id).map(a => a.candidateId);
    let candidates = mockCandidates.filter(c => appIds.includes(c.id));
    
    // Apply filters
    if (pipelineFilters.rating > 0) candidates = candidates.filter(c => c.contestRating >= pipelineFilters.rating);
    if (pipelineFilters.github > 0) candidates = candidates.filter(c => c.github.commits >= pipelineFilters.github);
    if (pipelineFilters.startup) candidates = candidates.filter(c => c.hasStartupExp);
    
    return candidates.sort((a, b) => b.scores.overall - a.scores.overall);
  };

  const getCandidatesByStage = (stageId) => {
    const apps = mockApplications.filter(a => a.campaignId === activeCampaign.id && a.stage === stageId);
    return apps.map(app => {
      const cand = mockCandidates.find(c => c.id === app.candidateId);
      return { ...cand, app };
    }).filter(c => c.id);
  };

  const dashboardTabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: 'LIVE' },
    { id: 'pipeline', label: 'Applicant Pipeline', icon: Users, badge: `${activeCampaign.applicationsCount}` },
    { id: 'kanban', label: 'Hiring Board', icon: Target, badge: 'KANBAN' },
    { id: 'interviews', label: 'Interviews', icon: Video, badge: '4 ACTIVE' },
    { id: 'copilot', label: 'AI Copilot', icon: Brain, badge: 'NLP SEARCH' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, badge: 'TELEMETRY' },
  ];

  const funnelData = [
    { name: 'Applied', count: activeCampaign.applicationsCount, pct: '100%' },
    { name: 'Qualified', count: activeCampaign.qualifiedCount, pct: '17.1%' },
    { name: 'Strong Match', count: activeCampaign.strongMatchCount, pct: '4.9%' },
    { name: 'Interview', count: activeCampaign.interviewReadyCount, pct: '3.3%' },
    { name: 'Offer', count: activeCampaign.offerReadyCount, pct: '1.2%' },
  ];

  const triggerSourcingBoost = () => {
    setIsBoosting(true);
    setTimeout(() => {
      setIsBoosting(false);
      setActiveTab('pipeline');
    }, 900);
  };

  return (
    <div className="flex flex-col md:flex-row w-full bg-[#FBF9F5] border-4 border-black shadow-[8px_8px_0px_#000] font-mono text-black min-h-[750px] overflow-hidden select-none">
      
      {/* ─── Left Sidebar Nav ─── */}
      <div className="w-full md:w-64 bg-[#F0EDE6] border-b-4 md:border-b-0 md:border-r-4 border-black p-5 flex flex-col shrink-0 overflow-y-auto">
        
        {/* Terminal Header */}
        <div className="mb-5 pb-4 border-b-3 border-black">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF0033] border border-black" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFDE59] border border-black" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] border border-black" />
            <span className="text-[10px] font-black uppercase text-neutral-600 ml-1">SOURCING_OS</span>
          </div>

          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-8 h-8 bg-[#CCFF00] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <Rocket size={16} className="text-black" />
            </div>
            <div>
              <h2 className="text-base font-black text-black uppercase tracking-tight leading-none">
                Recruiting
              </h2>
              <span className="text-[10px] font-bold text-neutral-600 uppercase">TALENT ENGINE</span>
            </div>
          </div>
          <div className="text-[10px] font-black text-black bg-[#FFDE59] border border-black px-2 py-0.5 inline-block uppercase shadow-[1px_1px_0px_#000] mt-1">
            COMMAND CENTER
          </div>
        </div>

        {/* Active Campaign Selector */}
        <div className="mb-5">
          <label className="text-[10px] font-black text-black uppercase tracking-wider mb-1.5 block">
            // ACTIVE SOURCING SPRINT
          </label>
          <select 
            className="w-full p-2.5 bg-white border-3 border-black text-xs font-black uppercase text-black shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDE8] cursor-pointer"
            value={activeCampaign.id}
            onChange={(e) => setActiveCampaign(mockCampaigns.find(c => c.id === e.target.value))}
          >
            {mockCampaigns.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
          <div className="mt-1.5 text-[10px] font-bold text-neutral-600 uppercase flex justify-between">
            <span>{activeCampaign.compensation}</span>
            <span className="text-black font-black">{activeCampaign.workMode}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="space-y-1.5 flex-1">
          <label className="text-[10px] font-black text-gray-600 uppercase tracking-wider mb-2 block">
            // WORKSPACE MODULES
          </label>
          {dashboardTabs.map(tab => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono font-black uppercase transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-black text-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] translate-x-1' 
                    : 'text-black bg-white hover:bg-[#FFDE59] border-2 border-black hover:shadow-[2px_2px_0px_#000]'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon size={16} className={isActive ? 'text-[#FFDE59]' : 'text-black'} />
                  <span className="truncate">{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className={`text-[9px] font-black px-1.5 py-0.2 border ${
                    isActive ? 'bg-[#CCFF00] text-black border-black' : 'bg-[#FAF8F5] text-neutral-700 border-black/40'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* New Campaign Button */}
        <button 
          onClick={() => navigate('/campaign/create')} 
          className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#CCFF00] text-black border-3 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] hover:bg-black hover:text-[#CCFF00] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          <Zap size={14} /> [ + NEW CAMPAIGN ]
        </button>
      </div>

      {/* ─── Main Content Area ─── */}
      <div className="flex-1 overflow-y-auto bg-[#FBF9F5] p-5 sm:p-7">
        <AnimatePresence mode="wait">
          
          {/* ═══ 01. OVERVIEW TAB ═══ */}
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              
              {/* Header Banner */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b-4 border-black pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="px-2.5 py-0.5 bg-black text-[#00F0FF] text-[10px] font-black uppercase border border-black shadow-[2px_2px_0px_#000]">
                      // SOURCING SPRINT: ACTIVE
                    </span>
                    <span className="bg-[#CCFF00] text-black text-[10px] font-black uppercase px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                      TOP 12% INFLOW VELOCITY
                    </span>
                    <span className="bg-white text-black text-[10px] font-black uppercase px-2 py-0.5 border border-black">
                      ROLE: {activeCampaign.department}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
                    {activeCampaign.title} Overview
                  </h1>
                  <p className="text-gray-700 text-xs font-bold uppercase tracking-wider mt-1">
                    TRACKING METRICS FOR {startupName} • LAUNCHED {activeCampaign.createdAt} • REQ ID #{activeCampaign.id.toUpperCase()}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={triggerSourcingBoost}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] border-2 border-black text-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    <RefreshCw size={13} className={isBoosting ? "animate-spin" : ""} />
                    <span>{isBoosting ? 'BOOSTING...' : '[ ⚡ AI TALENT BOOST ]'}</span>
                  </button>

                  <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white border-2 border-black text-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] hover:bg-[#FFDE59] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer">
                    <Settings size={14} />
                    <span>[ SETTINGS ]</span>
                  </button>
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Applications', val: activeCampaign.applicationsCount, sub: '+32 THIS WEEK', icon: Users, bg: 'bg-[#00F0FF]' },
                  { label: 'AI Qualified', val: activeCampaign.qualifiedCount, sub: '17.1% PASS RATE', icon: CheckCircle2, bg: 'bg-[#CCFF00]' },
                  { label: 'Strong Matches', val: activeCampaign.strongMatchCount, sub: '90+ SCORE COHORT', icon: Star, bg: 'bg-[#FFDE59]' },
                  { label: 'Interview Ready', val: activeCampaign.interviewReadyCount, sub: '3 SLOTS ACTIVE', icon: Video, bg: 'bg-[#FF52D9]' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 border-2 border-black ${stat.bg} flex items-center justify-center text-black shadow-[2px_2px_0px_#000]`}>
                          <stat.icon size={20} />
                        </div>
                        <span className="text-[10px] font-black text-neutral-500 uppercase">STAGE 0{i+1}</span>
                      </div>
                      <div className="text-4xl font-black text-black mb-1">{stat.val}</div>
                      <div className="text-xs font-black text-neutral-700 uppercase tracking-wider">{stat.label}</div>
                    </div>
                    <div className="pt-3 mt-3 border-t-2 border-black/10 text-[10px] font-black uppercase text-neutral-500 flex justify-between items-center">
                      <span>{stat.sub}</span>
                      <ArrowUpRight size={13} className="text-black" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Funnel + Action Items */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Hiring Funnel Chart */}
                <div className="lg:col-span-2 bg-white border-3 border-black p-5 sm:p-6 shadow-[5px_5px_0px_#000] space-y-4">
                  <div className="flex items-center justify-between pb-2.5 border-b-2 border-black">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-black"></div>
                      <h3 className="text-xs font-black text-black uppercase tracking-wider">
                        [ RECRUITMENT FUNNEL CONVERSION TELEMETRY ]
                      </h3>
                    </div>
                    <span className="text-[10px] font-black uppercase text-emerald-800 bg-[#E8FCE8] border border-emerald-600 px-2 py-0.5">
                      TELEMETRY ACTIVE
                    </span>
                  </div>
                  
                  <div className="h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E0D8" />
                        <XAxis type="number" hide />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#000', fontWeight: 900, fontSize: 11, fontFamily: 'monospace' }} 
                        />
                        <RechartsTooltip 
                          cursor={{ fill: 'rgba(0,0,0,0.05)' }} 
                          contentStyle={{ backgroundColor: '#000', color: '#CCFF00', border: '2px solid #000', fontWeight: 'bold', fontFamily: 'monospace', textTransform: 'uppercase' }} 
                        />
                        <Bar 
                          dataKey="count" 
                          fill="#00F0FF" 
                          stroke="#000" 
                          strokeWidth={2} 
                          barSize={28} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="pt-3 border-t-2 border-black flex flex-wrap justify-between items-center text-[10px] font-mono font-bold text-neutral-700 uppercase">
                    <span>APPLIED: 245 → QUALIFIED: 42 (17.1%) → STRONG MATCH: 12 (4.9%)</span>
                    <button 
                      onClick={() => setActiveTab('analytics')}
                      className="text-black hover:text-[#007aff] font-black underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>VIEW FULL ANALYTICS PROTOCOL</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>

                {/* Action Items */}
                <div className="bg-white border-3 border-black p-5 sm:p-6 shadow-[5px_5px_0px_#000] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-black">
                      <div className="flex items-center gap-2">
                        <Zap size={16} className="text-black" />
                        <h3 className="text-xs font-black text-black uppercase tracking-wider">
                          [ ACTION PROTOCOLS ]
                        </h3>
                      </div>
                      <span className="text-[10px] font-black uppercase text-[#FF0033]">2 PENDING</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div 
                        onClick={() => setActiveTab('pipeline')}
                        className="p-3.5 bg-[#E8FCE8] border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer hover:translate-x-1 transition-all"
                      >
                        <div className="flex justify-between items-start mb-1.5">
                          <span className="text-[10px] font-black text-black bg-[#CCFF00] border border-black px-2 py-0.5 uppercase">
                            NEW MATCH
                          </span>
                          <span className="text-[10px] text-black font-black uppercase">2H AGO</span>
                        </div>
                        <p className="text-xs font-black text-black uppercase">Review 3 new strong matches</p>
                        <p className="text-[10px] font-sans font-medium text-neutral-700 mt-0.5">Wei Zhang (96%), James Liu (94%), Arjun M. (92%)</p>
                      </div>

                      <div 
                        onClick={() => setActiveTab('interviews')}
                        className="p-3.5 bg-[#FFF0F0] border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer hover:translate-x-1 transition-all"
                      >
                        <div className="flex justify-between items-start mb-1.5">
                          <span className="text-[10px] font-black text-white bg-[#FF0033] border border-black px-2 py-0.5 uppercase">
                            INTERVIEW
                          </span>
                          <span className="text-[10px] text-black font-black uppercase">TODAY 3:00 PM</span>
                        </div>
                        <p className="text-xs font-black text-black uppercase">Tech interview with Wei Zhang</p>
                        <p className="text-[10px] font-sans font-medium text-neutral-700 mt-0.5">Distributed systems & API concurrency test</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-black mt-4">
                    <button 
                      onClick={() => setActiveTab('pipeline')}
                      className="w-full py-2.5 bg-black text-[#FFDE59] hover:bg-[#FFDE59] hover:text-black text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>[ OPEN TALENT PIPELINE ➔ ]</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Fast-Track Spotlight Section */}
              <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] space-y-4">
                <div className="flex justify-between items-center border-b-2 border-black pb-2.5">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#FF5722]" />
                    <h3 className="text-xs font-black uppercase text-black">
                      [ FAST-TRACK CANDIDATE SPOTLIGHT // TOP PRE-VETTED MATCHES ]
                    </h3>
                  </div>
                  <span className="text-[10px] font-black uppercase text-neutral-500">SORTED BY OVERALL MATCH</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getCampaignCandidates().slice(0, 3).map((candidate) => (
                    <div 
                      key={candidate.id}
                      onClick={() => navigate(`/candidate/${candidate.id}`)}
                      className="p-4 bg-[#FAF8F5] hover:bg-white border-3 border-black shadow-[3px_3px_0px_#000] hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl">{candidate.avatar}</span>
                            <div>
                              <h4 className="text-xs font-black uppercase text-black hover:underline">{candidate.name}</h4>
                              <p className="text-[10px] text-neutral-600 font-bold uppercase">{candidate.title}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 text-xs font-black ${getBrutalistScoreBadge(candidate.scores.overall)}`}>
                            {candidate.scores.overall}
                          </span>
                        </div>

                        <div className="bg-white border border-black p-2 my-2 text-[10px] font-bold text-neutral-800 space-y-0.5">
                          <div><strong>Rating:</strong> {candidate.contestRating} • <strong>Commits:</strong> {candidate.github.commits}</div>
                          <div><strong>Exp:</strong> {candidate.experience} ({candidate.hasStartupExp ? 'Startup Ready' : 'Big Tech'})</div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                          {candidate.skills.slice(0, 3).map(s => (
                            <span key={s} className="px-1.5 py-0.2 bg-[#F0EDE6] border border-black text-[9px] font-black uppercase">{s}</span>
                          ))}
                        </div>
                      </div>

                      <button className="w-full mt-2 py-1.5 bg-[#FFDE59] hover:bg-black hover:text-[#FFDE59] text-black border-2 border-black text-[10px] font-black uppercase transition-all flex items-center justify-center gap-1">
                        <span>VIEW DOSSIER ➔</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* ═══ 02. PIPELINE TAB ═══ */}
          {activeTab === 'pipeline' && (
            <motion.div key="pipeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              
              {/* Header & Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b-4 border-black pb-5">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
                    Applicant Pipeline
                  </h1>
                  <p className="text-gray-700 text-xs font-bold uppercase tracking-wider mt-1">
                    {getCampaignCandidates().length} AI-RANKED CANDIDATES FOR {activeCampaign.title}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={14} />
                    <input 
                      type="text" 
                      placeholder="SEARCH SKILLS, CODES..." 
                      className="pl-8 pr-4 py-2 bg-white border-2 border-black text-xs font-bold uppercase shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-[#FFFDE8] w-56" 
                    />
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-2 bg-white border-2 border-black text-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] hover:bg-[#FFDE59] cursor-pointer">
                    <Filter size={13} />
                    <span>[ FILTERS ]</span>
                  </button>
                </div>
              </div>

              {/* Candidates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {getCampaignCandidates().map(candidate => (
                  <div 
                    key={candidate.id} 
                    className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] transition-all cursor-pointer group flex flex-col justify-between" 
                    onClick={() => navigate(`/candidate/${candidate.id}`)}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#FFDE59] border-2 border-black flex items-center justify-center text-xl shadow-[2px_2px_0px_#000]">
                            {candidate.avatar}
                          </div>
                          <div>
                            <h3 className="font-black text-black text-sm uppercase group-hover:underline leading-tight">{candidate.name}</h3>
                            <p className="text-[10px] font-bold text-gray-600 uppercase mt-0.5">{candidate.title}</p>
                          </div>
                        </div>
                        <div className={`px-2.5 py-1 ${getBrutalistScoreBadge(candidate.scores.overall)}`}>
                          <span className="text-sm font-black">{candidate.scores.overall}</span>
                        </div>
                      </div>

                      <div className="space-y-1 mb-4 p-2 bg-[#FBF9F5] border-2 border-black text-[11px] font-black uppercase">
                        <div className="flex items-center gap-2">
                          <Code size={13} className="text-black" />
                          <span>{candidate.contestRating} RATING</span>
                          <span>•</span>
                          <GitPullRequest size={13} className="text-black" />
                          <span>{candidate.github.commits} COMMITS</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase size={13} className="text-black" />
                          <span>{candidate.experience}</span>
                          <span>•</span>
                          <span>{candidate.hasStartupExp ? 'STARTUP EXP' : 'BIG TECH'}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {candidate.skills.slice(0, 4).map(s => (
                          <span key={s} className="px-2 py-0.5 bg-[#F0EDE6] border border-black text-black text-[9px] font-black uppercase">{s}</span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full py-2 bg-[#FFDE59] text-black border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] hover:bg-black hover:text-[#FFDE59] transition-all flex items-center justify-center gap-2 cursor-pointer">
                      <span>[ VIEW CANDIDATE DOSSIER ➔ ]</span>
                    </button>
                  </div>
                ))}
              </div>

            </motion.div>
          )}

          {/* ═══ 03. HIRING BOARD (KANBAN) ═══ */}
          {activeTab === 'kanban' && (
            <motion.div key="kanban" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full flex flex-col space-y-6">
              <div className="flex justify-between items-center border-b-4 border-black pb-4">
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">Hiring Board</h1>
                <div className="text-xs font-black uppercase px-3 py-1 bg-black text-[#CCFF00]">
                  // DRAG & DROP PIPELINE ACTIVE
                </div>
              </div>
              
              <div className="flex-1 overflow-x-auto pb-4">
                <div className="flex gap-4 h-full min-w-max">
                  {pipelineStages.map(stage => {
                    const candidates = getCandidatesByStage(stage.id);
                    return (
                      <div key={stage.id} className="w-72 bg-[#F0EDE6] border-3 border-black p-4 flex flex-col shadow-[4px_4px_0px_#000]">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-black">
                          <h3 className="font-black text-black uppercase text-xs tracking-wider flex items-center gap-2">
                            <span className="w-2.5 h-2.5 bg-black"></span>
                            {stage.label}
                          </h3>
                          <span className="bg-black text-[#00F0FF] text-[10px] font-black px-2 py-0.5 border border-black">
                            {candidates.length}
                          </span>
                        </div>
                        
                        <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                          {candidates.map(candidate => (
                            <div 
                              key={candidate.id} 
                              className="bg-white p-3.5 border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 transition-all group" 
                              onClick={() => navigate(`/candidate/${candidate.id}`)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="font-black text-black text-xs uppercase">{candidate.name}</div>
                                <div className={`text-[9px] font-black px-1.5 py-0.2 ${getBrutalistScoreBadge(candidate.scores.overall)}`}>
                                  {candidate.scores.overall}
                                </div>
                              </div>
                              <div className="text-[10px] text-gray-700 font-bold uppercase mb-2">{candidate.experience} // {candidate.contestRating} RATING</div>
                              <div className="flex justify-between items-center pt-2 border-t border-black/10">
                                <div className="flex -space-x-1">
                                  {candidate.skills.slice(0, 3).map(s => (
                                    <div key={s} className="w-5 h-5 bg-[#FFDE59] border border-black flex items-center justify-center text-[8px] font-black" title={s}>
                                      {s.charAt(0)}
                                    </div>
                                  ))}
                                </div>
                                <span className="text-[9px] text-black font-black uppercase group-hover:underline">DOSSIER →</span>
                              </div>
                            </div>
                          ))}
                          {candidates.length === 0 && (
                            <div className="text-center py-8 border-2 border-dashed border-black text-gray-500 text-[10px] font-black uppercase">
                              [ NO CANDIDATES IN STAGE ]
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══ 04. INTERVIEWS TAB ═══ */}
          {activeTab === 'interviews' && (
            <InterviewsTab activeCampaign={activeCampaign} navigate={navigate} />
          )}

          {/* ═══ 05. COPILOT TAB ═══ */}
          {activeTab === 'copilot' && (
            <CopilotTab activeCampaign={activeCampaign} navigate={navigate} />
          )}

          {/* ═══ 06. ANALYTICS PROTOCOL TAB (FULL ENGINE) ═══ */}
          {activeTab === 'analytics' && (
            <AnalyticsTab activeCampaign={activeCampaign} />
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
