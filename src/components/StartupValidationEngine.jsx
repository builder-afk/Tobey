import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SearchCheck, Target, Clock, TrendingUp, Repeat, Layers,
  AlertTriangle, CheckCircle2, RotateCcw, Sliders, Copy, Check,
  Flame, Zap, Share2, DollarSign, Users, ShieldAlert, Sparkles,
  ArrowRight, ChevronDown, ChevronUp, ShieldCheck, Activity,
  LineChart, CheckSquare, Compass, Heart, AlertOctagon, HelpCircle,
  Calendar, CreditCard, Award, BadgePercent, Bot
} from 'lucide-react';
import { getAiConfig, callConnectedAi, parseAiJson, getUserCompanyData } from '../utils/aiConfig';

// ═══════════════════════════════════════════════════════════════════════════
// PRESET STARTUP PROFILES FOR RAPID VALIDATION STRESS-TESTING
// ═══════════════════════════════════════════════════════════════════════════

const STARTUP_PRESETS = {
  climatelens: {
    id: 'climatelens',
    name: 'ClimateLens AI (B2B ESG Automation)',
    problem: 'Mid-market manufacturing suppliers face EU supply chain audit disqualification without expensive manual ESG consultants.',
    solution: '1-click ERP connector that ingests supplier utility invoices and deterministically outputs certified Scope 1-3 audit ledgers.',
    targetAudience: 'VPs of Supply Chain & Operations in Mid-Market Manufacturing ($10M - $100M revenue).',
    pillarValues: {
      // ── Core Demand & Pain Validation Pillars ──
      userCareScore: 86,
      userCareType: 'active_pull', // 'active_pull' | 'polite_indifference'
      willingnessToPayScore: 72,
      willingnessToPayType: 'budget_exists', // 'budget_exists' | 'reluctant_discounts'
      frequencyScore: 76,
      frequencyCadence: 'monthly_quarterly', // 'daily_weekly' | 'monthly_quarterly' | 'annual_episodic'
      urgencyScore: 92,
      urgencyType: 'hair_on_fire', // 'hair_on_fire' | 'backlog_nice_to_have'

      // ── GTM & Scalability Operational Pillars ──
      reachability: 88, // Highly concentrated on LinkedIn / specific industry associations
      reachabilityType: 'concentrated',
      timeToValueMinutes: 12, // 1-click invoice upload
      implementationType: 'plug_and_play',
      cacCost: 420, // Low-cost targeted founder outbound
      distributionLoop: 'plg_supplier_loop',
      retentionRate: 94, // Continuous quarterly regulatory reporting
      churnRiskType: 'data_compounding'
    }
  },
  devtools: {
    id: 'devtools',
    name: 'LogStream Pro (DevOps Observability)',
    problem: 'Distributed microservice teams waste hours correlating distributed traces across Kubernetes pods.',
    solution: 'eBPF-powered zero-code telemetry agent that streams traces in under 60 seconds.',
    targetAudience: 'DevOps / Platform Engineers and Staff SREs in tech companies.',
    pillarValues: {
      userCareScore: 94,
      userCareType: 'active_pull',
      willingnessToPayScore: 84,
      willingnessToPayType: 'budget_exists',
      frequencyScore: 95,
      frequencyCadence: 'daily_weekly',
      urgencyScore: 90,
      urgencyType: 'hair_on_fire',

      reachability: 92,
      reachabilityType: 'concentrated',
      timeToValueMinutes: 4,
      implementationType: 'plug_and_play',
      cacCost: 250,
      distributionLoop: 'word_of_mouth',
      retentionRate: 96,
      churnRiskType: 'data_compounding'
    }
  },
  tax_prep: {
    id: 'tax_prep',
    name: 'TaxRescue (Project-Based Consumer Tool)',
    problem: 'Freelancers struggle to calculate quarterly estimated self-employment taxes.',
    solution: 'Web form calculator that outputs tax deduction forms.',
    targetAudience: 'Freelancers and independent gig contractors.',
    pillarValues: {
      userCareScore: 62,
      userCareType: 'polite_indifference',
      willingnessToPayScore: 42,
      willingnessToPayType: 'reluctant_discounts',
      frequencyScore: 32,
      frequencyCadence: 'annual_episodic',
      urgencyScore: 72,
      urgencyType: 'hair_on_fire',

      reachability: 52, // Highly fragmented
      reachabilityType: 'fragmented',
      timeToValueMinutes: 15,
      implementationType: 'plug_and_play',
      cacCost: 1400, // Expensive Google ad CPCs
      distributionLoop: 'high_paid_cpc',
      retentionRate: 35, // High project-based churn (use once a year)
      churnRiskType: 'project_churn'
    }
  }
};

