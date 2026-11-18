import { QUAL_NAME, PC, QUAL } from "../data/harmony.js";
import { mod12 } from "./Math.js";

export function parseChord(sym) {
  const m = sym.trim().match(/^([A-G])(#|b)?(.*)$/);
  if (!m) throw new Error('bad chord ' + sym);
  const root = PC[m[1] + (m[2] || '')];
  let q = m[3] || '6';
  if (!QUAL[q]) {
    if (q === 'maj' || q === '') q = '6';
    else if (q === 'm') q = 'm7';
    else throw new Error('bad quality ' + sym);
  }
  return { root, q, name: m[1] + (m[2] || '') + (QUAL_NAME[q] || q), sym };
}

// "F7 | Bb7 | Cm7 F7 | ..." → [[{ch, at, len}...], ...]  (마디 안 위치는 박)
export function parseForm(str) {
  return str.split('|').map(b => b.trim()).filter(b => b.length).map(b => {
    const cs = b.split(/\s+/).map(parseChord);
    const len = 4 / cs.length;
    return cs.map((ch, i) => ({
      ...ch,
      at: i * len,
      len
    }));
  });
}

export const inSet = (m, ch, key) => QUAL[ch.q][key].includes(mod12(m - ch.root));
export const isChordTone = (m, ch) => QUAL[ch.q].tones.includes(mod12(m - ch.root));
export const isGuide = (m, ch) => QUAL[ch.q].guide.includes(mod12(m - ch.root));