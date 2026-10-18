const fs = require('fs');
const file = '/Users/kunalverma/Downloads/High/hypers/src/data/quizQuestions.js';
let content = fs.readFileSync(file, 'utf8');

const newQuizzes = `
export const rustQuestions = [
  { id: 1, question: 'What is the primary goal of Rust?', options: ['Memory safety without garbage collection', 'Web development', 'Machine learning', 'Game design'], answer: 0, explanation: 'Rust focuses on memory safety and concurrency without a garbage collector.' },
  { id: 2, question: 'Which keyword is used to declare a mutable variable in Rust?', options: ['var', 'mut', 'let', 'mutable'], answer: 1, explanation: 'Variables are immutable by default. You use let mut to make them mutable.' },
  { id: 3, question: 'What is ownership in Rust?', options: ['A license model', 'A set of rules governing memory management', 'A web framework', 'A concurrency model'], answer: 1, explanation: 'Ownership is Rusts unique memory management system checked at compile time.' },
  { id: 4, question: 'How do you handle null values in Rust?', options: ['Using null', 'Using None from Option<T>', 'Using undefined', 'Using nil'], answer: 1, explanation: 'Rust does not have nulls; it uses the Option<T> enum to represent absence of value.' },
  { id: 5, question: 'What is the package manager for Rust?', options: ['npm', 'pip', 'cargo', 'gem'], answer: 2, explanation: 'Cargo is the Rust package manager and build system.' }
];

export const sqlQuestions = [
  { id: 1, question: 'Which SQL statement is used to extract data from a database?', options: ['GET', 'OPEN', 'EXTRACT', 'SELECT'], answer: 3, explanation: 'SELECT is the standard command to query data.' },
  { id: 2, question: 'What does SQL stand for?', options: ['Structured Query Language', 'Strong Question Language', 'Structured Question Language', 'Simple Query Language'], answer: 0, explanation: 'SQL stands for Structured Query Language.' },
  { id: 3, question: 'Which clause is used to filter records?', options: ['FILTER', 'WHERE', 'SORT', 'GROUP BY'], answer: 1, explanation: 'The WHERE clause extracts only those records that fulfill a specified condition.' },
  { id: 4, question: 'Which operator is used to search for a specified pattern in a column?', options: ['GET', 'LIKE', 'MATCH', 'PATTERN'], answer: 1, explanation: 'The LIKE operator is used in a WHERE clause to search for a specified pattern.' },
  { id: 5, question: 'What is a Primary Key?', options: ['A key to decrypt data', 'A unique identifier for a record in a table', 'The first column of a table', 'A password'], answer: 1, explanation: 'A Primary Key uniquely identifies each record in a database table.' }
];

export const tsQuestions = [
  { id: 1, question: 'What is TypeScript?', options: ['A database', 'A superset of JavaScript that adds static typing', 'A CSS framework', 'A web server'], answer: 1, explanation: 'TypeScript builds on JS by adding static types.' },
  { id: 2, question: 'How do you define a custom type in TypeScript?', options: ['Using type or interface', 'Using class only', 'Using define', 'Using struct'], answer: 0, explanation: 'You can use either the type alias or interface keyword.' },
  { id: 3, question: 'Which file extension is used for TypeScript files?', options: ['.js', '.tsx or .ts', '.type', '.script'], answer: 1, explanation: 'TypeScript uses .ts for standard files and .tsx for files containing JSX.' },
  { id: 4, question: 'What does the any type do in TypeScript?', options: ['Throws an error', 'Opts out of type checking', 'Enforces strict typing', 'Defines an array'], answer: 1, explanation: 'The any type allows assigning any value, bypassing the type checker.' },
  { id: 5, question: 'How do you specify that a property is optional in an interface?', options: ['Using !', 'Using ?', 'Using *', 'Using optional keyword'], answer: 1, explanation: 'A question mark (?) after the property name makes it optional.' }
];

export const rubyQuestions = [
  { id: 1, question: 'Who created Ruby?', options: ['Guido van Rossum', 'Yukihiro Matsumoto (Matz)', 'Brendan Eich', 'James Gosling'], answer: 1, explanation: 'Ruby was created by Yukihiro Matsumoto, often known as Matz.' },
  { id: 2, question: 'What is Ruby on Rails?', options: ['A train simulator', 'A web application framework written in Ruby', 'A ruby compiler', 'A database'], answer: 1, explanation: 'Rails is a popular server-side web application framework written in Ruby.' },
  { id: 3, question: 'Which of the following is true about Ruby?', options: ['Everything is an object', 'It is strictly typed', 'It requires compilation', 'It has no classes'], answer: 0, explanation: 'In Ruby, every value is an object, including primitive types like integers.' },
  { id: 4, question: 'How do you define a method in Ruby?', options: ['function', 'def', 'method', 'fn'], answer: 1, explanation: 'Methods are defined using the def keyword.' },
  { id: 5, question: 'What is a block in Ruby?', options: ['A square on the screen', 'An anonymous function that can be passed to methods', 'A database row', 'A syntax error'], answer: 1, explanation: 'Blocks are chunks of code enclosed in {} or do..end, often passed to methods.' }
];

export const phpQuestions = [
  { id: 1, question: 'What does PHP stand for originally?', options: ['Private Home Page', 'Personal Home Page', 'Pretext Hypertext Processor', 'Public Hypertext Page'], answer: 1, explanation: 'It originally stood for Personal Home Page, but now stands for PHP: Hypertext Preprocessor.' },
  { id: 2, question: 'How do you declare a variable in PHP?', options: ['var myVar;', 'let myVar;', '$myVar;', '#myVar;'], answer: 2, explanation: 'Variables in PHP start with a dollar sign ($).' },
  { id: 3, question: 'Which symbol is used for string concatenation in PHP?', options: ['+', '.', '&', ','], answer: 1, explanation: 'The dot (.) operator concatenates strings.' },
  { id: 4, question: 'What is the default file extension for PHP files?', options: ['.php', '.ph', '.html', '.phtml'], answer: 0, explanation: '.php is the standard extension.' },
  { id: 5, question: 'How do you print output in PHP?', options: ['console.log()', 'print or echo', 'System.out.println', 'write()'], answer: 1, explanation: 'echo and print are used to output data to the screen.' }
];

export const csharpQuestions = [
  { id: 1, question: 'Which company developed C#?', options: ['Apple', 'Google', 'Microsoft', 'Sun Microsystems'], answer: 2, explanation: 'C# was developed by Microsoft as part of its .NET initiative.' },
  { id: 2, question: 'Which of these is NOT a value type in C#?', options: ['int', 'float', 'string', 'bool'], answer: 2, explanation: 'In C#, string is a reference type, whereas int, float, and bool are value types.' },
  { id: 3, question: 'What is LINQ?', options: ['Language Integrated Query', 'Local Interface Node Query', 'Logical Integer Quantifier', 'Language Internal Query'], answer: 0, explanation: 'LINQ provides query capabilities directly integrated into the C# language.' },
  { id: 4, question: 'Which keyword is used to inherit a class in C#?', options: ['extends', 'inherits', ':', '->'], answer: 2, explanation: 'C# uses the colon (:) syntax for both class inheritance and interface implementation.' },
  { id: 5, question: 'What is the entry point of a C# console application?', options: ['start()', 'Main()', 'run()', 'init()'], answer: 1, explanation: 'The Main() method is the entry point of a C# program.' }
];

export const swiftQuestions = [
  { id: 1, question: 'What platform is Swift primarily used for?', options: ['Android', 'Windows', 'iOS and macOS', 'Linux'], answer: 2, explanation: 'Swift was developed by Apple primarily for iOS, macOS, watchOS, and tvOS.' },
  { id: 2, question: 'How do you declare a constant in Swift?', options: ['const', 'let', 'final', 'var'], answer: 1, explanation: 'In Swift, let is used to declare constants and var for variables.' },
  { id: 3, question: 'What is an Optional in Swift?', options: ['A premium feature', 'A type that can hold either a value or nil', 'A compiler flag', 'An alternative syntax'], answer: 1, explanation: 'Optionals handle the absence of a value safely by wrapping the value or nil.' },
  { id: 4, question: 'Which keyword is used to unwrap an optional safely?', options: ['if let or guard let', 'unwrap', 'force', 'expose'], answer: 0, explanation: 'if let and guard let are used for optional binding to safely unwrap values.' },
  { id: 5, question: 'What is the equivalent of an interface in Swift?', options: ['Protocol', 'Interface', 'Contract', 'AbstractClass'], answer: 0, explanation: 'Swift uses Protocols to define a blueprint of methods, properties, and other requirements.' }
];

export const kotlinQuestions = [
  { id: 1, question: 'Kotlin is fully interoperable with which language?', options: ['C++', 'Python', 'Java', 'Swift'], answer: 2, explanation: 'Kotlin is designed to interoperate fully with Java and runs on the JVM.' },
  { id: 2, question: 'Which keyword is used to declare a function in Kotlin?', options: ['def', 'fun', 'function', 'void'], answer: 1, explanation: 'The fun keyword is used to declare functions in Kotlin.' },
  { id: 3, question: 'How does Kotlin handle null safety?', options: ['It uses pointers', 'Types are non-null by default; nullable types use ?', 'It throws NullPointerExceptions everywhere', 'It doesn\'t support nulls'], answer: 1, explanation: 'Kotlin distinguishes between nullable (e.g., String?) and non-nullable (e.g., String) types.' },
  { id: 4, question: 'What is a data class in Kotlin?', options: ['A class for database connection', 'A class whose main purpose is to hold data, auto-generating equals(), hashCode(), etc.', 'A class that parses JSON', 'A class with no methods'], answer: 1, explanation: 'Data classes automatically generate utility methods based on the constructor properties.' },
  { id: 5, question: 'Which keyword is used for read-only variables?', options: ['val', 'var', 'const', 'final'], answer: 0, explanation: 'val declares a read-only (immutable) variable.' }
];

export const scalaQuestions = [
  { id: 1, question: 'What does the name Scala stand for?', options: ['Scalable Language', 'Structured Calculus', 'Standard Classes', 'System Compiler'], answer: 0, explanation: 'Scala stands for Scalable Language, designed to grow with the demands of its users.' },
  { id: 2, question: 'Scala strongly supports which programming paradigm?', options: ['Logic programming', 'Functional programming', 'Procedural programming', 'Assembly programming'], answer: 1, explanation: 'Scala seamlessly integrates object-oriented and functional programming paradigms.' },
  { id: 3, question: 'Which keyword is used to declare an immutable variable in Scala?', options: ['var', 'val', 'let', 'const'], answer: 1, explanation: 'val is used for immutable variables, while var is used for mutable ones.' },
  { id: 4, question: 'What is a Case Class in Scala?', options: ['A class used in switch statements', 'An immutable class that exports constructor parameters and supports pattern matching', 'A singleton class', 'A deprecated feature'], answer: 1, explanation: 'Case classes are great for modeling immutable data and pattern matching.' },
  { id: 5, question: 'What is the equivalent of a switch statement in Scala?', options: ['switch', 'select', 'match', 'choose'], answer: 2, explanation: 'Scala uses pattern matching with the match keyword instead of a traditional switch.' }
];

export const dartQuestions = [
  { id: 1, question: 'Which framework uses Dart as its primary language?', options: ['React Native', 'Flutter', 'Xamarin', 'Ionic'], answer: 1, explanation: 'Flutter, Google\'s UI toolkit, is written in Dart.' },
  { id: 2, question: 'Is Dart statically or dynamically typed?', options: ['Only statically typed', 'Only dynamically typed', 'It supports sound static typing and type inference', 'It has no types'], answer: 2, explanation: 'Dart is statically typed but uses type inference, so you don\'t always have to write types.' },
  { id: 3, question: 'What is the entry point of a Dart program?', options: ['start()', 'init()', 'main()', 'runApp()'], answer: 2, explanation: 'Every Dart app must have a top-level main() function.' },
  { id: 4, question: 'Which keyword is used to wait for a Future to complete?', options: ['wait', 'yield', 'async', 'await'], answer: 3, explanation: 'The await keyword is used to wait for asynchronous operations in an async function.' },
  { id: 5, question: 'How do you make a variable private to a library in Dart?', options: ['private keyword', 'Prefix with an underscore (_)', 'Prefix with $', 'You cannot make variables private'], answer: 1, explanation: 'Dart uses a leading underscore to denote privacy at the library level.' }
];
`;

