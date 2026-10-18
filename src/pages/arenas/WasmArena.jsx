import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Play, CheckCircle2, ArrowLeft, Terminal, Cpu, Activity, Zap } from 'lucide-react';

export default function WasmArena() {
  const navigate = useNavigate();
  const [code, setCode] = useState(`#[no_mangle]\npub extern "C" fn fibonacci(n: i32) -> i32 {\n    if n <= 1 {\n        return n;\n    }\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}`);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);

  const handleRun = () => {
    setIsRunning(true);
    setResults(null);
    
    setTimeout(() => {
      setIsRunning(false);
      setResults({
        jsTime: 1450,
        wasmTime: 125,
        speedup: '11.6X'
      });
    }, 1500);
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
              <Cpu size={18} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">WEBASSEMBLY</h1>
              <p className="text-[11px] font-bold text-gray-600 uppercase">RUST TO WASM BENCHMARK COMBAT</p>
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
            {isRunning ? 'COMPILING WASM...' : 'COMPILE & BENCHMARK'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <CheckCircle2 size={14} className="stroke-[3]" /> SUBMIT MODULE
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
        
        {/* Left Panel: Rust Editor */}
        <div className="flex flex-col border-r-4 border-black bg-[#18181b] relative overflow-hidden">
          <div className="h-10 bg-[#FAF8F5] border-b-3 border-black flex items-center px-4 justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
              <Terminal size={14} className="stroke-[3]" /> lib.rs
            </div>
            <span className="text-[10px] font-black uppercase bg-[#00F0FF] px-2 py-0.5 border border-black text-black">
              WASM32-UNKNOWN
            </span>
          </div>
          
          <div className="flex-1 flex relative overflow-hidden">
            <div className="w-12 bg-[#18181b] border-r border-zinc-700 py-6 text-zinc-500 font-mono text-xs select-none flex flex-col items-center">
              {Array.from({length: 15}).map((_, i) => <span key={i} className="leading-relaxed">{i + 1}</span>)}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-zinc-100 p-6 font-mono text-xs md:text-sm focus:outline-none resize-none leading-relaxed selection:bg-[#CCFF00] selection:text-black"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Right Panel: Benchmarks */}
        <div className="flex flex-col bg-[#FAF8F5] p-6 gap-5 overflow-y-auto">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] border-2 border-black font-black text-black text-xs uppercase shadow-[2px_2px_0px_#000] w-fit">
            <Activity size={14} className="stroke-[2.5]" />
            <span>[ WASM EXECUTION PROFILER ]</span>
          </div>
          <p className="text-xs font-bold text-gray-700 uppercase">// BENCHMARK WORKLOAD: CALCULATE FIBONACCI(40) 100 CONSECUTIVE INVOCATIONS.</p>

          <div className="bg-white border-4 border-black p-6 flex flex-col gap-6 shadow-[5px_5px_0px_#000]">
            
            {/* JS Bar */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-black uppercase">
                <span className="flex items-center gap-1.5 text-black">
                  <Code2 size={16} className="stroke-[2.5]" /> V8 JAVASCRIPT JIT
                </span>
                <span className="font-mono bg-[#FAF8F5] border border-black px-2 py-0.5">{results ? `${results.jsTime} MS` : '-- MS'}</span>
              </div>
              <div className="h-5 bg-[#FAF8F5] border-2 border-black overflow-hidden shadow-[1px_1px_0px_#000]">
                <div 
                  className="h-full bg-[#FF8811] border-r-2 border-black transition-all duration-700" 
                  style={{ width: results ? '100%' : '0%' }}
                />
              </div>
            </div>

            {/* Wasm Bar */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-black uppercase">
                <span className="flex items-center gap-1.5 text-black">
                  <Cpu size={16} className="stroke-[2.5]" /> WEBASSEMBLY (AOT RUST)
                </span>
                <span className="font-mono bg-[#CCFF00] border border-black px-2 py-0.5">{results ? `${results.wasmTime} MS` : '-- MS'}</span>
              </div>
              <div className="h-5 bg-[#FAF8F5] border-2 border-black overflow-hidden shadow-[1px_1px_0px_#000]">
                <div 
                  className="h-full bg-[#CCFF00] border-r-2 border-black transition-all duration-700" 
                  style={{ width: results ? `${(results.wasmTime / results.jsTime) * 100}%` : '0%' }}
                />
              </div>
            </div>

          </div>

          {/* Results Summary */}
          {results && (
            <div className="bg-[#CCFF00] border-4 border-black p-5 flex items-center justify-between shadow-[5px_5px_0px_#000] animate-in fade-in zoom-in duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center text-black shadow-[2px_2px_0px_#000]">
                  <Zap size={24} className="stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-black uppercase">PERFORMANCE MULTIPLIER</h3>
                  <p className="text-xs font-bold text-gray-800 uppercase">WASM MODULE BYPASSES GARBAGE COLLECTION AND RUNS AT BARE-METAL VELOCITY.</p>
                </div>
              </div>
              <div className="text-4xl font-black text-black bg-white border-3 border-black px-4 py-1 shadow-[3px_3px_0px_#000]">
                {results.speedup}
              </div>
            </div>
          )}

          {isRunning && (
            <div className="bg-black text-[#00F0FF] border-3 border-black p-4 font-mono text-xs space-y-1 shadow-[4px_4px_0px_#000] mt-auto">
              <div className="text-white font-black uppercase">$ rustc --target wasm32-unknown-unknown -O lib.rs</div>
              <div className="animate-pulse">OPTIMIZING LLVM IR OBJECT BYTECODE...</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
