import React, { useState } from "react";
import { useEffect } from "react";
import Chip from "./Chip";
import { CHORDS, pattern, _8oct } from "./Chords";
import { Dialog } from "@mui/material";

const Chorder = ({ setChords, open, setOpen }) => {
	const [chord, setChord] = useState(null);
	const [selected, setSelected] = useState(null);
	const [chordRuns, setChordRuns] = useState([]);
	const [selectedKey, setSelectedKey] = useState(null);
	const [family, setFamily] = useState([]);
	const [replaceIndex, setReplaceIndex] = useState(null);

	useEffect(() => {
		setSelected(null);
		if (chord && replaceIndex) {
			handleReplaceChord();
		} else {
			chord && setChordRuns((prev) => [...prev, chord]);
		}
		setChord(null);
		// chord && replaceIndex
		//   ? handleReplaceChord()
		//   : setChordRuns((prev) => [...prev, chord]);
	}, [chord]);

	useEffect(() => {
		selectedKey && handleFamilyChords();
	}, [selectedKey]);

	const handleFamilyChords = () => {
		const family = pattern.map((pat) => {
			const key_pos = _8oct.findIndex(
				(chord) => chord.root === selectedKey.root
			);

			const fam_pos = _8oct[key_pos + pat.pos].variants[pat.type][0];

			return fam_pos;
		});

		setFamily([selectedKey?.root, ...family]);
	};

	const handleSave = () => {
		setChords && setChords(chordRuns);
	};

	const handleDeleteChord = (chord) => {
		const new_chord_runs = chordRuns.filter((cr, idx) => idx !== chord);
		setChordRuns(new_chord_runs);
	};

	const handleReplaceChord = () => {
		if (replaceIndex) {
			const replaced = chordRuns.map((c, idx) => {
				if (idx === replaceIndex) {
					return chord;
				}

				return c;
			});
			setReplaceIndex(null);
			setChordRuns(replaced);
		}
	};

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<section className="p-4 relative w-full">
				<div className="p-4">
					<small className="mb-2">Key:</small>
					<div className="flex flex-row flex-wrap gap-2 items-center justify-start ">
						{CHORDS?.map((chord) => {
							return (
								<Chip
									value={chord}
									selected={selectedKey}
									callback={setSelectedKey}
									key={chord.root}
								/>
							);
						})}
					</div>
				</div>

				<div className="flex flex-row gap-2 flex-wrap items-center justify-start p-4">
					{CHORDS?.map((chord) => {
						const c = family?.filter((f) => f?.root === chord?.root)[0];
						return (
							<Chip
								family={family}
								value={c || chord}
								selected={selected}
								callback={setSelected}
								key={chord.root}
							/>
						);
					})}
				</div>

				{selected && (
					<section className="flex flex-col items-start justify-center gap-2">
						<div className="bg-green-50 p-3">
							<small>Major</small>
							<div className="flex flex-row gap-2 max-w-[500px] flex-wrap">
								{selected?.variants?.maj?.map((variant) => {
									return (
										<Chip
											family={family}
											value={variant}
											selected={selected}
											callback={setChord}
											isVariant
											key={variant}
											chordRuns={chordRuns}
											type="maj"
										/>
									);
								})}
							</div>
						</div>

						<div className="bg-orange-50 p-3 mt-2">
							<small>Minor</small>
							<div className="flex flex-row gap-2 max-w-[500px] flex-wrap">
								{selected?.variants?.min?.map((variant) => {
									return (
										<Chip
											family={family}
											value={variant}
											selected={selected}
											callback={setChord}
											isVariant
											key={variant}
											chordRuns={chordRuns}
											type="min"
										/>
									);
								})}
							</div>
						</div>

						<div className="bg-purple-50 p-3 mt-2 w-full">
							<small>Overs</small>
							<div className="flex flex-row gap-2 max-w-[500px] flex-wrap">
								{selected?.variants?.overs?.map((variant) => {
									return (
										<Chip
											family={family}
											value={variant}
											selected={selected}
											callback={setChord}
											isVariant
											key={variant}
											chordRuns={chordRuns}
											type="overs"
										/>
									);
								})}
							</div>
						</div>

						<div className="bg-gray-50 p-3 mt-2 w-full">
							<small>Other</small>
							<div className="flex flex-row gap-2 max-w-[500px] flex-wrap">
								{selected?.variants?.other?.map((variant) => {
									return (
										<Chip
											family={family}
											value={variant}
											selected={selected}
											callback={setChord}
											isVariant
											key={variant}
											chordRuns={chordRuns}
											type="others"
										/>
									);
								})}
							</div>
						</div>
					</section>
				)}

				<div className="flex flex-row flex-wrap gap-1 items-center mt-4 p-4 bg-slate-50">
					{chordRuns
						?.filter((c) => c !== null)
						.map((chord, idx) => {
							return chord === "\r\n" ? (
								<div id="divider" className="w-full h-[10px]" />
							) : (
								<Chip
									index={idx}
									value={chord}
									isVariant
									callback={() => {}}
									isChordRun
									handleDeleteChord={handleDeleteChord}
									setReplaceIndex={setReplaceIndex}
									replaceIndex={replaceIndex}
								/>
							);
						})}
				</div>

				<div className="flex flex-row gap-2 mt-4">
					<ChordButton
						value="Clear"
						callback={() => setChordRuns([])}
						color="slate"
					/>
					<ChordButton
						value="Next Line"
						callback={() => setChordRuns((prev) => [...prev, "\r\n"])}
						color="sky"
					/>
					<ChordButton
						value="Save Chord Runs"
						callback={handleSave}
						color="green"
					/>
				</div>
			</section>
		</Dialog>
	);
};

const ChordButton = ({ callback, value, color }) => {
	const btn_color = (val) => `bg-${color}-${val}`;
	return (
		<button
			className={`px-3 py-1 rounded-full ${btn_color(400)} hover:!${btn_color(
				500
			)} text-white text-sm`}
			onClick={() => callback()}>
			{value}
		</button>
	);
};

export default Chorder;