const mappingInsert = `
  'Rust Basics': { questions: rustQuestions, icon: '⚙️', color: '#DEA584', description: 'Memory safety, Borrowing, Ownership, and Structs' },
  'SQL Queries': { questions: sqlQuestions, icon: '🗄️', color: '#00758F', description: 'SELECT, Joins, Aggregation, and Database Normalization' },
  'TypeScript': { questions: tsQuestions, icon: '🔷', color: '#3178C6', description: 'Interfaces, Generics, Types, and Strict Modes' },
  'Ruby Mastery': { questions: rubyQuestions, icon: '💎', color: '#CC342D', description: 'Objects, Blocks, Rails Basics, and Dynamic Typing' },
  'PHP Web': { questions: phpQuestions, icon: '🐘', color: '#777BB4', description: 'Variables, Server-Side Scripts, and Arrays' },
  'C# .NET': { questions: csharpQuestions, icon: '💜', color: '#239120', description: 'LINQ, Object-Oriented C#, and Properties' },
  'Swift iOS': { questions: swiftQuestions, icon: '🪶', color: '#F05138', description: 'Optionals, Structs, Protocols, and Memory' },
  'Kotlin Android': { questions: kotlinQuestions, icon: '☕', color: '#7F52FF', description: 'Null Safety, Data Classes, and Interoperability' },
  'Scala FP': { questions: scalaQuestions, icon: '📦', color: '#DC322F', description: 'Functional Programming, Pattern Matching, and Traits' },
  'Dart & Flutter': { questions: dartQuestions, icon: '🎯', color: '#0175C2', description: 'Async/Await, OOP, and Client Optimization' },
`;

// Insert the arrays right before `export const quizTopics`
content = content.replace('export const quizTopics = {', newQuizzes + '\nexport const quizTopics = {\n' + mappingInsert);

fs.writeFileSync(file, content);
console.log('Successfully added 10 language quizzes');
