import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Users, ChevronDown, Trash2, FolderGit2, X, BookOpen, Rocket, Play, Layers, Sparkles, Terminal } from 'lucide-react';
import { projectsData, projectPaths } from '../data/projectsData';

export default function Projects() {
  const [activePath, setActivePath] = useState('DevOps');
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const [isPathDropdownOpen, setIsPathDropdownOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter projects first by Path, then by Difficulty
  const filteredProjects = projectsData.filter(proj => {
    const matchPath = proj.path === activePath;
    const matchDiff = activeDifficulty === 'All' || proj.level === activeDifficulty;
    return matchPath && matchDiff;
  });

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  return (
    <div className="flex h-full flex-col overflow-y-auto custom-scrollbar font-mono pb-20">
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] text-black font-black text-xs uppercase tracking-wider mb-4">
            <Terminal size={14} className="stroke-[2.5]" />
            <span>[ SYSTEM BLUEPRINTS // PRODUCTION WORKFLOWS ]</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight flex items-center flex-wrap gap-3">
              PROJECT
              <span className="bg-[#FFDE59] text-black px-3 py-1 border-4 border-black shadow-[5px_5px_0px_#000]">
                LIBRARY
              </span>
            </h1>

            {/* Path Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsPathDropdownOpen(!isPathDropdownOpen)}
                className="bg-white border-3 border-black text-black px-4 py-2.5 font-black text-xs uppercase shadow-[3px_3px_0px_#000] flex items-center gap-2 hover:bg-[#00F0FF] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <span>TRACK: [{activePath}]</span>
                <ChevronDown size={16} className="stroke-[3]" />
              </button>
              
              {isPathDropdownOpen && (
                <div className="absolute top-full right-0 md:left-auto md:right-0 mt-2 w-56 bg-white border-3 border-black shadow-[6px_6px_0px_#000] z-50 overflow-hidden">
                  {projectPaths.map(path => (
                    <button
                      key={path}
                      onClick={() => {
                        setActivePath(path);
                        setIsPathDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-xs font-black uppercase transition-colors hover:bg-[#FFDE59] border-b border-black last:border-b-0 ${activePath === path ? 'bg-[#CCFF00] text-black' : 'text-black'}`}
                    >
                      [ {path} ]
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <p className="text-xs md:text-sm font-bold text-gray-700 max-w-3xl uppercase tracking-wide leading-relaxed bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000]">
            // STOP BUILDING GENERIC TO-DO LISTS. BUILD RESUME-WORTHY {activePath.toUpperCase()} ARCHITECTURES CATEGORIZED BY IMPLEMENTATION COMPLEXITY.
          </p>
        </div>

        {/* Difficulty Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-white border-3 border-black p-3 shadow-[4px_4px_0px_#000]">
          <span className="text-xs font-black text-black uppercase mr-2">[ FILTER LEVEL ]:</span>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(diff)}
              className={`px-3 py-1.5 font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all ${
                activeDifficulty === diff 
                  ? diff === 'Beginner' ? 'bg-[#FFDE59] text-black'
                    : diff === 'Intermediate' ? 'bg-[#CCFF00] text-black'
                    : diff === 'Advanced' ? 'bg-[#FF0033] text-white'
                    : 'bg-black text-white'
                  : 'bg-[#F0EDE6] text-black hover:bg-white'
              }`}
            >
              {diff}
            </button>
          ))}
          {activeDifficulty !== 'All' && (
            <button 
              onClick={() => setActiveDifficulty('All')}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#FF0033] text-white font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] ml-auto"
            >
              <Trash2 size={12} className="stroke-[3]" /> RESET
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white border-4 border-black shadow-[6px_6px_0px_#000]">
              <h3 className="text-xl font-black text-black uppercase mb-1">NO BLUEPRINTS MATCH SELECTED FILTERS</h3>
              <p className="text-xs text-gray-600 font-bold uppercase mb-4">ADJUST DIFFICULTY LEVEL OR CHOOSE A DIFFERENT ENGINEERING PATH.</p>
              <button
                onClick={() => setActiveDifficulty('All')}
                className="px-4 py-2 bg-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000]"
              >
                [ RESET DIFFICULTY ]
              </button>
            </div>
          ) : (
            filteredProjects.map((proj, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedProject(proj)}
                className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] ${
                      proj.level === 'Beginner' ? 'bg-[#FFDE59] text-black' : 
                      proj.level === 'Intermediate' ? 'bg-[#CCFF00] text-black' : 
                       'bg-[#FF0033] text-white'
                    }`}>
                      {proj.level}
                    </span>
                    
                    <div className="flex flex-wrap gap-1 justify-end max-w-[150px]">
                      {proj.stack.map(s => (
                        <span key={s} className="px-1.5 py-0.5 bg-[#F0EDE6] border border-black text-[9px] text-black font-black uppercase">{s}</span>
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-black text-black uppercase mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-gray-700 font-bold mb-6 leading-relaxed line-clamp-3">
                    {proj.desc}
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t-2 border-black pt-4 mt-auto">
                   <div className="flex items-center text-black text-xs font-black uppercase gap-1.5">
                     <Users size={14} className="stroke-[2.5]" />
                     <span>{proj.users} ENROLLED</span>
                   </div>
                   
                   <div className="flex gap-2">
                     <button 
                       className="p-1.5 bg-white hover:bg-[#FFDE59] border-2 border-black text-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all" 
                       title="View Source" 
                       onClick={(e) => { e.stopPropagation(); window.open(`https://github.com/search?q=${encodeURIComponent(proj.title)}`, '_blank'); }}
                     >
                       <Github size={14} className="stroke-[2.5]" />
                     </button>
                     <button 
                       className="p-1.5 bg-[#CCFF00] hover:bg-black hover:text-white border-2 border-black text-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all" 
                       title="Open Blueprint" 
                       onClick={(e) => { e.stopPropagation(); setSelectedProject(proj); }}
                     >
                       <ExternalLink size={14} className="stroke-[2.5]" />
                     </button>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ margin: 0 }}>
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setSelectedProject(null)} 
            />
            <div className="relative w-full max-w-5xl bg-white border-4 border-black shadow-[12px_12px_0px_#000] flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
               <button 
                 onClick={() => setSelectedProject(null)} 
                 className="absolute top-4 right-4 z-20 bg-white hover:bg-[#FF0033] hover:text-white p-2 border-2 border-black shadow-[2px_2px_0px_#000] transition-colors"
               >
                 <X size={18} className="stroke-[3]" />
               </button>
               
               {/* Left Column: Visuals & Stack */}
               <div className="md:w-2/5 bg-[#FBF9F5] p-6 md:p-8 border-b-3 md:border-b-0 md:border-r-3 border-black flex flex-col overflow-y-auto">
                 <div className={`inline-flex self-start px-2.5 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] mb-4 ${
                   selectedProject.level === 'Beginner' ? 'bg-[#FFDE59] text-black' : 
                   selectedProject.level === 'Intermediate' ? 'bg-[#CCFF00] text-black' : 
                    'bg-[#FF0033] text-white'
                 }`}>
                   {selectedProject.level} COMPLEXITY
                 </div>

                 <h2 className="text-2xl lg:text-3xl font-black text-black uppercase tracking-tight mb-2">{selectedProject.title}</h2>
                 
                 <div className="inline-block px-2.5 py-1 bg-black text-white text-xs font-black uppercase mb-6 self-start">
                   {selectedProject.path} TRACK
                 </div>
                 
                 <h4 className="text-xs font-black text-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                   <Layers size={14} className="stroke-[2.5]" /> CORE TECHNOLOGIES
                 </h4>
                 <div className="flex flex-wrap gap-1.5 mb-8">
                   {selectedProject.stack.map(s => (
                     <span key={s} className="px-2.5 py-1 bg-white border-2 border-black text-xs text-black font-black uppercase shadow-[2px_2px_0px_#000]">{s}</span>
                   ))}
                 </div>

                 <div className="mt-auto pt-6 border-t-2 border-black space-y-3">
                   <div className="flex items-center gap-3 bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                     <div className="p-2 bg-[#CCFF00] border border-black">
                       <Users size={16} className="text-black stroke-[2.5]" />
                     </div>
                     <span className="text-xs font-black text-black uppercase">
                       {selectedProject.users} DEVELOPERS CONSTRUCTED
                     </span>
                   </div>
                   <div className="flex items-center gap-3 bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                     <div className="p-2 bg-[#00F0FF] border border-black">
                       <FolderGit2 size={16} className="text-black stroke-[2.5]" />
                     </div>
                     <span className="text-xs font-black text-black uppercase">
                       READY FOR PORTFOLIO SHOWCASE
                     </span>
                   </div>
                 </div>
               </div>
               
               {/* Right Column: Detailed Breakdown */}
               <div className="md:w-3/5 p-6 md:p-8 bg-white overflow-y-auto">
                  <h3 className="text-lg font-black text-black uppercase mb-3 flex items-center gap-2">
                    <BookOpen size={18} className="stroke-[2.5]" /> PROJECT SPECIFICATION
                  </h3>
                  <div className="bg-[#F0EDE6] p-4 border-2 border-black mb-8 shadow-[2px_2px_0px_#000]">
                    <p className="text-black text-xs md:text-sm font-bold leading-relaxed">
                      {selectedProject.desc}
                    </p>
                  </div>

                  <h3 className="text-lg font-black text-black uppercase mb-4 flex items-center gap-2">
                    <Rocket size={18} className="stroke-[2.5]" /> IMPLEMENTATION PHASES
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { step: 1, title: 'PLANNING & ARCHITECTURE', desc: `Define repository scope. Initialize dependencies for ${selectedProject.stack.join(', ')}. Blueprint system diagrams, REST/gRPC endpoints, or schema designs.` },
                      { step: 2, title: 'CORE DEVELOPMENT', desc: 'Implement foundational microservices and data pipelines. Construct a working functional MVP before tackling advanced performance edge cases.' },
                      { step: 3, title: 'TESTING & SYSTEM RESILIENCE', desc: 'Stress test throughput, handle concurrency bottlenecks, and write integration suites according to industry standards.' },
                      { step: 4, title: 'CONTAINERIZATION & DEPLOYMENT', desc: 'Construct container images, publish Docker/K8s manifests, and document architectural highlights in a comprehensive README.' }
                    ].map(p => (
                      <div key={p.step} className="flex gap-3 bg-[#FBF9F5] border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                        <div className="w-8 h-8 bg-[#FFDE59] border-2 border-black flex items-center justify-center font-black text-black text-sm shrink-0">
                          {p.step}
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-black uppercase mb-1">{p.title}</h4>
                          <p className="text-xs font-bold text-gray-700 leading-relaxed">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3 border-t-2 border-black pt-6">
                     <button 
                       onClick={() => {
                          alert('Initializing project workspace container...');
                          setSelectedProject(null);
                       }}
                       className="flex-1 bg-[#CCFF00] hover:bg-[#FFDE59] border-3 border-black text-black py-3 px-4 font-black text-xs uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                     >
                       <Play size={14} className="stroke-[3]" /> [ INITIALIZE WORKSPACE ]
                     </button>
                     <button 
                       onClick={() => window.open(`https://github.com/search?q=${encodeURIComponent(selectedProject.title)}`, '_blank')}
                       className="px-4 py-3 bg-white hover:bg-black hover:text-white border-3 border-black font-black text-xs uppercase text-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                     >
                       <Github size={14} className="stroke-[2.5]" /> [ VIEW REPOSITORIES ]
                     </button>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}