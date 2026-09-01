import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { playCtaHoverThrum } from '../lib/audioFeedback';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorAuraRef = useRef<HTMLDivElement | null>(null);
  const cursorLabelRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [cursorText, setCursorText] = useState<string>('');
  const [cursorMode, setCursorMode] = useState<
    'default' | 'pointer' | 'project' | 'view' | 'cipher' | 'text' | 'magnetic'
  >('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch device
    const touch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(touch);
    if (touch) return;

    const dot = cursorDotRef.current;
    const aura = cursorAuraRef.current;
    const canvas = canvasRef.current;

    if (!dot || !aura) return;

    // GSAP quickTo setters for 120fps tracking
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });
    const setAuraX = gsap.quickTo(aura, 'x', { duration: 0.35, ease: 'power3.out' });
    const setAuraY = gsap.quickTo(aura, 'y', { duration: 0.35, ease: 'power3.out' });

    // isVisible is read by mousemove through a ref so the first move
    // does not flip state and tear down the entire effect (re-attaching
    // every listener, the rAF loop, and the quickTo setters).
    const isVisibleRef = { current: false };

    // Handle canvas size
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle engine (Skiper UI / Vengeance UI subtle trail)
    const ctx = canvas ? canvas.getContext('2d') : null;

    const renderParticles = () => {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const particles = particlesRef.current;

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life++;
          p.alpha = Math.max(0, 1 - p.life / p.maxLife);

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - p.life / (p.maxLife * 1.5)), 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace('ALPHA', p.alpha.toFixed(2));
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#E3532C';
          ctx.fill();
          ctx.restore();

          if (p.life >= p.maxLife) {
            particles.splice(i, 1);
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(renderParticles);
    };

    animFrameRef.current = requestAnimationFrame(renderParticles);

    const spawnParticles = (x: number, y: number, count = 3, burst = false) => {
      const colors = [
        'rgba(227, 83, 44, ALPHA)',
        'rgba(240, 97, 56, ALPHA)',
        'rgba(244, 240, 235, ALPHA)',
      ];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = burst ? Math.random() * 3.5 + 1 : Math.random() * 1.2 + 0.3;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: burst ? Math.random() * 2.5 + 1.5 : Math.random() * 1.8 + 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          life: 0,
          maxLife: burst ? Math.floor(Math.random() * 25 + 20) : Math.floor(Math.random() * 16 + 12),
        });
      }
    };

    let lastMoveTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      const { clientX: x, clientY: y } = e;
      setDotX(x);
      setDotY(y);
      setAuraX(x);
      setAuraY(y);

      // Spawn subtle particle trail on motion
      const now = performance.now();
      if (now - lastMoveTime > 40) {
        spawnParticles(x, y, 1, false);
        lastMoveTime = now;
      }

      // Check hovered element for cursor modes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest(
        '[data-cursor], [data-cursor-text], a, button, [role="button"], input, textarea, img, svg'
      ) as HTMLElement | null;

      if (cursorTarget) {
        const customMode = cursorTarget.getAttribute('data-cursor');
        const customText = cursorTarget.getAttribute('data-cursor-text');

        // The CTA thrum is now fired on the dedicated mouseenter handler
        // below — not on every mousemove. The debounce inside
        // playCtaHoverThrum still prevents overlapping bursts if the
        // user hovers across many CTAs in quick succession.

        // Only display hover text on the portrait image of Karthikeya
        if (customText === 'KARTHIKEYA') {
          setCursorMode('view');
          setCursorText('KARTHIKEYA');
        } else if (
          customMode === 'pointer' ||
          cursorTarget.tagName === 'A' ||
          cursorTarget.tagName === 'BUTTON' ||
          cursorTarget.getAttribute('role') === 'button'
        ) {
          setCursorMode('pointer');
          setCursorText('');
        } else if (customMode === 'text') {
          setCursorMode('text');
          setCursorText('');
        } else if (customMode === 'cipher') {
          setCursorMode('cipher');
          setCursorText('');
        } else {
          setCursorMode('pointer');
          setCursorText('');
        }
      } else {
        setCursorMode('default');
        setCursorText('');
      }
    };

    // Dedicated mouseenter listener for the CTA thrum. Fires once per
    // hover rather than on every mousemove, so a button that the user
    // sweeps the cursor across does not retrigger the sound.
    const handleCtaMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const cursorTarget = target.closest(
        '[data-cursor="project"], [data-cursor="view"], [data-cursor="pointer"], a, button, [role="button"]'
      ) as HTMLElement | null;
      if (cursorTarget) {
        playCtaHoverThrum(1);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      spawnParticles(e.clientX, e.clientY, 8, true);
      gsap.to(aura, {
        scale: 0.8,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMouseUp = () => {
      gsap.to(aura, {
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      if (isVisibleRef.current) {
        isVisibleRef.current = false;
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleCtaMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleCtaMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Particle Canvas Trail (Skiper / Vengeance UI) */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998] transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Central Reticle Dot */}
      <div
        ref={cursorDotRef}
        className={`pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[10000] rounded-full transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          cursorMode === 'project' || cursorMode === 'view'
            ? 'w-1.5 h-1.5 bg-[#E3532C]'
            : cursorMode === 'pointer'
            ? 'w-2 h-2 bg-[#E3532C]'
            : 'w-1.5 h-1.5 bg-[#111111]'
        }`}
      />

      {/* Outer Magnetic Aura / HUD Capsule (Vengeance UI & Skiper UI) */}
      <div
        ref={cursorAuraRef}
        className={`pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[9999] flex items-center justify-center transition-[width,height,background-color,border-color,opacity,border-radius] duration-250 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          cursorText
            ? 'px-4 h-8 bg-[#111111]/90 backdrop-blur-sm border border-[#E3532C] rounded-full shadow-lg'
            : cursorMode === 'cipher'
            ? 'w-10 h-10 border border-dashed border-[#E3532C] bg-[#E3532C]/10 rounded-full animate-spin-slow'
            : cursorMode === 'pointer'
            ? 'w-11 h-11 border border-[#E3532C] bg-[#E3532C]/15 rounded-full'
            : cursorMode === 'text'
            ? 'w-5 h-8 border-l border-r border-[#E3532C] rounded-none bg-transparent'
            : 'w-7 h-7 border border-[#111111]/35 rounded-full bg-[#111111]/5'
        }`}
      >
        {/* Dynamic Label exclusively for portrait image of Karthikeya */}
        {cursorText && (
          <div
            ref={cursorLabelRef}
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full mt-[-6px] flex items-center gap-1.5 text-[9px] font-mono font-semibold tracking-widest text-[#F4F0EB] uppercase select-none whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E3532C] animate-pulse flex-shrink-0" />
            <span>{cursorText}</span>
          </div>
        )}
      </div>
    </>
  );
}
