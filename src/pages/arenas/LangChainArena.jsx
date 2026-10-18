import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Play, CheckCircle2, ArrowLeft, Terminal, Workflow } from 'lucide-react';

export default function LangChainArena() {
  const navigate = useNavigate();
  const [code, setCode] = useState(`from langchain.prompts import PromptTemplate\nfrom langchain.llms import OpenAI\nfrom langchain.chains import LLMChain\n\n# Define the prompt\nprompt = PromptTemplate(\n    input_variables=["product"],\n    template="What is a good name for a company that makes {product}?"\n)\n\n# Initialize the LLM\nllm = OpenAI(temperature=0.7)\n\n# Create the chain\nchain = LLMChain(llm=llm, prompt=prompt)\n\n# Run the chain\nresult = chain.run("eco-friendly water bottles")\nprint(result)`);
  const [isRunning, setIsRunning] = useState(false);
  const [activeNode, setActiveNode] = useState(null);

  const handleRun = () => {
    setIsRunning(true);
    let step = 0;
    
    // Simulate chain execution
    const interval = setInterval(() => {
      step++;
      setActiveNode(step);
      if (step >= 4) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRunning(false);
          setActiveNode(null);
        }, 1200);
      }
    }, 800);
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
            <div className="w-9 h-9 border-2 border-black bg-[#CCFF00] flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <Link size={18} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">LANGCHAIN DUELS</h1>
              <p className="text-[11px] font-bold text-gray-600 uppercase">LLMCHAIN IMPLEMENTATION</p>
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
            {isRunning ? 'EXECUTING CHAIN...' : 'RUN CHAIN'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <CheckCircle2 size={14} className="stroke-[3]" /> SUBMIT SOLUTION
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
        
        {/* Left Panel: Python Editor */}
        <div className="flex flex-col border-r-4 border-black bg-[#18181b] relative">
          <div className="h-10 bg-[#FAF8F5] border-b-3 border-black flex items-center px-4 justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
              <Terminal size={14} className="stroke-[3]" /> chain.py
            </div>
            <span className="text-[10px] font-black uppercase bg-[#FFDE59] px-2 py-0.5 border border-black">
              PYTHON 3.11
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

        {/* Right Panel: Chain Visualizer */}
        <div className="flex flex-col bg-[#FAF8F5] p-8 overflow-y-auto">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00F0FF] border-2 border-black font-black text-black text-xs uppercase shadow-[2px_2px_0px_#000] mb-8 w-fit">
            <Workflow size={14} className="stroke-[2.5]" />
            <span>[ CHAIN EXECUTION FLOW // TOPOLOGY ]</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center relative py-6">
            
            {/* Input Node */}
            <div className={`w-80 p-4 border-3 border-black transition-all duration-300 z-10 ${activeNode === 1 ? 'bg-[#CCFF00] shadow-[6px_6px_0px_#000] -translate-y-1' : 'bg-white shadow-[4px_4px_0px_#000]'}`}>
              <div className="text-[11px] font-black text-black mb-1 uppercase tracking-wider flex items-center justify-between">
                <span>1. INPUT PARAMS</span>
                {activeNode === 1 && <span className="text-[10px] bg-black text-white px-1.5 py-0.2">ACTIVE</span>}
              </div>
              <div className="font-mono text-xs font-bold text-gray-800 bg-[#FAF8F5] p-2 border-2 border-black">
                {"{ product: 'eco-friendly water bottles' }"}
              </div>
            </div>

            <div className={`w-1.5 h-10 transition-colors duration-300 ${activeNode >= 2 ? 'bg-[#00F0FF]' : 'bg-black'}`} />

            {/* Prompt Template Node */}
            <div className={`w-80 p-4 border-3 border-black transition-all duration-300 z-10 ${activeNode === 2 ? 'bg-[#00F0FF] shadow-[6px_6px_0px_#000] -translate-y-1' : 'bg-white shadow-[4px_4px_0px_#000]'}`}>
              <div className="text-[11px] font-black text-black mb-1 uppercase tracking-wider flex items-center justify-between">
                <span>2. PROMPT TEMPLATE</span>
                {activeNode === 2 && <span className="text-[10px] bg-black text-white px-1.5 py-0.2">FORMATTING</span>}
              </div>
              <div className="font-mono text-xs text-black font-bold bg-[#FAF8F5] p-2 border-2 border-black">
                "What is a good name for a company that makes eco-friendly water bottles?"
              </div>
            </div>

            <div className={`w-1.5 h-10 transition-colors duration-300 ${activeNode >= 3 ? 'bg-[#FF52D9]' : 'bg-black'}`} />

            {/* LLM Node */}
            <div className={`w-80 p-4 border-3 border-black transition-all duration-300 z-10 ${activeNode === 3 ? 'bg-[#FF52D9] shadow-[6px_6px_0px_#000] -translate-y-1' : 'bg-white shadow-[4px_4px_0px_#000]'}`}>
              <div className="text-[11px] font-black text-black mb-1 uppercase tracking-wider flex justify-between items-center">
                <span>3. LLM (OPENAI)</span>
                {activeNode === 3 && <span className="bg-black text-white px-1.5 py-0.2 text-[10px] font-mono animate-pulse">STREAMING...</span>}
              </div>
              <div className="font-mono text-xs font-bold text-black bg-[#FAF8F5] p-2 border-2 border-black">
                model: gpt-4o | temperature: 0.7
              </div>
            </div>

            <div className={`w-1.5 h-10 transition-colors duration-300 ${activeNode >= 4 ? 'bg-[#CCFF00]' : 'bg-black'}`} />

            {/* Output Node */}
            <div className={`w-80 p-4 border-3 border-black transition-all duration-300 z-10 ${activeNode === 4 ? 'bg-[#CCFF00] shadow-[6px_6px_0px_#000] -translate-y-1' : 'bg-white shadow-[4px_4px_0px_#000]'}`}>
              <div className="text-[11px] font-black text-black mb-1 uppercase tracking-wider flex items-center justify-between">
                <span>4. OUTPUT PARSED</span>
                {activeNode === 4 && <span className="text-[10px] bg-black text-white px-1.5 py-0.2">RESOLVED</span>}
              </div>
              <div className="font-mono text-xs font-black text-black bg-[#FAF8F5] p-2 border-2 border-black">
                {activeNode === 4 ? '"AquaTerra", "EcoFlask", "GreenSip"' : 'PENDING PIPELINE OUTPUT...'}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
