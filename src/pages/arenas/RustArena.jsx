import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Play, CheckCircle2, Terminal, ShieldAlert, Cpu as Memory, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function RustArena() {
  const navigate = useNavigate();
  const [code, setCode] = useState('fn main() {\n    let mut data = vec![1, 2, 3];\n    let r1 = &data;\n    let r2 = &mut data; // Borrow checker will complain here\n    println!("{} {}", r1[0], r2[0]);\n}');
  const [isCompiling, setIsCompiling] = useState(false);
  const [output, setOutput] = useState(null);

  const handleCompile = () => {
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      if (code.includes('&mut data') && code.includes('&data')) {
        setOutput({
          type: 'error',
          msg: 'error[E0502]: cannot borrow `data` as mutable because it is also borrowed as immutable\n  --> src/main.rs:4:14\n   |\n 3 |     let r1 = &data;\n   |              ----- immutable borrow occurs here\n 4 |     let r2 = &mut data;\n   |              ^^^^^^^^^ mutable borrow occurs here\n 5 |     println!("{} {}", r1[0], r2[0]);\n   |                       ----- immutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.'
        });
      } else {
        setOutput({
          type: 'success',
          msg: 'Compiling project v0.1.0\n    Finished release [optimized] target(s) in 0.42s\n     Running `target/release/project`\n\nResult: [1, 2, 3]'
        });
      }
    }, 1200);
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
              <Cpu size={18} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">RUST SYSTEMS</h1>
              <p className="text-[11px] font-bold text-gray-600 uppercase">SAFE CONCURRENCY CHALLENGE</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleCompile}
            disabled={isCompiling}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#00F0FF] hover:bg-[#33f3ff] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
          >
            {isCompiling ? <span className="animate-spin text-sm">⍥</span> : <Play size={14} className="stroke-[3]" />}
            {isCompiling ? 'CARGO BUILD...' : 'RUN (RELEASE)'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <CheckCircle2 size={14} className="stroke-[3]" /> SUBMIT & BENCHMARK
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        
        {/* Left Panel: Problem & Borrow Checker Graph */}
        <div className="lg:col-span-4 flex flex-col p-5 bg-[#FAF8F5] border-r-4 border-black overflow-y-auto">
          <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000] mb-5">
            <h2 className="text-lg font-black text-black uppercase tracking-tight mb-2">
              THREAD-SAFE DATA PROCESSING
            </h2>
            <div className="flex gap-2 mb-3">
              <span className="px-2.5 py-0.5 bg-[#FF0033] text-white border-2 border-black text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]">
                HARDCORE
              </span>
              <span className="px-2.5 py-0.5 bg-[#FAF8F5] border-2 border-black text-black text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]">
                ARC&lt;MUTEX&lt;T&gt;&gt;
              </span>
            </div>
            <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed bg-[#FAF8F5] border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
              // WRITE A RUST FUNCTION THAT TAKES A VECTOR OF INTEGERS, SPLITS IT ACROSS 4 THREADS, COMPUTES THE SUM OF EACH CHUNK SAFELY, AND RETURNS THE TOTAL SUM WITHOUT DATA RACES.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] border-2 border-black font-black text-black text-xs uppercase shadow-[2px_2px_0px_#000]">
              <ShieldCheck size={14} className="stroke-[2.5]" />
              <span>[ BORROW CHECKER ANALYSIS ]</span>
            </div>
            
            <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000]">
              <div className="text-xs font-black uppercase text-black mb-3">LIFETIMES & OWNERSHIP TRACKER</div>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-black text-blue-600">data</span>
                  <div className="flex-1 mx-3 h-2 bg-gray-200 border border-black overflow-hidden">
                    <div className="w-full h-full bg-[#00F0FF]" />
                  </div>
                  <span className="text-[10px] font-black bg-black text-white px-1.5 py-0.2">OWNER</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-black text-emerald-600">r1</span>
                  <div className="flex-1 mx-3 h-2 bg-gray-200 border border-black overflow-hidden">
                    <div className="w-2/3 h-full bg-[#CCFF00]" />
                  </div>
                  <span className="text-[10px] font-black bg-gray-200 border border-black px-1.5 py-0.2">&amp;T</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-black text-red-600">r2</span>
                  <div className="flex-1 mx-3 h-2 bg-gray-200 border border-black overflow-hidden">
                    <div className="w-1/2 h-full bg-[#FF0033]" />
                  </div>
                  <span className="text-[10px] font-black bg-gray-200 border border-black px-1.5 py-0.2">&amp;MUT T</span>
                </div>
              </div>
              
              {output?.type === 'error' && (
                <div className="mt-4 p-3 bg-[#FF0033] text-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-start gap-2 text-xs font-bold uppercase">
                  <ShieldAlert size={16} className="shrink-0 stroke-[3]" />
                  <span>CONFLICT: MUTABLE AND IMMUTABLE BORROWS OVERLAP IN SCOPE.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Editor & Terminal */}
        <div className="lg:col-span-8 flex flex-col h-full bg-[#18181b] overflow-hidden">
          
          {/* Rust Editor */}
          <div className="flex-1 flex flex-col relative overflow-hidden">
            <div className="h-10 bg-[#FAF8F5] border-b-3 border-black flex items-center justify-between px-4">
              <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
                <Memory size={14} className="stroke-[3]" /> src/main.rs
              </div>
              <span className="text-[10px] font-black uppercase bg-[#FF8811] px-2 py-0.5 border border-black text-white">
                RUST EDITION 2024
              </span>
            </div>
            <div className="flex-1 flex relative overflow-hidden">
              <div className="w-12 bg-[#18181b] border-r border-zinc-700 py-6 text-zinc-500 font-mono text-xs select-none flex flex-col items-center">
                {Array.from({length: 12}).map((_, i) => <span key={i} className="leading-relaxed">{i + 1}</span>)}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent text-zinc-100 p-6 font-mono text-xs md:text-sm focus:outline-none resize-none leading-relaxed selection:bg-[#CCFF00] selection:text-black"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Rustc Terminal */}
          <div className="h-64 bg-white border-t-4 border-black flex flex-col overflow-hidden">
            <div className="h-10 border-b-3 border-black flex items-center px-4 bg-[#FAF8F5] gap-3">
              <span className="px-3 py-1 bg-black text-white font-mono font-black uppercase text-xs">
                [ CARGO COMPILER TERMINAL ]
              </span>
            </div>
            
            <div className="p-4 overflow-auto flex-1 font-mono text-xs">
              {output ? (
                <pre className={`font-mono text-xs font-bold leading-relaxed whitespace-pre-wrap p-3 border-2 border-black ${
                  output.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-800'
                }`}>
                  {output.msg}
                </pre>
              ) : (
                <div className="flex items-center gap-2 text-gray-500 font-bold uppercase">
                  <Terminal size={14} className="stroke-[3]" />
                  <span>$ cargo run --release</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
