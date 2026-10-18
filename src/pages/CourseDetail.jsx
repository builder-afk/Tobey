import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { curriculumData } from '../data/curriculumData';
import { triggerYoupiPayment } from '../utils/youpiPayment';

// Helper to safely render Lucide icons by string name with fallback
const DynamicIcon = ({ name, size = 20, className = "" }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return <Icons.Box size={size} className={className} />;
  return <IconComponent size={size} className={className} />;
};

export default function CourseDetail() {
  const { courseId } = useParams();
  const [copiedSyllabus, setCopiedSyllabus] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  const data = curriculumData[courseId];

  // 404 Fallback in Neo-Brutalism
  if (!data) {
    return (
      <div className="min-h-screen bg-[#F0EDE6] font-mono flex flex-col items-center justify-center p-8 text-center select-none text-black">
        <div className="bg-white border-4 border-black p-8 sm:p-12 shadow-[10px_10px_0px_#000] max-w-lg w-full">
          <div className="w-16 h-16 bg-[#FF0033] text-white border-3 border-black flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_#000]">
            <Icons.AlertCircle size={36} className="stroke-[2.5]" />
          </div>
          <span className="px-2.5 py-1 bg-[#FF0033] text-white border border-black text-xs font-black uppercase mb-3 inline-block">
            [ ERROR 404 // CURRICULUM NOT FOUND ]
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight mb-3">
            CURRICULUM SPEC NOT FOUND
          </h1>
          <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed mb-6">
            The curriculum identifier <span className="bg-[#FFDE59] px-1 font-black">"{courseId}"</span> is currently undergoing technical audit or the specified route does not exist.
          </p>
          <Link 
            to="/courses" 
            className="w-full py-3 bg-[#CCFF00] hover:bg-[#FFDE59] text-black font-black text-xs uppercase border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all block"
          >
            [ ← RETURN TO ALL CURRICULA ]
          </Link>
        </div>
      </div>
    );
  }

  // Copy full syllabus markdown to clipboard
  const handleCopySyllabus = async () => {
    const md = `# HYPERS INDUSTRY CURRICULUM SPECIFICATION
Title: ${data.title}
Tagline: ${data.tagline} | Duration: ${data.duration}
Overview: ${data.overview}

## STRATEGIC GOALS & OBJECTIVES
${data.objectives?.map((obj, i) => `${i + 1}. ${obj.title}: ${obj.desc}`).join('\n') || ''}

## CURRICULUM PHASES & MODULES
${data.phases?.map(p => `### ${p.name}: ${p.title} (${p.subtitle})
Milestone: ${p.milestoneTitle}
Modules:
${p.modules?.map(m => `- [${m.code}] ${m.title} (${m.weeks}): ${m.desc}`).join('\n')}`).join('\n\n') || ''}

## PRODUCTION TECH STACK
- Client: ${data.techStack?.client?.title} (${data.techStack?.client?.desc})
- Server: ${data.techStack?.server?.title} (${data.techStack?.server?.desc})
- Engine/DB: ${data.techStack?.database?.title} (${data.techStack?.database?.desc})
- DevOps: ${data.techStack?.devops?.join(', ') || 'N/A'}

## CAPSTONE ARTIFACTS
${data.projects?.map(pr => `- ${pr.title} [${pr.tag}]: ${pr.desc}`).join('\n') || ''}
`;

    try {
      await navigator.clipboard.writeText(md);
      setCopiedSyllabus(true);
      setTimeout(() => setCopiedSyllabus(false), 2500);
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-[#F0EDE6] text-black font-mono selection:bg-black selection:text-[#FFDE59] select-none">
      
      {/* ═══ HERO / DETAIL CONTENT ═══ */}

      {/* ═══ 3. HERO STAGE // COURSE DOSSIER SPECIFICATION ═══ */}
      <section className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
        
        {/* Navigation pill & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <Icons.ArrowLeft size={14} className="stroke-[3]" />
            <span>[ ← BACK TO ALL ELITE CURRICULA ]</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
              {data.tagline}
            </span>
            <span className="px-3 py-1 bg-[#CCFF00] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
              {data.duration}
            </span>
            <span className="px-3 py-1 bg-black text-[#00F0FF] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] hidden sm:inline-block">
              INDUSTRY RIGOR // 2026 SPEC
            </span>
          </div>
        </div>

        {/* Headline & Overview Card */}
        <div className="bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_#000] space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-black text-[#CCFF00] font-black text-[10px] uppercase tracking-wider mb-4 border border-black">
              <Icons.Terminal size={12} className="stroke-[3]" />
              <span>[ HYPERS PRODUCTION TRACK // COMPREHENSIVE ROADMAP ]</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase leading-[1.05]">
              {data.title}
            </h1>
          </div>

          <div className="p-5 bg-[#FAF8F5] border-3 border-black shadow-[4px_4px_0px_#000]">
            <p className="text-xs sm:text-sm font-bold text-gray-800 uppercase leading-relaxed">
              // {data.overview}
            </p>
          </div>

          {/* Quick Action Matrix */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t-2 border-black">
            <button
              data-youpi-pay
              data-order-id={`HYPERS-${(courseId || data.title).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16)}-${Date.now().toString().slice(-6)}`}
              data-amount="2799.00"
              data-currency="INR"
              data-name="HYPERS ACADEMY"
              data-description={`Tuition Pass: ${data.title}`}
              onClick={() => triggerYoupiPayment(data, '2799.00')}
              className="px-6 py-3 bg-[#CCFF00] hover:bg-[#FFDE59] border-3 border-black font-black text-xs uppercase shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer text-black"
            >
              <Icons.Zap size={16} className="fill-black stroke-black" />
              <span>[ 💳 PROCEED TO BATCH ]</span>
            </button>

            <Link
              to="/ide"
              className="px-5 py-3 bg-white hover:bg-neutral-100 border-3 border-black font-black text-xs uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
            >
              <Icons.Terminal size={16} className="stroke-[2.5]" />
              <span>[ ⚡ PRACTICE IN WORKSPACE ]</span>
            </Link>

            <Link
              to="/contests"
              className="px-5 py-3 bg-[#00F0FF] hover:bg-[#FFDE59] border-3 border-black font-black text-xs uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
            >
              <Icons.Trophy size={16} className="stroke-[2.5]" />
              <span>[ 🏆 COMPETE IN 24 ARENAS ]</span>
            </Link>

            <button
              onClick={handleCopySyllabus}
              className="px-5 py-3 bg-white hover:bg-[#FAF8F5] border-3 border-black font-black text-xs uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
            >
              {copiedSyllabus ? <Icons.Check size={16} className="text-emerald-600 stroke-[3]" /> : <Icons.Copy size={16} className="stroke-[2.5]" />}
              <span>{copiedSyllabus ? '[ SYLLABUS COPIED! ]' : '[ 📋 EXPORT SYLLABUS ]'}</span>
            </button>
          </div>
        </div>

      </section>

      {/* ═══ 4. PROGRAM OBJECTIVES // STRATEGIC GOALS ═══ */}
      {data.objectives && data.objectives.length > 0 && (
        <section className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-3 border-b-3 border-black">
            <div>
              <span className="px-2 py-0.5 bg-[#FFDE59] border border-black text-[10px] font-black uppercase">
                STRATEGIC GOALS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mt-1">
                PROGRAM OBJECTIVES
              </h2>
            </div>
            <span className="text-xs font-black uppercase text-gray-500 hidden sm:inline-block">
              [ 4 CORE MASTERY PILLARS ]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.objectives.map((obj, i) => {
              const bgColors = ['bg-[#FFDE59]', 'bg-[#00F0FF]', 'bg-[#CCFF00]', 'bg-[#FF52D9]'];
              const accentColor = bgColors[i % bgColors.length];
              return (
                <div 
                  key={i}
                  className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header with Number and Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 ${accentColor} border-3 border-black flex items-center justify-center shadow-[3px_3px_0px_#000]`}>
                        <DynamicIcon name={obj.icon} size={24} className="stroke-[2.5]" />
                      </div>
                      <span className="w-8 h-8 bg-black text-[#FFDE59] border-2 border-black font-black text-xs flex items-center justify-center">
                        0{obj.num || (i + 1)}
                      </span>
                    </div>

                    <h3 className="font-black text-base uppercase text-black mb-2 leading-snug">
                      {obj.title}
                    </h3>
                    <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed">
                      {obj.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t-2 border-black text-[10px] font-black uppercase text-gray-500 flex items-center justify-between">
                    <span>PILLAR 0{i + 1}</span>
                    <span className="text-black font-black">PRODUCTION VERIFIED</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ═══ 5. PROGRAM STRUCTURE & TIMELINE (ROADMAP) ═══ */}
      {data.phases && data.phases.length > 0 && (
        <section className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-3 border-b-3 border-black">
            <div>
              <span className="px-2 py-0.5 bg-[#00F0FF] border border-black text-[10px] font-black uppercase">
                CURRICULUM ROADMAP
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mt-1">
                PROGRAM STRUCTURE & TIMELINE
              </h2>
            </div>
            <span className="text-xs font-black uppercase text-gray-500 hidden sm:inline-block">
              [ {data.phases.length} PROGRESSIVE PHASES ]
            </span>
          </div>

          {/* Stepper Timeline Box */}
          <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {data.phases.map((phase, i) => {
                const colors = ['bg-[#FFDE59]', 'bg-[#00F0FF]', 'bg-[#CCFF00]', 'bg-[#FF52D9]'];
                const c = colors[i % colors.length];
                return (
                  <div key={i} className="p-4 bg-[#FAF8F5] border-3 border-black shadow-[3px_3px_0px_#000]">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-0.5 ${c} border border-black font-black text-[10px] uppercase text-black`}>
                        {phase.name}
                      </span>
                      <span className="text-[10px] font-black uppercase text-gray-600">
                        {phase.subtitle}
                      </span>
                    </div>
                    <h3 className="font-black text-sm uppercase text-black line-clamp-1">{phase.title}</h3>
                    <div className="text-[10px] font-bold text-gray-600 uppercase mt-2">
                      {phase.modules?.length || 0} DEEP-DIVE MODULES
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stepper Nodes */}
            <div className="p-4 bg-[#FAF8F5] border-2 border-black flex flex-wrap items-center justify-between gap-3 text-xs font-black uppercase">
              <span className="text-black flex items-center gap-2">
                <Icons.Layers size={14} className="stroke-[3]" />
                TOTAL SYSTEM MODULES:
              </span>
              <div className="flex flex-wrap gap-2">
                {data.phases.map((phase) => 
                  phase.modules?.map((mod, j) => (
                    <span 
                      key={`${phase.id}-${j}`} 
                      className="px-2 py-0.5 bg-white border border-black text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]"
                      title={mod.title}
                    >
                      {mod.code}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ 6. PHASE CONTENT DEEP-DIVES ═══ */}
      {data.phases && data.phases.map((phase, idx) => {
        const bgColors = ['bg-[#FFDE59]', 'bg-[#00F0FF]', 'bg-[#CCFF00]', 'bg-[#FF52D9]'];
        const phaseAccent = bgColors[idx % bgColors.length];
        
        return (
          <section key={phase.id || idx} className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
            
            {/* Phase Section Titlebar */}
            <div className="bg-white border-4 border-black p-4 sm:p-6 shadow-[6px_6px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 ${phaseAccent} border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]`}>
                  {phase.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-black">
                  {phase.title}
                </h3>
              </div>
              <span className="px-2.5 py-1 bg-[#FAF8F5] border border-black text-xs font-black uppercase text-gray-700 self-start sm:self-auto">
                {phase.subtitle}
              </span>
            </div>

            {/* Split Grid: Modules List + Milestone Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Modules (8 Columns) */}
              <div className="lg:col-span-8 space-y-4">
                {phase.modules?.map((mod, j) => (
                  <div 
                    key={j}
                    className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-black gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-black text-[#FFDE59] border border-black text-[11px] font-black uppercase">
                            {mod.code}
                          </span>
                          <h4 className="font-black text-base uppercase text-black">{mod.title}</h4>
                        </div>
                        <span className="px-2 py-0.5 bg-[#FAF8F5] border border-black text-[10px] font-black uppercase text-gray-700 shrink-0">
                          {mod.weeks}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed mb-4">
                        {mod.desc}
                      </p>
                    </div>

                    {/* Tags */}
                    {mod.tags && mod.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black">
                        {mod.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx}
                            className="px-2 py-0.5 bg-[#FAF8F5] border border-black text-[10px] font-black uppercase text-black"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Milestone Box (4 Columns) */}
              <div className="lg:col-span-4 bg-[#CCFF00] border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-black text-[#FFDE59] border-3 border-black flex items-center justify-center mb-6 shadow-[3px_3px_0px_#000]">
                    <Icons.Award size={28} className="stroke-[2.5]" />
                  </div>

                  <span className="text-[10px] font-black uppercase text-black tracking-wider block mb-1">
                    PHASE VERIFICATION
                  </span>
                  <h4 className="text-2xl font-black uppercase text-black mb-3 leading-tight">
                    {phase.milestoneTitle}
                  </h4>
                  <p className="text-xs font-bold text-black uppercase mb-6 leading-relaxed">
                    CRITICAL MILESTONE DELIVERABLES & VERIFIABLE PROOFS REQUIRED TO PASS PHASE GATE.
                  </p>

                  <div className="space-y-3">
                    {phase.milestoneFeatures?.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 p-3 bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
                        <Icons.CheckCircle2 size={16} className="text-black stroke-[3] shrink-0 mt-0.5" />
                        <span className="text-xs font-black uppercase text-black leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t-2 border-black">
                  <span className="px-3 py-1 bg-black text-[#CCFF00] border border-black font-black text-[10px] uppercase block text-center">
                    [ PHASE GATE AUDIT PASSED ]
                  </span>
                </div>
              </div>

            </div>
          </section>
        );
      })}

      {/* ═══ 7. TECHNOLOGY STACK RUNTIMES ═══ */}
      {data.techStack && (
        <section className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-3 border-b-3 border-black">
            <div>
              <span className="px-2 py-0.5 bg-[#FFDE59] border border-black text-[10px] font-black uppercase">
                ARCHITECTURE SPECIFICATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mt-1">
                PRODUCTION TECHNOLOGY STACK
              </h2>
            </div>
            <span className="text-xs font-black uppercase text-gray-500 hidden sm:inline-block">
              [ ZERO-THEORY INDUSTRY RUNTIMES ]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['client', 'server', 'database'].map((layerKey, lIdx) => {
              const layer = data.techStack[layerKey];
              if (!layer) return null;
              const cardColors = ['bg-[#FFDE59]', 'bg-[#00F0FF]', 'bg-[#CCFF00]'];
              const accent = cardColors[lIdx % cardColors.length];

              return (
                <div 
                  key={layerKey}
                  className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col justify-between text-center"
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-4 border-b-2 border-black">
                      <span className="text-[10px] font-black uppercase text-gray-500">{layerKey.toUpperCase()} TIER</span>
                      <span className={`px-2 py-0.5 ${accent} border border-black text-[10px] font-black uppercase text-black`}>
                        {layer.type || 'PRODUCTION'}
                      </span>
                    </div>

                    <div className="w-16 h-16 bg-[#FAF8F5] border-3 border-black flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_#000]">
                      <DynamicIcon name={layer.icon} size={32} className="stroke-[2.5]" />
                    </div>

                    <h3 className="text-xl font-black uppercase text-black mb-2">{layer.title}</h3>
                    <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed mb-6">{layer.desc}</p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-1.5 pt-4 border-t-2 border-black">
                    {layer.tags?.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#FAF8F5] border border-black text-[10px] font-black uppercase text-black">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* DevOps and Tooling Badges */}
          {data.techStack.devops && data.techStack.devops.length > 0 && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000]">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-black text-xs font-black uppercase text-black">
                <Icons.Cpu size={16} className="stroke-[2.5]" />
                <span>[ CLOUD INFRASTRUCTURE, DEVOPS & PROFILING TOOLING ]</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {data.techStack.devops.map((tool, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#FFDE59] border-2 border-black text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000] transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ═══ 8. CAPSTONE PROJECTS ═══ */}
      {data.projects && data.projects.length > 0 && (
        <section className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-3 border-b-3 border-black">
            <div>
              <span className="px-2 py-0.5 bg-[#FF52D9] border border-black text-[10px] font-black uppercase text-black">
                PORTFOLIO PROOFS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mt-1">
                INDUSTRY CAPSTONE PROJECTS
              </h2>
            </div>
            <span className="text-xs font-black uppercase text-gray-500 hidden sm:inline-block">
              [ BUILD REAL. SHIP REAL. HIRE REAL. ]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map((proj, idx) => (
              <div 
                key={idx}
                className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#FFDE59] border-3 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                      <DynamicIcon name={proj.icon} size={24} className="stroke-[2.5]" />
                    </div>
                    <span className="px-2.5 py-1 bg-black text-[#CCFF00] border border-black text-[10px] font-black uppercase">
                      {proj.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black uppercase text-black mb-3">{proj.title}</h3>
                  <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed mb-6 bg-[#FAF8F5] border-2 border-black p-3">
                    {proj.desc}
                  </p>

                  <div className="space-y-2 mb-6">
                    {proj.features?.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs font-bold uppercase text-gray-800">
                        <Icons.CheckCircle2 size={14} className="text-black stroke-[3] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-black flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-gray-500">PRODUCTION ARTIFACT #{idx + 1}</span>
                  <Link
                    to="/ide"
                    className="px-3 py-1.5 bg-[#CCFF00] hover:bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
                  >
                    <span>[ BUILD IN IDE ]</span>
                    <Icons.ArrowRight size={14} className="stroke-[3]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══ 9. COMPLETE ENGINEERING ECOSYSTEM & CAREER OUTCOMES ═══ */}
      <section className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
        <div className="bg-[#FAF8F5] border-4 border-black p-8 sm:p-12 shadow-[10px_10px_0px_#000] text-center space-y-6">
          
          <div className="inline-block px-3 py-1 bg-black text-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
            [ THE COMPLETE ENGINEERING ECOSYSTEM ]
          </div>

          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black max-w-3xl mx-auto">
            ALL 12 TRACKS ARE INTERCONNECTED IN THE HYPERS RUNTIME
          </h2>

          <p className="text-xs sm:text-sm font-bold text-gray-700 uppercase max-w-2xl mx-auto leading-relaxed">
            // MASTERING THIS TRACK UNLOCKS SEAMLESS INTEGRATION INTO HIGH-SCALE BACKENDS, DISTRIBUTED CLOUD CLUSTERS, AND REAL-TIME ARENA BATTLES.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4">
            {[
              { title: 'Core CS & CP', color: 'bg-[#FFDE59]' },
              { title: 'Backend & Systems', color: 'bg-[#FF8811]' },
              { title: 'Cloud & DevOps', color: 'bg-[#00F0FF]' },
              { title: 'AI & Deep Learning', color: 'bg-[#FF52D9]' },
              { title: 'Gen AI & Agents', color: 'bg-[#CCFF00]' },
              { title: 'System Design (HLD)', color: 'bg-[#00F0FF]' },
              { title: 'Low Level Design (LLD)', color: 'bg-[#FFDE59]' },
              { title: 'Rust & Kernel Systems', color: 'bg-[#CCFF00]' }
            ].map((node, i) => (
              <div 
                key={i}
                className="p-3 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-between gap-2"
              >
                <div className={`w-3 h-3 ${node.color} border border-black shrink-0`} />
                <span className="text-[11px] font-black uppercase text-black truncate">{node.title}</span>
              </div>
            ))}
          </div>

          {/* Career Outcomes Banner */}
          <div className="p-4 bg-black text-[#CCFF00] border-3 border-black shadow-[4px_4px_0px_#000] max-w-3xl mx-auto mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-black uppercase">
            <div className="flex items-center gap-2">
              <Icons.Briefcase size={18} className="text-[#FFDE59] stroke-[2.5]" />
              <span>CAREER OUTCOMES: {data.careerOutcomes || "READY FOR TIER-1 INDUSTRY ARCHITECT ROLES"}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                data-youpi-pay
                data-order-id={`HYPERS-${(courseId || data.title).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16)}-${Date.now().toString().slice(-6)}`}
                data-amount="2799.00"
                data-currency="INR"
                data-name="HYPERS ACADEMY"
                data-description={`Tuition Pass: ${data.title}`}
                onClick={() => triggerYoupiPayment(data, '2799.00')}
                className="px-4 py-1.5 bg-[#CCFF00] hover:bg-[#FFDE59] text-black font-black border border-black transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <Icons.Zap size={14} className="fill-black stroke-black" />
                <span>[ ⚡ PROCEED TO ENROLL // ₹2,799 ]</span>
              </button>
              <Link
                to="/recruitment"
                className="px-3 py-1.5 bg-white text-black border border-black hover:bg-[#FFDE59] transition-colors shrink-0"
              >
                [ RECRUITMENT POOL ]
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ 10. BRUTALIST FOOTER ═══ */}
      <footer className="bg-black text-white border-t-4 border-black pt-12 pb-10 px-6 md:px-12 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-black uppercase">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#FFDE59] border border-black flex items-center justify-center text-black font-black">
              H
            </div>
            <span className="text-white">
              HYPERS PROTOCOL // {data.title} SPECIFICATION
            </span>
          </div>

          <div className="flex items-center gap-6 text-neutral-400">
            <Link to="/courses" className="hover:text-white transition-colors">[ CURRICULA ]</Link>
            <Link to="/contests" className="hover:text-white transition-colors">[ CONTESTS ]</Link>
            <Link to="/royale" className="hover:text-white transition-colors">[ CODING ROYALE ]</Link>
            <Link to="/ide" className="text-[#CCFF00] hover:underline">[ OPEN WORKSPACE ]</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
