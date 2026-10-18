import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, Banknote, Rocket, BarChart3, TrendingUp, Target,
  ShieldAlert, ShieldCheck, CheckCircle2, AlertTriangle, RotateCcw,
  Sliders, Copy, Check, Flame, Clock, DollarSign, Layers,
  PieChart, Zap, Sparkles, ArrowUpRight, Activity, Percent,
  ChevronDown, ChevronUp, Info, Building2, HelpCircle
} from 'lucide-react';
import { getUserCompanyData } from '../utils/aiConfig';

// ═══════════════════════════════════════════════════════════════════════════
// CURRENT VENTURE CAPITAL MARKET SCENARIOS & BENCHMARKS (2024 - 2026)
// ═══════════════════════════════════════════════════════════════════════════

const MARKET_SCENARIOS = {
  'post-zirp': {
    id: 'post-zirp',
    name: 'CURRENT MARKET: Post-ZIRP Flight to Capital Efficiency',
    yearTag: '2024 - 2026 BENCHMARK',
    badgeColor: 'bg-[#CCFF00] text-black',
    overview: 'The era of cheap capital is over. Tier-1 VCs demand verified unit economics, capital efficiency (Burn Multiple < 1.2x), and rock-solid customer retention. Churn is heavily penalized as acquisition cannot compound.',
    seedArrFloor: 180000,
    seedMrrFloor: 15000,
    targetMomGrowth: 15,
    maxGrossChurn: 1.5,
    minNrr: 105,
    maxBurnMultiple: 1.2,
    medianSeedValuation: '$9M - $13M Post',
    typicalSeedCheck: '$1.5M - $2.5M',
    multipleRange: '8x - 14x NTM ARR',
    partnerPriority: 'Capital preservation, repeatable GTM, bottom-up market realism.'
  },
  'ai-frontier': {
    id: 'ai-frontier',
    name: 'AI FRONTIER: Compute Expansion & High Velocity',
    yearTag: '2025 - 2026 AI CLIMATE',
    badgeColor: 'bg-[#00F0FF] text-black',
    overview: 'High investor enthusiasm with elevated growth bars (> 20% MoM). Heavy scrutiny on gross margins after LLM API/GPU compute costs and vulnerability to base foundation models.',
    seedArrFloor: 120000,
    seedMrrFloor: 10000,
    targetMomGrowth: 22,
    maxGrossChurn: 2.0,
    minNrr: 110,
    maxBurnMultiple: 1.6,
    medianSeedValuation: '$12M - $18M Post',
    typicalSeedCheck: '$2.0M - $3.5M',
    multipleRange: '15x - 30x NTM ARR',
    partnerPriority: 'Proprietary fine-tuning, workflow integration defensibility, Gross Margin > 70%.'
  },
  'enterprise-b2b': {
    id: 'enterprise-b2b',
    name: 'ENTERPRISE B2B: High ACV & NRR Flight to Quality',
    yearTag: 'ENTERPRISE CONTRACTS',
    badgeColor: 'bg-[#FFDE59] text-black',
    overview: 'Enterprise buyers have strict budgets. VCs look for ACVs > $15k, multi-year commitments, high NRR (> 115%), and sub-6 month CAC payback periods.',
    seedArrFloor: 220000,
    seedMrrFloor: 18500,
    targetMomGrowth: 12,
    maxGrossChurn: 0.8,
    minNrr: 115,
    maxBurnMultiple: 1.0,
    medianSeedValuation: '$10M - $14M Post',
    typicalSeedCheck: '$1.75M - $2.75M',
    multipleRange: '10x - 16x NTM ARR',
    partnerPriority: 'Pilot-to-paid conversion rates, procurement speed, Net Negative Churn.'
  },
  'crunch-downturn': {
    id: 'crunch-downturn',
    name: 'SERIES A CRUNCH: Top 5% Survival Barometer',
    yearTag: 'STRESS TEST BAROMETER',
    badgeColor: 'bg-[#FF0033] text-white',
    overview: 'Extreme risk aversion. Over 70% of seed-stage companies fail to raise Series A. Only startups that are Default Alive or have > 18 months runway and top 5% metrics get funded.',
    seedArrFloor: 300000,
    seedMrrFloor: 25000,
    targetMomGrowth: 18,
    maxGrossChurn: 1.0,
    minNrr: 112,
    maxBurnMultiple: 0.8,
    medianSeedValuation: '$7M - $10M Post',
    typicalSeedCheck: '$1.0M - $2.0M',
    multipleRange: '6x - 10x NTM ARR',
    partnerPriority: 'Default alive path, organic customer acquisition, zero dependency on follow-on rounds.'
  }
};

