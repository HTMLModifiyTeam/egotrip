export default class BED {
  TABLE = {}

  constructor(ae) { this.ae = ae; }

  mk(buf, dest, gain) {
    const ctx = this.ae.ctx;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const g = ctx.createGain();
    g.gain.value = gain;
    src.connect(g);
    g.connect(dest);
    src.start();
    return { src, g };
  }

  start() {
    if (this.TABLE.room) return;

    Object.assign(this.TABLE, {
      room: this.mk(this.ae.syn.room, this.ae.buses.room, 0.05),
      applause: this.mk(this.ae.syn.applause, this.ae.buses.crowd, 0),
      applauseBig: this.mk(this.ae.syn.applauseBig, this.ae.buses.crowd, 0),
      roar: this.mk(this.ae.syn.roar, this.ae.buses.cheer, 0),
      babble: this.mk(this.ae.syn.babble, this.ae.buses.crowd, 0)
    })
  }

  set(name, v, time = 0.6) {
    const b = this.TABLE[name];
    const ctx = this.ae.ctx;

    if (!b || !ctx) return;
    const now = ctx.currentTime, tau = time / 3;
    if (Math.abs(v) < 0.0001) v = 0;
    if (b.target != null && (v === b.target || (v !== 0 && Math.abs(b.target - v) < 0.001)) && b.tau === tau) return;
    b.target = v;
    b.tau = tau;
    const gain = b.g.gain;
    if (gain.cancelAndHoldAtTime) gain.cancelAndHoldAtTime(now);
    else {
      const value = gain.value;
      gain.cancelScheduledValues(now);
      gain.setValueAtTime(value, now);
    }
    gain.setTargetAtTime(v, now, tau);
  }
}
