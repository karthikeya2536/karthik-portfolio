import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Layers, Cpu, Compass, Sparkles, Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { featuredProjects, type FeaturedProject } from '../data/content';
import type { Project as PortfolioProject } from '../types';
import { ASSETS } from '../data/assets';
import { ScrambleText } from './TextAnimations';
import { Parallax } from './Parallax';
import { HeadingReveal } from './HeadingReveal';
import { Magnetic } from './Magnetic';
import { PageTransition } from './PageTransition';

// The rich case-study data (architecture summary, key innovations, etc.)
// lives in `portfolioData.ts` keyed by the old `id`. The new content.ts
// uses `slug` (sonicstream, edupredict). This adapter maps between them.
const SLUG_TO_PORTFOLIO_ID: Record<string, string> = {
  sonicstream: 'sonic-stream',
  edupredict: 'student-analytics',
};

// Inverse maps used in a few places to convert back to the content.ts
// slug (e.g. when rendering the "Other Projects" sidebar of a rich
// case-study page — we need to skip the *content* slug of the project
// being viewed, not just the rich id).
const SLUG_TO_PORTFOLIO_ID_TO_CONTENT_SLUG: Record<string, string> = {
  'sonic-stream': 'sonicstream',
  'student-analytics': 'edupredict',
};
const SLUG_TO_PORTFOLIO_ID_REVERSE = SLUG_TO_PORTFOLIO_ID_TO_CONTENT_SLUG;

// All featured projects can render in the short-form case study. There
// is no separate `moreWork` list anymore — every public project is a
// featured project.
const ALL_CONTENT_PROJECTS: FeaturedProject[] = [...featuredProjects];

interface ProjectCaseStudyProps {
  /**
   * Optional explicit project id. When omitted (the common case for the
   * /work/:projectId route), the id is read from the URL params.
   */
  projectId?: string;
}

export default function ProjectCaseStudy({ projectId: propId }: ProjectCaseStudyProps) {
  const { projectId: paramId } = useParams<{ projectId: string }>();
  const slug = propId ?? paramId ?? featuredProjects[0]?.slug;

  if (!slug) {
    return (
      <PageTransition>
        <div className="max-w-3xl mx-auto py-32 px-6 text-center">
          <h1 className="font-serif text-4xl mb-4">No projects to show yet</h1>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E04F2B] hover:text-[#F06138]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to work
          </Link>
        </div>
      </PageTransition>
    );
  }

  const portfolioId = SLUG_TO_PORTFOLIO_ID[slug];
  const project: PortfolioProject | undefined = portfolioId
    ? PROJECTS.find((p) => p.id === portfolioId)
    : undefined;
  const contentProject = ALL_CONTENT_PROJECTS.find((p) => p.slug === slug);

  if (!project && !contentProject) {
    return (
      <PageTransition>
        <div className="max-w-3xl mx-auto py-32 px-6 text-center">
          <h1 className="font-serif text-4xl mb-4">Project not found</h1>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E04F2B] hover:text-[#F06138]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to work
          </Link>
        </div>
      </PageTransition>
    );
  }

  if (project) {
    return (
      <FullCaseStudy
        project={project}
        allSlugs={ALL_CONTENT_PROJECTS.map((p) => p.slug)}
      />
    );
  }
  return (
    <ShortCaseStudy
      project={contentProject!}
      allSlugs={ALL_CONTENT_PROJECTS.map((p) => p.slug)}
    />
  );
}

// ─── 1) Rich case study from portfolioData.ts ───────────────────

