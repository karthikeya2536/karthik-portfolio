import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { identity } from '../data/content';
import { ScrambleText } from './TextAnimations';
import { SplitText } from './SplitText';
import { Magnetic } from './Magnetic';
import { Parallax, ParallaxText, TiltCard } from './Parallax';
import { HeadingReveal } from './HeadingReveal';
import { playChime } from '../utils/sound';

export default function NotesAndContact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  // Track the "COPIED" reset timer so we can clear it on unmount.
  const copyResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (copyResetTimeoutRef.current) {
        clearTimeout(copyResetTimeoutRef.current);
        copyResetTimeoutRef.current = null;
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable');
      }
      await navigator.clipboard.writeText(identity.email);
      setCopiedEmail(true);
      if (copyResetTimeoutRef.current) clearTimeout(copyResetTimeoutRef.current);
      copyResetTimeoutRef.current = setTimeout(() => setCopiedEmail(false), 2000);
      playChime();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <section id="notes" className="w-full">
      
      {/* Top Half: Dark Notes / 02 Card */}
      <div className="relative w-full bg-[#0D0D0D] text-[#F3EFEA] py-14 sm:py-24 border-b border-[#242424] overflow-hidden">
        
        {/* Background Parallax Marquee */}
        <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 opacity-[0.035] pointer-events-none select-none z-0">
          <ParallaxText
            baseVelocity={0.6}
            direction="left"
            scrollScrubMultiplier={0.7}
            className="w-full"
            textClassName="font-serif text-[6rem] sm:text-[10rem] lg:text-[13rem] font-bold text-[#F3EFEA] tracking-tighter"
          >
            FIRST PRINCIPLES • CLARITY OVER NOISE • RELIABILITY •
          </ParallaxText>
        </div>

        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="notesGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#666666" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#notesGrid)" />
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 relative z-10 space-y-12 sm:space-y-16">
          
          {/* Header row with coordinates & Parallax */}
          <HeadingReveal>
            <Parallax speed={-0.08}>
              <div className="flex items-start justify-between border-b border-[#242424] pb-5 sm:pb-6">
                <div className="font-mono text-xs text-[#8E8A84] tracking-widest uppercase">
                  <ScrambleText chars="telemetry" duration={0.6} hoverScramble>
                    NOTES /
                  </ScrambleText>{' '}
                  <span className="text-[#E3532C] font-semibold">02</span>
                </div>

                <div className="font-mono text-[10px] text-[#666666] text-right tracking-wider space-y-0.5" data-cursor="cipher">
                  <div>
                    <ScrambleText chars="telemetry" duration={0.7} hoverScramble>
                      X 0542
                    </ScrambleText>
                  </div>
                  <div>
                    <ScrambleText chars="telemetry" duration={0.7} hoverScramble>
                      Y 0218
                    </ScrambleText>
                  </div>
                </div>
              </div>
            </Parallax>
          </HeadingReveal>

          {/* Center Graphic & Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            
            {/* Statement with GSAP SplitText Reveals + Parallax */}
            <div className="lg:col-span-8 space-y-2" data-cursor="text">
              <Parallax speed={0.08}>
                <blockquote className="space-y-1">
                  <div className="overflow-visible">
                    <SplitText
                      as="div"
                      mode="words"
                      stagger={0.08}
                      duration={0.9}
                      delay={0.1}
                      className="font-serif text-2xl xs:text-3xl sm:text-5xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#F3EFEA]"
                      wordClassName="hover:text-[#E3532C] transition-colors duration-200"
                    >
                      Complexity
                    </SplitText>
                  </div>
                  <div className="overflow-visible">
                    <SplitText
                      as="div"
                      mode="words"
                      stagger={0.06}
                      duration={0.9}
                      delay={0.25}
                      className="font-serif text-2xl xs:text-3xl sm:text-5xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#F3EFEA]"
                      wordClassName="hover:text-[#E3532C] transition-colors duration-200"
                    >
                      is not the goal.
                    </SplitText>
                  </div>
                  <div className="overflow-visible">
                    <SplitText
                      as="div"
                      mode="words"
                      stagger={0.08}
                      duration={0.95}
                      delay={0.4}
                      className="font-serif text-2xl xs:text-3xl sm:text-5xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#F3EFEA]"
                      highlightWord="Clarity"
                      highlightClassName="text-[#E3532C] italic font-serif"
                      wordClassName="hover:text-[#E3532C] transition-colors duration-200"
                    >
                      Clarity is.
                    </SplitText>
                  </div>
                </blockquote>
              </Parallax>
            </div>

            {/* Reticle / Coordinate Target Graphic with 3D TiltCard + Magnetic Hover */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Parallax speed={-0.12}>
                <TiltCard maxTilt={15} perspective={600} glare={false}>
                  <Magnetic strength={0.35}>
                    <div
                      className="relative w-32 h-32 sm:w-36 sm:h-36 border border-[#242424] bg-[#0E0E0E] flex items-center justify-center group cursor-pointer shadow-lg"
                      data-cursor="cipher"
                    >
                      {/* Crosshairs */}
                      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#242424]" />
                      <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#242424]" />
                      
                      {/* Target node with pulse */}
                      <div className="relative w-8 h-8 rounded-full border border-[#E3532C] flex items-center justify-center animate-pulse-subtle">
                        <div className="w-2 h-2 rounded-full bg-[#E3532C]" />
                      </div>

                      <div className="absolute top-2 left-2 font-mono text-[8px] text-[#666666]">
                        <ScrambleText chars="telemetry" duration={0.6} hoverScramble>
                          REF: 02.AXIOM
                        </ScrambleText>
                      </div>
                      <div className="absolute bottom-2 right-2 font-mono text-[8px] text-[#E3532C]">
                        <ScrambleText chars="telemetry" duration={0.6} hoverScramble>
                          RESOLVED
                        </ScrambleText>
                      </div>
                    </div>
                  </Magnetic>
                </TiltCard>
              </Parallax>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Half: Cream Let's Build / Contact Card */}
      <div id="contact" className="relative w-full bg-[#F4F0EB] text-[#111111] py-14 sm:py-24 border-b border-[#E2DBD2] overflow-hidden">
        
        {/* Background Parallax Marquee */}
        <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 opacity-[0.035] pointer-events-none select-none z-0">
          <ParallaxText
            baseVelocity={0.7}
            direction="right"
            scrollScrubMultiplier={0.7}
            className="w-full"
            textClassName="font-serif text-[6rem] sm:text-[10rem] lg:text-[13rem] font-bold text-[#111111] tracking-tighter"
          >
            LET'S BUILD • COLLABORATE • SHIP MEANINGFUL SYSTEMS •
          </ParallaxText>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 space-y-10 sm:space-y-12 relative z-10">
          
          {/* Headline with top right arrow & Parallax */}
          <HeadingReveal>
            <Parallax speed={-0.06}>
              <div className="flex items-start justify-between border-b border-[#E2DBD2] pb-6 sm:pb-10">
                <div className="space-y-1" data-cursor="text">
                  <div className="overflow-visible">
                    <SplitText
                      as="h2"
                      mode="words"
                      stagger={0.06}
                      duration={0.9}
                      delay={0.1}
                      className="font-serif text-2xl xs:text-3xl sm:text-5xl lg:text-7xl font-normal leading-[1.06] tracking-tight text-[#111111]"
                      wordClassName="hover:text-[#E3532C] transition-colors duration-200"
                    >
                      Let’s build something
                    </SplitText>
                  </div>
                  <div className="overflow-visible">
                    <SplitText
                      as="h2"
                      mode="words"
                      stagger={0.06}
                      duration={0.9}
                      delay={0.25}
                      className="font-serif text-2xl xs:text-3xl sm:text-5xl lg:text-7xl font-normal leading-[1.06] tracking-tight text-[#111111]"
                      highlightWord="meaningful."
                      highlightClassName="italic font-serif text-[#E3532C]"
                      wordClassName="hover:text-[#E3532C] transition-colors duration-200"
                    >
                      meaningful.
                    </SplitText>
                  </div>
                </div>

                <Magnetic strength={0.4}>
                  <a
                    href={`mailto:${identity.email}`}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#111111] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-[#F4F0EB] transition-all cursor-pointer group shadow-sm shrink-0"
                    title="Compose Email"
                    data-cursor="pointer"
                  >
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </Magnetic>
              </div>
            </Parallax>
          </HeadingReveal>

          {/* Contact Details Table with Parallax */}
          <Parallax speed={0.06}>
            <div className="border-t border-[#D5CCC0] divide-y divide-[#E2DBD2]">
              {/* Email */}
              <div className="grid grid-cols-1 sm:grid-cols-12 py-3.5 sm:py-5 gap-2 sm:gap-3 items-center group hover:bg-[#EAE4DC]/50 px-2 -mx-2 transition-colors">
                <div className="sm:col-span-3 font-mono text-[11px] sm:text-xs text-[#6E6862] tracking-wider uppercase font-medium">
                  <ScrambleText chars="editorial" duration={0.5} hoverScramble>
                    EMAIL
                  </ScrambleText>
                </div>
                <div className="sm:col-span-7 font-mono text-xs sm:text-sm text-[#111111] break-all sm:break-normal">
                  <a
                    href={`mailto:${identity.email}`}
                    className="hover:text-[#E3532C] transition-colors"
                    data-cursor="pointer"
                  >
                    {identity.email}
                  </a>
                </div>
                <div className="sm:col-span-2 flex justify-start sm:justify-end pt-1 sm:pt-0">
                  <Magnetic strength={0.3}>
                    <button
                      onClick={handleCopyEmail}
                      className="flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-[#6E6862] hover:text-[#111111] border border-[#D5CCC0] px-2.5 py-1 transition-colors cursor-pointer"
                      data-cursor="pointer"
                    >
                      {copiedEmail ? <Check className="w-3 h-3 text-[#E3532C]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </Magnetic>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="grid grid-cols-1 sm:grid-cols-12 py-3.5 sm:py-5 gap-2 sm:gap-3 items-center group hover:bg-[#EAE4DC]/50 px-2 -mx-2 transition-colors">
                <div className="sm:col-span-3 font-mono text-[11px] sm:text-xs text-[#6E6862] tracking-wider uppercase font-medium">
                  <ScrambleText chars="editorial" duration={0.5} hoverScramble>
                    LINKEDIN
                  </ScrambleText>
                </div>
                <div className="sm:col-span-7 font-mono text-xs sm:text-sm text-[#111111] break-all sm:break-normal">
                  <a
                    href={identity.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#E3532C] transition-colors"
                    data-cursor="pointer"
                  >
                    linkedin.com/in/yemulakarthikeya
                  </a>
                </div>
                <div className="sm:col-span-2 flex justify-start sm:justify-end pt-1 sm:pt-0">
                  <Magnetic strength={0.3}>
                    <a
                      href={identity.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-[#6E6862] hover:text-[#111111] border border-[#D5CCC0] px-2.5 py-1 transition-colors"
                      data-cursor="pointer"
                    >
                      <ScrambleText as="span" duration={0.5} hoverScramble>
                        CONNECT
                      </ScrambleText>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </Magnetic>
                </div>
              </div>

              {/* GitHub */}
              <div className="grid grid-cols-1 sm:grid-cols-12 py-3.5 sm:py-5 gap-2 sm:gap-3 items-center group hover:bg-[#EAE4DC]/50 px-2 -mx-2 transition-colors">
                <div className="sm:col-span-3 font-mono text-[11px] sm:text-xs text-[#6E6862] tracking-wider uppercase font-medium">
                  <ScrambleText chars="editorial" duration={0.5} hoverScramble>
                    GITHUB
                  </ScrambleText>
                </div>
                <div className="sm:col-span-7 font-mono text-xs sm:text-sm text-[#111111] break-all sm:break-normal">
                  <a
                    href={identity.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#E3532C] transition-colors"
                    data-cursor="pointer"
                  >
                    github.com/karthikeya2536
                  </a>
                </div>
                <div className="sm:col-span-2 flex justify-start sm:justify-end pt-1 sm:pt-0">
                  <Magnetic strength={0.3}>
                    <a
                      href={identity.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-[#6E6862] hover:text-[#111111] border border-[#D5CCC0] px-2.5 py-1 transition-colors"
                      data-cursor="pointer"
                    >
                      <ScrambleText as="span" duration={0.5} hoverScramble>
                        FOLLOW
                      </ScrambleText>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </Parallax>

        </div>
      </div>

    </section>
  );
}
