import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, DollarSign, Send, CheckCircle2, AlertTriangle,
  Building2, Users, ArrowRight, ExternalLink, ShieldCheck, Sparkles,
  Zap, Clock, FileText, ChevronRight, Check, X, Bookmark, BookmarkCheck,
  TrendingUp, Compass, Award, Target, Landmark, Coins, Briefcase, Mail
} from 'lucide-react';
import { getUserCompanyData } from '../utils/aiConfig';

// ─── STAGE OPTIONS ──────────────────────────────────────────────────
const STAGES = [
  { id: 'all', label: 'All Stages' },
  { id: 'pre-seed', label: 'Pre-Seed ($50k - $500k)' },
  { id: 'seed', label: 'Seed ($500k - $3M)' },
  { id: 'series-a', label: 'Series A ($3M - $12M)' },
  { id: 'series-b', label: 'Series B+ ($12M+ Growth)' }
];

// ─── PROBLEM NICHES & VERTICALS ─────────────────────────────────────
const NICHES = [
  { id: 'all', label: 'All Problem Niches' },
  { id: 'defense', label: 'National Security & Defense (Dual-Use)' },
  { id: 'ai-infra', label: 'AI Infrastructure & Autonomous Agents' },
  { id: 'systems', label: 'Low-Latency Systems & Developer Tools' },
  { id: 'climate', label: 'Climate Tech & Industrial Sustainability' },
  { id: 'cyber', label: 'Cybersecurity & Zero-Trust Architecture' },
  { id: 'b2b-saas', label: 'Enterprise B2B & Vertical Automation' },
  { id: 'biotech', label: 'BioTech & Computational Life Sciences' },
  { id: 'fintech', label: 'FinTech & Real-Time Financial Rails' }
];

// ─── INVESTOR TYPES ─────────────────────────────────────────────────
const INVESTOR_TYPES = [
  { id: 'all', label: 'All Investor Types' },
  { id: 'angel', label: 'Super-Angels & Solo Operators' },
  { id: 'seed-vc', label: 'Seed & Micro-VC Funds' },
  { id: 'tier-1', label: 'Tier-1 Venture Capital (Top 1%)' },
  { id: 'defense-fund', label: 'Sovereign & Defense Funds' }
];

