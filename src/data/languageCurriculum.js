// ─── Language Fundamentals Curriculum Data ───
// Each language has: cheatSheet, and modules (basic → advanced) with lessons containing code examples.

const languageCurriculum = {

  // ╔══════════════════════════════════════════════════╗
  // ║                    PYTHON                        ║
  // ╚══════════════════════════════════════════════════╝
  python: {
    name: 'Python',
    tagline: 'Simple, powerful, and versatile',
    color: '#3776AB',
    accent: '#FFD43B',
    cheatSheet: [
      { label: 'Variables', syntax: 'x = 10' },
      { label: 'Print', syntax: 'print("Hello")' },
      { label: 'If / Else', syntax: 'if x > 5:\\n    print("big")\\nelse:\\n    print("small")' },
      { label: 'For Loop', syntax: 'for i in range(5):\\n    print(i)' },
      { label: 'While Loop', syntax: 'while x > 0:\\n    x -= 1' },
      { label: 'Function', syntax: 'def greet(name):\\n    return f"Hello, {name}"' },
      { label: 'List', syntax: 'nums = [1, 2, 3]' },
      { label: 'Dictionary', syntax: 'person = {"name": "Alice", "age": 25}' },
      { label: 'List Comprehension', syntax: 'squares = [x**2 for x in range(10)]' },
      { label: 'Lambda', syntax: 'add = lambda a, b: a + b' },
      { label: 'Try / Except', syntax: 'try:\\n    risky()\\nexcept Exception as e:\\n    print(e)' },
      { label: 'Class', syntax: 'class Dog:\\n    def __init__(self, name):\\n        self.name = name' },
      { label: 'Import', syntax: 'import os\\nfrom math import sqrt' },
      { label: 'F-String', syntax: 'msg = f"Value is {x}"' },
      { label: 'Slice', syntax: 'sub = nums[1:3]' },
      { label: 'Tuple Unpack', syntax: 'a, b = (1, 2)' },
    ],
    modules: [
      {
        level: 'Beginner',
        icon: '🌱',
        topics: [
          {
            title: 'Variables & Data Types',
            description: 'Learn how Python stores and manages data using dynamic typing.',
            concepts: ['Variables', 'Integers', 'Floats', 'Strings', 'Booleans', 'Type Casting'],
            code: `# ── Variables & Data Types ──

# Python is dynamically typed — no need to declare types
name = "Alice"          # str
age = 25                # int
height = 5.7            # float
is_student = True       # bool

# Type casting
age_str = str(age)      # "25"
pi = float("3.14")     # 3.14
count = int("42")      # 42

# Check type
print(type(name))       # <class 'str'>
print(type(age))        # <class 'int'>

# Multiple assignment
x, y, z = 1, 2, 3
a = b = c = 0

# Constants (convention: UPPERCASE)
MAX_SIZE = 100
PI = 3.14159`,
          },
          {
            title: 'Operators & Expressions',
            description: 'Master arithmetic, comparison, logical, and bitwise operators.',
            concepts: ['Arithmetic', 'Comparison', 'Logical', 'Bitwise', 'Assignment', 'Ternary'],
            code: `# ── Operators & Expressions ──

# Arithmetic
print(10 + 3)    # 13
print(10 - 3)    # 7
print(10 * 3)    # 30
print(10 / 3)    # 3.333...
print(10 // 3)   # 3  (floor division)
print(10 % 3)    # 1  (modulus)
print(2 ** 10)   # 1024  (exponentiation)

# Comparison
print(5 == 5)    # True
print(5 != 3)    # True
print(5 > 3)     # True
print(5 <= 5)    # True

# Logical
print(True and False)  # False
print(True or False)   # True
print(not True)        # False

# Ternary / Conditional Expression
status = "adult" if age >= 18 else "minor"

# Bitwise
print(5 & 3)     # 1  (AND)
print(5 | 3)     # 7  (OR)
print(5 ^ 3)     # 6  (XOR)
print(~5)        # -6 (NOT)
print(5 << 1)    # 10 (left shift)
print(5 >> 1)    # 2  (right shift)`,
          },
          {
            title: 'Control Flow',
            description: 'Use if/elif/else, for, while, break, continue, and pass statements.',
            concepts: ['if/elif/else', 'for loop', 'while loop', 'break', 'continue', 'pass'],
            code: `# ── Control Flow ──

# If / Elif / Else
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
print(f"Grade: {grade}")  # Grade: B

# For loop with range
for i in range(5):
    print(i, end=" ")  # 0 1 2 3 4

# For loop with list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Enumerate for index + value
for idx, fruit in enumerate(fruits):
    print(f"{idx}: {fruit}")

# While loop
count = 0
while count < 5:
    print(count)
    count += 1

# Break and Continue
for i in range(10):
    if i == 3:
        continue   # Skip 3
    if i == 7:
        break      # Stop at 7
    print(i)

# Nested loops
for i in range(3):
    for j in range(3):
        print(f"({i},{j})", end=" ")
    print()`,
          },
          {
            title: 'Strings',
            description: 'String creation, manipulation, formatting, and common methods.',
            concepts: ['String Methods', 'F-Strings', 'Slicing', 'join/split', 'RegEx Basics'],
            code: `# ── Strings ──

s = "Hello, World!"

# Common methods
print(s.upper())        # "HELLO, WORLD!"
print(s.lower())        # "hello, world!"
print(s.strip())        # Remove whitespace
print(s.replace("World", "Python"))  # "Hello, Python!"
print(s.split(", "))    # ["Hello", "World!"]
print(s.find("World"))  # 7
print(s.count("l"))     # 3
print(s.startswith("Hello"))  # True

# Slicing
print(s[0:5])   # "Hello"
print(s[-6:])   # "orld!"
print(s[::2])   # "Hlo ol!"
print(s[::-1])  # "!dlroW ,olleH"

# F-Strings (Python 3.6+)
name = "Alice"
age = 30
print(f"Name: {name}, Age: {age}")
print(f"Next year: {age + 1}")
print(f"Pi: {3.14159:.2f}")  # "Pi: 3.14"

# Multi-line strings
poem = """Roses are red,
Violets are blue,
Python is great,
And so are you."""

# Join
words = ["Python", "is", "awesome"]
sentence = " ".join(words)  # "Python is awesome"`,
          },
          {
            title: 'Lists, Tuples & Sets',
            description: 'Core collection types and their operations.',
            concepts: ['Lists', 'Tuples', 'Sets', 'Comprehensions', 'Common Operations'],
            code: `# ── Lists, Tuples & Sets ──

# ─ Lists (mutable, ordered) ─
nums = [3, 1, 4, 1, 5]
nums.append(9)          # [3, 1, 4, 1, 5, 9]
nums.insert(0, 0)       # [0, 3, 1, 4, 1, 5, 9]
nums.remove(1)          # removes first 1
popped = nums.pop()     # removes & returns last
nums.sort()             # sorts in-place
nums.reverse()          # reverses in-place

# List comprehension
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
matrix = [[0]*3 for _ in range(3)]

# Useful functions
print(len(nums))
print(sum(nums))
print(min(nums), max(nums))
print(sorted(nums, reverse=True))

# ─ Tuples (immutable, ordered) ─
point = (3, 4)
x, y = point            # Unpacking
print(point[0])          # 3

# Named tuples
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)

# ─ Sets (unique, unordered) ─
s1 = {1, 2, 3, 4}
s2 = {3, 4, 5, 6}
print(s1 | s2)   # Union: {1, 2, 3, 4, 5, 6}
print(s1 & s2)   # Intersection: {3, 4}
print(s1 - s2)   # Difference: {1, 2}
print(s1 ^ s2)   # Symmetric diff: {1, 2, 5, 6}`,
          },
          {
            title: 'Dictionaries',
            description: 'Key-value data structures and their powerful methods.',
            concepts: ['Creation', 'Access', 'Methods', 'Iteration', 'Comprehensions'],
            code: `# ── Dictionaries ──

# Creation
person = {
    "name": "Alice",
    "age": 30,
    "city": "NYC"
}

# Access
print(person["name"])          # "Alice"
print(person.get("email", "N/A"))  # "N/A" (default)

# Modify
person["age"] = 31
person["email"] = "alice@mail.com"
del person["city"]

# Methods
print(person.keys())    # dict_keys(["name", "age", "email"])
print(person.values())  # dict_values(["Alice", 31, "alice@mail.com"])
print(person.items())   # dict_items([...])

# Iteration
for key, value in person.items():
    print(f"{key}: {value}")

# Dictionary comprehension
squares = {x: x**2 for x in range(6)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Merge (Python 3.9+)
defaults = {"color": "red", "size": "M"}
overrides = {"size": "L", "weight": 2}
merged = defaults | overrides
# {"color": "red", "size": "L", "weight": 2}

# Nested dictionary
students = {
    "s1": {"name": "Bob", "grades": [90, 85, 92]},
    "s2": {"name": "Eve", "grades": [78, 88, 95]},
}
print(students["s1"]["grades"][0])  # 90`,
          },
          {
            title: 'Functions',
            description: 'Define reusable blocks of code with parameters, returns, and scope.',
            concepts: ['def', 'Parameters', 'Return', '*args/**kwargs', 'Scope', 'Docstrings'],
            code: `# ── Functions ──

# Basic function
def greet(name):
    """Return a greeting message."""
    return f"Hello, {name}!"

print(greet("Alice"))  # "Hello, Alice!"

# Default parameters
def power(base, exp=2):
    return base ** exp

print(power(3))      # 9
print(power(2, 10))  # 1024

# *args and **kwargs
def summarize(*args, **kwargs):
    print(f"Positional: {args}")
    print(f"Keyword: {kwargs}")

summarize(1, 2, 3, name="Alice", age=30)

# Lambda (anonymous function)
square = lambda x: x ** 2
add = lambda a, b: a + b

# Higher-order functions
nums = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, nums))
evens = list(filter(lambda x: x % 2 == 0, nums))

from functools import reduce
total = reduce(lambda a, b: a + b, nums)

# Type hints (Python 3.5+)
def calculate_area(length: float, width: float) -> float:
    return length * width

# Nested functions & closures
def outer(msg):
    def inner():
        print(msg)
    return inner

hello = outer("Hello!")
hello()  # "Hello!"`,
          },
        ],
      },
      {
        level: 'Intermediate',
        icon: '🌿',
        topics: [
          {
            title: 'Object-Oriented Programming',
            description: 'Classes, inheritance, polymorphism, and encapsulation in Python.',
            concepts: ['Classes', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Magic Methods'],
            code: `# ── Object-Oriented Programming ──

class Animal:
    """Base class for all animals."""
    
    species_count = 0  # Class variable

    def __init__(self, name, sound):
        self.name = name         # Public
        self._sound = sound      # Protected (convention)
        self.__id = id(self)     # Private (name mangling)
        Animal.species_count += 1

    def speak(self):
        return f"{self.name} says {self._sound}"

    def __str__(self):
        return f"Animal({self.name})"

    def __repr__(self):
        return f"Animal(name={self.name!r}, sound={self._sound!r})"

# Inheritance
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "Woof")
        self.breed = breed

    def speak(self):  # Polymorphism
        return f"{self.name} the {self.breed} says Woof!"

    def fetch(self, item):
        return f"{self.name} fetches the {item}"

# Multiple inheritance
class ServiceDog(Dog):
    def __init__(self, name, breed, task):
        super().__init__(name, breed)
        self.task = task

# Usage
dog = Dog("Rex", "German Shepherd")
print(dog.speak())       # Rex the German Shepherd says Woof!
print(dog.fetch("ball")) # Rex fetches the ball
print(isinstance(dog, Animal))  # True

# Property decorators
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self):
        import math
        return math.pi * self._radius ** 2`,
          },
          {
            title: 'File Handling & I/O',
            description: 'Read and write files, work with CSV, JSON, and context managers.',
            concepts: ['open/read/write', 'Context Managers', 'CSV', 'JSON', 'Pathlib'],
            code: `# ── File Handling & I/O ──

# Writing to a file
with open("output.txt", "w") as f:
    f.write("Hello, World!\\n")
    f.write("Python is great!\\n")

# Reading a file
with open("output.txt", "r") as f:
    content = f.read()
    print(content)

# Reading line by line
with open("output.txt", "r") as f:
    for line in f:
        print(line.strip())

# Append mode
with open("output.txt", "a") as f:
    f.write("New line added!\\n")

# ── JSON ──
import json

data = {"name": "Alice", "scores": [95, 87, 92]}

# Write JSON
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

# Read JSON
with open("data.json", "r") as f:
    loaded = json.load(f)
    print(loaded["name"])  # "Alice"

# ── CSV ──
import csv

# Write CSV
with open("data.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Name", "Age", "City"])
    writer.writerow(["Alice", 30, "NYC"])
    writer.writerow(["Bob", 25, "LA"])

# Read CSV
with open("data.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["Name"], row["Age"])

# ── Pathlib (modern way) ──
from pathlib import Path

p = Path("data.json")
print(p.exists())     # True
print(p.suffix)       # ".json"
print(p.stem)         # "data"
content = p.read_text()`,
          },
          {
            title: 'Error Handling',
            description: 'Handle exceptions gracefully with try/except, custom exceptions, and logging.',
            concepts: ['try/except/finally', 'raise', 'Custom Exceptions', 'Assertions', 'Logging'],
            code: `# ── Error Handling ──

# Basic try / except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Multiple exceptions
try:
    value = int("abc")
except (ValueError, TypeError) as e:
    print(f"Error: {e}")

# try / except / else / finally
try:
    f = open("data.txt", "r")
    content = f.read()
except FileNotFoundError:
    print("File not found!")
else:
    print(f"Read {len(content)} characters")
finally:
    print("Cleanup done")

# Raising exceptions
def set_age(age):
    if age < 0:
        raise ValueError(f"Age cannot be negative: {age}")
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    return age

# Custom exceptions
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(
            f"Cannot withdraw {amount}, balance is {balance}"
        )

class BankAccount:
    def __init__(self, balance):
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        return self.balance

# Assertions (for debugging)
def calculate_discount(price, discount):
    assert 0 <= discount <= 1, "Discount must be between 0 and 1"
    return price * (1 - discount)`,
          },
          {
            title: 'Modules & Packages',
            description: 'Organize code with modules, packages, and virtual environments.',
            concepts: ['import', 'from...import', '__name__', 'pip', 'venv', 'Package Structure'],
            code: `# ── Modules & Packages ──

# Importing modules
import math
import os
from datetime import datetime, timedelta
from collections import Counter, defaultdict

# Math operations
print(math.sqrt(144))     # 12.0
print(math.pi)            # 3.14159...
print(math.ceil(4.2))     # 5
print(math.floor(4.8))    # 4

# OS module
print(os.getcwd())        # Current directory
print(os.listdir("."))    # List files

# Collections
words = ["apple", "banana", "apple", "cherry", "banana"]
count = Counter(words)
print(count.most_common(2))  # [("apple", 2), ("banana", 2)]

graph = defaultdict(list)
graph["a"].append("b")
graph["a"].append("c")

# ── Creating your own module ──
# File: myutils.py
# def greet(name):
#     return f"Hello, {name}!"

# File: main.py
# from myutils import greet
# print(greet("Alice"))

# Package structure
# my_package/
# ├── __init__.py
# ├── core.py
# ├── utils.py
# └── models/
#     ├── __init__.py
#     └── user.py

# __name__ guard
if __name__ == "__main__":
    print("This runs only when executed directly")
    print("Not when imported as a module")

# Virtual environments
# python -m venv myenv
# source myenv/bin/activate  (Linux/Mac)
# myenv\\Scripts\\activate   (Windows)
# pip install requests
# pip freeze > requirements.txt`,
          },
          {
            title: 'Iterators & Generators',
            description: 'Memory-efficient iteration with generators and the iterator protocol.',
            concepts: ['Iterators', 'Generators', 'yield', 'Generator Expressions', 'itertools'],
            code: `# ── Iterators & Generators ──

# Custom iterator
class Countdown:
    def __init__(self, start):
        self.start = start

    def __iter__(self):
        self.current = self.start
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value

for num in Countdown(5):
    print(num, end=" ")  # 5 4 3 2 1

# ── Generators (lazy evaluation) ──
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

for num in fibonacci(10):
    print(num, end=" ")  # 0 1 1 2 3 5 8 13 21 34

# Generator expression (like list comp but lazy)
squares = (x**2 for x in range(1_000_000))
print(next(squares))  # 0
print(next(squares))  # 1

# ── itertools (powerful iteration tools) ──
from itertools import (
    chain, combinations, permutations,
    product, islice, groupby, count
)

# Chain multiple iterables
merged = list(chain([1, 2], [3, 4], [5]))  # [1, 2, 3, 4, 5]

# Combinations & permutations
print(list(combinations("ABC", 2)))   # [('A','B'), ('A','C'), ('B','C')]
print(list(permutations("AB", 2)))    # [('A','B'), ('B','A')]

# Infinite counter with slice
evens = islice(count(0, 2), 5)
print(list(evens))  # [0, 2, 4, 6, 8]`,
          },
        ],
      },
      {
        level: 'Advanced',
        icon: '🌳',
        topics: [
          {
            title: 'Decorators & Closures',
            description: 'Higher-order functions, decorators with arguments, and functools.',
            concepts: ['Closures', 'Decorators', '@wraps', 'Class Decorators', 'functools'],
            code: `# ── Decorators & Closures ──

import functools
import time

# Basic decorator
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "done"

# Decorator with arguments
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
def say_hello():
    print("Hello!")

# Memoization with lru_cache
@functools.lru_cache(maxsize=128)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(100))  # Instant!

# Class-based decorator
class Retry:
    def __init__(self, max_retries=3):
        self.max_retries = max_retries

    def __call__(self, func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(self.max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"Attempt {attempt+1} failed: {e}")
            raise Exception("All retries exhausted")
        return wrapper

@Retry(max_retries=3)
def unreliable_api_call():
    import random
    if random.random() < 0.7:
        raise ConnectionError("Server down")
    return "Success"`,
          },
          {
            title: 'Concurrency & Async',
            description: 'Threading, multiprocessing, and async/await patterns.',
            concepts: ['threading', 'multiprocessing', 'async/await', 'asyncio', 'concurrent.futures'],
            code: `# ── Concurrency & Async ──

import asyncio
import threading
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

# ── Threading ──
def download(url):
    import time
    print(f"Downloading {url}...")
    time.sleep(1)  # Simulate I/O
    print(f"Done: {url}")

threads = []
urls = ["url1.com", "url2.com", "url3.com"]
for url in urls:
    t = threading.Thread(target=download, args=(url,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

# ── ThreadPoolExecutor ──
with ThreadPoolExecutor(max_workers=4) as executor:
    futures = [executor.submit(download, url) for url in urls]
    for future in futures:
        future.result()  # Wait for completion

# ── Async / Await ──
async def fetch_data(name, delay):
    print(f"Fetching {name}...")
    await asyncio.sleep(delay)
    print(f"Got {name}!")
    return f"{name}_data"

async def main():
    # Run concurrently
    results = await asyncio.gather(
        fetch_data("users", 2),
        fetch_data("posts", 1),
        fetch_data("comments", 3),
    )
    print(results)

# asyncio.run(main())

# Async context manager
class AsyncDB:
    async def __aenter__(self):
        print("Connecting to DB...")
        await asyncio.sleep(0.5)
        return self

    async def __aexit__(self, *args):
        print("Closing connection...")
        await asyncio.sleep(0.2)

    async def query(self, sql):
        await asyncio.sleep(0.3)
        return [{"id": 1}, {"id": 2}]

# async with AsyncDB() as db:
#     results = await db.query("SELECT * FROM users")`,
          },
          {
            title: 'Metaclasses & Descriptors',
            description: 'Advanced OOP: metaclasses, descriptors, __slots__, and ABC.',
            concepts: ['Metaclasses', 'Descriptors', '__slots__', 'ABC', 'dataclasses'],
            code: `# ── Metaclasses & Descriptors ──

from abc import ABC, abstractmethod
from dataclasses import dataclass, field

# ── Abstract Base Classes ──
class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

    @abstractmethod
    def perimeter(self) -> float:
        pass

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w, self.h = w, h

    def area(self):
        return self.w * self.h

    def perimeter(self):
        return 2 * (self.w + self.h)

# ── Dataclasses (Python 3.7+) ──
@dataclass
class Employee:
    name: str
    department: str
    salary: float = 50_000
    skills: list = field(default_factory=list)

    @property
    def annual_bonus(self):
        return self.salary * 0.1

emp = Employee("Alice", "Engineering", 120_000, ["Python", "SQL"])
print(emp)  # Employee(name='Alice', ...)

# ── Descriptors ──
class Validator:
    def __init__(self, min_val, max_val):
        self.min_val = min_val
        self.max_val = max_val

    def __set_name__(self, owner, name):
        self.name = name

    def __get__(self, obj, objtype=None):
        return getattr(obj, f"_{self.name}", None)

    def __set__(self, obj, value):
        if not (self.min_val <= value <= self.max_val):
            raise ValueError(
                f"{self.name} must be between "
                f"{self.min_val} and {self.max_val}"
            )
        setattr(obj, f"_{self.name}", value)

class Student:
    grade = Validator(0, 100)
    age = Validator(5, 25)

    def __init__(self, name, grade, age):
        self.name = name
        self.grade = grade
        self.age = age

# ── __slots__ for memory optimization ──
class Point:
    __slots__ = ['x', 'y']
    def __init__(self, x, y):
        self.x, self.y = x, y`,
          },
        ],
      },
    ],
  },

  // ╔══════════════════════════════════════════════════╗
  // ║                     JAVA                         ║
  // ╚══════════════════════════════════════════════════╝
  java: {
    name: 'Java',
    tagline: 'Write once, run anywhere',
    color: '#ED8B00',
    accent: '#5382A1',
    cheatSheet: [
      { label: 'Variable', syntax: 'int x = 10;' },
      { label: 'Print', syntax: 'System.out.println("Hello");' },
      { label: 'If / Else', syntax: 'if (x > 5) {\\n    // ...\\n} else {\\n    // ...\\n}' },
      { label: 'For Loop', syntax: 'for (int i = 0; i < 5; i++) {\\n    System.out.println(i);\\n}' },
      { label: 'While Loop', syntax: 'while (x > 0) {\\n    x--;\\n}' },
      { label: 'Method', syntax: 'public int add(int a, int b) {\\n    return a + b;\\n}' },
      { label: 'Array', syntax: 'int[] nums = {1, 2, 3};' },
      { label: 'ArrayList', syntax: 'ArrayList<String> list = new ArrayList<>();' },
      { label: 'HashMap', syntax: 'HashMap<String, Integer> map = new HashMap<>();' },
      { label: 'Class', syntax: 'public class Dog {\\n    String name;\\n    public Dog(String name) {\\n        this.name = name;\\n    }\\n}' },
      { label: 'Interface', syntax: 'interface Drawable {\\n    void draw();\\n}' },
      { label: 'Try/Catch', syntax: 'try {\\n    // risky\\n} catch (Exception e) {\\n    e.printStackTrace();\\n}' },
      { label: 'Lambda', syntax: '(a, b) -> a + b' },
      { label: 'Stream', syntax: 'list.stream().filter(x -> x > 5).collect(Collectors.toList());' },
      { label: 'String Format', syntax: 'String.format("Hello %s, age %d", name, age);' },
      { label: 'Enhanced For', syntax: 'for (String s : list) {\\n    System.out.println(s);\\n}' },
    ],
    modules: [
      {
        level: 'Beginner',
        icon: '🌱',
        topics: [
          {
            title: 'Variables & Data Types',
            description: "Java's static type system, primitives vs objects, and type casting.",
            concepts: ['Primitives', 'Wrapper Classes', 'Strings', 'Type Casting', 'Constants'],
            code: `// ── Variables & Data Types ──

public class DataTypes {
    public static void main(String[] args) {
        // Primitive types
        byte b = 127;              // 8-bit
        short s = 32_000;          // 16-bit
        int i = 2_147_483_647;     // 32-bit
        long l = 9_000_000_000L;   // 64-bit
        float f = 3.14f;           // 32-bit decimal
        double d = 3.14159265;     // 64-bit decimal
        char c = 'A';              // 16-bit Unicode
        boolean flag = true;       // true/false

        // Wrapper classes (Object versions)
        Integer objInt = 42;       // Auto-boxing
        int prim = objInt;         // Auto-unboxing

        // Strings (immutable)
        String name = "Alice";
        String greeting = "Hello, " + name + "!";
        
        // String methods
        System.out.println(name.length());       // 5
        System.out.println(name.toUpperCase());  // "ALICE"
        System.out.println(name.charAt(0));      // 'A'
        System.out.println(name.substring(1, 3)); // "li"

        // Constants
        final double PI = 3.14159;
        final int MAX_SIZE = 100;

        // Type casting
        double x = 9.7;
        int y = (int) x;   // 9 (truncated)
        double z = y;       // 9.0 (implicit)

        // var (Java 10+)
        var message = "Type inferred as String";
    }
}`,
          },
          {
            title: 'Control Flow',
            description: 'Conditionals, loops, switch statements, and flow control.',
            concepts: ['if/else', 'switch', 'for', 'while', 'do-while', 'break/continue'],
            code: `// ── Control Flow ──

public class ControlFlow {
    public static void main(String[] args) {
        // If / Else If / Else
        int score = 85;
        String grade;
        if (score >= 90) {
            grade = "A";
        } else if (score >= 80) {
            grade = "B";
        } else if (score >= 70) {
            grade = "C";
        } else {
            grade = "F";
        }

        // Ternary operator
        String status = (score >= 60) ? "Pass" : "Fail";

        // Switch (classic)
        int day = 3;
        switch (day) {
            case 1: System.out.println("Mon"); break;
            case 2: System.out.println("Tue"); break;
            case 3: System.out.println("Wed"); break;
            default: System.out.println("Other");
        }

        // Switch expression (Java 14+)
        String dayName = switch (day) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            default -> "Other";
        };

        // For loop
        for (int i = 0; i < 5; i++) {
            System.out.print(i + " ");  // 0 1 2 3 4
        }

        // While loop
        int count = 5;
        while (count > 0) {
            System.out.print(count + " ");
            count--;
        }

        // Do-While (runs at least once)
        int n = 0;
        do {
            System.out.println("n = " + n);
            n++;
        } while (n < 3);

        // Break and continue
        for (int i = 0; i < 10; i++) {
            if (i == 3) continue;  // Skip 3
            if (i == 7) break;     // Stop at 7
            System.out.print(i + " ");
        }
    }
}`,
          },
          {
            title: 'Arrays & Collections',
            description: 'Arrays, ArrayList, HashMap, and common collection operations.',
            concepts: ['Arrays', 'ArrayList', 'LinkedList', 'HashMap', 'HashSet', 'Iteration'],
            code: `// ── Arrays & Collections ──

import java.util.*;

public class Collections {
    public static void main(String[] args) {
        // ─ Arrays (fixed size) ─
        int[] nums = {5, 3, 1, 4, 2};
        int[] zeros = new int[10];  // All zeros
        Arrays.sort(nums);         // [1, 2, 3, 4, 5]
        int idx = Arrays.binarySearch(nums, 3);  // 2

        // 2D array
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        // ─ ArrayList (dynamic) ─
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add(1, "Mango");   // Insert at index
        fruits.remove("Banana");
        System.out.println(fruits.get(0));  // "Apple"
        System.out.println(fruits.size());  // 2

        // Enhanced for loop
        for (String fruit : fruits) {
            System.out.println(fruit);
        }

        // ─ HashMap ─
        HashMap<String, Integer> ages = new HashMap<>();
        ages.put("Alice", 30);
        ages.put("Bob", 25);
        System.out.println(ages.get("Alice"));   // 30
        System.out.println(ages.getOrDefault("Eve", 0));  // 0
        ages.containsKey("Bob");   // true
        ages.containsValue(25);   // true

        // Iterate HashMap
        for (Map.Entry<String, Integer> entry : ages.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        // ─ HashSet (unique elements) ─
        HashSet<Integer> set = new HashSet<>(Arrays.asList(1, 2, 3, 2, 1));
        System.out.println(set);  // [1, 2, 3]
        set.add(4);
        set.remove(1);
        set.contains(2);  // true

        // ─ Stack & Queue ─
        Stack<Integer> stack = new Stack<>();
        stack.push(1); stack.push(2);
        System.out.println(stack.pop());  // 2

        Queue<Integer> queue = new LinkedList<>();
        queue.offer(1); queue.offer(2);
        System.out.println(queue.poll()); // 1
    }
}`,
          },
          {
            title: 'Methods & Scope',
            description: 'Define methods, understand scope, overloading, and recursion.',
            concepts: ['Methods', 'Parameters', 'Return Types', 'Overloading', 'Recursion', 'static'],
            code: `// ── Methods & Scope ──

public class Methods {

    // Instance method
    public String greet(String name) {
        return "Hello, " + name + "!";
    }

    // Static method (no instance needed)
    public static int add(int a, int b) {
        return a + b;
    }

    // Method overloading (same name, different params)
    public static double add(double a, double b) {
        return a + b;
    }

    public static int add(int a, int b, int c) {
        return a + b + c;
    }

    // Varargs
    public static int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) {
            total += n;
        }
        return total;
    }

    // Recursion
    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    // Fibonacci with memoization
    static Map<Integer, Long> cache = new HashMap<>();
    
    public static long fib(int n) {
        if (n <= 1) return n;
        if (cache.containsKey(n)) return cache.get(n);
        long result = fib(n - 1) + fib(n - 2);
        cache.put(n, result);
        return result;
    }

    public static void main(String[] args) {
        System.out.println(add(3, 4));       // 7
        System.out.println(add(3.5, 4.5));   // 8.0
        System.out.println(add(1, 2, 3));    // 6
        System.out.println(sum(1, 2, 3, 4)); // 10
        System.out.println(factorial(5));     // 120
        System.out.println(fib(50));
    }
}`,
          },
        ],
      },
      {
        level: 'Intermediate',
        icon: '🌿',
        topics: [
          {
            title: 'OOP: Classes & Inheritance',
            description: 'Deep dive into Java OOP: classes, inheritance, interfaces, and abstract classes.',
            concepts: ['Classes', 'Inheritance', 'Interfaces', 'Abstract Classes', 'Polymorphism'],
            code: `// ── OOP: Classes & Inheritance ──

// Abstract class
abstract class Shape {
    String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    abstract double area();
    abstract double perimeter();
    
    public String describe() {
        return color + " shape with area " + String.format("%.2f", area());
    }
}

// Interface
interface Drawable {
    void draw();
    
    // Default method (Java 8+)
    default void fill(String color) {
        System.out.println("Filling with " + color);
    }
}

// Concrete class implementing both
class Circle extends Shape implements Drawable {
    double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    double area() {
        return Math.PI * radius * radius;
    }
    
    @Override
    double perimeter() {
        return 2 * Math.PI * radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing circle with radius " + radius);
    }
}

class Rectangle extends Shape implements Drawable {
    double width, height;
    
    public Rectangle(String color, double w, double h) {
        super(color);
        this.width = w;
        this.height = h;
    }
    
    @Override
    double area() { return width * height; }
    
    @Override
    double perimeter() { return 2 * (width + height); }
    
    @Override
    public void draw() {
        System.out.println("Drawing " + width + "x" + height + " rectangle");
    }
}

// Usage with polymorphism
public class Main {
    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle("Red", 5),
            new Rectangle("Blue", 4, 6)
        };
        
        for (Shape s : shapes) {
            System.out.println(s.describe());
            if (s instanceof Drawable d) {  // Pattern matching (Java 16+)
                d.draw();
            }
        }
    }
}`,
          },
          {
            title: 'Exception Handling',
            description: 'Checked vs unchecked exceptions, custom exceptions, and try-with-resources.',
            concepts: ['try/catch/finally', 'throws', 'Custom Exceptions', 'try-with-resources'],
            code: `// ── Exception Handling ──

import java.io.*;

// Custom exception
class InsufficientFundsException extends Exception {
    private double balance;
    private double amount;

    public InsufficientFundsException(double balance, double amount) {
        super(String.format(
            "Cannot withdraw %.2f, balance is %.2f", amount, balance
        ));
        this.balance = balance;
        this.amount = amount;
    }

    public double getDeficit() {
        return amount - balance;
    }
}

class BankAccount {
    private double balance;

    public BankAccount(double balance) {
        this.balance = balance;
    }

    // Declares checked exception
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(balance, amount);
        }
        balance -= amount;
    }

    public double getBalance() { return balance; }
}

public class ExceptionDemo {
    public static void main(String[] args) {
        // Basic try-catch-finally
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            System.out.println("Always executes");
        }

        // Multiple catch
        try {
            String s = null;
            s.length();           // NullPointerException
        } catch (NullPointerException e) {
            System.out.println("Null pointer!");
        } catch (Exception e) {
            System.out.println("General error: " + e);
        }

        // try-with-resources (auto-close)
        try (BufferedReader reader = new BufferedReader(
                new FileReader("data.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("File error: " + e.getMessage());
        }

        // Custom exception usage
        BankAccount acc = new BankAccount(100);
        try {
            acc.withdraw(150);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());
            System.out.println("Deficit: " + e.getDeficit());
        }
    }
}`,
          },
          {
            title: 'Generics & Collections Framework',
            description: 'Type-safe collections, bounded generics, and wildcard types.',
            concepts: ['Generics', 'Bounded Types', 'Wildcards', 'Comparable', 'Collections.sort'],
            code: `// ── Generics & Collections Framework ──

import java.util.*;

// Generic class
class Pair<T, U> {
    private T first;
    private U second;

    public Pair(T first, U second) {
        this.first = first;
        this.second = second;
    }

    public T getFirst() { return first; }
    public U getSecond() { return second; }

    @Override
    public String toString() {
        return "(" + first + ", " + second + ")";
    }
}

// Bounded generics
class MathUtils {
    // T must extend Comparable
    public static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }

    // Wildcard: accepts list of any Number subtype
    public static double sum(List<? extends Number> list) {
        double total = 0;
        for (Number n : list) {
            total += n.doubleValue();
        }
        return total;
    }
}

// Implementing Comparable
class Student implements Comparable<Student> {
    String name;
    double gpa;

    public Student(String name, double gpa) {
        this.name = name;
        this.gpa = gpa;
    }

    @Override
    public int compareTo(Student other) {
        return Double.compare(other.gpa, this.gpa);  // Descending
    }

    @Override
    public String toString() {
        return name + " (" + gpa + ")";
    }
}

public class GenericsDemo {
    public static void main(String[] args) {
        Pair<String, Integer> p = new Pair<>("Alice", 30);
        System.out.println(p);  // (Alice, 30)

        System.out.println(MathUtils.max(3, 7));      // 7
        System.out.println(MathUtils.max("abc", "xyz")); // "xyz"

        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Double> dbls = Arrays.asList(1.5, 2.5);
        System.out.println(MathUtils.sum(ints));  // 6.0
        System.out.println(MathUtils.sum(dbls));  // 4.0

        // Sorting with Comparable
        List<Student> students = new ArrayList<>(List.of(
            new Student("Alice", 3.8),
            new Student("Bob", 3.5),
            new Student("Charlie", 3.9)
        ));
        Collections.sort(students);
        students.forEach(System.out::println);

        // Sorting with Comparator (lambda)
        students.sort(Comparator.comparing(s -> s.name));
    }
}`,
          },
        ],
      },
      {
        level: 'Advanced',
        icon: '🌳',
        topics: [
          {
            title: 'Streams & Functional Programming',
            description: 'Stream API, lambda expressions, method references, and Optional.',
            concepts: ['Streams', 'map/filter/reduce', 'Optional', 'Method References', 'Collectors'],
            code: `// ── Streams & Functional Programming ──

import java.util.*;
import java.util.stream.*;

public class StreamsDemo {
    record Employee(String name, String dept, double salary) {}

    public static void main(String[] args) {
        List<Employee> employees = List.of(
            new Employee("Alice", "Eng", 120_000),
            new Employee("Bob", "Eng", 110_000),
            new Employee("Charlie", "HR", 80_000),
            new Employee("Diana", "HR", 85_000),
            new Employee("Eve", "Eng", 130_000)
        );

        // Filter + Map + Collect
        List<String> highEarners = employees.stream()
            .filter(e -> e.salary() > 100_000)
            .map(Employee::name)
            .sorted()
            .collect(Collectors.toList());
        System.out.println(highEarners);  // [Alice, Bob, Eve]

        // Sum salaries
        double totalSalary = employees.stream()
            .mapToDouble(Employee::salary)
            .sum();

        // Group by department
        Map<String, List<Employee>> byDept = employees.stream()
            .collect(Collectors.groupingBy(Employee::dept));

        // Average salary per department
        Map<String, Double> avgSalary = employees.stream()
            .collect(Collectors.groupingBy(
                Employee::dept,
                Collectors.averagingDouble(Employee::salary)
            ));

        // Reduce
        Optional<Employee> highest = employees.stream()
            .max(Comparator.comparingDouble(Employee::salary));
        highest.ifPresent(e -> System.out.println("Top: " + e.name()));

        // ── Optional ──
        Optional<String> maybeName = Optional.of("Alice");
        String name = maybeName
            .filter(n -> n.length() > 3)
            .map(String::toUpperCase)
            .orElse("UNKNOWN");
        System.out.println(name);  // "ALICE"

        // Parallel stream (use carefully)
        long count = employees.parallelStream()
            .filter(e -> e.salary() > 90_000)
            .count();

        // Stream of primitives
        int sum = IntStream.rangeClosed(1, 100).sum();  // 5050
        
        // Flat map
        List<List<Integer>> nested = List.of(
            List.of(1, 2), List.of(3, 4), List.of(5)
        );
        List<Integer> flat = nested.stream()
            .flatMap(Collection::stream)
            .collect(Collectors.toList());
        System.out.println(flat);  // [1, 2, 3, 4, 5]
    }
}`,
          },
          {
            title: 'Multithreading & Concurrency',
            description: 'Threads, ExecutorService, CompletableFuture, and synchronization.',
            concepts: ['Thread', 'Runnable', 'ExecutorService', 'CompletableFuture', 'synchronized'],
            code: `// ── Multithreading & Concurrency ──

import java.util.concurrent.*;

public class ConcurrencyDemo {

    // Thread-safe counter
    static class Counter {
        private int count = 0;

        public synchronized void increment() {
            count++;
        }

        public int getCount() { return count; }
    }

    public static void main(String[] args) throws Exception {
        // ── Creating threads ──
        // Way 1: Runnable lambda
        Thread t1 = new Thread(() -> {
            System.out.println("Thread: " + Thread.currentThread().getName());
        });
        t1.start();
        t1.join();  // Wait for completion

        // ── ExecutorService (thread pool) ──
        ExecutorService executor = Executors.newFixedThreadPool(4);

        // Submit tasks
        Future<Integer> future = executor.submit(() -> {
            Thread.sleep(1000);
            return 42;
        });
        System.out.println("Result: " + future.get());  // Blocks until done

        // ── CompletableFuture (async chains) ──
        CompletableFuture<String> cf = CompletableFuture
            .supplyAsync(() -> {
                // Simulate API call
                try { Thread.sleep(500); } catch (Exception e) {}
                return "user_data";
            })
            .thenApply(data -> data.toUpperCase())
            .thenApply(data -> "Processed: " + data)
            .exceptionally(ex -> "Error: " + ex.getMessage());

        System.out.println(cf.get());  // "Processed: USER_DATA"

        // Combine multiple futures
        CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "Hello");
        CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "World");

        CompletableFuture<String> combined = f1.thenCombine(f2, 
            (a, b) -> a + " " + b
        );
        System.out.println(combined.get());  // "Hello World"

        // Run all futures
        CompletableFuture<Void> allDone = CompletableFuture.allOf(f1, f2);
        allDone.join();

        executor.shutdown();
    }
}`,
          },
        ],
      },
    ],
  },

  // ╔══════════════════════════════════════════════════╗
  // ║                     C++                          ║
  // ╚══════════════════════════════════════════════════╝
  cpp: {
    name: 'C++',
    tagline: 'Performance meets power',
    color: '#00599C',
    accent: '#004482',
    cheatSheet: [
      { label: 'Variable', syntax: 'int x = 10;' },
      { label: 'Print', syntax: 'cout << "Hello" << endl;' },
      { label: 'If / Else', syntax: 'if (x > 5) {\\n    // ...\\n} else {\\n    // ...\\n}' },
      { label: 'For Loop', syntax: 'for (int i = 0; i < n; i++) {\\n    cout << i;\\n}' },
      { label: 'Function', syntax: 'int add(int a, int b) {\\n    return a + b;\\n}' },
      { label: 'Vector', syntax: 'vector<int> v = {1, 2, 3};' },
      { label: 'Map', syntax: 'map<string, int> m;\\nm["key"] = 42;' },
      { label: 'Class', syntax: 'class Dog {\\npublic:\\n    string name;\\n    Dog(string n) : name(n) {}\\n};' },
      { label: 'Pointer', syntax: 'int* ptr = &x;\\ncout << *ptr;' },
      { label: 'Reference', syntax: 'void swap(int& a, int& b) {\\n    int t = a; a = b; b = t;\\n}' },
      { label: 'Smart Ptr', syntax: 'auto ptr = make_unique<int>(42);' },
      { label: 'Template', syntax: 'template<typename T>\\nT maxVal(T a, T b) {\\n    return (a > b) ? a : b;\\n}' },
      { label: 'Lambda', syntax: 'auto add = [](int a, int b) { return a + b; };' },
      { label: 'Range For', syntax: 'for (auto& x : vec) {\\n    cout << x;\\n}' },
      { label: 'Include', syntax: '#include <iostream>\\n#include <vector>\\nusing namespace std;' },
      { label: 'String', syntax: 'string s = "Hello";\\ncout << s.length();' },
    ],
    modules: [
      {
        level: 'Beginner',
        icon: '🌱',
        topics: [
          {
            title: 'Variables, I/O & Data Types',
            description: 'C++ type system, cin/cout, and fundamental data types.',
            concepts: ['Primitives', 'cin/cout', 'sizeof', 'auto', 'Constants', 'Type Casting'],
            code: `// ── Variables, I/O & Data Types ──

#include <iostream>
#include <string>
using namespace std;

int main() {
    // Fundamental types
    int age = 25;
    double pi = 3.14159;
    float temperature = 98.6f;
    char grade = 'A';
    bool isActive = true;
    string name = "Alice";

    // Size of types
    cout << "int: " << sizeof(int) << " bytes" << endl;      // 4
    cout << "double: " << sizeof(double) << " bytes" << endl; // 8
    cout << "char: " << sizeof(char) << " byte" << endl;      // 1

    // Auto type deduction (C++11)
    auto x = 42;        // int
    auto y = 3.14;      // double
    auto s = "hello"s;  // string (with s literal)

    // Constants
    const int MAX_SIZE = 100;
    constexpr double GRAVITY = 9.81;  // Compile-time constant

    // Input / Output
    cout << "Enter your name: ";
    string userName;
    getline(cin, userName);
    cout << "Hello, " << userName << "!" << endl;

    // Type casting
    double d = 9.7;
    int i = static_cast<int>(d);     // 9 (C++ style)
    int j = (int)d;                  // 9 (C style)

    // Number formatting
    cout << fixed;
    cout.precision(2);
    cout << pi << endl;  // 3.14

    return 0;
}`,
          },
          {
            title: 'Control Flow & Functions',
            description: 'Conditionals, loops, and function definitions in C++.',
            concepts: ['if/else', 'switch', 'for/while', 'Functions', 'Overloading', 'References'],
            code: `// ── Control Flow & Functions ──

#include <iostream>
using namespace std;

// Function with default parameter
int power(int base, int exp = 2) {
    int result = 1;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

// Pass by reference
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

// Function overloading
double add(double a, double b) { return a + b; }
int add(int a, int b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }

int main() {
    // If / Else
    int score = 85;
    if (score >= 90) {
        cout << "A" << endl;
    } else if (score >= 80) {
        cout << "B" << endl;
    } else {
        cout << "C" << endl;
    }

    // Switch
    int day = 3;
    switch (day) {
        case 1: cout << "Mon"; break;
        case 2: cout << "Tue"; break;
        case 3: cout << "Wed"; break;
        default: cout << "Other";
    }

    // For loop
    for (int i = 0; i < 5; i++) {
        cout << i << " ";
    }

    // Range-based for (C++11)
    int arr[] = {10, 20, 30, 40, 50};
    for (int x : arr) {
        cout << x << " ";
    }

    // While and Do-While
    int n = 5;
    while (n > 0) { cout << n--; }
    
    do {
        cout << n++;
    } while (n < 3);

    // Function calls
    cout << power(3) << endl;      // 9
    cout << power(2, 10) << endl;  // 1024
    cout << add(3, 4) << endl;     // 7
    cout << add(3.5, 4.5) << endl; // 8.0

    int a = 5, b = 10;
    swap(a, b);
    cout << a << " " << b << endl; // 10 5

    return 0;
}`,
          },
          {
            title: 'Strings & Arrays',
            description: 'C++ strings, C-style arrays, and the std::array container.',
            concepts: ['std::string', 'C-strings', 'string methods', 'Arrays', 'std::array'],
            code: `// ── Strings & Arrays ──

#include <iostream>
#include <string>
#include <array>
#include <algorithm>
using namespace std;

int main() {
    // ─ Strings ─
    string s = "Hello, World!";
    
    // Common operations
    cout << s.length() << endl;        // 13
    cout << s.substr(0, 5) << endl;    // "Hello"
    cout << s.find("World") << endl;   // 7
    cout << s.at(0) << endl;           // 'H'
    
    s.append(" C++");                  // "Hello, World! C++"
    s.replace(7, 5, "C++");           // Replace "World" with "C++"
    s.insert(0, ">> ");               // Insert at beginning
    s.erase(0, 3);                    // Remove first 3 chars

    // String comparison
    string a = "abc", b = "xyz";
    if (a < b) cout << a << " comes first" << endl;

    // String to number / Number to string
    int num = stoi("42");
    double d = stod("3.14");
    string numStr = to_string(42);

    // ─ C-Style Arrays ─
    int arr[5] = {5, 3, 1, 4, 2};
    int size = sizeof(arr) / sizeof(arr[0]);
    
    // Sort
    sort(arr, arr + size);  // {1, 2, 3, 4, 5}

    // ─ std::array (C++11, safer) ─
    array<int, 5> stdArr = {5, 3, 1, 4, 2};
    sort(stdArr.begin(), stdArr.end());
    
    cout << stdArr.size() << endl;    // 5
    cout << stdArr.front() << endl;   // 1
    cout << stdArr.back() << endl;    // 5

    // 2D Array
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}`,
          },
        ],
      },
      {
        level: 'Intermediate',
        icon: '🌿',
        topics: [
          {
            title: 'STL Containers',
            description: 'Master vector, map, set, stack, queue, and their operations.',
            concepts: ['vector', 'map', 'set', 'unordered_map', 'stack', 'queue', 'priority_queue'],
            code: `// ── STL Containers ──

#include <iostream>
#include <vector>
#include <map>
#include <unordered_map>
#include <set>
#include <stack>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    // ─ Vector (dynamic array) ─
    vector<int> v = {5, 3, 1, 4, 2};
    v.push_back(6);
    v.pop_back();
    v.insert(v.begin() + 2, 99);
    v.erase(v.begin());
    sort(v.begin(), v.end());
    
    // Range-based iteration
    for (const auto& x : v) cout << x << " ";
    cout << endl;

    // ─ Map (sorted key-value) ─
    map<string, int> ages;
    ages["Alice"] = 30;
    ages["Bob"] = 25;
    ages.insert({"Charlie", 35});
    
    for (const auto& [name, age] : ages) {  // Structured binding
        cout << name << ": " << age << endl;
    }

    // ─ Unordered Map (hash map, O(1) average) ─
    unordered_map<string, int> freq;
    string words[] = {"apple", "banana", "apple", "cherry"};
    for (const auto& w : words) {
        freq[w]++;
    }

    // ─ Set (sorted unique elements) ─
    set<int> s = {3, 1, 4, 1, 5, 9};  // {1, 3, 4, 5, 9}
    s.insert(2);
    s.erase(4);
    cout << s.count(3) << endl;  // 1

    // ─ Stack (LIFO) ─
    stack<int> stk;
    stk.push(1); stk.push(2); stk.push(3);
    cout << stk.top() << endl;  // 3
    stk.pop();

    // ─ Queue (FIFO) ─
    queue<int> q;
    q.push(1); q.push(2); q.push(3);
    cout << q.front() << endl;  // 1
    q.pop();

    // ─ Priority Queue (max-heap by default) ─
    priority_queue<int> pq;
    pq.push(3); pq.push(1); pq.push(4);
    cout << pq.top() << endl;  // 4

    // Min-heap
    priority_queue<int, vector<int>, greater<int>> minPQ;
    minPQ.push(3); minPQ.push(1); minPQ.push(4);
    cout << minPQ.top() << endl;  // 1

    return 0;
}`,
          },
          {
            title: 'Pointers & Memory Management',
            description: 'Raw pointers, smart pointers, dynamic allocation, and RAII.',
            concepts: ['Pointers', 'References', 'new/delete', 'unique_ptr', 'shared_ptr', 'RAII'],
            code: `// ── Pointers & Memory Management ──

#include <iostream>
#include <memory>
using namespace std;

int main() {
    // ─ Raw Pointers ─
    int x = 42;
    int* ptr = &x;           // Pointer to x
    cout << *ptr << endl;    // 42 (dereference)
    cout << ptr << endl;     // Memory address
    
    *ptr = 100;              // Modify through pointer
    cout << x << endl;       // 100

    // Pointer arithmetic
    int arr[] = {10, 20, 30, 40, 50};
    int* p = arr;
    cout << *(p + 2) << endl;  // 30

    // Null pointer
    int* np = nullptr;
    if (np == nullptr) {
        cout << "Null pointer" << endl;
    }

    // ─ Dynamic allocation ─
    int* dynArr = new int[5];
    for (int i = 0; i < 5; i++) {
        dynArr[i] = i * 10;
    }
    delete[] dynArr;  // MUST free memory!

    int* single = new int(42);
    delete single;

    // ─ Smart Pointers (C++11, recommended) ─

    // unique_ptr: sole ownership
    auto uptr = make_unique<int>(42);
    cout << *uptr << endl;  // 42
    // auto uptr2 = uptr;  // ERROR! Can't copy
    auto uptr2 = move(uptr);  // OK, transfers ownership

    // shared_ptr: shared ownership
    auto sptr1 = make_shared<int>(42);
    auto sptr2 = sptr1;  // OK, reference counted
    cout << sptr1.use_count() << endl;  // 2

    // weak_ptr: non-owning reference
    weak_ptr<int> wptr = sptr1;
    if (auto locked = wptr.lock()) {
        cout << *locked << endl;  // 42
    }

    // Smart pointer with custom class
    struct Node {
        int data;
        unique_ptr<Node> next;
        Node(int d) : data(d), next(nullptr) {}
    };

    auto head = make_unique<Node>(1);
    head->next = make_unique<Node>(2);
    head->next->next = make_unique<Node>(3);
    // Memory automatically freed when head goes out of scope!

    return 0;
}`,
          },
          {
            title: 'OOP in C++',
            description: 'Classes, inheritance, operator overloading, and virtual functions.',
            concepts: ['Classes', 'Constructors', 'Inheritance', 'Virtual Functions', 'Operator Overloading'],
            code: `// ── OOP in C++ ──

#include <iostream>
#include <string>
#include <cmath>
using namespace std;

// Base class
class Shape {
protected:
    string color;
public:
    Shape(const string& c) : color(c) {}
    virtual ~Shape() = default;  // Virtual destructor

    virtual double area() const = 0;      // Pure virtual
    virtual double perimeter() const = 0;

    virtual void print() const {
        cout << color << " shape, area = " << area() << endl;
    }
};

// Derived class
class Circle : public Shape {
    double radius;
public:
    Circle(const string& c, double r) : Shape(c), radius(r) {}

    double area() const override {
        return M_PI * radius * radius;
    }

    double perimeter() const override {
        return 2 * M_PI * radius;
    }
};

// Operator overloading
class Vector2D {
    double x, y;
public:
    Vector2D(double x = 0, double y = 0) : x(x), y(y) {}

    // Addition
    Vector2D operator+(const Vector2D& other) const {
        return {x + other.x, y + other.y};
    }

    // Scalar multiplication
    Vector2D operator*(double scalar) const {
        return {x * scalar, y * scalar};
    }

    // Equality
    bool operator==(const Vector2D& other) const {
        return x == other.x && y == other.y;
    }

    // Stream output
    friend ostream& operator<<(ostream& os, const Vector2D& v) {
        os << "(" << v.x << ", " << v.y << ")";
        return os;
    }

    double magnitude() const {
        return sqrt(x * x + y * y);
    }
};

int main() {
    // Polymorphism
    Circle c("Red", 5.0);
    Shape* s = &c;
    s->print();  // "Red shape, area = 78.54"

    // Operator overloading
    Vector2D a(3, 4), b(1, 2);
    Vector2D c2 = a + b;
    cout << c2 << endl;           // (4, 6)
    cout << (a * 2) << endl;      // (6, 8)
    cout << a.magnitude() << endl; // 5

    return 0;
}`,
          },
        ],
      },
      {
        level: 'Advanced',
        icon: '🌳',
        topics: [
          {
            title: 'Templates & Metaprogramming',
            description: 'Function templates, class templates, variadic templates, and concepts.',
            concepts: ['Function Templates', 'Class Templates', 'Variadic', 'SFINAE', 'Concepts (C++20)'],
            code: `// ── Templates & Metaprogramming ──

#include <iostream>
#include <vector>
#include <type_traits>
using namespace std;

// Function template
template<typename T>
T maxVal(T a, T b) {
    return (a > b) ? a : b;
}

// Class template
template<typename T, size_t N>
class Array {
    T data[N];
public:
    T& operator[](size_t i) { return data[i]; }
    const T& operator[](size_t i) const { return data[i]; }
    constexpr size_t size() const { return N; }

    void fill(const T& val) {
        for (size_t i = 0; i < N; i++) data[i] = val;
    }
};

// Template specialization
template<typename T>
string typeName() { return "unknown"; }

template<> string typeName<int>() { return "int"; }
template<> string typeName<double>() { return "double"; }
template<> string typeName<string>() { return "string"; }

// Variadic template (C++11)
template<typename T>
T sum(T val) { return val; }

template<typename T, typename... Args>
T sum(T first, Args... rest) {
    return first + sum(rest...);
}

// Compile-time factorial
template<int N>
struct Factorial {
    static constexpr int value = N * Factorial<N-1>::value;
};
template<>
struct Factorial<0> {
    static constexpr int value = 1;
};

// C++20 Concepts (type constraints)
// template<typename T>
// concept Numeric = is_arithmetic_v<T>;
//
// template<Numeric T>
// T square(T x) { return x * x; }

int main() {
    cout << maxVal(3, 7) << endl;          // 7
    cout << maxVal(3.14, 2.72) << endl;    // 3.14
    cout << maxVal<string>("abc", "xyz") << endl;  // xyz

    Array<int, 5> arr;
    arr.fill(42);
    cout << arr[0] << endl;  // 42

    cout << sum(1, 2, 3, 4, 5) << endl;  // 15

    constexpr int fact5 = Factorial<5>::value;
    cout << "5! = " << fact5 << endl;  // 120

    return 0;
}`,
          },
          {
            title: 'Modern C++ Features',
            description: 'Move semantics, structured bindings, std::optional, and ranges.',
            concepts: ['Move Semantics', 'Structured Bindings', 'optional', 'variant', 'Ranges (C++20)'],
            code: `// ── Modern C++ Features ──

#include <iostream>
#include <string>
#include <vector>
#include <optional>
#include <variant>
#include <tuple>
#include <algorithm>
using namespace std;

// ── Move Semantics ──
class Buffer {
    int* data;
    size_t size;
public:
    // Constructor
    Buffer(size_t s) : size(s), data(new int[s]) {
        cout << "Constructed " << size << endl;
    }
    
    // Copy constructor
    Buffer(const Buffer& other) : size(other.size), data(new int[other.size]) {
        copy(other.data, other.data + size, data);
        cout << "Copied " << size << endl;
    }

    // Move constructor (steals resources)
    Buffer(Buffer&& other) noexcept : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
        cout << "Moved " << size << endl;
    }

    ~Buffer() { delete[] data; }
};

// ── Structured Bindings (C++17) ──
tuple<string, int, double> getUserInfo() {
    return {"Alice", 30, 3.9};
}

// ── std::optional (C++17) ──
optional<int> findIndex(const vector<int>& v, int target) {
    for (size_t i = 0; i < v.size(); i++) {
        if (v[i] == target) return i;
    }
    return nullopt;
}

// ── std::variant (C++17, type-safe union) ──
using JsonValue = variant<int, double, string, bool>;

string jsonToString(const JsonValue& val) {
    return visit([](auto&& arg) -> string {
        using T = decay_t<decltype(arg)>;
        if constexpr (is_same_v<T, string>) return arg;
        else if constexpr (is_same_v<T, bool>) return arg ? "true" : "false";
        else return to_string(arg);
    }, val);
}

int main() {
    // Move semantics
    Buffer b1(1000);
    Buffer b2 = move(b1);  // "Moved 1000"

    // Structured bindings
    auto [name, age, gpa] = getUserInfo();
    cout << name << ", " << age << ", " << gpa << endl;

    // Optional
    vector<int> nums = {10, 20, 30, 40};
    if (auto idx = findIndex(nums, 30)) {
        cout << "Found at index " << *idx << endl;
    }
    cout << findIndex(nums, 99).value_or(-1) << endl;  // -1

    // Variant
    JsonValue v1 = 42;
    JsonValue v2 = "hello"s;
    cout << jsonToString(v1) << endl;  // "42"
    cout << jsonToString(v2) << endl;  // "hello"

    // If-init statements (C++17)
    if (auto it = nums.begin(); it != nums.end()) {
        cout << "First: " << *it << endl;
    }

    return 0;
}`,
          },
        ],
      },
    ],
  },

  // ╔══════════════════════════════════════════════════╗
  // ║                  JAVASCRIPT                      ║
  // ╚══════════════════════════════════════════════════╝
  javascript: {
    name: 'JavaScript',
    tagline: 'The language of the web',
    color: '#F7DF1E',
    accent: '#323330',
    cheatSheet: [
      { label: 'Variable', syntax: 'let x = 10;\\nconst y = 20;' },
      { label: 'Print', syntax: 'console.log("Hello");' },
      { label: 'If / Else', syntax: 'if (x > 5) {\\n    // ...\\n} else {\\n    // ...\\n}' },
      { label: 'For Loop', syntax: 'for (let i = 0; i < 5; i++) {\\n    console.log(i);\\n}' },
      { label: 'Function', syntax: 'function greet(name) {\\n    return \\`Hello, ${name}\\`;\\n}' },
      { label: 'Arrow Fn', syntax: 'const add = (a, b) => a + b;' },
      { label: 'Array', syntax: 'const arr = [1, 2, 3];' },
      { label: 'Object', syntax: 'const obj = { name: "Alice", age: 25 };' },
      { label: 'Destructure', syntax: 'const { name, age } = person;\\nconst [a, b] = [1, 2];' },
      { label: 'Spread', syntax: 'const merged = [...arr1, ...arr2];' },
      { label: 'Template Lit', syntax: 'console.log(\\`Value: ${x}\\`);' },
      { label: 'Promise', syntax: 'fetch(url)\\n  .then(res => res.json())\\n  .then(data => console.log(data));' },
      { label: 'Async/Await', syntax: 'async function getData() {\\n    const res = await fetch(url);\\n    return res.json();\\n}' },
      { label: 'Map/Filter', syntax: 'arr.map(x => x * 2);\\narr.filter(x => x > 5);' },
      { label: 'Class', syntax: 'class Dog {\\n    constructor(name) {\\n        this.name = name;\\n    }\\n}' },
      { label: 'Module', syntax: 'export const add = (a, b) => a + b;\\nimport { add } from "./math.js";' },
    ],
    modules: [
      {
        level: 'Beginner',
        icon: '🌱',
        topics: [
          {
            title: 'Variables, Types & Operators',
            description: 'let vs const vs var, primitive types, and type coercion.',
            concepts: ['let/const/var', 'Primitives', 'typeof', 'Type Coercion', 'Equality'],
            code: `// ── Variables, Types & Operators ──

// Variable declarations
let count = 0;          // Reassignable, block-scoped
const PI = 3.14159;     // Cannot reassign, block-scoped
var legacy = "old";     // Function-scoped (avoid!)

// Primitive types
const str = "Hello";          // String
const num = 42;               // Number
const big = 9007199254740991n; // BigInt
const bool = true;            // Boolean
const nothing = null;         // Null
const undef = undefined;      // Undefined
const sym = Symbol("id");     // Symbol

// typeof
console.log(typeof str);      // "string"
console.log(typeof num);      // "number"
console.log(typeof null);     // "object" (quirk!)

// Type coercion (be careful!)
console.log("5" + 3);         // "53" (string concat)
console.log("5" - 3);         // 2 (numeric)
console.log(true + 1);        // 2
console.log("" == false);     // true (loose)
console.log("" === false);    // false (strict)

// Always use === (strict equality)
console.log(0 === false);     // false
console.log(null === undefined); // false
console.log(NaN === NaN);     // false (use Number.isNaN)

// Arithmetic
console.log(10 % 3);          // 1
console.log(2 ** 10);         // 1024

// Logical operators
console.log(true && false);   // false
console.log(true || false);   // true
console.log(!true);           // false

// Nullish coalescing (??) & Optional chaining (?.)
const user = { name: "Alice", address: null };
console.log(user.address?.city ?? "Unknown"); // "Unknown"`,
          },
          {
            title: 'Functions & Scope',
            description: 'Function declarations, arrow functions, closures, and scope rules.',
            concepts: ['Declaration', 'Expression', 'Arrow', 'Closures', 'IIFE', 'Default Params'],
            code: `// ── Functions & Scope ──

// Function declaration (hoisted)
function greet(name) {
    return \`Hello, \${name}!\`;
}

// Function expression
const square = function(x) {
    return x * x;
};

// Arrow function (concise)
const add = (a, b) => a + b;
const double = x => x * 2;  // Single param, no parens needed
const getObj = () => ({ key: "value" }); // Return object

// Default parameters
function createUser(name, role = "user", active = true) {
    return { name, role, active };
}

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// ── Closures ──
function createCounter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count,
    };
}
const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2

// IIFE (Immediately Invoked Function Expression)
const result = (() => {
    const secret = "hidden";
    return secret.toUpperCase();
})();
console.log(result); // "HIDDEN"

// Higher-order functions
function withLogging(fn) {
    return function(...args) {
        console.log(\`Calling with: \${args}\`);
        const result = fn(...args);
        console.log(\`Result: \${result}\`);
        return result;
    };
}
const loggedAdd = withLogging(add);
loggedAdd(3, 4); // Logs: Calling with: 3,4 → Result: 7`,
          },
          {
            title: 'Arrays & Array Methods',
            description: 'Array operations, iteration methods, and functional array processing.',
            concepts: ['push/pop', 'map/filter/reduce', 'find/some/every', 'sort', 'Destructuring', 'Spread'],
            code: `// ── Arrays & Array Methods ──

const fruits = ["apple", "banana", "cherry", "date"];

// Basic operations
fruits.push("elderberry");    // Add to end
fruits.pop();                 // Remove from end
fruits.unshift("avocado");    // Add to start
fruits.shift();               // Remove from start
fruits.splice(1, 1, "blueberry"); // Replace at index

// ── Functional methods (return NEW arrays) ──
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Map: transform each element
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// Filter: keep elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6, 8, 10]

// Reduce: accumulate to single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 55

// Find / FindIndex
const found = numbers.find(n => n > 5);       // 6
const idx = numbers.findIndex(n => n > 5);     // 5

// Some / Every
const hasEven = numbers.some(n => n % 2 === 0);   // true
const allPos = numbers.every(n => n > 0);          // true

// Chaining
const result = numbers
    .filter(n => n % 2 === 0)
    .map(n => n ** 2)
    .reduce((acc, n) => acc + n, 0);
// 4 + 16 + 36 + 64 + 100 = 220

// ── Destructuring ──
const [first, second, ...rest] = numbers;
// first = 1, second = 2, rest = [3,4,5,6,7,8,9,10]

// ── Spread operator ──
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];  // [1,2,3,4,5,6]
const copy = [...arr1];            // Shallow copy

// Sort (mutates!)
const sorted = [...numbers].sort((a, b) => b - a);  // Descending

// Flat & FlatMap
const nested = [[1, 2], [3, [4, 5]]];
console.log(nested.flat(Infinity));  // [1, 2, 3, 4, 5]`,
          },
          {
            title: 'Objects & Destructuring',
            description: 'Object creation, methods, destructuring, and computed properties.',
            concepts: ['Object Literals', 'Methods', 'Destructuring', 'Spread', 'Computed Keys', 'this'],
            code: `// ── Objects & Destructuring ──

// Object literal
const user = {
    name: "Alice",
    age: 30,
    email: "alice@example.com",
    address: {
        city: "NYC",
        zip: "10001"
    },
    greet() {
        return \`Hi, I'm \${this.name}\`;
    }
};

// Access
console.log(user.name);           // "Alice"
console.log(user["age"]);         // 30
console.log(user.address.city);   // "NYC"

// ── Destructuring ──
const { name, age, email } = user;
const { address: { city } } = user;  // Nested

// Rename & defaults
const { name: userName, phone = "N/A" } = user;

// ── Spread operator ──
const updated = { ...user, age: 31, role: "admin" };
const { greet, ...userData } = user;  // Rest (omit greet)

// ── Computed property names ──
const key = "score";
const obj = { [key]: 100, [\`\${key}Label\`]: "Points" };
// { score: 100, scoreLabel: "Points" }

// ── Object methods ──
console.log(Object.keys(user));     // ["name", "age", "email", ...]
console.log(Object.values(user));   // ["Alice", 30, ...]
console.log(Object.entries(user));  // [["name","Alice"], ...]

// Check property
console.log("name" in user);       // true
console.log(user.hasOwnProperty("age")); // true

// Freeze & Seal
const config = Object.freeze({ api: "/v1", debug: false });
// config.debug = true;  // Silently fails (or throws in strict)

// ── Shorthand ──
const x = 10, y = 20;
const point = { x, y };  // { x: 10, y: 20 }

// ── Optional chaining ──
const city2 = user?.address?.city ?? "Unknown";
const len = user?.friends?.length ?? 0;`,
          },
        ],
      },
      {
        level: 'Intermediate',
        icon: '🌿',
        topics: [
          {
            title: 'Async Programming',
            description: 'Callbacks, Promises, async/await, and error handling in async code.',
            concepts: ['Callbacks', 'Promises', 'async/await', 'Promise.all', 'Error Handling'],
            code: `// ── Async Programming ──

// ── Promises ──
const fetchUser = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: "Alice" });
            } else {
                reject(new Error("Invalid ID"));
            }
        }, 1000);
    });
};

// Promise chaining
fetchUser(1)
    .then(user => {
        console.log(user.name);
        return fetchUser(2);
    })
    .then(user2 => console.log(user2))
    .catch(err => console.error(err))
    .finally(() => console.log("Done"));

// ── Async / Await (cleaner syntax) ──
async function getUsers() {
    try {
        const user1 = await fetchUser(1);
        const user2 = await fetchUser(2);
        console.log(user1, user2);
    } catch (error) {
        console.error("Failed:", error.message);
    }
}

// ── Parallel execution ──
async function getAllUsers() {
    const [u1, u2, u3] = await Promise.all([
        fetchUser(1),
        fetchUser(2),
        fetchUser(3)
    ]);
    console.log(u1, u2, u3);
}

// Promise.allSettled (doesn't fail-fast)
const results = await Promise.allSettled([
    fetchUser(1),
    fetchUser(-1),  // This will reject
    fetchUser(3)
]);
results.forEach(r => {
    if (r.status === "fulfilled") console.log(r.value);
    else console.log("Error:", r.reason.message);
});

// Promise.race (first to resolve/reject)
const fastest = await Promise.race([
    fetchUser(1),
    new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Timeout")), 500)
    )
]);

// ── Fetch API ──
async function fetchPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    const posts = await response.json();
    return posts.slice(0, 5);
}`,
          },
          {
            title: 'Classes & Prototypes',
            description: 'ES6 classes, inheritance, static methods, and the prototype chain.',
            concepts: ['Classes', 'constructor', 'extends', 'static', 'Getters/Setters', 'Prototypes'],
            code: `// ── Classes & Prototypes ──

class EventEmitter {
    #listeners = {};  // Private field

    on(event, callback) {
        if (!this.#listeners[event]) {
            this.#listeners[event] = [];
        }
        this.#listeners[event].push(callback);
        return this;  // Enable chaining
    }

    emit(event, ...args) {
        const callbacks = this.#listeners[event] || [];
        callbacks.forEach(cb => cb(...args));
    }

    off(event, callback) {
        if (this.#listeners[event]) {
            this.#listeners[event] = this.#listeners[event]
                .filter(cb => cb !== callback);
        }
    }
}

// Inheritance
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        return \`\${this.name} makes a noise\`;
    }

    // Getter
    get info() {
        return \`Animal: \${this.name}\`;
    }

    // Static method
    static create(name) {
        return new Animal(name);
    }
}

class Dog extends Animal {
    #breed;  // Private field

    constructor(name, breed) {
        super(name);  // Call parent constructor
        this.#breed = breed;
    }

    speak() {
        return \`\${this.name} barks!\`;
    }

    get breed() {
        return this.#breed;
    }

    // Static
    static isDog(animal) {
        return animal instanceof Dog;
    }
}

// Usage
const dog = new Dog("Rex", "German Shepherd");
console.log(dog.speak());     // "Rex barks!"
console.log(dog.info);        // "Animal: Rex"
console.log(dog.breed);       // "German Shepherd"
console.log(Dog.isDog(dog));  // true

// ── Prototype chain ──
console.log(dog instanceof Dog);      // true
console.log(dog instanceof Animal);   // true
console.log(Object.getPrototypeOf(dog) === Dog.prototype); // true`,
          },
          {
            title: 'ES6+ Modern Features',
            description: 'Modules, iterators, generators, Symbols, Proxy, and Reflect.',
            concepts: ['Modules', 'Iterators', 'Generators', 'Symbol', 'Proxy', 'Map/Set'],
            code: `// ── ES6+ Modern Features ──

// ── Map (key-value, any type key) ──
const map = new Map();
map.set("name", "Alice");
map.set(42, "the answer");
map.set(true, "yes");
console.log(map.get("name"));  // "Alice"
console.log(map.size);         // 3

for (const [key, value] of map) {
    console.log(\`\${key}: \${value}\`);
}

// ── Set (unique values) ──
const set = new Set([1, 2, 3, 2, 1]);
console.log(set.size);  // 3
set.add(4);
set.delete(1);
console.log(set.has(2));  // true

// Deduplicate array
const unique = [...new Set([1, 2, 2, 3, 3, 3])];

// ── Generators ──
function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2

// Take first N values
function* take(iterable, n) {
    let i = 0;
    for (const val of iterable) {
        if (i++ >= n) return;
        yield val;
    }
}
console.log([...take(fibonacci(), 8)]);
// [0, 1, 1, 2, 3, 5, 8, 13]

// ── Proxy ──
const handler = {
    get(target, prop) {
        return prop in target ? target[prop] : \`No property: \${prop}\`;
    },
    set(target, prop, value) {
        if (typeof value !== "number") {
            throw new TypeError("Value must be a number");
        }
        target[prop] = value;
        return true;
    }
};

const scores = new Proxy({}, handler);
scores.math = 95;
console.log(scores.math);      // 95
console.log(scores.science);   // "No property: science"

// ── WeakMap & WeakRef ──
const weakMap = new WeakMap();
let obj = { data: "important" };
weakMap.set(obj, "metadata");
// When obj is garbage collected, the entry is auto-removed`,
          },
        ],
      },
      {
        level: 'Advanced',
        icon: '🌳',
        topics: [
          {
            title: 'Design Patterns in JS',
            description: 'Common design patterns: Singleton, Observer, Factory, and Module.',
            concepts: ['Singleton', 'Observer', 'Factory', 'Strategy', 'Module Pattern'],
            code: `// ── Design Patterns in JS ──

// ── Singleton ──
class Database {
    static #instance = null;
    #connection = null;

    constructor() {
        if (Database.#instance) {
            return Database.#instance;
        }
        this.#connection = "connected";
        Database.#instance = this;
    }

    query(sql) {
        return \`Executing: \${sql}\`;
    }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2);  // true

// ── Observer Pattern ──
class Store {
    #state;
    #listeners = new Set();

    constructor(initialState) {
        this.#state = initialState;
    }

    getState() { return this.#state; }

    setState(updater) {
        this.#state = { ...this.#state, ...updater(this.#state) };
        this.#listeners.forEach(fn => fn(this.#state));
    }

    subscribe(listener) {
        this.#listeners.add(listener);
        return () => this.#listeners.delete(listener);
    }
}

const store = new Store({ count: 0, name: "App" });
const unsub = store.subscribe(state => console.log("Update:", state));
store.setState(s => ({ count: s.count + 1 }));

// ── Factory Pattern ──
class UserFactory {
    static create(type, name) {
        switch (type) {
            case "admin":
                return { name, role: "admin", permissions: ["read", "write", "delete"] };
            case "editor":
                return { name, role: "editor", permissions: ["read", "write"] };
            default:
                return { name, role: "viewer", permissions: ["read"] };
        }
    }
}

const admin = UserFactory.create("admin", "Alice");

// ── Strategy Pattern ──
const strategies = {
    bubble: (arr) => { /* bubble sort */ return [...arr].sort((a,b) => a-b); },
    quick:  (arr) => { /* quick sort */  return [...arr].sort((a,b) => a-b); },
    merge:  (arr) => { /* merge sort */  return [...arr].sort((a,b) => a-b); },
};

class Sorter {
    #strategy;
    
    constructor(strategyName = "quick") {
        this.#strategy = strategies[strategyName];
    }

    sort(data) {
        return this.#strategy(data);
    }

    setStrategy(name) {
        this.#strategy = strategies[name];
    }
}

const sorter = new Sorter("bubble");
console.log(sorter.sort([5, 3, 1, 4, 2]));`,
          },
          {
            title: 'Event Loop & Performance',
            description: 'Understanding the event loop, microtasks, Web Workers, and optimization.',
            concepts: ['Call Stack', 'Event Loop', 'Microtasks', 'Web Workers', 'Performance'],
            code: `// ── Event Loop & Performance ──

// ── Event Loop Order ──
console.log("1: Synchronous");

setTimeout(() => {
    console.log("4: setTimeout (macrotask)");
}, 0);

Promise.resolve().then(() => {
    console.log("3: Promise (microtask)");
});

queueMicrotask(() => {
    console.log("2: queueMicrotask");
});

// Output order: 1 → 2 → 3 → 4
// Synchronous → Microtasks → Macrotasks

// ── Debounce ──
function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

const search = debounce((query) => {
    console.log(\`Searching: \${query}\`);
}, 300);

// ── Throttle ──
function throttle(fn, limit) {
    let inThrottle = false;
    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ── Lazy evaluation with generators ──
function* lazyRange(start, end) {
    for (let i = start; i < end; i++) {
        yield i;
    }
}

// Process millions of items without blocking
async function processLargeDataset(data) {
    const CHUNK_SIZE = 1000;
    
    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
        const chunk = data.slice(i, i + CHUNK_SIZE);
        chunk.forEach(item => {/* process */});
        
        // Yield to event loop between chunks
        await new Promise(resolve => setTimeout(resolve, 0));
    }
}

// ── Memoization ──
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const expensiveFib = memoize(function fib(n) {
    if (n <= 1) return n;
    return expensiveFib(n - 1) + expensiveFib(n - 2);
});

console.log(expensiveFib(100));  // Instant!`,
          },
        ],
      },
    ],
  },

  // ╔══════════════════════════════════════════════════╗
  // ║                      GO                          ║
  // ╚══════════════════════════════════════════════════╝
  go: {
    name: 'Go',
    tagline: 'Simple, fast, concurrent',
    color: '#00ADD8',
    accent: '#00A29C',
    cheatSheet: [
      { label: 'Variable', syntax: 'x := 10\\nvar y int = 20' },
      { label: 'Print', syntax: 'fmt.Println("Hello")' },
      { label: 'If / Else', syntax: 'if x > 5 {\\n    // ...\\n} else {\\n    // ...\\n}' },
      { label: 'For Loop', syntax: 'for i := 0; i < 5; i++ {\\n    fmt.Println(i)\\n}' },
      { label: 'Function', syntax: 'func add(a, b int) int {\\n    return a + b\\n}' },
      { label: 'Slice', syntax: 'nums := []int{1, 2, 3}' },
      { label: 'Map', syntax: 'ages := map[string]int{\\n    "Alice": 30,\\n}' },
      { label: 'Struct', syntax: 'type Dog struct {\\n    Name string\\n    Age  int\\n}' },
      { label: 'Interface', syntax: 'type Stringer interface {\\n    String() string\\n}' },
      { label: 'Goroutine', syntax: 'go func() {\\n    fmt.Println("async")\\n}()' },
      { label: 'Channel', syntax: 'ch := make(chan int)\\nch <- 42\\nval := <-ch' },
      { label: 'Error', syntax: 'if err != nil {\\n    log.Fatal(err)\\n}' },
      { label: 'Defer', syntax: 'defer file.Close()' },
      { label: 'Pointer', syntax: 'ptr := &x\\nfmt.Println(*ptr)' },
      { label: 'Multi Return', syntax: 'func divide(a, b float64) (float64, error) {\\n    if b == 0 { return 0, errors.New("div by 0") }\\n    return a / b, nil\\n}' },
      { label: 'Range', syntax: 'for i, v := range slice {\\n    fmt.Println(i, v)\\n}' },
    ],
    modules: [
      {
        level: 'Beginner',
        icon: '🌱',
        topics: [
          {
            title: 'Variables, Types & I/O',
            description: "Go's type system, variable declarations, and basic I/O.",
            concepts: ['var/:=', 'Primitives', 'fmt', 'Constants', 'Type Conversion', 'Zero Values'],
            code: `// ── Variables, Types & I/O ──
package main

import "fmt"

func main() {
    // Variable declaration
    var name string = "Alice"
    var age int = 25
    var height float64 = 5.7
    var isStudent bool = true

    // Short declaration (type inferred)
    city := "NYC"
    score := 95.5

    // Multiple assignment
    x, y, z := 1, 2, 3

    // Zero values (defaults)
    var i int        // 0
    var f float64    // 0.0
    var b bool       // false
    var s string     // ""

    // Constants
    const PI = 3.14159
    const (
        StatusOK    = 200
        StatusError = 500
    )

    // iota (auto-incrementing)
    const (
        Sunday = iota  // 0
        Monday         // 1
        Tuesday        // 2
    )

    // Print formatting
    fmt.Println("Name:", name)
    fmt.Printf("Age: %d, Height: %.1f\\n", age, height)
    fmt.Printf("Type of score: %T\\n", score)

    // Type conversion (explicit, no coercion!)
    var intVal int = 42
    var floatVal float64 = float64(intVal)
    var strVal string = fmt.Sprintf("%d", intVal)

    fmt.Println(name, city, isStudent, x, y, z, i, f, b, s)
    fmt.Println(floatVal, strVal)
}`,
          },
          {
            title: 'Control Flow & Functions',
            description: 'if/else, for loops, switch, and function definitions.',
            concepts: ['if/else', 'for', 'switch', 'Functions', 'Multiple Returns', 'Defer'],
            code: `// ── Control Flow & Functions ──
package main

import (
    "errors"
    "fmt"
)

// Function with multiple returns
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

// Named return values
func swap(a, b int) (x, y int) {
    x = b
    y = a
    return  // Naked return
}

// Variadic function
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

// Function as value / closure
func makeAdder(x int) func(int) int {
    return func(y int) int {
        return x + y
    }
}

func main() {
    // If with init statement
    if result, err := divide(10, 3); err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Printf("Result: %.2f\\n", result)
    }

    // For loop (only loop in Go!)
    for i := 0; i < 5; i++ {
        fmt.Print(i, " ")
    }

    // While-style
    n := 10
    for n > 0 {
        n--
    }

    // Infinite loop
    // for { break }

    // Range over slice
    fruits := []string{"apple", "banana", "cherry"}
    for idx, fruit := range fruits {
        fmt.Printf("%d: %s\\n", idx, fruit)
    }

    // Switch (no break needed!)
    day := "Wed"
    switch day {
    case "Mon", "Tue":
        fmt.Println("Early week")
    case "Wed":
        fmt.Println("Midweek")
    default:
        fmt.Println("Late week")
    }

    // Defer (runs when function exits, LIFO)
    defer fmt.Println("3: last")
    defer fmt.Println("2: middle")
    fmt.Println("1: first")

    // Closures
    add5 := makeAdder(5)
    fmt.Println(add5(3))  // 8

    fmt.Println(sum(1, 2, 3, 4, 5))  // 15
}`,
          },
          {
            title: 'Slices, Maps & Structs',
            description: "Go's core data structures and how to work with them.",
            concepts: ['Slices', 'Maps', 'Structs', 'make', 'append', 'Range'],
            code: `// ── Slices, Maps & Structs ──
package main

import "fmt"

// Struct definition
type Person struct {
    Name string
    Age  int
    City string
}

// Method on struct
func (p Person) Greet() string {
    return fmt.Sprintf("Hi, I'm %s from %s", p.Name, p.City)
}

// Pointer receiver (can modify)
func (p *Person) Birthday() {
    p.Age++
}

func main() {
    // ─ Slices (dynamic arrays) ─
    nums := []int{5, 3, 1, 4, 2}
    
    // Append
    nums = append(nums, 6, 7)
    
    // Slicing
    sub := nums[1:4]  // [3, 1, 4]
    
    // Make (preallocate)
    grid := make([][]int, 3)
    for i := range grid {
        grid[i] = make([]int, 3)
    }
    
    // Length vs Capacity
    s := make([]int, 3, 10)
    fmt.Println(len(s), cap(s))  // 3, 10

    // Copy
    src := []int{1, 2, 3}
    dst := make([]int, len(src))
    copy(dst, src)

    // ─ Maps (hash tables) ─
    ages := map[string]int{
        "Alice": 30,
        "Bob":   25,
    }
    
    ages["Charlie"] = 35
    delete(ages, "Bob")
    
    // Check existence
    if age, ok := ages["Alice"]; ok {
        fmt.Printf("Alice is %d\\n", age)
    }
    
    // Iterate
    for name, age := range ages {
        fmt.Printf("%s: %d\\n", name, age)
    }

    // ─ Structs ─
    alice := Person{Name: "Alice", Age: 30, City: "NYC"}
    bob := Person{"Bob", 25, "LA"}  // Positional
    
    fmt.Println(alice.Greet())
    alice.Birthday()
    fmt.Println(alice.Age)  // 31
    
    // Pointer to struct
    ptr := &alice
    ptr.Age = 32  // Go auto-dereferences
    
    // Anonymous struct
    config := struct {
        Host string
        Port int
    }{Host: "localhost", Port: 8080}
    fmt.Println(config)
}`,
          },
        ],
      },
      {
        level: 'Intermediate',
        icon: '🌿',
        topics: [
          {
            title: 'Interfaces & Composition',
            description: 'Go interfaces, implicit implementation, and composition over inheritance.',
            concepts: ['Interfaces', 'Type Assertion', 'Type Switch', 'Embedding', 'Composition'],
            code: `// ── Interfaces & Composition ──
package main

import (
    "fmt"
    "math"
)

// Interface
type Shape interface {
    Area() float64
    Perimeter() float64
}

// Stringer interface (like toString)
type Stringer interface {
    String() string
}

// Circle implements Shape implicitly
type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

func (c Circle) Perimeter() float64 {
    return 2 * math.Pi * c.Radius
}

func (c Circle) String() string {
    return fmt.Sprintf("Circle(r=%.2f)", c.Radius)
}

// Rectangle implements Shape
type Rectangle struct {
    Width, Height float64
}

func (r Rectangle) Area() float64 { return r.Width * r.Height }
func (r Rectangle) Perimeter() float64 { return 2 * (r.Width + r.Height) }

// Function accepting interface
func printShape(s Shape) {
    fmt.Printf("Area: %.2f, Perimeter: %.2f\\n", s.Area(), s.Perimeter())
}

// ── Composition (embedding) ──
type Animal struct {
    Name string
}

func (a Animal) Speak() string {
    return a.Name + " makes a sound"
}

type Dog struct {
    Animal  // Embedded (composition)
    Breed string
}

func (d Dog) Fetch(item string) string {
    return d.Name + " fetches " + item
}

func main() {
    shapes := []Shape{
        Circle{5},
        Rectangle{4, 6},
    }
    
    for _, s := range shapes {
        printShape(s)
        
        // Type assertion
        if c, ok := s.(Circle); ok {
            fmt.Println("Radius:", c.Radius)
        }
    }

    // Type switch
    for _, s := range shapes {
        switch v := s.(type) {
        case Circle:
            fmt.Println("Circle with radius", v.Radius)
        case Rectangle:
            fmt.Println("Rectangle", v.Width, "x", v.Height)
        }
    }

    // Composition
    dog := Dog{
        Animal: Animal{Name: "Rex"},
        Breed:  "Labrador",
    }
    fmt.Println(dog.Speak())       // From embedded Animal
    fmt.Println(dog.Fetch("ball")) // From Dog
}`,
          },
          {
            title: 'Error Handling',
            description: "Go's explicit error handling, custom errors, and panic/recover.",
            concepts: ['error interface', 'errors.Is/As', 'Custom Errors', 'panic/recover', 'Wrapping'],
            code: `// ── Error Handling ──
package main

import (
    "errors"
    "fmt"
)

// Custom error type
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation error: %s - %s", e.Field, e.Message)
}

// Sentinel errors
var (
    ErrNotFound     = errors.New("not found")
    ErrUnauthorized = errors.New("unauthorized")
)

// Function returning error
func findUser(id int) (string, error) {
    if id <= 0 {
        return "", &ValidationError{
            Field:   "id",
            Message: "must be positive",
        }
    }
    if id > 100 {
        return "", fmt.Errorf("user %d: %w", id, ErrNotFound)
    }
    return "Alice", nil
}

// Error wrapping
func getUserProfile(id int) (string, error) {
    name, err := findUser(id)
    if err != nil {
        return "", fmt.Errorf("getUserProfile: %w", err)
    }
    return "Profile: " + name, nil
}

func main() {
    // Basic error handling
    name, err := findUser(0)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("User:", name)
    }

    // errors.Is (check wrapped errors)
    _, err = getUserProfile(999)
    if errors.Is(err, ErrNotFound) {
        fmt.Println("User not found!")
    }

    // errors.As (extract error type)
    _, err = findUser(-1)
    var valErr *ValidationError
    if errors.As(err, &valErr) {
        fmt.Printf("Field: %s, Msg: %s\\n", valErr.Field, valErr.Message)
    }

    // ── Panic & Recover ──
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered from panic:", r)
        }
    }()

    // panic("something went terribly wrong")
    // ^ Only use for truly unrecoverable errors

    fmt.Println("Program continues normally")
}`,
          },
        ],
      },
      {
        level: 'Advanced',
        icon: '🌳',
        topics: [
          {
            title: 'Goroutines & Channels',
            description: 'Concurrent programming with goroutines, channels, select, and sync.',
            concepts: ['Goroutines', 'Channels', 'Buffered Channels', 'Select', 'WaitGroup', 'Mutex'],
            code: `// ── Goroutines & Channels ──
package main

import (
    "fmt"
    "sync"
    "time"
)

// Worker pool pattern
func worker(id int, jobs <-chan int, results chan<- int) {
    for job := range jobs {
        fmt.Printf("Worker %d processing job %d\\n", id, job)
        time.Sleep(100 * time.Millisecond)
        results <- job * 2
    }
}

func main() {
    // ── Basic goroutine ──
    go func() {
        fmt.Println("Hello from goroutine!")
    }()

    // ── Channels ──
    ch := make(chan string)
    go func() {
        ch <- "message from goroutine"
    }()
    msg := <-ch
    fmt.Println(msg)

    // ── Buffered channel ──
    buffered := make(chan int, 3)
    buffered <- 1
    buffered <- 2
    buffered <- 3
    fmt.Println(<-buffered)  // 1

    // ── WaitGroup (wait for goroutines) ──
    var wg sync.WaitGroup
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            fmt.Printf("Task %d done\\n", id)
        }(i)
    }
    wg.Wait()

    // ── Select (multiplex channels) ──
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() { time.Sleep(100 * time.Millisecond); ch1 <- "one" }()
    go func() { time.Sleep(200 * time.Millisecond); ch2 <- "two" }()

    for i := 0; i < 2; i++ {
        select {
        case msg := <-ch1:
            fmt.Println("From ch1:", msg)
        case msg := <-ch2:
            fmt.Println("From ch2:", msg)
        case <-time.After(500 * time.Millisecond):
            fmt.Println("Timeout!")
        }
    }

    // ── Worker Pool ──
    jobs := make(chan int, 10)
    results := make(chan int, 10)

    // Start 3 workers
    for w := 0; w < 3; w++ {
        go worker(w, jobs, results)
    }

    // Send jobs
    for j := 0; j < 9; j++ {
        jobs <- j
    }
    close(jobs)

    // Collect results
    for r := 0; r < 9; r++ {
        fmt.Println("Result:", <-results)
    }

    // ── Mutex (protect shared state) ──
    var mu sync.Mutex
    counter := 0

    var wg2 sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg2.Add(1)
        go func() {
            defer wg2.Done()
            mu.Lock()
            counter++
            mu.Unlock()
        }()
    }
    wg2.Wait()
    fmt.Println("Counter:", counter)  // 1000
}`,
          },
          {
            title: 'Generics & Advanced Patterns',
            description: 'Go 1.18+ generics, context package, and common patterns.',
            concepts: ['Generics', 'Type Constraints', 'Context', 'Builder Pattern', 'Middleware'],
            code: `// ── Generics & Advanced Patterns ──
package main

import (
    "context"
    "fmt"
    "time"

    "golang.org/x/exp/constraints"
)

// ── Generics (Go 1.18+) ──

// Generic function
func Map[T any, U any](slice []T, fn func(T) U) []U {
    result := make([]U, len(slice))
    for i, v := range slice {
        result[i] = fn(v)
    }
    return result
}

func Filter[T any](slice []T, fn func(T) bool) []T {
    var result []T
    for _, v := range slice {
        if fn(v) {
            result = append(result, v)
        }
    }
    return result
}

// Type constraint
func Max[T constraints.Ordered](a, b T) T {
    if a > b { return a }
    return b
}

// Generic stack
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) { s.items = append(s.items, item) }
func (s *Stack[T]) Pop() (T, bool) {
    var zero T
    if len(s.items) == 0 { return zero, false }
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item, true
}

// ── Context (cancellation & timeouts) ──
func fetchData(ctx context.Context, id int) (string, error) {
    select {
    case <-time.After(2 * time.Second):
        return fmt.Sprintf("data_%d", id), nil
    case <-ctx.Done():
        return "", ctx.Err()
    }
}

// ── Builder Pattern ──
type ServerConfig struct {
    Host    string
    Port    int
    TLS     bool
    Timeout time.Duration
}

type ServerOption func(*ServerConfig)

func WithPort(port int) ServerOption { return func(c *ServerConfig) { c.Port = port } }
func WithTLS() ServerOption { return func(c *ServerConfig) { c.TLS = true } }
func WithTimeout(d time.Duration) ServerOption { return func(c *ServerConfig) { c.Timeout = d } }

func NewServer(host string, opts ...ServerOption) *ServerConfig {
    cfg := &ServerConfig{Host: host, Port: 8080, Timeout: 30 * time.Second}
    for _, opt := range opts {
        opt(cfg)
    }
    return cfg
}

func main() {
    // Generics
    nums := []int{1, 2, 3, 4, 5}
    doubled := Map(nums, func(n int) int { return n * 2 })
    evens := Filter(nums, func(n int) bool { return n%2 == 0 })
    fmt.Println(doubled, evens)
    fmt.Println(Max(3, 7), Max("abc", "xyz"))

    stack := &Stack[int]{}
    stack.Push(1); stack.Push(2); stack.Push(3)
    val, _ := stack.Pop()
    fmt.Println(val)  // 3

    // Context with timeout
    ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
    defer cancel()
    data, err := fetchData(ctx, 42)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println(data)
    }

    // Builder pattern
    srv := NewServer("localhost", WithPort(9090), WithTLS())
    fmt.Printf("%+v\\n", srv)
}`,
          },
        ],
      },
    ],
  },
  rust: {
    name: 'Rust',
    tagline: 'Memory safety without garbage collection',
    color: '#DEA584',
    accent: '#B7410E',
    cheatSheet: [
      { label: 'Variables', syntax: 'let x = 5;\nlet mut y = 10;' },
      { label: 'Functions', syntax: 'fn add(a: i32, b: i32) -> i32 {\n    a + b\n}' },
      { label: 'Structs', syntax: 'struct User {\n    name: String,\n    age: u8,\n}' },
    ],
    modules: [
      {
        level: 'Beginner',
        icon: '🌱',
        topics: [
          {
            title: 'Ownership & Borrowing',
            description: 'The core of Rust memory safety.',
            concepts: ['Ownership', 'References', 'Borrowing'],
            code: `fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}`
          }
        ]
      }
    ]
  },
  sql: {
    name: 'SQL',
    tagline: 'Speak directly to the data',
    color: '#00758F',
    accent: '#F29111',
    cheatSheet: [
      { label: 'Select', syntax: 'SELECT * FROM users;' },
      { label: 'Where', syntax: 'SELECT * FROM users WHERE age > 18;' },
      { label: 'Join', syntax: 'SELECT * FROM users u\nJOIN posts p ON u.id = p.user_id;' },
    ],
    modules: [
      {
        level: 'Beginner',
        icon: '🌱',
        topics: [
          {
            title: 'Basic Queries',
            description: 'Extracting data from tables.',
            concepts: ['SELECT', 'FROM', 'WHERE', 'LIMIT'],
            code: `-- Select all active users
SELECT id, name, email
FROM users
WHERE status = 'active'
ORDER BY created_at DESC
LIMIT 10;`
          }
        ]
      }
    ]
  },
  typescript: {
    name: 'TypeScript',
    tagline: 'JavaScript with syntax for types',
    color: '#3178C6',
    accent: '#F3F4F6',
    cheatSheet: [
      { label: 'Types', syntax: 'let name: string = "Alice";' },
      { label: 'Interfaces', syntax: 'interface User {\n  id: number;\n  name: string;\n}' },
      { label: 'Generics', syntax: 'function identity<T>(arg: T): T {\n  return arg;\n}' },
    ],
    modules: [
      {
        level: 'Beginner',
        icon: '🌱',
        topics: [
          {
            title: 'Type Annotations',
            description: 'Adding types to standard JS.',
            concepts: ['Primitive Types', 'Arrays', 'Functions'],
            code: `function greet(person: string, date: Date) {
  console.log(\`Hello \${person}, today is \${date.toDateString()}!\`);
}

greet("Brendan", new Date());`
          }
        ]
      }
    ],
  },
  ruby: {
    name: 'Ruby',
    tagline: 'A programmer\'s best friend',
    color: '#CC342D',
    accent: '#99110B',
    cheatSheet: [
      { label: 'Variables', syntax: 'name = "Ruby"' },
      { label: 'Blocks', syntax: '5.times do |i|\n  puts i\nend' },
      { label: 'Classes', syntax: 'class Animal\n  def initialize(name)\n    @name = name\n  end\nend' },
    ],
    modules: [{
      level: 'Beginner', icon: '🌱', topics: [{
        title: 'Everything is an Object', description: 'Understanding Ruby\'s object model.', concepts: ['Objects', 'Methods', 'Blocks'],
        code: `"hello".upcase\n5.times { puts "Ruby!" }`
      }]
    }]
  },
  php: {
    name: 'PHP',
    tagline: 'The web\'s workhorse',
    color: '#777BB4',
    accent: '#4F5B93',
    cheatSheet: [
      { label: 'Variables', syntax: '$name = "PHP";' },
      { label: 'Arrays', syntax: '$arr = ["Apple", "Banana"];' },
      { label: 'Functions', syntax: 'function greet($name) {\n  return "Hello $name";\n}' },
    ],
    modules: [{
      level: 'Beginner', icon: '🌱', topics: [{
        title: 'Server-side Scripting', description: 'Building dynamic web pages.', concepts: ['Variables', 'Echo', 'Arrays'],
        code: `<?php\n$greeting = "Hello World!";\necho $greeting;\n?>`
      }]
    }]
  },
  csharp: {
    name: 'C#',
    tagline: 'Modern, object-oriented, and type-safe',
    color: '#239120',
    accent: '#178600',
    cheatSheet: [
      { label: 'Variables', syntax: 'string name = "C#";' },
      { label: 'LINQ', syntax: 'var evens = nums.Where(n => n % 2 == 0);' },
      { label: 'Properties', syntax: 'public string Name { get; set; }' },
    ],
    modules: [{
      level: 'Beginner', icon: '🌱', topics: [{
        title: 'Object-Oriented Basics', description: 'Classes, Objects, and Namespaces.', concepts: ['Classes', 'Methods', 'Types'],
        code: `using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello C#!");\n    }\n}`
      }]
    }]
  },
  swift: {
    name: 'Swift',
    tagline: 'Safe, fast, and expressive',
    color: '#F05138',
    accent: '#D13115',
    cheatSheet: [
      { label: 'Variables', syntax: 'var name = "Swift"\nlet pi = 3.14' },
      { label: 'Optionals', syntax: 'var optionalName: String? = "John"' },
      { label: 'Structs', syntax: 'struct User {\n  var age: Int\n}' },
    ],
    modules: [{
      level: 'Beginner', icon: '🌱', topics: [{
        title: 'Optionals & Safety', description: 'Handling missing values safely.', concepts: ['Optionals', 'Guard', 'If let'],
        code: `var name: String? = "Alice"\nif let unwrappedName = name {\n    print("Hello, \(unwrappedName)")\n}`
      }]
    }]
  },
  kotlin: {
    name: 'Kotlin',
    tagline: 'Concise, safe, and interoperable',
    color: '#7F52FF',
    accent: '#B125EA',
    cheatSheet: [
      { label: 'Variables', syntax: 'val name = "Kotlin"\nvar count = 0' },
      { label: 'Data Classes', syntax: 'data class User(val name: String, val age: Int)' },
      { label: 'Null Safety', syntax: 'var b: String? = "abc"\nb?.length' },
    ],
    modules: [{
      level: 'Beginner', icon: '🌱', topics: [{
        title: 'Null Safety & Conciseness', description: 'Writing robust code with less boilerplate.', concepts: ['Nullability', 'Data Classes', 'Extensions'],
        code: `fun main() {\n    val name: String? = "Kotlin"\n    println(name?.length ?: 0)\n}`
      }]
    }]
  },
  scala: {
    name: 'Scala',
    tagline: 'Object-Oriented meets Functional',
    color: '#DC322F',
    accent: '#B02624',
    cheatSheet: [
      { label: 'Variables', syntax: 'val x = 10\nvar y = 20' },
      { label: 'Pattern Matching', syntax: 'x match {\n  case 1 => "one"\n  case _ => "other"\n}' },
      { label: 'Case Classes', syntax: 'case class Person(name: String)' },
    ],
    modules: [{
      level: 'Beginner', icon: '🌱', topics: [{
        title: 'Functional Programming Basics', description: 'Immutability and Expressions.', concepts: ['Vals', 'Immutability', 'Functions'],
        code: `object Main extends App {\n  val numbers = List(1, 2, 3)\n  println(numbers.map(_ * 2))\n}`
      }]
    }]
  },
  dart: {
    name: 'Dart',
    tagline: 'Client-optimized language for fast apps',
    color: '#0175C2',
    accent: '#00579B',
    cheatSheet: [
      { label: 'Variables', syntax: 'var name = "Dart";\nfinal pi = 3.14;' },
      { label: 'Async/Await', syntax: 'Future<void> fetch() async {\n  await apiCall();\n}' },
      { label: 'Classes', syntax: 'class Point {\n  double x, y;\n  Point(this.x, this.y);\n}' },
    ],
    modules: [{
      level: 'Beginner', icon: '🌱', topics: [{
        title: 'UI & Asynchrony', description: 'Building reactive applications.', concepts: ['Futures', 'Async', 'Classes'],
        code: `void main() {\n  print('Hello, Dart!');\n}`
      }]
    }]
  }
};

export default languageCurriculum;
