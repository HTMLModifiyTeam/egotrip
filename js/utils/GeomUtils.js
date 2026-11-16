import * as THREE from 'three';

// 회전체: pts = [[반지름, 높이], ...] (y축 기준)
export function latheY(pts, seg = 24, phiStart = 0, phiLen = Math.PI * 2) {
  return new THREE.LatheGeometry(pts.map(p => new THREE.Vector2(Math.max(0.0001, p[0]), p[1])), seg, phiStart, phiLen);
}