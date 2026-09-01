import { ASSETS } from '../data/assets';
import { about, capabilities } from '../data/content';
import { ScrambleText } from './TextAnimations';
import { SplitText } from './SplitText';
import { Magnetic } from './Magnetic';
import { Parallax, ParallaxText, TiltCard } from './Parallax';
import { HeadingReveal } from './HeadingReveal';

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full bg-[#F4F0EB] text-[#111111] py-20 sm:py-28 border-b border-[#E2DBD2] overflow-hidden">

      {/* Background Parallax Typography Marquee */}
      <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 opacity-[0.035] pointer-events-none select-none z-0">
        <ParallaxText
          baseVelocity={0.7}
          direction="left"
          scrollScrubMultiplier={0.7}
          className="w-full"
          textClassName="font-serif text-[8rem] sm:text-[13rem] font-bold text-[#111111] tracking-tighter"
        >
          ENGINEER • PROBLEM SOLVER • BUILDER • HYDERABAD •
        </ParallaxText>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-12 relative z-10">

        {/* Section Header */}
        <HeadingReveal>
          <div className="flex items-center justify-between border-b border-[#E2DBD2] pb-6">
            <span className="font-mono text-xs text-[#E3532C] tracking-widest font-semibold">
              <ScrambleText chars="telemetry" duration={0.8} hoverScramble>
                ( ABOUT )
              </ScrambleText>
            </span>

            {/* Crosshair / Reticle Graphic with Magnetic Interaction */}
            <Magnetic strength={0.35}>
              <div
                className="text-[#968F87] font-mono text-base flex items-center justify-center p-1 cursor-pointer"
                data-cursor="cipher"
              >
                <svg className="w-5 h-5 text-[#968F87] hover:text-[#E3532C] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <circle cx="12" cy="12" r="6" strokeDasharray="2 2" />
                </svg>
              </div>
            </Magnetic>
          </div>
        </HeadingReveal>

        {/* Main Headline with Editorial GSAP SplitText Word-by-Word Reveals + Parallax */}
        <HeadingReveal delay={0.1}>
          <Parallax speed={-0.06}>
            <div className="max-w-3xl space-y-1.5" data-cursor="text">
              {about.headlineLines.map((line, i) => (
                <div key={i} className="overflow-visible">
                  <SplitText
                    as="h2"
                    mode="words"
                    stagger={0.06}
                    duration={0.9}
                    delay={0.1 + i * 0.15}
                    className="font-serif text-2xl xs:text-3xl sm:text-5xl lg:text-[3.6rem] font-normal leading-[1.1] text-[#111111] tracking-tight"
                    wordClassName="hover:text-[#E3532C] transition-colors duration-200"
                    highlightWord={line.claySuffix?.replace(/\.$/, '')}
                    highlightClassName="text-[#E3532C] italic font-serif"
                  >
                    {line.text + (line.claySuffix ?? '')}
                  </SplitText>
                </div>
              ))}
            </div>
          </Parallax>
        </HeadingReveal>

        {/* Grid: Portrait on Left with Parallax Depth & 3D Tilt, Structured Table on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start pt-4">

          {/* Left Portrait Image */}
          <div className="lg:col-span-5">
            <Parallax speed={0.12}>
              <TiltCard maxTilt={6} perspective={900} glare={true}>
                <div
                  className="relative w-full max-w-md aspect-[1086/1448] bg-[#E2DBD2] overflow-hidden border border-[#D5CCC0] shadow-md group cursor-pointer"
                  data-cursor="view"
                  data-cursor-text="HYDERABAD"
                >
                  <img
                    src={ASSETS.aboutPortrait}
                    alt="Yemula Karthikeya"
                    width={1086}
                    height={1448}
                    className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-115 brightness-95 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#111111]/80 backdrop-blur-sm px-2 py-0.5 text-[9px] font-mono text-[#F4F0EB]">
                    <ScrambleText chars="telemetry" duration={0.8} hoverScramble>
                      PORTRAIT · HYDERABAD
                    </ScrambleText>
                  </div>
                </div>
              </TiltCard>
            </Parallax>
          </div>

          {/* Right Metadata Table with Parallax Scroll */}
          <div className="lg:col-span-7 space-y-8">
            <Parallax speed={-0.08}>
              <div className="border-t border-[#D5CCC0] divide-y divide-[#E2DBD2]">
                {about.facts.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-12 py-3.5 sm:py-4 gap-2 items-baseline group hover:bg-[#EAE4DC]/50 px-2 -mx-2 transition-colors duration-200"
                  >
                    <div className="sm:col-span-4 font-mono text-[11px] text-[#6E6862] tracking-wider uppercase font-medium">
                      <ScrambleText chars="editorial" duration={0.6} delay={idx * 0.08} hoverScramble>
                        {item.label}
                      </ScrambleText>
                    </div>
                    <div className="sm:col-span-8 font-sans text-xs sm:text-sm text-[#111111] font-normal whitespace-pre-line leading-relaxed">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Long-form paragraph from content.ts */}
              <div className="pt-6 border-t border-[#E2DBD2] space-y-5">
                <p className="text-sm sm:text-base text-[#111111] font-sans font-light leading-relaxed">
                  {about.paragraph}
                </p>

                {/* Capabilities as a compact tag strip */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {capabilities.map((c) => (
                    <span
                      key={c}
                      className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-[#D5CCC0] text-[#555] hover:border-[#E3532C] hover:text-[#E3532C] transition-colors"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Handwritten signature */}
              <div className="pt-6 border-t border-[#E2DBD2] flex justify-end">
                <Magnetic strength={0.4}>
                  <div
                    className="font-handwriting text-3xl sm:text-4xl text-[#E3532C] rotate-[-4deg] select-none tracking-wide pr-2 cursor-pointer hover:scale-110 transition-transform"
                    data-cursor="pointer"
                    data-cursor-text="SIGNATURE"
                  >
                    Karthik
                  </div>
                </Magnetic>
              </div>
            </Parallax>
          </div>

        </div>

      </div>
    </section>
  );
}
