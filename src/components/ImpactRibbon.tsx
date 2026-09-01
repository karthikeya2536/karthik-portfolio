import { PROFILE_METRICS, SKILL_CATEGORIES } from '../data/portfolioData';
import { ScrambleText } from './TextAnimations';
import { Parallax } from './Parallax';
import { HeadingReveal } from './HeadingReveal';

interface StatTile {
  label: string;
  value: string;
  detail: string;
}

const PRIMARY_STATS: StatTile[] = [
  {
    label: 'Production Records',
    value: PROFILE_METRICS.productionRecords,
    detail: 'Automated daily seller ingestion',
  },
  {
    label: 'Inference Latency',
    value: PROFILE_METRICS.inferenceLatencyMs,
    detail: 'p95 on heterogeneous GNN service',
  },
  {
    label: 'Embedding Dimension',
    value: PROFILE_METRICS.embeddingDim,
    detail: 'Cosine-similarity ranking space',
  },
  {
    label: 'Prediction Stability',
    value: PROFILE_METRICS.predictionStabilityPct,
    detail: 'Across multi-semester drift cycles',
  },
  {
    label: 'Funds Raised',
    value: PROFILE_METRICS.leadershipFundsRaised,
    detail: `${PROFILE_METRICS.leadershipBeneficiaries} direct beneficiaries`,
  },
  {
    label: 'Community Events',
    value: PROFILE_METRICS.leadershipEvents,
    detail: 'Cross-functional civic expeditions',
  },
];

const ACADEMIC_STATS: StatTile[] = [
  { label: 'B.Tech CGPA', value: PROFILE_METRICS.cGPA, detail: 'AI & ML · 2022 – 2026' },
  { label: 'Intermediate', value: PROFILE_METRICS.intermediatePct, detail: 'MPC · 2020 – 2022' },
  { label: 'SSC', value: PROFILE_METRICS.sscCGPA, detail: 'High School Honors' },
];

export default function ImpactRibbon() {
  return (
    <section
      id="impact"
      className="relative w-full bg-[#F4EFE6] dark:bg-[#090807] text-[#111111] dark:text-[#F4EFE6] py-16 sm:py-24 border-b border-[#111111]/15 dark:border-[#F4EFE6]/15 overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 space-y-12 sm:space-y-16">
        {/* Header */}
        <HeadingReveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#111111]/15 dark:border-[#F4EFE6]/15 pb-6">
            <div>
              <div className="font-mono text-xs text-[#E04F2B] tracking-[0.24em] uppercase font-semibold">
                <ScrambleText duration={0.6} hoverScramble>
                  ( BY THE NUMBERS )
                </ScrambleText>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.05] tracking-tight mt-2">
                Projected Impact &amp; Measured Telemetry
              </h2>
              <p className="max-w-2xl text-xs sm:text-sm text-[#555555] dark:text-[#A0988C] font-sans font-light leading-relaxed mt-2">
                Hard numbers from production systems, research, and civic stewardship.
                These are the metrics I optimise for — not vanity stats.
              </p>
            </div>

            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#555555] dark:text-[#A0988C]">
              [ Source: project telemetry, deployment logs, leadership reports ]
            </div>
          </div>
        </HeadingReveal>

        {/* Primary 3x2 stat grid */}
        <Parallax speed={-0.04}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#111111]/15 dark:bg-[#F4EFE6]/15 border border-[#111111]/15 dark:border-[#F4EFE6]/15">
            {PRIMARY_STATS.map((s) => (
              <div
                key={s.label}
                className="bg-[#F4EFE6] dark:bg-[#090807] p-5 sm:p-7 space-y-2 transition-colors duration-500"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#E04F2B]">
                  <ScrambleText duration={0.5} hoverScramble>
                    {s.label}
                  </ScrambleText>
                </div>
                <div className="font-serif text-3xl sm:text-5xl font-normal leading-none text-[#111111] dark:text-[#F4EFE6]">
                  <ScrambleText duration={0.7} hoverScramble>
                    {s.value}
                  </ScrambleText>
                </div>
                <div className="text-xs font-sans text-[#555555] dark:text-[#A0988C] leading-snug">
                  {s.detail}
                </div>
              </div>
            ))}
          </div>
        </Parallax>

        {/* Academic strip */}
        <Parallax speed={0.06}>
          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-b border-[#111111]/15 dark:border-[#F4EFE6]/15 divide-y sm:divide-y-0 sm:divide-x divide-[#111111]/15 dark:divide-[#F4EFE6]/15">
            {ACADEMIC_STATS.map((s) => (
              <div key={s.label} className="py-5 px-4 sm:px-6 space-y-1">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#E04F2B]">
                  {s.label}
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-normal leading-none text-[#111111] dark:text-[#F4EFE6]">
                  {s.value}
                </div>
                <div className="text-[11px] font-sans text-[#555555] dark:text-[#A0988C]">
                  {s.detail}
                </div>
              </div>
            ))}
          </div>
        </Parallax>
      </div>
    </section>
  );
}
