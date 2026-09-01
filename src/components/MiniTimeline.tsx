import { EXPERIENCES } from '../data/portfolioData';
import { ScrambleText } from './TextAnimations';
import { Parallax } from './Parallax';
import { HeadingReveal } from './HeadingReveal';

// ExperienceItem.period strings we currently use:
//   "May 2025 – July 2025"  (work, 2 months)
//   "2024 – 2025"            (leadership, 1 year)
//   "2022 – 2026"            (btech, 4 years)
//   "2020 – 2022"            (intermediate)
//   "2019 – 2020"            (ssc)
//
// Parse the end year (or start year if single) so the most recent entry floats
// to the top of the timeline.
function endYear(period: string): number {
  const match = period.match(/(\d{4})\s*[–\-]?\s*(\d{4})?/);
  if (!match) return 0;
  return Number(match[2] ?? match[1]);
}

export default function MiniTimeline() {
  const sorted = [...EXPERIENCES].sort((a, b) => endYear(b.period) - endYear(a.period));

  return (
    <section
      id="timeline"
      className="relative w-full bg-[#F4F0EB] dark:bg-[#0A0806] text-[#111111] dark:text-[#F5EFEB] py-16 sm:py-24 border-b border-[#E2DBD2] dark:border-[#2A231C] overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 space-y-10 sm:space-y-14">
        {/* Header */}
        <HeadingReveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#D5CCC0] dark:border-[#2A231C] pb-6">
            <div>
              <div className="font-mono text-xs text-[#E04F2B] tracking-[0.24em] uppercase font-semibold">
                <ScrambleText duration={0.6} hoverScramble>
                  ( CHRONOLOGY )
                </ScrambleText>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.05] tracking-tight mt-2">
                A condensed timeline
              </h2>
              <p className="max-w-2xl text-xs sm:text-sm text-[#555555] dark:text-[#A0988C] font-sans font-light leading-relaxed mt-2">
                From foundational coursework through civic leadership, internships, and
                shipping production systems. The full version lives on the dedicated
                Experience page in the resume modal.
              </p>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#555555] dark:text-[#E04F2B]">
              [ {sorted.length} ENTRIES · 2019 – 2026 ]
            </div>
          </div>
        </HeadingReveal>

        {/* Timeline rows */}
        <Parallax speed={-0.04}>
          <ol className="relative border-l border-[#D5CCC0] dark:border-[#3A3025] ml-2 sm:ml-3 space-y-6 sm:space-y-8">
            {sorted.map((item) => (
              <li key={item.id} className="pl-6 sm:pl-8 relative">
                {/* Dot */}
                <span
                  className={`absolute -left-1.5 sm:-left-2 top-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 ${
                    item.type === 'Work Experience'
                      ? 'border-[#E04F2B] bg-[#F4F0EB] dark:bg-[#0A0806]'
                      : item.type === 'Leadership'
                      ? 'border-[#C89B3C] bg-[#F4F0EB] dark:bg-[#0A0806]'
                      : 'border-[#E04F2B] bg-[#F4F0EB] dark:bg-[#0A0806]'
                  }`}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2 sm:gap-4">
                  <h3 className="font-serif text-lg sm:text-xl text-[#111111] dark:text-[#F5EFEB] font-normal leading-snug">
                    {item.role}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#555555] dark:text-[#E04F2B]">
                    {item.period}
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#E04F2B] dark:text-[#C89B3C] mt-0.5">
                  {item.organization} · {item.location}
                </div>
                <p className="text-xs sm:text-sm text-[#444] dark:text-[#A6998A] font-sans font-light leading-relaxed mt-2 max-w-3xl">
                  {item.summary}
                </p>
                {item.metrics && (
                  <div className="mt-2 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#555] dark:text-[#E04F2B]">
                    <span>{item.metrics.label}:</span>
                    <span className="text-[#111] dark:text-[#E04F2B] font-bold">
                      {item.metrics.value}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </Parallax>
      </div>
    </section>
  );
}
