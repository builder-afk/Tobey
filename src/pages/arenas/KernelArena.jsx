import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HardDrive, Play, CheckCircle2, ArrowLeft, Terminal, Activity, FileDigit } from 'lucide-react';

export default function KernelArena() {
  const navigate = useNavigate();
  const [code, setCode] = useState('#include <linux/module.h>\n#include <linux/kernel.h>\n\nint init_module(void) {\n    printk(KERN_INFO "Hello world 1.\\n");\n    return 0;\n}\n\nvoid cleanup_module(void) {\n    printk(KERN_INFO "Goodbye world 1.\\n");\n}');
  const [isCompiling, setIsCompiling] = useState(false);
  const [logs, setLogs] = useState([]);

  const handleInsmod = () => {
    setIsCompiling(true);
    setLogs(prev => [...prev, '[root@kernel ~]# make', 'make -C /lib/modules/$(uname -r)/build M=$PWD modules', '  CC [M]  hello.o', '  MODPOST hello.o', '  CC      hello.mod.o', '  LD [M]  hello.ko']);
    
    setTimeout(() => {
      setLogs(prev => [...prev, '[root@kernel ~]# insmod hello.ko', '[root@kernel ~]# dmesg | tail -n 1']);
      setTimeout(() => {
        setIsCompiling(false);
        setLogs(prev => [...prev, '[ 1234.567890] Hello world 1.']);
      }, 800);
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
            <div className="w-9 h-9 border-2 border-black bg-black text-[#CCFF00] flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <HardDrive size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">KERNEL HACKING</h1>
              <p className="text-[11px] font-bold text-gray-600 uppercase">LKM &amp; SYSCALL INJECTION</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleInsmod}
            disabled={isCompiling}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FFDE59] hover:bg-[#ffe57e] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
          >
            {isCompiling ? <span className="animate-spin text-sm">⍥</span> : <Play size={14} className="stroke-[3]" />}
            {isCompiling ? 'COMPILING...' : 'MAKE & INSMOD'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <CheckCircle2 size={14} className="stroke-[3]" /> SUBMIT PATCH
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        
        {/* Left Panel: System State */}
        <div className="lg:col-span-4 border-r-4 border-black p-5 bg-[#FAF8F5] flex flex-col gap-5 overflow-y-auto">
          <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000]">
            <h2 className="text-xs font-black uppercase tracking-wider text-black border-b-2 border-black pb-2 mb-4 flex items-center gap-2">
              <Activity size={16} className="stroke-[3]" /> [ RING 0 SYSTEM METRICS ]
            </h2>
            
            <div className="space-y-4 text-xs font-black uppercase">
              <div>
                <div className="flex justify-between mb-1">
                  <span>CPU USAGE (RING 0)</span>
                  <span className="text-black bg-[#CCFF00] px-1 border border-black">24%</span>
                </div>
                <div className="h-3 bg-[#FAF8F5] border-2 border-black overflow-hidden shadow-[1px_1px_0px_#000]">
                  <div className="h-full bg-[#00F0FF] w-1/4 border-r-2 border-black" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span>MEMORY PAGES</span>
                  <span className="text-black bg-[#FFDE59] px-1 border border-black">4096 / 8192</span>
                </div>
                <div className="h-3 bg-[#FAF8F5] border-2 border-black overflow-hidden shadow-[1px_1px_0px_#000]">
                  <div className="h-full bg-[#FF52D9] w-1/2 border-r-2 border-black" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000]">
            <h3 className="text-xs font-black uppercase text-black mb-3 flex items-center gap-2 border-b-2 border-black pb-2">
              <span>[ ACTIVE KERNEL MODULES ]</span>
            </h3>
            <ul className="space-y-2 text-xs font-bold text-gray-800">
              <li className="flex justify-between p-1 bg-[#FAF8F5] border border-black"><span>[+] ext4</span> <span>589824 bytes</span></li>
              <li className="flex justify-between p-1 bg-[#FAF8F5] border border-black"><span>[+] crc16</span> <span>16384 bytes</span></li>
              <li className="flex justify-between p-1 bg-[#FAF8F5] border border-black"><span>[+] mbcache</span> <span>16384 bytes</span></li>
              <li className="flex justify-between p-1 bg-[#FAF8F5] border border-black"><span>[+] jbd2</span> <span>131072 bytes</span></li>
              <li className="flex justify-between p-1 bg-red-100 border border-black font-black text-red-700"><span>[-] hello.ko</span> <span>NOT LOADED</span></li>
            </ul>
          </div>
        </div>

        {/* Right Panel: Editor & dmesg */}
        <div className="lg:col-span-8 flex flex-col h-full bg-[#18181b] overflow-hidden">
          
          {/* C Editor */}
          <div className="flex-1 flex flex-col relative overflow-hidden">
            <div className="h-10 bg-[#FAF8F5] border-b-3 border-black flex items-center justify-between px-4">
              <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
                <FileDigit size={14} className="stroke-[3]" /> hello.c
              </div>
              <span className="text-[10px] font-black uppercase bg-[#00F0FF] px-2 py-0.5 border border-black">
                LINUX C MODULE
              </span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-[#CCFF00] p-6 text-xs md:text-sm font-mono focus:outline-none resize-none leading-relaxed selection:bg-white selection:text-black"
              spellCheck="false"
            />
          </div>

          {/* dmesg Terminal */}
          <div className="h-64 bg-black border-t-4 border-black flex flex-col overflow-hidden text-[#00FF00]">
            <div className="h-10 border-b-2 border-zinc-800 flex items-center px-4 bg-zinc-900 justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00FF00] font-black uppercase">
                <Terminal size={14} className="stroke-[3]" /> dmesg / tty1
              </div>
              <span className="text-[10px] bg-black text-[#CCFF00] border border-[#00FF00]/40 px-2 py-0.5">
                RING BUFFER ONLINE
              </span>
            </div>
            
            <div className="p-4 overflow-auto flex-1 font-mono text-xs space-y-1">
              <div className="text-zinc-500">Linux version 6.5.0-generic (buildd@lcy02-amd64-077) ...</div>
              <div className="text-zinc-500">Command line: BOOT_IMAGE=/boot/vmlinuz-6.5.0 root=UUID=...</div>
              {logs.map((log, idx) => (
                <div key={idx} className={log.startsWith('[root') ? 'text-white font-bold' : 'text-[#CCFF00]'}>
                  {log}
                </div>
              ))}
              <div className="animate-pulse">_</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
