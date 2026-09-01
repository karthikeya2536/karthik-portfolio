import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // negative moves slower/reverse, positive moves faster (e.g. -0.2 to 0.5)
  rotate?: number; // degrees to rotate during scroll
  scale?: number; // scale factor to reach
  opacity?: [number, number]; // [startOpacity, endOpacity]
  className?: string;
  horizontal?: boolean;
  ease?: string;
  id?: string;
  key?: React.Key;
}

/**
 * Parallax wrapper that animates transforms tied to scroll position
 */
export function Parallax({
  children,
  speed = 0.2,
  rotate = 0,
  scale = 1,
  opacity,
  className = '',
  horizontal = false,
  ease = 'none',
  id,
}: ParallaxProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const distance = speed * 250;

    const vars: gsap.TweenVars = {
      ease,
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    };

    if (horizontal) {
      vars.x = distance;
    } else {
      vars.y = distance;
    }

    if (rotate !== 0) {
      vars.rotation = rotate;
    }

    if (scale !== 1) {
      vars.scale = scale;
    }

    if (opacity) {
      vars.opacity = opacity[1];
      gsap.set(el, { opacity: opacity[0] });
    }

    const tween = gsap.to(el, vars);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, rotate, scale, opacity, horizontal, ease]);

  return (
    <div ref={targetRef} id={id} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

interface ParallaxTextProps {
  children: string;
  baseVelocity?: number;
  direction?: 'left' | 'right';
  className?: string;
  textClassName?: string;
  scrollScrubMultiplier?: number;
  repeatCount?: number;
}

/**
 * Editorial Large Floating Parallax Typography Banner that reacts dynamically to scroll velocity
 */
export function ParallaxText({
  children,
  baseVelocity = 1,
  direction = 'left',
  className = '',
  textClassName = '',
  scrollScrubMultiplier = 0.4,
  repeatCount = 4,
}: ParallaxTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    let xPos = 0;
    const dir = direction === 'left' ? -1 : 1;
    let scrollVelocity = 0;

    // ScrollTrigger to calculate scroll velocity & scrub
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        scrollVelocity = self.getVelocity() / 300;
      },
    });

    let animationFrameId: number;

    const render = () => {
      const delta = (baseVelocity * dir) + (scrollVelocity * scrollScrubMultiplier * dir);
      xPos += delta;

      // Wrap around seamlessly
      const trackWidth = track.scrollWidth / repeatCount;
      if (Math.abs(xPos) >= trackWidth) {
        xPos = 0;
      }

      track.style.transform = `translate3d(${xPos}px, 0, 0)`;

      // Decay scroll velocity smoothly
      scrollVelocity *= 0.92;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      trigger.kill();
    };
  }, [baseVelocity, direction, scrollScrubMultiplier, repeatCount]);

  const items = Array.from({ length: repeatCount }, (_, i) => i);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap select-none pointer-events-none ${className}`}
    >
      <div ref={trackRef} className="inline-flex will-change-transform">
        {items.map((idx) => (
          <span key={idx} className={`inline-block mx-4 ${textClassName}`}>
            {children}
          </span>
        ))}
      </div>
    </div>
  );
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
}

/**
 * 3D Perspective Card Tilt on Mouse Move with subtle specular lighting
 */
export function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  glare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glareEl = glareRef.current;
    if (!card) return;

    let xTo = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power2.out' });
    let yTo = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power2.out' });
    let scaleTo = gsap.quickTo(card, 'scale', { duration: 0.3, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * maxTilt;
      const rotateX = -((y - centerY) / centerY) * maxTilt;

      xTo(rotateY);
      yTo(rotateX);
      scaleTo(scale);

      if (glareEl) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glareEl.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, transparent 65%)`;
        glareEl.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      scaleTo(1);
      if (glareEl) {
        glareEl.style.opacity = '0';
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, scale]);

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className="inline-block w-full"
    >
      <div
        ref={cardRef}
        className={`relative will-change-transform transform-gpu ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 opacity-0 z-20"
          />
        )}
      </div>
    </div>
  );
}

interface ScrollScrubWordsProps {
  text: string;
  className?: string;
  activeColor?: string;
  inactiveColor?: string;
  id?: string;
}

/**
 * Editorial Reading Stream: words illuminate from dim to high-contrast as you scroll
 */
export function ScrollScrubWords({
  text,
  className = '',
  activeColor = 'text-[#F3EFEA]',
  inactiveColor = 'text-[#333333]',
  id,
}: ScrollScrubWordsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const words = text.split(' ');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = wordsRef.current.filter(Boolean);
    if (!spans.length) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      end: 'bottom 40%',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const total = spans.length;
        const activeIndex = Math.floor(progress * total);

        spans.forEach((span, idx) => {
          if (idx <= activeIndex) {
            span.style.opacity = '1';
            span.style.filter = 'blur(0px)';
            span.style.transform = 'translateY(0px)';
          } else {
            const dist = idx - activeIndex;
            const op = Math.max(0.2, 1 - dist * 0.15);
            span.style.opacity = `${op}`;
            span.style.filter = dist > 2 ? 'blur(1px)' : 'none';
          }
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [text]);

  return (
    <div ref={containerRef} id={id} className={`flex flex-wrap gap-x-[0.3em] gap-y-[0.1em] ${className}`}>
      {words.map((word, idx) => (
        <span
          key={idx}
          ref={(el) => {
            if (el) wordsRef.current[idx] = el;
          }}
          className={`inline-block transition-colors duration-150 will-change-transform ${activeColor}`}
          style={{ opacity: 0.25, transition: 'opacity 0.2s ease, filter 0.2s ease' }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
