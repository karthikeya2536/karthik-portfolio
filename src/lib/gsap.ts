import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const SCRAMBLE_CHARS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  numbers: '0123456789',
  telemetry: '0123456789!<>-_/[]{}—=+*^?#',
  editorial: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  symbols: '░▒▓█<>/_—-+*^![]{}#',
};

export interface ScrambleOptions {
  chars?: string;
  duration?: number;
  speed?: number;
  delay?: number;
  ease?: string;
  onComplete?: () => void;
}

/**
 * Animates a text element with a cipher/scramble decoding effect
 */
export function scrambleText(
  el: HTMLElement,
  targetText?: string,
  options: ScrambleOptions = {}
): gsap.core.Tween {
  const text = targetText !== undefined ? targetText : el.innerText;
  const chars = options.chars || SCRAMBLE_CHARS.telemetry;
  const duration = options.duration ?? 0.9;
  const delay = options.delay ?? 0;

  const length = text.length;
  const state = { progress: 0 };

  return gsap.to(state, {
    progress: 1,
    duration,
    delay,
    ease: options.ease || 'power2.out',
    onUpdate: () => {
      const p = state.progress;
      const resolvedCount = Math.floor(p * length);
      let output = '';

      for (let i = 0; i < length; i++) {
        const char = text[i];
        if (char === ' ' || char === '\n') {
          output += char;
        } else if (i < resolvedCount) {
          output += char;
        } else {
          // In the scrambling wave region
          const randomChar = chars[Math.floor(Math.random() * chars.length)];
          output += randomChar;
        }
      }
      el.innerText = output;
    },
    onComplete: () => {
      el.innerText = text;
      if (options.onComplete) {
        options.onComplete();
      }
    },
  });
}

/**
 * Creates a ScrollTrigger-bound text scramble
 */
export function attachScrollScramble(
  el: HTMLElement,
  options: ScrambleOptions & {
    trigger?: HTMLElement | string;
    start?: string;
    once?: boolean;
  } = {}
) {
  const originalText = el.getAttribute('data-original-text') || el.innerText;
  el.setAttribute('data-original-text', originalText);

  return ScrollTrigger.create({
    trigger: options.trigger || el,
    start: options.start || 'top 88%',
    once: options.once ?? true,
    onEnter: () => {
      scrambleText(el, originalText, options);
    },
  });
}

export { gsap, ScrollTrigger };

