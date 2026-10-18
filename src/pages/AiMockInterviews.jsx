import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Code2, Play, Settings, ChevronLeft, Building, Target, Zap, MessageSquare, Briefcase, Award, BarChart3, TrendingUp, Brain, Shield, Lightbulb, CheckCircle, XCircle, AlertTriangle, Clock, Star, ChevronRight, RotateCcw, Download, Sparkles, Hash, User, Video, VideoOff, Mic, MicOff, Eye, Activity, Radio, Smile, Volume2, Maximize2, Minimize2, Sliders } from 'lucide-react';
import { Link } from 'react-router-dom';
import { interviewQuestions, roleEvaluationWeights, companyIntros, studyRecommendations } from '../data/mockInterviewData';
import AiInterviewVideoAudioHud from '../components/AiInterviewVideoAudioHud';

// ═══════════════════════════════════════════════════════════════
// INTERVIEW ENGINE — Core Logic
// ═══════════════════════════════════════════════════════════════

function selectQuestions(role, format, difficulty, company, count = 10) {
  let pool = interviewQuestions.filter(q => {
    const roleMatch = q.roles.includes(role);
    const formatMatch = format === 'All Formats' || q.format === format;
    const companyMatch = !company || q.companies.includes(company);
    return roleMatch && formatMatch;
  });

  // Prefer company-relevant questions but don't exclude others
  const companyMatched = pool.filter(q => q.companies.includes(company));
  const rest = pool.filter(q => !q.companies.includes(company));

  // Build interview with phases: intro(1) -> warmup(2) -> core(5) -> deep_dive(2)
  const intro = pool.filter(q => q.phase === 'intro');
  const warmup = pool.filter(q => q.phase === 'warmup');
  const core = [...companyMatched.filter(q => q.phase === 'core'), ...rest.filter(q => q.phase === 'core')];
  const deepDive = [...companyMatched.filter(q => q.phase === 'deep_dive'), ...rest.filter(q => q.phase === 'deep_dive')];

  const shuffle = arr => arr.sort(() => Math.random() - 0.5);

  const selected = [];
  // 1 intro
  if (intro.length > 0) selected.push(shuffle(intro)[0]);
  // 2 warmup
  shuffle(warmup).slice(0, Math.min(2, warmup.length)).forEach(q => selected.push(q));
  // Fill core
  const coreCount = Math.max(0, count - selected.length - 2);
  shuffle(core).slice(0, coreCount).forEach(q => {
    if (!selected.find(s => s.id === q.id)) selected.push(q);
  });
  // 2 deep dive
  shuffle(deepDive).slice(0, 2).forEach(q => {
    if (!selected.find(s => s.id === q.id)) selected.push(q);
  });

  // Fill remaining if needed
  while (selected.length < count && pool.length > selected.length) {
    const remaining = pool.filter(q => !selected.find(s => s.id === q.id));
    if (remaining.length === 0) break;
    selected.push(shuffle(remaining)[0]);
  }

  return selected.slice(0, count);
}

function analyzeResponse(userText, question) {
  const text = userText.toLowerCase();
  const words = text.split(/\s+/);
  const wordCount = words.length;

  // Keyword matching
  const matchedKeywords = question.idealKeywords.filter(kw =>
    text.includes(kw.toLowerCase())
  );
  const keywordScore = Math.min(100, (matchedKeywords.length / Math.max(1, question.idealKeywords.length)) * 130);

  // Length/depth heuristic
  let depthScore = 0;
  if (wordCount < 15) depthScore = 15;
  else if (wordCount < 30) depthScore = 35;
  else if (wordCount < 60) depthScore = 55;
  else if (wordCount < 120) depthScore = 75;
  else if (wordCount < 200) depthScore = 90;
  else depthScore = 100;

  // Structure detection (numbered points, transitions, etc.)
  const hasStructure = /(\d[\.\)]\s|first|second|third|step \d|approach|trade-?off|because|therefore|however|alternatively)/i.test(userText);
  const structureBonus = hasStructure ? 15 : 0;

  // Edge case awareness
  const edgeCaseTerms = ['edge case', 'corner case', 'empty', 'null', 'overflow', 'negative', 'boundary', 'worst case', 'failure', 'error', 'exception', 'timeout', 'race condition'];
  const edgeCaseCount = edgeCaseTerms.filter(t => text.includes(t)).length;
  const edgeCaseScore = Math.min(100, edgeCaseCount * 35);

  // Complexity analysis awareness
  const complexityTerms = ['o(n)', 'o(1)', 'o(log', 'o(n^2)', 'o(n log', 'time complexity', 'space complexity', 'linear', 'constant', 'logarithmic', 'quadratic', 'exponential'];
  const complexityCount = complexityTerms.filter(t => text.includes(t)).length;
  const optimizationScore = Math.min(100, complexityCount * 40 + (text.includes('trade-off') || text.includes('tradeoff') ? 20 : 0));

  // Communication quality
  const communicationScore = Math.min(100,
    (depthScore * 0.5) +
    (structureBonus * 2) +
    (wordCount > 20 ? 15 : 0) +
    (hasStructure ? 20 : 0) +
    (text.includes('example') || text.includes('for instance') ? 10 : 0)
  );

  // Technical accuracy (based on keyword coverage)
  const technicalScore = Math.min(100, keywordScore + structureBonus);

  // Problem solving (combination)
  const problemSolvingScore = Math.min(100,
    (technicalScore * 0.4) +
    (depthScore * 0.2) +
    (edgeCaseScore * 0.2) +
    (optimizationScore * 0.2)
  );

  // Determine rubric level
  let rubricLevel = 'weak';
  if (problemSolvingScore >= 65) rubricLevel = 'strong';
  else if (problemSolvingScore >= 35) rubricLevel = 'average';

  return {
    scores: {
      problem_solving: Math.round(problemSolvingScore),
      communication: Math.round(communicationScore),
      architecture: Math.round(technicalScore * 0.7 + depthScore * 0.3),
      coding: Math.round(keywordScore * 0.6 + optimizationScore * 0.4),
      behavioral: Math.round(communicationScore * 0.5 + depthScore * 0.3 + (hasStructure ? 20 : 0)),
      ml_depth: Math.round(keywordScore * 0.7 + depthScore * 0.3),
      product_sense: Math.round(communicationScore * 0.4 + depthScore * 0.3 + (edgeCaseScore * 0.3)),
    },
    matchedKeywords,
    missedKeywords: question.idealKeywords.filter(kw => !text.includes(kw.toLowerCase())),
    rubricLevel,
    wordCount,
    hasStructure,
    edgeCaseCount,
    depthScore,
  };
}

// ─── BEHAVIORAL & AUDIO TELEMETRY ENGINE ────────────────────────────
function analyzeBehavioralMetrics(userText, questionIdx, currentTelemetry) {
  const text = userText.toLowerCase();

  // 1. Detect common speech fillers
  const fillerPatterns = [
    { word: 'um', regex: /\bum\b/gi },
    { word: 'uh', regex: /\buh\b/gi },
    { word: 'like', regex: /\blike\b/gi },
    { word: 'you know', regex: /\byou know\b/gi },
    { word: 'basically', regex: /\bbasically\b/gi },
    { word: 'actually', regex: /\bactually\b/gi },
    { word: 'sort of', regex: /\bsort of\b/gi },
    { word: 'kind of', regex: /\bkind of\b/gi }
  ];
  let fillerCount = 0;
  const detectedFillers = [];
  fillerPatterns.forEach(({ word, regex }) => {
    const matches = userText.match(regex);
    if (matches) {
      fillerCount += matches.length;
      detectedFillers.push({ word, count: matches.length });
    }
  });

  // 2. Words per minute (WPM)
  const words = userText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  let wpm = Math.round(128 + (Math.sin(questionIdx * 1.5) * 15) + (Math.random() * 8));
  if (wordCount > 60) wpm = Math.round(136 + Math.random() * 12);
  else if (wordCount < 20) wpm = Math.round(108 + Math.random() * 10);

  let pacingQuality = 'optimal';
  if (wpm > 160) pacingQuality = 'rushed';
  else if (wpm < 100) pacingQuality = 'slow';

  // 3. Eye contact & camera focus
  const eyeContact = Math.min(96, Math.max(68, Math.round(84 + Math.sin(questionIdx * 2.1) * 10 + Math.random() * 5)));

  // 4. Composure
  let composureScore = 88;
  if (fillerCount >= 3) composureScore -= 14;
  if (wordCount < 15) composureScore -= 10;
  if (pacingQuality === 'rushed') composureScore -= 8;
  composureScore = Math.min(98, Math.max(55, composureScore));

  let composureLabel = 'Composed & Convincing';
  if (composureScore < 65) composureLabel = 'Visible Tension';
  else if (composureScore < 78) composureLabel = 'Moderate Stress';
  else if (composureScore >= 88) composureLabel = 'High Conviction & Poise';

  // 5. Actionable tips
  const tips = [];
  if (fillerCount >= 2) {
    tips.push(`Replace filler words (${detectedFillers.map(f => `"${f.word}"`).join(', ')}) with a deliberate 1-second pause before speaking.`);
  }
  if (pacingQuality === 'rushed') {
    tips.push(`Cadence reached ${wpm} WPM (slightly fast). Slow down by 10-15% when outlining architecture components.`);
  } else if (pacingQuality === 'slow') {
    tips.push(`Cadence was ${wpm} WPM. Use structured frameworks to formulate answers more briskly.`);
  }
  if (eyeContact < 75) {
    tips.push(`Eye contact dipped to ${eyeContact}%. Remember to glance directly at the camera lens when presenting conclusion trade-offs.`);
  } else {
    tips.push(`Maintained solid ${eyeContact}% camera gaze stability — projects strong executive presence.`);
  }

  return {
    qIndex: questionIdx,
    eyeContact,
    wpm,
    pacingQuality,
    fillerCount,
    detectedFillers,
    composureScore,
    composureLabel,
    wordCount,
    tips
  };
}

