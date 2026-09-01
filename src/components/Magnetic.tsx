import React, { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { playCtaHoverThrum } from '../lib/audioFeedback';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0.1 to 1.0 (default: 0.35)
  ease?: string;
  active?: boolean;
  key?: React.Key;
  staggerScale?: boolean;
}

export function Magnetic({
  children,
  className = '',
  strength = 0.35,
  ease = 'power2.out',
  active = true,
  staggerScale = true,
}: MagneticProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !active) return;

    // Check if device supports fine pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease });

    const getScaleTargets = () => {
      // Find elements to stagger scale.
      if (el.children.length > 1) {
        // If the wrapper itself has multiple children (e.g. icon + text), stagger those.
        return Array.from(el.children);
      } else if (el.children.length === 1 && el.children[0].children.length > 0) {
        // If there's a single wrapper (like a button) with multiple children inside, stagger those.
        return Array.from(el.children[0].children);
      }
      // Otherwise, scale the whole element.
      return el;
    };

    const handleMouseEnter = () => {
      playCtaHoverThrum(0.85);
      
      if (staggerScale) {
        gsap.to(getScaleTargets(), {
          scale: 1.04,
          duration: 0.4,
          stagger: 0.04,
          ease: 'back.out(2)',
          overwrite: 'auto'
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      xTo(deltaX);
      yTo(deltaY);
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
      
      if (staggerScale) {
        gsap.to(getScaleTargets(), {
          scale: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, ease, active, staggerScale]);

  return (
    <div ref={containerRef} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
}

export default Magnetic;
