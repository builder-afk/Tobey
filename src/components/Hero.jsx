import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const teamMembers = [
  {
    name: 'Andrei Baranov',
    role: 'CEO',
    image: '/images/executives/ceo.jpg',
    description: 'Andrei drives the overall vision, capital strategy, and execution. He turns ambitious technological frontiers into category-defining ventures that scale globally.'
  },
  {
    name: 'Daria Lebedeva',
    role: 'CTO',
    image: '/images/executives/cto.jpg',
    description: 'Daria leads deep technology, AI architecture, and engineering infrastructure. She builds resilient, high-throughput systems that power next-generation software.'
  },
  {
    name: 'Ivan Sorokin',
    role: 'CFO',
    image: '/images/executives/cfo.jpg',
    description: 'Ivan oversees financial modeling, runway governance, and venture economics. He safeguards capital efficiency and investor alignment across all funding milestones.'
  },
  {
    name: 'Anna Fedorova',
    role: 'CMO',
    image: '/images/executives/cmo.jpg',
    description: 'Anna spearheads market expansion, brand narrative, and growth engines. She builds enduring audience conviction and drives global customer acquisition.'
  },
  {
    name: 'Pavel Smirnov',
    role: 'COO',
    image: '/images/executives/coo.jpg',
    description: 'Pavel orchestrates operations, development cadence, and team delivery. He aligns cross-functional execution so every sprint ships on time with uncompromising rigor.'
  },
  {
    name: 'Olga Kravtsova',
    role: 'CLO',
    image: '/images/executives/clo.jpg',
    description: 'Olga manages legal architecture, venture compliance, and intellectual property. She safeguards company assets and navigates international regulatory landscapes.'
  },
  {
    name: 'Igor Zakharenko',
    role: 'CDO',
    image: '/images/executives/cdo.jpg',
    description: 'Igor directs end-to-end product design, user experience, and visual systems. He ensures every interaction feels effortless, distinctive, and human-centric.'
  },
  {
    name: 'Ksenia Romanova',
    role: 'HR',
    image: '/images/executives/hr.jpg',
    description: 'Ksenia shapes culture, leadership hiring, and talent matchmaking. She connects world-class founders and builders to create teams that move with shared purpose.'
  }
];

export default function Hero({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMember = teamMembers[activeIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden font-geist text-white select-none">
      {/* ═══ 8 STACKED FULL-BLEED BACKGROUND PORTRAITS ═══ */}
      {teamMembers.map((member, index) => (
        <div
          key={member.name}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-out ${
            activeIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ backgroundImage: `url(${member.image})` }}
          aria-hidden={activeIndex !== index}
        />
      ))}

      {/* ═══ SOFT GRADIENT OVERLAY (Vignette) ═══ */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/25 pointer-events-none" />

      {/* ═══ OPTIONAL PORTAL / NAVIGATION INJECTED AT TOP ═══ */}
      {children}

      {/* ═══ CONTENT LAYER ═══ */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-6 pt-10 sm:px-10 sm:pb-8 sm:pt-14 lg:px-16 pointer-events-none">
        
        {/* TOP ZONE — HEADLINE + BIO */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-16 pointer-events-auto">
          {/* Left — H1 (static, never changes) */}
          <h1 className="max-w-xl text-3xl font-normal leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-7xl">
            hypers is the talent you build with each&nbsp;day
          </h1>

          {/* Right — description (changes with active slide) */}
          <div className="max-w-xs md:pt-2">
            <p
              key={activeMember.name}
              className="text-sm font-medium leading-relaxed text-white/80 sm:text-base animate-[fadeIn_0.5s_ease]"
            >
              {activeMember.description}
            </p>
          </div>
        </div>

        {/* BOTTOM ZONE — AVATAR PICKER + META FOOTER */}
        <div className="flex flex-col gap-8 pointer-events-auto">
          {/* Avatar picker row with Executive Titles */}
          <div className="flex items-end gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-3.5 sm:overflow-visible sm:pb-0">
            {teamMembers.map((member, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={member.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${member.name} (${member.role})`}
                  className="group flex shrink-0 flex-col items-center gap-1.5 cursor-pointer focus:outline-none transition-transform active:scale-95"
                >
                  {/* Active indicator dot */}
                  <span
                    className={`h-1 w-1 rounded-full bg-white transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  {/* Circular thumbnail */}
                  <span className={`block h-10 w-10 overflow-hidden rounded-full sm:h-14 sm:w-14 transition-all duration-300 ${
                    isActive ? 'ring-2 ring-white ring-offset-2 ring-offset-black/50 scale-105' : 'opacity-80 group-hover:opacity-100'
                  }`}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                  </span>
                  {/* Executive Role Title Tag */}
                  <span className={`text-[10px] sm:text-xs font-mono tracking-wider transition-all duration-300 ${
                    isActive ? 'text-white font-semibold' : 'text-white/60 group-hover:text-white/90'
                  }`}>
                    {member.role}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Meta footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5 text-sm font-medium">
            {/* 1. Name */}
            <div
              key={activeMember.name}
              className="text-white animate-[fadeIn_0.5s_ease]"
            >
              {activeMember.name}
            </div>

            {/* 2. Role */}
            <div
              key={activeMember.role}
              className="hidden sm:block text-white/70"
            >
              {activeMember.role}
            </div>

            {/* 3. Static tenure */}
            <div className="hidden md:block text-white/70">
              In the business since 2020
            </div>

            {/* 4. Brutalist Hero Deep Dive */}
            <div>
              <Link
                to={`/executive/${activeMember.role.toLowerCase()}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-black font-mono font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#FFDE59] hover:text-black active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
              >
                <span>[ VIEW {activeMember.role} BRUTALIST HERO ↗ ]</span>
              </Link>
            </div>

            {/* 5. WhatsApp link */}
            <div>
              <a
                href="#"
                className="text-white underline underline-offset-4 transition-colors hover:text-white/70"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
