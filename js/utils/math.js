import { MathUtils } from "three";

export const rateFor = (s, midi, cents = 0) => Math.pow(2, (midi - s.m) / 12 + ((s.c || 0) + cents) / 1200);
export const clamp = MathUtils.clamp;

// 프레임 독립 감쇠 보간
export const damp = MathUtils.damp;
export const dampAngle = (cur, target, rate, dt) => {
  let d = target - cur;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return cur + d * (1 - Math.exp(-rate * dt));
};

export const lerp = MathUtils.lerp;
export const mod12 = x => ((x % 12) + 12) % 12;

export function nearestAllowed(raw, ch, key, dir = 1) {
  raw = Math.round(raw);
  for (let d = 0; d <= 7; d++) {
    const c = d === 0 ? [raw] : (dir >= 0 ? [raw + d, raw - d] : [raw - d, raw + d]);
    for (const m of c)
      if (inSet(m, ch, key)) return m;
  }
  return raw;
}

// 시드 고정 난수 (사람 외모가 매번 같게)
export const pick = arr => arr[Math.floor(Math.random() * arr.length)];
export const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
export const randi = (a, b) => Math.floor(rand(a, b + 1));
export function seeded(seed) {
  let s = seed >>> 0;
  const f = () => {
    s += 0x6D2B79F5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  f.range = (a, b) => a + f() * (b - a);
  f.int = (a, b) => Math.floor(a + f() * (b - a + 1));
  f.pick = arr => arr[Math.floor(f() * arr.length)];
  f.chance = p => f() < p;
  return f;
}
export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const smooth01 = t => {
  t = clamp(t, 0, 1);
  return t * t * (3 - 2 * t);
};
export const smoothstep = (a, b, x) => smooth01((x - a) / (b - a));