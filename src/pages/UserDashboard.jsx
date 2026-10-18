import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Building, Briefcase, Code, Target, Zap, ArrowRight,
  Pencil, Plus, Rocket, Globe, FileText, CheckCircle2,
  Lightbulb, Users, Shield, ChevronRight, Hexagon, Sparkles, LogOut,
  Key, Cpu, Bot, Settings, RefreshCw, Trash2, ExternalLink, AlertTriangle
} from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';
import AiModelKeyModal from '../components/AiModelKeyModal';
import { getAiConfig, deleteAiConfig } from '../utils/aiConfig';

const ROLE_MAP = {
  engineer: { label: 'Software Engineer', icon: Code, color: 'blue' },
  designer: { label: 'UI/UX Designer', icon: Zap, color: 'pink' },
  founder: { label: 'Business / Founder', icon: Briefcase, color: 'amber' },
  pm: { label: 'Product Manager', icon: Target, color: 'purple' },
  systems_engineer: { label: 'Core Systems & Kernel Engineer', icon: Code, color: 'blue' },
  ai_architect: { label: 'Agentic AI & MLOps Architect', icon: Zap, color: 'purple' },
  fullstack: { label: 'Full-Stack Protocol Engineer', icon: Code, color: 'yellow' },
  founder_cto: { label: 'Technical Founder / CTO', icon: Rocket, color: 'red' },
  fde: { label: 'Forward Deployed Engineer (FDE)', icon: Target, color: 'cyan' },
  security_lead: { label: 'Security & Red-Teaming Lead', icon: Shield, color: 'emerald' },
};

const fadeUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

