-- Ayub Hared Muhumed Portfolio
-- Portable PostgreSQL schema.
--
-- The current frontend is intentionally static and reads src/data/portfolio.ts.
-- These tables are the explicit persistence model for a future API or CMS.

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Web', 'Mobile', 'AI', 'Blockchain')),
  eyebrow TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  features TEXT[] NOT NULL DEFAULT '{}',
  problem TEXT NOT NULL,
  solution TEXT NOT NULL,
  challenges TEXT NOT NULL,
  learning TEXT NOT NULL,
  accent TEXT NOT NULL CHECK (accent IN ('cyan', 'lime', 'orange', 'violet')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolio_education (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  institution TEXT NOT NULL,
  detail TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolio_achievements (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  detail TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(trim(name)) BETWEEN 1 AND 160),
  email TEXT NOT NULL CHECK (char_length(trim(email)) BETWEEN 3 AND 320),
  message TEXT NOT NULL CHECK (char_length(trim(message)) BETWEEN 1 AND 10000),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS contact_messages_status_created_idx
  ON contact_messages (status, created_at DESC);

CREATE INDEX IF NOT EXISTS portfolio_projects_sort_idx
  ON portfolio_projects (sort_order, name);

CREATE INDEX IF NOT EXISTS portfolio_education_sort_idx
  ON portfolio_education (sort_order, id);

CREATE INDEX IF NOT EXISTS portfolio_achievements_sort_idx
  ON portfolio_achievements (sort_order, id);