
// ---------- 즉흥 선율 (트롬본·피아노·베이스 솔로, 내가 쉴 때 채우기) ----------
class Improviser {
  constructor(o) {
    Object.assign(this, {
      lo: 52,
      hi: 72,
      busy: 0.6,
      last: 60,
      dir: 1,
      left: 0,
      rest: 0,
      trip: 0.08,
      blue: false,
      longEnd: true,
      maxLeap: 7
    }, o);
    this.last = Math.round((this.lo + this.hi) / 2);
    this.motif = null;
    this.phraseN = 0;
  }
  // 마디 하나 분량 음표: [{pos, dur, m, v}]
  bar(b, energy = 0.5, from = 0, to = 4) {
    const out = [], straight = b.swing < 0.55;
    const busy = clamp(this.busy + energy * 0.3, 0.1, 1);
    const fast = 60 / b.spb > 190;
    let pos = from;
    while (pos < to - 1e-6) {
      const ch = chordAt(b, pos);
      if (this.rest > 0) {
        const r = Math.min(this.rest, to - pos);
        this.rest -= r;
        pos += r;
        continue;
      }
      if (this.left <= 0) {
        // 새 프레이즈: 길이·방향·가끔 높은 곳에서 시작
        this.left = randi(4, Math.round(5 + busy * (fast ? 6 : 10)));
        if (Math.random() < 0.5) this.dir *= -1;
        this.phraseN++;
        if (Math.random() < 0.25 + energy * 0.3) this.last = clamp(this.last + this.dir * randi(3, 7), this.lo + 2, this.hi - 2);
        if (pos % 1 === 0 && Math.random() < 0.45) {
          pos += 0.5;
          continue;
        } // 엇박 시작
      }
      const onBeat = Math.abs(pos - Math.round(pos)) < 1e-6;
      let n;
      if (onBeat) {
        n = nearestAllowed(this.last + this.dir * randi(1, 3), ch, 'S', this.dir);
        if (Math.random() < 0.35) {
          const g = QUAL[ch.q].guide;
          const cand = [];
          for (let m = this.last - 5; m <= this.last + 5; m++)
            if (g.includes(mod12(m - ch.root))) cand.push(m);
          if (cand.length) n = pick(cand);
        }
      } else {
        if (Math.random() < 0.22) n = this.last + this.dir; // 반음 지나가기
        else n = nearestAllowed(this.last + this.dir * randi(1, 2), ch, 'W', this.dir);
        if (this.blue && Math.random() < 0.15) n = nearestPC(ch.root + pick([3, 6, 10]), this.last, this.lo, this.hi);
      }
      if (n >= this.hi - 1) this.dir = -1;
      if (n <= this.lo + 1) this.dir = 1;
      if (Math.random() < 0.1) this.dir *= -1;
      if (Math.abs(n - this.last) > this.maxLeap) n = this.last + Math.sign(n - this.last) * this.maxLeap;
      n = clamp(n, this.lo, this.hi);
      let len = fast ? (Math.random() < 0.55 ? 1 : 0.5) : 0.5;
      this.left--;
      if (this.left <= 0) {
        len = pick(this.longEnd ? [1, 1.5, 2] : [0.5, 1]);
        n = nearestAllowed(n, chordAt(b, pos), 'S', this.dir);
        this.rest = pick([1, 1.5, 2, 2.5, 3]) * (1.35 - busy);
      } else if (Math.random() < 0.12) len = 1;
      // 셋잇단 꾸밈
      if (!straight && onBeat && Math.random() < this.trip * busy && pos + 1 <= to) {
        const a = n + this.dir * 2, c = n + this.dir;
        out.push({
          pos,
          dur: 1 / 3,
          m: nearestAllowed(a, ch, 'W', this.dir),
          v: 0.85
        }, {
          pos: pos + 1 / 3,
          dur: 1 / 3,
          m: c,
          v: 0.8
        }, {
          pos: pos + 2 / 3,
          dur: 1 / 3,
          m: n,
          v: 0.9
        });
        this.last = n;
        pos += 1;
        continue;
      }
      len = Math.min(len, to - pos);
      out.push({
        pos,
        dur: len,
        m: n,
        v: onBeat ? 0.95 : 0.85
      });
      this.last = n;
      pos += len;
    }
    return out;
  }
}