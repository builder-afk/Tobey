import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Video, Phone, Play, Pause, Send, Mic, Plus, Check,
  CheckCircle2, ChevronLeft, Sparkles, MessageSquare,
  ArrowRight, CornerDownLeft, Volume2, Bot, Bell,
  Flame, Mail, Shield, ExternalLink, RefreshCw
} from 'lucide-react';

export default function TobeyAgentHowItWorks() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef(null);

  // Dynamic interactive chat thread inside the mobile phone on the right
  const [phoneMessages, setPhoneMessages] = useState([
    {
      id: 1,
      sender: 'user',
      isAudio: true,
      audioDuration: '0:14',
      text: "yo so I'm a backend eng, want something early stage, remote pls",
      time: '9:41 AM',
      status: 'Delivered',
      step: 1
    },
    {
      id: 2,
      sender: 'tobey',
      text: "3 yrs of backend in payments, seed to series A, remote. bet, on it 🙌",
      time: '9:41 AM',
      step: 1
    },
    {
      id: 3,
      sender: 'tobey',
      text: "noted ✨ picks drop in the morning",
      time: '9:42 AM',
      step: 2
    },
    {
      id: 4,
      sender: 'tobey',
      text: "gm ☀️ 6 new startups fit you today",
      time: '8:01 AM',
      step: 2
    },
    {
      id: 5,
      sender: 'tobey',
      text: "top pick: Resend, the email API. your infra background is kinda perfect for them ngl",
      time: '8:02 AM',
      reaction: '!!',
      step: 2
    },
    {
      id: 6,
      sender: 'tobey',
      text: "Hi, saw Resend's latest launch week. I rebuilt email delivery at my last job and cut bounces by 40%...",
      time: '8:05 AM',
      step: 3
    },
    {
      id: 7,
      sender: 'tobey',
      text: "reply SEND, EDIT or SKIP",
      time: '8:05 AM',
      step: 3
    },
    {
      id: 8,
      sender: 'user',
      text: "make it a lil shorter",
      time: '8:06 AM',
      step: 3
    },
    {
      id: 9,
      sender: 'tobey',
      text: "shorter ✂️ 'Hi, I'm Kunal - launch week. I rebuild email delivery and cut bounces by 40%. 20 min next week?'",
      time: '8:07 AM',
      step: 4
    },
    {
      id: 10,
      sender: 'user',
      text: "send",
      time: '8:08 AM',
      status: 'Delivered',
      step: 4
    },
    {
      id: 11,
      sender: 'tobey',
      text: "sent from your gmail ✉️ if they ghost, i'll follow up in the same thread thursday",
      time: '8:08 AM',
      step: 4
    },
    {
      id: 12,
      sender: 'tobey',
      text: "they wanna talk tuesday. full reply's in your inbox",
      time: '10:42 AM',
      reaction: '🎉',
      step: 5
    },
    {
      id: 13,
      sender: 'user',
      text: "LET'S GOOO",
      time: '10:43 AM',
      status: 'Read 10:43 AM',
      step: 5
    },
    {
      id: 14,
      sender: 'tobey',
      text: "go get em 🙌 want a quick rundown on them before the call?",
      time: '10:44 AM',
      step: 5
    },
    {
      id: 15,
      sender: 'tobey',
      text: "this week: 12 emails out, 3 replies, 1 interview 💥",
      time: '5:15 PM',
      step: 6
    },
    {
      id: 16,
      sender: 'tobey',
      text: "2 follow-ups go out monday",
      time: '5:15 PM',
      step: 6
    },
    {
      id: 17,
      sender: 'tobey',
      text: "everything's here: hypers.ai/dashboard",
      time: '5:16 PM',
      step: 6
    },
    {
      id: 18,
      sender: 'user',
      text: "ur the goat",
      time: '5:17 PM',
      reaction: '❤️',
      step: 6
    }
  ]);

  // Audio waveform animation simulated toggle
  const toggleAudio = () => {
    setIsPlayingAudio(prev => !prev);
  };

  // Scroll to active step in phone or jump to that conversation segment
  const handleSelectStep = (stepNumber) => {
    setActiveStep(stepNumber);
    // Find first message belonging to this step
    const targetMsg = phoneMessages.find(m => m.step === stepNumber);
    if (targetMsg && chatScrollRef.current) {
      const el = document.getElementById(`phone-msg-${targetMsg.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Handle sending a custom user message in the phone
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatInput('');

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      time: 'Just now',
      status: 'Delivered',
      step: activeStep
    };

    setPhoneMessages(prev => [...prev, newMsg]);
    setIsTyping(true);

    // Auto reply from Tobey
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "on it 🙌 scanning founder signals right now...";
      if (userText.toLowerCase().includes('remote') || userText.toLowerCase().includes('job')) {
        replyText = "gotchu 🎯 found 4 seed/Series-A teams hiring remote engineers today. Resend, Supabase, and Cursor are at the top.";
      } else if (userText.toLowerCase().includes('interview') || userText.toLowerCase().includes('call')) {
        replyText = "prepped an executive architecture brief for your call. check your email, full founder dossier ready 🚀";
      } else if (userText.toLowerCase().includes('follow')) {
        replyText = "auto-scheduled follow-up for Thursday 10:15 AM Net-3 days in the same thread. zero extra work for you ✉️";
      }

      setPhoneMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'tobey',
          text: replyText,
          time: 'Just now',
          step: activeStep
        }
      ]);

      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      }
    }, 700);
  };

  // Quick Action Chips
  const sendQuickAction = (text) => {
    setChatInput(text);
    setTimeout(() => {
      const form = document.getElementById('phone-chat-form');
      if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 50);
  };

  return (
    <section id="how-tobey-works" className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-14 md:py-20 w-full border-b-4 border-black bg-[#FAF8F5] overflow-hidden font-mono select-none">
      
      {/* Background Subtle Graph Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* ═══ TOP BRUTALIST SUB-HEADER BAR (MATCHES EXACT SCREENSHOT) ═══ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-8 border-b-2 border-black/30 text-xs sm:text-sm font-black uppercase tracking-wider text-black gap-2">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">/</span>
            <span>TOBEY</span>
            <span className="text-neutral-400">//</span>
            <span>ONBOARDING</span>
            <span className="text-neutral-400">//</span>
            <span className="bg-[#CCFF00] px-1 text-black border border-black shadow-[1px_1px_0px_#000]">06 STEPS</span>
          </div>

          <div className="text-[11px] sm:text-xs font-bold text-neutral-600 tracking-widest uppercase">
            TEXT TOBEY. HE HANDLES THE REST.
          </div>
        </div>

        {/* Section Intro Title */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] mb-3">
            <Bot size={15} className="stroke-[2.5]" />
            <span>[ MEET YOUR 24/7 AUTONOMOUS OUTBOUND AGENT ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black mb-3">
            HOW TOBEY WORKS // ZERO TO FOUNDER INTERVIEW
          </h2>
          <p className="text-xs sm:text-sm font-bold text-neutral-700 uppercase max-w-3xl leading-relaxed">
            TEXT OR VOICE-NOTE TOBEY OVER IMESSAGE. HE SCANS STARTUP REPOS, DRAFTS PROOF-OF-WORK EMAILS, SENDS FROM YOUR GMAIL, AND TEXTS YOU WHEN FOUNDERS REPLY. NO JOB BOARDS. NO FORMS.
          </p>
        </div>

        {/* ═══ MAIN DUAL LAYOUT: 6-STEP CARDS (LEFT) + MOBILE PHONE CHAT (RIGHT) ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* LEFT: THE 6 HOW-IT-WORKS CARDS (EXACT MATCH TO REFERENCE IMAGE) */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
              
              {/* ── CARD 1: TELL IT ABOUT YOU ── */}
              <div 
                onClick={() => handleSelectStep(1)}
                className={`flex flex-col cursor-pointer transition-all duration-200 group ${
                  activeStep === 1 ? 'scale-[1.01]' : 'hover:opacity-95'
                }`}
              >
                {/* iMessage Window */}
                <div className="bg-white border-3 border-black rounded-xl p-3.5 shadow-[6px_6px_0px_#000] flex flex-col justify-between min-h-[220px]">
                  {/* Window Top Bar */}
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-black">
                      <span className="text-sm">‹</span>
                      <span className="w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-bold">3</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-black text-black">
                      <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[11px] font-black">
                        T
                      </div>
                      <span className="text-sm font-black">Tobey</span>
                    </div>
                    <Video size={16} className="text-neutral-700" />
                  </div>

                  {/* Message Bubbles */}
                  <div className="py-3 space-y-2.5 font-sans">
                    {/* User Audio Message Bubble */}
                    <div className="flex flex-col items-end">
                      <div className="bg-[#007AFF] text-white rounded-2xl rounded-tr-sm px-3.5 py-2 max-w-[92%] shadow-sm">
                        {/* Audio Waveform Bar */}
                        <div className="flex items-center gap-2 mb-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); toggleAudio(); }}>
                          <div className="w-5 h-5 rounded-full bg-white text-[#007AFF] flex items-center justify-center">
                            {isPlayingAudio ? <Pause size={10} className="fill-[#007AFF]" /> : <Play size={10} className="fill-[#007AFF] ml-0.5" />}
                          </div>
                          {/* Audio bars */}
                          <div className="flex items-center gap-0.5 h-4">
                            {[12, 18, 8, 22, 14, 26, 10, 16, 24, 12, 20, 15, 22, 8, 19, 14, 10, 16, 22, 12].map((h, i) => (
                              <div 
                                key={i} 
                                className={`w-0.5 bg-white/90 rounded-full ${isPlayingAudio ? 'animate-pulse' : ''}`} 
                                style={{ height: `${h}px` }} 
                              />
                            ))}
                          </div>
                          <span className="text-[11px] text-white/90 font-mono ml-1">0:14</span>
                        </div>
                        <p className="text-[12px] leading-snug">
                          yo so I'm a backend eng, want something early stage, remote pls
                        </p>
                      </div>
                      <span className="text-[10px] text-neutral-400 mt-0.5 mr-1 font-sans">Delivered</span>
                    </div>

                    {/* Tobey Reply */}
                    <div className="flex flex-col items-start">
                      <div className="bg-[#E9E9EB] text-black rounded-2xl rounded-tl-sm px-3.5 py-2 max-w-[88%] text-[12px] leading-snug">
                        3 yrs of backend in payments, seed to series A, remote. bet, on it 🙌
                      </div>
                    </div>
                  </div>

                  {/* Window Bottom Bar */}
                  <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 text-neutral-400">
                    <Plus size={16} className="text-neutral-500" />
                    <div className="flex-1 bg-neutral-100 rounded-full px-3 py-1 text-[11px] text-neutral-400 font-sans">
                      iMessage
                    </div>
                    <Mic size={16} className="text-neutral-500" />
                  </div>
                </div>

                {/* Number & Step Label */}
                <div className="mt-3 flex items-start gap-2.5">
                  <div className="w-7 h-7 bg-[#FFE066] border-2 border-black font-black text-sm flex items-center justify-center shadow-[2px_2px_0px_#000] shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase text-black">
                      TELL IT ABOUT YOU
                    </h3>
                    <p className="text-[11px] font-bold text-neutral-600 uppercase leading-snug mt-0.5">
                      SEND YOUR LINKEDIN, RESUME OR A VOICE NOTE. TOBEY RESEARCHES YOUR BACKGROUND AND ASKS WHAT YOU WANT NEXT.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── CARD 2: IT FINDS STARTUPS EVERY MORNING ── */}
              <div 
                onClick={() => handleSelectStep(2)}
                className={`flex flex-col cursor-pointer transition-all duration-200 group ${
                  activeStep === 2 ? 'scale-[1.01]' : 'hover:opacity-95'
                }`}
              >
                {/* iMessage Window */}
                <div className="bg-white border-3 border-black rounded-xl p-3.5 shadow-[6px_6px_0px_#000] flex flex-col justify-between min-h-[220px]">
                  {/* Window Top Bar */}
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-black">
                      <span className="text-sm">‹</span>
                      <span className="w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-bold">3</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-black text-black">
                      <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[11px] font-black">
                        T
                      </div>
                      <span className="text-sm font-black">Tobey</span>
                    </div>
                    <Video size={16} className="text-neutral-700" />
                  </div>

                  {/* Message Bubbles */}
                  <div className="py-3 space-y-2 font-sans">
                    <div className="flex flex-col items-start">
                      <div className="bg-[#E9E9EB] text-black rounded-2xl rounded-tl-sm px-3.5 py-1.5 max-w-[85%] text-[12px] leading-snug">
                        noted ✨ picks drop in the morning
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="bg-[#E9E9EB] text-black rounded-2xl rounded-tl-sm px-3.5 py-1.5 max-w-[85%] text-[12px] leading-snug">
                        gm ☀️ 6 new startups fit you today
                      </div>
                    </div>
                    <div className="flex flex-col items-start relative">
                      <div className="bg-[#E9E9EB] text-black rounded-2xl rounded-tl-sm px-3.5 py-2 max-w-[92%] text-[12px] leading-snug">
                        top pick: Resend, the email API. your infra background is kinda perfect for them ngl
                      </div>
                      {/* Sticker Reaction Badge */}
                      <div className="absolute -top-2 right-1 w-6 h-6 rounded-full bg-[#00F0FF] border border-black flex items-center justify-center font-black text-black text-[10px] shadow-sm">
                        !!
                      </div>
                    </div>
                  </div>

                  {/* Window Bottom Bar */}
                  <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 text-neutral-400">
                    <Plus size={16} className="text-neutral-500" />
                    <div className="flex-1 bg-neutral-100 rounded-full px-3 py-1 text-[11px] text-neutral-400 font-sans">
                      iMessage
                    </div>
                    <Mic size={16} className="text-neutral-500" />
                  </div>
                </div>

                {/* Number & Step Label */}
                <div className="mt-3 flex items-start gap-2.5">
                  <div className="w-7 h-7 bg-[#00F0FF] border-2 border-black font-black text-sm flex items-center justify-center shadow-[2px_2px_0px_#000] shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase text-black">
                      IT FINDS STARTUPS EVERY MORNING
                    </h3>
                    <p className="text-[11px] font-bold text-neutral-600 uppercase leading-snug mt-0.5">
                      EVERY MORNING IT PICKS STARTUPS THAT FIT YOU, FROM FRESH FUNDING, LAUNCH AND HIRING NEWS.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── CARD 3: IT WRITES TO THE FOUNDER ── */}
              <div 
                onClick={() => handleSelectStep(3)}
                className={`flex flex-col cursor-pointer transition-all duration-200 group ${
                  activeStep === 3 ? 'scale-[1.01]' : 'hover:opacity-95'
                }`}
              >
                {/* iMessage Window */}
                <div className="bg-white border-3 border-black rounded-xl p-3.5 shadow-[6px_6px_0px_#000] flex flex-col justify-between min-h-[220px]">
                  {/* Window Top Bar */}
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-black">
                      <span className="text-sm">‹</span>
                      <span className="w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-bold">3</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-black text-black">
                      <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[11px] font-black">
                        T
                      </div>
                      <span className="text-sm font-black">Tobey</span>
                    </div>
                    <Video size={16} className="text-neutral-700" />
                  </div>

                  {/* Message Bubbles */}
                  <div className="py-3 space-y-2 font-sans">
                    <div className="flex flex-col items-start">
                      <div className="bg-[#E9E9EB] text-black rounded-2xl rounded-tl-sm px-3.5 py-2 max-w-[94%] text-[12px] leading-snug">
                        "Hi, saw Resend's latest launch week. I rebuilt email delivery at my last job and cut bounces by 40%..."
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="bg-[#E9E9EB] text-black rounded-2xl rounded-tl-sm px-3.5 py-1.5 text-[11px] leading-snug text-neutral-600">
                        reply SEND, EDIT or SKIP
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-[#007AFF] text-white rounded-2xl rounded-tr-sm px-3.5 py-1.5 max-w-[85%] text-[12px]">
                        make it a lil shorter
                      </div>
                    </div>
                    {/* Animated Typing Indicator */}
                    <div className="flex items-center gap-1 bg-[#E9E9EB] px-3 py-1.5 rounded-full w-12">
                      <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>

                  {/* Window Bottom Bar */}
                  <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 text-neutral-400">
                    <Plus size={16} className="text-neutral-500" />
                    <div className="flex-1 bg-neutral-100 rounded-full px-3 py-1 text-[11px] text-neutral-400 font-sans">
                      iMessage
                    </div>
                    <Mic size={16} className="text-neutral-500" />
                  </div>
                </div>

                {/* Number & Step Label */}
                <div className="mt-3 flex items-start gap-2.5">
                  <div className="w-7 h-7 bg-[#CCFF00] border-2 border-black font-black text-sm flex items-center justify-center shadow-[2px_2px_0px_#000] shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase text-black">
                      IT WRITES TO THE FOUNDER
                    </h3>
                    <p className="text-[11px] font-bold text-neutral-600 uppercase leading-snug mt-0.5">
                      IT FINDS THE FOUNDER'S EMAIL AND DRAFTS A NOTE ABOUT WHY YOU FIT THEM.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── CARD 4: YOU TAP SEND. IT FOLLOWS UP. ── */}
              <div 
                onClick={() => handleSelectStep(4)}
                className={`flex flex-col cursor-pointer transition-all duration-200 group ${
                  activeStep === 4 ? 'scale-[1.01]' : 'hover:opacity-95'
                }`}
              >
                {/* iMessage Window */}
                <div className="bg-white border-3 border-black rounded-xl p-3.5 shadow-[6px_6px_0px_#000] flex flex-col justify-between min-h-[220px]">
                  {/* Window Top Bar */}
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-black">
                      <span className="text-sm">‹</span>
                      <span className="w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-bold">3</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-black text-black">
                      <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[11px] font-black">
                        T
                      </div>
                      <span className="text-sm font-black">Tobey</span>
                    </div>
                    <Video size={16} className="text-neutral-700" />
                  </div>

                  {/* Message Bubbles */}
                  <div className="py-3 space-y-2 font-sans">
                    <div className="flex flex-col items-start">
                      <div className="bg-[#E9E9EB] text-black rounded-2xl rounded-tl-sm px-3.5 py-2 max-w-[94%] text-[12px] leading-snug">
                        shorter ✂️ "Hi, I'm Kunal - launch week. I rebuild email delivery and cut bounces by 40%. 20 min next week?"
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-[#007AFF] text-white rounded-2xl rounded-tr-sm px-4 py-1.5 text-[12px]">
                        send
                      </div>
                      <span className="text-[10px] text-neutral-400 mt-0.5 mr-1">Delivered</span>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="bg-[#E9E9EB] text-black rounded-2xl rounded-tl-sm px-3.5 py-2 max-w-[92%] text-[12px] leading-snug">
                        sent from your gmail ✉️ if they ghost, i'll follow up in the same thread thursday
                      </div>
                    </div>
                  </div>

                  {/* Window Bottom Bar */}
                  <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 text-neutral-400">
                    <Plus size={16} className="text-neutral-500" />
                    <div className="flex-1 bg-neutral-100 rounded-full px-3 py-1 text-[11px] text-neutral-400 font-sans">
                      iMessage
                    </div>
                    <Mic size={16} className="text-neutral-500" />
                  </div>
                </div>

                {/* Number & Step Label */}
                <div className="mt-3 flex items-start gap-2.5">
                  <div className="w-7 h-7 bg-[#FF9EAA] border-2 border-black font-black text-sm flex items-center justify-center shadow-[2px_2px_0px_#000] shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase text-black">
                      YOU TAP SEND. IT FOLLOWS UP.
                    </h3>
                    <p className="text-[11px] font-bold text-neutral-600 uppercase leading-snug mt-0.5">
                      EMAILS GO FROM YOUR GMAIL, AND TOBEY FOLLOWS UP IN THE SAME THREAD UNTIL SOMEONE REPLIES.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── CARD 5: KNOW THE MOMENT THEY REPLY ── */}
              <div 
                onClick={() => handleSelectStep(5)}
                className={`flex flex-col cursor-pointer transition-all duration-200 group ${
                  activeStep === 5 ? 'scale-[1.01]' : 'hover:opacity-95'
                }`}
              >
                {/* iMessage Window */}
                <div className="bg-white border-3 border-black rounded-xl p-3.5 shadow-[6px_6px_0px_#000] flex flex-col justify-between min-h-[220px]">
                  {/* Window Top Bar */}
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-black">
                      <span className="text-sm">‹</span>
                      <span className="w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-bold">3</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-black text-black">
                      <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[11px] font-black">
                        T
                      </div>
                      <span className="text-sm font-black">Tobey</span>
                    </div>
                    <Video size={16} className="text-neutral-700" />
                  </div>

                  {/* Message Bubbles */}
                  <div className="py-3 space-y-2 font-sans">
                    <div className="flex flex-col items-start relative">
                      <div className="bg-[#E9E9EB] text-black rounded-2xl rounded-tl-sm px-3.5 py-2 max-w-[90%] text-[12px] leading-snug">
                        they wanna talk tuesday. full reply's in your inbox
                      </div>
                      {/* Celebration Sticker Badge */}
                      <div className="absolute -top-2.5 right-1 w-6 h-6 rounded-full bg-[#00F0FF] border border-black flex items-center justify-center text-xs shadow-sm">
                        🎉
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-[#007AFF] text-white rounded-2xl rounded-tr-sm px-3.5 py-1.5 text-[12px] font-bold">
                        LET'S GOOO
                      </div>
                      <span className="text-[10px] text-neutral-400 mt-0.5 mr-1">Read 10:43 AM</span>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="bg-[#E9E9EB] text-black rounded-2xl rounded-tl-sm px-3.5 py-2 max-w-[92%] text-[12px] leading-snug">
                        go get em 🙌 want a quick rundown on them before the call?
                      </div>
                    </div>
                  </div>

                  {/* Window Bottom Bar */}
                  <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 text-neutral-400">
                    <Plus size={16} className="text-neutral-500" />
                    <div className="flex-1 bg-neutral-100 rounded-full px-3 py-1 text-[11px] text-neutral-400 font-sans">
                      iMessage
                    </div>
                    <Mic size={16} className="text-neutral-500" />
                  </div>
                </div>

                {/* Number & Step Label */}
                <div className="mt-3 flex items-start gap-2.5">
                  <div className="w-7 h-7 bg-[#A0E7E5] border-2 border-black font-black text-sm flex items-center justify-center shadow-[2px_2px_0px_#000] shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase text-black">
                      KNOW THE MOMENT THEY REPLY
                    </h3>
                    <p className="text-[11px] font-bold text-neutral-600 uppercase leading-snug mt-0.5">
                      YOU GET A TEXT AS SOON AS A FOUNDER REPLIES, AND THE FULL REPLY IN YOUR INBOX.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── CARD 6: YOUR WHOLE SEARCH, IN ONE PLACE ── */}
              <div 
                onClick={() => handleSelectStep(6)}
                className={`flex flex-col cursor-pointer transition-all duration-200 group ${
                  activeStep === 6 ? 'scale-[1.01]' : 'hover:opacity-95'
                }`}
              >
                {/* iMessage Window */}
                <div className="bg-white border-3 border-black rounded-xl p-3.5 shadow-[6px_6px_0px_#000] flex flex-col justify-between min-h-[220px]">
                  {/* Window Top Bar */}
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-black">
                      <span className="text-sm">‹</span>
                      <span className="w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-bold">3</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-black text-black">
                      <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[11px] font-black">
                        T
                      </div>
                      <span className="text-sm font-black">Tobey</span>
                    </div>
                    <Video size={16} className="text-neutral-700" />
                  </div>

                  {/* Message Bubbles */}
                  <div className="py-3 space-y-2 font-sans">
                    <div className="flex flex-col items-start">
                      <div className="bg-[#E9E9EB] text-black rounded-2xl rounded-tl-sm px-3.5 py-1.5 max-w-[92%] text-[12px] leading-snug">
                        this week: 12 emails out, 3 replies, 1 interview 💥
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="bg-[#E9E9EB] text-black rounded-2xl rounded-tl-sm px-3.5 py-1.5 max-w-[85%] text-[12px] leading-snug">
                        2 follow-ups go out monday
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="bg-[#E9E9EB] text-black rounded-2xl rounded-tl-sm px-3.5 py-1.5 max-w-[90%] text-[12px] leading-snug">
                        everything's here: <span className="text-[#007AFF] underline">hypers.ai/dashboard</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end relative">
                      <div className="bg-[#007AFF] text-white rounded-2xl rounded-tr-sm px-3.5 py-1.5 text-[12px]">
                        ur the goat
                      </div>
                      {/* Heart Sticker Reaction */}
                      <div className="absolute -top-2 left-[-8px] w-5 h-5 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-[11px] shadow-sm">
                        ❤️
                      </div>
                    </div>
                  </div>

                  {/* Window Bottom Bar */}
                  <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 text-neutral-400">
                    <Plus size={16} className="text-neutral-500" />
                    <div className="flex-1 bg-neutral-100 rounded-full px-3 py-1 text-[11px] text-neutral-400 font-sans">
                      iMessage
                    </div>
                    <Mic size={16} className="text-neutral-500" />
                  </div>
                </div>

                {/* Number & Step Label */}
                <div className="mt-3 flex items-start gap-2.5">
                  <div className="w-7 h-7 bg-[#FFB3BA] border-2 border-black font-black text-sm flex items-center justify-center shadow-[2px_2px_0px_#000] shrink-0">
                    6
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase text-black">
                      YOUR WHOLE SEARCH, IN ONE PLACE
                    </h3>
                    <p className="text-[11px] font-bold text-neutral-600 uppercase leading-snug mt-0.5">
                      ASK HOW IT'S GOING ANYTIME, OR SEE EVERY LEAD AND REPLY ON YOUR DASHBOARD.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════════════ */}
          {/* RIGHT: REALISTIC LIVE MOBILE PHONE CHAT DEVICE (REQUESTED BY USER) */}
          {/* ═════════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
            
            <div className="mx-auto max-w-[340px] sm:max-w-[360px] bg-neutral-900 border-4 border-black rounded-[46px] p-3 shadow-[10px_10px_0px_#000] relative">
              
              {/* Outer Edge Speaker Notch & Buttons */}
              <div className="absolute -left-1 top-28 w-1 h-8 bg-neutral-700 rounded-l-sm" />
              <div className="absolute -left-1 top-40 w-1 h-12 bg-neutral-700 rounded-l-sm" />
              <div className="absolute -left-1 top-56 w-1 h-12 bg-neutral-700 rounded-l-sm" />
              <div className="absolute -right-1 top-36 w-1 h-16 bg-neutral-700 rounded-r-sm" />

              {/* iPhone Inner Screen Frame */}
              <div className="bg-[#FAF8F5] border-2 border-neutral-800 rounded-[38px] overflow-hidden flex flex-col h-[640px] relative select-text">
                
                {/* 1. iOS Top Bar & Dynamic Island */}
                <div className="bg-white pt-2.5 px-6 pb-2 border-b border-neutral-200">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-black">
                    <span>9:41</span>
                    {/* Dynamic Island pill */}
                    <div className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2 text-white">
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span>5G</span>
                      <div className="w-4 h-2.5 border border-black rounded-xs p-0.5 flex items-center">
                        <div className="h-full w-full bg-black rounded-2xs" />
                      </div>
                    </div>
                  </div>

                  {/* 2. iMessage Contact Header */}
                  <div className="flex items-center justify-between pt-2.5">
                    <div className="flex items-center gap-1 font-bold text-black text-xs cursor-pointer">
                      <span className="text-base leading-none">‹</span>
                      <span className="w-4 h-4 bg-black text-white text-[9px] rounded-full flex items-center justify-center font-bold">3</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-black text-sm shadow-sm relative">
                        T
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00F0FF] border-2 border-white" />
                      </div>
                      <span className="text-xs font-black text-black mt-0.5">Tobey</span>
                      <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter">
                        AUTONOMOUS OUTBOUND AGENT • ACTIVE
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 text-black">
                      <Video size={16} className="cursor-pointer hover:text-blue-600" />
                      <Phone size={14} className="cursor-pointer hover:text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* 3. Live Scrollable Chat Thread */}
                <div 
                  ref={chatScrollRef}
                  className="flex-1 p-3.5 overflow-y-auto space-y-2.5 font-sans text-xs scroll-smooth"
                >
                  <div className="text-center my-1">
                    <span className="px-2.5 py-0.5 bg-neutral-200/70 text-neutral-500 rounded-full text-[10px] font-medium font-sans">
                      Today • Encrypted Agent Session
                    </span>
                  </div>

                  {phoneMessages.map((msg) => (
                    <div
                      key={msg.id}
                      id={`phone-msg-${msg.id}`}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} transition-all`}
                    >
                      <div 
                        className={`relative px-3.5 py-2 max-w-[85%] rounded-2xl shadow-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#007AFF] text-white rounded-tr-xs'
                            : 'bg-white border border-neutral-200 text-black rounded-tl-xs'
                        }`}
                      >
                        {msg.isAudio && (
                          <div 
                            className="flex items-center gap-2 mb-1 cursor-pointer"
                            onClick={toggleAudio}
                          >
                            <div className="w-5 h-5 rounded-full bg-white text-[#007AFF] flex items-center justify-center">
                              {isPlayingAudio ? <Pause size={10} className="fill-[#007AFF]" /> : <Play size={10} className="fill-[#007AFF] ml-0.5" />}
                            </div>
                            <div className="flex items-center gap-0.5 h-3.5">
                              {[8, 14, 6, 18, 10, 20, 8, 12, 18, 9, 16, 11, 17, 7, 14].map((h, i) => (
                                <div 
                                  key={i} 
                                  className={`w-0.5 bg-white/90 rounded-full ${isPlayingAudio ? 'animate-pulse' : ''}`}
                                  style={{ height: `${h}px` }}
                                />
                              ))}
                            </div>
                            <span className="text-[10px] text-white/90 font-mono">{msg.audioDuration}</span>
                          </div>
                        )}

                        <p className="text-[12px]">{msg.text}</p>

                        {/* Reaction sticker if present */}
                        {msg.reaction && (
                          <div className={`absolute -top-2 ${msg.sender === 'user' ? '-left-2' : '-right-2'} w-5 h-5 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-[11px] shadow-sm`}>
                            {msg.reaction}
                          </div>
                        )}
                      </div>

                      {/* Status / Timestamp */}
                      {msg.status && (
                        <span className="text-[9px] text-neutral-400 mt-0.5 mr-1 font-sans">
                          {msg.status}
                        </span>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-1 bg-white border border-neutral-200 px-3 py-1.5 rounded-full w-12 shadow-xs">
                      <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}
                </div>

                {/* 4. Quick Action Interactive Prompt Chips */}
                <div className="bg-white/95 border-t border-neutral-200 px-3 py-2 overflow-x-auto flex gap-1.5 text-[10px] font-bold uppercase no-scrollbar">
                  <button
                    onClick={() => sendQuickAction("Find 5 early-stage AI startups hiring right now")}
                    className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-neutral-200 border border-black/30 rounded-full text-black whitespace-nowrap active:scale-95 transition-all"
                  >
                    ☀️ 5 MORNING PICKS
                  </button>
                  <button
                    onClick={() => sendQuickAction("Draft intro to Resend founder")}
                    className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-neutral-200 border border-black/30 rounded-full text-black whitespace-nowrap active:scale-95 transition-all"
                  >
                    ✉️ DRAFT INTRO NOTE
                  </button>
                  <button
                    onClick={() => sendQuickAction("Make it shorter and punchier")}
                    className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-neutral-200 border border-black/30 rounded-full text-black whitespace-nowrap active:scale-95 transition-all"
                  >
                    ✂️ SHORTEN
                  </button>
                  <button
                    onClick={() => sendQuickAction("Approve and send from my Gmail")}
                    className="px-2.5 py-1 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] border border-black rounded-full text-black whitespace-nowrap active:scale-95 transition-all font-black"
                  >
                    🚀 APPROVE & SEND
                  </button>
                </div>

                {/* 5. iMessage Input Bar */}
                <form 
                  id="phone-chat-form"
                  onSubmit={handleSendMessage}
                  className="bg-white p-2.5 border-t border-neutral-200 flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 cursor-pointer hover:bg-neutral-200">
                    <Plus size={15} />
                  </div>

                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Message Tobey..."
                    className="flex-1 bg-neutral-100 border border-neutral-200 rounded-full px-3.5 py-1.5 text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
                  />

                  {chatInput.trim() ? (
                    <button
                      type="submit"
                      className="w-7 h-7 rounded-full bg-[#007AFF] text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-sm"
                    >
                      <Send size={12} className="ml-0.5" />
                    </button>
                  ) : (
                    <div 
                      onClick={() => sendQuickAction("yo so I'm an engineer looking for remote early-stage teams")}
                      className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 cursor-pointer hover:bg-neutral-200"
                    >
                      <Mic size={15} />
                    </div>
                  )}
                </form>

                {/* Home Indicator Bar */}
                <div className="bg-white pb-2 pt-1 flex justify-center">
                  <div className="w-32 h-1 bg-black rounded-full" />
                </div>

              </div>

            </div>

            {/* Sub-label for phone */}
            <div className="text-center mt-3">
              <span className="text-[10px] font-black uppercase text-neutral-500 tracking-wider">
                LIVE INTERACTIVE TOBEY CHAT // TAP CHIPS OR TYPE TO TEST
              </span>
            </div>

          </div>

        </div>

        <div className="mt-12 p-6 sm:p-8 bg-black text-white border-4 border-black shadow-[8px_8px_0px_#000] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-[#CCFF00]">
                TOBEY IS LIVE AND SCANNING RIGHT NOW
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              YOUR FIRST FOUNDER EMAIL GOES OUT TODAY.
            </h3>
            <p className="text-xs font-bold text-neutral-400 uppercase mt-1">
              CONNECT GMAIL. TOBEY DRAFTS A PROOF-OF-WORK NOTE WITHIN 60 SECONDS. ZERO COMMITMENTS.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/auth"
              className="px-6 py-3.5 bg-[#CCFF00] hover:bg-[#FFDE59] text-black font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#fff] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              [ CONNECT GMAIL & SEND 1ST DRAFT ]
            </Link>
            <Link
              to="/ide"
              className="px-4 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-black text-xs uppercase border-2 border-white active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              [ RUN LIVE FDE TEST GAUNTLET ]
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
