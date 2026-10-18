import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Network, Play, CheckCircle2, ArrowLeft, Activity, Code2, LineChart } from 'lucide-react';

export default function DeepLearningArena() {
  const navigate = useNavigate();
  const [code, setCode] = useState(`import torch\nimport torch.nn as nn\n\nclass Net(nn.Module):\n    def __init__(self):\n        super(Net, self).__init__()\n        self.fc1 = nn.Linear(784, 128)\n        self.relu = nn.ReLU()\n        self.fc2 = nn.Linear(128, 10)\n\n    def forward(self, x):\n        x = x.view(-1, 784)\n        x = self.fc1(x)\n        x = self.relu(x)\n        x = self.fc2(x)\n        return x\n\nmodel = Net()\n`);
  const [isTraining, setIsTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);

  const handleTrain = () => {
    setIsTraining(true);
    setEpoch(0);
    
    let currentEpoch = 0;
    const interval = setInterval(() => {
      currentEpoch += 1;
      setEpoch(currentEpoch);
      if (currentEpoch >= 10) {
        clearInterval(interval);
        setIsTraining(false);
      }
    }, 400);
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
              <Network size={18} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">DEEP LEARNING</h1>
              <p className="text-[11px] font-bold text-gray-600 uppercase">PYTORCH NEURAL ARCHITECTURE</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleTrain}
            disabled={isTraining}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FFDE59] hover:bg-[#ffe57e] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
          >
            {isTraining ? <span className="animate-spin text-sm">⍥</span> : <Play size={14} className="stroke-[3]" />}
            {isTraining ? 'BACKPROPAGATION...' : 'START TRAINING'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <CheckCircle2 size={14} className="stroke-[3]" /> EVALUATE
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        
        {/* Left Panel: PyTorch Editor & Terminal */}
        <div className="lg:col-span-5 flex flex-col h-full border-r-4 border-black bg-[#18181b] overflow-hidden">
          {/* Editor */}
          <div className="flex-1 flex flex-col relative overflow-hidden">
            <div className="h-10 bg-[#FAF8F5] border-b-3 border-black flex items-center px-4 justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
                <Code2 size={14} className="stroke-[3]" /> model.py
              </div>
              <div className="text-[10px] uppercase font-black bg-[#00F0FF] px-2 py-0.5 border border-black text-black">
                PYTORCH 2.1 • CUDA ACCELERATED
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
          
          {/* Terminal / Training Output */}
          <div className="h-48 bg-white border-t-4 border-black p-4 font-mono text-xs overflow-y-auto">
            <div className="text-black font-black uppercase mb-2">$ python train.py --epochs 10</div>
            {epoch > 0 && Array.from({length: epoch}).map((_, i) => {
              const loss = (2.5 * Math.pow(0.7, i)).toFixed(4);
              const acc = (10 + (i * 8)).toFixed(2);
              return (
                <div key={i} className="text-emerald-700 font-bold">
                  EPOCH [{i+1}/10] :: LOSS: {loss} | ACCURACY: {acc}%
                </div>
              );
            })}
            {isTraining && <div className="text-amber-600 font-black animate-pulse">OPTIMIZING WEIGHT GRADIENTS...</div>}
          </div>
        </div>

        {/* Right Panel: Network Architecture & Graphs */}
        <div className="lg:col-span-7 flex flex-col h-full p-6 bg-[#FAF8F5] overflow-y-auto gap-5">
          
          {/* Architecture Box */}
          <div className="flex-1 min-h-[300px] bg-white border-3 border-black shadow-[4px_4px_0px_#000] p-6 relative overflow-hidden flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF52D9] border-2 border-black font-black text-black text-xs uppercase shadow-[2px_2px_0px_#000] w-fit mb-6">
              <Network size={14} className="stroke-[2.5]" />
              <span>[ TENSOR FLOW GRAPH ]</span>
            </div>
            
            <div className="flex-1 flex items-center justify-around relative">
              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <path d="M 120 80 Q 250 140 380 60" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="4,4" className={isTraining ? "stroke-[#FF52D9] stroke-[3]" : ""} />
                <path d="M 120 130 Q 250 140 380 110" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="4,4" className={isTraining ? "stroke-[#FF52D9] stroke-[3]" : ""} />
                <path d="M 120 180 Q 250 140 380 160" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="4,4" className={isTraining ? "stroke-[#FF52D9] stroke-[3]" : ""} />
                
                <path d="M 380 60 Q 500 120 620 100" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="4,4" className={isTraining ? "stroke-[#00F0FF] stroke-[3]" : ""} />
                <path d="M 380 110 Q 500 120 620 150" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="4,4" className={isTraining ? "stroke-[#00F0FF] stroke-[3]" : ""} />
              </svg>

              {/* Input Layer */}
              <div className="flex flex-col gap-3 z-10 items-center">
                <div className="text-[10px] font-black uppercase text-black bg-[#FAF8F5] px-2 py-0.5 border border-black mb-1">
                  INPUT (784)
                </div>
                {Array.from({length: 4}).map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-white border-2 border-black shadow-[2px_2px_0px_#000]" />
                ))}
                <div className="text-black font-black text-center">⋮</div>
              </div>

              {/* Hidden Layer 1 */}
              <div className="flex flex-col gap-4 z-10 items-center">
                <div className="text-[10px] font-black uppercase text-black bg-[#FF52D9] px-2 py-0.5 border border-black mb-1">
                  FC1 (128) + RELU
                </div>
                {Array.from({length: 4}).map((_, i) => (
                  <div key={i} className={`w-9 h-9 bg-[#FF52D9] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center transition-all ${isTraining ? 'scale-110 bg-[#CCFF00]' : ''}`}>
                    <Activity size={12} className="stroke-[3] text-black" />
                  </div>
                ))}
                <div className="text-black font-black text-center">⋮</div>
              </div>

              {/* Output Layer */}
              <div className="flex flex-col gap-5 z-10 items-center">
                <div className="text-[10px] font-black uppercase text-black bg-[#00F0FF] px-2 py-0.5 border border-black mb-1">
                  FC2 (10)
                </div>
                {Array.from({length: 2}).map((_, i) => (
                  <div key={i} className={`w-10 h-10 bg-[#00F0FF] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center transition-all ${isTraining ? 'scale-110 bg-[#FFDE59]' : ''}`} />
                ))}
                <div className="text-black font-black text-center">⋮</div>
              </div>
            </div>
          </div>

          {/* Loss Curve */}
          <div className="h-44 bg-white border-3 border-black shadow-[4px_4px_0px_#000] p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                <LineChart size={14} className="stroke-[3]" /> [ LOSS CONVERGENCE PROFILE ]
              </span>
              <span className="text-[10px] font-black bg-[#FAF8F5] border border-black px-2 py-0.5">
                CROSS ENTROPY LOSS
              </span>
            </div>
            <div className="flex-1 flex items-end gap-2 px-2 pt-2 border-b-2 border-black">
              {Array.from({length: 10}).map((_, i) => {
                const height = i < epoch ? (Math.pow(0.7, i) * 100) : 0;
                return (
                  <div key={i} className="flex-1 bg-[#FAF8F5] border border-black h-full flex items-end">
                    <div 
                      className="w-full bg-[#CCFF00] border-t-2 border-black transition-all duration-300" 
                      style={{ height: `${height}%` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
