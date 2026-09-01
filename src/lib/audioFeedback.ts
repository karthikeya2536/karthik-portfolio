// Web Audio API Synthesizer for physical magazine page flips and low-volume tactile acoustic feedback

let audioCtx: AudioContext | null = null;
let isAudioEnabled = true;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    // Attempt resume on first gesture
    const resume = () => {
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      window.removeEventListener('click', resume);
      window.removeEventListener('scroll', resume);
      window.removeEventListener('keydown', resume);
    };
    window.addEventListener('click', resume, { once: true });
    window.addEventListener('scroll', resume, { once: true });
    window.addEventListener('keydown', resume, { once: true });
  }
  return audioCtx;
};

/**
 * Generates an ultra-refined, low-volume physical page-turn / paper whoosh sound
 * using bandpassed white noise with an organic resonant frequency sweep and gentle exponential decay.
 */
export const playPageTurnSound = (velocityFactor: number = 1) => {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  try {
    const now = ctx.currentTime;
    const duration = Math.min(0.28, Math.max(0.12, 0.18 * velocityFactor));

    // 1. Synthesize paper texture noise buffer
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Generate pink-tinted filtered noise
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2 + white * 0.1) * 0.25;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;

    // 2. High-pass filter to remove muddy rumble
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(600, now);

    // 3. Resonant Bandpass filter simulating paper friction sweep
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.Q.setValueAtTime(3.5, now);
    bandpass.frequency.setValueAtTime(1400, now);
    bandpass.frequency.exponentialRampToValueAtTime(2800, now + duration * 0.5);
    bandpass.frequency.exponentialRampToValueAtTime(900, now + duration);

    // 4. Subtle sub-harmonic mechanical click (tactile paper spine flex)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.04);
    oscGain.gain.setValueAtTime(0.015, now);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    // 5. Master Gain envelope (subtle, low-volume)
    const masterGain = ctx.createGain();
    const baseVolume = 0.035; // Whisper quiet
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.exponentialRampToValueAtTime(baseVolume, now + 0.02);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Routing
    noiseNode.connect(highpass);
    highpass.connect(bandpass);
    bandpass.connect(masterGain);

    osc.connect(oscGain);
    oscGain.connect(masterGain);

    masterGain.connect(ctx.destination);

    noiseNode.start(now);
    osc.start(now);
    noiseNode.stop(now + duration);
    osc.stop(now + 0.05);
  } catch {
    // Ignore audio errors silently if browser restricts autoplay
  }
};

/**
 * Micro tactile click for crisp chapter boundary snap or button focus
 */
export const playTactileClick = (tone: 'high' | 'low' = 'high') => {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const startFreq = tone === 'high' ? 2400 : 1200;
    const endFreq = tone === 'high' ? 400 : 200;

    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.025);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  } catch {
    // Ignore audio errors silently
  }
};

/**
 * Very subtle, low-frequency 'thrum' or 'hum' that triggers when hovering over
 * primary call-to-action elements, reinforcing the premium, sensory design experience.
 * Synthesizes a deep sub-bass harmonic resonance (55Hz - 82Hz) with warm saturation.
 */
let lastThrumTime = 0;

export const playCtaHoverThrum = (intensity: number = 1) => {
  if (!isAudioEnabled) return;
  const nowMs = performance.now();
  // Debounce to prevent overlapping micro-bursts on rapid pointer jitter
  if (nowMs - lastThrumTime < 180) return;
  lastThrumTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  try {
    const now = ctx.currentTime;
    const duration = 0.28;

    // Sub-oscillator 1: Fundamental warm sub-bass sine (55Hz -> 65Hz swell)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(55, now);
    subOsc.frequency.exponentialRampToValueAtTime(68, now + 0.08);
    subOsc.frequency.exponentialRampToValueAtTime(48, now + duration);

    // Harmonic oscillator 2: Rich triangle 2nd harmonic (110Hz -> 130Hz)
    const harmOsc = ctx.createOscillator();
    const harmGain = ctx.createGain();
    harmOsc.type = 'triangle';
    harmOsc.frequency.setValueAtTime(110, now);
    harmOsc.frequency.exponentialRampToValueAtTime(136, now + 0.08);
    harmOsc.frequency.exponentialRampToValueAtTime(96, now + duration);

    // Low-pass warmth filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, now);
    filter.frequency.exponentialRampToValueAtTime(240, now + 0.08);
    filter.frequency.exponentialRampToValueAtTime(120, now + duration);
    filter.Q.setValueAtTime(2.2, now);

    // Master envelope: Soft attack, warm sustain, gentle release (subtle ~0.04 volume)
    const masterGain = ctx.createGain();
    const baseVolume = 0.038 * Math.min(1.5, Math.max(0.5, intensity));
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.exponentialRampToValueAtTime(baseVolume, now + 0.04);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    subGain.gain.setValueAtTime(0.7, now);
    harmGain.gain.setValueAtTime(0.3, now);

    subOsc.connect(subGain);
    harmOsc.connect(harmGain);
    subGain.connect(filter);
    harmGain.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    subOsc.start(now);
    harmOsc.start(now);
    subOsc.stop(now + duration);
    harmOsc.stop(now + duration);
  } catch {
    // Ignore audio errors silently
  }
};

export const setSoundEnabled = (enabled: boolean) => {
  isAudioEnabled = enabled;
};

export const getSoundEnabled = () => isAudioEnabled;
