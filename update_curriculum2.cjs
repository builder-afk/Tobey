const fs = require('fs');
const file = '/Users/kunalverma/Downloads/High/hypers/src/data/languageCurriculum.js';
let content = fs.readFileSync(file, 'utf8');

const insertion = `,
  ruby: {
    name: 'Ruby',
    tagline: 'A programmer\\'s best friend',
    color: '#CC342D',
    accent: '#99110B',
    cheatSheet: [
      { label: 'Variables', syntax: 'name = "Ruby"' },
      { label: 'Blocks', syntax: '5.times do |i|\\n  puts i\\nend' },
      { label: 'Classes', syntax: 'class Animal\\n  def initialize(name)\\n    @name = name\\n  end\\nend' },
    ],
    modules: [{
      level: 'Beginner', icon: '🌱', topics: [{
        title: 'Everything is an Object', description: 'Understanding Ruby\\'s object model.', concepts: ['Objects', 'Methods', 'Blocks'],
        code: \`"hello".upcase\\n5.times { puts "Ruby!" }\`
      }]
    }]
  },
  php: {
    name: 'PHP',
    tagline: 'The web\\'s workhorse',
    color: '#777BB4',
    accent: '#4F5B93',
    cheatSheet: [
      { label: 'Variables', syntax: '$name = "PHP";' },
      { label: 'Arrays', syntax: '$arr = ["Apple", "Banana"];' },
      { label: 'Functions', syntax: 'function greet($name) {\\n  return "Hello $name";\\n}' },
    ],
    modules: [{
      level: 'Beginner', icon: '🌱', topics: [{
        title: 'Server-side Scripting', description: 'Building dynamic web pages.', concepts: ['Variables', 'Echo', 'Arrays'],
        code: \`<?php\\n$greeting = "Hello World!";\\necho $greeting;\\n?>\`
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
        code: \`using System;\\n\\nclass Program {\\n    static void Main() {\\n        Console.WriteLine("Hello C#!");\\n    }\\n}\`
      }]
    }]
  },
  swift: {
    name: 'Swift',
    tagline: 'Safe, fast, and expressive',
    color: '#F05138',
    accent: '#D13115',
    cheatSheet: [
      { label: 'Variables', syntax: 'var name = "Swift"\\nlet pi = 3.14' },
      { label: 'Optionals', syntax: 'var optionalName: String? = "John"' },
      { label: 'Structs', syntax: 'struct User {\\n  var age: Int\\n}' },
    ],
    modules: [{
      level: 'Beginner', icon: '🌱', topics: [{
        title: 'Optionals & Safety', description: 'Handling missing values safely.', concepts: ['Optionals', 'Guard', 'If let'],
        code: \`var name: String? = "Alice"\\nif let unwrappedName = name {\\n    print("Hello, \\\(unwrappedName)")\\n}\`
      }]
    }]
  },
  kotlin: {
    name: 'Kotlin',
    tagline: 'Concise, safe, and interoperable',
    color: '#7F52FF',
    accent: '#B125EA',
    cheatSheet: [
      { label: 'Variables', syntax: 'val name = "Kotlin"\\nvar count = 0' },
      { label: 'Data Classes', syntax: 'data class User(val name: String, val age: Int)' },
      { label: 'Null Safety', syntax: 'var b: String? = "abc"\\nb?.length' },
    ],
    modules: [{
      level: 'Beginner', icon: '🌱', topics: [{
        title: 'Null Safety & Conciseness', description: 'Writing robust code with less boilerplate.', concepts: ['Nullability', 'Data Classes', 'Extensions'],
        code: \`fun main() {\\n    val name: String? = "Kotlin"\\n    println(name?.length ?: 0)\\n}\`
      }]
    }]
  },
  scala: {
    name: 'Scala',
    tagline: 'Object-Oriented meets Functional',
    color: '#DC322F',
    accent: '#B02624',
    cheatSheet: [
      { label: 'Variables', syntax: 'val x = 10\\nvar y = 20' },
      { label: 'Pattern Matching', syntax: 'x match {\\n  case 1 => "one"\\n  case _ => "other"\\n}' },
      { label: 'Case Classes', syntax: 'case class Person(name: String)' },
    ],
    modules: [{
      level: 'Beginner', icon: '🌱', topics: [{
        title: 'Functional Programming Basics', description: 'Immutability and Expressions.', concepts: ['Vals', 'Immutability', 'Functions'],
        code: \`object Main extends App {\\n  val numbers = List(1, 2, 3)\\n  println(numbers.map(_ * 2))\\n}\`
      }]
    }]
  },
  dart: {
    name: 'Dart',
    tagline: 'Client-optimized language for fast apps',
    color: '#0175C2',
    accent: '#00579B',
    cheatSheet: [
      { label: 'Variables', syntax: 'var name = "Dart";\\nfinal pi = 3.14;' },
      { label: 'Async/Await', syntax: 'Future<void> fetch() async {\\n  await apiCall();\\n}' },
      { label: 'Classes', syntax: 'class Point {\\n  double x, y;\\n  Point(this.x, this.y);\\n}' },
    ],
    modules: [{
      level: 'Beginner', icon: '🌱', topics: [{
        title: 'UI & Asynchrony', description: 'Building reactive applications.', concepts: ['Futures', 'Async', 'Classes'],
        code: \`void main() {\\n  print('Hello, Dart!');\\n}\`
      }]
    }]
  }
};
export default languageCurriculum;\`;

content = content.replace(/};\s*export default languageCurriculum;\s*$/g, insertion);
fs.writeFileSync(file, content);
console.log('Successfully added 7 languages');
