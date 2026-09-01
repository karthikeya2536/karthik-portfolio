import { SKILL_CATEGORIES } from '../data/portfolioData';
import { ScrambleText } from './TextAnimations';
import { Parallax } from './Parallax';
import { HeadingReveal } from './HeadingReveal';
import { Layers, Cpu, Network, Boxes } from 'lucide-react';

const ICONS = [Cpu, Network, Layers, Boxes];

export default function CapabilitiesConstellation() {
  return (
    <section
      id="capabilities"
      className="relative w-full bg-[#0D0D0D] dark:bg-[#060505] text-[#F3EFEA] py-16 sm:py-24 border-b border-[#242424] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 space-y-10 sm:space-y-14">
        {/* Header */}
        <HeadingReveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#242424] pb-6">
            <div>
              <div className="font-mono text-xs text-[#E3532C] tracking-[0.24em] uppercase font-semibold">
                <ScrambleText duration={0.6} hoverScramble>
                  ( CAPABILITIES )
                </ScrambleText>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.05] tracking-tight text-[#F3EFEA] mt-2">
                What I Actually Build With
              </h2>
              <p className="max-w-2xl text-xs sm:text-sm text-[#8E8A84] font-sans font-light leading-relaxed mt-2">
                A condensed view of the languages, libraries, and operational engines I reach
                for when shipping production AI/ML systems. Grouped by where they sit in the
                stack.
              </p>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8E8A84]">
              [ Self-rated · production-tested ]
            </div>
          </div>
        </HeadingReveal>

        {/* Category tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#242424] border border-[#242424]">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = ICONS[idx] ?? Cpu;
            return (
              <Parallax key={cat.title} speed={(idx - 1) * 0.04}>
                <div className="bg-[#0D0D0D] dark:bg-[#060505] p-6 sm:p-8 space-y-5 h-full">
                  <div className="flex items-start justify-between border-b border-[#1E1E1E] pb-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-[#E3532C]" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#8E8A84]">
                          CL. {['I', 'II', 'III', 'IV'][idx] ?? `${idx + 1}`}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#F3EFEA] font-normal leading-tight">
                        {cat.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-[#8E8A84] tracking-widest">
                      {cat.skills.length} ENTRIES
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#8E8A84] font-sans font-light leading-relaxed">
                    {cat.description}
                  </p>

                  <ul className="space-y-2.5 pt-2">
                    {cat.skills.map((s) => (
                      <li
                        key={s.name}
                        className="flex items-start justify-between gap-3 border-t border-[#1E1E1E] pt-2.5 first:border-t-0 first:pt-0"
                      >
                        <div className="space-y-0.5">
                          <div className="font-mono text-xs text-[#F3EFEA] font-semibold">
                            {s.name}
                          </div>
                          <div className="text-[11px] text-[#8E8A84] font-sans leading-snug">
                            {s.context}
                          </div>
                        </div>
                        <span
                          className={`shrink-0 font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 border ${
                            s.level === 'Core'
                              ? 'border-[#E3532C] text-[#E3532C]'
                              : s.level === 'Advanced'
                              ? 'border-[#8E8A84] text-[#C4B5A5]'
                              : 'border-[#333] text-[#8E8A84]'
                          }`}
                        >
                          {s.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Parallax>
            );
          })}
        </div>
      </div>
    </section>
  );
}
