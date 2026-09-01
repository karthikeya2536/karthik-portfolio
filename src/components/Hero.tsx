import { ASSETS } from '../data/assets';
import { hero, capabilities } from '../data/content';
import { ScrambleText } from './TextAnimations';
import { Magnetic } from './Magnetic';
import { TiltCard } from './Parallax';
import { useScrollMotion } from './SmoothScroll';
import { playPageTurnSound, playTactileClick } from '../lib/audioFeedback';
import { playPop } from '../utils/sound';

export default function Hero() {
  const { scrollTo } = useScrollMotion();

  const scrollToWork = () => {
    playPop();
    playPageTurnSound(1.2);
    playTactileClick('high');
    const el = document.getElementById('work');
    if (el) {
      scrollTo(el, { offset: -20 });
    }
  };

  // Splits the last line into word and trailing punctuation so we can italicise
  // the words while keeping the period upright (rendered separately for
  // typographic balance).
  const renderHeadline = () => {
    return hero.headlineLines.map((line, i) => {
      const isLast = i === hero.headlineLines.length - 1;
      return (
        <h1
          key={line}
          className={`font-['Instrument_Serif',serif] ${
            isLast ? 'italic' : ''
          } text-[1.65rem] xs:text-[2.2rem] sm:text-[4.4rem] md:text-[5.6rem] lg:text-[6.8rem] xl:text-[8.2rem] 2xl:text-[9.2rem] leading-[1.08] xs:leading-[1.02] sm:leading-[0.92] lg:leading-[0.88] tracking-[-0.03em] font-normal text-[#111111] dark:text-[#F4EFE6] transition-colors duration-500 break-words`}
        >
          {line}
          {isLast && (
            <span className="inline-block w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full bg-[#E04F2B] ml-2 sm:ml-4 align-middle flex-shrink-0 shadow-xs" />
          )}
        </h1>
      );
    });
  };

  return (
    <section className="relative w-full bg-[#F4EFE6] dark:bg-[#090807] text-[#111111] dark:text-[#F4EFE6] transition-colors duration-500 pt-4 sm:pt-6 pb-6 sm:pb-8 min-h-[calc(100dvh-58px)] lg:min-h-[calc(100vh-58px)] flex flex-col justify-between overflow-x-hidden">
      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-20 flex-1 flex flex-col justify-between">

        {/* Mobile Header Metadata Annotation (Visible on small screens) */}
        <div className="flex sm:hidden items-center justify-between border-b border-[#111111]/15 dark:border-[#F4EFE6]/15 pb-2.5 mb-3 font-mono text-[10px] tracking-[0.18em] text-[#555555] dark:text-[#A0988C] uppercase">
          <div className="flex items-center gap-1.5 text-[#E04F2B] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E04F2B] animate-pulse" />
            <ScrambleText duration={0.8} delay={0.1} hoverScramble>
              {hero.metaLeft[0]}
            </ScrambleText>
          </div>
          <ScrambleText duration={0.8} delay={0.2} hoverScramble>
            {hero.metaRight[0]}
          </ScrambleText>
        </div>

        {/* Main Section Grid: 2 columns on mobile (text left, photo right).
            Expands to 12-col editorial split on lg+. */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-10 items-center pt-2 sm:pt-4 flex-1">

          {/* Left Column: Headline + positioning line.
              On mobile, takes the left ~65% of the width. On lg+, takes 7/12. */}
          <div className="col-span-1 lg:col-span-7 xl:col-span-8 flex items-start gap-0 sm:gap-4 lg:gap-10 w-full min-w-0">

            {/* Vertical Left Typography Annotation (Desktop/Tablet only).
                The wrapper is intentionally narrow (w-10) so it doesn't
                reserve the rotated text's full pre-rotation width — that
                would push the headline ~264px to the right. `overflow-visible`
                keeps the rotated text itself visible past the wrapper bounds.

                After the -90deg rotation, font size controls the visible
                thickness of the rotated glyphs (perpendicular to the
                reading direction) and letter-spacing widens their visual
                rhythm. Both are tuned slightly larger than the original
                so the rotated text reads clearly without feeling heavy. */}
            <div className="hidden sm:flex w-10 flex-col items-start justify-start pt-24 lg:pt-32 select-none flex-shrink-0 overflow-visible">
              <div className="transform -rotate-90 origin-bottom-left translate-y-48 lg:translate-y-56 whitespace-nowrap flex flex-col font-mono text-[11px] sm:text-[13px] tracking-[0.32em] text-[#555555] dark:text-[#A0988C] uppercase leading-relaxed">
                {hero.metaLeft.map((line, i) => (
                  <span key={i}>
                    <ScrambleText duration={0.8} delay={0.2 + i * 0.1} hoverScramble>
                      {line}
                    </ScrambleText>
                  </span>
                ))}
              </div>
            </div>

            {/* Main Headline + positioning line */}
            <div className="space-y-0 max-w-full lg:max-w-4xl pt-2 sm:pt-4 pb-1 select-none w-full min-w-0" data-cursor="text">
              {renderHeadline()}

              {/* Positioning line — generous top margin so it doesn't overlap
                  the last headline line at any width. */}
              <p className="pt-4 sm:pt-6 max-w-2xl text-[11px] xs:text-xs sm:text-sm text-[#555] dark:text-[#A0988C] font-sans font-light leading-relaxed">
                {hero.positioning}
              </p>
            </div>

          </div>

          {/* Right Column: portrait. On mobile takes the right ~30%, photo
              sized down. On lg+ takes 5/12. */}
          <div className="col-span-1 lg:col-span-5 xl:col-span-4 flex flex-col items-end justify-center h-full pt-0 w-full">

            {/* Editorial Vertical Photograph Container */}
            <div className="relative w-auto flex flex-col items-end select-none">
              <TiltCard maxTilt={5} perspective={1000} glare={true}>
                <Magnetic strength={0.12}>
                  <div
                    className="relative cursor-pointer group w-full"
                    data-cursor="view"
                    data-cursor-text="KARTHIKEYA"
                  >
                    {/* Photo container — width widened at each breakpoint
                        while height is held constant. The portrait is
                        already taller than wide (3:4 aspect on mobile)
                        so widening without increasing height crops the
                        sides via `object-cover` rather than distorting. */}
                    <div className="relative w-full aspect-[3/4] sm:aspect-auto sm:w-[400px] md:w-[480px] lg:w-[520px] xl:w-[600px] sm:h-[420px] md:h-[460px] lg:h-[490px] xl:h-[530px] overflow-hidden bg-[#E2DBD2] dark:bg-[#1C1A17] border border-[#111111]/20 dark:border-[#F4EFE6]/20 shadow-xl rounded-[2px] transition-colors duration-500">
                      <img
                        src={ASSETS.heroPortrait}
                        alt="Yemula Karthikeya"
                        className="w-full h-full object-cover object-center grayscale contrast-115 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out origin-top-right"
                        referrerPolicy="no-referrer"
                      />

                      {/* Subtle editorial index badge */}
                      <div className="absolute top-1.5 sm:top-3 left-1.5 sm:left-3 bg-[#111111]/85 dark:bg-[#090807]/90 backdrop-blur-xs px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[7px] sm:text-[9px] font-mono text-[#F4F0EB] tracking-wider border border-white/10">
                        <ScrambleText chars="telemetry" duration={0.6} hoverScramble>
                          FIG. 01 / WORKSPACE
                        </ScrambleText>
                      </div>

                      {/* Corner hairline coordinates */}
                      <div className="absolute bottom-1.5 sm:bottom-3 right-1.5 sm:right-3 text-[7px] sm:text-[9px] font-mono text-[#F4F0EB]/95 bg-black/60 backdrop-blur-xs px-1.5 sm:px-2 py-0.5 sm:py-1 tracking-wider border border-white/10">
                        17.4021° N · 78.4772° E
                      </div>
                    </div>
                  </div>
                </Magnetic>
              </TiltCard>
            </div>

          </div>
        </div>

        {/* Bottom Horizontal Meta Bar: SCROLL on left followed by focus items */}
        <div className="pt-4 pb-1 mt-6 lg:mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 lg:gap-8 w-full select-none border-t border-[#111111]/15 dark:border-[#F4EFE6]/15 transition-colors duration-500">

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
            {/* Scroll Down Trigger (Left aligned) */}
            <Magnetic strength={0.3}>
              <button
                onClick={scrollToWork}
                className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-[#F4EFE6] dark:text-[#090807] bg-[#111111] dark:bg-[#F4EFE6] px-3.5 py-1.5 rounded-full sm:bg-transparent sm:dark:bg-transparent sm:text-[#111111] sm:dark:text-[#F4EFE6] hover:text-[#E04F2B] dark:hover:text-[#E04F2B] transition-colors cursor-pointer group flex-shrink-0"
                data-cursor="pointer"
              >
                <ScrambleText as="span" className="text-[10px] sm:text-[11px] font-semibold text-[#F4EFE6] dark:text-[#090807] sm:text-[#111111] sm:dark:text-[#F4EFE6] group-hover:text-[#E04F2B] dark:group-hover:text-[#E04F2B]" duration={0.5} hoverScramble>
                  {hero.metaRight[1] ?? 'SCROLL'}
                </ScrambleText>
                <span className="text-xs font-sans font-light group-hover:translate-y-0.5 transition-transform">
                  ↓
                </span>
              </button>
            </Magnetic>

            <span className="text-[#999999] dark:text-[#777777] hidden sm:inline">/</span>

            <span className="sm:hidden font-mono text-[9px] text-[#E04F2B] tracking-widest font-semibold uppercase">
              PORTFOLIO 2026
            </span>
          </div>

          {/* Focus items — rendered from `capabilities` */}
          <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-4 gap-y-1 font-mono text-[9px] sm:text-[11px] text-[#444444] dark:text-[#A0988C] tracking-[0.12em] sm:tracking-[0.16em] uppercase transition-colors duration-500">
            <ScrambleText as="span" className="font-semibold text-[#111111] dark:text-[#F4EFE6]" duration={0.6} hoverScramble>
              FOCUS:
            </ScrambleText>
            {capabilities.map((cap, i, arr) => (
              <span key={cap} className="contents">
                <ScrambleText
                  as="span"
                  className="hover:text-[#111111] dark:hover:text-[#F4EFE6] transition-colors cursor-pointer"
                  duration={0.6}
                  hoverScramble
                >
                  {cap.toUpperCase()}
                </ScrambleText>
                {i < arr.length - 1 && (
                  <span className="text-[#888888] dark:text-[#555555]">·</span>
                )}
              </span>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
