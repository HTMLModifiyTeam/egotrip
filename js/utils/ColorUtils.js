import * as THREE from 'three';
import { clamp } from './Math.js';

export function shadeHex(hex, k) {
  const c = new THREE.Color(hex);
  c.r = clamp(c.r * k, 0, 1);
  c.g = clamp(c.g * k, 0, 1);
  c.b = clamp(c.b * k, 0, 1);
  return c;
}

export function mixHex(a, b, t) {
  return new THREE.Color(a).lerp(new THREE.Color(b), t);
}