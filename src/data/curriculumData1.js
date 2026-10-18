export const curriculumData = {
  "c-programming-mastery": {
    title: "C++ Programming Mastery",
    tagline: "From Syntax to Systems",
    duration: "4 Months",
    overview: "Master C++ from the ground up to advanced memory management, STL, and performance optimization. Designed to prepare you for high-performance computing and game dev roles.",
    objectives: [
      { num: "01", color: "blue", icon: "Code2", title: "Syntax & STL", desc: "Gain unparalleled command over C++ syntax and the Standard Template Library." },
      { num: "02", color: "cyan", icon: "Database", title: "Memory Management", desc: "Understand pointers, references, and manual memory allocation." },
      { num: "03", color: "purple", icon: "Terminal", title: "OOP & Design", desc: "Implement robust Object-Oriented patterns in C++." },
      { num: "04", color: "emerald", icon: "Server", title: "Performance", desc: "Write low-latency, highly optimized systems-level code." }
    ],
    outcomes: [
      { label: "CLO 01", color: "blue", icon: "Award", title: "Systems Engineering", desc: "Build scalable backends and engines." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Fundamentals", subtitle: "MONTHS 1-2", color: "blue",
        modules: [
          { code: "M1", title: "C++ Basics", weeks: "Weeks 1-3", icon: "Code2", color: "blue", tags: ["Variables", "Loops", "Functions"], desc: "Master the foundational elements of C++." },
          { code: "M2", title: "OOP & Pointers", weeks: "Weeks 4-8", icon: "Terminal", color: "cyan", tags: ["Classes", "Memory", "Pointers"], desc: "Deep dive into OOP principles and memory management." }
        ],
        milestoneTitle: "Console Systems", milestoneDesc: "Command Line Applications", milestoneFeatures: ["Memory Safe", "OOP Based"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Advanced C++ & STL", subtitle: "MONTHS 3-4", color: "teal",
        modules: [
           { code: "M3", title: "STL Mastery", weeks: "Weeks 9-12", icon: "Layers", color: "teal", tags: ["Vectors", "Maps", "Algorithms"], desc: "Utilize the STL for rapid development." },
           { code: "M4", title: "Modern C++ (C++11/14/17)", weeks: "Weeks 13-16", icon: "Rocket", color: "purple", tags: ["Smart Pointers", "Lambda", "Move Semantics"], desc: "Learn modern standard features." }
        ],
        milestoneTitle: "High-Performance System", milestoneDesc: "Engine Simulator", milestoneFeatures: ["Zero-cost Abstractions", "STL Heavy"]
      }
    ],
    techStack: {
      client: { title: "C++ Compiler", icon: "Terminal", desc: "GCC / Clang", tags: ["C++17", "C++20"] },
      server: { title: "Build Systems", icon: "Settings", desc: "Make & CMake", tags: ["CMake", "Ninja"] },
      database: { title: "Debugging", icon: "ShieldCheck", desc: "GDB & Valgrind", type: "Tools", platform: "Unix/Linux" },
      devops: ["Git", "GitHub", "Actions", "Linux"]
    },
    projects: [
      { icon: "Monitor", title: "In-Memory Key-Value Store", tag: "SYSTEMS", desc: "A Redis-like fast data store.", features: ["Custom Allocators", "STL Containers", "Thread Safety"], borderColor: "border-blue-500/30" },
      { icon: "Terminal", title: "Custom Web Server", tag: "NETWORKING", desc: "Multi-threaded HTTP server from scratch.", features: ["Socket Programming", "Concurrency", "HTTP Parsing"], borderColor: "border-teal-500/30" }
    ],
    careerOutcomes: "Systems Software Engineer, Game Developer, HFT Engineer"
  },

  "java-backend-development": {
    title: "Java Backend Development",
    tagline: "Enterprise Grade Engineering",
    duration: "5 Months",
    overview: "Build industrial-strength backends. Master Java, Spring Boot, Microservices, and Cloud deployments. Perfect for aspiring enterprise software engineers.",
    objectives: [
      { num: "01", color: "orange", icon: "Terminal", title: "Core Java", desc: "Deep understanding of the JVM, OOP, and Multithreading." },
      { num: "02", color: "blue", icon: "Database", title: "Spring Ecosystem", desc: "Master Spring Boot, Spring Security, and Data JPA." },
      { num: "03", color: "cyan", icon: "Network", title: "Microservices", desc: "Design distributed systems using Spring Cloud." },
      { num: "04", color: "emerald", icon: "Cloud", title: "Deployment", desc: "Containerize and deploy to AWS/GCP." }
    ],
    outcomes: [
      { label: "CLO 01", color: "orange", icon: "Server", title: "Enterprise Ready", desc: "Prepare for high-scale backend roles." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Java & OOP", subtitle: "MONTHS 1-2", color: "orange",
        modules: [
          { code: "M1", title: "Java Core", weeks: "Weeks 1-4", icon: "Code2", color: "orange", tags: ["JVM", "Collections", "Streams"], desc: "Master the Java language and functional programming." },
          { code: "M2", title: "Multithreading", weeks: "Weeks 5-8", icon: "Layers", color: "red", tags: ["Concurrency", "Executors", "Locks"], desc: "Build highly concurrent applications." }
        ],
        milestoneTitle: "Core Java Mastery", milestoneDesc: "Concurrent Engine", milestoneFeatures: ["Thread Safe", "High Throughput"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Spring Boot & Microservices", subtitle: "MONTHS 3-5", color: "blue",
        modules: [
          { code: "M3", title: "Spring Boot APIs", weeks: "Weeks 9-14", icon: "Server", color: "blue", tags: ["REST", "JPA", "Security"], desc: "Develop secure and robust REST APIs." },
          { code: "M4", title: "Microservices Arch", weeks: "Weeks 15-20", icon: "Network", color: "cyan", tags: ["Eureka", "Kafka", "Docker"], desc: "Scale with event-driven microservices." }
        ],
        milestoneTitle: "Distributed Architecture", milestoneDesc: "Microservices Deployment", milestoneFeatures: ["Service Discovery", "Event Driven"]
      }
    ],
    techStack: {
      client: { title: "Java 17+", icon: "Terminal", desc: "Language", tags: ["JVM", "JDK"] },
      server: { title: "Spring Boot 3", icon: "Server", desc: "Framework", tags: ["Web", "Security", "Data"] },
      database: { title: "PostgreSQL", icon: "Database", desc: "RDBMS", type: "SQL", platform: "AWS RDS" },
      devops: ["Docker", "Kubernetes", "AWS", "Git"]
    },
    projects: [
      { icon: "ShoppingCart", title: "E-Commerce Microservices", tag: "ENTERPRISE", desc: "Distinct services for Inventory, Orders, and Payments.", features: ["Kafka Events", "API Gateway", "OAuth2"], borderColor: "border-orange-500/30" }
    ],
    careerOutcomes: "Backend Engineer, Java Developer, Enterprise Architect"
  },

  "competitive-programming": {
    title: "Competitive Programming",
    tagline: "Algorithms & Problem Solving",
    duration: "6 Months",
    overview: "Elevate your problem-solving skills to elite levels. Master advanced data structures, dynamic programming, and graph algorithms to ace coding interviews and competitions.",
    objectives: [
      { num: "01", color: "red", icon: "Award", title: "Algorithmic Thinking", desc: "Develop a structured approach to unseen problems." },
      { num: "02", color: "purple", icon: "Network", title: "Graph Theory", desc: "Master DFS, BFS, Dijkstra, and advanced routing." },
      { num: "03", color: "cyan", icon: "Layers", title: "Dynamic Programming", desc: "Solve complex optimization problems efficiently." },
      { num: "04", color: "emerald", icon: "ShieldCheck", title: "Contest Strategy", desc: "Speed and accuracy for Codeforces / Leetcode." }
    ],
    outcomes: [
      { label: "CLO 01", color: "red", icon: "Code2", title: "Elite Coder", desc: "Achieve top ratings and crack FAANG interviews." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Foundational DSA", subtitle: "MONTHS 1-2", color: "red",
        modules: [
          { code: "M1", title: "Math & Arrays", weeks: "Weeks 1-4", icon: "LayoutTemplate", color: "red", tags: ["Number Theory", "Prefix Sums"], desc: "Core mathematical tools and array manipulations." },
          { code: "M2", title: "Search & Sort", weeks: "Weeks 5-8", icon: "Search", color: "orange", tags: ["Binary Search", "Merge Sort"], desc: "Advanced searching techniques on solution spaces." }
        ],
        milestoneTitle: "Basic DSA", milestoneDesc: "Leetcode Medium", milestoneFeatures: ["O(N log N) mastery", "Space Optimization"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Advanced Algorithms", subtitle: "MONTHS 3-6", color: "purple",
        modules: [
          { code: "M3", title: "Graphs & Trees", weeks: "Weeks 9-16", icon: "Network", color: "purple", tags: ["Trees", "Shortest Path", "MST"], desc: "Comprehensive graph theory." },
          { code: "M4", title: "DP & Strings", weeks: "Weeks 17-24", icon: "Layers", color: "cyan", tags: ["Knapsack", "KMP", "Tries"], desc: "State transitions and string matching." }
        ],
        milestoneTitle: "Advanced CP", milestoneDesc: "Codeforces Specialist", milestoneFeatures: ["Graph DP", "Segment Trees"]
      }
    ],
    techStack: {
      client: { title: "C++ / Java", icon: "Code2", desc: "Language", tags: ["STL", "Collections"] },
      server: { title: "Platforms", icon: "Monitor", desc: "Judges", tags: ["Codeforces", "Leetcode"] },
      database: { title: "Analytics", icon: "BarChart", desc: "Tracking", type: "Stats", platform: "StopStalk" },
      devops: ["Git", "GDB", "CP Editor", "Macros"]
    },
    projects: [
      { icon: "Terminal", title: "CP Library Boilerplate", tag: "TOOLING", desc: "Your own library of pre-written templates.", features: ["Segment Trees", "Graph Algos", "Math Utils"], borderColor: "border-red-500/30" }
    ],
    careerOutcomes: "Software Development Engineer (SDE), Quantitative Developer"
  },

  "gsoc-preparation": {
    title: "GSoC Preparation",
    tagline: "Open Source Engineering",
    duration: "3 Months",
    overview: "Your ultimate guide to the Google Summer of Code. Learn open-source contribution workflows, version control mastery, and how to write winning proposals.",
    objectives: [
      { num: "01", color: "yellow", icon: "Github", title: "Git Mastery", desc: "Advanced rebasing, branching, and PR workflows." },
      { num: "02", color: "emerald", icon: "FileText", title: "Proposal Writing", desc: "Drafting technical proposals that win." },
      { num: "03", color: "blue", icon: "Network", title: "Community Building", desc: "Networking with org admins and mentors." },
      { num: "04", color: "cyan", icon: "Code2", title: "Code Contribution", desc: "Navigating massive enterprise codebases." }
    ],
    outcomes: [
      { label: "CLO 01", color: "yellow", icon: "Award", title: "Open Source Ready", desc: "Prepared to contribute to CNCF, Apache, etc." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Open Source Basics", subtitle: "MONTH 1", color: "yellow",
        modules: [
          { code: "M1", title: "Git & GitHub", weeks: "Weeks 1-2", icon: "GitMerge", color: "yellow", tags: ["Forks", "PRs", "Rebase"], desc: "Mastering the OSS toolchain." },
          { code: "M2", title: "Finding Orgs", weeks: "Weeks 3-4", icon: "Search", color: "orange", tags: ["Issue Tracking", "Mailing Lists"], desc: "How to find the right organization for you." }
        ],
        milestoneTitle: "First PR", milestoneDesc: "Merged Contribution", milestoneFeatures: ["Bug Fix", "Documentation"]
      },
      {
        id: "phase2", name: "PHASE II", title: "The GSoC Workflow", subtitle: "MONTHS 2-3", color: "emerald",
        modules: [
          { code: "M3", title: "Codebase Navigation", weeks: "Weeks 5-8", icon: "Boxes", color: "emerald", tags: ["Debugging", "Architecture"], desc: "Understanding 1M+ line codebases." },
          { code: "M4", title: "Crafting Proposals", weeks: "Weeks 9-12", icon: "FileText", color: "teal", tags: ["Design Docs", "Timeline"], desc: "Writing a technically sound GSoC proposal." }
        ],
        milestoneTitle: "Proposal Submitted", milestoneDesc: "GSoC Application", milestoneFeatures: ["Architectural Plan", "Timeline"]
      }
    ],
    techStack: {
      client: { title: "Git", icon: "GitMerge", desc: "VCS", tags: ["CLI", "Hooks"] },
      server: { title: "GitHub/GitLab", icon: "Github", desc: "Platform", tags: ["Actions", "CI"] },
      database: { title: "Communication", icon: "Network", desc: "Comms", type: "Chat", platform: "Slack/Discord/IRC" },
      devops: ["Docker", "Linux", "Make", "Bash"]
    },
    projects: [
      { icon: "Github", title: "Major OSS Contribution", tag: "REAL WORLD", desc: "Submit and merge a significant feature to a well-known repository.", features: ["Architectural Change", "Community Review", "CI Passing"], borderColor: "border-yellow-500/30" }
    ],
    careerOutcomes: "Open Source Developer, Software Engineer, GSoC Contributor"
  },

  "full-stack-web-development": {
    title: "Full-Stack Web Development",
    tagline: "Modern Web Arch (Next.js & Node)",
    duration: "6 Months",
    overview: "The complete web engineering path. From React and Next.js on the frontend to Node, Express, and databases on the back. Build end-to-end scalable web applications.",
    objectives: [
      { num: "01", color: "blue", icon: "LayoutTemplate", title: "Frontend UI", desc: "React, Next.js, and CSS frameworks." },
      { num: "02", color: "emerald", icon: "Server", title: "Backend APIs", desc: "Node.js, Express, and GraphQL/REST." },
      { num: "03", color: "purple", icon: "Database", title: "Databases", desc: "SQL (Postgres) and NoSQL (MongoDB)." },
      { num: "04", color: "orange", icon: "Cloud", title: "DevOps", desc: "Deploy via Vercel, AWS, and Docker." }
    ],
    outcomes: [
      { label: "CLO 01", color: "purple", icon: "Network", title: "Full Stack Engineer", desc: "Capable of building any web application architecture." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Modern Frontend", subtitle: "MONTHS 1-3", color: "blue",
        modules: [
          { code: "M1", title: "React & Next.js", weeks: "Weeks 1-6", icon: "Atom", color: "blue", tags: ["Hooks", "SSR/SSG", "Tailwind"], desc: "Build blazing fast interfaces." },
          { code: "M2", title: "State & Querying", weeks: "Weeks 7-12", icon: "Database", color: "cyan", tags: ["Redux", "React Query", "TRPC"], desc: "Manage complex client-side state." }
        ],
        milestoneTitle: "Frontend Mastery", milestoneDesc: "Interactive UI", milestoneFeatures: ["Accessibility", "Performance"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Backend & Systems", subtitle: "MONTHS 4-6", color: "emerald",
        modules: [
          { code: "M3", title: "Node & DBs", weeks: "Weeks 13-18", icon: "Server", color: "emerald", tags: ["Express", "Prisma", "Postgres"], desc: "Design reliable data layers and APIs." },
          { code: "M4", title: "Auth & Cloud", weeks: "Weeks 19-24", icon: "Cloud", color: "orange", tags: ["OAuth", "AWS", "Docker"], desc: "Secure and scale your applications." }
        ],
        milestoneTitle: "Full Stack App", milestoneDesc: "End to End System", milestoneFeatures: ["CI/CD", "Secure"]
      }
    ],
    techStack: {
      client: { title: "Next.js", icon: "Atom", desc: "React Framework", tags: ["React 18", "Tailwind"] },
      server: { title: "Node.js", icon: "Terminal", desc: "Runtime", tags: ["Express", "REST"] },
      database: { title: "PostgreSQL", icon: "Database", desc: "RDBMS", type: "SQL", platform: "Supabase" },
      devops: ["Vercel", "Docker", "GitHub Actions"]
    },
    projects: [
      { icon: "ShoppingCart", title: "Next.js SaaS Platform", tag: "COMMERCIAL", desc: "A multi-tenant SaaS with payments and auth.", features: ["Stripe Subscriptions", "NextAuth.js", "Server Actions"], borderColor: "border-indigo-500/30" },
      { icon: "Network", title: "Realtime Collaboration Tool", tag: "WEBSOCKETS", desc: "A Trello clone using websockets.", features: ["Socket.io", "Drag & Drop", "Redis"], borderColor: "border-purple-500/30" }
    ],
    careerOutcomes: "Full Stack Engineer, Frontend Developer, Backend Engineer"
  },

  "deep-learning-for-computer-vision": {
    title: "Deep Learning for Computer Vision",
    tagline: "AI & Visual Computing",
    duration: "4 Months",
    overview: "Explore the cutting-edge of AI. Learn to build neural networks that can see, classify, and generate images using PyTorch and OpenCV.",
    objectives: [
      { num: "01", color: "slate", icon: "Code2", title: "Math & Python", desc: "Linear Algebra, Calculus, and NumPy." },
      { num: "02", color: "blue", icon: "Monitor", title: "Classical CV", desc: "Image processing with OpenCV." },
      { num: "03", color: "indigo", icon: "Network", title: "Deep Learning", desc: "CNNs, ResNets, and object detection." },
      { num: "04", color: "purple", icon: "Rocket", title: "Advanced Generative", desc: "GANs and Diffusion Models." }
    ],
    outcomes: [
      { label: "CLO 01", color: "slate", icon: "Award", title: "AI Engineer", desc: "Design intelligent vision systems." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Foundations", subtitle: "MONTHS 1-2", color: "slate",
        modules: [
          { code: "M1", title: "Python & Math", weeks: "Weeks 1-4", icon: "Terminal", color: "slate", tags: ["NumPy", "Pandas", "Math"], desc: "The core tools for data scientific computing." },
          { code: "M2", title: "Neural Nets", weeks: "Weeks 5-8", icon: "Network", color: "blue", tags: ["PyTorch", "Backprop", "CNNs"], desc: "Building your first deep learning models." }
        ],
        milestoneTitle: "Classification", milestoneDesc: "Custom CNN", milestoneFeatures: ["90%+ Accuracy", "Custom Dataset"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Advanced Vision", subtitle: "MONTHS 3-4", color: "indigo",
        modules: [
          { code: "M3", title: "Object Detection", weeks: "Weeks 9-12", icon: "Search", color: "indigo", tags: ["YOLO", "R-CNN", "Transformers"], desc: "Detecting and tracking objects." },
          { code: "M4", title: "Generative Vision", weeks: "Weeks 13-16", icon: "Atom", color: "purple", tags: ["GANs", "Diffusion", "Stable Diff"], desc: "Creating novel images with AI." }
        ],
        milestoneTitle: "Vision System", milestoneDesc: "Realtime Detection", milestoneFeatures: ["GPU Accel", "Live Feed"]
      }
    ],
    techStack: {
      client: { title: "Python", icon: "Code2", desc: "Language", tags: ["3.10+", "Jupyter"] },
      server: { title: "PyTorch", icon: "Network", desc: "Framework", tags: ["Tensors", "Autograd"] },
      database: { title: "Datasets", icon: "Database", desc: "Data", type: "Images", platform: "Kaggle/Roboflow" },
      devops: ["CUDA", "Colab", "HuggingFace"]
    },
    projects: [
      { icon: "Monitor", title: "Autonomous Vehicle Vision", tag: "DETECTION", desc: "Detect lanes, vehicles, and pedestrians from dashcam footage.", features: ["YOLOv8", "OpenCV", "Real-time"], borderColor: "border-slate-500/30" },
      { icon: "FileText", title: "Medical Image Diagnosis", tag: "CLASSIFICATION", desc: "Detect anomalies in x-rays.", features: ["ResNet50", "Transfer Learning", "Grad-CAM"], borderColor: "border-indigo-500/30" }
    ],
    careerOutcomes: "Computer Vision Engineer, Machine Learning Researcher, AI Engineer"
  }
};
