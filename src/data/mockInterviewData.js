// ═══════════════════════════════════════════════════════════════
// AI Mock Interview — Question Bank
// 120+ role-specific questions with evaluation criteria
// ═══════════════════════════════════════════════════════════════

export const interviewQuestions = [

  // ──────────────────────────────────────────────────────────────
  // FRONTEND ENGINEER — Data Structures & Algorithms
  // ──────────────────────────────────────────────────────────────
  {
    id: 'fe-dsa-1',
    text: "Given a deeply nested comment thread (like Reddit), how would you flatten it for rendering while preserving depth information?",
    roles: ['Frontend Engineer', 'Fullstack'],
    format: 'Data Structures',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Amazon'],
    phase: 'core',
    evaluationCriteria: ['problem_solving', 'data_structures', 'optimization'],
    idealKeywords: ['tree traversal', 'DFS', 'BFS', 'recursion', 'stack', 'depth', 'flatten', 'iterative', 'queue'],
    followUps: [
      "What's the time and space complexity of your approach?",
      "How would you handle lazy-loading deeper levels?",
      "What if the comment tree has cycles (e.g., self-referencing)?"
    ],
    rubric: {
      weak: "Only mentions looping through array without tree structure awareness",
      average: "Uses recursion or DFS but doesn't discuss complexity or edge cases",
      strong: "Discusses DFS/BFS trade-offs, tracks depth, handles cycles, mentions virtualization for large trees"
    }
  },
  {
    id: 'fe-dsa-2',
    text: "Implement a debounce function from scratch. Walk me through how it works internally.",
    roles: ['Frontend Engineer', 'Fullstack'],
    format: 'Data Structures',
    difficulty: 'Easy',
    companies: ['Google', 'Amazon', 'Uber'],
    phase: 'warmup',
    evaluationCriteria: ['problem_solving', 'javascript', 'optimization'],
    idealKeywords: ['setTimeout', 'clearTimeout', 'closure', 'timer', 'delay', 'leading', 'trailing', 'cancel'],
    followUps: [
      "What's the difference between debounce and throttle?",
      "How would you add a 'leading' option?",
      "How would you implement a cancel method?"
    ],
    rubric: {
      weak: "Can't explain closure or setTimeout relationship",
      average: "Implements basic debounce but misses edge cases like context binding",
      strong: "Implements with proper 'this' binding, cancel, leading/trailing options, explains closure mechanics"
    }
  },
  {
    id: 'fe-dsa-3',
    text: "You have a virtual scrolling list with 100,000 items. How would you implement efficient search and filtering?",
    roles: ['Frontend Engineer'],
    format: 'Data Structures',
    difficulty: 'Hard',
    companies: ['Google', 'Meta', 'Netflix'],
    phase: 'deep_dive',
    evaluationCriteria: ['problem_solving', 'optimization', 'architecture'],
    idealKeywords: ['virtual scrolling', 'windowing', 'trie', 'index', 'web worker', 'binary search', 'memoization', 'intersection observer'],
    followUps: [
      "How would you handle fuzzy search across these items?",
      "What data structure would you use for the search index?",
      "How would you prevent UI blocking during search?"
    ],
    rubric: {
      weak: "Suggests filtering with Array.filter on every keystroke",
      average: "Mentions debouncing and virtualization but no indexing strategy",
      strong: "Discusses trie/inverted index, web workers for offloading, virtualized rendering, progressive search"
    }
  },
  {
    id: 'fe-dsa-4',
    text: "Explain the Virtual DOM diffing algorithm. How does React decide what to re-render?",
    roles: ['Frontend Engineer', 'Fullstack'],
    format: 'Data Structures',
    difficulty: 'Medium',
    companies: ['Meta', 'Google', 'Netflix'],
    phase: 'core',
    evaluationCriteria: ['technical_depth', 'architecture', 'optimization'],
    idealKeywords: ['virtual DOM', 'reconciliation', 'diffing', 'fiber', 'key prop', 'O(n)', 'heuristic', 'batch updates', 'shouldComponentUpdate', 'memo'],
    followUps: [
      "Why does React use keys in lists?",
      "What is React Fiber and how does it improve rendering?",
      "When would you use React.memo vs useMemo?"
    ],
    rubric: {
      weak: "Only says 'it compares old and new DOM'",
      average: "Explains tree diffing with O(n) heuristic but doesn't mention Fiber or keys",
      strong: "Explains heuristic assumptions, key-based reconciliation, Fiber architecture, concurrent rendering"
    }
  },
  {
    id: 'fe-dsa-5',
    text: "Implement a Least Recently Used (LRU) cache that could be used for client-side API response caching.",
    roles: ['Frontend Engineer', 'Fullstack', 'Backend Engineer'],
    format: 'Data Structures',
    difficulty: 'Hard',
    companies: ['Google', 'Meta', 'Amazon', 'Apple'],
    phase: 'core',
    evaluationCriteria: ['problem_solving', 'data_structures', 'coding'],
    idealKeywords: ['hash map', 'doubly linked list', 'O(1)', 'get', 'put', 'capacity', 'eviction', 'Map', 'head', 'tail'],
    followUps: [
      "How would you add TTL (time-to-live) expiration?",
      "Could you use JavaScript's Map for this? Why?",
      "How would this handle concurrent requests for the same key?"
    ],
    rubric: {
      weak: "Uses array with shift/push — O(n) operations",
      average: "Uses Map with delete/set pattern but can't explain why it maintains order",
      strong: "Implements with HashMap + doubly linked list or leverages Map's insertion order, discusses TTL, edge cases"
    }
  },

  // ──────────────────────────────────────────────────────────────
  // FRONTEND ENGINEER — System Design
  // ──────────────────────────────────────────────────────────────
  {
    id: 'fe-sd-1',
    text: "Design a real-time collaborative text editor like Google Docs. Focus on the frontend architecture.",
    roles: ['Frontend Engineer', 'Fullstack'],
    format: 'System Design',
    difficulty: 'Hard',
    companies: ['Google', 'Meta', 'Microsoft'],
    phase: 'deep_dive',
    evaluationCriteria: ['architecture', 'system_design', 'problem_solving'],
    idealKeywords: ['CRDT', 'OT', 'operational transform', 'WebSocket', 'cursor position', 'conflict resolution', 'event sourcing', 'undo/redo'],
    followUps: [
      "How would you handle cursor positions of multiple users?",
      "What happens when two users edit the same line simultaneously?",
      "How would you implement undo/redo in a collaborative context?"
    ],
    rubric: {
      weak: "Only mentions WebSocket without conflict resolution strategy",
      average: "Mentions OT or CRDT but can't explain how conflicts are resolved",
      strong: "Explains OT vs CRDT trade-offs, cursor awareness, operation log, presence system, offline support"
    }
  },
  {
    id: 'fe-sd-2',
    text: "Design the frontend architecture for a dashboard that displays real-time data from 20 different microservices.",
    roles: ['Frontend Engineer', 'Fullstack'],
    format: 'System Design',
    difficulty: 'Hard',
    companies: ['Netflix', 'Google', 'Amazon'],
    phase: 'core',
    evaluationCriteria: ['architecture', 'optimization', 'system_design'],
    idealKeywords: ['WebSocket', 'SSE', 'polling', 'state management', 'micro-frontend', 'BFF', 'aggregation', 'caching', 'error boundary', 'retry'],
    followUps: [
      "How do you handle a service going down?",
      "How would you prevent one slow service from blocking the entire dashboard?",
      "What caching strategy would you use?"
    ],
    rubric: {
      weak: "Fetches all 20 APIs sequentially on mount",
      average: "Uses parallel fetching and shows loading states but no resilience",
      strong: "Discusses BFF pattern, WebSocket/SSE for real-time, circuit breakers, independent error boundaries, stale-while-revalidate"
    }
  },
  {
    id: 'fe-sd-3',
    text: "Design the frontend for an image-heavy social media feed like Instagram. Focus on performance.",
    roles: ['Frontend Engineer'],
    format: 'System Design',
    difficulty: 'Medium',
    companies: ['Meta', 'Google', 'Apple'],
    phase: 'core',
    evaluationCriteria: ['optimization', 'architecture', 'user_experience'],
    idealKeywords: ['lazy loading', 'intersection observer', 'srcset', 'responsive images', 'CDN', 'blur hash', 'skeleton', 'infinite scroll', 'virtualization', 'WebP', 'AVIF'],
    followUps: [
      "How would you handle images of varying aspect ratios?",
      "What loading strategy gives the best perceived performance?",
      "How would you implement offline support?"
    ],
    rubric: {
      weak: "Loads all images upfront with no optimization",
      average: "Uses lazy loading but doesn't discuss format optimization or placeholders",
      strong: "Discusses blur hash placeholders, responsive srcset, modern formats, virtualized scroll, preloading visible items"
    }
  },

  // ──────────────────────────────────────────────────────────────
  // BACKEND ENGINEER — Data Structures & Algorithms
  // ──────────────────────────────────────────────────────────────
  {
    id: 'be-dsa-1',
    text: "Design and implement a thread-safe rate limiter using the token bucket algorithm.",
    roles: ['Backend Engineer', 'Fullstack'],
    format: 'Data Structures',
    difficulty: 'Hard',
    companies: ['Google', 'Amazon', 'Stripe', 'Cloudflare'],
    phase: 'core',
    evaluationCriteria: ['problem_solving', 'concurrency', 'data_structures'],
    idealKeywords: ['token bucket', 'mutex', 'atomic', 'refill rate', 'capacity', 'thread-safe', 'lock', 'timestamp', 'sliding window'],
    followUps: [
      "How would you make this work across multiple servers?",
      "What's the difference between token bucket and leaky bucket?",
      "How would you handle burst traffic?"
    ],
    rubric: {
      weak: "Can't explain token bucket mechanics or concurrency concerns",
      average: "Implements basic rate limiter but not thread-safe",
      strong: "Implements thread-safe version with proper locking, discusses distributed rate limiting with Redis, burst handling"
    }
  },
  {
    id: 'be-dsa-2',
    text: "Given a stream of events arriving in real-time, find the top K most frequent events in the last 5 minutes.",
    roles: ['Backend Engineer', 'Fullstack', 'Data Scientist'],
    format: 'Data Structures',
    difficulty: 'Hard',
    companies: ['Google', 'Amazon', 'Netflix'],
    phase: 'deep_dive',
    evaluationCriteria: ['problem_solving', 'data_structures', 'optimization'],
    idealKeywords: ['sliding window', 'min heap', 'hash map', 'count-min sketch', 'time bucket', 'priority queue', 'expiration'],
    followUps: [
      "How would you handle millions of unique events efficiently?",
      "What probabilistic data structure could approximate this?",
      "How would you distribute this across multiple nodes?"
    ],
    rubric: {
      weak: "Stores all events and sorts — no windowing or efficiency",
      average: "Uses hash map + heap but doesn't handle window expiration",
      strong: "Discusses time-bucketed counts, count-min sketch for memory efficiency, heap for top-K, distributed aggregation"
    }
  },
  {
    id: 'be-dsa-3',
    text: "Implement a consistent hashing ring. Explain why it's used in distributed systems.",
    roles: ['Backend Engineer'],
    format: 'Data Structures',
    difficulty: 'Hard',
    companies: ['Amazon', 'Google', 'Netflix', 'Uber'],
    phase: 'deep_dive',
    evaluationCriteria: ['problem_solving', 'data_structures', 'system_design'],
    idealKeywords: ['hash ring', 'virtual nodes', 'partition', 'replication', 'minimal disruption', 'modular hashing', 'node addition', 'load balancing'],
    followUps: [
      "Why use virtual nodes?",
      "How does this compare to modular hashing?",
      "How would you handle data replication on the ring?"
    ],
    rubric: {
      weak: "Confuses with regular hashing or can't explain the ring concept",
      average: "Explains ring but doesn't discuss virtual nodes or rebalancing",
      strong: "Implements ring with virtual nodes, explains minimal key redistribution, discusses replication strategies"
    }
  },
  {
    id: 'be-dsa-4',
    text: "How would you design an efficient task scheduler that supports delayed execution and recurring tasks?",
    roles: ['Backend Engineer', 'Fullstack'],
    format: 'Data Structures',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Microsoft'],
    phase: 'core',
    evaluationCriteria: ['problem_solving', 'data_structures', 'architecture'],
    idealKeywords: ['priority queue', 'min heap', 'timer wheel', 'cron', 'thread pool', 'delayed queue', 'sorted set', 'Redis ZSET'],
    followUps: [
      "How do you ensure a task runs exactly once in a distributed system?",
      "What happens if the scheduler crashes mid-execution?",
      "How would you scale this to millions of scheduled tasks?"
    ],
    rubric: {
      weak: "Uses setTimeout/setInterval without deeper thought",
      average: "Mentions priority queue but doesn't address persistence or failure recovery",
      strong: "Discusses min-heap or timer wheel, persistence via database/Redis, idempotency, distributed locking"
    }
  },
  {
    id: 'be-dsa-5',
    text: "Explain how a B+ tree works and why databases prefer it over binary search trees for indexing.",
    roles: ['Backend Engineer', 'Fullstack'],
    format: 'Data Structures',
    difficulty: 'Medium',
    companies: ['Google', 'Amazon', 'Microsoft', 'Oracle'],
    phase: 'core',
    evaluationCriteria: ['technical_depth', 'data_structures'],
    idealKeywords: ['B+ tree', 'leaf nodes', 'linked list', 'disk I/O', 'fan-out', 'page', 'block', 'range query', 'balanced', 'internal nodes'],
    followUps: [
      "How does a B+ tree handle insertions that cause node splits?",
      "Why are B+ trees better than hash indexes for range queries?",
      "What is the typical fan-out factor in production databases?"
    ],
    rubric: {
      weak: "Can't differentiate B+ tree from BST or B-tree",
      average: "Knows leaves are linked but doesn't explain disk I/O optimization",
      strong: "Explains high fan-out reducing disk seeks, leaf linking for range scans, comparison with LSM trees"
    }
  },

  // ──────────────────────────────────────────────────────────────
  // BACKEND ENGINEER — System Design
  // ──────────────────────────────────────────────────────────────
  {
    id: 'be-sd-1',
    text: "Design a URL shortener like bit.ly that handles 100 million URLs per month.",
    roles: ['Backend Engineer', 'Fullstack'],
    format: 'System Design',
    difficulty: 'Hard',
    companies: ['Google', 'Meta', 'Amazon'],
    phase: 'core',
    evaluationCriteria: ['system_design', 'architecture', 'scalability'],
    idealKeywords: ['base62', 'hash', 'NoSQL', 'Redis', 'CDN', 'read-heavy', 'cache', 'sharding', 'analytics', 'TTL', 'collision'],
    followUps: [
      "How would you handle hash collisions?",
      "How would you implement analytics for click tracking?",
      "How would you handle expiring URLs?"
    ],
    rubric: {
      weak: "No capacity estimation, single server design",
      average: "Covers basic architecture but misses caching, sharding, or analytics",
      strong: "Full design with capacity estimates, base62 encoding, Redis caching, sharding strategy, analytics pipeline"
    }
  },
  {
    id: 'be-sd-2',
    text: "Design a notification system that supports push, email, and SMS at scale.",
    roles: ['Backend Engineer', 'Fullstack'],
    format: 'System Design',
    difficulty: 'Hard',
    companies: ['Amazon', 'Google', 'Uber', 'Meta'],
    phase: 'deep_dive',
    evaluationCriteria: ['system_design', 'architecture', 'scalability'],
    idealKeywords: ['message queue', 'Kafka', 'SQS', 'priority', 'retry', 'exponential backoff', 'template', 'rate limiting', 'preference', 'APNs', 'FCM'],
    followUps: [
      "How do you ensure notifications are delivered exactly once?",
      "How would you handle user preference opt-outs?",
      "How would you prioritize urgent notifications?"
    ],
    rubric: {
      weak: "Direct API calls to SMS/email providers with no queue",
      average: "Uses message queue but doesn't discuss retry, priority, or user preferences",
      strong: "Full pipeline with queue, workers, retry with backoff, priority lanes, preference service, rate limiting"
    }
  },
  {
    id: 'be-sd-3',
    text: "Design a real-time chat application like Slack that supports channels, DMs, and file sharing.",
    roles: ['Backend Engineer', 'Fullstack'],
    format: 'System Design',
    difficulty: 'Hard',
    companies: ['Meta', 'Google', 'Microsoft', 'Slack'],
    phase: 'core',
    evaluationCriteria: ['system_design', 'architecture', 'scalability'],
    idealKeywords: ['WebSocket', 'message queue', 'fan-out', 'presence', 'Cassandra', 'Redis', 'pub-sub', 'read receipts', 'encryption', 'CDN'],
    followUps: [
      "How would you handle message ordering in distributed systems?",
      "How do you show online/offline status efficiently?",
      "How would you implement message search?"
    ],
    rubric: {
      weak: "HTTP polling with no real-time capability",
      average: "WebSocket connection but no discussion of scaling, fan-out, or storage",
      strong: "WebSocket with connection manager, pub-sub for channels, Cassandra for messages, presence service, search via Elasticsearch"
    }
  },
  {
    id: 'be-sd-4',
    text: "Design an API gateway that handles authentication, rate limiting, and routing for 50+ microservices.",
    roles: ['Backend Engineer', 'DevOps Engineer'],
    format: 'System Design',
    difficulty: 'Hard',
    companies: ['Amazon', 'Google', 'Netflix', 'Stripe'],
    phase: 'deep_dive',
    evaluationCriteria: ['system_design', 'architecture', 'security'],
    idealKeywords: ['reverse proxy', 'JWT', 'OAuth', 'rate limiting', 'circuit breaker', 'service discovery', 'load balancing', 'caching', 'logging', 'Kong', 'Envoy'],
    followUps: [
      "How would you handle cascading failures?",
      "What's your strategy for API versioning?",
      "How would you implement request tracing across services?"
    ],
    rubric: {
      weak: "Single proxy with basic routing, no resilience patterns",
      average: "Covers routing and auth but misses circuit breakers, tracing, or versioning",
      strong: "Full gateway with auth, rate limiting, circuit breakers, distributed tracing, health checks, canary routing"
    }
  },

  // ──────────────────────────────────────────────────────────────
  // DATA SCIENTIST — Machine Learning
  // ──────────────────────────────────────────────────────────────
  {
    id: 'ds-ml-1',
    text: "Explain the bias-variance tradeoff. How do you diagnose whether your model is underfitting or overfitting?",
    roles: ['Data Scientist', 'ML Engineer'],
    format: 'Machine Learning',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Amazon', 'Netflix'],
    phase: 'warmup',
    evaluationCriteria: ['technical_depth', 'problem_solving', 'statistics'],
    idealKeywords: ['bias', 'variance', 'underfitting', 'overfitting', 'training error', 'validation error', 'regularization', 'cross-validation', 'learning curves', 'complexity'],
    followUps: [
      "How would you reduce overfitting in a neural network?",
      "What regularization techniques do you know?",
      "How do learning curves help diagnose the problem?"
    ],
    rubric: {
      weak: "Can't clearly explain bias vs variance or confuses them",
      average: "Explains the tradeoff but doesn't discuss practical diagnosis techniques",
      strong: "Explains with learning curves, discusses regularization (L1/L2, dropout, early stopping), cross-validation strategies"
    }
  },
  {
    id: 'ds-ml-2',
    text: "You're building a recommendation system for a streaming platform. Walk me through your approach from data to deployment.",
    roles: ['Data Scientist', 'ML Engineer'],
    format: 'Machine Learning',
    difficulty: 'Hard',
    companies: ['Netflix', 'Amazon', 'Google', 'Apple'],
    phase: 'core',
    evaluationCriteria: ['system_design', 'problem_solving', 'architecture'],
    idealKeywords: ['collaborative filtering', 'content-based', 'hybrid', 'matrix factorization', 'embeddings', 'cold start', 'A/B testing', 'feature engineering', 'online/offline', 'candidate generation', 'ranking'],
    followUps: [
      "How do you handle the cold start problem for new users?",
      "How would you evaluate your recommendation system offline vs online?",
      "What metrics would you optimize for?"
    ],
    rubric: {
      weak: "Only mentions collaborative filtering with no implementation details",
      average: "Describes a reasonable pipeline but misses cold start, evaluation, or A/B testing",
      strong: "Two-stage system (candidate gen + ranking), hybrid approach, cold start strategies, online evaluation with A/B tests"
    }
  },
  {
    id: 'ds-ml-3',
    text: "Explain how gradient descent works. What are the differences between batch, mini-batch, and stochastic gradient descent?",
    roles: ['Data Scientist', 'ML Engineer'],
    format: 'Machine Learning',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Amazon'],
    phase: 'core',
    evaluationCriteria: ['technical_depth', 'optimization', 'mathematics'],
    idealKeywords: ['gradient', 'loss function', 'learning rate', 'convergence', 'batch size', 'stochastic', 'mini-batch', 'momentum', 'Adam', 'local minima', 'saddle point'],
    followUps: [
      "What is the Adam optimizer and why is it popular?",
      "How do you choose the right learning rate?",
      "What is learning rate scheduling?"
    ],
    rubric: {
      weak: "Vague understanding of 'it adjusts weights to minimize error'",
      average: "Explains basic mechanics but can't compare SGD variants or discuss optimizers",
      strong: "Clear mathematical intuition, compares all three variants, discusses Adam/RMSprop, learning rate scheduling, convergence properties"
    }
  },
  {
    id: 'ds-ml-4',
    text: "How would you design an A/B test to evaluate a new search ranking algorithm? What metrics would you track?",
    roles: ['Data Scientist', 'Product Manager'],
    format: 'Machine Learning',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Amazon', 'Netflix'],
    phase: 'core',
    evaluationCriteria: ['statistics', 'problem_solving', 'product_sense'],
    idealKeywords: ['hypothesis', 'control', 'treatment', 'sample size', 'statistical significance', 'p-value', 'power', 'CTR', 'NDCG', 'MRR', 'guardrail metrics', 'novelty effect'],
    followUps: [
      "How do you determine the required sample size?",
      "What if the metric improves for one segment but hurts another?",
      "How do you handle multiple comparisons?"
    ],
    rubric: {
      weak: "Just 'split traffic 50/50 and compare results'",
      average: "Covers hypothesis testing and metrics but misses sample size calculation or guardrails",
      strong: "Full experimental design with power analysis, guardrail metrics, segment analysis, novelty effect consideration"
    }
  },
  {
    id: 'ds-ml-5',
    text: "Explain the difference between precision and recall. When would you prioritize one over the other?",
    roles: ['Data Scientist', 'ML Engineer'],
    format: 'Machine Learning',
    difficulty: 'Easy',
    companies: ['Google', 'Amazon', 'Meta'],
    phase: 'warmup',
    evaluationCriteria: ['technical_depth', 'problem_solving'],
    idealKeywords: ['true positive', 'false positive', 'false negative', 'precision', 'recall', 'F1', 'threshold', 'ROC', 'AUC', 'confusion matrix'],
    followUps: [
      "What is the F1 score and when is it useful?",
      "How does changing the classification threshold affect precision and recall?",
      "Draw the ROC curve and explain AUC."
    ],
    rubric: {
      weak: "Can't define precision and recall correctly",
      average: "Defines both but can't give real-world examples of when to prioritize each",
      strong: "Clear definitions with examples (spam filter vs disease detection), discusses F1, ROC-AUC, threshold tuning"
    }
  },
  {
    id: 'ds-ml-6',
    text: "You have a dataset with 95% class imbalance. How do you handle this for building a classifier?",
    roles: ['Data Scientist', 'ML Engineer'],
    format: 'Machine Learning',
    difficulty: 'Medium',
    companies: ['Google', 'Amazon', 'Stripe'],
    phase: 'core',
    evaluationCriteria: ['problem_solving', 'technical_depth'],
    idealKeywords: ['SMOTE', 'oversampling', 'undersampling', 'class weights', 'stratified', 'AUC', 'precision-recall curve', 'focal loss', 'anomaly detection', 'ensemble'],
    followUps: [
      "Why is accuracy misleading for imbalanced datasets?",
      "What is SMOTE and how does it work?",
      "Would you consider framing this as an anomaly detection problem?"
    ],
    rubric: {
      weak: "Just trains a model and reports accuracy",
      average: "Mentions oversampling/undersampling but not metrics concerns",
      strong: "Discusses multiple strategies (SMOTE, class weights, focal loss), proper metrics (PR-AUC), stratified splits, ensemble methods"
    }
  },

  // ──────────────────────────────────────────────────────────────
  // ENGINEERING MANAGER — Behavioral / Leadership
  // ──────────────────────────────────────────────────────────────
  {
    id: 'em-beh-1',
    text: "Tell me about a time you had to make a difficult technical decision with incomplete information. What was the outcome?",
    roles: ['Engineering Manager', 'Backend Engineer', 'Frontend Engineer', 'Fullstack'],
    format: 'Behavioral',
    difficulty: 'Medium',
    companies: ['Google', 'Amazon', 'Meta', 'Apple'],
    phase: 'core',
    evaluationCriteria: ['leadership', 'communication', 'decision_making'],
    idealKeywords: ['trade-off', 'stakeholders', 'risk', 'data-driven', 'reversible', 'one-way door', 'two-way door', 'alignment', 'retrospective'],
    followUps: [
      "What would you do differently if you could go back?",
      "How did you communicate the risk to stakeholders?",
      "How did you evaluate whether the decision was correct after the fact?"
    ],
    rubric: {
      weak: "Vague story without clear situation, action, or result",
      average: "Follows STAR format but doesn't show decision-making framework",
      strong: "Clear STAR, discusses trade-offs explicitly, shows data-driven approach, reflects on learning"
    }
  },
  {
    id: 'em-beh-2',
    text: "How do you handle a situation where two senior engineers on your team have a fundamental disagreement about the architecture?",
    roles: ['Engineering Manager'],
    format: 'Behavioral',
    difficulty: 'Hard',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft'],
    phase: 'core',
    evaluationCriteria: ['leadership', 'conflict_resolution', 'communication'],
    idealKeywords: ['facilitate', 'data', 'proof of concept', 'trade-offs', 'RFC', 'design doc', 'alignment', 'empathy', 'one-on-one', 'decision framework'],
    followUps: [
      "What if they still can't agree after discussion?",
      "How do you prevent this from becoming personal?",
      "When would you step in and make the final decision yourself?"
    ],
    rubric: {
      weak: "Says 'I would just decide' — no facilitation or empathy",
      average: "Mentions hearing both sides but no structured approach",
      strong: "Facilitates with design docs/RFCs, focuses on data over opinions, creates safe disagreement, knows when to decide"
    }
  },
  {
    id: 'em-beh-3',
    text: "Describe how you would onboard a new engineer to your team. What does their first 30/60/90 days look like?",
    roles: ['Engineering Manager'],
    format: 'Behavioral',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Amazon', 'Stripe'],
    phase: 'core',
    evaluationCriteria: ['leadership', 'planning', 'empathy'],
    idealKeywords: ['buddy', 'mentor', 'onboarding doc', 'small PR', 'ramp-up', 'one-on-one', 'expectations', 'feedback loop', 'pair programming', 'context'],
    followUps: [
      "How do you measure if onboarding was successful?",
      "How do you adjust onboarding for someone senior vs junior?",
      "What's the most common mistake teams make with onboarding?"
    ],
    rubric: {
      weak: "Just 'give them docs and let them figure it out'",
      average: "Has a plan but it's rigid — doesn't adjust for experience level",
      strong: "Structured 30/60/90 with buddy, small wins, feedback loops, adjusted for seniority, clear success metrics"
    }
  },
  {
    id: 'em-beh-4',
    text: "How do you handle underperformance on your team? Walk me through your approach.",
    roles: ['Engineering Manager'],
    format: 'Behavioral',
    difficulty: 'Hard',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft'],
    phase: 'deep_dive',
    evaluationCriteria: ['leadership', 'empathy', 'decision_making'],
    idealKeywords: ['one-on-one', 'expectations', 'feedback', 'PIP', 'coaching', 'root cause', 'support', 'documentation', 'improvement plan', 'empathy'],
    followUps: [
      "How do you distinguish between a skills gap and a motivation issue?",
      "At what point do you involve HR?",
      "How do you protect team morale while addressing underperformance?"
    ],
    rubric: {
      weak: "Jumps to PIP or firing without investigation",
      average: "Mentions feedback but no structured improvement plan",
      strong: "Identifies root cause first, provides support/coaching, sets clear expectations with timeline, documents, shows empathy"
    }
  },
  {
    id: 'em-beh-5',
    text: "Tell me about a project that failed or was significantly delayed. What happened and what did you learn?",
    roles: ['Engineering Manager', 'Backend Engineer', 'Frontend Engineer', 'Fullstack'],
    format: 'Behavioral',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta', 'Apple'],
    phase: 'core',
    evaluationCriteria: ['leadership', 'self_awareness', 'communication'],
    idealKeywords: ['retrospective', 'root cause', 'scope creep', 'communication', 'estimation', 'stakeholder', 'learning', 'process improvement', 'accountability'],
    followUps: [
      "What process changes did you implement afterwards?",
      "How did you communicate the failure to leadership?",
      "How do you prevent similar failures now?"
    ],
    rubric: {
      weak: "Blames others or denies failures",
      average: "Admits failure but learning is shallow",
      strong: "Takes ownership, does root cause analysis, implements process changes, shows growth mindset"
    }
  },

  // ──────────────────────────────────────────────────────────────
  // DEVOPS ENGINEER
  // ──────────────────────────────────────────────────────────────
  {
    id: 'devops-1',
    text: "Design a CI/CD pipeline for a monorepo with 10 microservices. How do you handle selective builds and deployments?",
    roles: ['DevOps Engineer', 'Backend Engineer'],
    format: 'System Design',
    difficulty: 'Hard',
    companies: ['Google', 'Amazon', 'Netflix', 'Uber'],
    phase: 'core',
    evaluationCriteria: ['architecture', 'system_design', 'automation'],
    idealKeywords: ['monorepo', 'affected services', 'dependency graph', 'caching', 'parallel', 'canary', 'blue-green', 'rollback', 'Bazel', 'Nx', 'artifact'],
    followUps: [
      "How do you detect which services are affected by a code change?",
      "What's your rollback strategy?",
      "How do you handle database migrations in the pipeline?"
    ],
    rubric: {
      weak: "Builds and deploys everything on every commit",
      average: "Detects changes but no caching, parallelism, or deployment strategy",
      strong: "Dependency graph for selective builds, build caching, parallel testing, canary deployments, automated rollback"
    }
  },
  {
    id: 'devops-2',
    text: "Your production service is experiencing intermittent 500 errors. Walk me through your debugging process.",
    roles: ['DevOps Engineer', 'Backend Engineer'],
    format: 'Data Structures',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Netflix'],
    phase: 'core',
    evaluationCriteria: ['problem_solving', 'debugging', 'observability'],
    idealKeywords: ['logs', 'metrics', 'traces', 'dashboard', 'error rate', 'latency', 'deployment', 'rollback', 'correlation', 'Grafana', 'Prometheus', 'ELK'],
    followUps: [
      "How do you correlate errors across microservices?",
      "What monitoring would you set up to catch this earlier?",
      "How do you decide when to rollback vs hot-fix?"
    ],
    rubric: {
      weak: "Checks server logs and restarts the service",
      average: "Uses monitoring tools but no systematic debugging methodology",
      strong: "Systematic approach: check metrics → correlate with deploys → trace requests → isolate root cause → mitigate → post-mortem"
    }
  },
  {
    id: 'devops-3',
    text: "Explain the difference between containers and VMs. When would you use each?",
    roles: ['DevOps Engineer'],
    format: 'Data Structures',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Microsoft'],
    phase: 'warmup',
    evaluationCriteria: ['technical_depth', 'architecture'],
    idealKeywords: ['kernel', 'hypervisor', 'isolation', 'Docker', 'cgroups', 'namespaces', 'image', 'lightweight', 'portability', 'orchestration', 'Kubernetes'],
    followUps: [
      "What security concerns are specific to containers?",
      "How does Kubernetes manage container lifecycle?",
      "When would you still prefer VMs over containers?"
    ],
    rubric: {
      weak: "Only says containers are lighter — no technical depth",
      average: "Explains OS-level vs hardware-level virtualization but no use case discussion",
      strong: "Explains cgroups/namespaces, compares isolation/security/performance, discusses orchestration, gives clear use cases"
    }
  },
  {
    id: 'devops-4',
    text: "How would you implement blue-green deployment for a stateful service?",
    roles: ['DevOps Engineer', 'Backend Engineer'],
    format: 'System Design',
    difficulty: 'Hard',
    companies: ['Amazon', 'Netflix', 'Google'],
    phase: 'deep_dive',
    evaluationCriteria: ['system_design', 'architecture', 'problem_solving'],
    idealKeywords: ['blue-green', 'load balancer', 'database migration', 'backward compatible', 'feature flag', 'health check', 'sticky session', 'rollback', 'drain connections'],
    followUps: [
      "How do you handle database schema changes during blue-green deployment?",
      "What if the new version has a different cache schema?",
      "How do you handle in-flight requests during the switch?"
    ],
    rubric: {
      weak: "Describes blue-green for stateless services only",
      average: "Mentions database concerns but no concrete solution",
      strong: "Backward-compatible DB migrations, connection draining, feature flags, health checks, rollback procedure"
    }
  },

  // ──────────────────────────────────────────────────────────────
  // ML ENGINEER
  // ──────────────────────────────────────────────────────────────
  {
    id: 'mle-1',
    text: "How would you design an ML pipeline for real-time fraud detection in payment transactions?",
    roles: ['ML Engineer', 'Data Scientist'],
    format: 'Machine Learning',
    difficulty: 'Hard',
    companies: ['Stripe', 'Amazon', 'Google', 'Meta'],
    phase: 'core',
    evaluationCriteria: ['system_design', 'problem_solving', 'architecture'],
    idealKeywords: ['feature store', 'real-time', 'batch', 'streaming', 'Kafka', 'latency', 'model serving', 'feature engineering', 'class imbalance', 'false positive'],
    followUps: [
      "How do you handle concept drift in fraud patterns?",
      "What's your strategy for feature engineering?",
      "How do you balance false positives vs false negatives?"
    ],
    rubric: {
      weak: "Batch model with no real-time consideration",
      average: "Mentions real-time serving but no feature store or monitoring",
      strong: "Real-time + batch features, feature store, model monitoring, concept drift detection, human-in-the-loop for edge cases"
    }
  },
  {
    id: 'mle-2',
    text: "Explain the Transformer architecture. Why has it become dominant in NLP?",
    roles: ['ML Engineer', 'Data Scientist'],
    format: 'Machine Learning',
    difficulty: 'Hard',
    companies: ['Google', 'Meta', 'Amazon', 'Apple'],
    phase: 'deep_dive',
    evaluationCriteria: ['technical_depth', 'architecture'],
    idealKeywords: ['self-attention', 'multi-head', 'positional encoding', 'encoder', 'decoder', 'parallelization', 'BERT', 'GPT', 'key', 'query', 'value', 'softmax'],
    followUps: [
      "What is multi-head attention and why is it useful?",
      "How does positional encoding work?",
      "Compare BERT and GPT architectures."
    ],
    rubric: {
      weak: "Only knows 'transformers are used in ChatGPT'",
      average: "Explains attention mechanism but can't detail the architecture",
      strong: "Full architecture walk-through: K/Q/V, multi-head attention, positional encoding, encoder-decoder, parallelization advantage over RNNs"
    }
  },
  {
    id: 'mle-3',
    text: "How would you deploy and serve a large language model in production with low latency?",
    roles: ['ML Engineer'],
    format: 'Machine Learning',
    difficulty: 'Hard',
    companies: ['Google', 'Meta', 'Amazon', 'Apple'],
    phase: 'deep_dive',
    evaluationCriteria: ['system_design', 'optimization', 'architecture'],
    idealKeywords: ['quantization', 'distillation', 'batching', 'GPU', 'ONNX', 'TensorRT', 'model parallelism', 'caching', 'KV cache', 'streaming', 'auto-scaling'],
    followUps: [
      "What's the difference between model quantization and distillation?",
      "How would you handle traffic spikes?",
      "What monitoring would you set up for model performance?"
    ],
    rubric: {
      weak: "Just 'deploy on a GPU server'",
      average: "Mentions quantization or batching but not a complete serving architecture",
      strong: "Discusses quantization, KV caching, request batching, auto-scaling, model versioning, A/B testing, latency monitoring"
    }
  },

  // ──────────────────────────────────────────────────────────────
  // PRODUCT MANAGER — Product Sense
  // ──────────────────────────────────────────────────────────────
  {
    id: 'pm-1',
    text: "How would you prioritize features for a new product launch with limited engineering resources?",
    roles: ['Product Manager'],
    format: 'Product Sense',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Amazon', 'Apple'],
    phase: 'core',
    evaluationCriteria: ['product_sense', 'decision_making', 'communication'],
    idealKeywords: ['RICE', 'ICE', 'impact', 'effort', 'MoSCoW', 'user research', 'MVP', 'iteration', 'north star', 'OKR', 'stakeholder'],
    followUps: [
      "How do you handle pushback from stakeholders whose feature gets deprioritized?",
      "What data would you use to inform prioritization?",
      "How do you balance user needs vs business needs?"
    ],
    rubric: {
      weak: "Says 'build everything the CEO asks for'",
      average: "Mentions a framework but can't apply it to a real scenario",
      strong: "Uses RICE/ICE with real reasoning, validates with user research, communicates trade-offs, defines MVP scope"
    }
  },
  {
    id: 'pm-2',
    text: "Facebook's News Feed engagement is declining. How would you diagnose the problem and propose solutions?",
    roles: ['Product Manager', 'Data Scientist'],
    format: 'Product Sense',
    difficulty: 'Hard',
    companies: ['Meta', 'Google', 'Amazon'],
    phase: 'core',
    evaluationCriteria: ['product_sense', 'problem_solving', 'communication'],
    idealKeywords: ['metrics tree', 'segmentation', 'funnel', 'DAU', 'session duration', 'content quality', 'algorithm', 'user research', 'hypothesis', 'experiment'],
    followUps: [
      "How would you distinguish between a seasonal dip and a structural decline?",
      "What metrics would you look at first?",
      "How would you validate your hypothesis before building?"
    ],
    rubric: {
      weak: "Jumps to solutions without diagnosing the problem",
      average: "Asks good clarifying questions but analysis is surface-level",
      strong: "Breaks down metrics tree, segments users, forms hypotheses, validates with data, proposes measured experiments"
    }
  },
  {
    id: 'pm-3',
    text: "Design a feature that improves creator monetization on YouTube. Walk me through your product thinking.",
    roles: ['Product Manager'],
    format: 'Product Sense',
    difficulty: 'Hard',
    companies: ['Google', 'Meta', 'Amazon'],
    phase: 'deep_dive',
    evaluationCriteria: ['product_sense', 'user_empathy', 'communication'],
    idealKeywords: ['creator economy', 'monetization', 'subscription', 'tips', 'user segment', 'small creator', 'advertiser', 'marketplace', 'metrics', 'launch plan'],
    followUps: [
      "How would you measure success for this feature?",
      "What are the risks of this approach?",
      "How would you phase the rollout?"
    ],
    rubric: {
      weak: "Proposes a feature without understanding creator needs",
      average: "Good feature idea but weak on metrics, risks, or rollout strategy",
      strong: "Deep user empathy, considers creator segments, defines success metrics, addresses marketplace dynamics, phased rollout"
    }
  },

  // ──────────────────────────────────────────────────────────────
  // CROSS-ROLE — Common DSA Questions
  // ──────────────────────────────────────────────────────────────
  {
    id: 'common-dsa-1',
    text: "Given two sorted arrays, find the median of the combined array in O(log(min(m,n))) time.",
    roles: ['Frontend Engineer', 'Backend Engineer', 'Fullstack', 'Data Scientist', 'ML Engineer'],
    format: 'Data Structures',
    difficulty: 'Hard',
    companies: ['Google', 'Amazon', 'Meta', 'Apple'],
    phase: 'deep_dive',
    evaluationCriteria: ['problem_solving', 'data_structures', 'optimization'],
    idealKeywords: ['binary search', 'partition', 'left half', 'right half', 'max left', 'min right', 'odd', 'even', 'edge case'],
    followUps: [
      "Why can't we just merge and find the middle?",
      "What are the edge cases you need to handle?",
      "Can you trace through an example?"
    ],
    rubric: {
      weak: "Merges arrays — O(m+n) instead of O(log)",
      average: "Knows binary search is needed but can't implement the partitioning",
      strong: "Correctly partitions using binary search on the smaller array, handles edge cases with infinity guards"
    }
  },
  {
    id: 'common-dsa-2',
    text: "How would you detect a cycle in a directed graph? What algorithm would you use?",
    roles: ['Frontend Engineer', 'Backend Engineer', 'Fullstack'],
    format: 'Data Structures',
    difficulty: 'Medium',
    companies: ['Google', 'Amazon', 'Microsoft'],
    phase: 'core',
    evaluationCriteria: ['problem_solving', 'data_structures'],
    idealKeywords: ['DFS', 'visited', 'recursion stack', 'back edge', 'topological sort', 'Kahn', 'in-degree', 'coloring', 'white', 'gray', 'black'],
    followUps: [
      "How is this different from cycle detection in undirected graphs?",
      "Can you use BFS for cycle detection?",
      "What real-world problems involve cycle detection in directed graphs?"
    ],
    rubric: {
      weak: "Uses simple visited set without recursion stack distinction",
      average: "Correct DFS approach but can't explain why recursion stack is needed",
      strong: "Explains three-color (white/gray/black) algorithm or recursion stack, discusses topological sort connection, real-world uses"
    }
  },
  {
    id: 'common-dsa-3',
    text: "Implement a function to serialize and deserialize a binary tree.",
    roles: ['Frontend Engineer', 'Backend Engineer', 'Fullstack'],
    format: 'Data Structures',
    difficulty: 'Hard',
    companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
    phase: 'core',
    evaluationCriteria: ['problem_solving', 'data_structures', 'coding'],
    idealKeywords: ['preorder', 'BFS', 'null marker', 'delimiter', 'queue', 'recursion', 'level order', 'JSON'],
    followUps: [
      "What encoding would you use for null nodes?",
      "How does your approach handle unbalanced trees?",
      "What is the time and space complexity?"
    ],
    rubric: {
      weak: "Can't think of a serialization strategy",
      average: "Uses preorder but struggles with null markers during deserialization",
      strong: "Clean preorder/BFS with null markers, handles edge cases, discusses space efficiency"
    }
  },
  {
    id: 'common-dsa-4',
    text: "Design a data structure that supports insert, delete, and getRandom in O(1) average time.",
    roles: ['Frontend Engineer', 'Backend Engineer', 'Fullstack'],
    format: 'Data Structures',
    difficulty: 'Medium',
    companies: ['Meta', 'Google', 'Amazon', 'Apple'],
    phase: 'core',
    evaluationCriteria: ['problem_solving', 'data_structures'],
    idealKeywords: ['hash map', 'array', 'swap', 'last element', 'index mapping', 'random index', 'O(1)'],
    followUps: [
      "How does the delete operation maintain O(1)?",
      "What if we need to support duplicates?",
      "Could you implement this as a class?"
    ],
    rubric: {
      weak: "Uses only an array or only a hash map",
      average: "Combines array + hash map but can't explain the swap trick for delete",
      strong: "Array + hash map, swap-with-last for O(1) delete, clean implementation, handles edge cases"
    }
  },
  {
    id: 'common-dsa-5',
    text: "Given a string containing parentheses, brackets, and braces, determine if it is valid.",
    roles: ['Frontend Engineer', 'Backend Engineer', 'Fullstack'],
    format: 'Data Structures',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Meta'],
    phase: 'warmup',
    evaluationCriteria: ['problem_solving', 'data_structures', 'coding'],
    idealKeywords: ['stack', 'push', 'pop', 'matching', 'hash map', 'empty stack', 'edge case'],
    followUps: [
      "What edge cases do you need to handle?",
      "How would you modify this to also return the position of the first invalid character?",
      "What's the time and space complexity?"
    ],
    rubric: {
      weak: "Tries counting approach without proper matching",
      average: "Correct stack approach but misses edge cases like empty string or extra closing brackets",
      strong: "Clean stack implementation with hash map for matching pairs, handles all edge cases, optimal complexity"
    }
  },

  // ──────────────────────────────────────────────────────────────
  // MORE SYSTEM DESIGN (cross-role)
  // ──────────────────────────────────────────────────────────────
  {
    id: 'sd-cross-1',
    text: "Design a distributed job queue that guarantees at-least-once delivery.",
    roles: ['Backend Engineer', 'DevOps Engineer', 'Fullstack'],
    format: 'System Design',
    difficulty: 'Hard',
    companies: ['Amazon', 'Google', 'Uber', 'Stripe'],
    phase: 'deep_dive',
    evaluationCriteria: ['system_design', 'architecture', 'reliability'],
    idealKeywords: ['message queue', 'acknowledgment', 'visibility timeout', 'dead letter queue', 'retry', 'idempotency', 'consumer group', 'partition', 'offset'],
    followUps: [
      "How do you handle poison messages that keep failing?",
      "How do you ensure exactly-once processing?",
      "How does this compare to Kafka's consumer group model?"
    ],
    rubric: {
      weak: "Simple queue with no delivery guarantees",
      average: "Has acknowledgment but no dead letter queue or idempotency",
      strong: "Full design with visibility timeout, DLQ, idempotent consumers, retry with backoff, monitoring"
    }
  },
  {
    id: 'sd-cross-2',
    text: "Design an event-driven architecture for an e-commerce platform.",
    roles: ['Backend Engineer', 'Fullstack', 'DevOps Engineer'],
    format: 'System Design',
    difficulty: 'Hard',
    companies: ['Amazon', 'Google', 'Uber', 'Stripe'],
    phase: 'core',
    evaluationCriteria: ['system_design', 'architecture'],
    idealKeywords: ['event bus', 'Kafka', 'event sourcing', 'CQRS', 'saga', 'eventual consistency', 'dead letter', 'schema registry', 'idempotent'],
    followUps: [
      "How do you handle ordering of events?",
      "What if an event consumer goes down?",
      "How do you handle distributed transactions across services?"
    ],
    rubric: {
      weak: "Direct service-to-service calls with no event bus",
      average: "Uses event bus but doesn't discuss ordering, failures, or saga pattern",
      strong: "Full event-driven design with Kafka, saga pattern for distributed transactions, schema registry, DLQ, idempotent consumers"
    }
  },

  // ──────────────────────────────────────────────────────────────
  // MORE BEHAVIORAL (cross-role)
  // ──────────────────────────────────────────────────────────────
  {
    id: 'beh-cross-1',
    text: "Tell me about a time you had to push back on a product requirement. How did you handle it?",
    roles: ['Frontend Engineer', 'Backend Engineer', 'Fullstack', 'Engineering Manager', 'Product Manager'],
    format: 'Behavioral',
    difficulty: 'Medium',
    companies: ['Google', 'Amazon', 'Meta', 'Apple'],
    phase: 'core',
    evaluationCriteria: ['communication', 'leadership', 'decision_making'],
    idealKeywords: ['data', 'trade-off', 'alternative', 'stakeholder', 'empathy', 'compromise', 'user impact', 'technical debt'],
    followUps: [
      "What data did you use to support your position?",
      "How did the PM/stakeholder react?",
      "Would you do anything differently now?"
    ],
    rubric: {
      weak: "Says no without offering alternatives",
      average: "Pushes back but doesn't provide data or alternatives",
      strong: "Uses data to explain trade-offs, proposes alternatives, shows empathy for the other perspective"
    }
  },
  {
    id: 'beh-cross-2',
    text: "Describe a time you had to learn a new technology quickly to deliver a project. How did you approach it?",
    roles: ['Frontend Engineer', 'Backend Engineer', 'Fullstack', 'DevOps Engineer', 'ML Engineer'],
    format: 'Behavioral',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Startup (Unicorn)', 'Stripe'],
    phase: 'warmup',
    evaluationCriteria: ['learning_agility', 'problem_solving', 'communication'],
    idealKeywords: ['structured learning', 'prototype', 'documentation', 'community', 'pair programming', 'time-boxed', 'proof of concept', 'mentorship'],
    followUps: [
      "How did you evaluate whether this technology was the right choice?",
      "How did you ensure quality while learning on the job?",
      "How do you decide between learning deeply vs learning just enough?"
    ],
    rubric: {
      weak: "Vague 'I googled and figured it out'",
      average: "Shows a learning plan but no mention of risk mitigation",
      strong: "Structured approach: POC first, time-boxed learning, sought mentorship, documented learnings for team"
    }
  },
  {
    id: 'beh-cross-3',
    text: "Give an example of when you identified a significant technical debt and convinced the team to address it.",
    roles: ['Frontend Engineer', 'Backend Engineer', 'Fullstack', 'Engineering Manager', 'DevOps Engineer'],
    format: 'Behavioral',
    difficulty: 'Medium',
    companies: ['Google', 'Amazon', 'Meta', 'Netflix'],
    phase: 'core',
    evaluationCriteria: ['leadership', 'communication', 'technical_depth'],
    idealKeywords: ['metrics', 'incident', 'cost of delay', 'refactoring', 'roadmap', 'buy-in', 'incremental', 'ROI', 'tech debt register'],
    followUps: [
      "How did you quantify the impact of the tech debt?",
      "How did you get buy-in from product/management?",
      "How did you balance debt reduction with feature delivery?"
    ],
    rubric: {
      weak: "Complained about tech debt without taking action",
      average: "Identified debt but couldn't convince others — no quantification",
      strong: "Quantified impact (incidents, velocity, costs), proposed incremental plan, got buy-in, showed measurable improvement"
    }
  },

  // ──────────────────────────────────────────────────────────────
  // ADDITIONAL WARMUP / EASY QUESTIONS
  // ──────────────────────────────────────────────────────────────
  {
    id: 'warmup-1',
    text: "Tell me about yourself and your background. What brings you to this role?",
    roles: ['Frontend Engineer', 'Backend Engineer', 'Fullstack', 'Data Scientist', 'ML Engineer', 'DevOps Engineer', 'Engineering Manager', 'Product Manager'],
    format: 'Behavioral',
    difficulty: 'Easy',
    companies: ['Google', 'Meta', 'Amazon', 'Apple', 'Netflix', 'Startup (Unicorn)', 'Microsoft', 'Stripe', 'Uber'],
    phase: 'intro',
    evaluationCriteria: ['communication', 'self_awareness'],
    idealKeywords: ['experience', 'passion', 'projects', 'growth', 'skills', 'motivation', 'team', 'impact'],
    followUps: [
      "What's a project you're most proud of?",
      "What do you want to learn in your next role?",
      "Why this company specifically?"
    ],
    rubric: {
      weak: "Reads resume bullet points with no narrative",
      average: "Coherent story but doesn't connect to the role",
      strong: "Compelling narrative connecting past experience to this role, shows passion and self-awareness, mentions specific motivations"
    }
  },
  {
    id: 'warmup-2',
    text: "What's the difference between HTTP and HTTPS? Why does it matter?",
    roles: ['Frontend Engineer', 'Backend Engineer', 'Fullstack', 'DevOps Engineer'],
    format: 'Data Structures',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'TCS', 'Infosys'],
    phase: 'warmup',
    evaluationCriteria: ['technical_depth'],
    idealKeywords: ['TLS', 'SSL', 'encryption', 'certificate', 'handshake', 'man-in-the-middle', 'port 443', 'CA', 'public key'],
    followUps: [
      "Walk me through the TLS handshake.",
      "What is a certificate authority?",
      "Can HTTPS be compromised?"
    ],
    rubric: {
      weak: "Just says 'HTTPS is secure'",
      average: "Mentions encryption but can't explain TLS handshake",
      strong: "Explains TLS handshake, certificates, CA trust chain, symmetric vs asymmetric encryption roles"
    }
  },
  {
    id: 'warmup-3',
    text: "Explain REST API design principles. What makes an API 'RESTful'?",
    roles: ['Frontend Engineer', 'Backend Engineer', 'Fullstack'],
    format: 'Data Structures',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Meta', 'Stripe'],
    phase: 'warmup',
    evaluationCriteria: ['technical_depth', 'architecture'],
    idealKeywords: ['stateless', 'resource', 'HTTP methods', 'GET', 'POST', 'PUT', 'DELETE', 'status codes', 'URI', 'HATEOAS', 'idempotent', 'versioning'],
    followUps: [
      "What's the difference between PUT and PATCH?",
      "How would you version a REST API?",
      "When would you choose GraphQL over REST?"
    ],
    rubric: {
      weak: "Just knows GET and POST",
      average: "Knows CRUD mapping to HTTP methods but not statelessness or idempotency",
      strong: "Full REST principles: statelessness, resource naming, proper status codes, idempotency, HATEOAS, versioning strategies"
    }
  },
];

