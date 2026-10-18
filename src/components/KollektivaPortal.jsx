import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Compass, Rocket, Code2, Users, ArrowUpRight, ChevronDown, X, BookOpen, Layers } from 'lucide-react';

export default function KollektivaPortal({ onScrollDown }) {
  const [isOpen, setIsOpen] = useState(false);
  const portalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (portalRef.current && !portalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* ═══ MINIMALIST TOP-RIGHT PORTAL TRIGGER ═══ */}
      <div ref={portalRef} className="absolute top-6 right-6 sm:top-8 sm:right-10 lg:right-16 z-30 pointer-events-auto">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 hover:border-white/40 text-white text-xs sm:text-sm font-medium tracking-wide transition-all shadow-xl"
          aria-expanded={isOpen}
          aria-label="Toggle Platform Navigation"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white transition-transform group-hover:scale-125" />
          <span>Platform Portal</span>
          <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* ═══ FLOATING PORTAL DROPDOWN / MENU ═══ */}
        {isOpen && (
          <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-zinc-950/90 backdrop-blur-2xl border border-white/15 p-5 text-white shadow-2xl shadow-black/80 animate-[fadeIn_0.3s_ease] z-40">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-white/50 font-mono">Platform Gateway</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <Link
                to="/courses"
                onClick={() => setIsOpen(false)}
                className="group flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-white/10 transition"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white group-hover:text-white">Tech Curricula & Tracks</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs text-white/60 truncate mt-0.5">Loop Eng, Web4, Quant, Defence Tech, 40+ tracks</p>
                </div>
              </Link>

              <Link
                to="/pitch"
                onClick={() => setIsOpen(false)}
                className="group flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-white/10 transition"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <Rocket className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white group-hover:text-white">Founder Cockpit</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs text-white/60 truncate mt-0.5">Venture studio, readiness audit & sprint board</p>
                </div>
              </Link>

              <Link
                to="/executive/ceo"
                onClick={() => setIsOpen(false)}
                className="group flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-white/10 transition"
              >
                <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black flex items-center justify-center shrink-0 font-mono font-black text-xs group-hover:scale-105 transition-transform shadow-[2px_2px_0px_#000]">
                  C8
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white group-hover:text-yellow-300 transition-colors">C-Suite Brutalist Heroes</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs text-white/60 truncate mt-0.5">CEO, CTO, CFO, CMO, COO, CLO, CDO, HR</p>
                </div>
              </Link>

              <Link
                to="/pitch"
                onClick={() => setIsOpen(false)}
                className="group flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-white/10 transition"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white group-hover:text-white">Pitch Analyzer</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs text-white/60 truncate mt-0.5">AI pitch video feedback & slide-by-slide audit</p>
                </div>
              </Link>

              <Link
                to="/ide"
                onClick={() => setIsOpen(false)}
                className="group flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-white/10 transition"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white group-hover:text-white">Interactive IDE & Arenas</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs text-white/60 truncate mt-0.5">Live execution, coding royale & system design</p>
                </div>
              </Link>

              <Link
                to="/explore"
                onClick={() => setIsOpen(false)}
                className="group flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-white/10 transition"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <Users className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white group-hover:text-white">Explore Startups & Talent</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs text-white/60 truncate mt-0.5">Discover high-conviction teams and engineers</p>
                </div>
              </Link>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="text-xs font-medium text-white/80 hover:text-white underline underline-offset-4"
              >
                Sign In / Join
              </Link>
              {onScrollDown && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onScrollDown();
                  }}
                  className="text-xs text-white/70 hover:text-white flex items-center gap-1 font-medium cursor-pointer"
                >
                  <span>Explore Platform Info</span>
                  <span className="text-xs">↓</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