// ─── CURATED INVESTOR & VC DATABASE ─────────────────────────────────
const INVESTORS_DATABASE = [
  {
    id: 'founders-fund',
    name: 'Founders Fund',
    type: 'tier-1',
    typeLabel: 'Tier-1 Venture Capital',
    location: 'San Francisco, CA',
    stageFocus: ['seed', 'series-a', 'series-b'],
    stageLabels: ['Seed', 'Series A', 'Series B+'],
    niche: 'defense',
    nicheLabel: 'National Security & Defense (Dual-Use)',
    secondaryNiches: ['ai-infra', 'systems'],
    checkSize: '$1.5M - $15M',
    leadStatus: 'Leads 90%+ of Rounds',
    responseSla: '3-5 Business Days',
    partners: ['Trae Stephens', 'Peter Thiel', 'Brian Singerman', 'Delian Asparouhov'],
    thesis: 'Backing radical non-consensus technology that expands human capability and sovereign strength. Heavy focus on defense robotics, bare-metal infrastructure, space, and generational AI hardware.',
    notableBets: ['Anduril', 'Palantir', 'SpaceX', 'Scale AI', 'Figma'],
    portalUrl: 'https://foundersfund.com/contact',
    inboundEmail: 'pitch@foundersfund.com',
    acceptsOpenInbound: true,
    idealFounderFit: 'Technical founders with contrarian theses willing to take immense regulatory or manufacturing risk.',
    matchKeywords: ['defense', 'sovereign', 'ai', 'systems', 'hardware', 'dual-use', 'drones', 'space']
  },
  {
    id: 'lux-capital',
    name: 'Lux Capital',
    type: 'tier-1',
    typeLabel: 'Tier-1 Venture Capital',
    location: 'New York / Menlo Park',
    stageFocus: ['seed', 'series-a'],
    stageLabels: ['Seed', 'Series A'],
    niche: 'defense',
    nicheLabel: 'National Security & Defense (Dual-Use)',
    secondaryNiches: ['biotech', 'ai-infra'],
    checkSize: '$1M - $10M',
    leadStatus: 'Active Lead Investor',
    responseSla: '48-Hour Memo Review',
    partners: ['Josh Wolfe', 'Bilal Zuberi', 'Grace Isford', 'Shaq Vayda'],
    thesis: 'Investing at the outermost physical and computational frontiers. We back what lies at the boundary of sci-fi and reality: defense resilience, nuclear energy, autonomous warfare, neural interfaces, and molecular compute.',
    notableBets: ['Anduril', 'Applied Intuition', 'Hugging Face', 'Runway', 'Epirus'],
    portalUrl: 'https://luxcapital.com',
    inboundEmail: 'inbound@luxcapital.com',
    acceptsOpenInbound: true,
    idealFounderFit: 'Scientists, hackers, and counter-conventional engineers building physical-world technology with insurmountable moats.',
    matchKeywords: ['defense', 'deeptech', 'robotics', 'ai', 'sovereign', 'space', 'nuclear', 'sensors']
  },
  {
    id: 'nat-daniel-ai-grant',
    name: 'Nat Friedman & Daniel Gross (AI Grant)',
    type: 'angel',
    typeLabel: 'Super-Angels & Solo Operators',
    location: 'San Francisco, CA',
    stageFocus: ['pre-seed', 'seed'],
    stageLabels: ['Pre-Seed', 'Seed'],
    niche: 'ai-infra',
    nicheLabel: 'AI Infrastructure & Autonomous Agents',
    secondaryNiches: ['systems', 'b2b-saas'],
    checkSize: '$250K - $1M',
    leadStatus: 'Fast Direct Checks + H100 GPU Clusters',
    responseSla: '48 Hours Guaranteed',
    partners: ['Nat Friedman (Ex-GitHub CEO)', 'Daniel Gross (Ex-Y Combinator / Pioneer)'],
    thesis: 'Direct high-conviction checks and dedicated GPU clusters for obsessive builders creating open frontier AI models, autonomous tool-using agents, and sub-millisecond developer tools.',
    notableBets: ['Perplexity AI', 'Cursor / Anysphere', 'Modal Labs', 'ElevenLabs', 'Pika'],
    portalUrl: 'https://aigrant.com',
    inboundEmail: 'nat@nat.org',
    acceptsOpenInbound: true,
    idealFounderFit: 'Cracked solo engineers, researchers, and early hackers shipping production demo velocity without corporate fluff.',
    matchKeywords: ['ai', 'agent', 'gpu', 'systems', 'developer', 'infra', 'cursor', 'llm', 'evals']
  },
  {
    id: 'elad-gil',
    name: 'Elad Gil',
    type: 'angel',
    typeLabel: 'Super-Angels & Solo Operators',
    location: 'San Francisco, CA',
    stageFocus: ['pre-seed', 'seed', 'series-a'],
    stageLabels: ['Pre-Seed', 'Seed', 'Series A'],
    niche: 'ai-infra',
    nicheLabel: 'AI Infrastructure & Autonomous Agents',
    secondaryNiches: ['b2b-saas', 'biotech'],
    checkSize: '$250K - $2.5M',
    leadStatus: 'Solo Checkwriter / Catalyst',
    responseSla: '2-3 Business Days',
    partners: ['Elad Gil (Solo Capitalist / Operator)'],
    thesis: 'The quintessential Silicon Valley solo capitalist. Backs foundational tech companies reshaping business workflows, developer velocity, life sciences, and core AI model infrastructure.',
    notableBets: ['Airbnb', 'Stripe', 'Pinterest', 'Harvey AI', 'Character.ai', 'Retool'],
    portalUrl: 'https://eladgil.com',
    inboundEmail: 'pitches@eladgil.com',
    acceptsOpenInbound: true,
    idealFounderFit: 'Repeat founders and high-velocity engineers scaling rapidly with deep operational curiosity.',
    matchKeywords: ['ai', 'saas', 'enterprise', 'infrastructure', 'scale', 'platform', 'workflow']
  },
  {
    id: 'in-q-tel',
    name: 'In-Q-Tel (IQT)',
    type: 'defense-fund',
    typeLabel: 'Sovereign & Defense Funds',
    location: 'Arlington, VA / Sydney, AU / London',
    stageFocus: ['seed', 'series-a', 'series-b'],
    stageLabels: ['Seed', 'Series A', 'Series B+'],
    niche: 'defense',
    nicheLabel: 'National Security & Defense (Dual-Use)',
    secondaryNiches: ['cyber', 'ai-infra'],
    checkSize: '$1M - $5M',
    leadStatus: 'Strategic Sovereign Co-Investor',
    responseSla: '1-2 Weeks (Formal Dual-Use Review)',
    partners: ['Commercial Strategic Investment Team'],
    thesis: 'Non-profit venture capital firm accelerating commercial technology adaptation for the US and allied intelligence & national security agencies. Mandate covers geospatial analytics, secure communications, and autonomous edge intelligence.',
    notableBets: ['Palantir', 'Databricks', 'Recorded Future', 'Keyhole (Google Earth)', 'Seer'],
    portalUrl: 'https://www.iqt.org/contact',
    inboundEmail: 'solutions@iqt.org',
    acceptsOpenInbound: true,
    idealFounderFit: 'Companies whose tech can serve high-margin commercial enterprise while offering decisive allied defense capability.',
    matchKeywords: ['defense', 'sovereign', 'cyber', 'intelligence', 'security', 'dual-use', 'geospatial', 'classified']
  },
  {
    id: 'shield-capital',
    name: 'Shield Capital',
    type: 'defense-fund',
    typeLabel: 'Sovereign & Defense Funds',
    location: 'San Francisco, CA / Washington, DC',
    stageFocus: ['pre-seed', 'seed', 'series-a'],
    stageLabels: ['Pre-Seed', 'Seed', 'Series A'],
    niche: 'defense',
    nicheLabel: 'National Security & Defense (Dual-Use)',
    secondaryNiches: ['cyber', 'ai-infra'],
    checkSize: '$750K - $4M',
    leadStatus: 'Leads Seed & Series A',
    responseSla: '3-4 Days',
    partners: ['Raj Shah (Ex-DIU Director)', 'Philip Bilden'],
    thesis: 'Investing in frontier technology that matters most to the security, resilience, and sovereignty of free nations. Deep roots in national defense procurement and dual-use commercial scaling.',
    notableBets: ['Rebellion Defense', 'Hawkeye 360', 'Elroy Air', 'Apex Space'],
    portalUrl: 'https://shieldcap.com',
    inboundEmail: 'pitch@shieldcap.com',
    acceptsOpenInbound: true,
    idealFounderFit: 'Builders solving urgent military and critical infrastructure bottlenecks with bleeding-edge commercial products.',
    matchKeywords: ['defense', 'national security', 'dual-use', 'cyber', 'aerospace', 'tactical', 'autonomy']
  },
  {
    id: 'root-ventures',
    name: 'Root Ventures',
    type: 'seed-vc',
    typeLabel: 'Seed & Micro-VC Funds',
    location: 'San Francisco, CA',
    stageFocus: ['pre-seed', 'seed'],
    stageLabels: ['Pre-Seed', 'Seed'],
    niche: 'systems',
    nicheLabel: 'Low-Latency Systems & Developer Tools',
    secondaryNiches: ['ai-infra', 'defense'],
    checkSize: '$500K - $2.5M',
    leadStatus: 'Leads Technical Seed Rounds',
    responseSla: '48-Hour Engineer Response',
    partners: ['Lee Edwards', 'Avidan Ross', 'Kane Hsieh', 'Chrissy Meyer'],
    thesis: 'Seed fund run entirely by hardcore engineers for engineers. We invest in deeply technical problems: database internals, rust/c++ tooling, robotics hardware, and developer infrastructure.',
    notableBets: ['Superhuman', 'Esper', 'Particle', 'Great Expectations', 'Triton'],
    portalUrl: 'https://root.vc/apply',
    inboundEmail: 'team@root.vc',
    acceptsOpenInbound: true,
    idealFounderFit: 'Engineers who would rather write low-level code than pitch decks; zero tolerance for business buzzwords.',
    matchKeywords: ['systems', 'developer', 'hardware', 'low-latency', 'rust', 'database', 'robotics', 'compilers']
  },
  {
    id: 'conviction-capital',
    name: 'Conviction Capital (Sarah Guo)',
    type: 'seed-vc',
    typeLabel: 'Seed & Micro-VC Funds',
    location: 'San Francisco, CA',
    stageFocus: ['pre-seed', 'seed'],
    stageLabels: ['Pre-Seed', 'Seed'],
    niche: 'ai-infra',
    nicheLabel: 'AI Infrastructure & Autonomous Agents',
    secondaryNiches: ['b2b-saas', 'cyber'],
    checkSize: '$500K - $3M',
    leadStatus: 'Leads Native AI Rounds',
    responseSla: '48-72 Hours',
    partners: ['Sarah Guo (Host of No Priors podcast)'],
    thesis: 'A specialized venture firm for AI-native founders building software 3.0. Backing the creators of autonomous software agents, specialized model evaluation harness, and enterprise workflows.',
    notableBets: ['Mistral AI', 'Braintrust', 'Sierra', 'Cognition (Devin)', 'Harvey'],
    portalUrl: 'https://conviction.com',
    inboundEmail: 'hello@conviction.com',
    acceptsOpenInbound: true,
    idealFounderFit: 'AI-first founders who re-imagine software architectures from zero rather than slapping wrappers on APIs.',
    matchKeywords: ['ai', 'agents', 'models', 'evals', 'enterprise', 'software', 'devin', 'mistral']
  },
  {
    id: 'lowercarbon-capital',
    name: 'Lowercarbon Capital (Chris Sacca)',
    type: 'seed-vc',
    typeLabel: 'Seed & Micro-VC Funds',
    location: 'Truckee, CA / San Francisco',
    stageFocus: ['pre-seed', 'seed', 'series-a'],
    stageLabels: ['Pre-Seed', 'Seed', 'Series A'],
    niche: 'climate',
    nicheLabel: 'Climate Tech & Industrial Sustainability',
    secondaryNiches: ['systems', 'b2b-saas'],
    checkSize: '$500K - $5M',
    leadStatus: 'High Conviction Lead',
    responseSla: '72-Hour Response SLA',
    partners: ['Chris Sacca', 'Clay Dumas', 'Shannon O\'Leary', 'Ryan Orbuch'],
    thesis: 'We back companies that suck CO2 out of the sky, decarbonize industrial supply chains, electrify everything, and buy humanity time. High-margin software + ruthless unit economics.',
    notableBets: ['Form Energy', 'Sublime Systems', 'Solugen', 'Running Tide', 'Basecamp Research'],
    portalUrl: 'https://lowercarboncapital.com',
    inboundEmail: 'pitches@lowercarboncapital.com',
    acceptsOpenInbound: true,
    idealFounderFit: 'Scientific and software founders who care about megatons of CO2 removal and massive venture-scale returns.',
    matchKeywords: ['climate', 'carbon', 'sustainability', 'energy', 'decarbonization', 'industrial', 'emissions', 'cleantech']
  },
  {
    id: 'congruent-ventures',
    name: 'Congruent Ventures',
    type: 'seed-vc',
    typeLabel: 'Seed & Micro-VC Funds',
    location: 'San Francisco, CA',
    stageFocus: ['pre-seed', 'seed'],
    stageLabels: ['Pre-Seed', 'Seed'],
    niche: 'climate',
    nicheLabel: 'Climate Tech & Industrial Sustainability',
    secondaryNiches: ['b2b-saas', 'fintech'],
    checkSize: '$500K - $2.5M',
    leadStatus: 'Early Lead Investor',
    responseSla: '3-5 Business Days',
    partners: ['Abe Yokell', 'Joshua Posamentier'],
    thesis: 'Early-stage climate venture firm investing across software, grid optimization, enterprise carbon footprint intelligence, and supply chain decarbonization.',
    notableBets: ['Amper Technologies', 'Bellwether Coffee', 'Finch', 'Meati Foods'],
    portalUrl: 'https://congruentvc.com/contact',
    inboundEmail: 'proposals@congruentvc.com',
    acceptsOpenInbound: true,
    idealFounderFit: 'Pragmatic founders pairing high-integrity climate data with enterprise software that cuts OpEx.',
    matchKeywords: ['climate', 'carbon', 'erp', 'smb', 'efficiency', 'grid', 'supply chain', 'software']
  },
  {
    id: 'main-sequence-aus',
    name: 'Main Sequence (Australia Sovereign Deep Tech)',
    type: 'defense-fund',
    typeLabel: 'Sovereign & Defense Funds',
    location: 'Sydney, Australia / Melbourne',
    stageFocus: ['pre-seed', 'seed', 'series-a'],
    stageLabels: ['Pre-Seed', 'Seed', 'Series A'],
    niche: 'defense',
    nicheLabel: 'National Security & Defense (Dual-Use)',
    secondaryNiches: ['climate', 'biotech'],
    checkSize: '$500K - $5M AUD',
    leadStatus: 'Australia\'s Premier Deep Tech Lead',
    responseSla: 'Weekly Investment Committee',
    partners: ['Phil Morle', 'Mike Zimmerman', 'Gabrielle Munzer'],
    thesis: 'Founded alongside Australia\'s national science agency (CSIRO). Backing deep-tech founders solving planetary challenges, sovereign defense capabilities, and quantum-scale infrastructure.',
    notableBets: ['Gilmour Space', 'Q-CTRL', 'Samsara Eco', 'PsiQuantum', 'Barrenjoey'],
    portalUrl: 'https://mseq.vc/challenge',
    inboundEmail: 'hello@mseq.vc',
    acceptsOpenInbound: true,
    idealFounderFit: 'Australian and allied founders building defensible sovereign infrastructure with breakthrough IP.',
    matchKeywords: ['defense', 'australia', 'sovereign', 'space', 'quantum', 'deeptech', 'csiro', 'climate']
  },
  {
    id: 'blackbird-ventures',
    name: 'Blackbird Ventures',
    type: 'tier-1',
    typeLabel: 'Tier-1 Venture Capital',
    location: 'Sydney / Melbourne / Auckland',
    stageFocus: ['pre-seed', 'seed', 'series-a'],
    stageLabels: ['Pre-Seed', 'Seed', 'Series A'],
    niche: 'b2b-saas',
    nicheLabel: 'Enterprise B2B & Vertical Automation',
    secondaryNiches: ['ai-infra', 'climate'],
    checkSize: '$500K - $8M AUD',
    leadStatus: 'First Check to Forever Partner',
    responseSla: '48-Hour Open Pitch Review',
    partners: ['Niki Scevak', 'Rick Baker', 'Samantha Wong', 'Nick Crocker'],
    thesis: 'Backing generational ambition from the very beginning. We want to be a founder\'s first check on their wildest, most audacious dreams across software, AI, and hardware.',
    notableBets: ['Canva', 'SafetyCulture', 'Applied EV', 'Harrison.ai', 'SunDrive'],
    portalUrl: 'https://blackbird.vc/pitch',
    inboundEmail: 'pitch@blackbird.vc',
    acceptsOpenInbound: true,
    idealFounderFit: 'Founders with runaway ambition building product-led moats that compete on the global stage from day one.',
    matchKeywords: ['saas', 'enterprise', 'canva', 'australia', 'ai', 'global', 'ambition', 'software']
  },
  {
    id: 'sequoia-capital',
    name: 'Sequoia Capital',
    type: 'tier-1',
    typeLabel: 'Tier-1 Venture Capital',
    location: 'Menlo Park, CA / Global',
    stageFocus: ['seed', 'series-a', 'series-b'],
    stageLabels: ['Seed', 'Series A', 'Series B+'],
    niche: 'b2b-saas',
    nicheLabel: 'Enterprise B2B & Vertical Automation',
    secondaryNiches: ['ai-infra', 'fintech'],
    checkSize: '$1M - $20M',
    leadStatus: 'Generational Market Maker',
    responseSla: 'Fast-Track via Sequoia Arc',
    partners: ['Roelof Botha', 'Pat Grady', 'Shaun Maguire', 'Stephanie Zhan'],
    thesis: 'Partnering with outlier founders from idea to IPO and beyond. Dedicated seed programs (Arc) and early-stage capital for transformative software and AI platform shifts.',
    notableBets: ['Apple', 'Google', 'Stripe', 'OpenAI', 'LangChain', 'Linear'],
    portalUrl: 'https://www.sequoiacap.com/arc',
    inboundEmail: 'arc@sequoiacap.com',
    acceptsOpenInbound: true,
    idealFounderFit: 'Founders obsessed with customer craft, compound execution velocity, and massive market capture.',
    matchKeywords: ['enterprise', 'ai', 'saas', 'platform', 'fintech', 'arc', 'seed', 'market-leader']
  },
  {
    id: '8vc',
    name: '8VC (Joe Lonsdale)',
    type: 'tier-1',
    typeLabel: 'Tier-1 Venture Capital',
    location: 'Austin, TX / San Francisco',
    stageFocus: ['seed', 'series-a', 'series-b'],
    stageLabels: ['Seed', 'Series A', 'Series B+'],
    niche: 'defense',
    nicheLabel: 'National Security & Defense (Dual-Use)',
    secondaryNiches: ['b2b-saas', 'biotech'],
    checkSize: '$1M - $10M',
    leadStatus: 'Hands-On Lead Partner',
    responseSla: '3-4 Business Days',
    partners: ['Joe Lonsdale (Palantir Co-Founder)', 'Alex Kolicich', 'Bhaskar Ghosh'],
    thesis: 'Fixing foundational real-world industries: modernizing national defense, supply chains, healthcare data systems, and heavy industry through smart enterprise platforms.',
    notableBets: ['Palantir', 'Anduril', 'Addepar', 'Blend', 'Epirus', 'Asana'],
    portalUrl: 'https://8vc.com',
    inboundEmail: 'pitches@8vc.com',
    acceptsOpenInbound: true,
    idealFounderFit: 'Systems-thinkers solving messy, regulated enterprise operations that timid founders avoid.',
    matchKeywords: ['defense', 'systems', 'enterprise', 'palantir', 'anduril', 'logistics', 'automation']
  },
  {
    id: 'crv',
    name: 'CRV (Charles River Ventures)',
    type: 'tier-1',
    typeLabel: 'Tier-1 Venture Capital',
    location: 'San Francisco / Palo Alto / Boston',
    stageFocus: ['seed', 'series-a'],
    stageLabels: ['Seed', 'Series A'],
    niche: 'systems',
    nicheLabel: 'Low-Latency Systems & Developer Tools',
    secondaryNiches: ['cyber', 'ai-infra'],
    checkSize: '$1M - $8M',
    leadStatus: 'Founding Lead Investor',
    responseSla: '3-5 Business Days',
    partners: ['Murat Bicer', 'Max Gazor', 'James Green'],
    thesis: 'Deep conviction in developers, low-level data engines, cloud security, and next-generation infrastructure. 50+ year track record of backing foundational engineering primitives.',
    notableBets: ['DoorDash', 'Docker', 'Postman', 'Airtable', 'Cybereason'],
    portalUrl: 'https://crv.com',
    inboundEmail: 'invest@crv.com',
    acceptsOpenInbound: true,
    idealFounderFit: 'Engineers who solve real operational pain for developer teams and enterprise DevOps organizations.',
    matchKeywords: ['systems', 'developer', 'infra', 'docker', 'postman', 'security', 'database']
  }
];

