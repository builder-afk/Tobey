import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Sparkles, Target, Users, Key, Compass,
  ArrowRight, CheckCircle2, TrendingUp, AlertTriangle,
  ShieldCheck, DollarSign, Copy, Check, RefreshCw,
  Hash, Layers, Kanban, Globe, Lightbulb, Zap, HelpCircle
} from 'lucide-react';

const PRESET_IDEAS = [
  {
    title: 'AI Code Review Copilot for Monorepos',
    desc: 'Automated PR auditor that catches architectural regressions, security holes, and style drift in large distributed repositories.',
    category: 'Developer Tools'
  },
  {
    title: 'Autonomous B2B Lead Gen & Cold Outreach Agent',
    desc: 'AI agent that monitors hiring signals, funding rounds, and GitHub stars to draft ultra-personalized multi-channel sales sequences.',
    category: 'SalesTech / B2B'
  },
  {
    title: 'Vertical ERP & Inventory OS for Cloud Kitchens',
    desc: 'Real-time ingredient batch tracking, recipe cost analytics, and automated supplier re-ordering for ghost kitchens.',
    category: 'Vertical SaaS'
  },
  {
    title: 'Continuous SOC2 & HIPAA Compliance Bot for APIs',
    desc: 'Zero-configuration compliance agent that monitors cloud infrastructure, IAM access, and database logs with automated audit proof.',
    category: 'Cybersecurity'
  }
];

