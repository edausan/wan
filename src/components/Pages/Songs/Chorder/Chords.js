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

export const pattern = [
	{ pos: 0, type: "maj", relation: "1" },
	{ pos: 2, type: "min", relation: "2" },
	{ pos: 4, type: "min", relation: "3" },
	{ pos: 5, type: "maj", relation: "4" },
	{ pos: 7, type: "maj", relation: "5" },
	{ pos: 9, type: "min", relation: "6" },
	{ pos: 11, type: "dim", relation: "7" },
];

const handleFamilyChords = (root) => {
	const _8oct = [
		...MUSICAL_NOTES,
		...MUSICAL_NOTES,
		...MUSICAL_NOTES,
		...MUSICAL_NOTES,
		...MUSICAL_NOTES,
		...MUSICAL_NOTES,
		...MUSICAL_NOTES,
		...MUSICAL_NOTES,
		...MUSICAL_NOTES,
		...MUSICAL_NOTES,
	];
	const root_idx = MUSICAL_NOTES.findIndex((mn) => mn.root === root);
	const _1st = _8oct[pattern[0].pos + root_idx]?.root;
	const _2nd = _8oct[pattern[1].pos + root_idx]?.root;
	const _3rd = _8oct[pattern[2].pos + root_idx]?.root;
	const _4th = _8oct[pattern[3].pos + root_idx]?.root;
	const _5th = _8oct[pattern[4].pos + root_idx]?.root;
	const _6th = _8oct[pattern[5].pos + root_idx]?.root;
	const _7th = _8oct[pattern[6].pos + root_idx]?.root;

	return [
		{ ...pattern[0], name: `${_1st}` },
		{ ...pattern[1], name: `${_2nd}m` },
		{ ...pattern[2], name: `${_3rd}m` },
		{ ...pattern[3], name: `${_4th}` },
		{ ...pattern[4], name: `${_5th}` },
		{ ...pattern[5], name: `${_6th}m` },
		{ ...pattern[6], name: `${_7th}dim` },
		{
			pos: 1,
			type: "maj",
			relation: "1/3",
			name: `${root}/${_3rd}`,
		},
		{
			pos: 5,
			type: "maj",
			relation: "5/7",
			name: `${_5th}/${_7th}`,
		},
		{
			pos: 4,
			type: "maj",
			relation: "4/6",
			name: `${_4th}/${_6th}`,
		},
		{
			pos: 4,
			type: "maj",
			relation: "4/1",
			name: `${_4th}/${root}`,
		},
		{
			pos: 5,
			type: "maj",
			relation: "5/1",
			name: `${_5th}/${root}`,
		},
		{
			pos: 4,
			type: "maj",
			relation: "4/5",
			name: `${_4th}/${_5th}`,
		},
		{
			pos: 5,
			type: "maj",
			relation: "5/4",
			name: `${_5th}/${_4th}`,
		},
		{
			pos: 4,
			type: "maj7",
			relation: "4M7",
			name: `${_4th}M7`,
		},
		{
			pos: 1,
			type: "maj7",
			relation: "1M7",
			name: `${_1st}M7`,
		},
		{
			pos: 5,
			type: "min",
			relation: "5m",
			name: `${_5th}m`,
		},
		{
			pos: 4,
			type: "min",
			relation: "4m",
			name: `${_4th}m`,
		},
		{
			pos: 4,
			type: "min",
			relation: "4m7",
			name: `${_4th}m7`,
		},
		{
			pos: 4,
			type: "min",
			relation: "4m9",
			name: `${_4th}m9`,
		},
		{
			pos: 6,
			type: "maj",
			relation: "6M",
			name: `${_6th}M`,
		},
		{
			pos: 6,
			type: "maj",
			relation: "6dom7",
			name: `${_6th}7`,
		},
		{
			pos: 1,
			type: "maj",
			relation: "1dom7",
			name: `${_1st}7`,
		},
		{
			pos: 6,
			type: "maj",
			relation: "6dom7sus4",
			name: `${_6th}7sus4`,
		},
		{
			pos: 5,
			type: "maj",
			relation: "5sus4",
			name: `${_5th}sus4`,
		},
		{
			pos: 5,
			type: "maj",
			relation: "5/11",
			name: `${_5th}9sus4`,
		},
		{
			pos: 3,
			type: "maj",
			relation: "3M",
			name: `${_3rd}M`,
		},
	];
};

