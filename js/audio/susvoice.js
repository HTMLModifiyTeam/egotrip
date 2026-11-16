
// 지속음 목소리 (트럼펫·트롬본 공용): 고리 샘플 + 음높이 미끄러짐 + 비브라토
class SusVoice {
  constructor(audio, sample, midi, when, dest, o = {}) {
    const ctx = audio.ctx;
    this.s = sample;
    this.midi = midi;
    this.dest = dest;
    const src = ctx.createBufferSource();
    src.buffer = sample.buf;
    if (sample.ls != null) {
      src.loop = true;
      src.loopStart = sample.ls;
      src.loopEnd = sample.le;
    }
    this.rate = rateFor(sample, midi);
    if (o.scoop) {
      src.playbackRate.setValueAtTime(this.rate * Math.pow(2, o.scoop / 12), when);
      src.playbackRate.setTargetAtTime(this.rate, when, (o.scoopTime || 0.03) / 2.5);
    } else src.playbackRate.setValueAtTime(this.rate, when);
    const g = ctx.createGain();
    g.gain.value = 0;
    const lvl = o.level == null ? 1 : o.level,
      fi = o.fadeIn || 0.004;
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(lvl, when + fi);
    // 비브라토
    const lfo = ctx.createOscillator();
    lfo.frequency.value = o.vibRate || rand(5.0, 5.8);
    const lg = ctx.createGain();
    lg.gain.value = 0;
    lfo.connect(lg);
    lg.connect(src.playbackRate);
    let tail = src;
    if (o.filter) {
      tail.connect(o.filter);
      tail = o.filterOut || o.filter;
    }
    tail.connect(g);
    g.connect(dest);
    const off = o.offset != null ? o.offset : (sample.start || 0);
    src.start(when, Math.min(off, (sample.le || sample.buf.duration) - 0.05));
    lfo.start(when);
    trackBandVoice(src, g, dest, lfo);
    Object.assign(this, {
      src,
      g,
      lfo,
      lg,
      t0: when,
      level: lvl,
      dead: false
    });
    src.onended = () => {
      this.dead = true;
      this.ended = true;
      try {
        lfo.stop();
      } catch { }
      try {
        tail.disconnect(g);
      } catch { }
      src.disconnect();
      g.disconnect();
      lfo.disconnect();
      lg.disconnect();
    };
  }
  glideTo(midi, when, time = 0.03) {
    if (this.dead) return;
    this.midi = midi;
    this.rate = rateFor(this.s, midi);
    const p = this.src.playbackRate;
    p.cancelScheduledValues(when);
    p.setTargetAtTime(this.rate, when, Math.max(0.004, time / 2.5));
  }
  // 밸브 바꾸듯 또렷하게: 음높이는 곧바로, 소리는 아주 잠깐 눌렸다가 다시 (d를 주면 셈여림도 같이)
  stepTo(midi, when, d) {
    if (this.ended) return;
    this.midi = midi;
    this.rate = rateFor(this.s, midi);
    const p = this.src.playbackRate;
    p.cancelScheduledValues(when);
    p.setTargetAtTime(this.rate, when, 0.0022);
    if (this.dead) return;
    const lvl = d != null ? dynGain(midi, d) : this.level;
    this.level = lvl;
    const g = this.g.gain;
    g.setTargetAtTime(lvl * 0.7, Math.max(this.t0 + 0.012, when - 0.006), 0.0028);
    g.setTargetAtTime(lvl, when + 0.007, 0.009);
    if (this.f && d != null) {
      this.f.frequency.setTargetAtTime(dynCut(d), when, 0.008);
      this.d = d;
    }
  }
  setDyn(d, when, time = 0.03) {
    if (this.dead) return;
    const lvl = dynGain(this.midi, d);
    this.level = lvl;
    this.d = d;
    this.g.gain.setTargetAtTime(lvl, when, time / 2.5);
    if (this.f) this.f.frequency.setTargetAtTime(dynCut(d), when, time / 2.5);
  }
  bend(semis, when, time) {
    if (this.dead) return;
    const p = this.src.playbackRate;
    p.cancelScheduledValues(when);
    p.setValueAtTime(this.rate, when);
    p.exponentialRampToValueAtTime(this.rate * Math.pow(2, semis / 12), when + time);
  }
  vibrato(depthCents, when, ramp = 0.35) {
    if (this.dead) return;
    const d = this.rate * (Math.pow(2, depthCents / 1200) - 1);
    this.lg.gain.cancelScheduledValues(when);
    this.lg.gain.setTargetAtTime(d, when, ramp);
  }
  setLevel(v, when, time = 0.03) {
    if (this.dead) return;
    this.level = v;
    this.g.gain.cancelScheduledValues(when);
    this.g.gain.setTargetAtTime(v, when, time / 2.5);
  }
  release(when, time = 0.06) {
    if (this.dead) return;
    this.dead = true;
    const g = this.g.gain;
    // 아직 소리가 나기 전이면 아예 취소 (늦게 튀어나오는 소리 없음)
    if (when <= this.t0) {
      g.cancelScheduledValues(0);
      g.setValueAtTime(0, this.t0);
      try {
        this.src.stop(this.t0);
        this.lfo.stop(this.t0 + 0.01);
      } catch { }
      return;
    }
    g.cancelScheduledValues(when);
    // 현재 값 근사
    g.setValueAtTime(when < this.t0 + 0.01 ? this.level * 0.5 : this.level, when);
    g.setTargetAtTime(0, when, time / 3);
    try {
      this.src.stop(when + time * 3 + 0.05);
      this.lfo.stop(when + time * 3 + 0.05);
    } catch { }
  }
}