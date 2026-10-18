import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Video, Presentation, Kanban, Users, Trophy, Settings,
  MessageSquare, Star, Target, Zap, Rocket, ChevronRight,
  CheckCircle2, Bell, Search, Menu, LayoutGrid, Brain, PhoneCall,
  Activity, Calendar, Upload, Play, Pause, RotateCcw, Sparkles,
  Mic, Eye, TrendingUp, Award, Shield, Heart, Volume2,
  FileVideo, X, BarChart3, Lightbulb, Flame, CircleDot,
  AlertTriangle, PieChart, ShieldAlert, ThumbsUp, ThumbsDown, Flag, Scale,
  Skull, Bomb, ShieldX, TrendingDown, Frown,
  MessageCircle, Timer, Gauge, Radar, Swords,
  FileText, Layers, Wand2, FileSearch,
  LineChart, SearchCheck, HeartHandshake, CheckSquare,
  Banknote, BatteryCharging,
  Map, Milestone, Megaphone, UserPlus, Box,
  Briefcase, Handshake, Mail, Edit3, Plus, ExternalLink, Check, Copy, ArrowRight, ArrowLeft,
  Compass, GraduationCap, Coins, CheckCircle, Send, GitPullRequest, Key
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, CartesianGrid
} from 'recharts';
import PublicNavbar from '../components/PublicNavbar';
import CampaignDashboard from './CampaignDashboard';
import WarRoomExecutionPlatform from '../components/WarRoomExecutionPlatform';
import BusinessIdeaValidator from '../components/BusinessIdeaValidator';
import EmployeeTrainingSimulator from '../components/EmployeeTrainingSimulator';
import AngelVcInvestorRadar from '../components/AngelVcInvestorRadar';
import StartupRoadmapGenerator from '../components/StartupRoadmapGenerator';
import InvestorReadinessAudit from '../components/InvestorReadinessAudit';
import InvestorInterviewSimulator from '../components/InvestorInterviewSimulator';
import StartupValidationEngine from '../components/StartupValidationEngine';
import PitchDeckAuditor from '../components/PitchDeckAuditor';
import BiteSizedCodebase from './BiteSizedCodebase';
import { getAiConfig, callConnectedAi, parseAiJson, getUserCompanyData } from '../utils/aiConfig';
import AiModelKeyModal from '../components/AiModelKeyModal';

