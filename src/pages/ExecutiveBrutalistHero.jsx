import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Shield,
  Zap,
  Terminal,
  ChevronDown,
  Check,
  Copy,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Layers,
  Cpu,
  Share2,
  Lock,
  Download
} from 'lucide-react';
import { executiveData, executiveList } from '../data/executiveBrutalistData';

export default function ExecutiveBrutalistHero() {
  const { role = 'ceo' } = useParams();
  const navigate = useNavigate();

  // Find active executive, fallback to ceo
  const currentKey = role.toLowerCase();
  const activeExec = executiveData[currentKey] || executiveData.ceo;

  const [filterMode, setFilterMode] = useState('normal'); // 'normal', 'bw', 'high-contrast'
  const [activeIntelIndex, setActiveIntelIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Keyboard navigation between executives: Left / Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentIndex = executiveList.findIndex((item) => item.id === activeExec.id);
      if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % executiveList.length;
        navigate(`/executive/${executiveList[nextIndex].id}`);
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + executiveList.length) % executiveList.length;
        navigate(`/executive/${executiveList[prevIndex].id}`);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeExec.id, navigate]);

  const currentIndex = executiveList.findIndex((item) => item.id === activeExec.id);
  const prevExec = executiveList[(currentIndex - 1 + executiveList.length) % executiveList.length];
  const nextExec = executiveList[(currentIndex + 1) % executiveList.length];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeExec.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const getFilterStyle = () => {
    switch (filterMode) {
      case 'bw':
        return 'grayscale contrast-125';
      case 'high-contrast':
        return 'contrast-150 saturate-150 brightness-95';
      default:
        return 'contrast-105';
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EDE6] text-black font-mono selection:bg-black selection:text-yellow-300 pb-20">
      
      {/* ═══ EXECUTIVE SWITCHER BAR ═══ */}
      <div className="border-b-4 border-black bg-white px-4 sm:px-8 py-2.5 shadow-[0_4px_0px_#000]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-600 animate-ping rounded-full inline-block" />
            <span className="text-xs font-black uppercase tracking-tight">HYPERS_EXEC_OPS // DOSSIERS:</span>
          </div>

          {/* 8-Way Executive Switcher Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {executiveList.map((item) => {
              const isActive = item.id === activeExec.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(`/executive/${item.id}`)}
                  className={`px-2.5 py-1 text-xs font-black uppercase tracking-wider border-2 border-black transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? `${item.theme.bg} ${item.theme.text} shadow-[3px_3px_0px_#000] translate-y-[-1px]`
                      : 'bg-white text-black hover:bg-neutral-100 shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]'
                  }`}
                >
                  {item.shortTitle}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══ 3. HERO SHOWCASE STAGE ═══ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ─── LEFT COLUMN: EXECUTIVE SPECIFICATION (7 cols) ─── */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Classification & Code Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 bg-black text-[#CCFF00] text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000]">
                {activeExec.code}
              </span>
              <span className="px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000]">
                {activeExec.clearance}
              </span>
              <span className="px-3 py-1 bg-white text-emerald-700 text-xs font-bold uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                {activeExec.status}
              </span>
            </div>

            {/* Giant Brutalist Name & Title */}
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-black leading-none break-words">
                {activeExec.name}
              </h1>
              <div className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-800 mt-2 flex items-center gap-3">
                <span className="text-red-600 font-mono">//</span>
                <span>{activeExec.title}</span>
              </div>
            </div>

            {/* Brutalist Manifesto / Tagline Banner */}
            <div className={`p-5 sm:p-6 border-4 border-black ${activeExec.theme.bg} ${activeExec.theme.text} ${activeExec.theme.glow}`}>
              <div className="text-xs uppercase font-black tracking-widest mb-1.5 opacity-80 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" />
                <span>EXECUTIVE DOCTRINE MANDATE</span>
              </div>
              <p className="text-lg sm:text-xl font-black leading-snug tracking-tight uppercase">
                "{activeExec.tagline}"
              </p>
            </div>

            {/* Executive Bio / Tactical Summary */}
            <div className="p-6 bg-white border-4 border-black shadow-[6px_6px_0px_#000]">
              <div className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-2 font-mono">
                [ 01 // OPERATIONAL PROFILE ]
              </div>
              <p className="text-sm sm:text-base font-medium leading-relaxed text-neutral-900">
                {activeExec.summary}
              </p>
            </div>

            {/* 4 Brutalist Key Metric Telemetry Boxes */}
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-black mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-black" />
                <span>KEY TELEMETRY & PERFORMANCE BENCHMARKS</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {activeExec.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white border-3 border-black shadow-[4px_4px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform"
                  >
                    <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-neutral-500">
                      [{metric.label}]
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-black text-black my-1 tracking-tight">
                      {metric.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-neutral-600 font-semibold truncate">
                      {metric.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`mailto:${activeExec.contact.email}`}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3.5 bg-black text-[#FFDE59] text-sm font-black uppercase tracking-wider border-3 border-black shadow-[5px_5px_0px_#000] hover:bg-neutral-900 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>[DISPATCH DIRECT MEMO]</span>
              </a>

              <Link
                to="/pitch"
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white text-black text-sm font-black uppercase tracking-wider border-3 border-black shadow-[5px_5px_0px_#000] hover:bg-neutral-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                <Layers className="w-4 h-4" />
                <span>[WORKSPACE COCKPIT]</span>
              </Link>
            </div>

          </div>

          {/* ─── RIGHT COLUMN: BRUTALIST PORTRAIT & DISPATCH TERMINAL (5 cols) ─── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Framed Brutalist Executive Portrait */}
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] relative overflow-hidden">
              
              {/* Caution stripe header */}
              <div className="bg-black text-[#FFDE59] px-4 py-2 border-b-4 border-black flex items-center justify-between text-[11px] font-black tracking-widest uppercase">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-red-500 rounded-none inline-block" />
                  /// AUTHENTICATED C-SUITE DOSSIER ///
                </span>
                <span>{activeExec.code}</span>
              </div>

              {/* High-res Portrait Image with frame & corner brackets */}
              <div className="relative p-4 sm:p-5 bg-neutral-100 flex items-center justify-center">
                {/* Corner crosshairs */}
                <div className="absolute top-2 left-2 text-black font-black text-sm select-none pointer-events-none">┌</div>
                <div className="absolute top-2 right-2 text-black font-black text-sm select-none pointer-events-none">┐</div>
                <div className="absolute bottom-2 left-2 text-black font-black text-sm select-none pointer-events-none">└</div>
                <div className="absolute bottom-2 right-2 text-black font-black text-sm select-none pointer-events-none">┘</div>

                <div className="w-full aspect-[4/5] overflow-hidden border-3 border-black bg-neutral-900 relative">
                  <img
                    src={activeExec.image}
                    alt={activeExec.name}
                    className={`w-full h-full object-cover transition-all duration-300 ${getFilterStyle()}`}
                  />

                  {/* Stamp overlay */}
                  <div className="absolute bottom-3 right-3 bg-black/80 text-[#FFDE59] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest border border-[#FFDE59]/50 select-none">
                    HYPERS_2026_VERIFIED
                  </div>
                </div>
              </div>

              {/* Image Filter Mode Switcher */}
              <div className="px-4 py-2.5 bg-neutral-50 border-t-3 border-black flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-600">PHOTO_MODE:</span>
                <div className="flex gap-1.5">
                  {['normal', 'bw', 'high-contrast'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setFilterMode(mode)}
                      className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider border-2 border-black ${
                        filterMode === mode
                          ? 'bg-black text-white'
                          : 'bg-white text-black hover:bg-neutral-200'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Contact Console */}
              <div className="p-5 border-t-4 border-black bg-white space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b-2 border-neutral-200">
                  <span className="text-neutral-500 font-bold uppercase">DIRECT_DISPATCH:</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-black hover:text-neutral-700 font-black cursor-pointer"
                  >
                    <span className="underline">{activeExec.contact.email}</span>
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pb-2 border-b-2 border-neutral-200">
                  <span className="text-neutral-500 font-bold uppercase">COMMAND_BASE:</span>
                  <span className="font-bold text-black">{activeExec.contact.location}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-bold uppercase">AVAILABILITY:</span>
                  <span className="font-bold text-emerald-700">{activeExec.contact.availability}</span>
                </div>
              </div>

            </div>

            {/* Quick Keyboard Shortcut / Navigation Hint */}
            <div className="p-3 bg-black text-white text-xs border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-neutral-800 text-yellow-300 font-bold text-[10px] border border-neutral-600">←</kbd>
                <kbd className="px-1.5 py-0.5 bg-neutral-800 text-yellow-300 font-bold text-[10px] border border-neutral-600">→</kbd>
                <span className="text-neutral-400">Keys navigate C-Suite</span>
              </span>
              <span className="text-yellow-300 font-black">[{currentIndex + 1} / {executiveList.length}]</span>
            </div>

          </div>

        </div>

        {/* ═══ 4. DEEP STRATEGIC INTEL & EXECUTION ARSENAL ═══ */}
        <section className="mt-14 pt-10 border-t-4 border-black">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sub-Column: 4 Pillars of Execution (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-black inline-block" />
                <h3 className="text-lg font-black uppercase tracking-tight text-black">
                  [ 02 // C-SUITE EXECUTION ARSENAL ]
                </h3>
              </div>

              <div className="space-y-3">
                {activeExec.pillars.map((pillar) => (
                  <div
                    key={pillar.code}
                    className="p-4 bg-white border-3 border-black shadow-[4px_4px_0px_#000]"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-black uppercase text-black font-mono">
                        // {pillar.code}
                      </span>
                      <span className="px-2 py-0.5 bg-neutral-100 text-black text-[10px] font-black uppercase border border-black">
                        OPERATIONAL
                      </span>
                    </div>
                    <h4 className="text-base font-black text-black uppercase mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-neutral-700 font-medium leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sub-Column: Core Doctrine & FAQ Intel (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-black inline-block" />
                <h3 className="text-lg font-black uppercase tracking-tight text-black">
                  [ 03 // STRATEGIC INTEL & DEBATE ACCORDION ]
                </h3>
              </div>

              {/* Accordion Questions */}
              <div className="space-y-3">
                {activeExec.intel.map((item, idx) => {
                  const isOpen = activeIntelIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border-3 border-black bg-white shadow-[4px_4px_0px_#000] overflow-hidden"
                    >
                      <button
                        onClick={() => setActiveIntelIndex(isOpen ? -1 : idx)}
                        className="w-full p-4 text-left font-black text-xs sm:text-sm uppercase tracking-tight flex items-center justify-between gap-4 bg-white hover:bg-neutral-50 cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-neutral-400">Q{idx + 1}:</span>
                          <span>{item.q}</span>
                        </span>
                        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-neutral-50 border-t-2 border-black text-xs sm:text-sm font-medium leading-relaxed text-neutral-900">
                          <span className="font-black text-black block mb-1">UNVARNISHED RESPONSE:</span>
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Core Execution Doctrine Bulletins */}
              <div className="p-5 bg-black text-white border-3 border-black shadow-[4px_4px_0px_#000] mt-4">
                <div className="text-xs font-black uppercase tracking-widest text-[#FFDE59] mb-3">
                  /// CORE RULES OF ENGAGEMENT ///
                </div>
                <ul className="space-y-2 text-xs leading-relaxed">
                  {activeExec.doctrine.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#CCFF00] font-black shrink-0">►</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </section>

        {/* ═══ 5. PREVIOUS / NEXT EXECUTIVE FOOTER JUMP ═══ */}
        <div className="mt-14 pt-8 border-t-4 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <button
            onClick={() => navigate(`/executive/${prevExec.id}`)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-white text-black text-xs font-black uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_#000] hover:bg-neutral-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>[ PREVIOUS: {prevExec.shortTitle} - {prevExec.name} ]</span>
          </button>

          <div className="text-xs font-black uppercase text-neutral-500">
            HYPERS C-SUITE COMMAND 2026
          </div>

          <button
            onClick={() => navigate(`/executive/${nextExec.id}`)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-black text-white text-xs font-black uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_#000] hover:bg-neutral-900 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
          >
            <span>[ NEXT: {nextExec.shortTitle} - {nextExec.name} ]</span>
            <ArrowRight className="w-4 h-4 text-[#FFDE59]" />
          </button>

        </div>

      </main>

    </div>
  );
}
