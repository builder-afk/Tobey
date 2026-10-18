import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Play, CheckCircle2, ArrowLeft, ScatterChart, Code2 } from 'lucide-react';

export default function MLArena() {
  const navigate = useNavigate();
  const [code, setCode] = useState(`import numpy as np\n\ndef k_means(X, k=3, max_iters=100):\n    # Initialize centroids randomly\n    centroids = X[np.random.choice(X.shape[0], k, replace=False)]\n    \n    for _ in range(max_iters):\n        # Assign clusters\n        distances = np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)\n        labels = np.argmin(distances, axis=1)\n        \n        # Update centroids\n        new_centroids = np.array([X[labels == i].mean(axis=0) for i in range(k)])\n        \n        if np.all(centroids == new_centroids):\n            break\n        centroids = new_centroids\n        \n    return labels, centroids\n`);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);

  // Mock data points
  const points = Array.from({ length: 150 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    cluster: 0
  }));

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setResults({
        accuracy: 94.2,
        time: '42ms',
        clusters: 3
      });
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
              <BrainCircuit size={18} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">ML ALGORITHMS</h1>
              <p className="text-[11px] font-bold text-gray-600 uppercase">K-MEANS CLUSTERING FROM SCRATCH</p>
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
            {isRunning ? 'TRAINING ITERATIONS...' : 'RUN ALGORITHM'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <CheckCircle2 size={14} className="stroke-[3]" /> SUBMIT MODEL
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
        
        {/* Left Panel: Python Editor */}
        <div className="flex flex-col border-r-4 border-black bg-[#18181b] relative">
          <div className="h-10 bg-[#FAF8F5] border-b-3 border-black flex items-center px-4 justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
              <Code2 size={14} className="stroke-[3]" /> solution.py
            </div>
            <div className="text-[10px] uppercase font-black bg-[#CCFF00] px-2 py-0.5 border border-black text-black">
              PYTHON 3.10 • PURE NUMPY
            </div>
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

        {/* Right Panel: Visualization & Metrics */}
        <div className="flex flex-col bg-[#FAF8F5] p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F0FF] border-2 border-black font-black text-black text-xs uppercase shadow-[2px_2px_0px_#000]">
              <ScatterChart size={14} className="stroke-[2.5]" />
              <span>[ 2D CLUSTERING SPACE ]</span>
            </div>
            {results && (
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                  ACCURACY: {results.accuracy}%
                </div>
                <div className="px-3 py-1 bg-[#FFDE59] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                  LATENCY: {results.time}
                </div>
              </div>
            )}
          </div>

          {/* Scatter Plot Box */}
          <div className="flex-1 min-h-[300px] bg-white border-3 border-black shadow-[5px_5px_0px_#000] relative overflow-hidden flex items-center justify-center p-8">
            <div className="relative w-full h-full max-w-md max-h-md border-l-3 border-b-3 border-black">
              {points.map((p, i) => {
                let colorClass = "bg-zinc-400 border border-black";
                if (results) {
                  if (p.x > 50 && p.y > 50) colorClass = "bg-[#00F0FF] border border-black";
                  else if (p.x < 50 && p.y > 50) colorClass = "bg-[#FFDE59] border border-black";
                  else colorClass = "bg-[#CCFF00] border border-black";
                }
                
                return (
                  <div 
                    key={i} 
                    className={`absolute w-3.5 h-3.5 ${colorClass} ${results ? 'shadow-[1px_1px_0px_#000]' : ''}`}
                    style={{ 
                      left: `${p.x}%`, 
                      bottom: `${p.y}%`,
                      transform: 'translate(-50%, 50%)',
                      opacity: isRunning ? 0.3 : 1
                    }}
                  />
                );
              })}

              {/* Centroids */}
              {results && (
                <>
                  <div className="absolute w-5 h-5 bg-black border-2 border-white rotate-45 z-10 shadow-[2px_2px_0px_#000]" style={{ left: '75%', bottom: '75%', transform: 'translate(-50%, 50%) rotate(45deg)' }} />
                  <div className="absolute w-5 h-5 bg-[#FF0033] border-2 border-black rotate-45 z-10 shadow-[2px_2px_0px_#000]" style={{ left: '25%', bottom: '75%', transform: 'translate(-50%, 50%) rotate(45deg)' }} />
                  <div className="absolute w-5 h-5 bg-[#7000FF] border-2 border-white rotate-45 z-10 shadow-[2px_2px_0px_#000]" style={{ left: '50%', bottom: '25%', transform: 'translate(-50%, 50%) rotate(45deg)' }} />
                </>
              )}
            </div>
          </div>

          <div className="mt-5 p-4 bg-white border-3 border-black shadow-[3px_3px_0px_#000]">
            <span className="font-black text-xs uppercase bg-[#FFDE59] px-2 py-0.5 border border-black mr-2">OBJECTIVE</span>
            <span className="text-xs font-bold text-gray-800 uppercase leading-relaxed">
              IMPLEMENT K-MEANS FROM FIRST PRINCIPLES USING PURE VECTORIZED NUMPY MATRIX OPERATIONS. SCIKIT-LEARN IS BANNED. MODEL MUST CONVERGE UNDER 100 ITERATIONS.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
