import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Video, VideoOff, Play, Pause, RotateCcw,
  CheckCircle2, AlertTriangle, Flame, Target, Rocket, Swords,
  BarChart3, Award, MessageSquare, ChevronRight, Volume2,
  Clock, ArrowRight, Shield, ShieldAlert, Sparkles, Copy, Check,
  Radio, User, ThumbsUp, ThumbsDown, Eye, Activity, RefreshCw, Bot
} from 'lucide-react';
import { getAiConfig, callConnectedAi, parseAiJson, getUserCompanyData } from '../utils/aiConfig';

// ═══════════════════════════════════════════════════════════════════════════
// INVESTOR ARCHETYPES & TAILORED INTERROGATION QUESTION BANKS
// ═══════════════════════════════════════════════════════════════════════════

const INVESTOR_ARCHETYPES = {
  yc: {
    id: 'yc',
    name: 'Y Combinator (YC)',
    partnerName: 'Michael & Garry (YC Group Partner)',
    tagline: '10-Minute Rapid-Fire Grilling. Zero Fluff, 100% Brevity & Growth.',
    color: 'bg-[#FF5722]',
    borderColor: 'border-[#FF5722]',
    badgeColor: 'bg-[#FF5722] text-white',
    icon: Flame,
    code: 'YC-BATCH',
    avatarEmoji: '⚡',
    description: 'Blunt, impatient, and allergic to buzzwords. They interrupt long preambles and demand to know exact user numbers, retention, and what you shipped yesterday.',
    evaluationFocus: 'Clarity, Organic Retention, Customer Discovery Truths, Speed of Shipping.',
    targetAnswerSeconds: 45,
    questions: [
      {
        id: 'yc-1',
        category: 'Problem & Value Prop',
        text: 'What do you do in one clear, concise sentence without using a single marketing buzzword?',
        contextTip: 'Do not say "disrupting", "all-in-one", or "next-gen". State the exact user and the concrete problem.',
        evaluationCriteria: ['Clear subject and verb', 'No corporate fluff', 'Identifies exact end-user'],
        sampleGoodAnswer: 'We build an automated dashboard that syncs with SMB accounting systems to calculate Scope 1-3 carbon emissions in 30 seconds instead of hiring expensive ESG consultants.',
        partnerRebuttal: 'Good. Simple and direct. Now convince me people are actually in pain.'
      },
      {
        id: 'yc-2',
        category: 'Customer Discovery & Validation',
        text: 'Talk to me about the last user who paid you. How did you find them, what was their alternative, and why did they give you cash?',
        contextTip: 'Give specific names, dates, and numbers. YC hates theoretical customer profiles.',
        evaluationCriteria: ['Specific customer story', 'Real transaction details', 'Clear why-buy rationale'],
        sampleGoodAnswer: 'Last Tuesday, Apex Logistics signed a $1,200 monthly pilot. I cold-messaged their VP of Ops on LinkedIn because a new EU supply chain directive takes effect next month. Their alternative was paying a Big-4 auditor $45k.',
        partnerRebuttal: 'That is real customer pull. Cold outbound converting into $1.2k/mo pilots is what we look for.'
      },
      {
        id: 'yc-3',
        category: 'Traction & Retention',
        text: 'How many active users used your product last week vs 4 weeks ago, and what percentage returned on Day 30?',
        contextTip: 'If your retention curves aren’t flattening horizontally, you are filling a leaky bucket.',
        evaluationCriteria: ['Direct active user metrics', 'Cohort retention honesty', 'Week-over-week velocity'],
        sampleGoodAnswer: 'We had 24 active weekly users last week compared to 11 four weeks ago. Our Day-30 retention across the initial cohort is 58%, primarily driven by our automated weekly compliance alert.',
        partnerRebuttal: '58% Day-30 retention is strong for B2B. Keep your focus entirely on that core cohort.'
      },
      {
        id: 'yc-4',
        category: 'Counter-Intuitive Insight',
        text: 'What is the counter-intuitive insight you learned from your users that nobody else in this market understands?',
        contextTip: 'Tell us something true that almost nobody agrees with you on.',
        evaluationCriteria: ['Deep domain discovery', 'Unique non-obvious learning', 'Market edge'],
        sampleGoodAnswer: 'Everyone assumes SMBs care about climate saving; they don’t. They only care about avoiding regulatory fines and meeting supplier questionnaires from enterprise clients like Walmart who require carbon disclosures.',
        partnerRebuttal: 'Spot on. Selling fear of supplier disqualification is 10x more urgent than selling sustainability.'
      },
      {
        id: 'yc-5',
        category: 'Execution Speed',
        text: 'If we fund you today, what is the single biggest bottleneck preventing you from growing 10% week-over-week?',
        contextTip: 'Do not say "marketing budget". YC wants founders who execute relentlessly.',
        evaluationCriteria: ['Specific operational bottleneck', 'No generic excuses', 'Decisive execution plan'],
        sampleGoodAnswer: 'Our bottleneck is ERP integration onboarding time. It currently takes 48 hours of manual data mapping. We are shipping an automated Zapier and QuickBooks connector this Friday to cut it to 8 minutes.',
        partnerRebuttal: 'Excellent. Fix that connector and launch publicly by next Monday.'
      }
    ]
  },

  shark_tank: {
    id: 'shark_tank',
    name: 'Shark Tank',
    partnerName: 'Kevin & Mark (The Tank)',
    tagline: 'Brutal Commercial Valuation, Gross Margins, Royalties & Scalability.',
    color: 'bg-[#FF52D9]',
    borderColor: 'border-[#FF52D9]',
    badgeColor: 'bg-[#FF52D9] text-black',
    icon: Swords,
    code: 'SHARK-TANK',
    avatarEmoji: '🦈',
    description: 'Valuation hawks, mass-market scrutiny, and merciless negotiation. They attack unproven valuations, low gross margins, and copycat competitors who could squash you.',
    evaluationFocus: 'Gross Margin %, CAC vs LTV, Valuation Justification, Retail/Distribution Scale.',
    targetAnswerSeconds: 60,
    questions: [
      {
        id: 'st-1',
        category: 'Valuation & Sales',
        text: 'You are asking for $1.5M for 15% ($10M valuation). What are your exact trailing-12-month sales, what will you net this year, and why shouldn’t I offer you a royalty of $2 per account until I recoup my capital?',
        contextTip: 'Kevin O\'Leary will crush you if you defend an astronomical valuation with zero revenue.',
        evaluationCriteria: ['Accurate sales numbers', 'Gross vs Net margin awareness', 'Handling the royalty counter'],
        sampleGoodAnswer: 'In the last 6 months, we closed $110,000 in contracted ARR with $18,400 MRR currently. Our gross margin is 84%. A royalty would starve our working capital while we have an 18-month lead on this regulatory shift.',
        partnerRebuttal: '84% gross margins are music to my ears. But $10M is still rich—you need to prove customer stickiness.'
      },
      {
        id: 'st-2',
        category: 'Customer Acquisition (CAC vs LTV)',
        text: 'What does it cost you to acquire a customer (CAC), what do they pay you over their lifetime (LTV), and how long until you break even on marketing spend?',
        contextTip: 'Mark Cuban wants to see if you actually know unit economics or are just burning money on Google Ads.',
        evaluationCriteria: ['LTV:CAC ratio > 3:1', 'CAC payback period < 8 months', 'Channel scalability'],
        sampleGoodAnswer: 'Our blended CAC is $420 via direct outbound and industry association webinars. Our average ACV is $4,800 with a 3-year expected LTV of $14,400. That gives us a 34:1 LTV-to-CAC with payback under 2 months.',
        partnerRebuttal: 'Those unit economics are spectacular if true. How big is the universe of those buyers?'
      },
      {
        id: 'st-3',
        category: 'Squash-Like-a-Bug Defense',
        text: 'What stops a massive player with billions in cash and existing distribution from copying your software overnight and crushing you like a cockroach?',
        contextTip: 'Never say "they are too big and slow". Point to proprietary IP, workflow lock-in, or speed.',
        evaluationCriteria: ['Structural defensibility', 'Customer data gravity', 'Speed and focus'],
        sampleGoodAnswer: 'Legacy ERPs are built on rigid 20-year-old databases that charge $200k for custom consulting modules. We deploy in 15 minutes with sub-second carbon factor calculations. By the time they draft a product roadmap, we will own 10,000 SMB accounts.',
        partnerRebuttal: 'I love founders that attack legacy dinosaurs. But you better run like your pants are on fire.'
      },
      {
        id: 'st-4',
        category: 'Use of Funds & Inventory',
        text: 'If I write you a check right now, what does every single penny of my $1.5 million go toward?',
        contextTip: 'Sharks hate paying for founder vanity or indefinite R&D without sales return.',
        evaluationCriteria: ['Clear capital allocation', 'Revenue-generating expenditure', 'Runway extension'],
        sampleGoodAnswer: '$900,000 goes to scaling our 4-person outbound sales engine to close 250 enterprise SMB accounts. $400,000 goes to 2 senior backend engineers to automate ERP ingestion. $200,000 is our cash safety reserve.',
        partnerRebuttal: 'Clear, disciplined capital allocation. That’s how a real operator thinks.'
      }
    ]
  },

  indian_vc: {
    id: 'indian_vc',
    name: 'Indian VCs (Peak XV / Accel / Blume)',
    partnerName: 'Shailendra & Prashanth (Managing Partner)',
    tagline: 'Frugal Unit Economics, Price Sensitivity, Contribution Margin & Cash Cycle.',
    color: 'bg-[#FFDE59]',
    borderColor: 'border-[#FFDE59]',
    badgeColor: 'bg-[#FFDE59] text-black',
    icon: BarChart3,
    code: 'IND-VC',
    avatarEmoji: '🇮🇳',
    description: 'Hyper-focused on frugal unit economics, navigating price-sensitive buyers, long sales cycles, collection days (DSO), and building an EBITDA-positive cash engine.',
    evaluationFocus: 'Contribution Margin 2 (CM2), Collections/DSO, Cheap Labor Displacement, Long Sales Cycles.',
    targetAnswerSeconds: 60,
    questions: [
      {
        id: 'ind-1',
        category: 'Price Sensitivity & Willingness to Pay',
        text: 'Customers in price-sensitive markets are notoriously reluctant to pay software subscription fees. How are you ensuring they don’t churn the moment initial promotional pricing expires?',
        contextTip: 'Indian VCs know free trials mean nothing. Address hard collections and mission-critical ROI.',
        evaluationCriteria: ['Direct monetization proof', 'ROI justification > 10x', 'Contract lock-in'],
        sampleGoodAnswer: 'We do not sell "nice-to-have" analytics; we sell mandatory audit readiness. If an exporter fails carbon compliance, their European shipments get impounded at customs. Paying us ₹25,000/month protects ₹5 Crore of overseas export revenues.',
        partnerRebuttal: 'Tying it directly to export customs clearance is smart. That makes it non-discretionary spend.'
      },
      {
        id: 'ind-2',
        category: 'Unit Economics & CM2',
        text: 'Break down your Contribution Margin 2 (CM2). After accounting for LLM API costs, server compute, sales commissions, and manual onboarding support, what is left over?',
        contextTip: 'Indian VCs hate hidden operational drag that erodes gross margins.',
        evaluationCriteria: ['Clear COGS breakdown', 'CM2 > 65%', 'Low manual onboarding costs'],
        sampleGoodAnswer: 'Our software pricing is ₹35,000/mo. Hosting and AI compute cost ₹2,800. Onboarding automation costs ₹1,500. Sales commission amortizes to ₹3,500. That leaves a clean CM2 of ₹27,200, or 77.7% margin.',
        partnerRebuttal: '77% CM2 is very solid. Make sure compute costs do not spike as clients upload larger datasets.'
      },
      {
        id: 'ind-3',
        category: 'Software vs Cheap Labor',
        text: 'In our market, companies can hire 2 junior accountants for ₹30,000 a month to maintain manual spreadsheets. Why will a traditional promoter buy your software instead of hiring people?',
        contextTip: 'This is the most common reason B2B software dies in India. Prove speed, accuracy, and audit risk.',
        evaluationCriteria: ['Human error penalty', 'Speed difference', 'Institutional compliance requirement'],
        sampleGoodAnswer: 'Manual spreadsheets have an 18% error rate that triggers automated audit flags and penalties from European buyers. Furthermore, doing it manually takes 3 weeks per quarter; our tool does it continuously in real-time.',
        partnerRebuttal: 'Right. Promoter businesses care about audit liability and speed when dealing with Western buyers.'
      },
      {
        id: 'ind-4',
        category: 'Path to Profitability (EBITDA)',
        text: 'If the funding winter deepens and you cannot raise follow-on capital for 24 months, how does this company reach Default Alive and operational break-even?',
        contextTip: 'Demonstrate that you do not rely on endless VC subsidies to survive.',
        evaluationCriteria: ['Default alive timeline', 'Cash burn discipline', 'Customer revenue covers burn'],
        sampleGoodAnswer: 'Our monthly net burn is capped at $14,500 with 14 months of cash in bank. At our current growth rate of 4 new enterprise accounts per month, our recurring revenue crosses our burn line in 7 months, achieving Default Alive status without another dime.',
        partnerRebuttal: 'That is the discipline Indian VCs respect. You own your destiny.'
      }
    ]
  },

  sequoia: {
    id: 'sequoia',
    name: 'Sequoia Capital',
    partnerName: 'Doug & Roelof (Senior Partner)',
    tagline: 'Massive $10B+ TAM, Structural Inflections, Outlier Founder DNA.',
    color: 'bg-[#CCFF00]',
    borderColor: 'border-[#CCFF00]',
    badgeColor: 'bg-[#CCFF00] text-black',
    icon: Target,
    code: 'SEQ-GLOBAL',
    avatarEmoji: '🌲',
    description: 'Looking for generational franchise companies. They interrogate the "Why Now?", the depth of category-king moats, and whether you have the ambition to build a $10B public powerhouse.',
    evaluationFocus: 'Why Now inflection, Network Effects, Category King Dynamics, 10-Year Public Vision.',
    targetAnswerSeconds: 60,
    questions: [
      {
        id: 'seq-1',
        category: 'Why Now? (Structural Inflection)',
        text: 'Why now? What fundamental change in technology, regulation, or human behavior occurred in the last 18 months that makes your company possible today, when it would have failed 5 years ago?',
        contextTip: 'Sequoia does not fund incremental ideas. They fund businesses born from tectonic shifts.',
        evaluationCriteria: ['Tectonic shift identified', 'Regulatory or tech catalyst', 'Timing precision'],
        sampleGoodAnswer: 'Two inflections hit simultaneously: 1) The EU Corporate Sustainability Due Diligence Directive mandated Scope 3 reporting for global supply chains starting this year; 2) LLM document parsing matured enough to extract unstructured invoice data with 99.4% precision.',
        partnerRebuttal: 'Compelling timing thesis. The convergence of strict regulatory penalties and LLM vision is real.'
      },
      {
        id: 'seq-2',
        category: 'Category King & Defensibility',
        text: 'Category Kings capture 76% of the total profit pool in venture-backed markets. How does Customer 1,000 receive a fundamentally superior experience because Customers 1 through 999 already use the platform?',
        contextTip: 'Show data network effects or ecosystem dominance.',
        evaluationCriteria: ['Compound data network effect', 'Increasing returns to scale', 'Ecosystem lock-in'],
        sampleGoodAnswer: 'Every customer that connects to our platform embeds our telemetry directly into their primary workflows. As more users join, cross-organizational intelligence compounds instantly without manual overhead. We become the proprietary system of record for this operational data.',
        partnerRebuttal: 'That is a true data network effect. Once you own the graph, nobody can displace you.'
      },
      {
        id: 'seq-3',
        category: 'Competitor Rebuttal',
        text: 'Walk me through your most sophisticated competitor’s best argument against you. If their CEO were in this room, what would they tell me is your fatal weakness?',
        contextTip: 'Intellectual honesty is the #1 trait Sequoia looks for in world-class founders.',
        evaluationCriteria: ['Deep competitive insight', 'Intellectual honesty', 'Strategic counter-positioning'],
        sampleGoodAnswer: 'They would say enterprise SAP and Workiva have existing enterprise procurement relationships and will bundle carbon modules for free. Our counter-positioning is speed: their modules take 9 months to deploy and cost $150k, while ours is live in 15 minutes at 1/10th the cost.',
        partnerRebuttal: 'Great self-awareness. Counter-positioning against heavy enterprise inertia is the classic playbook.'
      }
    ]
  },

  a16z: {
    id: 'a16z',
    name: 'a16z (Andreessen Horowitz)',
    partnerName: 'Marc & Ben (General Partner)',
    tagline: 'Software Eats the World, Technical Depth & Distribution Weaponization.',
    color: 'bg-[#00F0FF]',
    borderColor: 'border-[#00F0FF]',
    badgeColor: 'bg-[#00F0FF] text-black',
    icon: Rocket,
    code: 'A16Z-TECH',
    avatarEmoji: '🚀',
    description: 'Obsessed with proprietary technical architecture, unfair distribution loops, founder-as-chief-architect, and weaponized go-to-market strategies.',
    evaluationFocus: 'Architectural Moat, Platform Risk Defense, Distribution Advantage, Engineering Muscle.',
    targetAnswerSeconds: 60,
    questions: [
      {
        id: 'a16z-1',
        category: 'Technical Architecture & Wrapper Defense',
        text: 'Is your product merely a thin wrapper around OpenAI and Claude APIs, or have you architected proprietary data pipelines and fine-tuned models that you control?',
        contextTip: 'a16z will not fund API wrappers with zero technical depth.',
        evaluationCriteria: ['Proprietary pipeline depth', 'Local state/vector ownership', 'Defensibility against base models'],
        sampleGoodAnswer: 'We run our own proprietary multi-modal OCR ingestion pipeline that extracts tabular energy data from messy PDF invoices and maps them against localized grid emission databases. The LLM is merely one parsing node in an end-to-end deterministic ledger.',
        partnerRebuttal: 'Good. An end-to-end deterministic ledger with localized grid embeddings is defensible software.'
      },
      {
        id: 'a16z-2',
        category: 'Unfair Distribution Loop',
        text: 'Peter Thiel says poor distribution is the #1 cause of startup failure. What is your unfair distribution loop that allows you to out-distribute legacy incumbents before they out-innovate your product?',
        contextTip: 'Having a great product is not a GTM strategy. How do you acquire customers at scale?',
        evaluationCriteria: ['Viral or programmatic loop', 'Partner/ecosystem distribution', 'Low friction adoption'],
        sampleGoodAnswer: 'Every tier-1 enterprise on our platform invites an average of 42 supply chain vendors to verify emissions for free. 18% of those invited vendors upgrade to our paid tier within 30 days to generate compliant reports for their other clients.',
        partnerRebuttal: 'A built-in B2B supplier invitation loop! That creates a compounding distribution flywheel.'
      }
    ]
  }
};

