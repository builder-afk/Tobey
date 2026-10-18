import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Rocket, Brain, CheckCircle2, ChevronRight, ChevronLeft,
  Briefcase, Target, Zap, ArrowRight, FileText, Globe, MapPin,
  Building2, DollarSign, Search, Settings, ShieldCheck, Flame,
  Scale, Terminal, AlertTriangle, Code2, Cpu, Trophy, Clock,
  Sparkles, Check, Copy, ExternalLink, RefreshCw, Layers, Users
} from 'lucide-react';
import { 
  campaignRoles, departments,
  fundingStages, workModes, allSkills 
} from '../data/recruitingData';

// Recommended high-stakes engineering standards
const standardEngineeringChecklist = [
  'Zero tolerance for unhandled exceptions or silent error suppression',
  'Writes comprehensive unit, integration, and benchmark tests before shipping',
  'Deep understanding of async I/O, event loops, and concurrency race conditions',
  'Demonstrated capability to profile memory and CPU under synthetic load',
  'Strict adherence to semantic git commit hygiene and clean PR diffs'
];

// Arena evaluation tracks
const arenaChallengeTracks = [
  {
    id: 'track-systems',
    title: 'Track 1: Sub-Millisecond Async Systems & Memory (Rust / C++)',
    desc: 'Candidate must optimize a high-throughput network proxy to achieve <1ms P99 latency with zero memory leaks.',
    tier: 'HARDCORE SYSTEMS'
  },
  {
    id: 'track-distributed',
    title: 'Track 2: Distributed State & Database Deadlock Resolution (Go / SQL)',
    desc: 'Candidate must diagnose and resolve distributed locking contention across sharded databases under 50k QPS.',
    tier: 'DISTRIBUTED INFRA'
  },
  {
    id: 'track-ai-runtimes',
    title: 'Track 3: Multi-Agent Tool-Call & Hallucination Guard (Python / AI)',
    desc: 'Candidate must build a deterministic circuit breaker preventing recursive LLM tool-calling drift.',
    tier: 'AGENTIC AI'
  },
  {
    id: 'track-fullstack',
    title: 'Track 4: High-Concurrency WebSocket & Client State (TypeScript / React)',
    desc: 'Candidate must implement optimistic multi-user canvas synchronization with sub-16ms frame budgets.',
    tier: 'FULL-STACK HACKER'
  }
];

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Form State
  const [formData, setFormData] = useState({
    title: 'Founding Backend Engineer',
    customTitle: '',
    seniority: 'Founding Engineer (Staff/Principal)',
    department: 'Engineering',
    startupName: 'HyperScale Systems',
    startupPitch: 'Low-latency distributed state machines for autonomous AI agents.',
    fundingStage: 'Seed',
    location: 'San Francisco, CA',
    workMode: 'Remote',
    compensation: '$150,000 - $190,000',
    currency: 'USD ($)',
    equity: '1.0% - 2.5%',
    vesting: '4-Year Standard (1-Year Cliff)',
    urgency: 'Immediate (Within 14 Days)',
    
    // Step 2: Job Specs
    description: 'We are seeking a Founding Backend Engineer to architect, build, and scale our core high-throughput execution runtime from ground zero. You will own the distributed message queue, sub-millisecond API proxy, and database indexing pipeline.',
    bottleneckToSolve: 'Eliminating 400ms tail latency spikes and preventing database race-conditions during 50,000 concurrent tool-call sessions.',
    milestone30: 'Audit existing bottlenecks, ship V1 high-speed parsing proxy, and establish baseline benchmark CI test suite.',
    milestone60: 'Reduce P99 latency to sub-35ms under simulated load and eliminate all VRAM / heap memory leaks.',
    milestone90: 'Deploy resilient multi-region failover cluster, complete SOC2 Type 1 audit telemetry, and onboard first 20 enterprise clients.',
    techStack: ['Rust', 'Go', 'Python', 'ClickHouse', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'eBPF'],
    responsibilities: [
      'Architect and build the core distributed backend infrastructure with zero single points of failure.',
      'Design low-overhead eBPF and gRPC data collection probes for streaming telemetry.',
      'Benchmark and optimize memory allocations, garbage collection pauses, and network I/O.',
      'Participate directly in customer technical triage and establish engineering cultural standards.'
    ],
    selectedStandards: standardEngineeringChecklist.slice(0, 3),

    // Step 3: Hiring Preferences & Quality Gates
    experienceRequired: '3-5 years',
    contestRatingThreshold: 1600,
    githubActivityThreshold: 400,
    startupExpRequired: true,
    openSourceRequired: true,
    workTrialAgreed: true,
    evaluationTrack: 'track-systems',
    referralBounty: '$2,500 USD'
  });

  const [aiScores, setAiScores] = useState(null);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [customSkillInput, setCustomSkillInput] = useState('');

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Terminal Simulation during AI Processing Step
  useEffect(() => {
    if (step === 4) {
      setTerminalLogs([]);
      const logs = [
        '[0.4s] > INITIALIZING HYPERS TALENT HARNESS PROTOCOL...',
        '[1.1s] > PARSING ROLE SPECIFICATIONS & ARCHITECTURAL REQUIREMENTS...',
        `[1.8s] > EVALUATING TECH STACK COHERENCE: [${formData.techStack.slice(0, 4).join(', ')}]`,
        `[2.5s] > CALIBRATING ARENA CONTEST GATE: ${formData.contestRatingThreshold}+ RATING (TOP 6.2% OPERATORS)`,
        `[3.1s] > BENCHMARKING COMPENSATION: ${formData.compensation} ${formData.currency} (COMPETITIVE 88TH PERCENTILE)`,
        '[3.7s] > CONFIGURING ADAPTIVE CODING SANDBOX: [SUB-MS SYSTEMS EVALUATION]',
        '[4.2s] > VERIFYING 48-HOUR PAID WORK-TRIAL PROTOCOL: COMPLIANT',
        '[4.8s] > SYNTHESIZING HIRING CAMPAIGN DOSSIER // COMPILATION COMPLETE.'
      ];

      logs.forEach((log, i) => {
        setTimeout(() => {
          setTerminalLogs(prev => [...prev, log]);
        }, i * 600);
      });

      const timer = setTimeout(() => {
        setAiScores({
          roleComplexity: 'Grandmaster / S-Tier',
          hiringDifficulty: 88,
          matchedCandidates: 48,
          estimatedVelocity: '14 - 21 Days to Offer',
          talentPoolRatio: 'Top 4.8% of Arena Operators',
          salaryCompetitiveness: 'Strong (88th Percentile)'
        });
        setStep(5);
      }, 5400);

      return () => clearTimeout(timer);
    }
  }, [step]);

  const updateForm = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const toggleArrayItem = (key, item) => {
    setFormData(prev => {
      const arr = prev[key];
      if (arr.includes(item)) return { ...prev, [key]: arr.filter(i => i !== item) };
      return { ...prev, [key]: [...arr, item] };
    });
  };

  const addCustomSkill = (e) => {
    e?.preventDefault();
    if (!customSkillInput.trim()) return;
    const clean = customSkillInput.trim();
    if (!formData.techStack.includes(clean)) {
      setFormData(prev => ({ ...prev, techStack: [...prev.techStack, clean] }));
    }
    setCustomSkillInput('');
  };

  const handleLaunch = () => {
    try {
      const newCampaign = {
        id: `camp_${Date.now()}`,
        title: formData.customTitle || formData.title,
        department: formData.department,
        startupName: formData.startupName,
        startupStage: formData.fundingStage,
        fundingStage: formData.fundingStage,
        location: formData.location,
        workMode: formData.workMode,
        compensation: `${formData.compensation} ${formData.currency}`,
        equity: formData.equity,
        experienceRequired: formData.experienceRequired,
        description: formData.description,
        responsibilities: formData.responsibilities,
        requirements: formData.selectedStandards,
        techStack: formData.techStack,
        contestRatingThreshold: formData.contestRatingThreshold,
        githubActivityThreshold: formData.githubActivityThreshold,
        roleComplexityScore: aiScores?.roleComplexity || 'Senior',
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        applicationsCount: 18,
        qualifiedCount: 7,
        strongMatchCount: 4,
        interviewReadyCount: 2,
        offerReadyCount: 0
      };

      const existing = localStorage.getItem('hypers_custom_campaigns');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newCampaign);
      localStorage.setItem('hypers_custom_campaigns', JSON.stringify(list));
    } catch (err) {
      console.error(err);
    }
    navigate('/pitch?tab=recruiting-campaign');
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
          <span className="flex items-center gap-1.5"><span className="text-[#FF5722]">⚡</span> [ HYPERS TALENT ENGINE // HIGH-STAKES HIRING CAMPAIGN COMPILER ]</span>
          <span>//</span>
          <span>PROTOCOL: ZERO UNVETTED RESUMES ALLOWED</span>
          <span>//</span>
          <span>LIVE ARENA CODE HARDENING: ACTIVE</span>
          <span>//</span>
          <span>CONTEST POOL: 24,850+ VERIFIED OPERATORS</span>
          <span>//</span>
          <span className="bg-black text-[#00F0FF] px-2 py-0.5 border border-black font-black">STRICT PROOF-OF-WORK GATING</span>
          <span>//</span>
          <span className="flex items-center gap-1.5"><span className="text-[#FF5722]">⚡</span> [ HYPERS TALENT ENGINE // HIGH-STAKES HIRING CAMPAIGN COMPILER ]</span>
        </div>
      </div>

      {/* ── Main Work Area ── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        
        {/* ═══ 1. HEADER HERO ═══ */}
        <div className="mb-8 border-4 border-black bg-white shadow-[8px_8px_0px_#000] p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
                <Zap size={14} className="stroke-[3]" />
                <span>[ PROTOCOL // HIGH-STAKES TALENT DEPLOYMENT ]</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black leading-none">
                ARCHITECT YOUR HIRING CAMPAIGN. <br />
                <span className="bg-[#CCFF00] px-2 py-0.5 inline-block mt-1 border-2 border-black shadow-[3px_3px_0px_#000]">
                  DEPLOY TO THE ARENA.
                </span>
              </h1>
              <p className="text-xs sm:text-sm font-bold text-gray-700 uppercase max-w-2xl leading-relaxed">
                // TRADITIONAL JOB POSTS ATTRACT 500 AI-GENERATED SPAM RESUMES. HYPERS HIRING CAMPAIGNS ENFORCE DETERMINISTIC PROOF-OF-WORK, CONTEST RATING GATES, AND LIVE CODING SANDBOXES BEFORE APPLICANTS REACH YOUR PIPELINE.
              </p>
            </div>

            {/* Quick Stats Pill Stack */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              <div className="p-3 bg-[#FAF8F5] border-2 border-black shadow-[2px_2px_0px_#000]">
                <span className="text-[9px] font-black uppercase text-gray-500 block">// OPERATOR POOL</span>
                <span className="text-base font-black text-black">24,850+ ACTIVE</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] border-2 border-black shadow-[2px_2px_0px_#000]">
                <span className="text-[9px] font-black uppercase text-gray-500 block">// EVAL RUNTIME</span>
                <span className="text-base font-black text-[#00F0FF]">SUB-MS RUST</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] border-2 border-black shadow-[2px_2px_0px_#000]">
                <span className="text-[9px] font-black uppercase text-gray-500 block">// QUALITY BAR</span>
                <span className="text-base font-black text-[#FF0033]">TOP 5% ONLY</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] border-2 border-black shadow-[2px_2px_0px_#000]">
                <span className="text-[9px] font-black uppercase text-gray-500 block">// CONVERSION</span>
                <span className="text-base font-black text-emerald-700">94% OFFER</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ 2. STEP PROGRESSION MATRIX ═══ */}
        {step < 4 && (
          <div className="mb-8 border-3 border-black bg-white p-3 shadow-[4px_4px_0px_#000]">
            <div className="grid grid-cols-3 gap-2">
              {[
                { s: 1, label: '01 // ROLE & STARTUP PROTOCOL' },
                { s: 2, label: '02 // TECH ARSENAL & 30-60-90' },
                { s: 3, label: '03 // PROOF-OF-WORK GATES' }
              ].map(item => (
                <div 
                  key={item.s}
                  onClick={() => item.s < step && setStep(item.s)}
                  className={`p-2.5 border-2 border-black text-center text-xs font-black uppercase transition-all ${
                    step === item.s 
                      ? 'bg-[#FFDE59] text-black shadow-[2px_2px_0px_#000] translate-x-0.5' 
                      : item.s < step 
                        ? 'bg-[#CCFF00] text-black cursor-pointer hover:bg-[#b8e600]' 
                        : 'bg-[#FAF8F5] text-gray-400'
                  }`}
                >
                  <div className="truncate">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ 3. FORM WORKBENCH ═══ */}
        <AnimatePresence mode="wait">
          
          {/* ────── STEP 1: ROLE & STARTUP PROTOCOL ────── */}
          {step === 1 && (
            <motion.div
              key="step1" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border-4 border-black p-6 sm:p-10 shadow-[10px_10px_0px_#000] space-y-8"
            >
              {/* Window Bar Header */}
              <div className="flex items-center justify-between pb-4 border-b-3 border-black">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#FF0033] border border-black" />
                  <div className="w-3 h-3 bg-[#FFDE59] border border-black" />
                  <div className="w-3 h-3 bg-[#CCFF00] border border-black" />
                  <span className="ml-2 text-xs font-black uppercase text-black tracking-wider">
                    [ CONFIGURING STEP 01 // ROLE PROFILE & COMPANY RAILS ]
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-[#FFDE59] border border-black text-[10px] font-black uppercase">
                  REQUIRED SPEC
                </span>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Role Title with Fast Suggestions */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase text-black flex items-center justify-between">
                    <span>ROLE TITLE // TECHNICAL CALLSIGN *</span>
                    <span className="text-[10px] text-gray-500 font-bold">// SELECT OR ENTER CUSTOM</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select 
                      value={formData.title} 
                      onChange={(e) => updateForm('title', e.target.value)}
                      className="p-3.5 bg-[#FAF8F5] border-2 border-black text-xs font-black uppercase focus:bg-[#FFDE59]/10 focus:outline-none shadow-[2px_2px_0px_#000]"
                    >
                      {campaignRoles.map(r => <option key={r} value={r}>{r}</option>)}
                      <option value="Custom">Custom Role Title...</option>
                    </select>
                    {formData.title === 'Custom' ? (
                      <input 
                        type="text" 
                        value={formData.customTitle} 
                        onChange={(e) => updateForm('customTitle', e.target.value)} 
                        placeholder="e.g. Low-Level Rust Kernel Architect" 
                        className="p-3.5 bg-white border-2 border-black text-xs font-black uppercase focus:bg-[#FFDE59]/10 focus:outline-none shadow-[2px_2px_0px_#000]" 
                      />
                    ) : (
                      <div className="flex items-center px-3.5 bg-[#FAF8F5] border-2 border-dashed border-black text-[11px] font-bold text-gray-600 uppercase">
                        // SELECTED: {formData.title}
                      </div>
                    )}
                  </div>
                </div>

                {/* Seniority Track */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-black block">
                    SENIORITY TRACK & VELOCITY *
                  </label>
                  <select 
                    value={formData.seniority} 
                    onChange={(e) => updateForm('seniority', e.target.value)}
                    className="w-full p-3.5 bg-[#FAF8F5] border-2 border-black text-xs font-black uppercase focus:bg-[#FFDE59]/10 focus:outline-none shadow-[2px_2px_0px_#000]"
                  >
                    <option value="Founding Engineer (Staff/Principal)">Founding Engineer (Staff/Principal Level)</option>
                    <option value="Lead Systems Architect">Lead Systems Architect (0-to-1 Velocity)</option>
                    <option value="Mid-Level High-Velocity Builder">Mid-Level High-Velocity Builder</option>
                    <option value="Technical Co-Founder">Technical Co-Founder (50/50 Partner)</option>
                  </select>
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-black block">
                    DEPARTMENT / ARENA VERTICAL *
                  </label>
                  <select 
                    value={formData.department} 
                    onChange={(e) => updateForm('department', e.target.value)}
                    className="w-full p-3.5 bg-[#FAF8F5] border-2 border-black text-xs font-black uppercase focus:bg-[#FFDE59]/10 focus:outline-none shadow-[2px_2px_0px_#000]"
                  >
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                {/* Startup Name */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-black block">
                    STARTUP / COMPANY NAME *
                  </label>
                  <input 
                    type="text" 
                    value={formData.startupName} 
                    onChange={(e) => updateForm('startupName', e.target.value)} 
                    placeholder="e.g. HyperScale Labs" 
                    className="w-full p-3.5 bg-[#FAF8F5] border-2 border-black text-xs font-black uppercase focus:bg-[#FFDE59]/10 focus:outline-none shadow-[2px_2px_0px_#000]" 
                  />
                </div>

                {/* Funding Stage */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-black block">
                    FUNDING STAGE & CAPITAL BACKING *
                  </label>
                  <select 
                    value={formData.fundingStage} 
                    onChange={(e) => updateForm('fundingStage', e.target.value)}
                    className="w-full p-3.5 bg-[#FAF8F5] border-2 border-black text-xs font-black uppercase focus:bg-[#FFDE59]/10 focus:outline-none shadow-[2px_2px_0px_#000]"
                  >
                    {fundingStages.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Company Elevator Pitch / Problem */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase text-black block">
                    STARTUP MISSION & HIGH-MOAT WEDGE (WHAT BLEEDING-NECK PROBLEM ARE YOU KILLING?) *
                  </label>
                  <input 
                    type="text" 
                    value={formData.startupPitch} 
                    onChange={(e) => updateForm('startupPitch', e.target.value)} 
                    placeholder="e.g. Sub-millisecond eBPF telemetry for autonomous multi-agent LLM runtimes." 
                    className="w-full p-3.5 bg-[#FAF8F5] border-2 border-black text-xs font-bold focus:bg-[#FFDE59]/10 focus:outline-none shadow-[2px_2px_0px_#000]" 
                  />
                </div>

                {/* Location & Timezone */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-black block">
                    LOCATION / PRIMARY OPERATING TIMEZONE *
                  </label>
                  <input 
                    type="text" 
                    value={formData.location} 
                    onChange={(e) => updateForm('location', e.target.value)} 
                    placeholder="e.g. San Francisco, CA or Global Remote" 
                    className="w-full p-3.5 bg-[#FAF8F5] border-2 border-black text-xs font-black uppercase focus:bg-[#FFDE59]/10 focus:outline-none shadow-[2px_2px_0px_#000]" 
                  />
                </div>

                {/* Work Mode */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-black block">
                    WORK CADENCE & MODE *
                  </label>
                  <select 
                    value={formData.workMode} 
                    onChange={(e) => updateForm('workMode', e.target.value)}
                    className="w-full p-3.5 bg-[#FAF8F5] border-2 border-black text-xs font-black uppercase focus:bg-[#FFDE59]/10 focus:outline-none shadow-[2px_2px_0px_#000]"
                  >
                    <option value="Remote">Remote-First (Async Protocol)</option>
                    <option value="Hybrid">Hybrid (2-3 Days in HQ Hub)</option>
                    <option value="Onsite">Hardcore Onsite (Founding Bunker)</option>
                  </select>
                </div>

                {/* Compensation Package Matrix */}
                <div className="md:col-span-2 p-4 bg-[#FAF8F5] border-3 border-black space-y-4">
                  <div className="text-xs font-black uppercase text-black flex items-center gap-2">
                    <DollarSign size={14} className="text-emerald-700" />
                    <span>COMPENSATION & INCENTIVE PACKAGE (NO UNPAID SWEATSHOPS)</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-500 block mb-1">
                        BASE COMPENSATION RANGE
                      </label>
                      <input 
                        type="text" 
                        value={formData.compensation} 
                        onChange={(e) => updateForm('compensation', e.target.value)} 
                        placeholder="e.g. $140,000 - $190,000" 
                        className="w-full p-3 bg-white border-2 border-black text-xs font-black focus:outline-none" 
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-500 block mb-1">
                        CURRENCY STANDARD
                      </label>
                      <select 
                        value={formData.currency} 
                        onChange={(e) => updateForm('currency', e.target.value)}
                        className="w-full p-3 bg-white border-2 border-black text-xs font-black focus:outline-none cursor-pointer"
                      >
                        <option value="USD ($)">USD ($ United States Dollar)</option>
                        <option value="EUR (€)">EUR (€ Eurozone)</option>
                        <option value="GBP (£)">GBP (£ British Pound)</option>
                        <option value="AUD ($)">AUD ($ Australian Dollar)</option>
                        <option value="INR (₹)">INR (₹ Indian Rupee)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-500 block mb-1">
                        EQUITY / TOKEN POOL GRANT
                      </label>
                      <input 
                        type="text" 
                        value={formData.equity} 
                        onChange={(e) => updateForm('equity', e.target.value)} 
                        placeholder="e.g. 1.0% - 2.5% Equity" 
                        className="w-full p-3 bg-white border-2 border-black text-xs font-black focus:outline-none" 
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Form Actions */}
              <div className="flex justify-end pt-4 border-t-3 border-black">
                <button 
                  onClick={nextStep}
                  disabled={!formData.startupName || !formData.location}
                  className="flex items-center gap-2 px-8 py-3.5 bg-black hover:bg-neutral-800 text-[#FFDE59] border-2 border-black text-xs font-black uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>NEXT: TECHNICAL ARSENAL & 30-60-90 DAYS</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ────── STEP 2: TECHNICAL ARSENAL & MILESTONES ────── */}
          {step === 2 && (
            <motion.div
              key="step2" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border-4 border-black p-6 sm:p-10 shadow-[10px_10px_0px_#000] space-y-8"
            >
              {/* Window Bar Header */}
              <div className="flex items-center justify-between pb-4 border-b-3 border-black">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#FF0033] border border-black" />
                  <div className="w-3 h-3 bg-[#FFDE59] border border-black" />
                  <div className="w-3 h-3 bg-[#CCFF00] border border-black" />
                  <span className="ml-2 text-xs font-black uppercase text-black tracking-wider">
                    [ CONFIGURING STEP 02 // TECHNICAL ARSENAL & 30/60/90 MILESTONES ]
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-[#CCFF00] border border-black text-[10px] font-black uppercase">
                  EXECUTION FOCUS
                </span>
              </div>

              <div className="space-y-6">
                
                {/* Role Mission Statement */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-black block">
                    ROLE MISSION STATEMENT // ARCHITECTURAL RESPONSIBILITY *
                  </label>
                  <textarea 
                    rows="3" 
                    value={formData.description} 
                    onChange={(e) => updateForm('description', e.target.value)} 
                    className="w-full p-4 bg-[#FAF8F5] border-2 border-black text-xs font-bold focus:bg-[#FFDE59]/10 focus:outline-none shadow-[2px_2px_0px_#000] resize-none" 
                  />
                </div>

                {/* Specific Bottleneck to Break */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-black block flex items-center gap-1.5">
                    <Flame size={14} className="text-[#FF0033]" />
                    <span>THE BLEEDING-NECK BOTTLENECK THIS HIRE MUST KILL *</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.bottleneckToSolve} 
                    onChange={(e) => updateForm('bottleneckToSolve', e.target.value)} 
                    placeholder="e.g. Reducing P99 tail latency under 50k QPS and stopping memory leaks" 
                    className="w-full p-3.5 bg-[#FAF8F5] border-2 border-black text-xs font-bold focus:bg-[#FFDE59]/10 focus:outline-none shadow-[2px_2px_0px_#000]" 
                  />
                </div>

                {/* 30 / 60 / 90 Day Measurable Execution Milestones */}
                <div className="p-5 bg-[#FAF8F5] border-3 border-black space-y-4">
                  <div className="text-xs font-black uppercase text-black flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Target size={14} className="text-[#00F0FF]" />
                      <span>30 / 60 / 90 DAY MEASURABLE EXECUTION MILESTONES</span>
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold">// NO VAGUE PROMISES</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="w-24 px-2 py-1 bg-black text-[#FFDE59] font-black text-center border border-black uppercase text-[10px] shrink-0">
                        DAY 30:
                      </span>
                      <input 
                        type="text" 
                        value={formData.milestone30} 
                        onChange={(e) => updateForm('milestone30', e.target.value)} 
                        className="flex-1 p-2.5 bg-white border-2 border-black font-bold focus:outline-none" 
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="w-24 px-2 py-1 bg-black text-[#00F0FF] font-black text-center border border-black uppercase text-[10px] shrink-0">
                        DAY 60:
                      </span>
                      <input 
                        type="text" 
                        value={formData.milestone60} 
                        onChange={(e) => updateForm('milestone60', e.target.value)} 
                        className="flex-1 p-2.5 bg-white border-2 border-black font-bold focus:outline-none" 
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="w-24 px-2 py-1 bg-black text-[#CCFF00] font-black text-center border border-black uppercase text-[10px] shrink-0">
                        DAY 90:
                      </span>
                      <input 
                        type="text" 
                        value={formData.milestone90} 
                        onChange={(e) => updateForm('milestone90', e.target.value)} 
                        className="flex-1 p-2.5 bg-white border-2 border-black font-bold focus:outline-none" 
                      />
                    </div>
                  </div>
                </div>

                {/* Core Tech Stack Selector */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-xs font-black uppercase text-black block">
                      CORE ARCHITECTURAL STACK // CHOOSE KEY TECHNOLOGIES ({formData.techStack.length} SELECTED) *
                    </label>
                    <span className="text-[10px] text-gray-500 font-bold">// CLICK TO TOGGLE</span>
                  </div>

                  {/* Primary Chips */}
                  <div className="flex flex-wrap gap-2 p-4 bg-[#FAF8F5] border-2 border-black max-h-48 overflow-y-auto">
                    {[
                      'Rust', 'Go', 'Python', 'TypeScript', 'C++', 'CUDA', 'Zig',
                      'ClickHouse', 'PostgreSQL', 'Redis', 'Kafka', 'RocksDB', 'Vector DBs',
                      'Docker', 'Kubernetes', 'eBPF', 'AWS', 'GCP', 'Fly.io', 'Terraform',
                      'PyTorch', 'vLLM', 'TensorRT', 'LangChain', 'FastAPI', 'React', 'Next.js'
                    ].map(skill => {
                      const isSelected = formData.techStack.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleArrayItem('techStack', skill)}
                          className={`px-3 py-1.5 border-2 border-black text-xs font-black uppercase transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-black text-[#FFDE59] shadow-[2px_2px_0px_#000] -translate-y-0.5' 
                              : 'bg-white text-gray-800 hover:bg-[#FAF8F5]'
                          }`}
                        >
                          <span>{skill}</span>
                          {isSelected && <span className="ml-1 text-[#CCFF00]">✓</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Add Custom Tech Tag */}
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={customSkillInput} 
                      onChange={(e) => setCustomSkillInput(e.target.value)} 
                      placeholder="Add custom tech tag (e.g. Slurm, WebAssembly, Triton)..." 
                      className="flex-1 p-2.5 bg-white border-2 border-black text-xs font-bold focus:outline-none" 
                      onKeyDown={(e) => e.key === 'Enter' && addCustomSkill(e)}
                    />
                    <button 
                      type="button" 
                      onClick={addCustomSkill}
                      className="px-4 py-2.5 bg-black text-white hover:bg-neutral-800 border-2 border-black text-xs font-black uppercase cursor-pointer"
                    >
                      + ADD TAG
                    </button>
                  </div>
                </div>

                {/* Non-Negotiable Engineering Standards */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-black block">
                    NON-NEGOTIABLE ENGINEERING STANDARDS // CULTURE CONTRACT
                  </label>
                  <div className="space-y-2 p-4 bg-[#FAF8F5] border-2 border-black">
                    {standardEngineeringChecklist.map((std, idx) => {
                      const isChecked = formData.selectedStandards.includes(std);
                      return (
                        <label 
                          key={idx} 
                          className="flex items-start gap-3 p-2 bg-white border border-black cursor-pointer hover:bg-[#FFDE59]/10 transition-colors"
                        >
                          <input 
                            type="checkbox" 
                            checked={isChecked} 
                            onChange={() => toggleArrayItem('selectedStandards', std)}
                            className="w-4 h-4 mt-0.5 accent-black cursor-pointer"
                          />
                          <span className="text-xs font-bold text-gray-900 uppercase leading-snug">
                            {std}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Step Actions */}
              <div className="flex justify-between items-center pt-4 border-t-3 border-black">
                <button 
                  onClick={prevStep} 
                  className="px-6 py-3 bg-white text-black hover:bg-neutral-100 border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronLeft size={16} />
                  <span>BACK</span>
                </button>
                <button 
                  onClick={nextStep}
                  disabled={formData.techStack.length === 0}
                  className="flex items-center gap-2 px-8 py-3.5 bg-black hover:bg-neutral-800 text-[#FFDE59] border-2 border-black text-xs font-black uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>NEXT: PROOF-OF-WORK & QUALITY GATES</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ────── STEP 3: PROOF-OF-WORK GATES ────── */}
          {step === 3 && (
            <motion.div
              key="step3" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border-4 border-black p-6 sm:p-10 shadow-[10px_10px_0px_#000] space-y-8"
            >
              {/* Window Bar Header */}
              <div className="flex items-center justify-between pb-4 border-b-3 border-black">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#FF0033] border border-black" />
                  <div className="w-3 h-3 bg-[#FFDE59] border border-black" />
                  <div className="w-3 h-3 bg-[#CCFF00] border border-black" />
                  <span className="ml-2 text-xs font-black uppercase text-black tracking-wider">
                    [ CONFIGURING STEP 03 // STRICT PROOF-OF-WORK & CODE QUALITY GATES ]
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-[#FF0033] text-white border border-black text-[10px] font-black uppercase">
                  ANTI-RESUME GATES
                </span>
              </div>

              <div className="space-y-8">
                
                {/* Arena Contest Rating Threshold Slider */}
                <div className="p-5 bg-[#FAF8F5] border-3 border-black space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                        <Trophy size={14} className="text-[#FF8811]" />
                        <span>MINIMUM ARENA CODING CONTEST RATING GATE</span>
                      </span>
                      <span className="text-[10px] text-gray-500 font-bold block mt-0.5">
                        // CANDIDATES BELOW THIS LIVE SCORE ARE AUTOMATICALLY FILTERED OUT
                      </span>
                    </div>
                    <span className="text-lg font-black bg-black text-[#FFDE59] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
                      {formData.contestRatingThreshold}+ ELO
                    </span>
                  </div>

                  <input 
                    type="range" 
                    min="1200" 
                    max="2200" 
                    step="100" 
                    value={formData.contestRatingThreshold} 
                    onChange={(e) => updateForm('contestRatingThreshold', parseInt(e.target.value))}
                    className="w-full accent-black cursor-pointer h-3 bg-white border border-black"
                  />

                  <div className="flex justify-between text-[10px] font-black uppercase text-gray-500">
                    <span>1200+ (PROFICIENT OPERATOR)</span>
                    <span className="text-[#FF8811]">1600+ (ARENA COMPETITIVE)</span>
                    <span className="text-[#FF0033]">2000+ (GRANDMASTER TIER)</span>
                  </div>
                </div>

                {/* Hard Gate Checkboxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-start gap-3 p-4 bg-[#FAF8F5] border-2 border-black cursor-pointer hover:bg-[#FFDE59]/10 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={formData.startupExpRequired} 
                      onChange={(e) => updateForm('startupExpRequired', e.target.checked)} 
                      className="w-5 h-5 mt-0.5 accent-black cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-black uppercase text-black block">
                        REQUIRE 0-TO-1 STARTUP EXPERIENCE
                      </span>
                      <span className="text-[10px] font-bold text-gray-600 block mt-1 leading-snug">
                        Candidate has shipped at seed/pre-seed stage and can operate with extreme ambiguity.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 bg-[#FAF8F5] border-2 border-black cursor-pointer hover:bg-[#FFDE59]/10 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={formData.openSourceRequired} 
                      onChange={(e) => updateForm('openSourceRequired', e.target.checked)} 
                      className="w-5 h-5 mt-0.5 accent-black cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-black uppercase text-black block">
                        REQUIRE PUBLIC OPEN-SOURCE PRs
                      </span>
                      <span className="text-[10px] font-bold text-gray-600 block mt-1 leading-snug">
                        Must possess verified GitHub pull requests, commits, or maintainer status in public repos.
                      </span>
                    </div>
                  </label>

                  <label className="sm:col-span-2 flex items-start gap-3 p-4 bg-[#CCFF00]/20 border-2 border-black cursor-pointer hover:bg-[#CCFF00]/30 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={formData.workTrialAgreed} 
                      onChange={(e) => updateForm('workTrialAgreed', e.target.checked)} 
                      className="w-5 h-5 mt-0.5 accent-black cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-black uppercase text-black block flex items-center gap-2">
                        <span>MANDATORY 48-HOUR PAID WORK TRIAL AGREEMENT</span>
                        <span className="px-1.5 py-0.2 bg-black text-[#CCFF00] text-[9px] font-black">HIGH CONVICTION</span>
                      </span>
                      <span className="text-[10px] font-bold text-gray-700 block mt-1 leading-snug">
                        Finalist candidates complete a 2-day paid engineering sprint before offer release. Eliminates 100% of resume-padding and interview performance theater.
                      </span>
                    </div>
                  </label>
                </div>

                {/* Arena Challenge Track Selector */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-black block flex items-center justify-between">
                    <span>SELECT LIVE ARENA EVALUATION SANDBOX *</span>
                    <span className="text-[10px] text-gray-500 font-bold">// CANDIDATES MUST PASS THIS TRACK</span>
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {arenaChallengeTracks.map(track => {
                      const isSelected = formData.evaluationTrack === track.id;
                      return (
                        <div
                          key={track.id}
                          onClick={() => updateForm('evaluationTrack', track.id)}
                          className={`p-4 border-2 border-black cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected 
                              ? 'bg-[#FFDE59] shadow-[3px_3px_0px_#000] translate-x-0.5' 
                              : 'bg-[#FAF8F5] hover:bg-white'
                          }`}
                        >
                          <div>
                            <span className="text-[9px] font-black px-1.5 py-0.5 bg-black text-white uppercase inline-block mb-1.5">
                              {track.tier}
                            </span>
                            <h4 className="text-xs font-black uppercase text-black leading-snug mb-1">
                              {track.title}
                            </h4>
                            <p className="text-[11px] font-bold text-gray-700 leading-snug">
                              {track.desc}
                            </p>
                          </div>
                          <div className="mt-3 text-[10px] font-black uppercase text-black flex items-center gap-1">
                            {isSelected ? '✓ ACTIVE EVALUATION SANDBOX' : 'CLICK TO SELECT'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Talent Referral Bounty Incentive */}
                <div className="p-4 bg-[#FAF8F5] border-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-black uppercase text-black block">
                      COMMUNITY TALENT SCOUT REFERRAL BOUNTY
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 block">
                      // AWARDED TO ANY ARENA OPERATOR WHO REFERS THE WINNING HIRE
                    </span>
                  </div>
                  <input 
                    type="text" 
                    value={formData.referralBounty} 
                    onChange={(e) => updateForm('referralBounty', e.target.value)} 
                    placeholder="e.g. $2,500 USD" 
                    className="w-48 p-2.5 bg-white border-2 border-black text-xs font-black text-emerald-800 focus:outline-none" 
                  />
                </div>

              </div>

              {/* Step Actions */}
              <div className="flex justify-between items-center pt-4 border-t-3 border-black">
                <button 
                  onClick={prevStep} 
                  className="px-6 py-3 bg-white text-black hover:bg-neutral-100 border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronLeft size={16} />
                  <span>BACK</span>
                </button>
                <button 
                  onClick={nextStep}
                  className="flex items-center gap-2 px-8 py-3.5 bg-black hover:bg-neutral-800 text-[#00F0FF] border-2 border-black text-xs font-black uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <Brain size={16} />
                  <span>COMPILE & CALIBRATE WITH AI HARNESS</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ────── STEP 4: AI SCANNER & TELEMETRY TERMINAL ────── */}
          {step === 4 && (
            <motion.div
              key="step4" 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 1.02 }}
              className="bg-black border-4 border-black p-6 sm:p-10 shadow-[10px_10px_0px_#000] space-y-6 text-[#00F0FF]"
            >
              {/* Terminal Window Bar */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#FF0033] border border-black" />
                  <div className="w-3 h-3 bg-[#FFDE59] border border-black" />
                  <div className="w-3 h-3 bg-[#CCFF00] border border-black" />
                  <span className="ml-2 text-xs font-black uppercase text-white tracking-widest">
                    TERMINAL // HYPERS CAMPAIGN CALIBRATION ENGINE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#00F0FF] rounded-full animate-ping" />
                  <span className="text-[10px] font-black uppercase text-white">SCANNING ARENA</span>
                </div>
              </div>

              {/* Console Output Screen */}
              <div className="bg-neutral-950 border-2 border-neutral-800 p-6 space-y-3 font-mono min-h-[280px]">
                <div className="text-xs text-neutral-400">
                  HYPERS ROLE PROTOCOL COMPILER v2.5.0 // TARGET: [{formData.title}]
                </div>

                <div className="space-y-2 pt-2">
                  {terminalLogs.map((log, index) => (
                    <div key={index} className="text-xs font-bold leading-relaxed text-emerald-400">
                      {log}
                    </div>
                  ))}
                  <div className="text-xs font-bold text-[#FFDE59] animate-pulse">
                    &gt; RUNNING LIQUIDITY & SCARCITY OPTIMIZATION...
                  </div>
                </div>
              </div>

              {/* Progress Footer */}
              <div className="p-4 bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs text-white">
                <span className="font-bold uppercase tracking-wider">
                  STATUS: SYNTHESIZING CANDIDATE PROFILES & ARENA SANDBOX GATES
                </span>
                <span className="font-black text-[#FFDE59] animate-pulse">
                  PLEASE STAND BY [ 85% ]
                </span>
              </div>
            </motion.div>
          )}

          {/* ────── STEP 5: PREVIEW & LAUNCH DOSSIER ────── */}
          {step === 5 && aiScores && (
            <motion.div
              key="step5" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-white border-4 border-black p-6 sm:p-10 shadow-[10px_10px_0px_#000] space-y-8"
            >
              {/* Window Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-3 border-black gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-[#FF0033] border border-black" />
                  <div className="w-3.5 h-3.5 bg-[#FFDE59] border border-black" />
                  <div className="w-3.5 h-3.5 bg-[#CCFF00] border border-black" />
                  <span className="ml-2 text-xs font-black uppercase text-black tracking-wider">
                    [ OFFICIAL HYPERS HIRING CAMPAIGN DOSSIER // READY FOR ARENA DEPLOYMENT ]
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#CCFF00] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
                  <ShieldCheck size={14} />
                  <span>ALL GATES VERIFIED</span>
                </div>
              </div>

              {/* Role Title Banner */}
              <div className="p-6 bg-[#FAF8F5] border-3 border-black flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-black text-[#FFDE59] text-[10px] font-black uppercase">
                      {formData.department}
                    </span>
                    <span className="px-2 py-0.5 bg-[#00F0FF] text-black border border-black text-[10px] font-black uppercase">
                      {formData.workMode}
                    </span>
                    <span className="px-2 py-0.5 bg-[#FFDE59] text-black border border-black text-[10px] font-black uppercase">
                      {formData.fundingStage}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase text-black">
                    {formData.customTitle || formData.title}
                  </h2>
                  <div className="text-xs font-bold text-gray-700 uppercase mt-1 flex items-center gap-2">
                    <Building2 size={13} />
                    <span>{formData.startupName}</span>
                    <span>•</span>
                    <MapPin size={13} />
                    <span>{formData.location}</span>
                  </div>
                </div>

                <div className="text-left md:text-right shrink-0 bg-white p-3 border-2 border-black shadow-[2px_2px_0px_#000]">
                  <span className="text-[10px] font-black uppercase text-gray-500 block">COMPENSATION & EQUITY</span>
                  <div className="text-lg font-black text-emerald-700">
                    {formData.compensation} {formData.currency}
                  </div>
                  <div className="text-xs font-black text-purple-700">
                    + {formData.equity} ({formData.vesting})
                  </div>
                </div>
              </div>

              {/* 4-Card AI Analytics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                  <span className="text-[10px] font-black uppercase text-gray-500 block">// ROLE COMPLEXITY</span>
                  <span className="text-sm font-black text-purple-800 block mt-1">{aiScores.roleComplexity}</span>
                </div>
                <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                  <span className="text-[10px] font-black uppercase text-gray-500 block">// MATCHED OPERATORS</span>
                  <span className="text-sm font-black text-blue-700 block mt-1">{aiScores.matchedCandidates} ARENA CANDIDATES</span>
                </div>
                <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                  <span className="text-[10px] font-black uppercase text-gray-500 block">// CONTEST RATING GATE</span>
                  <span className="text-sm font-black text-[#FF0033] block mt-1">{formData.contestRatingThreshold}+ MINIMUM</span>
                </div>
                <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                  <span className="text-[10px] font-black uppercase text-gray-500 block">// EST. OFFER TIME</span>
                  <span className="text-sm font-black text-emerald-700 block mt-1">{aiScores.estimatedVelocity}</span>
                </div>
              </div>

              {/* 30/60/90 Day Execution Milestones */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#FFDE59] border border-black inline-block" />
                  <span>30 / 60 / 90 DAY EXECUTION MILESTONES (EVALUATION CRITERIA)</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 bg-[#FAF8F5] border-2 border-black">
                    <span className="px-2 py-0.5 bg-black text-[#FFDE59] text-[9px] font-black uppercase block w-max mb-2">
                      DAY 30
                    </span>
                    <p className="font-bold text-gray-800 leading-snug">{formData.milestone30}</p>
                  </div>
                  <div className="p-3.5 bg-[#FAF8F5] border-2 border-black">
                    <span className="px-2 py-0.5 bg-black text-[#00F0FF] text-[9px] font-black uppercase block w-max mb-2">
                      DAY 60
                    </span>
                    <p className="font-bold text-gray-800 leading-snug">{formData.milestone60}</p>
                  </div>
                  <div className="p-3.5 bg-[#FAF8F5] border-2 border-black">
                    <span className="px-2 py-0.5 bg-black text-[#CCFF00] text-[9px] font-black uppercase block w-max mb-2">
                      DAY 90
                    </span>
                    <p className="font-bold text-gray-800 leading-snug">{formData.milestone90}</p>
                  </div>
                </div>
              </div>

              {/* Selected Tech Stack & Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-black mb-2.5">
                    // CORE ARCHITECTURAL STACK
                  </h4>
                  <div className="flex flex-wrap gap-1.5 p-3.5 bg-[#FAF8F5] border-2 border-black">
                    {formData.techStack.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-white border border-black text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-black mb-2.5">
                    // MANDATORY PROOF-OF-WORK GATES
                  </h4>
                  <div className="p-3.5 bg-[#FAF8F5] border-2 border-black space-y-2 text-xs font-bold text-gray-800">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 font-black">✓</span>
                      <span>Contest Rating Threshold: {formData.contestRatingThreshold}+ ELO</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 font-black">✓</span>
                      <span>GitHub Commit Velocity: {formData.githubActivityThreshold}+ commits/yr</span>
                    </div>
                    {formData.workTrialAgreed && (
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-black">✓</span>
                        <span>48-Hour Paid Work Trial Agreement Mandated</span>
                      </div>
                    )}
                    {formData.startupExpRequired && (
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-black">✓</span>
                        <span>Early-Stage Startup 0-to-1 Experience Enforced</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Launch Action Bar */}
              <div className="p-6 bg-[#FFDE59] border-3 border-black shadow-[4px_4px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-black uppercase text-black flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-black animate-pulse" />
                    <span>CAMPAIGN READY TO ARMED DEPLOYMENT</span>
                  </div>
                  <p className="text-[11px] font-bold text-gray-800 uppercase">
                    Candidates matching your proof-of-work gates will begin live code evaluations immediately.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button 
                    onClick={() => setStep(1)} 
                    className="px-5 py-3 bg-white text-black hover:bg-neutral-100 border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] cursor-pointer"
                  >
                    ✏️ RECONFIGURE
                  </button>
                  <button 
                    onClick={handleLaunch} 
                    className="px-6 py-3.5 bg-black hover:bg-neutral-800 text-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Rocket size={16} />
                    <span>DEPLOY HIRING CAMPAIGN →</span>
                  </button>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </main>
    </div>
  );
}
