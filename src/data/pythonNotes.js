// ─── Python Notes ───
// Structured notes from the Python Crash Course cheat sheet
// with detailed explanations for each topic

const pythonNotes = {
  pdfUrl: '/python_notes.pdf',
  title: 'Python Complete Notes',
  subtitle: 'From Python Crash Course — A Hands-On, Project-Based Introduction',
  totalChapters: 14,
  chapters: [
    // ═══════════════════════════════════════
    //  CHAPTER 1: Variables & Data Types
    // ═══════════════════════════════════════
    {
      id: 'variables',
      title: 'Variables & Data Types',
      icon: '📦',
      color: '#3776AB',
      estimatedTime: '25 min',
      difficulty: 'Beginner',
      summary: 'Variables are the building blocks of every Python program. Unlike languages like Java or C++, Python uses dynamic typing — you don\'t need to declare a variable\'s type. Python figures it out at runtime.',
      sections: [
        {
          heading: 'What Are Variables?',
          explanation: `A variable is a label that points to a value stored in memory. Think of it as a sticky note — the name on the note is the variable name, and the value is what's written on it. In Python, you create a variable simply by assigning a value to a name using the = operator.

Unlike statically-typed languages (Java, C++), Python doesn't require you to declare a variable's type. Python determines the type at runtime based on the value you assign. This is called **dynamic typing**.`,
          code: `# Creating variables — no type declaration needed
message = "Hello, Python!"    # str (string)
age = 25                       # int (integer)
price = 19.99                  # float (decimal)
is_active = True               # bool (boolean)

# Python figures out types automatically
print(type(message))   # <class 'str'>
print(type(age))       # <class 'int'>
print(type(price))     # <class 'float'>
print(type(is_active)) # <class 'bool'>`,
          keyPoints: [
            'Variables don\'t need type declarations — Python infers the type',
            'Variable names should be lowercase with underscores (snake_case)',
            'Names can contain letters, numbers, and underscores but can\'t start with a number',
            'Python is case-sensitive: age and Age are different variables'
          ]
        },
        {
          heading: 'Naming Rules & Conventions',
          explanation: `Good variable names make your code readable. Python follows the PEP 8 style guide, which is the community-accepted standard. Use descriptive names that tell you what the variable holds. Avoid single-letter names except for loop counters (i, j, k).

**Constants** (values that should never change) are written in ALL_CAPS by convention. Python doesn't enforce this — it's just a signal to other developers.`,
          code: `# ✅ Good variable names (snake_case)
first_name = "Alice"
student_count = 42
is_logged_in = False
MAX_RETRIES = 3       # Constant — ALL_CAPS

# ❌ Bad variable names
x = "Alice"           # Not descriptive
firstName = "Alice"   # camelCase — not Pythonic
2nd_place = "Bob"     # Can't start with a number (SyntaxError)

# Multiple assignment (shorthand)
x, y, z = 1, 2, 3
a = b = c = 0         # All point to the same value`,
          keyPoints: [
            'Use snake_case for variables and functions',
            'Use ALL_CAPS for constants',
            'Never use Python keywords as variable names (if, for, class, etc.)',
            'Descriptive names > short names — readability counts'
          ]
        },
        {
          heading: 'Type Casting & Conversion',
          explanation: `Sometimes you need to convert between types — like turning a string "42" into an integer 42 so you can do math with it. This is called **type casting**. Python provides built-in functions for this: int(), float(), str(), bool().

Be careful: not all conversions work. Trying to convert "hello" to an integer will raise a ValueError.`,
          code: `# String to Number
age_str = "25"
age = int(age_str)       # 25 (integer)
pi = float("3.14")      # 3.14 (float)

# Number to String
count = 42
message = "Count: " + str(count)  # "Count: 42"

# Boolean conversions
bool(0)      # False — zero is falsy
bool(1)      # True — non-zero is truthy
bool("")     # False — empty string is falsy
bool("hi")   # True — non-empty string is truthy
bool([])     # False — empty list is falsy
bool([1,2])  # True — non-empty list is truthy

# ⚠️ This will crash:
# int("hello")  → ValueError: invalid literal`,
          keyPoints: [
            'int(), float(), str(), bool() are the main casting functions',
            'Be careful: invalid conversions raise ValueError',
            'Zero, empty strings, empty lists, and None are "falsy" in Python',
            'Everything else is "truthy"'
          ]
        }
      ],
      interviewTip: 'Interviewers love asking about Python\'s dynamic typing vs static typing. Key answer: Python checks types at runtime (dynamic), Java checks at compile time (static). Python uses duck typing — "if it walks like a duck, it\'s a duck."'
    },

    // ═══════════════════════════════════════
    //  CHAPTER 2: Strings
    // ═══════════════════════════════════════
    {
      id: 'strings',
      title: 'Strings & Text Processing',
      icon: '📝',
      color: '#E44D26',
      estimatedTime: '30 min',
      difficulty: 'Beginner',
      summary: 'Strings are sequences of characters. In Python, they\'re immutable — once created, you can\'t change individual characters. But you can create new strings from existing ones using methods, slicing, and f-strings.',
      sections: [
        {
          heading: 'String Basics & Methods',
          explanation: `Strings in Python are **immutable** — this is a crucial concept. When you call .upper() on a string, it doesn't modify the original; it creates a new string. This matters for performance with large strings and is a common interview question.

Python provides over 40 built-in string methods. The most commonly used ones are listed below.`,
          code: `name = "alice johnson"

# Case methods — return NEW strings (original unchanged)
print(name.title())    # "Alice Johnson"
print(name.upper())    # "ALICE JOHNSON"
print(name.lower())    # "alice johnson"

# Searching
print(name.find("john"))     # 6 (index where found)
print(name.find("xyz"))      # -1 (not found)
print("alice" in name)       # True (membership test)
print(name.count("o"))       # 2

# Modification
print(name.replace("alice", "bob"))  # "bob johnson"
print("  hello  ".strip())          # "hello" (removes whitespace)
print("  hello  ".lstrip())         # "hello  " (left only)

# Splitting and Joining
words = "python is awesome".split()  # ["python", "is", "awesome"]
joined = "-".join(words)             # "python-is-awesome"

# Checking content
print("hello123".isalnum())   # True (letters + numbers)
print("hello".isalpha())      # True (letters only)
print("12345".isdigit())      # True (digits only)`,
          keyPoints: [
            'Strings are immutable — methods return new strings',
            'Use .find() to search (returns -1 if not found)',
            'Use "in" keyword for membership testing',
            '.split() and .join() are essential for text processing'
          ]
        },
        {
          heading: 'String Slicing',
          explanation: `Slicing lets you extract portions of a string using the syntax string[start : stop : step]. The start index is inclusive, the stop index is exclusive. Think of it as: "start at this index, go up to (but not including) this index."

Negative indices count from the end: -1 is the last character, -2 is second-to-last, etc. This is incredibly useful and comes up constantly in interviews.`,
          code: `s = "Hello, World!"

# Basic slicing [start:stop]
print(s[0:5])    # "Hello" — characters 0,1,2,3,4
print(s[7:12])   # "World"

# Omitting indices
print(s[:5])     # "Hello" — from beginning to index 5
print(s[7:])     # "World!" — from index 7 to end

# Negative indices (count from end)
print(s[-6:])    # "orld!" — last 6 characters
print(s[-6:-1])  # "orld"  — last 6, excluding last 1

# Step parameter [start:stop:step]
print(s[::2])    # "Hlo ol!" — every 2nd character
print(s[::-1])   # "!dlroW ,olleH" — REVERSE the string

# Common interview pattern: Check palindrome
word = "racecar"
is_palindrome = word == word[::-1]  # True`,
          keyPoints: [
            'Slicing syntax: string[start:stop:step]',
            'Start is inclusive, stop is exclusive',
            'Negative indices count from the end',
            's[::-1] reverses a string — very common in interviews'
          ]
        },
        {
          heading: 'F-Strings (Formatted String Literals)',
          explanation: `F-strings (introduced in Python 3.6) are the modern, preferred way to format strings. They're faster and more readable than older methods like .format() or % formatting. You prefix the string with f and put expressions inside {curly braces}.

F-strings can contain any valid Python expression — math, function calls, even conditional expressions.`,
          code: `name = "Alice"
age = 30
salary = 75000.50

# Basic f-string
greeting = f"Hello, {name}! You are {age} years old."

# Expressions inside f-strings
print(f"Next year you'll be {age + 1}")
print(f"Name uppercase: {name.upper()}")

# Number formatting
print(f"Salary: \${salary:,.2f}")      # "$75,000.50"
print(f"Percentage: {0.856:.1%}")     # "85.6%"
print(f"Binary: {42:b}")              # "101010"
print(f"Padded: {42:05d}")            # "00042"

# Alignment
print(f"{'Left':<20}")    # "Left                "
print(f"{'Center':^20}")  # "       Center       "
print(f"{'Right':>20}")   # "               Right"

# Multi-line f-string
info = (
    f"Name: {name}\\n"
    f"Age: {age}\\n"
    f"Salary: \${salary:,.2f}"
)`,
          keyPoints: [
            'F-strings are the preferred formatting method since Python 3.6',
            'Use :.2f for 2 decimal places, :, for comma separators',
            'Any valid Python expression works inside { }',
            'F-strings are faster than .format() and % formatting'
          ]
        }
      ],
      interviewTip: 'String questions are everywhere in coding interviews. Master slicing (especially [::-1] for reversal), know that strings are immutable (important for space complexity analysis), and practice problems like "reverse words in a string" and "check if two strings are anagrams."'
    },

    // ═══════════════════════════════════════
    //  CHAPTER 3: Lists
    // ═══════════════════════════════════════
    {
      id: 'lists',
      title: 'Lists & List Operations',
      icon: '📋',
      color: '#2ECC71',
      estimatedTime: '35 min',
      difficulty: 'Beginner',
      summary: 'Lists are Python\'s most versatile data structure. They\'re ordered, mutable, and can hold any type of data. Understanding lists deeply — including time complexity of operations — is critical for coding interviews.',
      sections: [
        {
          heading: 'Creating & Modifying Lists',
          explanation: `Lists in Python are **mutable** — you can change, add, and remove elements after creation. They're implemented as dynamic arrays (not linked lists), which means:
- Accessing by index: O(1) — instant
- Appending to end: O(1) amortized — fast
- Inserting at beginning: O(n) — slow (everything shifts)
- Searching for an element: O(n) — linear scan

This is the kind of knowledge that impresses interviewers.`,
          code: `# Creating lists
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]  # Mixed types allowed
empty = []

# Adding elements
fruits.append("mango")        # Add to end → O(1)
fruits.insert(0, "avocado")   # Insert at index → O(n)
fruits.extend(["grape", "kiwi"])  # Add multiple items

# Removing elements
fruits.remove("banana")       # Remove by value → O(n)
popped = fruits.pop()         # Remove & return last → O(1)
popped_idx = fruits.pop(0)    # Remove & return at index → O(n)
del fruits[1]                 # Delete at index

# Sorting
numbers.sort()                # Sort in-place (modifies original)
numbers.sort(reverse=True)    # Sort descending
sorted_copy = sorted(numbers) # Returns new sorted list

# Useful functions
print(len(fruits))     # Length
print(min(numbers))    # Minimum
print(max(numbers))    # Maximum
print(sum(numbers))    # Sum`,
          keyPoints: [
            'Lists are mutable dynamic arrays, not linked lists',
            '.append() is O(1), .insert(0, x) is O(n)',
            '.sort() modifies in-place, sorted() returns a new list',
            'Lists can hold mixed types, but this is usually bad practice'
          ]
        },
        {
          heading: 'List Comprehensions',
          explanation: `List comprehensions are a Python superpower — they let you create lists in a single, readable line. They're not just syntactic sugar; they're actually faster than equivalent for loops because they're optimized at the bytecode level.

Every Python developer should be fluent in list comprehensions. They come up in almost every interview.`,
          code: `# Basic: Create a list of squares
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition (filtering)
evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Transform + filter
big_squares = [x**2 for x in range(20) if x**2 > 50]
# [64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361]

# Nested list comprehension (2D matrix)
matrix = [[0] * 3 for _ in range(3)]
# [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

# ⚠️ Common mistake with 2D lists:
# wrong = [[0] * 3] * 3  # All rows point to SAME list!
# wrong[0][0] = 1  → [[1,0,0], [1,0,0], [1,0,0]] — Bug!

# String processing with comprehension
names = ["alice", "bob", "charlie"]
upper = [name.upper() for name in names]

# Flatten a 2D list
nested = [[1, 2], [3, 4], [5, 6]]
flat = [x for row in nested for x in row]
# [1, 2, 3, 4, 5, 6]`,
          keyPoints: [
            'List comprehensions are faster than for loops',
            'Syntax: [expression for item in iterable if condition]',
            'Use _ as variable name when the value isn\'t needed',
            '⚠️ Never use [[val]*n]*m for 2D lists — it creates shared references'
          ]
        },
        {
          heading: 'Slicing & Copying',
          explanation: `Slicing works exactly like string slicing (because strings are just sequences of characters, and lists are sequences of any values). The critical thing to understand is **shallow vs deep copying** — this is a very common interview topic.

A slice creates a **shallow copy** — changes to the copy won't affect the original for simple values, but for nested lists, the inner lists are still shared!`,
          code: `nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Slicing — same as strings
print(nums[2:5])    # [2, 3, 4]
print(nums[:3])     # [0, 1, 2]
print(nums[-3:])    # [7, 8, 9]
print(nums[::2])    # [0, 2, 4, 6, 8] — every 2nd
print(nums[::-1])   # [9, 8, 7, ...] — reversed

# ── Copying lists ──
# Method 1: Slice copy (shallow)
copy1 = nums[:]

# Method 2: .copy() method (shallow)
copy2 = nums.copy()

# Method 3: list() constructor (shallow)
copy3 = list(nums)

# ⚠️ Assignment is NOT copying!
not_a_copy = nums   # Both point to SAME list
not_a_copy[0] = 99  # This changes nums too!

# Deep copy for nested lists
import copy
nested = [[1, 2], [3, 4]]
deep = copy.deepcopy(nested)
deep[0][0] = 99     # Original is NOT affected`,
          keyPoints: [
            'Slicing creates a shallow copy',
            'Assignment (=) does NOT copy — both variables point to same list',
            'Use copy.deepcopy() for nested data structures',
            'This shallow vs deep copy distinction is a top interview topic'
          ]
        }
      ],
      interviewTip: 'Lists are the backbone of Python interviews. Know the time complexity of every operation. Practice: Two Sum, Remove Duplicates, Merge Sorted Lists, Product of Array Except Self. Always discuss whether you need a copy or a reference.'
    },

    // ═══════════════════════════════════════
    //  CHAPTER 4: Dictionaries
    // ═══════════════════════════════════════
    {
      id: 'dictionaries',
      title: 'Dictionaries & Hashmaps',
      icon: '🗂️',
      color: '#9B59B6',
      estimatedTime: '30 min',
      difficulty: 'Beginner',
      summary: 'Dictionaries are Python\'s implementation of hash maps — one of the most important data structures in computer science. They provide O(1) average-case lookups, insertions, and deletions. If you learn only one data structure deeply, make it this one.',
      sections: [
        {
          heading: 'Dictionary Basics',
          explanation: `Dictionaries store key-value pairs. Under the hood, they use a hash table — Python hashes the key to compute a memory address where the value is stored. This gives O(1) average-case performance for lookups.

Keys must be **hashable** (immutable) — strings, numbers, tuples work. Lists and dicts cannot be keys because they're mutable.`,
          code: `# Creating dictionaries
person = {
    "name": "Alice",
    "age": 30,
    "city": "NYC"
}

# Accessing values
print(person["name"])              # "Alice"
print(person.get("email", "N/A")) # "N/A" (safe access)

# ⚠️ person["email"] would raise KeyError!
# .get() returns None (or default) if key doesn't exist

# Adding & modifying
person["email"] = "alice@mail.com"  # Add new key
person["age"] = 31                  # Update existing

# Removing
del person["city"]                  # Delete by key
email = person.pop("email")        # Remove & return value
person.setdefault("role", "user")  # Set only if key missing

# Checking existence
if "name" in person:    # O(1) — very fast!
    print("Has name")

# Useful methods
print(person.keys())    # All keys
print(person.values())  # All values
print(person.items())   # All (key, value) pairs`,
          keyPoints: [
            'Dictionaries provide O(1) average lookups — hash table underneath',
            'Use .get(key, default) instead of dict[key] to avoid KeyError',
            'Keys must be immutable (hashable): str, int, tuple ✅ | list, dict ❌',
            '"in" operator checks if a key exists — O(1) time'
          ]
        },
        {
          heading: 'Iteration & Comprehensions',
          explanation: `Looping through dictionaries is essential. You can iterate over keys, values, or both using .items(). Dictionary comprehensions let you create dictionaries in a single line — just like list comprehensions but with key: value pairs.`,
          code: `scores = {"Alice": 95, "Bob": 87, "Charlie": 92}

# Loop through keys (default behavior)
for name in scores:
    print(name)

# Loop through key-value pairs
for name, score in scores.items():
    print(f"{name}: {score}")

# Loop through values only
for score in scores.values():
    print(score)

# Dictionary comprehension
squares = {x: x**2 for x in range(6)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Filtering with comprehension
high_scores = {k: v for k, v in scores.items() if v >= 90}
# {"Alice": 95, "Charlie": 92}

# Inverting a dictionary
inverted = {v: k for k, v in scores.items()}
# {95: "Alice", 87: "Bob", 92: "Charlie"}

# Merging dictionaries (Python 3.9+)
defaults = {"theme": "dark", "lang": "en"}
user_prefs = {"lang": "fr", "font": "large"}
merged = defaults | user_prefs
# {"theme": "dark", "lang": "fr", "font": "large"}`,
          keyPoints: [
            '.items() returns key-value pairs — most useful for iteration',
            'Dict comprehensions: {key: value for item in iterable}',
            'Python 3.9+ supports | operator for merging dicts',
            'Dictionaries maintain insertion order (Python 3.7+)'
          ]
        }
      ],
      interviewTip: 'Dictionaries (hashmaps) are the secret weapon for most interview problems. Any time you need O(1) lookup, think dictionary. Classic patterns: frequency counting, two-sum with complement lookup, grouping anagrams, and LRU cache implementation.'
    },

    // ═══════════════════════════════════════
    //  CHAPTER 5: Control Flow
    // ═══════════════════════════════════════
    {
      id: 'control-flow',
      title: 'If Statements & Control Flow',
      icon: '🔀',
      color: '#E67E22',
      estimatedTime: '20 min',
      difficulty: 'Beginner',
      summary: 'Control flow determines the order in which code executes. Master if/elif/else for branching, for/while for loops, and break/continue for flow control. These are fundamental to every algorithm you\'ll ever write.',
      sections: [
        {
          heading: 'Conditional Statements',
          explanation: `Python uses if/elif/else for branching logic. Unlike many languages, Python uses **indentation** (not curly braces) to define code blocks. This enforces readable code.

Python also supports ternary expressions (conditional expressions) for simple one-line conditions.`,
          code: `age = 20

# Basic if/elif/else
if age >= 21:
    print("Can drink and vote")
elif age >= 18:
    print("Can vote but not drink")
elif age >= 16:
    print("Can drive")
else:
    print("Too young")

# Ternary expression (one-liner)
status = "adult" if age >= 18 else "minor"

# Checking multiple conditions
has_ticket = True
has_id = True
if has_ticket and has_id:
    print("Welcome!")

# Truthiness — these are all "falsy" in Python:
# False, None, 0, 0.0, "", [], {}, set()
# Everything else is "truthy"

items = []
if not items:
    print("List is empty")  # This runs — [] is falsy

# Match statement (Python 3.10+) — like switch/case
command = "start"
match command:
    case "start":
        print("Starting...")
    case "stop":
        print("Stopping...")
    case _:
        print("Unknown command")`,
          keyPoints: [
            'Python uses indentation (4 spaces) instead of curly braces',
            'elif is Python\'s version of "else if"',
            'Ternary: value_if_true if condition else value_if_false',
            'Python 3.10+ has match/case (structural pattern matching)'
          ]
        },
        {
          heading: 'Loops: for & while',
          explanation: `Python's for loop iterates over any iterable (list, string, range, dict, etc.) — it doesn't use a traditional counter like C/Java. The while loop runs as long as a condition is True. Use break to exit a loop early, continue to skip to the next iteration.

The enumerate() function is essential — it gives you both the index and the value during iteration, which is cleaner than maintaining a manual counter.`,
          code: `# For loop with range
for i in range(5):
    print(i)         # 0, 1, 2, 3, 4

# For loop over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# enumerate — get index AND value (very Pythonic)
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")  # 0: apple, 1: banana, 2: cherry

# While loop
count = 0
while count < 5:
    print(count)
    count += 1

# break — exit loop immediately
for num in range(100):
    if num > 10:
        break       # Stop at 11
    print(num)

# continue — skip current iteration
for num in range(10):
    if num % 2 == 0:
        continue    # Skip even numbers
    print(num)      # Prints only odd: 1, 3, 5, 7, 9

# for-else (runs if loop completes WITHOUT break)
for n in range(2, 10):
    for i in range(2, n):
        if n % i == 0:
            break
    else:
        print(f"{n} is prime")`,
          keyPoints: [
            'for loops iterate over iterables — no manual counter needed',
            'Use enumerate() for index + value — more Pythonic than range(len())',
            'break exits the loop, continue skips to next iteration',
            'for-else is unique to Python — else runs only if no break occurred'
          ]
        }
      ],
      interviewTip: 'Control flow is the foundation of every algorithm. Common patterns: early return (return inside a loop to exit a function), two-pointer technique (while loop with two indices), and sliding window (for loop with adjustable window). Master these patterns.'
    },

    // ═══════════════════════════════════════
    //  CHAPTER 6: Functions
    // ═══════════════════════════════════════
    {
      id: 'functions',
      title: 'Functions & Scope',
      icon: '⚙️',
      color: '#1ABC9C',
      estimatedTime: '35 min',
      difficulty: 'Beginner-Intermediate',
      summary: 'Functions are reusable blocks of code. Python functions are first-class objects — you can pass them as arguments, return them from other functions, and store them in variables. This enables powerful patterns like decorators, callbacks, and closures.',
      sections: [
        {
          heading: 'Defining & Calling Functions',
          explanation: `Functions in Python are defined with the def keyword. They can take parameters, return values, and have docstrings for documentation. Parameters can have default values, and you can use *args for variable positional arguments and **kwargs for variable keyword arguments.

Python functions are **first-class objects** — they can be assigned to variables, passed as arguments, and returned from other functions. This is a key concept.`,
          code: `# Basic function with docstring
def greet(name):
    """Return a greeting message."""
    return f"Hello, {name}!"

print(greet("Alice"))   # "Hello, Alice!"

# Default parameters
def power(base, exp=2):
    return base ** exp

print(power(3))         # 9 (uses default exp=2)
print(power(2, 10))     # 1024

# *args — variable positional arguments (tuple)
def add_all(*numbers):
    return sum(numbers)

print(add_all(1, 2, 3, 4, 5))  # 15

# **kwargs — variable keyword arguments (dict)
def build_profile(**info):
    return info

profile = build_profile(name="Alice", role="SDE", exp=3)
# {"name": "Alice", "role": "SDE", "exp": 3}

# Combining all parameter types
def func(a, b, *args, key="default", **kwargs):
    print(f"a={a}, b={b}, args={args}")
    print(f"key={key}, kwargs={kwargs}")

func(1, 2, 3, 4, key="custom", x=10, y=20)`,
          keyPoints: [
            'Functions are first-class objects in Python',
            '*args captures extra positional arguments as a tuple',
            '**kwargs captures extra keyword arguments as a dictionary',
            'Always write docstrings — they\'re accessible via help(func)'
          ]
        },
        {
          heading: 'Lambda & Higher-Order Functions',
          explanation: `Lambda functions are anonymous one-liners — a shorthand for simple functions. They're commonly used with higher-order functions like map(), filter(), and sorted().

Higher-order functions are functions that take other functions as arguments or return functions. This is a core concept in functional programming and comes up frequently in Python.`,
          code: `# Lambda — anonymous function
square = lambda x: x ** 2
add = lambda a, b: a + b

print(square(5))    # 25
print(add(3, 4))    # 7

# map() — apply function to every element
nums = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, nums))
# [2, 4, 6, 8, 10]

# filter() — keep elements that pass test
evens = list(filter(lambda x: x % 2 == 0, nums))
# [2, 4]

# sorted() with key function
students = [("Alice", 92), ("Bob", 85), ("Charlie", 97)]
by_score = sorted(students, key=lambda s: s[1], reverse=True)
# [("Charlie", 97), ("Alice", 92), ("Bob", 85)]

# reduce() — accumulate values
from functools import reduce
product = reduce(lambda a, b: a * b, nums)
# 1 * 2 * 3 * 4 * 5 = 120

# ── Prefer comprehensions over map/filter ──
# More Pythonic:
doubled = [x * 2 for x in nums]
evens = [x for x in nums if x % 2 == 0]`,
          keyPoints: [
            'Lambda functions are limited to single expressions',
            'List comprehensions are usually preferred over map/filter',
            'sorted() key parameter is incredibly useful — learn it well',
            'reduce() is in functools, not a built-in'
          ]
        }
      ],
      interviewTip: 'Know the difference between pass-by-reference and pass-by-value. Python is "pass by object reference" — mutable objects (lists, dicts) can be modified inside functions. Immutable objects (int, str, tuple) cannot be changed — a new object is created instead.'
    },

    // ═══════════════════════════════════════
    //  CHAPTER 7: Classes & OOP
    // ═══════════════════════════════════════
    {
      id: 'oop',
      title: 'Classes & Object-Oriented Programming',
      icon: '🏗️',
      color: '#E74C3C',
      estimatedTime: '40 min',
      difficulty: 'Intermediate',
      summary: 'OOP lets you model real-world entities as objects with attributes (data) and methods (behavior). Python supports all four OOP pillars: Encapsulation, Inheritance, Polymorphism, and Abstraction. Understanding OOP is essential for system design and clean code.',
      sections: [
        {
          heading: 'Classes & Objects',
          explanation: `A class is a blueprint; an object is an instance of that class. The __init__ method is the constructor — it runs automatically when you create a new object. The self parameter refers to the current instance (like "this" in Java/JavaScript).

Python uses **name mangling** for privacy: _single_underscore is "protected" (convention only), __double_underscore is "private" (name mangled but still accessible).`,
          code: `class Dog:
    """A model for a dog."""
    
    # Class variable — shared by ALL instances
    species = "Canis lupus familiaris"
    total_dogs = 0
    
    def __init__(self, name, breed, age):
        # Instance variables — unique to each object
        self.name = name         # Public
        self._breed = breed      # Protected (convention)
        self.__age = age         # Private (name mangled)
        Dog.total_dogs += 1
    
    def speak(self):
        return f"{self.name} says Woof!"
    
    def birthday(self):
        self.__age += 1
        return f"{self.name} is now {self.__age}!"
    
    def __str__(self):
        return f"Dog({self.name}, {self._breed})"
    
    def __repr__(self):
        return f"Dog(name={self.name!r}, breed={self._breed!r})"

# Creating objects
rex = Dog("Rex", "German Shepherd", 3)
luna = Dog("Luna", "Golden Retriever", 5)

print(rex.speak())       # "Rex says Woof!"
print(rex)               # "Dog(Rex, German Shepherd)"
print(Dog.total_dogs)    # 2`,
          keyPoints: [
            '__init__ is the constructor — called when creating objects',
            'self refers to the current instance (like "this" in Java)',
            'Class variables are shared; instance variables are unique',
            '__str__ controls print() output, __repr__ is for debugging'
          ]
        },
        {
          heading: 'Inheritance & Polymorphism',
          explanation: `Inheritance lets you create specialized classes from general ones. The child class inherits all attributes and methods from the parent, and can override or extend them. super() calls the parent class's methods.

Polymorphism means "same interface, different behavior" — a method can behave differently based on the object that calls it.`,
          code: `class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return f"{self.name} makes a sound"

# Inheritance — Dog IS-A Animal
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)    # Call parent constructor
        self.breed = breed
    
    def speak(self):              # Override (Polymorphism)
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):              # Override
        return f"{self.name} says Meow!"

# Polymorphism in action
animals = [Dog("Rex", "Lab"), Cat("Whiskers"), Animal("Parrot")]
for animal in animals:
    print(animal.speak())
# "Rex says Woof!"
# "Whiskers says Meow!"
# "Parrot makes a sound"

# Check inheritance
print(isinstance(Dog("Rex", "Lab"), Animal))  # True
print(issubclass(Dog, Animal))                # True

# @property — computed attributes
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius can't be negative")
        self._radius = value
    
    @property
    def area(self):
        import math
        return math.pi * self._radius ** 2`,
          keyPoints: [
            'super().__init__() calls the parent constructor',
            'Method overriding = Polymorphism',
            '@property creates getter/setter pairs for controlled access',
            'isinstance() and issubclass() check inheritance relationships'
          ]
        }
      ],
      interviewTip: 'OOP is critical for system design interviews. Know SOLID principles — especially Single Responsibility and Open/Closed. Practice designing classes for: Parking Lot, Library Management, Card Deck, and LinkedIn/Twitter basic models.'
    },

    // ═══════════════════════════════════════
    //  CHAPTER 8: File Handling
    // ═══════════════════════════════════════
    {
      id: 'files',
      title: 'File Handling & I/O',
      icon: '📁',
      color: '#F39C12',
      estimatedTime: '20 min',
      difficulty: 'Beginner-Intermediate',
      summary: 'Working with files is a core programming skill. Python makes file I/O simple with the open() function and context managers (with statement). Always use "with" to ensure files are properly closed, even if an error occurs.',
      sections: [
        {
          heading: 'Reading & Writing Files',
          explanation: `Python's pathlib module (modern approach) and built-in open() function handle file operations. The with statement is a context manager that automatically closes the file when you're done — even if an exception occurs. This prevents resource leaks.

File modes: 'r' = read, 'w' = write (overwrites!), 'a' = append, 'r+' = read+write.`,
          code: `from pathlib import Path

# ── Modern approach: pathlib ──
path = Path("notes.txt")

# Write to file
path.write_text("Hello, World!\\nPython is great!")

# Read entire file
content = path.read_text()
print(content)

# Read lines
lines = content.splitlines()
for line in lines:
    print(line)

# ── Classic approach: open() ──
# Writing
with open("output.txt", "w") as f:
    f.write("Line 1\\n")
    f.write("Line 2\\n")

# Reading
with open("output.txt", "r") as f:
    for line in f:
        print(line.strip())

# Appending
with open("output.txt", "a") as f:
    f.write("Line 3\\n")

# ── JSON files ──
import json

data = {"name": "Alice", "scores": [95, 87, 92]}

# Write JSON
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

# Read JSON
with open("data.json", "r") as f:
    loaded = json.load(f)
    print(loaded["name"])  # "Alice"`,
          keyPoints: [
            'Always use "with" statement — it auto-closes the file',
            '"w" mode overwrites the file! Use "a" for appending',
            'pathlib.Path is the modern, preferred approach',
            'json.dump() writes, json.load() reads JSON files'
          ]
        }
      ],
      interviewTip: 'File handling questions often appear in take-home assignments and system design. Know how to process large files line-by-line (don\'t load the entire file into memory), and understand the difference between text and binary modes.'
    },

    // ═══════════════════════════════════════
    //  CHAPTER 9: Error Handling
    // ═══════════════════════════════════════
    {
      id: 'errors',
      title: 'Error Handling & Exceptions',
      icon: '🛡️',
      color: '#E74C3C',
      estimatedTime: '25 min',
      difficulty: 'Intermediate',
      summary: 'Robust code handles errors gracefully. Python uses try/except blocks for exception handling. Understanding when to catch, when to raise, and when to let exceptions propagate is a sign of an experienced developer.',
      sections: [
        {
          heading: 'try/except/else/finally',
          explanation: `Python's exception handling has four parts:
- **try**: Code that might raise an exception
- **except**: Code to run if an exception occurs
- **else**: Code to run if NO exception occurred (often overlooked but very useful)
- **finally**: Code that ALWAYS runs — for cleanup

The else block is key: it separates "risky" code (try) from "success" code (else), making it clear which lines might fail.`,
          code: `# Basic exception handling
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Can't divide by zero!")

# Multiple exception types
try:
    value = int("abc")
except (ValueError, TypeError) as e:
    print(f"Error: {e}")

# Full pattern: try/except/else/finally
try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found!")
    content = None
else:
    # Runs ONLY if no exception occurred
    print(f"Read {len(content)} characters")
finally:
    # ALWAYS runs — cleanup code
    print("Operation complete")

# Raising your own exceptions
def set_age(age):
    if age < 0:
        raise ValueError(f"Age can't be negative: {age}")
    return age

# Custom exception class
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(
            f"Can't withdraw \${amount}, balance is \${balance}"
        )`,
          keyPoints: [
            'Always catch specific exceptions, not bare except:',
            'else block runs only if try succeeded — separates risky code',
            'finally always runs — perfect for cleanup (closing files, connections)',
            'raise lets you throw your own exceptions'
          ]
        }
      ],
      interviewTip: 'In interviews, show you can handle edge cases. Use try/except for operations that might fail (division, type conversion, file access). Creating custom exception classes shows advanced OOP understanding. Never use bare "except:" — always catch specific exceptions.'
    },

    // ═══════════════════════════════════════
    //  CHAPTER 10: Modules & Packages
    // ═══════════════════════════════════════
    {
      id: 'modules',
      title: 'Modules, Packages & Virtual Environments',
      icon: '📦',
      color: '#3498DB',
      estimatedTime: '20 min',
      difficulty: 'Beginner-Intermediate',
      summary: 'Modules let you organize code into reusable files. Packages are collections of modules. Virtual environments isolate project dependencies. Understanding this is essential for any real-world Python project.',
      sections: [
        {
          heading: 'Importing & Creating Modules',
          explanation: `A module is simply a .py file. When you import a module, Python executes all the code in that file. The __name__ guard (if __name__ == "__main__") lets you write code that only runs when the file is executed directly, not when imported.

Virtual environments (venv) create isolated Python installations so each project has its own dependencies — essential for professional development.`,
          code: `# Different ways to import
import math                    # Full module
from math import sqrt, pi     # Specific items
from datetime import datetime as dt  # With alias
from collections import *     # Import all (avoid this!)

# Using imported modules
print(math.sqrt(144))    # 12.0
print(pi)                # 3.14159...
print(dt.now())          # Current datetime

# Essential standard library modules
import os        # OS operations
import sys       # System parameters
import json      # JSON encoding/decoding
import re        # Regular expressions
import random    # Random number generation
from pathlib import Path  # Modern file paths

# collections — powerful data structures
from collections import Counter, defaultdict, deque

words = ["apple", "banana", "apple", "cherry"]
count = Counter(words)
print(count.most_common(2))  # [("apple", 2), ...]

# __name__ guard — very important!
if __name__ == "__main__":
    # This code runs ONLY when file is executed directly
    # NOT when imported as a module
    print("Running as main script")

# Virtual environments (terminal commands)
# python -m venv myenv          # Create
# source myenv/bin/activate     # Activate (Mac/Linux)
# pip install requests          # Install packages
# pip freeze > requirements.txt # Save dependencies`,
          keyPoints: [
            'import MODULE for full module, from MODULE import ITEM for specific items',
            '__name__ == "__main__" guard prevents code from running on import',
            'Virtual environments isolate project dependencies — always use them',
            'requirements.txt tracks dependencies — essential for collaboration'
          ]
        }
      ],
      interviewTip: 'Knowing the standard library sets you apart. Key modules: collections (Counter, defaultdict, deque), itertools (combinations, permutations), functools (lru_cache, reduce), heapq (min-heap operations). These come up constantly in DSA interviews.'
    },

    // ═══════════════════════════════════════
    //  CHAPTER 11: Testing
    // ═══════════════════════════════════════
    {
      id: 'testing',
      title: 'Testing Your Code',
      icon: '🧪',
      color: '#16A085',
      estimatedTime: '25 min',
      difficulty: 'Intermediate',
      summary: 'Testing proves your code works correctly and protects against future bugs. Python\'s pytest framework makes writing tests simple and enjoyable. Writing tests is a professional skill that employers actively look for.',
      sections: [
        {
          heading: 'Writing Tests with pytest',
          explanation: `pytest is the most popular Python testing framework. Test functions must start with test_. You use assert statements to check expected outcomes. If the assert fails, pytest reports exactly what went wrong.

Test-Driven Development (TDD) means writing tests BEFORE writing code — it helps you think clearly about requirements.`,
          code: `# ── Code to test (save as calculator.py) ──
def add(a, b):
    """Add two numbers."""
    return a + b

def divide(a, b):
    """Divide a by b."""
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# ── Tests (save as test_calculator.py) ──
from calculator import add, divide
import pytest

def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
    assert add(0, 0) == 0

def test_add_floats():
    result = add(0.1, 0.2)
    assert abs(result - 0.3) < 1e-9  # Float comparison

def test_divide():
    assert divide(10, 2) == 5
    assert divide(7, 2) == 3.5

def test_divide_by_zero():
    with pytest.raises(ValueError):
        divide(10, 0)

# ── Fixtures (shared setup) ──
@pytest.fixture
def sample_data():
    return [3, 1, 4, 1, 5, 9, 2, 6]

def test_sort(sample_data):
    assert sorted(sample_data) == [1, 1, 2, 3, 4, 5, 6, 9]

# Run tests:  $ pytest -v`,
          keyPoints: [
            'Test function names must start with test_',
            'Use assert statements to check expected outcomes',
            'pytest.raises() tests that exceptions are raised correctly',
            'Fixtures provide reusable test setup — @pytest.fixture decorator'
          ]
        }
      ],
      interviewTip: 'Many companies ask "how would you test this?" during interviews. Structure: test the happy path first, then edge cases (empty input, None, negative numbers, very large input), then error cases. Mention pytest, fixtures, and code coverage.'
    },

    // ═══════════════════════════════════════
    //  CHAPTER 12: Decorators & Advanced
    // ═══════════════════════════════════════
    {
      id: 'advanced',
      title: 'Decorators, Generators & Advanced Topics',
      icon: '🔮',
      color: '#8E44AD',
      estimatedTime: '40 min',
      difficulty: 'Advanced',
      summary: 'Advanced Python features like decorators, generators, context managers, and comprehensions separate junior developers from senior ones. These patterns are used extensively in frameworks like Django, Flask, and FastAPI.',
      sections: [
        {
          heading: 'Decorators',
          explanation: `A decorator is a function that takes another function and extends its behavior without modifying it. Decorators use the @syntax and are used everywhere in Python frameworks (Flask routes, Django views, pytest fixtures).

Under the hood, @decorator is syntactic sugar for: func = decorator(func).`,
          code: `import functools
import time

# Basic decorator — adds timing to any function
def timer(func):
    @functools.wraps(func)  # Preserve original function info
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer    # Equivalent to: slow_fn = timer(slow_fn)
def slow_fn():
    time.sleep(1)
    return "done"

# Decorator with parameters
def repeat(n):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

# Built-in decorators you should know:
# @property — getter/setter for class attributes
# @staticmethod — method that doesn't need self
# @classmethod — method that gets class as first arg
# @functools.lru_cache — automatic memoization!

@functools.lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(100))  # Instant! (without cache: would take forever)`,
          keyPoints: [
            'Decorators wrap functions to extend their behavior',
            '@functools.wraps preserves the original function\'s metadata',
            '@functools.lru_cache is automatic memoization — game changer for recursion',
            'Decorators are used in Flask (@app.route), Django (@login_required), etc.'
          ]
        },
        {
          heading: 'Generators & Iterators',
          explanation: `Generators are functions that use yield instead of return. They produce values one at a time, on demand — making them incredibly memory-efficient for large datasets. Instead of building an entire list in memory, a generator produces each value only when asked.

This is called **lazy evaluation** — values are computed on-the-fly, not all at once.`,
          code: `# Generator function — uses yield
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for num in countdown(5):
    print(num)  # 5, 4, 3, 2, 1

# Memory comparison: list vs generator
# This creates 1 million items in memory:
big_list = [x**2 for x in range(1_000_000)]

# This creates values one at a time — almost no memory:
big_gen = (x**2 for x in range(1_000_000))

# Fibonacci generator — infinite!
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Take first 10 Fibonacci numbers
from itertools import islice
first_10 = list(islice(fibonacci(), 10))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# itertools — powerful iteration tools
from itertools import chain, combinations, permutations

# Combine multiple iterables
merged = list(chain([1, 2], [3, 4], [5]))  # [1,2,3,4,5]

# All 2-element combinations of "ABC"
print(list(combinations("ABC", 2)))
# [('A','B'), ('A','C'), ('B','C')]

# All 2-element permutations
print(list(permutations("AB", 2)))
# [('A','B'), ('B','A')]`,
          keyPoints: [
            'Generators use yield — produce values lazily (on-demand)',
            'Generator expressions: (x for x in range(n)) — like list comp but lazy',
            'itertools is essential for interviews: combinations, permutations, chain',
            'Generators can be infinite — use islice() to take a finite number'
          ]
        }
      ],
      interviewTip: 'Decorators and generators show advanced Python knowledge. For interviews: use @lru_cache for memoization in recursive problems (DP), use generators for memory-efficient processing, and know itertools.combinations/permutations for combinatorial problems.'
    },

    // ═══════════════════════════════════════
    //  CHAPTER 13: Data Visualization
    // ═══════════════════════════════════════
    {
      id: 'visualization',
      title: 'Data Visualization (Matplotlib & Plotly)',
      icon: '📊',
      color: '#E91E63',
      estimatedTime: '20 min',
      difficulty: 'Intermediate',
      summary: 'Visualizing data is crucial for data science, analysis, and presenting results. Matplotlib is the foundation of Python plotting, and Plotly creates interactive charts. Even backend engineers benefit from knowing basic plotting for debugging and analysis.',
      sections: [
        {
          heading: 'Matplotlib & Plotly Basics',
          explanation: `Matplotlib is the most widely used Python plotting library. It follows a two-step process: (1) create the plot elements, (2) show or save the plot.

Plotly creates interactive charts that work in web browsers — users can zoom, hover, and explore the data. Great for dashboards and presentations.`,
          code: `# ── Matplotlib ──
from matplotlib import pyplot as plt

# Line plot
x = list(range(1, 11))
y = [val**2 for val in x]

plt.style.use('seaborn-v0_8')
fig, ax = plt.subplots()
ax.plot(x, y, linewidth=2, color='blue')
ax.set_title("Square Numbers", fontsize=18)
ax.set_xlabel("Value")
ax.set_ylabel("Square")
plt.savefig("squares.png", dpi=300)

# Scatter plot
plt.scatter(x, y, c=y, cmap='viridis', s=50)
plt.colorbar()
plt.show()

# ── Plotly (interactive) ──
from plotly.graph_objects import Bar, Layout
from plotly import offline

# Interactive bar chart
data = [Bar(x=["A", "B", "C"], y=[10, 20, 15])]
layout = Layout(title="Sales Data")
fig = {"data": data, "layout": layout}
offline.plot(fig, filename="chart.html")`,
          keyPoints: [
            'Matplotlib: plt.plot() for lines, plt.scatter() for scatter plots',
            'Always label axes and add titles for readable plots',
            'plt.savefig() exports plots — use dpi=300 for high quality',
            'Plotly creates interactive HTML charts — great for presentations'
          ]
        }
      ],
      interviewTip: 'Data visualization comes up in data science and analyst interviews. Know how to create line, bar, scatter, and histogram plots. Be ready to explain your choice of chart type — bar for comparisons, line for trends over time, scatter for relationships between variables.'
    },

    // ═══════════════════════════════════════
    //  CHAPTER 14: Django & Web Dev
    // ═══════════════════════════════════════
    {
      id: 'django',
      title: 'Django Web Framework & Git',
      icon: '🌐',
      color: '#092E20',
      estimatedTime: '30 min',
      difficulty: 'Intermediate-Advanced',
      summary: 'Django is Python\'s most popular web framework — "the web framework for perfectionists with deadlines." It follows the MVT (Model-View-Template) pattern and includes an ORM, admin panel, auth system, and more out of the box. Git is the version control system every developer must know.',
      sections: [
        {
          heading: 'Django Project Setup',
          explanation: `Django follows the "batteries included" philosophy — it comes with everything you need to build a web app: ORM for database operations, URL routing, template engine, admin interface, auth system, and more.

A Django project contains apps, and each app handles a specific feature. Models define your data structure, views handle logic, and templates handle presentation.`,
          code: `# Create and activate virtual environment
# $ python -m venv myenv
# $ source myenv/bin/activate

# Install Django and create project
# $ pip install django
# $ django-admin startproject myproject .
# $ python manage.py migrate
# $ python manage.py runserver

# Create an app
# $ python manage.py startapp blog

# ── models.py — Define data structure ──
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

# ── views.py — Handle logic ──
from django.shortcuts import render
from .models import Post

def index(request):
    posts = Post.objects.order_by('-created')
    return render(request, 'blog/index.html',
                  {'posts': posts})

# ── urls.py — URL routing ──
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('post/<int:pk>/', views.detail, name='detail'),
]`,
          keyPoints: [
            'Django follows MVT pattern: Models, Views, Templates',
            'Models define database tables — Django ORM handles SQL',
            'makemigrations + migrate to apply model changes to database',
            'Django admin panel comes free — register models to manage data'
          ]
        },
        {
          heading: 'Git Version Control Essentials',
          explanation: `Git tracks changes to your code over time. Every developer must know Git. The basic workflow is: make changes → stage them (git add) → commit them (git commit) → push to remote (git push).

Branches let you work on features independently and merge them when ready.`,
          code: `# ── Initial setup ──
# $ git config --global user.name "Your Name"
# $ git config --global user.email "you@email.com"

# ── Basic workflow ──
# $ git init                    # Initialize repository
# $ git add .                   # Stage all changes
# $ git commit -m "Initial commit"  # Save snapshot
# $ git status                  # Check what's changed
# $ git log --oneline           # View commit history

# ── Branching ──
# $ git checkout -b feature     # Create & switch to branch
# $ git checkout main           # Switch back to main
# $ git merge feature           # Merge feature into main
# $ git branch -d feature       # Delete branch

# ── Working with GitHub ──
# $ git remote add origin https://github.com/user/repo.git
# $ git push -u origin main     # Push to GitHub
# $ git pull origin main        # Pull latest changes
# $ git clone https://github.com/user/repo.git

# ── .gitignore file ──
# __pycache__/
# *.pyc
# .env
# myenv/
# .DS_Store`,
          keyPoints: [
            'git add → git commit → git push is the basic workflow',
            'Always commit with meaningful messages',
            'Use branches for features — never commit directly to main',
            '.gitignore prevents tracking virtual environments, secrets, and cache files'
          ]
        }
      ],
      interviewTip: 'Knowing Django shows you can build production systems. Even for SDE roles, understanding MVC/MVT, ORMs, and migrations is valuable. For Git: know how to resolve merge conflicts, use interactive rebase, and cherry-pick commits. These are daily skills for professional developers.'
    }
  ]
};

export default pythonNotes;
