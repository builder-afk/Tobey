import React, { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, Send, CheckCircle2, FileText, Code2, Terminal, ChevronLeft, Zap } from 'lucide-react';
import { leetcodeData } from '../data/leetcodeData';

function LineNumbers({ code }) {
  const lines = code.split('\n').length;
  return (
    <div className="select-none text-right pr-4 pl-3 pt-4 pb-4 text-xs leading-[1.7] font-mono text-zinc-500 border-r border-zinc-700 bg-[#18181b]" aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <div key={i + 1}>{i + 1}</div>
      ))}
    </div>
  );
}

export default function LeetcodeIDE() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  
  const problem = leetcodeData.find(p => p.id === parseInt(id)) || leetcodeData[0];

  const [code, setCode] = useState(problem.starterCode);
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [status, setStatus] = useState('idle');
  const [activeTab, setActiveTab] = useState('description');
  
  const handleRun = () => {
    setIsCompiling(true);
    setStatus('running');
    setOutput('Compiling and running against standard tests...');
    
    setTimeout(() => {
      setIsCompiling(false);
      setStatus('success');
      setOutput('Accepted!\nAll sample test cases passed.\n\nRuntime: 32ms\nMemory: 14.2 MB');
    }, 1200);
  };

  const handleSubmit = () => {
    setIsCompiling(true);
    setStatus('submitting');
    setOutput('Running hidden test cases against competitive judge...');
    
    setTimeout(() => {
      setIsCompiling(false);
      setStatus('accepted');
      setOutput(`Success!\n\nVerdict: ACCEPTED\nTime: 28ms (Beats 89% of submissions)\nMemory: 13.9 MB (Beats 76% of submissions)\n\nXP Earned: +${problem.xp}`);
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newValue);
      
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const getDifficultyBadge = (diff) => {
    switch(diff) {
      case 'Easy': return 'bg-[#CCFF00] text-black border-2 border-black shadow-[1px_1px_0px_#000]';
      case 'Medium': return 'bg-[#FFDE59] text-black border-2 border-black shadow-[1px_1px_0px_#000]';
      case 'Hard': return 'bg-[#FF0033] text-white border-2 border-black shadow-[1px_1px_0px_#000]';
      default: return 'bg-[#00F0FF] text-black border-2 border-black shadow-[1px_1px_0px_#000]';
    }
  };

  return (
    <div className="flex h-full bg-[#FAF8F5] text-black font-mono overflow-hidden">
      
      {/* Left Panel - Problem Description */}
      <div className="w-[45%] flex flex-col border-r-4 border-black bg-white overflow-hidden">
        {/* Header */}
        <div className="h-14 border-b-4 border-black flex items-center justify-between px-4 bg-white shadow-[0px_3px_0px_#000] z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/royale/leetcode')}
              className="p-1.5 bg-white hover:bg-[#FFDE59] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-black"
            >
              <ChevronLeft size={18} className="stroke-[3]" />
            </button>
            <span className="font-black text-xs uppercase tracking-tight text-black">
              LEETCODE #{problem.leetcodeId || problem.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1">
              <Zap size={13} fill="currentColor" /> +{problem.xp} XP
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#FAF8F5] custom-scrollbar">
          <div className="bg-white border-3 border-black p-6 shadow-[5px_5px_0px_#000]">
            <h1 className="text-2xl font-black text-black uppercase tracking-tight mb-3">
              {problem.title}
            </h1>
            <div className="flex gap-2 mb-6 flex-wrap">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 ${getDifficultyBadge(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-[#FAF8F5] text-black border-2 border-black shadow-[1px_1px_0px_#000]">
                {problem.tag}
              </span>
            </div>
            <div className="whitespace-pre-wrap font-mono text-xs md:text-sm font-bold text-gray-800 leading-relaxed bg-[#FAF8F5] border-2 border-black p-4 shadow-[2px_2px_0px_#000]">
              {problem.description}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Editor & Terminal */}
      <div className="w-[55%] flex flex-col bg-[#18181b]">
        {/* Editor Header */}
        <div className="h-14 border-b-4 border-black flex items-center justify-between px-4 bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-black stroke-[3]" />
            <span className="text-xs font-black uppercase text-black tracking-tight">SOURCE CODE (JS / PY)</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleRun}
              disabled={isCompiling}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#00F0FF] hover:bg-[#33f3ff] text-black border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
            >
              <Play size={13} className="stroke-[3]" />
              RUN
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isCompiling}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
            >
              <Send size={13} className="stroke-[3]" />
              SUBMIT
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-[3] relative bg-[#18181b] overflow-hidden flex border-b-4 border-black">
          <LineNumbers code={code} />
          <textarea
            ref={editorRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            className="flex-1 h-full w-full bg-transparent text-zinc-100 font-mono text-xs md:text-sm leading-[1.7] p-4 pt-4 focus:outline-none resize-none whitespace-pre selection:bg-[#CCFF00] selection:text-black custom-scrollbar"
            style={{ tabSize: 4 }}
          />
        </div>

        {/* Terminal Area */}
        <div className="flex-[2] flex flex-col bg-white overflow-hidden">
          <div className="h-10 border-b-3 border-black flex items-center justify-between px-4 bg-[#FAF8F5]">
            <div className="flex items-center gap-2 text-black">
              <Terminal size={14} className="stroke-[3]" />
              <span className="text-xs font-black uppercase tracking-tight">EXECUTION CONSOLE</span>
            </div>
            {status === 'accepted' && (
              <div className="flex items-center gap-1.5 text-black text-xs font-black bg-[#CCFF00] border-2 border-black px-2.5 py-0.5 uppercase shadow-[1px_1px_0px_#000]">
                <CheckCircle2 size={13} className="stroke-[3]" /> ACCEPTED
              </div>
            )}
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs bg-white">
            {output ? (
              <div className={`whitespace-pre-wrap font-bold ${
                status === 'success' || status === 'accepted' ? 'text-emerald-700' : 'text-black'
              }`}>
                {output}
              </div>
            ) : (
              <div className="text-gray-500 font-bold uppercase flex items-center justify-center h-full">
                // PRESS [ RUN ] OR [ SUBMIT ] TO TEST SOLUTION
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
