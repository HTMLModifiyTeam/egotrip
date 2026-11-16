import * as THREE from 'three';
import { mergeVertices, mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// 그룹 번호: 몸(외곽선 있음) / 얼굴 / 장식(외곽선 없음)
const GROUP_COUNT = 3;
const MAX_INFLUENCES = 4; // 정점 하나에 영향을 주는 뼈 최대 개수 (스키닝 셰이더 한계)

export class Rig {
  constructor() {
    this.parts = Array.from({ length: GROUP_COUNT }, () => []);
    this.groupsUsed = [false, false, false];
  }
  /**
   * 조각 하나를 추가한다. geo는 부르는 쪽에서 방금 만든 것이어야 함 (여기서 변형·가공하므로 다시 쓰면 안 됨).
   * @param geo   BufferGeometry (인덱스 없으면 정점을 합쳐 줌)
   * @param color 정점 색 (THREE.Color가 받는 값)
   * @param bone  뼈 번호 하나, 또는 weightFn(pos) → [[bone, weight], ...]
   *              (pos는 m을 적용한 뒤의 위치. 영향 뼈가 4개를 넘으면 가중치가 큰 4개만 씀)
   * @param m     Matrix4 (선택). 기준 자세 좌표로 옮기는 변환
   * @param group 0 몸 · 1 얼굴 · 2 장식(외곽선 없음)
   * @param tint  (pos, baseColor) → Color | null. 위치에 따라 색을 바꾸고 싶을 때 (null이면 baseColor)
   */
  add(geo, color, bone, m = null, group = 0, tint = null) {
    if (!this.parts[group]) throw new Error(`Rig.add: 알 수 없는 group ${group}`);
    // 곁가지 속성(uv 등)이 남아 있으면 정점이 덜 합쳐지므로 합치기 전에 먼저 지움
    for (const k of Object.keys(geo.attributes))
      if (k !== 'position' && k !== 'normal') geo.deleteAttribute(k);
    const g = geo.index ? geo : mergeVertices(geo);
    if (m) g.applyMatrix4(m);
    if (!g.attributes.normal) g.computeVertexNormals();
    const pos = g.attributes.position;
    const n = pos.count, col = new Float32Array(n * 3), si = new Uint16Array(n * MAX_INFLUENCES), sw = new Float32Array(n * MAX_INFLUENCES);
    const c = new THREE.Color(color), p = new THREE.Vector3();
    const fixed = typeof bone === 'number';
    for (let i = 0; i < n; i++) {
      let cc = c;
      if (tint) {
        p.fromBufferAttribute(pos, i);
        cc = tint(p, c) || c;
      }
      col[i * 3] = cc.r;
      col[i * 3 + 1] = cc.g;
      col[i * 3 + 2] = cc.b;
      const o = i * MAX_INFLUENCES;
      if (fixed) {
        si[o] = bone;
        sw[o] = 1;
        continue;
      }
      p.fromBufferAttribute(pos, i);
      let ws = bone(p);
      if (ws.length > MAX_INFLUENCES) ws = ws.slice().sort((a, b) => b[1] - a[1]).slice(0, MAX_INFLUENCES);
      let tot = 0;
      for (let k = 0; k < ws.length; k++) {
        si[o + k] = ws[k][0];
        sw[o + k] = ws[k][1];
        tot += ws[k][1];
      }

      if (tot > 0) {
        for (let k = 0; k < MAX_INFLUENCES; k++) sw[o + k] /= tot;
      } else {
        // 가중치가 전부 0이면 루트 뼈에 붙임
        si[o] = 0;
        sw[o] = 1;
      }
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, MAX_INFLUENCES));
    g.setAttribute('skinWeight', new THREE.BufferAttribute(sw, MAX_INFLUENCES));
    this.parts[group].push(g);
  }

  /**
   * 그룹별로 합친 뒤, 그룹 순서대로 하나로 합쳐 돌려준다 (useGroups = true).
   * groupsUsed[i]는 i번 그룹에 조각이 있었는지: 부르는 쪽이 재질 배열을 거를 때 씀.
   * 한 번 부르면 조각 목록은 비워지므로 build()는 Rig마다 한 번만 부를 것.
   */
  build() {
    const gs = this.parts.map(list => list.length ? mergeGeometries(list, false) : null);
    this.groupsUsed = gs.map(Boolean);
    const used = gs.filter(Boolean);
    if (!used.length) throw new Error('Rig.build: 추가된 조각이 없음');
    const geo = mergeGeometries(used, true);
    if (!geo) throw new Error('Rig.build: 지오메트리를 합치지 못함 (속성이 서로 다른 조각이 있는지 확인)');
    // 합친 결과가 복사본을 갖고 있으므로 원본 조각은 놓아줌
    for (const list of this.parts) {
      for (const g of list) g.dispose();
      list.length = 0;
    }
    for (const g of used) g.dispose();
    return geo;
  }
}