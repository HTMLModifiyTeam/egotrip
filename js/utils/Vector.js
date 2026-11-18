import * as THREE from 'three';

// ---------- 기하 도우미 ----------
export const V3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);

export function M4(p = [0, 0, 0], r = [0, 0, 0], s = [1, 1, 1]) {
  if (!Array.isArray(r)) r = [0, 0, 0];
  if (typeof s === 'number') s = [s, s, s];
  else if (!Array.isArray(s)) s = [1, 1, 1];

  const _e4 = new THREE.Euler();
  _e4.set(r[0], r[1], r[2]);

  const _q4 = new THREE.Quaternion();
  _q4.setFromEuler(_e4);
  return new THREE.Matrix4().compose(V3(p[0], p[1], p[2]), _q4, V3(s[0], s[1], s[2]));
}