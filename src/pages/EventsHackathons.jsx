import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, Target, Zap, Clock, Users, Shield, Rocket, CheckCircle2, 
  AlertTriangle, Copy, Check, Terminal, ExternalLink, Sparkles, 
  Brain, Code2, Cpu, ChevronRight, Layers, Flame, FileText, 
  Play, Swords, ArrowRight, BarChart3, HelpCircle, Compass
} from 'lucide-react';

// Preset Target Hackathons with battle-tested tactical intelligence
const PRESET_HACKATHONS = [
  {
    id: 'sih',
    title: 'Smart India Hackathon (SIH 2026)',
    organizer: 'Govt of India / MoE / AICTE',
    track: 'GovTech, Public Digital Goods & Rural Scalability',
    duration: '36 Hours',
    teamSize: '6 Members (Mandatory Diversity)',
    prize: '₹1,00,000 / Problem Statement',
    targetAudience: 'National Jury, Ministry Officials, NIC & Senior Academics',
    archetype: 'GovTech / National Infra',
    badgeColor: 'bg-[#FF8811]',
    judgingCriteria: [
      { name: 'Feasibility & Real-World Utility', weight: 35, desc: 'Will this survive in rural tier-3 conditions with low connectivity?' },
      { name: 'Technical Depth & Architecture', weight: 25, desc: 'Is there a real backend, secure database & offline capability?' },
      { name: 'Demonstrable Working Prototype', weight: 25, desc: 'Does the live hardware/software demo work flawlessly without crash?' },
      { name: 'User Experience & Inclusivity', weight: 15, desc: 'Multilingual support, accessibility, and intuitive vernacular UX.' }
    ],
    clicheToAvoid: 'A generic web portal with standard Bootstrap/Material forms and mock charts that requires high-speed Wi-Fi.',
    winningVector: 'An offline-first progressive web app with edge-computed local language speech-to-text, verifiable tamper-proof audit trails, and automatic SMS fallback.',
    recommendedStack: {
      frontend: 'React 19 + PWA Service Worker + Tailwind',
      backend: 'FastAPI (Python) + SQLite / PostgreSQL edge sync',
      aiEngine: 'Quantized Whisper-tiny + Local Llama-3.2 1B (Offline Edge)',
      cloudInfra: 'Self-hosted Docker container / Local Mesh Network'
    },
    ideas: [
      {
        title: 'KisanSetu: Offline Dialect Voice Agritech Diagnostic',
        hook: 'Zero-bandwidth crop disease identification via smartphone edge camera + audio guidance in 12 regional languages.',
        novelty: 9.4,
        feasibility: 8.8,
        demoMoment: 'Turn off laptop Wi-Fi on stage, speak in Tamil/Hindi, snap an image, and see offline instant prescription generated in 800ms.',
        tags: ['Edge AI', 'Voice-First', 'PWA']
      },
      {
        title: 'NyayaSutra: Rural Legal Document Verification Engine',
        hook: 'Automated verification of land deed records with cryptographic timestamping to prevent fraudulent property double-pledging.',
        novelty: 9.1,
        feasibility: 9.3,
        demoMoment: 'Upload a 1994 scanned regional land title, OCR extracts coordinates, and cross-checks cadastral maps in under 2 seconds.',
        tags: ['OCR', 'GovTech', 'Fraud Detection']
      }
    ],
    qaDefense: [
      {
        question: 'What happens when a village has zero internet connection for weeks?',
        answer: 'All inference runs locally on the device using a quantized 1.2B parameter edge model. Data packets are compressed into 140-byte cryptographic SMS payloads that sync when cellular ping returns.'
      },
      {
        question: 'How do you prevent fraudulent user impersonation in government schemes?',
        answer: 'We employ device-bound hardware keystore signatures paired with zero-knowledge credential proofs, ensuring no raw biometric leaves the handset.'
      }
    ]
  },
  {
    id: 'ethglobal',
    title: 'ETHGlobal / Web3 World Tour',
    organizer: 'ETHGlobal & Protocol Foundations',
    track: 'Autonomous Agents, Account Abstraction & ZK-Rollups',
    duration: '36 Hours',
    teamSize: '2 - 4 Hackers',
    prize: '$250,000+ Multi-Sponsor Pool',
    targetAudience: 'Protocol Core Devs, VC Partners (Paradigm/a16z), Foundation Leads',
    archetype: 'Web3 & Cryptographic Infra',
    badgeColor: 'bg-[#FF52D9]',
    judgingCriteria: [
      { name: 'Protocol Composability & Sponsor Bounties', weight: 35, desc: 'How cleanly does it integrate sponsor SDKs (Chainlink, WorldID, Privy)?' },
      { name: 'Smart Contract Architecture & Security', weight: 30, desc: 'Gas profiling, reentrancy guards, formal verification & neat Solidity code.' },
      { name: 'Novel Crypto-Economic Primitive', weight: 20, desc: 'Is this an original idea or another Uniswap/OpenSea fork?' },
      { name: 'UI Polish & 1-Click Onboarding', weight: 15, desc: 'Zero gas friction, embedded social login via ERC-4337 session keys.' }
    ],
    clicheToAvoid: 'Another basic NFT minting page, a meme coin roulette, or a standard ERC-20 staking dashboard with no real innovation.',
    winningVector: 'Autonomous on-chain agent executing intent-based arbitrage or risk hedging using verifiable ZK-proofs and gasless session keys.',
    recommendedStack: {
      frontend: 'Next.js 15 (App Router) + Wagmi / Viem + Tailwind',
      contracts: 'Solidity 0.8.28 + Foundry (Forge/Anvil for sub-second tests)',
      infra: 'EigenLayer AVS / Chainlink CCIP / Privy Embedded Wallets',
      indexing: 'Goldsky / The Graph custom subgraph'
    },
    ideas: [
      {
        title: 'AgenticShield: Autonomous MEV Liquidation Sentinel',
        hook: 'On-chain AI agent with ZK-authenticated order flow that hedges collateralized debt positions milliseconds before flash crashes.',
        novelty: 9.7,
        feasibility: 8.5,
        demoMoment: 'Simulate a sudden 20% collateral drop on local Anvil fork; the agent automatically restructures the position with zero gas friction.',
        tags: ['Foundry', 'ERC-4337', 'DeFi']
      },
      {
        title: 'VeriKey: Sybil-Resistant AI Model License Exchange',
        hook: 'Decentralized marketplace for fine-tuned LoRA weights protected by zk-SNARK attestation and WorldID human verification.',
        novelty: 9.3,
        feasibility: 9.0,
        demoMoment: 'Verify human identity via WorldID simulator, sign a gasless permit, and decrypt high-value model weights on-chain.',
        tags: ['WorldID', 'ZK-Proofs', 'AI Weights']
      }
    ],
    qaDefense: [
      {
        question: 'Why does this need to be on-chain instead of a centralized cloud service?',
        answer: 'Centralized liquidators are prone to single-point custody failures and front-running. Our smart contracts guarantee immutable execution with zero reliance on trusted intermediaries.'
      },
      {
        question: 'How do you handle flashbot frontrunning and latency spikes?',
        answer: 'Transactions are routed via private mempool endpoints using commit-reveal cryptographic escrow, shielding order intents until mined.'
      }
    ]
  },
  {
    id: 'devpost_ai',
    title: 'Devpost Frontier AI Hackathon',
    organizer: 'OpenAI / Anthropic / Devpost',
    track: 'Autonomous Multi-Agent Swarms & Real-Time Tool Calling',
    duration: '48 Hours',
    teamSize: '1 - 4 Engineers',
    prize: '$50,000 Cash + Cloud Credits + VC Meetings',
    targetAudience: 'Frontier AI Research Engineers, Tech Founders, Product Architects',
    archetype: 'Generative AI & Agentic Systems',
    badgeColor: 'bg-[#00F0FF]',
    judgingCriteria: [
      { name: 'Autonomy & Tool Execution Reliability', weight: 35, desc: 'Does the agent actually complete multi-step tasks without human intervention?' },
      { name: 'Novel Multi-Modal Angle', weight: 25, desc: 'Does it blend voice, code execution, vision, or real-world APIs gracefully?' },
      { name: 'Latency & Zero-Hallucination Guardrails', weight: 25, desc: 'Sub-second inference responses, structured JSON outputs, deterministic validation.' },
      { name: 'Practical Utility & Workflow Acceleration', weight: 15, desc: 'Does it replace 10 hours of manual engineer/analyst grind into 60 seconds?' }
    ],
    clicheToAvoid: 'A basic chat interface connected to OpenAI API with a generic system prompt ("You are a helpful assistant").',
    winningVector: 'A self-healing autonomous pipeline that executes code in an isolated sub-ms container, catches exceptions, inspects AST, and self-corrects until verification passes.',
    recommendedStack: {
      frontend: 'React 19 + Lucide Icons + Radix UI + Tailwind',
      backend: 'FastAPI / Python 3.12 with async workers',
      orchestration: 'LangGraph / CrewAI for deterministic state graphs',
      sandbox: 'Wasmtime / Docker Isolated Engine for live code execution'
    },
    ideas: [
      {
        title: 'AutoTrace: Self-Healing Incident Response Agent',
        hook: 'Connects to GitHub repos and Datadog logs, reproduces production crashes in isolated Docker containers, and writes tested hotfix PRs in 90 seconds.',
        novelty: 9.6,
        feasibility: 9.2,
        demoMoment: 'Trigger a simulated null pointer exception in a live demo repo; watch the agent analyze the stack trace, patch the code, run unit tests, and open a green PR.',
        tags: ['LangGraph', 'Docker', 'Self-Healing']
      },
      {
        title: 'OmniDeck: Real-Time Multi-Agent Voice Negotiator',
        hook: 'Two specialized autonomous voice agents negotiating vendor contract clauses live in sub-300ms latency with mathematical Pareto frontier optimization.',
        novelty: 9.5,
        feasibility: 8.7,
        demoMoment: 'Judges input conflicting supply constraints; agents negotiate live via streaming audio, finding the optimal contract terms in 20 seconds.',
        tags: ['Voice AI', 'Game Theory', 'FastAPI']
      }
    ],
    qaDefense: [
      {
        question: 'How do you prevent the agent from getting stuck in infinite loops or hallucinating outputs?',
        answer: 'We utilize LangGraph directed acyclic state machines with strict step limits, structured Pydantic schema validation, and deterministic compile-time unit tests.'
      },
      {
        question: 'Is this cost-effective for large scale codebases?',
        answer: 'We employ a two-tier inference strategy: lightweight 8B models for fast syntax triage, escalating to frontier models only for complex semantic synthesis.'
      }
    ]
  },
  {
    id: 'google_solution',
    title: 'Google Solution Challenge 2026',
    organizer: 'Google Developer Student Clubs',
    track: 'UN Sustainable Development Goals (SDGs)',
    duration: 'Sprint Phase',
    teamSize: '4 Students',
    prize: '$3,000 / Member + Google Mentorship',
    targetAudience: 'Google Developer Experts, UNESCO Advisors, Social Impact Evaluators',
    archetype: 'Social Impact & Cloud Scalability',
    badgeColor: 'bg-[#CCFF00]',
    judgingCriteria: [
      { name: 'Demonstrated Community Impact', weight: 40, desc: 'Real user interviews, tangible feedback, and measurable SDG alignment.' },
      { name: 'Google Technology Integration', weight: 30, desc: 'Deep use of Flutter, Firebase, Vertex AI, TensorFlow, or Google Cloud.' },
      { name: 'Scalability & Cloud Architecture', weight: 15, desc: 'Clean microservices, serverless functions, database efficiency.' },
      { name: 'Presentation & 120s Video Storytelling', weight: 15, desc: 'Emotional hook, problem validation, and flawless demo walkthrough.' }
    ],
    clicheToAvoid: 'A generic charity donation portal, a trash categorization app that barely uses camera ML, or a simple reminder checklist.',
    winningVector: 'A production Flutter app that uses on-device TensorFlow Lite to run real-time water quality spectral analysis with automated alert dispatch to local municipal health officers.',
    recommendedStack: {
      frontend: 'Flutter 3.24 (Multi-platform iOS/Android/Web)',
      cloud: 'Firebase (Auth, Firestore, Cloud Functions, Cloud Storage)',
      ai: 'Vertex AI + TensorFlow Lite on-device model',
      maps: 'Google Maps Platform SDK with Heatmap layers'
    },
    ideas: [
      {
        title: 'AquaLens: On-Device Potable Water Diagnostics',
        hook: 'Turns commodity phone cameras into turbidity and chemical indicator analyzers for rural school drinking wells.',
        novelty: 9.2,
        feasibility: 9.5,
        demoMoment: 'Dip a test strip in murky water, hold camera over it; app displays immediate ppm breakdown and logs geo-coordinate to municipal dashboard.',
        tags: ['SDG 6', 'Flutter', 'TFLite']
      },
      {
        title: 'DisasterMesh: P2P Emergency Rescue Router',
        hook: 'Peer-to-peer Bluetooth mesh network for disaster survivors to relay medical supplies requests without cell tower reception.',
        novelty: 9.4,
        feasibility: 9.1,
        demoMoment: 'Airplane mode enabled on 3 phones; a medical SOS message hops across all devices until reaching the simulated rescue team laptop.',
        tags: ['SDG 11', 'Mesh Network', 'Firebase']
      }
    ],
    qaDefense: [
      {
        question: 'Have you validated this with real users in the field?',
        answer: 'Yes, we conducted testing with 14 community volunteers across 3 rural centers, measuring an average diagnostic time reduction from 48 hours to under 45 seconds.'
      },
      {
        question: 'How do you sustain the cloud costs post-hackathon?',
        answer: 'By leveraging on-device TFLite inference for 95% of tasks, our Firebase cloud compute footprint costs under $0.002 per 1,000 diagnostic scans.'
      }
    ]
  },
  {
    id: 'hackmit',
    title: 'HackMIT / CalHacks / Collegiate Moonshots',
    organizer: 'MIT / UC Berkeley Student Engineering Boards',
    track: 'Radical Interfaces, Edge Hardware & Unconventional Moonshots',
    duration: '24 - 36 Hours',
    teamSize: '3 - 4 Hackers',
    prize: '$50,000+ Prize Pool + YC Interview Invites',
    targetAudience: 'Top Tier Founders, Silicon Valley VCs, Hacker Community',
    archetype: 'Moonshot & Radical Innovation',
    badgeColor: 'bg-[#FFDE59]',
    judgingCriteria: [
      { name: 'The "Holy Shit!" Factor & Novelty', weight: 40, desc: 'Is this something nobody has ever seen or attempted in a 24-hour sprint?' },
      { name: 'Technical Audacity & Hack Rigor', weight: 30, desc: 'Did they build a custom compiler, hardware bridge, or reverse-engineer protocols?' },
      { name: 'Live Stage Demo Showmanship', weight: 20, desc: 'Does the live audience gasp or applaud during the 2-minute demo?' },
      { name: 'UX Fluidity & Design Aesthetics', weight: 10, desc: 'Slick, responsive, and visually magnetic presentation.' }
    ],
    clicheToAvoid: 'A campus roommate matcher, a study timer, a lecture slide summarizer, or a generic recipe generator.',
    winningVector: 'A hardware-software bridge using commodity webcam gaze tracking and micro-gestures to control an operating system terminal at 60 FPS without touching keyboard or mouse.',
    recommendedStack: {
      frontend: 'React 19 + Three.js / WebGL + Tailwind',
      backend: 'Rust (Tauri / Actix) for zero-latency hardware polling',
      machineLearning: 'MediaPipe / ONNX Runtime WebAssembly',
      networking: 'WebSockets with Binary Protobuf payloads'
    },
    ideas: [
      {
        title: 'NeuralGaze: 60FPS Hands-Free Terminal Synthesizer',
        hook: 'Write and compile C code using only subtle micro-gaze tracking and vocal intent tokens at sub-40ms response latency.',
        novelty: 9.8,
        feasibility: 8.4,
        demoMoment: 'Presenter sits on stage with hands tied behind back, stares at screen, and successfully writes, compiles, and runs a hello world C program.',
        tags: ['Rust', 'WebAssembly', 'Hardware Hack']
      },
      {
        title: 'KernelEcho: Zero-Day Binary Anomaly Visualizer',
        hook: 'Real-time 3D topographical map of memory allocations and buffer overflows running live inside the Linux kernel.',
        novelty: 9.6,
        feasibility: 8.6,
        demoMoment: 'Execute a memory corruption attack; live 3D visual canvas immediately highlights the corrupted memory page in neon red in real-time.',
        tags: ['eBPF', 'Linux Kernel', 'Three.js']
      }
    ],
    qaDefense: [
      {
        question: 'Is this just a cool hack, or can it be turned into a real company?',
        answer: 'The core IP is our sub-40ms attention-stream parser. Beyond accessibility for motorized disabilities, this forms the foundation for next-generation spatial computing interfaces.'
      },
      {
        question: 'Did you really build all of this in the last 24 hours?',
        answer: 'Our GitHub commit history shows zero boilerplate before 9:00 AM yesterday. We built the Rust driver from scratch and verified all 32 commits under commit-signing.'
      }
    ]
  },
  {
    id: 'fintech_solana',
    title: 'Fintech & High-Throughput Trading Sprint',
    organizer: 'Solana Foundation / Stripe / Jump Crypto',
    track: 'Sub-Millisecond Settlements, Orderbooks & Risk Engines',
    duration: '24 Hours',
    teamSize: '2 - 3 Quant Developers',
    prize: '$100,000+ Bounties',
    targetAudience: 'Quant Desk Leads, High Frequency Trading Engineers, FinTech CTOs',
    archetype: 'High Throughput & Financial Systems',
    badgeColor: 'bg-[#FF0033]',
    judgingCriteria: [
      { name: 'Throughput & P99 Latency Benchmarks', weight: 40, desc: 'Benchmarked orders per second, memory allocations, zero-copy architecture.' },
      { name: 'Cryptographic Security & Invariants', weight: 30, desc: 'Zero balance leakages, overflow protection, formal fuzzing test coverage.' },
      { name: 'Practical Market Utility', weight: 20, desc: 'Solves real liquidity fragmentation or micro-transaction bottlenecks.' },
      { name: 'Clean Clean Architecture & Profiling', weight: 10, desc: 'Flamegraphs, criterion.rs benchmark graphs, and memory leak absence.' }
    ],
    clicheToAvoid: 'A personal expense tracker with mock charts, or a simple Stripe checkout page clone.',
    winningVector: 'A lock-free in-memory limit order book written in Rust handling 500,000 orders/sec with verifiable Solana state settlement.',
    recommendedStack: {
      coreEngine: 'Rust 2024 (Criterion, Rayon, Crossbeam for lock-free queues)',
      blockchain: 'Solana Anchor Framework / Sealevel runtime',
      telemetry: 'Grafana + Prometheus flamegraph exports',
      clientUI: 'React + WebGL Candlestick chart renderer'
    },
    ideas: [
      {
        title: 'FlashMatch: Sub-Microsecond Lock-Free Order Engine',
        hook: 'High-frequency matching engine with zero-copy binary serialization and atomic Solana settlement batches.',
        novelty: 9.7,
        feasibility: 8.9,
        demoMoment: 'Blast 1,000,000 simulated orders across 16 threads; terminal displays 0.42 microsecond P99 matching latency with zero dropped packets.',
        tags: ['Rust', 'Solana', 'Quant Systems']
      },
      {
        title: 'ShieldPay: Zero-Knowledge Streaming Payroll Protocol',
        hook: 'Per-second salary streaming with confidential zero-knowledge balance proofs preventing corporate wage leaks.',
        novelty: 9.3,
        feasibility: 9.2,
        demoMoment: 'Stream salary in real-time down to fractions of a cent while keeping the employee balance completely private from block explorers.',
        tags: ['ZK-Proofs', 'Fintech', 'Micro-Settlements']
      }
    ],
    qaDefense: [
      {
        question: 'How do you guarantee state consistency during network partition?',
        answer: 'Our state engine employs strict Raft consensus paired with atomic transactional rolls. Invariants are formally fuzzed using proptest across 100,000 iterations.'
      },
      {
        question: 'What is your memory footprint under maximum load?',
        answer: 'By utilizing pre-allocated circular ring buffers and flat struct layouts, memory usage is capped at 64MB regardless of active order book depth.'
      }
    ]
  }
];

