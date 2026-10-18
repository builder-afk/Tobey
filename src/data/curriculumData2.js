export const curriculumData2 = {
  "generative-ai": {
    title: "Generative AI",
    tagline: "LLMs & Applied AI",
    duration: "4 Months",
    overview: "Become an expert in the Generative AI revolution. Build applications that understand text, generate images, and interact naturally using OpenAI, LangChain, and fine-tuned models.",
    objectives: [
      { num: "01", color: "fuchsia", icon: "Atom", title: "Prompt Engineering", desc: "Master interactions with large language models." },
      { num: "02", color: "purple", icon: "Boxes", title: "Langchain Arch", desc: "Build agentic workflows and text chains." },
      { num: "03", color: "pink", icon: "Search", title: "RAG Systems", desc: "Retrieval-Augmented Generation for proprietary data." },
      { num: "04", color: "violet", icon: "Settings", title: "Fine-Tuning", desc: "Adapt open-source models (Llama, Mistral) to your needs." }
    ],
    outcomes: [
      { label: "CLO 01", color: "fuchsia", icon: "Award", title: "Gen AI Specialist", desc: "Build next-gen AI applications." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "APIs & Workflows", subtitle: "MONTHS 1-2", color: "fuchsia",
        modules: [
          { code: "M1", title: "LLM APIs", weeks: "Weeks 1-4", icon: "Network", color: "fuchsia", tags: ["OpenAI", "Anthropic", "Tokens"], desc: "Calling commercial models and setting params." },
          { code: "M2", title: "LangChain", weeks: "Weeks 5-8", icon: "Layers", color: "purple", tags: ["Chains", "Agents", "Memory"], desc: "Orchestrating complex AI workflows." }
        ],
        milestoneTitle: "Agentic App", milestoneDesc: "ReAct Agent", milestoneFeatures: ["Tool Usage", "Conversation Memory"]
      },
      {
        id: "phase2", name: "PHASE II", title: "RAG & Custom Models", subtitle: "MONTHS 3-4", color: "pink",
        modules: [
          { code: "M3", title: "Vector DBs & RAG", weeks: "Weeks 9-12", icon: "Database", color: "pink", tags: ["Pinecone", "Chroma", "Embeddings"], desc: "Giving LLMs access to specific documents." },
          { code: "M4", title: "Fine Tuning", weeks: "Weeks 13-16", icon: "Terminal", color: "violet", tags: ["LoRA", "HuggingFace", "PyTorch"], desc: "Customizing open source models." }
        ],
        milestoneTitle: "Custom Enterprise AI", milestoneDesc: "Private RAG Stack", milestoneFeatures: ["Data Safe", "High Quality"]
      }
    ],
    techStack: {
      client: { title: "Python/TS", icon: "Code2", desc: "Language", tags: ["FastAPI", "Next.js"] },
      server: { title: "LangChain", icon: "Boxes", desc: "Framework", tags: ["LlamaIndex", "Agents"] },
      database: { title: "Pinecone", icon: "Database", desc: "Vector DB", type: "Graphs", platform: "Managed" },
      devops: ["HuggingFace", "Replicate", "Vercel AI"]
    },
    projects: [
      { icon: "Search", title: "Financial Document Chatbot", tag: "RAG System", desc: "Chat with 10k pages of SEC filings.", features: ["Semantic Search", "Hallucination Control", "Streaming"], borderColor: "border-fuchsia-500/30" }
    ],
    careerOutcomes: "AI Engineer, Prompt Engineer, Machine Learning Developer"
  },

  "devops-with-aws": {
    title: "DevOps with AWS",
    tagline: "Cloud Infrastructure Engineering",
    duration: "5 Months",
    overview: "Master the cloud. Learn to automate infrastructure, manage scalable deployments, and engineer robust CI/CD pipelines natively on Amazon Web Services.",
    objectives: [
      { num: "01", color: "orange", icon: "Cloud", title: "Linux & Scripting", desc: "Unmatched proficiency in Bash and Linux internals." },
      { num: "02", color: "amber", icon: "ShieldCheck", title: "AWS Core", desc: "EC2, S3, VPCs, IAM, and Serverless architectures." },
      { num: "03", color: "red", icon: "Boxes", title: "Containerization", desc: "Docker, Docker Compose, and AWS ECS/EKS." },
      { num: "04", color: "yellow", icon: "Settings", title: "Infrastructure as Code", desc: "Terraform and AWS CloudFormation." }
    ],
    outcomes: [
      { label: "CLO 01", color: "orange", icon: "Award", title: "Cloud Engineer", desc: "Architect high-availability AWS systems." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Linux & AWS Core", subtitle: "MONTHS 1-2", color: "orange",
        modules: [
          { code: "M1", title: "Linux Internals", weeks: "Weeks 1-4", icon: "Terminal", color: "orange", tags: ["Bash", "Kernel", "Networking"], desc: "The operating system fueling the cloud." },
          { code: "M2", title: "AWS Architecture", weeks: "Weeks 5-8", icon: "Cloud", color: "amber", tags: ["VPC", "EC2", "RDS"], desc: "Designing scalable cloud foundations." }
        ],
        milestoneTitle: "VPC Deployment", milestoneDesc: "Secure Subnets", milestoneFeatures: ["Public/Private", "NAT Gateway"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Automation & CI/CD", subtitle: "MONTHS 3-5", color: "red",
        modules: [
          { code: "M3", title: "Docker & K8s", weeks: "Weeks 9-14", icon: "Boxes", color: "red", tags: ["Cluster", "Pods", "Services"], desc: "Container orchestration at scale." },
          { code: "M4", title: "IaC & CI/CD", weeks: "Weeks 15-20", icon: "GitMerge", color: "yellow", tags: ["Terraform", "Jenkins", "GitLab"], desc: "Automating all infrastructure workflows." }
        ],
        milestoneTitle: "Automated K8s Pipeline", milestoneDesc: "EKS Deployment", milestoneFeatures: ["Zero Downtime", "GitOps"]
      }
    ],
    techStack: {
      client: { title: "Terraform", icon: "Code2", desc: "IaC tool", tags: ["HCL", "Modules"] },
      server: { title: "Kubernetes", icon: "Network", desc: "Orchestration", tags: ["Helm", "AWS EKS"] },
      database: { title: "AWS Cloud", icon: "Cloud", desc: "Platform", type: "IaaS", platform: "Global" },
      devops: ["Docker", "Jenkins", "Ansible"]
    },
    projects: [
      { icon: "GitMerge", title: "Global CI/CD Pipeline", tag: "AUTO DEPLOY", desc: "Automated test and deploy for microservices.", features: ["Automated Rollbacks", "Terraform Config", "Jenkins Mastery"], borderColor: "border-orange-500/30" }
    ],
    careerOutcomes: "DevOps Engineer, SRE, Cloud Architect"
  },

  "high-level-design": {
    title: "High-Level Design",
    tagline: "Architecting Distributed Systems",
    duration: "3 Months",
    overview: "Crack the System Design Interview and learn how to architect massive scale applications like Netflix, Uber, or Twitter. Essential for Senior engineering roles.",
    objectives: [
      { num: "01", color: "blue", icon: "LayoutTemplate", title: "System Basics", desc: "CAP Theorem, Consistency, Scalability factors." },
      { num: "02", color: "cyan", icon: "Server", title: "Architecture Patterns", desc: "Microservices vs Monolith, Event-Driven designs." },
      { num: "03", color: "indigo", icon: "Database", title: "Data Storage", desc: "Sharding, Replication, and choosing the right DB." },
      { num: "04", color: "purple", icon: "Network", title: "Case Studies", desc: "Deconstructing massive tech systems." }
    ],
    outcomes: [
      { label: "CLO 01", color: "blue", icon: "Award", title: "Software Architect", desc: "Design systems for millions of users." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Distributed Concepts", subtitle: "MONTH 1", color: "blue",
        modules: [
          { code: "M1", title: "Scalability Core", weeks: "Weeks 1-2", icon: "Network", color: "blue", tags: ["Load Balancing", "Caching"], desc: "Moving from 1 to 10M users." },
          { code: "M2", title: "Data Partitioning", weeks: "Weeks 3-4", icon: "Database", color: "cyan", tags: ["Sharding", "NoSQL vs SQL"], desc: "How to store petabytes of data reliably." }
        ],
        milestoneTitle: "Database Design", milestoneDesc: "Scalable Schema", milestoneFeatures: ["Consistent Hashing", "Replication"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Real World Systems", subtitle: "MONTHS 2-3", color: "indigo",
        modules: [
          { code: "M3", title: "Streaming & Messaging", weeks: "Weeks 5-8", icon: "Boxes", color: "indigo", tags: ["Kafka", "RabbitMQ", "PubSub"], desc: "Handling extremely high throughput." },
          { code: "M4", title: "Design Interviews", weeks: "Weeks 9-12", icon: "FileText", color: "purple", tags: ["Uber", "Netflix", "WhatsApp"], desc: "Whiteboarding complete system designs." }
        ],
        milestoneTitle: "Mock Interview", milestoneDesc: "FAANG Design", milestoneFeatures: ["Capacity Estimate", "Trade-offs"]
      }
    ],
    techStack: {
      client: { title: "Whiteboarding", icon: "Code2", desc: "Tools", tags: ["Excalidraw", "Miro"] },
      server: { title: "Technologies", icon: "Server", desc: "Evaluated", tags: ["Redis", "Kafka"] },
      database: { title: "Databases", icon: "Database", desc: "Scale", type: "Variety", platform: "Cassandra" },
      devops: ["Load Balancers", "CDNs", "Gossip Protocols"]
    },
    projects: [
      { icon: "Network", title: "Design WhatsApp System", tag: "ARCHITECTURE", desc: "Complete architectural document.", features: ["Real-time Sockets", "Offline Queues", "Media Storage"], borderColor: "border-blue-500/30" }
    ],
    careerOutcomes: "Senior Software Engineer, Tech Lead, Solutions Architect"
  },

  "low-level-design": {
    title: "Low-Level Design",
    tagline: "Object-Oriented Architecture",
    duration: "3 Months",
    overview: "Master object-oriented programming, design patterns, and solid principles. Essential for writing maintainable, extensible enterprise code.",
    objectives: [
      { num: "01", color: "emerald", icon: "Terminal", title: "SOLID Principles", desc: "Writing clean, decoupled object-oriented code." },
      { num: "02", color: "teal", icon: "Layers", title: "Design Patterns", desc: "Mastering the Gang of Four (GoF) patterns." },
      { num: "03", color: "green", icon: "Code2", title: "UML Design", desc: "Class diagrams, sequence diagrams, and flow." },
      { num: "04", color: "cyan", icon: "Boxes", title: "Machine Coding", desc: "Converting problem statements into structural code." }
    ],
    outcomes: [
      { label: "CLO 01", color: "emerald", icon: "Award", title: "SDE II / Senior", desc: "Pass rigorous machine coding rounds." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "SOLID & Patterns", subtitle: "MONTH 1", color: "emerald",
        modules: [
          { code: "M1", title: "SOLID & OOP", weeks: "Weeks 1-2", icon: "Terminal", color: "emerald", tags: ["Inheritance", "Polymorphism"], desc: "Building the foundation of object models." },
          { code: "M2", title: "Design Patterns I", weeks: "Weeks 3-4", icon: "Layers", color: "teal", tags: ["Creational", "Structural"], desc: "Factories, Builders, Adapters, and Bridges." }
        ],
        milestoneTitle: "Pattern Mastery", milestoneDesc: "Refactoring Code", milestoneFeatures: ["Clean Code", "No Code Smells"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Machine Coding", subtitle: "MONTHS 2-3", color: "green",
        modules: [
          { code: "M3", title: "Design Patterns II", weeks: "Weeks 5-8", icon: "Boxes", color: "green", tags: ["Behavioral", "Strategy", "Observer"], desc: "Managing state and dependencies." },
          { code: "M4", title: "Machine Rounds", weeks: "Weeks 9-12", icon: "Code2", color: "cyan", tags: ["Parking Lot", "Elevator", "TicTacToe"], desc: "Solving classic LLD interview questions." }
        ],
        milestoneTitle: "Machine Round Pass", milestoneDesc: "Working System", milestoneFeatures: ["Extensible", "Loosely Coupled"]
      }
    ],
    techStack: {
      client: { title: "Java / C++", icon: "Code2", desc: "Language", tags: ["OOP Heavy"] },
      server: { title: "Testing", icon: "ShieldCheck", desc: "TDD", tags: ["JUnit", "Mockito"] },
      database: { title: "UML Tools", icon: "LayoutTemplate", desc: "Diagrams", type: "Visual", platform: "LucidChart" },
      devops: ["Clean Code", "Refactoring", "Code Reviews"]
    },
    projects: [
      { icon: "Terminal", title: "Design a Parking Lot", tag: "MACHINE CODING", desc: "Working, extensible code for a multi-level parking lot.", features: ["Strategy Pattern for Pricing", "Ticket Generation", "Thread Safety"], borderColor: "border-emerald-500/30" }
    ],
    careerOutcomes: "SDE II, Senior Software Engineer, Lead Developer"
  },

  "android-with-kotlin": {
    title: "Android with Kotlin",
    tagline: "Modern Mobile App Dev",
    duration: "5 Months",
    overview: "Build modern, highly performant Android applications. Master Kotlin, Jetpack Compose, MVVM architecture, and backend integration.",
    objectives: [
      { num: "01", color: "emerald", icon: "Code2", title: "Kotlin Mastery", desc: "Coroutines, flows, and functional programming in Kotlin." },
      { num: "02", color: "teal", icon: "LayoutTemplate", title: "Jetpack Compose", desc: "Declarative UI design for modern Android." },
      { num: "03", color: "green", icon: "Layers", title: "Architecture", desc: "MVVM, Clean Architecture, and Room Database." },
      { num: "04", color: "blue", icon: "Network", title: "Network & APIs", desc: "Retrofit connection to REST/GraphQL APIs." }
    ],
    outcomes: [
      { label: "CLO 01", color: "emerald", icon: "Award", title: "Android Engineer", desc: "Publish to the Google Play Store." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Kotlin & UI", subtitle: "MONTHS 1-2", color: "emerald",
        modules: [
          { code: "M1", title: "Kotlin Fundamentals", weeks: "Weeks 1-4", icon: "Terminal", color: "emerald", tags: ["Null Safety", "Lambdas", "Ext Functions"], desc: "Learning Google's preferred Android language." },
          { code: "M2", title: "Compose UI", weeks: "Weeks 5-8", icon: "LayoutTemplate", color: "teal", tags: ["State", "Modifiers", "Animation"], desc: "Building beautiful declarative layouts." }
        ],
        milestoneTitle: "Interactive Compose UI", milestoneDesc: "UI Clone", milestoneFeatures: ["Material 3", "Responsive"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Architecture & Data", subtitle: "MONTHS 3-5", color: "green",
        modules: [
          { code: "M3", title: "MVVM & Room", weeks: "Weeks 9-14", icon: "Database", color: "green", tags: ["ViewModel", "SQLite", "Hilt"], desc: "Local data persistence and lifecycle management." },
          { code: "M4", title: "Networking & Publish", weeks: "Weeks 15-20", icon: "Cloud", color: "blue", tags: ["Retrofit", "Coroutines", "Play Console"], desc: "Live APIs and pushing to production." }
        ],
        milestoneTitle: "Full App Release", milestoneDesc: "Play Store", milestoneFeatures: ["Offline Cache", "Crashlytics"]
      }
    ],
    techStack: {
      client: { title: "Kotlin", icon: "Code2", desc: "Language", tags: ["Coroutines", "Flows"] },
      server: { title: "Android Studio", icon: "Monitor", desc: "IDE", tags: ["Logcat", "Profiler"] },
      database: { title: "Room", icon: "Database", desc: "Local DB", type: "SQLite", platform: "Device" },
      devops: ["Firebase", "Google Play Console", "CI/CD Gitlab"]
    },
    projects: [
      { icon: "Monitor", title: "Finance Tracking App", tag: "PRODUCTION APP", desc: "A full-fledged financial app with charts and offline mode.", features: ["Room DB Cache", "Jetpack Compose", "Retrofit Sync"], borderColor: "border-teal-500/30" }
    ],
    careerOutcomes: "Android Developer, Mobile Engineer, Kotlin Engineer"
  },

  "advanced-spring-boot": {
    title: "Advanced Spring Boot",
    tagline: "Microservices & Performance",
    duration: "4 Months",
    overview: "Take your Spring Boot skills to an elite level. Master Reactive programming with WebFlux, event-driven architectures, performance tuning, and advanced security.",
    objectives: [
      { num: "01", color: "green", icon: "Boxes", title: "Spring WebFlux", desc: "Build non-blocking, reactive applications." },
      { num: "02", color: "emerald", icon: "Network", title: "Event Driven", desc: "Master Apache Kafka and RabbitMQ integration." },
      { num: "03", color: "cyan", icon: "ShieldCheck", title: "Advanced Auth", desc: "OAuth 2.1, OIDC, and Spring Authorization Server." },
      { num: "04", color: "teal", icon: "Server", title: "Performance Tuning", desc: "JVM profiling, GraalVM native images, and caching." }
    ],
    outcomes: [
      { label: "CLO 01", color: "green", icon: "Award", title: "Staff Backend Engineer", desc: "Solve performance bottlenecks in complex Spring systems." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Reactive & Events", subtitle: "MONTHS 1-2", color: "green",
        modules: [
          { code: "M1", title: "Reactive Spring", weeks: "Weeks 1-4", icon: "Terminal", color: "green", tags: ["Mono", "Flux", "WebFlux"], desc: "High concurrency without threads." },
          { code: "M2", title: "Kafka Integration", weeks: "Weeks 5-8", icon: "Network", color: "emerald", tags: ["Producers", "Consumers", "Streams"], desc: "Asynchronous messaging at scale." }
        ],
        milestoneTitle: "Reactive Pipeline", milestoneDesc: "WebFlux API", milestoneFeatures: ["Non-blocking", "High TPS"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Security & Optimization", subtitle: "MONTHS 3-4", color: "cyan",
        modules: [
          { code: "M3", title: "OAuth & OIDC", weeks: "Weeks 9-12", icon: "ShieldCheck", color: "cyan", tags: ["SSO", "Keycloak", "Auth Server"], desc: "Enterprise grade security patterns." },
          { code: "M4", title: "GraalVM & Tuning", weeks: "Weeks 13-16", icon: "Settings", color: "teal", tags: ["Native Image", "JFR", "Redis"], desc: "Sub-millisecond startups and JVM profiling." }
        ],
        milestoneTitle: "Optimized Auth Server", milestoneDesc: "Native Spring", milestoneFeatures: ["Fast Boot", "OAuth 2.1"]
      }
    ],
    techStack: {
      client: { title: "Spring Boot 3", icon: "Server", desc: "Framework", tags: ["WebFlux", "Security"] },
      server: { title: "GraalVM", icon: "Terminal", desc: "Runtime", tags: ["AOT", "Native Code"] },
      database: { title: "Kafka/Redis", icon: "Database", desc: "Brokers", type: "Events", platform: "Cluster" },
      devops: ["Docker", "Prometheus", "Grafana"]
    },
    projects: [
      { icon: "Network", title: "Real-time Order Processing", tag: "EVENT DRIVEN", desc: "A reactive, non-blocking pipeline handling 10k orders/sec.", features: ["Spring WebFlux", "Apache Kafka", "Redis Caching"], borderColor: "border-green-500/30" }
    ],
    careerOutcomes: "Principal Engineer, Java Architect, Staff Software Engineer"
  }
};
