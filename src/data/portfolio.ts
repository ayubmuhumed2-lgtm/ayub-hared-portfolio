export type ProjectCategory = 'Web' | 'Mobile' | 'AI' | 'Blockchain';

export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  eyebrow: string;
  description: string;
  technologies: string[];
  features: string[];
  problem: string;
  solution: string;
  challenges: string;
  learning: string;
  accent: 'cyan' | 'lime' | 'orange' | 'violet';
  year: string;
};

export type Achievement = {
  category: string;
  title: string;
  detail: string;
};

export const portfolio = {
  name: 'Ayub Hared Muhumed',
  headline: 'IT Student | Software Developer | AI & Cybersecurity Enthusiast',
  location: 'Kenya',
  email: 'YOUR_EMAIL',
  github: 'https://github.com/ayubmuhumed2-lgtm',
  linkedin: 'https://www.linkedin.com/in/ayub-hared-735a44393/',
  cvPath: 'MyCV.pdf',

  intro:
    'I build practical technology solutions that solve real-world problems.',

  about:
    'I am an Information Technology student interested in building practical software solutions that make everyday systems clearer, safer, and more useful. My interests span software development, artificial intelligence, machine learning, cybersecurity, web development, and problem solving.',

  learning:
    'Artificial intelligence, machine learning, cybersecurity, and the engineering habits that make software trustworthy beyond the first demo.',

  skills: [
    {
      group: 'Programming',
      items: ['Java', 'Python', 'PHP', 'JavaScript'],
    },
    {
      group: 'Web Development',
      items: ['HTML', 'CSS', 'React', 'Vite', 'FastAPI'],
    },
    {
      group: 'Databases',
      items: ['MySQL', 'PostgreSQL', 'MongoDB'],
    },
    {
      group: 'Tools & Technologies',
      items: [
        'Git',
        'GitHub',
        'Docker',
        'VS Code',
        'Android Studio',
        'XAMPP',
      ],
    },
    {
      group: 'Areas of Interest',
      items: [
        'Artificial Intelligence',
        'Machine Learning',
        'Cybersecurity',
        'Software Engineering',
      ],
    },
  ],

  education: [
    {
      title: "Bachelor's Degree in Information Technology",
      institution: 'Islamic University of Kenya',
      detail:
        'An ongoing foundation across software, systems, networks, and the human context around technology.',
    },
    {
      title: 'Diploma in Information Technology',
      institution: 'Islamic University of Kenya',
      detail:
        'A practical grounding in information technology and software development fundamentals.',
    },
  ],

  achievements: [
    {
      category: 'Cisco Networking Academy',
      title: 'Introduction to Cybersecurity',
      detail:
        'Certificate covering fundamental cybersecurity concepts, threats, vulnerabilities, and security practices.',
    },
    {
      category: 'Cisco Networking Academy',
      title: 'Networking Basics',
      detail:
        'Certificate covering fundamental networking concepts, devices, protocols, and network communication.',
    },
    {
      category: 'Cisco Networking Academy',
      title: 'Exploring IoT with Cisco Packet Tracer',
      detail:
        'Certificate exploring Internet of Things concepts and IoT network simulations using Cisco Packet Tracer.',
    },
    {
      category: 'Cisco Networking Academy',
      title: 'Getting Started with Cisco Packet Tracer',
      detail:
        'Certificate covering the fundamentals of using Cisco Packet Tracer to build and simulate network environments.',
    },
    {
      category: 'Cisco Networking Academy',
      title: 'Hardware and Upgrade Support',
      detail:
        'Certificate covering computer hardware, maintenance, troubleshooting, and hardware upgrade fundamentals.',
    },
    {
      category: 'Cisco Networking Academy',
      title: 'Introduction to Modern AI',
      detail:
        'Certificate introducing modern artificial intelligence concepts, applications, and emerging AI technologies.',
    },
    {
      category: 'Cisco Networking Academy',
      title: 'Using Computers and Mobile Devices',
      detail:
        'Certificate covering fundamental computer and mobile device usage, configuration, and digital skills.',
    },
    {
      category: 'DataCamp',
      title: 'Intermediate SQL',
      detail:
        'Certificate demonstrating intermediate SQL skills for querying, analyzing, and working with structured data.',
    },
    {
      category: 'DataCamp',
      title: 'Python Essentials',
      detail:
        'Certificate covering essential Python programming concepts and practical programming skills.',
    },
    {
      category: 'DataCamp',
      title: 'SQL Basics',
      detail:
        'Certificate covering fundamental SQL concepts and querying relational databases.',
    },
  ] as Achievement[],
};

