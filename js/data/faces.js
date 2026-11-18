export const FACE_DEF = {
  brow: 0,
  browIn: 0,
  lid: 0,
  open: 0.05,
  smile: 0.25,
  width: 0,
  pupil: 1,
  pop: 1,
  skew: 0
};

export const FACES = {
  calm: {
    brow: 0,
    browIn: 0,
    lid: 0,
    open: 0.05,
    smile: 0.25,
    width: 0
  },
  smile: {
    brow: 0.15,
    browIn: 0.05,
    lid: 0.05,
    open: 0.08,
    smile: 0.85,
    width: 0.1
  },
  grin: {
    brow: 0.35,
    browIn: 0,
    lid: 0.15,
    open: 0.55,
    smile: 1,
    width: 0.25
  },
  laugh: {
    brow: 0.45,
    browIn: 0.3,
    lid: 0.82,
    open: 0.85,
    smile: 1,
    width: 0.3
  },
  awe: {
    brow: 1.25,
    browIn: 0.4,
    lid: -0.65,
    open: 1.3,
    smile: -0.1,
    width: -0.3,
    pupil: 0.62,
    pop: 1.13
  },
  wow: {
    brow: 1.05,
    browIn: 0.15,
    lid: -0.5,
    open: 0.95,
    smile: 0.1,
    width: -0.2,
    pupil: 0.72,
    pop: 1.08
  },
  angry: {
    brow: -1.15,
    browIn: -0.8,
    lid: 0.55,
    open: 0.38,
    smile: -1,
    width: -0.18,
    pupil: 0.9,
    pop: 1.03
  },
  stank: {
    brow: -0.7,
    browIn: -0.9,
    lid: 0.45,
    open: 0.25,
    smile: -0.7,
    width: -0.25
  },
  bliss: {
    brow: 0.4,
    browIn: 0.55,
    lid: 0.95,
    open: 0.12,
    smile: 0.7,
    width: 0.05
  },
  ecstasy: {
    brow: 0.9,
    browIn: 0.7,
    lid: 0.9,
    open: 1.05,
    smile: 0.6,
    width: 0.2
  },
  scream: {
    brow: 0.75,
    browIn: -0.2,
    lid: -0.2,
    open: 1.25,
    smile: 0.35,
    width: 0.25,
    pupil: 0.85
  },
  ask: {
    brow: 0.6,
    browIn: 0.25,
    lid: 0,
    open: 0.1,
    smile: 0.35,
    width: 0
  },
  focus: {
    brow: -0.2,
    browIn: -0.25,
    lid: 0.25,
    open: 0.05,
    smile: 0,
    width: 0
  },
  blow: {
    brow: 0.15,
    browIn: 0.2,
    lid: 0.35,
    open: 0.12,
    smile: -0.1,
    width: -0.55
  },
  whistle: {
    brow: 0.5,
    browIn: 0.2,
    lid: 0.2,
    open: 0.3,
    smile: 0,
    width: -0.75
  },
  shout: {
    brow: 0.6,
    browIn: -0.4,
    lid: 0.1,
    open: 1.1,
    smile: 0.1,
    width: 0.1
  },
  nod: {
    brow: 0.2,
    browIn: 0.1,
    lid: 0.3,
    open: 0.06,
    smile: 0.5,
    width: 0.05
  },
  // "와… 너 지금 미쳤냐": 턱이 툭 떨어지고 눈이 휘둥그레, 눈동자는 콩알만 하게
  jawdrop: {
    brow: 1.45,
    browIn: 0.5,
    lid: -0.7,
    open: 2.0,
    smile: -0.2,
    width: -0.14,
    pupil: 0.48,
    pop: 1.2
  },
  // "이게 말이 돼?": 한쪽 눈썹만 치켜뜨고 입은 반쯤 벌어짐
  disbelief: {
    brow: 0.85,
    browIn: 0.05,
    lid: -0.35,
    open: 0.95,
    smile: -0.3,
    width: -0.1,
    pupil: 0.6,
    pop: 1.08,
    skew: 1.1
  },
  // 숨 들이켜는 순간: 동그랗게 벌린 입
  gasp: {
    brow: 1.4,
    browIn: 0.65,
    lid: -0.7,
    open: 1.45,
    smile: -0.3,
    width: -0.62,
    pupil: 0.46,
    pop: 1.22
  },
  // 어이없어서 터지는 웃음: 눈썹은 팔자로 올라가고 입은 크게
  stunlaugh: {
    brow: 1.05,
    browIn: 0.85,
    lid: 0.5,
    open: 1.3,
    smile: 0.8,
    width: 0.15,
    pupil: 0.9,
    pop: 1.0
  },
  // 기절: 눈 감고 입 헤벌림
  out: {
    brow: 0.35,
    browIn: 0.5,
    lid: 1.0,
    open: 0.75,
    smile: -0.25,
    width: -0.05,
    pupil: 1,
    pop: 1
  },
  // 숨 참기: 입술 꾹, 눈알 튀어나옴
  puff: {
    brow: 1.0,
    browIn: 0.55,
    lid: -0.55,
    open: 0.0,
    smile: -0.35,
    width: -0.5,
    pupil: 0.55,
    pop: 1.2
  },
  // 어지러움: 눈은 반쯤, 입은 헤
  dizzy: {
    brow: 0.5,
    browIn: 0.7,
    lid: 0.55,
    open: 0.55,
    smile: 0.25,
    width: 0.05,
    pupil: 0.8,
    pop: 1.0,
    skew: 0.8
  },
  // 울먹임: 눈썹 팔자, 입 삐죽
  teary: {
    brow: 0.9,
    browIn: 1.0,
    lid: 0.35,
    open: 0.35,
    smile: -0.6,
    width: -0.1,
    pupil: 1.05,
    pop: 1.04
  },
};

for (const k in FACES) FACES[k] = Object.assign({}, FACE_DEF, FACES[k]);
export const SHOCK_FACES = new Set(['jawdrop', 'disbelief', 'gasp', 'awe', 'wow']);

// 재질 (모든 사람 공용)
export const PEOPLE_MAT = {};