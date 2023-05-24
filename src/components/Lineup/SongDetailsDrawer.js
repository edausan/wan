import { ContentCopy, Link, YouTube } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
	Alert,
	Box,
	Button,
	Snackbar,
	SwipeableDrawer,
	Tab,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import LazyLoad from "react-lazyload";
import SPOTIFY_LOGO from "../../assets/spotify_logo.png";
import SongHeader from "./SongHeader";
import SongPart from "./SongPart";
import useTransposer from "../../hooks/useTransposer";
import Chord from "../CustomComponents/Chord";

const SongDetailsDrawer = ({
	expanded,
	handleExpandClick,
	handleClose,
	drawerData,
}) => {
	const [open, setOpen] = useState(false);
	const [selectedKey, setSelectedKey] = useState(drawerData?.song?.key || "C");

	const [songChords, setSongChords] = useState({
		intro: null,
		verse: null,
		pre_chorus: null,
		chorus: null,
		bridge: null,
	});

	const chords = drawerData?.song?.chords;

	// const intro = useTransposer({
	// 	selectedKey: drawerData?.song?.key,
	// 	chordRuns: chords?.intro,
	// });

	const verse = useTransposer({
		selectedKey: drawerData?.song?.key,
		chordRuns: chords?.verse,
	});

	// const chorus = useTransposer({
	// 	selectedKey: drawerData?.song?.key,
	// 	chordRuns: chords?.chorus,
	// });

	const handleCopy = () => {
		const intro = document.querySelector("#Intro");
		const verse = document.querySelector("#Verse");
		const pre_chorus = document.querySelector("#Pre-chorus");
		const chorus = document.querySelector("#Chorus");
		const bridge = document.querySelector("#Bridge");

		navigator.clipboard.writeText(
			`${intro ? `Intro:\r\n${intro.innerHTML}\r\n\r\n` : ""}${
				verse ? `Verse:\r\n${verse.innerHTML}\r\n\r\n` : ""
			}${pre_chorus ? `Pre-chorus:\r\n${pre_chorus.innerHTML}\r\n\r\n` : ""}${
				chorus ? `Chorus:\r\n${chorus.innerHTML}\r\n\r\n` : ""
			}${bridge ? `Bridge:\r\n${bridge.innerHTML}` : ""}`
		);

		setOpen(true);

		setTimeout(() => {
			setOpen(false);
		}, 1000);
	};

	return (
		<SwipeableDrawer
			anchor="right"
			open={expanded}
			onClose={() => handleExpandClick({ song: null, id: null })}
			className="flex relative">
			<SongHeader song={drawerData.song} />

			{/* {(drawerData?.song?.media?.youtube ||
				drawerData?.song?.media?.spotify) && (
				<Media media={drawerData?.song?.media} />
			)} */}
			<Box className="laptop:w-[500px] desktop:w-[500px] phone:w-[95vw] p-4  flex-1">
				<Snackbar
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
					sx={{ zIndex: 2 }}>
					<Alert
						onClose={handleClose}
						severity="success"
						sx={{ width: "100%" }}>
						Copied!
					</Alert>
				</Snackbar>

				<section className="flex flex-col gap-4">
					{drawerData?.song?.chords?.intro && drawerData.id !== "Lyrics" && (
						<SongPart part="Intro" data={drawerData?.song?.chords?.intro} />
					)}

					{drawerData?.song?.lyrics?.verse && drawerData.id === "Lyrics" && (
						<SongPart part="Verse" data={drawerData?.song?.lyrics?.verse} />
					)}

					{drawerData?.song?.chords?.verse && drawerData.id === "Chords" && (
						<SongPart part="Verse" data={drawerData?.song?.chords?.verse} />
					)}

					{drawerData?.song?.lyrics?.chorus && drawerData.id === "Lyrics" && (
						<SongPart part="Chorus" data={drawerData?.song?.lyrics?.chorus} />
					)}

					{drawerData?.song?.chords?.chorus && drawerData.id === "Chords" && (
						<SongPart part="Chorus" data={drawerData?.song?.chords?.chorus} />
					)}

					{drawerData?.song?.lyrics?.bridge && drawerData.id === "Lyrics" && (
						<SongPart part="Bridge" data={drawerData?.song?.lyrics?.bridge} />
					)}

					{drawerData?.song?.chords?.bridge && drawerData.id === "Chords" && (
						<SongPart part="Bridge" data={drawerData?.song?.chords?.bridge} />
					)}

					{drawerData?.song?.lyrics?.pre_chorus &&
						drawerData.id === "Lyrics" && (
							<SongPart
								part="Pre-chorus"
								data={drawerData?.song?.lyrics?.pre_chorus}
							/>
						)}
				</section>

				<div style={{ textAlign: "right" }}>
					<Button onClick={handleCopy} startIcon={<ContentCopy />}>
						Copy
					</Button>
				</div>
			</Box>
		</SwipeableDrawer>
	);
};

