import React, { useState } from "react";
import { useEffect } from "react";
import Chip from "./Chip";
import { CHORDS, pattern, _8oct } from "./Chords";
import { Dialog, Divider } from "@mui/material";

const Chorder = ({ setChords, open, setOpen }) => {
	const [chord, setChord] = useState(null);
	const [selected, setSelected] = useState(null);
	const [chordRuns, setChordRuns] = useState([]);
	const [selectedKey, setSelectedKey] = useState(null);
	const [family, setFamily] = useState([]);
	const [replaceIndex, setReplaceIndex] = useState(null);

	useEffect(() => {
		// setSelected(null);
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

			const fam_pos = _8oct[key_pos + pat?.pos]?.variants[pat?.type][0];

			return fam_pos;
		});

		setFamily([selectedKey?.root, ...family]);
	};

	const handleSave = () => {
		setOpen(null);
		setSelected(null);
		setSelectedKey(null);
		setChordRuns([]);
		setFamily([]);
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
		<Dialog open={true} onClose={() => setOpen(false)}>
			<section className="relative w-full flex flex-col overflow-auto max-h-[600px]">
				<article className="sticky top-0 bg-white shadow-lg">
					<div className="p-4">
						<small className="text-blue-600 mb-4 block">Key:</small>
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

					{selectedKey && (
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
					)}
				</article>

				{selected && (
					<section className="flex flex-col items-start justify-center gap-1 p-4">
						<div className="bg-slate-50 p-3 w-full">
							<small className="text-blue-600 mb-4 block">Major</small>
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

						<div className="bg-slate-50 p-3 mt-2 w-full">
							<small className="text-blue-600 mb-4 block">Minor</small>
							<div className="flex flex-row gap-4 max-w-[500px] flex-wrap">
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

						<div className="bg-slate-50 p-3 mt-2 w-full">
							<small className="text-blue-600 mb-4 block">Overs</small>
							<div className="flex flex-row gap-4 max-w-[500px] flex-wrap">
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

						<div className="bg-slate-50 p-3 mt-2 w-full">
							<small className="text-blue-600 mb-4 block">Other</small>
							<div className="flex flex-row gap-4 max-w-[500px] flex-wrap">
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

				{selectedKey && (
					<article className="bg-white sticky bottom-0 p-4 shadow-2xl">
						<div className="flex flex-row flex-wrap gap-1 items-center mt-4 px-4 py-6 ">
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

						<Divider />

						<div className="flex flex-row gap-2 mt-4">
							<div className="flex flex-row gap-2 flex-1">
								<ChordButton
									value="Clear"
									callback={() => setChordRuns([])}
									color="bg-slate-500"
									hover="bg-slate-700"
									disabled={chordRuns.length <= 0}
								/>
								<ChordButton
									value="Next Line"
									callback={() => setChordRuns((prev) => [...prev, "\r\n"])}
									color="bg-sky-500"
									hover="bg-sky-700"
								/>
							</div>
							<ChordButton
								value="Save Chord Runs"
								callback={handleSave}
								color="bg-green-500"
								hover="bg-green-700"
							/>
						</div>
					</article>
				)}
			</section>
		</Dialog>
	);
};

const ChordButton = ({ callback, value, color, hover, props }) => {
	return (
		<button
			{...props}
			className={`px-4 py-3 rounded-full	 ${color} hover:${hover} text-white text-sm ${
				props?.disabled ? "disabled" : ""
			}`}
			onClick={() => callback()}>
			{value}
		</button>
	);
};

export default Chorder;
