import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Mic, Users, Calendar, CheckCircle2,
  AlertTriangle, ArrowRight, Zap, Play, Pause, Sparkles,
  Target, RefreshCw, MessageSquare, Terminal, Shield,
  ExternalLink, ChevronRight, Check, X, Bell, Layers,
  PhoneCall, Kanban, ArrowUpRight
} from 'lucide-react';

export default function WarRoomExecutionPlatform({ teamMembers = [], onSyncTasksToSprint, onNavigateToTasks }) {
  const [isLiveListening, setIsLiveListening] = useState(true);
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' | 'followups' | 'rules'
  const [selectedMeeting, setSelectedMeeting] = useState('sprint-42');
  const [botNotification, setBotNotification] = useState(null);
  const [syncToast, setSyncToast] = useState(null);
  const [customDialogue, setCustomDialogue] = useState('');

  // Initial Real-time Conversation Stream
  const [dialogues, setDialogues] = useState([
    {
      id: 'd1',
      speaker: 'You (Founder & CEO)',
      role: 'CEO & Product Architect',
      avatar: 'Y',
      color: 'bg-[#FF8811]',
      time: '14:02:18',
      text: 'The enterprise pilot with ClimateCare goes live in 4 days. We cannot have dropped webhooks or unhandled race conditions on billing events. We need the idempotent Stripe webhook handler and retry dead-letter queue deployed before Friday 5 PM.',
      detectedTag: 'COMMITMENT IDENTIFIED // STRIPE PILOT',
      tagColor: 'bg-[#CCFF00] text-black',
      taskId: 't1'
    },
    {
      id: 'd2',
      speaker: 'Arjun M.',
      role: 'Lead Full-Stack & Systems',
      avatar: 'A',
      color: 'bg-[#00F0FF]',
      time: '14:05:40',
      text: 'Understood. I will write the Redis idempotency lock, wrap the webhook endpoint with exponential backoff retries, and deploy the worker to AWS by Thursday noon.',
      detectedTag: 'AUTO-ASSIGNED → ARJUN M. // DEADLINE: THU 12:00',
      tagColor: 'bg-[#FFDE59] text-black',
      taskId: 't1'
    },
    {
      id: 'd3',
      speaker: 'Priya K.',
      role: 'AI / ML Research Lead',
      avatar: 'P',
      color: 'bg-[#A78BFA]',
      time: '14:11:05',
      text: 'On the model inference side, 850ms per document is too slow for batch ingestion. I will quantize our Llama-3 8B feature extractor to 4-bit AWQ on vLLM by tomorrow 4 PM and send the benchmark latency report to the #dev-warroom channel.',
      detectedTag: 'AUTO-ASSIGNED → PRIYA K. // DEADLINE: TOMORROW 16:00',
      tagColor: 'bg-[#00F0FF] text-black',
      taskId: 't2'
    },
    {
      id: 'd4',
      speaker: 'You (Founder & CEO)',
      role: 'CEO & Product Architect',
      avatar: 'Y',
      color: 'bg-[#FF8811]',
      time: '14:16:30',
      text: 'Perfect. On my end, Sequoia requested our updated customer cohort retention metrics and ARR bridges. I will regenerate the financial model deck slides and email the partner link by Wednesday EOD.',
      detectedTag: 'AUTO-ASSIGNED → YOU // DEADLINE: WED EOD',
      tagColor: 'bg-[#FF52D9] text-black',
      taskId: 't3'
    },
    {
      id: 'd5',
      speaker: 'Arjun M.',
      role: 'Lead Full-Stack & Systems',
      avatar: 'A',
      color: 'bg-[#00F0FF]',
      time: '14:21:12',
      text: 'Also noting: the staging PostgreSQL connection pool hit 92% utilization during load tests. I will tune PgBouncer connection limits and add auto-kill idle transactions before Wednesday 11 AM.',
      detectedTag: 'AUTO-ASSIGNED → ARJUN M. // DEADLINE: WED 11:00',
      tagColor: 'bg-[#CCFF00] text-black',
      taskId: 't4'
    }
  ]);

  // Real-time Extracted Tasks from Conversation
  const [extractedTasks, setExtractedTasks] = useState([
    {
      id: 't1',
      title: 'Deploy Idempotent Stripe Webhook Handler & Redis Retry Queue',
      assignee: 'Arjun M.',
      assigneeRole: 'Lead Full-Stack & Systems',
      assigneeColor: 'bg-[#00F0FF]',
      deadline: 'Thursday, 12:00 PM UTC',
      deadlineRelative: 'In 18 hours',
      urgency: 'P0 CRITICAL',
      category: 'Engineering',
      status: 'In Queue',
      confidence: '99%',
      quote: 'Arjun M. at 14:05: "I will write the Redis idempotency lock, wrap the webhook endpoint with exponential backoff retries, and deploy the worker to AWS by Thursday noon."',
      followUps: [
        { time: 'T-6h (Tomorrow 06:00)', channel: 'Slack #dev-warroom', note: 'Auto-ping check on Redis lock tests', status: 'Scheduled' },
        { time: 'T-1h (Tomorrow 11:00)', channel: 'Calendar Blocker', note: 'Deployment verification checkpoint', status: 'Scheduled' },
        { time: 'T+0 (Tomorrow 12:00)', channel: 'GitHub Bot', note: 'Verify PR merged & healthcheck green; escalate if open', status: 'Scheduled' }
      ]
    },
    {
      id: 't2',
      title: 'Quantize Llama-3 8B to 4-bit AWQ on vLLM & Benchmark Latency',
      assignee: 'Priya K.',
      assigneeRole: 'AI / ML Research Lead',
      assigneeColor: 'bg-[#A78BFA]',
      deadline: 'Tomorrow, 4:00 PM UTC',
      deadlineRelative: 'In 22 hours',
      urgency: 'P0 CRITICAL',
      category: 'AI/ML',
      status: 'In Queue',
      confidence: '97%',
      quote: 'Priya K. at 14:11: "I will quantize our Llama-3 8B feature extractor to 4-bit AWQ on vLLM by tomorrow 4 PM and send the benchmark latency report..."',
      followUps: [
        { time: 'T-12h (Tonight 20:00)', channel: 'Discord #ai-cluster', note: 'Verify GPU cluster spot instance availability', status: 'Scheduled' },
        { time: 'T-2h (Tomorrow 14:00)', channel: 'Slack Bot DM', note: 'Automated prompt: "Hey Priya, benchmark charts ready for review?"', status: 'Scheduled' },
        { time: 'T+0 (Tomorrow 16:00)', channel: 'War Room Bot', note: 'Collect benchmark report & auto-post summary', status: 'Scheduled' }
      ]
    },
    {
      id: 't3',
      title: 'Regenerate Cohort Retention Financial Model & Email Sequoia Partner',
      assignee: 'You (Founder)',
      assigneeRole: 'CEO & Product Architect',
      assigneeColor: 'bg-[#FF8811]',
      deadline: 'Wednesday, 6:00 PM UTC',
      deadlineRelative: 'In 2 days',
      urgency: 'P1 HIGH',
      category: 'Fundraising',
      status: 'In Queue',
      confidence: '95%',
      quote: 'You at 14:16: "I will regenerate the financial model deck slides and email the partner link by Wednesday EOD."',
      followUps: [
        { time: 'T-24h (Tuesday 18:00)', channel: 'Telegram Bot', note: 'Automated reminder with Stripe ARR data exported', status: 'Scheduled' },
        { time: 'T-4h (Wednesday 14:00)', channel: 'Email Digest', note: 'Draft partner review packet ready in DocSend', status: 'Scheduled' }
      ]
    },
    {
      id: 't4',
      title: 'Tune PgBouncer Connection Limits & Add Idle Transaction Reaper',
      assignee: 'Arjun M.',
      assigneeRole: 'Lead Full-Stack & Systems',
      assigneeColor: 'bg-[#00F0FF]',
      deadline: 'Wednesday, 11:00 AM UTC',
      deadlineRelative: 'In 1.5 days',
      urgency: 'P1 HIGH',
      category: 'DevOps',
      status: 'In Queue',
      confidence: '98%',
      quote: 'Arjun M. at 14:21: "I will tune PgBouncer connection limits and add auto-kill idle transactions before Wednesday 11 AM."',
      followUps: [
        { time: 'T-18h (Tuesday 17:00)', channel: 'Datadog Alert Hook', note: 'Audit RDS metrics & staging load tests', status: 'Scheduled' },
        { time: 'T-1h (Wednesday 10:00)', channel: 'Slack Bot', note: 'Automated check-in on pgbouncer.ini config deployment', status: 'Scheduled' }
      ]
    }
  ]);

  // Bot Automation Rules State
  const [botRules, setBotRules] = useState([
    {
      id: 'r1',
      title: 'Proactive Check-In at T-24h / T-6h',
      desc: 'Autonomous bot pings owner via Slack/Discord DM asking if they need API keys, architecture reviews, or are blocked on dependencies before deadline.',
      enabled: true,
      channel: 'Slack & Discord'
    },
    {
      id: 'r2',
      title: 'Automated Code & Artifact Verification at T+0',
      desc: 'Monitors GitHub PRs, commits, or Figma links. Automatically marks tasks verified without human micro-management when matching commit is detected.',
      enabled: true,
      channel: 'GitHub Webhook'
    },
    {
      id: 'r3',
      title: 'P0 Deadline Breach Escalation',
      desc: 'If a P0 Critical task crosses its deadline without verified completion, bot automatically alerts the #founder-warroom channel with incident triage log.',
      enabled: true,
      channel: 'SMS & War Room Alert'
    },
    {
      id: 'r4',
      title: 'Instant Multi-Channel Execution Digest',
      desc: 'Upon meeting termination, automatically packages all extracted tasks and distributes customized action packets to Slack, Linear, and Notion.',
      enabled: true,
      channel: 'Notion & Linear'
    }
  ]);

  // Simulate Injecting a New Conversation Snippet in Real-time
  const handleInjectDialogue = (textToInject) => {
    const text = textToInject || customDialogue;
    if (!text.trim()) return;

    const lower = text.toLowerCase();
    let speaker = 'You (Founder & CEO)';
    let role = 'CEO & Product Architect';
    let avatar = 'Y';
    let color = 'bg-[#FF8811]';
    let assigned = 'You (Founder)';
    let assignedRole = 'CEO & Product Architect';
    let assignedColor = 'bg-[#FF8811]';

    if (lower.includes('arjun') || lower.startsWith('arjun:')) {
      speaker = 'Arjun M.';
      role = 'Lead Full-Stack & Systems';
      avatar = 'A';
      color = 'bg-[#00F0FF]';
      assigned = 'Arjun M.';
      assignedRole = 'Lead Full-Stack & Systems';
      assignedColor = 'bg-[#00F0FF]';
    } else if (lower.includes('priya') || lower.startsWith('priya:')) {
      speaker = 'Priya K.';
      role = 'AI / ML Research Lead';
      avatar = 'P';
      color = 'bg-[#A78BFA]';
      assigned = 'Priya K.';
      assignedRole = 'AI / ML Research Lead';
      assignedColor = 'bg-[#A78BFA]';
    }

    // Determine deadline
    let deadline = 'Friday, 5:00 PM UTC';
    let deadlineRel = 'In 3 days';
    if (lower.includes('tomorrow')) {
      deadline = 'Tomorrow, 5:00 PM UTC';
      deadlineRel = 'In 24 hours';
    } else if (lower.includes('thursday')) {
      deadline = 'Thursday, 3:00 PM UTC';
      deadlineRel = 'In 2 days';
    } else if (lower.includes('friday')) {
      deadline = 'Friday, 5:00 PM UTC';
      deadlineRel = 'In 3 days';
    } else if (lower.includes('tonight')) {
      deadline = 'Tonight, 9:00 PM UTC';
      deadlineRel = 'In 6 hours';
    }

    const cleanTitle = text
      .replace(/^(arjun:|priya:|you:)/i, '')
      .replace(/^(i will|i'll|we need to|please|can you)/i, '')
      .trim();

    const formattedTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);

    const newTaskId = `t-${Date.now()}`;

    const newDialogue = {
      id: `d-${Date.now()}`,
      speaker,
      role,
      avatar,
      color,
      time: new Date().toLocaleTimeString('en-GB'),
      text,
      detectedTag: `AUTO-ASSIGNED → ${assigned.toUpperCase()} // DEADLINE: ${deadlineRel.toUpperCase()}`,
      tagColor: 'bg-[#CCFF00] text-black',
      taskId: newTaskId
    };

    const newTask = {
      id: newTaskId,
      title: formattedTitle.length > 10 ? formattedTitle : `Implement: ${formattedTitle}`,
      assignee: assigned,
      assigneeRole: assignedRole,
      assigneeColor: assignedColor,
      deadline,
      deadlineRelative: deadlineRel,
      urgency: lower.includes('urgent') || lower.includes('critical') ? 'P0 CRITICAL' : 'P1 HIGH',
      category: lower.includes('model') || lower.includes('ai') ? 'AI/ML' : 'Engineering',
      status: 'In Queue',
      confidence: '98%',
      quote: `${speaker}: "${text}"`,
      followUps: [
        { time: 'T-12h Checkpoint', channel: 'Slack #dev-warroom', note: `Automated ping to verify progress on ${formattedTitle}`, status: 'Scheduled' },
        { time: 'T+0 Auto-Verify', channel: 'GitHub Webhook', note: 'Verify commit / PR status at deadline', status: 'Scheduled' }
      ]
    };

    setDialogues(prev => [...prev, newDialogue]);
    setExtractedTasks(prev => [newTask, ...prev]);
    setCustomDialogue('');

    // Trigger feedback banner
    setBotNotification({
      type: 'extracted',
      title: 'NEW TASK DETECTED & ASSIGNED',
      message: `Extracted: "${formattedTitle}" → Assigned to ${assigned} with deadline ${deadline}. Automated follow-ups scheduled.`
    });

    setTimeout(() => {
      setBotNotification(null);
    }, 5000);
  };

  // Test Follow-up Bot Ping
  const handleTestBotPing = (task) => {
    setBotNotification({
      type: 'ping',
      title: `AUTONOMOUS FOLLOW-UP DISPATCHED // ${task.assignee.toUpperCase()}`,
      message: `[Bot Alert Sent via Slack DM]: "Hey ${task.assignee} 👋 Automated check-in on '${task.title}' (Due ${task.deadlineRelative}). Are you blocked on any dependencies or reviews?"`
    });

    setTimeout(() => {
      setBotNotification(null);
    }, 6000);
  };

  // Sync Extracted Tasks to Sprint Board in FounderWorkspace
  const handleSyncToSprintBoard = () => {
    const formattedForWorkspace = extractedTasks.map((t, idx) => ({
      id: Date.now() + idx,
      title: t.title,
      status: 'To Do',
      priority: t.urgency.includes('P0') ? 'P0' : 'P1',
      category: t.category,
      assignee: t.assignee
    }));

    if (onSyncTasksToSprint) {
      onSyncTasksToSprint(formattedForWorkspace);
    }

    setSyncToast(`SUCCESS: ${extractedTasks.length} MEETING TASKS TRANSFERRED DIRECTLY TO SPRINT BOARD!`);
    setTimeout(() => {
      setSyncToast(null);
    }, 6000);
  };

  return (
    <div className="space-y-6 font-mono text-black">
      
      {/* ═══ 1. PLATFORM HERO & VALUE PROP ═══ */}
      <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000]">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b-4 border-black pb-6 mb-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] border-2 border-black text-black font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_#000]">
              <Zap size={14} className="stroke-[3]" />
              <span>[ WAR ROOM // MEETING-TO-EXECUTION PLATFORM ]</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-black tracking-tight leading-none">
              CONVERSATIONS
              <span className="inline-block bg-[#CCFF00] px-3 py-1 border-3 border-black shadow-[3px_3px_0px_#000] ml-2">
                → EXECUTION
              </span>
            </h2>

            <p className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wide max-w-3xl leading-relaxed">
              // INSTEAD OF PASSIVE MEETING SUMMARIES, WAR ROOM TRANSFORMS LIVE TEAM CONVERSATIONS INTO STRUCTURED TASKS, AUTO-ASSIGNS OWNERS, LOCKS STRICT DEADLINES, AND RUNS AUTONOMOUS MULTI-CHANNEL FOLLOW-UPS.
            </p>
          </div>

          {/* Quick Session Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0">
            <div className="p-3 bg-[#FBF9F5] border-2 border-black shadow-[2px_2px_0px_#000]">
              <div className="text-[10px] text-gray-600 font-bold uppercase">// DURATION</div>
              <div className="text-lg font-black text-black">28:42</div>
            </div>
            <div className="p-3 bg-[#FBF9F5] border-2 border-black shadow-[2px_2px_0px_#000]">
              <div className="text-[10px] text-gray-600 font-bold uppercase">// TASKS DETECTED</div>
              <div className="text-lg font-black text-blue-600">{extractedTasks.length} TASKS</div>
            </div>
            <div className="p-3 bg-[#FBF9F5] border-2 border-black shadow-[2px_2px_0px_#000]">
              <div className="text-[10px] text-gray-600 font-bold uppercase">// OWNERS ASSIGNED</div>
              <div className="text-lg font-black text-emerald-600">100%</div>
            </div>
            <div className="p-3 bg-[#FBF9F5] border-2 border-black shadow-[2px_2px_0px_#000]">
              <div className="text-[10px] text-gray-600 font-bold uppercase">// BOT FOLLOW-UPS</div>
              <div className="text-lg font-black text-purple-600">ACTIVE</div>
            </div>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsLiveListening(!isLiveListening)}
              className={`px-3.5 py-2 border-3 border-black font-black text-xs uppercase flex items-center gap-2 shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all ${
                isLiveListening ? 'bg-[#CCFF00] text-black' : 'bg-[#E2E8F0] text-gray-700'
              }`}
            >
              <span className={`w-2 h-2 border border-black ${isLiveListening ? 'bg-red-600 animate-pulse' : 'bg-gray-400'}`} />
              <span>{isLiveListening ? 'STREAM LISTENING: ACTIVE' : 'STREAM PAUSED'}</span>
            </button>

            <span className="hidden sm:inline-block text-xs font-bold text-gray-500 uppercase">
              // SESSION: SPRINT 42
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSyncToSprintBoard}
              className="flex-1 sm:flex-initial px-4 py-2 bg-[#FFDE59] hover:bg-black hover:text-[#FFDE59] border-3 border-black font-black text-xs uppercase flex items-center justify-center gap-2 shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Kanban size={14} className="stroke-[2.5]" />
              <span>[ SYNC ALL TO SPRINT KANBAN ]</span>
            </button>
          </div>
        </div>
      </div>

      {/* ═══ TOAST NOTIFICATIONS ═══ */}
      <AnimatePresence>
        {botNotification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-black text-[#FFDE59] border-4 border-black shadow-[6px_6px_0px_#000] flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#CCFF00] text-black border-2 border-black flex items-center justify-center shrink-0 font-black">
                🤖
              </div>
              <div>
                <div className="text-xs font-black uppercase text-[#CCFF00] tracking-wider mb-0.5">
                  [ {botNotification.title} ]
                </div>
                <div className="text-xs font-bold text-white uppercase leading-relaxed">
                  {botNotification.message}
                </div>
              </div>
            </div>
            <button onClick={() => setBotNotification(null)} className="p-1 hover:text-[#CCFF00]">
              <X size={16} />
            </button>
          </motion.div>
        )}

        {syncToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-[#CCFF00] text-black border-4 border-black shadow-[6px_6px_0px_#000] flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} className="stroke-[3]" />
              <span className="font-black text-xs uppercase">{syncToast}</span>
            </div>
            {onNavigateToTasks && (
              <button
                onClick={onNavigateToTasks}
                className="px-3 py-1 bg-black text-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] hover:bg-white hover:text-black transition-colors"
              >
                [ VIEW BOARD → ]
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ 2. MAIN TWO-COLUMN WORKSTATION ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ═══ LEFT COLUMN (5 COLS): REAL-TIME CONVERSATION STREAM ═══ */}
        <div className="lg:col-span-5 bg-white border-4 border-black shadow-[6px_6px_0px_#000] flex flex-col">
          
          {/* Stream Header & Waveform */}
          <div className="p-4 bg-black text-white border-b-4 border-black flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mic size={16} className="text-[#CCFF00]" />
              <span className="font-black text-xs uppercase text-[#FFDE59]">
                // LIVE MEETING STREAM TRANSCRIPT
              </span>
            </div>

            {/* Brutalist Audio Bars */}
            <div className="flex items-end gap-1 h-4">
              <span className={`w-1 bg-[#CCFF00] transition-all duration-150 ${isLiveListening ? 'h-4 animate-bounce' : 'h-1'}`} />
              <span className={`w-1 bg-[#00F0FF] transition-all duration-150 ${isLiveListening ? 'h-3 animate-pulse' : 'h-1'}`} />
              <span className={`w-1 bg-[#FF52D9] transition-all duration-150 ${isLiveListening ? 'h-4 animate-bounce' : 'h-1'}`} />
              <span className={`w-1 bg-[#FFDE59] transition-all duration-150 ${isLiveListening ? 'h-2 animate-pulse' : 'h-1'}`} />
            </div>
          </div>

          {/* Dialogue Feed */}
          <div className="p-4 md:p-5 space-y-4 max-h-[580px] overflow-y-auto custom-scrollbar bg-[#FBF9F5]">
            {dialogues.map((d) => (
              <div key={d.id} className="p-3.5 bg-white border-2 border-black shadow-[3px_3px_0px_#000] space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 ${d.color} border border-black flex items-center justify-center font-black text-xs text-black shadow-[1px_1px_0px_#000]`}>
                      {d.avatar}
                    </div>
                    <div>
                      <span className="font-black text-xs text-black uppercase">{d.speaker}</span>
                      <span className="text-[10px] text-gray-500 font-bold ml-1.5 hidden sm:inline">[{d.role}]</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500 font-bold">{d.time}</span>
                </div>

                <p className="text-xs text-black font-medium leading-relaxed bg-[#F0EDE6] p-2.5 border border-black">
                  "{d.text}"
                </p>

                {d.detectedTag && (
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className={`px-2 py-0.5 text-[9px] font-black uppercase border border-black shadow-[1px_1px_0px_#000] ${d.tagColor}`}>
                      ⚡ {d.detectedTag}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Speech / Dialogue Injection Tool */}
          <div className="p-4 bg-white border-t-4 border-black space-y-3">
            <div className="flex items-center justify-between text-xs font-black uppercase">
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" />
                SIMULATE DIALOGUE INPUT
              </span>
              <span className="text-[10px] text-gray-500">// AUTO-PARSES TASKS</span>
            </div>

            {/* Quick Speech Presets */}
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleInjectDialogue("Arjun: I will migrate our auth tokens to Redis cluster before Friday 2 PM.")}
                className="px-2 py-1 bg-[#F0EDE6] hover:bg-[#CCFF00] border border-black text-[10px] font-bold uppercase transition-colors"
              >
                + Arjun: Auth tokens (Fri 2 PM)
              </button>
              <button
                type="button"
                onClick={() => handleInjectDialogue("Priya: I will benchmark batch embeddings latency by tomorrow 5 PM.")}
                className="px-2 py-1 bg-[#F0EDE6] hover:bg-[#00F0FF] border border-black text-[10px] font-bold uppercase transition-colors"
              >
                + Priya: Batch embeddings (Tomorrow)
              </button>
              <button
                type="button"
                onClick={() => handleInjectDialogue("You: I will email the Sequoia diligence dataroom by Wednesday 8 PM.")}
                className="px-2 py-1 bg-[#F0EDE6] hover:bg-[#FFDE59] border border-black text-[10px] font-bold uppercase transition-colors"
              >
                + You: Sequoia dataroom (Wed)
              </button>
            </div>

            {/* Custom Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleInjectDialogue();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="TYPE OR PASTE SPEECH... E.G. 'ARJUN: WRITE TESTS BY FRIDAY 4PM'"
                value={customDialogue}
                onChange={(e) => setCustomDialogue(e.target.value)}
                className="flex-1 bg-[#F0EDE6] border-2 border-black px-3 py-2 text-xs font-bold uppercase placeholder:normal-case placeholder:text-gray-400 focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-black text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all shrink-0"
              >
                [ EXTRACT ]
              </button>
            </form>
          </div>
        </div>

        {/* ═══ RIGHT COLUMN (7 COLS): EXECUTION ENGINE & AUTO FOLLOW-UPS ═══ */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Sub-Tabs: Tasks vs Follow-ups vs Bot Rules */}
          <div className="grid grid-cols-3 gap-2 bg-[#F0EDE6] border-3 border-black p-1.5 shadow-[4px_4px_0px_#000]">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-2 px-2 sm:px-4 text-xs font-mono font-black uppercase transition-all ${
                activeTab === 'tasks'
                  ? 'bg-[#CCFF00] text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                  : 'bg-transparent text-gray-700 hover:text-black'
              }`}
            >
              [ EXTRACTED TASKS ({extractedTasks.length}) ]
            </button>
            <button
              onClick={() => setActiveTab('followups')}
              className={`py-2 px-2 sm:px-4 text-xs font-mono font-black uppercase transition-all ${
                activeTab === 'followups'
                  ? 'bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                  : 'bg-transparent text-gray-700 hover:text-black'
              }`}
            >
              [ FOLLOW-UP QUEUE (9) ]
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`py-2 px-2 sm:px-4 text-xs font-mono font-black uppercase transition-all ${
                activeTab === 'rules'
                  ? 'bg-[#FFDE59] text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                  : 'bg-transparent text-gray-700 hover:text-black'
              }`}
            >
              [ BOT RULES (4) ]
            </button>
          </div>

          {/* ═══ TAB 1: EXTRACTED TASKS PIPELINE ═══ */}
          {activeTab === 'tasks' && (
            <div className="space-y-4">
              {extractedTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] transition-all space-y-4"
                >
                  {/* Task Header: Badges & Confidence */}
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 border border-black text-[10px] font-black uppercase shadow-[1px_1px_0px_#000] ${
                        task.urgency.includes('P0') ? 'bg-[#FF0033] text-white' : 'bg-[#FF8811] text-black'
                      }`}>
                        {task.urgency}
                      </span>
                      <span className="px-2 py-0.5 bg-[#F0EDE6] border border-black text-[10px] font-black uppercase">
                        {task.category}
                      </span>
                      <span className="text-[10px] font-black text-gray-500 uppercase">
                        // {task.confidence} AI CONFIDENCE
                      </span>
                    </div>

                    <div className="px-2 py-0.5 bg-[#CCFF00] border border-black text-[10px] font-black uppercase flex items-center gap-1 shadow-[1px_1px_0px_#000]">
                      <CheckCircle2 size={11} className="stroke-[3]" />
                      <span>{task.status}</span>
                    </div>
                  </div>

                  {/* Task Title */}
                  <h3 className="text-base sm:text-lg font-black text-black uppercase tracking-tight leading-snug">
                    {task.title}
                  </h3>

                  {/* Origin Transcript Quote */}
                  <div className="text-xs text-gray-700 font-bold bg-[#FBF9F5] border-2 border-black p-2.5 leading-relaxed">
                    <span className="text-black font-black uppercase">// CONVERSATION SOURCE:</span> {task.quote}
                  </div>

                  {/* Owner & Deadline Two-Col Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-black uppercase">
                    {/* Owner */}
                    <div className="p-3 bg-[#F0EDE6] border-2 border-black flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-gray-600">// ASSIGNED OWNER</div>
                        <div className="text-black font-black mt-0.5">{task.assignee}</div>
                        <div className="text-[10px] text-gray-500 lowercase">{task.assigneeRole}</div>
                      </div>
                      <div className={`w-8 h-8 ${task.assigneeColor} border-2 border-black flex items-center justify-center text-sm font-black shadow-[1px_1px_0px_#000]`}>
                        {task.assignee.charAt(0)}
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="p-3 bg-[#F0EDE6] border-2 border-black flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-gray-600">// LOCKED DEADLINE</div>
                        <div className="text-black font-black mt-0.5">{task.deadline}</div>
                        <div className="text-[10px] text-red-600 font-black">⏳ {task.deadlineRelative}</div>
                      </div>
                      <div className="w-8 h-8 bg-black text-[#FFDE59] border-2 border-black flex items-center justify-center text-sm font-black shadow-[1px_1px_0px_#000]">
                        ⏰
                      </div>
                    </div>
                  </div>

                  {/* Automated Follow-Up Protocol */}
                  <div className="p-3 bg-white border-2 border-black space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-black flex items-center gap-1.5">
                      <Bell size={12} className="stroke-[3] text-purple-600" />
                      <span>AUTONOMOUS FOLLOW-UP PIPELINE:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] font-bold text-gray-700">
                      {task.followUps.map((f, i) => (
                        <div key={i} className="p-2 bg-[#FBF9F5] border border-black">
                          <div className="font-black text-black">{f.time}</div>
                          <div className="text-blue-700 font-black truncate">{f.channel}</div>
                          <div className="text-gray-600 truncate">{f.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Task Card Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t-2 border-black">
                    <button
                      onClick={() => handleTestBotPing(task)}
                      className="px-3 py-1.5 bg-white hover:bg-[#FFDE59] border-2 border-black font-black text-xs uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                    >
                      <Bell size={13} className="stroke-[2.5]" />
                      <span>[ 🔔 TEST BOT PING ]</span>
                    </button>

                    <button
                      onClick={() => {
                        if (onSyncTasksToSprint) {
                          onSyncTasksToSprint([{
                            id: Date.now(),
                            title: task.title,
                            status: 'To Do',
                            priority: task.urgency.includes('P0') ? 'P0' : 'P1',
                            category: task.category,
                            assignee: task.assignee
                          }]);
                        }
                        setSyncToast(`TASK "${task.title.substring(0, 30)}..." SYNCED TO SPRINT!`);
                        setTimeout(() => setSyncToast(null), 4000);
                      }}
                      className="px-3.5 py-1.5 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] border-2 border-black font-black text-xs uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                    >
                      <Kanban size={13} className="stroke-[2.5]" />
                      <span>[ SYNC TO SPRINT BOARD ]</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ═══ TAB 2: SCHEDULED FOLLOW-UP QUEUE ═══ */}
          {activeTab === 'followups' && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-5">
              <div className="flex items-center justify-between border-b-3 border-black pb-3">
                <div>
                  <h3 className="font-black text-base uppercase text-black">
                    AUTONOMOUS MULTI-CHANNEL FOLLOW-UP QUEUE
                  </h3>
                  <p className="text-xs text-gray-600 font-bold uppercase mt-0.5">
                    // WAR ROOM BOT SCHEDULES CHECKPOINTS AUTOMATICALLY WITHOUT FOUNDER MICROMANAGEMENT
                  </p>
                </div>
                <span className="px-2 py-1 bg-[#00F0FF] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                  9 QUEUED
                </span>
              </div>

              <div className="space-y-3">
                {extractedTasks.flatMap(t => t.followUps.map((f, i) => ({ ...f, taskTitle: t.title, owner: t.assignee, idx: `${t.id}-${i}` }))).map((item) => (
                  <div key={item.idx} className="p-3.5 bg-[#FBF9F5] border-2 border-black shadow-[3px_3px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 bg-black text-[#FFDE59] text-[10px] font-black uppercase">
                          {item.time}
                        </span>
                        <span className="px-2 py-0.5 bg-white border border-black text-[10px] font-black text-blue-700 uppercase">
                          {item.channel}
                        </span>
                        <span className="text-[10px] font-black text-gray-600 uppercase">
                          TARGET: {item.owner}
                        </span>
                      </div>
                      <div className="text-xs font-black text-black uppercase">
                        {item.taskTitle}
                      </div>
                      <div className="text-xs text-gray-700 font-bold">
                        → {item.note}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setBotNotification({
                          type: 'dispatched',
                          title: `FOLLOW-UP FIRED VIA ${item.channel.toUpperCase()}`,
                          message: `Alert dispatched to ${item.owner}: "${item.note}"`
                        });
                        setTimeout(() => setBotNotification(null), 5000);
                      }}
                      className="px-3 py-1.5 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] border-2 border-black font-black text-[11px] uppercase shrink-0 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                    >
                      [ FIRE NOW ]
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ TAB 3: BOT AUTOMATION RULES ═══ */}
          {activeTab === 'rules' && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-5">
              <div className="flex items-center justify-between border-b-3 border-black pb-3">
                <div>
                  <h3 className="font-black text-base uppercase text-black">
                    EXECUTION BOT AUTONOMY SETTINGS
                  </h3>
                  <p className="text-xs text-gray-600 font-bold uppercase mt-0.5">
                    // DEFINE HOW AGENTS AUTOMATICALLY FOLLOW UP, VERIFY COMMITS, AND ESCALATE DEADLINES
                  </p>
                </div>
                <span className="px-2 py-1 bg-[#FFDE59] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                  SYSTEM ACTIVE
                </span>
              </div>

              <div className="space-y-4">
                {botRules.map((rule) => (
                  <div key={rule.id} className="p-4 bg-[#FBF9F5] border-2 border-black shadow-[3px_3px_0px_#000] flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-black uppercase">{rule.title}</span>
                        <span className="px-1.5 py-0.5 bg-[#F0EDE6] border border-black text-[10px] font-black uppercase text-purple-700">
                          {rule.channel}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 font-bold uppercase leading-relaxed max-w-xl">
                        {rule.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setBotRules(prev => prev.map(r => r.id === rule.id ? { ...r, enabled: !r.enabled } : r));
                      }}
                      className={`px-3 py-1.5 border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] shrink-0 transition-colors ${
                        rule.enabled ? 'bg-[#CCFF00] text-black' : 'bg-gray-300 text-gray-700'
                      }`}
                    >
                      {rule.enabled ? '[ ENABLED ]' : '[ DISABLED ]'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
