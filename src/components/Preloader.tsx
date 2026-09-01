import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playPageTurnSound, playTactileClick } from '../lib/audioFeedback';

interface PreloaderProps {
  onComplete: () => void;
}

const NUM_COLUMNS = 5;

const FIRST_NAME = "YEMULA";
const LAST_NAME = "KARTHIKEYA";

export function Preloader({ onComplete }: PreloaderProps) {
  const [counter, setCounter] = useState(0);
  const [isEnding, setIsEnding] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Track the exit timeout so we can clear it in the cleanup if the
  // component unmounts before it fires.
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Precision Counter Engine (0 -> 100% in ~1.6s)
    const startTime = Date.now();
    const duration = 1600;

    const counterInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Non-linear cubic ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(eased * 100);
      setCounter(val);

      if (progress >= 1) {
        clearInterval(counterInterval);
        setCounter(100);
        exitTimeoutRef.current = setTimeout(() => {
          playPageTurnSound(1.2);
          playTactileClick('high');
          setIsEnding(true);
        }, 180);
      }
    }, 20);

    return () => {
      clearInterval(counterInterval);
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = null;
      }
      document.body.style.overflow = '';
    };
  }, []);

  const handleExitComplete = () => {
    document.body.style.overflow = '';
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] select-none overflow-hidden font-mono bg-transparent">
          
          {/* 1. Staggered Multi-Column Vertical Shutter Panels (5 Columns, 0.06s offset) */}
          <div className="absolute inset-0 flex w-full h-full z-10 pointer-events-none">
            {Array.from({ length: NUM_COLUMNS }).map((_, i) => (
              <motion.div
                key={i}
                // `flex-1` distributes width perfectly across the 5 columns
                // without sub-pixel rounding. The previous `width: 20%`
                // could cause the rightmost column to overflow by a hair
                // and get clipped by the parent `overflow-hidden`,
                // leaving a white sliver on the right edge.
                className="flex-1 h-full bg-[#090807] border-r border-[#1C1A17]/80 relative last:border-r-0"
                style={{ width: `${100 / NUM_COLUMNS}%` }}
                initial={{ y: '0%' }}
                animate={isEnding ? { y: '-100%' } : { y: '0%' }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.06, // 0.06s staggered offset
                  ease: [0.83, 0, 0.17, 1]
                }}
                onAnimationComplete={() => {
                  if (i === NUM_COLUMNS - 1 && isEnding) {
                    setIsVisible(false);
                  }
                }}
              >
                {/* Subtle vertical hairline accent line */}
                <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-[#E04F2B]/30 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>

          {/* 2. Top Editorial Header (SYS.INIT & Coordinates) */}
          <motion.div
            animate={isEnding ? { y: -30, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-6 sm:p-10 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase pointer-events-none"
          >
            <div className="flex items-center gap-2.5 text-[#8C857B]">
              <span className="w-2 h-2 rounded-full bg-[#E04F2B] animate-ping" />
              <span className="text-[#F4EFE6] font-semibold tracking-[0.3em]">SYS.INIT</span>
              <span className="hidden xs:inline text-[#554F47]">// 2026</span>
            </div>

            <div className="text-[#E04F2B] font-semibold tracking-[0.2em]">
              [ HYDERABAD, INDIA ]
            </div>
          </motion.div>

          {/* 3. Center Content (Staggered Character Reveal & Tagline) */}
          <motion.div
            animate={isEnding ? { scale: 1.08, opacity: 0, filter: 'blur(8px)' } : { scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center pointer-events-none"
          >
            {/* Background Watermark Gauge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-30">
              <span className="text-[12rem] xs:text-[16rem] sm:text-[22rem] font-bold font-mono text-[#181512] tracking-tighter leading-none">
                {counter.toString().padStart(3, '0')}
              </span>
            </div>

            {/* Typography Name Group */}
            <div className="relative z-10 flex flex-col items-center gap-1 sm:gap-2">

              {/* FIRST NAME: "YEMULA" — editorial serif, upright, with
                  tighter tracking than the old monospaced look. The
                  contrast against the italic last name below gives the
                  line a quiet, typographic rhythm instead of the
                  mechanical stamped feel we had. */}
              <div className="flex items-center justify-center font-serif italic font-normal text-3xl xs:text-5xl sm:text-7xl md:text-8xl text-[#F4EFE6] tracking-tight leading-none">
                {FIRST_NAME.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 35, opacity: 0, filter: 'blur(6px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.5,
                      delay: 0.05 + index * 0.04,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* LAST NAME: "KARTHIKEYA" — italic Instrument Serif,
                  same family as the first name for a unified editorial
                  read. The italic on the second line is the only
                  typographic accent now. */}
              <div className="flex items-center justify-center font-serif italic font-normal text-4xl xs:text-6xl sm:text-8xl md:text-9xl text-[#E04F2B] tracking-tight leading-none drop-shadow-[0_0_25px_rgba(224,79,43,0.3)]">
                {LAST_NAME.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 35, opacity: 0, filter: 'blur(6px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.55,
                      delay: 0.2 + index * 0.03,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative z-10 font-mono text-[10px] xs:text-[11px] sm:text-[12px] tracking-[0.3em] text-[#A0988C] uppercase font-medium mt-6"
            >
              AI / ML ENGINEER & SYSTEM ARCHITECT
            </motion.div>
          </motion.div>

          {/* 4. Bottom Precision Counter Engine & Progress Line */}
          <motion.div
            animate={isEnding ? { y: 30, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between p-6 sm:p-10 pointer-events-none"
          >
            {/* Monospaced Odometer Percentage & Progress Line */}
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2 font-mono">
                <span className="text-4xl xs:text-5xl sm:text-6xl font-bold text-[#F4EFE6] tracking-tighter leading-none">
                  {counter.toString().padStart(3, '0')}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#E04F2B] tracking-widest">%</span>
              </div>
              <div className="w-36 xs:w-48 sm:w-64 h-[2px] bg-[#1F1C18] relative overflow-hidden">
                <motion.div
                  className="h-full bg-[#E04F2B]"
                  style={{ width: `${counter}%` }}
                />
              </div>
            </div>

            {/* Coordinates / Status */}
            <div className="text-right font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-[#8C857B] uppercase space-y-1">
              <div className="text-[#F4EFE6] font-semibold">[ 17.3850° N · 78.4867° E ]</div>
              <div className="text-[9px] text-[#E04F2B]">NEURAL KERNEL ONLINE</div>
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
