import { useState } from 'react';
import { Database, Server, Cpu, Layers, Link as LinkIcon, X, Code, FileCode, SearchCode, GitBranch, Binary } from 'lucide-react';

const subjects = [
  { 
    title: 'Operating Systems', 
    icon: Cpu, 
    chapters: ['Process Management', 'Memory Management', 'Deadlocks', 'File Systems'],
    fullSyllabus: [
      { module: "Introduction", topics: ["OS Components", "System Calls", "OS Structures", "Kernel Architecture"] },
      { module: "Process Management", topics: ["Process States", "PCB", "Context Switching", "Scheduling Algorithms (FCFS, SJF, RR)"] },
      { module: "Concurrency & Synchronization", topics: ["Critical Section", "Semaphores", "Mutex", "Monitors", "Classic Problems"] },
      { module: "Deadlocks", topics: ["Deadlock Characterization", "Banker's Algorithm", "Deadlock Prevention & Recovery"] },
      { module: "Memory Management", topics: ["Paging", "Segmentation", "Virtual Memory", "Page Replacement (LRU, FIFO)"] },
      { module: "File Systems", topics: ["File Access Methods", "Directory Structure", "Disk Scheduling"] }
    ]
  },
  { 
    title: 'Database Management', 
    icon: Database, 
    chapters: ['Normalization', 'SQL Queries', 'Transactions & ACID', 'Indexing'],
    fullSyllabus: [
      { module: "Intro & ER Models", topics: ["DBMS Architecture", "Entity-Relationship Diagrams", "Keys", "Weak Entities"] },
      { module: "Relational Model & SQL", topics: ["Relational Algebra", "SQL Joins", "Nested Queries", "Triggers", "Views"] },
      { module: "Database Design", topics: ["Functional Dependencies", "1NF, 2NF, 3NF, BCNF", "Lossless Join", "Dependency Preservation"] },
      { module: "Transactions & Concurrency", topics: ["ACID Properties", "Serializability", "Lock-Based Protocols", "Timestamp Ordering"] },
      { module: "Storage & Indexing", topics: ["B+ Trees", "Hashing", "Query Optimization", "Cost Models"] }
    ]
  },
  { 
    title: 'Computer Networks', 
    icon: Server, 
    chapters: ['OSI Model', 'TCP/IP', 'Routing Algorithms', 'Application Layer'],
    fullSyllabus: [
      { module: "Introduction & Physical Layer", topics: ["Network Topologies", "OSI & TCP/IP Models", "Transmission Media", "Multiplexing"] },
      { module: "Data Link Layer", topics: ["Framing", "Error Detection (CRC)", "CSMA/CD", "Ethernet", "MAC Addressing"] },
      { module: "Network Layer", topics: ["IPv4 & IPv6", "Subnetting", "Routing Algorithms (Distance Vector, Link State)", "ICMP"] },
      { module: "Transport Layer", topics: ["TCP vs UDP", "Congestion Control", "Flow Control", "3-Way Handshake"] },
      { module: "Application Layer", topics: ["DNS", "HTTP/HTTPS", "SMTP", "FTP", "WebSockets"] }
    ]
  },
  { 
    title: 'System Design', 
    icon: Layers, 
    chapters: ['Load Balancing', 'Caching', 'Database Sharding', 'Message Queues'],
    fullSyllabus: [
      { module: "Fundamentals", topics: ["Horizontal vs Vertical Scaling", "CAP Theorem", "PACELC Theorem", "Latency vs Throughput"] },
      { module: "Networking & Load Balancing", topics: ["DNS", "CDN", "Consistent Hashing", "API Gateways", "L4 vs L7 Balancing"] },
      { module: "Data Management", topics: ["Database Sharding", "Replication Strategies", "Caching Strategies (Redis, Memcached)"] },
      { module: "Asynchronous Systems", topics: ["Message Queues (Kafka, RabbitMQ)", "Event-Driven Architecture", "Pub/Sub"] },
      { module: "Design Examples", topics: ["Design URL Shortener", "Design Twitter", "Design WhatsApp", "Design Uber", "Design Netflix"] }
    ]
  },
  { 
    title: 'Data Structures & Algorithms', 
    icon: Binary, 
    chapters: ['Arrays & Strings', 'Trees & Graphs', 'Dynamic Programming', 'Sorting & Searching'],
    fullSyllabus: [
      { module: "Basics & Complexity", topics: ["Time & Space Complexity", "Big O, Omega, Theta Notation", "Recursion", "Master Theorem"] },
      { module: "Linear Data Structures", topics: ["Arrays", "Linked Lists (Singly, Doubly)", "Stacks", "Queues", "Deques"] },
      { module: "Trees & Graphs", topics: ["Binary Trees", "BST", "AVL Trees", "Trie", "Graph Traversal (BFS, DFS)", "Shortest Path (Dijkstra)"] },
      { module: "Advanced Algorithms", topics: ["Dynamic Programming", "Greedy Algorithms", "Divide & Conquer", "Backtracking", "Bit Manipulation"] },
      { module: "Sorting & Searching", topics: ["Quick Sort", "Merge Sort", "Binary Search", "Heap Sort", "Two Pointers Strategy"] }
    ]
  },
  { 
    title: 'Object Oriented Programming', 
    icon: Code, 
    chapters: ['Encapsulation', 'Polymorphism', 'Inheritance', 'Design Patterns'],
    fullSyllabus: [
      { module: "Core Concepts", topics: ["Classes & Objects", "Constructors", "Access Modifiers", "Static vs Instance Members"] },
      { module: "The 4 Pillars", topics: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism (Compile vs Run-time)"] },
      { module: "Advanced OOP", topics: ["Interfaces & Abstract Classes", "Method Overloading vs Overriding", "Virtual Functions", "Friend Functions"] },
      { module: "SOLID Principles", topics: ["Single Responsibility", "Open-Closed", "Liskov Substitution", "Interface Segregation", "Dependency Inversion"] },
      { module: "Design Patterns", topics: ["Singleton Pattern", "Factory Pattern", "Observer Pattern", "Strategy Pattern", "Decorator Pattern"] }
    ]
  },
  { 
    title: 'Compiler Design', 
    icon: SearchCode, 
    chapters: ['Lexical Analysis', 'Parsing', 'Syntax Translation', 'Code Generation'],
    fullSyllabus: [
      { module: "Introduction", topics: ["Phases of a Compiler", "Passes", "Bootstrapping", "Cross-Compilers"] },
      { module: "Lexical Analysis", topics: ["Regular Expressions", "Finite Automata (DFA, NFA)", "Lexical Errors", "Symbol Table Management"] },
      { module: "Syntax Analysis", topics: ["Context Free Grammars", "Top-Down Parsing (LL)", "Bottom-Up Parsing (LR, SLR, LALR)", "Ambiguity"] },
      { module: "Semantics & Translation", topics: ["Syntax Directed Translation", "Abstract Syntax Trees", "Intermediate Code (Three-address code)"] },
      { module: "Optimization", topics: ["Peephole Optimization", "Data Flow Analysis", "Target Code Generation", "Register Allocation"] }
    ]
  },
  { 
    title: 'Theory of Computation', 
    icon: GitBranch, 
    chapters: ['Finite Automata', 'Regular Languages', 'CFG', 'Turing Machines'],
    fullSyllabus: [
      { module: "Finite Automata", topics: ["DFA, NFA, epsilon-NFA", "Moore & Mealy Machines", "Minimization of DFA"] },
      { module: "Regular Languages", topics: ["Regular Expressions", "Pumping Lemma for RL", "Closure Properties", "Arden's Theorem"] },
      { module: "Context-Free Languages", topics: ["Context Free Grammars (CFG)", "Pushdown Automata (PDA)", "Pumping Lemma for CFL", "Chomsky Normal Form"] },
      { module: "Turing Machines", topics: ["Variants of Turing Machines", "Church-Turing Thesis", "Halting Problem"] },
      { module: "Decidability", topics: ["Recursive & Recursively Enumerable Languages", "Undecidability", "Post Correspondence Problem"] }
    ]
  },
  { 
    title: 'Software Engineering', 
    icon: FileCode, 
    chapters: ['SDLC Models', 'Agile Methodology', 'Software Testing', 'System Modeling'],
    fullSyllabus: [
      { module: "Software Processes", topics: ["Waterfall Model", "Spiral Model", "Agile Methodology", "Scrum Framework"] },
      { module: "Requirements Engineering", topics: ["Feasibility Study", "Requirement Elicitation", "SRS Document Generation"] },
      { module: "System Modeling", topics: ["UML Diagrams", "Use Case Diagrams", "Class Diagrams", "Sequence & State Diagrams"] },
      { module: "Software Testing", topics: ["Unit Testing", "Integration Testing", "Black-box vs White-box", "Test-Driven Development (TDD)"] },
      { module: "Maintenance & Deployment", topics: ["Software Metrics", "Refactoring", "Version Control Systems (Git)", "CI/CD Pipelines"] }
    ]
  }
];

export default function CSSubjects() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const accentColors = [
    'bg-[#FFDE59]', // Yellow
    'bg-[#00F0FF]', // Cyan
    'bg-[#CCFF00]', // Neon Lime
    'bg-[#FF52D9]', // Pink
    'bg-[#FF6B00]', // Orange
    'bg-[#9945FF]', // Purple
    'bg-[#FFDE59]', // Yellow
    'bg-[#00F0FF]', // Cyan
    'bg-[#CCFF00]', // Neon Lime
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full relative">
      {/* Header Banner */}
      <div className="mb-10 text-center">
        <div className="inline-block bg-[#FFDE59] border-2 border-black px-4 py-1 font-mono font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_#000] mb-4">
          [ SYLLABUS REGISTRY // UNIVERSITY & FAANG COMPREHENSIVE ]
        </div>
        <h1 className="text-4xl md:text-5xl font-mono font-black uppercase tracking-tight text-black mb-4">
          Core CS Subjects
        </h1>
        <p className="font-mono text-sm md:text-base text-neutral-700 font-bold max-w-2xl mx-auto">
          In-depth structured syllabus, fundamental concepts, and interview-focused summaries for competitive examinations and FAANG core rounds.
        </p>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map((sub, i) => {
          const accentBg = accentColors[i % accentColors.length];
          return (
            <div 
              key={i} 
              className="bg-white border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 flex flex-col p-6 group"
            >
              {/* Card Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 ${accentBg} border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-black shrink-0 group-hover:scale-105 transition-transform`}>
                  <sub.icon size={28} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="font-mono text-[10px] font-black uppercase text-neutral-500 tracking-wider">
                    MODULE #{String(i + 1).padStart(2, '0')}
                  </div>
                  <h2 className="text-xl font-mono font-black uppercase text-black tracking-tight">
                    {sub.title}
                  </h2>
                </div>
              </div>
              
              {/* Timeline / Chapters */}
              <div className="space-y-3.5 pl-4 border-l-4 border-black ml-4 mb-8 flex-1">
                {sub.chapters.map((chap, j) => (
                  <div key={j} className="relative cursor-pointer group/item flex items-center justify-between">
                    <div className="absolute -left-[22px] top-1/2 -translate-y-1/2 w-3 h-3 bg-black border-2 border-black group-hover/item:bg-[#CCFF00] transition-colors" />
                    <span className="font-mono text-xs sm:text-sm font-bold text-neutral-800 group-hover/item:text-black group-hover/item:underline decoration-2">
                      {chap}
                    </span>
                    <LinkIcon size={14} className="opacity-0 group-hover/item:opacity-100 text-black transition-opacity ml-2 shrink-0" />
                  </div>
                ))}
              </div>
              
              {/* Explore Button */}
              <button 
                onClick={() => setSelectedSubject(sub)}
                className="w-full py-3 bg-[#FFDE59] hover:bg-[#CCFF00] border-3 border-black text-black font-mono font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all mt-auto flex items-center justify-center gap-2"
              >
                <span>[ EXPLORE FULL SYLLABUS ]</span>
                <span className="text-sm">→</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal for Full Syllabus Explorer */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs" onClick={() => setSelectedSubject(null)}>
          <div 
            className="bg-[#FAF8F5] border-4 border-black shadow-[12px_12px_0px_#000] p-6 md:p-10 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative custom-scrollbar"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 bg-[#FF0033] hover:bg-black text-white p-2 border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              onClick={() => setSelectedSubject(null)}
            >
              <X size={20} strokeWidth={3} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-5 mb-8 border-b-4 border-black pb-6">
              <div className="w-16 h-16 bg-[#CCFF00] border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center text-black shrink-0">
                <selectedSubject.icon size={36} strokeWidth={2.5} />
              </div>
              <div>
                <div className="inline-block bg-black text-[#00F0FF] px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest mb-1.5">
                  DETAILED SPECIFICATION
                </div>
                <h2 className="text-2xl md:text-3xl font-mono font-black uppercase text-black tracking-tight">{selectedSubject.title}</h2>
                <p className="font-mono text-xs md:text-sm text-neutral-600 font-bold">Complete detailed syllabus & curriculum tracking</p>
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedSubject.fullSyllabus.map((mod, idx) => (
                <div key={idx} className="bg-white border-3 border-black shadow-[4px_4px_0px_#000] p-6 h-full flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 mb-4 border-b-2 border-black pb-3">
                    <span className="bg-[#CCFF00] text-black font-mono font-black text-xs px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000] uppercase tracking-wider w-fit">
                      MODULE {idx + 1}
                    </span>
                    <h3 className="font-mono font-black text-base uppercase text-black">{mod.module}</h3>
                  </div>
                  <ul className="space-y-2.5 flex-1">
                    {mod.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2.5 font-mono text-xs md:text-sm font-semibold text-neutral-800 hover:text-black transition-colors cursor-pointer group">
                        <div className="w-2 h-2 bg-black border border-black group-hover:bg-[#FF0033] mt-1.5 shrink-0 transition-colors" />
                        <span className="leading-snug">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* Modal Sticky Footer */}
            <div className="mt-8 pt-6 border-t-4 border-black flex flex-col sm:flex-row justify-between items-center sticky bottom-0 bg-[#FAF8F5]/95 py-4 backdrop-blur-md gap-4">
              <span className="font-mono text-xs font-black uppercase text-neutral-700 bg-white border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000]">
                0 / {selectedSubject.fullSyllabus.length} MODULES COMPLETED
              </span>
              <button 
                onClick={() => setSelectedSubject(null)}
                className="px-8 py-3.5 bg-[#00F0FF] hover:bg-[#CCFF00] text-black font-mono font-black text-xs uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all w-full sm:w-auto"
              >
                [ ⚡ START LEARNING NOW → ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}