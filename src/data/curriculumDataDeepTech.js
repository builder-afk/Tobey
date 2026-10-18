export const curriculumDataDeepTech = {
  // ==========================================
  // 1. GAME DEVELOPMENT (UNREAL ENGINE 5 & C++)
  // ==========================================
  "game-engine-architecture-unreal-5": {
    title: "Game Engine Architecture & Unreal 5",
    tagline: "C++20, Nanite, Lumen & Distributed Netcode",
    duration: "4 Months",
    overview: "Build AAA-grade game systems from the ground up using Unreal Engine 5 and custom C++ engine architectures. Master low-latency multiplayer network replication, client-side prediction, server reconciliation, Nanite micro-polygon geometry pipelines, Lumen dynamic global illumination, custom HLSL shader development, and lock-free multi-threaded game loops.",
    objectives: [
      { num: "01", color: "purple", icon: "Gamepad2", title: "Unreal Engine 5 C++ Core", desc: "Master UObject lifecycle, custom Gameplay Ability Systems (GAS), sub-system architectures, and cache-coherent memory layouts." },
      { num: "02", color: "blue", icon: "Network", title: "Multiplayer Netcode & Prediction", desc: "Engineer deterministic client-side prediction, server reconciliation, lag compensation, and Unreal Replication Graph optimizations." },
      { num: "03", color: "amber", icon: "Layers", title: "Nanite, Lumen & Custom Shaders", desc: "Deep dive into GPU-driven rendering pipelines, custom deferred passes, Virtual Shadow Maps, and HLSL compute shaders." },
      { num: "04", color: "emerald", icon: "Cpu", title: "Chaos Physics & Mass Entity (ECS)", desc: "Build high-density crowd simulation and destruction physics utilizing Chaos substepping and data-oriented Mass Entity ECS." }
    ],
    outcomes: [
      { label: "CLO 01", color: "purple", icon: "Award", title: "Lead Engine Programmer", desc: "Architect high-performance AAA gameplay systems and authoritative dedicated multiplayer servers capable of 60Hz tick rates." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Engine Fundamentals & Multiplayer Netcode", subtitle: "MONTHS 1-2", color: "purple",
        modules: [
          { code: "M1", title: "Custom Engine Architecture & C++20", weeks: "Weeks 1-4", icon: "Gamepad2", color: "purple", tags: ["UObject Memory", "Custom ECS", "GAS Architecture", "SIMD Math"], desc: "Architecting modular game frameworks, custom memory allocators, and production Gameplay Ability Systems." },
          { code: "M2", title: "Multiplayer Netcode & Replication", weeks: "Weeks 5-8", icon: "Network", color: "blue", tags: ["Client Prediction", "Server Reconciliation", "Lag Compensation", "Replication Graph"], desc: "Building competitive tick-rate network synchronization with rewind rollback, hit registration, and bandwidth culling." }
        ],
        milestoneTitle: "Authoritative Competitive FPS Framework", milestoneDesc: "Dedicated Server Multiplayer Core", milestoneFeatures: ["Sub-Millisecond Rollback Prediction", "Dedicated Linux Headless Server", "Custom Ability Network Replication"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Advanced Rendering & Chaos Physics", subtitle: "MONTHS 3-4", color: "emerald",
        modules: [
          { code: "M3", title: "Nanite, Lumen & HLSL Shaders", weeks: "Weeks 9-12", icon: "Layers", color: "amber", tags: ["Nanite Clusters", "Lumen Ray Tracing", "HLSL Compute", "Virtual Shadow Maps"], desc: "Writing GPU compute passes, volumetric raymarching shaders, and micro-polygon geometry profiling with Unreal Insights." },
          { code: "M4", title: "Chaos Physics & Mass Entity Systems", weeks: "Weeks 13-16", icon: "Cpu", color: "emerald", tags: ["Chaos Substepping", "Mass Entity ECS", "Spatial Partitioning", "Niagara VFX"], desc: "Simulating tens of thousands of swarming dynamic agents with spatial hashing, structural destruction, and deterministic collision." }
        ],
        milestoneTitle: "Photorealistic Open-World Tech Demo", milestoneDesc: "Production-Grade Tech Showcase", milestoneFeatures: ["Nanite Streaming Assets", "Custom Volumetric Raymarched Clouds", "10,000+ AI Entities on Mass Entity"]
      }
    ],
    techStack: {
      client: { title: "Unreal Engine 5.4 & C++20", icon: "Gamepad2", desc: "Engine & Core", tags: ["UE5.4", "C++20", "HLSL", "Unreal Insights"] },
      server: { title: "Dedicated Linux Server", icon: "Terminal", desc: "Netcode Server", tags: ["Headless UE", "gRPC", "WebRTC Voice", "ZeroMQ"] },
      database: { title: "Redis & PostgreSQL", icon: "Database", desc: "Matchmaking & State", type: "Low-Latency Key-Value", platform: "Agones / Kubernetes" },
      devops: ["Perforce (P4)", "Unreal Build Tool (UBT)", "Docker", "RenderDoc"]
    },
    projects: [
      { icon: "Gamepad2", title: "High-Tickrate Competitive Tactical FPS Framework", tag: "MULTIPLAYER AAA", desc: "An authoritative server multiplayer FPS engine featuring sub-millisecond client prediction, server reconciliation rollback, lag-compensated hitscan validation, and spatial replication culling.", features: ["Server Reconciliation", "Replication Graph Optimization", "Deterministic Rewind"], borderColor: "border-purple-500/30" },
      { icon: "Layers", title: "Procedural Volumetric Weather & Cloud Engine", tag: "GRAPHICS PIPELINE", desc: "Custom HLSL compute shader pipeline integrated into Unreal's render pass graph executing real-time Rayleigh and Mie atmospheric scattering with 3D Perlin-Worley volumetric cloud synthesis.", features: ["Compute Shader Passes", "Volumetric Shadow Maps", "Real-Time Temporal Denoising"], borderColor: "border-amber-500/30" }
    ],
    careerOutcomes: "Principal Game Engine Programmer, AAA Technical Director, Senior Gameplay Network Engineer ($180k-$380k)"
  },

  // ==========================================
  // 2. ROBLOX & METAVERSE ENGINEERING
  // ==========================================
  "roblox-luau-metaverse-systems": {
    title: "Roblox Luau & Metaverse Systems",
    tagline: "Typed Luau, Distributed Physics & Live-Ops Economics",
    duration: "3 Months",
    overview: "Scale immersive multiplayer experiences to millions of concurrent players on the Roblox platform. Master strict typed Luau, client-server network optimization, custom Character Controllers, DataStore v2 transactional consistency, spatial audio rendering, procedural terrain generation, and virtual economy monetization loops.",
    objectives: [
      { num: "01", color: "red", icon: "Boxes", title: "Typed Luau & Modular Architecture", desc: "Write type-safe, modular Luau utilizing Rojo, Wally package management, and Promise-based event streams." },
      { num: "02", color: "blue", icon: "Network", title: "Client-Server Replication Tuning", desc: "Optimize bandwidth consumption using remote event batching, delta compression, and client-side interpolation." },
      { num: "03", color: "emerald", icon: "Database", title: "Resilient Persistence & DataStore v2", desc: "Architect atomic transactions, session locking, and anti-duplication safeguards for player inventory." },
      { num: "04", color: "amber", icon: "Sparkles", title: "Metaverse Live-Ops & Economy Design", desc: "Engineer virtual currency sinks, seasonal pass loops, and live analytics telemetry pipelines." }
    ],
    outcomes: [
      { label: "CLO 01", color: "red", icon: "Award", title: "Metaverse Systems Architect", desc: "Architect and publish top-tier Roblox experiences sustaining 50,000+ CCU with high retention and monetization." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Type-Safe Luau & Core Gameplay Physics", subtitle: "MONTHS 1-2", color: "red",
        modules: [
          { code: "M1", title: "Strict Luau & Rojo Professional Toolchain", weeks: "Weeks 1-4", icon: "Code2", color: "red", tags: ["Typed Luau", "Rojo", "Wally", "Knit Framework"], desc: "Setting up professional IDE workflows, strict static type checking, Git version control, and modular service singletons." },
          { code: "M2", title: "Custom Physics & Character Controllers", weeks: "Weeks 5-8", icon: "Gamepad2", color: "blue", tags: ["Raycast Hitboxes", "Constraint Physics", "Client Prediction", "Camera Smoothing"], desc: "Engineering responsive parkour character controllers, spring physics, and low-latency client-side prediction." }
        ],
        milestoneTitle: "Modular Combat & Movement Engine", milestoneDesc: "Professional-Grade Luau Framework", milestoneFeatures: ["Strict Type-Checking", "Sub-15ms Responsive Movement", "Rojo Git Sync Pipeline"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Distributed Networking & Scaled Live-Ops", subtitle: "MONTHS 2-3", color: "amber",
        modules: [
          { code: "M3", title: "DataStore v2 & Transactional Inventory", weeks: "Weeks 9-10", icon: "Database", color: "emerald", tags: ["Session Locking", "ProfileStore", "Atomic Swaps", "Anti-Duping"], desc: "Preventing item duplication exploits with atomic session locking, migration schemas, and external backup webhooks." },
          { code: "M4", title: "Procedural Streaming & Economy Loops", weeks: "Weeks 11-12", icon: "Sparkles", color: "amber", tags: ["Content Streaming", "Live-Ops Telemetry", "Monetization Oracles", "Spatial Audio"], desc: "Streaming large-scale procedural worlds, integrating dynamic trading economies, and tracking real-time retention telemetry." }
        ],
        milestoneTitle: "Production-Ready Multiplayer RPG Experience", milestoneDesc: "High-CCU Scalable Architecture", milestoneFeatures: ["Session-Locked Economy", "Cross-Server Matchmaking", "Mobile 60-FPS Optimization"]
      }
    ],
    techStack: {
      client: { title: "Typed Luau & Roblox Client", icon: "Boxes", desc: "Client Runtime", tags: ["Luau", "Fusion UI", "Spring Physics", "SoundService"] },
      server: { title: "Roblox Distributed Server", icon: "Terminal", desc: "Game Server", tags: ["RemoteEvents", "Knit", "Open Cloud API", "FastNet2"] },
      database: { title: "DataStore v2 & External Supabase", icon: "Database", desc: "State Storage", type: "Document & Relational", platform: "Roblox Cloud / Supabase" },
      devops: ["Rojo", "Wally", "GitHub Actions", "Selene Linter"]
    },
    projects: [
      { icon: "Boxes", title: "Infinite Procedural Dungeon Crawler with Network Culling", tag: "ROBLOX ENGINE", desc: "A procedurally generated multiplayer dungeon crawling game featuring dynamic voxel terrain streaming, server-authoritative combat, and aggressive packet compression maintaining 60 FPS on low-end mobile devices.", features: ["Procedural Room Generation", "Delta-Compressed Netcode", "Custom Raycast Weaponry"], borderColor: "border-red-500/30" },
      { icon: "Sparkles", title: "Cross-Server Player Marketplace & Auction House", tag: "LIVE-OPS ECONOMY", desc: "A transactional trading economy infrastructure utilizing DataStore session locks and external HTTP messaging services to facilitate fraud-proof item exchanges between different live game servers.", features: ["Atomic Session Locking", "Anti-Duping Rollback", "Live Price Elasticity Model"], borderColor: "border-amber-500/30" }
    ],
    careerOutcomes: "Lead Roblox Studio Developer, Metaverse Technical Director, Senior Luau Engineer ($140k-$320k)"
  },

  // ==========================================
  // 3. DEFENCE TECH & AUTONOMOUS DRONE SWARMS
  // ==========================================
  "defence-tech-autonomous-drone-swarms": {
    title: "Defence Tech & Autonomous Drone Swarms",
    tagline: "C4ISR Architecture, Edge AI & GPS-Denied Navigation",
    duration: "4 Months",
    overview: "Step to the frontier of national security engineering. Design decentralized autonomous unmanned aerial swarms, C4ISR tactical networks, visual-inertial odometry (VIO) for GPS-denied combat environments, low-probability-of-intercept (LPI) communications, and hardware-accelerated target recognition at the tactical edge.",
    objectives: [
      { num: "01", color: "stone", icon: "Radio", title: "Decentralized Swarm Consensus", desc: "Implement mesh-networked consensus algorithms for resilient distributed target assignment without central C2." },
      { num: "02", color: "blue", icon: "Compass", title: "GPS-Denied State Estimation (VIO)", desc: "Fuse high-rate IMU telemetry with stereo-camera visual odometry and LiDAR SLAM for drift-free flight in jammed zones." },
      { num: "03", color: "red", icon: "Crosshair", title: "Tactical Edge Computer Vision", desc: "Quantize YOLO and transformer target detection models for sub-10ms inference on low-SWaP NVIDIA Jetson Orin compute." },
      { num: "04", color: "emerald", icon: "ShieldAlert", title: "C4ISR & Electronic Warfare Hardening", desc: "Build NATO-standard STANAG 4586 compliant C2 interfaces and anti-jamming frequency hopping communication links." }
    ],
    outcomes: [
      { label: "CLO 01", color: "stone", icon: "Award", title: "Defence Systems Lead Engineer", desc: "Build mission-critical autonomous defense platforms and secure tactical command architectures for contested environments." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Autonomous Flight & GPS-Denied SLAM", subtitle: "MONTHS 1-2", color: "blue",
        modules: [
          { code: "M1", title: "PX4 Autopilot & MAVLink Protocols", weeks: "Weeks 1-4", icon: "Compass", color: "blue", tags: ["PX4 Firmware", "MAVLink 2.0", "uORB Messaging", "EKF2 State Estimation"], desc: "Developing flight dynamics models, tuning cascaded PID controllers, and integrating fail-safe geofencing protocols." },
          { code: "M2", title: "Visual-Inertial Odometry & LiDAR SLAM", weeks: "Weeks 5-8", icon: "Radar", color: "emerald", tags: ["VINS-Mono", "FAST-LIO", "Point Cloud Registration", "Drift Correction"], desc: "Implementing real-time graph SLAM and keyframe visual odometry for sub-meter navigation in GPS-jammed contested environments." }
        ],
        milestoneTitle: "GPS-Denied Autonomous Flight Pipeline", milestoneDesc: "Hardened Navigation Suite", milestoneFeatures: ["Optical Flow & IMU EKF2 Fusion", "Subterranean Tunnel Traversal", "Zero External GPS Reliance"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Swarm Intelligence & Tactical Edge AI", subtitle: "MONTHS 3-4", color: "red",
        modules: [
          { code: "M3", title: "Swarm Boids & Decentralized Task Allocation", weeks: "Weeks 9-12", icon: "Radio", color: "stone", tags: ["Boids Algorithm", "CBBA Auctioning", "Mesh Networking", "Ad-Hoc Relays"], desc: "Engineering consensus auction algorithms for decentralized target allocation, collision avoidance, and resilient perimeter patrols." },
          { code: "M4", title: "TensorRT Edge Inference & STANAG C2", weeks: "Weeks 13-16", icon: "Crosshair", color: "red", tags: ["NVIDIA Jetson Orin", "TensorRT INT8", "STANAG 4586", "COTS Hardening"], desc: "Deploying quantized object detection models for tactical vehicle classification with low thermal dissipation and MIL-STD validation." }
        ],
        milestoneTitle: "Heterogeneous Autonomous Swarm Interceptor", milestoneDesc: "Decentralized Swarm C2 Simulation", milestoneFeatures: ["Dynamic Leader Re-election", "INT8 Target Classification", "STANAG 4586 Interoperability"]
      }
    ],
    techStack: {
      client: { title: "Qt/QML & React Tactical GIS", icon: "Monitor", desc: "Ground Control Station", tags: ["QGroundControl", "Cesium 3D GIS", "WebRTC"] },
      server: { title: "C++20 & ROS2 Iron", icon: "Terminal", desc: "Autopilot & Autonomy", tags: ["PX4 Autopilot", "ROS2 Iron", "VINS-Fusion", "FastDDS"] },
      database: { title: "ScyllaDB & GeoTIFF Raster DB", icon: "Database", desc: "Tactical Telemetry", type: "Low-Latency Time-Series", platform: "Edge NVMe / Micro-Server" },
      devops: ["PX4 SITL", "Gazebo Harmonic", "Docker", "ZeroMQ"]
    },
    projects: [
      { icon: "Compass", title: "GPS-Denied Micro-UAV Tunnel Reconnaissance System", tag: "DEFENCE AVIONICS", desc: "A full autonomous flight stack executing real-time 3D occupancy grid mapping and thermal human signature detection inside unmapped underground tunnels without satellite signals.", features: ["Visual-Inertial Odometry", "Autonomous Obstacle Avoidance", "Thermal Target Tagging"], borderColor: "border-blue-500/30" },
      { icon: "Radio", title: "Decentralized 16-Drone Swarm Perimeter Defense Grid", tag: "SWARM ROBOTICS", desc: "Mesh-networked autonomous aerial swarm utilizing Consensus-Based Bundle Algorithms (CBBA) for optimal area coverage, dynamic threat handoff, and automatic gap filling upon node loss.", features: ["Mesh Ad-Hoc Consensus", "Dynamic Threat Interception", "Zero Single-Point-of-Failure"], borderColor: "border-red-500/30" }
    ],
    careerOutcomes: "Defence Systems Engineer, Autonomous Guidance & Navigation Lead, Tactical AI Architect ($190k-$420k)"
  },

  // ==========================================
  // 4. HUMANOID ROBOTICS & SIM-TO-REAL RL
  // ==========================================
  "humanoid-robotics-sim-to-real-rl": {
    title: "Humanoid Robotics & Sim-to-Real RL",
    tagline: "ROS2 Humble, NVIDIA Isaac Sim & Whole-Body Dynamics",
    duration: "4 Months",
    overview: "Engineer the physical intelligence powering the next generation of bipedal humanoid robots. Master Model Predictive Control (MPC), Whole-Body Control (WBC) for high-DOF bipedal stability, deep reinforcement learning for robust locomotion in NVIDIA Isaac Sim, domain randomization techniques for zero-shot sim-to-real transfer, and low-latency motor control over EtherCAT buses.",
    objectives: [
      { num: "01", color: "lime", icon: "Bot", title: "Bipedal Locomotion Dynamics", desc: "Formulate zero-moment point (ZMP), linear inverted pendulum (LIPM), and convex MPC for dynamic balance." },
      { num: "02", color: "emerald", icon: "Cpu", title: "Isaac Sim & GPU Physics", desc: "Simulate 4,096 parallel humanoid instances on GPU tensors to train robust locomotion policies in hours." },
      { num: "03", color: "cyan", icon: "Layers", title: "Sim-to-Real Domain Randomization", desc: "Apply mass, friction, actuator latency, and sensor noise randomization for zero-shot real-world deployment." },
      { num: "04", color: "purple", icon: "Zap", title: "Real-Time Embedded EtherCAT Control", desc: "Build PREEMPT_RT Linux motor control loops operating at 1,000Hz with microsecond determinism." }
    ],
    outcomes: [
      { label: "CLO 01", color: "lime", icon: "Award", title: "Humanoid Robotics Architect", desc: "Design whole-body humanoid controllers and train locomotion policies that deploy directly to physical hardware." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Kinematics, Dynamics & Whole-Body MPC", subtitle: "MONTHS 1-2", color: "emerald",
        modules: [
          { code: "M1", title: "Spatial Modern Robotics & Kinematics", weeks: "Weeks 1-4", icon: "Bot", color: "emerald", tags: ["Lie Groups SE(3)", "Pinocchio Library", "Inverse Dynamics", "Quadratic Programming"], desc: "Formulating kinematic trees, forward/inverse differential kinematics, and spatial momentum matrices for humanoid bodies." },
          { code: "M2", title: "Convex Model Predictive Control", weeks: "Weeks 5-8", icon: "Workflow", color: "lime", tags: ["LIPM Dynamics", "Gait Generators", "QP Solvers (OSQP)", "Footstep Planning"], desc: "Building real-time convex MPC gait generators that recalculate optimal ground reaction forces every 20 milliseconds." }
        ],
        milestoneTitle: "Bipedal Balance & Push Recovery Controller", milestoneDesc: "High-Frequency Locomotion Controller", milestoneFeatures: ["12-DOF Dynamic Balancing", "100N Push Recovery Impulse", "Convex QP Ground Force Optimization"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Massive Parallel RL & Hardware Deployment", subtitle: "MONTHS 3-4", color: "cyan",
        modules: [
          { code: "M3", title: "GPU-Accelerated RL in Isaac Gym / Sim", weeks: "Weeks 9-12", icon: "Cpu", color: "cyan", tags: ["Isaac Sim", "PPO Algorithm", "Actor-Critic", "Parallel Environments"], desc: "Training deep reinforcement learning walking policies across thousands of parallel humanoid instances using vectorized PyTorch tensors." },
          { code: "M4", title: "Domain Randomization & PREEMPT_RT EtherCAT", weeks: "Weeks 13-16", icon: "Zap", color: "purple", tags: ["Domain Randomization", "EtherCAT SOEM", "PREEMPT_RT", "C++ ONNX Runtime"], desc: "Deploying neural networks directly into C++ real-time loops communicating with joint brushless motor actuators over high-speed fieldbuses." }
        ],
        milestoneTitle: "Zero-Shot Sim-to-Real Rough Terrain Locomotion", milestoneDesc: "Full Physical AI Pipeline", milestoneFeatures: ["Traversing Stairs & Slippery Slopes", "1,000Hz Real-Time EtherCAT Loop", "ONNX Policy Inference Under 1ms"]
      }
    ],
    techStack: {
      client: { title: "Foxglove Studio & RViz2", icon: "Monitor", desc: "Visualization & Telemetry", tags: ["Foxglove Studio", "RViz2", "WebRTC Video"] },
      server: { title: "C++20, Python & ROS2 Humble", icon: "Terminal", desc: "Control & Reinforcement Learning", tags: ["ROS2 Humble", "Pinocchio", "PyTorch", "ONNX Runtime"] },
      database: { title: "MCAP Telemetry & TimescaleDB", icon: "Database", desc: "Actuator Telemetry", type: "High-Speed Time-Series", platform: "Embedded NVMe" },
      devops: ["NVIDIA Isaac Sim", "MuJoCo", "Docker", "PREEMPT_RT Linux"]
    },
    projects: [
      { icon: "Bot", title: "Whole-Body MPC & Bipedal Walking Controller", tag: "DYNAMIC CONTROL", desc: "A real-time quadratic programming locomotion solver and Whole-Body Controller (WBC) stabilizing a 28-DOF full-scale humanoid across uneven stepping stones and unexpected external impacts.", features: ["Hierarchical Inverse Dynamics", "Footstep Replanning", "Active Compliance Control"], borderColor: "border-lime-500/30" },
      { icon: "Cpu", title: "Sim-to-Real Policy for Humanoid Pallet Manipulation", tag: "PHYSICAL AI", desc: "End-to-end reinforcement learning model combining vision-guided reaching, dual-arm heavy box lifting, and whole-body center-of-mass shift deployed directly onto physical humanoid hardware.", features: ["Domain Randomization Suite", "Vision-Force Policy", "Sub-Millisecond Inference"], borderColor: "border-emerald-500/30" }
    ],
    careerOutcomes: "Humanoid Robotics Engineer, Physical AI Scientist, Whole-Body Control Specialist ($200k-$450k)"
  },

  // ==========================================
  // 5. DEEP TECH: QUANTUM COMPUTING & HARD-TECH
  // ==========================================
  "deep-tech-quantum-computing-hard-tech": {
    title: "Deep Tech: Quantum Computing & Hard-Tech",
    tagline: "Qiskit, Quantum Error Correction & Photonic Computing",
    duration: "4 Months",
    overview: "Venture beyond classical silicon into the realm of quantum computing and exotic hard-tech architectures. Master qubits, superposition, entanglement, quantum gates, surface code error correction, NISQ variational algorithms (VQE, QAOA), quantum chemistry simulations, and integrated photonic compute for optical tensor acceleration.",
    objectives: [
      { num: "01", color: "cyan", icon: "Atom", title: "Quantum Circuit Architecture", desc: "Master unitary transformations, Bloch sphere geometry, multi-qubit entanglement, and phase kickback algorithms." },
      { num: "02", color: "blue", icon: "ShieldCheck", title: "Quantum Error Correction (QEC)", desc: "Implement Surface Codes, stabilizer formalisms, syndrome measurements, and fault-tolerant logical qubit operations." },
      { num: "03", color: "purple", icon: "Cpu", title: "Variational Quantum Algorithms", desc: "Formulate VQE for molecular ground state energy calculation and QAOA for combinatorial optimization on noisy hardware." },
      { num: "04", color: "amber", icon: "Zap", title: "Photonic & Analog Compute Acceleration", desc: "Explore optical neural networks, Mach-Zehnder interferometers, and matrix-vector optical multiplication at femtojoule efficiencies." }
    ],
    outcomes: [
      { label: "CLO 01", color: "cyan", icon: "Award", title: "Quantum Algorithms & Hard-Tech Engineer", desc: "Design quantum circuit routines and evaluate hybrid classical-quantum acceleration pipelines on actual quantum hardware." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Quantum Circuits, Math & Qiskit", subtitle: "MONTHS 1-2", color: "cyan",
        modules: [
          { code: "M1", title: "Quantum Information & Qiskit SDK", weeks: "Weeks 1-4", icon: "Atom", color: "cyan", tags: ["Qiskit 1.0", "Bloch Sphere", "Bell States", "Quantum Fourier Transform"], desc: "Developing quantum circuits, simulating quantum state vectors, and testing on cloud-accessible superconducting quantum processors." },
          { code: "M2", title: "Variational Quantum Algorithms (VQE/QAOA)", weeks: "Weeks 5-8", icon: "Cpu", color: "blue", tags: ["VQE", "QAOA", "Parametrized Circuits", "Classical Optimizers (COBYLA)"], desc: "Implementing hybrid classical-quantum optimization routines for molecular structure simulation and combinatorial graph partitioning." }
        ],
        milestoneTitle: "Lithium Hydride Ground-State Energy Simulator", milestoneDesc: "VQE Quantum Chemistry Model", milestoneFeatures: ["Jordan-Wigner Fermionic Mapping", "Active-Space Reduction", "Hardware Noise Mitigation"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Error Correction & Next-Gen Optical Compute", subtitle: "MONTHS 3-4", color: "purple",
        modules: [
          { code: "M3", title: "Surface Codes & Quantum Error Correction", weeks: "Weeks 9-12", icon: "ShieldCheck", color: "purple", tags: ["Stabilizer Codes", "Surface Code Decoders", "MWPM Algorithm", "Logical Qubits"], desc: "Engineering Minimum Weight Perfect Matching (MWPM) decoders to correct X and Z errors across 2D square lattice surface codes." },
          { code: "M4", title: "Silicon Photonics & Optical Tensor Engines", weeks: "Weeks 13-16", icon: "Zap", color: "amber", tags: ["Photonic Meshes", "Mach-Zehnder Interferometers", "Coherent Light", "Femtojoule/MAC"], desc: "Simulating coherent optical matrix multiplication using integrated silicon photonics for sub-picosecond analog AI acceleration." }
        ],
        milestoneTitle: "Fault-Tolerant Logical Qubit Circuit Benchmark", milestoneDesc: "Surface Code Simulation Suite", milestoneFeatures: ["Syndrome Extraction Circuit", "Sub-Threshold Physical Error Rate", "Real-Time Graph Matching Decoder"]
      }
    ],
    techStack: {
      client: { title: "JupyterLab & Qiskit Visualizations", icon: "Monitor", desc: "Scientific UI", tags: ["Qiskit Visualizations", "Plotly", "QuNetSim"] },
      server: { title: "Python, Qiskit & C++ QX Simulator", icon: "Terminal", desc: "Quantum Core", tags: ["Qiskit 1.0", "PennyLane", "NumPy", "C++ QX"] },
      database: { title: "HDF5 Quantum State Vector DB", icon: "Database", desc: "State Storage", type: "High-Dimensional Tensor", platform: "HDF5 / Zarr" },
      devops: ["IBM Quantum Runtime", "PennyLane", "Docker", "QuTiP"]
    },
    projects: [
      { icon: "Atom", title: "Hybrid Quantum-Classical Portfolio Risk Optimizer", tag: "QUANTUM FINANCE", desc: "A Quantum Approximate Optimization Algorithm (QAOA) implementation solving non-convex multi-asset portfolio allocation with quadratic cardinality constraints on noisy superconducting quantum hardware.", features: ["Parametrized Quantum Ansatz", "Noise Mitigation (ZNE)", "Supremacy vs Classical Heuristics"], borderColor: "border-cyan-500/30" },
      { icon: "Zap", title: "Photonic Coherent Optical Neural Network Emulator", tag: "OPTICAL COMPUTE", desc: "A physical-layer simulation framework for cascaded Mach-Zehnder silicon photonics meshes executing matrix-vector multiplications with zero dynamic power dissipation during passive optical propagation.", features: ["Unitary Matrix Decomposition", "Thermal Phase Shifter Calibration", "Femtojoule Per MAC Benchmark"], borderColor: "border-amber-500/30" }
    ],
    careerOutcomes: "Quantum Software Engineer, Deep Tech Research Scientist, Optical Compute Architect ($190k-$400k)"
  },

  // ==========================================
  // 6. EVTOL FLIGHT CONTROL & URBAN AIR MOBILITY
  // ==========================================
  "evtol-flight-control-urban-air-mobility": {
    title: "eVTOL Flight Control & Urban Air Mobility",
    tagline: "Fly-By-Wire, Tilt-Rotor Aerodynamics & DO-178C",
    duration: "4 Months",
    overview: "Architect the next era of urban aviation. Engineer flight control systems for Electric Vertical Takeoff and Landing (eVTOL) aircraft. Master transition dynamics (hover-to-forward flight), distributed electric propulsion (DEP), multi-redundant fly-by-wire avionics, FAA/EASA DO-178C Level A safety-critical software compliance, and high-voltage battery pack thermal management.",
    objectives: [
      { num: "01", color: "sky", icon: "Plane", title: "eVTOL Aerodynamics & Transition Dynamics", desc: "Model rotor downwash, gyroscopic precession, and tilt-wing/vectored-thrust transition corridors from hover to wing-borne flight." },
      { num: "02", color: "blue", icon: "Layers", title: "Triple-Modular Redundant Fly-by-Wire", desc: "Architect fault-tolerant flight computer architectures featuring voting logic and seamless redundancy degradation." },
      { num: "03", color: "emerald", icon: "ShieldCheck", title: "DO-178C Safety-Critical Software", desc: "Implement MISRA C++ safety standards, MC/DC test coverage, and formal verification methodologies for Level A certification." },
      { num: "04", color: "amber", icon: "Zap", title: "Battery BMS & Electric Propulsion", desc: "Optimize high-voltage battery discharge profiles, cell thermal runaway mitigation, and bus power distribution." }
    ],
    outcomes: [
      { label: "CLO 01", color: "sky", icon: "Award", title: "Aerospace Flight Control Lead", desc: "Design DO-178C certified fly-by-wire flight control computers and transition flight dynamics laws for commercial passenger eVTOLs." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Flight Mechanics & Fly-by-Wire Control Laws", subtitle: "MONTHS 1-2", color: "sky",
        modules: [
          { code: "M1", title: "Vectored-Thrust Aerodynamics & Dynamics", weeks: "Weeks 1-4", icon: "Plane", color: "sky", tags: ["Blade Element Theory", "6-DOF Equations", "Transition Corridor", "DEP Acoustics"], desc: "Formulating 6-DOF nonlinear equations of motion, tilt-rotor blade aerodynamics, and dynamic ground effect interactions." },
          { code: "M2", title: "Nonlinear Dynamic Inversion (NDI) & L1 Adaptive", weeks: "Weeks 5-8", icon: "Workflow", color: "blue", tags: ["NDI Control", "L1 Adaptive Control", "Control Allocation", "Gain Scheduling"], desc: "Developing adaptive flight control laws that seamlessly transition control power from vertical lift rotors to aerodynamic control surfaces." }
        ],
        milestoneTitle: "Full Flight Envelope Transition Simulation", milestoneDesc: "High-Fidelity Flight Dynamics Model", milestoneFeatures: ["Hover to 150-Knot Cruise Transition", "25-Knot Crosswind Gust Rejection", "Control Surface Actuator Saturation Prevention"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Avionics Certification & High-Voltage BMS", subtitle: "MONTHS 3-4", color: "emerald",
        modules: [
          { code: "M3", title: "Triple-Modular Redundancy & DO-178C", weeks: "Weeks 9-12", icon: "ShieldCheck", color: "emerald", tags: ["DO-178C Level A", "MISRA C++", "Voter Logic", "ARINC 429 / 664"], desc: "Designing triple-redundant flight computer voting architectures over ARINC deterministic databuses complying with FAA guidelines." },
          { code: "M4", title: "High-Voltage Battery BMS & DEP Routing", weeks: "Weeks 13-16", icon: "Zap", color: "amber", tags: ["800V DC Bus", "State-of-Charge (SoC)", "Thermal Runaway", "Inverter Telemetry"], desc: "Engineering battery management algorithms monitoring cell impedance, state-of-health, and instant dual-inverter failover." }
        ],
        milestoneTitle: "Hard Real-Time Certified Flight Computer (SITL)", milestoneDesc: "Deterministic Avionics Core", milestoneFeatures: ["200Hz Deterministic Control Loop", "Lockstep Redundant Execution", "Automated MC/DC Verification Suite"]
      }
    ],
    techStack: {
      client: { title: "MATLAB/Simulink & Qt Ground Station", icon: "Monitor", desc: "Telemetry & Modeling", tags: ["Simulink", "Qt 6 Ground Station", "Cesium 3D"] },
      server: { title: "Embedded C++20 & RTEMS / VxWorks", icon: "Terminal", desc: "Avionics Software", tags: ["Embedded C++20", "RTEMS RTOS", "ARINC 653", "Eigen"] },
      database: { title: "Flight Data Recorder (ARINC 767) DB", icon: "Database", desc: "Black Box State", type: "Certified Flash Storage", platform: "Onboard NVRAM" },
      devops: ["JSBSim", "X-Plane SITL", "VectorCAST", "GitLab CI"]
    },
    projects: [
      { icon: "Plane", title: "Fault-Tolerant Vectored-Thrust Flight Control Law Suite", tag: "FLIGHT CONTROL", desc: "A nonlinear dynamic inversion flight control system featuring dynamic rotor failure re-allocation that autonomously detects dual-motor flameouts and safely guides an octo-rotor eVTOL to a smooth vertiport landing.", features: ["Real-Time Control Re-Allocation", "Crosswind Gust Alleviation", "Loss-of-Thrust Recovery"], borderColor: "border-sky-500/30" },
      { icon: "ShieldCheck", title: "FAA DO-178C Level A Compliant Autoland Computer", tag: "AVIONICS SAFETY", desc: "A hard real-time triple-modular redundant fly-by-wire flight management system complete with 100% MC/DC unit test coverage and automated vertiport visual guidance landing.", features: ["Triple Redundant Voting Core", "ARINC 429 Deterministic Bus", "Zero Allocation C++ Architecture"], borderColor: "border-emerald-500/30" }
    ],
    careerOutcomes: "eVTOL Flight Control Engineer, Aerospace Systems Architect, Avionics Safety Lead ($185k-$390k)"
  },

  // ==========================================
  // 7. NEUROTECH & BRAIN-COMPUTER INTERFACES
  // ==========================================
  "neurotech-brain-computer-interfaces": {
    title: "Neurotech & Brain-Computer Interfaces",
    tagline: "EEG/ECoG Decoding, Spike Sorting & Closed-Loop Neuro-Sensors",
    duration: "4 Months",
    overview: "Bridge the human nervous system with digital silicon. Engineer high-bandwidth Brain-Computer Interfaces (BCIs) across non-invasive (high-density EEG, fNIRS) and invasive (ECoG, Utah Array, neural threads) modalities. Master raw bio-potential analog front-ends, spatial filtering (CSP, ICA), neural spike sorting, transformer-based motor intention decoding, and closed-loop neuro-stimulation.",
    objectives: [
      { num: "01", color: "purple", icon: "Brain", title: "Bio-Potential Electrophysiology", desc: "Understand action potentials, local field potentials (LFP), EEG rhythm bands (mu, beta, gamma), and biological noise rejection." },
      { num: "02", color: "violet", icon: "Activity", title: "Digital Signal Processing & Filtering", desc: "Apply Common Spatial Patterns (CSP), Independent Component Analysis (ICA), and notch filtering for ocular/muscular artifact removal." },
      { num: "03", color: "blue", icon: "Cpu", title: "Real-Time Neural Decoding Models", desc: "Train recurrent and transformer models (EEGNet, Neuformers) to translate continuous motor cortical activity into robotic kinematic commands." },
      { num: "04", color: "emerald", icon: "Zap", title: "Closed-Loop Low-Latency Systems", desc: "Build sub-20ms feedback loops for sensory electrical micro-stimulation and prosthetic limb control over Lab Streaming Layer." }
    ],
    outcomes: [
      { label: "CLO 01", color: "purple", icon: "Award", title: "Neurotech BCI Systems Engineer", desc: "Build end-to-end neural signal processing pipelines and deploy real-time intention decoding systems for neuro-prosthetics." }
    ],
    phases: [
      {
        id: "phase1", name: "PHASE I", title: "Neural Signals & Electrophysiological DSP", subtitle: "MONTHS 1-2", color: "purple",
        modules: [
          { code: "M1", title: "Neural Signal Acquisition & Preprocessing", weeks: "Weeks 1-4", icon: "Brain", color: "purple", tags: ["Lab Streaming Layer", "MNE-Python", "Bandpass Filtering", "Notch 60Hz Filter"], desc: "Interfacing with OpenBCI and clinical electrophysiology hardware, synchronizing multi-modal streams via LSL, and rejecting ambient electromagnetic noise." },
          { code: "M2", title: "Spatial Filtering & Feature Extraction", weeks: "Weeks 5-8", icon: "Activity", color: "violet", tags: ["Common Spatial Pattern", "Wavelet Transform", "ICA Artifact Removal", "Power Spectral Density"], desc: "Computing spatial covariance matrices to isolate event-related desynchronization (ERD) in motor imagery tasks." }
        ],
        milestoneTitle: "Real-Time P300 Speller & Motor Imagery Classifier", milestoneDesc: "High-Accuracy Neural Intent Classifier", milestoneFeatures: ["Common Spatial Pattern Filter", "92%+ Accuracy on 16-Channel EEG", "Sub-50ms Classification Window"]
      },
      {
        id: "phase2", name: "PHASE II", title: "Deep Learning Decoders & Closed-Loop BCI", subtitle: "MONTHS 3-4", color: "emerald",
        modules: [
          { code: "M3", title: "Deep Learning on Neural Time Series", weeks: "Weeks 9-12", icon: "Cpu", color: "blue", tags: ["EEGNet", "Conformer Decoders", "Spike Sorting", "Kalman Filter Kinematics"], desc: "Training spatio-temporal convolutional and transformer models to predict continuous 2D/3D hand velocity vectors from motor cortex signals." },
          { code: "M4", title: "Closed-Loop Neuro-Prosthetics & Stimulation", weeks: "Weeks 13-16", icon: "Zap", color: "emerald", tags: ["Sub-20ms Latency", "Micro-Stimulation Sim", "Robotic Arm Control", "Safety Thresholds"], desc: "Architecting closed-loop pipelines sending real-time actuation commands to robotic manipulators while receiving sensory haptic feedback." }
        ],
        milestoneTitle: "Continuous Neural Cursor & Robotic Arm Controller", milestoneDesc: "Sub-20ms Closed-Loop BCI Core", milestoneFeatures: ["Continuous 3D Kinematics Prediction", "Real-Time LSL Streaming Ingestion", "ONNX Hardware Acceleration"]
      }
    ],
    techStack: {
      client: { title: "Three.js & WebSockets BCI Visualizer", icon: "Monitor", desc: "Real-Time Neural Visualizer", tags: ["Three.js", "WebSockets", "Plotly Dash"] },
      server: { title: "Python 3.11, MNE & PyTorch", icon: "Terminal", desc: "Signal Processing & AI", tags: ["MNE-Python", "PyTorch", "SciPy Signal", "C++ LSL"] },
      database: { title: "NWB (Neurodata Without Borders) & HDF5", icon: "Database", desc: "Electrophysiology Data", type: "Standardized Neural Schema", platform: "Local NVMe / DANDI Archive" },
      devops: ["OpenBCI GUI", "LabStreamingLayer (LSL)", "Docker", "ONNX Runtime"]
    },
    projects: [
      { icon: "Brain", title: "Real-Time 64-Channel Motor Cortex Robotic Hand Decoder", tag: "NEURO-PROSTHETICS", desc: "An end-to-end BCI streaming pipeline decoding discrete finger flexions and continuous wrist angles from high-density neural recordings, outputting sub-15ms joint servo commands to an anthropomorphic robotic hand.", features: ["Spatio-Temporal Conformer Decoder", "Low-Latency LSL Pipeline", "Adaptive Drift Re-Calibration"], borderColor: "border-purple-500/30" },
      { icon: "Activity", title: "Closed-Loop Bio-Feedback System for Neurological Health", tag: "CLOSED-LOOP BCI", desc: "Adaptive neural monitoring engine that tracks real-time power spectral density shifts, detects pre-epileptic anomalous oscillatory synchronization, and triggers mitigating phase-locked acoustic feedback.", features: ["Phase-Synchronized Feedback", "Automated Artifact Elimination", "Microsecond Precision Timers"], borderColor: "border-violet-500/30" }
    ],
    careerOutcomes: "BCI Algorithm Engineer, Neurotech Systems Architect, Neural Signal Processing Scientist ($175k-$375k)"
  }
};

// Aliases for short IDs and alternate title slugs
curriculumDataDeepTech["unreal-engine-game-dev"] = curriculumDataDeepTech["game-engine-architecture-unreal-5"];
curriculumDataDeepTech["roblox-luau-metaverse"] = curriculumDataDeepTech["roblox-luau-metaverse-systems"];
curriculumDataDeepTech["defence-tech-autonomous-swarms"] = curriculumDataDeepTech["defence-tech-autonomous-drone-swarms"];
curriculumDataDeepTech["humanoid-robotics-sim2real"] = curriculumDataDeepTech["humanoid-robotics-sim-to-real-rl"];
curriculumDataDeepTech["quantum-computing-deep-tech"] = curriculumDataDeepTech["deep-tech-quantum-computing-hard-tech"];
curriculumDataDeepTech["evtol-flight-control-systems"] = curriculumDataDeepTech["evtol-flight-control-urban-air-mobility"];
curriculumDataDeepTech["neurotech-bci-neural-decoding"] = curriculumDataDeepTech["neurotech-brain-computer-interfaces"];
curriculumDataDeepTech["neurotech-brain-computer-interfaces-bci"] = curriculumDataDeepTech["neurotech-brain-computer-interfaces"];
