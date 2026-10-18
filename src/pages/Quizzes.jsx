import { Clock, CheckCircle2, XCircle, ChevronRight, BarChart, ArrowLeft, RotateCcw, Trophy, BookOpen, Sparkles, Timer, ArrowUpRight, Flame, Layers } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { quizTopics } from '../data/quizQuestions';

// ═══════════════════════════════════════════════════════════════════════════════
// INTERACTIVE QUIZZES PAGE — Neo-Brutalist UI/UX
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Quiz Session Component ─────────────────────────────────────────────────
function QuizSession({ topicName, topicData, onBack }) {
  const questions = topicData.questions;
  const totalQuestions = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalQuestions * 60); // 1 min per question
  const [showExplanation, setShowExplanation] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    if (quizCompleted) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setQuizCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [quizCompleted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (qIndex, optIndex) => {
    if (quizCompleted && !reviewMode) return;
    if (reviewMode) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
    setShowExplanation(false);
  };

  const goToQuestion = (index) => {
    setCurrentIndex(index);
    setShowExplanation(false);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowExplanation(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowExplanation(false);
    }
  };

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    setQuizCompleted(true);
  };

  const getScore = useCallback(() => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) correct++;
    });
    return correct;
  }, [selectedAnswers, questions]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setTimeLeft(totalQuestions * 60);
    setShowExplanation(false);
    setReviewMode(false);
  };

  const handleReview = () => {
    setReviewMode(true);
    setCurrentIndex(0);
    setShowExplanation(true);
  };

  const currentQ = questions[currentIndex];
  const score = quizCompleted ? getScore() : 0;
  const accuracy = quizCompleted ? Math.round((score / totalQuestions) * 100) : 0;
  const isAnswered = selectedAnswers[currentIndex] !== undefined;

  // ── Quiz Completed View ──
  if (quizCompleted && !reviewMode) {
    const grade = accuracy >= 80 ? 'EXCELLENT!' : accuracy >= 60 ? 'SOLID EXECUTION!' : accuracy >= 40 ? 'KEEP PRACTICING!' : 'NEEDS REVISION';
    const gradeBg = accuracy >= 80 ? 'bg-[#CCFF00]' : accuracy >= 60 ? 'bg-[#00F0FF]' : accuracy >= 40 ? 'bg-[#FFDE59]' : 'bg-[#FF0033] text-white';

    return (
      <div className="flex h-full items-center justify-center p-6 font-mono overflow-y-auto">
        <div className="bg-white border-4 border-black p-8 md:p-12 max-w-2xl w-full text-center shadow-[10px_10px_0px_#000]">
          <div className="inline-block px-3 py-1 bg-black text-white text-xs font-black uppercase mb-4">
            [ EVALUATION COMPLETE ]
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-black uppercase mb-2">{grade}</h2>
          <p className="text-xs md:text-sm font-bold text-gray-700 uppercase mb-8">
            {topicName} ASSESSMENT // {totalQuestions} QUESTIONS EVALUATED
          </p>

          {/* Score Matrix */}
          <div className="bg-[#F0EDE6] border-3 border-black p-6 shadow-[4px_4px_0px_#000] mb-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                <p className="text-[10px] font-black uppercase text-gray-600">CORRECT</p>
                <p className="text-2xl font-black text-black">{score} / {totalQuestions}</p>
              </div>
              <div className="bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                <p className="text-[10px] font-black uppercase text-gray-600">ACCURACY</p>
                <p className="text-2xl font-black text-black">{accuracy}%</p>
              </div>
              <div className="bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                <p className="text-[10px] font-black uppercase text-gray-600">REMAINING</p>
                <p className="text-2xl font-black text-black">{formatTime(timeLeft)}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRestart}
              className="flex-1 py-3 px-4 bg-white hover:bg-[#FFDE59] border-3 border-black text-black font-black text-xs uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} className="stroke-[2.5]" />
              <span>[ RETRY ASSESSMENT ]</span>
            </button>
            <button
              onClick={handleReview}
              className="flex-1 py-3 px-4 bg-[#00F0FF] hover:bg-black hover:text-white border-3 border-black text-black font-black text-xs uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen size={16} className="stroke-[2.5]" />
              <span>[ REVIEW EXPLANATIONS ]</span>
            </button>
            <button
              onClick={onBack}
              className="flex-1 py-3 px-4 bg-[#CCFF00] hover:bg-[#FFDE59] border-3 border-black text-black font-black text-xs uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <span>[ BACK TO TOPICS ]</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Quiz Active / Review View ──
  return (
    <div className="flex h-full flex-col font-mono overflow-y-auto pb-10">
      {/* Top Protocol Bar */}
      <div className="border-b-4 border-black bg-white px-6 py-4 flex items-center justify-between flex-wrap gap-4 shadow-[0_4px_0px_#000] shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 bg-[#F0EDE6] hover:bg-[#FFDE59] border-2 border-black text-black shadow-[2px_2px_0px_#000] transition-colors"
          >
            <ArrowLeft size={16} className="stroke-[3]" />
          </button>
          <div>
            <span className="text-[10px] font-black uppercase text-gray-600 block">TOPIC EVALUATION</span>
            <h2 className="text-base md:text-lg font-black text-black uppercase">{topicName}</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFDE59] border-2 border-black shadow-[2px_2px_0px_#000]">
            <Timer size={16} className="stroke-[2.5] text-black" />
            <span className="text-xs font-black text-black tracking-wider">{formatTime(timeLeft)}</span>
          </div>
          <div className="px-3 py-1.5 bg-black text-white border-2 border-black text-xs font-black uppercase">
            Q {currentIndex + 1} / {totalQuestions}
          </div>
        </div>
      </div>

      {/* Main Question Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-10">
        <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] mb-8">
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-black">
            <span className="px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase">
              QUESTION #{currentIndex + 1}
            </span>
            {reviewMode && (
              <span className={`px-2.5 py-0.5 border border-black text-xs font-black uppercase ${
                selectedAnswers[currentIndex] === currentQ.answer ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
              }`}>
                {selectedAnswers[currentIndex] === currentQ.answer ? 'CORRECT' : 'INCORRECT'}
              </span>
            )}
          </div>

          <h3 className="text-lg md:text-xl font-black text-black uppercase leading-snug mb-8">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedAnswers[currentIndex] === i;
              const isCorrectOption = i === currentQ.answer;
              
              let optStyle = "bg-white border-3 border-black text-black hover:bg-[#F0EDE6]";
              if (reviewMode) {
                if (isCorrectOption) {
                  optStyle = "bg-[#CCFF00] border-3 border-black text-black font-black shadow-[3px_3px_0px_#000]";
                } else if (isSelected && !isCorrectOption) {
                  optStyle = "bg-[#FF0033] border-3 border-black text-white font-black shadow-[3px_3px_0px_#000]";
                }
              } else if (isSelected) {
                optStyle = "bg-[#00F0FF] border-3 border-black text-black font-black shadow-[4px_4px_0px_#000]";
              }

              return (
                <button
                  key={i}
                  disabled={reviewMode || quizCompleted}
                  onClick={() => handleSelectAnswer(currentIndex, i)}
                  className={`w-full text-left p-4 border-2 flex items-center justify-between gap-4 transition-all active:translate-x-0.5 active:translate-y-0.5 ${optStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 bg-black text-white flex items-center justify-center text-xs font-black border border-black shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-xs md:text-sm font-bold uppercase">{opt}</span>
                  </div>
                  {reviewMode && isCorrectOption && <CheckCircle2 size={18} className="stroke-[3] text-black shrink-0" />}
                  {reviewMode && isSelected && !isCorrectOption && <XCircle size={18} className="stroke-[3] text-white shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {(reviewMode || (showExplanation && isAnswered)) && currentQ.explanation && (
            <div className="mt-8 p-5 bg-[#FFDE59] border-3 border-black shadow-[4px_4px_0px_#000]">
              <div className="flex items-center gap-2 mb-2 font-black text-xs uppercase text-black">
                <Sparkles size={16} className="stroke-[2.5]" /> EXPLANATION & KEY CONCEPT
              </div>
              <p className="text-xs md:text-sm text-black font-bold uppercase leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {!reviewMode && isAnswered && !showExplanation && (
            <button
              onClick={() => setShowExplanation(true)}
              className="mt-4 text-xs font-black text-black uppercase underline hover:text-blue-600 block"
            >
              [ VIEW EXPLANATION ]
            </button>
          )}
        </div>

        {/* Bottom Navigation & Question Map */}
        <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000] flex flex-col md:flex-row items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-full md:w-auto px-4 py-2 bg-white hover:bg-[#FFDE59] border-2 border-black text-black font-black text-xs uppercase disabled:opacity-30 disabled:cursor-not-allowed shadow-[2px_2px_0px_#000]"
          >
            [ ← PREV ]
          </button>

          {/* Quick Jump Bar */}
          <div className="flex gap-1.5 flex-wrap justify-center max-w-md">
            {questions.map((_, i) => {
              const answeredQ = selectedAnswers[i] !== undefined;
              let jumpStyle = "bg-[#F0EDE6] text-black";
              if (i === currentIndex) jumpStyle = "bg-[#00F0FF] text-black font-black ring-2 ring-black";
              else if (answeredQ) jumpStyle = "bg-[#CCFF00] text-black";

              return (
                <button
                  key={i}
                  onClick={() => goToQuestion(i)}
                  className={`w-7 h-7 border border-black text-xs font-black flex items-center justify-center ${jumpStyle}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          {currentIndex === totalQuestions - 1 ? (
            reviewMode ? (
              <button
                onClick={onBack}
                className="w-full md:w-auto px-5 py-2 bg-[#CCFF00] hover:bg-[#FFDE59] border-2 border-black text-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]"
              >
                [ EXIT REVIEW ]
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full md:w-auto px-5 py-2 bg-[#CCFF00] hover:bg-black hover:text-white border-2 border-black text-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]"
              >
                [ FINISH QUIZ ]
              </button>
            )
          ) : (
            <button
              onClick={handleNext}
              className="w-full md:w-auto px-5 py-2 bg-[#CCFF00] hover:bg-[#FFDE59] border-2 border-black text-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]"
            >
              [ NEXT → ]
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Quizzes Landing Page ──────────────────────────────────────────────
export default function Quizzes() {
  const [activeTopic, setActiveTopic] = useState(null);
  const topicNames = Object.keys(quizTopics);

  if (activeTopic) {
    return (
      <QuizSession
        topicName={activeTopic}
        topicData={quizTopics[activeTopic]}
        onBack={() => setActiveTopic(null)}
      />
    );
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto custom-scrollbar font-mono pb-20">
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] text-black font-black text-xs uppercase tracking-wider mb-4">
            <Sparkles size={14} className="stroke-[2.5]" />
            <span>[ REAL-TIME EVALUATION // KNOWLEDGE ASSESSMENTS ]</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight mb-4 flex items-center flex-wrap gap-3">
            INTERACTIVE
            <span className="bg-[#CCFF00] text-black px-3 py-1 border-4 border-black shadow-[5px_5px_0px_#000]">
              QUIZZES
            </span>
          </h1>

          <p className="text-xs md:text-sm font-bold text-gray-700 max-w-3xl uppercase tracking-wide leading-relaxed bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000]">
            // TEST RETENTION ACROSS ALL CORE CS SUBJECTS. 25 TIMED QUESTIONS PER TOPIC, INSTANT OBJECTIVE SCORING, AND DETAILED ARCHITECTURAL RATIONALE.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'TOTAL QUESTIONS', value: '200+', bg: 'bg-[#FFDE59]' },
            { label: 'DOMAINS INDEXED', value: topicNames.length, bg: 'bg-[#00F0FF]' },
            { label: 'PER ASSESSMENT', value: '25 Qs', bg: 'bg-[#CCFF00]' },
            { label: 'TIME ALLOTMENT', value: '25 MIN', bg: 'bg-[#FF52D9]' },
          ].map((stat, i) => (
            <div key={i} className={`p-4 border-3 border-black ${stat.bg} shadow-[4px_4px_0px_#000]`}>
              <p className="text-[10px] font-black uppercase text-black">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-black text-black uppercase mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Featured Contest & Top 5 Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Featured Contest */}
          <div className="lg:col-span-2 bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 bg-[#CCFF00] border-2 border-black text-black font-black text-[10px] uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                  LIVE CONTEST
                </span>
                <span className="text-xs font-black text-black uppercase">COMMUNITY TOURNAMENT</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase mb-2">
                WEEKLY DSA CHALLENGE #45
              </h2>
              <p className="text-xs md:text-sm font-bold text-gray-700 uppercase leading-relaxed mb-6">
                3 HARD ALGORITHMIC PUZZLES • 90 MINUTES • FAANG INTERVIEW PATTERN. TOP 10 QUALIFIERS RECEIVE HYPERS FOUNDER PASS.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t-2 border-black">
              <button 
                onClick={() => setActiveTopic('Data Structures')}
                className="py-3 px-6 bg-[#00F0FF] hover:bg-[#FFDE59] border-3 border-black text-black font-black text-xs uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>[ ENTER CHALLENGE ARENA ]</span>
                <ArrowUpRight size={14} className="stroke-[3]" />
              </button>
              <div className="flex items-center gap-2 text-xs font-black text-black uppercase bg-[#F0EDE6] border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000]">
                <Clock size={14} className="stroke-[2.5]" />
                <span>STARTS IN 02H 45M</span>
              </div>
            </div>
          </div>

          {/* Global Top 5 Snapshot */}
          <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-2">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-black stroke-[2.5]" />
                <h3 className="text-xs font-black text-black uppercase">GLOBAL TOP 5</h3>
              </div>
              <span className="text-[10px] font-black uppercase text-gray-600">LIVE LEADERBOARD</span>
            </div>

            <div className="space-y-2 mb-4">
              {[
                { rank: '#1', name: 'AlexTheDev', score: '14,250', bg: 'bg-[#FFDE59]' },
                { rank: '#2', name: 'coder_girl_99', score: '13,900', bg: 'bg-[#00F0FF]' },
                { rank: '#3', name: 'byte_me', score: '13,420', bg: 'bg-[#FF52D9]' },
                { rank: '#4', name: 'john_doe12', score: '12,800', bg: 'bg-[#CCFF00]' },
                { rank: '#5', name: 'neo_matrix', score: '12,150', bg: 'bg-[#F0EDE6]' },
              ].map(u => (
                <div key={u.rank} className="flex items-center justify-between p-2 bg-[#FBF9F5] border border-black text-xs font-black uppercase">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 border border-black flex items-center justify-center text-[10px] ${u.bg}`}>
                      {u.rank}
                    </span>
                    <span>{u.name}</span>
                  </div>
                  <span>{u.score} PTS</span>
                </div>
              ))}
            </div>

            <span className="text-[10px] font-black uppercase text-gray-500 text-center block pt-2 border-t border-black">
              INDEXED FROM RECENT CONTEST CYCLES
            </span>
          </div>
        </div>

        {/* Topics Grid */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="p-1 bg-[#FFDE59] border-2 border-black">
              <Layers size={16} className="text-black stroke-[2.5]" />
            </span>
            <h2 className="text-xl font-black text-black uppercase tracking-tight">
              AVAILABLE TOPIC PROTOCOLS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topicNames.map((name, i) => {
              const tData = quizTopics[name];
              const accents = ['bg-[#FFDE59]', 'bg-[#CCFF00]', 'bg-[#00F0FF]', 'bg-[#FF52D9]'];
              const accent = accents[i % accents.length];

              return (
                <div
                  key={name}
                  onClick={() => setActiveTopic(name)}
                  className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 border-3 border-black ${accent} flex items-center justify-center text-xl shadow-[3px_3px_0px_#000]`}>
                        {tData.icon || '📝'}
                      </div>
                      <span className="px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase">
                        {tData.questions.length} QS
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-black uppercase mb-1 group-hover:text-blue-600 transition-colors">
                      {name}
                    </h3>
                    <p className="text-xs font-bold text-gray-600 uppercase mb-6 leading-relaxed">
                      {tData.description || 'TIMED EVALUATION OVER CORE CONCEPTS AND REASONING.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t-2 border-black">
                    <button className="w-full py-2 px-3 bg-[#CCFF00] group-hover:bg-[#FFDE59] border-2 border-black text-black font-black text-xs uppercase flex items-center justify-between shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
                      <span>[ START QUIZ ]</span>
                      <ArrowUpRight size={14} className="stroke-[3]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}