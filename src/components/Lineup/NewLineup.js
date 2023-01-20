/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, createContext } from "react";
import { Grid, TextField, Modal, Card, Snackbar, Alert } from "@mui/material";

import { LINEUP } from "../../data";
import { AppCtx } from "../../App";
import LineupCard from "./LineupCard";
import Lyrics from "../Modals/Lyrics";
import Chords from "../Modals/Chords";
import Media from "../Modals/Media";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
	AddLineup,
	RealtimeSongs,
	UpdateLineup,
} from "../../Firebase/songsApi";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";

import { getAuth } from "firebase/auth";
import { FirebaseApp } from "../../Firebase";
import { SaveTwoTone } from "@mui/icons-material";
import Service from "./Service";

export const NewLineupCtx = createContext(null);

const NewLineup = () => {
	const params = useParams();
	const auth = getAuth(FirebaseApp);
	const user = auth.currentUser;
	const history = useHistory();
	const [open, setOpen] = useState({
		id: null,
		status: false,
		song_title: null,
	});

	const { lineups, scrollToTop } = useContext(AppCtx);
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
		setOpenService(true);
		getSundayOfCurrentWeek();
	}, []);

	useEffect(() => {
		if (params.id) {
			const filtered = lineups.filter((l) => l.id === params.id)[0];
			setService(filtered?.service);
			setDate(filtered?.date);
			setLineupData(filtered?.songs);
		} else {
			setLineupData(LINEUP);
		}
	}, [LINEUP, params.id]);

	const handleDateChange = (newValue) => {
		setDate(newValue);
	};

	const handleSave = async () => {
		if (service) {
			setSaving(true);

			const saved = await AddLineup({
				lineup: {
					date_created: moment(new Date()).format("LLLL"),
					songs: lineupData.filter((l) => l.title),
					worship_leader: {
						uid: user.uid,
						photoURL: user.photoURL,
						displayName: user.displayName,
					},
					date: moment(date).format("LLLL"),
					service,
				},
			});

			if (saved?.id) {
				setSaving(false);
				setSaved(true);

				setTimeout(() => {
					setSaved(false);
					history.push("/lineup");
				}, 1000);
			}
		}
	};

	const handleUpdate = async () => {
		setSaving(true);

		const res = await UpdateLineup({
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
		});

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

	const ModalContent = () => {
		switch (open.id) {
			case "Lyrics":
				return (
					<Lyrics
						setLineupData={setLineupData}
						song={open}
						lineupData={lineupData}
						setOpen={setOpen}
					/>
				);
			case "Chords":
				return (
					<Chords
						setLineupData={setLineupData}
						song={open}
						lineupData={lineupData}
						setOpen={setOpen}
					/>
				);
			case "Media":
				return (
					<Media
						setLineupData={setLineupData}
						song={open}
						lineupData={lineupData}
					/>
				);

			default:
				break;
		}
	};

	const handleClose = () => {
		setSaved(false);
	};

	return (
		<section
			style={{
				position: "relative",
				paddingBottom: 100,
				width: "100%",
				maxWidth: 680,
				margin: "0 auto",
			}}>
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

			{lineupData?.length > 0 && service && (
				<button
					className="fixed bottom-[86px] right-[26px] w-[40px] h-[40px]  bg-green-500 text-white rounded-full z-50"
					onClick={handleSave}>
					<span className="motion-safe:animate-ping absolute top-0 left-0 w-[100%] h-[100%] bg-green-500 text-black rounded-full z-40 opacity-30"></span>
					<SaveTwoTone />
				</button>
			)}

			<Modal
				open={open.status}
				onClose={() => setOpen({ id: null, status: false, song_title: null })}>
				{ModalContent()}
			</Modal>

			<Grid container justifyContent="center" spacing={2}>
				<Grid item xs={12} md={12}>
					<Card sx={{ p: 2, mb: 2 }}>
						<button
							onClick={() => setOpenService(true)}
							className="p-2 w-full bg-sky-400 rounded-md mb-4">
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
					<NewLineupCtx.Provider
						value={{ songs, saving, setLineupData, setOpen }}>
						{lineupData?.length > 0 &&
							songs?.length > 0 &&
							LINEUP.map((category, idx) => {
								return (
									<LineupCard
										setLineupData={setLineupData}
										key={category.id + idx}
										category={category}
										songs={songs}
										lineupData={lineupData}
									/>
								);
							})}
					</NewLineupCtx.Provider>
				</Grid>
			</Grid>
		</section>
	);
};

export default React.memo(NewLineup);
