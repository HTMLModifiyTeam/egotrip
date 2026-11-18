
const bandVoices = new Set();

export function trackBandVoice(aud, src, g, dest, lfo = null) {
  const b = aud;
  if (dest !== b.tbn && dest !== b.pno && dest !== b.pnoSolo && dest !== b.bass && dest !== b.drums) return;
  const voice = { src, g, lfo };
  bandVoices.add(voice);
  src.addEventListener('ended', () => bandVoices.delete(voice), { once: true });
}

export function stopBandVoices(now) {
  for (const { src, g, lfo } of bandVoices) {
    const gain = g.gain;
    if (gain.cancelAndHoldAtTime) gain.cancelAndHoldAtTime(now);
    else {
      const level = gain.value;
      gain.cancelScheduledValues(now);
      gain.setValueAtTime(level, now);
    }
    gain.linearRampToValueAtTime(0, now + 0.04);
    try {
      src.stop(now + 0.05);
      if (lfo) lfo.stop(now + 0.05);
    } catch { }
  }
  bandVoices.clear();
}