export const MUSICAL_NOTES = [
	{
		root: "C",
	},
	{
		root: "C#",
	},
	{
		root: "D",
	},
	{
		root: "Eb",
	},
	{
		root: "E",
	},
	{
		root: "F",
	},
	{
		root: "F#",
	},
	{
		root: "G",
	},
	{
		root: "G#",
	},
	{
		root: "A",
	},
	{
		root: "Bb",
	},
	{
		root: "B",
	},
];

export const CHORDS = [
	{
		root: "C",
		relatedKeys: ["C", "F", "G"],
		variants: handleChord("C", "E", "F", "G"),
		isAccidental: false,
		isFamily: false,
		familyChords: handleFamilyChords("C"),
	},
	{
		root: "C#",
		relatedKeys: ["C♯", "F♯", "G♯"],
		variants: handleChord("C♯", "F", "F♯", "G♯"),
		isAccidental: true,
		isFamily: false,
		familyChords: handleFamilyChords("C♯"),
	},
	{
		root: "D",
		relatedKeys: ["D", "G", "A"],
		variants: handleChord("D", "F#", "G", "A"),
		isAccidental: false,
		isFamily: false,
		familyChords: handleFamilyChords("D"),
	},
	{
		root: "Eb",
		relatedKeys: ["E♭", "G♯", "B♭"],
		variants: handleChord("E♭", "G", "G♯", "B♭"),
		isAccidental: true,
		isFamily: false,
		familyChords: handleFamilyChords("Eb"),
	},
	{
		root: "E",
		relatedKeys: ["E", "B", "A"],
		variants: handleChord("E", "G#", "A", "B"),
		isAccidental: false,
		isFamily: false,
		familyChords: handleFamilyChords("E"),
	},
	{
		root: "F",
		relatedKeys: ["C", "B♭", "F"],
		variants: handleChord("F", "A", "B♭", "C"),
		isAccidental: false,
		isFamily: false,
		familyChords: handleFamilyChords("F"),
	},
	{
		root: "F#",
		relatedKeys: ["C♯", "B", "F♯"],
		variants: handleChord("F♯", "B♭", "B", "C♯"),
		isAccidental: true,
		isFamily: false,
		familyChords: handleFamilyChords("F#"),
	},
	{
		root: "G",
		relatedKeys: ["C", "D", "G"],
		variants: handleChord("G", "B", "C", "D"),
		isAccidental: false,
		isFamily: false,
		familyChords: handleFamilyChords("G"),
	},
	{
		root: "G#",
		relatedKeys: ["C♯", "E♭", "G♯"],
		variants: handleChord("G♯", "C", "C♯", "E♭"),
		isAccidental: true,
		isFamily: false,
		familyChords: handleFamilyChords("G#"),
	},
	{
		root: "A",
		relatedKeys: ["A", "D", "E"],
		variants: handleChord("A", "C♯", "D", "E"),
		isAccidental: false,
		isFamily: false,
		familyChords: handleFamilyChords("A"),
	},
	{
		root: "Bb",
		relatedKeys: ["B♭", "E♭", "F"],
		variants: handleChord("B♭", "D", "E♭", "F"),
		isAccidental: true,
		isFamily: false,
		familyChords: handleFamilyChords("Bb"),
	},
	{
		root: "B",
		relatedKeys: ["B", "E", "F♯"],
		variants: handleChord("B", "E♭", "E", "F♯"),
		isAccidental: false,
		isFamily: false,
		familyChords: handleFamilyChords("B"),
	},
];

const musicalNotes = ["C", "C#", "D", ""];

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
