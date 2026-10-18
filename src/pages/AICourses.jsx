import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Star, BarChart, Users, ArrowRight, Zap, Trophy, Terminal, Sparkles } from 'lucide-react';
import { triggerYoupiPayment } from '../utils/youpiPayment';

const courses = [
  // 2026 Tech Evolution Frontier
  { title: "Loop Engineering", icon: "anthropic", fallbackIcon: "python", color: "bg-[#FFDE59]", interested: "160k+", rating: "4.9", seats: 6, tag: "AGENTIC REASONING" },
  { title: "Production RAG", icon: "langchain", fallbackIcon: "python", color: "bg-[#00F0FF]", interested: "220k+", rating: "4.9", seats: 4, tag: "HYBRID VECTOR RETRIEVAL" },
  { title: "Forward Deployed Engineer", icon: "palantir", fallbackIcon: "databricks", color: "bg-[#CCFF00]", interested: "140k+", rating: "4.9", seats: 3, tag: "ENTERPRISE DEPLOY" },
  { title: "Graph Engineering", icon: "neo4j", fallbackIcon: "graphql", color: "bg-[#FF52D9]", interested: "115k+", rating: "4.8", seats: 7, tag: "KNOWLEDGE GRAPHS" },
  { title: "AI Quality & Evals Engineering", icon: "huggingface", fallbackIcon: "python", color: "bg-[#FF8811]", interested: "95k+", rating: "4.9", seats: 10, tag: "RAGAS & BENCHMARKS" },
  { title: "Compound AI & Multi-Agent Swarms", icon: "meta", fallbackIcon: "anthropic", color: "bg-[#00F0FF]", interested: "190k+", rating: "4.9", seats: 5, tag: "AGENT SWARMS" },
  { title: "LLMOps & AI Gateway Infrastructure", icon: "opentelemetry", fallbackIcon: "docker", color: "bg-[#CCFF00]", interested: "135k+", rating: "4.8", seats: 8, tag: "GATEWAYS & CACHING" },
  { title: "Synthetic Data & Post-Training Alignment", icon: "pytorch", fallbackIcon: "python", color: "bg-[#FF52D9]", interested: "105k+", rating: "4.8", seats: 9, tag: "DPO, RLHF & SLM" },
  { title: "Physical AI & Spatial Intelligence", icon: "nvidia", fallbackIcon: "python", color: "bg-[#FFDE59]", interested: "88k+", rating: "4.9", seats: 4, tag: "SPATIAL INTELLIGENCE" },
  { title: "AI Security & Adversarial Red Teaming", icon: "kalilinux", fallbackIcon: "linux", color: "bg-[#FF0033]", interested: "115k+", rating: "4.9", seats: 6, tag: "JAILBREAK DEFENSE" },

  // Specialized AI Tracks
  { title: "Context Engineering", icon: "huggingface", color: "bg-[#FFDE59]", interested: "120k+", rating: "4.9", seats: 15, tag: "LONG CONTEXT LLMS" },
  { title: "Build a Support Agent with Vercel AI SDK", icon: "vercel", color: "bg-[#00F0FF]", interested: "210k+", rating: "4.8", seats: 8, tag: "VERCEL AI SDK" },
  { title: "Build Serverless AI Agents with Langbase", icon: "cloudflare", color: "bg-[#CCFF00]", interested: "85k+", rating: "4.8", seats: 12, tag: "SERVERLESS AI" },
  { title: "Intro to Model Context Protocol (MCP)", icon: "anthropic", fallbackIcon: "python", color: "bg-[#FF52D9]", interested: "50k+", rating: "4.9", seats: 20, tag: "MCP SPECIFICATION" },
  { title: "Intro to Dall-E and GPT Vision", icon: "openai", fallbackIcon: "google", color: "bg-[#FFDE59]", interested: "300k+", rating: "4.9", seats: 5, tag: "MULTI-MODAL VISION" },
  { title: "Intro to Mistral AI", icon: "mistral", fallbackIcon: "linux", color: "bg-[#FF8811]", interested: "90k+", rating: "4.7", seats: 14, tag: "MISTRAL RUNTIMES" },
  { title: "Learn AI Agents", icon: "huggingface", color: "bg-[#00F0FF]", interested: "250k+", rating: "4.9", seats: 10, tag: "AUTONOMOUS LOOPS" },
  { title: "Learn RAG", icon: "langchain", fallbackIcon: "python", color: "bg-[#CCFF00]", interested: "180k+", rating: "4.8", seats: 6, tag: "VECTOR RETRIEVAL" },
  { title: "Intro to AI Engineering", icon: "databricks", fallbackIcon: "kaggle", color: "bg-[#FF52D9]", interested: "140k+", rating: "4.8", seats: 18, tag: "AI INFRASTRUCTURE" },
  { title: "Prompt Engineering", icon: "kaggle", color: "bg-[#FFDE59]", interested: "400k+", rating: "4.9", seats: 4, tag: "IN-CONTEXT SYNTHESIS" }
];

