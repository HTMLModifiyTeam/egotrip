export default [
  {
    id: 'f-blues',
    title: '첫 잔',
    key: 'F',
    bpm: 132,
    feel: 'swing',
    sections: 'A12',
    blues: true,
    form: 'F7 | Bb7 | F7 | Cm7 F7 | Bb7 | Bdim7 | F7 | Am7 D7b9 | Gm7 | C7 | F7 D7b9 | Gm7 C7',
    head: {
      inst: 'tbn',
      passes: 2,
      mel: `
      r/.5 C4/.5 Eb4/.5 F4/.5 Ab4/.5 F4/1 Eb4/.5 | D4/1.5 C4/.5 Bb3/1.2 r/.8 |
      r/.5 C4/.5 Eb4/.5 F4/.5 Ab4/.5 F4/.5 Eb4/.5 C4/.5 | Bb3/1 C4/.5 Eb4/.5 A3/1.5 Ab3/.5 |
      r/.5 C4/.5 Eb4/.5 F4/.5 Ab4/.5 F4/1 Eb4/.5 | D4/1.5 F4/.5 Ab4/1 F4/1 |
      r/.5 C4/.5 Eb4/.5 F4/.5 Ab4/.5 F4/.5 Eb4/.5 C4/.5 | C4/1 A3/.5 C4/.5 F#4/1.5 Eb4/.5 |
      D4/1 F4/.5 G4/.5 Bb4/.5 A4/.5 G4/.5 F4/.5 | E4/1 G4/.5 Bb4/.5 A4/1 G4/.5 E4/.5 |
      F4/1.5 Eb4/.5 F#4/1 Eb4/.5 D4/.5 | D4/1 Bb3/1 E4/1 G4/1`
    },
    ending: 'tag',
    solos: ['tbn', 'pno', 'bass'],
    trades: false
  },
  {
    id: 'ssibal-bb',
    title: '씨발',
    key: 'Bb',
    bpm: 230,
    feel: 'swing',
    sections: 'A12',
    blues: true,
    form: 'C#maj7 | F#m7b5 | B7#9 | Ebm9 Ab13 | Gmaj7 | C#dim7 | Dbmaj7 | Dbmaj7 | Dbmaj7 | Bm7 E7b9 | Dbmaj7 | G#7#11 | C7b9 F#maj7 | Bbm7 E13',
    head: {
      inst: 'tbn',
      passes: 2,
      mel: `
      C#5/1 D4/.5 F#5/.5 | r/.25 Gb4/.25 B5/1 C4/1.5 |
      F#4/.5 C5/.5 E5/.5 Bb3/.5 Db5/1 | G#5/1 D4/1 F5/1 E3/1 |
      r/.5 C#5/.5 G3/1 B5/1.5 | Eb4/.5 A4/.5 F#5/1 C4/2 |
      D5/.25 Db5/.25 G4/.5 B5/.5 F3/.5 | r/1 G#5/.5 C4/.5 F#5/1 |
      Bb3/.5 E5/.5 C#4/.5 G5/.5 Db5/1 | F4/1 B5/.5 Eb4/.5 A#5/1 |
      C#5/1 G3/.5 F#5/.5 Bb4/1 | D5/.5 Ab3/.5 E5/1 C#4/1`
    },
    ending: 'button',
    solos: ['tbn', 'pno'],
    trades: true
  },
  {
    id: 'screaming-f',
    title: 'SCREAMING SONG',
    key: 'F',
    bpm: 280,
    feel: 'swing',
    sections: 'A12',
    blues: true,
    form: 'F7 | Bb7 | F7 | Cm7 F7 | Bb7 | Bdim7 | F7 | Am7 D7 | Gm7 | C7 | F7 D7 | Gm7 C7',
    head: {
      inst: 'tbn',
      passes: 2,
      mel: `
      F5/2 Eb5/.5 C5/.5 A4/1 | Bb4/.5 Bb4/.5 D5/.5 F5/.5 Eb5/2 |
      A4/.5 C5/.5 Eb5/.5 F5/.5 F5/2 | r/1 C5/.5 C5/.5 Eb5/.5 Eb5/.5 F5/1 |
      D5/.5 D5/.5 F5/2 r/1 | E5/.5 Eb5/.5 D5/.5 Db5/.5 C5/2 |
      F5/3.5 r/.5 | r/.5 E5/.5 E5/.5 G5/.5 F#5/2 |
      G5/1.5 F5/.5 D5/1 Bb4/1 | E5/.5 E5/.5 E5/.5 G5/.5 G5/2 |
      F5/1 A4/.5 C5/.5 F5/1 r/1 | G4/.5 Bb4/.5 D5/.5 F5/.5 E5/1 r/1`
    },
    ending: 'button',
    solos: ['tbn', 'pno'],
    trades: true
  },
  {
    id: 'autumn-g',
    title: '늦가을',
    key: 'G',
    bpm: 168,
    feel: 'swing',
    sections: 'A8 A8 B8 C8',
    form: `Cm7 | F7 | Bbmaj7 | Ebmaj7 | Am7b5 | D7b9 | Gm7 | Gm7 |
           Cm7 | F7 | Bbmaj7 | Ebmaj7 | Am7b5 | D7b9 | Gm7 | Gm7 |
           Am7b5 | D7b9 | Gm7 | Gm7 | Cm7 | F7 | Bbmaj7 | Ebmaj7 |
           Am7b5 | D7b9 | Gm7 Gb7 | Fm7 E7 | Ebmaj7 | Am7b5 D7b9 | Gm7 | Gm7`,
    head: {
      inst: 'tbn',
      passes: 1,
      mel: `
      r/.5 C4/.5 Eb4/.5 G4/.5 Bb4/.5 G4/.5 r/.5 A4/.5~ | A4/1.5 G4/.5 F4/.5 Eb4/.5 C4/1 |
      r/.5 Bb3/.5 D4/.5 F4/.5 r/.5 A4/1 G4/.5~ | G4/2 F4/.5 Eb4/.5 D4/.5 Bb3/.5 |
      r/.5 A3/.5 C4/.5 Eb4/.5 r/.5 G4/1 F#4/.5~ | F#4/1.5 Eb4/.5 D4/.5 C4/.5 A3/1 |
      r/.5 Bb3/.5 D4/.5 F4/.5 A4/1 G4/1~ | G4/2 r/2 |
      r/.5 C4/.5 Eb4/.5 G4/.5 Bb4/.5 G4/.5 Eb4/.5 A4/.5~ | A4/1 G4/.5 F4/.5 Eb4/1 C4/1 |
      r/.5 Bb3/.5 D4/.5 F4/.5 r/.5 A4/1 G4/.5~ | G4/1.5 F4/.5 Eb4/1 r/1 |
      r/.5 A3/.5 C4/.5 Eb4/.5 r/.5 G4/1 F#4/.5~ | F#4/1 A4/.5 F#4/.5 Eb4/1 C4/1 |
      Bb3/1 r/.5 D4/.5 G4/2~ | G4/2 r/2 |
      C4/1 Eb4/1 G4/2 | F#4/1.5 Eb4/.5 r/1 C4/1 |
      Bb3/2 r/1 D4/.5 F4/.5 | A4/1 G4/.5 F4/.5 D4/1 r/1 |
      r/.5 G4/.5 Bb4/.5 G4/.5 Eb4/1 D4/.5 C4/.5 | A3/1 C4/.5 Eb4/.5 r/.5 D4/1 C4/.5~ |
      C4/1.5 D4/.5 F4/1 A4/1 | G4/2 r/2 |
      r/.5 A3/.5 C4/.5 Eb4/.5 r/.5 G4/1 F#4/.5~ | F#4/1.5 Eb4/.5 D4/.5 C4/.5 A3/1 |
      r/.5 Bb3/.5 D4/1 r/.5 Bb3/.5 Db4/1 | r/.5 Ab3/.5 C4/1 r/.5 G#3/.5 B3/1 |
      Bb3/1 Eb4/.5 G4/.5 Bb4/1.5 A4/.5 | G4/1 Eb4/1 F#4/1 C4/1 |
      D4/1.5 Bb3/.5 G3/2~ | G3/2 r/2`
    },
    ending: 'tag',
    solos: ['pno', 'tbn', 'bass'],
    trades: false
  },
  {
    id: 'FUCK-bb',
    title: 'FUCK',
    key: 'Bb',
    bpm: 522,
    feel: 'swing',
    sections: 'A12',
    blues: true,
    form: 'Bb7',
    head: {
      inst: 'tpt',
      passes: 1,
      mel: `A7/0.0625 r/0.0625 A7/0.0625`
    },
    ending: 'crash',
    solos: ['tbn', 'pno'],
    trades: false
  },
  {
    id: 'bossa-c',
    title: '저녁 바람',
    key: 'C',
    bpm: 140,
    feel: 'bossa',
    sections: 'A16',
    form: 'Cm7 | Cm7 | Fm7 | Fm7 | Dm7b5 | G7alt | Cm7 | Cm7 | Ebm7 | Ab7 | Dbmaj7 | Dbmaj7 | Dm7b5 | G7alt | Cm7 | Dm7b5 G7alt',
    head: {
      inst: 'pno',
      passes: 2,
      mel: `
      G4/1.5 C5/1 Bb4/1.5~ | Bb4/2 G4/1 Eb4/1 |
      C4/1.5 F4/1 Eb5/1.5~ | Eb5/2 C5/1 Ab4/1 |
      r/.5 F4/1 Ab4/1 C5/1.5 | B4/1.5 Ab4/1 Eb4/1.5 |
      D4/1.5 Eb4/2.5~ | Eb4/2 r/2 |
      Bb4/1.5 Eb5/1 Db5/1.5 | C5/2 Gb4/1 Eb4/1 |
      F4/1.5 Ab4/1 C5/1.5~ | C5/2 Bb4/1 Ab4/1 |
      r/.5 F4/1 Ab4/1 C5/1.5 | B4/1.5 Ab4/1 F4/1.5 |
      Eb4/1.5 D4/1 C4/1.5~ | C4/2 r/1.5 Ab4/.5`
    },
    ending: 'vampfade',
    solos: ['pno', 'tbn'],
    trades: false
  },
  {
    id: 'rhythm-bb',
    title: '빠른 걸음',
    key: 'Bb',
    bpm: 208,
    feel: 'swing',
    sections: 'A8 A8 B8 A8',
    form: `Bb6 G7 | Cm7 F7 | Dm7 G7 | Cm7 F7 | Fm7 Bb7 | Eb7 Edim7 | Dm7 G7 | Cm7 F7 |
           Bb6 G7 | Cm7 F7 | Dm7 G7 | Cm7 F7 | Fm7 Bb7 | Eb7 Edim7 | Dm7 G7 | Cm7 F7 |
           D7 | D7 | G7 | G7 | C7 | C7 | F7 | F7 |
           Bb6 G7 | Cm7 F7 | Dm7 G7 | Cm7 F7 | Fm7 Bb7 | Eb7 Edim7 | Cm7 F7 | Bb6`,
    head: {
      inst: 'tbn',
      passes: 1,
      mel: `
      r/.5 D4/.5 F4/.5 G4/1 F4/.5 D4/.5 F4/.5~ | F4/1 D4/.5 C4/1 r/1.5 |
      r/.5 D4/.5 F4/.5 G4/1 F4/.5 D4/.5 F4/.5~ | F4/1 D4/.5 C4/1 r/1.5 |
      Ab4/.5 F4/.5 Eb4/.5 C4/.5 D4/.5 F4/.5 Ab4/.5 G4/.5~ | G4/1 Db4/1 E4/.5 G4/.5 Bb4/.5 G4/.5 |
      F4/.5 A4/.5 F4/.5 D4/.5 B3/1 D4/.5 F4/.5 | Eb4/1 r/.5 C4/.5 A3/1 r/1 |
      r/.5 D4/.5 F4/.5 G4/1 F4/.5 D4/.5 F4/.5~ | F4/1 D4/.5 C4/1 r/1.5 |
      r/.5 D4/.5 F4/.5 G4/1 F4/.5 D4/.5 F4/.5~ | F4/1 D4/.5 C4/1 r/1.5 |
      Ab4/.5 F4/.5 Eb4/.5 C4/.5 D4/.5 F4/.5 Ab4/.5 G4/.5~ | G4/1 Db4/1 E4/.5 G4/.5 Bb4/.5 G4/.5 |
      F4/.5 A4/.5 F4/.5 D4/.5 B3/1 D4/.5 F4/.5 | Eb4/1 r/.5 C4/.5 A3/.5 C4/.5 Eb4/.5 F#4/.5~ |
      F#4/2 r/.5 A4/1 F#4/.5 | E4/1 C4/1 r/1.5 F4/.5~ |
      F4/1.5 E4/.5 D4/1 B3/1 | r/.5 D4/.5 F4/.5 Ab4/.5 G4/1 F4/1 |
      E4/2 r/.5 G4/1 E4/.5 | D4/1 Bb3/1 r/1.5 Eb4/.5~ |
      Eb4/1.5 D4/.5 C4/1 A3/1 | r/.5 C4/.5 Eb4/.5 E4/.5 F4/1 Eb4/.5 C4/.5 |
      r/.5 D4/.5 F4/.5 G4/1 F4/.5 D4/.5 F4/.5~ | F4/1 D4/.5 C4/1 r/1.5 |
      r/.5 D4/.5 F4/.5 G4/1 F4/.5 D4/.5 F4/.5~ | F4/1 D4/.5 C4/1 r/1.5 |
      Ab4/.5 F4/.5 Eb4/.5 C4/.5 D4/.5 F4/.5 Ab4/.5 G4/.5~ | G4/1 Db4/1 E4/.5 G4/.5 Bb4/.5 G4/.5 |
      C4/.5 Eb4/.5 G4/.5 Bb4/.5 A4/.5 F4/.5 Eb4/.5 C4/.5 | D4/1 r/1 Bb3/1 r/1`
    },
    ending: 'button',
    solos: ['tbn', 'pno'],
    trades: true
  },
  {
    id: 'ballad-eb',
    title: '늦은 편지',
    key: 'Eb',
    bpm: 64,
    feel: 'ballad',
    sections: 'A8 A8 B8 A8',
    form: `Ebmaj7 Cm7 | Fm7 Bb7 | Gm7 C7b9 | Fm7 Bb7 | Ebmaj7 Eb7 | Abmaj7 Db7 | Gm7 C7 | Fm7 Bb7 |
           Ebmaj7 Cm7 | Fm7 Bb7 | Gm7 C7b9 | Fm7 Bb7 | Ebmaj7 Eb7 | Abmaj7 Db7 | Fm7 Bb7 | Ebmaj7 |
           Am7b5 D7b9 | Gm7 | Am7b5 D7b9 | Gm7 C7 | Fm7 | Bb7sus Bb7 | Gm7 C7b9 | Fm7 Bb7 |
           Ebmaj7 Cm7 | Fm7 Bb7 | Gm7 C7b9 | Fm7 Bb7 | Ebmaj7 Eb7 | Abmaj7 Db7 | Fm7 Bb7 | Eb6`,
    head: {
      inst: 'tbn',
      passes: 1,
      mel: `
      Bb3/1 G4/1.5 F4/.5 Eb4/1 | Ab3/1 F4/1.5 Eb4/.5 D4/1 |
      G3/1 Bb3/1.5 C4/.5 Bb3/1 | Ab3/3 r/1 |
      G4/1 Bb4/1.5 Ab4/.5 G4/1 | Eb4/1.5 C4/.5 F4/1.5 Eb4/.5 |
      D4/1.5 Bb3/.5 E4/1.5 G4/.5 | F4/1 Ab4/1 G4/1.5 F4/.5 |
      Bb3/1 G4/1.5 F4/.5 Eb4/1 | Ab3/1 F4/1 D4/1.5 C4/.5 |
      G3/1 Bb3/1.5 C4/.5 Bb3/1 | Ab3/3 r/1 |
      G4/1 Bb4/1.5 Ab4/.5 G4/1 | Eb4/1.5 C4/.5 F4/1.5 Eb4/.5 |
      Ab3/1 C4/1 D4/1.5 F4/.5 | G4/3 r/1 |
      C4/1 Eb4/1 F#4/1.5 Eb4/.5 | D4/3 r/.5 C4/.5 |
      Eb4/1 G4/1 A4/1.5 F#4/.5 | Bb4/2 A4/1 G4/1 |
      Ab4/2 G4/1 F4/1 | Eb4/2 D4/2 |
      D4/1 F4/1 E4/1 Db4/1 | C4/2 D4/1.5 r/.5 |
      Bb3/1 G4/1.5 F4/.5 Eb4/1 | Ab3/1 F4/1.5 Eb4/.5 D4/1 |
      G3/1 Bb3/1.5 C4/.5 Bb3/1 | Ab3/3 r/1 |
      G4/1 Bb4/1.5 Ab4/.5 G4/1 | Eb4/1.5 C4/.5 F4/1.5 Eb4/.5 |
      Ab3/1 C4/1 D4/1.5 F4/.5 | G4/1 Eb4/3`
    },
    ending: 'rit',
    solos: ['pno', 'tbn'],
    trades: false
  },
  {
    id: 'modal-d',
    title: '깊은 물',
    key: 'D',
    bpm: 138,
    feel: 'swing',
    sections: 'A8 A8 B8 A8',
    form: `Dm7 | Dm7 | Dm7 | Dm7 | Dm7 | Dm7 | Dm7 | Dm7 |
           Dm7 | Dm7 | Dm7 | Dm7 | Dm7 | Dm7 | Dm7 | Dm7 |
           Ebm7 | Ebm7 | Ebm7 | Ebm7 | Ebm7 | Ebm7 | Ebm7 | Ebm7 |
           Dm7 | Dm7 | Dm7 | Dm7 | Dm7 | Dm7 | Dm7 | Dm7`,
    head: {
      inst: 'bass+tbn',
      passes: 1,
      mel: `
      b:D2/1 r/.5 b:A2/.5 b:C3/.5 b:D3/1 b:A2/.5 | b:F2/1 b:G2/.5 b:F2/.5 b:E2/1 r/1 |
      r/.5 A3/.5 C4/.5 E4/.5 r/.5 D4/1 C4/.5~ | C4/1 A3/1 r/2 |
      b:D2/1 r/.5 b:A2/.5 b:C3/.5 b:D3/1 b:F3/.5 | b:E3/1 b:D3/.5 b:C3/.5 b:A2/1 r/1 |
      r/.5 F4/.5 E4/.5 D4/.5 r/.5 A3/1 C4/.5~ | C4/1 D4/1 r/2 |
      b:D2/1 r/.5 b:A2/.5 b:C3/.5 b:D3/1 b:A2/.5 | b:F2/1 b:G2/.5 b:F2/.5 b:E2/1 r/1 |
      r/.5 A3/.5 C4/.5 E4/.5 r/.5 G4/1 F4/.5~ | F4/1 E4/.5 C4/.5 D4/1 r/1 |
      b:D2/1 r/.5 b:A2/.5 b:C3/.5 b:D3/1 b:F3/.5 | b:E3/1 b:D3/.5 b:C3/.5 b:A2/1 r/1 |
      r/.5 F4/.5 E4/.5 D4/.5 r/.5 A3/1 C4/.5~ | C4/1 D4/1 r/2 |
      b:Eb2/1 r/.5 b:Bb2/.5 b:Db3/.5 b:Eb3/1 b:Bb2/.5 | b:Gb2/1 b:Ab2/.5 b:Gb2/.5 b:F2/1 r/1 |
      r/.5 Bb3/.5 Db4/.5 F4/.5 r/.5 Eb4/1 Db4/.5~ | Db4/1 Bb3/1 r/2 |
      b:Eb2/1 r/.5 b:Bb2/.5 b:Db3/.5 b:Eb3/1 b:Gb3/.5 | b:F3/1 b:Eb3/.5 b:Db3/.5 b:Bb2/1 r/1 |
      r/.5 Gb4/.5 F4/.5 Eb4/.5 r/.5 Bb3/1 Db4/.5~ | Db4/1 Eb4/1 r/2 |
      b:D2/1 r/.5 b:A2/.5 b:C3/.5 b:D3/1 b:A2/.5 | b:F2/1 b:G2/.5 b:F2/.5 b:E2/1 r/1 |
      r/.5 A3/.5 C4/.5 E4/.5 r/.5 D4/1 C4/.5~ | C4/1 A3/1 r/2 |
      b:D2/1 r/.5 b:A2/.5 b:C3/.5 b:D3/1 b:F3/.5 | b:E3/1 b:D3/.5 b:C3/.5 b:A2/1 r/1 |
      r/.5 F4/.5 E4/.5 D4/.5 r/.5 A3/1 C4/.5~ | C4/1 E4/.5 C4/.5 D4/1 r/1`
    },
    ending: 'cold',
    solos: ['pno', 'bass', 'tbn'],
    trades: false
  },
  {
    id: 'shuffle-bb',
    title: '느린 계단',
    key: 'Bb',
    bpm: 92,
    feel: 'shuffle',
    sections: 'A12',
    blues: true,
    form: 'Bb7 | Eb7 | Bb7 | Bb7 | Eb7 | Edim7 | Bb7 | G7 | Cm7 | F7 | Bb7 G7 | Cm7 F7',
    head: {
      inst: 'tbn',
      passes: 2,
      mel: `
      r/.5 Db4/.5 D4/.5 F4/.5 Ab4/1 F4/1 | G4/1.5 F4/.5 Db4/1 r/1 |
      r/.5 Db4/.5 D4/.5 F4/.5 Ab4/.5 Bb4/.5 Ab4/.5 F4/.5 | Db4/.5 D4/.5 Bb3/1 r/2 |
      r/.5 Gb3/.5 G3/.5 Bb3/.5 Db4/1 Bb3/1 | Db4/1.5 Bb3/.5 G3/1 r/1 |
      r/.5 Db4/.5 D4/.5 F4/.5 Ab4/1 F4/1 | B3/1.5 D4/.5 F4/1 r/1 |
      Eb4/1 G4/.5 Eb4/.5 C4/1 r/1 | A3/1 C4/.5 Eb4/.5 F4/1 Ab4/.5 F4/.5 |
      F4/.5 D4/.5 Db4/.5 Bb3/.5 B3/1 r/1 | C4/1 Eb4/1 r/.5 E4/.5 F4/1`
    },
    ending: 'tag',
    solos: ['tbn', 'pno'],
    trades: false
  },
  {
    id: 'latin-f',
    title: '붉은 지붕',
    key: 'F',
    bpm: 180,
    feel: 'latin',
    feelB: 'swing',
    sections: 'A8 A8 B8 A8',
    form: `Fm7 | Gm7b5 C7b9 | Fm7 | Gm7b5 C7b9 | Fm7 | Bbm7 | Gm7b5 C7b9 | Fm7 |
           Fm7 | Gm7b5 C7b9 | Fm7 | Gm7b5 C7b9 | Fm7 | Bbm7 | Gm7b5 C7b9 | Fm7 |
           Abmaj7 | Abmaj7 | Gm7b5 | C7b9 | Fm7 | Bb7 | Ebmaj7 | Gm7b5 C7b9 |
           Fm7 | Gm7b5 C7b9 | Fm7 | Gm7b5 C7b9 | Fm7 | Bbm7 | Gm7b5 C7b9 | Fm7`,
    head: {
      inst: 'tbn',
      passes: 1,
      mel: `
      r/.5 C4/.5 F4/.5 Ab4/1 G4/.5 F4/.5 Eb4/.5 | Db4/1 F4/.5 Db4/.5 E4/1.5 G4/.5 |
      r/.5 C4/.5 F4/.5 Ab4/1 G4/.5 F4/.5 C4/.5 | Db4/1 Bb3/.5 G3/.5 E3/1 r/1 |
      Ab4/.5 r/.5 Ab4/.5 G4/.5 r/.5 F4/1 Eb4/.5 | Db4/1.5 F4/.5 Ab4/1 F4/1 |
      G4/1 F4/.5 Db4/.5 E4/1 Db4/.5 Bb3/.5 | C4/2 r/2 |
      r/.5 C4/.5 F4/.5 Ab4/1 G4/.5 F4/.5 Eb4/.5 | Db4/1 F4/.5 Db4/.5 E4/1.5 G4/.5 |
      r/.5 C4/.5 F4/.5 Ab4/1 G4/.5 F4/.5 C4/.5 | Db4/1 Bb3/.5 G3/.5 E3/1 r/1 |
      Ab4/.5 r/.5 Ab4/.5 G4/.5 r/.5 F4/1 Eb4/.5 | Db4/1.5 F4/.5 Ab4/1 F4/1 |
      G4/1 F4/.5 Db4/.5 E4/1 Db4/.5 Bb3/.5 | F4/2 r/1.5 Eb4/.5~ |
      Eb4/1 C4/.5 Eb4/.5 G4/1.5 F4/.5 | Eb4/1 Bb3/.5 C4/.5 Eb4/1 r/.5 Db4/.5~ |
      Db4/1.5 F4/.5 Bb4/1 G4/1 | E4/1 Db4/.5 E4/.5 G4/1 Bb3/1 |
      Ab3/1 C4/.5 Eb4/.5 G4/1.5 F4/.5 | D4/1 F4/.5 Ab4/.5 G4/1 F4/1 |
      G4/2 Bb3/1 D4/1 | Db4/1.5 F4/.5 E4/1 Db4/1 |
      r/.5 C4/.5 F4/.5 Ab4/1 G4/.5 F4/.5 Eb4/.5 | Db4/1 F4/.5 Db4/.5 E4/1.5 G4/.5 |
      r/.5 C4/.5 F4/.5 Ab4/1 G4/.5 F4/.5 C4/.5 | Db4/1 Bb3/.5 G3/.5 E3/1 r/1 |
      Ab4/.5 r/.5 Ab4/.5 G4/.5 r/.5 F4/1 Eb4/.5 | Db4/1.5 F4/.5 Ab4/1 F4/1 |
      G4/1 F4/.5 Db4/.5 E4/1 Db4/.5 Bb3/.5 | C4/1 F4/1 r/2`
    },
    ending: 'vampfade',
    solos: ['pno', 'tbn', 'bass'],
    trades: false
  },
  {
    id: 'things-ab',
    title: '모든 길',
    key: 'Ab',
    bpm: 150,
    feel: 'swing',
    sections: 'A8 A8 B8 C12',
    form: `Fm7 | Bbm7 | Eb7 | Abmaj7 | Dbmaj7 | G7 | Cmaj7 | Cmaj7 |
           Cm7 | Fm7 | Bb7 | Ebmaj7 | Abmaj7 | D7 | Gmaj7 | Gmaj7 |
           Am7 | D7 | Gmaj7 | Gmaj7 | F#m7b5 | B7 | Emaj7 | C7alt |
           Fm7 | Bbm7 | Eb7 | Abmaj7 | Dbmaj7 | Dbm7 | Cm7 | Bdim7 | Bbm7 | Eb7 | Abmaj7 | Gm7b5 C7b9`,
    head: {
      inst: 'tbn',
      passes: 1,
      mel: `
      Ab4/.5 G4/.5 F4/.5 C4/.5 Eb4/1 r/.5 Db4/.5~ | Db4/1 F4/.5 Ab4/.5 F4/1 r/.5 G4/.5~ |
      G4/1 F4/.5 Eb4/.5 Db4/.5 Bb3/.5 G3/.5 Bb3/.5 | C4/1.5 Eb4/.5 G4/2 |
      F4/.5 Eb4/.5 Db4/.5 Ab3/.5 C4/1 r/.5 B3/.5~ | B3/1 D4/.5 F4/.5 A4/1 G4/1 |
      E4/2 r/.5 D4/.5 E4/.5 G4/.5 | A4/1 G4/1 r/2 |
      Eb4/.5 D4/.5 C4/.5 G3/.5 Bb3/1 r/.5 Ab3/.5~ | Ab3/1 C4/.5 Eb4/.5 C4/1 r/.5 D4/.5~ |
      D4/1 C4/.5 Bb3/.5 Ab3/.5 F3/.5 D3/.5 F3/.5 | G3/1.5 Bb3/.5 D4/2 |
      C4/.5 Bb3/.5 Ab3/.5 Eb3/.5 G3/1 r/.5 F#3/.5~ | F#3/1 A3/.5 C4/.5 E4/1 D4/1 |
      B3/2 r/.5 A3/.5 B3/.5 D4/.5 | E4/1 D4/1 r/2 |
      r/1 C4/1.5 E4/1.5~ | E4/1.5 F#4/.5 A4/1 C4/1 |
      B3/1 D4/1.5 F#4/1.5~ | F#4/2 E4/1 r/1 |
      r/1 A3/1.5 C4/1.5 | D#4/1.5 C#4/.5 A3/1 F#3/1 |
      G#3/1 B3/1.5 D#4/1.5~ | Eb4/1 Db4/.5 E4/.5 Bb4/1 Ab4/.5 G4/.5 |
      Ab4/.5 G4/.5 F4/.5 C4/.5 Eb4/1 r/.5 Db4/.5~ | Db4/1 F4/.5 Ab4/.5 F4/1 r/.5 G4/.5~ |
      G4/1 F4/.5 Eb4/.5 Db4/.5 Bb3/.5 G3/.5 Bb3/.5 | C4/1.5 Eb4/.5 G4/2 |
      F4/.5 Eb4/.5 Db4/.5 Ab3/.5 C4/1 r/1 | E4/1.5 Ab4/.5 B3/2 |
      Bb3/1 Eb4/.5 G4/.5 Bb4/1 G4/1 | Ab4/1 F4/.5 D4/.5 B3/1 D4/1 |
      Db4/1 F4/.5 Ab4/.5 F4/1 r/.5 G4/.5~ | G4/1 F4/.5 Eb4/.5 Db4/.5 Bb3/.5 G3/.5 Bb3/.5 |
      C4/1.5 Eb4/.5 Ab4/2 | r/2 E4/1 G4/1`
    },
    ending: 'tag',
    solos: ['bass', 'pno', 'tbn'],
    trades: false
  },
  {
    id: 'boogaloo-f',
    title: '흔들 의자',
    key: 'F',
    bpm: 108,
    feel: 'boogaloo',
    sections: 'A16',
    blues: true,
    form: 'F7 | F7 | F7 | F7 | Bb7 | Bb7 | F7 | F7 | Gm7 | C7 | Gm7 | C7 | F7 | D7 | Gm7 C7 | F7',
    head: {
      inst: 'tbn+pno',
      passes: 2,
      mel: `
      A3/.5 C4/.5 r/.5 Eb4/.5 r/.5 D4/.5 C4/1 | r/.5 F4/.5 r/.5 Eb4/.5 C4/.5 Ab3/.5 A3/1 |
      A3/.5 C4/.5 r/.5 Eb4/.5 r/.5 D4/.5 C4/1 | r/.5 F4/.5 r/.5 Eb4/.5 F4/.5 G4/.5 A4/1 |
      D4/.5 F4/.5 r/.5 Ab4/.5 r/.5 G4/.5 F4/1 | r/.5 Bb4/.5 r/.5 Ab4/.5 F4/.5 Db4/.5 D4/1 |
      A3/.5 C4/.5 r/.5 Eb4/.5 r/.5 D4/.5 C4/1 | r/.5 F4/.5 r/.5 Eb4/.5 C4/.5 Ab3/.5 A3/1 |
      Bb3/.5 D4/.5 r/.5 F4/.5 r/.5 D4/.5 Bb3/1 | r/.5 E4/.5 r/.5 G4/.5 Bb4/.5 G4/.5 E4/1 |
      Bb3/.5 D4/.5 r/.5 F4/.5 r/.5 D4/.5 Bb3/1 | r/.5 E4/.5 r/.5 G4/.5 Bb4/.5 A4/.5 G4/1 |
      A3/.5 C4/.5 r/.5 Eb4/.5 r/.5 D4/.5 C4/1 | r/.5 F#4/.5 r/.5 C4/.5 A3/.5 F#3/.5 A3/1 |
      Bb3/.5 D4/.5 F4/.5 D4/.5 E4/.5 G4/.5 Bb4/1 | A4/1 r/1 F4/1 r/1`
    },
    ending: 'vampfade',
    solos: ['pno', 'tbn'],
    trades: false
  },
  {
    id: 'train-c',
    title: '막차',
    key: 'C',
    bpm: 176,
    feel: 'swing',
    sections: 'A8 A8 B8 A8',
    form: `C6 | C6 | D7#11 | D7#11 | Dm7 | G7 | C6 | Dm7 G7 |
           C6 | C6 | D7#11 | D7#11 | Dm7 | G7 | C6 | Dm7 G7 |
           Fmaj7 | Fmaj7 | Fmaj7 | Fmaj7 | D7 | D7 | Dm7 | G7 |
           C6 | C6 | D7#11 | D7#11 | Dm7 | G7 | C6 | C6`,
    head: {
      inst: 'tbn',
      passes: 1,
      mel: `
      E4/.5 E4/.5 r/.5 G4/.5 E4/1 C4/1 | r/.5 D4/.5 E4/.5 G4/.5 A4/1.5 G#4/.5~ |
      G#4/1.5 F#4/.5 E4/1 C4/1 | D4/1 r/.5 A3/.5 C4/.5 D4/.5 F#4/1 |
      F4/.5 F4/.5 r/.5 A4/.5 F4/1 D4/1 | r/.5 D4/.5 F4/.5 A4/.5 G4/1 F4/1 |
      E4/2.5 r/1.5 | r/1 D4/.5 E4/.5 F4/1 G4/1 |
      E4/.5 E4/.5 r/.5 G4/.5 E4/1 C4/1 | r/.5 D4/.5 E4/.5 G4/.5 A4/1.5 G#4/.5~ |
      G#4/1.5 F#4/.5 E4/1 C4/1 | D4/1 r/.5 A3/.5 C4/.5 D4/.5 F#4/1 |
      F4/.5 F4/.5 r/.5 A4/.5 F4/1 D4/1 | r/.5 D4/.5 F4/.5 A4/.5 G4/1 F4/1 |
      E4/2.5 r/1.5 | r/1 D4/.5 E4/.5 F4/1 G4/1 |
      A4/2 G4/1 F4/1 | E4/1.5 C4/.5 A3/2 |
      r/.5 C4/.5 F4/.5 A4/.5 G4/1 E4/1 | F4/2 r/1.5 F#4/.5~ |
      F#4/1.5 A4/.5 C4/1 E4/1 | D4/1 F#4/.5 A4/.5 F#4/1 r/1 |
      F4/1.5 E4/.5 D4/1 C4/1 | B3/1 D4/.5 F4/.5 A4/1 G4/1 |
      E4/.5 E4/.5 r/.5 G4/.5 E4/1 C4/1 | r/.5 D4/.5 E4/.5 G4/.5 A4/1.5 G#4/.5~ |
      G#4/1.5 F#4/.5 E4/1 C4/1 | D4/1 r/.5 A3/.5 C4/.5 D4/.5 F#4/1 |
      F4/.5 F4/.5 r/.5 A4/.5 F4/1 D4/1 | r/.5 D4/.5 F4/.5 A4/.5 G4/1 F4/1 |
      E4/2.5 r/1.5 | r/.5 G3/.5 A3/.5 C4/.5 D4/.5 E4/.5 C4/1`
    },
    ending: 'tag',
    solos: ['tbn', 'bass', 'pno'],
    trades: false
  },
  {
    id: 'minor-blues-c',
    title: '그림자',
    key: 'C',
    bpm: 190,
    feel: 'swing',
    sections: 'A12',
    blues: true,
    form: 'Cm7 | Fm7 | Cm7 | Cm7 | Fm7 | Fm7 | Cm7 | Cm7 | Abmaj7 | G7alt | Cm7 | Dm7b5 G7alt',
    head: {
      inst: 'tbn',
      passes: 2,
      mel: `
      C4/.5 r/.5 G4/.5 r/.5 Bb4/.5 Ab4/.5 G4/1 | Eb4/1.5 F4/.5 r/.5 C4/1 Eb4/.5 |
      C4/.5 r/.5 G4/.5 r/.5 Bb4/.5 Ab4/.5 G4/.5 Eb4/.5 | F4/.5 G4/.5 Eb4/.5 C4/.5 r/2 |
      F3/.5 r/.5 C4/.5 r/.5 Eb4/.5 Db4/.5 C4/1 | Ab3/1.5 Bb3/.5 r/.5 F3/1 Ab3/.5 |
      C4/.5 r/.5 G4/.5 r/.5 Bb4/.5 Ab4/.5 G4/1 | Eb4/1.5 D4/.5 r/.5 C4/1 Eb4/.5~ |
      Eb4/1 G4/.5 Eb4/.5 C4/1 Ab3/1 | B3/1 Ab3/.5 B3/.5 Eb4/1 F4/1 |
      Eb4/1 D4/.5 C4/.5 G3/1 r/1 | F4/1 D4/.5 Ab4/.5 B3/1 r/1`
    },
    ending: 'button',
    solos: ['pno', 'tbn'],
    trades: false
  },
  {
    id: 'tuneup-d',
    title: '내리막',
    key: 'D',
    bpm: 184,
    feel: 'swing',
    sections: 'A16',
    form: 'Em7 | A7 | Dmaj7 | Dmaj7 | Dm7 | G7 | Cmaj7 | Cmaj7 | Cm7 | F7 | Bbmaj7 | Bbmaj7 | Em7 | A7 | Dmaj7 | Em7 A7',
    head: {
      inst: 'tbn',
      passes: 2,
      mel: `
      r/.5 B3/.5 D4/.5 E4/.5 G4/1 F#4/.5 E4/.5 | C#4/1 E4/.5 G4/.5 F#4/1 E4/1 |
      F#4/1.5 A4/.5 C#4/2~ | C#4/1 r/3 |
      r/.5 A3/.5 C4/.5 D4/.5 F4/1 E4/.5 D4/.5 | B3/1 D4/.5 F4/.5 E4/1 D4/1 |
      E4/1.5 G4/.5 B3/2~ | B3/1 r/3 |
      r/.5 G3/.5 Bb3/.5 C4/.5 Eb4/1 D4/.5 C4/.5 | A3/1 C4/.5 Eb4/.5 D4/1 C4/1 |
      D4/1.5 F4/.5 A3/2~ | A3/1 r/3 |
      G4/.5 F#4/.5 E4/.5 D4/.5 B3/.5 D4/.5 E4/.5 G4/.5 | A4/.5 G4/.5 E4/.5 C#4/.5 B3/.5 C#4/.5 E4/.5 G4/.5 |
      F#4/2 r/2 | r/.5 B3/.5 D4/.5 E4/.5 C#4/1 r/1`
    },
    ending: 'tag',
    solos: ['tbn', 'pno', 'bass'],
    trades: true
  },
  {
    id: 'georgia-f',
    title: '달리는 밤',
    key: 'F',
    bpm: 220,
    feel: 'swing',
    sections: 'A16 B16',
    form: `D7 | D7 | D7 | D7 | G7 | G7 | G7 | G7 | C7 | C7 | C7 | C7 | F6 | F6 | Gm7 | C7 |
           D7 | D7 | D7 | D7 | Gm7 | Gm7 | D7 | D7 | Gm7 | D7 | Gm7 | D7 | F6 | D7 | Gm7 C7 | F6`,
    head: {
      inst: 'tbn',
      passes: 1,
      mel: `
      r/.5 A3/.5 D4/.5 F#4/1 A4/1.5~ | A4/2 F#4/1 D4/1 |
      E4/1 F#4/.5 E4/.5 C4/1 A3/1 | r/2 A3/.5 B3/.5 D4/.5 F4/.5~ |
      F4/1.5 D4/.5 B3/1 G3/1 | r/.5 B3/.5 D4/.5 F4/.5 A4/1 G4/1 |
      F4/1 D4/1 B3/1.5 G3/.5 | r/2 G3/.5 A3/.5 Bb3/.5 E4/.5~ |
      E4/1.5 G4/.5 Bb4/1 G4/1 | r/.5 E4/.5 G4/.5 A4/.5 Bb4/1 A4/1 |
      G4/1 E4/1 C4/1.5 E4/.5 | D4/1 E4/1 G4/1 Bb4/1 |
      A4/2 F4/1 D4/1 | C4/1.5 A3/.5 r/2 |
      Bb3/1 D4/1 F4/1 A4/1 | G4/1 E4/1 r/1.5 F#4/.5~ |
      F#4/2 A4/1 F#4/1 | E4/1 D4/1 C4/1 A3/1 |
      r/.5 F#3/.5 A3/.5 C4/.5 E4/1 F#4/1 | A4/1 F#4/1 r/1.5 Bb3/.5~ |
      Bb3/1.5 D4/.5 F4/1 D4/1 | G4/1 F4/1 D4/1 Bb3/1 |
      A3/1 C4/1 F#4/1 E4/1 | D4/2 r/2 |
      r/.5 Bb3/.5 D4/.5 F4/.5 G4/1 Bb4/1 | A4/1 F#4/1 C4/1 A3/1 |
      Bb3/1 D4/.5 F4/.5 A4/1 G4/1 | F#4/1 E4/1 C4/1 r/1 |
      A3/1 C4/1 D4/1 F4/1 | F#4/1 A4/1 C4/1 A3/1 |
      Bb3/1 D4/1 E4/1 G4/1 | A4/1 r/1 F4/1 r/1`
    },
    ending: 'button',
    solos: ['pno', 'tbn'],
    trades: true
  },
  {
    id: 'closer-bb',
    title: '잘 자요',
    key: 'Bb',
    bpm: 230,
    feel: 'swing',
    sections: 'A12',
    blues: true,
    form: 'Bb7 | Eb7 | Bb7 | Fm7 Bb7 | Eb7 | Edim7 | Bb7 | Dm7 G7 | Cm7 | F7 | Bb7 G7 | Cm7 F7',
    head: {
      inst: 'tbn',
      passes: 2,
      mel: `
      r/.5 F4/1 D4/2.5 | r/.5 G4/1 Eb4/2.5 |
      r/.5 F4/1 D4/1 F4/.5 G4/.5 Ab4/.5 | F4/1 Eb4/1 D4/2 |
      r/.5 G4/1 Eb4/2.5 | r/.5 G4/1 E4/2.5 |
      r/.5 F4/1 D4/2.5 | r/1 A3/1 B3/1 D4/1 |
      Eb4/1.5 C4/.5 G3/1 r/1 | A3/1.5 C4/.5 Eb4/1 r/1 |
      D4/1 Bb3/1 B3/1 D4/1 | C4/1 Eb4/1 F4/1 r/1`
    },
    ending: 'button',
    solos: ['tbn', 'pno'],
    trades: true
  },
];