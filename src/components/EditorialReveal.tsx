import React, { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { playPageTurnSound, playTactileClick } from '../lib/audioFeedback';
import { useTheme } from '../context/ThemeContext';

interface EditorialRevealProps {
  children: React.ReactNode;
  chapterNumber?: string;
  chapterTitle?: string;
  theme?: 'dark' | 'cream';
  className?: string;
  id?: string;
}

export const EditorialSectionReveal: React.FC<EditorialRevealProps> = ({
  children,
  chapterNumber,
  chapterTitle,
  theme,
  className = '',
  id,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const { theme: activeGlobalTheme } = useTheme();

  const isDark = (theme ?? activeGlobalTheme) === 'midnight' || theme === 'dark';

  useEffect(() => {
    const container = containerRef.current;
    const mask = maskRef.current;
    const content = contentRef.current;
    const banner = bannerRef.current;

    if (!container || !mask || !content) return;

    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set(mask, {
        scaleY: 1,
        transformOrigin: 'top center',
      });

      gsap.set(content, {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
      });

      // 2. Wipe / Unmask Timeline triggered when scrolling into view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'top 30%',
          scrub: 0.8,
          toggleActions: 'play reverse play reverse',
          onEnter: () => {
            playPageTurnSound(1.1);
            playTactileClick('high');
          },
          onEnterBack: () => {
            playPageTurnSound(0.9);
          },
        },
      });

      // Mask shrinks upwards revealing section like a magazine page turn
      tl.to(mask, {
        scaleY: 0,
        ease: 'power3.inOut',
      }, 0);

      // 3. Staggered reveal of child editorial elements (headings, paragraphs, blockquotes, badges)
      const staggerElements = content.querySelectorAll<HTMLElement>(
        'h1, h2, h3, h4, blockquote, p, [data-reveal-item], .stagger-item'
      );

      if (staggerElements && staggerElements.length > 0) {
        // Collect primary direct editorial content pieces to stagger gracefully
        const elementsArray = Array.from(staggerElements).slice(0, 14);

        gsap.fromTo(
          elementsArray,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Chapter banner reveal if present
      if (banner) {
        gsap.fromTo(
          banner,
          { scaleX: 0, transformOrigin: 'left center', opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 0.6,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* Chapter Transition Wipe Indicator (if provided) */}
      {(chapterNumber || chapterTitle) && (
        <div
          ref={bannerRef}
          className={`w-full border-t border-b py-2 px-6 sm:px-12 flex items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase select-none z-20 relative transition-colors duration-500 ${
            isDark
              ? 'bg-[#111111] dark:bg-[#12100E] border-[#222222] dark:border-[#26231E] text-[#8E8A84] dark:text-[#A0988C]'
              : 'bg-[#EAE4DC] dark:bg-[#1C1A17] border-[#D8D1C5] dark:border-[#26231E] text-[#555555] dark:text-[#A0988C]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E04F2B]" />
            <span className="text-[#E04F2B] font-semibold">{chapterNumber}</span>
            <span>//</span>
            <span>{chapterTitle}</span>
          </div>
          <div className="hidden sm:block text-[8px] tracking-[0.3em] opacity-60">
            FOLIO ARCHIVE · 2026
          </div>
        </div>
      )}

      {/* Section Content Wrapper */}
      <div ref={contentRef} className="w-full relative z-0 will-change-transform">
        {children}
      </div>

      {/* Magazine Editorial Curtain Mask Overlay */}
      <div
        ref={maskRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-30 will-change-transform bg-[#F4EFE6] dark:bg-[#090807] transition-colors duration-500"
        style={{
          borderBottom: '2px solid #E04F2B',
        }}
      />
    </div>
  );
};
