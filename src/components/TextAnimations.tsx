import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, scrambleText, SCRAMBLE_CHARS } from '../lib/gsap';

interface ScrambleTextProps {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  duration?: number;
  delay?: number;
  chars?: keyof typeof SCRAMBLE_CHARS | string;
  triggerOnScroll?: boolean;
  scrollStart?: string;
  hoverScramble?: boolean;
  id?: string;
}

export function ScrambleText({
  children,
  as: Component = 'span',
  className = '',
  duration = 0.8,
  delay = 0,
  chars = 'telemetry',
  triggerOnScroll = true,
  scrollStart = 'top 90%',
  hoverScramble = false,
  id,
}: ScrambleTextProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const originalText = useRef<string>(children);

  useEffect(() => {
    originalText.current = children;
  }, [children]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const charSet = typeof chars === 'string' && chars in SCRAMBLE_CHARS 
      ? SCRAMBLE_CHARS[chars as keyof typeof SCRAMBLE_CHARS]
      : (chars || SCRAMBLE_CHARS.telemetry);

    if (triggerOnScroll) {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: scrollStart,
        once: true,
        onEnter: () => {
          scrambleText(el, originalText.current, {
            duration,
            delay,
            chars: charSet,
          });
        },
      });

      return () => {
        trigger.kill();
      };
    }
  }, [children, duration, delay, chars, triggerOnScroll, scrollStart]);

  const handleMouseEnter = () => {
    if (!hoverScramble || !elementRef.current) return;
    const charSet = typeof chars === 'string' && chars in SCRAMBLE_CHARS 
      ? SCRAMBLE_CHARS[chars as keyof typeof SCRAMBLE_CHARS]
      : (chars || SCRAMBLE_CHARS.telemetry);

    scrambleText(elementRef.current, originalText.current, {
      duration: 0.5,
      chars: charSet,
    });
  };

  const CustomTag = Component as any;

  return (
    <CustomTag
      ref={elementRef}
      id={id}
      className={className}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </CustomTag>
  );
}

interface MaskedRevealProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  delay?: number;
  duration?: number;
  scrollStart?: string;
  yOffset?: string;
}

export function MaskedReveal({
  children,
  className = '',
  innerClassName = '',
  delay = 0,
  duration = 1.1,
  scrollStart = 'top 88%',
  yOffset = '105%',
}: MaskedRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    gsap.set(inner, { y: yOffset, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: scrollStart,
      once: true,
      onEnter: () => {
        gsap.to(inner, {
          y: '0%',
          opacity: 1,
          duration,
          delay,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay, duration, scrollStart, yOffset]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className={`will-change-transform ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
