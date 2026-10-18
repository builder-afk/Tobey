// Company profiles with interview focus areas, difficulty, and preparation strategies
export const companyProfiles = {
  "Google": {
    logo: "🔍",
    color: "#4285F4",
    difficulty: "Very Hard",
    focusAreas: ["Data Structures & Algorithms", "System Design", "Behavioral"],
    dsa_weight: 0.5,
    system_design_weight: 0.3,
    behavioral_weight: 0.2,
    interviewRounds: ["Phone Screen (DSA)", "Onsite Round 1 (DSA)", "Onsite Round 2 (DSA)", "Onsite Round 3 (System Design)", "Onsite Round 4 (Behavioral - Googleyness)"],
    topTopics: ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming", "Greedy Algorithms", "Binary Search", "Recursion & Backtracking"],
    systemDesignTopics: ["Design YouTube", "Design Google Search", "Design Google Maps", "Design Gmail", "Design Google Drive"],
    tips: ["Focus heavily on time & space complexity analysis", "Practice thinking out loud — Google values communication", "Study Googleyness & Leadership principles", "Expect 45-min coding rounds with follow-ups"]
  },
  "Amazon": {
    logo: "📦",
    color: "#FF9900",
    difficulty: "Hard",
    focusAreas: ["Data Structures & Algorithms", "System Design", "Leadership Principles"],
    dsa_weight: 0.4,
    system_design_weight: 0.3,
    behavioral_weight: 0.3,
    interviewRounds: ["Online Assessment (OA)", "Phone Screen", "Onsite Loop (4-5 rounds)", "Bar Raiser Round"],
    topTopics: ["Arrays & Hashing", "Trees & Graphs", "Dynamic Programming", "Greedy Algorithms", "BFS/DFS", "Linked Lists"],
    systemDesignTopics: ["Design Amazon.com", "Design a Delivery System", "Design Amazon Prime Video", "Design an Inventory System", "Design Rate Limiter"],
    tips: ["Master all 16 Leadership Principles with STAR stories", "OA usually has 2 coding + 1 work simulation", "Bar Raiser focuses on LP deep dives", "Practice writing clean, production-quality code"]
  },
  "Microsoft": {
    logo: "🪟",
    color: "#00A4EF",
    difficulty: "Hard",
    focusAreas: ["Data Structures & Algorithms", "System Design", "Problem Solving"],
    dsa_weight: 0.45,
    system_design_weight: 0.3,
    behavioral_weight: 0.25,
    interviewRounds: ["Phone Screen (DSA)", "Onsite Round 1 (DSA)", "Onsite Round 2 (DSA)", "Onsite Round 3 (System Design)", "As-Appropriate (Hiring Manager)"],
    topTopics: ["Arrays & Strings", "Trees & Graphs", "Linked Lists", "Dynamic Programming", "Stack & Queue", "Sorting & Searching"],
    systemDesignTopics: ["Design Microsoft Teams", "Design OneDrive", "Design Azure Load Balancer", "Design Xbox Live", "Design Outlook"],
    tips: ["Strong focus on code quality and edge cases", "Interviewers value clean, working code on whiteboard", "System Design rounds test scalability thinking", "Be ready for 'As Appropriate' culture-fit round"]
  },
  "Meta": {
    logo: "Ⓜ️",
    color: "#0668E1",
    difficulty: "Very Hard",
    focusAreas: ["Data Structures & Algorithms", "System Design", "Behavioral"],
    dsa_weight: 0.5,
    system_design_weight: 0.3,
    behavioral_weight: 0.2,
    interviewRounds: ["Phone Screen (2 Coding)", "Onsite Coding 1", "Onsite Coding 2", "System Design", "Behavioral"],
    topTopics: ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming", "Binary Search", "BFS/DFS", "Intervals"],
    systemDesignTopics: ["Design Facebook News Feed", "Design Instagram", "Design WhatsApp", "Design Facebook Messenger", "Design Live Video Streaming"],
    tips: ["Meta expects 2 medium/hard problems in 35 mins", "Speed is crucial — practice timed coding", "Use their core values for behavioral answers", "System Design expects you to drive the conversation"]
  },
  "Apple": {
    logo: "🍎",
    color: "#A2AAAD",
    difficulty: "Hard",
    focusAreas: ["Data Structures & Algorithms", "System Design", "Domain Knowledge"],
    dsa_weight: 0.4,
    system_design_weight: 0.3,
    behavioral_weight: 0.3,
    interviewRounds: ["Phone Screen", "Technical Round 1", "Technical Round 2", "System Design", "Hiring Manager"],
    topTopics: ["Arrays & Strings", "Trees & Graphs", "Linked Lists", "Concurrency", "OOP Design", "Bit Manipulation"],
    systemDesignTopics: ["Design iCloud", "Design Apple Music", "Design App Store", "Design Siri", "Design AirDrop"],
    tips: ["Apple values attention to detail — edge cases matter", "Know your domain deeply (iOS/macOS/Backend)", "Expect questions about concurrency and threading", "Culture fit is very team-specific"]
  },
  "Netflix": {
    logo: "🎬",
    color: "#E50914",
    difficulty: "Very Hard",
    focusAreas: ["System Design", "Data Structures & Algorithms", "Culture Fit"],
    dsa_weight: 0.3,
    system_design_weight: 0.4,
    behavioral_weight: 0.3,
    interviewRounds: ["Phone Screen (Technical)", "Onsite Technical 1", "Onsite Technical 2", "System Design", "Culture Interview"],
    topTopics: ["System Design", "Distributed Systems", "Trees & Graphs", "Dynamic Programming", "Streaming Algorithms", "Caching"],
    systemDesignTopics: ["Design Netflix", "Design a CDN", "Design Video Recommendation System", "Design a Streaming Platform", "Design Content Delivery Pipeline"],
    tips: ["Netflix values senior-level thinking and autonomy", "Culture memo is a MUST read", "System Design is heavily weighted", "Expect deep dives into distributed systems"]
  },
  "Uber": {
    logo: "🚗",
    color: "#000000",
    difficulty: "Hard",
    focusAreas: ["Data Structures & Algorithms", "System Design", "Behavioral"],
    dsa_weight: 0.4,
    system_design_weight: 0.35,
    behavioral_weight: 0.25,
    interviewRounds: ["Phone Screen", "Coding Round 1", "Coding Round 2", "System Design", "Behavioral"],
    topTopics: ["Arrays & Strings", "Graphs (Shortest Path)", "Dynamic Programming", "Trees", "Heaps & Priority Queues", "Intervals"],
    systemDesignTopics: ["Design Uber", "Design Uber Eats", "Design a Ride Matching System", "Design Surge Pricing", "Design Real-Time Location Tracking"],
    tips: ["Uber loves graph and geo-spatial problems", "Practice Dijkstra's and A* algorithms", "System Design should address real-time requirements", "Know Uber's core technology stack"]
  },
  "Stripe": {
    logo: "💳",
    color: "#635BFF",
    difficulty: "Hard",
    focusAreas: ["Coding (Practical)", "System Design", "API Design"],
    dsa_weight: 0.4,
    system_design_weight: 0.35,
    behavioral_weight: 0.25,
    interviewRounds: ["Phone Screen (Coding)", "Onsite Coding 1", "Onsite Coding 2", "System Design", "Manager/Culture"],
    topTopics: ["Practical Coding (Build features)", "API Design", "String Processing", "State Machines", "Error Handling", "Testing"],
    systemDesignTopics: ["Design a Payment System", "Design Stripe API", "Design an Idempotent Payment Gateway", "Design Fraud Detection", "Design a Billing System"],
    tips: ["Stripe focuses on practical, real-world coding", "Questions involve building actual features, not puzzles", "Clean code, error handling, and edge cases matter a LOT", "Understand payment processing and financial systems"]
  },
  "Goldman Sachs": {
    logo: "🏦",
    color: "#7399C6",
    difficulty: "Hard",
    focusAreas: ["Data Structures & Algorithms", "OOP Design", "Problem Solving"],
    dsa_weight: 0.45,
    system_design_weight: 0.25,
    behavioral_weight: 0.3,
    interviewRounds: ["HackerRank Assessment", "First Round (Technical)", "Superday (Multiple Rounds)", "Hiring Manager"],
    topTopics: ["Arrays & Strings", "Trees & Graphs", "OOP Concepts", "Multithreading", "Database/SQL", "Math & Probability"],
    systemDesignTopics: ["Design a Trading Platform", "Design Order Management System", "Design Real-time Market Data Feed", "Design Risk Assessment System"],
    tips: ["Strong focus on OOP and Java fundamentals", "Expect SQL and database questions", "HackerRank OA is the first filter", "Superday has 3-5 back-to-back interviews"]
  },
  "Flipkart": {
    logo: "🛒",
    color: "#2874F0",
    difficulty: "Hard",
    focusAreas: ["Data Structures & Algorithms", "Machine Coding", "System Design"],
    dsa_weight: 0.35,
    system_design_weight: 0.35,
    behavioral_weight: 0.3,
    interviewRounds: ["Online Coding Test", "Machine Coding Round", "Problem Solving Round", "System Design", "Hiring Manager"],
    topTopics: ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming", "Low Level Design", "Machine Coding", "OOP Patterns"],
    systemDesignTopics: ["Design Flipkart", "Design an E-commerce Cart", "Design Search Autocomplete", "Design Inventory Management", "Design Payment Gateway"],
    tips: ["Machine coding round is unique — practice building mini projects in 90 mins", "LLD (Low Level Design) is heavily tested", "Practice design patterns: Observer, Strategy, Factory", "System Design should handle India-scale traffic"]
  },
  "PhonePe": {
    logo: "📱",
    color: "#5F259F",
    difficulty: "Hard",
    focusAreas: ["Data Structures & Algorithms", "Low Level Design", "System Design"],
    dsa_weight: 0.35,
    system_design_weight: 0.35,
    behavioral_weight: 0.3,
    interviewRounds: ["Online Assessment", "DSA Round", "Machine Coding / LLD", "System Design", "Hiring Manager"],
    topTopics: ["Arrays", "Trees", "Graphs", "Dynamic Programming", "Design Patterns", "Concurrency"],
    systemDesignTopics: ["Design UPI Payment System", "Design a Wallet System", "Design Transaction Processing", "Design Notification Service"],
    tips: ["Strong focus on LLD and clean code", "Understand fintech domain basics", "Practice machine coding rounds (build in 90 mins)", "Java is the primary language"]
  },
  "Swiggy": {
    logo: "🍔",
    color: "#FC8019",
    difficulty: "Medium-Hard",
    focusAreas: ["Data Structures & Algorithms", "System Design", "Machine Coding"],
    dsa_weight: 0.35,
    system_design_weight: 0.35,
    behavioral_weight: 0.3,
    interviewRounds: ["Online Assessment", "DSA Round", "Machine Coding", "System Design", "Cultural Fit"],
    topTopics: ["Arrays & Hashing", "Graphs", "Dynamic Programming", "Trees", "Greedy", "Sorting"],
    systemDesignTopics: ["Design Swiggy", "Design a Food Delivery System", "Design Real-time Order Tracking", "Design Restaurant Search", "Design Delivery Assignment"],
    tips: ["Machine coding round is important", "Understand logistics and real-time systems", "Practice building extensible LLD solutions", "System Design should handle delivery optimization"]
  },
  "Atlassian": {
    logo: "🔷",
    color: "#0052CC",
    difficulty: "Hard",
    focusAreas: ["Data Structures & Algorithms", "System Design", "Values-based Behavioral"],
    dsa_weight: 0.35,
    system_design_weight: 0.35,
    behavioral_weight: 0.3,
    interviewRounds: ["Phone Screen (Coding)", "Values Interview", "Technical Round 1", "System Design", "Hiring Manager"],
    topTopics: ["Arrays & Strings", "Trees & Graphs", "Stack & Queue", "Dynamic Programming", "BFS/DFS", "Design Patterns"],
    systemDesignTopics: ["Design Jira", "Design Confluence", "Design a Ticket Management System", "Design Real-time Collaboration", "Design Notifications at Scale"],
    tips: ["Atlassian values interview is CRITICAL — prepare with STAR format", "Study their 5 core values deeply", "System Design should emphasize collaboration features", "Code quality and communication matter as much as the solution"]
  },
  "Paytm": {
    logo: "💰",
    color: "#00BAF2",
    difficulty: "Medium-Hard",
    focusAreas: ["Data Structures & Algorithms", "System Design", "Problem Solving"],
    dsa_weight: 0.4,
    system_design_weight: 0.3,
    behavioral_weight: 0.3,
    interviewRounds: ["Online Assessment", "Technical Round 1", "Technical Round 2", "System Design / HM"],
    topTopics: ["Arrays", "Strings", "Trees", "Dynamic Programming", "Stack & Queue", "Linked Lists"],
    systemDesignTopics: ["Design a Digital Wallet", "Design QR Payment System", "Design Transaction Ledger", "Design Notification Service"],
    tips: ["Focus on DSA fundamentals and problem-solving speed", "Understand payment and fintech basics", "Practice coding in Java or C++", "System Design for scale is important at senior levels"]
  },
  "TCS": {
    logo: "🏢",
    color: "#1A1A6C",
    difficulty: "Medium",
    focusAreas: ["Aptitude", "Programming Basics", "Communication"],
    dsa_weight: 0.3,
    system_design_weight: 0.1,
    behavioral_weight: 0.6,
    interviewRounds: ["TCS NQT (National Qualifier Test)", "Technical Interview", "Managerial Round", "HR Round"],
    topTopics: ["Basic DSA", "OOP Concepts", "DBMS", "OS Basics", "Networking Basics", "Aptitude & Reasoning"],
    systemDesignTopics: ["Basic HLD concepts", "Client-Server Architecture", "Database Design Basics"],
    tips: ["TCS NQT tests aptitude, coding, and verbal ability", "Focus on core CS subjects: OS, DBMS, Networking", "Communication skills are heavily evaluated", "Practice basic coding problems (Easy-Medium)"]
  },
  "Infosys": {
    logo: "🏢",
    color: "#007CC3",
    difficulty: "Medium",
    focusAreas: ["Aptitude", "Programming Basics", "Soft Skills"],
    dsa_weight: 0.3,
    system_design_weight: 0.1,
    behavioral_weight: 0.6,
    interviewRounds: ["InfyTQ / Online Test", "Technical Interview", "HR Round"],
    topTopics: ["Basic Programming", "OOP Concepts", "DBMS", "OS Basics", "Puzzles & Aptitude", "SQL"],
    systemDesignTopics: ["Basic Architecture", "Web Application Flow"],
    tips: ["InfyTQ certification can fast-track your application", "Focus on coding basics and CS fundamentals", "Prepare for HR questions about Infosys values", "Practice aptitude and logical reasoning"]
  },
  "Wipro": {
    logo: "🏢",
    color: "#431D7F",
    difficulty: "Medium",
    focusAreas: ["Aptitude", "Programming Basics", "Communication"],
    dsa_weight: 0.3,
    system_design_weight: 0.1,
    behavioral_weight: 0.6,
    interviewRounds: ["Online Assessment (AMCAT/Elite)", "Technical Interview", "HR Round"],
    topTopics: ["Basic DSA", "OOP Concepts", "DBMS Basics", "Aptitude", "English Communication", "Basic Coding"],
    systemDesignTopics: ["Client-Server Basics", "Web App Architecture"],
    tips: ["Wipro uses AMCAT for assessment — practice on that platform", "Focus on communication and soft skills", "Basic DSA and CS fundamentals are sufficient", "Prepare for situational HR questions"]
  },
  "Zerodha": {
    logo: "📈",
    color: "#387ED1",
    difficulty: "Hard",
    focusAreas: ["Systems Programming", "System Design", "Problem Solving"],
    dsa_weight: 0.35,
    system_design_weight: 0.4,
    behavioral_weight: 0.25,
    interviewRounds: ["Take Home Assignment", "Technical Discussion", "System Design", "Culture Fit"],
    topTopics: ["Concurrency", "Low-Latency Systems", "Data Structures", "Networking", "Go/Python/Elixir", "Database Internals"],
    systemDesignTopics: ["Design a Stock Trading Platform", "Design Order Matching Engine", "Design Real-time Market Data", "Design a Brokerage System"],
    tips: ["Zerodha values deep technical understanding over leetcode", "Take-home assignment tests real-world coding", "Understand low-latency and high-throughput systems", "Go, Python, or Elixir experience is a plus"]
  },
  "Razorpay": {
    logo: "💳",
    color: "#072654",
    difficulty: "Hard",
    focusAreas: ["Data Structures & Algorithms", "System Design", "Machine Coding"],
    dsa_weight: 0.35,
    system_design_weight: 0.35,
    behavioral_weight: 0.3,
    interviewRounds: ["Online Assessment", "DSA Round", "Machine Coding / LLD", "System Design", "Hiring Manager"],
    topTopics: ["Arrays", "Trees", "Graphs", "Dynamic Programming", "Design Patterns", "API Design"],
    systemDesignTopics: ["Design a Payment Gateway", "Design Subscription Billing", "Design Accounting Ledger", "Design Webhook Delivery System"],
    tips: ["Machine coding is heavily weighted", "Understand payment processing flows", "Practice building clean, extensible LLD", "System Design should handle financial consistency"]
  },
  "CRED": {
    logo: "💎",
    color: "#1A1A1A",
    difficulty: "Hard",
    focusAreas: ["Data Structures & Algorithms", "Low Level Design", "System Design"],
    dsa_weight: 0.35,
    system_design_weight: 0.35,
    behavioral_weight: 0.3,
    interviewRounds: ["Online Assessment", "DSA Round", "Machine Coding", "System Design", "Founder/Culture Round"],
    topTopics: ["Arrays & Hashing", "Trees & Graphs", "Dynamic Programming", "Design Patterns", "OOP", "Clean Code"],
    systemDesignTopics: ["Design a Credit Score System", "Design Rewards Engine", "Design Bill Payment System", "Design Notification Platform"],
    tips: ["CRED values craft and clean code above all", "Machine coding round expects production-quality code", "Design patterns knowledge is essential", "Culture fit with 'craftsmanship' mindset matters"]
  }
};

