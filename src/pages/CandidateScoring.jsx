import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Briefcase, Github, Globe, Star, 
  Code, GitPullRequest, GitCommit, GitMerge, ShieldCheck, 
  Terminal, ExternalLink, MessageSquare, Calendar,
  Target, CheckCircle2, Zap
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts';
import PublicNavbar from '../components/PublicNavbar';
import { getCandidateById, getScoreColor } from '../data/recruitingData';

export default function CandidateScoring() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  
  const [terminalLines, setTerminalLines] = useState([]);
  
  useEffect(() => {
    // In a real app, fetch from API
    const data = getCandidateById(id || 'cand_1');
    setCandidate(data);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!candidate) return;
    
    // Simulate terminal typing
    const analysisLines = [
      `[SYS] Initiating AI evaluation for ${candidate.name}...`,
      `[ANALYSIS] Deep scanning GitHub repositories (${candidate.github.repos} found)`,
      `[ANALYSIS] Evaluating system design patterns in ${candidate.projects[0]?.name || 'recent projects'}...`,
      `[MATCH] Calculating skill overlap against campaign requirements...`,
      `[RESULT] Match score: ${candidate.scores.overall}/100. ${candidate.scores.overall >= 90 ? 'EXCEPTIONAL FIT' : 'STRONG CANDIDATE'}.`
    ];
    
    let currentLine = 0;
    
    const interval = setInterval(() => {
      if (currentLine < analysisLines.length) {
        setTerminalLines(prev => [...prev, analysisLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    
    return () => clearInterval(interval);
  }, [candidate]);

  if (!candidate) return <div className="min-h-screen bg-[#FCFCFD] flex items-center justify-center"><div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div></div>;

  const sc = getScoreColor(candidate.scores.overall);

  return (
    <div className="min-h-screen bg-[#FCFCFD] font-sans selection:bg-purple-200 selection:text-purple-900 pb-20">
      
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg border border-gray-200 shadow-sm">
                {candidate.avatar}
              </div>
              <div>
                <h1 className="font-bold text-gray-900 leading-tight">{candidate.name}</h1>
                <p className="text-xs font-bold text-gray-500">{candidate.title}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-sm">
              Reject
            </button>
            <button className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-sm text-sm flex items-center gap-2">
              <Calendar size={16} /> Advance to Interview
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* HERO CARDS - 5 CORE SCORES */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className={`col-span-2 bg-gradient-to-br from-${sc.bg.split('-')[1]}-500 to-${sc.bg.split('-')[1]}-700 rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider">AI Overall Match</h3>
                <div className="text-5xl font-black mt-2">{candidate.scores.overall}<span className="text-2xl text-white/60">/100</span></div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm font-bold bg-white/20 w-fit px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <ShieldCheck size={16} /> Verified Profile
              </div>
            </div>
          </div>

          {[
            { label: 'Technical', score: candidate.scores.technical },
            { label: 'Experience', score: candidate.scores.experience },
            { label: 'Skill Match', score: candidate.scores.skillMatch },
            { label: 'Culture Fit', score: candidate.scores.cultureFit },
          ].map(s => {
            const color = getScoreColor(s.score);
            return (
              <div key={s.label} className="bg-white border border-gray-200 rounded-[24px] p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center">{s.label}</h3>
                <div className={`text-3xl font-black text-center mt-3 mb-2 ${color.text}`}>{s.score}</div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div className={`h-full ${color.bar}`} style={{ width: `${s.score}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: RADAR & SKILLS */}
          <div className="lg:col-span-1 space-y-8">
            {/* RADAR CHART */}
            <div className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target size={20} className="text-purple-600"/> Engineering Radar
              </h3>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="65%" data={candidate.skillRadar}>
                    <PolarGrid stroke="#f1f5f9" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                    <Radar name="Score" dataKey="score" stroke="#8b5cf6" strokeWidth={2} fill="#8b5cf6" fillOpacity={0.3} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* SKILLS BREAKDOWN */}
            <div className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Code size={20} className="text-blue-600"/> Skill Match Breakdown
              </h3>
              <div className="space-y-4">
                {Object.entries(candidate.skillMatchBreakdown).map(([skill, score]) => {
                  const color = getScoreColor(score);
                  return (
                    <div key={skill}>
                      <div className="flex justify-between text-sm font-bold mb-1.5">
                        <span className="text-gray-700">{skill}</span>
                        <span className={color.text}>{score}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className={`h-full ${color.bar}`} style={{ width: `${score}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: GITHUB, PROJECTS, TERMINAL */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* TERMINAL AI ANALYSIS */}
            <div className="bg-gray-900 rounded-[32px] p-8 shadow-xl overflow-hidden relative">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-mono text-gray-500 ml-2">sort_ai_evaluator</span>
              </div>
              
              <div className="font-mono text-sm space-y-2 text-gray-300">
                {terminalLines.map((line, i) => {
                  let colorClass = "text-gray-300";
                  if (line.startsWith('[MATCH]')) colorClass = "text-blue-400";
                  if (line.startsWith('[RESULT]')) colorClass = "text-emerald-400 font-bold";
                  
                  return (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }}
                      className={colorClass}
                    >
                      <span className="text-purple-400 mr-2">❯</span> {line}
                    </motion.div>
                  )
                })}
                {terminalLines.length < 5 && (
                  <div className="animate-pulse"><span className="text-purple-400 mr-2">❯</span> _</div>
                )}
              </div>

              {/* Match Reasons injected dynamically after terminal finishes */}
              {terminalLines.length >= 5 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  className="mt-8 pt-6 border-t border-gray-800"
                >
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Star size={16} className="text-emerald-500"/> Key Strengths for this Role
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {candidate.matchReasons.map((reason, i) => (
                      <div key={i} className="flex gap-3 items-start p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50">
                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-gray-300">{reason}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* GITHUB ANALYSIS */}
            <div className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <Github size={20} /> GitHub Analysis
                  </h3>
                  <p className="text-gray-500 font-medium text-sm">Automated code quality & activity scan</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-3xl font-black text-gray-900">{candidate.github.engineeringScore}</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Engineering Score</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-center">
                  <div className="text-2xl font-black text-gray-900">{candidate.github.commits}</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Commits</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-center">
                  <div className="text-2xl font-black text-gray-900">{candidate.github.repos}</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Repos</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-center">
                  <div className="text-2xl font-black text-gray-900">{candidate.github.stars}</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Stars</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-center">
                  <div className="text-2xl font-black text-gray-900 flex items-center justify-center gap-1"><Zap size={16} className="text-amber-500"/> {candidate.github.streak}</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Day Streak</div>
                </div>
              </div>

              {/* Mock Heatmap */}
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Activity Last 6 Months</h4>
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: 156 }).map((_, i) => {
                    const activityLevel = Math.random();
                    let bg = 'bg-gray-100';
                    if (activityLevel > 0.8) bg = 'bg-emerald-500';
                    else if (activityLevel > 0.6) bg = 'bg-emerald-400';
                    else if (activityLevel > 0.3) bg = 'bg-emerald-300';
                    else if (activityLevel > 0.1) bg = 'bg-emerald-200';
                    
                    return (
                      <div key={i} className={`w-3.5 h-3.5 rounded-sm ${bg} border border-black/5`}></div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* PROJECTS */}
            <div className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Briefcase size={20} className="text-orange-500"/> Top Projects Evaluated
              </h3>
              
              <div className="space-y-4">
                {candidate.projects.map((project, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{project.name}</h4>
                        <div className="flex gap-2 mt-2">
                          {project.tech.map(t => <span key={t} className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded-md">{t}</span>)}
                        </div>
                      </div>
                      <div className="flex gap-3 text-center">
                        <div>
                          <div className="text-lg font-black text-gray-900">{project.complexity}</div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase">Complexity</div>
                        </div>
                        <div>
                          <div className="text-lg font-black text-gray-900">{project.scalability}</div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase">Scalability</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {candidate.projects.length === 0 && (
                  <div className="text-center py-8 text-gray-500 font-medium bg-gray-50 rounded-2xl border border-gray-100">
                    No public projects found for evaluation.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
