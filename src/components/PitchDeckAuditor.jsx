import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Presentation, Upload, RotateCcw, Wand2, FileSearch, Layers,
  AlertTriangle, CheckCircle2, XCircle, ShieldCheck, ShieldAlert,
  ArrowRight, Copy, Check, Sliders, ChevronDown, ChevronUp,
  FileText, Sparkles, TrendingUp, DollarSign, Users, Target,
  Flame, HelpCircle, Activity, ExternalLink, Lightbulb, Compass,
  BookOpen, Eye, Zap, PieChart, CheckSquare, Bot
} from 'lucide-react';
import { getAiConfig, callConnectedAi, parseAiJson, getUserCompanyData } from '../utils/aiConfig';

export default function PitchDeckAuditor({ companyData }) {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(100);
  const [analysisStage, setAnalysisStage] = useState('');
  const [hasScanned, setHasScanned] = useState(false); // Starts on pathway landing screen, clicking analyze reveals audited results
  const [activeTab, setActiveTab] = useState('risk-audit'); // 'risk-audit' | 'matrix' | 'blueprints' | 'teardown'
  const [copiedItem, setCopiedItem] = useState(null);
  const [aiAuditBadge, setAiAuditBadge] = useState(null);

  // Matrix Pass/Fail Interactive State
  const [matrixState, setMatrixState] = useState({
    problem: 'pass',
    solution: 'pass',
    businessModel: 'fail',
    gtm: 'pass',
    team: 'pass'
  });

  // Risk Checklist Checked State
  const [checkedRisks, setCheckedRisks] = useState({
    bottomUpTam: true,
    yAxisScale: true,
    financialSymmetry: false, // Flagged
    whyNowEvidence: true,
    defensibilityMoat: true,
    theButSlide: false, // Flagged
    actionTitles: true,
    momTestLanguage: true,
    askSpecificity: true
  });

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      runAnalysis(e.target.files[0].name);
    }
  };

  const runAnalysis = async (fileName = null) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const comp = companyData || getUserCompanyData() || {
      name: startupName,
      problem: 'Enterprise operational inefficiencies',
      solution: 'Automated platform wedge',
      targetRaise: '$1.5M',
      stage: 'Pre-Seed'
    };

    const aiCfg = getAiConfig();
    let aiDeckAudit = null;

    if (aiCfg && aiCfg.apiKey) {
      try {
        const sysPrompt = `You are a Tier-1 venture capital pitch deck auditor (Partner at Benchmark / Sequoia / Founders Fund).
Audit this specific startup pitch deck strictly against institutional venture criteria.
Deception signals to scrutinize: TAM methodology, Y-axis scaling, defensibility moat, the Mom test, and the "Ask" milestone clarity.

Return JSON strictly:
{
  "deckScore": 84,
  "executiveDossierCritique": "A sharp, 2-3 sentence partner audit evaluating the deck narrative, TAM credibility, and primary investor objection.",
  "matrixState": {
    "problem": "pass",
    "solution": "pass",
    "traction": "pass",
    "market": "pass",
    "ask": "pass"
  }
}`;

        const userPrompt = `PITCH DECK DOSSIER FOR AUDIT:
Deck File: ${fileName || `${comp.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_deck.pdf`}
Company Name: ${comp.name}
Stage: ${comp.stage || 'Pre-Seed'}
Target Raise: ${comp.targetRaise || '$1.5M'}
Problem Statement: ${comp.problem || 'Not specified'}
Solution Wedge: ${comp.solution || 'Not specified'}
Audience / Buyer: ${comp.targetAudience || comp.targetBuyer || 'Enterprise'}
MRR / Traction: ${comp.mrr || 'Early stage'}`;

        const raw = await callConnectedAi({
          systemPrompt: sysPrompt,
          userPrompt,
          temperature: 0.2,
          jsonMode: true
        });

        const parsed = parseAiJson(raw);
        if (parsed && typeof parsed.deckScore === 'number') {
          aiDeckAudit = parsed;
        }
      } catch (err) {
        console.warn('Connected AI pitch deck audit error:', err);
      }
    }

    const stages = [
      { label: `Scanning Deception Signals for ${comp.name} (TAM & Y-Axis Scale)...`, target: 20 },
      { label: `Auditing Strategic Clarity & Moat Defensibility for ${comp.targetAudience || 'buyers'}...`, target: 45 },
      { label: `Evaluating Narrative Flow & "Mom Test" Simplicity...`, target: 70 },
      { label: `Running Direct Pitch Deck Audit Matrix across 5 Core Slides for ${comp.name}...`, target: 90 },
      { label: 'Synthesizing Institutional Investor Readiness Report...', target: 100 },
    ];

    let stageIdx = 0;
    const interval = setInterval(() => {
      if (stageIdx < stages.length) {
        setAnalysisStage(stages[stageIdx].label);
        setAnalysisProgress(stages[stageIdx].target);
        stageIdx++;
      } else {
        clearInterval(interval);
        if (aiDeckAudit) {
          if (aiDeckAudit.matrixState) setMatrixState(aiDeckAudit.matrixState);
          setAiAuditBadge({
            isAi: true,
            provider: aiCfg.providerName,
            model: aiCfg.modelName || aiCfg.modelId,
            critique: aiDeckAudit.executiveDossierCritique
          });
        }
        setIsAnalyzing(false);
        setHasScanned(true);
      }
    }, 450);
  };

  // Toggle Matrix status
  const toggleMatrixItem = (key) => {
    setMatrixState(prev => ({
      ...prev,
      [key]: prev[key] === 'pass' ? 'fail' : 'pass'
    }));
  };

  // Toggle Risk Checklist
  const toggleRiskCheck = (key) => {
    setCheckedRisks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Dynamic Overall Deck Score Calculation
  const deckScore = useMemo(() => {
    const riskKeys = Object.keys(checkedRisks);
    const passedRisks = riskKeys.filter(k => checkedRisks[k]).length;
    const riskScore = (passedRisks / riskKeys.length) * 50; // max 50 pts

    const matrixKeys = Object.keys(matrixState);
    const passedMatrix = matrixKeys.filter(k => matrixState[k] === 'pass').length;
    const matrixScore = (passedMatrix / matrixKeys.length) * 50; // max 50 pts

    return Math.round(riskScore + matrixScore);
  }, [checkedRisks, matrixState]);

  // Copy helper
  const copyToClipboard = (text, id) => {
    navigator.clipboard?.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const startupName = companyData?.name || getUserCompanyData()?.name || 'VentureScale AI';

  // Export Complete Deck Audit Dossier
  const exportFullAuditDossier = () => {
    let md = `# INSTITUTIONAL PITCH DECK AUDIT DOSSIER\n`;
    md += `COMPANY: ${startupName.toUpperCase()}\n`;
    md += `OVERALL DECK READINESS SCORE: ${deckScore}/100\n`;
    md += `STATUS: ${deckScore >= 80 ? 'INVESTOR READY (LOW FRICTION)' : deckScore >= 65 ? 'MODERATE FRICTION (REVISIONS NEEDED)' : 'FATAL RED FLAGS DETECTED'}\n\n`;

    md += `## 1. OPERATIONAL RISK AUDIT CHECKLIST\n`;
    md += `### GROUP 1: THE "DECEPTION" & INTEGRITY SIGNALS\n`;
    md += `- [${checkedRisks.bottomUpTam ? 'X' : ' '}] Bottom-Up Market Reality: Logical TAM formula (target customers × price)\n`;
    md += `- [${checkedRisks.yAxisScale ? 'X' : ' '}] Y-Axis & Scale on Graphs: Transparent axes, clear dates, zero manipulated scales\n`;
    md += `- [${checkedRisks.financialSymmetry ? 'X' : ' '}] Financial Model Symmetry: Exact alignment across Traction, Forecast & Ask slides\n\n`;

    md += `### GROUP 2: STRATEGIC CLARITY & FRICTION\n`;
    md += `- [${checkedRisks.whyNowEvidence ? 'X' : ' '}] "Why Now?" Hard Evidence: Concrete regulatory, tech, or economic catalyst\n`;
    md += `- [${checkedRisks.defensibilityMoat ? 'X' : ' '}] Defensibility (The Moat): Data compounding, workflow embedding, proprietary hooks\n`;
    md += `- [${checkedRisks.theButSlide ? 'X' : ' '}] The "But..." Slide: Proactive objection handling (churn, free spreadsheets)\n\n`;

    md += `### GROUP 3: NARRATIVE & FLOW FRICTION\n`;
    md += `- [${checkedRisks.actionTitles ? 'X' : ' '}] Action Titles over Category Labels: Metric-driven takeaway headlines\n`;
    md += `- [${checkedRisks.momTestLanguage ? 'X' : ' '}] The Mom Test Translation: Zero jargon, instantly clear value proposition\n`;
    md += `- [${checkedRisks.askSpecificity ? 'X' : ' '}] The "Ask" Specificity: Explicit milestones tied to funding runway\n\n`;

    md += `## 2. DIRECT PITCH DECK AUDIT MATRIX\n`;
    Object.entries(matrixState).forEach(([slide, status]) => {
      md += `- ${slide.toUpperCase()}: ${status === 'pass' ? 'STRONG SIGNAL (PASS)' : 'FRICTION RISK (FAIL)'}\n`;
    });

    copyToClipboard(md, 'full-dossier');
  };

  // ═══ 0. PATHWAY LANDING PAGE (NEO-BRUTALIST INTAKE SCREEN) ═══
  if (!hasScanned) {
    return (
      <div className="min-h-[72vh] flex flex-col items-center justify-center py-8 px-4 font-mono select-none">
        {/* Badge Banner */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="bg-black text-[#CCFF00] border-2 border-black px-3.5 py-1 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#000] flex items-center gap-1.5">
            <Presentation size={13} className="text-[#CCFF00]" />
            <span>AI PITCH DECK ANALYZER</span>
          </span>
          <span className="bg-[#00F0FF] text-black border-2 border-black px-2.5 py-1 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]">
            ENGINE 05 // RISK AUDIT
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-black tracking-tight text-center mb-3">
          FIX YOUR <span className="bg-[#CCFF00] text-black px-3 py-0.5 border-3 border-black shadow-[4px_4px_0px_#000] inline-block -rotate-1">DECK'S FLAWS</span>
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-bold text-black/80 max-w-xl text-center uppercase tracking-wide leading-relaxed mb-8">
          Upload your PDF pitch deck. Our AI will analyze slide quality, story flow, messaging, and metrics to ensure it's institutional investor-ready.
        </p>

        {/* Loading Progress State if analyzing */}
        {isAnalyzing ? (
          <div className="max-w-2xl w-full bg-white border-4 border-black shadow-[10px_10px_0px_#000] relative">
            <div className="bg-[#FFDE59] border-b-4 border-black px-4 py-2.5 flex items-center justify-between text-xs font-black uppercase text-black">
              <div className="flex items-center gap-2">
                <Activity size={14} className="animate-spin" />
                <span>[ SCANNING // PITCH_DECK_AUDIT_PIPELINE ]</span>
              </div>
              <span className="bg-black text-[#FFDE59] px-2 py-0.5 text-[10px] font-black border border-black animate-pulse">
                PROCESSING TELEMETRY
              </span>
            </div>
            <div className="p-8 sm:p-10 text-center font-mono">
              <div className="w-20 h-20 bg-[#00F0FF] border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center mx-auto mb-4 text-black animate-pulse">
                <FileSearch size={34} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black uppercase text-black mb-1">
                RUNNING INSTITUTIONAL RISK AUDIT...
              </h3>
              <p className="text-xs font-bold text-neutral-600 uppercase mb-5">{analysisStage}</p>
              <div className="w-full max-w-md mx-auto h-5 bg-[#FAF8F5] border-3 border-black overflow-hidden shadow-[3px_3px_0px_#000]">
                <div
                  className="h-full bg-[#CCFF00] border-r-2 border-black transition-all duration-300"
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>
              <div className="text-xs font-black text-black uppercase mt-3">
                [ {analysisProgress}% COMPLETE // 5 CORE SLIDES STRESS-TESTED ]
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
                <span className="w-3 h-3 bg-[#CCFF00] border-2 border-black inline-block" />
                <span className="ml-2 font-black">[ INTAKE // DECK_AUDIT_PROTOCOL.PDF ]</span>
              </div>
              <span className="bg-black text-[#CCFF00] px-2 py-0.5 text-[10px] font-black border border-black">
                READY TO INGEST
              </span>
            </div>

            {/* Body */}
            <div className="p-8 sm:p-10 text-center">
              {/* Icon Box */}
              <div className="w-20 h-20 bg-[#CCFF00] border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center mx-auto mb-5 text-black">
                <Upload size={32} strokeWidth={2.5} />
              </div>

              <h3 className="text-xl sm:text-2xl font-black uppercase text-black mb-1.5 tracking-tight">
                Upload your PDF Deck
              </h3>
              <p className="text-xs font-bold text-neutral-600 uppercase mb-6">
                Drag and drop your PDF here, or click to browse. Max size 20MB.
              </p>

              {/* Drag & Drop Target Box */}
              <label
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    setFile(e.dataTransfer.files[0]);
                    runAnalysis(e.dataTransfer.files[0].name);
                  }
                }}
                className="block border-3 border-dashed border-black bg-[#FAF8F5] hover:bg-[#FFF] p-6 mb-6 cursor-pointer shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all group"
              >
                <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
                <div className="text-xs font-black uppercase text-black group-hover:text-[#059669] flex items-center justify-center gap-2">
                  <FileText size={16} />
                  <span>{file ? file.name : '[ CLICK OR DRAG TO ATTACH PITCH DECK .PDF ]'}</span>
                </div>
                <p className="text-[10px] font-bold text-neutral-500 uppercase mt-1">
                  {file ? `SIZE: ${(file.size / 1024 / 1024).toFixed(2)} MB // READY TO SCAN` : 'DEEP AUDIT FOR YC, SEQUOIA & ANDREESSEN HOROWITZ STANDARDS'}
                </p>
              </label>

              {/* CTA Button */}
              <button
                onClick={() => runAnalysis(file ? file.name : null)}
                className="bg-[#059669] hover:bg-black hover:text-[#CCFF00] text-white border-3 border-black text-xs sm:text-sm font-black uppercase tracking-wider px-8 py-4 shadow-[5px_5px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2.5 mx-auto"
              >
                <Wand2 size={16} strokeWidth={2.5} />
                <span>[ ⚡ ANALYZE PITCH DECK ]</span>
              </button>

              {/* Audit Checklist Guarantees */}
              <div className="mt-8 pt-5 border-t-3 border-black flex flex-wrap items-center justify-center gap-2">
                <span className="bg-[#FAF8F5] border-2 border-black px-2.5 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">
                  ✓ DECEPTION SIGNALS AUDIT
                </span>
                <span className="bg-[#FAF8F5] border-2 border-black px-2.5 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">
                  ✓ STRATEGIC CLARITY & MOAT
                </span>
                <span className="bg-[#FAF8F5] border-2 border-black px-2.5 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">
                  ✓ 5 CORE SLIDE BLUEPRINTS
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 font-mono select-none text-black">

      {/* ═══ 1. TOP CONTROL & AUDIT HEADER BANNER ═══ */}
      <div className="bg-white border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_#000] relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b-3 border-black pb-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#CCFF00] border border-black px-2 py-0.5 text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]">
                VC DUE DILIGENCE SCANNER
              </span>
              <span className="bg-black text-[#00F0FF] border border-black px-2 py-0.5 text-[10px] font-black uppercase">
                {startupName}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-black tracking-tight flex items-center gap-2">
              <Presentation size={26} strokeWidth={2.5} />
              <span>Pitch Deck Analyzer & Comprehensive Audit Checklist</span>
            </h2>
            <p className="text-xs font-bold text-neutral-600 uppercase mt-0.5">
              Auditing Deception Signals, Strategic Clarity, Narrative Flow, and the 5 Core Validation Slide Blueprints.
            </p>
          </div>

          {/* Action triggers */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setHasScanned(false)}
              className="bg-white hover:bg-[#FAF8F5] border-2 border-black text-black px-3.5 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <RotateCcw size={14} />
              <span>[ ↺ UPLOAD / RE-SCAN ]</span>
            </button>

            <button
              onClick={exportFullAuditDossier}
              className="bg-white hover:bg-[#CCFF00] border-2 border-black text-black px-3.5 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              {copiedItem === 'full-dossier' ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
              <span>{copiedItem === 'full-dossier' ? 'DOSSIER COPIED!' : 'EXPORT AUDIT DOSSIER'}</span>
            </button>

            <button
              onClick={() => runAnalysis()}
              disabled={isAnalyzing}
              className="bg-[#CCFF00] hover:bg-[#b8e600] border-2 border-black text-black px-4 py-1.5 text-xs font-black uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <RotateCcw size={14} className={isAnalyzing ? "animate-spin" : ""} strokeWidth={2.5} />
              <span>[ ↺ RE-AUDIT DECK ]</span>
            </button>
          </div>
        </div>

        {/* Upload bar & Document status */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#FAF8F5] border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-black shrink-0" />
            <span className="text-xs font-black uppercase text-black truncate">
              ACTIVE DECK: <span className="underline">{file ? file.name : `${startupName.toLowerCase().replace(/\s+/g, '_')}_pitch_deck_v3.pdf`}</span>
            </span>
            <span className="bg-emerald-100 border border-emerald-500 text-emerald-800 text-[9px] font-black px-1.5 py-0.5 uppercase shrink-0">
              AUDITED
            </span>
          </div>

          <label className="bg-white hover:bg-[#FFDE59] border-2 border-black px-3 py-1 text-[11px] font-black uppercase text-black shadow-[2px_2px_0px_#000] cursor-pointer flex items-center justify-center gap-1.5 shrink-0 transition-all">
            <Upload size={13} />
            <span>UPLOAD NEW PDF DECK</span>
            <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* AI Pitch Deck Audit Callout */}
      {aiAuditBadge && (
        <div className="p-4 bg-black text-white border-4 border-black shadow-[6px_6px_0px_#000] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#CCFF00] text-[10px] font-black uppercase">
              <Bot size={14} className="stroke-[2.5]" />
              <span>AUDITED BY CONNECTED AI // {aiAuditBadge.provider} ({aiAuditBadge.model})</span>
            </div>
            <p className="text-xs font-bold text-neutral-100">
              "{aiAuditBadge.critique}"
            </p>
          </div>
          <span className="shrink-0 px-2 py-0.5 bg-[#CCFF00] text-black text-[10px] font-black border border-black uppercase">
            VENTURE PARTNER AUDIT
          </span>
        </div>
      )}

      {/* ═══ SCANNING LOADER ═══ */}
      {isAnalyzing && (
        <div className="bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_#000]">
          <div className="w-14 h-14 bg-[#00F0FF] border-3 border-black mx-auto mb-3 flex items-center justify-center animate-pulse shadow-[4px_4px_0px_#000]">
            <FileSearch size={28} />
          </div>
          <h3 className="text-lg font-black uppercase text-black mb-1">
            RUNNING COMPREHENSIVE PITCH DECK RISK AUDIT...
          </h3>
          <p className="text-xs font-bold text-neutral-600 uppercase mb-4">{analysisStage}</p>
          <div className="w-full max-w-md mx-auto h-4 bg-[#FAF8F5] border-2 border-black overflow-hidden shadow-[2px_2px_0px_#000]">
            <div className="h-full bg-[#CCFF00] transition-all duration-300" style={{ width: `${analysisProgress}%` }} />
          </div>
        </div>
      )}

      {!isAnalyzing && (
        <>
          {/* ═══ 2. HERO SCORE BANNER: READINESS & NARRATIVE SYNTHESIS ═══ */}
          <div className="bg-black text-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000] relative">
            <div className="absolute top-2 right-3 text-white/30 text-[10px] font-black tracking-widest hidden sm:block">
              [ TIER-1 VC DUE DILIGENCE AUDIT BENCHMARK ]
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Column: Grade & Status */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 border-2 border-white text-xs font-black uppercase shadow-[2px_2px_0px_#FFF] ${deckScore >= 80 ? 'bg-[#CCFF00] text-black' : deckScore >= 65 ? 'bg-[#FFDE59] text-black' : 'bg-[#FF0033] text-white'
                    }`}>
                    {deckScore >= 80 ? 'INVESTOR READY' : deckScore >= 65 ? 'NEEDS REVISIONS' : 'CRITICAL RED FLAGS'}
                  </span>
                  <span className="bg-zinc-800 text-white border border-white/40 px-2 py-0.5 text-[10px] font-black uppercase">
                    3 RISK GROUPS • 5 CORE SLIDES
                  </span>
                </div>

                <div className="flex items-baseline gap-4">
                  <div className="text-6xl sm:text-7xl font-black text-[#00F0FF] tracking-tighter">
                    {deckScore}
                    <span className="text-2xl sm:text-3xl text-white/50 font-black">/100</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xl sm:text-2xl font-black uppercase text-[#FFDE59] tracking-tight">
                      {deckScore >= 80 ? 'LOW FRICTION PITCH' : deckScore >= 65 ? 'PARTIAL FRICTION DETECTED' : 'DEAL-KILLING FRICTION'}
                    </div>
                    <div className="text-[11px] font-bold text-white/70 uppercase">
                      {Object.values(checkedRisks).filter(Boolean).length}/9 Risk Gates Passed • {Object.values(matrixState).filter(s => s === 'pass').length}/5 Core Slides Clean
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-[#CCFF00] pl-4 py-1">
                  <div className="text-xs font-black uppercase text-[#CCFF00] mb-1">
                    EXECUTIVE AUDIT SYNTHESIS:
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-white/90 uppercase leading-relaxed">
                    "Your core value proposition and bottom-up TAM are solid, but you must bridge the gap between a cool product and a scalable business. Anticipate the spreadsheet workaround objection on Slide 2 and enforce strict symmetry between your traction and financial forecast."
                  </p>
                </div>
              </div>

              {/* Right Column: Key Operational Risk Quick Radar */}
              <div className="lg:col-span-5 bg-zinc-950 border-3 border-white p-4 space-y-3 shadow-[4px_4px_0px_#FFF]">
                <div className="text-[11px] font-black uppercase text-white/70 border-b border-white/20 pb-1.5 flex justify-between">
                  <span>OPERATIONAL RISK VECTORS</span>
                  <span className="text-[#00F0FF]">HEALTH</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-white mb-0.5">
                      <span>1. Deception & Integrity Signals</span>
                      <span className={checkedRisks.financialSymmetry ? 'text-[#CCFF00]' : 'text-[#FF0033]'}>
                        {checkedRisks.bottomUpTam && checkedRisks.yAxisScale && checkedRisks.financialSymmetry ? '100% CLEAN' : '67% (ASYMMETRY FLAGGED)'}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 border border-white/40 overflow-hidden">
                      <div className="h-full bg-[#00F0FF] transition-all" style={{ width: checkedRisks.financialSymmetry ? '100%' : '67%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-white mb-0.5">
                      <span>2. Strategic Clarity & Defensibility</span>
                      <span className={checkedRisks.theButSlide ? 'text-[#CCFF00]' : 'text-[#FFDE59]'}>
                        {checkedRisks.whyNowEvidence && checkedRisks.defensibilityMoat && checkedRisks.theButSlide ? '100% STRONG' : '67% (OBJECTION MISSING)'}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 border border-white/40 overflow-hidden">
                      <div className="h-full bg-[#FFDE59] transition-all" style={{ width: checkedRisks.theButSlide ? '100%' : '67%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-white mb-0.5">
                      <span>3. Narrative & Flow Friction</span>
                      <span className="text-[#CCFF00]">100% STRONG</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 border border-white/40 overflow-hidden">
                      <div className="h-full bg-[#CCFF00]" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/20 text-[10px] font-bold text-white/60 uppercase">
                  // CRITICAL DIRECTIVE: NEVER HANDWAVE PRICING OR BURY SPREADSHEET COMPETITION.
                </div>
              </div>

            </div>
          </div>

          {/* ═══ 3. NAVIGATION VIEW TABS ═══ */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white border-3 border-black p-3.5 shadow-[4px_4px_0px_#000]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-black uppercase text-neutral-500 mr-1">
                AUDIT SUITE:
              </span>
              {[
                { id: 'risk-audit', label: '1. OPERATIONAL RISK CHECKLIST (3 GROUPS)' },
                { id: 'matrix', label: '2. DIRECT AUDIT MATRIX (PASS/FAIL)' },
                { id: 'blueprints', label: '3. 5 CORE SLIDE NARRATIVE BLUEPRINTS' },
                { id: 'teardown', label: '4. AI SLIDE TEARDOWN & REWRITES' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 text-xs font-black uppercase border-2 border-black transition-all ${activeTab === tab.id
                    ? 'bg-black text-[#CCFF00] shadow-[2px_2px_0px_#000]'
                    : 'bg-[#FAF8F5] text-black hover:bg-neutral-100 shadow-[2px_2px_0px_#000]'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="text-[10px] font-black uppercase text-neutral-500 hidden sm:inline">
              INTERACTIVE DUE DILIGENCE AUDITOR
            </span>
          </div>

          {/* ═══ TAB 1: OPERATIONAL RISK AUDIT CHECKLIST (3 GROUPS) ═══ */}
          {activeTab === 'risk-audit' && (
            <div className="space-y-6">

              {/* Group 1: The "Deception" & Integrity Signals */}
              <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-3 border-black pb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF0033] text-white border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_#000]">
                      01
                    </div>
                    <div>
                      <h3 className="font-black text-lg uppercase text-black tracking-tight">
                        The "Deception" & Integrity Signals
                      </h3>
                      <p className="text-xs font-bold text-neutral-600 uppercase">
                        Investors audit numbers ruthlessly. Red flags in your data will kill a deal instantly.
                      </p>
                    </div>
                  </div>
                  <span className="bg-[#FFF0F0] border border-[#FF0033] text-[#FF0033] text-[10px] font-black uppercase px-2 py-0.5 shrink-0">
                    DEAL-KILLER THRESHOLD
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  {/* Item 1: Bottom-up TAM */}
                  <div className={`p-4 border-3 border-black space-y-3 transition-all ${checkedRisks.bottomUpTam ? 'bg-[#F0FFF0]' : 'bg-[#FFF0F0]'
                    }`}>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-black text-sm uppercase text-black">The Bottom-Up Market Reality</span>
                      <button
                        onClick={() => toggleRiskCheck('bottomUpTam')}
                        className={`px-2 py-0.5 text-[9px] font-black uppercase border border-black cursor-pointer ${checkedRisks.bottomUpTam ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                          }`}
                      >
                        {checkedRisks.bottomUpTam ? '✓ VERIFIED' : '⚠ FLAGGED'}
                      </button>
                    </div>
                    <p className="text-xs font-bold text-neutral-700 leading-relaxed uppercase">
                      Ensure your TAM is calculated using a logical, bottom-up formula (<span className="text-black font-black">number of target customers × your price</span>). Avoid lazy, top-down statements like <em>"We just need 1% of a $50B market."</em>
                    </p>
                    <div className="bg-white border-2 border-black p-2.5 text-[11px] font-bold">
                      <div className="text-[9px] font-black text-neutral-500 uppercase">// AUDITED FORMULA BENCHMARK:</div>
                      <div className="font-mono text-black font-black mt-0.5">
                        TAM = 42,000 Mid-Market Plants × $14,400 ACV = $604M SAM
                      </div>
                    </div>
                  </div>

                  {/* Item 2: Y-Axis & Scale */}
                  <div className={`p-4 border-3 border-black space-y-3 transition-all ${checkedRisks.yAxisScale ? 'bg-[#F0FFF0]' : 'bg-[#FFF0F0]'
                    }`}>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-black text-sm uppercase text-black">The Y-Axis & Scale on Graphs</span>
                      <button
                        onClick={() => toggleRiskCheck('yAxisScale')}
                        className={`px-2 py-0.5 text-[9px] font-black uppercase border border-black cursor-pointer ${checkedRisks.yAxisScale ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                          }`}
                      >
                        {checkedRisks.yAxisScale ? '✓ VERIFIED' : '⚠ FLAGGED'}
                      </button>
                    </div>
                    <p className="text-xs font-bold text-neutral-700 leading-relaxed uppercase">
                      Never use graphs with missing labels, missing dates, or manipulated scales designed to make flat growth look hockey-stick shaped. Investors find this intentionally misleading.
                    </p>
                    <div className="bg-white border-2 border-black p-2.5 text-[11px] font-bold">
                      <div className="text-[9px] font-black text-neutral-500 uppercase">// INTEGRITY RULE:</div>
                      <div className="text-black font-black mt-0.5">
                        Start Y-axis at $0 MRR. Label monthly timestamps explicitly.
                      </div>
                    </div>
                  </div>

                  {/* Item 3: Financial Symmetry */}
                  <div className={`p-4 border-3 border-black space-y-3 transition-all ${checkedRisks.financialSymmetry ? 'bg-[#F0FFF0]' : 'bg-[#FFF0F0]'
                    }`}>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-black text-sm uppercase text-black">Financial Model Symmetry</span>
                      <button
                        onClick={() => toggleRiskCheck('financialSymmetry')}
                        className={`px-2 py-0.5 text-[9px] font-black uppercase border border-black cursor-pointer ${checkedRisks.financialSymmetry ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                          }`}
                      >
                        {checkedRisks.financialSymmetry ? '✓ VERIFIED' : '⚠ FLAGGED'}
                      </button>
                    </div>
                    <p className="text-xs font-bold text-neutral-700 leading-relaxed uppercase">
                      The numbers quoted on your Traction slide must perfectly align with your Financial Forecast slide and your Ask slide.
                    </p>
                    <div className="bg-white border-2 border-black p-2.5 text-[11px] font-bold">
                      <div className="text-[9px] font-black text-[#FF0033] uppercase">// CRITICAL WARNING:</div>
                      <div className="text-black font-black mt-0.5">
                        Traction states $18.4k MRR; verify Forecast year-1 revenue matches ($220k run-rate).
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Group 2: Strategic Clarity & Friction */}
              <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-3 border-black pb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFDE59] text-black border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_#000]">
                      02
                    </div>
                    <div>
                      <h3 className="font-black text-lg uppercase text-black tracking-tight">
                        Strategic Clarity & Friction
                      </h3>
                      <p className="text-xs font-bold text-neutral-600 uppercase">
                        A great deck bridges the gap between a cool product and a highly scalable business model.
                      </p>
                    </div>
                  </div>
                  <span className="bg-[#FAF8F5] border border-black text-black text-[10px] font-black uppercase px-2 py-0.5 shrink-0">
                    MOAT & DIFFERENTIATION
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  {/* Item 1: Why Now? */}
                  <div className={`p-4 border-3 border-black space-y-3 transition-all ${checkedRisks.whyNowEvidence ? 'bg-[#F0FFF0]' : 'bg-[#FFF0F0]'
                    }`}>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-black text-sm uppercase text-black">The "Why Now?" Hard Evidence</span>
                      <button
                        onClick={() => toggleRiskCheck('whyNowEvidence')}
                        className={`px-2 py-0.5 text-[9px] font-black uppercase border border-black cursor-pointer ${checkedRisks.whyNowEvidence ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                          }`}
                      >
                        {checkedRisks.whyNowEvidence ? '✓ VERIFIED' : '⚠ FLAGGED'}
                      </button>
                    </div>
                    <p className="text-xs font-bold text-neutral-700 leading-relaxed uppercase">
                      Do not just list generic macro trends. Identify the precise regulatory shift, technological breakthrough, or economic pain point that makes your business possible today but impossible three years ago.
                    </p>
                    <div className="bg-white border-2 border-black p-2.5 text-[11px] font-bold">
                      <div className="text-[9px] font-black text-neutral-500 uppercase">// EVIDENCE CATALYST:</div>
                      <div className="text-black font-black mt-0.5">
                        EU CSDDD Mandate passed in 2024 with mandatory 2026 enforcement penalties.
                      </div>
                    </div>
                  </div>

                  {/* Item 2: Defensibility */}
                  <div className={`p-4 border-3 border-black space-y-3 transition-all ${checkedRisks.defensibilityMoat ? 'bg-[#F0FFF0]' : 'bg-[#FFF0F0]'
                    }`}>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-black text-sm uppercase text-black">Defensibility (The Moat)</span>
                      <button
                        onClick={() => toggleRiskCheck('defensibilityMoat')}
                        className={`px-2 py-0.5 text-[9px] font-black uppercase border border-black cursor-pointer ${checkedRisks.defensibilityMoat ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                          }`}
                      >
                        {checkedRisks.defensibilityMoat ? '✓ VERIFIED' : '⚠ FLAGGED'}
                      </button>
                    </div>
                    <p className="text-xs font-bold text-neutral-700 leading-relaxed uppercase">
                      Clearly articulate why a tech giant or a well-funded competitor cannot easily clone your software in a weekend. Detail your data network effects, proprietary workflows, or exclusive distribution channels.
                    </p>
                    <div className="bg-white border-2 border-black p-2.5 text-[11px] font-bold">
                      <div className="text-[9px] font-black text-neutral-500 uppercase">// MOAT BENCHMARK:</div>
                      <div className="text-black font-black mt-0.5">
                        Compounding supplier graph: audited invoices generate immutable audit ledgers.
                      </div>
                    </div>
                  </div>

                  {/* Item 3: The "But..." Slide */}
                  <div className={`p-4 border-3 border-black space-y-3 transition-all ${checkedRisks.theButSlide ? 'bg-[#F0FFF0]' : 'bg-[#FFF0F0]'
                    }`}>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-black text-sm uppercase text-black">The "But..." Slide (Objections)</span>
                      <button
                        onClick={() => toggleRiskCheck('theButSlide')}
                        className={`px-2 py-0.5 text-[9px] font-black uppercase border border-black cursor-pointer ${checkedRisks.theButSlide ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                          }`}
                      >
                        {checkedRisks.theButSlide ? '✓ VERIFIED' : '⚠ FLAGGED'}
                      </button>
                    </div>
                    <p className="text-xs font-bold text-neutral-700 leading-relaxed uppercase">
                      Anticipate the biggest, most obvious reason an investor would say "no" (e.g., high churn, heavy reliance on free spreadsheets) and address it directly in the deck before they have to ask.
                    </p>
                    <div className="bg-white border-2 border-black p-2.5 text-[11px] font-bold">
                      <div className="text-[9px] font-black text-[#FF0033] uppercase">// ACTION REQUIRED:</div>
                      <div className="text-black font-black mt-0.5">
                        Add Slide 2.5: "Why Buyers Ditch Spreadsheets When Audits Are Scrutinized."
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Group 3: Narrative & Flow Friction */}
              <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-3 border-black pb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00F0FF] text-black border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_#000]">
                      03
                    </div>
                    <div>
                      <h3 className="font-black text-lg uppercase text-black tracking-tight">
                        Narrative & Flow Friction
                      </h3>
                      <p className="text-xs font-bold text-neutral-600 uppercase">
                        If an investor cannot understand your business in 30 seconds of skimming, they will pass.
                      </p>
                    </div>
                  </div>
                  <span className="bg-[#FAF8F5] border border-black text-black text-[10px] font-black uppercase px-2 py-0.5 shrink-0">
                    30-SECOND SKIMMABILITY
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  {/* Item 1: Action Titles */}
                  <div className={`p-4 border-3 border-black space-y-3 transition-all ${checkedRisks.actionTitles ? 'bg-[#F0FFF0]' : 'bg-[#FFF0F0]'
                    }`}>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-black text-sm uppercase text-black">Action Titles over Category Labels</span>
                      <button
                        onClick={() => toggleRiskCheck('actionTitles')}
                        className={`px-2 py-0.5 text-[9px] font-black uppercase border border-black cursor-pointer ${checkedRisks.actionTitles ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                          }`}
                      >
                        {checkedRisks.actionTitles ? '✓ VERIFIED' : '⚠ FLAGGED'}
                      </button>
                    </div>
                    <p className="text-xs font-bold text-neutral-700 leading-relaxed uppercase">
                      Replace generic slide headers like "The Solution" or "Market Growth" with punchy, metric-driven takeaways. For example: <em>"Our Automated Engine Eliminates 80% of Manual Spreadsheet Errors."</em>
                    </p>
                    <div className="bg-white border-2 border-black p-2.5 text-[11px] font-bold">
                      <div className="text-[9px] font-black text-neutral-500 uppercase">// TITLES RULE:</div>
                      <div className="text-black font-black mt-0.5">
                        Every slide title must be an assertive, complete thought with a metric.
                      </div>
                    </div>
                  </div>

                  {/* Item 2: The Mom Test Translation */}
                  <div className={`p-4 border-3 border-black space-y-3 transition-all ${checkedRisks.momTestLanguage ? 'bg-[#F0FFF0]' : 'bg-[#FFF0F0]'
                    }`}>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-black text-sm uppercase text-black">The Mom Test Translation</span>
                      <button
                        onClick={() => toggleRiskCheck('momTestLanguage')}
                        className={`px-2 py-0.5 text-[9px] font-black uppercase border border-black cursor-pointer ${checkedRisks.momTestLanguage ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                          }`}
                      >
                        {checkedRisks.momTestLanguage ? '✓ VERIFIED' : '⚠ FLAGGED'}
                      </button>
                    </div>
                    <p className="text-xs font-bold text-neutral-700 leading-relaxed uppercase">
                      Ensure your Problem and Solution slides are written in simple, universal language. If a non-technical person cannot understand what you do instantly, it is too complex.
                    </p>
                    <div className="bg-white border-2 border-black p-2.5 text-[11px] font-bold">
                      <div className="text-[9px] font-black text-neutral-500 uppercase">// SIMPLICITY TEST:</div>
                      <div className="text-black font-black mt-0.5">
                        Can you explain your product in 1 sentence using zero technical buzzwords?
                      </div>
                    </div>
                  </div>

                  {/* Item 3: The "Ask" Specificity */}
                  <div className={`p-4 border-3 border-black space-y-3 transition-all ${checkedRisks.askSpecificity ? 'bg-[#F0FFF0]' : 'bg-[#FFF0F0]'
                    }`}>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-black text-sm uppercase text-black">The "Ask" Specificity</span>
                      <button
                        onClick={() => toggleRiskCheck('askSpecificity')}
                        className={`px-2 py-0.5 text-[9px] font-black uppercase border border-black cursor-pointer ${checkedRisks.askSpecificity ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                          }`}
                      >
                        {checkedRisks.askSpecificity ? '✓ VERIFIED' : '⚠ FLAGGED'}
                      </button>
                    </div>
                    <p className="text-xs font-bold text-neutral-700 leading-relaxed uppercase">
                      Do not just ask for money. Explicitly break down exactly what milestones the capital will unlock (e.g., <em>"This $1.5M round funds our GTM team to reach $1.2M ARR in 14 months"</em>).
                    </p>
                    <div className="bg-white border-2 border-black p-2.5 text-[11px] font-bold">
                      <div className="text-[9px] font-black text-neutral-500 uppercase">// FORMULA:</div>
                      <div className="text-black font-black mt-0.5">
                        Ask = Capital ($1.5M) + Runway (14 Mo) + Target Milestone ($1.2M ARR).
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ═══ TAB 2: DIRECT PITCH DECK AUDIT MATRIX ═══ */}
          {activeTab === 'matrix' && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-3 border-black pb-4 gap-2">
                <div>
                  <h3 className="font-black text-lg uppercase text-black tracking-tight flex items-center gap-2">
                    <CheckSquare size={20} className="stroke-[2.5]" />
                    Direct Pitch Deck Audit Matrix
                  </h3>
                  <p className="text-xs font-bold text-neutral-600 uppercase">
                    Use this scannable checklist to score your current deck before sending it out to investors.
                  </p>
                </div>
                <div className="text-xs font-black uppercase bg-[#FAF8F5] border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000]">
                  CLICK STATUS BUTTONS TO TOGGLE PASS / FAIL
                </div>
              </div>

              {/* Table / Matrix */}
              <div className="overflow-x-auto">
                <table className="w-full border-3 border-black text-left text-xs uppercase font-mono">
                  <thead>
                    <tr className="bg-black text-white border-b-3 border-black">
                      <th className="p-3.5 font-black border-r-2 border-white/20 w-1/5">Audit Focus</th>
                      <th className="p-3.5 font-black border-r-2 border-white/20 w-2/5 text-[#CCFF00]">
                        ✓ Strong Signal (Pass)
                      </th>
                      <th className="p-3.5 font-black border-r-2 border-white/20 w-2/5 text-[#FF0033]">
                        ✗ Friction Risk (Fail)
                      </th>
                      <th className="p-3.5 font-black text-center w-28">Current Status</th>
                    </tr>
                  </thead>
                  <tbody>

                    {/* Row 1: Problem Slide */}
                    <tr className="border-b-2 border-black bg-white hover:bg-[#FAF8F5]">
                      <td className="p-3.5 font-black border-r-2 border-black text-black">
                        1. Problem Slide
                      </td>
                      <td className="p-3.5 font-bold border-r-2 border-black text-neutral-800 bg-[#F0FFF0]/50">
                        Focuses on a single, massive pain point backed by user quotes or verified metrics.
                      </td>
                      <td className="p-3.5 font-bold border-r-2 border-black text-neutral-800 bg-[#FFF0F0]/50">
                        Lists 5 unrelated problems, diluting focus and confusing the core value proposition.
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => toggleMatrixItem('problem')}
                          className={`w-full py-1.5 px-2 border-2 border-black font-black text-[10px] shadow-[2px_2px_0px_#000] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 ${matrixState.problem === 'pass' ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                            }`}
                        >
                          {matrixState.problem === 'pass' ? 'PASS [✓]' : 'FAIL [✗]'}
                        </button>
                      </td>
                    </tr>

                    {/* Row 2: Solution Slide */}
                    <tr className="border-b-2 border-black bg-white hover:bg-[#FAF8F5]">
                      <td className="p-3.5 font-black border-r-2 border-black text-black">
                        2. Solution Slide
                      </td>
                      <td className="p-3.5 font-bold border-r-2 border-black text-neutral-800 bg-[#F0FFF0]/50">
                        Shows a clear screenshot, interface, or demo loop of the core value in under 3 seconds.
                      </td>
                      <td className="p-3.5 font-bold border-r-2 border-black text-neutral-800 bg-[#FFF0F0]/50">
                        Uses vague abstract diagrams, conceptual clip art, or multi-layered technical jargon.
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => toggleMatrixItem('solution')}
                          className={`w-full py-1.5 px-2 border-2 border-black font-black text-[10px] shadow-[2px_2px_0px_#000] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 ${matrixState.solution === 'pass' ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                            }`}
                        >
                          {matrixState.solution === 'pass' ? 'PASS [✓]' : 'FAIL [✗]'}
                        </button>
                      </td>
                    </tr>

                    {/* Row 3: Business Model */}
                    <tr className="border-b-2 border-black bg-white hover:bg-[#FAF8F5]">
                      <td className="p-3.5 font-black border-r-2 border-black text-black">
                        3. Business Model
                      </td>
                      <td className="p-3.5 font-bold border-r-2 border-black text-neutral-800 bg-[#F0FFF0]/50">
                        Explains exactly who pays, how much they pay, and how frequently (e.g. $14k/yr B2B SaaS).
                      </td>
                      <td className="p-3.5 font-bold border-r-2 border-black text-neutral-800 bg-[#FFF0F0]/50">
                        Handwaves pricing with "We will monetize via data, marketplace take rates, or ads later."
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => toggleMatrixItem('businessModel')}
                          className={`w-full py-1.5 px-2 border-2 border-black font-black text-[10px] shadow-[2px_2px_0px_#000] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 ${matrixState.businessModel === 'pass' ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                            }`}
                        >
                          {matrixState.businessModel === 'pass' ? 'PASS [✓]' : 'FAIL [✗]'}
                        </button>
                      </td>
                    </tr>

                    {/* Row 4: Go-To-Market */}
                    <tr className="border-b-2 border-black bg-white hover:bg-[#FAF8F5]">
                      <td className="p-3.5 font-black border-r-2 border-black text-black">
                        4. Go-To-Market (GTM)
                      </td>
                      <td className="p-3.5 font-bold border-r-2 border-black text-neutral-800 bg-[#F0FFF0]/50">
                        Outlines a highly specific, repeatable channel to acquire your first 100 paying customers.
                      </td>
                      <td className="p-3.5 font-bold border-r-2 border-black text-neutral-800 bg-[#FFF0F0]/50">
                        Relies on generic catch-alls like "Word of mouth, viral social posts, and broad SEO."
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => toggleMatrixItem('gtm')}
                          className={`w-full py-1.5 px-2 border-2 border-black font-black text-[10px] shadow-[2px_2px_0px_#000] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 ${matrixState.gtm === 'pass' ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                            }`}
                        >
                          {matrixState.gtm === 'pass' ? 'PASS [✓]' : 'FAIL [✗]'}
                        </button>
                      </td>
                    </tr>

                    {/* Row 5: Team Slide */}
                    <tr className="bg-white hover:bg-[#FAF8F5]">
                      <td className="p-3.5 font-black border-r-2 border-black text-black">
                        5. Team Slide
                      </td>
                      <td className="p-3.5 font-bold border-r-2 border-black text-neutral-800 bg-[#F0FFF0]/50">
                        Highlights specific domain expertise, past relevant engineering/sales wins, and unfair moats.
                      </td>
                      <td className="p-3.5 font-bold border-r-2 border-black text-neutral-800 bg-[#FFF0F0]/50">
                        Lists generic bullet points, generalist resumes, or irrelevant academic pedigrees.
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => toggleMatrixItem('team')}
                          className={`w-full py-1.5 px-2 border-2 border-black font-black text-[10px] shadow-[2px_2px_0px_#000] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 ${matrixState.team === 'pass' ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                            }`}
                        >
                          {matrixState.team === 'pass' ? 'PASS [✓]' : 'FAIL [✗]'}
                        </button>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>

              {/* Matrix Status Alert */}
              <div className="bg-[#FAF8F5] border-3 border-black p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="text-xs font-black uppercase text-black">
                  MATRIX AUDIT RESULT: <span className={matrixState.businessModel === 'pass' ? 'text-emerald-700' : 'text-[#FF0033]'}>
                    {Object.values(matrixState).filter(s => s === 'pass').length} / 5 SLIDES PASSED VC SCRUTINY
                  </span>
                </div>
                <div className="text-[11px] font-bold text-neutral-600 uppercase">
                  Tip: Fix failed slides using the Core Slide Narrative Blueprints tab below.
                </div>
              </div>
            </div>
          )}

          {/* ═══ TAB 3: 5 CORE SLIDE NARRATIVE BLUEPRINTS ═══ */}
          {activeTab === 'blueprints' && (
            <div className="space-y-6">

              <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000]">
                <h3 className="font-black text-base uppercase text-black flex items-center gap-2">
                  <Sparkles size={18} className="stroke-[2.5]" />
                  The 5 Core Validation Mapped Slide Narrative Blueprints
                </h3>
                <p className="text-xs font-bold text-neutral-600 uppercase mt-0.5">
                  Direct copy-paste scripts and structural formulas mapping directly to Core Validation Pillars and Friction elimination.
                </p>
              </div>

              {/* 5 Slide Blueprint Cards */}
              <div className="space-y-4">

                {/* 1. The Problem Slide */}
                <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-black pb-3 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#FF0033] text-white border-2 border-black flex items-center justify-center font-black text-xs shadow-[2px_2px_0px_#000]">
                        01
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase text-neutral-500">
                          SLIDE 01 // MAPPING TO CORE VALIDATION & HIGH URGENCY
                        </div>
                        <h4 className="text-lg font-black uppercase text-black">
                          The Problem Slide: The Hair-on-Fire Inaction Cost
                        </h4>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(
                        `SLIDE 1 (PROBLEM): Current workflows are broken. When this specific error occurs, it completely blocks core revenue generation for businesses, causing immediate financial loss. It is a hair-on-fire problem.`,
                        'slide1'
                      )}
                      className="px-3 py-1 bg-white hover:bg-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {copiedItem === 'slide1' ? <Check size={12} className="text-emerald-700" /> : <Copy size={12} />}
                      <span>{copiedItem === 'slide1' ? 'COPIED!' : 'COPY SLIDE SCRIPT'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
                    <div className="bg-[#FAF8F5] border-2 border-black p-3.5 space-y-2">
                      <div className="text-[10px] font-black uppercase text-neutral-500 flex items-center gap-1">
                        <Flame size={12} className="text-[#FF0033]" />
                        <span>THE CONTENT REQUIREMENT:</span>
                      </div>
                      <p className="leading-relaxed text-neutral-800">
                        Frame the problem using the visceral public frustration found on Reddit, Twitter, and customer interviews. Show proof that users are screaming for a solution.
                      </p>
                    </div>

                    <div className="bg-[#F0FFF0] border-2 border-black p-3.5 space-y-2">
                      <div className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        <span>THE NARRATIVE SCRIPT:</span>
                      </div>
                      <p className="leading-relaxed text-black font-mono">
                        "Current workflows are broken. When this specific error/issue occurs, it completely blocks core revenue generation for businesses, causing immediate financial loss. It is a hair-on-fire problem."
                      </p>
                    </div>
                  </div>

                  <div className="bg-black text-[#CCFF00] p-3 text-xs font-bold border-2 border-black">
                    <strong className="text-white uppercase">// RECOMMENDED ACTION TITLE FOR {startupName.toUpperCase()}:</strong><br />
                    "SUPPLY CHAIN ESG DISQUALIFICATION RISKS $2.4M IN LOST CONTRACTS FOR MID-MARKET SUPPLIERS"
                  </div>
                </div>

                {/* 2. The Current Workaround Slide */}
                <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-black pb-3 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#FFDE59] text-black border-2 border-black flex items-center justify-center font-black text-xs shadow-[2px_2px_0px_#000]">
                        02
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase text-neutral-500">
                          SLIDE 02 // MAPPING TO FRICTION RISK ELIMINATION
                        </div>
                        <h4 className="text-lg font-black uppercase text-black">
                          The Current Workaround Slide: The Spreadsheet Elephant
                        </h4>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(
                        `SLIDE 2 (WORKAROUND): Today, users try to patch this with free spreadsheets. They hate it, but they stick to it because it is free. This represents our biggest obstacle—and our biggest opportunity.`,
                        'slide2'
                      )}
                      className="px-3 py-1 bg-white hover:bg-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {copiedItem === 'slide2' ? <Check size={12} className="text-emerald-700" /> : <Copy size={12} />}
                      <span>{copiedItem === 'slide2' ? 'COPIED!' : 'COPY SLIDE SCRIPT'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
                    <div className="bg-[#FAF8F5] border-2 border-black p-3.5 space-y-2">
                      <div className="text-[10px] font-black uppercase text-neutral-500 flex items-center gap-1">
                        <AlertTriangle size={12} className="text-amber-600" />
                        <span>THE CONTENT REQUIREMENT:</span>
                      </div>
                      <p className="leading-relaxed text-neutral-800">
                        Address the spreadsheet elephant in the room early. Do not pretend free manual alternatives do not exist—explain why they collapse under pressure.
                      </p>
                    </div>

                    <div className="bg-[#F0FFF0] border-2 border-black p-3.5 space-y-2">
                      <div className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        <span>THE NARRATIVE SCRIPT:</span>
                      </div>
                      <p className="leading-relaxed text-black font-mono">
                        "Today, users try to patch this with free spreadsheets. They hate it, but they stick to it because it is free. This represents our biggest obstacle—and our biggest opportunity."
                      </p>
                    </div>
                  </div>

                  <div className="bg-black text-[#FFDE59] p-3 text-xs font-bold border-2 border-black">
                    <strong className="text-white uppercase">// RECOMMENDED ACTION TITLE FOR {startupName.toUpperCase()}:</strong><br />
                    "MANUAL SPREADSHEET AUDITS FAIL 78% OF EUROPEAN REGULATORY SCOPE-3 SUBMISSIONS"
                  </div>
                </div>

                {/* 3. The Solution & Value Prop Slide */}
                <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-black pb-3 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#00F0FF] text-black border-2 border-black flex items-center justify-center font-black text-xs shadow-[2px_2px_0px_#000]">
                        03
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase text-neutral-500">
                          SLIDE 03 // MAPPING TO HIGH HABIT / FREQUENCY
                        </div>
                        <h4 className="text-lg font-black uppercase text-black">
                          The Solution Slide: Everyday Habit & Automated Velocity
                        </h4>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(
                        `SLIDE 3 (SOLUTION): Because this issue happens multiple times a week, our solution seamlessly integrates into their daily workflow. We don't just fix a rare problem; we automate a frequent, recurring pain point, saving them X hours every week.`,
                        'slide3'
                      )}
                      className="px-3 py-1 bg-white hover:bg-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {copiedItem === 'slide3' ? <Check size={12} className="text-emerald-700" /> : <Copy size={12} />}
                      <span>{copiedItem === 'slide3' ? 'COPIED!' : 'COPY SLIDE SCRIPT'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
                    <div className="bg-[#FAF8F5] border-2 border-black p-3.5 space-y-2">
                      <div className="text-[10px] font-black uppercase text-neutral-500 flex items-center gap-1">
                        <Activity size={12} className="text-[#00F0FF]" />
                        <span>THE CONTENT REQUIREMENT:</span>
                      </div>
                      <p className="leading-relaxed text-neutral-800">
                        Show how your product builds an everyday habit. Prove that it lives in the daily operational critical path rather than being opened once a quarter.
                      </p>
                    </div>

                    <div className="bg-[#F0FFF0] border-2 border-black p-3.5 space-y-2">
                      <div className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        <span>THE NARRATIVE SCRIPT:</span>
                      </div>
                      <p className="leading-relaxed text-black font-mono">
                        "Because this issue happens multiple times a week, our solution seamlessly integrates into their daily workflow. We don’t just fix a rare problem; we automate a frequent, recurring pain point, saving them X hours every week."
                      </p>
                    </div>
                  </div>

                  <div className="bg-black text-[#00F0FF] p-3 text-xs font-bold border-2 border-black">
                    <strong className="text-white uppercase">// RECOMMENDED ACTION TITLE FOR {startupName.toUpperCase()}:</strong><br />
                    "1-CLICK ERP CONNECTOR TURNS RAW UTILITY INVOICES INTO CERTIFIED AUDIT LEDGERS IN 180 SECONDS"
                  </div>
                </div>

                {/* 4. The GTM Strategy Slide */}
                <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-black pb-3 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#CCFF00] text-black border-2 border-black flex items-center justify-center font-black text-xs shadow-[2px_2px_0px_#000]">
                        04
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase text-neutral-500">
                          SLIDE 04 // OVERCOMING CONVERSION FRICTION
                        </div>
                        <h4 className="text-lg font-black uppercase text-black">
                          The Go-To-Market Slide: Low Barrier Utility Wedge
                        </h4>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(
                        `SLIDE 4 (GTM): Detail how you will lower the initial barrier to entry. This could look like a "free utility tool" that mimics a spreadsheet but connects automatically, or a risk-free trial that demonstrates direct ROI within the first 5 minutes of setup.`,
                        'slide4'
                      )}
                      className="px-3 py-1 bg-white hover:bg-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {copiedItem === 'slide4' ? <Check size={12} className="text-emerald-700" /> : <Copy size={12} />}
                      <span>{copiedItem === 'slide4' ? 'COPIED!' : 'COPY SLIDE SCRIPT'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
                    <div className="bg-[#FAF8F5] border-2 border-black p-3.5 space-y-2">
                      <div className="text-[10px] font-black uppercase text-neutral-500 flex items-center gap-1">
                        <TrendingUp size={12} className="text-emerald-600" />
                        <span>THE CONTENT REQUIREMENT:</span>
                      </div>
                      <p className="leading-relaxed text-neutral-800">
                        Since conversion friction is high, you must detail your strategy to break it. Detail how you conquer the initial trust and setup barriers.
                      </p>
                    </div>

                    <div className="bg-[#F0FFF0] border-2 border-black p-3.5 space-y-2">
                      <div className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        <span>THE NARRATIVE SCRIPT:</span>
                      </div>
                      <p className="leading-relaxed text-black font-mono">
                        "Detail how you will lower the initial barrier to entry. This could look like a 'free utility tool' that mimics a spreadsheet but connects automatically, or a risk-free trial that demonstrates direct ROI within the first 5 minutes of setup."
                      </p>
                    </div>
                  </div>

                  <div className="bg-black text-[#CCFF00] p-3 text-xs font-bold border-2 border-black">
                    <strong className="text-white uppercase">// RECOMMENDED ACTION TITLE FOR {startupName.toUpperCase()}:</strong><br />
                    "FREE 1-CLICK COMPLIANCE AUDITOR ACQUIRES 100 VP TARGETS WITH ZERO SALES RESISTANCE"
                  </div>
                </div>

                {/* 5. Market Size & Traction Slide */}
                <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-black pb-3 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#FF52D9] text-black border-2 border-black flex items-center justify-center font-black text-xs shadow-[2px_2px_0px_#000]">
                        05
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase text-neutral-500">
                          SLIDE 05 // MAPPING TO REMAINING PILLARS & SCALE
                        </div>
                        <h4 className="text-lg font-black uppercase text-black">
                          Market Size & Traction Slide: Compounding Market Pull
                        </h4>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(
                        `SLIDE 5 (MARKET & TRACTION): The viral nature of community complaints highlights a massive, underserved market segment. Here is how we scale past early adopters to capture a larger portion of this target industry.`,
                        'slide5'
                      )}
                      className="px-3 py-1 bg-white hover:bg-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {copiedItem === 'slide5' ? <Check size={12} className="text-emerald-700" /> : <Copy size={12} />}
                      <span>{copiedItem === 'slide5' ? 'COPIED!' : 'COPY SLIDE SCRIPT'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
                    <div className="bg-[#FAF8F5] border-2 border-black p-3.5 space-y-2">
                      <div className="text-[10px] font-black uppercase text-neutral-500 flex items-center gap-1">
                        <Target size={12} className="text-[#FF52D9]" />
                        <span>THE CONTENT REQUIREMENT:</span>
                      </div>
                      <p className="leading-relaxed text-neutral-800">
                        Use your evidence signals to prove a broader market pull. Connect early design partner traction directly to an expanding, compounding addressable market.
                      </p>
                    </div>

                    <div className="bg-[#F0FFF0] border-2 border-black p-3.5 space-y-2">
                      <div className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        <span>THE NARRATIVE SCRIPT:</span>
                      </div>
                      <p className="leading-relaxed text-black font-mono">
                        "The viral nature of community complaints highlights a massive, underserved market segment. Here is how we scale past early adopters to capture a larger portion of this target industry."
                      </p>
                    </div>
                  </div>

                  <div className="bg-black text-[#FF52D9] p-3 text-xs font-bold border-2 border-black">
                    <strong className="text-white uppercase">// RECOMMENDED ACTION TITLE FOR {startupName.toUpperCase()}:</strong><br />
                    "$604M SAM GROWING AT 28% CAGR DRIVEN BY MANDATORY EUROPEAN SUPPLY CHAIN DISCLOSURE"
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ═══ TAB 4: AI SLIDE TEARDOWN & REWRITES (PRESERVED & ENHANCED) ═══ */}
          {activeTab === 'teardown' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Critical Flaws Detected */}
              <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000] space-y-4">
                <div className="flex justify-between items-center border-b-3 border-black pb-3">
                  <h3 className="font-black text-sm uppercase text-black flex items-center gap-2">
                    <FileSearch size={18} className="stroke-[2.5]" />
                    CRITICAL FLAWS AUDITED (5 FLAGGED)
                  </h3>
                  <span className="bg-[#FF0033] text-white text-[10px] font-black uppercase px-2 py-0.5 border border-black">
                    REVISION REQUIRED
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { type: 'Deception Risk', slide: 'Slide 4', issue: 'TAM is stated as "1% of a $50B market" with zero bottom-up calculation of target customer accounts × ACV.' },
                    { type: 'Weak Messaging', slide: 'Slide 7', issue: 'Solution is framed as a feature bullet list, rather than a quantifiable operational transformation.' },
                    { type: 'Asymmetry', slide: 'Slide 10', issue: 'Showing cumulative signups instead of paid MRR growth looks intentionally misleading to institutional investors.' },
                    { type: 'Missing Objection', slide: 'Slide 2', issue: 'Completely ignores that buyers currently use free spreadsheets. Must address this elephant upfront.' },
                    { type: 'Vague Ask', slide: 'Slide 12', issue: 'Asking for "$1.5M for growth and hiring" without specific milestones or 18-month ARR targets.' }
                  ].map((issue, i) => (
                    <div key={i} className="p-3.5 bg-[#FFF0F0] border-3 border-black shadow-[3px_3px_0px_#000] flex gap-3">
                      <div className="w-8 h-8 bg-[#FF0033] border-2 border-black text-white flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#000]">
                        <XCircle size={16} className="stroke-[3]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-black text-black text-xs uppercase">{issue.type}</span>
                          <span className="text-[10px] font-black px-2 py-0.5 bg-[#FFDE59] text-black border border-black">{issue.slide}</span>
                        </div>
                        <p className="text-xs font-bold text-black/80 uppercase leading-snug">{issue.issue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Master Narrative Rewrite & Slide Flow */}
              <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000] space-y-4">
                <div className="flex justify-between items-center border-b-3 border-black pb-3">
                  <h3 className="font-black text-sm uppercase text-black flex items-center gap-2">
                    <Layers size={18} className="stroke-[2.5]" />
                    OPTIMIZED 10-SLIDE VC SEQUENCE
                  </h3>
                  <span className="bg-[#CCFF00] text-black text-[10px] font-black uppercase px-2 py-0.5 border border-black">
                    INSTITUTIONAL STANDARD
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { num: '01', title: 'Title & One-Sentence Value Wedge', note: 'Immediate clarity in under 5 seconds' },
                    { num: '02', title: 'The Problem (Urgent Inaction Cost)', note: 'Hair-on-fire financial bleed backed by metrics' },
                    { num: '03', title: 'The Spreadsheet Workaround (Elephant in Room)', note: 'Why manual patches fail under regulatory scrutiny' },
                    { num: '04', title: 'The Solution (Habit & Workflow Integration)', note: 'Show direct screenshot of core aha! outcome' },
                    { num: '05', title: 'Why Now? (Precise Regulatory/Tech Catalyst)', note: 'Why this was impossible 3 years ago' },
                    { num: '06', title: 'Bottom-Up Market Sizing (TAM/SAM/SOM)', note: 'Customers × Price formula; no lazy top-down stats' },
                    { num: '07', title: 'Business Model & Unit Economics', note: 'Who pays, how much, and frequency ($14k ACV)' },
                    { num: '08', title: 'Go-To-Market (Repeatable 100-Customer Vector)', note: 'Low-barrier utility tool or targeted cold outbound' },
                    { num: '09', title: 'Defensibility Moat & Data Network Effects', note: 'Why incumbents cannot clone this in a weekend' },
                    { num: '10', title: 'The Specific Ask & 18-Month Milestones', note: '$1.5M funding runway to reach $1.2M ARR' }
                  ].map((slide, i) => (
                    <div key={i} className="flex gap-3 items-center bg-[#FAF8F5] border-2 border-black p-2.5 shadow-[2px_2px_0px_#000]">
                      <div className="w-7 h-7 bg-[#CCFF00] border-2 border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#000]">
                        <span className="font-black text-black text-xs">{slide.num}</span>
                      </div>
                      <div className="flex-1 truncate">
                        <p className="text-xs font-black text-black uppercase truncate">{slide.title}</p>
                        <p className="text-[10px] font-bold text-neutral-500 uppercase truncate">// {slide.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </>
      )}

    </div>
  );
}
