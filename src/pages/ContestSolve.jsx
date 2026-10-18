import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, ArrowLeft, ArrowRight, Bookmark, CheckCircle, 
  CheckCircle2, XCircle, Check, Swords, Trophy, RotateCcw
} from 'lucide-react';
import contestsTracksData from '../data/contestsTracksData';
import kotlinContestData from '../data/kotlinContestData';

export default function ContestSolve() {
  const { id, problemId } = useParams();
  const track = contestsTracksData.find(t => t.id === parseInt(id)) || contestsTracksData[0];
  const problem = track.problems?.find(p => p.id === parseInt(problemId)) || track.problems?.[0] || kotlinContestData.problems[0];
  const questions = problem.questions || [];
  const totalQuestions = questions.length;

  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQ, setCurrentQ] = useState(1);
  const [markedForReview, setMarkedForReview] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQ - 1];
  const attempted = Object.keys(selectedOptions).map(Number);

  const handleSelect = (optionIdx) => {
    setSelectedOptions(prev => ({ ...prev, [currentQ]: optionIdx }));
  };

  const handleReviewToggle = () => {
    if (markedForReview.includes(currentQ)) {
      setMarkedForReview(markedForReview.filter(q => q !== currentQ));
    } else {
      setMarkedForReview([...markedForReview, currentQ]);
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  // Calculate score
  const correctCount = questions.reduce((acc, q, idx) => {
    return acc + (selectedOptions[idx + 1] === q.correct ? 1 : 0);
  }, 0);
  const scorePerQuestion = totalQuestions > 0 ? (problem.maxPoints / totalQuestions) : 0;

  return (
    <div className="flex h-full flex-col overflow-y-auto custom-scrollbar font-mono pb-20">
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-black">
            <Link to="/contests" className="px-2.5 py-1 bg-white border-2 border-black hover:bg-[#FFDE59] shadow-[2px_2px_0px_#000]">
              ARENAS
            </Link>
            <span>/</span>
            <Link to={`/contests/${id}`} className="px-2.5 py-1 bg-white border-2 border-black hover:bg-[#FFDE59] shadow-[2px_2px_0px_#000]">
              {track.title}
            </Link>
            <span>/</span>
            <span className="px-2.5 py-1 bg-[#FFDE59] border-2 border-black shadow-[2px_2px_0px_#000]">
              #{problem.id} {problem.title}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F0FF] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
            <Swords size={14} className="stroke-[2.5]" />
            <span>EXAM SIMULATION</span>
          </div>
        </div>

        {/* Top Status Bar Plate */}
        <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000] mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                {problem.title}
              </h1>
              <span className={`px-2.5 py-1 border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] ${
                problem.difficulty === 'Easy' ? 'bg-[#CCFF00] text-black' :
                problem.difficulty === 'Medium' ? 'bg-[#FFDE59] text-black' : 'bg-[#FF0033] text-white'
              }`}>
                {problem.difficulty}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-bold uppercase text-gray-700">
              <span className="px-2 py-0.5 bg-[#FAF8F5] border border-black">
                SUBMISSIONS: {problem.submissions || 0}
              </span>
              <span className="px-2 py-0.5 bg-[#CCFF00] border border-black text-black font-black">
                MAX PTS: +{problem.maxPoints}
              </span>
            </div>
          </div>
          
          {/* Progress Tracker */}
          <div className="bg-[#FAF8F5] border-3 border-black p-4 shadow-[4px_4px_0px_#000] min-w-[280px]">
            <div className="flex justify-between items-center text-xs font-black uppercase text-black mb-2">
              <span>COMPLETION</span>
              <span>{attempted.length} / {totalQuestions} DONE</span>
            </div>
            <div className="w-full bg-white border-2 border-black h-5 p-0.5 shadow-[2px_2px_0px_#000]">
              <div 
                className="bg-[#00F0FF] h-full transition-all duration-300 border-r border-black"
                style={{ width: `${totalQuestions > 0 ? (attempted.length / totalQuestions) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Result Banner if submitted */}
        {showResult && (
          <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#CCFF00] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                <CheckCircle2 className="text-black" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-black uppercase">CHALLENGE EVALUATION COMPLETED</h2>
                <span className="text-xs font-bold text-gray-600 uppercase">OFFICIAL PERFORMANCE METRICS</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#FAF8F5] border-3 border-black shadow-[3px_3px_0px_#000]">
                <span className="text-[11px] font-black uppercase text-gray-500 block mb-1">FINAL SCORE</span>
                <span className="text-3xl font-black text-black">
                  {Math.round(correctCount * scorePerQuestion)}
                </span>
                <span className="text-xs font-bold text-gray-500"> / {problem.maxPoints} PTS</span>
              </div>
              <div className="p-4 bg-[#CCFF00] border-3 border-black shadow-[3px_3px_0px_#000]">
                <span className="text-[11px] font-black uppercase text-black block mb-1">CORRECT ANSWERS</span>
                <span className="text-3xl font-black text-black">{correctCount}</span>
                <span className="text-xs font-black text-black"> / {totalQuestions} Qs</span>
              </div>
              <div className="p-4 bg-[#00F0FF] border-3 border-black shadow-[3px_3px_0px_#000]">
                <span className="text-[11px] font-black uppercase text-black block mb-1">ACCURACY RATE</span>
                <span className="text-3xl font-black text-black">
                  {totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main 2-Column Quiz Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Question Canvas */}
          <div className="flex-1 w-full bg-white border-4 border-black shadow-[6px_6px_0px_#000] flex flex-col">
            {currentQuestion ? (
              <div className="p-6 md:p-8 flex-1">
                <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black">
                  <span className="text-xs font-black uppercase text-black bg-[#FFDE59] px-3 py-1 border border-black shadow-[2px_2px_0px_#000]">
                    QUESTION {currentQ} OF {totalQuestions}
                  </span>
                  {markedForReview.includes(currentQ) && (
                    <span className="text-xs font-black uppercase text-black bg-[#FF8811] px-3 py-1 border border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
                      <Bookmark size={12} className="stroke-[3]" /> REVIEW LATER
                    </span>
                  )}
                </div>
                
                <h3 className="text-base md:text-xl font-black text-black uppercase mb-8 leading-relaxed">
                  {currentQuestion.text}
                </h3>

                <div className="space-y-4">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOptions[currentQ] === idx;
                    const isCorrectAnswer = showResult && currentQuestion.correct === idx;
                    const isWrongSelected = showResult && isSelected && currentQuestion.correct !== idx;

                    let bgStyle = 'bg-white hover:bg-[#FAF8F5] text-black border-black';
                    
                    if (isWrongSelected) {
                      bgStyle = 'bg-[#FF0033] text-white border-black';
                    } else if (isCorrectAnswer && showResult) {
                      bgStyle = 'bg-[#CCFF00] text-black border-black';
                    } else if (isSelected) {
                      bgStyle = 'bg-[#00F0FF] text-black border-black';
                    }

                    return (
                      <button
                        key={idx} 
                        type="button"
                        onClick={() => !showResult && handleSelect(idx)}
                        className={`w-full flex items-center gap-4 p-4 border-3 text-left font-mono font-black text-sm uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${bgStyle}`}
                      >
                        <div className={`w-6 h-6 border-2 border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#000] ${
                          isSelected ? 'bg-black text-white' : 'bg-white text-black'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="flex-1">{option}</span>
                        
                        {showResult && isCorrectAnswer && (
                          <div className="px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase border border-black">
                            CORRECT
                          </div>
                        )}
                        {showResult && isWrongSelected && (
                          <div className="px-2 py-0.5 bg-white text-black text-[10px] font-black uppercase border border-black">
                            WRONG
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center font-black uppercase text-sm">NO QUESTIONS AVAILABLE</div>
            )}

            {/* Bottom Controls */}
            <div className="p-6 border-t-3 border-black bg-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button 
                onClick={() => setCurrentQ(Math.max(1, currentQ - 1))}
                disabled={currentQ === 1}
                className="w-full sm:w-auto px-5 py-2.5 bg-white border-2 border-black text-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] hover:bg-[#FAF8F5] disabled:opacity-40 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> [ PREVIOUS ]
              </button>
              
              <button 
                onClick={handleReviewToggle}
                className={`w-full sm:w-auto px-5 py-2.5 border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 ${
                  markedForReview.includes(currentQ)
                    ? 'bg-[#FF8811] text-black'
                    : 'bg-white hover:bg-[#FFDE59] text-black'
                }`}
              >
                <Bookmark size={14} className="stroke-[3]" /> 
                {markedForReview.includes(currentQ) ? '[ MARKED ]' : '[ REVIEW LATER ]'}
              </button>
              
              {currentQ < totalQuestions ? (
                <button 
                  onClick={() => setCurrentQ(Math.min(totalQuestions, currentQ + 1))}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#00F0FF] border-2 border-black font-black text-xs uppercase text-black shadow-[3px_3px_0px_#000] hover:bg-[#FFDE59] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  <span>[ NEXT ]</span>
                  <ArrowRight size={16} className="stroke-[3]" />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={showResult}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#CCFF00] border-2 border-black font-black text-xs uppercase text-black shadow-[3px_3px_0px_#000] hover:bg-[#FFDE59] disabled:opacity-50 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle size={16} className="stroke-[3]" /> 
                  <span>[ SUBMIT QUIZ ]</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Question Map */}
          <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
            <div className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_#000]">
              <h3 className="text-sm font-black text-black uppercase mb-4 pb-2 border-b-2 border-black">
                [ QUESTION MATRIX ]
              </h3>
              
              {/* Legend */}
              <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b-2 border-black text-[10px] font-black uppercase">
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#00F0FF] border border-black">
                  <span>DONE</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#FAF8F5] border border-black">
                  <span>EMPTY</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#FF8811] border border-black">
                  <span>REVIEW</span>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-5 gap-2 w-full">
                {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(q => {
                  const isAttempted = attempted.includes(q);
                  const isReview = markedForReview.includes(q);
                  const isActive = currentQ === q;
                  
                  let bgClass = 'bg-[#FAF8F5] text-black border-2 border-black';
                  
                  if (isReview) {
                    bgClass = 'bg-[#FF8811] text-black border-2 border-black';
                  } else if (isAttempted) {
                    bgClass = 'bg-[#00F0FF] text-black border-2 border-black';
                  }
                  
                  if (showResult && isAttempted) {
                    const isCorrect = selectedOptions[q] === questions[q-1]?.correct;
                    if (isCorrect) {
                      bgClass = 'bg-[#CCFF00] text-black border-2 border-black';
                    } else {
                      bgClass = 'bg-[#FF0033] text-white border-2 border-black';
                    }
                  }

                  return (
                    <button
                      key={q}
                      onClick={() => setCurrentQ(q)}
                      className={`h-10 flex items-center justify-center font-black text-xs shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${
                        isActive ? 'ring-2 ring-black font-black scale-105' : ''
                      } ${bgClass}`}
                    >
                      {q}
                    </button>
                  );
                })}
              </div>

              {!showResult && (
                <button 
                  onClick={handleSubmit}
                  className="w-full mt-6 py-3 bg-[#CCFF00] hover:bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle size={16} className="stroke-[3]" />
                  <span>[ SUBMIT EVALUATION ]</span>
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
