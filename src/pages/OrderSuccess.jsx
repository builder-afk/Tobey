import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, ArrowRight, Terminal, Zap, BookOpen, ExternalLink } from 'lucide-react';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id') || searchParams.get('orderId') || 'HYPERS-ORD-SUCCESS';
  const amount = searchParams.get('amount') || '2,799.00';
  const utr = searchParams.get('utr') || '123456789012';
  const courseTitle = searchParams.get('course') || 'Frontier Engineering Track';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F0EDE6] text-black font-mono selection:bg-black selection:text-[#FFDE59] select-none py-12 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Navigation / Status Pill */}
        <div className="flex items-center justify-between">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <span>[ ← BACK TO ALL CURRICULA ]</span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#CCFF00] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
            <ShieldCheck size={14} className="stroke-[3]" />
            <span>YOUPI PG // SETTLED</span>
          </div>
        </div>

        {/* Main Brutalist Receipt Box */}
        <div className="bg-white border-4 border-black p-6 sm:p-10 shadow-[10px_10px_0px_#000] space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b-3 border-black">
            <div className="w-12 h-12 bg-[#CCFF00] border-3 border-black flex items-center justify-center shadow-[3px_3px_0px_#000] shrink-0">
              <CheckCircle2 size={26} className="text-black stroke-[3]" />
            </div>
            <div>
              <span className="px-2 py-0.5 bg-black text-[#CCFF00] text-[10px] font-black uppercase">
                TRANSACTION VERIFIED
              </span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-black tracking-tight mt-1">
                ENROLLMENT AUTHORIZED
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-bold text-neutral-700 uppercase leading-relaxed">
            // PAYMENT WAS OBSERVED & SETTLED INSTANTLY VIA YOUPI PG OBSERVER ENGINE. YOUR CANDIDATE PROFILE IS PROVISIONED FOR UNRESTRICTED PRODUCTION ACCESS.
          </p>

          {/* Receipt Matrix */}
          <div className="bg-[#FAF8F5] border-3 border-black p-5 shadow-[4px_4px_0px_#000] space-y-3 text-xs font-bold uppercase">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-300">
              <span className="text-neutral-500">ENROLLED CURRICULUM:</span>
              <span className="text-black font-black text-right max-w-xs truncate">{courseTitle}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-neutral-300">
              <span className="text-neutral-500">GATEWAY ORDER ID:</span>
              <span className="font-mono font-black text-black">{orderId}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-neutral-300">
              <span className="text-neutral-500">BANK UTR / REFERENCE:</span>
              <span className="font-mono font-black text-emerald-700">{utr}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-neutral-300">
              <span className="text-neutral-500">TUITION SETTLED:</span>
              <span className="text-base font-black text-black">₹{amount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">SETTLEMENT GATEWAY:</span>
              <span className="px-2 py-0.5 bg-[#FFDE59] border border-black font-black text-[10px]">
                YOUPI WHITE-LABEL PG
              </span>
            </div>
          </div>

          {/* Next Steps CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t-2 border-black">
            <Link
              to="/ide"
              className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-[#CCFF00] hover:bg-[#FFDE59] text-black font-black uppercase text-xs tracking-wider border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Terminal size={16} className="stroke-[3]" />
              <span>[ 🚀 ENTER WORKSPACE & INITIALIZE REPO ]</span>
            </Link>

            <Link
              to="/courses"
              className="w-full sm:w-auto py-3.5 px-6 bg-black text-white hover:bg-neutral-800 font-bold uppercase text-xs tracking-wider border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen size={16} />
              <span>[ VIEW ALL COURSES ]</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
