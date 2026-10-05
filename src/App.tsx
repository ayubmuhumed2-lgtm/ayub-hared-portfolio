import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDown, ArrowUpRight, BookOpen, Check, CheckCircle2, ChevronDown, Copy, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, Moon, Send, ShieldCheck, Sparkles, Sun, Terminal, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { portfolio, projects, type Project, type ProjectCategory } from '@/data/portfolio';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

const filters: Array<'All' | ProjectCategory> = ['All', 'Web', 'Mobile', 'AI', 'Blockchain'];

function useScrollReveal(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting &&
            entry.target.classList.add('is-visible'),
        ),
      { threshold: 0.12 },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [enabled]);
}

function SeoMeta() {
  useEffect(() => {
    document.title = 'Ayub Hared Muhumed — Software developer & technology builder';

    const description =
      'Portfolio of Ayub Hared Muhumed, an IT student and software developer in Kenya exploring practical software, AI, and cybersecurity.';

    const setMeta = (
      name: string,
      content: string,
      property = false,
    ) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;

      let meta = document.head.querySelector<HTMLMetaElement>(selector);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(property ? 'property' : 'name', name);
        document.head.appendChild(meta);
      }

      meta.content = content;
    };

    setMeta('description', description);
    setMeta('og:title', document.title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'YOUR_PORTFOLIO_URL', true);
    setMeta('twitter:card', 'summary_large_image');
  }, []);

  return null;
}

function ThemeToggle({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:-translate-y-0.5 hover:border-secondary"
      aria-label={
        dark ? 'Switch to light mode' : 'Switch to dark mode'
      }
      data-testid="button-theme-toggle"
    >
      {dark ? (
        <Sun size={17} strokeWidth={1.8} />
      ) : (
        <Moon size={17} strokeWidth={1.8} />
      )}
    </button>
  );
}

function Header({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#top');

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting &&
            setActive(`#${entry.target.id}`),
        ),
      { rootMargin: '-25% 0px -65% 0px' },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-10">
        <a
          href="#top"
          className="focus-ring group flex items-center gap-3"
          onClick={closeMenu}
          data-testid="link-home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary font-mono text-sm font-medium text-primary-foreground shadow-[3px_3px_0_hsl(var(--secondary))]">
            AH
          </span>

          <span className="hidden font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:inline">
            ayub / portfolio
          </span>
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`focus-ring relative py-2 text-sm transition ${
                active === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid={`link-nav-${item.label.toLowerCase()}`}
            >
              {item.label}

              {active === item.href && (
                <span className="absolute -bottom-[1px] left-0 h-0.5 w-full bg-secondary" />
              )}
            </a>
          ))}

          <a
            href={`mailto:${portfolio.email}`}
            className="focus-ring rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:-translate-y-0.5 hover:bg-secondary hover:text-secondary-foreground"
            data-testid="link-header-contact"
          >
            Let’s talk
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle dark={dark} onToggle={onToggle} />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            data-testid="button-mobile-menu"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-background px-5 py-5 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="focus-ring rounded-md px-2 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                data-testid={`link-mobile-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}

            <a
              href={`mailto:${portfolio.email}`}
              onClick={closeMenu}
              className="mt-2 rounded-md bg-primary px-3 py-3 text-center text-sm font-medium text-primary-foreground"
              data-testid="link-mobile-contact"
            >
              Let’s talk
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function TerminalCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-primary p-4 text-primary-foreground shadow-[12px_12px_0_hsl(var(--accent))] sm:p-5">
      <div className="mb-5 flex items-center justify-between border-b border-primary-foreground/15 pb-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f27d67]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f2c95c]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#64d8cb]" />
        </div>

        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary-foreground/50">
          ayub@kenya:~
        </span>

        <Terminal size={14} className="text-secondary" />
      </div>

      <pre className="font-mono text-[11px] leading-[2.05] text-primary-foreground/80 sm:text-xs">
        <code>
          <span className="text-secondary">const</span> builder = {'{'}
          {'\n'}
          {'  '}name:{' '}
          <span className="text-accent">
            &quot;Ayub Hared Muhumed&quot;
          </span>
          ,{'\n'}
          {'  '}focus: [
          <span className="text-accent">&quot;useful&quot;</span>,{' '}
          <span className="text-accent">&quot;secure&quot;</span>],{'\n'}
          {'  '}status:{' '}
          <span className="text-accent">&quot;always learning&quot;</span>
          {'\n'}
          {'}'};{'\n'}
          {'\n'}
          <span className="text-secondary">await</span> builder.build();{' '}
          <span className="cursor-blink text-secondary">▌</span>
        </code>
      </pre>

      <div className="terminal-scan pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
    </div>
  );
}

