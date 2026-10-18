import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Play, CheckCircle2, ArrowLeft, Search, FileText, Cpu, LayoutTemplate, MessageSquare } from 'lucide-react';

export default function LLMEngineeringArena() {
  const navigate = useNavigate();
  const [code, setCode] = useState(`You are a helpful customer support assistant for 'Acme Corp'.\n\nUse the following context to answer the user's question. If the answer is not in the context, say "I don't know".\n\nContext:\n{context}\n\nQuestion: {question}\nAnswer:`);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [results, setResults] = useState(null);

  const handleRun = () => {
    setIsRunning(true);
    setResults(null);
    let step = 0;
    
    const interval = setInterval(() => {
      step++;
      setActiveStep(step);
      if (step >= 5) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRunning(false);
          setActiveStep(0);
          setResults({
            relevance: 95,
            hallucination: 2,
            latency: '1.2s',
            output: "Acme Corp offers a 30-day return policy on all electronics, provided they are in original packaging."
          });
        }, 800);
      }
    }, 700);
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
            <div className="w-9 h-9 border-2 border-black bg-[#FF52D9] flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <MessageSquare size={18} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">LLM ENGINEERING</h1>
              <p className="text-[11px] font-bold text-gray-600 uppercase">RAG PIPELINE &amp; PROMPT EVALUATION</p>
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
            {isRunning ? 'PIPELINE EVALUATION...' : 'RUN PIPELINE'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <CheckCircle2 size={14} className="stroke-[3]" /> SUBMIT PROMPT
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 overflow-hidden">
        
        {/* Left Panel: RAG Visualizer & Output */}
        <div className="flex flex-col gap-5 overflow-y-auto pr-1">
          
          <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000]">
            <h2 className="text-xs font-black uppercase tracking-wider flex items-center gap-2 mb-6 border-b-2 border-black pb-2 text-black">
              <Search size={16} className="stroke-[2.5]" /> [ RAG RETRIEVAL TOPOLOGY ]
            </h2>

            <div className="flex items-center justify-between px-2 relative py-3">
              <div className="absolute left-6 right-6 top-1/2 h-1 bg-black -z-0" />

              <div className={`flex flex-col items-center gap-2 transition-all z-10 ${activeStep >= 1 ? 'scale-105' : ''}`}>
                <div className={`w-12 h-12 border-3 border-black flex items-center justify-center shadow-[2px_2px_0px_#000] ${activeStep >= 1 ? 'bg-[#FFDE59]' : 'bg-white'}`}>
                  <FileText size={20} className="stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-black uppercase">QUERY</span>
              </div>

              <div className={`flex flex-col items-center gap-2 transition-all z-10 ${activeStep >= 2 ? 'scale-105' : ''}`}>
                <div className={`w-12 h-12 border-3 border-black flex items-center justify-center shadow-[2px_2px_0px_#000] ${activeStep >= 2 ? 'bg-[#00F0FF]' : 'bg-white'}`}>
                  <Cpu size={20} className="stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-black uppercase">EMBED</span>
              </div>

              <div className={`flex flex-col items-center gap-2 transition-all z-10 ${activeStep >= 3 ? 'scale-105' : ''}`}>
                <div className={`w-12 h-12 border-3 border-black flex items-center justify-center shadow-[2px_2px_0px_#000] ${activeStep >= 3 ? 'bg-[#CCFF00]' : 'bg-white'}`}>
                  <Database size={20} className="stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-black uppercase">VECTOR DB</span>
              </div>

              <div className={`flex flex-col items-center gap-2 transition-all z-10 ${activeStep >= 4 ? 'scale-105' : ''}`}>
                <div className={`w-12 h-12 border-3 border-black flex items-center justify-center shadow-[2px_2px_0px_#000] ${activeStep >= 4 ? 'bg-[#FF52D9]' : 'bg-white'}`}>
                  <MessageSquare size={20} className="stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-black uppercase">LLM</span>
              </div>
            </div>
          </div>

          {/* Test Case & Output */}
          <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000] flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3 border-b-2 border-black pb-2">
                <h3 className="font-black text-xs uppercase text-black">[ EVALUATION TEST CASE #1 ]</h3>
                <span className="px-2 py-0.5 bg-[#FAF8F5] border border-black text-[10px] font-bold">LATENCY &lt; 2.0S</span>
              </div>
              <div className="space-y-3">
                <div className="bg-[#FAF8F5] p-3 border-2 border-black shadow-[2px_2px_0px_#000]">
                  <span className="text-[10px] font-black uppercase text-gray-600">USER INPUT</span>
                  <p className="text-xs font-bold mt-1 text-black">WHAT IS THE RETURN POLICY FOR A LAPTOP?</p>
                </div>
                <div className="bg-[#FAF8F5] p-3 border-2 border-black shadow-[2px_2px_0px_#000]">
                  <span className="text-[10px] font-black uppercase text-gray-600">RETRIEVED CHUNKS (COSINE SIMILARITY &gt; 0.88)</span>
                  <p className="text-xs font-mono font-bold mt-1 text-black">
                    "...Acme Corp offers a 30-day return policy on all electronics, provided they are in original packaging. Software is non-refundable..."
                  </p>
                </div>
                
                <div className="bg-white p-3 border-2 border-black shadow-[2px_2px_0px_#000] min-h-[90px]">
                  <span className="text-[10px] font-black uppercase bg-[#CCFF00] px-1.5 py-0.2 border border-black inline-block mb-1">
                    GENERATED COMPLETION
                  </span>
                  {results ? (
                    <p className="text-xs font-bold text-black mt-1 leading-relaxed">{results.output}</p>
                  ) : (
                    activeStep === 4 ? (
                      <div className="mt-2 text-xs font-black animate-pulse text-indigo-700">GENERATING SYNTACTIC STREAM...</div>
                    ) : (
                      <div className="mt-2 text-xs font-bold text-gray-400 uppercase">// AWAITING PIPELINE EXECUTION</div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Panel: Prompt Editor & Evals */}
        <div className="flex flex-col gap-5 overflow-hidden">
          
          <div className="bg-white border-4 border-black flex flex-col flex-1 shadow-[4px_4px_0px_#000] overflow-hidden">
            <div className="h-10 bg-[#FAF8F5] border-b-3 border-black flex items-center px-4 justify-between">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-black">
                <LayoutTemplate size={14} className="stroke-[3]" /> [ SYSTEM PROMPT TEMPLATE ]
              </div>
              <span className="text-[10px] font-black uppercase bg-[#FFDE59] px-2 py-0.5 border border-black">
                JINJA2 / MUSTACHE
              </span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-[#18181b] text-zinc-100 p-5 font-mono text-xs md:text-sm focus:outline-none resize-none leading-relaxed selection:bg-[#CCFF00] selection:text-black"
              spellCheck="false"
            />
          </div>

          {/* Eval Scores */}
          <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000]">
            <h2 className="text-xs font-black uppercase tracking-wider mb-4 border-b-2 border-black pb-2 text-black">
              [ RAG EVALUATION METRICS ]
            </h2>
            
            {results ? (
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 bg-[#FAF8F5] border-2 border-black shadow-[2px_2px_0px_#000]">
                  <div className="text-xl font-black text-black">{results.relevance}%</div>
                  <div className="text-[10px] font-black uppercase text-gray-700 mt-0.5">RELEVANCE</div>
                </div>
                <div className="p-2 bg-[#FAF8F5] border-2 border-black shadow-[2px_2px_0px_#000]">
                  <div className="text-xl font-black text-emerald-700">{results.hallucination}%</div>
                  <div className="text-[10px] font-black uppercase text-gray-700 mt-0.5">HALLUCINATION</div>
                </div>
                <div className="p-2 bg-[#FAF8F5] border-2 border-black shadow-[2px_2px_0px_#000]">
                  <div className="text-xl font-black text-blue-700">{results.latency}</div>
                  <div className="text-[10px] font-black uppercase text-gray-700 mt-0.5">LATENCY</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-xs font-bold text-gray-500 uppercase">
                // EXECUTE PIPELINE TO CALCULATE RAGAS EVALUATION METRICS
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
