import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  TrendingUp, Star, Users, ArrowRight, Search, X, Rocket, Brain, 
  Server, Database, Palette, ShieldCheck, Layers, Sparkles, Landmark, 
  Briefcase, Megaphone, LineChart, Cpu, Gamepad2, ArrowUpRight, 
  CheckCircle2, Terminal, Flame, Zap, ShieldAlert, Award
} from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';
import { allCourses } from '../data/allCoursesData';
import { triggerYoupiPayment } from '../utils/youpiPayment';

const categories = [
  { id: 'All', label: 'All Courses', icon: Rocket, accent: '#FFDE59' },
  { id: 'Emerging', label: '🔥 Emerging Tech', icon: Sparkles, accent: '#FF5722' },
  { id: 'DeepTech', label: 'Deep Tech & Robotics', icon: Cpu, accent: '#00F0FF' },
  { id: 'Gaming', label: 'Game Dev & Roblox', icon: Gamepad2, accent: '#FF007F' },
  { id: 'Finance', label: 'Quant & Finance', icon: Landmark, accent: '#10B981' },
  { id: 'HedgeFund', label: 'Hedge Funds & PE', icon: LineChart, accent: '#0047FF' },
  { id: 'Web4', label: 'Web 4.0 & Crypto', icon: Cpu, accent: '#8B5CF6' },
  { id: 'VC', label: 'Venture Capital', icon: Briefcase, accent: '#FFDE59' },
  { id: 'Marketing', label: 'Growth & MarTech', icon: Megaphone, accent: '#EC4899' },
  { id: 'Elite', label: 'Elite Programs', icon: ShieldCheck, accent: '#6366F1' },
  { id: 'AI', label: 'AI Specialization', icon: Brain, accent: '#A855F7' },
  { id: 'Backend', label: 'Backend', icon: Server, accent: '#14B8A6' },
  { id: 'Database', label: 'Database', icon: Database, accent: '#0EA5E9' },
  { id: 'Design', label: 'Design', icon: Palette, accent: '#F43F5E' },
];

