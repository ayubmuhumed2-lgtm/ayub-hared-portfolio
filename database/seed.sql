-- Starter data matching the supplied portfolio brief.
-- This does not invent certifications, awards, or other achievements.

INSERT INTO portfolio_education (title, institution, detail, sort_order)
SELECT *
FROM (
  VALUES
    (
      'Bachelor''s Degree in Information Technology',
      'Islamic University of Kenya',
      'An ongoing foundation across software, systems, networks, and the human context around technology.',
      1
    ),
    (
      'Diploma in Information Technology',
      'Islamic University of Kenya',
      'A practical grounding in information technology and software development fundamentals.',
      2
    )
) AS rows(title, institution, detail, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM portfolio_education);

INSERT INTO portfolio_achievements (category, title, detail, sort_order)
SELECT *
FROM (
  VALUES
    ('Certifications', 'Add a certification', 'Editable placeholder — replace with a real certification when ready.', 1),
    ('Hackathons', 'Add a hackathon', 'Editable placeholder — replace with a real hackathon experience when ready.', 2),
    ('Academic achievements', 'Add an academic achievement', 'Editable placeholder — replace with a verified academic accomplishment when ready.', 3),
    ('Technical events', 'Add a technical event', 'Editable placeholder — replace with a real event when ready.', 4),
    ('Presentations', 'Add a presentation', 'Editable placeholder — replace with a real presentation when ready.', 5),
    ('Leadership', 'Add a leadership experience', 'Editable placeholder — replace with a real leadership experience when ready.', 6)
) AS rows(category, title, detail, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM portfolio_achievements);

INSERT INTO portfolio_projects (
  id, name, category, eyebrow, description, technologies, features,
  problem, solution, challenges, learning, accent, sort_order
)
VALUES
  (
    'electricity-bill-management',
    'Electricity Bill Management System',
    'Web',
    'Web platform',
    'A web-based electricity bill management system designed to manage customer electricity bills, payments, transactions, and complaints.',
    ARRAY['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'XAMPP'],
    ARRAY['Dashboard', 'Bill management', 'Payment management', 'Transaction tracking', 'Complaint management', 'M-Pesa, cash, and Bonga Points payments'],
    'Electricity billing information, payment records, and customer complaints need a clearer system for both customers and administrators.',
    'A centralized web application organizes bills, payments, transactions, and complaints while supporting multiple payment options.',
    'The project required bringing several related workflows together without making everyday billing tasks harder to understand.',
    'I learned how thoughtful information structure and reliable record handling shape trust in a service platform.',
    'cyan',
    1
  ),
  (
    'flowwatch-ai',
    'FlowWatch-AI',
    'AI',
    'AI monitoring & analytics',
    'An AI-powered monitoring and analytics project designed to process and visualize system-related data.',
    ARRAY['Python', 'FastAPI', 'React', 'Vite', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker'],
    ARRAY['AI-powered analysis', 'Backend API', 'Data processing', 'Dashboard', 'Database integration', 'Containerized development environment'],
    'System-related data can be difficult to interpret when analysis, storage, and visualization live in disconnected places.',
    'FlowWatch-AI brings data processing, an API, persistence, and a dashboard into one project for clearer monitoring and analysis.',
    'The challenge was coordinating several services and data concerns while keeping the product understandable.',
    'I learned how architecture choices affect the path from raw data to a useful decision.',
    'lime',
    2
  ),
  (
    'iuk-student-helper',
    'IUK Student Helper',
    'Mobile',
    'Android application',
    'An Android application designed to make university-related student services easier to access.',
    ARRAY['Java', 'Android Studio', 'WebView'],
    ARRAY['Student portal access', 'Mobile-friendly interface', 'University service access'],
    'University services are more useful when students can reach them easily from a familiar mobile experience.',
    'IUK Student Helper packages key student portal and university service access into an Android application.',
    'The work required balancing a small mobile surface with the breadth of services students may need.',
    'I learned how mobile context changes information hierarchy and the expectations around access.',
    'orange',
    3
  ),
  (
    'decentralized-voting-system',
    'Decentralized Voting System',
    'Blockchain',
    'Blockchain prototype',
    'A blockchain-based voting prototype demonstrating decentralized voting concepts.',
    ARRAY['Solidity', 'Truffle', 'Ganache', 'JavaScript'],
    ARRAY['Voter registration', 'Blockchain-based voting', 'Vote recording', 'Smart contract interaction'],
    'Voting systems need clear, verifiable records and a transparent explanation of how votes are recorded.',
    'This prototype uses a smart contract flow to demonstrate voter registration, vote recording, and decentralized verification concepts.',
    'The project required translating blockchain mechanics into a voting workflow that is easy to reason about.',
    'I learned how new infrastructure introduces both technical possibilities and important trade-offs around trust.',
    'violet',
    4
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  eyebrow = EXCLUDED.eyebrow,
  description = EXCLUDED.description,
  technologies = EXCLUDED.technologies,
  features = EXCLUDED.features,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  challenges = EXCLUDED.challenges,
  learning = EXCLUDED.learning,
  accent = EXCLUDED.accent,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();