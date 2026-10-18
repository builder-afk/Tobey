import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hexagon, Download, Monitor, Zap, Brain, Users, FileCode2, Search, GitBranch, Bug, Plug, Settings, ArrowRight, Twitter, Github, MessageSquare, Check, Command, Sparkles, Terminal, XCircle, CheckCircle2, AlertTriangle, Rocket, Landmark, Building2, Link2, Smile, Flame, Box, Cloud, GraduationCap, Briefcase, Code2 } from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const textToType = 'hypers run interview-prep';

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < textToType.length) {
        setTypedText(prev => prev + textToType.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowOutput(true), 300);
      }
    }, 40); // Fast typing
    return () => clearInterval(typingInterval);
  }, []);

  // Performance-first animation configs
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.4, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-40px" },
    transition: { staggerChildren: 0.1 }
  };

  const itemFadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  };

  const fastSpring = { type: "spring", stiffness: 400, damping: 30 };

  const allFeatures = [
    'Language Fundamentals', 'AI Resume Editor', 'Aptitude Questions', 'Mass Recruitment Mode', 'Company Database', 
    'AI Study Planner', 'Interactive Quizzes', 'Computer Science Subjects', 'Handwritten Notes Library', '1000+ Projects', 
    '10,000+ Data Structure Problems', 'Low-Level Design (LLD) Questions', 'Quiz Dashboard & History', '25,000+ Interview Questions', 
    'Magic Companies Discovery', 'Cold DMs & Email Templates', 'Analytics Dashboard', '24/7 Chat Support'
  ];

  const techLogos = [
    { name: 'LangChain', icon: <Link2 size={24} className="text-green-700"/>, style: 'font-semibold text-gray-800 tracking-tight' },
    { name: 'Hugging Face', icon: <Smile size={24} className="text-yellow-500"/>, style: 'font-bold text-gray-800' },
    { name: 'python', icon: <Terminal size={24} className="text-blue-600"/>, style: 'font-normal text-gray-600' },
    { name: 'FastAPI', icon: <Zap size={24} className="text-teal-600"/>, style: 'font-bold text-gray-800 tracking-tighter' },
    { name: 'PyTorch', icon: <Flame size={24} className="text-orange-600"/>, style: 'font-medium text-gray-800' },
    { name: 'React', icon: <Hexagon size={24} className="text-cyan-500"/>, style: 'font-bold text-gray-800 tracking-tight' },
    { name: 'Node.js', icon: <Box size={24} className="text-green-600"/>, style: 'font-medium text-gray-800' },
    { name: 'AWS', icon: <Cloud size={24} className="text-orange-500"/>, style: 'font-bold text-gray-800' },
  ];

  return (
    <div className="min-h-screen bg-[#FCFCFD] text-gray-900 font-sans overflow-x-hidden selection:bg-purple-200 selection:text-purple-900">
      <style>{`
        .bg-grid {
          background-image: 
            linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
          background-size: 32px 32px;
          background-position: -1px -1px;
        }
        .blur-gradient {
          position: absolute;
          filter: blur(80px);
          opacity: 0.15;
          z-index: 0;
          border-radius: 50%;
          animation: slowSpin 20s linear infinite;
          will-change: transform;
        }
        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0; width: 100%; height: 2px;
          background: #7c3aed;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        .feature-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(124, 58, 237, 0.1);
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        .cursor { display: inline-block; width: 8px; height: 16px; background: #999; animation: blink 1s step-end infinite; vertical-align: middle; margin-left: 2px; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>

      {/* Subtle Background Elements */}
      <div className="fixed inset-0 bg-grid opacity-70 z-0 pointer-events-none" />
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-purple-400 blur-gradient" />
      <div className="absolute top-[20%] left-[-100px] w-[400px] h-[400px] bg-emerald-300 blur-gradient animation-delay-2000" />

      {/* Navbar */}
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
          
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="flex flex-col items-start text-left">
            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-gray-500 font-medium">prod server / running</span>
            </div>
            
            <h1 className="text-[52px] md:text-[68px] font-bold leading-[1.05] tracking-tight text-gray-900 mb-6">
              The Intelligent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-700 to-indigo-600">
                Practice Platform
              </span>
            </h1>
            
            <p className="text-[17px] text-gray-500 mb-10 max-w-lg leading-relaxed font-medium">
              Making software engineers more productive than ever before. Real-time coding, seamless IDE integration, and hyper-optimized career tools.
            </p>
            
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={fastSpring} className="w-full md:w-auto">
                <Link to="/auth" className="flex items-center justify-center gap-2 px-7 py-3.5 bg-gray-900 text-white rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.18)] transition-shadow font-medium w-full">
                  <Terminal size={18} /> Start Building
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={fastSpring} className="w-full md:w-auto">
                <Link to="/practice" className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-gray-200 text-gray-900 rounded-xl hover:bg-gray-50 transition-colors shadow-sm font-medium w-full">
                  <Monitor size={18} /> View Workspace
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* 3D Isometric Stack Graphic */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }} className="w-full flex justify-center lg:justify-end">
            <div className="relative w-[320px] h-[360px] md:w-[400px] md:h-[450px]" style={{ perspective: '1200px' }}>
              <div style={{ transform: 'rotateX(55deg) rotateZ(-45deg)', transformStyle: 'preserve-3d' }} className="relative w-full h-full pt-20 pl-20 transition-transform duration-700 hover:rotateX(50deg) hover:rotateZ(-40deg)">
                
                {/* Base Layer */}
                <motion.div animate={{ translateZ: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute w-[200px] h-[200px] md:w-[240px] md:h-[240px] bg-white border border-gray-200 rounded-3xl shadow-xl flex flex-col items-center justify-center" style={{ transform: 'translateZ(0px)' }}>
                  <div className="w-full h-full border-[10px] border-gray-50 rounded-3xl absolute inset-0 pointer-events-none" />
                  <DatabaseIcon />
                  <div className="absolute right-[-80px] text-xs font-mono text-gray-400 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-gray-300"></span> (DB) Cache
                  </div>
                </motion.div>

                {/* Middle Radiant Layer */}
                <motion.div animate={{ translateZ: [60, 75, 60] }} transition={{ duration: 4, delay: 0.2, repeat: Infinity, ease: "easeInOut" }} className="absolute w-[200px] h-[200px] md:w-[240px] md:h-[240px] bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] flex items-center justify-center border border-emerald-300" style={{ transform: 'translateZ(60px)' }}>
                  <Hexagon className="text-white drop-shadow-md" size={80} fill="currentColor" />
                  <div className="absolute left-[-100px] text-xs font-mono text-emerald-600 font-bold flex items-center gap-2">
                    algo server <span className="w-8 h-[1px] bg-emerald-400"></span>
                  </div>
                </motion.div>

                {/* Top Glass Layer */}
                <motion.div animate={{ translateZ: [120, 140, 120] }} transition={{ duration: 4, delay: 0.4, repeat: Infinity, ease: "easeInOut" }} className="absolute w-[200px] h-[200px] md:w-[240px] md:h-[240px] bg-white/70 backdrop-blur-md border border-white rounded-3xl shadow-2xl flex items-center justify-center" style={{ transform: 'translateZ(120px)' }}>
                  <Zap className="text-purple-600 drop-shadow-sm" size={60} fill="currentColor" />
                  <div className="absolute right-[-100px] text-xs font-mono text-purple-600 font-bold flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-purple-300"></span> client UI
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logos Marquee Section */}
      <section className="pb-16 pt-8 relative z-10 bg-[#FCFCFD]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }} 
            className="bg-white border border-gray-200 rounded-[20px] shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-100">
              <h3 className="text-[17px] font-semibold text-slate-700">Learn technologies like</h3>
            </div>
            
            <div className="relative flex overflow-hidden py-8 pointer-events-none" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
              <motion.div 
                className="flex gap-16 items-center whitespace-nowrap px-8"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, ease: "linear", repeat: Infinity }}
              >
                {[...techLogos, ...techLogos].map((tech, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 opacity-70 transition-all cursor-default w-max">
                    {tech.icon}
                    <span className={`text-xl ${tech.style}`}>{tech.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 relative z-10 bg-[#FCFCFD]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-[32px] md:text-[40px] font-bold tracking-tight text-gray-900 mb-6">Why traditional academic learning isn't enough for modern tech roles</h2>
          </motion.div>

          <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">
            {/* VS Badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex w-12 h-12 bg-gray-900 border-[4px] border-[#FCFCFD] rounded-full items-center justify-center text-white font-bold text-lg shadow-xl shadow-purple-900/10">
              VS
            </div>

            {/* Academic Curriculum Card */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, ease: "easeOut" }} 
              className="flex-1 bg-white border border-gray-200 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-400" />
              
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center border border-red-100">
                  <Landmark size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Academic Curriculum</h3>
                  <p className="text-sm font-medium text-gray-500">Current State of Learning</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <XCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-[15px]">Theory-Heavy Approach</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">Focus on textbook concepts with minimal hands-on coding practice or real-world application.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <XCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-[15px]">Outdated Technologies</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">Limited exposure to modern stacks like MERN, focusing instead on legacy systems or basic syntax.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <XCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-[15px]">Lack of Deployment Skills</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">Projects live on localhost; students miss crucial DevOps, cloud, and CI/CD experience.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 text-red-600 rounded-lg text-[13px] font-bold">
                <AlertTriangle size={16} /> High skill mismatch in interviews
              </div>
            </motion.div>

            {/* Industry Expectations Card */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }} 
              className="flex-1 bg-white border border-gray-200 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl shadow-emerald-900/5 group hover:shadow-2xl hover:shadow-emerald-900/10 transition-shadow">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
              
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center border border-emerald-100">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Industry Expectations</h3>
                  <p className="text-sm font-medium text-gray-500">What Companies Hire For</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-[15px]">Full Stack Proficiency</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">Ability to build end-to-end scalable applications using modern JS frameworks (React, Node.js).</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-[15px]">Production-Ready Code</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">Understanding of architecture, security, clean code practices, and database optimization.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-[15px]">Deployment & Cloud</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">Experience deploying to platforms like Vercel/AWS and managing live applications.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg text-[13px] font-bold">
                <Rocket size={16} /> Highly employable skillset
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 relative z-10 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-[32px] md:text-[44px] font-bold tracking-tight text-gray-900 mb-6">Designed for speed & precision.</h2>
            <p className="text-[17px] text-gray-500 font-medium">We eliminated the bloat and optimized the rendering engine. The result feels instantaneous, so you can focus purely on your logic.</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <motion.div variants={itemFadeUp} className="feature-card bg-[#FAFAFA] border border-gray-200 rounded-[20px] p-8 relative overflow-hidden group">
              <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-gray-900 mb-6 group-hover:text-purple-600 transition-colors">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-3">Sub-millisecond Latency</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">Compiled using modern Rust tooling, our execution context boots instantly. No spinners, no waiting, just code.</p>
            </motion.div>

            <motion.div variants={itemFadeUp} className="feature-card bg-[#FAFAFA] border border-gray-200 rounded-[20px] p-8 relative overflow-hidden group">
              <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-gray-900 mb-6 group-hover:text-emerald-500 transition-colors">
                <Brain size={24} />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-3">Context-Aware Intel</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">An intelligent agent that understands your entire file tree. It spots logic flaws before complexity blows up.</p>
            </motion.div>

            <motion.div variants={itemFadeUp} className="feature-card bg-[#FAFAFA] border border-gray-200 rounded-[20px] p-8 relative overflow-hidden group">
              <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-gray-900 mb-6 group-hover:text-amber-500 transition-colors">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-3">Real-time Collab</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">Native conflict-free replicated data types (CRDTs) allow seamless peer-to-peer collaboration and mock interviews.</p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Workspace Editor Mockup */}
      <section id="workspace" className="py-32 relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100 blur-[120px] rounded-full opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[32px] md:text-[44px] font-bold tracking-tight text-gray-900">A beautiful place to write logic.</h2>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }} 
            className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden flex flex-col">
            
            <div className="bg-gray-50 px-4 h-11 flex items-center border-b border-gray-200">
              <div className="flex gap-2 mr-6">
                <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/20" />
                <div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/20" />
              </div>
              <div className="flex h-full items-center">
                <div className="px-4 py-1.5 bg-white border border-gray-200 border-b-0 rounded-t-lg text-sm text-gray-700 font-medium flex items-center gap-2 translate-y-[1px]">
                  <FileCode2 size={14} className="text-purple-600" /> solution.ts
                </div>
              </div>
            </div>
            
            <div className="flex h-[450px]">
              <div className="w-12 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4 gap-6 text-gray-400">
                <FileCode2 size={20} className="text-gray-800 cursor-pointer" />
                <Search size={20} className="hover:text-gray-800 cursor-pointer transition-colors" />
                <GitBranch size={20} className="hover:text-gray-800 cursor-pointer transition-colors" />
                <Bug size={20} className="hover:text-gray-800 cursor-pointer transition-colors" />
                <Plug size={20} className="hover:text-gray-800 cursor-pointer transition-colors" />
                <div className="flex-1" />
                <Settings size={20} className="hover:text-gray-800 cursor-pointer transition-colors" />
              </div>
              
              <div className="flex-1 bg-white p-6 font-mono text-[14px] leading-relaxed overflow-x-auto">
                <div className="whitespace-pre">
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">1</span><span className="text-gray-400 italic">// Optimized Dynamic Programming</span>
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">2</span><span className="text-purple-600 font-medium">export function</span> <span className="text-blue-600">knapsack</span>(w: <span className="text-emerald-600">number</span>[], v: <span className="text-emerald-600">number</span>[], cap: <span className="text-emerald-600">number</span>) {'{'}
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">3</span>  <span className="text-purple-600 font-medium">const</span> memo = <span className="text-purple-600 font-medium">new</span> <span className="text-amber-600">Map</span>&lt;<span className="text-emerald-600">string</span>, <span className="text-emerald-600">number</span>&gt;();
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">4</span>  
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">5</span>  <span className="text-purple-600 font-medium">function</span> <span className="text-blue-600">solve</span>(idx: <span className="text-emerald-600">number</span>, rem: <span className="text-emerald-600">number</span>): <span className="text-emerald-600">number</span> {'{'}
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">6</span>    <span className="text-purple-600 font-medium">if</span> (idx &lt; <span className="text-amber-600">0</span> || rem === <span className="text-amber-600">0</span>) <span className="text-purple-600 font-medium">return</span> <span className="text-amber-600">0</span>;
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">7</span>    
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">8</span>    <span className="text-purple-600 font-medium">const</span> key = <span className="text-emerald-500">{"`${idx}-${rem}`"}</span>;
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">9</span>    <span className="text-purple-600 font-medium">if</span> (memo.<span className="text-blue-600">has</span>(key)) <span className="text-purple-600 font-medium">return</span> memo.<span className="text-blue-600">get</span>(key)!;
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">10</span>   
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">11</span>   <span className="text-purple-600 font-medium">let</span> exclude = <span className="text-blue-600">solve</span>(idx - <span className="text-amber-600">1</span>, rem);
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">12</span>   <span className="text-purple-600 font-medium">let</span> include = <span className="text-amber-600">0</span>;
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">13</span>   
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">14</span>   <span className="text-purple-600 font-medium">if</span> (w[idx] &lt;= rem) {'{'}
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">15</span>     include = v[idx] + <span className="text-blue-600">solve</span>(idx - <span className="text-amber-600">1</span>, rem - w[idx]);
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">16</span>   {'}'}
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">17</span>   
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">18</span>   <span className="text-purple-600 font-medium">const</span> res = <span className="text-gray-900">Math</span>.<span className="text-blue-600">max</span>(exclude, include);
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">19</span>   memo.<span className="text-blue-600">set</span>(key, res);
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">20</span>   <span className="text-purple-600 font-medium">return</span> res;
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">21</span>  {'}'}
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">22</span>  
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">23</span>  <span className="text-purple-600 font-medium">return</span> <span className="text-blue-600">solve</span>(w.length - <span className="text-amber-600">1</span>, cap);
<span className="text-gray-300 select-none inline-block w-8 text-right mr-4">24</span> {'}'}
                </div>
              </div>
              
              <div className="w-[300px] bg-gray-50 border-l border-gray-200 p-4 flex flex-col hidden md:flex">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Terminal</div>
                <div className="flex-1 bg-white border border-gray-200 rounded-lg p-3 font-mono text-[12px] text-gray-600 shadow-inner">
                  <div className="flex mb-2">
                    <span className="text-purple-600 mr-2">❯</span>
                    <span className="text-gray-900">{typedText}</span>
                    {!showOutput && <span className="cursor" />}
                  </div>
                  {showOutput && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                      <div className="text-gray-500 mb-1">building project... <span className="text-emerald-500">done</span></div>
                      <div className="text-gray-500 mb-1">running 42 tests...</div>
                      <div className="text-emerald-600 font-medium mt-2">✓ All tests passed (12ms)</div>
                      <div className="flex mt-3">
                        <span className="text-purple-600 mr-2">❯</span>
                        <span className="cursor" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-24 bg-white relative z-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="mb-16">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-purple-600" />
              <span className="text-sm font-bold text-purple-600 tracking-wider uppercase">Target Audience</span>
            </div>
            <h2 className="text-[32px] md:text-[40px] font-bold tracking-tight text-gray-900 mb-4">Who Should Join</h2>
            <p className="text-gray-500 text-[17px] font-medium max-w-2xl">Designed for ambitious learners ready to bridge the gap to industry.</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <motion.div variants={itemFadeUp} className="bg-[#FAFAFA] border border-gray-200 rounded-[24px] p-8 hover:shadow-lg hover:border-gray-300 transition-all flex flex-col group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 mb-8 text-blue-600 group-hover:scale-110 transition-transform">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Campus Engineer</h3>
              <p className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-4">B.Tech (CSE/IT) 2nd & 3rd Year</p>
              <p className="text-sm text-gray-500 leading-relaxed font-medium mb-8 flex-1">Seeking practical application beyond university theory. Wants to build real projects to showcase during campus placements.</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[12px] font-medium text-gray-600">Foundation</span>
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[12px] font-medium text-gray-600">Projects</span>
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[12px] font-medium text-gray-600">Placement</span>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={itemFadeUp} className="bg-[#FAFAFA] border border-gray-200 rounded-[24px] p-8 hover:shadow-lg hover:border-gray-300 transition-all flex flex-col group">
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center border border-teal-100 mb-8 text-teal-600 group-hover:scale-110 transition-transform">
                <Code2 size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Industry Aspirant</h3>
              <p className="text-xs font-bold text-teal-600 tracking-wider uppercase mb-4">BCA Students</p>
              <p className="text-sm text-gray-500 leading-relaxed font-medium mb-8 flex-1">Looking for an industry edge to compete with engineering graduates. Focused on mastering modern tools and frameworks.</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[12px] font-medium text-gray-600">Skills</span>
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[12px] font-medium text-gray-600">Portfolio</span>
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[12px] font-medium text-gray-600">Modern Stack</span>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={itemFadeUp} className="bg-[#FAFAFA] border border-gray-200 rounded-[24px] p-8 hover:shadow-lg hover:border-gray-300 transition-all flex flex-col group">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center border border-purple-100 mb-8 text-purple-600 group-hover:scale-110 transition-transform">
                <Briefcase size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Product Targeted</h3>
              <p className="text-xs font-bold text-purple-600 tracking-wider uppercase mb-4">MCA Students</p>
              <p className="text-sm text-gray-500 leading-relaxed font-medium mb-8 flex-1">Aiming specifically for high-growth product companies. Needs advanced backend knowledge and system design basics.</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[12px] font-medium text-gray-600">Architecture</span>
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[12px] font-medium text-gray-600">Scalability</span>
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[12px] font-medium text-gray-600">Product</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-white relative z-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[32px] md:text-[44px] font-bold tracking-tight text-gray-900 mb-4">Simple, transparent pricing.</h2>
            <p className="text-gray-500 text-[17px] font-medium">Choose the plan that fits your career velocity.</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Lite Plan */}
            <motion.div variants={itemFadeUp} className="feature-card bg-[#FAFAFA] border border-gray-200 rounded-3xl p-8 flex flex-col items-start text-left relative">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Lite</h3>
              <p className="text-gray-500 mb-6 text-sm font-medium">Perfect for beginners starting their journey.</p>
              <div className="mb-6">
                <span className="text-5xl font-bold tracking-tight text-gray-900">₹499</span>
                <span className="text-gray-400 ml-1 font-medium">/ mo</span>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 px-4 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-900 rounded-xl font-semibold transition-colors mb-8 shadow-sm">
                Get Started
              </motion.button>
              <div className="space-y-3 flex-1 w-full">
                {allFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-gray-600 text-[13px] font-medium border-b border-gray-100 pb-2 last:border-0">
                    <Check size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Professional Plan (Highlighted) */}
            <motion.div variants={itemFadeUp} className="bg-white border-2 border-purple-600 rounded-3xl p-8 flex flex-col items-start text-left relative transform md:-translate-y-4 shadow-[0_20px_40px_rgba(124,58,237,0.1)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-purple-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md whitespace-nowrap">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
              <p className="text-gray-500 mb-6 text-sm font-medium">Ideal for job seekers to accelerate their career.</p>
              <div className="mb-6">
                <span className="text-5xl font-bold tracking-tight text-purple-600">₹799</span>
                <span className="text-gray-400 ml-1 font-medium">/ lifetime</span>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors mb-8 shadow-[0_8px_16px_rgba(124,58,237,0.2)]">
                Upgrade Now
              </motion.button>
              <div className="space-y-3 flex-1 w-full">
                {allFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-gray-700 text-[13px] font-medium border-b border-gray-100 pb-2 last:border-0">
                    <Check size={16} className="text-purple-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Teams Plan */}
            <motion.div variants={itemFadeUp} className="feature-card bg-[#FAFAFA] border border-gray-200 rounded-3xl p-8 flex flex-col items-start text-left relative">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Teams</h3>
              <p className="text-gray-500 mb-6 text-sm font-medium">Collaboration features for up to 4 people.</p>
              <div className="mb-6">
                <span className="text-5xl font-bold tracking-tight text-gray-900">₹2499</span>
                <span className="text-gray-400 ml-1 font-medium">/ lifetime</span>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 px-4 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-900 rounded-xl font-semibold transition-colors mb-8 shadow-sm">
                Get Team Access
              </motion.button>
              <div className="space-y-3 flex-1 w-full">
                <div className="flex items-start gap-3 text-emerald-600 text-[13px] font-bold border-b border-gray-100 pb-2">
                  <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Get 1 Extra Seat</span>
                </div>
                {allFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-gray-600 text-[13px] font-medium border-b border-gray-100 pb-2 last:border-0">
                    <Check size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
          </motion.div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-gray-200 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900 mb-4">
                <Hexagon className="text-gray-900" size={24} /> ALGO<span className="opacity-40">LEARN</span>
              </Link>
              <p className="text-[15px] font-medium text-gray-500 max-w-xs leading-relaxed">
                The modern career and coding platform. Engineered for speed, designed for scale.
              </p>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-gray-900 font-bold mb-6 text-[15px]">Product</h4>
              <ul className="space-y-4">
                <li><Link to="/practice" className="text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">Workspace</Link></li>
                <li><Link to="/companies" className="text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">Companies</Link></li>
                <li><Link to="/planner" className="text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">Study Planner</Link></li>
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-gray-900 font-bold mb-6 text-[15px]">Resources</h4>
              <ul className="space-y-4">
                <li><Link to="/cs-subjects" className="text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">Core CS</Link></li>
                <li><Link to="/lld" className="text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">System Design</Link></li>
                <li><Link to="/projects" className="text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">Projects</Link></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-gray-900 font-bold mb-6 text-[15px]">Connect</h4>
              <div className="flex gap-4">
                <motion.a whileHover={{ y: -2 }} href="#" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                  <Twitter size={16} />
                </motion.a>
                <motion.a whileHover={{ y: -2 }} href="#" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                  <Github size={16} />
                </motion.a>
                <motion.a whileHover={{ y: -2 }} href="#" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                  <MessageSquare size={16} />
                </motion.a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] font-medium text-gray-400">
            <p>&copy; 2026 hypers Platform.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const DatabaseIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);