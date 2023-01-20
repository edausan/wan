import {
	Card,
	Grid,
	IconButton,
	OutlinedInput,
	TextField,
	InputAdornment,
	Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search, ArrowBack } from "@mui/icons-material";
import Youtube from "../../Youtube";
import VideoItem from "../Video/VideoItem";

const Media = () => {
	const [searchText, setSearchText] = useState("");
	const [results, setResults] = useState([]);
	const [currentVideo, setCurrentVideo] = useState({});

	const handleSearch = async () => {
		try {
			const res = await Youtube.get("/search", {
				params: {
					q: searchText,
				},
			});
			setResults(res.data.items);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			{/* <img src={YOUTUBE_LOGO} alt='' style={{ width: '20%' }} /> */}

			<Grid container sx={{ mb: 1 }} alignContent="center">
				<Grid item xs={12} md={12}>
					<OutlinedInput
						// label='Search YouTube'
						onChange={(e) => setSearchText(e.target.value)}
						size="small"
						fullWidth
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									onClick={handleSearch}
									disabled={!searchText}
									edge="end">
									<Search />
								</IconButton>
							</InputAdornment>
						}
					/>
				</Grid>

				{currentVideo?.snippet && (
					<Button
						startIcon={<ArrowBack />}
						variant="outlined"
						sx={{ mt: 1 }}
						onClick={() => setCurrentVideo({})}
						size="small">
						Back
					</Button>
				)}

				{currentVideo?.snippet ? (
					<Grid
						item
						xs={12}
						md={12}
						sx={{ display: "flex", justifyContent: "center" }}>
						<iframe
							src={`https://www.youtube.com/embed/${currentVideo?.id?.videoId}`}
							allowFullScreen
							title={currentVideo?.snippet?.title}
							style={{ marginTop: 24, boxShadow: "none", border: "none" }}
						/>
					</Grid>
				) : (
					<Grid item sx={{ mt: 2, maxHeight: 500, overflow: "auto" }}>
						{results.map((video) => (
							<VideoItem
								key={video.id.videoId}
								video={video}
								setCurrentVideo={setCurrentVideo}
							/>
						))}
					</Grid>
				)}
			</Grid>
		</div>
	);
};

export default Media;