export default function InvestorInterviewSimulator({ companyData }) {
  // State
  const [selectedStyleId, setSelectedStyleId] = useState('yc');
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // Media State
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isMicActive, setIsMicActive] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [speechStatus, setSpeechStatus] = useState('');
  const [audioMeter, setAudioMeter] = useState(25);
  const [hasCameraError, setHasCameraError] = useState(false);
  const [liveAnswerText, setLiveAnswerText] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Behavioral Telemetry State
  const [telemetry, setTelemetry] = useState({
    eyeContactPct: 88,
    composureScore: 92,
    wordsSpoken: 0,
    wpm: 135,
    fillerWordsCount: 1,
    voiceConfidence: 89
  });

  // Completed Q&A Records and Results
  const [interviewTranscript, setInterviewTranscript] = useState([]);
  const [results, setResults] = useState(null);
  const [partnerReactionBubble, setPartnerReactionBubble] = useState('');
  const [isEvaluatingAnswer, setIsEvaluatingAnswer] = useState(false);
  const [copiedTranscript, setCopiedTranscript] = useState(false);

  // DOM Refs
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);
  const recognitionRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const activeArchetype = INVESTOR_ARCHETYPES[selectedStyleId] || INVESTOR_ARCHETYPES.yc;
  const currentQuestion = activeArchetype.questions[currentQuestionIdx] || activeArchetype.questions[0];

  // ═════════════════════════════════════════════════════════════════════════
  // WEBCAM & AUDIO CAPTURE SETUP
  // ═════════════════════════════════════════════════════════════════════════

  useEffect(() => {
    let active = true;

    async function initMedia() {
      if (!isCameraActive && !isMicActive) {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(t => t.stop());
          streamRef.current = null;
        }
        if (videoRef.current) videoRef.current.srcObject = null;
        return;
      }

      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: isCameraActive,
            audio: isMicActive
          });

          if (!active) {
            stream.getTracks().forEach(t => t.stop());
            return;
          }

          streamRef.current = stream;
          setHasCameraError(false);

          if (videoRef.current && isCameraActive) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(() => { });
          }

          // Audio VU Decibel Meter
          if (isMicActive && (window.AudioContext || window.webkitAudioContext)) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioCtx();
            const source = audioCtx.createMediaStreamSource(stream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 64;
            source.connect(analyser);

            audioContextRef.current = audioCtx;
            analyserRef.current = analyser;

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const updateMeter = () => {
              if (!analyserRef.current) return;
              analyserRef.current.getByteFrequencyData(dataArray);
              let sum = 0;
              for (let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
              }
              const average = sum / bufferLength;
              const mapped = Math.min(100, Math.max(10, Math.round((average / 128) * 100)));
              setAudioMeter(mapped);
              animFrameRef.current = requestAnimationFrame(updateMeter);
            };

            updateMeter();
          }
        }
      } catch (err) {
        console.warn('Media devices could not be accessed:', err);
        setHasCameraError(true);
      }
    }

    initMedia();

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try { audioContextRef.current.close(); } catch (e) { }
      }
    };
  }, [isCameraActive, isMicActive]);

  // ═════════════════════════════════════════════════════════════════════════
  // SPEECH RECOGNITION (VOICE-TO-TEXT DICTATION)
  // ═════════════════════════════════════════════════════════════════════════

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechStatus('Listening to your pitch...');
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setLiveAnswerText(prev => (prev ? prev + ' ' : '') + transcript.trim());
          // Update live telemetry
          const words = transcript.trim().split(/\s+/).length;
          setTelemetry(prev => ({
            ...prev,
            wordsSpoken: prev.wordsSpoken + words,
            voiceConfidence: Math.min(98, Math.max(75, 80 + Math.round(Math.random() * 15)))
          }));
        }
      };

      recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err);
        setSpeechStatus('Voice error: ' + (err.error || 'try typing or test button'));
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) { }
      }
    };
  }, []);

  const toggleVoiceRecording = () => {
    if (!recognitionRef.current) {
      // Fallback: Fill simulated spoken answer if Web Speech is unavailable
      fillSampleAnswer();
      return;
    }

    if (isListening) {
      try { recognitionRef.current.stop(); } catch (e) { }
      setIsListening(false);
      setSpeechStatus('');
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setSpeechStatus('Recording your voice...');
      } catch (e) {
        console.warn('Could not start voice recognition:', e);
      }
    }
  };

  // Timer for active question
  useEffect(() => {
    if (isSimulating && isAnswering) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isSimulating, isAnswering]);

  // Start Simulation
  const startSimulation = (styleId) => {
    setSelectedStyleId(styleId);
    setIsSimulating(true);
    setCurrentQuestionIdx(0);
    setResults(null);
    setInterviewTranscript([]);
    setLiveAnswerText('');
    setTimerSeconds(0);
    setIsAnswering(true);
    setPartnerReactionBubble('Listening closely to your opening answer...');
  };

  // Fill Sample Voice Answer
  const fillSampleAnswer = () => {
    setLiveAnswerText(currentQuestion.sampleGoodAnswer);
    setTelemetry(prev => ({
      ...prev,
      wordsSpoken: prev.wordsSpoken + currentQuestion.sampleGoodAnswer.split(' ').length,
      voiceConfidence: 94
    }));
  };

  // Submit Answer and Trigger Partner Reaction / Advance
  const submitAnswer = async () => {
    if (isListening && recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) { }
      setIsListening(false);
    }

    setIsEvaluatingAnswer(true);
    setIsAnswering(false);

    const answeredText = liveAnswerText.trim() || "(Founder responded briefly without providing specific metrics or traction proof)";
    const wordCount = answeredText.split(/\s+/).filter(Boolean).length;

    const comp = companyData || getUserCompanyData() || {
      name: 'VentureScale AI',
      problem: 'Operational bottlenecks',
      solution: 'AI workflow runtime',
      targetAudience: 'Software engineering leaders',
      stage: 'Pre-Seed',
      mrr: '$18,400'
    };

    // Evaluate answer quality based on length, keywords, and archetype
    let qualityScore = Math.min(95, Math.max(55, 60 + Math.min(30, Math.round(wordCount * 0.8))));
    let feedbackType = qualityScore >= 75 ? 'positive' : 'negative';
    let partnerComment = currentQuestion.partnerRebuttal;

    if (wordCount < 10) {
      qualityScore = 45;
      feedbackType = 'negative';
      partnerComment = "That was way too vague. You need to give concrete numbers and names, not hand-waving.";
    }

    // Call connected AI if key is present
    const aiCfg = getAiConfig();
    let isAiEvaluated = false;
    if (aiCfg && aiCfg.apiKey && wordCount >= 3) {
      try {
        const sysPrompt = `You are roleplaying as ${activeArchetype.partnerName} (${activeArchetype.name}) interviewing a founder.
Interrogation tone: ${activeArchetype.description}
Evaluation focus: ${activeArchetype.evaluationFocus}

Founder's Startup Context:
Name: ${comp.name}
Problem: ${comp.problem}
Solution: ${comp.solution}
Target Customer: ${comp.targetAudience || comp.targetBuyer || 'Enterprise'}
Stage: ${comp.stage || 'Pre-Seed'}
MRR/Traction: ${comp.mrr || 'Early Stage'}

You just asked: "${currentQuestion.text}"
Category: "${currentQuestion.category}"
Target answer criteria: ${currentQuestion.evaluationCriteria.join(', ')}

Evaluate the founder's answer ruthlessly and in character.
Return JSON:
{
  "qualityScore": 82,
  "partnerComment": "1-2 sentence spoken reaction in character, critiquing or validating their specific answer about their company.",
  "feedbackType": "positive"
}`;

        const raw = await callConnectedAi({
          systemPrompt: sysPrompt,
          userPrompt: `FOUNDER'S ANSWER: "${answeredText}"`,
          temperature: 0.3,
          jsonMode: true
        });

        const parsed = parseAiJson(raw);
        if (parsed && typeof parsed.qualityScore === 'number') {
          qualityScore = parsed.qualityScore;
          if (parsed.partnerComment) partnerComment = parsed.partnerComment;
          if (parsed.feedbackType) feedbackType = parsed.feedbackType;
          isAiEvaluated = true;
        }
      } catch (err) {
        console.warn('Connected AI interview evaluation error:', err);
      }
    }

    const recordedItem = {
      questionIdx: currentQuestionIdx,
      question: currentQuestion.text,
      category: currentQuestion.category,
      answer: answeredText,
      durationSeconds: timerSeconds,
      qualityScore,
      feedbackType,
      partnerComment,
      idealAnswer: currentQuestion.sampleGoodAnswer,
      isAiEvaluated
    };

    const updatedTranscript = [...interviewTranscript, recordedItem];
    setInterviewTranscript(updatedTranscript);
    setPartnerReactionBubble(`"${partnerComment}"`);

    // Advance to next question after a realistic pause or finish interview
    setTimeout(() => {
      setIsEvaluatingAnswer(false);
      if (currentQuestionIdx + 1 < activeArchetype.questions.length) {
        setCurrentQuestionIdx(prev => prev + 1);
        setLiveAnswerText('');
        setTimerSeconds(0);
        setIsAnswering(true);
        setPartnerReactionBubble('Waiting for your response to the next question...');
      } else {
        // Finalize results
        finishInterview(updatedTranscript);
      }
    }, 1800);
  };

  // Finalize Debrief & Results
  const finishInterview = (finalTranscript) => {
    setIsSimulating(false);

    const comp = companyData || getUserCompanyData() || {
      name: 'VentureScale AI'
    };

    const avgScore = Math.round(
      finalTranscript.reduce((acc, curr) => acc + curr.qualityScore, 0) / Math.max(1, finalTranscript.length)
    );

    let verdictBadge = 'TERMSHEET CONTINGENT';
    let verdictDecision = `The partners see immense potential in ${comp.name} but need verified cohort data before wiring capital.`;
    let termSheetOffer = '$1.5M for 15% ($10M Post-Money Valuation)';

    if (avgScore >= 82) {
      verdictBadge = activeArchetype.id === 'yc' ? 'INVITED TO YC BATCH' :
        activeArchetype.id === 'shark_tank' ? 'DEAL ACCEPTED BY SHARKS' :
          activeArchetype.id === 'indian_vc' ? 'TERM SHEET ISSUED (PEAK XV)' :
            'LEAD TERM SHEET DELIVERED';
      verdictDecision = `The investment committee unanimously endorsed ${comp.name}. Exceptional metric recall, concise communication, and strong commercial conviction.`;
      termSheetOffer = activeArchetype.id === 'shark_tank' ? '$1.5M for 12% + Zero Royalty' : '$2.0M Lead Investment at $14M Post';
    } else if (avgScore < 65) {
      verdictBadge = 'PASS / REJECTED';
      verdictDecision = `The partners passed on ${comp.name} due to fumbled defensibility and unconvincing unit economics. Rebuttal preparation required.`;
      termSheetOffer = 'No Term Sheet Offered (Re-apply in 90 days)';
    }

    setResults({
      avgScore,
      verdictBadge,
      verdictDecision,
      termSheetOffer,
      transcript: finalTranscript,
      scores: {
        clarity: Math.min(100, avgScore + 5),
        tractionConviction: avgScore,
        defensibility: Math.max(40, avgScore - 8),
        confidenceUnderPressure: telemetry.composureScore,
        thinkingSpeed: Math.min(95, Math.max(60, 100 - timerSeconds * 2))
      }
    });
  };

  // Copy Transcript & Scorecard
  const copyInterviewNotes = () => {
    if (!results) return;
    let memo = `====================================================\n`;
    memo += `INVESTOR INTERVIEW DEBRIEF: ${activeArchetype.name.toUpperCase()}\n`;
    memo += `OVERALL SCORE: ${results.avgScore}/100 [${results.verdictBadge}]\n`;
    memo += `DECISION: ${results.verdictDecision}\n`;
    memo += `TERMSHEET: ${results.termSheetOffer}\n`;
    memo += `====================================================\n\n`;

    results.transcript.forEach((t, i) => {
      memo += `[QUESTION ${i + 1} - ${t.category}]\n`;
      memo += `Q: "${t.question}"\n`;
      memo += `A: "${t.answer}"\n`;
      memo += `PARTNER VERDICT: ${t.partnerComment} (Score: ${t.qualityScore}/100)\n\n`;
    });

    navigator.clipboard?.writeText(memo);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 2000);
  };

  // ═════════════════════════════════════════════════════════════════════════
  // RENDER: RESULTS & DEBRIEF SCREEN
  // ═════════════════════════════════════════════════════════════════════════

  if (results) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 font-mono select-none">

        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 border border-black text-[10px] font-black uppercase ${activeArchetype.badgeColor}`}>
                {activeArchetype.name} DEBRIEF
              </span>
              <span className="text-[10px] font-black uppercase text-neutral-500">
                // COMPLETED INTERROGATION
              </span>
            </div>
            <h2 className="text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2">
              <Award size={22} className="stroke-[2.5]" />
              {companyData?.name || getUserCompanyData()?.name || 'Your Venture'} — Partner Committee Verdict
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyInterviewNotes}
              className="px-3.5 py-2 bg-white hover:bg-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              {copiedTranscript ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copiedTranscript ? 'COPIED!' : 'EXPORT DEBRIEF'}</span>
            </button>

            <button
              onClick={() => setResults(null)}
              className="flex items-center gap-1.5 px-4 py-2 bg-black text-[#FFDE59] hover:bg-[#FFDE59] hover:text-black border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              <RotateCcw size={14} className="stroke-[2.5]" />
              <span>[ ↺ RETRY WITH ANOTHER VC ]</span>
            </button>
          </div>
        </div>

        {/* Hero Verdict Banner */}
        <div className="bg-black text-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000] relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

            {/* Score & Verdict */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00] text-black border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#FFF]">
                <Shield size={14} /> {results.verdictBadge}
              </div>

              <div className="flex items-baseline gap-4">
                <div className="text-6xl sm:text-7xl font-black text-[#CCFF00] tracking-tighter">
                  {results.avgScore}
                  <span className="text-2xl sm:text-3xl text-white/50 font-black">/100</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#FFDE59] uppercase">
                  {results.avgScore >= 80 ? 'HIGH CONVICTION' : results.avgScore >= 65 ? 'CONDITIONAL' : 'PASSED'}
                </div>
              </div>

              <p className="text-xs sm:text-sm font-bold text-white/90 uppercase leading-relaxed border-l-3 border-[#00F0FF] pl-3">
                "{results.verdictDecision}"
              </p>

              <div className="text-xs font-black text-white/70 uppercase">
                // PARTNER TERM SHEET OFFER: <strong className="text-[#CCFF00]">{results.termSheetOffer}</strong>
              </div>
            </div>

            {/* Performance Vector Bars */}
            <div className="md:col-span-5 bg-zinc-950 border-3 border-white p-4 space-y-3 shadow-[4px_4px_0px_#FFF]">
              <div className="text-[11px] font-black uppercase text-white/70 border-b border-white/20 pb-1 flex justify-between">
                <span>5 AUDITED PERFORMANCE VECTORS</span>
                <span className="text-[#CCFF00]">SCORE</span>
              </div>

              {[
                { label: 'Clarity & Brevity', score: results.scores.clarity, color: 'bg-[#00F0FF]' },
                { label: 'Traction Conviction', score: results.scores.tractionConviction, color: 'bg-[#CCFF00]' },
                { label: 'Defensibility & Moat Depth', score: results.scores.defensibility, color: 'bg-[#FFDE59]' },
                { label: 'Confidence Under Pressure', score: results.scores.confidenceUnderPressure, color: 'bg-[#FF52D9]' },
                { label: 'Thinking Speed', score: results.scores.thinkingSpeed, color: 'bg-white' }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-black uppercase text-white">
                    <span>{stat.label}</span>
                    <span>{stat.score}/100</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 border border-white/40 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${stat.score}%` }} className={`h-full ${stat.color}`} />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Question-by-Question Deep Dive */}
        <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000]">
          <div className="flex justify-between items-center border-b-3 border-black pb-3 mb-6">
            <h3 className="text-base font-black uppercase text-black flex items-center gap-2">
              <MessageSquare size={18} className="stroke-[2.5]" />
              QUESTION-BY-QUESTION TRANSCRIPT & PARTNER REBUTTAL
            </h3>
            <span className="text-[10px] font-black uppercase bg-[#FAF8F5] border border-black px-2.5 py-0.5">
              {results.transcript.length} QUESTIONS AUDITED
            </span>
          </div>

          <div className="space-y-5">
            {results.transcript.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 border-3 border-black shadow-[4px_4px_0px_#000] ${item.feedbackType === 'positive' ? 'bg-[#FAF8F5]' : 'bg-[#FFF0F0]'
                  }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-black/20">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs font-black">
                      {idx + 1}
                    </span>
                    <span className="font-black text-xs uppercase text-black">
                      [{item.category}]
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 border border-black text-[10px] font-black uppercase ${item.feedbackType === 'positive' ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                    }`}>
                    {item.feedbackType === 'positive' ? '✓ REPUTABLE VALIDATION' : '! REBUTTAL FUMBLED'} ({item.qualityScore}/100)
                  </span>
                </div>

                <div className="mb-3">
                  <div className="text-[10px] font-black text-neutral-500 uppercase">// INVESTOR QUESTION:</div>
                  <h4 className="text-sm font-black uppercase text-black mt-0.5">"{item.question}"</h4>
                </div>

                <div className="mb-3 bg-white border border-black p-3 text-xs font-bold text-neutral-800">
                  <div className="text-[10px] font-black text-neutral-500 uppercase mb-1">// YOUR SPOKEN ANSWER:</div>
                  <p className="leading-relaxed">"{item.answer}"</p>
                </div>

                <div className="bg-[#FAF8F5] border-2 border-black p-3 text-xs font-bold text-black space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-[#FF5722]">
                    <span>{activeArchetype.avatarEmoji}</span>
                    <span>PARTNER REACTION:</span>
                  </div>
                  <p className="italic">"{item.partnerComment}"</p>
                </div>

                <div className="mt-3 pt-2 border-t border-black/10 text-[11px] font-bold text-neutral-700">
                  <strong className="text-black uppercase">IDEAL HIGH-CONVICTION BENCHMARK:</strong>
                  <p className="mt-0.5 text-neutral-600 italic leading-relaxed">"{item.idealAnswer}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // RENDER: ACTIVE INTERACTIVE SIMULATION WITH AUDIO / VIDEO
  // ═════════════════════════════════════════════════════════════════════════

  if (isSimulating) {
    return (
      <div className="max-w-6xl mx-auto py-4 font-mono select-none space-y-6">

        {/* Top Active Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-black text-white border-4 border-black p-4 shadow-[6px_6px_0px_#000]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-[#FF0033] border border-white animate-pulse" />
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-[#FFDE59]">
                LIVE INTERROGATION: {activeArchetype.name.toUpperCase()}
              </div>
              <div className="text-[10px] font-bold text-white/60 uppercase">
                {activeArchetype.partnerName} · TARGET: &lt; {activeArchetype.targetAnswerSeconds} SECONDS / RESPONSE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-black uppercase">
            <div className="bg-zinc-900 border border-white px-3 py-1 flex items-center gap-2">
              <Clock size={14} className="text-[#00F0FF]" />
              <span>{Math.floor(timerSeconds / 60)}:{String(timerSeconds % 60).padStart(2, '0')}</span>
            </div>
            <button
              onClick={() => {
                if (window.confirm("Abort this interview and return to style selection?")) {
                  setIsSimulating(false);
                }
              }}
              className="bg-[#FF0033] hover:bg-red-700 text-white border border-white px-3 py-1 text-[11px] font-black uppercase"
            >
              ABORT
            </button>
          </div>
        </div>

        {/* ═══ DUAL SPLIT: INVESTOR PARTNER ON LEFT, FOUNDER AUDIO/VIDEO ON RIGHT ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* LEFT COLUMN: INVESTOR PERSONA & QUESTION CARD */}
          <div className="lg:col-span-6 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000] flex flex-col justify-between space-y-6 min-h-[500px]">
            <div>
              {/* Partner Avatar Header */}
              <div className="flex items-center justify-between border-b-3 border-black pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 border-3 border-black ${activeArchetype.color} flex items-center justify-center text-2xl shadow-[3px_3px_0px_#000] shrink-0`}>
                    {activeArchetype.avatarEmoji}
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-neutral-500">INTERVIEWING PARTNER</div>
                    <div className="text-base font-black uppercase text-black">{activeArchetype.partnerName}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="bg-black text-[#CCFF00] px-2 py-0.5 text-[10px] font-black uppercase">
                    Q {currentQuestionIdx + 1} OF {activeArchetype.questions.length}
                  </span>
                  <div className="text-[9px] font-bold text-neutral-500 uppercase mt-0.5">
                    {currentQuestion.category}
                  </div>
                </div>
              </div>

              {/* The Live Question Display */}
              <div className="space-y-4">
                <div className="text-[11px] font-black uppercase tracking-widest text-[#FF5722]">
                  // POINT-BLANK INTERROGATION:
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-black leading-tight tracking-tight">
                  "{currentQuestion.text}"
                </h3>

                <div className="bg-[#FAF8F5] border-2 border-black p-3.5 text-xs font-bold text-neutral-800 space-y-1 shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-neutral-500">
                    <Sparkles size={12} className="text-black" />
                    <span>TACTICAL GRACE NOTE (WHAT THEY ARE TESTING):</span>
                  </div>
                  <p className="leading-relaxed">{currentQuestion.contextTip}</p>
                </div>
              </div>
            </div>

            {/* Investor Live Reaction Bubble */}
            <div className="bg-[#18181b] border-3 border-black p-4 text-white shadow-[4px_4px_0px_#000]">
              <div className="flex items-center gap-2 mb-1 text-[10px] font-black uppercase text-[#00F0FF]">
                <Radio size={12} className="animate-pulse" />
                <span>PARTNER BODY LANGUAGE & THOUGHT BUBBLE:</span>
              </div>
              <p className="text-xs font-bold text-[#FFDE59] uppercase italic leading-relaxed">
                {isEvaluatingAnswer ? "Analyzing your metrics and delivery..." : partnerReactionBubble}
              </p>
            </div>

            {/* Question Progress Bar */}
            <div>
              <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                <span>Interview Completion</span>
                <span>{currentQuestionIdx + 1} / {activeArchetype.questions.length}</span>
              </div>
              <div className="w-full h-3 bg-[#FAF8F5] border-2 border-black overflow-hidden">
                <div
                  className="h-full bg-[#CCFF00] border-r-2 border-black transition-all"
                  style={{ width: `${((currentQuestionIdx + 1) / activeArchetype.questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FOUNDER AUDIO / VIDEO STREAM & REAL-TIME ANSWER STUDIO */}
          <div className="lg:col-span-6 space-y-4">

            {/* Webcam & Behavioral Vision HUD */}
            <div className="bg-black border-4 border-black p-3 shadow-[8px_8px_0px_#000] relative text-white">

              <div className="relative aspect-video w-full bg-zinc-950 border-2 border-white/60 overflow-hidden flex items-center justify-center">
                {/* Real Webcam Feed */}
                {isCameraActive && !hasCameraError ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                ) : (
                  /* Fallback Behavioral Vision Simulator Canvas */
                  <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="w-16 h-16 border-2 border-white bg-zinc-900 flex items-center justify-center text-[#CCFF00]">
                      <User size={32} />
                    </div>
                    <div className="text-xs font-black uppercase text-[#CCFF00]">
                      {hasCameraError ? 'CAMERA UNAVAILABLE (SIMULATION ACTIVE)' : 'CAMERA DISABLED'}
                    </div>
                    <p className="text-[10px] font-bold text-white/60 uppercase max-w-xs">
                      Webcam permissions blocked or inactive. Audio stream and dictation active.
                    </p>
                  </div>
                )}

                {/* Computer Vision HUD Overlays */}
                <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between">
                  <div className="flex justify-between items-start text-[10px] font-black uppercase">
                    <span className="bg-black/80 px-2 py-0.5 border border-white text-[#CCFF00] flex items-center gap-1">
                      <Radio size={10} className="animate-pulse" /> LIVE STREAM
                    </span>
                    <span className="bg-black/80 px-2 py-0.5 border border-white text-white">
                      EYE CONTACT: {telemetry.eyeContactPct}%
                    </span>
                  </div>

                  {/* Center Target Reticle */}
                  <div className="self-center w-24 h-24 border border-dashed border-white/40 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#CCFF00]" />
                  </div>

                  <div className="flex justify-between items-end text-[10px] font-black uppercase">
                    <span className="bg-black/80 px-2 py-0.5 border border-white text-[#00F0FF]">
                      COMPOSURE: {telemetry.composureScore}%
                    </span>
                    <span className="bg-black/80 px-2 py-0.5 border border-white text-white">
                      CONFIDENCE: {telemetry.voiceConfidence}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Hardware Controls & Audio Decibel Meter */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsCameraActive(!isCameraActive)}
                    className={`px-2.5 py-1 text-xs font-black uppercase border border-white flex items-center gap-1.5 transition-all ${isCameraActive ? 'bg-white text-black' : 'bg-red-600 text-white'
                      }`}
                  >
                    {isCameraActive ? <Video size={13} /> : <VideoOff size={13} />}
                    <span>{isCameraActive ? 'CAM ON' : 'CAM OFF'}</span>
                  </button>

                  <button
                    onClick={() => setIsMicActive(!isMicActive)}
                    className={`px-2.5 py-1 text-xs font-black uppercase border border-white flex items-center gap-1.5 transition-all ${isMicActive ? 'bg-white text-black' : 'bg-red-600 text-white'
                      }`}
                  >
                    {isMicActive ? <Mic size={13} /> : <MicOff size={13} />}
                    <span>{isMicActive ? 'MIC ON' : 'MIC OFF'}</span>
                  </button>
                </div>

                {/* Real-time Decibel Meter */}
                <div className="flex items-center gap-2">
                  <Volume2 size={13} className="text-[#CCFF00]" />
                  <div className="w-24 h-3 bg-zinc-900 border border-white overflow-hidden p-0.5">
                    <motion.div
                      animate={{ width: `${audioMeter}%` }}
                      transition={{ duration: 0.1 }}
                      className="h-full bg-[#CCFF00]"
                    />
                  </div>
                  <span className="text-[10px] font-black">{audioMeter} dB</span>
                </div>
              </div>

            </div>

            {/* Live Spoken Dictation / Answer Studio */}
            <div className="bg-white border-4 border-black p-5 shadow-[8px_8px_0px_#000] space-y-3">
              <div className="flex items-center justify-between border-b-2 border-black pb-2">
                <div className="flex items-center gap-2">
                  <Mic size={16} className={isListening ? "text-[#FF0033] animate-pulse" : "text-black"} />
                  <span className="text-xs font-black uppercase tracking-wider text-black">
                    YOUR VERBAL PITCH RESPONSE
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fillSampleAnswer}
                    className="bg-[#FAF8F5] hover:bg-[#CCFF00] border border-black px-2 py-0.5 text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]"
                    title="Simulate a high-conviction answer for testing"
                  >
                    TEST VOICE PRESET
                  </button>

                  <button
                    onClick={toggleVoiceRecording}
                    className={`px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 transition-all ${isListening ? 'bg-[#FF0033] text-white animate-pulse' : 'bg-[#CCFF00] text-black hover:bg-[#b8e600]'
                      }`}
                  >
                    <Radio size={12} />
                    <span>{isListening ? 'STOP RECORDING' : 'RECORD VOICE (MIC)'}</span>
                  </button>
                </div>
              </div>

              {/* Editable Dictation Text Area */}
              <div className="relative">
                <textarea
                  value={liveAnswerText}
                  onChange={(e) => setLiveAnswerText(e.target.value)}
                  placeholder={
                    isListening
                      ? "Listening to your voice... Speak clearly into your microphone..."
                      : "Click 'RECORD VOICE' and answer through your microphone, or type your answer directly here..."
                  }
                  rows={4}
                  className="w-full bg-[#FAF8F5] border-2 border-black p-3 text-xs font-bold text-black focus:bg-white focus:outline-none resize-none leading-relaxed"
                />
                {speechStatus && (
                  <div className="text-[10px] font-black text-[#FF0033] uppercase mt-1">
                    {speechStatus}
                  </div>
                )}
              </div>

              {/* Submit Answer & Advance Workflow */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <div className="text-[10px] font-black text-neutral-600 uppercase">
                  {liveAnswerText.trim() ? `${liveAnswerText.trim().split(/\s+/).length} Words Transcribed` : 'Speak into mic to transcribe'}
                </div>

                <button
                  onClick={submitAnswer}
                  disabled={isEvaluatingAnswer}
                  className="bg-black hover:bg-[#CCFF00] text-white hover:text-black border-2 border-black px-5 py-2.5 text-xs font-black uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isEvaluatingAnswer ? 'AUDITING RESPONSE...' : 'SUBMIT ANSWER & HEAR REBUTTAL ➔'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // RENDER: STYLE SELECTION & PRE-FLIGHT CHECK SCREEN
  // ═════════════════════════════════════════════════════════════════════════

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8 font-mono select-none">

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-mono font-black uppercase mb-3">
          <Mic size={14} className="stroke-[2.5]" />
          [ AUDIO-VIDEO INVESTOR INTERVIEW SIMULATOR // VOICE & WEBCAM ENABLED ]
        </div>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black mb-2">
          FACE THE <span className="bg-[#FFDE59] px-2 py-0.5 border-3 border-black inline-block shadow-[4px_4px_0px_#000]">FIRING SQUAD</span>
        </h2>
        <p className="text-xs sm:text-sm font-bold text-black/70 max-w-2xl mx-auto uppercase leading-relaxed">
          // Practice high-stakes venture capital grilling through real-time audio and video. Choose your investor archetype, speak your answers into the mic, and test your conviction against brutal partner rebuttals.
        </p>
      </div>

      {/* Pre-Flight Audio/Video Camera Sensor Bar */}
      <div className="bg-white border-4 border-black p-4 sm:p-5 shadow-[6px_6px_0px_#000] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black text-[#CCFF00] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000] shrink-0">
            <Radio size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-black uppercase text-black">AUDIO & VIDEO PRE-FLIGHT CHECK</div>
            <div className="text-[10px] font-bold text-neutral-600 uppercase">
              Microphone: {isMicActive ? 'Connected & Sensing' : 'Off'} · Camera: {isCameraActive && !hasCameraError ? 'Active Feed' : 'Simulated / Disabled'}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsCameraActive(!isCameraActive)}
            className={`px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 ${isCameraActive ? 'bg-[#CCFF00] text-black' : 'bg-[#FAF8F5] text-black'
              }`}
          >
            {isCameraActive ? <Video size={13} /> : <VideoOff size={13} />}
            <span>{isCameraActive ? 'CAM ENABLED' : 'ENABLE CAM'}</span>
          </button>

          <button
            onClick={() => setIsMicActive(!isMicActive)}
            className={`px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 ${isMicActive ? 'bg-[#CCFF00] text-black' : 'bg-[#FAF8F5] text-black'
              }`}
          >
            {isMicActive ? <Mic size={13} /> : <MicOff size={13} />}
            <span>{isMicActive ? 'MIC ENABLED' : 'ENABLE MIC'}</span>
          </button>

          <div className="flex items-center gap-1.5 bg-[#FAF8F5] border-2 border-black px-2.5 py-1 text-xs font-black shadow-[2px_2px_0px_#000]">
            <Volume2 size={13} />
            <span className="text-[10px]">{audioMeter} dB</span>
          </div>
        </div>
      </div>

      {/* Investor Archetypes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(INVESTOR_ARCHETYPES).map((style) => {
          const Icon = style.icon;
          return (
            <div
              key={style.id}
              className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] transition-all flex flex-col justify-between font-mono relative group"
            >
              <div>
                {/* Header Icon + Code */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-14 h-14 border-3 border-black ${style.color} flex items-center justify-center text-3xl shadow-[3px_3px_0px_#000] text-black`}>
                    {style.avatarEmoji}
                  </div>
                  <span className="bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                    [{style.code}]
                  </span>
                </div>

                <h3 className="font-black text-xl uppercase text-black mb-1 tracking-tight">
                  {style.name}
                </h3>
                <div className="text-[10px] font-black text-[#FF5722] uppercase mb-3">
                  {style.tagline}
                </div>

                <p className="text-xs font-bold text-neutral-700 uppercase leading-relaxed mb-4">
                  {style.description}
                </p>

                <div className="bg-[#FAF8F5] border-2 border-black p-2.5 mb-5 text-[10px] font-black text-black">
                  <span className="text-[#FF5722] block mb-0.5">EVALUATION HURDLE:</span>
                  <span className="text-neutral-600">{style.evaluationFocus}</span>
                </div>
              </div>

              <button
                onClick={() => startSimulation(style.id)}
                className="w-full bg-black hover:bg-[#CCFF00] text-white hover:text-black border-2 border-black py-2.5 px-4 text-xs font-black uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>[ ENGAGE {style.name.split(' ')[0].toUpperCase()} SIM ]</span>
                <ChevronRight size={16} className="stroke-[3]" />
              </button>
            </div>
          );
        })}
      </div>

    </motion.div>
  );
}
