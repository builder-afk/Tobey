import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles, Users, Brain, Video, Trophy, Rocket, Target,
  ArrowRight, Layers, Lightbulb, UserPlus, LayoutGrid,
  MessageSquare, Kanban, Presentation, Star, Flame,
  ChevronRight, Zap, Globe, Shield, BarChart3, Medal, Swords
} from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { staggerChildren: 0.12 }
};

const itemFadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" }
};

const fastSpring = { type: "spring", stiffness: 400, damping: 30 };

const openRoles = [
  { role: "Frontend Engineer", skills: ["React", "Tailwind"], color: "blue" },
  { role: "Backend Developer", skills: ["Node.js", "PostgreSQL"], color: "emerald" },
  { role: "UI/UX Designer", skills: ["Figma", "Prototyping"], color: "pink" },
  { role: "Marketing Lead", skills: ["Growth", "Analytics"], color: "amber" },
  { role: "AI/ML Engineer", skills: ["Python", "LangChain"], color: "purple" },
  { role: "Product Manager", skills: ["Strategy", "Agile"], color: "teal" },
];

const competitionFeatures = [
  { subtitle: "Core Engine", title: "Monthly Hackathons", desc: "Teams compete over a set period to reach specific milestones, such as completing a working prototype, creating an initial marketing strategy, or landing their first test users.", icon: Trophy },
  { subtitle: "Execution", title: "Task-Driven Milestones", desc: "The platform sets operational targets or challenges that teams must complete to prove they are actively executing their concepts.", icon: Target },
  { subtitle: "Gamification", title: "The Leaderboard", desc: "A gamified grading system tracks team activity, progress, and challenge submissions, ranking the most productive teams publicly.", icon: BarChart3 },
];

const COLLAGE_IMAGES = [
  { src: '/images/pitch_handshake.png', label: 'The Deal' },
  { src: '/images/pitch_funding.png', label: 'Capital' },
  { src: '/images/collage_growth.png', label: 'Scale' },
  { src: '/images/collage_team.png', label: 'Synergy' },
];

