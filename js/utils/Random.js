import { MathUtils } from "three";

// 시드 고정 난수 (사람 외모가 매번 같게)
export const pick = arr => arr[Math.floor(Math.random() * arr.length)];
export function wpick(opts) {
  let s = 0;
  for (const o of opts) s += o[1];
  let r = Math.random() * s;
  for (const o of opts) {
    r -= o[1];
    if (r <= 0) return o[0];
  }
  return opts[opts.length - 1][0];
};

export const rand = MathUtils.randFloat;
export const randi = MathUtils.randInt;

export function seeded(seed) {
  let s = seed >>> 0;
  const f = () => {
    let t = s += 0x6D2B79F5;
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