export default function UserDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [company, setCompany] = useState(null);
  const [aiConfig, setAiConfig] = useState(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedProfile = localStorage.getItem('pitch_user_profile');
    const savedCompany = localStorage.getItem('pitch_user_company');
    if (savedProfile) {
      try { setProfile(JSON.parse(savedProfile)); } catch(e) {}
    }
    if (savedCompany) {
      try { setCompany(JSON.parse(savedCompany)); } catch(e) {}
    }

    // Load AI config and listen for live updates
    const updateAi = () => setAiConfig(getAiConfig());
    updateAi();
    window.addEventListener('hypers_ai_config_updated', updateAi);
    return () => window.removeEventListener('hypers_ai_config_updated', updateAi);
  }, []);

  const roleInfo = profile ? ROLE_MAP[profile.role] : null;

  return (
    <div 
      className="min-h-screen bg-[#F0EDE6] text-black font-mono selection:bg-[#FFDE59] selection:text-black flex flex-col"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* Hero Header */}
      <div className="bg-[#FFDE59] border-b-4 border-black py-10 px-6 shadow-[0_4px_0px_#000] relative select-none">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#00F0FF] border-2 border-black font-mono font-black text-xs uppercase mb-3 shadow-[2px_2px_0px_#000]">
            <Shield size={14} />
            [ OPERATING DOSSIER // USER DASHBOARD ]
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black mb-2">
            WELCOME BACK{profile ? `, [ ${roleInfo?.label?.toUpperCase() || 'CREATOR'} ]` : ' [ FOUNDER // OPERATOR ]'}
          </h1>
          <p className="text-black text-xs md:text-sm font-bold uppercase tracking-wider max-w-2xl leading-relaxed">
            Manage your applicant dossier, enterprise company registry, and talent recruitment protocols.
          </p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-6xl mx-auto px-6 py-10 w-full relative z-10 flex-1">

        {/* ─── AI Model Gateway & API Key Section ─── */}
        <motion.div {...fadeUp} className="mb-8 bg-white border-4 border-black p-6 sm:p-7 shadow-[8px_8px_0px_#000] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b-3 border-black">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-black text-[#00F0FF] px-2.5 py-1 text-xs font-black uppercase flex items-center gap-1.5 border border-black shadow-[2px_2px_0px_#000]">
                  <Key size={13} className="text-[#00F0FF]" />
                  <span>FOUNDER WORKSPACE AI GATEWAY</span>
                </span>
                {aiConfig ? (
                  <span className="bg-[#CCFF00] text-black border border-black px-2 py-0.5 text-xs font-black uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_#000]">
                    <span className="w-2 h-2 bg-[#10A37F] border border-black animate-pulse" />
                    CONNECTED: {aiConfig.providerName}
                  </span>
                ) : (
                  <span className="bg-[#FF0033] text-white border border-black px-2 py-0.5 text-xs font-black uppercase flex items-center gap-1 shadow-[2px_2px_0px_#000]">
                    <AlertTriangle size={12} />
                    NO API KEY CONNECTED
                  </span>
                )}
                <span className="bg-[#FFDE59] text-black border border-black px-2 py-0.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                  BYOK ARCHITECTURE
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight">
                {aiConfig ? (
                  <span>ACTIVE MODEL // <span className="bg-[#FFDE59] px-2 py-0.5 border-2 border-black">{aiConfig.modelName || aiConfig.modelId}</span></span>
                ) : (
                  <span>CONNECT YOUR API KEY & AI MODEL</span>
                )}
              </h2>

              <p className="text-xs font-bold text-gray-700 leading-relaxed max-w-2xl">
                {aiConfig ? (
                  `Your Founder Workspace is actively powered by ${aiConfig.providerName} (${aiConfig.modelName}). All 9 AI Venture Studio engines (Pitch Analyzer, Valuation Scorecard, Startup Roadmap, Investor Interview Sim) use your connected key directly.`
                ) : (
                  "To enable the Founder Workspace engines (AI Pitch Analyzer, Startup Evaluation, Pitch Deck Auditor, 90-Day Roadmap, and Live Interview Sim), connect your OpenAI, Anthropic, Gemini, Groq, DeepSeek, or local Ollama API key and model."
                )}
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="px-5 py-3 bg-[#CCFF00] hover:bg-[#b8f000] text-black border-3 border-black text-xs font-black uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Settings size={14} />
                <span>{aiConfig ? 'MANAGE KEY & MODEL' : 'CONNECT API KEY & MODEL'}</span>
              </button>

              <Link
                to="/pitch"
                className="px-5 py-3 bg-black hover:bg-neutral-800 text-[#FFDE59] border-3 border-black text-xs font-black uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Rocket size={14} />
                <span>LAUNCH WORKSPACE</span>
              </Link>
            </div>
          </div>

          {/* Connected Metrics / Provider Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-[10px] font-black uppercase text-gray-500">SUPPORTED PROVIDERS:</span>
              {['OpenAI', 'Anthropic Claude', 'Google Gemini', 'DeepSeek', 'Groq LPU', 'Ollama Local', 'OpenRouter', 'Mistral'].map((p) => (
                <span
                  key={p}
                  className={`px-2 py-0.5 text-[10px] font-black uppercase border border-black ${
                    aiConfig?.providerName?.toLowerCase()?.includes(p.toLowerCase().split(' ')[0])
                      ? 'bg-black text-[#CCFF00] shadow-[1px_1px_0px_#000]'
                      : 'bg-[#FAF8F5] text-black/75'
                  }`}
                >
                  {p}
                </span>
              ))}
            </div>

            {aiConfig && (
              <div className="flex items-center gap-3 text-[11px] font-black uppercase text-gray-600">
                <span>LATENCY: <strong className="text-black">{aiConfig.latency || 'Verified'}</strong></span>
                <span>•</span>
                <span>STATUS: <strong className="text-emerald-700">ONLINE</strong></span>
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ─── Applicant Profile Card ─── */}
          <motion.div {...fadeUp} className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] overflow-hidden flex flex-col justify-between">
            {profile && profile.role ? (
              <>
                {/* Header banner */}
                <div className="h-24 bg-black border-b-4 border-black p-4 relative flex items-center justify-between">
                  <div className="w-16 h-16 bg-[#00F0FF] border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-black">
                    <User size={32} />
                  </div>
                  <div className="bg-[#CCFF00] border-2 border-black text-black text-xs font-black px-3 py-1 uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> ACTIVE PROFILE
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  {/* Role & Experience */}
                  <div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">
                      // DOSSIER IDENTIFIER
                    </span>
                    <h3 className="text-2xl font-black text-black uppercase tracking-tight">Applicant Profile</h3>
                    <p className="text-black font-black text-xs uppercase mt-1 px-2 py-0.5 bg-[#FFDE59] border border-black inline-block">
                      {roleInfo?.label || profile.role} // {profile.experience}
                    </p>
                  </div>

                  {/* AI Summary */}
                  <div>
                    <h4 className="text-xs font-black text-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <FileText size={14} /> [ AI-GENERATED SUMMARY ]
                    </h4>
                    <p className="text-xs text-gray-800 leading-relaxed font-bold bg-[#FBF9F5] p-4 border-2 border-black shadow-[2px_2px_0px_#000]">
                      A driven {roleInfo?.label?.toLowerCase() || 'professional'} with experience spanning {profile.experience?.toLowerCase()}. Specializes in {profile.skills?.slice(0, 3).join(', ')}. Currently focused on {profile.idea?.toLowerCase() || 'new ideas'} and seeking {profile.lookingFor?.toLowerCase() || 'teammates'}.
                    </p>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="text-xs font-black text-black uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Zap size={14} /> [ VALIDATED SKILLS ]
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills?.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white text-black text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Vision */}
                  {profile.idea && (
                    <div>
                      <h4 className="text-xs font-black text-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Lightbulb size={14} /> [ PROJECT VISION ]
                      </h4>
                      <p className="text-xs text-gray-800 font-bold bg-[#FFFDE8] p-3 border-2 border-black">
                        {profile.idea}
                      </p>
                    </div>
                  )}

                  {/* Edit CTA */}
                  <div className="pt-4 border-t-2 border-black">
                    <Link
                      to="/build-profile"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-[#CCFF00] text-black font-black uppercase border-3 border-black shadow-[3px_3px_0px_#000] hover:bg-black hover:text-[#CCFF00] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs"
                    >
                      <Pencil size={15} /> [ EDIT PROFILE DOSSIER ]
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="p-10 flex flex-col items-center justify-center text-center min-h-[440px]">
                <div className="w-20 h-20 bg-[#00F0FF] border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center mb-6">
                  <User size={36} className="text-black" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-black mb-2">
                  No Applicant Profile Yet
                </h3>
                <p className="text-gray-700 text-xs font-bold uppercase tracking-wider mb-8 max-w-sm leading-relaxed">
                  Build your dossier so founders and venture builders can discover your skills and invite you to core execution pods.
                </p>
                <Link
                  to="/build-profile"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#CCFF00] text-black border-3 border-black font-black text-sm uppercase shadow-[5px_5px_0px_#000] hover:bg-black hover:text-[#CCFF00] active:translate-x-1 active:translate-y-1 transition-all"
                >
                  <Plus size={18} /> [ + BUILD YOUR PROFILE ]
                </Link>
              </div>
            )}
          </motion.div>

          {/* ─── Company Profile Card ─── */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] overflow-hidden flex flex-col justify-between">
            {company && company.name ? (
              <>
                {/* Header banner */}
                <div className="h-24 bg-black border-b-4 border-black p-4 relative flex items-center justify-between">
                  <div className="w-16 h-16 bg-[#FFDE59] border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-black font-black text-2xl">
                    {company.name.charAt(0)}
                  </div>
                  <div className="bg-[#00F0FF] border-2 border-black text-black text-xs font-black px-3 py-1 uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> VENTURE REGISTERED
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">
                      // VENTURE REGISTRY
                    </span>
                    <h3 className="text-2xl font-black text-black uppercase tracking-tight">{company.name}</h3>
                    <p className="text-gray-700 text-xs font-bold uppercase mt-1">{company.tagline}</p>
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-[#FFF0F0] p-4 border-2 border-black shadow-[2px_2px_0px_#000]">
                      <h4 className="text-[11px] font-black text-[#FF0033] mb-1.5 uppercase tracking-wider flex items-center gap-1">
                        <Target size={12} /> [ PROBLEM ]
                      </h4>
                      <p className="text-xs text-gray-800 leading-relaxed font-bold line-clamp-3">{company.problem}</p>
                    </div>
                    <div className="bg-[#FFFDE8] p-4 border-2 border-black shadow-[2px_2px_0px_#000]">
                      <h4 className="text-[11px] font-black text-black mb-1.5 uppercase tracking-wider flex items-center gap-1">
                        <Lightbulb size={12} /> [ SOLUTION ]
                      </h4>
                      <p className="text-xs text-gray-800 leading-relaxed font-bold line-clamp-3">{company.solution}</p>
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div>
                    <h4 className="text-xs font-black text-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Users size={14} /> [ TARGET AUDIENCE ]
                    </h4>
                    <span className="inline-block px-3 py-1 bg-white text-black text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000]">
                      {company.targetAudience}
                    </span>
                  </div>

                  {/* Website */}
                  {company.website && (
                    <div>
                      <h4 className="text-xs font-black text-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Globe size={14} /> [ VENTURE URL ]
                      </h4>
                      <a href={company.website} target="_blank" rel="noreferrer" className="text-xs text-black font-bold uppercase underline break-all">
                        {company.website}
                      </a>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-4 border-t-2 border-black flex gap-3">
                    <Link
                      to="/create-company"
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border-2 border-black text-black font-black uppercase hover:bg-[#FFDE59] transition-colors text-xs shadow-[2px_2px_0px_#000]"
                    >
                      <Pencil size={14} /> [ EDIT VENTURE ]
                    </Link>
                    <Link
                      to="/pitch"
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FF5722] text-white font-black uppercase border-3 border-black shadow-[3px_3px_0px_#000] hover:bg-black hover:text-[#FF5722] transition-colors text-xs"
                    >
                      <Rocket size={14} /> [ WORKSPACE ]
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="p-10 flex flex-col items-center justify-center text-center min-h-[440px]">
                <div className="w-20 h-20 bg-[#FFDE59] border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center mb-6">
                  <Building size={36} className="text-black" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-black mb-2">
                  No Company Registered
                </h3>
                <p className="text-gray-700 text-xs font-bold uppercase tracking-wider mb-8 max-w-sm leading-relaxed">
                  Register your startup so you can launch talent campaigns, run simulated investor interviews, and access venture engines.
                </p>
                <Link
                  to="/create-company"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF0033] text-white border-3 border-black font-black text-sm uppercase shadow-[5px_5px_0px_#000] hover:bg-black hover:text-[#FF0033] active:translate-x-1 active:translate-y-1 transition-all"
                >
                  <Plus size={18} /> [ + REGISTER COMPANY ]
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="mt-8 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
          <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-black"></div>
              <h3 className="text-xs font-black text-black uppercase tracking-wider">
                [ SYSTEM ACCESS // QUICK PROTOCOLS ]
              </h3>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('user');
                window.location.href = '/';
              }}
              className="px-3 py-1 bg-[#FF0033] text-white text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-black transition-colors flex items-center gap-1.5"
            >
              <LogOut size={13} /> [ SIGN OUT ]
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/explore"
              className="flex items-center gap-3 p-4 bg-[#FBF9F5] border-3 border-black shadow-[3px_3px_0px_#000] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#000] transition-all group"
            >
              <div className="w-12 h-12 bg-[#00F0FF] border-2 border-black flex items-center justify-center text-black shrink-0 shadow-[2px_2px_0px_#000]">
                <Sparkles size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black uppercase text-black">Explore Startups</div>
                <div className="text-[11px] text-gray-600 font-bold uppercase truncate">Browse opportunities</div>
              </div>
              <ChevronRight size={16} className="text-black group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/pitch"
              className="flex items-center gap-3 p-4 bg-[#FBF9F5] border-3 border-black shadow-[3px_3px_0px_#000] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#000] transition-all group"
            >
              <div className="w-12 h-12 bg-[#FFDE59] border-2 border-black flex items-center justify-center text-black shrink-0 shadow-[2px_2px_0px_#000]">
                <Rocket size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black uppercase text-black">Recruiting Cockpit</div>
                <div className="text-[11px] text-gray-600 font-bold uppercase truncate">Launch talent campaigns</div>
              </div>
              <ChevronRight size={16} className="text-black group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/practice"
              className="flex items-center gap-3 p-4 bg-[#FBF9F5] border-3 border-black shadow-[3px_3px_0px_#000] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#000] transition-all group"
            >
              <div className="w-12 h-12 bg-[#CCFF00] border-2 border-black flex items-center justify-center text-black shrink-0 shadow-[2px_2px_0px_#000]">
                <Code size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black uppercase text-black">Practice Coding</div>
                <div className="text-[11px] text-gray-600 font-bold uppercase truncate">Sharpen execution skills</div>
              </div>
              <ChevronRight size={16} className="text-black group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* AI Model & API Key Setup Modal */}
      <AiModelKeyModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSaveSuccess={(cfg) => setAiConfig(cfg)}
      />
    </div>
  );
}