// Role-specific configurations
export const roleConfigs = {
  "Software Engineer": {
    alias: "SDE",
    levels: ["Intern", "SDE-1 / Junior", "SDE-2 / Mid", "SDE-3 / Senior", "Staff / Principal"],
    dsaFocus: true,
    systemDesignFocus: "mid-senior",
    keySkills: ["Problem Solving", "Data Structures", "Algorithms", "System Design", "Code Quality"],
    preparationPhases: ["DSA Foundation", "Pattern Recognition", "System Design", "Mock Interviews"]
  },
  "Frontend Engineer": {
    alias: "FE",
    levels: ["Intern", "FE-1", "FE-2", "Senior FE", "Staff FE"],
    dsaFocus: true,
    systemDesignFocus: "mid-senior",
    keySkills: ["JavaScript/TypeScript", "React/Angular/Vue", "CSS/HTML", "Web Performance", "Accessibility"],
    preparationPhases: ["JS Fundamentals", "Frontend DSA", "UI System Design", "Machine Coding"]
  },
  "Backend Engineer": {
    alias: "BE",
    levels: ["Intern", "BE-1", "BE-2", "Senior BE", "Staff BE"],
    dsaFocus: true,
    systemDesignFocus: "mid-senior",
    keySkills: ["APIs", "Databases", "Distributed Systems", "Caching", "Message Queues"],
    preparationPhases: ["DSA + DB Fundamentals", "API Design", "System Design", "Scalability Deep-Dive"]
  },
  "Full Stack Engineer": {
    alias: "FSE",
    levels: ["Intern", "FSE-1", "FSE-2", "Senior FSE"],
    dsaFocus: true,
    systemDesignFocus: "mid-senior",
    keySkills: ["Frontend + Backend", "Databases", "DevOps Basics", "Full Product Thinking"],
    preparationPhases: ["DSA Foundation", "Frontend + Backend Skills", "System Design", "End-to-end Projects"]
  },
  "Data Scientist": {
    alias: "DS",
    levels: ["Intern", "DS-1", "DS-2", "Senior DS", "Lead DS"],
    dsaFocus: false,
    systemDesignFocus: "senior",
    keySkills: ["Statistics", "Machine Learning", "Python", "SQL", "Data Visualization"],
    preparationPhases: ["Math & Stats", "ML Algorithms", "Case Studies", "Presentation Skills"]
  },
  "Data Analyst": {
    alias: "DA",
    levels: ["Intern", "DA-1", "DA-2", "Senior DA"],
    dsaFocus: false,
    systemDesignFocus: null,
    keySkills: ["SQL", "Excel", "Tableau/PowerBI", "Statistics", "Business Acumen"],
    preparationPhases: ["SQL Mastery", "Stats & Probability", "Case Studies", "Dashboard Projects"]
  },
  "DevOps Engineer": {
    alias: "DevOps",
    levels: ["Junior", "Mid", "Senior", "Staff/Principal"],
    dsaFocus: false,
    systemDesignFocus: "always",
    keySkills: ["Linux", "Docker", "Kubernetes", "CI/CD", "Cloud (AWS/GCP/Azure)", "Terraform"],
    preparationPhases: ["Linux & Scripting", "Containers & Orchestration", "Cloud Architecture", "Incident Response"]
  },
  "Product Manager": {
    alias: "PM",
    levels: ["APM", "PM", "Senior PM", "Director"],
    dsaFocus: false,
    systemDesignFocus: null,
    keySkills: ["Product Sense", "Analytical Thinking", "Execution", "Strategy", "Leadership"],
    preparationPhases: ["Product Sense", "Analytical Skills", "Execution Cases", "Leadership Stories"]
  },
  "Machine Learning Engineer": {
    alias: "MLE",
    levels: ["Intern", "MLE-1", "MLE-2", "Senior MLE", "Staff MLE"],
    dsaFocus: true,
    systemDesignFocus: "mid-senior",
    keySkills: ["ML Algorithms", "Deep Learning", "MLOps", "Python", "Math"],
    preparationPhases: ["DSA + Math", "ML Theory", "ML System Design", "Paper Discussions"]
  },
  "QA Engineer": {
    alias: "QA",
    levels: ["Junior", "Mid", "Senior", "Lead"],
    dsaFocus: false,
    systemDesignFocus: null,
    keySkills: ["Test Automation", "Selenium/Playwright", "API Testing", "CI/CD", "Performance Testing"],
    preparationPhases: ["Testing Fundamentals", "Automation Frameworks", "API & Perf Testing", "CI/CD Integration"]
  }
};