export default function AICourses() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F0EDE6] text-black font-mono selection:bg-black selection:text-[#FFDE59] select-none pb-24">
      
      {/* ═══ 3. HERO BANNER ═══ */}
      <section className="p-4 sm:p-8 max-w-7xl mx-auto">
        <div className="bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_#000] mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] border-2 border-black shadow-[2px_2px_0px_#000] text-black font-black text-xs uppercase tracking-wider mb-4">
            <Sparkles size={14} className="stroke-[3]" />
            <span>[ FRONTIER ARTIFICIAL INTELLIGENCE // 2026 SPECIFICATION ]</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase leading-[1.05] mb-4">
            MASTER THE <span className="bg-[#CCFF00] px-2 border-3 border-black shadow-[4px_4px_0px_#000]">FUTURE OF AI</span>
          </h1>

          <p className="text-xs sm:text-sm font-bold text-gray-700 uppercase leading-relaxed max-w-3xl mb-6">
            // FROM AUTONOMOUS MULTI-AGENT SWARMS AND LOW-LATENCY PRODUCTION RAG TO DIRECT PREFERENCE OPTIMIZATION (DPO) AND HARDWARE SPATIAL INTELLIGENCE. REAL CODE UNDER TIME CONSTRAINTS.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t-2 border-black text-xs font-black uppercase text-gray-800">
            <span className="px-2.5 py-1 bg-[#FAF8F5] border border-black">20 FRONTIER TRACKS</span>
            <span className="px-2.5 py-1 bg-[#00F0FF] border border-black text-black">SUB-100MS RETRIEVAL</span>
            <span className="px-2.5 py-1 bg-[#CCFF00] border border-black text-black">AGENTIC TOOL CALLING</span>
          </div>
        </div>

        {/* ═══ 4. COURSE CARDS GRID ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, idx) => {
            const courseSlug = course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return (
              <div 
                key={idx}
                className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-black">
                    <span className="px-2 py-0.5 bg-black text-[#FFDE59] border border-black text-[10px] font-black uppercase">
                      {course.tag || 'AI TRACK'}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-black">
                      <Star size={12} className="fill-black text-black" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 ${course.color} border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000] shrink-0`}>
                      <Terminal size={22} className="text-black stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg uppercase text-black leading-tight">
                        {course.title}
                      </h3>
                      <span className="text-[10px] font-bold text-gray-600 uppercase">
                        {course.interested} ENROLLED
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] border-2 border-black mb-6 text-[11px] font-bold text-gray-700 uppercase space-y-1">
                    <div className="flex items-center justify-between">
                      <span>LEVEL:</span>
                      <span className="text-black font-black">INTERMEDIATE ➔ ADVANCED</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>COHORT SEATS:</span>
                      <span className="text-[#FF0033] font-black">{course.seats} SEATS LEFT</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-black flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-gray-500 block">LIFETIME ACCESS</span>
                    <span className="text-lg font-black text-black">₹2,799</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      data-youpi-pay
                      data-order-id={`HYPERS-${courseSlug.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16)}-${Date.now().toString().slice(-6)}`}
                      data-amount="2799.00"
                      data-currency="INR"
                      data-name="HYPERS ACADEMY"
                      data-description={`AI Path: ${course.title}`}
                      onClick={() => triggerYoupiPayment(course, '2799.00')}
                      className="px-3.5 py-2.5 bg-[#CCFF00] hover:bg-[#FFDE59] text-black font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Zap size={14} className="fill-black stroke-black" />
                      <span>[ ⚡ PROCEED ]</span>
                    </button>

                    <Link 
                      to={`/course/${courseSlug}`} 
                      className="px-3 py-2.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1"
                    >
                      <span>[ SYLLABUS ]</span>
                      <ArrowRight size={13} className="stroke-[3]" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ 5. FOOTER ═══ */}
      <footer className="bg-black text-white border-t-4 border-black pt-12 pb-10 px-6 md:px-12 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-black uppercase">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#FFDE59] border border-black flex items-center justify-center text-black font-black">
              H
            </div>
            <span className="text-white">
              HYPERS PROTOCOL // ARTIFICIAL INTELLIGENCE CURRICULA
            </span>
          </div>

          <div className="flex items-center gap-6 text-neutral-400">
            <Link to="/courses" className="hover:text-white transition-colors">[ ALL CURRICULA ]</Link>
            <Link to="/contests" className="hover:text-white transition-colors">[ 24 ARENAS ]</Link>
            <Link to="/royale" className="hover:text-white transition-colors">[ CODING ROYALE ]</Link>
            <Link to="/ide" className="text-[#CCFF00] hover:underline">[ WORKSPACE ]</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
