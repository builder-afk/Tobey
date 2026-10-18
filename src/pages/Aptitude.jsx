import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Calculator, Brain, MessageSquare, ArrowRight, ArrowLeft, 
  CheckCircle2, XCircle, Clock, Trophy, Target, RotateCcw,
  ChevronRight, ChevronLeft, BookOpen, Lightbulb, BarChart3,
  Zap, Filter, Hash, Sparkles, ArrowUpRight
} from 'lucide-react';
import { quantitativeQuestions, logicalReasoningQuestions, verbalAbilityQuestions } from '../data/aptitudeQuestions';

// ─── Category Metadata ──────────────────────────────────────────────────────
const categoryConfig = {
  Quantitative: {
    icon: Calculator,
    color: '#00F0FF',
    accent: 'bg-[#00F0FF]',
    questions: quantitativeQuestions,
    subtopics: ['All', 'Number System', 'Percentage', 'Profit & Loss', 'Time & Work', 'Speed & Distance', 'Probability', 'Permutations & Combinations', 'Ratio & Proportion', 'Interest', 'Ages', 'Averages']
  },
  'Logical Reasoning': {
    icon: Brain,
    color: '#CCFF00',
    accent: 'bg-[#CCFF00]',
    questions: logicalReasoningQuestions,
    subtopics: ['All', 'Blood Relations', 'Coding-Decoding', 'Number Series', 'Letter Series', 'Syllogism', 'Seating Arrangement', 'Direction Sense', 'Puzzles', 'Statements & Assumptions', 'Cause & Effect', 'Critical Reasoning', 'Data Sufficiency', 'Logical Deduction', 'Input-Output', 'Analogy', 'Odd One Out', 'Ranking', 'Miscellaneous']
  },
  'Verbal Ability': {
    icon: MessageSquare,
    color: '#FFDE59',
    accent: 'bg-[#FFDE59]',
    questions: verbalAbilityQuestions,
    subtopics: ['All', 'Synonyms', 'Antonyms', 'Error Spotting', 'Sentence Correction', 'Reading Comprehension', 'Idioms', 'One Word Substitution', 'Fill in the Blanks', 'Sentence Rearrangement', 'Cloze Test', 'Vocabulary', 'Active-Passive Voice', 'Direct-Indirect Speech']
  }
};

