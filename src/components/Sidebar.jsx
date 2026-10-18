import { Link, useLocation } from 'react-router-dom';
import { 
  Home, BookOpen, Code, FileText, Briefcase, 
  Building, Calendar, HelpCircle, Layers, Library,
  LayoutTemplate, Server, Target, MessageSquare, 
  BarChart, Search, GraduationCap, Swords, Trophy,
  X, Terminal, Sparkles, Bot, Medal, UserPlus, Megaphone, SearchCheck, Rocket, GitPullRequest
} from 'lucide-react';

const navSections = [
  {
    label: 'Core',
    items: [
      { name: 'Home', path: '/', icon: Home },
      { name: 'hypers Workspace', path: '/ide', icon: Terminal },
      { name: 'Bite-Sized Codebase', path: '/bite-sized-codebase', icon: GitPullRequest, badge: 'NEW' },
    ]
  },
  {
    label: 'Compete',
    items: [
      { name: 'Contests', path: '/contests', icon: Medal },
      { name: 'Coding Practice', path: '/practice', icon: Code },
      { name: 'Bite-Sized Codebase', path: '/bite-sized-codebase', icon: GitPullRequest },
      { name: 'Coding Royale', path: '/royale', icon: Swords },
      { name: 'Hackathon Strategy', path: '/events', icon: Trophy },
    ]
  },
  {
    label: 'Learn',
    items: [
      { name: 'Language Fundamentals', path: '/fundamentals', icon: BookOpen },
      { name: 'CS Subjects', path: '/cs-subjects', icon: Layers },
      { name: 'Notes Library', path: '/notes', icon: Library },
      { name: 'Interactive Quizzes', path: '/quizzes', icon: HelpCircle },
      { name: 'LLD Questions', path: '/lld', icon: Server },
      { name: 'Projects', path: '/projects', icon: LayoutTemplate },
    ]
  },
  {
    label: 'Career',
    items: [
      { name: 'AI Mock Interviews', path: '/mock-interviews', icon: Bot },
      { name: 'AI Resume Editor', path: '/resume', icon: FileText },
      { name: 'Aptitude Questions', path: '/aptitude', icon: Target },
      { name: 'Mass Recruitment', path: '/recruitment', icon: Briefcase },
      { name: 'Company Database', path: '/companies', icon: Building },
      { name: 'AI Study Planner', path: '/planner', icon: Calendar },
      { name: 'Interview QA', path: '/interview-qa', icon: MessageSquare },
      { name: 'Magic Companies', path: '/magic-companies', icon: Search },
    ]
  },
  {
    label: 'Insights',
    items: [
      { name: 'Analytics', path: '/analytics', icon: BarChart },
      { name: 'Quiz Dashboard', path: '/dashboard', icon: Target },
      { name: 'Cold DMs', path: '/cold-dms', icon: FileText },
    ]
  }
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <aside className="w-[270px] bg-[#F0EDE6] border-r-4 border-black hidden md:flex flex-col h-full overflow-hidden relative font-mono shadow-[4px_0px_0px_#000] z-20">
      
      {/* Sidebar Control Header */}
      <div className="p-3.5 flex items-center justify-between border-b-4 border-black bg-white select-none">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-black bg-[#CCFF00] border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
            WORKSPACE
          </span>
          <span className="text-[11px] font-black text-gray-600 uppercase">// MODULES</span>
        </div>
        <button 
          onClick={() => setIsOpen(false)} 
          className="w-7 h-7 bg-white border-2 border-black flex items-center justify-center text-black hover:bg-[#FF0033] hover:text-white shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          title="Collapse Sidebar"
        >
          <X size={14} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 relative z-10 space-y-4">
        {navSections.map((section, sIdx) => (
          <div key={section.label}>
            {/* Section Header */}
            <div className="px-1 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-black bg-[#FFDE59] border border-black px-2 py-0.5 inline-block shadow-[1px_1px_0px_#000]">
                [ {section.label} ]
              </span>
            </div>
            
            {/* Section Items */}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center justify-between px-2.5 py-1.5 text-xs font-mono font-black uppercase transition-all ${
                      isActive 
                        ? 'bg-black text-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] translate-x-1' 
                        : 'text-black bg-white/60 hover:bg-[#FFDE59] border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_#000]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-6 h-6 border border-black flex items-center justify-center shrink-0 ${isActive ? 'bg-[#FFDE59] text-black' : 'bg-white text-black'}`}>
                        <Icon size={12} />
                      </div>
                      <span className="truncate text-[11px]">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.badge && !isActive && (
                        <span className="text-[8px] font-black bg-[#CCFF00] text-black border border-black px-1.5 py-0.2 shadow-[1px_1px_0px_#000]">
                          {item.badge}
                        </span>
                      )}
                      {isActive && <span className="text-[9px] text-[#CCFF00]">►</span>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Status Ticker */}
      <div className="p-3 border-t-4 border-black bg-white select-none">
        <div className="flex items-center justify-between text-[10px] font-black uppercase">
          <span className="flex items-center gap-1.5 text-black">
            <span className="w-2 h-2 bg-[#CCFF00] border border-black animate-pulse" />
            TELEMETRY ONLINE
          </span>
          <span className="px-1.5 py-0.5 bg-black text-[#00F0FF] border border-black">
            v2.6
          </span>
        </div>
      </div>
    </aside>
  );
}
