import { Add } from "@mui/icons-material";
import { SpeedDialIcon } from "@mui/material";
import React, { useCallback, useState, useMemo, Suspense, lazy } from "react";
import EditSong from "./EditSong";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slices/usersSlice";
import { ADMIN } from "../../../data";
import SongLoading from "./SongLoading";

const Song = lazy(() => import("./Song"));
const CreateNewSong = lazy(() => import("./CreateNewSong"));
const SongDetailsDrawer = lazy(() => import("../../Lineup/SongDetailsDrawer"));

const SongList = ({ songs }) => {
	const currentUser = useSelector(selectCurrentUser);
	const [drawerData, setDrawerData] = useState({ song: null, id: null });
	const [expanded, setExpanded] = useState(false);
	const [openDrawer, setOpenDrawer] = useState({ song: null, state: false });
	const [open, setOpen] = useState(false);

	const handleClose = useCallback(() => {}, []);

	const drawer_data = useMemo(() => drawerData, [drawerData]);
	const expand = useMemo(() => expanded, [expanded]);

	const handleExpandClick = useCallback(
		(song, id) => {
			setDrawerData({ song, id });
			setExpanded(!expanded);
		},
		[expanded]
	);

	return (
		<div className="grid grid-cols-2 gap-3 mt-3 p-3">
			<SongDetailsDrawer
				drawerData={drawer_data}
				expanded={expand}
				handleClose={handleClose}
				handleExpandClick={handleExpandClick}
			/>

			<EditSong drawer={openDrawer} setOpen={setOpenDrawer} />

			<CreateNewSong open={open} setOpen={setOpen} />

			{(currentUser?.user_metadata?.ministry === "VIA" ||
				currentUser?.user?.uid === ADMIN) && (
				<button
					className="fixed bottom-[86px] right-[26px] w-[50px] h-[50px]  bg-white text-black shadow-lg rounded-full z-50"
					onClick={() => setOpen(true)}>
					<span className="motion-safe:animate-ping absolute top-0 left-0 w-[100%] h-[100%] bg-white text-black rounded-full z-40 opacity-30"></span>
					<SpeedDialIcon className="relative z-50" openIcon={<Add />} />
				</button>
			)}

			{songs.map((song) => {
				return (
					<Suspense key={song?.id} fallback={<SongLoading />}>
						<Song
							song={song}
							handleExpandClick={handleExpandClick}
							openDrawer={openDrawer}
							setOpenDrawer={setOpenDrawer}
						/>
					</Suspense>
				);
			})}
		</div>
	);
};

export default SongList;
