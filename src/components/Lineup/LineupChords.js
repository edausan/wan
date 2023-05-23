import React, { useEffect, useState } from "react";
import { Button, Modal, TextField, useTheme } from "@mui/material";
import { useQuery } from "react-query";
import { GetAllSongs } from "../../Firebase/songsApi";

const LineupChords = ({ lineup, showChords, setShowChords }) => {
	const [songChords, setSongChords] = useState([]);
	const songsQuery = useQuery("songs", GetAllSongs);

	useEffect(() => {
		const songs = songsQuery.data;
		lineup?.songs?.forEach((song) => {
			console.log({ song });
			const song_chord = songs.find((s) => song.id === s.id);
			const exists = songChords.findIndex((c) => c.id === song_chord.id) >= 0;
			!exists &&
				setSongChords((prev) => [
					...prev,
					{ ...song_chord, ...song, isDone: false },
				]);
		});
	}, [lineup, songsQuery.data]);

	useEffect(() => {
		console.log({ songChords });
	}, [songChords]);

	const handleDone = (id) => {
		setSongChords((prev) => {
			return prev.map((song) => {
				if (song.id === id) {
					return {
						...song,
						isDone: !song.isDone,
					};
				}

				return song;
			});
		});
	};

	return (
		<>
			<Modal open={showChords}>
				<div className="bg-white w-full h-full max-h-[100vh] absolute top-0 left-0 overflow-auto p-4">
					<Button onClick={() => setShowChords(false)} className="w-full">
						Close Chords
					</Button>
					{songChords.map((song) => {
						const { verse, pre_chorus, chorus, bridge } = song?.chords || {
							verse: "",
							pre_chorus: "",
							chorus: "",
							bridge: "",
						};
						return (
							<div key={song.id} className="bg-white shadow-lg mb-4">
								<div
									onClick={() => handleDone(song.id)}
									className={`${
										song.isDone ? "bg-slate-300" : "bg-purple-600"
									} text-white py-2 px-4 flex flex-row items-start justify-between`}>
									<div className="w-full max-w-[70%]">
										<h1 className="font-bold text-sm w-[200px] truncate overflow-hidden ">
											{song.title}
										</h1>
										<small>Key: {song.key}</small>
									</div>
									<div className="w-full max-w-[30%] text-right">
										<small className="text-xs block">{song.label}</small>
									</div>
								</div>

								<section
									className={`flex flex-col gap-1 p-4 ${
										song.isDone ? "opacity-30" : "opacity-100"
									}`}>
									{verse && <Chords part="Verse" chords={verse} />}
									{pre_chorus && (
										<Chords part="Pre-chorus" chords={pre_chorus} />
									)}
									{chorus && <Chords part="Chorus" chords={chorus} />}
									{bridge && <Chords part="Bridge" chords={bridge} />}
								</section>
							</div>
						);
					})}
				</div>
			</Modal>
		</>
	);
};

const Chords = ({ part, chords }) => {
	const theme = useTheme();

	return (
		<div>
			<small className="text-sky-500">{part}:</small>
			<TextField
				id={part}
				value={chords}
				fullWidth
				disabled
				variant="standard"
				multiline
				sx={{
					"& textarea.Mui-disabled": {
						"-webkit-text-fill-color": theme.palette.text.primary,
					},
					"& > .Mui-disabled:before": {
						borderBottomStyle: "none !important",
					},
				}}
			/>
		</div>
	);
};

export default LineupChords;
