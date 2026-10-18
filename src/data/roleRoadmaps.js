export const roleRoadmaps = {
  // Role Based Roadmaps
  "Frontend": {
    category: "Role Based",
    title: "Frontend Developer",
    description: "Build modern, interactive user interfaces for the web.",
    timeline: [
      { title: "Internet Fundamentals", topics: ["How the web works", "HTTP/DNS", "Browsers"] },
      { title: "HTML & CSS", topics: ["Semantic HTML", "Flexbox & Grid", "Responsive Design"] },
      { title: "JavaScript", topics: ["ES6+", "DOM Manipulation", "Asynchronous JS (Promises, Fetch)"] },
      { title: "Frameworks", topics: ["React / Vue / Angular", "State Management", "Routing"] },
      { title: "Styling & Build", topics: ["Tailwind CSS / SASS", "Vite / Webpack", "Testing Basics"] }
    ]
  },
  "Backend": {
    category: "Role Based",
    title: "Backend Developer",
    description: "Build robust APIs, manage databases, and handle server logic.",
    timeline: [
      { title: "OS & Network basics", topics: ["Terminal/Bash", "OSI Model", "HTTP/HTTPS"] },
      { title: "Language & DBs", topics: ["Node.js / Python / Go", "SQL (PostgreSQL)", "NoSQL (MongoDB)"] },
      { title: "API Design", topics: ["RESTful APIs", "GraphQL", "Authentication (JWT)"] },
      { title: "Caching & Advanced DB", topics: ["Redis", "Message Queues", "Transactions & ACID"] },
      { title: "Deployment", topics: ["Docker", "CI/CD", "AWS/GCP/Azure deployments"] }
    ]
  },
  "Full Stack": {
    category: "Role Based",
    title: "Full Stack Developer",
    description: "Master both ends of the development spectrum.",
    timeline: [
      { title: "Frontend Foundation", topics: ["HTML/CSS/JS", "React.js or Next.js"] },
      { title: "Backend Foundation", topics: ["Node.js / Express", "REST APIs", "Auth Strategies"] },
      { title: "Database Management", topics: ["PostgreSQL or MongoDB", "ORMs (Prisma, Mongoose)"] },
      { title: "DevOps & Deployment", topics: ["Docker Basics", "Vercel/Render deployments"] },
      { title: "System Architecture", topics: ["Monolith vs Microservices", "System Design Basics"] }
    ]
  },
  "DevOps": {
    category: "Role Based",
    title: "DevOps Engineer",
    description: "Automate and optimize software deployment and infrastructure.",
    timeline: [
      { title: "OS & Scripting", topics: ["Linux Administration", "Bash / Python Scripting"] },
      { title: "Networking & Security", topics: ["DNS, Firewalls", "Load Balancing", "SSH/TLS"] },
      { title: "Containers", topics: ["Docker", "Docker Compose", "LXC"] },
      { title: "CI/CD & IaC", topics: ["GitHub Actions / Jenkins", "Terraform", "Ansible"] },
      { title: "Orchestration & Observability", topics: ["Kubernetes", "Prometheus / Grafana", "Logging"] }
    ]
  },
  "DevSecOps": {
    category: "Role Based",
    title: "DevSecOps",
    description: "Integrate security practices within the DevOps process.",
    timeline: [
      { title: "DevOps Foundation", topics: ["Linux", "Containers", "CI/CD"] },
      { title: "Security Principles", topics: ["IAM", "Cryptography Basics", "OWASP Top 10"] },
      { title: "Threat Modeling", topics: ["Vulnerability Assessment", "SAST / DAST"] },
      { title: "Securing Infrastructure", topics: ["Container Security", "Secrets Management", "Compliance"] }
    ]
  },
  "Data Analyst": {
    category: "Role Based",
    title: "Data Analyst",
    description: "Extract actionable insights from raw data.",
    timeline: [
      { title: "Mathematics", topics: ["Statistics", "Probability", "Descriptive Stats"] },
      { title: "Spreadsheets & DBs", topics: ["Advanced Excel", "SQL Queries", "Relational Databases"] },
      { title: "Programming", topics: ["Python (Pandas, NumPy)"] },
      { title: "BI & Visualization", topics: ["Tableau / Power BI", "Data Storytelling"] }
    ]
  },
  "AI Engineer": {
    category: "Role Based",
    title: "AI Engineer",
    description: "Design and implement AI models into production applications.",
    timeline: [
      { title: "Programming & Math", topics: ["Python", "Linear Algebra", "Calculus"] },
      { title: "Transformers & LLMs", topics: ["HuggingFace", "Prompt Engineering", "RAG architectures"] },
      { title: "Frameworks", topics: ["PyTorch / TensorFlow", "LangChain / LlamaIndex"] },
      { title: "Deployment", topics: ["Model Serving", "Vector Databases (Pinecone/Milvus)", "AI Agents"] }
    ]
  },
  "AI and Data Scientist": {
    category: "Role Based",
    title: "Data Scientist",
    description: "Deep dive into data to build predictive models.",
    timeline: [
      { title: "Core Math & Stats", topics: ["Hypothesis Testing", "Probability Distributions"] },
      { title: "Programming & Wrangling", topics: ["Python", "Pandas", "Feature Engineering"] },
      { title: "Machine Learning Concepts", topics: ["Regression", "Classification", "Clustering (Scikit-Learn)"] },
      { title: "Deep Learning basics", topics: ["Neural Networks", "NLP / Vision basics"] }
    ]
  },
  "Data Engineer": {
    category: "Role Based",
    title: "Data Engineer",
    description: "Build robust data pipelines and architectures.",
    timeline: [
      { title: "Database Systems", topics: ["SQL / NoSQL", "Data Modeling", "Data Warehouses (Snowflake, BigQuery)"] },
      { title: "Data Processing", topics: ["Batch Processing (Hadoop)", "Stream Processing (Kafka, Flink)"] },
      { title: "Orchestration & ETL", topics: ["Airflow / Prefect", "dbt", "ETL vs ELT"] },
      { title: "Cloud & Arch", topics: ["AWS/GCP Data tools", "Data Lakes vs Warehouses"] }
    ]
  },
  "Android": {
    category: "Role Based",
    title: "Android Developer",
    description: "Create native apps for the Android ecosystem.",
    timeline: [
      { title: "Language", topics: ["Kotlin Fundamentals", "Coroutines"] },
      { title: "Core Android", topics: ["Activities & Fragments", "Lifecycles", "Intents"] },
      { title: "UI & State", topics: ["Jetpack Compose", "Material Design", "ViewModel"] },
      { title: "Architecture & Data", topics: ["MVVM", "Room DB", "Retrofit for APIs"] }
    ]
  },
  "iOS": {
    category: "Role Based",
    title: "iOS Developer",
    description: "Build exceptional apps for Apple devices.",
    timeline: [
      { title: "Language", topics: ["Swift Fundamentals", "Optionals & Protocols"] },
      { title: "UI Framework", topics: ["SwiftUI", "UIKit basics"] },
      { title: "Architecture", topics: ["MVVM or MVC", "Combine / Async-Await"] },
      { title: "Data & Publishing", topics: ["CoreData / SwiftData", "URLSession", "App Store Connect"] }
    ]
  },
  "Machine Learning": {
    category: "Role Based",
    title: "Machine Learning Engineer",
    description: "Build, deploy, and scale ML models.",
    timeline: [
      { title: "Foundation", topics: ["Python", "Linear Algebra", "Calculus"] },
      { title: "Classic ML", topics: ["Scikit-Learn", "XGBoost", "Model Evaluation"] },
      { title: "Deep Learning", topics: ["PyTorch/TF", "CNNs", "RNNs"] },
      { title: "MLOps", topics: ["Model Registry", "MLflow", "Serving (TorchServe, Flask)"] }
    ]
  },
  "Blockchain": {
    category: "Role Based",
    title: "Blockchain Developer",
    description: "Develop Web3 integrations and smart contracts.",
    timeline: [
      { title: "Cryptography & Fundamentals", topics: ["Hashes", "Public Key Crypto", "Consensus Algorithms"] },
      { title: "Smart Contracts", topics: ["Solidity", "Ethereum Virtual Machine (EVM)"] },
      { title: "Development Tools", topics: ["Hardhat / Foundry", "Truffle", "Ethers.js / Web3.js"] },
      { title: "Security", topics: ["Reentrancy Attacks", "Auditing Basics", "DeFi Concepts"] }
    ]
  },
  "QA": {
    category: "Role Based",
    title: "QA Engineer",
    description: "Ensure software quality through testing pipelines.",
    timeline: [
      { title: "Manual Testing", topics: ["Test Plans", "Test Cases", "Bug Lifecycle"] },
      { title: "Web Automation", topics: ["Selenium", "Cypress / Playwright", "Locator strategies"] },
      { title: "API Testing", topics: ["Postman", "REST Assured", "GraphQL Testing"] },
      { title: "CI/CD Integration", topics: ["Running tests in GitHub Actions", "Reporting"] }
    ]
  },
  "Software Architect": {
    category: "Role Based",
    title: "Software Architect",
    description: "Design massive technical infrastructures.",
    timeline: [
      { title: "System Design", topics: ["Scalability", "High Availability", "Microservices"] },
      { title: "Design Patterns", topics: ["Creational, Structural, Behavioral Patterns"] },
      { title: "Domain Driven Design", topics: ["Bounded Contexts", "Entities", "Event Sourcing"] },
      { title: "Cloud & Infrastructure", topics: ["AWS/GCP Architecture", "Serverless", "Kubernetes"] }
    ]
  },
  "API Design": {
    category: "Role Based",
    title: "API Designer",
    description: "Craft perfect, scalable APIs.",
    timeline: [
      { title: "REST Protocols", topics: ["HTTP Methods", "Status Codes", "HATEOAS"] },
      { title: "GraphQL & gRPC", topics: ["Schemas", "Mutations", "Protobuf"] },
      { title: "Security & Rate Limiting", topics: ["OAuth 2.0", "API Gateways", "Throttling"] },
      { title: "Documentation", topics: ["OpenAPI / Swagger", "Versioning", "Developer Experience"] }
    ]
  },
  "Cyber Security": {
    category: "Role Based",
    title: "Cyber Security",
    description: "Protect systems, networks, and programs from attacks.",
    timeline: [
      { title: "Networking & Admin", topics: ["TCP/IP", "Linux Admin", "Wireshark"] },
      { title: "Defensive Security", topics: ["Firewalls", "SIEM (Splunk)", "Endpoint Protection"] },
      { title: "Offensive Security (Pentesting)", topics: ["Metasploit", "Burp Suite", "Nmap"] },
      { title: "Application Security", topics: ["OWASP Top 10", "Zero Trust Architecture", "Cryptography"] }
    ]
  },
  "UX Design": {
    category: "Role Based",
    title: "UX Designer",
    description: "Design products that provide meaningful and relevant experiences to users.",
    timeline: [
      { title: "User Research", topics: ["User Personas", "Journey Mapping", "Interviews"] },
      { title: "Information Architecture", topics: ["Wireframing", "Card Sorting", "User Flows"] },
      { title: "Prototyping & UI", topics: ["Figma / Adobe XD", "High-Fidelity Mocks", "Design Systems"] },
      { title: "Usability Testing", topics: ["A/B Testing", "Heuristic Evaluation", "Accessibility"] }
    ]
  },
  "Technical Writer": {
    category: "Role Based",
    title: "Technical Writer",
    description: "Communicate complex information clearly and concisely.",
    timeline: [
      { title: "Writing Fundamentals", topics: ["Technical Writing Style", "Grammar", "Audience Analysis"] },
      { title: "Markup & Docs as Code", topics: ["Markdown", "AsciiDoc", "Git Basics"] },
      { title: "API Documentation", topics: ["OpenAPI", "Swagger UI", "Documenting Endpoints"] },
      { title: "Tools & Generators", topics: ["Docusaurus", "Hugo", "Read the Docs"] }
    ]
  },
  "Game Developer": {
    category: "Role Based",
    title: "Game Developer",
    description: "Build immersive games.",
    timeline: [
      { title: "Programming", topics: ["C++ or C#", "Math/Physics for Games"] },
      { title: "Game Engines", topics: ["Unity (C#) or Unreal Engine (C++)", "Godot"] },
      { title: "Game Architecture", topics: ["Entity Component System (ECS)", "Game Loops"] },
      { title: "Graphics & Rendering", topics: ["Shaders Basics", "OpenGL / Vulkan Basics"] }
    ]
  },
  "Server Side Game Development": {
    category: "Role Based",
    title: "Server Side Game Dev",
    description: "Build scalable backends for multiplayer games.",
    timeline: [
      { title: "Networking", topics: ["UDP vs TCP", "WebSockets", "Latency Compensation"] },
      { title: "Backend Architecture", topics: ["Matchmaking Services", "Dedicated Server Hosting"] },
      { title: "Storage", topics: ["Player Profiles", "Leaderboards (Redis)"] }
    ]
  },
  "MLOps": {
    category: "Role Based",
    title: "MLOps",
    description: "Streamline the machine learning lifecycle.",
    timeline: [
      { title: "ML Fundamentals", topics: ["Model Training", "Evaluation Metrics"] },
      { title: "Pipeline Orchestration", topics: ["Kubeflow", "Airflow"] },
      { title: "Model Deployment & Serving", topics: ["TorchServe", "TensorRT", "FastAPI"] },
      { title: "Monitoring", topics: ["Data Drift", "Model Drift", "Prometheus"] }
    ]
  },
  "Product Manager": {
    category: "Role Based",
    title: "Product Manager",
    description: "Lead the lifecycle of digital products.",
    timeline: [
      { title: "Discovery", topics: ["Market Research", "User Needs", "Competitor Analysis"] },
      { title: "Strategy & Roadmapping", topics: ["PRDs", "Prioritization Frameworks (RICE)"] },
      { title: "Agile & Delivery", topics: ["Sprint Planning", "Scrum", "Working with Eng"] },
      { title: "Go-to-Market & Analytics", topics: ["Launch Strategy", "KPIs", "Funnel Analysis"] }
    ]
  },
  "Engineering Manager": {
    category: "Role Based",
    title: "Engineering Manager",
    description: "Manage engineering teams and technical strategy.",
    timeline: [
      { title: "Leadership & People", topics: ["1v1s", "Performance Reviews", "Hiring"] },
      { title: "Process Management", topics: ["Agile/Scrum", "Sprint Velocity", "Incident Management"] },
      { title: "Technical Strategy", topics: ["Architecture Reviews", "Tech Debt Management"] }
    ]
  },
  "Developer Relations": {
    category: "Role Based",
    title: "Developer Relations",
    description: "Bridge the gap between engineering and external communities.",
    timeline: [
      { title: "Content Creation", topics: ["Technical Blog Posts", "Video Tutorials", "Podcasts"] },
      { title: "Community Building", topics: ["Discord/Slack Engagement", "Open Source Maintenance"] },
      { title: "Advocacy", topics: ["Speaking at Conferences", "SDK/API Feedback Loops"] }
    ]
  },
  "BI Analyst": {
    category: "Role Based",
    title: "BI Analyst",
    description: "Analyze and interpret complex digital data.",
    timeline: [
      { title: "Data Foundations", topics: ["SQL", "Relational Models", "ETL Basics"] },
      { title: "BI Tools", topics: ["Power BI", "Tableau", "Looker"] },
      { title: "Dashboarding", topics: ["Data Visualization Best Practices", "DAX expressions"] }
    ]
  },
  "AI Red Teaming": {
    category: "Role Based",
    title: "AI Red Teaming",
    description: "Identify vulnerabilities in AI models.",
    timeline: [
      { title: "AI Fundamentals", topics: ["LLM architectures", "Training parameters"] },
      { title: "Vulnerability Analysis", topics: ["Prompt Injection", "Data Poisoning", "Model Inversion"] },
      { title: "Testing & Mitigation", topics: ["Fuzzing AI", "Adversarial Examples", "Jailbreak Crafting"] }
    ]
  },
  "PostgreSQL": {
    category: "Role Based",
    title: "PostgreSQL Specialist",
    description: "Deep dive into advanced Postgres database administration.",
    timeline: [
      { title: "SQL Mastery", topics: ["CTEs", "Window Functions", "Advanced Joins"] },
      { title: "Architecture", topics: ["MVCC", "Write-Ahead Logging (WAL)"] },
      { title: "Performance Tuning", topics: ["EXPLAIN ANALYZE", "Index optimization", "Vacuuming"] }
    ]
  },

  // Skill Based Roadmaps
  "React": {
    category: "Skill Based",
    title: "React Developer",
    timeline: [
      { title: "Basics", topics: ["JSX", "Components", "Props", "State & Lifecycle (Hooks)"] },
      { title: "Advanced React", topics: ["Context API", "Custom Hooks", "Suspense", "React 19 Features"] },
      { title: "Ecosystem", topics: ["React Router", "Zustand/Redux", "React Query"] }
    ]
  },
  "Vue": {
    category: "Skill Based",
    title: "Vue Developer",
    timeline: [
      { title: "Core", topics: ["Vue Instance", "Directives", "Computed Properties", "Components"] },
      { title: "Vue 3 & Ecosystem", topics: ["Composition API", "Vue Router", "Pinia", "Nuxt.js"] }
    ]
  },
  "Angular": {
    category: "Skill Based",
    title: "Angular Developer",
    timeline: [
      { title: "Architecture", topics: ["Modules", "Components", "Templates", "Directives"] },
      { title: "Data Flow", topics: ["Services", "Dependency Injection", "RxJS / Observables"] }
    ]
  },
  "JavaScript": {
    category: "Skill Based",
    title: "JavaScript Mastery",
    timeline: [
      { title: "Basics", topics: ["Variables", "Functions", "Objects", "Arrays"] },
      { title: "Advanced", topics: ["Closures", "Prototypal Inheritance", "Event Loop", "Promises / Async"] }
    ]
  },
  "TypeScript": {
    category: "Skill Based",
    title: "TypeScript Mastery",
    timeline: [
      { title: "Types", topics: ["Primitives", "Interfaces", "Type Aliases", "Enums"] },
      { title: "Advanced", topics: ["Generics", "Utility Types", "Decorators", "Strict Mode"] }
    ]
  },
  "Node.js": {
    category: "Skill Based",
    title: "Node.js Environment",
    timeline: [
      { title: "Core", topics: ["Event Loop", "CommonJS vs ES Modules", "fs & path modules", "Streams & Buffers"] },
      { title: "Frameworks & APIs", topics: ["Express/Fastify", "REST & GraphQL", "Authentication"] }
    ]
  },
  "Python": {
    category: "Skill Based",
    title: "Python Mastery",
    timeline: [
      { title: "Basics", topics: ["Syntax", "Data Structures", "Functions", "OOP"] },
      { title: "Advanced", topics: ["Decorators", "Generators", "Context Managers", "Concurrency"] }
    ]
  },
  "System Design": {
    category: "Skill Based",
    title: "System Design",
    timeline: [
      { title: "Core Concepts", topics: ["CAP Theorem", "Load Balancing", "Consistent Hashing"] },
      { title: "Data Management", topics: ["Database Scaling", "Sharding", "Caching Strategies", "Message Queues"] }
    ]
  },
  "Java": {
    category: "Skill Based",
    title: "Java Mastery",
    timeline: [
      { title: "Core Java", topics: ["OOP Concepts", "Collections Framework", "Exception Handling"] },
      { title: "Advanced Java", topics: ["Multithreading", "Stream API", "JVM Internals"] }
    ]
  },
  "Spring Boot": {
    category: "Skill Based",
    title: "Spring Boot",
    timeline: [
      { title: "Core", topics: ["Dependency Injection", "Spring MVC", "Spring Data JPA"] },
      { title: "Advanced", topics: ["Spring Security", "Microservices with Spring Cloud", "Actuator"] }
    ]
  },
  "Go": {
    category: "Skill Based",
    title: "Go (Golang)",
    timeline: [
      { title: "Fundamentals", topics: ["Types", "Structs", "Interfaces", "Error Handling"] },
      { title: "Concurrency", topics: ["Goroutines", "Channels", "Mutexes", "Context"] }
    ]
  },
  "Rust": {
    category: "Skill Based",
    title: "Rust Developer",
    timeline: [
      { title: "Core Concepts", topics: ["Ownership", "Borrowing", "Lifetimes"] },
      { title: "Advanced", topics: ["Traits", "Macros", "Concurrency", "Unsafe Rust"] }
    ]
  },
  "C++": {
    category: "Skill Based",
    title: "C++ Mastery",
    timeline: [
      { title: "Fundamentals", topics: ["Pointers", "Memory Management", "Class/Object Design"] },
      { title: "Modern C++", topics: ["Smart Pointers", "Move Semantics", "STL (Standard Template Library)"] }
    ]
  },
  "Docker": {
    category: "Skill Based",
    title: "Docker Specialist",
    timeline: [
      { title: "Basics", topics: ["Images", "Containers", "Dockerfiles", "Volumes & Networks"] },
      { title: "Advanced", topics: ["Docker Compose", "Multi-stage builds", "Security Best Practices"] }
    ]
  },
  "Kubernetes": {
    category: "Skill Based",
    title: "Kubernetes (K8s)",
    timeline: [
      { title: "Core Architecture", topics: ["Pods", "Deployments", "Services", "Nodes"] },
      { title: "Advanced", topics: ["Ingress", "ConfigMaps & Secrets", "StatefulSets", "Helm Charts"] }
    ]
  },
  "AWS": {
    category: "Skill Based",
    title: "AWS Cloud",
    timeline: [
      { title: "Core Services", topics: ["EC2", "S3", "VPC", "IAM"] },
      { title: "Databases & Serverless", topics: ["RDS", "DynamoDB", "Lambda", "API Gateway"] }
    ]
  },
  "Terraform": {
    category: "Skill Based",
    title: "Terraform IaC",
    timeline: [
      { title: "Basics", topics: ["Providers", "Resources", "Variables", "State Management"] },
      { title: "Advanced", topics: ["Modules", "Workspaces", "Provisioners", "Remote State"] }
    ]
  },
  "Data Structures & Algorithms": {
    category: "Skill Based",
    title: "Data Structures & Algorithms",
    timeline: [
      { title: "Data Structures", topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "Hash Maps"] },
      { title: "Algorithms", topics: ["Sorting", "Searching", "Dynamic Programming", "Graph Traversal"] }
    ]
  },
  "Git and GitHub": {
    category: "Skill Based",
    title: "Git and GitHub",
    timeline: [
      { title: "Git Basics", topics: ["Commits", "Branches", "Merges", "Rebasing"] },
      { title: "GitHub Workflows", topics: ["Pull Requests", "Forks", "GitHub Actions", "Issues"] }
    ]
  },
  "Next.js": {
    category: "Skill Based",
    title: "Next.js Framework",
    timeline: [
      { title: "Core Next.js", topics: ["App Router", "Server Components", "Client Components"] },
      { title: "Data & Optimization", topics: ["Data Fetching", "Image Optimization", "API Routes", "Middleware"] }
    ]
  },
  "Linux": {
    category: "Skill Based",
    title: "Linux Administration",
    timeline: [
      { title: "Basics", topics: ["File System Hierarchy", "Permissions", "Users & Groups"] },
      { title: "Advanced", topics: ["Process Management", "Networking", "Shell Scripting", "Systemd"] }
    ]
  },
  "MongoDB": {
    category: "Skill Based",
    title: "MongoDB",
    timeline: [
      { title: "Fundamentals", topics: ["Documents", "Collections", "CRUD Operations", "Indexes"] },
      { title: "Advanced", topics: ["Aggregation Framework", "Sharding", "Replication", "Transactions"] }
    ]
  },
  "Redis": {
    category: "Skill Based",
    title: "Redis In-Memory Database",
    timeline: [
      { title: "Data Structures", topics: ["Strings", "Hashes", "Lists", "Sets", "Sorted Sets"] },
      { title: "Advanced Features", topics: ["Pub/Sub", "Transactions", "Persistence (RDB/AOF)", "Clustering"] }
    ]
  },
  "SQL": {
    category: "Skill Based",
    title: "SQL Mastery",
    timeline: [
      { title: "Queries", topics: ["SELECT", "JOINs", "GROUP BY", "Subqueries"] },
      { title: "Database Design", topics: ["Normalization", "Constraints", "Indexes", "Triggers"] }
    ]
  },
  "Prompt Engineering": {
    category: "Skill Based",
    title: "Prompt Engineering",
    timeline: [
      { title: "Fundamentals", topics: ["Zero-shot & Few-shot", "Chain of Thought", "System Prompts"] },
      { title: "Advanced Techniques", topics: ["Tree of Thoughts", "RAG Prompting", "Jailbreak Prevention"] }
    ]
  },
  "AI Agents": {
    category: "Skill Based",
    title: "AI Agents Architecture",
    timeline: [
      { title: "Agent Design", topics: ["LLMs as Reasoning Engines", "Memory (Short-term vs Long-term)"] },
      { title: "Tools & Actions", topics: ["Tool Calling", "LangChain/LangGraph", "Multi-Agent Systems (AutoGen)"] }
    ]
  },
  // Adding placeholders for remaining items
  "ASP.NET Core": { category: "Skill Based", title: "ASP.NET Core", timeline: [{title:"Core", topics:["MVC patterns", "Middleware"]}] },
  "Flutter": { category: "Skill Based", title: "Flutter", timeline: [{title:"Dart & Widgets", topics:["Stateless/Stateful", "Navigation"]}] },
  "Design Architecture": { category: "Skill Based", title: "Design Architecture", timeline: [{title:"Concepts", topics:["SOLID", "Microservices"]}] },
  "React Native": { category: "Skill Based", title: "React Native", timeline: [{title:"Mobile React", topics:["Navigation", "Native Modules"]}] },
  "Design System": { category: "Skill Based", title: "Design System", timeline: [{title:"UI Foundations", topics:["Tokens", "Component Library"]}] },
  "PHP": { category: "Skill Based", title: "PHP", timeline: [{title:"Backend Language", topics:["Syntax", "Composer"]}] },
  "Cloudflare": { category: "Skill Based", title: "Cloudflare", timeline: [{title:"CDN & Security", topics:["Workers", "DNS", "WAF"]}] },
  "Kotlin": { category: "Skill Based", title: "Kotlin", timeline: [{title:"Android & Backend", topics:["JVM", "Coroutines"]}] },
  "HTML": { category: "Skill Based", title: "HTML", timeline: [{title:"Markup", topics:["Semantic elements", "Forms"]}] },
  "CSS": { category: "Skill Based", title: "CSS", timeline: [{title:"Styling", topics:["Flexbox", "Grid", "Animations"]}] },
  "Swift & Swift UI": { category: "Skill Based", title: "Swift UI", timeline: [{title:"Apple Ecosystem", topics:["Declarative UI", "State"]}] },
  "Shell / Bash": { category: "Skill Based", title: "Shell Scripting", timeline: [{title:"Automation", topics:["Variables", "Loops", "Awk/Sed"]}] },
  "Laravel": { category: "Skill Based", title: "Laravel", timeline: [{title:"PHP Framework", topics:["Eloquent ORM", "Blade logic"]}] },
  "Elasticsearch": { category: "Skill Based", title: "Elasticsearch", timeline: [{title:"Search Engine", topics:["Lucene", "Inverted Index"]}] },
  "WordPress": { category: "Skill Based", title: "WordPress", timeline: [{title:"CMS", topics:["Themes", "Plugins", "Hooks"]}] },
  "Django": { category: "Skill Based", title: "Django", timeline: [{title:"Python Web", topics:["MVT Architecture", "Django ORM"]}] },
  "Ruby": { category: "Skill Based", title: "Ruby", timeline: [{title:"Language", topics:["Gems", "Blocks", "Modules"]}] },
  "Ruby on Rails": { category: "Skill Based", title: "Ruby on Rails", timeline: [{title:"Web Framework", topics:["ActiveRecord", "ActionController"]}] },
  "Scala": { category: "Skill Based", title: "Scala", timeline: [{title:"JVM Language", topics:["Functional Programming", "Akka"]}] },
  "Computer Science": { category: "Skill Based", title: "Computer Science", timeline: [{title:"Core Concepts", topics:["Algorithms", "OS", "Networking"]}] },
  "OpenClaw": { category: "Skill Based", title: "OpenClaw", timeline: [{title:"Emerging Tech", topics:["Documentation mapping"]}] },
  "Claude Code": { category: "Skill Based", title: "Claude Code", timeline: [{title:"AI Coding Assistant", topics:["Using Anthropic tools", "CLI"]}] },
  "Vibe Coding": { category: "Skill Based", title: "Vibe Coding", timeline: [{title:"AI Workflow", topics:["Agentic Coding", "Prompt iteration"]}] },
  
  // Absolute Beginners
  "Frontend Beginner": { category: "Beginner", title: "Frontend Beginner", timeline: [{title:"Starting Out", topics:["HTML elements", "Basic CSS colors"]}] },
  "Backend Beginner": { category: "Beginner", title: "Backend Beginner", timeline: [{title:"Starting Out", topics:["What is a server", "Basic Python/JS backend"]}] },
  "DevOps Beginner": { category: "Beginner", title: "DevOps Beginner", timeline: [{title:"Starting Out", topics:["What is the cloud", "Basic terminal commands"]}] },
  "Git and GitHub Beginner": { category: "Beginner", title: "Git Beginner", timeline: [{title:"Starting Out", topics:["Creating a repo", "git add, commit, push"]}] }
};