// DSA topic pools with specific problems
const dsaTopicPool = {
  "Arrays & Strings": {
    icon: "📊",
    easy: ["Two Sum", "Best Time to Buy and Sell Stock", "Valid Anagram", "Contains Duplicate", "Maximum Subarray"],
    medium: ["3Sum", "Container With Most Water", "Product of Array Except Self", "Group Anagrams", "Longest Substring Without Repeating Characters"],
    hard: ["Trapping Rain Water", "Minimum Window Substring", "Sliding Window Maximum", "First Missing Positive"]
  },
  "Trees & Graphs": {
    icon: "🌳",
    easy: ["Maximum Depth of Binary Tree", "Same Tree", "Invert Binary Tree", "Symmetric Tree"],
    medium: ["Number of Islands", "Course Schedule", "Binary Tree Level Order Traversal", "Validate BST", "Kth Smallest Element in a BST"],
    hard: ["Word Ladder", "Serialize and Deserialize Binary Tree", "Binary Tree Maximum Path Sum", "Alien Dictionary"]
  },
  "Dynamic Programming": {
    icon: "🧩",
    easy: ["Climbing Stairs", "House Robber", "Maximum Subarray"],
    medium: ["Coin Change", "Longest Increasing Subsequence", "Word Break", "Unique Paths", "Decode Ways"],
    hard: ["Edit Distance", "Regular Expression Matching", "Burst Balloons", "Longest Valid Parentheses"]
  },
  "Linked Lists": {
    icon: "🔗",
    easy: ["Reverse Linked List", "Merge Two Sorted Lists", "Linked List Cycle"],
    medium: ["Add Two Numbers", "Remove Nth Node From End", "Reorder List", "Copy List with Random Pointer"],
    hard: ["Merge K Sorted Lists", "Reverse Nodes in k-Group"]
  },
  "Binary Search": {
    icon: "🔍",
    easy: ["Binary Search", "First Bad Version", "Search Insert Position"],
    medium: ["Search in Rotated Sorted Array", "Find Minimum in Rotated Sorted Array", "Koko Eating Bananas", "Time Based Key-Value Store"],
    hard: ["Median of Two Sorted Arrays", "Split Array Largest Sum"]
  },
  "Stack & Queue": {
    icon: "📚",
    easy: ["Valid Parentheses", "Min Stack", "Implement Queue using Stacks"],
    medium: ["Daily Temperatures", "Evaluate Reverse Polish Notation", "Generate Parentheses", "Decode String"],
    hard: ["Largest Rectangle in Histogram", "Sliding Window Maximum"]
  },
  "Heaps & Priority Queues": {
    icon: "⛰️",
    easy: ["Kth Largest Element in a Stream", "Last Stone Weight"],
    medium: ["Top K Frequent Elements", "Kth Largest Element in an Array", "Task Scheduler", "Find Median from Data Stream"],
    hard: ["Merge K Sorted Lists", "Smallest Range Covering Elements"]
  },
  "Greedy Algorithms": {
    icon: "🎯",
    easy: ["Assign Cookies", "Lemonade Change"],
    medium: ["Jump Game", "Gas Station", "Partition Labels", "Task Scheduler"],
    hard: ["Candy", "IPO", "Minimum Number of Arrows"]
  },
  "Recursion & Backtracking": {
    icon: "🔄",
    easy: ["Power of Three", "Fibonacci Number"],
    medium: ["Subsets", "Permutations", "Combination Sum", "Letter Combinations of a Phone Number", "Word Search"],
    hard: ["N-Queens", "Sudoku Solver", "Regular Expression Matching"]
  },
  "BFS/DFS": {
    icon: "🗺️",
    easy: ["Flood Fill", "Max Area of Island"],
    medium: ["Number of Islands", "Rotting Oranges", "Pacific Atlantic Water Flow", "Clone Graph"],
    hard: ["Word Ladder", "Shortest Path in Binary Matrix", "Alien Dictionary"]
  }
};

// System Design topics
const systemDesignPool = {
  basics: [
    { title: "Scalability Concepts", topics: ["Horizontal vs Vertical Scaling", "Load Balancing", "CDN", "Caching Strategies"] },
    { title: "Database Design", topics: ["SQL vs NoSQL", "Sharding", "Replication", "CAP Theorem"] },
    { title: "Communication Protocols", topics: ["REST vs gRPC", "WebSockets", "Long Polling", "Message Queues"] },
    { title: "Core Components", topics: ["Rate Limiter", "Consistent Hashing", "Bloom Filters", "API Gateway"] }
  ],
  advanced: [
    { title: "Distributed Systems", topics: ["Consensus Algorithms (Raft/Paxos)", "Event Sourcing", "CQRS", "Saga Pattern"] },
    { title: "Data Processing", topics: ["Stream Processing (Kafka)", "Batch Processing", "Lambda Architecture", "Data Lakes vs Warehouses"] },
    { title: "Reliability", topics: ["Circuit Breakers", "Retry Strategies", "Health Checks", "Chaos Engineering"] }
  ]
};

// Behavioral preparation
const behavioralPool = {
  general: [
    "Tell me about yourself",
    "Why this company?",
    "Tell me about a challenging project",
    "Describe a conflict with a teammate",
    "Tell me about a time you failed",
    "How do you prioritize tasks?",
    "Describe a time you went above and beyond",
    "Tell me about a time you had to learn something quickly"
  ],
  amazon_lp: [
    "Customer Obsession — Tell me about a time you put the customer first",
    "Ownership — Describe a time you took ownership beyond your scope",
    "Invent and Simplify — Tell me about an innovative solution you created",
    "Are Right, A Lot — Describe a tough decision you made",
    "Learn and Be Curious — What's the latest thing you learned?",
    "Hire and Develop the Best — How have you mentored someone?",
    "Insist on the Highest Standards — When did you raise the bar?",
    "Think Big — Describe a bold idea you proposed",
    "Bias for Action — When did you act without full information?",
    "Deliver Results — Tell me about a deadline you had to meet"
  ],
  google_values: [
    "Googleyness — How do you handle ambiguity?",
    "Collaboration — Describe working with a difficult teammate",
    "Leadership — When did you lead without authority?",
    "Impact — What's the most impactful thing you've done?",
    "Innovation — Describe a creative solution you built"
  ]
};

// ──────────────────────────── ROLE-SPECIFIC PREPARATION CONTENT ────────────────────────────

