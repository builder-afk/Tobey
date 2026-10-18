export const curriculumDataSystems = {
  // ==========================================
  // 1. NEUROMORPHIC COMPUTING & SNNs
  // ==========================================
  "neuromorphic-computing-spiking-neural-networks": {
    title: "Neuromorphic Computing & Spiking Neural Networks",
    tagline: "Spiking Neural Networks, Event-Based Vision & Brain-Inspired Silicon",
    duration: "4 Months",
    overview: "Emulate the biological brain's asynchronous, sparse, event-driven computation on silicon. Master Spiking Neural Networks (SNNs) using snnTorch and Norse, event-based dynamic vision sensors (DVS), spike-timing-dependent plasticity (STDP), neuromorphic hardware architectures (Intel Loihi 2, SynSense DynapCNN), and designing sub-milliwatt edge AI sensory pipelines.",
    objectives: [
      { num: "01", color: "sky", icon: "Cpu", title: "Spiking Neuron Dynamics", desc: "Model Leaky Integrate-and-Fire (LIF), Izhikevich, and adaptive threshold spiking neuron equations in PyTorch." },
      { num: "02", color: "blue", icon: "Eye", title: "Event-Based Vision (DVS)", desc: "Process microsecond-resolution asynchronous event streams from Dynamic Vision Sensors without frame blur." },
      { num: "03", color: "indigo", icon: "Zap", title: "Surrogate Gradient & SNN Training", desc: "Train deep SNN architectures using surrogate gradient backpropagation through time (BPTT) and ANN-to-SNN conversion." },
      { num: "04", color: "emerald", icon: "Layers", title: "Neuromorphic Hardware Deployment", desc: "Compile and profile spiking neural models on Intel Loihi 2 Lava framework and ultra-low-power neuromorphic ASICs." }
    ],
    outcomes: [
      { label: "CLO 01", color: "sky", icon: "Award", title: "Neuromorphic Systems Architect", desc: "Engineer sub-milliwatt event-driven spiking AI pipelines and deploy brain-inspired computing algorithms." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Spiking Dynamics & Event-Based Processing", subtitle: "MONTHS 1-2", color: "sky",
        modules: [
          { code: "M1", title: "Biological Neuron Models & snnTorch", weeks: "Weeks 1-4", icon: "Cpu", color: "sky", tags: ["LIF Neurons", "snnTorch", "Spike Encodings", "Membrane Dynamics"], desc: "Modeling membrane potential decay, refractory periods, and temporal rate vs latency spike encodings." },
          { code: "M2", title: "Dynamic Vision Sensors & Event Streams", weeks: "Weeks 5-8", icon: "Eye", color: "blue", tags: ["DVS Cameras", "Tonic Library", "AER Protocol", "Microsecond Latency"], desc: "Ingesting asynchronous Address-Event Representation (AER) streams for high-speed robotic vision without motion blur." }
        ],
        milestoneTitle: "Microsecond Event-Based Object Tracker", milestoneDesc: "High-Speed Neuromorphic Vision Core", milestoneFeatures: ["Zero Motion Blur at 10,000 deg/s", "Sparse Event Representation", "Sub-1mW Energy Footprint"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Surrogate Gradients & Neuromorphic Silicon", subtitle: "MONTHS 3-4", color: "indigo",
        modules: [
          { code: "M3", title: "Deep SNN Backprop & STDP Plasticity", weeks: "Weeks 9-12", icon: "Zap", color: "indigo", tags: ["Surrogate Gradients", "BPTT", "STDP Learning", "Spike Loss Functions"], desc: "Overcoming non-differentiable threshold functions with smooth surrogate gradients and on-chip bio-inspired local learning." },
          { code: "M4", title: "Intel Loihi 2 & Edge Neuromorphic ASICs", weeks: "Weeks 13-16", icon: "Layers", color: "emerald", tags: ["Loihi 2 Lava", "SynSense Speck", "Energy Profiling", "Synaptic Cores"], desc: "Deploying SNN models onto neuromorphic hardware clusters and measuring energy-delay products against standard GPUs." }
        ],
        milestoneTitle: "Ultra-Low-Power Neuromorphic Keyword Spotter", milestoneDesc: "Always-On Edge Audio Classifier", milestoneFeatures: ["Sub-50uW Power Consumption", "Loihi 2 Lava Compilation", "96.4% Accuracy on Spiking Audio"]
      }
    ],
    techStack: {
      client: { title: "Python & snnTorch Visualizer", icon: "Code2", desc: "Scientific UI", tags: ["snnTorch", "Plotly", "Tonic"] },
      server: { title: "Python 3.11, PyTorch & Lava SDK", icon: "Terminal", desc: "Neuromorphic Core", tags: ["Intel Lava", "snnTorch", "Norse", "PyTorch"] },
      database: { title: "HDF5 & Event Array DB", icon: "Database", desc: "Spike Stream Storage", type: "Temporal Event Store", platform: "Local NVMe / DVS Raw" },
      devops: ["Docker", "Intel Lava Framework", "GitLab CI", "Weights & Biases"]
    },
    projects: [
      { icon: "Eye", title: "Event-Based High-Speed Autonomous Drone Avoidance System", tag: "NEUROMORPHIC ROBOTICS", desc: "A sub-millisecond obstacle avoidance system fusing a Dynamic Vision Sensor (DVS) with a spiking convolutional network that detects incoming projectiles at 200 Hz while consuming under 5 milliwatts.", features: ["Event-Based DVS Stream", "Spiking ConvNet", "Sub-2ms Actuation Latency"], borderColor: "border-sky-500/30" },
      { icon: "Cpu", title: "Sub-50-Microwatt Neuromorphic Biosignal Anomaly Detector", tag: "EDGE NEUROMORPHIC", desc: "An ultra-low-power spiking neural network deployed on neuromorphic silicon that continuously monitors intracranial EEG for pre-ictal seizure biomarkers with 97% sensitivity.", features: ["Loihi 2 Lava Architecture", "Sparse Spike Representations", "Continuous On-Chip Learning"], borderColor: "border-indigo-500/30" }
    ],
    careerOutcomes: "Neuromorphic Systems Architect, Spiking Neural Network Researcher, Edge Bio-AI Engineer ($180k-$400k)"
  },

  // ==========================================
  // 2. AGENTOPS: MULTI-AGENT OBSERVABILITY
  // ==========================================
  "agentops-multi-agent-observability-governance": {
    title: "AgentOps: Multi-Agent Observability & Governance",
    tagline: "Distributed Agent Tracing, Tool Call Auditing, Loop Prevention & Sandboxing",
    duration: "3 Months",
    overview: "Autonomous agents running wild in production create catastrophic financial and security risks. Master AgentOps: distributed tracing across multi-agent loops with OpenInference and OpenTelemetry, real-time tool call auditing, infinite loop circuit breakers, token budget controls, sandboxed bash execution environments, and deterministic agent execution replays.",
    objectives: [
      { num: "01", color: "purple", icon: "Activity", title: "Distributed Multi-Agent Tracing", desc: "Implement OpenInference and OpenTelemetry standards to trace nested spans, parent-child agent calls, and latency." },
      { num: "02", color: "indigo", icon: "ShieldAlert", title: "Tool Call Auditing & Sandboxes", desc: "Intercept, validate, and execute untrusted agent tool calls inside isolated gVisor/Docker micro-sandboxes." },
      { num: "03", color: "red", icon: "RefreshCw", title: "Loop Detection & Circuit Breakers", desc: "Detect hallucinated recursive agent loops, cyclic graph dependencies, and runaway token burn in real time." },
      { num: "04", color: "emerald", icon: "Sliders", title: "Token Quotas & Governance Dashboards", desc: "Enforce granular per-tenant token spending caps, automated cost anomaly kill switches, and compliance audit logs." }
    ],
    outcomes: [
      { label: "CLO 01", color: "purple", icon: "Award", title: "Lead AgentOps Engineer", desc: "Build enterprise observability, safety guardrails, and audit infrastructure for multi-agent autonomous production systems." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Distributed Spans, OpenInference & Tool Audits", subtitle: "MONTHS 1-2", color: "purple",
        modules: [
          { code: "M1", title: "OpenInference Tracing & Span Hierarchies", weeks: "Weeks 1-4", icon: "Activity", color: "purple", tags: ["OpenInference", "OpenTelemetry", "Trace Context", "Span Hierarchies"], desc: "Instrumenting LangGraph, CrewAI, and custom loops with standardized semantic conventions for LLM agent actions." },
          { code: "M2", title: "Tool Call Interceptors & Micro-Sandboxing", weeks: "Weeks 5-8", icon: "ShieldAlert", color: "indigo", tags: ["gVisor", "Docker Sandboxes", "Command Whitelisting", "Tool Auditing"], desc: "Enforcing strict policy validation, argument schema verification, and isolated execution for code-interpreting agents." }
        ],
        milestoneTitle: "Multi-Agent Distributed Tracing Gateway", milestoneDesc: "Production Observability Core", milestoneFeatures: ["Full Execution Graph Replay", "Sub-1ms Telemetry Overhead", "Tool Call Interception Gate"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Loop Circuit Breakers & Governance Control", subtitle: "MONTHS 2-3", color: "emerald",
        modules: [
          { code: "M3", title: "Infinite Loop Breakers & Convergence Monitors", weeks: "Weeks 9-10", icon: "RefreshCw", color: "red", tags: ["Loop Breakers", "Semantic Similarity", "Cycle Detection", "Max Hop Limits"], desc: "Identifying state stutters and repeated tool invocation loops using sliding-window semantic cosine checks." },
          { code: "M4", title: "Cost Guardrails, Replays & Compliance", weeks: "Weeks 11-12", icon: "Sliders", color: "emerald", tags: ["Token Burn Budgets", "Deterministic Replay", "SOC2 Compliance", "Anomaly Alerts"], desc: "Freezing rogue agent sessions, deterministic trajectory replaying from saved states, and SOC2 audit log generation." }
        ],
        milestoneTitle: "Enterprise AgentOps Control Plane", milestoneDesc: "Full Agent Governance System", milestoneFeatures: ["Dynamic Token Spend Circuit Breakers", "Deterministic Step-by-Step Replayer", "Automated Hallucination Triage"]
      }
    ],
    techStack: {
      client: { title: "Next.js 15 & Phoenix UI", icon: "Monitor", desc: "Observability UI", tags: ["Arize Phoenix", "LangSmith", "Next.js 15"] },
      server: { title: "Python 3.11, FastAPI & OpenTelemetry", icon: "Terminal", desc: "AgentOps Proxy", tags: ["OpenInference", "OTel Collector", "LangGraph", "FastAPI"] },
      database: { title: "ClickHouse & Redis", icon: "Database", desc: "Trace & State Store", type: "Columnar Tracing DB", platform: "ClickHouse Cloud / S3" },
      devops: ["Docker", "gVisor", "Prometheus", "GitHub Actions"]
    },
    projects: [
      { icon: "Activity", title: "Real-Time Multi-Agent Trace & Loop Interceptor Proxy", tag: "AGENT OBSERVABILITY", desc: "A zero-overhead reverse proxy that inspects streaming tool invocations across 500 concurrent autonomous agents, detects cyclic loops via semantic history hashing, and aborts runaway execution threads.", features: ["Semantic Loop Detection", "OpenInference Tracing", "Zero-Latency Event Streaming"], borderColor: "border-purple-500/30" },
      { icon: "ShieldAlert", title: "gVisor Isolated Micro-Sandbox for Autonomous Code Agents", tag: "AGENT SECURITY", desc: "High-density container sandboxing platform that provisions sub-50ms ephemeral Linux execution environments with strict network isolation and syscall filtering for untrusted agent-written Python scripts.", features: ["Sub-50ms Cold Starts", "Seccomp Syscall Filtering", "Full Execution Audit Recording"], borderColor: "border-indigo-500/30" }
    ],
    careerOutcomes: "Lead AgentOps Engineer, AI Platform Reliability Architect, Autonomous Systems Governance Lead ($185k-$390k)"
  },

  // ==========================================
  // 3. PRODUCTION MLOPS
  // ==========================================
  "production-mlops-feature-stores-model-registries": {
    title: "Production MLOps: Feature Stores & Model Registries",
    tagline: "Kubeflow Pipelines, Feast, MLflow, Continuous Training & Drift Detection",
    duration: "4 Months",
    overview: "Move beyond toy notebooks to industrial-grade Machine Learning Engineering. Master modern MLOps pipelines: building scalable low-latency feature stores with Feast, automated training pipelines with Kubeflow and Airflow, model lifecycle governance with MLflow, real-time data and concept drift detection with Evidently AI, and zero-downtime canary/shadow deployments on Triton Inference Server.",
    objectives: [
      { num: "01", color: "blue", icon: "Database", title: "Feature Store Engineering (Feast)", desc: "Build unified online (Redis) and offline (Snowflake/BigQuery) feature stores with point-in-time correctness." },
      { num: "02", color: "indigo", icon: "Workflow", title: "Continuous Training (CT) Pipelines", desc: "Automate model retraining pipelines triggered by data arrival and drift signals using Kubeflow Pipelines." },
      { num: "03", color: "emerald", icon: "CheckCircle", title: "Model Governance & Registry (MLflow)", desc: "Track model artifacts, hyperparameters, lineage, and approval stages from Staging to Production." },
      { num: "04", color: "amber", icon: "Server", title: "High-Throughput Inference & Drift", desc: "Serve models on NVIDIA Triton with dynamic batching, shadow deployments, and automated drift alerting." }
    ],
    outcomes: [
      { label: "CLO 01", color: "blue", icon: "Award", title: "Staff MLOps Engineer", desc: "Architect end-to-end continuous training, governance, and production serving infrastructure for enterprise ML models." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Feature Stores & Continuous Training (CT)", subtitle: "MONTHS 1-2", color: "blue",
        modules: [
          { code: "M1", title: "Feast Feature Store & Time-Travel Joins", weeks: "Weeks 1-4", icon: "Database", color: "blue", tags: ["Feast", "Redis Online Store", "Point-in-Time Joins", "Data Leakage Prevention"], desc: "Eliminating training-serving skew by serving sub-10ms online features and generating point-in-time accurate offline training sets." },
          { code: "M2", title: "Kubeflow Pipelines & Automated CI/CD/CT", weeks: "Weeks 5-8", icon: "Workflow", color: "indigo", tags: ["Kubeflow", "Argo Workflows", "Tekton", "Automated Retraining"], desc: "Creating declarative containerized DAGs that automate data validation, model training, evaluation, and artifact registration." }
        ],
        milestoneTitle: "Continuous Training Pipeline with Feature Store", milestoneDesc: "Production Feature & Training Pipeline", milestoneFeatures: ["Feast Online/Offline Parity", "Kubeflow Automated Triggering", "Zero-Leakage Point-in-Time Joins"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Model Registry, Canary Serving & Drift", subtitle: "MONTHS 3-4", color: "emerald",
        modules: [
          { code: "M3", title: "MLflow Model Registry & Lineage Governance", weeks: "Weeks 9-12", icon: "CheckCircle", color: "emerald", tags: ["MLflow", "Artifact Lineage", "Staging Gateways", "Model Signoff"], desc: "Governing model approval workflows, tracking full dataset-to-artifact lineage, and enforcing promotion criteria." },
          { code: "M4", title: "Triton Inference Server & Drift Monitoring", weeks: "Weeks 13-16", icon: "Server", color: "amber", tags: ["Triton Server", "Dynamic Batching", "Evidently AI", "Canary Deployments"], desc: "Deploying multi-model Triton endpoints, running shadow traffic comparisons, and alerting on statistical data drift." }
        ],
        milestoneTitle: "Zero-Downtime Production ML Serving Platform", milestoneDesc: "High-Availability Deployment Suite", milestoneFeatures: ["Triton Dynamic Batching", "Evidently AI Drift Alerts", "Automated Canary Traffic Shifting"]
      }
    ],
    techStack: {
      client: { title: "MLflow UI & Evidently Dashboard", icon: "Monitor", desc: "Governance UI", tags: ["MLflow", "Evidently AI", "Grafana"] },
      server: { title: "Python 3.11, Kubeflow & Triton", icon: "Terminal", desc: "ML Engine", tags: ["Kubeflow", "Triton Inference Server", "Feast", "Scikit-Learn"] },
      database: { title: "Redis & PostgreSQL + S3 Lakehouse", icon: "Database", desc: "Feature & Artifact Store", type: "Feature Store & Registry", platform: "Feast / S3" },
      devops: ["Kubernetes", "Docker", "Helm", "Argo Workflows"]
    },
    projects: [
      { icon: "Database", title: "Real-Time Fraud Detection Feature Store & Serving Engine", tag: "PRODUCTION MLOPS", desc: "A sub-15ms fraud detection pipeline integrating Feast on Redis, automated feature ingestion from Kafka, and real-time ensemble inference with Triton Inference Server.", features: ["Feast Online Feature Retrieval", "Sub-15ms Total Latency", "Automated Feature Freshness Checks"], borderColor: "border-blue-500/30" },
      { icon: "Workflow", title: "Autonomous Continuous Retraining Pipeline with Drift Guardrails", tag: "DRIFT & CT", desc: "An end-to-end Kubeflow pipeline that continuously monitors live prediction distributions using Evidently AI, triggers automated retraining upon concept drift, and executes canary rollout.", features: ["Evidently AI Statistical Tests", "Automated Retraining DAG", "Canary Rollback on Accuracy Dip"], borderColor: "border-indigo-500/30" }
    ],
    careerOutcomes: "Staff MLOps Engineer, Machine Learning Platform Architect, Production ML Lead ($190k-$410k)"
  },

  // ==========================================
  // 4. ENTERPRISE LLMOPS & FINE-TUNING
  // ==========================================
  "enterprise-llmops-continuous-fine-tuning": {
    title: "Enterprise LLMOps & Continuous Fine-Tuning",
    tagline: "LoRA/QLoRA Distributed Pipelines, vLLM Production Serving & Alignment Evals",
    duration: "4 Months",
    overview: "Scale customized enterprise language models from raw data to high-throughput production clusters. Master distributed parameter-efficient fine-tuning (LoRA, QLoRA, Axolotl, Unsloth), Direct Preference Optimization (DPO) and RLHF alignment lifecycles, vLLM and TensorRT-LLM production serving with continuous batching, prompt version control, and multi-tenant security gateways.",
    objectives: [
      { num: "01", color: "emerald", icon: "Cpu", title: "Distributed LoRA / QLoRA Tuning", desc: "Train 70B+ parameter models on multi-GPU nodes using 4-bit quantization, FlashAttention-2, and Axolotl." },
      { num: "02", color: "cyan", icon: "Sparkles", title: "DPO & Continuous Alignment", desc: "Align models to specialized domain behavior using Direct Preference Optimization and rejection sampling." },
      { num: "03", color: "blue", icon: "Zap", title: "vLLM Production Serving Architecture", desc: "Deploy high-throughput inference endpoints with PagedAttention, speculative decoding, and tensor parallelism." },
      { num: "04", color: "purple", icon: "ShieldCheck", title: "LLM Gateways & Enterprise Security", desc: "Implement token budget limits, semantic prompt caching, PII redaction, and automated benchmark regression evals." }
    ],
    outcomes: [
      { label: "CLO 01", color: "emerald", icon: "Award", title: "Principal LLMOps Architect", desc: "Architect full-lifecycle fine-tuning, continuous alignment, and low-latency production inference platforms for enterprise foundation models." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Parameter-Efficient Tuning & Alignment", subtitle: "MONTHS 1-2", color: "emerald",
        modules: [
          { code: "M1", title: "Distributed QLoRA & Axolotl Pipelines", weeks: "Weeks 1-4", icon: "Cpu", color: "emerald", tags: ["QLoRA", "Axolotl", "DeepSpeed ZeRO-3", "Unsloth"], desc: "Fine-tuning enterprise Llama and Mistral models on proprietary corpora with minimal GPU memory overhead." },
          { code: "M2", title: "Direct Preference Optimization (DPO) & RLHF", weeks: "Weeks 5-8", icon: "Sparkles", color: "cyan", tags: ["DPO", "ORPO", "Preference Pairs", "Reward Modeling"], desc: "Aligning fine-tuned models to corporate style guides, concise outputs, and safety guidelines without RL instability." }
        ],
        milestoneTitle: "Automated Enterprise Fine-Tuning Pipeline", milestoneDesc: "Reproducible Alignment Core", milestoneFeatures: ["Multi-GPU QLoRA Automation", "Curated Domain Preference DPO", "Automated Loss & Perplexity Tracking"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Production Serving Clusters & Gateway Infra", subtitle: "MONTHS 3-4", color: "blue",
        modules: [
          { code: "M3", title: "vLLM, TensorRT-LLM & Speculative Decoding", weeks: "Weeks 9-12", icon: "Zap", color: "blue", tags: ["vLLM", "TensorRT-LLM", "PagedAttention", "Speculative Decoding"], desc: "Serving fine-tuned weights with continuous batching, FP8 quantization, and draft model speculative acceleration." },
          { code: "M4", title: "AI Gateway, Semantic Cache & Evals CI", weeks: "Weeks 13-16", icon: "ShieldCheck", color: "purple", tags: ["LiteLLM Gateway", "Redis Semantic Cache", "DeepEval CI", "PII Masking"], desc: "Setting up reverse proxies with token quotas, streaming PII masking, and automated benchmark regression gates on PRs." }
        ],
        milestoneTitle: "High-Throughput Enterprise LLM Serving Gateway", milestoneDesc: "Production-Grade Inference Stack", milestoneFeatures: ["vLLM Multi-GPU Cluster Serving", "Sub-15ms Semantic Cache Hits", "Continuous Regression Benchmark Gate"]
      }
    ],
    techStack: {
      client: { title: "OpenWebUI & LiteLLM Admin", icon: "Monitor", desc: "Admin Dashboard", tags: ["LiteLLM UI", "OpenWebUI", "Grafana"] },
      server: { title: "Python 3.11, vLLM & Axolotl", icon: "Terminal", desc: "Serving & Tuning Engine", tags: ["vLLM", "TensorRT-LLM", "Axolotl", "PyTorch"] },
      database: { title: "Redis & Hugging Face Hub / MinIO", icon: "Database", desc: "Weights & Cache Store", type: "Model Artifact Lake", platform: "MinIO / S3" },
      devops: ["Kubernetes", "Ray Serve", "Docker", "DeepEval"]
    },
    projects: [
      { icon: "Cpu", title: "Automated Domain QLoRA & DPO Alignment Pipeline", tag: "FINE-TUNING OPS", desc: "A GitOps-driven pipeline that ingests new domain documents, generates DPO synthetic preference pairs, trains a 70B parameter QLoRA adapter on a 4x A100 node, and evaluates against MMLU benchmarks.", features: ["Axolotl Multi-GPU Tuning", "DPO Alignment Stage", "Automated Benchmark Regression Check"], borderColor: "border-emerald-500/30" },
      { icon: "Zap", title: "Multi-Region vLLM Production Inference Cluster", tag: "LLM SERVING", desc: "High-availability language model inference cluster serving 2,500 requests per second with continuous batching, speculative decoding draft models, and intelligent semantic caching cutting cloud inference costs by 45%.", features: ["vLLM PagedAttention", "Speculative Decoding", "Semantic Query Deduplication"], borderColor: "border-cyan-500/30" }
    ],
    careerOutcomes: "Principal LLMOps Architect, Foundation Model Infrastructure Lead, Generative AI Platform Engineer ($200k-$420k)"
  },

  // ==========================================
  // 5. EMBEDDED SYSTEMS & PCB ARCHITECTURE
  // ==========================================
  "embedded-systems-pcb-design-hardware-architecture": {
    title: "Embedded Systems: PCB Design & Hardware Architecture",
    tagline: "KiCad / Altium, High-Speed Differential Routing, STM32 & RTOS Architecture",
    duration: "4 Months",
    overview: "Bridge bare-metal software with physical silicon and circuit board manufacturing. Master multilayer schematic capture and PCB layout in KiCad and Altium Designer, high-speed differential signal routing, power delivery network (PDN) impedance tuning, embedded C/C++ firmware on ARM Cortex-M microcontrollers (STM32/ESP32), FreeRTOS real-time multitasking, and designing for EMC/EMI compliance.",
    objectives: [
      { num: "01", color: "emerald", icon: "Cpu", title: "Multilayer PCB Schematic & Layout", desc: "Design 4-layer and 6-layer high-density interconnect (HDI) PCBs in KiCad 8 and Altium Designer with thermal vias." },
      { num: "02", color: "teal", icon: "Zap", title: "High-Speed Signal Integrity & PDN", desc: "Calculate controlled impedance, length-match differential pairs (USB/Ethernet), and decouple power delivery networks." },
      { num: "03", color: "blue", icon: "Terminal", title: "ARM Cortex-M Firmware (STM32)", desc: "Write register-level and HAL embedded C/C++ firmware for DMA, SPI, I2C, and CAN-FD peripheral buses." },
      { num: "04", color: "purple", icon: "Clock", title: "FreeRTOS & Real-Time Concurrency", desc: "Architect deterministic real-time multitasking applications with priority inversion avoidance, queues, and semaphores." }
    ],
    outcomes: [
      { label: "CLO 01", color: "emerald", icon: "Award", title: "Senior Embedded Hardware Architect", desc: "Design, route, manufacture, and write deterministic RTOS firmware for commercial electronics products." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Schematic Capture, Multilayer Routing & SI", subtitle: "MONTHS 1-2", color: "emerald",
        modules: [
          { code: "M1", title: "Component Selection & Schematic Capture", weeks: "Weeks 1-4", icon: "Cpu", color: "emerald", tags: ["KiCad 8", "Altium Designer", "BOM Optimization", "Switching Regulators"], desc: "Designing buck/boost converter power stages, microcontroller pinouts, ESD protection, and BOM component sourcing." },
          { code: "M2", title: "High-Speed Multilayer PCB Layout & SI", weeks: "Weeks 5-8", icon: "Zap", color: "teal", tags: ["Controlled Impedance", "Differential Pairs", "Ground Planes", "Thermal Relief"], desc: "Routing 90-ohm differential USB pairs, calculating microstrip impedance, and minimizing ground bounce and crosstalk." }
        ],
        milestoneTitle: "Manufacture-Ready 4-Layer Controller PCB", milestoneDesc: "Fabrication Package & Design", milestoneFeatures: ["Gerber & ODB++ Export", "Controlled 50-Ohm & 90-Ohm Traces", "Design for Assembly (DFA) Validated"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Embedded Firmware, FreeRTOS & Protocols", subtitle: "MONTHS 3-4", color: "blue",
        modules: [
          { code: "M3", title: "STM32 Bare-Metal & HAL Firmware", weeks: "Weeks 9-12", icon: "Terminal", color: "blue", tags: ["STM32CubeIDE", "ARM Cortex-M4", "DMA Transfers", "CAN-FD Bus"], desc: "Writing non-blocking ring buffers, zero-copy DMA peripheral communications, and low-power sleep state transitions." },
          { code: "M4", title: "FreeRTOS Scheduling & Fieldbus Protocols", weeks: "Weeks 13-16", icon: "Clock", color: "purple", tags: ["FreeRTOS", "Mutexes & Semaphores", "Modbus / CANopen", "OTA Bootloaders"], desc: "Implementing deterministic task schedulers, inter-task message queues, and dual-bank failsafe OTA bootloaders." }
        ],
        milestoneTitle: "Production IoT Industrial Gateway Controller", milestoneDesc: "Full Hardware + Firmware System", milestoneFeatures: ["FreeRTOS Multi-Tasking Loop", "CAN-FD & Ethernet Industrial Bus", "Secure Dual-Bank Bootloader"]
      }
    ],
    techStack: {
      client: { title: "KiCad 8 & Altium Designer", icon: "Layers", desc: "EDA & CAD Suite", tags: ["KiCad 8", "Altium Designer", "Saleae Logic"] },
      server: { title: "Embedded C/C++ & FreeRTOS", icon: "Terminal", desc: "Firmware Toolchain", tags: ["ARM GCC", "STM32CubeIDE", "FreeRTOS", "CMake"] },
      database: { title: "EEPROM & SPI Flash NVRAM DB", icon: "Database", desc: "Non-Volatile Storage", type: "Embedded Flash", platform: "W25Qxx SPI Flash" },
      devops: ["GitLab CI for Firmware", "J-Link Debugger", "OpenOCD", "Unity Test Framework"]
    },
    projects: [
      { icon: "Cpu", title: "Industrial Smart Edge Sensor Gateway PCB & Firmware", tag: "HARDWARE DESIGN", desc: "A custom 4-layer PCB featuring an STM32H7 microcontroller, dual isolated CAN-FD transceivers, and buck-boost power supply with FreeRTOS sensor sampling firmware.", features: ["4-Layer Impedance Matched Layout", "Isolated Industrial Fieldbuses", "FreeRTOS Deterministic Scheduler"], borderColor: "border-emerald-500/30" },
      { icon: "Zap", title: "Dual-Bank Failsafe OTA Bootloader with Hardware Cryptography", tag: "EMBEDDED FIRMWARE", desc: "Production-grade ARM Cortex-M secure bootloader that validates cryptographically signed firmware images over Wi-Fi/Ethernet with instant rollback on validation failure.", features: ["ECDSA Hardware Signature Check", "Zero-Bricking Dual-Bank Flash", "Sub-2-Second Boot Time"], borderColor: "border-teal-500/30" }
    ],
    careerOutcomes: "Senior Embedded Hardware Architect, Principal PCB Design Engineer, Embedded Firmware Lead ($170k-$380k)"
  }
};

// Aliases for short IDs and alternate title slugs
curriculumDataSystems["neuromorphic-computing-snn"] = curriculumDataSystems["neuromorphic-computing-spiking-neural-networks"];
curriculumDataSystems["agentops-observability"] = curriculumDataSystems["agentops-multi-agent-observability-governance"];
curriculumDataSystems["production-mlops-pipelines"] = curriculumDataSystems["production-mlops-feature-stores-model-registries"];
curriculumDataSystems["enterprise-llmops-finetuning"] = curriculumDataSystems["enterprise-llmops-continuous-fine-tuning"];
curriculumDataSystems["embedded-systems-pcb-architecture"] = curriculumDataSystems["embedded-systems-pcb-design-hardware-architecture"];