function FullCaseStudy({
  project,
  allSlugs,
}: {
  project: PortfolioProject;
  allSlugs: string[];
}) {
  return (
    <PageTransition>
      <div className="w-full bg-[#0D0D0D] text-[#F3EFEA] border-b border-[#242424]">
        {/* ─── Top Bar ─────────────────────────────────────────────── */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 py-4 sm:py-5 border-b border-[#242424] flex items-center justify-between">
          <Magnetic strength={0.3}>
            <Link
              to="/work"
              className="group flex items-center gap-2 font-mono text-xs text-[#E3532C] hover:text-[#F06138] tracking-widest uppercase transition-colors py-1"
              data-cursor="pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <ScrambleText as="span" duration={0.6} hoverScramble>
                Back to work
              </ScrambleText>
            </Link>
          </Magnetic>

          {/* Quick project switcher tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px]">
            {allSlugs.map((slug, idx) => (
              <Magnetic key={slug} strength={0.35}>
                <Link
                  to={`/work/${slug}`}
                  className={`px-2 sm:px-2.5 py-1 border transition-colors cursor-pointer ${
                    SLUG_TO_PORTFOLIO_ID[slug] === project.id
                      ? 'border-[#E3532C] text-[#E3532C] bg-[#1A110E]'
                      : 'border-[#242424] text-[#8E8A84] hover:text-[#F3EFEA]'
                  }`}
                  data-cursor="pointer"
                >
                  0{idx + 1}
                </Link>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* ─── Header ─────────────────────────────────────────────── */}
        <header className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 pt-12 sm:pt-20 pb-10 sm:pb-16 space-y-8 sm:space-y-10">
          <HeadingReveal>
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] sm:text-xs text-[#E3532C] tracking-widest uppercase font-semibold">
                <span className="px-2.5 py-0.5 border border-[#E3532C]/40 bg-[#1A110E]">
                  {project.category}
                </span>
                <span>CHRONO-SPEC · {project.timeline}</span>
                <span className="hidden sm:inline text-[#8E8A84]">
                  · CASE STUDY
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.04] tracking-tight text-[#F3EFEA]">
                {project.title}
              </h1>

              <p className="font-serif text-base sm:text-xl text-[#8E8A84] font-light leading-relaxed max-w-3xl">
                {project.subtitle}
              </p>

              <p className="text-sm sm:text-base text-[#C4B5A5] font-sans font-light leading-relaxed max-w-3xl">
                {project.overview}
              </p>
            </div>
          </HeadingReveal>

          {/* Action row */}
          <Parallax speed={-0.04}>
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#242424]">
              {project.liveUrl && (
                <Magnetic strength={0.3}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs text-[#E3532C] hover:text-[#F06138] tracking-widest uppercase transition-colors py-1"
                    data-cursor="pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#E3532C] animate-pulse inline-block" />
                    <ScrambleText as="span" duration={0.7} hoverScramble>
                      Live system
                    </ScrambleText>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Magnetic>
              )}

              {project.githubUrl && (
                <Magnetic strength={0.3}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs text-[#8E8A84] hover:text-[#F3EFEA] tracking-widest uppercase transition-colors py-1"
                    data-cursor="pointer"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <ScrambleText as="span" duration={0.7} hoverScramble>
                      Source repository
                    </ScrambleText>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Magnetic>
              )}
            </div>
          </Parallax>
        </header>

        {/* ─── Project screenshot ──────────────────────────────────── */}
        {project.image && (
          <section className="border-y border-[#242424] bg-[#0A0806]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 py-8 sm:py-12">
              <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden border border-[#242424] bg-[#080808]">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </section>
        )}

        {/* ─── Measured metrics ribbon ─────────────────────────────── */}
        <section className="border-y border-[#242424] bg-[#0A0806]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#242424]">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-[#0A0806] p-5 sm:p-7 space-y-1.5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E8A84]">
                  {m.label}
                </div>
                <div className="font-serif text-2xl sm:text-4xl font-normal text-[#E3532C] leading-none">
                  {m.value}
                </div>
                <div className="text-xs text-[#8E8A84] font-sans leading-snug">
                  {m.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Case study body ────────────────────────────────────── */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Left column: long-form narrative */}
          <article className="lg:col-span-7 space-y-10 sm:space-y-14">
            <CaseBlock
              kicker="01 · The Problem"
              icon={<Compass className="w-3.5 h-3.5" />}
              body={project.caseStudy.problemStatement}
            />

            <CaseBlock
              kicker="02 · The Approach"
              icon={<Layers className="w-3.5 h-3.5" />}
              body={project.caseStudy.architecturalSolution}
            />

            <div className="space-y-4">
              <SectionHeader
                kicker="03 · Key Innovations"
                icon={<Sparkles className="w-3.5 h-3.5" />}
              />
              <ul className="space-y-3 text-sm sm:text-base text-[#C4B5A5] font-serif leading-relaxed">
                {project.caseStudy.keyInnovations.map((k) => (
                  <li
                    key={k}
                    className="flex items-start gap-3 border-l border-[#E3532C]/40 pl-4"
                  >
                    <span className="font-mono text-[10px] text-[#E3532C] mt-1 shrink-0">
                      ▸
                    </span>
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <SectionHeader
                kicker="04 · Verified Benchmarks"
                icon={<Check className="w-3.5 h-3.5" />}
              />
              <ul className="space-y-3 text-sm sm:text-base text-[#C4B5A5] font-serif leading-relaxed">
                {project.caseStudy.benchmarkResults.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="text-[#E3532C] mt-1 shrink-0">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Right column: stack + summary + other projects */}
          <aside className="lg:col-span-5 space-y-6 sm:space-y-8">
            {/* Architecture summary card */}
            <div className="border border-[#242424] bg-[#0A0806] p-6 sm:p-7 space-y-4">
              <SectionHeader
                kicker="Architectural Summary"
                icon={<Cpu className="w-3.5 h-3.5" />}
              />
              <ul className="space-y-3 text-xs sm:text-sm text-[#C4B5A5] font-serif leading-relaxed">
                {project.architectureSummary.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 border-b border-[#1E1E1E] pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="font-mono text-[10px] text-[#E3532C] mt-0.5 shrink-0">
                      §{idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack card */}
            <div className="border border-[#242424] bg-[#0A0806] p-6 sm:p-7 space-y-4">
              <SectionHeader
                kicker="Stack & Tooling"
                icon={<Layers className="w-3.5 h-3.5" />}
              />
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-[#242424] text-[#C4B5A5] hover:border-[#E3532C] hover:text-[#E3532C] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Other projects — show all 4 featured projects, not just the
                two with rich case-study data, so the user can navigate
                to the short-form pages too. */}
            {ALL_CONTENT_PROJECTS.filter((p) => p.slug !== SLUG_TO_PORTFOLIO_ID_TO_CONTENT_SLUG[project.id] && p.slug !== SLUG_TO_PORTFOLIO_ID_REVERSE[project.id]).length > 0 && (
              <div className="border border-[#242424] bg-[#0A0806] p-6 sm:p-7 space-y-4">
                <SectionHeader
                  kicker="Other Projects"
                  icon={<ArrowLeft className="w-3.5 h-3.5 rotate-180" />}
                />
                <ul className="space-y-2">
                  {ALL_CONTENT_PROJECTS.filter((p) => {
                    // Skip the project we're currently viewing
                    const currentContentSlug =
                      SLUG_TO_PORTFOLIO_ID_TO_CONTENT_SLUG[project.id] ??
                      SLUG_TO_PORTFOLIO_ID_REVERSE[project.id];
                    return p.slug !== currentContentSlug;
                  }).map((p) => (
                    <li key={p.slug}>
                      <Link
                        to={`/work/${p.slug}`}
                        className="group flex items-center justify-between py-2 border-b border-[#1E1E1E] last:border-b-0 hover:text-[#E3532C] transition-colors"
                        data-cursor="pointer"
                      >
                        <div>
                          <div className="font-serif text-base sm:text-lg text-[#F3EFEA] group-hover:text-[#E3532C]">
                            {p.name}
                          </div>
                          <div className="font-mono text-[10px] uppercase tracking-widest text-[#8E8A84]">
                            {p.year}
                          </div>
                        </div>
                        <ArrowLeft className="w-3.5 h-3.5 text-[#8E8A84] group-hover:text-[#E3532C] rotate-180 group-hover:translate-x-1 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </section>
      </div>
    </PageTransition>
  );
}

// ─── 2) Short case study for content.ts-only projects ───────────

function ShortCaseStudy({
  project,
  allSlugs,
}: {
  project: FeaturedProject;
  allSlugs: string[];
}) {
  const heroImg = project.image?.src ?? ASSETS.aboutPortrait;

  return (
    <PageTransition>
      <div className="w-full bg-[#0D0D0D] text-[#F3EFEA] border-b border-[#242424]">
        {/* Top Bar */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 py-4 sm:py-5 border-b border-[#242424] flex items-center justify-between">
          <Magnetic strength={0.3}>
            <Link
              to="/work"
              className="group flex items-center gap-2 font-mono text-xs text-[#E3532C] hover:text-[#F06138] tracking-widest uppercase transition-colors py-1"
              data-cursor="pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <ScrambleText as="span" duration={0.6} hoverScramble>
                Back to work
              </ScrambleText>
            </Link>
          </Magnetic>

          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px]">
            {allSlugs.map((slug, idx) => (
              <Magnetic key={slug} strength={0.35}>
                <Link
                  to={`/work/${slug}`}
                  className={`px-2 sm:px-2.5 py-1 border transition-colors cursor-pointer ${
                    slug === project.slug
                      ? 'border-[#E3532C] text-[#E3532C] bg-[#1A110E]'
                      : 'border-[#242424] text-[#8E8A84] hover:text-[#F3EFEA]'
                  }`}
                  data-cursor="pointer"
                >
                  0{idx + 1}
                </Link>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* Header */}
        <header className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 pt-12 sm:pt-20 pb-10 sm:pb-16 space-y-8 sm:space-y-10">
          <HeadingReveal>
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] sm:text-xs text-[#E3532C] tracking-widest uppercase font-semibold">
                <span className="px-2.5 py-0.5 border border-[#E3532C]/40 bg-[#1A110E]">
                  {project.year}
                </span>
                <span>SHIPPED</span>
                <span className="hidden sm:inline text-[#8E8A84]">
                  · {project.num}
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.04] tracking-tight text-[#F3EFEA]">
                {project.name}
              </h1>

              <p className="font-serif text-base sm:text-xl text-[#8E8A84] font-light leading-relaxed max-w-3xl">
                {project.summary}
              </p>

              <p className="text-sm sm:text-base text-[#E3532C] font-sans font-medium leading-relaxed max-w-3xl">
                {project.metric}
              </p>
            </div>
          </HeadingReveal>

          {/* Action row */}
          {(project.liveUrl || project.links.length > 0) && (
            <Parallax speed={-0.04}>
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#242424]">
                {project.liveUrl && (
                  <Magnetic strength={0.3}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs text-[#E3532C] hover:text-[#F06138] tracking-widest uppercase transition-colors py-1"
                      data-cursor="pointer"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#E3532C] animate-pulse inline-block" />
                      <ScrambleText as="span" duration={0.7} hoverScramble>
                        Live system
                      </ScrambleText>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </Magnetic>
                )}
                {project.links.map((link) => (
                  <Magnetic key={link.href} strength={0.3}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs text-[#8E8A84] hover:text-[#F3EFEA] tracking-widest uppercase transition-colors py-1"
                      data-cursor="pointer"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <ScrambleText as="span" duration={0.7} hoverScramble>
                        {link.label}
                      </ScrambleText>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </Parallax>
          )}
        </header>

        {/* Hero image */}
        {project.image && (
          <section className="border-y border-[#242424] bg-[#0A0806]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 py-8 sm:py-12">
              <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden border border-[#242424] bg-[#080808]">
                <img
                  src={heroImg}
                  alt={project.image.alt}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </section>
        )}

        {/* Case body — short form */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          <article className="lg:col-span-7 space-y-10 sm:space-y-14">
            <CaseBlock
              kicker="01 · The Problem"
              icon={<Compass className="w-3.5 h-3.5" />}
              body={project.problem}
            />
            <CaseBlock
              kicker="02 · The Approach"
              icon={<Layers className="w-3.5 h-3.5" />}
              body={project.approach}
            />
            <CaseBlock
              kicker="03 · The Implementation"
              icon={<Cpu className="w-3.5 h-3.5" />}
              body={project.implementation}
            />
            <CaseBlock
              kicker="04 · The Result"
              icon={<Check className="w-3.5 h-3.5" />}
              body={project.result}
            />
          </article>

          <aside className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="border border-[#242424] bg-[#0A0806] p-6 sm:p-7 space-y-4">
              <SectionHeader
                kicker="Stack & Tooling"
                icon={<Layers className="w-3.5 h-3.5" />}
              />
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-[#242424] text-[#C4B5A5] hover:border-[#E3532C] hover:text-[#E3532C] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-[#242424] bg-[#0A0806] p-6 sm:p-7 space-y-3">
              <SectionHeader kicker="Role" icon={<Sparkles className="w-3.5 h-3.5" />} />
              <p className="text-xs sm:text-sm text-[#C4B5A5] font-serif leading-relaxed">
                {project.role}
              </p>
            </div>
          </aside>
        </section>
      </div>
    </PageTransition>
  );
}

// ─── Internal helpers ──────────────────────────────────────────────

function SectionHeader({
  kicker,
  icon,
}: {
  kicker: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] text-[#E3532C] tracking-widest uppercase font-semibold border-b border-[#242424] pb-3">
      {icon}
      <span>{kicker}</span>
    </div>
  );
}

function CaseBlock({
  kicker,
  icon,
  body,
}: {
  kicker: string;
  icon: ReactNode;
  body: string;
}) {
  return (
    <div className="space-y-4">
      <SectionHeader kicker={kicker} icon={icon} />
      <p className="text-sm sm:text-base text-[#C4B5A5] font-serif leading-relaxed text-justify">
        {body}
      </p>
    </div>
  );
}