function SectionHeading({
  number,
  kicker,
  title,
  copy,
}: {
  number: string;
  kicker: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mb-12 grid gap-5 lg:grid-cols-[110px_1fr_280px] lg:items-end">
      <span className="font-mono text-xs text-secondary">
        {number} / 06
      </span>

      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {kicker}
        </p>

        <h2 className="max-w-2xl text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.045em] sm:text-5xl">
          {title}
        </h2>
      </div>

      {copy && (
        <p className="max-w-sm text-sm leading-6 text-muted-foreground lg:pb-1">
          {copy}
        </p>
      )}
    </div>
  );
}

function ProjectArtwork({ project }: { project: Project }) {
  const colors = {
    cyan: 'bg-secondary',
    lime: 'bg-accent',
    orange: 'bg-orange-400',
    violet: 'bg-violet-400',
  };

  return (
    <div
      className={`relative min-h-[190px] overflow-hidden rounded-xl border border-primary/15 ${
        project.accent === 'cyan'
          ? 'bg-[#c8eee8]'
          : project.accent === 'lime'
            ? 'bg-[#deedae]'
            : project.accent === 'orange'
              ? 'bg-[#f6d0ad]'
              : 'bg-[#d8d0ef]'
      }`}
    >
      <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full border-[20px] border-primary/10" />

      <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-primary/15 bg-card/80 p-4 shadow-lg backdrop-blur-sm">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {project.eyebrow}
          </span>

          <span
            className={`h-2.5 w-2.5 rounded-full ${colors[project.accent]}`}
          />
        </div>

        <div className="h-2 w-2/3 rounded-full bg-primary/20" />

        <div className="mt-2 h-2 w-5/6 rounded-full bg-primary/10" />

        <div className="mt-4 flex gap-2">
          <span className="h-6 w-16 rounded border border-primary/10 bg-card" />
          <span className="h-6 w-10 rounded border border-primary/10 bg-card" />
        </div>
      </div>

      <span className="absolute right-4 top-4 font-mono text-xs text-primary/50">
        [{project.year}]
      </span>
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) =>
      event.key === 'Escape' && onClose();

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-primary/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onMouseDown={(event) =>
        event.target === event.currentTarget && onClose()
      }
    >
      <div className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-border bg-card shadow-2xl sm:rounded-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-5 py-4 backdrop-blur sm:px-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-secondary">
            {project.category} / case study
          </span>

          <button
            type="button"
            onClick={onClose}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted"
            aria-label="Close project details"
            data-testid="button-close-project"
          >
            <X size={17} />
          </button>
        </div>

        <div className="p-5 sm:p-8">
          <ProjectArtwork project={project} />

          <div className="mt-7 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3
                id="project-modal-title"
                className="text-3xl font-semibold tracking-[-0.04em]"
              >
                {project.name}
              </h3>

              <p className="mt-2 max-w-xl text-muted-foreground">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 border-t border-border pt-7 sm:grid-cols-2">
            {[
              ['The problem', project.problem],
              ['The solution', project.solution],
              ['The challenge', project.challenges],
              ['What I learned', project.learning],
            ].map(([label, copy]) => (
              <div key={label}>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary">
                  {label}
                </h4>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {copy}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 size={15} className="text-secondary" />
              Built as a practical learning project
            </span>

            <div className="flex flex-wrap gap-4">
              <a
                href={portfolio.github}
                className="focus-ring flex items-center gap-2 text-sm font-medium hover:text-secondary"
                data-testid="link-project-github"
              >
                GitHub <ExternalLink size={14} />
              </a>

              <a
                href="YOUR_LIVE_DEMO_URL"
                className="focus-ring flex items-center gap-2 text-sm font-medium hover:text-secondary"
                data-testid="link-project-demo"
              >
                Live demo <ExternalLink size={14} />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="focus-ring text-sm font-medium text-secondary hover:text-foreground"
                data-testid="button-project-details-close"
              >
                View details close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [dark, setDark] = useState(
    () => localStorage.getItem('ayub-theme') === 'dark',
  );

  const [loaded, setLoaded] = useState(false);

  const [filter, setFilter] = useState<'All' | ProjectCategory>('All');

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const visibleProjects = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  useScrollReveal(loaded);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('ayub-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 520);

    return () => window.clearTimeout(timer);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolio.email);
    } catch {
      /* Clipboard can be unavailable in restricted browsers. */
    }

    setCopied(true);

    window.setTimeout(() => setCopied(false), 2200);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  if (!loaded) return <LoadingScreen />;

  return (
    <div
      id="top"
      className="noise min-h-[100dvh] overflow-x-clip bg-background"
    >
      <SeoMeta />

      <Header
        dark={dark}
        onToggle={() => setDark((value) => !value)}
      />

      <main>
        <section className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-14 px-5 pb-20 pt-36 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:pt-40">
          <div className="grid-paper pointer-events-none absolute inset-x-0 top-0 -z-0 h-[460px] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

          <div className="relative z-10 reveal is-visible">
            <div className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.19em] text-secondary">
              <span className="h-px w-8 bg-secondary" />
              Available for thoughtful collaborations
            </div>

            <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {portfolio.name}
            </p>

            <p className="mb-7 max-w-xl text-sm text-muted-foreground">
              {portfolio.headline}
            </p>

            <h1 className="max-w-3xl text-balance text-[clamp(3.4rem,8vw,7.7rem)] font-semibold leading-[.88] tracking-[-0.075em]">
              Technology
              <br />
              <span className="text-secondary">with a point.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
              {portfolio.intro}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="focus-ring group inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:-translate-y-1 hover:bg-secondary hover:text-secondary-foreground"
                data-testid="link-hero-projects"
              >
                Explore selected work
                <ArrowDown
                  size={16}
                  className="transition group-hover:translate-y-1"
                />
              </a>

              <a
                href={portfolio.cvPath}
                download
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition hover:-translate-y-1 hover:border-secondary"
                data-testid="link-download-cv"
              >
                <Download size={15} />
                Download CV
              </a>
            </div>

            <div className="mt-12 flex items-center gap-6 text-muted-foreground">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em]">
                Based in Kenya
              </span>

              <span className="h-1 w-1 rounded-full bg-secondary" />

              <span className="font-mono text-[10px] uppercase tracking-[0.15em]">
                Open to learning
              </span>
            </div>
          </div>

          <div className="relative z-10 reveal is-visible [transition-delay:150ms]">

            {/* PROFILE PHOTO — ADDED HERE */}
            <div className="mb-8 flex justify-center">
              <div className="h-64 w-72 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                <img
                  src="/profile.png"
                  alt="Ayub Hared Muhumed"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
            {/* END PROFILE PHOTO */}

            <TerminalCard />

            <div className="mt-9 grid grid-cols-2 gap-3 sm:ml-14">
              <div className="rounded-xl border border-border bg-card p-4">
                <ShieldCheck
                  size={18}
                  className="mb-5 text-secondary"
                />

                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  Security-minded
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <Sparkles
                  size={18}
                  className="mb-5 text-accent-foreground"
                />

                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  AI curious
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 lg:px-10 lg:py-32"
        >
          <SectionHeading
            number="01"
            kicker="A little context"
            title="Curiosity is the starting point. Usefulness is the standard."
            copy="A serious approach to technology does not need to take itself too seriously. It needs to respect the people who rely on it."
          />

          <div className="grid gap-10 border-t border-border pt-10 lg:grid-cols-[1fr_1fr]">
            <div className="reveal">
              <p className="max-w-2xl text-2xl leading-[1.25] tracking-[-0.03em] sm:text-3xl">
                {portfolio.about}
              </p>

              <p className="mt-7 max-w-xl leading-7 text-muted-foreground">
                I enjoy working from the problem outward: understand the
                need, make the experience clear, and build the smallest
                dependable system that can move the idea forward.
              </p>
            </div>

            <div className="reveal grid gap-4 sm:grid-cols-2 lg:pl-10">
              <div className="rounded-xl bg-primary p-6 text-primary-foreground">
                <BookOpen
                  size={20}
                  className="mb-10 text-secondary"
                />

                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary-foreground/50">
                  Currently learning
                </p>

                <p className="mt-3 leading-7">{portfolio.learning}</p>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-border p-6">
                <MapPin size={20} className="text-secondary" />

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Working from
                  </p>

                  <p className="mt-2 text-xl font-medium">Kenya</p>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Building a global perspective from a local point of
                    view.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="scroll-mt-24 border-y border-border bg-muted/40"
        >
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
            <SectionHeading
              number="02"
              kicker="The toolkit"
              title="A growing stack, grounded in fundamentals."
              copy="Tools change. The habit of understanding the system, its user, and its trade-offs stays."
            />

            <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
              {portfolio.skills.map((skill, index) => (
                <div
                  key={skill.group}
                  className="reveal bg-card p-7 sm:p-9"
                  style={{
                    transitionDelay: `${index * 90}ms`,
                  }}
                >
                  <span className="font-mono text-xs text-secondary">
                    0{index + 1}
                  </span>

                  <h3 className="mt-12 text-2xl font-medium">
                    {skill.group}
                  </h3>

                  <ul className="mt-7 space-y-3">
                    {skill.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 lg:px-10 lg:py-32"
        >
          <SectionHeading
            number="03"
            kicker="Selected work"
            title="Projects that make the learning visible."
            copy="Four practical explorations across product, mobile, AI, and emerging systems. Open any project for the thinking behind it."
          />

          <div
            className="mb-10 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter projects"
          >
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                onClick={() => setFilter(item)}
                className={`focus-ring rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition ${
                  filter === item
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-secondary hover:text-foreground'
                }`}
                data-testid={`button-filter-${item.toLowerCase()}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {visibleProjects.map((project, index) => (
              <article
                key={project.id}
                className={`reveal group ${
                  index === 0 && visibleProjects.length === 4
                    ? 'lg:col-span-2 lg:grid lg:grid-cols-[1.05fr_.95fr] lg:gap-7 lg:items-center'
                    : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="focus-ring block w-full text-left"
                  data-testid={`button-project-${project.id}`}
                >
                  <ProjectArtwork project={project} />

                  <div className="flex items-start justify-between gap-4 py-5">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-secondary">
                        {project.category}
                      </p>

                      <h3 className="mt-2 text-2xl font-medium tracking-[-0.035em] transition group-hover:text-secondary">
                        {project.name}
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                        {project.description}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-secondary">
                        View details
                        <ArrowUpRight size={14} />
                      </span>
                    </div>

                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition group-hover:border-secondary group-hover:bg-secondary group-hover:text-secondary-foreground">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </button>
              </article>
            ))}
          </div>

          {visibleProjects.length === 0 && (
            <div className="rounded-xl border border-dashed border-border py-16 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.13em] text-muted-foreground">
                No projects in this category yet.
              </p>
            </div>
          )}
        </section>

        <section className="border-y border-border bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
            <div>
              <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
                <Github size={15} />
                Open source trail
              </div>

              <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                The best way to see how I think is to look at what I build.
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-primary-foreground/60">
                Code, experiments, and the steady work of getting better live
                on GitHub.
              </p>
            </div>

            <a
              href={portfolio.github}
              className="focus-ring inline-flex w-fit items-center gap-3 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition hover:-translate-y-1"
              data-testid="link-github"
            >
              Visit GitHub
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <section
          id="education"
          className="scroll-mt-24 mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32"
        >
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <div className="reveal">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                04 / Education
              </p>

              <h2 className="max-w-md text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl">
                The work is ongoing. That is the point.
              </h2>
            </div>

            <div className="reveal border-t border-border">
              {portfolio.education.map((item, index) => (
                <div
                  key={item.title}
                  className="flex items-start justify-between gap-5 border-b border-border py-6"
                >
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-secondary">
                      0{index + 1} / Education
                    </p>

                    <h3 className="mt-3 text-xl font-medium">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.institution}
                    </p>

                    <p className="mt-4 max-w-lg leading-7 text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>

                  <span className="font-mono text-xs text-muted-foreground">
                    Editable
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="achievements"
          className="scroll-mt-24 border-y border-border bg-muted/40"
        >
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
            <SectionHeading
              number="05"
              kicker="Achievements"
              title="A space for the milestones that matter."
              copy="These cards are intentionally editable placeholders. Replace them with verified certifications, events, presentations, or accomplishments when ready."
            />

            <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.achievements.map((achievement) => (
                <article
                  key={achievement.category}
                  className="reveal bg-card p-6"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-secondary">
                    {achievement.category}
                  </p>

                  <h3 className="mt-7 text-xl font-medium">
                    {achievement.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {achievement.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-24 bg-muted/45"
        >
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-32">
            <div className="reveal">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-secondary">
                06 / Start a conversation
              </p>

              <h2 className="max-w-md text-5xl font-semibold leading-[.98] tracking-[-0.06em] sm:text-6xl">
                Let&apos;s Build Something Useful
              </h2>

              <p className="mt-7 max-w-sm leading-7 text-muted-foreground">
                Have a project idea, collaboration opportunity, internship
                opportunity, or simply want to connect? I&apos;d love to hear
                from you.
              </p>

              <div className="mt-10 space-y-4">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="focus-ring flex items-center gap-3 text-sm font-medium hover:text-secondary"
                  data-testid="button-copy-email"
                >
                  <Mail size={16} />
                  {portfolio.email}

                  {copied ? (
                    <span className="ml-1 font-mono text-[10px] text-secondary">
                      <Check size={13} className="inline" /> copied
                    </span>
                  ) : (
                    <Copy
                      size={13}
                      className="ml-1 text-muted-foreground"
                    />
                  )}
                </button>

                <a
                  href={portfolio.github}
                  className="focus-ring flex w-fit items-center gap-3 text-sm font-medium hover:text-secondary"
                  data-testid="link-contact-github"
                >
                  <Github size={16} />
                  GitHub
                  <ExternalLink
                    size={13}
                    className="text-muted-foreground"
                  />
                </a>

                <a
                  href={portfolio.linkedin}
                  className="focus-ring flex w-fit items-center gap-3 text-sm font-medium hover:text-secondary"
                  data-testid="link-linkedin"
                >
                  <Linkedin size={16} />
                  LinkedIn
                  <ExternalLink
                    size={13}
                    className="text-muted-foreground"
                  />
                </a>

                <p className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin size={16} className="text-secondary" />
                  {portfolio.location}
                </p>
              </div>
            </div>

            <div className="reveal rounded-2xl border border-border bg-card p-6 shadow-[8px_8px_0_hsl(var(--secondary))] sm:p-8">
              <form onSubmit={submitForm} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      Name
                    </span>

                    <input
                      required
                      name="name"
                      placeholder="Your name"
                      className="focus-ring mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-secondary"
                      data-testid="input-contact-name"
                    />
                  </label>

                  <label className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      Email
                    </span>

                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="focus-ring mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-secondary"
                      data-testid="input-contact-email"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    Message
                  </span>

                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="Tell me a little about what you are working on..."
                    className="focus-ring mt-2 w-full resize-none border-b border-border bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-secondary"
                    data-testid="textarea-contact-message"
                  />
                </label>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="focus-ring inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:-translate-y-1 hover:bg-secondary hover:text-secondary-foreground"
                    data-testid="button-submit-contact"
                  >
                    <Send size={15} />
                    Send message
                  </button>

                  {submitted && (
                    <p
                      className="flex items-center gap-2 text-sm text-secondary"
                      role="status"
                      data-testid="status-contact-success"
                    >
                      <CheckCircle2 size={16} />
                      Thanks — your message is ready to be followed up.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              © 2026 Ayub Hared Muhumed. All rights reserved.
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Building, learning, and turning ideas into technology.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={portfolio.github}
              className="focus-ring text-muted-foreground hover:text-foreground"
              aria-label="GitHub"
              data-testid="link-footer-github"
            >
              <Github size={17} />
            </a>

            <a
              href={portfolio.linkedin}
              className="focus-ring text-muted-foreground hover:text-foreground"
              aria-label="LinkedIn"
              data-testid="link-footer-linkedin"
            >
              <Linkedin size={17} />
            </a>

            <a
              href="#top"
              className="focus-ring flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground"
              data-testid="link-back-top"
            >
              Back to top
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </footer>

      <button
        type="button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
        className="focus-ring fixed bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition hover:-translate-y-1 hover:border-secondary"
        aria-label="Back to top"
        data-testid="button-back-to-top"
      >
        <ArrowUpRight size={17} />
      </button>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

function LoadingScreen() {
  return (
    <div
      className="flex min-h-[100dvh] items-center justify-center bg-background px-5"
      role="status"
      data-testid="status-loading"
    >
      <div className="w-full max-w-xs">
        <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>Loading portfolio</span>
          <span className="text-secondary">01</span>
        </div>

        <div className="h-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-2/3 animate-pulse bg-secondary" />
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-5">
      <div className="max-w-md text-center">
        <p className="font-mono text-sm text-secondary">
          ERROR 404 / ROUTE NOT FOUND
        </p>

        <h1 className="mt-5 text-6xl font-semibold tracking-[-0.07em]">
          Wrong turn.
        </h1>

        <p className="mt-5 leading-7 text-muted-foreground">
          This page does not exist in the current build. The useful thing is
          to head back and keep exploring.
        </p>

        <button
          type="button"
          onClick={() => setLocation('/')}
          className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          data-testid="button-404-home"
        >
          Return home
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <ErrorBoundary resetKey={location}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter
          base={import.meta.env.BASE_URL.replace(/\/$/, '')}
        >
          <Router />
        </WouterRouter>

        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;