import { clamp, lerp } from "./Math.js";

export const levelFor = m => 0.86 + clamp((m - 60) / 26, 0, 1) * 0.3;
export const dynGain = (m, d) => levelFor(m) * lerp(0.6, 1.1, clamp(d, 0, 1.2));
export const dynCut = d => clamp(3000 * Math.pow(2, clamp(d, 0, 1.2) * 2.5), 2000, 18000);

export function chordAt(b, pos) {
  for (let i = b.chords.length - 1; i >= 0; i--)
    if (pos >= b.chords[i].at - 1e-6) return b.chords[i];
  return b.chords[0];
}