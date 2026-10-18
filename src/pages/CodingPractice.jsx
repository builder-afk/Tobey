import React from 'react';
import { ExternalLink, Sparkles, Code2, Brain, Server, Database, Palette, Terminal, ArrowUpRight } from 'lucide-react';

const sectionThemes = [
  { icon: Code2, label: '01 // ALGORITHMIC', bg: 'bg-[#CCFF00]', shadow: 'shadow-[4px_4px_0px_#000]' },
  { icon: Brain, label: '02 // INTELLIGENCE', bg: 'bg-[#00F0FF]', shadow: 'shadow-[4px_4px_0px_#000]' },
  { icon: Server, label: '03 // ARCHITECTURE', bg: 'bg-[#FFDE59]', shadow: 'shadow-[4px_4px_0px_#000]' },
  { icon: Database, label: '04 // DATA SYSTEMS', bg: 'bg-[#FF52D9]', shadow: 'shadow-[4px_4px_0px_#000]' },
  { icon: Palette, label: '05 // INTERFACES', bg: 'bg-[#FF0033]', text: 'text-white', shadow: 'shadow-[4px_4px_0px_#000]' },
];

export default function CodingPractice() {
  const categories = [
    {
      title: "Algorithms & Competitive Programming",
      description: "Master data structures, algorithmic design, and rapid problem-solving execution.",
      platforms: [
        { id: 'leetcode', name: 'LeetCode', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png', desc: 'Top interview questions and algorithmic challenges.', url: 'https://leetcode.com', tag: 'INTERVIEW' },
        { id: 'codeforces', name: 'Codeforces', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Codeforces_logo.svg', desc: 'Competitive programming contests and global ranking.', url: 'https://codeforces.com', tag: 'CONTESTS' },
        { id: 'hackerrank', name: 'HackerRank', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png', desc: 'Skill-based assessment and domain-specific tracks.', url: 'https://www.hackerrank.com', tag: 'SKILLS' },
        { id: 'codechef', name: 'CodeChef', logo: 'https://cdn.codechef.com/images/cc-logo.svg', desc: 'Monthly programming contests and peer learning.', url: 'https://www.codechef.com', tag: 'COMPETE' },
        { id: 'hackerearth', name: 'HackerEarth', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/HackerEarth_logo.png', desc: 'Enterprise hiring solutions and hackathons.', url: 'https://www.hackerearth.com', tag: 'HIRING' },
        { id: 'projecteuler', name: 'Project Euler', logo: 'https://projecteuler.net/themes/logo_default.png', desc: 'Mathematical and computational programming problems.', url: 'https://projecteuler.net', tag: 'MATH' },
        { id: 'atcoder', name: 'AtCoder', logo: 'https://img.atcoder.jp/assets/logo.png', desc: 'High-quality Japanese competitive programming platform.', url: 'https://atcoder.jp', tag: 'LOGIC' },
        { id: 'lintcode', name: 'LintCode', logo: 'https://cdn.simpleicons.org/lintcode/1ABC9C', fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png', desc: 'Algorithm challenges mimicking real technical interviews.', url: 'https://www.lintcode.com', tag: 'PRACTICE' }
      ]
    },
    {
      title: "Artificial Intelligence & ML",
      description: "Datasets, model fine-tuning, neural networks, and competitive data tournaments.",
      platforms: [
        { id: 'kaggle', name: 'Kaggle', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Kaggle_logo.png', desc: 'The world\'s largest data science community and competitions.', url: 'https://kaggle.com', tag: 'COMPETITIONS' },
        { id: 'huggingface', name: 'Hugging Face', logo: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg', desc: 'The AI community building the future of open source ML models.', url: 'https://huggingface.co', tag: 'OPEN SOURCE' },
        { id: 'drivendata', name: 'DrivenData', logo: 'https://cdn.simpleicons.org/planetscale/01F1CD', fallbackLogo: 'https://cdn.simpleicons.org/python/017BFF', desc: 'Data science challenges to build solutions for social impact.', url: 'https://www.drivendata.org/', tag: 'DATA SCIENCE' },
        { id: 'numerai', name: 'Numerai', logo: 'https://cdn.simpleicons.org/nodedotjs/000000', desc: 'The hardest data science tournament on the planet.', url: 'https://numer.ai/', tag: 'QUANT' }
      ]
    },
    {
      title: "Backend & Systems Architecture",
      description: "Build distributed servers, reconstruct core tools, and deploy scalable microservices.",
      platforms: [
        { id: 'codecrafters', name: 'CodeCrafters', logo: 'https://cdn.simpleicons.org/codecrafters/F35325', fallbackLogo: 'https://avatars.githubusercontent.com/u/53234125?s=200&v=4', desc: 'Recreate popular devtools from scratch like Redis, Git, and Docker.', url: 'https://codecrafters.io/', tag: 'SYSTEMS' },
        { id: 'bootdev', name: 'Boot.dev', logo: 'https://cdn.simpleicons.org/go/00add8', desc: 'Learn Backend Engineering with Python and Go from fundamentals.', url: 'https://boot.dev/', tag: 'BACKEND' },
        { id: 'algoexpert', name: 'SystemsExpert', logo: 'https://cdn.simpleicons.org/expertsexchange/017BFF', desc: 'Master System Design interviews with high-level architecture cases.', url: 'https://www.algoexpert.io/systems/product', tag: 'DESIGN' },
        { id: 'kodekloud', name: 'KodeKloud', logo: 'https://cdn.simpleicons.org/docker/013D83', desc: 'Hands-on DevOps, Kubernetes, and Linux interactive labs.', url: 'https://kodekloud.com/', tag: 'DEVOPS' }
      ]
    },
    {
      title: "Databases & SQL Engineering",
      description: "Master query optimization, relational indexing, window functions, and schematics.",
      platforms: [
        { id: 'sqlzoo', name: 'SQLZoo', logo: 'https://cdn.simpleicons.org/postgresql/105B63', desc: 'Interactive SQL tutorials and practical assessments in-browser.', url: 'https://sqlzoo.net/', tag: 'QUERIES' },
        { id: 'stratascratch', name: 'StrataScratch', logo: 'https://cdn.simpleicons.org/mysql/F1A208', desc: 'Real SQL and analytics interview questions from top tech giants.', url: 'https://www.stratascratch.com/', tag: 'ANALYTICS' },
        { id: 'datalemur', name: 'DataLemur', logo: 'https://cdn.simpleicons.org/mongodb/FF4136', desc: 'Free SQL and data interview questions from FAANG engineers.', url: 'https://datalemur.com/', tag: 'FAANG' },
        { id: 'selectstar', name: 'Select Star SQL', logo: 'https://cdn.simpleicons.org/sqlite/4B3F72', desc: 'Learn SQL by querying a real-world dataset directly in your browser.', url: 'https://selectstarsql.com/', tag: 'DATASETS' }
      ]
    },
    {
      title: "UI Design & Frontend Craft",
      description: "CSS battles, component systems, accessible markup, and pixel-perfect design targets.",
      platforms: [
        { id: 'frontendmentor', name: 'Frontend Mentor', logo: 'https://cdn.simpleicons.org/frontendmentor/3F54A3', desc: 'Improve frontend skills by building production-ready project briefs.', url: 'https://www.frontendmentor.io/', tag: 'PROJECTS' },
        { id: 'cssbattle', name: 'CSSBattle', logo: 'https://cdn.simpleicons.org/css/1572B6', fallbackLogo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/css.svg', desc: 'CSS code-golfing game. Replicate visual targets with smallest code size.', url: 'https://cssbattle.dev/', tag: 'GOLF' },
        { id: 'icodethis', name: 'iCodeThis', logo: 'https://cdn.simpleicons.org/html5/E34F26', desc: 'Daily frontend coding challenges to build responsive UI components.', url: 'https://icodethis.com/', tag: 'DAILY' },
        { id: 'dailyui', name: 'Daily UI', logo: 'https://cdn.simpleicons.org/figma/F24E1E', desc: 'A series of daily design challenges for 100 consecutive days.', url: 'https://www.dailyui.co/', tag: 'DESIGN' }
      ]
    }
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto pb-20 custom-scrollbar font-mono">
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] text-black font-black text-xs uppercase tracking-wider mb-4">
            <Sparkles size={14} className="stroke-[2.5]" />
            <span>[ CURATED LEARNING ECOSYSTEMS ]</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight mb-4 flex items-center flex-wrap gap-3">
            CODING
            <span className="bg-[#00F0FF] text-black px-3 py-1 border-4 border-black shadow-[5px_5px_0px_#000]">
              PRACTICE
            </span>
          </h1>

          <p className="text-xs md:text-sm font-bold text-gray-700 max-w-3xl uppercase tracking-wide leading-relaxed bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000]">
            // HONE YOUR PROBLEM SOLVING ACROSS DOMAINS. ACCESS EXTERNAL ECOSYSTEMS FOR ALGORITHMS, AI/ML, DISTRIBUTED SYSTEMS, DATABASE QUERIES, AND FRONTEND MASTERY.
          </p>
        </div>
        
        {/* Categories Stack */}
        <div className="space-y-14">
          {categories.map((category, cIdx) => {
            const theme = sectionThemes[cIdx % sectionThemes.length];
            const SectionIcon = theme.icon;
            
            return (
              <div key={cIdx} className="space-y-6">
                {/* Section Header Card */}
                <div className="bg-white border-4 border-black p-4 md:p-5 shadow-[6px_6px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 border-3 border-black ${theme.bg} flex items-center justify-center shadow-[3px_3px_0px_#000] flex-shrink-0`}>
                      <SectionIcon size={24} className="text-black stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-[10px] font-black border border-black ${theme.bg} text-black`}>
                          {theme.label}
                        </span>
                        <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                          {category.title}
                        </h2>
                      </div>
                      <p className="text-xs text-gray-600 font-bold uppercase mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-xs font-black text-black bg-[#F0EDE6] border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000]">
                    <span>PLATFORMS: {category.platforms.length}</span>
                  </div>
                </div>
                
                {/* Platform Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.platforms.map((plat) => (
                    <div 
                      key={plat.id}
                      onClick={() => window.open(plat.url, '_blank', 'noopener,noreferrer')}
                      className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex flex-col group justify-between"
                    >
                      <div>
                        {/* Logo Container */}
                        <div className="h-20 mb-4 bg-[#FBF9F5] border-3 border-black p-3 flex items-center justify-center shadow-[3px_3px_0px_#000] relative overflow-hidden group-hover:bg-yellow-50 transition-colors">
                          <img 
                            src={plat.logo} 
                            alt={plat.name} 
                            onError={(e) => { 
                              if (plat.fallbackLogo && e.target.src !== plat.fallbackLogo) {
                                e.target.src = plat.fallbackLogo;
                              } else {
                                e.target.style.display = 'none';
                                if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex';
                              }
                            }}
                            className="max-h-12 max-w-[140px] object-contain" 
                          />
                          <span className="hidden font-mono font-black text-sm uppercase text-black bg-[#FFDE59] px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
                            {plat.name}
                          </span>
                          <span className="absolute top-1 right-1 px-1.5 py-0.5 bg-black text-white text-[9px] font-black uppercase tracking-wider">
                            {plat.tag}
                          </span>
                        </div>
                        
                        {/* Title & Description */}
                        <h3 className="text-lg font-black text-black uppercase mb-1 tracking-tight group-hover:text-blue-600 transition-colors">
                          {plat.name}
                        </h3>
                        <p className="text-xs text-gray-600 font-bold leading-relaxed mb-6">
                          {plat.desc}
                        </p>
                      </div>
                      
                      {/* Action Trigger */}
                      <div className="mt-auto pt-3 border-t-2 border-black">
                        <div className="w-full py-2 px-3 bg-[#CCFF00] group-hover:bg-[#FFDE59] border-2 border-black text-black font-black text-xs uppercase flex items-center justify-between shadow-[2px_2px_0px_#000] active:shadow-none transition-all">
                          <span>[ ENTER PLATFORM ]</span>
                          <ArrowUpRight size={14} className="stroke-[3]" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}