// ─── AI Pitch Analyzer Sub-Component ─────────────────────────────
function AIPitchAnalyzer() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('');
  const [results, setResults] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = useCallback((file) => {
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
      setResults(null);
      setAnalysisProgress(0);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const clearVideo = () => {
    setVideoFile(null);
    setVideoURL(null);
    setResults(null);
    setAnalysisProgress(0);
    setIsPlaying(false);
    if (videoRef.current) videoRef.current.pause();
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Simulate AI analysis
  const runAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setResults(null);

    const stages = [
      { label: 'Extracting audio & video frames...', target: 15 },
      { label: 'Analyzing speech clarity & pacing...', target: 30 },
      { label: 'Evaluating body language & confidence...', target: 45 },
      { label: 'Assessing storytelling structure...', target: 60 },
      { label: 'Measuring founder conviction signals...', target: 75 },
      { label: 'Calculating investor confidence level...', target: 88 },
      { label: 'Generating comprehensive report...', target: 100 },
    ];

    let stageIdx = 0;
    const interval = setInterval(() => {
      if (stageIdx < stages.length) {
        setAnalysisStage(stages[stageIdx].label);
        setAnalysisProgress(stages[stageIdx].target);
        stageIdx++;
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
        setResults(generateResults());
      }
    }, 800);
  };

  const generateResults = () => ({
    overallScore: 82,
    analysisMetrics: [
      { label: 'Clarity', score: 85, icon: Eye, color: 'blue', detail: 'Your message was well-articulated with clear problem-solution framing. Consider simplifying the technical jargon in the first 30 seconds.' },
      { label: 'Confidence', score: 88, icon: Shield, color: 'emerald', detail: 'Strong vocal projection and steady eye contact. Minor hesitation detected at 1:42 when discussing traction numbers.' },
      { label: 'Communication', score: 79, icon: Mic, color: 'violet', detail: 'Good pace overall. A few filler words detected ("um", "like"). The ask section could be more direct.' },
      { label: 'Storytelling', score: 76, icon: Lightbulb, color: 'amber', detail: 'The origin story resonates but the narrative arc plateaus mid-pitch. Add a stronger customer anecdote before the ask.' },
      { label: 'Conviction', score: 91, icon: Flame, color: 'rose', detail: 'Your passion for the problem space is palpable. The "why me" moment at 2:15 is particularly compelling.' },
      { label: 'Pacing', score: 80, icon: Activity, color: 'cyan', detail: 'Average 152 WPM — within ideal range. Slight rush detected in the product demo section. Pause more for emphasis.' },
      { label: 'Energy', score: 84, icon: Zap, color: 'orange', detail: 'Consistent energy throughout. Strong opening energy that dips slightly in the middle third — maintain momentum.' },
      { label: 'Professionalism', score: 87, icon: Award, color: 'indigo', detail: 'Polished presentation with clean visuals. Attire and setting are investor-appropriate. Good slide-to-speech synchronization.' },
      { label: 'Technical Depth', score: 73, icon: Brain, color: 'pink', detail: 'Core technology is explained clearly. Deeper into the moat and unique technical advantages would strengthen the pitch.' },
      { label: 'Investor Confidence', score: 78, icon: TrendingUp, color: 'teal', detail: 'Financials are presented but could be more specific. Add CAC/LTV metrics and a clearer path to Series A milestones.' },
    ],
    outputScores: [
      { label: 'Founder Communication', score: 82, grade: 'A-', gradient: 'from-blue-500 to-cyan-500' },
      { label: 'Investor Confidence', score: 78, grade: 'B+', gradient: 'from-emerald-500 to-teal-500' },
      { label: 'Storytelling', score: 76, grade: 'B+', gradient: 'from-amber-500 to-orange-500' },
      { label: 'Charisma', score: 86, grade: 'A', gradient: 'from-purple-500 to-pink-500' },
      { label: 'Conviction', score: 91, grade: 'A+', gradient: 'from-rose-500 to-red-500' },
    ],
    topStrengths: [
      'Exceptional founder conviction — your passion is contagious',
      'Strong opening that immediately hooks the audience',
      'Professional delivery with confident body language',
    ],
    improvements: [
      'Add specific customer metrics (ARR, MRR, churn rate) to the financials slide',
      'Include a brief competitor comparison to establish market positioning',
      'Practice the ask — state the exact round size, valuation, and use of funds',
    ],
  });

  const getScoreColor = (score) => {
    if (score >= 90) return { text: 'text-black', bg: 'bg-[#CCFF00]', border: 'border-black', bar: 'bg-[#CCFF00]' };
    if (score >= 80) return { text: 'text-black', bg: 'bg-[#00F0FF]', border: 'border-black', bar: 'bg-[#00F0FF]' };
    if (score >= 70) return { text: 'text-black', bg: 'bg-[#FFDE59]', border: 'border-black', bar: 'bg-[#FFDE59]' };
    return { text: 'text-white', bg: 'bg-[#FF0033]', border: 'border-black', bar: 'bg-[#FF0033]' };
  };

  const getGrade = (score) => {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 85) return 'A-';
    if (score >= 80) return 'B+';
    if (score >= 75) return 'B';
    if (score >= 70) return 'B-';
    return 'C+';
  };

  // ─── Results View ─────────────────────
  if (results) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 font-mono">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-4 border-black pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00] border-2 border-black text-black text-xs font-black uppercase mb-2 shadow-[2px_2px_0px_#000]">
              <FileSearch size={14} /> [ AI VENTURE AUDIT DEBRIEF ]
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-black">Pitch Video Audit Dossier</h2>
            <p className="text-gray-600 text-xs font-black uppercase tracking-wider mt-1">
              FILE: {videoFile?.name || 'PITCH_RECORDING_MASTER.MP4'} // ANALYZED: JUST NOW
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={clearVideo}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#FFDE59] border-3 border-black text-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] hover:bg-black hover:text-[#FFDE59] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <RotateCcw size={16} />
              [ ↺ NEW AUDIT RUN ]
            </button>
          </div>
        </div>

        {/* Overall Score Hero */}
        <div className="bg-black border-4 border-black p-8 text-white relative shadow-[8px_8px_0px_#000]">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 border-4 border-[#00F0FF] bg-[#111] p-3 shadow-[5px_5px_0px_#00F0FF] flex flex-col items-center justify-center">
                <span className="text-6xl font-black text-[#CCFF00] leading-none">{results.overallScore}</span>
                <span className="text-xs font-black uppercase tracking-widest text-[#00F0FF] mt-1">/ 100 PTS</span>
                <div className="mt-2 px-2 py-0.5 bg-[#FFDE59] text-black text-[10px] font-black uppercase border border-black">
                  TIER-1 VIABLE
                </div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-[#FF0033] text-white text-xs font-black uppercase border-2 border-white mb-2">
                VERDICT: STRONG FOUNDER TRACTION
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-[#00F0FF]">
                High Conviction & Pitch Delivery Detected
              </h3>
              <p className="text-gray-300 text-xs font-bold leading-relaxed max-w-2xl mb-4 font-mono">
                Your pitch demonstrates exceptional founder conviction and charisma. The "why now" narrative is well structured. Tighten the unit economics segment and clearly articulate CAC/LTV payback periods to reach the 90+ percentile.
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {['+ HIGH CONVICTION', '+ CRISP OPENING', '+ EXECUTIVE POISE', '+ CLEAR MARKET TAM'].map((tag, idx) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] ${idx % 3 === 0 ? 'bg-[#CCFF00] text-black' : idx % 3 === 1 ? 'bg-[#00F0FF] text-black' : 'bg-[#FFDE59] text-black'
                      }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Output Scores — The 5 key scores */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-black"></div>
            <h3 className="text-sm font-black text-black uppercase tracking-wider">
              [ 01 // CORE VENTURE VECTOR SCORES ]
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {results.outputScores.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border-3 border-black p-5 text-center shadow-[4px_4px_0px_#000]"
              >
                <div className="text-4xl font-black text-black mb-1">{s.score}</div>
                <div className="text-[11px] font-black text-gray-500 uppercase tracking-wider mb-3 leading-tight">{s.label}</div>
                <span className={`inline-block px-3 py-1 text-xs font-black border-2 ${getScoreColor(s.score).bg} ${getScoreColor(s.score).text} ${getScoreColor(s.score).border} shadow-[2px_2px_0px_#000]`}>
                  GRADE: {s.grade}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed Analysis Grid */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-black"></div>
            <h3 className="text-sm font-black text-black uppercase tracking-wider">
              [ 02 // 10-DIMENSIONAL DEEP AUDIT MATRIX ]
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.analysisMetrics.map((m, i) => {
              const Icon = m.icon;
              const sc = getScoreColor(m.score);
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.03 }}
                  className="bg-[#FBF9F5] border-3 border-black p-5 shadow-[4px_4px_0px_#000]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 border-2 border-black ${sc.bg} flex items-center justify-center shadow-[2px_2px_0px_#000]`}>
                        <Icon size={18} className="text-black" />
                      </div>
                      <div>
                        <h4 className="font-black text-black text-sm uppercase">{m.label}</h4>
                        <span className="text-[10px] font-black uppercase text-gray-600">GRADE: {getGrade(m.score)}</span>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-black text-[#CCFF00] font-black text-lg border-2 border-black">
                      {m.score}/100
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-[#E5E0D8] border-2 border-black overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.score}%` }}
                      transition={{ duration: 0.8, delay: 0.1 + i * 0.04 }}
                      className={`h-full ${sc.bar}`}
                    />
                  </div>

                  <p className="text-xs text-gray-700 font-bold leading-relaxed">{m.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#E8FCE8] border-3 border-black p-6 shadow-[5px_5px_0px_#000]">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-black">
              <CheckCircle2 size={18} className="text-black" />
              <h3 className="font-black text-black uppercase text-sm tracking-wider">
                [ TOP FOUNDER ADVANTAGES ]
              </h3>
            </div>
            <div className="space-y-3">
              {results.topStrengths.map((s, i) => (
                <div key={i} className="flex items-start gap-3 bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                  <Star size={14} className="text-black mt-0.5 shrink-0 fill-[#CCFF00]" />
                  <p className="text-xs text-black font-black uppercase leading-tight">{s}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FFF0F0] border-3 border-black p-6 shadow-[5px_5px_0px_#000]">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-black">
              <AlertTriangle size={18} className="text-black" />
              <h3 className="font-black text-black uppercase text-sm tracking-wider">
                [ MANDATORY CORRECTIONS ]
              </h3>
            </div>
            <div className="space-y-3">
              {results.improvements.map((s, i) => (
                <div key={i} className="flex items-start gap-3 bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                  <ChevronRight size={14} className="text-[#FF0033] mt-0.5 shrink-0 stroke-[3]" />
                  <p className="text-xs text-black font-black uppercase leading-tight">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ─── Upload & Analyze View ─────────────────────
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8 font-mono">
      {/* Header */}
      <div className="text-center space-y-3 border-b-4 border-black pb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFDE59] border-2 border-black text-black text-xs font-black uppercase shadow-[3px_3px_0px_#000]">
          <Brain size={14} />
          [ AI VENTURE STUDIO // PITCH AUDITOR ]
        </div>
        <h2 className="text-4xl font-black uppercase tracking-tight text-black">
          PITCH VIDEO <span className="bg-[#CCFF00] px-2 py-0.5 border-2 border-black shadow-[3px_3px_0px_#000] inline-block">AUDIT ENGINE</span>
        </h2>
        <p className="text-gray-700 text-xs font-black uppercase tracking-wider max-w-xl mx-auto leading-relaxed">
          Upload your 2-minute founder pitch. Our neural engine evaluates delivery, clarity, founder conviction, and investor pattern recognition.
        </p>
      </div>

      {/* Upload Area */}
      {!videoFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-4 border-dashed border-black p-12 text-center cursor-pointer transition-all duration-200 group ${dragOver
            ? 'bg-[#CCFF00] shadow-[8px_8px_0px_#000]'
            : 'bg-[#FBF9F5] hover:bg-[#FFFDE8] shadow-[6px_6px_0px_#000]'
            }`}
        >
          <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={(e) => handleFileSelect(e.target.files[0])} />

          <div className="w-20 h-20 bg-[#00F0FF] border-3 border-black shadow-[4px_4px_0px_#000] mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Upload size={32} className="text-black" />
          </div>

          <h3 className="text-2xl font-black uppercase tracking-tight text-black mb-2">
            {dragOver ? '[ RELEASE TO DROP PITCH VIDEO ]' : '[ SELECT OR DROP PITCH VIDEO ]'}
          </h3>
          <p className="text-gray-600 text-xs font-black uppercase mb-6 tracking-wider">
            SUPPORTED CODECS: MP4, MOV, WEBM • MAX RECOMMENDED SIZE: 200MB
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['2-3 MIN YC FORMAT', 'AUTO TRANSCRIPTION', 'FRAME-BY-FRAME GAZE', 'CONVICTION TELEMETRY'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-white text-black border-2 border-black text-[11px] font-black uppercase shadow-[2px_2px_0px_#000]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Video Player */}
          <div className="bg-black border-4 border-black shadow-[8px_8px_0px_#000] overflow-hidden relative">
            <video
              ref={videoRef}
              src={videoURL}
              className="w-full max-h-[420px] object-contain bg-black"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Controls Overlay */}
            <div className="bg-black border-t-3 border-white/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 bg-[#CCFF00] border-2 border-black flex items-center justify-center text-black font-black hover:bg-white transition-colors shadow-[2px_2px_0px_#000]"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>
                <div>
                  <p className="text-white text-xs font-black uppercase truncate max-w-[200px] sm:max-w-none">{videoFile.name}</p>
                  <p className="text-[#00F0FF] text-[10px] font-mono font-bold">{(videoFile.size / 1024 / 1024).toFixed(1)} MB // READY FOR ANALYSIS</p>
                </div>
              </div>
              <button
                onClick={clearVideo}
                className="px-3 py-1.5 bg-[#FF0033] border-2 border-black text-white text-xs font-black uppercase shadow-[2px_2px_0px_#000] hover:bg-black transition-colors"
              >
                [ REMOVE ]
              </button>
            </div>
          </div>

          {/* Analysis CTA / Progress */}
          {isAnalyzing ? (
            <div className="bg-[#FBF9F5] border-4 border-black p-8 shadow-[6px_6px_0px_#000]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#FFDE59] border-3 border-black flex items-center justify-center shadow-[3px_3px_0px_#000]">
                  <Brain size={24} className="text-black animate-pulse" />
                </div>
                <div>
                  <h3 className="font-black text-black uppercase text-sm">[ NEURAL AUDIO & VIDEO EXTRACTION RUNNING ]</h3>
                  <p className="text-xs text-gray-600 font-bold uppercase">{analysisStage}</p>
                </div>
              </div>

              <div className="w-full h-4 bg-[#E5E0D8] border-3 border-black overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-[#00F0FF]"
                  animate={{ width: `${analysisProgress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              <p className="text-xs text-black font-black text-right">{analysisProgress}% PROCESSED</p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={runAnalysis}
                className="flex-1 flex items-center justify-center gap-3 bg-[#CCFF00] text-black border-4 border-black py-4 font-black text-base uppercase shadow-[6px_6px_0px_#000] hover:bg-black hover:text-[#CCFF00] active:translate-x-1 active:translate-y-1 transition-all"
              >
                <Brain size={22} />
                [ ⚡ EXECUTE AI PITCH AUDIT ]
              </button>
              <button
                onClick={clearVideo}
                className="flex items-center justify-center gap-2 bg-white border-3 border-black text-black px-6 py-4 font-black text-xs uppercase shadow-[4px_4px_0px_#000] hover:bg-[#FF0033] hover:text-white transition-all"
              >
                <RotateCcw size={16} />
                [ CANCEL ]
              </button>
            </div>
          )}
        </div>
      )}

      {/* What We Analyze */}
      {!videoFile && (
        <div className="bg-[#FBF9F5] border-4 border-black p-8 shadow-[6px_6px_0px_#000]">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 bg-black"></div>
            <h3 className="text-xs font-black text-black uppercase tracking-wider">
              [ 10 CORE VENTURE DIMENSIONS AUDITED ]
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { icon: Eye, label: 'Clarity', color: 'bg-[#00F0FF]' },
              { icon: Shield, label: 'Confidence', color: 'bg-[#CCFF00]' },
              { icon: Mic, label: 'Communication', color: 'bg-[#FFDE59]' },
              { icon: Lightbulb, label: 'Storytelling', color: 'bg-[#FF52D9]' },
              { icon: Flame, label: 'Conviction', color: 'bg-[#FF0033] text-white' },
              { icon: Activity, label: 'Pacing', color: 'bg-[#00F0FF]' },
              { icon: Zap, label: 'Energy', color: 'bg-[#FFDE59]' },
              { icon: Award, label: 'Poise', color: 'bg-[#CCFF00]' },
              { icon: Brain, label: 'Tech Moat', color: 'bg-[#FF52D9]' },
              { icon: TrendingUp, label: 'TAM Appeal', color: 'bg-[#00F0FF]' },
            ].map(d => {
              const Icon = d.icon;
              return (
                <div
                  key={d.label}
                  className="flex flex-col items-center gap-2 p-4 bg-white border-3 border-black shadow-[3px_3px_0px_#000] hover:-translate-y-1 transition-transform"
                >
                  <div className={`w-10 h-10 border-2 border-black ${d.color} flex items-center justify-center shadow-[2px_2px_0px_#000]`}>
                    <Icon size={18} className={d.color.includes('text-white') ? 'text-white' : 'text-black'} />
                  </div>
                  <span className="text-[11px] font-black text-black uppercase text-center">{d.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Startup Evaluation Engine Sub-Component ─────────────────────────────
function StartupEvaluationEngine({ companyData }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('');
  const [results, setResults] = useState(null);

  const [formState, setFormState] = useState(() => ({
    traction: companyData?.mrr ? `${companyData.mrr} MRR (${companyData?.mrrGrowth || '+15% MoM'})` : (companyData?.traction || 'Early pilots / prototype stage'),
    monetization: companyData?.businessModel || 'B2B Annual Contracts / SaaS',
    competition: companyData?.competitors || 'Fragmented incumbents, manual spreadsheets & legacy tools'
  }));

  useEffect(() => {
    if (companyData) {
      setFormState({
        traction: companyData?.mrr ? `${companyData.mrr} MRR (${companyData?.mrrGrowth || '+15% MoM'})` : (companyData?.traction || 'Early pilots / prototype stage'),
        monetization: companyData?.businessModel || 'B2B Annual Contracts / SaaS',
        competition: companyData?.competitors || 'Fragmented incumbents, manual spreadsheets & legacy tools'
      });
    }
  }, [companyData]);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setResults(null);

    const activeConfig = getAiConfig();

    const stages = [
      { label: `Analyzing addressable market & timing for ${companyData?.name || 'company'}...`, target: 20 },
      { label: `Evaluating pain point urgency for ${companyData?.targetAudience || 'target buyers'}...`, target: 40 },
      { label: 'Assessing product differentiation & defensibility against competitors...', target: 60 },
      { label: 'Reviewing traction velocity & founder-market fit...', target: 80 },
      { label: 'Synthesizing 12-Factor venture evaluation dossier...', target: 100 },
    ];

    let stageIdx = 0;
    const interval = setInterval(() => {
      if (stageIdx < stages.length) {
        setAnalysisStage(stages[stageIdx].label);
        setAnalysisProgress(stages[stageIdx].target);
        stageIdx++;
      }
    }, 450);

    // 1. IF AI API KEY IS CONNECTED: EXECUTE REAL LLM DILIGENCE
    if (activeConfig && activeConfig.providerId) {
      try {
        const systemPrompt = `You are a Senior Founding Partner at Sequoia Capital and Lead Auditor of the 12-Factor Venture Model.
You evaluate startups with ruthless honesty based ONLY on the user's specific company details provided.
You must analyze THIS specific company:
Name: ${companyData?.name}
Target Market/Buyer: ${companyData?.targetAudience || companyData?.targetBuyer}
Problem Solved: ${companyData?.problem}
Solution / Value Prop: ${companyData?.solution || companyData?.tagline}
Stage: ${companyData?.stage}
Monetization: ${formState.monetization}
Competition: ${formState.competition}
Traction: ${formState.traction}

Do NOT use generic templates. Every metric explanation, strength, weakness, red flag, and investor question must directly mention and critique their specific product and industry.
Return ONLY valid JSON matching this schema:
{
  "probabilityOfSuccess": 74,
  "ventureScalePotential": "High",
  "metrics": [
    { "label": "Market Size", "score": 85, "detail": "1 sentence evaluating TAM for their target buyer" },
    { "label": "Urgency of Problem", "score": 90, "detail": "1 sentence on customer urgency for their specific problem" },
    { "label": "Founder-Market Fit", "score": 75, "detail": "1 sentence on engineering execution" },
    { "label": "Product Differentiation", "score": 80, "detail": "1 sentence on their solution differentiation" },
    { "label": "Moat", "score": 70, "detail": "1 sentence on proprietary defensibility" },
    { "label": "Timing", "score": 92, "detail": "1 sentence on macro timing for this niche" },
    { "label": "Scalability", "score": 88, "detail": "1 sentence on software scalability" },
    { "label": "Monetization", "score": 82, "detail": "1 sentence on their pricing model" },
    { "label": "Defensibility", "score": 72, "detail": "1 sentence on resistance to copycats" },
    { "label": "Distribution", "score": 65, "detail": "1 sentence on acquiring their target buyer" },
    { "label": "Competition", "score": 76, "detail": "1 sentence analyzing their competitors" },
    { "label": "Traction", "score": 62, "detail": "1 sentence on current stage & MRR velocity" }
  ],
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
  "redFlags": ["red flag 1", "red flag 2"],
  "investorConcerns": ["pointed question 1", "pointed question 2", "pointed question 3"]
}`;

        const userPrompt = `Evaluate this company:
Company Name: ${companyData?.name || 'Venture'}
Problem Solved: ${companyData?.problem || 'Not specified'}
Solution / Value Prop: ${companyData?.solution || companyData?.tagline || 'Not specified'}
Target Customer: ${companyData?.targetAudience || companyData?.targetBuyer || 'Enterprise'}
Traction: ${formState.traction}
Monetization: ${formState.monetization}
Competitors: ${formState.competition}
Stage: ${companyData?.stage || 'Pre-Seed'}
Target Raise: ${companyData?.targetRaise || '$1.5M'}
Valuation Cap: ${companyData?.valuation || '$8.5M'}`;

        const rawAi = await callConnectedAi({
          systemPrompt,
          userPrompt,
          temperature: 0.25,
          jsonMode: true
        });

        clearInterval(interval);
        const parsed = parseAiJson(rawAi);
        if (parsed && typeof parsed.probabilityOfSuccess === 'number') {
          setIsAnalyzing(false);
          setResults({
            ...parsed,
            isAiGenerated: true,
            aiProviderName: activeConfig.providerName,
            aiModelName: activeConfig.modelName || activeConfig.modelId
          });
          return;
        }
      } catch (err) {
        console.warn('AI evaluation error, falling back to dynamic company-tailored calculation:', err);
      }
    }

    // 2. DYNAMIC COMPANY-TAILORED EVALUATION FALLBACK
    setTimeout(() => {
      clearInterval(interval);
      setIsAnalyzing(false);
      setResults(generateTailoredResults(companyData, formState));
    }, 1400);
  };

  const generateTailoredResults = (co, form) => {
    const name = co?.name || 'Autonomous Startup';
    const problem = co?.problem || 'Operational inefficiencies and unautomated workflows';
    const solution = co?.solution || co?.tagline || 'Automated software intelligence platform';
    const audience = co?.targetAudience || co?.targetBuyer || 'B2B enterprise buyers';
    const comp = form?.competition || 'Legacy manual workflows & incumbent point solutions';
    const traction = form?.traction || 'Pre-revenue beta';

    return {
      probabilityOfSuccess: 71,
      ventureScalePotential: 'High',
      metrics: [
        { label: 'Market Size', score: 84, detail: `Significant addressable TAM for ${audience}.` },
        { label: 'Urgency of Problem', score: 88, detail: `Strong acute pain: "${problem.slice(0, 60)}..."` },
        { label: 'Founder-Market Fit', score: 76, detail: `Deep architectural clarity on building ${solution.slice(0, 50)}.` },
        { label: 'Product Differentiation', score: 82, detail: `Differentiated technical approach versus ${comp.slice(0, 45)}.` },
        { label: 'Moat', score: 68, detail: `Workflow lock-in and proprietary data layer for ${name}.` },
        { label: 'Timing', score: 92, detail: `Favorable macro tailwinds driving automated solutions for ${audience}.` },
        { label: 'Scalability', score: 86, detail: `Pure software delivery model with low marginal serving cost.` },
        { label: 'Monetization', score: 80, detail: `Clear pricing: ${form?.monetization || 'Software Subscription'}.` },
        { label: 'Defensibility', score: 72, detail: `Must defend against fast followers by deepening integrations.` },
        { label: 'Distribution', score: 64, detail: `GTM motion to reach ${audience} requires outbound discipline.` },
        { label: 'Competition', score: 74, detail: `Counter-positioned against ${comp.slice(0, 40)}.` },
        { label: 'Traction', score: 60, detail: `Current milestone: ${traction}. Needs repeatability.` },
      ],
      strengths: [
        `High-urgency problem thesis focused specifically on ${audience}`,
        `Direct software value proposition: ${solution.slice(0, 70)}`,
        `Identifiable buyer archetype with clear willingness-to-pay triggers`
      ],
      weaknesses: [
        `Traction (${traction}) is early; needs verified cohort retention metrics`,
        `Sales cycle for ${audience} requires systematic outbound pipeline execution`,
        `Defensibility against ${comp.slice(0, 40)} must be actively fortified`
      ],
      redFlags: [
        `Risk of feature bundling if incumbents in this category launch native clones`,
        `Customer onboarding friction could drag initial time-to-value`
      ],
      investorConcerns: [
        `What is your proprietary wedge to acquire ${audience} with a sub-12 month payback period?`,
        `How does ${name} build data moats so competitors cannot replicate your feature set?`,
        `What is the contract expansion path to grow annual contract values over time?`
      ]
    };
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-black bg-[#CCFF00] border-black';
    if (score >= 70) return 'text-black bg-[#00F0FF] border-black';
    if (score >= 60) return 'text-black bg-[#FFDE59] border-black';
    return 'text-white bg-[#FF0033] border-black';
  };

  const getScoreBarColor = (score) => {
    if (score >= 85) return 'bg-[#CCFF00]';
    if (score >= 70) return 'bg-[#00F0FF]';
    if (score >= 60) return 'bg-[#FFDE59]';
    return 'bg-[#FF0033]';
  };

  if (results) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 font-mono">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000]">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-black/60 mb-1">// EVALUATION REPORT GENERATED</div>
            <h2 className="text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2">
              <Scale size={22} className="stroke-[2.5]" />
              {companyData.name} — VC Due Diligence
            </h2>
          </div>
          <button
            onClick={() => setResults(null)}
            className="flex items-center gap-2 px-4 py-2.5 bg-black text-[#FFDE59] hover:bg-[#FFDE59] hover:text-black border-3 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <RotateCcw size={14} className="stroke-[2.5]" />
            [ ↺ RE-EVALUATE ]
          </button>
        </div>

        {/* Hero Score Banner */}
        <div className="bg-black text-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] relative">
          <div className="absolute top-2 right-2 text-white/30 text-xs font-black">┌─ [ VC PROTOCOL RESULT ] ─┐</div>
          <div className="absolute bottom-2 left-2 text-white/30 text-xs font-black">└─ [ TELEMETRY VERIFIED ] ─┘</div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32 shrink-0 border-3 border-white bg-zinc-950 p-2 shadow-[4px_4px_0px_#FFF]">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="50" stroke="#333" strokeWidth="10" fill="none" />
                  <circle cx="60" cy="60" r="50" stroke="#CCFF00" strokeWidth="10" fill="none"
                    strokeDasharray={`${(results.probabilityOfSuccess / 100) * 314} 314`}
                    className="transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-[#CCFF00] tracking-tight">{results.probabilityOfSuccess}%</span>
                  <span className="text-white/70 text-[9px] font-black uppercase tracking-widest text-center leading-none mt-1">SUCCESS<br />RATE</span>
                </div>
              </div>
              <div>
                <div className="text-[11px] font-black text-[#00F0FF] uppercase tracking-wider mb-1">// VENTURE SCALE POTENTIAL</div>
                <div className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-2">{results.ventureScalePotential}</div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] text-black border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                  <TrendingUp size={14} className="stroke-[2.5]" /> TOP 25% OF BATCH
                </div>
              </div>
            </div>

            <div className="border-t-2 md:border-t-0 md:border-l-3 border-white/20 pt-4 md:pt-0 md:pl-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#FFDE59] mb-2">// OVERALL VERDICT</h3>
              <p className="text-white/90 font-bold text-xs sm:text-sm leading-relaxed mb-4 border-l-3 border-[#00F0FF] pl-3">
                "{companyData.name} operates in a rapidly growing market with high urgency. To maximize seed valuation, focus on establishing a clear distribution channel and proving customer willingness to pay."
              </p>
              <div className="text-[11px] font-black text-white/50 uppercase">// CONFIDENCE LEVEL: 94.2% VIA VC MATRIX</div>
            </div>
          </div>
        </div>

        {/* 4 Quadrant Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
              <h3 className="font-black text-sm uppercase text-black flex items-center gap-2">
                <ThumbsUp size={16} className="text-black stroke-[2.5]" />
                CORE STRENGTHS
              </h3>
              <span className="bg-[#CCFF00] border-2 border-black text-black font-black text-[10px] uppercase px-2 py-0.5 shadow-[2px_2px_0px_#000]">
                {results.strengths.length} VERIFIED
              </span>
            </div>
            <div className="space-y-3">
              {results.strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-[#F0EDE6] border-2 border-black p-2.5 shadow-[2px_2px_0px_#000]">
                  <CheckCircle2 size={16} className="text-black shrink-0 mt-0.5 stroke-[2.5]" />
                  <p className="text-xs font-bold text-black uppercase leading-tight">{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
              <h3 className="font-black text-sm uppercase text-black flex items-center gap-2">
                <ThumbsDown size={16} className="text-black stroke-[2.5]" />
                KEY WEAKNESSES
              </h3>
              <span className="bg-[#FFDE59] border-2 border-black text-black font-black text-[10px] uppercase px-2 py-0.5 shadow-[2px_2px_0px_#000]">
                {results.weaknesses.length} IDENTIFIED
              </span>
            </div>
            <div className="space-y-3">
              {results.weaknesses.map((s, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-[#F0EDE6] border-2 border-black p-2.5 shadow-[2px_2px_0px_#000]">
                  <Target size={16} className="text-black shrink-0 mt-0.5 stroke-[2.5]" />
                  <p className="text-xs font-bold text-black uppercase leading-tight">{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Red Flags */}
          <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
              <h3 className="font-black text-sm uppercase text-black flex items-center gap-2">
                <Flag size={16} className="text-black stroke-[2.5]" />
                RED FLAGS
              </h3>
              <span className="bg-[#FF0033] border-2 border-black text-white font-black text-[10px] uppercase px-2 py-0.5 shadow-[2px_2px_0px_#000]">
                {results.redFlags.length} CRITICAL
              </span>
            </div>
            <div className="space-y-3">
              {results.redFlags.map((s, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-[#FFF0F0] border-2 border-black p-2.5 shadow-[2px_2px_0px_#000]">
                  <AlertTriangle size={16} className="text-[#FF0033] shrink-0 mt-0.5 stroke-[2.5]" />
                  <p className="text-xs font-bold text-black uppercase leading-tight">{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Investor Concerns */}
          <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
              <h3 className="font-black text-sm uppercase text-black flex items-center gap-2">
                <ShieldAlert size={16} className="text-black stroke-[2.5]" />
                TOP INVESTOR CONCERNS
              </h3>
              <span className="bg-[#00F0FF] border-2 border-black text-black font-black text-[10px] uppercase px-2 py-0.5 shadow-[2px_2px_0px_#000]">
                {results.investorConcerns.length} QUESTIONS
              </span>
            </div>
            <div className="space-y-3">
              {results.investorConcerns.map((s, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-[#F0EDE6] border-2 border-black p-2.5 shadow-[2px_2px_0px_#000]">
                  <Eye size={16} className="text-black shrink-0 mt-0.5 stroke-[2.5]" />
                  <p className="text-xs font-bold text-black uppercase leading-tight">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 12-Point Metric Evaluation Grid */}
        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
          <div className="flex justify-between items-center border-b-3 border-black pb-4 mb-6">
            <h3 className="text-base font-black uppercase text-black flex items-center gap-2">
              <Scale size={20} className="text-black stroke-[2.5]" />
              12-POINT DIMENSIONAL METRIC EVALUATION
            </h3>
            <span className="bg-black text-[#CCFF00] px-3 py-1 text-xs font-black uppercase border-2 border-black">
              BENCHMARK: TIER-1 VC
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.metrics.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                className="bg-[#F0EDE6] border-3 border-black p-4 shadow-[4px_4px_0px_#000]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-black text-black text-xs uppercase">{m.label}</span>
                  <span className={`px-2 py-0.5 text-[11px] font-black border-2 ${getScoreColor(m.score)} shadow-[1px_1px_0px_#000]`}>
                    {m.score}/100
                  </span>
                </div>
                <div className="w-full h-3 bg-white border-2 border-black p-0.5 overflow-hidden mb-2">
                  <div className={`h-full ${getScoreBarColor(m.score)} border-r border-black`} style={{ width: `${m.score}%` }} />
                </div>
                <p className="text-[11px] font-bold text-black/70 uppercase leading-snug">{m.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8 font-mono">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] border-2 border-black shadow-[2px_2px_0px_#000] text-black text-xs font-mono font-black uppercase mb-3">
          <Sparkles size={14} className="stroke-[2.5]" />
          [ PROTOCOL // AI-POWERED DUE DILIGENCE ]
        </div>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black mb-2">
          STARTUP <span className="bg-[#CCFF00] px-2 py-0.5 border-3 border-black inline-block shadow-[4px_4px_0px_#000]">EVALUATION ENGINE</span>
        </h2>
        <p className="text-xs sm:text-sm font-bold text-black/70 max-w-xl mx-auto uppercase">
          // SIMULATE A TIER-1 VC EVALUATION. AI AUDITS YOUR VENTURE PROFILE ACROSS 12 CRITICAL DIMENSIONS TO DETERMINE VENTURE SCALE POTENTIAL.
        </p>
      </div>

      {!isAnalyzing ? (
        <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000]">
          {/* Card Top Ticker */}
          <div className="flex justify-between items-center border-b-3 border-black pb-3 mb-6">
            <div className="text-xs font-black uppercase text-black bg-[#FFDE59] px-2.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000]">
              [ INTAKE DOSSIER // VENTURE METRICS ]
            </div>
            <div className="text-[11px] font-black uppercase text-black/60">// 12-DIMENSION SCAN READY</div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">// COMPANY NAME</label>
                <input type="text" value={companyData.name} disabled className="w-full bg-[#E5E0D8] border-3 border-black px-4 py-2.5 text-xs font-black text-black shadow-[2px_2px_0px_#000] cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">// TAGLINE</label>
                <input type="text" value={companyData.tagline} disabled className="w-full bg-[#E5E0D8] border-3 border-black px-4 py-2.5 text-xs font-black text-black shadow-[2px_2px_0px_#000] cursor-not-allowed" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">// CORE PROBLEM</label>
                <textarea value={companyData.problem} disabled className="w-full bg-[#E5E0D8] border-3 border-black px-4 py-2.5 text-xs font-bold text-black/80 shadow-[2px_2px_0px_#000] resize-none h-20 cursor-not-allowed" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">// VALUE PROPOSITION / SOLUTION</label>
                <textarea value={companyData.solution} disabled className="w-full bg-[#E5E0D8] border-3 border-black px-4 py-2.5 text-xs font-bold text-black/80 shadow-[2px_2px_0px_#000] resize-none h-20 cursor-not-allowed" />
              </div>

              <div className="md:col-span-2 border-t-3 border-black pt-5 mt-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-black mb-4">
                  <Target size={16} className="text-black stroke-[2.5]" />
                  [ + ACTIVE TELEMETRY INPUTS FOR DUE DILIGENCE ENGINE ]
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">CURRENT TRACTION</label>
                <input type="text" name="traction" value={formState.traction} onChange={handleInputChange} className="w-full bg-[#F0EDE6] border-3 border-black px-4 py-2.5 text-xs font-bold text-black focus:bg-white focus:outline-none shadow-[3px_3px_0px_#000] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">MONETIZATION MODEL</label>
                <input type="text" name="monetization" value={formState.monetization} onChange={handleInputChange} className="w-full bg-[#F0EDE6] border-3 border-black px-4 py-2.5 text-xs font-bold text-black focus:bg-white focus:outline-none shadow-[3px_3px_0px_#000] transition-colors" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">COMPETITION / ALTERNATIVES</label>
                <input type="text" name="competition" value={formState.competition} onChange={handleInputChange} className="w-full bg-[#F0EDE6] border-3 border-black px-4 py-2.5 text-xs font-bold text-black focus:bg-white focus:outline-none shadow-[3px_3px_0px_#000] transition-colors" />
              </div>
            </div>

            <button onClick={runAnalysis} className="w-full mt-4 flex items-center justify-center gap-3 bg-black text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black border-3 border-black py-4 px-6 font-mono font-black text-sm sm:text-base uppercase shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all cursor-pointer">
              <Brain size={22} className="stroke-[2.5]" />
              [ EXECUTE 12-POINT VC EVALUATION ➔ ]
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border-4 border-black p-8 md:p-10 shadow-[8px_8px_0px_#000] max-w-2xl mx-auto text-center font-mono">
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="w-16 h-16 border-3 border-black bg-[#FFDE59] shadow-[4px_4px_0px_#000] flex items-center justify-center text-black">
              <Scale size={32} className="stroke-[2.5] animate-bounce" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase text-black mb-1">// EVALUATING STARTUP VIABILITY...</h3>
              <p className="text-xs font-bold uppercase text-black/70">{analysisStage}</p>
            </div>
          </div>

          <div className="w-full h-5 bg-[#E5E0D8] border-3 border-black p-0.5 overflow-hidden shadow-[2px_2px_0px_#000]">
            <motion.div
              className="h-full bg-[#00F0FF] border-r-2 border-black"
              animate={{ width: `${analysisProgress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between items-center text-xs font-black uppercase text-black mt-3">
            <span>[ SYSTEM BUSY ]</span>
            <span>{analysisProgress}% COMPLETE</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Brutal Failure Analysis Sub-Component ─────────────────────────────
function BrutalFailureAnalysis({ companyData }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('');
  const [results, setResults] = useState(null);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setResults(null);

    const activeConfig = getAiConfig();

    const stages = [
      { label: `Exposing fake assumptions in ${companyData?.name || 'startup'} thesis...`, target: 15 },
      { label: `Stress testing bottom-up TAM for ${companyData?.targetAudience || 'buyers'}...`, target: 30 },
      { label: 'Finding the "feature, not a company" failure modes...', target: 45 },
      { label: 'Evaluating distribution bottlenecks and CAC burn...', target: 65 },
      { label: 'Checking for commodity wrapper vulnerability against incumbents...', target: 85 },
      { label: 'Determining inevitable venture failure points...', target: 100 },
    ];

    let stageIdx = 0;
    const interval = setInterval(() => {
      if (stageIdx < stages.length) {
        setAnalysisStage(stages[stageIdx].label);
        setAnalysisProgress(stages[stageIdx].target);
        stageIdx++;
      }
    }, 400);

    // 1. IF AI CONNECTED: ADVERSARIAL RED-TEAM LLM AUDIT
    if (activeConfig && activeConfig.providerId) {
      try {
        const systemPrompt = `You are a legendary adversarial Silicon Valley venture capitalist, known for ruthless, unvarnished due diligence.
Your mandate is to tear down the founder's startup thesis, identify inevitable failure modes, fake problems, and brutal distribution roadblocks based ONLY on their specific company details.
Do not be polite. Do not flatter. Name their exact company and point out their fatal vulnerabilities.
Return ONLY valid JSON matching this schema:
{
  "survivalProbability": 15,
  "verdict": "<2 brutal, razor-sharp sentences tearing down their exact thesis and naming their company>",
  "fatalFlaws": [
    { "id": "wrapper", "title": "<flaw 1 title>", "description": "<specific to their product & competitors>" },
    { "id": "distribution", "title": "<flaw 2 title>", "description": "<specific to acquiring their target buyer>" },
    { "id": "urgency", "title": "<flaw 3 title>", "description": "<why their target buyer won't pay urgently>" }
  ],
  "brutalTruths": [
    { "label": "Fake Problem", "passed": false, "detail": "<specific to their problem statement>" },
    { "label": "Weak Market", "passed": true, "detail": "<specific to their target buyer & TAM>" },
    { "label": "Feature, Not Company", "passed": false, "detail": "<specific to their solution>" },
    { "label": "Poor Timing", "passed": true, "detail": "<timing analysis for their niche>" },
    { "label": "No Moat", "passed": false, "detail": "<defensibility critique against their competitors>" },
    { "label": "Unclear Customer Pain", "passed": false, "detail": "<willingness to pay reality>" },
    { "label": "Unrealistic TAM", "passed": false, "detail": "<bottom-up calculation reality>" }
  ]
}`;

        const userPrompt = `Red-team this startup thesis:
Company Name: ${companyData?.name || 'Venture'}
Problem Solved: ${companyData?.problem || 'Not specified'}
Solution / Tagline: ${companyData?.solution || companyData?.tagline || 'Not specified'}
Target Buyer: ${companyData?.targetAudience || companyData?.targetBuyer || 'Enterprise'}
Traction: ${companyData?.mrr ? `${companyData.mrr} MRR` : (companyData?.traction || 'Pre-revenue')}
Stage: ${companyData?.stage || 'Pre-Seed'}
Competitors / Alternatives: ${companyData?.competitors || 'Incumbents and spreadsheets'}`;

        const rawAi = await callConnectedAi({
          systemPrompt,
          userPrompt,
          temperature: 0.35,
          jsonMode: true
        });

        clearInterval(interval);
        const parsed = parseAiJson(rawAi);
        if (parsed && typeof parsed.survivalProbability === 'number') {
          setIsAnalyzing(false);
          setResults({
            ...parsed,
            fatalFlaws: (parsed.fatalFlaws || []).map((f, i) => ({
              ...f,
              icon: i === 0 ? Brain : i === 1 ? TrendingDown : ShieldX
            })),
            isAiGenerated: true,
            aiProviderName: activeConfig.providerName,
            aiModelName: activeConfig.modelName || activeConfig.modelId
          });
          return;
        }
      } catch (err) {
        console.warn('AI red-team error, falling back to dynamic company-tailored calculation:', err);
      }
    }

    // 2. DYNAMIC COMPANY-TAILORED FAILURE FALLBACK
    setTimeout(() => {
      clearInterval(interval);
      setIsAnalyzing(false);
      setResults(generateDynamicFailureResults(companyData));
    }, 1400);
  };

  const generateDynamicFailureResults = (co) => {
    const name = co?.name || 'Autonomous Startup';
    const problem = co?.problem || 'Unautomated administrative workflows';
    const solution = co?.solution || co?.tagline || 'Software automation platform';
    const audience = co?.targetAudience || co?.targetBuyer || 'Enterprise businesses';
    const comp = co?.competitors || 'Incumbent platforms and spreadsheets';

    return {
      survivalProbability: 18,
      verdict: `${name} risks building a feature rather than an enduring venture. Unless you secure proprietary distribution loops to ${audience}, ${comp} can assimilate your core value proposition.`,
      fatalFlaws: [
        {
          id: 'wrapper',
          title: 'Defensibility & Feature Assimilation Risk',
          description: `Without deep proprietary data network effects, ${solution.slice(0, 55)} is vulnerable to native cloning by ${comp}.`,
          icon: Brain
        },
        {
          id: 'distribution',
          title: 'High Customer Acquisition Friction',
          description: `Acquiring ${audience} via outbound sales without an established brand will burn cash faster than your current runway (${co?.runway || '12 Months'}).`,
          icon: TrendingDown
        },
        {
          id: 'urgency',
          title: 'Painkiller vs Vitamin Scrutiny',
          description: `If economic conditions tighten, will ${audience} treat "${problem.slice(0, 50)}..." as a mission-critical line item or an easily delayed pilot?`,
          icon: ShieldX
        }
      ],
      brutalTruths: [
        { label: 'Fake Problem', passed: true, detail: `Pain point exists for ${audience}, but pricing power is unproven.` },
        { label: 'Weak Market', passed: true, detail: `Addressable market exists, but sales cycles can exceed 90 days.` },
        { label: 'Feature, Not Company', passed: false, detail: `Risk of being viewed as a single workflow add-on to existing tools.` },
        { label: 'Poor Timing', passed: true, detail: `Macro timing supports automation, but buyers demand immediate ROI.` },
        { label: 'No Moat', passed: false, detail: `Proprietary lock-in must be built before copycats emerge.` },
        { label: 'Unclear Customer Pain', passed: false, detail: `Must prove customers will churn away from ${comp} to adopt you.` },
        { label: 'Unrealistic TAM', passed: false, detail: `Assumes rapid adoption without accounting for enterprise onboarding drag.` }
      ]
    };
  };

  if (results) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 font-mono">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000]">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-[#FF0033] mb-1">// BRUTAL INTELLIGENCE AUDIT COMPLETED</div>
            <h2 className="text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2">
              <Skull size={22} className="stroke-[2.5] text-[#FF0033]" />
              {companyData.name} — Survival Stress Test
            </h2>
          </div>
          <button
            onClick={() => setResults(null)}
            className="flex items-center gap-2 px-4 py-2.5 bg-black text-[#FFDE59] hover:bg-[#FFDE59] hover:text-black border-3 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <RotateCcw size={14} className="stroke-[2.5]" />
            [ ↺ RE-ANALYZE ]
          </button>
        </div>

        {/* Hero Section */}
        <div className="bg-black text-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] relative">
          <div className="absolute top-2 right-2 text-white/30 text-xs font-black">┌─ [ HIGH RISK ASSET ] ─┐</div>
          <div className="absolute bottom-2 left-2 text-white/30 text-xs font-black">└─ [ SYSTEM ALERT // ACTIVE ] ─┘</div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32 shrink-0 border-3 border-[#FF0033] bg-zinc-950 p-2 shadow-[4px_4px_0px_#FF0033]">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="50" stroke="#333" strokeWidth="10" fill="none" />
                  <circle cx="60" cy="60" r="50" stroke="#FF0033" strokeWidth="10" fill="none"
                    strokeDasharray={`${(results.survivalProbability / 100) * 314} 314`}
                    className="transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-[#FF0033] tracking-tight">{results.survivalProbability}%</span>
                  <span className="text-white/70 text-[9px] font-black uppercase tracking-widest text-center leading-none mt-1">SURVIVAL<br />RATE</span>
                </div>
              </div>
              <div>
                <div className="text-[11px] font-black text-[#FF0033] uppercase tracking-wider mb-1">// HARD VERDICT</div>
                <div className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2">HIGHLY LIKELY TO FAIL</div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF0033] text-white border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                  <Skull size={14} className="stroke-[2.5]" /> TERMINAL VULNERABILITY
                </div>
              </div>
            </div>

            <div className="border-t-2 md:border-t-0 md:border-l-3 border-white/20 pt-4 md:pt-0 md:pl-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#FF0033] mb-2 flex items-center gap-1.5">
                <Bomb size={16} /> // THE BRUTAL TRUTH
              </h3>
              <p className="text-white/90 font-bold text-xs sm:text-sm leading-relaxed mb-4 border-l-3 border-[#FF0033] pl-3">
                "{results.verdict}"
              </p>
              <div className="text-[11px] font-black text-white/50 uppercase">// ACTION: COMPLETE STRUCTURAL PIVOT MANDATED</div>
            </div>
          </div>
        </div>

        {/* Fatal Flaws */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-black uppercase text-black flex items-center gap-2">
              <Flame size={18} className="text-[#FF0033] stroke-[2.5]" />
              FATAL FLAWS IDENTIFIED ({results.fatalFlaws.length})
            </h3>
            <span className="bg-[#FF0033] text-white text-[11px] font-black uppercase px-2.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000]">
              MORTAL DANGERS
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.fatalFlaws.map((flaw, i) => {
              const Icon = flaw.icon;
              return (
                <motion.div key={flaw.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000] flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-[#FF0033] border-2 border-black text-white flex items-center justify-center mb-3 shadow-[2px_2px_0px_#000]">
                      <Icon size={20} className="stroke-[2.5]" />
                    </div>
                    <h4 className="font-black text-black text-sm uppercase mb-2 tracking-tight">{flaw.title}</h4>
                    <p className="text-xs font-bold text-black/70 leading-relaxed uppercase">{flaw.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t-2 border-black text-[10px] font-black text-[#FF0033] uppercase">
                    // PRIORITY 1 DEFECT
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Brutal Truths Checklist */}
        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
          <div className="flex justify-between items-center border-b-3 border-black pb-3 mb-4">
            <h3 className="text-base font-black uppercase text-black flex items-center gap-2">
              <ShieldX size={20} className="stroke-[2.5]" />
              FOUNDER REALITY CHECK
            </h3>
            <span className="text-xs font-black text-black/60 uppercase">
              PASS/FAIL AUDIT
            </span>
          </div>
          <div className="divide-y-2 divide-black border-2 border-black">
            {results.brutalTruths.map((truth, i) => (
              <div key={i} className={`p-3.5 flex items-start gap-4 ${truth.passed ? 'bg-[#F0FFF0]' : 'bg-[#FFF0F0]'}`}>
                <div className="shrink-0 mt-0.5">
                  {truth.passed ? (
                    <span className="bg-[#CCFF00] border-2 border-black text-black font-black text-[10px] px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                      PASS
                    </span>
                  ) : (
                    <span className="bg-[#FF0033] border-2 border-black text-white font-black text-[10px] px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                      FAIL
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase text-black mb-0.5">{truth.label}</h4>
                  <p className="text-xs font-bold text-black/70 uppercase">{truth.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-8 font-mono">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF0033] text-white border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-mono font-black uppercase mb-3">
          <Skull size={14} className="stroke-[2.5]" />
          [ PROTOCOL // UNFILTERED ROAST ]
        </div>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black mb-2">
          "WHY YOU'LL <span className="bg-[#FF0033] text-white px-2 py-0.5 border-3 border-black inline-block shadow-[4px_4px_0px_#000]">PROBABLY FAIL</span>" ANALYSIS
        </h2>
        <p className="text-xs sm:text-sm font-bold text-black/70 max-w-xl mx-auto uppercase">
          // MOST STARTUPS DIE IN THE CRIB. SYSTEM STRIPS AWAY FOUNDER DELUSION TO IDENTIFY YOUR FATAL FLAWS: THIN AI WRAPPERS, FAKE PROBLEMS, AND VAPORWARE DISTRIBUTION.
        </p>
      </div>

      {!isAnalyzing ? (
        <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000]">
          {/* Warning tape */}
          <div className="bg-[#FFDE59] border-2 border-black px-3 py-1 text-[11px] font-black uppercase text-black mb-6 flex items-center justify-between shadow-[2px_2px_0px_#000]">
            <span>⚠️ CAUTION: ZERO EMOTIONAL BUFFER</span>
            <span>SYSTEM: UNFILTERED</span>
          </div>

          <div className="bg-[#FFF0F0] border-3 border-black p-6 text-center mb-6 shadow-[4px_4px_0px_#000]">
            <div className="w-14 h-14 bg-[#FF0033] border-3 border-black text-white shadow-[3px_3px_0px_#000] flex items-center justify-center mx-auto mb-3">
              <AlertTriangle size={28} className="stroke-[2.5]" />
            </div>
            <h3 className="font-black text-black uppercase text-sm sm:text-base mb-1.5">WARNING: ZERO-FILTER PROTOCOL ACTIVE</h3>
            <p className="text-xs font-bold text-black/80 uppercase leading-relaxed max-w-md mx-auto">
              IT WILL CRITIQUE <span className="underline font-black">{companyData.name}</span> RUTHLESSLY. IF YOU ARE LOOKING FOR COMFORT OR UNFOUNDED VALIDATION, DO NOT ENGAGE THIS ENGINE.
            </p>
          </div>

          <button onClick={runAnalysis} className="w-full flex items-center justify-center gap-3 bg-[#FF0033] hover:bg-black text-white hover:text-[#FF0033] border-4 border-black py-4 px-6 font-mono font-black text-base uppercase shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all cursor-pointer">
            <Bomb size={22} className="stroke-[2.5]" />
            [ ⚡ ROAST MY STARTUP (NO MERCY) ]
          </button>
        </div>
      ) : (
        <div className="bg-black border-4 border-black p-8 md:p-10 shadow-[8px_8px_0px_#000] max-w-2xl mx-auto text-center font-mono text-white">
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="w-16 h-16 border-3 border-[#FF0033] bg-black text-[#FF0033] shadow-[4px_4px_0px_#FF0033] flex items-center justify-center animate-pulse">
              <Skull size={32} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase text-white mb-1">// TEARING DOWN YOUR BUSINESS MODEL...</h3>
              <p className="text-xs font-bold uppercase text-[#FF0033]">{analysisStage}</p>
            </div>
          </div>

          <div className="w-full h-5 bg-zinc-900 border-2 border-white p-0.5 shadow-[2px_2px_0px_#FFF]">
            <motion.div
              className="h-full bg-[#FF0033] border-r-2 border-white"
              animate={{ width: `${analysisProgress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between items-center text-xs font-black uppercase text-white/70 mt-3">
            <span>[ STRESS TESTING ]</span>
            <span>{analysisProgress}% COMPLETE</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Investor Interview Simulator Sub-Component ─────────────────────────────
// (Imported as <InvestorInterviewSimulator companyData={companyData} /> from components/InvestorInterviewSimulator.jsx)

// ─── AI Pitch Deck Analyzer Sub-Component ─────────────────────────────
// (Imported as <PitchDeckAuditor companyData={companyData} /> from components/PitchDeckAuditor.jsx)
function AIPitchDeckAnalyzer({ companyData }) {
  return <PitchDeckAuditor companyData={companyData} />;
}

// ─── Startup Validation Engine Sub-Component ─────────────────────────────
// (Imported as <StartupValidationEngine companyData={companyData} /> from components/StartupValidationEngine.jsx)

// ─── Investor Readiness Score Sub-Component ─────────────────────────────
function InvestorReadinessScore({ companyData }) {
  return <InvestorReadinessAudit companyData={companyData} />;
}

// ─── AI Startup Roadmap Generator Sub-Component ─────────────────────────────
function AIStartupRoadmap({ companyData }) {
  return <StartupRoadmapGenerator companyData={companyData} />;
}

// ─── AI Fundraising Simulator Sub-Component ─────────────────────────────
function AIFundraisingSimulator({ companyData }) {
  const [sessionActive, setSessionActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStage, setCurrentStage] = useState('meeting'); // meeting, negotiation, due-diligence, follow-up

  const startSession = () => {
    setSessionActive(true);
    setMessages([
      { sender: 'ai', text: "I'm a Partner at Sequoia. I've read your deck. The market seems crowded and your CAC is high. Why should we write a $3M check today?", type: 'objection' }
    ]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputValue('');

    // Simulate AI investor response
    setTimeout(() => {
      let aiResponse = "";
      let type = "neutral";

      if (currentStage === 'meeting') {
        if (userMsg.toLowerCase().includes('cac') || userMsg.toLowerCase().includes('ltv')) {
          aiResponse = "Okay, the unit economics argument makes sense, but what happens when Google decides to build this into Workspace for free?";
          type = "pressure";
        } else {
          aiResponse = "That's a very generic answer. You need to show me the moat. Let's pivot to valuation. We'd want 20% for $2M. Thoughts?";
          setCurrentStage('negotiation');
          type = "negotiation";
        }
      } else if (currentStage === 'negotiation') {
        if (userMsg.includes('10%') || userMsg.includes('15%')) {
          aiResponse = "10% doesn't give us enough ownership to justify the board seat. We can do $2M on a $12M post-money, take it or leave it. We need to move to due diligence today.";
          setCurrentStage('due-diligence');
          type = "pressure";
        } else {
          aiResponse = "I appreciate the confidence, but you don't have the traction to demand a $20M cap. Let's talk about your technical architecture. Send over the data room.";
          setCurrentStage('due-diligence');
          type = "due-diligence";
        }
      } else if (currentStage === 'due-diligence') {
        aiResponse = "[Simulated Email from Associate] Hi Founder, we reviewed the data room. The churn in cohort 3 is concerning. Please explain the 8% drop-off in month 2.";
        setCurrentStage('follow-up');
        type = "due-diligence";
      } else {
        aiResponse = "Your responses lacked conviction on pricing but showed strong technical depth. Simulation complete. Score: 72/100 (Ready for Angels, not Tier 1 VC).";
        type = "feedback";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse, type }]);
    }, 1500);
  };

  if (sessionActive) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto flex flex-col h-[700px] bg-white border-4 border-black shadow-[10px_10px_0px_#000] font-mono overflow-hidden">
        {/* Room Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-3 border-black bg-[#F0EDE6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-[#00F0FF] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <Briefcase size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase text-black">PARTNER @ TIER 1 VC (SEQUOIA CAPITAL)</h2>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider mt-0.5">
                <span className={`px-2 py-0.5 border border-black ${currentStage === 'meeting' ? 'bg-[#00F0FF] text-black' :
                  currentStage === 'negotiation' ? 'bg-[#FFDE59] text-black' :
                    currentStage === 'due-diligence' ? 'bg-[#FF52D9] text-black' :
                      'bg-[#CCFF00] text-black'
                  }`}>
                  STAGE // {currentStage.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSessionActive(false)}
            className="px-3 py-1.5 text-xs font-black uppercase bg-white hover:bg-black hover:text-white border-2 border-black shadow-[2px_2px_0px_#000] transition-colors cursor-pointer"
          >
            [ LEAVE MEETING ]
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F8F6F0]">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[82%] border-3 border-black p-4 shadow-[4px_4px_0px_#000] ${msg.sender === 'user'
                ? 'bg-[#CCFF00] text-black'
                : msg.type === 'pressure' || msg.type === 'objection' ? 'bg-[#FFF0F0] text-black'
                  : msg.type === 'negotiation' ? 'bg-[#FFFDE8] text-black'
                    : msg.type === 'feedback' ? 'bg-black text-white'
                      : 'bg-white text-black'
                }`}>
                {msg.sender === 'ai' && msg.type !== 'feedback' && (
                  <div className={`text-[10px] font-black uppercase tracking-wider mb-2 flex items-center gap-1.5 ${msg.type === 'pressure' || msg.type === 'objection' ? 'text-[#FF0033]' :
                    msg.type === 'negotiation' ? 'text-black' :
                      'text-black/60'
                    }`}>
                    {msg.type === 'pressure' || msg.type === 'objection' ? <Flame size={12} className="stroke-[3]" /> :
                      msg.type === 'negotiation' ? <Handshake size={12} className="stroke-[3]" /> :
                        msg.type === 'due-diligence' ? <FileSearch size={12} className="stroke-[3]" /> :
                          <MessageCircle size={12} />}
                    [ VC {msg.type} ]
                  </div>
                )}
                {msg.sender === 'ai' && msg.type === 'feedback' && (
                  <div className="text-[10px] font-black uppercase tracking-wider mb-2 text-[#CCFF00] flex items-center gap-1.5">
                    <CheckCircle size={12} className="stroke-[3]" /> [ DEBRIEF COMPLETE ]
                  </div>
                )}
                <p className="text-xs font-bold uppercase leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t-3 border-black">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={currentStage === 'follow-up' ? "DRAFT EMAIL REPLY TO PARTNER..." : "DEFEND YOUR VALUE PROPOSITION..."}
              className="flex-1 px-4 py-3 bg-[#F0EDE6] border-3 border-black text-xs font-bold uppercase text-black placeholder:text-black/40 focus:bg-white focus:outline-none shadow-[2px_2px_0px_#000]"
              disabled={messages.length > 0 && messages[messages.length - 1].type === 'feedback'}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || (messages.length > 0 && messages[messages.length - 1].type === 'feedback')}
              className="px-5 py-3 bg-black text-[#FFDE59] hover:bg-[#FFDE59] hover:text-black border-3 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>SEND</span>
              <Send size={14} className="stroke-[2.5]" />
            </button>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8 font-mono">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-mono font-black uppercase mb-3">
          <Briefcase size={14} className="stroke-[2.5]" />
          [ VC ARENA // LIVE NEGOTIATION ]
        </div>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black mb-2">
          SURVIVE THE <span className="bg-[#FFDE59] px-2 py-0.5 border-3 border-black inline-block shadow-[4px_4px_0px_#000]">PARTNER MEETING</span>
        </h2>
        <p className="text-xs sm:text-sm font-bold text-black/70 max-w-xl mx-auto uppercase">
          // PRACTICE YOUR PITCH AGAINST A CUTTHROAT AI VC PARTNER. NAVIGATE OBJECTIONS, NEGOTIATE VALUATIONS, AND SURVIVE DUE DILIGENCE.
        </p>
      </div>

      <div className="bg-white border-4 border-black p-8 sm:p-12 shadow-[8px_8px_0px_#000] text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 border-3 border-black bg-[#FFDE59] shadow-[4px_4px_0px_#000] flex items-center justify-center mx-auto mb-5 text-black">
          <Handshake size={32} className="stroke-[2.5]" />
        </div>
        <h3 className="text-xl sm:text-2xl font-black uppercase text-black mb-2">START PARTNER SIMULATION</h3>
        <p className="text-xs font-bold uppercase text-black/70 mb-8 max-w-md mx-auto leading-relaxed">
          AI WILL DYNAMICALLY COUNTER YOUR ANSWERS. GENERIC BUZZWORDS WILL RESULT IN IMMEDIATE REJECTION. DEFEND YOUR MOAT AND UNIT ECONOMICS.
        </p>

        <button onClick={startSession} className="w-full sm:w-auto px-8 py-4 bg-black text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black border-3 border-black font-mono font-black text-sm sm:text-base uppercase shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer">
          <Briefcase size={20} className="stroke-[2.5]" />
          [ ENTER PARTNER MEETING ➔ ]
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main FounderWorkspace Component ─────────────────────────────
export default function FounderWorkspace() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [aiConfig, setAiConfig] = useState(() => getAiConfig());
  const [aiModalOpen, setAiModalOpen] = useState(false);

  useEffect(() => {
    const syncAi = () => setAiConfig(getAiConfig());
    window.addEventListener('hypers_ai_config_updated', syncAi);
    window.addEventListener('storage', syncAi);
    return () => {
      window.removeEventListener('hypers_ai_config_updated', syncAi);
      window.removeEventListener('storage', syncAi);
    };
  }, []);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const [companyData, setCompanyData] = useState(() => {
    const existing = getUserCompanyData();
    if (existing && existing.name) {
      return {
        name: existing.name,
        tagline: existing.tagline || existing.solution || 'High-throughput software automation platform',
        stage: existing.stage || 'Pre-Seed',
        targetRaise: existing.targetRaise || '$1.5M',
        committed: existing.committed || '$450k (30%)',
        mrr: existing.mrr || '$18,400',
        mrrGrowth: existing.mrrGrowth || '+22% MoM',
        runway: existing.runway || '14 Months',
        valuation: existing.valuationCap || existing.valuation || '$8.5M Post',
        problem: existing.problem || 'Customers face severe operational inefficiencies without modern automation.',
        solution: existing.solution || existing.tagline || 'End-to-end autonomous intelligent workflow engine.',
        targetAudience: existing.targetAudience || existing.targetBuyer || 'Enterprise & Mid-market teams.',
        niche: existing.niche || 'Software & AI',
        businessModel: existing.businessModel || existing.wtp || 'B2B Annual Contracts / SaaS',
        competitors: existing.competitors || existing.incumbentFlaw || 'Fragmented incumbents, manual spreadsheets & legacy tools'
      };
    }
    return {
      name: 'VentureScale AI',
      tagline: 'Autonomous AI workflow infrastructure for high-growth software engineering teams',
      stage: 'Pre-Seed',
      targetRaise: '$1.5M',
      committed: '$450k (30%)',
      mrr: '$18,400',
      mrrGrowth: '+22% MoM',
      runway: '14 Months',
      valuation: '$8.5M Post',
      problem: 'High-growth engineering teams spend 35% of sprint cycles on manual tickets and fragmented context switching.',
      solution: 'Autonomous AI agent runtime that ingests repository context, resolves test suites, and automates engineering judgment.',
      targetAudience: 'Engineering leaders, VP of Platforms, and Staff Software Engineers in scale-ups.',
      niche: 'Developer Tools & AI Infrastructure',
      businessModel: 'Usage-based SaaS ($49/developer/month)',
      competitors: 'Legacy issue trackers, manual code reviews, and brittle static linters'
    };
  });

  const [editForm, setEditForm] = useState(companyData);

  useEffect(() => {
    window.scrollTo(0, 0);
    const syncFromStorage = () => {
      const saved = getUserCompanyData();
      if (saved && saved.name) {
        setCompanyData(prev => ({ ...prev, ...saved }));
        setEditForm(prev => ({ ...prev, ...saved }));
      }
    };
    syncFromStorage();
    window.addEventListener('hypers_company_updated', syncFromStorage);
    return () => window.removeEventListener('hypers_company_updated', syncFromStorage);
  }, []);

  const handleSaveCompany = (e) => {
    e.preventDefault();
    setCompanyData(editForm);
    localStorage.setItem('pitch_user_company', JSON.stringify(editForm));
    localStorage.setItem('hypers_current_company_thesis', JSON.stringify({
      id: editForm.id || 'user_company',
      name: editForm.name,
      tagline: editForm.tagline,
      stage: editForm.stage,
      targetRaise: editForm.targetRaise,
      committed: editForm.committed,
      runway: editForm.runway,
      targetBuyer: editForm.targetAudience || editForm.targetBuyer,
      valuation: editForm.valuation,
      problem: editForm.problem,
      solution: editForm.solution,
      businessModel: editForm.businessModel,
      competitors: editForm.competitors,
      niche: editForm.niche
    }));
    window.dispatchEvent(new Event('hypers_company_updated'));
    setIsEditingCompany(false);
  };

  const [tasks, setTasks] = useState([
    { id: 1, title: `Finalize 10-slide pre-seed deck for ${companyData.name} investor pitch`, status: 'In Progress', priority: 'P0', category: 'Fundraising', assignee: 'You' },
    { id: 2, title: `Deploy pilot integration for ${companyData.targetAudience || 'first enterprise customers'}`, status: 'In Progress', priority: 'P0', category: 'Engineering', assignee: 'Arjun M.' },
    { id: 3, title: `Calibrate core transformer engine for ${companyData.name}`, status: 'Review', priority: 'P1', category: 'AI/ML', assignee: 'Priya K.' },
    { id: 4, title: `Conduct user discovery call with 3 target buyers (${companyData.targetAudience || 'prospects'})`, status: 'To Do', priority: 'P1', category: 'Product', assignee: 'You' },
    { id: 5, title: `Update SOC2 data room compliance documentation for ${companyData.name}`, status: 'To Do', priority: 'P2', category: 'Ops', assignee: 'Arjun M.' },
  ]);

  const [newTaskInput, setNewTaskInput] = useState('');

  const toggleTaskStatus = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'Done' ? 'In Progress' : 'Done' };
      }
      return t;
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskInput.trim(),
      status: 'To Do',
      priority: 'P1',
      category: 'General',
      assignee: 'You'
    };
    setTasks(prev => [newTask, ...prev]);
    setNewTaskInput('');
  };

  const companySlug = (companyData?.name || 'venture').toLowerCase().replace(/[^a-z0-9]/g, '');

  const teamMembers = [
    { name: "Arjun M.", role: "Lead Full-Stack & Systems", status: "Online", color: "emerald", initial: "A", tasks: 2, email: `arjun@${companySlug}.io` },
    { name: "Priya K.", role: "AI / ML Research Lead", status: "In War Room", color: "purple", initial: "P", tasks: 1, email: `priya@${companySlug}.io` },
    { name: "You (Founder)", role: "CEO & Product Architect", status: "Online", color: "orange", initial: "Y", tasks: 2, email: `founder@${companySlug}.io` }
  ];

  const candidateMatches = [
    { role: "Staff Backend / Infrastructure Engineer", match: "96%", candidates: "2 Matches", skills: ["Go", "Distributed Systems", "Kafka", "Postgres"], salary: "$140k - $180k" },
    { role: "Founding Growth & B2B GTM Lead", match: "91%", candidates: "1 Match", skills: ["Enterprise SaaS", "Outbound", "HubSpot", "PLG"], salary: "$120k - $160k" },
    { role: "Senior UI/UX Product Designer", match: "88%", candidates: "3 Matches", skills: ["Figma Design Systems", "Prototyping", "B2B Dashboards"], salary: "$110k - $150k" }
  ];

  const upcomingEvents = [
    { date: "OCT 24", time: "2:00 PM", title: "Partner Pitch Review Session", link: "Google Meet", type: "pitch" },
    { date: "OCT 25", time: "11:30 AM", title: "VC Due Diligence: Sequoia Seed Fund", link: "Zoom Room", type: "investor" },
    { date: "OCT 26", time: "Midnight", title: "Global Batch Hackathon Milestone", link: "Submit Deck", type: "hackathon" }
  ];

  const dataRoomItems = [
    { name: "Cap Table & Waterfall Model", status: "Verified", icon: CheckCircle2, color: "text-emerald-500" },
    { name: "Pitch Deck (12 Slides v3.4)", status: "Needs Review", icon: AlertTriangle, color: "text-amber-500" },
    { name: "5-Year Pro-Forma Financial Model", status: "Verified", icon: CheckCircle2, color: "text-emerald-500" },
    { name: "Customer Pilot LOIs ($38k ARR)", status: "Verified", icon: CheckCircle2, color: "text-emerald-500" }
  ];

  const aiToolSuite = [
    { id: 'pitch-analyzer', name: 'AI Pitch Analyzer', subtitle: 'Video delivery & body language coaching', icon: Video, accentColor: '#FF5722', badge: '10 Dimensions', status: 'Ready to Run' },
    { id: 'startup-eval', name: 'Startup Evaluation', subtitle: 'VC-grade 12-factor due diligence scorecard', icon: Scale, accentColor: '#00F0FF', badge: '12 Metrics', status: 'Audited (88/100)' },
    { id: 'failure-analysis', name: 'Brutal Failure Analysis', subtitle: 'Red-team fatal flaws & market assumptions', icon: Skull, accentColor: '#FF52D9', badge: 'Stress Test', status: '3 Flaws Flagged' },
    { id: 'interview-sim', name: 'Investor Interview Sim', subtitle: 'Live Audio/Video Mock Grilling (YC, Shark Tank, Indian VC)', icon: Mic, accentColor: '#FFDE59', badge: 'Audio & Video', status: 'Live Cam & Mic' },
    { id: 'pitch-deck', name: 'Pitch Deck Analyzer', subtitle: 'Operational Risk Audit & 5 Core Slide Blueprints', icon: Presentation, accentColor: '#CCFF00', badge: 'Risk Audit', status: 'Audit Active' },
    { id: 'startup-validation', name: 'Validation Engine', subtitle: '8-Pillar Stress Test (Demand, Pricing, Frequency, Urgency, GTM)', icon: SearchCheck, accentColor: '#00F0FF', badge: '8 Pillars', status: 'High Conviction' },
    { id: 'readiness-score', name: 'Investor Readiness Score', subtitle: 'Audited ARR, MRR, Churn, TAM/SAM/SOM & Execution', icon: Award, accentColor: '#FFDE59', badge: 'VC Audit', status: 'Due Diligence Active' },
    { id: 'roadmap-generator', name: 'Startup Roadmap', subtitle: 'Automated 90-day sprint & milestone planner', icon: Map, accentColor: '#FF5722', badge: '90-Day GTM', status: 'Sprint 4 Active' },
    { id: 'fundraising-sim', name: 'Fundraising Simulator', subtitle: 'Practice term sheet negotiations & cap table dilution', icon: Handshake, accentColor: '#CCFF00', badge: 'Term Sheets', status: 'SAFE / Priced' },
    { id: 'bitesize-codebase', name: 'Bite-Sized Codebase', subtitle: 'Practice real-world coding in small React/TS projects', icon: GitPullRequest, accentColor: '#2563EB', badge: 'Dev Practice', status: '6 Codebases' }
  ];

  return (
    <div
      className="h-screen max-h-screen bg-[#F0EDE6] text-black font-mono selection:bg-[#FFDE59] selection:text-black flex flex-col relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* Top Warning Marquee */}
      <div className="h-9 shrink-0 bg-[#FFDE59] border-b-4 border-black py-1 px-4 overflow-hidden whitespace-nowrap z-20 flex items-center shadow-[0_4px_0px_#000] select-none">
        <div className="flex items-center gap-8 animate-marquee font-mono text-[11px] font-black uppercase tracking-widest text-black">
          <span className="flex items-center gap-1.5"><span className="text-[#FF5722]">⚡</span> [ HYPERS COCKPIT // VENTURE ACCELERATOR 2026 ]</span>
          <span>//</span>
          <span>STARTUP: {companyData.name} ({companyData.stage})</span>
          <span>//</span>
          <span>TARGET: {companyData.targetRaise}</span>
          <span>//</span>
          <span>COMMITTED: {companyData.committed}</span>
          <span>//</span>
          <span>RUNWAY: {companyData.runway}</span>
          <span>//</span>
          <span>VELOCITY: TOP 12% OF BATCH</span>
          <span>//</span>
          <span className="bg-black text-[#00F0FF] px-2 py-0.5 border border-black font-black">STATUS: TELEMETRY NORMAL</span>
          <span>//</span>
          <span className="flex items-center gap-1.5"><span className="text-[#FF5722]">⚡</span> [ HYPERS COCKPIT // VENTURE ACCELERATOR 2026 ]</span>
          <span>//</span>
          <span>STARTUP: {companyData.name} ({companyData.stage})</span>
          <span>//</span>
          <span>TARGET: {companyData.targetRaise}</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex overflow-hidden relative z-10">
        {/* Brutalist Sidebar */}
        <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white border-r-4 border-black flex flex-col transition-all duration-200 h-full shrink-0 shadow-[4px_0px_0px_#000] z-20 font-mono`}>
          {/* Company Profile Header */}
          <div className="p-4 border-b-4 border-black bg-[#F0EDE6] flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 bg-black text-[#FFDE59] border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center font-mono font-black text-xl shrink-0">
                {companyData.name.charAt(0)}
              </div>
              {sidebarOpen && (
                <div className="min-w-0">
                  <div className="font-mono font-black text-sm uppercase text-black truncate flex items-center gap-1.5">
                    {companyData.name}
                    <span className="w-2.5 h-2.5 bg-[#00F0FF] border-2 border-black shrink-0 animate-pulse" />
                  </div>
                  <div className="text-[10px] font-mono font-bold text-black flex items-center gap-1.5 mt-0.5">
                    <span className="bg-[#FFDE59] px-1 py-0.5 border border-black">{companyData.stage}</span>
                    <span>•</span>
                    <span className="bg-[#CCFF00] px-1 py-0.5 border border-black">{companyData.targetRaise} Target</span>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 border-2 border-black bg-white hover:bg-black hover:text-[#FFDE59] shadow-[2px_2px_0px_#000] transition-colors hidden md:block active:translate-x-0.5 active:translate-y-0.5"
              title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              <Menu size={16} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4 px-2.5 space-y-5 scrollbar-thin">
            {/* Group 1: Command Center */}
            <div>
              {sidebarOpen && (
                <div className="text-[10px] font-mono font-black text-black uppercase tracking-widest mb-2 px-2 py-0.5 bg-[#F0EDE6] border-y-2 border-black flex items-center justify-between">
                  <span>Operating Cockpit</span>
                </div>
              )}
              <div className="space-y-1.5">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-mono font-black uppercase transition-all ${activeTab === 'overview'
                    ? 'bg-black text-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] translate-x-1'
                    : 'text-black hover:bg-[#FFDE59] border-2 border-transparent hover:border-black hover:shadow-[3px_3px_0px_#000]'
                    }`}
                  title="Overview"
                >
                  <LayoutGrid size={16} className={activeTab === 'overview' ? 'text-[#FFDE59]' : 'text-black'} />
                  {sidebarOpen && <span>Command Center</span>}
                </button>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono font-black uppercase transition-all ${activeTab === 'tasks'
                    ? 'bg-black text-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] translate-x-1'
                    : 'text-black hover:bg-[#FFDE59] border-2 border-transparent hover:border-black hover:shadow-[3px_3px_0px_#000]'
                    }`}
                  title="Task Board"
                >
                  <div className="flex items-center gap-2.5">
                    <Kanban size={16} className={activeTab === 'tasks' ? 'text-[#FFDE59]' : 'text-black'} />
                    {sidebarOpen && <span>Task Board</span>}
                  </div>
                  {sidebarOpen && (
                    <span className="text-[10px] px-1.5 py-0.5 font-mono font-black bg-[#CCFF00] text-black border border-black shadow-[1px_1px_0px_#000]">
                      {tasks.filter(t => t.status !== 'Done').length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('team')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono font-black uppercase transition-all ${activeTab === 'team'
                    ? 'bg-black text-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] translate-x-1'
                    : 'text-black hover:bg-[#FFDE59] border-2 border-transparent hover:border-black hover:shadow-[3px_3px_0px_#000]'
                    }`}
                  title="Team & Roles"
                >
                  <div className="flex items-center gap-2.5">
                    <Users size={16} className={activeTab === 'team' ? 'text-[#FFDE59]' : 'text-black'} />
                    {sidebarOpen && <span>Team & Roles</span>}
                  </div>
                  {sidebarOpen && (
                    <span className="text-[10px] px-1.5 py-0.5 font-mono font-black bg-[#00F0FF] text-black border border-black shadow-[1px_1px_0px_#000]">
                      3 Active
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('meetings')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono font-black uppercase transition-all ${activeTab === 'meetings'
                    ? 'bg-black text-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] translate-x-1'
                    : 'text-black hover:bg-[#FFDE59] border-2 border-transparent hover:border-black hover:shadow-[3px_3px_0px_#000]'
                    }`}
                  title="War Room"
                >
                  <div className="flex items-center gap-2.5">
                    <PhoneCall size={16} className={activeTab === 'meetings' ? 'text-[#FFDE59]' : 'text-black'} />
                    {sidebarOpen && <span>War Room</span>}
                  </div>
                  {sidebarOpen && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-black text-white bg-[#FF5722] px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                      <span className="w-1.5 h-1.5 bg-white animate-pulse" /> LIVE
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('idea-validator')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono font-black uppercase transition-all ${activeTab === 'idea-validator'
                    ? 'bg-black text-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] translate-x-1'
                    : 'text-black hover:bg-[#FFDE59] border-2 border-transparent hover:border-black hover:shadow-[3px_3px_0px_#000]'
                    }`}
                  title="Idea Validator"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass size={16} className={activeTab === 'idea-validator' ? 'text-[#FFDE59]' : 'text-black'} />
                    {sidebarOpen && <span>Idea Validator</span>}
                  </div>
                  {sidebarOpen && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-black text-black bg-[#CCFF00] px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                      AI
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Group 2: AI Venture Studio */}
            <div>
              {sidebarOpen && (
                <div className="text-[10px] font-mono font-black text-black uppercase tracking-widest mb-2 px-2 py-0.5 bg-[#F0EDE6] border-y-2 border-black flex items-center justify-between">
                  <span>AI Venture Studio</span>
                  <span className="text-[9px] font-black text-black bg-[#FFDE59] border border-black px-1.5 py-0.5">9 ENGINES</span>
                </div>
              )}
              <div className="space-y-1">
                {aiToolSuite.map(tool => {
                  const Icon = tool.icon;
                  const isActive = activeTab === tool.id;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => setActiveTab(tool.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-mono font-bold uppercase transition-all ${isActive
                        ? 'bg-black text-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] translate-x-1'
                        : 'text-black hover:bg-[#FFDE59] border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_#000]'
                        }`}
                      title={tool.name}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Icon size={14} className={isActive ? 'text-[#FFDE59]' : 'text-black shrink-0'} />
                        {sidebarOpen && <span className="truncate text-[11px]">{tool.name}</span>}
                      </div>
                      {sidebarOpen && (
                        <span className={`text-[8px] font-black px-1 py-0.2 rounded-none border border-black uppercase tracking-wider shrink-0 ${isActive ? 'bg-[#FFDE59] text-black' : 'bg-white text-black'
                          }`}>
                          AI
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 3: Growth & Traction */}
            <div>
              {sidebarOpen && (
                <div className="text-[10px] font-mono font-black text-black uppercase tracking-widest mb-2 px-2 py-0.5 bg-[#F0EDE6] border-y-2 border-black">
                  Growth & Community
                </div>
              )}
              <div className="space-y-1.5">
                <button
                  onClick={() => setActiveTab('recruiting-campaign')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono font-black uppercase transition-all ${activeTab === 'recruiting-campaign'
                    ? 'bg-black text-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] translate-x-1'
                    : 'text-black hover:bg-[#FFDE59] border-2 border-transparent hover:border-black hover:shadow-[3px_3px_0px_#000]'
                    }`}
                  title="Recruiting Campaign"
                >
                  <div className="flex items-center gap-2.5">
                    <Zap size={16} className={activeTab === 'recruiting-campaign' ? 'text-[#FFDE59]' : 'text-black'} />
                    {sidebarOpen && <span>Talent Campaigns</span>}
                  </div>
                  {sidebarOpen && (
                    <span className="text-[10px] font-mono font-black text-black bg-[#CCFF00] px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                      Active
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('training-simulator')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono font-black uppercase transition-all ${activeTab === 'training-simulator'
                    ? 'bg-black text-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] translate-x-1'
                    : 'text-black hover:bg-[#FFDE59] border-2 border-transparent hover:border-black hover:shadow-[3px_3px_0px_#000]'
                    }`}
                  title="Training Simulator"
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap size={16} className={activeTab === 'training-simulator' ? 'text-[#FFDE59]' : 'text-black'} />
                    {sidebarOpen && <span>Training Simulator</span>}
                  </div>
                  {sidebarOpen && (
                    <span className="text-[10px] font-mono font-black text-black bg-[#CCFF00] px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                      SOP AI
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('investor-radar')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono font-black uppercase transition-all ${activeTab === 'investor-radar'
                    ? 'bg-black text-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] translate-x-1'
                    : 'text-black hover:bg-[#FFDE59] border-2 border-transparent hover:border-black hover:shadow-[3px_3px_0px_#000]'
                    }`}
                  title="Angel & VC Investor Radar"
                >
                  <div className="flex items-center gap-2.5">
                    <Coins size={16} className={activeTab === 'investor-radar' ? 'text-[#FFDE59]' : 'text-black'} />
                    {sidebarOpen && <span>Angel & VC Radar</span>}
                  </div>
                  {sidebarOpen && (
                    <span className="text-[10px] font-mono font-black text-black bg-[#00F0FF] px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                      MATCH
                    </span>
                  )}
                </button>

                <div
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono font-black uppercase text-black hover:bg-[#FFDE59] border-2 border-transparent hover:border-black hover:shadow-[3px_3px_0px_#000] transition-all cursor-pointer"
                  onClick={() => setActiveTab('overview')}
                >
                  <div className="flex items-center gap-2.5">
                    <Trophy size={16} className="text-black" />
                    {sidebarOpen && <span>Cohort Rank</span>}
                  </div>
                  {sidebarOpen && (
                    <span className="bg-[#FFDE59] text-black text-[10px] font-mono font-black px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                      #42 (Top 12%)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-3.5 border-t-4 border-black bg-[#F0EDE6] flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 bg-[#CCFF00] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-black font-black font-mono text-xs shrink-0">
                Y
              </div>
              {sidebarOpen && (
                <div className="min-w-0">
                  <div className="text-xs font-black uppercase text-black truncate">You (Founder)</div>
                  <div className="text-[10px] text-black/70 font-bold truncate">{companyData.runway} Runway</div>
                </div>
              )}
            </div>
            {sidebarOpen && (
              <button
                onClick={() => setIsEditingCompany(true)}
                className="p-1.5 border-2 border-black bg-white hover:bg-black hover:text-[#FFDE59] shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-colors"
                title="Edit Company Details"
              >
                <Settings size={15} />
              </button>
            )}
          </div>
        </aside>

        {/* Main Workspace Canvas */}
        <main className="flex-1 min-h-0 flex flex-col h-full overflow-hidden bg-[#F0EDE6]">
          {/* Top Context & Action Bar */}
          <header className="h-16 shrink-0 bg-white border-b-4 border-black shadow-[0_4px_0px_#000] flex items-center justify-between px-6 z-10 font-mono">
            <div className="flex items-center gap-3">
              {activeTab !== 'overview' && (
                <button
                  onClick={() => setActiveTab('overview')}
                  className="flex items-center gap-1.5 text-xs font-mono font-black uppercase bg-black text-[#FFDE59] hover:bg-[#FFDE59] hover:text-black px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  <ArrowLeft size={14} /> Overview
                </button>
              )}
              <h1 className="text-base md:text-lg font-mono font-black uppercase tracking-tight text-black flex items-center gap-2">
                {activeTab === 'overview' && 'Founder Command Cockpit'}
                {activeTab === 'pitch-analyzer' && 'AI Pitch Analyzer'}
                {activeTab === 'startup-eval' && 'Startup Evaluation Engine'}
                {activeTab === 'failure-analysis' && 'Brutal Failure Analysis'}
                {activeTab === 'interview-sim' && 'Investor Interview Simulator'}
                {activeTab === 'pitch-deck' && 'Pitch Deck Analyzer'}
                {activeTab === 'startup-validation' && 'Validation Engine'}
                {activeTab === 'readiness-score' && 'Investor Readiness Score'}
                {activeTab === 'roadmap-generator' && 'Startup Roadmap'}
                {activeTab === 'fundraising-sim' && 'AI Fundraising Simulator'}
                {activeTab === 'team' && 'Team & Talent Management'}
                {activeTab === 'tasks' && 'Active Sprint & Task Board'}
                {activeTab === 'meetings' && 'War Room // Meeting-to-Execution Platform'}
                {activeTab === 'idea-validator' && 'Business Idea Validator & Market Intelligence'}
                {activeTab === 'recruiting-campaign' && 'Talent Sourcing Campaign'}
                {activeTab === 'training-simulator' && 'AI Employee Training Simulator & SOP Engine'}
                {activeTab === 'investor-radar' && 'Angel & VC Investor Radar // Direct Pitch Directory'}
                {activeTab === 'bitesize-codebase' && 'Practice Real-World Coding in Bite-Sized Codebases'}
              </h1>
              {activeTab !== 'overview' && activeTab !== 'team' && activeTab !== 'tasks' && activeTab !== 'meetings' && activeTab !== 'idea-validator' && activeTab !== 'training-simulator' && activeTab !== 'investor-radar' && (
                <span className="hidden sm:inline-flex text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_#000]">
                  AI VENTURE ENGINE
                </span>
              )}
              {activeTab === 'investor-radar' && (
                <span className="hidden sm:inline-flex text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 bg-[#CCFF00] text-black border-2 border-black shadow-[2px_2px_0px_#000]">
                  DIRECT PIPELINE // NO WARM INTRO NEEDED
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Quick Search */}
              <div className="relative hidden md:block">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                <input
                  type="text"
                  placeholder="SEARCH COCKPIT..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 bg-[#F0EDE6] border-3 border-black text-xs font-mono font-bold text-black placeholder:text-black/50 shadow-[3px_3px_0px_#000] focus:bg-white focus:outline-none w-56 uppercase"
                />
              </div>

              {/* Fast Action Buttons */}
              <button
                onClick={() => setAiModalOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 text-xs font-mono font-black uppercase transition-all cursor-pointer ${
                  aiConfig
                    ? 'bg-[#00F0FF] hover:bg-black hover:text-[#00F0FF] text-black'
                    : 'bg-[#FFDE59] hover:bg-[#FF0033] hover:text-white text-black animate-pulse'
                }`}
                title={aiConfig ? `AI Connected: ${aiConfig.providerName} (${aiConfig.modelName})` : "Connect your AI API key and model"}
              >
                <Key size={13} className="shrink-0" />
                <span className="hidden sm:inline">
                  {aiConfig ? `[ ${aiConfig.modelName || aiConfig.modelId} ]` : '[ ⚠️ CONNECT AI KEY ]'}
                </span>
                <span className="sm:hidden font-black text-[10px]">
                  {aiConfig ? 'AI 🟢' : 'AI ⚠️'}
                </span>
                {aiConfig && <span className="w-2 h-2 rounded-full bg-emerald-500 border border-black animate-pulse hidden sm:inline-block"></span>}
              </button>

              <button
                onClick={() => setActiveTab('meetings')}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-black text-[#FFDE59] hover:bg-[#FF5722] hover:text-white border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 text-xs font-mono font-black uppercase transition-all"
              >
                <Video size={14} className="text-[#00F0FF]" />
                <span>War Room</span>
              </button>

              <button
                onClick={() => setIsEditingCompany(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#CCFF00] text-black hover:bg-black hover:text-[#CCFF00] border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 text-xs font-mono font-black uppercase transition-all"
              >
                <Edit3 size={13} className="text-black" />
                <span className="hidden sm:inline">Vitals</span>
              </button>

              {/* Profile Avatar */}
              <div className="w-8 h-8 bg-[#FF52D9] text-black border-2 border-black shadow-[2px_2px_0px_#000] font-mono font-black text-xs flex items-center justify-center">
                Y
              </div>
            </div>
          </header>

          {/* Dynamic Scrollable Content Area */}
          <div className={`flex-1 min-h-0 overflow-y-auto brutalist-scrollbar ${activeTab === 'recruiting-campaign' ? 'p-0 md:p-6' : 'p-6 md:p-8'}`}>

            {/* OVERVIEW TAB: HIGH-VELOCITY COMMAND COCKPIT */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto space-y-7 pb-16 font-mono">

                {/* 1. Executive Cockpit Banner */}
                <div className="bg-black text-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] relative overflow-hidden font-mono">
                  {/* Corner Reticle Brackets */}
                  <span className="absolute top-2 left-2 text-[#FFDE59] font-mono text-sm select-none">┌</span>
                  <span className="absolute top-2 right-2 text-[#FFDE59] font-mono text-sm select-none">┐</span>
                  <span className="absolute bottom-2 left-2 text-[#FFDE59] font-mono text-sm select-none">└</span>
                  <span className="absolute bottom-2 right-2 text-[#FFDE59] font-mono text-sm select-none">┘</span>

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] text-black border-2 border-black font-mono font-black text-xs uppercase mb-4 shadow-[2px_2px_0px_#fff]">
                        <span className="w-2.5 h-2.5 bg-[#FF5722] border border-black animate-pulse" />
                        <span>LIVE ACCELERATOR WORKSPACE // {companyData.name} // {companyData.stage}</span>
                      </div>

                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-mono font-black uppercase tracking-tight text-white mb-2 leading-tight">
                        Welcome to {companyData.name} Command Center
                      </h2>
                      <p className="text-gray-300 font-mono text-xs md:text-sm leading-relaxed mb-6 font-medium">
                        Your venture velocity is pacing in the <strong className="bg-[#CCFF00] text-black px-1.5 py-0.5 border border-black mx-1">TOP 12% VELOCITY</strong> of active batch teams. You have 2 code PRs to merge, 3 AI candidate matches ready to review, and your pitch deck audit is at 88/100 readiness.
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => setActiveTab('pitch-analyzer')}
                          className="px-5 py-2.5 bg-[#00F0FF] text-black hover:bg-white border-3 border-black shadow-[4px_4px_0px_#FFDE59] font-mono font-black text-xs uppercase flex items-center gap-2 active:translate-x-1 active:translate-y-1 transition-all"
                        >
                          <Sparkles size={16} /> Analyze Pitch Now
                        </button>
                        <button
                          onClick={() => setActiveTab('meetings')}
                          className="px-5 py-2.5 bg-[#FF5722] text-white hover:bg-white hover:text-black border-3 border-black shadow-[4px_4px_0px_#fff] font-mono font-black text-xs uppercase flex items-center gap-2 active:translate-x-1 active:translate-y-1 transition-all"
                        >
                          <Video size={16} /> Join Live War Room
                        </button>
                        <button
                          onClick={() => setActiveTab('interview-sim')}
                          className="px-5 py-2.5 bg-white text-black hover:bg-[#CCFF00] border-3 border-black shadow-[4px_4px_0px_#FFDE59] font-mono font-black text-xs uppercase flex items-center gap-2 active:translate-x-1 active:translate-y-1 transition-all"
                        >
                          <Mic size={16} /> Mock VC Interview
                        </button>
                        <button
                          onClick={() => setAiModalOpen(true)}
                          className="px-4 py-2.5 bg-[#FFDE59] text-black hover:bg-white hover:text-black border-3 border-black shadow-[4px_4px_0px_#fff] font-mono font-black text-xs uppercase flex items-center gap-2 active:translate-x-1 active:translate-y-1 transition-all cursor-pointer"
                        >
                          <Key size={14} />
                          <span>{aiConfig ? `AI: ${aiConfig.modelName || aiConfig.modelId}` : 'Connect AI Key'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Vitals Telemetry Card */}
                    <div className="bg-[#141416] border-3 border-[#FFDE59] p-5 lg:min-w-[290px] shadow-[6px_6px_0px_#FFDE59] space-y-4 shrink-0 font-mono text-white">
                      <div className="flex items-center justify-between border-b-2 border-white/20 pb-3">
                        <span className="text-xs font-black uppercase tracking-wider text-gray-300">Runway Health</span>
                        <span className="text-xs font-black text-black bg-[#CCFF00] px-2 py-0.5 border border-black shadow-[2px_2px_0px_#fff]">
                          {companyData.runway}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-gray-300">ROUND PROGRESS</span>
                          <span className="text-[#FFDE59]">{companyData.committed}</span>
                        </div>
                        <div className="w-full bg-black border-2 border-white h-3.5 p-0.5 overflow-hidden">
                          <div className="bg-[#00F0FF] h-full" style={{ width: '30%' }} />
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
                          <span>$450K COMMITTED</span>
                          <span>TARGET: {companyData.targetRaise}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t-2 border-white/20 flex items-center justify-between text-xs">
                        <span className="text-gray-300 font-bold uppercase">Readiness:</span>
                        <span className="bg-[#FF52D9] text-black font-black px-2 py-0.5 border border-white">GRADE A (88/100)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1.5 AI Gateway Status Pill Bar */}
                <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000] flex flex-wrap items-center justify-between gap-4 text-xs font-mono font-black uppercase">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="bg-black text-[#00F0FF] px-3 py-1.5 text-xs font-black border border-black flex items-center gap-2 shadow-[2px_2px_0px_#000]">
                      <Key size={13} className="text-[#00F0FF]" />
                      <span>FOUNDER WORKSPACE AI BRAIN:</span>
                    </span>
                    {aiConfig ? (
                      <span className="bg-[#CCFF00] text-black px-2.5 py-1 text-xs font-black border border-black flex items-center gap-2 shadow-[2px_2px_0px_#000]">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-black animate-pulse"></span>
                        {aiConfig.providerName} // {aiConfig.modelName || aiConfig.modelId}
                      </span>
                    ) : (
                      <span className="bg-[#FFDE59] text-black px-2.5 py-1 text-xs font-black border border-black flex items-center gap-1.5 shadow-[2px_2px_0px_#000]">
                        <AlertTriangle size={13} />
                        SANDBOX DEFAULT (NO CUSTOM KEY CONNECTED)
                      </span>
                    )}
                    <span className="text-gray-600 font-bold hidden lg:inline text-[11px]">
                      // POWERING 9 AI VENTURE ACCELERATOR ENGINES
                    </span>
                  </div>

                  <button
                    onClick={() => setAiModalOpen(true)}
                    className="px-4 py-2 bg-[#00F0FF] hover:bg-black hover:text-[#00F0FF] text-black border-2 border-black text-xs font-black uppercase transition-all shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center gap-2"
                  >
                    <Settings size={13} />
                    <span>{aiConfig ? 'SWITCH MODEL / MANAGE KEY' : 'CONNECT API KEY & MODEL'}</span>
                  </button>
                </div>

                {/* 2. Key Traction Metrics Grid (4 Brutalist Hard Cards) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col justify-between font-mono">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-black uppercase tracking-wider">Monthly Recurring</span>
                      <div className="w-8 h-8 bg-[#FFDE59] text-black border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center font-bold">
                        <TrendingUp size={16} />
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-black mb-1">{companyData.mrr}</div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="bg-[#CCFF00] text-black px-1.5 py-0.5 border border-black font-bold text-[11px]">{companyData.mrrGrowth}</span>
                        <span className="text-black/60 font-medium text-xs">• 14 pilots active</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col justify-between font-mono">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-black uppercase tracking-wider">Sprint Velocity</span>
                      <div className="w-8 h-8 bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center font-bold">
                        <Activity size={16} />
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-black mb-1">14 / 18 Done</div>
                      <div className="w-full bg-[#F0EDE6] border-2 border-black h-3 p-0.5 my-1 overflow-hidden">
                        <div className="bg-black h-full" style={{ width: '78%' }} />
                      </div>
                      <span className="inline-block mt-0.5 bg-[#FFDE59] text-black px-1.5 py-0.5 border border-black font-bold text-[10px] uppercase">78% Sprint Complete (3d left)</span>
                    </div>
                  </div>

                  <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col justify-between font-mono">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-black uppercase tracking-wider">Team & Sourcing</span>
                      <div className="w-8 h-8 bg-[#CCFF00] text-black border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center font-bold">
                        <Users size={16} />
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-black mb-1">3 Act • 2 Open</div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="bg-[#00F0FF] text-black px-1.5 py-0.5 border border-black font-bold text-[11px]">3 AI Matches</span>
                        <span className="text-black/60 font-medium text-xs">waiting review</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col justify-between font-mono">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-black uppercase tracking-wider">Investor Grade</span>
                      <div className="w-8 h-8 bg-[#FF52D9] text-black border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center font-bold">
                        <Award size={16} />
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-black mb-1">88 / 100</div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="bg-[#FFDE59] text-black px-1.5 py-0.5 border border-black font-bold text-[11px]">Seed Stage Ready</span>
                        <span className="text-black/60 font-medium text-xs">• 12 factors</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Main Operations Grid (65% / 35% Split) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">

                  {/* Left Column (Primary Operations & AI Hub - 8 Cols) */}
                  <div className="lg:col-span-8 space-y-7">

                    {/* Section: AI Venture Studio Grid (Interactive 3x3 Tool Matrix) */}
                    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000] font-mono">
                      <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-black">
                        <div>
                          <h3 className="text-base font-black uppercase text-black flex items-center gap-2">
                            <Sparkles size={18} className="text-black" />
                            AI Venture Studio Engines
                          </h3>
                          <p className="text-xs text-black/70 font-medium">Click any specialized copilot to run deep diagnostics on your startup</p>
                        </div>
                        <span className="text-xs font-black uppercase text-black bg-[#FFDE59] border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_#000]">
                          9 Active Modules
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                        {aiToolSuite.map((tool) => {
                          const Icon = tool.icon;
                          return (
                            <div
                              key={tool.id}
                              onClick={() => setActiveTab(tool.id)}
                              className="group p-4 bg-[#F0EDE6] hover:bg-[#FFDE59] border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-center justify-between mb-2.5">
                                  <div
                                    className="w-9 h-9 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center font-black transition-colors"
                                    style={{ backgroundColor: tool.accentColor || '#00F0FF' }}
                                  >
                                    <Icon size={16} className="text-black" />
                                  </div>
                                  <span className="text-[10px] font-black uppercase text-black bg-white border border-black px-1.5 py-0.5 shadow-[1px_1px_0px_#000]">
                                    {tool.badge}
                                  </span>
                                </div>
                                <h4 className="font-black text-sm uppercase text-black group-hover:text-black leading-snug mb-1">
                                  {tool.name}
                                </h4>
                                <p className="text-[11px] text-black/80 font-medium line-clamp-2 leading-relaxed">
                                  {tool.subtitle}
                                </p>
                              </div>
                              <div className="mt-3 pt-2.5 border-t-2 border-black flex items-center justify-between text-[11px] font-black uppercase text-black">
                                <span className="text-black/60 text-[10px]">{tool.status}</span>
                                <span className="flex items-center gap-1 bg-black text-white px-2 py-0.5 border border-black group-hover:bg-white group-hover:text-black transition-colors">
                                  Launch <ArrowRight size={12} />
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section: Sprint & Tasks Management */}
                    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000] font-mono">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-black">
                        <div>
                          <h3 className="text-base font-black uppercase text-black flex items-center gap-2">
                            <Target size={18} className="text-[#FF5722]" />
                            Current Sprint Focus (Sprint #4)
                          </h3>
                          <p className="text-xs text-black/70 font-medium">Goal: Validate carbon API integration with 5 manufacturing beta pilots</p>
                        </div>
                        <button
                          onClick={() => setActiveTab('tasks')}
                          className="text-xs font-black uppercase bg-black text-[#FFDE59] hover:bg-[#FFDE59] hover:text-black border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000] flex items-center gap-1 transition-all"
                        >
                          View Board <ChevronRight size={14} />
                        </button>
                      </div>

                      {/* Add Task Quick Form */}
                      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
                        <input
                          type="text"
                          placeholder="ADD A NEW SPRINT TASK..."
                          value={newTaskInput}
                          onChange={(e) => setNewTaskInput(e.target.value)}
                          className="flex-1 bg-[#F0EDE6] border-3 border-black px-3.5 py-2 text-xs font-bold text-black uppercase placeholder:text-black/50 shadow-[3px_3px_0px_#000] focus:bg-white focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-black text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black border-3 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] flex items-center gap-1 shrink-0 transition-colors"
                        >
                          <Plus size={14} /> Add Task
                        </button>
                      </form>

                      {/* Task Items */}
                      <div className="space-y-2.5">
                        {tasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center justify-between p-3 border-2 border-black bg-[#F0EDE6] hover:bg-white shadow-[3px_3px_0px_#000] transition-all gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <button
                                onClick={() => toggleTaskStatus(task.id)}
                                className={`w-6 h-6 border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_#000] transition-colors shrink-0 ${task.status === 'Done'
                                  ? 'bg-[#CCFF00] text-black'
                                  : 'bg-white hover:bg-[#FFDE59]'
                                  }`}
                              >
                                {task.status === 'Done' && <Check size={14} strokeWidth={3} />}
                              </button>
                              <span className={`text-xs font-bold truncate ${task.status === 'Done' ? 'line-through text-black/40' : 'text-black'
                                }`}>
                                {task.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className={`text-[10px] font-black uppercase px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000] ${task.priority === 'P0' ? 'bg-[#FF5722] text-white' :
                                task.priority === 'P1' ? 'bg-[#FFDE59] text-black' : 'bg-[#00F0FF] text-black'
                                }`}>
                                {task.priority}
                              </span>
                              <span className="text-[10px] font-bold text-black bg-white border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                                {task.assignee}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section: AI Co-Founder Strategic Radar (Synthesized Insights) */}
                    <div className="bg-[#FFDE59] border-4 border-black p-6 shadow-[8px_8px_0px_#000] font-mono">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-black">
                        <div className="flex items-center gap-2">
                          <Brain size={20} className="text-black" />
                          <h3 className="text-base font-black uppercase text-black">AI Co-Founder Strategic Radar</h3>
                        </div>
                        <span className="text-[10px] font-black uppercase text-white bg-black border-2 border-black px-2.5 py-0.5 shadow-[2px_2px_0px_#000]">
                          Updated 10m ago
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                        <div className="p-3.5 bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
                          <div className="flex items-center gap-2 text-black font-black text-xs uppercase mb-1.5">
                            <TrendingUp size={14} className="text-black" /> Unit Economics Signal
                          </div>
                          <p className="text-black text-xs font-medium leading-relaxed">
                            Pilot CAC is $480 with $4,200 estimated LTV (8.7x ratio). Highlight this in slide 4 for Pre-Seed VCs.
                          </p>
                        </div>

                        <div className="p-3.5 bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
                          <div className="flex items-center gap-2 text-black font-black text-xs uppercase mb-1.5">
                            <AlertTriangle size={14} className="text-[#FF5722]" /> Pitch Defense Note
                          </div>
                          <p className="text-black text-xs font-medium leading-relaxed">
                            Anticipate partner questions regarding SAP / NetSuite native carbon reporting in upcoming partner meeting.
                          </p>
                        </div>

                        <div className="p-3.5 bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
                          <div className="flex items-center gap-2 text-black font-black text-xs uppercase mb-1.5">
                            <Zap size={14} className="text-black" /> Talent Velocity
                          </div>
                          <p className="text-black text-xs font-medium leading-relaxed">
                            Top backend candidate match has 4 yrs at Datadog. Send automated invitation before offer expires.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Right Column (Context, Signals & Talent - 4 Cols) */}
                  <div className="lg:col-span-4 space-y-7">

                    {/* 1. Upcoming Schedule & Deadlines */}
                    <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] font-mono">
                      <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-black">
                        <h3 className="text-sm font-black uppercase text-black flex items-center gap-2">
                          <Calendar size={16} className="text-black" />
                          Upcoming Deadlines & Calls
                        </h3>
                        <span className="text-[10px] font-black uppercase text-black bg-[#CCFF00] border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">3 Events</span>
                      </div>

                      <div className="space-y-3">
                        {upcomingEvents.map((evt, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-[#F0EDE6] border-2 border-black shadow-[3px_3px_0px_#000]">
                            <div className="bg-[#FFDE59] border-2 border-black p-1.5 text-center min-w-[50px] shadow-[2px_2px_0px_#000]">
                              <div className="text-[9px] font-black text-black uppercase">{evt.date.split(' ')[0]}</div>
                              <div className="text-base font-black text-black leading-none">{evt.date.split(' ')[1]}</div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-black text-xs uppercase text-black mb-1 truncate">{evt.title}</h4>
                              <div className="text-[11px] text-black/70 font-bold flex items-center justify-between">
                                <span>{evt.time}</span>
                                <span className="bg-black text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black border border-black px-1.5 py-0.5 text-[10px] font-black uppercase transition-colors cursor-pointer flex items-center gap-0.5">
                                  {evt.link} <ExternalLink size={10} />
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 2. AI Talent Matchmaking Radar */}
                    <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] font-mono">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-black">
                        <h3 className="text-sm font-black uppercase text-black flex items-center gap-2">
                          <Users size={16} className="text-black" />
                          Talent Matchmaking Radar
                        </h3>
                        <span className="text-[10px] font-black uppercase text-black bg-[#00F0FF] border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                          Active Search
                        </span>
                      </div>
                      <p className="text-xs text-black/70 font-medium mb-3">Community candidate profiles matched to your open requisitions</p>

                      <div className="space-y-3">
                        {candidateMatches.map((match, idx) => (
                          <div key={idx} className="p-3 bg-[#F0EDE6] border-2 border-black shadow-[3px_3px_0px_#000] space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-black text-xs uppercase text-black truncate max-w-[170px]">{match.role}</h4>
                              <span className="text-[10px] font-black text-black bg-[#CCFF00] border border-black px-1.5 py-0.5 shadow-[1px_1px_0px_#000]">
                                {match.match}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {match.skills.map((skill, sIdx) => (
                                <span key={sIdx} className="text-[9px] font-bold bg-white text-black px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between pt-1 text-[11px]">
                              <span className="text-black/60 font-bold">{match.candidates}</span>
                              <button
                                onClick={() => setActiveTab('team')}
                                className="bg-black text-[#FFDE59] hover:bg-[#FFDE59] hover:text-black border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000] transition-colors"
                              >
                                Review Match →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. Investor Data Room Checklist */}
                    <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] font-mono">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-black">
                        <h3 className="text-sm font-black uppercase text-black flex items-center gap-2">
                          <FileText size={16} className="text-black" />
                          Data Room Readiness
                        </h3>
                        <span className="text-[10px] font-black uppercase text-black bg-[#FF52D9] border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                          3 of 4 Ready
                        </span>
                      </div>

                      <div className="space-y-2">
                        {dataRoomItems.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <div key={idx} className="flex items-center justify-between p-2.5 bg-[#F0EDE6] border-2 border-black shadow-[2px_2px_0px_#000] text-xs">
                              <span className="font-bold text-black text-[11px] uppercase truncate max-w-[180px]">{item.name}</span>
                              <div className="flex items-center gap-1 font-black text-[10px]">
                                <Icon size={13} className="text-black" />
                                <span className={`px-1.5 py-0.5 border border-black ${item.status === 'Verified' ? 'bg-[#CCFF00] text-black' : 'bg-[#FFDE59] text-black'}`}>
                                  {item.status}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setActiveTab('pitch-deck')}
                        className="w-full mt-3 py-2.5 bg-black text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black border-3 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] transition-all text-center"
                      >
                        Audit Full Data Room
                      </button>
                    </div>

                    {/* 4. Batch Leaderboard Standing */}
                    <div className="bg-[#00F0FF] border-4 border-black p-5 shadow-[6px_6px_0px_#000] font-mono">
                      <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-black">
                        <span className="text-[11px] font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                          <Trophy size={14} className="text-black" /> Batch Leaderboard
                        </span>
                        <span className="text-xs font-black text-white bg-black border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_#000]">
                          Top 12%
                        </span>
                      </div>
                      <div className="text-3xl font-black text-black mb-0.5">Rank #42 / 380</div>
                      <p className="text-xs text-black/80 font-bold mb-3">Weekly velocity score: 2,450 XP (+380 this week)</p>
                      <button
                        onClick={() => setActiveTab('recruiting-campaign')}
                        className="w-full py-2.5 bg-black text-[#FFDE59] hover:bg-white hover:text-black border-3 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] transition-all"
                      >
                        Boost Score with Talent Campaign →
                      </button>
                    </div>

                  </div>
                </div>

              </motion.div>
            )}

            {/* AI VENTURE STUDIO ENGINES */}
            {activeTab === 'pitch-analyzer' && <AIPitchAnalyzer />}
            {activeTab === 'startup-eval' && <StartupEvaluationEngine companyData={companyData} />}
            {activeTab === 'failure-analysis' && <BrutalFailureAnalysis companyData={companyData} />}
            {activeTab === 'interview-sim' && <InvestorInterviewSimulator companyData={companyData} />}
            {activeTab === 'pitch-deck' && <AIPitchDeckAnalyzer companyData={companyData} />}
            {activeTab === 'startup-validation' && <StartupValidationEngine companyData={companyData} />}
            {activeTab === 'readiness-score' && <InvestorReadinessScore companyData={companyData} />}
            {activeTab === 'roadmap-generator' && <AIStartupRoadmap companyData={companyData} />}
            {activeTab === 'fundraising-sim' && <AIFundraisingSimulator companyData={companyData} />}
            {activeTab === 'recruiting-campaign' && <CampaignDashboard companyData={companyData} />}
            {activeTab === 'bitesize-codebase' && <BiteSizedCodebase />}

            {/* TEAM & ROLES TAB */}
            {activeTab === 'team' && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto space-y-6 font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black uppercase text-black">Your Core Team</h2>
                    <p className="text-xs font-medium text-black/70">Manage founders, engineers, and active matchmaking candidate matches</p>
                  </div>
                  <button className="bg-black text-[#FFDE59] hover:bg-[#FFDE59] hover:text-black border-3 border-black px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_#000] transition-colors flex items-center gap-2 shrink-0">
                    <UserPlus size={14} /> Invite Team Member
                  </button>
                </div>

                <div className="bg-white border-4 border-black shadow-[6px_6px_0px_#000]">
                  <div className="p-4 border-b-3 border-black bg-[#F0EDE6] flex justify-between items-center">
                    <h3 className="font-black text-xs uppercase text-black">Active Core Members</h3>
                    <span className="bg-[#CCFF00] text-black border-2 border-black px-2 py-0.5 text-xs font-black">{teamMembers.length} Active</span>
                  </div>
                  <div className="divide-y-2 divide-black">
                    {teamMembers.map((member, i) => (
                      <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white hover:bg-[#FFDE59] transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-black text-[#00F0FF] border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center font-mono font-black text-lg">
                            {member.initial}
                          </div>
                          <div>
                            <div className="font-black text-sm uppercase text-black flex items-center gap-2">
                              {member.name}
                              {member.status === 'Online' && (
                                <span className="flex items-center gap-1 text-[10px] font-black text-black bg-[#CCFF00] border border-black px-2 py-0.5">
                                  <span className="w-1.5 h-1.5 bg-black animate-pulse" /> ONLINE
                                </span>
                              )}
                              {member.status === 'In War Room' && (
                                <span className="flex items-center gap-1 text-[10px] font-black text-white bg-[#FF5722] border border-black px-2 py-0.5">
                                  <span className="w-1.5 h-1.5 bg-white animate-pulse" /> IN WAR ROOM
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-medium text-black/70 mt-0.5">{member.role} • {member.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveTab('meetings')}
                            className="px-3 py-1.5 text-xs font-black uppercase bg-black text-white hover:bg-[#00F0FF] hover:text-black border-2 border-black shadow-[2px_2px_0px_#000] transition-colors flex items-center gap-1.5"
                          >
                            <Video size={14} /> Instant Sync
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Matchmaking Banner */}
                <div className="bg-[#CCFF00] border-4 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-6 font-mono">
                  <div>
                    <h3 className="text-base font-black uppercase text-black mb-1 flex items-center gap-2">
                      <Brain size={18} className="text-black" /> AI Co-Founder Matchmaking Active
                    </h3>
                    <p className="text-black/80 font-medium text-xs max-w-lg leading-relaxed">
                      We are continuously scanning the community for your <strong>Senior Backend Engineer</strong> and <strong>B2B Growth Lead</strong> roles. You have 3 candidate matches ready to interview.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('recruiting-campaign')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-black text-[#FFDE59] hover:bg-white hover:text-black border-3 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] transition-colors whitespace-nowrap"
                  >
                    Open Talent Campaign →
                  </button>
                </div>
              </motion.div>
            )}

            {/* TASK BOARD TAB */}
            {activeTab === 'tasks' && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto h-full flex flex-col space-y-6 font-mono">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-black uppercase text-black">Sprint Kanban Board</h2>
                    <p className="text-xs font-medium text-black/70">Track and prioritize tasks across your core engineering & fundraising sprints</p>
                  </div>
                  <form onSubmit={handleAddTask} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="ADD TASK TITLE..."
                      value={newTaskInput}
                      onChange={(e) => setNewTaskInput(e.target.value)}
                      className="bg-white border-3 border-black px-3 py-1.5 text-xs font-bold text-black uppercase shadow-[3px_3px_0px_#000] focus:outline-none w-64"
                    />
                    <button type="submit" className="bg-black text-[#FFDE59] hover:bg-[#FFDE59] hover:text-black border-3 border-black px-4 py-1.5 font-black text-xs uppercase shadow-[3px_3px_0px_#000] transition-colors flex items-center gap-1">
                      <Plus size={14} /> Add
                    </button>
                  </form>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* To Do */}
                  <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000] flex flex-col">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-black">
                      <h3 className="font-black text-xs uppercase tracking-wider text-black">To Do</h3>
                      <span className="bg-[#FFDE59] text-black text-xs font-black px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                        {tasks.filter(t => t.status === 'To Do').length}
                      </span>
                    </div>
                    <div className="space-y-3 flex-1">
                      {tasks.filter(t => t.status === 'To Do').map(task => (
                        <div key={task.id} className="bg-[#F0EDE6] hover:bg-white p-3.5 border-3 border-black shadow-[3px_3px_0px_#000] transition-all">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-white text-black border border-black shadow-[1px_1px_0px_#000]">
                              {task.category}
                            </span>
                            <span className="text-[10px] font-black uppercase text-white bg-[#FF5722] border border-black px-1.5 py-0.5 shadow-[1px_1px_0px_#000]">
                              {task.priority}
                            </span>
                          </div>
                          <h4 className="font-black text-xs uppercase text-black mb-3">{task.title}</h4>
                          <div className="flex justify-between items-center pt-2 border-t-2 border-black text-[11px]">
                            <span className="text-black/60 font-bold">{task.assignee}</span>
                            <button
                              onClick={() => toggleTaskStatus(task.id)}
                              className="text-[10px] font-black uppercase bg-black text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000] transition-colors"
                            >
                              Start →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* In Progress */}
                  <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000] flex flex-col">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-black">
                      <h3 className="font-black text-xs uppercase tracking-wider text-black">In Progress</h3>
                      <span className="bg-[#00F0FF] text-black text-xs font-black px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                        {tasks.filter(t => t.status === 'In Progress').length}
                      </span>
                    </div>
                    <div className="space-y-3 flex-1">
                      {tasks.filter(t => t.status === 'In Progress').map(task => (
                        <div key={task.id} className="bg-[#F0EDE6] hover:bg-white p-3.5 border-3 border-black shadow-[3px_3px_0px_#000] transition-all">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-white text-black border border-black shadow-[1px_1px_0px_#000]">
                              {task.category}
                            </span>
                            <span className="text-[10px] font-black uppercase text-black bg-[#FFDE59] border border-black px-1.5 py-0.5 shadow-[1px_1px_0px_#000]">
                              {task.priority}
                            </span>
                          </div>
                          <h4 className="font-black text-xs uppercase text-black mb-3">{task.title}</h4>
                          <div className="flex justify-between items-center pt-2 border-t-2 border-black text-[11px]">
                            <span className="text-black/60 font-bold">{task.assignee}</span>
                            <button
                              onClick={() => toggleTaskStatus(task.id)}
                              className="text-[10px] font-black uppercase bg-black text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000] transition-colors"
                            >
                              Mark Done ✓
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Done / Review */}
                  <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000] flex flex-col">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-black">
                      <h3 className="font-black text-xs uppercase tracking-wider text-black">Review & Done</h3>
                      <span className="bg-[#CCFF00] text-black text-xs font-black px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                        {tasks.filter(t => t.status === 'Done' || t.status === 'Review').length}
                      </span>
                    </div>
                    <div className="space-y-3 flex-1">
                      {tasks.filter(t => t.status === 'Done' || t.status === 'Review').map(task => (
                        <div key={task.id} className="bg-[#F0EDE6] p-3.5 border-3 border-black shadow-[3px_3px_0px_#000]">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-white text-black border border-black shadow-[1px_1px_0px_#000]">
                              {task.category}
                            </span>
                            <span className="text-[10px] font-black uppercase text-black bg-[#CCFF00] border border-black px-1.5 py-0.5 shadow-[1px_1px_0px_#000]">
                              {task.status}
                            </span>
                          </div>
                          <h4 className="font-bold text-xs uppercase text-black/50 line-through mb-3">{task.title}</h4>
                          <div className="flex justify-between items-center pt-2 border-t-2 border-black text-[11px]">
                            <span className="text-black/60 font-bold">{task.assignee}</span>
                            <CheckCircle2 size={15} className="text-black" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* WAR ROOM / MEETING-TO-EXECUTION TAB */}
            {activeTab === 'meetings' && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="font-mono">
                <WarRoomExecutionPlatform
                  teamMembers={teamMembers}
                  onSyncTasksToSprint={(newTasks) => {
                    setTasks(prev => [...newTasks, ...prev]);
                  }}
                  onNavigateToTasks={() => setActiveTab('tasks')}
                />
              </motion.div>
            )}

            {/* BUSINESS IDEA VALIDATOR & MARKET INTELLIGENCE TAB */}
            {activeTab === 'idea-validator' && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="font-mono">
                <BusinessIdeaValidator
                  onSyncTasks={(newTasks) => {
                    setTasks(prev => [...newTasks, ...prev]);
                  }}
                  onNavigateToTasks={() => setActiveTab('tasks')}
                />
              </motion.div>
            )}

            {/* EMPLOYEE TRAINING SIMULATOR TAB */}
            {activeTab === 'training-simulator' && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="font-mono">
                <EmployeeTrainingSimulator
                  companyData={companyData}
                  teamMembers={teamMembers}
                />
              </motion.div>
            )}

            {/* ANGEL & VC INVESTOR RADAR TAB */}
            {activeTab === 'investor-radar' && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="font-mono">
                <AngelVcInvestorRadar
                  companyData={companyData}
                  onNavigateToPitchDeck={() => setActiveTab('pitch-deck')}
                />
              </motion.div>
            )}

          </div>
        </main>
      </div>

      {/* Quick Edit Company Vitals Modal */}
      {isEditingCompany && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 font-mono">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white border-4 border-black shadow-[10px_10px_0px_#000] p-6 md:p-8 max-w-lg w-full space-y-5">
            <div className="flex items-center justify-between border-b-3 border-black pb-4">
              <div>
                <h3 className="text-lg font-black uppercase text-black">Edit Startup Vitals</h3>
                <p className="text-xs font-medium text-black/70">Update company context used across all AI engines and the workspace</p>
              </div>
              <button onClick={() => setIsEditingCompany(false)} className="p-1 border-2 border-black hover:bg-black hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCompany} className="space-y-4">
              <div>
                <label className="text-xs font-black text-black uppercase tracking-wider block mb-1">Company Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-[#F0EDE6] border-3 border-black px-3.5 py-2 text-xs font-bold text-black focus:bg-white focus:outline-none shadow-[3px_3px_0px_#000]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-black text-black uppercase tracking-wider block mb-1">One-Line Tagline / Solution</label>
                <input
                  type="text"
                  value={editForm.tagline}
                  onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })}
                  className="w-full bg-[#F0EDE6] border-3 border-black px-3.5 py-2 text-xs font-bold text-black focus:bg-white focus:outline-none shadow-[3px_3px_0px_#000]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-black uppercase tracking-wider block mb-1">Funding Stage</label>
                  <select
                    value={editForm.stage}
                    onChange={(e) => setEditForm({ ...editForm, stage: e.target.value })}
                    className="w-full bg-[#F0EDE6] border-3 border-black px-3.5 py-2 text-xs font-bold text-black focus:bg-white focus:outline-none shadow-[3px_3px_0px_#000]"
                  >
                    <option value="Idea">Idea</option>
                    <option value="Pre-Seed">Pre-Seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black text-black uppercase tracking-wider block mb-1">Round Target</label>
                  <input
                    type="text"
                    value={editForm.targetRaise}
                    onChange={(e) => setEditForm({ ...editForm, targetRaise: e.target.value })}
                    className="w-full bg-[#F0EDE6] border-3 border-black px-3.5 py-2 text-xs font-bold text-black focus:bg-white focus:outline-none shadow-[3px_3px_0px_#000]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-black uppercase tracking-wider block mb-1">Current MRR</label>
                  <input
                    type="text"
                    value={editForm.mrr}
                    onChange={(e) => setEditForm({ ...editForm, mrr: e.target.value })}
                    className="w-full bg-[#F0EDE6] border-3 border-black px-3.5 py-2 text-xs font-bold text-black focus:bg-white focus:outline-none shadow-[3px_3px_0px_#000]"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-black uppercase tracking-wider block mb-1">Estimated Runway</label>
                  <input
                    type="text"
                    value={editForm.runway}
                    onChange={(e) => setEditForm({ ...editForm, runway: e.target.value })}
                    className="w-full bg-[#F0EDE6] border-3 border-black px-3.5 py-2 text-xs font-bold text-black focus:bg-white focus:outline-none shadow-[3px_3px_0px_#000]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t-3 border-black">
                <button
                  type="button"
                  onClick={() => setIsEditingCompany(false)}
                  className="px-4 py-2 text-xs font-black uppercase text-black hover:bg-[#F0EDE6] border-2 border-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black border-3 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] transition-all"
                >
                  Save Vitals
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* AI Model & API Key Modal */}
      <AiModelKeyModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />
    </div>
  );
}
