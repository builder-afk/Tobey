import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Play, CheckCircle2, ChevronRight, LayoutTemplate, ArrowLeft, Table2, Terminal } from 'lucide-react';

export default function SQLArena() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('SELECT e.name, d.department_name \nFROM employees e \nJOIN departments d ON e.dept_id = d.id \nWHERE e.salary > 80000;');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('results');

  const handleRunQuery = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setResults([
        { name: 'Alice Smith', department: 'Engineering' },
        { name: 'Bob Jones', department: 'Data Science' },
        { name: 'Charlie Brown', department: 'Engineering' }
      ]);
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
            <div className="w-9 h-9 border-2 border-black bg-[#00F0FF] flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <Database size={18} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">SQL CHALLENGES</h1>
              <p className="text-[11px] font-bold text-gray-600 uppercase">ROOM: SQ-8X92 • RANKED COMBAT</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-[#FF0033] border-2 border-black text-white font-black text-xs uppercase shadow-[2px_2px_0px_#000] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>OPPONENT RUNNING...</span>
          </div>
          <button 
            onClick={handleRunQuery}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#00F0FF] hover:bg-[#33f3ff] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
          >
            {isRunning ? <span className="animate-spin text-sm">⍥</span> : <Play size={14} className="stroke-[3]" />}
            {isRunning ? 'EXECUTING...' : 'RUN QUERY'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <CheckCircle2 size={14} className="stroke-[3]" /> SUBMIT
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        
        {/* Left Panel: Schema & Objective */}
        <div className="lg:col-span-4 flex flex-col p-5 bg-[#FAF8F5] border-r-4 border-black overflow-y-auto">
          <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000] mb-5">
            <h2 className="text-lg font-black text-black uppercase tracking-tight mb-2">
              HIGH EARNERS BY DEPARTMENT
            </h2>
            <div className="flex gap-2 mb-3">
              <span className="px-2.5 py-0.5 bg-[#FFDE59] border-2 border-black text-black text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]">
                MEDIUM
              </span>
              <span className="px-2.5 py-0.5 bg-[#FAF8F5] border-2 border-black text-black text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]">
                JOINS
              </span>
            </div>
            <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed bg-[#FAF8F5] border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
              // WRITE A SQL QUERY TO FIND THE NAMES AND DEPARTMENTS OF ALL EMPLOYEES WHO EARN MORE THAN $80,000.
            </p>
          </div>
            
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00] border-2 border-black font-black text-black text-xs uppercase shadow-[2px_2px_0px_#000]">
              <LayoutTemplate size={14} className="stroke-[2.5]" />
              <span>[ RELATIONAL SCHEMA ]</span>
            </div>
            
            {/* Table 1: employees */}
            <div className="bg-white border-3 border-black shadow-[4px_4px_0px_#000] overflow-hidden">
              <div className="bg-black text-white px-3 py-2 font-mono font-black text-xs uppercase flex items-center justify-between">
                <span>EMPLOYEES</span>
                <Table2 size={14} />
              </div>
              <div className="p-2 space-y-1">
                <div className="flex justify-between items-center py-1 px-2 border-b border-gray-200 text-xs">
                  <span className="font-black text-black">id</span> 
                  <span className="bg-[#CCFF00] border border-black px-1.5 py-0.2 text-[9px] font-black uppercase text-black">INT (PK)</span>
                </div>
                <div className="flex justify-between items-center py-1 px-2 border-b border-gray-200 text-xs">
                  <span className="font-black text-black">name</span> 
                  <span className="text-gray-600 font-bold uppercase text-[11px]">VARCHAR(255)</span>
                </div>
                <div className="flex justify-between items-center py-1 px-2 border-b border-gray-200 text-xs">
                  <span className="font-black text-black">salary</span> 
                  <span className="text-gray-600 font-bold uppercase text-[11px]">INT</span>
                </div>
                <div className="flex justify-between items-center py-1 px-2 text-xs">
                  <span className="font-black text-black">dept_id</span> 
                  <span className="bg-[#00F0FF] border border-black px-1.5 py-0.2 text-[9px] font-black uppercase text-black">INT (FK)</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-1 h-6 bg-black" />
            </div>

            {/* Table 2: departments */}
            <div className="bg-white border-3 border-black shadow-[4px_4px_0px_#000] overflow-hidden">
              <div className="bg-black text-white px-3 py-2 font-mono font-black text-xs uppercase flex items-center justify-between">
                <span>DEPARTMENTS</span>
                <Table2 size={14} />
              </div>
              <div className="p-2 space-y-1">
                <div className="flex justify-between items-center py-1 px-2 border-b border-gray-200 text-xs">
                  <span className="font-black text-black">id</span> 
                  <span className="bg-[#CCFF00] border border-black px-1.5 py-0.2 text-[9px] font-black uppercase text-black">INT (PK)</span>
                </div>
                <div className="flex justify-between items-center py-1 px-2 text-xs">
                  <span className="font-black text-black">department_name</span> 
                  <span className="text-gray-600 font-bold uppercase text-[11px]">VARCHAR(255)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Editor & Results */}
        <div className="lg:col-span-8 flex flex-col h-full bg-[#18181b] overflow-hidden">
          
          {/* Query Editor */}
          <div className="flex-1 flex flex-col relative overflow-hidden">
            <div className="h-10 bg-[#FAF8F5] border-b-3 border-black flex items-center justify-between px-4">
              <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
                <Terminal size={14} className="stroke-[3]" /> query.sql
              </div>
              <span className="text-[10px] font-black uppercase bg-[#00F0FF] px-2 py-0.5 border border-black">
                POSTGRESQL 16
              </span>
            </div>
            <div className="flex-1 flex relative overflow-hidden">
              <div className="w-12 bg-[#18181b] border-r border-zinc-700 py-6 text-zinc-500 font-mono text-xs select-none flex flex-col items-center">
                {Array.from({length: 12}).map((_, i) => <span key={i} className="leading-relaxed">{i + 1}</span>)}
              </div>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-full bg-transparent text-zinc-100 p-6 font-mono text-xs md:text-sm focus:outline-none resize-none leading-relaxed selection:bg-[#CCFF00] selection:text-black"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Results Console */}
          <div className="h-64 bg-white border-t-4 border-black flex flex-col overflow-hidden">
            <div className="h-10 border-b-3 border-black flex items-center px-4 bg-[#FAF8F5] gap-3">
              <button
                onClick={() => setActiveTab('results')}
                className={`px-3 py-1 border-2 border-black font-black uppercase text-xs transition-all shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
                  activeTab === 'results' ? 'bg-[#CCFF00] text-black' : 'bg-white text-gray-700'
                }`}
              >
                [ QUERY RESULTS ]
              </button>
              <button
                onClick={() => setActiveTab('plan')}
                className={`px-3 py-1 border-2 border-black font-black uppercase text-xs transition-all shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
                  activeTab === 'plan' ? 'bg-[#FFDE59] text-black' : 'bg-white text-gray-700'
                }`}
              >
                [ EXECUTION PLAN ]
              </button>
            </div>
            
            <div className="overflow-auto flex-1 p-0">
              {activeTab === 'results' && (
                results ? (
                  <table className="w-full text-left text-xs font-mono border-collapse">
                    <thead className="bg-black text-white font-black uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-2.5 border-r border-zinc-700">name</th>
                        <th className="px-6 py-2.5">department_name</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-black">
                      {results.map((r, i) => (
                        <tr key={i} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="px-6 py-2.5 font-bold border-r-2 border-black">{r.name}</td>
                          <td className="px-6 py-2.5 font-bold">{r.department}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-2 p-6">
                    <Database size={28} className="text-black stroke-[2.5]" />
                    <span className="font-mono font-black uppercase text-xs text-black">
                      PRESS [ RUN QUERY ] TO EXECUTE AGAINST TARGET DATABASE
                    </span>
                  </div>
                )
              )}

              {activeTab === 'plan' && (
                <div className="p-4 font-mono text-xs text-black space-y-2">
                  <div className="p-2 bg-[#FAF8F5] border-2 border-black">
                    <span className="font-black text-emerald-600">{"->"} Hash Join</span> {"(cost=2.15..18.42 rows=12 width=64)"}
                  </div>
                  <div className="p-2 bg-[#FAF8F5] border-2 border-black ml-4">
                    <span className="font-black text-blue-600">{"->"} Seq Scan on employees</span> {"(cost=0.00..15.20 filter=(salary > 80000))"}
                  </div>
                  <div className="p-2 bg-[#FAF8F5] border-2 border-black ml-4">
                    <span className="font-black text-purple-600">{"->"} Hash</span> on departments.id
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
