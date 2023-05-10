import React, { useEffect, useState, useRef } from "react";
import { UrlId } from "./EditSongTabs";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import SPOTIFY_LOGO from "../../../assets/spotify_logo.png";
import LazyLoad from "react-lazyload";
import { YouTube } from "@mui/icons-material";

const Media = ({ setDetails, song }) => {
	const [ytUrl, setYtURL] = useState(null);
	const [spotifyUrl, setSpotifyURL] = useState(null);
	const [youtube, setYoutube] = useState(null);
	const [spotify, setSpotify] = useState(null);
	const [value, setValue] = useState("1");
	const [isYt, setIsYt] = useState(true);
	const [isSpotify, setIsSpotify] = useState(true);

	const ytRef = useRef(null);
	const spotifyRef = useRef(null);

	const handleCheckLink = ({ media }) => {
		if (media === "spotify") {
			const is_spotify = spotifyRef.current?.value.includes("spotify");
			setIsSpotify(is_spotify);
			return is_spotify;
		} else {
			const is_yt = ytRef.current?.value.includes("youtube");
			setIsYt(is_yt);
			return is_yt;
		}
	};

	const handleURL = ({ media }) => {
		const isValid = handleCheckLink({ media });
		if (isValid) {
			if (media === "spotify" && spotifyRef.current) {
				if (spotifyRef.current?.value) {
					const spotifyLink = spotifyRef.current.value;
					const embed_url = UrlId(spotifyLink);
					setSpotify(spotifyLink);
					setSpotifyURL(embed_url);
					setDetails({
						...song,
						media: { ...song?.media, spotify: embed_url },
					});
				} else {
					setDetails({ ...song, media: { ...song?.media, spotify: null } });
				}
			} else if (media === "youtube" && ytRef.current) {
				if (ytRef.current?.value) {
					const ytLink = ytRef.current.value;
					const embed_url = UrlId(ytLink);
					setYoutube(ytLink);
					setYtURL(embed_url);
					setDetails({
						...song,
						media: { ...song?.media, youtube: embed_url },
					});
				} else {
					setYtURL(null);
					setYoutube(null);
					setDetails({ ...song, media: { ...song?.media, youtube: null } });
				}
			} else {
				setDetails({ ...song, media: { ...song?.media, other: value } });
			}
		}
	};

	useEffect(() => {
	}, [isYt, isSpotify]);

	useEffect(() => {
		if (song?.media?.youtube && !ytUrl) {
			// const value = UrlId(song?.media?.youtube);
			setYtURL(song?.media?.youtube);
			setYoutube(song?.media?.youtube);
		} else if (song?.media?.spotify && !spotifyUrl) {
			setSpotifyURL(song?.media?.spotify);
			setSpotify(song?.media?.spotify);
		}
	}, [song]);

	return (
		<div className="max-w-[100%] mt-4">
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TabList onChange={(e, newValue) => setValue(newValue)}>
						<Tab
							label={
								<div className="flex flex-row items-center gap-2">
									<YouTube color="error" /> YouTube
								</div>
							}
							value="1"
							className="text-xs"
						/>
						<Tab
							label={
								<div className="flex flex-row items-center gap-2">
									<img src={SPOTIFY_LOGO} alt="" className="w-[25px]" /> Spotify
								</div>
							}
							value="2"
							className="text-xs"
						/>
					</TabList>
				</Box>

				<TabPanel value="1">
					<div className="flex flex-row gap-2 items-center pb-2 px-0">
						<input
							ref={ytRef}
							placeholder="Paste Youtube Link"
							value={youtube}
							onChange={() => handleURL({ media: "youtube" })}
							className={`w-full px-4 py-2 rounded-md border border-gray-200 outline-none focus:border-gray-400 `}
						/>
					</div>
					{!isYt && ytRef.current?.value && (
						<div className="text-sm text-red-600 px-2 py-1 bg-red-50">
							Not a Youtube link
						</div>
					)}
					{isYt && ytUrl && (
						<LazyLoad>
							<iframe
								className="w-[100%] h-[200px]"
								title="test"
								src={ytUrl}
								frameborder="0"
							/>
						</LazyLoad>
					)}
				</TabPanel>

				<TabPanel value="2">
					<div className="flex flex-row gap-2 items-center pb-2 px-0">
						<input
							ref={spotifyRef}
							placeholder="Paste Spotify Link"
							value={spotify}
							onChange={() => handleURL({ media: "spotify" })}
							className={`w-full px-4 py-2 rounded-md border border-gray-200 outline-none focus:border-gray-400 `}
						/>
					</div>
					{!isSpotify && (
						<div className="text-sm text-red-600 px-2 py-1 bg-red-50">
							Not a Spotify link
						</div>
					)}
					{isSpotify && spotifyUrl && (
						<LazyLoad>
							<iframe
								className="w-[100%] h-[80px]"
								title="test"
								src={spotifyUrl}
								frameborder="0"
								allowfullscreen=""
								allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
							/>
						</LazyLoad>
					)}
				</TabPanel>

				{/* <TabPanel value="3">
					<div className="flex flex-row gap-2 items-center pb-2 px-0">
						<TextField
							variant="standard"
							size="small"
							label="Paste other reference link"
							fullWidth
							onChange={(e) =>
								handleURL({ value: e.target.value, media: "other" })
							}
							className="SPOTIFY [&>label]:text-xs [&>div>input]:text-xs"
						/>
					</div>
					<LazyLoad>
						<iframe
							className="w-[100%] h-[80px]"
							title="test"
							src={spotifyUrl}
							frameborder="0"
							allowfullscreen=""
							allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						/>
					</LazyLoad>
				</TabPanel> */}
			</TabContext>
		</div>
	);
};

export default Media;