export default function StartupValidationEngine({ companyData }) {
  const userCompany = useMemo(() => {
    return companyData || getUserCompanyData() || null;
  }, [companyData]);

  const activeCompanyName = userCompany?.name || 'Your Venture';

  const dynamicPresets = useMemo(() => {
    const presets = { ...STARTUP_PRESETS };
    if (userCompany && userCompany.name) {
      presets.user_company = {
        id: 'user_company',
        name: `${userCompany.name} (Your Venture)`,
        problem: userCompany.problem || 'Operational bottlenecks causing friction for target buyers.',
        solution: userCompany.solution || userCompany.tagline || 'Automated software runtime delivering high-leverage workflows.',
        targetAudience: userCompany.targetAudience || userCompany.targetBuyer || 'Target enterprise buyers and operators.',
        pillarValues: {
          userCareScore: 88,
          userCareType: 'active_pull',
          willingnessToPayScore: 78,
          willingnessToPayType: 'budget_exists',
          frequencyScore: 82,
          frequencyCadence: 'daily_weekly',
          urgencyScore: 90,
          urgencyType: 'hair_on_fire',
          reachability: 85,
          reachabilityType: 'concentrated',
          timeToValueMinutes: 14,
          implementationType: 'plug_and_play',
          cacCost: 450,
          distributionLoop: 'plg_supplier_loop',
          retentionRate: 92,
          churnRiskType: 'data_compounding'
        }
      };
    }
    return presets;
  }, [userCompany]);

  // Active startup context state
  const [activeProfileKey, setActiveProfileKey] = useState(() => {
    const comp = companyData || getUserCompanyData();
    return (comp && comp.name) ? 'user_company' : 'climatelens';
  });
  const [isEditingPillars, setIsEditingPillars] = useState(false);
  const [hasValidated, setHasValidated] = useState(false); // Starts on pathway screen, running protocol reveals audited results
  const [isValidating, setIsValidating] = useState(false);
  const [validationProgress, setValidationProgress] = useState(100);
  const [validationStage, setValidationStage] = useState('');
  const [copiedDossier, setCopiedDossier] = useState(false);
  const [expandedPillar, setExpandedPillar] = useState('cd1');
  const [activePillarScope, setActivePillarScope] = useState('all'); // 'all' | 'demand' | 'scalability'
  const [aiAuditInfo, setAiAuditInfo] = useState(null);

  // Pillar Configuration State
  const [pillarInputs, setPillarInputs] = useState(() => {
    const comp = companyData || getUserCompanyData();
    if (comp && comp.name) {
      return {
        userCareScore: 88,
        userCareType: 'active_pull',
        willingnessToPayScore: 78,
        willingnessToPayType: 'budget_exists',
        frequencyScore: 82,
        frequencyCadence: 'daily_weekly',
        urgencyScore: 90,
        urgencyType: 'hair_on_fire',
        reachability: 85,
        reachabilityType: 'concentrated',
        timeToValueMinutes: 14,
        implementationType: 'plug_and_play',
        cacCost: 450,
        distributionLoop: 'plg_supplier_loop',
        retentionRate: 92,
        churnRiskType: 'data_compounding'
      };
    }
    return STARTUP_PRESETS.climatelens.pillarValues;
  });

  // Switch Preset
  const handleSelectPreset = (key) => {
    setActiveProfileKey(key);
    if (dynamicPresets[key]) {
      setPillarInputs(dynamicPresets[key].pillarValues);
    }
  };

  // ═════════════════════════════════════════════════════════════════════════
  // 1. CORE DEMAND & PAIN VALIDATION PILLARS CALCULATION
  // ═════════════════════════════════════════════════════════════════════════

  const coreDemandPillars = useMemo(() => {
    // ── CORE PILLAR 1: Do Users Actually Care? (Desire & Active Pull) ──
    const cd1Score = pillarInputs.userCareType === 'active_pull'
      ? Math.min(100, Math.max(70, pillarInputs.userCareScore))
      : Math.min(60, Math.max(25, pillarInputs.userCareScore - 30));

    const cd1 = {
      id: 'cd1',
      number: '01',
      category: 'CORE DEMAND',
      title: 'Do Users Actually Care?',
      subtitle: 'Desire & Active Pull Signal',
      score: cd1Score,
      status: cd1Score >= 80 ? 'STRONG SIGNAL' : cd1Score >= 60 ? 'MODERATE' : 'FRICTION RISK',
      statusColor: cd1Score >= 80 ? 'bg-[#CCFF00] text-black' : cd1Score >= 60 ? 'bg-[#FFDE59] text-black' : 'bg-[#FF0033] text-white',
      accentColor: 'bg-[#5850EC]',
      badgeColor: 'bg-[#EEF2FF] text-[#5850EC] border-[#5850EC]/30',
      icon: Heart,
      definition: 'Audits whether target users have an acute, visceral desire for this solution and are actively pulling it into their workflow, rather than giving polite compliments to a clever idea.',
      strongSignal: 'Active inbound pull. Users complain bitterly unprompted about status-quo pain, repeatedly ask "when can I get access?", share the link with colleagues, and check back weekly.',
      frictionRisk: 'Polite indifference. Prospects say "that\'s a really cool concept" on Zoom, but ghost your follow-up emails, refuse to invite colleagues, and never log back in after the initial demo.',
      evidencePoints: [
        { label: 'Organic Buyer Pull', value: pillarInputs.userCareType === 'active_pull' ? 'High Inbound Pull (Unprompted Discovery Inquiries)' : 'Passive / Luke-Warm Reaction', status: pillarInputs.userCareType === 'active_pull' ? 'positive' : 'negative' },
        { label: 'Status-Quo Workarounds', value: 'Hacking manual spreadsheets & expensive external agency hours', status: 'positive' },
        { label: 'Interview Referral Intent', value: '84% of interviewees offer to introduce 2 peer companies', status: 'positive' }
      ],
      tacticalPrescription: cd1Score >= 80
        ? 'Capture user enthusiasm immediately: establish an exclusive alpha design partner program with weekly co-creation interviews and signed pilot commitments.'
        : 'Apply the "Mom Test": Ask what specific steps they took in the last 14 days to solve this problem. If they have not spent money or time trying to fix it, do not write code — pivot to a problem where they are already bleeding.'
    };

    // ── CORE PILLAR 2: Willingness to Pay (Economic Value Unlock) ──
    const cd2Score = pillarInputs.willingnessToPayType === 'budget_exists'
      ? Math.min(100, Math.max(65, pillarInputs.willingnessToPayScore))
      : Math.min(55, Math.max(20, pillarInputs.willingnessToPayScore - 25));

    const cd2 = {
      id: 'cd2',
      number: '02',
      category: 'CORE DEMAND',
      title: 'Willingness to Pay',
      subtitle: 'Economic Value & Budget Allocation',
      score: cd2Score,
      status: cd2Score >= 80 ? 'STRONG SIGNAL' : cd2Score >= 60 ? 'MODERATE' : 'FRICTION RISK',
      statusColor: cd2Score >= 80 ? 'bg-[#CCFF00] text-black' : cd2Score >= 60 ? 'bg-[#FFDE59] text-black' : 'bg-[#FF0033] text-white',
      accentColor: 'bg-[#D97706]',
      badgeColor: 'bg-[#FEF9EC] text-[#D97706] border-[#D97706]/30',
      icon: DollarSign,
      definition: 'Evaluates whether the economic value created or preserved is large enough that buyers will willingly swipe corporate cards or sign POs without agonizing discount negotiations.',
      strongSignal: 'Budget already exists or directly replaces a painful line-item expense (> 5x ROI). Buyers commit to upfront annual contracts, signed LOIs with price terms, or immediate card swipes.',
      frictionRisk: 'Free tier addiction. Users love the product as long as it is free, but churn en masse the instant a paywall is presented. Severe price sensitivity and endless requests for free credits.',
      evidencePoints: [
        { label: 'Budget Allocation Authority', value: pillarInputs.willingnessToPayType === 'budget_exists' ? 'Pre-Existing Discretionary Tooling Line Item' : 'Requires Unbudgeted Committee Approval', status: pillarInputs.willingnessToPayType === 'budget_exists' ? 'positive' : 'negative' },
        { label: 'Direct Economic ROI', value: 'Replaces $45k/yr external audit consultant retainer with $12k software', status: 'positive' },
        { label: 'Pre-Payment / LOI Proof', value: '3 Signed Letters of Intent (LOIs) with explicit dollar price tiers', status: 'positive' }
      ],
      tacticalPrescription: cd2Score >= 80
        ? 'Charge upfront annual contracts: offer a 15% discount for upfront annual billing to fund customer acquisition and lock in 12-month commitment.'
        : 'Never build on hypothetical willingness to pay. Pitch pre-orders or ask for a $500 refundable deposit during early discovery calls. If they refuse to pay $500 before launch, they will not pay $5,000 after.'
    };

    // ── CORE PILLAR 3: Frequency (Usage Cadence & Habit Formation) ──
    let cd3Score = 50;
    if (pillarInputs.frequencyCadence === 'daily_weekly') {
      cd3Score = Math.min(100, Math.max(80, pillarInputs.frequencyScore));
    } else if (pillarInputs.frequencyCadence === 'monthly_quarterly') {
      cd3Score = Math.min(85, Math.max(65, pillarInputs.frequencyScore));
    } else {
      cd3Score = Math.min(45, Math.max(20, pillarInputs.frequencyScore - 30));
    }

    const cd3 = {
      id: 'cd3',
      number: '03',
      category: 'CORE DEMAND',
      title: 'Frequency',
      subtitle: 'Usage Cadence & Habit Formation',
      score: cd3Score,
      status: cd3Score >= 80 ? 'STRONG SIGNAL' : cd3Score >= 60 ? 'MODERATE' : 'FRICTION RISK',
      statusColor: cd3Score >= 80 ? 'bg-[#CCFF00] text-black' : cd3Score >= 60 ? 'bg-[#FFDE59] text-black' : 'bg-[#FF0033] text-white',
      accentColor: 'bg-[#00F0FF]',
      badgeColor: 'bg-[#EAFBF3] text-[#00A86B] border-[#00A86B]/30',
      icon: Activity,
      definition: 'Assesses how often the pain recurs and how regularly the customer interacts with the product to build entrenched habit loops and prevent login amnesia.',
      strongSignal: 'Daily or weekly active habit. The product sits in the critical operational path (e.g. daily standup, code commit hook, continuous invoice stream), creating compounding daily dependency.',
      frictionRisk: 'Episodic or annual pain. The user fixes their acute issue once (e.g. annual tax calculation, 1-time incorporation), closes the tab, and cancels because they do not need it for 11 months.',
      evidencePoints: [
        { label: 'Interaction Frequency', value: pillarInputs.frequencyCadence === 'daily_weekly' ? 'Daily / Continuous Background Hook' : pillarInputs.frequencyCadence === 'monthly_quarterly' ? 'Monthly Ledger Ingestion & Reporting' : 'One-and-Done Episodic Task', status: pillarInputs.frequencyCadence !== 'annual_episodic' ? 'positive' : 'negative' },
        { label: 'Workflow Embedding', value: 'Synchronized with ERP webhook pipeline; runs 24/7 autonomous ledger audits', status: 'positive' },
        { label: 'Habit Re-Engagement Trigger', value: 'Automated weekly variance digests prevent user login amnesia', status: 'positive' }
      ],
      tacticalPrescription: cd3Score >= 80
        ? 'Embed into notifications: connect Slack/Teams webhooks so users receive automated micro-updates directly where they communicate every day.'
        : 'If your core utility is episodic, wrap it in continuous ambient value: launch an automated anomaly detection agent, recurring weekly health check, or regulatory radar that keeps your tool in their inbox every week.'
    };

    // ── CORE PILLAR 4: Urgency of Problem ("Hair-on-Fire" Priority) ──
    const cd4Score = pillarInputs.urgencyType === 'hair_on_fire'
      ? Math.min(100, Math.max(75, pillarInputs.urgencyScore))
      : Math.min(58, Math.max(25, pillarInputs.urgencyScore - 35));

    const cd4 = {
      id: 'cd4',
      number: '04',
      category: 'CORE DEMAND',
      title: 'Urgency of Problem',
      subtitle: '"Hair-on-Fire" Priority vs Backlog',
      score: cd4Score,
      status: cd4Score >= 80 ? 'STRONG SIGNAL' : cd4Score >= 60 ? 'MODERATE' : 'FRICTION RISK',
      statusColor: cd4Score >= 80 ? 'bg-[#CCFF00] text-black' : cd4Score >= 60 ? 'bg-[#FFDE59] text-black' : 'bg-[#FF0033] text-white',
      accentColor: 'bg-[#FF0033]',
      badgeColor: 'bg-[#FFF0F2] text-[#E11D48] border-[#E11D48]/30',
      icon: Flame,
      definition: 'Measures whether this problem is a top-3 "hair-on-fire" priority that leadership must solve this quarter or a "nice-to-have" vitamin that gets deferred indefinitely.',
      strongSignal: 'Hair-on-fire emergency: existential regulatory penalties, direct loss of enterprise customers, severe security exposure, or system downtime that demands immediate resolution.',
      frictionRisk: '"Nice to have" optimization: ranked #7 on the executive priority list. Easily deprioritized during quarterly planning meetings whenever budget or time becomes constrained.',
      evidencePoints: [
        { label: 'Executive Priority Rank', value: pillarInputs.urgencyType === 'hair_on_fire' ? 'Tier-1 Emergency (#1 on Compliance Scorecard)' : 'Tier-3 "Nice to Have" Optimization', status: pillarInputs.urgencyType === 'hair_on_fire' ? 'positive' : 'negative' },
        { label: 'Cost of Inaction / Delay', value: 'Disqualification from European supply chain contracts ($2M+ revenue risk)', status: 'positive' },
        { label: 'Buying Decision Velocity', value: 'Immediate purchase (within 14-30 days to meet compliance deadline)', status: 'positive' }
      ],
      tacticalPrescription: cd4Score >= 80
        ? 'Anchor your sales pitch to the deadline: build an interactive "Compliance Countdown / Cost of Delay Calculator" that visually demonstrates the daily revenue risk of inaction.'
        : 'Frame every pitch around the catastrophic cost of inaction. Do not sell "convenience" — sell the shield against the $500,000 regulatory fine or lost enterprise contract.'
    };

    return [cd1, cd2, cd3, cd4];
  }, [pillarInputs]);

  // ═════════════════════════════════════════════════════════════════════════
  // 2. GTM & OPERATIONAL SCALABILITY PILLARS CALCULATION (PRESERVED)
  // ═════════════════════════════════════════════════════════════════════════

  const scalabilityPillars = useMemo(() => {
    // ── PILLAR 1: Market Size & Reachability (Scalability Signal) ──
    const p1Score = pillarInputs.reachabilityType === 'concentrated'
      ? Math.min(100, Math.max(70, pillarInputs.reachability))
      : Math.min(60, Math.max(25, pillarInputs.reachability - 30));

    const p1 = {
      id: 'p1',
      number: '05',
      category: 'GTM & SCALE',
      title: 'Market Size & Reachability',
      subtitle: 'Scalability Signal',
      score: p1Score,
      status: p1Score >= 80 ? 'STRONG SIGNAL' : p1Score >= 60 ? 'MODERATE' : 'FRICTION RISK',
      statusColor: p1Score >= 80 ? 'bg-[#CCFF00] text-black' : p1Score >= 60 ? 'bg-[#FFDE59] text-black' : 'bg-[#FF0033] text-white',
      accentColor: 'bg-[#CCFF00]',
      icon: Target,
      definition: 'Measures whether the addressable market is large enough to justify building a business and how easily you can get in front of them without burning millions on paid ads.',
      strongSignal: 'The target audience is large, growing, and concentrated in easily targetable spaces (e.g., specific LinkedIn groups, distinct job titles like VP Supply Chain, or niche software ecosystems like Shopify/ERP AppExchange).',
      frictionRisk: 'The market is highly fragmented, difficult to reach via standard acquisition channels (e.g., disconnected local tradesmen), or too small to sustain venture-scale revenue ($100M ARR potential).',
      evidencePoints: [
        { label: 'Target Audience Concentration', value: pillarInputs.reachabilityType === 'concentrated' ? 'High Density (Specific Job Titles & LinkedIn Groups)' : 'Severely Fragmented / Dispersed', status: pillarInputs.reachabilityType === 'concentrated' ? 'positive' : 'negative' },
        { label: 'Primary Acquisition Vector', value: 'LinkedIn Sales Nav + B2B Association Lists', status: 'positive' },
        { label: 'Venture Market Sizing (TAM)', value: '$10B+ Global Compliance TAM with clear SMB Sub-Segment', status: 'positive' }
      ],
      tacticalPrescription: pillarInputs.reachabilityType === 'concentrated'
        ? 'Scale targeted 4-sentence cold outbound to 100 verified VPs weekly; sponsor niche trade association newsletters rather than broad Google ads.'
        : 'Narrow your wedge! Do not target generic SMBs. Focus on one hyper-specific vertical (e.g., "Food & Beverage Logistics Exporters") where buyers talk in shared forums.'
    };

    // ── PILLAR 2: Time-to-Value & Implementation (Onboarding Friction) ──
    let p2Score = 50;
    if (pillarInputs.implementationType === 'plug_and_play') {
      p2Score = pillarInputs.timeToValueMinutes <= 15 ? 94 : pillarInputs.timeToValueMinutes <= 60 ? 82 : 72;
    } else {
      p2Score = 42; // Complex setup penalty
    }

    const p2 = {
      id: 'p2',
      number: '06',
      category: 'GTM & SCALE',
      title: 'Time-to-Value & Implementation',
      subtitle: 'Onboarding Friction',
      score: p2Score,
      status: p2Score >= 80 ? 'STRONG SIGNAL' : p2Score >= 60 ? 'MODERATE' : 'FRICTION RISK',
      statusColor: p2Score >= 80 ? 'bg-[#CCFF00] text-black' : p2Score >= 60 ? 'bg-[#FFDE59] text-black' : 'bg-[#FF0033] text-white',
      accentColor: 'bg-[#00F0FF]',
      icon: Clock,
      definition: 'Evaluates how long it takes for a user to experience their first "Aha!" moment after signing up.',
      strongSignal: '"Plug-and-play" deployment. The user connects a tool or uploads a single file and immediately sees the problem solved in under 180 seconds without engineering support.',
      frictionRisk: 'High setup inertia. The product requires complex data migrations, IT security approvals, custom API webhooks, or extensive team training before delivering any real value.',
      evidencePoints: [
        { label: 'Median Time to Aha! Moment', value: `${pillarInputs.timeToValueMinutes} Minutes`, status: pillarInputs.timeToValueMinutes <= 15 ? 'positive' : 'warning' },
        { label: 'Deployment Architecture', value: pillarInputs.implementationType === 'plug_and_play' ? '1-Click OAuth Connector / Instant Sandbox' : 'Custom Enterprise IT Security Integration', status: pillarInputs.implementationType === 'plug_and_play' ? 'positive' : 'negative' },
        { label: 'User Setup Friction', value: 'Zero developer code required; pre-populated sample templates', status: 'positive' }
      ],
      tacticalPrescription: p2Score >= 80
        ? 'Maintain frictionless self-serve onboarding. Remove email verification barriers and show the solved dashboard before asking for payment credentials.'
        : 'Execute ruthless Concierge MVP amputation! Replace custom IT configuration workflows with pre-formatted CSV template imports and automated overnight backend processing.'
    };

    // ── PILLAR 3: Distribution & Acquisition Costs (CAC Viability) ──
    let p3Score = 60;
    if (pillarInputs.distributionLoop === 'plg_supplier_loop') p3Score = 91;
    else if (pillarInputs.distributionLoop === 'word_of_mouth') p3Score = 86;
    else p3Score = 44; // High paid ad reliance

    const p3 = {
      id: 'p3',
      number: '07',
      category: 'GTM & SCALE',
      title: 'Distribution & Acquisition Costs',
      subtitle: 'CAC Viability',
      score: p3Score,
      status: p3Score >= 80 ? 'STRONG SIGNAL' : p3Score >= 60 ? 'MODERATE' : 'FRICTION RISK',
      statusColor: p3Score >= 80 ? 'bg-[#CCFF00] text-black' : p3Score >= 60 ? 'bg-[#FFDE59] text-black' : 'bg-[#FF0033] text-white',
      accentColor: 'bg-[#FFDE59]',
      icon: TrendingUp,
      definition: 'Looks at the sustainability of your growth loops and whether you can acquire customers cost-effectively over a multi-year horizon.',
      strongSignal: 'Organic word-of-mouth potential, product-led growth (PLG) loops, or a highly efficient, low-cost outbound sales model (Blended CAC payback < 6 months).',
      frictionRisk: 'The space is highly competitive, resulting in massive paid ad costs (high Customer Acquisition Cost) or an unsustainably long enterprise sales cycle (9-12 months) that burns runway.',
      evidencePoints: [
        { label: 'Blended CAC Estimate', value: `$${pillarInputs.cacCost} / Account`, status: pillarInputs.cacCost < 600 ? 'positive' : 'negative' },
        { label: 'Primary Distribution Loop', value: pillarInputs.distributionLoop === 'plg_supplier_loop' ? 'B2B Supplier-to-Buyer Invitation Flywheel' : pillarInputs.distributionLoop === 'word_of_mouth' ? 'Technical Word-of-Mouth / Developer Community' : 'Paid Search Ads (Red Ocean)', status: pillarInputs.distributionLoop.includes('plg') || pillarInputs.distributionLoop.includes('word') ? 'positive' : 'negative' },
        { label: 'Sales Cycle Velocity', value: '14 to 30 Days (Direct VP decision maker without procurement committee)', status: 'positive' }
      ],
      tacticalPrescription: p3Score >= 80
        ? 'Double down on the viral coefficient: when an enterprise requests an audit, automatically send free vendor verification links that convert into standalone accounts.'
        : 'Kill generic paid search campaigns. In competitive B2B spaces, Google ad keywords cost $40+/click. Shift 100% of budget into founder-led direct outbound and channel partner integration ecosystems.'
    };

    // ── PILLAR 4: Retention & LTV Potential (Monetization Sustainability) ──
    let p4Score = 50;
    if (pillarInputs.churnRiskType === 'data_compounding') {
      p4Score = Math.min(98, Math.max(75, pillarInputs.retentionRate));
    } else {
      p4Score = 38; // High project-based churn
    }

    const p4 = {
      id: 'p4',
      number: '08',
      category: 'GTM & SCALE',
      title: 'Retention & LTV Potential',
      subtitle: 'Monetization Sustainability',
      score: p4Score,
      status: p4Score >= 80 ? 'STRONG SIGNAL' : p4Score >= 60 ? 'MODERATE' : 'FRICTION RISK',
      statusColor: p4Score >= 80 ? 'bg-[#CCFF00] text-black' : p4Score >= 60 ? 'bg-[#FFDE59] text-black' : 'bg-[#FF0033] text-white',
      accentColor: 'bg-[#FF52D9]',
      icon: Repeat,
      definition: 'Assesses the long-term value of a customer and their likelihood to stick around continuously instead of canceling after solving an acute task.',
      strongSignal: 'Natural network effects, data compounding (the product becomes exponentially more valuable the more historical data is stored), or seat/volume-based expansion potential (> 110% NRR).',
      frictionRisk: 'High project-based churn, where users log in, fix their immediate acute issue (e.g. 1-time tax return or logo generator), and cancel their subscription because they don\'t need it continuously.',
      evidencePoints: [
        { label: 'Retention Typology', value: pillarInputs.churnRiskType === 'data_compounding' ? 'Continuous Multi-Year Historical Data Compounding' : 'Project-Based / One-and-Done Task Tool', status: pillarInputs.churnRiskType === 'data_compounding' ? 'positive' : 'negative' },
        { label: 'Annual Contract Net Retention', value: `${pillarInputs.retentionRate}% Baseline Retention`, status: pillarInputs.retentionRate >= 80 ? 'positive' : 'negative' },
        { label: 'Switching Cost Moat', value: 'High (Historic audit trail required for regulatory inspections)', status: 'positive' }
      ],
      tacticalPrescription: p4Score >= 80
        ? 'Introduce expansion pricing: tier contracts based on transaction volume, connected ERP databases, or monitored supplier seats to drive Net Revenue Retention above 120%.'
        : 'URGENT PIVOT NEEDED: If customers only use your product once a year, switch from monthly SaaS to an annual audit guarantee subscription or add continuous automated monitoring workflows.'
    };

    return [p1, p2, p3, p4];
  }, [pillarInputs]);

  // Combined List of All 8 Pillars
  const allPillars = useMemo(() => {
    return [...coreDemandPillars, ...scalabilityPillars];
  }, [coreDemandPillars, scalabilityPillars]);

  // ═════════════════════════════════════════════════════════════════════════
  // 3. THE 4 HIGH-LEVEL DIAGNOSTIC SCORES (MATCHING USER SCREENSHOT)
  // ═════════════════════════════════════════════════════════════════════════

  // [Card 1]: Validation Score (Overall Composite)
  const validationScore = useMemo(() => {
    const total = allPillars.reduce((sum, p) => sum + p.score, 0);
    return Math.round(total / allPillars.length);
  }, [allPillars]);

  // [Card 2]: Problem-Market Fit
  const problemMarketFitScore = useMemo(() => {
    const cd1 = coreDemandPillars[0]; // Do Users Care?
    const p1 = scalabilityPillars[0];  // Reachability & Market Size
    const cd3 = coreDemandPillars[2]; // Frequency
    // Natural synthesis of desire, reachability, and habit
    return Math.round((cd1.score * 0.35) + (p1.score * 0.30) + (cd3.score * 0.28));
  }, [coreDemandPillars, scalabilityPillars]);

  // [Card 3]: User Pain Score
  const userPainScore = useMemo(() => {
    const cd4 = coreDemandPillars[3]; // Urgency ("Hair-on-Fire")
    const cd1 = coreDemandPillars[0]; // Desire & Care
    // Primarily driven by urgency of problem and active pain intensity
    return Math.round((cd4.score * 0.70) + (cd1.score * 0.30));
  }, [coreDemandPillars]);

  // [Card 4]: Monetization Confidence
  const monetizationConfidenceScore = useMemo(() => {
    const cd2 = coreDemandPillars[1]; // Willingness to Pay
    const p3 = scalabilityPillars[2];  // CAC Viability
    const p4 = scalabilityPillars[3];  // Retention
    // Weighted synthesis of price elasticity, acquisition efficiency, and churn resistance
    return Math.round((cd2.score * 0.50) + (p3.score * 0.20) + (p4.score * 0.20));
  }, [coreDemandPillars, scalabilityPillars]);

  // Overall Viability Verdict
  const viabilityVerdict = useMemo(() => {
    if (validationScore >= 80) {
      return {
        verdict: 'HIGH CONVICTION — PROCEED TO SCALE SPRINT',
        color: 'text-[#CCFF00]',
        badge: 'VENTURE VIABLE',
        badgeColor: 'bg-[#CCFF00] text-black',
        synthesis: 'Your market is reachable, time-to-value is under 15 minutes, distribution is capital-efficient, and users demonstrate visceral demand with high willingness to pay. You have cleared both Demand and Scalability validation gates.',
        action: 'Stop second-guessing product viability. Execute your 90-day GTM roadmap and reach $10k+ MRR.'
      };
    } else if (validationScore >= 65) {
      return {
        verdict: 'MODERATE CONVICTION — RESOLVE FLAGGED FRICTION RISKS',
        color: 'text-[#FFDE59]',
        badge: 'PARTIAL FRICTION',
        badgeColor: 'bg-[#FFDE59] text-black',
        synthesis: 'You have solid core utility, but 1 or 2 pillars suffer from high setup inertia, episodic frequency, or distribution friction. If unaddressed, your acquisition costs will outpace lifetime value.',
        action: 'Implement the tactical prescriptions for the red-flagged pillars before writing any new code.'
      };
    } else {
      return {
        verdict: 'FATAL FRICTION RISK — PIVOT CORE MODEL BEFORE BUILDING',
        color: 'text-[#FF0033]',
        badge: 'HIGH FRICTION DANGER',
        badgeColor: 'bg-[#FF0033] text-white',
        synthesis: 'Severe vulnerabilities detected: either users do not actually care enough to pay, the audience is unreachable, onboarding requires complex enterprise setup, or project-based churn will collapse your business.',
        action: 'Do not spend money on software engineering. Re-interview 20 buyers to find an urgent, hair-on-fire workflow.'
      };
    }
  }, [validationScore]);

  // Re-run Validation Simulation with Connected AI or Tailored Heuristics
  const triggerReValidation = async () => {
    setIsValidating(true);
    setValidationProgress(0);

    const comp = companyData || getUserCompanyData() || {
      name: 'VentureScale AI',
      problem: 'Operational friction',
      solution: 'AI automation',
      targetAudience: 'Enterprise teams'
    };

    const aiCfg = getAiConfig();
    let aiEvaluation = null;

    if (aiCfg && aiCfg.apiKey) {
      try {
        const sysPrompt = `You are a legendary institutional venture validation auditor (YC Group Partner & Sequoia Seed Committee). 
Analyze this specific startup strictly against the 8 Core Validation Pillars.
Be analytical, realistic, and tailored strictly to the company details provided.

Return JSON strictly in this structure:
{
  "userCareScore": 88,
  "userCareType": "active_pull",
  "willingnessToPayScore": 82,
  "willingnessToPayType": "budget_exists",
  "frequencyScore": 84,
  "frequencyCadence": "daily_weekly",
  "urgencyScore": 91,
  "urgencyType": "hair_on_fire",
  "reachability": 86,
  "reachabilityType": "concentrated",
  "timeToValueMinutes": 12,
  "implementationType": "plug_and_play",
  "cacCost": 420,
  "distributionLoop": "plg_supplier_loop",
  "retentionRate": 92,
  "churnRiskType": "data_compounding",
  "executiveCritique": "A sharp, 2-3 sentence partner verdict on this startup's primary moat, wedge, and biggest validation risk."
}`;

        const userPrompt = `STARTUP AUDIT INTAKE:
Company: ${comp.name}
Tagline: ${comp.tagline || comp.solution}
Problem: ${comp.problem}
Solution: ${comp.solution}
Target Audience / Buyer: ${comp.targetAudience || comp.targetBuyer || 'B2B Buyers'}
Stage: ${comp.stage || 'Pre-Seed'}
MRR / Traction: ${comp.mrr || 'Early prototype'}
Business Model: ${comp.businessModel || 'SaaS'}
Competitors: ${comp.competitors || 'Incumbents and spreadsheets'}`;

        const raw = await callConnectedAi({
          systemPrompt: sysPrompt,
          userPrompt,
          temperature: 0.2,
          jsonMode: true
        });

        const parsed = parseAiJson(raw);
        if (parsed && typeof parsed.userCareScore === 'number') {
          aiEvaluation = parsed;
        }
      } catch (err) {
        console.warn('Connected AI validation failed, using dynamic local heuristics:', err);
      }
    }

    const stages = [
      { text: `Auditing Core Pillar 1: Do ${comp.targetAudience || 'Users'} Actually Care for ${comp.name}?...`, pct: 15 },
      { text: `Auditing Core Pillar 2: Willingness to Pay & Line-Item Budget Allocation...`, pct: 30 },
      { text: `Auditing Core Pillar 3: Frequency & Daily/Weekly Habit Loops...`, pct: 45 },
      { text: `Auditing Core Pillar 4: Urgency of Problem ("Hair-on-Fire" vs Backlog)...`, pct: 60 },
      { text: `Auditing GTM Pillar 5: Market Size & Audience Reachability for ${comp.targetAudience || 'Buyers'}...`, pct: 72 },
      { text: `Auditing GTM Pillar 6: Time-to-Value & Onboarding Friction...`, pct: 84 },
      { text: `Auditing GTM Pillar 7: Distribution Loops & CAC Payback Viability...`, pct: 92 },
      { text: `Auditing GTM Pillar 8: Retention Compounding vs Churn...`, pct: 97 },
      { text: `Synthesizing 8-Pillar Validation Pulse for ${comp.name}...`, pct: 100 }
    ];

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < stages.length) {
        setValidationStage(stages[idx].text);
        setValidationProgress(stages[idx].pct);
        idx++;
      } else {
        clearInterval(interval);
        if (aiEvaluation) {
          setPillarInputs(prev => ({
            ...prev,
            ...aiEvaluation
          }));
          setAiAuditInfo({
            isAi: true,
            provider: aiCfg.providerName,
            model: aiCfg.modelName || aiCfg.modelId,
            critique: aiEvaluation.executiveCritique
          });
        }
        setIsValidating(false);
        setHasValidated(true);
      }
    }, 280);
  };

  // Copy Full Validation Dossier to Markdown
  const copyValidationDossier = () => {
    let md = `# COMPLETE 8-PILLAR STARTUP VALIDATION DOSSIER\n`;
    md += `COMPANY: ${activeCompanyName.toUpperCase()}\n`;
    md += `OVERALL VALIDATION SCORE: ${validationScore}/100 [${viabilityVerdict.badge}]\n`;
    md += `DIAGNOSTIC PULSE: Problem-Market Fit: ${problemMarketFitScore}/100 | User Pain: ${userPainScore}/100 | Monetization: ${monetizationConfidenceScore}/100\n`;
    md += `VERDICT: ${viabilityVerdict.verdict}\n\n`;

    md += `### PART 1: CORE DEMAND & PAIN VALIDATION PILLARS\n`;
    coreDemandPillars.forEach(p => {
      md += `## PILLAR ${p.number}: ${p.title.toUpperCase()} (${p.subtitle}) - ${p.score}/100 [${p.status}]\n`;
      md += `Summary: ${p.definition}\n`;
      md += `Strong Signal: ${p.strongSignal}\n`;
      md += `Friction Risk: ${p.frictionRisk}\n`;
      md += `Tactical Prescription: ${p.tacticalPrescription}\n\n`;
    });

    md += `### PART 2: GTM & SCALABILITY OPERATIONAL PILLARS\n`;
    scalabilityPillars.forEach(p => {
      md += `## PILLAR ${p.number}: ${p.title.toUpperCase()} (${p.subtitle}) - ${p.score}/100 [${p.status}]\n`;
      md += `Summary: ${p.definition}\n`;
      md += `Strong Signal: ${p.strongSignal}\n`;
      md += `Friction Risk: ${p.frictionRisk}\n`;
      md += `Tactical Prescription: ${p.tacticalPrescription}\n\n`;
    });

    navigator.clipboard?.writeText(md);
    setCopiedDossier(true);
    setTimeout(() => setCopiedDossier(false), 2000);
  };

  // Filter pillars by selected scope tab
  const displayedPillars = useMemo(() => {
    if (activePillarScope === 'demand') return coreDemandPillars;
    if (activePillarScope === 'scalability') return scalabilityPillars;
    return allPillars;
  }, [activePillarScope, coreDemandPillars, scalabilityPillars, allPillars]);

  // ═══ 0. PATHWAY LANDING PAGE (NEO-BRUTALIST INTAKE SCREEN) ═══
  if (!hasValidated) {
    return (
      <div className="min-h-[72vh] flex flex-col items-center justify-center py-8 px-4 font-mono select-none">
        {/* Badge Banner */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="bg-black text-[#00F0FF] border-2 border-black px-3.5 py-1 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#000] flex items-center gap-1.5">
            <Target size={13} className="text-[#00F0FF]" />
            <span>AI VALIDATION ENGINE</span>
          </span>
          <span className="bg-[#CCFF00] text-black border-2 border-black px-2.5 py-1 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]">
            8-PILLAR STRESS TEST // ACTIVE
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-black tracking-tight text-center mb-3">
          WILL ANYONE <span className="bg-[#4F46E5] text-white px-3 py-0.5 border-3 border-black shadow-[4px_4px_0px_#000] inline-block rotate-1">ACTUALLY CARE?</span>
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-bold text-black/80 max-w-xl text-center uppercase tracking-wide leading-relaxed mb-8">
          Stop building features nobody wants. Let AI validate your idea against search intent, pain intensity, and real-world willingness to pay.
        </p>

        {/* Loading Progress State if validating */}
        {isValidating ? (
          <div className="max-w-2xl w-full bg-white border-4 border-black shadow-[10px_10px_0px_#000] relative">
            <div className="bg-[#00F0FF] border-b-4 border-black px-4 py-2.5 flex items-center justify-between text-xs font-black uppercase text-black">
              <div className="flex items-center gap-2">
                <Activity size={14} className="animate-spin" />
                <span>[ EXECUTING // 8_PILLAR_STRESS_TEST ]</span>
              </div>
              <span className="bg-black text-[#00F0FF] px-2 py-0.5 text-[10px] font-black border border-black animate-pulse">
                CALIBRATING VIABILITY
              </span>
            </div>
            <div className="p-8 sm:p-10 text-center font-mono">
              <div className="w-20 h-20 bg-[#4F46E5] border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center mx-auto mb-4 text-white animate-pulse">
                <SearchCheck size={34} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black uppercase text-black mb-1">
                AUDITING DEMAND & GTM VIABILITY...
              </h3>
              <p className="text-xs font-bold text-neutral-600 uppercase mb-5">{validationStage}</p>
              <div className="w-full max-w-md mx-auto h-5 bg-[#FAF8F5] border-3 border-black overflow-hidden shadow-[3px_3px_0px_#000]">
                <div
                  className="h-full bg-[#4F46E5] border-r-2 border-black transition-all duration-300"
                  style={{ width: `${validationProgress}%` }}
                />
              </div>
              <div className="text-xs font-black text-black uppercase mt-3">
                [ {validationProgress}% COMPLETE // EVALUATING MARKET CONVICTION ]
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
                <span className="ml-2 font-black">[ SIMULATOR // ASSUMPTIONS_AUDIT.SYS ]</span>
              </div>
              <span className="bg-black text-[#00F0FF] px-2 py-0.5 text-[10px] font-black border border-black">
                8 PILLARS READY
              </span>
            </div>

            {/* Body */}
            <div className="p-8 sm:p-10 text-center">
              {/* Icon Box */}
              <div className="w-20 h-20 bg-[#00F0FF] border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center mx-auto mb-5 text-black">
                <Target size={34} strokeWidth={2.5} />
              </div>

              <h3 className="text-xl sm:text-2xl font-black uppercase text-black mb-1.5 tracking-tight">
                Validate Your Assumptions
              </h3>
              <p className="text-xs font-bold text-neutral-600 uppercase mb-6">
                We will analyze your market size, competitive landscape, and user psychology to give you a brutal truth check on your idea's viability.
              </p>

              {/* Assumptions Checklist Preview Box */}
              <div className="border-3 border-black bg-[#FAF8F5] p-5 mb-6 text-left shadow-[3px_3px_0px_#000]">
                <div className="text-[11px] font-black uppercase text-black mb-2 flex items-center justify-between border-b-2 border-black pb-1.5">
                  <span>[ 8-FACTOR AUDIT PROTOCOL SCOPE ]</span>
                  <span className="text-[#4F46E5]">100% UNBIASED VC CRITERIA</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-black uppercase text-black">
                  <div className="flex items-center gap-1.5"><span className="text-[#4F46E5]">▶</span> 01. Do Users Actually Care?</div>
                  <div className="flex items-center gap-1.5"><span className="text-[#4F46E5]">▶</span> 02. Willingness to Pay ($$$)</div>
                  <div className="flex items-center gap-1.5"><span className="text-[#4F46E5]">▶</span> 03. Usage Frequency (Daily/Mo)</div>
                  <div className="flex items-center gap-1.5"><span className="text-[#4F46E5]">▶</span> 04. Urgency (Hair-on-Fire)</div>
                  <div className="flex items-center gap-1.5"><span className="text-[#4F46E5]">▶</span> 05. Audience Reachability</div>
                  <div className="flex items-center gap-1.5"><span className="text-[#4F46E5]">▶</span> 06. Time-to-Value Speed</div>
                  <div className="flex items-center gap-1.5"><span className="text-[#4F46E5]">▶</span> 07. Distribution Loops & CAC</div>
                  <div className="flex items-center gap-1.5"><span className="text-[#4F46E5]">▶</span> 08. Retention vs Churn Risk</div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={triggerReValidation}
                className="bg-[#4F46E5] hover:bg-black hover:text-[#00F0FF] text-white border-3 border-black text-xs sm:text-sm font-black uppercase tracking-wider px-8 py-4 shadow-[5px_5px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2.5 mx-auto"
              >
                <Zap size={16} strokeWidth={2.5} />
                <span>[ 🎯 RUN VALIDATION PROTOCOL ]</span>
              </button>

              {/* Bottom Badges */}
              <div className="mt-8 pt-5 border-t-3 border-black flex flex-wrap items-center justify-center gap-2">
                <span className="bg-[#FAF8F5] border-2 border-black px-2.5 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">
                  ✓ THE MOM TEST TRANSLATOR
                </span>
                <span className="bg-[#FAF8F5] border-2 border-black px-2.5 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">
                  ✓ ZERO BULLSHIT VERDICT
                </span>
                <span className="bg-[#FAF8F5] border-2 border-black px-2.5 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">
                  ✓ UNIT ECONOMICS AUDIT
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

      {/* ═══ TOP BANNER: VALIDATION ENGINE HEADER & CONTROLS ═══ */}
      <div className="bg-white border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_#000] relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b-3 border-black pb-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#00F0FF] border border-black px-2 py-0.5 text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]">
                8-PILLAR VALIDATION PROTOCOL
              </span>
              <span className="bg-black text-[#CCFF00] border border-black px-2 py-0.5 text-[10px] font-black uppercase">
                {activeCompanyName}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-black tracking-tight flex items-center gap-2">
              <SearchCheck size={26} strokeWidth={2.5} />
              <span>Startup Idea Validation & Viability Engine</span>
            </h2>
            <p className="text-xs font-bold text-neutral-600 uppercase mt-0.5">
              Auditing Core Demand (User Care, Willingness to Pay, Frequency, Urgency) + GTM Scalability (Reachability, TTV, CAC, Retention).
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setHasValidated(false)}
              className="bg-white hover:bg-[#FAF8F5] border-2 border-black text-black px-3.5 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <RotateCcw size={13} />
              <span>[ ↺ PROTOCOL INTAKE ]</span>
            </button>

            <button
              onClick={() => setIsEditingPillars(!isEditingPillars)}
              className="bg-white hover:bg-[#FAF8F5] border-2 border-black text-black px-3.5 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <Sliders size={13} strokeWidth={2.5} />
              <span>{isEditingPillars ? 'CLOSE CALIBRATOR' : 'CALIBRATE ASSUMPTIONS'}</span>
            </button>

            <button
              onClick={copyValidationDossier}
              className="bg-white hover:bg-[#CCFF00] border-2 border-black text-black px-3.5 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
              title="Copy complete markdown dossier for investor pitch deck or Notion"
            >
              {copiedDossier ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copiedDossier ? 'COPIED TO CLIPBOARD!' : 'EXPORT DOSSIER'}</span>
            </button>

            <button
              onClick={triggerReValidation}
              disabled={isValidating}
              className="bg-[#CCFF00] hover:bg-[#b8e600] border-2 border-black text-black px-4 py-1.5 text-xs font-black uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <RotateCcw size={13} className={isValidating ? "animate-spin" : ""} strokeWidth={2.5} />
              <span>[ ↺ RE-AUDIT IDEA ]</span>
            </button>
          </div>
        </div>

        {/* AI Validation Callout if Audited with Connected Model */}
        {aiAuditInfo && (
          <div className="mb-4 p-4 bg-black text-white border-3 border-black shadow-[4px_4px_0px_#000] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#CCFF00] text-[10px] font-black uppercase">
                <Bot size={14} className="stroke-[2.5]" />
                <span>AUDITED BY CONNECTED AI // {aiAuditInfo.provider} ({aiAuditInfo.model})</span>
              </div>
              <p className="text-xs font-bold text-neutral-100">
                "{aiAuditInfo.critique}"
              </p>
            </div>
            <span className="shrink-0 px-2 py-0.5 bg-[#CCFF00] text-black text-[10px] font-black border border-black uppercase">
              100% UNBIASED VC AUDIT
            </span>
          </div>
        )}

        {/* Quick Startup Profile Presets Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5] border-2 border-black p-3 mb-4 shadow-[2px_2px_0px_#000]">
          <span className="text-[10px] font-black uppercase text-black flex items-center gap-1.5">
            <Compass size={13} /> [ BENCHMARK PRESETS FOR STRESS-TESTING ]:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {[
              ...(userCompany && userCompany.name ? [{ id: 'user_company', label: `${userCompany.name} (Your Venture)` }] : []),
              { id: 'climatelens', label: 'B2B ESG Benchmark' },
              { id: 'devtools', label: 'DevOps / Developer Tool' },
              { id: 'tax_prep', label: 'Consumer Tool (High Churn Risk)' }
            ].map(preset => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`px-2.5 py-1 text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] transition-all ${activeProfileKey === preset.id
                    ? 'bg-black text-[#CCFF00]'
                    : 'bg-white text-black hover:bg-neutral-100'
                  }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* ═══ INTERACTIVE PILLARS CALIBRATION DRAWER ═══ */}
        <AnimatePresence>
          {isEditingPillars && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t-3 border-black overflow-hidden"
            >
              <div className="text-xs font-black uppercase tracking-wider text-black mb-3 flex items-center gap-2">
                <Sliders size={14} /> [ CALIBRATE STARTUP OPERATIONAL PARAMETERS ]
              </div>

              {/* 1. Core Demand & Pain Calibrators */}
              <div className="mb-4">
                <div className="text-[11px] font-black uppercase text-[#5850EC] mb-2 flex items-center gap-1.5">
                  <Sparkles size={13} /> [ SECTION A: CORE USER DEMAND & PAIN CALIBRATORS ]
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Calibrator 1: Do users care */}
                  <div className="bg-[#FAF8F5] border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                    <label className="block text-[10px] font-black uppercase text-black mb-1">
                      1. Do Users Care?
                    </label>
                    <select
                      value={pillarInputs.userCareType}
                      onChange={(e) => setPillarInputs(prev => ({ ...prev, userCareType: e.target.value }))}
                      className="w-full bg-white border-2 border-black p-1.5 text-xs font-black uppercase mb-2 focus:outline-none"
                    >
                      <option value="active_pull">Active Inbound Pull (Visceral Need)</option>
                      <option value="polite_indifference">Polite Indifference (Nice-to-Have)</option>
                    </select>
                    <div className="text-[9px] font-bold text-neutral-600">
                      Desire Confidence: {pillarInputs.userCareScore}%
                    </div>
                  </div>

                  {/* Calibrator 2: Willingness to Pay */}
                  <div className="bg-[#FAF8F5] border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                    <label className="block text-[10px] font-black uppercase text-black mb-1">
                      2. Willingness to Pay
                    </label>
                    <select
                      value={pillarInputs.willingnessToPayType}
                      onChange={(e) => setPillarInputs(prev => ({ ...prev, willingnessToPayType: e.target.value }))}
                      className="w-full bg-white border-2 border-black p-1.5 text-xs font-black uppercase mb-2 focus:outline-none"
                    >
                      <option value="budget_exists">Budget Exists / Replaces Line Item</option>
                      <option value="reluctant_discounts">Reluctant / Heavy Free Tier Bias</option>
                    </select>
                    <div className="text-[9px] font-bold text-neutral-600">
                      Pricing Power: {pillarInputs.willingnessToPayScore}%
                    </div>
                  </div>

                  {/* Calibrator 3: Frequency */}
                  <div className="bg-[#FAF8F5] border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                    <label className="block text-[10px] font-black uppercase text-black mb-1">
                      3. Usage Frequency
                    </label>
                    <select
                      value={pillarInputs.frequencyCadence}
                      onChange={(e) => setPillarInputs(prev => ({ ...prev, frequencyCadence: e.target.value }))}
                      className="w-full bg-white border-2 border-black p-1.5 text-xs font-black uppercase mb-2 focus:outline-none"
                    >
                      <option value="daily_weekly">Daily / Weekly Operational Workflow</option>
                      <option value="monthly_quarterly">Monthly / Quarterly Continuous Ledger</option>
                      <option value="annual_episodic">Annual / Episodic (One-and-Done)</option>
                    </select>
                    <div className="text-[9px] font-bold text-neutral-600">
                      Cadence Score: {pillarInputs.frequencyScore}%
                    </div>
                  </div>

                  {/* Calibrator 4: Urgency */}
                  <div className="bg-[#FAF8F5] border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                    <label className="block text-[10px] font-black uppercase text-black mb-1">
                      4. Urgency of Problem
                    </label>
                    <select
                      value={pillarInputs.urgencyType}
                      onChange={(e) => setPillarInputs(prev => ({ ...prev, urgencyType: e.target.value }))}
                      className="w-full bg-white border-2 border-black p-1.5 text-xs font-black uppercase mb-2 focus:outline-none"
                    >
                      <option value="hair_on_fire">Hair-on-Fire (Immediate Mandate/Cost)</option>
                      <option value="backlog_nice_to_have">Backlog (Can Wait Until Next Quarter)</option>
                    </select>
                    <div className="text-[9px] font-bold text-neutral-600">
                      Urgency Level: {pillarInputs.urgencyScore}%
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. GTM & Scalability Calibrators */}
              <div className="mb-4">
                <div className="text-[11px] font-black uppercase text-[#00A86B] mb-2 flex items-center gap-1.5">
                  <Compass size={13} /> [ SECTION B: GTM & SCALABILITY OPERATIONAL CALIBRATORS ]
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Pillar 5 Calibrator (Reachability) */}
                  <div className="bg-[#FAF8F5] border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                    <label className="block text-[10px] font-black uppercase text-black mb-1">
                      5. Audience Reachability
                    </label>
                    <select
                      value={pillarInputs.reachabilityType}
                      onChange={(e) => setPillarInputs(prev => ({ ...prev, reachabilityType: e.target.value }))}
                      className="w-full bg-white border-2 border-black p-1.5 text-xs font-black uppercase mb-2 focus:outline-none"
                    >
                      <option value="concentrated">Concentrated (Job Titles & LinkedIn)</option>
                      <option value="fragmented">Fragmented (Dispersed / Unreachable)</option>
                    </select>
                    <div className="text-[9px] font-bold text-neutral-600">
                      Reach Confidence: {pillarInputs.reachability}%
                    </div>
                  </div>

                  {/* Pillar 6 Calibrator (TTV) */}
                  <div className="bg-[#FAF8F5] border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                    <label className="block text-[10px] font-black uppercase text-black mb-1">
                      6. Time-to-Value (Minutes)
                    </label>
                    <input
                      type="number"
                      value={pillarInputs.timeToValueMinutes}
                      onChange={(e) => setPillarInputs(prev => ({ ...prev, timeToValueMinutes: Number(e.target.value) }))}
                      className="w-full bg-white border-2 border-black p-1.5 text-xs font-black mb-2 focus:outline-none"
                    />
                    <select
                      value={pillarInputs.implementationType}
                      onChange={(e) => setPillarInputs(prev => ({ ...prev, implementationType: e.target.value }))}
                      className="w-full bg-white border-2 border-black p-1.5 text-xs font-black uppercase focus:outline-none"
                    >
                      <option value="plug_and_play">Plug-and-Play / 1-Click Upload</option>
                      <option value="custom_it">Complex IT Approval / Integration</option>
                    </select>
                  </div>

                  {/* Pillar 7 Calibrator (CAC) */}
                  <div className="bg-[#FAF8F5] border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                    <label className="block text-[10px] font-black uppercase text-black mb-1">
                      7. Distribution Model & CAC
                    </label>
                    <select
                      value={pillarInputs.distributionLoop}
                      onChange={(e) => setPillarInputs(prev => ({ ...prev, distributionLoop: e.target.value }))}
                      className="w-full bg-white border-2 border-black p-1.5 text-xs font-black uppercase mb-2 focus:outline-none"
                    >
                      <option value="plg_supplier_loop">PLG Supplier/Vendor Invite Loop</option>
                      <option value="word_of_mouth">Word of Mouth / Low-Cost Outbound</option>
                      <option value="high_paid_cpc">Paid Ad Dependence (High CAC)</option>
                    </select>
                    <div className="text-[9px] font-bold text-neutral-600">
                      Est. CAC: ${pillarInputs.cacCost} / Account
                    </div>
                  </div>

                  {/* Pillar 8 Calibrator (Retention) */}
                  <div className="bg-[#FAF8F5] border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                    <label className="block text-[10px] font-black uppercase text-black mb-1">
                      8. Retention Typology
                    </label>
                    <select
                      value={pillarInputs.churnRiskType}
                      onChange={(e) => setPillarInputs(prev => ({ ...prev, churnRiskType: e.target.value }))}
                      className="w-full bg-white border-2 border-black p-1.5 text-xs font-black uppercase mb-2 focus:outline-none"
                    >
                      <option value="data_compounding">Data Compounding (Recurring Value)</option>
                      <option value="project_churn">Project-Based Churn (One-and-Done)</option>
                    </select>
                    <div className="text-[9px] font-bold text-neutral-600">
                      Baseline Retention: {pillarInputs.retentionRate}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-black/20 pt-3">
                <button
                  onClick={() => setIsEditingPillars(false)}
                  className="bg-[#FAF8F5] hover:bg-neutral-200 border-2 border-black px-4 py-1.5 text-xs font-black uppercase"
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    setIsEditingPillars(false);
                    triggerReValidation();
                  }}
                  className="bg-[#CCFF00] hover:bg-[#b8e600] border-2 border-black px-4 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000]"
                >
                  Save & Re-Audit
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══ 4 HIGH-LEVEL VALIDATION PULSE CARDS (MATCHING USER BENCHMARK) ═══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

        {/* Card 1: Validation Score */}
        <div className="bg-[#F0F3FF] border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000] flex flex-col justify-between transition-all hover:-translate-y-0.5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-bold text-neutral-600">Validation Score</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#5850EC] animate-pulse" />
            </div>
            <div className="text-4xl sm:text-5xl font-black text-[#5850EC] tracking-tight">
              {validationScore}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-black/10 flex items-center justify-between text-[10px] font-black uppercase text-neutral-500">
            <span>SYNTHESIZED AUDIT</span>
            <span className="text-[#5850EC] font-bold">8 PILLARS</span>
          </div>
        </div>

        {/* Card 2: Problem-Market Fit */}
        <div className="bg-[#EAFBF3] border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000] flex flex-col justify-between transition-all hover:-translate-y-0.5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-bold text-neutral-600">Problem-Market Fit</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B]" />
            </div>
            <div className="text-4xl sm:text-5xl font-black text-[#00A86B] tracking-tight">
              {problemMarketFitScore}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-black/10 flex items-center justify-between text-[10px] font-black uppercase text-neutral-500">
            <span>DEMAND SIGNAL</span>
            <span className="text-[#00A86B] font-bold">STRONG</span>
          </div>
        </div>

        {/* Card 3: User Pain Score */}
        <div className="bg-[#FFF0F2] border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000] flex flex-col justify-between transition-all hover:-translate-y-0.5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-bold text-neutral-600">User Pain Score</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
            </div>
            <div className="text-4xl sm:text-5xl font-black text-[#E11D48] tracking-tight">
              {userPainScore}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-black/10 flex items-center justify-between text-[10px] font-black uppercase text-neutral-500">
            <span>PAIN INTENSITY</span>
            <span className="text-[#E11D48] font-bold">HAIR-ON-FIRE</span>
          </div>
        </div>

        {/* Card 4: Monetization Confidence */}
        <div className="bg-[#FEF9EC] border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000] flex flex-col justify-between transition-all hover:-translate-y-0.5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-bold text-neutral-600">Monetization Confidence</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
            </div>
            <div className="text-4xl sm:text-5xl font-black text-[#D97706] tracking-tight">
              {monetizationConfidenceScore}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-black/10 flex items-center justify-between text-[10px] font-black uppercase text-neutral-500">
            <span>WTP & ECONOMICS</span>
            <span className="text-[#D97706] font-bold">MODERATE</span>
          </div>
        </div>

      </div>

      {/* ═══ VALIDATION PROGRESS LOADER ═══ */}
      {isValidating && (
        <div className="bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_#000]">
          <div className="w-14 h-14 bg-[#00F0FF] border-3 border-black mx-auto mb-3 flex items-center justify-center animate-pulse shadow-[4px_4px_0px_#000]">
            <SearchCheck size={28} />
          </div>
          <h3 className="text-lg font-black uppercase text-black mb-1">
            RUNNING COMPLETE 8-PILLAR VALIDATION AUDIT...
          </h3>
          <p className="text-xs font-bold text-neutral-600 uppercase mb-4">{validationStage}</p>
          <div className="w-full max-w-md mx-auto h-4 bg-[#FAF8F5] border-2 border-black overflow-hidden shadow-[2px_2px_0px_#000]">
            <div className="h-full bg-[#00F0FF] transition-all" style={{ width: `${validationProgress}%` }} />
          </div>
        </div>
      )}

      {!isValidating && (
        <>
          {/* ═══ HERO SCORE BANNER: OVERALL VALIDATION SCORE & SYNTHESIS ═══ */}
          <div className="bg-black text-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000] relative">
            <div className="absolute top-2 right-3 text-white/30 text-[10px] font-black tracking-widest hidden sm:block">
              [ 8-PILLAR STARTUP VALIDATION ENGINE // AUDITED ]
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Column: Grade & Status */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 border-2 border-white text-xs font-black uppercase shadow-[2px_2px_0px_#FFF] ${viabilityVerdict.badgeColor}`}>
                    {viabilityVerdict.badge}
                  </span>
                  <span className="bg-zinc-800 text-white border border-white/40 px-2 py-0.5 text-[10px] font-black uppercase">
                    8-PILLAR STRESS TEST
                  </span>
                </div>

                <div className="flex items-baseline gap-4">
                  <div className="text-6xl sm:text-7xl font-black text-[#CCFF00] tracking-tighter">
                    {validationScore}
                    <span className="text-2xl sm:text-3xl text-white/50 font-black">/100</span>
                  </div>
                  <div className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${viabilityVerdict.color}`}>
                    {viabilityVerdict.verdict.split('—')[0]}
                  </div>
                </div>

                <div className="border-l-4 border-[#00F0FF] pl-4 py-1">
                  <div className="text-xs font-black uppercase text-[#00F0FF] mb-1">
                    AI MARKET VIABILITY SYNTHESIS:
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-white/90 uppercase leading-relaxed">
                    "{viabilityVerdict.synthesis}"
                  </p>
                </div>

                <div className="text-xs font-black text-white/70 uppercase">
                  // CRITICAL DIRECTIVE: <strong className="text-white">{viabilityVerdict.action}</strong>
                </div>
              </div>

              {/* Right Column: 8 Pillar Mini-Scores */}
              <div className="lg:col-span-5 bg-zinc-950 border-3 border-white p-4 space-y-2.5 shadow-[4px_4px_0px_#FFF]">
                <div className="text-[11px] font-black uppercase text-white/70 border-b border-white/20 pb-1.5 flex justify-between">
                  <span>ALL 8 VALIDATION PILLARS</span>
                  <span className="text-[#CCFF00]">STATUS</span>
                </div>

                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {allPillars.map((p) => (
                    <div key={p.id} className="space-y-0.5">
                      <div className="flex justify-between text-[10px] font-black uppercase text-white">
                        <span className="truncate pr-2">{p.number}. {p.title}</span>
                        <span className={`shrink-0 ${p.score >= 80 ? 'text-[#CCFF00]' : p.score >= 60 ? 'text-[#FFDE59]' : 'text-[#FF0033]'}`}>
                          {p.score}/100 [{p.status}]
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-800 border border-white/40 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${p.score}%` }}
                          className={`h-full ${p.accentColor}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ═══ VIEW CATEGORY SELECTOR TABS ═══ */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border-3 border-black p-3.5 shadow-[4px_4px_0px_#000]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-black uppercase text-neutral-500 mr-1">
                AUDIT SCOPE:
              </span>
              {[
                { id: 'all', label: `ALL 8 PILLARS (${allPillars.length})` },
                { id: 'demand', label: `1. CORE DEMAND & PAIN (${coreDemandPillars.length})` },
                { id: 'scalability', label: `2. GTM & SCALABILITY (${scalabilityPillars.length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePillarScope(tab.id)}
                  className={`px-3 py-1.5 text-xs font-black uppercase border-2 border-black transition-all ${activePillarScope === tab.id
                      ? 'bg-black text-[#CCFF00] shadow-[2px_2px_0px_#000]'
                      : 'bg-[#FAF8F5] text-black hover:bg-neutral-100 shadow-[2px_2px_0px_#000]'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="text-[10px] font-black uppercase text-neutral-500">
              CLICK CARDS TO TOGGLE TACTICAL PRESCRIPTION
            </span>
          </div>

          {/* ═══ THE DEEP DIVE PILLAR CARDS ═══ */}
          <div className="space-y-6">

            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000] gap-2">
              <div>
                <h3 className="font-black text-base uppercase text-black flex items-center gap-2">
                  <CheckSquare size={18} className="stroke-[2.5]" />
                  <span>
                    {activePillarScope === 'demand'
                      ? 'CORE DEMAND & PAIN AUDIT (DO USERS CARE, WILLINGNESS TO PAY, FREQUENCY, URGENCY)'
                      : activePillarScope === 'scalability'
                        ? 'GTM & OPERATIONAL SCALABILITY AUDIT (REACHABILITY, TTV, CAC, RETENTION)'
                        : 'COMPLETE 8-PILLAR STARTUP VALIDATION DOSSIER'}
                  </span>
                </h3>
                <p className="text-xs font-bold text-neutral-600 uppercase">
                  Examine Strong Signals vs Fatal Friction Risks across every critical dimension of your startup.
                </p>
              </div>
            </div>

            {/* Pillar Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedPillars.map((pillar) => {
                const Icon = pillar.icon;
                const isExpanded = expandedPillar === pillar.id;

                return (
                  <div
                    key={pillar.id}
                    className={`bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col justify-between transition-all ${isExpanded ? 'ring-2 ring-black' : ''
                      }`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex justify-between items-start border-b-2 border-black pb-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 border-3 border-black ${pillar.accentColor} flex items-center justify-center text-black shadow-[3px_3px_0px_#000] shrink-0`}>
                            <Icon size={24} strokeWidth={2.5} />
                          </div>
                          <div>
                            <div className="text-[10px] font-black uppercase text-neutral-500">
                              [{pillar.category}] // PILLAR {pillar.number} // {pillar.subtitle}
                            </div>
                            <h4 className="text-lg font-black uppercase text-black tracking-tight leading-tight">
                              {pillar.title}
                            </h4>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-black text-black">{pillar.score}/100</div>
                          <span className={`px-2 py-0.5 border border-black text-[9px] font-black uppercase ${pillar.statusColor}`}>
                            {pillar.status}
                          </span>
                        </div>
                      </div>

                      {/* Definition */}
                      <p className="text-xs font-bold text-neutral-700 uppercase leading-relaxed mb-4">
                        {pillar.definition}
                      </p>

                      {/* Strong Signal vs Friction Risk Breakdown */}
                      <div className="space-y-3 mb-4">
                        <div className="bg-[#F0FFF0] border-2 border-black p-3 text-xs font-bold text-black shadow-[2px_2px_0px_#000]">
                          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-700 mb-1">
                            <CheckCircle2 size={13} />
                            <span>STRONG SIGNAL (VALIDATION BENCHMARK):</span>
                          </div>
                          <p className="leading-relaxed text-neutral-800">{pillar.strongSignal}</p>
                        </div>

                        <div className="bg-[#FFF0F0] border-2 border-black p-3 text-xs font-bold text-black shadow-[2px_2px_0px_#000]">
                          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-[#FF0033] mb-1">
                            <AlertTriangle size={13} />
                            <span>FRICTION RISK (FAILURE VULNERABILITY):</span>
                          </div>
                          <p className="leading-relaxed text-neutral-800">{pillar.frictionRisk}</p>
                        </div>
                      </div>

                      {/* Evidence Metrics List */}
                      <div className="bg-[#FAF8F5] border-2 border-black p-3 space-y-1.5 mb-4 text-xs font-bold">
                        <div className="text-[10px] font-black uppercase text-neutral-500 mb-1">
                          [ TELEMETRY & SIGNAL AUDIT ]:
                        </div>
                        {pillar.evidencePoints.map((ep, idx) => (
                          <div key={idx} className="flex justify-between items-center text-[11px] border-b border-black/10 pb-1">
                            <span className="text-neutral-600">{ep.label}:</span>
                            <span className={`font-black uppercase text-right pl-2 ${ep.status === 'positive' ? 'text-black' : ep.status === 'warning' ? 'text-[#FF5722]' : 'text-[#FF0033]'
                              }`}>
                              {ep.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prescription & Accordion Toggle */}
                    <div>
                      <div className="border-t-2 border-black pt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-black">
                            TACTICAL PRESCRIPTION
                          </span>
                          <button
                            onClick={() => setExpandedPillar(isExpanded ? null : pillar.id)}
                            className="text-[10px] font-black uppercase text-neutral-500 hover:text-black flex items-center gap-1 cursor-pointer"
                          >
                            <span>{isExpanded ? 'COLLAPSE' : 'VIEW ACTION'}</span>
                            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="mt-2.5 bg-black text-[#CCFF00] p-3 text-xs font-bold border-2 border-black shadow-[2px_2px_0px_#000] leading-relaxed">
                            <strong className="text-white uppercase block mb-1">
                              HOW TO ELIMINATE THIS FRICTION RISK TODAY:
                            </strong>
                            {pillar.tacticalPrescription}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* ═══ GO / NO-GO MILESTONE GATE CHECKLIST ═══ */}
          <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000]">
            <div className="border-b-3 border-black pb-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#CCFF00] text-black px-2 py-0.5 text-[10px] font-black uppercase">
                  DECISION GATE
                </span>
                <span className="text-[10px] font-bold text-neutral-500 uppercase">
                  BEFORE SCALING ENGINEERING OR HIRES
                </span>
              </div>
              <h3 className="text-xl font-black uppercase text-black tracking-tight flex items-center gap-2">
                <ShieldCheck size={22} className="stroke-[2.5]" />
                The 8-Pillar "Go / No-Go" Deployment Checklist
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Gate 1: User Care */}
              <div className="bg-[#FAF8F5] border-2 border-black p-4 space-y-2 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#CCFF00] border border-black flex items-center justify-center font-black text-xs">✓</span>
                  <span className="text-xs font-black uppercase text-black">Gate 1: Visceral User Care & Organic Pull Proof</span>
                </div>
                <p className="text-xs font-bold text-neutral-700 leading-relaxed pl-7">
                  At least 10 target buyers complain vigorously unprompted about status quo pain and repeatedly ask when they can get access.
                </p>
              </div>

              {/* Gate 2: Willingness to Pay */}
              <div className="bg-[#FAF8F5] border-2 border-black p-4 space-y-2 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#CCFF00] border border-black flex items-center justify-center font-black text-xs">✓</span>
                  <span className="text-xs font-black uppercase text-black">Gate 2: Quantified Willingness to Pay</span>
                </div>
                <p className="text-xs font-bold text-neutral-700 leading-relaxed pl-7">
                  Buyers commit to a signed LOI, upfront pilot fee, or state the exact budget line-item this software replaces.
                </p>
              </div>

              {/* Gate 3: Frequency */}
              <div className="bg-[#FAF8F5] border-2 border-black p-4 space-y-2 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#CCFF00] border border-black flex items-center justify-center font-black text-xs">✓</span>
                  <span className="text-xs font-black uppercase text-black">Gate 3: High-Frequency Habit / Anomaly Trigger</span>
                </div>
                <p className="text-xs font-bold text-neutral-700 leading-relaxed pl-7">
                  Users touch or rely on the product at least weekly, or continuous background monitoring prevents login amnesia.
                </p>
              </div>

              {/* Gate 4: Urgency of Problem */}
              <div className="bg-[#FAF8F5] border-2 border-black p-4 space-y-2 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#CCFF00] border border-black flex items-center justify-center font-black text-xs">✓</span>
                  <span className="text-xs font-black uppercase text-black">Gate 4: Urgent "Hair-on-Fire" Mandate/Risk</span>
                </div>
                <p className="text-xs font-bold text-neutral-700 leading-relaxed pl-7">
                  Delaying or ignoring this problem costs the buyer active revenue, compliance disqualification, or severe business penalties.
                </p>
              </div>

              {/* Gate 5: Reachability */}
              <div className="bg-[#FAF8F5] border-2 border-black p-4 space-y-2 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#CCFF00] border border-black flex items-center justify-center font-black text-xs">✓</span>
                  <span className="text-xs font-black uppercase text-black">Gate 5: Minimum 50 Reachable Target Buyers</span>
                </div>
                <p className="text-xs font-bold text-neutral-700 leading-relaxed pl-7">
                  You can immediately extract a list of 50 exact names and email addresses matching your ICP without paying for ads.
                </p>
              </div>

              {/* Gate 6: TTV */}
              <div className="bg-[#FAF8F5] border-2 border-black p-4 space-y-2 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#CCFF00] border border-black flex items-center justify-center font-black text-xs">✓</span>
                  <span className="text-xs font-black uppercase text-black">Gate 6: Sub-180 Second Onboarding Proof</span>
                </div>
                <p className="text-xs font-bold text-neutral-700 leading-relaxed pl-7">
                  A first-time user can experience the core outcome without developer intervention or an onboarding Zoom call.
                </p>
              </div>

              {/* Gate 7: CAC Payback */}
              <div className="bg-[#FAF8F5] border-2 border-black p-4 space-y-2 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#CCFF00] border border-black flex items-center justify-center font-black text-xs">✓</span>
                  <span className="text-xs font-black uppercase text-black">Gate 7: Sub-6 Month CAC Payback Ratio</span>
                </div>
                <p className="text-xs font-bold text-neutral-700 leading-relaxed pl-7">
                  Customer revenue in the first 6 months fully recoups the cost to acquire them via outbound or organic loops.
                </p>
              </div>

              {/* Gate 8: Retention */}
              <div className="bg-[#FAF8F5] border-2 border-black p-4 space-y-2 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#CCFF00] border border-black flex items-center justify-center font-black text-xs">✓</span>
                  <span className="text-xs font-black uppercase text-black">Gate 8: Recurring Value vs One-and-Done</span>
                </div>
                <p className="text-xs font-bold text-neutral-700 leading-relaxed pl-7">
                  The product becomes more valuable the longer they stay, eliminating project-based cancellation risks.
                </p>
              </div>

            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-black">
              <span className="text-xs font-bold text-neutral-600 uppercase">
                Ready to take this validated plan to the sprint board?
              </span>
              <button
                onClick={copyValidationDossier}
                className="bg-black hover:bg-[#CCFF00] text-white hover:text-black border-2 border-black px-5 py-2.5 text-xs font-black uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>EXPORT COMPLETE VALIDATION DOSSIER</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
