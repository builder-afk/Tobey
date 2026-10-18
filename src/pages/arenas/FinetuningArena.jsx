import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sliders, Play, CheckCircle2, ArrowLeft, Settings2, BarChart2, Zap } from 'lucide-react';

export default function FinetuningArena() {
  const navigate = useNavigate();
  const [lr, setLr] = useState(2e-4);
  const [batchSize, setBatchSize] = useState(16);
  const [loraRank, setLoraRank] = useState(8);
  const [isTraining, setIsTraining] = useState(false);
  
  const [metrics, setMetrics] = useState({
    loss: [2.1, 1.8, 1.4, 1.1, 0.9, 0.7],
    eval_loss: [2.2, 1.9, 1.6, 1.4, 1.3, 1.2],
    tokens: [1000, 2000, 3000, 4000, 5000, 6000]
  });

  const handleTrain = () => {
    setIsTraining(true);
    
    let step = 6;
    const interval = setInterval(() => {
      step++;
      setMetrics(prev => {
        const newLoss = Math.max(0.2, prev.loss[prev.loss.length - 1] * 0.9 + (Math.random() * 0.1 - 0.05));
        const newEvalLoss = Math.max(0.4, prev.eval_loss[prev.eval_loss.length - 1] * 0.92 + (Math.random() * 0.1 - 0.03));
        return {
          loss: [...prev.loss, newLoss],
          eval_loss: [...prev.eval_loss, newEvalLoss],
          tokens: [...prev.tokens, step * 1000]
        };
      });
      
      if (step >= 20) {
        clearInterval(interval);
        setIsTraining(false);
      }
    }, 450);
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
            <div className="w-9 h-9 border-2 border-black bg-[#FFDE59] flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <Zap size={18} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">FINETUNING ARENA</h1>
              <p className="text-[11px] font-bold text-gray-600 uppercase">LLAMA 3 8B • LORA ADAPTER OPTIMIZATION</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-[#FAF8F5] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>VRAM: 14.2GB / 24GB</span>
          </div>
          <button 
            onClick={handleTrain}
            disabled={isTraining}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FFDE59] hover:bg-[#ffe57e] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
          >
            {isTraining ? <span className="animate-spin text-sm">⍥</span> : <Play size={14} className="stroke-[3]" />}
            {isTraining ? 'FINE-TUNING...' : 'START RUN'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <CheckCircle2 size={14} className="stroke-[3]" /> DEPLOY ADAPTER
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-5 p-6 bg-[#FAF8F5] overflow-y-auto">
        
        {/* Left Panel: Hyperparameters */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          <div className="bg-white border-4 border-black p-5 shadow-[5px_5px_0px_#000]">
            <h2 className="text-xs font-black uppercase tracking-wider flex items-center gap-2 mb-6 border-b-2 border-black pb-2">
              <Settings2 size={16} className="stroke-[2.5]" /> [ HYPERPARAMETERS ]
            </h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-black uppercase">LEARNING RATE</label>
                  <span className="text-xs font-black bg-[#FFDE59] px-2 py-0.5 border border-black">{lr.toExponential(1)}</span>
                </div>
                <input 
                  type="range" min="1e-5" max="1e-3" step="1e-5" 
                  value={lr} onChange={e => setLr(parseFloat(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                  disabled={isTraining}
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-black uppercase">BATCH SIZE</label>
                  <span className="text-xs font-black bg-[#00F0FF] px-2 py-0.5 border border-black">{batchSize}</span>
                </div>
                <input 
                  type="range" min="1" max="64" step="1" 
                  value={batchSize} onChange={e => setBatchSize(parseInt(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                  disabled={isTraining}
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-black uppercase">LORA RANK (R)</label>
                  <span className="text-xs font-black bg-[#CCFF00] px-2 py-0.5 border border-black">{loraRank}</span>
                </div>
                <input 
                  type="range" min="4" max="64" step="4" 
                  value={loraRank} onChange={e => setLoraRank(parseInt(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                  disabled={isTraining}
                />
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-[#FAF8F5] border-2 border-black shadow-[2px_2px_0px_#000]">
               <h3 className="text-xs font-black uppercase mb-1">TARGET LOSS</h3>
               <p className="text-xs font-bold text-gray-700 uppercase">ACHIEVE EVAL LOSS &lt; 0.6 TO DOMINATE OPPONENT RUN.</p>
            </div>
          </div>
        </div>

        {/* Right Panel: W&B Style Dashboard */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          <div className="bg-white border-4 border-black p-5 flex flex-col min-h-[300px] shadow-[5px_5px_0px_#000]">
            <div className="flex items-center justify-between mb-6 border-b-2 border-black pb-2">
              <h2 className="text-xs font-black uppercase tracking-wider flex items-center gap-2">
                <BarChart2 size={16} className="stroke-[2.5]" /> [ TRAINING &amp; EVALUATION CONVERGENCE ]
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs font-black">
                  <span className="w-3 h-3 bg-[#FFDE59] border border-black inline-block"></span>
                  <span>TRAIN LOSS: {metrics.loss[metrics.loss.length - 1].toFixed(3)}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-black">
                  <span className="w-3 h-3 bg-[#00F0FF] border border-black inline-block"></span>
                  <span>EVAL LOSS: {metrics.eval_loss[metrics.eval_loss.length - 1].toFixed(3)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative border-l-3 border-b-3 border-black mt-4 mx-6 mb-4 min-h-[180px]">
              <div className="absolute -left-7 top-0 text-[10px] font-black">3.0</div>
              <div className="absolute -left-7 top-1/2 text-[10px] font-black">1.5</div>
              <div className="absolute -left-7 bottom-0 text-[10px] font-black">0.0</div>
              
              <svg className="absolute inset-0 w-full h-full overflow-visible">
                <polyline 
                  points={metrics.loss.map((l, i) => `${(i / Math.max(19, metrics.loss.length - 1)) * 100}%,${100 - (l / 3.0) * 100}%`).join(' ')}
                  fill="none" stroke="#FF8811" strokeWidth="4" strokeLinejoin="round" 
                />
                <polyline 
                  points={metrics.eval_loss.map((l, i) => `${(i / Math.max(19, metrics.eval_loss.length - 1)) * 100}%,${100 - (l / 3.0) * 100}%`).join(' ')}
                  fill="none" stroke="#000" strokeWidth="3" strokeDasharray="6,6" strokeLinejoin="round" 
                />
              </svg>
            </div>
          </div>
          
          {/* Logs */}
          <div className="bg-[#18181b] border-4 border-black p-4 flex-1 overflow-y-auto font-mono text-xs shadow-[5px_5px_0px_#000] text-zinc-300 max-h-[220px]">
            <div className="text-white font-black uppercase mb-2 border-b border-zinc-700 pb-1">
              $ wandb: logging active run metrics to weights_and_biases
            </div>
            {metrics.tokens.map((t, i) => (
              <div key={i} className="hover:bg-zinc-800 px-2 py-1 flex justify-between font-mono text-xs">
                <span>STEP {i+1} | TOKENS: {t.toLocaleString()}</span>
                <span className="text-[#FFDE59] font-bold">LOSS: {metrics.loss[i].toFixed(4)}</span>
                <span className="text-[#00F0FF] font-bold">EVAL: {metrics.eval_loss[i].toFixed(4)}</span>
                <span className="text-zinc-500">{lr.toExponential(1)} LR</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
