import { useState } from 'react';
import Sidebar from './Sidebar';
import PublicNavbar from './PublicNavbar';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isStandalonePage = 
    location.pathname === '/' ||
    location.pathname === '/auth' ||
    location.pathname === '/courses' || 
    location.pathname === '/ai-courses' || 
    location.pathname === '/backend-courses' || 
    location.pathname === '/database-courses' || 
    location.pathname === '/ui-courses' || 
    location.pathname === '/pitch' ||
    location.pathname === '/build-profile' ||
    location.pathname === '/create-company' ||
    location.pathname === '/campaign' ||
    location.pathname === '/campaign/create' ||
    location.pathname === '/explore' ||
    location.pathname === '/user-dashboard' ||
    location.pathname === '/founder-workspace' ||
    location.pathname === '/talent-search' ||
    location.pathname.startsWith('/candidate') ||
    location.pathname.startsWith('/executive') ||
    location.pathname.startsWith('/profile/') ||
    location.pathname.startsWith('/course/') ||
    location.pathname.startsWith('/ide/solve/') ||
    location.pathname.includes('/solve/') ||
    location.pathname.includes('/ide/');

  if (isStandalonePage) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F0EDE6] text-black font-mono">
        <PublicNavbar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    );
  }

  // Workspace pages with Sidebar (Contests, Royale, Practice, Quizzes, Projects, Notes, CS Subjects, etc.)
  return (
    <div 
      className="flex flex-col h-screen bg-[#F0EDE6] text-black font-mono overflow-hidden select-none"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      <PublicNavbar />
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto w-full relative">
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="absolute left-3 top-3 z-30 bg-[#FFDE59] border-2 border-black px-2.5 py-1 text-xs font-black uppercase shadow-[2px_2px_0px_#000] hover:bg-black hover:text-[#FFDE59] transition-all flex items-center gap-1"
              title="Open Sidebar"
            >
              [ ☰ MODULES ]
            </button>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