// ═══════════════════════════════════════════════════════════════
// Role-specific evaluation dimension weights
// ═══════════════════════════════════════════════════════════════
export const roleEvaluationWeights = {
  'Frontend Engineer': {
    problem_solving: 0.25,
    communication: 0.15,
    architecture: 0.20,
    coding: 0.25,
    behavioral: 0.15,
    dimensions: ['Problem Solving', 'Communication', 'Frontend Architecture', 'Coding Proficiency', 'Behavioral']
  },
  'Backend Engineer': {
    problem_solving: 0.25,
    communication: 0.10,
    architecture: 0.30,
    coding: 0.20,
    behavioral: 0.15,
    dimensions: ['Problem Solving', 'Communication', 'System Architecture', 'Coding Proficiency', 'Behavioral']
  },
  'Fullstack': {
    problem_solving: 0.25,
    communication: 0.15,
    architecture: 0.25,
    coding: 0.20,
    behavioral: 0.15,
    dimensions: ['Problem Solving', 'Communication', 'Full-Stack Architecture', 'Coding Proficiency', 'Behavioral']
  },
  'Data Scientist': {
    problem_solving: 0.20,
    communication: 0.15,
    architecture: 0.15,
    coding: 0.15,
    behavioral: 0.10,
    ml_depth: 0.25,
    dimensions: ['Problem Solving', 'Communication', 'ML Architecture', 'Coding', 'Behavioral', 'ML Depth']
  },
  'ML Engineer': {
    problem_solving: 0.20,
    communication: 0.10,
    architecture: 0.25,
    coding: 0.20,
    behavioral: 0.10,
    ml_depth: 0.15,
    dimensions: ['Problem Solving', 'Communication', 'ML Systems', 'Coding', 'Behavioral', 'ML Depth']
  },
  'Engineering Manager': {
    problem_solving: 0.15,
    communication: 0.25,
    architecture: 0.15,
    coding: 0.05,
    behavioral: 0.40,
    dimensions: ['Problem Solving', 'Communication', 'Architecture', 'Technical Depth', 'Leadership']
  },
  'DevOps Engineer': {
    problem_solving: 0.25,
    communication: 0.10,
    architecture: 0.30,
    coding: 0.15,
    behavioral: 0.20,
    dimensions: ['Problem Solving', 'Communication', 'Infrastructure Design', 'Automation', 'Behavioral']
  },
  'Product Manager': {
    problem_solving: 0.20,
    communication: 0.30,
    architecture: 0.05,
    coding: 0.00,
    behavioral: 0.20,
    product_sense: 0.25,
    dimensions: ['Analytical Thinking', 'Communication', 'Product Sense', 'Strategy', 'Leadership', 'User Empathy']
  }
};

