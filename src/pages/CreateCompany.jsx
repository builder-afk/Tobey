import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Rocket, Brain, CheckCircle2, ChevronRight, ChevronLeft,
  Building, Lightbulb, Target, Users, LayoutGrid, MessageSquare, Hexagon, Star, 
  ArrowRight, FileText, Globe, Link as LinkIcon, Image as ImageIcon,
  DollarSign, Shield, Zap, Terminal, AlertTriangle, Scale, PieChart, ExternalLink,
  Key, Cpu, Eye, EyeOff, Check, Loader2, Sparkles, RefreshCw
} from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';
import { AI_PROVIDERS, getAiConfig, saveAiConfig, testAiConnection } from '../utils/aiConfig';

export default function CreateCompany() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('pitch_user_company');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return {
      name: '',
      tagline: '',
      niche: 'Agentic AI & LLM Infrastructure',
      region: 'North America (US/CA)',
      problem: '',
      targetBuyer: '',
      wtp: '$35,000 - $90,000 / year',
      incumbentFlaw: '',
      solution: '',
      stage: 'Pre-Seed',
      targetRaise: '$1.5M',
      valuationCap: '$12M Post',
      runway: '16 Months',
      hiringNeeds: 'Forward Deployed Engineer (FDE)',
      website: '',
      readinessScore: 89
    };
  });

  // AI Model & Key State for Onboarding
  const existingAi = getAiConfig();
  const [selectedProvider, setSelectedProvider] = useState(existingAi?.provider || 'openai');
  const [selectedModel, setSelectedModel] = useState(existingAi?.modelId || 'gpt-4o');
  const [apiKey, setApiKey] = useState(existingAi?.apiKey || '');
  const [baseUrl, setBaseUrl] = useState(existingAi?.baseUrl || 'http://localhost:11434');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // Terminal Processing Simulation
  const [terminalLogs, setTerminalLogs] = useState([]);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // Terminal simulation on Step 5
  useEffect(() => {
    if (step === 5) {
      setTerminalLogs([]);
      const provObj = AI_PROVIDERS[selectedProvider];
      const modelObj = provObj?.models?.find(m => m.id === selectedModel);
      const logs = [
        'INITIATING VENTURE GENESIS ENGINE V2.6...',
        `CALIBRATING SECTOR: [ ${formData.niche?.toUpperCase()} ]`,
        `GEO CORRIDOR: [ ${formData.region?.toUpperCase()} ]`,
        `AUDITING THESIS: "${formData.name || 'NEW VENTURE'}"`,
        `CONFIGURING AI WORKSPACE GATEWAY: [ ${provObj?.name?.toUpperCase() || 'OPENAI'} // ${modelObj?.name?.toUpperCase() || selectedModel} ]`,
        'VERIFYING CRYPTOGRAPHIC HANDSHAKE & LATENCY... VERIFIED (128ms)',
        'EVALUATING INCUMBENT BLINDSPOT DEFENSE MATRIX...',
        'MEASURING ENTERPRISE WILLINGNESS TO PAY (WTP)...',
        `INITIALIZING CAP TABLE: ${formData.targetRaise} ON ${formData.valuationCap} SAFE...`,
        'ARMING 9 VENTURE STUDIO ACCELERATOR ENGINES...',
        'VENTURE DOSSIER INITIALIZATION COMPLETE // ARMED FOR COCKPIT'
      ];

      logs.forEach((log, index) => {
        setTimeout(() => {
          setTerminalLogs(prev => [...prev, log]);
        }, index * 400);
      });

      const timer = setTimeout(() => {
        setStep(6);
      }, logs.length * 400 + 600);

      return () => clearTimeout(timer);
    }
  }, [step, selectedProvider, selectedModel, formData]);

  const handleProviderChange = (provKey) => {
    setSelectedProvider(provKey);
    const prov = AI_PROVIDERS[provKey];
    if (prov && prov.defaultModel) {
      setSelectedModel(prov.defaultModel);
    }
    setTestResult(null);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testAiConnection(selectedProvider, apiKey, selectedModel, baseUrl);
      setTestResult(res);
    } catch (err) {
      setTestResult({ success: false, message: 'Test verification failed.' });
    } finally {
      setIsTesting(false);
    }
  };

  const saveAiAndProceed = (skip = false) => {
    if (!skip && (apiKey.trim() || selectedProvider === 'ollama')) {
      const prov = AI_PROVIDERS[selectedProvider];
      const mod = prov?.models?.find(m => m.id === selectedModel);
      saveAiConfig({
        provider: selectedProvider,
        providerName: prov?.name || selectedProvider,
        modelId: selectedModel,
        modelName: mod?.name || selectedModel,
        apiKey: apiKey.trim(),
        baseUrl: baseUrl.trim()
      });
    }
    setStep(5);
  };

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const niches = [
    'Agentic AI & LLM Infrastructure',
    'FinTech & Cross-Border Clearing',
    'DevTools, Compilers & Cloud Ops',
    'Cyber Defense & Compliance',
    'HealthTech & Clinical Automation',
    'Robotics & Physical AI',
    'Climate Tech & Clean Energy',
    'Supply Chain & Logistics'
  ];

  const regions = [
    'North America (US/CA)',
    'Europe & UK',
    'India Tech Hub',
    'Asia-Pacific (APAC)',
    'Latin America (LatAm)',
    'MENA & GCC',
    'Global / Remote'
  ];

  const stages = [
    { id: 'Pre-Seed', label: 'PRE-SEED (PROTOTYPE IN IDE)', desc: 'Hacking core architecture in Hypers workspace' },
    { id: 'Alpha Pilots', label: 'ALPHA (3+ PILOT LOIS)', desc: 'Early technical validation with design partners' },
    { id: 'Seed', label: 'SEED ROUND ACTIVE', desc: 'Raising SAFE institutional venture capital' },
    { id: 'Growth', label: 'POST-REVENUE EXPANSION', desc: 'Repeatable sales motion and high velocity' },
  ];

  // Save company and sync to Cockpit
  const handleFinish = () => {
    // Save to pitch_user_company for dashboard
    localStorage.setItem('pitch_user_company', JSON.stringify({
      ...formData,
      targetAudience: formData.targetBuyer
    }));

    // Also sync to hypers_current_company_thesis so Founder Cockpit loads it immediately
    localStorage.setItem('hypers_current_company_thesis', JSON.stringify({
      name: formData.name || 'Autonomous Venture',
      tagline: formData.tagline || formData.solution,
      stage: formData.stage,
      targetRaise: formData.targetRaise,
      committed: '$400k (25%)',
      runway: formData.runway,
      targetBuyer: formData.targetBuyer,
      valuation: formData.valuationCap,
      niche: formData.niche,
      region: formData.region
    }));

    navigate('/pitch');
  };

  return (
    <div 
      className="min-h-screen bg-[#F0EDE6] text-black font-mono selection:bg-[#FFDE59] selection:text-black flex flex-col"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* Top Warning / Telemetry Marquee */}
      <div className="h-9 shrink-0 bg-[#FF8811] text-white border-b-4 border-black py-1 px-4 overflow-hidden whitespace-nowrap z-20 flex items-center shadow-[0_4px_0px_#000] select-none">
        <div className="flex items-center gap-8 animate-marquee font-mono text-[11px] font-black uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><span className="text-[#FFDE59]">⚡</span> [ VENTURE GENESIS PROTOCOL // REGISTER STARTUP COMPANY ]</span>
          <span>//</span>
          <span>LINKED DIRECTLY TO FOUNDER'S COCKPIT & VENTURE RADAR</span>
          <span>//</span>
          <span>12-FACTOR VC EVALUATION ENGINE READY</span>
          <span>//</span>
          <span>SAFE DILUTION & CAP TABLE GENERATOR ARMED</span>
          <span>//</span>
          <span className="bg-black text-[#00F0FF] px-2 py-0.5 border border-white font-black">ZERO TOY PROJECTS</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full flex-1 flex flex-col justify-center">

        {/* ═══ PROGRESS HEADER ═══ */}
        {step < 5 && (
          <div className="mb-8 border-4 border-black bg-white p-4 shadow-[6px_6px_0px_#000]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 text-xs font-black uppercase">
              <span className="bg-[#FF8811] text-white px-2.5 py-1 border-2 border-black inline-block shadow-[2px_2px_0px_#000]">
                [ STEP 0{step} OF 04 ]
              </span>
              <span className="text-gray-700">
                {step === 1 && '// PHASE 1: VENTURE IDENTITY & SECTOR ALIGNMENT'}
                {step === 2 && '// PHASE 2: VISCERAL PROBLEM & INCUMBENT BLINDSPOT'}
                {step === 3 && '// PHASE 3: STAGE, CAPITAL TARGET & RUNWAY'}
                {step === 4 && '// PHASE 4: FOUNDER WORKSPACE AI MODEL & API KEY GATEWAY'}
              </span>
            </div>

            {/* Brutalist Progress Bar */}
            <div className="h-4 w-full bg-[#FAF8F5] border-2 border-black p-0.5">
              <div 
                className="h-full bg-[#FF8811] border-r-2 border-black transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* ════ STEP 1: VENTURE IDENTITY & SECTOR ════ */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_#000]"
            >
              {/* Window Titlebar */}
              <div className="flex items-center gap-2 pb-4 mb-6 border-b-4 border-black">
                <div className="w-3.5 h-3.5 bg-[#FF0033] border border-black" />
                <div className="w-3.5 h-3.5 bg-[#FFDE59] border border-black" />
                <div className="w-3.5 h-3.5 bg-[#CCFF00] border border-black" />
                <span className="ml-2 text-xs font-black uppercase text-black">
                  [ STEP 01 // VENTURE IDENTITY & SECTOR FOCUS ]
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black mb-2">
                LET'S REGISTER YOUR VENTURE THESIS
              </h2>
              <p className="text-xs sm:text-sm font-bold text-gray-600 uppercase mb-8 leading-relaxed">
                // Calibrate company identity for the Founder's Cockpit, VC red-team grilling, and the startup radar directory.
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-2">
                    PROJECT / COMPANY NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => updateForm('name', e.target.value)}
                    placeholder="e.g. KernelMesh AI"
                    className="w-full p-3.5 bg-[#FAF8F5] border-2 border-black text-sm font-mono font-black uppercase text-black focus:outline-none focus:bg-white focus:shadow-[2px_2px_0px_#000]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-2">
                    ONE-SENTENCE PUNCHY TAGLINE (THE ELEVATOR HOOK) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tagline}
                    onChange={(e) => updateForm('tagline', e.target.value)}
                    placeholder="e.g. Deterministic circuit breakers for multi-agent LLM production runs"
                    className="w-full p-3.5 bg-[#FAF8F5] border-2 border-black text-sm font-mono font-black uppercase text-black focus:outline-none focus:bg-white focus:shadow-[2px_2px_0px_#000]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-2">
                      VERTICAL NICHE:
                    </label>
                    <select
                      value={formData.niche}
                      onChange={(e) => updateForm('niche', e.target.value)}
                      className="w-full p-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase text-black focus:outline-none cursor-pointer"
                    >
                      {niches.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-2">
                      OPERATING GEOGRAPHY / REGION:
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => updateForm('region', e.target.value)}
                      className="w-full p-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase text-black focus:outline-none cursor-pointer"
                    >
                      {regions.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end pt-4 border-t-2 border-black">
                <button
                  type="button"
                  disabled={!formData.name || !formData.tagline}
                  onClick={nextStep}
                  className="px-6 py-3 bg-[#FF8811] hover:bg-[#FFDE59] text-white hover:text-black font-black text-xs uppercase border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>[ PROCEED TO PROBLEM THESIS ]</span>
                  <ArrowRight size={16} className="stroke-[3]" />
                </button>
              </div>

            </motion.div>
          )}

          {/* ════ STEP 2: VISCERAL PROBLEM & INCUMBENT BLINDSPOT ════ */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_#000]"
            >
              {/* Window Titlebar */}
              <div className="flex items-center gap-2 pb-4 mb-6 border-b-4 border-black">
                <div className="w-3.5 h-3.5 bg-[#FF0033] border border-black" />
                <div className="w-3.5 h-3.5 bg-[#FFDE59] border border-black" />
                <div className="w-3.5 h-3.5 bg-[#CCFF00] border border-black" />
                <span className="ml-2 text-xs font-black uppercase text-black">
                  [ STEP 02 // PROBLEM SPACE & INCUMBENT VULNERABILITY ]
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black mb-2">
                WHY DOES THIS PROBLEM MATTER?
              </h2>
              <p className="text-xs sm:text-sm font-bold text-gray-600 uppercase mb-8 leading-relaxed">
                // Tier-1 VCs only fund urgent, bleeding-neck pain points with high willingness to pay.
              </p>

              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    WHAT IS THE EXACT VISCERAL PAIN POINT? *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.problem}
                    onChange={(e) => updateForm('problem', e.target.value)}
                    placeholder="e.g. When multi-agent systems run in production, single-step schema drift creates silent deadlocks and corrupts downstream DB records, costing $50k+ per incident..."
                    className="w-full p-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase text-black focus:outline-none focus:bg-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1">
                      SPECIFIC TARGET ENTERPRISE BUYER:
                    </label>
                    <input
                      type="text"
                      value={formData.targetBuyer}
                      onChange={(e) => updateForm('targetBuyer', e.target.value)}
                      placeholder="e.g. VP of Platform Engineering / CISO"
                      className="w-full p-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase text-black focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1">
                      VALIDATED WILLINGNESS TO PAY (WTP):
                    </label>
                    <input
                      type="text"
                      value={formData.wtp}
                      onChange={(e) => updateForm('wtp', e.target.value)}
                      placeholder="e.g. $4,000 / mo or $45k ACV"
                      className="w-full p-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase text-black focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1 text-red-700">
                    // WHY CAN'T OR WON'T INCUMBENTS (BIG TECH) SOLVE THIS?
                  </label>
                  <textarea
                    rows={2}
                    value={formData.incumbentFlaw}
                    onChange={(e) => updateForm('incumbentFlaw', e.target.value)}
                    placeholder="e.g. Legacy observability vendors only monitor HTTP status codes; their monolithic architecture lacks eBPF runtime sandboxing..."
                    className="w-full p-3 bg-red-50 border-2 border-black text-xs font-mono font-black uppercase text-black focus:outline-none focus:bg-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1 text-emerald-800">
                    // WHAT IS YOUR TECHNICAL WEDGE / MVP ATTACK ANGLE?
                  </label>
                  <textarea
                    rows={2}
                    value={formData.solution}
                    onChange={(e) => updateForm('solution', e.target.value)}
                    placeholder="e.g. A drop-in eBPF proxy that catches rogue agent loops, snapshots environment memory, and synthesizes a self-healing rollback patch in 12ms..."
                    className="w-full p-3 bg-emerald-50 border-2 border-black text-xs font-mono font-black uppercase text-black focus:outline-none focus:bg-white resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-black">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-3 bg-white border-2 border-black text-black font-black text-xs uppercase hover:bg-neutral-100 cursor-pointer"
                >
                  [ ← BACK ]
                </button>

                <button
                  type="button"
                  disabled={!formData.problem}
                  onClick={nextStep}
                  className="px-6 py-3 bg-[#FF8811] hover:bg-[#FFDE59] text-white hover:text-black font-black text-xs uppercase border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>[ PROCEED TO CAPITAL TARGETS ]</span>
                  <ArrowRight size={16} className="stroke-[3]" />
                </button>
              </div>

            </motion.div>
          )}

          {/* ════ STEP 3: CAPITAL TARGETS, STAGE & RUNWAY ════ */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_#000]"
            >
              {/* Window Titlebar */}
              <div className="flex items-center gap-2 pb-4 mb-6 border-b-4 border-black">
                <div className="w-3.5 h-3.5 bg-[#FF0033] border border-black" />
                <div className="w-3.5 h-3.5 bg-[#FFDE59] border border-black" />
                <div className="w-3.5 h-3.5 bg-[#CCFF00] border border-black" />
                <span className="ml-2 text-xs font-black uppercase text-black">
                  [ STEP 03 // VENTURE STAGE, CAPITAL & TELEMETRY ]
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black mb-2">
                CAPITAL TARGET & COCKPIT CALIBRATION
              </h2>
              <p className="text-xs sm:text-sm font-bold text-gray-600 uppercase mb-8 leading-relaxed">
                // Configure your financing targets to initialize the cap table simulator and sprint board.
              </p>

              {/* Stage Selection */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase text-black mb-3">
                  CURRENT VENTURE MATURITY STAGE:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stages.map((stg) => {
                    const isSelected = formData.stage === stg.id;
                    return (
                      <button
                        key={stg.id}
                        type="button"
                        onClick={() => updateForm('stage', stg.id)}
                        className={`p-3.5 border-2 border-black text-left transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-[#FFDE59] text-black shadow-[4px_4px_0px_#000] translate-x-0.5' 
                            : 'bg-white hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <span className="text-xs font-black uppercase block mb-1">
                          {stg.label}
                        </span>
                        <span className="text-[10px] font-bold text-gray-700 block">
                          {stg.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Financial Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 pt-4 border-t-2 border-black">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    TARGET CAPITAL RAISE:
                  </label>
                  <input
                    type="text"
                    value={formData.targetRaise}
                    onChange={(e) => updateForm('targetRaise', e.target.value)}
                    placeholder="e.g. $1.5M"
                    className="w-full p-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase text-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    POST-MONEY SAFE CAP:
                  </label>
                  <input
                    type="text"
                    value={formData.valuationCap}
                    onChange={(e) => updateForm('valuationCap', e.target.value)}
                    placeholder="e.g. $12M Post"
                    className="w-full p-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase text-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    ESTIMATED RUNWAY:
                  </label>
                  <input
                    type="text"
                    value={formData.runway}
                    onChange={(e) => updateForm('runway', e.target.value)}
                    placeholder="e.g. 18 Months"
                    className="w-full p-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase text-black focus:outline-none"
                  />
                </div>
              </div>

              {/* Team & Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    CRITICAL HIRING NEED (ROLE):
                  </label>
                  <input
                    type="text"
                    value={formData.hiringNeeds}
                    onChange={(e) => updateForm('hiringNeeds', e.target.value)}
                    placeholder="e.g. Forward Deployed Engineer (FDE)"
                    className="w-full p-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase text-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    WEBSITE / REPO / DEMO LINK:
                  </label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => updateForm('website', e.target.value)}
                    placeholder="e.g. https://github.com/my-org/repo"
                    className="w-full p-3 bg-[#FAF8F5] border-2 border-black text-xs font-mono font-black uppercase text-black focus:outline-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-black">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-3 bg-white border-2 border-black text-black font-black text-xs uppercase hover:bg-neutral-100 cursor-pointer"
                >
                  [ ← BACK ]
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-[#FF8811] hover:bg-[#FFDE59] text-white hover:text-black font-black text-xs uppercase border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Key size={16} className="stroke-[3]" />
                  <span>[ PROCEED TO AI MODEL & KEY SETUP ]</span>
                </button>
              </div>

            </motion.div>
          )}

          {/* ════ STEP 4: AI MODEL GATEWAY & API KEY SETUP ════ */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_#000]"
            >
              {/* Window Titlebar */}
              <div className="flex items-center gap-2 pb-4 mb-6 border-b-4 border-black">
                <div className="w-3.5 h-3.5 bg-[#FF0033] border border-black" />
                <div className="w-3.5 h-3.5 bg-[#FFDE59] border border-black" />
                <div className="w-3.5 h-3.5 bg-[#CCFF00] border border-black" />
                <span className="ml-2 text-xs font-black uppercase text-black">
                  [ STEP 04 // FOUNDER WORKSPACE AI MODEL & API KEY GATEWAY ]
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                  ARM YOUR FOUNDER WORKSPACE AI
                </h2>
                <span className="px-2.5 py-1 bg-[#00F0FF] border-2 border-black text-[11px] font-black uppercase shadow-[2px_2px_0px_#000]">
                  BYOK ARCHITECTURE
                </span>
              </div>

              <p className="text-xs sm:text-sm font-bold text-gray-600 uppercase mb-6 leading-relaxed">
                // Connect your preferred LLM provider & API key to power all 9 AI Venture Studio tools in the Founder's Cockpit (Pitch Analyzer, 12-Factor VC Evaluation, Pitch Deck Auditor & Live Interview Sim).
              </p>

              {/* 1. Provider Selection Grid */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase text-black mb-2 flex items-center justify-between">
                  <span>1. SELECT AI PROVIDER:</span>
                  <span className="text-[10px] text-gray-500 font-bold">8 PROVIDERS SUPPORTED</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {Object.entries(AI_PROVIDERS).map(([key, prov]) => {
                    const isSelected = selectedProvider === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleProviderChange(key)}
                        className={`p-3 border-2 border-black text-left transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-[#FFDE59] text-black shadow-[4px_4px_0px_#000] translate-x-0.5'
                            : 'bg-[#FAF8F5] hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black uppercase truncate">{prov.name}</span>
                          {prov.badge && (
                            <span className="text-[8px] font-black px-1 py-0.2 bg-black text-white uppercase border border-black">
                              {prov.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-600 font-bold block truncate">
                          {prov.models.length} Models
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Model Selection Grid */}
              <div className="mb-6 p-4 bg-[#FAF8F5] border-2 border-black">
                <label className="block text-xs font-black uppercase text-black mb-2 flex items-center justify-between">
                  <span>2. SELECT MODEL ({AI_PROVIDERS[selectedProvider]?.name}):</span>
                  <span className="text-[10px] text-gray-500 font-bold">SWITCH ANYTIME</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto brutalist-scrollbar pr-1">
                  {AI_PROVIDERS[selectedProvider]?.models?.map(mod => {
                    const isSelected = selectedModel === mod.id;
                    return (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => setSelectedModel(mod.id)}
                        className={`p-2.5 border-2 border-black text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-black text-[#FFDE59] shadow-[3px_3px_0px_#000]'
                            : 'bg-white hover:bg-neutral-100 text-black'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase truncate">{mod.name}</span>
                          {mod.recommended && (
                            <span className="text-[8px] font-black px-1.5 py-0.2 bg-[#CCFF00] text-black border border-black">
                              RECOMMENDED
                            </span>
                          )}
                          {mod.tag && !mod.recommended && (
                            <span className="text-[8px] font-black px-1.5 py-0.2 bg-neutral-200 text-black border border-black">
                              {mod.tag}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-1 text-[10px] font-bold opacity-80">
                          <span>ID: {mod.id}</span>
                          <span>{mod.context}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. API Key & Endpoint Input */}
              <div className="mb-6 space-y-4">
                {selectedProvider === 'ollama' ? (
                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1">
                      LOCAL OLLAMA ENDPOINT:
                    </label>
                    <input
                      type="text"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      placeholder="http://localhost:11434"
                      className="w-full p-3 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none"
                    />
                    <span className="text-[10px] font-bold text-gray-500 mt-1 block">
                      // Ensure Ollama is running locally with <code className="bg-neutral-200 px-1">OLLAMA_ORIGINS="*"</code> enabled for CORS.
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-black uppercase text-black">
                        {AI_PROVIDERS[selectedProvider]?.name} API KEY:
                      </label>
                      <a
                        href={AI_PROVIDERS[selectedProvider]?.docs}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-black text-blue-700 hover:underline flex items-center gap-1 uppercase"
                      >
                        <span>GET API KEY</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>

                    <div className="relative">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder={`e.g. ${AI_PROVIDERS[selectedProvider]?.placeholder || 'sk-...'}`}
                        className="w-full p-3 pr-12 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                      >
                        {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-[10px] text-gray-600 font-bold">
                      <span>🔒 Stored exclusively in your browser sandbox (localStorage).</span>
                      <span>Zero token logging.</span>
                    </div>
                  </div>
                )}

                {/* Connection Test & Feedback */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={isTesting || (!apiKey.trim() && selectedProvider !== 'ollama')}
                    className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 disabled:opacity-50 text-black border-2 border-black text-xs font-black uppercase flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
                  >
                    {isTesting ? (
                      <>
                        <Loader2 size={12} className="animate-spin" />
                        <span>TESTING HANDSHAKE...</span>
                      </>
                    ) : (
                      <>
                        <Zap size={12} />
                        <span>TEST CONNECTION</span>
                      </>
                    )}
                  </button>

                  {testResult && (
                    <div className={`px-3 py-1.5 border-2 border-black text-xs font-black uppercase flex items-center gap-2 ${
                      testResult.success ? 'bg-[#CCFF00] text-black' : 'bg-red-100 text-red-800'
                    }`}>
                      {testResult.success ? <Check size={14} className="stroke-[3]" /> : <AlertTriangle size={14} />}
                      <span>{testResult.message}</span>
                      {testResult.latency && <span className="opacity-75 font-normal">({testResult.latency})</span>}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t-2 border-black">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-3 bg-white border-2 border-black text-black font-black text-xs uppercase hover:bg-neutral-100 cursor-pointer"
                >
                  [ ← BACK ]
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => saveAiAndProceed(true)}
                    className="px-4 py-3 bg-neutral-100 hover:bg-neutral-200 text-black font-black text-xs uppercase border-2 border-black cursor-pointer"
                  >
                    [ SKIP / DEMO SANDBOX ]
                  </button>

                  <button
                    type="button"
                    onClick={() => saveAiAndProceed(false)}
                    className="px-6 py-3 bg-[#FF0033] hover:bg-[#FFDE59] text-white hover:text-black font-black text-xs uppercase border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Rocket size={16} className="stroke-[3]" />
                    <span>[ ARM COCKPIT & INITIALIZE ]</span>
                  </button>
                </div>
              </div>

            </motion.div>
          )}

          {/* ════ STEP 5: TERMINAL TELEMETRY SYNTHESIS ════ */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black border-4 border-black text-white p-6 sm:p-10 shadow-[10px_10px_0px_#000] font-mono"
            >
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800 text-xs text-[#FF8811]">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-[#FF0033] border border-black" />
                  <div className="w-3.5 h-3.5 bg-[#FFDE59] border border-black" />
                  <div className="w-3.5 h-3.5 bg-[#CCFF00] border border-black" />
                  <span className="ml-2 font-black uppercase">
                    [ VENTURE CALIBRATION ENGINE // AI RUNTIME SYNC ]
                  </span>
                </div>
                <span className="animate-pulse text-[#CCFF00]">● SCREENING IN PROGRESS</span>
              </div>

              {/* Simulated Output Lines */}
              <div className="min-h-[260px] space-y-2 text-xs sm:text-sm font-mono">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-[#FF8811] select-none">&gt;</span>
                    <span className="text-neutral-200">{log}</span>
                  </div>
                ))}
                <div className="w-3 h-5 bg-[#FFDE59] animate-pulse inline-block mt-2" />
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-800 text-[11px] text-neutral-500 uppercase flex items-center justify-between">
                <span>ESTIMATING INVESTOR CONVICTION INDEX</span>
                <span>STATUS: HIGH CONVICTION // AI GATEWAY ARMED</span>
              </div>
            </motion.div>
          )}

          {/* ════ STEP 6: VERIFIED VENTURE DOSSIER OUTPUT ════ */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border-4 border-black p-6 sm:p-10 shadow-[10px_10px_0px_#000]"
            >
              {/* Top Banner */}
              <div className="bg-[#FF8811] text-white border-4 border-black p-4 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-[4px_4px_0px_#000]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={24} className="stroke-[3] text-white" />
                  <span className="text-sm font-black uppercase">
                    [ COMPANY INITIALIZED // FOUNDER'S COCKPIT SYNCED ]
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-black text-[#FFDE59] text-[10px] font-black uppercase border border-white">
                  STAGE: {formData.stage.toUpperCase()}
                </span>
              </div>

              {/* Venture Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b-4 border-black gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-gray-500 block mb-1">
                    REGISTERED VENTURE IDENTIFIER
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black uppercase text-black">
                    {formData.name || 'AUTONOMOUS STARTUP'}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-gray-700 uppercase mt-1">
                    {formData.tagline}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="px-2.5 py-0.5 bg-[#FFDE59] border border-black text-xs font-black uppercase">
                      {formData.niche}
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#00F0FF] border border-black text-xs font-black uppercase">
                      {formData.region}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF8F5] border-2 border-black text-center min-w-[150px]">
                  <span className="text-[9px] font-black uppercase text-gray-500 block">INVESTOR READINESS</span>
                  <span className="text-3xl font-black text-black">{formData.readinessScore}<span className="text-sm text-gray-500">/100</span></span>
                  <span className="text-[9px] font-black uppercase text-emerald-700 block">TIER-1 SEED ELIGIBLE</span>
                </div>
              </div>

              {/* Connected AI Engine Box */}
              <div className="p-4 bg-[#00F0FF]/15 border-3 border-black mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black text-[#00F0FF] border-2 border-black flex items-center justify-center shrink-0">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-gray-600 block">FOUNDER WORKSPACE AI ENGINE</span>
                      <span className="px-1.5 py-0.2 bg-[#CCFF00] border border-black text-[9px] font-black uppercase">ARMED & READY</span>
                    </div>
                    <div className="text-sm font-black text-black uppercase">
                      {AI_PROVIDERS[selectedProvider]?.name || 'OpenAI'} — {AI_PROVIDERS[selectedProvider]?.models?.find(m => m.id === selectedModel)?.name || selectedModel}
                    </div>
                    <div className="text-[10px] font-bold text-gray-600">
                      Powering Pitch Analyzer, 12-Factor VC Evaluation, Pitch Deck Auditor & Live Interview Sim
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 border border-black px-2 py-1 inline-block">
                    ● ACTIVE IN COCKPIT
                  </span>
                </div>
              </div>

              {/* Capital & Runway Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#FAF8F5] border-2 border-black mb-6 text-xs font-bold uppercase">
                <div>
                  <span className="text-[9px] font-black text-gray-500 block">TARGET RAISE</span>
                  <span className="text-base font-black text-blue-700">{formData.targetRaise}</span>
                </div>
                <div>
                  <span className="text-[9px] font-black text-gray-500 block">VALUATION CAP</span>
                  <span className="text-base font-black text-black">{formData.valuationCap}</span>
                </div>
                <div>
                  <span className="text-[9px] font-black text-gray-500 block">CASH RUNWAY</span>
                  <span className="text-base font-black text-emerald-700">{formData.runway}</span>
                </div>
                <div>
                  <span className="text-[9px] font-black text-gray-500 block">KEY HIRE</span>
                  <span className="text-xs font-black text-purple-700 truncate block">{formData.hiringNeeds}</span>
                </div>
              </div>

              {/* Problem & Solution Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-red-50 border-2 border-black">
                  <span className="text-[10px] font-black uppercase text-red-800 block mb-1">
                    // THE UNRESOLVED PROBLEM:
                  </span>
                  <p className="text-xs font-bold text-gray-800 uppercase leading-relaxed">
                    {formData.problem}
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 border-2 border-black">
                  <span className="text-[10px] font-black uppercase text-emerald-800 block mb-1">
                    // THE TECHNICAL WEDGE:
                  </span>
                  <p className="text-xs font-bold text-gray-800 uppercase leading-relaxed">
                    {formData.solution || 'Building a high-throughput runtime wedge with proprietary defensibility.'}
                  </p>
                </div>
              </div>

              {/* Launch Actions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t-4 border-black">
                <button
                  type="button"
                  onClick={handleFinish}
                  className="p-3.5 bg-[#FF0033] hover:bg-[#FFDE59] text-white hover:text-black font-black text-xs uppercase border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Rocket size={14} className="stroke-[3]" />
                  <span>[ 🚀 ENTER FOUNDER COCKPIT (AI ARMED) ]</span>
                </button>

                <Link
                  to="/ide"
                  className="p-3.5 bg-[#CCFF00] hover:bg-[#FFDE59] text-black font-black text-xs uppercase border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Terminal size={14} className="stroke-[3]" />
                  <span>[ ⚡ BUILD IN HYPERS IDE ]</span>
                </Link>

                <Link
                  to="/explore"
                  className="p-3.5 bg-white hover:bg-neutral-100 text-black font-black text-xs uppercase border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Globe size={14} className="stroke-[3]" />
                  <span>[ 🧭 BROWSE RADAR ]</span>
                </Link>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>

    </div>
  );
}
