const fs = require('fs');

const problemTitles = [
  { title: "Modulo Sum", difficulty: "Medium", subs: 3 },
  { title: "Crossing Blocks Game", difficulty: "Medium", subs: 0 },
  { title: "Kill the birds", difficulty: "Medium", subs: 0 },
  { title: "Counting In Byteland", difficulty: "Hard", subs: 0 },
  { title: "Shil and Palindrome Research", difficulty: "Medium", subs: 0 },
  { title: "BUY AND SELL", difficulty: "Medium", subs: 0 },
  { title: "ETF QUERY", difficulty: "Medium", subs: 3 },
  { title: "Royal Tour", difficulty: "Hard", subs: 0 },
  { title: "Ping Pong Racing", difficulty: "Medium", subs: 0 },
  { title: "OR Subarrays", difficulty: "Medium", subs: 0 },
  { title: "Perfect Pair", difficulty: "Medium", subs: 0 },
  { title: "Maximum XOR", difficulty: "Medium", subs: 0 },
  { title: "Perfect Subset", difficulty: "Hard", subs: 0 },
  { title: "Prime Triplets", difficulty: "Hard", subs: 0 },
  { title: "XOR on arrays", difficulty: "Medium", subs: 0 },
  { title: "Max Cost Permutation", difficulty: "Hard", subs: 0 },
  { title: "Minimum Set of Strings", difficulty: "Medium", subs: 0 },
  { title: "XOR Matrix", difficulty: "Hard", subs: 0 },
  { title: "Palindromic Queries", difficulty: "Medium", subs: 13 },
  { title: "Friends Pairing Problem", difficulty: "Medium", subs: 15 },
  { title: "SQUARE PAINTING", difficulty: "Easy", subs: 1 },
  { title: "369 Numbers", difficulty: "Easy", subs: 0 },
  { title: "Encoding", difficulty: "Hard", subs: 0 },
  { title: "Pattern 110", difficulty: "Easy", subs: 0 },
  { title: "PR Number", difficulty: "Easy", subs: 0 },
  { title: "Maximum Bullet", difficulty: "Medium", subs: 4 },
  { title: "Pairs On Line", difficulty: "Medium", subs: 1 },
  { title: "Regex Matching", difficulty: "Medium", subs: 0 },
  { title: "0-N Knapsack", difficulty: "Medium", subs: 1 },
  { title: "Mixtures", difficulty: "Medium", subs: 0 },
  { title: "Colorful Knapsack", difficulty: "Medium", subs: 4 },
  { title: "Divisible Patterns", difficulty: "Medium", subs: 1 },
  { title: "All Ones", difficulty: "Hard", subs: 2 },
  { title: "Circular Merging", difficulty: "Easy", subs: 0 },
  { title: "Beautiful Pen", difficulty: "Hard", subs: 0 },
  { title: "Maximum Loot (0/1 Knapsack)", difficulty: "Medium", subs: 1 }
];

const pythonDpQuestions = [
  { text: "Which built-in Python module provides a decorator for memoization?", options: ["sys", "itertools", "functools", "math"], correct: 2 },
  { text: "What is the primary difference between top-down and bottom-up DP?", options: ["Top-down uses iteration, bottom-up uses recursion", "Top-down uses recursion + memoization, bottom-up uses iteration + tabulation", "There is no difference", "Bottom-up is always faster"], correct: 1 },
  { text: "Which data structure is typically used for tabulation in bottom-up DP in Python?", options: ["Tuple", "Set", "List or 2D List", "Dictionary"], correct: 2 },
  { text: "How do you create a 2D list of size M x N initialized with zeros in Python?", options: ["[[0]*N]*M", "[[0 for _ in range(N)] for _ in range(M)]", "[0]*N*M", "list(N, M, 0)"], correct: 1 },
  { text: "Why is `[[0]*N]*M` generally avoided for 2D DP arrays in Python?", options: ["It is slower", "It creates shallow copies of the inner list", "It causes syntax errors", "It uses too much memory"], correct: 1 }
];

let dataObj = `// Dynamic Programming (Python Challenges) Data
const dpPythonData = {
  id: 3,
  title: 'Dynamic Programming in Python',
  topics: 'Knapsack | DP on Strings | Bitmask DP | Subarrays | Matrix DP',
  problems: [
`;

problemTitles.forEach((p, index) => {
  let status = 'unsolved';
  if (p.subs > 5) status = 'solved';
  else if (p.subs > 1) status = 'wrong';

  dataObj += `    {
      id: ${index + 1},
      title: "${p.title}",
      difficulty: "${p.difficulty}",
      submissions: ${p.subs},
      maxPoints: 100,
      status: '${status}',
      questions: [\n`;
  
  // Add exactly 5 questions per problem, slightly modified per problem to feel unique
  pythonDpQuestions.forEach((q, qIndex) => {
    dataObj += `        { text: "${q.text.replace('?', ` for ${p.title}?`)}", options: ${JSON.stringify(q.options)}, correct: ${q.correct} },\n`;
  });

  dataObj += `      ]
    },\n`;
});

dataObj += `  ]
};

export default dpPythonData;
`;

fs.writeFileSync('/Users/kunalverma/Downloads/High/hypers/src/data/dpPythonData.js', dataObj);
console.log('dpPythonData.js generated successfully.');