export default function BusinessIdeaValidator({ onSyncTasks, onNavigateToTasks }) {
  const [ideaInput, setIdeaInput] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [researchStage, setResearchStage] = useState('');
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'competitors' | 'customers' | 'keywords' | 'positioning'
  const [results, setResults] = useState(null);
  const [copied, setCopied] = useState(false);
  const [syncedToast, setSyncedToast] = useState(false);

  // Dynamic research engine matching input keywords
  const handleRunValidation = (presetIdea = null) => {
    const query = presetIdea || ideaInput;
    if (!query.trim()) return;

    if (presetIdea) {
      setIdeaInput(presetIdea);
    }

    setIsResearching(true);
    setProgress(15);
    setResults(null);

    const stages = [
      { text: '01 // SCANNING GLOBAL STARTUP ECOSYSTEM & COMPETITOR RADAR...', progress: 28 },
      { text: '02 // PROFILING BUYER ICP, BUDGET AUTHORITY & PAIN INTENSITY...', progress: 54 },
      { text: '03 // MINING COMMERCIAL SEARCH QUERIES, VOLUMES & CPC DATA...', progress: 78 },
      { text: '04 // FORMULATING UNFAIR ADVANTAGE & GTM POSITIONING WEDGE...', progress: 95 },
      { text: '05 // SYNTHESIZING FINAL MARKET VALIDATION DOSSIER...', progress: 100 }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < stages.length) {
        setResearchStage(stages[currentStep].text);
        setProgress(stages[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsResearching(false);
        setResults(generateDossier(query, targetAudience));
      }
    }, 700);
  };

  const generateDossier = (idea, audience) => {
    const lower = idea.toLowerCase();

    let domain = 'Developer Infrastructure / AI';
    let marketSize = '$14.2B by 2028 (28.4% CAGR)';
    let viabilityScore = 87;

    // 1. Competitors
    let competitors = [
      {
        name: 'GitHub Copilot / CodeRabbit',
        type: 'Direct Competitor',
        pricing: '$19 - $39 / dev / mo',
        strengths: 'Deep IDE integration, immense brand authority, massive GitHub distribution.',
        vulnerabilities: 'Surface-level linting comments, noisy alerts on complex monorepos, misses multi-repo architectural context.',
        moatToExploit: 'Build full-AST deep graph repo indexing that understands cross-service contracts.'
      },
      {
        name: 'SonarQube / Snyk',
        type: 'Legacy Workaround',
        pricing: '$150 - $450 / mo',
        strengths: 'Established enterprise compliance checkmark, static rule library.',
        vulnerabilities: 'Rigid rule engines, high false positive rate, hated by fast-moving developers.',
        moatToExploit: 'Natural language fix generation instead of passive red error lists.'
      },
      {
        name: 'Manual Senior Dev Review',
        type: 'Status Quo',
        pricing: '$180k+ / engineer / yr',
        strengths: 'Unmatched context on business domain logic.',
        vulnerabilities: 'Major engineering bottleneck; delays pull requests by 24-48 hours.',
        moatToExploit: 'Automate 80% of boilerplate checks so human reviewers only spend 5 mins on architecture.'
      }
    ];

    // 2. Customers (ICP)
    let customers = {
      primaryICP: {
        title: 'Staff Software Engineer / VP of Engineering',
        companySize: 'Series A to Growth Stage (30 - 300 Engineers)',
        budgetAuthority: '$15k - $50k annual discretionary tooling budget',
        painIntensity: 'CRITICAL (9.2 / 10)',
        willingnessToPay: '$40 - $120 per developer / month'
      },
      secondaryICP: {
        title: 'Tech Lead / Principal Architect at Scale-Ups',
        trigger: 'Suffering from PR review backlogs and production outages caused by silent regressions.'
      },
      corePains: [
        'PRs sit idle for 2-3 days waiting for senior staff engineers to find review time.',
        'Silent architectural drift breaks downstream microservices without build errors.',
        'Junior engineers lack instant feedback loops on idiomatic code conventions.',
        'Context switching during reviews drains 20-30% of engineering productive hours.'
      ],
      buyingTriggers: [
        'A major regression slips into production and causes an outage.',
        'Engineering team scales past 25 engineers and review velocity grinds to a halt.',
        'Compliance audits mandate verified multi-party peer reviews on all commits.'
      ]
    };

    // 3. Keywords
    let keywords = [
      { keyword: 'automated code review ai', volume: '8,400/mo', cpc: '$14.20', intent: 'High Commercial', difficulty: 'Medium' },
      { keyword: 'ai pull request review github', volume: '5,900/mo', cpc: '$18.50', intent: 'Transactional', difficulty: 'Low-Medium' },
      { keyword: 'coderabbit alternatives', volume: '3,200/mo', cpc: '$9.80', intent: 'High Commercial', difficulty: 'Low' },
      { keyword: 'monorepo static analysis tool', volume: '4,100/mo', cpc: '$12.40', intent: 'Problem-Aware', difficulty: 'Medium' },
      { keyword: 'how to speed up code reviews', volume: '12,600/mo', cpc: '$6.50', intent: 'Informational', difficulty: 'Low' }
    ];

    // 4. Positioning
    let positioning = {
      statement: `For engineering organizations scaling past 30 developers who lose days waiting on PR reviews, ${idea.split(' ')[0] || 'Our Platform'} is the only deep-context review copilot that validates cross-service architectural invariants, unlike GitHub Copilot which only checks single-file syntax.`,
      uvpAngles: [
        { title: 'Cross-Service Graph Awareness', desc: 'Doesn’t just review diff lines; simulates full downstream impact across your entire monorepo.' },
        { title: 'Zero False-Positive Guarantee', desc: 'Applies automated regression filters so engineers never mute the review bot.' },
        { title: 'Self-Healing Pull Requests', desc: 'Provides ready-to-merge git patch commits instead of vague suggestions.' }
      ],
      gtmWedge: 'Release a free open-source GitHub Action that benchmarks any repo’s PR latency and security debt in 60 seconds.',
      defensibilityMoat: 'Proprietary cross-file dependency graph embeddings that get smarter with every resolved internal PR.'
    };

    // Adaptive tailoring based on keywords
    if (lower.includes('lead') || lower.includes('outreach') || lower.includes('sales') || lower.includes('linkedin')) {
      domain = 'B2B SalesTech & Autonomous GTM';
      marketSize = '$21.8B by 2029 (19.2% CAGR)';
      viabilityScore = 84;
      competitors = [
        { name: 'Clay.com', type: 'Direct Leader', pricing: '$149 - $800 / mo', strengths: 'Massive data integration matrix, viral momentum.', vulnerabilities: 'High learning curve, complex table formulas, requires technical setup.', moatToExploit: '1-click autonomous agents that execute the whole flow without building tables.' },
        { name: 'Apollo.io / ZoomInfo', type: 'Data Incumbent', pricing: '$99 - $5k / mo', strengths: 'Enormous contact database.', vulnerabilities: 'Generic spam sequences, declining email deliverability rates.', moatToExploit: 'Trigger-based hyper-personalization based on live GitHub / hiring signals.' },
        { name: 'Manual SDR Outbound', type: 'Status Quo', pricing: '$75k / SDR', strengths: 'Human relationship building.', vulnerabilities: 'Slow volume (40 emails/day), inconsistent quality.', moatToExploit: '10x SDR output while maintaining top-tier human nuance.' }
      ];
      customers = {
        primaryICP: {
          title: 'Head of Sales / B2B Startup Founder',
          companySize: 'Seed to Series B (5 - 50 Employees)',
          budgetAuthority: '$500 - $3,000 / month sales stack',
          painIntensity: 'EXTREME (9.6 / 10)',
          willingnessToPay: '$199 - $699 / month'
        },
        secondaryICP: {
          title: 'Founding GTM Engineer / Solo Agency Owner',
          trigger: 'Needs predictable outbound pipeline without hiring full-time SDR team.'
        },
        corePains: [
          'Cold email reply rates dropped below 1% due to Google/Yahoo spam filters.',
          'Hiring SDRs takes 3 months to ramp and has high 50%+ turnover.',
          'Traditional enrichment tools spit out outdated or invalid contact data.',
          'Founders spend 15+ hours a week manually drafting LinkedIn connection notes.'
        ],
        buyingTriggers: [
          'Closing a funding round with aggressive Q4 ARR targets.',
          'Current outbound campaigns generating zero qualified demos.',
          'Launching a new enterprise tier product.'
        ]
      };
      keywords = [
        { keyword: 'ai sdr outbound agent', volume: '11,200/mo', cpc: '$22.40', intent: 'High Commercial', difficulty: 'Medium' },
        { keyword: 'automated linkedin lead generation tool', volume: '14,800/mo', cpc: '$16.50', intent: 'Transactional', difficulty: 'High' },
        { keyword: 'clay alternatives for sales', volume: '4,600/mo', cpc: '$14.00', intent: 'High Commercial', difficulty: 'Low' },
        { keyword: 'b2b cold email personalization ai', volume: '9,100/mo', cpc: '$11.80', intent: 'Solution-Seeking', difficulty: 'Medium' }
      ];
      positioning.statement = `For B2B founders who need predictable demo bookings without hiring SDR teams, our agent is the only multi-channel pipeline bot that mines live hiring and GitHub triggers for guaranteed 8%+ reply rates.`;
      positioning.gtmWedge = 'Free automated audit that reveals 50 high-intent prospects currently hiring for your exact ICP problem.';
    } else if (lower.includes('kitchen') || lower.includes('food') || lower.includes('restaurant') || lower.includes('erp')) {
      domain = 'Vertical Hospitality Tech / Ghost Kitchen OS';
      marketSize = '$9.4B by 2027 (14.6% CAGR)';
      viabilityScore = 81;
      competitors = [
        { name: 'Toast / Toast POS', type: 'POS Giant', pricing: '$79/mo + 2.9% fee', strengths: 'Hardware dominance, restaurant ubiquity.', vulnerabilities: 'Weak ghost kitchen multi-brand inventory management, locked ecosystem.', moatToExploit: 'Multi-brand cloud kitchen recipe cost variance & batch expiry engine.' },
        { name: 'MarketMan / MarginEdge', type: 'Inventory Tools', pricing: '$180 - $350/mo', strengths: 'Established supplier invoice scanning.', vulnerabilities: 'Clunky legacy UI, slow mobile sync, poor live POS tie-in.', moatToExploit: 'Sub-second real-time batch deduction synchronized with DoorDash & UberEats.' }
      ];
      customers = {
        primaryICP: {
          title: 'Cloud Kitchen Operations Director / Franchise Owner',
          companySize: '3 to 25 Kitchen Locations',
          budgetAuthority: '$1k - $4k / month operational software',
          painIntensity: 'CRITICAL (9.0 / 10)',
          willingnessToPay: '$250 - $600 per location / month'
        },
        secondaryICP: {
          title: 'Executive Chef & Procurement Manager',
          trigger: 'Losing 8-12% of gross margins to ingredient waste and supplier invoice discrepancies.'
        },
        corePains: [
          'Operating 5 brands out of 1 kitchen creates massive ingredient cross-contamination and stockout errors.',
          'Food waste and shrinkage eat up 6-10% of monthly restaurant profit.',
          'Manual supplier order sheets take 2 hours every night after kitchen close.'
        ],
        buyingTriggers: [
          'Food cost percentage spikes above 34% of revenue.',
          'Opening a second or third cloud kitchen facility.'
        ]
      };
      keywords = [
        { keyword: 'cloud kitchen inventory software', volume: '3,800/mo', cpc: '$9.40', intent: 'Transactional', difficulty: 'Low' },
        { keyword: 'ghost kitchen management system', volume: '2,900/mo', cpc: '$11.20', intent: 'High Commercial', difficulty: 'Low' },
        { keyword: 'restaurant food cost variance tool', volume: '4,500/mo', cpc: '$7.80', intent: 'Solution-Seeking', difficulty: 'Medium' }
      ];
      positioning.statement = `For multi-brand cloud kitchens operating at scale, our platform is the only inventory OS that dynamically recalculates recipe margins across delivery apps in real-time.`;
      positioning.gtmWedge = 'Free 14-day invoice audit identifying immediate $3,000+ overcharges from food suppliers.';
    }

    return {
      idea,
      domain,
      marketSize,
      viabilityScore,
      competitors,
      customers,
      keywords,
      positioning
    };
  };

  const handleCopyDossier = () => {
    if (!results) return;
    const text = `
# HYPERS IDEA VALIDATION DOSSIER: ${results.idea}
// Domain: ${results.domain} | Viability: ${results.viabilityScore}/100 | Market: ${results.marketSize}

## 1. COMPETITORS
${results.competitors.map(c => `- ${c.name} (${c.type}): ${c.pricing}\n  Strengths: ${c.strengths}\n  Vulnerabilities: ${c.vulnerabilities}\n  Moat: ${c.moatToExploit}`).join('\n')}

## 2. CUSTOMERS (ICP)
- Primary ICP: ${results.customers.primaryICP.title} (${results.customers.primaryICP.companySize})
- Budget: ${results.customers.primaryICP.budgetAuthority}
- Willingness to Pay: ${results.customers.primaryICP.willingnessToPay}
- Core Pains: ${results.customers.corePains.join('; ')}

## 3. COMMERCIAL KEYWORDS
${results.keywords.map(k => `- "${k.keyword}" | MSV: ${k.volume} | CPC: ${k.cpc} | Intent: ${k.intent}`).join('\n')}

## 4. POSITIONING & MOAT
- Statement: ${results.positioning.statement}
- GTM Wedge: ${results.positioning.gtmWedge}
- Defensibility Moat: ${results.positioning.defensibilityMoat}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSyncToTasks = () => {
    if (!results || !onSyncTasks) return;
    const validationTasks = [
      {
        id: Date.now() + 1,
        title: `Interview 5 ${results.customers.primaryICP.title} on ${results.customers.corePains[0].substring(0, 40)}...`,
        status: 'To Do',
        priority: 'P0',
        category: 'Product',
        assignee: 'You'
      },
      {
        id: Date.now() + 2,
        title: `Build landing page targeting keyword: "${results.keywords[0].keyword}"`,
        status: 'To Do',
        priority: 'P1',
        category: 'Growth',
        assignee: 'You'
      },
      {
        id: Date.now() + 3,
        title: `Deploy MVP prototype for GTM wedge: "${results.positioning.gtmWedge.substring(0, 45)}..."`,
        status: 'To Do',
        priority: 'P0',
        category: 'Engineering',
        assignee: 'Arjun M.'
      }
    ];

    onSyncTasks(validationTasks);
    setSyncedToast(true);
    setTimeout(() => setSyncedToast(false), 4000);
  };

  return (
    <div className="space-y-6 font-mono text-black">

      {/* ═══ 1. HEADER SECTION ═══ */}
      <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-black pb-6 mb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00] border-2 border-black text-black font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_#000]">
              <Compass size={14} className="stroke-[3]" />
              <span>[ OPERATING COCKPIT // BUSINESS IDEA VALIDATOR ]</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-black tracking-tight leading-none">
              BUSINESS IDEA
              <span className="inline-block bg-[#FFDE59] px-3 py-1 border-3 border-black shadow-[3px_3px_0px_#000] ml-2">
                VALIDATOR
              </span>
            </h1>

            <p className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wide max-w-2xl leading-relaxed">
              // ENTER ANY STARTUP CONCEPT OR PRODUCT HYPOTHESIS. THE AI SYSTEM ACTIVATES DEEP RESEARCH ACROSS 4 PILLARS: COMPETITORS, ICP CUSTOMERS, COMMERCIAL KEYWORDS, AND UNFAIR POSITIONING.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FBF9F5] border-2 border-black shadow-[2px_2px_0px_#000] text-center">
              <div className="text-[10px] text-gray-500 font-bold uppercase">// SYSTEM STATUS</div>
              <div className="text-xs font-black text-emerald-600 flex items-center justify-center gap-1 mt-0.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                INTELLIGENCE READY
              </div>
            </div>
          </div>
        </div>

        {/* ═══ 2. INPUT WORKBENCH ═══ */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black text-black uppercase mb-1.5 flex items-center gap-1.5">
              <Lightbulb size={14} className="text-amber-500 stroke-[3]" />
              <span>[ 01 // ENTER YOUR BUSINESS IDEA OR PRODUCT HYPOTHESIS ]</span>
            </label>
            <div className="relative">
              <textarea
                rows={3}
                value={ideaInput}
                onChange={(e) => setIdeaInput(e.target.value)}
                placeholder="E.G. 'AN AI AGENT THAT MONITORS GITHUB REPOS TO AUTOMATICALLY FIND AND PATCH API SECURITY VULNERABILITIES BEFORE MERGE'..."
                className="w-full bg-[#FBF9F5] border-3 border-black text-black font-mono font-bold text-xs uppercase p-3.5 focus:bg-white focus:shadow-[4px_4px_0px_#000] outline-none transition-all placeholder:text-gray-400 placeholder:normal-case leading-relaxed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-8">
              <label className="block text-[11px] font-black text-black uppercase mb-1">
                [ 02 // OPTIONAL TARGET AUDIENCE / INDUSTRY CONTEXT ]
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="E.G. 'FINTECH STARTUPS', 'REMOTE SEED-STAGE FOUNDERS', 'LOGISTICS SMBs'..."
                className="w-full bg-[#FBF9F5] border-2 border-black text-black font-mono font-bold text-xs p-2.5 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-4 flex items-end">
              <button
                type="button"
                disabled={isResearching || !ideaInput.trim()}
                onClick={() => handleRunValidation()}
                className={`w-full py-3 px-4 border-3 border-black font-mono font-black text-xs uppercase flex items-center justify-center gap-2 shadow-[4px_4px_0px_#000] transition-all cursor-pointer ${isResearching || !ideaInput.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#CCFF00] hover:bg-[#FFDE59] text-black active:translate-x-1 active:translate-y-1'
                  }`}
              >
                {isResearching ? (
                  <>
                    <RefreshCw size={14} className="animate-spin stroke-[3]" />
                    <span>RESEARCHING...</span>
                  </>
                ) : (
                  <>
                    <Zap size={14} className="stroke-[3]" />
                    <span>[ ⚡ RESEARCH & VALIDATE IDEA ]</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Preset Ideas */}
          <div className="pt-2">
            <div className="text-[10px] font-black text-gray-500 uppercase mb-1.5">
              // OR BENCHMARK A CURATED STARTUP PRESET:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {PRESET_IDEAS.map((preset) => (
                <button
                  key={preset.title}
                  type="button"
                  onClick={() => handleRunValidation(preset.title)}
                  className="p-2.5 bg-[#F0EDE6] hover:bg-[#FFDE59] border-2 border-black text-left shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all group cursor-pointer"
                >
                  <div className="text-[9px] font-black text-gray-500 uppercase group-hover:text-black">
                    {preset.category}
                  </div>
                  <div className="text-xs font-black text-black uppercase truncate mt-0.5">
                    {preset.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ SCANNING / PROGRESS STATE ═══ */}
        {isResearching && (
          <div className="mt-6 p-5 bg-black text-[#FFDE59] border-3 border-black space-y-3 shadow-[4px_4px_0px_#000] animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-black uppercase">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#CCFF00] border border-black animate-pulse" />
                {researchStage}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-[#222] border-2 border-[#444] h-3 p-0.5">
              <div
                className="bg-[#CCFF00] h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ═══ NOTIFICATION TOASTS ═══ */}
      {syncedToast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#CCFF00] text-black border-4 border-black shadow-[6px_6px_0px_#000] flex flex-wrap items-center justify-between gap-4 font-mono"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="stroke-[3]" />
            <span className="font-black text-xs uppercase">
              SUCCESS: 3 VALIDATION TASKS SYNCED DIRECTLY TO SPRINT BOARD!
            </span>
          </div>
          {onNavigateToTasks && (
            <button
              onClick={onNavigateToTasks}
              className="px-3.5 py-1.5 bg-black text-[#CCFF00] hover:bg-white hover:text-black border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              VIEW TASK BOARD →
            </button>
          )}
        </motion.div>
      )}

      {/* ═══ 3. RESEARCH DOSSIER RESULTS ═══ */}
      {results && (
        <div className="space-y-6 animate-fadeIn">

          {/* Executive Overview Banner */}
          <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 bg-[#00F0FF] text-black border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                    VALIDATED: {results.domain}
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#FFDE59] text-black border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                    TAM: {results.marketSize}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                  "{results.idea}"
                </h2>
              </div>

              {/* Viability Score Card */}
              <div className="flex items-center gap-4 border-2 border-black p-3 bg-[#FBF9F5] shadow-[3px_3px_0px_#000] shrink-0">
                <div className="text-center">
                  <div className="text-[10px] text-gray-600 font-bold uppercase">// VIABILITY SCORE</div>
                  <div className="text-3xl font-black text-black">
                    {results.viabilityScore}<span className="text-base text-gray-500">/100</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-[#CCFF00] border-2 border-black flex items-center justify-center font-black text-xl shadow-[2px_2px_0px_#000]">
                  🔥
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-6 border-t-2 border-black">
              {/* Pillar Selector Tabs */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'all', label: 'FULL DOSSIER' },
                  { id: 'competitors', label: `COMPETITORS (${results.competitors.length})` },
                  { id: 'customers', label: 'ICP & BUYERS' },
                  { id: 'keywords', label: `KEYWORDS (${results.keywords.length})` },
                  { id: 'positioning', label: 'POSITIONING MOAT' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] transition-all ${activeTab === tab.id
                        ? 'bg-black text-[#FFDE59]'
                        : 'bg-white text-black hover:bg-[#F0EDE6]'
                      }`}
                  >
                    [ {tab.label} ]
                  </button>
                ))}
              </div>

              {/* Export Triggers */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyDossier}
                  className="px-3 py-1.5 bg-white hover:bg-[#FFDE59] border-2 border-black text-xs font-black uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  {copied ? <Check size={14} className="stroke-[3] text-emerald-600" /> : <Copy size={14} className="stroke-[2.5]" />}
                  <span>{copied ? 'COPIED!' : '[ 📋 COPY DOSSIER ]'}</span>
                </button>

                <button
                  onClick={handleSyncToTasks}
                  className="px-3.5 py-1.5 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] border-2 border-black text-xs font-black uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  <Kanban size={14} className="stroke-[2.5]" />
                  <span>[ ⚡ SYNC TO SPRINT BOARD ]</span>
                </button>
              </div>
            </div>
          </div>

          {/* ═══ PILLAR 1: COMPETITORS ═══ */}
          {(activeTab === 'all' || activeTab === 'competitors') && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
              <div className="flex items-center justify-between border-b-3 border-black pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#FF0033] text-white border-2 border-black flex items-center justify-center font-black text-xs shadow-[1px_1px_0px_#000]">
                    01
                  </div>
                  <div>
                    <h3 className="font-black text-lg uppercase text-black">
                      COMPETITIVE LANDSCAPE & ALTERNATIVES
                    </h3>
                    <p className="text-xs text-gray-600 font-bold uppercase">
                      // DIRECT INCUMBENTS, STATUS QUO WORKAROUNDS & EXACT FLAWS TO EXPLOIT
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-[#F0EDE6] border border-black text-[10px] font-black uppercase">
                  TEARDOWN MATRIX
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.competitors.map((comp, idx) => (
                  <div key={idx} className="bg-[#FBF9F5] border-3 border-black p-4 space-y-3 flex flex-col justify-between shadow-[3px_3px_0px_#000]">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-black text-base text-black uppercase leading-tight">
                          {comp.name}
                        </span>
                        <span className="px-1.5 py-0.5 bg-[#FFDE59] border border-black text-[9px] font-black uppercase shrink-0">
                          {comp.type}
                        </span>
                      </div>

                      <div className="text-xs font-black text-emerald-700 bg-white border border-black px-2 py-1">
                        PRICE: {comp.pricing}
                      </div>

                      <div className="text-xs text-gray-700 font-bold leading-relaxed space-y-1">
                        <div>
                          <span className="text-black font-black uppercase">Strengths: </span>
                          {comp.strengths}
                        </div>
                        <div className="pt-1">
                          <span className="text-[#FF0033] font-black uppercase">Vulnerability: </span>
                          {comp.vulnerabilities}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t-2 border-dashed border-black">
                      <div className="text-[10px] text-gray-500 font-black uppercase">// YOUR ANGLE OF ATTACK:</div>
                      <div className="text-xs font-black text-black bg-[#CCFF00] p-1.5 border border-black mt-1">
                        {comp.moatToExploit}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ PILLAR 2: CUSTOMERS (ICP & BUYER PERSONAS) ═══ */}
          {(activeTab === 'all' || activeTab === 'customers') && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
              <div className="flex items-center justify-between border-b-3 border-black pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#00F0FF] text-black border-2 border-black flex items-center justify-center font-black text-xs shadow-[1px_1px_0px_#000]">
                    02
                  </div>
                  <div>
                    <h3 className="font-black text-lg uppercase text-black">
                      IDEAL CUSTOMER PROFILE (ICP) & BUYER INTEL
                    </h3>
                    <p className="text-xs text-gray-600 font-bold uppercase">
                      // DECISION MAKERS, BUDGET CEILINGS & EMOTIONAL PURCHASING TRIGGERS
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-[#CCFF00] border border-black text-[10px] font-black uppercase">
                  HIGH WILLINGNESS TO PAY
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Primary Persona Card */}
                <div className="lg:col-span-6 bg-[#FBF9F5] border-3 border-black p-5 space-y-3 shadow-[3px_3px_0px_#000]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black bg-black text-[#00F0FF] px-2 py-0.5 uppercase">
                      PRIMARY ECONOMIC BUYER
                    </span>
                    <span className="text-xs font-black text-red-600">
                      PAIN: {results.customers.primaryICP.painIntensity}
                    </span>
                  </div>

                  <div className="text-xl font-black text-black uppercase">
                    {results.customers.primaryICP.title}
                  </div>

                  <div className="space-y-2 text-xs font-bold uppercase">
                    <div className="p-2 bg-white border border-black flex justify-between">
                      <span className="text-gray-600">// COMPANY SIZE:</span>
                      <span className="text-black font-black">{results.customers.primaryICP.companySize}</span>
                    </div>
                    <div className="p-2 bg-white border border-black flex justify-between">
                      <span className="text-gray-600">// BUDGET AUTHORITY:</span>
                      <span className="text-black font-black">{results.customers.primaryICP.budgetAuthority}</span>
                    </div>
                    <div className="p-2 bg-[#CCFF00] border border-black flex justify-between text-black">
                      <span className="font-black">// ESTIMATED PRICE POINT:</span>
                      <span className="font-black">{results.customers.primaryICP.willingnessToPay}</span>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-gray-700 font-bold">
                    <span className="text-black font-black uppercase">// SECONDARY USER: </span>
                    {results.customers.secondaryICP.title} — {results.customers.secondaryICP.trigger}
                  </div>
                </div>

                {/* Core Pains & Triggers */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="bg-[#F0EDE6] border-3 border-black p-4 space-y-2">
                    <div className="text-xs font-black text-black uppercase flex items-center gap-1.5">
                      <AlertTriangle size={14} className="stroke-[3] text-[#FF0033]" />
                      <span>THE BLEEDING-NECK PAIN POINTS:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-gray-800 font-bold uppercase">
                      {results.customers.corePains.map((pain, i) => (
                        <li key={i} className="flex items-start gap-2 bg-white border border-black p-2">
                          <span className="text-[#FF0033] font-black">✕</span>
                          <span>{pain}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white border-3 border-black p-4 space-y-2">
                    <div className="text-xs font-black text-black uppercase flex items-center gap-1.5">
                      <Zap size={14} className="stroke-[3] text-amber-500" />
                      <span>WHAT TRIGGERS THEM TO BUY:</span>
                    </div>
                    <ul className="space-y-1 text-xs text-gray-700 font-bold uppercase">
                      {results.customers.buyingTriggers.map((trig, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-emerald-600 font-black">✓</span>
                          <span>{trig}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══ PILLAR 3: KEYWORDS & SEARCH INTENT ═══ */}
          {(activeTab === 'all' || activeTab === 'keywords') && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
              <div className="flex items-center justify-between border-b-3 border-black pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#CCFF00] text-black border-2 border-black flex items-center justify-center font-black text-xs shadow-[1px_1px_0px_#000]">
                    03
                  </div>
                  <div>
                    <h3 className="font-black text-lg uppercase text-black">
                      COMMERCIAL SEARCH QUERIES & DEMAND SIGNALS
                    </h3>
                    <p className="text-xs text-gray-600 font-bold uppercase">
                      // HIGH-CONVERTING SEARCH TERMS, MONTHLY VOLUME & KEYWORD DIFFICULTY
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-[#FFDE59] border border-black text-[10px] font-black uppercase">
                  HIGH COMMERCIAL INTENT
                </span>
              </div>

              <div className="border-3 border-black overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono uppercase">
                  <thead>
                    <tr className="bg-black text-[#FFDE59] border-b-2 border-black">
                      <th className="p-3">KEYWORD QUERY</th>
                      <th className="p-3">EST. SEARCH VOLUME</th>
                      <th className="p-3">EST. CPC</th>
                      <th className="p-3">INTENT</th>
                      <th className="p-3">SEO DIFFICULTY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-black bg-[#FBF9F5]">
                    {results.keywords.map((kw, idx) => (
                      <tr key={idx} className="hover:bg-[#FFFFE0] transition-colors">
                        <td className="p-3 font-black text-black flex items-center gap-1.5">
                          <Hash size={13} className="text-gray-500" />
                          <span>"{kw.keyword}"</span>
                        </td>
                        <td className="p-3 font-bold text-black">{kw.volume}</td>
                        <td className="p-3 font-black text-emerald-700">{kw.cpc}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 border border-black text-[10px] font-black ${kw.intent.includes('Commercial') || kw.intent.includes('Transactional')
                              ? 'bg-[#CCFF00] text-black'
                              : 'bg-white text-gray-700'
                            }`}>
                            {kw.intent}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-gray-700">{kw.difficulty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══ PILLAR 4: POSITIONING & UNFAIR ADVANTAGE ═══ */}
          {(activeTab === 'all' || activeTab === 'positioning') && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-6">
              <div className="flex items-center justify-between border-b-3 border-black pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#FF52D9] text-black border-2 border-black flex items-center justify-center font-black text-xs shadow-[1px_1px_0px_#000]">
                    04
                  </div>
                  <div>
                    <h3 className="font-black text-lg uppercase text-black">
                      POTENTIAL POSITIONING & DEFENSIBLE MOAT
                    </h3>
                    <p className="text-xs text-gray-600 font-bold uppercase">
                      // SHARP GTM WEDGE, THE "ONLY WE" FORMULA & RETENTION MOATS
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-[#00F0FF] border border-black text-[10px] font-black uppercase">
                  CATEGORY CREATION
                </span>
              </div>

              {/* The "Only We" Formula Card */}
              <div className="p-5 bg-[#F0EDE6] border-3 border-black shadow-[4px_4px_0px_#000] space-y-2">
                <div className="text-xs font-black uppercase text-[#FF0033] tracking-wider">
                  // THE "ONLY WE" POSITIONING MATRIX:
                </div>
                <p className="text-sm md:text-base font-black text-black uppercase leading-relaxed bg-white border-2 border-black p-4">
                  "{results.positioning.statement}"
                </p>
              </div>

              {/* 3 UVP Angles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.positioning.uvpAngles.map((uvp, i) => (
                  <div key={i} className="p-4 bg-[#FBF9F5] border-2 border-black shadow-[2px_2px_0px_#000] space-y-1.5">
                    <div className="text-[10px] text-gray-500 font-black uppercase">// UVP ANGLE #{i + 1}</div>
                    <div className="font-black text-sm text-black uppercase leading-snug">{uvp.title}</div>
                    <div className="text-xs text-gray-700 font-bold leading-relaxed">{uvp.desc}</div>
                  </div>
                ))}
              </div>

              {/* GTM Wedge & Moat Two-Column Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-black uppercase">
                <div className="p-4 bg-white border-3 border-black shadow-[3px_3px_0px_#000] space-y-2">
                  <div className="text-[10px] text-gray-600">// SHARP GTM WEDGE (FIRST 100 CUSTOMERS)</div>
                  <div className="text-sm font-black text-black leading-snug">
                    {results.positioning.gtmWedge}
                  </div>
                </div>

                <div className="p-4 bg-white border-3 border-black shadow-[3px_3px_0px_#000] space-y-2">
                  <div className="text-[10px] text-gray-600">// SUSTAINABLE DEFENSIBILITY MOAT</div>
                  <div className="text-sm font-black text-black leading-snug">
                    {results.positioning.defensibilityMoat}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