// ═══════════════════════════════════════════════════════════════
// Intro messages per company
// ═══════════════════════════════════════════════════════════════
export const companyIntros = {
  'Google': "Welcome to your Google interview simulation. At Google, we focus heavily on problem-solving ability, scalable system design, and 'Googleyness' — your ability to navigate ambiguity and collaborate effectively.",
  'Meta': "Welcome to your Meta interview. We look for builders who move fast and think at scale. Our interviews evaluate your ability to write clean code, design systems that serve billions, and demonstrate impact.",
  'Amazon': "Welcome to your Amazon interview. Our process is deeply rooted in Leadership Principles. We want to understand how you think about customer obsession, ownership, and delivering results at scale.",
  'Netflix': "Welcome to your Netflix interview. We value high-performance culture and freedom with responsibility. Show us your technical depth, your judgment, and how you handle context over control.",
  'Apple': "Welcome to your Apple interview. We care deeply about craft, attention to detail, and building products that delight users. Show us how you think about both the technical and human sides of engineering.",
  'Startup (Unicorn)': "Welcome to your startup interview. We're looking for versatile engineers who can wear many hats, move quickly, and make pragmatic technical decisions with limited resources.",
  'Microsoft': "Welcome to your Microsoft interview. We value growth mindset, collaboration, and technical excellence. Our interviews assess your ability to solve complex problems and design scalable solutions.",
  'Stripe': "Welcome to your Stripe interview. We build financial infrastructure for the internet. We look for engineers who write exceptionally clean code, think carefully about API design, and care deeply about reliability.",
  'Uber': "Welcome to your Uber interview. We solve complex distributed systems problems at massive scale. Show us your ability to design resilient systems and think about real-world engineering challenges."
};

