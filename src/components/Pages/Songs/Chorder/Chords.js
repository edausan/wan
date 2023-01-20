const handleChord = (note, third, fourth, fifth) => {
  return {
    maj: [
      `${note}`,
      `${note}Maj7`,
      `${note}Maj9`,
      `${note}7`,
      `${note}9`,
      `${note}11`,
      `${note}13`,
      `${note}add2`,
      `${note}add6`,
      `${note}sus4`,
      `${note}sus2`,
    ],
    min: [
      `${note}m`,
      `${note}m7`,
      `${note}m9`,
      `${note}m11`,
      `${note}min + 2`,
      `${note}min + 6`,
      `${note}min + sus4`,
      `${note}min + sus2`,
    ],
    other: [
      `${note}dim`,
      `${note}dim7`,
      `${note}Majaug5`,
      `${note}Minaug5`,
      `${note}7sus4♭5`,
    ],
    overs: [`${note}/${third}`, `${note}/${fourth}`, `${note}/${fifth}`],
  };
};

export const CHORDS = [
  {
    root: "C",
    relatedKeys: ["C", "F", "G"],
    variants: handleChord("C", "E", "F", "G"),
    isAccidental: false,
    isFamily: false,
  },
  {
    root: "C♯",
    relatedKeys: ["C♯", "F♯", "G♯"],
    variants: handleChord("C♯", "F", "F♯", "G♯"),
    isAccidental: true,
    isFamily: false,
  },
  {
    root: "D",
    relatedKeys: ["D", "G", "A"],
    variants: handleChord("D", "F#", "G", "A"),
    isAccidental: false,
    isFamily: false,
  },
  {
    root: "E♭",
    relatedKeys: ["E♭", "G♯", "B♭"],
    variants: handleChord("E♭", "G", "G♯", "B♭"),
    isAccidental: true,
    isFamily: false,
  },
  {
    root: "E",
    relatedKeys: ["E", "B", "A"],
    variants: handleChord("E", "G#", "A", "B"),
    isAccidental: false,
    isFamily: false,
  },
  {
    root: "F",
    relatedKeys: ["C", "B♭", "F"],
    variants: handleChord("F", "A", "B♭", "C"),
    isAccidental: false,
    isFamily: false,
  },
  {
    root: "F♯",
    relatedKeys: ["C♯", "B", "F♯"],
    variants: handleChord("F♯", "B♭", "B", "C♯"),
    isAccidental: true,
    isFamily: false,
  },
  {
    root: "G",
    relatedKeys: ["C", "D", "G"],
    variants: handleChord("G", "B", "C", "D"),
    isAccidental: false,
    isFamily: false,
  },
  {
    root: "G♯",
    relatedKeys: ["C♯", "E♭", "G♯"],
    variants: handleChord("G♯", "C", "C♯", "E♭"),
    isAccidental: true,
    isFamily: false,
  },
  {
    root: "A",
    relatedKeys: ["A", "D", "E"],
    variants: handleChord("A", "C♯", "D", "E"),
    isAccidental: false,
    isFamily: false,
  },
  {
    root: "B♭",
    relatedKeys: ["B♭", "E♭", "F"],
    variants: handleChord("B♭", "D", "E♭", "F"),
    isAccidental: true,
    isFamily: false,
  },
  {
    root: "B",
    relatedKeys: ["B", "E", "F♯"],
    variants: handleChord("B", "E♭", "E", "F♯"),
    isAccidental: false,
    isFamily: false,
  },
];

export const _8oct = [
  ...CHORDS,
  ...CHORDS,
  ...CHORDS,
  ...CHORDS,
  ...CHORDS,
  ...CHORDS,
  ...CHORDS,
  ...CHORDS,
];

export const pattern = [
  { pos: 2, type: "min", relation: 2 },
  { pos: 4, type: "min", relation: 3 },
  { pos: 5, type: "maj", relation: 4 },
  { pos: 7, type: "maj", relation: 5 },
  { pos: 9, type: "min", relation: 6 },
  { pos: 11, type: "other", relation: 7 },
];
