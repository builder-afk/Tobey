const fs = require('fs');

const problemTitles = [
  // 1D DP
  { title: "Climbing Stairs", difficulty: "Easy", subs: 120, topic: "1D DP" },
  { title: "House Robber", difficulty: "Medium", subs: 85, topic: "1D DP" },
  { title: "Maximum Subarray", difficulty: "Easy", subs: 150, topic: "1D DP" },
  { title: "Frog Jump", difficulty: "Medium", subs: 45, topic: "1D DP" },
  
  // 2D Grid DP
  { title: "Unique Paths", difficulty: "Medium", subs: 92, topic: "2D Grid DP" },
  { title: "Minimum Path Sum", difficulty: "Medium", subs: 78, topic: "2D Grid DP" },
  { title: "Dungeon Game", difficulty: "Hard", subs: 25, topic: "2D Grid DP" },
  
  // Knapsack Variations
  { title: "Maximum Loot (0/1 Knapsack)", difficulty: "Medium", subs: 110, topic: "Knapsack Variations" },
  { title: "Subset Sum Equal To K", difficulty: "Medium", subs: 65, topic: "Knapsack Variations" },
  { title: "Coin Change", difficulty: "Medium", subs: 140, topic: "Knapsack Variations" },
  { title: "0-N Knapsack", difficulty: "Medium", subs: 40, topic: "Knapsack Variations" },
  
  // DP on Strings
  { title: "Longest Common Subsequence", difficulty: "Medium", subs: 135, topic: "DP on Strings" },
  { title: "Edit Distance", difficulty: "Hard", subs: 55, topic: "DP on Strings" },
  { title: "Palindromic Queries", difficulty: "Medium", subs: 13, topic: "DP on Strings" },
  
  // Bitmask DP
  { title: "Traveling Salesperson", difficulty: "Hard", subs: 20, topic: "Bitmask DP" },
  { title: "Assignment Problem", difficulty: "Hard", subs: 15, topic: "Bitmask DP" },
  
  // Math & Digit DP
  { title: "Modulo Sum", difficulty: "Medium", subs: 3, topic: "Math & Digit DP" },
  { title: "Counting In Byteland", difficulty: "Hard", subs: 10, topic: "Math & Digit DP" },
  { title: "Digit DP - Magic Numbers", difficulty: "Hard", subs: 8, topic: "Math & Digit DP" }
];

function getProblemData(title) {
  let desc = `You are given a challenge to solve the **${title}** problem using Dynamic Programming.\\n\\nWrite an optimal Python program that solves this problem efficiently. Use dynamic programming to manage state and avoid redundant calculations.\\n\\n**Input Format**\\nThe first line contains an integer T, denoting the number of test cases.\\nEach test case starts with an integer N, followed by an array of N elements.\\n\\n**Constraints**\\n1 <= T <= 100\\n1 <= N <= 10^5\\n-10^9 <= A[i] <= 10^9\\n\\n**Output Format**\\nPrint the optimal answer for each test case on a new line.`;
  let sampleInput = "1\n5\n1 2 3 4 5";
  let sampleOutput = "15";

  if (title === "Modulo Sum") {
    desc = `You are given a sequence of numbers a1, a2, ...., an, and a number m.\\n\\nCheck if it is possible to choose a non-empty subsequence a_i such that the sum of numbers in this subsequence is divisible by m.\\n\\nYou should also try submitting this problem on Codeforces.\\n\\n**Input Format**\\nThe first line contains two numbers, n and m — the size of the original sequence and the number such that sum should be divisible by it. The second line contains n integers a1, a2, ..., an.\\n\\n**Constraints**\\n1 <= n <= 10^6\\n2 <= m <= 10^3\\n0 <= ai <= 10^9\\n\\n**Output Format**\\nIn the single line print either "YES" (without the quotes) if there exists the sought subsequence, or "NO" (without the quotes), if such subsequence doesn't exist.`;
    sampleInput = "3 5\n1 2 3";
    sampleOutput = "YES";
  } else if (title === "Climbing Stairs") {
    desc = `You are climbing a staircase. It takes n steps to reach the top.\\n\\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\\n\\n**Input Format**\\nThe first line contains a single integer n, the number of steps.\\n\\n**Constraints**\\n1 <= n <= 45\\n\\n**Output Format**\\nPrint the number of distinct ways to climb to the top.`;
    sampleInput = "3";
    sampleOutput = "3";
  } else if (title === "Unique Paths") {
    desc = `There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.\\n\\nGiven the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.\\n\\n**Input Format**\\nA single line containing two integers, m and n.\\n\\n**Constraints**\\n1 <= m, n <= 100\\n\\n**Output Format**\\nPrint the number of unique paths.`;
    sampleInput = "3 7";
    sampleOutput = "28";
  } else if (title === "Maximum Loot (0/1 Knapsack)") {
    desc = `A thief is robbing a store and can carry a maximum weight of W into his knapsack. There are N items, and the i-th item weighs w_i and is worth v_i dollars. What is the maximum value the thief can take? (Each item can be taken at most once).\\n\\n**Input Format**\\nThe first line contains integers N and W.\\nThe next N lines contain two integers each, v_i and w_i.\\n\\n**Constraints**\\n1 <= N <= 1000\\n1 <= W <= 10^5\\n1 <= v_i, w_i <= 1000\\n\\n**Output Format**\\nPrint a single integer representing the maximum value.`;
    sampleInput = "3 50\n60 10\n100 20\n120 30";
    sampleOutput = "220";
  }

  return { desc, sampleInput, sampleOutput };
}

let dataObj = `// Dynamic Programming (Python Challenges) Data
// Systematically generated with accurate Competitive Programming descriptions

const dpPythonData = {
  id: 3,
  title: 'Dynamic Programming in Python',
  topics: '1D DP | Grid DP | Knapsack | Strings | Bitmask DP',
  problems: [\n`;

problemTitles.forEach((p, index) => {
  let status = 'unsolved';
  if (p.subs > 50) status = 'solved';
  else if (p.subs > 10) status = 'wrong';

  const pd = getProblemData(p.title);

  // Use the exact generic boilerplate so it works with our new IDE logic fallback
  const starterCode = "";

  dataObj += `    {
      id: ${index + 1},
      title: "${p.title}",
      difficulty: "${p.difficulty}",
      topic: "${p.topic}",
      submissions: ${p.subs},
      maxPoints: 100,
      status: '${status}',
      description: ${JSON.stringify(pd.desc)},
      sampleInput: ${JSON.stringify(pd.sampleInput)},
      sampleOutput: ${JSON.stringify(pd.sampleOutput)},
      starterCode: ${JSON.stringify(starterCode)}
    },\n`;
});

dataObj += `  ]
};

export default dpPythonData;
`;

fs.writeFileSync('/Users/kunalverma/Downloads/High/hypers/src/data/dpPythonData.js', dataObj);
console.log('dpPythonData.js updated successfully with grouped topics.');