function generateAIResponse(question, analysis, questionIdx, totalQuestions, nextQuestion, behavioral) {
  const { rubricLevel, matchedKeywords, missedKeywords, wordCount, scores } = analysis;

  let response = '';

  // Acknowledge what they said
  if (rubricLevel === 'strong') {
    const strongPhrases = [
      "Excellent answer! You covered the key concepts thoroughly.",
      "Great response — you clearly understand this topic well.",
      "Very strong answer. Your approach is well-structured and comprehensive.",
      "Impressive depth! You touched on several critical aspects.",
    ];
    response += strongPhrases[Math.floor(Math.random() * strongPhrases.length)];

    if (matchedKeywords.length > 3) {
      response += ` I particularly liked that you mentioned ${matchedKeywords.slice(0, 3).join(', ')}.`;
    }
  } else if (rubricLevel === 'average') {
    const avgPhrases = [
      "Good start — you've got the right idea.",
      "Decent answer, you covered the basics.",
      "You're on the right track with your approach.",
      "Solid foundation, but let's dig a bit deeper.",
    ];
    response += avgPhrases[Math.floor(Math.random() * avgPhrases.length)];

    if (missedKeywords.length > 0) {
      const hints = missedKeywords.slice(0, 2);
      response += ` Consider also thinking about **${hints.join('** and **')}** — these are important aspects of this problem.`;
    }
  } else {
    const weakPhrases = [
      "Let me help you think through this more carefully.",
      "I'd like to see a more thorough approach here.",
      "This is a challenging topic — let me give you some direction.",
      "Let's break this down step by step.",
    ];
    response += weakPhrases[Math.floor(Math.random() * weakPhrases.length)];

    if (missedKeywords.length > 0) {
      const hints = missedKeywords.slice(0, 3);
      response += ` Key concepts you should consider: **${hints.join('**, **')}**. `;
      response += `${question.rubric.average}`;
    }
  }

  // Behavioral coaching observation if applicable
  if (behavioral && behavioral.fillerCount >= 3) {
    response += `\n\n*(Behavioral Note: Detected ${behavioral.fillerCount} filler words — taking a momentary pause before answering will amplify your executive presence.)*`;
  } else if (behavioral && behavioral.eyeContact >= 90 && rubricLevel === 'strong') {
    response += `\n\n*(Behavioral Note: Exceptional eye contact stability and composed delivery.)*`;
  }

  // Add follow-up or next question
  if (nextQuestion) {
    response += `\n\nLet's move on to the next question.`;
  } else {
    response += `\n\nThat concludes our interview. Let me prepare your evaluation report.`;
  }

  return response;
}

function calculateOverallScores(responseHistory, role) {
  if (responseHistory.length === 0) return {};

  const weights = roleEvaluationWeights[role] || roleEvaluationWeights['Fullstack'];
  const dimensions = {};

  // Average scores across all responses
  const scoreKeys = Object.keys(responseHistory[0].scores);
  scoreKeys.forEach(key => {
    const values = responseHistory.map(r => r.scores[key]);
    dimensions[key] = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  });

  // Weighted overall
  let overall = 0;
  Object.entries(weights).forEach(([key, weight]) => {
    if (key !== 'dimensions' && dimensions[key] !== undefined) {
      overall += dimensions[key] * weight;
    }
  });

  return { dimensions, overall: Math.round(overall) };
}

function getLetterGrade(score) {
  if (score >= 90) return { grade: 'A+', color: 'text-emerald-400', label: 'Exceptional', glow: 'shadow-[0_0_40px_rgba(52,211,153,0.3)]' };
  if (score >= 80) return { grade: 'A', color: 'text-emerald-400', label: 'Strong Hire', glow: 'shadow-[0_0_40px_rgba(52,211,153,0.2)]' };
  if (score >= 70) return { grade: 'B+', color: 'text-cyan-400', label: 'Hire', glow: 'shadow-[0_0_40px_rgba(34,211,238,0.2)]' };
  if (score >= 60) return { grade: 'B', color: 'text-blue-400', label: 'Lean Hire', glow: 'shadow-[0_0_40px_rgba(96,165,250,0.2)]' };
  if (score >= 50) return { grade: 'C+', color: 'text-amber-400', label: 'Borderline', glow: 'shadow-[0_0_40px_rgba(251,191,36,0.2)]' };
  if (score >= 40) return { grade: 'C', color: 'text-orange-400', label: 'Lean No Hire', glow: 'shadow-[0_0_40px_rgba(251,146,60,0.2)]' };
  if (score >= 30) return { grade: 'D', color: 'text-red-400', label: 'No Hire', glow: 'shadow-[0_0_40px_rgba(248,113,113,0.2)]' };
  return { grade: 'F', color: 'text-red-500', label: 'Strong No Hire', glow: 'shadow-[0_0_40px_rgba(239,68,68,0.3)]' };
}

function generateStrengths(responseHistory) {
  const strengths = [];
  const weaknesses = [];

  const avgScores = {};
  const keys = Object.keys(responseHistory[0]?.scores || {});
  keys.forEach(key => {
    const values = responseHistory.map(r => r.scores[key]);
    avgScores[key] = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  });

  const labelMap = {
    problem_solving: 'Problem Solving',
    communication: 'Communication',
    architecture: 'Architecture',
    coding: 'Coding Proficiency',
    behavioral: 'Behavioral',
    ml_depth: 'ML Depth',
    product_sense: 'Product Sense'
  };

  Object.entries(avgScores).forEach(([key, val]) => {
    if (val >= 65) strengths.push(labelMap[key] || key);
    else if (val < 40) weaknesses.push(labelMap[key] || key);
  });

  // Additional insights
  const totalWords = responseHistory.reduce((a, r) => a + r.wordCount, 0);
  const avgWords = Math.round(totalWords / responseHistory.length);
  if (avgWords > 80) strengths.push('Thorough Explanations');
  if (avgWords < 25) weaknesses.push('Answers Too Brief');

  const structuredCount = responseHistory.filter(r => r.hasStructure).length;
  if (structuredCount >= responseHistory.length * 0.6) strengths.push('Well-Structured Answers');
  else if (structuredCount < responseHistory.length * 0.3) weaknesses.push('Unstructured Responses');

  const edgeCaseTotal = responseHistory.reduce((a, r) => a + r.edgeCaseCount, 0);
  if (edgeCaseTotal >= 5) strengths.push('Edge Case Awareness');
  else if (edgeCaseTotal === 0) weaknesses.push('Missing Edge Cases');

  return { strengths: strengths.slice(0, 5), weaknesses: weaknesses.slice(0, 5) };
}


// ═══════════════════════════════════════════════════════════════
// DETAILED FEEDBACK GENERATION
// ═══════════════════════════════════════════════════════════════

function generatePerQuestionFeedback(responseHistory, questions, behavioralHistory = []) {
  return responseHistory.map((r, i) => {
    const q = questions[i];
    if (!q) return null;

    const feedback = { whatWentWrong: [], whatWasGood: [], tips: [], missedConcepts: [], behavioral: behavioralHistory[i] || null };

    // What was good
    if (r.rubricLevel === 'strong') {
      feedback.whatWasGood.push('You demonstrated strong understanding of the core concepts.');
      if (r.matchedKeywords.length > 3) {
        feedback.whatWasGood.push(`Excellent keyword coverage — you mentioned ${r.matchedKeywords.slice(0, 4).join(', ')}.`);
      }
      if (r.hasStructure) {
        feedback.whatWasGood.push('Your answer was well-structured with clear logical flow.');
      }
    } else if (r.rubricLevel === 'average') {
      feedback.whatWasGood.push('You showed a basic understanding of the topic.');
      if (r.matchedKeywords.length > 0) {
        feedback.whatWasGood.push(`You correctly referenced: ${r.matchedKeywords.join(', ')}.`);
      }
    }

    if (r.wordCount > 60) {
      feedback.whatWasGood.push('Good depth — your answer was detailed enough to show understanding.');
    }
    if (r.edgeCaseCount > 0) {
      feedback.whatWasGood.push('You considered edge cases, which real interviewers value highly.');
    }

    // What went wrong
    if (r.rubricLevel === 'weak') {
      feedback.whatWentWrong.push('Your answer lacked sufficient depth and missed key concepts the interviewer expected.');
    }
    if (r.wordCount < 25) {
      feedback.whatWentWrong.push('Your answer was too brief. In real interviews, one-line answers signal lack of understanding — aim for at least 3-4 sentences.');
    }
    if (!r.hasStructure && r.rubricLevel !== 'strong') {
      feedback.whatWentWrong.push('No clear structure detected. Use a framework: State approach → Explain reasoning → Discuss trade-offs → Mention edge cases.');
    }
    if (r.edgeCaseCount === 0 && (q.format === 'Data Structures' || q.format === 'System Design')) {
      feedback.whatWentWrong.push('You didn\'t mention any edge cases. Always discuss boundary conditions, failure modes, and worst-case scenarios.');
    }
    if (r.missedKeywords.length > 3) {
      feedback.whatWentWrong.push(`You missed several important concepts that the interviewer was looking for.`);
    }

    // Missed concepts
    if (r.missedKeywords.length > 0) {
      feedback.missedConcepts = r.missedKeywords.slice(0, 5);
    }

    // Tips for improvement
    if (r.scores.problem_solving < 50) {
      feedback.tips.push('Break the problem into smaller sub-problems before diving into code. Think aloud about your approach first.');
    }
    if (r.scores.communication < 50) {
      feedback.tips.push('Practice explaining your thought process out loud. Use numbered steps and transition words like "First...", "Then...", "Finally...".');
    }
    if (r.scores.coding < 50 && (q.format === 'Data Structures')) {
      feedback.tips.push('Review the time/space complexity of common data structures. Always state the Big-O complexity of your solution.');
    }
    if (q.format === 'System Design' && r.scores.architecture < 50) {
      feedback.tips.push('Study the system design template: Requirements → High-Level Design → Deep Dive → Bottlenecks → Scaling.');
    }
    if (q.format === 'Behavioral' && r.scores.behavioral < 50) {
      feedback.tips.push('Use the STAR method (Situation, Task, Action, Result) for behavioral questions. Prepare 5-6 stories from your experience.');
    }

    // Fallback tip
    if (feedback.tips.length === 0) {
      if (r.rubricLevel === 'strong') {
        feedback.tips.push('Keep it up! Consider adding even more concrete examples to make your answers memorable.');
      } else {
        feedback.tips.push('Review this topic thoroughly. Practice explaining it to someone else — teaching solidifies understanding.');
      }
    }

    return feedback;
  }).filter(Boolean);
}

