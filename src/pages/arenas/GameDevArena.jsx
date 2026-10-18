import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Play, CheckCircle2, ArrowLeft, Terminal, MonitorPlay, Layers } from 'lucide-react';

export default function GameDevArena() {
  const navigate = useNavigate();
  const [code, setCode] = useState(`// GLSL Shader Code\nprecision mediump float;\n\nuniform float u_time;\nuniform vec2 u_resolution;\n\nvoid main() {\n    vec2 st = gl_FragCoord.xy / u_resolution;\n    \n    // Simple animated gradient\n    float r = abs(sin(u_time * 0.5 + st.x));\n    float g = abs(cos(u_time * 0.8 + st.y));\n    float b = abs(sin(u_time * 1.2));\n    \n    gl_FragColor = vec4(r, g, b, 1.0);\n}`);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCompile = () => {
    setIsCompiling(true);
    setIsPlaying(false);
    
    setTimeout(() => {
      setIsCompiling(false);
      setIsPlaying(true);
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
            <div className="w-9 h-9 border-2 border-black bg-[#CCFF00] flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <Gamepad2 size={18} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">GAME DEV &amp; SHADERS</h1>
              <p className="text-[11px] font-bold text-gray-600 uppercase">WEBGL SHADER PIPELINE ARENA</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleCompile}
            disabled={isCompiling}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FFDE59] hover:bg-[#ffe57e] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
          >
            {isCompiling ? <span className="animate-spin text-sm">⍥</span> : <Play size={14} className="stroke-[3]" />}
            {isCompiling ? 'COMPILING SHADER...' : 'COMPILE & RUN'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <CheckCircle2 size={14} className="stroke-[3]" /> SUBMIT SHADER
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
        
        {/* Left Panel: Shader Editor */}
        <div className="flex flex-col border-r-4 border-black bg-[#18181b] relative overflow-hidden">
          <div className="h-10 bg-[#FAF8F5] border-b-3 border-black flex items-center px-4 justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
              <Terminal size={14} className="stroke-[3]" /> fragment_shader.glsl
            </div>
            <span className="text-[10px] font-black uppercase bg-[#00F0FF] px-2 py-0.5 border border-black text-black">
              GLSL ES 3.0
            </span>
          </div>
          <div className="flex-1 flex relative overflow-hidden">
            <div className="w-12 bg-[#18181b] border-r border-zinc-700 py-6 text-zinc-500 font-mono text-xs select-none flex flex-col items-center">
              {Array.from({length: 18}).map((_, i) => <span key={i} className="leading-relaxed">{i + 1}</span>)}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-zinc-100 p-6 font-mono text-xs md:text-sm focus:outline-none resize-none leading-relaxed selection:bg-[#CCFF00] selection:text-black"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Right Panel: WebGL Canvas Simulation */}
        <div className="flex flex-col bg-[#FAF8F5] p-6 gap-5 overflow-y-auto">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F0FF] border-2 border-black font-black text-black text-xs uppercase shadow-[2px_2px_0px_#000] w-fit">
            <MonitorPlay size={14} className="stroke-[2.5]" />
            <span>[ WEBGL HARDWARE RENDERPORT ]</span>
          </div>

          <div className="bg-white border-4 border-black flex-1 min-h-[350px] flex items-center justify-center relative overflow-hidden shadow-[5px_5px_0px_#000]">
             
             {!isPlaying && !isCompiling && (
                <div className="text-black flex flex-col items-center gap-3 font-black uppercase text-xs">
                  <Layers size={36} className="stroke-[2.5]" />
                  <p>// SHADER DORMANT. CLICK [ COMPILE &amp; RUN ] TO EXECUTE FRAGMENT KERNEL.</p>
                </div>
             )}

             {isCompiling && (
                <div className="text-black flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-black border-t-[#00F0FF] animate-spin" />
                  <p className="font-mono text-xs font-black uppercase">LINKING GL PROGRAM SHADERS...</p>
                </div>
             )}

             {isPlaying && (
                <div className="absolute inset-0 w-full h-full"
                     style={{
                       background: 'linear-gradient(45deg, #ff00cc, #333399)',
                       animation: 'hue-rotate 5s linear infinite',
                       filter: 'contrast(1.4)',
                     }}>
                   <style>
                     {`
                       @keyframes hue-rotate {
                         0% { filter: hue-rotate(0deg) contrast(1.4); }
                         100% { filter: hue-rotate(360deg) contrast(1.4); }
                       }
                     `}
                   </style>
                </div>
             )}
             
             {isPlaying && (
                <div className="absolute top-4 right-4 bg-white border-2 border-black text-black font-mono text-[10px] font-black uppercase px-3 py-1 shadow-[2px_2px_0px_#000] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  60.0 FPS
                </div>
             )}

          </div>

          <div className="bg-white border-4 border-black p-4 flex flex-col shadow-[4px_4px_0px_#000]">
             <div className="text-xs font-black text-black uppercase tracking-wider border-b-2 border-black pb-2 mb-3">
               [ GPU PIPELINE DIAGNOSTICS ]
             </div>
             <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-[#FAF8F5] border-2 border-black p-2 shadow-[1px_1px_0px_#000]">
                  <span className="text-[10px] text-gray-600 uppercase font-black">DRAW CALLS</span>
                  <div className="text-lg font-black text-black mt-0.5">1 CALL</div>
                </div>
                <div className="bg-[#FAF8F5] border-2 border-black p-2 shadow-[1px_1px_0px_#000]">
                  <span className="text-[10px] text-gray-600 uppercase font-black">TRIANGLES</span>
                  <div className="text-lg font-black text-black mt-0.5">2 QUAD</div>
                </div>
                <div className="bg-[#FAF8F5] border-2 border-black p-2 shadow-[1px_1px_0px_#000]">
                  <span className="text-[10px] text-gray-600 uppercase font-black">VRAM USE</span>
                  <div className="text-lg font-black text-emerald-700 mt-0.5">1.4 MB</div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
