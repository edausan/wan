import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Tab,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

const EditSongTabs = ({ song, setSongDetails, updating }) => {
	const [value, setValue] = useState("1");

	return (
		<>
			<ChordsAddtnl setSongDetails={setSongDetails} song={song} />
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TabList onChange={(e, newValue) => setValue(newValue)}>
						<Tab label="Lyrics" value="1" className="text-xs" />
						<Tab label="Chords" value="2" className="text-xs" />
						{/* <Tab label="Media" value="3" className="text-xs" /> */}
					</TabList>
				</Box>
				<TabPanel value="1" className="max-h-[300px] overflow-y-auto">
					<SongParts
						part={song?.lyrics}
						lyrics
						setDetails={setSongDetails}
						song={song}
						updating={updating}
					/>
				</TabPanel>
				<TabPanel value="2" className="max-h-[300px] overflow-y-auto">
					<SongParts
						part={song?.chords}
						setDetails={setSongDetails}
						song={song}
						updating={updating}
					/>
				</TabPanel>
				{/* <TabPanel value="3" className="p-0">
					<Media setDetails={setSongDetails} song={song} />
				</TabPanel> */}
			</TabContext>
		</>
	);
};

const ChordsAddtnl = ({ setSongDetails, song }) => {
	return (
		<div className="grid grid-cols-3 gap-4 content-end px-4 mb-4">
			<div className="col-span-1 tablet:col-span-1 flex items-end">
				<FormControl variant="standard" size="small" fullWidth>
					<InputLabel id="key">Key</InputLabel>
					<Select
						defaultValue={song?.key}
						label="Key"
						labelId="key"
						onChange={(e) => setSongDetails({ ...song, key: e.target.value })}>
						{Keys.map((key) => {
							return <MenuItem value={key}>{key}</MenuItem>;
						})}
					</Select>
				</FormControl>
			</div>
			<div className="col-span-1 tablet:col-span-1">
				<TextField
					disabled
					label="Time Signature"
					variant="standard"
					className="VERSE [&>div>textarea]:text-sm [&>label]:text-sm"
				/>
			</div>
			<div className="col-span-1 tablet:col-span-1 flex flex-row gap-2 items-end">
				<TextField
					disabled
					label="Tempo"
					variant="standard"
					fullWidth
					className="VERSE [&>div>textarea]:text-sm [&>label]:text-sm"
				/>
				<span className="text-xs">BPM</span>
			</div>
		</div>
	);
};

export const UrlId = (url) => {
	console.log({ url });

	if (url === "" || url === null) {
		return null;
	}

	if (url) {
		if (url.includes("spotify")) {
			const id = url?.split("track/")[1].split("?")[0];
			// <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/5uj2wWw0gnNqkVqGNWbGrf?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
			const sp_url = `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;
			return sp_url;
			//https://open.spotify.com/track/0xqQDpsGBrVUhp4LJA4K7f?si=Lq_gp7DRRZCvYLJC0qq8yA&utm_source=copy-link
		} else {
			const id = url?.split("=")[1];
			const yt_url = `https://www.youtube.com/embed/${id}`;
			return yt_url;
		}
	}
};

const SongParts = ({ part, lyrics, setDetails, song, updating }) => {
	const [edit, setEdit] = useState(true);
	const handleChange = (songPart, value) => {
		lyrics
			? setDetails({
					...song,
					lyrics: {
						...song.lyrics,
						[songPart]: value,
					},
			  })
			: setDetails({
					...song,
					chords: {
						...song.chords,
						[songPart]: value,
					},
			  });
	};

	useEffect(() => {
		updating && setEdit(true);
	}, [updating]);

	return (
		<div className="flex gap-4 flex-col ">
			{!lyrics && (
				<TextField
					variant="standard"
					fullWidth
					label="Intro"
					defaultValue={part?.intro}
					multiline
					className="VERSE [&>div>textarea]:text-sm [&>label]:text-sm"
					// maxRows={5}
					// disabled={edit}
					onChange={(e) => handleChange("intro", e.target.value)}
				/>
			)}
			<TextField
				variant="standard"
				fullWidth
				label="Verse"
				defaultValue={part?.verse}
				multiline
				className="VERSE [&>div>textarea]:text-sm [&>label]:text-sm"
				// maxRows={5}
				// disabled={edit}
				onChange={(e) => handleChange("verse", e.target.value)}
			/>
			<TextField
				variant="standard"
				fullWidth
				label="Pre Chorus"
				defaultValue={part?.pre_chorus}
				multiline
				className="VERSE [&>div>textarea]:text-sm [&>label]:text-sm"
				// maxRows={5}
				// disabled={edit}
				onChange={(e) => handleChange("pre_chorus", e.target.value)}
			/>
			<TextField
				variant="standard"
				fullWidth
				label="Chorus"
				defaultValue={part?.chorus}
				multiline
				className="VERSE [&>div>textarea]:text-sm [&>label]:text-sm"
				// maxRows={5}
				// disabled={edit}
				onChange={(e) => handleChange("chorus", e.target.value)}
			/>
			<TextField
				variant="standard"
				fullWidth
				label="Bridge"
				defaultValue={part?.bridge}
				multiline
				className="VERSE [&>div>textarea]:text-sm [&>label]:text-sm"
				// maxRows={5}
				// disabled={edit}
				onChange={(e) => handleChange("bridge", e.target.value)}
			/>
		</div>
	);
};

const Keys = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"];

export default React.memo(EditSongTabs);
