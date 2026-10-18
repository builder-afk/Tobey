const fs = require('fs');
const path = require('path');

const problems = [
  { id: 1, leetcodeId: 1, title: 'Two Sum', difficulty: 'Easy', tag: 'Array, Hash', xp: 50 },
  { id: 2, leetcodeId: 20, title: 'Valid Parentheses', difficulty: 'Easy', tag: 'Stack, String', xp: 50 },
  { id: 3, leetcodeId: 21, title: 'Merge Two Sorted Lists', difficulty: 'Easy', tag: 'Linked List', xp: 50 },
  { id: 4, leetcodeId: 70, title: 'Climbing Stairs', difficulty: 'Easy', tag: 'Dynamic Prog.', xp: 50 },
  { id: 5, leetcodeId: 101, title: 'Symmetric Tree', difficulty: 'Easy', tag: 'Tree', xp: 50 },
  { id: 6, leetcodeId: 104, title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', tag: 'Tree', xp: 50 },
  { id: 7, leetcodeId: 125, title: 'Valid Palindrome', difficulty: 'Easy', tag: 'String, Two Pointers', xp: 50 },
  { id: 8, leetcodeId: 136, title: 'Single Number', difficulty: 'Easy', tag: 'Bit Manipulation, Array', xp: 50 },
  { id: 9, leetcodeId: 141, title: 'Linked List Cycle', difficulty: 'Easy', tag: 'Linked List', xp: 50 },
  { id: 10, leetcodeId: 169, title: 'Majority Element', difficulty: 'Easy', tag: 'Array', xp: 50 },
  { id: 11, leetcodeId: 206, title: 'Reverse Linked List', difficulty: 'Easy', tag: 'Linked List', xp: 50 },
  { id: 12, leetcodeId: 217, title: 'Contains Duplicate', difficulty: 'Easy', tag: 'Hash Table', xp: 50 },
  { id: 13, leetcodeId: 235, title: 'Lowest Common Ancestor of a BST', difficulty: 'Easy', tag: 'Tree', xp: 50 },
  { id: 14, leetcodeId: 242, title: 'Valid Anagram', difficulty: 'Easy', tag: 'Hash Table', xp: 50 },
  { id: 15, leetcodeId: 392, title: 'Is Subsequence', difficulty: 'Easy', tag: 'String, Two Pointers', xp: 50 },
  { id: 16, leetcodeId: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', tag: 'String, Sliding Window', xp: 100 },
  { id: 17, leetcodeId: 11, title: 'Container With Most Water', difficulty: 'Medium', tag: 'Array, Two Pointers', xp: 100 },
  { id: 18, leetcodeId: 15, title: '3Sum', difficulty: 'Medium', tag: 'Array, Two Pointers', xp: 100 },
  { id: 19, leetcodeId: 33, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', tag: 'Array, Binary Search', xp: 100 },
  { id: 20, leetcodeId: 39, title: 'Combination Sum', difficulty: 'Medium', tag: 'Backtracking', xp: 100 },
  { id: 21, leetcodeId: 49, title: 'Group Anagrams', difficulty: 'Medium', tag: 'Hash Table', xp: 100 },
  { id: 22, leetcodeId: 54, title: 'Spiral Matrix', difficulty: 'Medium', tag: 'Array, Simulation', xp: 100 },
  { id: 23, leetcodeId: 55, title: 'Jump Game', difficulty: 'Medium', tag: 'Dynamic Prog.', xp: 100 },
  { id: 24, leetcodeId: 56, title: 'Merge Intervals', difficulty: 'Medium', tag: 'Array, Sorting', xp: 100 },
  { id: 25, leetcodeId: 75, title: 'Sort Colors', difficulty: 'Medium', tag: 'Array, Two Pointers', xp: 100 },
  { id: 26, leetcodeId: 98, title: 'Validate Binary Search Tree', difficulty: 'Medium', tag: 'Tree', xp: 100 },
  { id: 27, leetcodeId: 133, title: 'Clone Graph', difficulty: 'Medium', tag: 'Graph', xp: 100 },
  { id: 28, leetcodeId: 153, title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', tag: 'Array, Binary Search', xp: 100 },
  { id: 29, leetcodeId: 198, title: 'House Robber', difficulty: 'Medium', tag: 'Dynamic Prog.', xp: 100 },
  { id: 30, leetcodeId: 200, title: 'Number of Islands', difficulty: 'Medium', tag: 'Graph (DFS/BFS)', xp: 100 },
  { id: 31, leetcodeId: 207, title: 'Course Schedule', difficulty: 'Medium', tag: 'Graph (Topo)', xp: 100 },
  { id: 32, leetcodeId: 215, title: 'Find Kth Largest Element in an Array', difficulty: 'Medium', tag: 'Heap', xp: 100 },
  { id: 33, leetcodeId: 238, title: 'Product of Array Except Self', difficulty: 'Medium', tag: 'Array, Prefix Sum', xp: 100 },
  { id: 34, leetcodeId: 295, title: 'Find Median from Data Stream', difficulty: 'Hard', tag: 'Heap, Design', xp: 200 },
  { id: 35, leetcodeId: 42, title: 'Trapping Rain Water', difficulty: 'Hard', tag: 'Array, Two Pointers', xp: 200 },
  { id: 36, leetcodeId: 72, title: 'Edit Distance', difficulty: 'Hard', tag: 'Dynamic Prog.', xp: 200 },
  { id: 37, leetcodeId: 84, title: 'Largest Rectangle in Histogram', difficulty: 'Hard', tag: 'Stack', xp: 200 },
  { id: 38, leetcodeId: 76, title: 'Minimum Window Substring', difficulty: 'Hard', tag: 'String, Sliding Window', xp: 200 },
  { id: 39, leetcodeId: 124, title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', tag: 'Tree, DFS', xp: 200 },
  { id: 40, leetcodeId: 135, title: 'Candy', difficulty: 'Hard', tag: 'Greedy, DP', xp: 200 },
  { id: 41, leetcodeId: 269, title: 'Alien Dictionary', difficulty: 'Hard', tag: 'Graph, Topological', xp: 200 },
  { id: 42, leetcodeId: 297, title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', tag: 'Tree, DFS', xp: 200 },
  { id: 43, leetcodeId: 312, title: 'Burst Balloons', difficulty: 'Hard', tag: 'Dynamic Prog.', xp: 200 },
  { id: 44, leetcodeId: 10, title: 'Regular Expression Matching', difficulty: 'Hard', tag: 'Dynamic Prog.', xp: 200 },
  { id: 45, leetcodeId: 32, title: 'Longest Valid Parentheses', difficulty: 'Hard', tag: 'Stack, DP', xp: 200 },
  { id: 46, leetcodeId: 41, title: 'First Missing Positive', difficulty: 'Hard', tag: 'Array, Hash', xp: 200 },
  { id: 47, leetcodeId: 51, title: 'N-Queens', difficulty: 'Hard', tag: 'Backtracking', xp: 200 },
  { id: 48, leetcodeId: 23, title: 'Merge k Sorted Lists', difficulty: 'Hard', tag: 'Heap, Linked List', xp: 200 },
  { id: 49, leetcodeId: 127, title: 'Word Ladder', difficulty: 'Hard', tag: 'Graph, BFS', xp: 200 },
  { id: 50, leetcodeId: 146, title: 'LRU Cache', difficulty: 'Hard', tag: 'Design, Hash Table', xp: 200 },
];

const leetcodeData = problems.map((p) => {
  return {
    ...p,
    description: `**LeetCode ${p.leetcodeId} - ${p.title}**\n\nSolve the problem according to standard LeetCode rules. Ensure optimal time and space complexity.\n\n**Constraints:**\n- Try to solve in optimal Big-O notation.`,
    starterCode: `def solve():\n    # Write your solution for ${p.title} here\n    pass`,
    sampleInput: '...',
    sampleOutput: '...'
  }
});

const fileContent = `// Auto-generated by generateLeetcodeData.cjs
export const leetcodeData = ${JSON.stringify(leetcodeData, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'src/data/leetcodeData.js'), fileContent);
console.log('Successfully generated src/data/leetcodeData.js with 50 problems!');
