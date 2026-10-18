import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, Play, Send, CheckCircle2, AlertCircle, Terminal, 
  RotateCcw, Copy, Check, Timer, Cpu, ChevronLeft, ChevronDown, Swords
} from 'lucide-react';
import contestsTracksData from '../data/contestsTracksData';
import dpPythonData from '../data/dpPythonData';

export default function ContestIDE() {
  const { id, problemId } = useParams();
  const editorRef = useRef(null);
  const lineNumRef = useRef(null);
  
  const track = contestsTracksData.find(t => t.id === parseInt(id)) || contestsTracksData[0];
  const problem = track.problems?.find(p => p.id === parseInt(problemId)) || track.problems?.[0] || dpPythonData.problems[0];

  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [status, setStatus] = useState('idle');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [showLang, setShowLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState('Python 3.9');
  
  const languages = [
    { name: 'Python 3.9', color: '#00F0FF' },
    { name: 'C++ 17', color: '#FF52D9' },
    { name: 'Java 11', color: '#FFDE59' },
    { name: 'JavaScript (Node)', color: '#CCFF00' }
  ];

  const boilerplates = {
    'Python 3.9': 'def solve():\n    # Write your solution here\n    pass\n\nif __name__ == "__main__":\n    solve()\n',
    'C++ 17': '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write solution here\n    return 0;\n}\n',
    'Java 11': 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Write solution here\n    }\n}\n',
    'JavaScript (Node)': 'function solve() {\n    // Write solution here\n}\nsolve();\n'
  };

  const [codeMap, setCodeMap] = useState({
    'Python 3.9': boilerplates['Python 3.9']
  });

  const code = codeMap[selectedLang] || boilerplates[selectedLang];
  const setCode = (newCode) => {
    setCodeMap(prev => ({ ...prev, [selectedLang]: newCode }));
  };

  // Parse problem description
  const { narrative, sections } = useMemo(() => {
    const normalized = problem.description.replace(/\\n/g, '\n');
    const parts = normalized.split(/\*\*(.*?)\*\*/);
    const narr = parts[0];
    const secs = [];
    for (let i = 1; i < parts.length; i += 2) {
      secs.push({ title: parts[i], content: parts[i + 1]?.trim() || '' });
    }
    return { narrative: narr, sections: secs };
  }, [problem.description]);

  useEffect(() => {
    setCodeMap({
      'Python 3.9': boilerplates['Python 3.9']
    });
    setSelectedLang('Python 3.9');
    setOutput('');
    setStatus('idle');
  }, [problemId, problem.starterCode]);

  const handleEditorScroll = () => {
    if (lineNumRef.current && editorRef.current) {
      lineNumRef.current.scrollTop = editorRef.current.scrollTop;
    }
  };

  const handleRun = () => {
    setIsCompiling(true);
    setStatus('compiling');
    setOutput('>> COMPILING ' + selectedLang.toUpperCase() + '...\n');
    setTimeout(() => {
      setIsCompiling(false);
      if (code.length < 50) {
        setStatus('error');
        setOutput('>> COMPILING ' + selectedLang.toUpperCase() + '...\n\n[!] RUNTIME ERROR\nTraceback (most recent call last):\n  File "solution.py", line 3, in solve\n    pass\nSyntaxError: unexpected EOF while parsing\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nVERDICT: WRONG ANSWER (0/3 TESTS PASSED)');
      } else {
        setStatus('success');
        setOutput('>> COMPILING ' + selectedLang.toUpperCase() + '...\n\n[OK] COMPILATION SUCCESSFUL\n\n  TEST 1 ··· PASSED  (12ms, 3.2MB)\n  TEST 2 ··· PASSED  (45ms, 4.1MB)\n  TEST 3 ··· PASSED  (22ms, 3.8MB)\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nRESULT: 3/3 TEST CASES PASSED\nVERDICT: ACCEPTED\nPOINTS: +100 XP');
      }
    }, 1200);
  };

  const handleSubmit = () => {
    setIsCompiling(true);
    setStatus('compiling');
    setOutput('>> SUBMITTING FINAL SOLUTION TO JUDGE CLUSTER...\n');
    setTimeout(() => {
      setIsCompiling(false);
      if (code.length < 80) {
        setStatus('error');
        setOutput('>> SUBMITTING FINAL SOLUTION TO JUDGE CLUSTER...\n\n[!] VERIFICATION FAILED\n\n  TEST  1/10 ··· PASSED   (8ms)\n  TEST  2/10 ··· PASSED  (12ms)\n  TEST  3/10 ··· FAILED  (15ms)\n    Expected: 15\n    Got: 0\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nVERDICT: WRONG ANSWER (2/10 PASSED)');
      } else {
        setStatus('success');
        setOutput('>> SUBMITTING FINAL SOLUTION TO JUDGE CLUSTER...\n\n[OK] ALL 10/10 TEST CASES PASSED!\n\n  TEST  1/10 ··· PASSED   (8ms, 3.1MB)\n  TEST  2/10 ··· PASSED  (12ms, 3.2MB)\n  TEST  3/10 ··· PASSED  (15ms, 3.4MB)\n  TEST  4/10 ··· PASSED  (22ms, 4.0MB)\n  TEST  5/10 ··· PASSED  (18ms, 3.6MB)\n  TEST  6/10 ··· PASSED  (45ms, 5.2MB)\n  TEST  7/10 ··· PASSED  (38ms, 4.8MB)\n  TEST  8/10 ··· PASSED  (92ms, 6.1MB)\n  TEST  9/10 ··· PASSED (125ms, 7.3MB)\n  TEST 10/10 ··· PASSED (198ms, 8.0MB)\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nVERDICT: ACCEPTED ✨\nRUNTIME: 198ms | MEMORY: 8.0MB\nSCORE: 100/100 POINTS EARNED!');
      }
    }, 1800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(boilerplates[selectedLang]);
    setOutput('');
    setStatus('idle');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      });
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden font-mono bg-[#F0EDE6]">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b-4 border-black shrink-0">
        <div className="flex items-center gap-3">
          <Link 
            to={`/contests/${id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] hover:bg-[#CCFF00] transition-colors"
          >
            <ChevronLeft size={16} /> [ {track.title} ]
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-xs font-black uppercase text-black">
            <span>/</span>
            <span className="bg-[#FAF8F5] border border-black px-2 py-0.5">#{problem.id} {problem.title}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className={`px-2.5 py-1 border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] ${
            problem.difficulty === 'Easy' ? 'bg-[#CCFF00] text-black' :
            problem.difficulty === 'Medium' ? 'bg-[#FFDE59] text-black' : 'bg-[#FF0033] text-white'
          }`}>
            {problem.difficulty}
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#00F0FF] border-2 border-black text-xs font-black text-black shadow-[2px_2px_0px_#000]">
            <Cpu size={14} className="stroke-[2.5]" />
            <span>+100 PTS</span>
          </div>
        </div>
      </div>

      {/* Main Split IDE Area */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        
        {/* Left Panel: Problem Statement */}
        <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col min-h-0 bg-white border-b-4 md:border-b-0 md:border-r-4 border-black">
          
          {/* Tabs */}
          <div className="flex items-center bg-[#FAF8F5] border-b-2 border-black shrink-0 px-2 pt-2 gap-2">
            {['description', 'constraints', 'sample-io'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 border-t-2 border-x-2 border-black font-black text-xs uppercase transition-all shadow-[2px_0px_0px_#000] ${
                  activeTab === tab 
                    ? 'bg-white text-black -mb-[2px] border-b-2 border-b-white z-10' 
                    : 'bg-[#E5E0D8] text-gray-700 hover:bg-white'
                }`}
              >
                [ {tab.replace('-', ' ')} ]
              </button>
            ))}
          </div>
          
          {/* Problem Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            <h1 className="text-2xl font-black text-black uppercase mb-3 leading-tight">
              {problem.title}
            </h1>
            
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="px-2.5 py-1 bg-[#FAF8F5] border border-black text-[11px] font-bold text-gray-700 uppercase flex items-center gap-1.5">
                <Timer size={12} className="stroke-[2.5]" /> TIME LIMIT: 2.0S
              </span>
              <span className="px-2.5 py-1 bg-[#FAF8F5] border border-black text-[11px] font-bold text-gray-700 uppercase flex items-center gap-1.5">
                <Cpu size={12} className="stroke-[2.5]" /> MEMORY: 256MB
              </span>
            </div>

            {activeTab === 'description' && (
              <div className="space-y-4">
                <div className="p-4 bg-[#FAF8F5] border-3 border-black shadow-[3px_3px_0px_#000]">
                  <p className="text-xs md:text-sm font-bold text-black uppercase leading-relaxed whitespace-pre-line">
                    {narrative.trim()}
                  </p>
                </div>

                {sections.filter(s => !s.title.toLowerCase().includes('constraints')).map((sec, idx) => (
                  <div key={idx} className="mt-4">
                    <span className="inline-block px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase mb-2">
                      {sec.title}
                    </span>
                    <div className="p-4 bg-[#FAF8F5] border-2 border-black text-xs font-bold text-black uppercase leading-relaxed whitespace-pre-wrap">
                      {sec.content}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'constraints' && (
              <div className="space-y-4">
                <span className="inline-block px-2.5 py-1 bg-[#FFDE59] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                  SYSTEM CONSTRAINTS
                </span>
                {sections.filter(s => s.title.toLowerCase().includes('constraints')).map((sec, idx) => (
                  <div key={idx} className="p-4 bg-[#FAF8F5] border-3 border-black text-xs font-mono font-bold leading-relaxed whitespace-pre-wrap shadow-[3px_3px_0px_#000]">
                    {sec.content}
                  </div>
                ))}
                {sections.filter(s => s.title.toLowerCase().includes('constraints')).length === 0 && (
                  <div className="p-4 bg-[#FAF8F5] border-3 border-black text-xs font-bold uppercase shadow-[3px_3px_0px_#000]">
                    • 1 &lt;= N &lt;= 10^5<br />
                    • OPTIMAL TIME COMPLEXITY: O(N) OR O(N LOG N)<br />
                    • SPACE COMPLEXITY: O(1) AUXILIARY SPACE
                  </div>
                )}
              </div>
            )}

            {activeTab === 'sample-io' && (
              <div className="space-y-5">
                <div>
                  <span className="inline-block px-2 py-0.5 bg-[#00F0FF] border border-black text-[10px] font-black uppercase mb-1.5">
                    SAMPLE INPUT
                  </span>
                  <pre className="p-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-bold whitespace-pre shadow-[2px_2px_0px_#000]">
                    {problem.sampleInput || '// 5\n// 1 2 3 4 5'}
                  </pre>
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 bg-[#CCFF00] border border-black text-[10px] font-black uppercase mb-1.5">
                    SAMPLE OUTPUT
                  </span>
                  <pre className="p-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-bold whitespace-pre shadow-[2px_2px_0px_#000]">
                    {problem.sampleOutput || '// 15'}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Editor + Terminal */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#0C0C0C]">
          
          {/* Editor Header Toolbar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b-3 border-black shrink-0">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowLang(!showLang)}
                className="flex items-center gap-2 px-3 py-1 bg-[#FAF8F5] hover:bg-[#FFDE59] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <span>{selectedLang}</span>
                <ChevronDown size={14} className="stroke-[3]" />
              </button>

              {showLang && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLang(false)} />
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border-3 border-black shadow-[4px_4px_0px_#000] z-50 overflow-hidden">
                    {languages.map(lang => (
                      <button
                        key={lang.name}
                        onClick={() => {
                          setSelectedLang(lang.name);
                          setShowLang(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-black uppercase text-left hover:bg-[#CCFF00] border-b border-black last:border-b-0 transition-colors"
                      >
                        <span>{lang.name}</span>
                        <div className="w-2.5 h-2.5 border border-black" style={{ backgroundColor: lang.color }} />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="p-1.5 bg-white hover:bg-[#FAF8F5] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                title="Reset Code"
              >
                <RotateCcw size={14} className="stroke-[2.5]" />
              </button>
              <button
                onClick={handleCopy}
                className="p-1.5 bg-white hover:bg-[#FAF8F5] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                title="Copy Code"
              >
                {copied ? <Check size={14} className="stroke-[3] text-emerald-600" /> : <Copy size={14} className="stroke-[2.5]" />}
              </button>

              <button 
                onClick={handleRun}
                disabled={isCompiling}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00F0FF] hover:bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
              >
                <Play size={12} className="stroke-[3]" />
                <span>[ RUN ]</span>
              </button>

              <button 
                onClick={handleSubmit}
                disabled={isCompiling}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#CCFF00] hover:bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
              >
                {isCompiling ? (
                  <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send size={12} className="stroke-[3]" />
                )}
                <span>[ SUBMIT ]</span>
              </button>
            </div>
          </div>

          {/* Code Textarea with Line Numbers */}
          <div className="flex-1 flex overflow-hidden min-h-0 bg-[#0C0C0C]">
            <div 
              ref={lineNumRef}
              className="overflow-hidden select-none shrink-0 text-right pr-3 pl-3 pt-4 text-gray-600 font-mono text-xs leading-relaxed border-r border-neutral-800 bg-[#090909]"
            >
              {code.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            
            <textarea
              ref={editorRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onScroll={handleEditorScroll}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className="flex-1 bg-transparent resize-none focus:outline-none p-4 text-white font-mono text-xs leading-relaxed custom-scrollbar caret-[#00F0FF]"
            />
          </div>

          {/* Terminal Console */}
          <div className="shrink-0 flex flex-col h-48 border-t-3 border-black bg-white">
            <div className="flex items-center justify-between px-4 py-1.5 bg-[#FAF8F5] border-b-2 border-black shrink-0">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="stroke-[2.5]" />
                <span className="text-[11px] font-black uppercase text-black">
                  [ EXECUTION OUTPUT // RUNTIME CONSOLE ]
                </span>
              </div>
              <div>
                {status === 'success' && (
                  <span className="px-2 py-0.5 bg-[#CCFF00] border border-black text-[10px] font-black uppercase">
                    ACCEPTED
                  </span>
                )}
                {status === 'error' && (
                  <span className="px-2 py-0.5 bg-[#FF0033] text-white border border-black text-[10px] font-black uppercase">
                    FAILED
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-[#0C0C0C] font-mono text-xs text-neutral-300 custom-scrollbar">
              {output ? (
                <pre className="whitespace-pre-wrap">{output}</pre>
              ) : (
                <span className="text-neutral-600 uppercase font-bold">
                  // CLICK [ RUN ] OR [ SUBMIT ] TO COMPILE & EXECUTE CODE AGAINST TEST SUITE...
                </span>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
