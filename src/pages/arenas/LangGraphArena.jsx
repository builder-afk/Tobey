import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Network, Play, CheckCircle2, ArrowLeft, Terminal, GitMerge, Settings2 } from 'lucide-react';

export default function LangGraphArena() {
  const navigate = useNavigate();
  const [code, setCode] = useState(`from langgraph.graph import StateGraph, END\nfrom typing import TypedDict, Annotated\nimport operator\n\n# Define state\nclass AgentState(TypedDict):\n    messages: Annotated[list, operator.add]\n    \n# Create graph\nworkflow = StateGraph(AgentState)\n\n# Add nodes\nworkflow.add_node("agent", call_model)\nworkflow.add_node("tools", call_tools)\n\n# Add edges\nworkflow.set_entry_point("agent")\nworkflow.add_conditional_edges(\n    "agent",\n    should_continue,\n    {\n        "continue": "tools",\n        "end": END\n    }\n)\nworkflow.add_edge("tools", "agent")\n\napp = workflow.compile()`);
  const [isRunning, setIsRunning] = useState(false);
  const [activeNode, setActiveNode] = useState(null);

  const handleRun = () => {
    setIsRunning(true);
    
    const steps = ['agent', 'tools', 'agent', 'tools', 'agent', 'end'];
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      setActiveNode(steps[stepIndex]);
      stepIndex++;
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRunning(false);
          setActiveNode(null);
        }, 1000);
      }
    }, 900);
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
            <div className="w-9 h-9 border-2 border-black bg-[#FF8811] flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <GitMerge size={18} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">LANGGRAPH FLOWS</h1>
              <p className="text-[11px] font-bold text-gray-600 uppercase">CYCLIC AGENT STATE MACHINE</p>
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
            {isRunning ? 'EXECUTING GRAPH...' : 'COMPILE & RUN'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <CheckCircle2 size={14} className="stroke-[3]" /> SUBMIT STATEGRAPH
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
        
        {/* Left Panel: Editor */}
        <div className="flex flex-col border-r-4 border-black bg-[#18181b] relative overflow-hidden">
          <div className="h-10 bg-[#FAF8F5] border-b-3 border-black flex items-center px-4 justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
              <Terminal size={14} className="stroke-[3]" /> graph.py
            </div>
            <span className="text-[10px] font-black uppercase bg-[#00F0FF] px-2 py-0.5 border border-black text-black">
              LANGGRAPH 0.1
            </span>
          </div>
          <div className="flex-1 flex relative overflow-hidden">
            <div className="w-12 bg-[#18181b] border-r border-zinc-700 py-6 text-zinc-500 font-mono text-xs select-none flex flex-col items-center">
              {Array.from({length: 22}).map((_, i) => <span key={i} className="leading-relaxed">{i + 1}</span>)}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-zinc-100 p-6 font-mono text-xs md:text-sm focus:outline-none resize-none leading-relaxed selection:bg-[#CCFF00] selection:text-black"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Right Panel: Graph Visualizer */}
        <div className="flex flex-col bg-[#FAF8F5] p-6 overflow-y-auto">
          
          <div className="flex justify-between items-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF8811] text-white border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
              <GitMerge size={14} className="stroke-[2.5]" />
              <span>[ STATEGRAPH VISUALIZER ]</span>
            </div>
            {activeNode && (
              <div className="px-3 py-1 bg-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] animate-pulse">
                ACTIVE STATE: AGENTSTATE
              </div>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center relative min-h-[340px]">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
                </marker>
              </defs>

              {/* Agent to Tools */}
              <path d="M 230 140 Q 330 80 430 140" fill="none" stroke="#000" strokeWidth="3" markerEnd="url(#arrow)" 
                    className={activeNode === 'agent' ? 'stroke-[#FF8811] stroke-[4]' : ''} />
              <text x="330" y="85" fill="#000" className="text-[10px] font-black uppercase" textAnchor="middle">SHOULD_CONTINUE == 'CONTINUE'</text>

              {/* Tools to Agent (Cyclic) */}
              <path d="M 430 160 Q 330 220 230 160" fill="none" stroke="#000" strokeWidth="3" markerEnd="url(#arrow)" 
                    className={activeNode === 'tools' ? 'stroke-[#00F0FF] stroke-[4]' : ''} />
              <text x="330" y="215" fill="#000" className="text-[10px] font-black uppercase" textAnchor="middle">ALWAYS</text>

              {/* Agent to END */}
              <path d="M 180 180 Q 180 290 330 290" fill="none" stroke="#000" strokeWidth="3" markerEnd="url(#arrow)" 
                    className={activeNode === 'end' ? 'stroke-[#CCFF00] stroke-[4]' : ''} />
              <text x="210" y="240" fill="#000" className="text-[10px] font-black uppercase" textAnchor="middle">SHOULD_CONTINUE == 'END'</text>
            </svg>

            {/* Nodes */}
            <div className={`absolute w-32 h-16 border-3 border-black flex items-center justify-center font-black text-xs uppercase shadow-[4px_4px_0px_#000] transition-all duration-300 ${activeNode === 'agent' ? 'bg-[#FF8811] text-white shadow-[6px_6px_0px_#000] -translate-y-1' : 'bg-white text-black'}`} style={{ left: '120px', top: '120px' }}>
              AGENT
            </div>

            <div className={`absolute w-32 h-16 border-3 border-black flex items-center justify-center font-black text-xs uppercase shadow-[4px_4px_0px_#000] transition-all duration-300 ${activeNode === 'tools' ? 'bg-[#00F0FF] text-black shadow-[6px_6px_0px_#000] -translate-y-1' : 'bg-white text-black'}`} style={{ left: '420px', top: '120px' }}>
              TOOLS
            </div>

            <div className={`absolute w-32 h-16 border-3 border-black border-dashed flex items-center justify-center font-black text-xs uppercase shadow-[4px_4px_0px_#000] transition-all duration-300 ${activeNode === 'end' ? 'bg-[#CCFF00] text-black shadow-[6px_6px_0px_#000] -translate-y-1' : 'bg-white text-black'}`} style={{ left: '330px', top: '260px' }}>
              END
            </div>
          </div>

          <div className="h-32 bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000] font-mono text-xs overflow-y-auto">
            <div className="text-black font-black uppercase mb-1 border-b-2 border-black pb-1">[ STATE INSPECTOR ]</div>
            {activeNode === 'agent' && <div className="text-amber-800 font-bold">{"{"} messages: [HumanMessage("What's the weather?")] {"}"}</div>}
            {activeNode === 'tools' && <div className="text-blue-800 font-bold">{"{"} messages: [..., AIMessage(tool_calls=[...])] {"}"}</div>}
            {activeNode === 'end' && <div className="text-emerald-800 font-bold">{"{"} messages: [..., AIMessage(content="It's sunny!")] {"}"}</div>}
            {!activeNode && <div className="text-gray-500 font-bold uppercase">// WAITING FOR PIPELINE EXECUTION TRIGGER</div>}
          </div>

        </div>
      </div>
    </div>
  );
}
