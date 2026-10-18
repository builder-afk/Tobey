const fs = require('fs');
const file = '/Users/kunalverma/Downloads/High/hypers/src/data/languageCurriculum.js';
let content = fs.readFileSync(file, 'utf8');

const insertion = `
  ,
  rust: {
    name: 'Rust',
    tagline: 'Memory safety without garbage collection',
    color: '#DEA584',
    accent: '#B7410E',
    cheatSheet: [
      { label: 'Variables', syntax: 'let x = 5;\\nlet mut y = 10;' },
      { label: 'Functions', syntax: 'fn add(a: i32, b: i32) -> i32 {\\n    a + b\\n}' },
      { label: 'Structs', syntax: 'struct User {\\n    name: String,\\n    age: u8,\\n}' },
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
            code: \`fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}\`
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
      { label: 'Join', syntax: 'SELECT * FROM users u\\nJOIN posts p ON u.id = p.user_id;' },
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
            code: \`-- Select all active users
SELECT id, name, email
FROM users
WHERE status = 'active'
ORDER BY created_at DESC
LIMIT 10;\`
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
      { label: 'Interfaces', syntax: 'interface User {\\n  id: number;\\n  name: string;\\n}' },
      { label: 'Generics', syntax: 'function identity<T>(arg: T): T {\\n  return arg;\\n}' },
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
            code: \`function greet(person: string, date: Date) {
  console.log(\\\`Hello \\\${person}, today is \\\${date.toDateString()}!\\\`);
}

greet("Brendan", new Date());\`
          }
        ]
      }
    ]
  }
};
export default languageCurriculum;
`;

content = content.replace(/};\s*export default languageCurriculum;\s*$/g, insertion);
fs.writeFileSync(file, content);
console.log('Successfully updated curriculum');
