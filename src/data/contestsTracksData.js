// Comprehensive Contests Tracks Data
// 24 Real-Time Competitive Arena Tracks Across Multiple Engineering Disciplines

import { 
  Target, Code2, Coffee, Brain, Code, Brackets, Briefcase, 
  Cpu, Blocks, Zap, Shield, Server, Database, Cloud, Terminal,
  Layers, Lock, LineChart, Globe, Sparkles, Workflow, Flame, Eye
} from 'lucide-react';
import kotlinContestData from './kotlinContestData';
import dpPythonData from './dpPythonData';

export const contestsTracksData = [
  // ─── ALGORITHMS & DATA STRUCTURES ─────────────────────
  {
    id: 3,
    title: 'Dynamic Programming',
    category: 'algorithms',
    contests: 160,
    active: 45,
    bgAccent: 'bg-[#CCFF00]',
    topics: '1D DP | 2D Grid DP | Knapsack | Strings | Bitmask DP',
    icon: Blocks,
    isIde: true,
    problems: dpPythonData.problems
  },
  {
    id: 4,
    title: 'Algo.Java & Crux',
    category: 'algorithms',
    contests: 942,
    active: 110,
    bgAccent: 'bg-[#FFDE59]',
    topics: 'Recursion | Segment Trees | Heavy Graph Theory | Backtracking',
    icon: Coffee,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'Trapping Rain Water',
        difficulty: 'Hard',
        topic: 'Two Pointers / Stack',
        submissions: 420,
        maxPoints: 100,
        status: 'unsolved',
        description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\\n\\n**Constraints**\\n1 <= n <= 2 * 10^4\\n0 <= height[i] <= 10^5\\n\\n**Sample Input**\\n[0,1,0,2,1,0,1,3,2,1,2,1]\\n\\n**Sample Output**\\n6',
        sampleInput: '[0,1,0,2,1,0,1,3,2,1,2,1]',
        sampleOutput: '6'
      },
      {
        id: 2,
        title: 'Median of Two Sorted Arrays',
        difficulty: 'Hard',
        topic: 'Binary Search',
        submissions: 310,
        maxPoints: 100,
        status: 'solved',
        description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).\\n\\n**Constraints**\\nnums1.length == m, nums2.length == n\\n0 <= m <= 1000, 0 <= n <= 1000\\n\\n**Sample Input**\\n[1,3], [2]\\n\\n**Sample Output**\\n2.00000',
        sampleInput: '[1,3]\n[2]',
        sampleOutput: '2.00000'
      },
      {
        id: 3,
        title: 'Sliding Window Maximum',
        difficulty: 'Hard',
        topic: 'Monotonic Queue',
        submissions: 285,
        maxPoints: 100,
        status: 'unsolved',
        description: 'You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. Return the max sliding window.\\n\\n**Sample Input**\\nnums = [1,3,-1,-3,5,3,6,7], k = 3\\n\\n**Sample Output**\\n[3,3,5,5,6,7]',
        sampleInput: '[1,3,-1,-3,5,3,6,7]\n3',
        sampleOutput: '[3,3,5,5,6,7]'
      },
      {
        id: 4,
        title: 'LRU Cache Design',
        difficulty: 'Medium',
        topic: 'Hash + Doubly Linked List',
        submissions: 512,
        maxPoints: 100,
        status: 'solved',
        description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) get and put operations.\\n\\n**Constraints**\\nCapacity: 1 <= capacity <= 3000\\nKey, value: 0 <= key, value <= 10^4',
        sampleInput: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        sampleOutput: '[null, null, null, 1, null, -1, null, -1, 3, 4]'
      },
      {
        id: 5,
        title: 'Word Ladder II',
        difficulty: 'Hard',
        topic: 'BFS + Backtracking',
        submissions: 198,
        maxPoints: 100,
        status: 'unsolved',
        description: 'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that every adjacent pair differs by a single letter. Return all shortest transformation sequences.',
        sampleInput: 'hit\ncog\n["hot","dot","dog","lot","log","cog"]',
        sampleOutput: '[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]'
      }
    ]
  },
  {
    id: 9,
    title: 'Competitive Programming',
    category: 'algorithms',
    contests: 258,
    active: 42,
    bgAccent: 'bg-[#FF0033]',
    topics: 'Number Theory | Fast I/O | Fenwick Trees | Ternary Search',
    icon: Brackets,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'GCD and Extended Euclidean',
        difficulty: 'Easy',
        topic: 'Math',
        submissions: 340,
        maxPoints: 100,
        status: 'solved',
        description: 'Find integers x and y such that a*x + b*y = gcd(a, b). Compute the modular multiplicative inverse under large prime mod 10^9+7.',
        sampleInput: '35 15',
        sampleOutput: '5 1 -2'
      },
      {
        id: 2,
        title: 'Segment Tree Point Update & Range Query',
        difficulty: 'Medium',
        topic: 'Trees',
        submissions: 290,
        maxPoints: 100,
        status: 'unsolved',
        description: 'Implement a segment tree that supports point updates in O(log N) and range sum/min queries in O(log N).',
        sampleInput: '8\n1 3 5 7 9 11 13 15\nquery 1 5',
        sampleOutput: '25'
      },
      {
        id: 3,
        title: 'Heavy-Light Decomposition',
        difficulty: 'Hard',
        topic: 'Advanced Trees',
        submissions: 92,
        maxPoints: 100,
        status: 'unsolved',
        description: 'Decompose a tree into heavy and light chains to compute queries along paths between arbitrary nodes in O(log^2 N).',
        sampleInput: '5\n1 2\n1 3\n2 4\n2 5',
        sampleOutput: 'PATH_DECOMPOSED'
      }
    ]
  },
  {
    id: 7,
    title: 'Algo++ & Launchpad',
    category: 'algorithms',
    contests: 910,
    active: 88,
    bgAccent: 'bg-[#CCFF00]',
    topics: 'Binary Search Trees | Sorting | Greedy Algorithms | Heaps',
    icon: Cpu,
    isIde: true,
    problems: dpPythonData.problems.slice(0, 5)
  },
  {
    id: 10,
    title: 'Graph Theory & Networks',
    category: 'algorithms',
    contests: 145,
    active: 28,
    bgAccent: 'bg-[#00F0FF]',
    topics: "Dijkstra | Floyd-Warshall | Tarjan's SCC | Max-Flow Min-Cut",
    icon: Workflow,
    isIde: true,
    problems: [
      {
        id: 1,
        title: "Dijkstra's Shortest Path",
        difficulty: 'Medium',
        topic: 'Priority Queue',
        submissions: 210,
        maxPoints: 100,
        status: 'solved',
        description: 'Given a directed weighted graph with non-negative edge weights, compute the shortest path from source vertex S to all other vertices.',
        sampleInput: '5 6 1\n1 2 4\n1 3 2\n2 3 1\n2 4 5\n3 4 8\n4 5 3',
        sampleOutput: '0 4 2 9 12'
      },
      {
        id: 2,
        title: "Tarjan's Strongly Connected Components",
        difficulty: 'Hard',
        topic: 'DFS Low-Link',
        submissions: 85,
        maxPoints: 100,
        status: 'unsolved',
        description: 'Find all Strongly Connected Components (SCCs) in a directed graph using DFS discovery times and low-link values in O(V+E).',
        sampleInput: '5 5\n1 0\n0 2\n2 1\n0 3\n3 4',
        sampleOutput: '[[4], [3], [1, 2, 0]]'
      }
    ]
  },

  // ─── SYSTEMS & LOW-LEVEL ──────────────────────────────
  {
    id: 11,
    title: 'Rust Systems & Concurrency',
    category: 'systems',
    contests: 174,
    active: 36,
    bgAccent: 'bg-[#FFDE59]',
    topics: 'Borrow Checker | Lifetimes | Arc<Mutex<T>> | Rayon | Crossbeam',
    icon: Cpu,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'Thread-Safe Lock-Free Ring Buffer',
        difficulty: 'Hard',
        topic: 'Atomics & Memory Ordering',
        submissions: 98,
        maxPoints: 100,
        status: 'unsolved',
        description: 'Implement a lock-free Single Producer Single Consumer (SPSC) ring buffer in Rust using AtomicUsize with Acquire/Release memory ordering semantics.',
        sampleInput: 'CAPACITY = 1024, THREADS = 2',
        sampleOutput: 'ZERO_DATA_RACES_CONFIRMED'
      },
      {
        id: 2,
        title: 'Zero-Copy Parser with Lifetimes',
        difficulty: 'Medium',
        topic: 'Lifetimes',
        submissions: 165,
        maxPoints: 100,
        status: 'solved',
        description: 'Parse an HTTP request buffer without heap allocations by holding slices `&\'a str` directly borrowing from the raw input payload.',
        sampleInput: 'GET /api/v1/health HTTP/1.1\\r\\nHost: hypers.sh\\r\\n\\r\\n',
        sampleOutput: 'Parsed: method=GET path=/api/v1/health'
      },
      {
        id: 3,
        title: 'Custom Memory Allocator Arena',
        difficulty: 'Hard',
        topic: 'Unsafe Rust',
        submissions: 74,
        maxPoints: 100,
        status: 'unsolved',
        description: 'Construct a bump allocator that manages an uninitialized slice of raw bytes `*mut u8` with proper 8-byte alignment alignment checks.',
        sampleInput: 'ALLOCATE 64 BYTES ALIGN 8',
        sampleOutput: 'PTR_0x7FFF8000'
      }
    ]
  },
  {
    id: 12,
    title: 'Linux Kernel & OS Internals',
    category: 'systems',
    contests: 89,
    active: 14,
    bgAccent: 'bg-[#FF52D9]',
    topics: 'Syscalls | epoll() | Virtual Memory mmap | Kernel Modules | Ring 0',
    icon: Terminal,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'High-Performance epoll Event Loop',
        difficulty: 'Hard',
        topic: 'I/O Multiplexing',
        submissions: 110,
        maxPoints: 100,
        status: 'solved',
        description: 'Build an edge-triggered epoll event loop in C handling 50,000 concurrent socket file descriptors without blocking the main worker thread.',
        sampleInput: 'EPOLL_CTL_ADD socket_fd EPOLLIN | EPOLLET',
        sampleOutput: 'EVENTS_DISPATCHED_OK'
      },
      {
        id: 2,
        title: 'Virtual Page Table Walk Simulator',
        difficulty: 'Medium',
        topic: 'MMU & Paging',
        submissions: 140,
        maxPoints: 100,
        status: 'unsolved',
        description: 'Simulate a 4-level x86-64 page table walk (PML4 -> PDPT -> PD -> PT -> Physical Frame) given a 64-bit virtual memory address.',
        sampleInput: 'VA: 0x7FFF5FBFF800',
        sampleOutput: 'PHYSICAL_ADDR: 0x1A2B3800'
      }
    ]
  },
  {
    id: 13,
    title: 'C++20 High Performance & STL',
    category: 'systems',
    contests: 215,
    active: 41,
    bgAccent: 'bg-[#00F0FF]',
    topics: 'Concepts | Constexpr Metaprogramming | SIMD | std::pmr | RVO',
    icon: Code2,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'SIMD Vectorized Dot Product',
        difficulty: 'Hard',
        topic: 'AVX2 Intrinsic Math',
        submissions: 132,
        maxPoints: 100,
        status: 'unsolved',
        description: 'Write an AVX2-accelerated 256-bit vectorized float dot product that executes in 8 elements per cycle using `_mm256_fmadd_ps`.',
        sampleInput: 'a = [1.0, 2.0, ... 1024], b = [2.0, 3.0, ... 1024]',
        sampleOutput: 'DOT_PRODUCT = 1048576.00'
      },
      {
        id: 2,
        title: 'Custom Polymorphic Memory Resource (std::pmr)',
        difficulty: 'Medium',
        topic: 'Memory Pools',
        submissions: 178,
        maxPoints: 100,
        status: 'solved',
        description: 'Implement a monotonic buffer resource that eliminates malloc calls inside hot loops for std::pmr::vector.',
        sampleInput: '100,000 vector pushes',
        sampleOutput: '0 MALLOCS CALLED'
      }
    ]
  },
  {
    id: 14,
    title: 'WebAssembly & AOT Compilers',
    category: 'systems',
    contests: 64,
    active: 9,
    bgAccent: 'bg-[#CCFF00]',
    topics: 'Wasm Bytecode | Memory Linear Buffer | SIMD128 | WASI Syscalls',
    icon: Globe,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'Direct Wasm Bytecode Encoder',
        difficulty: 'Hard',
        topic: 'Binary Format',
        submissions: 58,
        maxPoints: 100,
        status: 'unsolved',
        description: 'Hand-craft a valid Wasm binary module header (\\0asm) and export an `i32.add` function using raw bytecode hex tokens.',
        sampleInput: '00 61 73 6D 01 00 00 00',
        sampleOutput: 'MODULE_VALIDATED_V8'
      }
    ]
  },

  // ─── AI, ML & DATA ENGINEERING ────────────────────────
  {
    id: 6,
    title: 'Machine Learning Algorithms',
    category: 'ai_ml',
    contests: 186,
    active: 31,
    bgAccent: 'bg-[#FF8811]',
    topics: 'Pure NumPy | Gradient Descent | K-Means | PCA | Logistic Regression',
    icon: Brain,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'K-Means Clustering from Scratch',
        difficulty: 'Medium',
        topic: 'Unsupervised ML',
        submissions: 245,
        maxPoints: 100,
        status: 'solved',
        description: 'Implement the K-Means clustering algorithm using pure matrix operations. Compute Euclidean distance matrix and centroid convergence in < 50 iterations.',
        sampleInput: 'K = 3, N = 100 points',
        sampleOutput: 'CONVERGED: inertia = 14.2'
      },
      {
        id: 2,
        title: 'PCA Dimensionality Reduction',
        difficulty: 'Hard',
        topic: 'Eigen Decomposition',
        submissions: 130,
        maxPoints: 100,
        status: 'unsolved',
        description: 'Compute principal components by calculating the sample covariance matrix followed by SVD or eigen decomposition, projecting D dimensions down to K.',
        sampleInput: 'X: 1000 x 50 matrix, K = 3',
        sampleOutput: 'VARIANCE_EXPLAINED: 94.2%'
      }
    ]
  },
  {
    id: 15,
    title: 'Deep Learning & Neural Networks',
    category: 'ai_ml',
    contests: 142,
    active: 24,
    bgAccent: 'bg-[#00F0FF]',
    topics: 'Backprop Derivation | Attention Mechanism | Transformers | PyTorch',
    icon: Sparkles,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'Multi-Head Self Attention Math',
        difficulty: 'Hard',
        topic: 'Attention',
        submissions: 160,
        maxPoints: 100,
        status: 'unsolved',
        description: 'Implement scaled dot-product attention: softmax(Q * K^T / sqrt(d_k)) * V across 8 parallel heads with causal masking for autoregressive decoding.',
        sampleInput: 'Batch=2, Seq=16, D_model=64, Heads=8',
        sampleOutput: 'ATTENTION_WEIGHTS_SHAPE: [2, 8, 16, 16]'
      },
      {
        id: 2,
        title: 'Custom Autograd Backpropagation',
        difficulty: 'Hard',
        topic: 'Computation Graph',
        submissions: 95,
        maxPoints: 100,
        status: 'solved',
        description: 'Implement a micrograd-style reverse-mode autodiff computational graph supporting add, mul, relu, and tanh with recursive `.backward()`.',
        sampleInput: 'a = 2.0, b = -3.0, c = a * b + relu(a)',
        sampleOutput: 'dc/da = -2.0, dc/db = 2.0'
      }
    ]
  },
  {
    id: 16,
    title: 'AI Agent & LangGraph Flows',
    category: 'ai_ml',
    contests: 98,
    active: 22,
    bgAccent: 'bg-[#FFDE59]',
    topics: 'StateGraph | Reflection Loops | Tool Routing | Checkpoints',
    icon: Workflow,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'Cyclic Multi-Agent Reflection Loop',
        difficulty: 'Medium',
        topic: 'StateGraph',
        submissions: 140,
        maxPoints: 100,
        status: 'solved',
        description: 'Define a cyclic LangGraph state machine with an Actor, Critic, and Finalizer node that loops until the Critic evaluates code quality >= 0.95.',
        sampleInput: 'STATE: { draft: "code", attempts: 0, score: 0 }',
        sampleOutput: 'LOOP_CONVERGED_3_ITERATIONS'
      }
    ]
  },
  {
    id: 17,
    title: 'LLM Engineering & RAG Systems',
    category: 'ai_ml',
    contests: 125,
    active: 27,
    bgAccent: 'bg-[#FF52D9]',
    topics: 'Vector Embeddings | Hybrid Search | Reranking | Context Compression',
    icon: Layers,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'Reciprocal Rank Fusion (RRF) for Hybrid Search',
        difficulty: 'Medium',
        topic: 'RAG Retrieval',
        submissions: 180,
        maxPoints: 100,
        status: 'solved',
        description: 'Combine BM25 sparse keyword rankings and Cosine dense vector similarity rankings using reciprocal rank fusion with smoothing constant k=60.',
        sampleInput: 'Rankings BM25: [A, B, C], Dense: [B, A, D]',
        sampleOutput: 'TOP_FUSED: B (Score: 0.0328)'
      }
    ]
  },
  {
    id: 18,
    title: 'SQL & Relational DB Scaling',
    category: 'ai_ml',
    contests: 310,
    active: 58,
    bgAccent: 'bg-[#CCFF00]',
    topics: 'Window Functions | Recursive CTE | B-Tree Indexing | Query Planner',
    icon: Database,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'Consecutive Logins & Streak Analysis',
        difficulty: 'Medium',
        topic: 'Window Functions',
        submissions: 410,
        maxPoints: 100,
        status: 'solved',
        description: 'Write a SQL query using ROW_NUMBER() and date subtraction to find all users with at least 5 consecutive daily login streaks.',
        sampleInput: 'logins (user_id, login_date)',
        sampleOutput: 'user_id | streak_length'
      },
      {
        id: 2,
        title: 'Recursive Employee Hierarchy Traversal',
        difficulty: 'Medium',
        topic: 'Recursive CTE',
        submissions: 320,
        maxPoints: 100,
        status: 'solved',
        description: 'Traverse an organization chart where each employee has a manager_id. Output every subordinate with their organizational depth level.',
        sampleInput: 'employees (id, name, manager_id)',
        sampleOutput: 'id | name | depth'
      }
    ]
  },

  // ─── LANGUAGES & FRAMEWORKS ───────────────────────────
  {
    id: 2,
    title: 'Kotlin Basics & Android',
    category: 'languages',
    contests: 16,
    active: 2,
    bgAccent: 'bg-[#00F0FF]',
    topics: 'Variables | Functions | OOP | Coroutines | Collections | Null Safety',
    icon: Code,
    isIde: false,
    problems: kotlinContestData.problems
  },
  {
    id: 5,
    title: 'Python Mastery',
    category: 'languages',
    contests: 291,
    active: 34,
    bgAccent: 'bg-[#FFDE59]',
    topics: 'Generators | Decorators | Metaclasses | Asyncio | Memory Management',
    icon: Code2,
    isIde: true,
    problems: dpPythonData.problems.slice(0, 6)
  },
  {
    id: 19,
    title: 'Golang Microservices & Concurrency',
    category: 'languages',
    contests: 134,
    active: 29,
    bgAccent: 'bg-[#CCFF00]',
    topics: 'Goroutines | Channels | Context | Worker Pools | Mutex Sync',
    icon: Zap,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'Bounded Worker Pool with Context Cancellation',
        difficulty: 'Medium',
        topic: 'Concurrency',
        submissions: 220,
        maxPoints: 100,
        status: 'solved',
        description: 'Create a Go worker pool that processes jobs concurrently across 8 workers, graceful shutdown on SIGINT via context.WithCancel, and error group collection.',
        sampleInput: '100 tasks, 8 workers',
        sampleOutput: 'ALL_TASKS_COMPLETED_CLEANLY'
      }
    ]
  },
  {
    id: 20,
    title: 'TypeScript & Fullstack Architecture',
    category: 'languages',
    contests: 240,
    active: 48,
    bgAccent: 'bg-[#00F0FF]',
    topics: 'Conditional Types | Template Literals | Type Gymnastics | React Server Actions',
    icon: Brackets,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'Type-Safe Deep Property Resolver',
        difficulty: 'Hard',
        topic: 'Type Gymnastics',
        submissions: 160,
        maxPoints: 100,
        status: 'unsolved',
        description: 'Implement a type `DeepPath<T>` that computes dot-separated paths ("user.address.geo.lat") and infer corresponding value type `Get<T, P>`.',
        sampleInput: 'type O = { user: { name: string, age: number } }',
        sampleOutput: 'TYPE_CHECK_PASSED'
      }
    ]
  },

  // ─── INFRASTRUCTURE & SECURITY ────────────────────────
  {
    id: 21,
    title: 'Cloud Native & Kubernetes',
    category: 'infra_sec',
    contests: 156,
    active: 33,
    bgAccent: 'bg-[#CCFF00]',
    topics: 'Deployments | Ingress Routing | HPA | Service Meshes | CNI',
    icon: Cloud,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'Zero-Downtime Rolling Update & Probes',
        difficulty: 'Medium',
        topic: 'Kubernetes Spec',
        submissions: 210,
        maxPoints: 100,
        status: 'solved',
        description: 'Configure a Kubernetes deployment spec with maxSurge 25%, maxUnavailable 0, readinessProbe HTTP GET /healthz, and livenessProbe TCP port check.',
        sampleInput: 'spec: { replicas: 10 }',
        sampleOutput: 'VALID_YAML_MANIFEST'
      }
    ]
  },
  {
    id: 22,
    title: 'Cybersecurity & Ethical Hacking',
    category: 'infra_sec',
    contests: 118,
    active: 25,
    bgAccent: 'bg-[#FF0033]',
    topics: 'Buffer Overflows | Timing Attacks | Cryptography | JWT Exploits',
    icon: Shield,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'Constant-Time Byte Comparison',
        difficulty: 'Medium',
        topic: 'Timing Attacks',
        submissions: 175,
        maxPoints: 100,
        status: 'solved',
        description: 'Implement a cryptographic comparison function `crypto_verify(a, b)` that prevents timing side-channel attacks by evaluating every byte using bitwise XOR without early returns.',
        sampleInput: 'a = [0x41, 0x42], b = [0x41, 0x43]',
        sampleOutput: 'RETURNS_FALSE_IN_EQUAL_CYCLES'
      }
    ]
  },
  {
    id: 23,
    title: 'Web3 & Solidity Smart Contracts',
    category: 'infra_sec',
    contests: 88,
    active: 15,
    bgAccent: 'bg-[#FF52D9]',
    topics: 'EVM Opcodes | Reentrancy Guards | Gas Optimization | Merkle Drops',
    icon: Lock,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'Reentrancy Protected Vault',
        difficulty: 'Medium',
        topic: 'Solidity Security',
        submissions: 195,
        maxPoints: 100,
        status: 'solved',
        description: 'Fix a vulnerable Ether vault contract by enforcing the Checks-Effects-Interactions pattern and deploying a transient storage nonReentrant modifier.',
        sampleInput: 'withdraw(uint256 amount)',
        sampleOutput: 'REENTRANCY_EXPLOIT_BLOCKED'
      }
    ]
  },

  // ─── CAREER & INDUSTRY TRACKS ─────────────────────────
  {
    id: 1,
    title: 'Career-Bootcamp',
    category: 'career',
    contests: 80,
    active: 12,
    bgAccent: 'bg-[#FF52D9]',
    topics: 'Technical Interviews | System Design Basics | DSA Speeddrills',
    icon: Target,
    isIde: false,
    problems: kotlinContestData.problems.slice(0, 10)
  },
  {
    id: 8,
    title: 'Nagarro & Enterprise Prep',
    category: 'career',
    contests: 54,
    active: 5,
    bgAccent: 'bg-[#FF8811]',
    topics: 'Design Patterns | Core CS | Behavioral & Coding Diagnostics',
    icon: Briefcase,
    isIde: false,
    problems: kotlinContestData.problems.slice(10, 20)
  },
  {
    id: 24,
    title: 'Quantitative Finance & Low Latency',
    category: 'career',
    contests: 76,
    active: 16,
    bgAccent: 'bg-[#00F0FF]',
    topics: 'Order Book Matching | VWAP Algorithms | Fixed-Point Math | C++ Latency',
    icon: LineChart,
    isIde: true,
    problems: [
      {
        id: 1,
        title: 'Limit Order Book Matching Engine',
        difficulty: 'Hard',
        topic: 'Financial Systems',
        submissions: 88,
        maxPoints: 100,
        status: 'unsolved',
        description: 'Design a price-time priority (FIFO) order matching engine that handles incoming BUY and SELL limit/market orders in O(1) best price lookup.',
        sampleInput: 'BUY 100 @ 150.25, SELL 50 @ 150.20',
        sampleOutput: 'TRADE_EXECUTED: 50 @ 150.20'
      }
    ]
  }
];

export default contestsTracksData;
