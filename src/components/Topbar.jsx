import { useState, useEffect } from 'react';
import { Bell, Search, User, Menu, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Topbar({ toggleSidebar, isSidebarOpen }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <header className="h-16 bg-white border-b-4 border-black flex items-center justify-between px-6 sticky top-0 z-10 w-full font-mono shadow-[0_4px_0px_#000] select-none">
      
      <div className="flex items-center gap-4 flex-1">
        {!isSidebarOpen && (
          <button 
            onClick={toggleSidebar} 
            className="w-9 h-9 bg-[#FFDE59] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <Menu size={18} />
          </button>
        )}
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" size={15} />
          <input 
            type="text" 
            placeholder="SEARCH PROBLEMS, COMPANIES, CODES..." 
            className="w-full bg-[#FBF9F5] border-3 border-black py-2 pl-10 pr-4 text-xs font-black uppercase text-black placeholder-gray-500 shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDE8] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button className="relative w-10 h-10 bg-white border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_#000] hover:bg-[#FFDE59] active:translate-x-0.5 active:translate-y-0.5 transition-all">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#FF0033] border border-black" />
        </button>
        
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#FBF9F5] border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000]">
              <div className="w-6 h-6 bg-[#00F0FF] border border-black flex items-center justify-center text-black">
                <User size={13} />
              </div>
              <span className="text-xs font-black uppercase text-black">{user.name}</span>
            </div>
            <Link 
              to="/founder-workspace" 
              className="flex items-center gap-1.5 text-xs font-black uppercase px-3 py-1.5 bg-[#CCFF00] border-2 border-black text-black shadow-[2px_2px_0px_#000] hover:bg-black hover:text-[#CCFF00] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Sparkles size={13} />
              [ FOUNDER'S WORKSPACE ]
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link 
              to="/auth" 
              className="flex items-center gap-2 bg-[#FBF9F5] border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000] hover:bg-[#FFDE59] transition-colors"
            >
              <div className="w-6 h-6 bg-[#00F0FF] border border-black flex items-center justify-center text-black">
                <User size={13} />
              </div>
              <span className="text-xs font-black uppercase text-black">kv853772</span>
            </Link>
            <Link 
              to="/founder-workspace" 
              className="flex items-center gap-1.5 text-xs font-black uppercase px-3 py-1.5 bg-[#CCFF00] border-2 border-black text-black shadow-[2px_2px_0px_#000] hover:bg-black hover:text-[#CCFF00] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Sparkles size={13} />
              [ FOUNDER'S WORKSPACE ]
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
