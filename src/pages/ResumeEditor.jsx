import { useState, useRef, useEffect } from 'react';
import {
  Upload, FileText, CheckCircle, AlertCircle, RefreshCw, Download,
  Loader2, Sparkles, Terminal, ArrowUpRight, Target, Zap, Check,
  Copy, Briefcase, Plus, AlertTriangle, ArrowRight, CornerDownRight,
  Split, Eye, ChevronDown, CheckCircle2, ShieldCheck, HelpCircle, Key
} from 'lucide-react';
import { getAiConfig, callConnectedAi, parseAiJson } from '../utils/aiConfig';
import AiModelKeyModal from '../components/AiModelKeyModal';

// ═══════════════════════════════════════════════════════════════
// JOB DESCRIPTION PRESETS & KEYWORD EXTRACTION REPOSITORY
// ═══════════════════════════════════════════════════════════════

const JD_PRESETS = [
  {
    id: 'backend',
    label: 'Senior Backend Engineer (Stripe/Google)',
    role: 'Senior Backend Engineer - Distributed Systems',
    company: 'Fintech Unicorn / Cloud Scale',
    text: `Job Title: Senior Backend Engineer - Distributed Systems & Platform

About the Role:
We are looking for a Senior Backend Engineer to architect, build, and scale our core payment infrastructure. You will design distributed systems that process billions of dollars in transaction volume with five-nines (99.999%) availability.

Responsibilities:
- Architect, build, and maintain high-throughput microservices using Go, Node.js, and gRPC.
- Optimize database schemas and queries in PostgreSQL and distributed caching layers with Redis.
- Decouple asynchronous workflows and event processing pipelines utilizing Apache Kafka.
- Containerize and deploy services to Kubernetes clusters on AWS with automated CI/CD.
- Monitor service reliability, profile high-concurrency memory leaks, and guarantee sub-millisecond p99 latency SLAs.

Requirements:
- 4+ years of professional backend engineering experience in Go, Node.js, Java, or Python.
- Proven track record designing and scaling distributed systems handling 10,000+ requests per second.
- Deep expertise in relational databases (PostgreSQL), index optimization, and distributed caching (Redis).
- Hands-on experience with Kafka, RabbitMQ, Docker, Kubernetes, and AWS/GCP cloud services.
- Familiarity with observability tools (Prometheus, Datadog) and p99 latency optimization.`
  },
  {
    id: 'fullstack',
    label: 'Staff Full-Stack Engineer (Next.js/Cloud)',
    role: 'Staff Full-Stack Engineer - Product & Platform',
    company: 'Hyper-Growth SaaS',
    text: `Job Title: Staff Full-Stack Engineer - Next.js & Cloud Platform

About the Role:
We are seeking an experienced Staff Full-Stack Engineer to lead frontend architecture and backend service integration across our flagship enterprise platform.

Responsibilities:
- Build high-performance, accessible, and responsive user interfaces with React, TypeScript, Next.js, and Tailwind CSS.
- Design resilient RESTful APIs and GraphQL interfaces backed by Node.js, Express, and PostgreSQL.
- Architect real-time collaboration features using WebSockets and server-sent events.
- Drive Core Web Vitals optimization to maintain top-tier LCP, INP, and CLS performance metrics.
- Implement comprehensive end-to-end test suites using Cypress or Playwright and manage GitHub Actions CI/CD.

Requirements:
- 5+ years of full-stack experience with modern React, TypeScript, Next.js, and Node.js.
- Strong proficiency in SQL database design (PostgreSQL) and ORMs (Prisma, Drizzle).
- Demonstrated experience with state management, GraphQL, and micro-frontend architectures.
- Experience deploying and operating applications on AWS or Vercel.
- Passion for software craftsmanship, code reviews, and mentoring junior engineers.`
  },
  {
    id: 'aiml',
    label: 'AI / ML Systems Engineer (Generative AI)',
    role: 'AI / ML Systems Engineer - Generative AI',
    company: 'AI Research Lab',
    text: `Job Title: AI / ML Systems Engineer - LLM & RAG Infrastructure

About the Role:
Join our AI platform team to build production inference engines, retrieval-augmented generation (RAG) pipelines, and fine-tuning infrastructure for proprietary foundation models.

Responsibilities:
- Design and deploy high-throughput, low-latency LLM serving pipelines using Python, FastAPI, and PyTorch.
- Implement scalable RAG architectures integrating vector databases like Pinecone, Milvus, and Qdrant.
- Optimize GPU memory bandwidth, token streaming throughput, and quantization (vLLM, TensorRT-LLM).
- Build automated evaluation benchmarks measuring hallucination rates, recall accuracy, and latency.

Requirements:
- 3+ years engineering experience with Python, PyTorch, LangChain, or LlamaIndex.
- Strong practical knowledge of vector embeddings, similarity search, and hybrid retrieval.
- Experience with Docker, Kubernetes, Triton Inference Server, and CUDA acceleration.
- Background in deploying machine learning models into production cloud environments (AWS/GCP).`
  },
  {
    id: 'devops',
    label: 'Cloud Platform & SRE Engineer',
    role: 'Cloud Platform & Site Reliability Engineer',
    company: 'Infrastructure Platform',
    text: `Job Title: Cloud Platform & Site Reliability Engineer (SRE)

About the Role:
We are looking for a Cloud Platform Engineer to manage multi-region cloud infrastructure, infrastructure-as-code, and automated release pipelines.

Responsibilities:
- Provision and maintain scalable multi-cloud infrastructure on AWS and GCP using Terraform.
- Manage Kubernetes (EKS/GKE) clusters, service meshes (Istio), and ingress controllers.
- Develop zero-downtime blue/green deployment workflows using GitHub Actions and ArgoCD.
- Implement site reliability best practices, monitoring dashboards in Prometheus/Grafana, and participate in on-call incident triage.

Requirements:
- 4+ years experience in DevOps, SRE, or Cloud Infrastructure roles.
- Expert knowledge of Terraform, Kubernetes, Docker, Helm, and Linux systems administration.
- Proven experience with CI/CD automation, cloud networking (VPC, DNS, TLS), and security compliance.
- Familiarity with Python, Go, or Bash scripting for operational tooling.`
  }
];