// ═══════════════════════════════════════════════════════════════
// Study recommendations per weakness area
// ═══════════════════════════════════════════════════════════════
export const studyRecommendations = {
  problem_solving: [
    "Practice LeetCode medium/hard problems daily — focus on patterns (sliding window, two pointers, DFS/BFS)",
    "Work through 'Grokking the Coding Interview' for pattern-based problem solving",
    "Time yourself: aim to solve Medium problems in 20 minutes, Hard in 35 minutes"
  ],
  communication: [
    "Practice explaining solutions aloud before coding — use the 'think aloud' method",
    "Record yourself explaining technical concepts and review for clarity",
    "Use the STAR method for behavioral answers: Situation, Task, Action, Result"
  ],
  architecture: [
    "Study system design fundamentals: 'Designing Data-Intensive Applications' by Martin Kleppmann",
    "Practice drawing architecture diagrams for common systems (Twitter, Uber, WhatsApp)",
    "Learn about trade-offs: CAP theorem, consistency vs availability, SQL vs NoSQL"
  ],
  coding: [
    "Implement data structures from scratch: linked list, hash map, heap, trie",
    "Practice writing clean, well-structured code with proper naming and edge case handling",
    "Learn to analyze time and space complexity for every solution you write"
  ],
  behavioral: [
    "Prepare 8-10 stories from your experience using the STAR method",
    "Practice with a friend or record yourself answering leadership/conflict questions",
    "Research the company's values and align your stories to their culture"
  ],
  ml_depth: [
    "Review ML fundamentals: bias-variance, regularization, cross-validation, feature engineering",
    "Implement key algorithms from scratch: linear regression, decision tree, k-means",
    "Study the ML system design pipeline: data → features → model → serving → monitoring"
  ],
  product_sense: [
    "Practice product case studies: improve X, design Y, diagnose a metric decline",
    "Build a metrics framework: learn about AARRR, north star metrics, guardrail metrics",
    "Study real product launches and analyze what made them successful or not"
  ]
};
