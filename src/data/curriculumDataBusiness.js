export const curriculumDataBusiness = {
  // ==========================================
  // 1. FINANCE & QUANTITATIVE SYSTEMS
  // ==========================================
  "algorithmic-trading-hft-architecture": {
    title: "Algorithmic Trading & HFT Architecture",
    tagline: "Low-Latency Execution, Order Books & C++ Backtesting",
    duration: "4 Months",
    overview: "Master the engineering behind quantitative hedge funds and proprietary trading desks. Build ultra-low latency execution engines, limit order book (LOB) matching simulators in C++20, statistical arbitrage algorithms, market making strategies, and execution alpha with Python vectorized backtesting.",
    objectives: [
      { num: "01", color: "blue", icon: "TrendingUp", title: "Market Microstructure", desc: "Understand Limit Order Books (LOB), tick-level data, queue dynamics, and dark pool routing." },
      { num: "02", color: "cyan", icon: "Terminal", title: "Ultra-Low Latency C++", desc: "Write lock-free queues, cache-conscious memory layouts, and zero-allocation networking engines." },
      { num: "03", color: "emerald", icon: "BarChart3", title: "Quantitative Strategies", desc: "Implement statistical arbitrage (Pairs Trading), mean-reversion, and Avellaneda-Stoikov market making." },
      { num: "04", color: "purple", icon: "ShieldAlert", title: "Execution & Risk Controls", desc: "Engineer real-time pre-trade risk checks, kill switches, and slippage minimization algorithms." }
    ],
    outcomes: [
      { label: "CLO 01", color: "blue", icon: "Award", title: "Quantitative Systems Engineer", desc: "Build sub-microsecond trading engines and robust algorithmic execution models." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Microstructure & Vectorized Backtesting", subtitle: "MONTHS 1-2", color: "blue",
        modules: [
          { code: "M1", title: "Exchange Mechanics & Tick Feeds", weeks: "Weeks 1-4", icon: "Activity", color: "blue", tags: ["ITCH / OUCH", "FIX Protocol", "Level 3 Books"], desc: "Parsing raw exchange protocols, building price depth levels, and tick-by-tick timestamp sync." },
          { code: "M2", title: "Vectorized Alpha Strategy Design", weeks: "Weeks 5-8", icon: "BarChart3", color: "cyan", tags: ["VectorBT", "Polars", "Pairs Trading", "Kalman Filters"], desc: "Backtesting statistical alpha models on 10 years of tick data with realistic transaction cost models." }
        ],
        milestoneTitle: "Vectorized Multi-Asset Backtester", milestoneDesc: "High-Throughput Polars Backtesting Engine", milestoneFeatures: ["Cointegration Pairs Strategy", "Sub-10ms Walk-Forward Optimization", "Sharpe > 2.5"]
      },
      {
        id: "phase2", name: "PHASE II", title: "C++ Execution Engine & Market Making", subtitle: "MONTHS 3-4", color: "emerald",
        modules: [
          { code: "M3", title: "Sub-Microsecond C++ Matching Engine", weeks: "Weeks 9-12", icon: "Terminal", color: "emerald", tags: ["C++20", "Lock-Free Ring Buffers", "Memory Pools"], desc: "Architecting a high-frequency matching engine with deterministically bounded sub-microsecond latency." },
          { code: "M4", title: "Avellaneda-Stoikov Market Making", weeks: "Weeks 13-16", icon: "TrendingUp", color: "purple", tags: ["Market Making", "Inventory Risk", "Spread Dynamics"], desc: "Automating bid-ask quote placement while neutralizing directional inventory exposure." }
        ],
        milestoneTitle: "Sub-Microsecond LOB Trading Engine", milestoneDesc: "C++20 Production Execution Simulator", milestoneFeatures: ["Lock-Free Ring Buffer", "Zero Dynamic Allocations in Hot Path", "Real-Time FIX Bridge"]
      }
    ],
    techStack: {
      client: { title: "Python & Polars", icon: "Code2", desc: "Research Stack", tags: ["Python 3.12", "Polars", "VectorBT", "Numba"] },
      server: { title: "Modern C++20", icon: "Terminal", desc: "Execution Hot-Path", tags: ["C++20", "GCC 14", "Boost.Asio", "Lock-Free"] },
      database: { title: "QuestDB / Timescale", icon: "Database", desc: "Tick Store", type: "Time-Series OLAP", platform: "High-Frequency" },
      devops: ["Docker", "Linux Kernel Tuning", "DPDK", "Prometheus"]
    },
    projects: [
      { icon: "TrendingUp", title: "High-Frequency Crypto Order-Book Arbitrage Engine", tag: "HFT SYSTEM", desc: "Low-latency C++ bot capturing cross-exchange triangular arbitrage discrepancies across Binance and Bybit with millisecond websocket order execution.", features: ["WebSocket Feed Handler", "Sub-100μs Arb Detector", "Automated Post-Only Orders"], borderColor: "border-blue-500/30" },
      { icon: "BarChart3", title: "Statistical Arbitrage ETF Arbitrage Platform", tag: "STAT ARB", desc: "Kalman-filter powered pairs trading system monitoring basket constituents against index futures to capture mean-reverting deviations.", features: ["Rolling Cointegration", "Dynamic Hedge Ratios", "Automated Stop-Loss Limits"], borderColor: "border-emerald-500/30" }
    ],
    careerOutcomes: "Quantitative Trader, HFT Systems Engineer, Low-Latency C++ Developer ($220k-$450k)"
  },

  "quantitative-finance-risk-ai": {
    title: "Quantitative Finance & Risk AI",
    tagline: "Stochastic Volatility, Factor Investing & ML Pricing",
    duration: "4 Months",
    overview: "Merge advanced mathematical finance with modern deep learning. Master option pricing models (Black-Scholes, Heston), volatility surface modeling, cross-sectional factor investing (Fama-French 5-factor), Value-at-Risk (VaR) Monte Carlo simulation, and Transformer architectures for market alpha.",
    objectives: [
      { num: "01", color: "emerald", icon: "Sigma", title: "Stochastic Calculus & Derivatives", desc: "Master Ito's Lemma, Black-Scholes PDE, risk-neutral valuation, and implied volatility surfaces." },
      { num: "02", color: "cyan", icon: "PieChart", title: "Factor Investing & Portfolio Theory", desc: "Engineer momentum, value, quality, and low-volatility factors with cross-sectional regression." },
      { num: "03", color: "purple", icon: "Cpu", title: "Deep Learning for Alpha", desc: "Apply Temporal Fusion Transformers and LSTM architectures to non-stationary financial time series." },
      { num: "04", color: "orange", icon: "ShieldCheck", title: "Enterprise Risk Engineering", desc: "Compute parametric and historical VaR, Expected Shortfall (CVaR), and stress-test scenarios." }
    ],
    outcomes: [
      { label: "CLO 01", color: "emerald", icon: "Award", title: "Quantitative Risk Lead", desc: "Develop institutional derivatives pricing libraries and risk governance frameworks." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Options Pricing & Volatility Surfaces", subtitle: "MONTHS 1-2", color: "emerald",
        modules: [
          { code: "M1", title: "Black-Scholes & The Greeks", weeks: "Weeks 1-4", icon: "Sigma", color: "emerald", tags: ["Delta / Gamma / Vega", "PDE Numerical Solvers", "Implied Vol"], desc: "Computing option Greeks, calibration against market prices, and delta hedging." },
          { code: "M2", title: "Heston Stochastic Volatility & Smiles", weeks: "Weeks 5-8", icon: "Activity", color: "teal", tags: ["Heston Model", "Volatility Smiles", "SVI Parametrization"], desc: "Fitting parametric volatility surfaces to real-world skew and kurtosis across expiration dates." }
        ],
        milestoneTitle: "Derivatives Pricing & Volatility Library", milestoneDesc: "Institutional Python Pricing Engine", milestoneFeatures: ["Closed-Form & Monte Carlo Greeks", "SVI Vol Surface Calibration", "Auto-Arbitrage Check"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Factor Models & Deep Learning Alpha", subtitle: "MONTHS 3-4", color: "purple",
        modules: [
          { code: "M3", title: "Fama-French Multi-Factor Portfolios", weeks: "Weeks 9-12", icon: "PieChart", color: "purple", tags: ["Fama-French", "Barra Risk Model", "Mean-Variance"], desc: "Constructing long-short factor portfolios with turnover constraints and factor neutralization." },
          { code: "M4", title: "Transformers for Market Forecasting", weeks: "Weeks 13-16", icon: "Cpu", color: "cyan", tags: ["Temporal Fusion Transformers", "Quantile Loss", "Feature Store"], desc: "Predicting market distribution tails and regime shifts with attention-based time-series models." }
        ],
        milestoneTitle: "Institutional Risk & Alpha Platform", milestoneDesc: "Multi-Asset Factor Risk System", milestoneFeatures: ["Expected Shortfall (CVaR)", "Transformer Alpha Signal", "Automated Rebalancing"]
      }
    ],
    techStack: {
      client: { title: "Python & Streamlit", icon: "Code2", desc: "Quant Dashboard", tags: ["Streamlit", "Plotly", "FastAPI"] },
      server: { title: "PyTorch & SciPy", icon: "Cpu", desc: "Scientific Engine", tags: ["PyTorch", "SciPy", "Statsmodels", "Numba"] },
      database: { title: "ClickHouse & Postgres", icon: "Database", desc: "Factor & Market Data", type: "Columnar OLAP", platform: "Managed" },
      devops: ["JupyterHub", "Docker", "Weights & Biases", "GitHub Actions"]
    },
    projects: [
      { icon: "Sigma", title: "Automated Exotics Derivatives Pricing Engine", tag: "DERIVATIVES", desc: "Monte Carlo pricing engine with GPU acceleration via CUDA/PyTorch for pricing barrier, Asian, and lookback options under stochastic volatility.", features: ["CUDA-Accelerated Simulation", "Path-Dependent Payoffs", "Live Greeks Hedging"], borderColor: "border-emerald-500/30" },
      { icon: "PieChart", title: "Macro Factor Exposure & VaR Stress-Tester", tag: "RISK TECH", desc: "Enterprise risk analyzer calculating daily 99% VaR and CVaR across a $500M multi-asset portfolio under simulated 2008 and 2020 crash scenarios.", features: ["Historical & Parametric VaR", "Liquidity-Adjusted Risk", "Stress-Testing Scenarios"], borderColor: "border-purple-500/30" }
    ],
    careerOutcomes: "Quantitative Analyst, Risk Modeling Lead, Algorithmic Portfolio Manager ($200k-$380k)"
  },

  "fintech-ledger-payments-infrastructure": {
    title: "FinTech Ledger & Payments Infrastructure",
    tagline: "Double-Entry Accounting, ISO 20022 & Stripe Integrations",
    duration: "4 Months",
    overview: "Engineering financial applications requires absolute mathematical precision—floating point inaccuracies and missing ledger entries lead to catastrophic balance drift. Master immutable double-entry ledger architecture, idempotency keys, ISO 20022 protocols, distributed transactions, card payment networks, and multi-currency reconciliation.",
    objectives: [
      { num: "01", color: "teal", icon: "CreditCard", title: "Card & Payment Rails", desc: "Understand interchange fees, 3D-Secure 2.0, card networks (Visa/Mastercard), and ACH/SEPA clearance." },
      { num: "02", color: "blue", icon: "BookOpen", title: "Immutable Ledger Design", desc: "Design immutable double-entry accounting databases where sum(debits) - sum(credits) == 0 at all times." },
      { num: "03", color: "indigo", icon: "Lock", title: "Distributed Idempotency", desc: "Implement distributed locks, state machines, and idempotency guarantees across unreliable network hops." },
      { num: "04", color: "emerald", icon: "Repeat", title: "Multi-Currency Reconciliation", desc: "Build automated clearing, FX hedging, and nightly bank account reconciliation pipelines." }
    ],
    outcomes: [
      { label: "CLO 01", color: "teal", icon: "Award", title: "FinTech Platform Architect", desc: "Design fault-tolerant payment processors and core banking ledger systems." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Immutable Double-Entry Ledger & ACID Constraints", subtitle: "MONTHS 1-2", color: "teal",
        modules: [
          { code: "M1", title: "Double-Entry Bookkeeping Math", weeks: "Weeks 1-4", icon: "BookOpen", color: "teal", tags: ["Assets / Liabilities", "Debits & Credits", "Chart of Accounts"], desc: "Modeling balance sheets, multi-tenant accounts, and enforcing zero-sum ledger balance constraints." },
          { code: "M2", title: "PostgreSQL Ledger Schema & Pessimistic Locks", weeks: "Weeks 5-8", icon: "Database", color: "blue", tags: ["SELECT FOR UPDATE", "Advisory Locks", "Idempotency"], desc: "Preventing double-spending, race conditions, and handling high-velocity wallet balances under load." }
        ],
        milestoneTitle: "Production Double-Entry Core Ledger", milestoneDesc: "ACID-Compliant PostgreSQL Ledger Engine", milestoneFeatures: ["Immutable Append-Only Audit Trail", "Zero Balance Discrepancy", "Sub-20ms Lock Resolution"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Payment Orchestration & Bank Reconciliation", subtitle: "MONTHS 3-4", color: "indigo",
        modules: [
          { code: "M3", title: "Payment Gateway Integration & Webhooks", weeks: "Weeks 9-12", icon: "CreditCard", color: "indigo", tags: ["Stripe Connect", "Webhook Verification", "Retry Storms"], desc: "Handling asymmetric webhooks, payment state machines, and exponential backoff retry queues." },
          { code: "M4", title: "Nightly Automated Reconciliation Pipeline", weeks: "Weeks 13-16", icon: "Repeat", color: "emerald", tags: ["ISO 20022", "CAMT.053", "Reconciliation Engine"], desc: "Matching internal ledger entries with external bank transaction settlement feeds." }
        ],
        milestoneTitle: "Enterprise Payment Gateway & Reconciliation Hub", milestoneDesc: "End-to-End Payments Platform", milestoneFeatures: ["Stripe Connect Multi-Party Escrow", "Automated Discrepancy Flagging", "ISO 20022 Parser"]
      }
    ],
    techStack: {
      client: { title: "TypeScript & React", icon: "Code2", desc: "Checkout UI", tags: ["Stripe Elements", "React", "Next.js"] },
      server: { title: "Go & Node.js", icon: "Server", desc: "Core Engine", tags: ["Go 1.22", "Temporal.io", "gRPC", "Fastify"] },
      database: { title: "PostgreSQL & Redis", icon: "Database", desc: "Ledger Plane", type: "Relational Ledger", platform: "AWS Aurora Serverless" },
      devops: ["Docker", "Kubernetes", "Datadog", "PCI-DSS Scanners"]
    },
    projects: [
      { icon: "CreditCard", title: "Global Multi-Tenant Digital Wallet Engine", tag: "CORE BANKING", desc: "A peer-to-peer wallet system supporting multi-currency holds, instant internal transfers with double-entry ledger guarantees, and Stripe on-ramp.", features: ["Double-Entry Balance Verification", "Redis Distributed Locks", "Real-Time Fraud Filter"], borderColor: "border-teal-500/30" },
      { icon: "Repeat", title: "Automated Multi-Bank Nightly Reconciliation Engine", tag: "FINTECH OPS", desc: "Streaming reconciliation service that processes 500,000 daily transaction lines against MT940/CAMT.053 bank files, surfacing discrepancies in real time.", features: ["Fuzzy Transaction Matching", "Break Management Dashboard", "Automated Journal Entries"], borderColor: "border-indigo-500/30" }
    ],
    careerOutcomes: "FinTech Systems Architect, Staff Payments Engineer, Core Banking Specialist ($190k-$320k)"
  },

  "defi-architecture-smart-contract-auditing": {
    title: "DeFi Architecture & Smart Contract Auditing",
    tagline: "Automated Market Makers, EVM Internals & Flash Loans",
    duration: "4 Months",
    overview: "Decentralized Finance protocols hold tens of billions in total value locked (TVL) where single bugs cause catastrophic exploits. Master Uniswap-style Automated Market Makers (Constant Product Formula x*y=k), concentrated liquidity, lending market mechanics (Aave/Compound), EVM bytecode semantics, reentrancy vectors, and formal verification with Foundry and Slither.",
    objectives: [
      { num: "01", color: "purple", icon: "Coins", title: "AMM Mathematics", desc: "Master constant product, concentrated liquidity (Uniswap v3 ticks), and impermanent loss formulas." },
      { num: "02", color: "indigo", icon: "Layers", title: "EVM Internals & Solidity", desc: "Understand memory vs storage slots, gas optimization, proxy patterns, and bytecode execution." },
      { num: "03", color: "red", icon: "ShieldAlert", title: "Smart Contract Exploit Vectors", desc: "Analyze reentrancy, flash loan price manipulation, oracle manipulation, and signature replay." },
      { num: "04", color: "emerald", icon: "CheckCircle2", title: "Auditing & Formal Verification", desc: "Audit protocols using Foundry fuzz testing, invariant tests, and static analyzers (Slither/Echidna)." }
    ],
    outcomes: [
      { label: "CLO 01", color: "purple", icon: "Award", title: "DeFi Security Auditor", desc: "Design secure decentralized protocols and uncover critical smart contract vulnerabilities." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "AMM Mathematics & Solidity Architecture", subtitle: "MONTHS 1-2", color: "purple",
        modules: [
          { code: "M1", title: "Constant Product & Concentrated Liquidity", weeks: "Weeks 1-4", icon: "Coins", color: "purple", tags: ["Uniswap v2/v3", "Ticks & Ranges", "Slippage"], desc: "Deriving mathematical invariant formulas, swap calculations, and fee accumulation logic." },
          { code: "M2", title: "Advanced Solidity & Proxy Upgrades", weeks: "Weeks 5-8", icon: "Code2", color: "indigo", tags: ["ERC-20/721", "UUPS Proxies", "Gas Golfing"], desc: "Writing gas-optimized smart contracts, storage collision prevention, and upgradeable patterns." }
        ],
        milestoneTitle: "Concentrated Liquidity DEX Protocol", milestoneDesc: "Full Automated Market Maker Suite", milestoneFeatures: ["Custom Tick Math", "Flash Swaps", "100% Foundry Test Coverage"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Exploits, Flash Loans & Security Auditing", subtitle: "MONTHS 3-4", color: "red",
        modules: [
          { code: "M3", title: "Flash Loans & Oracle Manipulation", weeks: "Weeks 9-12", icon: "ShieldAlert", color: "red", tags: ["Flash Loans", "TWAP vs Spot", "Sandwich Attacks"], desc: "Simulating spot price pool manipulation and defending with Chainlink oracles and TWAPs." },
          { code: "M4", title: "Fuzz Testing & Comprehensive Audit Reports", weeks: "Weeks 13-16", icon: "CheckCircle2", color: "emerald", tags: ["Foundry Invariant Tests", "Slither", "Audit Playbook"], desc: "Writing stateful invariant fuzz tests and compiling professional security audit findings." }
        ],
        milestoneTitle: "DeFi Lending Protocol & Full Security Audit", milestoneDesc: "Over-Collateralized Money Market", milestoneFeatures: ["Liquidation Bot Architecture", "Slither Clean Pass", "Fuzz Tested Invariants"]
      }
    ],
    techStack: {
      client: { title: "TypeScript & Ethers.js", icon: "Code2", desc: "Web3 Client", tags: ["Viem", "Wagmi", "Next.js"] },
      server: { title: "Solidity & Foundry", icon: "Terminal", desc: "Smart Contracts", tags: ["Solidity 0.8.26", "Foundry", "Forge", "Cast"] },
      database: { title: "The Graph & Dune", icon: "Database", desc: "On-Chain Indexer", type: "GraphQL Subgraph", platform: "Decentralized" },
      devops: ["Slither", "Echidna", "Hardhat", "Anvil Local Testnet"]
    },
    projects: [
      { icon: "Coins", title: "Concentrated Liquidity AMM Protocol (Uniswap v3 Clone)", tag: "DEFI PROTOCOL", desc: "Fully functional AMM supporting custom tick pricing ranges, NFT liquidity positions, and automated protocol fee collection.", features: ["Q64.96 Fixed Point Math", "Tick Bitmap Navigation", "Flash Swap Callbacks"], borderColor: "border-purple-500/30" },
      { icon: "ShieldAlert", title: "Smart Contract Exploit Reproducer & Audit Suite", tag: "SECURITY AUDIT", desc: "A repository of historic real-world $50M+ DeFi hacks reproduced in local Foundry forks with automated exploit scripts and hardened patches.", features: ["Flash Loan Simulation", "Reentrancy Exploit POC", "Automated Slither CI Rules"], borderColor: "border-red-500/30" }
    ],
    careerOutcomes: "Smart Contract Auditor, DeFi Protocol Engineer, Web3 Security Lead ($210k-$420k)"
  },

  // ==========================================
  // 2. VENTURE CAPITAL & STARTUP ECONOMICS
  // ==========================================
  "venture-capital-fund-economics": {
    title: "Venture Capital Fund Economics",
    tagline: "Fund Math, Waterfall Distributions & Power Law Returns",
    duration: "3 Months",
    overview: "Venture capital is ruled by the Power Law: a single investment often returns more than the entire rest of the fund combined. Master institutional fund modeling: 10-year LP cash flow projections, management fee offsets, capital call schedules, European vs American waterfall distributions, hurdle rates, and reserve allocation matrices.",
    objectives: [
      { num: "01", color: "indigo", icon: "Coins", title: "Fund Cash Flow Dynamics", desc: "Model 2/20 fee structures, capital call cadences, recycling provisions, and fund deployment pacing." },
      { num: "02", color: "blue", icon: "TrendingUp", title: "Power-Law Portfolio Construction", desc: "Determine optimal portfolio size (20 vs 40 companies), check size distribution, and follow-on reserves." },
      { num: "03", color: "purple", icon: "GitFork", title: "Waterfall Distributions", desc: "Calculate return of capital, preferred return (8% hurdle), GP catch-up, and carried interest splits." },
      { num: "04", color: "emerald", icon: "BarChart", title: "Fund Metrics (IRR, TVPI, DPI)", desc: "Analyze Gross vs Net IRR, DPI (Distributed to Paid-In), RVPI, and J-Curve performance modeling." }
    ],
    outcomes: [
      { label: "CLO 01", color: "indigo", icon: "Award", title: "VC Fund Operations & Finance Lead", desc: "Build institutional-grade venture fund financial models for Limited Partners (LPs)." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Fund Pacing, Fee Recycling & Reserves", subtitle: "MONTHS 1-2", color: "indigo",
        modules: [
          { code: "M1", title: "2/20 Economics & Capital Calls", weeks: "Weeks 1-3", icon: "Coins", color: "indigo", tags: ["Management Fees", "Capital Calls", "Recycling"], desc: "How a $100M fund actually invests $105M through fee recycling and pacing." },
          { code: "M2", title: "Reserve Strategy & Follow-On Rounds", weeks: "Weeks 4-6", icon: "TrendingUp", color: "blue", tags: ["Reserve Ratios", "Pro-Rata Rights", "Dilution"], desc: "Allocating 50-60% of fund reserves to winners while avoiding dilution traps." }
        ],
        milestoneTitle: "$100M Fund Life-Cycle Model", milestoneDesc: "10-Year LP Cash-Flow Simulator", milestoneFeatures: ["Dynamic Capital Call Schedule", "Fee Recycling Provisions", "Follow-on Allocation Matrix"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Waterfall Mechanics, Carve-Outs & LP Returns", subtitle: "MONTH 3", color: "purple",
        modules: [
          { code: "M3", title: "Waterfall Calculation (European vs American)", weeks: "Weeks 7-9", icon: "GitFork", color: "purple", tags: ["Whole-Fund vs Deal-by-Deal", "GP Catch-up", "Clawback"], desc: "Modeling hurdle rates, 80/20 distributions, and clawback provisions." },
          { code: "M4", title: "Fund Benchmark Metrics & J-Curve", weeks: "Weeks 10-12", icon: "BarChart", color: "emerald", tags: ["Net IRR", "DPI / TVPI", "PitchBook Quartiles"], desc: "Evaluating vintage year benchmarks, J-curve emergence, and LP reporting packs." }
        ],
        milestoneTitle: "Full Institutional Waterfall Engine", milestoneDesc: "Comprehensive LP/GP Distribution Engine", milestoneFeatures: ["Automated 8% Hurdle Calculation", "American vs European Mode", "Sensitivity Matrix"]
      }
    ],
    techStack: {
      client: { title: "Python & Excel/Sheets", icon: "Code2", desc: "Modeling Stack", tags: ["Python 3.12", "Polars", "OpenPyXL", "Financial Modeling"] },
      server: { title: "FastAPI & Cashflow Engine", icon: "Server", desc: "API Service", tags: ["FastAPI", "Numpy Financial", "Pydantic"] },
      database: { title: "PostgreSQL", icon: "Database", desc: "Fund Data Store", type: "Relational", platform: "Managed" },
      devops: ["Docker", "Google Sheets API", "GitHub Actions"]
    },
    projects: [
      { icon: "Coins", title: "Dynamic $150M Early-Stage VC Fund Model", tag: "VC MODELING", desc: "An institutional-grade portfolio construction model with 30-seed investments, Series A/B reserve modeling, and Monte Carlo exit outcome simulations.", features: ["Power Law Exit Distribution", "Pro-Rata Exercise Simulator", "Net LP Return Analysis"], borderColor: "border-indigo-500/30" },
      { icon: "GitFork", title: "European Waterfall Distribution Calculator", tag: "LP OPERATIONS", desc: "Financial computation engine determining exact cash allocations between LPs and GPs upon $1B exit events with hurdle rates and GP catch-up.", features: ["8% Hurdle Compounding", "GP Clawback Tracking", "Exportable LP Cap Table Statements"], borderColor: "border-purple-500/30" }
    ],
    careerOutcomes: "VC Associate / Principal, Venture Fund CFO, Platform Operations Lead ($160k-$320k + Carry)"
  },

  "ai-powered-deal-sourcing-diligence": {
    title: "AI-Powered Deal Sourcing & Diligence",
    tagline: "Autonomous Data Scraping, Signal Detection & Thesis Graphs",
    duration: "3 Months",
    overview: "Modern venture capital firms (SignalFire, Coatue, a16z) operate like technology companies. Master automated deal sourcing: web-scale signal extraction (GitHub stars velocity, LinkedIn headcount inflection, patent registrations), financial statement and pitch deck parsing with LLMs, and automated competitive intelligence graphs.",
    objectives: [
      { num: "01", color: "purple", icon: "Search", title: "Breakout Signal Detection", desc: "Identify high-velocity startups before they pitch via GitHub star spikes, App Store ratings, and hiring ramps." },
      { num: "02", color: "pink", icon: "FileText", title: "Automated Deck & Financial Parsing", desc: "Extract cap tables, unit economics, and MRR metrics from PDF pitch decks and Excel models using LLMs." },
      { num: "03", color: "indigo", icon: "Share2", title: "Thesis Knowledge Graphs", desc: "Construct market map graphs connecting competitors, founders, co-investors, and enterprise buyer tech stacks." },
      { num: "04", color: "emerald", icon: "CheckCircle", title: "Automated Investment Memos", desc: "Synthesize customer reviews, market sizing (TAM/SAM/SOM), and risk analysis into drafted investment memos." }
    ],
    outcomes: [
      { label: "CLO 01", color: "purple", icon: "Award", title: "Data-Driven VC Engineer", desc: "Build automated deal sourcing radars and diligence engines for top-tier investment committees." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Signal Ingestion, Scraping & Anomaly Detection", subtitle: "MONTHS 1-2", color: "purple",
        modules: [
          { code: "M1", title: "High-Frequency Developer & Talent Feeds", weeks: "Weeks 1-3", icon: "Search", color: "purple", tags: ["GitHub GraphQL", "Headcount Scraping", "ProductHunt"], desc: "Scraping non-obvious traction signals and alerting when velocity crosses statistical thresholds." },
          { code: "M2", title: "Multimodal Pitch Deck Extraction", weeks: "Weeks 4-6", icon: "FileText", color: "pink", tags: ["LlamaParse", "Vision LLMs", "JSON Extraction"], desc: "Extracting financials, traction charts, and team bios into validated structured schemas." }
        ],
        milestoneTitle: "Autonomous Sourcing Radar", milestoneDesc: "Daily Early-Stage Founder Alert Engine", milestoneFeatures: ["GitHub Velocity Scoring", "Automated Deduplication", "Slack/Notion Webhook Alerts"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Automated Diligence & Investment Memo Generation", subtitle: "MONTH 3", color: "indigo",
        modules: [
          { code: "M3", title: "Competitive Landscape Mapping", weeks: "Weeks 7-9", icon: "Share2", color: "indigo", tags: ["Neo4j", "Vector Clustering", "Market Maps"], desc: "Automating 2x2 competitive positioning quadrants and competitor pricing scrapes." },
          { code: "M4", title: "Investment Committee Memo Agent", weeks: "Weeks 10-12", icon: "CheckCircle", color: "emerald", tags: ["LangGraph", "TAM Verification", "Risk Analysis"], desc: "Generating comprehensive 10-page IC memos complete with peer multiples and risk considerations." }
        ],
        milestoneTitle: "End-to-End VC Diligence Copilot", milestoneDesc: "Autonomous Diligence Suite", milestoneFeatures: ["Automated TAM/SAM/SOM Engine", "Unit Economic Sanity Checker", "Drafted IC Memo"]
      }
    ],
    techStack: {
      client: { title: "Next.js & TailwindCSS", icon: "Code2", desc: "Deal Flow CRM", tags: ["React", "Next.js", "Radix UI"] },
      server: { title: "Python & LangChain", icon: "Server", desc: "Sourcing Core", tags: ["FastAPI", "LlamaIndex", "BeautifulSoup", "Playwright"] },
      database: { title: "Supabase & Neo4j", icon: "Database", desc: "Deal Database", type: "Postgres + Graph", platform: "Cloud" },
      devops: ["Docker", "Modal.com / Modal Labs", "GitHub Actions"]
    },
    projects: [
      { icon: "Search", title: "Autonomous GitHub Developer Traction Radar", tag: "DEAL SOURCING", desc: "A pipeline tracking 200,000 open-source repositories to flag breakout tools experiencing >500% weekly star growth before seed funding rounds.", features: ["Star Velocity Tracking", "Founder Social Profiling", "Slack Instant Alerts"], borderColor: "border-purple-500/30" },
      { icon: "FileText", title: "Pitch Deck Diligence & Unit Economics Verifier", tag: "DILIGENCE AI", desc: "AI assistant that ingests startup decks and raw Stripe export CSVs, recalculates churn, CAC payback, and LTV, and outputs a 10-page Investment Committee memo.", features: ["Cohort Retention Re-calculation", "Market Sizing Validator", "Competitor Grid Synthesizer"], borderColor: "border-pink-500/30" }
    ],
    careerOutcomes: "Data-Driven VC Investor, Head of Venture Engineering, Growth Equity Associate ($170k-$310k)"
  },

  "cap-table-engineering-valuation": {
    title: "Cap Table Engineering & Valuation",
    tagline: "SAFEs, Option Pools, 409A & Anti-Dilution Modeling",
    duration: "3 Months",
    overview: "Founders and investors regularly lose millions due to poor cap table planning. Master equity math: pre-money vs post-money SAFEs with valuation caps and discounts, the unallocated option pool shuffle, pro-rata calculation, convertible notes with accrued interest, liquidation preferences, and down-round anti-dilution protections.",
    objectives: [
      { num: "01", color: "emerald", icon: "PieChart", title: "SAFE & Convertible Note Math", desc: "Calculate exact ownership dilution from pre-money vs YC post-money SAFEs and MFN clauses." },
      { num: "02", color: "blue", icon: "Scissors", title: "The Option Pool Shuffle", desc: "Understand whether the 10-15% ESOP pool comes from the founders' pocket or pre-money shares." },
      { num: "03", color: "purple", icon: "Layers", title: "Liquidation Preferences", desc: "Model 1x non-participating vs participating preferences and senior vs pari-passu tiers." },
      { num: "04", color: "rose", icon: "ShieldAlert", title: "Anti-Dilution & Down Rounds", desc: "Implement Broad-Based Weighted Average, Narrow-Based, and Full Ratchet anti-dilution formulas." }
    ],
    outcomes: [
      { label: "CLO 01", color: "emerald", icon: "Award", title: "Cap Table & Equity Architect", desc: "Model multi-round startup funding rounds with bulletproof mathematical precision." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Seed Rounds, Post-Money SAFEs & Pool Expansion", subtitle: "MONTHS 1-2", color: "emerald",
        modules: [
          { code: "M1", title: "Pre-Money vs Post-Money SAFE Dynamics", weeks: "Weeks 1-3", icon: "PieChart", color: "emerald", tags: ["YC Post-Money SAFE", "Valuation Cap", "Discount Rates"], desc: "Why stacking multiple pre-money SAFEs dilutes founders exponentially more than expected." },
          { code: "M2", title: "Option Pool Expansion & Series A Modeling", weeks: "Weeks 4-6", icon: "Scissors", color: "blue", tags: ["ESOP Sizing", "Effective Price Per Share", "Fully Diluted"], desc: "Negotiating the option pool sizing and calculating accurate share counts before round closes." }
        ],
        milestoneTitle: "Seed to Series A Cap Table Model", milestoneDesc: "Multi-Round Dilution Calculator", milestoneFeatures: ["YC Post-Money SAFE Stack", "Option Pool Sizing Simulator", "Price-Per-Share Derivation"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Liquidation Waterfalls & Down-Round Protection", subtitle: "MONTH 3", color: "purple",
        modules: [
          { code: "M3", title: "Liquidation Preference Waterfalls", weeks: "Weeks 7-9", icon: "Layers", color: "purple", tags: ["1x Non-Participating", "Participating Preferred", "Caps"], desc: "Simulating who gets paid what across a $10M, $50M, or $200M acquisition scenario." },
          { code: "M4", title: "Anti-Dilution Ratchets in Down Rounds", weeks: "Weeks 10-12", icon: "ShieldAlert", color: "rose", tags: ["Broad-Based Weighted Average", "Full Ratchet", "Pay-to-Play"], desc: "Protecting earlier investors during down rounds and calculating adjusted conversion ratios." }
        ],
        milestoneTitle: "Full Startup Exit Waterfall Simulator", milestoneDesc: "Exit Outcome Sensitivity Matrix", milestoneFeatures: ["Multi-Tier Liquidation Waterfall", "Weighted Average Anti-Dilution", "Common vs Preferred Payout Graphs"]
      }
    ],
    techStack: {
      client: { title: "TypeScript & React", icon: "Code2", desc: "Interactive Cap Table", tags: ["Next.js", "Zustand", "Recharts"] },
      server: { title: "Python Financial Core", icon: "Server", desc: "Calculation API", tags: ["FastAPI", "Decimal.js", "Pydantic"] },
      database: { title: "PostgreSQL", icon: "Database", desc: "Security Ledger", type: "Relational", platform: "Supabase" },
      devops: ["Docker", "Vercel", "GitHub Actions"]
    },
    projects: [
      { icon: "PieChart", title: "Interactive Multi-Round Cap Table Simulator", tag: "EQUITY TOOL", desc: "Web app modeling a startup's journey from Incorporator Shares to Seed SAFEs, Series A, and Series B with live visual dilution pie charts.", features: ["Post-Money SAFE Stacking", "Interactive Option Pool Slider", "Investor ROI Tracking"], borderColor: "border-emerald-500/30" },
      { icon: "Layers", title: "M&A Acquisition Waterfall Distribution Modeler", tag: "EXIT MODEL", desc: "Detailed exit model calculating net proceeds for founders, early employees, and preferred investors across 100 exit price scenarios with 1x/2x liquidation preferences.", features: ["Participating vs Non-Participating", "Common Stock Crossover Points", "Carried Interest Offsets"], borderColor: "border-purple-500/30" }
    ],
    careerOutcomes: "Startup CFO, Venture Legal Specialist, Chief of Staff, M&A Analyst ($160k-$290k)"
  },

  // ==========================================
  // 3. GROWTH, MARKETING & MARTECH
  // ==========================================
  "ai-growth-engineering": {
    title: "AI Growth Engineering",
    tagline: "Autonomous Funnels, Churn Prediction & Multi-Arm Bandits",
    duration: "4 Months",
    overview: "Growth is no longer about gut feelings; it is an engineering discipline driven by machine learning and behavioral feedback loops. Master Bayesian multi-armed bandit experimentation (replacing traditional slow A/B tests), predictive churn classification, uplift modeling, dynamic pricing engines, and autonomous re-engagement loops.",
    objectives: [
      { num: "01", color: "rose", icon: "Split", title: "Bayesian Bandits vs A/B Testing", desc: "Deploy Thompson Sampling and Upper Confidence Bound (UCB) algorithms to automatically divert traffic to winning variations in real time." },
      { num: "02", color: "pink", icon: "UserMinus", title: "Predictive Churn & Uplift Modeling", desc: "Train XGBoost models on product telemetry to identify churn risk 30 days before user cancellation." },
      { num: "03", color: "purple", icon: "Zap", title: "Dynamic Personalization & Pricing", desc: "Build real-time feature stores and propensity scoring to personalize onboarding and pricing tiers." },
      { num: "04", color: "emerald", icon: "Repeat", title: "Autonomous Viral Loops", desc: "Architect referral loops, behavioral triggers, and programmatic re-activation notifications." }
    ],
    outcomes: [
      { label: "CLO 01", color: "rose", icon: "Award", title: "Staff Growth Engineer", desc: "Engineer autonomous systems driving millions in recurring revenue through algorithmic optimization." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Bandit Experimentation & Behavioral Telemetry", subtitle: "MONTHS 1-2", color: "rose",
        modules: [
          { code: "M1", title: "Event Tracking & Customer Data Plane", weeks: "Weeks 1-4", icon: "Activity", color: "rose", tags: ["PostHog", "Snowplow", "Clickstream"], desc: "Instrumenting client and server events with strict schemas and sub-10ms delivery." },
          { code: "M2", title: "Thompson Sampling Multi-Armed Bandits", weeks: "Weeks 5-8", icon: "Split", color: "pink", tags: ["Thompson Sampling", "Beta Distributions", "Regret Minimization"], desc: "Writing real-time bandit services that minimize opportunity cost compared to static A/B tests." }
        ],
        milestoneTitle: "Real-Time Multi-Armed Bandit Experimenter", milestoneDesc: "Sub-5ms Bandit Routing Engine", milestoneFeatures: ["Thompson Sampling Algorithm", "Automated Traffic Reallocation", "Sub-5ms Latency"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Machine Learning Churn & Dynamic Onboarding", subtitle: "MONTHS 3-4", color: "purple",
        modules: [
          { code: "M3", title: "Uplift & Churn Risk Classification", weeks: "Weeks 9-12", icon: "UserMinus", color: "purple", tags: ["XGBoost", "SHAP Values", "Uplift Modeling"], desc: "Identifying customers who will only retain if contacted, avoiding wasteful promotional discounting." },
          { code: "M4", title: "Autonomous Lifecycle Orchestration", weeks: "Weeks 13-16", icon: "Repeat", color: "emerald", tags: ["Customer.io / Resend", "Webhooks", "AI Copy Generation"], desc: "Triggering bespoke personalized re-activation journeys generated via LLMs based on user behavior." }
        ],
        milestoneTitle: "Full-Loop Autonomous Growth Engine", milestoneDesc: "End-to-End Growth Pipeline", milestoneFeatures: ["Predictive Churn Scorer (ROC-AUC > 0.88)", "Personalized AI Re-engagement", "PostHog Integration"]
      }
    ],
    techStack: {
      client: { title: "TypeScript & React", icon: "Code2", desc: "App Telemetry", tags: ["PostHog JS", "React", "Next.js"] },
      server: { title: "Python & FastAPI", icon: "Server", desc: "Growth Core", tags: ["FastAPI", "XGBoost", "SciPy", "Redis"] },
      database: { title: "ClickHouse & PostgreSQL", icon: "Database", desc: "Event Lakehouse", type: "Event Store", platform: "High Volume" },
      devops: ["Docker", "Customer.io", "Airflow / Dagster", "GitHub Actions"]
    },
    projects: [
      { icon: "Split", title: "Thompson Sampling Headline & Landing Page Bandit", tag: "EXPERIMENTATION", desc: "An intelligent edge routing service on Cloudflare Workers dynamically balancing traffic across 10 landing page variations to maximize trial conversions.", features: ["Bayesian Posterior Updates", "Zero-Latency Edge Execution", "Automated Winner Lock"], borderColor: "border-rose-500/30" },
      { icon: "UserMinus", title: "SaaS Proactive Churn Prediction & Winback Bot", tag: "RETENTION ML", desc: "Machine learning pipeline scoring 100,000 active SaaS subscribers daily on churn propensity and triggering autonomous concierge outreach before cancellation.", features: ["XGBoost Telemetry Classifier", "SHAP Feature Attribution", "Automated Outreach Triggers"], borderColor: "border-purple-500/30" }
    ],
    careerOutcomes: "Growth Engineer, Head of Growth Engineering, Data-Driven Growth Lead ($180k-$310k)"
  },

  "programmatic-seo-content-engines": {
    title: "Programmatic SEO & Content Engines",
    tagline: "Scalable Data-Driven Pages, Keyword Clusters & AI Editorial",
    duration: "3 Months",
    overview: "How companies like Zapier, TripAdvisor, and Wise dominate Google: Programmatic SEO. Instead of manually writing 50 articles, build automated data pipelines that generate 50,000 high-intent, indexable, schema-compliant pages. Master keyword clustering, Next.js ISR (Incremental Static Regeneration), structured data (Schema.org), and AI editorial verification.",
    objectives: [
      { num: "01", color: "cyan", icon: "Search", title: "Keyword Clustering & Intent Mapping", desc: "Cluster 100k search queries by searcher intent using semantic embeddings and SERP scraping." },
      { num: "02", color: "blue", icon: "Layers", title: "Next.js ISR Page Generation", desc: "Build dynamic page templates using Next.js Incremental Static Regeneration that scale to 100k+ URLs." },
      { num: "03", color: "purple", icon: "Code2", title: "Structured Data (Schema.org)", desc: "Implement rich schema markup (Product, FAQ, Review, HowTo) for Google rich snippet search dominance." },
      { num: "04", color: "emerald", icon: "CheckCircle", title: "Quality Guardrails & Anti-Spam", desc: "Enforce Google Helpful Content guidelines, zero-hallucination factual grounding, and canonical URL hygiene." }
    ],
    outcomes: [
      { label: "CLO 01", color: "cyan", icon: "Award", title: "Programmatic SEO Architect", desc: "Build automated organic traffic engines driving millions of monthly organic search visitors." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Dataset Curation, Keyword Clustering & Next.js ISR", subtitle: "MONTHS 1-2", color: "cyan",
        modules: [
          { code: "M1", title: "Keyword Clustering with Embeddings", weeks: "Weeks 1-3", icon: "Search", color: "cyan", tags: ["BERTopic", "OpenAI Embeddings", "SERP APIs"], desc: "Grouping search queries into logical taxonomy templates and programmatic URL parameters." },
          { code: "M2", title: "High-Performance Next.js ISR Architecture", weeks: "Weeks 4-6", icon: "Layers", color: "blue", tags: ["Next.js App Router", "getStaticPaths", "Cache-Control"], desc: "Generating and updating 50,000 pages on demand without crashing build servers." }
        ],
        milestoneTitle: "10,000 URL Programmatic Directory", milestoneDesc: "Next.js ISR Scalable Architecture", milestoneFeatures: ["Sub-50ms TTFB", "Automated Sitemap Generation", "Dynamic Breadcrumbs"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Rich Snippets, AI Editorial & Internal Link Graphs", subtitle: "MONTH 3", color: "purple",
        modules: [
          { code: "M3", title: "Schema.org & Internal Link Optimization", weeks: "Weeks 7-9", icon: "Code2", color: "purple", tags: ["JSON-LD", "PageRank Silos", "Anchor Text"], desc: "Maximizing internal link equity distribution across programmatic parent/child pages." },
          { code: "M4", title: "Google Helpful Content Compliance & Monitoring", weeks: "Weeks 10-12", icon: "CheckCircle", color: "emerald", tags: ["Google Search Console API", "Indexation Tracking"], desc: "Monitoring indexation rates, soft 404 detection, and algorithmic penalty avoidance." }
        ],
        milestoneTitle: "Enterprise Programmatic Search Engine", milestoneDesc: "Autonomous Content Infrastructure", milestoneFeatures: ["JSON-LD Rich Snippet Verification", "Automated GSC Index Monitor", "Zero-Thin Content Flagging"]
      }
    ],
    techStack: {
      client: { title: "Next.js & TailwindCSS", icon: "Code2", desc: "SEO Frontend", tags: ["Next.js 15", "React Server Components", "TailwindCSS"] },
      server: { title: "Python & Node.js", icon: "Server", desc: "Data Pipeline", tags: ["FastAPI", "Pandas", "Cheerio"] },
      database: { title: "PostgreSQL & Redis", icon: "Database", desc: "Dataset Store", type: "Relational", platform: "Supabase" },
      devops: ["Vercel", "Google Search Console API", "Ahrefs API", "GitHub Actions"]
    },
    projects: [
      { icon: "Search", title: "Global Software Integration Directory (Zapier Style)", tag: "PROGRAMMATIC SEO", desc: "A 25,000-page automated directory generating pairwise 'How to Connect Tool A to Tool B' guides with live API schema documentation.", features: ["Automated Dynamic Screenshots", "Rich FAQ JSON-LD Snippets", "99.8% Google Indexation"], borderColor: "border-cyan-500/30" },
      { icon: "Layers", title: "B2B SaaS Pricing Benchmark Engine", tag: "ORGANIC GROWTH", desc: "Data-driven programmatic site aggregating public pricing and feature comparisons for 5,000 enterprise tools, capturing high-intent commercial queries.", features: ["Automated Web Scrapers", "Semantic Internal Silo Links", "Daily XML Sitemap Updater"], borderColor: "border-blue-500/30" }
    ],
    careerOutcomes: "Programmatic SEO Lead, Organic Growth Architect, Head of Organic Acquisition ($150k-$280k)"
  },

  "martech-multi-touch-attribution": {
    title: "MarTech & Multi-Touch Attribution",
    tagline: "First-Party Data, Customer Data Platforms (CDPs) & Shapley Modeling",
    duration: "3 Months",
    overview: "With third-party cookies deprecated and Apple's ATT privacy frameworks active, simplistic last-click attribution is dead. Master modern MarTech: building first-party Customer Data Platforms (CDPs), server-side conversion tracking (Meta Conversions API, Google Ads CAPI), identity resolution across devices, and algorithmic multi-touch attribution using Shapley Values and Markov Chains.",
    objectives: [
      { num: "01", color: "rose", icon: "ShieldCheck", title: "Server-Side Conversion APIs (CAPI)", desc: "Bypass ad blockers and iOS privacy barriers by piping purchase conversions server-to-server." },
      { num: "02", color: "indigo", icon: "Users", title: "Identity Resolution & CDPs", desc: "Unify anonymous visitor cookies with authenticated user IDs into single persistent customer profiles." },
      { num: "03", color: "purple", icon: "PieChart", title: "Algorithmic Attribution Modeling", desc: "Move beyond last-touch: implement Markov Chain transition graphs and game-theoretic Shapley values." },
      { num: "04", color: "emerald", icon: "Activity", title: "Media Mix Modeling (MMM)", desc: "Combine attribution with Bayesian Media Mix Modeling (Meta Robyn / LightweightMMM) for macro budget allocation." }
    ],
    outcomes: [
      { label: "CLO 01", color: "rose", icon: "Award", title: "MarTech Architect", desc: "Design first-party data infrastructure and accurate attribution models for 8-figure marketing budgets." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Server-Side Tracking & First-Party CDPs", subtitle: "MONTHS 1-2", color: "rose",
        modules: [
          { code: "M1", title: "Meta CAPI & Google Offline Conversions", weeks: "Weeks 1-3", icon: "Activity", color: "rose", tags: ["Meta CAPI", "Google Enhanced Conversions", "Hashing"], desc: "Implementing SHA256 hashed customer identifiers with real-time event deduplication." },
          { code: "M2", title: "Customer Data Platform (CDP) & Identity Graphs", weeks: "Weeks 4-6", icon: "Users", color: "indigo", tags: ["RudderStack", "PostgreSQL", "Identity Resolution"], desc: "Linking multi-device touchpoints (mobile app, desktop web, offline POS) into unified profiles." }
        ],
        milestoneTitle: "Server-to-Server Conversion Engine", milestoneDesc: "Privacy-Preserving CAPI Pipeline", milestoneFeatures: ["99.9% Event Match Quality", "Zero Ad-Block Data Loss", "Real-Time Deduplication"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Shapley Values, Markov Attribution & Media Mix", subtitle: "MONTH 3", color: "purple",
        modules: [
          { code: "M3", title: "Markov Chain Removal Effect Attribution", weeks: "Weeks 7-9", icon: "PieChart", color: "purple", tags: ["Markov Chains", "Removal Effect", "Channel Valuation"], desc: "Calculating incremental conversion credit by measuring conversion drop when channels are removed." },
          { code: "M4", title: "Bayesian Media Mix Modeling (Meta Robyn)", weeks: "Weeks 10-12", icon: "ShieldCheck", color: "emerald", tags: ["Robyn", "Adstock Decay", "Diminishing Returns"], desc: "Estimating saturation curves and optimal budget reallocation without user-level tracking." }
        ],
        milestoneTitle: "Enterprise Attribution & Budget Allocation Dashboard", milestoneDesc: "Multi-Touch Attribution Suite", milestoneFeatures: ["Shapley Attribution Breakdown", "Markov Transition Matrix", "Media Mix Budget Recommender"]
      }
    ],
    techStack: {
      client: { title: "JavaScript & GTM", icon: "Code2", desc: "Tag Management", tags: ["Google Tag Manager Server-Side", "TypeScript"] },
      server: { title: "Python & Go", icon: "Server", desc: "Event Piping", tags: ["FastAPI", "Go", "Meta Graph API", "Google Ads API"] },
      database: { title: "ClickHouse & BigQuery", icon: "Database", desc: "Attribution Data Plane", type: "Cloud Warehouse", platform: "Google Cloud / AWS" },
      devops: ["Docker", "dbt", "Airflow", "Cloudflare Workers"]
    },
    projects: [
      { icon: "Activity", title: "Server-Side Event Gateway for E-Commerce", tag: "DATA PLATFORM", desc: "Cloudflare Worker intercepting checkout events and simultaneously firing validated conversions to Meta CAPI, Google Ads, and TikTok API with 100% deduplication.", features: ["Sub-20ms Edge Proxy", "Event ID Deduplication", "Enhanced Match Rate 9.2/10"], borderColor: "border-rose-500/30" },
      { icon: "PieChart", title: "Game-Theoretic Shapley Attribution Engine", tag: "MARTECH ALGO", desc: "Python pipeline analyzing 2,000,000 multi-channel touchpoint journeys to re-allocate $10M annual ad spend from over-credited retargeting to high-impact top-of-funnel channels.", features: ["Shapley Value Fair Allocation", "Markov Chain Transition Graph", "Interactive Streamlit Visualizer"], borderColor: "border-purple-500/30" }
    ],
    careerOutcomes: "MarTech Solutions Architect, Marketing Data Scientist, Head of Marketing Analytics ($170k-$300k)"
  },

  "performance-marketing-predictive-ltv": {
    title: "Performance Marketing & Predictive LTV",
    tagline: "Paid Media Bidding Algos, Creative Testing & Cohort Retention",
    duration: "3 Months",
    overview: "High-scale performance marketing is a quantitative optimization problem. Master algorithmic paid media: understanding Meta's Advantage+ and Google's Smart Bidding auction mechanics, creative matrix testing frameworks, triangular cohort retention analysis, and predicting 365-day Customer Lifetime Value (LTV) within the first 7 days using survival analysis models.",
    objectives: [
      { num: "01", color: "orange", icon: "Target", title: "Auction Mechanics & Smart Bidding", desc: "Master eCPM auctions, value-based bidding (tROAS), pacing algorithms, and creative fatigue curves." },
      { num: "02", color: "pink", icon: "Grid", title: "Creative Matrix & Hook Testing", desc: "Deploy systematic creative frameworks (Hook, Problem, Solution, CTA) with statistical significance stopping rules." },
      { num: "03", color: "blue", icon: "TrendingUp", title: "Triangular Cohort Analysis", desc: "Track net revenue retention, payback periods, and margin contribution across monthly acquisition cohorts." },
      { num: "04", color: "emerald", icon: "Cpu", title: "Predictive 365-Day LTV Modeling", desc: "Predict full-year LTV and CAC payback from Day 1 to Day 7 customer actions using BG/NBD and Gamma-Gamma models." }
    ],
    outcomes: [
      { label: "CLO 01", color: "orange", icon: "Award", title: "Quantitative Performance Lead", desc: "Scale paid acquisition to 8-figure annual budgets while maintaining profitable blended ROAS." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Auction Mechanics, Creative Systems & Cohorts", subtitle: "MONTHS 1-2", color: "orange",
        modules: [
          { code: "M1", title: "Meta Advantage+ & Google PMax Mechanics", weeks: "Weeks 1-3", icon: "Target", color: "orange", tags: ["eCPM Formula", "Value-Based Bidding", "Budget Pacing"], desc: "How platform bidding algorithms evaluate creative relevance, bid value, and estimated action rates." },
          { code: "M2", title: "Triangular Cohort Retention Analysis", weeks: "Weeks 4-6", icon: "TrendingUp", color: "blue", tags: ["Cohort Analysis", "Net Revenue Retention", "Payback Month"], desc: "Building heatmaps that track cumulative revenue per acquired user over 12-month periods." }
        ],
        milestoneTitle: "Automated Cohort Financial Tracker", milestoneDesc: "Multi-Cohort Revenue Matrix", milestoneFeatures: ["Live Payback Period Calculation", "Triangular Heatmap", "Blended vs Paid CAC Separation"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Predictive LTV Modeling & Creative Automation", subtitle: "MONTH 3", color: "emerald",
        modules: [
          { code: "M3", title: "BG/NBD & Gamma-Gamma Predictive LTV", weeks: "Weeks 7-9", icon: "Cpu", color: "emerald", tags: ["BG/NBD Model", "Gamma-Gamma", "Expected Transactions"], desc: "Forecasting future transaction counts and average order values for new customer cohorts." },
          { code: "M4", title: "Automated Creative Matrix Engine", weeks: "Weeks 10-12", icon: "Grid", color: "pink", tags: ["Remotion", "Creative Fatigue", "Dynamic Ad Assembly"], desc: "Generating and testing 50 video ad variations programmatically using Remotion and FFmpeg." }
        ],
        milestoneTitle: "Predictive LTV & Bid Optimization System", milestoneDesc: "Machine Learning LTV Forecaster", milestoneFeatures: ["Day-7 to Day-365 LTV Predictor", "Automated tROAS Bid Adjuster", "Creative Fatigue Alerting"]
      }
    ],
    techStack: {
      client: { title: "Streamlit & Plotly", icon: "Code2", desc: "Media Dashboard", tags: ["Streamlit", "Plotly", "React"] },
      server: { title: "Python Data Stack", icon: "Server", desc: "Analytics Core", tags: ["Lifetimes (BG/NBD)", "Polars", "Scikit-Learn"] },
      database: { title: "BigQuery / Snowflake", icon: "Database", desc: "Transactional Data", type: "Warehouse", platform: "GCP / AWS" },
      devops: ["Docker", "Meta Marketing API", "Google Ads API", "Remotion"]
    },
    projects: [
      { icon: "Cpu", title: "Day-7 Predictive Lifetime Value (pLTV) Predictor", tag: "PREDICTIVE ML", desc: "Machine learning model predicting 365-day cumulative customer spend using early onboarding events and initial cart behavior, feeding value-based bidding targets back to Meta.", features: ["BG/NBD Frequency Modeling", "Gamma-Gamma Monetary Value", "Automated Ad Platform Sync"], borderColor: "border-orange-500/30" },
      { icon: "Grid", title: "Programmatic Video Ad Matrix Generator", tag: "CREATIVE TECH", desc: "Automated video generation pipeline rendering 100 localized, formatted short-form video ads from modular asset buckets (hooks, b-roll, CTAs) via code.", features: ["Remotion React Rendering", "Automated Audio Ducking", "Direct Meta API Upload"], borderColor: "border-pink-500/30" }
    ],
    careerOutcomes: "Head of Performance Marketing, Quantitative Media Buyer, VP of Growth ($175k-$320k)"
  }
};

// Aliases for slug variations
curriculumDataBusiness["algo-trading-hft"] = curriculumDataBusiness["algorithmic-trading-hft-architecture"];
curriculumDataBusiness["quant-finance-risk-ai"] = curriculumDataBusiness["quantitative-finance-risk-ai"];
curriculumDataBusiness["fintech-core-ledger-systems"] = curriculumDataBusiness["fintech-ledger-payments-infrastructure"];
curriculumDataBusiness["fintech-ledger-payments"] = curriculumDataBusiness["fintech-ledger-payments-infrastructure"];
curriculumDataBusiness["defi-protocols-security"] = curriculumDataBusiness["defi-architecture-smart-contract-auditing"];
curriculumDataBusiness["vc-fund-economics"] = curriculumDataBusiness["venture-capital-fund-economics"];
curriculumDataBusiness["ai-deal-sourcing-diligence"] = curriculumDataBusiness["ai-powered-deal-sourcing-diligence"];
curriculumDataBusiness["cap-table-valuation-mechanics"] = curriculumDataBusiness["cap-table-engineering-valuation"];
curriculumDataBusiness["ai-growth-engineering"] = curriculumDataBusiness["ai-growth-engineering"];
curriculumDataBusiness["programmatic-seo-ai-pipelines"] = curriculumDataBusiness["programmatic-seo-content-engines"];
curriculumDataBusiness["martech-multi-touch-attribution"] = curriculumDataBusiness["martech-multi-touch-attribution"];
curriculumDataBusiness["performance-marketing-predictive-ltv"] = curriculumDataBusiness["performance-marketing-predictive-ltv"];
