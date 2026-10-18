import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Upload, Play, FileText, CheckCircle2,
  AlertTriangle, RotateCcw, ShieldCheck, Award, Users,
  Terminal, ArrowRight, Clock, Sparkles, Zap, BookOpen,
  Copy, Check, Plus, Search, Building2, Flame, ShieldAlert,
  Send, MessageSquare, HelpCircle, BarChart3
} from 'lucide-react';

// ─── 4 Curated Enterprise Process Blueprints ───────────────────────
const PRESET_PROCESSES = [
  {
    id: 'sop-incident',
    title: 'SOP-204: Production P0 Outage & Incident Commander Runbook',
    dept: 'Engineering / DevOps',
    difficulty: 'Critical Crisis Drill',
    description: 'Protocol for triaging cloud infrastructure outages, database locks, customer communication, and post-mortem SLA reporting.',
    sopContent: `// SOP-204: P0 PRODUCTION OUTAGE & INCIDENT COMMANDER RUNBOOK
1. CLASSIFICATION: Any failure affecting >2% of active API traffic or customer payment processing is immediately classified as P0.
2. INCIDENT COMMANDER (IC): The first responding senior engineer assumes the IC role and must assign: Operations Lead, Communications Lead.
3. COMM CHANNEL: Open #incident-p0-live in Slack and establish a live voice bridge within 3 minutes of alert.
4. STATUSPAGE UPDATE: Within 10 minutes of alert, post initial acknowledgment to status.hypers.io ("Investigating elevated error rates"). Never give ETAs on initial post.
5. ISOLATION OVER ROLLBACK: Attempt read-replica traffic diversion first. If database deadlock persists for >5 minutes, initiate rollback to previous green deployment.
6. STAKEHOLDER MANAGEMENT: Do not address customer DMs directly; funnel all external inquiries to support lead using pre-approved template C-1.
7. POST-MORTEM: Root cause analysis document (RCA) must be published internally within 24 hours of resolution.`,
    simulation: {
      title: 'P0 DATABASE DEADLOCK & CHECKOUT CASSEROLE COLLAPSE',
      stakeholder: {
        name: 'Arjun Mehta (VP of Engineering)',
        role: 'Executive Stakeholder',
        avatarBg: 'bg-[#FF5722]',
        status: 'ANXIOUS // SEEKING IMMEDIATE ANSWER'
      },
      scenarioIntro: '02:14 AM: PagerDuty triggers a P0 alert: Global API error rate spikes to 34%. Over 4,200 checkout requests are failing per minute. Customers are tweeting screenshot errors.',
      stages: [
        {
          stageNum: 1,
          prompt: 'Arjun (VP Eng) rushes into the bridge: "What is the blast radius? We have 14 tier-1 enterprise accounts failing transactions right now. What is your first action?"',
          options: [
            {
              id: 'a',
              text: 'SSH directly into production primary DB and kill all long-running queries immediately.',
              isBest: false,
              penalty: 30,
              stressDelta: 25,
              feedback: '❌ CRITICAL SOP BREACH: SOP Section 5 forbids unmonitored raw production query termination without replica isolation. You risk database table corruption!'
            },
            {
              id: 'b',
              text: 'Declare myself Incident Commander in #incident-p0-live, designate Ops & Comms leads, and initiate traffic shift to Read Replica.',
              isBest: true,
              penalty: 0,
              stressDelta: -15,
              feedback: '✅ PERFECT ADHERENCE: Follows SOP Sections 2 & 5. Established command hierarchy and prioritized traffic isolation over risky live edits.'
            },
            {
              id: 'c',
              text: 'Post on X/Twitter and reply to angry customers promising full restoration in 15 minutes.',
              isBest: false,
              penalty: 25,
              stressDelta: 20,
              feedback: '❌ SEVERE POLICY VIOLATION: SOP Section 4 & 6 strictly prohibits promising speculative ETAs or answering social media without comms lead.'
            }
          ]
        },
        {
          stageNum: 2,
          prompt: 'Traffic is partially diverted, but deadlock persists on the primary cluster. The 10-minute SLA for public status update is in 90 seconds. Customer Success lead asks what to post.',
          options: [
            {
              id: 'a',
              text: 'Post standard template: "We are actively investigating elevated API latency and checkout timeouts across US-East."',
              isBest: true,
              penalty: 0,
              stressDelta: -10,
              feedback: '✅ FLAWLESS EXECUTION: Complies with SOP Section 4. Neutral, accurate acknowledgment posted within the 10-minute mandatory window without false ETAs.'
            },
            {
              id: 'b',
              text: 'Delay posting until we have confirmed the exact line of bad code that caused the deadlock.',
              isBest: false,
              penalty: 20,
              stressDelta: 15,
              feedback: '❌ MISSED SLA: SOP Section 4 mandates public update within 10 minutes regardless of root cause confirmation.'
            },
            {
              id: 'c',
              text: 'Publish: "AWS RDS outage is out of our control, please contact Amazon Support."',
              isBest: false,
              penalty: 35,
              stressDelta: 30,
              feedback: '❌ BLAME SHIFTING VIOLATION: Blaming external providers publicly without verification damages enterprise brand trust and violates company comms policy.'
            }
          ]
        },
        {
          stageNum: 3,
          prompt: 'Deadlock trace confirms a schema migration script deployed 15 mins prior is holding an exclusive table lock. Database CPU is at 98%.',
          options: [
            {
              id: 'a',
              text: 'Initiate automated rollback to previous green deployment container and rollback the pending migration lock.',
              isBest: true,
              penalty: 0,
              stressDelta: -25,
              feedback: '✅ INCIDENT RESOLVED: Exactly matches SOP Section 5 (>5 min deadlock trigger for green rollback). Traffic normalizes immediately.'
            },
            {
              id: 'b',
              text: 'Leave it running; migrations usually finish in 30 minutes anyway.',
              isBest: false,
              penalty: 40,
              stressDelta: 35,
              feedback: '❌ CATASTROPHIC INACTION: Allowing an active deadlock to continue during peak checkout volume costs an estimated $42,000/min in lost GMV.'
            },
            {
              id: 'c',
              text: 'Reboot the primary database server instance with a hard restart.',
              isBest: false,
              penalty: 30,
              stressDelta: 25,
              feedback: '❌ UNNECESSARY RISK: Hard restart drops active in-flight transactions and risks write-ahead-log corruption.'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'sop-sales-objection',
    title: 'SOP-102: Enterprise Procurement & 50% Discount Defense Playbook',
    dept: 'Enterprise Sales / SDR',
    difficulty: 'Commercial Negotiation',
    description: 'Framework for holding firm pricing, trading concessions, defending value, and navigating late-stage enterprise procurement traps.',
    sopContent: `// SOP-102: ENTERPRISE PROCUREMENT DISCOUNT DEFENSE PLAYBOOK
1. NO UNILATERAL CONCESSIONS: Never discount annual license price without receiving a tangible business concession in return (e.g., multi-year commitment, upfront payment, co-marketing case study).
2. TIERED DISCOUNT THRESHOLDS: Account Executives have 0% unilateral discount authority. Standard pricing holds until Procurement presents verified competitor RFP comparison.
3. CONCESSION TRADING MATRIX:
   - If buyer asks for 15% discount -> Request 2-year upfront commitment + quarterly logo case study.
   - If buyer asks for 30% discount -> Escalate to VP Sales with proof of competitor quote and offer phased user roll-out.
4. UNLIMITED LIABILITY CLAUSE: Hypers never signs uncapped indemnification or mutual gross negligence waivers without Legal Counsel sign-off.
5. CLOSING URGENCY: Never use arbitrary "end of month" fake discounts. Ground urgency strictly in customer implementation timelines and ROI milestones.`,
    simulation: {
      title: 'LATE-STAGE PROCUREMENT SHOWDOWN: $180K ACV AT RISK',
      stakeholder: {
        name: 'Rachel Vance (Chief Procurement Officer, FinTech Corp)',
        role: 'Enterprise Buyer Gatekeeper',
        avatarBg: 'bg-[#9C27B0]',
        status: 'HARD-BARGAINING // ATTEMPTING PRICE SQUEEZE'
      },
      scenarioIntro: 'Final negotiation call for a $180,000/year contract covering 500 seats. Rachel Vance from Procurement enters the call with 3 procurement analysts.',
      stages: [
        {
          stageNum: 1,
          prompt: 'Rachel Vance: "We love your engineering tools, but our CFO refuses to sign unless you reduce your annual price by 35% across the board and match our standard net-90 payment terms. Otherwise we stay with our legacy provider."',
          options: [
            {
              id: 'a',
              text: 'Immediately agree: "We want your partnership, so I can do 35% off if you sign today."',
              isBest: false,
              penalty: 40,
              stressDelta: 20,
              feedback: '❌ MASSIVE MARGIN COLLAPSE: Violated SOP Rule 1 & 2. Gave away $63,000/year in ARR with zero concessions in return.'
            },
            {
              id: 'b',
              text: 'Defend value with Concession Trading: "We cannot do unilateral price cuts. If budget is constrained, we can explore 15% in exchange for a 2-year upfront commitment, Net-30 terms, and a joint public case study."',
              isBest: true,
              penalty: 0,
              stressDelta: -15,
              feedback: '✅ MASTERFUL NEGOTIATION: Followed SOP Section 1 & 3. Held firm on value while offering structured tradeable concessions.'
            },
            {
              id: 'c',
              text: 'Get defensive: "Your legacy provider has outdated technology and our software is way better, you will regret staying."',
              isBest: false,
              penalty: 25,
              stressDelta: 25,
              feedback: '❌ UNPROFESSIONAL POSTURING: Bad-mouthing legacy tools antagonizes procurement and violates enterprise consultative sales standards.'
            }
          ]
        },
        {
          stageNum: 2,
          prompt: 'Rachel nods slowly: "Okay, we can discuss the 2-year term. But our legal team requires uncapped mutual indemnification liability for any data incidents, or this is a complete deal-breaker."',
          options: [
            {
              id: 'a',
              text: 'State policy clearly: "Our standard enterprise terms cap liability at 2x annual contract value. Uncapped liability requires formal General Counsel review and would require mutual security audits."',
              isBest: true,
              penalty: 0,
              stressDelta: -10,
              feedback: '✅ CONTRACT HYGIENE PROTECTED: Complies with SOP Rule 4. Protected the company from catastrophic open-ended legal exposure.'
            },
            {
              id: 'b',
              text: 'Sign off on uncapped liability to get the deal closed this quarter.',
              isBest: false,
              penalty: 45,
              stressDelta: 30,
              feedback: '❌ DANGEROUS LEGAL BREACH: SOP Section 4 forbids uncapped liability. One single third-party breach could bankrupt the company!'
            },
            {
              id: 'c',
              text: 'Tell them to take it or leave it, we don\'t do enterprise legal changes.',
              isBest: false,
              penalty: 20,
              stressDelta: 15,
              feedback: '❌ BLUNT OPPOSITION: Enterprise deals routinely negotiate liability caps; an outright refusal stalls viable negotiations.'
            }
          ]
        },
        {
          stageNum: 3,
          prompt: 'Rachel looks at her team: "If you give us Net-45 and add 10 complimentary sandbox developer seats for our QA team, we will sign the 2-year $320K agreement by Friday."',
          options: [
            {
              id: 'a',
              text: 'Accept the balanced trade: "We have an agreement. 10 sandbox seats are approved, Net-45 locked in, and contract circulating for signature today."',
              isBest: true,
              penalty: 0,
              stressDelta: -20,
              feedback: '✅ DEAL CLOSED AT FULL STRENGTH: Successfully closed a 2-year $320,000 multi-year contract while protecting enterprise unit economics!'
            },
            {
              id: 'b',
              text: 'Push for even more: demand that they pay 100% upfront within 24 hours or the deal is canceled.',
              isBest: false,
              penalty: 25,
              stressDelta: 25,
              feedback: '❌ OVER-AGGRESSIVE DEAL FATIGUE: Jeopardized a locked $320K enterprise agreement at the 1-yard line with unnecessary hostility.'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'sop-customer-churn',
    title: 'SOP-301: Enterprise Tier-1 Churn Threat & Escalation Protocol',
    dept: 'Customer Success / Support',
    difficulty: 'Retention & Account Salvage',
    description: 'Step-by-step triage when a $50k+ ARR client threatens contract termination over product downtime or service failures.',
    sopContent: `// SOP-301: TIER-1 CHURN THREAT & ACCOUNT SALVAGE
1. IMMEDIATE ESCALATION: Any written or verbal threat of termination by an account >$30,000 ARR must be escalated to Head of CS within 30 minutes.
2. EMPATHY FIRST, DEFENSE NEVER: Never argue with the customer during the escalation triage. Acknowledge emotional frustration before addressing technical specifics.
3. EXECUTIVE SPONSORSHIP: Offer an immediate 1-on-1 technical review with the VP of Engineering or Chief Product Officer within 24 hours.
4. REMEDIATION ROADMAP: Deliver a written RCA (Root Cause Analysis) with committed engineering milestone tickets within 48 hours.
5. FINANCIAL CREDITS: CS managers are authorized to offer up to 1 month of SLA service credits. Never offer arbitrary cash refunds without CFO approval.`,
    simulation: {
      title: 'ANGRY VP OF PRODUCT THREATENS TO RIP & REPLACE HYPERS',
      stakeholder: {
        name: 'David Sterling (VP of Tech, Global Logistics Corp)',
        role: 'At-Risk Enterprise Champion',
        avatarBg: 'bg-[#FF0033]',
        status: 'FURIOUS // READY TO TERMINATE'
      },
      scenarioIntro: 'David Sterling ($85,000 ARR client) emails: "Hypers went down for 45 minutes during our peak delivery shift. My team wants to terminate our contract immediately. I want answers on Zoom NOW."',
      stages: [
        {
          stageNum: 1,
          prompt: 'David joins the call visibly enraged: "We lost $60,000 in scheduled shipments today because your webhook sync stalled out! Why should I not cancel our contract right this second?"',
          options: [
            {
              id: 'a',
              text: 'Lead with extreme ownership & empathy: "David, you are 100% justified in your frustration. Losing delivery shipments is completely unacceptable, and I am not here to make excuses. I am here to walk you through our root cause fix and protect your team."',
              isBest: true,
              penalty: 0,
              stressDelta: -20,
              feedback: '✅ PERFECT CS EMPATHY: SOP Section 2. Diffused emotional hostility immediately by validating their business pain without defensive rationalization.'
            },
            {
              id: 'b',
              text: 'Point to the SLA contract: "According to Section 8 of our terms of service, we maintain 99.5% uptime which allows for 45 minutes of monthly maintenance."',
              isBest: false,
              penalty: 45,
              stressDelta: 35,
              feedback: '❌ FATAL CS ERROR: Quoting legal uptime percentages to an enterprise leader whose business just lost $60,000 guarantees contract churn.'
            },
            {
              id: 'c',
              text: 'Offer immediate $50,000 cash refund on the spot to make them happy.',
              isBest: false,
              penalty: 35,
              stressDelta: 10,
              feedback: '❌ UNAUTHORIZED FINANCIAL PROMISE: SOP Section 5 forbids arbitrary cash refunds without CFO review; limits CS to SLA service credits.'
            }
          ]
        },
        {
          stageNum: 2,
          prompt: 'David softens slightly: "Fine. But how do I know this won\'t happen again next week? My CEO is asking for heads on this."',
          options: [
            {
              id: 'a',
              text: 'Commit to Executive Review + 48-Hour Technical RCA: "I am booking a direct technical briefing with our VP of Eng tomorrow at 10 AM, and we will deliver a formal written RCA with hard code patches within 48 hours."',
              isBest: true,
              penalty: 0,
              stressDelta: -15,
              feedback: '✅ EXACT PROTOCOL ADHERENCE: Complies with SOP Sections 3 & 4. Provided concrete executive accountability and structured timeline.'
            },
            {
              id: 'b',
              text: 'Promise that bugs will never happen again in the software.',
              isBest: false,
              penalty: 30,
              stressDelta: 15,
              feedback: '❌ UNREALISTIC COMMITMENT: Promising zero future bugs destroys credibility with technical enterprise executives.'
            }
          ]
        },
        {
          stageNum: 3,
          prompt: 'David: "We need compensation for the downtime. What are you prepared to offer on this invoice?"',
          options: [
            {
              id: 'a',
              text: 'Apply 1-Month SLA Service Credit: "Under our enterprise SLA guarantee, I am immediately applying a full 1-month service credit ($7,083) to your upcoming quarterly renewal."',
              isBest: true,
              penalty: 0,
              stressDelta: -20,
              feedback: '✅ ACCOUNT PRESERVED: Follows SOP Rule 5. The customer feels respected, SLA credits are applied cleanly, and the $85k contract is saved!'
            },
            {
              id: 'b',
              text: 'Tell them they have to file a written claim via certified mail to get any compensation.',
              isBest: false,
              penalty: 35,
              stressDelta: 25,
              feedback: '❌ BUREAUCRATIC OBSTRUCTION: Creating procedural roadblocks during high-churn moments triggers instant customer legal escalation.'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'sop-security-breach',
    title: 'SOP-408: Leaked API Keys & Security Incident Containment Protocol',
    dept: 'Cybersecurity / Compliance',
    difficulty: 'High-Stakes Security Breach',
    description: 'Emergency isolation and containment workflow when an engineer accidentally leaks production credentials or database secrets publicly.',
    sopContent: `// SOP-408: LEAKED CREDENTIALS & TOKEN COMPROMISE PROTOCOL
1. IMMEDIATE REVOCATION: The compromised API token, OAuth credential, or private key must be revoked within 120 seconds of discovery.
2. ROTATION & DEPENDENCY AUDIT: Re-issue new credentials and update cloud secrets vault (AWS Secrets Manager / Vault).
3. AUDIT LOG DUMP: Query CloudTrail and access logs for the exact token ID for the preceding 72 hours to identify any unauthorized data extraction.
4. QUARANTINE: If unauthorized IP addresses accessed sensitive PII or financial records, isolate affected database tables to read-only mode immediately.
5. REGULATORY NOTIFICATION: Do not contact external press or users without CISO and Legal Counsel authorization.`,
    simulation: {
      title: 'EMERGENCY: PRODUCTION DATABASE SECRET LEAKED ON PUBLIC GITHUB',
      stakeholder: {
        name: 'Elena Rostova (Chief Information Security Officer)',
        role: 'Incident Reviewer',
        avatarBg: 'bg-[#00F0FF]',
        status: 'HIGH ALERT // BREACH CONTAINMENT'
      },
      scenarioIntro: 'GitGuardian bot triggers an emergency ping: A junior frontend engineer accidentally committed a production Supabase Service Role key with full DB bypass into a public GitHub demo repository.',
      stages: [
        {
          stageNum: 1,
          prompt: 'Elena (CISO) joins the emergency room: "The secret has been public on GitHub for 18 minutes. What is step number one?"',
          options: [
            {
              id: 'a',
              text: 'Immediately invalidate and revoke the Service Role Secret in the cloud dashboard, killing all active connections authenticated with it.',
              isBest: true,
              penalty: 0,
              stressDelta: -20,
              feedback: '✅ ESSENTIAL FIRST ACTION: Complies with SOP Rule 1. Revoking compromised credentials immediately stops any adversary in progress.'
            },
            {
              id: 'b',
              text: 'Make the GitHub repository private and hope no bots scraped the commit history.',
              isBest: false,
              penalty: 50,
              stressDelta: 40,
              feedback: '❌ CATASTROPHIC SECURITY ERROR: Public GitHub repos are scraped by automated botnets within 3 seconds. Making it private leaves the key 100% active!'
            },
            {
              id: 'c',
              text: 'Send a Slack message to the junior engineer asking why they did that.',
              isBest: false,
              penalty: 35,
              stressDelta: 25,
              feedback: '❌ WRONG PRIORITIZATION: Investigating blame while production credentials remain live compromises company infrastructure.'
            }
          ]
        },
        {
          stageNum: 2,
          prompt: 'The token is revoked. A new key is generated and injected into the secrets manager. Elena: "Now we need to assess blast radius. What do you inspect?"',
          options: [
            {
              id: 'a',
              text: 'Extract CloudTrail & database connection logs for the compromised key ID over the past 72 hours to identify unknown IP addresses.',
              isBest: true,
              penalty: 0,
              stressDelta: -15,
              feedback: '✅ RIGOROUS AUDIT: Follows SOP Rule 3. Verifies if malicious actors downloaded data or if the key was unused prior to discovery.'
            },
            {
              id: 'b',
              text: 'Assume that since the app is still working, nobody noticed the leak.',
              isBest: false,
              penalty: 45,
              stressDelta: 30,
              feedback: '❌ BLIND ASSUMPTION: Attackers quietly siphon user databases without crashing servers. Forensic audit is mandatory under SOC2.'
            }
          ]
        },
        {
          stageNum: 3,
          prompt: 'Log audit shows 1 foreign IP address from Eastern Europe made 4 SELECT queries against the billing table before the key was revoked. What is the protocol?',
          options: [
            {
              id: 'a',
              text: 'Escalate to CISO & Legal Counsel for formal breach disclosure classification and preserve forensic audit hashes.',
              isBest: true,
              penalty: 0,
              stressDelta: -20,
              feedback: '✅ FLAWLESS COMPLIANCE: Complies with SOP Rule 5. Preserved legal chain of custody and avoided improper unauthorized disclosures.'
            },
            {
              id: 'b',
              text: 'Delete the database logs so security auditors don\'t see the breach during our next SOC2 audit.',
              isBest: false,
              penalty: 50,
              stressDelta: 50,
              feedback: '❌ CRIMINAL TAMPERING: Tampering with audit logs during a security breach violates federal regulations and leads to immediate company shutdown.'
            }
          ]
        }
      ]
    }
  }
];

export default function EmployeeTrainingSimulator({ companyData, teamMembers }) {
  // Navigation tabs: 'upload' | 'sandbox' | 'cohort' | 'library'
  const [activeTab, setActiveTab] = useState('sandbox');
  
  // Active selected process
  const [selectedProcess, setSelectedProcess] = useState(PRESET_PROCESSES[0]);

  // Upload/create process state
  const [customTitle, setCustomTitle] = useState('');
  const [customDept, setCustomDept] = useState('Engineering / DevOps');
  const [customDifficulty, setCustomDifficulty] = useState('Intermediate Onboarding');
  const [customContent, setCustomContent] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);
  const [compileStageText, setCompileStageText] = useState('');
  const [compileSuccessToast, setCompileSuccessToast] = useState(false);

  // Simulation Sandbox state
  const [simStageIndex, setSimStageIndex] = useState(0);
  const [simScore, setSimScore] = useState(100);
  const [simStress, setSimStress] = useState(30);
  const [simHistory, setSimHistory] = useState([]);
  const [simComplete, setSimComplete] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [feedbackItem, setFeedbackItem] = useState(null);
  const [customActionText, setCustomActionText] = useState('');
  const [certificateCopied, setCertificateCopied] = useState(false);

  // Cohort tracker state
  const [cohortMembers, setCohortMembers] = useState([
    {
      id: 1,
      name: 'Alex Rivera',
      role: 'Junior Site Reliability Engineer',
      assignedSOP: 'SOP-204: Production P0 Outage Runbook',
      status: 'In Progress (Stage 2/3)',
      score: 88,
      readiness: 'TRAINING',
      avatarBg: 'bg-[#FFDE59]'
    },
    {
      id: 2,
      name: 'Chloe Chen',
      role: 'SDR / Enterprise Sales Associate',
      assignedSOP: 'SOP-102: Enterprise Procurement Discount Defense',
      status: 'Certified (Completed)',
      score: 96,
      readiness: 'PRODUCTION READY',
      avatarBg: 'bg-[#CCFF00]'
    },
    {
      id: 3,
      name: 'Marcus Vance',
      role: 'Customer Support Lead',
      assignedSOP: 'SOP-301: Enterprise Tier-1 Churn Threat Protocol',
      status: 'Needs Retake',
      score: 64,
      readiness: 'NEEDS COACHING',
      avatarBg: 'bg-[#FF0033]'
    }
  ]);

  // Reset or initialize simulation whenever selected process changes
  const startSimulation = (processItem) => {
    setSelectedProcess(processItem);
    setSimStageIndex(0);
    setSimScore(100);
    setSimStress(25);
    setSimHistory([]);
    setSimComplete(false);
    setSelectedOptionId(null);
    setFeedbackItem(null);
    setCustomActionText('');
    setActiveTab('sandbox');
  };

  // Compile uploaded custom SOP into an active AI simulation
  const handleCompileCustomProcess = (e) => {
    e.preventDefault();
    if (!customTitle.trim() || !customContent.trim()) return;

    setIsCompiling(true);
    setCompileProgress(10);

    const stages = [
      { text: '01 // PARSING PROCESS STEP HIERARCHY & DECISION CONSTRAINTS...', progress: 30 },
      { text: '02 // SYNTHESIZING ADVERSARIAL STAKEHOLDER ARCHETYPES...', progress: 60 },
      { text: '03 // GENERATING BRANCHING INCIDENT SCENARIOS & STRESS TRIGGERS...', progress: 85 },
      { text: '04 // INJECTING COMPLIANCE CHECKPOINTS & SCORING MATRICES...', progress: 100 }
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < stages.length) {
        setCompileStageText(stages[step].text);
        setCompileProgress(stages[step].progress);
        step++;
      } else {
        clearInterval(interval);
        setIsCompiling(false);

        // Create new synthesized process
        const newProc = {
          id: `custom-${Date.now()}`,
          title: customTitle,
          dept: customDept,
          difficulty: customDifficulty,
          description: `Custom simulation dynamically generated from company SOP: ${customTitle}`,
          sopContent: customContent,
          simulation: {
            title: `SIMULATION DRILL: ${customTitle.toUpperCase()}`,
            stakeholder: {
              name: 'Executive Auditor / Senior Lead',
              role: 'Simulation Evaluator',
              avatarBg: 'bg-[#00F0FF]',
              status: 'DRILL ACTIVE // EVALUATING NEW HIRE'
            },
            scenarioIntro: `Live training drill for: "${customTitle}". A high-stakes operational event has occurred that tests the exact procedures documented in this SOP.`,
            stages: [
              {
                stageNum: 1,
                prompt: `Phase 1: An initial operational anomaly occurs related to ${customTitle}. A team member asks: "We have an active edge case. Do we follow our baseline protocol or bypass steps to save time?"`,
                options: [
                  {
                    id: 'a',
                    text: `Follow the strict verified steps outlined in "${customTitle}" and document the action log.`,
                    isBest: true,
                    penalty: 0,
                    stressDelta: -15,
                    feedback: `✅ EXACT COMPLIANCE: Adhered directly to the uploaded SOP guidelines without skipping verification checks.`
                  },
                  {
                    id: 'b',
                    text: 'Bypass the protocol to speed up delivery, assuming nothing will break.',
                    isBest: false,
                    penalty: 35,
                    stressDelta: 30,
                    feedback: `❌ PROCESS DEVIATION: Skipping documented verification steps leads to compounding downstream failures.`
                  }
                ]
              },
              {
                stageNum: 2,
                prompt: `Phase 2: Escalation point. External stakeholders are demanding status updates while the operational task is being resolved. What is your communication cadence?`,
                options: [
                  {
                    id: 'a',
                    text: 'Send pre-approved status template acknowledging the situation and provide next scheduled check-in time.',
                    isBest: true,
                    penalty: 0,
                    stressDelta: -10,
                    feedback: `✅ PROFESSIONAL CADENCE: Maintained stakeholder calm and followed documented communication governance.`
                  },
                  {
                    id: 'b',
                    text: 'Ignore stakeholders until everything is 100% finished so you aren\'t distracted.',
                    isBest: false,
                    penalty: 25,
                    stressDelta: 20,
                    feedback: `❌ COMMUNICATION BLACKOUT: Radio silence during operational incidents panics leadership and creates unnecessary escalations.`
                  }
                ]
              }
            ]
          }
        };

        PRESET_PROCESSES.unshift(newProc);
        setSelectedProcess(newProc);
        setCompileSuccessToast(true);
        setTimeout(() => setCompileSuccessToast(false), 4000);
        startSimulation(newProc);
      }
    }, 700);
  };

  // Handle choice submission in simulation
  const handleSelectOption = (option) => {
    if (selectedOptionId !== null) return; // Prevent double click
    setSelectedOptionId(option.id);
    setFeedbackItem(option);

    const currentStage = selectedProcess.simulation.stages[simStageIndex];

    const newScore = Math.max(0, simScore - option.penalty);
    const newStress = Math.min(100, Math.max(0, simStress + option.stressDelta));

    setSimScore(newScore);
    setSimStress(newStress);

    setSimHistory(prev => [
      ...prev,
      {
        stageNum: currentStage.stageNum,
        prompt: currentStage.prompt,
        chosenText: option.text,
        isBest: option.isBest,
        feedback: option.feedback
      }
    ]);
  };

  // Move to next stage or finish
  const handleNextStage = () => {
    setSelectedOptionId(null);
    setFeedbackItem(null);
    setCustomActionText('');

    if (simStageIndex + 1 < selectedProcess.simulation.stages.length) {
      setSimStageIndex(simStageIndex + 1);
    } else {
      setSimComplete(true);
    }
  };

  // Handle custom typed action submission
  const handleCustomActionSubmit = (e) => {
    e.preventDefault();
    if (!customActionText.trim() || selectedOptionId !== null) return;

    // AI evaluate custom input against current stage
    const currentStage = selectedProcess.simulation.stages[simStageIndex];
    const bestOption = currentStage.options.find(o => o.isBest) || currentStage.options[0];

    const isEmpatheticOrProcedural = customActionText.toLowerCase().includes('sop') ||
      customActionText.toLowerCase().includes('escalat') ||
      customActionText.toLowerCase().includes('investigat') ||
      customActionText.toLowerCase().includes('protocol') ||
      customActionText.toLowerCase().includes('lead');

    const simulatedOption = {
      id: 'custom-entry',
      text: customActionText,
      isBest: isEmpatheticOrProcedural,
      penalty: isEmpatheticOrProcedural ? 0 : 20,
      stressDelta: isEmpatheticOrProcedural ? -15 : 15,
      feedback: isEmpatheticOrProcedural
        ? `✅ AI EVALUATION: Custom response effectively incorporates operational protocol and SOP containment standards.`
        : `⚠️ AI EVALUATION: Custom response lacks critical protocol checkpoints defined in this SOP. Recommended: ${bestOption.text}`
    };

    handleSelectOption(simulatedOption);
  };

  // Copy Training Certificate
  const handleCopyCertificate = () => {
    const certText = `HYPERS ENTERPRISE SOP TRAINING CERTIFICATE
==================================================
OPERATOR: You (New Hire / Team Member)
PROCESS CERTIFIED: ${selectedProcess.title}
DEPARTMENT: ${selectedProcess.dept}
FINAL READINESS SCORE: ${simScore}/100 [${simScore >= 85 ? 'CERTIFIED PRODUCTION READY' : 'REQUIRES ADDITIONAL DRILL'}]
STRESS CONTROL FACTOR: ${100 - simStress}%
DATE: ${new Date().toISOString().split('T')[0]}
ISSUING SYSTEM: Hypers AI Simulation Sandbox
==================================================`;
    navigator.clipboard.writeText(certText);
    setCertificateCopied(true);
    setTimeout(() => setCertificateCopied(false), 2500);
  };

  const currentStage = selectedProcess?.simulation?.stages[simStageIndex];

  return (
    <div className="space-y-6 font-mono text-black">
      
      {/* ═══ 1. HEADER SECTION ═══ */}
      <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-black pb-6 mb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00] border-2 border-black text-black font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_#000]">
              <GraduationCap size={15} className="stroke-[3]" />
              <span>GROWTH & COMMUNITY // EMPLOYEE SIMULATOR</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase text-black tracking-tight">
              EMPLOYEE TRAINING <span className="bg-[#FFDE59] px-2 py-0.5 border-2 border-black shadow-[3px_3px_0px_#000]">SIMULATOR</span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-gray-700 max-w-3xl leading-relaxed">
              // COMPANIES UPLOAD OPERATING PROCESSES & SOPS. THE AI COMPILES HYPER-REALISTIC BRANCHING INCIDENT & INTERACTION SIMULATIONS TO TRAIN AND CERTIFY NEW HIRES WITHOUT PRODUCTION RISK.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex md:flex-col gap-2 shrink-0">
            <div className="p-3 bg-[#FBF9F5] border-2 border-black shadow-[3px_3px_0px_#000] text-right">
              <div className="text-[10px] text-gray-600 font-bold uppercase">// SYSTEM STATUS</div>
              <div className="text-sm font-black text-emerald-600 flex items-center justify-end gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                SIMULATOR ONLINE
              </div>
            </div>
            <div className="p-3 bg-[#00F0FF] border-2 border-black shadow-[3px_3px_0px_#000] text-right">
              <div className="text-[10px] text-black font-black uppercase">// READY BLUEPRINTS</div>
              <div className="text-sm font-black text-black">{PRESET_PROCESSES.length} ACTIVE SOPS</div>
            </div>
          </div>
        </div>

        {/* ═══ WORKFLOW TABS ═══ */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'sandbox', label: 'LIVE SIMULATION SANDBOX', icon: Play, count: 'DRILL' },
            { id: 'upload', label: 'UPLOAD & COMPILE PROCESS', icon: Upload, count: 'NEW' },
            { id: 'cohort', label: 'EMPLOYEE COHORT & READINESS', icon: Users, count: '3 HIRES' },
            { id: 'library', label: 'SOP PROCESS LIBRARY', icon: BookOpen, count: `${PRESET_PROCESSES.length} SOPS` }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-black uppercase border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-black text-[#FFDE59] -translate-y-0.5'
                    : 'bg-white text-black hover:bg-[#FFDE59]'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-[#FFDE59]' : 'text-black'} />
                <span>{tab.label}</span>
                <span className={`text-[9px] px-1.5 py-0.5 border border-black ${
                  isActive ? 'bg-[#CCFF00] text-black' : 'bg-[#F0EDE6] text-gray-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ NOTIFICATION TOAST ═══ */}
      {compileSuccessToast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#CCFF00] text-black border-4 border-black shadow-[6px_6px_0px_#000] flex items-center justify-between font-mono"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="stroke-[3]" />
            <span className="font-black text-xs uppercase">
              SUCCESS: COMPANY PROCESS COMPILED INTO INTERACTIVE AI SIMULATION! LAUNCHING DRILL NOW...
            </span>
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ═══ TAB 1: LIVE SIMULATION SANDBOX ═══ */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'sandbox' && selectedProcess && (
        <div className="space-y-6">
          
          {/* Active Simulation Dashboard Bar */}
          <div className="bg-[#F0EDE6] border-4 border-black p-5 shadow-[6px_6px_0px_#000] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-black text-[#00F0FF] border border-black">
                  ACTIVE DRILL
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#FFDE59] text-black border border-black">
                  {selectedProcess.dept}
                </span>
                <span className="text-[10px] font-black uppercase text-gray-600">
                  // {selectedProcess.difficulty}
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-black uppercase">
                {selectedProcess.simulation.title}
              </h2>
            </div>

            {/* Live Metrics: Adherence & Stress Meter */}
            <div className="flex items-center gap-4">
              {/* SOP Adherence Score */}
              <div className="p-3 bg-white border-3 border-black shadow-[3px_3px_0px_#000] min-w-32 text-center">
                <div className="text-[9px] font-black text-gray-500 uppercase">// SOP ADHERENCE</div>
                <div className={`text-2xl font-black ${
                  simScore >= 85 ? 'text-emerald-700' : simScore >= 65 ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {simScore}%
                </div>
              </div>

              {/* Stress & Escalation Meter */}
              <div className="p-3 bg-white border-3 border-black shadow-[3px_3px_0px_#000] min-w-44 space-y-1">
                <div className="flex items-center justify-between text-[9px] font-black uppercase">
                  <span className="flex items-center gap-1 text-red-600">
                    <Flame size={12} className="stroke-[3]" />
                    STRESS METER
                  </span>
                  <span>{simStress}%</span>
                </div>
                <div className="w-full bg-[#E5E5E5] h-3 border border-black p-0.5">
                  <div
                    className={`h-full transition-all duration-300 ${
                      simStress > 70 ? 'bg-[#FF0033]' : simStress > 40 ? 'bg-[#FFDE59]' : 'bg-[#CCFF00]'
                    }`}
                    style={{ width: `${simStress}%` }}
                  />
                </div>
                <div className="text-[8px] font-black text-gray-500 uppercase text-right">
                  {simStress > 70 ? 'CRITICAL ESCALATION' : simStress > 40 ? 'ELEVATED TENSION' : 'CONTROLLED STATUS'}
                </div>
              </div>

              {/* Reset Drill */}
              <button
                onClick={() => startSimulation(selectedProcess)}
                className="p-3 bg-white hover:bg-[#FFDE59] border-3 border-black shadow-[3px_3px_0px_#000] text-black active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                title="Restart Simulation"
              >
                <RotateCcw size={18} className="stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* SIMULATION ACTIVE STAGE OR DEBRIEF */}
          {!simComplete ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Stakeholder Avatar & Scenario Terminal (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Stakeholder Card */}
                <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
                  <div className="flex items-center justify-between border-b-3 border-black pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 border-3 border-black flex items-center justify-center font-black text-white text-lg shadow-[2px_2px_0px_#000] ${selectedProcess.simulation.stakeholder.avatarBg}`}>
                        {selectedProcess.simulation.stakeholder.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-base font-black text-black uppercase">
                          {selectedProcess.simulation.stakeholder.name}
                        </div>
                        <div className="text-xs font-bold text-gray-600 uppercase">
                          {selectedProcess.simulation.stakeholder.role}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#FF0033] text-white border border-black shadow-[1px_1px_0px_#000]">
                      {selectedProcess.simulation.stakeholder.status}
                    </span>
                  </div>

                  {/* Scenario Setup Alert */}
                  <div className="p-3.5 bg-[#FFFDE7] border-2 border-black text-xs font-bold text-gray-800 leading-relaxed shadow-[2px_2px_0px_#000]">
                    <span className="font-black text-black uppercase">// SCENARIO CONTEXT: </span>
                    {selectedProcess.simulation.scenarioIntro}
                  </div>

                  {/* Incoming Stakeholder Message Bubble */}
                  <div className="p-4 bg-black text-[#FFDE59] border-3 border-black shadow-[4px_4px_0px_#000] space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-gray-400">
                      <span>INCOMING STAKEHOLDER DIRECTIVE // STAGE {currentStage.stageNum} OF {selectedProcess.simulation.stages.length}</span>
                      <span className="flex items-center gap-1 text-[#CCFF00]">
                        <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" /> LIVE
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-black uppercase leading-relaxed text-white">
                      "{currentStage.prompt}"
                    </p>
                  </div>
                </div>

                {/* Prior History In this Run */}
                {simHistory.length > 0 && (
                  <div className="bg-[#FBF9F5] border-3 border-black p-4 space-y-3">
                    <div className="text-xs font-black uppercase text-gray-700 flex items-center gap-1.5">
                      <Terminal size={14} />
                      <span>SIMULATION LOG // PAST DECISIONS:</span>
                    </div>
                    <div className="space-y-2">
                      {simHistory.map((item, idx) => (
                        <div key={idx} className="p-2.5 bg-white border border-black text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-black text-black">STAGE {item.stageNum} CHOICE:</span>
                            <span className={`text-[10px] font-black px-1.5 py-0.5 border ${
                              item.isBest ? 'bg-[#CCFF00] border-black text-black' : 'bg-red-100 border-red-600 text-red-700'
                            }`}>
                              {item.isBest ? 'SOP COMPLIANT' : 'VIOLATION DEDUCTION'}
                            </span>
                          </div>
                          <div className="text-gray-700 font-bold">"{item.chosenText}"</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Branching Action Options & Feedback (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Branching Action Grid */}
                <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-black pb-2">
                    <div className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                      <Zap size={14} className="stroke-[3] text-amber-500" />
                      <span>YOUR MOVE: SELECT ACTION (SOP-ALIGNED)</span>
                    </div>
                    <span className="text-[10px] font-black text-gray-500">STAGE {currentStage.stageNum}</span>
                  </div>

                  {/* Decision Options List */}
                  <div className="space-y-3">
                    {currentStage.options.map((option, idx) => {
                      const isSelected = selectedOptionId === option.id;
                      const hasChosen = selectedOptionId !== null;

                      let btnStyle = 'bg-[#F0EDE6] hover:bg-[#FFDE59] border-black text-black';
                      if (hasChosen && isSelected) {
                        btnStyle = option.isBest
                          ? 'bg-[#CCFF00] border-black text-black'
                          : 'bg-[#FF0033] border-black text-white';
                      } else if (hasChosen && !isSelected) {
                        btnStyle = 'bg-gray-100 border-gray-300 text-gray-400 opacity-60';
                      }

                      return (
                        <button
                          key={option.id}
                          disabled={hasChosen}
                          onClick={() => handleSelectOption(option)}
                          className={`w-full text-left p-3.5 border-3 shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs font-bold leading-snug cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="font-black font-mono text-sm uppercase px-1.5 py-0.5 bg-black text-white shrink-0">
                              {option.id.toUpperCase()}
                            </span>
                            <span className="uppercase">{option.text}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Action Free-form Input */}
                  <div className="pt-3 border-t-2 border-black">
                    <div className="text-[10px] font-black uppercase text-gray-600 mb-1.5 flex items-center gap-1">
                      <MessageSquare size={11} />
                      <span>OR TYPE EXACT CUSTOM SOP COMMAND / STATEMENT:</span>
                    </div>
                    <form onSubmit={handleCustomActionSubmit} className="flex gap-2">
                      <input
                        type="text"
                        disabled={selectedOptionId !== null}
                        value={customActionText}
                        onChange={(e) => setCustomActionText(e.target.value)}
                        placeholder="E.G. 'FOLLOW SECTION 4.2: INITIATE READ REPLICA FAILOVER'..."
                        className="flex-1 bg-[#F0EDE6] border-2 border-black px-3 py-1.5 text-xs font-mono font-bold text-black uppercase focus:bg-white focus:outline-none placeholder:text-gray-400"
                      />
                      <button
                        type="submit"
                        disabled={selectedOptionId !== null || !customActionText.trim()}
                        className="px-3 py-1.5 bg-black text-[#FFDE59] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] disabled:opacity-40 cursor-pointer"
                      >
                        <Send size={13} />
                      </button>
                    </form>
                  </div>

                  {/* Feedback Card when Option Selected */}
                  {feedbackItem && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 border-3 border-black shadow-[4px_4px_0px_#000] space-y-3 ${
                        feedbackItem.isBest ? 'bg-[#CCFF00] text-black' : 'bg-[#FFEBEE] text-black'
                      }`}
                    >
                      <div className="text-xs font-black uppercase flex items-center justify-between">
                        <span>// AI SUPERVISOR COACHING:</span>
                        <span>{feedbackItem.isBest ? 'SOP VALIDATED' : 'SOP DEDUCTION'}</span>
                      </div>
                      <p className="text-xs font-bold leading-relaxed uppercase">
                        {feedbackItem.feedback}
                      </p>
                      
                      {/* Advance Button */}
                      <button
                        onClick={handleNextStage}
                        className="w-full py-2 bg-black text-[#FFDE59] hover:bg-white hover:text-black border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                      >
                        <span>{simStageIndex + 1 < selectedProcess.simulation.stages.length ? 'PROCEED TO NEXT STAGE →' : 'FINALIZE DRILL & VIEW SCORECARD →'}</span>
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Reference SOP Quick Look */}
                <div className="bg-[#F0EDE6] border-3 border-black p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-black uppercase text-black">
                    <span className="flex items-center gap-1.5">
                      <FileText size={13} />
                      REFERENCE SOP: {selectedProcess.title.split(':')[0]}
                    </span>
                    <span className="text-[10px] text-gray-600">// CHEATSHEET</span>
                  </div>
                  <pre className="text-[10px] font-mono font-bold text-gray-700 bg-white border border-black p-2.5 max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                    {selectedProcess.sopContent}
                  </pre>
                </div>

              </div>
            </div>
          ) : (
            /* ═══ SIMULATION DEBRIEF & READINESS SCORECARD ═══ */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] space-y-6"
            >
              {/* Scorecard Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-black pb-6">
                <div className="space-y-1">
                  <div className="text-xs font-black uppercase text-gray-500">// TRAINING SIMULATION DEBRIEF</div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-black">
                    {selectedProcess.simulation.title}
                  </h3>
                  <div className="text-xs font-bold text-gray-700 uppercase">
                    OPERATOR: YOU (NEW HIRE) // SOP: {selectedProcess.title}
                  </div>
                </div>

                {/* Final Grade Badge */}
                <div className="p-4 bg-[#CCFF00] border-3 border-black shadow-[4px_4px_0px_#000] text-center min-w-44">
                  <div className="text-[10px] font-black text-black uppercase">// READINESS GRADE</div>
                  <div className="text-4xl font-black text-black mt-0.5">
                    {simScore >= 90 ? 'A+' : simScore >= 80 ? 'B+' : simScore >= 70 ? 'C' : 'FAIL'}
                  </div>
                  <div className="text-xs font-black text-black uppercase mt-1">
                    {simScore}% FINAL ADHERENCE
                  </div>
                </div>
              </div>

              {/* 4 Performance Pillar Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-[#FBF9F5] border-2 border-black shadow-[2px_2px_0px_#000]">
                  <div className="text-[10px] text-gray-600 font-bold uppercase">// SOP PROTOCOL ACCURACY</div>
                  <div className="text-xl font-black text-black mt-1">{simScore}%</div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-1">
                    {simScore >= 85 ? 'Zero critical breaches' : 'Review section 4'}
                  </div>
                </div>

                <div className="p-4 bg-[#FBF9F5] border-2 border-black shadow-[2px_2px_0px_#000]">
                  <div className="text-[10px] text-gray-600 font-bold uppercase">// CRISIS STRESS CONTROL</div>
                  <div className="text-xl font-black text-black mt-1">{100 - simStress}%</div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-1">Composure sustained</div>
                </div>

                <div className="p-4 bg-[#FBF9F5] border-2 border-black shadow-[2px_2px_0px_#000]">
                  <div className="text-[10px] text-gray-600 font-bold uppercase">// ESCALATION HYGIENE</div>
                  <div className="text-xl font-black text-black mt-1">
                    {simScore >= 80 ? 'EXEMPLARY' : 'MODERATE'}
                  </div>
                  <div className="text-[10px] text-gray-600 font-bold mt-1">Proper chain of command</div>
                </div>

                <div className="p-4 bg-[#FBF9F5] border-2 border-black shadow-[2px_2px_0px_#000]">
                  <div className="text-[10px] text-gray-600 font-bold uppercase">// ON-CALL STATUS</div>
                  <div className={`text-xl font-black mt-1 ${
                    simScore >= 80 ? 'text-emerald-700' : 'text-amber-600'
                  }`}>
                    {simScore >= 80 ? 'CERTIFIED' : 'PROVISIONAL'}
                  </div>
                  <div className="text-[10px] text-gray-600 font-bold mt-1">Production access granted</div>
                </div>
              </div>

              {/* Action Decision Trail Breakdown */}
              <div className="space-y-3">
                <div className="text-xs font-black uppercase text-black">// DECISION TRAIL AUDIT:</div>
                <div className="space-y-2">
                  {simHistory.map((item, i) => (
                    <div key={i} className="p-3 bg-[#F0EDE6] border-2 border-black space-y-1">
                      <div className="flex items-center justify-between text-xs font-black">
                        <span>STAGE {item.stageNum}: {item.prompt.substring(0, 70)}...</span>
                        <span className={item.isBest ? 'text-emerald-700' : 'text-red-700'}>
                          {item.isBest ? '✓ COMPLIANT' : '✕ DEVIATION'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-800 font-bold">"{item.chosenText}"</div>
                      <div className="text-[11px] text-gray-600 font-bold italic">{item.feedback}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificate Actions Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-3 border-black">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyCertificate}
                    className="px-4 py-2 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] flex items-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    {certificateCopied ? <Check size={14} className="stroke-[3]" /> : <Award size={14} className="stroke-[2.5]" />}
                    <span>{certificateCopied ? 'CERTIFICATE COPIED!' : 'COPY OPERATOR CERTIFICATE'}</span>
                  </button>

                  <button
                    onClick={() => startSimulation(selectedProcess)}
                    className="px-4 py-2 bg-white hover:bg-[#FFDE59] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] flex items-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    <RotateCcw size={14} className="stroke-[2.5]" />
                    <span>RETAKE DRILL</span>
                  </button>
                </div>

                <button
                  onClick={() => setActiveTab('library')}
                  className="px-4 py-2 bg-black text-[#FFDE59] hover:bg-white hover:text-black border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] flex items-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <span>BROWSE OTHER SOPS →</span>
                </button>
              </div>
            </motion.div>
          )}

        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ═══ TAB 2: UPLOAD & COMPILE PROCESS ═══ */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'upload' && (
        <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] space-y-6">
          <div className="border-b-4 border-black pb-4">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-black">
              INGEST & COMPILE COMPANY OPERATING PROCESS (SOP)
            </h2>
            <p className="text-xs font-bold text-gray-700 leading-relaxed mt-1">
              // PASTE YOUR RUNBOOK, ESCALATION PROTOCOL, OR SALES SCRIPT. THE AI COMPILES IT INTO AN ADVERSARIAL BRANCHING SIMULATION FOR NEW EMPLOYEES.
            </p>
          </div>

          <form onSubmit={handleCompileCustomProcess} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-black uppercase tracking-wider block mb-1">
                  Process Title / Code
                </label>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="E.G. SOP-502: ENTERPRISE SLA BREACH COMM"
                  className="w-full bg-[#F0EDE6] border-3 border-black px-3.5 py-2 text-xs font-bold text-black uppercase focus:bg-white focus:outline-none shadow-[2px_2px_0px_#000]"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-wider block mb-1">
                  Target Department
                </label>
                <select
                  value={customDept}
                  onChange={(e) => setCustomDept(e.target.value)}
                  className="w-full bg-[#F0EDE6] border-3 border-black px-3.5 py-2 text-xs font-bold text-black uppercase focus:bg-white focus:outline-none shadow-[2px_2px_0px_#000]"
                >
                  <option>Engineering / DevOps</option>
                  <option>Enterprise Sales / SDR</option>
                  <option>Customer Success / Support</option>
                  <option>Cybersecurity & Compliance</option>
                  <option>People & Talent Ops</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-wider block mb-1">
                  Drill Difficulty Level
                </label>
                <select
                  value={customDifficulty}
                  onChange={(e) => setCustomDifficulty(e.target.value)}
                  className="w-full bg-[#F0EDE6] border-3 border-black px-3.5 py-2 text-xs font-bold text-black uppercase focus:bg-white focus:outline-none shadow-[2px_2px_0px_#000]"
                >
                  <option>Junior Onboarding (Foundational)</option>
                  <option>Intermediate Drill (Edge Cases)</option>
                  <option>Critical Crisis Drill (High Stress)</option>
                </select>
              </div>
            </div>

            {/* SOP Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-black uppercase tracking-wider">
                  Process Documentation / SOP Markdown Rules
                </label>
                <span className="text-[10px] text-gray-600 font-bold uppercase">
                  PASTE FULL RUNBOOK, SLA POLICIES, OR PLAYBOOK
                </span>
              </div>
              <textarea
                required
                rows={9}
                value={customContent}
                onChange={(e) => setCustomContent(e.target.value)}
                placeholder={`// PASTE COMPANY STANDARD OPERATING PROCEDURE (SOP) HERE
1. CLASSIFICATION & PROTOCOL: Define conditions for when this process triggers.
2. CHAIN OF COMMAND: Who is notified, who leads, and what escalation threshold applies.
3. STEP-BY-STEP ACTIONS: Specific permitted vs prohibited actions.
4. COMMUNICATION STANDARDS: Public or internal messaging rules.
5. POST-EVENT REVIEW: Requirements for closing and archiving the event.`}
                className="w-full bg-[#F0EDE6] border-3 border-black p-4 text-xs font-mono font-bold text-black focus:bg-white focus:outline-none shadow-[3px_3px_0px_#000] leading-relaxed"
              />
            </div>

            {/* Submit & Compiling Indicator */}
            <div>
              <button
                type="submit"
                disabled={isCompiling || !customTitle.trim() || !customContent.trim()}
                className="w-full sm:w-auto px-6 py-3 bg-[#FFDE59] hover:bg-black hover:text-[#FFDE59] border-3 border-black text-xs font-black uppercase shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-40 cursor-pointer"
              >
                <Zap size={16} className="stroke-[3]" />
                <span>[ ⚡ COMPILE PROCESS INTO INTERACTIVE SIMULATION ]</span>
              </button>
            </div>
          </form>

          {/* Compilation Progress Bar */}
          {isCompiling && (
            <div className="p-5 bg-black text-[#FFDE59] border-3 border-black space-y-3 shadow-[4px_4px_0px_#000]">
              <div className="flex items-center justify-between text-xs font-black uppercase">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#CCFF00] border border-black animate-pulse" />
                  {compileStageText}
                </span>
                <span>{compileProgress}%</span>
              </div>
              <div className="w-full bg-[#222] border-2 border-[#444] h-3 p-0.5">
                <div
                  className="bg-[#CCFF00] h-full transition-all duration-300"
                  style={{ width: `${compileProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ═══ TAB 3: EMPLOYEE COHORT & READINESS ═══ */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'cohort' && (
        <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-black pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-black">
                NEW HIRE TRAINING COHORT & ON-CALL CERTIFICATION
              </h2>
              <p className="text-xs font-bold text-gray-700 leading-relaxed mt-1">
                // TRACK SIMULATION DRILL PASS RATES, PROTOCOL VIOLATION RATES, AND CERTIFICATION STATUS ACROSS ACTIVE OPERATORS.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('sandbox')}
              className="px-4 py-2 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer shrink-0"
            >
              [ + RUN DRILL AS NEW HIRE ]
            </button>
          </div>

          <div className="border-3 border-black overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono uppercase">
              <thead>
                <tr className="bg-black text-[#FFDE59] border-b-2 border-black">
                  <th className="p-3">OPERATOR / NEW HIRE</th>
                  <th className="p-3">ROLE / DEPT</th>
                  <th className="p-3">ASSIGNED SIMULATION</th>
                  <th className="p-3">DRILL SCORE</th>
                  <th className="p-3">READINESS STATUS</th>
                  <th className="p-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black bg-[#FBF9F5]">
                {cohortMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-[#FFFFE0] transition-colors">
                    <td className="p-3 font-black text-black flex items-center gap-2.5">
                      <div className={`w-7 h-7 border border-black flex items-center justify-center text-black font-black text-xs shadow-[1px_1px_0px_#000] ${member.avatarBg}`}>
                        {member.name.charAt(0)}
                      </div>
                      <span>{member.name}</span>
                    </td>
                    <td className="p-3 font-bold text-gray-700">{member.role}</td>
                    <td className="p-3 font-bold text-black">{member.assignedSOP}</td>
                    <td className="p-3">
                      <span className={`font-black text-sm ${
                        member.score >= 85 ? 'text-emerald-700' : member.score >= 70 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {member.score}%
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 border border-black text-[10px] font-black ${
                        member.readiness === 'PRODUCTION READY'
                          ? 'bg-[#CCFF00] text-black'
                          : member.readiness === 'TRAINING'
                          ? 'bg-[#FFDE59] text-black'
                          : 'bg-[#FFEBEE] text-red-700'
                      }`}>
                        {member.readiness}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          const match = PRESET_PROCESSES.find(p => member.assignedSOP.includes(p.title.split(':')[0])) || PRESET_PROCESSES[0];
                          startSimulation(match);
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-black hover:text-[#FFDE59] border border-black text-[10px] font-black uppercase shadow-[1px_1px_0px_#000] cursor-pointer"
                      >
                        RUN DRILL →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ═══ TAB 4: SOP PROCESS LIBRARY ═══ */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'library' && (
        <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-black pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-black">
                ENTERPRISE SOP RUNBOOK CATALOG ({PRESET_PROCESSES.length})
              </h2>
              <p className="text-xs font-bold text-gray-700 leading-relaxed mt-1">
                // SELECT ANY INDEXED PROCESS TO IMMEDIATELY LAUNCH AN ADVERSARIAL ROLEPLAY DRILL FOR NEW EMPLOYEES.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('upload')}
              className="px-4 py-2 bg-[#FFDE59] hover:bg-black hover:text-[#FFDE59] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <Plus size={14} className="stroke-[3]" />
              <span>[ INGEST NEW SOP ]</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PRESET_PROCESSES.map((proc) => {
              const isSelected = selectedProcess.id === proc.id;
              return (
                <div
                  key={proc.id}
                  className={`p-5 border-3 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between space-y-4 ${
                    isSelected ? 'bg-[#FFFFE0]' : 'bg-[#FBF9F5]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="px-2 py-0.5 bg-black text-[#00F0FF] text-[9px] font-black uppercase border border-black">
                        {proc.dept}
                      </span>
                      <span className="text-[10px] font-black text-gray-600 uppercase">
                        {proc.difficulty}
                      </span>
                    </div>

                    <h3 className="text-base font-black uppercase text-black leading-snug">
                      {proc.title}
                    </h3>

                    <p className="text-xs font-bold text-gray-700 leading-relaxed">
                      {proc.description}
                    </p>
                  </div>

                  {/* SOP Snippet */}
                  <div className="p-3 bg-white border border-black">
                    <div className="text-[9px] font-black uppercase text-gray-500 mb-1">// PREVIEW RULES:</div>
                    <p className="text-[10px] font-mono text-gray-700 line-clamp-3 leading-relaxed">
                      {proc.sopContent}
                    </p>
                  </div>

                  {/* Launch Drill Button */}
                  <div className="flex items-center justify-between pt-2 border-t-2 border-black">
                    <span className="text-[10px] font-black uppercase text-gray-500">
                      {proc.simulation.stages.length} BRANCHING STAGES
                    </span>
                    <button
                      onClick={() => startSimulation(proc)}
                      className="px-3.5 py-1.5 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                    >
                      <Play size={12} className="stroke-[3]" />
                      <span>LAUNCH DRILL →</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
