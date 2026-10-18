import React, { useState, useEffect } from 'react';
import { 
  Globe, Users, Swords, Trophy, Target, Zap, Loader, Sparkles, 
  Shield, Crown, Calendar, Bot, Code2, Bug, Timer, Network, 
  BrainCircuit, ChevronRight, Copy, Check, Database, Cpu,
  Server, Sliders, Activity, MessageSquare, HardDrive, Brain, Link, GitMerge, Workflow,
  Hexagon, Gamepad2, Cloud, ArrowUpRight
} from 'lucide-react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { ideQuestionsList } from '../data/ideProblems';

export default function CodingRoyale() {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [matchDetails, setMatchDetails] = useState(null);
  const [progress, setProgress] = useState(0);
  const [opponentProgress, setOpponentProgress] = useState(0);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      const titleToId = {
        'LeetCode Style': 'leetcode',
        'SQL Challenges': 'sql-challenges',
        'System Design Battles': 'system-design',
        'Rust Systems': 'rust-systems',
        'Kernel Hacking': 'kernel-hacking',
        'ML Algorithms': 'ml-challenges',
        'Deep Learning': 'deep-learning',
        'Finetuning Arena': 'finetuning-arena',
        'AI-Assisted Coding': 'ai-assisted',
        'LangChain Duels': 'langchain-duels',
        'LangGraph Flows': 'langgraph-flows',
        'Agentic AI': 'agentic-ai',
        'LLM Engineering': 'llm-engineering',
        'Kubernetes Cluster': 'kubernetes-cluster',
        'Docker Builds': 'docker-builds',
        'WebAssembly': 'webassembly',
        'Solidity Smart Contracts': 'solidity-smart-contracts',
        'Web3 & Smart Contracts': 'web3-smart-contracts',
        'Game Dev & Shaders': 'game-dev-graphics',
        'Cloud Native & K8s': 'cloud-native-k8s'
      };
      if (matchDetails?.modeName === 'Speed Coding') {
        navigate('/speed-coding');
      } else if (titleToId[matchDetails?.modeName]) {
        navigate(`/royale/${titleToId[matchDetails.modeName]}`);
      } else {
        let hash = 0;
        const roomIdStr = matchDetails?.roomId || "";
        for (let i = 0; i < roomIdStr.length; i++) {
          hash = roomIdStr.charCodeAt(i) + ((hash << 5) - hash);
        }
        let selectedProblem;
        if (matchDetails?.modeName === 'Bug Fixing') {
          const validIds = [1, 6, 16];
          const randomId = validIds[Math.abs(hash) % validIds.length];
          selectedProblem = ideQuestionsList.find(p => p.id === randomId) || ideQuestionsList[0];
        } else {
          selectedProblem = ideQuestionsList[Math.abs(hash) % ideQuestionsList.length];
        }
        navigate(`/ide/solve/${selectedProblem.id}`, { state: { mode: matchDetails?.modeName } });
      }
    }
  }, [countdown, navigate, matchDetails]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'coding-royale-join' && e.newValue) {
        try {
          const data = JSON.parse(e.newValue);
          if (data && matchDetails && matchDetails.roomId === data.roomId && matchDetails.opponentType === 'waiting') {
            setMatchDetails(prev => ({
              ...prev,
              opponentType: 'human',
              message: 'Friend joined! Prepare for battle.'
            }));
            setCountdown(5);
          }
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [matchDetails]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const handleSoloPlay = (mode) => {
    if (mode.title === 'Speed Coding') {
      navigate('/speed-coding');
      return;
    }
    const dedicatedArenas = [
      'leetcode-style', 'sql-challenges', 'system-design', 'rust-systems', 'kernel-hacking',
      'ml-challenges', 'deep-learning', 'finetuning-arena', 'ai-assisted',
      'langchain-duels', 'langgraph-flows', 'agentic-ai', 'llm-engineering',
      'kubernetes-cluster', 'docker-builds', 'webassembly', 'solidity-smart-contracts',
      'game-dev-graphics', 'cloud-native-k8s'
    ];
    if (dedicatedArenas.includes(mode.id)) {
      if (mode.id === 'leetcode-style') {
        navigate('/royale/leetcode');
      } else if (mode.id === 'solidity-smart-contracts') {
        navigate('/royale/web3-smart-contracts');
      } else {
        navigate(`/royale/${mode.id}`);
      }
      return;
    }
    
    let randomProblem;
    if (mode.title === 'Bug Fixing') {
      const validIds = [1, 6, 16];
      const randomId = validIds[Math.floor(Math.random() * validIds.length)];
      randomProblem = ideQuestionsList.find(p => p.id === randomId) || ideQuestionsList[0];
    } else {
      randomProblem = ideQuestionsList[Math.floor(Math.random() * ideQuestionsList.length)];
    }
    
    navigate(`/ide/solve/${randomProblem.id}`, { state: { mode: mode.title, solo: true } });
  };

  const supports = [
    { title: 'Daily Challenges', icon: Calendar, bg: 'bg-[#FFDE59]' },
    { title: 'Weekly Contests', icon: Trophy, bg: 'bg-[#CCFF00]' },
    { title: 'Live Coding Battles', icon: Swords, bg: 'bg-[#00F0FF]' },
    { title: 'AI-Generated Contests', icon: Bot, bg: 'bg-[#FF52D9]' },
    { title: 'Multiplayer Duels', icon: Users, bg: 'bg-[#FF0033]', text: 'text-white' },
    { title: 'Team Competitions', icon: Shield, bg: 'bg-white' },
  ];

  const modes = [
    {
      id: 'leetcode-style',
      title: 'LeetCode Style',
      icon: Code2,
      desc: 'Standard Data Structures & Algorithms interview prep battles against time.',
      accent: 'bg-[#FFDE59]',
      stats: 'Ranked',
    },
    {
      id: 'codeforces-style',
      title: 'Codeforces Style',
      icon: Target,
      desc: 'Hardcore competitive programming. Heavy math, greedy algorithms, and logic.',
      accent: 'bg-[#00F0FF]',
      stats: 'Div 1 & 2',
    },
    {
      id: 'speed-coding',
      title: 'Speed Coding',
      icon: Timer,
      desc: 'Fast typing speed + straightforward logic. The quickest correct submission wins.',
      accent: 'bg-[#FF52D9]',
      stats: 'Blitz',
    },
    {
      id: 'bug-fixing',
      title: 'Bug Fixing',
      icon: Bug,
      desc: 'You are provided broken code. Pinpoint the root defect and deploy the fix first.',
      accent: 'bg-[#CCFF00]',
      stats: 'Casual',
    },
    {
      id: 'rust-systems',
      title: 'Rust Systems',
      icon: Cpu,
      desc: 'Low-level systems programming. Borrow checker, concurrency, and OS internals.',
      accent: 'bg-[#FFDE59]',
      stats: 'Hardcore',
    },
    {
      id: 'sql-challenges',
      title: 'SQL Challenges',
      icon: Database,
      desc: 'Execute complex relational queries, join strategies, window functions, and indexing.',
      accent: 'bg-[#00F0FF]',
      stats: 'Data',
    },
    {
      id: 'system-design',
      title: 'System Design Battles',
      icon: Network,
      desc: 'High-level architecture challenges. Design globally resilient distributed systems.',
      accent: 'bg-[#CCFF00]',
      stats: 'Advanced',
    },
    {
      id: 'ai-assisted',
      title: 'AI-Assisted Coding',
      icon: BrainCircuit,
      desc: 'LLM copilots enabled! Test your speed orchestrating AI prompts and refactors.',
      accent: 'bg-[#FF52D9]',
      stats: 'Modern',
    },
    {
      id: 'mcp-battles',
      title: 'MCP Mastery',
      icon: Server,
      desc: 'Build and connect Model Context Protocol server tools under extreme pressure.',
      accent: 'bg-[#00F0FF]',
      stats: 'AI Infra',
    },
    {
      id: 'finetuning-arena',
      title: 'Finetuning Arena',
      icon: Sliders,
      desc: 'Optimize model weights, LoRA adapters, hyperparameters, and evaluate perplexity.',
      accent: 'bg-[#FFDE59]',
      stats: 'Model',
    },
    {
      id: 'ml-challenges',
      title: 'ML Algorithms',
      icon: Activity,
      desc: 'Construct classical ML algorithms from pure matrix math. Zero Scikit-learn.',
      accent: 'bg-[#CCFF00]',
      stats: 'Math',
    },
    {
      id: 'llm-engineering',
      title: 'LLM Engineering',
      icon: MessageSquare,
      desc: 'RAG pipelines, vector database embeddings, chunking, and semantic search.',
      accent: 'bg-[#FF52D9]',
      stats: 'Generative',
    },
    {
      id: 'kernel-hacking',
      title: 'Kernel Hacking',
      icon: HardDrive,
      desc: 'Linux Kernel modules, system calls, virtual memory pages, and device drivers.',
      accent: 'bg-[#000000]',
      text: 'text-white',
      stats: 'Low-Level',
    },
    {
      id: 'deep-learning',
      title: 'Deep Learning',
      icon: Brain,
      desc: 'Architect neural networks, custom gradient backprop, and activation functions.',
      accent: 'bg-[#00F0FF]',
      stats: 'Neural',
    },
    {
      id: 'langchain-duels',
      title: 'LangChain Duels',
      icon: Link,
      desc: 'Chain complex components, persistent memory buffers, and parser validators.',
      accent: 'bg-[#FFDE59]',
      stats: 'Orchestration',
    },
    {
      id: 'langgraph-flows',
      title: 'LangGraph Flows',
      icon: GitMerge,
      desc: 'Construct stateful, cyclic multi-agent graph flows with strict checkpoints.',
      accent: 'bg-[#CCFF00]',
      stats: 'Graph',
    },
    {
      id: 'agentic-ai',
      title: 'Agentic AI',
      icon: Workflow,
      desc: 'Build autonomous agents, multi-tool reflection loops, and task delegators.',
      accent: 'bg-[#FF52D9]',
      stats: 'Autonomous',
    },
    {
      id: 'game-dev-graphics',
      title: 'Game Dev & Shaders',
      icon: Gamepad2,
      desc: 'WebGL fragment shaders, game loops, canvas rendering, and spatial matrices.',
      accent: 'bg-[#00F0FF]',
      stats: 'Graphics',
    },
    {
      id: 'cloud-native-k8s',
      title: 'Cloud Native & K8s',
      icon: Cloud,
      desc: 'Deployments, ingress controllers, stateful sets, scaling, and pod networks.',
      accent: 'bg-[#CCFF00]',
      stats: 'Infra',
    }
  ];

  // ─── Match Arena View ─────────────────────────────────
  if (matchDetails) {
    return (
      <div className="flex h-full flex-col p-6 md:p-12 overflow-y-auto font-mono">
        <div className="max-w-5xl mx-auto w-full">
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000] text-center mb-10">
            <div className="w-16 h-16 bg-[#00F0FF] border-3 border-black flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_#000]">
              <Swords size={32} className="text-black stroke-[2.5]" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight mb-2">
              {matchDetails.modeName} <span className="bg-[#FFDE59] px-2 border-2 border-black">ARENA</span>
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-700 uppercase">
              {matchDetails.message}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Player 1 (You) */}
            <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_#000] flex flex-col items-center">
              <div className="w-20 h-20 bg-[#00F0FF] border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_#000]">
                <Users size={36} className="text-black stroke-[2.5]" />
              </div>
              <h2 className="text-2xl font-black text-black uppercase mb-1">YOU [ OPERATOR ]</h2>
              <span className="text-xs font-bold text-gray-600 uppercase mb-4">HOST COHORT</span>
              
              <div className="w-full bg-[#F0EDE6] border-3 border-black h-8 p-1 shadow-[3px_3px_0px_#000] mb-2">
                <div 
                  className="bg-[#00F0FF] h-full transition-all duration-300 border-r-2 border-black"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-black text-black uppercase">{progress}% RESOLVED</span>

              {countdown !== null && countdown > 0 && (
                <div className="mt-6 px-6 py-2 bg-[#FFDE59] border-3 border-black shadow-[3px_3px_0px_#000] flex items-center gap-3">
                  <Timer className="animate-spin text-black" size={18} />
                  <span className="text-black font-black tracking-widest text-sm uppercase">
                    STARTING IN {countdown}S
                  </span>
                </div>
              )}
            </div>

            {/* Player 2 (Opponent) */}
            <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_#000] flex flex-col items-center">
              <div className="w-20 h-20 bg-[#FF0033] border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_#000]">
                {matchDetails.opponentType === 'bot' ? (
                  <Bot size={36} className="text-white stroke-[2.5]" />
                ) : (
                  <Users size={36} className="text-white stroke-[2.5]" />
                )}
              </div>
              <h2 className="text-2xl font-black text-black uppercase mb-1">
                {matchDetails.opponentType === 'bot' ? 'SYNTHETIC BOT' : 'OPPONENT'}
              </h2>
              <span className="text-xs font-bold text-gray-600 uppercase mb-4">REMOTE CHALLENGER</span>
              
              <div className="w-full bg-[#F0EDE6] border-3 border-black h-8 p-1 shadow-[3px_3px_0px_#000] mb-2">
                <div 
                  className="bg-[#FF0033] h-full transition-all duration-300 border-r-2 border-black"
                  style={{ width: `${opponentProgress}%` }}
                />
              </div>
              <span className="text-xs font-black text-black uppercase">{opponentProgress}% RESOLVED</span>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => {
                setMatchDetails(null);
                setCountdown(null);
                setProgress(0);
                setOpponentProgress(0);
                if (socket) socket.disconnect();
                setSocket(null);
              }}
              className="py-3 px-8 bg-white hover:bg-[#FF0033] hover:text-white border-3 border-black font-black text-sm uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              [ ABORT & EXIT MATCH ]
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Main Lobby View ─────────────────────────────────
  return (
    <div className="flex h-full flex-col overflow-y-auto custom-scrollbar font-mono pb-20">
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] text-black font-black text-xs uppercase tracking-wider mb-4">
            <Swords size={14} className="stroke-[2.5]" />
            <span>[ ⚔ BATTLE PROTOCOL // REAL-TIME ARENA ]</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight mb-4 flex items-center flex-wrap gap-3">
            COMPETITIVE CODING
            <span className="bg-[#FF52D9] text-black px-3 py-1 border-4 border-black shadow-[5px_5px_0px_#000]">
              ARENA
            </span>
          </h1>

          <p className="text-xs md:text-sm font-bold text-gray-700 max-w-3xl uppercase tracking-wide leading-relaxed bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000]">
            // ENTER THE ULTIMATE PROVING GROUNDS. FAST-PACED SPEED CODING, SYSTEM DESIGN BATTLES, AND CONCURRENT DUELS ACROSS ALGORITHMIC DISCIPLINES.
          </p>
        </div>

        {/* Supports (Features) Ribbon */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <span className="px-2.5 py-1 bg-black text-white font-black text-xs uppercase">
              [ ARENA CAPABILITIES ]
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {supports.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className={`bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000] flex flex-col items-center text-center justify-center gap-2 hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all`}
                >
                  <div className={`w-10 h-10 border-2 border-black ${item.bg} flex items-center justify-center shadow-[2px_2px_0px_#000]`}>
                    <Icon size={20} className="text-black stroke-[2.5]" />
                  </div>
                  <span className="text-xs font-black text-black uppercase">{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Battle Modes Grid */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 bg-white border-4 border-black p-4 shadow-[5px_5px_0px_#000]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FF0033] border-2 border-black flex items-center justify-center text-white font-black text-sm">
                !
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-black text-black uppercase tracking-tight">
                  ACTIVE COMBAT MODES
                </h2>
                <span className="text-[11px] text-gray-600 font-bold uppercase">
                  SELECT A TRACK TO ENTER IMMEDIATE QUEUE OR DEDICATED ARENA
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#CCFF00] border-2 border-black text-xs font-black text-black uppercase shadow-[2px_2px_0px_#000]">
              <span className="w-2 h-2 rounded-full bg-black animate-ping" />
              <span>3,492 OPERATORS ONLINE</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {modes.map((mode) => {
              const ModeIcon = mode.icon;
              return (
                <div 
                  key={mode.id}
                  className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 border-3 border-black ${mode.accent} flex items-center justify-center shadow-[3px_3px_0px_#000]`}>
                        <ModeIcon size={24} className="text-black stroke-[2.5]" />
                      </div>
                      <span className="px-2.5 py-1 bg-black text-white text-[10px] font-black uppercase tracking-wider border border-black shadow-[2px_2px_0px_#000]">
                        {mode.stats}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-black text-black uppercase mb-1 tracking-tight group-hover:text-blue-600 transition-colors">
                      {mode.title}
                    </h3>
                    
                    <p className="text-xs text-gray-600 font-bold leading-relaxed mb-6">
                      {mode.desc}
                    </p>
                  </div>
                  
                  {/* Button */}
                  <div className="mt-auto pt-4 border-t-2 border-black">
                    <button 
                      onClick={() => handleSoloPlay(mode)}
                      className="w-full py-2.5 px-3 bg-[#CCFF00] group-hover:bg-[#FFDE59] border-2 border-black text-black font-black text-xs uppercase flex items-center justify-between shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                    >
                      <span>[ ENTER QUEUE ]</span>
                      <ChevronRight size={16} className="stroke-[3]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
