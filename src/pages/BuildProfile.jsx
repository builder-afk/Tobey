import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Rocket, Brain, CheckCircle2, ChevronRight, ChevronLeft,
  Briefcase, Code, Target, Zap, User, MessageSquare, Hexagon, Star, 
  ArrowRight, FileText, Globe, Terminal, Shield, Swords, Layers,
  Cpu, Flame, Check, Sparkles, ExternalLink, RefreshCw
} from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';

export default function BuildProfile() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('pitch_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return {
      role: 'systems_engineer',
      experience: 'Senior Craftsman (3-6 Yrs)',
      skills: ['Rust', 'Python', 'TypeScript', 'Docker / eBPF'],
      arenaTrack: 'Coding Royale (Speed DSA)',
      mission: 'launch_startup',
      idea: '',
      lookingFor: '',
      handle: '',
      calculatedScore: 94
    };
  });

  // Terminal Processing Simulation
  const [terminalLogs, setTerminalLogs] = useState([]);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // Terminal telemetry generation simulation for step 4
  useEffect(() => {
    if (step === 4) {
      setTerminalLogs([]);
      const logs = [
        'INITIATING HYPERS TALENT COMPILER V2.6...',
        `INGESTING ARCHETYPE: [ ${formData.role?.toUpperCase()} ]`,
        `COMPILING TECHNICAL ARSENAL: [ ${formData.skills?.join(', ') || 'POLYGLOT'} ]`,
        `CALIBRATING ARENA SPECIALIZATION: [ ${formData.arenaTrack?.toUpperCase()} ]`,
        'BENCHMARKING AGAINST 12,400+ ACTIVE PEERS IN REPO SANDBOX...',
        'ANALYZING TELEMETRY: 94.2% CODE CONVICTION, ZERO FILLER COMMITS',
        'ESTABLISHING FOUNDER & RECRUITING CLEARANCE...',
        'BUILDER DOSSIER SYNTHESIS COMPLETE // READY FOR DEPLOYMENT'
      ];

      logs.forEach((log, index) => {
        setTimeout(() => {
          setTerminalLogs(prev => [...prev, log]);
        }, index * 450);
      });

      const timer = setTimeout(() => {
        setStep(5);
      }, logs.length * 450 + 600);

      return () => clearTimeout(timer);
    }
  }, [step]);

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleSkill = (skill) => {
    setFormData(prev => {
      const isSelected = prev.skills.includes(skill);
      if (isSelected) {
        return { ...prev, skills: prev.skills.filter(s => s !== skill) };
      } else {
        if (prev.skills.length >= 6) return prev; // max 6 skills
        return { ...prev, skills: [...prev.skills, skill] };
      }
    });
  };

  // Hypers Workspace Archetypes
  const archetypes = [
    { 
      id: 'systems_engineer', 
      label: 'Core Systems & Kernel', 
      icon: Cpu, 
      accent: '#FFDE59',
      tagline: 'Rust, C/C++, Linux kernel hacking, async runtimes, distributed consensus engines.' 
    },
    { 
      id: 'ai_architect', 
      label: 'Agentic AI & MLOps', 
      icon: Brain, 
      accent: '#00F0FF',
      tagline: 'Autonomous multi-agent loops, PyTorch, RAG architectures, model fine-tuning, DSPy.' 
    },
    { 
      id: 'fullstack', 
      label: 'Full-Stack Protocol', 
      icon: Code, 
      accent: '#CCFF00',
      tagline: 'Reactive real-time web sandboxes, WebSockets, high-throughput backend APIs.' 
    },
    { 
      id: 'founder_cto', 
      label: 'Technical Founder / CTO', 
      icon: Rocket, 
      accent: '#FF0033',
      tagline: 'System design, rapid MVP prototyping, team leadership, venture capital readiness.' 
    },
    { 
      id: 'fde', 
      label: 'Forward Deployed Engineer', 
      icon: Target, 
      accent: '#FF8811',
      tagline: 'Air-gapped VPC integrations, enterprise AI client discovery, high-stakes POC builds.' 
    },
    { 
      id: 'security_lead', 
      label: 'Security & Red-Teaming', 
      icon: Shield, 
      accent: '#FF52D9',
      tagline: 'Model adversarial jailbreaking, smart contract security audits, eBPF telemetry.' 
    },
  ];

  // Workspace Seniority & Velocity Tiers
  const seniorityTiers = [
    'Fast-Moving Junior (0-2 Yrs)',
    'Senior Craftsman (3-6 Yrs)',
    'Staff / Principal Architect (7+ Yrs)',
    'Repeat Venture Founder'
  ];

  // Workspace Superpower Technologies
  const workspaceSkills = [
    "Rust", "C / C++", "Python", "Go", "TypeScript", "CUDA / Triton",
    "PyTorch", "LangGraph / DSPy", "Kubernetes", "Docker / eBPF",
    "ClickHouse / OLAP", "PostgreSQL", "WebAssembly", "Neo4j Graph",
    "Kafka Streams", "Solidity / EVM"
  ];

  // Preferred Arena Track
  const arenaTracks = [
    'Coding Royale (Speed DSA)',
    'Distributed System Design',
    'Linux Kernel Hacking',
    'Autonomous Agentic AI Duels',
    'High-Throughput SQL & OLAP',
    'Cloud-Native Kubernetes Ops'
  ];

  // Mission Goals
  const missions = [
    { id: 'launch_startup', label: '🚀 Launch a Venture-Backed Startup', desc: 'Build an evaluated thesis in Founder Cockpit and raise pre-seed capital.' },
    { id: 'find_cofounder', label: '🤝 Find Co-Founder / Team Match', desc: 'Pair with complementary technical or GTM builders for hackathons and startups.' },
    { id: 'fde_recruitment', label: '💼 Get Recruited as Founding Engineer / FDE', desc: 'Get scored on Hypers benchmarks and hired by venture-backed startups.' },
    { id: 'compete_arenas', label: '⚔️ Compete & Climb Arena Leaderboards', desc: 'Sharpen algorithmic problem-solving and systems craft in 24 competitive arenas.' }
  ];

  const handleFinish = () => {
    localStorage.setItem('pitch_user_profile', JSON.stringify(formData));
    navigate('/user-dashboard');
  };

  return (
    <div 
      className="min-h-screen bg-[#F0EDE6] text-black font-mono selection:bg-[#FFDE59] selection:text-black flex flex-col"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* Top Warning / Telemetry Marquee */}
      <div className="h-9 shrink-0 bg-[#FFDE59] border-b-4 border-black py-1 px-4 overflow-hidden whitespace-nowrap z-20 flex items-center shadow-[0_4px_0px_#000] select-none">
        <div className="flex items-center gap-8 animate-marquee font-mono text-[11px] font-black uppercase tracking-widest text-black">
          <span className="flex items-center gap-1.5"><span className="text-[#FF5722]">⚡</span> [ HYPERS TALENT PROTOCOL // BUILDER DOSSIER INITIALIZATION ]</span>
          <span>//</span>
          <span>SYSTEM STATUS: VERIFIED BENCHMARKING ENGINE ARMED</span>
          <span>//</span>
          <span>LINKED TO HYPERS IDE & 24 ARENAS</span>
          <span>//</span>
          <span>ZERO RESUME BS // REAL PROOF OF WORK ONLY</span>
          <span>//</span>
          <span className="bg-black text-[#00F0FF] px-2 py-0.5 border border-black font-black">STATUS: ENROLLMENT ACTIVE</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full flex-1 flex flex-col justify-center">

        {/* ═══ PROGRESS HEADER ═══ */}
        {step < 4 && (
          <div className="mb-8 border-4 border-black bg-white p-4 shadow-[6px_6px_0px_#000]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 text-xs font-black uppercase">
              <span className="bg-[#FFDE59] px-2.5 py-1 border-2 border-black inline-block shadow-[2px_2px_0px_#000]">
                [ STEP 0{step} OF 03 ]
              </span>
              <span className="text-gray-700">
                {step === 1 && '// PHASE 1: TECHNICAL ARCHETYPE & EXPERIENCE'}
                {step === 2 && '// PHASE 2: TECHNICAL ARSENAL & ARENA FOCUS'}
                {step === 3 && '// PHASE 3: WORKSPACE OBJECTIVES & PROOF OF WORK'}
              </span>
            </div>

            {/* High-Contrast Brutalist Progress Bar */}
            <div className="h-4 w-full bg-[#FAF8F5] border-2 border-black p-0.5">
              <div 
                className="h-full bg-[#CCFF00] border-r-2 border-black transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* ════ STEP 1: ENGINEERING ARCHETYPE & SENIORITY ════ */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_#000]"
            >
              {/* Window Titlebar */}
              <div className="flex items-center gap-2 pb-4 mb-6 border-b-4 border-black">
                <div className="w-3.5 h-3.5 bg-[#FF0033] border border-black" />
                <div className="w-3.5 h-3.5 bg-[#FFDE59] border border-black" />
                <div className="w-3.5 h-3.5 bg-[#CCFF00] border border-black" />
                <span className="ml-2 text-xs font-black uppercase text-black">
                  [ STEP 01 // SELECT PRIMARY ENGINEERING DISCIPLINE ]
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black mb-2">
                WHAT IS YOUR ENGINEERING ARCHETYPE?
              </h2>
              <p className="text-xs sm:text-sm font-bold text-gray-600 uppercase mb-8 leading-relaxed">
                // Calibrate your profile for the Hypers IDE, coding royale duels, and venture co-founder matching.
              </p>

              {/* Archetype Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {archetypes.map((arch) => {
                  const Icon = arch.icon;
                  const isSelected = formData.role === arch.id;

                  return (
                    <button
                      key={arch.id}
                      type="button"
                      onClick={() => updateForm('role', arch.id)}
                      className={`p-4 border-3 border-black text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected 
                          ? 'bg-[#FFDE59] shadow-[5px_5px_0px_#000] translate-x-1 -translate-y-1' 
                          : 'bg-white hover:bg-[#FAF8F5] shadow-[2px_2px_0px_#000]'
                      }`}
                    >
                      <div 
                        className="w-10 h-10 border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000]"
                        style={{ backgroundColor: arch.accent }}
                      >
                        <Icon size={20} className="stroke-[2.5] text-black" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-black uppercase text-black">
                            {arch.label}
                          </span>
                          {isSelected && (
                            <span className="w-4 h-4 bg-black text-[#CCFF00] flex items-center justify-center text-[10px] font-black">
                              ✓
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-bold text-gray-700 uppercase leading-snug">
                          {arch.tagline}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Experience Tier Selector */}
              <div className="mb-10 pt-6 border-t-2 border-black">
                <label className="block text-xs font-black uppercase text-black mb-3">
                  YEARS OF COMBAT EXPERIENCE / SENIORITY TIER:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {seniorityTiers.map((tier) => {
                    const isSelected = formData.experience === tier;
                    return (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => updateForm('experience', tier)}
                        className={`p-3 border-2 border-black text-xs font-black uppercase text-center transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-[#00F0FF] text-black shadow-[3px_3px_0px_#000] translate-y-[-2px]' 
                            : 'bg-white hover:bg-neutral-100'
                        }`}
                      >
                        {tier}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next Action Button */}
              <div className="flex justify-end pt-4 border-t-2 border-black">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-[#CCFF00] hover:bg-[#FFDE59] text-black font-black text-xs uppercase border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>[ PROCEED TO ARSENAL ]</span>
                  <ArrowRight size={16} className="stroke-[3]" />
                </button>
              </div>

            </motion.div>
          )}

          {/* ════ STEP 2: TECHNICAL ARSENAL & ARENA FOCUS ════ */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_#000]"
            >
              {/* Window Titlebar */}
              <div className="flex items-center gap-2 pb-4 mb-6 border-b-4 border-black">
                <div className="w-3.5 h-3.5 bg-[#FF0033] border border-black" />
                <div className="w-3.5 h-3.5 bg-[#FFDE59] border border-black" />
                <div className="w-3.5 h-3.5 bg-[#CCFF00] border border-black" />
                <span className="ml-2 text-xs font-black uppercase text-black">
                  [ STEP 02 // TECHNICAL ARSENAL & ARENA SPECIALIZATION ]
                </span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                  CALIBRATE YOUR TECHNICAL ARSENAL
                </h2>
                <span className="px-2.5 py-1 bg-black text-[#FFDE59] text-xs font-black uppercase border border-black">
                  {formData.skills.length}/6 SELECTED
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-600 uppercase mb-8 leading-relaxed">
                // Select up to 6 core technologies you build with under pressure in the Hypers IDE & Sandbox.
              </p>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
                {workspaceSkills.map((skill) => {
                  const isSelected = formData.skills.includes(skill);

                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`p-3 border-2 border-black text-xs font-mono font-black uppercase transition-all cursor-pointer flex items-center justify-between ${
                        isSelected 
                          ? 'bg-[#FFDE59] text-black shadow-[3px_3px_0px_#000] translate-x-0.5' 
                          : 'bg-white text-gray-800 hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <span>{skill}</span>
                      <span className={`text-[10px] ${isSelected ? 'text-black font-black' : 'text-gray-400'}`}>
                        {isSelected ? '✓' : '+'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Preferred Arena Specialization */}
              <div className="mb-10 pt-6 border-t-2 border-black">
                <label className="block text-xs font-black uppercase text-black mb-3">
                  PRIMARY HYPERS ARENA TRACK SPECIALIZATION:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {arenaTracks.map((track) => {
                    const isSelected = formData.arenaTrack === track;

                    return (
                      <button
                        key={track}
                        type="button"
                        onClick={() => updateForm('arenaTrack', track)}
                        className={`p-3 border-2 border-black text-xs font-black uppercase text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected 
                            ? 'bg-[#CCFF00] text-black shadow-[3px_3px_0px_#000] translate-x-0.5' 
                            : 'bg-white hover:bg-neutral-100'
                        }`}
                      >
                        <span>{track}</span>
                        {isSelected && <span className="font-black text-black">►</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-black">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-3 bg-white border-2 border-black text-black font-black text-xs uppercase hover:bg-neutral-100 cursor-pointer"
                >
                  [ ← BACK ]
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={formData.skills.length === 0}
                  className="px-6 py-3 bg-[#CCFF00] hover:bg-[#FFDE59] text-black font-black text-xs uppercase border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>[ PROCEED TO AMBITION ]</span>
                  <ArrowRight size={16} className="stroke-[3]" />
                </button>
              </div>

            </motion.div>
          )}

          {/* ════ STEP 3: WORKSPACE OBJECTIVES & PROOF OF WORK ════ */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_#000]"
            >
              {/* Window Titlebar */}
              <div className="flex items-center gap-2 pb-4 mb-6 border-b-4 border-black">
                <div className="w-3.5 h-3.5 bg-[#FF0033] border border-black" />
                <div className="w-3.5 h-3.5 bg-[#FFDE59] border border-black" />
                <div className="w-3.5 h-3.5 bg-[#CCFF00] border border-black" />
                <span className="ml-2 text-xs font-black uppercase text-black">
                  [ STEP 03 // VENTURE AMBITION & PROOF OF WORK ]
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black mb-2">
                WORKSPACE AMBITION & TELEMETRY
              </h2>
              <p className="text-xs sm:text-sm font-bold text-gray-600 uppercase mb-8 leading-relaxed">
                // What are you building or hunting for on the Hypers platform?
              </p>

              {/* Primary Platform Mission */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase text-black mb-3">
                  PRIMARY PLATFORM OBJECTIVE:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {missions.map((m) => {
                    const isSelected = formData.mission === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => updateForm('mission', m.id)}
                        className={`p-3.5 border-2 border-black text-left transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-[#FF8811] text-white shadow-[4px_4px_0px_#000] translate-x-0.5' 
                            : 'bg-white hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <span className="text-xs font-black uppercase block mb-1">
                          {m.label}
                        </span>
                        <span className={`text-[10px] font-bold block ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                          {m.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project / Problem Space */}
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    WHAT PROBLEM SPACE OR ARCHITECTURE ARE YOU EXPLORING?
                  </label>
                  <textarea
                    rows={2}
                    value={formData.idea}
                    onChange={(e) => updateForm('idea', e.target.value)}
                    placeholder="e.g. Distributed proxy for agentic tool loops, zero-knowledge compliance clearing for fintech..."
                    className="w-full p-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase focus:outline-none focus:bg-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    WHAT COMPLEMENTARY TALENT ARE YOU SEEKING?
                  </label>
                  <input
                    type="text"
                    value={formData.lookingFor}
                    onChange={(e) => updateForm('lookingFor', e.target.value)}
                    placeholder="e.g. Ruthless GTM co-founder with enterprise B2B sales track record, or low-level CUDA wizard..."
                    className="w-full p-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    GITHUB / LEETCODE / PORTFOLIO HANDLE (PROOF OF WORK):
                  </label>
                  <div className="flex items-center">
                    <span className="p-3 bg-[#FAF8F5] border-2 border-r-0 border-black text-xs font-black text-gray-500">
                      github.com/
                    </span>
                    <input
                      type="text"
                      value={formData.handle}
                      onChange={(e) => updateForm('handle', e.target.value)}
                      placeholder="octocat"
                      className="flex-1 p-3 bg-white border-2 border-black text-xs font-mono font-black uppercase focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-black">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-3 bg-white border-2 border-black text-black font-black text-xs uppercase hover:bg-neutral-100 cursor-pointer"
                >
                  [ ← BACK ]
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-[#FF0033] hover:bg-[#FFDE59] text-white hover:text-black font-black text-xs uppercase border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Zap size={16} className="stroke-[3]" />
                  <span>[ SYNTHESIZE DOSSIER ]</span>
                </button>
              </div>

            </motion.div>
          )}

          {/* ════ STEP 4: TERMINAL TELEMETRY SYNTHESIS ════ */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black border-4 border-black text-white p-6 sm:p-10 shadow-[10px_10px_0px_#000] font-mono"
            >
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800 text-xs text-[#00F0FF]">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-[#FF0033] border border-black" />
                  <div className="w-3.5 h-3.5 bg-[#FFDE59] border border-black" />
                  <div className="w-3.5 h-3.5 bg-[#CCFF00] border border-black" />
                  <span className="ml-2 font-black uppercase">
                    [ HYPERS DOSSIER COMPILER // TELEMETRY LINKED ]
                  </span>
                </div>
                <span className="animate-pulse text-[#CCFF00]">● SYNTHESIS ACTIVE</span>
              </div>

              {/* Simulated Output Lines */}
              <div className="min-h-[240px] space-y-2 text-xs sm:text-sm font-mono">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-[#CCFF00] select-none">&gt;</span>
                    <span className="text-neutral-200">{log}</span>
                  </div>
                ))}
                <div className="w-3 h-5 bg-[#FFDE59] animate-pulse inline-block mt-2" />
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-800 text-[11px] text-neutral-500 uppercase flex items-center justify-between">
                <span>ENCRYPTING REPUTATION WEIGHTS</span>
                <span>LATENCY: 12MS</span>
              </div>
            </motion.div>
          )}

          {/* ════ STEP 5: VERIFIED BUILDER DOSSIER OUTPUT ════ */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border-4 border-black p-6 sm:p-10 shadow-[10px_10px_0px_#000]"
            >
              {/* Top Banner */}
              <div className="bg-[#CCFF00] border-4 border-black p-4 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-[4px_4px_0px_#000]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={24} className="stroke-[3] text-black" />
                  <span className="text-sm font-black uppercase text-black">
                    [ HYPERS VERIFIED TALENT DOSSIER INITIALIZED ]
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-black text-[#FFDE59] text-[10px] font-black uppercase">
                  ACTIVE DOSSIER // v2.6
                </span>
              </div>

              {/* Dossier Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b-4 border-black gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-gray-500 block mb-1">
                    ENGINEERING DOSSIER IDENTIFIER
                  </span>
                  <h3 className="text-3xl font-black uppercase text-black">
                    {archetypes.find(a => a.id === formData.role)?.label || 'ENGINEER'}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="px-2.5 py-0.5 bg-[#FFDE59] border border-black text-xs font-black uppercase">
                      {formData.experience}
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#00F0FF] border border-black text-xs font-black uppercase">
                      ARENA: {formData.arenaTrack}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF8F5] border-2 border-black text-center min-w-[140px]">
                  <span className="text-[9px] font-black uppercase text-gray-500 block">EVALUATED SCORE</span>
                  <span className="text-3xl font-black text-black">94<span className="text-sm text-gray-500">/100</span></span>
                  <span className="text-[9px] font-black uppercase text-emerald-700 block">TOP 6% OF PLATFORM</span>
                </div>
              </div>

              {/* Stack Badges */}
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase text-gray-500 block mb-2">
                  VERIFIED TECHNICAL ARSENAL:
                </span>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((s) => (
                    <span key={s} className="px-3 py-1 bg-white border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Focus & Teammate Need */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-[#FAF8F5] p-4 border-2 border-black">
                <div>
                  <span className="text-[10px] font-black uppercase text-gray-500 block mb-1">
                    PROJECT / ARCHITECTURE FOCUS:
                  </span>
                  <p className="text-xs font-bold text-gray-900 uppercase">
                    {formData.idea || 'Exploring high-throughput distributed systems & autonomous runtime protocols.'}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-gray-500 block mb-1">
                    TEAMMATE MATCHING PREFERENCE:
                  </span>
                  <p className="text-xs font-bold text-gray-900 uppercase">
                    {formData.lookingFor || 'Seeking high-velocity co-founders or hiring venture-backed teams.'}
                  </p>
                </div>
              </div>

              {/* Launch Actions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t-4 border-black">
                <Link
                  to="/ide"
                  className="p-3.5 bg-[#CCFF00] hover:bg-[#FFDE59] text-black font-black text-xs uppercase border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Terminal size={14} className="stroke-[3]" />
                  <span>[ ⚡ ENTER IDE ]</span>
                </Link>

                <Link
                  to="/pitch"
                  className="p-3.5 bg-[#FF0033] hover:bg-[#FFDE59] text-white hover:text-black font-black text-xs uppercase border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Rocket size={14} className="stroke-[3]" />
                  <span>[ 🚀 FOUNDER COCKPIT ]</span>
                </Link>

                <button
                  type="button"
                  onClick={handleFinish}
                  className="p-3.5 bg-black hover:bg-neutral-800 text-[#FFDE59] font-black text-xs uppercase border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <User size={14} className="stroke-[3]" />
                  <span>[ 👤 VIEW MY DASHBOARD ]</span>
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>

    </div>
  );
}