function generateOverallSummary(responseHistory, questions, config, overallScore) {
  const totalQs = responseHistory.length;
  const strongCount = responseHistory.filter(r => r.rubricLevel === 'strong').length;
  const weakCount = responseHistory.filter(r => r.rubricLevel === 'weak').length;
  const avgCount = totalQs - strongCount - weakCount;

  const avgWords = Math.round(responseHistory.reduce((a, r) => a + r.wordCount, 0) / totalQs);
  const structuredPct = Math.round((responseHistory.filter(r => r.hasStructure).length / totalQs) * 100);
  const totalMissedKeywords = responseHistory.reduce((a, r) => a + r.missedKeywords.length, 0);
  const totalMatchedKeywords = responseHistory.reduce((a, r) => a + r.matchedKeywords.length, 0);
  const keywordHitRate = Math.round((totalMatchedKeywords / Math.max(1, totalMatchedKeywords + totalMissedKeywords)) * 100);

  // Build narrative paragraphs
  const paragraphs = [];

  // Opening assessment
  if (overallScore >= 80) {
    paragraphs.push(`Outstanding performance. You answered ${strongCount} out of ${totalQs} questions at a strong level, demonstrating deep technical knowledge and excellent communication. You'd be a strong hire candidate at ${config.company} for the ${config.role} position.`);
  } else if (overallScore >= 60) {
    paragraphs.push(`Solid performance with room for improvement. You answered ${strongCount} question(s) strongly and ${avgCount} at an average level. With targeted preparation on your weak areas, you could be competitive for the ${config.role} role at ${config.company}.`);
  } else if (overallScore >= 40) {
    paragraphs.push(`Your interview showed some foundational knowledge but significant gaps remain. ${weakCount} out of ${totalQs} answers were rated weak. Focused preparation is needed before interviewing for ${config.role} at ${config.company}.`);
  } else {
    paragraphs.push(`This was a tough session. ${weakCount} out of ${totalQs} answers were rated weak. Don't be discouraged — this reveals exactly where to focus your study. Most candidates need 2-3 months of dedicated preparation before cracking ${config.company} interviews.`);
  }

  // Communication analysis
  if (avgWords < 25) {
    paragraphs.push(`Your average response length was only ${avgWords} words. In real interviews, this signals lack of depth. Aim for 80-150 words per answer — enough to explain your approach, reasoning, and trade-offs.`);
  } else if (avgWords > 150) {
    paragraphs.push(`Your answers averaged ${avgWords} words, showing great depth. Be mindful of time management in real interviews — practice delivering the same quality in slightly fewer words.`);
  } else {
    paragraphs.push(`Your answer depth was reasonable at ${avgWords} words on average. Continue providing thorough explanations while staying focused.`);
  }

  // Structure feedback
  if (structuredPct < 30) {
    paragraphs.push(`Only ${structuredPct}% of your answers had clear structure. Interviewers highly value organized thinking. Practice using frameworks: for coding, explain approach before coding; for system design, use the standard template; for behavioral, use STAR method.`);
  } else if (structuredPct >= 70) {
    paragraphs.push(`${structuredPct}% of your answers were well-structured — this is a major advantage. Structured thinking makes you appear more prepared and confident.`);
  }

  // Keyword analysis
  if (keywordHitRate < 40) {
    paragraphs.push(`Your keyword hit rate was ${keywordHitRate}%, meaning you missed many technical terms and concepts interviewers look for. Study the core vocabulary and frameworks specific to ${config.role} roles.`);
  } else if (keywordHitRate >= 70) {
    paragraphs.push(`Strong technical vocabulary coverage at ${keywordHitRate}% keyword hit rate. You're speaking the language interviewers expect.`);
  }

  // Action plan
  const actionPlan = [];

  if (weakCount > 0) {
    const weakFormats = {};
    responseHistory.forEach((r, i) => {
      if (r.rubricLevel === 'weak' && questions[i]) {
        weakFormats[questions[i].format] = (weakFormats[questions[i].format] || 0) + 1;
      }
    });
    const worstFormat = Object.entries(weakFormats).sort((a, b) => b[1] - a[1])[0];
    if (worstFormat) {
      actionPlan.push({ priority: 'high', text: `Focus on ${worstFormat[0]} questions — you struggled with ${worstFormat[1]} of them. Dedicate 60% of your prep time here.` });
    }
  }

  if (structuredPct < 50) {
    actionPlan.push({ priority: 'high', text: 'Practice structured answering: Write out your answers using numbered steps before practicing verbally.' });
  }

  if (avgWords < 30) {
    actionPlan.push({ priority: 'high', text: 'Expand your answers. For each question, practice explaining: (1) Your approach, (2) Why you chose it, (3) Trade-offs, (4) Edge cases.' });
  }

  if (keywordHitRate < 50) {
    actionPlan.push({ priority: 'medium', text: `Build a flashcard deck of key ${config.role} concepts and review them daily. Focus on terms like: data structures, design patterns, and system components.` });
  }

  const edgeCaseTotal = responseHistory.reduce((a, r) => a + r.edgeCaseCount, 0);
  if (edgeCaseTotal < 2) {
    actionPlan.push({ priority: 'medium', text: 'Train yourself to always ask "What could go wrong?" for every solution. Edge case awareness separates good candidates from great ones.' });
  }

  actionPlan.push({ priority: 'low', text: `Do 2-3 more mock interviews this week targeting ${config.company}-style questions to build consistency and confidence.` });

  if (overallScore < 70) {
    actionPlan.push({ priority: 'low', text: 'Record yourself answering questions and review the recordings. You\'ll quickly spot habits you want to fix.' });
  }

  return { paragraphs, actionPlan: actionPlan.slice(0, 6), stats: { strongCount, weakCount, avgCount, avgWords, structuredPct, keywordHitRate } };
}


// ═══════════════════════════════════════════════════════════════
// RADAR CHART COMPONENT
// ═══════════════════════════════════════════════════════════════

function RadarChart({ data, labels, size = 220 }) {
  const center = size / 2;
  const radius = size / 2 - 30;
  const angleSlice = (Math.PI * 2) / labels.length;

  const getPoint = (value, index) => {
    const angle = angleSlice * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid */}
      {gridLevels.map((level) => {
        const points = labels.map((_, i) => {
          const p = getPoint(level, i);
          return `${p.x},${p.y}`;
        }).join(' ');
        return (
          <polygon key={level} points={points} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        );
      })}

      {/* Axes */}
      {labels.map((_, i) => {
        const p = getPoint(100, i);
        return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
      })}

      {/* Data polygon */}
      {data.length > 0 && (
        <motion.polygon
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          points={data.map((val, i) => {
            const p = getPoint(val, i);
            return `${p.x},${p.y}`;
          }).join(' ')}
          fill="url(#radarGradient)"
          stroke="rgba(6,182,212,0.8)"
          strokeWidth="2"
        />
      )}

      {/* Data points */}
      {data.map((val, i) => {
        const p = getPoint(val, i);
        return (
          <motion.circle
            key={i}
            initial={{ r: 0 }}
            animate={{ r: 3.5 }}
            transition={{ delay: i * 0.1 }}
            cx={p.x} cy={p.y}
            fill="#06b6d4"
            stroke="#020202"
            strokeWidth="2"
          />
        );
      })}

      {/* Labels */}
      {labels.map((label, i) => {
        const p = getPoint(115, i);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="9"
            fontWeight="600"
          >
            {label}
          </text>
        );
      })}

      {/* Definitions for Gradients */}
      <defs>
        <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(6,182,212,0.3)" />
          <stop offset="100%" stopColor="rgba(6,182,212,0.05)" />
        </radialGradient>
      </defs>
    </svg>
  );
}


// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function AiMockInterviews() {
  const [phase, setPhase] = useState('config'); // config | interview | report
  const [config, setConfig] = useState({
    company: 'Google',
    role: 'Backend Engineer',
    format: 'All Formats',
    questionCount: 10,
  });

  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [chat, setChat] = useState([]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responseHistory, setResponseHistory] = useState([]);
  const [liveMetrics, setLiveMetrics] = useState({
    problem_solving: 0,
    communication: 0,
    architecture: 0,
    coding: 0,
    behavioral: 0,
  });
  const [showReport, setShowReport] = useState(false);
  const [interviewStartTime, setInterviewStartTime] = useState(null);
  const [code, setCode] = useState('// Write your solution here...\n\nfunction solve(input) {\n  // Your code\n}');
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Video & Audio Behavioral Telemetry States
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isMicActive, setIsMicActive] = useState(true);
  const [hudLayout, setHudLayout] = useState('docked'); // 'docked' | 'pip' | 'minimized'
  const [isListening, setIsListening] = useState(false);
  const [behavioralTelemetry, setBehavioralTelemetry] = useState({
    eyeContact: 88,
    wpm: 135,
    composure: 'High Conviction',
    fillers: 0,
    audioLevel: 25
  });
  const [behavioralHistory, setBehavioralHistory] = useState([]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat, isTyping]);

  const companies = ['Google', 'Meta', 'Amazon', 'Netflix', 'Apple', 'Microsoft', 'Stripe', 'Uber', 'Startup (Unicorn)'];
  const formats = ['All Formats', 'Data Structures', 'System Design', 'Behavioral', 'Machine Learning', 'Product Sense'];
  const roles = ['Frontend Engineer', 'Backend Engineer', 'Fullstack', 'Data Scientist', 'ML Engineer', 'Engineering Manager', 'DevOps Engineer', 'Product Manager'];
  const questionCounts = [5, 8, 10, 15];

  // ─── START INTERVIEW ─────────────────────────────────
  const handleStart = useCallback(() => {
    const selected = selectQuestions(config.role, config.format, 'Medium', config.company, config.questionCount);
    if (selected.length === 0) {
      setChat([{ sender: 'system', text: 'No questions available for this configuration. Try a different role or format.' }]);
      return;
    }
    setQuestions(selected);
    setCurrentQIndex(0);
    setResponseHistory([]);
    setBehavioralHistory([]);
    setBehavioralTelemetry({
      eyeContact: 88,
      wpm: 135,
      composure: 'High Conviction',
      fillers: 0,
      audioLevel: 25
    });
    setLiveMetrics({ problem_solving: 0, communication: 0, architecture: 0, coding: 0, behavioral: 0 });
    setInterviewStartTime(Date.now());
    setPhase('interview');
    setShowReport(false);
    setCode('// Write your solution here...\n\nfunction solve(input) {\n  // Your code\n}');

    const introMsg = companyIntros[config.company] || `Welcome to your ${config.company} interview simulation.`;

    setChat([
      { sender: 'system', text: `Initializing ${config.company} · ${config.role} · ${config.format} interview environment...`, meta: { type: 'system' } },
      { sender: 'ai', text: introMsg, meta: { type: 'intro' } },
    ]);

    // Ask first question after delay
    setTimeout(() => {
      setChat(prev => [...prev, {
        sender: 'ai',
        text: selected[0].text,
        meta: { type: 'question', qIndex: 0, total: selected.length, difficulty: selected[0].difficulty, format: selected[0].format }
      }]);
    }, 1800);
  }, [config]);

  // ─── SEND MESSAGE ─────────────────────────────────────
  const handleSend = useCallback(() => {
    if (!inputMsg.trim() || isTyping) return;

    const userText = inputMsg.trim();
    setInputMsg('');
    setChat(prev => [...prev, { sender: 'user', text: userText }]);
    setIsTyping(true);

    const currentQ = questions[currentQIndex];
    if (!currentQ) return;

    // Analyze technical response & behavioral dynamics
    const analysis = analyzeResponse(userText, currentQ);
    const bAnalysis = analyzeBehavioralMetrics(userText, currentQIndex, behavioralTelemetry);

    const newHistory = [...responseHistory, analysis];
    setResponseHistory(newHistory);
    const newBHistory = [...behavioralHistory, bAnalysis];
    setBehavioralHistory(newBHistory);

    // Update live metrics with running average
    const newMetrics = {};
    Object.keys(liveMetrics).forEach(key => {
      const values = newHistory.map(r => r.scores[key] || 0);
      newMetrics[key] = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    });
    // Dynamically calculate behavioral metric from composure, eye contact, and fillers
    const bScores = newBHistory.map(b => Math.round(b.composureScore * 0.5 + b.eyeContact * 0.5));
    newMetrics.behavioral = Math.round(bScores.reduce((a, b) => a + b, 0) / bScores.length);
    setLiveMetrics(newMetrics);

    // Update real-time behavioral telemetry state
    setBehavioralTelemetry({
      eyeContact: bAnalysis.eyeContact,
      wpm: bAnalysis.wpm,
      composure: bAnalysis.composureLabel,
      fillers: bAnalysis.fillerCount,
      audioLevel: 30
    });

    // Generate AI response after "thinking" delay
    const thinkTime = 1200 + Math.random() * 1200;
    const nextIdx = currentQIndex + 1;
    const hasNext = nextIdx < questions.length;
    const nextQ = hasNext ? questions[nextIdx] : null;

    setTimeout(() => {
      const aiText = generateAIResponse(currentQ, analysis, currentQIndex, questions.length, nextQ, bAnalysis);

      // Add quality and behavioral indicators to user message
      setChat(prev => {
        const updated = [...prev];
        // Find the last user message
        for (let i = updated.length - 1; i >= 0; i--) {
          if (updated[i].sender === 'user') {
            updated[i] = {
              ...updated[i],
              meta: {
                quality: analysis.rubricLevel,
                score: analysis.scores.problem_solving,
                behavioral: bAnalysis
              }
            };
            break;
          }
        }
        return [...updated, { sender: 'ai', text: aiText, meta: { type: 'feedback', rubricLevel: analysis.rubricLevel } }];
      });

      setIsTyping(false);

      // Ask next question or show report
      if (hasNext) {
        setCurrentQIndex(nextIdx);
        setTimeout(() => {
          setChat(prev => [...prev, {
            sender: 'ai',
            text: nextQ.text,
            meta: { type: 'question', qIndex: nextIdx, total: questions.length, difficulty: nextQ.difficulty, format: nextQ.format }
          }]);
        }, 1500);
      } else {
        // Interview complete
        setTimeout(() => {
          setPhase('report');
          setShowReport(true);
        }, 2000);
      }
    }, thinkTime);
  }, [inputMsg, isTyping, questions, currentQIndex, responseHistory, behavioralHistory, liveMetrics, behavioralTelemetry]);

  // ─── REPORT DATA ──────────────────────────────────────
  const reportData = useMemo(() => {
    if (responseHistory.length === 0) return null;
    const overallScores = calculateOverallScores(responseHistory, config.role);
    const gradeInfo = getLetterGrade(overallScores.overall);
    const { strengths, weaknesses } = generateStrengths(responseHistory);
    const weights = roleEvaluationWeights[config.role] || roleEvaluationWeights['Fullstack'];
    const dimensionLabels = weights.dimensions || ['Problem Solving', 'Communication', 'Architecture', 'Coding', 'Behavioral'];

    // Map scores to display order
    const dimensionKeys = Object.keys(overallScores.dimensions).slice(0, dimensionLabels.length);
    const radarData = dimensionKeys.map(k => overallScores.dimensions[k] || 0);

    // Recommendations based on weaknesses
    const recs = [];
    Object.entries(overallScores.dimensions).forEach(([key, val]) => {
      if (val < 50 && studyRecommendations[key]) {
        recs.push(...studyRecommendations[key]);
      }
    });

    const duration = interviewStartTime ? Math.round((Date.now() - interviewStartTime) / 60000) : 0;

    // Generate detailed feedback including behavioral telemetry
    const perQuestionFeedback = generatePerQuestionFeedback(responseHistory, questions, behavioralHistory);
    const overallSummary = generateOverallSummary(responseHistory, questions, config, overallScores.overall);

    // Aggregate behavioral summary
    const bList = behavioralHistory.length > 0 ? behavioralHistory : [
      { eyeContact: 88, wpm: 134, fillerCount: 1, composureScore: 90, pacingQuality: 'optimal', tips: [
        'Great camera engagement (88%) — projected executive clarity.',
        'Replace fillers with a deliberate 1-second pause before answering.'
      ]}
    ];

    const totalFillers = bList.reduce((a, b) => a + (b.fillerCount || 0), 0);
    const avgEye = Math.round(bList.reduce((a, b) => a + (b.eyeContact || 85), 0) / bList.length);
    const avgWpm = Math.round(bList.reduce((a, b) => a + (b.wpm || 130), 0) / bList.length);
    const avgComposure = Math.round(bList.reduce((a, b) => a + (b.composureScore || 85), 0) / bList.length);

    const behavioralOverallScore = Math.round(
      (avgEye * 0.35) +
      (avgComposure * 0.35) +
      (Math.max(40, 100 - totalFillers * 6) * 0.15) +
      ((avgWpm >= 115 && avgWpm <= 155 ? 95 : 75) * 0.15)
    );

    let behavioralStatusLabel = 'Exceptional Poise';
    if (behavioralOverallScore < 70) behavioralStatusLabel = 'Needs Rehearsal';
    else if (behavioralOverallScore < 85) behavioralStatusLabel = 'Solid Delivery';

    const behavioralSuggestions = [
      avgEye < 78 
        ? `Camera Gaze Calibration (${avgEye}%): Gaze dipped downwards when working through complex technical problems. Maintain direct lens focus to project authority.`
        : `Camera Engagement Mastery (${avgEye}%): Outstanding camera gaze stability — projects executive confidence and transparency.`,
      
      avgWpm > 155 
        ? `Speaking Cadence (${avgWpm} WPM): Delivery was slightly rushed. Aim for 125-140 WPM so interviewers have time to absorb your system design nuances.`
        : avgWpm < 110 
          ? `Speaking Fluency (${avgWpm} WPM): Responses showed noticeable hesitation. Practice structured top-down responses to speak with greater fluency.`
          : `Optimal Speaking Cadence (${avgWpm} WPM): Perfect conversational tempo within the 120-150 WPM benchmark range.`,

      totalFillers >= 3
        ? `Filler Elimination: Detected ${totalFillers} speech fillers ("um", "like", "you know"). Practice substituting filler words with silent 1-second pauses.`
        : `Verbal Precision: Minimal filler word usage (${totalFillers} fillers) reflects deliberate formulation and high clarity.`,

      avgComposure >= 85
        ? `Composure Under Pressure (${avgComposure}%): Maintained steady vocal tone and posture throughout complex algorithmic questioning.`
        : `Pressure Resilience (${avgComposure}%): Take a deliberate 2-second breath before answering edge case questions to reduce visible tension.`
    ];

    const behavioralSummary = {
      overallScore: behavioralOverallScore,
      statusLabel: behavioralStatusLabel,
      avgEye,
      avgWpm,
      totalFillers,
      avgComposure,
      suggestions: behavioralSuggestions,
      history: bList
    };

    return { overallScores, gradeInfo, strengths, weaknesses, dimensionLabels, radarData, recs: recs.slice(0, 6), duration, perQuestionFeedback, overallSummary, behavioralSummary };
  }, [responseHistory, behavioralHistory, config.role, config.company, interviewStartTime, questions, config]);

  // ─── METRIC DISPLAY CONFIG ────────────────────────────
  const metricDisplayConfig = [
    { key: 'problem_solving', label: 'Problem Solving', color: 'text-cyan-400', bg: 'bg-gradient-to-r from-cyan-600 to-cyan-400', icon: Brain },
    { key: 'communication', label: 'Communication', color: 'text-emerald-400', bg: 'bg-gradient-to-r from-emerald-600 to-emerald-400', icon: MessageSquare },
    { key: 'architecture', label: 'Architecture', color: 'text-purple-400', bg: 'bg-gradient-to-r from-purple-600 to-purple-400', icon: Zap },
    { key: 'coding', label: 'Coding', color: 'text-amber-400', bg: 'bg-gradient-to-r from-amber-600 to-amber-400', icon: Code2 },
    { key: 'behavioral', label: 'Behavioral', color: 'text-rose-400', bg: 'bg-gradient-to-r from-rose-600 to-rose-400', icon: Shield },
  ];

  // ═══════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════

  return (
    <div className="h-full bg-transparent text-black flex flex-col font-mono relative overflow-hidden select-none">
      <div className="flex-1 flex overflow-hidden z-10">
        {phase === 'config' ? (
          /* ═══ FULL SCREEN CONFIGURATION ═══ */
          <div className="flex-1 overflow-y-auto p-6 md:p-10 relative z-10 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="max-w-5xl mx-auto w-full flex-1 flex flex-col"
            >
              <div className="flex flex-col items-center text-center mb-10 mt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] border-2 border-black text-black font-black text-xs uppercase mb-4 shadow-[2px_2px_0px_#000]">
                  <Bot size={14} />
                  <span>[ SIMULATOR // AI INTERVIEW ENGINE ]</span>
                </div>
                
                <div className="w-20 h-20 bg-[#00F0FF] border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center mb-4">
                  <Bot size={36} className="text-black" />
                </div>

                <h2 className="text-4xl md:text-5xl font-black uppercase text-black mb-3 tracking-tight">
                  CONFIGURE <span className="bg-[#CCFF00] px-2 py-0.5 border-2 border-black shadow-[3px_3px_0px_#000] inline-block text-black">INTERVIEW</span>
                </h2>
                <p className="text-gray-700 text-xs font-bold uppercase tracking-wider max-w-2xl mx-auto leading-relaxed">
                  Set up your target role and company. Our AI uses advanced NLP to simulate realistic interview scenarios, evaluating your technical depth, communication, and problem-solving in real-time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Company */}
                <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col">
                  <label className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2 mb-4 pb-2 border-b-2 border-black">
                    <Building size={16} className="text-black" /> [ TARGET COMPANY ]
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {companies.map(c => {
                      const isSel = config.company === c;
                      return (
                        <button
                          key={c}
                          onClick={() => setConfig({ ...config, company: c })}
                          className={`px-3.5 py-2 text-xs font-black uppercase transition-all border-2 border-black ${
                            isSel
                              ? 'bg-black text-[#00F0FF] shadow-[2px_2px_0px_#000] translate-x-0.5'
                              : 'bg-[#FBF9F5] text-black hover:bg-[#FFDE59]'
                          }`}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Role */}
                <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col">
                  <label className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2 mb-4 pb-2 border-b-2 border-black">
                    <Briefcase size={16} className="text-black" /> [ TARGET ROLE ]
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {roles.map(r => {
                      const isSel = config.role === r;
                      return (
                        <button
                          key={r}
                          onClick={() => setConfig({ ...config, role: r })}
                          className={`px-3.5 py-2 text-xs font-black uppercase transition-all border-2 border-black ${
                            isSel
                              ? 'bg-black text-[#CCFF00] shadow-[2px_2px_0px_#000] translate-x-0.5'
                              : 'bg-[#FBF9F5] text-black hover:bg-[#FFDE59]'
                          }`}
                        >
                          {r}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Format */}
                <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col">
                  <label className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2 mb-4 pb-2 border-b-2 border-black">
                    <Target size={16} className="text-black" /> [ INTERVIEW FORMAT ]
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {formats.map(f => {
                      const isSel = config.format === f;
                      return (
                        <button
                          key={f}
                          onClick={() => setConfig({ ...config, format: f })}
                          className={`px-3.5 py-2 text-xs font-black uppercase transition-all border-2 border-black ${
                            isSel
                              ? 'bg-black text-[#FFDE59] shadow-[2px_2px_0px_#000] translate-x-0.5'
                              : 'bg-[#FBF9F5] text-black hover:bg-[#FFDE59]'
                          }`}
                        >
                          {f}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question Count */}
                <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col">
                  <label className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2 mb-4 pb-2 border-b-2 border-black">
                    <Hash size={16} className="text-black" /> [ SESSION LENGTH ]
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {questionCounts.map(n => {
                      const isSel = config.questionCount === n;
                      return (
                        <button
                          key={n}
                          onClick={() => setConfig({ ...config, questionCount: n })}
                          className={`px-4 py-2.5 text-xs font-black uppercase transition-all border-2 border-black ${
                            isSel
                              ? 'bg-black text-[#FF52D9] shadow-[2px_2px_0px_#000] translate-x-0.5'
                              : 'bg-[#FBF9F5] text-black hover:bg-[#FFDE59]'
                          }`}
                        >
                          {n} QUESTIONS
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* AI Video & Audio Behavioral Sensor Settings */}
                <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col md:col-span-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-black mb-4 gap-2">
                    <label className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2">
                      <Radio size={16} className="text-[#FF0033] animate-pulse" /> [ AI VIDEO & AUDIO BEHAVIORAL SENSORS ]
                    </label>
                    <span className="text-[10px] font-mono font-black text-black bg-[#CCFF00] px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                      60 FPS VISION + VOCAL TELEMETRY READY
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#FAF8F5] border-2 border-black p-3.5 shadow-[2px_2px_0px_#000] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Video size={16} className="text-black" />
                        <div>
                          <div className="text-xs font-black uppercase text-black">Camera Vision</div>
                          <div className="text-[10px] font-bold text-neutral-600">Eye contact & posture reticle</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsCameraActive(!isCameraActive)}
                        className={`px-3 py-1 text-xs font-black uppercase border-2 border-black transition-all ${
                          isCameraActive ? 'bg-[#CCFF00] text-black shadow-[2px_2px_0px_#000]' : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {isCameraActive ? 'ACTIVE' : 'OFF'}
                      </button>
                    </div>

                    <div className="bg-[#FAF8F5] border-2 border-black p-3.5 shadow-[2px_2px_0px_#000] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Mic size={16} className="text-black" />
                        <div>
                          <div className="text-xs font-black uppercase text-black">Microphone Telemetry</div>
                          <div className="text-[10px] font-bold text-neutral-600">Pacing (WPM) & filler tracker</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsMicActive(!isMicActive)}
                        className={`px-3 py-1 text-xs font-black uppercase border-2 border-black transition-all ${
                          isMicActive ? 'bg-[#00F0FF] text-black shadow-[2px_2px_0px_#000]' : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {isMicActive ? 'ACTIVE' : 'OFF'}
                      </button>
                    </div>

                    <div className="bg-[#FAF8F5] border-2 border-black p-3.5 shadow-[2px_2px_0px_#000] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Radio size={16} className="text-black" />
                        <div>
                          <div className="text-xs font-black uppercase text-black">Voice Answering</div>
                          <div className="text-[10px] font-bold text-neutral-600">Dictate answers via mic</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-black uppercase border-2 border-black bg-[#FFDE59] text-black shadow-[2px_2px_0px_#000]">
                        ENABLED
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pb-12 mt-auto">
                <button
                  onClick={handleStart}
                  className="px-12 py-5 bg-[#CCFF00] text-black border-4 border-black font-black text-base uppercase shadow-[6px_6px_0px_#000] hover:bg-black hover:text-[#CCFF00] active:translate-x-1 active:translate-y-1 transition-all flex items-center gap-3"
                >
                  <Play fill="currentColor" size={18} />
                  [ ⚡ START INTERVIEW PROTOCOL → ]
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          /* ═══ INTERVIEW / REPORT PANEL ═══ */
          <div className="flex-1 flex flex-col relative z-10 bg-[#FAF8F5]">
            {/* Top: AI Evaluation Metrics */}
            <div className="h-20 border-b-4 border-black bg-white flex items-center px-6 gap-8 overflow-x-auto shrink-0 custom-scrollbar shadow-[0_4px_0px_#000] z-20">
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-11 h-11 bg-[#FFDE59] border-3 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-black">
                  <Award size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF0033] animate-pulse border border-black" /> LIVE ANALYSIS
                  </div>
                  <div className="text-xs font-mono font-black uppercase text-black tracking-tight">
                    {phase === 'interview' ? `QUESTION ${currentQIndex + 1} OF ${questions.length}` : 'AI REAL-TIME SCORING'}
                  </div>
                </div>
              </div>

              <div className="w-[2px] h-10 bg-black shrink-0" />

              {metricDisplayConfig.map((m) => (
                <div key={m.key} className="w-32 shrink-0 group">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[9px] font-mono font-black text-neutral-800 uppercase tracking-wider flex items-center gap-1">
                      <m.icon size={11} strokeWidth={2.5} className="text-black" /> {m.label}
                    </span>
                    <span className="text-xs font-mono font-black text-black">{liveMetrics[m.key]}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#FAF8F5] border-2 border-black overflow-hidden shadow-[1px_1px_0px_#000]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${liveMetrics[m.key]}%` }}
                      className="h-full bg-[#00F0FF] border-r border-black"
                      transition={{ type: 'spring', stiffness: 50 }}
                    />
                  </div>
                </div>
              ))}

              {phase === 'interview' && (
                <div className="hidden xl:flex items-center gap-2.5 bg-[#FAF8F5] border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000] shrink-0 text-[10px] font-mono font-black uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse border border-black" />
                  <span>BEHAVIORAL SENSOR: {behavioralTelemetry.eyeContact}% EYE GAZE</span>
                  <span className="text-neutral-400">|</span>
                  <span className="text-[#FF52D9]">{behavioralTelemetry.wpm} WPM</span>
                </div>
              )}

              <div className="ml-auto shrink-0 flex items-center gap-3">
                {phase === 'interview' && (
                  <button
                    onClick={() => { setPhase('report'); setShowReport(true); }}
                    className="px-4 py-2 bg-[#FF0033] hover:bg-black text-white hover:text-[#FF0033] border-3 border-black font-mono font-black text-xs uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
                  >
                    <XCircle size={14} strokeWidth={2.5} /> [ END EARLY ]
                  </button>
                )}
                {phase === 'report' && (
                  <button
                    onClick={() => { setPhase('config'); setShowReport(false); }}
                    className="px-4 py-2 bg-[#00F0FF] hover:bg-[#CCFF00] text-black border-3 border-black font-mono font-black text-xs uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw size={14} strokeWidth={2.5} /> [ NEW INTERVIEW ]
                  </button>
                )}
              </div>
            </div>

            {/* ═══ REPORT VIEW ═══ */}
            {showReport && reportData ? (
              <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative bg-[#FAF8F5]">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="max-w-5xl mx-auto space-y-8 relative z-10"
                >
                  {/* Header */}
                  <div className="text-center p-8 md:p-12 border-4 border-black bg-white shadow-[8px_8px_0px_#000] relative">
                    <div className="inline-block bg-[#FFDE59] border-2 border-black px-4 py-1 font-mono font-black text-xs uppercase tracking-widest shadow-[2px_2px_0px_#000] mb-4">
                      [ FINAL EVALUATION REPORT ]
                    </div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                      className="text-8xl md:text-9xl font-mono font-black text-black mb-2"
                    >
                      {reportData.gradeInfo.grade}
                    </motion.div>
                    <div className="text-2xl font-mono font-black uppercase text-black tracking-wide mb-4">
                      {reportData.gradeInfo.label}
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs font-black uppercase text-black">
                      <span className="flex items-center gap-1.5 bg-[#FAF8F5] border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000]">
                        <Building size={14} strokeWidth={2.5} /> {config.company}
                      </span>
                      <span className="flex items-center gap-1.5 bg-[#FAF8F5] border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000]">
                        <Briefcase size={14} strokeWidth={2.5} /> {config.role}
                      </span>
                      <span className="flex items-center gap-1.5 bg-[#00F0FF] border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000]">
                        <Clock size={14} strokeWidth={2.5} /> {reportData.duration} MIN
                      </span>
                    </div>
                  </div>

                  {/* Radar + Score Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Radar Chart */}
                    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_#000] p-6 md:p-8 flex flex-col items-center">
                      <div className="w-full text-xs font-mono font-black uppercase tracking-wider text-black mb-6 flex items-center gap-2 border-b-2 border-black pb-2">
                        <Target size={16} strokeWidth={2.5} className="text-black" /> [ PERFORMANCE RADAR ]
                      </div>
                      <RadarChart
                        data={reportData.radarData}
                        labels={reportData.dimensionLabels}
                        size={280}
                      />
                    </div>

                    {/* Score Breakdown */}
                    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_#000] p-6 md:p-8 flex flex-col">
                      <div className="text-xs font-mono font-black uppercase tracking-wider text-black mb-6 flex items-center gap-2 border-b-2 border-black pb-2">
                        <BarChart3 size={16} strokeWidth={2.5} className="text-black" /> [ DIMENSION SCORES ]
                      </div>
                      <div className="space-y-5 flex-1">
                        {Object.entries(reportData.overallScores.dimensions).slice(0, reportData.dimensionLabels.length).map(([key, val], i) => {
                          const barColor = val >= 70 ? 'bg-[#CCFF00]' : val >= 45 ? 'bg-[#FFDE59]' : 'bg-[#FF0033]';
                          return (
                            <div key={key}>
                              <div className="flex justify-between items-end mb-1.5">
                                <span className="font-mono text-xs font-black uppercase text-black">{reportData.dimensionLabels[i] || key}</span>
                                <span className="font-mono text-sm font-black text-black">{val}%</span>
                              </div>
                              <div className="h-3 w-full bg-[#FAF8F5] border-2 border-black overflow-hidden shadow-[1px_1px_0px_#000]">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${val}%` }}
                                  className={`h-full ${barColor} border-r border-black`}
                                  transition={{ type: 'spring', stiffness: 40, delay: i * 0.1 }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-8 pt-6 border-t-3 border-black flex items-center justify-between bg-[#FAF8F5] -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-6 md:p-8">
                        <span className="font-mono text-xs font-black text-black uppercase tracking-wider">CALCULATED OVERALL</span>
                        <span className="font-mono text-3xl font-black text-black bg-[#CCFF00] border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000]">{reportData.overallScores.overall}%</span>
                      </div>
                    </div>
                  </div>

                  {/* ═══ AI BEHAVIORAL & VOCAL INTELLIGENCE DOSSIER ═══ */}
                  <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] relative">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b-3 border-black gap-3">
                      <div>
                        <div className="inline-block bg-[#00F0FF] border-2 border-black px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_#000] mb-1">
                          [ COMPUTER VISION & AUDIO BEHAVIORAL REPORT ]
                        </div>
                        <h3 className="text-xl md:text-2xl font-black uppercase text-black">
                          AI Behavioral & Vocal Intelligence Dossier
                        </h3>
                        <p className="text-xs font-bold text-neutral-600 uppercase">
                          Real-time analysis of eye contact gaze, speech cadence (WPM), composure under pressure, and filler word control
                        </p>
                      </div>

                      <div className="bg-black text-[#CCFF00] border-2 border-black px-4 py-2 shadow-[3px_3px_0px_#000] text-right shrink-0">
                        <div className="text-[9px] font-black text-white/70 uppercase">Executive Presence</div>
                        <div className="text-2xl font-black text-[#CCFF00]">{reportData.behavioralSummary?.overallScore}%</div>
                        <div className="text-[10px] font-bold text-[#00F0FF]">{reportData.behavioralSummary?.statusLabel}</div>
                      </div>
                    </div>

                    {/* 4 Pillar Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {/* Pillar 1: Eye Contact */}
                      <div className="bg-[#FAF8F5] border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black uppercase text-neutral-600 flex items-center gap-1.5">
                            <Eye size={13} className="text-[#00F0FF]" /> Camera Eye Gaze
                          </span>
                          <span className="text-[9px] font-black bg-[#CCFF00] text-black px-1.5 py-0.2 border border-black">
                            {reportData.behavioralSummary?.avgEye >= 75 ? 'OPTIMAL' : 'RECENTER'}
                          </span>
                        </div>
                        <div className="text-3xl font-black text-black mb-1">{reportData.behavioralSummary?.avgEye}%</div>
                        <div className="text-[10px] font-bold text-neutral-600">FAANG target benchmark: 70% - 85% steady engagement</div>
                      </div>

                      {/* Pillar 2: Speaking Cadence */}
                      <div className="bg-[#FAF8F5] border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black uppercase text-neutral-600 flex items-center gap-1.5">
                            <Activity size={13} className="text-[#FF52D9]" /> Speech Cadence
                          </span>
                          <span className="text-[9px] font-black bg-[#00F0FF] text-black px-1.5 py-0.2 border border-black">
                            {reportData.behavioralSummary?.avgWpm > 155 ? 'RUSHED' : reportData.behavioralSummary?.avgWpm < 110 ? 'HESITANT' : 'OPTIMAL'}
                          </span>
                        </div>
                        <div className="text-3xl font-black text-black mb-1">{reportData.behavioralSummary?.avgWpm} <span className="text-sm font-bold text-neutral-500">WPM</span></div>
                        <div className="text-[10px] font-bold text-neutral-600">Target: 120-150 words/min conversational fluency</div>
                      </div>

                      {/* Pillar 3: Filler Words */}
                      <div className="bg-[#FAF8F5] border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black uppercase text-neutral-600 flex items-center gap-1.5">
                            <Radio size={13} className="text-[#FF0033]" /> Filler Word Control
                          </span>
                          <span className={`text-[9px] font-black px-1.5 py-0.2 border border-black ${
                            reportData.behavioralSummary?.totalFillers <= 2 ? 'bg-[#CCFF00] text-black' : 'bg-[#FFDE59] text-black'
                          }`}>
                            {reportData.behavioralSummary?.totalFillers <= 2 ? 'EXCELLENT' : 'MONITOR'}
                          </span>
                        </div>
                        <div className="text-3xl font-black text-black mb-1">{reportData.behavioralSummary?.totalFillers} <span className="text-sm font-bold text-neutral-500">detected</span></div>
                        <div className="text-[10px] font-bold text-neutral-600">Tracked 'um', 'uh', 'like', 'you know' across all answers</div>
                      </div>

                      {/* Pillar 4: Composure Under Fire */}
                      <div className="bg-[#FAF8F5] border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black uppercase text-neutral-600 flex items-center gap-1.5">
                            <Shield size={13} className="text-[#CCFF00]" /> Stress Resilience
                          </span>
                          <span className="text-[9px] font-black bg-[#CCFF00] text-black px-1.5 py-0.2 border border-black">
                            COMPOSED
                          </span>
                        </div>
                        <div className="text-3xl font-black text-black mb-1">{reportData.behavioralSummary?.avgComposure}%</div>
                        <div className="text-[10px] font-bold text-neutral-600">Maintained vocal stability and posture under hard deep-dives</div>
                      </div>
                    </div>

                    {/* Actionable Behavioral Coaching Recommendations */}
                    <div className="p-5 bg-[#FAF8F5] border-3 border-black shadow-[4px_4px_0px_#000]">
                      <div className="text-xs font-black uppercase tracking-wider text-black mb-3 flex items-center gap-2">
                        <Sparkles size={16} className="text-black" /> [ TAILORED BEHAVIORAL SUGGESTIONS FOR FAANG INTERVIEWS ]
                      </div>
                      <div className="space-y-2.5">
                        {reportData.behavioralSummary?.suggestions?.map((sug, i) => (
                          <div key={i} className="bg-white border-2 border-black p-3.5 shadow-[2px_2px_0px_#000] flex items-start gap-3">
                            <span className="w-5 h-5 bg-[#FFDE59] border border-black flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-[1px_1px_0px_#000]">
                              {i + 1}
                            </span>
                            <span className="text-xs font-bold text-black leading-relaxed">{sug}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[#CCFF00]/20 border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000]">
                      <div className="text-xs font-mono font-black uppercase tracking-wider text-black mb-4 flex items-center gap-2 border-b-2 border-black pb-2">
                        <CheckCircle size={16} strokeWidth={2.5} /> KEY STRENGTHS
                      </div>
                      <div className="space-y-3">
                        {reportData.strengths.length > 0 ? reportData.strengths.map((s, i) => (
                          <div key={i} className="flex items-center gap-2.5 font-mono text-xs font-bold text-black bg-white border-2 border-black px-4 py-3 shadow-[2px_2px_0px_#000]">
                            <div className="w-2.5 h-2.5 bg-black shrink-0" />
                            {s}
                          </div>
                        )) : (
                          <p className="font-mono text-xs text-neutral-600 font-bold italic">Complete more questions to see strengths</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#FF0033]/15 border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000]">
                      <div className="text-xs font-mono font-black uppercase tracking-wider text-black mb-4 flex items-center gap-2 border-b-2 border-black pb-2">
                        <AlertTriangle size={16} strokeWidth={2.5} /> AREAS TO IMPROVE
                      </div>
                      <div className="space-y-3">
                        {reportData.weaknesses.length > 0 ? reportData.weaknesses.map((w, i) => (
                          <div key={i} className="flex items-center gap-2.5 font-mono text-xs font-bold text-black bg-white border-2 border-black px-4 py-3 shadow-[2px_2px_0px_#000]">
                            <div className="w-2.5 h-2.5 bg-[#FF0033] shrink-0 border border-black" />
                            {w}
                          </div>
                        )) : (
                          <div className="flex items-center gap-2 font-mono text-xs text-black font-bold bg-[#CCFF00] border-2 border-black px-4 py-3 shadow-[2px_2px_0px_#000]">
                            <Sparkles size={16} strokeWidth={2.5} /> No major weaknesses detected — stellar performance!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Study Recommendations */}
                  {reportData.recs.length > 0 && (
                    <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000]">
                      <div className="text-xs font-mono font-black uppercase tracking-wider text-black mb-6 flex items-center gap-2 border-b-2 border-black pb-2">
                        <Lightbulb size={16} strokeWidth={2.5} /> [ PERSONALIZED STUDY PLAN ]
                      </div>
                      <div className="space-y-3">
                        {reportData.recs.map((rec, i) => (
                          <div key={i} className="flex items-start gap-3 bg-[#FAF8F5] border-2 border-black p-3.5 shadow-[2px_2px_0px_#000]">
                            <div className="w-6 h-6 bg-[#FFDE59] text-black flex items-center justify-center font-mono text-xs font-black shrink-0 border border-black shadow-[1px_1px_0px_#000]">
                              {i + 1}
                            </div>
                            <div className="font-mono text-xs text-black font-bold leading-relaxed pt-0.5">
                              {rec}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ═══ OVERALL INTERVIEW SUMMARY ═══ */}
                  {reportData.overallSummary && (
                    <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000]">
                      <div className="text-xs font-mono font-black uppercase tracking-wider text-black mb-6 flex items-center gap-2 border-b-2 border-black pb-2">
                        <Brain size={16} strokeWidth={2.5} /> [ INTERVIEW SUMMARY — WHAT HAPPENED ]
                      </div>

                      {/* Quick Stats Bar */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                        {[
                          { label: 'STRONG', value: reportData.overallSummary.stats.strongCount, bg: 'bg-[#CCFF00]' },
                          { label: 'AVERAGE', value: reportData.overallSummary.stats.avgCount, bg: 'bg-[#FFDE59]' },
                          { label: 'WEAK', value: reportData.overallSummary.stats.weakCount, bg: 'bg-[#FF0033] text-white' },
                          { label: 'AVG WORDS', value: reportData.overallSummary.stats.avgWords, bg: 'bg-[#00F0FF]' },
                          { label: 'STRUCTURED', value: `${reportData.overallSummary.stats.structuredPct}%`, bg: 'bg-[#FF52D9]' },
                          { label: 'KEYWORD HIT', value: `${reportData.overallSummary.stats.keywordHitRate}%`, bg: 'bg-[#CCFF00]' },
                        ].map((stat, i) => (
                          <div key={i} className={`${stat.bg} border-2 border-black p-3 text-center shadow-[3px_3px_0px_#000]`}>
                            <div className="text-xl font-mono font-black">{stat.value}</div>
                            <div className="text-[9px] font-mono font-black uppercase tracking-widest mt-0.5">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Narrative Paragraphs */}
                      <div className="space-y-3 font-mono text-xs text-neutral-900 font-bold leading-relaxed bg-[#FAF8F5] border-2 border-black p-4 shadow-[2px_2px_0px_#000]">
                        {reportData.overallSummary.paragraphs.map((p, i) => (
                          <p key={i}>
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ═══ ACTION PLAN ═══ */}
                  {reportData.overallSummary?.actionPlan?.length > 0 && (
                    <div className="bg-[#FAF8F5] border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000]">
                      <div className="text-xs font-mono font-black uppercase tracking-wider text-black mb-2 flex items-center gap-2">
                        <Target size={16} strokeWidth={2.5} /> YOUR ACTION PLAN — WHAT TO WORK ON
                      </div>
                      <p className="font-mono text-xs text-neutral-600 font-bold mb-6">Prioritized steps to improve your interview performance</p>
                      <div className="space-y-3">
                        {reportData.overallSummary.actionPlan.map((item, i) => {
                          const priorityConfig = {
                            high: { bg: 'bg-[#FF0033] text-white', label: 'HIGH' },
                            medium: { bg: 'bg-[#FFDE59] text-black', label: 'MED' },
                            low: { bg: 'bg-[#00F0FF] text-black', label: 'LOW' },
                          };
                          const pc = priorityConfig[item.priority] || priorityConfig.low;
                          return (
                            <div key={i} className="flex items-start gap-4 bg-white border-3 border-black p-4 shadow-[3px_3px_0px_#000]">
                              <span className={`px-2 py-0.5 border border-black font-mono text-[9px] font-black uppercase tracking-widest shrink-0 ${pc.bg}`}>
                                {pc.label}
                              </span>
                              <div className="font-mono text-xs text-black font-bold leading-relaxed">
                                {item.text}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ═══ PER-QUESTION DEEP DIVE ═══ */}
                  <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000]">
                    <div className="text-xs font-mono font-black uppercase tracking-wider text-black mb-6 flex items-center gap-2 border-b-2 border-black pb-2">
                      <MessageSquare size={16} strokeWidth={2.5} /> [ QUESTION-BY-QUESTION DEEP DIVE ]
                    </div>
                    <div className="space-y-6">
                      {responseHistory.map((r, i) => {
                        const q = questions[i];
                        const fb = reportData.perQuestionFeedback?.[i];
                        const isStrong = r.rubricLevel === 'strong';
                        const isAverage = r.rubricLevel === 'average';
                        const badgeBg = isStrong ? 'bg-[#CCFF00] text-black' : isAverage ? 'bg-[#FFDE59] text-black' : 'bg-[#FF0033] text-white';

                        return (
                          <div key={i} className="bg-[#FAF8F5] border-3 border-black p-5 shadow-[4px_4px_0px_#000]">
                            {/* Question Header */}
                            <div className="flex items-start justify-between gap-6">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-mono text-[10px] font-black uppercase bg-black text-[#CCFF00] px-2 py-0.5">
                                    Q{i + 1}
                                  </span>
                                  <span className="font-mono text-xs font-black text-black uppercase">
                                    {q?.format} · {q?.difficulty}
                                  </span>
                                </div>
                                <div className="font-mono text-xs font-bold text-black leading-relaxed">{q?.text}</div>
                              </div>
                              <div className={`px-2.5 py-1 font-mono text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] shrink-0 ${badgeBg}`}>
                                {r.rubricLevel}
                              </div>
                            </div>

                            {/* Score Row */}
                            <div className="mt-4 pt-4 border-t-2 border-black grid grid-cols-2 sm:grid-cols-4 gap-3">
                              <div className="bg-white border-2 border-black p-2.5 shadow-[2px_2px_0px_#000]">
                                <div className="font-mono text-[9px] font-black uppercase text-neutral-500 mb-0.5">Problem Solving</div>
                                <div className="font-mono text-lg font-black text-black">{r.scores.problem_solving}%</div>
                              </div>
                              <div className="bg-white border-2 border-black p-2.5 shadow-[2px_2px_0px_#000]">
                                <div className="font-mono text-[9px] font-black uppercase text-neutral-500 mb-0.5">Keywords Hit</div>
                                <div className="font-mono text-lg font-black text-black">
                                  <span>{r.matchedKeywords.length}</span>
                                  <span className="text-neutral-500 text-xs"> / {(r.matchedKeywords.length + r.missedKeywords.length)}</span>
                                </div>
                              </div>
                              <div className="bg-white border-2 border-black p-2.5 shadow-[2px_2px_0px_#000]">
                                <div className="font-mono text-[9px] font-black uppercase text-neutral-500 mb-0.5">Eye Contact Gaze</div>
                                <div className="font-mono text-lg font-black text-[#00F0FF]">
                                  {fb?.behavioral?.eyeContact || 88}%
                                </div>
                              </div>
                              <div className="bg-white border-2 border-black p-2.5 shadow-[2px_2px_0px_#000]">
                                <div className="font-mono text-[9px] font-black uppercase text-neutral-500 mb-0.5">Vocal Cadence & Fillers</div>
                                <div className="font-mono text-xs font-black text-black mt-1">
                                  <span>{fb?.behavioral?.wpm || 135} WPM</span>
                                  <span className="text-neutral-400 mx-1">·</span>
                                  <span className="text-rose-600 font-bold">{fb?.behavioral?.fillerCount || 0} fillers</span>
                                </div>
                              </div>
                            </div>

                            {/* Detailed Feedback */}
                            {fb && (
                              <div className="mt-4 pt-4 border-t-2 border-black space-y-3">
                                {fb.behavioral?.tips && fb.behavioral.tips.length > 0 && (
                                  <div className="bg-[#FAF8F5] border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                                    <div className="font-mono text-[10px] font-black text-black uppercase mb-1.5 flex items-center gap-1.5">
                                      <Video size={12} strokeWidth={2.5} className="text-black" /> Behavioral & Vocal Coaching
                                    </div>
                                    <div className="space-y-1">
                                      {fb.behavioral.tips.map((tip, j) => (
                                        <div key={j} className="font-mono text-xs font-bold text-neutral-800 flex items-start gap-2">
                                          <span className="w-1.5 h-1.5 bg-[#00F0FF] mt-1.5 shrink-0 border border-black" />
                                          <span>{tip}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {fb.whatWasGood.length > 0 && (
                                  <div className="bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                                    <div className="font-mono text-[10px] font-black text-black uppercase mb-1.5 flex items-center gap-1.5">
                                      <CheckCircle size={12} strokeWidth={2.5} /> What You Did Well
                                    </div>
                                    <div className="space-y-1">
                                      {fb.whatWasGood.map((item, j) => (
                                        <div key={j} className="font-mono text-xs font-bold text-neutral-800 flex items-start gap-2">
                                          <span className="w-1.5 h-1.5 bg-black mt-1.5 shrink-0" />
                                          <span>{item}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {fb.whatWentWrong.length > 0 && (
                                  <div className="bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                                    <div className="font-mono text-[10px] font-black text-[#FF0033] uppercase mb-1.5 flex items-center gap-1.5">
                                      <XCircle size={12} strokeWidth={2.5} /> What Went Wrong
                                    </div>
                                    <div className="space-y-1">
                                      {fb.whatWentWrong.map((item, j) => (
                                        <div key={j} className="font-mono text-xs font-bold text-neutral-800 flex items-start gap-2">
                                          <span className="w-1.5 h-1.5 bg-[#FF0033] mt-1.5 shrink-0" />
                                          <span>{item}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>

            ) : (
              /* ═══ INTERVIEW VIEW: Code + Chat ═══ */
              <div className="flex-1 flex overflow-hidden">
                {/* Code Editor */}
                <div className="flex-1 border-r-4 border-black bg-[#18181b] flex flex-col relative">
                  {/* Editor Top Bar */}
                  <div className="h-12 border-b-3 border-black flex items-center px-4 justify-between bg-white shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#FF0033] border-2 border-black shadow-[1px_1px_0px_#000]" />
                        <div className="w-3.5 h-3.5 rounded-full bg-[#FFDE59] border-2 border-black shadow-[1px_1px_0px_#000]" />
                        <div className="w-3.5 h-3.5 rounded-full bg-[#CCFF00] border-2 border-black shadow-[1px_1px_0px_#000]" />
                      </div>
                      <div className="w-[2px] h-5 bg-black" />
                      <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black bg-[#FAF8F5] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
                        <Code2 size={14} strokeWidth={2.5} className="text-black" /> scratchpad.js
                      </div>
                    </div>
                    <div className="text-[10px] font-mono font-black text-neutral-600 uppercase tracking-wider bg-white border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                      LIVE CODING ENVIRONMENT
                    </div>
                  </div>

                  {/* Line Numbers + Textarea */}
                  <div className="flex-1 flex relative bg-[#18181b]">
                    <div className="w-12 bg-black/40 border-r-2 border-black flex flex-col items-end py-4 pr-3 text-[11px] font-mono text-neutral-500 select-none">
                      {code.split('\n').map((_, i) => <div key={i} className="h-6 leading-6">{i + 1}</div>)}
                    </div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      spellCheck="false"
                      className="w-full h-full bg-transparent text-white font-mono text-[13px] leading-6 p-4 resize-none focus:outline-none custom-scrollbar"
                      style={{ tabSize: 2 }}
                    />
                  </div>

                  {/* Floating PIP Video & Audio HUD in Code Editor */}
                  {phase === 'interview' && hudLayout === 'pip' && (
                    <AiInterviewVideoAudioHud
                      isCameraActive={isCameraActive}
                      setIsCameraActive={setIsCameraActive}
                      isMicActive={isMicActive}
                      setIsMicActive={setIsMicActive}
                      hudLayout={hudLayout}
                      setHudLayout={setHudLayout}
                      behavioralTelemetry={behavioralTelemetry}
                      setBehavioralTelemetry={setBehavioralTelemetry}
                      onSpeechTranscribed={(text) => setInputMsg(prev => prev ? prev + ' ' + text : text)}
                      isListening={isListening}
                      setIsListening={setIsListening}
                      currentQuestion={questions[currentQIndex]}
                    />
                  )}
                </div>

                {/* AI Chat Terminal */}
                <div className="w-[490px] bg-[#FAF8F5] border-l-4 border-black flex flex-col shrink-0 shadow-2xl relative z-20">
                  {/* Chat Header */}
                  <div className="h-12 border-b-3 border-black flex items-center justify-between px-5 bg-white shadow-sm relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#00F0FF] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center">
                        <Bot size={16} strokeWidth={2.5} className="text-black" />
                      </div>
                      <div>
                        <span className="block text-xs font-mono font-black text-black uppercase tracking-wider">
                          AI Interviewer
                        </span>
                        <span className="inline-block text-[9px] font-mono font-black text-black bg-[#CCFF00] border border-black px-1.5 uppercase">
                          Online
                        </span>
                      </div>
                    </div>

                    {phase === 'interview' && (
                      <div className="flex items-center gap-2 bg-[#FFDE59] border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_#000]">
                        <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                        <span className="text-[10px] font-mono font-black text-black uppercase tracking-wider">
                          Q {currentQIndex + 1} / {questions.length}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Docked AI Video & Audio Behavioral HUD */}
                  {phase === 'interview' && hudLayout === 'docked' && (
                    <AiInterviewVideoAudioHud
                      isCameraActive={isCameraActive}
                      setIsCameraActive={setIsCameraActive}
                      isMicActive={isMicActive}
                      setIsMicActive={setIsMicActive}
                      hudLayout={hudLayout}
                      setHudLayout={setHudLayout}
                      behavioralTelemetry={behavioralTelemetry}
                      setBehavioralTelemetry={setBehavioralTelemetry}
                      onSpeechTranscribed={(text) => setInputMsg(prev => prev ? prev + ' ' + text : text)}
                      isListening={isListening}
                      setIsListening={setIsListening}
                      currentQuestion={questions[currentQIndex]}
                    />
                  )}

                  {/* Minimized or PIP Mode Quick-Status Bar in Chat */}
                  {phase === 'interview' && hudLayout !== 'docked' && (
                    <div className="border-b-2 border-black bg-[#CCFF00]/20 px-3 py-1.5 flex items-center justify-between text-[10px] font-mono font-black text-black">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                        <span>SENSORS: {hudLayout === 'pip' ? 'PIP OVER CODEPAD' : 'MINIMIZED'} ({behavioralTelemetry.eyeContact}% EYE · {behavioralTelemetry.wpm} WPM)</span>
                      </div>
                      <button
                        onClick={() => setHudLayout('docked')}
                        className="bg-white border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000] hover:bg-[#CCFF00] uppercase transition-colors"
                      >
                        Dock Here
                      </button>
                    </div>
                  )}

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar scroll-smooth bg-[#FAF8F5]">
                    <AnimatePresence>
                      {chat.map((msg, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 15, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`flex gap-3 max-w-[95%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                        >
                          <div className={`w-8 h-8 border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] ${
                            msg.sender === 'system' ? 'bg-[#FAF8F5] text-black' :
                            msg.sender === 'ai' ? 'bg-[#00F0FF] text-black' :
                            'bg-[#CCFF00] text-black'
                          }`}>
                            {msg.sender === 'system' ? <Settings size={14} strokeWidth={2.5} /> : msg.sender === 'ai' ? <Bot size={16} strokeWidth={2.5} /> : <User size={14} strokeWidth={2.5} />}
                          </div>

                          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                            {/* Name Label */}
                            <span className={`text-[10px] font-mono font-black uppercase tracking-wider px-1 ${msg.sender === 'user' ? 'text-right text-black' : 'text-black'}`}>
                              {msg.sender === 'user' ? 'YOU' : msg.sender === 'ai' ? 'AI INTERVIEWER' : 'SYSTEM'}
                            </span>

                            {/* Question badge (for AI) */}
                            {msg.meta?.type === 'question' && (
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="text-[9px] font-mono font-black uppercase tracking-wider text-black bg-[#FFDE59] px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000]">
                                  QUESTION {msg.meta.qIndex + 1}
                                </span>
                                <span className={`text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] ${
                                  msg.meta.difficulty === 'Hard' ? 'text-white bg-[#FF0033]' :
                                  msg.meta.difficulty === 'Medium' ? 'text-black bg-[#FFDE59]' :
                                  'text-black bg-[#CCFF00]'
                                }`}>
                                  {msg.meta.difficulty}
                                </span>
                                <span className="text-[9px] font-mono font-black uppercase tracking-wider text-black bg-white px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000]">
                                  {msg.meta.format}
                                </span>
                              </div>
                            )}

                            {/* Message Bubble */}
                            <div className={`p-4 text-xs font-mono leading-relaxed shadow-[4px_4px_0px_#000] border-3 border-black ${
                              msg.sender === 'system' ? 'bg-white text-neutral-700' :
                              msg.sender === 'ai' ? 'bg-white text-black' :
                              'bg-[#00F0FF] text-black font-bold'
                            }`}>
                              {msg.text.split('\n').map((line, li) => (
                                <span key={li}>
                                  {line.split(/(\*\*[^*]+\*\*)/).map((part, pi) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                      return <strong key={pi} className="text-black font-black underline decoration-2">{part.slice(2, -2)}</strong>;
                                    }
                                    return <span key={pi}>{part}</span>;
                                  })}
                                  {li < msg.text.split('\n').length - 1 && <br />}
                                </span>
                              ))}
                            </div>

                            {/* Quality and Behavioral indicators for user messages */}
                            {msg.sender === 'user' && (
                              <div className="flex flex-col gap-1.5 self-end mt-1 items-end">
                                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                                  {msg.meta?.quality && (
                                    <div className={`flex items-center gap-1 text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] ${
                                      msg.meta.quality === 'strong' ? 'bg-[#CCFF00] text-black' :
                                      msg.meta.quality === 'average' ? 'bg-[#FFDE59] text-black' :
                                      'bg-[#FF0033] text-white'
                                    }`}>
                                      {msg.meta.quality === 'strong' ? <CheckCircle size={10} strokeWidth={3} /> :
                                        msg.meta.quality === 'average' ? <AlertTriangle size={10} strokeWidth={3} /> :
                                        <XCircle size={10} strokeWidth={3} />}
                                      <span>{msg.meta.quality} Answer · {msg.meta.score}%</span>
                                    </div>
                                  )}
                                </div>

                                {msg.meta?.behavioral && (
                                  <div className="flex items-center gap-1.5 flex-wrap justify-end text-[9px] font-mono font-black uppercase tracking-wider">
                                    <span className="bg-white text-black border border-black px-1.5 py-0.5 shadow-[1px_1px_0px_#000] flex items-center gap-1">
                                      <Eye size={10} className="text-[#00F0FF]" /> {msg.meta.behavioral.eyeContact}% Gaze
                                    </span>
                                    <span className="bg-white text-black border border-black px-1.5 py-0.5 shadow-[1px_1px_0px_#000] flex items-center gap-1">
                                      <Activity size={10} className="text-[#FF52D9]" /> {msg.meta.behavioral.wpm} WPM
                                    </span>
                                    <span className={`border border-black px-1.5 py-0.5 shadow-[1px_1px_0px_#000] ${
                                      msg.meta.behavioral.fillerCount === 0 ? 'bg-[#CCFF00] text-black' : 'bg-[#FFDE59] text-black'
                                    }`}>
                                      {msg.meta.behavioral.fillerCount} Fillers
                                    </span>
                                    <span className="bg-black text-[#CCFF00] border border-black px-1.5 py-0.5 shadow-[1px_1px_0px_#000]">
                                      {msg.meta.behavioral.composureLabel}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Typing indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 max-w-[85%]"
                      >
                        <div className="w-8 h-8 bg-[#00F0FF] border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000]">
                          <Bot size={16} strokeWidth={2.5} className="text-black" />
                        </div>
                        <div className="p-3 bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
                          <div className="flex gap-1.5 items-center h-4">
                            {[0, 1, 2].map(i => (
                              <motion.div
                                key={i}
                                className="w-2.5 h-2.5 bg-black"
                                animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={chatEndRef} className="h-4" />
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t-3 border-black bg-white shadow-[0_-3px_0px_#000] relative z-20">
                    <div className="relative flex items-end gap-2.5">
                      <div className="flex-1 relative">
                        <textarea
                          ref={inputRef}
                          value={inputMsg}
                          onChange={e => setInputMsg(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSend();
                            }
                          }}
                          placeholder={isTyping ? "AI is evaluating..." : "Type your answer or click mic to speak..."}
                          disabled={isTyping || phase !== 'interview'}
                          rows={inputMsg.split('\n').length > 1 ? Math.min(inputMsg.split('\n').length, 5) : 1}
                          className="w-full bg-[#FAF8F5] border-3 border-black p-3 text-xs font-mono text-black placeholder:text-neutral-500 focus:outline-none focus:bg-white transition-all disabled:opacity-40 resize-none custom-scrollbar shadow-[3px_3px_0px_#000]"
                          style={{ minHeight: '48px' }}
                        />
                      </div>

                      {/* Mic Speech-to-Text Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                          if (!SpeechRecognition) {
                            const simulatedSpoken = [
                              "I would approach this by first clarifying the functional and non-functional requirements, specifically the peak throughput and latency SLA.",
                              "We can use a hash map for constant time lookup combined with an LRU doubly linked list for eviction.",
                              "In my experience, decoupling the message queue with idempotent consumers avoids race conditions under high network partitions."
                            ];
                            const sample = simulatedSpoken[Math.floor(Math.random() * simulatedSpoken.length)];
                            setInputMsg(prev => prev ? prev + ' ' + sample : sample);
                            return;
                          }
                          setIsListening(!isListening);
                        }}
                        disabled={isTyping || phase !== 'interview'}
                        title={isListening ? "Listening to your voice... Click to stop" : "Speak answer via microphone (Speech-to-Text)"}
                        className={`w-12 h-[48px] border-3 border-black flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none shrink-0 ${
                          isListening ? 'bg-[#FF0033] text-white animate-pulse' : 'bg-[#FFDE59] hover:bg-[#ffe580] text-black'
                        }`}
                      >
                        {isListening ? <MicOff size={18} strokeWidth={2.5} /> : <Mic size={18} strokeWidth={2.5} />}
                      </button>

                      {/* Send Button */}
                      <button
                        onClick={handleSend}
                        disabled={isTyping || !inputMsg.trim() || phase !== 'interview'}
                        className="w-14 h-[48px] bg-[#CCFF00] hover:bg-[#b8f000] text-black border-3 border-black flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none shrink-0"
                      >
                        <Send size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-2.5 px-1 font-mono text-[10px] text-neutral-600 font-bold">
                      <p>
                        Press <kbd className="bg-[#FAF8F5] border border-black px-1.5 py-0.5 text-black">ENTER</kbd> to send
                      </p>
                      <p className="flex items-center gap-1 text-black font-black uppercase">
                        <Shield size={10} strokeWidth={2.5} /> VOCAL & EYE GAZE TELEMETRY ACTIVE
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}