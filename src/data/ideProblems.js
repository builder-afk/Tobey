// ═══════════════════════════════════════════════════════════════════════════════
// IDE PROBLEM DATABASE — 50 problems per topic, 550 total
// Covers: Arrays, Linked List, Strings, Binary Search, Dynamic Programming,
// Two Pointers, Trees, Backtracking, Design, Graphs, Stacks
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Boilerplate Generator ──────────────────────────────────────────────────
function genBoilerplates(funcName, params, returnType, extraSetup = {}) {
  const jsParams = params.map(p => p.name).join(', ');
  const pyParams = params.map(p => p.name).join(', ');
  const cppParams = params.map(p => `${p.cppType || 'int'} ${p.name}`).join(', ');
  const javaParams = params.map(p => `${p.javaType || 'int'} ${p.name}`).join(', ');
  const javaReturn = returnType === 'number' ? 'int' : returnType === 'number[]' ? 'int[]' : returnType === 'boolean' ? 'boolean' : returnType === 'string' ? 'String' : returnType === 'number[][]' ? 'int[][]' : returnType === 'ListNode' ? 'ListNode' : returnType === 'TreeNode' ? 'TreeNode' : 'int';
  const cppReturn = returnType === 'number' ? 'int' : returnType === 'number[]' ? 'vector<int>' : returnType === 'boolean' ? 'bool' : returnType === 'string' ? 'string' : returnType === 'number[][]' ? 'vector<vector<int>>' : returnType === 'ListNode' ? 'ListNode*' : returnType === 'TreeNode' ? 'TreeNode*' : returnType === 'void' ? 'void' : 'int';
  
  const jsSetup = extraSetup.js || '';
  const pySetup = extraSetup.py || '';
  const cppSetup = extraSetup.cpp || '';
  const javaSetup = extraSetup.java || '';

  return {
    JavaScript: `${jsSetup}/**\n * @param {${params.map(p => p.jsType || '*').join(', ')}}\n * @return {${returnType}}\n */\nfunction ${funcName}(${jsParams}) {\n    // Write your code here\n    \n};`,
    Python: `${pySetup}class Solution:\n    def ${funcName}(self, ${pyParams}):\n        # Write your code here\n        pass`,
    'C++': `${cppSetup}class Solution {\npublic:\n    ${cppReturn} ${funcName}(${cppParams}) {\n        // Write your code here\n        \n    }\n};`,
    Java: `${javaSetup}class Solution {\n    public ${javaReturn} ${funcName}(${javaParams}) {\n        // Write your code here\n        \n    }\n}`
  };
}

// Shorthand company lists
const FAANG = ['Google', 'Amazon', 'Meta', 'Apple', 'Netflix'];
const BIG4 = ['Google', 'Amazon', 'Microsoft', 'Meta'];
const TIER1 = ['Amazon', 'Microsoft', 'Google'];
const TIER2 = ['Bloomberg', 'Uber', 'LinkedIn', 'Adobe'];
const FINANCE = ['Goldman Sachs', 'Morgan Stanley', 'JP Morgan'];

const statuses = ['Unsolved', 'Unsolved', 'Unsolved', 'Solved', 'Attempted'];
const randStatus = () => statuses[Math.floor(Math.random() * statuses.length)];
const langs = ['Python', 'Java', 'C++', 'JavaScript'];

