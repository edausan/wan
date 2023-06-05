import {
	LibraryMusicOutlined,
	HomeOutlined,
	AssignmentOutlined,
	SpeakerNotesOutlined,
	AudioFileOutlined,
} from "@mui/icons-material";
import { Paper, Grid, useTheme, Avatar, CircularProgress } from "@mui/material";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "./../Firebase";
import { AppCtx } from "../App";
import { useQuery } from "react-query";
import { GetAllLineups, GetAllSongs } from "../Firebase/songsApi";
import { GetAllPosts } from "../Firebase/postsApi";

const Navigation = () => {
	// const { setPageIndex } = useContext(AppCtx);
	const auth = getAuth(FirebaseApp);
	const user = auth.currentUser;
	const { mode } = useContext(AppCtx);

	const location = useLocation();
	const { pathname } = location;
	const theme = useTheme();

	const lineupQuery = useQuery("lineups", GetAllLineups);
	const handleRefetchLineups = () => {
		lineupQuery.refetch();
	};

	return (
		<Paper
			sx={{
				position: "fixed",
				bottom: 0,
				left: "50%",
				width: "100%",
				transform: "translateX(-50%)",
				zIndex: 1002,
				boxShadow: "0 -5px 10px rgba(0,0,0,.1)",
				borderRadius: 0,
			}}
			className={`pb-0 backdrop-blur-sm ${
				mode ? "bg-white/80" : "bg-[#121212]/70"
			}`}>
			<Grid
				container
				sx={{
					background: theme.palette.mode,
				}}
				justifyContent="center">
				<Grid item flex={1}>
					<Link
						to="/"
						style={{
							display: "flex",
							padding: 16,
							alignItems: "center",
							justifyContent: "center",
							transition: theme.transitions.easing.easeInOut,
							color:
								pathname === "/"
									? theme.palette.primary[theme.palette.mode]
									: "inherit",
						}}>
						{false ? (
							<CircularProgress size={20} className="w-[20px] h-[20px]" />
						) : (
							<HomeOutlined />
						)}
					</Link>
				</Grid>
				<Grid item flex={1}>
					<Link
						to="/assignments"
						style={{
							display: "flex",
							padding: 16,
							justifyContent: "center",
							alignItems: "center",
							transition: theme.transitions.easing.easeInOut,
							color:
								pathname === "/assignments"
									? theme.palette.primary[theme.palette.mode]
									: "inherit",
						}}>
						{false ? (
							<CircularProgress size={20} className="w-[20px] h-[20px]" />
						) : (
							<AssignmentOutlined />
						)}
					</Link>
				</Grid>
				<Grid item flex={1}>
					<Link
						to="/lineup"
						onClick={handleRefetchLineups}
						style={{
							display: "flex",
							padding: 16,
							justifyContent: "center",
							alignItems: "center",
							transition: theme.transitions.easing.easeInOut,
							color:
								pathname === "/lineup"
									? theme.palette.primary[theme.palette.mode]
									: "inherit",
						}}>
						{false ? (
							<CircularProgress size={20} className="w-[20px] h-[20px]" />
						) : (
							<SpeakerNotesOutlined />
						)}
					</Link>
				</Grid>

				<Grid item flex={1}>
					<Link
						to="/songs"
						style={{
							display: "flex",
							padding: 16,
							justifyContent: "center",
							alignItems: "center",
							transition: theme.transitions.easing.easeInOut,
							color:
								pathname === "/songs"
									? theme.palette.primary[theme.palette.mode]
									: "inherit",
						}}>
						{false ? (
							<CircularProgress size={20} className="w-[20px] h-[20px]" />
						) : (
							<LibraryMusicOutlined />
						)}
					</Link>
				</Grid>

				<Grid item flex={1}>
					<Link
						to={`/profile/${user?.uid}`}
						style={{
							display: "flex",
							padding: 16,
							justifyContent: "center",
							alignItems: "center",
							transition: theme.transitions.easing.easeInOut,
							color:
								pathname === `/profile/${user?.uid}`
									? theme.palette.primary[theme.palette.mode]
									: "inherit",
						}}>
						<Avatar
							src={user?.photoURL}
							alt={user?.displayName}
							sx={{ width: 26, height: 26 }}
						/>
					</Link>
				</Grid>

				<Grid item flex={1}>
					<Link
						to={`/chorder`}
						style={{
							display: "flex",
							padding: 16,
							justifyContent: "center",
							alignItems: "center",
							transition: theme.transitions.easing.easeInOut,
							color:
								pathname === `/chorder`
									? theme.palette.primary[theme.palette.mode]
									: "inherit",
						}}>
						<AudioFileOutlined />
					</Link>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Navigation;
