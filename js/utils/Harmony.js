import { QUAL_NAME, PC, QUAL } from "../data/harmony.js";
import { mod12 } from "./Math.js";

const SEARCH = 7; // 가까운 허용음을 찾을 최대 반음 거리

/** pc(0–11)에 해당하는 음 중 near에 가장 가까운 MIDI 번호 (lo..hi 안). 없으면 null. 동률이면 낮은 쪽. */
export function nearestPC(pc, near, lo, hi) {
  const target = mod12(pc);
  let best = null, bd = Infinity;
  for (let m = lo; m <= hi; m++) {
    if (mod12(m) !== target) continue;
    const d = Math.abs(m - near);
    if (d < bd) { bd = d; best = m; }
  }
  return best;
}

/** "Bb7", "Cm7", "F" → { root, q, name, sym }. 품질 생략은 6, "m"은 m7으로 취급. */
export function parseChord(sym) {
  const m = String(sym).trim().match(/^([A-G])(#|b)?(.*)$/);
  if (!m) throw new Error('bad chord ' + sym);
  const rootName = m[1] + (m[2] || '');
  const root = PC[rootName];
  if (root == null) throw new Error('bad root ' + sym); // 예: Cb, E# 가 PC 표에 없을 때 NaN 방지
  let q = m[3] || '6';
  if (!QUAL[q]) {
    if (q === 'maj') q = '6';
    else if (q === 'm') q = 'm7';
    else throw new Error('bad quality ' + sym);
  }
  return { root, q, name: rootName + (QUAL_NAME[q] || q), sym };
}

/** raw에서 가장 가까운 key('S'|'W' 등) 집합 음. dir로 동률 시 방향 우선. 없으면 raw. */
export function nearestAllowed(raw, ch, key, dir = 1) {
  raw = Math.round(raw);
  if (inSet(raw, ch, key)) return raw;
  for (let d = 1; d <= SEARCH; d++) {
    const pair = dir >= 0 ? [raw + d, raw - d] : [raw - d, raw + d];
    for (const m of pair) if (inSet(m, ch, key)) return m;
  }
  return raw;
}

/** from에서 dir 방향으로 한 걸음 가서 만나는 첫 허용음. 없으면 반음 한 칸. */
export function stepAllowed(from, dir, ch, key) {
  for (let d = 1; d <= SEARCH; d++) {
    const m = from + dir * d;
    if (inSet(m, ch, key)) return m;
  }
  return from + dir;
}

// "F7 | Bb7 | Cm7 F7 | ..." → [[{ch, at, len}...], ...]  (마디 안 위치는 박)
export function parseForm(str) {
  return str.split('|').map(b => b.trim()).filter(Boolean).map((bar, i) => {
    const cs = bar.split(/\s+/).map(s => {
      try {
        return parseChord(s);
      } catch (e) { throw new Error(`bar ${i + 1}: ${e.message}`); } // 몇 번째 마디인지 알려줌
    });
    const len = 4 / cs.length;
    return cs.map((ch, k) => ({ ...ch, at: k * len, len }));
  });
}

export const inSet = (m, ch, key) => QUAL[ch.q][key].includes(mod12(m - ch.root));
export const isChordTone = (m, ch) => QUAL[ch.q].tones.includes(mod12(m - ch.root));
export const isGuide = (m, ch) => QUAL[ch.q].guide.includes(mod12(m - ch.root));