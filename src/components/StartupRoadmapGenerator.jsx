import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Map, Milestone, Zap, Target, Shield, Rocket, CheckCircle2,
  AlertTriangle, RotateCcw, Download, Copy, Check, ChevronRight,
  Filter, Layers, ArrowRight, DollarSign, Clock, Users, Flame,
  FileText, TrendingUp, Sliders, Play, CheckSquare, Square,
  Building, ExternalLink, Sparkles, BookOpen, AlertOctagon, HelpCircle,
  Activity, AlertCircle
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// COMPREHENSIVE ACTIONABLE STARTUP ROADMAP DATA & TEMPLATES
// ═══════════════════════════════════════════════════════════════

const BASE_ROADMAP_PHASES = [
  {
    id: 'survival',
    phaseNumber: '01',
    title: 'PHASE 1: SURVIVAL & DEFAULT ALIVE TRIAGE',
    timeframe: 'DAYS 1 — 30 (MONTH 1)',
    badge: 'SURVIVAL MODE',
    badgeColor: 'bg-[#FF0033] text-white',
    accentColor: 'bg-[#FF0033]',
    borderColor: 'border-[#FF0033]',
    icon: Flame,
    summary: 'Eliminate non-essential burn, stop building speculative features, and secure fast survival cash to extend runway past the danger zone.',
    kpiBenchmark: 'Runway extended ≥ 3 months · Zero-ROI burn reduced by ≥ 35% · ≥ 3 paid pilots secured',
    tasks: [
      {
        id: 'surv-1',
        title: 'Ruthless Burn Triage & Default-Alive Calculation',
        category: 'Finance & Survival',
        timeframe: 'Day 1 - 7',
        priority: 'P0 CRITICAL',
        deliverable: 'Default-Alive Cashflow Model',
        kpi: 'Cut monthly burn by 25-40% within 7 days',
        sop: [
          'Audit all recurring SaaS subscriptions and team expenses. Kill any tool not strictly required to close a customer or keep the server live.',
          'Calculate your exact "Default Alive" metric: (Current Cash / Monthly Net Burn). If < 6 months, you are Default Dead and must cut burn immediately.',
          'Freeze all non-essential hiring and marketing ad spend until customer willingness to pay is validated with cash in bank.',
          'Establish a daily cash telemetry dashboard visible to all co-founders.'
        ],
        templateSnippet: `DEFAULT ALIVE AUDIT CHECKLIST:
1. Cash Balance in Bank: $____
2. Monthly Gross Burn: $____
3. Monthly Revenue: $____
4. Net Monthly Burn (2 - 3): $____
5. Months of Runway (1 / 4): ____ Months
[CRITICAL RULE]: If Runway < 6 months, freeze all discretionary spend and execute survival pilot outreach immediately.`
      },
      {
        id: 'surv-2',
        title: 'Ruthless Scope Amputation (Kill Zombie Features)',
        category: 'Product & Eng',
        timeframe: 'Day 8 - 14',
        priority: 'P0 CRITICAL',
        deliverable: '1-Core Workflow Product Spec',
        kpi: 'Remove 70% of backlog tickets; ship 1 razor-sharp core loop',
        sop: [
          'Identify the single core job-to-be-done that users actually care about. Delete or hide 70% of side features, settings, and complex analytics.',
          'Replace unfinished complex automated modules with "Concierge MVP" manual founder workflows (do things that don’t scale behind the scenes).',
          'Ensure the core workflow has zero critical bugs and delivers value in under 180 seconds.',
          'Set up error tracking (Sentry) and funnel analytics (PostHog) on the single primary action.'
        ],
        templateSnippet: `CONCIERGE MVP SCOPING FRAMEWORK:
- Core Job to be Done: What is the 1 task the customer is hiring your tool for?
- Features to Amputate: Multi-tenancy, custom roles, dark mode, complex export, secondary integrations.
- Manual Workaround: Founder manually processes data uploads or writes manual report overnight to test value before engineering automation.`
      },
      {
        id: 'surv-3',
        title: 'Emergency Founder-Led Outbound Campaign',
        category: 'Validation & GTM',
        timeframe: 'Day 15 - 24',
        priority: 'P0 CRITICAL',
        deliverable: '50 Hyper-Targeted Outbound Sequences',
        kpi: '50 targeted cold reach-outs -> 10 discovery calls booked',
        sop: [
          'Build a hyper-specific list of 50 exact buyers experiencing the hair-on-fire problem today (Search Apollo/LinkedIn Sales Navigator).',
          'Write a concise, 4-sentence email addressing their specific pain point without pitching a generic product.',
          'Offer a white-glove, no-risk "Founding Partner Pilot" where the founders personally guarantee outcomes.',
          'Aim to book 10 Zoom discovery calls within 10 business days.'
        ],
        templateSnippet: `FOUNDER COLD OUTREACH SCRIPT:
Subject: Quick question about [Specific Bottleneck, e.g. ERP carbon reporting]
"Hi [First Name],
Saw you lead operations at [Company]. Most ops leaders I speak with in [Industry] are losing 15+ hours weekly manually reconciling [Specific Pain Point].
We built an automated pipeline that cuts that turnaround to under 30 seconds.
Not selling you anything today—just looking for 12 minutes to see if this matches how your team handles [Process]? Open to a quick call Thursday at 2pm?"`
      },
      {
        id: 'surv-4',
        title: 'Close 3 Cash-in-Bank Pilot LOIs / Pre-Orders',
        category: 'Finance & Survival',
        timeframe: 'Day 25 - 30',
        priority: 'P0 CRITICAL',
        deliverable: 'Signed Pilot Agreement Template',
        kpi: '≥ 3 signed LOIs with upfront deposit ($500 - $2,500)',
        sop: [
          'Do not offer free indefinite pilots. Free pilots generate zero urgency and false feedback.',
          'Require an upfront pilot deposit ($500 to $2,500) or mutual Letter of Intent (LOI) with clear success metrics.',
          'Define 3 measurable criteria: e.g. "If tool reduces reporting time by 40% in 30 days, customer commits to annual contract of $6k ARR".',
          'Collect upfront payment via Stripe invoice before onboarding.'
        ],
        templateSnippet: `1-PAGE FOUNDING PILOT AGREEMENT TERMS:
- Pilot Duration: 30 Days
- Pilot Setup Fee: $1,000 (Applied as credit to Annual Subscription)
- Mutual Success Criteria:
  1. Integrates with existing ERP in < 48 hours.
  2. Generates verified audit report with 0 critical discrepancies.
- Post-Pilot Conversion: Auto-renews to $500/month unless cancelled in writing.`
      }
    ]
  },
  {
    id: 'validation',
    phaseNumber: '02',
    title: 'PHASE 2: DEEP PROBLEM-MARKET VALIDATION',
    timeframe: 'DAYS 31 — 60 (MONTH 2)',
    badge: 'VALIDATION ENGINE',
    badgeColor: 'bg-[#FFDE59] text-black',
    accentColor: 'bg-[#FFDE59]',
    borderColor: 'border-[#FFDE59]',
    icon: Target,
    summary: 'Conduct unbiased customer discovery interviews, validate genuine willingness to pay, and eliminate false-positive compliments.',
    kpiBenchmark: '25 Mom-Test interviews completed · ≥ 5 active production users · ≥ 40% PMF score',
    tasks: [
      {
        id: 'val-1',
        title: 'Conduct 25 "The Mom Test" Discovery Interviews',
        category: 'Validation & GTM',
        timeframe: 'Day 31 - 42',
        priority: 'P0 CRITICAL',
        deliverable: 'Customer Discovery Transcript Archive',
        kpi: '25 interviews conducted with zero leading questions',
        sop: [
          'Never ask: "Would you buy a product that does X?" (People will lie and say yes).',
          'Ask about past behavior: "When was the last time you dealt with this problem? What did you do? How much did that workaround cost you?"',
          'If they haven’t spent money or built a manual workaround to solve it, the problem is not painful enough.',
          'Document recurring verbiage and emotional triggers for copywriting.'
        ],
        templateSnippet: `THE MOM TEST QUESTION ARSENAL:
1. "Talk me through the last time [Problem] happened."
2. "Why was that a big deal? What did it cost the business?"
3. "What have you already tried to fix it, and what sucked about those solutions?"
4. "Where did the budget for those tools come from?"`
      },
      {
        id: 'val-2',
        title: 'Skin-in-the-Game Commitment Test',
        category: 'Validation & GTM',
        timeframe: 'Day 43 - 50',
        priority: 'P1 HIGH',
        deliverable: 'Skin-in-the-Game Validation Log',
        kpi: '≥ 50% of interviewed prospects commit time, data, or cash',
        sop: [
          'Measure non-monetary commitment if cash is blocked by procurement: ask for access to their production database, calendar time with their VP, or a public case study commitment.',
          'If a prospect won’t introduce you to their decision-maker or give you anonymized test data, they are not a real buyer.',
          'Categorize prospects into: "Hair on Fire" (Buy now), "Nice to Have" (Ignore), "Tire Kicker" (Politely disqualify).'
        ],
        templateSnippet: `SKIN-IN-THE-GAME QUALIFICATION MATRIX:
- Level 1 (Low): "That sounds cool, keep me updated" -> DISQUALIFY.
- Level 2 (Medium): Introduces you to head of security or sends test data -> QUALIFIED.
- Level 3 (High): Signs LOI or pays upfront pilot deposit -> CORE ICP.`
      },
      {
        id: 'val-3',
        title: 'Value Metric & Pricing Model Discovery',
        category: 'Finance & Survival',
        timeframe: 'Day 51 - 60',
        priority: 'P0 CRITICAL',
        deliverable: 'Value-Metric Pricing Matrix',
        kpi: '10x ROI justification documented for each tier',
        sop: [
          'Align your pricing with how the customer derives value (e.g. per-transaction volume, per-connected-integration, per-megawatt, per-seat).',
          'Avoid cost-plus pricing. Charge based on the monetary value generated or hours saved.',
          'Establish a rule: If your product saves them $50,000/year, charge at least $5,000 to $10,000/year (10-20% value capture).',
          'Test 3 pricing tiers with the next 5 pilot prospects to find the resistance point.'
        ],
        templateSnippet: `PRICING VALUE EQUATION:
- Customer Pain Cost: [Hours lost/month * Hourly wage] + [Lost revenue/downtime]
- Your Pricing: Price at 10-15% of total cost saved.
- Target Annual Contract Value (ACV): Start with minimum floor of $3,000/year ($250/mo).`
      }
    ]
  },
  {
    id: 'product',
    phaseNumber: '03',
    title: 'PHASE 3: CORE WORKFLOW REFINEMENT & ONBOARDING',
    timeframe: 'DAYS 61 — 90 (MONTH 3)',
    badge: 'PRODUCT EXCELLENCE',
    badgeColor: 'bg-[#00F0FF] text-black',
    accentColor: 'bg-[#00F0FF]',
    borderColor: 'border-[#00F0FF]',
    icon: Rocket,
    summary: 'Streamline the candidate user journey to deliver the "Aha! Moment" in under 180 seconds, and instrument comprehensive retention telemetry.',
    kpiBenchmark: 'Time-to-Value < 3 mins · Activation rate ≥ 65% · Day-7 retention ≥ 40%',
    tasks: [
      {
        id: 'prod-1',
        title: 'Sub-180-Second Time-to-Value (TTV) Redesign',
        category: 'Product & Eng',
        timeframe: 'Day 61 - 70',
        priority: 'P0 CRITICAL',
        deliverable: 'Frictionless Onboarding Flow',
        kpi: 'User reaches first core outcome in < 3 minutes without docs',
        sop: [
          'Map every single click from signup to the "Aha! Moment" (the moment they see the magical output).',
          'Eliminate email verification requirements before seeing the product, eliminate mandatory credit card up front, and pre-populate sandbox sample data.',
          'Provide 1-click template imports so users never stare at an empty canvas.',
          'Run 5 recorded usability tests using Loom or UserTesting to catch where users hesitate.'
        ],
        templateSnippet: `TIME-TO-VALUE (TTV) AUDIT:
- Step 1: Sign up with Google/GitHub (5 seconds)
- Step 2: Choose preset role/industry (10 seconds)
- Step 3: Instant preview generated with sample data (5 seconds)
- Total Time to Aha Moment: < 60 seconds.`
      },
      {
        id: 'prod-2',
        title: 'Event Telemetry & Cohort Retention Instrumentation',
        category: 'Product & Eng',
        timeframe: 'Day 71 - 80',
        priority: 'P1 HIGH',
        deliverable: 'Telemetry & Retention Cohort Board',
        kpi: 'Full PostHog/Mixpanel funnel telemetry tracking daily',
        sop: [
          'Track 3 core funnel events: `account_created`, `core_action_completed`, `retained_day_7`.',
          'Set up weekly cohort retention tables. If Day-30 retention flattens horizontally, you have Product-Market Fit.',
          'Trigger automated Slack/Discord alerts to founders every time a user gets stuck or experiences an error.',
          'Reach out within 15 minutes to any user who signs up and drops off before completing the core action.'
        ],
        templateSnippet: `KEY TELEMETRY EVENTS SPEC:
1. 'user_signed_up' (source, referrer)
2. 'workspace_initialized' (template_type)
3. 'core_calculation_run' (latency_ms, success_bool)
4. 'export_generated' (format, item_count)`
      },
      {
        id: 'prod-3',
        title: 'Turn Pilot Customers into High-Impact Case Studies',
        category: 'Validation & GTM',
        timeframe: 'Day 81 - 90',
        priority: 'P0 CRITICAL',
        deliverable: '1-Page Customer Proof Case Study',
        kpi: '≥ 2 published case studies with concrete metrics & logo rights',
        sop: [
          'Interview your 2 most active pilot users and document their before-and-after story.',
          'Focus on hard business metrics: "How [Customer X] saved 14 hours/week and $42,000 in regulatory compliance costs".',
          'Get permission to use their logo and headshot on your landing page and pitch deck.',
          'Use this case study as the core attachment in all future outbound email sequences.'
        ],
        templateSnippet: `CASE STUDY TEMPLATE STRUCTURE:
- Headline: [Customer] Achieves [Specific Result] in [X Weeks]
- The Challenge: Manual spreadsheets caused 18% error rate.
- The Hypers Solution: Deployed automated workflow in 24 hours.
- The ROI: 4.2x speed increase, $38k saved annually.`
      }
    ]
  },
  {
    id: 'scale',
    phaseNumber: '04',
    title: 'PHASE 4: REPEATABLE GTM & EARLY SCALE',
    timeframe: 'DAYS 91 — 150 (MONTHS 4 — 5)',
    badge: 'EARLY SCALE',
    badgeColor: 'bg-[#CCFF00] text-black',
    accentColor: 'bg-[#CCFF00]',
    borderColor: 'border-[#CCFF00]',
    icon: TrendingUp,
    summary: 'Focus exclusively on unlocking 1 dominant, scalable distribution channel, building sales repeatability, and reaching $10k+ MRR.',
    kpiBenchmark: '$10k - $25k MRR reached · CAC payback < 6 months · Repeatable sales motion',
    tasks: [
      {
        id: 'scale-1',
        title: 'Single-Channel Dominance Experimentation',
        category: 'Validation & GTM',
        timeframe: 'Day 91 - 110',
        priority: 'P0 CRITICAL',
        deliverable: 'Distribution Channel Scorecard',
        kpi: 'Identify 1 channel delivering > 60% of qualified pipeline',
        sop: [
          'Do not try 5 marketing channels at once with a 2-person team. Pick 1 primary channel matching your buyer (e.g. Cold Outbound for B2B, SEO/Content for DevTools, LinkedIn for Mid-Market).',
          'Spend 3 weeks conducting high-cadence tests on that single channel until Customer Acquisition Cost (CAC) and conversion rates are proven.',
          'Systematize and automate pipeline generation: 100 targeted touches per week.',
          'Refuse to add channel #2 until channel #1 generates at least $10,000 MRR predictably.'
        ],
        templateSnippet: `DISTRIBUTION CHANNEL SELECTION MATRIX:
- If ACV > $5,000: Direct Founder Outbound & Partner Referrals.
- If ACV $500 - $5,000: Inbound Technical Content, LinkedIn Authority, Programmatic SEO.
- If ACV < $500: Open-Source Community, Product-Led Growth, Viral Utility Tools.`
      },
      {
        id: 'scale-2',
        title: 'Standardize the 4-Step Sales Playbook',
        category: 'Validation & GTM',
        timeframe: 'Day 111 - 130',
        priority: 'P0 CRITICAL',
        deliverable: 'Repeatable Sales Battlecard',
        kpi: 'Close rate from Qualified Demo to Paid Contract > 25%',
        sop: [
          'Standardize the sales process: 1) 15-Min Qualification Call, 2) 25-Min Solution Demo, 3) 7-Day Scoped Pilot, 4) Contract Signature.',
          'Draft an Objection Handling Battlecard for the top 5 customer pushbacks (pricing, security, competing priorities).',
          'Institute annual upfront prepay discounting (e.g. 2 months free for paying annual upfront) to boost cash reserves.',
          'Record all sales calls on Gong/Fathom and review lost deals every Friday.'
        ],
        templateSnippet: `4-STEP SALES CADENCE:
1. Day 1: Discovery & Demo (Find budget & timeline)
2. Day 3: Deliver Custom Proposal with 30-Day ROI Guarantee
3. Day 7: Security & Data Integration Sign-off
4. Day 10: Electronic Signature (DocuSign) & Onboarding Kickoff`
      },
      {
        id: 'scale-3',
        title: 'Breakthrough to $10k+ MRR Milestone',
        category: 'Finance & Survival',
        timeframe: 'Day 131 - 150',
        priority: 'P0 CRITICAL',
        deliverable: 'Revenue & Unit Economics Dossier',
        kpi: '$10,000 to $25,000 MRR achieved with positive cash trajectory',
        sop: [
          'Convert all existing pilots into standard recurring SaaS or usage contracts.',
          'Institute a net negative churn strategy: expansion pricing based on higher volume or seats.',
          'Calculate your LTV:CAC ratio (Target: > 3:1) and Gross Margin (Target: > 80% for software).',
          'Achieve default alive status: where revenue covers founder salaries and core server infrastructure.'
        ],
        templateSnippet: `MILESTONE KPI SCORECARD:
- Target MRR: $12,500
- Active Paying Accounts: 10 - 25
- Monthly Churn: < 2%
- Cashflow Status: DEFAULT ALIVE REACHED`
      }
    ]
  },
  {
    id: 'fundability',
    phaseNumber: '05',
    title: 'PHASE 5: DEFENSIVE MOAT & TIER-1 VC FUNDABILITY',
    timeframe: 'DAYS 151 — 180+ (MONTH 6+)',
    badge: 'SERIES SEED / A',
    badgeColor: 'bg-[#CCFF00] text-black',
    accentColor: 'bg-[#CCFF00]',
    borderColor: 'border-[#CCFF00]',
    icon: Shield,
    summary: 'Build lasting defensibility, package a bulletproof institutional data room, and orchestrate a compressed 3-week fundraising sprint.',
    kpiBenchmark: 'Data Room 100% verified · 40 Tier-1 VC conversations · Term sheet leverage',
    tasks: [
      {
        id: 'fund-1',
        title: 'Architect Proprietary Moat & Switching Costs',
        category: 'Product & Eng',
        timeframe: 'Day 151 - 165',
        priority: 'P0 CRITICAL',
        deliverable: 'Moat & Defensibility Architecture Doc',
        kpi: 'Customer switching cost documented; churn reduced to near-zero',
        sop: [
          'Build systemic hooks that make your tool impossible to replace: proprietary customer historical data, automated ERP synchronizations, custom user workflows.',
          'Develop proprietary intelligence models or benchmarks that get smarter with every new customer dataset ingested.',
          'Document network effects: does Customer B benefit from Customer A using the platform?',
          'File provisional patents or open-source foundational protocols to own the developer mindshare.'
        ],
        templateSnippet: `4 TYPES OF HIGH-MOATS:
1. High Switching Cost: Embedded into daily core business operations.
2. Data Network Effect: Algorithm improves with aggregated cross-customer data.
3. Brand & Velocity Moat: Shipping 3x faster than any incumbent competitor.
4. Scale Economies: Infrastructure costs decline as transaction volume scales.`
      },
      {
        id: 'fund-2',
        title: 'Assemble Institutional Due Diligence Data Room',
        category: 'Fundraising',
        timeframe: 'Day 166 - 175',
        priority: 'P0 CRITICAL',
        deliverable: 'Verified Tier-1 VC Data Room',
        kpi: 'Complete 7-folder Data Room ready before first partner pitch',
        sop: [
          'Create a secure Google Drive/DocSend folder with strict permissions.',
          'Folder 1: 12-Slide Pitch Deck (Problem, Solution, Moat, Traction, Team, The Ask).',
          'Folder 2: 5-Year Pro-Forma Financial Model with clear unit economics assumptions.',
          'Folder 3: Verified Cap Table & Waterfall model showing post-round dilution.',
          'Folder 4: Customer Pilot Contracts & LOIs ($ARR breakdown).',
          'Folder 5: IP Assignment Agreements, Incorporation Documents, and Security Audits.'
        ],
        templateSnippet: `DATA ROOM DIRECTORY STRUCTURE:
/01_Pitch_Deck/
/02_Financials_&_Cohort_Retention/
/03_Cap_Table_&_SAFE_Notes/
/04_Customer_Contracts_&_LOIs/
/05_Corporate_Formation_&_IP/`
      },
      {
        id: 'fund-3',
        title: 'Run a Compressed 3-Week Fundraising Sprint',
        category: 'Fundraising',
        timeframe: 'Day 176 - 180+',
        priority: 'P0 CRITICAL',
        deliverable: 'Investor Pipeline & Term Sheet Tracker',
        kpi: 'Stack 40 partner meetings into 15 business days to create FOMO',
        sop: [
          'Never fundraise casually over 6 months while neglecting the business. Run a high-intensity, time-boxed 3-week sprint.',
          'Stack all first-round partner pitches in Week 1 (aim for 25-35 meetings).',
          'Drive competition between angel syndicates and lead VCs to maximize valuation and clean governance terms.',
          'Only accept SAFE notes or Priced Equity rounds with clean 1x non-participating preferred liquidation preferences.'
        ],
        templateSnippet: `FUNDRAISING SPRINT CADENCE:
- Week 1: 30 First-Round Partner Pitches (High Energy, Time-Compressed)
- Week 2: Second Meetings & Technical Due Diligence Calls
- Week 3: Partner Meetings & Term Sheet Negotiation`
      }
    ]
  }
];

