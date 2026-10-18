import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Server, Database, Globe, Cpu, ArrowLeft, Play, CheckCircle2, Cloud, Layers, Plus } from 'lucide-react';

export default function SystemDesignArena() {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState([
    { id: 1, type: 'client', x: 50, y: 150, label: 'Client (Mobile)' },
    { id: 2, type: 'lb', x: 260, y: 150, label: 'API Gateway' },
    { id: 3, type: 'server', x: 500, y: 100, label: 'Auth Service' },
    { id: 4, type: 'database', x: 740, y: 150, label: 'PostgreSQL' }
  ]);

  const [isRunning, setIsRunning] = useState(false);

  const simulateTraffic = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 2500);
  };

  const addNode = (type) => {
    const labels = {
      server: 'New Microservice',
      database: 'Redis Cache',
      lb: 'Load Balancer'
    };
    setNodes([...nodes, { 
      id: Date.now(), 
      type, 
      x: 300 + Math.random() * 200, 
      y: 180 + Math.random() * 100, 
      label: labels[type] 
    }]);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF8F5] text-black font-mono overflow-hidden">
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
              <Layers size={18} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">SYSTEM DESIGN BATTLES</h1>
              <p className="text-[11px] font-bold text-gray-600 uppercase">DESIGN GLOBAL E-COMMERCE ARCHITECTURE</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-white border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] flex items-center gap-2">
            <span className="text-gray-600">INFRA COST:</span>
            <span className="text-black bg-[#CCFF00] px-1.5 py-0.2 border border-black">$4,200/MO</span>
          </div>
          <button 
            onClick={simulateTraffic}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FFDE59] hover:bg-[#ffe57e] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
          >
            {isRunning ? <span className="animate-spin text-sm">⍥</span> : <Play size={14} className="stroke-[3]" />}
            {isRunning ? 'SIMULATING 1M RPS...' : 'RUN LOAD TEST'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <CheckCircle2 size={14} className="stroke-[3]" /> SUBMIT DESIGN
          </button>
        </div>
      </div>

      <div className="flex-1 flex relative overflow-hidden">
        
        {/* Toolbar */}
        <div className="w-72 bg-white border-r-4 border-black p-5 flex flex-col gap-4 z-10 shadow-[4px_0px_0px_#000] overflow-y-auto">
          <span className="px-2.5 py-1 bg-black text-white font-black text-xs uppercase w-fit">
            [ ARCHITECTURE PALETTE ]
          </span>
          
          <button onClick={() => addNode('server')} className="flex items-center gap-3 p-3 bg-[#FAF8F5] hover:bg-[#00F0FF] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-left group">
            <div className="w-9 h-9 border-2 border-black bg-white flex items-center justify-center shadow-[1px_1px_0px_#000]">
              <Server size={18} className="text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="font-black text-xs uppercase text-black">+ COMPUTE NODE</div>
              <div className="text-[10px] font-bold text-gray-600 uppercase">EC2, ECS, LAMBDA</div>
            </div>
          </button>

          <button onClick={() => addNode('database')} className="flex items-center gap-3 p-3 bg-[#FAF8F5] hover:bg-[#CCFF00] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-left group">
            <div className="w-9 h-9 border-2 border-black bg-white flex items-center justify-center shadow-[1px_1px_0px_#000]">
              <Database size={18} className="text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="font-black text-xs uppercase text-black">+ DATABASE / CACHE</div>
              <div className="text-[10px] font-bold text-gray-600 uppercase">POSTGRES, REDIS</div>
            </div>
          </button>

          <button onClick={() => addNode('lb')} className="flex items-center gap-3 p-3 bg-[#FAF8F5] hover:bg-[#FF52D9] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-left group">
            <div className="w-9 h-9 border-2 border-black bg-white flex items-center justify-center shadow-[1px_1px_0px_#000]">
              <Cloud size={18} className="text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="font-black text-xs uppercase text-black">+ NETWORK GATEWAY</div>
              <div className="text-[10px] font-bold text-gray-600 uppercase">CDN, LOAD BALANCER</div>
            </div>
          </button>
          
          <div className="mt-auto p-4 bg-[#FAF8F5] border-3 border-black shadow-[3px_3px_0px_#000]">
            <h4 className="font-black text-xs uppercase text-black mb-2 flex items-center gap-1.5">
              <span>[ SLA REQUIREMENTS ]</span>
            </h4>
            <ul className="text-xs font-bold text-gray-800 uppercase space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="stroke-[3] text-emerald-600" />
                <span>HANDLE 1M RPS</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-black bg-[#FFDE59] inline-block shadow-[1px_1px_0px_#000]" />
                <span>HIGH AVAILABILITY</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-black bg-[#CCFF00] inline-block shadow-[1px_1px_0px_#000]" />
                <span>LATENCY &lt; 200MS</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative bg-[#FAF8F5] overflow-hidden" 
             style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.12) 1.5px, transparent 0)', backgroundSize: '32px 32px' }}>
          
          {/* Simulated connection lines */}
          <svg className="absolute inset-0 pointer-events-none w-full h-full">
            <path d="M 90 170 C 160 170, 200 170, 260 170" fill="none" stroke="#000" strokeWidth="3" strokeDasharray="6,6" className={isRunning ? 'stroke-[#FF0033] stroke-[4]' : ''} />
            <path d="M 300 170 C 400 170, 420 120, 500 120" fill="none" stroke="#000" strokeWidth="3" strokeDasharray="6,6" className={isRunning ? 'stroke-[#FF0033] stroke-[4]' : ''} />
            <path d="M 540 120 C 640 120, 660 170, 740 170" fill="none" stroke="#000" strokeWidth="3" strokeDasharray="6,6" className={isRunning ? 'stroke-[#FF0033] stroke-[4]' : ''} />
          </svg>

          {/* Render Nodes */}
          {nodes.map(node => (
            <div 
              key={node.id}
              className={`absolute p-4 border-3 border-black shadow-[4px_4px_0px_#000] cursor-move transition-all ${
                isRunning && node.type === 'server' 
                  ? 'bg-[#FF0033] text-white shadow-[6px_6px_0px_#000] -translate-y-1' 
                  : 'bg-white text-black hover:shadow-[7px_7px_0px_#000]'
              }`}
              style={{ left: node.x, top: node.y }}
            >
              <div className="flex flex-col items-center gap-2 min-w-[120px]">
                {node.type === 'client' && <Globe size={24} className="stroke-[2.5]" />}
                {node.type === 'lb' && <Cloud size={24} className="stroke-[2.5]" />}
                {node.type === 'server' && <Server size={24} className="stroke-[2.5]" />}
                {node.type === 'database' && <Database size={24} className="stroke-[2.5]" />}
                <span className="text-xs font-black uppercase">{node.label}</span>
                {isRunning && node.type === 'server' && (
                  <div className="absolute -top-3 -right-3 bg-black text-[#CCFF00] border-2 border-black text-[9px] font-black uppercase px-2 py-0.5 shadow-[2px_2px_0px_#000] animate-bounce">
                    OVERLOADED
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
