import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Play, CheckCircle2, ArrowLeft, Send, Code2, Sparkles, User } from 'lucide-react';

export default function AIAssistedArena() {
  const navigate = useNavigate();
  const [code, setCode] = useState('// Implement an LRU Cache\nclass LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n  }\n\n  get(key) {\n    \n  }\n\n  put(key, value) {\n    \n  }\n}');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your AI Copilot. We need to implement an LRU Cache in O(1) time complexity for both get and put operations. How would you like to structure the data?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: chatInput }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Great idea. Using a Map in JavaScript maintains insertion order, which is perfect for an LRU Cache. Would you like me to write the `put` method using that approach?' }]);
    }, 1200);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
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
            <div className="w-9 h-9 border-2 border-black bg-[#FF52D9] flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <Bot size={18} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">AI-ASSISTED CODING</h1>
              <p className="text-[11px] font-bold text-gray-600 uppercase">LLM PAIR PROGRAMMING SPRINT</p>
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
            {isRunning ? 'EVALUATING...' : 'RUN TESTS'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <CheckCircle2 size={14} className="stroke-[3]" /> SUBMIT SOLUTION
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
        
        {/* Left Panel: Copilot Chat */}
        <div className="flex flex-col border-r-4 border-black bg-white overflow-hidden">
          <div className="h-10 bg-[#FAF8F5] border-b-3 border-black flex items-center px-4 gap-2">
            <Sparkles size={14} className="stroke-[3] text-black" />
            <span className="text-xs font-black text-black uppercase tracking-wider">[ COPILOT STREAMING CHAT ]</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FAF8F5]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] ${msg.role === 'user' ? 'bg-[#CCFF00] text-black' : 'bg-[#FF52D9] text-black'}`}>
                  {msg.role === 'user' ? <User size={14} className="stroke-[3]" /> : <Bot size={14} className="stroke-[3]" />}
                </div>
                <div className={`p-3.5 max-w-[80%] text-xs font-bold leading-relaxed border-2 border-black shadow-[3px_3px_0px_#000] ${msg.role === 'user' ? 'bg-[#00F0FF] text-black' : 'bg-white text-black'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 border-2 border-black bg-[#FF52D9] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000]">
                  <Bot size={14} className="stroke-[3] text-black" />
                </div>
                <div className="p-3 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-black animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-black animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 rounded-full bg-black animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t-3 border-black">
            <div className="relative">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="PROMPT COPILOT FOR HINTS OR REFACTORS..."
                className="w-full bg-[#FAF8F5] border-2 border-black pl-4 pr-12 py-2.5 text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-white placeholder-gray-500"
              />
              <button 
                type="submit" 
                disabled={!chatInput.trim()}
                className="absolute right-2 top-2 p-1 bg-[#CCFF00] text-black border-2 border-black shadow-[1px_1px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-40"
              >
                <Send size={14} className="stroke-[3]" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Panel: Code Editor */}
        <div className="flex flex-col bg-[#18181b] relative overflow-hidden">
          <div className="h-10 bg-[#FAF8F5] border-b-3 border-black flex items-center px-4 justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
              <Code2 size={14} className="stroke-[3]" /> solution.js
            </div>
            <span className="text-[10px] font-black uppercase bg-[#CCFF00] px-2 py-0.5 border border-black text-black">
              JAVASCRIPT ES2024
            </span>
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

      </div>
    </div>
  );
}
