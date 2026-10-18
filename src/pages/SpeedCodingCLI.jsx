import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, RefreshCw, ChevronLeft, Zap, Target as TargetIcon, Clock } from 'lucide-react';

const SNIPPETS = [
`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
`const quickSort = arr => {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
};`,
`const twoSum = (nums, target) => {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
};`,
`class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
const reverseList = head => {
  let prev = null;
  let curr = head;
  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};`
];

export default function SpeedCodingCLI() {
  const navigate = useNavigate();
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLimit, setTimeLimit] = useState(0); // 0 = infinite
  const [elapsed, setElapsed] = useState(0); // seconds

  // Pick a random snippet on mount
  useEffect(() => {
    pickRandomSnippet();
  }, []);

  const targetText = useMemo(() => SNIPPETS[snippetIndex] || SNIPPETS[0], [snippetIndex]);

  const pickRandomSnippet = () => {
    setSnippetIndex(Math.floor(Math.random() * SNIPPETS.length));
    reset();
  };

  const reset = () => {
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setElapsed(0);
  };

  // Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in another input (if any existed) or if finished
      if (isFinished) return;
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

      // Ignore modifier keys
      if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta' || e.key === 'Escape') return;

      if (e.key === 'Backspace') {
        setUserInput(prev => prev.slice(0, -1));
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault(); // prevent losing focus
        setUserInput(prev => prev + '  '); // Map tab to 2 spaces to match snippet spacing
        return;
      }

      if (e.key === 'Enter') {
        setUserInput(prev => prev + '\n');
        return;
      }

      if (e.key.length === 1) {
        if (!startTime) setStartTime(Date.now());
        setUserInput(prev => {
          const nextVal = prev + e.key;
          // Stop adding if we exceed length
          if (nextVal.length > targetText.length) return prev;
          return nextVal;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFinished, startTime, targetText]);

  // Timer and time limit check
  useEffect(() => {
    if (!startTime || isFinished) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedSecs = Math.floor((now - startTime) / 1000);
      setElapsed(elapsedSecs);
      
      if (timeLimit > 0 && elapsedSecs >= timeLimit) {
        setIsFinished(true);
        setEndTime(now);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [startTime, isFinished, timeLimit]);

  // Live updates for WPM, Accuracy, and finish check
  useEffect(() => {
    if (!startTime) return;

    let correctCount = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === targetText[i]) correctCount++;
    }
    
    const acc = userInput.length === 0 ? 100 : Math.round((correctCount / userInput.length) * 100);
    setAccuracy(acc);

    const timeElapsedMins = (Date.now() - startTime) / 60000;
    const currentWpm = timeElapsedMins > 0 ? Math.round((userInput.length / 5) / timeElapsedMins) : 0;
    setWpm(currentWpm);

    // End condition
    if (userInput.length === targetText.length) {
      setIsFinished(true);
      setEndTime(Date.now());
    }
  }, [userInput, startTime, targetText]);

  const renderText = () => {
    return targetText.split('').map((char, index) => {
      let colorClass = 'text-gray-500'; // untyped
      
      if (index < userInput.length) {
        if (userInput[index] === char) {
          colorClass = 'text-green-400';
        } else {
          colorClass = 'text-red-500 bg-red-500/20';
        }
      }

      // Handle newlines visibly if needed, or just let them render as \n in pre
      if (char === '\n') {
        return (
          <span key={index} className="relative">
            <span className={colorClass}>⏎</span>
            <br />
          </span>
        );
      }

      return (
        <span key={index} className={`relative ${colorClass}`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="w-full h-full flex flex-col relative pb-8">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          {/* Header */}
          <div className="max-w-4xl mx-auto flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/royale')}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Terminal className="text-brand-blue" />
                  Speed Coding CLI
                </h1>
                <p className="text-gray-400 mt-1">Practice your algorithmic typing speed.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 mr-4">
                {[15, 30, 60, 0].map(t => (
                  <button
                    key={t}
                    onClick={() => { setTimeLimit(t); reset(); }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${timeLimit === t ? 'bg-brand-blue text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                  >
                    {t === 0 ? '∞' : `${t}s`}
                  </button>
                ))}
              </div>
              <button 
                onClick={pickRandomSnippet}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RefreshCw size={16} />
                Skip Snippet
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 mb-8">
            <div className="glass-card border border-white/10 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Speed</p>
                <div className="text-3xl font-bold text-white flex items-baseline gap-2">
                  {wpm} <span className="text-sm font-normal text-gray-500">WPM</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                <Zap size={24} />
              </div>
            </div>
            
            <div className="glass-card border border-white/10 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Accuracy</p>
                <div className="text-3xl font-bold text-white flex items-baseline gap-2">
                  {accuracy}<span className="text-sm font-normal text-gray-500">%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                <TargetIcon size={24} />
              </div>
            </div>
            
            <div className="glass-card border border-white/10 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Time</p>
                <div className="text-3xl font-bold text-white flex items-baseline gap-2">
                  {timeLimit > 0 ? (
                    <>
                      {Math.max(0, timeLimit - elapsed)} <span className="text-sm font-normal text-gray-500">/ {timeLimit}s</span>
                    </>
                  ) : (
                    <>
                      {elapsed} <span className="text-sm font-normal text-gray-500">s</span>
                    </>
                  )}
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Clock size={24} />
              </div>
            </div>
          </div>

          {/* Terminal / Typing Area */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#0f111a] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl relative group">
              {/* Terminal Header */}
              <div className="bg-[#1a1d27] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs font-mono text-gray-500">algo-runner@sortai: ~/practice</div>
                <div className="w-10"></div> {/* spacer */}
              </div>
              
              {/* Terminal Body */}
              <div className="p-8 font-mono text-xl md:text-2xl leading-relaxed whitespace-pre" style={{ tabSize: 2 }}>
                {!startTime && !isFinished && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10">
                    <div className="bg-white/10 px-6 py-3 rounded-full text-white animate-pulse">
                      Start typing to begin...
                    </div>
                  </div>
                )}
                
                {isFinished && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 animate-fade-in-up">
                    <h2 className="text-4xl font-bold text-white mb-2">Complete!</h2>
                    <p className="text-gray-400 mb-8">You typed at {wpm} WPM with {accuracy}% accuracy.</p>
                    <button 
                      onClick={pickRandomSnippet}
                      className="bg-brand-blue hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(0,122,255,0.3)]"
                    >
                      Next Snippet
                    </button>
                  </div>
                )}

                {renderText()}
              </div>
            </div>
            
            <p className="text-center text-gray-500 mt-6 font-mono text-sm">
              Press <kbd className="bg-white/5 border border-white/10 rounded px-1">Tab</kbd> for indentation. Press <kbd className="bg-white/5 border border-white/10 rounded px-1">Enter</kbd> for newlines.
            </p>
          </div>
      </div>
    </div>
  );
}