export default function InvestorReadinessAudit({ companyData }) {
  const startupName = companyData?.name || getUserCompanyData()?.name || 'VentureScale AI';

  // Current Market Scenario Selection
  const [selectedScenarioKey, setSelectedScenarioKey] = useState('post-zirp');
  const scenario = MARKET_SCENARIOS[selectedScenarioKey];

  // Core Audited Metrics State (Seeded from companyData or realistic B2B defaults)
  const [metrics, setMetrics] = useState({
    mrr: 18400,
    mrrGrowthMoM: 22,
    grossChurnMonthly: 1.2,
    netRevenueRetention: 112,
    tamBillions: 14.2,
    samBillions: 2.8,
    somMillions: 125,
    targetAccountsSom: 15000,
    averageAcv: 8300,
    monthlyBurn: 14500,
    runwayMonths: 14,
    releasesPerWeek: 4,
    sprintCycleDays: 7,
    timeToValueMinutes: 14,
    cacPaybackMonths: 5.2
  });

  const [isCalibrating, setIsCalibrating] = useState(false);
  const [copiedMemo, setCopiedMemo] = useState(false);
  const [expandedMetric, setExpandedMetric] = useState(null);
  const [hasAudited, setHasAudited] = useState(false); // Starts on pathway screen, calculating score reveals audited radar
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(100);
  const [auditStage, setAuditStage] = useState('');

  // Synchronize companyData if provided
  useEffect(() => {
    if (companyData) {
      if (companyData.mrr) {
        const numMrr = parseFloat(String(companyData.mrr).replace(/[^0-9.]/g, ''));
        if (!isNaN(numMrr) && numMrr > 0) {
          setMetrics(prev => ({ ...prev, mrr: numMrr }));
        }
      }
      if (companyData.runway) {
        const numRunway = parseFloat(String(companyData.runway).replace(/[^0-9.]/g, ''));
        if (!isNaN(numRunway) && numRunway > 0) {
          setMetrics(prev => ({ ...prev, runwayMonths: numRunway }));
        }
      }
    }
  }, [companyData]);

  // Derived Financials & Execution Math
  const arr = useMemo(() => metrics.mrr * 12, [metrics.mrr]);
  const netNewMonthlyArr = useMemo(() => {
    const netNewMrr = metrics.mrr * (metrics.mrrGrowthMoM / 100);
    return netNewMrr * 12;
  }, [metrics.mrr, metrics.mrrGrowthMoM]);

  // Burn Multiple = Net Monthly Burn * 12 / Net New ARR in Year
  const burnMultiple = useMemo(() => {
    if (netNewMonthlyArr <= 0) return 9.9;
    const annualizedBurn = metrics.monthlyBurn * 12;
    return parseFloat((annualizedBurn / netNewMonthlyArr).toFixed(2));
  }, [metrics.monthlyBurn, netNewMonthlyArr]);

  // Bottom-up SOM calculation: Target Accounts * ACV
  const bottomUpSomCalculated = useMemo(() => {
    return (metrics.targetAccountsSom * metrics.averageAcv) / 1000000; // in Millions
  }, [metrics.targetAccountsSom, metrics.averageAcv]);

  // SOM credibility ratio (Ratio of Bottom-Up vs Stated SOM)
  const somCredibilityRatio = useMemo(() => {
    if (metrics.somMillions <= 0) return 0;
    return Math.min(1.5, bottomUpSomCalculated / metrics.somMillions);
  }, [bottomUpSomCalculated, metrics.somMillions]);

  // ═════════════════════════════════════════════════════════════════════════
  // CATEGORY SCORE AUDITS (0 - 100) CALIBRATED TO MARKET SCENARIO
  // ═════════════════════════════════════════════════════════════════════════

  const categoryScores = useMemo(() => {
    // 1. ARR & MRR Velocity Score
    let arrScore = Math.min(100, Math.round((arr / scenario.seedArrFloor) * 60));
    let growthScore = Math.min(40, Math.round((metrics.mrrGrowthMoM / scenario.targetMomGrowth) * 40));
    const revenueScore = Math.min(100, Math.max(10, arrScore + growthScore));

    // 2. Churn & Customer Retention Health Score
    // Gross churn penalty: lower is better (< maxGrossChurn)
    let churnBase = 50;
    if (metrics.grossChurnMonthly <= scenario.maxGrossChurn) {
      churnBase += 25 + Math.round((scenario.maxGrossChurn - metrics.grossChurnMonthly) * 20);
    } else {
      churnBase -= Math.round((metrics.grossChurnMonthly - scenario.maxGrossChurn) * 25);
    }
    // NRR boost
    let nrrBoost = (metrics.netRevenueRetention - 100) * 1.5;
    const retentionScore = Math.min(100, Math.max(15, Math.round(churnBase + nrrBoost)));

    // 3. TAM, SAM, SOM Market Sizing Score
    let tamScore = metrics.tamBillions >= 10 ? 35 : (metrics.tamBillions / 10) * 35;
    let samScore = metrics.samBillions >= 1 ? 30 : (metrics.samBillions / 1) * 30;
    let somCredibility = somCredibilityRatio >= 0.8 && somCredibilityRatio <= 1.3 ? 35 : 20;
    const marketScore = Math.min(100, Math.max(20, Math.round(tamScore + samScore + somCredibility)));

    // 4. Capital Efficiency & Burn Multiple Score
    let burnScore = 50;
    if (burnMultiple <= scenario.maxBurnMultiple) {
      burnScore += 30 + Math.round((scenario.maxBurnMultiple - burnMultiple) * 20);
    } else {
      burnScore -= Math.round((burnMultiple - scenario.maxBurnMultiple) * 25);
    }
    let runwayScore = metrics.runwayMonths >= 18 ? 20 : (metrics.runwayMonths / 18) * 20;
    const efficiencyScore = Math.min(100, Math.max(10, Math.round(burnScore + runwayScore)));

    // 5. Execution & Shipping Velocity Score
    let cadenceScore = Math.min(30, metrics.releasesPerWeek * 7.5);
    let cycleScore = metrics.sprintCycleDays <= 7 ? 25 : 15;
    let ttvScore = metrics.timeToValueMinutes <= 15 ? 25 : (15 / Math.max(1, metrics.timeToValueMinutes)) * 25;
    let paybackScore = metrics.cacPaybackMonths <= 6 ? 20 : (6 / Math.max(1, metrics.cacPaybackMonths)) * 20;
    const executionScore = Math.min(100, Math.max(20, Math.round(cadenceScore + cycleScore + ttvScore + paybackScore)));

    return {
      revenue: revenueScore,
      retention: retentionScore,
      market: marketScore,
      efficiency: efficiencyScore,
      execution: executionScore
    };
  }, [arr, metrics, scenario, burnMultiple, somCredibilityRatio]);

  // Overall Weighted Fundability Score
  const overallScore = useMemo(() => {
    const weighted = (
      categoryScores.revenue * 0.25 +
      categoryScores.retention * 0.20 +
      categoryScores.market * 0.15 +
      categoryScores.efficiency * 0.20 +
      categoryScores.execution * 0.20
    );
    return Math.round(weighted);
  }, [categoryScores]);

  // Fundability Stage Verdict & Grade
  const verdict = useMemo(() => {
    if (overallScore >= 85) {
      return {
        grade: 'A+',
        badge: 'INSTITUTIONAL SEED LEADER',
        badgeColor: 'bg-[#CCFF00] text-black',
        recommendation: 'Target Tier-1 Lead VCs ($1.5M - $3.0M Round). You command pricing power and term sheet leverage in today’s market.',
        roundType: 'Priced Equity or Cap-Free SAFE at $12M - $16M Post',
        status: 'LEAD VC FOMO'
      };
    } else if (overallScore >= 75) {
      return {
        grade: 'A',
        badge: 'SEED / ANGEL SYNDICATE READY',
        badgeColor: 'bg-[#FFDE59] text-black',
        recommendation: 'Raise $1.0M - $1.8M from high-conviction angel syndicates and seed funds. Core unit economics meet current market bar.',
        roundType: 'Standard Post-Money SAFE at $9M - $12M Post',
        status: 'SEED VIABLE'
      };
    } else if (overallScore >= 60) {
      return {
        grade: 'B',
        badge: 'PRE-SEED / ACCELERATOR FIT',
        badgeColor: 'bg-[#00F0FF] text-black',
        recommendation: 'Raise $250k - $500k from angels or top accelerators (YC/Techstars). Focus on pushing MRR to $15k+ before pitching multi-stage VC partners.',
        roundType: 'Angel Rolling SAFE at $6M - $9M Cap',
        status: 'PRE-SEED ONLY'
      };
    } else {
      return {
        grade: 'C-',
        badge: 'FIX RETENTION & LEAKY BUCKET',
        badgeColor: 'bg-[#FF0033] text-white',
        recommendation: 'Do NOT pitch institutional VCs today. High churn or inefficient burn will result in brutal rejection. Preserve cash and reach Default Alive.',
        roundType: 'Internal Bridge or Grants / Founder Capital',
        status: 'DEFAULT DEAD RISK'
      };
    }
  }, [overallScore]);

  // Re-run Audit Simulation
  const triggerReAudit = () => {
    setIsAuditing(true);
    setAuditProgress(0);

    const stages = [
      { text: `Cross-referencing MRR ($${metrics.mrr.toLocaleString()}) against ${scenario.yearTag} seed benchmarks...`, pct: 20 },
      { text: `Auditing Churn (${metrics.grossChurnMonthly}%/mo) & Net Revenue Retention (${metrics.netRevenueRetention}%)...`, pct: 45 },
      { text: `Auditing Bottom-Up TAM ($${metrics.tamBillions}B), SAM ($${metrics.samBillions}B), SOM ($${metrics.somMillions}M)...`, pct: 70 },
      { text: `Stress-testing Burn Multiple (${burnMultiple}x) & Execution Cadence (${metrics.releasesPerWeek} deploys/wk)...`, pct: 90 },
      { text: 'Synthesizing Investment Committee Partner Verdict...', pct: 100 }
    ];

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < stages.length) {
        setAuditStage(stages[idx].text);
        setAuditProgress(stages[idx].pct);
        idx++;
      } else {
        clearInterval(interval);
        setIsAuditing(false);
        setHasAudited(true);
      }
    }, 350);
  };

  // Copy Investor Teaser / Due Diligence Tear-Sheet
  const copyDueDiligenceMemo = () => {
    let memo = `====================================================\n`;
    memo += `INVESTOR READINESS & AUDITED METRICS MEMO\n`;
    memo += `COMPANY: ${startupName.toUpperCase()}\n`;
    memo += `MARKET SCENARIO: ${scenario.name}\n`;
    memo += `READINESS SCORE: ${overallScore}/100 [GRADE: ${verdict.grade} - ${verdict.badge}]\n`;
    memo += `====================================================\n\n`;

    memo += `[1. REVENUE & TRACTION]\n`;
    memo += `- Annualized Run-Rate (ARR): $${arr.toLocaleString()} (Seed Floor: $${scenario.seedArrFloor.toLocaleString()})\n`;
    memo += `- Monthly Recurring Revenue (MRR): $${metrics.mrr.toLocaleString()}\n`;
    memo += `- Month-over-Month (MoM) Growth: +${metrics.mrrGrowthMoM}% (Market Benchmark: +${scenario.targetMomGrowth}%)\n\n`;

    memo += `[2. RETENTION & CUSTOMER HEALTH]\n`;
    memo += `- Monthly Gross Logo Churn: ${metrics.grossChurnMonthly}% (Max Market Ceiling: ${scenario.maxGrossChurn}%)\n`;
    memo += `- Net Revenue Retention (NRR): ${metrics.netRevenueRetention}% (Benchmark: > ${scenario.minNrr}%)\n`;
    memo += `- CAC Payback Period: ${metrics.cacPaybackMonths} Months\n\n`;

    memo += `[3. MARKET SIZING & BOTTOM-UP CREDIBILITY]\n`;
    memo += `- Total Addressable Market (TAM): $${metrics.tamBillions}B\n`;
    memo += `- Serviceable Addressable Market (SAM): $${metrics.samBillions}B\n`;
    memo += `- Serviceable Obtainable Market (SOM): $${metrics.somMillions}M\n`;
    memo += `- Bottom-Up Math: ${metrics.targetAccountsSom.toLocaleString()} target accounts × $${metrics.averageAcv.toLocaleString()} ACV = $${bottomUpSomCalculated.toFixed(1)}M SOM\n\n`;

    memo += `[4. CAPITAL EFFICIENCY & RUNWAY]\n`;
    memo += `- Monthly Net Burn: $${metrics.monthlyBurn.toLocaleString()}\n`;
    memo += `- Runway: ${metrics.runwayMonths} Months\n`;
    memo += `- Burn Multiple: ${burnMultiple}x (Net Burn / Net New ARR, Benchmark: < ${scenario.maxBurnMultiple}x)\n\n`;

    memo += `[5. EXECUTION & SHIPPING VELOCITY]\n`;
    memo += `- Release Cadence: ${metrics.releasesPerWeek} Deployments / Week\n`;
    memo += `- Sprint Cycle Time: ${metrics.sprintCycleDays} Days\n`;
    memo += `- Time-to-Value (TTV): ${metrics.timeToValueMinutes} Minutes\n\n`;

    memo += `[INVESTMENT COMMITTEE VERDICT]\n`;
    memo += `"${verdict.recommendation}"\n`;
    memo += `SUGGESTED ROUND: ${verdict.roundType}\n`;

    navigator.clipboard?.writeText(memo);
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 2000);
  };

  // ═══ 0. PATHWAY LANDING PAGE (NEO-BRUTALIST INTAKE SCREEN) ═══
  if (!hasAudited) {
    return (
      <div className="min-h-[72vh] flex flex-col items-center justify-center py-8 px-4 font-mono select-none">
        {/* Badge Banner */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="bg-black text-[#FFDE59] border-2 border-black px-3.5 py-1 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#000] flex items-center gap-1.5">
            <Zap size={13} className="text-[#FFDE59]" />
            <span>INVESTOR READINESS SCORE</span>
          </span>
          <span className="bg-[#FF52D9] text-black border-2 border-black px-2.5 py-1 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]">
            POST-ZIRP VC FLOORS (2024-2026)
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-black tracking-tight text-center mb-3">
          ARE YOU <span className="bg-[#C026D3] text-white px-3 py-0.5 border-3 border-black shadow-[4px_4px_0px_#000] inline-block -rotate-1">FUNDABLE?</span>
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-bold text-black/80 max-w-xl text-center uppercase tracking-wide leading-relaxed mb-8">
          Upload your metrics. We'll brutally audit your traction, churn, CAC, and execution speed to tell you exactly where you stand with VCs.
        </p>

        {/* Loading Progress State if auditing */}
        {isAuditing ? (
          <div className="max-w-2xl w-full bg-white border-4 border-black shadow-[10px_10px_0px_#000] relative">
            <div className="bg-[#FF52D9] border-b-4 border-black px-4 py-2.5 flex items-center justify-between text-xs font-black uppercase text-black">
              <div className="flex items-center gap-2">
                <Activity size={14} className="animate-spin" />
                <span>[ COMPUTING // VENTURE_READINESS_RADAR ]</span>
              </div>
              <span className="bg-black text-[#FFDE59] px-2 py-0.5 text-[10px] font-black border border-black animate-pulse">
                AUDITING METRICS
              </span>
            </div>
            <div className="p-8 sm:p-10 text-center font-mono">
              <div className="w-20 h-20 bg-[#FFDE59] border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center mx-auto mb-4 text-black animate-pulse">
                <Award size={34} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black uppercase text-black mb-1">
                CALCULATING INVESTOR READINESS SCORE...
              </h3>
              <p className="text-xs font-bold text-neutral-600 uppercase mb-5">{auditStage}</p>
              <div className="w-full max-w-md mx-auto h-5 bg-[#FAF8F5] border-3 border-black overflow-hidden shadow-[3px_3px_0px_#000]">
                <div
                  className="h-full bg-[#C026D3] border-r-2 border-black transition-all duration-300"
                  style={{ width: `${auditProgress}%` }}
                />
              </div>
              <div className="text-xs font-black text-black uppercase mt-3">
                [ {auditProgress}% COMPLETE // BENCHMARKING SEED DEALFLOW ]
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
                <span className="w-3 h-3 bg-[#FF52D9] border-2 border-black inline-block" />
                <span className="ml-2 font-black">[ RADAR // DUE_DILIGENCE_RADAR.EXE ]</span>
              </div>
              <span className="bg-black text-[#FFDE59] px-2 py-0.5 text-[10px] font-black border border-black">
                BENCHMARKS LOADED
              </span>
            </div>

            {/* Body */}
            <div className="p-8 sm:p-10 text-center">
              {/* Icon Box */}
              <div className="w-20 h-20 bg-[#FF52D9] border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center mx-auto mb-5 text-black">
                <Zap size={34} strokeWidth={2.5} />
              </div>

              <h3 className="text-xl sm:text-2xl font-black uppercase text-black mb-1.5 tracking-tight">
                Audit My Startup
              </h3>
              <p className="text-xs font-bold text-neutral-600 uppercase mb-6">
                We'll calculate whether you should raise from Angels, go for a Pre-Seed round, or keep bootstrapping until your unit economics stabilize.
              </p>

              {/* Metrics Audit Preview Box */}
              <div className="border-3 border-black bg-[#FAF8F5] p-5 mb-6 text-left shadow-[3px_3px_0px_#000]">
                <div className="text-[11px] font-black uppercase text-black mb-2 flex items-center justify-between border-b-2 border-black pb-1.5">
                  <span>[ DUE DILIGENCE AUDIT DIMENSIONS ]</span>
                  <span className="text-[#C026D3]">TIER-1 VC COMMITTEE FLOOR</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-black uppercase text-black">
                  <div className="flex items-center gap-1.5"><span className="text-[#C026D3]">▶</span> MRR & ARR MoM Velocity</div>
                  <div className="flex items-center gap-1.5"><span className="text-[#C026D3]">▶</span> Gross Churn (&lt; 1.5% Floor)</div>
                  <div className="flex items-center gap-1.5"><span className="text-[#C026D3]">▶</span> Net Revenue Retention (&gt; 110%)</div>
                  <div className="flex items-center gap-1.5"><span className="text-[#C026D3]">▶</span> Bottom-Up TAM / SAM / SOM</div>
                  <div className="flex items-center gap-1.5"><span className="text-[#C026D3]">▶</span> Burn Multiple (&lt; 1.2x Target)</div>
                  <div className="flex items-center gap-1.5"><span className="text-[#C026D3]">▶</span> Ship Speed (Releases/Wk)</div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={triggerReAudit}
                className="bg-[#C026D3] hover:bg-black hover:text-[#FF52D9] text-white border-3 border-black text-xs sm:text-sm font-black uppercase tracking-wider px-8 py-4 shadow-[5px_5px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2.5 mx-auto"
              >
                <Rocket size={16} strokeWidth={2.5} />
                <span>[ 🚀 CALCULATE READINESS SCORE ]</span>
              </button>

              {/* Bottom Badges */}
              <div className="mt-8 pt-5 border-t-3 border-black flex flex-wrap items-center justify-center gap-2">
                <span className="bg-[#FAF8F5] border-2 border-black px-2.5 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">
                  ✓ SEED & PRE-SEED VALUATIONS
                </span>
                <span className="bg-[#FAF8F5] border-2 border-black px-2.5 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">
                  ✓ FLIGHT TO CAPITAL EFFICIENCY
                </span>
                <span className="bg-[#FAF8F5] border-2 border-black px-2.5 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">
                  ✓ EXPORTABLE VC TEAR-SHEET
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

      {/* ═══ TOP BANNER: MARKET SCENARIO SELECTOR & QUICK AUDIT ═══ */}
      <div className="bg-white border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_#000] relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b-3 border-black pb-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#FFDE59] border border-black px-2 py-0.5 text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]">
                VENTURE DUE DILIGENCE ENGINE
              </span>
              <span className={`border border-black px-2 py-0.5 text-[10px] font-black uppercase ${scenario.badgeColor}`}>
                {scenario.yearTag}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-black tracking-tight flex items-center gap-2">
              <Award size={26} strokeWidth={2.5} />
              <span>{startupName} — Investor Readiness Radar</span>
            </h2>
            <p className="text-xs font-bold text-neutral-600 uppercase mt-0.5">
              Auditing ARR, MRR, churn rate, TAM/SAM/SOM, and execution speed against current venture market realities.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setHasAudited(false)}
              className="bg-white hover:bg-[#FAF8F5] border-2 border-black text-black px-3.5 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <RotateCcw size={13} />
              <span>[ ↺ READINESS INTAKE ]</span>
            </button>

            <button
              onClick={() => setIsCalibrating(!isCalibrating)}
              className="bg-white hover:bg-[#FAF8F5] border-2 border-black text-black px-3.5 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <Sliders size={13} strokeWidth={2.5} />
              <span>{isCalibrating ? 'HIDE METRICS EDITOR' : 'EDIT AUDIT METRICS'}</span>
            </button>

            <button
              onClick={copyDueDiligenceMemo}
              className="bg-white hover:bg-[#CCFF00] border-2 border-black text-black px-3.5 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
              title="Copy complete investor diligence tear-sheet to clipboard"
            >
              {copiedMemo ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copiedMemo ? 'COPIED MEMO!' : 'EXPORT DD MEMO'}</span>
            </button>

            <button
              onClick={triggerReAudit}
              disabled={isAuditing}
              className="bg-[#CCFF00] hover:bg-[#b8e600] border-2 border-black text-black px-4 py-1.5 text-xs font-black uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <RotateCcw size={13} className={isAuditing ? "animate-spin" : ""} strokeWidth={2.5} />
              <span>[ ↺ RE-AUDIT ]</span>
            </button>
          </div>
        </div>

        {/* Market Climate Switcher */}
        <div className="bg-[#FAF8F5] border-2 border-black p-3.5 shadow-[2px_2px_0px_#000] mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
            <span className="text-[10px] font-black uppercase text-black flex items-center gap-1.5">
              <Layers size={13} /> [ SELECT VENTURE MARKET SCENARIO BENCHMARK ]:
            </span>
            <span className="text-[10px] font-bold text-neutral-500 uppercase">
              Current Valuations: {scenario.medianSeedValuation} · Typical Multiple: {scenario.multipleRange}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {Object.values(MARKET_SCENARIOS).map((sc) => {
              const isSelected = selectedScenarioKey === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioKey(sc.id)}
                  className={`p-2 text-left border-2 border-black transition-all ${isSelected
                      ? 'bg-black text-[#CCFF00] shadow-[3px_3px_0px_#CCFF00]'
                      : 'bg-white text-black hover:bg-neutral-100 shadow-[2px_2px_0px_#000]'
                    }`}
                >
                  <div className="text-[10px] font-black uppercase leading-tight">{sc.name.split(':')[0]}</div>
                  <div className="text-[9px] font-bold opacity-80 uppercase mt-0.5">{sc.yearTag}</div>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] font-bold text-neutral-700 uppercase mt-3 leading-relaxed border-t border-black/20 pt-2">
            <strong className="text-black uppercase">MACRO MARKET CONTEXT:</strong> {scenario.overview}
          </p>
        </div>

        {/* ═══ AUDIT METRICS CALIBRATION DRAWER ═══ */}
        <AnimatePresence>
          {isCalibrating && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t-3 border-black overflow-hidden"
            >
              <div className="text-xs font-black uppercase tracking-wider text-black mb-3 flex items-center gap-2">
                <Sliders size={14} /> [ CALIBRATE STARTUP AUDITED METRICS ]
              </div>

              {/* Grid 1: Revenue, Growth, Churn, Retention */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">
                    MRR ($/Month)
                  </label>
                  <input
                    type="number"
                    value={metrics.mrr}
                    onChange={(e) => setMetrics(prev => ({ ...prev, mrr: Number(e.target.value) }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                  <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">
                    ARR: ${(metrics.mrr * 12).toLocaleString()}
                  </span>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">
                    MoM Growth Rate (%)
                  </label>
                  <input
                    type="number"
                    value={metrics.mrrGrowthMoM}
                    onChange={(e) => setMetrics(prev => ({ ...prev, mrrGrowthMoM: Number(e.target.value) }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                  <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">
                    Market Target: +{scenario.targetMomGrowth}%
                  </span>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">
                    Monthly Gross Churn (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={metrics.grossChurnMonthly}
                    onChange={(e) => setMetrics(prev => ({ ...prev, grossChurnMonthly: Number(e.target.value) }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                  <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">
                    Market Ceiling: &lt; {scenario.maxGrossChurn}%
                  </span>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">
                    Net Revenue Retention (NRR %)
                  </label>
                  <input
                    type="number"
                    value={metrics.netRevenueRetention}
                    onChange={(e) => setMetrics(prev => ({ ...prev, netRevenueRetention: Number(e.target.value) }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                  <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">
                    Market Target: &gt; {scenario.minNrr}%
                  </span>
                </div>
              </div>

              {/* Grid 2: TAM, SAM, SOM, Accounts, ACV */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">
                    TAM ($ Billions)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={metrics.tamBillions}
                    onChange={(e) => setMetrics(prev => ({ ...prev, tamBillions: Number(e.target.value) }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                  <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">Target: $10B+</span>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">
                    SAM ($ Billions)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={metrics.samBillions}
                    onChange={(e) => setMetrics(prev => ({ ...prev, samBillions: Number(e.target.value) }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                  <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">Target: $1B - $3B</span>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">
                    SOM ($ Millions)
                  </label>
                  <input
                    type="number"
                    value={metrics.somMillions}
                    onChange={(e) => setMetrics(prev => ({ ...prev, somMillions: Number(e.target.value) }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                  <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">Target: $50M - $250M</span>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">
                    SOM Accounts (#)
                  </label>
                  <input
                    type="number"
                    value={metrics.targetAccountsSom}
                    onChange={(e) => setMetrics(prev => ({ ...prev, targetAccountsSom: Number(e.target.value) }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                  <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">Bottom-up math</span>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">
                    Annual ACV ($/Yr)
                  </label>
                  <input
                    type="number"
                    value={metrics.averageAcv}
                    onChange={(e) => setMetrics(prev => ({ ...prev, averageAcv: Number(e.target.value) }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                  <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">Calculated SOM: ${bottomUpSomCalculated.toFixed(1)}M</span>
                </div>
              </div>

              {/* Grid 3: Burn, Runway, Deployments, TTV, CAC Payback */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">
                    Monthly Net Burn ($)
                  </label>
                  <input
                    type="number"
                    value={metrics.monthlyBurn}
                    onChange={(e) => setMetrics(prev => ({ ...prev, monthlyBurn: Number(e.target.value) }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                  <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">Burn Multiple: {burnMultiple}x</span>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">
                    Runway (Months)
                  </label>
                  <input
                    type="number"
                    value={metrics.runwayMonths}
                    onChange={(e) => setMetrics(prev => ({ ...prev, runwayMonths: Number(e.target.value) }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                  <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">Safe bar: 12-18 mo</span>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">
                    Releases / Wk
                  </label>
                  <input
                    type="number"
                    value={metrics.releasesPerWeek}
                    onChange={(e) => setMetrics(prev => ({ ...prev, releasesPerWeek: Number(e.target.value) }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                  <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">Sprint cadence</span>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">
                    Time to Value (Mins)
                  </label>
                  <input
                    type="number"
                    value={metrics.timeToValueMinutes}
                    onChange={(e) => setMetrics(prev => ({ ...prev, timeToValueMinutes: Number(e.target.value) }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                  <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">Target: &lt; 15 mins</span>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-black mb-1">
                    CAC Payback (Mo)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={metrics.cacPaybackMonths}
                    onChange={(e) => setMetrics(prev => ({ ...prev, cacPaybackMonths: Number(e.target.value) }))}
                    className="w-full bg-[#FAF8F5] border-2 border-black p-2 text-xs font-black focus:bg-white focus:outline-none"
                  />
                  <span className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5 block">Target: &lt; 6-8 mo</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-black/20 pt-3">
                <button
                  onClick={() => setIsCalibrating(false)}
                  className="bg-[#FAF8F5] hover:bg-neutral-200 border-2 border-black px-4 py-1.5 text-xs font-black uppercase"
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    setIsCalibrating(false);
                    triggerReAudit();
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

      {/* ═══ AUDIT PROGRESS LOADER ═══ */}
      {isAuditing && (
        <div className="bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_#000]">
          <div className="w-14 h-14 bg-[#FFDE59] border-3 border-black mx-auto mb-3 flex items-center justify-center animate-pulse shadow-[4px_4px_0px_#000]">
            <Award size={28} />
          </div>
          <h3 className="text-lg font-black uppercase text-black mb-1">
            RUNNING VENTURE AUDIT FOR {startupName.toUpperCase()}...
          </h3>
          <p className="text-xs font-bold text-neutral-600 uppercase mb-4">{auditStage}</p>
          <div className="w-full max-w-md mx-auto h-4 bg-[#FAF8F5] border-2 border-black overflow-hidden shadow-[2px_2px_0px_#000]">
            <div className="h-full bg-[#CCFF00] transition-all" style={{ width: `${auditProgress}%` }} />
          </div>
        </div>
      )}

      {!isAuditing && (
        <>
          {/* ═══ HERO SCORE BANNER: OVERALL GRADE & CAPITAL VERDICT ═══ */}
          <div className="bg-black text-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000] relative">
            <div className="absolute top-2 right-3 text-white/30 text-[10px] font-black tracking-widest hidden sm:block">
              [ VENTURE READINESS RADAR // AUDITED ]
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Column: Grade & Status */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 border-2 border-white text-xs font-black uppercase shadow-[2px_2px_0px_#FFF] ${verdict.badgeColor}`}>
                    {verdict.badge}
                  </span>
                  <span className="bg-zinc-800 text-white border border-white/40 px-2 py-0.5 text-[10px] font-black uppercase">
                    MARKET CLIMATE: {scenario.yearTag}
                  </span>
                </div>

                <div className="flex items-baseline gap-4">
                  <div className="text-6xl sm:text-7xl font-black text-[#CCFF00] tracking-tighter">
                    {overallScore}
                    <span className="text-2xl sm:text-3xl text-white/60 font-black">/100</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-[#FFDE59] uppercase">
                    GRADE {verdict.grade}
                  </div>
                </div>

                <div className="border-l-4 border-[#00F0FF] pl-4 py-1">
                  <div className="text-xs font-black uppercase text-[#00F0FF] mb-1">
                    INVESTMENT COMMITTEE CONSENSUS:
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-white/90 uppercase leading-relaxed">
                    "{verdict.recommendation}"
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-black text-white/70 uppercase pt-1">
                  <span>// SUGGESTED ROUND: <strong className="text-white">{verdict.roundType}</strong></span>
                </div>
              </div>

              {/* Right Column: 5 Category Breakdown Bars */}
              <div className="lg:col-span-5 bg-zinc-950 border-3 border-white p-4 space-y-3 shadow-[4px_4px_0px_#FFF]">
                <div className="text-[11px] font-black uppercase text-white/70 border-b border-white/20 pb-1.5 flex justify-between">
                  <span>AUDITED CATEGORY RADAR</span>
                  <span className="text-[#CCFF00]">WEIGHTED SCORE</span>
                </div>

                {[
                  { label: 'Revenue & Growth (ARR / MRR)', score: categoryScores.revenue, color: 'bg-[#CCFF00]' },
                  { label: 'Customer Retention (Gross Churn / NRR)', score: categoryScores.retention, color: 'bg-[#FFDE59]' },
                  { label: 'Market Sizing (TAM / SAM / SOM)', score: categoryScores.market, color: 'bg-[#00F0FF]' },
                  { label: 'Capital Efficiency (Burn Multiple)', score: categoryScores.efficiency, color: 'bg-[#FF52D9]' },
                  { label: 'Execution & Velocity (Cadence / TTV)', score: categoryScores.execution, color: 'bg-white' }
                ].map((cat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-black uppercase text-white">
                      <span>{cat.label}</span>
                      <span>{cat.score}/100</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-800 border border-white/40 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.score}%` }}
                        className={`h-full ${cat.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ═══ CORE AUDITED METRICS BREAKDOWN (ARR, MRR, CHURN, TAM, SAM, SOM, EXECUTION) ═══ */}
          <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-3 border-black pb-3 mb-6 gap-2">
              <div>
                <h3 className="font-black text-lg uppercase text-black flex items-center gap-2">
                  <BarChart3 size={20} className="stroke-[2.5]" />
                  CORE AUDITED METRICS BREAKDOWN
                </h3>
                <p className="text-xs font-bold text-neutral-600 uppercase">
                  Measured against {scenario.yearTag} institutional hurdles & diligence thresholds.
                </p>
              </div>
              <span className="bg-[#FAF8F5] border border-black px-2.5 py-1 text-[10px] font-black uppercase text-black">
                CLICK CARDS FOR DEEP VC DILIGENCE NOTES
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* CARD 1: ARR (Annual Recurring Revenue) */}
              <div
                onClick={() => setExpandedMetric(expandedMetric === 'arr' ? null : 'arr')}
                className={`border-3 border-black p-4 cursor-pointer transition-all shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 ${arr >= scenario.seedArrFloor ? 'bg-white' : 'bg-[#FAF8F5]'
                  }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black uppercase text-neutral-500">// ANNUAL RUN-RATE</span>
                  <span className={`px-1.5 py-0.2 text-[9px] font-black uppercase border border-black ${arr >= scenario.seedArrFloor ? 'bg-[#CCFF00] text-black' : 'bg-[#FFDE59] text-black'
                    }`}>
                    {arr >= scenario.seedArrFloor ? 'SEED READY' : 'PRE-SEED'}
                  </span>
                </div>

                <div className="text-2xl font-black text-black uppercase mb-1">
                  ${arr.toLocaleString()}
                </div>

                <div className="text-[10px] font-bold text-neutral-700 uppercase mb-2">
                  MRR: ${metrics.mrr.toLocaleString()} · ARR Run-Rate
                </div>

                <div className="bg-[#FAF8F5] border border-black p-2 text-[10px] font-black text-black">
                  <span className="text-[#FF5722] mr-1">MARKET BENCHMARK:</span>
                  Seed Floor: ${scenario.seedArrFloor.toLocaleString()}
                </div>

                <div className="mt-3 text-[10px] font-black text-neutral-500 flex items-center justify-between">
                  <span>{expandedMetric === 'arr' ? 'HIDE VC NOTES ▲' : 'VIEW VC NOTES ▼'}</span>
                </div>

                {expandedMetric === 'arr' && (
                  <div className="mt-3 pt-3 border-t border-black text-[11px] font-bold text-neutral-800 leading-relaxed space-y-1.5">
                    <p>
                      <strong className="text-black uppercase">VC Scrutiny:</strong> In {scenario.yearTag}, VCs demand contracted ARR with low revenue concentration. No single customer should represent &gt; 20% of total ARR.
                    </p>
                    <p>
                      <strong className="text-black uppercase">Target Action:</strong> Convert uncommitted monthly pilot agreements into 12-month annual contracts with upfront payment terms.
                    </p>
                  </div>
                )}
              </div>

              {/* CARD 2: MRR & MoM Growth */}
              <div
                onClick={() => setExpandedMetric(expandedMetric === 'mrr' ? null : 'mrr')}
                className="border-3 border-black p-4 cursor-pointer transition-all shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 bg-white"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black uppercase text-neutral-500">// MONTHLY REVENUE</span>
                  <span className={`px-1.5 py-0.2 text-[9px] font-black uppercase border border-black ${metrics.mrrGrowthMoM >= scenario.targetMomGrowth ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                    }`}>
                    +{metrics.mrrGrowthMoM}% MoM
                  </span>
                </div>

                <div className="text-2xl font-black text-black uppercase mb-1">
                  ${metrics.mrr.toLocaleString()}
                </div>

                <div className="text-[10px] font-bold text-neutral-700 uppercase mb-2">
                  Growth Velocity: +{metrics.mrrGrowthMoM}% Month-over-Month
                </div>

                <div className="bg-[#FAF8F5] border border-black p-2 text-[10px] font-black text-black">
                  <span className="text-[#FF5722] mr-1">MARKET BENCHMARK:</span>
                  Target: +{scenario.targetMomGrowth}% MoM
                </div>

                <div className="mt-3 text-[10px] font-black text-neutral-500 flex items-center justify-between">
                  <span>{expandedMetric === 'mrr' ? 'HIDE VC NOTES ▲' : 'VIEW VC NOTES ▼'}</span>
                </div>

                {expandedMetric === 'mrr' && (
                  <div className="mt-3 pt-3 border-t border-black text-[11px] font-bold text-neutral-800 leading-relaxed space-y-1.5">
                    <p>
                      <strong className="text-black uppercase">VC Scrutiny:</strong> Tier-1 funds look for compound MoM growth over at least 3-4 consecutive months to verify sustainable product-market pull.
                    </p>
                    <p>
                      <strong className="text-black uppercase">Target Action:</strong> Maintain expansion MRR pipelines by pricing on value metrics (transaction volume, seats, or compute consumed).
                    </p>
                  </div>
                )}
              </div>

              {/* CARD 3: Churn Rate & Net Revenue Retention (NRR) */}
              <div
                onClick={() => setExpandedMetric(expandedMetric === 'churn' ? null : 'churn')}
                className={`border-3 border-black p-4 cursor-pointer transition-all shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 ${metrics.grossChurnMonthly <= scenario.maxGrossChurn ? 'bg-white' : 'bg-[#FF0033]/10'
                  }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black uppercase text-neutral-500">// RETENTION & CHURN</span>
                  <span className={`px-1.5 py-0.2 text-[9px] font-black uppercase border border-black ${metrics.grossChurnMonthly <= scenario.maxGrossChurn ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                    }`}>
                    {metrics.grossChurnMonthly <= scenario.maxGrossChurn ? 'HEALTHY' : 'HIGH CHURN'}
                  </span>
                </div>

                <div className="text-2xl font-black text-black uppercase mb-1">
                  {metrics.grossChurnMonthly}% / Mo
                </div>

                <div className="text-[10px] font-bold text-neutral-700 uppercase mb-2">
                  NRR: {metrics.netRevenueRetention}% · CAC Payback: {metrics.cacPaybackMonths} Mo
                </div>

                <div className="bg-[#FAF8F5] border border-black p-2 text-[10px] font-black text-black">
                  <span className="text-[#FF5722] mr-1">MARKET BENCHMARK:</span>
                  Max Churn: &lt; {scenario.maxGrossChurn}% | NRR &gt; {scenario.minNrr}%
                </div>

                <div className="mt-3 text-[10px] font-black text-neutral-500 flex items-center justify-between">
                  <span>{expandedMetric === 'churn' ? 'HIDE VC NOTES ▲' : 'VIEW VC NOTES ▼'}</span>
                </div>

                {expandedMetric === 'churn' && (
                  <div className="mt-3 pt-3 border-t border-black text-[11px] font-bold text-neutral-800 leading-relaxed space-y-1.5">
                    <p>
                      <strong className="text-black uppercase">Why Churn Kills Deals:</strong> In the current capital environment, investors refuse to fund "leaky buckets". If customers churn out after 3 months, your LTV collapses and paid acquisition cannot scale.
                    </p>
                    <p>
                      <strong className="text-black uppercase">Target Action:</strong> Instrument sub-180-second onboarding time-to-value and conduct exit interviews with every churned account to plug workflow friction.
                    </p>
                  </div>
                )}
              </div>

              {/* CARD 4: TAM, SAM, SOM (Market Scale) */}
              <div
                onClick={() => setExpandedMetric(expandedMetric === 'tam' ? null : 'tam')}
                className="border-3 border-black p-4 cursor-pointer transition-all shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 bg-white"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black uppercase text-neutral-500">// MARKET SCALE</span>
                  <span className="px-1.5 py-0.2 text-[9px] font-black uppercase bg-[#00F0FF] text-black border border-black">
                    BOTTOM-UP MATH
                  </span>
                </div>

                <div className="text-2xl font-black text-black uppercase mb-1">
                  ${metrics.tamBillions}B TAM
                </div>

                <div className="text-[10px] font-bold text-neutral-700 uppercase mb-2">
                  SAM: ${metrics.samBillions}B · SOM: ${metrics.somMillions}M
                </div>

                <div className="bg-[#FAF8F5] border border-black p-2 text-[10px] font-black text-black">
                  <span className="text-[#FF5722] mr-1">BOTTOM-UP CHECK:</span>
                  {metrics.targetAccountsSom.toLocaleString()} Accts × ${metrics.averageAcv.toLocaleString()} ACV
                </div>

                <div className="mt-3 text-[10px] font-black text-neutral-500 flex items-center justify-between">
                  <span>{expandedMetric === 'tam' ? 'HIDE VC NOTES ▲' : 'VIEW VC NOTES ▼'}</span>
                </div>

                {expandedMetric === 'tam' && (
                  <div className="mt-3 pt-3 border-t border-black text-[11px] font-bold text-neutral-800 leading-relaxed space-y-1.5">
                    <p>
                      <strong className="text-black uppercase">Top-Down vs Bottom-Up:</strong> Investors immediately discount top-down Gartner slides ($100B general market). They test bottom-up validity: (Verified Target Accounts in ICP) × (Realistic ACV).
                    </p>
                    <p>
                      <strong className="text-black uppercase">Your Math:</strong> {metrics.targetAccountsSom.toLocaleString()} SMBs × ${metrics.averageAcv.toLocaleString()} ACV = ${bottomUpSomCalculated.toFixed(1)}M SOM. This provides concrete evidence of venture fundability.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* SECOND ROW: CAPITAL EFFICIENCY & EXECUTION VELOCITY */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

              {/* Burn Multiple */}
              <div className="bg-[#FAF8F5] border-3 border-black p-4 shadow-[3px_3px_0px_#000]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-black uppercase text-neutral-600">// CAPITAL EFFICIENCY</span>
                  <span className={`px-1.5 py-0.2 text-[9px] font-black uppercase border border-black ${burnMultiple <= scenario.maxBurnMultiple ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                    }`}>
                    {burnMultiple <= 1.0 ? 'ELITE EFFICIENCY' : burnMultiple <= scenario.maxBurnMultiple ? 'GOOD' : 'OVERBURNING'}
                  </span>
                </div>
                <div className="text-xl font-black text-black uppercase mb-1">
                  {burnMultiple}x Burn Multiple
                </div>
                <div className="text-[10px] font-bold text-neutral-700 uppercase mb-2">
                  Net Monthly Burn: ${metrics.monthlyBurn.toLocaleString()} · Runway: {metrics.runwayMonths} Mo
                </div>
                <p className="text-[10px] font-bold text-neutral-600 leading-normal border-t border-black/10 pt-2">
                  Net Burn / Net New ARR. Target in today’s market is &lt; {scenario.maxBurnMultiple}x. A score of &lt; 1.0x means every dollar burned generates more than $1 of new ARR.
                </p>
              </div>

              {/* Shipping Cadence & Execution Speed */}
              <div className="bg-[#FAF8F5] border-3 border-black p-4 shadow-[3px_3px_0px_#000]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-black uppercase text-neutral-600">// EXECUTION VELOCITY</span>
                  <span className="px-1.5 py-0.2 text-[9px] font-black uppercase bg-[#00F0FF] text-black border border-black">
                    HIGH VELOCITY
                  </span>
                </div>
                <div className="text-xl font-black text-black uppercase mb-1">
                  {metrics.releasesPerWeek} Deploys / Week
                </div>
                <div className="text-[10px] font-bold text-neutral-700 uppercase mb-2">
                  Sprint Cycle: {metrics.sprintCycleDays} Days · Time-to-Value: {metrics.timeToValueMinutes} Mins
                </div>
                <p className="text-[10px] font-bold text-neutral-600 leading-normal border-t border-black/10 pt-2">
                  Founders who ship weekly build compound advantages. Tier-1 partners prioritize teams that iterate 3x faster than incumbents.
                </p>
              </div>

              {/* Market Penetration Path */}
              <div className="bg-[#FAF8F5] border-3 border-black p-4 shadow-[3px_3px_0px_#000]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-black uppercase text-neutral-600">// SOM PENETRATION</span>
                  <span className="px-1.5 py-0.2 text-[9px] font-black uppercase bg-[#FFDE59] text-black border border-black">
                    3-5 YR TARGET
                  </span>
                </div>
                <div className="text-xl font-black text-black uppercase mb-1">
                  ${metrics.somMillions}M Addressable
                </div>
                <div className="text-[10px] font-bold text-neutral-700 uppercase mb-2">
                  At 5% Market Share: ${(metrics.somMillions * 0.05).toFixed(1)}M ARR Horizon
                </div>
                <p className="text-[10px] font-bold text-neutral-600 leading-normal border-t border-black/10 pt-2">
                  Proves a clear path from early Seed to $10M+ ARR Series A threshold by capturing a focused wedge of the SAM.
                </p>
              </div>

            </div>

          </div>

          {/* ═══ VC PARTNER MEETING SIMULATOR: WHAT PARTNERS WHISPER BEHIND CLOSED DOORS ═══ */}
          <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000]">
            <div className="border-b-3 border-black pb-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-black text-[#CCFF00] px-2 py-0.5 text-[10px] font-black uppercase">
                  INVESTMENT COMMITTEE SIMULATION
                </span>
                <span className="text-[10px] font-bold text-neutral-500 uppercase">
                  CONFIDENTIAL PARTNER DISCUSSION NOTES
                </span>
              </div>
              <h3 className="text-xl font-black uppercase text-black tracking-tight flex items-center gap-2">
                <ShieldCheck size={22} className="stroke-[2.5]" />
                What Tier-1 VCs Will Say in Monday's Partner Meeting
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Column 1: GREEN FLAGS (Deal Drivers) */}
              <div className="bg-[#FAF8F5] border-3 border-black p-5 shadow-[4px_4px_0px_#000] space-y-4">
                <div className="flex items-center gap-2 border-b-2 border-black pb-2 text-black">
                  <span className="w-5 h-5 bg-[#CCFF00] border border-black flex items-center justify-center font-black text-xs">
                    ✓
                  </span>
                  <h4 className="text-xs font-black uppercase tracking-wider">
                    GREEN FLAGS THAT TRIGGER PARTNER FOMO
                  </h4>
                </div>

                <div className="space-y-3 text-xs font-bold text-neutral-800">
                  <div className="border-l-3 border-[#CCFF00] pl-3 py-0.5">
                    <strong className="text-black uppercase block mb-0.5">
                      1. Exceptional Capital Efficiency (Burn Multiple: {burnMultiple}x)
                    </strong>
                    <span>
                      In today’s capital-constrained environment, your sub-1.2x burn multiple demonstrates disciplined execution and low risk of premature death.
                    </span>
                  </div>

                  <div className="border-l-3 border-[#CCFF00] pl-3 py-0.5">
                    <strong className="text-black uppercase block mb-0.5">
                      2. Strong Organic Momentum (+{metrics.mrrGrowthMoM}% MoM)
                    </strong>
                    <span>
                      Growing monthly revenue by &gt; 15% without excessive paid marketing spend signals authentic customer willingness to pay and product pull.
                    </span>
                  </div>

                  <div className="border-l-3 border-[#CCFF00] pl-3 py-0.5">
                    <strong className="text-black uppercase block mb-0.5">
                      3. Bottom-Up TAM Sizing Credibility
                    </strong>
                    <span>
                      Your SOM math ({metrics.targetAccountsSom.toLocaleString()} target accounts at ${metrics.averageAcv.toLocaleString()} ACV) passes the institutional reality check over generic Gartner numbers.
                    </span>
                  </div>
                </div>
              </div>

              {/* Column 2: RED FLAGS & HARD QUESTIONS (Deal Killers) */}
              <div className="bg-[#FAF8F5] border-3 border-black p-5 shadow-[4px_4px_0px_#000] space-y-4">
                <div className="flex items-center gap-2 border-b-2 border-black pb-2 text-black">
                  <span className="w-5 h-5 bg-[#FF0033] text-white border border-black flex items-center justify-center font-black text-xs">
                    !
                  </span>
                  <h4 className="text-xs font-black uppercase tracking-wider">
                    RED FLAGS & TOUGH COMMITTEE QUESTIONS
                  </h4>
                </div>

                <div className="space-y-3 text-xs font-bold text-neutral-800">
                  <div className="border-l-3 border-[#FF0033] pl-3 py-0.5">
                    <strong className="text-black uppercase block mb-0.5">
                      1. Contract Duration & Pilot Conversion
                    </strong>
                    <span>
                      "How many of the ${metrics.mrr.toLocaleString()} MRR accounts are on multi-month contracts vs 30-day cancel-anytime trials? Can you prove Day-90 retention?"
                    </span>
                  </div>

                  <div className="border-l-3 border-[#FF0033] pl-3 py-0.5">
                    <strong className="text-black uppercase block mb-0.5">
                      2. Incumbent Defense & Defensibility
                    </strong>
                    <span>
                      "If Microsoft, SAP, or a well-funded AI challenger clones your core feature set next month, what prevents customer churn? Where is your data moat?"
                    </span>
                  </div>

                  <div className="border-l-3 border-[#FF0033] pl-3 py-0.5">
                    <strong className="text-black uppercase block mb-0.5">
                      3. Gross Margins & COGS Breakdown
                    </strong>
                    <span>
                      "What are your hosting and compute costs per enterprise customer? Can your Gross Margins exceed 75% at scale once data ingestion expands?"
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Strategic Advice */}
            <div className="mt-6 bg-[#18181b] border-3 border-black p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase text-[#CCFF00] tracking-wider block mb-0.5">
                  RECOMMENDED 30-DAY FUNDRAISING ACTION PLAN
                </span>
                <p className="text-xs font-bold text-white/90 uppercase">
                  Lock in 3 annual contracts with upfront cash, keep monthly gross churn &lt; {scenario.maxGrossChurn}%, and prepare a verified 5-folder data room before opening the round.
                </p>
              </div>
              <button
                onClick={copyDueDiligenceMemo}
                className="bg-[#CCFF00] hover:bg-[#b8e600] text-black border-2 border-black px-4 py-2 text-xs font-black uppercase shadow-[2px_2px_0px_#FFF] shrink-0"
              >
                COPY VC TEAR-SHEET
              </button>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
