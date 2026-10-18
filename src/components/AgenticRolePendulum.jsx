import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, Brain, Terminal, Rocket, CheckCircle2, AlertTriangle,
  ArrowRight, Activity, Cpu, Sparkles, RefreshCw,
  ChevronRight, Shield, Code2, Flame, Users, Target, Layers,
  Database, Bot, Wrench, TrendingUp, ExternalLink, ArrowDown
} from 'lucide-react';

export default function AgenticRolePendulum() {
  const [selectedRole, setSelectedRole] = useState('fde');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'workflow' | 'simulator'
  const [simRunning, setSimRunning] = useState(false);
  const [simOutput, setSimOutput] = useState(null);

  const roles = [
    {
      id: 'fde',
      name: 'Forward Deployed Engineer',
      shortTitle: 'FDE',
      tagSubtitle: 'ROLE 01 // SYS',
      compShort: '$190 - 340k',
      compFull: '$190,000 - $340,000 + 0.25% - 0.75% Equity',
      color: '#FFB3BA', // Pastel pink/coral like KOTA tag
      badgeBg: 'bg-[#FFB3BA]',
      textColor: 'text-[#8A1C2C]',
      animName: 'pendulum-swing-1',
      animDuration: '3.6s',
      rotationInit: '-4deg',
      hiringStartups: ['OpenAI', 'Anthropic', 'Scale AI', 'Palantir', 'LangChain', 'Cognition'],
      tagline: 'THE ARCHITECT ON THE CUSTOMER FRONT LINES',
      description: 'Embedded directly with enterprise engineering leaders to deploy, debug, and optimize production systems under live fire.',
      dailyFireDrill: 'An enterprise client’s air-gapped Kubernetes cluster is dropping 14% of streaming inference chunks. The CEO is on a flight to sign an $850k contract. You have 3 hours. You write an eBPF trace probe, diagnose socket buffer exhaustion, patch their service mesh, and verify with synthetic payloads.',
      agentPowers: [
        { title: 'Bespoke SDK Ingestion', desc: 'Hypers scans the target startup’s public SDKs, RPC interfaces, and open GitHub issues to auto-generate integration blueprints.' },
        { title: 'Air-Gapped Sandbox Triage', desc: 'Prepares you with real Docker/K8s broken environments where you diagnose network partitions and socket leaks under a 45-min clock.' },
        { title: 'Proof-of-Work PR Synthesis', desc: 'Generates a production-grade working client integration PR you can hand directly to the VP of Engineering before your first screen.' },
        { title: 'Adversarial CTO Defense', desc: 'AI simulates an aggressive startup CTO probing your architectural trade-offs, fault tolerance, and data residency decisions.' }
      ],
      simScenario: 'Scale AI Client VPC Deployment (gRPC Payload Drop Triage)',
      simSteps: [
        'Ingested target startup public SDK and gRPC protobuf definitions.',
        'Simulated client VPC environment: Identified 12.4% TCP packet drop at ingress proxy under load.',
        'Synthesized eBPF socket trace probe to isolate kernel buffer backpressure.',
        'Synthesized Hotfix PR: Tuned HTTP/2 keepalive & streaming flow-control window.',
        'Generated Executive Architectural Defense Brief ready for founder interview presentation.'
      ],
      simVerdict: 'PASS // 98.4% TECHNICAL CONFIDENCE SCORE',
      simArtifact: 'github.com/hypers-fde-pow/ebpf-grpc-hotfix-suite'
    },
    {
      id: 'gtm',
      name: 'GTM Engineer',
      shortTitle: 'GTM ENG',
      tagSubtitle: 'ROLE 02 // REV',
      compShort: '$160 - 280k',
      compFull: '$160,000 - $280,000 + Uncapped Pipeline Carry',
      color: '#BAE1FF', // Pastel blue like DROP YEAR tag
      badgeBg: 'bg-[#BAE1FF]',
      textColor: 'text-[#104E8B]',
      animName: 'pendulum-swing-2',
      animDuration: '4.1s',
      rotationInit: '3deg',
      hiringStartups: ['Clay', 'Supabase', 'Vercel', 'Retool', 'Cursor', 'Warp', 'Resend'],
      tagline: 'CODE THAT GENERATES PIPELINE. NOT ANOTHER SALES HIRE.',
      description: 'Replace manual SDRs with autonomous scraping, webhook orchestration, and developer micro-tools that book qualified demos.',
      dailyFireDrill: 'Traditional outbound SDRs are failing. In 48 hours, you build a headless scraping agent that listens to tech layoffs, scans GitHub PRs, enriches data via private APIs, and books 35 qualified enterprise demos per week with zero human intervention.',
      agentPowers: [
        { title: 'Headless Browser Orchestration', desc: 'Teaches production Puppeteer/Playwright stealth automation, queue choreography, and webhook pipeline resilience.' },
        { title: 'Private API Reverse Engineering', desc: 'Prepares you for the 60-minute live interview drill where founders ask you to reverse-engineer lead enrichment endpoints on the fly.' },
        { title: 'Proof of Distribution Repos', desc: 'Builds a working outbound enrichment pipeline showing $180k+ in projected pipeline leverage within 14 days of joining.' },
        { title: 'Founder Reverse-Pitch Engine', desc: 'Synthesizes bespoke outbound intelligence that proves to founders you understand their ICP better than their existing sales team.' }
      ],
      simScenario: 'Autonomous Inbound Pipeline Generator (Clay + GitHub Scraping Agent)',
      simSteps: [
        'Ingested target startup ICP criteria: Filtered 2,400 Series-A CTOs with active hiring posts on X.',
        'Built Headless Scraper Bot: Reverse-engineered GitHub commit history to spot teams rewriting backends in Rust.',
        'Deployed Webhook Engine: Generated personalized demo sandbox links dynamically embedded in founder DMs.',
        'Modeled Pipeline Impact: Projected $210,000 in generated enterprise pipeline in 14 days.',
        'Synthesized working demo repo with automated CI/CD pipeline.'
      ],
      simVerdict: 'PASS // UNPRECEDENTED COMMERCIAL LEVERAGE',
      simArtifact: 'github.com/hypers-gtm-pow/autonomous-github-icp-pipeline'
    },
    {
      id: 'ai',
      name: 'Applied AI Engineer',
      shortTitle: 'APPLIED AI',
      tagSubtitle: 'ROLE 03 // LLM',
      compShort: '$200 - 360k',
      compFull: '$200,000 - $360,000 + 0.3% - 1.0% Equity Grant',
      color: '#FFE066', // Warm yellow like BTECH tag
      badgeBg: 'bg-[#FFE066]',
      textColor: 'text-[#8A6D0B]',
      animName: 'pendulum-swing-3',
      animDuration: '3.3s',
      rotationInit: '-2deg',
      hiringStartups: ['Perplexity', 'Cursor', 'Mistral', 'Together AI', 'LangChain', 'ElevenLabs'],
      tagline: 'PRODUCTION LLM SYSTEMS THAT DO NOT HALLUCINATE.',
      description: 'Fine-tuning, automated evals, DSPy prompt compilation, and low-latency inference pipelines. Ship models that work.',
      dailyFireDrill: 'Your multi-agent customer support router hallucinates on 8% of edge-case billing queries. Token costs exploded 4x. You implement DSPy prompt optimization, deploy an automated evaluation harness, and switch to speculative decoding with an open-source distilled SLM.',
      agentPowers: [
        { title: 'DSPy & Prompt Compilation', desc: 'Master programmatic prompt optimization, metric-driven evals, and eliminating fragile few-shot string engineering.' },
        { title: 'Eval Harness Blueprinting', desc: 'Build production evaluation pipelines with synthetic edge-cases, LLM-as-a-judge rubrics, and automated regression guards.' },
        { title: 'Low-Latency Speculative Decoding', desc: 'Simulate inference optimization drills reducing TTFT (Time-to-First-Token) by 65% with vLLM and TensorRT-LLM.' },
        { title: 'Multi-Agent State Machines', desc: 'Synthesizes production LangGraph / Autogen workflows with human-in-the-loop escalation and transactional state safety.' }
      ],
      simScenario: 'Production RAG Hallucination Regression & Eval Suite',
      simSteps: [
        'Loaded company knowledge graph & 10,000 synthetic adversarial user queries.',
        'Identified 8.2% semantic hallucination rate on multi-hop regulatory compliance questions.',
        'Compiled DSPy Teleprompter pipeline: Replaced static prompts with optimized dynamic chain-of-thought vectors.',
        'Integrated speculative decoding with an 8B distilled verification model: Reduced token cost by 73%.',
        'Deployed automated CI/CD regression test ensuring hallucination rate remains < 0.4%.'
      ],
      simVerdict: 'PASS // 99.1% ACCURACY EVALUATION',
      simArtifact: 'github.com/hypers-ai-pow/dspy-eval-regression-suite'
    },
    {
      id: 'sa',
      name: 'Solutions Architect',
      shortTitle: 'SOLUTIONS ARCH',
      tagSubtitle: 'ROLE 04 // SCALE',
      compShort: '$175 - 300k',
      compFull: '$175,000 - $300,000 + Performance Bonus',
      color: '#A0E7E5', // Mint green / teal like CAT tag
      badgeBg: 'bg-[#A0E7E5]',
      textColor: 'text-[#0D6B68]',
      animName: 'pendulum-swing-4',
      animDuration: '3.9s',
      rotationInit: '4deg',
      hiringStartups: ['Databricks', 'AWS', 'Snowflake', 'Cloudflare', 'Confluent', 'MongoDB'],
      tagline: 'DESIGN ARCHITECTURES THAT CLOSE 7-FIGURE CONTRACTS.',
      description: 'Multi-region cloud architectures, Fortune 500 migrations, and zero-trust security that satisfies enterprise compliance.',
      dailyFireDrill: 'A Fortune 100 bank wants to migrate their on-premise Kafka pipeline to your managed cloud platform. Their compliance team demands zero-trust data residency, SOC2 Type II isolation, and sub-5ms cross-region disaster recovery.',
      agentPowers: [
        { title: 'Enterprise Cloud Blueprints', desc: 'Design zero-trust VPC peering, multi-region failover, and high-throughput messaging topologies that satisfy strict enterprise audits.' },
        { title: 'Total Cost of Ownership (TCO) Modeling', desc: 'Build financial engineering spreadsheets and cloud spend arbitrage models that justify 7-figure contract sizes.' },
        { title: 'Whiteboard Defense Simulations', desc: 'Simulates grueling enterprise procurement panels grilling your architecture on disaster recovery and latency SLAs.' },
        { title: 'Architecture Decision Records (ADR)', desc: 'Generates institutional-grade ADR documentation that proves technical mastery before the technical interview begins.' }
      ],
      simScenario: 'Multi-Region Zero-Trust Cloud Architecture Migration',
      simSteps: [
        'Analyzed legacy on-premise Kafka topology: 450,000 msg/sec with strict data-residency mandates.',
        'Architected Multi-Cloud VPC peering with private Link endpoints and mTLS mutual authentication.',
        'Formulated Disaster Recovery Failover Topology with automated RPO < 1s and RTO < 30s.',
        'Compiled TCO Financial Model showing $1.4M annual cloud spend savings.',
        'Generated full Architecture Decision Record (ADR-042) ready for executive sign-off.'
      ],
      simVerdict: 'PASS // 100% ENTERPRISE COMPLIANCE',
      simArtifact: 'github.com/hypers-sa-pow/multi-region-zero-trust-adr'
    }
  ];

  const currentRole = roles.find(r => r.id === selectedRole) || roles[0];

  const handleRunSimulation = (roleObj) => {
    setSimRunning(true);
    setSimOutput(null);

    setTimeout(() => {
      setSimOutput({
        role: roleObj.name,
        scenario: roleObj.simScenario,
        steps: roleObj.simSteps,
        verdict: roleObj.simVerdict,
        artifact: roleObj.simArtifact
      });
      setSimRunning(false);
    }, 850);
  };

  return (
    <section id="agentic-roles" className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-12 md:py-16 w-full border-b-4 border-black bg-[#FAF8F5] overflow-hidden font-mono select-none">
      
      {/* Background Subtle Grid (Matches user reference style) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* ═══ TOP HANGING COUNTER BANNER (MATCHES REFERENCE IMAGE) ═══ */}
        <div className="border-4 border-black bg-white shadow-[8px_8px_0px_#000] mb-10 overflow-hidden relative">
          
          {/* Top Wooden / Metallic Suspension Beam */}
          <div className="h-4 sm:h-5 bg-[#3B2212] border-b-3 border-black w-full shadow-[0_2px_4px_rgba(0,0,0,0.4)] flex items-center justify-between px-4">
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFDE59]" />
            </div>
            <span className="text-[9px] font-black uppercase text-amber-200/80 tracking-widest hidden sm:block">
              SUSPENSION RAIL // 4 FRONTIER STARTUP ROLES // REAL-TIME INTERACTIVE COUNTER
            </span>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF0033]" />
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* ═══ LEFT: HANGING PENDULUM TAGS (FDE, GTM ENG, APPLIED AI, SOLUTIONS ARCH) ═══ */}
            <div className="w-full lg:w-auto flex items-start justify-center gap-3 sm:gap-4 md:gap-5 overflow-x-auto pb-4 pt-1">
              {roles.map((role, idx) => {
                const isSelected = selectedRole === role.id;
                return (
                  <div
                    key={role.id}
                    onClick={() => {
                      setSelectedRole(role.id);
                      setSimOutput(null);
                    }}
                    className="flex flex-col items-center cursor-pointer group shrink-0 transition-transform duration-200 hover:scale-105"
                    style={{
                      transformOrigin: 'top center',
                      animation: `${role.animName} ${role.animDuration} ease-in-out infinite alternate`,
                    }}
                  >
                    {/* Hanging String from Top Beam to Grommet */}
                    <div className="w-[2.5px] h-7 sm:h-9 bg-black" />

                    {/* The Luggage / Price Tag Shape */}
                    <div className={`relative transition-all duration-200 ${isSelected ? 'scale-105' : 'hover:opacity-95'}`}>
                      
                      {/* SVG Tag with chamfered shoulders & grommet hole */}
                      <svg 
                        viewBox="0 0 130 155" 
                        className={`w-24 sm:w-28 md:w-32 h-28 sm:h-34 md:h-38 transition-all ${
                          isSelected ? 'drop-shadow-[5px_5px_0px_#000]' : 'drop-shadow-[3px_3px_0px_rgba(0,0,0,0.6)]'
                        }`}
                      >
                        {/* Chamfered tag polygon */}
                        <polygon 
                          points="24,0 106,0 130,24 130,155 0,155 0,24" 
                          fill={role.color} 
                          stroke="#000000" 
                          strokeWidth="3.5" 
                        />
                        {/* Grommet hole */}
                        <circle cx="65" cy="12" r="4.5" fill="#000000" />
                        
                        {/* Selected Indicator Outline */}
                        {isSelected && (
                          <polygon 
                            points="26,3 104,3 127,26 127,152 3,152 3,26" 
                            fill="none" 
                            stroke="#000000" 
                            strokeWidth="1.5" 
                            strokeDasharray="4 2" 
                          />
                        )}
                      </svg>

                      {/* Content Placed Over The Tag */}
                      <div className="absolute inset-0 pt-4 pb-2 px-2 flex flex-col items-center justify-between text-center pointer-events-none select-none">
                        
                        {/* Small Top Text (e.g. ROLE 01 // SYS) */}
                        <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-black/75 mt-1">
                          {role.tagSubtitle}
                        </span>

                        {/* Punchy Title */}
                        <div className="my-auto py-1">
                          <h3 className="text-xs sm:text-sm md:text-base font-black uppercase text-black tracking-tight leading-tight">
                            {role.shortTitle}
                          </h3>
                        </div>

                        {/* Dashed Separator */}
                        <div className="w-4/5 border-t-2 border-dashed border-black/40 my-0.5" />

                        {/* Metric / Comp */}
                        <span className="text-[10px] sm:text-xs font-black text-black">
                          {role.compShort}
                        </span>

                      </div>

                    </div>

                    {/* Active Underline Pill */}
                    <div className="mt-2 h-5">
                      {isSelected ? (
                        <span className="px-2 py-0.5 bg-black text-[#CCFF00] text-[9px] font-black uppercase border border-black shadow-[1px_1px_0px_#000] inline-block animate-bounce">
                          ▲ ACTIVE
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-neutral-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                          CLICK
                        </span>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

            {/* ═══ RIGHT: PUNCHY COPY & EXPLORE BUTTON (MATCHES REFERENCE IMAGE) ═══ */}
            <div className="w-full lg:max-w-xl text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-black leading-tight mb-3">
                THESE 4 ROLES PAY $160K-$360K. HYPERS GETS YOU HIRED.
              </h2>
              
              <p className="text-xs sm:text-sm font-bold text-neutral-700 uppercase leading-relaxed mb-6">
                Each tag on this counter is a high-comp startup role. Generic LeetCode prep will not get you in. Hypers builds your proof-of-work, reverse-pitches founders, and prepares you for the exact interview gauntlet.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('role-inspector');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-[#00875A] hover:bg-[#006644] text-white font-black text-xs uppercase border-2 border-black rounded-full shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>[ SEE HOW HYPERS CRACKS EACH ROLE ]</span>
                  <ArrowDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* Source attribution line like the image */}
              <div className="mt-6 pt-3 border-t border-neutral-200 text-[10px] font-bold text-neutral-500 uppercase tracking-wide">
                Compensation ranges: Levels.fyi, Wellfound, YC Founder Hiring Index, 2026
              </div>

            </div>

          </div>

        </div>

        {/* ═══ INTERACTIVE ROLE COMMAND CENTER & AGENTIC PLAYBOOK ═══ */}
        <div id="role-inspector" className="border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_#000] scroll-mt-6">
          
          {/* Top Bar for Selected Role */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b-3 border-black gap-4 mb-6">
            
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 border-3 border-black flex items-center justify-center font-black text-black shadow-[3px_3px_0px_#000]"
                style={{ backgroundColor: currentRole.color }}
              >
                <Terminal size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-black text-white">
                    {currentRole.tagSubtitle}
                  </span>
                  <span className="text-xs font-black uppercase text-neutral-500">
                    TARGET COMP: {currentRole.compFull}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-black tracking-tight mt-0.5">
                  {currentRole.name} ({currentRole.shortTitle})
                </h3>
              </div>
            </div>

            {/* Quick Action Navigation Tabs */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 sm:flex-none px-4 py-2 border-2 border-black text-xs font-black uppercase transition-all shadow-[2px_2px_0px_#000] active:translate-y-0.5 ${
                  activeTab === 'overview' ? 'bg-black text-[#CCFF00]' : 'bg-white hover:bg-neutral-100 text-black'
                }`}
              >
                [ OVERVIEW & REALITY ]
              </button>
              <button
                onClick={() => setActiveTab('workflow')}
                className={`flex-1 sm:flex-none px-4 py-2 border-2 border-black text-xs font-black uppercase transition-all shadow-[2px_2px_0px_#000] active:translate-y-0.5 ${
                  activeTab === 'workflow' ? 'bg-black text-[#CCFF00]' : 'bg-white hover:bg-neutral-100 text-black'
                }`}
              >
                [ AGENTIC PLAYBOOK ]
              </button>
              <button
                onClick={() => {
                  setActiveTab('simulator');
                  if (!simOutput) handleRunSimulation(currentRole);
                }}
                className={`flex-1 sm:flex-none px-4 py-2 border-2 border-black text-xs font-black uppercase transition-all shadow-[2px_2px_0px_#000] active:translate-y-0.5 ${
                  activeTab === 'simulator' ? 'bg-[#CCFF00] text-black' : 'bg-white hover:bg-neutral-100 text-black'
                }`}
              >
                [ LIVE SIMULATOR ]
              </button>
            </div>

          </div>

          {/* TAB 1: OVERVIEW & REALITY */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Daily Fire Drill Box */}
              <div className="p-5 bg-[#FAF8F5] border-3 border-black shadow-[4px_4px_0px_#000]">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-red-600 mb-2">
                  <AlertTriangle size={16} className="stroke-[3]" />
                  <span>THE REALITY: WHAT FOUNDERS EVALUATE IN THE FIRST 10 MINUTES</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-neutral-800 uppercase leading-relaxed">
                  "{currentRole.dailyFireDrill}"
                </p>
              </div>

              {/* Grid: Companies Hiring & Target Comps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="p-4 border-2 border-black bg-white shadow-[3px_3px_0px_#000]">
                  <span className="text-[10px] font-black uppercase text-neutral-500 block mb-1">
                    STARTUPS AGGRESSIVELY HIRING THIS ROLE:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentRole.hiringStartups.map((co) => (
                      <span key={co} className="px-3 py-1 bg-[#FAF8F5] border border-black text-xs font-black uppercase">
                        {co}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 border-2 border-black bg-white shadow-[3px_3px_0px_#000]">
                  <span className="text-[10px] font-black uppercase text-neutral-500 block mb-1">
                    TOTAL ESTIMATED COMPENSATION BAND:
                  </span>
                  <span className="text-xl font-black text-black block mt-1">
                    {currentRole.compFull}
                  </span>
                  <span className="text-[11px] font-bold text-neutral-600 uppercase block mt-1">
                    Tier-1 US & Global Remote Ventures (Series A through Growth)
                  </span>
                </div>

              </div>

              {/* 4 Agent Powers Snapshot */}
              <div>
                <span className="text-xs font-black uppercase text-black block mb-3">
                  HOW HYPERS AUTONOMOUSLY CRACKS THIS INTERVIEW:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentRole.agentPowers.map((pow, i) => (
                    <div key={i} className="p-3.5 bg-[#FAF8F5] border-2 border-black flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-black stroke-[3] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-black uppercase text-black block">{pow.title}</span>
                        <p className="text-[11px] font-bold text-neutral-700 uppercase leading-relaxed mt-0.5">{pow.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: AGENTIC PLAYBOOK */}
          {activeTab === 'workflow' && (
            <div className="space-y-6">
              
              <div className="p-4 bg-[#FAF8F5] border-2 border-black text-xs font-black uppercase">
                // 4-STAGE AGENTIC ACCELERATION PIPELINE FOR {currentRole.name.toUpperCase()}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                <div className="p-4 border-2 border-black bg-white shadow-[3px_3px_0px_#000]">
                  <div className="w-7 h-7 bg-black text-white font-black text-xs flex items-center justify-center mb-3">
                    01
                  </div>
                  <h4 className="text-xs font-black uppercase text-black mb-1">
                    STARTUP INTEL INGESTION
                  </h4>
                  <p className="text-[11px] font-bold text-neutral-600 uppercase leading-relaxed">
                    Scans their public repositories, engineering blogs, and founder interviews to detect unaddressed architectural and product debt.
                  </p>
                </div>

                <div className="p-4 border-2 border-black bg-white shadow-[3px_3px_0px_#000]">
                  <div 
                    className="w-7 h-7 font-black text-xs flex items-center justify-center mb-3 border border-black text-black"
                    style={{ backgroundColor: currentRole.color }}
                  >
                    02
                  </div>
                  <h4 className="text-xs font-black uppercase text-black mb-1">
                    PROOF-OF-WORK CODE
                  </h4>
                  <p className="text-[11px] font-bold text-neutral-600 uppercase leading-relaxed">
                    Auto-synthesizes a tailored GitHub repository with working code, unit tests, and system benchmarks solving that exact startup's bottleneck.
                  </p>
                </div>

                <div className="p-4 border-2 border-black bg-white shadow-[3px_3px_0px_#000]">
                  <div className="w-7 h-7 bg-[#FFDE59] text-black font-black text-xs flex items-center justify-center mb-3 border border-black">
                    03
                  </div>
                  <h4 className="text-xs font-black uppercase text-black mb-1">
                    ADVERSARIAL GAUNTLET
                  </h4>
                  <p className="text-[11px] font-bold text-neutral-600 uppercase leading-relaxed">
                    AI agents simulate strict founding engineers grilling you on live edge-cases, throughput limitations, and architectural tradeoffs.
                  </p>
                </div>

                <div className="p-4 border-2 border-black bg-white shadow-[3px_3px_0px_#000]">
                  <div className="w-7 h-7 bg-[#CCFF00] text-black font-black text-xs flex items-center justify-center mb-3 border border-black">
                    04
                  </div>
                  <h4 className="text-xs font-black uppercase text-black mb-1">
                    FOUNDER INBOUND HOOK
                  </h4>
                  <p className="text-[11px] font-bold text-neutral-600 uppercase leading-relaxed">
                    Hypers crafts a high-converting executive brief sent directly to the CTO with the code repository attached, skipping recruiters completely.
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: LIVE SIMULATOR CONSOLE */}
          {activeTab === 'simulator' && (
            <div className="bg-black text-white p-6 border-3 border-black shadow-[6px_6px_0px_#000]">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-neutral-800 gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF0033]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFDE59]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#CCFF00]" />
                  <span className="text-xs font-black uppercase text-neutral-400 ml-2">
                    HYPERS // {currentRole.shortTitle} AGENTIC CRUCIBLE RUNTIME
                  </span>
                </div>

                <button
                  onClick={() => handleRunSimulation(currentRole)}
                  disabled={simRunning}
                  className="px-4 py-1.5 bg-[#CCFF00] hover:bg-white text-black font-black text-xs uppercase border border-black active:translate-y-0.5 transition-all flex items-center gap-1.5"
                >
                  <RefreshCw size={13} className={simRunning ? "animate-spin" : ""} />
                  <span>[ RE-RUN {currentRole.shortTitle} SIMULATION ]</span>
                </button>
              </div>

              {simRunning ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <RefreshCw size={30} className="animate-spin text-[#CCFF00] mb-3" />
                  <span className="text-xs font-black uppercase text-[#CCFF00] tracking-widest block">
                    [ EXECUTING AGENTIC RECONNAISSANCE FOR {currentRole.name.toUpperCase()} ]
                  </span>
                  <span className="text-[11px] font-bold text-neutral-500 uppercase mt-1">
                    SYNTHESIZING PROOF-OF-WORK REPOSITORY & ARCHITECTURAL BRIEF
                  </span>
                </div>
              ) : simOutput ? (
                <div className="space-y-4">
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-neutral-900 border border-neutral-800">
                    <div>
                      <span className="text-[10px] font-black uppercase text-neutral-400 block">SCENARIO:</span>
                      <span className="text-sm font-black text-[#FFDE59] uppercase">{simOutput.scenario}</span>
                    </div>
                    <div className="px-3 py-1 bg-[#CCFF00] text-black font-black text-xs uppercase">
                      {simOutput.verdict}
                    </div>
                  </div>

                  <div className="space-y-2 py-2">
                    <span className="text-xs font-black uppercase text-neutral-400 block">
                      AGENTIC AUDIT LOG:
                    </span>
                    {simOutput.steps.map((st, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-mono text-neutral-300">
                        <span className="text-[#CCFF00]">➜</span>
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <span className="text-neutral-400">
                      GENERATED PROOF-OF-WORK ARTIFACT: <span className="text-[#00F0FF] underline cursor-pointer">{simOutput.artifact}</span>
                    </span>
                    <span className="px-2.5 py-1 bg-neutral-800 text-[#FFDE59] uppercase font-black text-[10px]">
                      READY TO SEND DIRECTLY TO FOUNDER / CTO
                    </span>
                  </div>

                </div>
              ) : (
                <div className="py-10 text-center">
                  <Cpu size={32} className="mx-auto text-neutral-600 mb-3" />
                  <p className="text-xs font-bold text-neutral-400 uppercase max-w-lg mx-auto">
                    CLICK "[ RE-RUN {currentRole.shortTitle} SIMULATION ]" TO EXECUTE HYPERS' AUTONOMOUS RECONNAISSANCE FOR THIS ROLE.
                  </p>
                </div>
              )}

            </div>
          )}

            <div className="mt-8 pt-6 border-t-3 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-sm font-black uppercase text-black block">
                BUILD A {currentRole.shortTitle} PROOF-OF-WORK IN 15 MINUTES.
              </span>
              <span className="text-xs font-bold text-neutral-600 uppercase">
                ZERO COMMITMENTS. NO CREDIT CARD. START BUILDING NOW.
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                to="/ide"
                className="w-full sm:w-auto px-6 py-3 bg-[#CCFF00] hover:bg-[#FFDE59] text-black border-2 border-black font-black text-xs uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
              >
                <Zap size={15} className="stroke-[3]" />
                <span>[ BUILD {currentRole.shortTitle} PROOF-OF-WORK NOW ]</span>
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Embedded Keyframe Styles for Realistic Pendulum Oscillation */}
      <style>{`
        @keyframes pendulum-swing-1 {
          0% { transform: rotate(-5deg); }
          50% { transform: rotate(4deg); }
          100% { transform: rotate(-5deg); }
        }
        @keyframes pendulum-swing-2 {
          0% { transform: rotate(4deg); }
          50% { transform: rotate(-5deg); }
          100% { transform: rotate(4deg); }
        }
        @keyframes pendulum-swing-3 {
          0% { transform: rotate(-4deg); }
          50% { transform: rotate(5deg); }
          100% { transform: rotate(-4deg); }
        }
        @keyframes pendulum-swing-4 {
          0% { transform: rotate(5deg); }
          50% { transform: rotate(-3deg); }
          100% { transform: rotate(5deg); }
        }
      `}</style>

    </section>
  );
}
