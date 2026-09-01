import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

export interface SplitTextProps {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  mode?: 'words' | 'chars' | 'lines';
  className?: string;
  wordClassName?: string;
  charClassName?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  scrollStart?: string;
  triggerOnce?: boolean;
  animateOnHover?: boolean;
  accentIndices?: number[];
  accentClassName?: string;
  highlightWord?: string;
  highlightClassName?: string;
  yOffset?: number | string;
  rotateX?: number;
  blur?: boolean;
  id?: string;
  scrollParallax?: boolean;
  /** Optional className applied to the inner inline-flex wrapper that holds
   *  the split chars. Use this to make the wrapper fill its parent
   *  (`w-full`) so chars wrap correctly inside narrow flex containers. */
  innerClassName?: string;
}

export function SplitText({
  children,
  as: Component = 'div',
  mode = 'words',
  className = '',
  wordClassName = '',
  charClassName = '',
  innerClassName = '',
  stagger = 0.04,
  duration = 0.85,
  delay = 0,
  ease = 'power3.out',
  scrollStart = 'top 85%',
  triggerOnce = true,
  animateOnHover = false,
  accentIndices = [],
  accentClassName = 'text-[#E3532C]',
  highlightWord,
  highlightClassName = 'text-[#E3532C] italic',
  yOffset = '100%',
  rotateX = 25,
  blur = true,
  id,
  scrollParallax = false,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = elementsRef.current.filter(Boolean);
    if (!targets.length) return;

    // Set initial GSAP state — only opacity (no Y/rotateX/blur float)
    gsap.set(targets, {
      opacity: 0,
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: scrollStart,
      once: triggerOnce,
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          duration,
          delay,
          stagger,
          ease,
          overwrite: 'auto',
        });
      },
    });

    return () => {
      trigger.kill();
      // Clean up parallax scrub triggers if they exist
      targets.forEach((target) => {
        ScrollTrigger.getById(`parallax-${target.id}`)?.kill();
      });
    };
  }, [children, mode, stagger, duration, delay, ease, scrollStart, triggerOnce, yOffset, rotateX, blur, scrollParallax]);

  const handleMouseEnter = () => {
    if (!animateOnHover) return;
    const targets = elementsRef.current.filter(Boolean);
    if (!targets.length) return;

    gsap.fromTo(
      targets,
      {
        opacity: 0.4,
      },
      {
        opacity: 1,
        duration: 0.5,
        stagger: 0.02,
        ease: 'power2.out',
        overwrite: 'auto',
      }
    );
  };

  // Split logic based on mode
  elementsRef.current = [];

  const renderContent = () => {
    if (mode === 'chars') {
      const chars = Array.from(children);
      return (
        <span className={`inline-flex flex-wrap ${innerClassName}`} style={{ perspective: '1000px' }}>
          {chars.map((char, index) => {
            const isAccent = accentIndices.includes(index);
            const isSpace = char === ' ';

            if (isSpace) {
              return (
                <span key={index} className="inline-block">
                  {' '}
                </span>
              );
            }

            return (
              <span
                key={index}
                className="inline-block overflow-visible align-baseline"
                style={{ paddingTop: '0.12em', paddingBottom: '0.12em', marginTop: '-0.12em', marginBottom: '-0.12em' }}
              >
                <span
                  ref={(el) => {
                    if (el) elementsRef.current[index] = el;
                  }}
                  className={`inline-block overflow-visible will-change-transform ${charClassName} ${
                    isAccent ? accentClassName : ''
                  }`}
                >
                  {char}
                </span>
              </span>
            );
          })}
        </span>
      );
    }

    // Default: 'words' mode
    const words = children.split(' ');
    return (
      <span className="inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.1em]" style={{ perspective: '1000px' }}>
        {words.map((word, wordIndex) => {
          const isAccent = accentIndices.includes(wordIndex);
          const isHighlight =
            highlightWord &&
            word.toLowerCase().replace(/[^a-z0-9]/gi, '') ===
              highlightWord.toLowerCase().replace(/[^a-z0-9]/gi, '');

          return (
            <span
              key={wordIndex}
              className={`inline-block overflow-visible align-top ${wordClassName}`}
              style={{ paddingBottom: '0.1em', paddingTop: '0.02em' }}
            >
              <span
                ref={(el) => {
                  if (el) elementsRef.current[wordIndex] = el;
                }}
                className={`inline-block will-change-transform ${
                  isHighlight ? highlightClassName : isAccent ? accentClassName : ''
                }`}
              >
                {word}
              </span>
            </span>
          );
        })}
      </span>
    );
  };

  const CustomTag = Component as any;

  return (
    <CustomTag
      ref={containerRef}
      id={id}
      className={className}
      onMouseEnter={handleMouseEnter}
    >
      {renderContent()}
    </CustomTag>
  );
}

export default SplitText;