const CourseIcon = ({ icon, fallback, title, className, isWatermark = false }) => {
  const [status, setStatus] = useState('loading');

  const primaryUrl = `https://cdn.simpleicons.org/${icon}/ffffff`;
  const fallbackUrl = fallback ? `https://cdn.simpleicons.org/${fallback}/ffffff` : null;

  if (status === 'error') {
    return isWatermark ? null : <Layers className={className} />;
  }

  return (
    <img 
      src={status === 'fallback' && fallbackUrl ? fallbackUrl : primaryUrl}
      alt={title}
      className={`${className} ${status === 'loading' ? 'opacity-0' : 'opacity-100'} transition-opacity`}
      onLoad={() => setStatus(status === 'loading' ? 'primary' : status)}
      onError={() => {
        if (status === 'loading' || status === 'primary') {
          if (fallbackUrl) {
            setStatus('fallback');
          } else {
            setStatus('error');
          }
        } else {
          setStatus('error');
        }
      }}
    />
  );
};

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && categories.some(c => c.id === cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setSearchParams(id === 'All' ? {} : { category: id });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      const matchCategory = 
        activeCategory === 'All' || 
        course.category === activeCategory ||
        (activeCategory === 'Emerging' && (course.category === 'Emerging' || course.isEmerging)) ||
        (activeCategory === 'DeepTech' && (course.category === 'DeepTech' || course.track === 'DeepTech')) ||
        (activeCategory === 'Gaming' && (course.category === 'Gaming' || course.track === 'Gaming')) ||
        (activeCategory === 'Finance' && (course.category === 'Finance' || course.category === 'HedgeFund' || course.track === 'Finance')) ||
        (activeCategory === 'HedgeFund' && (course.category === 'HedgeFund' || course.track === 'Finance' || course.track === 'PE')) ||
        (activeCategory === 'Web4' && (course.category === 'Web4' || course.track === 'Web4')) ||
        (activeCategory === 'VC' && (course.category === 'VC' || course.track === 'VC')) ||
        (activeCategory === 'Marketing' && (course.category === 'Marketing' || course.track === 'Marketing')) ||
        (activeCategory === 'AI' && (course.category === 'AI' || course.track === 'AI')) ||
        (activeCategory === 'Elite' && (course.category === 'Elite' || course.track === 'Elite')) ||
        (activeCategory === 'Backend' && (course.category === 'Backend' || course.track === 'Backend')) ||
        (activeCategory === 'Database' && (course.category === 'Database' || course.track === 'Database')) ||
        (activeCategory === 'Design' && (course.category === 'Design' || course.track === 'Design'));

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCategory;
      const matchSearch = 
        course.title.toLowerCase().includes(q) ||
        (course.subtitle && course.subtitle.toLowerCase().includes(q)) ||
        (course.tags && course.tags.some(tag => tag.toLowerCase().includes(q)));
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F0EDE6] text-black font-mono selection:bg-black selection:text-[#FFDE59] pb-32 relative">
      
      {/* ─── TECHNICAL GRID BACKGROUND PATTERN ─── */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />

      {/* ═══ 1. RAW BRUTALIST WARNING MARQUEE ═══ */}
      <div className="bg-black text-[#FFDE59] border-b-4 border-black py-2 px-4 overflow-hidden flex items-center text-xs font-bold font-mono uppercase tracking-widest select-none shadow-[0_4px_0px_#000] relative z-10">
        <div className="whitespace-nowrap animate-marquee flex items-center gap-8">
          <span>// HYPERS ACADEMY // PRODUCTION SPECIALIZATIONS // 100+ INDUSTRIAL TRACKS //</span>
          <span>// HARDWARE & NEUROMORPHIC // AGENT-OPS // QUANTITATIVE CAPITAL // ZERO SYNTHETIC TOY PROJECTS //</span>
          <span>// HYPERS ACADEMY // PRODUCTION SPECIALIZATIONS // 100+ INDUSTRIAL TRACKS //</span>
          <span>// LEVEL_01 ADMISSION // AUDITED BATCH 2026 // HIGH-VELOCITY ENGINEERING //</span>
        </div>
      </div>

      {/* ═══ 2. HERO SECTION — BRUTALIST COMMAND HEADER ═══ */}
      <section className="pt-10 sm:pt-14 pb-8 px-4 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Clearance Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
            <span className="px-3.5 py-1 bg-black text-[#FFDE59] font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000]">
              [ 01 // GLOBAL_CATALOG ]
            </span>
            <span className="px-3.5 py-1 bg-white text-black font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              2026 LIVE CURRICULA
            </span>
            <span className="px-3.5 py-1 bg-[#00F0FF] text-black font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000]">
              [ 100+ PRODUCTION TRACKS ]
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-black leading-[0.95] mb-6 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.15)]">
            MASTER THE ENTIRE <br />
            <span className="bg-black text-[#FFDE59] px-3 py-1 inline-block mt-2 border-3 border-black shadow-[5px_5px_0px_#000]">
              TECH & CAPITAL EVOLUTION
            </span>
          </h1>

          {/* Doctrine Mandate Box */}
          <div className="max-w-4xl mx-auto bg-[#FFDE59] border-4 border-black shadow-[6px_6px_0px_#000] p-5 sm:p-6 mb-10 text-left relative overflow-hidden">
            <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-black font-bold text-xs uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-600 fill-red-600" />
                [ THE 2026 PRODUCTION MANDATE ]
              </span>
              <span className="hidden sm:inline-block font-mono text-[11px] text-neutral-800">AUTH: UNRESTRICTED</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-black leading-relaxed">
              "Explore 100+ industry-grade programs. From Neuromorphic Computing & AgentOps to Production MLOps/LLMOps, Embedded PCB Systems, Spatial visionOS, and Quantitative Capital. Build real monopolies, not synthetic toy frameworks."
            </p>
          </div>

          {/* 4 Telemetry Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
            <div className="bg-white border-3 border-black shadow-[4px_4px_0px_#000] p-4 text-center">
              <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">[ SPECIALIZATIONS ]</div>
              <div className="text-2xl sm:text-3xl font-black text-black">100+</div>
              <div className="text-[10px] text-neutral-600 font-bold mt-1">Across 14 Sectors</div>
            </div>
            <div className="bg-white border-3 border-black shadow-[4px_4px_0px_#000] p-4 text-center">
              <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">[ MEDIAN APEX COMP ]</div>
              <div className="text-2xl sm:text-3xl font-black text-black">$180K+</div>
              <div className="text-[10px] text-emerald-700 font-bold mt-1">Top Tier Engineering</div>
            </div>
            <div className="bg-white border-3 border-black shadow-[4px_4px_0px_#000] p-4 text-center">
              <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">[ ACTIVE BUILDERS ]</div>
              <div className="text-2xl sm:text-3xl font-black text-black">42.5K+</div>
              <div className="text-[10px] text-neutral-600 font-bold mt-1">Global Batch Cohorts</div>
            </div>
            <div className="bg-white border-3 border-black shadow-[4px_4px_0px_#000] p-4 text-center">
              <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">[ PRODUCTION RATING ]</div>
              <div className="text-2xl sm:text-3xl font-black text-black flex items-center justify-center gap-1">
                <Star className="w-5 h-5 fill-black text-black" /> 4.92
              </div>
              <div className="text-[10px] text-neutral-600 font-bold mt-1">Verified Architect Reviews</div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ 3. SEARCH & FILTER COMMAND CONSOLE (BRUTALIST) ═══ */}
      <section className="px-4 sm:px-8 mb-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-5 sm:p-7">
            
            {/* Console Bar Top Label */}
            <div className="flex flex-wrap items-center justify-between pb-4 mb-5 border-b-3 border-black gap-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-black" />
                <span className="text-xs font-black uppercase tracking-wider text-black">
                  [ FILTER & SEARCH CONSOLE // QUERY PROTOCOL ]
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-black text-[#FFDE59] text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000]">
                  ACTIVE MATCHES: {filteredCourses.length}
                </span>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="flex items-center gap-1 px-2.5 py-1 bg-[#FF5722] text-white text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-red-700 transition-all cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>RESET</span>
                  </button>
                )}
              </div>
            </div>

            {/* Industrial Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={20} />
              <input 
                type="text"
                placeholder="> Search Neuromorphic, AgentOps, MLOps, LLMOps, Embedded PCB, visionOS, Quant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F5F3EF] border-3 border-black py-3.5 pl-12 pr-4 text-sm font-mono font-bold text-black placeholder:text-neutral-500 shadow-[4px_4px_0px_#000] focus:bg-white focus:outline-none transition-all"
              />
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 text-xs font-black uppercase tracking-wider border-2 sm:border-3 border-black transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-black text-[#FFDE59] shadow-[4px_4px_0px_#000] translate-x-[-1px] translate-y-[-1px]' 
                        : 'bg-white text-black shadow-[3px_3px_0px_#000] hover:bg-[#FFDE59] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'text-[#FFDE59]' : 'text-black'} />
                    <span>{cat.label || cat.id}</span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ═══ 4. BRUTALIST COURSE CARDS GRID ═══ */}
      <section className="px-4 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto min-h-[400px]">
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCourses.map((course, idx) => (
                <motion.div 
                  layout
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: idx * 0.015 }}
                  className="bg-white border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150 flex flex-col group relative overflow-hidden"
                >
                  
                  {/* Card Header Banner with Solid Brutalist Block */}
                  <div className={`h-40 bg-gradient-to-br ${course.color} border-b-4 border-black relative overflow-hidden flex flex-col justify-between p-5`}>
                    
                    {/* Reticle marks */}
                    <div className="absolute top-2 left-2 text-white/50 text-[10px] font-mono select-none">┌</div>
                    <div className="absolute top-2 right-2 text-white/50 text-[10px] font-mono select-none">┐</div>
                    
                    {/* Top Row: Track & Clearance Tag */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-black/85 text-white font-mono text-[10px] font-black uppercase tracking-wider border border-white/30">
                        [TRACK: {course.track || course.category.toUpperCase()}]
                      </span>
                      <span className="px-2 py-0.5 bg-black text-[#FFDE59] font-mono text-[9px] font-black uppercase tracking-widest border border-white/30">
                        LVL_01
                      </span>
                    </div>

                    {/* Watermark Icon */}
                    {course.icon && (
                      <CourseIcon 
                        icon={course.icon} 
                        fallback={course.fallbackIcon}
                        title="bg-watermark"
                        isWatermark={true}
                        className="absolute -right-3 -bottom-5 w-28 h-28 opacity-15 transform -rotate-12 pointer-events-none" 
                      />
                    )}

                    {/* Main Centered Icon in Hard Box */}
                    <div className="relative z-10 flex items-center gap-3">
                      {course.icon && (
                        <div className="w-12 h-12 bg-black border-2 border-black shadow-[3px_3px_0px_#000] p-2.5 flex items-center justify-center shrink-0">
                          <CourseIcon 
                            icon={course.icon} 
                            fallback={course.fallbackIcon}
                            title={course.title}
                            className="w-full h-full object-contain" 
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-black text-white uppercase leading-tight drop-shadow-[2px_2px_0px_#000] truncate">
                          {course.title}
                        </h3>
                        <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider truncate">
                          {course.seats ? `${course.seats} SEATS REMAINING` : 'APEX ADMISSION'}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Card Middle: Intel & Meta */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    
                    <div>
                      {/* Status Badges Row */}
                      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase tracking-wider border border-black">
                            {course.category === 'Emerging' ? '🔥 Emerging' : 
                             course.category === 'DeepTech' ? 'Deep Tech' :
                             course.category === 'Gaming' ? 'Game Dev' :
                             course.category === 'HedgeFund' ? 'Hedge Fund' :
                             course.category === 'Web4' ? 'Web 4.0' :
                             course.category === 'VC' ? 'Venture Cap' : course.category}
                          </span>
                          {course.badge && (
                            <span className="px-2 py-0.5 bg-[#FFDE59] text-black text-[9px] font-black uppercase border border-black shadow-[1px_1px_0px_#000] flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                              {course.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 px-2 py-0.5 bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black">
                          <Star size={12} className="text-black fill-black" />
                          <span>{course.rating}</span>
                        </div>
                      </div>

                      {/* Course Title & Subtitle */}
                      <h4 className="text-lg font-black uppercase tracking-tight text-black leading-snug group-hover:text-blue-700 transition-colors">
                        {course.title}
                      </h4>
                      {course.subtitle && (
                        <p className="text-xs text-neutral-600 font-sans font-medium mt-1 line-clamp-2 leading-relaxed">
                          {course.subtitle}
                        </p>
                      )}

                      {/* Tags */}
                      {course.tags && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {course.tags.slice(0, 3).map((tag, tIdx) => (
                            <span key={tIdx} className="text-[10px] font-mono font-bold px-2 py-0.5 bg-neutral-100 text-black border border-black shadow-[1px_1px_0px_#000]">
                              {tag}
                            </span>
                          ))}
                          {course.tags.length > 3 && (
                            <span className="text-[10px] font-mono font-bold text-neutral-500 self-center">
                              +{course.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Pricing & CTA */}
                    <div className="pt-4 mt-4 border-t-2 border-black">
                      
                      <div className="bg-[#F8F6F0] border-2 border-black p-3 mb-4 flex items-center justify-between shadow-[2px_2px_0px_#000]">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">TUITION PASS</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs text-neutral-400 line-through">₹5,299</span>
                            <span className="text-xl font-black text-black">₹2,799</span>
                          </div>
                        </div>
                        <div className="px-2 py-1 bg-[#CCFF00] text-black text-[10px] font-black uppercase border border-black shadow-[1px_1px_0px_#000]">
                          47% SCHOLARSHIP
                        </div>
                      </div>

                      {/* Action Buttons: Proceed via YOUPI PG + Syllabus */}
                      <div className="flex flex-col gap-2">
                        <button 
                          data-youpi-pay
                          data-order-id={`HYPERS-${(course.id || course.title).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16)}-${Date.now().toString().slice(-6)}`}
                          data-amount="2799.00"
                          data-currency="INR"
                          data-name="HYPERS ACADEMY"
                          data-description={`Tuition Pass: ${course.title}`}
                          onClick={() => triggerYoupiPayment(course, '2799.00')}
                          className="w-full py-3 bg-[#CCFF00] hover:bg-[#FFDE59] text-black font-black uppercase text-xs tracking-wider border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Zap size={14} className="fill-black stroke-black" />
                          <span>[ ⚡ PROCEED TO PAYMENT // YOUPI PG ]</span>
                        </button>

                        <Link 
                          to={`/course/${course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                          className="w-full py-2.5 bg-black text-white hover:bg-neutral-800 font-bold uppercase text-[11px] tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>[ VIEW CURRICULUM SYLLABUS ]</span>
                          <ArrowUpRight size={14} />
                        </Link>
                      </div>

                    </div>

                  </div>

                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State (Brutalist) */}
          {filteredCourses.length === 0 && (
            <div className="border-4 border-black bg-white shadow-[8px_8px_0px_#000] p-12 text-center max-w-xl mx-auto my-16">
              <div className="w-16 h-16 bg-[#FF5722] text-white border-3 border-black shadow-[4px_4px_0px_#000] mx-auto flex items-center justify-center mb-6 font-black text-2xl">
                !
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-black mb-2">
                [ NO MATCHING CURRICULA FOUND ]
              </h3>
              <p className="text-xs text-neutral-600 font-mono mb-6 leading-relaxed">
                ZERO COURSES FOUND MATCHING QUERY "{searchQuery}" IN CATEGORY "{activeCategory}".
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="px-6 py-3 bg-black text-[#FFDE59] font-black text-xs uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_#000] hover:bg-neutral-800 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                [ RESET ALL FILTERS ]
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ═══ 5. BOTTOM BRUTALIST COMMAND FOOTER ═══ */}
      <section className="px-4 sm:px-8 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto border-4 border-black bg-white shadow-[8px_8px_0px_#000] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-1">
              HYPERS ACADEMY COMMAND PROTOCOL
            </div>
            <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
              ACCELERATE FROM CODE TO VENTURE CAPITAL
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/pitch"
              className="px-5 py-3 bg-black text-[#FFDE59] text-xs font-black uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_#000] hover:bg-neutral-800 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              [ FOUNDER COCKPIT / PITCH ↗ ]
            </Link>
            <Link
              to="/executive/ceo"
              className="px-5 py-3 bg-white text-black text-xs font-black uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_#000] hover:bg-neutral-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              [ C-SUITE DOSSIERS ↗ ]
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-4 py-3 bg-[#FFDE59] text-black text-xs font-black uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_#000] hover:bg-yellow-300 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
            >
              [ ↑ TOP ]
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
