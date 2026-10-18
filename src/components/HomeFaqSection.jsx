import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle, ChevronDown, Plus, Minus, ArrowRight,
  Zap, MessageSquare, Bot, Shield, CheckCircle2,
  Sparkles, Terminal, Code2
} from 'lucide-react';

export default function HomeFaqSection() {
  const [openIndices, setOpenIndices] = useState([0]); // Open first item by default

  const toggleIndex = (idx) => {
    setOpenIndices(prev => 
      prev.includes(idx) 
        ? prev.filter(i => i !== idx) 
        : [...prev, idx]
    );
  };


  const faqs = [
    {
      num: '01',
      badge: 'FOUNDATIONAL SHIFT',
      badgeBg: 'bg-[#FFDE59]',
      question: 'HOW IS HYPERS DIFFERENT FROM LEETCODE?',
      answer: `LeetCode tests puzzle-solving in a vacuum. Startups do not hire based on binary tree inversions.

Hypers provisions real Linux sandboxes, injects live production failures, and auto-generates proof-of-work repositories you hand directly to CTOs before your first screen. No multiple choice. No theoretical exercises. Working code that proves you can ship.`
    },
    {
      num: '02',
      badge: 'AUTONOMOUS OUTBOUND',
      badgeBg: 'bg-[#00F0FF]',
      question: 'HOW DOES TOBEY LAND ME FOUNDER INTERVIEWS?',
      answer: `Tobey is a 24/7 autonomous agent that operates over iMessage and SMS. No job boards. No ATS black holes.

He monitors daily YC, seed, and Series A funding announcements. When an engineering match is found, he drafts a technical proof-of-work note showing how your skills solve their bottleneck. He sends it from your connected Gmail and follows up automatically until the founder responds.`
    },
    {
      num: '03',
      badge: 'FRONTIER COMPENSATION',
      badgeBg: 'bg-[#CCFF00]',
      question: 'WHAT ARE FDE AND GTM ENGINEER ROLES? WHY DO THEY PAY $190K-$340K?',
      answer: `LLMs now generate boilerplate code. Startups are cutting generic junior dev hires and doubling down on two high-leverage roles:

\u2022 Forward Deployed Engineers (FDE): Embedded with enterprise clients to unblock production deployments. $190K-$340K + equity at OpenAI, Palantir, Scale AI.
\u2022 GTM Engineers: Build autonomous lead-scraping pipelines and programmatic inbound funnels. $160K-$280K + revenue carry at Clay, Supabase, Vercel.

Hypers trains you for both with working proof-of-work.`
    },
    {
      num: '04',
      badge: 'NO CREDENTIAL GATEKEEPING',
      badgeBg: 'bg-[#FF9EAA]',
      question: 'DO I NEED A CS DEGREE OR FAANG EXPERIENCE?',
      answer: `No. Startup founders value working proof over pedigree.

When an applicant sends a GitHub PR fixing a real latency bottleneck in the startup's SDK, they skip recruiters entirely and talk directly to the CTO. Hypers gives you the sandboxes and agent tools to build these verified proof-of-work assets in minutes.`
    },
    {
      num: '05',
      badge: 'ADVERSARIAL CRUCIBLE',
      badgeBg: 'bg-[#A0E7E5]',
      question: 'HOW DOES THE ADVERSARIAL MOCK INTERVIEW WORK?',
      answer: `Our AI acts as a demanding startup CTO under deadline pressure. No softball prompts.

It injects sudden latency spikes into your simulated cluster, throws unexpected network partitions at your architecture, and challenges your sharding choices until you defend your system design with telemetry and precision.`
    }
  ];

  return (
    <section id="faq" className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-16 md:py-20 w-full border-b-4 border-black bg-[#FAF8F5] overflow-hidden font-mono select-none">
      
      {/* Background Subtle Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Section Watermark */}
      <div className="absolute right-0 bottom-2 pointer-events-none select-none z-0 opacity-[0.035] font-black text-[13vw] font-mono uppercase whitespace-nowrap text-black">
        FREQUENT // INTEL
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#CCFF00] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] mb-3">
            <HelpCircle size={15} className="stroke-[2.5]" />
            <span>[ FREQUENTLY RESOLVED DISPATCHES // ZERO FLUFF ]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black mb-3">
            QUESTIONS BLOCKING YOUR DECISION
          </h2>

          <p className="text-xs sm:text-sm font-bold text-neutral-700 uppercase max-w-2xl mx-auto leading-relaxed">
            // PROOF, NOT PROMISES. SPECIFIC ANSWERS ABOUT TOBEY, FRONTIER ROLES, AND AGENTIC OUTBOUND.
          </p>

        </div>

        {/* Accordion Questions List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={faq.num}
                className={`border-3 sm:border-4 border-black bg-white transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'shadow-[6px_6px_0px_#000] ring-2 ring-black' 
                    : 'shadow-[4px_4px_0px_#000] hover:-translate-y-0.5'
                }`}
              >
                {/* Accordion Question Header */}
                <button
                  onClick={() => toggleIndex(idx)}
                  className={`w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer transition-colors ${
                    isOpen ? 'bg-[#FAF8F5]' : 'bg-white hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 flex-1">
                    
                    {/* Index & Badge */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className={`w-8 h-8 border-2 border-black flex items-center justify-center font-black text-xs text-black shadow-[2px_2px_0px_#000] ${faq.badgeBg}`}>
                        {faq.num}
                      </div>
                      <span className="px-2 py-0.5 bg-black text-white text-[9px] font-black uppercase tracking-wider">
                        {faq.badge}
                      </span>
                    </div>

                    {/* Question text */}
                    <span className="text-xs sm:text-sm md:text-base font-black uppercase text-black tracking-tight leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  {/* Toggle Indicator Button */}
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] transition-transform duration-200 ${
                    isOpen ? 'bg-black text-[#CCFF00] rotate-180' : 'bg-white text-black'
                  }`}>
                    <ChevronDown size={16} className="stroke-[3]" />
                  </div>
                </button>

                {/* Accordion Content Body */}
                {isOpen && (
                  <div className="p-5 sm:p-6 bg-white border-t-3 border-black text-xs sm:text-sm font-bold text-neutral-800 leading-relaxed space-y-3">
                    {faq.answer.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ═══ BOTTOM CTA STRIP // CONNECT TO TOBEY OR LAUNCH WORKSPACE ═══ */}
        <div className="mt-12 p-6 sm:p-8 bg-[#FFDE59] border-4 border-black shadow-[8px_8px_0px_#000] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-black animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-wider text-black">
                STILL ON THE FENCE?
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-black">
              GET YOUR FIRST STARTUP MATCHES IN 60 SECONDS.
            </h3>
            <p className="text-xs font-bold text-neutral-800 uppercase">
              ZERO COMMITMENTS. NO CREDIT CARD. TOBEY AUDITS YOUR RESUME, GITHUB, AND TARGET SALARY INSTANTLY.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="#how-tobey-works"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('how-tobey-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-1 md:flex-none px-5 py-3 bg-white hover:bg-black hover:text-white text-black font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare size={14} className="stroke-[2.5]" />
              <span>[ GET 5 STARTUP MATCHES ]</span>
            </a>

            <Link
              to="/ide"
              className="flex-1 md:flex-none px-5 py-3 bg-black hover:bg-neutral-800 text-[#CCFF00] font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
            >
              <Zap size={14} className="stroke-[2.5]" />
              <span>[ BUILD PROOF-OF-WORK IN 15 MIN ]</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
