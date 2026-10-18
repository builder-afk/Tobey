import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip
} from 'recharts';
import {
  Terminal, ShieldCheck, Flame, Trophy, ExternalLink, Github, MapPin,
  Building, Briefcase, Zap, GitCommit, Target, Medal, Star, Shield,
  ArrowLeft, Copy, Check, Share2, Mail, Code2, Cpu, CheckCircle2,
  Sparkles, Award, UserCheck, ChevronRight
} from 'lucide-react';
import { leaderboardData } from '../data/mockLeaderboard';

// --- MOCK PROJECTS WITH PROOF-OF-WORK ---
const mockProjects = [
  {
    name: 'Distributed Rate Limiter',
    tech: ['Go', 'Redis', 'gRPC', 'Docker'],
    desc: 'High-throughput rate limiter handling 10k req/s using sliding window log algorithm with sub-millisecond overhead.',
    live: true,
    stars: 124,
    benchmark: '0.8ms p99 latency',
    repoUrl: 'https://github.com'
  },
  {
    name: 'Algorithmic Trading Bot',
    tech: ['Python', 'Pandas', 'Binance API', 'WebSockets'],
    desc: 'Mean reversion strategy bot with vectorized backtesting engine, automated risk profiling, and order execution.',
    live: true,
    stars: 89,
    benchmark: 'Sharpe 2.14 / 22% ARR',
    repoUrl: 'https://github.com'
  },
  {
    name: 'Real-time Telemetry Dashboard',
    tech: ['React', 'Node.js', 'ClickHouse', 'Kafka'],
    desc: 'Ingests and visualizes millions of events with sub-second OLAP aggregation across 16 distributed cluster nodes.',
    live: false,
    stars: 42,
    benchmark: '1.2M events/sec ingest',
    repoUrl: 'https://github.com'
  },
];

// --- 52-WEEK HEATMAP GENERATOR ---
const mockHeatmapWeeks = Array.from({ length: 52 }, () =>
  Array.from({ length: 7 }, () => {
    const rand = Math.random();
    if (rand < 0.25) return 0;
    if (rand < 0.55) return 1;
    if (rand < 0.8) return 2;
    if (rand < 0.93) return 3;
    return 4;
  })
);

