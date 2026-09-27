# Ayub Hared Muhumed Portfolio

A responsive React + Vite portfolio for Ayub Hared Muhumed, an IT student and aspiring software developer in Kenya.

## Run locally

Requirements:

- Node.js 20+
- npm 10+ or pnpm 9+

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

The app does not require platform-specific environment variables. `PORT` and `BASE_PATH` are optional:

```bash
PORT=4173 BASE_PATH=/portfolio/ npm run dev
```

## Build and serve

```bash
npm run typecheck
npm run build
npm run serve
```

The production files are written to `dist/public`.

## Edit the portfolio

All portfolio content is centralized in:

```text
src/data/portfolio.ts
```

Update the personal details, skills, education, achievements, project case studies, and placeholder links there. Replace these values before publishing:

- `YOUR_EMAIL`
- `YOUR_GITHUB_URL`
- `YOUR_LINKEDIN_URL`
- `YOUR_LIVE_DEMO_URL`
- `YOUR_PORTFOLIO_URL`
- `/YOUR_CV_PATH.pdf`

The contact form currently provides a client-side success state so the static site remains deployable without a server. The optional PostgreSQL schema for persisting messages and portfolio content is in `database/schema.sql`.

## Database schema

The site is intentionally usable without a database. If you want persistent content or contact submissions, create a PostgreSQL database and run:

```bash
psql "$DATABASE_URL" -f database/schema.sql
psql "$DATABASE_URL" -f database/seed.sql
```

The schema includes:

- `portfolio_projects`
- `portfolio_education`
- `portfolio_achievements`
- `contact_messages`

The SQL is plain PostgreSQL and is independent of Replit or any hosted platform. The current static frontend still reads `src/data/portfolio.ts`; wiring the tables to an API is an optional next step.

## Source layout

```text
src/
  App.tsx                 # page structure and interactive behavior
  data/portfolio.ts       # editable portfolio source data
  index.css               # theme, responsive styles, motion, and focus states
  components/             # reusable error, toast, and utility components
database/
  schema.sql              # portable PostgreSQL schema
  seed.sql                # starter rows matching the supplied portfolio brief
public/
  favicon.svg
  robots.txt
```

## License

No license has been selected yet. Add one before distributing the project publicly.