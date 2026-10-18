import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Play, CheckCircle2, ArrowLeft, Terminal, LayoutTemplate, Layers } from 'lucide-react';

export default function DockerArena() {
  const navigate = useNavigate();
  const [code, setCode] = useState(`FROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/build /usr/share/nginx/html\nEXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]`);
  const [isBuilding, setIsBuilding] = useState(false);
  const [logs, setLogs] = useState([
    "[+] Building 0.0s (0/0)"
  ]);
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleBuild = () => {
    setIsBuilding(true);
    setLogs(["[+] Building..."]);
    
    const steps = [
      " => [internal] load build definition from Dockerfile",
      " => => transferring dockerfile: 233B",
      " => [internal] load .dockerignore",
      " => [internal] load metadata for docker.io/library/nginx:alpine",
      " => [internal] load metadata for docker.io/library/node:18-alpine",
      " => [builder 1/6] FROM docker.io/library/node:18-alpine",
      " => [builder 2/6] WORKDIR /app",
      " => [builder 3/6] COPY package*.json ./",
      " => [builder 4/6] RUN npm install",
      " => [builder 5/6] COPY . .",
      " => [builder 6/6] RUN npm run build",
      " => [stage-1 1/2] FROM docker.io/library/nginx:alpine",
      " => [stage-1 2/2] COPY --from=builder /app/build /usr/share/nginx/html",
      " => exporting to image",
      " => => exporting layers",
      " => => writing image sha256:7f4a...e31b",
      " => => naming to docker.io/library/my-react-app:latest",
      "\nDONE! Image built successfully."
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setLogs(prev => [...prev, steps[stepIndex]]);
        stepIndex++;
      } else {
        clearInterval(interval);
        setIsBuilding(false);
      }
    }, 350);
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
              <Box size={18} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">DOCKER BUILDS</h1>
              <p className="text-[11px] font-bold text-gray-600 uppercase">MULTI-STAGE CONTAINER OPTIMIZATION</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBuild}
            disabled={isBuilding}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FFDE59] hover:bg-[#ffe57e] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
          >
            {isBuilding ? <span className="animate-spin text-sm">⍥</span> : <Play size={14} className="stroke-[3]" />}
            {isBuilding ? 'BUILDING LAYERS...' : 'DOCKER BUILD .'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <CheckCircle2 size={14} className="stroke-[3]" /> DEPLOY IMAGE
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-hidden">
        
        {/* Left Panel: Dockerfile Editor */}
        <div className="flex flex-col border-4 border-black bg-[#18181b] relative overflow-hidden shadow-[5px_5px_0px_#000]">
          <div className="h-10 bg-[#FAF8F5] border-b-3 border-black flex items-center px-4 justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
              <LayoutTemplate size={14} className="stroke-[3]" /> Dockerfile
            </div>
            <span className="text-[10px] font-black uppercase bg-[#00F0FF] px-2 py-0.5 border border-black text-black">
              MULTI-STAGE ALPINE
            </span>
          </div>
          <div className="flex-1 flex relative overflow-hidden">
            <div className="w-12 bg-[#18181b] border-r border-zinc-700 py-6 text-zinc-500 font-mono text-xs select-none flex flex-col items-center">
              {Array.from({length: 15}).map((_, i) => <span key={i} className="leading-relaxed">{i + 1}</span>)}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-emerald-400 p-6 font-mono text-xs md:text-sm focus:outline-none resize-none leading-relaxed selection:bg-[#CCFF00] selection:text-black"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Right Panel: Build Logs & Analysis */}
        <div className="flex flex-col gap-4 overflow-hidden">
          
          {/* Build Output */}
          <div className="bg-white border-4 border-black flex-1 p-4 flex flex-col shadow-[5px_5px_0px_#000] overflow-hidden">
            <div className="flex items-center gap-2 mb-3 text-xs font-black text-black uppercase tracking-wider border-b-2 border-black pb-2">
              <Terminal size={14} className="stroke-[3]" /> [ BUILDX LOG STREAM ]
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-xs text-black bg-[#FAF8F5] border-2 border-black p-3 space-y-1">
              {logs.map((log, i) => (
                <div key={i} className={log.includes('DONE') ? 'text-emerald-700 font-black mt-3' : log.includes('error') ? 'text-red-600 font-black' : 'font-bold'}>
                  {log}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>

          {/* Analysis / Image Info */}
          <div className="bg-white border-4 border-black p-4 flex flex-col shadow-[5px_5px_0px_#000]">
            <div className="flex items-center gap-2 mb-3 text-xs font-black text-black uppercase tracking-wider">
              <Layers size={14} className="stroke-[3]" /> [ ARTIFACT METRICS ]
            </div>
            <div className="grid grid-cols-3 gap-3 bg-[#FAF8F5] border-2 border-black p-3 text-center">
              <div>
                <span className="text-[10px] text-gray-600 uppercase font-black">IMAGE SIZE</span>
                <div className="text-xl font-black text-black mt-0.5">22.4 MB</div>
              </div>
              <div className="border-x-2 border-black">
                <span className="text-[10px] text-gray-600 uppercase font-black">BASE RUNTIME</span>
                <div className="text-sm font-black text-black mt-1">nginx:alpine</div>
              </div>
              <div>
                <span className="text-[10px] text-gray-600 uppercase font-black">ACTIVE LAYERS</span>
                <div className="text-xl font-black text-black mt-0.5">6 STAGES</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