export default function EventsHackathons() {
  // Active selected target hackathon
  const [selectedHackathonId, setSelectedHackathonId] = useState('sih');
  const [customMode, setCustomMode] = useState(false);

  // Custom hackathon form state
  const [customTitle, setCustomTitle] = useState('');
  const [customTrack, setCustomTrack] = useState('AI Agents & Machine Learning');
  const [customDuration, setCustomDuration] = useState('36 Hours');
  const [customTeamSize, setCustomTeamSize] = useState('4 Hackers');
  const [customIdeaInput, setCustomIdeaInput] = useState('');

  // Active strategy tab: 'analyse' | 'strategise' | 'approach' | 'pitch'
  const [activeTab, setActiveTab] = useState('analyse');

  // Selected idea concept index
  const [activeIdeaIndex, setActiveIdeaIndex] = useState(0);

  // Interactive Checklist states for Sprint Readiness
  const [checklist, setChecklist] = useState({
    scopeLocked: true,
    githubMonoRepo: true,
    mockContractsAgreed: true,
    coreEngineBuilt: false,
    frontendConnected: false,
    goldenPathSeeded: false,
    offlineFallbackReady: false,
    demoVideoRecorded: false,
    readmeWithGif: false,
    deployedLiveUrl: false
  });

  // Copied feedback notification
  const [copiedStatus, setCopiedStatus] = useState('');

  // Active hackathon object resolution
  const activeHackathon = useMemo(() => {
    if (customMode && customTitle.trim()) {
      return {
        id: 'custom',
        title: customTitle,
        organizer: 'Custom Competition Target',
        track: customTrack,
        duration: customDuration,
        teamSize: customTeamSize,
        prize: 'Top Podium / Track Bounty',
        targetAudience: 'Panel of Technical Judges, VCs & Domain Specialists',
        archetype: customTrack,
        badgeColor: 'bg-[#CCFF00]',
        judgingCriteria: [
          { name: 'Core Innovation & Unfair Advantage', weight: 35, desc: 'Novel problem solving and hard-to-replicate technical depth.' },
          { name: 'Live Functional Prototype', weight: 30, desc: 'Real working software that executes without fatal runtime crashes.' },
          { name: 'User Experience & Visual Polish', weight: 20, desc: 'Responsive, lightning-fast UI with zero latency friction.' },
          { name: 'Market Viability & Execution Roadmap', weight: 15, desc: 'Clear monetization, user acquisition and unit economics.' }
        ],
        clicheToAvoid: 'A superficial wrapper with generic UI components and mock dummy data that fails when tested with real inputs.',
        winningVector: `A production-grade ${customTrack} application built with zero-latency streaming, automated edge fallbacks, and a show-stopping 30-second live demonstration.`,
        recommendedStack: {
          frontend: 'Next.js 15 / React 19 + Tailwind CSS + Lucide',
          backend: 'FastAPI (Python) or Hono / Node.js TypeScript',
          database: 'Supabase (PostgreSQL + Realtime WebSocket)',
          aiOrCore: 'Fast LLM inference / Custom Algorithmic Engine'
        },
        ideas: [
          {
            title: customIdeaInput.trim() ? customIdeaInput : `${customTrack} High-Velocity Intelligence Suite`,
            hook: 'Automated high-throughput pipeline designed specifically to conquer the hackathon problem statement with sub-second execution.',
            novelty: 9.5,
            feasibility: 9.1,
            demoMoment: 'Run live production test on stage with adversarial edge cases; zero crash, instant visual confirmation.',
            tags: ['Custom Build', 'High Velocity', 'Podium Ready']
          },
          {
            title: 'AutoProtocol: Self-Verifying Multi-Agent Flow',
            hook: 'Real-time collaborative workspace integrating multi-party consensus and instant validation proofs.',
            novelty: 9.2,
            feasibility: 9.3,
            demoMoment: 'Two browser windows simultaneously collaborating with real-time optimistic UI update in <10ms.',
            tags: ['Real-Time', 'Distributed', 'Full Stack']
          }
        ],
        qaDefense: [
          {
            question: 'How did your team split the responsibilities to finish this in the time limit?',
            answer: 'We enforced strict contract-driven development: frontend built against mock JSON schemas while backend implemented core business logic, followed by a locked integration freeze 8 hours before submission.'
          },
          {
            question: 'What is the biggest technical hurdle you had to overcome?',
            answer: 'Managing state synchronization across asynchronous worker streams while maintaining sub-millisecond local rendering responsiveness.'
          }
        ]
      };
    }
    return PRESET_HACKATHONS.find(h => h.id === selectedHackathonId) || PRESET_HACKATHONS[0];
  }, [selectedHackathonId, customMode, customTitle, customTrack, customDuration, customTeamSize, customIdeaInput]);

  // Compute live sprint readiness percentage
  const readinessScore = useMemo(() => {
    const totalKeys = Object.keys(checklist).length;
    const completedKeys = Object.values(checklist).filter(Boolean).length;
    return Math.round((completedKeys / totalKeys) * 100);
  }, [checklist]);

  const toggleChecklistItem = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Copy full strategy dossier to clipboard
  const handleCopyDossier = async () => {
    const markdown = `# HACKATHON STRATEGIC WAR PLAN // HYPERS PROTOCOL
Target Hackathon: ${activeHackathon.title}
Track / Theme: ${activeHackathon.track}
Sprint Duration: ${activeHackathon.duration} | Team: ${activeHackathon.teamSize}
Judges: ${activeHackathon.targetAudience}

## 1. JUDGING RUBRIC DECONSTRUCTION
${activeHackathon.judgingCriteria.map(c => `- ${c.name} (${c.weight}%): ${c.desc}`).join('\n')}

## 2. COMPETITIVE ANGLE
- ❌ Cliché Trap to Avoid: ${activeHackathon.clicheToAvoid}
- ⚡ 1% Winning Vector: ${activeHackathon.winningVector}

## 3. RECOMMENDED STACK
${Object.entries(activeHackathon.recommendedStack).map(([k, v]) => `- ${k.toUpperCase()}: ${v}`).join('\n')}

## 4. WINNING PROJECT CONCEPT
- Title: ${activeHackathon.ideas[activeIdeaIndex]?.title || 'Core Project'}
- Hook: ${activeHackathon.ideas[activeIdeaIndex]?.hook}
- The Demo Wow Moment: ${activeHackathon.ideas[activeIdeaIndex]?.demoMoment}

## 5. 180-SECOND PITCH FORMULA
- 00:00 - 00:25: Visceral Problem Hook
- 00:25 - 01:30: Uninterrupted Live "Golden Path" Demo
- 01:30 - 02:15: Deep Architecture & Technical Complexity
- 02:15 - 03:00: Market Moat, Future Roadmap & The Ask
`;

    try {
      await navigator.clipboard.writeText(markdown);
      setCopiedStatus('dossier');
      setTimeout(() => setCopiedStatus(''), 2500);
    } catch (err) {}
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 font-mono pb-20 select-none">
      
      {/* ═══ 1. COMMAND HEADER & BANNER ═══ */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] text-black font-black text-xs uppercase tracking-wider">
          <Trophy size={14} className="stroke-[3]" />
          <span>[ HACKATHON STRATEGIC WAR ROOM // TACTICAL INTELLIGENCE ]</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
              HACKATHON <span className="bg-[#CCFF00] px-2 border-3 border-black shadow-[4px_4px_0px_#000]">STRATEGY LAB</span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-gray-700 uppercase mt-2 max-w-3xl leading-relaxed">
              // STOP BROWSING PASSIVE EVENT BOARDS. SELECT OR CONFIGURE YOUR TARGET HACKATHON TO GENERATE TACTICAL INTELLIGENCE, JUDGING CRITERIA DECONSTRUCTION, ARCHITECTURE BLUEPRINTS, AND HOUR-BY-HOUR SPRINT BATTLE PLANS.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyDossier}
              className="px-4 py-2.5 bg-white hover:bg-[#FAF8F5] border-3 border-black text-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
            >
              {copiedStatus === 'dossier' ? <Check size={16} className="text-emerald-600 stroke-[3]" /> : <Copy size={16} className="stroke-[2.5]" />}
              <span>{copiedStatus === 'dossier' ? '[ DOSSIER COPIED! ]' : '[ 📋 EXPORT WAR PLAN ]'}</span>
            </button>

            <Link
              to="/ide"
              className="px-4 py-2.5 bg-[#CCFF00] hover:bg-[#FFDE59] border-3 border-black text-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
            >
              <Terminal size={16} className="stroke-[2.5]" />
              <span>[ ⚡ LAUNCH WORKSPACE ]</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ 2. TARGET HACKATHON SELECTOR COCKPIT ═══ */}
      <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b-2 border-black gap-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-black">
            <Compass size={16} className="stroke-[2.5]" />
            <span>[ STEP 1: CHOOSE TARGET HACKATHON // PRESET OR CUSTOM ]</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCustomMode(false)}
              className={`px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] transition-all ${
                !customMode ? 'bg-black text-[#FFDE59]' : 'bg-[#FAF8F5] text-black hover:bg-white'
              }`}
            >
              [ PRESET TARGETS ]
            </button>
            <button
              onClick={() => setCustomMode(true)}
              className={`px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] transition-all ${
                customMode ? 'bg-[#CCFF00] text-black font-black' : 'bg-[#FAF8F5] text-black hover:bg-white'
              }`}
            >
              [ + CONFIGURE CUSTOM HACKATHON ]
            </button>
          </div>
        </div>

        {/* Preset Selector Grid */}
        {!customMode ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {PRESET_HACKATHONS.map((hack) => {
              const isSelected = selectedHackathonId === hack.id;
              return (
                <button
                  key={hack.id}
                  onClick={() => setSelectedHackathonId(hack.id)}
                  className={`p-4 border-3 border-black text-left transition-all relative flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-[#FFDE59] shadow-[5px_5px_0px_#000] -translate-y-1' 
                      : 'bg-[#FAF8F5] hover:bg-white shadow-[2px_2px_0px_#000]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-[10px] font-black uppercase border border-black text-black ${hack.badgeColor}`}>
                        {hack.archetype}
                      </span>
                      <span className="text-[10px] font-black uppercase text-gray-600 bg-white border border-black px-1.5 py-0.5">
                        {hack.duration}
                      </span>
                    </div>
                    <h3 className="font-black text-sm uppercase text-black line-clamp-1">{hack.title}</h3>
                    <p className="text-[11px] font-bold text-gray-700 uppercase line-clamp-2 mt-1">{hack.track}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-black text-[10px] font-black uppercase">
                    <span className="text-gray-800">PRIZE: {hack.prize}</span>
                    {isSelected ? (
                      <span className="text-black font-black flex items-center gap-1">
                        ACTIVE <CheckCircle2 size={12} className="stroke-[3]" />
                      </span>
                    ) : (
                      <span className="text-gray-500 hover:text-black">SELECT ►</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* Custom Hackathon Form */
          <div className="bg-[#FAF8F5] border-3 border-black p-5 shadow-[4px_4px_0px_#000] space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-700 block mb-1">
                  HACKATHON NAME:
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. HackOdisha / CalHacks / Internal Sprint"
                  className="w-full bg-white border-2 border-black p-2 text-xs font-bold text-black uppercase focus:outline-none focus:bg-[#FFDE59]"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-gray-700 block mb-1">
                  TARGET TRACK / THEME:
                </label>
                <select
                  value={customTrack}
                  onChange={(e) => setCustomTrack(e.target.value)}
                  className="w-full bg-white border-2 border-black p-2 text-xs font-bold text-black uppercase focus:outline-none"
                >
                  <option value="AI Agents & Machine Learning">AI Agents & Autonomous Workflows</option>
                  <option value="Web3 & Decentralized Protocols">Web3 & Decentralized Protocols</option>
                  <option value="Full-Stack SaaS & Developer Tools">Full-Stack SaaS & Developer Tools</option>
                  <option value="HealthTech & Bio-Informatics">HealthTech & Bio-Informatics</option>
                  <option value="GovTech & Public Digital Infrastructure">GovTech & Public Digital Infrastructure</option>
                  <option value="High-Throughput FinTech & Systems">High-Throughput FinTech & Systems</option>
                  <option value="Cybersecurity & CTF Defense">Cybersecurity & Defense</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-gray-700 block mb-1">
                  SPRINT DURATION:
                </label>
                <select
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  className="w-full bg-white border-2 border-black p-2 text-xs font-bold text-black uppercase focus:outline-none"
                >
                  <option value="24 Hours">24 Hours (Lightning Sprint)</option>
                  <option value="36 Hours">36 Hours (Standard Hackathon)</option>
                  <option value="48 Hours">48 Hours (Weekend Marathon)</option>
                  <option value="7 Days">7 Days (Async Online Sprint)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-gray-700 block mb-1">
                  TEAM ROLES ALLOCATION:
                </label>
                <select
                  value={customTeamSize}
                  onChange={(e) => setCustomTeamSize(e.target.value)}
                  className="w-full bg-white border-2 border-black p-2 text-xs font-bold text-black uppercase focus:outline-none"
                >
                  <option value="Solo Hacker">1 Solo Full-Stack Engineer</option>
                  <option value="2 Hackers (Frontend + Backend)">2 Hackers (UI Lead + Core Logic)</option>
                  <option value="3 Hackers (Full-Stack + AI + Pitch)">3 Hackers (Core + AI + Pitch Lead)</option>
                  <option value="4 Hackers (Full Complement)">4 Hackers (Frontend + Backend + AI/DB + Pitch)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-gray-700 block mb-1">
                OPTIONAL: SEED IDEA OR PROBLEM STATEMENT:
              </label>
              <textarea
                value={customIdeaInput}
                onChange={(e) => setCustomIdeaInput(e.target.value)}
                placeholder="Paste the problem statement or your raw idea here to generate customized counter-strategies..."
                rows={2}
                className="w-full bg-white border-2 border-black p-2 text-xs font-bold text-black uppercase focus:outline-none focus:bg-[#FFDE59]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] font-black text-gray-500 uppercase">
                {customTitle.trim() ? `TARGET READY: ${customTitle.toUpperCase()}` : 'ENTER TITLE TO INITIALIZE CUSTOM WAR ROOM'}
              </span>
              <button
                disabled={!customTitle.trim()}
                onClick={() => {}}
                className="px-4 py-2 bg-[#CCFF00] hover:bg-[#FFDE59] disabled:opacity-50 disabled:pointer-events-none border-2 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                [ DEPLOY CUSTOM STRATEGY PLAYBOOK ]
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ═══ 3. ACTIVE TARGET TELEMETRY DOSSIER ═══ */}
      <div className="bg-[#0C0C0C] text-white border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#FFDE59] text-black border border-black text-[11px] font-black uppercase">
                ACTIVE TARGET
              </span>
              <span className="px-2.5 py-0.5 bg-[#00F0FF] text-black border border-black text-[11px] font-black uppercase">
                {activeHackathon.duration}
              </span>
              <span className="px-2.5 py-0.5 bg-[#CCFF00] text-black border border-black text-[11px] font-black uppercase">
                TEAM: {activeHackathon.teamSize}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#FFDE59]">
              {activeHackathon.title}
            </h2>

            <p className="text-xs font-bold uppercase text-neutral-300 leading-relaxed">
              // <span className="text-white">TRACK FOCUS:</span> {activeHackathon.track}
              <br />
              // <span className="text-white">JUDGE AUDIENCE:</span> {activeHackathon.targetAudience}
            </p>
          </div>

          <div className="lg:col-span-4 bg-neutral-900 border-2 border-neutral-700 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-black uppercase">
              <span className="text-neutral-400">SPRINT READINESS:</span>
              <span className="text-[#CCFF00] text-base">{readinessScore}%</span>
            </div>
            
            <div className="w-full h-3 bg-neutral-800 border border-neutral-600 overflow-hidden">
              <div 
                className="h-full bg-[#CCFF00] transition-all duration-300"
                style={{ width: `${readinessScore}%` }}
              />
            </div>

            <div className="text-[10px] font-black uppercase text-neutral-400 flex items-center justify-between pt-1">
              <span>CHECKLIST PROGRESS</span>
              <span className="text-white">{Object.values(checklist).filter(Boolean).length} / {Object.keys(checklist).length} LOCKED</span>
            </div>
          </div>

        </div>
      </div>

      {/* ═══ 4. TACTICAL STRATEGY TABS ═══ */}
      <div className="flex flex-wrap items-center gap-2 border-b-4 border-black pb-2">
        {[
          { id: 'analyse', label: '1. ANALYSE // RUBRIC & OPPOSITION', icon: Target, color: 'bg-[#FFDE59]' },
          { id: 'strategise', label: '2. STRATEGISE // NOVEL IDEAS & ARCHITECTURE', icon: Brain, color: 'bg-[#00F0FF]' },
          { id: 'approach', label: '3. APPROACH // SPRINT BATTLE PLAN', icon: Clock, color: 'bg-[#CCFF00]' },
          { id: 'pitch', label: '4. DEMO & PITCH // WINNING THE PODIUM', icon: Flame, color: 'bg-[#FF52D9]' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 border-3 border-black text-xs font-black uppercase transition-all flex items-center gap-2 ${
                isActive
                  ? `${tab.color} text-black shadow-[4px_4px_0px_#000] -translate-y-1`
                  : 'bg-white text-gray-700 hover:bg-[#FAF8F5] shadow-[2px_2px_0px_#000]'
              }`}
            >
              <Icon size={16} className="stroke-[2.5]" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ═══ TAB 1: ANALYSE // RUBRIC & OPPOSITION ═══ */}
      {activeTab === 'analyse' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Judging Rubric Breakdown */}
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000]">
            <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-black">
              <div>
                <span className="px-2 py-0.5 bg-[#FFDE59] border border-black text-[10px] font-black uppercase">
                  OFFICIAL EVALUATION MATRIX
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-black mt-1">
                  HOW JUDGES ACTUALLY SCORE POINTS
                </h3>
              </div>
              <span className="text-xs font-black uppercase text-gray-500 hidden sm:inline-block">
                [ 100 TOTAL POINTS ALLOCATION ]
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {activeHackathon.judgingCriteria.map((crit, idx) => (
                <div key={idx} className="p-5 bg-[#FAF8F5] border-3 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-black text-black">{crit.weight}%</span>
                      <span className="text-[10px] font-black uppercase bg-black text-[#FFDE59] px-2 py-0.5 border border-black">
                        CRITERIA {idx + 1}
                      </span>
                    </div>
                    <h4 className="font-black text-sm uppercase text-black mb-2">{crit.name}</h4>
                    <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed">{crit.desc}</p>
                  </div>
                  <div className="w-full bg-neutral-200 h-2 border border-black mt-4 overflow-hidden">
                    <div className="bg-black h-full" style={{ width: `${crit.weight * 2.5}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* The 80% Cliché Trap vs The 1% Counter Strategy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-black">
              
              <div className="bg-[#FFF5F5] border-3 border-black p-6 shadow-[4px_4px_0px_#000]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-[#FF0033] text-white border border-black flex items-center justify-center font-black text-xs">
                    ✕
                  </div>
                  <h4 className="font-black text-xs uppercase text-[#FF0033]">
                    THE 80% CLICHÉ TRAP TO AVOID
                  </h4>
                </div>
                <p className="text-xs font-bold text-gray-800 uppercase leading-relaxed bg-white border-2 border-black p-4 shadow-[2px_2px_0px_#000]">
                  "{activeHackathon.clicheToAvoid}"
                </p>
                <span className="text-[10px] font-black uppercase text-gray-500 block mt-3">
                  // JUDGES SEE 30+ IDENTICAL SUBMISSIONS OF THIS TYPE. IMMEDIATE DISQUALIFICATION FROM PODIUM.
                </span>
              </div>

              <div className="bg-[#F6FFF0] border-3 border-black p-6 shadow-[4px_4px_0px_#000]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-[#CCFF00] text-black border border-black flex items-center justify-center font-black text-xs">
                    ✓
                  </div>
                  <h4 className="font-black text-xs uppercase text-emerald-800">
                    THE 1% PODIUM COUNTER-STRATEGY
                  </h4>
                </div>
                <p className="text-xs font-bold text-gray-900 uppercase leading-relaxed bg-white border-2 border-black p-4 shadow-[2px_2px_0px_#000]">
                  "{activeHackathon.winningVector}"
                </p>
                <span className="text-[10px] font-black uppercase text-emerald-700 block mt-3">
                  // DELIVERS INSTANT VISUAL PROOF & REAL ARCHITECTURAL DEPTH WITHIN THE FIRST 30 SECONDS.
                </span>
              </div>

            </div>
          </div>

          {/* The 90-Second Judge Psychology Dossier */}
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000]">
            <div className="pb-4 mb-4 border-b-2 border-black flex items-center justify-between">
              <h3 className="text-xl font-black uppercase text-black flex items-center gap-2">
                <Brain size={20} className="stroke-[2.5]" />
                <span>THE 90-SECOND JUDGE PSYCHOLOGY DOSSIER</span>
              </h3>
              <span className="px-2 py-0.5 bg-[#00F0FF] border border-black text-[10px] font-black uppercase">
                CRITICAL COGNITIVE BIASES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-[#FAF8F5] border-2 border-black shadow-[3px_3px_0px_#000]">
                <span className="text-xs font-black uppercase text-black block mb-2">1. THE "JUDGE FATIGUE" RULE</span>
                <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed">
                  Judges evaluate 25 projects in 2 hours without food. If your live demo does not perform its core trick in the first 45 seconds, they stop paying attention. Never spend more than 30 seconds on slides.
                </p>
              </div>

              <div className="p-4 bg-[#FAF8F5] border-2 border-black shadow-[3px_3px_0px_#000]">
                <span className="text-xs font-black uppercase text-black block mb-2">2. THE "GOLDEN PATH" RESILIENCE</span>
                <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed">
                  Hotel and venue Wi-Fi always crashes during final presentations. Seed a local mock database with pre-cached high-quality records so your demo runs 100% offline if the network drops.
                </p>
              </div>

              <div className="p-4 bg-[#FAF8F5] border-2 border-black shadow-[3px_3px_0px_#000]">
                <span className="text-xs font-black uppercase text-black block mb-2">3. THE "SPONSOR BOUNTY" SWEAT</span>
                <p className="text-xs font-bold text-gray-600 uppercase leading-relaxed">
                  Sponsor representatives only care about their SDK. Give them an explicit toggle on the settings screen showing where their API was called, with live latency and response payload inspector.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ═══ TAB 2: STRATEGISE // NOVEL IDEAS & ARCHITECTURE ═══ */}
      {activeTab === 'strategise' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* High-Conviction Project Concepts */}
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b-2 border-black gap-2">
              <div>
                <span className="px-2 py-0.5 bg-[#00F0FF] border border-black text-[10px] font-black uppercase">
                  UNFAIR ADVANTAGE CONCEPT MATRIX
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-black mt-1">
                  TACTICAL WINNING BLUEPRINTS FOR THIS TRACK
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {activeHackathon.ideas.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdeaIndex(i)}
                    className={`px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] ${
                      activeIdeaIndex === i ? 'bg-black text-[#FFDE59]' : 'bg-[#FAF8F5] text-black hover:bg-white'
                    }`}
                  >
                    CONCEPT 0{i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Idea Spotlight */}
            {activeHackathon.ideas[activeIdeaIndex] && (
              <div className="bg-[#FAF8F5] border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000] space-y-6">
                
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {activeHackathon.ideas[activeIdeaIndex].tags.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#FFDE59] border border-black text-[10px] font-black uppercase">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-2xl font-black uppercase text-black">
                      {activeHackathon.ideas[activeIdeaIndex].title}
                    </h4>
                    <p className="text-xs sm:text-sm font-bold text-gray-700 uppercase mt-2 leading-relaxed max-w-3xl">
                      {activeHackathon.ideas[activeIdeaIndex].hook}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000] shrink-0">
                    <div className="text-center">
                      <span className="text-[10px] font-black text-gray-500 uppercase block">NOVELTY</span>
                      <span className="text-xl font-black text-black">{activeHackathon.ideas[activeIdeaIndex].novelty}/10</span>
                    </div>
                    <div className="w-[1px] h-8 bg-black" />
                    <div className="text-center">
                      <span className="text-[10px] font-black text-gray-500 uppercase block">FEASIBILITY</span>
                      <span className="text-xl font-black text-emerald-600">{activeHackathon.ideas[activeIdeaIndex].feasibility}/10</span>
                    </div>
                  </div>
                </div>

                {/* The 10-Second Demo Moment */}
                <div className="p-4 bg-[#CCFF00] border-3 border-black shadow-[3px_3px_0px_#000]">
                  <span className="text-xs font-black uppercase text-black block mb-1 flex items-center gap-2">
                    <Zap size={16} className="stroke-[3]" />
                    THE 10-SECOND DEMO "WOW MOMENT" (THE PITCH CLIMAX):
                  </span>
                  <p className="text-xs font-black text-black uppercase leading-relaxed">
                    "{activeHackathon.ideas[activeIdeaIndex].demoMoment}"
                  </p>
                </div>

              </div>
            )}
          </div>

          {/* Recommended Production Tech Stack */}
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000]">
            <div className="pb-4 mb-6 border-b-2 border-black flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 bg-[#CCFF00] border border-black text-[10px] font-black uppercase">
                  ZERO-FRICTION ACCELERATOR
                </span>
                <h3 className="text-xl font-black uppercase text-black mt-1">
                  RECOMMENDED HIGH-VELOCITY TECH STACK
                </h3>
              </div>
              <span className="text-xs font-black uppercase text-gray-500 hidden sm:inline-block">
                [ PRODUCTION RUNTIMES ]
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {Object.entries(activeHackathon.recommendedStack).map(([layer, tech], i) => (
                <div key={i} className="p-4 bg-[#FAF8F5] border-2 border-black shadow-[3px_3px_0px_#000]">
                  <span className="text-[10px] font-black uppercase text-gray-500 block mb-1">
                    {layer.toUpperCase()} LAYER:
                  </span>
                  <span className="text-xs font-black uppercase text-black block leading-snug">
                    {tech}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Scaffold Terminal Block */}
            <div className="bg-[#0C0C0C] text-white p-5 border-3 border-black shadow-[4px_4px_0px_#000] font-mono text-xs">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-800 text-neutral-400 text-[11px] font-black uppercase">
                <span>$ TERMINAL RAPID SCAFFOLD (COPY & RUN)</span>
                <span className="text-[#CCFF00]">READY</span>
              </div>
              <div className="space-y-1 text-neutral-300">
                <div><span className="text-[#00F0FF]"># 1. Initialize High-Velocity Frontend</span></div>
                <div>npm create vite@latest hypers-hackathon -- --template react-ts</div>
                <div className="pt-2"><span className="text-[#00F0FF]"># 2. Install Core UI & Icon Primitives</span></div>
                <div>npm i lucide-react clsx tailwind-merge canvas-confetti</div>
                <div className="pt-2"><span className="text-[#00F0FF]"># 3. Launch Dev Server on Port 5173</span></div>
                <div>npm run dev</div>
              </div>
            </div>
          </div>

          {/* System Architecture Flow Diagram */}
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000]">
            <div className="pb-4 mb-6 border-b-2 border-black flex items-center justify-between">
              <h3 className="text-xl font-black uppercase text-black flex items-center gap-2">
                <Layers size={20} className="stroke-[2.5]" />
                <span>SYSTEM ARCHITECTURE & DATA FLOW</span>
              </h3>
              <span className="px-2 py-0.5 bg-[#FFDE59] border border-black text-[10px] font-black uppercase">
                END-TO-END SPECIFICATION
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center">
              
              <div className="p-4 bg-[#FAF8F5] border-3 border-black shadow-[3px_3px_0px_#000]">
                <span className="text-[10px] font-black uppercase text-gray-500 block mb-1">CLIENT TIER</span>
                <span className="text-xs font-black uppercase text-black block">REACT 19 / PWA</span>
                <span className="text-[10px] font-bold text-gray-600 block mt-1">Optimistic UI State</span>
              </div>

              <div className="text-black font-black text-xl hidden md:block">➔</div>

              <div className="p-4 bg-[#00F0FF] border-3 border-black shadow-[3px_3px_0px_#000]">
                <span className="text-[10px] font-black uppercase text-black block mb-1">GATEWAY</span>
                <span className="text-xs font-black uppercase text-black block">EDGE API ROUTER</span>
                <span className="text-[10px] font-bold text-gray-800 block mt-1">Auth & Rate Limiting</span>
              </div>

              <div className="text-black font-black text-xl hidden md:block">➔</div>

              <div className="p-4 bg-[#CCFF00] border-3 border-black shadow-[3px_3px_0px_#000]">
                <span className="text-[10px] font-black uppercase text-black block mb-1">CORE ENGINE</span>
                <span className="text-xs font-black uppercase text-black block">ASYNC WORKER / AI</span>
                <span className="text-[10px] font-bold text-gray-800 block mt-1">State Machine & Tool Calls</span>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ═══ TAB 3: APPROACH // SPRINT BATTLE PLAN ═══ */}
      {activeTab === 'approach' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Hour-by-Hour Timeline */}
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000]">
            <div className="pb-4 mb-6 border-b-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="px-2 py-0.5 bg-[#CCFF00] border border-black text-[10px] font-black uppercase">
                  ADAPTIVE MILESTONES
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-black mt-1">
                  HOUR-BY-HOUR SPRINT BATTLE PLAN ({activeHackathon.duration})
                </h3>
              </div>
              <span className="text-xs font-black uppercase text-gray-600">
                [ 5 TACTICAL PHASES ]
              </span>
            </div>

            <div className="space-y-6">
              
              <div className="p-5 bg-[#FAF8F5] border-3 border-black shadow-[4px_4px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="px-3 py-2 bg-black text-[#FFDE59] border-2 border-black font-black text-xs uppercase shrink-0">
                    H00 – H04
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase text-black">
                      PHASE 1: SCOPE LOCKDOWN & ZERO-BUG CONTRACTS
                    </h4>
                    <p className="text-xs font-bold text-gray-600 uppercase mt-1 leading-relaxed">
                      Initialize GitHub monorepo, configure linting and Vercel CD. Agree on exact JSON payloads between frontend and backend. Zero coding allowed until contract is written.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-white border border-black text-[10px] font-black uppercase text-black shrink-0">
                  DELIVERABLE: SCHEMA LOCKED
                </span>
              </div>

              <div className="p-5 bg-[#FAF8F5] border-3 border-black shadow-[4px_4px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="px-3 py-2 bg-black text-[#00F0FF] border-2 border-black font-black text-xs uppercase shrink-0">
                    H04 – H16
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase text-black">
                      PHASE 2: THE "HEARTBEAT" CORE ENGINE
                    </h4>
                    <p className="text-xs font-bold text-gray-600 uppercase mt-1 leading-relaxed">
                      Build the single technical novelty feature that proves the project works. Frontend team builds static mock UI with Tailwind while backend/AI finishes core algorithm.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-white border border-black text-[10px] font-black uppercase text-black shrink-0">
                  DELIVERABLE: WORKING CLI / API
                </span>
              </div>

              <div className="p-5 bg-[#FAF8F5] border-3 border-black shadow-[4px_4px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="px-3 py-2 bg-black text-[#CCFF00] border-2 border-black font-black text-xs uppercase shrink-0">
                    H16 – H28
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase text-black">
                      PHASE 3: INTEGRATION & VISUAL "AHA!" POLISH
                    </h4>
                    <p className="text-xs font-bold text-gray-600 uppercase mt-1 leading-relaxed">
                      Connect live frontend to backend endpoints. Replace loading spinners with instant optimistic UI, add micro-animations, toast alerts, and dark mode toggles.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-[#CCFF00] border border-black text-[10px] font-black uppercase text-black shrink-0">
                  DELIVERABLE: CONNECTED END-TO-END
                </span>
              </div>

              <div className="p-5 bg-[#FAF8F5] border-3 border-black shadow-[4px_4px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="px-3 py-2 bg-black text-[#FF52D9] border-2 border-black font-black text-xs uppercase shrink-0">
                    H28 – H36
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase text-black">
                      PHASE 4: CODE FREEZE & "GOLDEN PATH" LOCKDOWN
                    </h4>
                    <p className="text-xs font-bold text-gray-600 uppercase mt-1 leading-relaxed">
                      STRICT CODE FREEZE. Stop adding features! Seed pre-cached data so demo path NEVER throws errors even if Wi-Fi dies. Practice live pitch 5 times with timer.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-[#FF0033] text-white border border-black text-[10px] font-black uppercase shrink-0">
                  NO NEW COMMITS
                </span>
              </div>

              <div className="p-5 bg-[#FAF8F5] border-3 border-black shadow-[4px_4px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="px-3 py-2 bg-black text-[#FFDE59] border-2 border-black font-black text-xs uppercase shrink-0">
                    H36 – H48
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase text-black">
                      PHASE 5: 180s VIDEO, DEVPOST COPY & SUBMISSION
                    </h4>
                    <p className="text-xs font-bold text-gray-600 uppercase mt-1 leading-relaxed">
                      Record 120s crisp Loom video, upload 1080p demo, craft GitHub README with architecture diagram and live URL, and submit at least 90 minutes before deadline.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-[#00F0FF] border border-black text-[10px] font-black uppercase text-black shrink-0">
                  SUBMISSION VERIFIED
                </span>
              </div>

            </div>
          </div>

          {/* Interactive Readiness Checklist */}
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000]">
            <div className="pb-4 mb-6 border-b-2 border-black flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 bg-[#FFDE59] border border-black text-[10px] font-black uppercase">
                  INTERACTIVE READINESS AUDIT
                </span>
                <h3 className="text-xl font-black uppercase text-black mt-1">
                  PRE-SUBMISSION VERIFICATION CHECKLIST
                </h3>
              </div>
              <span className="text-xs font-black uppercase text-black bg-[#CCFF00] px-2 py-1 border border-black">
                {readinessScore}% READY
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { key: 'scopeLocked', label: 'Feature scope strictly locked (No feature creep)' },
                { key: 'githubMonoRepo', label: 'Clean GitHub repo initialized with MIT license' },
                { key: 'mockContractsAgreed', label: 'Frontend and Backend agreed on JSON schema contracts' },
                { key: 'coreEngineBuilt', label: 'Core algorithmic heartbeat working independently' },
                { key: 'frontendConnected', label: 'Frontend integrated with live backend endpoints' },
                { key: 'goldenPathSeeded', label: 'Demo "Golden Path" test data pre-seeded in DB' },
                { key: 'offlineFallbackReady', label: 'Offline resilience verified (Runs without Wi-Fi)' },
                { key: 'demoVideoRecorded', label: '120-second HD pitch demo video recorded & uploaded' },
                { key: 'readmeWithGif', label: 'GitHub README features architecture diagram & demo GIF' },
                { key: 'deployedLiveUrl', label: 'Live HTTPS URL deployed & tested on mobile + desktop' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => toggleChecklistItem(item.key)}
                  className={`p-3.5 border-2 border-black text-left flex items-center gap-3 transition-all ${
                    checklist[item.key]
                      ? 'bg-[#CCFF00] font-black text-black shadow-[2px_2px_0px_#000]'
                      : 'bg-[#FAF8F5] text-gray-700 hover:bg-white'
                  }`}
                >
                  <div className={`w-5 h-5 border-2 border-black flex items-center justify-center shrink-0 ${
                    checklist[item.key] ? 'bg-black text-[#CCFF00]' : 'bg-white'
                  }`}>
                    {checklist[item.key] && <Check size={14} className="stroke-[3]" />}
                  </div>
                  <span className="text-xs uppercase">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ═══ TAB 4: DEMO & PITCH // WINNING THE PODIUM ═══ */}
      {activeTab === 'pitch' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* 180-Second Pitch Script Breakdown */}
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000]">
            <div className="pb-4 mb-6 border-b-2 border-black flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 bg-[#FF52D9] border border-black text-[10px] font-black uppercase text-black">
                  STAGE SHOWMANSHIP FORMULA
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-black mt-1">
                  THE 180-SECOND (3-MINUTE) WINNING PITCH SCRIPT
                </h3>
              </div>
              <span className="text-xs font-black uppercase text-gray-500 hidden sm:inline-block">
                [ TIME-BOXED CHRONOLOGY ]
              </span>
            </div>

            <div className="space-y-4">
              
              <div className="p-4 bg-[#FAF8F5] border-3 border-black shadow-[3px_3px_0px_#000]">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 bg-black text-[#FFDE59] text-[10px] font-black uppercase">
                    00:00 – 00:25 (25 SECONDS)
                  </span>
                  <span className="text-xs font-black uppercase text-black">THE VISCERAL PAIN HOOK</span>
                </div>
                <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed">
                  "Every year, 400,000 farmers lose 30% of their harvest because soil toxicity tests take 3 days to return from lab testing. Today, our team built AquaLens to compress that entire laboratory into a 1-second camera snapshot."
                </p>
                <span className="text-[10px] font-black uppercase text-gray-500 block mt-2">
                  RULE: DO NOT INTRODUCE YOUR TEAM YET. START DIRECTLY WITH THE HUMAN CONFLICT.
                </span>
              </div>

              <div className="p-4 bg-[#CCFF00] border-3 border-black shadow-[3px_3px_0px_#000]">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 bg-black text-[#CCFF00] text-[10px] font-black uppercase">
                    00:25 – 01:30 (65 SECONDS)
                  </span>
                  <span className="text-xs font-black uppercase text-black">THE UNINTERRUPTED LIVE DEMO</span>
                </div>
                <p className="text-xs font-bold text-black uppercase leading-relaxed">
                  "Let's test this live right now on stage. I am dropping a test sample on this strip. Notice my laptop has Wi-Fi disconnected. I point the phone camera: 3, 2, 1 — boom. 82ppm nitrate toxicity flagged instantly on the edge model."
                </p>
                <span className="text-[10px] font-black uppercase text-black block mt-2">
                  RULE: ONLY EXECUTE THE PRE-TESTED "GOLDEN PATH". NEVER TYPE FREEFORM TEXT ON STAGE.
                </span>
              </div>

              <div className="p-4 bg-[#FAF8F5] border-3 border-black shadow-[3px_3px_0px_#000]">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 bg-black text-[#00F0FF] text-[10px] font-black uppercase">
                    01:30 – 02:15 (45 SECONDS)
                  </span>
                  <span className="text-xs font-black uppercase text-black">UNDER THE HOOD // ARCHITECTURAL DEPTH</span>
                </div>
                <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed">
                  "Under the hood, we compiled a quantized TensorFlow Lite model running inside WebAssembly. We bypassed the standard cloud roundtrip, achieving 0.8ms P99 inference latency while keeping user biometrics 100% private."
                </p>
                <span className="text-[10px] font-black uppercase text-gray-500 block mt-2">
                  RULE: SHOW 1 CONCRETE BENCHMARK OR ARCHITECTURE DIAGRAM. PROVE RIGOR TO TECHNICAL JUDGES.
                </span>
              </div>

              <div className="p-4 bg-[#FAF8F5] border-3 border-black shadow-[3px_3px_0px_#000]">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 bg-black text-[#FF52D9] text-[10px] font-black uppercase">
                    02:15 – 03:00 (45 SECONDS)
                  </span>
                  <span className="text-xs font-black uppercase text-black">MOAT, BUSINESS ROADMAP & THE CLOSE</span>
                </div>
                <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed">
                  "We have already conducted 14 real user field tests. Our roadmap includes integrating municipal dispatch pipelines next month. We are Team Hypers, and we are ready for your questions."
                </p>
                <span className="text-[10px] font-black uppercase text-gray-500 block mt-2">
                  RULE: END WITH CONFIDENCE. NEVER TRAIL OFF WITH "SO YEAH, THAT'S PRETTY MUCH IT".
                </span>
              </div>

            </div>
          </div>

          {/* Live Judge Q&A Defense Simulator */}
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000]">
            <div className="pb-4 mb-6 border-b-2 border-black flex items-center justify-between">
              <h3 className="text-xl font-black uppercase text-black flex items-center gap-2">
                <Shield size={20} className="stroke-[2.5]" />
                <span>JUDGE Q&A DEFENSE // BULLETPROOF REBUTTALS</span>
              </h3>
              <span className="px-2 py-0.5 bg-[#FFDE59] border border-black text-[10px] font-black uppercase">
                ANTICIPATE TOUGH INQUIRIES
              </span>
            </div>

            <div className="space-y-4">
              {activeHackathon.qaDefense.map((item, idx) => (
                <div key={idx} className="p-5 bg-[#FAF8F5] border-3 border-black shadow-[3px_3px_0px_#000] space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#FF0033] text-white border border-black text-[10px] font-black uppercase">
                      JUDGE TRAP QUESTION
                    </span>
                    <h4 className="font-black text-xs sm:text-sm uppercase text-black">
                      "{item.question}"
                    </h4>
                  </div>
                  
                  <div className="p-4 bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
                    <span className="text-[10px] font-black uppercase text-emerald-700 block mb-1">
                      RECOMMENDED COUNTER-RESPONSE:
                    </span>
                    <p className="text-xs font-bold text-gray-800 uppercase leading-relaxed">
                      "{item.answer}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ═══ 5. FOOTER PROTOCOL TELEMETRY ═══ */}
      <div className="bg-black text-[#FFDE59] border-4 border-black p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-black uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#CCFF00] border border-black animate-ping" />
          <span>// HYPERS WAR ROOM STRATEGY PROTOCOL // TIER-1 CONVICTION READY //</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/ide" className="text-white hover:text-[#CCFF00] transition-colors">
            [ LAUNCH IDE ]
          </Link>
          <Link to="/royale" className="text-white hover:text-[#00F0FF] transition-colors">
            [ CODING ROYALE ]
          </Link>
          <Link to="/contests" className="text-white hover:text-[#FFDE59] transition-colors">
            [ 24 ARENAS ]
          </Link>
        </div>
      </div>

    </div>
  );
}
