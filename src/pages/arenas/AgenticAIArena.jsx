import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Play, CheckCircle2, ArrowLeft, Terminal, Eye, Hammer, BrainCircuit } from 'lucide-react';

export default function AgenticAIArena() {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [agentLogs, setAgentLogs] = useState([]);
  const [code, setCode] = useState(`import { Agent } from 'my-agent-framework';\n\nconst searchTool = async (query) => {\n  return "Found: ReAct pattern details...";\n};\n\nconst agent = new Agent({\n  name: "Researcher",\n  tools: [searchTool],\n  systemPrompt: "You are an autonomous researcher. Think, Act, Observe."\n});\n\nawait agent.run("Research the ReAct agent architecture.");`);

  const handleRun = () => {
    setIsRunning(true);
    setAgentLogs([]);
    
    const trace = [
      { type: 'thought', text: 'I need to research the ReAct agent architecture. I should use the search tool.' },
      { type: 'action', text: 'Action: searchTool\nInput: "ReAct agent architecture paper"' },
      { type: 'observation', text: 'Observation: ReAct (Reasoning + Acting) is a paradigm that synergizes reasoning and acting in LLMs.' },
      { type: 'thought', text: 'I have enough information to summarize the architecture.' },
      { type: 'final', text: 'Final Answer: ReAct combines reasoning traces and task-specific actions...' }
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < trace.length) {
        setAgentLogs(prev => [...prev, trace[step]]);
        step++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 1000);
  };

  const getLogIcon = (type) => {
    switch (type) {
      case 'thought': return <BrainCircuit size={16} className="text-black stroke-[2.5]" />;
      case 'action': return <Hammer size={16} className="text-black stroke-[2.5]" />;
      case 'observation': return <Eye size={16} className="text-black stroke-[2.5]" />;
      case 'final': return <CheckCircle2 size={16} className="text-black stroke-[3]" />;
      default: return null;
    }
  };

  const getLogStyle = (type) => {
    switch (type) {
      case 'thought': return 'bg-[#FFDE59] text-black border-2 border-black shadow-[2px_2px_0px_#000]';
      case 'action': return 'bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_#000]';
      case 'observation': return 'bg-[#FAF8F5] text-black border-2 border-black shadow-[2px_2px_0px_#000]';
      case 'final': return 'bg-[#CCFF00] text-black border-3 border-black shadow-[3px_3px_0px_#000] font-black';
      default: return 'bg-white text-black border-2 border-black';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF8F5] text-black font-mono">
      {/* Header */}
      <div className="h-16 border-b-4 border-black flex items-center justify-between px-6 bg-white shadow-[0px_4px_0px_#000] z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/royale')} 
            className="p-2 bg-white hover:bg-[#FFDE59] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-black"
          >
            <ArrowLeft size={18} className="stroke-[3]" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border-2 border-black bg-[#00F0FF] flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <Bot size={18} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">AGENTIC AI</h1>
              <p className="text-[11px] font-bold text-gray-600 uppercase">REACT AUTONOMOUS WORKFLOW</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FFDE59] hover:bg-[#ffe57e] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
          >
            {isRunning ? <span className="animate-spin text-sm">⍥</span> : <Play size={14} className="stroke-[3]" />}
            {isRunning ? 'AGENT REASONING...' : 'DEPLOY AGENT'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <CheckCircle2 size={14} className="stroke-[3]" /> SUBMIT
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-hidden">
        
        {/* Left Panel: Editor */}
        <div className="flex flex-col bg-[#18181b] border-4 border-black overflow-hidden shadow-[5px_5px_0px_#000]">
          <div className="h-10 bg-[#FAF8F5] border-b-3 border-black flex items-center px-4 justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
              <Terminal size={14} className="stroke-[3]" /> agent.js
            </div>
            <span className="text-[10px] font-black uppercase bg-[#00F0FF] px-2 py-0.5 border border-black text-black">
              AGENT RUNTIME
            </span>
          </div>
          <div className="flex-1 flex relative overflow-hidden">
            <div className="w-12 bg-[#18181b] border-r border-zinc-700 py-6 text-zinc-500 font-mono text-xs select-none flex flex-col items-center">
              {Array.from({length: 16}).map((_, i) => <span key={i} className="leading-relaxed">{i + 1}</span>)}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-zinc-100 p-6 font-mono text-xs md:text-sm focus:outline-none resize-none leading-relaxed selection:bg-[#CCFF00] selection:text-black"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Right Panel: ReAct Trace */}
        <div className="flex flex-col bg-white border-4 border-black p-6 overflow-hidden shadow-[5px_5px_0px_#000]">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-black pb-2">
            <Bot size={16} className="stroke-[2.5]" />
            <h2 className="text-xs font-black uppercase tracking-wider text-black">[ REACT EXECUTION TRACE ]</h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 bg-[#FAF8F5] border-2 border-black p-4">
            {agentLogs.length === 0 && !isRunning && (
              <div className="h-full flex items-center justify-center text-gray-500 font-black uppercase text-xs">
                // CLICK [ DEPLOY AGENT ] TO INITIATE AUTONOMOUS WORKFLOW
              </div>
            )}
            
            {agentLogs.map((log, i) => (
              <div key={i} className={`p-3.5 border ${getLogStyle(log.type)} flex gap-3 text-xs`}>
                <div className="mt-0.5 shrink-0">
                  {getLogIcon(log.type)}
                </div>
                <div className="font-mono whitespace-pre-wrap leading-relaxed">
                  {log.text}
                </div>
              </div>
            ))}
            
            {isRunning && (
              <div className="flex gap-2 items-center text-black font-black uppercase text-xs p-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] border border-black animate-ping" />
                <span>EVALUATING ENVIRONMENT & TOOLS...</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