// ─── Quiz Session Component ─────────────────────────────────────────────────
function QuizSession({ category, onBack }) {
  const config = categoryConfig[category];
  const Icon = config.icon;
  
  const [selectedSubtopic, setSelectedSubtopic] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showSubtopicFilter, setShowSubtopicFilter] = useState(false);

  const questions = useMemo(() => {
    if (selectedSubtopic === 'All') return config.questions;
    return config.questions.filter(q => q.subtopic === selectedSubtopic);
  }, [selectedSubtopic, config.questions]);

  const currentQuestion = questions[currentIndex] || questions[0];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answered).length;

  useEffect(() => {
    if (quizCompleted) return;
    const timer = setInterval(() => setTimeElapsed(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, [quizCompleted]);

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswered({});
    setTimeElapsed(0);
    setQuizCompleted(false);
  }, [selectedSubtopic]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIndex) => {
    if (answered[currentQuestion.id] !== undefined) return;
    
    setSelectedAnswer(optionIndex);
    const isCorrect = optionIndex === currentQuestion.answer;
    if (isCorrect) setScore(s => s + 1);
    setAnswered(prev => ({ ...prev, [currentQuestion.id]: { selected: optionIndex, correct: isCorrect } }));
    setShowExplanation(true);
  };

  const goToNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      const prevQ = questions[currentIndex - 1];
      const prevAnswer = answered[prevQ.id];
      setSelectedAnswer(prevAnswer ? prevAnswer.selected : null);
      setShowExplanation(prevAnswer !== undefined);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswered({});
    setTimeElapsed(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    return (
      <div className="flex h-full items-center justify-center p-6 font-mono overflow-y-auto">
        <div className="bg-white border-4 border-black p-8 md:p-12 max-w-xl w-full text-center shadow-[10px_10px_0px_#000]">
          <span className="px-3 py-1 bg-black text-white text-xs font-black uppercase inline-block mb-4">
            [ ROUND 1 DRILL COMPLETE ]
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-black uppercase mb-2">
            {accuracy >= 80 ? 'EXCEPTIONAL' : accuracy >= 60 ? 'QUALIFIED' : 'KEEP DRILLING'}
          </h2>
          <p className="text-xs font-bold text-gray-700 uppercase mb-6">
            {category} // {selectedSubtopic.toUpperCase()} SUBTOPIC
          </p>

          <div className="bg-[#F0EDE6] border-3 border-black p-6 shadow-[4px_4px_0px_#000] mb-8">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                <span className="text-[10px] font-black uppercase text-gray-600 block">SCORE</span>
                <span className="text-2xl font-black text-black">{score}/{totalQuestions}</span>
              </div>
              <div className="bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                <span className="text-[10px] font-black uppercase text-gray-600 block">ACCURACY</span>
                <span className="text-2xl font-black text-black">{accuracy}%</span>
              </div>
              <div className="bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                <span className="text-[10px] font-black uppercase text-gray-600 block">TIME</span>
                <span className="text-2xl font-black text-black">{formatTime(timeElapsed)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={restartQuiz}
              className="flex-1 py-3 bg-white hover:bg-[#FFDE59] border-3 border-black text-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              [ RE-ATTEMPT ]
            </button>
            <button
              onClick={onBack}
              className="flex-1 py-3 bg-[#CCFF00] hover:bg-[#FFDE59] border-3 border-black text-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              [ ALL CATEGORIES ]
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isAnswered = answered[currentQuestion.id] !== undefined;

  return (
    <div className="flex h-full flex-col font-mono overflow-y-auto pb-10">
      {/* Top Bar */}
      <div className="border-b-4 border-black bg-white px-6 py-4 flex items-center justify-between flex-wrap gap-4 shadow-[0_4px_0px_#000] shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 bg-[#F0EDE6] hover:bg-[#FFDE59] border-2 border-black text-black shadow-[2px_2px_0px_#000] transition-colors"
          >
            <ArrowLeft size={16} className="stroke-[3]" />
          </button>
          <div>
            <div className="inline-block px-1.5 py-0.2 bg-black text-white text-[9px] font-black uppercase">
              {category}
            </div>
            <h2 className="text-sm md:text-base font-black text-black uppercase">
              SUBTOPIC: {currentQuestion.subtopic}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFDE59] border-2 border-black shadow-[2px_2px_0px_#000]">
            <Clock size={14} className="stroke-[2.5]" />
            <span className="text-xs font-black text-black">{formatTime(timeElapsed)}</span>
          </div>
          <div className="px-3 py-1.5 bg-black text-white border-2 border-black text-xs font-black uppercase">
            Q {currentIndex + 1} / {totalQuestions}
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-10">
        <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] mb-8">
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-black">
            <span className="px-2 py-0.5 bg-[#00F0FF] border border-black text-[10px] font-black uppercase">
              #{currentIndex + 1} OF {totalQuestions}
            </span>
            <span className="text-xs font-black text-gray-600 uppercase">
              {currentQuestion.subtopic}
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-black text-black uppercase leading-snug mb-8">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx || answered[currentQuestion.id]?.selected === idx;
              const isCorrectOption = idx === currentQuestion.answer;
              
              let optStyle = "bg-white border-3 border-black text-black hover:bg-[#F0EDE6]";
              if (isAnswered) {
                if (isCorrectOption) {
                  optStyle = "bg-[#CCFF00] border-3 border-black text-black font-black shadow-[3px_3px_0px_#000]";
                } else if (isSelected && !answered[currentQuestion.id]?.correct) {
                  optStyle = "bg-[#FF0033] border-3 border-black text-white font-black shadow-[3px_3px_0px_#000]";
                }
              } else if (isSelected) {
                optStyle = "bg-[#00F0FF] border-3 border-black text-black font-black shadow-[4px_4px_0px_#000]";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 border-2 flex items-center justify-between gap-4 transition-all active:translate-x-0.5 active:translate-y-0.5 ${optStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 bg-black text-white flex items-center justify-center text-xs font-black border border-black shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs md:text-sm font-bold uppercase">{opt}</span>
                  </div>
                  {isAnswered && isCorrectOption && <CheckCircle2 size={18} className="stroke-[3] text-black shrink-0" />}
                  {isAnswered && isSelected && !answered[currentQuestion.id]?.correct && <XCircle size={18} className="stroke-[3] text-white shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && currentQuestion.explanation && (
            <div className="mt-8 p-5 bg-[#FFDE59] border-3 border-black shadow-[4px_4px_0px_#000]">
              <div className="flex items-center gap-2 mb-2 font-black text-xs uppercase text-black">
                <Lightbulb size={16} className="stroke-[2.5]" /> STEP-BY-STEP SOLUTION
              </div>
              <p className="text-xs md:text-sm text-black font-bold uppercase leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Footer Nav */}
        <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000] flex items-center justify-between gap-4">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="px-5 py-2.5 bg-white hover:bg-[#FFDE59] border-2 border-black text-black font-black text-xs uppercase disabled:opacity-30 disabled:cursor-not-allowed shadow-[2px_2px_0px_#000]"
          >
            [ ← PREV ]
          </button>

          <span className="text-xs font-black text-black uppercase">
            ANSWERED: {answeredCount} / {totalQuestions}
          </span>

          {isAnswered ? (
            <button
              onClick={goToNext}
              className="px-6 py-2.5 bg-[#CCFF00] hover:bg-[#FFDE59] border-2 border-black text-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]"
            >
              {currentIndex === totalQuestions - 1 ? '[ FINISH DRILL ]' : '[ NEXT → ]'}
            </button>
          ) : (
            <span className="text-xs font-bold text-gray-500 uppercase">
              SELECT AN OPTION TO ADVANCE
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Aptitude Component ────────────────────────────────────────────────
export default function Aptitude() {
  const [activeCategory, setActiveCategory] = useState(null);

  if (activeCategory) {
    return (
      <QuizSession category={activeCategory} onBack={() => setActiveCategory(null)} />
    );
  }

  const categories = [
    { 
      title: 'Quantitative', 
      icon: Calculator, 
      accent: 'bg-[#00F0FF]',
      desc: 'NUMBER SYSTEM, PERCENTAGE, PROFIT & LOSS, TIME & WORK, SPEED & DISTANCE, PROBABILITY, P&C, RATIO, INTEREST, AGES.',
      count: quantitativeQuestions.length
    },
    { 
      title: 'Logical Reasoning', 
      icon: Brain, 
      accent: 'bg-[#CCFF00]',
      desc: 'BLOOD RELATIONS, CODING-DECODING, SYLLOGISMS, SEATING ARRANGEMENT, NUMBER SERIES, DIRECTION SENSE, PUZZLES.',
      count: logicalReasoningQuestions.length
    },
    { 
      title: 'Verbal Ability', 
      icon: MessageSquare, 
      accent: 'bg-[#FFDE59]',
      desc: 'SYNONYMS, ANTONYMS, ERROR SPOTTING, READING COMPREHENSION, IDIOMS, FILL IN THE BLANKS, VOICE & SPEECH.',
      count: verbalAbilityQuestions.length
    }
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto custom-scrollbar font-mono pb-20">
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] text-black font-black text-xs uppercase tracking-wider mb-4">
            <Zap size={14} className="stroke-[2.5]" />
            <span>[ SCREENING ROUND PROTOCOLS // TCS, INFOSYS, WIPRO ]</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight mb-4 flex items-center flex-wrap gap-3">
            APTITUDE
            <span className="bg-[#00F0FF] text-black px-3 py-1 border-4 border-black shadow-[5px_5px_0px_#000]">
              PREPARATION
            </span>
          </h1>

          <p className="text-xs md:text-sm font-bold text-gray-700 max-w-3xl uppercase tracking-wide leading-relaxed bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000]">
            // MASTER ROUND-1 RECRUITMENT SCREENERS FOR PRODUCT AND SERVICE-BASED ORGANIZATIONS. 100 HAND-CURATED PROBLEMS PER COHORT WITH EXPLANATORY RATIONALE.
          </p>
        </div>

        {/* 3 Categories Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <div 
                key={cat.title} 
                className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 border-3 border-black ${cat.accent} flex items-center justify-center shadow-[3px_3px_0px_#000]`}>
                      <CatIcon size={28} className="text-black stroke-[2.5]" />
                    </div>
                    <span className="px-2.5 py-1 bg-black text-white text-[10px] font-black uppercase">
                      {cat.count} PROBLEMS
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-black uppercase mb-3 group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </h2>

                  <p className="text-xs text-gray-700 font-bold uppercase leading-relaxed mb-8">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-black">
                  <button 
                    onClick={() => setActiveCategory(cat.title)}
                    className="w-full py-3 px-4 bg-[#CCFF00] group-hover:bg-[#FFDE59] border-2 border-black text-black font-black text-xs uppercase flex items-center justify-between shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    <span>[ START PRACTICE ]</span>
                    <ArrowUpRight size={16} className="stroke-[3]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#FFDE59] border-3 border-black p-4 shadow-[4px_4px_0px_#000] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-black">INDEXED PROBLEMS</span>
              <h3 className="text-2xl font-black text-black uppercase">300 TOTAL</h3>
            </div>
            <Hash size={28} className="stroke-[2.5]" />
          </div>

          <div className="bg-[#CCFF00] border-3 border-black p-4 shadow-[4px_4px_0px_#000] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-black">SYLLABUS TOPICS</span>
              <h3 className="text-2xl font-black text-black uppercase">25+ MODULES</h3>
            </div>
            <BookOpen size={28} className="stroke-[2.5]" />
          </div>

          <div className="bg-[#00F0FF] border-3 border-black p-4 shadow-[4px_4px_0px_#000] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-black">EXAM TARGET</span>
              <h3 className="text-2xl font-black text-black uppercase">100% PLACEMENT</h3>
            </div>
            <Trophy size={28} className="stroke-[2.5]" />
          </div>
        </div>

        {/* Mock Test Banner */}
        <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase inline-block mb-2">
              SIMULATED BENCHMARKS
            </span>
            <h3 className="text-2xl font-black text-black uppercase mb-2">
              FULL-LENGTH COMPANY MOCK EXAMS
            </h3>
            <p className="text-xs md:text-sm font-bold text-gray-700 uppercase max-w-xl leading-relaxed">
              TAKE TIMED 90-MINUTE EXAMINATIONS EMULATING THE EXACT PATTERNS AND TIME LIMITS OF TCS NQT, INFOSYS, IBM, AND ACCENTURE.
            </p>
          </div>
          <button 
            onClick={() => alert("Loading company mock assessment suites...")}
            className="py-3.5 px-6 bg-[#CCFF00] hover:bg-[#FFDE59] border-3 border-black text-black font-black text-xs uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all whitespace-nowrap"
          >
            [ VIEW ALL MOCKS → ]
          </button>
        </div>
      </div>
    </div>
  );
}