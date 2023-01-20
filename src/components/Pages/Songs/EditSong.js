/* eslint-disable react-hooks/exhaustive-deps */
import {
	AddAPhotoOutlined,
	ClearOutlined,
	CloseOutlined,
	EditOutlined,
	SaveOutlined,
} from "@mui/icons-material";
import {
	Alert,
	Button,
	Chip,
	FormControl,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
	Snackbar,
	SwipeableDrawer,
	TextField,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import {
	UpdateSongDetails,
	UploadAlbumCover,
} from "../../../Firebase/songsApi";
import useResize from "../../../hooks/useResize";
import EditSongTabs from "./EditSongTabs";
import ALBUM_PLACEHOLDER from "../../../assets/music_placeholder.jpg";
import AlbumCover from "./AlbumCover";
import LoadingScreen from "../../CustomComponents/LoadingScreen";
import { useCallback } from "react";
import NewSongTag from "./NewTag";

const EditSong = ({ drawer, setOpen, handleCover, isNew }) => {
	const { resized, processfile } = useResize({ quality: 0.9 });
	const { song, status } = drawer;
	const [editTitle, setEditTitle] = useState(true);
	const [editDetails, setEditDetails] = useState({
		artist: true,
		album: true,
		lyrics: true,
		chords: true,
		media: true,
		tag: false,
	});

	const [songDetails, setSongDetails] = useState({
		cover: song?.cover || null,
		title: song?.title || null,
		album: song?.album || null,
		key: song?.key || null,
		lyrics: {
			verse: null,
			pre_chorus: null,
			chorus: null,
			...song?.lyrics,
		},
		chords: {
			intro: null,
			verse: null,
			pre_chorus: null,
			chorus: null,
			...song?.chords,
		},
		media: {
			youtube: song?.media?.youtube,
			spotify: song?.media?.spotify,
			other: song?.media?.other,
		},
		tags: song?.tags || [],
	});

	const [newTag, setNewTag] = useState(null);
	const [image, setImage] = useState(null);
	const [photoURL, setPhotoURL] = useState(null);
	const [updating, setUpdating] = useState(false);
	const [updated, setUpdated] = useState(false);
	const [tagExist, setTagExist] = useState(false);
	const [openCovers, setOpenCovers] = useState(false);
	const [selectedCover, setSelectedCover] = useState(null);
	const [showLyrics, setShowLyrics] = useState(true);

	const memoizedUpdating = useMemo(() => updating, [updating]);
	const new_tag = useMemo(() => newTag, [newTag]);
	const memoizedSong = useMemo(() => songDetails, [songDetails]);

	const handleSetSongDetails = useCallback((value) => {
		setSongDetails(value);
	}, []);

	useEffect(() => {
		image && processfile(image);
	}, [image]);

	useEffect(() => {
		resized && handleUploadCover();
	}, [resized]);

	useEffect(() => {
		setSongDetails({ ...songDetails, cover: photoURL });
	}, [photoURL]);

	const handleUploadCover = async () => {
		try {
			const { photoURL } = await UploadAlbumCover({
				id: image.name,
				image: resized,
			});
			setPhotoURL(photoURL);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		setSongDetails({ ...songDetails, cover: selectedCover?.photoURL });
	}, [selectedCover]);

	useEffect(() => {
		if (updating) {
			setEditDetails({
				artist: true,
				album: true,
				lyrics: true,
				chords: true,
				media: true,
				tag: false,
			});
			setEditTitle(true);
		}
	}, [updating]);

	useEffect(() => {
		setSongDetails({
			...song,
			lyrics: {
				verse: null,
				pre_chorus: null,
				chorus: null,
				...song?.lyrics,
			},
			chords: {
				verse: null,
				pre_chorus: null,
				chorus: null,
				...song?.chords,
			},
			media: {
				youtube: null,
				spotify: null,
				...song?.media,
			},
			tags: song?.tags,
		});
	}, [song]);

	useEffect(() => {
		return () => {
			setEditDetails({
				...editDetails,
				tag: false,
			});
		};
	}, []);

	useEffect(() => {
		!status && setShowLyrics(false);
	}, [status]);

	useEffect(() => {
		const idx = songDetails?.tags?.findIndex(
			(tag) => tag?.toLowerCase() === new_tag?.toLowerCase()
		);
		if (idx >= 0) {
			setTagExist(true);
		} else {
			setTagExist(false);
		}
	}, [new_tag]);

	const handleSave = async () => {
		setUpdating(true);
		try {
			await UpdateSongDetails({ song: songDetails });
			setUpdating(false);
			setUpdated(true);
			setTimeout(() => {
				setOpen(false);
				setUpdated(false);
			}, 1000);
		} catch (error) {
			setUpdating(false);
			console.log(error.message);
		}
	};

	const handleDeleteTag = (tag) => {
		const filtered = songDetails.tags.filter((t) => t !== tag);
		setSongDetails({ ...songDetails, tags: filtered });
	};

	const handleAddTag = useCallback(
		(tag) => {
			if (!tagExist && tag) {
				setEditDetails({
					...editDetails,
					tag: false,
				});

				const tagArr = tag.split(" ");

				for (var i = 0; i < tagArr.length; i++) {
					tagArr[i] = tagArr[i].charAt(0).toUpperCase() + tagArr[i].slice(1);
				}

				const tag_arr = tagArr.join(" ");

				setSongDetails({
					...songDetails,
					tags: [...songDetails.tags, tag_arr],
				});
			}
		},
		[tagExist, songDetails]
	);

	return (
		<>
			<AlbumCover
				open={openCovers}
				setOpen={setOpenCovers}
				setSelectedCover={setSelectedCover}
				selectedCover={selectedCover}
				setImage={setImage}
				resized={resized}
			/>
			<LoadingScreen status={updating} text="Updating, " />
			<SwipeableDrawer
				anchor="bottom"
				open={status}
				onClose={() => setOpen(false)}
				className="max-w-[680px] [&>.MuiDrawer-paper]:items-center">
				<div className="max-w-[680px] m-x-auto w-full">
					<Snackbar
						anchorOrigin={{ horizontal: "center", vertical: "top" }}
						open={updated}
						autoHideDuration={1000}
						onClose={() => setUpdated(false)}>
						<Alert severity="success" sx={{ width: "100%" }}>
							{song?.title} is successfully updated!
						</Alert>
					</Snackbar>
					<div className="flex flex-row gap-2 bg-black/40 items-center">
						<div className="w-[70px] relative">
							{/* <input
              type='file'
              id='upload-cover'
              accept='image/*'
              className='hidden'
              onChange={(e) => setImage(e.target.files[0])}
            /> */}
							<label
								htmlFor="upload-cover"
								className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
								<IconButton
									component="span"
									className="bg-black/50 z-10"
									onClick={() => setOpenCovers(true)}>
									<AddAPhotoOutlined />
								</IconButton>
							</label>

							<img
								src={songDetails?.cover || ALBUM_PLACEHOLDER}
								alt=""
								className="w-full"
							/>
						</div>
						<div className="p-2 box-border flex-1">
							<FormControl size="small" variant="standard" fullWidth>
								<InputLabel>Song Title</InputLabel>
								<Input
									multiline
									disabled={editTitle}
									defaultValue={song?.title}
									onChange={(e) =>
										handleSetSongDetails({
											...songDetails,
											title: e.target.value,
										})
									}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="song title"
												onClick={() => setEditTitle(!editTitle)}>
												{editTitle ? (
													<EditOutlined className="w-[18x] h-[18px]" />
												) : (
													<CloseOutlined className="w-[18x] h-[18px]" />
												)}
											</IconButton>
										</InputAdornment>
									}
									className={`INPUT [&>textarea]:text-xs ${
										editTitle ? "[&::before]:border-0" : ""
									}`}
								/>
							</FormControl>
						</div>
					</div>

					<div className="p-4 grid grid-cols-2 gap-4 space-y-0">
						<div className="col-span-1">
							<FormControl size="small" variant="standard" fullWidth>
								<InputLabel>Artist</InputLabel>
								<Input
									multiline
									disabled={editDetails.artist}
									defaultValue={song?.artist}
									onChange={(e) =>
										handleSetSongDetails({
											...songDetails,
											artist: e.target.value,
										})
									}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="song title"
												onClick={() =>
													setEditDetails({
														...editDetails,
														artist: !editDetails.artist,
													})
												}>
												{editDetails.artist ? (
													<EditOutlined className="w-[18x] h-[18px]" />
												) : (
													<CloseOutlined className="w-[18x] h-[18px]" />
												)}
											</IconButton>
										</InputAdornment>
									}
									className={`INPUT [&>textarea]:text-xs [&>label]:text-xs ${
										editDetails.artist ? "[&::before]:border-0" : ""
									}`}
								/>
							</FormControl>
						</div>
						<div className="col-span-1">
							<FormControl size="small" variant="standard" fullWidth>
								<InputLabel>Album</InputLabel>
								<Input
									multiline
									disabled={editDetails.album}
									defaultValue={song?.album}
									onChange={(e) =>
										handleSetSongDetails({
											...songDetails,
											album: e.target.value,
										})
									}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="song title"
												onClick={() =>
													setEditDetails({
														...editDetails,
														album: !editDetails.album,
													})
												}>
												{editDetails.album ? (
													<EditOutlined className="w-[18x] h-[18px]" />
												) : (
													<CloseOutlined className="w-[18x] h-[18px]" />
												)}
											</IconButton>
										</InputAdornment>
									}
									className={`INPUT [&>textarea]:text-xs ${
										editDetails.album ? "[&::before]:border-0" : ""
									}`}
								/>
							</FormControl>
						</div>
					</div>
					<div className="px-4 mb-1 text-xs text-white/60">Tags</div>
					<div className="px-4 py-2 flex flex-row gap-2 flex-wrap">
						{songDetails?.tags?.map((tag) => {
							return (
								<Chip
									label={tag}
									size="small"
									onDelete={() => handleDeleteTag(tag)}
								/>
							);
						})}
						{!editDetails.tag && (
							<Chip
								variant="outlined"
								label="+ Add Tag"
								size="small"
								onClick={() =>
									setEditDetails({
										...editDetails,
										tag: true,
									})
								}
							/>
						)}
					</div>

					<div className="px-4 py-2 flex flex-row justify-end">
						<button
							onClick={() => setShowLyrics(!showLyrics)}
							className="px-4 py-1 bg-blue-500 text-white text-xs rounded-full">
							{showLyrics
								? "Hide"
								: songDetails?.lyrics?.verse ||
								  songDetails?.lyrics?.pre_chorus ||
								  songDetails?.lyrics?.chorus ||
								  songDetails?.lyrics?.bridge
								? "Show"
								: "Add"}{" "}
							Lyrics / Chords
						</button>
					</div>

					{editDetails.tag && (
						<NewSongTag
							handleAddTag={handleAddTag}
							tagExist={tagExist}
							setEditDetails={setEditDetails}
						/>
					)}

					{showLyrics && (
						<EditSongTabs
							song={memoizedSong}
							setSongDetails={handleSetSongDetails}
							updating={memoizedUpdating}
						/>
					)}

					<div className="flex flex-row items-center justify-center p-2">
						<Button
							className="flex-1 bg-green-500 text-white p-4"
							color="success"
							variant="contained"
							disableElevation
							onClick={handleSave}>
							<span className="text-xs text-white">Save Song</span>
						</Button>
					</div>
				</div>
			</SwipeableDrawer>
		</>
	);
};

export default React.memo(EditSong);