function FloatingImage({ src, label, className, delay = 0, parallaxFactor = 1, mouseX, mouseY }) {
  const x = useTransform(mouseX, (v) => v * parallaxFactor * 0.02);
  const y = useTransform(mouseY, (v) => v * parallaxFactor * 0.02);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ x: springX, y: springY }}
      className={`absolute pointer-events-auto group hidden md:block ${className}`}
    >
      <motion.div
        whileHover={{ scale: 1.08, rotate: 2, zIndex: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/40 cursor-pointer"
      >
        <img src={src} alt={label} className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-5">
          <span className="text-white font-black text-sm md:text-lg tracking-wide uppercase">{label}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Pitch() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen text-gray-900 font-geist overflow-x-hidden selection:bg-orange-200 selection:text-orange-900">
      <video
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        style={{ objectFit: 'cover', objectPosition: '70% center' }}
        autoPlay
        loop
        muted
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
      />

      {/* ═══════════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 overflow-hidden min-h-[90vh] flex flex-col justify-center">

        {/* Asymmetric Bauhaus Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Grids */}
          <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

          {/* Orange geometric shapes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute top-[10%] left-[2%] w-[250px] h-[250px] bg-[#E85D04] rounded-full opacity-80 mix-blend-multiply"
          />
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute top-[25%] right-[5%] w-[150px] h-[500px] bg-[#DC2F02] opacity-80 mix-blend-multiply"
            style={{ transform: 'rotate(15deg)' }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute bottom-[5%] left-[20%] w-0 h-0 mix-blend-multiply"
            style={{ borderLeft: '150px solid transparent', borderRight: '150px solid transparent', borderBottom: '250px solid #F48C06' }}
          />

          {/* Black geometric accents */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-[45%] right-[25%] w-[60px] h-[60px] bg-black rounded-full"
          />

          <svg className="absolute bottom-[20%] right-[10%] w-[120px] h-[120px] opacity-40 rotate-12" viewBox="0 0 100 100">
            {[0, 15, 30, 45, 60, 75, 90].map(i => (
              <line key={i} x1="0" y1={i} x2="100" y2={i} stroke="black" strokeWidth="4" />
            ))}
          </svg>
        </div>

        {/* Floating Collage Images */}
        <div className="absolute inset-0 z-[1]">
          <FloatingImage
            src={COLLAGE_IMAGES[0].src}
            label={COLLAGE_IMAGES[0].label}
            className="top-[10%] left-[4%] w-[200px] md:w-[260px] lg:w-[320px]"
            delay={0.2}
            parallaxFactor={-1.5}
            mouseX={mouseX}
            mouseY={mouseY}
          />
          <FloatingImage
            src={COLLAGE_IMAGES[1].src}
            label={COLLAGE_IMAGES[1].label}
            className="top-[5%] right-[4%] w-[180px] md:w-[240px] lg:w-[280px]"
            delay={0.4}
            parallaxFactor={1.2}
            mouseX={mouseX}
            mouseY={mouseY}
          />
          <FloatingImage
            src={COLLAGE_IMAGES[2].src}
            label={COLLAGE_IMAGES[2].label}
            className="bottom-[10%] left-[8%] w-[190px] md:w-[250px] lg:w-[300px]"
            delay={0.6}
            parallaxFactor={0.8}
            mouseX={mouseX}
            mouseY={mouseY}
          />
          <FloatingImage
            src={COLLAGE_IMAGES[3].src}
            label={COLLAGE_IMAGES[3].label}
            className="bottom-[5%] right-[6%] w-[210px] md:w-[270px] lg:w-[340px]"
            delay={0.8}
            parallaxFactor={-1.1}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center max-w-3xl mx-auto bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white/50">

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 border border-orange-200 rounded-full mb-8 shadow-sm">
              <Flame size={16} className="text-orange-600" />
              <span className="text-xs font-bold text-orange-800 tracking-widest uppercase">Now in Beta</span>
            </div>

            <h1 className="text-[44px] md:text-[68px] font-black leading-[1.05] tracking-tight mb-8 text-gray-900">
              Find Your Co-Founder.<br />
              <span className="text-[#E85D04]">
                Build Something Real.
              </span>
            </h1>

            <p className="text-[18px] md:text-[22px] text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Pitch is the social collaboration platform where entrepreneurs, students, and creators form micro-teams and launch startup ideas — from zero to demo day.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={fastSpring}>
                <Link to="/build-profile" className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-10 py-5 bg-[#DC2F02] text-white rounded-2xl shadow-[0_12px_30px_rgba(220,47,2,0.3)] hover:shadow-[0_20px_40px_rgba(220,47,2,0.4)] transition-all font-bold text-lg">
                  <Rocket size={20} /> Launch Your Idea
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={fastSpring}>
                <Link to="/explore" className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-10 py-5 bg-white border-2 border-gray-200 text-gray-800 rounded-2xl hover:bg-gray-50 transition-all shadow-lg font-bold text-lg">
                  <Sparkles size={20} className="text-[#E85D04]" /> Explore Startups
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={fastSpring}>
                <Link to="/founder-workspace" className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-10 py-5 bg-black text-white rounded-2xl hover:bg-gray-900 transition-all shadow-lg font-bold text-lg">
                  <LayoutGrid size={20} /> Founder's Workspace
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mt-16"
          >
            {[
              { label: "Teams Formed", value: "2,400+", icon: Users },
              { label: "Ideas Launched", value: "800+", icon: Lightbulb },
              { label: "Countries", value: "45+", icon: Globe },
              { label: "Monthly Active", value: "12K+", icon: Zap },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-lg">
                <div className="w-10 h-10 bg-[#E85D04]/10 rounded-full flex items-center justify-center">
                  <stat.icon size={20} className="text-[#E85D04]" />
                </div>
                <div>
                  <div className="text-[20px] font-black text-gray-900">{stat.value}</div>
                  <div className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* CORE FEATURES — 4 Pillars */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-32 relative overflow-hidden z-10">
        <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] bg-[#F48C06] rounded-full blur-[200px] opacity-[0.15] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-24 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full mb-6">
              <Layers size={16} className="text-gray-600" />
              <span className="text-sm font-bold text-gray-700 tracking-widest uppercase">How It Works</span>
            </div>
            <h2 className="text-[36px] md:text-[52px] font-black tracking-tight text-gray-900 mb-6 leading-tight">
              From Idea to Team <br />
              <span className="text-[#E85D04]">in Under 48 Hours</span>
            </h2>
            <p className="text-[18px] text-gray-500 font-medium leading-relaxed">
              Four powerful systems working together to turn your raw concept into a functioning micro-startup with real teammates.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Feature 1: Public Project Cards */}
            <motion.div variants={itemFadeUp} className="bg-white/40 backdrop-blur-md border border-white/50 rounded-[32px] p-10 md:p-12 relative group hover:shadow-2xl hover:border-white/80 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E85D04]/10 blur-3xl rounded-full group-hover:bg-[#E85D04]/20 transition-colors" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white text-[#E85D04] rounded-2xl flex items-center justify-center border border-gray-200 shadow-sm mb-8 group-hover:scale-110 transition-transform">
                  <LayoutGrid size={28} />
                </div>
                <div className="text-[12px] font-black text-[#E85D04] uppercase tracking-[0.2em] mb-3">Step 01</div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Public Project Cards</h3>
                <p className="text-[16px] text-gray-600 leading-relaxed font-medium mb-8">
                  Founders list their idea with a vision statement, the roles already filled, and positions currently open. Every card is a live, interactive pitch deck visible to the entire community.
                </p>

                {/* Mini project card preview */}
                <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-md transform group-hover:-rotate-2 transition-transform">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h4 className="text-lg font-black text-gray-900">ClimateLens AI</h4>
                      <p className="text-sm text-gray-500 font-medium">Carbon footprint tracker for SMBs</p>
                    </div>
                    <span className="px-3 py-1.5 bg-[#E85D04]/10 border border-[#E85D04]/20 text-[#E85D04] text-[11px] font-black rounded-lg uppercase tracking-wider">Active</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-[12px] font-bold rounded-lg">React</span>
                    <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-[12px] font-bold rounded-lg">Python</span>
                    <span className="px-3 py-1.5 bg-gray-900 text-white text-[12px] font-bold rounded-lg">2 roles open</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 2: AI Matchmaking */}
            <motion.div variants={itemFadeUp} className="bg-white/40 backdrop-blur-md border border-white/50 rounded-[32px] p-10 md:p-12 relative group hover:shadow-2xl hover:border-white/80 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full group-hover:bg-purple-500/20 transition-colors" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white text-purple-600 rounded-2xl flex items-center justify-center border border-gray-200 shadow-sm mb-8 group-hover:scale-110 transition-transform">
                  <Brain size={28} />
                </div>
                <div className="text-[12px] font-black text-purple-600 uppercase tracking-[0.2em] mb-3">Step 02</div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">AI Matchmaking</h3>
                <p className="text-[16px] text-gray-600 leading-relaxed font-medium mb-8">
                  Our intelligent matching engine scans every profile — skills, availability, interests, and past work — to surface the perfect collaborators for each open role. No more cold outreach.
                </p>

                {/* Match preview */}
                <div className="space-y-3 transform group-hover:rotate-1 transition-transform">
                  {[
                    { name: "Arjun M.", match: "96%", skill: "Full-Stack", color: "emerald" },
                    { name: "Priya K.", match: "91%", skill: "ML Engineer", color: "purple" },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center justify-between bg-white border border-gray-200 rounded-[16px] px-5 py-4 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full bg-${m.color}-100 border border-${m.color}-200 flex items-center justify-center text-${m.color}-600 text-sm font-bold`}>
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-base font-bold text-gray-900">{m.name}</div>
                          <div className="text-[12px] text-gray-500 font-medium">{m.skill}</div>
                        </div>
                      </div>
                      <span className={`text-base font-black text-${m.color}-600`}>{m.match} Match</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Feature 3: Instant Collaboration Rooms */}
            <motion.div variants={itemFadeUp} className="bg-white/40 backdrop-blur-md border border-white/50 rounded-[32px] p-10 md:p-12 relative group hover:shadow-2xl hover:border-white/80 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-colors" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white text-blue-600 rounded-2xl flex items-center justify-center border border-gray-200 shadow-sm mb-8 group-hover:scale-110 transition-transform">
                  <Video size={28} />
                </div>
                <div className="text-[12px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">Step 03</div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Instant Collab Rooms</h3>
                <p className="text-[16px] text-gray-600 leading-relaxed font-medium mb-8">
                  Once matched, your team gets a private dashboard featuring integrated video calls, shared whiteboards, and a task tracker — everything needed to kickstart development instantly.
                </p>

                {/* Dashboard mockup */}
                <div className="bg-white border border-gray-200 rounded-[20px] overflow-hidden shadow-md transform group-hover:-rotate-1 transition-transform">
                  <div className="bg-gray-100 px-5 py-3 border-b border-gray-200 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="p-5 flex gap-3">
                    <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                      <Video size={20} className="text-blue-500 mx-auto mb-2" />
                      <div className="text-[11px] font-bold text-blue-600">Call</div>
                    </div>
                    <div className="flex-1 bg-purple-50 border border-purple-100 rounded-xl p-4 text-center">
                      <Presentation size={20} className="text-purple-500 mx-auto mb-2" />
                      <div className="text-[11px] font-bold text-purple-600">Board</div>
                    </div>
                    <div className="flex-1 bg-orange-50 border border-orange-100 rounded-xl p-4 text-center">
                      <Kanban size={20} className="text-orange-500 mx-auto mb-2" />
                      <div className="text-[11px] font-bold text-orange-600">Tasks</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 4: Monthly Competitions */}
            <motion.div variants={itemFadeUp} className="bg-white/40 backdrop-blur-md border border-white/50 rounded-[32px] p-10 md:p-12 relative group hover:shadow-2xl hover:border-white/80 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full group-hover:bg-amber-500/20 transition-colors" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white text-amber-600 rounded-2xl flex items-center justify-center border border-gray-200 shadow-sm mb-8 group-hover:scale-110 transition-transform">
                  <Trophy size={28} />
                </div>
                <div className="text-[12px] font-black text-amber-600 uppercase tracking-[0.2em] mb-3">Step 04</div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Monthly Competitions</h3>
                <p className="text-[16px] text-gray-600 leading-relaxed font-medium mb-8">
                  Teams complete weekly operational assignments to rank on a live leaderboard and compete for exposure, prizes, and mentorship from industry leaders.
                </p>

                {/* Leaderboard preview */}
                <div className="space-y-3 transform group-hover:rotate-2 transition-transform">
                  {[
                    { rank: 1, name: "Team NexusAI", pts: "2,840", medal: "🥇" },
                    { rank: 2, name: "CloudForge", pts: "2,610", medal: "🥈" },
                  ].map((t) => (
                    <div key={t.rank} className={`flex items-center justify-between bg-white border border-gray-200 rounded-[16px] px-5 py-4 shadow-sm ${t.rank === 1 ? 'ring-2 ring-amber-400' : ''}`}>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{t.medal}</span>
                        <span className="text-base font-black text-gray-900">{t.name}</span>
                      </div>
                      <span className="text-sm font-black text-amber-600">{t.pts} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* CTA */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden z-10 border-t border-white/20">
        {/* Asymmetric elements in CTA */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg className="absolute top-0 right-0 w-[400px] h-[400px] opacity-10" viewBox="0 0 100 100">
            <polygon points="100,0 100,100 0,0" fill="white" />
          </svg>
          <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] border-[40px] border-black/20 rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeUp} className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-[40px] p-12 shadow-2xl">
            <h2 className="text-[36px] md:text-[56px] font-black tracking-tight text-gray-900 mb-6 leading-tight">
              Stop Dreaming Solo. <br />
              Start Building Together.
            </h2>
            <p className="text-[18px] md:text-[20px] text-gray-700 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Your next co-founder is already on Pitch. Post your idea, get matched with the perfect team, and launch in weeks — not months.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={fastSpring}>
                <Link to="/auth" className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-10 py-5 bg-black text-white rounded-2xl shadow-2xl font-bold text-lg">
                  <Rocket size={20} /> Get Started Free
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={fastSpring}>
                <Link to="/explore" className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-2xl hover:bg-white/20 transition-all shadow-xl font-bold text-lg">
                  Explore Startups <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/30 backdrop-blur-xl py-12 relative z-10 border-t border-white/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-900 font-black text-xl tracking-tight">
            <Rocket size={24} className="text-[#E85D04]" />
            PITCH <span className="text-gray-600 font-medium text-base ml-2">by hypers</span>
          </div>
          <p className="text-sm text-gray-600 font-medium">© {new Date().getFullYear()} hypers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
