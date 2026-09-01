import { GITHUB_REPOS } from '../data/portfolioData';
import { ScrambleText } from './TextAnimations';
import { Parallax } from './Parallax';
import { HeadingReveal } from './HeadingReveal';
import { Magnetic } from './Magnetic';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

const LANGUAGE_COLOR: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  Go: '#00ADD8',
  Rust: '#DEA584',
};

export default function OpenSourceFootprint() {
  return (
    <section
      id="open-source"
      className="relative w-full bg-[#0D0D0D] text-[#F3EFEA] py-16 sm:py-24 border-b border-[#242424] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 space-y-10 sm:space-y-14">
        {/* Header */}
        <HeadingReveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#242424] pb-6">
            <div>
              <div className="font-mono text-xs text-[#E3532C] tracking-[0.24em] uppercase font-semibold">
                <ScrambleText duration={0.6} hoverScramble>
                  ( OPEN SOURCE FOOTPRINT )
                </ScrambleText>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.05] tracking-tight text-[#F3EFEA] mt-2">
                Public Repositories
              </h2>
              <p className="max-w-2xl text-xs sm:text-sm text-[#8E8A84] font-sans font-light leading-relaxed mt-2">
                Production-grade ML systems, full-stack platforms, and the source for this
                portfolio itself. All open for reading, forking, and issue reports.
              </p>
            </div>
            <Magnetic strength={0.3}>
              <a
                href="https://github.com/karthikeya2536"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[#E3532C] hover:text-[#F06138] transition-colors"
                data-cursor="pointer"
              >
                <Github className="w-3.5 h-3.5" />
                Full profile
                <ExternalLink className="w-3 h-3" />
              </a>
            </Magnetic>
          </div>
        </HeadingReveal>

        {/* Repo grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#242424] border border-[#242424]">
          {GITHUB_REPOS.map((repo, idx) => {
            const langColor = LANGUAGE_COLOR[repo.language] ?? '#8E8A84';
            return (
              <Parallax key={repo.name} speed={(idx - 1) * 0.05}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block bg-[#0D0D0D] p-6 sm:p-7 h-full hover:bg-[#121212] transition-colors"
                  data-cursor="pointer"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-[#1E1E1E] pb-4">
                    <div className="flex items-center gap-2 min-w-0">
                      <Github className="w-4 h-4 text-[#8E8A84] group-hover:text-[#E3532C] transition-colors shrink-0" />
                      <span className="font-mono text-xs sm:text-sm font-semibold text-[#F3EFEA] truncate group-hover:text-[#E3532C] transition-colors">
                        {repo.name}
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#555] group-hover:text-[#E3532C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>

                  <p className="text-xs sm:text-sm text-[#8E8A84] font-sans leading-relaxed min-h-[3.5em] mt-3">
                    {repo.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {repo.topics.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 border border-[#2A2A2A] text-[#8E8A84] group-hover:border-[#444] group-hover:text-[#C4B5A5] transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer: language + stats */}
                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-[#1E1E1E] text-[10px] font-mono text-[#8E8A84]">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: langColor }}
                      />
                      <span className="uppercase tracking-widest">{repo.language}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {repo.forks}
                      </span>
                      <span className="hidden sm:inline">{repo.lastCommit}</span>
                    </div>
                  </div>
                </a>
              </Parallax>
            );
          })}
        </div>
      </div>
    </section>
  );
}