const Media = ({ media }) => {
	const [value, setValue] = useState("1");
	const handleSpotify = (url) => {
		if (url.includes("copy-link")) {
			const new_url = `${url.split("?")[0]}?utm_source=generator&theme=0`;
			return new_url;
		}

		return url;
	};

	const handleOther = (url) => {
		// https://drive.google.com/file/d/1p0UBscFjfEntEnTgXgG1M2flcDGHsmXN/preview
		const embed = url?.split("/view?")[0];
		return `${embed}/preview`;
	};

	return (
		<>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TabList onChange={(e, newValue) => setValue(newValue)}>
						{media?.youtube && (
							<Tab
								disabled={!media?.youtube}
								label={
									<div className="flex flex-row items-center gap-2 text-xs">
										<YouTube
											color="error"
											className={`${!media?.youtube ? "text-white/25" : ""}`}
										/>{" "}
										YouTube
									</div>
								}
								value="1"
								className="text-xs"
							/>
						)}

						{media?.spotify && (
							<Tab
								disabled={!media?.spotify}
								label={
									<div className="flex flex-row items-center gap-2 text-xs">
										<img
											src={SPOTIFY_LOGO}
											alt=""
											className={`w-[25px] ${
												!media?.spotify ? "grayscale opacity-30" : ""
											}`}
										/>{" "}
										Spotify
									</div>
								}
								value="2"
								className="text-xs"
							/>
						)}

						{media?.other && (
							<Tab
								disabled={!media?.other}
								label={
									<div className="flex flex-row items-center gap-2 text-xs">
										{/* <Link /> */}
										Other
									</div>
								}
								value="3"
								className="text-xs"
							/>
						)}
					</TabList>
				</Box>
				<TabPanel value="1" className="p-0">
					{media?.youtube && (
						<LazyLoad>
							<iframe
								className="w-[100%] phone:h-[160px] laptop:h-[200px]"
								title="youtube"
								src={media?.youtube}
								frameborder="0"
								allowfullscreen=""
								allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
							/>
						</LazyLoad>
					)}
				</TabPanel>
				<TabPanel value="2" className="p-0">
					{media?.spotify && (
						<LazyLoad>
							<iframe
								className="w-[100%] phone:h-[80px] laptop:h-[120px]"
								title="spotify"
								src={handleSpotify(media?.spotify)}
								frameborder="0"
								allowfullscreen=""
								allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
							/>
						</LazyLoad>
					)}
				</TabPanel>
				<TabPanel value="3" className="p-0">
					<LazyLoad>
						<iframe
							src={handleOther(media?.other)}
							// width="640"
							// height="80"
							allow="autoplay"
							title="other"
							className="w-[100%] h-[80px]"
						/>
					</LazyLoad>
				</TabPanel>
			</TabContext>
		</>
	);
};

export default React.memo(SongDetailsDrawer);