const Heatmap = () => {
  const weeks = mockHeatmapWeeks;

  const getCellBg = (val) => {
    switch (val) {
      case 0: return 'bg-[#FAF8F5] border-neutral-300';
      case 1: return 'bg-[#CCFF00]/30 border-black';
      case 2: return 'bg-[#CCFF00]/60 border-black';
      case 3: return 'bg-[#CCFF00] border-black';
      case 4: return 'bg-[#00F0FF] border-black';
      default: return 'bg-[#FAF8F5] border-neutral-300';
    }
  };

  return (
    <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
      <div className="flex gap-1.5 min-w-[760px]">
        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            {week.map((day, j) => (
              <div
                key={`${i}-${j}`}
                className={`w-3 h-3 border ${getCellBg(day)} transition-transform hover:scale-125 hover:z-10`}
                title={`${day > 0 ? day * 3 : 0} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 mt-4 pt-3 border-t-2 border-black text-xs font-mono font-black uppercase text-black min-w-[760px]">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#CCFF00] border border-black" />
          <span>1,428 VERIFIED COMMITS IN LAST 365 DAYS</span>
        </span>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span>LESS</span>
          <div className="w-3 h-3 border border-neutral-300 bg-[#FAF8F5]" />
          <div className="w-3 h-3 border border-black bg-[#CCFF00]/30" />
          <div className="w-3 h-3 border border-black bg-[#CCFF00]/60" />
          <div className="w-3 h-3 border border-black bg-[#CCFF00]" />
          <div className="w-3 h-3 border border-black bg-[#00F0FF]" />
          <span>MORE</span>
        </div>
      </div>
    </div>
  );
};

// --- CUSTOM BRUTALIST RECHARTS TOOLTIP ---
const BrutalistTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border-2 border-black p-2.5 shadow-[3px_3px_0px_#000] font-mono">
        <p className="text-[10px] font-black uppercase text-neutral-500 mb-0.5">{label}</p>
        <p className="text-xs font-black text-black">{payload[0].value} ELO PTS</p>
      </div>
    );
  }
  return null;
};

export default function DeveloperProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [hireMessageSent, setHireMessageSent] = useState(false);

  // Find player by username or fallback
  const player = leaderboardData.find(
    p => p.username.toLowerCase().replace('@', '') === (username || '').toLowerCase()
  ) || leaderboardData[0];

  const mockAiEvaluation = `> INITIALIZING DEEP SCAN OF OPERATOR PROFILE [${player.username.toUpperCase()}]...
> ANALYZING ${player.solved || 892} VERIFIED PROBLEMS ACROSS 6 ARENA DOMAINS...
> EVALUATING REAL-WORLD DISTRIBUTED SYSTEM DESIGN AND CONCURRENCY PATTERNS...

[STRENGTHS & PROVEN CAPABILITIES]
- Exceptional problem-solving velocity in Dynamic Programming & Graph Topologies (Top 1.8% global).
- Clean, modular code structure adhering to strict Production-Grade zero-memory-leak standards.
- Demonstrated deep mastery of distributed rate limiters, gRPC interfaces, and sliding-window algorithms.

[AREAS FOR STRATEGIC OPTIMIZATION]
- Advanced math & number theory tasks occasionally present sub-optimal time complexity.
- Recommend increasing C++20 / Rust systems footprint to maximize ultra-low-latency throughput.

[HYPERS PROTOCOL VERDICT]
TIER 1 HIGH-MOAT OPERATOR. UNCONDITIONALLY RECOMMENDED FOR SENIOR INFRASTRUCTURE & BACKEND ARCHITECTURE ROLES.`;

  // Typing effect for evaluation terminal
  useEffect(() => {
    let i = 0;
    setTypedText('');
    const timer = setInterval(() => {
      setTypedText(mockAiEvaluation.substring(0, i));
      i += 3;
      if (i > mockAiEvaluation.length) clearInterval(timer);
    }, 12);
    return () => clearInterval(timer);
  }, [player.username]);

  const ratingChartData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => ({
    month: m,
    rating: player.ratingHistory ? player.ratingHistory[i] : 1400 + i * 90
  }));

  const copyProfileLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-black font-mono selection:bg-[#CCFF00] selection:text-black">
      
      {/* ═══ TOP PROTOCOL STATUS BANNER ═══ */}
      <div className="border-b-3 border-black bg-[#FFDE59] px-4 sm:px-8 py-2 text-xs font-black uppercase tracking-wider flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
          <span>// HYPERS OPERATOR DOSSIER // CLEARANCE: LEVEL 5 // PROTOCOL NOMINAL //</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/leaderboard"
            className="flex items-center gap-1.5 bg-white hover:bg-[#CCFF00] text-black border-2 border-black px-2.5 py-0.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-[11px] font-black"
          >
            <ArrowLeft size={12} strokeWidth={2.5} /> [ LEADERBOARD ]
          </Link>
          <span className="hidden md:inline bg-black text-[#CCFF00] px-2 py-0.5 text-[10px] font-black">
            STATUS: READY TO DEPLOY
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ═══ HERO OPERATOR DOSSIER SECTION ═══ */}
        <div className="relative bg-white border-4 border-black p-6 sm:p-8 lg:p-10 shadow-[8px_8px_0px_#000] overflow-hidden">
          
          {/* Top Dossier Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-black pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-black text-[#CCFF00] border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_#000]">
                OPERATOR FILE #{player.rank ? `HYP-${1000 + player.rank}` : 'HYP-1001'}
              </span>
              <span className="bg-[#00F0FF] text-black border-2 border-black px-2.5 py-1 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#000]">
                RANK #{player.rank || 1} GLOBALLY
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyProfileLink}
                className="bg-white hover:bg-[#FAF8F5] text-black border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
                title="Copy Profile URL"
              >
                {copiedLink ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copiedLink ? 'COPIED!' : 'SHARE'}</span>
              </button>

              <button
                onClick={() => setContactModalOpen(true)}
                className="bg-[#CCFF00] hover:bg-[#b8e600] text-black border-2 border-black px-4 py-1 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
              >
                <Zap size={14} strokeWidth={2.5} />
                <span>HIRE OPERATOR</span>
              </button>
            </div>
          </div>

          {/* Main Hero Identity + Stats */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
            
            {/* Identity Column */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              {/* Avatar Box */}
              <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 bg-[#FFDE59] border-4 border-black shadow-[6px_6px_0px_#000] flex items-center justify-center text-6xl">
                  {player.avatar}
                </div>
                <div
                  className="absolute -bottom-2 -right-2 bg-[#CCFF00] border-3 border-black p-1.5 shadow-[2px_2px_0px_#000] flex items-center justify-center text-black"
                  title="Verified Hypers Operator"
                >
                  <ShieldCheck size={18} strokeWidth={2.5} />
                </div>
              </div>

              {/* Bio & Details */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-black">
                    {player.name}
                  </h1>
                  <span className="bg-[#CCFF00] text-black border-2 border-black px-3 py-0.5 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#000]">
                    {player.tier}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs font-black text-black">
                  <span className="bg-[#00F0FF]/30 border-2 border-black px-2.5 py-0.5 shadow-[1px_1px_0px_#000]">
                    {player.username}
                  </span>
                  <span className="bg-[#FAF8F5] border-2 border-black px-2.5 py-0.5 shadow-[1px_1px_0px_#000] flex items-center gap-1">
                    <MapPin size={13} strokeWidth={2.5} /> San Francisco, CA
                  </span>
                  <span className="bg-[#FAF8F5] border-2 border-black px-2.5 py-0.5 shadow-[1px_1px_0px_#000] flex items-center gap-1">
                    <Building size={13} strokeWidth={2.5} /> L5 Senior Infra Engineer
                  </span>
                  <span className="bg-[#FF52D9]/30 border-2 border-black px-2.5 py-0.5 shadow-[1px_1px_0px_#000]">
                    {player.engineeringCredibility || 'Elite'} Credibility
                  </span>
                </div>

                {/* Quick Action Badges */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  {player.badges?.slice(0, 3).map((b, i) => (
                    <span
                      key={i}
                      className="bg-white border-2 border-black px-2.5 py-1 text-sm shadow-[2px_2px_0px_#000] flex items-center gap-1 font-black"
                      title={b.name}
                    >
                      <span>{b.icon}</span>
                      <span className="text-xs uppercase">{b.name}</span>
                    </span>
                  ))}
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white hover:bg-[#FFDE59] border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    <Github size={14} /> GITHUB ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
              
              {/* 4 Score Blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 w-full">
                {/* Score */}
                <div className="bg-[#FFDE59] border-3 border-black p-3 text-center shadow-[3px_3px_0px_#000]">
                  <div className="text-xl sm:text-2xl font-black text-black">{player.score.toLocaleString()}</div>
                  <div className="text-[9px] font-black text-black uppercase tracking-wider">Score</div>
                </div>

                {/* XP */}
                <div className="bg-[#00F0FF] border-3 border-black p-3 text-center shadow-[3px_3px_0px_#000]">
                  <div className="text-xl sm:text-2xl font-black text-black">
                    {player.xp ? (player.xp / 1000).toFixed(1) + 'K' : '45.2K'}
                  </div>
                  <div className="text-[9px] font-black text-black uppercase tracking-wider">XP</div>
                </div>

                {/* Reputation */}
                <div className="bg-[#CCFF00] border-3 border-black p-3 text-center shadow-[3px_3px_0px_#000]">
                  <div className="text-xl sm:text-2xl font-black text-black">+{player.reputation || 240}</div>
                  <div className="text-[9px] font-black text-black uppercase tracking-wider">Reputation</div>
                </div>

                {/* Streak */}
                <div className="bg-[#FF52D9] border-3 border-black p-3 text-center shadow-[3px_3px_0px_#000]">
                  <div className="text-xl sm:text-2xl font-black text-black flex items-center justify-center gap-0.5">
                    <Flame size={16} strokeWidth={2.5} /> {player.streak}
                  </div>
                  <div className="text-[9px] font-black text-black uppercase tracking-wider">Streak Days</div>
                </div>
              </div>

              {/* Recruiter Trust & Sourcing Gauges */}
              <div className="bg-[#FAF8F5] border-3 border-black p-3.5 shadow-[3px_3px_0px_#000] flex items-center justify-between gap-4">
                {/* Trust Score */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black text-[#CCFF00] border-2 border-black flex items-center justify-center text-sm font-black shadow-[2px_2px_0px_#000]">
                    {player.trustScore || 98}
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-black">Trust Index</div>
                    <div className="text-[9px] font-bold text-neutral-600 uppercase">Top 1% Verified</div>
                  </div>
                </div>

                <div className="w-[2px] h-8 bg-black" />

                {/* Recruiter Visibility */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#00F0FF] text-black border-2 border-black flex items-center justify-center text-sm font-black shadow-[2px_2px_0px_#000]">
                    94%
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-black">Recruiter Match</div>
                    <div className="text-[9px] font-bold text-neutral-600 uppercase">Tier-1 Sourcing</div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Problem Solving Arena Distribution Bar */}
          <div className="mt-8 pt-6 border-t-3 border-black">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs font-black uppercase text-black">
              <span className="flex items-center gap-1.5">
                <Target size={14} strokeWidth={2.5} />
                <span>ARENA PROBLEMS SOLVED: {player.solved || 892} TOTAL</span>
              </span>
              <span className="text-[10px] text-neutral-600 font-bold">
                EASY: {player.easySolved || 320} · MEDIUM: {player.mediumSolved || 410} · HARD: {player.hardSolved || 162} · BEST CONTEST RANK: #{player.bestRank || 3}
              </span>
            </div>
            
            {/* Segmented Progress Bar */}
            <div className="h-4 w-full bg-[#FAF8F5] border-2 border-black flex overflow-hidden shadow-[2px_2px_0px_#000]">
              <div
                style={{ width: `${((player.easySolved || 320) / (player.solved || 892)) * 100}%` }}
                className="bg-[#CCFF00] border-r-2 border-black h-full"
                title={`Easy: ${player.easySolved || 320}`}
              />
              <div
                style={{ width: `${((player.mediumSolved || 410) / (player.solved || 892)) * 100}%` }}
                className="bg-[#FFDE59] border-r-2 border-black h-full"
                title={`Medium: ${player.mediumSolved || 410}`}
              />
              <div
                style={{ width: `${((player.hardSolved || 162) / (player.solved || 892)) * 100}%` }}
                className="bg-[#FF0033] h-full"
                title={`Hard: ${player.hardSolved || 162}`}
              />
            </div>
            <div className="flex items-center gap-4 mt-2 text-[10px] font-black uppercase">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#CCFF00] border border-black" /> Easy</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#FFDE59] border border-black" /> Medium</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#FF0033] border border-black" /> Hard (Tier-1)</span>
            </div>
          </div>

        </div>

        {/* ═══ VERIFIED SPECIALIZATION BADGES ═══ */}
        {player.badges && player.badges.length > 0 && (
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
              <Medal size={16} strokeWidth={2.5} /> [ VERIFIED PRODUCTION COMPETENCY BADGES ]
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {player.badges.map((badge, idx) => {
                const accentColors = ['bg-[#CCFF00]', 'bg-[#00F0FF]', 'bg-[#FFDE59]', 'bg-[#FF52D9]'];
                const accentBg = accentColors[idx % accentColors.length];

                return (
                  <div
                    key={badge.id || idx}
                    className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-start gap-4"
                  >
                    <div className={`w-14 h-14 ${accentBg} border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-3xl shrink-0`}>
                      {badge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h4 className="text-sm font-black text-black uppercase tracking-tight truncate">
                          {badge.name}
                        </h4>
                        <ShieldCheck size={16} strokeWidth={2.5} className="text-black shrink-0" />
                      </div>
                      <p className="text-xs font-bold text-neutral-700 leading-relaxed">
                        {badge.desc}
                      </p>
                      <div className="mt-3 pt-2 border-t-2 border-black flex items-center justify-between text-[10px] font-black text-neutral-600 uppercase">
                        <span>CERTIFIED ARENA BADGE</span>
                        <span className="text-black font-black">TOP 1%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ AI EVALUATION TERMINAL (HYPERS PROFILER) ═══ */}
        <div className="bg-[#18181b] border-4 border-black shadow-[8px_8px_0px_#000] overflow-hidden">
          {/* Terminal Window Header Bar */}
          <div className="h-10 bg-white border-b-3 border-black px-4 flex items-center justify-between text-xs font-black uppercase tracking-wider">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF0033] border-2 border-black shadow-[1px_1px_0px_#000]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#FFDE59] border-2 border-black shadow-[1px_1px_0px_#000]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#CCFF00] border-2 border-black shadow-[1px_1px_0px_#000]" />
              </div>
              <div className="w-[2px] h-5 bg-black" />
              <span className="flex items-center gap-1.5 text-black">
                <Terminal size={14} strokeWidth={2.5} />
                <span>HYPERS // PROFILER DEEP SCAN V2.6</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-[#CCFF00] text-black border border-black px-2 py-0.5 text-[10px] font-black uppercase">
                AI VERIFIED
              </span>
              <span className="text-[10px] text-neutral-600 hidden sm:inline font-bold">
                6-DOMAIN ANALYSIS
              </span>
            </div>
          </div>

          {/* Terminal Content with Syntax Highlights */}
          <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed text-neutral-200 whitespace-pre-wrap select-text">
            {typedText.split('\n').map((line, idx) => {
              if (line.startsWith('>')) {
                return <div key={idx} className="text-[#00F0FF] font-bold">{line}</div>;
              }
              if (line.includes('[STRENGTHS')) {
                return <div key={idx} className="text-[#CCFF00] font-black mt-3 mb-1 text-sm">{line}</div>;
              }
              if (line.includes('[AREAS FOR STRATEGIC') || line.includes('[WEAKNESSES]')) {
                return <div key={idx} className="text-[#FF52D9] font-black mt-3 mb-1 text-sm">{line}</div>;
              }
              if (line.includes('[HYPERS PROTOCOL VERDICT]')) {
                return <div key={idx} className="text-[#FFDE59] font-black mt-4 mb-1 text-sm">{line}</div>;
              }
              if (line.includes('TIER 1 HIGH-MOAT OPERATOR')) {
                return (
                  <div key={idx} className="bg-[#00F0FF]/15 border-2 border-[#00F0FF] p-2.5 text-[#00F0FF] font-black my-2">
                    {line}
                  </div>
                );
              }
              return <div key={idx}>{line}</div>;
            })}
            <span className="inline-block w-2.5 h-4 bg-[#CCFF00] ml-1 animate-pulse align-middle" />
          </div>
        </div>

        {/* ═══ COMBAT METRICS & CONTRIBUTION GRIDS ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Radar & Trajectory */}
          <div className="space-y-8">
            
            {/* Combat Matrix Radar */}
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000]">
              <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
                <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2">
                  <Target size={15} strokeWidth={2.5} /> [ COMBAT RADAR MATRIX ]
                </h3>
                <span className="bg-[#FFDE59] text-black border border-black px-1.5 py-0.2 text-[9px] font-black">
                  6 AXES
                </span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={player.skills}>
                    <PolarGrid stroke="#000" strokeDasharray="2 2" strokeOpacity={0.2} />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#000', fontSize: 10, fontWeight: 900, fontFamily: 'monospace' }}
                    />
                    <Radar
                      name="Skills"
                      dataKey="score"
                      stroke="#000"
                      fill="#00F0FF"
                      fillOpacity={0.4}
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#CCFF00', stroke: '#000', strokeWidth: 2 }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 pt-3 border-t-2 border-black grid grid-cols-3 gap-2 text-center">
                {player.skills?.slice(0, 3).map((s, i) => (
                  <div key={i} className="bg-[#FAF8F5] border border-black p-1.5 shadow-[1px_1px_0px_#000]">
                    <div className="text-[9px] font-black text-neutral-600 uppercase">{s.subject}</div>
                    <div className="text-sm font-black text-black">{s.score}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Trajectory Area Chart */}
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000]">
              <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
                <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2">
                  <Trophy size={15} strokeWidth={2.5} /> [ ELO RATING TRAJECTORY ]
                </h3>
                <span className="bg-[#CCFF00] text-black border border-black px-1.5 py-0.2 text-[9px] font-black">
                  +520 PTS
                </span>
              </div>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ratingChartData}>
                    <defs>
                      <linearGradient id="brutalistArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#CCFF00" stopOpacity={0.7}/>
                        <stop offset="100%" stopColor="#CCFF00" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#000" strokeDasharray="2 2" strokeOpacity={0.15} vertical={false} />
                    <XAxis
                      dataKey="month"
                      stroke="#000"
                      tickLine={false}
                      axisLine={{ stroke: '#000', strokeWidth: 2 }}
                      fontSize={10}
                      fontFamily="monospace"
                      fontWeight={700}
                    />
                    <YAxis
                      stroke="#000"
                      tickLine={false}
                      axisLine={{ stroke: '#000', strokeWidth: 2 }}
                      fontSize={10}
                      fontFamily="monospace"
                      fontWeight={700}
                      domain={['dataMin - 100', 'dataMax + 100']}
                    />
                    <RechartsTooltip content={<BrutalistTooltip />} cursor={{ stroke: '#000', strokeWidth: 1.5 }} />
                    <Area
                      type="monotone"
                      dataKey="rating"
                      stroke="#000"
                      strokeWidth={3}
                      fill="url(#brutalistArea)"
                      dot={{ fill: '#FFDE59', stroke: '#000', r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: '#00F0FF', stroke: '#000', strokeWidth: 2.5 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 pt-2 border-t-2 border-black flex items-center justify-between text-[10px] font-black uppercase text-neutral-600">
                <span>START: 1,400 ELO</span>
                <span className="text-black font-black">PEAK: 1,920 ELO</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Heatmap + Production Projects */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 365-Day Code Contribution Matrix */}
            <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-3 mb-5">
                <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2">
                  <GitCommit size={15} strokeWidth={2.5} /> [ 365-DAY CODE COMMIT INTENSITY MATRIX ]
                </h3>
                <span className="bg-[#FAF8F5] border border-black px-2 py-0.5 text-[10px] font-black">
                  YEAR 2025-2026
                </span>
              </div>

              <Heatmap />
            </div>

            {/* Shipped Production Projects */}
            <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000]">
              <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-5">
                <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2">
                  <Briefcase size={15} strokeWidth={2.5} /> [ PRODUCTION-GRADE SHIPPED PROJECTS ]
                </h3>
                <span className="bg-[#FFDE59] text-black border border-black px-2 py-0.5 text-[10px] font-black">
                  PROOF OF WORK
                </span>
              </div>

              <div className="space-y-4">
                {mockProjects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FAF8F5] border-3 border-black p-5 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-2.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h4 className="text-base font-black text-black uppercase tracking-tight">
                          {proj.name}
                        </h4>
                        {proj.live && (
                          <span className="bg-[#CCFF00] text-black border-2 border-black text-[10px] font-black uppercase px-2 py-0.5 shadow-[1px_1px_0px_#000] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" /> LIVE DEMO
                          </span>
                        )}
                        <span className="bg-white border border-black text-[10px] font-bold text-neutral-700 px-2 py-0.5">
                          {proj.benchmark}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-neutral-700 leading-relaxed">
                        {proj.desc}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {proj.tech.map((t, i) => (
                          <span
                            key={i}
                            className="bg-white border-2 border-black px-2 py-0.5 text-[11px] font-black text-black shadow-[1px_1px_0px_#000]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center sm:flex-col items-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/20">
                      <div className="text-right">
                        <div className="text-[9px] font-black text-neutral-500 uppercase">Impact Stars</div>
                        <div className="text-lg font-black text-black flex items-center justify-end gap-1">
                          <Star size={14} className="fill-[#FFDE59] text-black" /> {proj.stars}
                        </div>
                      </div>

                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white hover:bg-[#CCFF00] border-2 border-black px-3 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1 text-black"
                      >
                        <span>VIEW REPO</span>
                        <ExternalLink size={12} strokeWidth={2.5} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ═══ HIRE OPERATOR MODAL ═══ */}
      <AnimatePresence>
        {contactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-white border-4 border-black p-6 sm:p-8 shadow-[10px_10px_0px_#000] relative font-mono"
            >
              <div className="flex items-center justify-between border-b-3 border-black pb-3 mb-5">
                <div>
                  <span className="bg-[#CCFF00] text-black border border-black px-2 py-0.5 text-[10px] font-black uppercase">
                    DIRECT RECRUITER CHANNEL
                  </span>
                  <h3 className="text-xl font-black uppercase text-black mt-1">
                    Connect with {player.name}
                  </h3>
                </div>
                <button
                  onClick={() => setContactModalOpen(false)}
                  className="w-8 h-8 bg-black text-white hover:bg-[#FF0033] border-2 border-black font-black flex items-center justify-center text-sm shadow-[2px_2px_0px_#000]"
                >
                  ✕
                </button>
              </div>

              {hireMessageSent ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-[#CCFF00] border-3 border-black mx-auto flex items-center justify-center shadow-[4px_4px_0px_#000]">
                    <CheckCircle2 size={32} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-lg font-black uppercase">Interview Request Dispatched!</h4>
                  <p className="text-xs font-bold text-neutral-600">
                    Your invitation has been routed directly to {player.username}'s priority inbox with your company credentials.
                  </p>
                  <button
                    onClick={() => {
                      setHireMessageSent(false);
                      setContactModalOpen(false);
                    }}
                    className="bg-black text-[#CCFF00] border-2 border-black px-6 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_#000]"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setHireMessageSent(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1">Company / VC Fund</label>
                    <input
                      required
                      placeholder="e.g. OpenAI, Stripe, Benchmark Capital"
                      className="w-full bg-[#FAF8F5] border-2 border-black p-2.5 text-xs font-mono font-bold focus:bg-white focus:outline-none shadow-[2px_2px_0px_#000]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1">Target Role / Opportunity</label>
                    <input
                      required
                      placeholder="e.g. Staff Distributed Systems Engineer"
                      className="w-full bg-[#FAF8F5] border-2 border-black p-2.5 text-xs font-mono font-bold focus:bg-white focus:outline-none shadow-[2px_2px_0px_#000]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1">Message / Compensation Band</label>
                    <textarea
                      rows={3}
                      placeholder="We loved your work on the Distributed Rate Limiter. We are scaling our high-throughput cluster..."
                      className="w-full bg-[#FAF8F5] border-2 border-black p-2.5 text-xs font-mono font-bold focus:bg-white focus:outline-none shadow-[2px_2px_0px_#000] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setContactModalOpen(false)}
                      className="bg-[#FAF8F5] hover:bg-neutral-200 border-2 border-black px-4 py-2 text-xs font-black uppercase shadow-[2px_2px_0px_#000]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#CCFF00] hover:bg-[#b8e600] text-black border-2 border-black px-5 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_#000] flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                    >
                      <Zap size={14} strokeWidth={2.5} /> Send Interview Request
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
