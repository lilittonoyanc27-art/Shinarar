// Audio Utilities using Web Audio API and Speech Synthesis

export const playCorrectSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    
    osc1.type = 'sine';
    osc2.type = 'triangle';
    
    // C5 -> E5 -> G5 chord arpeggio
    const now = ctx.currentTime;
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.setValueAtTime(659.25, now + 0.08); // E5
    osc1.frequency.setValueAtTime(783.99, now + 0.16); // G5
    
    osc2.frequency.setValueAtTime(261.63, now); // C4 support
    
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    
    osc1.start(now);
    osc2.start(now);
    
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  } catch (error) {
    console.warn('Audio Web API not fully supported or restricted by browser policy', error);
  }
};

export const playIncorrectSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sawtooth';
    const now = ctx.currentTime;
    
    // Low buzzer slide
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.35);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.38);
    
    osc.start(now);
    osc.stop(now + 0.4);
  } catch (error) {
    console.warn('Audio Web API error:', error);
  }
};

export const playHammerSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'triangle';
    const now = ctx.currentTime;
    
    // Quick sharp impact wood-knock
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.12);
    
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    osc.start(now);
    osc.stop(now + 0.16);
  } catch (error) {
    console.warn('Audio Web API error:', error);
  }
};

export const playLevelUpSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    const now = ctx.currentTime;
    
    // Upward fanfare
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(587.33, now + 0.08); // D5
    osc.frequency.setValueAtTime(659.25, now + 0.16); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.24); // G5
    osc.frequency.setValueAtTime(1046.50, now + 0.32); // C6
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    
    osc.start(now);
    osc.stop(now + 0.65);
  } catch (error) {
    console.warn('Audio Web API error:', error);
  }
};

// Text-to-Speech (Spanish synthesis)
export const speakSpanish = (text: string, onEnd?: () => void) => {
  if (!('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  // Cancel any active speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  
  // Try to find a native Spanish voice
  const voices = window.speechSynthesis.getVoices();
  const esVoice = voices.find(v => v.lang.startsWith('es-') || v.lang === 'es-ES');
  if (esVoice) {
    utterance.voice = esVoice;
  }
  
  utterance.rate = 0.95; // Slightly slower for language learners
  
  if (onEnd) {
    utterance.onend = () => onEnd();
    utterance.onerror = () => onEnd();
  }
  
  window.speechSynthesis.speak(utterance);
};
