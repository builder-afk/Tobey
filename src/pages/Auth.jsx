import { useState } from 'react';
import { Github, Mail, Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck, Zap, Terminal, Sparkles, CheckSquare, Square } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({
      name: isLogin ? (email.split('@')[0] || 'Alpha Operator') : (fullName || 'Alpha Operator'),
      email: email || 'operator@hypers.sh',
      role: 'Level-4 Operator',
      status: 'VERIFIED'
    }));
    window.location.href = '/practice';
  };

  const handleSocialAuth = (provider) => {
    localStorage.setItem('user', JSON.stringify({
      name: provider === 'GitHub' ? 'Octocat Operator' : 'Google Developer',
      email: `${provider.toLowerCase()}-operator@hypers.sh`,
      role: `${provider} Authenticated`,
      status: 'VERIFIED'
    }));
    window.location.href = '/practice';
  };

  const handleDemoLogin = () => {
    setEmail('operator@hypers.sh');
    setPassword('••••••••••••');
    localStorage.setItem('user', JSON.stringify({
      name: 'Alpha Operator',
      email: 'operator@hypers.sh',
      role: 'Staff Systems Architect',
      status: 'VERIFIED'
    }));
    setTimeout(() => {
      window.location.href = '/practice';
    }, 250);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col justify-center items-center py-10 px-4 md:px-8 font-mono select-none">
      
      {/* ═══ TERMINAL MAINFRAME CONTAINER ═══ */}
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Terminal Titlebar */}
        <div className="bg-black text-white px-4 py-2.5 border-4 border-black flex items-center justify-between shadow-[8px_8px_0px_#000]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#CCFF00] border border-black animate-pulse" />
            <span className="font-mono font-black text-xs tracking-wider text-[#FFDE59] uppercase">
              // HYPERS SECURITY // PROTOCOL: AUTH-V2.6 // GATEWAY
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black">
            <span className="px-1.5 py-0.5 bg-[#222] text-[#AAA] border border-[#444] cursor-default">[ _ ]</span>
            <span className="px-1.5 py-0.5 bg-[#222] text-[#AAA] border border-[#444] cursor-default">[ ▢ ]</span>
            <span className="px-1.5 py-0.5 bg-[#FF0033] text-white border border-black cursor-default">[ ✕ ]</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="bg-white border-4 border-t-0 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-stretch">
            
            {/* ═══ LEFT PANEL: PROTOCOL DOSSIER ═══ */}
            <div className="lg:col-span-5 flex flex-col justify-between border-b-4 lg:border-b-0 lg:border-r-4 border-black pb-8 lg:pb-0 lg:pr-8">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FFDE59] border-2 border-black text-black font-black text-[11px] uppercase tracking-wider shadow-[2px_2px_0px_#000] mb-4">
                  <Terminal size={12} className="stroke-[3]" />
                  <span>[ ACCESS PROTOCOL // LEVEL 4 ]</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight leading-none mb-3">
                  OPERATOR
                  <span className="block bg-[#CCFF00] text-black px-2 py-0.5 border-3 border-black shadow-[3px_3px_0px_#000] w-max mt-1">
                    CLEARANCE
                  </span>
                </h1>

                <p className="text-xs text-gray-700 font-bold uppercase leading-relaxed mt-4 bg-[#F0EDE6] border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                  // AUTHENTICATE TO RUN ULTRA-LOW-LATENCY SUB-MS SANDBOXES, ENTER CODING ROYALE, AND TAP INTO FAANG & STARTUP HIRING CHANNELS.
                </p>

                {/* Telemetry Metrics */}
                <div className="mt-6 space-y-2 text-xs font-black uppercase">
                  <div className="flex items-center justify-between p-2 bg-[#FBF9F5] border-2 border-black">
                    <span className="text-gray-600">// ARENAS ACTIVE</span>
                    <span className="bg-black text-[#00F0FF] px-1.5 py-0.5 text-[10px]">24 TRACKS</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#FBF9F5] border-2 border-black">
                    <span className="text-gray-600">// ACTIVE OPERATORS</span>
                    <span className="bg-[#CCFF00] text-black px-1.5 py-0.5 text-[10px] border border-black">24,858+</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#FBF9F5] border-2 border-black">
                    <span className="text-gray-600">// ENCRYPTION</span>
                    <span className="bg-black text-[#FFDE59] px-1.5 py-0.5 text-[10px]">SHA-256</span>
                  </div>
                </div>
              </div>

              {/* Bottom Security Badge */}
              <div className="mt-6 pt-4 border-t-2 border-dashed border-black">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-700 uppercase">
                  <ShieldCheck size={14} className="stroke-[3] text-black shrink-0" />
                  <span>ZERO-TRUST SANDBOX ISOLATION ACTIVATED</span>
                </div>
              </div>
            </div>

            {/* ═══ RIGHT PANEL: AUTHENTICATION FORM ═══ */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* Mode Toggle Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#F0EDE6] border-3 border-black shadow-[3px_3px_0px_#000] mb-6">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`py-2 px-3 font-mono font-black text-xs uppercase transition-all ${
                    isLogin
                      ? 'bg-[#FFDE59] text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                      : 'bg-transparent text-gray-600 hover:text-black'
                  }`}
                >
                  [ SIGN IN ]
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`py-2 px-3 font-mono font-black text-xs uppercase transition-all ${
                    !isLogin
                      ? 'bg-[#CCFF00] text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                      : 'bg-transparent text-gray-600 hover:text-black'
                  }`}
                >
                  [ REGISTER ]
                </button>
              </div>

              {/* Main Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name / Callsign (Only for Sign Up) */}
                {!isLogin && (
                  <div>
                    <label className="block text-xs font-black text-black uppercase mb-1">
                      [ 01 // OPERATOR CALLSIGN ]
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                        <User size={16} className="stroke-[3]" />
                      </div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#FBF9F5] border-3 border-black text-black font-mono font-bold text-xs uppercase py-3 pl-10 pr-3 focus:bg-[#FFFFE0] focus:shadow-[4px_4px_0px_#000] outline-none transition-all placeholder:text-gray-400 placeholder:normal-case"
                        placeholder="e.g. Satoshi Nakamoto"
                      />
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-black text-black uppercase mb-1">
                    [ {isLogin ? '01' : '02'} // OPERATOR EMAIL ]
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                      <Mail size={16} className="stroke-[3]" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FBF9F5] border-3 border-black text-black font-mono font-bold text-xs py-3 pl-10 pr-3 focus:bg-[#FFFFE0] focus:shadow-[4px_4px_0px_#000] outline-none transition-all placeholder:text-gray-400"
                      placeholder="operator@hypers.sh"
                    />
                  </div>
                </div>

                {/* Password / Access Key */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-black text-black uppercase">
                      [ {isLogin ? '02' : '03'} // ACCESS KEY ]
                    </label>
                    {isLogin && (
                      <span className="text-[10px] font-black uppercase text-gray-500 hover:text-black cursor-pointer underline">
                        FORGOT KEY?
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                      <Lock size={16} className="stroke-[3]" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#FBF9F5] border-3 border-black text-black font-mono font-bold text-xs py-3 pl-10 pr-10 focus:bg-[#FFFFE0] focus:shadow-[4px_4px_0px_#000] outline-none transition-all placeholder:text-gray-400"
                      placeholder="••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black p-0.5"
                    >
                      {showPassword ? <EyeOff size={16} className="stroke-[2.5]" /> : <Eye size={16} className="stroke-[2.5]" />}
                    </button>
                  </div>
                </div>

                {/* Remember Session Checkbox */}
                <div className="flex items-center justify-between text-xs font-black uppercase pt-1">
                  <label 
                    onClick={() => setRememberMe(!rememberMe)}
                    className="flex items-center gap-2 cursor-pointer select-none text-gray-800 hover:text-black"
                  >
                    {rememberMe ? (
                      <CheckSquare size={16} className="text-black stroke-[3] fill-[#CCFF00]" />
                    ) : (
                      <Square size={16} className="text-black stroke-[3]" />
                    )}
                    <span>PERSIST OPERATOR SESSION</span>
                  </label>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#CCFF00] hover:bg-[#FFDE59] border-3 border-black text-black font-mono font-black text-xs sm:text-sm uppercase flex items-center justify-center gap-2 shadow-[4px_4px_0px_#000] hover:shadow-[7px_7px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all mt-2 cursor-pointer"
                >
                  <span>{isLogin ? '[ AUTHENTICATE OPERATOR ]' : '[ INITIALIZE OPERATOR ACCOUNT ]'}</span>
                  <ArrowRight size={16} className="stroke-[3]" />
                </button>
              </form>

              {/* Brutalist Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-black border-dashed"></div>
                </div>
                <span className="relative px-3 bg-white text-gray-600 text-[10px] font-black uppercase tracking-wider">
                  // OR FEDERATE IDENTITY //
                </span>
              </div>

              {/* Social OAuth Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => handleSocialAuth('GitHub')}
                  className="py-2.5 px-3 bg-white hover:bg-[#00F0FF] border-2 border-black text-black font-black text-xs uppercase flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <Github size={16} className="stroke-[2.5]" />
                  <span>GITHUB</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialAuth('Google')}
                  className="py-2.5 px-3 bg-white hover:bg-[#FFDE59] border-2 border-black text-black font-black text-xs uppercase flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                    </g>
                  </svg>
                  <span>GOOGLE</span>
                </button>
              </div>

              {/* ⚡ One-Click Demo Operator Access */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 px-3 bg-[#F0EDE6] hover:bg-black hover:text-[#CCFF00] border-2 border-black border-dashed font-black text-xs uppercase flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <Zap size={14} className="stroke-[3] text-amber-500" />
                <span>[ ⚡ INSTANT ACCESS // GUEST TEST OPERATOR ]</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom System Ticker */}
        <div className="bg-black text-[#FFDE59] p-2.5 border-4 border-t-0 border-black flex items-center justify-between text-[10px] font-black uppercase shadow-[8px_8px_0px_#000]">
          <span>// STATUS: READY FOR DISPATCH</span>
          <span className="hidden sm:inline">// REASONING ENGINES ACTIVE // HYPERS NET</span>
          <span>v2.6 // PROD</span>
        </div>
      </div>
    </div>
  );
}