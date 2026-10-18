export const curriculumDataInvesting = {
  // ==========================================
  // 1. BLOCKCHAIN (WEB 4.0 & DECENTRALIZED AI)
  // ==========================================
  "web-4-0-autonomous-ai-depin-networks": {
    title: "Web 4.0: Autonomous AI & DePIN Networks",
    tagline: "zkML, On-Chain Autonomous Agents & DePIN Infrastructure",
    duration: "4 Months",
    overview: "Web 4.0 is the symbiotic convergence of autonomous AI agents, decentralized physical infrastructure (DePIN), and high-throughput blockchains. Master Zero-Knowledge Machine Learning (zkML) verification, autonomous agent wallets (ERC-4337 Account Abstraction), machine-to-machine micropayments, Bittensor subnet incentive engineering, and high-concurrency Solana SVM development.",
    objectives: [
      { num: "01", color: "purple", icon: "Bot", title: "Autonomous Agent Wallets", desc: "Equip AI agents with self-custody wallets via Account Abstraction (ERC-4337) and programmatic spending limits." },
      { num: "02", color: "violet", icon: "Cpu", title: "zkML Model Verification", desc: "Prove AI model inference was executed faithfully without revealing proprietary weights using EZKL and Giza." },
      { num: "03", color: "blue", icon: "Network", title: "DePIN Network Architecture", desc: "Design token incentive flywheels and verifiable physical proofs for decentralized compute, storage, and wireless." },
      { num: "04", color: "emerald", icon: "Zap", title: "High-Throughput SVM (Solana)", desc: "Build sub-second parallelized settlement pipelines in Rust on the Solana Sealevel Virtual Machine." }
    ],
    outcomes: [
      { label: "CLO 01", color: "purple", icon: "Award", title: "Web 4.0 Systems Architect", desc: "Deploy autonomous on-chain agents and decentralized compute networks with cryptographic verifiability." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Agentic Account Abstraction & zkML", subtitle: "MONTHS 1-2", color: "purple",
        modules: [
          { code: "M1", title: "ERC-4337 & Paymasters for AI", weeks: "Weeks 1-4", icon: "Bot", color: "purple", tags: ["ERC-4337", "UserOperations", "Bundlers", "Session Keys"], desc: "Enabling autonomous agent transactions without seed phrase exposure using ephemeral session keys." },
          { code: "M2", title: "Zero-Knowledge Machine Learning (zkML)", weeks: "Weeks 5-8", icon: "Cpu", color: "violet", tags: ["EZKL", "ZK-SNARKs", "Quantization", "Model Proofs"], desc: "Generating cryptographic halo2 proofs of neural network predictions verified inside EVM smart contracts." }
        ],
        milestoneTitle: "Autonomous zkML Trading Agent", milestoneDesc: "Cryptographically Verified On-Chain Agent", milestoneFeatures: ["ERC-4337 Session Key Wallet", "EVM-Verified ZK Neural Inference", "Sub-100ms Execution"]
      },
      {
        id: "phase2", name: "PHASE II", title: "DePIN Infrastructure & Solana SVM", subtitle: "MONTHS 3-4", color: "emerald",
        modules: [
          { code: "M3", title: "DePIN Token Flywheels & Proof-of-Workload", weeks: "Weeks 9-12", icon: "Network", color: "emerald", tags: ["Bittensor Subnets", "Proof-of-Physical", "IoTeX"], desc: "Engineering emission schedules, Yuma consensus, and reward distribution for distributed GPU clusters." },
          { code: "M4", title: "Rust SVM Development (Solana)", weeks: "Weeks 13-16", icon: "Zap", color: "blue", tags: ["Anchor", "Solana SVM", "Parallel State", "Token-2022"], desc: "Writing memory-safe Anchor programs handling 2,000+ transactions per second with low compute units." }
        ],
        milestoneTitle: "Decentralized AI Compute Marketplace", milestoneDesc: "Production DePIN Protocol on Solana", milestoneFeatures: ["GPU Verification Protocol", "Sub-Second Micro-Payment Settlement", "Anchor Test Suite"]
      }
    ],
    techStack: {
      client: { title: "TypeScript & Web3.js", icon: "Code2", desc: "Client Interface", tags: ["Solana Web3.js", "Viem", "Next.js 15"] },
      server: { title: "Rust & Python", icon: "Terminal", desc: "Core Engine", tags: ["Anchor", "Rust 1.78", "EZKL", "FastAPI"] },
      database: { title: "Solana RPC & IPFS", icon: "Database", desc: "State & Storage", type: "Decentralized", platform: "Helius / QuickNode" },
      devops: ["Docker", "Anchor CLI", "Bittensor SDK", "GitHub Actions"]
    },
    projects: [
      { icon: "Bot", title: "Autonomous Machine-to-Machine Energy Settlement Grid", tag: "WEB 4.0 DEPIN", desc: "A DePIN IoT protocol where autonomous electric vehicle chargers negotiate dynamic kilowatt prices with solar storage batteries and settle via instant Solana micro-transactions.", features: ["Session Key Security", "Dynamic Pricing Oracle", "Sub-400ms Confirmation"], borderColor: "border-purple-500/30" },
      { icon: "Cpu", title: "Zero-Knowledge Credit Scoring Protocol", tag: "ZKML SYSTEM", desc: "zkML pipeline that computes a user's credit score from private financial history and generates a succinct ZK proof verified on Ethereum without revealing sensitive bank records.", features: ["EZKL PyTorch Compilation", "On-Chain Verifier Contract", "Zero Data Leakage"], borderColor: "border-violet-500/30" }
    ],
    careerOutcomes: "Web 4.0 Engineer, DePIN Protocol Architect, zkML Research Specialist ($210k-$420k)"
  },

  "zero-knowledge-proofs-modular-rollups": {
    title: "Zero-Knowledge Proofs & Modular Rollups",
    tagline: "zk-SNARKs, Data Availability & EigenLayer Restaking",
    duration: "4 Months",
    overview: "Monolithic blockchains have given way to the Modular Blockchain Stack. Master zk-SNARK mathematics (polynomial commitments, PLONK, Plonky3), Data Availability layers (Celestia, EigenDA), Actively Validated Services (AVS) on EigenLayer restaking, and building custom high-throughput zk-Rollups.",
    objectives: [
      { num: "01", color: "indigo", icon: "Binary", title: "ZK Proof Mathematics", desc: "Master finite fields, elliptic curves, KZG commitments, arithmetization, and Plonky3." },
      { num: "02", color: "purple", icon: "Layers", title: "Modular Architecture", desc: "Decouple Execution (Rollup), Settlement (Ethereum), and Data Availability (Celestia)." },
      { num: "03", color: "blue", icon: "ShieldCheck", title: "EigenLayer Restaking & AVS", desc: "Harness Ethereum's pooled economic security to build decentralized oracles and bridges." },
      { num: "04", color: "emerald", icon: "Boxes", title: "Rollup-as-a-Service (RaaS)", desc: "Deploy sovereign and optimistic/ZK application-specific rollups (app-chains) with sub-10ms blocks." }
    ],
    outcomes: [
      { label: "CLO 01", color: "indigo", icon: "Award", title: "Modular Protocol Engineer", desc: "Architect custom zero-knowledge rollups and decentralized restaking services." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "zk-SNARKs & Circuit Programming", subtitle: "MONTHS 1-2", color: "indigo",
        modules: [
          { code: "M1", title: "Arithmetization & Circom / Noir", weeks: "Weeks 1-4", icon: "Binary", color: "indigo", tags: ["R1CS", "Circom", "Noir", "Witness Generation"], desc: "Writing zero-knowledge circuits for private identity and proof of solvency." },
          { code: "M2", title: "Polynomial Commitments & Plonky3", weeks: "Weeks 5-8", icon: "Cpu", color: "purple", tags: ["Plonky3", "FRI Protocol", "Recursive Proofs"], desc: "Constructing ultra-fast recursive proofs that compress millions of transactions into single bytes." }
        ],
        milestoneTitle: "Private Asset Transfer zk-Circuit", milestoneDesc: "Noir/Circom ZK Engine", milestoneFeatures: ["KZG Trusted Setup", "On-Chain EVM Verifier", "Sub-Second Proving Time"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Celestia DA, EigenLayer & Rollup Deployment", subtitle: "MONTHS 3-4", color: "emerald",
        modules: [
          { code: "M3", title: "Data Availability (Celestia & EigenDA)", weeks: "Weeks 9-12", icon: "Layers", color: "blue", tags: ["Erasure Coding", "Blobspace", "Namespaced Merkle Trees"], desc: "Submitting rollup transaction blobs with fraud/validity guarantees at 99% lower cost than L1." },
          { code: "M4", title: "EigenLayer AVS & Restaking Mechanics", weeks: "Weeks 13-16", icon: "ShieldCheck", color: "emerald", tags: ["EigenLayer", "Slashing Conditions", "Operator Sets"], desc: "Writing Actively Validated Services leveraging staked ETH for hyper-secure off-chain compute." }
        ],
        milestoneTitle: "Production Modular App-Rollup", milestoneDesc: "High-Throughput Modular ZK-Rollup", milestoneFeatures: ["Celestia DA Integration", "EigenLayer Restaked Sequencer", "Recursive ZK Proof Aggregator"]
      }
    ],
    techStack: {
      client: { title: "Rust & TypeScript", icon: "Code2", desc: "Circuit Interface", tags: ["Noir", "Circom", "SnarkJS", "Ethers"] },
      server: { title: "Rust & Go", icon: "Terminal", desc: "Rollup Sequencer", tags: ["Rust", "Plonky3", "Rollkit", "OP Stack"] },
      database: { title: "Celestia & RocksDB", icon: "Database", desc: "Blobspace & State", type: "Data Availability", platform: "Modular Network" },
      devops: ["Docker", "EigenLayer CLI", "Kurtosis", "GitHub Actions"]
    },
    projects: [
      { icon: "Layers", title: "Privacy-Preserving DeFi App-Chain on Celestia", tag: "MODULAR ZK", desc: "A customized application rollup that batches 10,000 transactions/second, posts transaction blobs to Celestia, and validates state via Plonky3 recursive proofs.", features: ["Erasure-Coded DA", "Sub-Cent Gas Fees", "Instant Soft Finality"], borderColor: "border-indigo-500/30" },
      { icon: "ShieldCheck", title: "Restaked Decentralized Oracle Network (EigenLayer AVS)", tag: "EIGENLAYER AVS", desc: "An Actively Validated Service where registered operators stake $25M in restaked ETH to guarantee microsecond financial market price feeds under threat of slashing.", features: ["Slashing Verification", "Multi-Operator Quorum", "Sub-100ms Price Update"], borderColor: "border-purple-500/30" }
    ],
    careerOutcomes: "ZK Cryptographer, Modular Blockchain Engineer, Protocol Research Scientist ($230k-$460k)"
  },

  // ==========================================
  // 2. QUANTITATIVE TRADING (FRONTIER ML)
  // ==========================================
  "quantitative-trading-ml-alpha-execution": {
    title: "Quantitative Trading: ML Alpha & Execution",
    tagline: "Alternative Data, Deep RL Execution & Multi-Asset Stat-Arb",
    duration: "4 Months",
    overview: "Quantitative trading has evolved from simple technical indicators to multi-asset machine learning alpha pipelines. Master cross-sectional equity alpha generation, processing alternative data feeds (consumer transaction logs, satellite imagery, corporate earnings sentiment), Reinforcement Learning for execution, and dynamic Kelly portfolio sizing.",
    objectives: [
      { num: "01", color: "blue", icon: "TrendingUp", title: "Cross-Sectional ML Alpha", desc: "Train LightGBM and Transformer models to forecast relative stock returns with cross-sectional rank loss." },
      { num: "02", color: "cyan", icon: "Database", title: "Alternative Data Pipelines", desc: "Extract non-obvious alpha signals from consumer credit card receipts, job posting velocity, and 10-K transcripts." },
      { num: "03", color: "purple", icon: "Cpu", title: "Deep RL for Execution", desc: "Train Proximal Policy Optimization (PPO) agents to execute large block orders while minimizing market impact." },
      { num: "04", color: "emerald", icon: "ShieldCheck", title: "Factor Neutralization & Sizing", desc: "Neutralize market beta, industry, and style factors using Barra risk matrices and fractional Kelly criterion." }
    ],
    outcomes: [
      { label: "CLO 01", color: "blue", icon: "Award", title: "Quantitative Trading Strategist", desc: "Design profitable statistical arbitrage systems with verified information coefficients (IC > 0.06)." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Feature Engineering & Cross-Sectional ML", subtitle: "MONTHS 1-2", color: "blue",
        modules: [
          { code: "M1", title: "Cross-Sectional Rank Alpha Models", weeks: "Weeks 1-4", icon: "TrendingUp", color: "blue", tags: ["LightGBM", "RankIC", "Purged K-Fold Cross Validation"], desc: "Preventing lookahead bias and overfitting with combinatorial purged cross-validation." },
          { code: "M2", title: "Alternative Data & Sentiment NLP", weeks: "Weeks 5-8", icon: "Database", color: "cyan", tags: ["SEC 8-K NLP", "Credit Card Data", "Feature Stores"], desc: "Converting unstructured text and transactional datasets into orthogonal predictive features." }
        ],
        milestoneTitle: "Multi-Factor Alpha Pipeline", milestoneDesc: "Production Alpha Generation Engine", milestoneFeatures: ["Information Coefficient > 0.07", "Zero Lookahead Leakage", "Automated Daily Rebalancing"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Deep RL Execution & Portfolio Optimization", subtitle: "MONTHS 3-4", color: "purple",
        modules: [
          { code: "M3", title: "Reinforcement Learning Order Execution", weeks: "Weeks 9-12", icon: "Cpu", color: "purple", tags: ["PPO", "Gymnasium", "Market Impact", "Slippage"], desc: "Training agents that dynamically time limit and market orders across changing volatility regimes." },
          { code: "M4", title: "Barra Risk Neutralization & Kelly Betting", weeks: "Weeks 13-16", icon: "ShieldCheck", color: "emerald", tags: ["Quadratic Programming", "Factor Betas", "Kelly Criterion"], desc: "Optimizing weights with cvxpy to maximize expected Sharpe while constraining net market beta to zero." }
        ],
        milestoneTitle: "Fully Autonomous Market-Neutral Stat-Arb Bot", milestoneDesc: "Institutional Strategy Deployment", milestoneFeatures: ["Zero Net Market Beta", "Sub-30ms Smart Slicing", "Expected Sharpe > 3.0"]
      }
    ],
    techStack: {
      client: { title: "Python & Plotly", icon: "Code2", desc: "Research & Monitoring", tags: ["Polars", "Plotly", "Streamlit"] },
      server: { title: "Ray & PyTorch", icon: "Server", desc: "Distributed Training", tags: ["Ray Core", "PyTorch 2.3", "LightGBM", "cvxpy"] },
      database: { title: "ClickHouse & DuckDB", icon: "Database", desc: "Analytics Warehouse", type: "Columnar", platform: "High Performance" },
      devops: ["Docker", "Weights & Biases", "Airflow", "Interactive Brokers API"]
    },
    projects: [
      { icon: "TrendingUp", title: "US Equities Market-Neutral Statistical Arbitrage Fund", tag: "STAT ARB", desc: "Long-short strategy trading the S&P 500 universe with 50 daily rebalanced positions, dynamic factor neutralization, and sub-10% maximum annual drawdown.", features: ["Barra Factor Neutralization", "Alternative Earnings Surprises Signal", "Sharpe Ratio 3.2"], borderColor: "border-blue-500/30" },
      { icon: "Cpu", title: "Deep RL Dynamic Smart Order Router", tag: "RL EXECUTION", desc: "Gymnasium-based reinforcement learning execution model that saves institutional funds $4.2M annually by intelligently splitting $50M block orders into optimal TWAP/VWAP slices.", features: ["Trained on Tick Data", "Adaptive Slippage Minimization", "Toxic Flow Avoidance"], borderColor: "border-purple-500/30" }
    ],
    careerOutcomes: "Quantitative Researcher, Systematic Portfolio Manager, Machine Learning Trader ($250k-$550k + Bonus)"
  },

  "order-execution-market-impact-modeling": {
    title: "Order Execution & Market Impact Modeling",
    tagline: "Smart Order Routing, Almgren-Chriss & Dark Pool Alpha",
    duration: "3 Months",
    overview: "When trading at institutional scale, executing large orders without moving market prices against yourself is everything. Master the foundational Almgren-Chriss optimal execution model, transaction cost analysis (TCA), iceberg order detection, dark pool routing, and building low-latency Smart Order Routers (SOR).",
    objectives: [
      { num: "01", color: "blue", icon: "Activity", title: "Almgren-Chriss Framework", desc: "Derive and solve the mathematical optimal trade scheduling trajectory balancing market impact vs timing risk." },
      { num: "02", color: "cyan", icon: "Shuffle", title: "Smart Order Routing (SOR)", desc: "Build algorithmic routing trees across lit exchanges (NYSE/NASDAQ) and unlit dark pools." },
      { num: "03", color: "indigo", icon: "Eye", title: "Iceberg & Hidden Order Detection", desc: "Detect institutional passive iceberg orders from order book replenishment patterns." },
      { num: "04", color: "emerald", icon: "Gauge", title: "Transaction Cost Analysis (TCA)", desc: "Benchmark execution quality against Implementation Shortfall, Arrival Price, and VWAP." }
    ],
    outcomes: [
      { label: "CLO 01", color: "blue", icon: "Award", title: "Execution Algorithms Engineer", desc: "Build algorithmic order routers and institutional transaction cost analytics systems." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Optimal Trajectories & Market Impact Math", subtitle: "MONTHS 1-2", color: "blue",
        modules: [
          { code: "M1", title: "Permanent vs Temporary Market Impact", weeks: "Weeks 1-3", icon: "Activity", color: "blue", tags: ["Square Root Law", "Temporary Impact", "Volatility Decay"], desc: "Calibrating empirical market impact parameters across low and high volatility stocks." },
          { code: "M2", title: "Almgren-Chriss Trajectory Optimization", weeks: "Weeks 4-6", icon: "TrendingUp", color: "cyan", tags: ["Optimal Scheduling", "Timing Risk", "Lagrangian Solvers"], desc: "Generating mathematically optimal liquidation and acquisition curves." }
        ],
        milestoneTitle: "Optimal Trade Trajectory Engine", milestoneDesc: "Almgren-Chriss Mathematical Solver", milestoneFeatures: ["Permanent/Temporary Cost Minimization", "Real-Time Volatility Tuning", "Custom Risk Aversion"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Smart Order Routing & Dark Pool Execution", subtitle: "MONTH 3", color: "indigo",
        modules: [
          { code: "M3", title: "Dark Pool Ping & Sweep Algos", weeks: "Weeks 7-9", icon: "Shuffle", color: "indigo", tags: ["Dark Pools", "Adverse Selection", "Midpoint Pegs"], desc: "Routing non-displayed orders to internalizers and dark venues while avoiding toxic flow." },
          { code: "M4", title: "Post-Trade TCA Analytics Engine", weeks: "Weeks 10-12", icon: "Gauge", color: "emerald", tags: ["Implementation Shortfall", "Slippage Attribution", "VWAP"], desc: "Decomposing execution cost into spread, market movement, and venue latency." }
        ],
        milestoneTitle: "High-Performance Smart Order Router", milestoneDesc: "Lit & Dark Venue SOR System", milestoneFeatures: ["Sub-50μs Routing Decision", "Adverse Selection Filter", "Automated TCA Reporting"]
      }
    ],
    techStack: {
      client: { title: "C++ & Python", icon: "Code2", desc: "Hybrid Stack", tags: ["C++20", "Python 3.12", "Polars"] },
      server: { title: "Low-Latency Engine", icon: "Terminal", desc: "Core Router", tags: ["Boost.Asio", "ZeroMQ", "gRPC"] },
      database: { title: "QuestDB", icon: "Database", desc: "Tick & Fill Data", type: "Time-Series", platform: "High Throughput" },
      devops: ["Docker", "Linux Perf", "Wireshark FIX", "Grafana"]
    },
    projects: [
      { icon: "Shuffle", title: "Institutional Smart Order Router (SOR) Simulator", tag: "EXECUTION TECH", desc: "Multi-exchange order router dynamically splitting $100M equity blocks across lit venues and dark pools to minimize adverse price impact.", features: ["Sub-30μs Venue Dispatch", "Dark Pool Midpoint Sniffing", "Automated Slippage Cap"], borderColor: "border-blue-500/30" },
      { icon: "Gauge", title: "Automated Post-Trade Transaction Cost Analysis (TCA) Platform", tag: "QUANT ANALYTICS", desc: "Real-time analytics engine calculating Implementation Shortfall and venue quality ratings across 500,000 executed orders per day.", features: ["Arrival Price Benchmark", "Venue Latency Breakdown", "Executive Slippage Dashboard"], borderColor: "border-cyan-500/30" }
    ],
    careerOutcomes: "Execution Trader, Smart Order Routing Architect, Electronic Trading Developer ($220k-$430k)"
  },

  // ==========================================
  // 3. HEDGE FUNDS (POD SHOPS & MULTI-STRAT)
  // ==========================================
  "multi-strategy-hedge-fund-architecture": {
    title: "Multi-Strategy Hedge Fund Architecture",
    tagline: "Pod Shop Risk Limits, Beta Neutrality & Capital Allocation",
    duration: "4 Months",
    overview: "Multi-strategy hedge funds (Citadel, Millennium, Point72, Balyasny) dominate the modern asset management industry. Master the pod shop operating model: autonomous Portfolio Manager (PM) pod architecture, strict factor beta neutrality, netting engines, borrow & repo financing, intraday drawdown stop-losses, and dynamic capital reallocation algorithms.",
    objectives: [
      { num: "01", color: "blue", icon: "Building2", title: "The Pod Shop Architecture", desc: "Understand capital allocation, netting of cross-pod positions, and the Pass-Through fee structure." },
      { num: "02", color: "red", icon: "ShieldAlert", title: "Strict Risk Mandates & Stop-Losses", desc: "Enforce catastrophic risk controls: 3% drawdown cuts pod capital by 50%; 5% drawdown triggers pod liquidation." },
      { num: "03", color: "purple", icon: "PieChart", title: "Factor Beta Neutralization", desc: "Enforce strict zero-beta tolerance to market direction, rates, oil, semiconductors, and size factors." },
      { num: "04", color: "emerald", icon: "Repeat", title: "Treasury, Financing & Prime Brokerage", desc: "Manage repo financing, margin borrowing, securities lending, and multi-prime broker relationships." }
    ],
    outcomes: [
      { label: "CLO 01", color: "blue", icon: "Award", title: "Hedge Fund Risk & Portfolio Architect", desc: "Design risk governance, netting platforms, and capital allocation frameworks for multi-manager funds." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Pod Allocations, Netting & Factor Risk", subtitle: "MONTHS 1-2", color: "blue",
        modules: [
          { code: "M1", title: "Pod Capital Allocation & Netting Engine", weeks: "Weeks 1-4", icon: "Building2", color: "blue", tags: ["Internal Cross-Matching", "Gross vs Net Leverage", "Netting"], desc: "Netting opposing long/short positions across 40 pods to save tens of millions in financing costs." },
          { code: "M2", title: "Intraday Factor Neutrality Monitoring", weeks: "Weeks 5-8", icon: "PieChart", color: "purple", tags: ["Axioma / Barra", "Factor Betas", "Style Constraints"], desc: "Alerting and automatically hedging when a pod drifts into directional or momentum factor exposure." }
        ],
        milestoneTitle: "Multi-Pod Internal Netting Engine", milestoneDesc: "Cross-Pod Capital & Financing Optimizer", milestoneFeatures: ["Zero Internal Financing Drag", "Intraday Gross/Net Leverage Tracking", "Automated Factor Hedges"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Drawdown Enforcement, Treasury & Prime Brokerage", subtitle: "MONTHS 3-4", color: "red",
        modules: [
          { code: "M3", title: "Automated Intraday Stop-Loss Liquidator", weeks: "Weeks 9-12", icon: "ShieldAlert", color: "red", tags: ["Drawdown Cuts", "Pod De-leveraging", "Emergency Unwind"], desc: "Enforcing programmatic risk rules that automatically unbundle and liquidate breaching portfolios." },
          { code: "M4", title: "Prime Broker Margin & Repo Optimization", weeks: "Weeks 13-16", icon: "Repeat", color: "emerald", tags: ["PB Financing", "Haircut Optimization", "Securities Lending"], desc: "Optimizing collateral across Goldman Sachs, Morgan Stanley, and J.P. Morgan prime brokers." }
        ],
        milestoneTitle: "Enterprise Multi-Manager Risk Engine", milestoneDesc: "Institutional Hedge Fund Platform", milestoneFeatures: ["Automated Pod De-leverager", "Multi-Prime Margin Router", "Real-Time PnL & Factor Attribution"]
      }
    ],
    techStack: {
      client: { title: "React & Ag-Grid", icon: "Code2", desc: "Risk Console", tags: ["Ag-Grid Enterprise", "TypeScript", "WebSocket"] },
      server: { title: "Python & Go", icon: "Server", desc: "Risk Engine", tags: ["Go 1.22", "FastAPI", "Polars", "Redis"] },
      database: { title: "PostgreSQL & ClickHouse", icon: "Database", desc: "Trade & PnL Store", type: "Hybrid OLTP/OLAP", platform: "Managed" },
      devops: ["Docker", "Kubernetes", "Temporal.io", "Prometheus"]
    },
    projects: [
      { icon: "Building2", title: "50-Pod Multi-Strategy Hedge Fund Risk Monitor", tag: "HEDGE FUND OPS", desc: "Real-time risk dashboard tracking $10B Gross Market Value (GMV) across 50 independent quantitative and fundamental pods with live factor beta alerts.", features: ["Intraday Factor Decomposition", "Automated Stop-Loss Warnings", "Cross-Pod Position Netting"], borderColor: "border-blue-500/30" },
      { icon: "ShieldAlert", title: "Automated Emergency Pod De-leveraging Protocol", tag: "RISK CONTROLS", desc: "Circuit-breaker system that programmatically reduces risk allocation by 50% upon 3% drawdown and initiates orderly market-neutral liquidation upon 5% drawdown.", features: ["Programmatic Unwind Schedule", "Market Impact Aware Slicing", "Zero Human Discretion Breach"], borderColor: "border-red-500/30" }
    ],
    careerOutcomes: "Chief Risk Officer, Hedge Fund Portfolio Manager, Quant Risk Strategist ($250k-$600k + Performance Pool)"
  },

  "global-macro-volatility-dispersion": {
    title: "Global Macro & Volatility Dispersion",
    tagline: "Variance Swaps, Correlation Trading & Central Bank Regime Shifts",
    duration: "4 Months",
    overview: "Global Macro and Volatility trading capture profits from central bank regime shifts, interest rate divergences, and the structural mispricing between index volatility and individual stock volatility. Master variance swaps, volatility dispersion arbitrage, swaptions, sovereign debt yield curve modeling, and foreign exchange (FX) carry trades.",
    objectives: [
      { num: "01", color: "teal", icon: "Activity", title: "Volatility Dispersion Trading", desc: "Exploit the mathematical spread between implied correlation and realized correlation by selling index vol and buying stock vol." },
      { num: "02", color: "cyan", icon: "TrendingUp", title: "Yield Curve & Rates Mechanics", desc: "Model sovereign yield curve steepeners, flatteners, and butterfly trades across US Treasuries and Bunds." },
      { num: "03", color: "blue", icon: "Globe", title: "Global Macro Regimes & FX Carry", desc: "Trade macroeconomic monetary policy divergences and interest rate differentials across G10 currencies." },
      { num: "04", color: "purple", icon: "Layers", title: "Variance Swaps & Vol Derivatives", desc: "Price and trade realized variance swaps, VIX futures term structure, and vol-of-vol dynamics." }
    ],
    outcomes: [
      { label: "CLO 01", color: "teal", icon: "Award", title: "Global Macro & Volatility Trader", desc: "Execute volatility dispersion and macroeconomic relative value trading strategies." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Volatility Surfaces & Dispersion Mechanics", subtitle: "MONTHS 1-2", color: "teal",
        modules: [
          { code: "M1", title: "Implied vs Realized Correlation", weeks: "Weeks 1-4", icon: "Activity", color: "teal", tags: ["Index Volatility", "Constituent Vol", "Implied Correlation"], desc: "Why index implied volatility trades rich to constituent volatility and how to harvest the risk premium." },
          { code: "M2", title: "Dispersion Portfolio Construction", weeks: "Weeks 5-8", icon: "Layers", color: "cyan", tags: ["Straddle Baskets", "Gamma Neutrality", "Vega Weighting"], desc: "Building vega-neutral dispersion baskets selling S&P 500 options against top 30 constituent options." }
        ],
        milestoneTitle: "Volatility Dispersion Trading Model", milestoneDesc: "Vega-Neutral Dispersion Engine", milestoneFeatures: ["Automated Implied Correlation Surface", "Gamma-Hedging Routine", "Sharpe Ratio > 2.4"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Yield Curves, Swaptions & Global Macro", subtitle: "MONTHS 3-4", color: "purple",
        modules: [
          { code: "M3", title: "Nelson-Siegel Yield Curve Modeling", weeks: "Weeks 9-12", icon: "TrendingUp", color: "purple", tags: ["Nelson-Siegel", "Duration / Convexity", "Curve Steepeners"], desc: "Modeling interest rate shift, twist, and butterfly movements across central bank policy cycles." },
          { code: "M4", title: "Macro Regime Classification & FX Carry", weeks: "Weeks 13-16", icon: "Globe", color: "emerald", tags: ["G10 FX Carry", "Hidden Markov Models", "Regime Shifts"], desc: "Using statistical regime switching models to adjust exposure between risk-on and risk-off environments." }
        ],
        milestoneTitle: "Global Macro Sovereign & Volatility Suite", milestoneDesc: "Cross-Asset Macro Trading Platform", milestoneFeatures: ["Automated Yield Curve Fitter", "FX Carry Regime Classifier", "Realized Variance Swaps Pricer"]
      }
    ],
    techStack: {
      client: { title: "Python & Streamlit", icon: "Code2", desc: "Macro Dashboard", tags: ["Streamlit", "Plotly", "QuantLib"] },
      server: { title: "QuantLib & SciPy", icon: "Server", desc: "Pricer Core", tags: ["QuantLib Python", "SciPy", "Polars", "Numba"] },
      database: { title: "DuckDB & ClickHouse", icon: "Database", desc: "Macro Data", type: "Time-Series", platform: "Cloud" },
      devops: ["Docker", "FRED API", "Bloomberg BLPAPI", "GitHub Actions"]
    },
    projects: [
      { icon: "Activity", title: "S&P 500 Volatility Dispersion Arbitrage Strategy", tag: "VOL ARBITRAGE", desc: "Systematic options strategy that continuously sells short-dated S&P 500 index variance while buying weighted baskets of mega-cap single-stock options with dynamic delta hedging.", features: ["Vega-Neutral Balancing", "Dynamic Delta Rebalancing", "Daily PnL Attribution"], borderColor: "border-teal-500/30" },
      { icon: "Globe", title: "Central Bank Policy Divergence & Yield Curve Simulator", tag: "GLOBAL MACRO", desc: "Macro forecasting model utilizing Nelson-Siegel curve decomposition across US, Eurozone, and Japan sovereign debt to identify mispriced curve steepeners.", features: ["Nelson-Siegel Yield Decomposition", "Central Bank Taylor Rule Tracker", "Risk-Neutral Scenario Analysis"], borderColor: "border-cyan-500/30" }
    ],
    careerOutcomes: "Global Macro PM, Volatility Arbitrage Trader, Head of Rates Trading ($240k-$500k + Carry)"
  },

  // ==========================================
  // 4. PRIVATE EQUITY (LBO & VALUE CREATION)
  // ==========================================
  "private-equity-lbo-value-creation": {
    title: "Private Equity: LBO & Value Creation",
    tagline: "Leveraged Buyouts, Debt Tranches & Post-Acquisition Operations",
    duration: "4 Months",
    overview: "Private equity mega-funds (Blackstone, KKR, Carlyle) create multi-billion dollar returns through operational transformation and capital structure optimization. Master institutional Leveraged Buyout (LBO) financial modeling, senior term loans (Revolver, Term Loan B) vs mezzanine debt, working capital peg adjustments, EBITDA expansion bridges, bolt-on roll-up acquisitions, and exit multiple sensitivity tables.",
    objectives: [
      { num: "01", color: "indigo", icon: "Building2", title: "Complex LBO Modeling", desc: "Build full 3-statement LBO models with circular debt schedules, revolving credit facilities, and cash sweeps." },
      { num: "02", color: "blue", icon: "Layers", title: "Debt Structuring & Covenants", desc: "Structure Senior Secured Term Loans, Second Lien, Mezzanine notes, and covenants (Leverage ratios, DSCR)." },
      { num: "03", color: "purple", icon: "TrendingUp", title: "Operational Value Creation", desc: "Decompose exit returns into EBITDA growth, debt paydown (de-leveraging), and multiple expansion." },
      { num: "04", color: "emerald", icon: "Boxes", title: "Add-On & Roll-Up Strategy", desc: "Model bolt-on acquisitions to capture multiple arbitrage and post-merger operational cost synergies." }
    ],
    outcomes: [
      { label: "CLO 01", color: "indigo", icon: "Award", title: "Private Equity Investment Associate", desc: "Build institutional-grade LBO models for mega-fund investment committee memoranda." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "LBO Mechanics, Debt Tranches & Cash Sweep", subtitle: "MONTHS 1-2", color: "indigo",
        modules: [
          { code: "M1", title: "Sources & Uses and Purchase Price Accounting", weeks: "Weeks 1-4", icon: "Building2", color: "indigo", tags: ["Goodwill Creation", "Deferred Financing Fees", "Working Capital Peg"], desc: "Calculating Enterprise Value to Equity Value bridges and closing balance sheets." },
          { code: "M2", title: "Debt Schedules & 100% Cash Sweeps", weeks: "Weeks 5-8", icon: "Layers", color: "blue", tags: ["Term Loan B", "Senior Notes", "PIK Interest", "Circular Solvers"], desc: "Modeling mandatory debt amortizations, optional repayments, and cash sweep priorities." }
        ],
        milestoneTitle: "$2B Healthcare LBO Model", milestoneDesc: "Institutional 3-Statement LBO Suite", milestoneFeatures: ["Circular Debt & Interest Solver", "Multi-Tranche Debt Structure", "Dynamic Revolver Drawdowns"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Value Creation Bridges & Exit Sensitivity", subtitle: "MONTHS 3-4", color: "purple",
        modules: [
          { code: "M3", title: "Bolt-On Add-On M&A Modeling", weeks: "Weeks 9-12", icon: "Boxes", color: "purple", tags: ["Multiple Arbitrage", "Synergy Realization", "Accretion"], desc: "Acquiring smaller companies at 6x EBITDA to blend down a 12x platform company multiple." },
          { code: "M4", title: "EBITDA Bridge & Returns Attribution", weeks: "Weeks 13-16", icon: "TrendingUp", color: "emerald", tags: ["MoIC / IRR Matrix", "EBITDA Bridge", "Dividend Recap"], desc: "Attributing 25% IRR to operational margin improvement, leverage paydown, and exit multiples." }
        ],
        milestoneTitle: "Full Investment Committee PE Model", milestoneDesc: "Mega-Fund IC Presentation Pack", milestoneFeatures: ["IRR / MoIC Sensitivity Tables", "Value Creation Attribution Bridge", "Dividend Recapitalization Mode"]
      }
    ],
    techStack: {
      client: { title: "Excel / OpenPyXL", icon: "Code2", desc: "Financial Modeling", tags: ["Advanced Excel", "OpenPyXL", "Python Financials"] },
      server: { title: "Python LBO Engine", icon: "Server", desc: "Analysis Core", tags: ["FastAPI", "Polars", "Numpy Financial"] },
      database: { title: "PostgreSQL", icon: "Database", desc: "Portfolio DB", type: "Relational", platform: "AWS RDS" },
      devops: ["Docker", "CapIQ API", "GitHub Actions"]
    },
    projects: [
      { icon: "Building2", title: "$1.5B Enterprise SaaS Take-Private LBO Model", tag: "MEGA-FUND PE", desc: "Complete buyout model for a public software company transitioning to a private recurring revenue model with 6x leverage, 100% free cash flow sweep, and 25% target IRR.", features: ["3-Statement Dynamic Linking", "Debt Paydown Waterfall", "Exit Multiple Sensitivity Heatmap"], borderColor: "border-indigo-500/30" },
      { icon: "Boxes", title: "Veterinary Clinic Roll-Up Platform Strategy", tag: "ADD-ON M&A", desc: "Platform acquisition model acquiring 40 local clinic practices over 5 years, unlocking 400bps in purchasing synergies and achieving a 3.4x MoIC on exit.", features: ["Multiple Arbitrage Calculator", "Synergy Realization Timing", "Senior Debt Capacity Tracker"], borderColor: "border-purple-500/30" }
    ],
    careerOutcomes: "Private Equity Associate / VP, Corporate Development Director, M&A Specialist ($200k-$450k + Carry)"
  },

  "growth-equity-secondary-markets": {
    title: "Growth Equity & Secondary Markets",
    tagline: "Tender Offers, GP-Led Secondaries & Pre-IPO Liquidity",
    duration: "3 Months",
    overview: "With companies staying private for 12 to 15 years, the secondary market has exploded into a multi-billion dollar asset class. Master GP-led continuation vehicles, company-sponsored employee tender offers, Direct LP secondary portfolio pricing with Net Asset Value (NAV) discounts, preferred vs common stock valuations, and structured equity with liquidation downside floors.",
    objectives: [
      { num: "01", color: "purple", icon: "Share2", title: "Secondary Market Dynamics", desc: "Understand LP portfolio sales, GP-led continuation funds, and structured synthetic secondaries." },
      { num: "02", color: "pink", icon: "Scissors", title: "NAV Discounts & Underwriting", desc: "Price secondary portfolios at 15-40% discounts to NAV based on vintage quality and debt leverage." },
      { num: "03", color: "indigo", icon: "Users", title: "Company-Sponsored Tender Offers", desc: "Structure employee tender programs, transfer restrictions, ROFR waivers, and 409A safe harbors." },
      { num: "04", color: "emerald", icon: "ShieldCheck", title: "Structured Growth Equity", desc: "Model convertible preferred equity with guaranteed coupon yields and liquidation floors." }
    ],
    outcomes: [
      { label: "CLO 01", color: "purple", icon: "Award", title: "Growth Equity & Secondaries Lead", desc: "Underwrite secondary transactions and structure employee tender liquidity programs." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "LP Secondary Pricing & Continuation Vehicles", subtitle: "MONTHS 1-2", color: "purple",
        modules: [
          { code: "M1", title: "Direct LP Secondary Portfolio Valuation", weeks: "Weeks 1-3", icon: "Share2", color: "purple", tags: ["NAV Discounts", "Fund Vintages", "Cash Flow J-Curve"], desc: "Analyzing 50 underlying private assets in a single secondary portfolio to determine optimal bid pricing." },
          { code: "M2", title: "GP-Led Continuation Funds", weeks: "Weeks 4-6", icon: "Building2", color: "pink", tags: ["Continuation Vehicles", "Rollover Options", "Fairness Opinions"], desc: "Transferring trophy assets from an aging fund into a new vehicle while managing LP conflicts of interest." }
        ],
        milestoneTitle: "$500M LP Secondary Portfolio Underwriting Model", milestoneDesc: "Discount-to-NAV Valuation Engine", milestoneFeatures: ["Bottom-Up 50-Company Valuation", "NAV Discount Sensitivity", "Expected DPI Cash Flow Pacing"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Employee Tender Offers & Structured Growth", subtitle: "MONTH 3", color: "indigo",
        modules: [
          { code: "M3", title: "Employee Tender Offer Mechanics", weeks: "Weeks 7-9", icon: "Users", color: "indigo", tags: ["Tender Offers", "ROFR Waivers", "409A Valuation Impact"], desc: "Executing compliant company-sponsored liquidity for early employees without breaking the 409A valuation." },
          { code: "M4", title: "Structured Equity (Convertible Preferred)", weeks: "Weeks 10-12", icon: "ShieldCheck", color: "emerald", tags: ["Downside Protection", "PIK Dividends", "Conversion Ratios"], desc: "Structuring late-stage growth rounds with 1.5x minimum return guarantees and equity upside." }
        ],
        milestoneTitle: "Late-Stage Growth Equity Deal Structurer", milestoneDesc: "Tender Offer & Structured Sheet Engine", milestoneFeatures: ["Tender Offer Participation Matrix", "Structured Downside Protection Modeler", "409A Safe Harbor Compliance"]
      }
    ],
    techStack: {
      client: { title: "TypeScript & React", icon: "Code2", desc: "Deal Portal", tags: ["Next.js", "TailwindCSS", "Recharts"] },
      server: { title: "Python Valuation Stack", icon: "Server", desc: "Underwriting API", tags: ["FastAPI", "Polars", "Pydantic"] },
      database: { title: "PostgreSQL", icon: "Database", desc: "Secondary Deal DB", type: "Relational", platform: "Supabase" },
      devops: ["Docker", "PitchBook API", "GitHub Actions"]
    },
    projects: [
      { icon: "Share2", title: "$300M GP-Led Continuation Fund Restructuring Model", tag: "SECONDARIES", desc: "Financial underwriting model evaluating the transfer of two enterprise SaaS unicorns from a 2015 vintage fund into a new continuation vehicle with third-party lead investor terms.", features: ["Fairness Opinion Modeling", "Rollover vs Cash-Out Analysis", "Carried Interest Reset Engine"], borderColor: "border-purple-500/30" },
      { icon: "Users", title: "Unicorn Employee Secondary Tender Offer Platform", tag: "TENDER OFFER", desc: "Operational framework managing a $50M tender offer for 300 early employees, modeling tax withholdings, option exercises, and capitalization table impact.", features: ["Vesting Verification", "Automated Tax Withholding Calculator", "Board ROFR Waiver Generator"], borderColor: "border-pink-500/30" }
    ],
    careerOutcomes: "Secondaries Associate / VP, Growth Equity Investor, Head of Corporate Capital ($185k-$360k + Carry)"
  },

  // ==========================================
  // 5. INSTITUTIONAL INVESTING & WEALTH ARCHITECTURE
  // ==========================================
  "family-office-institutional-investing": {
    title: "Family Office & Institutional Investing",
    tagline: "The Yale Model, Private Credit & Direct Co-Investments",
    duration: "3 Months",
    overview: "How sovereign wealth funds and ultra-high-net-worth single family offices manage billions across generations: The Endowment Model (David Swensen Yale Model). Master heavy allocations to illiquid alternative assets (Private Equity, Venture Capital, Real Estate, Private Credit), direct co-investments, liquidity buffer management, and tax-advantaged dynastic governance.",
    objectives: [
      { num: "01", color: "emerald", icon: "Landmark", title: "The Yale Endowment Model", desc: "Master David Swensen's revolutionary framework: exploiting the illiquidity premium and equity orientation." },
      { num: "02", color: "blue", icon: "CreditCard", title: "Private Credit & Direct Lending", desc: "Analyze floating-rate direct senior loans, unitranche facilities, and risk-adjusted private yields." },
      { num: "03", color: "indigo", icon: "Share2", title: "Direct Co-Investment Syndications", desc: "Evaluate fee-free, carry-free co-investments alongside top-tier private equity GPs." },
      { num: "04", color: "purple", icon: "Shield", title: "Liquidity Buffers & Cash Planning", desc: "Ensure multi-million dollar capital calls can be met during severe market drawdowns without fire-sales." }
    ],
    outcomes: [
      { label: "CLO 01", color: "emerald", icon: "Award", title: "Chief Investment Officer (CIO)", desc: "Direct multi-asset allocation strategies for institutional endowments and single family offices." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Endowment Asset Allocation & Private Credit", subtitle: "MONTHS 1-2", color: "emerald",
        modules: [
          { code: "M1", title: "The Modern Endowment Allocation", weeks: "Weeks 1-3", icon: "Landmark", color: "emerald", tags: ["Yale Model", "Illiquidity Premium", "Mean-Variance"], desc: "Allocating 60-70% of assets into private equities, venture, and real assets." },
          { code: "M2", title: "Private Debt & Direct Lending Mechanics", weeks: "Weeks 4-6", icon: "CreditCard", color: "blue", tags: ["Unitranche", "SOFR + 650bps", "Warrants"], desc: "Underwriting senior secured loans to mid-market companies providing 10-12% steady cash yields." }
        ],
        milestoneTitle: "$1B Endowment Allocation Blueprint", milestoneDesc: "Institutional Multi-Asset Policy Portfolio", milestoneFeatures: ["Target Asset Weight Bands", "Illiquid Commitment Simulator", "Expected 30-Year Wealth Growth"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Co-Investments, Liquidity Stress & Governance", subtitle: "MONTH 3", color: "indigo",
        modules: [
          { code: "M3", title: "Direct Co-Investment Evaluation", weeks: "Weeks 7-9", icon: "Share2", color: "indigo", tags: ["No-Fee No-Carry", "GP Syndication", "Quick Diligence"], desc: "Evaluating 10-day direct investment opportunities alongside sponsors to boost blended net returns." },
          { code: "M4", title: "Capital Call Stress-Testing & Liquidity Ladders", weeks: "Weeks 10-12", icon: "Shield", color: "purple", tags: ["Takahashi-Alexander Model", "Capital Calls", "Liquidity Ladders"], desc: "Using Takahashi-Alexander algorithms to predict capital call spikes during market liquidity crises." }
        ],
        milestoneTitle: "Family Office Liquidity & Capital Call Simulator", milestoneDesc: "Institutional Cash Flow Risk Engine", milestoneFeatures: ["Takahashi-Alexander Cash Flow Engine", "Severe Market Liquidity Stress Test", "Dynastic Wealth Preserver"]
      }
    ],
    techStack: {
      client: { title: "Python & Plotly", icon: "Code2", desc: "Allocation UI", tags: ["Streamlit", "Plotly", "Pandas"] },
      server: { title: "Python Financial Core", icon: "Server", desc: "Engine Core", tags: ["FastAPI", "cvxpy", "Scipy Optimize"] },
      database: { title: "PostgreSQL", icon: "Database", desc: "Asset Database", type: "Relational", platform: "Managed" },
      devops: ["Docker", "Google Sheets API", "GitHub Actions"]
    },
    projects: [
      { icon: "Landmark", title: "$2B Multi-Generational Family Office Asset Allocator", tag: "FAMILY OFFICE", desc: "Asset allocation optimizer deploying the Yale model across Private Equity, Real Estate, Venture, and Private Credit with Monte Carlo 30-year dynastic purchasing power simulations.", features: ["Inflation-Adjusted Purchasing Power", "Illiquid Asset Commitment Pacing", "Fee-Free Co-Investment Tracking"], borderColor: "border-emerald-500/30" },
      { icon: "CreditCard", title: "Private Credit Unitranche Loan Underwriting Engine", tag: "PRIVATE DEBT", desc: "Direct lending assessment model analyzing borrower leverage, debt-service coverage ratios (DSCR), and collateral quality to structure SOFR+650bps senior debt.", features: ["Covenant Headroom Sensitivity", "Default & Recovery Rate Modeler", "Quarterly Cash Yield Tracker"], borderColor: "border-blue-500/30" }
    ],
    careerOutcomes: "Chief Investment Officer (CIO), Family Office Investment Director, Endowment Portfolio Manager ($220k-$500k + Carry)"
  }
};

// Aliases for slug variations
curriculumDataInvesting["web-4-0-autonomous-ai-depin-networks"] = curriculumDataInvesting["web-4-0-autonomous-ai-depin-networks"];
curriculumDataInvesting["web4-ai-blockchain-depin"] = curriculumDataInvesting["web-4-0-autonomous-ai-depin-networks"];
curriculumDataInvesting["zero-knowledge-proofs-modular-rollups"] = curriculumDataInvesting["zero-knowledge-proofs-modular-rollups"];
curriculumDataInvesting["zk-proofs-modular-rollups"] = curriculumDataInvesting["zero-knowledge-proofs-modular-rollups"];
curriculumDataInvesting["quantitative-trading-ml-alpha-execution"] = curriculumDataInvesting["quantitative-trading-ml-alpha-execution"];
curriculumDataInvesting["quant-trading-ml-alpha"] = curriculumDataInvesting["quantitative-trading-ml-alpha-execution"];
curriculumDataInvesting["order-execution-market-impact-modeling"] = curriculumDataInvesting["order-execution-market-impact-modeling"];
curriculumDataInvesting["order-execution-market-impact"] = curriculumDataInvesting["order-execution-market-impact-modeling"];
curriculumDataInvesting["multi-strategy-hedge-fund-architecture"] = curriculumDataInvesting["multi-strategy-hedge-fund-architecture"];
curriculumDataInvesting["multi-strategy-hedge-funds"] = curriculumDataInvesting["multi-strategy-hedge-fund-architecture"];
curriculumDataInvesting["global-macro-volatility-dispersion"] = curriculumDataInvesting["global-macro-volatility-dispersion"];
curriculumDataInvesting["global-macro-volatility-arbitrage"] = curriculumDataInvesting["global-macro-volatility-dispersion"];
curriculumDataInvesting["private-equity-lbo-value-creation"] = curriculumDataInvesting["private-equity-lbo-value-creation"];
curriculumDataInvesting["private-equity-lbo-modeling"] = curriculumDataInvesting["private-equity-lbo-value-creation"];
curriculumDataInvesting["growth-equity-secondary-markets"] = curriculumDataInvesting["growth-equity-secondary-markets"];
curriculumDataInvesting["growth-equity-secondaries"] = curriculumDataInvesting["growth-equity-secondary-markets"];
curriculumDataInvesting["family-office-institutional-investing"] = curriculumDataInvesting["family-office-institutional-investing"];
curriculumDataInvesting["endowment-model-family-office"] = curriculumDataInvesting["family-office-institutional-investing"];