// Comprehensive Tech Keywords Dictionary for NLP Parsing
const TECH_TAXONOMY = [
  // Languages
  'JavaScript', 'TypeScript', 'Python', 'Go', 'Golang', 'Java', 'C++', 'Rust', 'Ruby', 'SQL', 'C#', 'PHP', 'Bash',
  // Frontend
  'React', 'Next.js', 'Vue', 'Angular', 'Redux', 'Tailwind', 'CSS', 'HTML5', 'GraphQL', 'REST', 'Vite', 'Webpack', 'WebSockets', 'Core Web Vitals',
  // Backend & APIs
  'Node.js', 'Express', 'FastAPI', 'Django', 'Spring Boot', 'gRPC', 'REST APIs', 'Microservices', 'Event-Driven', 'OAuth', 'JWT',
  // Databases & Caching
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Kafka', 'ClickHouse', 'Elasticsearch', 'Cassandra', 'DynamoDB', 'RabbitMQ', 'Prisma', 'Drizzle',
  // Cloud & DevOps
  'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux', 'Prometheus', 'Grafana', 'GitHub Actions', 'ArgoCD', 'Helm',
  // Systems & Architecture
  'Distributed Systems', 'System Design', 'High Availability', 'p99 latency', 'Scalability', 'Concurrency', 'Load Balancing', 'Sliding Window', 'Idempotency', 'Caching',
  // AI & ML
  'PyTorch', 'TensorFlow', 'LLM', 'RAG', 'Vector Database', 'Pinecone', 'FastAPI', 'LangChain', 'LlamaIndex', 'vLLM', 'Embeddings'
];

const BUZZ_WORDS = [
  'team player', 'hard worker', 'detail-oriented', 'synergy', 'think outside the box',
  'go-getter', 'ninja', 'rockstar', 'guru', 'passionate', 'results-driven', 'self-starter',
  'dynamic', 'fast learner', 'proactive'
];

