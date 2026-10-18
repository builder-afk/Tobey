export const executiveData = {
  ceo: {
    id: 'ceo',
    code: '01_CEO',
    title: 'Chief Executive Officer',
    shortTitle: 'CEO',
    name: 'Andrei Baranov',
    image: '/images/executives/ceo.jpg',
    tagline: 'SCALE AT ALL COSTS. CAPITAL EFFICIENCY IS NOT AN ACCIDENT.',
    summary: 'Andrei sets the macro strategy, syndicate syndication, and venture vision. He transforms high-friction market vacuums into dominant technology monopolies through radical focus and capital leverage.',
    theme: {
      bg: 'bg-[#FFDE59]', // Bold Hazard Yellow
      text: 'text-black',
      accent: 'bg-black text-white',
      border: 'border-black',
      badge: 'bg-black text-[#FFDE59]',
      glow: 'shadow-[6px_6px_0px_#000]',
      hoverGlow: 'hover:shadow-[10px_10px_0px_#000]',
    },
    metrics: [
      { label: 'PORTFOLIO IRR', value: '34.2%', sub: 'Target benchmark >28%' },
      { label: 'WAR CHEST DEPLOYED', value: '$42.5M', sub: 'Across 18 tier-1 assets' },
      { label: 'SERIES A VELOCITY', value: '4.8 MO', sub: 'From incubation to lead terms' },
      { label: 'CAPITAL EFFICIENCY', value: '3.8x', sub: 'Revenue / deployed dollar' },
    ],
    doctrine: [
      'Market timing trumps intellectual elegance. If the macro wave isn’t surging, pivot immediately.',
      'A great CEO doesn’t manage tasks; they set the capital gravity and hire builders who refuse to lose.',
      'We do not seek validation from consensus committees. High conviction precedes outsized alpha.',
      'Never confuse activity with outcome. The market only rewards shipped products and captive cash flow.'
    ],
    pillars: [
      { code: 'CAP-01', title: 'Syndicate Capital Architecture', desc: 'Engineering multi-tier SAFE & priced rounds with tier-1 Silicon Valley & European lead syndicates.' },
      { code: 'GOV-02', title: 'Macro Direction & Board Leadership', desc: 'Directing the board and quarterly milestones with uncompromising governance and investor trust.' },
      { code: 'EXP-03', title: 'Strategic M&A & Market Conquest', desc: 'Identifying wedge acquisitions and vertical integrations to lock in defensible moats.' },
      { code: 'KEY-04', title: 'Executive Gravitas & Narrative', desc: 'Serving as the institutional face to tier-1 institutional LPs, sovereign funds, and press.' },
    ],
    intel: [
      { q: 'What is your core investment thesis for early-stage ventures?', a: 'We fund technical founders attacking structural economic bottlenecks with proprietary data loops and sub-millisecond execution. If you do not have a 10x architectural advantage, you will be eaten by commoditized frontier models.' },
      { q: 'How do you handle market downturns and funding freezes?', a: 'Downturns are clearance sales on talent and market share. We enforce 36-month runway discipline, preserve dry powder, and acquire competitors who spent recklessly on low-margin CAC.' },
      { q: 'What defines a deal-breaker for you in a founder pitch?', a: 'Hesitation on unit economics, reliance on paid ad arbitrage, or an inability to articulate how the product becomes exponentially cheaper or smarter as usage scales.' }
    ],
    clearance: 'LEVEL_01 // EXECUTIVE_COMMAND',
    status: 'ACTIVE // DEPLOYING_SERIES_B',
    contact: {
      email: 'andrei.baranov@hypers.io',
      location: 'San Francisco, CA / Zurich, CH',
      availability: 'Direct Partner Introductions & Capital Rounds'
    }
  },

  cto: {
    id: 'cto',
    code: '02_CTO',
    title: 'Chief Technology Officer',
    shortTitle: 'CTO',
    name: 'Daria Lebedeva',
    image: '/images/executives/cto.jpg',
    tagline: 'SYSTEMS AT ABSOLUTE ZERO LATENCY. CODE IS THE LAW.',
    summary: 'Daria designs the compute infrastructure, real-time distributed clusters, and proprietary neural engine pipelines. She enforces memory safety, zero-downtime micro-kernels, and mathematical scalability.',
    theme: {
      bg: 'bg-[#00F0FF]', // Cyber Cyan
      text: 'text-black',
      accent: 'bg-black text-[#00F0FF]',
      border: 'border-black',
      badge: 'bg-black text-[#00F0FF]',
      glow: 'shadow-[6px_6px_0px_#000]',
      hoverGlow: 'hover:shadow-[10px_10px_0px_#000]',
    },
    metrics: [
      { label: 'KERNEL LATENCY', value: '0.04 MS', sub: '99th percentile across nodes' },
      { label: 'COMPUTE CAPACITY', value: '4,096 H100s', sub: 'Co-located distributed cluster' },
      { label: 'SYSTEM UPTIME', value: '99.999%', sub: 'Zero unmanaged outages in 24mo' },
      { label: 'CODE BASE EFFICIENCY', value: '98.8%', sub: 'Rust / C++ / WebAssembly core' },
    ],
    doctrine: [
      'Premature abstraction is the root of all latency. Write mechanical empathy code for the underlying silicon.',
      'If your system crashes on failover, you did not build a distributed system; you built an accident.',
      'Frontier APIs are rented land. Any enterprise without self-hosted weights and low-level kernels will be disintermediated.',
      'Code reviews are zero-compromise audits. Every allocation in the hot loop must justify its existence.'
    ],
    pillars: [
      { code: 'SYS-01', title: 'Sub-Millisecond Engine Pipelines', desc: 'Constructing deterministic execution runtimes with zero garbage collection pauses and direct memory mapped buffers.' },
      { code: 'AI-02', title: 'Private Model Training & Quantization', desc: 'Distributed training pipelines, continuous fine-tuning on proprietary corpora, and FP8 quantized edge serving.' },
      { code: 'SEC-03', title: 'Cryptographic Integrity & Hardening', desc: 'End-to-end zero-knowledge proofs, SOC2 Type II compliance, and automated penetration test verification.' },
      { code: 'DEV-04', title: 'Developer Velocity Ecosystem', desc: 'Internal developer platform with sub-second hot reload, deterministic CI/CD, and AST-level lint gates.' },
    ],
    intel: [
      { q: 'Why do you prioritize Rust and custom kernels over standard frameworks?', a: 'Because at scale, garbage collection jitter destroys real-time interactive contracts. By controlling memory layouts and CPU cache alignment, our services run with 1/10th the cluster footprint of legacy Node/Python stacks.' },
      { q: 'How do you approach AI agent autonomy safely?', a: 'Deterministic state machines layered with formal verification bounds. We never allow raw LLMs unconstrained execution access without an AST parser validating every generated AST tree.' },
      { q: 'What is your stack recommendation for production AI platforms in 2026?', a: 'Rust backend runtimes, vLLM / TensorRT-LLM inference engines, pgvector / Qdrant for semantic graphs, and WebGPU for zero-latency browser client compute.' }
    ],
    clearance: 'LEVEL_01 // ROOT_ARCHITECT',
    status: 'ACTIVE // CLUSTERS_ONLINE',
    contact: {
      email: 'daria.lebedeva@hypers.io',
      location: 'Berlin, DE / San Francisco, CA',
      availability: 'Engineering Deep Dives & RFC Reviews'
    }
  },

  cfo: {
    id: 'cfo',
    code: '03_CFO',
    title: 'Chief Financial Officer',
    shortTitle: 'CFO',
    name: 'Ivan Sorokin',
    image: '/images/executives/cfo.jpg',
    tagline: 'ZERO RUNWAY WASTE. MILITARY-GRADE CAPITAL GOVERNANCE.',
    summary: 'Ivan engineers mathematical financial models, multi-currency treasury arbitrage, and cap table preservation. He treats every dollar of burn as high-grade fuel that must yield exponential enterprise valuation.',
    theme: {
      bg: 'bg-[#FF5722]', // Hazard Orange
      text: 'text-black',
      accent: 'bg-black text-[#FF5722]',
      border: 'border-black',
      badge: 'bg-black text-[#FF5722]',
      glow: 'shadow-[6px_6px_0px_#000]',
      hoverGlow: 'hover:shadow-[10px_10px_0px_#000]',
    },
    metrics: [
      { label: 'RUNWAY HORIZON', value: '38 MONTHS', sub: 'At current peak deployment' },
      { label: 'GROSS MARGINS', value: '84.6%', sub: 'SaaS + enterprise compute' },
      { label: 'CAP TABLE DILUTION', value: '11.4%', sub: 'Pre-seed to Series A average' },
      { label: 'CAC PAYBACK', value: '2.4 MO', sub: 'Sub-90 day enterprise payback' },
    ],
    doctrine: [
      'Cash flow is oxygen. You do not die when you run out of ideas; you die when you run out of capital.',
      'Unit economics must be positive on day one of paid customer acquisition. Subsidized growth is a mirage.',
      'Cap table dilution is irreversible. Protect founder equity as if it were institutional gold.',
      'A bulletproof data room closes rounds 3x faster with 30% higher valuation multiples.'
    ],
    pillars: [
      { code: 'TREAS-01', title: 'Treasury & Yield Management', desc: 'Dynamic treasury diversification across short-duration treasuries, money markets, and sovereign credit.' },
      { code: 'CAP-02', title: 'Cap Table & Waterfall Modeling', desc: 'Precision simulation of preference stacks, dilution scenarios, ESOP pools, and secondary liquidity.' },
      { code: 'UNIT-03', title: 'Unit Economic Optimization', desc: 'Granular tracking of server compute unit costs, contribution margins, and cohort net dollar retention.' },
      { code: 'DUE-04', title: 'Institutional Audit & Tax Shields', desc: 'Global multi-jurisdictional tax optimization and Big-4 audit readiness for institutional IPO tracks.' },
    ],
    intel: [
      { q: 'How do you keep burn rate under control in an AI-heavy venture?', a: 'Reserved instances, spot compute arbitrage, and contract commitments pegged directly to signed customer ARR. We never buy speculative GPU capacity without signed client LOIs.' },
      { q: 'What is the ideal runway length for high-growth tech firms today?', a: 'Minimum 24 months, ideally 36. High interest-rate macro environments penalize short runways with predatory down-rounds.' },
      { q: 'When should a startup transition from cash accounting to accrual?', a: 'The minute you sign your first recurring annual contract or raise beyond $1M. Anything less causes audit chaos during Series A due diligence.' }
    ],
    clearance: 'LEVEL_01 // CAPITAL_GOVERNANCE',
    status: 'ACTIVE // AUDIT_VERIFIED',
    contact: {
      email: 'ivan.sorokin@hypers.io',
      location: 'London, UK / New York, NY',
      availability: 'Cap Table Consultations & Syndicate Audits'
    }
  },

  cmo: {
    id: 'cmo',
    code: '04_CMO',
    title: 'Chief Marketing Officer',
    shortTitle: 'CMO',
    name: 'Anna Fedorova',
    image: '/images/executives/cmo.jpg',
    tagline: 'CATEGORY DOMINANCE THROUGH CULTURAL OBSESSION.',
    summary: 'Anna builds unstoppable growth loops, brand mythology, and organic distribution monopolies. She rejects generic marketing playbooks in favor of provocative narratives that command industry mindshare.',
    theme: {
      bg: 'bg-[#FF007F]', // Hot Magenta
      text: 'text-black',
      accent: 'bg-black text-[#FF007F]',
      border: 'border-black',
      badge: 'bg-black text-[#FF007F]',
      glow: 'shadow-[6px_6px_0px_#000]',
      hoverGlow: 'hover:shadow-[10px_10px_0px_#000]',
    },
    metrics: [
      { label: 'VIRAL COEFFICIENT', value: 'K=2.41', sub: 'Organic referral loops' },
      { label: 'EARNED IMPRESSIONS', value: '48.2M', sub: 'Q3 cross-platform reach' },
      { label: 'ORGANIC SHARE', value: '74.2%', sub: 'Inbound non-paid traffic' },
      { label: 'BRAND RECALL', value: '92.4%', sub: 'Tier-1 developer & founder cohorts' },
    ],
    doctrine: [
      'If your brand doesn’t polarize someone, it will never inspire obsessive evangelists.',
      'Product-led virality always beats ad spend. Bake the invite mechanic directly into the core user dopamine loop.',
      'Attention is the scarcest commodity in technology. Never whisper when you can detonate a category conversation.',
      'Great narratives don’t explain features; they invite users to join a rebellion against legacy mediocrity.'
    ],
    pillars: [
      { code: 'VIRAL-01', title: 'Algorithmic Organic Loops', desc: 'Engineering viral loops where product usage naturally exposes the brand to high-value peers.' },
      { code: 'BRAND-02', title: 'Provocative Editorial Mythology', desc: 'Crafting unapologetic manifestos, design-forward launch events, and cult-like brand iconography.' },
      { code: 'GTM-03', title: 'Zero-Dollar Inbound Engine', desc: 'High-signal technical essays, interactive open-source benchmarks, and developer community takeovers.' },
      { code: 'PRESS-04', title: 'Global Syndicate PR & Influence', desc: 'Direct narrative placement across Bloomberg, TechCrunch, Hacker News, and leading tech podcasts.' },
    ],
    intel: [
      { q: 'How do you create organic demand without millions in ad spend?', a: 'By creating tools and content so brutally honest and technically useful that engineers feel compelled to share them in private Slack/Discord groups.' },
      { q: 'What is the most common marketing mistake early startups make?', a: 'Marketing to everyone. If you cannot dominate a narrow beachhead of 1,000 fanatical users first, you will burn out trying to convince the mass market.' },
      { q: 'How do you measure brand equity quantitatively?', a: 'Direct branded search volume, organic domain authority growth, and the percentage of inbound sales calls where the buyer already understands our point of view.' }
    ],
    clearance: 'LEVEL_01 // GROWTH_COMMAND',
    status: 'ACTIVE // CAMPAIGNS_LIVE',
    contact: {
      email: 'anna.fedorova@hypers.io',
      location: 'New York, NY / Paris, FR',
      availability: 'Keynote Inquiries & Strategic Distribution'
    }
  },

  coo: {
    id: 'coo',
    code: '05_COO',
    title: 'Chief Operating Officer',
    shortTitle: 'COO',
    name: 'Pavel Smirnov',
    image: '/images/executives/coo.jpg',
    tagline: 'DISCIPLINE IS THE ALGORITHM. 14-DAY CADENCE TO PRODUCTION.',
    summary: 'Pavel enforces operational execution, sprint burndowns, and cross-functional synchronization. He turns chaotic startup ambition into a relentless, clockwork machine that ships on schedule without excuses.',
    theme: {
      bg: 'bg-[#FF9100]', // Warning Amber
      text: 'text-black',
      accent: 'bg-black text-[#FF9100]',
      border: 'border-black',
      badge: 'bg-black text-[#FF9100]',
      glow: 'shadow-[6px_6px_0px_#000]',
      hoverGlow: 'hover:shadow-[10px_10px_0px_#000]',
    },
    metrics: [
      { label: 'SPRINT ON-TIME RATE', value: '98.4%', sub: 'Over 42 consecutive sprints' },
      { label: 'CYCLE TIME', value: '1.8 DAYS', sub: 'Concept to live production code' },
      { label: 'GLOBAL HUBS', value: '4 HUBS', sub: '24-hour continuous deployment' },
      { label: 'OPERATIONAL MARGIN', value: '94.2%', sub: 'Minimal bureaucracy overhead' },
    ],
    doctrine: [
      'Ideas are worthless until executed. A mediocre plan shipped today beats a flawless plan shipped next quarter.',
      'Ruthless prioritization: if a task does not directly move the primary OKR needle, kill it immediately.',
      'Process should be lightweight armor, not bureaucratic quicksand. Automate every manual status check.',
      'Radical candor is an operational necessity. Concealing friction delays fixes; expose bottlenecks immediately.'
    ],
    pillars: [
      { code: 'OPS-01', title: '14-Day Sprint Burndown Cadence', desc: 'Synchronizing cross-functional sprints across frontend, backend, legal, and growth teams.' },
      { code: 'AUTO-02', title: 'Asynchronous Workflow Automation', desc: 'Replacing long meetings with automated PR reviews, async standup bots, and linear milestone tracking.' },
      { code: 'VEND-03', title: 'Vendor & Cloud Supply Chain', desc: 'Negotiating enterprise tier contracts with datacenter operators, cloud providers, and SaaS vendors.' },
      { code: 'CRISIS-04', title: 'War Room Rapid Response Protocol', desc: 'Zero-friction incident triage resolving critical blockers and production fires within minutes.' },
    ],
    intel: [
      { q: 'How do you keep distributed engineering teams in high-speed alignment?', a: 'Extremely clear daily written updates, strict PR lifecycle SLAs (under 4 hours), and zero redundant Zoom calls. The code repository is the single source of truth.' },
      { q: 'What is your operational metric for engineering health?', a: 'Cycle time: the duration from when a line of code is committed to when it is deployed and verified in customer-facing production.' },
      { q: 'How do you handle team burnout in hyper-growth startups?', a: 'Eliminate fake urgency and chaotic context-switching. Intense focus on 2 key objectives creates flow; juggling 20 low-impact tasks creates exhaustion.' }
    ],
    clearance: 'LEVEL_01 // BATTLE_COMMAND',
    status: 'ACTIVE // ALL_SYSTEMS_GO',
    contact: {
      email: 'pavel.smirnov@hypers.io',
      location: 'Stockholm, SE / San Francisco, CA',
      availability: 'Sprint Audits & Operational War Rooms'
    }
  },

  clo: {
    id: 'clo',
    code: '06_CLO',
    title: 'Chief Legal Officer',
    shortTitle: 'CLO',
    name: 'Olga Kravtsova',
    image: '/images/executives/clo.jpg',
    tagline: 'IMPERMEABLE IP STRUCTURES. UNASSAILABLE VENTURE DEFENSE.',
    summary: 'Olga constructs defensible patent architectures, international corporate holding structures, and regulatory shields. She ensures our IP moat is unbreachable and venture agreements favor institutional autonomy.',
    theme: {
      bg: 'bg-[#F4F1EA]', // Bone White / Titanium
      text: 'text-black',
      accent: 'bg-black text-[#F4F1EA]',
      border: 'border-black',
      badge: 'bg-black text-white',
      glow: 'shadow-[6px_6px_0px_#000]',
      hoverGlow: 'hover:shadow-[10px_10px_0px_#000]',
    },
    metrics: [
      { label: 'PATENTS FILED', value: '18 SECURED', sub: 'Utility & spatial interaction' },
      { label: 'COMPLIANCE AUDIT', value: '100%', sub: 'SOC-2 Type II, GDPR, CCPA' },
      { label: 'IP DEFENSE SCORE', value: 'TIER_01', sub: 'Zero active infringement vectors' },
      { label: 'CLOSING DURATION', value: '48 HOURS', sub: 'Average commercial contract closing' },
    ],
    doctrine: [
      'Legal is not a department of "no"; it is an offensive weapon for securing unfair competitive moats.',
      'Protect your data rights and algorithm training rights before commercializing. Ambiguity invites litigation.',
      'Standardize commercial contracts to single-page agreements. Friction kills enterprise deals.',
      'In cross-border ventures, tax and regulatory jurisdiction planning must occur prior to the first wire.'
    ],
    pillars: [
      { code: 'IP-01', title: 'Proprietary IP Vault & Patents', desc: 'Aggressive filing of utility patents around neural architectures, synthetic dataset generation, and compilers.' },
      { code: 'CORP-02', title: 'Delaware C-Corp & Cayman Governance', desc: 'Maintaining pristine corporate structuring, equity option pools, and international IP licensing shields.' },
      { code: 'REG-03', title: 'Global AI & Data Compliance', desc: 'Navigating EU AI Act, US regulatory disclosures, and enterprise financial privacy mandates.' },
      { code: 'DEAL-04', title: 'High-Value Enterprise Master Agreements', desc: 'Rapid negotiation of multi-million dollar Fortune 500 SaaS and compute contracts.' },
    ],
    intel: [
      { q: 'How do you safeguard proprietary AI training datasets legally?', a: 'Ironclad provenance verification, explicit perpetual commercial data-use clauses, and cryptographic watermarking on generated weights.' },
      { q: 'What is the biggest legal pitfall for AI startups in 2026?', a: 'Using third-party APIs or scraped datasets without reviewing training-use exclusions, which can poison your model weights and force expensive model retraining.' },
      { q: 'How does hypers handle founder vesting and IP assignment?', a: 'Standard 4-year vesting with a 1-year cliff, double-trigger acceleration upon acquisition, and 100% comprehensive IP assignment signed on day zero.' }
    ],
    clearance: 'LEVEL_01 // LEGAL_DEFENSE',
    status: 'ACTIVE // VAULT_LOCKED',
    contact: {
      email: 'olga.kravtsova@hypers.io',
      location: 'Geneva, CH / Washington, DC',
      availability: 'Regulatory Guidance & Venture Legal Audits'
    }
  },

  cdo: {
    id: 'cdo',
    code: '07_CDO',
    title: 'Chief Design Officer',
    shortTitle: 'CDO',
    name: 'Igor Zakharenko',
    image: '/images/executives/cdo.jpg',
    tagline: 'RADICAL TACTILE INTERFACES. REJECT GENERIC SOFTWARE.',
    summary: 'Igor oversees user experience architecture, spatial computing systems, and visual branding. He believes extraordinary software must evoke visceral joy and emotional resonance at first interaction.',
    theme: {
      bg: 'bg-[#0047FF]', // Ultra Cobalt Blue
      text: 'text-white',
      accent: 'bg-white text-black',
      border: 'border-black',
      badge: 'bg-yellow-300 text-black',
      glow: 'shadow-[6px_6px_0px_#000]',
      hoverGlow: 'hover:shadow-[10px_10px_0px_#000]',
    },
    metrics: [
      { label: 'DESIGN TOKENS', value: '1,420 V4', sub: 'Zero ad-hoc CSS utilities' },
      { label: 'FRAME BUDGET', value: '120 FPS', sub: 'GPU accelerated transitions' },
      { label: 'USABILITY RATING', value: '98.2 / 100', sub: 'System usability scale benchmark' },
      { label: 'DESIGN ACCESSIBILITY', value: 'WCAG AAA', sub: '100% contrast & screen reader verified' },
    ],
    doctrine: [
      'Software should look like it came from the future, not from a generic component template.',
      'Micro-animations are not decoration; they provide tactile feedback that confirms user intent.',
      'Typography is the voice of your product. If your type hierarchy is sloppy, users will suspect your code is sloppy.',
      'Design is the ultimate differentiator when every competitor has access to the same underlying APIs.'
    ],
    pillars: [
      { code: 'UI-01', title: 'Brutalist & Spatial UI Design Systems', desc: 'Crafting radical, tactile design tokens that combine raw minimalism with ultra-smooth kinetic physics.' },
      { code: 'UX-02', title: 'Zero-Cognitive-Friction Workflows', desc: 'Refining complex enterprise workflows so power users navigate at keyboard velocity with zero confusion.' },
      { code: 'PROT-03', title: 'Interactive High-Fidelity Sandbox', desc: 'Prototyping in live code rather than static Figma frames to test real latency and dynamic state.' },
      { code: 'BRAND-04', title: 'Sensory & Motion Identity', desc: 'Designing customized sound signatures, haptic rhythms, and kinetic micro-feedback loops.' },
    ],
    intel: [
      { q: 'Why did you adopt Neo-Brutalism for hypers?', a: 'Because generic corporate minimalism has become lifeless. Neo-Brutalism delivers raw honesty, high contrast, tactile depth, and instant memorability in an ocean of bland SaaS templates.' },
      { q: 'How do you balance high aesthetic daring with enterprise usability?', a: 'Bold aesthetics on layout and typography, but zero compromise on standard accessibility, screen-reader markup, keyboard navigability, and optical hierarchy.' },
      { q: 'What is your toolchain for rapid spatial design?', a: 'Figma for raw typography tokens, WebGL / Three.js for spatial shader experiments, and Tailwind CSS v4 in production code.' }
    ],
    clearance: 'LEVEL_01 // CREATIVE_DIRECTION',
    status: 'ACTIVE // CANVAS_LIVE',
    contact: {
      email: 'igor.zakharenko@hypers.io',
      location: 'Milan, IT / London, UK',
      availability: 'Design System Audits & Interface Critique'
    }
  },

  hr: {
    id: 'hr',
    code: '08_HR',
    title: 'Head of People & HR',
    shortTitle: 'HR',
    name: 'Ksenia Romanova',
    image: '/images/executives/hr.jpg',
    tagline: 'TOP 0.1% HUMAN CAPITAL. MERCENARY BUILDERS ONLY.',
    summary: 'Ksenia engineers executive talent matchmaking, high-conviction culture, and compensation architecture. She curates the top 0.1% of global engineers and founders, building teams that execute with singular focus.',
    theme: {
      bg: 'bg-[#CCFF00]', // Toxic Chartreuse / Neon Lime
      text: 'text-black',
      accent: 'bg-black text-[#CCFF00]',
      border: 'border-black',
      badge: 'bg-black text-[#CCFF00]',
      glow: 'shadow-[6px_6px_0px_#000]',
      hoverGlow: 'hover:shadow-[10px_10px_0px_#000]',
    },
    metrics: [
      { label: 'ACCEPTANCE RATE', value: '0.8%', sub: 'Over 6,400 vetted applications' },
      { label: 'MATCH CONFIDENCE', value: '96.8%', sub: 'AI technical competency audit' },
      { label: 'MEDIAN RETENTION', value: '4.2 YRS', sub: 'High-conviction equity alignment' },
      { label: 'PLACEMENT VELOCITY', value: '11 DAYS', sub: 'From screening to signed offer' },
    ],
    doctrine: [
      'A single 10x engineer who ships beats ten average developers who write meeting agendas.',
      'We do not hire resume pedigree; we hire demonstrable execution velocity and intellectual tenacity.',
      'Culture is defined by who you fire, who you promote, and what behavior you refuse to tolerate.',
      'Equity compensation should create life-changing wealth for builders who move the enterprise needle.'
    ],
    pillars: [
      { code: 'TAL-01', title: 'Global Deep-Tech Sourcing', desc: 'Direct sourcing across top AI research labs, ICPC champions, and proven startup founders.' },
      { code: 'CULT-02', title: 'High-Intensity Culture Matrix', desc: 'Fostering an obsessive builder environment where autonomy, speed, and excellence are celebrated.' },
      { code: 'COMP-03', title: 'Performance Equity Architecture', desc: 'Structuring transparent, incentive-aligned stock option plans with performance milestones.' },
      { code: 'MATCH-04', title: 'AI-Assisted Technical Vetting', desc: 'Real-time code challenge evaluation, architecture defense simulations, and team chemistry matching.' },
    ],
    intel: [
      { q: 'How do you identify a true 10x engineer during interviews?', a: 'Put them in a live arena with a broken distributed system and watch how they isolate variables. True 10x engineers display deep mechanical curiosity and diagnose root causes rather than guessing.' },
      { q: 'What is the secret to retaining elite talent in a competitive market?', a: 'Extreme autonomy, working exclusively alongside other elite peers, and zero bureaucratic friction standing between them and production.' },
      { q: 'What is your philosophy on remote vs in-person collaboration?', a: 'Asynchronous-first execution with quarterly intensive in-person builder summits. High trust + high accountability beats daily surveillance.' }
    ],
    clearance: 'LEVEL_01 // PEOPLE_OPERATIONS',
    status: 'ACTIVE // RECRUITING_ON',
    contact: {
      email: 'ksenia.romanova@hypers.io',
      location: 'Stockholm, SE / Zurich, CH',
      availability: 'Executive Talent Campaigns & Co-Founder Matching'
    }
  }
};

export const executiveList = [
  executiveData.ceo,
  executiveData.cto,
  executiveData.cfo,
  executiveData.cmo,
  executiveData.coo,
  executiveData.clo,
  executiveData.cdo,
  executiveData.hr,
];
