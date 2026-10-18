// 100 Curated Interview Questions asked at top companies
// Each question has: id, title, answer, company[], category, difficulty, round

const interviewQuestionsData = [
  // ──────────────────────────── DATA STRUCTURES & ALGORITHMS ────────────────────────────
  {
    id: 1,
    title: "Explain the internal working of HashMap in Java.",
    answer: "HashMap uses an array of buckets. Each key is hashed using hashCode(), and the resulting hash determines the bucket index via (n-1) & hash. Collisions are handled using a linked list (or a balanced tree when the list exceeds 8 nodes in Java 8+). On put(), if the key already exists, its value is updated; otherwise, a new Entry node is inserted. On get(), the hash and equals() methods locate the correct entry. The default load factor is 0.75, and the map resizes (doubles capacity) when the threshold is exceeded. Time complexity is O(1) average for get/put and O(n) worst case with poor hash distribution.",
    companies: ["Amazon", "Google", "Microsoft", "Flipkart"],
    category: "Data Structures",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 2,
    title: "What is the difference between ArrayList and LinkedList?",
    answer: "ArrayList uses a dynamic array internally, providing O(1) random access but O(n) insertions/deletions in the middle due to shifting. LinkedList uses a doubly-linked list, offering O(1) insertions/deletions at head/tail but O(n) access time. ArrayList has better cache locality because elements are stored contiguously in memory. LinkedList has higher memory overhead due to node pointers. For most use cases, ArrayList is preferred unless frequent insertions/deletions at arbitrary positions are needed.",
    companies: ["TCS", "Infosys", "Wipro", "Cognizant"],
    category: "Data Structures",
    difficulty: "Easy",
    round: "Technical"
  },
  {
    id: 3,
    title: "Detect a cycle in a linked list. How would you find the starting node of the cycle?",
    answer: "Use Floyd's Tortoise and Hare algorithm. Two pointers move at different speeds (slow moves 1 step, fast moves 2 steps). If they meet, a cycle exists. To find the cycle's start, reset one pointer to head and move both at the same speed — they meet at the cycle start. Proof: Let the distance from head to cycle start be 'a', cycle start to meeting point be 'b', and remaining cycle length be 'c'. At meeting: slow traveled a+b, fast traveled a+b+b+c = a+2b+c. Since fast is 2x slow: 2(a+b) = a+2b+c → a = c. So moving from head and meeting point at same speed converges at cycle start.",
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    category: "Data Structures",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 4,
    title: "Implement LRU Cache with O(1) get and put operations.",
    answer: "Use a combination of a HashMap and a Doubly Linked List. The HashMap maps keys to linked list nodes for O(1) lookup. The doubly linked list maintains access order — most recently used at the head, least recently used at the tail. On get(): move the accessed node to the head. On put(): if key exists, update and move to head. If new and at capacity, remove the tail node (LRU), delete from map, then insert new node at head. Both operations are O(1) since HashMap provides constant-time lookup and doubly linked list provides constant-time insertion/removal.",
    companies: ["Google", "Meta", "Amazon", "Apple", "Microsoft"],
    category: "Data Structures",
    difficulty: "Hard",
    round: "Technical"
  },
  {
    id: 5,
    title: "What are the differences between a stack and a queue? When would you use each?",
    answer: "Stack follows LIFO (Last-In-First-Out) — push/pop from top. Queue follows FIFO (First-In-First-Out) — enqueue at rear, dequeue from front. Use stacks for: function call management, undo/redo, expression evaluation, DFS traversal, backtracking. Use queues for: BFS traversal, task scheduling, buffering (e.g., print queue, message queues), rate limiting. Variants include Deque (double-ended), Priority Queue (heap-based), and Circular Queue for fixed-size buffers.",
    companies: ["Wipro", "TCS", "Infosys", "HCL"],
    category: "Data Structures",
    difficulty: "Easy",
    round: "Technical"
  },
  {
    id: 6,
    title: "Explain the time complexities of common operations on a Binary Search Tree vs a balanced BST (AVL/Red-Black).",
    answer: "In a regular BST, search/insert/delete are O(h) where h is the height. In the worst case (skewed tree), h = n, making operations O(n). In balanced BSTs like AVL or Red-Black trees, the height is guaranteed O(log n). AVL trees are more strictly balanced (height difference ≤ 1), giving faster lookups but slower insertions due to more rotations. Red-Black trees allow slightly more imbalance but require fewer rotations, making them better for insertion-heavy workloads. Java's TreeMap uses Red-Black tree; database indices often use B-trees for disk-optimized access.",
    companies: ["Google", "Amazon", "Microsoft", "Uber"],
    category: "Data Structures",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 7,
    title: "Find the Kth largest element in an unsorted array.",
    answer: "Three approaches: 1) Sort the array O(n log n) and return arr[n-k]. 2) Use a Min-Heap of size k — iterate through array, push each element; if heap size > k, pop minimum. The top of the heap is the kth largest. Time: O(n log k). 3) Quickselect algorithm (based on partition from Quicksort): pick a pivot, partition, and recurse on the relevant half. Average O(n), worst O(n²), but randomized pivot selection makes worst case rare. For interviews, the heap approach is safest to implement correctly.",
    companies: ["Meta", "Google", "Amazon", "Bloomberg"],
    category: "Algorithms",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 8,
    title: "Explain Dijkstra's algorithm and its limitations.",
    answer: "Dijkstra's finds the shortest path from a source to all vertices in a weighted graph with non-negative edge weights. It uses a priority queue (min-heap). Algorithm: Initialize distances to ∞, source to 0. Extract min-distance vertex, relax all its neighbors. Time: O((V+E) log V) with a binary heap. Limitations: 1) Cannot handle negative edge weights (use Bellman-Ford instead). 2) Cannot detect negative cycles. 3) For dense graphs, O(V²) implementation without heap may be faster. 4) Not suitable for graphs where edge weights change dynamically.",
    companies: ["Google", "Apple", "Uber", "Microsoft"],
    category: "Algorithms",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 9,
    title: "What is dynamic programming? Explain with the 0/1 Knapsack problem.",
    answer: "Dynamic Programming solves problems by breaking them into overlapping subproblems and storing results (memoization or tabulation) to avoid recomputation. 0/1 Knapsack: Given n items with weights and values, maximize value within capacity W. DP relation: dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i]) where we either skip item i or include it. Base case: dp[0][w] = 0. Time: O(nW), Space: O(nW), optimizable to O(W) with 1D array. The '0/1' means each item is either taken or not (no fractions). This exhibits both optimal substructure and overlapping subproblems — the two properties required for DP.",
    companies: ["Amazon", "Google", "Microsoft", "Goldman Sachs"],
    category: "Algorithms",
    difficulty: "Hard",
    round: "Technical"
  },
  {
    id: 10,
    title: "What is a Trie? Where is it used?",
    answer: "A Trie (prefix tree) is a tree-like data structure where each node represents a character. The path from root to a node forms a prefix. Used for: autocomplete, spell-checking, IP routing (longest prefix matching), dictionary word lookups, and solving word games. Insert/Search/Delete operations are O(m) where m is the string length. Space can be high (26 children per node for lowercase English), which can be optimized using compressed tries (radix trees) or hash map children. Tries provide prefix-based searching that hash maps cannot efficiently support.",
    companies: ["Google", "Amazon", "Microsoft", "Snapchat"],
    category: "Data Structures",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 11,
    title: "How does merge sort work? Why is it preferred for linked lists?",
    answer: "Merge Sort divides the array into halves recursively, sorts each half, and merges them. Time: O(n log n) in all cases. Space: O(n) for arrays. It's stable (preserves relative order of equal elements). For linked lists, merge sort is preferred over quicksort because: 1) Linked lists allow O(1) insertion during merge without extra space. 2) Random access needed by quicksort's partition is O(n) in linked lists. 3) The merge step naturally works with linked list pointers. Finding the middle uses the slow-fast pointer technique.",
    companies: ["Microsoft", "Amazon", "Apple", "TCS"],
    category: "Algorithms",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 12,
    title: "Explain the sliding window technique with an example.",
    answer: "Sliding Window maintains a window (subarray/substring) that expands or contracts based on conditions, avoiding recomputation. Example: Find the maximum sum subarray of size k. Brute force is O(nk). With sliding window: compute sum of first k elements, then slide by adding the next element and removing the first. O(n). Two variants: Fixed-size window (e.g., max sum of k elements) and Variable-size window (e.g., smallest subarray with sum ≥ target). Variable uses two pointers — expand right to satisfy condition, contract left to optimize. Common problems: longest substring without repeats, minimum window substring, max consecutive ones.",
    companies: ["Google", "Meta", "Amazon", "Uber"],
    category: "Algorithms",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 13,
    title: "What is a Graph? Explain BFS vs DFS with use cases.",
    answer: "A Graph G = (V, E) consists of vertices and edges. Edges can be directed/undirected, weighted/unweighted. BFS (Breadth-First Search): Uses a queue, explores level by level. O(V+E). Use cases: shortest path in unweighted graphs, level-order traversal, finding connected components, web crawling. DFS (Depth-First Search): Uses a stack (or recursion), explores as deep as possible before backtracking. O(V+E). Use cases: topological sort, cycle detection, path finding, maze solving, strongly connected components. BFS finds shortest path; DFS uses less memory for deep graphs.",
    companies: ["Google", "Meta", "Amazon", "Apple"],
    category: "Data Structures",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 14,
    title: "Explain the concept of hashing and collision resolution techniques.",
    answer: "Hashing maps keys to indices using a hash function for O(1) average access. Collision resolution: 1) Chaining — each bucket stores a linked list of entries. Simple but uses extra memory. 2) Open Addressing — finds another slot: Linear Probing (next slot), Quadratic Probing (i² offsets), Double Hashing (second hash function). Open addressing has better cache performance but suffers from clustering. Load factor = n/capacity. Rehashing occurs when load factor exceeds threshold (typically 0.75). Good hash functions: distribute uniformly, minimize collisions, are deterministic, and fast to compute.",
    companies: ["Amazon", "Microsoft", "Flipkart", "Goldman Sachs"],
    category: "Data Structures",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 15,
    title: "Serialize and deserialize a binary tree.",
    answer: "Serialization converts a tree to a string; deserialization reconstructs it. Approach 1 (Preorder): Traverse preorder, use 'null' marker for null nodes, separate with delimiters. To deserialize, use a queue of tokens: dequeue value, create node, recursively build left then right subtrees. Approach 2 (Level-order/BFS): Use a queue, serialize level by level including nulls. Deserialize using a queue of tokens and a queue of parent nodes. Both approaches are O(n) time and space. The key insight is that preorder + null markers uniquely defines the tree structure.",
    companies: ["Google", "Meta", "Amazon", "Microsoft"],
    category: "Data Structures",
    difficulty: "Hard",
    round: "Technical"
  },

  // ──────────────────────────── SYSTEM DESIGN ────────────────────────────
  {
    id: 16,
    title: "Design a URL shortener like bit.ly.",
    answer: "Requirements: Shorten URLs, redirect short to long, analytics. High-level: API Gateway → App Server → Database. Key decisions: 1) ID generation: Base62 encoding of auto-increment ID or MD5/SHA hash truncated to 7 chars. 2) Database: NoSQL (DynamoDB) for high throughput key-value lookups. 3) Caching: Redis to cache popular URLs (80/20 rule). 4) Read-heavy system (100:1 read/write ratio). Estimates: 100M URLs/month → ~40 URLs/sec write, 4000/sec read. Storage: 500 bytes/URL × 100M × 12 months × 5 years ≈ 30TB. Handle collisions via retry or counter. Custom aliases stored separately. Analytics via async event streaming (Kafka → analytics pipeline).",
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Snapchat"],
    category: "System Design",
    difficulty: "Hard",
    round: "System Design"
  },
  {
    id: 17,
    title: "Design a chat application like WhatsApp.",
    answer: "Core features: 1:1 messaging, group chat, online status, read receipts, media sharing. Architecture: Clients connect via WebSocket to Chat Servers for real-time bidirectional communication. Message flow: User A → WebSocket → Chat Server → Message Queue (Kafka) → Chat Server → WebSocket → User B. If User B is offline, messages are stored and delivered on reconnect. Storage: Messages in Cassandra (write-optimized, partitioned by chat_id). Media on S3/CDN. User sessions in Redis. Group messages use fan-out: write message once, create delivery entries per member. End-to-end encryption using Signal Protocol. Push notifications for offline users via APNs/FCM.",
    companies: ["Meta", "Google", "Microsoft", "Snapchat"],
    category: "System Design",
    difficulty: "Hard",
    round: "System Design"
  },
  {
    id: 18,
    title: "Design a rate limiter.",
    answer: "Purpose: Prevent abuse and ensure fair resource usage. Algorithms: 1) Token Bucket — tokens added at fixed rate, each request consumes a token. Allows bursts. 2) Leaky Bucket — requests processed at fixed rate, excess queued. Smooth output. 3) Fixed Window Counter — count requests per time window. Edge case: burst at window boundary. 4) Sliding Window Log — store timestamps, count in sliding window. Accurate but memory-heavy. 5) Sliding Window Counter — weighted combination of current and previous window. Best tradeoff. Implementation: Redis INCR + EXPIRE for distributed rate limiting. Return HTTP 429 when limit exceeded. Headers: X-RateLimit-Remaining, X-RateLimit-Reset.",
    companies: ["Google", "Amazon", "Stripe", "Cloudflare"],
    category: "System Design",
    difficulty: "Hard",
    round: "System Design"
  },
  {
    id: 19,
    title: "Design a notification system (push, SMS, email).",
    answer: "Components: 1) Notification Service — receives requests via API, validates, routes by channel. 2) Message Queue (Kafka/SQS) — decouples producers from consumers, handles spikes. 3) Workers — channel-specific: Email (SendGrid/SES), SMS (Twilio), Push (APNs/FCM). 4) Template Service — manages notification templates with variable substitution. 5) User Preferences Service — stores per-user opt-in/out settings. 6) Rate limiting per user to prevent spam. 7) Tracking: delivery status, open rates via tracking pixels/webhooks. Database: Templates in SQL, notification logs in Cassandra. Retry mechanism: exponential backoff for failed deliveries. Priority queue for urgent notifications.",
    companies: ["Amazon", "Google", "Uber", "Meta"],
    category: "System Design",
    difficulty: "Hard",
    round: "System Design"
  },
  {
    id: 20,
    title: "Design Twitter's news feed.",
    answer: "Two approaches: 1) Pull model (fan-out on read): When user loads feed, query all followed users' tweets, merge, sort, return top N. Slow for users following many people. 2) Push model (fan-out on write): On tweet creation, push to all followers' feed caches. Fast reads but expensive for celebrities (millions of followers). 3) Hybrid: Push for normal users, pull for celebrities. Feed stored in Redis sorted sets (tweet_id as score for ordering). Tweet storage: Tweets table in SQL/NoSQL. Media on S3. Cache feed in Redis. Pagination via cursor-based (last tweet_id, not offset). Ranking: chronological + ML-based relevance scoring.",
    companies: ["Meta", "Google", "Amazon", "Apple"],
    category: "System Design",
    difficulty: "Hard",
    round: "System Design"
  },
  {
    id: 21,
    title: "How would you design an API rate limiting service for a distributed system?",
    answer: "Challenges in distributed systems: multiple servers need shared state. Solution: Centralized rate limiting using Redis. Each API key maps to a counter with TTL. Use Redis Lua scripts for atomic check-and-increment. Sliding window approach: store request timestamps in a sorted set, remove expired entries, count remaining. Alternatively, use a sidecar proxy (Envoy/Nginx) with rate limiting plugin. For high availability: Redis Cluster with replication. Trade-off: strict consistency (slower, requires sync) vs eventual consistency (faster, may allow slight over-limit). Return 429 Too Many Requests with Retry-After header. Consider tiered limits: per-second, per-minute, per-hour.",
    companies: ["Amazon", "Google", "Stripe", "Netflix"],
    category: "System Design",
    difficulty: "Hard",
    round: "System Design"
  },
  {
    id: 22,
    title: "Design a distributed cache system like Memcached/Redis.",
    answer: "Requirements: Low-latency reads, horizontal scaling, high availability. Architecture: Consistent hashing to distribute keys across cache nodes (minimizes redistribution on node addition/removal). Each node stores key-value pairs in memory with optional TTL. Eviction policies: LRU (most common), LFU, FIFO. Replication: primary-secondary for fault tolerance. Write-through (write to cache + DB simultaneously) vs write-behind (async DB write) vs cache-aside (app manages cache). Handle cache stampede: lock/mutex on cache miss, probabilistic early refresh. Monitoring: hit rate, eviction rate, memory usage.",
    companies: ["Amazon", "Google", "Microsoft", "Netflix"],
    category: "System Design",
    difficulty: "Hard",
    round: "System Design"
  },

  // ──────────────────────────── OPERATING SYSTEMS ────────────────────────────
  {
    id: 23,
    title: "What is a deadlock? What are the necessary conditions and how to prevent it?",
    answer: "A deadlock occurs when two or more processes are waiting indefinitely for resources held by each other. Four necessary conditions (all must hold): 1) Mutual Exclusion — resource can't be shared. 2) Hold and Wait — process holds one resource and waits for another. 3) No Preemption — resources can't be forcibly taken. 4) Circular Wait — circular chain of processes, each waiting for a resource held by the next. Prevention: Break any one condition. Lock ordering (prevents circular wait), request all resources upfront (prevents hold-and-wait), allow preemption via timeouts, or use lock-free algorithms. Detection: Resource Allocation Graph — if it contains a cycle, deadlock exists.",
    companies: ["Google", "Amazon", "Microsoft", "TCS", "Infosys"],
    category: "Operating Systems",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 24,
    title: "Explain the difference between process and thread.",
    answer: "A process is an independent execution unit with its own memory space (code, data, heap, stack). A thread is a lightweight unit within a process that shares the process's memory. Key differences: 1) Memory: Processes have separate address spaces; threads share heap/data but have separate stacks. 2) Creation: Thread creation is faster (no new address space needed). 3) Communication: Inter-process communication (IPC) is expensive (pipes, sockets, shared memory); threads communicate via shared variables. 4) Isolation: Process crash doesn't affect others; thread crash can bring down entire process. 5) Context switch: Thread switching is faster due to shared memory. Modern systems use multi-threading for parallelism within a process and multi-processing for isolation.",
    companies: ["Microsoft", "Amazon", "Infosys", "Wipro", "Google"],
    category: "Operating Systems",
    difficulty: "Easy",
    round: "Technical"
  },
  {
    id: 25,
    title: "What is virtual memory? How does paging work?",
    answer: "Virtual memory allows processes to use more memory than physically available by using disk as an extension of RAM. Each process gets its own virtual address space, mapped to physical memory via page tables. Paging divides virtual memory into fixed-size pages (typically 4KB) and physical memory into frames of the same size. The MMU (Memory Management Unit) translates virtual to physical addresses using the page table. On a page fault (page not in RAM), the OS loads it from disk. TLB (Translation Lookaside Buffer) caches recent translations for speed. Page replacement algorithms: LRU, FIFO, Optimal, Clock. Advantages: isolation between processes, enables larger address spaces, simplifies memory allocation.",
    companies: ["Google", "Microsoft", "Amazon", "Apple"],
    category: "Operating Systems",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 26,
    title: "Difference between mutex and semaphore.",
    answer: "Mutex (Mutual Exclusion): Binary lock — only one thread can acquire it. The thread that locks must unlock it (ownership). Used for protecting critical sections. Semaphore: A counter that allows N threads to access a resource simultaneously. Two types: Binary semaphore (0/1, similar to mutex but no ownership) and Counting semaphore (0 to N). Any thread can signal (increment), not just the one that waited. Use cases: Mutex for exclusive access (shared variable protection). Semaphore for resource pools (e.g., connection pool of size N), producer-consumer (signaling between threads). Key difference: Mutex has ownership semantics; semaphore is a signaling mechanism.",
    companies: ["Microsoft", "Amazon", "Google", "Qualcomm"],
    category: "Operating Systems",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 27,
    title: "What are the different CPU scheduling algorithms?",
    answer: "1) FCFS (First-Come-First-Served): Simple, non-preemptive. Convoy effect with long processes. 2) SJF (Shortest Job First): Optimal average waiting time, but requires knowing burst time. Starvation possible. 3) SRTF (Shortest Remaining Time First): Preemptive SJF. Better avg waiting time but more context switches. 4) Round Robin: Each process gets a time quantum. Fair, good for time-sharing. Performance depends on quantum size. 5) Priority Scheduling: Higher priority runs first. Can cause starvation — solved by aging. 6) Multilevel Queue: Multiple queues with different algorithms. 7) Multilevel Feedback Queue: Processes can move between queues based on behavior. Most modern OSes use a variant of this.",
    companies: ["TCS", "Infosys", "Wipro", "Amazon", "Microsoft"],
    category: "Operating Systems",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 28,
    title: "What is thrashing? How to prevent it?",
    answer: "Thrashing occurs when a system spends more time swapping pages between RAM and disk than executing processes. It happens when too many processes compete for limited physical memory, causing frequent page faults. Each page fault triggers I/O, slowing the system dramatically. Prevention: 1) Working Set Model — track each process's working set (pages actively used); ensure total working sets fit in RAM. 2) Page Fault Frequency (PFF) — if a process's page fault rate is too high, allocate more frames; if too low, reduce frames. 3) Reduce degree of multiprogramming. 4) Increase physical memory. 5) Use local page replacement (only replace pages within the faulting process, not globally).",
    companies: ["Google", "Microsoft", "Amazon", "TCS"],
    category: "Operating Systems",
    difficulty: "Hard",
    round: "Technical"
  },

  // ──────────────────────────── DBMS ────────────────────────────
  {
    id: 29,
    title: "What is normalization? Explain 1NF, 2NF, 3NF, and BCNF.",
    answer: "Normalization reduces data redundancy and ensures data integrity. 1NF: Each column contains atomic (indivisible) values; each row is unique. No repeating groups. 2NF: Must be in 1NF + no partial dependency (non-key attribute depends on part of a composite primary key). 3NF: Must be in 2NF + no transitive dependency (non-key attribute depends on another non-key attribute). BCNF (Boyce-Codd NF): For every functional dependency X → Y, X must be a super key. Stricter than 3NF. Example: Student(roll, name, dept, dept_head). dept_head depends on dept (transitive via dept), violating 3NF. Fix: split into Student(roll, name, dept) and Department(dept, dept_head). Trade-off: higher normalization = more joins = potentially slower reads.",
    companies: ["TCS", "Infosys", "Wipro", "Amazon", "Microsoft"],
    category: "DBMS",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 30,
    title: "What are ACID properties in a database?",
    answer: "ACID ensures reliable transaction processing. Atomicity: A transaction is all-or-nothing. If any part fails, the entire transaction rolls back. Implemented via transaction logs (undo/redo). Consistency: A transaction brings the database from one valid state to another, maintaining all constraints and rules. Isolation: Concurrent transactions don't interfere with each other. Levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable. Implemented via locks, MVCC (Multi-Version Concurrency Control). Durability: Once committed, changes survive system failures. Implemented via Write-Ahead Logging (WAL) — log written to disk before data changes. ACID is foundational for banking systems, e-commerce, etc.",
    companies: ["Amazon", "Google", "Microsoft", "Goldman Sachs", "Infosys"],
    category: "DBMS",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 31,
    title: "What is indexing in databases? Explain B-Tree and Hash indexing.",
    answer: "Indexing creates a data structure to speed up data retrieval at the cost of extra storage and slower writes. B-Tree Index: Balanced tree where each node can have multiple keys and children. Supports range queries, equality, sorting. Most common index type. B+ Tree variant stores data only in leaves, with leaves linked for efficient range scans. Time: O(log n) for search. Hash Index: Maps keys to bucket locations via hash function. O(1) for equality lookups but doesn't support range queries or sorting. Best for exact match queries. Composite index: index on multiple columns — follows leftmost prefix rule. Covering index: contains all columns needed, avoiding table lookup. Over-indexing slows writes.",
    companies: ["Amazon", "Google", "Microsoft", "Oracle"],
    category: "DBMS",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 32,
    title: "Explain SQL vs NoSQL databases. When would you use each?",
    answer: "SQL databases are relational, table-based, with fixed schemas and support ACID transactions. Examples: PostgreSQL, MySQL, Oracle. Good for structured data, complex queries, joins, and transactional integrity. NoSQL databases are non-relational with flexible schemas. Types: Document (MongoDB), Key-Value (Redis, DynamoDB), Column-Family (Cassandra), Graph (Neo4j). Good for unstructured data, horizontal scaling, high throughput. Use SQL when: data is structured, relationships are important, ACID is required (banking, e-commerce). Use NoSQL when: schema evolves rapidly, massive scale needed, high write throughput, data is denormalized (social media feeds, IoT, real-time analytics). Many systems use both (polyglot persistence).",
    companies: ["Amazon", "Google", "Meta", "Netflix", "Flipkart"],
    category: "DBMS",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 33,
    title: "What is a transaction? Explain isolation levels.",
    answer: "A transaction is a sequence of operations performed as a single logical unit. It must satisfy ACID properties. Isolation levels control how transaction integrity is visible to other transactions: 1) Read Uncommitted: Can read uncommitted data (dirty reads). Fastest but least safe. 2) Read Committed: Only reads committed data. Prevents dirty reads. Default in PostgreSQL. 3) Repeatable Read: Same read returns same result within a transaction. Prevents non-repeatable reads. Default in MySQL/InnoDB. 4) Serializable: Transactions execute as if serial. Prevents phantom reads. Slowest but most consistent. Trade-off: higher isolation = more locking = less concurrency. MVCC (used by PostgreSQL, Oracle) provides consistency without heavy locking.",
    companies: ["Goldman Sachs", "Amazon", "Microsoft", "Google"],
    category: "DBMS",
    difficulty: "Hard",
    round: "Technical"
  },
  {
    id: 34,
    title: "What is database sharding? How does it work?",
    answer: "Sharding horizontally partitions data across multiple database servers. Each shard holds a subset of total data. Shard Key determines data distribution — e.g., user_id % N. Types: 1) Range-based: shard by ranges (A-M, N-Z). Simple but can cause hotspots. 2) Hash-based: hash(key) % N. Even distribution but poor range queries. 3) Directory-based: lookup table maps keys to shards. Flexible but the directory is a single point of failure. Challenges: Cross-shard queries (require scatter-gather), transactions across shards, resharding when adding nodes. Solutions: Consistent hashing for minimal redistribution. Use sharding when a single database can't handle the load. Avoid premature sharding — start with read replicas.",
    companies: ["Amazon", "Meta", "Google", "Uber", "Stripe"],
    category: "DBMS",
    difficulty: "Hard",
    round: "System Design"
  },

  // ──────────────────────────── NETWORKING ────────────────────────────
  {
    id: 35,
    title: "What happens when you type google.com in the browser?",
    answer: "1) DNS Resolution: Browser checks cache → OS cache → Router cache → ISP DNS → Root DNS → TLD DNS → Authoritative DNS. Returns IP address. 2) TCP Connection: Three-way handshake (SYN → SYN-ACK → ACK) to establish connection. If HTTPS, TLS handshake follows (certificate exchange, key agreement). 3) HTTP Request: Browser sends GET / HTTP/1.1 with headers (Host, User-Agent, Accept, Cookies). 4) Server Processing: Load balancer routes to web server, which may query databases/caches, renders response. 5) HTTP Response: Status code 200, headers (Content-Type, Cache-Control), HTML body. 6) Browser Rendering: Parse HTML → build DOM tree → Parse CSS → build CSSOM → combine into Render Tree → Layout → Paint → Composite. JavaScript execution can block or modify DOM.",
    companies: ["Google", "Microsoft", "Amazon", "Meta", "Apple"],
    category: "Networking",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 36,
    title: "Explain the TCP/IP model and its layers.",
    answer: "TCP/IP has 4 layers (vs OSI's 7): 1) Application Layer: Provides protocols for user-facing services — HTTP, HTTPS, FTP, SMTP, DNS, SSH. Data unit: Message. 2) Transport Layer: End-to-end communication and reliability. TCP (reliable, ordered, connection-oriented) and UDP (fast, connectionless, no guarantee). Data unit: Segment/Datagram. 3) Internet Layer: Logical addressing and routing. IP (IPv4/IPv6), ICMP (ping), ARP (IP→MAC). Data unit: Packet. 4) Network Access Layer: Physical transmission over the medium — Ethernet, Wi-Fi, MAC addressing. Data unit: Frame. Data flows down (encapsulation) on sending and up (decapsulation) on receiving, with each layer adding/removing its header.",
    companies: ["TCS", "Infosys", "Wipro", "Cisco", "Amazon"],
    category: "Networking",
    difficulty: "Easy",
    round: "Technical"
  },
  {
    id: 37,
    title: "TCP vs UDP — differences and use cases.",
    answer: "TCP (Transmission Control Protocol): Connection-oriented (3-way handshake), reliable (acknowledgments, retransmission), ordered delivery, flow control (sliding window), congestion control. Overhead: 20+ byte header. Use cases: HTTP/HTTPS (web), FTP (file transfer), SMTP (email), SSH. UDP (User Datagram Protocol): Connectionless, unreliable (no acknowledgments), unordered, no flow/congestion control. Overhead: 8-byte header. Use cases: DNS (quick lookups), video/audio streaming (slight loss acceptable), gaming (low latency critical), VoIP, IoT. Trade-off: TCP = reliability at cost of speed; UDP = speed at cost of reliability. QUIC (used by HTTP/3) is built on UDP but adds reliability.",
    companies: ["Google", "Amazon", "Microsoft", "Cisco", "TCS"],
    category: "Networking",
    difficulty: "Easy",
    round: "Technical"
  },
  {
    id: 38,
    title: "What is HTTPS? How does TLS/SSL handshake work?",
    answer: "HTTPS = HTTP + TLS (Transport Layer Security). TLS handshake: 1) Client Hello: Client sends supported cipher suites, TLS version, client random. 2) Server Hello: Server selects cipher suite, sends server random and digital certificate (containing public key, signed by CA). 3) Certificate Verification: Client verifies certificate chain against trusted CAs. 4) Key Exchange: Client generates pre-master secret, encrypts with server's public key, sends to server. Both derive session keys from client random + server random + pre-master secret. 5) Finished: Both sides send 'Finished' message encrypted with session key. 6) Symmetric Encryption: All subsequent data encrypted with shared session key (AES). This combines asymmetric (slow, for key exchange) and symmetric (fast, for data) encryption.",
    companies: ["Google", "Amazon", "Microsoft", "Cloudflare"],
    category: "Networking",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 39,
    title: "What is DNS? How does DNS resolution work?",
    answer: "DNS (Domain Name System) translates human-readable domain names to IP addresses. Resolution process: 1) Browser cache → OS cache → Router cache. 2) If not cached, query ISP's recursive DNS resolver. 3) Resolver queries Root DNS server (13 root server clusters globally) → returns TLD server address (.com, .org). 4) Query TLD DNS server → returns authoritative nameserver for the domain. 5) Query Authoritative DNS server → returns the IP address (A record for IPv4, AAAA for IPv6). Types of DNS records: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), NS (nameserver), TXT (verification). TTL controls caching duration. DNS uses UDP port 53 for queries (fast) and TCP for zone transfers (reliable).",
    companies: ["Google", "Amazon", "Cloudflare", "Microsoft", "TCS"],
    category: "Networking",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 40,
    title: "What is a CDN (Content Delivery Network)? How does it work?",
    answer: "A CDN is a globally distributed network of edge servers that cache and deliver content close to users, reducing latency. How it works: 1) User requests content (e.g., image). DNS routes to nearest CDN edge server (via anycast/geolocation). 2) If edge has cached content (cache hit), return immediately. 3) If cache miss, edge fetches from origin server, caches it, and returns to user. Key features: Static content caching (images, CSS, JS), dynamic content acceleration, DDoS protection, SSL termination at edge. Cache invalidation: TTL-based, purge APIs, versioned URLs. Providers: Cloudflare, AWS CloudFront, Akamai. Benefits: Reduced latency, lower origin load, improved availability through redundancy.",
    companies: ["Amazon", "Google", "Netflix", "Cloudflare"],
    category: "Networking",
    difficulty: "Medium",
    round: "Technical"
  },

  // ──────────────────────────── OOP & LANGUAGE CONCEPTS ────────────────────────────
  {
    id: 41,
    title: "Explain the four pillars of Object-Oriented Programming.",
    answer: "1) Encapsulation: Bundling data and methods together, hiding internal state. Access modifiers (private, protected, public) control visibility. Getters/setters expose controlled access. 2) Abstraction: Hiding complex implementation details, exposing only necessary interfaces. Achieved through abstract classes and interfaces. 3) Inheritance: Creating new classes from existing ones, promoting code reuse. Types: single, multilevel, hierarchical. Java doesn't support multiple class inheritance (uses interfaces instead). 4) Polymorphism: Same interface, different behavior. Compile-time (method overloading — same name, different parameters) and Runtime (method overriding — subclass provides specific implementation). Enables programming to interfaces, not implementations.",
    companies: ["TCS", "Infosys", "Wipro", "Amazon", "Microsoft"],
    category: "OOP",
    difficulty: "Easy",
    round: "Technical"
  },
  {
    id: 42,
    title: "What are SOLID principles? Explain each.",
    answer: "SOLID are five design principles for maintainable OOP code. S — Single Responsibility: A class should have one reason to change. One job per class. O — Open/Closed: Open for extension, closed for modification. Use polymorphism to add behavior without changing existing code. L — Liskov Substitution: Subclasses should be substitutable for their parent without breaking behavior. If S is a subtype of T, objects of T can be replaced with S. I — Interface Segregation: Don't force classes to implement interfaces they don't use. Many specific interfaces over one general-purpose interface. D — Dependency Inversion: Depend on abstractions (interfaces), not concretions (implementations). High-level modules shouldn't depend on low-level modules; both should depend on abstractions.",
    companies: ["Google", "Amazon", "Microsoft", "ThoughtWorks"],
    category: "OOP",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 43,
    title: "What is the difference between abstract class and interface?",
    answer: "Abstract Class: Can have both abstract and concrete methods. Can have constructors, state (instance variables), and access modifiers. A class can extend only one abstract class (single inheritance). Use when classes share common behavior AND state. Interface: All methods are implicitly abstract (Java 8+ allows default and static methods). No constructors or instance state (only constants). A class can implement multiple interfaces. Use to define contracts/capabilities. When to use which: If you need shared code/state → abstract class. If you need multiple inheritance or defining a contract → interface. Example: Comparable (interface — any class can be comparable) vs Animal (abstract class — shared properties like name, age).",
    companies: ["TCS", "Infosys", "Wipro", "Amazon", "Microsoft"],
    category: "OOP",
    difficulty: "Easy",
    round: "Technical"
  },
  {
    id: 44,
    title: "What are design patterns? Explain Singleton, Factory, and Observer.",
    answer: "Design patterns are reusable solutions to common software design problems. Singleton: Ensures only one instance of a class exists. Private constructor, static instance. Thread-safe via synchronized or enum. Use: config managers, connection pools. Risks: global state, hard to test. Factory: Creates objects without specifying exact class. Defines interface for creating objects; subclasses decide which class to instantiate. Use: when creation logic is complex, decoupling client from concrete classes. Observer: One-to-many dependency — when subject state changes, all dependent observers are notified. Use: event systems, MVC (model notifies views), pub-sub. Components: Subject (maintains observer list, notifies), Observer (interface with update method). Java: Observable/Observer (deprecated), now use PropertyChangeListener or reactive libraries.",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Flipkart"],
    category: "OOP",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 45,
    title: "What is multithreading in Java? Explain Thread lifecycle and synchronization.",
    answer: "Multithreading allows concurrent execution of multiple threads within a process, improving CPU utilization. Thread lifecycle: New → Runnable (start()) → Running (scheduler picks) → Blocked/Waiting (wait/sleep/join/lock) → Terminated (run() completes). Creating threads: extend Thread class or implement Runnable interface (preferred — allows extending another class). Synchronization prevents race conditions when threads share mutable data. synchronized keyword — intrinsic lock on object/method. volatile — ensures visibility of changes across threads (no caching). wait()/notify() — inter-thread communication. Modern alternatives: java.util.concurrent — ExecutorService (thread pool), ReentrantLock (explicit lock with tryLock), CountDownLatch, Semaphore, ConcurrentHashMap, CompletableFuture.",
    companies: ["Amazon", "Google", "Microsoft", "Goldman Sachs"],
    category: "OOP",
    difficulty: "Hard",
    round: "Technical"
  },
  {
    id: 46,
    title: "Explain garbage collection in Java. How does the JVM manage memory?",
    answer: "JVM memory: Heap (objects), Stack (method calls, local variables), Metaspace (class metadata). Heap is divided into Young Generation (Eden + Survivor spaces S0, S1) and Old Generation. GC process: 1) New objects created in Eden. 2) Minor GC: When Eden fills, live objects copied to Survivor space, dead objects removed. Objects surviving multiple minor GCs get promoted to Old Gen. 3) Major/Full GC: Cleans Old Gen. More expensive, causes longer pauses. GC algorithms: Serial (single thread), Parallel (multiple threads), CMS (Concurrent Mark Sweep — low pause), G1 (Garbage First — default since Java 9, divides heap into regions). ZGC and Shenandoah for ultra-low pause times. Objects become eligible for GC when no references point to them.",
    companies: ["Amazon", "Google", "Microsoft", "Oracle"],
    category: "OOP",
    difficulty: "Hard",
    round: "Technical"
  },

  // ──────────────────────────── WEB DEVELOPMENT ────────────────────────────
  {
    id: 47,
    title: "Explain the difference between cookies, localStorage, and sessionStorage.",
    answer: "Cookies: Small data (4KB max) sent with every HTTP request to the server. Can set expiration, domain, path, Secure, HttpOnly, SameSite flags. Use: authentication tokens, tracking, server-side sessions. localStorage: Stores data (5-10MB) in the browser with no expiration — persists until explicitly cleared. Not sent with requests. Accessible only client-side. Use: user preferences, cached data. sessionStorage: Same as localStorage but scoped to a browser tab/session — cleared when tab closes. Use: temporary form data, single-session state. Security considerations: Cookies with HttpOnly can't be accessed by JavaScript (XSS protection). localStorage/sessionStorage are vulnerable to XSS. Never store sensitive data in localStorage.",
    companies: ["Google", "Amazon", "Meta", "Flipkart"],
    category: "Web Development",
    difficulty: "Easy",
    round: "Technical"
  },
  {
    id: 48,
    title: "What is the event loop in JavaScript? Explain the call stack and task queue.",
    answer: "JavaScript is single-threaded but handles async operations via the event loop. Call Stack: Executes functions in LIFO order. When a function is called, it's pushed; when it returns, it's popped. Web APIs: Browser-provided async APIs (setTimeout, fetch, DOM events). When an async operation completes, its callback is placed in the Task Queue. Task Queue (Macrotask): Holds callbacks from setTimeout, setInterval, I/O. Microtask Queue: Holds Promise callbacks (.then/.catch), MutationObserver. Has higher priority than macrotask queue. Event Loop: Continuously checks — if call stack is empty, first drain all microtasks, then take one macrotask. This is why Promise.then() runs before setTimeout(cb, 0). Understanding this prevents common bugs with async timing.",
    companies: ["Google", "Meta", "Amazon", "Flipkart", "Uber"],
    category: "Web Development",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 49,
    title: "What are closures in JavaScript? Give a practical example.",
    answer: "A closure is a function that has access to variables from its outer (enclosing) function's scope, even after the outer function has returned. This works because JavaScript functions carry a reference to their lexical environment. Example: function counter() { let count = 0; return function() { return ++count; }; } const inc = counter(); inc(); // 1, inc(); // 2. The inner function 'closes over' the count variable. Practical uses: data privacy (module pattern), function factories, memoization, event handlers with state, currying. Common interview trap: for(var i=0; i<3; i++) { setTimeout(()=>console.log(i), 0); } prints 3,3,3 because var is function-scoped. Fix: use let (block-scoped) or IIFE to create a new closure per iteration.",
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Snapchat"],
    category: "Web Development",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 50,
    title: "Explain the differences between var, let, and const in JavaScript.",
    answer: "var: Function-scoped, hoisted (initialized as undefined), can be re-declared and updated. Creates property on global object if declared globally. let: Block-scoped, hoisted but NOT initialized (Temporal Dead Zone — accessing before declaration throws ReferenceError), can be updated but not re-declared in same scope. const: Block-scoped, hoisted but not initialized (TDZ), MUST be initialized at declaration, cannot be reassigned. However, const objects/arrays are mutable (properties can be changed). Use const by default (signals immutability intent), let when reassignment is needed, avoid var. var causes common bugs with for-loops and closures due to function scoping.",
    companies: ["TCS", "Infosys", "Wipro", "Meta", "Google"],
    category: "Web Development",
    difficulty: "Easy",
    round: "Technical"
  },
  {
    id: 51,
    title: "What is React's Virtual DOM? How does reconciliation work?",
    answer: "The Virtual DOM is a lightweight JavaScript representation of the actual DOM. When state changes: 1) React creates a new Virtual DOM tree. 2) Diffing: React compares new VDOM with the previous one using its reconciliation algorithm. 3) React calculates the minimal set of changes needed. 4) Batched Update: Changes are applied to the real DOM in one batch (avoids expensive per-change reflows/repaints). Reconciliation rules: Different element types → replace entire subtree. Same type → update attributes, recurse on children. Keys help React identify which items in a list changed, moved, or were added/removed — stabilizing the diff. React Fiber (v16+) makes reconciliation interruptible, allowing prioritization of urgent updates (like user input) over less critical ones.",
    companies: ["Meta", "Google", "Amazon", "Flipkart", "Snapchat"],
    category: "Web Development",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 52,
    title: "Explain REST vs GraphQL.",
    answer: "REST: Resource-based architecture. Each endpoint represents a resource (/users, /users/1). Uses HTTP methods (GET, POST, PUT, DELETE). Multiple endpoints for different data. Can lead to over-fetching (getting unnecessary fields) and under-fetching (needing multiple requests). Simple, cacheable (HTTP caching), widely supported. GraphQL: Query language for APIs. Single endpoint (/graphql). Client specifies exactly what data it needs. Returns only requested fields — no over/under-fetching. Supports subscriptions for real-time updates via WebSockets. Schema-typed (strongly typed). Challenges: caching is more complex, N+1 query problem on backend, steeper learning curve. Use REST for simple CRUD APIs; GraphQL for complex UIs with varying data needs (e.g., mobile vs web clients).",
    companies: ["Meta", "Google", "Amazon", "Shopify", "GitHub"],
    category: "Web Development",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 53,
    title: "What is CORS? How does it work?",
    answer: "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts web pages from making requests to a different origin (domain, port, or protocol). Same-Origin Policy blocks cross-origin requests by default. CORS workflow: 1) Simple requests (GET, POST with standard headers): Browser adds Origin header. Server responds with Access-Control-Allow-Origin. If origin is allowed, browser permits the response. 2) Preflight requests (PUT, DELETE, custom headers): Browser sends OPTIONS request first with Access-Control-Request-Method and Access-Control-Request-Headers. Server responds with allowed methods/headers. If permitted, actual request follows. Key headers: Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Access-Control-Allow-Credentials (for cookies). Server-side configuration is required.",
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    category: "Web Development",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 54,
    title: "What is the difference between authentication and authorization?",
    answer: "Authentication (AuthN): Verifying WHO you are. Proves identity. Methods: Passwords, JWT tokens, OAuth, biometrics, multi-factor authentication. Authorization (AuthZ): Determining WHAT you can do. Checks permissions. Methods: Role-Based Access Control (RBAC — roles like admin, user), Attribute-Based (ABAC — rules based on attributes), OAuth scopes. Flow example: 1) User logs in (authentication) with credentials. 2) Server issues JWT containing user info and roles. 3) On each request, server validates JWT (authentication) and checks if the user's role permits the action (authorization). 401 Unauthorized = authentication failed. 403 Forbidden = authenticated but not authorized. Always authenticate before authorizing.",
    companies: ["Amazon", "Google", "Microsoft", "Okta", "Auth0"],
    category: "Web Development",
    difficulty: "Easy",
    round: "Technical"
  },

  // ──────────────────────────── BEHAVIORAL / HR ────────────────────────────
  {
    id: 55,
    title: "Tell me about yourself.",
    answer: "Structure using Present-Past-Future: 1) Present: 'I'm currently a [role] at [company/project] where I focus on [key responsibility].' Briefly highlight one current achievement. 2) Past: 'Previously, I [key experience] at [company], where I [specific accomplishment with metrics].' Connect past experience to the role. 3) Future: 'I'm excited about this role because [specific reason tied to the company/position]. I want to leverage my experience in [skill] to contribute to [goal].' Keep it 60-90 seconds. Don't recite your resume. Be authentic but strategic — highlight experiences relevant to the role. End with enthusiasm about the opportunity.",
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple", "TCS", "Infosys"],
    category: "Behavioral",
    difficulty: "Easy",
    round: "HR/Behavioral"
  },
  {
    id: 56,
    title: "Describe a time you faced a conflict at work. How did you handle it?",
    answer: "Use STAR method: Situation: 'During a sprint planning at [company], my teammate and I disagreed on the architecture for a new microservice. He wanted a monolithic approach, while I advocated for a microservices-based design.' Task: 'We needed to reach consensus before the sprint started to avoid blocking the team.' Action: 'I scheduled a 1:1, actively listened to his concerns (deployment complexity, learning curve), and shared data from a similar project where microservices reduced downtime by 40%. I proposed a hybrid approach—starting with a modular monolith with clear service boundaries, making it easy to split later.' Result: 'We aligned on the hybrid approach, delivered 2 weeks early, and the modular design made scaling easier when traffic tripled.' Key: Show empathy, data-driven decision-making, and collaboration — not 'winning.'",
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
    category: "Behavioral",
    difficulty: "Medium",
    round: "HR/Behavioral"
  },
  {
    id: 57,
    title: "Why do you want to work at this company?",
    answer: "Framework: Research + Alignment + Contribution. 1) Specific Knowledge: Show you've researched — mention a recent product launch, engineering blog post, or company value. 'I read your engineering blog on how you migrated to gRPC, which reduced latency by 30%. That kind of technical depth excites me.' 2) Values Alignment: Connect your values to theirs. 'Your commitment to [value, e.g., customer obsession / moving fast] resonates with how I work.' 3) Mutual Benefit: What you'll contribute. 'My experience in distributed systems and my track record of reducing API latency by 50% at my current role would directly contribute to your platform's performance goals.' Avoid: generic answers, mentioning only brand/prestige, or focusing only on what you'll gain.",
    companies: ["All Companies"],
    category: "Behavioral",
    difficulty: "Easy",
    round: "HR/Behavioral"
  },
  {
    id: 58,
    title: "Tell me about a time you failed. What did you learn?",
    answer: "STAR: Situation: 'I led a feature launch for a recommendation engine update. We had tight deadlines and I chose to skip comprehensive load testing to ship on time.' Task: 'Ensure a smooth launch while meeting the deadline.' Action: 'We deployed on schedule, but the service crashed within 2 hours under peak traffic — our cache layer couldn't handle the new query patterns. I immediately led the incident response: rolled back, communicated transparently with stakeholders, and organized a post-mortem.' Result: 'The rollback minimized user impact to 45 minutes. The post-mortem led to 3 process improvements: mandatory load testing in CI/CD, a pre-launch checklist, and staging environment traffic simulation. The next launch had zero incidents.' Lesson: 'Speed without quality is an illusion. I now build testing into the timeline, not as an afterthought.'",
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
    category: "Behavioral",
    difficulty: "Medium",
    round: "HR/Behavioral"
  },
  {
    id: 59,
    title: "Where do you see yourself in 5 years?",
    answer: "Show ambition aligned with the company's growth. 'In 5 years, I see myself as a senior/staff engineer who has made significant technical contributions — owning a critical system, mentoring junior engineers, and influencing architectural decisions. I want to deepen my expertise in [relevant tech area, e.g., distributed systems, ML infrastructure] while growing my ability to lead cross-functional projects. I'm drawn to this role specifically because [company]'s scale offers problems that would accelerate that growth.' Don't say: 'I want to be a manager' (unless applying for management track), mentions of other companies, or overly vague answers. The goal is to show you're invested in growing WITH the company.",
    companies: ["All Companies"],
    category: "Behavioral",
    difficulty: "Easy",
    round: "HR/Behavioral"
  },
  {
    id: 60,
    title: "Tell me about a time you went above and beyond.",
    answer: "STAR: Situation: 'At [company], our key client reported intermittent API failures just before a major product demo. The issue wasn't assigned to my team.' Task: 'The bug needed urgent resolution, and the responsible team was in a different timezone, 8 hours away.' Action: 'I volunteered to investigate. Traced the issue through logs to a race condition in our connection pooling logic during high-concurrency scenarios. I wrote a fix with exponential backoff and connection validation, added regression tests, and deployed to staging by 2 AM. I also documented a runbook for similar issues.' Result: 'The client's demo went flawlessly. The fix reduced connection errors by 99.7% across all environments. My manager recognized it in the quarterly review, and the runbook prevented 3 similar incidents in the following month.' Show initiative, impact, and selflessness.",
    companies: ["Amazon", "Google", "Microsoft", "Startups"],
    category: "Behavioral",
    difficulty: "Medium",
    round: "HR/Behavioral"
  },

  // ──────────────────────────── MORE DSA & ALGORITHMS ────────────────────────────
  {
    id: 61,
    title: "What is the difference between BFS and DFS? When would you use each?",
    answer: "BFS (Breadth-First Search): Uses queue, explores level by level. Space: O(V). Finds shortest path in unweighted graphs. Better for: shortest path problems, level-order traversal, finding nearest node, social network friend suggestions. DFS (Depth-First Search): Uses stack/recursion, explores as deep as possible then backtracks. Space: O(V) worst case. Better for: topological sorting, cycle detection, pathfinding in mazes, solving puzzles (Sudoku), strongly connected components, tree traversal (preorder/inorder/postorder). Key trade-off: BFS uses more memory for wide graphs; DFS uses more memory for deep graphs. BFS guarantees shortest path; DFS does not (without modifications).",
    companies: ["Google", "Meta", "Amazon", "Microsoft"],
    category: "Algorithms",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 62,
    title: "Explain the two-pointer technique with examples.",
    answer: "Two-pointer uses two indices to traverse data structures efficiently, typically reducing O(n²) to O(n). Types: 1) Opposite ends: Start from both ends, move inward. Example: Two Sum in sorted array — if sum < target, move left pointer right; if sum > target, move right pointer left. 2) Same direction (fast/slow): Slow pointer at start, fast moves ahead. Example: Remove duplicates in-place from sorted array — slow tracks unique position, fast scans ahead. 3) Sliding window variant: Two pointers define a window that expands/contracts. Example: Longest substring without repeating characters. Key requirement: data often needs to be sorted or have some ordering property. Problems: Container with most water, 3Sum, trapping rain water, palindrome check.",
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Uber"],
    category: "Algorithms",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 63,
    title: "What is backtracking? Explain with the N-Queens problem.",
    answer: "Backtracking is a systematic approach to solve constraint satisfaction problems by building solutions incrementally and abandoning (backtracking from) partial solutions that can't lead to a valid solution. N-Queens: Place N queens on an N×N chessboard so no two queens attack each other (same row, column, or diagonal). Algorithm: Place queens one row at a time. For each row, try each column. Check if position is safe (no conflicts with placed queens). If safe, place queen and recurse to next row. If no valid position exists, backtrack — remove the queen and try the next column. Base case: all N queens placed. For N=8, there are 92 solutions. Time complexity: O(N!) but pruning significantly reduces actual computation. Similar problems: Sudoku solver, permutations, combinations, word search.",
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    category: "Algorithms",
    difficulty: "Hard",
    round: "Technical"
  },
  {
    id: 64,
    title: "Find the median of two sorted arrays in O(log(min(n,m))) time.",
    answer: "Use binary search on the smaller array. Key insight: For median, we need to partition both arrays such that left halves combined have ⌊(n+m+1)/2⌋ elements, and all left elements ≤ all right elements. Binary search on partition position i in smaller array (0 to n). j = (n+m+1)/2 - i for larger array. Check: maxLeft1 ≤ minRight2 AND maxLeft2 ≤ minRight1. If maxLeft1 > minRight2, move i left. If maxLeft2 > minRight1, move i right. If valid partition found: odd total → max(maxLeft1, maxLeft2). Even total → (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2. Handle edge cases with ±∞ for empty partitions. Time: O(log(min(n,m))). This is a classic Google/Meta question.",
    companies: ["Google", "Meta", "Amazon", "Apple", "Microsoft"],
    category: "Algorithms",
    difficulty: "Hard",
    round: "Technical"
  },
  {
    id: 65,
    title: "Explain the concept of greedy algorithms. When can they be used?",
    answer: "Greedy algorithms make locally optimal choices at each step, hoping for a globally optimal solution. They work when the problem has: 1) Greedy-choice property — a globally optimal solution can be reached by making locally optimal choices. 2) Optimal substructure — optimal solution to the problem contains optimal solutions to subproblems. Classic examples: Activity Selection (pick earliest finishing activity), Huffman Coding (build tree greedily by frequency), Dijkstra's Algorithm (choose nearest unvisited vertex), Kruskal's/Prim's (MST — pick cheapest edge/vertex). When NOT to use: coin change with arbitrary denominations (greedy may fail; use DP), 0/1 Knapsack (greedy works for fractional, not 0/1). Always verify greedy-choice property via proof or counterexample.",
    companies: ["Google", "Amazon", "Microsoft", "Goldman Sachs"],
    category: "Algorithms",
    difficulty: "Medium",
    round: "Technical"
  },

  // ──────────────────────────── MORE SYSTEM DESIGN ────────────────────────────
  {
    id: 66,
    title: "Design a distributed file storage system like Google Drive.",
    answer: "Requirements: Upload/download files, share, sync across devices, versioning. Architecture: Client → API Gateway → File Service → Block Storage + Metadata DB. Files split into chunks (4-8MB). Each chunk stored across 3 replicas for durability. Metadata (file name, chunks, ownership, permissions) in relational DB (PostgreSQL). Chunk storage: Distributed file system (similar to GFS/HDFS) or object storage (S3). Sync: Client maintains local snapshot of file tree. On change, compute diff, upload changed chunks. Use long-polling or WebSocket for real-time sync notifications. Deduplication: Hash each chunk — if hash exists, reference existing chunk (content-addressable storage). Versioning: Keep metadata history per file. Sharing: ACL (Access Control List) per file/folder.",
    companies: ["Google", "Amazon", "Microsoft", "Dropbox"],
    category: "System Design",
    difficulty: "Hard",
    round: "System Design"
  },
  {
    id: 67,
    title: "Design a job scheduler system like cron.",
    answer: "Requirements: Schedule recurring and one-time jobs, distributed execution, fault tolerance, monitoring. Architecture: 1) Scheduler Service: Accepts job definitions (cron expression, HTTP endpoint/script, retry policy). Stores in DB. 2) Job Queue: Scheduler scans upcoming jobs, enqueues into priority queue (Redis sorted set by next_run_time). 3) Worker Pool: Workers dequeue and execute jobs. Heartbeat mechanism for liveness. If worker dies mid-job, job is re-queued after timeout. 4) Lock Service: Distributed lock (Redis/Zookeeper) ensures each job runs exactly once across multiple scheduler instances. 5) Dead Letter Queue: Failed jobs after max retries. Scalability: Partition jobs by ID range across scheduler instances. Monitoring: Dashboard for job status, execution history, alerts on failures.",
    companies: ["Amazon", "Google", "Uber", "LinkedIn"],
    category: "System Design",
    difficulty: "Hard",
    round: "System Design"
  },
  {
    id: 68,
    title: "How would you design YouTube or Netflix video streaming?",
    answer: "Components: 1) Upload Pipeline: Video uploaded → transcoded into multiple resolutions/codecs (H.264, VP9) using FFmpeg workers → stored on object storage (S3) → CDN distribution. 2) Video Serving: Client requests video → nearest CDN edge serves segments. Adaptive Bitrate Streaming (ABR): HLS/DASH protocols. Client dynamically switches quality based on bandwidth. 3) Recommendation: ML models using collaborative filtering (similar users) + content-based filtering. Trained on watch history, likes, time spent. 4) Search: Elasticsearch for video metadata. 5) Database: User data in SQL. Video metadata in NoSQL. Watch history in Cassandra. 6) Scale: CDN for global delivery, microservices for each concern, event-driven architecture for async processing (Kafka). Pre-generate thumbnails and previews.",
    companies: ["Google", "Netflix", "Amazon", "Meta"],
    category: "System Design",
    difficulty: "Hard",
    round: "System Design"
  },

  // ──────────────────────────── MORE OS ────────────────────────────
  {
    id: 69,
    title: "What are system calls? Give examples.",
    answer: "System calls are the interface between user-space applications and the kernel. They request OS services that require privileged access. Process: User program → trap instruction → mode switch (user → kernel) → kernel executes service → return to user mode. Categories: 1) Process Control: fork() (create process), exec() (run program), wait() (wait for child), exit() (terminate). 2) File Management: open(), read(), write(), close(), stat(). 3) Device Management: ioctl(), read/write to devices. 4) Information: getpid(), time(), uname(). 5) Communication: pipe(), shmget() (shared memory), socket(), send(), recv(). 6) Memory: mmap(), brk(). System calls are slower than regular function calls due to the user-kernel mode switch (context switch overhead).",
    companies: ["Google", "Microsoft", "Amazon", "Apple", "Qualcomm"],
    category: "Operating Systems",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 70,
    title: "What is the difference between monolithic and microkernel architectures?",
    answer: "Monolithic Kernel: All OS services (file system, device drivers, memory management, networking) run in kernel space as a single binary. Pros: High performance (no IPC overhead), tight integration. Cons: Large codebase, harder to maintain, one bug can crash entire system. Examples: Linux, Windows NT. Microkernel: Only essential services (IPC, basic scheduling, memory management) in kernel; everything else (file systems, drivers) runs in user space as separate processes. Pros: Modularity, stability (driver crash doesn't crash kernel), easier to extend. Cons: IPC overhead between components, potentially slower. Examples: Minix, QNX, seL4. Hybrid approach: macOS/Windows use hybrid — core is microkernel-inspired with some services in kernel for performance.",
    companies: ["Google", "Microsoft", "Apple", "Qualcomm"],
    category: "Operating Systems",
    difficulty: "Medium",
    round: "Technical"
  },

  // ──────────────────────────── MORE DBMS ────────────────────────────
  {
    id: 71,
    title: "What is CAP theorem? Explain with examples.",
    answer: "CAP theorem states that a distributed system can guarantee at most 2 of 3 properties: Consistency (all nodes see the same data at the same time), Availability (every request gets a response), Partition Tolerance (system operates despite network partitions). Since network partitions are unavoidable in distributed systems, the real choice is CP vs AP. CP (Consistency + Partition Tolerance): System returns error or timeout during partition rather than stale data. Examples: HBase, MongoDB (default), Zookeeper. AP (Availability + Partition Tolerance): System always responds but might return stale data. Examples: Cassandra, DynamoDB, CouchDB. In practice, many systems are tunable — Cassandra allows tuning consistency level per query (ONE, QUORUM, ALL).",
    companies: ["Amazon", "Google", "Meta", "Netflix"],
    category: "DBMS",
    difficulty: "Hard",
    round: "Technical"
  },
  {
    id: 72,
    title: "Explain database replication — master-slave vs master-master.",
    answer: "Replication copies data across multiple servers for availability, fault tolerance, and read scaling. Master-Slave (Primary-Replica): One master handles all writes. Slaves replicate master's data and serve reads. Pros: Simple, read scaling, no write conflicts. Cons: Write bottleneck on master, replication lag (eventual consistency), failover complexity. Master-Master (Multi-Primary): Multiple masters accept writes. Changes replicate between masters. Pros: Write scaling, no single point of failure. Cons: Write conflicts (resolved via last-write-wins, vector clocks, or application logic), more complex. Async replication: Faster but risks data loss on master failure. Sync replication: Consistent but slower (wait for replica ACK). Semi-sync: Wait for at least one replica.",
    companies: ["Amazon", "Google", "Microsoft", "Oracle"],
    category: "DBMS",
    difficulty: "Hard",
    round: "Technical"
  },

  // ──────────────────────────── MORE WEB DEV ────────────────────────────
  {
    id: 73,
    title: "What is a Promise in JavaScript? Explain async/await.",
    answer: "A Promise represents a value that may be available now, later, or never. States: Pending → Fulfilled (resolved with value) or Rejected (with error). Created: new Promise((resolve, reject) => { ... }). Chaining: .then(value => ...).catch(error => ...).finally(() => ...). Promise.all() waits for all promises; Promise.race() returns first settled; Promise.allSettled() waits for all regardless of outcome. async/await: Syntactic sugar over Promises. 'async' before a function makes it return a Promise. 'await' pauses execution until the Promise resolves. Use try/catch for error handling. Benefits: More readable than .then() chains, looks synchronous. Gotcha: await blocks within the async function, not the entire program. Concurrent awaits: use Promise.all([p1, p2]) instead of sequential await p1; await p2.",
    companies: ["Google", "Meta", "Amazon", "Flipkart", "Snapchat"],
    category: "Web Development",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 74,
    title: "Explain the difference between SSR, CSR, SSG, and ISR.",
    answer: "CSR (Client-Side Rendering): Browser downloads minimal HTML + JS bundle. JS renders content in browser. Pros: Rich interactivity after load. Cons: Slow initial load, poor SEO. Example: Create React App. SSR (Server-Side Rendering): Server generates full HTML for each request. Pros: Fast initial load, good SEO. Cons: Higher server load, TTFB. Example: Next.js getServerSideProps. SSG (Static Site Generation): HTML generated at build time. Served as static files. Pros: Fastest, highly cacheable. Cons: Stale data (rebuild needed for updates). Example: Next.js getStaticProps. ISR (Incremental Static Regeneration): Static pages regenerated after a set interval while serving stale content. Best of SSG + freshness. Example: Next.js revalidate option. Choose based on content dynamism, SEO needs, and performance requirements.",
    companies: ["Meta", "Google", "Vercel", "Netflix", "Shopify"],
    category: "Web Development",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 75,
    title: "What is XSS (Cross-Site Scripting)? How to prevent it?",
    answer: "XSS occurs when an attacker injects malicious scripts into web pages viewed by other users. Types: 1) Stored XSS: Malicious script saved in database (e.g., forum post). Runs when other users view it. Most dangerous. 2) Reflected XSS: Script embedded in URL/request, reflected in response. Requires victim to click malicious link. 3) DOM-based XSS: Vulnerability in client-side JavaScript that modifies DOM with unsanitized user input. Prevention: 1) Output encoding: Escape HTML entities (&lt; &gt; &amp; &quot;). 2) Content Security Policy (CSP) headers: Restrict script sources. 3) Input validation: Whitelist allowed characters. 4) HttpOnly cookies: Prevent JavaScript access to session cookies. 5) Use frameworks that auto-escape (React's JSX). 6) DOMPurify library for sanitizing HTML.",
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Snapchat"],
    category: "Web Development",
    difficulty: "Medium",
    round: "Technical"
  },

  // ──────────────────────────── MORE BEHAVIORAL ────────────────────────────
  {
    id: 76,
    title: "Describe a technically challenging project you worked on.",
    answer: "STAR: Situation: 'Our payment processing system was experiencing 2-3% transaction failures during peak hours, losing $200K/month.' Task: 'I was tasked with diagnosing and fixing the root cause while maintaining 99.9% uptime.' Action: 'I instrumented the system with distributed tracing (Jaeger), identified a cascading timeout issue across 3 microservices. The database connection pool was sized for average load, not peak. I implemented: circuit breaker pattern (Hystrix), connection pool auto-scaling, async processing for non-critical paths, and database query optimization (added composite indexes, reducing query time from 200ms to 15ms).' Result: 'Transaction failures dropped to 0.01%, saved $2.4M/year, and the system handled 3x traffic during a sale event with zero issues. Presented findings to the engineering org, now a standard architecture pattern.' Show depth, metrics, and impact.",
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple"],
    category: "Behavioral",
    difficulty: "Medium",
    round: "HR/Behavioral"
  },
  {
    id: 77,
    title: "How do you prioritize tasks when you have multiple deadlines?",
    answer: "Framework: 1) Assess urgency and impact: Use an Impact/Urgency matrix (Eisenhower Matrix). High impact + High urgency → Do immediately. High impact + Low urgency → Schedule dedicated time. Low impact + High urgency → Delegate if possible. Low impact + Low urgency → Deprioritize. 2) Communicate proactively: If I can't meet all deadlines, I immediately inform stakeholders with a realistic timeline and alternatives. 3) Break down tasks: Decompose large tasks into smaller deliverables. Ship incrementally. 4) Time-boxing: Allocate fixed time blocks to prevent one task from consuming all time. 5) Leverage team: Identify parallelizable work and distribute. Example: 'When I had a feature deadline and a production bug simultaneously, I triaged the bug (30-min fix), then context-switched to the feature with a revised timeline communicated to the PM.'",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "All Companies"],
    category: "Behavioral",
    difficulty: "Easy",
    round: "HR/Behavioral"
  },
  {
    id: 78,
    title: "How do you handle disagreements with your manager?",
    answer: "Approach: Respectful advocacy backed by data. 1) Listen first: Understand the manager's perspective fully. 'I sought to understand their reasoning — there might be business context or constraints I'm not aware of.' 2) Present data: If still disagree, provide clear evidence. 'I compiled benchmarks showing that approach A had 40% lower latency than approach B, and presented trade-offs objectively.' 3) Propose alternatives: Don't just critique — offer solutions. 'I suggested we run a time-boxed proof-of-concept of approach A with measurable success criteria.' 4) Disagree and commit: If the manager decides differently after hearing your case, commit fully to execution. 'Once the decision was made, I executed with full effort. I don't let disagreement affect my work quality.' 5) Circle back: If results validate your concern, use it as a learning moment constructively — not as 'I told you so.'",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    category: "Behavioral",
    difficulty: "Medium",
    round: "HR/Behavioral"
  },

  // ──────────────────────────── MORE MIXED TECHNICAL ────────────────────────────
  {
    id: 79,
    title: "What is a load balancer? Explain different algorithms.",
    answer: "A load balancer distributes incoming traffic across multiple servers to ensure no single server is overwhelmed. Types: L4 (Transport layer — based on IP/port) and L7 (Application layer — based on HTTP headers, URL, cookies). Algorithms: 1) Round Robin: Requests distributed sequentially. Simple, even distribution. 2) Weighted Round Robin: Servers get traffic proportional to their capacity. 3) Least Connections: Route to server with fewest active connections. Good for varying request durations. 4) IP Hash: Hash client IP to determine server. Ensures session stickiness. 5) Least Response Time: Route to fastest responding server. Health checks: Periodically ping servers; remove unhealthy ones. Tools: Nginx, HAProxy, AWS ALB/NLB. Redundancy: Active-passive or active-active load balancer pairs.",
    companies: ["Amazon", "Google", "Microsoft", "Netflix"],
    category: "System Design",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 80,
    title: "What is the difference between horizontal and vertical scaling?",
    answer: "Vertical Scaling (Scale Up): Increase resources of a single machine — more CPU, RAM, storage. Simpler architecture, no distributed complexity. Limits: Hardware ceiling, single point of failure, downtime during upgrade. Use when: Application is monolithic, simplicity is priority. Horizontal Scaling (Scale Out): Add more machines to the pool. Handles unlimited growth theoretically. Requires: load balancer, distributed data management, stateless services. Challenges: Data consistency, network latency, operational complexity. Use when: High availability needed, traffic is unpredictable, microservices architecture. Most modern systems use horizontal scaling. Database: Vertical (bigger server) initially → Horizontal (sharding, read replicas) at scale. Stateless app servers are easiest to scale horizontally. Stateful services (databases) require more planning.",
    companies: ["Amazon", "Google", "Netflix", "Startups"],
    category: "System Design",
    difficulty: "Easy",
    round: "Technical"
  },
  {
    id: 81,
    title: "Explain microservices architecture vs monolithic architecture.",
    answer: "Monolithic: Entire application as a single deployable unit. All components share the same process and database. Pros: Simple development, easy debugging, ACID transactions, no network overhead between components. Cons: Hard to scale individual components, large codebase, slow deployments, technology lock-in. Microservices: Application split into small, independent services. Each service has its own database, can be deployed/scaled independently, and communicates via APIs (REST/gRPC/messaging). Pros: Independent scaling, technology flexibility, smaller codebases, team autonomy, fault isolation. Cons: Distributed system complexity (network failures, eventual consistency), operational overhead (monitoring, logging, tracing), harder debugging. Start monolithic, migrate to microservices when scale/team size demands it. Amazon started as a monolith and evolved.",
    companies: ["Amazon", "Google", "Meta", "Netflix", "Uber"],
    category: "System Design",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 82,
    title: "What is Docker? Explain containers vs virtual machines.",
    answer: "Docker is a platform for building, shipping, and running applications in containers. Containers: Lightweight, isolated environments that share the host OS kernel. Include application code, runtime, libraries, and system tools. Use OS-level virtualization (namespaces, cgroups). VMs: Full OS with its own kernel running on hypervisor (VMware, VirtualBox). Each VM includes a complete OS image. Containers vs VMs: 1) Size: Containers MBs vs VMs GBs. 2) Startup: Containers seconds vs VMs minutes. 3) Isolation: VMs stronger (separate kernel) vs Containers share kernel. 4) Overhead: Containers minimal vs VMs significant. 5) Density: Run hundreds of containers per host vs tens of VMs. Docker concepts: Image (blueprint), Container (running instance), Dockerfile (build instructions), Docker Compose (multi-container apps), Docker Hub (image registry). Kubernetes orchestrates containers at scale.",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Startups"],
    category: "Web Development",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 83,
    title: "What is CI/CD? Explain the pipeline stages.",
    answer: "CI (Continuous Integration): Developers merge code frequently to a shared branch. Each merge triggers automated build and test. Catches bugs early, prevents integration hell. CD (Continuous Delivery): Code is always in a deployable state; deployment to production requires manual approval. CD (Continuous Deployment): Every change that passes the pipeline is automatically deployed to production. Pipeline stages: 1) Source: Code commit triggers pipeline (GitHub webhook). 2) Build: Compile code, build Docker image. 3) Test: Unit tests, integration tests, E2E tests. 4) Security Scan: SAST/DAST, dependency vulnerability checks. 5) Deploy to Staging: Deploy to staging environment, smoke tests. 6) Approval Gate (Delivery) or Auto-Deploy (Deployment). 7) Deploy to Production: Canary/blue-green deployment. 8) Monitor: Watch metrics, auto-rollback on anomalies. Tools: Jenkins, GitHub Actions, GitLab CI, CircleCI.",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "All Companies"],
    category: "Web Development",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 84,
    title: "What is Kubernetes? Why is it used?",
    answer: "Kubernetes (K8s) is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications. Key concepts: Pod (smallest unit — one or more containers), Deployment (defines desired state, manages replicas), Service (stable networking endpoint for pods), Ingress (HTTP routing), ConfigMap/Secrets (configuration). Why use it: 1) Auto-scaling: Scale pods based on CPU/memory/custom metrics. 2) Self-healing: Restart failed containers, replace unresponsive pods. 3) Rolling updates: Zero-downtime deployments with rollback capability. 4) Service discovery: DNS-based service discovery within cluster. 5) Load balancing: Distribute traffic across pods. Architecture: Master (API Server, Scheduler, Controller Manager, etcd) + Worker Nodes (kubelet, kube-proxy, container runtime). Managed services: EKS (AWS), GKE (Google), AKS (Azure).",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Startups"],
    category: "Web Development",
    difficulty: "Hard",
    round: "Technical"
  },

  // ──────────────────────────── JAVA & LANGUAGE SPECIFIC ────────────────────────────
  {
    id: 85,
    title: "What is the difference between == and .equals() in Java?",
    answer: "== operator: Compares references (memory addresses) for objects, values for primitives. Two different String objects with same content → == returns false (different references). .equals() method: Compares content/value. String class overrides equals() to compare character sequences. Default Object.equals() uses == (reference comparison) — you must override it for meaningful comparison. Important: When you override equals(), always override hashCode() too (contract: equal objects must have equal hash codes). Integer caching: Java caches integers from -128 to 127, so Integer a = 127; Integer b = 127; a == b is TRUE, but Integer a = 128; Integer b = 128; a == b is FALSE. Always use .equals() for object comparison.",
    companies: ["TCS", "Infosys", "Wipro", "Amazon", "Microsoft"],
    category: "OOP",
    difficulty: "Easy",
    round: "Technical"
  },
  {
    id: 86,
    title: "Explain the Java Collections Framework hierarchy.",
    answer: "Top interfaces: Iterable → Collection (→ List, Set, Queue) and Map (separate hierarchy). List (ordered, allows duplicates): ArrayList (dynamic array, O(1) access, O(n) insert), LinkedList (doubly-linked, O(1) insert at ends, O(n) access), Vector (synchronized ArrayList). Set (no duplicates): HashSet (HashMap-backed, O(1) operations, unordered), LinkedHashSet (insertion order), TreeSet (sorted, Red-Black tree, O(log n)). Queue: PriorityQueue (heap-based), ArrayDeque (resizable array deque), LinkedList. Map (key-value pairs): HashMap (O(1) access, unordered), LinkedHashMap (insertion order), TreeMap (sorted by key, O(log n)), ConcurrentHashMap (thread-safe without full locking), Hashtable (legacy synchronized). Choose based on: ordering needs, thread safety, performance characteristics.",
    companies: ["Amazon", "Microsoft", "TCS", "Infosys", "Google"],
    category: "OOP",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 87,
    title: "What is the difference between String, StringBuilder, and StringBuffer in Java?",
    answer: "String: Immutable — once created, cannot be changed. Every modification creates a new String object. Stored in String Pool for memory efficiency. Thread-safe (immutable). Use when: String won't change frequently. StringBuilder: Mutable — modifications happen in-place without creating new objects. NOT thread-safe. Faster than StringBuffer. Use when: Many string modifications in a single-threaded context (e.g., building a string in a loop). StringBuffer: Mutable and thread-safe (all methods synchronized). Slower than StringBuilder due to synchronization overhead. Use when: String modifications needed in a multi-threaded context. Performance example: Concatenating 10,000 strings — String: creates 10,000 objects (very slow); StringBuilder/StringBuffer: modifies one object (fast). In modern Java, compiler optimizes simple concatenation to StringBuilder, but explicit use is better in loops.",
    companies: ["TCS", "Infosys", "Wipro", "Cognizant", "Amazon"],
    category: "OOP",
    difficulty: "Easy",
    round: "Technical"
  },
  {
    id: 88,
    title: "What are Java Streams? How do they differ from Collections?",
    answer: "Java Streams (Java 8+) provide a declarative way to process collections using functional-style operations. Key differences from Collections: 1) Streams don't store data — they're a pipeline of operations on a source. 2) Streams are lazy — intermediate operations (filter, map, sorted) execute only when a terminal operation (collect, forEach, reduce) is called. 3) Streams can be parallel (parallelStream()) for multi-core processing. Operations: Intermediate: filter (predicate), map (transform), flatMap, sorted, distinct, limit, skip. Terminal: collect (to List, Map, etc.), forEach, reduce, count, min/max, anyMatch/allMatch. Example: list.stream().filter(x -> x > 5).map(x -> x * 2).collect(Collectors.toList()). Streams can't be reused — once consumed, create a new one.",
    companies: ["Amazon", "Google", "Microsoft", "Flipkart"],
    category: "OOP",
    difficulty: "Medium",
    round: "Technical"
  },

  // ──────────────────────────── MORE NETWORKING & SECURITY ────────────────────────────
  {
    id: 89,
    title: "What is OAuth 2.0? How does it work?",
    answer: "OAuth 2.0 is an authorization framework that allows third-party apps to access user resources without sharing credentials. Roles: Resource Owner (user), Client (app), Authorization Server (issues tokens), Resource Server (API). Authorization Code flow (most secure): 1) Client redirects user to Authorization Server with client_id, redirect_uri, scope. 2) User authenticates and grants permission. 3) Authorization Server redirects back with authorization code. 4) Client exchanges code + client_secret for access token (server-to-server). 5) Client uses access token to access protected resources. Token types: Access Token (short-lived, grants API access), Refresh Token (long-lived, obtains new access tokens). PKCE extension: Adds code_verifier/code_challenge for public clients (mobile/SPA) that can't store client_secret securely.",
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Auth0"],
    category: "Networking",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 90,
    title: "What is SQL injection? How to prevent it?",
    answer: "SQL injection occurs when user input is concatenated directly into SQL queries, allowing attackers to manipulate the query. Example: Input: ' OR '1'='1' -- in a login form turns SELECT * FROM users WHERE user='' OR '1'='1'--' into a query that returns all users. Impact: Data theft, data modification, authentication bypass, OS command execution. Prevention: 1) Parameterized queries (prepared statements): Separate SQL logic from data. Most effective. 2) ORM usage: ORMs like Hibernate generate parameterized queries. 3) Input validation: Whitelist allowed characters, reject unexpected input. 4) Stored procedures: Pre-compiled SQL, but still vulnerable if concatenating inside. 5) Least privilege: Database user should have minimal permissions. 6) WAF (Web Application Firewall): Additional layer filtering malicious patterns.",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "All Companies"],
    category: "Web Development",
    difficulty: "Medium",
    round: "Technical"
  },

  // ──────────────────────────── PUZZLES & PROBLEM SOLVING ────────────────────────────
  {
    id: 91,
    title: "How would you move Mount Fuji? (Open-ended thinking question)",
    answer: "This is a classic Google/Microsoft interview puzzle testing structured thinking, not a literal answer. Approach: 1) Clarify the problem: 'What does move mean? Physically relocate? Create an identical one? Change its perceived location?' 2) Break it down: Estimate Mount Fuji's volume (cone shape: ⅓πr²h ≈ 1.4 billion cubic meters). 3) Consider methods: Remove material via trucks (estimate truck capacity, number of trips, time), tunnel boring machines, erosion over geological time. 4) State assumptions explicitly: Working 24/7, X trucks of Y capacity. 5) Calculate: If each truck carries 10m³ and makes 10 trips/day with 1000 trucks → 100,000 m³/day → ~38 years. The interviewer cares about: structured approach, estimation skills, stating assumptions, creative thinking, NOT the exact answer.",
    companies: ["Google", "Microsoft", "Apple", "Meta"],
    category: "Behavioral",
    difficulty: "Hard",
    round: "HR/Behavioral"
  },
  {
    id: 92,
    title: "You have 8 balls. One is heavier. Find it using a balance scale in minimum weighings.",
    answer: "Answer: 2 weighings. Method: Divide 8 balls into groups of 3, 3, and 2. Weighing 1: Compare the two groups of 3. Case A: One side is heavier → heavy ball is in that group of 3. Weighing 2: From the heavier group, compare any 2 balls. If one is heavier, that's it. If balanced, the third ball is heavier. Case B: Both groups of 3 are balanced → heavy ball is in the remaining group of 2. Weighing 2: Compare the 2 remaining balls. The heavier one is the answer. This works because each weighing has 3 outcomes (left heavy, balanced, right heavy), so 2 weighings can distinguish among 3² = 9 possibilities, which is enough for 8 balls. Generalization: ⌈log₃(n)⌉ weighings for n balls.",
    companies: ["Google", "Amazon", "Microsoft", "Goldman Sachs"],
    category: "Behavioral",
    difficulty: "Medium",
    round: "HR/Behavioral"
  },

  // ──────────────────────────── FILL TO 100 ────────────────────────────
  {
    id: 93,
    title: "What is the difference between HTTP/1.1, HTTP/2, and HTTP/3?",
    answer: "HTTP/1.1: Text-based protocol. One request per TCP connection (keep-alive allows reuse but still sequential). Head-of-line blocking: one slow response blocks subsequent requests on that connection. Browsers open 6-8 connections per domain to parallelize. HTTP/2: Binary protocol. Multiplexing: multiple requests/responses over a single TCP connection simultaneously. Header compression (HPACK). Server push (server can proactively send resources). Stream prioritization. Still suffers from TCP head-of-line blocking during packet loss. HTTP/3: Uses QUIC protocol (built on UDP instead of TCP). Eliminates TCP head-of-line blocking — lost packets don't block other streams. Built-in TLS 1.3 (faster handshake). Connection migration (changing network doesn't break connection). 0-RTT connection resumption. Performance improvement especially on lossy networks (mobile).",
    companies: ["Google", "Amazon", "Cloudflare", "Meta"],
    category: "Networking",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 94,
    title: "What is a message queue (Kafka, RabbitMQ)? When would you use one?",
    answer: "A message queue is middleware that enables asynchronous communication between services. Producers send messages; consumers process them independently. Benefits: 1) Decoupling: Services don't need to know about each other. 2) Buffering: Handle traffic spikes by queuing requests. 3) Reliability: Messages persist until processed; retry on failure. 4) Scalability: Multiple consumers process in parallel. RabbitMQ: Traditional message broker. Push-based, low latency, complex routing (exchanges, bindings). Good for: task queues, RPC, moderate throughput. Kafka: Distributed log. Pull-based, high throughput, message retention. Good for: event streaming, log aggregation, real-time analytics, event sourcing. Use when: Services need async communication, operations can be eventual (order confirmation email), you need to handle varying processing speeds, or you need event replay.",
    companies: ["Amazon", "Google", "Uber", "LinkedIn", "Netflix"],
    category: "System Design",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 95,
    title: "What is consistent hashing and why is it important?",
    answer: "Consistent hashing is a distributed hashing scheme that minimizes key redistribution when nodes are added/removed. In regular modular hashing (key % N), adding/removing a node remaps nearly all keys. In consistent hashing: nodes and keys are mapped onto a circular hash ring. Each key is assigned to the next node clockwise. Adding a node only remaps keys between the new node and its predecessor. On average, only K/N keys need remapping (K = total keys, N = total nodes). Virtual nodes: Each physical node creates multiple positions on the ring, ensuring even distribution despite few physical nodes. Used in: DynamoDB, Cassandra, CDNs, load balancers, distributed caches (Memcached). This is fundamental to how most distributed systems handle data partitioning.",
    companies: ["Amazon", "Google", "Meta", "Netflix", "Uber"],
    category: "System Design",
    difficulty: "Hard",
    round: "Technical"
  },
  {
    id: 96,
    title: "Explain the concept of eventual consistency vs strong consistency.",
    answer: "Strong Consistency: After a write, every subsequent read returns the updated value. All nodes agree on data at any point. Trade-off: Higher latency (must wait for all replicas to confirm), lower availability during partitions. Example: Bank account balance. Eventual Consistency: After a write, replicas may temporarily disagree, but given enough time (and no new writes), all replicas converge to the same value. Trade-off: Lower latency, higher availability, but stale reads possible. Example: Social media like count, DNS propagation. Intermediate models: Read-your-writes (you always see your own updates), Session consistency (within a session), Causal consistency (causally related writes are ordered). Systems: DynamoDB (tunable), Cassandra (tunable per query), PostgreSQL replication (eventual), Google Spanner (strong via TrueTime).",
    companies: ["Amazon", "Google", "Meta", "Netflix"],
    category: "DBMS",
    difficulty: "Hard",
    round: "Technical"
  },
  {
    id: 97,
    title: "Implement a function to check if a binary tree is a valid BST.",
    answer: "Approach: Use recursion with min/max bounds. A node's value must be within a valid range. Initially range is (-∞, +∞). For left child, upper bound becomes parent's value. For right child, lower bound becomes parent's value. Function: isValidBST(node, min, max): if node is null, return true. if node.val <= min or node.val >= max, return false. Return isValidBST(node.left, min, node.val) AND isValidBST(node.right, node.val, max). Call: isValidBST(root, -Infinity, Infinity). Time: O(n), Space: O(h) for recursion stack. Alternative: In-order traversal should produce a strictly increasing sequence — validate this with a prev variable. Common mistake: Only checking immediate parent-child relationship without considering all ancestors.",
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Apple"],
    category: "Data Structures",
    difficulty: "Medium",
    round: "Technical"
  },
  {
    id: 98,
    title: "What is the difference between PUT, PATCH, and POST in REST?",
    answer: "POST: Creates a new resource. Not idempotent — repeated calls create multiple resources. Server determines the URI. Example: POST /users → creates a new user and returns /users/123. PUT: Updates/replaces entire resource at a specific URI. Idempotent — repeated calls produce same result. Client specifies the URI. If resource doesn't exist, may create it. Example: PUT /users/123 → replaces entire user 123. PATCH: Partially updates a resource. Only sends fields that need updating. May or may not be idempotent (depends on implementation). Example: PATCH /users/123 {\"email\": \"new@email.com\"} → updates only email. Key differences: POST creates, PUT fully replaces, PATCH partially modifies. PUT is idempotent, POST is not. Use PUT when you have the complete resource; PATCH when updating 1-2 fields. DELETE is also idempotent — deleting twice has the same effect.",
    companies: ["Amazon", "Google", "Microsoft", "Startups", "TCS"],
    category: "Web Development",
    difficulty: "Easy",
    round: "Technical"
  },
  {
    id: 99,
    title: "What is a bloom filter? Where is it used?",
    answer: "A Bloom filter is a space-efficient probabilistic data structure that tests whether an element is a member of a set. It can have false positives (says 'maybe in set' when it's not) but NEVER false negatives (if it says 'definitely not in set', it's correct). How it works: A bit array of m bits, initialized to 0. Uses k hash functions. Insert: Hash element with all k functions, set those bit positions to 1. Query: Hash element with all k functions; if ALL positions are 1, element is 'probably in set'; if ANY is 0, element is 'definitely not in set'. Space: Much less than storing actual elements. No deletion (Counting Bloom Filter supports it). Used in: Database query optimization (HBase, Cassandra — avoid unnecessary disk reads), spell checkers, web crawlers (avoid re-crawling), CDN caching, malware detection.",
    companies: ["Google", "Amazon", "Meta", "Netflix", "Uber"],
    category: "Data Structures",
    difficulty: "Hard",
    round: "Technical"
  },
  {
    id: 100,
    title: "How would you design a system to handle millions of concurrent users?",
    answer: "A holistic approach combining multiple strategies: 1) Stateless Application Servers: No server-side sessions; use JWT or external session store (Redis). Enables horizontal scaling behind load balancers. 2) Database Scaling: Read replicas for read-heavy workloads, sharding for write scaling, caching layer (Redis/Memcached) for frequently accessed data. 3) CDN: Serve static assets from edge locations. 4) Message Queues: Decouple services, buffer writes during spikes (Kafka/SQS). 5) Auto-scaling: Cloud auto-scaling groups based on CPU/request metrics. 6) Connection Management: Connection pooling, HTTP/2 multiplexing. 7) Rate Limiting: Prevent abuse, protect backend. 8) Monitoring & Alerting: Prometheus/Grafana for metrics, distributed tracing (Jaeger), centralized logging (ELK). 9) Graceful Degradation: Feature flags to disable non-critical features under load. 10) Global Architecture: Multi-region deployment, DNS-based routing to nearest region. Key principle: Identify bottlenecks through load testing before optimizing.",
    companies: ["Google", "Amazon", "Meta", "Netflix", "Microsoft", "Apple"],
    category: "System Design",
    difficulty: "Hard",
    round: "System Design"
  }
];

export default interviewQuestionsData;
