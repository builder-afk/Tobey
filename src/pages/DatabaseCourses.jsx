import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Star, BarChart, Users, ArrowRight, Zap, Database, Terminal } from 'lucide-react';
import { triggerYoupiPayment } from '../utils/youpiPayment';

const courses = [
  { title: "SQL Mastery (PostgreSQL)", color: "bg-[#00F0FF]", interested: "250k+", rating: "4.9", seats: 12, tag: "ACID RELATIONAL" },
  { title: "NoSQL & MongoDB", color: "bg-[#CCFF00]", interested: "180k+", rating: "4.8", seats: 8, tag: "DOCUMENT STORE" },
  { title: "Redis In-Memory Data Store", color: "bg-[#FF0033]", interested: "120k+", rating: "4.8", seats: 15, tag: "SUB-MS CACHE" },
  { title: "Intro to ElasticSearch", color: "bg-[#FFDE59]", interested: "95k+", rating: "4.7", seats: 10, tag: "INVERTED INDEX" },
  { title: "Cassandra & Distributed Data", color: "bg-[#00F0FF]", interested: "60k+", rating: "4.8", seats: 20, tag: "WIDE COLUMN" },
  { title: "Relational Database Design", color: "bg-[#FF8811]", interested: "150k+", rating: "4.9", seats: 5, tag: "NORMALIZATION" },
  { title: "Advanced SQL Optimizations", color: "bg-[#CCFF00]", interested: "85k+", rating: "4.9", seats: 14, tag: "QUERY PROFILING" },
  { title: "Vector Databases for AI", color: "bg-[#FF52D9]", interested: "110k+", rating: "4.8", seats: 6, tag: "HNSW & EMBEDDINGS" },
  { title: "Neo4j & Graph Databases", color: "bg-[#00F0FF]", interested: "40k+", rating: "4.7", seats: 25, tag: "CYPHER GRAPH" },
  { title: "Modern DB Access with Prisma", color: "bg-[#FFDE59]", interested: "140k+", rating: "4.9", seats: 4, tag: "TYPE-SAFE ORM" }
];

export default function DatabaseCourses() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F0EDE6] text-black font-mono selection:bg-black selection:text-[#FFDE59] select-none pb-24">
      
      {/* ═══ 3. HERO BANNER ═══ */}
      <section className="p-4 sm:p-8 max-w-7xl mx-auto">
        <div className="bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_#000] mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F0FF] border-2 border-black shadow-[2px_2px_0px_#000] text-black font-black text-xs uppercase tracking-wider mb-4">
            <Database size={14} className="stroke-[3]" />
            <span>[ DATA LAYER ARCHITECTURE // 2026 SPECIFICATION ]</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase leading-[1.05] mb-4">
            MASTER MODERN <span className="bg-[#FFDE59] px-2 border-3 border-black shadow-[4px_4px_0px_#000]">DATABASES</span>
          </h1>

          <p className="text-xs sm:text-sm font-bold text-gray-700 uppercase leading-relaxed max-w-3xl mb-6">
            // FROM POSTGRESQL QUERY PLANS AND DISTRIBUTED CASSANDRA RING CLUSTERS TO SUB-MS REDIS IN-MEMORY BUFFERING AND VECTOR HNSW EMBEDDINGS FOR GENERATIVE AI RETRIEVAL.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t-2 border-black text-xs font-black uppercase text-gray-800">
            <span className="px-2.5 py-1 bg-[#FAF8F5] border border-black">10 DATA ENGINE TRACKS</span>
            <span className="px-2.5 py-1 bg-[#00F0FF] border border-black text-black">VECTOR SIMILARITY</span>
            <span className="px-2.5 py-1 bg-[#CCFF00] border border-black text-black">ACID GUARANTEES</span>
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
                    <span className="px-2 py-0.5 bg-black text-[#00F0FF] border border-black text-[10px] font-black uppercase">
                      {course.tag}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-black">
                      <Star size={12} className="fill-black text-black" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 ${course.color} border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000] shrink-0`}>
                      <Database size={22} className="text-black stroke-[2.5]" />
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
                      <span>TYPE:</span>
                      <span className="text-black font-black">STORAGE & RETRIEVAL</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>SEATS:</span>
                      <span className="text-[#FF0033] font-black">{course.seats} AVAILABLE</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-black flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-gray-500 block">LIFETIME ACCESS</span>
                    <span className="text-lg font-black text-black">₹2,499</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      data-youpi-pay
                      data-order-id={`HYPERS-${courseSlug.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16)}-${Date.now().toString().slice(-6)}`}
                      data-amount="2499.00"
                      data-currency="INR"
                      data-name="HYPERS ACADEMY"
                      data-description={`Database Path: ${course.title}`}
                      onClick={() => triggerYoupiPayment(course, '2499.00')}
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
              HYPERS PROTOCOL // DATABASE SYSTEMS SPECIFICATION
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
