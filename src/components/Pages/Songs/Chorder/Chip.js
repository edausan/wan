import { useState } from "react";

const Chip = ({
	value,
	callback,
	isVariant,
	selected,
	chordRuns,
	family,
	isChordRun,
	handleDeleteChord,
	index,
	setReplaceIndex,
	replaceIndex,
	type,
}) => {
	const [showMenu, setShowMenu] = useState(false);
	const selectedChord = chordRuns?.findIndex((c) => c === value) >= 0;

	const handleType = (type, val) => {
		switch (type) {
			case "maj":
				return `bg-green-${val}`;
			case "min":
				return `bg-orange-${val}`;
			case "overs":
				return `bg-purple-${val}`;
			case "others":
				return `bg-gray-${val}`;

			default:
				break;
		}
	};

	// const hover =
	//   value?.isAccidental || selected?.isAccidental
	//     ? "hover:bg-orange-500 hover:text-white"
	//     : isVariant
	//     ? `hover:${handleType(type, 500)} hover:text-white`
	//     : "hover:bg-sky-500 hover:text-white";

	const hover = ` hover:${handleType(type, 500)} hover:text-white`;

	const selected_chord = selectedChord
		? ` ${handleType(type, "600")} text-white`
		: " bg-slate-300 text-black";

	const isAccidental = "bg-slate-300";

	const is_variant =
		isVariant && !selectedChord ? ` ${handleType(type, 100)} text-black` : "";

	const is_family = !isVariant
		? family?.findIndex(
				(f) => f.split("dim")[0].split("m")[0] === value?.root
		  ) >= 0 && " !border-black/80 bg-slate-300"
		: family?.findIndex((f) => f === value) >= 0 &&
		  " !border-black/80 bg-slate-300";

	const replace_border =
		replaceIndex === index &&
		isChordRun &&
		` !border-orange-500 !bg-orange-400 `;

	const handleDelete = () => {
		handleDeleteChord(index);
		setShowMenu(false);
	};

	return (
		<div
			className={`flex flex-row items-center justify-between py-1 px-2 text-xs rounded-full cursor-pointer transition-all duration-100 border border-white${
				is_family || ""
			}${is_variant || ""}${replace_border || ""}${selected_chord || ""}${
				isChordRun ? "" : hover
			}`}
			onClick={
				isChordRun
					? !showMenu
						? () => setShowMenu(true)
						: () => {}
					: () => {
							!isVariant
								? selected?.root === value?.root
									? callback(null)
									: callback(value)
								: callback(value);
					  }
			}>
			<div>{value?.root || value} </div>
			{/* {isChordRun && (
        <button className=" ml-2 w-[14px] h-[14px] flex items-center justify-center rounded-full hover:bg-slate-200">
          <button onClick={() => setShowMenu((prev) => !prev)}>
            <MoreVert className="text-[10px]" />
          </button>

          
        </button>
      )} */}

			{showMenu && (
				<ChordMenu
					handleDelete={handleDelete}
					showMenu={setShowMenu}
					chord={value}
					handleReplace={() => setReplaceIndex(index)}
				/>
			)}
		</div>
	);
};

const ChordMenu = ({ handleDelete, showMenu, chord, handleReplace }) => {
	return (
		<div
			onClick={() => showMenu(false)}
			className="flex items-center justify-center absolute top-0 left-0 bg-black/50 w-full h-full">
			<div className="p-2 rounded-sm min-w-[160px] max-w-[200px] text-start bg-white shadow-lg">
				<button
					className="text-xs p-1 hover:bg-slate-200 text-start w-full"
					onClick={handleDelete}>
					Delete <span className="font-bold">{chord}</span>
				</button>
				<button
					className="text-xs p-1 hover:bg-slate-200 text-start w-full"
					onClick={handleReplace}>
					Replace <span className="font-bold">{chord}</span>
				</button>
				<button className="text-xs p-1 hover:bg-slate-200 text-start w-full">
					Add chord before <span className="font-bold">{chord}</span>
				</button>
				<button className="text-xs p-1 hover:bg-slate-200 text-start w-full">
					Add chord after <span className="font-bold">{chord}</span>
				</button>
			</div>
		</div>
	);
};

export default Chip;
