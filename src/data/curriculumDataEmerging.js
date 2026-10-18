export const curriculumDataEmerging = {
  "loop-engineering": {
    title: "Loop Engineering",
    tagline: "Autonomous Agentic Loops & Flow Systems",
    duration: "4 Months",
    overview: "Move past single-shot prompts and linear chains into self-correcting agentic loops. Master Flow Engineering, Evaluator-Optimizer cycles, reflection heuristics, dynamic branching graphs, human-in-the-loop validation, and production error recovery with LangGraph and DSPy.",
    objectives: [
      { num: "01", color: "orange", icon: "Repeat", title: "Loop Architecture", desc: "Design cyclic execution graphs, halting criteria, and convergence guarantees." },
      { num: "02", color: "amber", icon: "GitBranch", title: "Flow Engineering", desc: "Build deterministic routing, branching, state machines, and parallel speculative paths." },
      { num: "03", color: "purple", icon: "Activity", title: "Reflection & Evals", desc: "Implement self-correcting critique loops and automated runtime code execution testing." },
      { num: "04", color: "emerald", icon: "ShieldCheck", title: "Production Resilience", desc: "Deploy human-in-the-loop review, loop circuit-breakers, and token budget guards." }
    ],
    outcomes: [
      { label: "CLO 01", color: "orange", icon: "Award", title: "Flow Systems Architect", desc: "Design resilient, non-deterministic agent workflows that converge with >98% accuracy." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "State Machines & Cyclic Graphs", subtitle: "MONTHS 1-2", color: "orange",
        modules: [
          { code: "M1", title: "Agentic State Primitives", weeks: "Weeks 1-4", icon: "Code2", color: "orange", tags: ["StateGraph", "Reducers", "Context Windows"], desc: "Managing state schemas, checkpointing, and thread memory across execution steps." },
          { code: "M2", title: "Evaluator-Optimizer Loops", weeks: "Weeks 5-8", icon: "Repeat", color: "amber", tags: ["Reflection", "Critique Steps", "Halting Criteria"], desc: "Building iterative generation-critique-correction feedback loops with programmatic validators." }
        ],
        milestoneTitle: "Self-Healing Coder Agent", milestoneDesc: "Autonomous Code-Execution Loop", milestoneFeatures: ["Docker Sandboxing", "AST Validation", "Test-Driven Self Correction"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Production Flow & DSPy Optimization", subtitle: "MONTHS 3-4", color: "purple",
        modules: [
          { code: "M3", title: "Dynamic Branching & Routing", weeks: "Weeks 9-12", icon: "GitBranch", color: "purple", tags: ["Semantic Routers", "Parallel Fan-out", "Map-Reduce"], desc: "Speculative execution, dynamic intent classification, and multi-path synthesis." },
          { code: "M4", title: "Algorithmic Prompt Optimization", weeks: "Weeks 13-16", icon: "Sparkles", color: "emerald", tags: ["DSPy", "Teleprompter", "BootstrapFewShot"], desc: "Compile programmatic prompt pipelines into optimized, highly calibrated weights and few-shots." }
        ],
        milestoneTitle: "Enterprise Autonomous Workflow Engine", milestoneDesc: "LangGraph + DSPy Engine", milestoneFeatures: ["Human-in-the-loop Interrupts", "Budget Safeguards", "Sub-1s Routing"]
      }
    ],
    techStack: {
      client: { title: "Python & TypeScript", icon: "Code2", desc: "Core Runtime", tags: ["Python 3.12", "TypeScript", "FastAPI"] },
      server: { title: "LangGraph & DSPy", icon: "Workflow", desc: "Graph Framework", tags: ["LangGraph", "DSPy", "Temporal"] },
      database: { title: "PostgreSQL & Redis", icon: "Database", desc: "Checkpointing & Cache", type: "State Store", platform: "Async Engine" },
      devops: ["LangSmith", "Docker Sandboxes", "OpenTelemetry", "GitHub Actions"]
    },
    projects: [
      { icon: "Repeat", title: "Autonomous Research & Fact-Checking Loop", tag: "AGENTIC LOOP", desc: "A recursive research agent that searches the web, formulates hypotheses, detects inconsistencies, and re-queries until statistical confidence exceeds threshold.", features: ["Iterative Verification", "Self-Consistency Voting", "Hallucination Brake"], borderColor: "border-orange-500/30" },
      { icon: "Terminal", title: "Self-Correcting Data Migration Pipeline", tag: "ENTERPRISE", desc: "Autonomous schema conversion system that writes SQL migrations, runs them against a shadow DB, inspects syntax errors, fixes queries in a loop, and commits clean PRs.", features: ["Sandboxed Test Runs", "Schema AST Diffing", "Rollback Safeguard"], borderColor: "border-purple-500/30" }
    ],
    careerOutcomes: "Agentic Systems Engineer, Flow Engineer, AI Staff Architect ($190k-$320k)"
  },

  "production-rag": {
    title: "Production RAG",
    tagline: "Sub-100ms, Low-Hallucination Enterprise Search",
    duration: "4 Months",
    overview: "Naive RAG fails in production. Master enterprise Retrieval-Augmented Generation: hybrid search (BM25 + ColBERT multi-vector retrieval), parent-child chunking, contextual compression, cross-encoder reranking, Ragas hallucination metrics, semantic caching, and sub-100ms SLA delivery.",
    objectives: [
      { num: "01", color: "blue", icon: "Search", title: "Hybrid Search & ColBERT", desc: "Combine sparse lexical matching (BM25) with dense semantic embeddings and late-interaction ColBERT." },
      { num: "02", color: "cyan", icon: "Layers", title: "Advanced Chunking", desc: "Implement parent-document retrieval, hierarchical token trees, and table/PDF semantic chunking." },
      { num: "03", color: "purple", icon: "Filter", title: "Reranking & Filtering", desc: "Deploy cross-encoder rerankers (Cohere, BGE) and contextual query compression." },
      { num: "04", color: "emerald", icon: "Gauge", title: "Production SLA & Evals", desc: "Benchmark precision/recall with Ragas & TruLens, and achieve sub-100ms caching." }
    ],
    outcomes: [
      { label: "CLO 01", color: "blue", icon: "Award", title: "RAG Systems Engineer", desc: "Deploy production RAG serving millions of queries with zero hallucinations." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Ingestion, Chunking & Hybrid Retrieval", subtitle: "MONTHS 1-2", color: "blue",
        modules: [
          { code: "M1", title: "High-Fidelity Document Parsing", weeks: "Weeks 1-4", icon: "FileText", color: "blue", tags: ["Unstructured", "OCR", "Table Extraction"], desc: "Handling complex PDFs, markdown tables, slides, and embedded images with layout awareness." },
          { code: "M2", title: "Hybrid & Multi-Vector Retrieval", weeks: "Weeks 5-8", icon: "Search", color: "cyan", tags: ["Qdrant", "ColBERT", "BM25", "Reciprocal Rank Fusion"], desc: "Implementing hybrid reciprocal rank fusion (RRF) and late-interaction vector matching." }
        ],
        milestoneTitle: "Hybrid Vector Engine", milestoneDesc: "Multi-Vector Retriever", milestoneFeatures: ["ColBERT v2", "Qdrant Hybrid", "Reciprocal Rank Fusion"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Reranking, Evaluation & High-Throughput Serving", subtitle: "MONTHS 3-4", color: "teal",
        modules: [
          { code: "M3", title: "Cross-Encoder Reranking & Compression", weeks: "Weeks 9-12", icon: "Filter", color: "teal", tags: ["BGE-Reranker", "Cohere", "Context Compression"], desc: "Pruning noisy context, reordering by semantic relevance, and saving prompt token costs." },
          { code: "M4", title: "RAG Evals, Guardrails & Caching", weeks: "Weeks 13-16", icon: "Gauge", color: "purple", tags: ["Ragas", "TruLens", "Redis Semantic Cache", "Guardrails"], desc: "Quantitative faithfulness scoring, answer relevance tracking, and sub-50ms cache hits." }
        ],
        milestoneTitle: "Enterprise Compliance Search System", milestoneDesc: "Production RAG with 99.4% Faithfulness", milestoneFeatures: ["Ragas Automated CI/CD", "Redis Semantic Cache", "Streaming Citations"]
      }
    ],
    techStack: {
      client: { title: "Python / Next.js", icon: "Code2", desc: "Frontend & API", tags: ["FastAPI", "React", "Streaming SSE"] },
      server: { title: "LlamaIndex & LangChain", icon: "Boxes", desc: "Orchestration", tags: ["LlamaIndex", "ColBERT", "FlashRerank"] },
      database: { title: "Qdrant & Elasticsearch", icon: "Database", desc: "Hybrid Store", type: "Vector & Sparse", platform: "High Availability" },
      devops: ["Ragas", "TruLens", "Redis Semantic Cache", "Prometheus"]
    },
    projects: [
      { icon: "Search", title: "Multi-Million SEC 10-K Financial Intelligence Engine", tag: "FINTECH RAG", desc: "Hybrid RAG engine answering complex quantitative financial queries across 50,000 regulatory filings with verifiable line citations and table cross-referencing.", features: ["Hybrid BM25 + Dense", "Cohere Rerank", "Table Markdown Parsing"], borderColor: "border-blue-500/30" },
      { icon: "ShieldCheck", title: "Healthcare Clinical Protocol Assistant", tag: "HEALTHCARE", desc: "HIPAA-compliant document assistant with strict hallucination guardrails, confidence scoring, and automated fallback to human clinicians.", features: ["Faithfulness Validation", "Zero Citation Fabrication", "Sub-120ms Latency"], borderColor: "border-cyan-500/30" }
    ],
    careerOutcomes: "Production RAG Specialist, Search Relevance Engineer, AI Platform Engineer ($180k-$290k)"
  },

  "forward-deployed-engineer": {
    title: "Forward Deployed Engineer",
    tagline: "Mission-Critical Enterprise AI Integration",
    duration: "5 Months",
    overview: "The most coveted engineering role in frontier AI (Palantir, OpenAI, Anthropic). Combine systems architecture, high-velocity prototyping, enterprise security (VPC/air-gapped), customer technical discovery, and rapid delivery of production-ready AI solutions to fortune 500 boards and defense leaders.",
    objectives: [
      { num: "01", color: "indigo", icon: "Briefcase", title: "Enterprise Discovery", desc: "Translate ambiguous executive business challenges into concrete technical architecture specifications." },
      { num: "02", color: "blue", icon: "Rocket", title: "High-Velocity Prototyping", desc: "Deliver production-grade, end-to-end working pilots in 48-72 hours under intense client deadlines." },
      { num: "03", color: "slate", icon: "ShieldCheck", title: "VPC & Air-Gapped Deployments", desc: "Deploy containerized AI infrastructure inside restricted client AWS/Azure clouds and bare-metal." },
      { num: "04", color: "emerald", icon: "Activity", title: "Enterprise Telemetry", desc: "Instrument production observability, drift detection, and compliance auditing in customer environments." }
    ],
    outcomes: [
      { label: "CLO 01", color: "indigo", icon: "Award", title: "Elite Forward Deployed Engineer", desc: "Lead mission-critical customer enterprise deployments with multi-million dollar business impact." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Client Problem Framing & Rapid Prototyping", subtitle: "MONTHS 1-2", color: "indigo",
        modules: [
          { code: "M1", title: "The FDE Playbook & Scoping", weeks: "Weeks 1-4", icon: "Terminal", color: "indigo", tags: ["Discovery", "Architecture Diagramming", "POC Scoping"], desc: "Palantir-style discovery, reverse-engineering client pain points, and rapid solution roadmapping." },
          { code: "M2", title: "Zero-to-One Prototype Delivery", weeks: "Weeks 5-8", icon: "Rocket", color: "blue", tags: ["Fullstack AI", "FastAPI", "React", "Live Demos"], desc: "Building executive-ready, interactive proof-of-concepts with production-grade data piping." }
        ],
        milestoneTitle: "72-Hour Enterprise POC", milestoneDesc: "Interactive Executive AI Demo", milestoneFeatures: ["Live Client Telemetry", "Role-Based Access Control", "Instant Value Demonstration"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Air-Gapped Infrastructure & Production Handover", subtitle: "MONTHS 3-5", color: "slate",
        modules: [
          { code: "M3", title: "Air-Gapped & Sovereign Clouds", weeks: "Weeks 9-14", icon: "ShieldCheck", color: "slate", tags: ["Kubernetes", "AWS GovCloud", "Self-Hosted LLMs", "vLLM"], desc: "Running offline models, local vector stores, and zero-internet VPC network boundaries." },
          { code: "M4", title: "Enterprise Integrations & Production Hardening", weeks: "Weeks 15-20", icon: "Layers", color: "emerald", tags: ["SAP / Salesforce APIs", "Kafka", "SSO / SAML", "Audit Logs"], desc: "Integrating legacy mainframe/ERP data sources into modern AI data fabrics." }
        ],
        milestoneTitle: "Production Enterprise Air-Gapped Deployment", milestoneDesc: "Hardened Palantir-Style Platform", milestoneFeatures: ["SAML / Okta Auth", "Offline Model Inference", "Full Audit Trail"]
      }
    ],
    techStack: {
      client: { title: "TypeScript & React", icon: "Code2", desc: "Executive UI", tags: ["TailwindCSS", "Next.js", "AG Grid"] },
      server: { title: "Python & Go", icon: "Server", desc: "Integration Core", tags: ["FastAPI", "Go Routines", "gRPC"] },
      database: { title: "Enterprise Data Fabric", icon: "Database", desc: "Data Plane", type: "Heterogeneous", platform: "Snowflake / Databricks / Postgres" },
      devops: ["Kubernetes", "Terraform", "Helm", "AWS GovCloud / Azure", "vLLM"]
    },
    projects: [
      { icon: "Briefcase", title: "Global Supply Chain Disruptor System", tag: "PALANTIR-STYLE", desc: "An enterprise operational command platform integrating SAP ERP data, live geopolitical risk feeds, and predictive logistics models into an executive decision graph.", features: ["Dynamic Inventory Routing", "Real-Time Telemetry", "Executive Decision Dashboards"], borderColor: "border-indigo-500/30" },
      { icon: "ShieldCheck", title: "Air-Gapped Defense Intelligence Analyzer", tag: "SOVEREIGN AI", desc: "Fully air-gapped system running local Llama 3 models on self-hosted Kubernetes clusters to summarize classified mission reports without external network connectivity.", features: ["Offline vLLM Inference", "Strict RBAC", "Encrypted Vector Indexes"], borderColor: "border-slate-500/30" }
    ],
    careerOutcomes: "Forward Deployed Engineer, Lead Solutions Architect, Enterprise AI Director ($210k-$380k)"
  },

  "graph-engineering": {
    title: "Graph Engineering",
    tagline: "Knowledge Graphs, Ontologies & Connected Intelligence",
    duration: "4 Months",
    overview: "Relational tables and flat vector stores fail when understanding interconnected entities. Master Graph Engineering: build rich knowledge graphs with Neo4j, write Cypher queries, engineer ontologies, perform entity resolution at scale, and implement Microsoft GraphRAG to power complex LLM reasoning.",
    objectives: [
      { num: "01", color: "emerald", icon: "Network", title: "Graph Modeling & Neo4j", desc: "Master labeled property graphs, Cypher query optimization, and schema constraints." },
      { num: "02", color: "teal", icon: "GitFork", title: "Ontology & Entity Resolution", desc: "Design domain ontologies and resolve ambiguous real-world entities across disparate sources." },
      { num: "03", color: "cyan", icon: "Share2", title: "GraphRAG & Multi-Hop Reasoning", desc: "Implement Microsoft GraphRAG: hierarchical community summaries and structural graph walks." },
      { num: "04", color: "purple", icon: "Cpu", title: "Graph Neural Networks (GNNs)", desc: "Train node classification and link prediction models with PyTorch Geometric." }
    ],
    outcomes: [
      { label: "CLO 01", color: "emerald", icon: "Award", title: "Graph Systems Architect", desc: "Build enterprise knowledge graph architectures powering multi-hop LLM reasoning." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Property Graphs & Cypher Mastery", subtitle: "MONTHS 1-2", color: "emerald",
        modules: [
          { code: "M1", title: "Graph Data Modeling", weeks: "Weeks 1-4", icon: "Network", color: "emerald", tags: ["Neo4j", "Property Graphs", "Cypher", "Indexes"], desc: "Modeling complex domains as nodes, relationships, and properties with ACID guarantees." },
          { code: "M2", title: "Entity Extraction & Linking", weeks: "Weeks 5-8", icon: "GitFork", color: "teal", tags: ["Spacy", "LLM Extraction", "Entity Disambiguation"], desc: "Transforming unstructured text into structured graph topologies with automated entity deduplication." }
        ],
        milestoneTitle: "Domain Knowledge Graph", milestoneDesc: "Neo4j Enterprise Graph", milestoneFeatures: ["10M+ Nodes", "Sub-10ms Multi-Hop Traversal", "Automated Entity Linking"]
      },
      {
        id: "phase2", name: "PHASE II", title: "GraphRAG & Connected Intelligence", subtitle: "MONTHS 3-4", color: "cyan",
        modules: [
          { code: "M3", title: "Microsoft GraphRAG Architecture", weeks: "Weeks 9-12", icon: "Share2", color: "cyan", tags: ["GraphRAG", "Leiden Algorithm", "Community Summaries"], desc: "Hierarchical community detection, global search over entire corpora, and local neighbor extraction." },
          { code: "M4", title: "Text-to-Cypher & Hybrid Reasoning", weeks: "Weeks 13-16", icon: "Cpu", color: "purple", tags: ["Text2Cypher", "Schema Context", "Vector + Graph"], desc: "Translating natural language into validated Cypher queries combined with vector similarity." }
        ],
        milestoneTitle: "GraphRAG Medical Research Navigator", milestoneDesc: "Multi-Hop Knowledge Graph Assistant", milestoneFeatures: ["Global Corpus Synthesis", "Text2Cypher Engine", "Leiden Graph Clustering"]
      }
    ],
    techStack: {
      client: { title: "Python & GraphQL", icon: "Code2", desc: "API Layer", tags: ["FastAPI", "Strawberry GraphQL", "NetworkX"] },
      server: { title: "Neo4j & LangChain Graph", icon: "Network", desc: "Graph Engine", tags: ["Neo4j Enterprise", "GraphRAG", "PyTorch Geometric"] },
      database: { title: "Neo4j Graph Database", icon: "Database", desc: "Primary Store", type: "Native Graph", platform: "Neo4j Aura / Self-Hosted" },
      devops: ["Docker", "Cypher Shell", "LangSmith", "APOC Procedures"]
    },
    projects: [
      { icon: "Network", title: "Enterprise Anti-Money Laundering (AML) Graph", tag: "FINTECH GRAPH", desc: "Fraud and money laundering detection engine analyzing 50 million transactions to uncover circular routing, shell company networks, and hidden beneficial owners.", features: ["Circular Path Detection", "PageRank Scoring", "Real-Time Transaction Alerts"], borderColor: "border-emerald-500/30" },
      { icon: "Share2", title: "Global Biomedical Literature GraphRAG", tag: "BIOINFORMATICS", desc: "GraphRAG knowledge engine ingesting 500,000 PubMed papers to discover previously unknown drug-gene interactions via hierarchical community summarization.", features: ["Leiden Community Detection", "Multi-Hop Query Synthesis", "Evidence Citation Mapping"], borderColor: "border-teal-500/30" }
    ],
    careerOutcomes: "Graph Architect, Knowledge Engineer, Principal AI Specialist ($175k-$295k)"
  },

  "ai-quality-evals-engineering": {
    title: "AI Quality & Evals Engineering",
    tagline: "Deterministic Testing for Probabilistic Systems",
    duration: "3 Months",
    overview: "You cannot improve what you cannot measure. As AI systems move into production, Evals Engineering is the highest-leverage discipline. Master synthetic test suite generation, LLM-as-a-judge calibration, deterministic assertion frameworks, regression prevention with DeepEval and Promptfoo, and production guardrails.",
    objectives: [
      { num: "01", color: "violet", icon: "CheckCircle", title: "Evals Fundamentals", desc: "Define task-specific metrics, golden test sets, and deterministic unit assertions." },
      { num: "02", color: "purple", icon: "Scale", title: "LLM-as-a-Judge Calibration", desc: "Calibrate judge models against human ground truth to eliminate bias, position effects, and verbosity distortion." },
      { num: "03", color: "fuchsia", icon: "GitCommit", title: "CI/CD AI Regression Testing", desc: "Integrate Promptfoo & DeepEval into GitHub Actions to block breaking prompt or model changes." },
      { num: "04", color: "emerald", icon: "Shield", title: "Runtime Guardrails", desc: "Deploy NeMo Guardrails and Llama Guard for real-time safety, toxicity, and hallucination filters." }
    ],
    outcomes: [
      { label: "CLO 01", color: "violet", icon: "Award", title: "AI Quality Lead", desc: "Build automated evaluation pipelines protecting mission-critical LLM deployments." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Test Suites, Synthetic Data & Judge Calibration", subtitle: "MONTHS 1-2", color: "violet",
        modules: [
          { code: "M1", title: "Benchmark Engineering & Golden Sets", weeks: "Weeks 1-4", icon: "CheckCircle", color: "violet", tags: ["Golden Datasets", "Synthetic Data", "Edge Cases"], desc: "Curating adversarial test cases, edge cases, and generating balanced synthetic validation sets." },
          { code: "M2", title: "LLM-as-a-Judge & Statistical Metrics", weeks: "Weeks 5-8", icon: "Scale", color: "purple", tags: ["Cohen's Kappa", "G-Eval", "Position Bias", "Pairwise Evals"], desc: "Measuring inter-annotator agreement, mitigating judge biases, and designing robust rubrics." }
        ],
        milestoneTitle: "Automated Evals Harness", milestoneDesc: "Calibrated Judge System", milestoneFeatures: ["94% Human Agreement", "Adversarial Edge Test Generation", "Zero-Variance Rubrics"]
      },
      {
        id: "phase2", name: "PHASE II", title: "CI/CD Regression & Production Guardrails", subtitle: "MONTH 3", color: "emerald",
        modules: [
          { code: "M3", title: "Continuous Evals in CI/CD", weeks: "Weeks 9-10", icon: "GitCommit", color: "emerald", tags: ["Promptfoo", "DeepEval", "GitHub Actions"], desc: "Automating evaluation runs on every PR, diffing prompt performance, and cost regressions." },
          { code: "M4", title: "Online Telemetry & Guardrail Interceptors", weeks: "Weeks 11-12", icon: "Shield", color: "teal", tags: ["NeMo Guardrails", "LangSmith", "LlamaGuard"], desc: "Real-time content moderation, jailbreak interception, and production drift telemetry." }
        ],
        milestoneTitle: "Production AI Quality Gate", milestoneDesc: "Continuous Evals Pipeline", milestoneFeatures: ["Automated PR Blocker", "Real-Time NeMo Guardrails", "Live Drift Alerting"]
      }
    ],
    techStack: {
      client: { title: "Python & TypeScript", icon: "Code2", desc: "Testing SDK", tags: ["Python 3.12", "Pytest", "Jest"] },
      server: { title: "DeepEval & Promptfoo", icon: "CheckCircle", desc: "Evals Framework", tags: ["DeepEval", "Promptfoo", "NeMo Guardrails"] },
      database: { title: "ClickHouse & Postgres", icon: "Database", desc: "Metrics Store", type: "Columnar Evals", platform: "Timeseries / Analytics" },
      devops: ["GitHub Actions", "LangSmith", "Weights & Biases", "Arize Phoenix"]
    },
    projects: [
      { icon: "Scale", title: "Self-Calibrating Enterprise Judge Platform", tag: "EVALS INFRA", desc: "An automated eval system that tests foundation model upgrades across 20 enterprise dimensions (correctness, tone, safety, latency) before production deployment.", features: ["Automated Regression Detection", "G-Eval Rubric Scorer", "Cost/Token Comparison"], borderColor: "border-violet-500/30" },
      { icon: "Shield", title: "Zero-Latency Security & Hallucination Guardrail", tag: "RUNTIME SAFETY", desc: "Sub-20ms proxy guardrail checking incoming user queries and outgoing LLM tokens against toxic jailbreaks, PII leaks, and fabricated facts.", features: ["Llama Guard 3 Integration", "Streaming Token Interceptor", "Semantic Boundary Check"], borderColor: "border-emerald-500/30" }
    ],
    careerOutcomes: "AI Quality Engineer, Evals Architect, AI Reliability Engineer ($170k-$280k)"
  },

  "compound-ai-systems-multi-agent-swarms": {
    title: "Compound AI & Multi-Agent Swarms",
    tagline: "Collaborative Swarms, Memory & Tool-Use Protocols",
    duration: "4 Months",
    overview: "Monolithic LLMs hit hard limits. State-of-the-art systems are Compound AI Systems: ensembles of specialized agent swarms that divide tasks, debate hypotheses, use decentralized tools, and share hierarchical memory. Master CrewAI, LangGraph, AutoGen, and emergent agent collaboration.",
    objectives: [
      { num: "01", color: "indigo", icon: "Users", title: "Multi-Agent Topology", desc: "Architect supervisor-worker, peer-to-peer debate, and hierarchical agent swarm topologies." },
      { num: "02", color: "purple", icon: "Brain", title: "Distributed Agent Memory", desc: "Implement episodic, semantic, and shared working memory across concurrent agent threads." },
      { num: "03", color: "pink", icon: "Wrench", title: "Tool Synthesis & Protocols", desc: "Equip agents with dynamic tool execution, MCP (Model Context Protocol), and sandboxed runtimes." },
      { num: "04", color: "emerald", icon: "Vote", title: "Consensus & Conflict Resolution", desc: "Design majority voting, multi-round debates, and validation arbiters to prevent deadlocks." }
    ],
    outcomes: [
      { label: "CLO 01", color: "indigo", icon: "Award", title: "Swarm Systems Engineer", desc: "Design multi-agent collaborative networks solving complex enterprise operations." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Swarm Topologies & Protocol Design", subtitle: "MONTHS 1-2", color: "indigo",
        modules: [
          { code: "M1", title: "Agent Roles & Swarm Topologies", weeks: "Weeks 1-4", icon: "Users", color: "indigo", tags: ["CrewAI", "LangGraph", "Supervisor Pattern"], desc: "Defining agent personas, delegation rules, and communication handoffs." },
          { code: "M2", title: "Shared Memory & State Synchronization", weeks: "Weeks 5-8", icon: "Brain", color: "purple", tags: ["Mem0", "Vector Memory", "Redis State"], desc: "Long-term persistent memory and short-term working context shared across swarms." }
        ],
        milestoneTitle: "3-Tier Agent Swarm", milestoneDesc: "Hierarchical Autonomous Swarm", milestoneFeatures: ["Planner, Executor, Reviewer Roles", "Shared Episodic Memory", "Self-Delegation"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Emergent Behaviors, Tool Protocols & Scale", subtitle: "MONTHS 3-4", color: "pink",
        modules: [
          { code: "M3", title: "Model Context Protocol & Dynamic Tools", weeks: "Weeks 9-12", icon: "Wrench", color: "pink", tags: ["MCP", "API Generators", "Sandboxed Bash"], desc: "Standardized agent-to-tool connections and secure runtime execution." },
          { code: "M4", title: "Multi-Agent Consensus & Deadlock Breakers", weeks: "Weeks 13-16", icon: "Vote", color: "emerald", tags: ["Debate Protocols", "Arbitration", "Circuit Breakers"], desc: "Resolving conflicting agent answers and optimizing collective reasoning throughput." }
        ],
        milestoneTitle: "Autonomous Venture Diligence Swarm", milestoneDesc: "Multi-Agent Due Diligence Platform", milestoneFeatures: ["Financial, Legal & Tech Reviewer Agents", "Autonomous Consensus Report", "MCP Integration"]
      }
    ],
    techStack: {
      client: { title: "Python & TypeScript", icon: "Code2", desc: "Agent Orchestration", tags: ["LangGraph", "CrewAI", "FastAPI"] },
      server: { title: "MCP & Ray Core", icon: "Server", desc: "Distributed Computing", tags: ["Ray", "Temporal", "Docker Sandboxes"] },
      database: { title: "Mem0 & PostgreSQL", icon: "Database", desc: "Hierarchical Memory", type: "Episodic / Vector", platform: "Cloud Native" },
      devops: ["LangSmith", "Arize Phoenix", "Docker", "Prometheus"]
    },
    projects: [
      { icon: "Users", title: "Autonomous Cybersecurity Red/Blue Swarm", tag: "SECURITY SWARM", desc: "Adversarial multi-agent network where red-team agents attempt prompt injections and tool exploits while blue-team agents adaptively deploy runtime patches.", features: ["Competitive Agent Co-evolution", "Automated Exploit Synthesis", "Zero-Human Intervention"], borderColor: "border-indigo-500/30" },
      { icon: "Cpu", title: "Full-Stack Software Engineering Swarm", tag: "DEV SWARM", desc: "Multi-agent squad composed of Product Manager, Architect, Frontend Developer, Backend Developer, and QA Agent that collaboratively write, test, and deploy web applications.", features: ["PR Generation", "Automated Unit Test Cycles", "Inter-Agent Code Review"], borderColor: "border-fuchsia-500/30" }
    ],
    careerOutcomes: "Multi-Agent Systems Engineer, Compound AI Architect, Staff AI Researcher ($195k-$330k)"
  },

  "llmops-ai-gateway-infrastructure": {
    title: "LLMOps & AI Gateway Infrastructure",
    tagline: "High-Throughput Inference, vLLM & Observability",
    duration: "4 Months",
    overview: "Deploying AI at scale requires bulletproof infrastructure. Master AI Gateways, token cost optimization, semantic caching, intelligent fallback routing, multi-provider rate limiting, self-hosted open-source model serving with vLLM/SGLang, and full OpenTelemetry tracing.",
    objectives: [
      { num: "01", color: "teal", icon: "Layers", title: "AI Gateway Architecture", desc: "Build unified API proxying, fallbacks, semantic caching, and streaming token protocol conversion." },
      { num: "02", color: "cyan", icon: "Zap", title: "Self-Hosted Inference (vLLM)", desc: "Configure high-throughput PagedAttention, continuous batching, and tensor parallelism on GPUs." },
      { num: "03", color: "blue", icon: "Activity", title: "Telemetry & OpenTelemetry", desc: "Implement distributed tracing, TTFT (Time to First Token) tracking, and cost per tenant." },
      { num: "04", color: "emerald", icon: "ShieldCheck", title: "Cost & Rate Engineering", desc: "Deploy dynamic token quotas, user-tier rate limiting, and cost anomaly alerts." }
    ],
    outcomes: [
      { label: "CLO 01", color: "teal", icon: "Award", title: "LLMOps Platform Engineer", desc: "Architect infrastructure serving billions of tokens per month with 99.99% availability." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Gateways, Semantic Caching & Routing", subtitle: "MONTHS 1-2", color: "teal",
        modules: [
          { code: "M1", title: "AI Gateway Internals", weeks: "Weeks 1-4", icon: "Layers", color: "teal", tags: ["LiteLLM", "Kong / Envoy", "Dynamic Routing"], desc: "Routing requests across OpenAI, Anthropic, and local models with automated failover." },
          { code: "M2", title: "Semantic Caching & Token Economics", weeks: "Weeks 5-8", icon: "Zap", color: "cyan", tags: ["Redis", "GPTCache", "Cosine Thresholds"], desc: "Caching fuzzy semantic queries to cut token costs by up to 60% and achieve sub-10ms response." }
        ],
        milestoneTitle: "High-Performance AI Gateway", milestoneDesc: "Sub-5ms Overhead Proxy", milestoneFeatures: ["Multi-Provider Failover", "Semantic Cache", "Tenant Quota Limits"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Self-Hosted Inference & Observability", subtitle: "MONTHS 3-4", color: "blue",
        modules: [
          { code: "M3", title: "vLLM, Tensor Parallelism & SGLang", weeks: "Weeks 9-12", icon: "Cpu", color: "blue", tags: ["vLLM", "PagedAttention", "Triton", "Quantization"], desc: "Running Llama 3 and Mistral on NVIDIA GPUs with maximum throughput and memory efficiency." },
          { code: "M4", title: "OpenTelemetry & GenAI Observability", weeks: "Weeks 13-16", icon: "Activity", color: "emerald", tags: ["OpenTelemetry", "Prometheus", "Grafana", "Helicone"], desc: "Tracing full execution trees, TTFT, token consumption per user, and latency percentiles." }
        ],
        milestoneTitle: "Enterprise GPU Inference Cluster", milestoneDesc: "Kubernetes vLLM Cluster", milestoneFeatures: ["Autoscaling on GPU Queue", "Prometheus Dashboards", "99.99% SLA"]
      }
    ],
    techStack: {
      client: { title: "Go & Python", icon: "Code2", desc: "Gateway Engine", tags: ["Go 1.22", "FastAPI", "gRPC"] },
      server: { title: "vLLM & LiteLLM", icon: "Server", desc: "Inference Engine", tags: ["vLLM", "SGLang", "LiteLLM", "Ray Serve"] },
      database: { title: "Redis & ClickHouse", icon: "Database", desc: "Cache & Metrics", type: "In-Memory & OLAP", platform: "High Throughput" },
      devops: ["Kubernetes", "NVIDIA Container Toolkit", "OpenTelemetry", "Terraform"]
    },
    projects: [
      { icon: "Layers", title: "Ultra-Low Latency Enterprise AI Gateway", tag: "INFRASTRUCTURE", desc: "A production reverse proxy processing 15,000 requests/sec with automated multi-cloud fallback routing, streaming SSE passthrough, and semantic caching.", features: ["Multi-Cloud Failover", "Token Usage Quotas", "Tenant Cost Tracking"], borderColor: "border-teal-500/30" },
      { icon: "Zap", title: "Self-Hosted Multi-GPU vLLM Fleet on Kubernetes", tag: "GPU COMPUTE", desc: "Kubernetes cluster managing 16x H100 GPUs with PagedAttention and continuous batching serving private 70B parameter models under strict data sovereignty rules.", features: ["Horizontal Pod Autoscaling", "Zero Cloud Model Leakage", "Sub-15ms TTFT"], borderColor: "border-cyan-500/30" }
    ],
    careerOutcomes: "LLMOps Engineer, AI Infrastructure Architect, Platform Reliability Lead ($185k-$310k)"
  },

  "synthetic-data-post-training-alignment": {
    title: "Synthetic Data & Post-Training Alignment",
    tagline: "DPO, RLHF & Domain SLM Distillation",
    duration: "4 Months",
    overview: "Frontier companies no longer rely solely on massive generic models. Master post-training alignment and data curation: generate high-fidelity synthetic datasets using frontier models, curate preference pairs, perform Direct Preference Optimization (DPO), and distill giant models into fast, hyper-efficient Small Language Models (SLMs) with Unsloth.",
    objectives: [
      { num: "01", color: "rose", icon: "Database", title: "Synthetic Data Generation", desc: "Evol-Instruct, UltraFeedback, and rejection sampling pipelines for high-quality dataset synthesis." },
      { num: "02", color: "pink", icon: "Sliders", title: "Direct Preference Optimization", desc: "Align models with DPO, KTO, and ORPO without the instability of traditional PPO/RLHF." },
      { num: "03", color: "purple", icon: "Cpu", title: "SLM Distillation & Unsloth", desc: "Distill reasoning capabilities from frontier models into 3B/7B models using Unsloth 5x faster." },
      { num: "04", color: "emerald", icon: "CheckCircle", title: "Quantization & Local Edge Deploy", desc: "Convert aligned models to GGUF, AWQ, and EXL2 formats for edge and mobile execution." }
    ],
    outcomes: [
      { label: "CLO 01", color: "rose", icon: "Award", title: "Alignment & Post-Training Engineer", desc: "Build domain-specialized small models outperforming general-purpose foundation LLMs." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Synthetic Data Curation & Filtering", subtitle: "MONTHS 1-2", color: "rose",
        modules: [
          { code: "M1", title: "Evol-Instruct & Data Synthesis", weeks: "Weeks 1-4", icon: "Database", color: "rose", tags: ["Evol-Instruct", "Quality Filtering", "Deduplication"], desc: "Generating complex instruction-tuning datasets with automated perplexity filtering." },
          { code: "M2", title: "Preference Pair Construction", weeks: "Weeks 5-8", icon: "Sliders", color: "pink", tags: ["Chosen/Rejected Pairs", "UltraFeedback", "Rubric Scoring"], desc: "Creating high-contrast chosen vs rejected responses for alignment algorithms." }
        ],
        milestoneTitle: "500k Domain Synthetic Dataset", milestoneDesc: "High-Quality Clean Dataset", milestoneFeatures: ["MinHash Deduplication", "Automated Quality Filtering", "Format Cleaned"]
      },
      {
        id: "phase2", name: "PHASE II", title: "DPO Alignment & Distillation with Unsloth", subtitle: "MONTHS 3-4", color: "purple",
        modules: [
          { code: "M3", title: "Fine-Tuning & DPO Alignment", weeks: "Weeks 9-12", icon: "Cpu", color: "purple", tags: ["Unsloth", "LoRA / QLoRA", "DPO", "TRL"], desc: "Fine-tuning base models and applying Direct Preference Optimization for human alignment." },
          { code: "M4", title: "Distillation & Quantization (GGUF/AWQ)", weeks: "Weeks 13-16", icon: "CheckCircle", color: "emerald", tags: ["Knowledge Distillation", "GGUF", "Ollama", "Edge Deployment"], desc: "Distilling 70B teacher reasoning into a 3B student model running on laptops and edge devices." }
        ],
        milestoneTitle: "Specialized Legal/Medical 7B SLM", milestoneDesc: "DPO-Aligned Local Model", milestoneFeatures: ["Outperforms Base 70B on Domain Tasks", "Runs locally via Ollama", "Sub-50ms Inference"]
      }
    ],
    techStack: {
      client: { title: "PyTorch & HuggingFace", icon: "Code2", desc: "ML Core", tags: ["PyTorch 2.3", "Transformers", "TRL", "Datasets"] },
      server: { title: "Unsloth & Axolotl", icon: "Zap", desc: "Training Engine", tags: ["Unsloth", "FlashAttention-2", "Deepspeed"] },
      database: { title: "Hugging Face Hub & MinIO", icon: "Database", desc: "Artifact Store", type: "Weights & Datasets", platform: "Cloud Object Storage" },
      devops: ["Weights & Biases", "Ollama", "Docker", "RunPod / Lambda Labs"]
    },
    projects: [
      { icon: "Database", title: "Domain Specific Medical Diagnostic SLM", tag: "HEALTHCARE SLM", desc: "Curating 200,000 clinical case studies, generating synthetic doctor-patient dialogs, and aligning a 3B parameter model via DPO to match specialist diagnostic accuracy.", features: ["DPO Preference Alignment", "Unsloth 5x Acceleration", "Ollama Edge Packaging"], borderColor: "border-rose-500/30" },
      { icon: "Cpu", title: "Proprietary Code Translation SLM", tag: "ENTERPRISE", desc: "Distilling legacy COBOL to modern Go syntax understanding into an offline 7B model running on secure developer workstations with zero external cloud dependencies.", features: ["Knowledge Distillation", "AST Evaluation", "Zero Cloud Leakage"], borderColor: "border-purple-500/30" }
    ],
    careerOutcomes: "Post-Training Engineer, Alignment Researcher, AI Model Specialist ($190k-$340k)"
  },

  "physical-ai-spatial-intelligence": {
    title: "Physical AI & Spatial Intelligence",
    tagline: "Vision-Language-Action & World Models",
    duration: "5 Months",
    overview: "The next frontier of AI interacts with the physical world. Learn Vision-Language-Action (VLA) architectures, 3D Gaussian Splatting, neural radiance fields (NeRFs), physics-grounded world simulators, spatial computing, and embodied intelligence with NVIDIA Isaac Sim and ROS 2.",
    objectives: [
      { num: "01", color: "lime", icon: "Eye", title: "Spatial Representation", desc: "Master 3D Gaussian Splatting, point clouds, and spatial scene graphs for real-time 3D perception." },
      { num: "02", color: "emerald", icon: "Bot", title: "VLA Architectures", desc: "Understand Vision-Language-Action models (RT-2, OpenVLA) translating visual instructions into robotic actions." },
      { num: "03", color: "teal", icon: "Boxes", title: "Physics Simulators & Isaac Sim", desc: "Train embodied policies in NVIDIA Isaac Sim and Isaac Lab with domain randomization." },
      { num: "04", color: "cyan", icon: "Compass", title: "Sim-to-Real Transfer", desc: "Bridge the reality gap using reinforcement learning, sensor noise modeling, and ROS 2 execution." }
    ],
    outcomes: [
      { label: "CLO 01", color: "lime", icon: "Award", title: "Physical AI Engineer", desc: "Develop embodied AI agents and world models capable of perceiving and acting in physical spaces." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "3D Perception & Spatial World Models", subtitle: "MONTHS 1-2", color: "lime",
        modules: [
          { code: "M1", title: "3D Gaussian Splatting & Scene Graphs", weeks: "Weeks 1-4", icon: "Eye", color: "lime", tags: ["Gaussian Splatting", "Point Clouds", "Depth Estimation"], desc: "Reconstructing high-fidelity 3D environments from RGB-D camera feeds in real time." },
          { code: "M2", title: "World Models & Video Generation", weeks: "Weeks 5-8", icon: "Compass", color: "emerald", tags: ["World Models", "Diffusion", "Physics Prediction"], desc: "Predicting future world states, object dynamics, and collision probabilities." }
        ],
        milestoneTitle: "Real-Time 3D Digital Twin", milestoneDesc: "Spatial Perception Pipeline", milestoneFeatures: ["Gaussian Splat Reconstruction", "Physics Collision Mesh", "Sub-30ms Camera Tracking"]
      },
      {
        id: "phase2", name: "PHASE II", title: "VLA Models, Isaac Sim & Sim-to-Real", subtitle: "MONTHS 3-5", color: "teal",
        modules: [
          { code: "M3", title: "VLA Model Training & Action Tokens", weeks: "Weeks 9-14", icon: "Bot", color: "teal", tags: ["OpenVLA", "Action Discretization", "Imitation Learning"], desc: "Fine-tuning vision-language models to output continuous robotic motor control trajectories." },
          { code: "M4", title: "NVIDIA Isaac Sim & ROS 2 Deployment", weeks: "Weeks 15-20", icon: "Boxes", color: "cyan", tags: ["NVIDIA Isaac Sim", "ROS 2", "Sim-to-Real", "Domain Randomization"], desc: "Massively parallel simulation training and hardware deployment on real robotic arms and mobile bases." }
        ],
        milestoneTitle: "Autonomous Physical Pick-and-Place Agent", milestoneDesc: "VLA-Controlled Robot", milestoneFeatures: ["Zero-Shot Generalization", "ROS 2 Hardware Driver", "Isaac Sim Validated"]
      }
    ],
    techStack: {
      client: { title: "Python & C++", icon: "Code2", desc: "Robotics Core", tags: ["Python 3.11", "C++20", "ROS 2 Humble"] },
      server: { title: "NVIDIA Isaac & PyTorch", icon: "Cpu", desc: "Physics & Training", tags: ["NVIDIA Isaac Sim", "Isaac Lab", "OpenVLA", "PyTorch"] },
      database: { title: "Spatial Scene DB", icon: "Database", desc: "3D Storage", type: "Spatial Octree", platform: "USD / Open3D" },
      devops: ["Docker", "NVIDIA Omniverse", "Gazebo", "Foxglove Studio"]
    },
    projects: [
      { icon: "Bot", title: "Natural Language Autonomous Mobile Robot (AMR)", tag: "EMBODIED AI", desc: "An autonomous warehouse robot that receives conversational instructions ('Find the blue pallet and deliver it to Bay 4'), constructs a 3D scene graph, and navigates obstacles.", features: ["Real-Time 3D SLAM", "VLA Navigation Planner", "Dynamic Obstacle Avoidance"], borderColor: "border-lime-500/30" },
      { icon: "Eye", title: "Industrial Spatial Twin for Manufacturing Inspection", tag: "SPATIAL AI", desc: "Gaussian splatting scanner inspecting aerospace turbine components for sub-millimeter defects by comparing live camera scans against CAD models in real time.", features: ["Gaussian Splatting", "CAD Mesh Deviation Analysis", "Sub-Millimeter Precision"], borderColor: "border-teal-500/30" }
    ],
    careerOutcomes: "Physical AI Engineer, Robotics AI Specialist, Spatial Computing Architect ($200k-$360k)"
  },

  "ai-security-adversarial-red-teaming": {
    title: "AI Security & Adversarial Red Teaming",
    tagline: "Hardening LLMs Against Prompt Injections & Jailbreaks",
    duration: "3 Months",
    overview: "As enterprises deploy autonomous agents with database access and financial authorization, AI security is the new cybersecurity frontline. Master indirect prompt injection attacks, multi-turn jailbreaking, training data reconstruction, model weight extraction, safe execution sandboxes, and the OWASP Top 10 for LLMs.",
    objectives: [
      { num: "01", color: "red", icon: "ShieldAlert", title: "Adversarial Prompt Injections", desc: "Exploit and remediate direct, indirect, and multimodal prompt injection vectors." },
      { num: "02", color: "stone", icon: "Lock", title: "Multi-Turn Jailbreaks", desc: "Analyze Crescendo attacks, role-play bypasses, and token manipulation techniques." },
      { num: "03", color: "orange", icon: "Terminal", title: "Secure Sandboxing", desc: "Isolate untrusted LLM-generated code using gVisor, Firecracker, and WASM runtimes." },
      { num: "04", color: "emerald", icon: "ShieldCheck", title: "Defense & OWASP Compliance", desc: "Implement input sanitizers, dual-LLM trust architectures, and automated red-teaming CI." }
    ],
    outcomes: [
      { label: "CLO 01", color: "red", icon: "Award", title: "AI Red Team Specialist", desc: "Audit and fortify enterprise Generative AI systems against state-of-the-art security exploits." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Offensive AI: Injections, Jailbreaks & Exfiltration", subtitle: "MONTHS 1-2", color: "red",
        modules: [
          { code: "M1", title: "Direct & Indirect Prompt Injections", weeks: "Weeks 1-4", icon: "ShieldAlert", color: "red", tags: ["Indirect Injection", "RAG Poisoning", "Data Exfiltration"], desc: "Hiding payload instructions in PDFs, markdown images, and web search results to hijack agent control." },
          { code: "M2", title: "Advanced Jailbreaks & Token Exploits", weeks: "Weeks 5-8", icon: "Lock", color: "stone", tags: ["Crescendo Attack", "Base64 Obfuscation", "Multi-Turn Bypasses"], desc: "Gradual multi-turn rapport building and token manipulation that bypasses safety alignments." }
        ],
        milestoneTitle: "Automated Red-Teaming Arsenal", milestoneDesc: "Penetration Testing Framework", milestoneFeatures: ["500+ Exploit Payloads", "Automated RAG Poisoner", "Jailbreak Success Metrics"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Defensive AI: Sandboxing, Guardrails & Auditing", subtitle: "MONTH 3", color: "emerald",
        modules: [
          { code: "M3", title: "Secure Code Sandboxing (gVisor / Firecracker)", weeks: "Weeks 9-10", icon: "Terminal", color: "orange", tags: ["Firecracker MicroVMs", "gVisor", "WASM Sandboxes"], desc: "Preventing host kernel compromise when executing LLM-generated code." },
          { code: "M4", title: "Dual-LLM Architectures & Defense-in-Depth", weeks: "Weeks 11-12", icon: "ShieldCheck", color: "emerald", tags: ["Dual-LLM Pattern", "NeMo Guardrails", "OWASP LLM Top 10"], desc: "Segregating untrusted data processing from privileged action execution with automated auditing." }
        ],
        milestoneTitle: "Enterprise AI Security Shield", milestoneDesc: "Hardened Zero-Trust AI Architecture", milestoneFeatures: ["Dual-LLM Privilege Separation", "MicroVM Code Isolation", "Real-Time Exfiltration Blocker"]
      }
    ],
    techStack: {
      client: { title: "Python & Bash", icon: "Code2", desc: "Exploit & Test", tags: ["Python 3.12", "Kali Linux", "Garak", "PyRIT"] },
      server: { title: "gVisor & Firecracker", icon: "Shield", desc: "Execution Sandbox", tags: ["gVisor", "Firecracker", "Docker", "Wasmtime"] },
      database: { title: "Audit Trail DB", icon: "Database", desc: "Immutable Logs", type: "Security Telemetry", platform: "Elastic / Splunk" },
      devops: ["PyRIT (Microsoft)", "Garak", "NeMo Guardrails", "GitHub Actions"]
    },
    projects: [
      { icon: "ShieldAlert", title: "Enterprise Autonomous Red Teamer (PyRIT Powered)", tag: "OFFENSIVE AI", desc: "An automated red-teaming orchestrator that systematically bombards target enterprise AI endpoints with 20,000 adversarial permutations to detect vulnerabilities before adversaries do.", features: ["Automated Jailbreak Generation", "RAG Poisoning Simulator", "CVSS Risk Scoring"], borderColor: "border-red-500/30" },
      { icon: "ShieldCheck", title: "Zero-Trust Dual-LLM Financial Action Gateway", tag: "DEFENSIVE AI", desc: "A banking architecture isolating customer communication in an unprivileged LLM while routing verified instructions through a sanitized schema checker to an isolated action agent.", features: ["Zero Direct Injection Pathway", "MicroVM Isolation", "Cryptographic Audit Ledger"], borderColor: "border-emerald-500/30" }
    ],
    careerOutcomes: "AI Security Engineer, Adversarial Red Teamer, Principal AI Trust Architect ($180k-$320k)"
  }
};

// Aliases for slug variations
curriculumDataEmerging["compound-ai-multi-agent-swarms"] = curriculumDataEmerging["compound-ai-systems-multi-agent-swarms"];
curriculumDataEmerging["compound-ai-systems"] = curriculumDataEmerging["compound-ai-systems-multi-agent-swarms"];
curriculumDataEmerging["production-rag-advanced-retrieval"] = curriculumDataEmerging["production-rag"];
curriculumDataEmerging["loop-engineering-autonomous-agents"] = curriculumDataEmerging["loop-engineering"];
curriculumDataEmerging["graph-engineering-graphrag"] = curriculumDataEmerging["graph-engineering"];
curriculumDataEmerging["forward-deployed-engineering"] = curriculumDataEmerging["forward-deployed-engineer"];
curriculumDataEmerging["llmops-infrastructure"] = curriculumDataEmerging["llmops-ai-gateway-infrastructure"];
curriculumDataEmerging["synthetic-data-alignment"] = curriculumDataEmerging["synthetic-data-post-training-alignment"];
curriculumDataEmerging["physical-ai-world-models"] = curriculumDataEmerging["physical-ai-spatial-intelligence"];
curriculumDataEmerging["ai-security-red-teaming"] = curriculumDataEmerging["ai-security-adversarial-red-teaming"];

