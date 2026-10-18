import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap, Brain, Users, FileCode2, Search, GitBranch, Bug, Plug, Settings,
  ArrowRight, Sparkles, Terminal, XCircle, CheckCircle2,
  AlertTriangle, Rocket, Landmark, Building2, Link2, Smile, Flame,
  Box, Cloud, GraduationCap, Briefcase, Code2, Trophy, Swords, Shield,
  ExternalLink, ChevronDown, ChevronRight, Play, Copy, ArrowLeft, Cpu,
  Mic, PieChart, Target, LayoutGrid, Compass
} from 'lucide-react';
import { teamMembers } from '../components/Hero';
import KollektivaPortal from '../components/KollektivaPortal';
import AgenticRolePendulum from '../components/AgenticRolePendulum';
import TobeyAgentHowItWorks from '../components/TobeyAgentHowItWorks';
import HomeFaqSection from '../components/HomeFaqSection';

export default function Home() {
  const navigate = useNavigate();
  const [activeExecIndex, setActiveExecIndex] = useState(0);
  const activeMember = teamMembers[activeExecIndex];

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTab, setActiveTab] = useState('solution.ts');
  const [activeCockpitTab, setActiveCockpitTab] = useState('pitch');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@hypers.sh');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) { }
  };

  const techLogos = [
    { name: 'Python 3.12', color: 'bg-[#FFDE59]' },
    { name: 'Rust 2024', color: 'bg-[#FF8811]' },
    { name: 'PyTorch 2.4', color: 'bg-[#FF52D9]' },
    { name: 'Kubernetes', color: 'bg-[#00F0FF]' },
    { name: 'LangChain', color: 'bg-[#CCFF00]' },
    { name: 'Docker Buildx', color: 'bg-[#00F0FF]' },
    { name: 'PostgreSQL 16', color: 'bg-[#FFDE59]' },
    { name: 'Go Microservices', color: 'bg-[#CCFF00]' },
    { name: 'React 19', color: 'bg-[#00F0FF]' },
    { name: 'Solidity Web3', color: 'bg-[#FF52D9]' },
    { name: 'FastAPI', color: 'bg-[#CCFF00]' },
    { name: 'Hugging Face', color: 'bg-[#FFDE59]' },
  ];

  return (
    <div 
      className="min-h-screen bg-[#F0EDE6] text-black font-mono selection:bg-black selection:text-[#FFDE59] relative overflow-x-hidden"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px'
      }}
    >

      {/* ═══ 1. HERO STAGE // BRUTALIST COMMAND ═══ */}
      <section className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-12 w-full border-b-4 border-black overflow-hidden">
        {/* Section Watermark */}
        <div className="absolute -right-8 -top-8 pointer-events-none select-none z-0 overflow-hidden leading-none opacity-[0.05] font-black tracking-tighter text-black text-[14vw] font-mono whitespace-nowrap">
          HYPERS // GENESIS
        </div>
        <div className="absolute left-6 bottom-3 pointer-events-none select-none z-0 text-[10px] font-black text-black/20 uppercase tracking-widest hidden md:block">
          [ 01 // PROTOCOL // LAT: 37.7749° N // LNG: 122.4194° W // REPO-TO-UNICORN ]
        </div>

        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">

            {/* Left Column: Mission Statement & CTAs */}
            <div className="lg:col-span-7 bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_#000] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] border-2 border-black shadow-[2px_2px_0px_#000] text-black font-black text-xs uppercase tracking-wider mb-6">
                  <Terminal size={14} className="stroke-[3]" />
                  <span>[ PROTOCOL // NEXT-GEN SOFTWARE TALENT ENGINE ]</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight uppercase leading-[1.05] mb-6">
                  HYPERS IS THE <span className="bg-[#CCFF00] px-2 border-3 border-black shadow-[4px_4px_0px_#000]">TALENT ENGINE</span> YOU BUILD WITH DAILY.
                </h1>

                <p className="text-sm md:text-base font-bold text-gray-700 uppercase leading-relaxed mb-8">
                  // MASTER DATA STRUCTURES, LOW-LEVEL SYSTEMS, DISTRIBUTED CLOUD RUNTIMES & AUTONOMOUS AI UNDER REAL-TIME TIMERS. BUILT FOR FOUNDERS, ADVANCED ENGINEERS & TIER-1 INDUSTRY CANDIDATES.
                </p>
              </div>

              {/* Launch Buttons */}
              <div>
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <Link
                    to="/contests"
                    className="px-6 py-3.5 bg-[#CCFF00] hover:bg-[#FFDE59] border-3 border-black text-black font-black text-sm uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2"
                  >
                    <Trophy size={18} className="stroke-[2.5]" />
                    <span>[ 🏆 24 ARENA CONTESTS ]</span>
                  </Link>

                  <Link
                    to="/royale"
                    className="px-6 py-3.5 bg-[#00F0FF] hover:bg-[#FFDE59] border-3 border-black text-black font-black text-sm uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2"
                  >
                    <Swords size={18} className="stroke-[2.5]" />
                    <span>[ ⚔ CODING ROYALE ]</span>
                  </Link>

                  <Link
                    to="/explore"
                    className="px-6 py-3.5 bg-[#FFDE59] hover:bg-[#CCFF00] border-3 border-black text-black font-black text-sm uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2"
                  >
                    <Compass size={18} className="stroke-[2.5]" />
                    <span>[ ⚡ HIGH-MOAT STARTUPS ]</span>
                  </Link>

                  <Link
                    to="/executive/ceo"
                    className="px-5 py-3.5 bg-white hover:bg-[#FAF8F5] border-3 border-black text-black font-black text-sm uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2"
                  >
                    <span>[ C-SUITE HEROES ]</span>
                    <ArrowRight size={16} className="stroke-[3]" />
                  </Link>
                </div>

                {/* Status Stats Pill */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t-2 border-black text-xs font-black uppercase text-gray-700">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F5] border border-black">
                    <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                    24,850+ OPERATORS
                  </span>
                  <span className="px-2.5 py-1 bg-[#FAF8F5] border border-black">
                    5,071 LIVE CONTESTS
                  </span>
                  <span className="px-2.5 py-1 bg-[#CCFF00] border border-black text-black">
                    SUB-MS RUST SANDBOX
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Executive Hero Terminal Spotlight */}
            <div className="lg:col-span-5 bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between">
              <div>
                {/* Executive Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-black">
                  <span className="text-xs font-black uppercase text-gray-500">[ EXECUTIVE DOSSIER ]</span>
                  <span className="px-2 py-0.5 bg-[#FFDE59] border border-black text-xs font-black uppercase">
                    {activeMember.role}
                  </span>
                </div>

                {/* Portrait Frame */}
                <div className="relative border-4 border-black mb-6 shadow-[5px_5px_0px_#000] overflow-hidden bg-black aspect-[4/3]">
                  <img
                    src={activeMember.image}
                    alt={activeMember.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute bottom-2 left-2 bg-black text-[#CCFF00] font-black text-xs uppercase px-2 py-1 border border-black">
                    {activeMember.name} // {activeMember.role}
                  </div>
                </div>

                {/* Bio Statement */}
                <p className="text-xs font-bold uppercase leading-relaxed text-gray-800 bg-[#FAF8F5] border-2 border-black p-4 mb-6 shadow-[2px_2px_0px_#000]">
                  "{activeMember.description}"
                </p>
              </div>

              {/* Quick Switcher Grid for 8 Roles */}
              <div>
                <span className="text-[10px] font-black uppercase text-gray-500 block mb-2">
                  SWITCH EXECUTIVE INTEL:
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mb-4">
                  {teamMembers.map((member, idx) => {
                    const isActive = activeExecIndex === idx;
                    return (
                      <button
                        key={member.role}
                        onClick={() => setActiveExecIndex(idx)}
                        className={`py-1.5 border-2 border-black text-[11px] font-black uppercase transition-all shadow-[1px_1px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${isActive
                            ? 'bg-[#FFDE59] text-black font-black scale-105'
                            : 'bg-white text-gray-700 hover:bg-[#FAF8F5]'
                          }`}
                      >
                        {member.role}
                      </button>
                    );
                  })}
                </div>

                <Link
                  to={`/executive/${activeMember.role.toLowerCase()}`}
                  className="w-full py-2.5 bg-black hover:bg-neutral-800 text-[#FFDE59] font-black text-xs uppercase flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_#000] transition-all"
                >
                  <span>[ OPEN FULL {activeMember.role} DOSSIER ]</span>
                  <ArrowRight size={14} className="stroke-[3]" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ 2. TECH MARQUEE ═══ */}
      <section className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-6 w-full border-b-4 border-black overflow-hidden">
        {/* Section Watermark */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-[0.04] font-black text-[12vw] font-mono uppercase whitespace-nowrap">
          COMPILERS // RUNTIMES
        </div>

        <div className="relative z-10 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-black text-xs font-black uppercase">
            <Cpu size={16} className="stroke-[2.5]" />
            <span>[ SUPPORTED RUNTIMES, COMPILERS & CLOUD ECOSYSTEMS ]</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {techLogos.map((tech, idx) => (
              <div
                key={idx}
                className="px-4 py-2 bg-[#FAF8F5] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
              >
                <div className={`w-3 h-3 border border-black ${tech.color}`} />
                <span className="text-xs font-black text-black uppercase tracking-tight">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. ACADEMIC VS INDUSTRY BRUTALIST COMPARISON ═══ */}
      <section className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-12 md:py-16 w-full border-b-4 border-black overflow-hidden">
        {/* Section Watermark */}
        <div className="absolute right-0 top-4 pointer-events-none select-none z-0 opacity-[0.04] font-black text-[13vw] font-mono uppercase whitespace-nowrap text-[#FF0033]">
          LEGACY // DRIFT
        </div>
        <div className="absolute left-6 bottom-3 pointer-events-none select-none z-0 text-[10px] font-black text-black/20 uppercase tracking-widest hidden md:block">
          [ 02 // THEORY VS SILICON VALLEY PRODUCTION RUNTIMES ]
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#FF0033] text-white border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] mb-3">
              [ CRITICAL GAP ANALYSIS ]
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black mb-3">
              WHY UNIVERSITY CURRICULA FAIL IN MODERN TECH INTERVIEWS
            </h2>
            <p className="text-xs md:text-sm font-bold text-gray-700 uppercase max-w-3xl mx-auto">
              // TEXTBOOKS TEACH THEORY FROM 2012. INDUSTRY HIRES FOR LOW-LATENCY CONCURRENCY, DISTRIBUTED SCALE & PRODUCTION RUNTIMES.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

            {/* Card 1: Academic Curriculum (Legacy) */}
            <div className="bg-[#FFF8F8] border-4 border-black p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-[#FF0033] text-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                    <Landmark size={24} />
                  </div>
                  <span className="px-3 py-1 bg-[#FF0033] text-white border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
                    LEGACY DRIFT
                  </span>
                </div>

                <h3 className="text-2xl font-black uppercase text-black mb-2">
                  ACADEMIC CURRICULUM
                </h3>
                <p className="text-xs font-bold text-gray-600 uppercase mb-8">
                  CURRENT STATE OF UNIVERSITY LEARNING
                </p>

                <div className="space-y-6">
                  <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                    <h4 className="font-black text-black text-xs uppercase mb-1 flex items-center gap-2">
                      <XCircle size={16} className="text-[#FF0033]" />
                      THEORY-HEAVY & DISCONNECTED
                    </h4>
                    <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed">
                      Focus on textbook rote-learning with minimal hands-on coding under strict production constraints.
                    </p>
                  </div>

                  <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                    <h4 className="font-black text-black text-xs uppercase mb-1 flex items-center gap-2">
                      <XCircle size={16} className="text-[#FF0033]" />
                      OUTDATED OBSOLETE STACKS
                    </h4>
                    <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed">
                      Zero exposure to Rust, modern C++20, Go channels, vector databases, or autonomous agent loops.
                    </p>
                  </div>

                  <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                    <h4 className="font-black text-black text-xs uppercase mb-1 flex items-center gap-2">
                      <XCircle size={16} className="text-[#FF0033]" />
                      LOCALHOST SYNDROME
                    </h4>
                    <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed">
                      Projects live strictly on localhost; students miss crucial Docker buildx, K8s pods, and cloud CI/CD.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-black">
                <span className="px-3 py-1.5 bg-[#FF0033] text-white border-2 border-black font-black text-xs uppercase inline-block shadow-[2px_2px_0px_#000]">
                  [ ! HIGH FAILURE RATE IN TECH ROUNDS ]
                </span>
              </div>
            </div>

            {/* Card 2: Hypers Industry Standard (Combat Ready) */}
            <div className="bg-[#CCFF00] border-4 border-black p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-black text-[#CCFF00] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                    <Rocket size={24} />
                  </div>
                  <span className="px-3 py-1 bg-black text-[#CCFF00] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
                    PRODUCTION READY
                  </span>
                </div>

                <h3 className="text-2xl font-black uppercase text-black mb-2">
                  HYPERS INDUSTRY RIGOR
                </h3>
                <p className="text-xs font-black text-black uppercase mb-8">
                  WHAT TOP UNICORNS & FRONTIER LABS HIRE FOR
                </p>

                <div className="space-y-6">
                  <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                    <h4 className="font-black text-black text-xs uppercase mb-1 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-black" />
                      FULL-STACK & SYSTEMS EXCELLENCE
                    </h4>
                    <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed">
                      Build end-to-end scalable applications with high-throughput backend services and strict profiling.
                    </p>
                  </div>

                  <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                    <h4 className="font-black text-black text-xs uppercase mb-1 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-black" />
                      REAL-TIME TIMED BATTLES
                    </h4>
                    <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed">
                      24 Competitive Arenas with live judges, borrow checker analyzers, and low-latency benchmark tests.
                    </p>
                  </div>

                  <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                    <h4 className="font-black text-black text-xs uppercase mb-1 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-black" />
                      PRODUCTION CLOUD DEPLOYMENTS
                    </h4>
                    <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed">
                      Deploy real Kubernetes manifests, ingress controllers, Docker multistage builds, and secure smart contracts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-black">
                <span className="px-3 py-1.5 bg-black text-[#CCFF00] border-2 border-black font-black text-xs uppercase inline-block shadow-[2px_2px_0px_#000]">
                  [ ✓ HIGH-CONVICTION EMPLOYABLE SKILLSET ]
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ 4. TOBEY AGENT // ONBOARDING & HOW IT WORKS // 06 STEPS ═══ */}
      <TobeyAgentHowItWorks />

      {/* ═══ 5. FEATURES GRID // SPEED & PRECISION ═══ */}
      <section className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-12 md:py-16 w-full border-b-4 border-black overflow-hidden">
        {/* Section Watermark */}
        <div className="absolute left-0 bottom-2 pointer-events-none select-none z-0 opacity-[0.04] font-black text-[13vw] font-mono uppercase whitespace-nowrap">
          SUB-MS // LATENCY
        </div>
        <div className="absolute right-6 top-4 pointer-events-none select-none z-0 text-[10px] font-black text-black/20 uppercase tracking-widest hidden md:block">
          [ 03 // CRDT SYNCHRONIZATION // RUST NATIVE AST ]
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] mb-3">
              [ ARCHITECTURAL ADVANTAGE ]
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black mb-3">
              ENGINEERED FOR INSTANTANEOUS EXECUTION
            </h2>
            <p className="text-xs md:text-sm font-bold text-gray-700 uppercase max-w-2xl mx-auto">
              // ZERO SPINNERS. ZERO BLOAT. COMPILED USING HIGH-VELOCITY TOOLING SO YOUR LOGIC SHINES UNHINDERED.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#00F0FF] border-3 border-black flex items-center justify-center mb-5 shadow-[3px_3px_0px_#000]">
                  <Zap size={24} className="stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-black uppercase text-black mb-2">SUB-MS LATENCY</h3>
                <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed">
                  Native Rust compilation sandboxes execute test suites in single-digit milliseconds.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t-2 border-black text-[11px] font-black uppercase text-gray-700">
                [ 0.8MS P99 RUNTIME ]
              </div>
            </div>

            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#FFDE59] border-3 border-black flex items-center justify-center mb-5 shadow-[3px_3px_0px_#000]">
                  <Brain size={24} className="stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-black uppercase text-black mb-2">CONTEXT-AWARE AI</h3>
                <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed">
                  Autonomous AST analyzers evaluate memory leaks, cyclomatic complexity, and algorithmic bottlenecks.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t-2 border-black text-[11px] font-black uppercase text-gray-700">
                [ WHOLE-REPO INTEL ]
              </div>
            </div>

            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#FF52D9] border-3 border-black flex items-center justify-center mb-5 shadow-[3px_3px_0px_#000]">
                  <Swords size={24} className="stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-black uppercase text-black mb-2">MULTIPLAYER ROYALE</h3>
                <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed">
                  Real-time 1v1 battle gauntlets with live opponent test-case progress and matchmaking queues.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t-2 border-black text-[11px] font-black uppercase text-gray-700">
                [ CRDT SYNCHRONIZATION ]
              </div>
            </div>

            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#CCFF00] border-3 border-black flex items-center justify-center mb-5 shadow-[3px_3px_0px_#000]">
                  <Trophy size={24} className="stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-black uppercase text-black mb-2">24 COMBAT TRACKS</h3>
                <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed">
                  From DP and Graph Theory to Rust Lifetimes, Linux epoll, PyTorch Attention & Web3 Audits.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t-2 border-black text-[11px] font-black uppercase text-gray-700">
                [ 5,071 CHALLENGES ]
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ 6. LIVE WORKSPACE SIMULATOR PREVIEW ═══ */}
      <section className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-12 md:py-16 w-full border-b-4 border-black overflow-hidden">
        {/* Section Watermark */}
        <div className="absolute right-0 top-0 pointer-events-none select-none z-0 opacity-[0.04] font-black text-[13vw] font-mono uppercase whitespace-nowrap">
          EXECUTION // BENCHMARK
        </div>
        <div className="absolute left-6 bottom-3 pointer-events-none select-none z-0 text-[10px] font-black text-black/20 uppercase tracking-widest hidden md:block">
          [ 04 // V8 SPEEDUP 14.8X // BITMASK DP MATRIX ]
        </div>

        <div className="relative z-10 bg-white border-4 border-black shadow-[10px_10px_0px_#000] overflow-hidden">

          {/* Editor Window Titlebar */}
          <div className="bg-[#FAF8F5] border-b-4 border-black px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 bg-[#FF0033] border-2 border-black" />
              <div className="w-3.5 h-3.5 bg-[#FFDE59] border-2 border-black" />
              <div className="w-3.5 h-3.5 bg-[#CCFF00] border-2 border-black" />
              <span className="ml-3 text-xs font-black uppercase text-black">
                [ HYPERS RUNTIME SIMULATOR // SPEED CODING CLUSTER ]
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#00F0FF] border border-black text-[10px] font-black uppercase">
                TYPESCRIPT 5.5
              </span>
              <span className="px-2 py-0.5 bg-[#CCFF00] border border-black text-[10px] font-black uppercase">
                LATENCY: 0.9MS
              </span>
            </div>
          </div>

          {/* Split Pane: Code + Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">

            {/* Code Editor */}
            <div className="lg:col-span-8 bg-[#0C0C0C] p-6 font-mono text-xs leading-relaxed text-white overflow-x-auto">
              <div className="text-gray-500 mb-2">// HIGH-PERFORMANCE 0/1 KNAPSACK WITH BITMASK DP</div>
              <div><span className="text-pink-400">export function</span> <span className="text-yellow-300">solveKnapsack</span>(weights: <span className="text-cyan-400">number[]</span>, values: <span className="text-cyan-400">number[]</span>, capacity: <span className="text-cyan-400">number</span>): <span className="text-cyan-400">number</span> {'{'}</div>
              <div className="pl-4 text-neutral-400">const n = weights.length;</div>
              <div className="pl-4 text-neutral-400">const dp = new Int32Array(capacity + 1);</div>
              <div className="pl-4 text-pink-400">for <span className="text-white">(let i = 0; i &lt; n; i++) {'{'}</span></div>
              <div className="pl-8 text-neutral-400">const w = weights[i], v = values[i];</div>
              <div className="pl-8 text-pink-400">for <span className="text-white">(let cap = capacity; cap &gt;= w; cap--) {'{'}</span></div>
              <div className="pl-12 text-yellow-300">dp[cap] = Math.max(dp[cap], dp[cap - w] + v);</div>
              <div className="pl-8 text-white">{'}'}</div>
              <div className="pl-4 text-white">{'}'}</div>
              <div className="pl-4 text-pink-400">return <span className="text-cyan-300">dp[capacity]</span>;</div>
              <div className="text-white">{'}'}</div>
              <div className="mt-4 pt-4 border-t border-neutral-800 text-gray-500">
                // O(N * W) TIME COMPLEXITY | O(W) SPACE COMPLEXITY (FLAT MEMORY BUFFER)
              </div>
            </div>

            {/* Terminal Runner */}
            <div className="lg:col-span-4 bg-[#FAF8F5] border-t-4 lg:border-t-0 lg:border-l-4 border-black p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-black">
                  <span className="text-[11px] font-black uppercase text-black">[ TEST SUITE VERIFICATION ]</span>
                  <span className="text-[10px] font-black uppercase bg-[#CCFF00] border border-black px-1.5 py-0.5">
                    PASSING
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="text-gray-600">$ hypers run knapsack_benchmark</div>
                  <div className="text-black font-black">✓ TEST 1: Small Inputs (5 items) ... 0.1ms</div>
                  <div className="text-black font-black">✓ TEST 2: Stress Load (10,000 items) ... 1.2ms</div>
                  <div className="text-black font-black">✓ TEST 3: Edge Case (0 Capacity) ... 0.0ms</div>
                  <div className="text-black font-black">✓ TEST 4: Max Constraints ... 2.1ms</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-black">
                <div className="p-3 bg-[#CCFF00] border-2 border-black shadow-[2px_2px_0px_#000] mb-3">
                  <span className="text-xs font-black uppercase text-black block">VERDICT: 100/100 ALL TESTS PASSED</span>
                  <span className="text-[10px] font-bold text-gray-800 uppercase">MEMORY: 1.8MB | SPEEDUP: 14.8X OVER V8 DEFAULT</span>
                </div>
                <Link
                  to="/ide"
                  className="w-full py-2 bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase flex items-center justify-center gap-2 border-2 border-black shadow-[2px_2px_0px_#000] transition-all"
                >
                  <span>[ LAUNCH LIVE IDE WORKSPACE ]</span>
                  <ArrowRight size={14} className="stroke-[3]" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ 7. FOUNDER'S COCKPIT // VENTURE STUDIO ACCELERATOR ═══ */}
      <section id="founder-cockpit" className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-12 md:py-16 w-full border-b-4 border-black scroll-mt-24 overflow-hidden">
        {/* Section Watermark */}
        <div className="absolute right-0 top-6 pointer-events-none select-none z-0 opacity-[0.045] font-black text-[13vw] font-mono uppercase whitespace-nowrap text-[#FF8811]">
          VENTURE // 12-FACTOR VC
        </div>
        <div className="absolute left-6 bottom-3 pointer-events-none select-none z-0 text-[10px] font-black text-black/20 uppercase tracking-widest hidden md:block">
          [ 06 // CAP TABLE // PRE-SEED SAFE // RED-TEAM SIMULATOR ]
        </div>

        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#FF8811] text-white border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] mb-3">
              [ FOUNDER PROTOCOL // AUTONOMOUS VENTURE STUDIO ]
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black mb-3">
              THE FOUNDER'S COCKPIT: FROM REPO TO UNICORN
            </h2>
          <p className="text-xs md:text-sm font-bold text-gray-700 uppercase max-w-3xl mx-auto leading-relaxed">
            // ELITE ENGINEERS DON'T JUST CRUSH CODING INTERVIEWS — THEY LAUNCH VENTURE-BACKED STARTUPS. AUDIT YOUR PITCH DECK, SIMULATE BRUTAL VC RED-TEAMING, MODEL EQUITY DILUTION, AND PROVE INVESTOR READINESS.
          </p>
        </div>

        {/* Interactive Cockpit Command Center */}
        <div className="bg-white border-4 border-black shadow-[10px_10px_0px_#000] overflow-hidden mb-12">

          {/* Cockpit Window Titlebar */}
          <div className="bg-[#FAF8F5] border-b-4 border-black px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 bg-[#FF0033] border-2 border-black" />
              <div className="w-3.5 h-3.5 bg-[#FFDE59] border-2 border-black" />
              <div className="w-3.5 h-3.5 bg-[#CCFF00] border-2 border-black" />
              <span className="ml-3 text-xs font-black uppercase text-black">
                [ COCKPIT SIMULATOR // AI VENTURE EVALUATION ENGINE ]
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#CCFF00] border border-black text-[10px] font-black uppercase">
                STATUS: TELEMETRY ARMED
              </span>
              <span className="px-2 py-0.5 bg-black text-[#FFDE59] border border-black text-[10px] font-black uppercase">
                EVALUATION: 89/100
              </span>
            </div>
          </div>

          {/* Module Selector Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b-4 border-black bg-neutral-100">
            {[
              { id: 'pitch', label: '1. AI PITCH AUDITOR', icon: Mic, color: 'bg-[#FFDE59]' },
              { id: 'redteam', label: '2. VC RED TEAM GRILL', icon: Swords, color: 'bg-[#FF0033]' },
              { id: 'readiness', label: '3. INVESTOR READINESS', icon: Target, color: 'bg-[#00F0FF]' },
              { id: 'captable', label: '4. CAP TABLE DILUTION', icon: PieChart, color: 'bg-[#CCFF00]' }
            ].map((tab) => {
              const isActive = activeCockpitTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCockpitTab(tab.id)}
                  className={`p-3.5 border-r-2 last:border-r-0 border-b-2 md:border-b-0 border-black text-xs font-black uppercase flex items-center justify-center gap-2 transition-all ${isActive
                      ? `${tab.color} text-black font-black shadow-inner`
                      : 'bg-white text-gray-700 hover:bg-[#FAF8F5]'
                    }`}
                >
                  <Icon size={14} className="stroke-[2.5]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Cockpit Module Terminal Body */}
          <div className="p-6 md:p-8 bg-[#0C0C0C] text-white font-mono min-h-[340px] flex flex-col justify-between">
            {activeCockpitTab === 'pitch' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                  <span className="text-[#FFDE59] font-black uppercase">// AI PITCH TELEMETRY AUDIT // 3-MIN VIDEO ANALYSIS</span>
                  <span className="text-neutral-400">LATENCY: 120MS | MODEL: MULTI-MODAL AUDIO/VISION EVALUATOR</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-neutral-900 border border-neutral-700">
                    <span className="text-[10px] text-neutral-400 font-bold block mb-1 uppercase">SPEECH VELOCITY</span>
                    <span className="text-2xl font-black text-[#00F0FF]">142 WPM</span>
                    <span className="text-[10px] text-emerald-400 block mt-1">✓ OPTIMAL SILICON VALLEY CADENCE</span>
                  </div>
                  <div className="p-4 bg-neutral-900 border border-neutral-700">
                    <span className="text-[10px] text-neutral-400 font-bold block mb-1 uppercase">EYE CONTACT METRIC</span>
                    <span className="text-2xl font-black text-[#CCFF00]">94.2%</span>
                    <span className="text-[10px] text-emerald-400 block mt-1">✓ UNWAVERING CAMERA ENGAGEMENT</span>
                  </div>
                  <div className="p-4 bg-neutral-900 border border-neutral-700">
                    <span className="text-[10px] text-neutral-400 font-bold block mb-1 uppercase">NARRATIVE HOOK RETENTION</span>
                    <span className="text-2xl font-black text-[#FFDE59]">FIRST 18S</span>
                    <span className="text-[10px] text-yellow-300 block mt-1">✓ SOLVES VISCERAL HUMAN PROBLEM</span>
                  </div>
                </div>

                <div className="p-4 bg-neutral-900 border-l-4 border-[#FFDE59] text-xs leading-relaxed text-neutral-300 space-y-1">
                  <div className="text-white font-black uppercase">// AI FEEDBACK SUMMARY:</div>
                  <div>"Strong conviction in problem thesis and traction metrics. Slide 4 competition matrix requires defensibility hardening against frontier lab native features. Voice modulation shows zero hesitant filler words."</div>
                </div>
              </div>
            )}

            {activeCockpitTab === 'redteam' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                  <span className="text-[#FF0033] font-black uppercase">// BRUTAL VC RED-TEAM SIMULATOR // SEQUOIA & YC ARCHETYPE</span>
                  <span className="text-neutral-400">STRESS-TEST IN PROGRESS</span>
                </div>

                <div className="p-5 bg-neutral-900 border-2 border-[#FF0033] space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#FF0033] text-white text-[10px] font-black uppercase">
                      PARTNER-LEVEL VC INTERROGATION:
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white uppercase leading-relaxed">
                    "Assume Google or Meta trains a foundation model with your exact vertical workflow capabilities in their next release. Why doesn't your revenue evaporate overnight?"
                  </p>
                </div>

                <div className="p-4 bg-neutral-900 border-l-4 border-[#CCFF00] text-xs leading-relaxed text-neutral-300 space-y-1">
                  <div className="text-[#CCFF00] font-black uppercase">// TACTICAL WINNING COUNTER-DEFENSE:</div>
                  <div>"Base models lack customer data gravity, SOC2 enterprise integrations, and specialized real-time workflows. Our moat is proprietary local state and sub-ms latency guarantees, not the raw LLM weights."</div>
                </div>
              </div>
            )}

            {activeCockpitTab === 'readiness' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                  <span className="text-[#00F0FF] font-black uppercase">// INVESTOR READINESS RADAR // PRE-SEED & SEED CONVICTION</span>
                  <span className="text-[#CCFF00] font-black">OVERALL SCORE: 89 / 100</span>
                </div>

                <div className="space-y-3 text-xs">
                  {[
                    { metric: 'TECHNICAL DEFENSIBILITY & SPEED', score: 94, color: 'bg-[#CCFF00]' },
                    { metric: 'TOTAL ADDRESSABLE MARKET (TAM) EXPANSION', score: 85, color: 'bg-[#00F0FF]' },
                    { metric: 'UNIT ECONOMICS & CAPITAL EFFICIENCY', score: 91, color: 'bg-[#FFDE59]' },
                    { metric: 'FOUNDING TEAM EXECUTION VELOCITY', score: 96, color: 'bg-[#FF52D9]' }
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-black uppercase">
                        <span className="text-neutral-300">{item.metric}</span>
                        <span className="text-white">{item.score}%</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-2 overflow-hidden border border-neutral-700">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-neutral-900 border border-neutral-700 text-xs text-neutral-300 flex items-center justify-between">
                  <span className="text-[#CCFF00] font-black uppercase">VERDICT: TIER-1 VC SEED ELIGIBLE</span>
                  <span className="text-neutral-400">BENCHMARKED AGAINST 1,200+ YC & THIEL FOUNDERS</span>
                </div>
              </div>
            )}

            {activeCockpitTab === 'captable' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                  <span className="text-[#CCFF00] font-black uppercase">// CAP TABLE & SAFE DILUTION MODELING</span>
                  <span className="text-neutral-400">POST-MONEY CONVERTIBLE VALUATION</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
                  <div className="p-3 bg-neutral-900 border border-neutral-700">
                    <span className="text-[10px] text-neutral-400 block mb-1">FOUNDERS EQUITY</span>
                    <span className="text-xl font-black text-[#CCFF00]">72.5%</span>
                    <span className="text-[10px] text-neutral-500 block">POST SEED ROUND</span>
                  </div>
                  <div className="p-3 bg-neutral-900 border border-neutral-700">
                    <span className="text-[10px] text-neutral-400 block mb-1">SEED SAFE POOL</span>
                    <span className="text-xl font-black text-[#00F0FF]">$2.0M</span>
                    <span className="text-[10px] text-neutral-500 block">ON $12M POST CAP</span>
                  </div>
                  <div className="p-3 bg-neutral-900 border border-neutral-700">
                    <span className="text-[10px] text-neutral-400 block mb-1">EMPLOYEE POOL (ESOP)</span>
                    <span className="text-xl font-black text-[#FFDE59]">10.0%</span>
                    <span className="text-[10px] text-neutral-500 block">10X HIRES BUDGET</span>
                  </div>
                  <div className="p-3 bg-neutral-900 border border-neutral-700">
                    <span className="text-[10px] text-neutral-400 block mb-1">CASH RUNWAY</span>
                    <span className="text-xl font-black text-[#FF52D9]">26 MOS</span>
                    <span className="text-[10px] text-neutral-500 block">ZERO BANKRUPTCY RISK</span>
                  </div>
                </div>

                <div className="p-3 bg-neutral-900 border border-neutral-700 text-xs text-neutral-400">
                  // REAL-TIME WATERFALL PROJECTION: MAINTAINS FOUNDER CONTROL & &gt;60% OWNERSHIP AT SERIES A EXPANSION.
                </div>
              </div>
            )}

            {/* Terminal Action Footer */}
            <div className="pt-4 mt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-neutral-400 font-black uppercase">
                READY TO AUDIT YOUR STARTUP THESIS?
              </span>
              <Link
                to="/pitch"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#FFDE59] hover:bg-[#CCFF00] text-black font-black text-xs uppercase flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_#fff] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <span>[ 🚀 ENTER COMPLETE FOUNDER'S COCKPIT ]</span>
                <ArrowRight size={14} className="stroke-[3]" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Venture Studio Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#FFDE59] border-3 border-black flex items-center justify-center mb-5 shadow-[3px_3px_0px_#000]">
                <Mic size={24} className="stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black uppercase text-black mb-2">AI VIDEO PITCH AUDITOR</h3>
              <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed">
                Upload your 3-minute video pitch. Computer vision and audio models analyze cadence, eye contact, storytelling hooks, and investor cognitive retention.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t-2 border-black text-[11px] font-black uppercase text-gray-700">
              [ 98.4% RETENTION ACCURACY ]
            </div>
          </div>

          <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#FF0033] text-white border-3 border-black flex items-center justify-center mb-5 shadow-[3px_3px_0px_#000]">
                <Swords size={24} className="stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black uppercase text-black mb-2">BRUTAL VC RED TEAMING</h3>
              <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed">
                Simulates adversarial partner meetings from Benchmark, Sequoia & YC. Grills your unit economics, moat, churn rates, and commoditization risks.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t-2 border-black text-[11px] font-black uppercase text-gray-700">
              [ 0-FLUFF SKEPTICISM ]
            </div>
          </div>

          <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#00F0FF] border-3 border-black flex items-center justify-center mb-5 shadow-[3px_3px_0px_#000]">
                <Target size={24} className="stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black uppercase text-black mb-2">INVESTOR READINESS RADAR</h3>
              <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed">
                Multi-dimensional scoring across Technical Moat, TAM, Product-Market Fit velocity, and capital efficiency before stepping into partner meetings.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t-2 border-black text-[11px] font-black uppercase text-gray-700">
              [ BENCHMARKED VS 1,200+ YC SEEDS ]
            </div>
          </div>

          <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#CCFF00] border-3 border-black flex items-center justify-center mb-5 shadow-[3px_3px_0px_#000]">
                <PieChart size={24} className="stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black uppercase text-black mb-2">CAP TABLE & DILUTION</h3>
              <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed">
                Simulate post-money SAFEs, unallocated option pools, priced Series A dilution, and founder ownership waterfalls through multiple funding cycles.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t-2 border-black text-[11px] font-black uppercase text-gray-700">
              [ REAL-TIME DILUTION MODELING ]
            </div>
          </div>

          </div>
        </div>
      </section>

      {/* ═══ 8. TARGET AUDIENCE // WHO SHOULD JOIN ═══ */}
      <section className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-12 md:py-16 w-full border-b-4 border-black overflow-hidden">
        {/* Section Watermark */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2 pointer-events-none select-none z-0 opacity-[0.04] font-black text-[12vw] font-mono uppercase whitespace-nowrap">
          COHORT // BUILDERS
        </div>
        <div className="absolute left-6 top-3 pointer-events-none select-none z-0 text-[10px] font-black text-black/20 uppercase tracking-widest hidden md:block">
          [ 07 // CAMPUS // BOOTCAMP // QUANT DESK ]
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#00F0FF] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] mb-3">
              [ COHORT SPECIALIZATION ]
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black mb-3">
              TARGET AUDIENCE // WHO ACCELERATES HERE
            </h2>
            <p className="text-xs md:text-sm font-bold text-gray-700 uppercase max-w-2xl mx-auto">
              // DESIGNED FOR AMBITIOUS BUILDERS READY TO BRIDGE THE GAP BETWEEN TEXTBOOKS AND HIGH-VELOCITY TECH CAREERS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-[#00F0FF] border-3 border-black flex items-center justify-center mb-6 shadow-[3px_3px_0px_#000]">
                <GraduationCap size={28} className="stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-black uppercase text-black mb-1">
                CAMPUS ENGINEER
              </h3>
              <span className="text-xs font-black uppercase text-blue-700 block mb-4">
                B.TECH (CSE / IT / ECE) 2ND & 3RD YEAR
              </span>
              <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed mb-6">
                Seeking real software development skills beyond university theory. Wants to build production apps, conquer DSA gauntlets, and stand out in tier-1 campus placements.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-black">
              <span className="px-2.5 py-1 bg-[#FAF8F5] border border-black text-[10px] font-black uppercase">FOUNDATIONS</span>
              <span className="px-2.5 py-1 bg-[#FAF8F5] border border-black text-[10px] font-black uppercase">LIVE PROJECTS</span>
              <span className="px-2.5 py-1 bg-[#CCFF00] border border-black text-[10px] font-black uppercase text-black">PLACEMENTS</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-[#CCFF00] border-3 border-black flex items-center justify-center mb-6 shadow-[3px_3px_0px_#000]">
                <Code2 size={28} className="stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-black uppercase text-black mb-1">
                INDUSTRY ASPIRANT
              </h3>
              <span className="text-xs font-black uppercase text-emerald-800 block mb-4">
                BCA / LATERAL SWITCHERS / BOOTCAMP
              </span>
              <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed mb-6">
                Looking for an unfair competitive edge to rival top graduates. Focused on mastering modern frameworks, cloud deployments, and verified portfolio proofs.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-black">
              <span className="px-2.5 py-1 bg-[#FAF8F5] border border-black text-[10px] font-black uppercase">MODERN STACK</span>
              <span className="px-2.5 py-1 bg-[#FAF8F5] border border-black text-[10px] font-black uppercase">PORTFOLIO</span>
              <span className="px-2.5 py-1 bg-[#FFDE59] border border-black text-[10px] font-black uppercase text-black">LATERAL EDGE</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-[#FF52D9] border-3 border-black flex items-center justify-center mb-6 shadow-[3px_3px_0px_#000]">
                <Briefcase size={28} className="stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-black uppercase text-black mb-1">
                PRODUCT TARGETED
              </h3>
              <span className="text-xs font-black uppercase text-purple-800 block mb-4">
                MCA / HIGH-GROWTH UNICORN TARGETS
              </span>
              <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed mb-6">
                Aiming specifically for high-velocity product companies, quant dev desks, and frontier AI labs. Requires advanced systems programming and distributed architectures.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-black">
              <span className="px-2.5 py-1 bg-[#FAF8F5] border border-black text-[10px] font-black uppercase">SYSTEM DESIGN</span>
              <span className="px-2.5 py-1 bg-[#FAF8F5] border border-black text-[10px] font-black uppercase">SCALABILITY</span>
              <span className="px-2.5 py-1 bg-[#00F0FF] border border-black text-[10px] font-black uppercase text-black">QUANT READY</span>
            </div>
          </div>

          </div>
        </div>
      </section>


      {/* ═══ 9. HYPERS AGENTIC DISPATCH // THE ROLE PENDULUM: FDE vs GTM ENGINEER ═══ */}
      <AgenticRolePendulum />

      {/* ═══ 10. FREQUENTLY ASKED QUESTIONS // ZERO FLUFF ═══ */}
      <HomeFaqSection />

      {/* ═══ 11. BRUTALIST MEGA-FOOTER // COMPLETE PLATFORM DIRECTORY ═══ */}
      <footer className="relative bg-black text-white border-t-4 border-black pt-16 pb-12 px-4 sm:px-6 md:px-8 lg:px-10 w-full font-mono selection:bg-[#FFDE59] selection:text-black overflow-hidden">
        {/* Section Watermark */}
        <div className="absolute left-1/2 -translate-x-1/2 top-10 pointer-events-none select-none z-0 opacity-[0.05] font-black text-[12vw] font-mono uppercase whitespace-nowrap text-white">
          HYPERS // NETWORK
        </div>
        <div className="absolute left-6 top-4 pointer-events-none select-none z-0 text-[10px] font-black text-white/30 uppercase tracking-widest hidden md:block">
          [ 09 // PLATFORM DIRECTORY // RECURSIVE DISPATCH ]
        </div>

        <div className="w-full relative z-10">

          {/* Top Platform Ticker & Direct Launch CTAs */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-10 mb-14 border-b-2 border-neutral-800 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 bg-[#FFDE59] border-2 border-black flex items-center justify-center font-black text-black text-xl shadow-[3px_3px_0px_#fff]">
                H
              </div>
              <div>
                <span className="text-2xl font-black uppercase tracking-tight text-[#FFDE59] block">
                  HYPERS <span className="text-white">✱</span>
                </span>
                <span className="text-[11px] font-bold uppercase text-neutral-400 block tracking-wide">
                  AUTONOMOUS ENGINEERING SANDBOX // VENTURE STUDIO ACCELERATOR
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/ide"
                className="px-4 py-2.5 bg-[#CCFF00] hover:bg-[#FFDE59] text-black font-black text-xs uppercase border-2 border-white shadow-[3px_3px_0px_#fff] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
              >
                <Zap size={14} className="stroke-[3]" />
                <span>[ ⚡ LAUNCH WORKSPACE ]</span>
              </Link>
              <Link
                to="/pitch"
                className="px-4 py-2.5 bg-[#FF0033] hover:bg-[#FFDE59] text-white hover:text-black font-black text-xs uppercase border-2 border-white shadow-[3px_3px_0px_#fff] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
              >
                <Rocket size={14} className="stroke-[3]" />
                <span>[ 🚀 FOUNDER'S COCKPIT ]</span>
              </Link>
              <Link
                to="/courses"
                className="px-4 py-2.5 bg-white hover:bg-[#00F0FF] text-black font-black text-xs uppercase border-2 border-white shadow-[3px_3px_0px_#fff] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <span>[ 📚 ALL CURRICULA ]</span>
              </Link>
            </div>
          </div>

          {/* 5-Column Mega Directory Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-6 mb-16 text-xs">

            {/* Col 1: Hypers Workspace (Core & Compete) */}
            <div className="space-y-2.5">
              <div className="mb-4">
                <span className="text-[10px] font-black uppercase text-black bg-[#CCFF00] border border-black px-2 py-0.5 inline-block shadow-[2px_2px_0px_#fff]">
                  [ 01 // WORKSPACE COMPETE ]
                </span>
                <h4 className="text-sm font-black uppercase text-white mt-2">
                  HYPERS WORKSPACE
                </h4>
              </div>
              <div className="space-y-1.5 text-neutral-300 font-bold uppercase text-[11px]">
                <div><Link to="/ide" className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Hypers IDE & Sandbox</Link></div>
                <div><Link to="/contests" className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> 24 Arena Contests</Link></div>
                <div><Link to="/royale" className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Coding Royale Duels</Link></div>
                <div><Link to="/royale/leetcode" className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> LeetCode Gauntlet</Link></div>
                <div><Link to="/speed-coding" className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Speed Coding CLI</Link></div>
                <div><Link to="/practice" className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Coding Practice Track</Link></div>
                <div><Link to="/events" className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Hackathon War Room</Link></div>
                <div><Link to="/royale/rust-systems" className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Rust Systems Arena</Link></div>
                <div><Link to="/royale/kernel-hacking" className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Kernel Hacking Arena</Link></div>
                <div><Link to="/royale/system-design" className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> System Design Arena</Link></div>
                <div><Link to="/royale/kubernetes-cluster" className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Kubernetes Clusters</Link></div>
                <div><Link to="/royale/docker-builds" className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Docker Build Arena</Link></div>
              </div>
            </div>

            {/* Col 2: Workspace Career & Insights */}
            <div className="space-y-2.5">
              <div className="mb-4">
                <span className="text-[10px] font-black uppercase text-black bg-[#00F0FF] border border-black px-2 py-0.5 inline-block shadow-[2px_2px_0px_#fff]">
                  [ 02 // CAREER ACCELERATOR ]
                </span>
                <h4 className="text-sm font-black uppercase text-white mt-2">
                  CAREER & TALENT
                </h4>
              </div>
              <div className="space-y-1.5 text-neutral-300 font-bold uppercase text-[11px]">
                <div><Link to="/mock-interviews" className="hover:text-[#00F0FF] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> AI Mock Interviews</Link></div>
                <div><Link to="/resume" className="hover:text-[#00F0FF] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> AI Resume Optimization</Link></div>
                <div><Link to="/companies" className="hover:text-[#00F0FF] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Tier-1 Company Database</Link></div>
                <div><Link to="/recruitment" className="hover:text-[#00F0FF] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Mass Recruitment Hub</Link></div>
                <div><Link to="/magic-companies" className="hover:text-[#00F0FF] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Magic Companies Radar</Link></div>
                <div><Link to="/planner" className="hover:text-[#00F0FF] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> AI Autonomous Planner</Link></div>
                <div><Link to="/aptitude" className="hover:text-[#00F0FF] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Aptitude Challenges</Link></div>
                <div><Link to="/interview-qa" className="hover:text-[#00F0FF] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Interview Q&A Bank</Link></div>
                <div><Link to="/analytics" className="hover:text-[#00F0FF] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Talent Analytics Engine</Link></div>
                <div><Link to="/cold-dms" className="hover:text-[#00F0FF] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Cold DMs Studio</Link></div>
                <div><Link to="/dashboard" className="hover:text-[#00F0FF] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Quiz Metric Dashboard</Link></div>
                <div><Link to="/build-profile" className="hover:text-[#00F0FF] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Developer Profile Dossier</Link></div>
              </div>
            </div>

            {/* Col 3: Curricula & Multiple Courses */}
            <div className="space-y-2.5">
              <div className="mb-4">
                <span className="text-[10px] font-black uppercase text-black bg-[#FFDE59] border border-black px-2 py-0.5 inline-block shadow-[2px_2px_0px_#fff]">
                  [ 03 // ALL CURRICULA ]
                </span>
                <h4 className="text-sm font-black uppercase text-white mt-2">
                  COURSES & MASTERY
                </h4>
              </div>
              <div className="space-y-1.5 text-neutral-300 font-bold uppercase text-[11px]">
                <div><Link to="/courses" className="hover:text-[#FFDE59] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> All Curricula Directory</Link></div>
                <div><Link to="/ai-courses" className="hover:text-[#FFDE59] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> AI & Agentic Systems</Link></div>
                <div><Link to="/backend-courses" className="hover:text-[#FFDE59] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Backend Engineering</Link></div>
                <div><Link to="/database-courses" className="hover:text-[#FFDE59] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Database Architecture</Link></div>
                <div><Link to="/ui-courses" className="hover:text-[#FFDE59] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> UI/UX & Design Systems</Link></div>
                <div><Link to="/course/loop-engineering" className="hover:text-[#FFDE59] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Loop Engineering Track</Link></div>
                <div><Link to="/course/production-rag" className="hover:text-[#FFDE59] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Production RAG Systems</Link></div>
                <div><Link to="/course/forward-deployed-engineer" className="hover:text-[#FFDE59] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Forward Deployed AI</Link></div>
                <div><Link to="/course/graph-engineering" className="hover:text-[#FFDE59] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Graph Engineering</Link></div>
                <div><Link to="/cs-subjects" className="hover:text-[#FFDE59] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> CS Core Subjects (OS/CN)</Link></div>
                <div><Link to="/fundamentals" className="hover:text-[#FFDE59] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Language Fundamentals</Link></div>
                <div><Link to="/notes" className="hover:text-[#FFDE59] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Notes & Cheatsheets</Link></div>
                <div><Link to="/lld" className="hover:text-[#FFDE59] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Low Level Design (LLD)</Link></div>
                <div><Link to="/quizzes" className="hover:text-[#FFDE59] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Interactive CS Quizzes</Link></div>
                <div><Link to="/projects" className="hover:text-[#FFDE59] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Production Projects</Link></div>
              </div>
            </div>

            {/* Col 4: Founder's Workspace (Operations) */}
            <div className="space-y-2.5">
              <div className="mb-4">
                <span className="text-[10px] font-black uppercase text-black bg-[#FF8811] border border-black px-2 py-0.5 inline-block shadow-[2px_2px_0px_#fff]">
                  [ 04 // VENTURE OPERATIONS ]
                </span>
                <h4 className="text-sm font-black uppercase text-white mt-2">
                  FOUNDER'S COCKPIT
                </h4>
              </div>
              <div className="space-y-1.5 text-neutral-300 font-bold uppercase text-[11px]">
                <div><Link to="/pitch" className="hover:text-[#FF8811] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Founder Command Cockpit</Link></div>
                <div><Link to="/pitch?tab=tasks" className="hover:text-[#FF8811] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Active Sprint Kanban</Link></div>
                <div><Link to="/pitch?tab=team" className="hover:text-[#FF8811] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Team & Cap Table</Link></div>
                <div><Link to="/pitch?tab=meetings" className="hover:text-[#FF8811] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Founder War Room</Link></div>
                <div><Link to="/campaign/create" className="hover:text-[#FF8811] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Talent Sourcing Campaign</Link></div>
                <div><Link to="/candidate/1" className="hover:text-[#FF8811] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Candidate Scoring Lab</Link></div>
                <div><Link to="/explore" className="hover:text-[#FF8811] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Startup Ecosystem Radar</Link></div>
                <div><Link to="/talent-search" className="hover:text-[#FF8811] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Talent Search Matrix</Link></div>
                <div><Link to="/create-company" className="hover:text-[#FF8811] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Register Company Profile</Link></div>
                <div><Link to="/user-dashboard" className="hover:text-[#FF8811] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Founder Dashboard</Link></div>
                <div><Link to="/executive/ceo" className="hover:text-[#FF8811] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> C-Suite: CEO Andrei</Link></div>
                <div><Link to="/executive/cto" className="hover:text-[#FF8811] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> C-Suite: CTO Daria</Link></div>
                <div><Link to="/executive/cfo" className="hover:text-[#FF8811] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> C-Suite: CFO Ivan</Link></div>
              </div>
            </div>

            {/* Col 5: Founder's Workspace (9 AI Engines) */}
            <div className="space-y-2.5">
              <div className="mb-4">
                <span className="text-[10px] font-black uppercase text-white bg-[#FF0033] border border-black px-2 py-0.5 inline-block shadow-[2px_2px_0px_#fff]">
                  [ 05 // AI VENTURE STUDIO ]
                </span>
                <h4 className="text-sm font-black uppercase text-white mt-2">
                  9 AI VENTURE ENGINES
                </h4>
              </div>
              <div className="space-y-1.5 text-neutral-300 font-bold uppercase text-[11px]">
                <div><Link to="/pitch?tab=pitch-analyzer" className="hover:text-[#FF0033] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> AI Video Pitch Analyzer</Link></div>
                <div><Link to="/pitch?tab=failure-analysis" className="hover:text-[#FF0033] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Brutal Failure Red-Team</Link></div>
                <div><Link to="/pitch?tab=startup-eval" className="hover:text-[#FF0033] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> 12-Factor Startup Eval</Link></div>
                <div><Link to="/pitch?tab=interview-sim" className="hover:text-[#FF0033] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Investor Interview Sim</Link></div>
                <div><Link to="/pitch?tab=pitch-deck" className="hover:text-[#FF0033] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Pitch Deck Slide Audit</Link></div>
                <div><Link to="/pitch?tab=startup-validation" className="hover:text-[#FF0033] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Problem Validation Engine</Link></div>
                <div><Link to="/pitch?tab=readiness-score" className="hover:text-[#FF0033] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Investor Readiness Score</Link></div>
                <div><Link to="/pitch?tab=roadmap-generator" className="hover:text-[#FF0033] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> 90-Day GTM Roadmap</Link></div>
                <div><Link to="/pitch?tab=fundraising-sim" className="hover:text-[#FF0033] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> SAFE & Round Dilution</Link></div>
                <div><Link to="/pitch" className="hover:text-[#FF0033] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Cap Table Waterfall Model</Link></div>
                <div><Link to="/pitch?tab=pitch-analyzer" className="hover:text-[#FF0033] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> Video Stream Evaluator</Link></div>
                <div><Link to="/pitch?tab=failure-analysis" className="hover:text-[#FF0033] transition-colors flex items-center gap-1"><span className="text-neutral-600">›</span> YC / Sequoia Stress Test</Link></div>
              </div>
            </div>

          </div>

          {/* Sub-footer Status & Telemetry Bar */}
          <div className="pt-8 border-t-2 border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold uppercase text-neutral-400">
            <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
              <span className="text-white font-black">&copy; 2026 HYPERS PLATFORM. ALL RIGHTS RESERVED.</span>
              <span className="hidden md:inline text-neutral-600">//</span>
              <span className="text-[#CCFF00]">● 24 ARENAS + 9 AI VENTURE CLUSTERS ARMED</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-[10px] text-white">[ SOC-2 READY ]</span>
              <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-[10px] text-white">[ ZERO DATA RETENTION ]</span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-3 py-1 bg-[#FFDE59] text-black font-black text-[11px] uppercase border border-black shadow-[2px_2px_0px_#fff] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                [ ↑ TOP ]
              </button>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}