export default function StartupRoadmapGenerator({ companyData }) {
  // Context state (seeded from companyData, user-customizable)
  const [context, setContext] = useState({
    name: companyData?.name || 'ClimateLens AI',
    tagline: companyData?.tagline || 'AI-driven carbon footprint intelligence & automated reduction for SMBs',
    stage: companyData?.stage || 'Pre-Seed',
    niche: 'B2B SaaS / CleanTech & ESG',
    runwayMonths: 8,
    monthlyBurn: '$14,500',
    currentMrr: companyData?.mrr || '$18,400',
    targetRaise: companyData?.targetRaise || '$1.5M',
    primaryBottleneck: 'Validating paid customer commitment & shortening sales cycles'
  });

  const [isEditingContext, setIsEditingContext] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false); // Starts on pathway screen, clicking generate reveals actionable roadmap
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStage, setGenerationStage] = useState('');
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [activeTaskModal, setActiveTaskModal] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(new Set(['surv-1']));
  const [copiedPlan, setCopiedPlan] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const timerRef = useRef(null);

  // Sync context when companyData prop updates
  useEffect(() => {
    if (companyData) {
      setContext(prev => ({
        ...prev,
        name: companyData.name || prev.name,
        tagline: companyData.tagline || prev.tagline,
        stage: companyData.stage || prev.stage,
        currentMrr: companyData.mrr || prev.currentMrr,
        targetRaise: companyData.targetRaise || prev.targetRaise,
        runwayMonths: typeof companyData.runway === 'string'
          ? (parseInt(companyData.runway, 10) || prev.runwayMonths)
          : (companyData.runway || prev.runwayMonths),
      }));
    }
  }, [companyData]);

  // Clean up generation timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Recalibrate Roadmap dynamically based on context
  const roadmapPhases = useMemo(() => {
    return BASE_ROADMAP_PHASES.map(phase => {
      // Dynamic adjustments based on company context
      let customSummary = phase.summary;
      let phaseTasks = [...phase.tasks];

      if (phase.id === 'survival') {
        if (context.runwayMonths < 5) {
          customSummary = `🚨 CRITICAL EMERGENCY: With only ${context.runwayMonths} months runway, ${context.name} must cut non-essential burn immediately and secure upfront cash deposits.`;
        } else {
          customSummary = `Preserve ${context.name}'s ${context.runwayMonths}-month runway while establishing default-alive operational discipline.`;
        }
      }

      return {
        ...phase,
        summary: customSummary,
        tasks: phaseTasks
      };
    });
  }, [context]);

  // Overall Task Progress Calculations
  const allTasks = useMemo(() => {
    return roadmapPhases.flatMap(p => p.tasks);
  }, [roadmapPhases]);

  const progressPercent = useMemo(() => {
    if (allTasks.length === 0) return 0;
    return Math.round((completedTasks.size / allTasks.length) * 100);
  }, [completedTasks, allTasks]);

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  };

  const regenerateRoadmap = () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    const stages = [
      { label: `Auditing ${context.name} runway (${context.runwayMonths} mo) & stage metrics...`, target: 20 },
      { label: 'Synthesizing survival triage & default-alive milestones...', target: 45 },
      { label: 'Structuring The Mom Test validation protocols...', target: 70 },
      { label: 'Plotting repeatable GTM and scale mechanics...', target: 90 },
      { label: 'Finalizing actionable 180-day master execution plan...', target: 100 },
    ];

    let idx = 0;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (idx < stages.length) {
        setGenerationStage(stages[idx].label);
        setGenerationProgress(stages[idx].target);
        idx++;
      } else {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsGenerating(false);
        setHasGenerated(true);
      }
    }, 300);
  };

  const copyFullPlanToMarkdown = () => {
    let md = `# ACTIONABLE STARTUP ROADMAP: ${context.name.toUpperCase()}\n`;
    md += `Stage: ${context.stage} | Runway: ${context.runwayMonths} Months | Niche: ${context.niche}\n`;
    md += `Primary Bottleneck: ${context.primaryBottleneck}\n\n`;

    roadmapPhases.forEach(phase => {
      md += `## ${phase.title} (${phase.timeframe})\n`;
      md += `Summary: ${phase.summary}\n`;
      md += `KPI: ${phase.kpiBenchmark}\n\n`;
      phase.tasks.forEach(t => {
        const checked = completedTasks.has(t.id) ? '[x]' : '[ ]';
        md += `- ${checked} **${t.title}** [${t.priority}] (${t.category})\n`;
        md += `  - KPI: ${t.kpi}\n`;
        md += `  - Deliverable: ${t.deliverable}\n`;
      });
      md += `\n`;
    });

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(md).catch(() => {});
    }
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2000);
  };

  const filteredPhases = useMemo(() => {
    return roadmapPhases
      .filter(phase => selectedPhaseFilter === 'all' || phase.id === selectedPhaseFilter)
      .map(phase => {
        const filteredTasks = phase.tasks.filter(task => {
          if (selectedCategoryFilter === 'all') return true;
          return task.category === selectedCategoryFilter;
        });
        return { ...phase, tasks: filteredTasks };
      })
      .filter(phase => phase.tasks.length > 0);
  }, [roadmapPhases, selectedPhaseFilter, selectedCategoryFilter]);

  // ═══ 0. PATHWAY LANDING PAGE (NEO-BRUTALIST INTAKE SCREEN) ═══
  if (!hasGenerated) {
    return (
      <div className="min-h-[72vh] flex flex-col items-center justify-center py-8 px-4 font-mono select-none">
        {/* Badge Banner */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="bg-black text-[#00F0FF] border-2 border-black px-3.5 py-1 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#000] flex items-center gap-1.5">
            <Milestone size={13} className="text-[#00F0FF]" />
            <span>AI ROADMAP GENERATOR</span>
          </span>
          <span className="bg-[#CCFF00] text-black border-2 border-black px-2.5 py-1 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]">
            90-DAY GTM SPRINT PLANNER
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-black tracking-tight text-center mb-3">
          WHAT DO YOU BUILD <span className="bg-[#2563EB] text-white px-3 py-0.5 border-3 border-black shadow-[4px_4px_0px_#000] inline-block rotate-1">NEXT?</span>
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-bold text-black/80 max-w-xl text-center uppercase tracking-wide leading-relaxed mb-8">
          Stop guessing. Get a highly actionable, brutally prioritized 30 and 90-day execution plan based on your current bottlenecks.
        </p>

        {/* Loading Progress State if generating */}
        {isGenerating ? (
          <div className="max-w-2xl w-full bg-white border-4 border-black shadow-[10px_10px_0px_#000] relative">
            <div className="bg-[#00F0FF] border-b-4 border-black px-4 py-2.5 flex items-center justify-between text-xs font-black uppercase text-black">
              <div className="flex items-center gap-2">
                <Activity size={14} className="animate-spin" />
                <span>[ GENERATING // ACTIONABLE_ROADMAP_MATRIX ]</span>
              </div>
              <span className="bg-black text-[#00F0FF] px-2 py-0.5 text-[10px] font-black border border-black animate-pulse">
                SYNTHESIZING SPRINTS
              </span>
            </div>
            <div className="p-8 sm:p-10 text-center font-mono">
              <div className="w-20 h-20 bg-[#2563EB] border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center mx-auto mb-4 text-white animate-pulse">
                <Map size={34} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black uppercase text-black mb-1">
                SYNTHESIZING ACTIONABLE ROADMAP...
              </h3>
              <p className="text-xs font-bold text-neutral-600 uppercase mb-5">{generationStage}</p>
              <div className="w-full max-w-md mx-auto h-5 bg-[#FAF8F5] border-3 border-black overflow-hidden shadow-[3px_3px_0px_#000]">
                <div
                  className="h-full bg-[#2563EB] border-r-2 border-black transition-all duration-300"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>
              <div className="text-xs font-black text-black uppercase mt-3">
                [ {generationProgress}% COMPLETE // PLOTTING 90-DAY MILESTONES ]
              </div>
            </div>
          </div>
        ) : (
          /* Brutalist Intake Card */
          <div className="max-w-2xl w-full bg-white border-4 border-black shadow-[10px_10px_0px_#000] relative">
            {/* Window Header */}
            <div className="bg-[#F0EDE6] border-b-4 border-black px-4 py-2.5 flex items-center justify-between text-xs font-black uppercase">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#FF0033] border-2 border-black inline-block" />
                <span className="w-3 h-3 bg-[#FFDE59] border-2 border-black inline-block" />
                <span className="w-3 h-3 bg-[#00F0FF] border-2 border-black inline-block" />
                <span className="ml-2 font-black">[ PLANNER // EXECUTION_ROADMAP_GEN.SH ]</span>
              </div>
              <span className="bg-black text-[#00F0FF] px-2 py-0.5 text-[10px] font-black border border-black">
                DAY 1 — 180 READY
              </span>
            </div>

            {/* Body */}
            <div className="p-8 sm:p-10 text-center">
              {/* Icon Box */}
              <div className="w-20 h-20 bg-[#2563EB] border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center mx-auto mb-5 text-white">
                <Milestone size={34} strokeWidth={2.5} />
              </div>

              <h3 className="text-xl sm:text-2xl font-black uppercase text-black mb-1.5 tracking-tight">
                Generate Execution Plan
              </h3>
              <p className="text-xs font-bold text-neutral-600 uppercase mb-6">
                We'll synthesize your metrics and create step-by-step tasks for product milestones, GTM strategies, and validation checkpoints.
              </p>

              {/* 3-Phase Roadmap Preview Box */}
              <div className="border-3 border-black bg-[#FAF8F5] p-5 mb-6 text-left shadow-[3px_3px_0px_#000]">
                <div className="text-[11px] font-black uppercase text-black mb-2 flex items-center justify-between border-b-2 border-black pb-1.5">
                  <span>[ 3-PHASE EXECUTION BLUEPRINT ]</span>
                  <span className="text-[#2563EB]">DEFAULT-ALIVE ROADMAP</span>
                </div>
                <div className="space-y-2 text-[10px] font-black uppercase text-black">
                  <div className="flex items-start gap-2">
                    <span className="bg-[#FF0033] text-white px-1.5 py-0.5 border border-black font-black shrink-0">PHASE 01</span>
                    <span>SURVIVAL TRIAGE (DAYS 1-30): Ruthless burn reduction, default-alive cashflow & scope amputation.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-[#FFDE59] text-black px-1.5 py-0.5 border border-black font-black shrink-0">PHASE 02</span>
                    <span>MOM TEST VALIDATION (DAYS 31-90): 30 live discovery interviews, 3 paid pilot LOIs & continuous delivery.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-[#00F0FF] text-black px-1.5 py-0.5 border border-black font-black shrink-0">PHASE 03</span>
                    <span>DISTRIBUTION & SCALE (DAYS 91-180): Outbound GTM engine, Seed data room & compressed 3-week raise.</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={regenerateRoadmap}
                className="bg-[#2563EB] hover:bg-black hover:text-[#00F0FF] text-white border-3 border-black text-xs sm:text-sm font-black uppercase tracking-wider px-8 py-4 shadow-[5px_5px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2.5 mx-auto"
              >
                <Map size={16} strokeWidth={2.5} />
                <span>[ 🗺️ GENERATE ACTIONABLE ROADMAP ]</span>
              </button>

              {/* Bottom Badges */}
              <div className="mt-8 pt-5 border-t-3 border-black flex flex-wrap items-center justify-center gap-2">
                <span className="bg-[#FAF8F5] border-2 border-black px-2.5 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">
                  ✓ DEFAULT-ALIVE TRIAGE
                </span>
                <span className="bg-[#FAF8F5] border-2 border-black px-2.5 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">
                  ✓ STEP-BY-STEP SOPS & CHECKLISTS
                </span>
                <span className="bg-[#FAF8F5] border-2 border-black px-2.5 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">
                  ✓ NOTION & LINEAR SYNC
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 font-mono select-none">

      {/* ═══ TOP BANNER: CONTEXT OVERVIEW & QUICK RECALIBRATION ═══ */}
      <div className="bg-white border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_#000] relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b-3 border-black pb-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#FFDE59] border border-black px-2 py-0.5 text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]">
                FOUNDER EXECUTION PROTOCOL
              </span>
              <span className="bg-black text-[#CCFF00] border border-black px-2 py-0.5 text-[10px] font-black uppercase">
                {context.stage} · {context.runwayMonths} MO RUNWAY
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-black tracking-tight flex items-center gap-2">
              <Map size={24} strokeWidth={2.5} />
              <span>{context.name} — Actionable Growth Roadmap</span>
            </h2>
            <p className="text-xs font-bold text-neutral-600 uppercase mt-0.5">
              Full lifecycle plan: Survival triage, deep problem validation, product activation, and institutional scale.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setHasGenerated(false)}
              className="bg-white hover:bg-[#FAF8F5] border-2 border-black text-black px-3.5 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <RotateCcw size={13} />
              <span>[ ↺ ROADMAP INTAKE ]</span>
            </button>

            <button
              onClick={() => setIsEditingContext(!isEditingContext)}
              className="bg-white hover:bg-[#FAF8F5] border-2 border-black text-black px-3.5 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <Sliders size={13} strokeWidth={2.5} />
              <span>{isEditingContext ? 'CLOSE SETTINGS' : 'EDIT CONTEXT'}</span>
            </button>

            <button
              onClick={copyFullPlanToMarkdown}
              className="bg-white hover:bg-[#CCFF00] border-2 border-black text-black px-3.5 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
              title="Copy complete markdown roadmap for Notion / Linear / Docs"
            >
              {copiedPlan ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copiedPlan ? 'COPIED TO CLIPBOARD!' : 'EXPORT PLAN'}</span>
            </button>

            <button
              onClick={regenerateRoadmap}
              disabled={isGenerating}
              className="bg-[#CCFF00] hover:bg-[#b8e600] border-2 border-black text-black px-4 py-1.5 text-xs font-black uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <RotateCcw size={13} className={isGenerating ? "animate-spin" : ""} strokeWidth={2.5} />
              <span>[ ↺ RECALIBRATE ]</span>
            </button>
          </div>
        </div>

        {/* Startup Context Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
          <div className="bg-[#FAF8F5] border-2 border-black p-2.5 shadow-[2px_2px_0px_#000]">
            <div className="text-[9px] font-black uppercase text-neutral-500">Startup Stage</div>
            <div className="text-xs font-black text-black uppercase mt-0.5">{context.stage}</div>
          </div>
          <div className="bg-[#FAF8F5] border-2 border-black p-2.5 shadow-[2px_2px_0px_#000]">
            <div className="text-[9px] font-black uppercase text-neutral-500">Runway Status</div>
            <div className={`text-xs font-black uppercase mt-0.5 ${context.runwayMonths < 6 ? 'text-[#FF0033]' : 'text-black'}`}>
              {context.runwayMonths} Months {context.runwayMonths < 6 && '⚠️'}
            </div>
          </div>
          <div className="bg-[#FAF8F5] border-2 border-black p-2.5 shadow-[2px_2px_0px_#000]">
            <div className="text-[9px] font-black uppercase text-neutral-500">Monthly Net Burn</div>
            <div className="text-xs font-black text-black uppercase mt-0.5">{context.monthlyBurn}</div>
          </div>
          <div className="bg-[#FAF8F5] border-2 border-black p-2.5 shadow-[2px_2px_0px_#000]">
            <div className="text-[9px] font-black uppercase text-neutral-500">Current MRR</div>
            <div className="text-xs font-black text-black uppercase mt-0.5">{context.currentMrr}</div>
          </div>
          <div className="bg-[#FAF8F5] border-2 border-black p-2.5 shadow-[2px_2px_0px_#000]">
            <div className="text-[9px] font-black uppercase text-neutral-500">Target Raise</div>
            <div className="text-xs font-black text-black uppercase mt-0.5">{context.targetRaise}</div>
          </div>
          <div className="bg-[#FAF8F5] border-2 border-black p-2.5 shadow-[2px_2px_0px_#000]">
            <div className="text-[9px] font-black uppercase text-neutral-500">Execution Health</div>
            <div className="text-xs font-black text-[#00F0FF] uppercase mt-0.5 bg-black px-1.5 py-0.2 inline-block">
              {progressPercent}% Complete
            </div>
          </div>
        </div>

        {/* Progress Bar Across All Phases */}
        <div>
          <div className="flex items-center justify-between text-[10px] font-black uppercase mb-1 text-black">
            <span>Overall Milestone Execution Velocity</span>
            <span>{completedTasks.size} of {allTasks.length} Action Items Completed ({progressPercent}%)</span>
          </div>
          <div className="h-3 w-full bg-[#FAF8F5] border-2 border-black overflow-hidden shadow-[1px_1px_0px_#000]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              className="h-full bg-[#CCFF00] border-r-2 border-black transition-all"
            />
          </div>
        </div>

        {/* ═══ EDITABLE FOUNDER CONTEXT DRAWER ═══ */}
        <AnimatePresence>
          {isEditingContext && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-5 pt-5 border-t-3 border-black overflow-hidden"
            >
              <div className="text-xs font-black uppercase tracking-wider text-black mb-3 flex items-center gap-2">
                <Sliders size={14} /> [ CUSTOMIZE STARTUP OPERATIONAL CONTEXT ]
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">Company Name</label>
                  <input
                    type="text"
                    value={context.name}
                    onChange={(e) => setContext(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">Stage</label>
                  <select
                    value={context.stage}
                    onChange={(e) => setContext(prev => ({ ...prev, stage: e.target.value }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="Pre-Seed">Pre-Seed (Idea / MVP)</option>
                    <option value="Seed">Seed (Initial Pilots)</option>
                    <option value="Post-Seed">Post-Seed (Early Traction)</option>
                    <option value="Series A Ready">Series A Ready ($10k-$50k MRR)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">Runway (Months)</label>
                  <input
                    type="number"
                    value={context.runwayMonths}
                    onChange={(e) => setContext(prev => ({ ...prev, runwayMonths: Number(e.target.value) }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">Monthly Burn</label>
                  <input
                    type="text"
                    value={context.monthlyBurn}
                    onChange={(e) => setContext(prev => ({ ...prev, monthlyBurn: e.target.value }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">Problem Niche & Market</label>
                  <input
                    type="text"
                    value={context.niche}
                    onChange={(e) => setContext(prev => ({ ...prev, niche: e.target.value }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">Primary Bottleneck / Fatal Risk</label>
                  <input
                    type="text"
                    value={context.primaryBottleneck}
                    onChange={(e) => setContext(prev => ({ ...prev, primaryBottleneck: e.target.value }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditingContext(false)}
                  className="bg-[#FAF8F5] hover:bg-neutral-200 border-2 border-black px-4 py-1.5 text-xs font-black uppercase"
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    setIsEditingContext(false);
                    regenerateRoadmap();
                  }}
                  className="bg-[#CCFF00] hover:bg-[#b8e600] border-2 border-black px-4 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000]"
                >
                  Save & Regenerate Roadmap
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══ ROADMAP FILTER TABS ═══ */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border-3 border-black p-3.5 shadow-[4px_4px_0px_#000]">
        {/* Phase Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-black uppercase text-neutral-500 mr-1 hidden sm:inline">PHASE:</span>
          {[
            { id: 'all', label: 'ALL PHASES' },
            { id: 'survival', label: '🚨 1. SURVIVAL' },
            { id: 'validation', label: '🎯 2. VALIDATION' },
            { id: 'product', label: '⚙️ 3. CORE PRODUCT' },
            { id: 'scale', label: '🚀 4. EARLY SCALE' },
            { id: 'fundability', label: '🏛️ 5. FUNDABILITY' }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPhaseFilter(p.id)}
              className={`px-2.5 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all ${selectedPhaseFilter === p.id ? 'bg-black text-[#CCFF00]' : 'bg-[#FAF8F5] text-black hover:bg-white'
                }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Category Filter Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase text-neutral-500">DISCIPLINE:</span>
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="bg-[#FAF8F5] border-2 border-black px-2.5 py-1 text-xs font-black uppercase shadow-[2px_2px_0px_#000] focus:outline-none cursor-pointer"
          >
            <option value="all">ALL DISCIPLINES</option>
            <option value="Finance & Survival">FINANCE & SURVIVAL</option>
            <option value="Validation & GTM">VALIDATION & GTM</option>
            <option value="Product & Eng">PRODUCT & ENG</option>
            <option value="Fundraising">FUNDRAISING</option>
          </select>
        </div>
      </div>

      {/* ═══ GENERATION LOADER ═══ */}
      {isGenerating && (
        <div className="bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_#000]">
          <div className="w-14 h-14 bg-[#00F0FF] border-3 border-black mx-auto mb-3 flex items-center justify-center animate-pulse shadow-[4px_4px_0px_#000]">
            <Map size={28} />
          </div>
          <h3 className="text-lg font-black uppercase text-black mb-1">
            RECALIBRATING SPRINT ROADMAP FOR {context.name.toUpperCase()}...
          </h3>
          <p className="text-xs font-bold text-neutral-600 uppercase mb-4">{generationStage}</p>
          <div className="w-full max-w-md mx-auto h-4 bg-[#FAF8F5] border-2 border-black overflow-hidden shadow-[2px_2px_0px_#000]">
            <div className="h-full bg-[#00F0FF] transition-all" style={{ width: `${generationProgress}%` }} />
          </div>
        </div>
      )}

      {/* ═══ ROADMAP PHASES TIMELINE VIEW ═══ */}
      {!isGenerating && (
        <div className="space-y-8">
          {filteredPhases.map((phase) => {
            const PhaseIcon = phase.icon;
            const phaseCompletedCount = phase.tasks.filter(t => completedTasks.has(t.id)).length;
            const phaseProgress = Math.round((phaseCompletedCount / Math.max(1, phase.tasks.length)) * 100);

            return (
              <div
                key={phase.id}
                className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000] relative"
              >
                {/* Phase Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-3 border-black pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 border-3 border-black ${phase.accentColor} flex items-center justify-center text-black shadow-[3px_3px_0px_#000] shrink-0`}>
                      <PhaseIcon size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`px-2 py-0.5 border border-black text-[10px] font-black uppercase shadow-[1px_1px_0px_#000] ${phase.badgeColor}`}>
                          {phase.badge}
                        </span>
                        <span className="text-[10px] font-black text-neutral-500 uppercase tracking-wider">
                          {phase.timeframe}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black uppercase text-black">
                        {phase.title}
                      </h3>
                    </div>
                  </div>

                  {/* Phase Progress Badge */}
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-[10px] font-black text-neutral-600 uppercase">Phase Velocity</div>
                      <div className="text-xs font-black text-black">
                        {phaseCompletedCount} / {phase.tasks.length} Completed ({phaseProgress}%)
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-black text-[#CCFF00] border-2 border-black flex items-center justify-center text-xs font-black shadow-[2px_2px_0px_#000]">
                      {phaseProgress}%
                    </div>
                  </div>
                </div>

                {/* Phase Strategic Focus & Benchmark */}
                <div className="bg-[#FAF8F5] border-2 border-black p-3.5 mb-5 shadow-[2px_2px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="flex-1">
                    <span className="font-black text-black uppercase mr-2">[ STRATEGIC FOCUS ]:</span>
                    <span className="font-bold text-neutral-700">{phase.summary}</span>
                  </div>
                  <div className="shrink-0 bg-white border border-black px-2.5 py-1 text-[11px] font-black text-black">
                    <span className="text-[#FF5722] mr-1">🎯 KPI BENCHMARK:</span> {phase.kpiBenchmark}
                  </div>
                </div>

                {/* Task Cards Grid */}
                <div className="space-y-3.5">
                  {phase.tasks.map((task) => {
                    const isDone = completedTasks.has(task.id);

                    return (
                      <div
                        key={task.id}
                        className={`p-4 border-3 border-black shadow-[4px_4px_0px_#000] transition-all ${isDone ? 'bg-[#CCFF00]/15' : 'bg-white hover:bg-neutral-50'
                          }`}
                      >
                        <div className="flex items-start justify-between gap-4">

                          {/* Checkbox + Task Info */}
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <button
                              onClick={() => toggleTask(task.id)}
                              className="mt-0.5 shrink-0 w-6 h-6 border-2 border-black bg-white hover:bg-[#CCFF00] flex items-center justify-center shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                              title={isDone ? "Mark as Incomplete" : "Mark as Completed"}
                            >
                              {isDone ? <Check size={16} strokeWidth={3} className="text-black" /> : null}
                            </button>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className={`px-2 py-0.5 border border-black text-[10px] font-black uppercase ${task.priority.includes('P0') ? 'bg-[#FF0033] text-white' : 'bg-[#FFDE59] text-black'
                                  }`}>
                                  {task.priority}
                                </span>

                                <span className="bg-[#FAF8F5] border border-black px-2 py-0.5 text-[10px] font-black uppercase text-black">
                                  {task.category}
                                </span>

                                <span className="text-[10px] font-bold text-neutral-500 uppercase">
                                  {task.timeframe}
                                </span>
                              </div>

                              <h4 className={`text-sm sm:text-base font-black uppercase tracking-tight text-black ${isDone ? 'line-through text-neutral-500' : ''
                                }`}>
                                {task.title}
                              </h4>

                              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-bold text-neutral-700">
                                <span className="flex items-center gap-1">
                                  <Target size={12} className="text-black shrink-0" />
                                  <span><strong className="text-black uppercase">TARGET KPI:</strong> {task.kpi}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <FileText size={12} className="text-black shrink-0" />
                                  <span><strong className="text-black uppercase">DELIVERABLE:</strong> {task.deliverable}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Button: View Step-by-Step SOP */}
                          <div className="shrink-0 flex items-center gap-2">
                            <button
                              onClick={() => setActiveTaskModal(task)}
                              className="bg-black hover:bg-[#CCFF00] text-white hover:text-black border-2 border-black px-3 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1"
                            >
                              <BookOpen size={12} />
                              <span className="hidden sm:inline">VIEW PLAYBOOK (SOP)</span>
                              <span className="sm:hidden">SOP</span>
                            </button>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}

          {filteredPhases.length === 0 && (
            <div className="bg-white border-4 border-black p-8 text-center shadow-[6px_6px_0px_#000]">
              <AlertCircle size={28} className="mx-auto mb-2 text-[#FF5722]" />
              <h4 className="text-base font-black uppercase text-black">No action items match current filter</h4>
              <p className="text-xs font-bold text-neutral-600 uppercase mt-1 mb-4">
                Try switching the discipline or phase filter to view roadmap tasks.
              </p>
              <button
                onClick={() => { setSelectedPhaseFilter('all'); setSelectedCategoryFilter('all'); }}
                className="bg-[#CCFF00] hover:bg-[#b8e600] border-2 border-black px-4 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000]"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══ TASK PLAYBOOK & SOP MODAL ═══ */}
      <AnimatePresence>
        {activeTaskModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-2xl bg-white border-4 border-black p-6 sm:p-8 shadow-[12px_12px_0px_#000] relative max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b-3 border-black pb-4 mb-5 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="bg-[#CCFF00] text-black border border-black px-2 py-0.5 text-[10px] font-black uppercase">
                      ACTIONABLE EXECUTION SOP
                    </span>
                    <span className="bg-[#FAF8F5] border border-black px-2 py-0.5 text-[10px] font-black uppercase">
                      {activeTaskModal.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-black uppercase text-black leading-tight">
                    {activeTaskModal.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveTaskModal(null)}
                  className="w-8 h-8 bg-black text-white hover:bg-[#FF0033] border-2 border-black font-black flex items-center justify-center text-sm shadow-[2px_2px_0px_#000] shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* Target & KPI Box */}
              <div className="bg-[#FAF8F5] border-2 border-black p-4 mb-5 shadow-[2px_2px_0px_#000] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-neutral-500 uppercase">Target Deliverable:</span>
                  <span className="font-black text-black uppercase">{activeTaskModal.deliverable}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-neutral-500 uppercase">Key Performance Indicator:</span>
                  <span className="font-black text-[#FF0033] uppercase">{activeTaskModal.kpi}</span>
                </div>
              </div>

              {/* Step-by-Step SOP Instructions */}
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                  <ArrowRight size={14} /> [ STEP-BY-STEP EXECUTION PROTOCOL (HOW TO DO IT TODAY) ]
                </h4>
                <div className="space-y-2.5">
                  {activeTaskModal.sop.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-white border-2 border-black p-3 text-xs font-bold text-black flex items-start gap-3 shadow-[2px_2px_0px_#000]"
                    >
                      <span className="w-5 h-5 bg-[#FFDE59] border border-black flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ready-to-Use Script / Template */}
              {activeTaskModal.templateSnippet && (
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                      <FileText size={14} /> [ READY-TO-USE SCRIPT / TEMPLATE ]
                    </h4>
                    <button
                      onClick={() => {
                        if (navigator?.clipboard?.writeText) {
                          navigator.clipboard.writeText(activeTaskModal.templateSnippet).catch(() => {});
                        }
                        setCopiedTemplate(true);
                        setTimeout(() => setCopiedTemplate(false), 2000);
                      }}
                      className="bg-[#FAF8F5] hover:bg-[#CCFF00] border border-black px-2.5 py-1 text-[10px] font-black uppercase shadow-[1px_1px_0px_#000] flex items-center gap-1"
                    >
                      {copiedTemplate ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                      <span>{copiedTemplate ? 'COPIED TO CLIPBOARD!' : 'Copy Template'}</span>
                    </button>
                  </div>
                  <pre className="bg-[#18181b] border-3 border-black p-4 text-xs font-mono text-[#00F0FF] whitespace-pre-wrap shadow-[4px_4px_0px_#000] custom-scrollbar overflow-x-auto">
                    {activeTaskModal.templateSnippet}
                  </pre>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-between border-t-3 border-black pt-4">
                <button
                  onClick={() => toggleTask(activeTaskModal.id)}
                  className={`px-4 py-2 border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all ${completedTasks.has(activeTaskModal.id)
                      ? 'bg-[#FF0033] text-white hover:bg-red-700'
                      : 'bg-[#CCFF00] text-black hover:bg-[#b8e600]'
                    }`}
                >
                  {completedTasks.has(activeTaskModal.id) ? (
                    <>
                      <span>MARK AS INCOMPLETE</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} strokeWidth={3} />
                      <span>MARK COMPLETED (+PROGRESS)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setActiveTaskModal(null)}
                  className="bg-black text-white hover:bg-neutral-800 border-2 border-black px-5 py-2 text-xs font-black uppercase shadow-[2px_2px_0px_#000]"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
