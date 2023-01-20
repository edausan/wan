/* eslint-disable react-hooks/exhaustive-deps */
import React, {
	useState,
	useEffect,
	useContext,
	createContext,
	lazy,
} from "react";
import { Grid, TextField, Card, Snackbar, Alert } from "@mui/material";

import { LINEUP } from "../../data";
import { AppCtx } from "../../App";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
	GetSingleLineup,
	RealtimeSongs,
	UpdateLineup,
} from "../../Firebase/songsApi";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";

import { getAuth } from "firebase/auth";
import { FirebaseApp } from "../../Firebase";
import { SaveTwoTone } from "@mui/icons-material";

const Service = lazy(() => import("./Service"));
const LineupCard = lazy(() => import("./LineupCard"));

export const EditLineupCtx = createContext(null);

const NewLineup = () => {
	const params = useParams();
	const auth = getAuth(FirebaseApp);
	const user = auth.currentUser;
	const history = useHistory();

	const { scrollToTop } = useContext(AppCtx);
	const [date, setDate] = useState(new Date());
	const [lineupData, setLineupData] = useState([]);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);
	const [service, setService] = useState(null);
	const [songs, setSongs] = useState([]);
	const [openService, setOpenService] = useState(false);

	const { data } = RealtimeSongs();

	useEffect(() => {
		scrollToTop();
		data && setSongs(data);
	}, [data]);

	useEffect(() => {
		getSundayOfCurrentWeek();
	}, []);

	useEffect(() => {
		if (params.id && data.length > 0) GetLineup();
	}, [params.id, data]);

	const GetLineup = async () => {
		try {
			const lineup = await GetSingleLineup({ id: params.id });
			if (lineup?.id) {
				setService(lineup?.service);
				setDate(lineup?.date);
				if (data?.length > 0) {
					const lineupda_data = lineup?.songs.map((song) => {
						const song_data = data.filter((s) => s.id === song.id)[0];
						return { ...song, ...song_data };
					});

					const updated = LINEUP.map((l) => {
						const f = lineupda_data.filter((d) => d.label === l.label)[0];
						if (f) {
							return f;
						}
						return l;
					});

					setLineupData(updated);
				}
			}
		} catch (error) {}
	};

	const handleDateChange = (newValue) => {
		setDate(newValue);
	};

	const handleUpdate = async () => {
		setSaving(true);

		const data = {
			id: params.id,
			lineup: {
				service,
				songs: lineupData,
				date: moment(date).format("LLLL"),
				date_updated: moment(new Date()).format("LLLL"),
				updated_by: {
					email: user.email,
					uid: user.uid,
					displayName: user.displayName,
					photoURL: user.photoURL,
				},
			},
		};

		await UpdateLineup(data);

		setTimeout(() => {
			setSaving(false);
			setSaved(true);

			setTimeout(() => {
				setSaved(false);
				history.push("/lineup");
			}, 1000);
		}, 1000);
	};

	const getSundayOfCurrentWeek = () => {
		const today = new Date();
		const first = today.getDate() - today.getDay() + 1;
		const last = first + 6;

		const sunday = new Date(today.setDate(last));
		setDate(sunday);
		return sunday;
	};

	const handleClose = () => {
		setSaved(false);
	};

	return (
		<section className="relative p-3 w-full max-w-[680px] mt-0 mx-auto">
			<Snackbar
				open={saved}
				autoHideDuration={1000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}>
				<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
					{params.id
						? "Lineup successfully updated"
						: "New Lineup successfully created!"}
				</Alert>
			</Snackbar>

			{lineupData?.length > 0 && lineupData[2]?.title && service && (
				<button
					className="fixed bottom-[86px] right-[26px] w-[40px] h-[40px]  bg-green-500 text-white rounded-full z-50"
					onClick={handleUpdate}
					disabled={saving}>
					<span className="motion-safe:animate-ping absolute top-0 left-0 w-[100%] h-[100%] bg-green-500 text-black rounded-full z-40 opacity-30"></span>
					<SaveTwoTone />
				</button>
			)}

			<Grid container justifyContent="center" spacing={2}>
				<Grid item xs={12} md={12}>
					<Card sx={{ p: 2, mb: 2 }} disableElevation>
						{/* <FormControl fullWidth variant="standard" required sx={{mb: 2}}>
							<InputLabel id="service-type">Service</InputLabel>
							<Select labelId="service-type" value={service} onChange={e => setService(e.target.value)}>
								<MenuItem value="Worship Service | Belleview">Worship Service | Belleview</MenuItem>
								<MenuItem value="Worship Service | Lumina">Worship Service | Lumina</MenuItem>
								<MenuItem value="Youth Service">Youth Service</MenuItem>
							</Select>
						</FormControl> */}

						<button
							onClick={() => setOpenService(true)}
							className="p-2 w-full bg-sky-400 text-white rounded-md mb-4">
							{service ? service : "Select Worship Service"}
						</button>

						<Service
							setOpen={setOpenService}
							open={openService}
							service={service}
							setService={setService}
						/>

						<LocalizationProvider dateAdapter={AdapterMoment}>
							<MobileDatePicker
								required
								inputFormat="dddd LL"
								label="Date"
								value={date}
								onChange={(value) => handleDateChange(value)}
								renderInput={(params) => (
									<TextField
										{...params}
										fullWidth
										size="small"
										variant="standard"
									/>
								)}
							/>
						</LocalizationProvider>
					</Card>
				</Grid>

				<Grid item xs={12} md={12}>
					{/* <NewLineupCtx.Provider value={{songs, saving, setLineupData, setOpen}}> */}
					{lineupData?.length > 0 &&
						songs?.length > 0 &&
						LINEUP.map((category, idx) => {
							return (
								<LineupCard
									key={category.id + idx}
									setLineupData={setLineupData}
									category={category}
									songs={songs}
									songData={
										lineupData.filter((s) => s?.label === category.label)[0]
									}
									saving={saving}
								/>
							);
						})}
					{/* </NewLineupCtx.Provider> */}
				</Grid>
			</Grid>
		</section>
	);
};

export default React.memo(NewLineup);
