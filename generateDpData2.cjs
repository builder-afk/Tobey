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

let dataObj = `// Dynamic Programming (Python Challenges) Data
const dpPythonData = {
  id: 3,
  title: 'Dynamic Programming in Python',
  topics: 'Knapsack | DP on Strings | Bitmask DP | Subarrays | Matrix DP',
  problems: [\n`;

problemTitles.forEach((p, index) => {
  let status = 'unsolved';
  if (p.subs > 5) status = 'solved';
  else if (p.subs > 1) status = 'wrong';

  const desc = `You are given a challenge to solve the **${p.title}** problem using Dynamic Programming. 

Write a Python program that optimally solves this problem. Consider edge cases and optimize your space and time complexity.

**Input Format:**
The first line contains an integer T, denoting the number of test cases.
Each test case contains integers representing the constraints of the problem.

**Output Format:**
Print the optimal answer for each test case on a new line.

**Constraints:**
1 <= T <= 100
1 <= N <= 1000`;

  const starterCode = `def solve():
    # Write your Dynamic Programming solution here
    pass

if __name__ == '__main__':
    t = int(input())
    for _ in range(t):
        solve()`;

  dataObj += `    {
      id: ${index + 1},
      title: "${p.title}",
      difficulty: "${p.difficulty}",
      submissions: ${p.subs},
      maxPoints: 100,
      status: '${status}',
      description: ${JSON.stringify(desc)},
      sampleInput: "2\\n5\\n1 2 3 4 5",
      sampleOutput: "15\\n10",
      starterCode: ${JSON.stringify(starterCode)}
    },\n`;
});

dataObj += `  ]
};

export default dpPythonData;
`;

fs.writeFileSync('/Users/kunalverma/Downloads/High/hypers/src/data/dpPythonData.js', dataObj);
console.log('dpPythonData.js updated successfully with coding challenge data.');
