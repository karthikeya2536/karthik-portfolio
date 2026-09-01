import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { featuredProjects, type FeaturedProject } from '../data/content';
import { ScrambleText } from './TextAnimations';
import { SplitText } from './SplitText';
import { Magnetic } from './Magnetic';
import { Parallax, ParallaxText, TiltCard } from './Parallax';
import { HeadingReveal } from './HeadingReveal';
import { useScrollMotion } from './SmoothScroll';
import MousetrailPreview from './MousetrailPreview';

// Each project gets a unique SVG thumbnail that animates as the user
// hovers. The mapping is by slug so adding new content.ts entries
// automatically extends the visual repertoire.
const IMAGE_TYPE_BY_SLUG: Record<string, 'waveform' | 'mesh' | 'terminal' | 'noise'> = {
  sonicstream: 'waveform',
  edupredict: 'mesh',
  'code-comment-generator': 'terminal',
  'spam-detection': 'noise',
};

export default function SelectedWork() {
  const { velocity } = useScrollMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const visualContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  // Single ref forwarded to the MousetrailPreview so it can listen for
  // row mouseenter/leave events without prop-drilling.
  const listRef = useRef<HTMLDivElement | null>(null);

  // Mirror velocity into a ref so the rAF loop can read the latest value
  // without re-subscribing on every frame. Without this, the effect's
  // `[velocity]` dep tears down and recreates the entire rAF loop on
  // every scroll tick.
  const velocityRef = useRef(velocity);
  useEffect(() => {
    velocityRef.current = velocity;
  }, [velocity]);

  // GSAP Velocity-driven motion blur and kinetic skew on project graphics
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId: number | null = null;
    let currentBlur = 0;
    let currentSkew = 0;

    const applyVelocityMotionBlur = () => {
      const v = velocityRef.current;
      const targetBlur = Math.min(8, Math.abs(v) * 0.45);
      const targetSkew = Math.max(-4, Math.min(4, v * 0.15));

      currentBlur += (targetBlur - currentBlur) * 0.2;
      currentSkew += (targetSkew - currentSkew) * 0.2;

      visualContainersRef.current.forEach((el) => {
        if (el) {
          el.style.filter = currentBlur > 0.1 ? `blur(${currentBlur.toFixed(2)}px)` : 'none';
          el.style.transform = Math.abs(currentSkew) > 0.05 ? `skewY(${currentSkew.toFixed(2)}deg)` : 'none';
        }
      });

      rafId = requestAnimationFrame(applyVelocityMotionBlur);
    };

    rafId = requestAnimationFrame(applyVelocityMotionBlur);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      visualContainersRef.current.forEach((el) => {
        if (el) {
          el.style.filter = 'none';
          el.style.transform = 'none';
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full bg-[#0D0D0D] text-[#F3EFEA] py-14 sm:py-24 border-b border-[#242424] overflow-hidden"
    >
      {/* Background Parallax Marquee */}
      <div className="absolute top-1/3 -translate-y-1/2 inset-x-0 opacity-[0.04] pointer-events-none select-none z-0">
        <ParallaxText
          baseVelocity={0.6}
          direction="right"
          scrollScrubMultiplier={0.8}
          className="w-full"
          textClassName="font-serif text-[6rem] sm:text-[10rem] lg:text-[12rem] font-bold text-[#F3EFEA] tracking-tighter"
        >
          SELECTED WORK • SONICSTREAM • EDUPREDICT • CODE COMMENT GENERATOR • SPAM DETECTION •
        </ParallaxText>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <HeadingReveal>
          <Parallax speed={-0.08}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start pb-8 sm:pb-12 border-b border-[#242424]">
              <div className="md:col-span-6 space-y-2">
                <span className="font-mono text-xs text-[#E3532C] tracking-wider font-semibold">
                  <ScrambleText duration={0.8} hoverScramble>
                    ( 04 )
                  </ScrambleText>
                </span>
                <div className="space-y-1" data-cursor="text">
                  <div className="overflow-visible">
                    <SplitText
                      as="h2"
                      mode="chars"
                      stagger={0.03}
                      duration={0.9}
                      delay={0.1}
                      className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#F3EFEA]"
                      charClassName="hover:text-[#E3532C] transition-colors duration-200"
                    >
                      Selected
                    </SplitText>
                  </div>
                  <div className="overflow-visible">
                    <SplitText
                      as="h2"
                      mode="chars"
                      stagger={0.035}
                      duration={0.9}
                      delay={0.25}
                      className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#F3EFEA]"
                      charClassName="hover:text-[#E3532C] transition-colors duration-200"
                    >
                      Work
                    </SplitText>
                  </div>
                </div>
              </div>

              <div className="md:col-span-6 md:pt-8 flex md:justify-end">
                <p className="max-w-md text-xs sm:text-base text-[#8E8A84] font-sans font-light leading-relaxed">
                  Three shipped systems. Hover a row to preview the UI, click to read
                  the full case study.
                </p>
              </div>
            </div>
          </Parallax>
        </HeadingReveal>

        {/* Project list — cards keep their original look; the
            MousetrailPreview listens to mouseover on this container and
            floats a preview image alongside the cursor. */}
        <div ref={listRef} className="divide-y divide-[#242424]">
            {featuredProjects.map((project, idx) => {
              const imageType = IMAGE_TYPE_BY_SLUG[project.slug] ?? 'waveform';
              const repoHref = project.links[0]?.href;

              return (
                <Link
                  to={`/work/${project.slug}`}
                  data-cursor="pointer"
                  data-trail-row
                  data-trail-index={idx}
                  className="group py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center cursor-pointer transition-all duration-300 hover:bg-[#141414] px-3 sm:px-4 -mx-3 sm:-mx-4"
                >
                    {/* Number & Titles */}
                    <div className="lg:col-span-6 space-y-1.5 sm:space-y-2">
                      <div className="font-mono text-xs text-[#E3532C] tracking-widest font-semibold flex items-center gap-2">
                        <Magnetic strength={0.4}>
                          <span className="inline-block">
                            <ScrambleText chars="numbers" duration={0.6} delay={idx * 0.15} hoverScramble>
                              {project.num}
                            </ScrambleText>
                          </span>
                        </Magnetic>
                        <span className="text-[#666]">·</span>
                        <span className="text-[#8E8A84] font-medium">{project.year}</span>
                        {repoHref && (
                          <>
                            <span className="text-[#666]">·</span>
                            <a
                              href={repoHref}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[#8E8A84] hover:text-[#E3532C] transition-colors"
                              data-cursor="pointer"
                            >
                              GitHub ↗
                            </a>
                          </>
                        )}
                      </div>
                      <SplitText
                        as="h3"
                        mode="chars"
                        className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F3EFEA] group-hover:text-[#F4F0EB] transition-colors"
                        yOffset="0%"
                        rotateX={0}
                        blur={false}
                      >
                        {project.name}
                      </SplitText>
                      <p className="font-mono text-[10px] sm:text-xs text-[#8E8A84] tracking-wider uppercase">
                        <ScrambleText chars="editorial" duration={0.9} delay={0.2 + idx * 0.15} hoverScramble>
                          {project.summary}
                        </ScrambleText>
                      </p>
                      <p className="text-xs sm:text-sm text-[#C4B5A5] font-sans font-light leading-relaxed max-w-xl">
                        {project.metric}
                      </p>
                      <div className="pt-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#8E8A84] group-hover:text-[#E3532C] transition-colors flex items-center gap-1.5">
                        <span>View case study</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Generative Visual Thumbnail */}
                    <div className="lg:col-span-5 w-full">
                      <TiltCard maxTilt={10} perspective={600} glare={true}>
                        <div
                          ref={(el) => {
                            visualContainersRef.current[idx] = el;
                          }}
                          className="relative h-24 sm:h-28 w-full max-w-full lg:max-w-sm rounded-none border border-[#2A2A2A] bg-[#080808] overflow-hidden group-hover:border-[#444444] transition-colors duration-300 will-change-transform"
                        >
                          {imageType === 'waveform' && (
                            <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-r from-[#0D0D0D] via-[#1A1210] to-[#0D0D0D]">
                              <svg className="w-full h-full opacity-85" viewBox="0 0 300 100" preserveAspectRatio="none">
                                <path
                                  d="M0,50 Q40,48 70,50 T120,49 T150,52 T180,48 T220,10 T250,90 T280,30 T300,50"
                                  fill="none"
                                  stroke="#E3532C"
                                  strokeWidth="1.5"
                                />
                                {[...Array(16)].map((_, i) => (
                                  <line
                                    key={i}
                                    x1="180"
                                    y1="50"
                                    x2={220 + (i % 5) * 18}
                                    y2={15 + i * 5}
                                    stroke={i % 2 === 0 ? '#E3532C' : '#888888'}
                                    strokeWidth="0.8"
                                    strokeOpacity={0.6}
                                  />
                                ))}
                                <circle cx="180" cy="50" r="3" fill="#E3532C" />
                                <circle cx="240" cy="30" r="2" fill="#F3EFEA" />
                                <circle cx="270" cy="70" r="2" fill="#E3532C" />
                              </svg>
                            </div>
                          )}

                          {imageType === 'mesh' && (
                            <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-r from-[#111111] via-[#1C1C1C] to-[#111111]">
                              <svg className="w-full h-full opacity-75" viewBox="0 0 300 100" preserveAspectRatio="none">
                                <defs>
                                  <pattern id={`meshGrid-${idx}`} width="12" height="12" patternUnits="userSpaceOnUse">
                                    <path d="M 12 0 L 0 0 0 12" fill="none" stroke="#666666" strokeWidth="0.5" />
                                  </pattern>
                                </defs>
                                <rect width="300" height="100" fill={`url(#meshGrid-${idx})`} />
                                <path
                                  d="M20,70 C80,20 120,90 180,35 C240,-10 280,60 300,50"
                                  fill="none"
                                  stroke="#E3532C"
                                  strokeWidth="1.5"
                                />
                                <path
                                  d="M0,80 C60,40 140,85 200,45 C260,10 280,75 300,65"
                                  fill="none"
                                  stroke="#EFEAE3"
                                  strokeWidth="1"
                                  strokeDasharray="2 3"
                                />
                              </svg>
                            </div>
                          )}

                          {imageType === 'terminal' && (
                            <div className="w-full h-full bg-[#080808] p-2.5 font-mono text-[9px] text-[#888888] leading-tight overflow-hidden select-none">
                              <div className="text-[#E3532C]">def generate_docstring(ast_tree: AST) -&gt; str:</div>
                              <div className="pl-2 text-[#666666]">"""Synthesizes PEP-257 documentation via 4-bit Llama-2."""</div>
                              <div className="pl-2 text-[#999999]">params = extract_type_hints(ast_tree.args)</div>
                              <div className="pl-2 text-[#E3532C]">return quantized_llm.generate(prompt=params)</div>
                            </div>
                          )}

                          {imageType === 'noise' && (
                            <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-r from-[#0A0A0A] via-[#14110E] to-[#0A0A0A]">
                              <svg className="w-full h-full opacity-90" viewBox="0 0 300 100" preserveAspectRatio="none">
                                <defs>
                                  <pattern id={`spamDots-${idx}`} width="6" height="6" patternUnits="userSpaceOnUse">
                                    <circle cx="1" cy="1" r="0.7" fill="#E3532C" fillOpacity="0.55" />
                                  </pattern>
                                </defs>
                                <rect width="300" height="100" fill={`url(#spamDots-${idx})`} />
                                {/* Inbox / envelope silhouette */}
                                <g transform="translate(0,0)">
                                  <rect x="105" y="32" width="90" height="44" fill="none" stroke="#E3532C" strokeWidth="1.4" />
                                  <polyline points="105,32 150,60 195,32" fill="none" stroke="#E3532C" strokeWidth="1.2" />
                                  <line x1="40" y1="84" x2="260" y2="84" stroke="#444" strokeWidth="0.5" />
                                  <line x1="40" y1="92" x2="220" y2="92" stroke="#333" strokeWidth="0.5" />
                                </g>
                              </svg>
                            </div>
                          )}
                        </div>
                      </TiltCard>
                    </div>

                    {/* Arrow Action */}
                    <div className="lg:col-span-1 flex justify-end">
                      <Magnetic strength={0.45}>
                        <div className="w-10 h-10 flex items-center justify-center text-[#8E8A84] group-hover:text-[#E3532C] group-hover:translate-x-1 transition-all">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </Magnetic>
                    </div>
                  </Link>
              );
            })}
        </div>
      </div>

      {/* Floating mousetrail preview — listens to row hover events
          from the list above. Pointer-events: none so it never blocks
          the underlying cards. */}
      <MousetrailPreview
        images={featuredProjects.map((p) => ({
          id: Number(p.num),
          src: p.image.src,
          alt: p.name,
        }))}
        containerRef={listRef}
      />
    </section>
  );
}