const roleSpecificContent = {
  "Software Engineer": {
    phaseNames: {
      sprint: ["DSA Intensive Sprint", "System Design + Behavioral Blitz"],
      accelerated: ["Core DSA Patterns", "Advanced DSA + System Design", "Mock Interviews & Revision"],
      standard: ["DSA Foundations & Patterns", "Advanced Problem Solving", "System Design Deep Dive", "Mock Interviews & Final Prep"],
      extended: ["Language & DSA Foundations", "Core DSA Patterns Mastery", "Company-Tagged Hard Problems", "System Design Mastery", "Behavioral & Soft Skills", "Full Mock Interviews & Revision"]
    },
    phases: [
      {
        key: "dsa_foundation",
        type: "study",
        icon: "📖",
        description: (c) => `Build your DSA foundation with patterns most asked at ${c.logo}. Master arrays, strings, hashmaps, and two-pointer techniques.`,
        tasks: (c, intensity) => {
          const topics = c.topTopics || ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming"];
          const count = intensity === "sprint" ? 3 : intensity === "accelerated" ? 4 : 6;
          const tasks = [];
          topics.slice(0, count).forEach(topic => {
            const pool = dsaTopicPool[topic] || dsaTopicPool["Arrays & Strings"];
            tasks.push({
              category: "Study", title: `Master ${topic}`,
              items: [...(pool.easy?.slice(0, 2) || []), ...(pool.medium?.slice(0, 3) || [])],
              tag: "DSA", difficulty: "Mixed"
            });
          });
          tasks.push({
            category: "Practice", title: `${c.logo} Company-Tagged Problems`,
            items: [`Solve ${intensity === "sprint" ? "5" : "10"}+ company-tagged problems on LeetCode`, "Focus on medium difficulty", "Track time per problem (target < 25 min)"],
            tag: "Coding", difficulty: "Medium"
          });
          return tasks;
        }
      },
      {
        key: "dsa_advanced",
        type: "practice",
        icon: "💻",
        description: (c) => `Tackle hard DSA problems tagged for ${c.logo}. Focus on pattern recognition and writing optimal solutions under time pressure.`,
        tasks: (c, intensity) => {
          const topics = (c.topTopics || ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming"]).slice(0, 4);
          const tasks = [];
          topics.forEach(topic => {
            const pool = dsaTopicPool[topic] || dsaTopicPool["Arrays & Strings"];
            tasks.push({
              category: "Practice", title: `${topic} — Hard Problems`,
              items: [...(pool.medium?.slice(2, 5) || []), ...(pool.hard?.slice(0, 2) || [])],
              tag: "DSA", difficulty: "Hard"
            });
          });
          tasks.push({
            category: "Timed Practice", title: "Simulated Coding Rounds",
            items: ["Set 45-minute timer per problem", "Practice explaining approach out loud", "Write clean code first, then optimize", "Analyze time/space complexity after each solution"],
            tag: "Interview Prep", difficulty: "Medium-Hard"
          });
          return tasks;
        }
      },
      {
        key: "system_design",
        type: "study",
        icon: "🏗️",
        description: (c) => `Learn system design principles needed for ${c.logo}. Practice designing systems like ${c.systemDesignTopics?.[0] || 'real-world products'}.`,
        tasks: (c, intensity) => {
          const tasks = [];
          systemDesignPool.basics.forEach(topic => {
            tasks.push({ category: "Study", title: topic.title, items: topic.topics, tag: "System Design", difficulty: "Conceptual" });
          });
          if (intensity === "extended" || intensity === "standard") {
            systemDesignPool.advanced.forEach(topic => {
              tasks.push({ category: "Deep Dive", title: topic.title, items: topic.topics, tag: "System Design", difficulty: "Advanced" });
            });
          }
          const sdTopics = c.systemDesignTopics?.slice(0, 3) || [];
          if (sdTopics.length > 0) {
            tasks.push({ category: "Practice", title: `${c.logo} System Design Practice`, items: sdTopics.map(t => `Practice: ${t}`), tag: "System Design", difficulty: "Hard" });
          }
          return tasks;
        }
      },
      {
        key: "final_prep",
        type: "prepare",
        icon: "🎯",
        description: () => `Simulate real interview conditions. Mock interviews, revision, and confidence building.`,
        tasks: (c) => getCommonPrepTasks(c, "Software Engineer")
      }
    ]
  },

  "Frontend Engineer": {
    phaseNames: {
      sprint: ["JavaScript Core + DOM Coding", "Frontend System Design + Behavioral"],
      accelerated: ["JavaScript & Browser Internals", "React/Framework Deep Dive + Machine Coding", "Frontend Mocks & Revision"],
      standard: ["JavaScript Mastery & DSA Lite", "React/Framework Deep Dive", "Frontend System Design & Machine Coding", "Mock Interviews & Final Prep"],
      extended: ["JavaScript Fundamentals Deep Dive", "CSS Mastery & Web APIs", "React Internals & State Management", "Frontend DSA & Problem Solving", "Frontend System Design", "Machine Coding Mocks & Final Prep"]
    },
    phases: [
      {
        key: "js_fundamentals",
        type: "study",
        icon: "📖",
        description: (c) => `Master JavaScript internals that ${c.logo} frontend interviews heavily test. Closures, prototypes, event loop, and async patterns.`,
        tasks: (c) => [
          { category: "Study", title: "JavaScript Core Concepts", items: ["Closures & Lexical Scope", "Prototypal Inheritance & Classes", "this keyword & binding rules", "'use strict' behavior", "Hoisting (var vs let vs const)"], tag: "JavaScript", difficulty: "Must-Know" },
          { category: "Study", title: "Async JavaScript Mastery", items: ["Event Loop & Microtask Queue", "Promises — chaining, error handling, Promise.all/race/allSettled", "async/await patterns", "setTimeout/setInterval gotchas", "AbortController for fetch cancellation"], tag: "JavaScript", difficulty: "Medium" },
          { category: "Practice", title: "Implement JS Polyfills", items: ["Implement Array.prototype.map from scratch", "Implement Promise.all from scratch", "Implement Function.prototype.bind", "Implement debounce and throttle", "Implement deep clone / deep equal"], tag: "Coding", difficulty: "Medium-Hard" },
          { category: "Study", title: "DOM & Browser APIs", items: ["Event delegation & bubbling/capturing", "IntersectionObserver & MutationObserver", "localStorage / sessionStorage / IndexedDB", "Web Workers & Service Workers basics", "requestAnimationFrame for animations"], tag: "Browser", difficulty: "Medium" }
        ]
      },
      {
        key: "css_and_react",
        type: "study",
        icon: "🎨",
        description: (c) => `Deep dive into CSS architecture and React internals — the core skills ${c.logo} evaluates for frontend roles.`,
        tasks: (c) => [
          { category: "Study", title: "CSS Architecture & Layout", items: ["Flexbox vs Grid — when to use which", "CSS Specificity & Cascade rules", "CSS Variables & theming patterns", "Responsive design with media queries & container queries", "CSS animations & transitions performance"], tag: "CSS", difficulty: "Medium" },
          { category: "Study", title: "React Deep Dive", items: ["Virtual DOM & reconciliation algorithm", "Hooks internals — useState, useEffect, useRef, useMemo, useCallback", "React Fiber architecture basics", "Error Boundaries & Suspense", "React 18+ features: Transitions, useDeferredValue"], tag: "React", difficulty: "Hard" },
          { category: "Study", title: "State Management & Data Fetching", items: ["Context API vs external stores (Zustand/Redux)", "React Query / SWR for server state", "Optimistic updates pattern", "State normalization techniques"], tag: "React", difficulty: "Medium" },
          { category: "Practice", title: "Build These Components from Scratch", items: ["Build an autocomplete/typeahead component", "Build an infinite scroll list", "Build a modal/dialog with focus trap", "Build a drag-and-drop sortable list", "Build a virtualized long list (windowing)"], tag: "Machine Coding", difficulty: "Hard" }
        ]
      },
      {
        key: "frontend_system_design",
        type: "study",
        icon: "🏗️",
        description: (c) => `Frontend system design interviews at ${c.logo} test how you architect large-scale UI applications. Think performance, caching, and component architecture.`,
        tasks: (c) => [
          { category: "Study", title: "Frontend System Design Framework", items: ["Requirements gathering for UI systems", "Component architecture & data flow design", "API design for frontend (REST vs GraphQL)", "Client-side caching & state management strategy", "Performance budgets & optimization plan"], tag: "System Design", difficulty: "Conceptual" },
          { category: "Study", title: "Web Performance Optimization", items: ["Core Web Vitals (LCP, FID, CLS) — how to improve each", "Code splitting & lazy loading strategies", "Image optimization (WebP, srcset, lazy loading)", "Critical rendering path optimization", "Service Worker caching strategies"], tag: "Performance", difficulty: "Medium-Hard" },
          { category: "Practice", title: "Frontend System Design Problems", items: ["Design a News Feed (like Facebook/Twitter)", "Design Google Search Frontend", "Design a collaborative document editor (like Google Docs)", "Design an e-commerce product page with reviews", "Design a real-time chat application UI"], tag: "System Design", difficulty: "Hard" },
          { category: "Study", title: "Accessibility & Testing", items: ["ARIA roles and semantic HTML", "Keyboard navigation patterns", "Screen reader testing basics", "Unit testing with React Testing Library", "E2E testing with Playwright/Cypress"], tag: "Quality", difficulty: "Medium" }
        ]
      },
      {
        key: "final_prep",
        type: "prepare",
        icon: "🎯",
        description: () => `Final preparation — machine coding mocks, JavaScript trivia, and behavioral polish.`,
        tasks: (c) => [
          { category: "Machine Coding Mock", title: "Timed Machine Coding Rounds", items: ["Build a Star Rating component (30 min)", "Build a Todo app with filters (45 min)", "Build a Kanban board with drag-and-drop (60 min)", "Build a multi-step form with validation (45 min)"], tag: "Machine Coding", difficulty: "Realistic" },
          { category: "Revision", title: "JavaScript Trivia & Gotchas", items: ["typeof null, NaN comparisons, [] == false", "Event loop output prediction questions", "Closure-based interview tricky questions", "Promise chain output prediction"], tag: "Revision", difficulty: "Mixed" },
          ...getCommonPrepTasks(c, "Frontend Engineer")
        ]
      }
    ]
  },

  "Backend Engineer": {
    phaseNames: {
      sprint: ["DSA + Database Fundamentals Sprint", "System Design + API Design Blitz"],
      accelerated: ["DSA & Database Mastery", "API Design & Distributed Systems", "System Design Mocks & Behavioral"],
      standard: ["DSA Foundations + SQL Mastery", "API Design & Database Internals", "Distributed Systems & System Design", "Mock Interviews & Final Prep"],
      extended: ["Language & DSA Foundations", "Database Design & SQL Mastery", "API Architecture & Patterns", "Distributed Systems Deep Dive", "System Design Mastery", "Full Mock Interviews & Revision"]
    },
    phases: [
      {
        key: "dsa_and_db",
        type: "study",
        icon: "📖",
        description: (c) => `Backend interviews at ${c.logo} test DSA alongside database knowledge. Master both for strong foundations.`,
        tasks: (c) => {
          const topics = (c.topTopics || ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming"]).slice(0, 4);
          const tasks = [];
          topics.forEach(topic => {
            const pool = dsaTopicPool[topic] || dsaTopicPool["Arrays & Strings"];
            tasks.push({ category: "Study", title: `Master ${topic}`, items: [...(pool.easy?.slice(0, 2) || []), ...(pool.medium?.slice(0, 3) || [])], tag: "DSA", difficulty: "Mixed" });
          });
          tasks.push(
            { category: "Study", title: "SQL & Database Fundamentals", items: ["Complex JOINs (INNER, LEFT, RIGHT, FULL, CROSS)", "Window Functions (ROW_NUMBER, RANK, LEAD, LAG)", "Subqueries vs CTEs — when to use which", "Indexes — B-Tree, Hash, Composite, Covering", "EXPLAIN ANALYZE — reading query plans"], tag: "Database", difficulty: "Must-Know" },
            { category: "Practice", title: "SQL Problem Practice", items: ["Solve 20+ SQL problems on LeetCode/HackerRank", "Practice writing optimized queries", "Design normalized schemas for given scenarios", "Write migration scripts for schema changes"], tag: "SQL", difficulty: "Medium" }
          );
          return tasks;
        }
      },
      {
        key: "api_design",
        type: "study",
        icon: "🔌",
        description: (c) => `API design is critical for backend roles at ${c.logo}. Master REST, GraphQL, auth patterns, and error handling.`,
        tasks: () => [
          { category: "Study", title: "RESTful API Design", items: ["Resource naming conventions & URI structure", "HTTP methods semantics (idempotency)", "Status codes — 2xx, 3xx, 4xx, 5xx appropriate usage", "Pagination (cursor vs offset)", "Versioning strategies (URL, header, query)"], tag: "API Design", difficulty: "Must-Know" },
          { category: "Study", title: "Authentication & Security", items: ["JWT vs Session-based auth — tradeoffs", "OAuth 2.0 flows (Authorization Code, PKCE)", "API rate limiting (Token Bucket, Sliding Window)", "CORS — how it works and common issues", "Input validation & SQL injection prevention"], tag: "Security", difficulty: "Medium" },
          { category: "Study", title: "Database Internals", items: ["ACID properties — what each guarantees", "Transaction isolation levels (Read Committed, Serializable, etc.)", "Optimistic vs Pessimistic locking", "Database replication (sync, async, semi-sync)", "Sharding strategies (hash, range, geo)"], tag: "Database", difficulty: "Hard" },
          { category: "Practice", title: "Design These APIs", items: ["Design a REST API for a social media platform", "Design an API for an e-commerce checkout flow", "Design a WebSocket API for real-time notifications", "Implement rate limiting middleware from scratch"], tag: "API Design", difficulty: "Medium-Hard" }
        ]
      },
      {
        key: "system_design",
        type: "study",
        icon: "🏗️",
        description: (c) => `System design for backend roles at ${c.logo} — distributed systems, caching, message queues, and scalability.`,
        tasks: (c) => {
          const tasks = [];
          tasks.push(
            { category: "Study", title: "Distributed Systems Fundamentals", items: ["CAP Theorem & PACELC — real-world tradeoffs", "Consistent Hashing — how it works and when to use", "Leader Election algorithms (Raft basics)", "Distributed transactions (2PC, Saga pattern)", "Idempotency design for distributed systems"], tag: "System Design", difficulty: "Hard" },
            { category: "Study", title: "Caching & Message Queues", items: ["Redis — data structures, eviction policies, persistence", "Cache invalidation strategies (TTL, write-through, write-back)", "Kafka — topics, partitions, consumer groups", "RabbitMQ vs Kafka — when to use which", "Dead letter queues & retry mechanisms"], tag: "Infrastructure", difficulty: "Medium-Hard" },
            { category: "Study", title: "Scalability Patterns", items: ["Load Balancing (L4 vs L7, algorithms)", "Horizontal scaling & stateless services", "Database read replicas & write splitting", "CDN for static content delivery", "Circuit Breaker pattern for resilience"], tag: "System Design", difficulty: "Medium" }
          );
          const sdTopics = c.systemDesignTopics?.slice(0, 4) || [];
          if (sdTopics.length > 0) {
            tasks.push({ category: "Practice", title: `${c.logo} System Design Practice`, items: sdTopics.map(t => `Design: ${t} (45 min whiteboard)`), tag: "System Design", difficulty: "Hard" });
          }
          return tasks;
        }
      },
      {
        key: "final_prep",
        type: "prepare",
        icon: "🎯",
        description: () => `Final preparation — system design mocks, code review practice, and behavioral rounds.`,
        tasks: (c) => [
          { category: "Mock Interview", title: "Backend-Specific Mocks", items: ["Live code a REST API endpoint from scratch (45 min)", "System design mock — distributed file storage", "Debug a production outage scenario", "Code review exercise — find bugs in given code"], tag: "Interview Prep", difficulty: "Realistic" },
          ...getCommonPrepTasks(c, "Backend Engineer")
        ]
      }
    ]
  },

  "Full Stack Engineer": {
    phaseNames: {
      sprint: ["Full Stack DSA + Core Skills", "System Design + E2E Project Sprint"],
      accelerated: ["DSA + Frontend/Backend Foundations", "Full Stack System Design & Projects", "Mock Interviews & Behavioral"],
      standard: ["DSA & Core Fundamentals", "Frontend + Backend Deep Dive", "Full Stack System Design", "Mock Interviews & Final Prep"],
      extended: ["DSA Foundations", "Frontend Mastery (JS/React)", "Backend Mastery (APIs/DB)", "Full Stack Architecture & DevOps", "System Design & Integration", "Mock Interviews & Revision"]
    },
    phases: [
      {
        key: "dsa_foundation",
        type: "study",
        icon: "📖",
        description: (c) => `Full stack interviews at ${c.logo} test DSA alongside practical coding. Build strong problem-solving foundations.`,
        tasks: (c) => {
          const topics = (c.topTopics || ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming"]).slice(0, 4);
          const tasks = [];
          topics.forEach(topic => {
            const pool = dsaTopicPool[topic] || dsaTopicPool["Arrays & Strings"];
            tasks.push({ category: "Study", title: `Master ${topic}`, items: [...(pool.easy?.slice(0, 2) || []), ...(pool.medium?.slice(0, 2) || [])], tag: "DSA", difficulty: "Mixed" });
          });
          return tasks;
        }
      },
      {
        key: "fullstack_skills",
        type: "study",
        icon: "⚡",
        description: (c) => `Master both frontend and backend fundamentals — the core expectation for full stack roles at ${c.logo}.`,
        tasks: () => [
          { category: "Study", title: "Frontend Essentials", items: ["React Hooks — useState, useEffect, useContext, useMemo", "Component design patterns (Compound, Render Props)", "Client-side routing & code splitting", "Form handling & validation patterns", "CSS-in-JS or Tailwind for rapid styling"], tag: "Frontend", difficulty: "Medium" },
          { category: "Study", title: "Backend Essentials", items: ["REST API design with Express/Fastify", "Database modeling & migrations (SQL)", "Authentication (JWT + refresh tokens)", "File uploads & streaming responses", "Error handling middleware patterns"], tag: "Backend", difficulty: "Medium" },
          { category: "Study", title: "DevOps & Deployment", items: ["Docker basics — Dockerfile, docker-compose", "CI/CD pipeline with GitHub Actions", "Environment variables & secrets management", "Vercel/Railway/Render deployment strategies", "Basic monitoring & logging setup"], tag: "DevOps", difficulty: "Medium" },
          { category: "Practice", title: "Build End-to-End Projects", items: ["Build a full-stack CRUD app with auth (2 hours)", "Build a real-time chat feature with WebSockets", "Build a file upload system with progress bar", "Implement server-side pagination with filters"], tag: "Projects", difficulty: "Medium-Hard" }
        ]
      },
      {
        key: "system_design",
        type: "study",
        icon: "🏗️",
        description: (c) => `Full stack system design at ${c.logo} — think end-to-end from the database to the browser.`,
        tasks: (c) => [
          { category: "Study", title: "Full Stack Architecture Patterns", items: ["Monolith vs Microservices — tradeoffs for startups vs scale", "BFF (Backend For Frontend) pattern", "Server-Side Rendering vs Client-Side Rendering vs Static Generation", "API Gateway & reverse proxy patterns", "WebSocket vs SSE vs Long Polling for real-time features"], tag: "Architecture", difficulty: "Medium-Hard" },
          { category: "Practice", title: "Full Stack System Design Problems", items: [`Design ${c.systemDesignTopics?.[0] || 'a social media platform'} — end to end`, "Design a collaborative notes app (like Notion)", "Design a URL shortener with analytics dashboard", "Design an e-commerce platform with payments"], tag: "System Design", difficulty: "Hard" }
        ]
      },
      {
        key: "final_prep",
        type: "prepare",
        icon: "🎯",
        description: () => `Final prep — full stack mocks, live coding, and behavioral rounds.`,
        tasks: (c) => [
          { category: "Mock", title: "Full Stack Mock Interviews", items: ["Live-code a feature: API + frontend in 60 min", "System design: Design a dashboard with real-time data", "Debug a full stack app with broken auth flow", "Take-home challenge practice: Build a mini app in 4 hours"], tag: "Interview Prep", difficulty: "Realistic" },
          ...getCommonPrepTasks(c, "Full Stack Engineer")
        ]
      }
    ]
  },

  "Data Scientist": {
    phaseNames: {
      sprint: ["Statistics & ML Foundations Sprint", "Case Studies + Behavioral Blitz"],
      accelerated: ["Stats/Probability & Python", "ML Algorithms & Model Building", "Case Studies & Presentation Prep"],
      standard: ["Statistics & Probability Deep Dive", "ML Algorithms & Feature Engineering", "Applied ML & Case Studies", "Mock Presentations & Final Prep"],
      extended: ["Math & Statistics Foundations", "Python for Data Science", "Machine Learning Theory", "Feature Engineering & Model Tuning", "Case Studies & Business Impact", "Mock Interviews & Presentations"]
    },
    phases: [
      {
        key: "stats_foundation",
        type: "study",
        icon: "📊",
        description: (c) => `Data science interviews at ${c.logo} start with statistics and probability. This is your make-or-break foundation.`,
        tasks: () => [
          { category: "Study", title: "Probability & Statistics", items: ["Bayes' Theorem — derive and apply to real problems", "Probability distributions (Normal, Binomial, Poisson, Exponential)", "Central Limit Theorem & Law of Large Numbers", "Confidence Intervals — construction and interpretation", "p-values, statistical significance, and power of a test"], tag: "Statistics", difficulty: "Must-Know" },
          { category: "Study", title: "Hypothesis Testing", items: ["t-test (one-sample, two-sample, paired)", "Chi-square test for independence", "ANOVA — one-way and two-way", "A/B Testing — design, sample size calculation, analysis", "Multiple testing correction (Bonferroni, FDR)"], tag: "Statistics", difficulty: "Medium-Hard" },
          { category: "Study", title: "Python for Data Science", items: ["Pandas — groupby, merge, pivot_table, apply", "NumPy — broadcasting, vectorized operations", "Matplotlib & Seaborn — publication-quality plots", "Scikit-learn — preprocessing pipelines", "SQL — complex queries with window functions"], tag: "Programming", difficulty: "Medium" },
          { category: "Practice", title: "Statistics Problem Solving", items: ["Solve 15 probability & stats questions from interviews", "Calculate expected values for business scenarios", "Design an A/B test for a product feature", "Interpret a confusion matrix and recommend threshold"], tag: "Practice", difficulty: "Medium" }
        ]
      },
      {
        key: "ml_algorithms",
        type: "study",
        icon: "🤖",
        description: (c) => `Master ML algorithms that ${c.logo} expects you to know inside-out — not just sklearn.fit(), but the math behind it.`,
        tasks: () => [
          { category: "Study", title: "Supervised Learning", items: ["Linear Regression — derivation, assumptions, regularization (L1/L2)", "Logistic Regression — sigmoid, log-loss, decision boundary", "Decision Trees — Gini, Entropy, pruning, overfitting", "Random Forests & Gradient Boosting (XGBoost, LightGBM)", "SVM — kernels, margin maximization, when to use"], tag: "ML", difficulty: "Must-Know" },
          { category: "Study", title: "Unsupervised Learning & More", items: ["K-Means — elbow method, silhouette score, K-Means++", "PCA — dimensionality reduction, explained variance", "Recommender Systems — collaborative vs content-based filtering", "Time Series — ARIMA, seasonal decomposition basics", "Evaluation metrics — Precision, Recall, F1, AUC-ROC, RMSE, MAE"], tag: "ML", difficulty: "Medium-Hard" },
          { category: "Study", title: "Feature Engineering & Model Pipeline", items: ["Handling missing values (imputation strategies)", "Encoding categoricals (one-hot, target, ordinal encoding)", "Feature scaling (StandardScaler vs MinMaxScaler — when and why)", "Feature selection (mutual information, recursive elimination)", "Cross-validation strategies (k-fold, stratified, time-series split)"], tag: "ML Pipeline", difficulty: "Medium" },
          { category: "Practice", title: "Kaggle-Style Projects", items: ["Build a churn prediction model with XGBoost", "Build a recommendation engine on MovieLens dataset", "Perform EDA on a real dataset and present findings", "Compare 3 models and justify your chosen approach"], tag: "Projects", difficulty: "Medium-Hard" }
        ]
      },
      {
        key: "case_studies",
        type: "practice",
        icon: "💼",
        description: (c) => `Case studies test your ability to apply ML to real business problems at ${c.logo}. Think like a data scientist, not a model trainer.`,
        tasks: (c) => [
          { category: "Practice", title: "Business Case Studies", items: ["How would you measure success of a new feature?", "Detect fraudulent transactions — what model & features?", "Predict customer lifetime value — approach & tradeoffs", "Build a search ranking algorithm — define metrics", "How would you handle class imbalance in production?"], tag: "Case Studies", difficulty: "Hard" },
          { category: "Study", title: "Data Science Communication", items: ["Structuring a data science presentation", "Explaining model results to non-technical stakeholders", "Calculating and presenting business impact / ROI", "Building compelling data visualizations"], tag: "Communication", difficulty: "Essential" },
          { category: "Practice", title: "SQL for Data Science Interviews", items: ["Write queries for retention/cohort analysis", "Calculate running averages and percentiles", "Self-joins for comparing user activity over time", "Funnel analysis queries", "Engagement metrics (DAU/MAU) computation"], tag: "SQL", difficulty: "Medium-Hard" }
        ]
      },
      {
        key: "final_prep",
        type: "prepare",
        icon: "🎯",
        description: () => `Final preparation — mock case studies, take-home challenge practice, and presentation skills.`,
        tasks: (c) => [
          { category: "Mock", title: "Data Science Mock Interviews", items: ["Statistics deep dive mock (45 min)", "ML algorithm white-board explaining session", "Case study mock — Design an ML system for product recommendation", "Take-home challenge: EDA + Model on a real dataset (4-6 hours)"], tag: "Interview Prep", difficulty: "Realistic" },
          ...getCommonPrepTasks(c, "Data Scientist")
        ]
      }
    ]
  },

  "Data Analyst": {
    phaseNames: {
      sprint: ["SQL & Statistics Intensive", "Dashboarding + Case Studies"],
      accelerated: ["SQL Mastery & Statistics", "Excel + BI Tools + Dashboarding", "Case Study & Presentation Prep"],
      standard: ["SQL Deep Dive", "Statistics & Business Metrics", "BI Tools & Visualization", "Mock Presentations & Final Prep"],
      extended: ["SQL Foundations & Advanced Queries", "Statistics & Probability", "Excel & Google Sheets Power Skills", "Tableau / Power BI Mastery", "Business Case Studies", "Mock Interviews & Portfolio Prep"]
    },
    phases: [
      {
        key: "sql_mastery",
        type: "study",
        icon: "🗃️",
        description: (c) => `SQL is the #1 skill tested for data analyst roles at ${c.logo}. Master everything from basics to advanced window functions.`,
        tasks: () => [
          { category: "Study", title: "SQL Core Mastery", items: ["SELECT, WHERE, GROUP BY, HAVING, ORDER BY", "JOINs — INNER, LEFT, RIGHT, FULL OUTER, SELF, CROSS", "Subqueries — correlated vs non-correlated", "CTEs (Common Table Expressions) — recursive CTEs", "CASE WHEN for conditional logic"], tag: "SQL", difficulty: "Must-Know" },
          { category: "Study", title: "Advanced SQL", items: ["Window Functions — ROW_NUMBER, RANK, DENSE_RANK", "Window Functions — LAG, LEAD, NTILE, FIRST_VALUE", "Running totals and moving averages", "PIVOT / UNPIVOT queries", "Date functions and time-series queries"], tag: "SQL", difficulty: "Medium-Hard" },
          { category: "Practice", title: "SQL Problem Solving", items: ["Solve 30+ SQL problems on LeetCode (Easy to Hard)", "Practice DataLemur SQL questions", "Write retention analysis queries", "Calculate MoM growth, cohort analysis, funnel metrics", "Optimize slow queries using EXPLAIN"], tag: "SQL", difficulty: "Medium" }
        ]
      },
      {
        key: "stats_and_metrics",
        type: "study",
        icon: "📊",
        description: (c) => `Understand the numbers — ${c.logo} analysts need strong stats and metric definition skills.`,
        tasks: () => [
          { category: "Study", title: "Statistics for Analysts", items: ["Mean, Median, Mode — when to use which", "Standard Deviation & Variance interpretation", "Percentiles & quartile analysis", "Correlation vs Causation — real examples", "Basic A/B testing — hypothesis setup & p-values"], tag: "Statistics", difficulty: "Must-Know" },
          { category: "Study", title: "Business Metrics & KPIs", items: ["DAU / MAU / WAU — Daily/Monthly Active Users", "Retention & Churn rate calculations", "Customer Acquisition Cost (CAC) & LTV", "Conversion funnels & drop-off analysis", "Revenue metrics — ARPU, ARPPU, MRR, ARR"], tag: "Business", difficulty: "Medium" },
          { category: "Study", title: "Excel / Google Sheets Power Skills", items: ["VLOOKUP / XLOOKUP / INDEX-MATCH", "Pivot Tables & conditional formatting", "Data validation & dynamic dropdowns", "Advanced formulas — ARRAYFORMULA, SUMPRODUCT", "Charting & dashboard creation in Sheets"], tag: "Excel", difficulty: "Medium" }
        ]
      },
      {
        key: "bi_tools",
        type: "practice",
        icon: "📈",
        description: (c) => `Build dashboards and tell stories with data — a key skill that separates good analysts at ${c.logo}.`,
        tasks: () => [
          { category: "Study", title: "Tableau / Power BI", items: ["Connect to data sources (CSV, SQL, APIs)", "Build calculated fields & parameters", "Create interactive filters & drill-downs", "Design a KPI dashboard with scorecard tiles", "Publish and share dashboards"], tag: "BI Tools", difficulty: "Medium" },
          { category: "Practice", title: "Dashboard Projects", items: ["Build a Sales Performance Dashboard", "Build a Customer Segmentation Dashboard", "Build a Marketing Campaign Analysis Dashboard", "Create a Product Funnel Analytics Dashboard"], tag: "Projects", difficulty: "Medium-Hard" },
          { category: "Study", title: "Data Storytelling", items: ["Structure findings with Situation-Complication-Resolution", "Choose the right chart for your data", "Annotate charts to highlight insights", "Present data to non-technical stakeholders", "Build a 5-slide data insight presentation"], tag: "Communication", difficulty: "Essential" }
        ]
      },
      {
        key: "final_prep",
        type: "prepare",
        icon: "🎯",
        description: () => `Final preparation — SQL mocks, case study presentations, and behavioral rounds.`,
        tasks: (c) => [
          { category: "Mock", title: "Data Analyst Mock Interviews", items: ["Live SQL coding round — 3 problems in 45 min", "Metric definition exercise — Define KPIs for a new product", "Case study mock — Analyze a dataset and present insights", "Dashboard walkthrough — Present a Tableau dashboard you built"], tag: "Interview Prep", difficulty: "Realistic" },
          ...getCommonPrepTasks(c, "Data Analyst")
        ]
      }
    ]
  },

  "DevOps Engineer": {
    phaseNames: {
      sprint: ["Linux & Docker Intensive", "Kubernetes + CI/CD + Cloud"],
      accelerated: ["Linux, Networking & Containers", "CI/CD Pipelines & Cloud Architecture", "SRE Practices & Mock Interviews"],
      standard: ["Linux Administration & Scripting", "Containers & Orchestration", "Cloud Architecture & IaC", "SRE Practices & Mock Interviews"],
      extended: ["Linux Deep Dive & Shell Scripting", "Networking & Security", "Docker & Container Orchestration", "CI/CD & GitOps", "Cloud Architecture (AWS/GCP/Azure)", "SRE, Monitoring & Incident Response"]
    },
    phases: [
      {
        key: "linux_fundamentals",
        type: "study",
        icon: "🐧",
        description: (c) => `DevOps at ${c.logo} starts with Linux mastery. Scripting, networking, and troubleshooting are non-negotiable.`,
        tasks: () => [
          { category: "Study", title: "Linux Administration", items: ["File system hierarchy & permissions (chmod, chown)", "Process management (ps, top, kill, systemctl)", "Package management (apt, yum, dnf)", "User management & sudo configuration", "Journal logs & syslog analysis"], tag: "Linux", difficulty: "Must-Know" },
          { category: "Study", title: "Shell Scripting", items: ["Bash scripting — variables, loops, conditionals, functions", "Text processing — grep, awk, sed, cut, sort, uniq", "Cron jobs & automation scripts", "Error handling & exit codes in scripts", "Write a deploy script from scratch"], tag: "Scripting", difficulty: "Medium" },
          { category: "Study", title: "Networking Fundamentals", items: ["TCP/IP, UDP, DNS resolution process", "Subnetting & CIDR notation", "Firewall rules (iptables/nftables basics)", "SSH tunneling, port forwarding, SCP", "curl, netstat, ss, traceroute, dig for debugging"], tag: "Networking", difficulty: "Must-Know" }
        ]
      },
      {
        key: "containers",
        type: "study",
        icon: "🐳",
        description: (c) => `Containers are the backbone of modern DevOps at ${c.logo}. Master Docker, then Kubernetes.`,
        tasks: () => [
          { category: "Study", title: "Docker Mastery", items: ["Dockerfile best practices (multi-stage builds, layer caching)", "Docker networking (bridge, host, overlay)", "Docker volumes & bind mounts", "Docker Compose for multi-service applications", "Container security — rootless containers, image scanning"], tag: "Docker", difficulty: "Must-Know" },
          { category: "Study", title: "Kubernetes Deep Dive", items: ["Pod lifecycle, ReplicaSets, Deployments", "Services (ClusterIP, NodePort, LoadBalancer)", "ConfigMaps & Secrets management", "Ingress controllers & TLS termination", "Resource limits, requests, HPA (autoscaling)"], tag: "Kubernetes", difficulty: "Hard" },
          { category: "Practice", title: "Hands-On Labs", items: ["Deploy a 3-tier app on Kubernetes", "Set up a Kubernetes cluster with kubeadm", "Implement rolling updates & rollback strategy", "Debug a CrashLoopBackOff pod", "Set up Helm charts for your application"], tag: "Labs", difficulty: "Medium-Hard" }
        ]
      },
      {
        key: "cicd_cloud",
        type: "study",
        icon: "☁️",
        description: (c) => `CI/CD pipelines and cloud architecture — the daily work of DevOps engineers at ${c.logo}.`,
        tasks: () => [
          { category: "Study", title: "CI/CD Pipelines", items: ["GitHub Actions — workflows, jobs, steps, secrets", "Jenkins — pipeline as code (Jenkinsfile)", "GitOps with ArgoCD / Flux", "Build, test, deploy pipeline design", "Blue/green & canary deployment strategies"], tag: "CI/CD", difficulty: "Must-Know" },
          { category: "Study", title: "Infrastructure as Code", items: ["Terraform — providers, resources, state management", "Terraform modules & workspaces", "Ansible — playbooks, roles, inventory", "CloudFormation / Pulumi basics", "Immutable infrastructure principles"], tag: "IaC", difficulty: "Medium-Hard" },
          { category: "Study", title: "Cloud Architecture", items: ["AWS: EC2, S3, RDS, Lambda, VPC, IAM", "Load balancers (ALB vs NLB vs CLB)", "Auto Scaling Groups & Launch Templates", "S3 lifecycle policies & versioning", "CloudWatch metrics, alarms, and dashboards"], tag: "Cloud", difficulty: "Medium-Hard" }
        ]
      },
      {
        key: "final_prep",
        type: "prepare",
        icon: "🎯",
        description: () => `Final prep — incident response scenarios, architecture mocks, and troubleshooting drills.`,
        tasks: (c) => [
          { category: "Mock", title: "DevOps Mock Interviews", items: ["Debug a production outage scenario (45 min)", "Design a CI/CD pipeline for a microservices app", "Troubleshooting drill — fix a broken Kubernetes deployment", "Architecture mock — Design infrastructure for a 10M user app"], tag: "Interview Prep", difficulty: "Realistic" },
          { category: "Study", title: "SRE & Monitoring", items: ["Prometheus & Grafana dashboards", "Log aggregation (ELK/EFK stack basics)", "SLOs, SLIs, SLAs — defining and measuring", "Incident response process & postmortem culture", "On-call best practices & runbook creation"], tag: "SRE", difficulty: "Medium-Hard" },
          ...getCommonPrepTasks(c, "DevOps Engineer")
        ]
      }
    ]
  },

  "Product Manager": {
    phaseNames: {
      sprint: ["Product Sense & Metrics Sprint", "Execution Cases + Behavioral"],
      accelerated: ["Product Sense & Analytical Thinking", "Strategy & Execution Cases", "Behavioral & Leadership Stories"],
      standard: ["Product Sense & User Empathy", "Metrics, Analytics & Estimation", "Strategy & Execution Cases", "Behavioral & Mock Interviews"],
      extended: ["Product Thinking Foundations", "User Research & Design Thinking", "Metrics & Analytical Skills", "Product Strategy & Roadmapping", "Execution & Technical Communication", "Full Mock Interviews & Behavioral Prep"]
    },
    phases: [
      {
        key: "product_sense",
        type: "study",
        icon: "💡",
        description: (c) => `Product sense is the #1 skill ${c.logo} tests. Learn to think like a PM — identify user problems and design elegant solutions.`,
        tasks: () => [
          { category: "Study", title: "Product Sense Framework", items: ["User → Problem → Solution → Tradeoffs → Metrics framework", "Jobs-to-be-Done framework for understanding user needs", "Design thinking: Empathize, Define, Ideate, Prototype, Test", "Competitive analysis & differentiation", "Product-market fit evaluation"], tag: "Product Sense", difficulty: "Must-Know" },
          { category: "Practice", title: "Product Design Questions", items: ["Design a product for blind people to cross streets safely", "Improve Instagram's Explore page — what would you change?", "Design a feature for Spotify for podcast listeners", "How would you build a product for remote workers?", "Design a grocery delivery app for elderly users"], tag: "Product Design", difficulty: "Hard" },
          { category: "Study", title: "User Research & Personas", items: ["Creating effective user personas", "Writing user stories & acceptance criteria", "Journey mapping & pain point identification", "Usability testing methods & heuristics", "Prioritizing user needs vs business needs"], tag: "User Research", difficulty: "Medium" }
        ]
      },
      {
        key: "metrics_analytical",
        type: "study",
        icon: "📊",
        description: (c) => `PMs at ${c.logo} must define, measure, and move metrics. Master analytical thinking and estimation.`,
        tasks: () => [
          { category: "Study", title: "Metrics & Analytics", items: ["North Star Metric — definition & examples", "AARRR (Pirate Metrics) framework", "Defining success metrics for new features", "Counter metrics & guardrail metrics", "Interpreting A/B test results and making Go/No-Go decisions"], tag: "Analytics", difficulty: "Must-Know" },
          { category: "Practice", title: "Metric Definition Questions", items: ["How would you measure success of YouTube Shorts?", "What metrics would you track for Uber's driver onboarding?", "Define KPIs for a new LinkedIn messaging feature", "How would you know if Instagram Reels is successful?", "A feature launched and DAU dropped 5% — what do you investigate?"], tag: "Metrics", difficulty: "Hard" },
          { category: "Practice", title: "Estimation & Analytical Questions", items: ["How many Uber trips happen daily in New York City?", "Estimate the number of WhatsApp messages sent per day in India", "How much storage does Gmail need per year globally?", "Should Spotify add a free tier for podcasts? Estimate impact.", "Calculate the TAM for a plant-care subscription app"], tag: "Estimation", difficulty: "Medium-Hard" }
        ]
      },
      {
        key: "strategy_execution",
        type: "practice",
        icon: "🗺️",
        description: (c) => `Strategy and execution questions at ${c.logo} test your ability to prioritize, make tradeoffs, and ship products.`,
        tasks: () => [
          { category: "Study", title: "Prioritization Frameworks", items: ["RICE scoring (Reach, Impact, Confidence, Effort)", "MoSCoW method (Must, Should, Could, Won't)", "Impact vs Effort matrix", "Kano model for feature categorization", "OKRs — writing good objectives and key results"], tag: "Strategy", difficulty: "Must-Know" },
          { category: "Practice", title: "Execution Case Studies", items: ["You're the PM for Google Maps. Build a 6-month roadmap.", "A competitor just launched feature X. What do you do?", "Your team can only build 3 of 10 requested features. How do you decide?", "Walk me through how you'd launch a new product from 0 to 1", "How would you handle a stakeholder who disagrees with your roadmap?"], tag: "Execution", difficulty: "Hard" },
          { category: "Study", title: "Technical Communication", items: ["Writing effective PRDs (Product Requirements Documents)", "Communicating with engineering teams — scoping & tradeoffs", "Understanding APIs, databases, and system basics for PMs", "Reading data dashboards and SQL basics", "Sprint planning and agile ceremonies"], tag: "Technical", difficulty: "Medium" }
        ]
      },
      {
        key: "final_prep",
        type: "prepare",
        icon: "🎯",
        description: () => `Final preparation — PM mock interviews focus heavily on structured thinking and behavioral stories.`,
        tasks: (c) => [
          { category: "Mock", title: "PM Mock Interviews", items: ["Product sense mock — Design a product for a specific user segment", "Metrics mock — Define success for a new feature launch", "Strategy mock — Build a 1-year roadmap and defend priorities", "Execution mock — Walk through shipping a feature end-to-end"], tag: "Interview Prep", difficulty: "Realistic" },
          { category: "Study", title: "Leadership & Behavioral for PMs", items: ["Prepare 5 STAR stories about cross-functional collaboration", "Tell me about a product decision that failed — lessons learned", "Describe a time you said no to a stakeholder", "How do you build trust with engineering teams?", "Describe a time you used data to change a product direction"], tag: "Behavioral", difficulty: "Essential" },
          ...getCommonPrepTasks(c, "Product Manager")
        ]
      }
    ]
  },

  "Machine Learning Engineer": {
    phaseNames: {
      sprint: ["DSA + ML Theory Sprint", "ML System Design + Behavioral"],
      accelerated: ["DSA & Math Foundations", "ML/DL Theory & Implementation", "ML System Design & Mock Interviews"],
      standard: ["DSA & Math Foundations", "ML Algorithms & Deep Learning", "ML System Design & MLOps", "Mock Interviews & Final Prep"],
      extended: ["DSA Foundations & Mathematics", "Classic ML Algorithms & Theory", "Deep Learning & NLP/CV", "ML Experimentation & Feature Engineering", "ML System Design & MLOps", "Mock Interviews & Paper Discussions"]
    },
    phases: [
      {
        key: "dsa_math",
        type: "study",
        icon: "📐",
        description: (c) => `MLE interviews at ${c.logo} combine DSA with heavy math. Nail the foundations first.`,
        tasks: (c) => {
          const topics = (c.topTopics || ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming"]).slice(0, 3);
          const tasks = [];
          topics.forEach(topic => {
            const pool = dsaTopicPool[topic] || dsaTopicPool["Arrays & Strings"];
            tasks.push({ category: "Study", title: `Master ${topic}`, items: [...(pool.easy?.slice(0, 2) || []), ...(pool.medium?.slice(0, 3) || [])], tag: "DSA", difficulty: "Mixed" });
          });
          tasks.push({ category: "Study", title: "Math for ML", items: ["Linear Algebra — eigenvalues, SVD, matrix operations", "Calculus — gradients, chain rule, partial derivatives", "Probability — Bayes theorem, distributions, MLE/MAP", "Information Theory — entropy, KL divergence, cross-entropy", "Optimization — gradient descent variants (SGD, Adam, RMSprop)"], tag: "Mathematics", difficulty: "Hard" });
          return tasks;
        }
      },
      {
        key: "ml_deep_learning",
        type: "study",
        icon: "🧠",
        description: (c) => `Deep dive into ML/DL algorithms. ${c.logo} expects you to derive, implement, and optimize models — not just call APIs.`,
        tasks: () => [
          { category: "Study", title: "Classical ML Mastery", items: ["Linear/Logistic Regression — derive gradient updates", "Decision Trees, Random Forests, Gradient Boosting (XGBoost)", "SVM — kernel trick, support vectors, margin", "K-Means, DBSCAN — clustering algorithms", "Bias-Variance tradeoff & regularization techniques"], tag: "ML", difficulty: "Must-Know" },
          { category: "Study", title: "Deep Learning", items: ["Backpropagation — derive from scratch", "CNNs — convolution, pooling, architectures (ResNet, VGG)", "RNNs, LSTMs, GRUs — vanishing gradient problem", "Transformers — self-attention, multi-head attention, positional encoding", "Transfer learning & fine-tuning pretrained models"], tag: "Deep Learning", difficulty: "Hard" },
          { category: "Study", title: "NLP & LLMs", items: ["Word embeddings — Word2Vec, GloVe, contextual embeddings", "Transformer architecture deep dive", "BERT, GPT family — pretraining and fine-tuning", "Prompt engineering & few-shot learning", "RAG (Retrieval Augmented Generation) architectures"], tag: "NLP", difficulty: "Hard" },
          { category: "Practice", title: "Implement from Scratch", items: ["Implement linear regression with gradient descent in NumPy", "Implement a 2-layer neural network from scratch", "Implement K-Means clustering from scratch", "Build a text classifier using fine-tuned BERT", "Train a simple GAN on MNIST"], tag: "Coding", difficulty: "Hard" }
        ]
      },
      {
        key: "ml_system_design",
        type: "study",
        icon: "🏗️",
        description: (c) => `ML System Design at ${c.logo} — from data pipelines to model serving at scale.`,
        tasks: (c) => [
          { category: "Study", title: "ML System Design Framework", items: ["Problem framing — classification/regression/ranking", "Data collection & labeling strategies", "Feature engineering & feature stores", "Model selection & experimentation (offline metrics)", "Online metrics, A/B testing for models"], tag: "ML System Design", difficulty: "Must-Know" },
          { category: "Study", title: "MLOps & Serving", items: ["Model training pipelines (Kubeflow, Airflow)", "Model serving (TorchServe, TensorFlow Serving, FastAPI)", "Model monitoring — data drift, concept drift detection", "Feature stores (Feast) & online/offline features", "Model versioning & experiment tracking (MLflow, W&B)"], tag: "MLOps", difficulty: "Medium-Hard" },
          { category: "Practice", title: "ML System Design Problems", items: ["Design a recommendation system for YouTube", "Design a fraud detection system for payments", "Design a search ranking system (like Google)", "Design an ad click prediction system", "Design a content moderation system using ML"], tag: "System Design", difficulty: "Hard" }
        ]
      },
      {
        key: "final_prep",
        type: "prepare",
        icon: "🎯",
        description: () => `Final prep — ML coding rounds, system design mocks, and paper discussion practice.`,
        tasks: (c) => [
          { category: "Mock", title: "MLE Mock Interviews", items: ["ML coding round — implement algorithm from scratch (45 min)", "ML System Design mock — design an end-to-end ML pipeline", "Stats & probability deep dive questions", "Paper discussion — explain a recent ML paper you've read"], tag: "Interview Prep", difficulty: "Realistic" },
          ...getCommonPrepTasks(c, "Machine Learning Engineer")
        ]
      }
    ]
  },

  "QA Engineer": {
    phaseNames: {
      sprint: ["Testing Fundamentals & Automation Sprint", "API Testing + CI/CD Blitz"],
      accelerated: ["Testing Theory & Manual Testing", "Automation Frameworks Deep Dive", "Performance Testing & Mock Interviews"],
      standard: ["Testing Fundamentals & Strategy", "Web Automation (Selenium/Playwright)", "API & Performance Testing", "CI/CD Integration & Mock Interviews"],
      extended: ["Testing Theory & SDLC", "Manual Testing Mastery", "Web Automation Frameworks", "API Testing (REST & GraphQL)", "Performance & Security Testing", "CI/CD & Mock Interviews"]
    },
    phases: [
      {
        key: "testing_fundamentals",
        type: "study",
        icon: "🧪",
        description: (c) => `QA at ${c.logo} starts with solid testing fundamentals. Master test strategy, test case design, and defect lifecycle.`,
        tasks: () => [
          { category: "Study", title: "Testing Theory & Strategy", items: ["Test pyramid — unit, integration, E2E tradeoffs", "Black-box testing techniques (Equivalence Partitioning, Boundary Value Analysis)", "White-box testing (Statement, Branch, Path Coverage)", "Risk-based testing & test prioritization", "Defect lifecycle — New, Open, Deferred, Closed"], tag: "Testing", difficulty: "Must-Know" },
          { category: "Study", title: "Test Case Design", items: ["Writing effective test cases with preconditions and expected results", "Test data management strategies", "Exploratory testing techniques and charter writing", "Regression test suite optimization", "Decision table testing for complex business logic"], tag: "Testing", difficulty: "Medium" },
          { category: "Practice", title: "Manual Testing Exercises", items: ["Write 20 test cases for a login page (positive + negative)", "Write test cases for an e-commerce checkout flow", "Perform exploratory testing on a real web app", "Write a bug report with proper severity/priority", "Design a test plan for a mobile application release"], tag: "Manual QA", difficulty: "Medium" }
        ]
      },
      {
        key: "automation",
        type: "study",
        icon: "🤖",
        description: (c) => `Automation is the key differentiator for QA roles at ${c.logo}. Master Selenium/Playwright and page object patterns.`,
        tasks: () => [
          { category: "Study", title: "Selenium / Playwright Automation", items: ["Locator strategies — id, CSS selectors, XPath, text", "Page Object Model (POM) design pattern", "Waits — implicit, explicit, fluent waits", "Handling dropdowns, alerts, frames, and multiple windows", "Screenshot & video capture on failures"], tag: "Automation", difficulty: "Must-Know" },
          { category: "Study", title: "Test Framework Architecture", items: ["TestNG / JUnit / pytest framework structure", "Data-driven testing (parameterized tests)", "Parallel test execution configuration", "Test reporting (Allure, ExtentReports)", "Cross-browser testing setup"], tag: "Framework", difficulty: "Medium-Hard" },
          { category: "Practice", title: "Automation Projects", items: ["Automate a login & registration flow end-to-end", "Build a reusable automation framework with POM", "Automate a search + filter + sort test suite", "Write tests that run on Chrome, Firefox, and Edge", "Implement retry logic for flaky tests"], tag: "Projects", difficulty: "Medium-Hard" }
        ]
      },
      {
        key: "api_perf_testing",
        type: "study",
        icon: "🔌",
        description: (c) => `API and performance testing are increasingly critical for QA at ${c.logo}. Round out your testing skills.`,
        tasks: () => [
          { category: "Study", title: "API Testing", items: ["REST API testing with Postman — collections, environments, scripts", "Request chaining & dynamic variables in Postman", "REST Assured / supertest for coded API tests", "GraphQL query testing", "API contract testing (Pact basics)"], tag: "API Testing", difficulty: "Must-Know" },
          { category: "Study", title: "Performance Testing", items: ["JMeter — thread groups, samplers, listeners, assertions", "Load testing vs stress testing vs spike testing", "Identifying performance bottlenecks from results", "Performance testing in CI/CD pipelines", "k6 for developer-friendly performance testing"], tag: "Performance", difficulty: "Medium-Hard" },
          { category: "Study", title: "Security Testing Basics", items: ["OWASP Top 10 vulnerabilities overview", "SQL injection & XSS testing basics", "Testing authentication & authorization flows", "Using Burp Suite for basic security testing"], tag: "Security", difficulty: "Medium" }
        ]
      },
      {
        key: "final_prep",
        type: "prepare",
        icon: "🎯",
        description: () => `Final preparation — automation mocks, test strategy presentations, and CI/CD integration.`,
        tasks: (c) => [
          { category: "Mock", title: "QA Mock Interviews", items: ["Live automation coding — write Selenium tests in 45 min", "Test strategy design — How would you test feature X?", "API testing mock — debug failing API test scenarios", "CI/CD integration — set up tests in GitHub Actions pipeline"], tag: "Interview Prep", difficulty: "Realistic" },
          ...getCommonPrepTasks(c, "QA Engineer")
        ]
      }
    ]
  }
};

// ──────────────────────────── COMMON PREP TASKS ────────────────────────────

function getCommonPrepTasks(company, roleName) {
  const tasks = [];
  
  // Behavioral preparation
  const behavioralItems = company === companyProfiles["Amazon"]
    ? behavioralPool.amazon_lp.slice(0, 5)
    : company === companyProfiles["Google"]
      ? behavioralPool.google_values.slice(0, 4)
      : behavioralPool.general.slice(0, 5);
  
  tasks.push({
    category: "Behavioral",
    title: `${company.logo} Behavioral Preparation`,
    items: behavioralItems,
    tag: "Behavioral",
    difficulty: "Soft Skills"
  });

  tasks.push({
    category: "Company Research",
    title: `${company.logo} Deep Research`,
    items: [
      `Study ${company.logo}'s recent products, acquisitions, and news`,
      `Understand the ${roleName} team structure and projects`,
      "Prepare 5 smart questions for the interviewer",
      "Review Glassdoor interview experiences for this role",
      "Research the hiring manager and team on LinkedIn"
    ],
    tag: "Research",
    difficulty: "Essential"
  });

  tasks.push({
    category: "Logistics",
    title: "Interview Day Preparation",
    items: [
      "Test your setup (camera, mic, IDE sharing, stable internet)",
      "Prepare your introduction (30-second pitch highlighting relevant projects)",
      "Keep water and notepad ready",
      "Review your resume — be ready to discuss every point in depth",
      "Prepare a 2-minute walkthrough of your best project"
    ],
    tag: "Logistics",
    difficulty: "Essential"
  });

  return tasks;
}

// ──────────────────────────── MAIN GENERATOR ────────────────────────────

/**
 * Generate a personalized study plan based on company, role, and interview date.
 * Each role gets a fundamentally different preparation path.
 */
export function generateCustomPlan(company, role, interviewDate) {
  const companyProfile = companyProfiles[company] || companyProfiles["Google"];
  const roleConfig = roleConfigs[role] || roleConfigs["Software Engineer"];
  
  const today = new Date();
  const target = new Date(interviewDate);
  const diffTime = Math.max(target - today, 7 * 24 * 60 * 60 * 1000);
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.max(Math.ceil(totalDays / 7), 1);
  
  // Determine intensity based on time available
  let intensity;
  if (totalWeeks <= 2) intensity = "sprint";
  else if (totalWeeks <= 4) intensity = "accelerated";
  else if (totalWeeks <= 8) intensity = "standard";
  else intensity = "extended";
  
  // Get role-specific content
  const roleContent = roleSpecificContent[role] || roleSpecificContent["Software Engineer"];
  const phaseNames = roleContent.phaseNames[intensity];
  const rolePhases = roleContent.phases;
  
  // Build phases based on intensity
  const phases = [];
  const phaseCount = phaseNames.length;
  
  phaseNames.forEach((phaseName, idx) => {
    // Calculate week ranges
    const startFraction = idx / phaseCount;
    const endFraction = (idx + 1) / phaseCount;
    const startWeek = Math.max(1, Math.ceil(totalWeeks * startFraction) + (idx === 0 ? 0 : 1));
    const endWeek = Math.min(totalWeeks, Math.ceil(totalWeeks * endFraction));
    
    // Map phase names to role-specific content
    const contentPhase = rolePhases[Math.min(idx, rolePhases.length - 1)];
    
    // For extended plans, map multiple phase names to the right content
    let contentIdx = idx;
    if (phaseCount > rolePhases.length) {
      // Scale content phases to match the number of phase names
      contentIdx = Math.floor(idx * rolePhases.length / phaseCount);
    }
    const mappedPhase = rolePhases[Math.min(contentIdx, rolePhases.length - 1)];
    
    const description = typeof mappedPhase.description === 'function' 
      ? mappedPhase.description(companyProfile) 
      : mappedPhase.description;
    
    const tasks = typeof mappedPhase.tasks === 'function' 
      ? mappedPhase.tasks(companyProfile, intensity) 
      : mappedPhase.tasks;

    phases.push({
      title: phaseName,
      startWeek: Math.max(startWeek, 1),
      endWeek: Math.max(endWeek, startWeek),
      type: mappedPhase.type,
      icon: mappedPhase.icon,
      description,
      tasks,
      weekLabel: startWeek === endWeek ? `Week ${startWeek}` : `Week ${startWeek}–${endWeek}`
    });
  });

  // Role-specific daily targets
  const dailyTargets = {
    "Software Engineer": totalWeeks <= 4 ? "4-6 hours/day" : "3-4 hours/day",
    "Frontend Engineer": totalWeeks <= 4 ? "4-5 hours/day" : "2-3 hours/day",
    "Backend Engineer": totalWeeks <= 4 ? "4-6 hours/day" : "3-4 hours/day",
    "Full Stack Engineer": totalWeeks <= 4 ? "4-5 hours/day" : "3-4 hours/day",
    "Data Scientist": totalWeeks <= 4 ? "3-5 hours/day" : "2-3 hours/day",
    "Data Analyst": totalWeeks <= 4 ? "3-4 hours/day" : "2-3 hours/day",
    "DevOps Engineer": totalWeeks <= 4 ? "3-5 hours/day" : "2-4 hours/day",
    "Product Manager": totalWeeks <= 4 ? "3-4 hours/day" : "2-3 hours/day",
    "Machine Learning Engineer": totalWeeks <= 4 ? "4-6 hours/day" : "3-5 hours/day",
    "QA Engineer": totalWeeks <= 4 ? "3-4 hours/day" : "2-3 hours/day"
  };

  const weeklyGoals = {
    "Software Engineer": totalWeeks <= 4 ? "15-20 problems/week" : "10-15 problems/week",
    "Frontend Engineer": totalWeeks <= 4 ? "3-4 components + 5 JS problems/week" : "2-3 components + 3 JS problems/week",
    "Backend Engineer": totalWeeks <= 4 ? "10-15 DSA + 5 SQL problems/week" : "8-10 DSA + 3 SQL problems/week",
    "Full Stack Engineer": totalWeeks <= 4 ? "10 DSA + 2 mini projects/week" : "6 DSA + 1 project/week",
    "Data Scientist": totalWeeks <= 4 ? "5 stats + 3 ML case studies/week" : "3 stats + 2 case studies/week",
    "Data Analyst": totalWeeks <= 4 ? "15 SQL + 2 dashboard builds/week" : "8 SQL + 1 dashboard/week",
    "DevOps Engineer": totalWeeks <= 4 ? "3 labs + 2 architecture reviews/week" : "2 labs + 1 review/week",
    "Product Manager": totalWeeks <= 4 ? "5 case studies + 2 mocks/week" : "3 case studies + 1 mock/week",
    "Machine Learning Engineer": totalWeeks <= 4 ? "8 DSA + 3 ML implementations/week" : "5 DSA + 2 ML tasks/week",
    "QA Engineer": totalWeeks <= 4 ? "3 automation suites + 10 API tests/week" : "2 suites + 5 API tests/week"
  };

  return {
    company,
    companyProfile,
    role,
    roleConfig,
    interviewDate: target.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    totalDays,
    totalWeeks,
    phases,
    interviewRounds: companyProfile.interviewRounds,
    tips: companyProfile.tips,
    dailyTarget: dailyTargets[role] || "3-4 hours/day",
    weeklyProblems: weeklyGoals[role] || "10-15 tasks/week"
  };
}

// Suggestions for companies
export const companySuggestions = Object.keys(companyProfiles);

// Suggestions for roles
export const roleSuggestions = Object.keys(roleConfigs);
