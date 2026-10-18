// Web Audio API Procedural Sound Synthesizer for Neo-Brutalist Tactile Clicks
// Zero external files, zero latency, ultra lightweight

let audioCtx = null;
let soundEnabled = true;

// Initialize sound state from localStorage
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('hypers_sfx_enabled');
  if (saved !== null) {
    soundEnabled = saved === 'true';
  }
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function toggleSound() {
  soundEnabled = !soundEnabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('hypers_sfx_enabled', String(soundEnabled));
  }
  // Play a quick test pip when turned on
  if (soundEnabled) {
    playTactileClick(false);
  }
  return soundEnabled;
}

export function playTactileClick(isRelease = false) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  try {
    if (!isRelease) {
      // ═══════════════════════════════════════════════
      // MOUSE DOWN: Punchy Mechanical Switch Snap
      // ═══════════════════════════════════════════════

      // 1. High-frequency snappy click transient
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.028);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, now);
      filter.Q.setValueAtTime(2.5, now);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);

      // 2. Tactile lower body "thump" (simulates keycap/switch contact)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();

      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(240, now);
      subOsc.frequency.exponentialRampToValueAtTime(50, now + 0.025);

      subGain.gain.setValueAtTime(0.18, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);

      subOsc.start(now);
      subOsc.stop(now + 0.028);
    } else {
      // ═══════════════════════════════════════════════
      // MOUSE UP: Subtle Mechanical Switch Release
      // ═══════════════════════════════════════════════
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.018);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.02);
    }
  } catch (e) {
    // Gracefully handle any browser audio policy errors
  }
}