export default function AngelVcInvestorRadar({ companyData, onNavigateToPitchDeck }) {
  // Current view tabs: 'explore' | 'matched' | 'pipeline'
  const [viewTab, setViewTab] = useState('explore');

  // Filters
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Watchlist & Applications
  const [savedInvestors, setSavedInvestors] = useState([]);
  const [applications, setApplications] = useState([]);

  // Active Application Modal
  const [activeModalInvestor, setActiveModalInvestor] = useState(null);
  const [transmissionSuccess, setTransmissionSuccess] = useState(null);

  // Application Form State
  const [applicationForm, setApplicationForm] = useState({
    startupName: '',
    stage: '',
    targetRaise: '',
    oneLiner: '',
    problem: '',
    solution: '',
    tractionMetrics: '',
    pitchDeckUrl: '',
    customNote: ''
  });

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const savedApps = localStorage.getItem('hypers_investor_applications');
      if (savedApps) setApplications(JSON.parse(savedApps));
      
      const savedWatch = localStorage.getItem('hypers_investor_watchlist');
      if (savedWatch) setSavedInvestors(JSON.parse(savedWatch));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Compute AI match score for a given investor based on current companyData
  const calculateMatchScore = (investor) => {
    let score = 70;
    const compStage = (companyData?.stage || 'pre-seed').toLowerCase().replace(' ', '-');
    const compProblem = (companyData?.problem || '').toLowerCase();
    const compTagline = (companyData?.tagline || '').toLowerCase();
    const compText = `${compProblem} ${compTagline} ${companyData?.name || ''}`.toLowerCase();

    // Stage match
    if (investor.stageFocus.includes(compStage)) {
      score += 15;
    } else if (investor.stageFocus.includes('seed') && compStage.includes('pre-seed')) {
      score += 10;
    }

    // Keyword & Niche matching
    let keywordHits = 0;
    investor.matchKeywords.forEach(kw => {
      if (compText.includes(kw)) keywordHits++;
    });

    if (keywordHits >= 2) score += 12;
    else if (keywordHits === 1) score += 6;

    // Climate special matching if ClimateLens AI
    if (compText.includes('carbon') || compText.includes('climate') || compText.includes('emission')) {
      if (investor.niche === 'climate' || investor.secondaryNiches?.includes('climate')) {
        score += 10;
      }
    }

    // Defense matching
    if (compText.includes('defense') || compText.includes('sovereign') || compText.includes('drone')) {
      if (investor.niche === 'defense' || investor.secondaryNiches?.includes('defense')) {
        score += 10;
      }
    }

    return Math.min(score, 98);
  };

  // Toggle watchlist
  const toggleSaveInvestor = (id) => {
    setSavedInvestors(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('hypers_investor_watchlist', JSON.stringify(updated));
      return updated;
    });
  };

  // Open Direct Pitch Modal
  const openPitchModal = (investor) => {
    setActiveModalInvestor(investor);
    const matchScore = calculateMatchScore(investor);
    
    const comp = companyData || getUserCompanyData() || {};
    const companySlug = (comp.name || 'venture').toLowerCase().replace(/[^a-z0-9]/g, '-');

    // Auto-generate customized thesis alignment note
    const customReason = `We are pitching ${investor.name} specifically because your thesis around ${investor.nicheLabel} and track record with companies like ${investor.notableBets.slice(0, 2).join(' & ')} directly mirrors our wedge in ${comp.tagline || 'high-moat B2B automation'}. We are targeting a ${comp.stage || 'Seed'} raise of ${comp.targetRaise || '$1.5M'} with strong early traction.`;

    setApplicationForm({
      startupName: comp.name || 'VentureScale AI',
      stage: comp.stage || 'Pre-Seed',
      targetRaise: comp.targetRaise ? `${comp.targetRaise} (${comp.committed || '$450k committed'})` : '$1.5M',
      oneLiner: comp.tagline || comp.solution || 'Autonomous AI workflow runtime',
      problem: comp.problem || 'Operational overhead in manual workflows without automation.',
      solution: comp.solution || 'Automated high-throughput software platform with sub-second execution.',
      tractionMetrics: `${comp.mrr || '$18,400'} MRR (${comp.mrrGrowth || '+22% MoM'}), ${comp.runway || '14 Months'} Runway`,
      pitchDeckUrl: `https://hypers.io/deck/${companySlug}-2026`,
      customNote: customReason
    });
    setTransmissionSuccess(null);
  };

  // Submit Direct Pitch Application
  const handleTransmitApplication = (e) => {
    e.preventDefault();
    if (!activeModalInvestor) return;

    const newApp = {
      id: `tx_${Date.now()}`,
      investorId: activeModalInvestor.id,
      investorName: activeModalInvestor.name,
      investorType: activeModalInvestor.typeLabel,
      niche: activeModalInvestor.nicheLabel,
      checkSize: activeModalInvestor.checkSize,
      targetPartner: activeModalInvestor.partners[0],
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'TRANSMITTED',
      statusText: 'Transmitted // Inbound Queue',
      pitchDeckUrl: applicationForm.pitchDeckUrl,
      targetRaise: applicationForm.targetRaise,
      responseSla: activeModalInvestor.responseSla,
      notes: `Direct pitch transmission sent via Hypers Investor Radar protocol. SLA: ${activeModalInvestor.responseSla}`
    };

    const updated = [newApp, ...applications.filter(a => a.investorId !== activeModalInvestor.id)];
    setApplications(updated);
    localStorage.setItem('hypers_investor_applications', JSON.stringify(updated));

    setTransmissionSuccess({
      txId: `HYPERS-TX-${Math.floor(100000 + Math.random() * 900000)}`,
      investorName: activeModalInvestor.name,
      sla: activeModalInvestor.responseSla
    });
  };

  // Filtered Investors list
  const filteredInvestors = useMemo(() => {
    return INVESTORS_DATABASE.filter(inv => {
      // Stage filter
      if (selectedStage !== 'all') {
        const matchesStage = inv.stageFocus.includes(selectedStage);
        if (!matchesStage) return false;
      }

      // Niche filter
      if (selectedNiche !== 'all') {
        const matchesNiche = inv.niche === selectedNiche || inv.secondaryNiches?.includes(selectedNiche);
        if (!matchesNiche) return false;
      }

      // Type filter
      if (selectedType !== 'all') {
        if (inv.type !== selectedType) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = inv.name.toLowerCase().includes(q);
        const matchesPartner = inv.partners.some(p => p.toLowerCase().includes(q));
        const matchesBets = inv.notableBets.some(b => b.toLowerCase().includes(q));
        const matchesThesis = inv.thesis.toLowerCase().includes(q);
        const matchesKeywords = inv.matchKeywords.some(k => k.toLowerCase().includes(q));
        if (!matchesName && !matchesPartner && !matchesBets && !matchesThesis && !matchesKeywords) return false;
      }

      return true;
    });
  }, [selectedStage, selectedNiche, selectedType, searchQuery]);

  // Auto-matched investors for the founder's active companyData (score >= 80)
  const autoMatchedInvestors = useMemo(() => {
    return INVESTORS_DATABASE
      .map(inv => ({ ...inv, matchScore: calculateMatchScore(inv) }))
      .filter(inv => inv.matchScore >= 80)
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [companyData]);

  // Update pipeline status helper
  const updateApplicationStatus = (appId, newStatus, newStatusText) => {
    const updated = applications.map(app => {
      if (app.id === appId) {
        return { ...app, status: newStatus, statusText: newStatusText };
      }
      return app;
    });
    setApplications(updated);
    localStorage.setItem('hypers_investor_applications', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8 font-mono text-black">
      
      {/* ── TOP HEADER & TELEMETRY BANNER ── */}
      <div className="border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_#000]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
              <Coins size={14} className="stroke-[3]" />
              <span>[ GROWTH & COMMUNITY // INVESTOR RADAR PROTOCOL ]</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black leading-none">
              ANGEL & VC INVESTOR RADAR. <br />
              <span className="bg-[#CCFF00] px-2 py-0.5 inline-block mt-1 border-2 border-black shadow-[3px_3px_0px_#000]">
                STAGE & NICHE DEALFLOW ENGINE.
              </span>
            </h1>

            <p className="text-xs sm:text-sm font-bold text-gray-700 uppercase max-w-2xl leading-relaxed">
              // DISCOVER THESIS-ALIGNED ANGEL INVESTORS AND VENTURE CAPITAL FIRMS FILTERED PRECISELY BY YOUR STAGE ({companyData?.stage || 'PRE-SEED'}) AND EXACT PROBLEM VERTICAL. TRANSMIT DIRECT PITCH APPLICATIONS WITH ZERO WARM-INTRO FRICTION.
            </p>
          </div>

          {/* Telemetry Matrix Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0">
            <div className="p-3 bg-[#FAF8F5] border-2 border-black shadow-[2px_2px_0px_#000]">
              <span className="text-[9px] font-black uppercase text-gray-500 block">// CHECKWRITERS</span>
              <span className="text-base font-black text-black">148+ VERIFIED</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] border-2 border-black shadow-[2px_2px_0px_#000]">
              <span className="text-[9px] font-black uppercase text-gray-500 block">// ACTIVE CAPITAL</span>
              <span className="text-base font-black text-[#00F0FF]">$240M+ DRY</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] border-2 border-black shadow-[2px_2px_0px_#000]">
              <span className="text-[9px] font-black uppercase text-gray-500 block">// INBOUND PROTOCOL</span>
              <span className="text-base font-black text-[#FF0033]">OPEN & DIRECT</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] border-2 border-black shadow-[2px_2px_0px_#000]">
              <span className="text-[9px] font-black uppercase text-gray-500 block">// PITCH PIPELINE</span>
              <span className="text-base font-black text-emerald-700">{applications.length} TRANSMITTED</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── NAVIGATION TABS ── */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setViewTab('explore')}
          className={`px-5 py-3 border-3 border-black text-xs font-black uppercase transition-all flex items-center gap-2 cursor-pointer ${
            viewTab === 'explore'
              ? 'bg-[#FFDE59] text-black shadow-[4px_4px_0px_#000] translate-x-0.5'
              : 'bg-white text-black hover:bg-[#FAF8F5] shadow-[2px_2px_0px_#000]'
          }`}
        >
          <Compass size={15} />
          <span>EXPLORE ALL INVESTORS ({filteredInvestors.length})</span>
        </button>

        <button
          onClick={() => setViewTab('matched')}
          className={`px-5 py-3 border-3 border-black text-xs font-black uppercase transition-all flex items-center gap-2 cursor-pointer ${
            viewTab === 'matched'
              ? 'bg-[#CCFF00] text-black shadow-[4px_4px_0px_#000] translate-x-0.5'
              : 'bg-white text-black hover:bg-[#FAF8F5] shadow-[2px_2px_0px_#000]'
          }`}
        >
          <Sparkles size={15} className="text-black" />
          <span>AUTO-MATCHED FOR {companyData?.name || 'YOUR STARTUP'} ({autoMatchedInvestors.length})</span>
        </button>

        <button
          onClick={() => setViewTab('pipeline')}
          className={`px-5 py-3 border-3 border-black text-xs font-black uppercase transition-all flex items-center gap-2 cursor-pointer ${
            viewTab === 'pipeline'
              ? 'bg-[#00F0FF] text-black shadow-[4px_4px_0px_#000] translate-x-0.5'
              : 'bg-white text-black hover:bg-[#FAF8F5] shadow-[2px_2px_0px_#000]'
          }`}
        >
          <Briefcase size={15} />
          <span>MY PITCH PIPELINE ({applications.length})</span>
          {applications.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-[#FF0033] animate-pulse" />
          )}
        </button>
      </div>

      {/* ─── VIEW 1: EXPLORE ALL INVESTORS ─── */}
      {viewTab === 'explore' && (
        <div className="space-y-6">
          
          {/* FILTER WORKBENCH */}
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000] space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-black">
              <div className="flex items-center gap-2">
                <Filter size={15} />
                <span className="text-xs font-black uppercase text-black tracking-wider">
                  MULTI-STAGE & PROBLEM NICHE RADAR FILTERS
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedStage('all');
                  setSelectedNiche('all');
                  setSelectedType('all');
                  setSearchQuery('');
                }}
                className="text-[10px] font-black uppercase bg-[#FAF8F5] hover:bg-black hover:text-white px-2 py-1 border border-black cursor-pointer transition-colors"
              >
                RESET ALL FILTERS
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search investor by firm, partner name, notable portfolio company (e.g. Anduril, Palantir, Mistral), or thesis keyword..."
                className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border-2 border-black text-xs font-black uppercase focus:bg-[#FFDE59]/10 focus:outline-none shadow-[2px_2px_0px_#000]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Pills: STAGES */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase text-gray-500 block">
                // FILTER BY STARTUP STAGE:
              </span>
              <div className="flex flex-wrap gap-2">
                {STAGES.map(st => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStage(st.id)}
                    className={`px-3 py-1.5 text-[11px] font-black uppercase border-2 border-black transition-all cursor-pointer ${
                      selectedStage === st.id
                        ? 'bg-black text-[#FFDE59] shadow-[2px_2px_0px_#000] -translate-y-0.5'
                        : 'bg-[#FAF8F5] text-black hover:bg-white'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Pills: PROBLEM NICHES */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase text-gray-500 block">
                // FILTER BY PROBLEM NICHE / THESIS VERTICAL:
              </span>
              <div className="flex flex-wrap gap-2">
                {NICHES.map(nc => (
                  <button
                    key={nc.id}
                    onClick={() => setSelectedNiche(nc.id)}
                    className={`px-3 py-1.5 text-[11px] font-black uppercase border-2 border-black transition-all cursor-pointer ${
                      selectedNiche === nc.id
                        ? 'bg-black text-[#CCFF00] shadow-[2px_2px_0px_#000] -translate-y-0.5'
                        : 'bg-[#FAF8F5] text-black hover:bg-white'
                    }`}
                  >
                    {nc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Pills: INVESTOR TYPES */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase text-gray-500 block">
                // FILTER BY INVESTOR TYPE:
              </span>
              <div className="flex flex-wrap gap-2">
                {INVESTOR_TYPES.map(it => (
                  <button
                    key={it.id}
                    onClick={() => setSelectedType(it.id)}
                    className={`px-3 py-1.5 text-[11px] font-black uppercase border-2 border-black transition-all cursor-pointer ${
                      selectedType === it.id
                        ? 'bg-black text-[#00F0FF] shadow-[2px_2px_0px_#000] -translate-y-0.5'
                        : 'bg-[#FAF8F5] text-black hover:bg-white'
                    }`}
                  >
                    {it.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* INVESTOR DOSSIER CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredInvestors.map(investor => {
              const isSaved = savedInvestors.includes(investor.id);
              const matchScore = calculateMatchScore(investor);
              const hasApplied = applications.some(a => a.investorId === investor.id);

              return (
                <div
                  key={investor.id}
                  className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000] flex flex-col justify-between space-y-5 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all"
                >
                  <div className="space-y-4">
                    
                    {/* Top Row: Type & Match Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 bg-black text-[#FFDE59] text-[10px] font-black uppercase">
                          {investor.typeLabel}
                        </span>
                        <span className="px-2 py-0.5 bg-[#FAF8F5] border border-black text-[10px] font-black uppercase">
                          {investor.location}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSaveInvestor(investor.id)}
                          className={`p-1.5 border border-black transition-colors ${
                            isSaved ? 'bg-[#FFDE59] text-black' : 'bg-white text-gray-500 hover:text-black'
                          }`}
                          title={isSaved ? 'Saved to Watchlist' : 'Save to Watchlist'}
                        >
                          {isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                        </button>

                        <div className="px-2 py-0.5 bg-[#CCFF00] border-2 border-black font-black text-[11px] shadow-[2px_2px_0px_#000]">
                          {matchScore}% MATCH
                        </div>
                      </div>
                    </div>

                    {/* Investor Name & Niche */}
                    <div>
                      <h3 className="text-2xl font-black uppercase text-black leading-tight">
                        {investor.name}
                      </h3>
                      <div className="inline-block mt-1 px-2 py-0.5 bg-[#00F0FF]/20 border border-black text-[10px] font-black uppercase">
                        {investor.nicheLabel}
                      </div>
                    </div>

                    {/* Check Size & Stage Badges */}
                    <div className="p-3 bg-[#FAF8F5] border-2 border-black space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[10px] font-black uppercase text-gray-500">// TARGET CHECK:</span>
                        <span className="font-black text-emerald-800">{investor.checkSize}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[10px] font-black uppercase text-gray-500">// RESPONSE SLA:</span>
                        <span className="font-black text-purple-800">{investor.responseSla}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[10px] font-black uppercase text-gray-500">// STAGE MANDATE:</span>
                        <div className="flex gap-1">
                          {investor.stageLabels.map(st => (
                            <span key={st} className="px-1.5 py-0.2 bg-white border border-black text-[9px] font-black uppercase">
                              {st}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Thesis Description */}
                    <div>
                      <span className="text-[10px] font-black uppercase text-gray-500 block mb-1">
                        // CORE INVESTMENT THESIS:
                      </span>
                      <p className="text-xs font-bold text-gray-800 leading-relaxed">
                        {investor.thesis}
                      </p>
                    </div>

                    {/* Key Partners */}
                    <div>
                      <span className="text-[10px] font-black uppercase text-gray-500 block mb-1">
                        // KEY DECISION MAKERS / PARTNERS:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {investor.partners.map(p => (
                          <span key={p} className="px-2 py-0.5 bg-[#FAF8F5] border border-black text-[10px] font-black uppercase">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Notable Bets */}
                    <div>
                      <span className="text-[10px] font-black uppercase text-gray-500 block mb-1">
                        // NOTABLE PORTFOLIO BETS:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {investor.notableBets.map(bet => (
                          <span key={bet} className="px-2 py-0.5 bg-black text-[#FFDE59] text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]">
                            {bet}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t-2 border-black flex items-center justify-between gap-3">
                    <a
                      href={investor.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-[#FAF8F5] hover:bg-neutral-200 border-2 border-black text-[10px] font-black uppercase flex items-center gap-1.5 cursor-pointer"
                    >
                      <ExternalLink size={12} />
                      <span>DIRECT PORTAL</span>
                    </a>

                    <button
                      onClick={() => openPitchModal(investor)}
                      className={`flex-1 py-2.5 px-4 text-xs font-black uppercase border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        hasApplied
                          ? 'bg-[#CCFF00] text-black hover:bg-[#b8e600]'
                          : 'bg-black text-[#FFDE59] hover:bg-neutral-900'
                      }`}
                    >
                      <Send size={13} />
                      <span>{hasApplied ? 'TRANSMITTED (UPDATE PITCH)' : '⚡ APPLY / TRANSMIT PITCH'}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {filteredInvestors.length === 0 && (
            <div className="bg-white border-4 border-black p-12 text-center shadow-[8px_8px_0px_#000] space-y-3">
              <AlertTriangle size={32} className="mx-auto text-[#FF0033]" />
              <h3 className="text-xl font-black uppercase">NO INVESTORS MATCH YOUR CURRENT CRITERIA</h3>
              <p className="text-xs font-bold text-gray-600 uppercase max-w-md mx-auto">
                Try widening your problem vertical or resetting stage filters to view all active checkwriters.
              </p>
              <button
                onClick={() => {
                  setSelectedStage('all');
                  setSelectedNiche('all');
                  setSelectedType('all');
                  setSearchQuery('');
                }}
                className="mt-3 px-6 py-2 bg-black text-[#FFDE59] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]"
              >
                RESET ALL FILTERS
              </button>
            </div>
          )}

        </div>
      )}

      {/* ─── VIEW 2: AUTO-MATCHED FOR STARTUP ─── */}
      {viewTab === 'matched' && (
        <div className="space-y-6">
          
          {/* Match Context Header */}
          <div className="bg-[#FAF8F5] border-4 border-black p-6 shadow-[8px_8px_0px_#000] space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#CCFF00] border border-black" />
              <span className="text-xs font-black uppercase tracking-wider">
                CALIBRATED THESIS MATCHING // ACTIVE CONTEXT: [{companyData?.name || 'YOUR STARTUP'}]
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold pt-2">
              <div className="p-3 bg-white border-2 border-black">
                <span className="text-[10px] text-gray-500 uppercase block">// ACTIVE STAGE</span>
                <span className="text-sm font-black text-black">{companyData?.stage || 'Pre-Seed'}</span>
              </div>
              <div className="p-3 bg-white border-2 border-black">
                <span className="text-[10px] text-gray-500 uppercase block">// TARGET ROUND</span>
                <span className="text-sm font-black text-emerald-700">{companyData?.targetRaise || '$1.5M'}</span>
              </div>
              <div className="p-3 bg-white border-2 border-black">
                <span className="text-[10px] text-gray-500 uppercase block">// CORE WEDGE</span>
                <span className="text-xs font-black text-black truncate block">{companyData?.tagline || 'AI Intelligence'}</span>
              </div>
            </div>
          </div>

          {/* Matched Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {autoMatchedInvestors.map(investor => (
              <div
                key={investor.id}
                className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000] flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 bg-black text-[#CCFF00] text-[10px] font-black uppercase">
                        {investor.matchScore}% THESIS COMPATIBILITY
                      </span>
                      <h3 className="text-2xl font-black uppercase text-black mt-2">
                        {investor.name}
                      </h3>
                      <div className="text-[10px] font-black text-gray-600 uppercase mt-0.5">
                        {investor.typeLabel} • {investor.location}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-black uppercase text-gray-500 block">TYPICAL CHECK</span>
                      <span className="text-sm font-black text-emerald-800">{investor.checkSize}</span>
                    </div>
                  </div>

                  {/* Match Rationale Callout */}
                  <div className="p-3 bg-[#CCFF00]/15 border-2 border-black text-xs font-bold text-black space-y-1">
                    <span className="text-[10px] font-black uppercase text-black flex items-center gap-1">
                      <Sparkles size={12} /> WHY THIS INVESTOR MATCHES YOUR STARTUP:
                    </span>
                    <p className="text-[11px] leading-snug">
                      Focuses explicitly on {investor.nicheLabel} at the {investor.stageLabels.join('/')} stage. Track record backing high-velocity founders like {investor.notableBets.slice(0, 2).join(' & ')} aligns with your wedge.
                    </p>
                  </div>

                  <p className="text-xs font-bold text-gray-800 leading-relaxed">
                    {investor.thesis}
                  </p>

                  <div>
                    <span className="text-[10px] font-black uppercase text-gray-500 block mb-1">
                      // NOTABLE PORTFOLIO BETS:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {investor.notableBets.map(bet => (
                        <span key={bet} className="px-2 py-0.5 bg-black text-[#FFDE59] text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]">
                          {bet}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-black flex items-center justify-between gap-3">
                  <span className="text-[10px] font-black uppercase text-gray-600">
                    SLA: {investor.responseSla}
                  </span>
                  <button
                    onClick={() => openPitchModal(investor)}
                    className="py-2.5 px-6 bg-black hover:bg-neutral-900 text-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] cursor-pointer flex items-center gap-2"
                  >
                    <Send size={13} />
                    <span>⚡ TRANSMIT PITCH DOSSIER</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ─── VIEW 3: MY PITCH PIPELINE TRACKER ─── */}
      {viewTab === 'pipeline' && (
        <div className="space-y-6">
          
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black uppercase text-black">
                ACTIVE PITCH & DEALFLOW PIPELINE
              </h2>
              <p className="text-xs font-bold text-gray-600 uppercase mt-1">
                // TRACK DIRECT PITCH APPLICATIONS, PARTNER REVIEWS, AND TERM SHEET ADVANCEMENT
              </p>
            </div>
            
            <button
              onClick={() => setViewTab('explore')}
              className="px-4 py-2 bg-black text-[#FFDE59] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <Compass size={14} />
              <span>FIND MORE INVESTORS</span>
            </button>
          </div>

          {applications.length > 0 ? (
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b-3 border-black text-xs font-black uppercase text-black">
                    <th className="p-4 border-r-2 border-black">INVESTOR / FIRM</th>
                    <th className="p-4 border-r-2 border-black">TARGET PARTNER</th>
                    <th className="p-4 border-r-2 border-black">ROUND TARGET</th>
                    <th className="p-4 border-r-2 border-black">TRANSMITTED DATE</th>
                    <th className="p-4 border-r-2 border-black">CURRENT STATUS</th>
                    <th className="p-4">UPDATE STAGE</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black text-xs font-bold">
                  {applications.map(app => (
                    <tr key={app.id} className="hover:bg-[#FFDE59]/10 transition-colors">
                      <td className="p-4 border-r-2 border-black">
                        <div className="font-black text-sm uppercase text-black">{app.investorName}</div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase">{app.investorType}</div>
                      </td>
                      <td className="p-4 border-r-2 border-black">
                        <span className="px-2 py-0.5 bg-[#FAF8F5] border border-black uppercase text-[10px]">
                          {app.targetPartner || 'Investment Team'}
                        </span>
                      </td>
                      <td className="p-4 border-r-2 border-black font-black text-emerald-800">
                        {app.targetRaise}
                      </td>
                      <td className="p-4 border-r-2 border-black text-gray-700">
                        {app.submittedAt}
                      </td>
                      <td className="p-4 border-r-2 border-black">
                        <span className={`px-2 py-1 border border-black uppercase text-[10px] font-black inline-block shadow-[1px_1px_0px_#000] ${
                          app.status === 'TRANSMITTED' 
                            ? 'bg-[#FFDE59] text-black' 
                            : app.status === 'PARTNER_REVIEW' 
                              ? 'bg-[#00F0FF] text-black' 
                              : app.status === 'MEETING' 
                                ? 'bg-[#CCFF00] text-black' 
                                : 'bg-black text-white'
                        }`}>
                          {app.statusText}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'PARTNER_REVIEW', 'Under Partner Review')}
                            className="px-2 py-1 bg-white hover:bg-neutral-100 border border-black text-[9px] font-black uppercase cursor-pointer"
                            title="Mark Under Partner Review"
                          >
                            REVIEW
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'MEETING', 'Partner Pitch Booked')}
                            className="px-2 py-1 bg-[#CCFF00] hover:bg-[#b8e600] border border-black text-[9px] font-black uppercase cursor-pointer"
                            title="Mark Partner Pitch Booked"
                          >
                            MEETING
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'TERM_SHEET', 'Term Sheet Issued')}
                            className="px-2 py-1 bg-black text-[#FFDE59] border border-black text-[9px] font-black uppercase cursor-pointer"
                            title="Mark Term Sheet"
                          >
                            TERM SHEET
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white border-4 border-black p-12 text-center shadow-[8px_8px_0px_#000] space-y-4">
              <Coins size={36} className="mx-auto text-black" />
              <h3 className="text-xl font-black uppercase">NO ACTIVE PITCH APPLICATIONS YET</h3>
              <p className="text-xs font-bold text-gray-600 uppercase max-w-md mx-auto">
                Explore the verified angel and VC directory above to find investors targeting your exact stage and niche, then click Apply to transmit your direct pitch.
              </p>
              <button
                onClick={() => setViewTab('explore')}
                className="mt-2 px-6 py-3 bg-black text-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] cursor-pointer"
              >
                EXPLORE INVESTOR RADAR →
              </button>
            </div>
          )}

        </div>
      )}

      {/* ─── DIRECT PITCH APPLICATION MODAL ─── */}
      <AnimatePresence>
        {activeModalInvestor && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 font-mono overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-4 border-black p-6 sm:p-8 shadow-[12px_12px_0px_#000] max-w-3xl w-full my-8 space-y-6 max-h-[90vh] overflow-y-auto brutalist-scrollbar"
            >
              
              {/* Modal Window Bar */}
              <div className="flex items-center justify-between pb-4 border-b-3 border-black">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#FF0033] border border-black" />
                  <div className="w-3 h-3 bg-[#FFDE59] border border-black" />
                  <div className="w-3 h-3 bg-[#CCFF00] border border-black" />
                  <span className="ml-2 text-xs font-black uppercase text-black tracking-wider">
                    DIRECT PITCH TRANSMISSION PROTOCOL // TARGET: [{activeModalInvestor.name}]
                  </span>
                </div>
                <button
                  onClick={() => setActiveModalInvestor(null)}
                  className="p-1 border-2 border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {transmissionSuccess ? (
                <div className="p-8 bg-[#FAF8F5] border-3 border-black text-center space-y-4">
                  <div className="w-14 h-14 bg-[#CCFF00] border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center mx-auto text-black">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-black uppercase text-black">
                    PITCH DOSSIER TRANSMITTED SUCCESSFULLY
                  </h3>
                  <p className="text-xs font-bold text-gray-700 uppercase max-w-md mx-auto">
                    Your application package has been officially transmitted to {transmissionSuccess.investorName} under receipt protocol <span className="font-black text-black bg-[#FFDE59] px-1.5 py-0.5 border border-black">{transmissionSuccess.txId}</span>.
                  </p>
                  <div className="p-3 bg-white border-2 border-black text-xs font-black text-purple-900 w-max mx-auto">
                    ESTIMATED PARTNER REVIEW SLA: {transmissionSuccess.sla}
                  </div>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setActiveModalInvestor(null);
                        setViewTab('pipeline');
                      }}
                      className="px-6 py-3 bg-black text-[#FFDE59] border-2 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] cursor-pointer"
                    >
                      VIEW IN MY PIPELINE →
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleTransmitApplication} className="space-y-5">
                  
                  {/* Target Partner Context Banner */}
                  <div className="p-4 bg-[#FAF8F5] border-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase text-gray-500 block">DESTINATION FIRM & STAGE MANDATE</span>
                      <span className="text-base font-black text-black">{activeModalInvestor.name}</span>
                      <span className="text-xs font-bold text-gray-600 block">{activeModalInvestor.stageLabels.join(', ')} • {activeModalInvestor.nicheLabel}</span>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-[10px] font-black uppercase text-gray-500 block">TYPICAL CHECK</span>
                      <span className="text-sm font-black text-emerald-800">{activeModalInvestor.checkSize}</span>
                    </div>
                  </div>

                  {/* Grid Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase text-black block">STARTUP NAME *</label>
                      <input
                        type="text"
                        required
                        value={applicationForm.startupName}
                        onChange={(e) => setApplicationForm({ ...applicationForm, startupName: e.target.value })}
                        className="w-full p-2.5 bg-white border-2 border-black text-xs font-black uppercase focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase text-black block">TARGET ROUND & STAGE *</label>
                      <input
                        type="text"
                        required
                        value={applicationForm.targetRaise}
                        onChange={(e) => setApplicationForm({ ...applicationForm, targetRaise: e.target.value })}
                        className="w-full p-2.5 bg-white border-2 border-black text-xs font-black uppercase focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-black uppercase text-black block">HIGH-MOAT ONE-LINER (ELEVATOR WEDGE) *</label>
                      <input
                        type="text"
                        required
                        value={applicationForm.oneLiner}
                        onChange={(e) => setApplicationForm({ ...applicationForm, oneLiner: e.target.value })}
                        className="w-full p-2.5 bg-white border-2 border-black text-xs font-bold focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase text-black block">BLEEDING-NECK PROBLEM BEING KILLED *</label>
                      <textarea
                        rows="2"
                        required
                        value={applicationForm.problem}
                        onChange={(e) => setApplicationForm({ ...applicationForm, problem: e.target.value })}
                        className="w-full p-2.5 bg-white border-2 border-black text-xs font-bold focus:outline-none resize-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase text-black block">PROPOSED SOLUTION & ARCHITECTURAL MOAT *</label>
                      <textarea
                        rows="2"
                        required
                        value={applicationForm.solution}
                        onChange={(e) => setApplicationForm({ ...applicationForm, solution: e.target.value })}
                        className="w-full p-2.5 bg-white border-2 border-black text-xs font-bold focus:outline-none resize-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase text-black block">CURRENT TRACTION & REVENUE METRICS *</label>
                      <input
                        type="text"
                        required
                        value={applicationForm.tractionMetrics}
                        onChange={(e) => setApplicationForm({ ...applicationForm, tractionMetrics: e.target.value })}
                        placeholder="e.g. $18.4k MRR (+22% MoM), 14 Mo Runway"
                        className="w-full p-2.5 bg-white border-2 border-black text-xs font-bold focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase text-black block">PITCH DECK / DEMO URL *</label>
                      <input
                        type="url"
                        required
                        value={applicationForm.pitchDeckUrl}
                        onChange={(e) => setApplicationForm({ ...applicationForm, pitchDeckUrl: e.target.value })}
                        placeholder="https://hypers.io/deck/climatelens"
                        className="w-full p-2.5 bg-white border-2 border-black text-xs font-bold focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-black uppercase text-black flex items-center justify-between">
                        <span>WHY {activeModalInvestor.name.toUpperCase()}? (THESIS ALIGNMENT NOTE)</span>
                        <span className="text-[10px] text-gray-500 font-bold">// AI-CALIBRATED TO THESIS</span>
                      </label>
                      <textarea
                        rows="3"
                        value={applicationForm.customNote}
                        onChange={(e) => setApplicationForm({ ...applicationForm, customNote: e.target.value })}
                        className="w-full p-3 bg-white border-2 border-black text-xs font-bold focus:outline-none resize-none leading-relaxed"
                      />
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t-3 border-black flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveModalInvestor(null)}
                      className="px-5 py-2.5 bg-white hover:bg-neutral-100 border-2 border-black text-xs font-black uppercase cursor-pointer"
                    >
                      CANCEL
                    </button>

                    <button
                      type="submit"
                      className="flex-1 py-3 px-6 bg-black hover:bg-neutral-900 text-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send size={15} />
                      <span>TRANSMIT OFFICIAL APPLICATION TO {activeModalInvestor.name.toUpperCase()} →</span>
                    </button>
                  </div>

                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
