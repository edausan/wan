const SongPart = ({
	part = [],
	label = "",
	selectedPart = "",
	handleSelect = () => {},
	clearPart = () => {},
	showVariants = () => {},
	selectedChordVariant,
}) => {
	return (
		<div
			key={label}
			onClick={() => handleSelect(label)}
			className={`p-4 border-2  rounded-md mt-2 ${
				selectedPart === label ? "border-sky-500" : "border-slate-300"
			}`}>
			<div className="flex flex-row items-center justify-between">
				<span className="text-sm">{label}:</span>{" "}
				<button
					disabled={part.length <= 0}
					onClick={() => clearPart(label)}
					className="text-sm disabled:text-slate-300">
					Clear
				</button>
			</div>

			<section className="flex flex-row gap-1 flex-wrap mt-2 items-start">
				{part.map((chord, idx) => {
					const chord_name = chord?.name ? chord.name : chord;
					return (
						<>
							<span
								key={`${chord_name}~${idx}~${label}`}
								className={`relative bg-white/0 transition-all duration-100 ${
									selectedChordVariant.chord === chord_name &&
									selectedChordVariant.label === label
										? "bg-white/100 z-50 shadow-md"
										: ""
								} font-bold border border-slate-50/0 p-1 rounded-[5px] hover:border-slate-300 cursor-pointer`}
								onClick={() => showVariants({ chord, label })}>
								{chord?.name ? chord.name : chord}
								<div className="text-xs text-center text-slate-400">
									{chord.relation}
								</div>
							</span>
							{idx < part.length - 1 && (
								<span className="mt-1" key={idx}>
									-
								</span>
							)}
						</>
					);
				})}
			</section>
		</div>
	);
};

export default SongPart;