// Portfolio content lives here so replacing a description, URL, or project never
// requires searching through layout code.

export const projects: Project[] = [
  {
    id: 'electricity-bill-management',
    name: 'Electricity Bill Management System',
    category: 'Web',
    eyebrow: 'Web platform',
    description:
      'A web-based electricity bill management system designed to manage customer electricity bills, payments, transactions, and complaints.',
    technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'XAMPP'],
    features: [
      'Dashboard',
      'Bill management',
      'Payment management',
      'Transaction tracking',
      'Complaint management',
      'M-Pesa, cash, and Bonga Points payments',
    ],
    problem:
      'Electricity billing information, payment records, and customer complaints need a clearer system for both customers and administrators.',
    solution:
      'A centralized web application organizes bills, payments, transactions, and complaints while supporting multiple payment options.',
    challenges:
      'The project required bringing several related workflows together without making everyday billing tasks harder to understand.',
    learning:
      'I learned how thoughtful information structure and reliable record handling shape trust in a service platform.',
    accent: 'cyan',
    year: '01',
  },

  {
    id: 'flowwatch-ai',
    name: 'FlowWatch-AI',
    category: 'AI',
    eyebrow: 'AI monitoring & analytics',
    description:
      'An AI-powered monitoring and analytics project designed to process and visualize system-related data.',
    technologies: [
      'Python',
      'FastAPI',
      'React',
      'Vite',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Docker',
    ],
    features: [
      'AI-powered analysis',
      'Backend API',
      'Data processing',
      'Dashboard',
      'Database integration',
      'Containerized development environment',
    ],
    problem:
      'System-related data can be difficult to interpret when analysis, storage, and visualization live in disconnected places.',
    solution:
      'FlowWatch-AI brings data processing, an API, persistence, and a dashboard into one project for clearer monitoring and analysis.',
    challenges:
      'The challenge was coordinating several services and data concerns while keeping the product understandable.',
    learning:
      'I learned how architecture choices affect the path from raw data to a useful decision.',
    accent: 'lime',
    year: '02',
  },

  {
    id: 'iuk-student-helper',
    name: 'IUK Student Helper',
    category: 'Mobile',
    eyebrow: 'Android application',
    description:
      'An Android application designed to make university-related student services easier to access.',
    technologies: ['Java', 'Android Studio', 'WebView'],
    features: [
      'Student portal access',
      'Mobile-friendly interface',
      'University service access',
    ],
    problem:
      'University services are more useful when students can reach them easily from a familiar mobile experience.',
    solution:
      'IUK Student Helper packages key student portal and university service access into an Android application.',
    challenges:
      'The work required balancing a small mobile surface with the breadth of services students may need.',
    learning:
      'I learned how mobile context changes information hierarchy and the expectations around access.',
    accent: 'orange',
    year: '03',
  },

  {
    id: 'decentralized-voting-system',
    name: 'Decentralized Voting System',
    category: 'Blockchain',
    eyebrow: 'Blockchain prototype',
    description:
      'A blockchain-based voting prototype demonstrating decentralized voting concepts.',
    technologies: ['Solidity', 'Truffle', 'Ganache', 'JavaScript'],
    features: [
      'Voter registration',
      'Blockchain-based voting',
      'Vote recording',
      'Smart contract interaction',
    ],
    problem:
      'Voting systems need clear, verifiable records and a transparent explanation of how votes are recorded.',
    solution:
      'This prototype uses a smart contract flow to demonstrate voter registration, vote recording, and decentralized verification concepts.',
    challenges:
      'The project required translating blockchain mechanics into a voting workflow that is easy to reason about.',
    learning:
      'I learned how new infrastructure introduces both technical possibilities and important trade-offs around trust.',
    accent: 'violet',
    year: '04',
  },
];