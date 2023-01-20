/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect, lazy, Suspense } from "react";
import {
	FormControl,
	Grid,
	TextField,
	Card,
	InputLabel,
	CardContent,
	Select,
	MenuItem,
	Modal,
} from "@mui/material";
const Lyrics = lazy(() => import("../Modals/Lyrics"));
const Chords = lazy(() => import("../Modals/Chords"));

const initialState = {
	song_title: null,
	artist: null,
	album: null,
	lyrics: null,
	chords: null,
	media: null,
	from: null,
	song_id: null,
	is_new: false,
};

const LineupCard = ({ category, setLineupData, songs, songData, saving }) => {
	const [cardData, setCardData] = useState(songData || initialState);

	const [newSong, setNewSong] = useState(false);
	const [open, setOpen] = useState({ modal: null, status: false });
	const [filteredSongs, setFilteredSongs] = useState([]);

	useEffect(() => {
		setCardData(initialState);
	}, [newSong]);

	const handleFilterSongs = useCallback(() => {
		if (songs?.length > 0 && category.id) {
			const filtered = songs?.filter(
				(song) =>
					song?.tags?.length > 0 &&
					song?.tags.findIndex((tag) => category?.tags[0] === tag) >= 0
			);
			setFilteredSongs(filtered);
		}
	}, [songs]);

	useEffect(() => {
		handleFilterSongs();
	}, [songs, handleFilterSongs]);

	const handleSetLineup = useCallback(() => {
		setLineupData((lineupdata) => {
			return lineupdata.map((song) => {
				if (song.label === category.label) {
					return cardData.title
						? {
								...song,
								...cardData,
								is_new: newSong,
						  }
						: category;
				}

				return song;
			});
		});
	}, [cardData, category]);

	useEffect(() => {
		if (cardData.title) {
			handleSetLineup();
		}
	}, [cardData, newSong]);

	return (
		<Grid item xs={12} md={12}>
			<Modal
				open={open.status}
				onClose={() => setOpen({ modal: null, status: false })}>
				{open.modal === "lyrics" ? (
					<Suspense fallback={<div>Loading...</div>}>
						<Lyrics
							setCardData={setCardData}
							setOpen={setOpen}
							cardData={songData || cardData}
							category={category}
						/>
					</Suspense>
				) : (
					<Suspense fallback={<div>Loading...</div>}>
						<Chords
							setCardData={setCardData}
							setOpen={setOpen}
							cardData={songData || cardData}
							category={category}
						/>
					</Suspense>
				)}
			</Modal>

			<Card sx={{ mb: 2 }} elevation={0}>
				<CardContent>
					{/* <div>
            <FormGroup className='inline-block'>
              <FormControlLabel
                control={
                  <Switch
                    checked={newSong}
                    onChange={() => setNewSong(!newSong)}
                  />
                }
                label='New'
              />
            </FormGroup>
          </div> */}

					{newSong ? (
						<TextField
							label={category.label}
							fullWidth
							size="small"
							variant="standard"
							value={cardData.title || cardData.song_title}
							disabled={saving}
							onChange={(e) =>
								setCardData({ ...cardData, title: e.target.value })
							}
						/>
					) : (
						<FormControl variant="standard" fullWidth>
							<InputLabel>{category.label}</InputLabel>
							<Select
								value={songData?.id || cardData.id}
								onChange={(e) =>
									setCardData({
										...songs?.filter((s) => s.id === e.target.value)[0],
									})
								}>
								{filteredSongs.map((song) => {
									return (
										<MenuItem key={song.id} value={song.id}>
											{song.title}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					)}

					{/* <Grid
            container
            sx={{ mt: 1, width: '100%' }}
            spacing={1}
            justifyContent='left'
          >
            <Grid item xs={6} md={6}>
              <TextField
                label='Artist'
                fullWidth
                size='small'
                variant='standard'
                value={cardData?.artist || songData?.artist}
                disabled={saving}
                onChange={(e) =>
                  setCardData({ ...cardData, artist: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label='Album'
                fullWidth
                size='small'
                variant='standard'
                value={cardData?.album || songData?.album}
                disabled={saving}
                onChange={(e) =>
                  setCardData({ ...cardData, album: e.target.value })
                }
              />
            </Grid>
          </Grid> */}
				</CardContent>
			</Card>
		</Grid>
	);
};

export default React.memo(LineupCard);
