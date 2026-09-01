// Discrete UI feedback sounds for tactile interaction moments.
//
// This module complements `lib/audioFeedback.ts` (which handles the
// ambient / looping feedback like page turns and hover thrum) with
// one-shot sounds for discrete user actions: button presses, copy
// success, modal open, etc.
//
// All functions are no-ops if Web Audio is unavailable, the audio
// context is suspended (e.g. before a user gesture), or the user has
// disabled sound via `setSoundEnabled(false)`. Errors are swallowed.

let audioCtx: AudioContext | null = null;
let isEnabled = true;

// Single shared AudioContext, lazily created on first call.
const getCtx = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (audioCtx) return audioCtx;
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  try {
    audioCtx = new Ctor();
  } catch {
    return null;
  }
  return audioCtx;
};

const tryResume = (ctx: AudioContext): void => {
  if (ctx.state !== 'suspended') return;
  // Browsers require a user gesture before audio can play. The first
  // pointer/keyboard event unblocks the context.
  const resume = () => {
    if (ctx.state === 'suspended') void ctx.resume();
    window.removeEventListener('pointerdown', resume);
    window.removeEventListener('keydown', resume);
  };
  window.addEventListener('pointerdown', resume, { once: true });
  window.addEventListener('keydown', resume, { once: true });
};

export const setSoundEnabled = (enabled: boolean): void => {
  isEnabled = enabled;
};

export const getSoundEnabled = (): boolean => isEnabled;

/**
 * Sharp brass tick — small buttons, focus rings, navigation clicks.
 * Plays a 25ms triangle wave that drops from 1.6kHz to 320Hz.
 */
export const playTick = (): void => {
  if (!isEnabled) return;
  const ctx = getCtx();
  if (!ctx) return;
  tryResume(ctx);
  if (ctx.state !== 'running') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1600, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.025);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.03);
  } catch {
    /* ignore */
  }
};

/**
 * Mechanical sawtooth clack — heavier interactions like print, reload,
 * modal close. Plays a 40ms sawtooth that drops from 800Hz to 150Hz.
 */
export const playPressKey = (): void => {
  if (!isEnabled) return;
  const ctx = getCtx();
  if (!ctx) return;
  tryResume(ctx);
  if (ctx.state !== 'running') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.04);
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  } catch {
    /* ignore */
  }
};

/**
 * Short sine pop — pointer clicks, scroll-to-section triggers, theme
 * toggle. Plays a 50ms sine that rises from 440Hz to 880Hz.
 */
export const playPop = (): void => {
  if (!isEnabled) return;
  const ctx = getCtx();
  if (!ctx) return;
  tryResume(ctx);
  if (ctx.state !== 'running') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    /* ignore */
  }
};

/**
 * Layered arpeggio chime — successful actions like copy-to-clipboard
 * success. Plays an A4/C#5/E5/A5 major arpeggio staggered 60ms apart,
 * each note ringing for ~450ms.
 */
export const playChime = (): void => {
  if (!isEnabled) return;
  const ctx = getCtx();
  if (!ctx) return;
  tryResume(ctx);
  if (ctx.state !== 'running') return;

  try {
    const now = ctx.currentTime;
    // A4 (440), C#5 (554.37), E5 (659.25), A5 (880)
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      const t = now + idx * 0.06;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.035, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.5);
    });
  } catch {
    /* ignore */
  }
};
