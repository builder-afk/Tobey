import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Terminal, 
  Play, 
  Send, 
  CheckCircle2, 
  XSquare, 
  Loader2,
  FileText,
  Settings,
  Maximize2,
  Tag,
  Lightbulb,
  BookOpen,
  Copy,
  Check,
  RotateCcw,
  ChevronDown,
  Zap,
  Clock,
  Cpu,
  GripVertical,
  Bug
} from 'lucide-react';
import { problemsDataMap } from '../data/ideProblems';

// ─── Full Problem Database ────────────────────────────────────────────────────
const problemsData = {
  1: {
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'Arrays',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.`,
    constraints: [
      '2 <= nums.length <= 10⁴',
      '-10⁹ <= nums[i] <= 10⁹',
      '-10⁹ <= target <= 10⁹',
      'Only one valid answer exists.'
    ],
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' }
    ],
    hints: ['Try using a hash map to store complements as you iterate.', 'For each element, check if target - element already exists in the map.'],
    boilerplates: {
      JavaScript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    // Write your code here\n    \n};`,
      Python: `def two_sum(nums, target):\n    # Write your code here\n    pass`,
      'C++': `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n        \n    }\n};`,
      Java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        \n    }\n}`
    },
    buggyBoilerplates: {
      JavaScript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    let map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        let complement = target - nums[i];\n        if (map.has(complement)) {\n            // BUG: Returning nums[i] instead of complement index\n            return [map.get(nums[i]), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n};`
    },
    testCases: [
      { input: { nums: [2,7,11,15], target: 9 }, expected: [0,1] },
      { input: { nums: [3,2,4], target: 6 }, expected: [1,2] },
      { input: { nums: [3,3], target: 6 }, expected: [0,1] }
    ],
    jsFunc: 'twoSum'
  },
  2: {
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    topic: 'Linked List',
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    constraints: [
      'The number of nodes in each linked list is in the range [1, 100].',
      '0 <= Node.val <= 9',
      'It is guaranteed that the list represents a number that does not have leading zeros.'
    ],
    examples: [
      { input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8]', explanation: '342 + 465 = 807.' },
      { input: 'l1 = [0], l2 = [0]', output: '[0]' },
      { input: 'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]', output: '[8,9,9,9,0,0,0,1]' }
    ],
    hints: ['Traverse both lists simultaneously, keeping track of a carry value.', 'Use modulo (% 10) and integer division (/ 10) to compute digit and carry.'],
    boilerplates: {
      JavaScript: `/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} l1\n * @param {ListNode} l2\n * @return {ListNode}\n */\nfunction addTwoNumbers(l1, l2) {\n    // Write your code here\n    \n};`,
      Python: `# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def addTwoNumbers(self, l1, l2):\n        # Write your code here\n        pass`,
      'C++': `/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        // Write your code here\n        \n    }\n};`,
      Java: `/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n * }\n */\nclass Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        // Write your code here\n        \n    }\n}`
    },
    testCases: [],
    jsFunc: 'addTwoNumbers',
    heuristics: { keywords: ['while', '% 10', 'carry', 'next'], minExtra: 30 }
  },
  3: {
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topic: 'Strings',
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.

A substring is a contiguous non-empty sequence of characters within a string.`,
    constraints: [
      '0 <= s.length <= 5 * 10⁴',
      's consists of English letters, digits, symbols and spaces.'
    ],
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3.' }
    ],
    hints: ['Use the sliding window technique with two pointers.', 'Maintain a Set or Map to track characters in the current window.'],
    boilerplates: {
      JavaScript: `/**\n * @param {string} s\n * @return {number}\n */\nfunction lengthOfLongestSubstring(s) {\n    // Write your code here\n    \n};`,
      Python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Write your code here\n        pass`,
      'C++': `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your code here\n        \n    }\n};`,
      Java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your code here\n        \n    }\n}`
    },
    testCases: [],
    jsFunc: 'lengthOfLongestSubstring',
    heuristics: { keywords: ['set', 'map', 'while', 'max', 'delete', 'has'], minExtra: 20 }
  },
  4: {
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    topic: 'Binary Search',
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
    constraints: [
      'nums1.length == m',
      'nums2.length == n',
      '0 <= m <= 1000',
      '0 <= n <= 1000',
      '1 <= m + n <= 2000',
      '-10⁶ <= nums1[i], nums2[i] <= 10⁶'
    ],
    examples: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000', explanation: 'Merged array = [1,2,3] and median is 2.' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.50000', explanation: 'Merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.' }
    ],
    hints: ['Use binary search on the smaller array.', 'Partition both arrays such that left halves have ⌊(m+n+1)/2⌋ elements total.'],
    boilerplates: {
      JavaScript: `/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nfunction findMedianSortedArrays(nums1, nums2) {\n    // Write your code here\n    \n};`,
      Python: `class Solution:\n    def findMedianSortedArrays(self, nums1, nums2):\n        # Write your code here\n        pass`,
      'C++': `class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        // Write your code here\n        \n    }\n};`,
      Java: `class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        // Write your code here\n        \n    }\n}`
    },
    testCases: [],
    jsFunc: 'findMedianSortedArrays',
    heuristics: { keywords: ['mid', 'low', 'high', 'binary', 'partition', 'return'], minExtra: 30 }
  },
  5: {
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    description: `Given a string \`s\`, return the longest palindromic substring in \`s\`.

A string is a palindrome when it reads the same backward as forward.`,
    constraints: [
      '1 <= s.length <= 1000',
      's consists of only digits and English letters.'
    ],
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' },
      { input: 's = "cbbd"', output: '"bb"' }
    ],
    hints: ['Expand around center for each character (and between characters for even-length palindromes).', 'Dynamic Programming: dp[i][j] is true if s[i..j] is a palindrome.'],
    boilerplates: {
      JavaScript: `/**\n * @param {string} s\n * @return {string}\n */\nfunction longestPalindrome(s) {\n    // Write your code here\n    \n};`,
      Python: `class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        # Write your code here\n        pass`,
      'C++': `class Solution {\npublic:\n    string longestPalindrome(string s) {\n        // Write your code here\n        \n    }\n};`,
      Java: `class Solution {\n    public String longestPalindrome(String s) {\n        // Write your code here\n        \n    }\n}`,
      Go: `func longestPalindrome(s string) string {\n    // Write your code here\n    \n}`
    },
    testCases: [],
    jsFunc: 'longestPalindrome',
    heuristics: { keywords: ['expand', 'while', 'return', 'substring', 'length'], minExtra: 25 }
  },
  6: {
    title: 'Merge Intervals',
    difficulty: 'Medium',
    topic: 'Arrays',
    description: `Given an array of \`intervals\` where intervals[i] = [startᵢ, endᵢ], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    constraints: [
      '1 <= intervals.length <= 10⁴',
      'intervals[i].length == 2',
      '0 <= startᵢ <= endᵢ <= 10⁴'
    ],
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]', explanation: 'Intervals [1,4] and [4,5] are considered overlapping.' }
    ],
    hints: ['Sort the intervals by their start time first.', 'Iterate and merge whenever the current interval overlaps with the last merged interval.'],
    boilerplates: {
      JavaScript: `/**\n * @param {number[][]} intervals\n * @return {number[][]}\n */\nfunction merge(intervals) {\n    // Write your code here\n    \n};`,
      Python: `class Solution:\n    def merge(self, intervals):\n        # Write your code here\n        pass`,
      'C++': `class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        // Write your code here\n        \n    }\n};`,
      Java: `class Solution {\n    public int[][] merge(int[][] intervals) {\n        // Write your code here\n        \n    }\n}`
    },
    testCases: [],
    jsFunc: 'merge',
    heuristics: { keywords: ['sort', 'push', 'merge', 'return', 'for'], minExtra: 20 }
  },
  7: {
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    topic: 'Two Pointers',
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10⁴',
      '0 <= height[i] <= 10⁵'
    ],
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: 'The above elevation map can trap 6 units of rain water.' },
      { input: 'height = [4,2,0,3,2,5]', output: '9' }
    ],
    hints: ['Two pointer approach: maintain left and right pointers and track leftMax and rightMax.', 'At each step, water at a position = min(leftMax, rightMax) - height[i].'],
    boilerplates: {
      JavaScript: `/**\n * @param {number[]} height\n * @return {number}\n */\nfunction trap(height) {\n    // Write your code here\n    \n};`,
      Python: `class Solution:\n    def trap(self, height):\n        # Write your code here\n        pass`,
      'C++': `class Solution {\npublic:\n    int trap(vector<int>& height) {\n        // Write your code here\n        \n    }\n};`,
      Java: `class Solution {\n    public int trap(int[] height) {\n        // Write your code here\n        \n    }\n}`
    },
    testCases: [],
    jsFunc: 'trap',
    heuristics: { keywords: ['left', 'right', 'max', 'while', 'return'], minExtra: 25 }
  },
  8: {
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    topic: 'Trees',
    description: `Given the \`root\` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).`,
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].',
      '-1000 <= Node.val <= 1000'
    ],
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
      { input: 'root = [1]', output: '[[1]]' },
      { input: 'root = []', output: '[]' }
    ],
    hints: ['Use a queue (BFS) to process nodes level by level.', 'Track the size of the queue at the start of each level to group nodes.'],
    boilerplates: {
      JavaScript: `/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number[][]}\n */\nfunction levelOrder(root) {\n    // Write your code here\n    \n};`,
      Python: `# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def levelOrder(self, root):\n        # Write your code here\n        pass`,
      'C++': `/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n * };\n */\nclass Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        // Write your code here\n        \n    }\n};`,
      Java: `/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n * }\n */\nclass Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        // Write your code here\n        \n    }\n}`
    },
    testCases: [],
    jsFunc: 'levelOrder',
    heuristics: { keywords: ['queue', 'push', 'shift', 'while', 'level', 'length'], minExtra: 25 }
  },
  9: { title: 'Word Search', difficulty: 'Medium', topic: 'Backtracking', description: 'Given an m x n grid of characters board and a string word, return true if word exists in the grid.', constraints: ['1 <= m, n <= 6', '1 <= word.length <= 15'], examples: [{ input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' }], hints: ['Use DFS/backtracking starting from each cell that matches the first letter.'], boilerplates: { JavaScript: '/**\n * @param {character[][]} board\n * @param {string} word\n * @return {boolean}\n */\nfunction exist(board, word) {\n    // Write your code here\n    \n};' }, testCases: [], jsFunc: 'exist', heuristics: { keywords: ['dfs', 'backtrack', 'return', 'board', 'visited', 'for'], minExtra: 30 } },
  10: { title: 'LRU Cache', difficulty: 'Medium', topic: 'Design', description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.', constraints: ['1 <= capacity <= 3000'], examples: [{ input: '["LRUCache","put","put","get","put","get"]\\n[[2],[1,1],[2,2],[1],[3,3],[2]]', output: '[null,null,null,1,null,-1]' }], hints: ['Use a Map (ordered by insertion) or a doubly linked list + hash map.'], boilerplates: { JavaScript: '/**\n * @param {number} capacity\n */\nvar LRUCache = function(capacity) {\n    \n};' }, testCases: [], jsFunc: 'LRUCache', heuristics: { keywords: ['map', 'get', 'put', 'delete', 'capacity', 'set'], minExtra: 30 } },
  11: { title: 'Alien Dictionary', difficulty: 'Hard', topic: 'Graphs', description: 'There is a new alien language. Derive the order of letters.', constraints: ['1 <= words.length <= 100'], examples: [{ input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"' }], hints: ['Build a directed graph and use topological sort.'], boilerplates: { JavaScript: 'function alienOrder(words) {\n    // Write your code here\n};' }, testCases: [], jsFunc: 'alienOrder', heuristics: { keywords: ['graph', 'topological', 'indegree', 'queue', 'map', 'for'], minExtra: 30 } },
  12: { title: 'Number of Islands', difficulty: 'Medium', topic: 'Graphs', description: 'Given an m x n 2D binary grid, return the number of islands.', constraints: ['1 <= m, n <= 300'], examples: [{ input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', output: '2' }], hints: ['Use DFS or BFS to explore connected land cells.'], boilerplates: { JavaScript: 'function numIslands(grid) {\n    // Write your code here\n};' }, testCases: [], jsFunc: 'numIslands', heuristics: { keywords: ['dfs', 'bfs', 'visited', 'grid', 'for', 'return', 'count'], minExtra: 25 } },
  13: { title: 'Climbing Stairs', difficulty: 'Easy', topic: 'Dynamic Programming', description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways?', constraints: ['1 <= n <= 45'], examples: [{ input: 'n = 2', output: '2' }, { input: 'n = 3', output: '3' }], hints: ['This is essentially the Fibonacci sequence.'], boilerplates: { JavaScript: 'function climbStairs(n) {\n    // Write your code here\n};' }, buggyBoilerplates: { JavaScript: 'function climbStairs(n) {\n    if (n <= 2) return n;\n    let a = 1, b = 2;\n    // BUG: Loop condition should be i <= n\n    for (let i = 3; i < n; i++) {\n        let temp = a + b;\n        a = b;\n        b = temp;\n    }\n    return b;\n};' }, testCases: [{ input: { n: 2 }, expected: 2 }, { input: { n: 3 }, expected: 3 }, { input: { n: 5 }, expected: 8 }], jsFunc: 'climbStairs' },
  14: { title: 'Valid Parentheses', difficulty: 'Easy', topic: 'Stacks', description: 'Given a string s containing just the characters (){}[], determine if the input string is valid.', constraints: ['1 <= s.length <= 10⁴'], examples: [{ input: 's = "()"', output: 'true' }, { input: 's = "(]"', output: 'false' }], hints: ['Use a stack to push opening brackets.'], boilerplates: { JavaScript: 'function isValid(s) {\n    // Write your code here\n};' }, buggyBoilerplates: { JavaScript: 'function isValid(s) {\n    let stack = [];\n    const map = {\n        ")": "(",\n        "}": "{",\n        "]": "["\n    };\n    for (let char of s) {\n        if (map[char]) {\n            if (stack.length === 0 || stack.pop() !== map[char]) {\n                return false;\n            }\n        } else {\n            stack.push(char);\n        }\n    }\n    // BUG: Needs to check if stack is empty\n    return true;\n};' }, testCases: [{ input: { s: "()" }, expected: true }, { input: { s: "(]" }, expected: false }, { input: { s: "{[]}" }, expected: true }], jsFunc: 'isValid' },
  15: { title: 'Merge k Sorted Lists', difficulty: 'Hard', topic: 'Linked List', description: 'Merge all k sorted linked-lists into one sorted linked-list.', constraints: ['0 <= k <= 10⁴'], examples: [{ input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' }], hints: ['Use a min-heap / priority queue.'], boilerplates: { JavaScript: 'function mergeKLists(lists) {\n    // Write your code here\n};' }, testCases: [], jsFunc: 'mergeKLists', heuristics: { keywords: ['merge', 'heap', 'priority', 'while', 'next', 'return', 'min'], minExtra: 25 } }
};

const defaultBoilerplate = `// Select a problem from the list to start coding\nfunction solve() {\n  console.log("Hello, World!");\n}`;

// ─── Mock Evaluator ──────────────────────────────────────────────────────────
function evaluateCode(problem, code, language) {
  const c = code.toLowerCase();
  const boilerplate = problem.boilerplates[language] || '';
  
  if (code.trim() === '' || code === boilerplate || c.includes('// write your code here') && code.length < boilerplate.length + 15) {
    return {
      status: 'Error',
      message: 'Wrong Answer',
      details: 'Please complete the implementation before running.',
      runtime: 'N/A',
      memory: 'N/A',
      testResults: []
    };
  }

  if (language === 'JavaScript' && problem.testCases && problem.testCases.length > 0) {
    try {
      let funcName = problem.jsFunc;
      let execCode = code;
      
      if (problem.title.includes('Linked List') || problem.title.includes('Two Numbers') || problem.title.includes('Merge k')) {
        execCode = "function ListNode(val, next) { this.val = (val===undefined ? 0 : val); this.next = (next===undefined ? null : next); }\n" + execCode;
      }
      if (problem.title.includes('Tree')) {
        execCode = "function TreeNode(val, left, right) { this.val = (val===undefined ? 0 : val); this.left = (left===undefined ? null : left); this.right = (right===undefined ? null : right); }\n" + execCode;
      }
      
      const userFunc = new Function(execCode + "\nreturn typeof " + funcName + " !== 'undefined' ? " + funcName + " : null;")();
      
      if (!userFunc) {
        return {
          status: 'Error', message: 'Compilation Error',
          details: `Function "${funcName}" is not defined.`,
          runtime: 'N/A', memory: 'N/A', testResults: []
        };
      }
      
      let testResults = [];
      let allPassed = true;
      
      for (const tc of problem.testCases) {
        const args = Object.values(tc.input);
        let result;
        try {
          result = userFunc(...args);
        } catch (err) {
          testResults.push({ passed: false, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), got: err.toString() });
          allPassed = false;
          continue;
        }
        
        const passed = JSON.stringify(result) === JSON.stringify(tc.expected) || String(result) === String(tc.expected);
        testResults.push({ passed, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), got: JSON.stringify(result) });
        if (!passed) allPassed = false;
      }
      
      const rt = Math.floor(Math.random() * 20 + 30) + ' ms';
      const mem = (Math.random() * 5 + 15).toFixed(1) + ' MB';
      
      return {
        status: allPassed ? 'Success' : 'Error',
        message: allPassed ? 'Accepted' : 'Wrong Answer',
        details: allPassed ? 'All test cases passed!' : `Failed on ${testResults.filter(t => !t.passed).length}/${testResults.length} test cases.`,
        runtime: allPassed ? rt : 'N/A',
        memory: allPassed ? mem : 'N/A',
        testResults
      };
    } catch (e) {
      return { status: 'Error', message: 'Runtime Error', details: e.toString(), runtime: 'N/A', memory: 'N/A', testResults: [] };
    }
  }
  
  const h = problem.heuristics || {};
  const keywords = h.keywords || [];
  const minExtra = h.minExtra || 20;
  
  let matchedKeywords = keywords.filter(kw => c.includes(kw));
  let requiredHits = Math.ceil(keywords.length * 0.5);
  const hasEnoughCode = code.length > boilerplate.length + minExtra;
  const hasReturn = c.includes('return');
  
  let allPassed = false;
  let details = '';
  let testResults = [];
  
  if (matchedKeywords.length >= requiredHits && hasEnoughCode && hasReturn) {
    allPassed = true;
    testResults = problem.examples.map((ex) => ({ passed: true, input: ex.input, expected: ex.output, got: ex.output }));
    details = 'All test cases passed!';
  } else {
    const missingKeywords = keywords.filter(kw => !c.includes(kw));
    if (!hasEnoughCode) {
      details = 'Your solution appears incomplete. Please add more logic to solve the problem.';
    } else if (missingKeywords.length > 0) {
      details = `Logic Error: Your solution is missing key patterns. Consider using: ${missingKeywords.slice(0, 3).join(', ')}.`;
    } else if (!hasReturn) {
      details = 'Your solution does not appear to return a value. Make sure to return the result.';
    } else {
      details = 'Your solution does not pass all test cases.';
    }
    
    testResults = problem.examples.map((ex, i) => ({
      passed: i === 0 && matchedKeywords.length > 0,
      input: ex.input,
      expected: ex.output,
      got: i === 0 && matchedKeywords.length > 0 ? ex.output : 'Incorrect'
    }));
  }
  
  if (allPassed) {
    const rt = Math.floor(Math.random() * 8 + 3) + ' ms';
    const mem = language === 'Python' ? (Math.random() * 2 + 13).toFixed(1) + ' MB' :
               language === 'Java' ? (Math.random() * 3 + 38).toFixed(1) + ' MB' :
               (Math.random() * 1 + 6).toFixed(1) + ' MB';
    return { status: 'Success', message: 'Accepted', details, runtime: rt, memory: mem, testResults };
  } else {
    return { status: 'Error', message: 'Wrong Answer', details, runtime: 'N/A', memory: 'N/A', testResults };
  }
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function IDEWorkspace() {
  const { id } = useParams();
  const problem = problemsData[id] || problemsDataMap[id] || {
    title: 'Unknown Problem',
    difficulty: 'Unknown',
    topic: 'General',
    description: 'Problem description not found. Practice freely in this sandbox.',
    examples: [],
    constraints: [],
    hints: [],
    boilerplates: { JavaScript: defaultBoilerplate },
    testCases: []
  };

  const location = useLocation();
  const isBugFixingMode = location.state?.mode === 'Bug Fixing';
  const isDebuggingBattles = location.state?.mode === 'Debugging Battles';
  
  const getInitialCode = (lang) => {
    if (isBugFixingMode && problem.buggyBoilerplates && problem.buggyBoilerplates[lang]) {
      return problem.buggyBoilerplates[lang];
    }
    return problem.boilerplates[lang] || defaultBoilerplate;
  };

  const availableLanguages = Object.keys(problem.boilerplates || { JavaScript: '' });
  const [language, setLanguage] = useState(availableLanguages[0] || 'JavaScript');
  const [code, setCode] = useState(getInitialCode(language));
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState(null);
  const [activeTab, setActiveTab] = useState('Description');
  const [showHints, setShowHints] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCode(getInitialCode(language));
    setTerminalOutput(null);
  }, [language]);

  useEffect(() => {
    const langs = Object.keys(problem.boilerplates || {});
    const defaultLang = langs[0] || 'JavaScript';
    setLanguage(defaultLang);
    setCode(getInitialCode(defaultLang));
    setTerminalOutput(null);
    setActiveTab('Description');
    setShowHints(false);
  }, [id, isBugFixingMode]);

  const handleRunCode = () => {
    setIsRunning(true);
    setTerminalOutput(null);
    setActiveTab('Console');

    setTimeout(() => {
      const result = evaluateCode(problem, code, language);
      setTerminalOutput(result);
      setIsRunning(false);
    }, 1200 + Math.random() * 800);
  };

  const handleSubmit = () => {
    handleRunCode();
  };

  const handleResetCode = () => {
    setCode(problem.boilerplates[language] || defaultBoilerplate);
    setTerminalOutput(null);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Easy': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Hard': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getDifficultyDot = (diff) => {
    switch(diff) {
      case 'Easy': return 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]';
      case 'Medium': return 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]';
      case 'Hard': return 'bg-rose-400 shadow-[0_0_6px_rgba(251,113,133,0.6)]';
      default: return 'bg-gray-500';
    }
  };

  const monacoLang = language.toLowerCase() === 'c++' ? 'cpp' : language.toLowerCase();

  return (
    <div className="flex h-screen flex-col bg-[#FAF8F5] font-sans overflow-hidden">
      
      {/* ─── Top Navbar ─── */}
      <div className="h-14 border-b-4 border-black bg-white flex items-center justify-between px-4 shrink-0 shadow-[0_3px_0px_#000] z-20">
        <div className="flex items-center gap-3">
          <Link 
            to={isBugFixingMode || location.state?.mode ? "/royale" : "/ide"} 
            className="bg-[#FAF8F5] hover:bg-[#FFDE59] border-2 border-black px-2.5 py-1 text-black font-mono font-black text-xs uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            <span>{isBugFixingMode || location.state?.mode ? "Royale" : "Problems"}</span>
          </Link>
          <div className="h-5 w-[2px] bg-black" />
          <div className="flex items-center gap-2">
            <span className="bg-black text-[#00F0FF] font-mono text-xs font-black px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
              #{id}
            </span>
            <h1 className="text-black font-mono font-black text-sm uppercase tracking-tight truncate max-w-[200px] sm:max-w-md">
              {problem.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 border-2 border-black font-mono text-[10px] font-black uppercase shadow-[2px_2px_0px_#000] ${
              problem.difficulty === 'Easy' ? 'bg-[#CCFF00] text-black' :
              problem.difficulty === 'Medium' ? 'bg-[#FFDE59] text-black' :
              'bg-[#FF0033] text-white'
            }`}>
              {problem.difficulty}
            </span>
            {isBugFixingMode && (
              <span className="px-2 py-0.5 bg-[#FF52D9] text-black border-2 border-black font-mono text-[10px] font-black uppercase flex items-center gap-1 shadow-[2px_2px_0px_#000]">
                <Bug size={11} strokeWidth={2.5} /> Bug Fixing
              </span>
            )}
            {isDebuggingBattles && (
              <span className="px-2 py-0.5 bg-[#9945FF] text-white border-2 border-black font-mono text-[10px] font-black uppercase flex items-center gap-1 shadow-[2px_2px_0px_#000]">
                <Zap size={11} strokeWidth={2.5} /> Battles
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 bg-[#CCFF00] hover:bg-[#b8f000] text-black border-3 border-black px-4 py-1.5 font-mono text-xs font-black uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-40"
          >
            {isRunning ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} strokeWidth={2.5} className="fill-black" />}
            <span>RUN</span>
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isRunning}
            className="flex items-center gap-1.5 bg-[#00F0FF] hover:bg-[#00d0e0] text-black border-3 border-black px-4 py-1.5 font-mono text-xs font-black uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-40"
          >
            <Send size={13} strokeWidth={2.5} />
            <span>SUBMIT</span>
          </button>
        </div>
      </div>

      {/* ─── Main Workspace Split ─── */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* ═══ Left Panel: Description / Console ═══ */}
        <div className="w-[44%] min-w-[360px] border-r-4 border-black bg-[#FAF8F5] flex flex-col h-full z-10">
          {/* Tab Switcher */}
          <div className="flex h-12 items-center px-4 shrink-0 gap-2 bg-white border-b-3 border-black">
            {['Description', 'Console'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 text-xs font-mono font-black uppercase border-2 border-black transition-all flex items-center gap-2 ${
                  activeTab === tab 
                    ? 'bg-[#FFDE59] text-black shadow-[3px_3px_0px_#000] translate-x-0.5' 
                    : 'bg-white text-neutral-700 hover:bg-[#FAF8F5] hover:text-black shadow-[1px_1px_0px_#000]'
                }`}
              >
                {tab === 'Description' ? <FileText size={13} strokeWidth={2.5} /> : <Terminal size={13} strokeWidth={2.5} />}
                <span>{tab}</span>
                {tab === 'Console' && terminalOutput && (
                  <span className={`w-2.5 h-2.5 border border-black rounded-full ${terminalOutput.status === 'Success' ? 'bg-[#CCFF00]' : 'bg-[#FF0033]'}`} />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {activeTab === 'Description' ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] font-black uppercase bg-black text-[#CCFF00] px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                      PROBLEM #{id}
                    </span>
                    <span className="font-mono text-[10px] font-black uppercase bg-white border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                      TOPIC: {problem.topic}
                    </span>
                  </div>
                  <h2 className="text-2xl font-mono font-black uppercase text-black tracking-tight mb-2">
                    {problem.title}
                  </h2>
                </div>

                {/* Description card */}
                <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000]">
                  <div className="font-mono text-xs sm:text-sm text-neutral-900 font-bold leading-relaxed whitespace-pre-wrap">
                    {problem.description}
                  </div>
                </div>

                {/* Examples */}
                {problem.examples && problem.examples.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-mono font-black text-sm uppercase text-black flex items-center gap-2">
                      <BookOpen size={16} strokeWidth={2.5} className="text-black" />
                      <span>TEST EXAMPLES</span>
                    </h3>
                    {problem.examples.map((ex, idx) => (
                      <div key={idx} className="bg-white border-3 border-black shadow-[4px_4px_0px_#000] p-4 font-mono text-xs">
                        <div className="inline-block bg-[#FFDE59] border-2 border-black text-black font-black text-[10px] uppercase px-2 py-0.5 mb-3 shadow-[2px_2px_0px_#000]">
                          EXAMPLE {idx + 1}
                        </div>
                        <div className="bg-[#FAF8F5] border-2 border-black p-2.5 mb-2 font-mono">
                          <span className="text-neutral-500 font-black uppercase text-[10px] block mb-1">INPUT:</span>
                          <span className="text-black font-bold">{ex.input}</span>
                        </div>
                        <div className="bg-[#FAF8F5] border-2 border-black p-2.5 mb-2 font-mono">
                          <span className="text-neutral-500 font-black uppercase text-[10px] block mb-1">OUTPUT:</span>
                          <span className="text-black font-black">{ex.output}</span>
                        </div>
                        {ex.explanation && (
                          <div className="bg-[#FAF8F5] border-2 border-black p-2.5 text-neutral-800 text-[11px] font-bold">
                            <span className="text-black font-black uppercase">💡 EXPLANATION: </span>
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Constraints */}
                {problem.constraints && problem.constraints.length > 0 && (
                  <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000]">
                    <h3 className="font-mono font-black text-sm uppercase text-black mb-3">
                      CONSTRAINTS
                    </h3>
                    <ul className="space-y-2">
                      {problem.constraints.map((c, idx) => (
                        <li key={idx} className="font-mono text-xs font-bold text-neutral-800 flex items-start gap-2">
                          <span className="w-2 h-2 bg-black mt-1 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Hints */}
                {problem.hints && problem.hints.length > 0 && (
                  <div>
                    <button 
                      onClick={() => setShowHints(!showHints)}
                      className="flex items-center gap-2 font-mono text-xs font-black uppercase bg-[#FFDE59] hover:bg-[#CCFF00] border-2 border-black text-black px-3.5 py-2 shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                    >
                      <Lightbulb size={14} strokeWidth={2.5} />
                      <span>{showHints ? 'HIDE HINTS' : `SHOW HINTS (${problem.hints.length})`}</span>
                    </button>
                    <AnimatePresence>
                      {showHints && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }} 
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 space-y-2 overflow-hidden"
                        >
                          {problem.hints.map((hint, idx) => (
                            <div key={idx} className="bg-white border-2 border-black p-3.5 font-mono text-xs text-neutral-800 font-bold shadow-[2px_2px_0px_#000]">
                              <span className="bg-[#FFDE59] border border-black px-1.5 py-0.5 font-black uppercase text-[10px] mr-2">HINT {idx + 1}</span>
                              {hint}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            ) : (
              /* Console Tab */
              <div className="h-full flex flex-col font-mono text-sm">
                {!terminalOutput && !isRunning && (
                  <div className="flex-1 flex flex-col items-center justify-center text-neutral-500 gap-3 py-16">
                    <div className="w-16 h-16 bg-white border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center text-black">
                      <Terminal size={28} strokeWidth={2.5} />
                    </div>
                    <p className="font-mono text-xs font-black uppercase tracking-wider text-black">Run your code to evaluate testcases</p>
                  </div>
                )}
                
                {isRunning && (
                  <div className="flex-1 flex flex-col items-center justify-center text-black gap-3 py-16">
                    <div className="w-16 h-16 bg-[#00F0FF] border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center">
                      <Loader2 size={28} className="animate-spin text-black" strokeWidth={2.5} />
                    </div>
                    <p className="animate-pulse font-mono text-xs font-black uppercase tracking-widest text-black">EVALUATING TEST PROTOCOL...</p>
                  </div>
                )}

                {terminalOutput && !isRunning && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Status Header */}
                    <div className={`p-5 border-4 border-black shadow-[5px_5px_0px_#000] flex items-center gap-4 ${
                      terminalOutput.status === 'Success' 
                        ? 'bg-[#CCFF00] text-black' 
                        : 'bg-[#FF0033] text-white'
                    }`}>
                      {terminalOutput.status === 'Success' 
                        ? <CheckCircle2 size={28} strokeWidth={3} className="shrink-0 text-black" /> 
                        : <XSquare size={28} strokeWidth={3} className="shrink-0 text-white" />}
                      <div>
                        <h3 className="text-xl font-mono font-black uppercase tracking-tight">
                          {terminalOutput.message}
                        </h3>
                        <p className="text-xs font-mono font-bold mt-1 opacity-90">{terminalOutput.details}</p>
                      </div>
                    </div>

                    {/* Test Cases */}
                    {terminalOutput.testResults && terminalOutput.testResults.length > 0 && (
                      <div className="space-y-3">
                        <div className="text-xs font-mono font-black uppercase tracking-widest text-black">TEST EXECUTION RESULTS</div>
                        {terminalOutput.testResults.map((tr, idx) => (
                          <div key={idx} className="bg-white border-3 border-black shadow-[3px_3px_0px_#000] p-4">
                            <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-black">
                              <div className="flex items-center gap-2">
                                {tr.passed 
                                  ? <CheckCircle2 size={16} strokeWidth={3} className="text-black" /> 
                                  : <XSquare size={16} strokeWidth={3} className="text-[#FF0033]" />}
                                <span className="font-mono text-xs font-black uppercase">
                                  TEST CASE {idx + 1}
                                </span>
                              </div>
                              <span className={`px-2 py-0.5 border border-black font-mono text-[10px] font-black uppercase ${
                                tr.passed ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
                              }`}>
                                {tr.passed ? 'PASSED' : 'FAILED'}
                              </span>
                            </div>
                            <div className="text-xs space-y-1.5 font-mono">
                              <div className="bg-[#FAF8F5] border border-black p-2"><span className="text-neutral-500 font-black">INPUT:</span> <span className="font-bold text-black">{tr.input}</span></div>
                              <div className="bg-[#FAF8F5] border border-black p-2"><span className="text-neutral-500 font-black">EXPECTED:</span> <span className="font-bold text-black">{tr.expected}</span></div>
                              {!tr.passed && (
                                <div className="bg-[#FF0033]/10 border border-[#FF0033] p-2 text-[#FF0033] font-black">ACTUAL: {tr.got}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Runtime / Memory */}
                    <div className="flex gap-4">
                      <div className="bg-white border-3 border-black p-4 shadow-[3px_3px_0px_#000] flex-1">
                        <div className="text-neutral-600 text-[10px] uppercase font-mono font-black tracking-widest mb-1 flex items-center gap-1.5">
                          <Clock size={12} strokeWidth={2.5} /> RUNTIME
                        </div>
                        <div className="text-black font-mono font-black text-base">{terminalOutput.runtime}</div>
                      </div>
                      <div className="bg-white border-3 border-black p-4 shadow-[3px_3px_0px_#000] flex-1">
                        <div className="text-neutral-600 text-[10px] uppercase font-mono font-black tracking-widest mb-1 flex items-center gap-1.5">
                          <Cpu size={12} strokeWidth={2.5} /> MEMORY
                        </div>
                        <div className="text-black font-mono font-black text-base">{terminalOutput.memory}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ═══ Right Panel: Editor ═══ */}
        <div className="flex-1 flex flex-col min-w-[400px] bg-white">
          {/* Editor Header */}
          <div className="h-12 border-b-3 border-black bg-white flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-[#FAF8F5] border-2 border-black text-black text-xs font-mono font-black uppercase rounded-none pl-3 pr-8 py-1.5 focus:outline-none cursor-pointer appearance-none shadow-[2px_2px_0px_#000]"
                >
                  {availableLanguages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <ChevronDown size={12} strokeWidth={3} className="absolute right-2 top-1/2 -translate-y-1/2 text-black pointer-events-none" />
              </div>
              <span className="text-[10px] font-mono font-black text-neutral-500 uppercase bg-[#FAF8F5] border border-black px-2 py-1">
                {availableLanguages.length} LANGS
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCopyCode} 
                className="p-1.5 bg-[#FAF8F5] hover:bg-[#FFDE59] border-2 border-black text-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all" 
                title="Copy code"
              >
                {copied ? <Check size={14} strokeWidth={3} className="text-black" /> : <Copy size={14} strokeWidth={2.5} />}
              </button>
              <button 
                onClick={handleResetCode} 
                className="p-1.5 bg-[#FAF8F5] hover:bg-[#FFDE59] border-2 border-black text-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all" 
                title="Reset code"
              >
                <RotateCcw size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Editor Container */}
          <div className="flex-1 relative">
            <Editor
              height="100%"
              language={monacoLang}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
                fontLigatures: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                smoothScrolling: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                autoIndent: "full",
                tabSize: 4,
                wordWrap: "on",
                lineNumbers: "on",
                renderLineHighlight: "all",
                bracketPairColorization: { enabled: true },
                guides: { bracketPairs: true },
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                  useShadows: false
                }
              }}
              loading={
                <div className="flex items-center justify-center h-full gap-2 text-black font-mono font-black text-xs uppercase">
                  <Loader2 size={18} className="animate-spin" />
                  <span>LOADING MONACO COMPILER...</span>
                </div>
              }
            />
          </div>
        </div>

      </div>
    </div>
  );
}