// ─── ARRAYS (50 Questions) ──────────────────────────────────────────────────
const arraysProblems = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', companies: ['Google', 'Amazon', 'Facebook', 'Apple'],
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9' }, { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }],
    constraints: ['2 <= nums.length <= 10⁴', '-10⁹ <= nums[i] <= 10⁹'], hints: ['Use a hash map to store complements.'], func: 'twoSum',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }, { name: 'target', jsType: 'number', cppType: 'int', javaType: 'int' }], returnType: 'number[]' },
  { id: 6, title: 'Merge Intervals', difficulty: 'Medium', companies: ['Google', 'Facebook', 'LinkedIn'],
    description: 'Given an array of `intervals` where intervals[i] = [startᵢ, endᵢ], merge all overlapping intervals.',
    examples: [{ input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' }],
    constraints: ['1 <= intervals.length <= 10⁴'], hints: ['Sort by start time, then merge greedily.'], func: 'merge',
    params: [{ name: 'intervals', jsType: 'number[][]', cppType: 'vector<vector<int>>&', javaType: 'int[][]' }], returnType: 'number[][]' },
  { id: 16, title: 'Contains Duplicate', difficulty: 'Easy', companies: ['Amazon', 'Apple', 'Adobe'],
    description: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array.',
    examples: [{ input: 'nums = [1,2,3,1]', output: 'true' }, { input: 'nums = [1,2,3,4]', output: 'false' }],
    constraints: ['1 <= nums.length <= 10⁵'], hints: ['Use a Set to track seen numbers.'], func: 'containsDuplicate',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'boolean' },
  { id: 17, title: 'Product of Array Except Self', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Apple', 'Microsoft'],
    description: 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all elements of `nums` except `nums[i]`. You must write an algorithm that runs in O(n) without using division.',
    examples: [{ input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' }],
    constraints: ['2 <= nums.length <= 10⁵'], hints: ['Use prefix and suffix products.'], func: 'productExceptSelf',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number[]' },
  { id: 18, title: 'Maximum Subarray', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'LinkedIn', 'Apple'],
    description: 'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.',
    examples: [{ input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'Subarray [4,-1,2,1] has the largest sum.' }],
    constraints: ['1 <= nums.length <= 10⁵'], hints: ["Kadane's algorithm: track current max and global max."], func: 'maxSubArray',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number' },
  { id: 19, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', companies: FAANG,
    description: 'Given an array `prices` where prices[i] is the price of a stock on the ith day, maximize profit by choosing a single day to buy and a single day to sell.',
    examples: [{ input: 'prices = [7,1,5,3,6,4]', output: '5' }],
    constraints: ['1 <= prices.length <= 10⁵'], hints: ['Track minimum price seen so far.'], func: 'maxProfit',
    params: [{ name: 'prices', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number' },
  { id: 20, title: 'Rotate Array', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Apple'],
    description: 'Given an integer array `nums`, rotate the array to the right by `k` steps.',
    examples: [{ input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]' }],
    constraints: ['1 <= nums.length <= 10⁵'], hints: ['Reverse entire array, then reverse first k and last n-k elements.'], func: 'rotate',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }, { name: 'k', jsType: 'number', cppType: 'int', javaType: 'int' }], returnType: 'void' },
  { id: 21, title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Meta'],
    description: 'Given a sorted rotated array of unique elements, return the minimum element. You must write an O(log n) algorithm.',
    examples: [{ input: 'nums = [3,4,5,1,2]', output: '1' }],
    constraints: ['n == nums.length', '1 <= n <= 5000'], hints: ['Binary search: compare mid with right.'], func: 'findMin',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number' },
  { id: 22, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', companies: BIG4,
    description: 'Given a rotated sorted array `nums` and a `target`, return its index, or -1 if not found. O(log n) required.',
    examples: [{ input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' }],
    constraints: ['1 <= nums.length <= 5000'], hints: ['Modified binary search.'], func: 'search',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }, { name: 'target', jsType: 'number', cppType: 'int', javaType: 'int' }], returnType: 'number' },
  { id: 23, title: '3Sum', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft', 'Bloomberg'],
    description: 'Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0.',
    examples: [{ input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' }],
    constraints: ['3 <= nums.length <= 3000'], hints: ['Sort array, fix one element, use two pointers for the rest.'], func: 'threeSum',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number[][]' },
  { id: 24, title: 'Container With Most Water', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Bloomberg'],
    description: 'Given n non-negative integers representing vertical lines, find two lines that together with the x-axis form a container with the most water.',
    examples: [{ input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' }],
    constraints: ['n >= 2'], hints: ['Two pointers from both ends, move the shorter line.'], func: 'maxArea',
    params: [{ name: 'height', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number' },
  { id: 25, title: 'Subarray Sum Equals K', difficulty: 'Medium', companies: ['Facebook', 'Google', 'Amazon'],
    description: 'Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.',
    examples: [{ input: 'nums = [1,1,1], k = 2', output: '2' }],
    constraints: ['1 <= nums.length <= 2 * 10⁴'], hints: ['Use prefix sum with hash map.'], func: 'subarraySum',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }, { name: 'k', jsType: 'number', cppType: 'int', javaType: 'int' }], returnType: 'number' },
  { id: 26, title: 'Next Permutation', difficulty: 'Medium', companies: ['Google', 'Facebook', 'Amazon'],
    description: 'Given an array of integers `nums`, rearrange it into the lexicographically next greater permutation. If impossible, rearrange to lowest order (ascending).',
    examples: [{ input: 'nums = [1,2,3]', output: '[1,3,2]' }],
    constraints: ['1 <= nums.length <= 100'], hints: ['Find rightmost pair where nums[i] < nums[i+1].'], func: 'nextPermutation',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'void' },
  { id: 27, title: 'Set Matrix Zeroes', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'],
    description: 'Given an m × n matrix, if an element is 0, set its entire row and column to 0. Do it in place.',
    examples: [{ input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]' }],
    constraints: ['m == matrix.length', '1 <= m, n <= 200'], hints: ['Use first row and column as markers.'], func: 'setZeroes',
    params: [{ name: 'matrix', jsType: 'number[][]', cppType: 'vector<vector<int>>&', javaType: 'int[][]' }], returnType: 'void' },
  { id: 28, title: 'Spiral Matrix', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Apple'],
    description: 'Given an m x n matrix, return all elements in spiral order.',
    examples: [{ input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]' }],
    constraints: ['1 <= m, n <= 10'], hints: ['Track top, bottom, left, right boundaries.'], func: 'spiralOrder',
    params: [{ name: 'matrix', jsType: 'number[][]', cppType: 'vector<vector<int>>&', javaType: 'int[][]' }], returnType: 'number[]' },
  { id: 29, title: 'Jump Game', difficulty: 'Medium', companies: ['Amazon', 'Apple', 'Google'],
    description: 'You are given an integer array `nums`. You are initially at first index. Each element represents your maximum jump length. Return true if you can reach the last index.',
    examples: [{ input: 'nums = [2,3,1,1,4]', output: 'true' }, { input: 'nums = [3,2,1,0,4]', output: 'false' }],
    constraints: ['1 <= nums.length <= 10⁴'], hints: ['Track the farthest reachable index greedily.'], func: 'canJump',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'boolean' },
  { id: 30, title: 'Pascal\'s Triangle', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Google'],
    description: 'Given an integer `numRows`, return the first numRows of Pascal\'s triangle.',
    examples: [{ input: 'numRows = 5', output: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]' }],
    constraints: ['1 <= numRows <= 30'], hints: ['Each element is sum of two elements above it.'], func: 'generate',
    params: [{ name: 'numRows', jsType: 'number', cppType: 'int', javaType: 'int' }], returnType: 'number[][]' },
  { id: 31, title: 'Sort Colors', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'],
    description: 'Given an array with n objects colored red (0), white (1), and blue (2), sort them in-place so that objects of same color are adjacent. One-pass algorithm using constant extra space.',
    examples: [{ input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' }],
    constraints: ['n == nums.length', '1 <= n <= 300'], hints: ['Dutch National Flag algorithm with 3 pointers.'], func: 'sortColors',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'void' },
  { id: 32, title: 'Find All Duplicates in an Array', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Google'],
    description: 'Given an integer array where 1 ≤ a[i] ≤ n and each element appears once or twice, find all elements that appear twice. O(n) time, O(1) extra space.',
    examples: [{ input: 'nums = [4,3,2,7,8,2,3,1]', output: '[2,3]' }],
    constraints: ['n == nums.length', '1 <= n <= 10⁵'], hints: ['Mark visited by negating value at index.'], func: 'findDuplicates',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number[]' },
  { id: 33, title: 'Maximum Product Subarray', difficulty: 'Medium', companies: ['Amazon', 'LinkedIn', 'Microsoft'],
    description: 'Given an integer array `nums`, find a subarray that has the largest product, and return the product.',
    examples: [{ input: 'nums = [2,3,-2,4]', output: '6', explanation: '[2,3] has the largest product.' }],
    constraints: ['1 <= nums.length <= 2 * 10⁴'], hints: ['Track both max and min products (negative × negative = positive).'], func: 'maxProduct',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number' },
  { id: 34, title: 'Majority Element', difficulty: 'Easy', companies: ['Amazon', 'Google', 'Microsoft'],
    description: 'Given an array `nums`, return the majority element (appears more than ⌊n/2⌋ times). The majority element always exists.',
    examples: [{ input: 'nums = [3,2,3]', output: '3' }],
    constraints: ['n == nums.length', '1 <= n <= 5 * 10⁴'], hints: ['Boyer-Moore Voting Algorithm.'], func: 'majorityElement',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number' },
  { id: 35, title: 'Move Zeroes', difficulty: 'Easy', companies: ['Facebook', 'Amazon', 'Apple'],
    description: 'Move all 0s in `nums` to the end while maintaining the relative order of non-zero elements. Do this in-place.',
    examples: [{ input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]' }],
    constraints: ['1 <= nums.length <= 10⁴'], hints: ['Two pointer approach: one for placing non-zeros.'], func: 'moveZeroes',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'void' },
  { id: 36, title: 'Missing Number', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Apple'],
    description: 'Given an array `nums` containing n distinct numbers in the range [0, n], return the number that is missing.',
    examples: [{ input: 'nums = [3,0,1]', output: '2' }],
    constraints: ['n == nums.length', '0 <= nums[i] <= n'], hints: ['Use XOR or Gauss formula: n*(n+1)/2 - sum.'], func: 'missingNumber',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number' },
  { id: 37, title: 'First Missing Positive', difficulty: 'Hard', companies: ['Amazon', 'Microsoft', 'Google', 'Apple'],
    description: 'Given an unsorted integer array `nums`, return the smallest missing positive integer. O(n) time, O(1) extra space.',
    examples: [{ input: 'nums = [3,4,-1,1]', output: '2' }, { input: 'nums = [1,2,0]', output: '3' }],
    constraints: ['1 <= nums.length <= 10⁵'], hints: ['Place each number at its correct index (1 at index 0, 2 at index 1, etc).'], func: 'firstMissingPositive',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number' },
  { id: 38, title: 'Longest Consecutive Sequence', difficulty: 'Medium', companies: ['Google', 'Amazon', 'Facebook'],
    description: 'Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. O(n) time.',
    examples: [{ input: 'nums = [100,4,200,1,3,2]', output: '4', explanation: 'Sequence: [1,2,3,4]' }],
    constraints: ['0 <= nums.length <= 10⁵'], hints: ['Use a HashSet; only start counting from sequence starts.'], func: 'longestConsecutive',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number' },
  { id: 39, title: 'Kth Largest Element in an Array', difficulty: 'Medium', companies: ['Facebook', 'Amazon', 'LinkedIn', 'Google'],
    description: 'Given an integer array `nums` and integer `k`, return the kth largest element. Note it is the kth largest in sorted order, not the kth distinct element.',
    examples: [{ input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' }],
    constraints: ['1 <= k <= nums.length <= 10⁵'], hints: ['Use Quickselect or a min-heap of size k.'], func: 'findKthLargest',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }, { name: 'k', jsType: 'number', cppType: 'int', javaType: 'int' }], returnType: 'number' },
  { id: 40, title: 'Insert Interval', difficulty: 'Medium', companies: ['Google', 'Facebook', 'LinkedIn'],
    description: 'Given a set of non-overlapping intervals sorted by start, insert a new interval into the intervals (merge if necessary).',
    examples: [{ input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', output: '[[1,5],[6,9]]' }],
    constraints: ['0 <= intervals.length <= 10⁴'], hints: ['Add all intervals before new, merge overlapping, add remaining.'], func: 'insert',
    params: [{ name: 'intervals', jsType: 'number[][]', cppType: 'vector<vector<int>>&', javaType: 'int[][]' }, { name: 'newInterval', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number[][]' },
  { id: 41, title: 'Non-overlapping Intervals', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'],
    description: 'Given an array of intervals, return the minimum number of intervals you need to remove to make the rest non-overlapping.',
    examples: [{ input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', output: '1' }],
    constraints: ['1 <= intervals.length <= 10⁵'], hints: ['Sort by end time, greedily pick non-overlapping.'], func: 'eraseOverlapIntervals',
    params: [{ name: 'intervals', jsType: 'number[][]', cppType: 'vector<vector<int>>&', javaType: 'int[][]' }], returnType: 'number' },
  { id: 42, title: 'Meeting Rooms II', difficulty: 'Medium', companies: ['Google', 'Facebook', 'Amazon', 'Bloomberg'],
    description: 'Given an array of meeting time intervals, find the minimum number of conference rooms required.',
    examples: [{ input: 'intervals = [[0,30],[5,10],[15,20]]', output: '2' }],
    constraints: ['1 <= intervals.length <= 10⁴'], hints: ['Sort start and end times separately, sweep line.'], func: 'minMeetingRooms',
    params: [{ name: 'intervals', jsType: 'number[][]', cppType: 'vector<vector<int>>&', javaType: 'int[][]' }], returnType: 'number' },
  { id: 43, title: 'Sliding Window Maximum', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft'],
    description: 'Given an array `nums` and a sliding window of size `k`, return the max for each window position.',
    examples: [{ input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' }],
    constraints: ['1 <= nums.length <= 10⁵'], hints: ['Use a monotonic deque.'], func: 'maxSlidingWindow',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }, { name: 'k', jsType: 'number', cppType: 'int', javaType: 'int' }], returnType: 'number[]' },
  { id: 44, title: 'Minimum Size Subarray Sum', difficulty: 'Medium', companies: ['Facebook', 'Google', 'Goldman Sachs'],
    description: 'Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a subarray whose sum is >= target.',
    examples: [{ input: 'target = 7, nums = [2,3,1,2,4,3]', output: '2', explanation: '[4,3] has sum 7.' }],
    constraints: ['1 <= target <= 10⁹'], hints: ['Sliding window / two pointers.'], func: 'minSubArrayLen',
    params: [{ name: 'target', jsType: 'number', cppType: 'int', javaType: 'int' }, { name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number' },
  { id: 45, title: 'Top K Frequent Elements', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'],
    description: 'Given an integer array `nums` and integer `k`, return the `k` most frequent elements. You may return the answer in any order.',
    examples: [{ input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' }],
    constraints: ['1 <= nums.length <= 10⁵'], hints: ['HashMap for frequency + bucket sort or heap.'], func: 'topKFrequent',
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }, { name: 'k', jsType: 'number', cppType: 'int', javaType: 'int' }], returnType: 'number[]' },
  { id: 46, title: 'Group Anagrams', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'],
    description: 'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.',
    examples: [{ input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' }],
    constraints: ['1 <= strs.length <= 10⁴'], hints: ['Sort each string as key for a hashmap.'], func: 'groupAnagrams',
    params: [{ name: 'strs', jsType: 'string[]', cppType: 'vector<string>&', javaType: 'String[]' }], returnType: 'string[][]' },
  { id: 47, title: 'Encode and Decode Strings', difficulty: 'Medium', companies: ['Google', 'Amazon'],
    description: 'Design an algorithm to encode a list of strings to a single string. Implement encode and decode functions.',
    examples: [{ input: '["lint","code","love","you"]', output: '"lint","code","love","you"' }],
    constraints: ['0 <= strs.length <= 200'], hints: ['Prefix each string with its length and a delimiter.'], func: 'codec',
    params: [{ name: 'strs', jsType: 'string[]', cppType: 'vector<string>&', javaType: 'String[]' }], returnType: 'string[]' },
  { id: 48, title: 'Trapping Rain Water', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Goldman Sachs'],
    description: 'Given `n` non-negative integers representing an elevation map, compute how much water it can trap after raining.',
    examples: [{ input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' }],
    constraints: ['n == height.length', '1 <= n <= 2 * 10⁴'], hints: ['Two pointers: track leftMax and rightMax.'], func: 'trap',
    params: [{ name: 'height', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number' },
  { id: 49, title: 'Candy', difficulty: 'Hard', companies: ['Amazon', 'Google'],
    description: 'There are n children standing in a line with ratings. Give each child at least one candy. Children with higher ratings get more candies than their neighbors. Return minimum candies needed.',
    examples: [{ input: 'ratings = [1,0,2]', output: '5' }],
    constraints: ['n == ratings.length'], hints: ['Two passes: left-to-right then right-to-left.'], func: 'candy',
    params: [{ name: 'ratings', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number' },
  { id: 50, title: 'Gas Station', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Bloomberg'],
    description: 'There are n gas stations along a circular route. Determine if you can travel around the circuit once starting at some station.',
    examples: [{ input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]', output: '3' }],
    constraints: ['n == gas.length == cost.length'], hints: ['If total gas >= total cost, solution exists. Track from where surplus begins.'], func: 'canCompleteCircuit',
    params: [{ name: 'gas', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }, { name: 'cost', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number' },
  // Fill remaining with more array problems
  ...Array.from({ length: 15 }, (_, i) => ({
    id: 51 + i, title: ['Remove Duplicates from Sorted Array', 'Intersection of Two Arrays II', 'Plus One', 'Single Number', 'Valid Sudoku', 'Majority Element II', 'Wiggle Sort II', 'Count of Smaller Numbers After Self', 'Range Sum Query - Mutable', 'Minimum Number of Arrows to Burst Balloons', 'Shortest Unsorted Continuous Subarray', 'Task Scheduler', 'Partition Labels', 'Squares of a Sorted Array', 'Array Nesting'][i],
    difficulty: ['Easy', 'Easy', 'Easy', 'Easy', 'Medium', 'Medium', 'Hard', 'Hard', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Easy', 'Medium'][i],
    companies: [TIER1, BIG4, ['Google', 'Amazon'], FAANG, ['Google', 'Apple'], ['Google', 'Amazon'], [...TIER1, 'Apple'], FAANG, ['Amazon', 'Bloomberg'], ['Facebook', 'Microsoft'], ['Amazon', 'Google'], ['Facebook', 'Amazon'], ['Amazon', 'Google'], ['Amazon', 'Facebook'], ['Apple', 'Google']][i],
    description: ['Remove duplicates from a sorted array in-place.', 'Find intersection of two arrays (each element appears as many times as in both).', 'Given a large integer as an array of digits, increment by one.', 'Every element appears twice except one. Find that single one.', 'Determine if a 9x9 Sudoku board is valid.', 'Find all elements appearing more than ⌊n/3⌋ times.', 'Reorder array into a wiggle sequence: nums[0] < nums[1] > nums[2] < nums[3]...', 'Count for each element how many smaller elements are to its right.', 'Given a mutable integer array, handle update and range-sum queries efficiently.', 'Find the minimum number of arrows to burst all balloons.', 'Find the shortest subarray that when sorted makes the entire array sorted.', 'Given tasks with cooldown, find minimum intervals the CPU takes.', 'Partition a string into as many parts as possible so each letter appears in at most one part.', 'Given a sorted array, return array of squares in sorted order.', 'Find the length of the longest set s[k] such that s[k] = nums[s[k]] forms a cycle.'][i],
    examples: [{ input: 'nums = [1,1,2]', output: '2' }], constraints: ['Various'], hints: ['Think step by step.'],
    func: ['removeDuplicates', 'intersect', 'plusOne', 'singleNumber', 'isValidSudoku', 'majorityElementII', 'wiggleSort', 'countSmaller', 'NumArray', 'findMinArrowShots', 'findUnsortedSubarray', 'leastInterval', 'partitionLabels', 'sortedSquares', 'arrayNesting'][i],
    params: [{ name: 'nums', jsType: 'number[]', cppType: 'vector<int>&', javaType: 'int[]' }], returnType: 'number'
  }))
].map(p => ({ ...p, topic: 'Arrays', languages: langs, status: randStatus() }));

// ─── LINKED LIST (50 Questions) ─────────────────────────────────────────────
const linkedListProblems = [
  { id: 101, title: 'Add Two Numbers', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Bloomberg'] },
  { id: 102, title: 'Merge k Sorted Lists', difficulty: 'Hard', companies: ['Amazon', 'Microsoft', 'Facebook'] },
  { id: 103, title: 'Reverse Linked List', difficulty: 'Easy', companies: BIG4 },
  { id: 104, title: 'Linked List Cycle', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Apple'] },
  { id: 105, title: 'Merge Two Sorted Lists', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Apple'] },
  { id: 106, title: 'Remove Nth Node From End', difficulty: 'Medium', companies: ['Facebook', 'Amazon', 'Google'] },
  { id: 107, title: 'Palindrome Linked List', difficulty: 'Easy', companies: ['Facebook', 'Amazon', 'Bloomberg'] },
  { id: 108, title: 'Linked List Cycle II', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'] },
  { id: 109, title: 'Intersection of Two Linked Lists', difficulty: 'Easy', companies: ['Amazon', 'LinkedIn', 'Microsoft'] },
  { id: 110, title: 'Reverse Linked List II', difficulty: 'Medium', companies: ['Facebook', 'Amazon', 'Bloomberg'] },
  { id: 111, title: 'Swap Nodes in Pairs', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Bloomberg'] },
  { id: 112, title: 'Rotate List', difficulty: 'Medium', companies: ['Amazon', 'LinkedIn'] },
  { id: 113, title: 'Remove Duplicates from Sorted List', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'] },
  { id: 114, title: 'Remove Duplicates from Sorted List II', difficulty: 'Medium', companies: ['Amazon', 'Bloomberg'] },
  { id: 115, title: 'Partition List', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'] },
  { id: 116, title: 'Copy List with Random Pointer', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'] },
  { id: 117, title: 'Flatten a Multilevel Doubly Linked List', difficulty: 'Medium', companies: ['Facebook', 'Microsoft'] },
  { id: 118, title: 'Sort List', difficulty: 'Medium', companies: ['Facebook', 'Amazon', 'Microsoft'] },
  { id: 119, title: 'Reorder List', difficulty: 'Medium', companies: ['Amazon', 'LinkedIn', 'Facebook'] },
  { id: 120, title: 'Odd Even Linked List', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'] },
  { id: 121, title: 'Insert into a Sorted Circular Linked List', difficulty: 'Medium', companies: ['Facebook', 'Google'] },
  { id: 122, title: 'Add Two Numbers II', difficulty: 'Medium', companies: ['Amazon', 'Bloomberg'] },
  { id: 123, title: 'Split Linked List in Parts', difficulty: 'Medium', companies: ['Amazon'] },
  { id: 124, title: 'Design Linked List', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'] },
  { id: 125, title: 'Middle of the Linked List', difficulty: 'Easy', companies: ['Amazon', 'Google'] },
  { id: 126, title: 'Delete Node in a Linked List', difficulty: 'Medium', companies: ['Apple', 'Amazon'] },
  { id: 127, title: 'Reverse Nodes in k-Group', difficulty: 'Hard', companies: ['Amazon', 'Microsoft', 'Facebook'] },
  { id: 128, title: 'LFU Cache', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft'] },
  { id: 129, title: 'Design Browser History', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 130, title: 'Swapping Nodes in a Linked List', difficulty: 'Medium', companies: ['Amazon', 'Facebook'] },
  ...Array.from({ length: 20 }, (_, i) => ({
    id: 131 + i,
    title: ['Convert Sorted List to BST', 'Flatten Binary Tree to Linked List', 'Populating Next Right Pointers', 'Design Circular Queue', 'Design Circular Deque', 'Maximum Twin Sum', 'Remove Zero Sum Consecutive Nodes', 'Merge In Between Linked Lists', 'Delete N Nodes After M Nodes', 'Design Skiplist', 'Next Greater Node In Linked List', 'Linked List Components', 'Remove Linked List Elements', 'Design HashSet using Linked List', 'Design HashMap using Linked List', 'Convert Binary Number in Linked List', 'Check if Linked List is Palindrome (Recursive)', 'Find the Duplicate Number (LL Approach)', 'Insertion Sort List', 'Detect Cycle Length in Linked List'][i],
    difficulty: ['Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Easy', 'Hard', 'Medium', 'Medium', 'Easy', 'Easy', 'Medium', 'Easy', 'Easy', 'Medium', 'Medium', 'Easy'][i],
    companies: [TIER1, ['Facebook', 'Amazon'], ['Facebook', 'Microsoft'], ['Amazon', 'Google'], ['Amazon', 'Google'], ['Amazon', 'Microsoft'], ['Amazon', 'Bloomberg'], ['Amazon'], ['Amazon', 'Microsoft'], ['Amazon'], ['Google', 'Amazon'], ['Google'], ['Amazon', 'Microsoft'], ['Amazon'], ['Amazon'], ['Amazon'], ['Facebook'], ['Amazon', 'Microsoft'], ['Amazon'], ['Google', 'Amazon']][i]
  }))
].map((p, idx) => ({
  ...p, topic: 'Linked List', languages: langs, status: randStatus(),
  description: p.description || `Solve the "${p.title}" problem on a singly or doubly linked list. Carefully handle pointer manipulation and edge cases like empty lists and cycles.`,
  examples: p.examples || [{ input: 'head = [1,2,3,4,5]', output: 'See problem statement' }],
  constraints: p.constraints || ['0 <= n <= 5000'], hints: p.hints || ['Visualize with a diagram. Handle edge cases.'],
  func: p.func || p.title.replace(/[^a-zA-Z0-9]/g, '').replace(/^(.)/, (m) => m.toLowerCase()),
  params: p.params || [{ name: 'head', jsType: 'ListNode', cppType: 'ListNode*', javaType: 'ListNode' }], returnType: p.returnType || 'ListNode'
}));

// ─── Helper to generate topic problems quickly ──────────────────────────────
function quickTopic(topicName, problems) {
  return problems.map(p => ({
    ...p, topic: topicName, languages: langs, status: randStatus(),
    description: p.description || `Solve "${p.title}" using ${topicName} techniques.`,
    examples: p.examples || [{ input: 'See problem statement', output: 'See problem statement' }],
    constraints: p.constraints || ['Varies by problem.'], hints: p.hints || ['Break the problem into smaller subproblems.'],
    func: p.func || p.title.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(w => w.length > 0).map((w, i) => i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()).join(''),
    params: p.params || [{ name: 'input', jsType: '*', cppType: 'auto', javaType: 'Object' }], returnType: p.returnType || 'number'
  }));
}

// ─── STRINGS (50 Questions) ────────────────────────────────────────────────
const stringsProblems = quickTopic('Strings', [
  { id: 201, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', companies: ['Amazon', 'Bloomberg', 'Spotify'], description: 'Given a string `s`, find the length of the longest substring without repeating characters.', examples: [{ input: 's = "abcabcbb"', output: '3' }], hints: ['Sliding window with a Set.'] },
  { id: 202, title: 'Longest Palindromic Substring', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Uber'], description: 'Given a string `s`, return the longest palindromic substring.', examples: [{ input: 's = "babad"', output: '"bab"' }], hints: ['Expand around center.'] },
  { id: 203, title: 'Valid Anagram', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Google'] },
  { id: 204, title: 'Longest Common Prefix', difficulty: 'Easy', companies: ['Amazon', 'Google'] },
  { id: 205, title: 'String to Integer (atoi)', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'] },
  { id: 206, title: 'Implement strStr()', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Apple'] },
  { id: 207, title: 'Count and Say', difficulty: 'Medium', companies: ['Facebook', 'Amazon'] },
  { id: 208, title: 'Zigzag Conversion', difficulty: 'Medium', companies: ['Amazon', 'Apple'] },
  { id: 209, title: 'Reverse Words in a String', difficulty: 'Medium', companies: ['Microsoft', 'Amazon', 'Bloomberg'] },
  { id: 210, title: 'Valid Palindrome', difficulty: 'Easy', companies: ['Facebook', 'Amazon', 'Microsoft'] },
  { id: 211, title: 'Valid Palindrome II', difficulty: 'Easy', companies: ['Facebook', 'Amazon'] },
  { id: 212, title: 'Longest Repeating Character Replacement', difficulty: 'Medium', companies: ['Google', 'Amazon'] },
  { id: 213, title: 'Minimum Window Substring', difficulty: 'Hard', companies: ['Facebook', 'Amazon', 'LinkedIn', 'Google'] },
  { id: 214, title: 'Palindromic Substrings', difficulty: 'Medium', companies: ['Facebook', 'Amazon'] },
  { id: 215, title: 'Letter Combinations of a Phone Number', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Facebook'] },
  { id: 216, title: 'Generate Parentheses', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Facebook'] },
  { id: 217, title: 'Decode Ways', difficulty: 'Medium', companies: ['Facebook', 'Amazon', 'Google'] },
  { id: 218, title: 'Regular Expression Matching', difficulty: 'Hard', companies: ['Google', 'Facebook', 'Amazon'] },
  { id: 219, title: 'Wildcard Matching', difficulty: 'Hard', companies: ['Google', 'Facebook', 'Amazon'] },
  { id: 220, title: 'Edit Distance', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'] },
  { id: 221, title: 'Word Break', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'] },
  { id: 222, title: 'Distinct Subsequences', difficulty: 'Hard', companies: ['Google', 'Amazon'] },
  { id: 223, title: 'Scramble String', difficulty: 'Hard', companies: ['Google'] },
  { id: 224, title: 'Interleaving String', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 225, title: 'Isomorphic Strings', difficulty: 'Easy', companies: ['Amazon', 'Google'] },
  { id: 226, title: 'Repeated DNA Sequences', difficulty: 'Medium', companies: ['LinkedIn', 'Google'] },
  { id: 227, title: 'Multiply Strings', difficulty: 'Medium', companies: ['Facebook', 'Amazon'] },
  { id: 228, title: 'Remove Invalid Parentheses', difficulty: 'Hard', companies: ['Facebook', 'Amazon'] },
  { id: 229, title: 'Text Justification', difficulty: 'Hard', companies: ['Google', 'LinkedIn', 'Amazon'] },
  { id: 230, title: 'Shortest Palindrome', difficulty: 'Hard', companies: ['Google', 'Amazon'] },
  { id: 231, title: 'Palindrome Pairs', difficulty: 'Hard', companies: ['Google', 'Airbnb'] },
  { id: 232, title: 'Basic Calculator', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft'] },
  { id: 233, title: 'Basic Calculator II', difficulty: 'Medium', companies: ['Facebook', 'Amazon'] },
  { id: 234, title: 'Integer to Roman', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'] },
  { id: 235, title: 'Roman to Integer', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Apple'] },
  { id: 236, title: 'Compare Version Numbers', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'] },
  { id: 237, title: 'Restore IP Addresses', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 238, title: 'Simplify Path', difficulty: 'Medium', companies: ['Facebook', 'Amazon'] },
  { id: 239, title: 'One Edit Distance', difficulty: 'Medium', companies: ['Facebook', 'Amazon'] },
  { id: 240, title: 'Maximum Number of Vowels in a Substring', difficulty: 'Medium', companies: ['Amazon'] },
  { id: 241, title: 'Longest Happy String', difficulty: 'Medium', companies: ['Google', 'Amazon'] },
  { id: 242, title: 'Reorganize String', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Facebook'] },
  { id: 243, title: 'Check if Two String Arrays are Equivalent', difficulty: 'Easy', companies: ['Facebook'] },
  { id: 244, title: 'Detect Capital', difficulty: 'Easy', companies: ['Google'] },
  { id: 245, title: 'Find All Anagrams in a String', difficulty: 'Medium', companies: ['Amazon', 'Facebook'] },
  { id: 246, title: 'Permutation in String', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'] },
  { id: 247, title: 'Reverse String', difficulty: 'Easy', companies: ['Amazon', 'Apple'] },
  { id: 248, title: 'First Unique Character in a String', difficulty: 'Easy', companies: ['Amazon', 'Bloomberg', 'Google'] },
  { id: 249, title: 'Longest Word in Dictionary', difficulty: 'Medium', companies: ['Google'] },
  { id: 250, title: 'Groups of Special-Equivalent Strings', difficulty: 'Medium', companies: ['Amazon'] },
]);

// ─── BINARY SEARCH (50) ────────────────────────────────────────────────────
const binarySearchProblems = quickTopic('Binary Search', [
  { id: 301, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', companies: ['Google', 'Microsoft', 'Apple', 'Meta'] },
  { id: 302, title: 'Binary Search', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'] },
  { id: 303, title: 'Search Insert Position', difficulty: 'Easy', companies: ['Amazon', 'Apple'] },
  { id: 304, title: 'Find First and Last Position', difficulty: 'Medium', companies: ['Facebook', 'Amazon', 'LinkedIn'] },
  { id: 305, title: 'Search a 2D Matrix', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'] },
  { id: 306, title: 'Search a 2D Matrix II', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 307, title: 'Find Peak Element', difficulty: 'Medium', companies: ['Google', 'Facebook', 'Microsoft'] },
  { id: 308, title: 'Sqrt(x)', difficulty: 'Easy', companies: ['Amazon', 'Apple', 'Bloomberg'] },
  { id: 309, title: 'Pow(x, n)', difficulty: 'Medium', companies: ['Facebook', 'Amazon'] },
  { id: 310, title: 'Koko Eating Bananas', difficulty: 'Medium', companies: ['Google', 'Facebook'] },
  { id: 311, title: 'Capacity To Ship Packages Within D Days', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 312, title: 'Split Array Largest Sum', difficulty: 'Hard', companies: ['Google', 'Facebook'] },
  { id: 313, title: 'Find Minimum in Rotated Sorted Array II', difficulty: 'Hard', companies: ['Amazon', 'Microsoft'] },
  { id: 314, title: 'Aggressive Cows', difficulty: 'Hard', companies: ['Google', 'Amazon'] },
  { id: 315, title: 'Allocate Books', difficulty: 'Hard', companies: ['Google', 'Amazon'] },
  { id: 316, title: 'Magnetic Force Between Two Balls', difficulty: 'Medium', companies: ['Google'] },
  { id: 317, title: 'Single Element in a Sorted Array', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 318, title: 'Count of Range Sum', difficulty: 'Hard', companies: ['Google'] },
  { id: 319, title: 'Smallest Good Base', difficulty: 'Hard', companies: ['Google'] },
  { id: 320, title: 'Nth Digit', difficulty: 'Medium', companies: ['Google'] },
  { id: 321, title: 'Valid Perfect Square', difficulty: 'Easy', companies: ['LinkedIn', 'Amazon'] },
  { id: 322, title: 'Guess Number Higher or Lower', difficulty: 'Easy', companies: ['Amazon', 'Google'] },
  { id: 323, title: 'Arrange Coins', difficulty: 'Easy', companies: ['Amazon'] },
  { id: 324, title: 'H-Index II', difficulty: 'Medium', companies: ['Facebook', 'Google'] },
  { id: 325, title: 'Count Negative Numbers in a Sorted Matrix', difficulty: 'Easy', companies: ['Amazon'] },
  { id: 326, title: 'Peak Index in a Mountain Array', difficulty: 'Medium', companies: ['Bloomberg', 'Google'] },
  { id: 327, title: 'Time Based Key-Value Store', difficulty: 'Medium', companies: ['Google', 'Amazon'] },
  { id: 328, title: 'Random Pick with Weight', difficulty: 'Medium', companies: ['Facebook', 'Google'] },
  { id: 329, title: 'Longest Increasing Subsequence (BS)', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'] },
  { id: 330, title: 'Russian Doll Envelopes', difficulty: 'Hard', companies: ['Google', 'Amazon'] },
  { id: 331, title: 'Median of a Row-Wise Sorted Matrix', difficulty: 'Hard', companies: ['Amazon', 'Google'] },
  { id: 332, title: 'Minimum Days to Make M Bouquets', difficulty: 'Medium', companies: ['Google'] },
  { id: 333, title: 'Find the Smallest Divisor', difficulty: 'Medium', companies: ['Amazon'] },
  { id: 334, title: 'Kth Missing Positive Number', difficulty: 'Easy', companies: ['Facebook'] },
  { id: 335, title: 'Find Right Interval', difficulty: 'Medium', companies: ['Google'] },
  { id: 336, title: 'Preimage Size of Factorial Zeroes', difficulty: 'Hard', companies: ['Google'] },
  { id: 337, title: 'Online Election', difficulty: 'Medium', companies: ['Google'] },
  { id: 338, title: 'Find K Closest Elements', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 339, title: 'Maximum Length of Repeated Subarray', difficulty: 'Medium', companies: ['Google'] },
  { id: 340, title: 'Minimized Maximum of Products Distributed', difficulty: 'Medium', companies: ['Amazon'] },
  { id: 341, title: 'Minimum Speed to Arrive on Time', difficulty: 'Medium', companies: ['Google'] },
  { id: 342, title: 'Maximum Candies Allocated to K Children', difficulty: 'Medium', companies: ['Amazon'] },
  { id: 343, title: 'Cutting Ribbons', difficulty: 'Medium', companies: ['Google'] },
  { id: 344, title: 'Painters Partition Problem', difficulty: 'Hard', companies: ['Google', 'Amazon'] },
  { id: 345, title: 'Nth Root of M', difficulty: 'Easy', companies: ['Amazon'] },
  { id: 346, title: 'Find Floor and Ceil in Sorted Array', difficulty: 'Easy', companies: ['Amazon'] },
  { id: 347, title: 'Count Occurrences in Sorted Array', difficulty: 'Easy', companies: ['Amazon', 'Google'] },
  { id: 348, title: 'Search in Infinite Sorted Array', difficulty: 'Medium', companies: ['Amazon'] },
  { id: 349, title: 'Matrix Median', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 350, title: 'Book Allocation Problem', difficulty: 'Hard', companies: ['Google', 'Amazon'] },
]);

// ─── DYNAMIC PROGRAMMING (50) ──────────────────────────────────────────────
const dpProblems = quickTopic('Dynamic Programming', [
  { id: 401, title: 'Climbing Stairs', difficulty: 'Easy', companies: ['Amazon', 'Apple', 'Adobe'] },
  { id: 402, title: 'House Robber', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'] },
  { id: 403, title: 'House Robber II', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 404, title: 'Coin Change', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'] },
  { id: 405, title: 'Coin Change II', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 406, title: 'Longest Increasing Subsequence', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Google'] },
  { id: 407, title: 'Unique Paths', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Facebook'] },
  { id: 408, title: 'Unique Paths II', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 409, title: 'Jump Game II', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Facebook'] },
  { id: 410, title: 'Decode Ways', difficulty: 'Medium', companies: ['Facebook', 'Amazon', 'Google'] },
  { id: 411, title: 'Word Break', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'] },
  { id: 412, title: 'Word Break II', difficulty: 'Hard', companies: ['Amazon', 'Google'] },
  { id: 413, title: 'Partition Equal Subset Sum', difficulty: 'Medium', companies: ['Amazon', 'Facebook'] },
  { id: 414, title: 'Target Sum', difficulty: 'Medium', companies: ['Facebook', 'Google'] },
  { id: 415, title: 'Edit Distance', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'] },
  { id: 416, title: 'Longest Common Subsequence', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 417, title: '0/1 Knapsack Problem', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 418, title: 'Unbounded Knapsack', difficulty: 'Medium', companies: ['Amazon'] },
  { id: 419, title: 'Minimum Path Sum', difficulty: 'Medium', companies: ['Amazon', 'Goldman Sachs'] },
  { id: 420, title: 'Triangle', difficulty: 'Medium', companies: ['Amazon', 'Apple'] },
  { id: 421, title: 'Maximum Product Subarray', difficulty: 'Medium', companies: ['Amazon', 'LinkedIn', 'Microsoft'] },
  { id: 422, title: 'Palindrome Partitioning II', difficulty: 'Hard', companies: ['Amazon', 'Google'] },
  { id: 423, title: 'Best Time to Buy and Sell Stock III', difficulty: 'Hard', companies: ['Amazon', 'Google'] },
  { id: 424, title: 'Best Time to Buy and Sell Stock IV', difficulty: 'Hard', companies: ['Amazon'] },
  { id: 425, title: 'Best Time to Buy and Sell Stock with Cooldown', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 426, title: 'Burst Balloons', difficulty: 'Hard', companies: ['Google', 'Amazon'] },
  { id: 427, title: 'Matrix Chain Multiplication', difficulty: 'Hard', companies: ['Amazon', 'Google'] },
  { id: 428, title: 'Egg Drop Problem', difficulty: 'Hard', companies: ['Google', 'Goldman Sachs'] },
  { id: 429, title: 'Wildcard Matching', difficulty: 'Hard', companies: ['Google', 'Facebook', 'Amazon'] },
  { id: 430, title: 'Regular Expression Matching', difficulty: 'Hard', companies: ['Google', 'Facebook'] },
  { id: 431, title: 'Maximal Rectangle', difficulty: 'Hard', companies: ['Amazon', 'Google'] },
  { id: 432, title: 'Maximal Square', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Apple'] },
  { id: 433, title: 'Interleaving String', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 434, title: 'Distinct Subsequences', difficulty: 'Hard', companies: ['Google', 'Amazon'] },
  { id: 435, title: 'Minimum Cost to Cut a Stick', difficulty: 'Hard', companies: ['Amazon'] },
  { id: 436, title: 'Palindromic Substrings', difficulty: 'Medium', companies: ['Facebook', 'Amazon'] },
  { id: 437, title: 'Longest Palindromic Subsequence', difficulty: 'Medium', companies: ['Amazon', 'LinkedIn'] },
  { id: 438, title: 'Count Square Submatrices with All Ones', difficulty: 'Medium', companies: ['Google'] },
  { id: 439, title: 'Perfect Squares', difficulty: 'Medium', companies: ['Google', 'Amazon'] },
  { id: 440, title: 'Partition to K Equal Sum Subsets', difficulty: 'Medium', companies: ['LinkedIn', 'Amazon'] },
  { id: 441, title: 'Frog Jump', difficulty: 'Hard', companies: ['Amazon'] },
  { id: 442, title: 'Stone Game', difficulty: 'Medium', companies: ['Google'] },
  { id: 443, title: 'Number of Longest Increasing Subsequences', difficulty: 'Medium', companies: ['Facebook'] },
  { id: 444, title: 'Delete Operation for Two Strings', difficulty: 'Medium', companies: ['Google'] },
  { id: 445, title: 'Minimum Falling Path Sum', difficulty: 'Medium', companies: ['Google', 'Goldman Sachs'] },
  { id: 446, title: 'Integer Break', difficulty: 'Medium', companies: ['Amazon'] },
  { id: 447, title: 'Fibonacci Number', difficulty: 'Easy', companies: ['Amazon', 'Apple'] },
  { id: 448, title: 'N-th Tribonacci Number', difficulty: 'Easy', companies: ['Amazon'] },
  { id: 449, title: 'Min Cost Climbing Stairs', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'] },
  { id: 450, title: 'Counting Bits', difficulty: 'Easy', companies: ['Amazon', 'Google'] },
]);

// ─── TWO POINTERS (50) ────────────────────────────────────────────────────
const twoPointerProblems = quickTopic('Two Pointers', [
  { id: 501, title: 'Trapping Rain Water', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Goldman Sachs'] },
  { id: 502, title: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', companies: ['Amazon', 'Bloomberg'] },
  { id: 503, title: '3Sum', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'] },
  { id: 504, title: '3Sum Closest', difficulty: 'Medium', companies: ['Facebook', 'Amazon'] },
  { id: 505, title: '4Sum', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 506, title: 'Container With Most Water', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 507, title: 'Remove Duplicates from Sorted Array', difficulty: 'Easy', companies: TIER1 },
  { id: 508, title: 'Remove Element', difficulty: 'Easy', companies: ['Amazon'] },
  { id: 509, title: 'Sort Colors (Dutch National Flag)', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'] },
  { id: 510, title: 'Merge Sorted Array', difficulty: 'Easy', companies: ['Facebook', 'Amazon', 'Microsoft'] },
  { id: 511, title: 'Squares of a Sorted Array', difficulty: 'Easy', companies: ['Amazon', 'Facebook'] },
  { id: 512, title: 'Backspace String Compare', difficulty: 'Easy', companies: ['Google', 'Facebook'] },
  { id: 513, title: 'Interval List Intersections', difficulty: 'Medium', companies: ['Facebook', 'Google'] },
  { id: 514, title: 'Partition Labels', difficulty: 'Medium', companies: ['Amazon', 'Google'] },
  { id: 515, title: 'Subarray Product Less Than K', difficulty: 'Medium', companies: ['Amazon'] },
  { id: 516, title: 'Boats to Save People', difficulty: 'Medium', companies: ['Google', 'Amazon'] },
  { id: 517, title: 'Minimum Size Subarray Sum', difficulty: 'Medium', companies: ['Facebook', 'Goldman Sachs'] },
  { id: 518, title: 'Longest Mountain in Array', difficulty: 'Medium', companies: ['Google', 'Amazon'] },
  { id: 519, title: 'Shortest Word Distance', difficulty: 'Easy', companies: ['LinkedIn'] },
  { id: 520, title: 'Valid Palindrome II', difficulty: 'Easy', companies: ['Facebook', 'Amazon'] },
  { id: 521, title: 'Reverse String', difficulty: 'Easy', companies: ['Amazon', 'Apple'] },
  { id: 522, title: 'Reverse Vowels of a String', difficulty: 'Easy', companies: ['Google'] },
  { id: 523, title: 'Is Subsequence', difficulty: 'Easy', companies: ['Google', 'Amazon'] },
  { id: 524, title: 'Linked List Cycle (Fast & Slow)', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'] },
  { id: 525, title: 'Happy Number', difficulty: 'Easy', companies: ['Amazon', 'Apple'] },
  { id: 526, title: 'Middle of the Linked List', difficulty: 'Easy', companies: ['Amazon', 'Google'] },
  { id: 527, title: 'Maximum Number of Visible People in a Queue', difficulty: 'Hard', companies: ['Google'] },
  { id: 528, title: 'Closest Sum to Target', difficulty: 'Medium', companies: ['Amazon'] },
  { id: 529, title: 'Subarrays with K Different Integers', difficulty: 'Hard', companies: ['Google'] },
  { id: 530, title: 'Fruit Into Baskets', difficulty: 'Medium', companies: ['Google', 'Amazon'] },
  ...Array.from({ length: 20 }, (_, i) => ({
    id: 531 + i,
    title: ['Longest Substring with At Most Two Distinct', 'Max Consecutive Ones III', 'Get Equal Substrings Within Budget', 'Grumpy Bookstore Owner', 'Count Number of Nice Subarrays', 'Replace the Substring for Balanced String', 'Number of Substrings Containing All Three Characters', 'Count Subarrays With Score Less Than K', 'Frequency of the Most Frequent Element', 'Sliding Window Median', 'Minimum Window Subsequence', 'Minimum Operations to Reduce X to Zero', 'Maximum Erasure Value', 'Longest Subarray of 1\'s After Deleting One Element', 'Max Points on a Line', 'Smallest Range Covering Elements from K Lists', 'Minimum Difference Between Largest and Smallest', 'Take K of Each Character From Left and Right', 'Maximize the Confusion of an Exam', 'Jump Game VII'][i],
    difficulty: ['Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Hard', 'Medium', 'Hard', 'Hard', 'Medium', 'Medium', 'Medium', 'Hard', 'Hard', 'Medium', 'Medium', 'Medium', 'Medium'][i],
    companies: [['Google'], ['Google', 'Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Google'], ['Amazon'], ['Google'], ['Google', 'Amazon'], ['Google'], ['Google'], ['Amazon'], ['Amazon'], ['Amazon'], ['Google'], ['Google'], ['Amazon'], ['Google'], ['Amazon'], ['Amazon']][i]
  }))
]);

// Generate remaining topic blocks similarly
const treesProblems = quickTopic('Trees', Array.from({ length: 50 }, (_, i) => ({
  id: 601 + i,
  title: ['Binary Tree Level Order Traversal', 'Validate BST', 'Invert Binary Tree', 'Maximum Depth of Binary Tree', 'Symmetric Tree', 'Path Sum', 'Path Sum II', 'Binary Tree Zigzag Level Order', 'Construct Binary Tree from Preorder & Inorder', 'Construct Binary Tree from Inorder & Postorder', 'Flatten Binary Tree to Linked List', 'Populating Next Right Pointers', 'Binary Tree Right Side View', 'Count Good Nodes in Binary Tree', 'Lowest Common Ancestor of BST', 'Lowest Common Ancestor of Binary Tree', 'Binary Tree Maximum Path Sum', 'Serialize and Deserialize Binary Tree', 'Kth Smallest Element in a BST', 'Convert Sorted Array to BST', 'Same Tree', 'Subtree of Another Tree', 'Diameter of Binary Tree', 'Balanced Binary Tree', 'Minimum Depth of Binary Tree', 'Sum Root to Leaf Numbers', 'Binary Tree Pruning', 'Trim a BST', 'Delete Node in a BST', 'Insert into a BST', 'All Nodes Distance K in Binary Tree', 'Recover BST', 'House Robber III', 'Unique BSTs', 'Unique BSTs II', 'Sum of Left Leaves', 'Leaf-Similar Trees', 'Maximum Width of Binary Tree', 'Vertical Order Traversal', 'Binary Tree Cameras', 'Distribute Coins in Binary Tree', 'Longest Univalue Path', 'Most Frequent Subtree Sum', 'Boundary of Binary Tree', 'Check Completeness of a BT', 'Find Duplicate Subtrees', 'Smallest String Starting From Leaf', 'Binary Tree Coloring Game', 'Count Complete Tree Nodes', 'Flip Equivalent Binary Trees'][i],
  difficulty: ['Medium', 'Medium', 'Easy', 'Easy', 'Easy', 'Easy', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Hard', 'Hard', 'Medium', 'Easy', 'Easy', 'Easy', 'Easy', 'Easy', 'Easy', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Easy', 'Easy', 'Medium', 'Hard', 'Hard', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium'][i],
  companies: [TIER1, BIG4, ['Google', 'Amazon'], TIER1, ['Amazon', 'LinkedIn'], ['Amazon', 'Microsoft'], ['Amazon', 'Facebook'], ['Amazon', 'Microsoft'], ['Amazon', 'Microsoft'], ['Amazon', 'Microsoft'], ['Facebook', 'Amazon'], ['Facebook', 'Microsoft'], ['Facebook', 'Amazon'], ['Amazon', 'Microsoft'], ['Facebook', 'Amazon'], ['Facebook', 'Amazon', 'Microsoft'], ['Google', 'Amazon', 'Microsoft'], ['Facebook', 'Amazon', 'Google'], ['Amazon', 'Facebook'], ['Amazon'], ['Amazon'], ['Amazon', 'Facebook'], ['Facebook', 'Amazon'], ['Amazon', 'Bloomberg'], ['Facebook', 'Amazon'], ['Google', 'Amazon'], ['Amazon'], ['Amazon'], ['Amazon', 'Microsoft'], ['Amazon'], ['Amazon', 'Google'], ['Amazon'], ['Amazon', 'Google'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon', 'Google'], ['Facebook', 'Amazon'], ['Amazon', 'Google'], ['Amazon'], ['Google'], ['Amazon'], ['Amazon'], ['Amazon', 'Google'], ['Amazon', 'Google'], ['Amazon'], ['Google'], ['Amazon', 'Microsoft'], ['Google']][i]
})));

const backtrackingProblems = quickTopic('Backtracking', Array.from({ length: 50 }, (_, i) => ({
  id: 701 + i,
  title: ['Word Search', 'N-Queens', 'N-Queens II', 'Sudoku Solver', 'Combination Sum', 'Combination Sum II', 'Combination Sum III', 'Permutations', 'Permutations II', 'Subsets', 'Subsets II', 'Letter Combinations of a Phone Number', 'Generate Parentheses', 'Palindrome Partitioning', 'Restore IP Addresses', 'Word Search II', 'Combination Sum IV', 'All Paths From Source to Target', 'Partition to K Equal Sum Subsets', 'Beautiful Arrangement', 'Matchsticks to Square', 'Additive Number', 'Gray Code', 'Factor Combinations', 'Generalized Abbreviation', 'Target Sum (Backtrack)', 'Splitting a String Into Descending Consecutive', 'Maximum Length of a Concatenated String with Unique Characters', 'Letter Case Permutation', 'Binary Watch', 'Count Numbers with Unique Digits', 'Expression Add Operators', 'Remove Invalid Parentheses', 'Stickers to Spell Word', 'Word Ladder II', 'Verbal Arithmetic Puzzle', 'Zuma Game', 'Tiling a Rectangle with the Fewest Squares', 'Robot Room Cleaner', 'Unique Paths III', 'Path with Maximum Gold', 'Word Squares', 'Count Sorted Vowel Strings', 'Distribute Repeating Integers', 'Find Unique Binary String', 'The k-th Lexicographical String of All Happy Strings', 'Construct the Lexicographically Largest Valid Sequence', 'Number of Squareful Arrays', 'Flip Game II', 'Optimal Account Balancing'][i],
  difficulty: ['Medium', 'Hard', 'Hard', 'Hard', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Hard', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Easy', 'Medium', 'Hard', 'Hard', 'Hard', 'Hard', 'Hard', 'Hard', 'Hard', 'Hard', 'Hard', 'Medium', 'Hard', 'Easy', 'Hard', 'Medium', 'Medium', 'Medium', 'Hard', 'Medium', 'Hard'][i],
  companies: [['Amazon', 'Microsoft', 'Snapchat'], ['Amazon', 'Google', 'Microsoft'], ['Amazon'], ['Amazon', 'Google', 'Microsoft'], ['Amazon', 'Facebook'], ['Amazon'], ['Amazon'], ['Amazon', 'Microsoft', 'Facebook'], ['Amazon'], ['Amazon', 'Facebook'], ['Amazon'], ['Amazon', 'Google'], ['Amazon', 'Google', 'Facebook'], ['Amazon'], ['Amazon', 'Google'], ['Amazon', 'Google'], ['Amazon'], ['Google'], ['LinkedIn', 'Amazon'], ['Google'], ['Amazon'], ['Amazon'], ['Amazon'], ['Google'], ['Google'], ['Facebook', 'Google'], ['Google'], ['Google'], ['Amazon'], ['Google'], ['Google'], ['Google', 'Facebook'], ['Facebook', 'Amazon'], ['Google'], ['Amazon'], ['Google'], ['Amazon'], ['Google'], ['Google'], ['Amazon', 'Google'], ['Amazon'], ['Google'], ['Amazon'], ['Amazon'], ['Google'], ['Amazon'], ['Amazon'], ['Google'], ['Google', 'LinkedIn'], ['Google']][i]
})));

const designProblems = quickTopic('Design', Array.from({ length: 50 }, (_, i) => ({
  id: 801 + i,
  title: ['LRU Cache', 'LFU Cache', 'Min Stack', 'Design Twitter', 'Implement Trie', 'Design Add and Search Words', 'Design HashMap', 'Design HashSet', 'Design Circular Queue', 'Design Circular Deque', 'Insert Delete GetRandom O(1)', 'Design Snake Game', 'Design Hit Counter', 'Design File System', 'Design In-Memory File System', 'Implement Queue using Stacks', 'Implement Stack using Queues', 'Flatten Nested List Iterator', 'Peeking Iterator', 'Design Tic-Tac-Toe', 'Design Phone Directory', 'Design Search Autocomplete System', 'Stream of Characters', 'Design Underground System', 'Design Parking System', 'Design Browser History', 'Design Front Middle Back Queue', 'Design Most Recently Used Queue', 'Design a Food Rating System', 'Design Movie Rental System', 'Design a Number Container System', 'Design an ATM Machine', 'Design Bitset', 'Design a Text Editor', 'Design Log Storage System', 'Design Skiplist', 'Design a Leaderboard', 'Online Stock Span', 'Stock Price Fluctuation', 'All O(1) Data Structure', 'Snapshot Array', 'Time Based Key-Value Store', 'Find Median from Data Stream', 'Kth Largest Element in a Stream', 'Maximum Frequency Stack', 'Range Module', 'My Calendar I', 'My Calendar II', 'My Calendar III', 'Exam Room'][i],
  difficulty: ['Medium', 'Hard', 'Medium', 'Medium', 'Medium', 'Medium', 'Easy', 'Easy', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Hard', 'Easy', 'Easy', 'Medium', 'Medium', 'Medium', 'Medium', 'Hard', 'Hard', 'Medium', 'Easy', 'Medium', 'Medium', 'Hard', 'Medium', 'Hard', 'Medium', 'Medium', 'Medium', 'Hard', 'Medium', 'Hard', 'Medium', 'Medium', 'Medium', 'Hard', 'Medium', 'Medium', 'Hard', 'Easy', 'Hard', 'Hard', 'Medium', 'Medium', 'Hard', 'Medium'][i],
  companies: [BIG4, ['Amazon', 'Google'], ['Amazon', 'Bloomberg', 'Google'], ['Amazon', 'Twitter'], ['Amazon', 'Google', 'Microsoft'], ['Facebook', 'Amazon'], ['Amazon'], ['Amazon'], ['Amazon', 'Google'], ['Amazon'], ['Amazon', 'Facebook'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon', 'Google'], ['Amazon', 'Microsoft'], ['Amazon'], ['Google', 'Amazon'], ['Google'], ['Amazon', 'Facebook'], ['Google'], ['Amazon', 'Google', 'Microsoft'], ['Google'], ['Amazon'], ['Amazon'], ['Amazon', 'Google'], ['Amazon'], ['Google'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Google'], ['Google'], ['Amazon'], ['Bloomberg', 'Amazon'], ['Amazon'], ['Amazon'], ['Amazon', 'Google'], ['Google'], ['Google', 'Amazon'], ['Amazon', 'Google'], ['Amazon'], ['Amazon', 'Google'], ['Google'], ['Google'], ['Google'], ['Google'], ['Facebook', 'Google']][i]
})));

const graphsProblems = quickTopic('Graphs', Array.from({ length: 50 }, (_, i) => ({
  id: 901 + i,
  title: ['Number of Islands', 'Alien Dictionary', 'Clone Graph', 'Course Schedule', 'Course Schedule II', 'Pacific Atlantic Water Flow', 'Graph Valid Tree', 'Number of Connected Components', 'Redundant Connection', 'Accounts Merge', 'Word Ladder', 'Word Ladder II', 'Shortest Path in Binary Matrix', 'Rotting Oranges', 'Surrounded Regions', 'Walls and Gates', 'Cheapest Flights Within K Stops', 'Network Delay Time', 'Reconstruct Itinerary', 'Min Cost to Connect All Points', 'Swim in Rising Water', 'Critical Connections in a Network', 'Detect Cycle in Directed Graph', 'Detect Cycle in Undirected Graph', 'Topological Sort', 'Bipartite Graph', 'Shortest Path in Weighted Graph (Dijkstra)', 'Bellman-Ford Algorithm', 'Floyd Warshall Algorithm', 'Minimum Spanning Tree (Prim)', 'Minimum Spanning Tree (Kruskal)', 'Strongly Connected Components', 'Bridges in a Graph', 'Articulation Points', 'Disjoint Set Union (Union-Find)', 'Making A Large Island', 'Find Eventual Safe States', 'Keys and Rooms', 'Evaluate Division', 'Possible Bipartition', 'Regions Cut By Slashes', 'Maximal Network Rank', 'Count Unreachable Pairs of Nodes', 'Reachable Nodes With Restrictions', 'Minimum Number of Vertices to Reach All Nodes', 'Find if Path Exists in Graph', 'Shortest Bridge', 'All Paths From Source to Target', 'Parallel Courses', 'Time Needed to Inform All Employees'][i],
  difficulty: ['Medium', 'Hard', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Hard', 'Hard', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Hard', 'Medium', 'Hard', 'Hard', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Hard', 'Hard', 'Hard', 'Medium', 'Hard', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Easy', 'Medium', 'Medium', 'Medium', 'Medium'][i],
  companies: [['Amazon', 'Microsoft', 'Google'], ['Facebook', 'Google', 'Airbnb'], ['Amazon', 'Facebook'], ['Amazon', 'Microsoft', 'Facebook'], ['Amazon', 'Facebook'], ['Google', 'Amazon'], ['Google', 'Amazon'], ['Google', 'Amazon'], ['Google', 'Amazon'], ['Facebook', 'Amazon'], ['Amazon', 'Facebook', 'Google'], ['Amazon'], ['Amazon', 'Google'], ['Amazon', 'Microsoft'], ['Amazon', 'Google'], ['Google', 'Facebook'], ['Amazon'], ['Amazon', 'Google'], ['Google', 'Amazon'], ['Amazon'], ['Google'], ['Amazon', 'Google'], ['Amazon'], ['Amazon'], ['Amazon', 'Google'], ['Amazon'], ['Amazon', 'Google'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon', 'Google'], ['Amazon'], ['Amazon', 'Google'], ['Google', 'Amazon'], ['Google'], ['Google'], ['Google', 'Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon', 'Google'], ['Google'], ['Google'], ['Amazon', 'Google']][i]
})));

const stacksProblems = quickTopic('Stacks', Array.from({ length: 50 }, (_, i) => ({
  id: 1001 + i,
  title: ['Valid Parentheses', 'Min Stack', 'Daily Temperatures', 'Evaluate Reverse Polish Notation', 'Largest Rectangle in Histogram', 'Implement Queue using Stacks', 'Implement Stack using Queues', 'Next Greater Element I', 'Next Greater Element II', 'Decode String', 'Asteroid Collision', 'Online Stock Span', 'Remove All Adjacent Duplicates in String', 'Remove All Adjacent Duplicates in String II', 'Trapping Rain Water (Stack)', 'Basic Calculator', 'Basic Calculator II', 'Score of Parentheses', 'Minimum Remove to Make Valid Parentheses', 'Maximum Nesting Depth of Parentheses', 'Exclusive Time of Functions', 'Simplify Path', 'Remove K Digits', 'Create Maximum Number', 'Car Fleet', 'Car Fleet II', 'Sum of Subarray Minimums', 'Sum of Subarray Ranges', 'Maximum Width Ramp', 'Longest Valid Parentheses', 'Maximal Rectangle', 'Number of Visible People in a Queue', '132 Pattern', 'Remove Duplicate Letters', 'Flatten Nested List Iterator', 'Mini Parser', 'Tag Validator', 'Validate Stack Sequences', 'Maximum Frequency Stack', 'Number of Atoms', 'Shortest Subarray with Sum at Least K', 'Brace Expansion II', 'Parsing A Boolean Expression', 'Build an Array With Stack Operations', 'Make The String Great', 'Reverse Substrings Between Each Pair of Parentheses', 'Maximum Score From Removing Substrings', 'Check if Word is Valid After Substitutions', 'Robot Collisions', 'Beautiful Towers'][i],
  difficulty: ['Easy', 'Medium', 'Medium', 'Medium', 'Hard', 'Easy', 'Easy', 'Easy', 'Medium', 'Medium', 'Medium', 'Medium', 'Easy', 'Medium', 'Hard', 'Hard', 'Medium', 'Medium', 'Medium', 'Easy', 'Medium', 'Medium', 'Medium', 'Hard', 'Medium', 'Hard', 'Medium', 'Medium', 'Medium', 'Hard', 'Hard', 'Hard', 'Medium', 'Medium', 'Medium', 'Medium', 'Hard', 'Medium', 'Hard', 'Hard', 'Hard', 'Hard', 'Hard', 'Easy', 'Easy', 'Medium', 'Medium', 'Medium', 'Hard', 'Medium'][i],
  companies: [BIG4, ['Amazon', 'Bloomberg'], ['Amazon', 'Google'], ['Amazon'], ['Amazon', 'Google', 'Microsoft'], ['Amazon', 'Microsoft'], ['Amazon'], ['Amazon'], ['Amazon'], ['Google', 'Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon', 'Google'], ['Amazon', 'Google', 'Microsoft'], ['Facebook', 'Amazon'], ['Amazon'], ['Facebook', 'Amazon'], ['Amazon'], ['Amazon'], ['Facebook', 'Amazon'], ['Amazon', 'Bloomberg'], ['Google'], ['Google'], ['Amazon'], ['Amazon', 'Google'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon', 'Google'], ['Google'], ['Amazon'], ['Amazon'], ['Google', 'Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon', 'Google'], ['Amazon'], ['Google'], ['Google'], ['Google'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon'], ['Amazon']][i]
})));

// ─── COMBINE ALL PROBLEMS ──────────────────────────────────────────────────
export const allProblems = [
  ...arraysProblems,
  ...linkedListProblems,
  ...stringsProblems,
  ...binarySearchProblems,
  ...dpProblems,
  ...twoPointerProblems,
  ...treesProblems,
  ...backtrackingProblems,
  ...designProblems,
  ...graphsProblems,
  ...stacksProblems,
];

// Generate workspace-ready data indexed by id
export const problemsDataMap = {};
allProblems.forEach(p => {
  const bp = p.params ? genBoilerplates(
    p.func || 'solve',
    Array.isArray(p.params) ? (p.params.length > 0 && p.params[0].name ? p.params : [{ name: 'input', jsType: '*', cppType: 'auto', javaType: 'Object' }]) : [{ name: 'input', jsType: '*', cppType: 'auto', javaType: 'Object' }],
    p.returnType || 'number'
  ) : {
    JavaScript: `function solve(input) {\n    // Write your code here\n    \n};`,
    Python: `class Solution:\n    def solve(self, input):\n        # Write your code here\n        pass`,
    'C++': `class Solution {\npublic:\n    int solve(auto input) {\n        // Write your code here\n        \n    }\n};`,
    Java: `class Solution {\n    public int solve(Object input) {\n        // Write your code here\n        \n    }\n}`
  };

  problemsDataMap[p.id] = {
    title: p.title,
    difficulty: p.difficulty,
    topic: p.topic,
    description: p.description || `Solve the "${p.title}" problem efficiently. This is a classic ${p.difficulty.toLowerCase()}-level ${p.topic} problem frequently asked in technical interviews at top companies.`,
    constraints: p.constraints || ['See problem statement for constraints.'],
    examples: p.examples || [{ input: 'See problem statement', output: 'See expected output' }],
    hints: p.hints || [`Think about the most efficient ${p.topic} approach.`, 'Consider edge cases carefully.'],
    boilerplates: bp,
    heuristics: { keywords: ['return', 'for', 'while', 'if'], minExtra: 15 }
  };
});

// Export the listing data for IDE.jsx
export const ideQuestionsList = allProblems.map(p => ({
  id: p.id,
  title: p.title,
  difficulty: p.difficulty,
  languages: p.languages || langs,
  topic: p.topic,
  companies: p.companies || TIER1,
  status: p.status || 'Unsolved'
}));
