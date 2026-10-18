export const curriculumDataFrontier = {
  // ==========================================
  // 1. AR/VR & SPATIAL COMPUTING (VISIONOS)
  // ==========================================
  "spatial-computing-ar-vr-visionos": {
    title: "Spatial Computing: AR/VR & visionOS",
    tagline: "visionOS, Gaussian Splatting & Real-Time Spatial UI",
    duration: "4 Months",
    overview: "Step beyond flat screens into the realm of spatial computing and immersive mixed reality. Master Apple visionOS with SwiftUI and RealityKit, 3D Gaussian Splatting for photorealistic environment capture, OpenXR standard cross-platform VR on Meta Quest, eye-tracking interaction paradigms, and real-time WebXR spatial audio rendering.",
    objectives: [
      { num: "01", color: "purple", icon: "Boxes", title: "visionOS & RealityKit Core", desc: "Build spatial windows, volumetric scenes, and immersive 3D portals using SwiftUI, RealityKit, and Reality Composer Pro." },
      { num: "02", color: "indigo", icon: "Layers", title: "3D Gaussian Splatting & NeRFs", desc: "Train, prune, and render real-time volumetric radiance fields and Gaussian splats at 90 FPS on mobile XR chipsets." },
      { num: "03", color: "blue", icon: "Eye", title: "OpenXR & Eye/Hand Tracking", desc: "Implement low-latency pinch gestures, foveated rendering with eye tracking, and physics-based hand interactions." },
      { num: "04", color: "emerald", icon: "Sparkles", title: "Spatial Audio & WebXR Pipelines", desc: "Engineer binaural HRTF acoustic propagation and high-concurrency multi-user spatial web spaces over WebSockets." }
    ],
    outcomes: [
      { label: "CLO 01", color: "purple", icon: "Award", title: "Spatial Computing Architect", desc: "Design and ship enterprise-grade mixed reality applications and photorealistic spatial rendering pipelines." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "visionOS, RealityKit & Spatial UI", subtitle: "MONTHS 1-2", color: "purple",
        modules: [
          { code: "M1", title: "visionOS Paradigms & Reality Composer Pro", weeks: "Weeks 1-4", icon: "Boxes", color: "purple", tags: ["SwiftUI Spatial", "RealityKit", "Reality Composer Pro", "Custom Shaders"], desc: "Building spatial windows, 3D volumetric models, and custom materials using RealityKit 4." },
          { code: "M2", title: "Gaze & Pinch Interaction Mechanics", weeks: "Weeks 5-8", icon: "Eye", color: "indigo", tags: ["Eye Tracking", "Spatial Gestures", "Foveated Rendering", "Spatial Anchors"], desc: "Architecting sub-10ms response gesture engines and eye-directed focus states without UI latency." }
        ],
        milestoneTitle: "Enterprise Collaborative Spatial Workspace", milestoneDesc: "Production visionOS Native Core", milestoneFeatures: ["Volumetric CAD Model Inspector", "Shared SharePlay Real-Time Session", "Foveated Eye-Tracking UI"]
      },
      {
        id: "phase2", name: "PHASE II", title: "3D Gaussian Splatting & Cross-Platform OpenXR", subtitle: "MONTHS 3-4", color: "emerald",
        modules: [
          { code: "M3", title: "3D Gaussian Splatting & Volumetric Capture", weeks: "Weeks 9-12", icon: "Layers", color: "blue", tags: ["Gaussian Splatting", "NeRFs", "CUDA Rasterizer", "Ply Compression"], desc: "Capturing real-world environments, training Gaussian splat point clouds, and optimizing for real-time mobile rendering." },
          { code: "M4", title: "OpenXR & Multi-User Spatial Networking", weeks: "Weeks 13-16", icon: "Sparkles", color: "emerald", tags: ["OpenXR", "Meta Quest 3", "Normcore / Photon", "Spatial Audio HRTF"], desc: "Deploying cross-platform XR clients on Meta Quest and WebXR with HRTF spatial audio simulation." }
        ],
        milestoneTitle: "Photorealistic Gaussian Splat Telepresence Suite", milestoneDesc: "Cross-Platform Spatial Collaboration", milestoneFeatures: ["Sub-11ms Frame Time", "1.5M Rendered Splats at 90 FPS", "Spatial Binaural Voice Relay"]
      }
    ],
    techStack: {
      client: { title: "SwiftUI, RealityKit & OpenXR", icon: "Boxes", desc: "Spatial Runtime", tags: ["visionOS", "SwiftUI", "RealityKit", "OpenXR"] },
      server: { title: "WebSockets & WebRTC Spatial Voice", icon: "Terminal", desc: "Network Core", tags: ["WebRTC", "LiveKit", "Node.js", "C++"] },
      database: { title: "USDZ 3D Asset Store & PostgreSQL", icon: "Database", desc: "Asset Storage", type: "3D Object Storage", platform: "Cloudflare R2 / S3" },
      devops: ["Xcode 16", "Unity PolySpatial", "Nerfstudio", "Docker"]
    },
    projects: [
      { icon: "Layers", title: "Real-Time 3D Gaussian Splatting Architectural Inspector", tag: "SPATIAL RENDERING", desc: "A high-fidelity mixed reality spatial viewer rendering 1.5M splats at 90 FPS with foveated depth slicing and interactive measurement calipers.", features: ["3D Gaussian Rasterization", "Gaze-Directed Slicing", "Spatial Anchor Pinning"], borderColor: "border-purple-500/30" },
      { icon: "Boxes", title: "Multi-User Collaborative Spatial Medical Anatomy Lab", tag: "CROSS-PLATFORM XR", desc: "Cross-platform visionOS and Quest 3 application streaming volumetric MRI reconstructions with multi-user spatial voice and collaborative dissection tools.", features: ["SharePlay & WebRTC Sync", "Sub-15ms Hand Interactions", "HRTF Spatial Audio"], borderColor: "border-indigo-500/30" }
    ],
    careerOutcomes: "Spatial Computing Engineer, visionOS Lead Developer, Mixed Reality Graphics Architect ($190k-$410k)"
  },

  // ==========================================
  // 2. REAL ESTATE (PROPTECH & TOKENIZATION)
  // ==========================================
  "proptech-ai-valuation-real-estate-tokenization": {
    title: "PropTech: AI Valuation & Real Estate Tokenization",
    tagline: "Automated Valuation, ERC-3643 Tokenization & BIM Digital Twins",
    duration: "3 Months",
    overview: "Disrupt the world's largest asset class with modern PropTech engineering. Master Automated Valuation Models (AVMs) using multi-modal satellite GIS and geospatial computer vision, institutional-grade real estate debt/equity underwriting models, fractional real estate tokenization complying with ERC-3643 securities standards, and IoT-driven BIM digital twins for commercial buildings.",
    objectives: [
      { num: "01", color: "emerald", icon: "Building", title: "Automated Valuation Models (AVMs)", desc: "Build ML pipelines integrating geospatial hedonic pricing, spatial autocorrelation (Kriging), and satellite computer vision." },
      { num: "02", color: "blue", icon: "Coins", title: "Fractional Asset Tokenization", desc: "Implement compliant permissioned token standards (ERC-3643 T-REX) for secondary market liquidity and automated distributions." },
      { num: "03", color: "amber", icon: "Layers", title: "BIM Digital Twins & Building IoT", desc: "Stream IFC/Revit building information models and real-time HVAC/energy sensor telemetry over MQTT." },
      { num: "04", color: "teal", icon: "TrendingUp", title: "Institutional Underwriting & DCF", desc: "Automate Argus-grade discounted cash flow (DCF), rent roll parsing, lease waterfall modeling, and debt covenants." }
    ],
    outcomes: [
      { label: "CLO 01", color: "emerald", icon: "Award", title: "PropTech Systems Architect", desc: "Deploy end-to-end algorithmic real estate valuation platforms and regulatory-compliant fractional asset syndications." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Geospatial AVMs & Institutional Underwriting", subtitle: "MONTHS 1-2", color: "emerald",
        modules: [
          { code: "M1", title: "Spatial Hedonic Pricing & Satellite AVMs", weeks: "Weeks 1-4", icon: "Building", color: "emerald", tags: ["Spatial Autoregressive", "PostGIS", "Satellite Imagery", "Hedonic Modeling"], desc: "Combining street-view computer vision features with spatial regression to predict residential and commercial valuation." },
          { code: "M2", title: "Algorithmic Lease Underwriting & DCF", weeks: "Weeks 5-8", icon: "TrendingUp", color: "teal", tags: ["Argus Emulation", "Rent Roll Ingestion", "Debt Service Coverage", "Waterfall Math"], desc: "Automating rent roll extraction, debt service coverage ratio (DSCR) calculations, and multi-tier equity promotes." }
        ],
        milestoneTitle: "Commercial Real Estate Automated Underwriting Engine", milestoneDesc: "Institutional Cash Flow Core", milestoneFeatures: ["Sub-3s PDF Rent Roll Parsing", "Automated 10-Year DCF Forecast", "Geospatial Cap Rate Heatmaps"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Securitization, Tokenization & Digital Twins", subtitle: "MONTHS 2-3", color: "blue",
        modules: [
          { code: "M3", title: "Compliant Fractional Tokenization (ERC-3643)", weeks: "Weeks 9-10", icon: "Coins", color: "blue", tags: ["ERC-3643 T-REX", "Identity Registry", "On-Chain Dividends", "Compliance Oracles"], desc: "Issuing regulated security tokens with on-chain transfer restrictions, KYC identity verification, and automated yield distribution." },
          { code: "M4", title: "BIM 3D Digital Twins & Energy Telemetry", weeks: "Weeks 11-12", icon: "Layers", color: "amber", tags: ["IFC BIM", "Three.js / Speckle", "MQTT Building Sensors", "Energy Optimization"], desc: "Creating interactive 3D digital twins of high-rise commercial assets with real-time IoT power sensor feeds and HVAC predictive maintenance." }
        ],
        milestoneTitle: "Regulated On-Chain Real Estate Syndication Portal", milestoneDesc: "Production PropTech Platform", milestoneFeatures: ["Fractional $40M Asset Offering", "Automated KYC Investor Whitelist", "Quarterly USDC Dividend Smart Contract"]
      }
    ],
    techStack: {
      client: { title: "Next.js 15, Three.js & Mapbox GL", icon: "Code2", desc: "User Interface", tags: ["Next.js 15", "Three.js", "Mapbox GL", "Tailwind CSS"] },
      server: { title: "Python 3.11, FastAPI & Node.js", icon: "Terminal", desc: "Valuation & Business Logic", tags: ["FastAPI", "Pandas", "Shapely", "Viem"] },
      database: { title: "PostgreSQL + PostGIS & TimescaleDB", icon: "Database", desc: "Geospatial & Time-Series", type: "Geospatial Relational", platform: "Supabase / AWS RDS" },
      devops: ["Docker", "Foundry", "Terraform", "GitHub Actions"]
    },
    projects: [
      { icon: "Building", title: "Multi-Modal Geospatial Property Valuation Engine (AVM)", tag: "AI PROPTECH", desc: "Machine learning system predicting commercial asset transaction prices within 2.8% MAPE using street-view imagery, historical deed registries, and satellite urban density metrics.", features: ["Spatial PostGIS Queries", "Automated Comp Selection", "Cap Rate Forecasting"], borderColor: "border-emerald-500/30" },
      { icon: "Coins", title: "Institutional Commercial Real Estate Digital Twin & ESG Dashboard", tag: "DIGITAL TWINS", desc: "Interactive 3D building twin aggregating HVAC sensor streams, predicting tenant cooling demands, and automating fractional investor dividend payouts on Ethereum.", features: ["BIM IFC Ingestion", "Real-Time Sensor Telemetry", "ERC-3643 Token Settlement"], borderColor: "border-blue-500/30" }
    ],
    careerOutcomes: "Head of PropTech Engineering, Real Estate Quant Analyst, Tokenized Real Estate Architect ($170k-$380k)"
  },

  // ==========================================
  // 3. HEALTH (LONGEVITY & COMPUTATIONAL OMICS)
  // ==========================================
  "longevity-biotech-computational-omics": {
    title: "Longevity Biotech & Computational Omics",
    tagline: "Biological Age Clocks, Genomic Pipelines & AI Drug Discovery",
    duration: "4 Months",
    overview: "Decode the biology of aging and engineer precision longevity therapeutics. Master computational DNA methylation analysis, Horvath & GrimAge epigenetic aging clocks, single-cell RNA-seq trajectory inference, protein-ligand docking with AlphaFold & ESMFold, and machine learning models for drug repurposing targeting hallmarks of biological aging.",
    objectives: [
      { num: "01", color: "teal", icon: "Dna", title: "Epigenetic Aging Biomarkers", desc: "Train elastic net regression and deep neural networks on Illumina Infinium DNA methylation microarrays." },
      { num: "02", color: "emerald", icon: "Activity", title: "Single-Cell RNA-seq & Senolytics", desc: "Analyze cellular heterogeneity, scanpy workflows, and identify senescent cell secretomes (SASP)." },
      { num: "03", color: "blue", icon: "Atom", title: "Structural Proteomics (AlphaFold)", desc: "Run protein structure prediction and molecular dynamics simulations for small molecule binding pockets." },
      { num: "04", color: "purple", icon: "Sparkles", title: "AI-Driven Drug Repurposing Screens", desc: "Screen billions of drug-target interactions using graph neural networks (GNNs) for geroprotective compounds." }
    ],
    outcomes: [
      { label: "CLO 01", color: "teal", icon: "Award", title: "Longevity Computational Biologist", desc: "Develop biological age prediction pipelines and computational screening platforms for anti-aging interventions." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "DNA Methylation, Epigenetics & Aging Clocks", subtitle: "MONTHS 1-2", color: "teal",
        modules: [
          { code: "M1", title: "Methylation Microarrays & Horvath Clocks", weeks: "Weeks 1-4", icon: "Dna", color: "teal", tags: ["Illumina 850k", "CpG Sites", "Elastic Net", "DunedinPACE"], desc: "Normalizing raw IDAT microarray data, selecting key CpG dinucleotides, and training multi-tissue biological age clocks." },
          { code: "M2", title: "Single-Cell Transcriptomics & Senolytics", weeks: "Weeks 5-8", icon: "Activity", color: "emerald", tags: ["Scanpy", "Seurat", "Cell Trajectories", "Senescence Scoring"], desc: "Analyzing single-cell RNA-seq to track cellular senescence pathways and SASP biomarker expressions." }
        ],
        milestoneTitle: "Multi-Tissue Epigenetic Age Prediction Pipeline", milestoneDesc: "Clinical Biomarker Core", milestoneFeatures: ["Horvath & GrimAge Mathematical Formulation", "Sub-1.8 Years Mean Absolute Error", "DunedinPACE Rate-of-Aging Scorer"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Structural Biology & AI Drug Discovery", subtitle: "MONTHS 3-4", color: "purple",
        modules: [
          { code: "M3", title: "AlphaFold, ESMFold & Molecular Dynamics", weeks: "Weeks 9-12", icon: "Atom", color: "blue", tags: ["AlphaFold 3", "ESMFold", "OpenMM", "Binding Affinity"], desc: "Modeling 3D target receptor conformations and calculating free energy binding affinity with molecular mechanics." },
          { code: "M4", title: "Graph Neural Networks for Geroprotective Leads", weeks: "Weeks 13-16", icon: "Sparkles", color: "purple", tags: ["PyTorch Geometric", "Molecular Fingerprints", "ChEMBL", "ADMET Profiling"], desc: "Training message-passing GNNs to predict senolytic activity, bioavailability, and blood-brain barrier permeability." }
        ],
        milestoneTitle: "In Silico Longevity Drug Repurposing Campaign", milestoneDesc: "AI Molecular Discovery Suite", milestoneFeatures: ["Screening 100k Small Molecules", "mTOR & Sirtuin Target Binding Profiles", "Automated Toxicity & ADMET Filtering"]
      }
    ],
    techStack: {
      client: { title: "Streamlit & Py3Dmol Molecular Viewer", icon: "Monitor", desc: "Scientific UI", tags: ["Streamlit", "Py3Dmol", "Plotly", "Dash"] },
      server: { title: "Python 3.11, PyTorch & Nextflow", icon: "Terminal", desc: "Bioinformatics Engine", tags: ["Scanpy", "MNE", "PyTorch Geometric", "RDKit"] },
      database: { title: "ChEMBL, UniProt & GEO Microarray DB", icon: "Database", desc: "Biological Data", type: "Genomics & Proteomics", platform: "NCBI GEO / EMBL-EBI" },
      devops: ["Nextflow Bio", "Docker", "NVIDIA BioNeMo", "Slurm"]
    },
    projects: [
      { icon: "Dna", title: "Clinical-Grade DNA Methylation Epigenetic Clock API", tag: "EPIGENETICS", desc: "Production cloud API that ingests raw IDAT microarray data, normalizes background fluorescence, and outputs multi-organ biological age percentiles with rate-of-aging trajectories.", features: ["Batch Effect Correction", "Multi-Clock Ensemble", "Sub-Second Ingestion"], borderColor: "border-teal-500/30" },
      { icon: "Sparkles", title: "GNN-Powered Senolytic Drug Screening Pipeline", tag: "AI DRUG DISCOVERY", desc: "Graph neural network pipeline evaluating molecular graphs to identify novel compounds capable of selectively inducing apoptosis in senescent cells without harming healthy tissue.", features: ["Message-Passing GNN", "High-Throughput Docking", "ADMET Drug-Likeness Filters"], borderColor: "border-purple-500/30" }
    ],
    careerOutcomes: "Longevity Bioinformatician, Computational Biologist, Biotech AI Scientist ($185k-$420k)"
  },

  // ==========================================
  // 4. GPU (COMPUTE INFRASTRUCTURE)
  // ==========================================
  "gpu-cluster-architecture-compute-infra": {
    title: "GPU Cluster Architecture & Compute Infra",
    tagline: "Distributed Training Infra, InfiniBand Networks & Custom Kernels",
    duration: "4 Months",
    overview: "Architect and operate multi-thousand GPU superclusters powering frontier AI models. Master Slurm job scheduling, Kubernetes GPU operators, InfiniBand / RoCE non-blocking fat-tree network topologies, NCCL collective communications (Ring-AllReduce), GPUDirect RDMA storage caching, and writing custom OpenAI Triton and CUDA kernels for memory-bound operators.",
    objectives: [
      { num: "01", color: "lime", icon: "Server", title: "Supercluster Orchestration", desc: "Configure multi-node Slurm partitions, topology-aware scheduling, and Kubernetes GPU device plugins." },
      { num: "02", color: "emerald", icon: "Network", title: "InfiniBand & RoCE Fabrics", desc: "Troubleshoot PFC (Priority Flow Control), ECN congestion notifications, and rail-optimized InfiniBand fabrics." },
      { num: "03", color: "cyan", icon: "Cpu", title: "NCCL & Distributed Training", desc: "Profile NCCL Ring and Tree AllReduce algorithms, eliminating stragglers across 1,024-GPU clusters." },
      { num: "04", color: "amber", icon: "Zap", title: "Custom Triton & CUDA Kernels", desc: "Write fused FlashAttention, RMSNorm, and quantization kernels in OpenAI Triton achieving 80%+ hardware MFU." }
    ],
    outcomes: [
      { label: "CLO 01", color: "lime", icon: "Award", title: "Principal GPU Infrastructure Engineer", desc: "Design, provision, and maintain large-scale GPU training clusters with high Model Flops Utilization (MFU)." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Cluster Orchestration, InfiniBand & Storage", subtitle: "MONTHS 1-2", color: "emerald",
        modules: [
          { code: "M1", title: "Bare-Metal Slurm & Kubernetes GPU Operators", weeks: "Weeks 1-4", icon: "Server", color: "emerald", tags: ["Slurm Partitions", "NVIDIA GPU Operator", "MIG Slicing", "PyTorch Elastic"], desc: "Setting up topology-aware workload schedulers, multi-instance GPU partitions, and automated health checks." },
          { code: "M2", title: "InfiniBand Fabrics & GPUDirect RDMA", weeks: "Weeks 5-8", icon: "Network", color: "cyan", tags: ["Fat-Tree Topologies", "RoCE v2", "GPUDirect Storage", "WEKA / Lustre"], desc: "Configuring non-blocking optical fabrics, RoCE v2 congestion avoidance, and high-throughput parallel file systems." }
        ],
        milestoneTitle: "Automated Multi-Node Distributed Training Cluster", milestoneDesc: "High-Performance Cluster Core", milestoneFeatures: ["8-Node 64-GPU Infrastructure-as-Code", "Zero-Packet-Drop InfiniBand Fabric", "GPUDirect RDMA File Storage Mount"]
      },
      {
        id: "phase2", name: "PHASE II", title: "NCCL Tuning, Profiling & Triton Kernels", subtitle: "MONTHS 3-4", color: "lime",
        modules: [
          { code: "M3", title: "Distributed Profiling & NCCL AllReduce Tuning", weeks: "Weeks 9-12", icon: "Cpu", color: "lime", tags: ["NCCL Profiler", "PyTorch Profiler", "Straggler Detection", "MFU Metrics"], desc: "Analyzing GPU kernel timelines with Nsight Systems, isolating communication bottlenecks, and tuning buffer rings." },
          { code: "M4", title: "OpenAI Triton & Custom CUDA Fusions", weeks: "Weeks 13-16", icon: "Zap", color: "amber", tags: ["Triton GPU", "Shared Memory SRAM", "FlashAttention v3", "FP8 GEMM"], desc: "Writing fused matrix multiplication and attention kernels targeting SRAM to surpass standard PyTorch operator efficiency." }
        ],
        milestoneTitle: "Custom Fused Attention Kernel Benchmarking Suite", milestoneDesc: "High-MFU Operator Suite", milestoneFeatures: ["Triton FlashAttention Kernel", "22% Throughput Speedup vs PyTorch Baseline", "82% Model Flops Utilization (MFU)"]
      }
    ],
    techStack: {
      client: { title: "Grafana, Prometheus & DCGM Exporter", icon: "Monitor", desc: "Telemetry Dashboard", tags: ["Grafana", "DCGM", "Prometheus", "Nsight Systems"] },
      server: { title: "Linux Kernel, C++20 & Python", icon: "Terminal", desc: "Systems Engine", tags: ["PyTorch Distributed", "OpenAI Triton", "CUDA 12", "NCCL"] },
      database: { title: "Prometheus TSDB & TimescaleDB", icon: "Database", desc: "Hardware Telemetry", type: "Time-Series Metrics", platform: "Bare-Metal NVMe" },
      devops: ["Slurm", "Kubernetes", "Ansible", "Terraform"]
    },
    projects: [
      { icon: "Server", title: "Enterprise Multi-Node Slurm & InfiniBand Cluster Deployment", tag: "HPC INFRASTRUCTURE", desc: "Full declarative Infrastructure-as-Code automation setting up a 128-GPU H100 cluster with GPUDirect storage, automated node eviction on ECC errors, and topology-aware job placement.", features: ["Automated Slurm Deployment", "InfiniBand Subnet Management", "Dynamic Node Health Remediation"], borderColor: "border-lime-500/30" },
      { icon: "Zap", title: "Triton Custom Fused Multi-Head Latent Attention Kernel", tag: "KERNEL ENGINEERING", desc: "High-performance OpenAI Triton operator optimizing memory bandwidth, eliminating HBM roundtrips, and achieving 82% MFU on Hopper/Blackwell hardware.", features: ["SRAM Cache Block Tiling", "Online Softmax Rescaling", "FP8 / BF16 Mixed Precision"], borderColor: "border-amber-500/30" }
    ],
    careerOutcomes: "Staff GPU Infrastructure Engineer, AI HPC Systems Architect, Distributed Systems Specialist ($220k-$480k)"
  },

  // ==========================================
  // 5. PROPRIETARY DATASETS & SYNTHETIC DATA
  // ==========================================
  "proprietary-data-moats-synthetic-pipelines": {
    title: "Proprietary Data Moats & Synthetic Pipelines",
    tagline: "High-Value Data Curation, Extraction & Synthetic Generation",
    duration: "3 Months",
    overview: "In the post-pretraining era, models are commodities; proprietary data is the only defensible moat. Master building autonomous data flywheels, petabyte-scale web scraping and headless browser swarms, MinHash and semantic embedding deduplication, fine-grained text quality classifiers (fastText/LLM-as-a-judge), and distilling proprietary reasoning chains using synthetic multi-agent generation.",
    objectives: [
      { num: "01", color: "amber", icon: "Database", title: "Autonomous Data Flywheel Engineering", desc: "Instrument software products to capture rich implicit user feedback, counterfactuals, and high-signal action traces." },
      { num: "02", color: "orange", icon: "Globe", title: "Petabyte-Scale Web Extraction", desc: "Build distributed headless browser clusters with anti-detection, dynamic CAPTCHA bypass, and DOM parsers." },
      { num: "03", color: "rose", icon: "Filter", title: "Quality Filtering & Deduplication", desc: "Implement MinHash LSH, semantic embedding clustering, toxic content filtering, and educational value classifiers." },
      { num: "04", color: "purple", icon: "Sparkles", title: "Synthetic Data & Multi-Agent Distillation", desc: "Engineer multi-turn persona-driven LLM swarms producing verifiably correct reasoning, code, and synthetic dialogues." }
    ],
    outcomes: [
      { label: "CLO 01", color: "amber", icon: "Award", title: "Chief Data Architect", desc: "Build defensible proprietary data pipelines and automated synthetic curation systems for frontier models." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Web-Scale Extraction & Data Filtering", subtitle: "MONTHS 1-2", color: "amber",
        modules: [
          { code: "M1", title: "Distributed Crawling & Anti-Bot Infrastructure", weeks: "Weeks 1-4", icon: "Globe", color: "orange", tags: ["Playwright Swarms", "Proxy Rotation", "DOM Parsing", "HTML Cleansing"], desc: "Orchestrating thousands of headless browser instances with automated fingerprint spoofing and DOM extraction." },
          { code: "M2", title: "MinHash Deduplication & Quality Heuristics", weeks: "Weeks 5-8", icon: "Filter", color: "amber", tags: ["MinHash LSH", "Semantic Embeddings", "fastText Classifiers", "Perplexity Filters"], desc: "Eliminating duplicate documents at petabyte scale and scoring text quality using KenLM and small classifier ensembles." }
        ],
        milestoneTitle: "Petabyte-Scale Cleaned Web Corpus Pipeline", milestoneDesc: "High-Quality Ingestion Core", milestoneFeatures: ["500M Raw Pages Filtered", "Zero Duplicate Documents via MinHash LSH", "Scored for Educational Quality"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Synthetic Generation & Flywheel Instrumentation", subtitle: "MONTHS 2-3", color: "purple",
        modules: [
          { code: "M3", title: "Synthetic Reasoning & Multi-Agent Distillation", weeks: "Weeks 9-10", icon: "Sparkles", color: "purple", tags: ["Self-Instruct", "Evol-Instruct", "Verifier Models", "Constitutional AI"], desc: "Prompting frontier models with evolutionary complexity mutation and verifying reasoning steps with unit test oracles." },
          { code: "M4", title: "Data Flywheels & Legal/Licensing Governance", weeks: "Weeks 11-12", icon: "Database", color: "rose", tags: ["Action Traces", "Data Valuation", "Copyright Compliance", "DPO Datasets"], desc: "Instrumenting production web applications to capture expert behavioral trajectories and structuring DPO preference pairs." }
        ],
        milestoneTitle: "Autonomous Domain-Specific Synthetic Dataset Factory", milestoneDesc: "Production Synthetic Pipeline", milestoneFeatures: ["100k Verified Code Reasoning Pairs", "Automated Python Sandbox Test Execution", "Curated for Fine-Tuning & Alignment"]
      }
    ],
    techStack: {
      client: { title: "Streamlit & Apache Superset Data UI", icon: "Monitor", desc: "Data Quality Dashboard", tags: ["Streamlit", "Apache Superset", "Plotly"] },
      server: { title: "Python 3.11, Polars, Ray & Spark", icon: "Terminal", desc: "Distributed Data Engine", tags: ["Ray", "Polars", "PySpark", "Playwright"] },
      database: { title: "DuckDB, Apache Iceberg & ClickHouse", icon: "Database", desc: "Lakehouse Storage", type: "Columnar Lakehouse", platform: "S3 / MinIO" },
      devops: ["Ray Clusters", "Docker", "Apache Airflow", "MinIO"]
    },
    projects: [
      { icon: "Globe", title: "Web-Scale Automated Text Ingestion & MinHash Deduplicator", tag: "DATA PIPELINE", desc: "Distributed Ray cluster processing 100M documents per hour, removing 99.4% of duplicate paragraphs and classifying perplexity scores in real time.", features: ["Distributed MinHash LSH", "FastText Quality Scorer", "Zero Leakage Filtering"], borderColor: "border-orange-500/30" },
      { icon: "Sparkles", title: "Synthetic Multi-Agent Code Generation & Verification Engine", tag: "SYNTHETIC DATA", desc: "Self-improving synthetic pipeline that creates diverse programming challenges, executes test suites in isolated sandboxes, and compiles verified DPO datasets.", features: ["Evol-Instruct Synthesis", "Docker Sandbox Execution", "Automated DPO Alignment"], borderColor: "border-purple-500/30" }
    ],
    careerOutcomes: "Head of Data Strategy, AI Data Pipeline Architect, Lead Data Flywheel Engineer ($180k-$390k)"
  },

  // ==========================================
  // 6. AI-NATIVE SERVICE FIRMS
  // ==========================================
  "ai-native-service-firms-agentic-agencies": {
    title: "AI-Native Service Firms & Agentic Agencies",
    tagline: "Agentic Workforces, Productized Services & 80%+ Margins",
    duration: "3 Months",
    overview: "Transform traditional labor-intensive professional services into high-margin, scalable AI-native enterprises. Master Service-as-a-Software (SaaS 2.0), orchestrating multi-agent workforces for automated client delivery (legal, financial, creative, engineering), human-in-the-loop exception handling, value-based outcome pricing, and scaling an agency from zero to $10M ARR with sub-10 headcount.",
    objectives: [
      { num: "01", color: "indigo", icon: "Briefcase", title: "Service-as-a-Software Business Model", desc: "Structure AI-native consulting and agency offerings that transition from billable hours to value-based outcome pricing." },
      { num: "02", color: "purple", icon: "Bot", title: "Autonomous Multi-Agent Delivery", desc: "Build agentic orchestration loops that draft deliverables, review compliance, and generate client-ready outputs." },
      { num: "03", color: "pink", icon: "CheckCircle", title: "Human-in-the-Loop Quality Control", desc: "Design seamless triage dashboards where human domain experts intervene only when agent confidence scores fall below threshold." },
      { num: "04", color: "emerald", icon: "TrendingUp", title: "Scaling, Margins & Enterprise Sales", desc: "Package, price, and sell high-margin automated services to Fortune 500 procurement teams with SOC2 compliance." }
    ],
    outcomes: [
      { label: "CLO 01", color: "indigo", icon: "Award", title: "AI-Native Agency Founder / Operator", desc: "Launch and scale an AI-first service firm delivering agency work with software-like 80%+ gross margins." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Business Architecture & Agentic Workflow Design", subtitle: "MONTHS 1-2", color: "indigo",
        modules: [
          { code: "M1", title: "SaaS 2.0 Economics & Outcome-Based Pricing", weeks: "Weeks 1-4", icon: "Briefcase", color: "indigo", tags: ["Service-as-a-Software", "Outcome Pricing", "Unit Economics", "Gross Margin 80%"], desc: "Restructuring service contracts to sell outcomes rather than hourly time, achieving software-like recurring revenue." },
          { code: "M2", title: "Multi-Agent Delivery Pipeline Architecture", weeks: "Weeks 5-8", icon: "Bot", color: "purple", tags: ["LangGraph", "Tool Use", "Automated Deliverables", "Context Injection"], desc: "Constructing multi-agent directed acyclic graphs (DAGs) that research, outline, draft, critique, and finalize client deliverables." }
        ],
        milestoneTitle: "Zero-Human Baseline Deliverable Engine", milestoneDesc: "Autonomous Service Delivery Core", milestoneFeatures: ["Automated 40-Page Audit Report Generation", "Multi-Agent Drafting & Fact-Checking", "Sub-10-Minute Turnaround Time"]
      },
      {
        id: "phase2", name: "PHASE II", title: "HITL Governance, Enterprise Sales & Scale", subtitle: "MONTHS 2-3", color: "pink",
        modules: [
          { code: "M3", title: "Human-in-the-Loop Triage & Confidence Scoring", weeks: "Weeks 9-10", icon: "CheckCircle", color: "pink", tags: ["HITL Dashboard", "Confidence Thresholds", "Audit Trails", "Exception Handling"], desc: "Routing ambiguous outputs to specialized human reviewers and feeding corrections back into system prompt libraries." },
          { code: "M4", title: "Enterprise Packaging, SOC2 & Growth Flywheels", weeks: "Weeks 11-12", icon: "TrendingUp", color: "emerald", tags: ["Enterprise Procurement", "SOC2 Type II", "Client Retention", "Flywheel Scaling"], desc: "Passing enterprise security audits, setting up dedicated data isolation per tenant, and selling annual outcome-based contracts." }
        ],
        milestoneTitle: "Full-Stack AI-Native Agency Operating System", milestoneDesc: "Production Firm Platform", milestoneFeatures: ["Self-Serve Client Onboarding Portal", "Autonomous Pipeline with Human-in-Loop QA", "Integrated Stripe Usage & Retainer Billing"]
      }
    ],
    techStack: {
      client: { title: "Next.js 15, Tailwind CSS & Retool", icon: "Code2", desc: "Client & Operator Portal", tags: ["Next.js 15", "Tailwind CSS", "Retool", "Shadcn UI"] },
      server: { title: "Python 3.11, FastAPI & LangGraph", icon: "Terminal", desc: "Agent Orchestration", tags: ["LangGraph", "FastAPI", "Temporal.io", "Celery"] },
      database: { title: "Supabase (PostgreSQL) & Redis", icon: "Database", desc: "State & Message Queue", type: "Relational + Cache", platform: "Supabase / AWS" },
      devops: ["Docker", "Temporal.io", "Vercel", "GitHub Actions"]
    },
    projects: [
      { icon: "Briefcase", title: "Autonomous Legal Contract Review & Negotiation Agency Pipeline", tag: "AI AGENCY ENGINE", desc: "An AI-native workflow engine that ingests enterprise MSAs, flags non-standard liability clauses, and drafts redlines with automated human attorney review queues.", features: ["Redline Diff Generation", "Liability Clause Classification", "Sub-1-Hour Contract Turnaround"], borderColor: "border-indigo-500/30" },
      { icon: "Bot", title: "AI-Native Marketing Agency Multi-Channel Campaign Orchestrator", tag: "AUTONOMOUS DELIVERY", desc: "Automated creative production pipeline generating hyper-personalized ad copy, video variants, and landing pages with automated A/B test deployment and ROI tracking.", features: ["Multi-Agent Creative Swarm", "Automated A/B Variant Testing", "Live Performance Attribution"], borderColor: "border-purple-500/30" }
    ],
    careerOutcomes: "AI Agency Founder, Chief AI Transformation Officer, AI-Native Services Managing Director ($200k-$500k+)"
  }
};

// Aliases for short IDs and alternate title slugs
curriculumDataFrontier["spatial-computing-visionos-arvr"] = curriculumDataFrontier["spatial-computing-ar-vr-visionos"];
curriculumDataFrontier["proptech-ai-real-estate"] = curriculumDataFrontier["proptech-ai-valuation-real-estate-tokenization"];
curriculumDataFrontier["longevity-biotech-health"] = curriculumDataFrontier["longevity-biotech-computational-omics"];
curriculumDataFrontier["gpu-compute-infra-slurm"] = curriculumDataFrontier["gpu-cluster-architecture-compute-infra"];
curriculumDataFrontier["proprietary-data-flywheels"] = curriculumDataFrontier["proprietary-data-moats-synthetic-pipelines"];
curriculumDataFrontier["ai-native-service-firms"] = curriculumDataFrontier["ai-native-service-firms-agentic-agencies"];
