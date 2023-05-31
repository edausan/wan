/* eslint-disable react-hooks/exhaustive-deps */
import React, {
	useState,
	useEffect,
	useContext,
	createContext,
	useMemo,
	useRef,
} from "react";
import { Grid, Card, Snackbar, Alert } from "@mui/material";

import { LINEUP } from "../../data";
import { AppCtx } from "../../App";
import LineupCard from "./LineupCard";
import { AddLineup, GetAllSongs } from "../../Firebase/songsApi";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";

import { getAuth } from "firebase/auth";
import { FirebaseApp } from "../../Firebase";
import { SaveTwoTone } from "@mui/icons-material";
import Service from "./Service";
import { useMutation, useQuery } from "react-query";
import LoadingScreen from "../CustomComponents/LoadingScreen";

export const NewLineupCtx = createContext(null);

const NewLineup = () => {
	const params = useParams();
	const auth = getAuth(FirebaseApp);
	const user = auth.currentUser;
	const history = useHistory();

	const { scrollToTop } = useContext(AppCtx);
	const [date, setDate] = useState(new Date());
	const [lineupData, setLineupData] = useState([]);
	const [service, setService] = useState(null);
	const [songs, setSongs] = useState([]);
	const [openService, setOpenService] = useState(false);

	const { data } = useQuery("songs", GetAllSongs);
	const mutatedNewLineup = useMutation(AddLineup);

	const dateRef = useRef(null);

	useEffect(() => {
		scrollToTop();
		data && setSongs(data);
	}, [data]);

	useEffect(() => {
		setOpenService(true);
		getSundayOfCurrentWeek();
	}, []);

	useEffect(() => {
		setLineupData(LINEUP);
	}, [LINEUP]);

	const handleSave = async () => {
		if (service) {
			const new_lineup = {
				lineup: {
					date_created: moment(dateRef.current?.value).format("LLLL"),
					songs: lineupData.filter((l) => l.title),
					worship_leader: {
						uid: user.uid,
						photoURL: user.photoURL,
						displayName: user.displayName,
					},
					date: moment(date).format("LLLL"),
					service,
				},
			};

			mutatedNewLineup.mutate(new_lineup);
		}
	};

	useEffect(() => {
		if (
			mutatedNewLineup.isSuccess &&
			!mutatedNewLineup.isLoading &&
			!mutatedNewLineup.isError
		) {
			history.push("/lineup");
		}
	}, [mutatedNewLineup.isSuccess]);

	const getSundayOfCurrentWeek = () => {
		const today = new Date();
		const first = today.getDate() - today.getDay() + 1;
		const last = first + 6;

		const sunday = new Date(today.setDate(last));
		setDate(sunday);
		return sunday;
	};

	const handleClose = () => {
		// setSaved(false);
	};

	return useMemo(() => {
		return (
			<section
				style={{
					position: "relative",
					paddingBottom: 100,
					width: "100%",
					maxWidth: 680,
					margin: "0 auto",
				}}>
				<LoadingScreen status={mutatedNewLineup.isLoading} />
				<Snackbar
					open={mutatedNewLineup.isSuccess}
					autoHideDuration={1000}
					onClose={handleClose}
					anchorOrigin={{ vertical: "top", horizontal: "center" }}>
					<Alert
						onClose={handleClose}
						severity="success"
						sx={{ width: "100%" }}>
						{params.id
							? "Lineup successfully updated"
							: "New Lineup successfully created!"}
					</Alert>
				</Snackbar>

				{lineupData?.length > 0 && service && (
					<button
						className="fixed bottom-[86px] right-[26px] w-[40px] h-[40px]  bg-green-500 text-white rounded-full z-50"
						onClick={handleSave}>
						<span className="motion-safe:animate-ping absolute top-0 left-0 w-[100%] h-[100%] bg-green-500 text-black rounded-full z-40 opacity-30"></span>
						<SaveTwoTone />
					</button>
				)}

				<Grid container justifyContent="center" spacing={2}>
					<Grid item xs={12} md={12}>
						<Card sx={{ p: 2, mb: 2 }} disableElevation>
							<button
								onClick={() => setOpenService(true)}
								className="p-2 w-full bg-sky-400 rounded-md mb-4 text-white">
								{service ? service : "Select Worship Service"}
							</button>

							<Service
								setOpen={setOpenService}
								open={openService}
								service={service}
								setService={setService}
							/>

							<input ref={dateRef} className="w-full p-2" type="date" />
						</Card>
					</Grid>

					<Grid item xs={12} md={12}>
						<Card>
							{songs?.length > 0 &&
								LINEUP.map((category, idx) => {
									return (
										<LineupCard
											key={category.id + idx}
											setLineupData={setLineupData}
											category={category}
											songs={songs}
											lineupData={lineupData}
											saving={mutatedNewLineup.isLoading}
											songData={
												lineupData.filter((s) => s?.label === category.label)[0]
											}
										/>
									);
								})}
						</Card>
					</Grid>
				</Grid>
			</section>
		);
	}, [
		mutatedNewLineup.isLoading,
		mutatedNewLineup.isSuccess,
		lineupData,
		songs,
		service,
		openService,
	]);
};

export default React.memo(NewLineup);
