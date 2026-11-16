
class Soloist {
  constructor(audio, o) {
    Object.assign(this, {
      lo: 57,
      hi: 86,
      last: 67,
      dir: 1,
      phrases: 0,
      spaceDone: false,
      climaxN: 0,
      doubleDone: false,
      riffDone: false,
      motif: null,
      motifN: 0,
      fixedI: null,
      mode: 'solo'
    }, o);
    this.spb = 60 / this.bpm;
    this.fast = this.bpm >= 196;
    this.slow = this.bpm < 116;
    this.cursor = this.startB;
    this.ctx = audio.ctx;
  }
  // 진행도와 세기: 낮고 듬성듬성 → 촘촘하고 높게 → 80% 지점 절정 → 내려와 마무리
  x(B) {
    return clamp((B - this.startB) / Math.max(1, this.endB - this.startB), 0, 1);
  }

  I(B) {
    if (this.fixedI != null) return this.fixedI;
    const x = this.x(B),
      pk = 0.8;
    return clamp(x < pk ? 0.2 + 0.8 * Math.pow(smooth01(x / pk), 1.1) : 1 - 0.42 * smooth01((x - pk) / (1 - pk)), 0, 1);
  }
  top(I) {
    return Math.round(lerp(72, 84, I));
  }
  center(I) {
    return lerp(64.5, 73, I);
  }
  ch(B) {
    return this.ctx.chord(B);
  }
  isInt(B) {
    return Math.abs(B - Math.round(B)) < 1e-6;
  }
  okNote(m, ch, strong) {
    return inSet(m, ch, strong ? 'S' : 'W') || this.blueOk(m, ch, strong);
  }
  blueOk(m, ch, strong) {
    if (!this.blues) return false;
    const rel = mod12(ch.root - this.keyPc);
    if (rel !== 0 && rel !== 5) return false;
    const pc = mod12(m - this.keyPc);
    return pc === 6 ? !strong : pc === 3 ? (!strong || rel === 0) : false;
  }
  fit(m) {
    while (m < this.lo) m += 12;
    while (m > this.hi) m -= 12;
    return m;
  }
  emit(ev) {
    let prev = null;
    for (const e of ev) {
      e.m = this.fit(Math.round(e.m));
      e.ctx = this.ctx;
      if (e.strong == null) e.strong = this.isInt(e.B);
      if (e.art === 'slur' && prev && prev.m === e.m && !prev.ripTo) e.art = 'tongue';
      AUTO.notes.push(e);
      prev = e;
    }
  }
  ensure(upto) {
    let g = 0;
    while (this.cursor < upto && this.cursor < this.endB - 1.5 && g++ < 8) this.next();
  }
  // 다음 프레이즈 하나
  next() {
    const B = this.cursor,
      I = this.I(B),
      x = this.x(B),
      left = this.endB - B;
    const endBeats = this.fast ? 10 : this.slow ? 6 : 8;
    let ev, kind;
    if (left <= endBeats + 3) kind = 'ending';
    else if (this.climaxN === 0 && x >= 0.6 && x <= 0.9 && left > endBeats + 10 && Math.random() < 0.55) kind = 'climax';
    else if (!this.doubleDone && x >= 0.42 && x <= 0.86 && I >= 0.6 && this.bpm >= 104 && left > endBeats + 12 && Math.random() < 0.35) kind = 'double';
    else if (!this.riffDone && x >= 0.22 && x <= 0.75 && left > endBeats + 16 && Math.random() < 0.3) kind = 'riff';
    else if (this.blues && Math.random() < 0.26) kind = 'blues';
    else if (this.motif && Math.random() < (I < 0.6 ? 0.4 : 0.2)) kind = 'seq';
    else if (I < 0.42 && Math.random() < (this.phrases < 3 ? 0.5 : 0.3)) kind = 'call';
    else if (Math.random() < (this.slow ? 0.22 : 0.13)) kind = 'long';
    else kind = 'line';
    switch (kind) {
      case 'ending':
        ev = this.ending(B, I);
        break;
      case 'climax':
        ev = this.climax(B, I);
        break;
      case 'double':
        ev = this.double(B, I);
        this.doubleDone = true;
        break;
      case 'riff':
        ev = this.riff(B, I);
        this.riffDone = true;
        break;
      case 'blues':
        ev = this.bluesLick(B, I);
        break;
      case 'seq':
        ev = this.seq(B, I);
        break;
      case 'call':
        ev = this.call(B, I);
        break;
      case 'long':
        ev = this.longTone(B, I);
        break;
      default:
        ev = this.line(B, clamp(Math.round(lerp(3, 10, I) + rand(-1.5, 2)), 3, Math.max(3, left - endBeats - 2)), I);
    }
    if (!ev || !ev.length) {
      this.cursor += 1;
      return;
    }
    ev = this.fixLong(ev);
    this.emit(ev);
    this.phrases++;
    if (kind === 'ending') {
      this.cursor = this.endB;
      return;
    }
    if (kind !== 'call' && kind !== 'seq') this.motifN = 0;
    const end = Math.max(...ev.map(e => e.B + e.len));
    // 다음 프레이즈까지 숨 (세질수록 짧게, 최소 0.4초 남짓)
    let rest = lerp(3.6, 1.1, I) * rand(0.75, 1.3) + (kind === 'climax' || kind === 'double' || kind === 'riff' ? 0.6 : 0);
    rest = Math.max(rest, 0.42 / this.spb + 0.2);
    let nb = Math.ceil((end + rest) * 2 - 1e-6) / 2;
    if (this.isInt(nb) && Math.random() < 0.45) nb += 0.5;
    // 초반 한 번: 오래 쉬었다가 마디 첫 박에서 (여백)
    if (this.mode === 'solo' && !this.spaceDone && x < 0.35 && this.phrases >= 2 && Math.random() < 0.45) {
      nb = this.ctx.barStart(end + 3.8);
      this.spaceDone = true;
    }
    this.cursor = nb;
  }
  // 박 쪼개기: 8분 둘 / 4분 / 셋잇단 / (느린 곡) 16분 넷, 끝은 긴 음
  rhythm(B0, len, o = {}) {
    const ev = [];
    let p = 0;
    const trip = this.straight ? 0 : this.fast ? 0.03 : this.slow ? 0.18 : 0.11;
    const six = this.slow ? 0.12 : 0,
      quarter = this.fast ? 0.2 : 0.1;
    const endLen = o.endLen ?? (this.fast ? pick([1.5, 2, 2.5]) : pick([1, 1.5, 2]));
    const body = Math.max(0.5, len - endLen);
    while (p < body - 1e-6) {
      const at = B0 + p,
        room = body - p;
      if (!this.isInt(at)) {
        ev.push({ B: at, len: 0.5, strong: false});
        p += 0.5;
        continue;
      }
      const r = Math.random();
      if (r < trip && room >= 1 - 1e-6) {
        ev.push({
          B: at,
          len: 1 / 3,
          strong: true,
          trip: 0
        }, {
          B: at + 1 / 3,
          len: 1 / 3,
          strong: false,
          trip: 1
        }, {
          B: at + 2 / 3,
          len: 1 / 3,
          strong: false,
          trip: 2
        });
        p += 1;
      } else if (r < trip + six && room >= 1 - 1e-6) {
        for (let k = 0; k < 4; k++) ev.push({
          B: at + k * 0.25,
          len: 0.25,
          strong: k === 0,
          straight: true
        });
        p += 1;
      } else if (r < trip + six + quarter) {
        ev.push({
          B: at,
          len: 1,
          strong: true
        });
        p += 1;
      } else {
        ev.push({
          B: at,
          len: 0.5,
          strong: true
        });
        if (room > 0.5 + 1e-6) ev.push({
          B: at + 0.5,
          len: 0.5,
          strong: false
        });
        p += 1;
      }
    }
    const fp = B0 + p;
    ev.push({
      B: fp,
      len: Math.max(0.5, endLen + (body - p)),
      strong: this.isInt(fp),
      last: true
    });
    return ev;
  }
  line(B0, len, I, o = {}) {
    const ev = this.rhythm(B0, len, o);
    this.pitchLine(ev, I, o);
    this.dress(ev, I, {
      fallOK: true
    });
    return ev;
  }
  // 음 고르기: 박 위는 코드톤(화음 바뀌는 박엔 3·7음), 박 사이는 경과음·접근음·감싸기
  pitchLine(ev, I, o = {}) {
    const n = ev.length,
      top = Math.min(this.hi, o.top ?? this.top(I)),
      ctr = o.center ?? this.center(I);
    let start = o.start ?? clamp(this.last + rand(-4, 4), this.lo + 2, top - 4);
    if (o.start == null && Math.random() < 0.3) start = clamp(ctr + rand(-4, 3), this.lo + 2, top - 4);
    const shape = o.shape || pick(['arch', 'arch', 'arch', 'desc', 'asc', 'wave']);
    const pk = clamp(top - rand(0, 3.5), start + 2, this.hi),
      endW = clamp(ctr + rand(-6, 0.5), this.lo + 2, Math.max(this.lo + 3, pk - 3)),
      pa = rand(0.3, 0.65);
    const want = f => shape === 'asc' ? lerp(start, pk, f) : shape === 'desc' ? lerp(Math.max(start, pk - 2), endW - 1, f) : shape === 'wave' ? lerp(start, endW, f) + Math.sin(f * Math.PI * 2) * 3.5 : f < pa ? lerp(start, pk, f / pa) : lerp(pk, endW, (f - pa) / (1 - pa));
    const B0 = ev[0].B,
      span = Math.max(0.5, ev[n - 1].B - B0);
    let prev = this.last;
    for (const e of ev) {
      if (!(e.strong || e.last) || e.m != null) continue;
      e.m = this.tone(this.ch(e.B), want((e.B - B0) / span), prev, {
        change: this.ctx.isChange(e.B),
        last: !!e.last,
        color: !!e.last && Math.random() < 0.35
      });
      prev = e.m;
    }
    for (let i = 0; i < n; i++) {
      const e = ev[i];
      if (e.m != null) continue;
      let j = i + 1;
      while (j < n && ev[j].m == null) j++;
      const T = j < n ? ev[j].m : null,
        a = i ? ev[i - 1].m : (T != null ? T + pick([-3, -2, 2]) : this.last),
        ch = this.ch(e.B);
      if (e.trip === 1 && T != null && j === i + 2) {
        e.m = this.upper(T, ch);
        continue;
      } // 셋잇단: 위 이웃음 →
      if (e.trip === 2 && T != null && j === i + 1) {
        e.m = T - 1;
        continue;
      } //         반음 아래 → 목표음
      e.m = this.between(a, T, ch, e);
    }
    this.last = ev[n - 1].m;
  }
  tone(ch, w, prev, o = {}) {
    let best = null,
      bs = 1e9;
    for (let m = Math.max(this.lo, Math.round(w) - 9); m <= Math.min(this.hi, Math.round(w) + 9); m++) {
      const ct = isChordTone(m, ch),
        ten = !ct && inSet(m, ch, 'S'),
        blue = !ct && !ten && this.blueOk(m, ch, true);
      if (!ct && !blue && !(ten && (o.color || Math.random() < 0.2))) continue;
      let s = Math.abs(m - w) * 0.55 + (prev != null ? Math.abs(m - prev) * 0.3 : 0);
      if (prev != null && m === prev) s += 2.4;
      if (prev != null && Math.abs(m - prev) > 9) s += 2.5;
      if (o.change && isGuide(m, ch)) s -= 1.5;
      if (o.change && prev != null && Math.abs(m - prev) <= 2) s -= 0.8;
      if (o.last && isGuide(m, ch)) s -= 0.6;
      if (ten) s += o.color ? 0.1 : 0.6;
      if (blue) s += 0.5;
      s += Math.random() * 0.9;
      if (s < bs) {
        bs = s;
        best = m;
      }
    }
    return best ?? clamp(Math.round(w), this.lo, this.hi);
  }
  upper(T, ch) {
    const u = stepAllowed(T, 1, ch, 'W');
    return u - T <= 2 ? u : T + 1;
  }
  nextCT(m, dir, ch) {
    for (let k = m + dir; Math.abs(k - m) <= 12; k += dir)
      if (isChordTone(k, ch)) return k;
    return m + dir * 2;
  }
  between(a, T, ch, e = {}) {
    if (T == null) return stepAllowed(a, this.dir, ch, 'W');
    if (e.len != null && e.len <= 0.26) {
      const dd = Math.sign(T - a) || this.dir;
      return Math.abs(T - a) <= 1 ? a + dd : stepAllowed(a, dd, ch, 'W');
    }
    const opts = [];
    if (T - 1 !== a) opts.push([T - 1, 0.32]); // 반음 아래에서 접근
    const up = stepAllowed(T, 1, ch, 'W');
    if (up - T <= 2 && up !== a) opts.push([up, 0.22]); // 음계 위에서
    if (T + 1 !== a && !inSet(T + 1, ch, 'W')) opts.push([T + 1, 0.08]); // 반음 위에서
    if (Math.abs(T - a) >= 3) { // 사이 경과음
      const dd = Math.sign(T - a),
        mid = (a + T) / 2;
      let bm = null;
      for (let m = a + dd; m !== T; m += dd)
        if (inSet(m, ch, 'W') && (bm == null || Math.abs(m - mid) < Math.abs(bm - mid))) bm = m;
      if (bm != null) opts.push([bm, 0.42]);
    }
    if (T === a) opts.push([stepAllowed(a, 1, ch, 'W'), 0.5], [a - 1, 0.5]);
    if (this.blues)
      for (const m of [T - 1, T + 1])
        if (m !== a && (mod12(m - this.keyPc) === 3 || mod12(m - this.keyPc) === 6) && this.blueOk(m, ch, false)) opts.push([m, 0.18]);
    if (!opts.length) opts.push([stepAllowed(a, Math.sign(T - a) || 1, ch, 'W'), 1]);
    return wpick(opts);
  }
  // 혀·셈여림·끝맺음: 뒷박은 혀를 쳐 세게, 정박은 앞 뒷박에서 이어 여리게, 꼭대기 음 강세, 끝음은 비브라토·폴·두잇
  dress(ev, I, o = {}) {
    const base = clamp(0.6 + 0.3 * I, 0.55, 0.92),
      n = ev.length;
    let pi = 0;
    ev.forEach((e, i) => {
      if (e.m > ev[pi].m) pi = i;
    });
    ev.forEach((e, i) => {
      const p = ev[i - 1],
        q = ev[i + 1],
        gap = p ? e.B - (p.B + p.len) : 1;
      if (!e.art) {
        let tongue = i === 0 || gap > 0.01 || !e.strong || e.trip === 0 || (p && (e.m === p.m || Math.abs(e.m - p.m) >= 7));
        if (e.trip === 1 || e.trip === 2) tongue = false;
        if (e.len <= 0.26 && i > 0 && gap <= 0.01 && e.m !== p.m) tongue = Math.round((e.B - ev[0].B) * 4) % 4 === 0;
        if (this.straight && !tongue && Math.random() < 0.45) tongue = true;
        e.art = tongue ? 'tongue' : 'slur';
      }
      if (e.d == null) {
        let d = base + (e.strong ? -0.05 : 0.08);
        if (i === pi) d += 0.14;
        if (i === 0) d += 0.06;
        if (e.strong && p && q && e.m < p.m && e.m < q.m && e.len <= 0.5) {
          d -= 0.16;
          e.ghost = true;
        }
        e.d = clamp(d, 0.42, 1.08);
      }
    });
    const L = ev[n - 1];
    if (!L.end) L.end = 'release';
    const sec = L.len * this.spb;
    if (sec >= 0.45 && L.vib == null) L.vib = true;
    if (L.end === 'release') {
      if (o.fallOK && L.m >= 72 && sec >= 0.3 && Math.random() < 0.18 + I * 0.3) L.end = 'fall';
      else if (sec < 0.55 && Math.random() < 0.05 + I * 0.06) L.end = 'doit';
    }
    if (sec > 0.9 && I > 0.5 && Math.random() < 0.4) L.swell = 0.14;
    if (L.m >= 70 && L.scoop == null && Math.random() < 0.3) L.scoop = -1;
  }
  // 긴 음이 화음 바뀌는 데를 넘어가며 안 맞게 되면 그 박에서 가까운 맞는 음으로 슬러
  fixLong(ev) {
    const out = [];
    for (const e of ev) {
      out.push(e);
      if (e.len < 1 || e.ripTo) continue;
      let cur = e;
      const end = e.B + e.len;
      for (let B = Math.floor(e.B + 1e-6) + 1; B < end - 0.3; B++) {
        const ch = this.ch(B);
        if (this.okNote(cur.m, ch, true) || (this.okNote(cur.m, ch, false) && !this.ctx.isChange(B))) continue;
        const nx = {
          B,
          len: end - B,
          m: nearestAllowed(cur.m, ch, 'S', -1),
          art: 'slur',
          d: cur.d,
          strong: true
        };
        for (const k of ['end', 'vib', 'vibAt', 'swell', 'last'])
          if (cur[k] != null) {
            nx[k] = cur[k];
            delete cur[k];
          }
        if (cur.shake) {
          nx.shake = {
            ...cur.shake,
            at: Math.max(0, cur.shake.at - (B - cur.B))
          };
          delete cur.shake;
        }
        cur.len = B - cur.B;
        out.push(nx);
        cur = nx;
      }
    }
    return out;
  }
  // 짧게 부르기 (낮은 세기, 동기로 남겨 둠)
  call(B0, I) {
    const pat = pick(this.straight ? CALLS_ST : CALLS_SW);
    const ev = pat.map(([p, len]) => ({
      B: B0 + p,
      len,
      strong: this.isInt(B0 + p)
    }));
    ev[ev.length - 1].last = true;
    const shape = pick(['arch', 'desc', 'asc']),
      start = clamp(this.center(I) + rand(-3, 4), this.lo + 2, this.top(I) - 3);
    this.pitchLine(ev, I, {
      shape,
      start
    });
    this.dress(ev, I, {
      fallOK: I > 0.5
    });
    this.motif = {
      pat,
      shape,
      start,
      off: B0 - this.ctx.barStart(B0 - 3.99)
    };
    this.motifN = 1;
    return ev;
  }
  // 같은 리듬으로 다시 (음은 지금 화음에 맞춰 옮김): 질문과 대답
  seq(B, I) {
    const M = this.motif;
    let B0 = this.ctx.barStart(B - 3.99) + M.off;
    if (B0 < B - 1e-6) B0 += 4;
    const ev = M.pat.map(([p, len]) => ({
      B: B0 + p,
      len,
      strong: this.isInt(B0 + p)
    }));
    ev[ev.length - 1].last = true;
    const start = clamp(M.start + pick([-4, -3, -2, 2, 3, 5]), this.lo + 2, this.top(I) - 3);
    this.pitchLine(ev, I, {
      shape: M.shape,
      start
    });
    this.dress(ev, I, {
      fallOK: I > 0.5
    });
    M.start = start;
    if (++this.motifN >= 3) this.motif = null;
    return ev;
  }
  // 리프: 같은 리듬 동기를 한 마디마다 세 번 → 세 번째에 드러머가 같이 침 → 이어서 대답
  riff(B0, I) {
    const cell = pick(this.straight ? RIFF_ST : RIFF_SW);
    let S0 = this.ctx.barStart(B0 - 0.01);
    if (S0 - B0 > 2.5) S0 -= 4;
    if (S0 < B0 - 1e-6) S0 += 4;
    const top = this.top(I),
      useBlues = this.blues && Math.random() < 0.65;
    const shapeB = pick([
      [10, 12, 10, 7],
      [7, 10, 12, 10],
      [3, 4, 7, 10],
      [12, 10, 7, 7],
      [7, 7, 10, 12]
    ]);
    const steps = pick([
      [0, 1, 2, 1],
      [2, 1, 0, 0],
      [0, 2, 1, 0],
      [0, 1, 0, 2]
    ]);
    const baseKey = this.fit(this.keyPc + 12 * Math.round((lerp(this.center(I), top, 0.4) - this.keyPc - 7) / 12));
    const ev = [];
    for (let k = 0; k < 3; k++) {
      const Sk = S0 + k * 4,
        ch = this.ch(Sk + cell[0][0]);
      const ct = this.tone(ch, lerp(this.center(I), top, 0.45), this.last, {});
      const cts = [];
      for (let m = ct; cts.length < 4 && m <= this.hi; m++)
        if (isChordTone(m, ch)) cts.push(m);
      cell.forEach(([p, len], i) => {
        const B = Sk + p,
          chB = this.ch(B),
          strong = this.isInt(B);
        let m = useBlues ? baseKey + shapeB[i % shapeB.length] : (cts[steps[i % steps.length]] ?? ct);
        if (!this.okNote(m, chB, strong)) m = nearestAllowed(m, chB, strong ? 'S' : 'W', 1);
        ev.push({
          B,
          len,
          m,
          strong,
          stmt: k
        });
      });
      const L = ev[ev.length - 1];
      L.end = 'release';
      L.last = true;
    }
    for (let k = 0; k < 3; k++) {
      const part = ev.filter(e => e.stmt === k);
      this.dress(part, I, {});
      part[part.length - 1].vib = false;
      part[part.length - 1].end = 'release';
    }
    this.last = ev[ev.length - 1].m;
    return ev.concat(this.line(S0 + 12, clamp(Math.round(lerp(3, 6, I)), 3, 6), I, {
      shape: 'desc'
    }));
  }
  bluesLick(B0, I) {
    const L = pick(BLUES_LICKS),
      st = this.isInt(B0) ? B0 : B0 + 0.5;
    const base = this.fit(this.keyPc + 12 * Math.round((this.center(I) - 5 - this.keyPc) / 12));
    const ev = L.map(([p, len, deg, g]) => {
      const B = st + p,
        ch = this.ch(B),
        strong = this.isInt(B);
      let m = base + deg;
      if (!this.okNote(m, ch, strong)) m = nearestAllowed(m, ch, strong ? 'S' : 'W', 1);
      const e = {
        B,
        len,
        m,
        strong
      };
      if (g && m === base + deg) e.grace = g;
      return e;
    });
    ev[ev.length - 1].last = true;
    this.dress(ev, I, {
      fallOK: true
    });
    this.last = ev[ev.length - 1].m;
    return ev;
  }
  // 긴 음: 못갖춘 한 음 → 박에서 스쿱으로 들어가 비브라토 (세질 땐 셰이크)
  longTone(B0, I) {
    const st = this.isInt(B0) ? B0 + 0.5 : B0,
      Bl = st + 0.5,
      ch = this.ch(Bl);
    const H = this.tone(ch, lerp(this.center(I), this.top(I), 0.65), this.last, {
      color: Math.random() < 0.4
    });
    const len = this.slow ? pick([2, 2.5, 3]) : pick([2, 2.5, 3, 3.5]);
    const ev = [{
      B: st,
      len: 0.5,
      m: Math.random() < 0.5 ? H - 1 : stepAllowed(H, -1, this.ch(st), 'W'),
      strong: false
    }, {
      B: Bl,
      len,
      m: H,
      strong: true,
      last: true
    }];
    this.dress(ev, I, {
      fallOK: true
    });
    const L = ev[1];
    L.scoop = I > 0.35 ? -1.5 : -0.8;
    L.vib = true;
    L.art = 'tongue';
    if (I > 0.72 && H >= 74 && Math.random() < 0.5) L.shake = {
      at: 0.6,
      len: Math.max(0.9, len * 0.45),
      iv: 3
    };
    this.last = H;
    return ev;
  }
  // 두 배 빠르기: 묶음마다 방향을 바꾸며(위로 분산화음, 아래로 음계) 점점 올라감 → 밴드도 더블타임
  double(B0, I, o = {}) {
    const step = this.bpm <= 172 ? 0.25 : 1 / 3,
      g = step === 0.25 ? 4 : 3;
    const st = this.isInt(B0) ? B0 : B0 + 0.5;
    const land = o.land ?? (st + (this.bpm <= 172 ? pick([3, 4]) : pick([3, 4, 5])));
    const n = Math.max(g * 2, Math.round((land - st) / step));
    const ev = [];
    let m = clamp(Math.round(this.center(I)) - 3, this.lo + 2, this.hi - 12),
      dir = 1;
    for (let k = 0; k < n; k++) {
      const B = st + k * step,
        ch = this.ch(B),
        first = k % g === 0;
      if (k && first) {
        dir = -dir;
        if (dir > 0) m = clamp(m + 2, this.lo, this.hi - 7);
      }
      if (k && !(first && dir > 0)) m = dir > 0 ? this.nextCT(m, 1, ch) : stepAllowed(m, -1, ch, 'W');
      m = clamp(m, this.lo, this.hi);
      ev.push({
        B,
        len: step,
        m,
        strong: first,
        straight: true
      });
    }
    const Bf = st + n * step;
    ev.push({
      B: Bf,
      len: o.landLen ?? pick([1.5, 2]),
      m: this.tone(this.ch(Bf), Math.min(this.hi - 2, m + 3), m, {
        change: true
      }),
      strong: true,
      last: true
    });
    this.dress(ev, Math.max(I, 0.8), {
      fallOK: true
    });
    ev.forEach((e, i) => {
      if (i < ev.length - 1) {
        e.art = i % g === 0 ? 'tongue' : 'slur';
        e.d = clamp(0.74 + 0.2 * I + (i % g === 0 ? 0.08 : 0), 0.5, 1.05);
        e.ghost = false;
      }
    });
    this.last = ev[ev.length - 1].m;
    return ev;
  }
  // 절정: 낮은 음에서 립으로 꼭대기까지 → 길게 셰이크 → 폴 (게이지가 차 있으면 트럼펫 두 대)
  climax(B0, I) {
    const Bh = this.isInt(B0) ? B0 + 1 : B0 + 0.5,
      ch = this.ch(Bh);
    const cands = [];
    for (let m = 79; m <= Math.min(this.hi, 86); m++)
      if (isChordTone(m, ch) || inSet(m, ch, 'S')) cands.push(m);
    const H = cands.length ? (Math.random() < 0.65 ? cands[Math.min(cands.length - 1, randi(0, 2))] : pick(cands)) : 81;
    const chL = this.ch(Bh - 0.5);
    let L = H - 19;
    for (let k = 0; k < 6 && !isChordTone(L, chL); k++) L--;
    L = clamp(L, this.lo, H - 12);
    const hold = this.fast ? pick([4, 5]) : this.slow ? pick([2, 2.5]) : pick([3, 3.5, 4]);
    const ev = [{
      B: Bh - 0.5,
      len: 0.5,
      m: L,
      strong: false,
      art: 'tongue',
      d: 0.82,
      ripTo: H
    },
    {
      B: Bh,
      len: hold,
      m: H,
      strong: true,
      last: true,
      art: 'slur',
      d: 1.06,
      vib: true,
      vibAt: 0.3,
      special: true,
      shake: {
        at: Math.min(1, hold * 0.3),
        len: Math.max(0.9, hold * 0.45),
        iv: 3
      },
      end: Math.random() < 0.6 ? 'fall' : 'release'
    },
    ];
    this.climaxN++;
    this.last = H - 5;
    return ev;
  }
  // 마지막 프레이즈: 가운데로 내려와 화음음에 길게 내려앉음. 손을 넘기기 1~2박 전에 끝
  ending(B0, I) {
    const stop = this.endB - (this.fast ? 2.5 : 1.5),
      len = stop - B0;
    if (len < 2) {
      const ev = [{
        B: B0,
        len: Math.max(1, len),
        m: this.tone(this.ch(B0), this.center(I) - 2, this.last, {
          last: true
        }),
        strong: this.isInt(B0),
        last: true
      }];
      this.dress(ev, I, {
        fallOK: true
      });
      return ev;
    }
    const ev = this.rhythm(B0, len, { endLen: Math.min(len - 0.5, this.fast ? 2.5 : 2) });
    this.pitchLine(ev, I, {
      shape: 'desc',
      center: this.center(I) - 2
    });
    const L = ev[ev.length - 1];
    L.m = this.tone(this.ch(L.B), L.m, ev.length > 1 ? ev[ev.length - 2].m : L.m, {
      last: true
    });
    this.dress(ev, I, {
      fallOK: true
    });
    if (L.m >= 69 && Math.random() < 0.45) L.end = 'fall';
    return ev;
  }
  // 밴드가 2마디 멈춤: 아직 안 낸 음은 버리고, 혼자 치고 나가는 빠른 줄 → 밴드가 돌아오는 첫 박에 높은 음
  breakAt(B0) {
    const land = Math.min(B0 + 8, this.endB - 2);
    if (land - B0 < 3.5) return;
    const keep = AUTO.notes.filter(n => n.B < B0 - 1e-6 || n.ctx !== this.ctx);
    AUTO.notes.length = 0;
    AUTO.notes.push(...keep);
    AUTO.notes.push({
      B: B0,
      len: 0.5,
      m: this.last,
      rest: true,
      ctx: this.ctx,
      strong: true
    });
    const ev = this.double(B0 + 0.5, Math.max(0.85, this.I(B0)), {
      land,
      landLen: Math.min(2, this.endB - 1 - land)
    });
    const L = ev[ev.length - 1];
    L.d = 1.05;
    L.vib = true;
    if (L.m < 76) L.m = this.tone(this.ch(land), 79, L.m, {
      change: true
    });
    this.emit(this.fixLong(ev));
    this.cursor = Math.max(this.cursor, land + L.len + 1.5);
  }
  // 받아치기 한 프레이즈 (엔딩 태그·폰 녹음)
  fillOne(maxLen = 6) {
    const B = this.cursor,
      I = this.I(B);
    let ev = this.blues && Math.random() < 0.5 ? this.bluesLick(B, I) : Math.random() < 0.5 ? this.call(B, I) : this.line(B, clamp(Math.round(rand(3, maxLen)), 3, maxLen), I);
    const keep = [];
    for (const e of ev) {
      if (e.B >= this.endB - 0.25) break;
      keep.push(e);
    }
    if (!keep.length) return;
    const L = keep[keep.length - 1];
    L.len = Math.min(L.len, this.endB - L.B);
    if (!L.end) L.end = 'release';
    this.emit(this.fixLong(keep));
  }
}