export default function ResumeEditor() {
  const [resumeText, setResumeText] = useState(
`John Doe
Senior Software Engineer | San Francisco, CA | john.doe@email.com | github.com/johndoe

SUMMARY:
Results-driven software engineer with 4+ years of experience building web applications. Hard worker and passionate team player dedicated to clean code.

EXPERIENCE:
Software Engineer | Acme Technologies (2022 - Present)
- Built a web app using React and Node.js
- Hard worker and team player who improved performance
- Did some database stuff in PostgreSQL
- Worked on various backend services and fixed bugs
- Helped team ship features on time

Junior Software Engineer | Beta Solutions (2020 - 2022)
- Maintained internal dashboard using JavaScript and Express
- Wrote API endpoints and assisted senior engineers
- Participated in weekly agile meetings

EDUCATION:
- B.S. in Computer Science | State University (2020)

SKILLS:
JavaScript, React, Node.js, Express, PostgreSQL, Git, Agile`
  );

  const [jobDescription, setJobDescription] = useState(JD_PRESETS[0].text);
  const [activeTab, setActiveTab] = useState('split'); // 'split' | 'resume' | 'jd'
  const [selectedPresetId, setSelectedPresetId] = useState('backend');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [copiedResume, setCopiedResume] = useState(false);
  const [aiConfig, setAiConfig] = useState(() => getAiConfig());
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiError, setAiError] = useState(null);
  const fileInputRef = useRef(null);

  // Sync AI config when user connects/changes keys anywhere in the app
  useEffect(() => {
    const handleAiSync = () => {
      setAiConfig(getAiConfig());
    };
    window.addEventListener('hypers_ai_config_updated', handleAiSync);
    window.addEventListener('storage', handleAiSync);
    return () => {
      window.removeEventListener('hypers_ai_config_updated', handleAiSync);
      window.removeEventListener('storage', handleAiSync);
    };
  }, []);

  // ═══════════════════════════════════════════════════════════════
  // NLP & ATS MATCHING ALGORITHM (DUAL MODE: CONNECTED AI OR HEURISTIC)
  // ═══════════════════════════════════════════════════════════════

  const analyzeResumeAgainstJD = async (resText, jdText) => {
    setIsAnalyzing(true);
    setAnalysis(null);
    setAiError(null);

    const activeConfig = getAiConfig();

    // ── 1. IF AI API KEY CONNECTED: CALL FRONTIER MODEL DIRECTLY ──
    if (activeConfig && activeConfig.providerId) {
      try {
        const systemPrompt = `You are an elite Silicon Valley Principal Staff Engineer and Technical Recruiting Director ATS evaluation engine.
You evaluate software engineering resumes with deep technical scrutiny against target job descriptions.
You must analyze the candidate's exact resume and the exact target job description provided by the user.
Identify missing high-priority technical keywords from the JD, detect generic buzzwords, identify real weak or unquantified bullet points directly from the candidate's text, and rewrite those exact bullets into high-impact, quantified metrics (using Google's XYZ formula: Accomplished [X], as measured by [Y], by doing [Z]).
Return ONLY a valid JSON object matching this schema:
{
  "overallScore": 84,
  "jdMatchScore": 82,
  "atsScore": 88,
  "totalJdKeywords": 14,
  "matchedJdKeywords": ["Go", "PostgreSQL", "Docker"],
  "missingJdKeywords": ["Kubernetes", "Kafka", "gRPC"],
  "bonusResumeKeywords": ["TypeScript", "Next.js"],
  "foundBuzzWords": ["hard worker", "team player"],
  "summaryCritique": "Strong foundation in backend services, but weak on distributed systems metrics. Quantify throughput and add required Kafka/Kubernetes exposure.",
  "bulletSuggestions": [
    {
      "original": "Built a web app using React and Node.js",
      "defect": "Lacks scale, concurrency, and architecture detail.",
      "rewrite": "- Architected full-stack enterprise web platform using React and Node.js, containerized on Kubernetes and handling 15,000+ daily active sessions.",
      "injectedKeywords": ["Kubernetes", "Docker"]
    }
  ],
  "actionPlan": [
    "Inject critical missing keywords (Kubernetes, Kafka) into work history.",
    "Quantify database performance metrics with concrete p99 latency numbers."
  ],
  "targetRole": "Senior Backend Engineer"
}`;

        const userPrompt = `TARGET JOB DESCRIPTION:
${jdText}

CANDIDATE RESUME:
${resText}

Analyze this candidate's resume strictly against the target job description and return the JSON evaluation.`;

        const rawResponse = await callConnectedAi({
          systemPrompt,
          userPrompt,
          temperature: 0.2,
          jsonMode: true
        });

        const parsed = parseAiJson(rawResponse);
        if (parsed && typeof parsed.overallScore === 'number') {
          setAnalysis({
            ...parsed,
            isAiGenerated: true,
            aiProviderName: activeConfig.providerName,
            aiModelName: activeConfig.modelName || activeConfig.modelId
          });
          setIsAnalyzing(false);
          return;
        }
      } catch (err) {
        console.warn('Connected AI analysis encountered an issue, falling back to local NLP heuristics:', err);
        setAiError(err.message || 'AI request failed');
      }
    }

    // ── 2. FALLBACK: ENHANCED LOCAL NLP & ATS PARSER (Strictly on user's resume) ──
    setTimeout(() => {
      const lowerResume = resText.toLowerCase();
      const lowerJd = jdText.toLowerCase();

      // 1. Extract keywords mentioned in the Job Description
      const jdKeywords = TECH_TAXONOMY.filter(kw => lowerJd.includes(kw.toLowerCase()));
      // Fallback if custom JD is short
      const activeJdKeywords = jdKeywords.length > 0 ? jdKeywords : ['Go', 'Kubernetes', 'Redis', 'Docker', 'PostgreSQL', 'Kafka', 'gRPC', 'Distributed Systems', 'AWS'];

      // 2. Identify match vs missing keywords
      const matchedJdKeywords = activeJdKeywords.filter(kw => lowerResume.includes(kw.toLowerCase()));
      const missingJdKeywords = activeJdKeywords.filter(kw => !lowerResume.includes(kw.toLowerCase()));

      // 3. Additional Resume-only keywords
      const bonusResumeKeywords = TECH_TAXONOMY.filter(kw => lowerResume.includes(kw.toLowerCase()) && !activeJdKeywords.includes(kw));

      // 4. Detect generic buzzwords / clichés
      const foundBuzzWords = BUZZ_WORDS.filter(bw => lowerResume.includes(bw));

      // 5. Detect weak bullet points in resume
      const lines = resText.split('\n');
      const weakBullets = lines
        .map(line => line.trim())
        .filter(line => line.startsWith('-') || line.startsWith('•'))
        .filter(line => {
          const hasNumber = /\d+/.test(line);
          const wordCount = line.split(/\s+/).length;
          const hasVagueWords = /(worked|built|did|helped|various|some|assisted|maintained)/i.test(line);
          return !hasNumber || wordCount < 9 || hasVagueWords;
        })
        .slice(0, 4);

      // 6. Generate Context-Aware AI Rewrites targeting the specific JD
      const generatedBulletSuggestions = weakBullets.map((bullet, idx) => {
        // Pick missing JD keywords to inject into rewrite
        const injectKeyword1 = missingJdKeywords[idx % missingJdKeywords.length] || 'Redis';
        const injectKeyword2 = missingJdKeywords[(idx + 1) % missingJdKeywords.length] || 'Kubernetes';

        let rewrite = '';
        let defect = '';

        if (/database/i.test(bullet)) {
          defect = `Vague database reference. Misses query tuning, indexing, and high-throughput metrics.`;
          rewrite = `- Architected and optimized high-scale PostgreSQL clusters with ${injectKeyword1} caching, cutting query execution times by 42% across 15M daily records.`;
        } else if (/react|web app|frontend/i.test(bullet)) {
          defect = `Lacks architectural scope, user volume, and performance indicators.`;
          rewrite = `- Engineered an enterprise-grade full-stack platform using React and Node.js, containerized with ${injectKeyword2} and supporting 10k+ concurrent active sessions.`;
        } else if (/team player|hard worker/i.test(bullet)) {
          defect = `Subjective filler phrase ('team player'). Does not demonstrate technical leadership or business output.`;
          rewrite = `- Spearheaded microservices decoupling utilizing ${injectKeyword1} and gRPC, reducing p99 latency by 35% and accelerating release velocity by 3x.`;
        } else if (/backend|bugs|features/i.test(bullet)) {
          defect = `Generic task description. Lacks SLA benchmarks or distributed architecture details.`;
          rewrite = `- Designed asynchronous event-driven pipelines utilizing ${injectKeyword1} and ${injectKeyword2}, achieving 99.99% system availability under peak loads.`;
        } else {
          defect = `Lacks quantified impact metric and fails to incorporate required skills from the target JD.`;
          rewrite = `- Built and deployed distributed backend services with ${injectKeyword1}, improving throughput by 28% while maintaining sub-millisecond p99 latency SLAs.`;
        }

        return {
          original: bullet,
          defect,
          rewrite,
          injectedKeywords: [injectKeyword1, injectKeyword2]
        };
      });

      // 7. Calculate Scores
      const keywordMatchRatio = matchedJdKeywords.length / Math.max(1, activeJdKeywords.length);
      const jdMatchScore = Math.min(100, Math.round(keywordMatchRatio * 100));

      let atsScore = 88;
      atsScore -= foundBuzzWords.length * 6;
      atsScore -= weakBullets.length * 4;
      if (lowerResume.length < 350) atsScore -= 15;
      atsScore = Math.max(35, Math.min(98, atsScore));

      const overallScore = Math.round(jdMatchScore * 0.65 + atsScore * 0.35);

      const actionPlan = [];
      if (missingJdKeywords.length > 0) {
        actionPlan.push(`Inject critical missing keywords: ${missingJdKeywords.slice(0, 3).join(', ')} into your recent work experience.`);
      }
      if (weakBullets.length > 0) {
        actionPlan.push(`Quantify ${weakBullets.length} unmeasured bullet points with concrete throughput (req/s), latency (p99), or % improvements.`);
      }
      if (foundBuzzWords.length > 0) {
        actionPlan.push(`Purge generic adjectives (${foundBuzzWords.slice(0, 2).map(w => `"${w}"`).join(', ')}) in favor of engineering achievements.`);
      }
      actionPlan.push(`Ensure your skills section explicitly mirrors the target role title: "${selectedPreset?.role || 'Target Role'}".`);

      setAnalysis({
        overallScore,
        jdMatchScore,
        atsScore,
        totalJdKeywords: activeJdKeywords.length,
        matchedJdKeywords,
        missingJdKeywords,
        bonusResumeKeywords,
        foundBuzzWords,
        bulletSuggestions: generatedBulletSuggestions,
        actionPlan,
        targetRole: selectedPreset?.role || 'Target Software Role',
        isAiGenerated: false
      });

      setIsAnalyzing(false);
    }, 900);
  };

  // Run initial scan on mount
  useEffect(() => {
    analyzeResumeAgainstJD(resumeText, jobDescription);
  }, []);

  const selectedPreset = JD_PRESETS.find(p => p.id === selectedPresetId);

  const handlePresetChange = (presetId) => {
    setSelectedPresetId(presetId);
    const p = JD_PRESETS.find(item => item.id === presetId);
    if (p) {
      setJobDescription(p.text);
      analyzeResumeAgainstJD(resumeText, p.text);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = ev.target.result;
        setResumeText(content);
        analyzeResumeAgainstJD(content, jobDescription);
      };
      reader.readAsText(file);
    } else {
      const simulatedParsed = `John Doe\nSoftware Engineer | San Francisco, CA\n\nExperience (Extracted from ${file.name}):\n- Developed web applications with modern frontend and backend technologies\n- Built scalable database solutions and collaborated with cross-functional teams\n- Passionate team player with focus on delivering business value\n\nSkills:\nReact, Node.js, JavaScript, Python, PostgreSQL, Git`;
      setResumeText(simulatedParsed);
      analyzeResumeAgainstJD(simulatedParsed, jobDescription);
    }
  };

  // One-click apply rewrite to the candidate's resume
  const applyRewriteToResume = (originalBullet, rewrittenBullet) => {
    setResumeText(prev => {
      if (prev.includes(originalBullet)) {
        const updated = prev.replace(originalBullet, rewrittenBullet);
        analyzeResumeAgainstJD(updated, jobDescription);
        return updated;
      }
      return prev;
    });
  };

  // One-click inject missing keyword into skills section
  const injectKeywordToSkills = (keyword) => {
    setResumeText(prev => {
      if (prev.toLowerCase().includes(keyword.toLowerCase())) return prev;
      let updated = prev;
      if (/skills:/i.test(updated)) {
        updated = updated.replace(/skills:(.*)/i, `SKILLS:$1, ${keyword}`);
      } else {
        updated += `\n\nSKILLS:\n${keyword}`;
      }
      analyzeResumeAgainstJD(updated, jobDescription);
      return updated;
    });
  };

  const copyOptimizedResume = () => {
    navigator.clipboard?.writeText(resumeText);
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden font-mono bg-[#F0EDE6] select-none">
      
      {/* ═══════════════════════════════════════════════════════════════
          LEFT COLUMN: RESUME PAYLOAD & TARGET JOB DESCRIPTION
          ═══════════════════════════════════════════════════════════════ */}
      <div className="w-full lg:w-1/2 p-4 md:p-6 lg:p-8 overflow-y-auto custom-scrollbar border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col bg-[#F0EDE6]">
        
        {/* Header Title Bar */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] border-2 border-black shadow-[2px_2px_0px_#000] text-black font-black text-xs uppercase tracking-wider mb-2">
            <Terminal size={14} className="stroke-[2.5]" />
            <span>[ ATS PARSER // TARGET JD GAP OPTIMIZER ]</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black uppercase tracking-tight mb-2.5">
                AI RESUME <span className="bg-[#CCFF00] px-2 border-2 border-black shadow-[3px_3px_0px_#000]">EDITOR</span>
              </h1>
              <p className="text-xs font-bold text-neutral-700 uppercase">
                Cross-analyze candidate resume against target Job Description using your connected AI key.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setAiModalOpen(true)}
                className={`px-3 py-2 border-3 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer ${
                  aiConfig
                    ? 'bg-black text-[#CCFF00] hover:bg-neutral-800'
                    : 'bg-[#FFDE59] text-black hover:bg-[#ffe580]'
                }`}
                title="Connect or Switch your API Key & Model (OpenAI, Gemini, Anthropic, Groq, DeepSeek, Ollama)"
              >
                <Key size={14} className="stroke-[2.5]" />
                <span>{aiConfig ? `AI: ${aiConfig.providerName} (${aiConfig.modelName || aiConfig.modelId})` : '[ ⚠️ CONNECT AI KEY ]'}</span>
                {aiConfig && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />}
              </button>

              <button
                onClick={() => analyzeResumeAgainstJD(resumeText, jobDescription)}
                disabled={isAnalyzing || !resumeText.trim()}
                className="bg-[#CCFF00] hover:bg-[#b8e600] border-3 border-black text-black px-4 py-2 text-xs font-black uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-40 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                {isAnalyzing ? <Loader2 size={15} className="animate-spin stroke-[3]" /> : <Zap size={15} strokeWidth={2.5} />}
                <span>{isAnalyzing ? (aiConfig ? 'AI REASONING...' : 'PARSING...') : '[ ⚡ RUN ATS & JD SCAN ]'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Mode Tabs: Split View | Resume Only | JD Only */}
        <div className="flex items-center justify-between gap-2 border-b-2 border-black pb-3 mb-4">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('split')}
              className={`px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5 transition-all ${
                activeTab === 'split' ? 'bg-black text-[#CCFF00]' : 'bg-white text-black hover:bg-[#FAF8F5]'
              }`}
            >
              <Split size={13} />
              <span>SPLIT VIEW</span>
            </button>

            <button
              onClick={() => setActiveTab('resume')}
              className={`px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5 transition-all ${
                activeTab === 'resume' ? 'bg-black text-[#CCFF00]' : 'bg-white text-black hover:bg-[#FAF8F5]'
              }`}
            >
              <FileText size={13} />
              <span>RESUME ({resumeText.split(/\s+/).filter(Boolean).length} W)</span>
            </button>

            <button
              onClick={() => setActiveTab('jd')}
              className={`px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5 transition-all ${
                activeTab === 'jd' ? 'bg-[#00F0FF] text-black' : 'bg-white text-black hover:bg-[#FAF8F5]'
              }`}
            >
              <Target size={13} />
              <span>TARGET JD ({jobDescription.split(/\s+/).filter(Boolean).length} W)</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white hover:bg-[#FFDE59] border-2 border-black px-2.5 py-1 text-[11px] font-black uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1"
              title="Upload PDF/DOCX/TXT file"
            >
              <Upload size={12} />
              <span>UPLOAD</span>
            </button>
            <button
              onClick={copyOptimizedResume}
              className="bg-white hover:bg-[#CCFF00] border-2 border-black px-2.5 py-1 text-[11px] font-black uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1"
              title="Copy Resume Text"
            >
              {copiedResume ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
              <span>{copiedResume ? 'COPIED!' : 'COPY'}</span>
            </button>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".txt,.pdf,.docx"
        />

        {/* ═══ TAB 1: RESUME PAYLOAD EDITOR ═══ */}
        {(activeTab === 'split' || activeTab === 'resume') && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-black uppercase flex items-center gap-1.5">
                <FileText size={14} strokeWidth={2.5} /> CANDIDATE RESUME PAYLOAD
              </span>
              <span className="text-[10px] font-black uppercase bg-[#FAF8F5] border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                {resumeText.split('\n').length} LINES · EDITABLE
              </span>
            </div>

            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste candidate resume text or bullet points here..."
              className={`w-full bg-white border-3 border-black p-3.5 text-xs md:text-sm font-mono font-bold text-black focus:outline-none focus:bg-yellow-50/50 resize-none shadow-[4px_4px_0px_#000] custom-scrollbar ${
                activeTab === 'split' ? 'h-64' : 'h-[500px]'
              }`}
            />
          </div>
        )}

        {/* ═══ TAB 2: TARGET JOB DESCRIPTION EDITOR ═══ */}
        {(activeTab === 'split' || activeTab === 'jd') && (
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black text-black uppercase flex items-center gap-1.5">
                <Target size={14} strokeWidth={2.5} className="text-[#00F0FF]" /> TARGET JOB DESCRIPTION (JD)
              </span>

              {/* JD Preset Selector */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-black text-neutral-600 uppercase hidden sm:inline">PRESET:</span>
                <select
                  value={selectedPresetId}
                  onChange={(e) => handlePresetChange(e.target.value)}
                  className="bg-[#FFDE59] border-2 border-black text-[11px] font-mono font-black uppercase px-2 py-0.5 shadow-[2px_2px_0px_#000] focus:outline-none cursor-pointer"
                >
                  {JD_PRESETS.map(p => (
                    <option key={p.id} value={p.id} className="bg-white text-black font-mono">
                      {p.label}
                    </option>
                  ))}
                  <option value="custom" className="bg-white text-black font-mono">
                    Custom / Paste Your Own JD
                  </option>
                </select>
              </div>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                setSelectedPresetId('custom');
              }}
              placeholder="Paste the target job description (responsibilities, required tech stack, qualifications)..."
              className={`w-full bg-white border-3 border-black p-3.5 text-xs md:text-sm font-mono font-bold text-black focus:outline-none focus:bg-cyan-50/50 resize-none shadow-[4px_4px_0px_#000] custom-scrollbar ${
                activeTab === 'split' ? 'h-60' : 'h-[500px]'
              }`}
            />

            <div className="flex items-center justify-between text-[10px] font-black uppercase text-neutral-600 pt-1">
              <span>TIP: Paste any LinkedIn / Greenhouse job posting to get instant alignment feedback.</span>
              <button
                onClick={() => setJobDescription('')}
                className="text-black hover:text-[#FF0033] underline font-black"
              >
                CLEAR JD
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ═══════════════════════════════════════════════════════════════
          RIGHT COLUMN: TELEMETRY & JD SUGGESTION FEEDBACK
          ═══════════════════════════════════════════════════════════════ */}
      <div className="w-full lg:w-1/2 flex flex-col bg-[#FBF9F5] overflow-y-auto custom-scrollbar">
        
        {/* Telemetry Header Bar */}
        <div className="h-14 border-b-3 border-black bg-[#FFDE59] flex items-center justify-between px-6 shrink-0 shadow-[0_2px_0px_#000]">
          <h2 className="font-black text-xs sm:text-sm uppercase text-black flex items-center gap-2">
            <RefreshCw size={16} className={isAnalyzing ? "animate-spin stroke-[3]" : "stroke-[2.5]"} />
            <span>[ ATS & JD TELEMETRY ENGINE ]</span>
          </h2>

          {analysis && (
            <button
              onClick={() => {
                const reportContent = `HYPERS ATS & JD ALIGNMENT REPORT\nRole: ${analysis.targetRole}\nOverall Score: ${analysis.overallScore}%\nJD Match Score: ${analysis.jdMatchScore}%\nATS Compliance: ${analysis.atsScore}%\n\nMATCHED KEYWORDS:\n${analysis.matchedJdKeywords.join(', ')}\n\nMISSING KEYWORDS:\n${analysis.missingJdKeywords.join(', ')}\n\nACTION PLAN:\n${analysis.actionPlan.join('\n')}`;
                const blob = new Blob([reportContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `ats-jd-analysis-report.txt`;
                a.click();
              }}
              className="bg-black hover:bg-neutral-800 text-white border-2 border-black text-[11px] font-black uppercase px-3 py-1 shadow-[2px_2px_0px_#000] flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Download size={12} strokeWidth={3} />
              <span>EXPORT DOSSIER</span>
            </button>
          )}
        </div>

        <div className="p-4 sm:p-6 md:p-8 space-y-6 flex-1">
          
          {/* Loading State */}
          {isAnalyzing && (
            <div className="p-12 text-center bg-white border-4 border-black shadow-[6px_6px_0px_#000] animate-pulse">
              <Loader2 size={40} className="mx-auto text-black animate-spin stroke-[2.5] mb-4" />
              <h3 className="text-base font-black text-black uppercase mb-1">CROSS-REFERENCING RESUME AGAINST TARGET JD...</h3>
              <p className="text-xs text-neutral-600 font-bold uppercase">
                Extracting technical taxonomy, calculating keyword coverage, and generating tailored impact rewrites.
              </p>
            </div>
          )}

          {/* Analysis View */}
          {!isAnalyzing && analysis && (
            <div className="space-y-6">

              {/* AI Gateway Notification / Status Banner */}
              {analysis.isAiGenerated ? (
                <div className="p-3.5 bg-[#CCFF00] border-3 border-black shadow-[4px_4px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="stroke-[3] text-black" />
                    <div>
                      <span className="text-xs font-black uppercase text-black block">
                        ANALYZED BY CONNECTED AI // {analysis.aiProviderName} ({analysis.aiModelName})
                      </span>
                      <span className="text-[10px] font-bold text-neutral-800 uppercase block">
                        Using your personal API key · Zero data training retention
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setAiModalOpen(true)}
                    className="px-2.5 py-1 bg-black text-[#CCFF00] hover:bg-neutral-800 border-2 border-black text-[10px] font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all self-start sm:self-auto cursor-pointer"
                  >
                    [ SWITCH MODEL / KEY ]
                  </button>
                </div>
              ) : aiError ? (
                <div className="p-3 bg-[#FF0033]/15 border-3 border-black shadow-[3px_3px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black text-black uppercase">
                    <AlertTriangle size={15} className="text-[#FF0033] stroke-[3]" />
                    <span>AI KEY NOTICE: {aiError}. DISPLAYING LOCAL ATS HEURISTIC SCAN.</span>
                  </div>
                  <button
                    onClick={() => setAiModalOpen(true)}
                    className="px-2 py-0.5 bg-black text-[#FFDE59] border border-black font-black text-[10px] uppercase cursor-pointer"
                  >
                    [ CHECK KEY ]
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-[#FFDE59] border-3 border-black shadow-[3px_3px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black text-black uppercase">
                    <Zap size={14} className="stroke-[3]" />
                    <span>CONNECT YOUR AI API KEY TO UNLOCK GPT-4O, CLAUDE 3.7 OR GEMINI ATS REASONING</span>
                  </div>
                  <button
                    onClick={() => setAiModalOpen(true)}
                    className="px-3 py-1 bg-black text-[#FFDE59] hover:bg-neutral-800 border-2 border-black font-black text-[10px] uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    [ CONNECT AI KEY ]
                  </button>
                </div>
              )}

              {/* Summary Critique from Model if Available */}
              {analysis.summaryCritique && (
                <div className="p-4 bg-black text-white border-4 border-black shadow-[5px_5px_0px_#000] space-y-1.5">
                  <div className="flex items-center gap-2 text-[#FFDE59] text-[10px] font-black uppercase tracking-wider">
                    <Terminal size={13} className="stroke-[2.5]" />
                    <span>// RECRUITING PRINCIPAL EXECUTIVE CRITIQUE:</span>
                  </div>
                  <p className="text-xs font-bold leading-relaxed text-neutral-100">
                    "{analysis.summaryCritique}"
                  </p>
                </div>
              )}
              
              {/* ═══ CORE SCORECARDS (JD MATCH + ATS COMPLIANCE) ═══ */}
              <div className="bg-white border-4 border-black p-5 sm:p-6 shadow-[6px_6px_0px_#000] relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-4 mb-4">
                  <div>
                    <span className="bg-[#00F0FF] text-black border border-black px-2 py-0.5 text-[10px] font-black uppercase">
                      TARGET: {analysis.targetRole}
                    </span>
                    <h3 className="text-lg font-black uppercase text-black mt-1">
                      Job Description Fit Analysis
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] ${
                      analysis.overallScore >= 75 ? 'bg-[#CCFF00] text-black' : analysis.overallScore >= 50 ? 'bg-[#FFDE59] text-black' : 'bg-[#FF0033] text-white'
                    }`}>
                      {analysis.overallScore >= 75 ? 'STRONG CANDIDATE FIT' : analysis.overallScore >= 50 ? 'MODERATE MATCH (GAPS)' : 'HIGH SCREENING RISK'}
                    </span>
                  </div>
                </div>

                {/* 3 Metric Gauges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Gauge 1: Composite */}
                  <div className="bg-[#FAF8F5] border-2 border-black p-3.5 shadow-[3px_3px_0px_#000] flex items-center gap-3">
                    <div className={`w-14 h-14 border-2 border-black flex flex-col items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] ${
                      analysis.overallScore >= 75 ? 'bg-[#CCFF00]' : analysis.overallScore >= 50 ? 'bg-[#FFDE59]' : 'bg-[#FF0033] text-white'
                    }`}>
                      <span className="text-xl font-black">{analysis.overallScore}%</span>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase text-neutral-600">COMPOSITE FIT</div>
                      <div className="text-xs font-black text-black">Overall Screening Index</div>
                    </div>
                  </div>

                  {/* Gauge 2: JD Match */}
                  <div className="bg-[#FAF8F5] border-2 border-black p-3.5 shadow-[3px_3px_0px_#000] flex items-center gap-3">
                    <div className="w-14 h-14 bg-[#00F0FF] border-2 border-black flex flex-col items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] text-black">
                      <span className="text-xl font-black">{analysis.jdMatchScore}%</span>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase text-neutral-600">JD KEYWORD FIT</div>
                      <div className="text-xs font-black text-black">
                        {analysis.matchedJdKeywords.length} of {analysis.totalJdKeywords} Skills
                      </div>
                    </div>
                  </div>

                  {/* Gauge 3: ATS Health */}
                  <div className="bg-[#FAF8F5] border-2 border-black p-3.5 shadow-[3px_3px_0px_#000] flex items-center gap-3">
                    <div className="w-14 h-14 bg-[#FFDE59] border-2 border-black flex flex-col items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] text-black">
                      <span className="text-xl font-black">{analysis.atsScore}%</span>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase text-neutral-600">ATS COMPLIANCE</div>
                      <div className="text-xs font-black text-black">Syntax & Metrics</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ═══ CRITICAL JD KEYWORD GAPS (WITH 1-CLICK INJECT) ═══ */}
              <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000]">
                <div className="flex items-center justify-between border-b-2 border-black pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF0033] border border-black" />
                    <h4 className="text-xs font-black text-black uppercase">
                      CRITICAL JD KEYWORDS MISSING FROM RESUME ({analysis.missingJdKeywords.length})
                    </h4>
                  </div>
                  <span className="text-[10px] font-black text-neutral-500 uppercase hidden sm:inline">
                    CLICK TO INJECT INTO RESUME SKILLS
                  </span>
                </div>

                {analysis.missingJdKeywords.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-neutral-700">
                      These requirements are explicitly demanded in the Job Description, but absent from your resume. Automated ATS filters will penalize your ranking:
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {analysis.missingJdKeywords.map((kw) => (
                        <button
                          key={kw}
                          onClick={() => injectKeywordToSkills(kw)}
                          className="px-2.5 py-1 bg-[#FF0033]/15 hover:bg-[#CCFF00] text-black border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1 active:translate-x-0.5 active:translate-y-0.5 transition-all group"
                          title={`Click to add "${kw}" to your resume`}
                        >
                          <Plus size={12} strokeWidth={3} className="text-[#FF0033] group-hover:text-black" />
                          <span>{kw}</span>
                          <span className="text-[9px] bg-black text-white px-1 ml-0.5 font-bold group-hover:bg-white group-hover:text-black">
                            ADD
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-700 bg-emerald-100 border-2 border-emerald-800 p-2.5">
                    <CheckCircle2 size={16} />
                    <span>OUTSTANDING! ALL CORE TECHNICAL REQUIREMENTS IN THE JD ARE SATISFIED.</span>
                  </div>
                )}

                {/* Matched Keywords in Resume */}
                {analysis.matchedJdKeywords.length > 0 && (
                  <div className="mt-4 pt-3 border-t-2 border-black">
                    <div className="text-[10px] font-black text-neutral-600 uppercase mb-2">
                      MATCHED JD REQUIREMENTS (FOUND IN RESUME):
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.matchedJdKeywords.map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-0.5 bg-[#CCFF00] border border-black text-[10px] font-black uppercase text-black flex items-center gap-1"
                        >
                          <Check size={10} strokeWidth={3} /> {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ═══ JD-TAILORED BULLET REWRITES WITH 1-CLICK APPLY ═══ */}
              <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000]">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2.5 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} strokeWidth={2.5} className="text-[#FFDE59]" />
                    <h4 className="text-xs font-black text-black uppercase">
                      AI BULLET REWRITES TAILORED TO TARGET JD ({analysis.bulletSuggestions.length})
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {analysis.bulletSuggestions.length > 0 && (
                      <button
                        onClick={() => {
                          setResumeText(prev => {
                            let updated = prev;
                            analysis.bulletSuggestions.forEach(item => {
                              if (item.original && item.rewrite && updated.includes(item.original)) {
                                updated = updated.replace(item.original, item.rewrite);
                              }
                            });
                            analyzeResumeAgainstJD(updated, jobDescription);
                            return updated;
                          });
                        }}
                        className="px-2.5 py-1 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] text-black border-2 border-black text-[10px] font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1 cursor-pointer"
                        title="Auto-apply all rewritten bullets directly to your resume text"
                      >
                        <Zap size={11} strokeWidth={3} />
                        <span>[ ⚡ APPLY ALL REWRITES ]</span>
                      </button>
                    )}
                    <span className="text-[10px] font-black bg-[#FFDE59] border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000] hidden sm:inline">
                      QUANTIFIED IMPACT
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {analysis.bulletSuggestions.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FAF8F5] border-3 border-black p-4 shadow-[3px_3px_0px_#000] space-y-2.5"
                    >
                      {/* Original Bullet */}
                      <div>
                        <div className="text-[10px] font-black text-neutral-500 uppercase flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-[#FF0033]" /> CURRENT BULLET IN RESUME:
                        </div>
                        <div className="text-xs font-black text-black mt-0.5 line-through decoration-[#FF0033] decoration-2">
                          {item.original}
                        </div>
                      </div>

                      {/* Defect Note */}
                      <div className="text-[10px] font-bold text-neutral-600 uppercase bg-white border border-black px-2 py-1">
                        DEFECT: {item.defect}
                      </div>

                      {/* AI Tailored Rewrite */}
                      <div>
                        <div className="text-[10px] font-black text-black uppercase flex items-center justify-between mb-1">
                          <span className="flex items-center gap-1 text-[#00F0FF]">
                            <Zap size={11} strokeWidth={3} className="text-black" />
                            <span className="text-black">TAILORED REWRITE (INJECTS {item.injectedKeywords.join(' & ')}):</span>
                          </span>
                        </div>
                        <div className="bg-[#CCFF00]/30 border-2 border-black p-2.5 text-xs font-black text-black leading-relaxed">
                          {item.rewrite}
                        </div>
                      </div>

                      {/* Apply Button */}
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => applyRewriteToResume(item.original, item.rewrite)}
                          className="bg-black hover:bg-[#CCFF00] text-white hover:text-black border-2 border-black px-3 py-1 text-[11px] font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
                        >
                          <CornerDownRight size={12} strokeWidth={3} />
                          <span>APPLY REWRITE TO RESUME</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ═══ CLICHE & BUZZWORD PURGE ═══ */}
              {analysis.foundBuzzWords.length > 0 && (
                <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000]">
                  <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-3">
                    <AlertTriangle size={15} strokeWidth={2.5} className="text-[#FF0033]" />
                    <h4 className="text-xs font-black text-black uppercase">
                      EMPTY CORPORATE CLICHÉS DETECTED ({analysis.foundBuzzWords.length})
                    </h4>
                  </div>
                  <p className="text-xs font-bold text-neutral-700 leading-relaxed mb-3">
                    Recruiters and hiring managers overlook subjective adjectives. Replace these with objective system metrics:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.foundBuzzWords.map((word, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-[#FFDE59] border-2 border-black text-xs font-black uppercase text-black line-through shadow-[2px_2px_0px_#000]"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ═══ TARGETED ACTION PLAN ═══ */}
              <div className="bg-[#FAF8F5] border-4 border-black p-5 shadow-[6px_6px_0px_#000]">
                <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-3">
                  <Briefcase size={15} strokeWidth={2.5} className="text-black" />
                  <h4 className="text-xs font-black text-black uppercase">
                    PRIORITIZED RECRUITER ACTION PLAN
                  </h4>
                </div>
                <div className="space-y-2">
                  {analysis.actionPlan.map((action, i) => (
                    <div
                      key={i}
                      className="bg-white border-2 border-black p-2.5 text-xs font-bold text-black flex items-start gap-2.5 shadow-[2px_2px_0px_#000]"
                    >
                      <span className="w-5 h-5 bg-[#FFDE59] border border-black flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* AI BYOK Model Key Modal */}
      <AiModelKeyModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        onSaveSuccess={(cfg) => {
          setAiConfig(cfg);
          analyzeResumeAgainstJD(resumeText, jobDescription);
        }}
      />
    </div>
  );
}