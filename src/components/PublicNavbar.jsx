import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Zap, Menu, X } from 'lucide-react';

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: '[ DECK ]', to: '/contests' },
    { label: '[ CURRICULA ]', to: '/courses' },
    { label: '[ HIGH-MOAT STARTUPS ]', to: '/explore' },
    { label: '[ FOUNDER COCKPIT ]', to: '/pitch' },
  ];

  const isLinkActive = (to) => {
    if (location.pathname === to) return true;
    if (to === '/explore' && location.pathname.startsWith('/explore')) return true;
    if (to === '/courses' && (location.pathname.includes('course') || location.pathname.startsWith('/course/'))) return true;
    if (to === '/pitch' && (location.pathname === '/pitch' || location.pathname === '/founder-workspace')) return true;
    if (to === '/contests' && location.pathname.startsWith('/contests')) return true;
    return false;
  };

  return (
    <div className="w-full relative z-50 select-none font-mono">
      {/* ═══ 1. HIGH-FREQUENCY ALERT TICKER ═══ */}
      <div className="bg-black text-[#FFDE59] border-b-2 border-black overflow-hidden py-1.5 px-4 font-mono text-xs font-black tracking-wider uppercase select-none">
        <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
          <span>// HYPERS PROTOCOL // PRODUCTION-GRADE ENGINEERING & HIGH-STAKES COMPETITION // SYSTEM: NOMINAL //</span>
          <span>// 24 ARENA TRACKS DEPLOYED // 5,071 CONTEST POOL // 24,858+ ACTIVE OPERATORS //</span>
          <span>// HYPERS PROTOCOL // PRODUCTION-GRADE ENGINEERING & HIGH-STAKES COMPETITION // SYSTEM: NOMINAL //</span>
          <span>// 24 ARENA TRACKS DEPLOYED // 5,071 CONTEST POOL // 24,858+ ACTIVE OPERATORS //</span>
        </div>
      </div>

      {/* ═══ 2. COMMAND HEADER / TOPBAR ═══ */}
      <header className="sticky top-0 z-50 bg-white border-b-4 border-black px-4 sm:px-8 py-3.5 shadow-[0_4px_0px_#000]">
        <div className="w-full flex items-center justify-between gap-4">
          
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 bg-[#FFDE59] border-2 border-black flex items-center justify-center font-black text-base shadow-[2px_2px_0px_#000] group-hover:bg-[#CCFF00] transition-colors">
              H
            </div>
            <span className="text-xl font-black uppercase tracking-tighter text-black">
              HYPERS <span className="text-amber-500">✳</span>
            </span>
          </Link>

          {/* Quick Nav Links */}
          <nav className="hidden lg:flex items-center gap-4 text-xs font-black uppercase">
            {navLinks.map((item) => {
              const active = isLinkActive(item.to);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`transition-colors py-1 ${
                    active 
                      ? 'text-blue-600' 
                      : 'hover:text-blue-600 text-black'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <Link 
              to="/user-dashboard"
              className="px-3.5 py-2 bg-white hover:bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
            >
              <LayoutGrid size={14} className="stroke-[2.5]" />
              <span className="hidden sm:inline">[ DASHBOARD ]</span>
              <span className="sm:hidden">[ DASH ]</span>
            </Link>
            <Link 
              to="/ide"
              className="px-4 py-2 bg-[#CCFF00] hover:bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
            >
              <Zap size={14} className="stroke-[3]" />
              <span className="hidden sm:inline">[ ENTER WORKSPACE ]</span>
              <span className="sm:hidden">[ WORKSPACE ]</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 bg-white border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t-2 border-black flex flex-col gap-2 bg-[#FAF8F5] p-3 border-2 shadow-[3px_3px_0px_#000]">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 bg-white border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] hover:bg-[#FFDE59]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}
