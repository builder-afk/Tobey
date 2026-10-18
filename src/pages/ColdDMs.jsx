import { Mail, Copy, CheckCircle2, ChevronRight, UserCircle2, Zap, Sparkles, Send } from 'lucide-react';
import { useState } from 'react';
import { templatesData } from '../data/templatesData';

export default function ColdDMs() {
  const [copied, setCopied] = useState(false);
  const [activeTemplateId, setActiveTemplateId] = useState(1);

  const activeTemplate = templatesData.find(t => t.id === activeTemplateId) || templatesData[0];

  const handleCopy = () => {
    const textToCopy = activeTemplate.subject 
      ? `Subject: ${activeTemplate.subject}\n\n${activeTemplate.body}`
      : activeTemplate.body;
      
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row h-full font-mono bg-[#FAF8F5]">
      {/* Templates List Sidebar */}
      <div className="w-full md:w-[380px] flex flex-col overflow-hidden h-full border-r-4 border-black bg-white shrink-0">
        
        {/* Header */}
        <div className="p-5 border-b-4 border-black bg-[#FFDE59] shadow-[0px_4px_0px_#000] shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-black text-white font-black text-[10px] uppercase tracking-wider mb-2">
            <Send size={12} className="stroke-[2.5]" /> Outreach Frameworks
          </div>
          <h1 className="text-2xl font-black text-black uppercase tracking-tight">Cold DM Playbook</h1>
          <p className="text-black font-bold text-xs mt-1">{templatesData.length} HIGH-CONVERTING TEMPLATES</p>
        </div>
        
        {/* Template List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 pb-20 md:pb-4">
          {templatesData.map((t) => {
            const isActive = t.id === activeTemplateId;
            return (
              <div 
                key={t.id} 
                onClick={() => setActiveTemplateId(t.id)}
                className={`p-3 border-2 border-black cursor-pointer transition-all duration-200 ${
                  isActive 
                    ? 'bg-black text-white shadow-[4px_4px_0px_#000] translate-x-1' 
                    : 'bg-white text-black shadow-[2px_2px_0px_#000] hover:bg-[#FFDE59]'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className={`w-7 h-7 border-2 border-black flex items-center justify-center shrink-0 mt-0.5 ${
                      isActive ? 'bg-[#00F0FF] text-black' : 'bg-[#F8F6F0] text-black'
                    }`}>
                      <Mail size={13} className="stroke-[2.5]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className={`font-black text-xs uppercase leading-snug truncate ${isActive ? 'text-white' : 'text-black'}`}>
                        {t.title}
                      </h3>
                      <div className="mt-1">
                        <span className={`text-[9px] px-1.5 py-0.5 border border-black font-black uppercase tracking-wider ${
                          isActive 
                            ? 'bg-[#CCFF00] text-black' 
                            : 'bg-neutral-100 text-black'
                        }`}>
                          {t.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  {isActive && <ChevronRight size={16} className="text-[#00F0FF] stroke-[3] shrink-0 mt-1" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Template Preview Area */}
      <div className="w-full md:flex-1 p-6 md:p-8 flex flex-col h-full overflow-y-auto bg-[#FAF8F5]">
        <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-4 border-black bg-white p-5 shadow-[6px_6px_0px_#000]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#00F0FF] border-2 border-black text-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] mb-2">
                <UserCircle2 size={13} className="stroke-[2.5]" />
                {activeTemplate.category} Template
              </div>
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">{activeTemplate.title}</h2>
            </div>
            <button 
              onClick={handleCopy}
              className={`px-5 py-3 border-3 border-black text-xs md:text-sm font-black uppercase flex items-center gap-2 shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all shrink-0 ${
                copied 
                  ? 'bg-black text-[#CCFF00]'
                  : 'bg-[#CCFF00] hover:bg-[#b8e600] text-black'
              }`}
            >
              {copied ? <CheckCircle2 size={16} className="stroke-[3]" /> : <Copy size={16} className="stroke-[2.5]" />}
              {copied ? 'COPIED TO CLIPBOARD!' : 'COPY TEMPLATE'}
            </button>
          </div>

          {/* Script Editor Frame */}
          <div className="flex-1 flex flex-col">
            {/* Terminal Title Bar */}
            <div className="border-4 border-black bg-black text-white px-4 py-3 flex items-center justify-between shadow-[6px_6px_0px_#000]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF0033] border border-white" />
                <div className="w-3 h-3 rounded-full bg-[#FFDE59] border border-white" />
                <div className="w-3 h-3 rounded-full bg-[#CCFF00] border border-white" />
                <span className="text-[11px] text-white font-mono font-bold ml-2 uppercase">outreach_template.txt</span>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono uppercase">READ-ONLY SCRIPT</span>
            </div>

            {/* Subject Line Bar (if available) */}
            {activeTemplate.subject && (
              <div className="border-x-4 border-b-3 border-black bg-[#FFFEF0] p-3.5 flex items-center gap-2 shadow-[6px_6px_0px_#000]">
                <span className="bg-black text-white font-black text-xs uppercase px-2 py-0.5 border border-black shrink-0">
                  Subject:
                </span>
                <span className="text-black font-bold text-xs md:text-sm font-mono truncate">{activeTemplate.subject}</span>
              </div>
            )}
            
            {/* Content Area */}
            <div className="flex-1 min-h-[320px] relative border-x-4 border-b-4 border-black bg-white shadow-[6px_6px_0px_#000]">
              <textarea 
                className="w-full h-full min-h-[320px] bg-transparent p-6 text-black font-mono text-sm leading-relaxed resize-none focus:outline-none custom-scrollbar font-bold"
                value={activeTemplate.body}
                readOnly
              ></textarea>
            </div>
          </div>

          {/* Pro Tip Box */}
          <div className="mt-6 border-4 border-black bg-[#FFDE59] p-5 shadow-[5px_5px_0px_#000] flex items-start gap-4">
            <div className="w-10 h-10 border-2 border-black bg-black text-[#FFDE59] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000]">
              <Zap size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-black font-black text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles size={13} className="stroke-[2.5]" /> Strategy Pro Tip
              </h4>
              <p className="text-black font-bold text-xs md:text-sm leading-relaxed uppercase">{activeTemplate.proTip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}